import React, { useContext, useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Platform, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ContainerView, { Config } from "../../common/components/ContainerView";
import { ImageInfo, MetaDataItem, Transform } from "../../structs";
import { Pages } from "../Constants";
import LockButton from "./LockButton";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Utils from "../../common/utilities/Utils";
import Theme from "../../Theme";
import strings from "../../assets/strings";

const CompareImageScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(Theme.context);
  const container1Ref = useRef(null)
  const container2Ref = useRef(null)
  const [imageInfo1, setImageInfo1] = useState(null);
  const [imageInfo2, setImageInfo2] = useState(null);
  const [isLandscape, setIsLandscape] = useState(false);

  const [isLockEngaged, setIsLockEngaged] = useState(false);
  useEffect(() => {
    if (isLockEngaged === true) {
      const container1 = container1Ref.current
      const container2 = container2Ref.current
      container1.setTransform(Transform(0.0, 0.0, container1.scaleToFitInContainer, 0));
      container2.setTransform(Transform(0.0, 0.0, container2.scaleToFitInContainer, 0));
    }
  }, [isLockEngaged]);

  

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    }
    handleOrientationChange()
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      subscription.remove();
    }
  }, []);
  
  const makeImageInfoFromsImagePickerResult = (result, containerRef) => {
    let pickedImageURI = result.assets[0].uri;
    const exifData = result.assets[0].exif;

    const metaData = Utils.makeMetaDataFromExifData(exifData)
    return ImageInfo(pickedImageURI, metaData);
  }

  const setImageInfo = (imageInfo, containerRef) => {
    if (containerRef === container1Ref) {
      setImageInfo1(imageInfo);
    } else {
      setImageInfo2(imageInfo);
    }
  }

  const onPressAddPictureButtonClick = async (containerRef) => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: true
      };

      let result = await ImagePicker.launchImageLibraryAsync(options);
      if (result.canceled) {
        return;
      }

      const imageInfo = makeImageInfoFromsImagePickerResult(result, containerRef);
      setImageInfo(imageInfo, containerRef);
    } catch (error) {
      console.log("[ERROR]:", error)
      if (containerRef === container2Ref) {
        setImageInfo1(null)
      } else {
        setImageInfo2(null)
      }
    }
  };

  const onPressCameraButton = async (containerRef) => {
    const cameraPermissionStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermissionStatus.granted) {
      console.log("camera permission not granted. is:", cameraPermissionStatus);
      return;
    }

    const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
    if (!mediaLibraryPermissions.granted) {
      console.log("media library permissions not granted")
    }

    const cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true
    });

    if (cameraResult.canceled) {
      return;
    }
    let imageInfo = makeImageInfoFromsImagePickerResult(cameraResult, containerRef);
    setImageInfo(imageInfo, containerRef);
    savePictureAfterPrompt(imageInfo.uri);
  }

  const requestLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Cannot save photo without permission.');
      throw new Error("");

    }
  };
  const savePicture = async (uri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch (error) {
      console.log("[ERROR]: saving to media library ", error)
    }
  }

  const savePictureAfterPrompt = async (uri) => {
    Alert.alert(
      strings.alert.savePicture.title,
      strings.alert.savePicture.message,
      [
        {
          text: strings.alert.savePicture.cancelButtonTitle,
          styles: 'cancel'
        },
        {
          text: strings.alert.savePicture.confirmButtonTitle,
          onPress: () => {
            savePicture(uri);
          }
        }
      ]
    );
  }

  const onSelectMetaDataItem = (containerRef, index) => {
    const selectedContainer = containerRef?.current
    selectedContainer.selectIndices([index]);

    const container1 = container1Ref.current;
    const container2 = container2Ref.current;
    const selectedMetaDataItem = containerRef.current.imageInfo.metaData[index];
    if (selectedContainer == null || container1 == null || container2 == null) {
      return;
    }

    const container1MetaData = container1?.imageInfo?.metaData;
    const container2MetaData = container2?.imageInfo?.metaData;

    if (selectedMetaDataItem == null || container1MetaData == null || container2MetaData == null) {
      return;
    }

    const otherContainer = containerRef.current == container1 ? container2 : container1
    const otherContainerMetaData = otherContainer.imageInfo.metaData

    if (otherContainerMetaData == null) {
      return
    }

    let indexInOtherContainer = otherContainerMetaData.findIndex((metaDataItem) => {
      return metaDataItem.title === selectedMetaDataItem.title
    });

    // open the info overlay in the other container
    otherContainer.showInfoOverlay();

    // set the selected rows in the other container
    otherContainer.selectIndices([indexInOtherContainer]);

    // scroll to the cell
    otherContainer.scrollToIndex(indexInOtherContainer);
  }

  const onClickLockButton = () => {
    setIsLockEngaged(!isLockEngaged);
  }

  const onTransformUpdated = (containerRef, transform) => {
    if (!isLockEngaged) {
      return
    }
    const containerToDispatchTo = containerRef === container1Ref ? container2Ref.current : container1Ref.current
    const senderImageScale = containerRef.current.scaleToFitInContainer ?? 1.0;
    transform.scale = transform.scale / senderImageScale * containerToDispatchTo.scaleToFitInContainer;
    containerToDispatchTo.setTransform(transform);
  }

  const container1Config = Config({
    imageInfo: imageInfo1,
    comparisonImageInfo: imageInfo2,
    onPressAddPictureButton: () => { onPressAddPictureButtonClick(container1Ref) },
    onPressCameraButton: () => { onPressCameraButton(container1Ref) },
    onSelectMetaDataItem: (metaDataItem) => { onSelectMetaDataItem(container1Ref, metaDataItem) },
    onTransformUpdated: onTransformUpdated,
    isLockEngaged: isLockEngaged
  });
  const container2Config = Config({
    imageInfo: imageInfo2,
    comparisonImageInfo: imageInfo1,
    onPressAddPictureButton: () => { onPressAddPictureButtonClick(container2Ref) },
    onPressCameraButton: () => { onPressCameraButton(container2Ref) },
    onSelectMetaDataItem: (metaDataItem) => { onSelectMetaDataItem(container2Ref, metaDataItem) },
    onTransformUpdated: onTransformUpdated,
    isLockEngaged: isLockEngaged
  })

  const makePortraitLayout = () => {
    const styles = makePortraitStyleSheet(theme)
    return (
      <SafeAreaProvider style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <ContainerView
            ref={container1Ref}
            config={container1Config}
          />
          <LockButton
            isEngaged={isLockEngaged}
            onPress={imageInfo1 && imageInfo2 ? onClickLockButton : null}
          />
          <ContainerView
            ref={container2Ref}
            config={container2Config}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  const makeLandscapeLayout = () => {
    const styles = makeLandscapeStyleSheet(theme);
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ContainerView
            ref={container1Ref}
            config={container1Config}
          />
          <ContainerView
            ref={container2Ref}
            config={container2Config}
          />
        </SafeAreaView>
        <LockButton
            isEngaged={isLockEngaged}
            onPress={imageInfo1 && imageInfo2 ? onClickLockButton : null}
          />

      </SafeAreaProvider>
    )
  }
  return isLandscape ? makeLandscapeLayout() : makePortraitLayout();
}

const makePortraitStyleSheet = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.secondaryColor
    }
  })
}

const makeLandscapeStyleSheet = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.secondaryColor
    }
  })
}


export default CompareImageScreen;
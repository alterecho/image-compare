import React, { useContext, useState, useRef } from "react";
import { Button, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ContainerView, { Config } from "../../common/components/ContainerView";
import { ImageInfo, MetaDataItem } from "../../structs";
import { Pages } from "../Constants";
import CompareButton from "./CompareButton";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Utils from "../../common/utilities/Utils";
import Theme from "../../Theme";
import strings from "../../assets/strings";

const CompareImageScreen = ({ navigation }) => {
  const [imageInfo1, setImageInfo1] = useState(null);
  const [imageInfo2, setImageInfo2] = useState(null);
  const { theme, toggleTheme } = useContext(Theme.context);
  const container1Ref = useRef(null)
  const container2Ref = useRef(null)

  const styles = makeStyleSheet(theme);

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
      console.log("canceled");
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

  const OnSelectMetaDataItem = (containerRef, index) => {
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

  function handleCompareButtonClick() {
    let metaData1 = imageInfo1?.metaData
    let metaData2 = imageInfo2?.metaData
    if (metaData1 == null || metaData2 == null) {
      return
    }

    navigation.navigate(
      Pages.COMPARE_META_DATA_PAGE,
      {
        metaData1: metaData1,
        metaData2: metaData2
      }
    );
  }

  const container1Config = Config({
    imageInfo: imageInfo1,
    comparisonImageInfo: imageInfo2,
    onPressAddPictureButton: () => { onPressAddPictureButtonClick(container1Ref) },
    onPressCameraButton: () => { onPressCameraButton(container1Ref) },
    onSelectMetaDataItem: (metaDataItem) => { OnSelectMetaDataItem(container1Ref, metaDataItem) }
  })
  const container2Config = Config({
    imageInfo: imageInfo2,
    comparisonImageInfo: imageInfo1,
    onPressAddPictureButton: () => { onPressAddPictureButtonClick(container2Ref) },
    onPressCameraButton: () => { onPressCameraButton(container2Ref) },
    onSelectMetaDataItem: (metaDataItem) => { OnSelectMetaDataItem(container2Ref, metaDataItem) }
  })
  return (
    <SafeAreaProvider style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView
          ref={container1Ref}
          config={container1Config}
        />
        {/* <CompareButton onPress={imageInfo1 && imageInfo2 ? handleCompareButtonClick : null}></CompareButton> */}
        <ContainerView
          ref={container2Ref}
          config={container2Config}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const makeStyleSheet = (theme) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.secondaryColor
    }
  })
}

export default CompareImageScreen;
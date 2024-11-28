import React, { useContext, useState } from "react";
import { Button, StyleSheet, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ContainerView from "../../common/components/ContainerView";
import { ImageInfo, MetaDataItem } from "../../structs";
import { Pages, ContainerID } from "../Constants";
import CompareButton from "./CompareButton";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import  * as Utils from "../../common/utilities/Utils";
import Theme from "../../Theme";

const CompareImageScreen = ({ navigation }) => {
  const [imageInfo1, setImageInfo1] = useState(null);
  const [imageInfo2, setImageInfo2] = useState(null);
  const { theme, toggleTheme } = useContext(Theme.context);
  const styles = makeStyleSheet(theme);

  const handleAddPictureButtonClick = async (containerID) => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: true
      };

      let result = await ImagePicker.launchImageLibraryAsync(options);
      if (result.cancelled) {
        return;
      }

      let pickedImageURI = result.assets[0].uri;
      const exifData = result.assets[0].exif;
      
      const metaData = Utils.makeMetaDataFromExifData(exifData)
      let imageInfo = ImageInfo(pickedImageURI, metaData);
      if (containerID == ContainerID[0]) {
        setImageInfo1(imageInfo);
      } else {
        setImageInfo2(imageInfo);
      }
    } catch (error) {
      console.log("[ERROR]:", error)
      if (containerID == ContainerID[1]) {
        setImageInfo1(null)
      } else {
        setImageInfo2(null)
      }
    }
  };

  function handleShowMetaDataButtonClick(containerID) {
    let imageInfoToUse = null
    switch (containerID) {
      case ContainerID[0]:
        imageInfoToUse = imageInfo1
        break;
      case ContainerID[1]:
        imageInfoToUse = imageInfo2
        break;
      default:
        break;
    }
    navigation.navigate(Pages.META_DATA_PAGE, { imageInfo: imageInfoToUse });
  }

  function handleCompareButtonClick() {
    let metaDataArrayFor1stImage = imageInfo1?.metaData
    let metaDataArrayFor2ndImage = imageInfo2?.metaData
    if (metaDataArrayFor1stImage == null || metaDataArrayFor2ndImage == null) {
      return
    }    

    navigation.navigate(
      Pages.COMPARE_META_DATA_PAGE,
      {
        metaDataArray1: metaDataArrayFor1stImage,
        metaDataArray2: metaDataArrayFor2ndImage
      }
    );
  }
  return (
    <SafeAreaProvider style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView
          imageUri={imageInfo1?.uri}
          onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[0]) }}
          onPressShowMetaDataButton={imageInfo1 ? () => { handleShowMetaDataButtonClick(ContainerID[0]) } : null}
        />
        <CompareButton onPress={imageInfo1 && imageInfo2 ? handleCompareButtonClick : null}></CompareButton>
        <ContainerView
          imageUri={imageInfo2?.uri}
          onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[1]) }}
          onPressShowMetaDataButton={imageInfo2 ? () => { handleShowMetaDataButtonClick(ContainerID[1]) } : null}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const makeStyleSheet = (theme) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.primaryColor
    }
  })
}

export default CompareImageScreen;
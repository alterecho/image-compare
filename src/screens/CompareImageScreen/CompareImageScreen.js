import React, { useState } from "react";
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ContainerView from "../../common/components/ContainerView";
import { ImageInfo } from "../../structs";
import { Pages, ContainerID } from "../Constants";
import CompareButton from "./CompareButton";

const CompareImageScreen = ({ navigation }) => {
  const [imageInfo1, setImageInfo1] = useState(null);
  const [imageInfo2, setImageInfo2] = useState(null);

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
      const exifDataArray = Object
        .keys(exifData)
        .map(key => ({
          title: key, value: exifData[key]
        })
        )
      let imageInfo = ImageInfo(pickedImageURI, exifDataArray);
      if (containerID == ContainerID[0]) {
        setImageInfo1(imageInfo);
      } else {
        setImageInfo2(imageInfo);
      }
    } catch (error) {
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
    navigation.navigate(Pages.META_DATA_PAGE, { metaDataArray: imageInfoToUse.metaDataArray });
  }

  function handleCompareButtonClick() {
    let metaDataArrayFor1stImage = imageInfo1?.metaDataArray
    let metaDataArrayFor2ndImage = imageInfo2?.metaDataArray
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
    <SafeAreaView style={{ flex: 1 }}>
      <ContainerView
        imageUri={imageInfo1?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[0]) }}
        onPressShowMetaDataButton={imageInfo1 ? () => { handleShowMetaDataButtonClick(ContainerID[0]) } : null}
      />
      <CompareButton onPress={ imageInfo1 && imageInfo2 ?  handleCompareButtonClick : null}></CompareButton>
      <ContainerView
        imageUri={imageInfo2?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[1]) }}
        onPressShowMetaDataButton={imageInfo2 ? () => { handleShowMetaDataButtonClick(ContainerID[1]) } : null}
      />
    </SafeAreaView>
  )
}

export default CompareImageScreen;
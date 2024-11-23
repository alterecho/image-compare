import React, { useState } from "react";
import { SafeAreaView, Button, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ContainerView from "../../common/components/ContainerView";
import { MetaDataItem } from "../../structs";
import { Pages, ContainerID } from "../Constants";
import CompareButton from "./CompareButton";

const CompareImageScreen = ({ navigation }) => {
  const [metaDataItem1, setMetaDataItem1] = useState(null);
  const [metaDataItem2, setMetaDataItem2] = useState(null);

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
      console.log("exifData:\n", JSON.stringify(result.assets))
      const exifDataArray = Object
        .keys(exifData)
        .map(key => ({
          title: key, value: exifData[key]
        })
        )
      let metaDataItem = MetaDataItem(pickedImageURI, exifDataArray);
      if (containerID == ContainerID[0]) {
        setMetaDataItem1(metaDataItem);
      } else {
        setMetaDataItem2(metaDataItem);
      }
      console.log(`${JSON.stringify(metaDataItem1, null, 2)}`);
    } catch (error) {
      if (containerID == ContainerID[1]) {
        setMetaDataItem1(null)
      } else {
        setMetaDataItem2(null)
      }
    }
  };

  function handleCameraButtonClick(containerID) {

  }

  function handleShowMetaDataButtonClick(containerID) {
    let metaDataItemToUse = null
    switch (containerID) {
      case ContainerID[0]:
        metaDataItemToUse = metaDataItem1
        break;
      case ContainerID[1]:
        metaDataItemToUse = metaDataItem2
        break;
      default:
        break;
    }
    navigation.navigate(Pages.META_DATA_PAGE, { metaDataArray: metaDataItemToUse.metaDataArray });
  }

  function handleCompareButtonClick() {
    console.log("handleCompareButtonClick")
    let metaDataArrayFor1stImage = metaDataItem1?.metaDataArray
    let metaDataArrayFor2ndImage = metaDataItem2?.metaDataArray
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
        imageUri={metaDataItem1?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[0]) }}
        onPressCameraButton={() => handleCameraButtonClick(ContainerID[0])}
        onPressShowMetaDataButton={metaDataItem1 ? () => { handleShowMetaDataButtonClick(ContainerID[0]) } : null}
      />
      <CompareButton onPress={ metaDataItem1 && metaDataItem2 ?  handleCompareButtonClick : null}></CompareButton>
      <ContainerView
        imageUri={metaDataItem2?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[1]) }}
        onPressCameraButton={() => handleCameraButtonClick(ContainerID[1])}
        onPressShowMetaDataButton={metaDataItem2 ? () => { handleShowMetaDataButtonClick(ContainerID[1]) } : null}
      />
    </SafeAreaView>
  )
}

export default CompareImageScreen;
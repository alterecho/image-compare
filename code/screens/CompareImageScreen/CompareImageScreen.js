import React, { useState } from "react";
import { View, Button, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ContainerView from "../../common/components/ContainerView";
import { ImageInfo } from "../../../structs";
import CompareMetaDataScreen from "../CompareMetaDataScreen/CompareMetaDataScreen";
import { Pages, ContainerID } from "../Constants";

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
        console.log(`handleAddPictureButtonClick: cancelled`);
        return; // Exit if cancelled
      }

      let pickedImageURI = result.assets[0].uri;
      console.log(`Picked Image URI (for ${containerID}): ${pickedImageURI}`);

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
      console.log(`${JSON.stringify(imageInfo1, null, 2)}`);
    } catch (error) {
      if (containerID == ContainerID[1]) {
        setImageInfo1(null)
      } else {
        setImageInfo2(null)
      }

      console.log(`handleAddPictureButtonClick error: ${error.message}`);
    }
  };

  function handleCameraButtonClick(containerID) {
    console.log(`${containerID} onPressCameraButton`)
  }

  function handleShowMetaDataButtonClick(containerID) {
    let imageInfoToUse = null
    switch (containerID) {
      case ContainerID[0]:
        console.log("ContainerID[0]")
        imageInfoToUse = imageInfo1
        break;
      case ContainerID[1]:
        console.log("ContainerID[1]")
        imageInfoToUse = imageInfo2
        break;
      default:
        console.log("default")
        break;
    }
    navigation.navigate(Pages.META_DATA_PAGE, { metaDataArray: imageInfoToUse.metaDataArray });
  }

  return (
    <View style={{ flex: 1 }}>
      <ContainerView
        imageUri={imageInfo1?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[0]) }}
        onPressCameraButton={() => handleCameraButtonClick(ContainerID[0])}
        onPressShowMetaDataButton={imageInfo1 ? () => { handleShowMetaDataButtonClick(ContainerID[0]) } : null}
      />
      <ContainerView
        imageUri={imageInfo2?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[1]) }}
        onPressCameraButton={() => handleCameraButtonClick(ContainerID[1])}
        onPressShowMetaDataButton={imageInfo2 ? () => { handleShowMetaDataButtonClick(ContainerID[1]) } : null}
      />
    </View>
  )
}

export default CompareImageScreen;
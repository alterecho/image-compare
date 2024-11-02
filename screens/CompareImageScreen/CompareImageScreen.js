import React, { useState } from "react";
import {View, Button, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import styles from "../../styles";
import { ContainerView } from "./CompareImageScreenComponents"
import { ImageInfo } from "../../structs";

const CompareImageScreen = ({ navigation }) => {
  const [imageInfo1, setImageInfo1] = useState(null);
  const [imageInfo2, setImageInfo2] = useState(null);
  
  const handleAddPictureButtonClick = async () => {
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
      console.log(`Picked Image URI: ${pickedImageURI}`);

      const exifData = result.assets[0].exif;
      const exifDataArray = Object
        .keys(exifData)
        .map(key => ({
          title: key, value: exifData[key]
        })
        )
      let imageInfo1 = ImageInfo(pickedImageURI, exifDataArray);
      setImageInfo1(imageInfo1);

      console.log(`${JSON.stringify(imageInfo1, null, 2)}`);
    } catch (error) {
      setImageInfo1(null)
      console.log(`handleAddPictureButtonClick error: ${error.message}`);
    }
  };

  function handleCameraButtonClick() {
    console.log("1 onPressCameraButton")
  }

  function handleCompareButtonClick() {
    navigation.navigate('meta', { selectedImageMetaDataArray: imageInfo1.metaDataArray });
  }

  return (
    <View style={{ flex: 1 }}>
      <ContainerView
        id='1'
        imageUri={imageInfo1?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick() }}
        onPressCameraButton={() => handleCameraButtonClick()}
        onPressShowEXIFButton={imageInfo1 ? () => { handleCompareButtonClick() } : null }
      />
      <ContainerView
        id='2'
        imageUri={imageInfo1?.uri}
        onPressAddPictureButton={() => { console.log("2 onPressAddPictureButton") }}
        onPressCameraButton={() => { console.log("2 onPressCameraButton") }}
        onPressShowEXIFButton={imageInfo1 ? () => { console.log("2 onPressShowEXIFButton") } : null }
      />
    </View>
  )
}

export default CompareImageScreen;
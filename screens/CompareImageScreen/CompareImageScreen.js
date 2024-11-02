import React, { useState } from "react";
import {View, Button, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import styles from "../../styles";
import { ContainerView } from "./CompareImageScreenComponents"

const CompareImageScreen = ({ navigation }) => {
  const [selectedImageMetaDataArray, setSelectedImageMetaDataArray] = useState(null)
  const [imageUri, setImageUri] = useState(null);
  
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
      setImageUri(pickedImageURI);
      console.log(`Picked Image URI: ${pickedImageURI}`);

      const exifData = result.assets[0].exif
      setSelectedImageMetaDataArray(
        Object.keys(exifData)
        .map(
          key => ({
             title: key, value: exifData[key] 
            }
          )
        )
      );
      console.log(`${JSON.stringify(selectedImageMetaDataArray, null, 2)}`);
      console.log(`Picked Image EXIF: ${selectedImageMetaDataArray}`);
    } catch (error) {
      setSelectedImageMetaDataArray(null)
      console.log(`handleAddPictureButtonClick error: ${error.message}`);
    }
  };

  function handleCameraButtonClick() {
    console.log("1 onPressCameraButton")
  }

  function handleCompareButtonClick() {
    console.log(`1 onPressShow EXIFButton, ${selectedImageMetaDataArray}`)
    navigation.navigate('meta', { selectedImageMetaDataArray: selectedImageMetaDataArray });
  }

  console.log(`onPressShowEXIFButton selectedImageMetaDataArray: ${selectedImageMetaDataArray}`)
  return (
    <View style={{ flex: 1 }}>
      <ContainerView
        id='1'
        imageUri={imageUri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick() }}
        onPressCameraButton={() => handleCameraButtonClick()}
        onPressShowEXIFButton={selectedImageMetaDataArray ? () => { handleCompareButtonClick() } : null }
      />
      <ContainerView
        id='2'
        imageUri={imageUri}
        onPressAddPictureButton={() => { console.log("2 onPressAddPictureButton") }}
        onPressCameraButton={() => { console.log("2 onPressCameraButton") }}
        onPressShowEXIFButton={selectedImageMetaDataArray ? () => { console.log("2 onPressShowEXIFButton") } : null }
      />
    </View>
  )
}

export default CompareImageScreen;
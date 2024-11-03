import React, { useState } from "react";
import {View, Button, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import styles from "../../styles";
import { ContainerView } from "./CompareImageScreenComponents"
import { ImageInfo } from "../../structs";

const CompareImageScreen = ({ navigation }) => {
  const [imageInfo1, setImageInfo1] = useState(null);
  const [imageInfo2, setImageInfo2] = useState(null);
  
  const handleAddPictureButtonClick = async (id) => {
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
      console.log(`Picked Image URI (for ${id}): ${pickedImageURI}`);

      const exifData = result.assets[0].exif;
      const exifDataArray = Object
        .keys(exifData)
        .map(key => ({
          title: key, value: exifData[key]
        })
        )
      let imageInfo = ImageInfo(pickedImageURI, exifDataArray);
      if (id == 1) {
        setImageInfo1(imageInfo);
      } else {
        setImageInfo2(imageInfo);
      }
      console.log(`${JSON.stringify(imageInfo1, null, 2)}`);
    } catch (error) {
      if (id == 1) {
        setImageInfo1(null)
      } else {
        setImageInfo2(null)
      }
      
      console.log(`handleAddPictureButtonClick error: ${error.message}`);
    }
  };

  function handleCameraButtonClick(id) {
    console.log(`${id} onPressCameraButton`)
  }

  function handleCompareButtonClicked(id) {
    console.log(`${id} onPressCameraButton`)
    navigation.navigate('meta', { selectedImageMetaDataArray: imageInfo1.metaDataArray });
  }

  return (
    <View style={{ flex: 1 }}>
      <ContainerView
        imageUri={imageInfo1?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(1) }}
        onPressCameraButton={() => handleCameraButtonClick(1)}
        onPressShowEXIFButton={imageInfo1 ? () => { handleCompareButtonClick(1) } : null }
      />
      <ContainerView
        imageUri={imageInfo2?.uri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick(2) }}
        onPressCameraButton={() => handleCameraButtonClick(2)}
        onPressShowEXIFButton={imageInfo1 ? () => { handleCompareButtonClick(2) } : null }
      />
    </View>
  )
}

export default CompareImageScreen;
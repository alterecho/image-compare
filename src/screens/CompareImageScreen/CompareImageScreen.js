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
  return (
    <SafeAreaProvider style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView
          imageInfo={imageInfo1}
          onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[0]) }}
        />
        <CompareButton onPress={imageInfo1 && imageInfo2 ? handleCompareButtonClick : null}></CompareButton>
        <ContainerView
          imageInfo={imageInfo2}
          onPressAddPictureButton={() => { handleAddPictureButtonClick(ContainerID[1]) }}
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
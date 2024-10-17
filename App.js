import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, Dimensions, useWindowDimensions, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {

  const Toolbar = ({ onPressCameraButton, onPressAddPictureButton, onPressShowEXIFButton }) => {
    return (
      <View style={styles.toolbar}>
        <Button title='add' onPress={onPressAddPictureButton} />
        <Button title='camera' onPress={onPressCameraButton} />
        <Button title='compare' onPress={onPressShowEXIFButton} />
      </View>
    );

  }

  const ContainerView = ({ id, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {
    return (
      <View style={[styles.container, { backgroundColor: getRandomColor() }]}>
        <Toolbar
          onPressAddPictureButton={onPressAddPictureButton}
          onPressCameraButton={onPressCameraButton}
          onPressShowEXIFButton={onPressShowEXIFButton}
        />
      </View>
    );
  }

  const getRandomColor = () => {
    let color = {
      r: Math.random() * 256,
      g: Math.random() * 256,
      b: Math.random() * 256,
    }

    console.log(`rgb: ${JSON.stringify(color)}`)
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };
  console.log("returning View")

  const handleAddPictureButtonClick = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }
      let result = await ImagePicker.launchImageLibraryAsync(options)
      if (result.cancelled) {
        console.log(`handleAddPictureButtonClick: cancelled`)
      } else {
        console.log(`handleAddPictureButtonClick: ${result}`)
      }
    } catch (error) {
      console.log(`handleAddPictureButtonClick: ${error}`);
    }
  };

  function handleCameraButtonClick() {
    console.log("1 onPressCameraButton")
  }

  function handleCompareButtonClick() {
    console.log("1 onPressShowEXIFButton")
  }

  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <ContainerView
        id='1'
        onPressAddPictureButton={() => { handleAddPictureButtonClick() }}
        onPressCameraButton={handleCameraButtonClick()}
        onPressShowEXIFButton={handleCompareButtonClick()}
      />
      <ContainerView
        id='2'
        onPressAddPictureButton={() => { console.log("2 onPressAddPictureButton") }}
        onPressCameraButton={() => { console.log("2 onPressCameraButton") }}
        onPressShowEXIFButton={() => { console.log("2 onPressShowEXIFButton") }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#6200EE',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  mainContainer: {
    flex: 1
  },
  container: {
    backgroundColor: `yellow`,
    flex: 1
  }
});

export default App;

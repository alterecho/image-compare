import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Button, View, Text, StyleSheet, Dimensions, useWindowDimensions, SafeAreaView, PanResponder } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [ 
          null, 
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0},
          useNativeDriver: false
        }).start();
      },
    })
  ).current
  
  const [imageUri, setImageUri] = useState(null);
  const Toolbar = ({ onPressCameraButton, onPressAddPictureButton, onPressShowEXIFButton }) => {
    return (
      <View style={styles.toolbar}>
        <Button title='add' onPress={onPressAddPictureButton} />
        <Button title='camera' onPress={onPressCameraButton} />
        <Button title='compare' onPress={onPressShowEXIFButton} />
      </View>
    );
  }

  const ImageDisplayView = ( { imageUri }) => {
    return (
      imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null
    )
  }

  const ContainerView = ({ id, imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {
    return (
      <View style={[styles.container, { backgroundColor: getRandomColor() }]}>
        <Toolbar
          onPressAddPictureButton={onPressAddPictureButton}
          onPressCameraButton={onPressCameraButton}
          onPressShowEXIFButton={onPressShowEXIFButton}
        />
        <ImageDisplayView imageUri={imageUri}></ImageDisplayView>
      </View>
    );
  }

  const getRandomColor = () => {
    let color = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
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
        console.log(`handleAddPictureButtonClick: ${result.uri}`)
        setImageUri(result.assets[0].uri)
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
        imageUri={imageUri}
        onPressAddPictureButton={() => { handleAddPictureButtonClick() }}
        onPressCameraButton={() => handleCameraButtonClick()}
        onPressShowEXIFButton={() => handleCompareButtonClick()}
      />
      <ContainerView
        id='2'
        imageUri={imageUri}
        onPressAddPictureButton={() => { console.log("2 onPressAddPictureButton") }}
        onPressCameraButton={() => { console.log("2 onPressCameraButton") } }
        onPressShowEXIFButton={() => { console.log("2 onPressShowEXIFButton") } }
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
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Button, View, Text, StyleSheet, Dimensions, useWindowDimensions, SafeAreaView, PanResponder, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const CompareMetaDataScreen = ({ route }) => {

  const MetaDataTableView = ({ metaDataArray }) => {
    const MetaDataCell = ({ metaData }) => {
      return (
        <View>
          <Text>{metaData.title}</Text>
          <Text>{metaData.value}</Text>
        </View >
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={ metaDataArray }
          keyExtractor={(dataItem) => dataItem.title}
          renderItem={({ item }) => <MetaDataCell metaData={item} />}
        />
      </View >
    )
  }

  const metaDataArray = route.params.selectedImageMetaDataArray
  console.log(`CompareMetaDataScreen: ${metaDataArray} (${JSON.stringify(route)})`);
  return (
    <View style={styles.container}>
      <MetaDataTableView style={{ flex: 0.25 }} metaDataArray={metaDataArray} />
      <MetaDataTableView style={{ flex: 0.75 }} metaDataArray={metaDataArray} />
    </View>
  )
}

const CompareImageScreen = ({ navigation }) => {
  const [selectedImageMetaDataArray, setSelectedImageMetaDataArray] = useState(null)
  const [imageUri, setImageUri] = useState(null);
  const Toolbar = ({ onPressCameraButton, onPressAddPictureButton, onPressShowEXIFButton }) => {
    console.log(`>>>>> render toolbar onPressShowEXIFButton: ${onPressShowEXIFButton}`)
    return (
      <View style={styles.toolbar}>
        <Button title='add' onPress={onPressAddPictureButton} />
        <Button title='camera' onPress={onPressCameraButton} />
        <Button title='compare' onPress={onPressShowEXIFButton} disabled={!onPressShowEXIFButton} />
      </View>
    );
  }

  const ImageDisplayView = ({ imageUri }) => {
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={CompareImageScreen} />
        <Stack.Screen name='meta' component={CompareMetaDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;

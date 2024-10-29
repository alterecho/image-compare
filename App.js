import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Button, View, Text, StyleSheet, Dimensions, useWindowDimensions, SafeAreaView, PanResponder, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const CompareMetaDataScreen = ({ route }) => {

  const metaDataArray = route.params.selectedImageMetaDataArray
  const MetaDataCell = ({metaData}) => (
    <View>
      <Text>{metaData.title}</Text>
      <Text>{metaData.value}</Text>
    </View>
  );
  console.log(`CompareMetaDataScreen: ${metaDataArray} (${JSON.stringify(route)})`);
  return (
    <View style={styles.container}>
      <FlatList data={metaDataArray}
        keyExtractor={(metaData) => metaData.title}
        renderItem={({ item }) => <MetaDataCell metaData={item} />} />
    </View>
  )
}

const CompareImageScreen = ({ navigation }) => {
  const selectedImageMetaDataArray = useRef(null)
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
      selectedImageMetaDataArray.current = Object.keys(exifData).map(key => ({ title: key, value: exifData[key] }));
      console.log(`${JSON.stringify(selectedImageMetaDataArray, null, 2)}`);
      console.log(`Picked Image EXIF: ${selectedImageMetaDataArray}`);
    } catch (error) {
      selectedImageMetaDataArray.current = null
      console.log(`handleAddPictureButtonClick error: ${error.message}`);
    }
  };

  function handleCameraButtonClick() {
    console.log("1 onPressCameraButton")
  }

  function handleCompareButtonClick() {
    console.log(`1 onPressShow EXIFButton, ${selectedImageMetaDataArray.current}`)
    navigation.navigate('meta', { selectedImageMetaDataArray: selectedImageMetaDataArray.current });
  }

  return (
    <View style={{ flex: 1 }}>
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
        onPressCameraButton={() => { console.log("2 onPressCameraButton") }}
        onPressShowEXIFButton={() => { console.log("2 onPressShowEXIFButton") }}
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
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;

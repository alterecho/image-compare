  import React from "react";
  import { View, Image, Button } from "react-native";
  import styles from "../../styles";
  import { getRandomColor } from "../../Utils";

  const ImageDisplayView = ({ imageUri }) => {
    return (
      imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null
    )
  }

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

  export const ContainerView = ({ id, imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {
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
  import React from "react";
  import { View, Image, Button, StyleSheet } from "react-native";
  import { getRandomColor } from "../../Utils";

  const ImageDisplayView = ({ imageUri }) => {
    return (
      imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null
    )
  }

  const Toolbar = ({ onPressCameraButton, onPressAddPictureButton, onPressShowEXIFButton }) => {
    console.log(`>>>>> render toolbar onPressShowEXIFButton: ${onPressShowEXIFButton}`)
    return (
      <View style={ styles.toolbar }>
        <Button title='add' onPress={onPressAddPictureButton} />
        <Button title='camera' onPress={onPressCameraButton} />
        <Button title='compare' onPress={onPressShowEXIFButton} disabled={!onPressShowEXIFButton} />
      </View>
    );
  }

  export const ContainerView = ({ imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {   
    return (
      <View style={[ styles.containerView, { backgroundColor: getRandomColor() }]}>
        <Toolbar
          onPressAddPictureButton={onPressAddPictureButton}
          onPressCameraButton={onPressCameraButton}
          onPressShowEXIFButton={onPressShowEXIFButton}
        />
        <ImageDisplayView imageUri={imageUri}></ImageDisplayView>
      </View>
    );
}

const styles = StyleSheet.create(
  {
    containerView: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: 'clear'
    },
    toolbar: {
      flex: 1,
      backgroundColor: '#6200EE',
      height: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    image: {
      width: 200,
      height: 200,
    },
  }
)
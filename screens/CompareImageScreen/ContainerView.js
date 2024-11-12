  import React, { useRef } from "react";
  import { View, Image, Button, StyleSheet, Animated } from "react-native";
  import { getRandomColor } from "../../Utils";
  import ImageDisplayView from "./ImageDisplayView";
  import Toolbar from "./Toolbar";
  
  const ContainerView = ({ imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {   
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
      flexDirection: "column",
      backgroundColor: 'clear',
      justifyContent: 'flex-start',
      // alignContent: 'flex-start'
    }
  }
)

export default ContainerView;
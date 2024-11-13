import React, { useRef } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import { getRandomColor } from "../../Utils";
import Toolbar from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const ContainerView = ({ imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panGestureHandler = Gesture.Pan().onUpdate(
    (event) => {
      translateX.value = event.translationX
      translateY.value = event.translationY
    }
  )
  const panGestureStyle = useAnimatedStyle(() => (
    {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  ))

  return (
    <View style={[styles.containerView, { backgroundColor: getRandomColor() }]}>
      <Toolbar
        onPressAddPictureButton={onPressAddPictureButton}
        onPressCameraButton={onPressCameraButton}
        onPressShowEXIFButton={onPressShowEXIFButton}
      />
      <GestureHandlerRootView style={[styles.imageContainerView]}>
        <GestureDetector gesture={panGestureHandler}>
          <Animated.View style={[panGestureStyle]}>
            <Image source={{ uri: imageUri }} style={[styles.image]} />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
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
    },
    imageContainerView: {
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: "center",
      overflow: 'hidden'
    },
    image: {
      width: 200,
      height: 200,
      backgroundColor: '#ff0000',
    }
  }
)

export default ContainerView;
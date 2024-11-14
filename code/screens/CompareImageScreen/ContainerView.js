import React, { useRef } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const ContainerView = ({ imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGestureHandler = Gesture.Pan()
  .onStart((event) => {
    
    startX.value = translateX.value
    startY.value = translateY.value
    console.log(`>>>>> onStart, ${startX.value} ${startY.value}`);
    console.log(`>>>>> onStart, ${translateX.value} ${translateY.value}`);
  })
  .onUpdate(
    (event) => {
      console.log(`>>>>> onUpdate, ${startX.value} ${startY.value}`);
      console.log(`>>>>> onUpdate, ${translateX.value} ${translateY.value}`);  
      translateX.value = startX.value + event.translationX
      translateY.value = startY.value + event.translationY
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
    <View style={[styles.containerView, { backgroundColor: Utils.getRandomColor() }]}>
      <Toolbar
        onPressAddPictureButton={onPressAddPictureButton}
        onPressCameraButton={onPressCameraButton}
        onPressShowEXIFButton={onPressShowEXIFButton}
      />
      <GestureHandlerRootView style={[{ flex: 1 }, Utils.makeBorderStyle(null, 'yellow', 10)]}>
        <GestureDetector gesture={panGestureHandler}>
          <Animated.View style={[Utils.makeBorderStyle({ flex: 1 }, 'blue', 10)]}>
            <Animated.View style={[Utils.makeBorderStyle({ flex: 1 }, 'yellow', 10), panGestureStyle]}>
              <Image source={{ uri: imageUri }} style={[styles.image]} />
            </Animated.View>
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
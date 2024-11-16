import React, { useEffect, useRef, useState } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const ContainerView = ({ imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowEXIFButton }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    console.log(`useEffect getSize for ${imageUri}`);
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        console.log(" for size:", imageSize);
        setImageSize({ width, height });
      }, error => {
        console.log(`error: ${error}`)
      })
    }
  }, [imageUri]);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const scale = useSharedValue(1.0);

  const panGestureHandler = Gesture
    .Pan()
    .onStart((event) => {

      startX.value = translateX.value
      startY.value = translateY.value
      // console.log(`>>>>> onStart, ${startX.value} ${startY.value}`);
      console.log(`>>>>> onStart, ${translateX.value} ${translateY.value}`);
    })
    .onUpdate(
      (event) => {
        // console.log(`>>>>> onUpdate, ${startX.value} ${startY.value}`);
        console.log(`>>>>> onUpdate, ${translateX.value} ${translateY.value}`);
        translateX.value = startX.value + event.translationX
        translateY.value = startY.value + event.translationY
      }
    );

  const gestureStyle = useAnimatedStyle(() => (
    {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },

      ]
    }
  ))

  const tapGestureHandler = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      console.log("tapGestureHandler: ");
      translateX.value = 0.0
      translateY.value = 0.0
      scale.value = scale.value === 1.0 ? 0.75 : 1.0;

      console.log("tapGestureHandler: ", scale.value);
    });

  const combinedGestureHandlers = Gesture.Simultaneous(panGestureHandler, tapGestureHandler)

  const scl = 0.125
  return (
    <View style={[styles.containerView, { backgroundColor: Utils.getRandomColor() }]}>
      <Toolbar
        onPressAddPictureButton={onPressAddPictureButton}
        onPressCameraButton={onPressCameraButton}
        onPressShowEXIFButton={onPressShowEXIFButton}
      />
      <GestureHandlerRootView style={[{ flex: 1 }, Utils.makeBorderStyle(null, 'yellow', 10), styles.imageContainerView]}>
        <GestureDetector gesture={combinedGestureHandlers}>
          <Animated.View style={[Utils.makeBorderStyle({ flex: 1 }, 'blue', 10)]}>
            <Animated.View style={[Utils.makeBorderStyle(null, 'red', 10), {
              overflow: "hidden",
              alignContent: 'center',
              justifyContent: 'center'
            }, gestureStyle]}>
              <Image
                source={{ uri: imageUri }}
                style={{
                  height: imageSize.height * scl,
                  width: imageSize.width * scl
              }}
              resizeMode="stretch"
                          />
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
      backgroundColor: 'clear'
      // justifyContent: 'flex-start',
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

      backgroundColor: '#ff0000'
    }
  }
)

export default ContainerView;
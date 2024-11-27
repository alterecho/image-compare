import React, { useEffect, useRef, useState } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import AnimatedImage from "./AnimatedImage";
import { Size } from "../../structs";

const ContainerView = ({ imageUri, onPressAddPictureButton, onPressShowMetaDataButton }) => {
  const [imageSize, setImageSize] = useState(Size(0, 0));
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1.0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(0);

  const [viewSize, setViewSize] = useState(Size(0, 0))

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        setImageSize(Size(width, height));
      }, error => {
        // handle error
      })
    }
  }, [imageUri]);

  useEffect(() => {
    fitInContainer()
  }, [imageSize]);

  const gestureStyle = useAnimatedStyle(() => (
    {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  ))

  const fitInContainer = (newScale = null) => {
    if (!viewSize.width || !viewSize.height) {
      return 1.0
    }
    newScale = newScale ?? viewSize.height / imageSize.height
    if (imageSize.width * newScale > viewSize.width) {
      newScale *= viewSize.width / (imageSize.width * newScale)
    }
    recenterWithScale(newScale)
  }

  const recenterWithScale = (newScale = null) => {
    translateX.value = 0.0
    translateY.value = 0.0
    if (newScale) {
      scale.value = newScale
    }
  }

  const toggleScale = () => {
    if (!(imageSize) || !(viewSize)) {
      return
    }
    let newScale = scale.value
    if (newScale === 1.0) {
      fitInContainer()
    } else {
      recenterWithScale(1.0)
    }
  }

  const tapGestureHandler = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(toggleScale)();
    });

  const panGestureHandler = Gesture.Pan().onStart((event) => {
    startX.value = translateX.value
    startY.value = translateY.value
  }).onUpdate((event) => {
    translateX.value = startX.value + event.translationX
    translateY.value = startY.value + event.translationY
  });

  const pinchGestureHandler = Gesture.Pinch().onStart((event) => {
    startScale.current = scale.value
  }).onUpdate((event) => {
    let newScale = startScale.current * event.scale
    if (newScale < 0.2) {
      newScale = 0.2
    }
    scale.value = newScale
  })

  const combinedGestureHandlers = Gesture.Simultaneous(
    panGestureHandler,
    tapGestureHandler,
    pinchGestureHandler
  )

  return (
    <View style={[styles.containerView]}>
      <Toolbar
        onPressAddPictureButton={onPressAddPictureButton}
        onPressShowMetaDataButton={onPressShowMetaDataButton}
      />
      <GestureHandlerRootView style={
        [
          { flex: 1 }
        ]
      }>
        <GestureDetector gesture={combinedGestureHandlers}>
          <Animated.View
            style={[
              {
                flex: 1, justifyContent: 'center', alignItems: 'center',
                overflow: "hidden"
              }
            ]}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setViewSize({ width, height })
            }}>
            <AnimatedImage
              source={{ uri: imageUri }}
              style={[{
                height: imageSize.height,
                width: imageSize.width
              }, gestureStyle]}
              resizeMode="contain"
            />
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
      flexDirection: 'column',
      backgroundColor: 'lightGray'
    },
    imageContainerView: {
      flex: 1,
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    },
    image: {

      backgroundColor: '#ff0000'
    }
  }
)

export default ContainerView;
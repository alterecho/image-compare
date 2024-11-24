import React, { useEffect, useRef, useState } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import { Point } from "../../structs";

const ContainerView = ({ imageUri, onPressAddPictureButton, onPressCameraButton, onPressShowMetaDataButton }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1.0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(0);

  let imageCenter = Point(0, 0);
  // useEffect(() => {

  //   if (!imageSize.width || !imageSize.height) {
  //     imageCenter = Point(0, 0);
  //   }

  //   imageCenter = Point(
  //     viewSize.width * 0.5 - imageSize.width * scale * 0.5,
  //     viewSize.height * 0.5 - imageSize.height * scale * 0.5
  //   )

  //   console.log("imageCenter: ", imageCenter)
  // }, [scale])

  const [viewSize, setViewSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) => {
        setImageSize({ width, height });
      }, error => {
        // handle error
      })
    }
  }, [imageUri]);

  useEffect(() => {
    resizeImageToFitInContainer();
    recenterImage()
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

  const recenterImage = () => {
    translateX.value = imageCenter.x;
    translateY.value = imageCenter.y;
  }

  const resizeImageToFitInContainer = () => {
    if (!viewSize.width || !viewSize.height) {
      return
    }
    let newScale = viewSize.height / imageSize.height
    if (imageSize.width * newScale > viewSize.width) {
      newScale *= viewSize.width / (imageSize.width * newScale)
    }
    scale.value = newScale
  }

  const toggleScale = () => {
    if (!(imageSize) || !(viewSize)) {
      return
    }
    if (scale.value === 1.0) {
      resizeImageToFitInContainer()
    } else {
      scale.value = 1.0
    }
  }


  const tapGestureHandler = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(toggleScale)();
    });

    const repositionToPreventPanOutOfBounds = () => {
      let x = translateX.value
      let y = translateY.value
      let scaleValue = scale.value
      // if point exceeds right
      if (x > viewSize.width) {
        x = viewSize.width
        // if point exceeds left
      } else if (x + imageSize.width * scaleValue < 0) {
        x = 0
      }
  
      // if point exceeds top
      if (y > viewSize.height) {
        y = viewSize.height
      // if point exceeds bottom
      } else if (y + imageSize.height * scaleValue < 0) {
        y = 0
      }
      translateX.value = x
      translateY.value = y
    }
  

  const panGestureHandler = Gesture.Pan().onStart((event) => {
    startX.value = translateX.value
    startY.value = translateY.value
  }).onUpdate((event) => {
    translateX.value = startX.value + event.translationX
    translateY.value = startY.value + event.translationY
    runOnJS(repositionToPreventPanOutOfBounds)()
  });

  const pinchGestureHandler = Gesture.Pinch().onStart((event) => {
    startScale.current = scale.value
  }).onUpdate((event) => {
    let newScale = startScale.current * event.scale
    if (newScale < 0.2) {
      newScale = 0.2
    }
    scale.value = newScale
    runOnJS(repositionToPreventPanOutOfBounds)()
  })

  const combinedGestureHandlers = Gesture.Simultaneous(
    panGestureHandler,
    tapGestureHandler,
    pinchGestureHandler
  )

  const scl = 1.0
  return (
    <View style={[styles.containerView, { backgroundColor: Utils.getRandomColor() }]}>
      <Toolbar
        onPressAddPictureButton={onPressAddPictureButton}
        onPressCameraButton={onPressCameraButton}
        onPressShowMetaDataButton={onPressShowMetaDataButton}
      />
      <GestureHandlerRootView style={
        [
          { flex: 1 },
          Utils.makeBorderStyle('yellow'),
          styles.imageContainerView
        ]
      }>
        <GestureDetector gesture={combinedGestureHandlers}>
          <Animated.View
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center'
              },
              Utils.makeBorderStyle('blue', 4.0)
            ]}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setViewSize({ width, height })
            }}
          >
            <Animated.View
              style={[Utils.makeBorderStyle('red'), {
                overflow: 'hidden'
              }, Utils.makeBorderStyle('red', 3.0),
                gestureStyle
              ]}
            >
              <Image
                source={{ uri: imageUri }}
                style={{
                  height: imageSize.height * scale.value,
                  width: imageSize.width * scale.value
                }}
                resizeMode="contain"
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
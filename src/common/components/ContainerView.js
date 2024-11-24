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
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(0);

  let imageCenter = Point(0, 0);
  useEffect(() => {
    
    if (!imageSize.width || !imageSize.height) {
      imageCenter = Point(0, 0);
    }

    imageCenter = Point(
      viewSize.width * 0.5 - imageSize.width * scale * 0.5,
      viewSize.height * 0.5 - imageSize.height * scale * 0.5
    )

    console.log("imageCenter: ", imageCenter)
  }, [scale])

  const [scale, setScale] = useState(1.0);
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

  const panGestureHandler = Gesture.Pan().onStart((event) => {
    startX.value = translateX.value
    startY.value = translateY.value
  }).onUpdate((event) => {
    const finalX = startX.value + event.translationX
    const finalY = startY.value + event.translationY
    if (finalX < viewSize.width && finalX + imageSize.width * scale > 0) {
      translateX.value = finalX
    }
    if (finalY < viewSize.height && finalY + imageSize.height * scale > 0) {
      translateY.value = finalY
    }
  });

  const gestureStyle = useAnimatedStyle(() => (
    {
      transform: [
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
    setScale(newScale)
  }

  const toggleScale = () => {
    if (!(imageSize) || !(viewSize)) {
      return
    }
    if (scale === 1.0) {
      resizeImageToFitInContainer()
    } else {
      setScale(1.0)
    }
  }

  const tapGestureHandler = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(toggleScale)();
    });

  const pinchGestureHandler = Gesture.Pinch().onStart((event) => {
    startScale.current = scale
  }).onUpdate((event) => {
    let newScale = startScale.current * event.scale
    if (newScale < 0.2) {
      newScale = 0.2
    }
    runOnJS(setScale)(newScale)
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
                width: imageSize.width * scale,
                height: imageSize.height * scale,
                overflow: 'hidden'
              },
                gestureStyle
              ]}
            >
              <Image
                source={{ uri: imageUri }}
                style={{
                  height: imageSize.height * scale,
                  width: imageSize.width * scale
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
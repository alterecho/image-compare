  import React, { useRef } from "react";
  import { View, Image, Button, StyleSheet, Animated } from "react-native";
  import { getRandomColor } from "../../Utils";
  import {
    GestureHandlerRootView,
    PanGestureHandler,
    RotationGestureHandler
  } from 'react-native-gesture-handler'
  import Aminated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
  } from 'react-native-reanimated'

  const ImageDisplayView = ({ imageUri }) => {
    const translateX = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(0)).current
    const handleOnGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY
        },
      },
    ],
    {
      useNativeDriver: true
    }
  )

    const handlePanGestureStatChange = (event) => {
      console.log(event)
    };

    return (
      imageUri ?
      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={handleOnGestureEvent}
          onHandlerStateChange={handlePanGestureStatChange}
        >
          <Animated.Image
           source={{ uri: imageUri }} 
          style={
                [styles.image,
                  {
                    transform: [
                      { translateX },
                      { translateY }
                    ]
                  }
                  ]} />
          </PanGestureHandler>
      </GestureHandlerRootView>
      : null
    );
  };

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
      backgroundColor: 'clear',
      justifyContent: 'center',
      alignContent: 'center'
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
      flex: 1,
      width: 200,
      height: 200,
      backgroundColor: '#6200EE',
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 500
    },
  }
)
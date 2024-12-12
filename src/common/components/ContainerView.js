import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar, { Mode as ToolbarMode } from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import AnimatedImage from "./AnimatedImage";
import { Size } from "../../structs";
import Theme from "../../Theme";
import Overlay from "./Overlay";
import MetaDataView from "./MetaDataView";
import TestMetaData from "../../../tests/data/metadata-sample1.json"
import { Config as ToolbarConfig } from "./Toolbar";

export function Config(
  imageInfo,
  comparisonImageInfo,
  onPressAddPictureButton, 
  onPressCameraButton, 
  onSelectMetaDataItem
) {
  return Object.freeze(
    imageInfo, 
    comparisonImageInfo,
    onPressAddPictureButton, 
    onPressCameraButton, 
    onSelectMetaDataItem
  )
}

const ContainerView = forwardRef(
  ({ config  }, ref) => {
    const metaDataViewRef = useRef(null)
    const [imageSize, setImageSize] = useState(Size(0, 0));
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1.0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const startScale = useSharedValue(0);
    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = makeStyleSheet(theme)
    const [viewSize, setViewSize] = useState(Size(0, 0))
    const [isShowMetaData, setIsShowMetaData] = useState(false);
    const selectedIndices = useRef([]);

    useImperativeHandle(ref, () => (
      {
        imageInfo: config?.imageInfo,

        showInfoOverlay: () => {
          setIsShowMetaData(true)          
        },
        
        selectIndices: (indices) => {
          metaDataViewRef?.current?.selectIndices(indices);
        },

        scrollToIndex: (index) => {
          metaDataViewRef?.current?.scrollToIndex(index);
        }
      }
    ));

    // imageInfo changed
    useEffect(() => {
      if (config?.imageInfo) {
        Image.getSize(config?.imageInfo.uri, (width, height) => {
          setImageSize(Size(width, height));
        }, error => {
          // handle error
        })
      }
    }, [config?.imageInfo]);

    useEffect(() => {
      fitInContainer()
    }, [imageSize]);

    const gestureStyle = useAnimatedStyle(() => (
      {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { scale: scale.value }
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

    const toolbarConfig = ToolbarConfig({
      mode: isShowMetaData ? ToolbarMode.cancelButtonOnly :  ToolbarMode.default,
      onPressAddPictureButton: config.onPressAddPictureButton,
      isAddPictureButtonEnabled: true,
      onPressCameraButton: config.onPressCameraButton,
      isCameraButtonEnabled: true,
      onPressImageInfoButton: () => {
        setIsShowMetaData(true)
      },
      onPressCloseButton: () => {
        setIsShowMetaData(false)
      },
      isImageInfoButtonEnabled: config?.imageInfo == null ? false : true,
    });

    return (
      <View style={[styles.containerView]}>
        <Toolbar config={toolbarConfig} />
        <View style={{ flex: 1 }}>
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
                  source={{ uri: config?.imageInfo?.uri }}
                  style={[{
                    height: imageSize.height,
                    width: imageSize.width
                  }, gestureStyle]}
                  resizeMode="contain"
                />
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
          {
            isShowMetaData &&
            <Overlay>
              <MetaDataView
                ref={metaDataViewRef}
                style={{
                  flex: 1,
                  backgroundColor: 'red'
                }}
                metaData={config?.imageInfo?.metaData}
                comparisonMetaData={config?.comparisonImageInfo?.metaData}
                onSelectMetaDataItemHandler={config?.onSelectMetaDataItem}
              >
              </MetaDataView>
            </Overlay>
          }
        </View>
      </View>
    );
  })

const makeStyleSheet = (theme) => {
  return StyleSheet.create(
    {
      containerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.primaryDisabledColor
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
}

export default ContainerView;
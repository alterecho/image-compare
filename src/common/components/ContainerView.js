import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar, { DisplayMode as ToolbarDisplayMode } from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS, useAnimatedReaction, withTiming } from "react-native-reanimated";
import AnimatedImage from "./AnimatedImage";
import { Size, Transform, Vector } from "../../structs";
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
  onSelectMetaDataItem,
  onTransformUpdated
) {
  return Object.freeze(
    imageInfo,
    comparisonImageInfo,
    onPressAddPictureButton,
    onPressCameraButton,
    onSelectMetaDataItem,
    onTransformUpdated
  )
}

const ContainerView = forwardRef(
  ({ config }, forwardedRef) => {
    const metaDataViewRef = useRef(null)
    const [imageSize, setImageSize] = useState(Size(0, 0));
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    const scale = useSharedValue(1.0);
    const startScale = useSharedValue(0);
    const rotation = useSharedValue(0);
    const startRotation = useSharedValue(0);

    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = makeStyleSheet(theme)
    const [viewSize, setViewSize] = useState(Size(0, 0))
    const scaleToFitInContainer = useRef(1.0)
    useEffect(() => {

      scaleToFitInContainer.current = calculateScaleForSizeFittingInSize(imageSize, viewSize);
    }, [viewSize, imageSize]);
    const [isShowMetaData, setIsShowMetaData] = useState(false);

    const isBeingInteracted = useSharedValue(false);

    const setTransform = (transform) => {
      translateX.value = transform.x;
      translateY.value = transform.y;
      scale.value = transform.scale;
      rotation.value = transform.rotation;
    }

    useImperativeHandle(forwardedRef, () => (
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
        },
        scaleToFitInContainer: scaleToFitInContainer.current,
        getTransform: () => {
          return Transform(translateX.value, translateY.value, scale.value, rotation.value)
        },
        setTransform
      }
    ));

    const onAnimationReaction = (current, previous) => {
      if (isBeingInteracted.value === false) {
        return;
      }
      
      config?.onTransformUpdated?.(
        forwardedRef,
        {
          x: current.x,
          y: current.y,
          scale: current.scale,
          rotation: current.rotation
        }
      );
    }

    useAnimatedReaction(() => {
      try {
        return {
          x: translateX.value,
          y: translateY.value,
          scale: scale.value,
          rotation: rotation.value
        }
      } catch (error) {
        console.log(error)
      }
    }, (current, previous) => {
      runOnJS(onAnimationReaction)(current, previous);
    });

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
          { scale: scale.value },
          { rotate: `${rotation.value}deg` }
        ]
      }
    ))

    const calculateScaleForSizeFittingInSize = (size, parentSize) => {
      if (!size || !parentSize) {
        return 1.0
      }
      let scale = viewSize.height / imageSize.height
      if (size.width * scale > viewSize.width) {
        scale *= viewSize.width / (imageSize.width * scale)
      }
      return scale
    }

    const fitInContainer = (newScale = null) => {
      if (!viewSize.width || !viewSize.height) {
        return 1.0
      }
      const scale = newScale ?? scaleToFitInContainer.current
      recenterWithScale(scale)
    }

    const recenterWithScale = (newScale = null) => {
      setTransform(Transform(
        0, 0, newScale ?? scale.value, 0
      ));
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

    const onDoubleTapGestureBegin = () => {
      isBeingInteracted.value = true
    }


    const onDoubleTapGestureStart = () => {
      isBeingInteracted.value = true
    }

    const onDoubleTapGestureEnd = () => {
      toggleScale()
    }

    const onPanGestureStart = (event) => {
      isBeingInteracted.value = true
      startX.value = translateX.value
      startY.value = translateY.value
    }

    const onPanGestureEnd = (event) => {
      isBeingInteracted.value = false
    }


    const onPanGestureUpdate = (event) => {
      let newTranslation = {
        x: startX.value + event.translationX,
        y: startY.value + event.translationY
      };
      const imageSizeScaled = {
        width: imageSize.width * scale.value,
        height: imageSize.height * scale.value
      };

      if (newTranslation.x >= viewSize.width) {
        newTranslation.x = viewSize.width;
      }
      if (newTranslation.x + imageSizeScaled.width < 0) {
        newTranslation.x = -imageSizeScaled.width;
      }

      if (newTranslation.y >= viewSize.height) {
        newTranslation.y = viewSize.height;
      }
      if (newTranslation.y + imageSizeScaled.height < 0) {
        newTranslation.y = -imageSizeScaled.height;
      }
      translateX.value = newTranslation.x;
      translateY.value = newTranslation.y;
    }

    const tapGestureHandler = Gesture.Tap()
      .numberOfTaps(2)
      .onBegin(() => {
        runOnJS(onDoubleTapGestureBegin)();
      })
      .onStart(() => {
        runOnJS(onDoubleTapGestureStart)();
      })
      .onEnd(() => {
        runOnJS(onDoubleTapGestureEnd)();
        isBeingInteracted.value = false
      });

    const panGestureHandler = Gesture.Pan()
      .onStart((event) => {
        runOnJS(onPanGestureStart)(event);
      })
      .onUpdate((event) => {
        runOnJS(onPanGestureUpdate)(event);
      })
      .onEnd((event, success) => {
        runOnJS(onPanGestureEnd)(event);
      });

    const rotationGestureHandler = Gesture.Rotation().onStart((event) => {
      startRotation.value = rotation.value;
    }).onUpdate((event) => {
      rotation.value = startRotation.value + event.rotation * (180 / Math.PI);
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
      pinchGestureHandler,
      rotationGestureHandler
    )

    const toolbarConfig = ToolbarConfig({
      mode: isShowMetaData ? ToolbarDisplayMode.cancelButtonOnly : ToolbarDisplayMode.default,
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
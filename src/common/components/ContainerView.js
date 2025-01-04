import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, Image, Button, StyleSheet, useAnimatedValue } from "react-native";
import * as Utils from "../../common/utilities/Utils";
import Toolbar, { DisplayMode as ToolbarDisplayMode } from "./Toolbar";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS, useAnimatedReaction, runOnUI } from "react-native-reanimated";
import AnimatedImage from "./AnimatedImage";
import { Size, Transform, Transform2 } from "../../structs";
import Theme from "../../Theme";
import Overlay from "./Overlay";
import MetaDataView from "./MetaDataView";
import TestMetaData from "../../../tests/data/metadata-sample1.json"
import { Config as ToolbarConfig } from "./Toolbar";

export function Config({
  imageInfo,
  comparisonImageInfo,
  onPressAddPictureButton,
  onPressCameraButton,
  onSelectMetaDataItem,
  onTransformUpdated
}) {
  return Object.freeze({
    imageInfo,
    comparisonImageInfo,
    onPressAddPictureButton,
    onPressCameraButton,
    onSelectMetaDataItem,
    onTransformUpdated
  })
}

const ContainerView = forwardRef(
  ({ id, config }, forwardedRef) => {

    const metaDataViewRef = useRef(null)

    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = makeStyleSheet(theme)

    const [imageSize, setImageSize] = useState(Size(0, 0));
    const [isShowMetaData, setIsShowMetaData] = useState(false);
    const [viewSize, setViewSize] = useState(Size(0, 0))

    useEffect(() => {
      const calculatedScale = calculateScaleForSizeFittingInSize(imageSize, viewSize);
      scaleValueToFitInContainer.value = calculatedScale
    }, [viewSize, imageSize]);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);
    const scale = useSharedValue(1.0);
    const startScale = useSharedValue(0);
    const rotation = useSharedValue(0);
    const startRotation = useSharedValue(0);
    const scaleValueToFitInContainer = useSharedValue(1.0)

    const isPanned = useSharedValue(false);
    const isRotated = useSharedValue(false);
    const isDoubleTapped = useSharedValue(false);

    const setTransform = (transform) => {
      'worklet';
      translateX.value = transform.x;
      translateY.value = transform.y;
      scale.value = transform.scale;
      rotation.value = transform.rotation;
    }

    const copyTransformOfContainer = (sourceContainerRef) => {
      try {
        const sourceContaineraImageScaleToFitInContainer = sourceContainerRef.current.scaleValueToFitInContainer ?? 1.0;
        const sourceContainerTransform = sourceContainerRef.current.getTransform()
        const transformToSet = {
          ...sourceContainerTransform,
          scale: sourceContainerTransform.scale / sourceContaineraImageScaleToFitInContainer * scaleValueToFitInContainer.value
        }
        setTransform(transformToSet);
      } catch (error) {
        console.log("error", error);
      }
    };


    useImperativeHandle(forwardedRef, () => (
      {
        imageInfo: config?.imageInfo,
        showInfoOverlay: () => {
          setIsShowMetaData(true)
        },
        hideInfoOverlay: () => {
          setIsShowMetaData(false)
        },
        selectIndices: (indices) => {
          metaDataViewRef?.current?.selectIndices(indices);
        },

        scrollToIndex: (index) => {
          metaDataViewRef?.current?.scrollToIndex(index);
        },
        scaleValueToFitInContainer: scaleValueToFitInContainer.value,
        getTransform: () => {
          return Transform(translateX.value, translateY.value, scale.value, rotation.value)
        },
        setTransform,
        copyTransformOfContainer
      }
    ));

    const sendOnTransformUpdated = ({ x, y, scale, rotation }) => {
      config?.onTransformUpdated(
        forwardedRef,
        {
          x: x,
          y: y,
          scale: scale,
          rotation: rotation
        }
      )
    }

    const onUserInteractionReaction = (current, previous) => {
      'worklet';
      const isBeingInteracted =
        current.isDoubleTapped === true 
        || current.isPanned === true ||
        current.isRotated === true;

      // check if user is interacting
      if (isBeingInteracted == false) {
        return;
      }

      // send transform to parent (CompareImageScreen)
      runOnJS(sendOnTransformUpdated)(
        {
          x: current.x,
          y: current.y,
          scale: current.scale,
          rotation: current.rotation
        }
      );

      // reset double tap flag
      if (current.isDoubleTapped) {
        isDoubleTapped.value = false;
      }
    }

    const fitInContainer = () => {
      'worklet';
      if (!viewSize.width || !viewSize.height) {
        return
      }
      let scale = scaleValueToFitInContainer.value
      if (scale <= 0.0) {
        scale = 1.0
      }
      const transform = Transform(0, 0, scale, 0)
      setTransform(transform);
    }

    useAnimatedReaction(
      () => scaleValueToFitInContainer.value,
      (current, previous) => {
        if (current !== previous) {
          fitInContainer()
        }
      }
    );

    useAnimatedReaction(() => {
      try {
        return {
          x: translateX.value,
          y: translateY.value,
          scale: scale.value,
          rotation: rotation.value,
          isPanned: isPanned.value,
          isRotated: isRotated.value,
          isDoubleTapped: isDoubleTapped.value
        }
      } catch (error) {
        console.log(error)
      }
    }, (current, previous) => {
      onUserInteractionReaction(current, previous);
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
      if (!Utils.isPositiveNumber(imageSize.width) || !Utils.isPositiveNumber(imageSize.height)) {
        return 1.0
      }
      let scale = viewSize.height / imageSize.height
      if (size.width * scale > viewSize.width) {
        scale *= viewSize.width / (imageSize.width * scale)
      }
      return scale
    }


    const toggleScale = () => {
      'worklet';
      if (!(imageSize) || !(viewSize)) {
        return
      }
      if (scale.value === 1.0) {
        fitInContainer()
      } else {
        setTransform(Transform(
          0, 0, 1.0, 0
        ));
      }
    }

    const onPanGestureUpdate = (event) => {
      'worklet';
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
      .onEnd(() => {
        isDoubleTapped.value = true
        toggleScale();
      });

    const panGestureHandler = Gesture.Pan()
      .onStart((event) => {
        startX.value = translateX.value
        startY.value = translateY.value
      })
      .onUpdate((event) => {
        isPanned.value = true;
        onPanGestureUpdate(event);
      })
      .onEnd((event, success) => {
        isPanned.value = false;
      });

    const rotationGestureHandler = Gesture.Rotation().onStart((event) => {
      startRotation.value = rotation.value;
    }).onUpdate((event) => {
      isRotated.value = true;
      rotation.value = startRotation.value + event.rotation * (180 / Math.PI);
    }).onEnd((event) => {
      isRotated.value = false;
    });

    const pinchGestureHandler = Gesture.Pinch().onStart((event) => {
      startScale.value = scale.value
    }).onUpdate((event) => {
      let newScale = startScale.value * event.scale
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
import React from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { transform } from 'typescript';

const ImageDisplayView = ({ imageUri }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const handleOnGestureEvent = useAnimatedGestureHandler({
        onStart:  (_, context) => {
            context.startX = translateX.value,
            context.startY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX
            translateY.value = context.startY + event.translationY
        }
    });

    const animatedStyle = useAnimatedStyle(() => (
        {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    )
    );

    const handlePanGestureStatChange = (event) => {
        console.log(event)
    };

    return (
        <GestureHandlerRootView style={[styles.imageDisplayView]}>
            {
                imageUri &&
                <PanGestureHandler
                    onGestureEvent={handleOnGestureEvent}
                    onHandlerStateChange={handlePanGestureStatChange}
                >
                    <Animated.Image
                        source={{ uri: imageUri }}
                        style={
                            [
                                styles.image,
                                animatedStyle
                            ]}
                    />
                </PanGestureHandler>
            }
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create(
    {
        imageDisplayView: {
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: "center",
            overflow: 'hidden'
        },
        image: {
            width: 200,
            height: 200,
            backgroundColor: '#6200EE',
        }

    }
);

export default ImageDisplayView;
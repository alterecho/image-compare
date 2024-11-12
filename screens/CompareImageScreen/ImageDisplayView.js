import React from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

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
                                {
                                    transform: [
                                        { translateX },
                                        { translateY }
                                    ]
                                }
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
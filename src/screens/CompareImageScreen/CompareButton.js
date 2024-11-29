import { StyleSheet, View, Text, TouchableOpacity, useAnimatedValue } from "react-native";
import Theme from "../../Theme";
import { useContext, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue, interpolateColor } from "react-native-reanimated";

const CompareButton = ({ onPress, style }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = createStyleSheet(theme)
    const isEnabled = onPress != null

    const strobeAnimation = useSharedValue(0)

    useEffect(() => {
        strobeAnimation.value = withRepeat(
            withTiming(1, { duration: 1000 }),
            -1,
            true
        )
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            strobeAnimation.value,
            [0, 1],
            [styles.button.disabled.backgroundColor, styles.button.enabled.backgroundColor]
        );
        return { backgroundColor }
    });

    return (
        <Animated.View style={[styles.container, isEnabled ? animatedStyle : styles.button.disabled]}>
            <TouchableOpacity
                onPress={onPress}
                disabled={!isEnabled}>
                <Ionicons style={isEnabled ? styles.icon.enabled : styles.icon.disabled} size={20} name="git-compare"></Ionicons>
            </TouchableOpacity>
        </Animated.View>
    )
};

const createStyleSheet = (theme) => {
    return StyleSheet.create({
        container: {
            height: 40,
            justifyContent: 'center',
            alignContent: 'center'
        },
        button: {
            enabled: {
                backgroundColor: `#00ff00ff`,
            },
            disabled: {
                backgroundColor: theme.secondaryDisabledColor
            }
        },
        text: {
            enabled: {
                color: theme.primaryColor,
                textAlign: 'center'
            },
            disabled: {
                color: theme.primaryDisabledColor,
                textAlign: `center`
            }
        },
        icon: {
            enabled: {
                color: theme.primaryColor,
                textAlign: 'center'
            },
            disabled: {
                color: theme.primaryDisabledColor,
                textAlign: `center`
            }
        },

    });
}

export default CompareButton;
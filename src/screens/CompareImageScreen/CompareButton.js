import { StyleSheet, View, Text, TouchableOpacity, useAnimatedValue } from "react-native";
import Theme from "../../Theme";
import { useContext, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue, interpolateColor } from "react-native-reanimated";
import Strings from "../../assets/strings";

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
            [styles.disabled.animation.backgroundColor, styles.enabled.animation.backgroundColor]
        );
        return { backgroundColor }
    });

    return (
        <Animated.View
            style={[styles.enabled.container, isEnabled &&  animatedStyle]}
        >
            <TouchableOpacity
                style={isEnabled ? styles.enabled.container : styles.disabled.container}
                onPress={onPress}
                disabled={isEnabled}
                >
                <Ionicons
                    style={[isEnabled ? styles.enabled.icon : styles.disabled.icon]}
                    size={20}
                    name="git-compare"
                />
                <Text
                    style={[isEnabled ? styles.enabled.icon : styles.disabled.icon]}
                >
                    {Strings.button.compareButtonTitle}
                </Text>
            </TouchableOpacity>
        </Animated.View >
    )
};

const createStyleSheet = (theme) => {
    return StyleSheet.create({
        enabled: {
            animation: {
                backgroundColor: `#00ff00ff`
            },
            container: {
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 8,
                textAlign: `center`,
                backgroundColor: 'clear',
            },
            icon: {
                color: theme.primaryColor,
                textAlign: 'center',
                lineHeight: 40
            },
            text: {
                color: theme.primaryColor,
                textAlign: 'center',
                lineHeight: 40
            }
        },
        disabled: {
            animation: {
                backgroundColor: theme.secondaryDisabledColor
            },
            container: {
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 8,
                textAlign: `center`,
                backgroundColor: 'clear',
            },
            icon: {
                color: theme.primaryDisabledColor,
                textAlign: `center`,
                lineHeight: 40
            },
            text: {
                color: theme.primaryDisabledColor,
                textAlign: `center`,
                lineHeight: 40
            }
        }
    });
}

export default CompareButton;
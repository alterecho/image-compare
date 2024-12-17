import { StyleSheet, View, Text, TouchableOpacity, useAnimatedValue } from "react-native";
import Theme from "../../Theme";
import { useContext, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons'
import Animated, { withRepeat, withTiming, useAnimatedStyle, useSharedValue, interpolateColor } from "react-native-reanimated";
import Strings from "../../assets/strings";

const LockButton = ({ onPress, isEngaged, style }) => {
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
        let animatedColor = interpolateColor(
            strobeAnimation.value,
            [0, 1],
            [styles.disabled.animation.backgroundColor, styles.enabled.animation.backgroundColor],
        )
        
        let backgroundColor = styles.disabled.container.backgroundColor;
        if (isEnabled) {
            backgroundColor = isEngaged ? styles.enabled.animation.backgroundColor : animatedColor;
        }
        return { backgroundColor }
    });

    return (
        <Animated.View
            style={[animatedStyle]}
        >
            <TouchableOpacity
                style={isEnabled ? styles.enabled.container : styles.disabled.container}
                onPress={onPress}
                disabled={!isEnabled}
            >
                <Ionicons
                    style={[isEnabled ? styles.enabled.icon : styles.disabled.icon]}
                    size={20}
                    name={isEngaged ? 'git-compare' : 'git-compare-outline'}
                />
                <Text
                    style={[isEnabled ? styles.enabled.icon : styles.disabled.icon]}
                >
                    {isEngaged ? Strings.button.UnlockButtonTitle : Strings.button.lockButtonTitle}
                </Text>
            </TouchableOpacity>
        </Animated.View >
    )
};

const createStyleSheet = (theme) => {
    return StyleSheet.create({
        enabled: {
            animation: {
                backgroundColor: '#00ff00ff'
            },
            container: {
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 4,
                textAlign: `center`,
                backgroundColor: theme.secondaryDisabledColor
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
                backgroundColor: '#000000'
            },
            container: {
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 4,
                textAlign: `center`,
                backgroundColor: theme.secondaryDisabledColor
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

export default LockButton;
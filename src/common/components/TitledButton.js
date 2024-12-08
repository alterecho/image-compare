import { useContext } from "react";

import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import Theme from "../../Theme";

const TitledButton = ({ imageSrc, title, isEnabled = false, onPress }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = makeStyleSheet(theme);
    const currentStyle = isEnabled ? styles.enabled : styles.disabled

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!isEnabled}
            style={currentStyle.container}
        >
            <Image
                source={imageSrc}
                style={currentStyle.icon}
            />
            <Text style={currentStyle.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
const makeStyleSheet = (theme) => {
    return StyleSheet.create({
        enabled: {
            container: {
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                gap: 4,
            },
            icon: {
                width: 30,
                height: 30,
                resizeMode: 'contain',
                tintColor: theme.primaryColor,
                lineHeight: 30
            },
            text: {
                color: theme.primaryColor,
                lineHeight: 30
            }
        },
        disabled: {
            container: {
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                gap: 4
            },
            icon: {
                width: 30,
                height: 30,
                resizeMode: 'contain',
                tintColor: theme.primaryDisabledColor
            },
            text: {
                color: theme.primaryDisabledColor,
                lineHeight: 30
            }
        }
    });
};

export default TitledButton;
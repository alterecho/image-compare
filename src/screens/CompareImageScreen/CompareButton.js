import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Theme from "../../Theme";
import { useContext } from "react";
import { Ionicons } from '@expo/vector-icons'

const CompareButton = ({ onPress, style }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = createStyleSheet(theme)
    const isEnabled = onPress != null
    return (
        <TouchableOpacity
            style={[
                styles.container, isEnabled ? styles.button.enabled : styles.button.disabled
            ]}
            onPress={onPress}
            disabled={!isEnabled}>
            <Ionicons style={ isEnabled ?  styles.icon.enabled : styles.icon.disabled } size={20} name="git-compare"></Ionicons>
        </TouchableOpacity>
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
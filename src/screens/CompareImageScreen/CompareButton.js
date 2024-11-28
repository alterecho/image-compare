import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Strings from '../../assets/strings.en'
import Theme from "../../Theme";
import { useContext } from "react";

const CompareButton = ({ onPress, style }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = createStyleSheet(theme)
    const isEnabled = onPress != null
    return (
        <View style={[style]}>
            <TouchableOpacity
                style={[
                    styles.container,
                    isEnabled ? styles.button.enabled : styles.button.disabled
                ]}
                onPress={onPress}
                disabled={!isEnabled}>
                <Text style={
                    isEnabled ? styles.text.enabled : styles.text.disabled
                }>
                    {Strings.button.compare}
                </Text>
            </TouchableOpacity>
        </View>
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
                backgroundColor: theme.secondaryColor,

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
    });
}

export default CompareButton;
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Strings from '../../assets/strings.en'
import Theme from "../../Theme";
import { useContext } from "react";

const CompareButton = ({ onPress, style }) => {
    const { theme, toggleTheme } = useContext(Theme.context)
    const styles = createStyleSheet(theme)
    console.log(`CompareButton createStyleSheet: ${JSON.stringify(styles)}`)
    return (
        <View style={ [style] }>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
                disabled={!onPress}>
                <Text style={styles.buttonText}>
                   {Strings.button.compare}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

const createStyleSheet = (theme) => {
    return StyleSheet.create({
        button: {
            backgroundColor: theme.secondaryColor,
            height: 40,
            justifyContent: 'center',
            alignContent: 'center'
        },
        buttonText: {
            color: theme.primaryColor,
            textAlign: 'center'
        }
    });
}

export default CompareButton;
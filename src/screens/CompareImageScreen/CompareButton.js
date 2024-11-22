import { StyleSheet, View, Button } from "react-native";
import Strings from '../../assets/strings.en'

const CompareButton = ({ onPress, style }) => {
    console.log(`style: ${JSON.stringify(style)}`)
    return (
        <View style={{ ...style }}>
            <Button
                style={ [style, styles.button] }
                title={ Strings.button.compare }
                onPress={onPress}
                disabled={!onPress}>
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        flex: 1
    }
});

export default CompareButton;
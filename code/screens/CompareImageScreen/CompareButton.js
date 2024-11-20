import { StyleSheet, View, Button } from "react-native";

const CompareButton = ({ onPress, style }) => {
    console.log(`style: ${JSON.stringify(style)}`)
    return (
        <View style={{ ...style }}>
            <Button
                style={[style, styles.button]}
                title="Compare"
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
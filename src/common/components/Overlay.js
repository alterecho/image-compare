import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native"
import Theme from "../../Theme";
import { Size } from "../../structs";

const Overlay = ({ style, children }) => {

    const { theme, toggleTheme } = useContext(Theme.context);
    const [thisSize, setThisSize] = useState(Size(0, 0))
    const styles = makeStyleSheet(theme, thisSize);

    const onLayout = (event) => {
        console.log("onLayout", JSON.stringify(event.nativeEvent))
        const { width, height } = event.nativeEvent.layout
        setThisSize(Size(width, height))
    }

    return (
        <View
            style={[style, styles.container]}
            onLayout={onLayout}>
                {children}
        </View>
    )
};

const makeStyleSheet = (theme, thisSize) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'clear',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: '50%',
            transform: [
                { translateX: -thisSize.width * 0.5 },
                { translateY: -thisSize.height * 0.5 }
            ]
        }
    });
}

export default Overlay;
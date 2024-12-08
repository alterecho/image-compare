import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../../Theme';
import Strings from "../../assets/strings";
import TitledButton from './TitledButton';

export function Config({
    onPressAddPictureButton,
    isAddPictureButtonEnabled = false,
    onPressCameraButton,
    isCameraButtonEnabled = false,
    onPressImageInfoButton,
    isImageInfoButtonEnabled = false
}) {
    return Object.freeze({
        onPressAddPictureButton,
        isAddPictureButtonEnabled,
        onPressCameraButton,
        isCameraButtonEnabled,
        onPressImageInfoButton,
        isImageInfoButtonEnabled,
    });
}

const Toolbar = ({ config }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);
    const imagesPath = "../../assets/images";
    
    return (
        <View style={styles.toolbar}>
            <TitledButton
                imageSrc={require(`${imagesPath}/ic_add.png`)}
                title={Strings.button.addButtonTitle}
                isEnabled={config.isAddPictureButtonEnabled}
                onPress={config.onPressAddPictureButton}
            />
            <TitledButton
                imageSrc={require(`${imagesPath}/ic_camera.png`)}
                title={Strings.button.cameraButtonTitle}
                isEnabled={config.isAddPictureButtonEnabled}
                onPress={config.onPressCameraButton}
            />
            <TitledButton
                imageSrc={require(`${imagesPath}/ic_description.png`)}
                title={Strings.button.addButtonTitle}
                isEnabled={config.isImageInfoButtonEnabled}
                onPress={config.onPressImageInfoButton}
            />
        </View>
    );
}

const createStyleSheet = (theme) => {
    return StyleSheet.create({
        toolbar: {
            backgroundColor: theme.secondaryColor,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 16,
            height: 44,
            flexDirection: 'row',
        }
    });
};

export default Toolbar;
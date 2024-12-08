import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../../Theme';
import Strings from "../../assets/strings";
import TitledButton from './TitledButton';

export function Config({
    onPressAddPictureButton = null,
    isAddPictureButtonEnabled = false,
    isAddPictureHidden = false,
    onPressCameraButton = null,
    isCameraButtonEnabled = false,
    isCameraButtonHidden = false,
    onPressImageInfoButton = null,
    isImageInfoButtonEnabled = false,
    isImageInfoButtonHidden = false,
    onPressCloseButton = null,
    isCloseButtonEnabled = false,
    isCloseButtonHidden = false,

}) {
    return Object.freeze({
        onPressAddPictureButton,
        isAddPictureButtonEnabled,
        isAddPictureHidden,
        onPressCameraButton,
        isCameraButtonEnabled,
        isCameraButtonHidden,
        onPressImageInfoButton,
        isImageInfoButtonEnabled,
        isImageInfoButtonHidden
    });
}

const Toolbar = ({ config }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);
    const imagesPath = "../../assets/images";

    return (
        <View style={styles.toolbar}>
            {!config.isAddPictureHidden &&
                (<TitledButton
                    imageSrc={require(`${imagesPath}/ic_add.png`)}
                    title={Strings.button.addButtonTitle}
                    isEnabled={config.isAddPictureButtonEnabled}
                    onPress={config.onPressAddPictureButton}
                />)}
            {!config.isCameraButtonHidden &&
                (<TitledButton
                    imageSrc={require(`${imagesPath}/ic_camera.png`)}
                    title={Strings.button.cameraButtonTitle}
                    isEnabled={config.isAddPictureButtonEnabled}
                    onPress={config.onPressCameraButton}
                />
                )}
            {!config.isImageInfoButtonHidden && (<TitledButton
                imageSrc={require(`${imagesPath}/ic_description.png`)}
                title={Strings.button.addButtonTitle}
                isEnabled={config.isImageInfoButtonEnabled}
                onPress={config.onPressImageInfoButton}
            />)}
            {!config.isImageInfoButtonHidden && (<TitledButton
                imageSrc={require(`${imagesPath}/ic_close.png`)}
                title={Strings.button.addButtonTitle}
                isEnabled={config.isImageInfoButtonEnabled}
                onPress={config.onPressImageInfoButton}
            />)}

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
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../../Theme';
import Strings from "../../assets/strings";
import TitledButton from './TitledButton';

export const Mode = {
    default: 0,
    cancelButtonOnly: 1
}

export function Config({
    mode = Mode.default,
    onPressAddPictureButton = null,
    isAddPictureButtonEnabled = true,
    onPressCameraButton = null,
    isCameraButtonEnabled = true,
    onPressImageInfoButton = null,
    isImageInfoButtonEnabled = true,
    onPressCloseButton = null,
    isCloseButtonEnabled = true,

}) {
    return Object.freeze({
        mode,
        onPressAddPictureButton,
        isAddPictureButtonEnabled,
        onPressCameraButton,
        isCameraButtonEnabled,
        onPressImageInfoButton,
        isImageInfoButtonEnabled,
        onPressCloseButton,
        isCloseButtonEnabled
    });
}

const Toolbar = ({ config }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);
    const imagesPath = "../../assets/images";

    const viewsForDefaultMode = () => {
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
                    title={Strings.button.imageInfoButtonTitle}
                    isEnabled={config.isImageInfoButtonEnabled}
                    onPress={config.onPressImageInfoButton}
                />

            </View>
        )

    }

    const viewsForCancelMode = () => {
        return (
            <View style={styles.toolbar}>
                <View>
                </View>
                (<TitledButton
                    imageSrc={require(`${imagesPath}/ic_close.png`)}
                    title={Strings.button.closeButtonTitle}
                    isEnabled={config.isCloseButtonEnabled}
                    onPress={config.onPressCloseButton}
                />)
            </View>
        );
    }

    return ( config.mode == Mode.cancelButtonOnly ? viewsForCancelMode() : viewsForDefaultMode())
}

    const createStyleSheet = (theme) => {
        return StyleSheet.create({
            toolbar: {
                backgroundColor: theme.secondaryColor,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                height: 44,
                flexDirection: 'row',
            }
        });
    };

    export default Toolbar;
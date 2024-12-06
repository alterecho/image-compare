import React, { useContext } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Image, Text } from 'react-native';
import Theme from '../../Theme';
import Strings from "../../assets/strings";

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
    const onPressAddPictureButton = config?.onPressAddPictureButton
    const isAddPictureButtonEnabled = config?.isAddPictureButtonEnabled ?? false
    const onPressCameraButton = config?.onPressCameraButton
    const isCameraButtonEnabled = config?.isCameraButtonEnabled ?? false
    const onPressImageInfoButton = config?.onPressImageInfoButton
    const isImageInfoButtonEnabled = config?.isImageInfoButtonEnabled ?? false

    return (
        <View style={styles.toolbar}>
            <TouchableOpacity
                onPress={onPressAddPictureButton}
                disabled={!(isAddPictureButtonEnabled ?? false)}
                style={isAddPictureButtonEnabled ? styles.button.enabled.container : styles.button.disabled.container}
            >
                <Image
                    source={require(`${imagesPath}/ic_add.png`)}
                    style={isAddPictureButtonEnabled ? styles.button.enabled.icon : styles.button.disabled.icon}
                />
                <Text style={isAddPictureButtonEnabled ? styles.button.enabled.text : styles.button.disabled.text}>
                    {Strings.button.addButtonTitle}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressCameraButton}
                disabled={!(isCameraButtonEnabled ?? false)}
                style={isCameraButtonEnabled ? styles.button.enabled.container : styles.button.disabled.container}
            >
                <Image
                    source={require(`${imagesPath}/ic_camera.png`)}
                    style={isCameraButtonEnabled ? styles.button.enabled.icon : styles.button.disabled.icon}
                />
                <Text style={isCameraButtonEnabled ? styles.button.enabled.text : styles.button.disabled.text}>
                    {Strings.button.cameraButtonTitle}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressImageInfoButton}
                disabled={!isImageInfoButtonEnabled}
                style={isImageInfoButtonEnabled ? styles.button.enabled.container : styles.button.disabled.container}
            >
                <Image
                    source={require(`${imagesPath}/ic_description.png`)}
                    style={isImageInfoButtonEnabled ? styles.button.enabled.icon : styles.button.disabled.icon}
                />
                <Text style={isImageInfoButtonEnabled ?? false ? styles.button.enabled.text : styles.button.disabled.text}>
                    {Strings.button.imageInfoButtonTitle}
                </Text>
            </TouchableOpacity>
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
        },
        button: {
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
        }
    });
};

export default Toolbar;
import React, { useContext } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Image, Text } from 'react-native';
import Theme from '../../Theme';
import Strings from "../../assets/strings";

export function Config({
    onPressAddPictureButtonListener,
    isAddPictureButtonEnabled = false,
    onImageInfoButtonListener,
    isImageInfoButtonEnabled = false
}) {
    return Object.freeze({
        onPressAddPictureButtonListener,
        isAddPictureButtonEnabled,
        onImageInfoButtonListener,
        isImageInfoButtonEnabled,
    });
}

const Toolbar = ({ config }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);

    const imagesPath = "../../assets/images";
    const onPressAddPictureButtonListener = config?.onPressAddPictureButtonListener
    const isAddPictureButtonEnabled = config?.isAddPictureButtonEnabled ?? false
    const onImageInfoButtonListener = config?.onImageInfoButtonListener
    const isImageInfoButtonEnabled = config?.isImageInfoButtonEnabled ?? false

    return (
        <View style={styles.toolbar}>
            <TouchableOpacity
                onPress={onPressAddPictureButtonListener}
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
                onPress={onImageInfoButtonListener}
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
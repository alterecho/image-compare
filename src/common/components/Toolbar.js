import React, { useContext } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Image, Text } from 'react-native';
import Theme from '../../Theme';
import Strings from "../../assets/strings";

const Toolbar = ({ onPressAddPictureButton, onPressShowMetaDataButton }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);

    const imagesPath = "../../assets/images";

    const isAddPictureButtonEnabled = onPressAddPictureButton != null
    const isShowMetaDateButtonEnabled = onPressShowMetaDataButton != null

    return (
        <View style={styles.toolbar}>
            <TouchableOpacity
                onPress={onPressAddPictureButton}
                disabled={!isAddPictureButtonEnabled}
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
                onPress={onPressShowMetaDataButton}
                disabled={!isShowMetaDateButtonEnabled}
                style={isShowMetaDateButtonEnabled ? styles.button.enabled.container : styles.button.disabled.container}
            >
                <Image
                    source={require(`${imagesPath}/ic_description.png`)}
                    style={isShowMetaDateButtonEnabled ? styles.button.enabled.icon : styles.button.disabled.icon}
                />
                <Text style={isShowMetaDateButtonEnabled ? styles.button.enabled.text : styles.button.disabled.text}>
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
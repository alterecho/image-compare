import React, { useContext } from 'react';
import { StyleSheet, View, Button, Pressable, Image } from 'react-native';
import Theme from '../../Theme';

const Toolbar = ({ onPressAddPictureButton, onPressShowMetaDataButton }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);

    const imagesPath = "../../assets/images";

    const isAddPictureButtonEnabled = onPressAddPictureButton != null
    const isShowMetaDateButtonEnabled = onPressShowMetaDataButton != null

    return (
        <View style={styles.toolbar}>
            <Pressable
                onPress={onPressAddPictureButton}
                disabled={!isAddPictureButtonEnabled}>
                <Image
                    source={require(`${imagesPath}/ic_add.png`)}
                    style={isAddPictureButtonEnabled ? styles.button.image.enabled : styles.button.image.disabled}
                />
            </Pressable>
            <Pressable
                onPress={onPressShowMetaDataButton}
                disabled={!isShowMetaDateButtonEnabled}>
                <Image
                    source={require(`${imagesPath}/ic_description.png`)}
                    style={isShowMetaDateButtonEnabled ? styles.button.image.enabled : styles.button.image.disabled}
                />
            </Pressable>
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
            height: 44
        },
        button: {
            image: {
                enabled: {
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: theme.primaryColor
                },
                disabled: {
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: theme.primaryDisabledColor
                }
            }
        }
    });
};

export default Toolbar;
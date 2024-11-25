import React, { useContext } from 'react';
import { StyleSheet, View, Button, Pressable, Image } from 'react-native';
import Theme from '../../Theme';

const Toolbar = ({ onPressAddPictureButton, onPressShowMetaDataButton }) => {
    const { theme, toggleTheme } = useContext(Theme.context);
    const styles = createStyleSheet(theme);

    const imagesPath = "../../assets/images";
    return (

        <View style={styles.toolbar}>
            <Pressable onPress={onPressAddPictureButton} disabled={!onPressAddPictureButton}>
                <Image source={require(`${imagesPath}/ic_add.png`)} style={styles.buttonImage}></Image>
            </Pressable>
            <Pressable onPress={onPressShowMetaDataButton} disabled={!onPressShowMetaDataButton}>
                <Image source={require(`${imagesPath}/ic_description.png`)} style={styles.buttonImage}></Image>
            </Pressable>
        </View>
    );
}

const createStyleSheet = (theme) => {
    return StyleSheet.create({
        toolbar: {
            backgroundColor: theme.secondaryColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            height: 44
        },
        buttonImage: {
            width: 30,
            height: 30,
            resizeMode: 'contain',
            tintColor: theme.primaryColor
        }
    });
};

export default Toolbar;
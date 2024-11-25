import React from 'react';
import { StyleSheet, View, Button, Pressable, Image } from 'react-native';

const Toolbar = ({ onPressAddPictureButton, onPressShowMetaDataButton }) => {
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

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#00ff00',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 44
    },
    buttonImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }

});

export default Toolbar;
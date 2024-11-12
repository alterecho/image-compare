import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Toolbar = ({ onPressCameraButton, onPressAddPictureButton, onPressShowEXIFButton }) => {
    console.log(`>>>>> render toolbar onPressShowEXIFButton: ${onPressShowEXIFButton}`)
    return (
        <View style={styles.toolbar}>
            <Button title='add' onPress={onPressAddPictureButton} />
            <Button title='camera' onPress={onPressCameraButton} />
            <Button title='compare' onPress={onPressShowEXIFButton} disabled={!onPressShowEXIFButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#00ff00',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
});

export default Toolbar;
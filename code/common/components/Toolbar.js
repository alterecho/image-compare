import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Toolbar = ({ onPressCameraButton, onPressAddPictureButton, onPressShowMetaDataButton }) => {
    return (
        <View style={styles.toolbar}>
            <Button title='add' onPress={onPressAddPictureButton} />
            <Button title='camera' onPress={onPressCameraButton} />
            <Button title='metadata' onPress={onPressShowMetaDataButton} disabled={!onPressShowMetaDataButton} />
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
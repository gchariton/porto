import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import colors from '../config/colors';
import saveImage from '../functions/saveImage';

const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need media library permissions to save images!');
    }
};

function TeamTile({ name, logo, venue }) {
    useEffect(() => {
        requestMediaLibraryPermission();
    }, []);

    const handleImagePress = async (imageUri) => {
        try {
            await saveImage(imageUri);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>

            <TouchableWithoutFeedback onPress={() => handleImagePress(logo)}>
                <Image source={{ uri: logo }} style={styles.logo} />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => handleImagePress(venue)}>
                <Image source={{ uri: venue }} style={styles.logo} />
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        width: '90%',
    },
    logo: {
        borderRadius: 10,
        height: 100,
        margin: 10,
        overflow: 'hidden',
        width: 100,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    },
});

export default TeamTile;

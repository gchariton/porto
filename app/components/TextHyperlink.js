import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';

function TextHyperlink({ style, text, url }) {
    const handlePress = async () => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('[TextHyperling.js] Error opening URL:', error);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={style}>{text}</Text>
        </TouchableOpacity>
    );
}

export default TextHyperlink;

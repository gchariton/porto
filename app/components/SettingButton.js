import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function SettingButton({ text, onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.textbox}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.iconbox}>
                <TouchableOpacity onPress={onPress}>
                    <MaterialCommunityIcons
                        name={'arrow-right'}
                        color={colors.blue}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
    },
    iconbox: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        padding: 10,
        width: '15%',
    },
    text: {
        color: colors.secondary,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 18,
    },

    textbox: {
        backgroundColor: colors.blue,
        justifyContent: 'center',
        padding: 10,
        width: '85%',
    },
});

export default SettingButton;

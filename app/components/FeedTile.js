import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import getDomain from '../functions/getDomain';

function FeedTile({ source }) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <MaterialCommunityIcons name={'check-bold'} color={'green'} />
            </View>
            <View style={styles.source}>
                <Text style={styles.text}>{getDomain(source)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    source: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
    },
});

export default FeedTile;

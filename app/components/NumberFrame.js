import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';

function NumberFrame({ number }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.yellow,
        borderRadius: 100,
        height: 38,
        justifyContent: 'center',
        margin: 5,
        width: 38,
    },
    text: {
        color: colors.black,
        fontFamily: 'Roboto',
        fontSize: 21,
        fontWeight: 'bold',
    },
});

export default NumberFrame;

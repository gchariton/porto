import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../config/colors';

function LoginScreen({}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome George!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    text: {
        color: colors.white,
        fontFamily: 'Roboto',
        fontSize: 20,
    },
});

export default LoginScreen;

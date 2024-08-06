import React from 'react';
import { StyleSheet, View } from 'react-native';

import Weather from '../components/Weather';

import Screen from './Screen';
import LoginScreen from './LoginScreen';
import colors from '../config/colors';

const logoImage = require('../assets/logo.png');

const HomeScreen = ({ navigation }) => {
    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Weather />
                </View>
                <View style={styles.containerBottom}>
                    <LoginScreen />
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    containerBottom: {
        alignItems: 'center',
        flex: 1.5,
        justifyContent: 'center',
        width: '90%',
    },
    containerTop: {
        height: '100%',
        alignItems: 'center',
        flex: 3,
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        height: 100,
        margin: 5,
        width: 100,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        margin: 5,
        textAlign: 'center',
    },
});

export default HomeScreen;

import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TextHyperlink from '../components/TextHyperlink';

import Screen from './Screen';
import LoginScreen from './LoginScreen';
import colors from '../config/colors';

const logoImage = require('../assets/logo.png');

const HomeScreen = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(-500)).current;
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            translateY.setValue(-300);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
            }).start();
        }
    }, [isFocused]);

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Animated.Image
                        style={[styles.logo, { transform: [{ translateY }] }]}
                        source={logoImage}
                    />
                    <TextHyperlink
                        style={styles.text}
                        url='http://icloud.gr'
                        text='Hello George!'
                    />
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
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
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

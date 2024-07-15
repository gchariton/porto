import React from 'react';
import { StyleSheet, View } from 'react-native';

import Screen from './Screen';
import Weather from '../components/Weather';

function WeatherScreen({}) {
    return (
        <Screen>
            <View style={styles.container}>
                <Weather />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        width: '90%',
    },
    text: {},
});

export default WeatherScreen;

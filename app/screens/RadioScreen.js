import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RadioTile from '../components/RadioTile';
import Screen from './Screen';

import constants from '../config/constants';

const RadioScreen = () => {
    return (
        <Screen>
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.container}>
                    {constants.RADIOSTATIONS.map((station, index) => (
                        <RadioTile key={index} station={station} />
                    ))}
                </View>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        padding: 15,
        width: '100%',
    },
});

export default RadioScreen;

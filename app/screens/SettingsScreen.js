import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SettingButton from '../components/SettingButton';
import Screen from './Screen';

function SettingsScreen() {
    const navigation = useNavigation();

    return (
        <Screen style={{ marginTop: 20 }}>
            <View style={styles.container}>
                <SettingButton
                    text='News'
                    onPress={() => navigation.navigate('NewsSettingsScreen')}
                />

                <SettingButton
                    text='Soccer'
                    onPress={() => navigation.navigate('SoccerScreen')}
                />
                <SettingButton
                    text='Scanner'
                    onPress={() => navigation.navigate('ScannerScreen')}
                />
                <SettingButton
                    text='Weather'
                    onPress={() => navigation.navigate('WeatherScreen')}
                />
                <SettingButton
                    text='About'
                    onPress={() => navigation.navigate('AboutScreen')}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});

export default SettingsScreen;

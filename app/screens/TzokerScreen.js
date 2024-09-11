import React from 'react';
import { StyleSheet } from 'react-native';

import Screen from './Screen';
import LatestTzokerDraw from '../components/LatestTzokerDraw';

function TzokerScreen({}) {
    return (
        <Screen style={styles.container}>
            <LatestTzokerDraw />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
    },
});

export default TzokerScreen;

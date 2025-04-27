import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function Screen({ children, style }) {
    return (
        <View style={[styles.container, style]}>
            <StatusBar backgroundColor={colors.primary} />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        width: '100%',
    },
});

export default Screen;

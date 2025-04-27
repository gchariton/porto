import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function MenuItem({ icon, label }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {},
});

export default MenuItem;

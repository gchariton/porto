import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';

function ActivityIndicatorModal({ message }) {
    return (
        <Modal animationType='fade' transparent visible>
            <View style={styles.container}>
                <ActivityIndicator size='large' color={colors.white} />
                <Text style={styles.text}>{message}</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.white,
        fontFamily: 'Roboto',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default ActivityIndicatorModal;

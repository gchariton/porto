import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

import Screen from './Screen';
import TextHyperlink from '../components/TextHyperlink';
import colors from '../config/colors';

function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        if (data) {
            setScanned(true);
            setResult(data);
        }
    };

    const handleResult = () => {
        if (!result) return null;

        if (result.startsWith('http')) {
            return (
                <TextHyperlink
                    style={styles.resultlink}
                    text={result}
                    url={result}
                />
            );
        } else {
            return <Text style={styles.resulttext}>{result}</Text>;
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Screen>
            <View style={styles.camerabox}>
                <Camera
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    barCodeScannerSettings={{
                        barCodeTypes: [
                            Camera.Constants.BarCodeType.ean8,
                            Camera.Constants.BarCodeType.ean13,
                            Camera.Constants.BarCodeType.qr,
                            Camera.Constants.BarCodeType.pdf417,
                        ],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button
                        title={'Tap to Scan Again'}
                        onPress={() => setScanned(false)}
                    />
                )}
            </View>
            <View style={styles.textbox}>{handleResult()}</View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    camerabox: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    resultlink: {
        color: colors.blue,
        flexWrap: 'wrap',
        fontFamily: 'monospace',
        padding: 20,
        textDecorationLine: 'underline',
    },
    resulttext: {
        color: colors.white,
        flexWrap: 'wrap',
        fontFamily: 'monospace',
        padding: 20,
    },
    textbox: {
        borderTopColor: colors.blue,
        borderTopWidth: 3,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
});

export default ScannerScreen;

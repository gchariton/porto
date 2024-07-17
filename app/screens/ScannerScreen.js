import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import Screen from './Screen';
import TextHyperlink from '../components/TextHyperlink';
import colors from '../config/colors';

function ScannerScreen() {
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title='grant permission' />
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }) => {
        console.log('lalalalala');
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

    return (
        <Screen>
            <View style={styles.camerabox}>
                <CameraView
                    barcodeScannerSettings={{
                        barcodeTypes: [
                            'aztec',
                            'ean13',
                            'ean8',
                            'qr',
                            'pdf417',
                            'upc_e',
                            'datamatrix',
                            'code39',
                            'code93',
                            'itf14',
                            'codabar',
                            'code128',
                            'upc_a',
                        ],
                    }}
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
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

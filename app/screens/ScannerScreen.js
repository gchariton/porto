import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
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
                    onBarcodeScanned={
                        scanned
                            ? undefined
                            : (data) => {
                                  handleBarCodeScanned(data);
                              }
                    }
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setScanned(false)}
                    >
                        <Text style={styles.buttontext}>TAP TO SCAN AGAIN</Text>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView style={styles.textbox}>{handleResult()}</ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.blue,
        borderColor: colors.white,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderTopWidth: 1,
        height: '40%',
        justifyContent: 'center',
        width: '90%',
    },
    buttontext: {
        fontFamily: 'monospace',
        fontSize: 20,
        fontWeight: 'bold',
    },
    camerabox: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    resultlink: {
        color: colors.blue,
        flexWrap: 'wrap',
        fontFamily: 'monospace',
        fontSize: 18,
        padding: 20,
        textDecorationLine: 'underline',
    },
    resulttext: {
        color: colors.white,
        flexWrap: 'wrap',
        fontFamily: 'monospace',
        fontSize: 18,
        padding: 20,
    },
    textbox: {
        borderTopColor: colors.blue,
        borderTopWidth: 3,
        flex: 1,
        width: '100%',
    },
});

export default ScannerScreen;

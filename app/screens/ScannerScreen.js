import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Linkify from 'linkify-it';
import Screen from './Screen';
import TextHyperlink from '../components/TextHyperlink';
import colors from '../config/colors';

// Initialize Linkify
const linkify = new Linkify();

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
                <Button onPress={requestPermission} title='Grant Permission' />
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

        // Parse text to identify URLs
        const links = linkify.match(result) || [];
        const parts = [];
        let lastIndex = 0;

        links.forEach((link) => {
            // Add text between last URL and current URL
            if (link.index > lastIndex) {
                parts.push({
                    text: result.substring(lastIndex, link.index),
                    isLink: false,
                });
            }
            // Add the URL itself
            parts.push({
                text: result.substring(link.index, link.lastIndex + 1),
                isLink: true,
            });
            lastIndex = link.lastIndex + 1;
        });

        // Add any remaining text after the last URL
        if (lastIndex < result.length) {
            parts.push({ text: result.substring(lastIndex), isLink: false });
        }

        return (
            <View>
                {parts.map((part, index) =>
                    part.isLink ? (
                        <TextHyperlink
                            key={index}
                            style={styles.resultlink}
                            text={part.text}
                            url={part.text}
                        />
                    ) : (
                        <Text key={index} style={styles.resulttext}>
                            {part.text}
                        </Text>
                    )
                )}
            </View>
        );
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
        flex: 0.5,
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

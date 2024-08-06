import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import colors from '../config/colors';

function Scanner({ onScan, scanned, setScanned }) {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionbox}>
                <Text style={styles.permissiontext}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title='Grant Permission' />
            </View>
        );
    }

    const handleBarcodeScanned = (data) => {
        Vibration.vibrate([0, 100, 0, 100]);
        onScan(data);
    };

    return (
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
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
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
    permissionbox: {
        padding: 30,
    },
    permissiontext: {
        color: colors.white,
        fontFamily: 'Roboto',
        padding: 10,
        textAlign: 'center',
    },
});

export default Scanner;

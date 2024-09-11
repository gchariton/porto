import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Linkify from 'linkify-it';
import { useIsFocused } from '@react-navigation/native';
import Screen from './Screen';
import TextHyperlink from '../components/TextHyperlink';
import Scanner from '../components/Scanner';
import colors from '../config/colors';

const linkify = new Linkify();

function ScannerScreen() {
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState(null);
    const isFocused = useIsFocused();

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
                        <Text
                            key={index}
                            style={styles.resulttext}
                            selectable={true}
                        >
                            {part.text}
                        </Text>
                    )
                )}
            </View>
        );
    };

    return (
        <Screen>
            {isFocused && (
                <Scanner
                    onScan={handleBarCodeScanned}
                    scanned={scanned}
                    setScanned={setScanned}
                />
            )}

            <ScrollView style={styles.textbox}>{handleResult()}</ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TextHyperlink from '../components/TextHyperlink';

import colors from '../config/colors';
import constants from '../config/constants';

const CryptoTile = React.memo(({ cryptoitem }) => {
    const lowerCaseName = cryptoitem.name.toLowerCase().split(' ')[0];
    return (
        <View style={styles.container}>
            {cryptoitem && (
                <>
                    <TextHyperlink
                        style={styles.coinsymbol}
                        text={`${cryptoitem.name} (${cryptoitem.symbol})`}
                        url={`${constants.CRYPTO.COININFO}${lowerCaseName}`}
                    />

                    <Text style={styles.coinprice}>
                        ${Number(cryptoitem.quote.USD.price).toFixed(5)}
                    </Text>
                </>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        width: '100%',
    },
    coinprice: {
        color: colors.yellow,
        fontFamily: 'monospace',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    coinsymbol: {
        color: colors.blue,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CryptoTile;

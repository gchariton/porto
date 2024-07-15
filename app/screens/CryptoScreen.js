import React, { useEffect, useState, useCallback } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import Screen from './Screen';
import CryptoTile from '../components/CryptoTile';
import { fetchCryptoList } from '../functions/fetchCryptoList';
import colors from '../config/colors';

function CryptoScreen({}) {
    const [cryptoList, setCryptoList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [datetime, setDatetime] = useState(new Date());
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        fetchCryptoList(setCryptoList, setRefreshing);
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCryptoList(setCryptoList, setRefreshing);
        setDatetime(new Date());
    }, []);

    const onFocus = () => {
        setIsFocused(true);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const renderCryptoTile = ({ item }) => (
        <CryptoTile key={item.id} cryptoitem={item} />
    );

    const filteredCryptoList = cryptoList.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Screen>
            <View style={styles.searchbox}>
                <TextInput
                    style={styles.input}
                    placeholder={isFocused ? '' : 'search coin'}
                    placeholderTextColor={'gray'}
                    onBlur={onBlur}
                    onChangeText={setSearchQuery}
                    onFocus={onFocus}
                    value={searchQuery}
                />
            </View>
            <Text style={styles.datetime}>
                {datetime.toLocaleString('el-GR', { hour12: false })}
            </Text>
            <FlatList
                style={styles.flatlist}
                data={filteredCryptoList}
                renderItem={renderCryptoTile}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.red, colors.green, colors.blue]}
                        progressBackgroundColor={colors.primary}
                        size={'large'}
                    />
                }
            ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    datetime: {
        color: 'gray',
        fontFamily: 'monospace',
        padding: 10,
    },
    flatlist: {
        margin: 5,
        padding: 5,
    },
    input: {
        color: colors.blue,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },

    searchbox: {
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 25,
        padding: 10,
        width: '90%',
    },
});

export default CryptoScreen;

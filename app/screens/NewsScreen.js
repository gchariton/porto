import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

import Screen from './Screen';
import NewsTile from '../components/NewsTile';
import colors from '../config/colors';
import { fetchNews } from '../functions/fetchNews';

const NewsScreen = () => {
    const [sortedFeed, setSortedFeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isProgressHidden, setIsProgressHidden] = useState(false);

    const scrollRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsProgressHidden(false);
        try {
            await fetchNews(setSortedFeed, setRefreshing, setIsProgressHidden);
        } finally {
            setIsProgressHidden(true);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
    }, []);

    const onPressScrollToTop = useCallback(() => {
        scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, []);

    const renderItem = useCallback(
        ({ item }) => (
            <NewsTile feed={item} formattedDate={formatDate(item.published)} />
        ),
        []
    );

    return (
        <Screen>
            {!isProgressHidden && (
                <View style={styles.progress}>
                    <Progress.CircleSnail
                        color={[colors.red, colors.green, colors.blue]}
                        hidesWhenStopped={isProgressHidden}
                        size={50}
                    />
                </View>
            )}
            <FlatList
                data={sortedFeed}
                onLayout={() => {
                    scrollRef.current = scrollRef.current || scrollRef;
                }}
                ref={scrollRef}
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.red, colors.green, colors.blue]}
                        progressBackgroundColor={colors.primary}
                        size='large'
                    />
                }
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.upbutton}>
                <TouchableOpacity onPress={onPressScrollToTop}>
                    <MaterialCommunityIcons
                        name='arrow-up-circle'
                        color={colors.blue}
                        size={58}
                    />
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

const formatDate = (date) => {
    return new Date(date)
        .toLocaleString('el-GR', {
            hour12: false,
            timeZone: 'Europe/Athens',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        .replace(/\//g, '.')
        .replace(',', '')
        .substring(0, 16);
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
        position: 'relative',
        zIndex: 2,
    },
    progress: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        position: 'absolute',
        zIndex: 1,
    },
    upbutton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 100,
        bottom: 20,
        height: 58,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        width: 58,
    },
});

export default NewsScreen;

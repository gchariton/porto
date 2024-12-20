import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from './Screen';
import NewsTile from '../components/NewsTile';
import colors from '../config/colors';
import { fetchNews } from '../functions/fetchNews';
import ActivityIndicatorModal from '../components/ActivityIndicatorModal';

const NewsScreen = () => {
    const [sortedFeed, setSortedFeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const scrollRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setShowActivityIndicator(true);
        try {
            await fetchNews(
                setSortedFeed,
                setRefreshing,
                setShowActivityIndicator
            );
        } catch (err) {
            console.error('Error fetching or parsing RSS feeds:', err);
        } finally {
            setShowActivityIndicator(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setShowActivityIndicator(true);
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

    return (
        <Screen>
            {showActivityIndicator && (
                <ActivityIndicatorModal message={'Loading news...'} />
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

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
        position: 'relative',
        zIndex: 2,
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

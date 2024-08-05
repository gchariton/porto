import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';
import FeedTile from '../components/FeedTile';

import colors from '../config/colors';
import feed from '../config/feed';

function NewsSettingsScreen({}) {
    return (
        <Screen style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.text}>Current news feed sources:</Text>
                <View>
                    {feed.news.map((item) => (
                        <FeedTile key={item} source={item} />
                    ))}
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    scroll: {
        width: '100%',
    },
    text: {
        color: colors.white,
        fontFamily: 'Roboto',
        fontSize: 16,
        margin: 10,
    },
});

export default NewsSettingsScreen;

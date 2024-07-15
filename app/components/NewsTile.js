import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import TextHyperlink from './TextHyperlink';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import getDomain from '../functions/getDomain';

const NewsTile = React.memo(({ feed, formattedDate, renderRightActions }) => {
    return (
        <Swipeable friction={1} renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <TextHyperlink
                    style={styles.title}
                    text={String(feed.title)}
                    url={String(feed.id)}
                />
                <View style={styles.meta}>
                    <View style={styles.dateContainer}>
                        <MaterialCommunityIcons
                            name={'clock-outline'}
                            color={colors.blue}
                        />
                        <Text style={styles.pubdate}>
                            {' '}
                            {formattedDate.substring(0, 16)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.source}>{getDomain(feed.id)}</Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
    },
    dateContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '100%',
    },
    pubdate: {
        fontFamily: 'monospace',
        color: colors.blue,
    },
    source: {
        fontFamily: 'monospace',
        color: 'gray',
    },
    title: {
        color: colors.white,
        fontFamily: 'monospace',
        fontSize: 16,
    },
});

export default NewsTile;

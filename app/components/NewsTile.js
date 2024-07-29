import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import TextHyperlink from './TextHyperlink';
import colors from '../config/colors';
import getDomain from '../functions/getDomain';

const NewsTile = ({ feed, formattedDate }) => {
    const handleShare = async () => {
        try {
            await Share.share({
                message: `${feed.title} - ${feed.id}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const renderRightActions = () => (
        <View style={styles.swipebox}>
            <TouchableOpacity onPress={handleShare}>
                <MaterialCommunityIcons
                    name='share'
                    color={colors.blue}
                    size={36}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <Swipeable friction={1} renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <TextHyperlink
                    style={styles.title}
                    text={feed.title}
                    url={feed.id}
                />
                <View style={styles.meta}>
                    <View style={styles.dateContainer}>
                        <MaterialCommunityIcons
                            name='clock-outline'
                            color={colors.blue}
                        />
                        <Text style={styles.pubdate}>{formattedDate}</Text>
                    </View>
                    <Text style={styles.source}>{getDomain(feed.id)}</Text>
                </View>
            </View>
        </Swipeable>
    );
};

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
    swipebox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: 80,
    },
});

export default NewsTile;

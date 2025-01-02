import React, { memo } from 'react';
import {
    Image,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
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

    // Extract image from content if available
    const imageUrl = extractImageFromContent(feed.content);

    return (
        <Swipeable friction={1} renderRightActions={renderRightActions}>
            <View style={styles.container}>
                {/* Render image if imageUrl is found */}
                {imageUrl && (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                )}

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
                        <Text style={styles.pubdate}> {formattedDate}</Text>
                    </View>
                    <Text style={styles.source}>{getDomain(feed.id)}</Text>
                </View>
            </View>
        </Swipeable>
    );
};

// Function to extract image from 'content' field using regex
const extractImageFromContent = (content) => {
    if (!content) return null;

    // Regex to find the first image URL in <img> tag
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
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
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
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
        fontFamily: 'Roboto',
        color: colors.blue,
    },
    source: {
        fontFamily: 'Roboto',
        color: 'gray',
    },
    title: {
        color: colors.white,
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    swipebox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: 80,
    },
});

export default memo(NewsTile);

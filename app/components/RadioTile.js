import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import handlePlayPause from '../functions/handlePlayPause';
import colors from '../config/colors';

const RadioTile = ({ station }) => {
    const [sound, setSound] = useState(null);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', flex: 2 }}>
                <View style={[styles.titleBox, { flex: 1, width: '100%' }]}>
                    <Text style={styles.text}>{station.name}</Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {isBuffering && !isPlaying && (
                        <View style={styles.loading}>
                            <LottieView
                                source={require('../json/dotsLoadingLottie.json')}
                                autoPlay={true}
                                loop={true}
                                style={{ height: 300, width: '100%' }}
                            />
                        </View>
                    )}
                </View>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        isBuffering && { opacity: 0.5 },
                        {
                            backgroundColor: isPlaying
                                ? colors.red
                                : colors.blue,
                        },
                    ]}
                    disabled={isBuffering}
                    onPress={() =>
                        handlePlayPause(
                            sound,
                            setSound,
                            setIsPlaying,
                            setIsBuffering,
                            station
                        )
                    }
                >
                    <Text style={styles.text}>
                        {isPlaying ? 'STOP' : 'PLAY'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.blue,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        width: 100,
    },
    container: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        height: 90,
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        width: '100%',
    },
    loading: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
    },
    titleBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        textShadowColor: colors.secondary,
        textShadowRadius: 5,
        textAlign: 'center',
    },
});

export default RadioTile;

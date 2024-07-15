import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Screen from './Screen';
import TeamTile from '../components/TeamTile';
import fetchSoccer from '../functions/fetchSoccer';
import colors from '../config/colors';

function SoccerScreen() {
    const [soccer, setSoccer] = useState(null);

    useEffect(() => {
        fetchSoccer()
            .then((data) => {
                setSoccer(data);
            })
            .catch((error) => {
                console.error('Error fetching soccer data:', error);
            });
    }, []);

    return (
        <Screen style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {soccer &&
                    soccer.response.map((item) => (
                        <View key={item.team.id} style={styles.teamContainer}>
                            <TeamTile
                                name={item.team.name}
                                logo={item.team.logo}
                                venue={item.venue.image}
                            />
                        </View>
                    ))}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingBottom: 50,
    },
    teamContainer: {
        width: '100%',
    },
});

export default SoccerScreen;

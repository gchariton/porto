import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NumberFrame from '../components/NumberFrame';
import colors from '../config/colors';
import fetchLatestTzokerDraw from '../functions/fetchLatestTzokerDraw';
import ActivityIndicatorModal from '../components/ActivityIndicatorModal';

function LatestTzokerDraw() {
    const [tzokerDraw, setTzokerDraw] = useState(null);
    const [orderedNumbers, setOrderedNumbers] = useState([]);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const fetchDrawData = async () => {
        try {
            setShowActivityIndicator(true);
            const data = await fetchLatestTzokerDraw();
            setTzokerDraw(data);
            setOrderedNumbers(
                data.last.winningNumbers.list.sort((a, b) => a - b)
            );
        } catch (error) {
            console.error('Error fetching latest tzoker draw:', error);
        } finally {
            setShowActivityIndicator(false);
        }
    };

    useEffect(() => {
        fetchDrawData();
    }, []);

    if (!tzokerDraw) return null;

    // Format date to Greek format
    const formattedDate = new Date(Number(tzokerDraw.last.drawTime));
    const formattedDateString = new Intl.DateTimeFormat('el-GR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        // year: 'numeric',
    }).format(formattedDate);

    // Render ordered numbers
    const renderNumberFrames = orderedNumbers.map((num, index) => (
        <NumberFrame key={index} number={num} />
    ));

    return (
        <View style={styles.latestdraw}>
            <View style={styles.drawtime}>
                <Text style={styles.text}>{formattedDateString}</Text>
                <TouchableOpacity
                    style={styles.refresh}
                    onPress={fetchDrawData}
                >
                    <Text style={styles.text}>refresh</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.drawbox}>
                <View style={styles.fivenumbers}>{renderNumberFrames}</View>
                <View>
                    <NumberFrame
                        number={tzokerDraw.last.winningNumbers.bonus[0]}
                    />
                </View>
            </View>
            <Text style={styles.resulttext}>
                {tzokerDraw.last.prizeCategories[0].winners === 0
                    ? 'Αποτέλεσμα: ΤΖΑΚ ΠΟΤ!'
                    : tzokerDraw.last.prizeCategories[0].winners === 1
                    ? `Αποτέλεσμα: Βρέθηκε ${tzokerDraw.last.prizeCategories[0].winners} νικητής!`
                    : `Αποτέλεσμα: Βρέθηκαν ${tzokerDraw.last.prizeCategories[0].winners} νικητές!`}
            </Text>
            {showActivityIndicator && (
                <ActivityIndicatorModal message={'Loading...'} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    drawbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    drawtime: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    fivenumbers: {
        flexDirection: 'row',
    },
    latestdraw: {
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        margin: 15,
        width: '90%',
    },
    refresh: {
        alignItems: 'center',
        backgroundColor: colors.green,
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5,
        width: '20%',
    },
    resulttext: {
        color: colors.white,
        flexWrap: 'wrap',
        fontFamily: 'Roboto',
        fontSize: 20,
        padding: 10,
    },
    text: {
        color: colors.white,
        fontFamily: 'Roboto',
        padding: 5,
    },
});

export default LatestTzokerDraw;

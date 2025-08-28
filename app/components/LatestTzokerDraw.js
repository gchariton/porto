import React, { useState, useEffect } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
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
            console.log(JSON.stringify(data, null, 2));

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

    const formattedDate = new Date(Number(tzokerDraw.last.drawTime));
    const formattedDateString = new Intl.DateTimeFormat('el-GR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
    }).format(formattedDate);

    const renderNumberFrames = orderedNumbers.map((num, index) => (
        <NumberFrame key={index} number={num} />
    ));

    const prizeLabels = {
        1: '5+1',
        2: '5',
        3: '4+1',
        4: '4',
        5: '3+1',
        6: '3',
        7: '2+1',
        8: '1+1',
        9: '2',
    };

    const formatMoney = (amount) => {
        if (amount === 0) return '-';
        return amount.toLocaleString('el-GR', { minimumFractionDigits: 2 });
    };

    const renderTableHeader = () => (
        <View
            style={[
                styles.tableRow,
                {
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: 'white',
                    marginTop: 20,
                },
            ]}
        >
            <Text style={[styles.text, styles.tableHeaderCell]}>Κατηγορία</Text>
            <Text style={[styles.text, styles.tableHeaderCell]}>Επιτυχίες</Text>
            <Text style={[styles.text, styles.tableHeaderCell]}>
                Κέρδη ανά επιτυχία
            </Text>
        </View>
    );

    const renderTableItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.text, styles.tableCell]}>
                {prizeLabels[item.id] || item.id}
            </Text>
            <Text style={[styles.text, styles.tableCell]}>
                {item.winners === 0 ? '-' : item.winners}
            </Text>
            <Text style={[styles.text, styles.tableCell]}>
                {item.winners === 0 && item.categoryType === 'JACKPOT'
                    ? 'ΤΖΑΚΠΟΤ'
                    : formatMoney(item.divident)}
            </Text>
        </View>
    );

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

            {renderTableHeader()}
            <FlatList
                data={tzokerDraw.last.prizeCategories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTableItem}
            />
            <Text style={styles.resulttext}>
                {new Intl.NumberFormat('el-GR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(
                    parseFloat(tzokerDraw.last.prizeCategories[0].distributed) +
                        parseFloat(tzokerDraw.last.prizeCategories[0].jackpot)
                ) + ' €'}
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
        textAlign: 'center',
    },
    text: {
        color: colors.white,
        fontFamily: 'Roboto',
        padding: 5,
    },
    tableRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default LatestTzokerDraw;

import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import fetchWeather from '../functions/fetchWeather';
import colors from '../config/colors';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                const location = await Location.getCurrentPositionAsync({});
                const address = await Location.reverseGeocodeAsync(
                    location.coords
                );
                setLocation(location);
                setCurrentAddress(address[0]);
            } catch (error) {
                setErrorMsg('Error fetching location');
            }
        })();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const data = await fetchWeather(
                location.coords.latitude,
                location.coords.longitude
            );
            setWeatherData(data);
        } catch (error) {
            setErrorMsg('Error fetching weather data');
        }
    };

    useEffect(() => {
        if (location) {
            fetchWeatherData();
        }
    }, [location]);

    const handleWeather = () => {
        fetchWeatherData();
    };

    const weatherInfo = useMemo(() => {
        if (weatherData) {
            return (
                <>
                    <Text style={styles.temperatureText}>
                        {weatherData.current.temperature_2m}˚C
                    </Text>

                    <Text style={styles.weatherValues}>
                        <Text style={styles.weatherText}>RIGHT NOW </Text>
                        {weatherData.current.relative_humidity_2m}%{' '}
                        <Text style={styles.weatherText}>HUMIDITY</Text>
                    </Text>

                    <Text></Text>

                    <View style={styles.line}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.weatherText}>TODAY MAX</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.weatherValues}>
                                {Math.max(
                                    ...weatherData.daily.temperature_2m_max
                                )}
                                ˚C
                            </Text>
                        </View>
                    </View>

                    <View style={styles.line}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.weatherText}>TODAY MIN</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.weatherValues}>
                                {Math.min(
                                    ...weatherData.daily.temperature_2m_min
                                )}
                                ˚C
                            </Text>
                        </View>
                    </View>

                    <View style={styles.line}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.weatherText}>SUNRIZE</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.weatherValues}>
                                {weatherData.daily.sunrise[0].substring(11, 16)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.line}>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={styles.weatherText}>SUNSET</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text style={styles.weatherValues}>
                                {weatherData.daily.sunset[0].substring(11, 16)}
                            </Text>
                        </View>
                    </View>
                </>
            );
        }
        return null;
    }, [weatherData]);

    return (
        <View>
            <View style={styles.location}>
                <TouchableOpacity onPress={handleWeather}>
                    <MaterialCommunityIcons
                        name={'google-maps'}
                        color={colors.green}
                        size={90}
                    />
                </TouchableOpacity>
                {currentAddress && (
                    <>
                        <Text style={styles.locationText}>
                            {currentAddress.city}
                        </Text>
                        <Text style={styles.locationText}>
                            {currentAddress.country}
                        </Text>
                    </>
                )}
            </View>
            <View style={styles.info}>{weatherInfo}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'flex-start',
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'center',

        width: '100%',
    },
    location: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    locationText: {
        color: colors.green,
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 3,
    },
    temperatureText: {
        color: colors.yellow,
        fontFamily: 'monospace',
        fontSize: 50,
        fontWeight: 'bold',
        padding: 10,
    },
    weatherText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: 'gray',
        padding: 5,
    },
    weatherValues: {
        fontFamily: 'monospace',
        color: colors.yellow,
        padding: 5,
    },
});

export default Weather;

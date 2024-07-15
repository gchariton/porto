import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import RadioScreen from '../screens/RadioScreen';
import CryptoScreen from '../screens/CryptoScreen';

import SettingsNav from './SettingsNav';

import colors from '../config/colors';
import { useAuth } from '../auth/authContext';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
);

const tabBarOptions = {
    tabBarActiveBackgroundColor: colors.secondary,
    tabBarInactiveBackgroundColor: colors.primary,
    tabBarShowLabel: false,
    tabBarStyle: {
        height: 50,
        borderTopColor: colors.blue,
        borderTopWidth: 1,
        backgroundColor: colors.primary,
    },
};

const screenOptions = {
    headerStyle: {
        backgroundColor: colors.secondary,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
        fontSize: 24,
        fontFamily: 'monospace',
    },
};

const BottomBarNav = () => {
    //const { isLoggedIn } = useAuth();
    const isLoggedIn = true;

    useEffect(() => {
        // Force re-render the component whenever isLoggedIn changes
    }, [isLoggedIn]);

    return (
        <Tab.Navigator screenOptions={tabBarOptions} initialRouteName={'Home'}>
            {isLoggedIn ? (
                <>
                    <Tab.Screen
                        name='News'
                        component={NewsScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <TabIcon
                                    name='newspaper'
                                    color={color}
                                    size={size}
                                />
                            ),
                            ...screenOptions,
                            headerLeft: () => {
                                return (
                                    <View style={{ marginLeft: 20 }}>
                                        <TabIcon
                                            name='newspaper'
                                            color={colors.yellow}
                                            size={24}
                                        />
                                    </View>
                                );
                            },
                        }}
                    />
                    <Tab.Screen
                        name='Radio'
                        component={RadioScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <TabIcon
                                    name='radio'
                                    color={color}
                                    size={size}
                                />
                            ),
                            ...screenOptions,
                            headerLeft: () => {
                                return (
                                    <View style={{ marginLeft: 20 }}>
                                        <TabIcon
                                            name='radio'
                                            color={colors.yellow}
                                            size={24}
                                        />
                                    </View>
                                );
                            },
                        }}
                    />
                </>
            ) : null}
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <TabIcon name='home' color={'green'} size={40} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='home'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
            />
            {isLoggedIn ? (
                <>
                    <Tab.Screen
                        name='Crypto'
                        component={CryptoScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <TabIcon
                                    name='bitcoin'
                                    color={color}
                                    size={size}
                                />
                            ),
                            ...screenOptions,
                            headerLeft: () => {
                                return (
                                    <View style={{ marginLeft: 20 }}>
                                        <TabIcon
                                            name='bitcoin'
                                            color={colors.yellow}
                                            size={24}
                                        />
                                    </View>
                                );
                            },
                        }}
                    />
                    <Tab.Screen
                        name='More'
                        component={SettingsNav}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <TabIcon
                                    name='dots-square'
                                    color={color}
                                    size={size}
                                />
                            ),
                            ...screenOptions,
                            headerLeft: () => {
                                return (
                                    <View style={{ marginLeft: 20 }}>
                                        <TabIcon
                                            name='dots-square'
                                            color={colors.yellow}
                                            size={24}
                                        />
                                    </View>
                                );
                            },
                        }}
                    />
                </>
            ) : null}
        </Tab.Navigator>
    );
};

export default BottomBarNav;

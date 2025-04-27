import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import TzokerScreen from '../screens/TzokerScreen';
import CryptoScreen from '../screens/CryptoScreen';
import RadioScreen from '../screens/RadioScreen';
import ScannerScreen from '../screens/ScannerScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsNav from './SettingsNav';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: { backgroundColor: '#333' },
                headerTintColor: '#fff',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#ccc',
                drawerStyle: { backgroundColor: '#222' },
            }}
        >
            <Drawer.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='home'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='News'
                component={NewsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='newspaper'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='Joker'
                component={TzokerScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='cash-multiple'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='Crypto'
                component={CryptoScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='bitcoin'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='Radio'
                component={RadioScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='radio'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='Scanner'
                component={ScannerScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='qrcode-scan'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name='About'
                component={AboutScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name='information-outline'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

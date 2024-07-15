import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomBarNav from './app/components/BottomBarNav';
import { AuthProvider } from './app/auth/authContext';

import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <NavigationContainer>
                    <BottomBarNav />
                </NavigationContainer>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}

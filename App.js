import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomBarNav from './app/components/BottomBarNav';
import authenticate from './app/auth/authenticate';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
    useEffect(() => {
        authenticate();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <BottomBarNav />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

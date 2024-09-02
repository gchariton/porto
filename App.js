import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomBarNav from './app/components/BottomBarNav';
import LoginScreen from './app/screens/LoginScreen';
import authenticate from './app/auth/authenticate';

import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const performAuthentication = async () => {
            const authenticated = await authenticate();
            setIsAuthenticated(authenticated);
        };

        performAuthentication();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                {isAuthenticated ? <BottomBarNav /> : <LoginScreen />}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

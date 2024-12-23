import React from 'react';
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomBarNav from './app/components/BottomBarNav';
import { enableScreens } from 'react-native-screens';

Sentry.init({
    dsn: 'https://04efff4fefd73c73c19af448815f4b5b@o4508501000519680.ingest.de.sentry.io/4508516319166544',
    debug: true,
});

enableScreens();

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <BottomBarNav />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default Sentry.wrap(App);

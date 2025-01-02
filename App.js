import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomBarNav from './app/components/BottomBarNav';
import { enableScreens } from 'react-native-screens';

// Initialize Sentry
Sentry.init({
    dsn: 'https://04efff4fefd73c73c19af448815f4b5b@o4508501000519680.ingest.de.sentry.io/4508516319166544',
    debug: true, // Enables logging for debugging
    release: 'porto@1.0.0', // Replace with your app's release version
    environment: 'development', // Use 'production' for production builds
    integrations: [
        new Sentry.ReactNativeErrorHandlers({
            onerror: true, // Capture global errors
            onunhandledrejection: true, // Capture unhandled promise rejections
        }),
    ],
});

enableScreens();

function App() {
    useEffect(() => {
        // Capture a test error when the app starts
        Sentry.captureException(new Error('Test Sentry Error'));
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <BottomBarNav />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

// Wrap your App with Sentry
export default Sentry.wrap(App);

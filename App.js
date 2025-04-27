import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigator from './app/navigation/DrawerNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default App;

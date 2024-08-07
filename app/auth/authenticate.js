import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
    try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            Alert.alert(
                '⚡ Error',
                'This device seems that does not support biometric authentication.'
            );
            return;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert(
                '⚡ Error',
                'No biometric authentication methods enrolled.'
            );
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with fingerprint.',
            fallbackLabel: 'Use passcode.',
        });

        if (result.success) {
            Alert.alert('⭐ Success', 'Authenticated successfully!');
        } else {
            Alert.alert('⚡ Error', 'Authentication failed.');
        }
    } catch (error) {
        console.error(error);
        Alert.alert(
            '⚡ Error',
            'An unexpected error occurred during authentication.'
        );
    }
};

export default authenticate;

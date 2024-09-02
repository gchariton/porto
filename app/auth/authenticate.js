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
            return false;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert(
                '⚡ Error',
                'No biometric authentication methods enrolled.'
            );
            return false;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate with fingerprint.',
            fallbackLabel: 'Use passcode.',
        });

        if (result.success) {
            return true;
            // Alert.alert('⭐ Success', 'Authenticated successfully!');
        } else {
            Alert.alert('⚡ Error', 'Authentication failed.');
            return false;
        }
    } catch (error) {
        console.error(error);
        Alert.alert(
            '⚡ Error',
            'An unexpected error occurred during authentication.'
        );
        return false;
    }
};

export default authenticate;

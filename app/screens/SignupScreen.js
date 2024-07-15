import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import colors from '../config/colors';

const storeCredentials = (user, pass) => {
    SecureStore.setItemAsync(user, pass);
};

function SignupScreen({ onClose }) {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleClose = () => {
        setMessage('');
        onClose();
    };

    const handleSignup = () => {
        if (user.trim() === '') {
            setMessage('Username cannot be empty!');
        } else if (!/^[a-zA-Z0-9._-]+$/.test(user)) {
            setMessage(
                'ATTENTION! Username can only contain alphanumeric characters, ".", "-", and "_".'
            );
        } else {
            try {
                storeCredentials(user, pass);
                onClose();
            } catch (error) {
                setMessage('Failed to sign up. Please try again later.');
                console.error('Error signing up:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.error}>{message}</Text>
            </View>
            <View style={styles.containerBody}>
                <Text style={styles.text}>Register here!</Text>

                <TextInput
                    style={styles.textinput}
                    onChangeText={setUser}
                    placeholder='user'
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={setPass}
                    placeholder='pass'
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.text}>SIGN UP</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity onPress={handleClose}>
                    <MaterialCommunityIcons
                        name={'close-circle-outline'}
                        color={'gray'}
                        size={35}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 5,
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },
    container: {
        alignContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        justifyContent: 'center',
        margin: 5,
        width: '90%',
    },
    containerBody: {
        alignItems: 'center',
        flex: 3,
        justifyContent: 'center',
        width: '100%',
    },
    containerHeader: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    error: {
        color: colors.red,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    textinput: {
        color: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        fontFamily: 'monospace',
        margin: 10,
        padding: 10,
        width: '70%',
    },
});

export default SignupScreen;

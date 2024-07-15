import React, { useRef, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import SignupScreen from './SignupScreen';
import colors from '../config/colors';
import authenticateUser from '../auth/auth';
import { useAuth } from '../auth/authContext';

function LoginScreen({}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const userRef = useRef(null);
    const passRef = useRef(null);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser('');
        setPass('');
    };

    const handleModalVisibility = () => {
        setModalVisible(false);
    };

    const handleLogin = async () => {
        try {
            const success = await authenticateUser(user, pass);
            if (success) {
                setIsLoggedIn(true);
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType='slide'>
                <View style={styles.modalcontainer}>
                    <View style={styles.modal}>
                        <SignupScreen onClose={handleModalVisibility} />
                    </View>
                </View>
            </Modal>

            {isLoggedIn ? (
                <>
                    <Text style={styles.text}>Welcome {user}!</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.link}>LOGOUT</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={setUser}
                        placeholder='user'
                        placeholderTextColor={'gray'}
                        ref={userRef}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={setPass}
                        placeholder='pass'
                        placeholderTextColor={'gray'}
                        ref={passRef}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.text}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.link}>Sign Up!</Text>
                    </TouchableOpacity>
                </>
            )}
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
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    link: {
        color: colors.blue,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        padding: 10,
    },
    modal: {
        alignSelf: 'center',
        borderColor: colors.blue,
        borderWidth: 2,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        height: '80%',
        justifyContent: 'center',
        width: '90%',
    },
    modalcontainer: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
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

export default LoginScreen;

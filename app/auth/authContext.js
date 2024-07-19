import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const savedToken = await SecureStore.getItemAsync('jwtToken');
            if (savedToken) {
                setToken(savedToken);
                setIsLoggedIn(true);
            }
        };

        loadToken();
    }, []);

    const login = async (jwtToken) => {
        setIsLoggedIn(true);
        setToken(jwtToken);
        await SecureStore.setItemAsync('jwtToken', jwtToken);
    };

    const logout = async () => {
        setIsLoggedIn(false);
        setToken(null);
        await SecureStore.deleteItemAsync('jwtToken');
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

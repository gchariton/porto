import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    const login = (jwtToken) => {
        setIsLoggedIn(true);
        setToken(jwtToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
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

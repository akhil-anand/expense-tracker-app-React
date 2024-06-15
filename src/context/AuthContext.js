import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create a Context for the Auth state
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null)

    const authenticateToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, validate the token (e.g., check expiration)
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken)
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            } catch (e) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        }

    }

    useEffect(() => {
        authenticateToken()
    }, [localStorage.getItem('token')]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for child components to get the auth object and re-render when it changes
export const useAuth = () => {
    return useContext(AuthContext);
};

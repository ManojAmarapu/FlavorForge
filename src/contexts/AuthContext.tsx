import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, loginWithGoogle } from '../services/authService';

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check URL for token first (from Google redirect callback)
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');

        if (urlToken) {
            localStorage.setItem('auth_token', urlToken);
            // Clean up the URL to prevent token leak in history
            window.history.replaceState({}, document.title, window.location.pathname);
            verifyToken(urlToken);
        } else {
            const savedToken = localStorage.getItem('auth_token');
            if (savedToken) {
                verifyToken(savedToken);
            } else {
                setIsLoading(false);
            }
        }
    }, []);

    const verifyToken = async (authToken: string) => {
        try {
            const userData = await getCurrentUser(authToken);
            setToken(authToken);
            setUser(userData);
        } catch (error) {
            console.error('Failed to verify token:', error);
            localStorage.removeItem('auth_token');
        } finally {
            setIsLoading(false);
        }
    };

    const login = () => {
        loginWithGoogle();
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/login`, { email, password });
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Login failed', error.response.data);
            throw new Error(error.response.data);
        }
    };

    const signup = async (userDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/register`, userDetails);
            return response.data;
        } catch (error) {
            console.error('Signup failed', error.response.data);
            throw new Error(error.response.data);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

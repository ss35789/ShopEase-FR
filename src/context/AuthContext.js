// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/login`, { email, password }, { withCredentials: true });
            const userData = response.data.user;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // 사용자 정보 로컬 스토리지에 저장
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

    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/user/logout`, {}, { withCredentials: true });
            setUser(null);
            localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 제거
        } catch (error) {
            console.error('Logout failed', error.response.data);
            throw new Error(error.response.data);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
    <AuthProvider>
        <AppRouter />
    </AuthProvider>,
    document.getElementById('root')
);

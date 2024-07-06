// src/pages/LoginAbout/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SignUp.css';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tel, setTel] = useState('');
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await signup({ userName, email, password, tel });
            alert('Signup successful! Please log in.');
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className="text-center">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tel"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Login.css 파일을 import

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // 여기에 실제 로그인 로직을 추가합니다.
        // 로그인 성공 시:
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <div className="text-center mt-3">
                        <button className="btn btn-link" onClick={() => navigate('/signup')}>Sign Up</button>
                        <button className="btn btn-link" onClick={() => navigate('/forgot-id')}>Forgot ID</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

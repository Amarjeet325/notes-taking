import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import '../styles/Login.css';
import signupBg from '../assets/signup-bg.png';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        otp: ''
    });
    const [showOtp, setShowOtp] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, otp } = loginInfo;

        if (!email || !otp) return handleError('Email and OTP are required');

        try {
            const response = await fetch('http://localhost:4000/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message || 'Login successful');
                localStorage.setItem('token', result.jwtToken);
                localStorage.setItem('loggedInUser', result.name);
                if (keepLoggedIn) localStorage.setItem('keepLoggedIn', true);
                setTimeout(() => navigate('/home'), 1000);
            } else {
                handleError(result?.error?.details?.[0]?.message || result.message || 'Login failed');
            }
        } catch (err) {
            handleError('Network error or server unreachable');
            console.error(err);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="form-section">
                <div className="logo">🌐 HD</div>
                <h2 className="title">Sign In</h2>
                <p className="subtitle">Please login to continue to your account.</p>

                <form className="form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        className="input"
                    />
                    <div className="otp-wrapper">
                        <input
                            type={showOtp ? "text" : "password"}
                            name="otp"
                            placeholder="OTP"
                            value={loginInfo.otp}
                            onChange={handleChange}
                            className="input"
                        />
                        <span
                            className="toggle-otp"
                            onClick={() => setShowOtp(!showOtp)}
                            title={showOtp ? "Hide OTP" : "Show OTP"}
                        >
                            {showOtp ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <div className="resend-otp">Resend OTP</div>

                    <div className="checkbox-row">
                        <input
                            type="checkbox"
                            id="keepLoggedIn"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                        />
                        <label htmlFor="keepLoggedIn">Keep me logged in</label>
                    </div>

                    <button type="submit" className="btn">Sign In</button>

                    <p className="switch-text">Need an account?? <Link to="/signup">Create one</Link></p>
                </form>
            </div>

            <div className="image-section">
                <img src={signupBg} alt="Login Background" />
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import '../styles/Signup.css';
import signupBg from '../assets/signup-bg.png';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        dob: '',
        email: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, dob, email } = signupInfo;

        if (!name || !dob || !email) {
            return handleError('All fields are required');
        }

        try {
            const response = await fetch('http://localhost:4000/auth/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message || 'OTP sent');
                setTimeout(() => navigate('/verify-otp'), 1000);
            } else {
                handleError(result?.error?.details?.[0]?.message || result.message || 'Signup failed');
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
                <h2 className="title">Sign up</h2>
                <p className="subtitle">Sign up to enjoy the feature of HD</p>

                <form className="form" onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={signupInfo.name}
                        onChange={handleChange}
                        className="input"
                    />
                    <div className="dob-wrapper">
                        <span className="icon">📅</span>
                        <input
                            type="text"
                            name="dob"
                            placeholder="Date of Birth"
                            value={signupInfo.dob}
                            onChange={handleChange}
                            className="input dob"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signupInfo.email}
                        onChange={handleChange}
                        className="input"
                    />
                    <button type="submit" className="btn">Get OTP</button>
                    <p className="switch-text">Already have an account?? <Link to="/login">Sign in</Link></p>
                </form>
            </div>

            <div className="image-section">
                <img src={signupBg} alt="Signup Background" />
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default Signup;

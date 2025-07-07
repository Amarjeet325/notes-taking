import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VerifyOtp.css';

function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || localStorage.getItem('pendingEmail') || '');
    const [otp, setOtp] = useState('');

    useEffect(() => {
        // Save email for later use if it's passed via state
        if (location.state?.email) {
            localStorage.setItem('pendingEmail', location.state.email);
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!otp.trim()) {
            toast.error('Please enter the OTP');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Invalid OTP');
            }

            toast.success('OTP verified successfully!');
            localStorage.setItem('token', data.jwtToken);
            localStorage.setItem('loggedInUser', data.name);
            localStorage.setItem('loggedInEmail', email);
            localStorage.removeItem('pendingEmail');

            // Redirect to /home after short delay
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        } catch (err) {
            console.error('Verification failed:', err);
            toast.error(err.message || 'Something went wrong.');
        }
    };

    return (
        <div className="verify-container">
            <div className="verify-box">
                <div className="logo">
                    <div className="spinner" />
                    <span className="brand">HD</span>
                </div>
                <h2>Verify OTP</h2>
                <p>Please enter the OTP sent to <strong>{email}</strong></p>

                <form onSubmit={handleVerify} className="verify-form">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="otp-input"
                        required
                    />
                    <button type="submit" className="verify-btn">Verify</button>
                </form>

                <p className="resend-text">Didn’t receive the OTP? <span className="link">Resend OTP</span></p>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default VerifyOtp;

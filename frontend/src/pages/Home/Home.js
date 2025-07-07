import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState(['Note 1', 'Note 2']);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        const email = localStorage.getItem('loggedInEmail');
        if (!user || !email) {
            handleError('Unauthorized access. Please login.');
            navigate('/login');
        } else {
            setLoggedInUser(user);
            setEmail(email);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        handleSuccess('User logged out');
        setTimeout(() => navigate('/login'), 1000);
    };

    const handleCreateNote = () => {
        const newNote = `Note ${notes.length + 1}`;
        setNotes([...notes, newNote]);
    };

    const handleDeleteNote = (index) => {
        const updated = notes.filter((_, i) => i !== index);
        setNotes(updated);
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="spinner" />
                <h2>Dashboard</h2>
                <button className="signout-btn" onClick={handleLogout}>Sign Out</button>
            </header>

            {/* User Info Box */}
            <div className="user-box">
                <h3>Welcome, {loggedInUser} !</h3>
                <p>Email: {email.replace(/(.{2}).+(@.+)/, "$1xxxxx$2")}</p>
            </div>

            {/* Create Note Button */}
            <button className="create-note-btn" onClick={handleCreateNote}>
                Create Note
            </button>

            {/* Notes List */}
            <div className="notes-section">
                <h4>Notes</h4>
                {notes.map((note, idx) => (
                    <div key={idx} className="note-card">
                        <span>{note}</span>
                        <button className="delete-btn" onClick={() => handleDeleteNote(idx)}>🗑️</button>
                    </div>
                ))}
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}

export default Home;

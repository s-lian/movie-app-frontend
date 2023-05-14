import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the user session and navigate to the login page
        localStorage.removeItem('bearer_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('User contact');
        localStorage.removeItem('Time');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

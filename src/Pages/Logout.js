import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";


export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the user session and navigate to the login page
        localStorage.removeItem('bearer_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('User contact');
        localStorage.removeItem('Time');
        navigate('/')

    };

    return (
        <Button
            color="danger"
            size="lg"
            className="mt-3"
            marginBottoms="8px"

            onClick={handleLogout}>Logout</Button>
    );
}

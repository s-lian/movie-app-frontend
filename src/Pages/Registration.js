import React, { useState } from 'react';
import API_URL from '../API.js';
import "../App.css";
import { useNavigate } from 'react-router-dom';


export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleRegistration = async (event) => {
        event.preventDefault();

        try {
            if (email !== '' && password !== '' && confirmPassword !== '') {
                if (password !== confirmPassword) {
                    throw new Error("Passwords don't match");
                }

                const url = `${API_URL}/user/register`;

                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message);
                }

                const data = await res.json();
                // Perform any additional logic after successful registration
                console.log(data);
                navigate('/login')
            } else {
                throw new Error('Please provide all required fields');
            }
        } catch (error) {
            setError(error.message);
            console.log(error); // Log the error for debugging
            setTimeout(() => {
                setError(null)
            }, 3000);
        }

        // Clear the input fields after registration attempt
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
    };

    return (
        <div>
            <h2>Registration</h2>

            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            </div>
            <button onClick={handleRegistration}>Register</button>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

import React, { useState } from 'react';
import API_URL from '../API.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            if (email !== '' && password !== '') {
                const url = `${API_URL}/user/login`;

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
                localStorage.setItem('bearer_token', data.bearerToken.token);
                localStorage.setItem('refresh_token', data.refreshToken.token);
                localStorage.setItem('User contact', JSON.stringify(email));
                localStorage.setItem("Time", Math.floor(Date.now() / 1000))
                console.log(data);

                navigate('/');


                // Perform any additional logic after successful login
            } else {
                throw new Error('Please provide both email and password');
            }
        } catch (error) {
            setError(error.message);
            console.log(error); // Log the error for debugging
            setTimeout(() => {
                setError(null)
            }, 3000);
        }

        // Clear the input fields after login attempt
        // setEmail('');
        // setPassword('');
    };

    return (
        <div>
            <h2>Login</h2>

            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <button onClick={handleLogin}>Login</button>


            {error && <p className="error-message">{error}</p>}
        </div>


    );
}


import API_URL from '../API.js';



export default async function RefreshToken() {


    const refreshToken = localStorage.getItem('refresh_token');

    try {
        const url = `${API_URL}/user/refresh`;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (!res.ok) {
            // If the refresh token is expired or invalid, clear the tokens and redirect to login
            localStorage.removeItem('bearer_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('User contact');
            localStorage.removeItem("Time")

            // Redirect to the login page


        }

        const data = await res.json();
        localStorage.setItem('bearer_token', data.bearerToken.token);
        localStorage.setItem('refresh_token', data.refreshToken.token);
        localStorage.setItem("Time", Math.floor(Date.now() / 1000))

        return data.bearerToken.token;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to refresh token');
    }
}



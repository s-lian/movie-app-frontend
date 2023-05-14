
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../Components/Token";

export default function Login() {

    const [token, setToken] = useToken();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    let erroMessage = error != null ? error.message : "";


    async function handleSubmit(e) {
        e.preventDefault();

        const tk = await loginUser({
            email,
            password
        });
        debugger;
        setToken(tk);

        if (tk != null & tk.error == undefined) {
            navigate('/');
            location.reload();
        }
        else {
            debugger;
            setError(new Error(tk.message));
        }
    }
}


async function loginUser(credentials) {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
};

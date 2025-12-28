import { useState } from "react";
// import axios from "axios";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await api.post("/login", {
                email,
                password,
            });

            // Save token
            localStorage.setItem("token", res.data.token);

            setMessage("Login successful ✅");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Login failed ❌");
        }
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

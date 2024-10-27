import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'letmein') {
            navigate('/home', {state: {email}});
        } else {
            alert('Incorrect email or password');
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

function Home() {
    const location = useLocation();
    const {email} = location.state || {};
    return (
        <div>
            <h2>Home</h2>
            <p>Welcome, {email}</p>
        </div>
    );
}

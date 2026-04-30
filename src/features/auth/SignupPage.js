import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { api } from '@/lib/api';
import { Link } from 'react-router-dom';
export const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await api.post('/auth/signup', { email, password });
            setMessage('Signup complete. Check your email for verification link.');
        }
        catch (err) {
            setError('Signup failed');
        }
    };
    return _jsxs("form", { onSubmit: submit, children: [_jsx("h1", { children: "Sign up" }), _jsx("input", { value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: 'password', value: password, onChange: (e) => setPassword(e.target.value) }), error && _jsx("p", { children: error }), message && _jsx("p", { children: message }), _jsx("button", { type: 'submit', children: "Create account" }), _jsx(Link, { to: '/login', children: "Login" })] });
};

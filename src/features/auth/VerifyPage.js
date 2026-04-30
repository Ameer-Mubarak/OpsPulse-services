import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '@/lib/api';
export const VerifyPage = () => {
    const [params] = useSearchParams();
    const [state, setState] = useState('Verifying...');
    useEffect(() => {
        const token = params.get('token');
        if (!token) {
            setState('Missing token');
            return;
        }
        api.get(`/auth/verify?token=${encodeURIComponent(token)}`).then(() => setState('Email verified.')).catch(() => setState('Invalid or expired token'));
    }, [params]);
    return _jsxs("div", { children: [_jsx("p", { children: state }), _jsx(Link, { to: '/login', children: "Go to login" })] });
};

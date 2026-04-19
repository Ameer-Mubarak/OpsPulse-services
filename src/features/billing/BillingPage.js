import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
const plans = [
    { name: 'Scale', price: '$499/mo', features: ['25 seats', 'Advanced automations', 'SLA analytics'] },
    { name: 'Enterprise', price: '$1,499/mo', features: ['Unlimited seats', 'SSO/SAML', 'Dedicated CSM'] }
];
export const BillingPage = () => {
    const [message, setMessage] = useState('');
    const selectPlan = async (planName) => {
        const { data } = await api.post('/subscriptions/checkout', { plan: planName });
        setMessage(data.message);
    };
    return (_jsxs("section", { className: "grid", children: [_jsx("h1", { children: "Subscription & Monetization" }), _jsx("small", { children: "Stripe-compatible billing model with seat and usage add-ons." }), _jsx("div", { className: "grid grid-2", children: plans.map((plan) => (_jsxs("article", { className: "card", children: [_jsx("h2", { children: plan.name }), _jsx("p", { style: { margin: '8px 0 0' }, children: plan.price }), _jsx("ul", { children: plan.features.map((f) => _jsx("li", { children: f }, f)) }), _jsxs(Button, { onClick: () => void selectPlan(plan.name), children: ["Choose ", plan.name] })] }, plan.name))) }), message && _jsx("div", { className: "badge badge-success", children: message })] }));
};

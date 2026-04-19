import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/features/auth/AuthContext';
import { LoginPage } from '@/features/auth/LoginPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { BillingPage } from '@/features/billing/BillingPage';
import { SecurityPage } from '@/features/admin/SecurityPage';
const Protected = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading)
        return _jsx(Loading, { label: "Bootstrapping workspace" });
    if (!user)
        return _jsx(Navigate, { to: "/login", replace: true });
    return _jsx(AppLayout, { children: children });
};
export const AppRouter = () => (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Protected, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/billing", element: _jsx(Protected, { children: _jsx(BillingPage, {}) }) }), _jsx(Route, { path: "/security", element: _jsx(Protected, { children: _jsx(SecurityPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }));

import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/features/auth/AuthContext';
import { LoginPage } from '@/features/auth/LoginPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { BillingPage } from '@/features/billing/BillingPage';
import { SecurityPage } from '@/features/admin/SecurityPage';
import { WorkflowsPage } from '@/features/workflows/WorkflowsPage';

const Protected = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading label="Bootstrapping workspace" />;
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
    <Route path="/workflows" element={<Protected><WorkflowsPage /></Protected>} />
    <Route path="/billing" element={<Protected><BillingPage /></Protected>} />
    <Route path="/security" element={<Protected><SecurityPage /></Protected>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

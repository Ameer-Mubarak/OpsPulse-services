import { NavLink } from 'react-router-dom';
import { BillingIcon, DashboardIcon, PulseLogo, ShieldIcon } from '@/components/icons/Icons';
import { useAuth } from '@/features/auth/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: DashboardIcon },
  { label: 'Billing', to: '/billing', icon: BillingIcon },
  { label: 'Security', to: '/security', icon: ShieldIcon }
];

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <PulseLogo style={{ width: 120, color: 'white', marginBottom: 24 }} />
        <p style={{ fontSize: 13, margin: '0 0 16px' }}>Workflow command center for operations teams.</p>
        <div style={{ display: 'grid', gap: 8 }}>
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({ color: isActive ? 'white' : '#9fb1ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '10px', borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.14)' : 'transparent' })}>
              <Icon width={16} height={16} />{label}
            </NavLink>
          ))}
        </div>
        <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16 }}>
          <small>{user?.email}</small><br />
          <small>Role: {user?.role}</small>
          <button className="button button-secondary" style={{ marginTop: 12, width: '100%' }} onClick={logout}>Sign out</button>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

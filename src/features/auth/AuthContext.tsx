import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

type Role = 'owner' | 'manager' | 'analyst';
interface User { id: string; email: string; role: Role; }
interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncCsrf = async () => {
    const { data } = await api.get('/auth/csrf');
    localStorage.setItem('ops_csrf', data.csrfToken);
  };

  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem('ops_token');
      if (!token) return setLoading(false);
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
        await syncCsrf();
      } catch {
        localStorage.removeItem('ops_token');
        localStorage.removeItem('ops_csrf');
      } finally {
        setLoading(false);
      }
    };
    void hydrate();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('ops_token', data.token);
    setUser(data.user);
    await syncCsrf();
  };

  const logout = () => {
    localStorage.removeItem('ops_token');
    localStorage.removeItem('ops_csrf');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export type Alert = {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'resolved';
  impact: string;
  acknowledgedBy: string | null;
  acknowledgedAt: string | null;
};

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/alerts');
      setAlerts(data.alerts);
    } finally {
      setLoading(false);
    }
  };

  const acknowledge = async (id: string) => {
    await api.post(`/alerts/${id}/ack`);
    await refresh();
  };

  useEffect(() => {
    void refresh();
  }, []);

  return { alerts, loading, acknowledge };
};

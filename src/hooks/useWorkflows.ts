import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export type Workflow = {
  id: string;
  name: string;
  owner: string;
  status: 'healthy' | 'warning' | 'critical';
  automationCoverage: number;
  lastRunAt: string | null;
  runCount: number;
};

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/workflows');
      setWorkflows(data.workflows);
    } finally {
      setLoading(false);
    }
  };

  const trigger = async (id: string) => {
    await api.post(`/workflows/${id}/trigger`);
    await refresh();
  };

  useEffect(() => {
    void refresh();
  }, []);

  return { workflows, loading, trigger, refresh };
};

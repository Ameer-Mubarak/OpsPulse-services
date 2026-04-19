import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

type GovernanceAction = {
  id: string;
  title: string;
  riskLevel: 'low' | 'medium' | 'high';
  category: 'security' | 'billing' | 'workflow';
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
};

export const GovernancePage = () => {
  const [actions, setActions] = useState<GovernanceAction[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  const refresh = async () => {
    const { data } = await api.get('/governance/actions');
    setActions(data.actions);
    setPendingCount(data.pendingCount);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const decide = async (id: string, decision: 'approved' | 'rejected') => {
    await api.post(`/governance/${id}/decision`, { decision });
    await refresh();
  };

  return (
    <section className="grid" style={{ gap: 20 }}>
      <header>
        <h1>Phase 6: Governance Control Tower</h1>
        <small>Approval workflows for high-risk automation and billing policy changes.</small>
      </header>

      <div className="badge badge-warning">Pending approvals: {pendingCount}</div>

      <div className="grid">
        {actions.map((action) => (
          <article key={action.id} className="card" style={{ display: 'grid', gap: 8 }}>
            <h3>{action.title}</h3>
            <small>{action.category} • risk: {action.riskLevel}</small>
            <small>Requested by {action.requestedBy}</small>
            <span className={`badge ${action.status === 'approved' ? 'badge-success' : action.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>{action.status}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" onClick={() => void decide(action.id, 'approved')} disabled={action.status !== 'pending'}>Approve</Button>
              <Button variant="secondary" onClick={() => void decide(action.id, 'rejected')} disabled={action.status !== 'pending'}>Reject</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

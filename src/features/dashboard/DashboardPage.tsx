import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type KPI = { label: string; value: string; trend: 'up' | 'stable' | 'down'; };

export const DashboardPage = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);

  useEffect(() => {
    api.get('/metrics/kpis').then(({ data }) => setKpis(data.kpis)).catch(() => setKpis([]));
  }, []);

  return (
    <section className="grid" style={{ gap: 24 }}>
      <header>
        <h1>Revenue Operations Command</h1>
        <small>Automate incident triage, prevent SLA breaches, and recover at-risk ARR.</small>
      </header>
      <div className="grid grid-3">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="card">
            <small>{kpi.label}</small>
            <h2 style={{ marginTop: 8 }}>{kpi.value}</h2>
            <span className={`badge ${kpi.trend === 'up' ? 'badge-success' : kpi.trend === 'down' ? 'badge-error' : 'badge-warning'}`}>
              {kpi.trend === 'up' ? 'Improving' : kpi.trend === 'down' ? 'Needs action' : 'Stable'}
            </span>
          </article>
        ))}
      </div>
      <div className="grid grid-2">
        <article className="card">
          <h3>Automations</h3>
          <ul>
            <li>Smart escalation for high-severity tickets (avg save: 11.2 hrs/week)</li>
            <li>Renewal risk scoring synced to CRM</li>
            <li>Usage-based overage recommendations</li>
          </ul>
        </article>
        <article className="card">
          <h3>Retention Drivers</h3>
          <ul>
            <li>Playbooks triggered by product inactivity</li>
            <li>Contract utilization alerts 30 days before renewal</li>
            <li>NPS + incident response correlation panel</li>
          </ul>
        </article>
      </div>
    </section>
  );
};

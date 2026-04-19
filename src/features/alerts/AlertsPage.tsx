import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useAlerts } from '@/hooks/useAlerts';

export const AlertsPage = () => {
  const { alerts, loading, acknowledge } = useAlerts();

  return (
    <section className="grid" style={{ gap: 20 }}>
      <header>
        <h1>Phase 3: Revenue Risk Alerts</h1>
        <small>AI-prioritized issues affecting retention, SLA compliance, and expansion opportunities.</small>
      </header>

      {loading ? <Loading label="Loading alerts" /> : (
        <div className="grid">
          {alerts.map((alert) => (
            <article key={alert.id} className="card" style={{ display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <h3>{alert.title}</h3>
                <span className={`badge ${alert.severity === 'high' ? 'badge-error' : alert.severity === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <small>{alert.impact}</small>
              <small>Status: {alert.status}{alert.acknowledgedBy ? ` • Ack by ${alert.acknowledgedBy}` : ''}</small>
              <Button variant="secondary" onClick={() => void acknowledge(alert.id)} disabled={alert.status === 'resolved'}>
                {alert.status === 'resolved' ? 'Acknowledged' : 'Acknowledge'}
              </Button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

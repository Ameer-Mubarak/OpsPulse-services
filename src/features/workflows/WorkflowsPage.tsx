import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useWorkflows } from '@/hooks/useWorkflows';

export const WorkflowsPage = () => {
  const { workflows, loading, trigger } = useWorkflows();

  return (
    <section className="grid" style={{ gap: 24 }}>
      <header>
        <h1>Phase 2: Automation Orchestration</h1>
        <small>Operational playbooks for incidents, renewals, and utilization remediation.</small>
      </header>

      {loading ? <Loading label="Fetching workflow status" /> : (
        <div className="grid grid-2">
          {workflows.map((workflow) => (
            <article key={workflow.id} className="card">
              <h3>{workflow.name}</h3>
              <small>Owner: {workflow.owner}</small>
              <p style={{ margin: '8px 0' }}>Automation coverage: {workflow.automationCoverage}%</p>
              <small>Runs: {workflow.runCount} {workflow.lastRunAt ? `• Last run ${new Date(workflow.lastRunAt).toLocaleString()}` : ''}</small>
              <div style={{ margin: '8px 0' }}>
                <span className={`badge ${workflow.status === 'healthy' ? 'badge-success' : workflow.status === 'warning' ? 'badge-warning' : 'badge-error'}`}>
                  {workflow.status}
                </span>
              </div>
              <Button onClick={() => void trigger(workflow.id)} variant="secondary">Trigger Runbook</Button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

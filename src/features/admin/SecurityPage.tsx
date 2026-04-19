import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  at: string;
};

export const SecurityPage = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);

  useEffect(() => {
    api.get('/security/audit').then(({ data }) => setEntries(data.entries)).catch(() => setEntries([]));
  }, []);

  return (
    <section className="grid">
      <h1>Security Control Plane</h1>
      <div className="grid grid-2">
        <article className="card"><h3>Auth</h3><p>JWT access token + refresh strategy, password policy, optional MFA, session revocation.</p></article>
        <article className="card"><h3>RBAC</h3><p>Role matrix: owner, manager, analyst. API authorization middleware enforces route-level permissions.</p></article>
        <article className="card"><h3>Input Validation</h3><p>Zod validation for request body/query/params with strict schemas and sanitization.</p></article>
        <article className="card"><h3>API Shield</h3><p>Helmet CSP, CORS allowlist, rate limiting, anti-injection checks, CSRF token flow for state changes.</p></article>
      </div>

      <article className="card">
        <h3>Phase 3: Audit Trail</h3>
        {entries.length === 0 ? <small>No security events yet.</small> : (
          <ul>
            {entries.slice(0, 8).map((entry) => (
              <li key={entry.id}>
                <strong>{entry.actor}</strong> {entry.action} {entry.resource} on {new Date(entry.at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
};

export type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  resource: string;
  at: string;
  ip: string;
};

const auditLog: AuditEntry[] = [];

export const recordAudit = (entry: Omit<AuditEntry, 'id' | 'at'>) => {
  auditLog.unshift({
    ...entry,
    id: `audit_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    at: new Date().toISOString()
  });

  if (auditLog.length > 250) {
    auditLog.length = 250;
  }
};

export const readAudit = () => auditLog;

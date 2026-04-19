import type { RequestHandler } from 'express';
import { recordAudit } from '../utils/audit.js';

export const auditAction = (action: string, resource: string): RequestHandler => (req, _res, next) => {
  const actor = req.auth?.email ?? 'anonymous';
  recordAudit({
    actor,
    action,
    resource,
    ip: req.ip
  });
  next();
};

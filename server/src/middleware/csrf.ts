import crypto from 'node:crypto';
import type { RequestHandler } from 'express';

const csrfStore = new Map<string, string>();

export const issueCsrfToken = (userId: string) => {
  const token = crypto.randomBytes(24).toString('hex');
  csrfStore.set(userId, token);
  return token;
};

export const requireCsrf: RequestHandler = (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (!req.auth) return void res.status(401).json({ error: 'Authentication required' });

  const expected = csrfStore.get(req.auth.sub);
  const provided = req.headers['x-csrf-token'];
  if (!expected || expected !== provided) return void res.status(403).json({ error: 'CSRF token mismatch' });

  next();
};

import type { RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt.js';

export const requireAuth: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return void res.status(401).json({ error: 'Missing auth token' });
  try {
    req.auth = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};

export const allowRoles = (...roles: Array<'owner' | 'manager' | 'analyst'>): RequestHandler => (req, res, next) => {
  if (!req.auth || !roles.includes(req.auth.role)) return void res.status(403).json({ error: 'Insufficient role permissions' });
  next();
};

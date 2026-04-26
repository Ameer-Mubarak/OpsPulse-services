import { Request, Response, NextFunction } from 'express';

type AuditLog = {
  method: string;
  path: string;
  ip: string;
  userId: string;
  userAgent: string;
  timestamp: string;
};

export function auditMiddleware(req: Request, res: Response, next: NextFunction) {
  // Safe IP extraction
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : Array.isArray(forwarded)
      ? forwarded[0]
      : req.socket.remoteAddress ?? '';

  const userAgent = req.headers['user-agent'] ?? '';

  // This block fixes the "undefined" error
  const rawUserId =
    (req as any).user?.id ?? 
    req.headers['x-user-id'] ?? 
    'anonymous';

  const log: AuditLog = {
    method: req.method,
    path: req.originalUrl,
    ip,
    // Final safety check to ensure it's a string for the AuditLog type
    userId: typeof rawUserId === 'string' ? rawUserId : String(rawUserId),
    userAgent,
    timestamp: new Date().toISOString(),
  };

  console.log('[AUDIT]', JSON.stringify(log));
  next();
}

export function auditAction(action: string, resource: string) {
  return function (req: Request, _res: Response, next: NextFunction) {
    const rawUserId =
      (req as any).user?.id ??
      (req as any).auth?.email ??
      req.headers['x-user-id'] ??
      'anonymous';

    const userId = typeof rawUserId === 'string' ? rawUserId : String(rawUserId);

    const entry = {
      action,
      resource,
      method: req.method,
      path: req.originalUrl,
      userId,
      timestamp: new Date().toISOString(),
    };

    console.log('[AUDIT_ACTION]', JSON.stringify(entry));
    next();
  };
}

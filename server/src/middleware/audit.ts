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
    timestamp: new Date().toISOString(),
  };

  // يمكنك ربطها ب DB أو logger لاحقًا
  console.log('[AUDIT]', JSON.stringify(log));

  next();
}

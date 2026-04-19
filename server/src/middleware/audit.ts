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
  // استخراج IP بشكل آمن
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : Array.isArray(forwarded)
      ? forwarded[0]
      : req.socket.remoteAddress ?? '';

  // استخراج user-agent
  const userAgent = req.headers['user-agent'] ?? '';

  // مثال: إذا عندك user مضاف عبر auth middleware
  // عدل حسب هيكل مشروعك
  const userId =
    (req as any).user?.id ??
    (req.headers['x-user-id'] ?? 'anonymous');

  const log: AuditLog = {
    method: req.method,
    path: req.originalUrl,
    ip,
    userId: typeof userId === 'string' ? userId : '',
    userAgent,
    timestamp: new Date().toISOString(),
  };

  // يمكنك ربطها ب DB أو logger لاحقًا
  console.log('[AUDIT]', JSON.stringify(log));

  next();
}

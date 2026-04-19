import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';
import { store } from '../../utils/store.js';

const router = Router();

router.get('/', requireAuth, (_req, res) => {
  res.json({ alerts: store.alerts });
});

const ackSchema = z.object({ params: z.object({ alertId: z.string().min(2) }) });

router.post('/:alertId/ack', requireAuth, requireCsrf, validate(ackSchema), auditAction('acknowledge', 'alert'), (req, res) => {
  const alert = store.alerts.find((item) => item.id === req.params.alertId);
  if (!alert) return void res.status(404).json({ error: 'Alert not found' });

  alert.status = 'resolved';
  alert.acknowledgedBy = req.auth?.email ?? 'unknown';
  alert.acknowledgedAt = new Date().toISOString();

  res.json({
    message: `Alert acknowledged: ${alert.title}`,
    ackedBy: alert.acknowledgedBy,
    alert
  });
});

export default router;

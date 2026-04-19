import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';

const router = Router();

const alerts = [
  { id: 'alt_1', title: 'SLA Breach Risk: Acme Corp', severity: 'high', status: 'open', impact: '$12,000 ARR at risk' },
  { id: 'alt_2', title: 'Renewal Churn Signal: Lumio', severity: 'medium', status: 'open', impact: 'Usage dropped 42%' },
  { id: 'alt_3', title: 'Overage Threshold Hit: Datagrid', severity: 'low', status: 'open', impact: 'Potential upsell opportunity' }
] as const;

router.get('/', requireAuth, (_req, res) => {
  res.json({ alerts });
});

const ackSchema = z.object({ params: z.object({ alertId: z.string().min(2) }) });

router.post('/:alertId/ack', requireAuth, requireCsrf, validate(ackSchema), auditAction('acknowledge', 'alert'), (req, res) => {
  const alert = alerts.find((item) => item.id === req.params.alertId);
  if (!alert) return void res.status(404).json({ error: 'Alert not found' });

  res.json({
    message: `Alert acknowledged: ${alert.title}`,
    ackedBy: req.auth?.email
  });
});

export default router;

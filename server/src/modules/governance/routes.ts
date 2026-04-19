import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';
import { store } from '../../utils/store.js';

const router = Router();

router.get('/actions', requireAuth, (_req, res) => {
  const pendingCount = store.governanceActions.filter((action) => action.status === 'pending').length;
  res.json({ actions: store.governanceActions, pendingCount });
});

const decisionSchema = z.object({
  params: z.object({ actionId: z.string().min(2) }),
  body: z.object({ decision: z.enum(['approved', 'rejected']) })
});

router.post('/:actionId/decision', requireAuth, requireCsrf, allowRoles('owner'), validate(decisionSchema), auditAction('decide', 'governance_action'), (req, res) => {
  const action = store.governanceActions.find((item) => item.id === req.params.actionId);
  if (!action) return void res.status(404).json({ error: 'Governance action not found' });

  const { decision } = req.body as { decision: 'approved' | 'rejected' };
  action.status = decision;
  action.decidedAt = new Date().toISOString();

  res.json({ message: `Action ${decision}`, action });
});

export default router;

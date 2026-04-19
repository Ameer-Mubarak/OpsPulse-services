import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { store } from '../../utils/store.js';

const router = Router();

router.get('/', requireAuth, (req, res) => {
  const shaped = store.workflows.map((wf) => ({ ...wf, status: req.auth?.role === 'analyst' && wf.status === 'critical' ? 'warning' : wf.status }));
  res.json({ workflows: shaped });
});

const triggerSchema = z.object({ params: z.object({ workflowId: z.string().min(2) }) });

router.post('/:workflowId/trigger', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(triggerSchema), (req, res) => {
  const { workflowId } = req.params;
  const workflow = store.workflows.find((wf) => wf.id === workflowId);
  if (!workflow) return void res.status(404).json({ error: 'Workflow not found' });

  workflow.runCount += 1;
  workflow.lastRunAt = new Date().toISOString();
  workflow.status = workflow.status === 'critical' ? 'warning' : 'healthy';

  res.json({
    message: `Runbook triggered for ${workflow.name}`,
    executionId: `exec_${Date.now()}`,
    workflow
  });
});

export default router;

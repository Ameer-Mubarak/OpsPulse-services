import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';

const router = Router();

const workflows = [
  { id: 'wf_incident', name: 'Incident Escalation Matrix', owner: 'Support Ops', status: 'healthy', automationCoverage: 89 },
  { id: 'wf_renewal', name: 'Renewal Risk Recovery', owner: 'CS Ops', status: 'warning', automationCoverage: 67 },
  { id: 'wf_usage', name: 'Usage Drop-off Remediation', owner: 'RevOps', status: 'critical', automationCoverage: 52 }
] as const;

router.get('/', requireAuth, (req, res) => {
  const shaped = workflows.map((wf) => ({ ...wf, status: req.auth?.role === 'analyst' && wf.status === 'critical' ? 'warning' : wf.status }));
  res.json({ workflows: shaped });
});

const triggerSchema = z.object({ params: z.object({ workflowId: z.string().min(2) }) });

router.post('/:workflowId/trigger', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(triggerSchema), (req, res) => {
  const { workflowId } = req.params;
  const workflow = workflows.find((wf) => wf.id === workflowId);
  if (!workflow) return void res.status(404).json({ error: 'Workflow not found' });

  res.json({
    message: `Runbook triggered for ${workflow.name}`,
    executionId: `exec_${Date.now()}`
  });
});

export default router;

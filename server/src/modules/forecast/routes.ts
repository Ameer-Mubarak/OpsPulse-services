import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';
import { store } from '../../utils/store.js';

const router = Router();

router.get('/scenarios', requireAuth, (_req, res) => {
  const scenario = {
    currentArr: 2_980_000,
    renewalRiskArr: 410_000,
    expansionPipeline: 520_000,
    grossRetention: 0.88
  };

  res.json({ scenario, history: store.forecastRuns.slice(0, 10) });
});

const simulateSchema = z.object({
  body: z.object({
    churnReductionPct: z.number().min(0).max(40),
    expansionLiftPct: z.number().min(0).max(50)
  })
});

router.post('/simulate', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(simulateSchema), auditAction('simulate', 'forecast'), (req, res) => {
  const { churnReductionPct, expansionLiftPct } = req.body as { churnReductionPct: number; expansionLiftPct: number };
  const projectedNetRevenueImpact = Math.round((410000 * (churnReductionPct / 100)) + (520000 * (expansionLiftPct / 100)));

  const run = {
    id: `fr_${Date.now()}`,
    churnReductionPct,
    expansionLiftPct,
    projectedNetRevenueImpact,
    actor: req.auth?.email ?? 'unknown',
    createdAt: new Date().toISOString()
  };
  store.forecastRuns.unshift(run);

  res.json({
    projectedNetRevenueImpact,
    message: `Simulation complete. Potential annual impact: $${projectedNetRevenueImpact.toLocaleString()}`,
    run
  });
});

export default router;

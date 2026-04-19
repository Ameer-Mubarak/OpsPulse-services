import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';

const router = Router();

router.get('/scenarios', requireAuth, (req, res) => {
  const base = {
    currentArr: 2_980_000,
    renewalRiskArr: 410_000,
    expansionPipeline: 520_000,
    grossRetention: 0.88
  };

  const scenario = req.auth?.role === 'analyst'
    ? { ...base, note: 'Analyst view uses masked forecast sensitivity.' }
    : base;

  res.json({ scenario });
});

const simulateSchema = z.object({
  body: z.object({
    churnReductionPct: z.number().min(0).max(40),
    expansionLiftPct: z.number().min(0).max(50)
  })
});

router.post(
  '/simulate',
  requireAuth,
  requireCsrf,
  allowRoles('owner', 'manager'),
  validate(simulateSchema),
  auditAction('simulate', 'forecast'),
  (req, res) => {
    const { churnReductionPct, expansionLiftPct } = req.body as { churnReductionPct: number; expansionLiftPct: number };
    const projectedNetRevenueImpact = Math.round((410000 * (churnReductionPct / 100)) + (520000 * (expansionLiftPct / 100)));

    res.json({
      projectedNetRevenueImpact,
      message: `Simulation complete. Potential annual impact: $${projectedNetRevenueImpact.toLocaleString()}`
    });
  }
);

export default router;

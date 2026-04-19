import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';
import { store } from '../../utils/store.js';

const router = Router();

router.get('/recommendations', requireAuth, (_req, res) => {
  const ranked = [...store.recommendations].sort((a, b) => b.annualImpact - a.annualImpact);
  res.json({ recommendations: ranked, totalPotentialImpact: ranked.filter((r) => !r.applied).reduce((acc, r) => acc + r.annualImpact, 0) });
});

const applySchema = z.object({ params: z.object({ recommendationId: z.string().min(2) }) });

router.post('/:recommendationId/apply', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(applySchema), auditAction('apply', 'recommendation'), (req, res) => {
  const rec = store.recommendations.find((r) => r.id === req.params.recommendationId);
  if (!rec) return void res.status(404).json({ error: 'Recommendation not found' });
  rec.applied = true;
  res.json({ message: `Applied recommendation: ${rec.title}`, recommendation: rec });
});

export default router;

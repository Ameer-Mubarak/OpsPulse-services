import { Router } from 'express';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { readAudit } from '../../utils/audit.js';

const router = Router();

router.get('/audit', requireAuth, allowRoles('owner'), (_req, res) => {
  res.json({ entries: readAudit() });
});

export default router;

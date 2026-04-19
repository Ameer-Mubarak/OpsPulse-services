import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';

const router = Router();
router.get('/kpis', requireAuth, (_req, res) => {
  res.json({
    kpis: [
      { label: 'MRR Protected', value: '$248,400', trend: 'up' },
      { label: 'SLA Breach Risk', value: '4.2%', trend: 'down' },
      { label: 'Automation Hours Saved', value: '132 hrs', trend: 'up' }
    ]
  });
});

export default router;

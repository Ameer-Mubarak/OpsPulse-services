import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';

const router = Router();
const checkoutSchema = z.object({ body: z.object({ plan: z.enum(['Scale', 'Enterprise']) }) });

router.post('/checkout', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(checkoutSchema), (req, res) => {
  const { plan } = req.body as { plan: 'Scale' | 'Enterprise' };
  res.json({
    checkoutId: `chk_${Date.now()}`,
    message: `${plan} plan selected. Stripe Checkout session would be created server-side.`
  });
});

export default router;

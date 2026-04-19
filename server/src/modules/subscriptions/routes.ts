import { Router } from 'express';
import { z } from 'zod';
import { allowRoles, requireAuth } from '../../middleware/auth.js';
import { requireCsrf } from '../../middleware/csrf.js';
import { validate } from '../../middleware/validate.js';
import { auditAction } from '../../middleware/audit.js';
import { store } from '../../utils/store.js';

const router = Router();
const checkoutSchema = z.object({ body: z.object({ plan: z.enum(['Scale', 'Enterprise']) }) });
const seatsSchema = z.object({ body: z.object({ seatCount: z.number().int().min(1).max(500) }) });

router.get('/current', requireAuth, (_req, res) => {
  res.json({ subscription: store.subscription });
});

router.post('/checkout', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(checkoutSchema), auditAction('update', 'subscription_plan'), (req, res) => {
  const { plan } = req.body as { plan: 'Scale' | 'Enterprise' };
  store.subscription.plan = plan;
  store.subscription.updatedAt = new Date().toISOString();

  res.json({
    checkoutId: `chk_${Date.now()}`,
    message: `${plan} plan selected. Stripe Checkout session would be created server-side.`,
    subscription: store.subscription
  });
});

router.post('/seats', requireAuth, requireCsrf, allowRoles('owner', 'manager'), validate(seatsSchema), auditAction('update', 'subscription_seats'), (req, res) => {
  const { seatCount } = req.body as { seatCount: number };
  store.subscription.seatCount = seatCount;
  store.subscription.updatedAt = new Date().toISOString();
  res.json({ message: `Seats updated to ${seatCount}`, subscription: store.subscription });
});

export default router;

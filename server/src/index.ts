import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import authRoutes from './modules/auth/routes.js';
import metricsRoutes from './modules/metrics/routes.js';
import subscriptionsRoutes from './modules/subscriptions/routes.js';
import workflowsRoutes from './modules/workflows/routes.js';
import alertsRoutes from './modules/alerts/routes.js';
import securityRoutes from './modules/security/routes.js';
import forecastRoutes from './modules/forecast/routes.js';
import intelligenceRoutes from './modules/intelligence/routes.js';
import governanceRoutes from './modules/governance/routes.js';

const app = express();

// Trust first proxy (Railway, Heroku, etc.) so req.ip and express-rate-limit work with X-Forwarded-For
app.set('trust proxy', 1);

// Helmet for basic security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  })
);

// Configure CORS
// CORS_ORIGIN may be a single origin or a comma-separated list of allowed origins
const allowedOrigins = (env.CORS_ORIGIN ?? '').split(',').map(s => s.trim()).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow curl/postman (no origin)
      if (!origin) return callback(null, true);

      // debug log to help see what origin browsers send
      console.log('[CORS] origin:', origin);

      // direct match against configured list
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // allow any Vercel preview domains (e.g. *.vercel.app)
      try {
        const hostname = new URL(origin).hostname;
        if (hostname.endsWith('.vercel.app')) return callback(null, true);
      } catch (e) {
        /* ignore URL parse errors */
      }

      // allow localhost for local dev
      if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
  })
);

// Body parser
app.use(express.json({ limit: '200kb' }));

// Debug middleware — log incoming requests (remove after debugging)
app.use((req, _res, next) => {
  try {
    console.log('[DEBUG REQ]', {
      method: req.method,
      path: req.originalUrl || req.url,
      origin: req.headers.origin,
      contentType: req.headers['content-type'],
      body: req.body
    });
  } catch (err) {
    console.log('[DEBUG REQ] log error', err);
  }
  next();
});

// Basic rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/workflows', workflowsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/intelligence', intelligenceRoutes);
app.use('/api/governance', governanceRoutes);

// 404 handler for unmatched routes
app.use((_req, res) => res.status(404).json({ detail: 'Not Found' }));

// Generic error handler (JSON)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err && err.stack ? err.stack : err);
  if (err instanceof Error && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS origin denied' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

// Only start listening in non-serverless environments (keeps compatibility with Vercel serverless wrapper)
if (!process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`OpsPulse API running on :${env.PORT}`);
  });
}

// Export for serverless wrappers (or tests)
export default app;

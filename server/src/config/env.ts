import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url().default('http://localhost:5173')
});

export const env = schema.parse(process.env);

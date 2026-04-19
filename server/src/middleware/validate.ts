import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject): RequestHandler => (req, res, next) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params });
  if (!result.success) return void res.status(422).json({ error: result.error.flatten() });
  next();
};

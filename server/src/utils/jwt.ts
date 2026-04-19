import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface JwtPayload { sub: string; role: 'owner' | 'manager' | 'analyst'; email: string; }

export const signToken = (payload: JwtPayload) => jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' });
export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as JwtPayload;

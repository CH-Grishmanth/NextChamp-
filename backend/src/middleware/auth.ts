import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getPool } from '../config/database';
import { createError } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
    email: string;
  }
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check session first
  if ((req.session as any)?.userId) {
    req.user = {
      id: (req.session as any).userId,
      email: (req.session as any).email,
      name: '' // Will be fetched if needed
    };
    return next();
  }

  // Check JWT token as fallback
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(createError('Access denied. No token provided.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    req.user = decoded;
    next();
  } catch (error) {
    next(createError('Invalid token.', 401));
  }
}

export function authenticateOptional(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Check session first
  if ((req.session as any)?.userId) {
    req.user = {
      id: (req.session as any).userId,
      email: (req.session as any).email,
      name: ''
    };
    return next();
  }

  // Check JWT token as fallback
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
      req.user = decoded;
    } catch (error) {
      // Token is invalid, but we don't throw an error for optional auth
    }
  }

  next();
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    return next(createError('Authentication required.', 401));
  }

  try {
    // Verify user still exists in database
    const pool = getPool();
    const result = await pool.query(
      'SELECT id, email, name, avatar_url FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return next(createError('User not found.', 401));
    }

    // Update user info with fresh data
    req.user = {
      id: result.rows[0].id,
      email: result.rows[0].email,
      name: result.rows[0].name
    };

    next();
  } catch (error) {
    next(createError('Authentication failed.', 401));
  }
}
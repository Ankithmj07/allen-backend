import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_ADMIN_KEY || "fallback-secret-key";

export interface AuthenticatedRequest extends Request {
  admin?: any;
}

export const verifyAdminToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];


  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.admin = decoded;
    next(); 
  } catch (err) {
    res.status(403).json({ 
        message: 'Invalid or expired token',
        token:token
     });
    return; 
  }
};

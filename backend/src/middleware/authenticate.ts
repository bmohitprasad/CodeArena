import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "TOPSECRETCODE"

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader;

  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: 'TEACHER';
      name: string;
      dept: string;
      email: string;
    };

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token', error: err });
    return;
  }
};
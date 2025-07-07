import { Request, Response, NextFunction } from 'express';

export const requireRole = (role: 'TEACHER' | 'STUDENT') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};

declare namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: 'TEACHER' | 'STUDENT';
        name?: string;
        dept?: string;
        email?: string;
      };
    }
  }
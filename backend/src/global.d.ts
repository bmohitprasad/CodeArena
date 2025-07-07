declare namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: 'TEACHER';
        name: string;
        dept: string;
        email: string;
      },

      user2?: {
        roll_num: number;
        role: 'STUDENT';
        name: string;
        branch: string;
      };
    }
  }
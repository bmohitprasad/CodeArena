import bcrypt from 'bcrypt'
import { Router, Request, Response } from 'express';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/prisma';

const teacherAuthRouter = Router();

// 1. Enhanced Zod Schemas with specific messages
const signupInput = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name is too short" }),
  dept: z.string().min(1, { message: "Department is required" }),
  email: z.string().email({ message: "Invalid email format" })
});

const signinInput = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const JWT_SECRET = "TOPSECRETCODE";

teacherAuthRouter.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signupInput.safeParse(req.body);
  
  // 2. Return specific Zod validation errors
  if (!parseResult.success) {
    return res.status(400).json({ 
      message: parseResult.error.issues[0].message 
    });
  }
  
  const body = parseResult.data;
  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user = await prisma.teacher.create({
      data: {
        name: body.name,
        password: hashedPassword,
        email: body.email,
        dept: body.dept
      },
    });

    const token = jwt.sign({ 
      id: user.id, 
      role: user.role, 
      name: user.name, 
      email: user.email, 
      dept: user.dept 
    }, JWT_SECRET);

    return res.json({ 
      jwt: token, 
      teacherId: user.id 
    });

  } catch (e: any) {
    // 3. Handle Unique Email constraint (P2002)
    if (e.code === 'P2002') {
      return res.status(409).json({ 
        message: "A teacher with this email already exists." 
      });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

teacherAuthRouter.post('/signin', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signinInput.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ 
      message: parseResult.error.issues[0].message 
    });
  }

  const body = parseResult.data;

  try {
    const user = await prisma.teacher.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return res.status(403).json({ 
        message: "No teacher account found with this email" 
      });
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      return res.status(403).json({ 
        message: "Incorrect password" 
      });
    }

    const token = jwt.sign({ 
      id: user.id, 
      role: user.role, 
      name: user.name, 
      email: user.email, 
      dept: user.dept 
    }, JWT_SECRET);

    return res.json({ 
      jwt: token, 
      teacherId: user.id 
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default teacherAuthRouter;
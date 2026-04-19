import express from 'express';
import { Router, Request, Response } from 'express';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/prisma';
import bcrypt from 'bcrypt';
import { runCode } from '../../lib/codeRunner';

const studentAuthRouter = Router();

const signupInput = z.object({
  roll_num: z.coerce.number()
    .int()
    .min(100000, { message: "Roll number must be at least 6 digits" })
    .max(999999, { message: "Roll number cannot exceed 6 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  name: z.string().min(2, { message: "Name is too short" }),
  branch: z.string().min(1, { message: "Branch is required" })
});

const signinInput = z.object({
  roll_num: z.coerce.number().int(),
  password: z.string(),
});


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;

const JWT_SECRET = "TOPSECRETCODE"

studentAuthRouter.use(express.json());

studentAuthRouter.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signupInput.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ 
      message: parseResult.error.issues[0].message 
    });
  }

  const body = parseResult.data;
  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user = await prisma.student.create({
      data: {
        name: body.name,
        password: hashedPassword,
        roll_num: body.roll_num,
        branch: body.branch
      },
    });

    const token = jwt.sign({ id: user.roll_num, role: user.role }, JWT_SECRET);

    return res.json({ jwt: token, roll_num: user.roll_num });

  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(409).json({ 
        message: "A student with this roll number is already registered." 
      });
    }

    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

studentAuthRouter.post('/signin', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signinInput.safeParse(req.body);
  
  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error.issues[0].message });
  }

  const { roll_num, password } = parseResult.data;

  try {
    const user = await prisma.student.findUnique({ 
      where: { roll_num: Number(roll_num) },
    });

    if (!user) {
      return res.status(403).json({ message: "No account found with this roll number" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.roll_num, role: user.role }, JWT_SECRET);

    return res.json({ jwt: token, roll_num: user.roll_num });

  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default studentAuthRouter;

import express from 'express';
import { Router, Request, Response } from 'express';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/prisma';
import bcrypt from 'bcrypt';

const studentAuthRouter = Router();
const signupInput = z.object({
  roll_num: z.number(),
  password: z.string().min(6),
  name: z.string(),
  branch: z.string()
});

const signinInput = z.object({
  roll_num: z.number(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;

const JWT_SECRET = "TOPSECRETCODE"

studentAuthRouter.use(express.json());

studentAuthRouter.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signupInput.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(411).json({ message: "Inputs not correct" });
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

    const token = jwt.sign({ 
      id: user.roll_num,
      role: user.role,
      name: user.name,
      branch: user.branch
    },
    JWT_SECRET);

    const roll_num = user.roll_num;

    return res.json({ 
      jwt: token,
      roll_num: roll_num
    });

  } catch (e) {
    console.error(e);
    return res.status(411).send('Invalid');
  }
});

studentAuthRouter.post('/signin', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signinInput.safeParse(req.body);
  
  if (!parseResult.success) {
    return res.status(411).json({ message: "Inputs not correct" });
  }

  const body = parseResult.data;

  try {
    const user = await prisma.student.findFirst({
      where: {
        roll_num: body.roll_num
      },
    });

    if (!user) {
      res.status(403);
      return res.json({
        message: "Incorrect credentials"
      })
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password)

    if (!passwordMatch) {
      return res.status(403).json( {message : 'Incorrect credentials' });
    }

    const token = jwt.sign({ 
      id: user.roll_num,
      role: user.role,
      name: user.name,
      branch: user.branch
    },
    JWT_SECRET);

    const roll_num = user.roll_num;

    return res.json({ 
      jwt: token,
      roll_num: roll_num
    });

  } catch (e) {
    console.error(e);
    return res.status(411).send('Invalid');
  }
});

export default studentAuthRouter;

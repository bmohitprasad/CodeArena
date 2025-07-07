import express from 'express';
import { Router, Request, Response } from 'express';
import z from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/prisma';

const teacherAuthRouter = Router();

const signupInput = z.object({
  password: z.string().min(6),
  name: z.string(),
  dept: z.string(),
  email: z.string().email()
});

const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;

const JWT_SECRET = "TOPSECRETCODE"

teacherAuthRouter.post('/signup', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signupInput.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(411).json({ message: "Inputs not correct" });
  }

  const body = parseResult.data;

  try {
    const user = await prisma.teacher.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email,
        dept: body.dept
      },
    });

    const token = jwt.sign({ 
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      dept: user.email
    },
    JWT_SECRET);

    const teacherId =  user.id

    return res.json({ 
      jwt: token,
      teacherId
    });

  } catch (e) {
    console.error(e);
    return res.status(411).send('Invalid');
  }
});

teacherAuthRouter.post('/signin', async (req: Request, res: Response): Promise<any> => {
  const parseResult = signinInput.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(411).json({ message: "Inputs not correct" });
  }

  const body = parseResult.data;

  try {
    const user = await prisma.teacher.findFirst({
      where: {
        email: body.email,
        password: body.password
      },
    });

    if (!user) {
      res.status(403);
      return res.json({
        message: "Incorrect credentials"
      })
    }

    const token = jwt.sign({ 
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      dept: user.dept
    },
    JWT_SECRET);

    const teacherId = user.id

    return res.json({ 
      jwt: token,
      teacherId
    });

  } catch (e) {
    console.error(e);
    return res.status(411).send('Invalid');
  }
});

export default teacherAuthRouter;

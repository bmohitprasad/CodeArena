import bcrypt from 'bcrypt';
import { Router } from 'express';
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
const JWT_SECRET = "TOPSECRETCODE";
teacherAuthRouter.post('/signup', async (req, res) => {
    const parseResult = signupInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({ message: "Inputs not correct" });
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
            dept: user.email
        }, JWT_SECRET);
        const teacherId = user.id;
        return res.json({
            jwt: token,
            teacherId
        });
    }
    catch (e) {
        console.error(e);
        return res.status(411).send('Invalid');
    }
});
teacherAuthRouter.post('/signin', async (req, res) => {
    const parseResult = signinInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({ message: "Inputs not correct" });
    }
    const body = parseResult.data;
    try {
        const user = await prisma.teacher.findFirst({
            where: {
                email: body.email
            },
        });
        if (!user) {
            res.status(403);
            return res.json({
                message: "Incorrect credentials"
            });
        }
        const passwordMatch = await bcrypt.compare(body.password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: 'Incorrect credentials' });
        }
        const token = jwt.sign({
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email,
            dept: user.dept
        }, JWT_SECRET);
        const teacherId = user.id;
        return res.json({
            jwt: token,
            teacherId
        });
    }
    catch (e) {
        console.error(e);
        return res.status(411).send('Invalid');
    }
});
export default teacherAuthRouter;

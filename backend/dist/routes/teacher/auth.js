"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../prisma/prisma");
const teacherAuthRouter = (0, express_1.Router)();
// 1. Enhanced Zod Schemas with specific messages
const signupInput = zod_1.default.object({
    password: zod_1.default.string().min(6, { message: "Password must be at least 6 characters" }),
    name: zod_1.default.string().min(2, { message: "Name is too short" }),
    dept: zod_1.default.string().min(1, { message: "Department is required" }),
    email: zod_1.default.string().email({ message: "Invalid email format" })
});
const signinInput = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email format" }),
    password: zod_1.default.string().min(6, { message: "Password must be at least 6 characters" }),
});
const JWT_SECRET = "TOPSECRETCODE";
teacherAuthRouter.post('/signup', async (req, res) => {
    const parseResult = signupInput.safeParse(req.body);
    // 2. Return specific Zod validation errors
    if (!parseResult.success) {
        return res.status(400).json({
            message: parseResult.error.issues[0].message
        });
    }
    const body = parseResult.data;
    const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
    try {
        const user = await prisma_1.prisma.teacher.create({
            data: {
                name: body.name,
                password: hashedPassword,
                email: body.email,
                dept: body.dept
            },
        });
        const token = jsonwebtoken_1.default.sign({
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
    }
    catch (e) {
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
teacherAuthRouter.post('/signin', async (req, res) => {
    const parseResult = signinInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: parseResult.error.issues[0].message
        });
    }
    const body = parseResult.data;
    try {
        const user = await prisma_1.prisma.teacher.findUnique({
            where: { email: body.email },
        });
        if (!user) {
            return res.status(403).json({
                message: "No teacher account found with this email"
            });
        }
        const passwordMatch = await bcrypt_1.default.compare(body.password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect password"
            });
        }
        const token = jsonwebtoken_1.default.sign({
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
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = teacherAuthRouter;

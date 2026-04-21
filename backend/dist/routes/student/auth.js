"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../prisma/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentAuthRouter = (0, express_2.Router)();
const signupInput = zod_1.default.object({
    roll_num: zod_1.default.coerce.number()
        .int()
        .min(100000, { message: "Roll number must be at least 6 digits" })
        .max(999999, { message: "Roll number cannot exceed 6 digits" }),
    password: zod_1.default.string().min(6, { message: "Password must be at least 6 characters long" }),
    name: zod_1.default.string().min(2, { message: "Name is too short" }),
    branch: zod_1.default.string().min(1, { message: "Branch is required" })
});
const signinInput = zod_1.default.object({
    roll_num: zod_1.default.coerce.number().int(),
    password: zod_1.default.string(),
});
const JWT_SECRET = "TOPSECRETCODE";
studentAuthRouter.use(express_1.default.json());
studentAuthRouter.post('/signup', async (req, res) => {
    const parseResult = signupInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: parseResult.error.issues[0].message
        });
    }
    const body = parseResult.data;
    const hashedPassword = await bcrypt_1.default.hash(body.password, 10);
    try {
        const user = await prisma_1.prisma.student.create({
            data: {
                name: body.name,
                password: hashedPassword,
                roll_num: body.roll_num,
                branch: body.branch
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.roll_num, role: user.role }, JWT_SECRET);
        return res.json({ jwt: token, roll_num: user.roll_num });
    }
    catch (e) {
        if (e.code === 'P2002') {
            return res.status(409).json({
                message: "A student with this roll number is already registered."
            });
        }
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
studentAuthRouter.post('/signin', async (req, res) => {
    const parseResult = signinInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ message: parseResult.error.issues[0].message });
    }
    const { roll_num, password } = parseResult.data;
    try {
        const user = await prisma_1.prisma.student.findUnique({
            where: { roll_num: Number(roll_num) },
        });
        if (!user) {
            return res.status(403).json({ message: "No account found with this roll number" });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.roll_num, role: user.role }, JWT_SECRET);
        return res.json({ jwt: token, roll_num: user.roll_num });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = studentAuthRouter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const signupInput = zod_1.default.object({
    password: zod_1.default.string().min(6),
    name: zod_1.default.string(),
    dept: zod_1.default.string(),
    email: zod_1.default.string().email()
});
const signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
const JWT_SECRET = "TOPSECRETCODE";
teacherAuthRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signupInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({ message: "Inputs not correct" });
    }
    const body = parseResult.data;
    const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
    try {
        const user = yield prisma_1.prisma.teacher.create({
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
}));
teacherAuthRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signinInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({ message: "Inputs not correct" });
    }
    const body = parseResult.data;
    try {
        const user = yield prisma_1.prisma.teacher.findFirst({
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
        const passwordMatch = yield bcrypt_1.default.compare(body.password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: 'Incorrect credentials' });
        }
        const token = jsonwebtoken_1.default.sign({
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
}));
exports.default = teacherAuthRouter;

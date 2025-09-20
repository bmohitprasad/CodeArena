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
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../prisma/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentAuthRouter = (0, express_2.Router)();
const signupInput = zod_1.default.object({
    roll_num: zod_1.default.number(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string(),
    branch: zod_1.default.string()
});
const signinInput = zod_1.default.object({
    roll_num: zod_1.default.number(),
    password: zod_1.default.string().min(6),
});
const JWT_SECRET = "TOPSECRETCODE";
studentAuthRouter.use(express_1.default.json());
studentAuthRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signupInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({ message: "Inputs not correct" });
    }
    const body = parseResult.data;
    const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
    try {
        const user = yield prisma_1.prisma.student.create({
            data: {
                name: body.name,
                password: hashedPassword,
                roll_num: body.roll_num,
                branch: body.branch
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user.roll_num,
            role: user.role,
            name: user.name,
            branch: user.branch
        }, JWT_SECRET);
        const roll_num = user.roll_num;
        return res.json({
            jwt: token,
            roll_num: roll_num
        });
    }
    catch (e) {
        console.error(e);
        return res.status(411).send('Invalid');
    }
}));
studentAuthRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = signinInput.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(411).json({ message: "Inputs not correct" });
    }
    const body = parseResult.data;
    try {
        const user = yield prisma_1.prisma.student.findFirst({
            where: {
                roll_num: body.roll_num
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
            id: user.roll_num,
            role: user.role,
            name: user.name,
            branch: user.branch
        }, JWT_SECRET);
        const roll_num = user.roll_num;
        return res.json({
            jwt: token,
            roll_num: roll_num
        });
    }
    catch (e) {
        console.error(e);
        return res.status(411).send('Invalid');
    }
}));
exports.default = studentAuthRouter;

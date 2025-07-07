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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeRunner_1 = require("../../lib/codeRunner");
const authenticate_1 = require("../../middleware/authenticate");
const prisma_1 = require("../../prisma/prisma");
const studentRouter = (0, express_1.Router)();
// Get student's joined classes
studentRouter.post('/join', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const joinCode = req.body.joinCode;
    const roll_num = req.body.roll_num;
    if (!roll_num || !joinCode) {
        return res.status(400).json({ message: "Missing studentId or joinCode" });
    }
    try {
        const foundClass = yield prisma_1.prisma.class.findUnique({
            where: { joinCode },
        });
        if (!foundClass) {
            return res.status(404).json({ message: "Class with provided join code not found" });
        }
        const existingEnrollment = yield prisma_1.prisma.enrollment.findFirst({
            where: {
                student_id: roll_num,
                class_id: foundClass.class_id,
            }
        });
        if (existingEnrollment) {
            return res.status(409).json({ message: "Already enrolled in this class" });
        }
        yield prisma_1.prisma.enrollment.create({
            data: {
                student_id: roll_num,
                class_id: foundClass.class_id,
            }
        });
        return res.status(200).json({ message: "Enrolled successfully", class: foundClass });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
}));
studentRouter.get('/:id/classes', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    try {
        const enrolledClasses = yield prisma_1.prisma.enrollment.findMany({
            where: { student_id: studentId },
            include: {
                class: {
                    include: {
                        teacher: {
                            select: {
                                name: true,
                            },
                        }
                    },
                },
            },
        });
        res.json(enrolledClasses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get assignments for a class
studentRouter.get('/class/:id/assignments', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classId = parseInt(req.params.id);
    try {
        const assignments = yield prisma_1.prisma.assignment.findMany({
            where: { classId },
            include: { problems: true },
        });
        res.json(assignments);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
studentRouter.get('/assignment/problem/:id', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problemId = parseInt(req.params.id);
        const problem = yield prisma_1.prisma.problem.findUnique({
            where: {
                id: problemId
            }
        });
        res.json(problem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch problems' });
    }
}));
studentRouter.post(':assid/problem/:id/run', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problemId = parseInt(req.params.id);
    const assignmentId = parseInt(req.params.assid);
    const studentId = req.body.studentId;
    const { code, language, input } = req.body;
    try {
        const result = yield (0, codeRunner_1.runCode)(language, code, input || "");
        res.json({ output: result.output });
    }
    catch (err) {
        res.status(500).json({ err });
    }
    try {
        yield prisma_1.prisma.problemSubmission.create({
            data: {
                assignmentId: assignmentId,
                student_id: studentId,
                isCompleted: true,
                problemId: problemId
            }
        });
        res.json({ message: "Submitted Problem" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
studentRouter.post('/assignment/:id', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = parseInt(req.params.id);
    const studentId = req.body.studentId;
    try {
        yield prisma_1.prisma.assignmentSubmission.create({
            data: {
                assignmentId: assignmentId,
                student_id: studentId,
                isCompleted: true
            }
        });
        res.json({ message: "Submitted" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
exports.default = studentRouter;

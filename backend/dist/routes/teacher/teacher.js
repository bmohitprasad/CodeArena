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
const authenticate_1 = require("../../middleware/authenticate");
const requireRole_1 = require("../../middleware/requireRole");
const prisma_1 = require("../../prisma/prisma");
const teacherRouter = (0, express_1.Router)();
teacherRouter.get('/classes', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const teacherId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const classes = yield prisma_1.prisma.class.findMany({
            where: {
                teacher_id: teacherId
            },
            include: {
                assignments: true,
                enrollments: {
                    include: {
                        student: true
                    }
                }
            }
        });
        res.json(classes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch classes' });
    }
}));
teacherRouter.post('/:id/create-class', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const teacherId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 0;
        const name = req.body.className || "";
        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newClass = yield prisma_1.prisma.class.create({
            data: {
                name,
                joinCode,
                teacher_id: teacherId,
            },
        });
        res.json(newClass);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
// Delete a class
teacherRouter.delete('/class/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = parseInt(req.params.id);
        yield prisma_1.prisma.class.delete({ where: { class_id: classId } });
        res.json({ message: 'Class deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
// Edit class name
teacherRouter.put('/class/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const classId = parseInt(req.params.id);
        const name = (_a = req.user) === null || _a === void 0 ? void 0 : _a.name;
        const updated = yield prisma_1.prisma.class.update({
            where: { class_id: classId },
            data: { name },
        });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
teacherRouter.get('/class/:id/enrolled', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = parseInt(req.params.id);
        const enrolled = yield prisma_1.prisma.enrollment.findMany({
            where: {
                class_id: classId
            },
            include: {
                student: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(enrolled);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch enrolled students' });
    }
}));
teacherRouter.get('/class/:id/assignments', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = parseInt(req.params.id);
        const assignments = yield prisma_1.prisma.assignment.findMany({
            where: {
                classId: classId
            }
        });
        res.json(assignments);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch assignments' });
    }
}));
// Create an assignment
teacherRouter.post('/class/:id/create-assignment', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classId = parseInt(req.params.id);
        const { title, description, deadline } = req.body;
        const assignment = yield prisma_1.prisma.assignment.create({
            data: {
                title,
                description,
                classId,
                deadline: new Date(deadline)
            },
        });
        res.json(assignment);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
//Delete an Assignment
teacherRouter.delete('/assignment/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignmentId = parseInt(req.params.id);
        yield prisma_1.prisma.assignment.delete({ where: { id: assignmentId } });
        res.json({ message: 'Assignment deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
teacherRouter.get('/assignment/:id', authenticate_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignmentId = parseInt(req.params.id);
        const problems = yield prisma_1.prisma.problem.findMany({
            where: {
                assignmentId: assignmentId
            }
        });
        res.json(problems);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch problems' });
    }
}));
// Add a problem to an assignment
teacherRouter.post('/assignment/:id/add-problem', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignmentId = parseInt(req.params.id);
        const { title, content, expectedOutput } = req.body;
        const problem = yield prisma_1.prisma.problem.create({
            data: {
                title,
                content,
                expectedOutput,
                assignmentId,
            },
        });
        res.json(problem);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}));
exports.default = teacherRouter;
teacherRouter.get('/submissions/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignmentId = parseInt(req.params.id);
        const submissions = yield prisma_1.prisma.assignmentSubmission.findMany({
            where: {
                assignmentId: assignmentId
            },
            include: {
                student: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(submissions);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch submissions' });
    }
}));

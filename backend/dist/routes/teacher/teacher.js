"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middleware/authenticate");
const requireRole_1 = require("../../middleware/requireRole");
const prisma_1 = require("../../prisma/prisma");
const zod_1 = require("zod");
const teacherRouter = (0, express_1.Router)();
const createProblemSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
    expectedOutput: zod_1.z.string().optional().nullable()
});
teacherRouter.get('/classes', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const teacherId = req.user?.id;
        const classes = await prisma_1.prisma.class.findMany({
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
});
teacherRouter.post('/:id/create-class', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const teacherId = req.user?.id || 0;
        const name = req.body.className || "";
        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newClass = await prisma_1.prisma.class.create({
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
});
// Delete a class
teacherRouter.delete('/class/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        await prisma_1.prisma.class.delete({ where: { class_id: classId } });
        res.json({ message: 'Class deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Edit class name
teacherRouter.put('/class/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        const name = req.user?.name;
        const updated = await prisma_1.prisma.class.update({
            where: { class_id: classId },
            data: { name },
        });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
teacherRouter.get('/class/:id/enrolled', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        const enrolled = await prisma_1.prisma.enrollment.findMany({
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
});
teacherRouter.get('/class/:id/assignments', authenticate_1.authenticate, async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        const assignments = await prisma_1.prisma.assignment.findMany({
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
});
// Create an assignment
teacherRouter.post('/class/:id/create-assignment', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const classId = parseInt(req.params.id);
        const { title, description, deadline } = req.body;
        const assignment = await prisma_1.prisma.assignment.create({
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
});
//Delete an Assignment
teacherRouter.delete('/assignment/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const assignmentId = parseInt(req.params.id);
        await prisma_1.prisma.assignment.delete({ where: { id: assignmentId } });
        res.json({ message: 'Assignment deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
teacherRouter.get('/assignment/:id', authenticate_1.authenticate, async (req, res) => {
    try {
        const assignmentId = parseInt(req.params.id);
        const problems = await prisma_1.prisma.problem.findMany({
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
});
// Add a problem to an assignment
teacherRouter.post('/assignment/:id/add-problem', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const assignmentId = Number(req.params.id);
        if (!assignmentId || Number.isNaN(assignmentId)) {
            return res.status(400).json({ error: 'Invalid assignment id' });
        }
        const parsed = createProblemSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
        }
        const { title, content, expectedOutput } = parsed.data;
        const normalizedExpected = expectedOutput && expectedOutput.trim() !== "" ? expectedOutput : null;
        // Optional: ensure assignment exists
        const assignment = await prisma_1.prisma.assignment.findUnique({ where: { id: assignmentId } });
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        const problem = await prisma_1.prisma.problem.create({
            data: {
                title,
                content,
                expectedOutput: normalizedExpected,
                assignmentId
            }
        });
        return res.status(201).json(problem);
    }
    catch (err) {
        console.error('add-problem error:', err?.code, err?.message);
        return res.status(500).json({ error: err?.message || 'Internal server error' });
    }
});
teacherRouter.get('/submissions/:id', authenticate_1.authenticate, (0, requireRole_1.requireRole)('TEACHER'), async (req, res) => {
    try {
        const assignmentId = parseInt(req.params.id);
        const submissions = await prisma_1.prisma.assignmentSubmission.findMany({
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
});
exports.default = teacherRouter;

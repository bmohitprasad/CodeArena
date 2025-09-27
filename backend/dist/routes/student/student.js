"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeRunner_1 = require("../../lib/codeRunner");
const authenticate_1 = require("../../middleware/authenticate");
const prisma_1 = require("../../prisma/prisma");
const zod_1 = __importDefault(require("zod"));
const studentRouter = (0, express_1.Router)();
const submitSchema = zod_1.default.object({
    studentId: zod_1.default.string(),
    assignmentId: zod_1.default.number().int(),
    problemId: zod_1.default.number().int(),
    language: zod_1.default.string().min(1),
    code: zod_1.default.string().min(1),
    input: zod_1.default.string().optional()
});
// Join a class
studentRouter.post('/join', authenticate_1.authenticate, async (req, res) => {
    const joinCode = req.body.joinCode;
    const roll_num = req.body.roll_num;
    if (!roll_num || !joinCode) {
        return res.status(400).json({ message: 'Missing studentId or joinCode' });
    }
    try {
        const foundClass = await prisma_1.prisma.class.findUnique({ where: { joinCode } });
        if (!foundClass) {
            return res.status(404).json({ message: 'Class with provided join code not found' });
        }
        const existingEnrollment = await prisma_1.prisma.enrollment.findFirst({
            where: { student_id: roll_num, class_id: foundClass.class_id }
        });
        if (existingEnrollment) {
            return res.status(409).json({ message: 'Already enrolled in this class' });
        }
        await prisma_1.prisma.enrollment.create({
            data: { student_id: roll_num, class_id: foundClass.class_id }
        });
        return res.status(200).json({ message: 'Enrolled successfully', class: foundClass });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});
// Get student's classes
studentRouter.get('/:id/classes', authenticate_1.authenticate, async (req, res) => {
    const studentId = req.params.id;
    try {
        const enrolledClasses = await prisma_1.prisma.enrollment.findMany({
            where: { student_id: studentId },
            include: {
                class: {
                    include: { teacher: { select: { name: true } } }
                }
            }
        });
        res.json(enrolledClasses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get assignments for a class
studentRouter.get('/class/:id/assignments', authenticate_1.authenticate, async (req, res) => {
    const classId = parseInt(req.params.id);
    try {
        const assignments = await prisma_1.prisma.assignment.findMany({
            where: { classId },
            include: { problems: true }
        });
        res.json(assignments);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Get a problem
studentRouter.get('/assignment/problem/:id', authenticate_1.authenticate, async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const problem = await prisma_1.prisma.problem.findUnique({ where: { id: problemId } });
        res.json(problem);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch problems' });
    }
});
// Run a problem (no persistence beyond ProblemSubmission mark)
studentRouter.post('/:assid/problem/:id/run', authenticate_1.authenticate, async (req, res) => {
    const problemId = parseInt(req.params.id);
    const assignmentId = parseInt(req.params.assid);
    const studentId = req.body.studentId;
    const { code, language, input } = req.body;
    try {
        const result = await (0, codeRunner_1.runCode)(language, code, input || '');
        // Respond with runner result
        res.json({ output: result.output });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
    try {
        await prisma_1.prisma.problemSubmission.create({
            data: {
                assignmentId,
                student_id: studentId,
                isCompleted: true,
                problemId
            }
        });
    }
    catch (err) {
        // Non-fatal for run; log only
        console.error('problemSubmission mark error:', err);
    }
});
// Mark assignment submitted
studentRouter.post('/assignment/:id', authenticate_1.authenticate, async (req, res) => {
    const assignmentId = parseInt(req.params.id);
    const studentId = req.body.studentId;
    try {
        await prisma_1.prisma.assignmentSubmission.create({
            data: { assignmentId, student_id: studentId, isCompleted: true }
        });
        res.json({ message: 'Submitted' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// Submit code: append-only history create
studentRouter.post('/submit-code', authenticate_1.authenticate, async (req, res) => {
    const parsed = submitSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
    }
    const { studentId, assignmentId, problemId, language, code, input } = parsed.data;
    try {
        // Validate linkage to avoid FK errors
        const [student, assignment, problem] = await Promise.all([
            prisma_1.prisma.student.findUnique({ where: { roll_num: studentId } }),
            prisma_1.prisma.assignment.findUnique({ where: { id: assignmentId } }),
            prisma_1.prisma.problem.findUnique({ where: { id: problemId } })
        ]);
        if (!student || !assignment || !problem || problem.assignmentId !== assignmentId) {
            return res.status(400).json({ error: 'Invalid student/assignment/problem linkage' });
        }
        // Append-only: create a new history row
        const created = await prisma_1.prisma.problemCodeSubmission.create({
            data: {
                student_id: studentId,
                assignmentId,
                problemId,
                language,
                code,
                stdin: input ?? null
            }
        });
        return res.status(201).json({ id: created.id, status: 'saved' });
    }
    catch (e) {
        console.error('submit-code error:', e?.code, e?.message, e);
        return res.status(500).json({ error: e?.message || 'Failed to store submission' });
    }
});
// Latest submission (derive from history)
studentRouter.get('/problem/:problemId/latest', authenticate_1.authenticate, async (req, res) => {
    const problemId = Number(req.params.problemId);
    const assignmentId = Number(req.query.assignmentId);
    const studentId = String(req.query.studentId);
    if (!problemId || !assignmentId || !studentId) {
        return res.status(400).json({ error: 'Missing ids' });
    }
    try {
        const latest = await prisma_1.prisma.problemCodeSubmission.findFirst({
            where: { student_id: studentId, assignmentId, problemId },
            orderBy: { createdAt: 'desc' },
            select: { language: true, code: true, stdin: true }
        });
        if (!latest) {
            return res.json({ language: 'python', code: "print('hello world')", stdin: '' });
        }
        return res.json(latest);
    }
    catch (e) {
        console.error('latest fetch error:', e?.code, e?.message);
        return res.status(500).json({ error: 'Failed to load latest submission' });
    }
});
// History list
studentRouter.get('/problem/:problemId/submissions', authenticate_1.authenticate, async (req, res) => {
    const problemId = Number(req.params.problemId);
    const assignmentId = Number(req.query.assignmentId);
    const studentId = String(req.query.studentId);
    if (!problemId || !assignmentId || !studentId) {
        return res.status(400).json({ error: 'Missing ids' });
    }
    try {
        const rows = await prisma_1.prisma.problemCodeSubmission.findMany({
            where: { student_id: studentId, assignmentId, problemId },
            orderBy: { createdAt: 'desc' },
            select: { id: true, language: true, code: true, stdin: true, createdAt: true }
        });
        return res.json(rows);
    }
    catch (e) {
        console.error('history error:', e?.code, e?.message);
        return res.status(500).json({ error: 'Failed to load history' });
    }
});
exports.default = studentRouter;

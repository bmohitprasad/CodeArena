import { Router, Request, Response } from 'express';
import { runCode } from '../../lib/codeRunner';
import { authenticate } from '../../middleware/authenticate';
import { prisma } from '../../prisma/prisma';
import z from 'zod';

const studentRouter = Router();

const submitSchema = z.object({
  studentId: z.number().int(),
  assignmentId: z.number().int(),
  problemId: z.number().int(),
  language: z.string().min(1),
  code: z.string().min(1),
  input: z.string().optional()
});

// Join a class
studentRouter.post('/join', authenticate, async (req: Request, res: Response): Promise<any> => {
  const joinCode = req.body.joinCode;
  const roll_num = req.body.roll_num;

  if (!roll_num || !joinCode) {
    return res.status(400).json({ message: 'Missing studentId or joinCode' });
  }

  try {
    const foundClass = await prisma.class.findUnique({ where: { joinCode } });
    if (!foundClass) {
      return res.status(404).json({ message: 'Class with provided join code not found' });
    }

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { student_id: roll_num, class_id: foundClass.class_id }
    });
    if (existingEnrollment) {
      return res.status(409).json({ message: 'Already enrolled in this class' });
    }

    await prisma.enrollment.create({
      data: { student_id: roll_num, class_id: foundClass.class_id }
    });

    return res.status(200).json({ message: 'Enrolled successfully', class: foundClass });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

// Get student's classes
studentRouter.get('/:id/classes', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const studentId = Number(req.params.id);

  try {
    const enrolledClasses = await prisma.enrollment.findMany({
      where: { student_id: studentId },
      include: {
        class: {
          include: { teacher: { select: { name: true } } }
        }
      }
    });
    res.json(enrolledClasses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get assignments for a class
studentRouter.get('/class/:id/assignments', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const classId = parseInt(req.params.id);
  try {
    const assignments = await prisma.assignment.findMany({
      where: { classId },
      include: { problems: true }
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get a problem
studentRouter.get('/assignment/problem/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const problemId = parseInt(req.params.id);
    const problem = await prisma.problem.findUnique({ where: { id: problemId } });
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch problems' });
  }
});

// Run a problem (no persistence beyond ProblemSubmission mark)
studentRouter.post('/:assid/problem/:id/run', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const problemId = parseInt(req.params.id);
  const assignmentId = parseInt(req.params.assid);
  const studentId = req.body.studentId;
  const { code, language, input } = req.body;

  try {
    const result = await runCode(language, code, input || '');
    // Respond with runner result
    res.json({ output: result.output });
  } catch (err) {
    return res.status(500).json({ err });
  }

  try {
    await prisma.problemSubmission.create({
      data: {
        assignmentId,
        student_id: studentId,
        isCompleted: true,
        problemId
      }
    });
  } catch (err) {
    // Non-fatal for run; log only
    console.error('problemSubmission mark error:', err);
  }
});

// Mark assignment submitted
studentRouter.post("/assignment/:id", authenticate, async (req: Request, res: Response) => {
    const assignmentId = Number(req.params.id);
    const studentId = Number(req.body.studentId);

    if (!assignmentId || !studentId) {
      return res.status(400).json({
        error: "assignmentId and studentId are required"
      });
    }

    try {
      await prisma.assignmentSubmission.create({
        data: {
          assignmentId,
          student_id: studentId,
          isCompleted: true
        }
      });

      return res.status(200).json({
        message: "Submitted"
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        return res.status(409).json({
          error: "Assignment already submitted"
        });
      }

      console.error("Assignment submission failed:", err);

      return res.status(500).json({
        error: "Internal server error"
      });
    }
  }
);



// strict compare
const equalStrict = (a: string, b: string) => a === b;

// relaxed: trim trailing spaces/newlines on each line
const normalizeLines = (s: string) =>
  s.replace(/\r\n/g, '\n')
   .split('\n')
   .map(line => line.replace(/\s+$/g, ''))
   .join('\n')
   .trim();
const equalNormalized = (a: string, b: string) => normalizeLines(a) === normalizeLines(b);


studentRouter.post('/submit-code', authenticate, async (req, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });

  const { studentId, assignmentId, problemId, language, code, input } = parsed.data;

  // Load entities
  const [student, assignment, problem] = await Promise.all([
    prisma.student.findUnique({ where: { roll_num: Number(studentId) } }),
    prisma.assignment.findUnique({ where: { id: assignmentId } }),
    prisma.problem.findUnique({ where: { id: problemId } })
  ]);
  if (!student || !assignment || !problem || problem.assignmentId !== assignmentId) {
    return res.status(400).json({ error: 'Invalid student/assignment/problem linkage' });
  }

  // Persist only when matched
  const created = await prisma.problemCodeSubmission.create({
    data: {
      student_id: Number(studentId),
      assignmentId,
      problemId,
      language,
      code,
      stdin: input ?? null
    }
  });

  return res.status(201).json({ id: created.id, status: 'saved' });
});

// Latest submission (derive from history)
studentRouter.get('/problem/:problemId/latest', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const problemId = Number(req.params.problemId);
  const assignmentId = Number(req.query.assignmentId);
  const studentId = Number(req.query.studentId);

  if (!problemId || !assignmentId || !studentId) {
    return res.status(400).json({ error: 'Missing ids' });
  }

  try {
    const latest = await prisma.problemCodeSubmission.findFirst({
      where: { student_id: studentId, assignmentId, problemId },
      orderBy: { createdAt: 'desc' },
      select: { language: true, code: true, stdin: true }
    });

    if (!latest) {
      return res.json({ language: 'python', code: "print('hello world')", stdin: '' });
    }
    return res.json(latest);
  } catch (e: any) {
    console.error('latest fetch error:', e?.code, e?.message);
    return res.status(500).json({ error: 'Failed to load latest submission' });
  }
});

// History list
studentRouter.get('/problem/:problemId/submissions', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const problemId = Number(req.params.problemId);
  const assignmentId = Number(req.query.assignmentId);
  const studentId = Number(req.query.studentId);

  if (!problemId || !assignmentId || !studentId) {
    return res.status(400).json({ error: 'Missing ids' });
  }

  try {
    const rows = await prisma.problemCodeSubmission.findMany({
      where: { student_id: studentId, assignmentId, problemId },
      orderBy: { createdAt: 'desc' },
      select: { id: true, language: true, code: true, stdin: true, createdAt: true }
    });
    return res.json(rows);
  } catch (e: any) {
    console.error('history error:', e?.code, e?.message);
    return res.status(500).json({ error: 'Failed to load history' });
  }
});

studentRouter.get('/assignment/:assignmentId/problem-status', authenticate, async (req, res) => {
  const assignmentId = Number(req.params.assignmentId);
  const studentId = Number(req.query.studentId);
  if (!assignmentId || !studentId) {
    return res.status(400).json({ error: 'Missing ids' });
  }

  // Find all problem IDs in this assignment
  const problems = await prisma.problem.findMany({
    where: { assignmentId },
    select: { id: true }
  });

  const problemIds = problems.map(p => p.id);
  if (problemIds.length === 0) {
    return res.json({ status: [] });
  }

  // Any submission history counts as submitted
  const submissions = await prisma.problemCodeSubmission.findMany({
    where: {
      assignmentId,
      student_id: studentId,
      problemId: { in: problemIds }
    },
    select: { problemId: true },
    distinct: ['problemId']
  });

  const set = new Set(submissions.map(s => s.problemId));
  const status = problemIds.map(pid => ({ problemId: pid, isSubmitted: set.has(pid) }));

  return res.json({ status });
});

export default studentRouter;

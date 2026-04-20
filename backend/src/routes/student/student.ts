import { Router, Request, Response } from 'express';
import { runCode } from '../../lib/codeRunner';
import { authenticate } from '../../middleware/authenticate';
import { prisma } from '../../prisma/prisma';
import z from 'zod';
import bcrypt from 'bcrypt';

const studentRouter = Router();

const updateStudentSchema = z.object({
  name: z.string().optional(),
  branch: z.string().optional(),
  password: z.string().optional()
});

const submitSchema = z.object({
  assignmentId: z.number().int(),
  problemId: z.number().int(),
  language: z.string().min(1),
  code: z.string().min(1),
  input: z.string().optional()
});

const publicRunSchema = z.object({
  language: z.string().min(1),
  code: z.string().min(1, "Code cannot be empty"),
  input: z.string().optional()
});

// Join a class
studentRouter.post('/join', authenticate, async (req: Request, res: Response): Promise<any> => {
  const joinCode = req.body.joinCode;
  const roll_num = (req as any).user.id;

  if (!joinCode) {
    return res.status(400).json({ message: 'Missing joinCode' });
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
// Note: :id is kept in route for compatibility but ignored; source of truth is the token.
studentRouter.get('/:id/classes', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const studentId = (req as any).user.id;

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


// Run a problem
studentRouter.post('/:assid/problem/:id/run', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const problemId = parseInt(req.params.id);
  const assignmentId = parseInt(req.params.assid);
  const studentId = (req as any).user.id;
  const { code, language, input } = req.body;

  try {
    const result = await runCode(language, code, input || '');

    const isExecutionError = result.output.includes('Build failed') || result.output.includes('Error:');

    if (!isExecutionError) {
      try {
        await prisma.problemSubmission.create({
          data: {
            assignmentId,
            student_id: Number(studentId),
            isCompleted: true,
            problemId
          }
        });
      } catch (err) {
        console.error('problemSubmission mark error:', err);
      }
    }

    return res.status(isExecutionError ? 422 : 200).json({
      output: result.output,
      success: !isExecutionError
    });
  } catch (err: any) {
    return res.status(500).json({ 
      error: 'Execution failed',
      details: err.message || 'Unknown error occurred in code runner'
    });
  }
});

// Mark assignment submitted
studentRouter.post("/assignment/:id", authenticate, async (req: Request, res: Response) => {
    const assignmentId = Number(req.params.id);
    const studentId = (req as any).user.id;

    if (!assignmentId) {
      return res.status(400).json({
        error: "assignmentId is required"
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

studentRouter.post('/submit-code', authenticate, async (req, res) => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });

  const studentId = (req as any).user.id;
  const { assignmentId, problemId, language, code, input } = parsed.data;

  // Load entities
  const [student, assignment, problem] = await Promise.all([
    prisma.student.findUnique({ where: { roll_num: Number(studentId) } }),
    prisma.assignment.findUnique({ where: { id: assignmentId } }),
    prisma.problem.findUnique({ where: { id: problemId } })
  ]);
  if (!student || !assignment || !problem || problem.assignmentId !== assignmentId) {
    return res.status(400).json({ error: 'Invalid student/assignment/problem linkage' });
  }

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

studentRouter.get('/problem/:problemId/latest', authenticate, async (req: Request, res: Response): Promise<any>  => {
  const problemId = Number(req.params.problemId);
  const assignmentId = Number(req.query.assignmentId);
  const studentId = (req as any).user.id;

  if (!problemId || !assignmentId) {
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
  const studentId = (req as any).user.id;

  if (!problemId || !assignmentId) {
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
  const studentId = (req as any).user.id;
  if (!assignmentId) {
    return res.status(400).json({ error: 'Missing assignmentId' });
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

studentRouter.get('/profile', authenticate, async (req: Request, res: Response): Promise<any> => {
  try {
    const roll_num = Number((req as any).user.id); 
    const student = await prisma.student.findUnique({
      where: { roll_num },
      select: { roll_num: true, name: true, branch: true }
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    return res.json({ student });
  } catch (e: any) {
    console.error("Profile fetch error:", e);
    return res.status(500).json({ error: "Internal Server Error", details: e.message });
  }
});

// UPDATE Profile
studentRouter.post('/profile/update', authenticate, async (req: Request, res: Response): Promise<any> => {
  const parsed = updateStudentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });

  const roll_num = (req as any).user.id;
  const { name, branch, password } = parsed.data;

  try {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (branch) updateData.branch = branch;
    if (password?.trim()) updateData.password = await bcrypt.hash(password, 10);

    const updatedStudent = await prisma.student.update({
      where: { roll_num: Number(roll_num) },
      data: updateData,
      select: { roll_num: true, name: true, branch: true }
    });

    return res.status(200).json({ message: 'Profile updated', student: updatedStudent });
  } catch (err: any) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
});

export default studentRouter;
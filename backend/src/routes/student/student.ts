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



// Get student's joined classes

studentRouter.post('/join', authenticate, async (req: Request, res: Response): Promise<any> =>{
  const joinCode  = req.body.joinCode;
  const roll_num  = req.body.roll_num;

  if (!roll_num || !joinCode) {
    return res.status(400).json({ message: "Missing studentId or joinCode" });
  }

  try {
    const foundClass = await prisma.class.findUnique({
      where: { joinCode },
    });

    if (!foundClass) {
      return res.status(404).json({ message: "Class with provided join code not found" });
    }

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        student_id: roll_num,
        class_id: foundClass.class_id,
      }
    });

    if (existingEnrollment) {
      return res.status(409).json({ message: "Already enrolled in this class" });
    }

    await prisma.enrollment.create({
      data: {
        student_id: roll_num,
        class_id: foundClass.class_id,
      }
    });

    return res.status(200).json({ message: "Enrolled successfully", class: foundClass });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
})

studentRouter.get('/:id/classes', authenticate, async (req: Request, res: Response): Promise<any> => {
  const studentId = parseInt(req.params.id);

  try {
    const enrolledClasses = await prisma.enrollment.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get assignments for a class
studentRouter.get('/class/:id/assignments', authenticate, async (req: Request, res: Response): Promise<any> => {
  const classId = parseInt(req.params.id);
  try {
    const assignments = await prisma.assignment.findMany({
      where: { classId },
      include: { problems: true },
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


studentRouter.get('/assignment/problem/:id', authenticate, async (req: Request, res: Response): Promise<any> => {
    try {
      const problemId = parseInt(req.params.id);

      const problem = await prisma.problem.findUnique({
        where: {
          id: problemId
        }
      });
      
      res.json(problem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch problems' });
    }
}); 

studentRouter.post(':assid/problem/:id/run', authenticate, async (req: Request, res: Response): Promise<any> => {
  const problemId = parseInt(req.params.id);
  const assignmentId = parseInt(req.params.assid);
  const studentId = req.body.studentId
  const { code, language, input } = req.body;

  try {
    const result = await runCode(language, code, input || "");
    res.json({ output: result.output });
  } catch (err) {
    res.status(500).json({ err });
  }

  try {
    await prisma.problemSubmission.create({
      data: { 
        assignmentId: assignmentId,
        student_id: studentId,
        isCompleted: true,
        problemId: problemId
      }
    });

    res.json({message: "Submitted Problem"});

  } catch (err) {
    res.status(500).json({ error: err });
  }
  
});

studentRouter.post('/assignment/:id', authenticate, async (req: Request, res: Response): Promise<any> => {
  const assignmentId = parseInt(req.params.id);
  const studentId = req.body.studentId

  try {
    await prisma.assignmentSubmission.create({
      data: { 
        assignmentId: assignmentId,
        student_id: studentId,
        isCompleted: true
      }
    });

    res.json({message: "Submitted"});

  } catch (err) {
    res.status(500).json({ error: err });
  }
});

studentRouter.post('/submit-code', authenticate, async (req: Request, res: Response): Promise<any> => {
  const parsed = submitSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
  }

  const { studentId, assignmentId, problemId, language, code, input } = parsed.data;

  try {
    // Validate FK linkage to prevent constraint errors
    const [student, assignment, problem] = await Promise.all([
      prisma.student.findUnique({ where: { roll_num: studentId } }),
      prisma.assignment.findUnique({ where: { id: assignmentId } }),
      prisma.problem.findUnique({ where: { id: problemId } })
    ]);

    if (!student || !assignment || !problem || problem.assignmentId !== assignmentId) {
      return res.status(400).json({ error: 'Invalid student/assignment/problem linkage' });
    }

    // Single write: upsert latest-only row
    const latest = await prisma.problemCodeSubmission.upsert({
      where: {
        student_id_assignmentId_problemId: {
          student_id: studentId,
          assignmentId,
          problemId
        }
      },
      update: {
        language,
        code,
        stdin: input ?? null
      },
      create: {
        student_id: studentId,
        assignmentId,
        problemId,
        language,
        code,
        stdin: input ?? null
      }
    });

    return res.status(201).json({ id: latest.id, status: 'saved' });
  } catch (e: any) {
    console.error('submit-code error:', e?.code, e?.message, e);
    return res.status(500).json({ error: e?.message || 'Failed to store submission' });
  }
});

studentRouter.get('/problem/:problemId/latest', authenticate, async (req: Request, res: Response): Promise<any> => {
  const problemId = Number(req.params.problemId);
  const assignmentId = Number(req.query.assignmentId);
  const studentId = Number(req.query.studentId);

  if (!problemId || !assignmentId || !studentId) {
    return res.status(400).json({ error: 'Missing ids' });
  }

  try {
    const latest = await prisma.problemCodeSubmission.findUnique({
      where: {
        student_id_assignmentId_problemId: {
          student_id: studentId,
          assignmentId,
          problemId
        }
      },
      select: { language: true, code: true, stdin: true }
    });

    if (!latest) {
      return res.json({
        language: 'python',
        code: "print('hello world')",
        stdin: ''
      });
    }
    return res.json(latest);
  } catch (e: any) {
    console.error('latest fetch error:', e?.code, e?.message);
    return res.status(500).json({ error: 'Failed to load latest submission' });
  }
});

studentRouter.get('/problem/:problemId/submissions', authenticate, async (req: Request, res: Response): Promise<any> => {
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

export default studentRouter;

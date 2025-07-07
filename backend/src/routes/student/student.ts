import { Router, Request, Response } from 'express';
import { runCode } from '../../lib/codeRunner';
import { authenticate } from '../../middleware/authenticate';
import { prisma } from '../../prisma/prisma';

const studentRouter = Router();

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


export default studentRouter;

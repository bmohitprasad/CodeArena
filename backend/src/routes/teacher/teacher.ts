import { Router, Request, Response } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { requireRole } from '../../middleware/requireRole';
import { prisma } from '../../prisma/prisma';

const teacherRouter = Router()

teacherRouter.get('/classes', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
  try {
    const teacherId = req.user?.id;

    const classes = await prisma.class.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch classes' });
  }
});

teacherRouter.post('/:id/create-class', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
  try {
    const teacherId = req.user?.id || 0;
    const name = req.body.className || "";
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
    const newClass = await prisma.class.create({
      data: {
        name,
        joinCode,
        teacher_id: teacherId,
      },
    });
  
    res.json(newClass);
    } catch (err) {
      res.status(500).json({ error: err});
    }
});
  
  // Delete a class
teacherRouter.delete('/class/:id', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
  try {
    const classId = parseInt(req.params.id);
    await prisma.class.delete({ where: { class_id: classId } });
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
  
  // Edit class name
teacherRouter.put('/class/:id', authenticate, requireRole('TEACHER'), async (req, res) => {
  try {
    const classId = parseInt(req.params.id);
    const name  = req.user?.name;
 
    const updated = await prisma.class.update({
      where: { class_id: classId },
      data: { name },
    });
 
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

teacherRouter.get('/class/:id/enrolled', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
  try {
    const classId = parseInt(req.params.id);

    const enrolled = await prisma.enrollment.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch enrolled students' });
  }
});
  
teacherRouter.get('/class/:id/assignments', authenticate, async (req: Request, res: Response): Promise<any> => {
    try {
      const classId = parseInt(req.params.id);

      const assignments = await prisma.assignment.findMany({
        where: {
          classId: classId
        }
      });
      
      res.json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch assignments' });
    }
});

  // Create an assignment
teacherRouter.post('/class/:id/create-assignment', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
    try {
      const classId = parseInt(req.params.id);
      const { title, description, deadline } = req.body;
  
      const assignment = await prisma.assignment.create({
        data: {
          title,
          description,
          classId,
          deadline: new Date(deadline)
        },
      });
  
      res.json(assignment);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

//Delete an Assignment
teacherRouter.delete('/assignment/:id', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
  try {
    const assignmentId = parseInt(req.params.id);
    await prisma.assignment.delete({ where: { id: assignmentId } });
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
  

teacherRouter.get('/assignment/:id', authenticate, async (req: Request, res: Response): Promise<any> => {
    try {
      const assignmentId = parseInt(req.params.id);

      const problems = await prisma.problem.findMany({
        where: {
          assignmentId: assignmentId
        }
      });
      
      res.json(problems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch problems' });
    }
}); 

  // Add a problem to an assignment
teacherRouter.post('/assignment/:id/add-problem', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
    try {
      const assignmentId = parseInt(req.params.id);
      const { title, content, expectedOutput } = req.body;
  
      const problem = await prisma.problem.create({
        data: {
          title,
          content,
          expectedOutput,
          assignmentId,
        },
      });
  
      res.json(problem);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  
export default teacherRouter;

teacherRouter.get('/submissions/:id', authenticate, requireRole('TEACHER'), async (req: Request, res: Response): Promise<any> => {
  try {
    const assignmentId = parseInt(req.params.id);

    const submissions = await prisma.assignmentSubmission.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch submissions' });
  }
});
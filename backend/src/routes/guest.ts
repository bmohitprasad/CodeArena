import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/prisma';

const guestRouter = Router();

const GUEST_PROBLEMS = [
  {
    title: "Hello World",
    description: "Write a program that prints 'Hello World'",
    content: "Write a program that prints 'Hello World'",
    expectedOutput: "Hello World",
    difficulty: "Beginner"
  },
  {
    title: "Sum of Two Numbers",
    description: "Read two numbers and print their sum",
    content: "Read two numbers from input and print their sum. Each number is on a separate line.",
    expectedOutput: "15",
    difficulty: "Beginner"
  },
  {
    title: "Factorial Calculation",
    description: "Calculate factorial of a given number",
    content: "Read a number from input and print its factorial. For example, factorial of 5 is 120.",
    expectedOutput: "120",
    difficulty: "Intermediate"
  }
];

guestRouter.post('/seed', async (req: Request, res: Response): Promise<any> => {
  try {
    const count = await prisma.guestProblem.count();
    
    if (count > 0) {
      return res.status(200).json({ message: 'Guest problems already seeded', count });
    }

    const created = await prisma.guestProblem.createMany({
      data: GUEST_PROBLEMS,
      skipDuplicates: true,
    });

    return res.status(201).json({ message: 'Guest problems seeded successfully', created: created.count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

guestRouter.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const problems = await prisma.guestProblem.findMany();
    
    if (problems.length === 0) {
      await prisma.guestProblem.createMany({
        data: GUEST_PROBLEMS,
      });
      const seededProblems = await prisma.guestProblem.findMany();
      return res.status(200).json(seededProblems);
    }

    return res.status(200).json(problems);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

guestRouter.get('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const problemId = parseInt(req.params.id);
    const problem = await prisma.guestProblem.findUnique({
      where: { id: problemId }
    });

    if (!problem) {
      return res.status(404).json({ message: 'Guest problem not found' });
    }

    return res.status(200).json(problem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

export default guestRouter;

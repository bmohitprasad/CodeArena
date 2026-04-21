"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma/prisma");
const guestRouter = (0, express_1.Router)();
// Guest problems data
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
        expectedOutput: "The sum of the two numbers",
        difficulty: "Beginner"
    },
    {
        title: "Factorial Calculation",
        description: "Calculate factorial of a given number",
        content: "Read a number from input and print its factorial. For example, factorial of 5 is 120.",
        expectedOutput: "The factorial of the number",
        difficulty: "Intermediate"
    }
];
// Seed guest problems (create if they don't exist)
guestRouter.post('/seed', async (req, res) => {
    try {
        const count = await prisma_1.prisma.guestProblem.count();
        if (count > 0) {
            return res.status(200).json({ message: 'Guest problems already seeded', count });
        }
        // Create guest problems
        const created = await prisma_1.prisma.guestProblem.createMany({
            data: GUEST_PROBLEMS,
            skipDuplicates: true,
        });
        return res.status(201).json({ message: 'Guest problems seeded successfully', created: created.count });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});
// Get all guest problems
guestRouter.get('/', async (req, res) => {
    try {
        const problems = await prisma_1.prisma.guestProblem.findMany();
        // If no problems exist, seed them
        if (problems.length === 0) {
            await prisma_1.prisma.guestProblem.createMany({
                data: GUEST_PROBLEMS,
            });
            const seededProblems = await prisma_1.prisma.guestProblem.findMany();
            return res.status(200).json(seededProblems);
        }
        return res.status(200).json(problems);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});
// Get a single guest problem
guestRouter.get('/:id', async (req, res) => {
    try {
        const problemId = parseInt(req.params.id);
        const problem = await prisma_1.prisma.guestProblem.findUnique({
            where: { id: problemId }
        });
        if (!problem) {
            return res.status(404).json({ message: 'Guest problem not found' });
        }
        return res.status(200).json(problem);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
});
exports.default = guestRouter;

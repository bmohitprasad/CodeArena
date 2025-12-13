import express, { Request, Response } from "express";

const router = express.Router();

/**
 * GitHub Actions → Backend callback
 */
router.post("/callback", (req: Request, res: Response) => {
  const token = req.headers["x-exec-token"];

  if (token !== process.env.EXEC_CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { output } = req.body;

  console.log("Execution result:\n", output);

  // Map executionId → output

  return res.json({ ok: true });
});

export default router;

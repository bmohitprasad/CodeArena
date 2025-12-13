import express, { Request, Response } from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.post("/callback", (req: Request, res: Response) => {
  const token = req.headers["x-exec-token"];

  if (token !== process.env.EXEC_CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { executionId, output } = req.body;

  if (!executionId) {
    return res.status(400).json({ error: "Missing executionId" });
  }

  executionStore.set(executionId, {
    status: "DONE",
    output: output ?? ""
  });

  console.log("Execution result:", output);

  return res.json({ ok: true });
});

export default router;

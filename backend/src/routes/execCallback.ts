// src/routes/execCallback.ts

import express, { Request, Response } from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.post("/callback", (req: Request, res: Response) => {
  if (req.headers["x-exec-token"] !== process.env.EXEC_CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { execution_id, output } = req.body;

  if (!execution_id) {
    return res.status(400).json({ error: "Missing execution_id" });
  }

  executionStore.complete(execution_id, output || "");

  res.json({ ok: true });
});

export default router;

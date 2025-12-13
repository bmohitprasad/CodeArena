// src/routes/execCallback.ts

import express, { Request, Response } from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.post("/callback", (req: Request, res: Response) => {
  const token = req.headers["x-exec-token"];

  if (token !== process.env.EXEC_CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Force string coercion (VERY IMPORTANT)
  const execution_id = String(req.body?.execution_id || "");
  const output = typeof req.body?.output === "string"
    ? req.body.output
    : JSON.stringify(req.body?.output ?? "");

  if (!execution_id) {
    return res.status(400).json({ error: "Missing execution_id" });
  }

  executionStore.complete(execution_id, output);

  return res.json({ ok: true });
});

export default router;

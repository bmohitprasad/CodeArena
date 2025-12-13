import express, { Request, Response } from "express";
import { executionStore } from "../lib/executionStore";
import { Buffer } from "buffer";


const router = express.Router();

router.post("/callback", (req, res) => {
  if (req.headers["x-exec-token"] !== process.env.EXEC_CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { execution_id, output_b64 } = req.body;

  if (!execution_id || !output_b64) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const output = Buffer.from(output_b64, "base64").toString("utf8");

  executionStore.complete(execution_id, output);

  res.json({ ok: true });
});

export default router;

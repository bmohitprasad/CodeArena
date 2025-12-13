// src/routes/run-code.ts

import express, { Request, Response } from "express";
import { randomUUID } from "crypto";
import { Buffer } from "buffer";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.post("/run-code", async (req: Request, res: Response) => {
  const { code, language, input = "" } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language required" });
  }

  const executionId = randomUUID();

  executionStore.create(executionId);
  executionStore.setRunning(executionId);

  const code_b64 = Buffer.from(code, "utf8").toString("base64");
  const input_b64 = Buffer.from(input, "utf8").toString("base64");

  try {
    const ghRes = await fetch(
      "https://api.github.com/repos/bmohitprasad/codeExecuter/actions/workflows/run-code.yml/dispatches",
      {
        method: "POST",
        headers: {
          Authorization: `token ${process.env.GITHUB_EXECUTOR_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ref: "main",
          inputs: {
            execution_id: executionId,
            language,
            code_b64,
            input_b64,
            callback_url: "https://codearena-9051.onrender.com/api/v1/exec/callback",
            token: process.env.EXEC_CALLBACK_SECRET
          }
        })
      }
    );

    if (!ghRes.ok) {
      const text = await ghRes.text();
      executionStore.fail(executionId, text);
      return res.status(500).json({ error: "Dispatch failed" });
    }

    return res.json({ executionId, status: "QUEUED" });
  } catch (err: any) {
    executionStore.fail(executionId, err.message);
    return res.status(500).json({ error: "Execution service unavailable" });
  }
});

export default router;

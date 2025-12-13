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
          language,
          code,
          input: input || "",
          callback_url: "https://codearena-9051.onrender.com/api/exec/callback",
          token: process.env.EXEC_CALLBACK_SECRET
        }
      })
    }
  );

  if (!ghRes.ok) {
    const text = await ghRes.text();
    throw new Error(text);
  }

  res.json({ status: "queued" });

});

export default router;

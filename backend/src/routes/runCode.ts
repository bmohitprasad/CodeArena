import express, { Request, Response } from "express";
import { randomUUID } from "crypto";
import { executionStore } from "../lib/executionStore";

const codeRouter = express.Router();

codeRouter.post("/run-code", async (req: Request, res: Response) => {
  const { code, language, input = "" } = req.body;

  if (!code || !language) {
    return res.status(400).json({
      error: "Code and language are required"
    });
  }

  const executionId = randomUUID();

  // mark execution as running
  executionStore.set(executionId, { status: "RUNNING" });

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
            code,
            input,
            callback_url:
              "https://codearena-9051.onrender.com/api/v1/exec/callback",
            token: process.env.EXEC_CALLBACK_SECRET
          }
        })
      }
    );

    if (!ghRes.ok) {
      const text = await ghRes.text();
      console.error("GitHub dispatch failed:", text);
      executionStore.delete(executionId);
      return res.status(500).json({ error: "Failed to queue execution" });
    }

    return res.json({
      executionId,
      status: "queued"
    });
  } catch (err) {
    console.error(err);
    executionStore.delete(executionId);
    return res.status(500).json({
      error: "Execution service unavailable"
    });
  }
});

export default codeRouter;

import express, { Request, Response } from 'express';
import { runCode } from '../lib/codeRunner'

const codeRouter = express.Router()

// codeRouter.post('/run-code', async (req: Request, res: Response): Promise<void> => {
//   const { code, language, input = '' } = req.body;

//   if (!code || !language) {
//     res.status(400).json({ error: 'Code and language are required.' });
//     return;
//   }

//   try {
//     const result = await runCode(language, code, input);
//     res.status(200).json({ output: result.output });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message || 'Failed to run code.' });
//   }
// });

codeRouter.post("/run-code", async (req: Request, res: Response) => {
  const { code, language, input = "" } = req.body;

  if (!code || !language) {
    return res.status(400).json({
      error: "Code and language are required."
    });
  }

  try {
    const ghRes = await fetch(
      "https://api.github.com/repos/bmohitprasad/codearena-executor/actions/workflows/run-code.yml/dispatches",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_EXECUTOR_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ref: "main",
          inputs: {
            language,
            code,
            input,
            callback_url:
              "https://codearena-9051.onrender.com/api/exec/callback",
            token: process.env.EXEC_CALLBACK_SECRET
          }
        })
      }
    );

    if (!ghRes.ok) {
      const text = await ghRes.text();
      console.error("GitHub dispatch failed:", text);
      return res.status(500).json({
        error: "Failed to queue execution"
      });
    }

    // IMPORTANT: return immediately
    return res.json({
      status: "queued"
    });

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      error: "Execution service unavailable"
    });
  }
});


export default codeRouter
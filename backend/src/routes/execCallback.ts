import express from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.post("/callback", (req, res) => {
  if (req.headers["x-exec-token"] !== process.env.EXEC_CALLBACK_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { execution_id, output } = req.body;
  executionStore.complete(execution_id, output || "");
  res.json({ ok: true });
});

export default router;

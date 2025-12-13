// src/routes/executionStatus.ts

import express from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.get("/status/:id", (req, res) => {
  const exec = executionStore.get(req.params.id);
  if (!exec) return res.status(404).json({ error: "Not found" });
  res.json(exec);
});

export default router;

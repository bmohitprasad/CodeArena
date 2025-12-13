import express from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.get("/result/:id", (req, res) => {
  const result = executionStore.get(req.params.id);
  if (!result) return res.status(404).json({ error: "Not found" });
  res.json(result);
});

export default router;

import express, { Request, Response } from "express";
import { executionStore } from "../lib/executionStore";

const router = express.Router();

router.get("/result/:executionId", (req: Request, res: Response) => {
  const result = executionStore.get(req.params.executionId);

  if (!result) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json(result);
});

export default router;

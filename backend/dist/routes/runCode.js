"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const buffer_1 = require("buffer");
const executionStore_1 = require("../lib/executionStore");
const router = express_1.default.Router();
router.post("/run-code", async (req, res) => {
    const { code, language, input = "" } = req.body;
    if (!code || !language) {
        return res.status(400).json({ error: "Code and language required" });
    }
    const executionId = (0, crypto_1.randomUUID)();
    executionStore_1.executionStore.create(executionId);
    executionStore_1.executionStore.setRunning(executionId);
    const code_b64 = buffer_1.Buffer.from(code, "utf8").toString("base64");
    const input_b64 = buffer_1.Buffer.from(input, "utf8").toString("base64");
    const ghRes = await fetch("https://api.github.com/repos/bmohitprasad/codeExecuter/actions/workflows/run-code.yml/dispatches", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_EXECUTOR_TOKEN}`,
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
    });
    if (!ghRes.ok) {
        const text = await ghRes.text();
        executionStore_1.executionStore.fail(executionId, text);
        return res.status(500).json({ error: "Dispatch failed" });
    }
    res.json({ executionId, status: "QUEUED" });
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const executionStore_1 = require("../lib/executionStore");
const buffer_1 = require("buffer");
const router = express_1.default.Router();
router.post("/callback", (req, res) => {
    if (req.headers["x-exec-token"] !== process.env.EXEC_CALLBACK_SECRET) {
        return res.status(403).json({ error: "Forbidden" });
    }
    const { execution_id, output_b64 } = req.body;
    if (!execution_id || !output_b64) {
        return res.status(400).json({ error: "Invalid payload" });
    }
    const output = buffer_1.Buffer.from(output_b64, "base64").toString("utf8");
    executionStore_1.executionStore.complete(execution_id, output);
    res.json({ ok: true });
});
exports.default = router;

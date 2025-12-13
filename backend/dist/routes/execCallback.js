"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * GitHub Actions → Backend callback
 */
router.post("/callback", (req, res) => {
    const token = req.headers["x-exec-token"];
    if (token !== process.env.EXEC_CALLBACK_SECRET) {
        return res.status(403).json({ error: "Forbidden" });
    }
    const { output } = req.body;
    console.log("Execution result:\n", output);
    // Map executionId → output
    return res.json({ ok: true });
});
exports.default = router;

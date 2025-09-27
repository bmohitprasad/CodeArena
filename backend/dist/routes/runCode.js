"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeRunner_1 = require("../lib/codeRunner");
const codeRouter = express_1.default.Router();
codeRouter.post('/run-code', async (req, res) => {
    const { code, language, input = '' } = req.body;
    if (!code || !language) {
        res.status(400).json({ error: 'Code and language are required.' });
        return;
    }
    try {
        const result = await (0, codeRunner_1.runCode)(language, code, input);
        res.status(200).json({ output: result.output });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to run code.' });
    }
});
exports.default = codeRouter;

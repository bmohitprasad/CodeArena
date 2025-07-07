"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeRunner_1 = require("../lib/codeRunner");
const codeRouter = express_1.default.Router();
codeRouter.post('/run-code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language, input = '' } = req.body;
    if (!code || !language) {
        res.status(400).json({ error: 'Code and language are required.' });
        return;
    }
    try {
        const result = yield (0, codeRunner_1.runCode)(language, code, input);
        res.status(200).json({ output: result.output });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to run code.' });
    }
}));
exports.default = codeRouter;

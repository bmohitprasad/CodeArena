import express from 'express';
import { runCode } from '../lib/codeRunner';
const codeRouter = express.Router();
codeRouter.post('/run-code', async (req, res) => {
    const { code, language, input = '' } = req.body;
    if (!code || !language) {
        res.status(400).json({ error: 'Code and language are required.' });
        return;
    }
    try {
        const result = await runCode(language, code, input);
        res.status(200).json({ output: result.output });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to run code.' });
    }
});
export default codeRouter;

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
exports.callLLMToParseQuestions = callLLMToParseQuestions;
// src/services/llmQuestions.ts
const zod_1 = __importDefault(require("zod"));
// TODO: wire your real LLM client here
function llmComplete(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        // Example with OpenAI Responses API:
        // const r = await openai.chat.completions.create({ model: 'gpt-4o-mini', messages: [{role:'user', content: prompt}] });
        // return { text: r.choices[0].message.content ?? '' };
        return { text: "" }; // placeholder: returns empty so fallback will run if LLM not configured
    });
}
const llmProblemSchema = zod_1.default.object({
    problems: zod_1.default.array(zod_1.default.object({
        title: zod_1.default.string(),
        content: zod_1.default.string(),
        expectedOutput: zod_1.default.string().optional().nullable()
    }))
});
function safeJson(s) {
    try {
        return JSON.parse(s);
    }
    catch (_a) {
        return null;
    }
}
function callLLMToParseQuestions(rawText) {
    return __awaiter(this, void 0, void 0, function* () {
        const basePrompt = `
Return ONLY valid JSON matching exactly:
{
  "problems": [
    { "title": string, "content": string, "expectedOutput": string | null }
  ]
}
Rules:
- No prose or code fences, JSON only.
- Keep any code blocks/examples inside 'content'.
- If expected output isn't present, set expectedOutput to null.
Text:
${rawText}
`.trim();
        const first = yield llmComplete(basePrompt);
        let obj = safeJson(first.text || "");
        let parsed = obj ? llmProblemSchema.safeParse(obj) : null;
        if (!parsed || !parsed.success) {
            const repairPrompt = `
Previous output invalid. Return ONLY valid JSON matching:
{
  "problems": [
    { "title": string, "content": string, "expectedOutput": string | null }
  ]
}
Do not include any explanation.
Text:
${rawText}
`.trim();
            const repaired = yield llmComplete(repairPrompt);
            obj = safeJson(repaired.text || "");
            parsed = obj ? llmProblemSchema.safeParse(obj) : null;
        }
        if (parsed && parsed.success)
            return parsed.data;
        // Heuristic fallback: split by Q1/Q2 headings; if none, split by double newlines
        const blocks = rawText.split(/\n(?=Q(?:uestion)?\s*\d+[:.)]\s*)/i).filter(Boolean) ||
            rawText.split(/\n{2,}/).filter(Boolean);
        const problems = blocks.map((c, idx) => {
            const lines = c.split('\n').map(s => s.trim()).filter(Boolean);
            const head = lines[0] || `Question ${idx + 1}`;
            const title = head.replace(/^Q(?:uestion)?\s*\d+[:.)]\s*/i, '').trim() || `Question ${idx + 1}`;
            const content = lines.slice(1).join('\n').trim() || c.trim();
            return { title, content, expectedOutput: null };
        });
        return { problems };
    });
}

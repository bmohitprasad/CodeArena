"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCode = runCode;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const child_process_1 = require("child_process");
const promises_1 = __importDefault(require("fs/promises"));
async function runCode(language, code, input) {
    const id = (0, crypto_1.randomUUID)();
    const workDir = path_1.default.join("/tmp", id);
    fs_1.default.mkdirSync(workDir);
    let fileName = "";
    let dockerfile = "";
    switch (language) {
        case "c":
            fileName = "main.c";
            dockerfile = "Dockerfiles/Dockerfile.c";
            break;
        case "cpp":
            fileName = "main.cpp";
            dockerfile = "Dockerfiles/Dockerfile.cpp";
            break;
        case "java":
            fileName = "Main.java";
            dockerfile = "Dockerfiles/Dockerfile.java";
            break;
        case "python":
            fileName = "main.py";
            dockerfile = "Dockerfiles/Dockerfile.python";
            break;
        default:
            throw new Error("Unsupported language");
    }
    fs_1.default.writeFileSync(path_1.default.join(workDir, fileName), code);
    fs_1.default.writeFileSync(path_1.default.join(workDir, "input.txt"), input);
    const imageTag = `code-${language}-${id}`;
    try {
        // 1) Build: capture output (stdout/stderr) so compile errors are available
        try {
            (0, child_process_1.execSync)(`docker build --progress=plain -f ${dockerfile} -t ${imageTag} ${workDir}`, { encoding: "utf-8" });
        }
        catch (err) {
            const raw = toStringSafe(err?.stderr) ||
                toStringSafe(err?.stdout) ||
                toStringSafe(err?.message) ||
                "";
            const filtered = filterRelevantErrors(raw, language);
            return { output: filtered || "Build failed" };
        }
        // 2) Run: capture output or errors
        try {
            const result = (0, child_process_1.execSync)(`docker run --rm -i ${imageTag} < ${path_1.default.join(workDir, "input.txt")}`, { encoding: "utf-8", timeout: 8000 });
            return { output: result ?? "" };
        }
        catch (err) {
            const raw = toStringSafe(err?.stderr) ||
                toStringSafe(err?.stdout) ||
                toStringSafe(err?.message) ||
                "";
            const filtered = filterRelevantErrors(raw, language);
            return { output: filtered || "Runtime failed" };
        }
    }
    finally {
        // Best-effort cleanup
        try {
            await promises_1.default.rm(workDir, { recursive: true, force: true });
        }
        catch { }
        try {
            (0, child_process_1.execSync)(`docker image rm ${imageTag}`, { stdio: "ignore" });
        }
        catch { }
    }
}
function toStringSafe(buf) {
    if (!buf)
        return "";
    return Buffer.isBuffer(buf) ? buf.toString("utf-8") : String(buf);
}
function filterRelevantErrors(raw, language) {
    if (!raw)
        return "";
    const lines = raw.replace(/\r\n/g, "\n").split("\n");
    // Drop common Docker/BuildKit noise
    const dropPrefixes = [
        "#", // BuildKit step/progress: "#8 0.700 ..."
        "=>", // buildx progress arrows
        "DONE ", "CACHED",
        "resolve ", "export ",
        "transferring", "using docker driver",
        "ERROR: failed to build", "failed to solve:",
        "View build details:"
    ];
    const isNoise = (line) => dropPrefixes.some((p) => line.startsWith(p)) ||
        /^\s*$/.test(line);
    if (language === "java") {
        // Keep lines like:
        // Main.java:29: error: cannot find symbol
        //   System.out.println(... rect.area());
        //                              ^
        const kept = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const m = line.match(/^([^:\s][^:]*)\.java:\s*(\d+):\s*error:\s*(.+)$/i) ||
                line.match(/^([^:\s][^:]*)\.(java|javac)?:\s*(\d+):\s*error:\s*(.+)$/i);
            if (m) {
                kept.push(line);
                if (i + 1 < lines.length && !isNoise(lines[i + 1]))
                    kept.push(lines[i + 1]);
                if (i + 2 < lines.length && !isNoise(lines[i + 2]))
                    kept.push(lines[i + 2]);
                continue;
            }
            // Sometimes single-line errors
            if (/cannot find symbol|error:|Exception in thread/i.test(line) && !isNoise(line)) {
                kept.push(line);
            }
        }
        // Fallback: keep error-ish lines with a bit of context
        if (kept.length === 0) {
            for (let i = 0; i < lines.length; i++) {
                const l = lines[i];
                if (/error:|cannot find symbol|Exception/i.test(l) && !isNoise(l)) {
                    kept.push(l);
                    if (i + 1 < lines.length && !isNoise(lines[i + 1]))
                        kept.push(lines[i + 1]);
                    if (i + 2 < lines.length && !isNoise(lines[i + 2]))
                        kept.push(lines[i + 2]);
                }
            }
        }
        // Remove summary counts like "1 error"
        const concise = kept.filter((l) => !/^\d+\s+errors?$/.test(l.trim()));
        return concise.join("\n").trim();
    }
    if (language === "c" || language === "cpp") {
        // Keep GCC/Clang 'error:' lines and 1-2 lines of context
        const kept = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isErr = /error:|undefined reference|fatal error:/i.test(line);
            if (isErr && !isNoise(line)) {
                kept.push(line);
                if (i + 1 < lines.length && !isNoise(lines[i + 1]))
                    kept.push(lines[i + 1]);
                if (i + 2 < lines.length && !isNoise(lines[i + 2]))
                    kept.push(lines[i + 2]);
            }
        }
        return kept.join("\n").trim();
    }
    if (language === "python") {
        // Keep traceback blocks
        const kept = [];
        let inTrace = false;
        for (const line of lines) {
            if (/^Traceback \(most recent call last\):/.test(line)) {
                inTrace = true;
                kept.push(line);
                continue;
            }
            if (inTrace) {
                kept.push(line);
                if (/^[A-Za-z]+Error:/.test(line))
                    inTrace = false;
            }
        }
        if (kept.length)
            return kept.join("\n").trim();
        // Fallback: keep error/Exception lines
        return lines.filter((l) => /Error:|Exception/i.test(l) && !isNoise(l)).join("\n").trim();
    }
    // Default: only error/exception lines, no progress
    return lines.filter((l) => /error|Exception/i.test(l) && !isNoise(l)).join("\n").trim();
}
function prefer(...vals) {
    for (const v of vals) {
        if (v && v.trim().length)
            return v;
    }
    return "";
}

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
            fileName = "code.c";
            dockerfile = "Dockerfiles/Dockerfile.c";
            break;
        case "cpp":
            fileName = "code.cpp";
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
// import { exec } from "child_process";
// import { promisify } from "util";
// const execAsync = promisify(exec);
// interface RunResult {
//   output: string;
// }
// class CodeRunner {
//   private languageConfigs: Record<
//     string,
//     {
//       image: string;
//       extension: string;
//       compile?: string;
//       command: string;
//     }
//   > = {
//     python: {
//       image: "python:3.11-alpine",
//       extension: "py",
//       command: "python",
//     },
//     c: {
//       image: "gcc:latest",
//       extension: "c",
//       compile: "gcc -o /tmp/program /tmp/code.c 2>&1",
//       command: "/tmp/program",
//     },
//     cpp: {
//       image: "gcc:latest",
//       extension: "cpp",
//       compile: "g++ -o /tmp/program /tmp/code.cpp 2>&1",
//       command: "/tmp/program",
//     },
//     java: {
//       image: "eclipse-temurin:17-jdk-alpine",
//       extension: "java",
//       compile: "javac /tmp/Main.java 2>&1",
//       command: "java -cp /tmp Main",
//     },
//   };
//   /**
//    * Execute code in a Docker container
//    * @param language - Programming language (python, c, cpp, java)
//    * @param code - The source code to execute
//    * @param input - Standard input for the program
//    * @param timeout - Execution timeout in milliseconds (default: 8000)
//    */
//   async runCode(
//     language: string,
//     code: string,
//     input: string = "",
//     timeout: number = 8000
//   ): Promise<RunResult> {
//     const lang = language.toLowerCase();
//     const config = this.languageConfigs[lang];
//     if (!config) {
//       throw new Error(
//         `Unsupported language: ${language}. Supported: ${Object.keys(
//           this.languageConfigs
//         ).join(", ")}`
//       );
//     }
//     const containerId = `code_runner_${Date.now()}_${Math.random()
//       .toString(36)
//       .substr(2, 9)}`;
//     try {
//       // Escape code and input for safe shell injection
//       const escapedCode = this.escapeForShell(code);
//       const escapedInput = this.escapeForShell(input);
//       let dockerCommand: string;
//       if (lang === "java") {
//         const className = this.extractJavaClassName(code) || "Main";
//         const modifiedCode = this.ensureJavaClassName(code, className);
//         const encodedJavaCode = this.escapeForShell(modifiedCode);
//         const encodedInput = this.escapeForShell(input);
//         dockerCommand =
//           `docker run --rm --name ${containerId} ` +
//           `--memory=256m --cpus=1 ` +
//           `--network=none ` +
//           `--pids-limit=50 ` +
//           `${config.image} sh -c ` +
//           `'echo ${encodedJavaCode} | base64 -d > /tmp/${className}.java && ` +
//           `javac /tmp/${className}.java 2>&1; ` +
//           `if [ $? -eq 0 ]; then ` +
//           `echo ${encodedInput} | base64 -d | java -cp /tmp ${className} 2>&1; ` +
//           `fi'`;
//       } else if (config.compile) {
//         // Compiled languages (C, C++)
//         const encodedCode = this.escapeForShell(code);
//         const encodedInput = this.escapeForShell(input);
//         dockerCommand =
//           `docker run --rm --name ${containerId} ` +
//           `--memory=256m --cpus=1 ` +
//           `--network=none ` +
//           `--pids-limit=50 ` +
//           `${config.image} sh -c ` +
//           `'echo ${encodedCode} | base64 -d > /tmp/code.${config.extension} && ` +
//           `${config.compile}; ` +
//           `if [ $? -eq 0 ]; then ` +
//           `echo ${encodedInput} | base64 -d | ${config.command} 2>&1; ` +
//           `fi'`;
//       } else {
//         // Interpreted languages (Python)
//         const encodedCode = this.escapeForShell(code);
//         const encodedInput = this.escapeForShell(input);
//         dockerCommand =
//           `docker run --rm --name ${containerId} ` +
//           `--memory=256m --cpus=1 ` +
//           `--network=none ` +
//           `--pids-limit=50 ` +
//           `${config.image} sh -c ` +
//           `'echo ${encodedCode} | base64 -d > /tmp/code.${config.extension} && ` +
//           `echo ${encodedInput} | base64 -d | ${config.command} /tmp/code.${config.extension} 2>&1'`;
//       }
//       const result = await this.executeWithTimeout(
//         dockerCommand,
//         timeout,
//         containerId
//       );
//       // Filter and clean the output
//       const filtered = this.filterRelevantErrors(result.output, lang);
//       return {
//         output: filtered.trim() || result.output.trim(),
//       };
//     } catch (error: any) {
//       // Always try to kill the container on error
//       await this.killContainer(containerId);
//       if (error.killed || error.message?.includes("timeout")) {
//         return {
//           output: `Execution timeout (${timeout}ms exceeded)`,
//         };
//       }
//       const rawError =
//         error.stderr || error.stdout || error.message || "Unknown execution error";
//       const filtered = this.filterRelevantErrors(rawError, lang);
//       return {
//         output: filtered.trim() || rawError.trim() || "Execution failed",
//       };
//     }
//   }
//   private escapeForShell(str: string): string {
//     // Base64 encode to avoid all shell escaping issues
//     return Buffer.from(str).toString('base64');
//   }
//   private async killContainer(containerId: string): Promise<void> {
//     try {
//       await execAsync(`docker kill ${containerId} 2>/dev/null || true`);
//     } catch (e) {
//       // Ignore errors, container might already be stopped
//     }
//   }
//   private async executeWithTimeout(
//     command: string,
//     timeout: number,
//     containerId: string
//   ): Promise<{ output: string }> {
//     return new Promise((resolve, reject) => {
//       const timeoutId = setTimeout(async () => {
//         await this.killContainer(containerId);
//         const err: any = new Error("Execution timeout");
//         err.killed = true;
//         reject(err);
//       }, timeout);
//       exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
//         clearTimeout(timeoutId);
//         // Combine stdout and stderr for complete output
//         const output = stdout + stderr;
//         if (error && !output.trim()) {
//           // Only treat as error if there's no output at all
//           const err: any = new Error(error.message);
//           err.stdout = stdout;
//           err.stderr = stderr;
//           err.killed = error.killed;
//           reject(err);
//         } else {
//           // Return the output even if there was an error
//           // (compilation/runtime errors are captured in output)
//           resolve({ output: output.trim() });
//         }
//       });
//     });
//   }
//   private extractJavaClassName(code: string): string | null {
//     const match = code.match(/public\s+class\s+(\w+)/);
//     return match ? match[1] : null;
//   }
//   private ensureJavaClassName(code: string, className: string): string {
//     if (code.includes(`class ${className}`)) {
//       return code;
//     }
//     // Wrap in class if not present
//     return `public class ${className} {\n${code}\n}`;
//   }
//   private filterRelevantErrors(raw: string, language: string): string {
//     if (!raw) return "";
//     const lines = raw.replace(/\r\n/g, "\n").split("\n");
//     // Docker/Build noise to filter out
//     const dropPrefixes = [
//       "#",
//       "=>",
//       "DONE ",
//       "CACHED",
//       "resolve ",
//       "export ",
//       "transferring",
//       "using docker driver",
//       "ERROR: failed to build",
//       "failed to solve:",
//       "View build details:",
//     ];
//     const isNoise = (line: string) =>
//       dropPrefixes.some((p) => line.startsWith(p)) || /^\s*$/.test(line);
//     if (language === "java") {
//       const kept: string[] = [];
//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i];
//         // Match Java error format: Main.java:5: error: message
//         const errorMatch =
//           line.match(/^([^:\s][^:]*)\.java:\s*(\d+):\s*error:\s*(.+)$/i) ||
//           line.match(/^([^:\s][^:]*)\.(java|javac)?:\s*(\d+):\s*error:\s*(.+)$/i);
//         if (errorMatch) {
//           kept.push(line);
//           // Include next 2 lines for context (pointer and code line)
//           if (i + 1 < lines.length && !isNoise(lines[i + 1]))
//             kept.push(lines[i + 1]);
//           if (i + 2 < lines.length && !isNoise(lines[i + 2]))
//             kept.push(lines[i + 2]);
//           continue;
//         }
//         // Catch runtime exceptions and other errors
//         if (
//           /cannot find symbol|error:|Exception in thread|Exception:/i.test(line) &&
//           !isNoise(line)
//         ) {
//           kept.push(line);
//         }
//       }
//       // Fallback: if no structured errors found, look for error keywords
//       if (kept.length === 0) {
//         for (let i = 0; i < lines.length; i++) {
//           const l = lines[i];
//           if (/error:|cannot find symbol|Exception/i.test(l) && !isNoise(l)) {
//             kept.push(l);
//             if (i + 1 < lines.length && !isNoise(lines[i + 1]))
//               kept.push(lines[i + 1]);
//           }
//         }
//       }
//       // Remove "N error(s)" summary lines
//       const concise = kept.filter((l) => !/^\d+\s+errors?$/.test(l.trim()));
//       return concise.join("\n").trim();
//     }
//     if (language === "c" || language === "cpp") {
//       const kept: string[] = [];
//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i];
//         const isErr = /error:|undefined reference|fatal error:/i.test(line);
//         if (isErr && !isNoise(line)) {
//           kept.push(line);
//           // Include context lines
//           if (i + 1 < lines.length && !isNoise(lines[i + 1]))
//             kept.push(lines[i + 1]);
//           if (i + 2 < lines.length && !isNoise(lines[i + 2]))
//             kept.push(lines[i + 2]);
//         }
//       }
//       return kept.join("\n").trim();
//     }
//     if (language === "python") {
//       const kept: string[] = [];
//       let inTrace = false;
//       for (const line of lines) {
//         // Start of traceback
//         if (/^Traceback \(most recent call last\):/.test(line)) {
//           inTrace = true;
//           kept.push(line);
//           continue;
//         }
//         // Inside traceback, capture everything
//         if (inTrace) {
//           kept.push(line);
//           // End of traceback (error line)
//           if (/^[A-Za-z]+Error:/.test(line)) {
//             inTrace = false;
//           }
//         }
//       }
//       if (kept.length) return kept.join("\n").trim();
//       // Fallback: look for error lines
//       return lines
//         .filter((l) => /Error:|Exception/i.test(l) && !isNoise(l))
//         .join("\n")
//         .trim();
//     }
//     // Default: filter for error/exception keywords
//     return lines
//       .filter((l) => /error|Exception/i.test(l) && !isNoise(l))
//       .join("\n")
//       .trim();
//   }
// }
// // Singleton instance
// const runner = new CodeRunner();
// // Export function matching the expected API signature
// export async function runCode(
//   language: string,
//   code: string,
//   input: string = ""
// ): Promise<{ output: string }> {
//   return runner.runCode(language, code, input);
// }
// // Example usage (for testing)
// async function main() {
//   console.log("=== Python Example ===");
//   const pythonResult = await runCode(
//     "python",
//     'name = input()\nprint(f"Hello, {name}!")',
//     "World"
//   );
//   console.log("Output:", pythonResult.output);
//   console.log("\n=== C Example ===");
//   const cResult = await runCode(
//     "c",
//     `#include <stdio.h>
// int main() {
//     int a, b;
//     scanf("%d %d", &a, &b);
//     printf("%d\\n", a + b);
//     return 0;
// }`,
//     "5 7"
//   );
//   console.log("Output:", cResult.output);
//   console.log("\n=== Java Example ===");
//   const javaResult = await runCode(
//     "java",
//     `import java.util.Scanner;
// public class Main {
//     public static void main(String[] args) {
//         Scanner sc = new Scanner(System.in);
//         String name = sc.nextLine();
//         System.out.println("Hello, " + name + "!");
//     }
// }`,
//     "Java"
//   );
//   console.log("Output:", javaResult.output);
//   console.log("\n=== Error Example ===");
//   const errorResult = await runCode("python", "print(undefined_variable)", "");
//   console.log("Output:", errorResult.output);
// }
// // Uncomment to test
// // main().catch(console.error);

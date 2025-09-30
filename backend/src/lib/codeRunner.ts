import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import fsp from "fs/promises";

export async function runCode(
  language: string,
  code: string,
  input: string
): Promise<{ output: string }> {
  const id = randomUUID();
  const workDir = path.join("/tmp", id);
  fs.mkdirSync(workDir);

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

  fs.writeFileSync(path.join(workDir, fileName), code);
  fs.writeFileSync(path.join(workDir, "input.txt"), input);

  const imageTag = `code-${language}-${id}`;

  try {
    // 1) Build: capture output (stdout/stderr) so compile errors are available
    try {
      execSync(
        `docker build --progress=plain -f ${dockerfile} -t ${imageTag} ${workDir}`,
        { encoding: "utf-8" }
      );
    } catch (err: any) {
      const raw =
        toStringSafe(err?.stderr) ||
        toStringSafe(err?.stdout) ||
        toStringSafe(err?.message) ||
        "";
      const filtered = filterRelevantErrors(raw, language);
      return { output: filtered || "Build failed" };
    }

    // 2) Run: capture output or errors
    try {
      const result = execSync(
        `docker run --rm -i ${imageTag} < ${path.join(workDir, "input.txt")}`,
        { encoding: "utf-8", timeout: 8000 }
      );
      return { output: result ?? "" };
    } catch (err: any) {
      const raw =
        toStringSafe(err?.stderr) ||
        toStringSafe(err?.stdout) ||
        toStringSafe(err?.message) ||
        "";
      const filtered = filterRelevantErrors(raw, language);
      return { output: filtered || "Runtime failed" };
    }
  } finally {
    // Best-effort cleanup
    try {
      await fsp.rm(workDir, { recursive: true, force: true });
    } catch {}
    try {
      execSync(`docker image rm ${imageTag}`, { stdio: "ignore" });
    } catch {}
  }
}

function toStringSafe(buf: any): string {
  if (!buf) return "";
  return Buffer.isBuffer(buf) ? buf.toString("utf-8") : String(buf);
}

function filterRelevantErrors(raw: string, language: string): string {
  if (!raw) return "";

  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  // Drop common Docker/BuildKit noise
  const dropPrefixes = [
    "#",                 // BuildKit step/progress: "#8 0.700 ..."
    "=>",                // buildx progress arrows
    "DONE ", "CACHED",
    "resolve ", "export ",
    "transferring", "using docker driver",
    "ERROR: failed to build", "failed to solve:",
    "View build details:"
  ];
  const isNoise = (line: string) =>
    dropPrefixes.some((p) => line.startsWith(p)) ||
    /^\s*$/.test(line);

  if (language === "java") {
    // Keep lines like:
    // Main.java:29: error: cannot find symbol
    //   System.out.println(... rect.area());
    //                              ^
    const kept: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const m =
        line.match(/^([^:\s][^:]*)\.java:\s*(\d+):\s*error:\s*(.+)$/i) ||
        line.match(/^([^:\s][^:]*)\.(java|javac)?:\s*(\d+):\s*error:\s*(.+)$/i);
      if (m) {
        kept.push(line);
        if (i + 1 < lines.length && !isNoise(lines[i + 1])) kept.push(lines[i + 1]);
        if (i + 2 < lines.length && !isNoise(lines[i + 2])) kept.push(lines[i + 2]);
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
          if (i + 1 < lines.length && !isNoise(lines[i + 1])) kept.push(lines[i + 1]);
          if (i + 2 < lines.length && !isNoise(lines[i + 2])) kept.push(lines[i + 2]);
        }
      }
    }

    // Remove summary counts like "1 error"
    const concise = kept.filter((l) => !/^\d+\s+errors?$/.test(l.trim()));
    return concise.join("\n").trim();
  }

  if (language === "c" || language === "cpp") {
    // Keep GCC/Clang 'error:' lines and 1-2 lines of context
    const kept: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isErr = /error:|undefined reference|fatal error:/i.test(line);
      if (isErr && !isNoise(line)) {
        kept.push(line);
        if (i + 1 < lines.length && !isNoise(lines[i + 1])) kept.push(lines[i + 1]);
        if (i + 2 < lines.length && !isNoise(lines[i + 2])) kept.push(lines[i + 2]);
      }
    }
    return kept.join("\n").trim();
  }

  if (language === "python") {
    // Keep traceback blocks
    const kept: string[] = [];
    let inTrace = false;
    for (const line of lines) {
      if (/^Traceback \(most recent call last\):/.test(line)) {
        inTrace = true;
        kept.push(line);
        continue;
      }
      if (inTrace) {
        kept.push(line);
        if (/^[A-Za-z]+Error:/.test(line)) inTrace = false;
      }
    }
    if (kept.length) return kept.join("\n").trim();
    // Fallback: keep error/Exception lines
    return lines.filter((l) => /Error:|Exception/i.test(l) && !isNoise(l)).join("\n").trim();
  }

  // Default: only error/exception lines, no progress
  return lines.filter((l) => /error|Exception/i.test(l) && !isNoise(l)).join("\n").trim();
}

function prefer(...vals: (string | undefined)[]) {
  for (const v of vals) {
    if (v && v.trim().length) return v;
  }
  return "";
}

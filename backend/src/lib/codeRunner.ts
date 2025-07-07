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
  let extension = "";

  switch (language) {
    case "c":
      fileName = "main.c";
      dockerfile = "Dockerfiles/Dockerfile.c";
      extension = ".c";
      break;
    case "cpp":
      fileName = "main.cpp";
      dockerfile = "Dockerfiles/Dockerfile.cpp";
      extension = ".cpp";
      break;
    case "java":
      fileName = "Main.java";
      dockerfile = "Dockerfiles/Dockerfile.java";
      extension = ".java";
      break;
    case "python":
      fileName = "main.py";
      dockerfile = "Dockerfiles/Dockerfile.python";
      extension = ".py";
      break;
    default:
      throw new Error("Unsupported language");
  }

  fs.writeFileSync(path.join(workDir, fileName), code);
  fs.writeFileSync(path.join(workDir, "input.txt"), input);

  const imageTag = `code-${language}-${id}`;
  let result = "";

  try {
    execSync(`docker build -f ${dockerfile} -t ${imageTag} ${workDir}`, {
      stdio: "ignore",
    });

    result = execSync(
      `docker run --rm -i ${imageTag} < ${path.join(workDir, "input.txt")}`,
      {
        encoding: "utf-8",
        timeout: 5000,
      }
    );

    return { output: result };
  } catch (err: any) {
    return { output: err.message || "Error running code" };
  } finally {
    await fsp.rm(workDir, { recursive: true, force: true });
    execSync(`docker image rm ${imageTag}`, { stdio: "ignore" });
  }
}

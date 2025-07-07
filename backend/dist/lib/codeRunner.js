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
exports.runCode = runCode;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const child_process_1 = require("child_process");
const promises_1 = __importDefault(require("fs/promises"));
function runCode(language, code, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (0, crypto_1.randomUUID)();
        const workDir = path_1.default.join("/tmp", id);
        fs_1.default.mkdirSync(workDir);
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
        fs_1.default.writeFileSync(path_1.default.join(workDir, fileName), code);
        fs_1.default.writeFileSync(path_1.default.join(workDir, "input.txt"), input);
        const imageTag = `code-${language}-${id}`;
        let result = "";
        try {
            (0, child_process_1.execSync)(`docker build -f ${dockerfile} -t ${imageTag} ${workDir}`, {
                stdio: "ignore",
            });
            result = (0, child_process_1.execSync)(`docker run --rm -i ${imageTag} < ${path_1.default.join(workDir, "input.txt")}`, {
                encoding: "utf-8",
                timeout: 5000,
            });
            return { output: result };
        }
        catch (err) {
            return { output: err.message || "Error running code" };
        }
        finally {
            yield promises_1.default.rm(workDir, { recursive: true, force: true });
            (0, child_process_1.execSync)(`docker image rm ${imageTag}`, { stdio: "ignore" });
        }
    });
}

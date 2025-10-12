"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const student_1 = __importDefault(require("./routes/student/student"));
const teacher_1 = __importDefault(require("./routes/teacher/teacher"));
const auth_1 = __importDefault(require("./routes/student/auth"));
const auth_2 = __importDefault(require("./routes/teacher/auth"));
const chat_1 = __importDefault(require("./server/chat")); // attaches REST + ws to the same server
const runCode_1 = __importDefault(require("./routes/runCode"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3002;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routers
app.use('/api/v1/code', runCode_1.default);
app.use('/api/v1/student', student_1.default);
app.use('/api/v1/admin', teacher_1.default);
app.use('/api/v1/auth/student', auth_1.default);
app.use('/api/v1/auth/admin', auth_2.default);
// Create single HTTP server instance
const server = http_1.default.createServer(app);
// Attach chat (REST + ws) to this server
(0, chat_1.default)(app, server);
// IMPORTANT: start the HTTP server used by ws
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

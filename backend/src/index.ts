import express from 'express';
import cors from 'cors';
import http from 'http';
import studentRouter from './routes/student/student';
import teacherRouter from './routes/teacher/teacher';
import studentAuthRouter from './routes/student/auth';
import teacherAuthRouter from './routes/teacher/auth';
import chatServer from './server/chat'; // attaches REST + ws to the same server
import codeRouter from './routes/runCode';
import execCallbackRouter from "./routes/execCallback";
import getResultRouter from "./routes/getResult";

const app = express();
const PORT = Number(process.env.PORT) || 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/v1/code', codeRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/admin', teacherRouter);
app.use('/api/v1/auth/student', studentAuthRouter);
app.use('/api/v1/auth/admin', teacherAuthRouter);
app.use("/api/v1/exec", execCallbackRouter);
app.use("/api/v1/code", getResultRouter);


// Create single HTTP server instance
const server = http.createServer(app);

// Attach chat (REST + ws) to this server
chatServer(app, server);

// IMPORTANT: start the HTTP server used by ws
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

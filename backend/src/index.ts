import express from 'express';
import cors from 'cors';
import http from 'http';
import studentRouter from './routes/student/student';
import teacherRouter from './routes/teacher/teacher';
import studentAuthRouter from './routes/student/auth';
import teacherAuthRouter from './routes/teacher/auth';
import codeRouter from './routes/runCode';
import execCallbackRouter from "./routes/execCallback";
import getResultRouter from "./routes/getResult";

const app = express();
const PORT = Number(process.env.PORT) || 3002;

app.use(cors());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/code', codeRouter);
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/admin', teacherRouter);
app.use('/api/v1/auth/student', studentAuthRouter);
app.use('/api/v1/auth/admin', teacherAuthRouter);
app.use("/api/v1/exec", execCallbackRouter);
app.use("/api/v1/code", getResultRouter);


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

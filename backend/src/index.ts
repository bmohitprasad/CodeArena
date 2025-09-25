import express from 'express'
import cors from 'cors'
import codeRouter from './routes/runCode';
import studentRouter from './routes/student/student';
import teacherRouter from './routes/teacher/teacher';
import studentAuthRouter from './routes/student/auth';
import teacherAuthRouter from './routes/teacher/auth';

const app = express();
const PORT = Number(process.env.PORT) || 3002;

app.use(cors())
app.use(express.json());

app.use('/api/v1/code', codeRouter)
app.use('/api/v1/student', studentRouter);
app.use('/api/v1/admin', teacherRouter);
app.use('/api/v1/auth/student', studentAuthRouter);
app.use('/api/v1/auth/admin', teacherAuthRouter);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
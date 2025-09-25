import { BrowserRouter, Route, Routes } from "react-router-dom"
import TeacherAuth from "./pages/Teacher/TeacherHome"
import { Classes } from "./pages/Teacher/Classes"
import { TeacherAssignments } from "./pages/Teacher/Assignments"
import { TeacherProblems } from "./pages/Teacher/Problems"
import StudentAuth from "./pages/Student/StudentHome"
import { StudentClasses } from "./pages/Student/Classes"
import { StudentAssignments } from "./pages/Student/Assignments"
import { StudentProblems } from "./pages/Student/Problems"
import CodeEditor from "./pages/Student/CodeEditor"
import { SubmissionPage } from "./pages/Student/SubmissionPage"
// import ProblemPage from "./pages/Student/CodeEditor"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teacher/home" element={<TeacherAuth/>}/>
        <Route path="/teacher/classes" element={<Classes/>}/>
        <Route path="/teacher/class/:id" element={<TeacherAssignments/>}/>
        <Route path="/teacher/class/assignment/:id" element={<TeacherProblems/>}/>

        <Route path="/student/home" element={<StudentAuth/>}/>
        <Route path="/student/classes" element={<StudentClasses/>}/>
        <Route path="/student/class/:id" element={<StudentAssignments/>}/>
        <Route path="/student/class/assignment/:id" element={<StudentProblems/>}/>
        <Route path="/student/assignment/problem/:id" element={<CodeEditor/>}/>
        <Route path="/student/assignment/problem/submissions" element={<SubmissionPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

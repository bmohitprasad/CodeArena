import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import TeacherAuth from "./pages/Teacher/TeacherHome"
import { Classes } from "./pages/Teacher/Classes"
import { TeacherAssignments } from "./pages/Teacher/Assignments"
import { TeacherProblems } from "./pages/Teacher/Problems"
import TeacherProfile from "./pages/Teacher/Profile"
import StudentAuth from "./pages/Student/StudentHome"
import { StudentClasses } from "./pages/Student/Classes"
import { StudentAssignments } from "./pages/Student/Assignments"
import { StudentProblems } from "./pages/Student/Problems"
import CodeEditor from "./pages/Student/CodeEditor"
import { SubmissionPage } from "./pages/Student/SubmissionPage"
import StudentProfile from "./pages/Student/Profile"
import Home from "./pages/Home/Home"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  return (
    <ThemeProvider>

      <BrowserRouter>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/guest" replace />} />

          {/* Teacher routes */}
          <Route path="/teacher/auth" element={<TeacherAuth/>}/>
          <Route path="/teacher/home" element={<TeacherAuth/>}/>
          <Route path="/teacher/classes" element={<Classes/>}/>
          <Route path="/teacher/class/:id" element={<TeacherAssignments/>}/>
          <Route path="/teacher/class/assignment/:id" element={<TeacherProblems/>}/>
          <Route path="/teacher/profile" element={<TeacherProfile/>}/>

          {/* Student routes */}
          <Route path="/student/auth" element={<StudentAuth/>}/>
          <Route path="/student/home" element={<StudentAuth/>}/>
          <Route path="/student/classes" element={<StudentClasses/>}/>
          <Route path="/student/class/:id" element={<StudentAssignments/>}/>
          <Route path="/student/class/assignment/:id" element={<StudentProblems/>}/>
          <Route path="/student/assignment/problem/:id" element={<CodeEditor/>}/>
          <Route path="/student/assignment/problem/submissions" element={<SubmissionPage/>}/>
          <Route path="/student/profile" element={<StudentProfile/>}/>

          <Route path="/guest" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

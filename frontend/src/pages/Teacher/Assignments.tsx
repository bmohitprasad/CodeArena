import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { Assignmentcard } from "../../components/AssignmentCard";
import { AssignmentCardSkeleton } from "../../components/skeleton/AssignmentCardSkeleton";
import { Assignments, Enrolled } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { StudentCard } from "../../components/StudentCard";
import { Button } from "../../components/ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Input } from "../../components/ui/Input";
import { useState } from "react";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const TeacherAssignments = () => {
  const { darkMode } = useTheme();
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id || "0");
  const { loading, assignments } = Assignments({ class_id: classId });
  const { loadingStudents, enrolledStudents } = Enrolled({ class_id: classId });

  const [showCreateBox, setShowCreateBox] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const pageBg = darkMode ? "bg-[#1E293B]" : "bg-[#F5F7FA]";
  const cardBg = darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-[#E2E8F0]";
  const headingColor = darkMode ? "text-white" : "text-[#1E293B]";
  const subTextColor = darkMode ? "text-slate-400" : "text-slate-600";
  const labelColor = darkMode ? "text-slate-400" : "text-slate-700";


  const navigate = useNavigate();

  const handleDeleteClass = async (classId: number) => {
  // Add a clear warning message
    const isConfirmed = window.confirm(
      "⚠️ Warning: Are you sure you want to delete this class? This action cannot be undone and will remove all student enrollments and assignments."
    );

    if (!isConfirmed) return; // Exit if the teacher clicks 'Cancel'

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/admin/class/${classId}`, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      // Redirect after successful deletion
      navigate("/teacher/classes");
    } catch (error) {
      console.error("Failed to delete class:", error);
      alert("An error occurred while trying to delete the class.");
    }
  };

  const handleCreateAssignment = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/admin/class/${classId}/create-assignment`,
        {
          title,
          description,
          deadline,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt") || "",
          },
        }
      );
      setTitle("");
      setDescription("");
      setDeadline("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}>
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="teacher" />
        
        {/* Left Control Panel */}
        <div className="w-96 p-6 space-y-6">
          <div className={`${cardBg} border p-6 rounded-xl shadow-sm`}>
            <button
              onClick={() => setShowCreateBox((prev) => !prev)}
              className="flex items-center justify-between w-full"
            >
              <span className={`flex items-center gap-2 font-bold text-lg ${headingColor}`}>
                <PlusCircle className="text-blue-500" size={20} />
                Create Assignment
              </span>
              <ChevronDown className={darkMode ? "text-slate-500" : "text-gray-400"} />
            </button>

            {showCreateBox && (
              <div className="mt-6 space-y-4 animate-in slide-in-from-top-2">
                <div>
                  <label htmlFor="assignment-title" className={`block text-xs font-bold uppercase mb-1 ${labelColor}`}>Title</label>
                  <Input 
                    id="assignment-title"
                    title="Assignment Title"
                    placeholder="Enter assignment title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className={darkMode ? "bg-slate-900 border-slate-700 text-white" : ""}
                  />
                </div>
                <div>
                  <label htmlFor="assignment-deadline" className={`block text-xs font-bold uppercase mb-1 ${labelColor}`}>Deadline</label>
                  <Input 
                    id="assignment-deadline"
                    type="datetime-local" 
                    title="Assignment Deadline"
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)} 
                    className={darkMode ? "bg-slate-900 border-slate-700 text-white invert-[0.8] hue-rotate-180" : ""}
                  />
                </div>
                <Button onClick={handleCreateAssignment} className="w-full bg-blue-600 hover:bg-blue-700">
                  Deploy Assignment
                </Button>
              </div>
            )}
          </div>

          {/* Enrolled Students Sidebar */}
          <div className={`${cardBg} border p-4 rounded-xl shadow-sm`}>
            <h2 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${headingColor}`}>
              🎓 Enrolled Students
            </h2>
            <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Use loadingStudents here */}
              {loadingStudents ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className={`h-12 w-full rounded-xl animate-pulse ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
                ))
              ) : enrolledStudents.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">No students joined yet.</p>
              ) : (
                enrolledStudents.map((e) => (
                  <StudentCard
                    key={e.student_id}
                    student_id={e.student_id}
                    name={e.student.name}
                  />
                ))
              )}
            </div>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={() => handleDeleteClass(classId)} 
            className="w-full opacity-60 hover:opacity-100 transition-all duration-200 font-bold"
          >
            Archive / Delete Class
          </Button>
        </div>

        {/* Right Content Area */}
        <main className="flex-1 py-6 pr-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Use loading and assignments here */}
            {loading ? (
              [...Array(4)].map((_, i) => (
                <AssignmentCardSkeleton key={i} />
              ))
            ) : assignments.length === 0 ? (
              <div className="text-center py-20 opacity-40">
                <p className={subTextColor}>No assignments created for this class yet.</p>
              </div>
            ) : (
              assignments.map((a) => (
                <Assignmentcard
                  key={a.id}
                  id={a.id}
                  user="teacher"
                  title={a.title}
                  description={a.description}
                  createdAt={a.createdAt}
                  deadline={a.deadline}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

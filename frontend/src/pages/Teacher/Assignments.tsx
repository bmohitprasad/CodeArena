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
import { ChevronDown, ChevronRight, PlusCircle } from "lucide-react";
import { Textarea } from "../../components/ui/TextArea";

export const TeacherAssignments = () => {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id || "0");
  const { loading, assignments } = Assignments({ class_id: classId });
  const { loadingStudents, enrolledStudents } = Enrolled({ class_id: classId });

    const [showCreateBox, setShowCreateBox] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();

  const handleDeleteClass = async (classId: number) => {
    await axios.delete(`${BACKEND_URL}/api/v1/admin/class/${classId}`, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    });
    navigate("/teacher/classes");
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
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="teacher"  />
        <div className="w-96 p-6 space-y-6">
          {/* Assignment Form */}
          <div className="bg-white p-6 rounded-xl shadow mb-6">
        <button
          onClick={() => setShowCreateBox((prev) => !prev)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="flex items-center gap-2 text-[#1E293B] font-semibold text-lg">
            <PlusCircle className="text-[#2563eb]" size={20} />
            Create Assignment
          </span>
          {showCreateBox ? (
            <ChevronDown className="text-gray-500" />
          ) : (
            <ChevronRight className="text-gray-500" />
          )}
        </button>

        {showCreateBox && (
          <div className="mt-6 space-y-4 transition-all">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                placeholder="e.g. C Language"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                  placeholder="e.g. Basics of C with syntax overview..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  />
              </div>

              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <Input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  />
              </div>

              <div className="pt-2">
                  <Button onClick={handleCreateAssignment} className="w-full">
                  Create Assignment
                  </Button>
              </div>
              </div>
          )}
          </div>
          {/* Enrolled Students */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
              🎓 Enrolled Students
            </h2>
            <div className="flex flex-col gap-2">
              {loadingStudents
                ? [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-gray-200 rounded-md animate-pulse"
                    />
                  ))
                : enrolledStudents.map((e) => (
                    <StudentCard
                      key={e.student_id}
                      student_id={e.student_id}
                      name={e.student.name}
                    />
                  ))}
            </div>
          </div>

          {/* Delete Button */}
          <div>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDeleteClass(classId)}
              className="flex my-4"
            >
              Delete Class
            </Button>
          </div>
        </div>

        {/* Assignments List */}
        <main className="flex-1 py-6 pr-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            {loading
              ? [...Array(6)].map((_, i) => <AssignmentCardSkeleton key={i} />)
              : assignments.map((a) => (
                  <Assignmentcard
                    key={a.id}
                    id={a.id}
                    user="teacher"
                    title={a.title}
                    description={a.description}
                    createdAt={a.createdAt}
                    deadline={a.deadline}
                  />
                ))}
          </div>
        </main>
      </div>
    </div>
  );
};

import { useNavigate, useParams } from "react-router-dom"
import { Appbar } from "../../components/Appbar"
import { Sidebar } from "../../components/Sidebar"
import { Problems, Submissions } from "../../hooks"
import { ProblemCard } from "../../components/ProblemCard"
import { ProblemCardSkeleton } from "../../components/skeleton/ProblemsCardSkeleton"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/TextArea"
import { ChevronDown, ChevronUp } from "lucide-react"
import { StudentCard } from "../../components/StudentCard"

export const TeacherProblems = () => {
  const { id } = useParams<{ id: string }>()
  const assignment_id = parseInt(id || "0")
  const [refresh, setRefresh] = useState(false);
  const { loading, problems } = Problems({ assignment_id, refresh });

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [expectedOutput, setExpectedOutput] = useState("")
  const [creating, setCreating] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  const navigate = useNavigate();

  const { loadingStudents, submittedStudents } = Submissions({ assignment_id })

  const handleCreateProblem = async () => {
    if (!title || !content || !expectedOutput) return
    try {
      setCreating(true)
      await axios.post(
        `${BACKEND_URL}/api/v1/admin/assignment/${assignment_id}/add-problem`,
        {
          title,
          content,
          expectedOutput
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt") || ""
          }
        }
      )
      setTitle("")
      setContent("")
      setExpectedOutput("")
      setRefresh(prev => !prev)
    } catch (error) {
      console.error("Error creating problem:", error)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteAssignment = async (assignment_id: number) => {
    await axios.delete(`${BACKEND_URL}/api/v1/admin/assignment/${assignment_id}`, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    });
    navigate(`/admin/classes`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="admin"  />
        <main className="flex-1 p-6 flex gap-6">
          {/* Left Side: Create Problem Form */}
          <div className="w-1/3 bg-white p-6 rounded-xl shadow-md h-fit space-y-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setFormOpen(!formOpen)}
            >
              <h2 className="text-lg font-semibold text-[#1E293B] mb-2">Create Problem</h2>
              {formOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {formOpen && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    placeholder="e.g. Sum of Two Numbers"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    placeholder="e.g. Write a program to add two integers."
                    value={content}
                    //@ts-ignore
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
                  <Textarea
                    placeholder="e.g. 5"
                    value={expectedOutput}
                    //@ts-ignore
                    onChange={(e) => setExpectedOutput(e.target.value)}
                  />
                </div>
                <div className="pt-2">
                  <Button
                    onClick={handleCreateProblem}
                    disabled={creating}
                    className="w-full"
                  >
                    {creating ? "Creating..." : "Create Problem"}
                  </Button>
                </div>
              </div>
            )}

            {/* Submitted Students */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                🎓 Submitted Students
              </h2>
              <div className="flex flex-col gap-2">
                {loadingStudents
                  ? [...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-10 bg-gray-200 rounded-md animate-pulse"
                      />
                    ))
                  : submittedStudents.map((e) => (
                      <StudentCard
                        key={e.student_id}
                        student_id={e.student_id}
                        name={e.student.name}
                      />
                    ))}
              </div>
            </div>
          <div className="">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDeleteAssignment(assignment_id)}
              className="flex my-4"
            >
              Delete Assignment
            </Button>
          </div>
          </div>


          {/* Right Side: Problems List */}
          <div className="flex-1 space-y-4">
            {loading
              ? [...Array(6)].map((_, i) => <ProblemCardSkeleton key={i} />)
              : problems.map((p) => (
                  <ProblemCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    content={p.content}
                    assignmentId={p.assignmentId}
                    expectedOutput={p.expectedOutput}
                  />
                ))}
          </div>
        </main>
      </div>
    </div>
  )
}

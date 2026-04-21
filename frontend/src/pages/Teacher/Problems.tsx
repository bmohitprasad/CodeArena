import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";

import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { Problems, Submissions } from "../../hooks";
import { ProblemCard } from "../../components/ProblemCard";
import { ProblemCardSkeleton } from "../../components/skeleton/ProblemsCardSkeleton";
import { StudentCard } from "../../components/StudentCard";

import { BACKEND_URL } from "../../config";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/TextArea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const TeacherProblems = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const assignment_id = useMemo(() => parseInt(id || "0", 10), [id]);

  const [refresh, setRefresh] = useState(false);
  const { loading, problems } = Problems({ assignment_id, refresh });
  const { loadingStudents, submittedStudents } = Submissions({ assignment_id });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [creating, setCreating] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const token = localStorage.getItem("jwt") || "";
  const authHeader = useMemo(() => ({ Authorization: token }), [token]);
  const pageBg = darkMode ? "bg-[#1E293B]" : "bg-[#F5F7FA]";
  const cardBg = darkMode ? "bg-[#0F172A] border-slate-800 shadow-2xl" : "bg-white border-slate-200 shadow-md";
  const headingColor = darkMode ? "text-white" : "text-[#1E293B]";
  const labelStyle = `text-[10px] font-black uppercase tracking-widest mb-2 block ${darkMode ? 'text-slate-500' : 'text-slate-400'}`;
  const inputStyle = darkMode ? "bg-slate-900 border-slate-800 text-white focus:border-blue-500" : "bg-white border-slate-200";

  const handleCreateProblem = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMsg("Title and Description are required.");
      return;
    }
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      setCreating(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/admin/assignment/${assignment_id}/add-problem`,
        { title, content, expectedOutput: expectedOutput.trim() || null },
        { headers: authHeader }
      );
      setTitle(""); setContent(""); setExpectedOutput("");
      setRefresh((prev) => !prev);
      setSuccessMsg("Problem deployed successfully!");
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Failed to create problem");
    } finally {
      setCreating(false);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  }, [assignment_id, title, content, expectedOutput, authHeader]);

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}>
      <Appbar />
      <button
        onClick={() => navigate(-1)}
        className="m-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition cursor-pointer text-sm font-medium"
      >
        ← Back
      </button>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user="teacher" />
        
        <main className="flex-1 p-6 flex flex-col lg:flex-row gap-8 overflow-y-auto h-[calc(100vh-64px)]">          
          {/* Builder Sidebar */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <div className={`${cardBg} p-6 rounded-2xl border transition-all`}>
              <button 
                onClick={() => setFormOpen(!formOpen)}
                className="flex items-center justify-between w-full mb-6 group"
              >
                <h2 className={`text-xl font-black tracking-tight ${headingColor}`}>Problem Builder</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  {formOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {formOpen && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex flex-col">
                    <label htmlFor="problem-title" className={labelStyle}>Problem Title</label>
                    <Input
                      id="problem-title"
                      title="Problem Title"
                      placeholder="e.g. Palindrome Check"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={inputStyle}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="task-description" className={labelStyle}>Task Description</label>
                    <Textarea
                      id="task-description"
                      title="Task Description"
                      placeholder="What should the student solve?"
                      value={content}
                      onChange={(e: any) => setContent(e.target.value)}
                      className={`min-h-[120px] resize-none border-2 ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-blue-500" 
                          : "bg-white border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="validation-output" className={labelStyle}>Validation Output (Optional)</label>
                    <Textarea
                      id="validation-output"
                      title="Validation Output"
                      placeholder="The raw string the editor should match..."
                      value={expectedOutput}
                      onChange={(e: any) => setExpectedOutput(e.target.value)}
                      className={`font-mono text-xs min-h-[80px] resize-none border-2 ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-blue-300 placeholder:text-slate-600 focus:border-blue-500" 
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    />
                  </div>

                  <div className="pt-2">
                    <Button 
                      onClick={handleCreateProblem} 
                      disabled={creating || !title.trim()} 
                      className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
                    >
                      {creating ? "Deploying..." : "Deploy Problem"}
                    </Button>
                    {errorMsg && <p className="mt-3 text-xs text-red-500 font-medium text-center">{errorMsg}</p>}
                    {successMsg && <p className="mt-3 text-xs text-emerald-500 font-medium text-center">{successMsg}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Turn-ins Section */}
            <div className={`${cardBg} p-6 rounded-2xl border`}>
              <h2 className={`text-xs font-black uppercase tracking-widest mb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                🎓 Student Turn-ins
              </h2>
              <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {loadingStudents ? (
                  <div className="h-10 w-full animate-pulse bg-slate-800/50 rounded-lg" />
                ) : submittedStudents.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">No submissions yet.</p>
                ) : (
                  submittedStudents.map(s => (
                    <StudentCard key={s.student_id} student_id={s.student_id} name={s.student.name} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between mb-2">
               <h3 className={`text-sm font-bold uppercase tracking-tighter ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                 Assignment Problems ({problems.length})
               </h3>
            </div>
            {loading ? (
              [...Array(3)].map((_, i) => <ProblemCardSkeleton key={i} />)
            ) : (
              problems.map((p, i) => (
                <ProblemCard 
                  key={p.id} 
                  serial={i + 1} 
                  title={p.title} 
                  content={p.content} 
                  id={p.id} 
                  assignmentId={p.assignmentId} 
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
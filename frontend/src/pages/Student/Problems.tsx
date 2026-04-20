import { useParams, useNavigate } from "react-router-dom"
import { Appbar } from "../../components/Appbar"
import { Sidebar } from "../../components/Sidebar"
import { Problems } from "../../hooks"
import { ProblemCardSkeleton } from "../../components/skeleton/ProblemsCardSkeleton"
import { StudentProblemCard } from "../../components/StudentProblemCard"
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/Button"
import { BACKEND_URL } from "../../config"
import { useTheme } from "../../context/ThemeContext"; // 1. Import Theme

type ProblemStatus = { problemId: number; isSubmitted: boolean };

export const StudentProblems = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const assignment_id = parseInt(id || "0");
  const { loading, problems } = Problems({ assignment_id, refresh: true });
  const { darkMode } = useTheme(); // 2. Consume Theme

  const studentId = useMemo(() => Number(localStorage.getItem("studentId") || 0), []);
  const [submitted, setSubmitted] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<number, boolean>>({});
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  // THEME TOKENS
  const pageBg = darkMode ? "bg-[#1E293B]" : "bg-[#F5F7FA]";
  const headingColor = darkMode ? "text-white" : "text-[#2E3A59]";
  const statusInfoColor = darkMode ? "text-slate-400" : "text-[#64748B]";

  useEffect(() => {
    let aborted = false;
    async function load() {
      if (!studentId || !assignment_id) return;
      setStatusLoading(true);
      setStatusError(null);
      try {
        const res = await fetch(
        `${BACKEND_URL}/api/v1/student/assignment/${assignment_id}/problem-status?studentId=${studentId}`,
        { headers: { Authorization: localStorage.getItem("jwt") || "" } }
      );
        if (!res.ok) throw new Error(`Status load failed (${res.status})`);
        const data: { status: ProblemStatus[] } = await res.json();
        if (aborted) return;
        const m: Record<number, boolean> = {};
        for (const s of data.status) m[s.problemId] = !!s.isSubmitted;
        setStatusMap(m);
      } catch (e: any) {
        if (!aborted) setStatusError(e?.message || "Failed to load submission status");
      } finally {
        if (!aborted) setStatusLoading(false);
      }
    }
    load();
    return () => { aborted = true; };
  }, [studentId, assignment_id]);

  async function safeJson(res: Response) {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Server returned invalid JSON");
    }
  }

  const allProblemsSubmitted = useMemo(() => {
    if (!problems || problems.length === 0) return false;
    return problems.every((p) => statusMap[p.id] === true);
  }, [problems, statusMap]);

  async function handleSubmitAssignment() {
    if (!allProblemsSubmitted) {
      alert("Please submit all problems before submitting the assignment.");
      return;
    }

    try {
      const token = localStorage.getItem("jwt"); 
      const res = await fetch(
        `${BACKEND_URL}/api/v1/student/assignment/${assignment_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          },
          body: JSON.stringify({ studentId })
        }
      );

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.error || "Submit failed");

      setSubmitted(true);
      alert("Assignment submitted successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to submit assignment");
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}>
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <div className="flex-1 p-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition cursor-pointer text-sm font-medium"
          >
            ← Back
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${headingColor}`}>Assignment Problems</h1>
              <p className={`text-sm mt-1 ${statusInfoColor}`}>
                {allProblemsSubmitted 
                  ? "All problems resolved. You can now finalize your submission." 
                  : "Resolve all problems in the editor to submit the assignment."}
              </p>
            </div>

            {!submitted ? (
              <Button
                onClick={handleSubmitAssignment}
                className={`px-6 py-2 rounded-xl text-lg font-bold shadow-lg transition-all active:scale-95 ${
                  allProblemsSubmitted 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-slate-400 text-slate-100 cursor-not-allowed opacity-50"
                }`}
                disabled={!studentId || !assignment_id || !allProblemsSubmitted}
              >
                Submit Assignment
              </Button>
            ) : (
              <span className={`px-6 py-2 rounded-xl text-lg font-bold border ${
                darkMode 
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
              }`}>
                Assignment Submitted ✅
              </span>
            )}
          </div>

          {statusLoading && (
            <div className={`mb-6 flex items-center gap-2 text-sm ${statusInfoColor}`}>
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Syncing status...
            </div>
          )}
          
          {statusError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
              {statusError}
            </div>
          )}

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {loading
              ? [...Array(6)].map((_, i) => <ProblemCardSkeleton key={i} />)
              : problems.map((p, index) => (
                  <StudentProblemCard
                    key={p.id}
                    serial={index + 1}      
                    id={p.id}
                    title={p.title}
                    content={p.content}
                    assignmentId={p.assignmentId}
                    expectedOutput={p.expectedOutput}
                    isSubmitted={!!statusMap[p.id]}
                  />
                ))}
          </main>
        </div>
      </div>
    </div>
  );
};
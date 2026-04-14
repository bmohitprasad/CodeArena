import { useParams } from "react-router-dom"
import { Appbar } from "../../components/Appbar"
import { Sidebar } from "../../components/Sidebar"
import { Problems } from "../../hooks"
import { ProblemCardSkeleton } from "../../components/skeleton/ProblemsCardSkeleton"
import { StudentProblemCard } from "../../components/StudentProblemCard"
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/Button"
import { BACKEND_URL } from "../../config"

type ProblemStatus = { problemId: number; isSubmitted: boolean };

export const StudentProblems = () => {
  const { id } = useParams<{ id: string }>();
  const assignment_id = parseInt(id || "0");
  const { loading, problems } = Problems({ assignment_id, refresh: true });

  const studentId = useMemo(() => Number(localStorage.getItem("studentId") || 0), []);
  const [submitted, setSubmitted] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<number, boolean>>({});
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

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

  // async function handleSubmitAssignment() {
  //   try {
  //     const res = await fetch(`${BACKEND_URL}/api/student/assignment/${assignment_id}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ studentId })
  //     });
  //     if (!res.ok) throw new Error(`Submit failed (${res.status})`);
  //     setSubmitted(true);
  //     alert("Assignment submitted successfully!");
  //   } catch (e: any) {
  //     alert(e?.message || "Failed to submit assignment");
  //   }
  // }

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

    if (!res.ok) {
      throw new Error(data?.error || "Submit failed");
    }

    setSubmitted(true);
    alert("Assignment submitted successfully!");
  } catch (err: any) {
    alert(err.message || "Failed to submit assignment");
  }
}


  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#2E3A59]">Assignment Problems</h1>
            {!submitted ? (
              <Button
                onClick={handleSubmitAssignment}
                className="px-6 py-2 rounded-xl text-lg font-semibold bg-green-600 hover:bg-green-700"
                disabled={!studentId || !assignment_id}
              >
                Submit Assignment
              </Button>
            ) : (
              <span className="px-6 py-2 rounded-xl text-lg font-semibold bg-gray-300 text-gray-700">
                Assignment Submitted ✅
              </span>
            )}
          </div>

          {statusLoading && <div className="mb-4 text-sm text-[#64748B]">Loading status…</div>}
          {statusError && <div className="mb-4 text-sm text-[#DC2626]">{statusError}</div>}

          <main className="grid md:grid-cols-2 gap-6">
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
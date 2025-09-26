// src/pages/teacher/Problems.tsx

import { useNavigate, useParams } from "react-router-dom";
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

export const TeacherProblems = () => {
  const { id } = useParams<{ id: string }>();
  const assignment_id = useMemo(() => parseInt(id || "0", 10), [id]);

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const { loading, problems } = Problems({ assignment_id, refresh });

  const { loadingStudents, submittedStudents } = Submissions({ assignment_id });

  // Create form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [creating, setCreating] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const token = useMemo(() => localStorage.getItem("jwt") || "", []);
  const authHeader = useMemo(
    () => ({ Authorization: token ? `${token}` : "" }),
    [token]
  );

  const clearForm = useCallback(() => {
    setTitle("");
    setContent("");
    setExpectedOutput("");
  }, []);

  // Expected Output is optional now
  const isCreateDisabled =
    creating ||
    !title.trim() ||
    !content.trim() ||
    !assignment_id ||
    Number.isNaN(assignment_id);

  const handleCreateProblem = useCallback(async () => {
    setSuccessMsg(null);
    if (isCreateDisabled) {
      setErrorMsg("Title and Description are required, and assignment ID must be valid.");
      return;
    }
    setErrorMsg(null);

    try {
      setCreating(true);
      const payload = {
        title,
        content,
        expectedOutput: expectedOutput.trim() ? expectedOutput : null
      };
      await axios.post(
        `${BACKEND_URL}/api/v1/admin/assignment/${assignment_id}/add-problem`,
        payload,
        { headers: authHeader }
      );

      clearForm();
      setFormOpen(false);
      setRefresh((prev) => !prev);
      setSuccessMsg("Problem created successfully.");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;
        const msg =
          typeof data === "string"
            ? data
            : data?.message || data?.error || "Request failed";
        setErrorMsg(
          `Failed to create problem${status ? ` (${status})` : ""}: ${msg}`
        );
        console.error("Create problem error:", status, data);
      } else {
        setErrorMsg(error?.message || "Unknown error");
        console.error("Create problem error:", error);
      }
    } finally {
      setCreating(false);
      setTimeout(() => setSuccessMsg(null), 2500);
    }
  }, [
    isCreateDisabled,
    assignment_id,
    title,
    content,
    expectedOutput,
    authHeader,
    clearForm,
  ]);

  // Delete assignment (now implemented)
  const deleteAssignment = useCallback(async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/admin/assignment/${assignment_id}`,
        { headers: authHeader }
      );
      navigate("/teacher/classes");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;
        const msg =
          typeof data === "string"
            ? data
            : data?.message || data?.error || "Request failed";
        setErrorMsg(
          `Failed to delete assignment${status ? ` (${status})` : ""}: ${msg}`
        );
      } else {
        setErrorMsg(error?.message || "Unknown error");
      }
    }
  }, [assignment_id, authHeader, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="teacher" />
        <main className="flex-1 p-6 flex gap-6">
          {/* Left Column */}
          <div className="w-1/3 flex flex-col gap-6">
            {/* Create Problem */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setFormOpen((o) => !o)}
                aria-expanded={formOpen}
              >
                <h2 className="text-lg font-semibold text-[#1E293B]">
                  Create Problem
                </h2>
                {formOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {formOpen && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      placeholder="e.g. Sum of Two Numbers"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={creating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      placeholder="e.g. Write a program to add two integers."
                      value={content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                      }
                      disabled={creating}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Output <span className="text-gray-400">(optional)</span>
                    </label>
                    <Textarea
                      placeholder="e.g. 5"
                      value={expectedOutput}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setExpectedOutput(e.target.value)
                      }
                      disabled={creating}
                    />
                  </div>

                  <div className="pt-1 flex gap-2">
                    <Button
                      type="button"
                      onClick={handleCreateProblem}
                      disabled={isCreateDisabled}
                      className="flex-1"
                    >
                      {creating ? "Creating..." : "Create Problem"}
                    </Button>
                    {errorMsg && (
                      <div className="text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded">
                        {errorMsg}
                      </div>
                    )}
                    {successMsg && (
                      <div className="text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded">
                        {successMsg}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submitted Students */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-[#1E293B] mb-4">
                🎓 Submitted Students
              </h2>
              <div className="flex flex-col gap-2">
                {loadingStudents
                  ? [...Array(3)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse" />
                    ))
                  : submittedStudents.map((e) => (
                      <StudentCard
                        key={e.student_id}
                        student_id={e.student_id}
                        name={e.student.name}
                      />
                    ))}
              </div>

              <div className="pt-4">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={deleteAssignment}
                  className="flex"
                >
                  Delete Assignment
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Problems List */}
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
  );
};

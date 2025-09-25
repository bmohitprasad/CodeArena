// src/pages/student/CodeEditor.tsx

import { useState, useMemo, useEffect } from "react";
import { SingleProblem, useLatestSubmission, useRunCode, useSubmitCode, useSubmissionHistory } from "../../hooks";
import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { useParams } from "react-router-dom";

export default function CodeEditor() {
  // Identity and route
  const studentId = useMemo(() => Number(localStorage.getItem("studentId") || 0), []);
  const { id } = useParams<{ id: string }>();
  const problemId = useMemo(() => parseInt(id || "0", 10), [id]);

  // Fetch problem to get assignmentId
  const singleProblem = SingleProblem({ problem_id: problemId });
  const assignmentId = useMemo(
    () => (singleProblem.problem as any)?.assignmentId || 0,
    [singleProblem.problem]
  );

  // Local editor state (defaults)
  const [code, setCode] = useState("print('hello world')");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("python");
  const [wrap, setWrap] = useState(true);
  const [editorRows, setEditorRows] = useState(20);

  // Run and Submit hooks
  const { runCode, output, loading, error } = useRunCode();
  const { submitCode, submitting, submitError, submitOk } = useSubmitCode();

  // Latest submission hydrate after assignmentId is known
  const idsReady =
    !!studentId && !!assignmentId && !!problemId && !Number.isNaN(assignmentId) && !Number.isNaN(problemId);

  const { loadingLatest, latest, latestError } = useLatestSubmission(
    idsReady ? studentId : 0,
    idsReady ? assignmentId : 0,
    idsReady ? problemId : 0
  );

  // Submission history (most recent first)
  const { loadingHistory, history, historyError, refreshHistory } = useSubmissionHistory(
    idsReady ? studentId : 0,
    idsReady ? assignmentId : 0,
    idsReady ? problemId : 0
  );

  // Hydrate editor from latest once fetched
  useEffect(() => {
    if (!loadingLatest && latest && idsReady) {
      setLanguage(latest.language || "python");
      setCode(latest.code || "print('hello world')");
      setInput(latest.stdin || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingLatest, latest, idsReady]);

  const handleRun = () => {
    runCode(code, language, input);
  };

  const canSubmit =
    !submitting &&
    !loadingLatest &&
    idsReady &&
    !!language &&
    !!code.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    await submitCode({
      studentId,
      assignmentId,
      problemId,
      language,
      code,
      input
    });
    refreshHistory?.();
  };

  const onLanguageChange = (val: string) => {
    setLanguage(val);
    // Only replace with template if code is still default-ish or empty
    if (!code.trim() || code.trim() === "print('hello world')") {
      if (val === "python") setCode("print('hello world')");
      if (val === "java")
        setCode(
          `import java.util.*;\npublic class Main { public static void main(String[] args){ System.out.println("hello world"); } }`
        );
      if (val === "cpp")
        setCode(`#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout<<"hello world"; return 0; }`);
      if (val === "c")
        setCode(`#include <stdio.h>\nint main(){ printf("hello world\\n"); return 0; }`);
    }
  };

  const renderOutput = () => {
    if (loading) return <p>Running...</p>;
    const text =
      typeof output === "string"
        ? output
        : output != null
        ? JSON.stringify(output, null, 2)
        : error || "";
    return <pre className="whitespace-pre-wrap">{text}</pre>;
  };

  const initialHydrating = !assignmentId || loadingLatest;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <div className="flex-1 p-5 gap-5 grid grid-cols-12">
          {/* Problem Panel */}
          <section className="col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-5 sticky top-5 h-fit max-h-[85vh] overflow-auto shadow-sm">
            <h1 className="text-xl font-semibold mb-2">
              {(singleProblem.problem as any)?.title || "Problem"}
            </h1>
            <p className="text-sm leading-6 text-[#334155]">
              {(singleProblem.problem as any)?.content || ""}
            </p>
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-[#475569]">Expected Output</h2>
              <pre className="mt-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg p-3 text-[#0F172A] overflow-auto">
                {(singleProblem.problem as any)?.expectedOutput ?? "—"}
              </pre>
            </div>
          </section>

          {/* Editor + IO Panel */}
          <section className="col-span-8 flex flex-col gap-5">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#475569]">Language:</span>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="bg-white border border-[#CBD5E1] rounded px-2 py-1 text-sm"
                  disabled={initialHydrating}
                >
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-[#475569]">Wrap</label>
                <input
                  type="checkbox"
                  checked={wrap}
                  onChange={(e) => setWrap(e.target.checked)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-[#475569]">Rows</label>
                <input
                  type="number"
                  min={12}
                  max={40}
                  value={editorRows}
                  onChange={(e) => setEditorRows(Number(e.target.value || 20))}
                  className="w-20 bg-white border border-[#CBD5E1] rounded px-2 py-1 text-sm"
                />
              </div>

              {initialHydrating && (
                <span className="text-xs text-[#64748B]">Loading editor state…</span>
              )}
              {latestError && !loadingLatest && (
                <span className="text-xs text-[#EA580C]">Using defaults (previous not found)</span>
              )}
            </div>

            {/* Editor */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm">
              <textarea
                rows={editorRows}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[#2563EB] ${
                  wrap ? "whitespace-pre-wrap" : "whitespace-pre"
                }`}
                spellCheck={false}
                disabled={initialHydrating}
                style={{ resize: "vertical" }}
              />
            </div>

            {/* IO */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#475569]">Input</h3>
                  <button
                    className="text-xs text-[#2563EB] hover:underline"
                    onClick={() => setInput("")}
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full mt-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="stdin (optional)"
                  spellCheck={false}
                  disabled={initialHydrating}
                />
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#475569]">Output</h3>
                  <div className="text-xs text-[#64748B]">
                    {loading ? "Running…" : "Ready"}
                  </div>
                </div>
                <div className="mt-2 h-[180px] overflow-auto bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-3">
                  {renderOutput()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRun}
                className="border rounded-lg bg-[#2563EB] hover:bg-[#1E4FCC] text-white px-4 py-2 disabled:opacity-60"
                disabled={loading || initialHydrating}
              >
                {loading ? "Running..." : "Run Code"}
              </button>

              <button
                onClick={handleSubmit}
                className="border rounded-lg bg-[#16A34A] hover:bg-[#12823B] text-white px-4 py-2 disabled:opacity-60"
                disabled={!canSubmit}
                title={
                  !studentId
                    ? "Missing student ID"
                    : !assignmentId
                    ? "Missing assignment ID"
                    : !code.trim()
                    ? "Code is empty"
                    : undefined
                }
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>

              {submitOk && (
                <span className="text-xs text-green-600">Saved!</span>
              )}
              {submitError && (
                <span className="text-xs text-red-600">{submitError}</span>
              )}
            </div>

            {/* History */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#475569]">Submission History</h3>
                <button
                  className="text-xs text-[#2563EB] hover:underline"
                  onClick={() => refreshHistory?.()}
                >
                  Refresh
                </button>
              </div>

              {loadingHistory ? (
                <div className="mt-3 text-sm text-[#64748B]">Loading history…</div>
              ) : historyError ? (
                <div className="mt-3 text-sm text-[#EA580C]">Could not load history.</div>
              ) : (history?.length ?? 0) === 0 ? (
                <div className="mt-3 text-sm text-[#64748B]">No submissions yet.</div>
              ) : (
                <ul className="mt-3 flex flex-col gap-2">
                  {history!.map((h: any) => (
                    <li
                      key={h.id}
                      className="p-2 rounded border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm">
                          <span className="text-[#2563EB]">{h.language}</span>
                          <span className="text-[#64748B]"> • </span>
                          <span className="text-[#475569]">
                            {new Date(h.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-[#64748B] line-clamp-1">
                          {(h.code || "").slice(0, 100).replace(/\n/g, " ")}
                          {(h.code || "").length > 100 ? "…" : ""}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

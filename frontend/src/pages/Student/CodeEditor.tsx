// src/pages/student/CodeEditor.tsx
import { useState, useMemo, useEffect, useId, useRef } from "react";
import {
  SingleProblem,
  useLatestSubmission,
  useRunCode,
  useSubmitCode,
  useSubmissionHistory
} from "../../hooks";
import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { useParams } from "react-router-dom";

type HistoryItem = {
  id: number;
  language: string;
  code: string;
  stdin?: string | null;
  createdAt: string;
};

const LANGUAGE_TEMPLATES: Record<string, string> = {
  python: "print('hello world')",
  java: `import java.util.*;\npublic class Main { public static void main(String[] args){ System.out.println("hello world"); } }`,
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ cout<<\"hello world\"; return 0; }",
  c: "#include <stdio.h>\nint main(){ printf(\"hello world\\n\"); return 0; }"
};

export default function CodeEditor() {
  const studentId = useMemo(() => Number(localStorage.getItem("studentId") || 0), []);
  const { id } = useParams<{ id: string }>();
  const problemId = useMemo(() => parseInt(id || "0", 10), [id]);

  const singleProblem = SingleProblem({ problem_id: problemId });
  const problemObj = (singleProblem.problem as any) || {};

  const assignmentId = useMemo(() => {
  const p = problemObj || {};
  return Number(p.assignmentId ?? p.assignment_id ?? 0);
}, [problemObj]);


  const [code, setCode] = useState("print('hello world')");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("python");
  const [wrap, setWrap] = useState(true);
  const [editorRows, setEditorRows] = useState(25);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const { runCode, output, loading, error } = useRunCode();
  const { submitCode, submitting, submitError, submitOk } = useSubmitCode();

  const idsReady =
    !!studentId && !!assignmentId && !!problemId && !Number.isNaN(assignmentId) && !Number.isNaN(problemId);

  const { loadingLatest, latest, latestError } = useLatestSubmission(
    idsReady ? studentId : 0,
    idsReady ? assignmentId : 0,
    idsReady ? problemId : 0
  );

  const { loadingHistory, history, historyError, refreshHistory } = useSubmissionHistory(
    idsReady ? studentId : 0,
    idsReady ? assignmentId : 0,
    idsReady ? problemId : 0
  );

  useEffect(() => {
    if (!loadingLatest && latest && idsReady) {
      setLanguage(latest.language || "python");
      setCode(latest.code || LANGUAGE_TEMPLATES["python"]);
      setInput(latest.stdin || "");
    }
  }, [loadingLatest, latest, idsReady]);

  const expected: string = problemObj?.expectedOutput || "";

  const [lastRunOutput, setLastRunOutput] = useState<string>("");

  useEffect(() => {
    if (loading) return;
    const text =
      typeof output === "string"
        ? output
        : output != null
        ? JSON.stringify(output, null, 2)
        : error || "";
    setLastRunOutput(text);
  }, [output, error, loading]);

  const normalize = (s: string) => (s ?? "").replace(/\r\n/g, "\n");
  const trimLinesRight = (s: string) =>
    normalize(s)
      .split("\n")
      .map((l) => l.replace(/\s+$/g, ""))
      .join("\n")
      .trim();

  const matches = trimLinesRight(lastRunOutput) === trimLinesRight(expected);
  console.log(matches);

  const canSubmit = !submitting && matches;


  const handleRun = async () => await runCode(code, language, input);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    await submitCode({ studentId, assignmentId, problemId, language, code, input });
    refreshHistory?.();
  };

  const onLanguageChange = (val: string) => {
    setLanguage(val);
    if (!code.trim() || code.trim() === "print('hello world')") {
      setCode(LANGUAGE_TEMPLATES[val] || "");
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
    return <pre className={`whitespace-pre-wrap ${wrap ? "" : "whitespace-pre"}`}>{text}</pre>;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const indent = "    ";
      const newValue = code.slice(0, start) + indent + code.slice(end);
      setCode(newValue);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + indent.length;
      });
    }
  };

  const gutterRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const onScrollTextarea = () => {
    if (gutterRef.current && taRef.current) {
      gutterRef.current.scrollTop = taRef.current.scrollTop;
    }
  };

  const initialHydrating = !assignmentId || loadingLatest;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <div className="flex-1 p-5 gap-5 grid grid-cols-12">
          {/* Problem + History Panel */}
          <section className="col-span-4">
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 top-5 h-fit max-h-[85vh] overflow-auto shadow-sm mb-4">
              <h1 className="text-xl font-semibold mb-2">{problemObj?.title || "Problem"}</h1>
              <p className="text-sm leading-6 text-[#334155]">{problemObj?.content || ""}</p>
              <p className="mt-2 text-sm text-amber-700 italic">
                ⚠️ For Java, the class name must be <span className="font-semibold">Main</span>.
              </p>


              <div className="mt-6">
                <h2 className="text-sm font-semibold text-[#475569]">Expected Output</h2>
                <pre className="mt-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg p-3 text-[#0F172A] overflow-auto">
                  {expected}
                </pre>
                <div className="mt-2 text-xs">
                  {lastRunOutput
                    ? matches
                      ? <span className="text-[#16A34A]">Last run matches expected ✓</span>
                      : <span className="text-[#DC2626]">Last run does not match</span>
                    : <span className="text-[#64748B]">Run code to validate against expected</span>}
                </div>
              </div>
            </div>

            {/* Input box */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm mb-4">
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
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full mt-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="stdin"
                spellCheck={false}
                disabled={initialHydrating}
              />
            </div>

            {/* Run & Submit */}
            <div className="flex justify-between mb-4">
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
                    : submitting
                    ? "Submitting…"
                    : !code.trim()
                    ? "Code is empty"
                    : !matches
                    ? "Output must match expected"
                    : undefined
                }
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {submitOk && <span className="text-xs text-[#16A34A]">Saved!</span>}
            {submitError && <span className="text-xs text-[#DC2626]">{submitError}</span>}

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
                  {history!.map((h: HistoryItem) => (
                    <li key={h.id} className="flex flex-col">
                      <div
                        className={`p-2 rounded border ${
                          h.id === previewId ? "border-[#2563EB]" : "border-[#E2E8F0]"
                        } bg-[#F8FAFC] flex items-center justify-between`}
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
                            {h.code.slice(0, 100).replace(/\n/g, " ")}
                            {h.code.length > 100 ? "…" : ""}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="text-xs px-2 py-1 border border-[#CBD5E1] rounded text-[#2563EB]"
                            onClick={() =>
                              setPreviewId((prev) => (prev === h.id ? null : h.id))
                            }
                          >
                            {previewId === h.id ? "Hide" : "Preview"}
                          </button>
                          <button
                            className="text-xs px-2 py-1 border border-[#CBD5E1] rounded text-[#16A34A]"
                            onClick={() => {
                              setLanguage(h.language || "python");
                              setCode(h.code || LANGUAGE_TEMPLATES["python"]);
                              setInput(h.stdin || "");
                            }}
                          >
                            Load
                          </button>
                        </div>
                      </div>

                      {/* PREVIEW SECTION */}
                      {previewId === h.id && (
                        <div className="mt-2 p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs">
                          <div className="mb-2 text-[11px] text-[#64748B] flex items-center justify-between">
                            <span>
                              {h.language} • {new Date(h.createdAt).toLocaleString()}
                            </span>
                            <span className="text-[10px]">
                              {h.stdin ? "Has stdin" : "No stdin"}
                            </span>
                          </div>
                          <pre className="max-h-40 overflow-auto font-mono text-xs whitespace-pre-wrap bg-[#F8FAFC] p-2 rounded">
{h.code}
                          </pre>
                          {h.stdin && (
                            <div className="mt-2">
                              <div className="text-[11px] text-[#475569] mb-1">Stdin</div>
                              <pre className="max-h-20 overflow-auto font-mono text-xs whitespace-pre-wrap bg-[#F8FAFC] p-2 rounded">
{h.stdin}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Editor + Output */}
          <section className="col-span-8 flex flex-col gap-5">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#475569]">Language:</span>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="bg-white border border-[#CBD5E1] rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
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
                <span className="text-xs text-[#EA580C]">
                  Using defaults (previous not found)
                </span>
              )}
            </div>

            {/* Editor */}
            <div
              className="flex border border-[#CBD5E1] rounded-lg overflow-hidden"
              style={{ height: `${editorRows * 1.5}em` }}
            >
              <div
                ref={gutterRef}
                className="bg-[#F1F5F9] text-[#64748B] text-xs select-none text-right overflow-hidden mr-2"
                style={{
                  minWidth: 36,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "13px",
                  lineHeight: "1.5em"
                }}
                aria-hidden="true"
              >
                {code.split("\n").map((_, i) => (
                  <div key={i} style={{ height: "1.5em" }}>
                    {i + 1}
                  </div>
                ))}
              </div>

              <textarea
                ref={taRef}
                rows={editorRows}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onScroll={onScrollTextarea}
                onKeyDown={handleKeyDown}
                className="flex-1 ml-2 font-mono text-xs bg-[#F8FAFC] outline-none"
                style={{
                  resize: "vertical",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: "13px",
                  lineHeight: "1.5em",
                  padding: 0,
                  margin: 0,
                  border: "none"
                }}
                spellCheck={false}
                disabled={initialHydrating}
              />
            </div>

            {/* Output Drawer */}
            <OutputDrawer
              loading={loading}
              outputEl={renderOutput()}
              expected={expected}
              actual={lastRunOutput}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

function OutputDrawer({
  loading,
  outputEl,
  expected,
  actual
}: {
  loading: boolean;
  outputEl: React.ReactNode;
  expected: string;
  actual: string;
}) {
  const drawerId = useId();
  const [open, setOpen] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "expected" | "diff">("output");
  const [copied, setCopied] = useState(false);

  const tabs: Array<{ key: "output" | "expected" | "diff"; label: string }> = [
    { key: "output", label: "Output" },
    { key: "expected", label: "Expected" },
    { key: "diff", label: "Diff" }
  ];

  const diffBlocks = computeSimpleDiff(actual ?? "", expected ?? "");

  const copyActive = async () => {
    const text =
      activeTab === "output" ? (typeof actual === "string" ? actual : "") :
      activeTab === "expected" ? expected :
      diffBlocks.map(b => `${b.tag} ${b.text}`).join("\n");
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const bodyMaxH = maximized ? "max-h-[480px]" : "max-h-[300px]";
  const innerH = maximized ? "h-[340px]" : "h-[180px]";

  return (
    <div className={`bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden ${maximized ? "ring-1 ring-[#CBD5E1]" : ""}`}>
      {/* Header bar */}
      <div className="w-full flex items-center justify-between px-3 py-2 select-none">
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2 focus:outline-none"
          aria-expanded={open}
          aria-controls={drawerId}
          title={open ? "Collapse" : "Expand"}
        >
          <ChevronIcon open={open} />
          <h3 className="text-sm font-semibold text-[#475569]">Output</h3>
          <span className="text-xs text-[#64748B]">
            {loading ? "Running…" : "Ready"}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Output tabs"
            className="hidden sm:flex items-center bg-[#F1F5F9] rounded-md overflow-hidden border border-[#E2E8F0]"
          >
            {tabs.map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={activeTab === t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-2 py-1 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]
                  ${activeTab === t.key ? "bg-white text-[#0F172A]" : "text-[#475569]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Copy */}
          <button
            onClick={copyActive}
            className="text-xs text-[#2563EB] hover:underline"
            title="Copy"
          >
            {copied ? "Copied" : "Copy"}
          </button>

          {/* Maximize */}
          <button
            onClick={() => setMaximized(m => !m)}
            className="text-xs text-[#475569] hover:underline"
            title={maximized ? "Restore" : "Maximize"}
          >
            {maximized ? "Restore" : "Maximize"}
          </button>
        </div>
      </div>

      {/* Body with animated collapse */}
      <div
        id={drawerId}
        className={`transition-[max-height] duration-300 ease-in-out ${open ? bodyMaxH : "max-h-0"} overflow-hidden border-t border-[#E2E8F0]`}
      >
        <div className="p-3 bg-[#F8FAFC]">
          {activeTab === "output" && (
            <div className={`${innerH} overflow-auto border border-[#CBD5E1] rounded-lg p-3`}>
              {outputEl}
            </div>
          )}
          {activeTab === "expected" && (
            <pre className={`${innerH} overflow-auto border border-[#CBD5E1] rounded-lg p-3 whitespace-pre-wrap text-sm text-[#0F172A]`}>
              {expected || ""}
            </pre>
          )}
          {activeTab === "diff" && (
            <div className={`${innerH} overflow-auto border border-[#CBD5E1] rounded-lg p-3 font-mono text-xs`}>
              {diffBlocks.length === 0 ? (
                <span className="text-[#16A34A]">No differences</span>
              ) : (
                <ul className="space-y-1">
                  {diffBlocks.map((b, i) => (
                    <li key={i} className={
                      b.tag === " " ? "text-[#0F172A]" :
                      b.tag === "+" ? "text-[#16A34A]" :
                      b.tag === "-" ? "text-[#DC2626]" : "text-[#0F172A]"
                    }>
                      {b.tag} {b.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-[#475569] transition-transform ${open ? "rotate-90" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M6.293 2.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 11-1.414-1.414L11.586 9 6.293 3.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Simple line-by-line diff.
// " " same, "+" expected extra, "-" actual extra.
function computeSimpleDiff(actual: string, expected: string): Array<{ tag: " " | "+" | "-"; text: string }> {
  const norm = (s: string) => (s ?? "").replace(/\r\n/g, "\n");
  let a = norm(actual).split("\n");
  let e = norm(expected).split("\n");

  // Trim common trailing blank lines
  while (a.length && e.length && a[a.length - 1].trim() === "" && e[e.length - 1].trim() === "") {
    a.pop(); e.pop();
  }

  const out: Array<{ tag: " " | "+" | "-"; text: string }> = [];
  const max = Math.max(a.length, e.length);
  for (let i = 0; i < max; i++) {
    const al = a[i] ?? "";
    const el = e[i] ?? "";
    if (al === el) {
      out.push({ tag: " ", text: el });
    } else {
      if (el) out.push({ tag: "+", text: el === "" ? "␀" : el }); // show placeholder for empty
      if (al) out.push({ tag: "-", text: al === "" ? "␀" : al });
    }
  }
  // Drop trailing pure-equality rows
  while (out.length && out[out.length - 1].tag === " " && out[out.length - 1].text.trim() === "") {
    out.pop();
  }
  return out;
}

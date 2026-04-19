import { useState, useMemo, useEffect } from "react";
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
import { useTheme } from "../../context/ThemeContext";

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
  const { darkMode } = useTheme();
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
  // const [editorRows, setEditorRows] = useState(10);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const { runCode, output, loading, error } = useRunCode();
  const { submitCode, submitting, submitError, submitOk } = useSubmitCode();

  const idsReady =
    !!studentId && !!assignmentId && !!problemId && !Number.isNaN(assignmentId) && !Number.isNaN(problemId);

  const { loadingLatest, latest } = useLatestSubmission(
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

  const handleRun = async () => await runCode(code, language, input);

  const handleSubmit = async () => {
    if (!matches) return;
    await submitCode({ studentId, assignmentId, problemId, language, code, input });
    refreshHistory?.();
  };

  const onLanguageChange = (val: string) => {
    setLanguage(val);
    if (!code.trim() || code.trim() === "print('hello world')") {
      setCode(LANGUAGE_TEMPLATES[val] || "");
    }
  };

  const pageBg = darkMode ? "bg-[#0F172A] text-slate-100" : "bg-[#F8FAFC] text-[#0F172A]";
  const cardBg = darkMode ? "bg-[#1E293B] border-slate-700" : "bg-white border-[#E2E8F0]";
  const headingColor = darkMode ? "text-white" : "text-[#0F172A]";
  const subTextColor = darkMode ? "text-slate-400" : "text-slate-600";
  const editorAreaBg = darkMode ? "bg-[#0F172A]" : "bg-white";

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

  const initialHydrating = !assignmentId || loadingLatest;

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}>
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <div className="flex-1 p-5 gap-5 grid grid-cols-12">
          {/* Problem + History Panel */}
          <section className="col-span-4">
            <div className={`${cardBg} rounded-xl border border-[#E2E8F0] p-5 top-5 h-fit max-h-[85vh] overflow-auto shadow-sm mb-4`}>
              <h1 className={`text-xl font-semibold ${headingColor} mb-2`}>{problemObj?.title || "Problem"}</h1>
              <div className={`text-sm leading-relaxed prose prose-slate ${darkMode ? "prose-invert" : ""}`}>
                {problemObj?.content || "No description provided."}
              </div>
              <p className="mt-2 text-sm text-amber-700 italic">
                ⚠️ For Java, the class name must be <span className="font-semibold">Main</span>.
              </p>

              <div className="mt-6">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${subTextColor}`}>Expected Output</h3>                
                <pre className={`p-3 rounded-lg font-mono text-xs border ${
                  darkMode ? "bg-slate-900 border-slate-700 text-blue-300" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}>
                  {expected || "No expected output defined."}
                </pre>
                <div className="mt-2 text-xs">
                  {lastRunOutput
                    ? matches
                      ? <span className="text-[#16A34A]">Last run matches expected</span>
                      : <span className="text-[#DC2626]">Last run does not match</span>
                    : <span className="text-[#64748B]">Run code to validate against expected</span>}
                </div>
              </div>
            </div>

            {/* Input box */}
            <div className={`${cardBg} border border-[#E2E8F0] rounded-xl p-3 shadow-sm mb-4`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${subTextColor}`}>Input (stdin)</h3>                
                <button
                  className="text-xs text-[#2563EB] hover:underline"
                  onClick={() => setInput("")}
                >
                  Clear
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                title="Standard Input"
                placeholder="Enter test inputs here..."
                className={`w-full p-3 font-mono text-sm rounded-lg border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                  darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
                rows={3}
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
                className={`border rounded-lg ${
                  matches 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-slate-500 text-slate-300 cursor-not-allowed opacity-50"
                }  text-white px-4 py-2 disabled:opacity-60`}
                disabled={!matches}
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
                    : "Submit Code"
                }
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            {submitOk && <span className="text-xs text-[#16A34A]">Saved!</span>}
            {submitError && <span className="text-xs text-[#DC2626]">{submitError}</span>}

            {/* History */}
            <section className={`${cardBg} border rounded-xl p-4 shadow-sm transition-colors`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${subTextColor}`}>
                    Submission History
                  </h3>
                  {history && history.length > 0 && (
                    <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/20">
                      {history.length}
                    </span>
                  )}
                </div>
                <button
                  className="text-xs text-blue-500 hover:text-blue-400 font-semibold transition"
                  onClick={() => refreshHistory?.()}
                >
                  Refresh
                </button>
              </div>

              {loadingHistory ? (
                <div className="py-4 flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-slate-500">Retrieving logs...</p>
                </div>
              ) : historyError ? (
                <div className="py-4 text-center text-xs text-red-400">Could not load history.</div>
              ) : (history?.length ?? 0) === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 italic">No submissions yet.</div>
              ) : (
                <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                  {history!.map((h: HistoryItem) => (
                    <li key={h.id} className="group">
                      <div
                        className={`p-3 rounded-xl border transition-all ${
                          h.id === previewId 
                            ? "border-blue-500 bg-blue-500/5 shadow-md" 
                            : `${darkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"} hover:border-slate-500`
                        } flex items-center justify-between gap-4`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] mb-1">
                            <span className={`font-bold uppercase ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                              {h.language}
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-500 truncate">
                              {new Date(h.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className={`text-xs font-mono line-clamp-1 opacity-60 ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                            {h.code.slice(0, 60).replace(/\n/g, " ")}...
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className={`text-[10px] font-bold px-2 py-1 rounded transition ${
                              h.id === previewId 
                                ? "bg-blue-600 text-white" 
                                : `${darkMode ? "bg-slate-800 text-slate-300" : "bg-white text-slate-600"} border border-slate-700/50`
                            }`}
                            onClick={() => setPreviewId((prev) => (prev === h.id ? null : h.id))}
                          >
                            {h.id === previewId ? "HIDE" : "PREVIEW"}
                          </button>
                          <button
                            className="text-[10px] font-bold px-2 py-1 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded hover:bg-emerald-600 hover:text-white transition"
                            onClick={() => {
                              setLanguage(h.language || "python");
                              setCode(h.code || "");
                              setInput(h.stdin || "");
                            }}
                          >
                            LOAD
                          </button>
                        </div>
                      </div>

                      {/* IMPROVED PREVIEW BOX */}
                      {previewId === h.id && (
                        <div className={`mt-2 p-3 rounded-xl border animate-in zoom-in-95 duration-200 ${
                          darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-300 shadow-inner"
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Snapshot Preview</span>
                            {h.stdin && <span className="text-[9px] bg-amber-500/20 text-amber-500 px-1.5 rounded">HAS STDIN</span>}
                          </div>
                          <pre className={`text-[11px] font-mono p-2 rounded-lg max-h-32 overflow-auto ${
                            darkMode ? "bg-black/40 text-blue-100" : "bg-slate-100 text-slate-800"
                          }`}>
                            {h.code}
                          </pre>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
        </section>
              </section>

          {/* Editor + Output */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className={`${cardBg} border rounded-xl p-3 shadow-sm flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <select
                  aria-label="Select Programming Language"
                  title="Select Programming Language"
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm border outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300"
                  }`}
                >
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ 17</option>
                  <option value="java">Java 11</option>
                  <option value="c">C (GCC)</option>
                </select>
                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} className="rounded" title="Toggle Word Wrap" />
                  <span className={subTextColor}>Word Wrap</span>
                </label>
              </div>
              <div className="text-xs font-mono opacity-50">CodeArena Editor v1.0</div>
            </div>

            {/* Code Field */}
            <div className={`flex border rounded-xl overflow-hidden shadow-2xl ${
              darkMode ? "border-slate-700" : "border-slate-300"
            }`}>
              <div className={`w-12 pt-4 flex flex-col items-center font-mono text-[11px] select-none border-r ${
                darkMode ? "bg-slate-900 border-slate-800 text-slate-600" : "bg-slate-50 border-slate-200 text-slate-400"
              }`}>
                {code.split("\n").map((_, i) => <div key={i} className="h-6">{i + 1}</div>)}
              </div>
              <textarea
                value={code}
                title="Source Code Editor"
                placeholder="Write your code here..."
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className={`flex-1 p-4 font-mono text-sm outline-none resize-none h-[500px] leading-6 ${
                  editorAreaBg
                } ${darkMode ? "text-blue-100" : "text-slate-900"} ${wrap ? "whitespace-pre-wrap" : "whitespace-pre"}`}
              />
            </div>

            {/* Output Drawer */}
            <OutputDrawer 
              loading={loading} 
              actual={lastRunOutput} 
              expected={expected} 
              darkMode={darkMode} 
            />
            </div>
        </div>
        </div>
      </div>
  );
}

function OutputDrawer({ loading, actual, expected, darkMode }: any) {
  const [isOpen, setIsOpen] = useState(true);
  const diff = computeSimpleDiff(actual, expected);

  return (
    <div className={`rounded-xl border shadow-xl overflow-hidden transition-all duration-300 ${
      darkMode ? "bg-[#1E293B] border-slate-700" : "bg-white border-slate-200"
    }`}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-black/5"
      >
        <span className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
          <span className={`w-2 h-2 rounded-full ${loading ? "bg-blue-500 animate-ping" : "bg-emerald-500"}`}></span>
          Console Output
        </span>
        <button className="text-xs font-bold text-blue-500">{isOpen ? "COLLAPSE" : "EXPAND"}</button>
      </div>

      {isOpen && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-2">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Actual Output</p>
            <pre className={`p-3 rounded-lg h-40 overflow-auto font-mono text-xs border ${
              darkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-800"
            }`}>
              {actual || (loading ? "Executing..." : "No output yet.")}
            </pre>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Diff / Comparison</p>
            <div className={`p-3 rounded-lg h-40 overflow-auto font-mono text-xs border ${
              darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              {diff.map((line, i) => (
                <div key={i} className={line.tag === "+" ? "text-emerald-500" : line.tag === "-" ? "text-red-500" : "opacity-50"}>
                  {line.tag} {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function computeSimpleDiff(actual: string, expected: string) {
  const a = actual.trim().split("\n");
  const e = expected.trim().split("\n");
  const out: Array<{tag: string, text: string}> = [];
  const max = Math.max(a.length, e.length);

  for(let i=0; i<max; i++) {
    if (a[i] === e[i]) out.push({tag: " ", text: a[i] || ""});
    else {
      if (e[i]) out.push({tag: "+", text: e[i]});
      if (a[i]) out.push({tag: "-", text: a[i]});
    }
  }
  return out;
}
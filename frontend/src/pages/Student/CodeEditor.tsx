import { useState } from "react";
import { SingleProblem, useRunCode } from "../../hooks";
import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { useParams } from "react-router-dom";

export default function CodeEditor() {
  const [code, setCode] = useState("print('Hello')");
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('python');

  const { runCode, output, loading, error } = useRunCode();
  
  const { id } = useParams<{ id: string }>()
  const problemId = parseInt(id || "0")

  const handleRun = () => {
    runCode(code, language, input);
  };

  const singleProblem = SingleProblem({ problem_id : problemId} );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student"/>
        <div className="flex-1 p-6 space-y-6">
          <div className = "flex min-h-100vh font-sans ">
            <div className = "flex-1 p-4">
              <div className="text-2xl font-bold">
                {singleProblem.problem.title}
              </div>
              <div className="text-lg ">
                {singleProblem.problem.content}
              </div>
              <div className="pt-20">
                <div className="text-md font-semibold">
                  Expected Output:-
                </div>
                <div className="">
                  {singleProblem.problem.expectedOutput}
                </div>
              </div>
            </div>

            <div className="flex-2 pd-20">
              <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '8px' }}>Language:</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                </select>
              </div>

              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{ width: '100%', height: '200px', fontFamily: 'monospace', fontSize: '16px' }}
                className="border-2 p-4 rounded-xl"
              />

              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Input (optional)"
                className="p-2"
                style={{ width: '100%', height: '50px', marginTop: '10px', fontFamily: 'monospace', fontSize: '14px' }}
              />

              <button
                onClick={handleRun}
                style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
              >
                Run Code
              </button>

              <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px', minHeight: '100px' }}>
                <strong>Output:</strong>
                {loading ? <p>Running...</p> : <pre>{output || error}</pre>}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
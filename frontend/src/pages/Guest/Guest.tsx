import { Appbar } from "../../components/Appbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface GuestProblem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
}

const GUEST_PROBLEMS: GuestProblem[] = [
  {
    id: 1,
    title: "Hello World",
    description: "Write a program that prints 'Hello World'",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Sum of Two Numbers",
    description: "Read two numbers and print their sum",
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "Factorial Calculation",
    description: "Calculate factorial of a given number",
    difficulty: "Intermediate"
  }
];

export default function Guest() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "problems">("overview");
  const [selectedProblem, setSelectedProblem] = useState<GuestProblem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0]">
      <Appbar />

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-white border-b border-[#CBD5E1] shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => {
                setActiveTab("overview");
                setSelectedProblem(null);
              }}
              className={`py-4 px-2 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "overview"
                  ? "border-[#2563EB] text-[#2563EB]"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              About CodeArena
            </button>
            <button
              onClick={() => setActiveTab("problems")}
              className={`py-4 px-2 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "problems"
                  ? "border-[#2563EB] text-[#2563EB]"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Try Sample Problems
            </button>
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-16 py-12">
          {/* Hero Section */}
          <section className="px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
                Welcome to <span className="text-[#2563EB]">CodeArena</span>
              </h1>
              <p className="text-xl text-[#475569] mb-8">
                A comprehensive, production-grade full-stack coding platform for classrooms and competitive programming
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate("/student/auth")}
                  className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1E4FCC] transition"
                >
                  Join as Student
                </button>
                <button
                  onClick={() => navigate("/teacher/auth")}
                  className="px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-semibold hover:bg-[#EFF6FF] transition"
                >
                  Join as Teacher
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">
                Powerful Features
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#DBEAFE] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">For Educators</h3>
                  <p className="text-[#475569]">
                    Create classes, design assignments, set problems with expected outputs, and track student progress in real-time
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#DBEAFE] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Multi-Language</h3>
                  <p className="text-[#475569]">
                    Support for Python, C, C++, and Java with instant code execution and output validation
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#DBEAFE] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Real-Time Feedback</h3>
                  <p className="text-[#475569]">
                    Instant code compilation, execution in isolated Docker containers, and output comparison with expected results
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#DBEAFE] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Secure Execution</h3>
                  <p className="text-[#475569]">
                    User code runs in isolated Docker containers with timeout protection to prevent infinite loops
                  </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#DBEAFE] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Submission History</h3>
                  <p className="text-[#475569]">
                    Track all submissions, view previous attempts, compare outputs, and learn from mistakes
                  </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E2E8F0]">
                  <div className="w-12 h-12 bg-[#DBEAFE] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Easy Collaboration</h3>
                  <p className="text-[#475569]">
                    Teachers and students in same classroom can share assignments and solve problems together
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="px-6 bg-[#DBEAFE] py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">
                How CodeArena Works
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Create/Join Classroom</h3>
                    <p className="text-[#475569]">
                      Teachers create classrooms and share join codes. Students enter codes to join their teacher's classroom.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Design Assignments</h3>
                    <p className="text-[#475569]">
                      Teachers create assignments with multiple coding problems. Each problem has a description and expected output.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Solve Problems</h3>
                    <p className="text-[#475569]">
                      Students write code in the integrated editor, test with sample inputs, and run code instantly with isolated execution.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Get Instant Feedback</h3>
                    <p className="text-[#475569]">
                      See real-time output comparison, line-by-line diff viewers, and validation against expected results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Submit & Track Progress</h3>
                    <p className="text-[#475569]">
                      Submit solutions and teachers view all submissions. Track progress across all students in the classroom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-8 text-center">
                Built with Modern Technology
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Frontend</h3>
                  <ul className="space-y-2 text-[#475569]">
                    <li>• React.js with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Vite for fast bundling</li>
                    <li>• Real-time UI updates</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Backend</h3>
                  <ul className="space-y-2 text-[#475569]">
                    <li>• Node.js + Express.js</li>
                    <li>• Prisma ORM for database</li>
                    <li>• PostgreSQL persistence</li>
                    <li>• JWT authentication</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Code Execution</h3>
                  <ul className="space-y-2 text-[#475569]">
                    <li>• Isolated Docker containers</li>
                    <li>• GitHub Actions integration</li>
                    <li>• Async execution workflow</li>
                    <li>• 8-second timeout protection</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
                  <h3 className="font-semibold text-[#0F172A] mb-4">Supported Languages</h3>
                  <ul className="space-y-2 text-[#475569]">
                    <li>• Python 3</li>
                    <li>• C (GCC)</li>
                    <li>• C++ (G++)</li>
                    <li>• Java (OpenJDK)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join CodeArena today and revolutionize how you teach or learn coding
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate("/student/auth")}
                  className="px-6 py-3 bg-white text-[#2563EB] rounded-lg font-semibold hover:bg-[#F1F5F9] transition"
                >
                  Sign Up as Student
                </button>
                <button
                  onClick={() => navigate("/teacher/auth")}
                  className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Sign Up as Teacher
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Problems Tab */}
      {activeTab === "problems" && (
        <div className="py-12">
          {!selectedProblem ? (
            // Problems List
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-8">Try Sample Problems</h2>
              <p className="text-[#475569] mb-8">
                Select a problem below to solve it in our code editor. No signup required!
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {GUEST_PROBLEMS.map((problem) => (
                  <div
                    key={problem.id}
                    className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-md transition cursor-pointer"
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-[#0F172A] flex-1">{problem.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                          problem.difficulty === "Beginner"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-[#475569] mb-4">{problem.description}</p>
                    <button className="text-[#2563EB] font-semibold hover:underline">
                      Solve Problem →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Problem Detail/Editor
            <div className="max-w-7xl mx-auto px-6">
              <button
                onClick={() => setSelectedProblem(null)}
                className="mb-6 text-[#2563EB] font-semibold hover:underline flex items-center gap-2"
              >
                ← Back to Problems
              </button>

              <div className="grid grid-cols-12 gap-6">
                {/* Problem Description */}
                <div className="col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-6">
                  <h1 className="text-2xl font-bold text-[#0F172A] mb-4">{selectedProblem.title}</h1>
                  <p className="text-[#475569] mb-4">{selectedProblem.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-[#0F172A] mb-2">Difficulty</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedProblem.difficulty === "Beginner"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {selectedProblem.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#0F172A] mb-2">Sample Input</h3>
                      <pre className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-3 text-xs text-[#0F172A] overflow-auto">
                        {selectedProblem.id === 1 && ""}
                        {selectedProblem.id === 2 && "5\n10"}
                        {selectedProblem.id === 3 && "5"}
                      </pre>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#0F172A] mb-2">Expected Output</h3>
                      <pre className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg p-3 text-xs text-[#0F172A] overflow-auto">
                        {selectedProblem.id === 1 && "Hello World"}
                        {selectedProblem.id === 2 && "15"}
                        {selectedProblem.id === 3 && "120"}
                      </pre>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/student/auth")}
                    className="w-full mt-8 px-4 py-2 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1E4FCC] transition"
                  >
                    Sign Up to Submit
                  </button>
                </div>

                {/* Code Editor */}
                <div className="col-span-8 bg-white rounded-xl border border-[#E2E8F0] p-6">
                  <div className="mb-4">
                    <label htmlFor="guest-language-select" className="text-sm font-semibold text-[#475569]">Language</label>
                    <select id="guest-language-select" className="w-full mt-2 border border-[#CBD5E1] rounded-lg px-3 py-2 bg-white" title="Select Programming Language">
                      <option>Python</option>
                      <option>C++</option>
                      <option>Java</option>
                      <option>C</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-[#475569]">Your Code</label>
                    <textarea
                      placeholder="Write your code here..."
                      defaultValue={
                        selectedProblem.id === 1
                          ? 'print("Hello World")'
                          : selectedProblem.id === 2
                          ? "a = int(input())\nb = int(input())\nprint(a + b)"
                          : "n = int(input())\nfact = 1\nfor i in range(1, n + 1):\n    fact *= i\nprint(fact)"
                      }
                      className="w-full h-64 p-4 border border-[#CBD5E1] rounded-lg font-mono text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1E4FCC] transition">
                      Run Code
                    </button>
                    <button className="px-4 py-2 border border-[#CBD5E1] text-[#2563EB] rounded-lg font-semibold hover:bg-[#EFF6FF] transition">
                      Reset
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg">
                    <p className="text-sm text-[#64748B]">Sign up to run and test your code!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0F172A] text-[#CBD5E1] py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-2">© 2026 CodeArena. All rights reserved.</p>
          <p className="text-sm">
            A production-grade platform for teaching and learning coding
          </p>
        </div>
      </footer>
    </div>
  );
}


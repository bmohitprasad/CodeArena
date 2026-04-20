import { Appbar } from "../../components/Appbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { BACKEND_URL } from "../../config";

interface GuestProblem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "problems">("overview");
  const [guestProblems, setGuestProblems] = useState<GuestProblem[]>([]);
  const [loadingProblems, setLoadingProblems] = useState(false);

  // Fetch guest problems from API
  useEffect(() => {
    const fetchGuestProblems = async () => {
      setLoadingProblems(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/guest`);
        if (!response.ok) throw new Error('Failed to fetch guest problems');
        const problems = await response.json();
        setGuestProblems(problems);
      } catch (error) {
        console.error('Error fetching guest problems:', error);
      } finally {
        setLoadingProblems(false);
      }
    };

    fetchGuestProblems();
  }, []);

  const handleGuestProblemClick = (problem: GuestProblem) => {
    // Provided JWT token for authorization
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODg4ODg4LCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc3NjY4MjIxOX0._2n0FXwSTzu4olFH0Bk49go4l6iYadbn8CQweRyxwlM";
    localStorage.setItem("token", token);
    localStorage.setItem("role", "STUDENT");
    localStorage.setItem("isGuest", "true");
    localStorage.setItem("guestProblemId", problem.id.toString());

    // Pass assignmentId as a query param so CodeEditor can fetch history and run code
    navigate(`/student/assignment/problem/${problem.id}?assignmentId=1&isGuest=true`);
  };

  const { darkMode } = useTheme();

  // BASE THEME TOKENS
  const pageBg = darkMode
    ? "bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200"
    : "bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] text-[#0F172A]";

  const cardBg = darkMode ? "bg-[#1E293B] border-slate-700" : "bg-white border-[#E2E8F0]";
  const headingColor = darkMode ? "text-white" : "text-[#0F172A]";
  const subTextColor = darkMode ? "text-slate-400" : "text-[#475569]";
  const sectionAltBg = darkMode ? "bg-[#0F172A]/50" : "bg-[#DBEAFE]";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <Appbar />

      {/* Navigation Tabs */}
      <div className={`sticky top-[64px] ${darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFC]"} border-b ${darkMode ? "border-slate-700" : "border-[#CBD5E1]"} shadow-sm z-40 transition-colors`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => { setActiveTab("overview"); }}
              className={`py-4 px-2 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "overview"
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : `border-transparent ${darkMode ? "text-slate-400 hover:text-white" : "text-[#64748B] hover:text-[#0F172A]"}`
              }`}
            >
              About CodeArena
            </button>
            <button
              onClick={() => setActiveTab("problems")}
              className={`py-4 px-2 font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "problems"
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : `border-transparent ${darkMode ? "text-slate-400 hover:text-white" : "text-[#64748B] hover:text-[#0F172A]"}`
              }`}
            >
              Try Sample Problems
            </button>
          </div>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-16 py-12">
          {/* Hero Section */}
          <section className="px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-5xl font-bold ${headingColor} mb-4`}>
                Welcome to <span className="text-[#3B82F6]">CodeArena</span>
              </h1>
              <p className={`text-xl ${subTextColor} mb-8`}>
                A comprehensive, production-grade full-stack coding platform for classrooms and competitive programming
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => navigate("/student/auth")} className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-semibold hover:bg-[#2563EB] transition shadow-lg">
                  Join as Student
                </button>
                <button onClick={() => navigate("/teacher/auth")} className={`px-6 py-3 border-2 border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold ${darkMode ? "hover:bg-blue-500/10" : "hover:bg-[#EFF6FF]"} transition`}>
                  Join as Teacher
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl font-bold ${headingColor} mb-12 text-center`}>Powerful Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: "🎓", t: "For Educators", d: "Create classes, design assignments, and track student progress." },
                  { icon: "💻", t: "Multi-Language", d: "Support for Python, C, C++, and Java with instant execution." },
                  { icon: "⚡", t: "Real-Time Feedback", d: "Instant compilation and isolated Docker execution." },
                  { icon: "🔒", t: "Secure Execution", d: "Isolated containers with 8-second timeout protection." },
                  { icon: "📊", t: "Submission History", d: "Track all attempts and compare line-by-line diffs." },
                  { icon: "🎯", t: "Easy Collaboration", d: "Shared assignments and real-time classroom updates." }
                ].map((f, i) => (
                  <div key={i} className={`${cardBg} rounded-xl p-8 shadow-sm border transition-all hover:shadow-md`}>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-2xl">{f.icon}</div>
                    <h3 className={`text-xl font-semibold ${headingColor} mb-2`}>{f.t}</h3>
                    <p className={subTextColor}>{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className={`px-6 ${sectionAltBg} py-16 transition-colors`}>
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-3xl font-bold ${headingColor} mb-12 text-center`}>How CodeArena Works</h2>
              <div className="space-y-8">
                {[
                  "Teachers create classrooms and share join codes.",
                  "Teachers design assignments with specific test cases.",
                  "Students code in an integrated IDE with live testing.",
                  "See real-time output and diff validation.",
                  "Submit solutions and track class-wide progress."
                ].map((text, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#3B82F6] text-white rounded-full flex items-center justify-center font-bold shadow-lg">{i + 1}</div>
                    <div>
                      <h3 className={`text-lg font-semibold ${headingColor} mb-1`}>{["Join", "Design", "Solve", "Feedback", "Progress"][i]}</h3>
                      <p className={subTextColor}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-3xl font-bold ${headingColor} mb-8 text-center`}>Technology Stack</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "Frontend", items: ["React + TS", "Tailwind CSS", "Vite"] },
                  { title: "Backend", items: ["Node + Express", "Prisma ORM", "PostgreSQL"] },
                  { title: "Execution", items: ["Docker Isolation", "GitHub Actions", "Async Workflows"] },
                  { title: "Languages", items: ["Python 3", "C / C++", "Java"] }
                ].map((stack, i) => (
                  <div key={i} className={`${cardBg} rounded-xl p-6 border`}>
                    <h3 className={`font-bold ${headingColor} mb-4`}>{stack.title}</h3>
                    <ul className={`space-y-2 ${subTextColor}`}>
                      {stack.items.map((item, j) => <li key={j}>• {item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Problems Tab */}
      {activeTab === "problems" && (
        <div className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl font-bold ${headingColor} mb-8`}>Try Sample Problems</h2>
            {loadingProblems ? (
              <div className={`text-center py-12 ${subTextColor}`}>
                <p>Loading problems...</p>
              </div>
            ) : guestProblems.length === 0 ? (
              <div className={`text-center py-12 ${subTextColor}`}>
                <p>No problems available at the moment</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {guestProblems.map((p) => (
                  <div key={p.id} onClick={() => handleGuestProblemClick(p)} className={`${cardBg} rounded-xl p-6 border hover:shadow-lg transition cursor-pointer`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-xl font-semibold ${headingColor}`}>{p.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {p.difficulty}
                      </span>
                    </div>
                    <p className={subTextColor}>{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`${darkMode ? "bg-[#0F172A]" : "bg-[#0F172A]"} text-slate-400 py-12 transition-colors`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2026 CodeArena. A production-grade platform for the modern classroom.</p>
        </div>
      </footer>
    </div>
  );
}

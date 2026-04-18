import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate, Link } from 'react-router-dom';
import { Appbar } from '../../components/Appbar';
import { useTheme } from '../../context/ThemeContext';

const StudentAuth: React.FC = () => {
  const { darkMode } = useTheme();
  const [isSignup, setIsSignup] = useState(true);
  const [postInputs, setPostInputs] = useState({
    name: '',
    roll_num: '',
    password: '',
    branch: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGuide, setShowGuide] = useState(true);
  const navigate = useNavigate();

  const pageBg = darkMode
    ? "bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200"
    : "bg-gradient-to-b from-slate-50 to-slate-100 text-[#0F172A]";

  const cardBg = darkMode ? "bg-[#1E293B] border-slate-700" : "bg-white border-[#E2E8F0]";
  const headingColor = darkMode ? "text-white" : "text-[#0F172A]";
  const subTextColor = darkMode ? "text-slate-400" : "text-slate-600";
  const inputBg = darkMode ? "bg-[#0F172A] border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900";
  const guideBg = darkMode ? "bg-[#0F172A]/50 border-slate-700" : "bg-slate-50 border-slate-200";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isSignup ? '/signup' : '/signin';
      const payload = isSignup ? postInputs : { roll_num: postInputs.roll_num, password: postInputs.password };
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/student${endpoint}`, payload);
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('studentId', String(response.data.roll_num));
      navigate('/student/classes');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen flex-col ${pageBg} transition-colors duration-300`}>
      <Appbar />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Left: Intro / Guide */}
          <section className={`rounded-2xl ${cardBg} p-6 shadow-sm md:p-8 border transition-colors`}>
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl font-semibold tracking-tight ${headingColor}`}>
                Welcome to CodeArena
              </h1>
              <Link to="/teacher/home" className="text-sm text-blue-500 hover:text-blue-400 transition underline-offset-4 hover:underline">
                Switch to Teacher
              </Link>
            </div>

            <p className={`mt-2 text-sm ${subTextColor}`}>
              This is the student portal for joining classes, viewing assignments,
              and writing code solutions with live execution.
            </p>

            {/* Highlights */}
            <ul className={`mt-4 space-y-2 text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                Join classes with a join code shared by the instructor.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                Access assignments and solve problems in the built‑in editor.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                Save attempts, view history, and submit when ready.
              </li>
            </ul>

            {/* Collapsible guide */}
            <div className="mt-6">
              <button onClick={() => setShowGuide((v) => !v)} className="text-sm text-blue-500 hover:underline">
                {showGuide ? 'Hide' : 'Show'} quick guide
              </button>

              {showGuide && (
                <div className={`mt-3 overflow-hidden rounded-lg border ${guideBg} p-4 text-sm transition-colors`}>
                  <ol className={`list-decimal pl-5 space-y-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                    <li>Create an account or sign in below.</li>
                    <li>Open “Classes” → use the join code from the teacher.</li>
                    <li>Go to “Assignments” → pick a problem to solve.</li>
                    <li>Run code to test, then submit when confident.</li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* Right: Auth Card */}
          <section className={`relative overflow-hidden rounded-2xl ${cardBg} p-6 shadow-xl md:p-8 border transition-colors`}>
            {/* Ambient Background Glows */}
            <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full ${darkMode ? "bg-blue-900/20" : "bg-blue-100"} blur-2xl`} />
            <div className={`absolute -bottom-10 -left-10 h-36 w-36 rounded-full ${darkMode ? "bg-indigo-900/20" : "bg-indigo-100"} blur-2xl`} />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${headingColor}`}>
                  {isSignup ? 'Student Sign Up' : 'Student Sign In'}
                </h2>
                <button
                  onClick={() => setIsSignup((v) => !v)}
                  className="text-sm text-blue-500 hover:underline"
                  disabled={loading}
                >
                  {isSignup ? 'Use existing account' : 'Create new account'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {isSignup && (
                  <>
                    <input
                      type="text" name="name" placeholder="Full name"
                      className={`w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg}`}
                      value={postInputs.name} onChange={handleChange} required disabled={loading}
                    />
                    <input
                      type="text" name="branch" placeholder="Branch (e.g., CSE)"
                      className={`w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg}`}
                      value={postInputs.branch} onChange={handleChange} required disabled={loading}
                    />
                  </>
                )}

                <input
                  type="text" name="roll_num" placeholder="Roll number (any 6 digits)" inputMode="numeric"
                  className={`w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg}`}
                  value={postInputs.roll_num} onChange={handleChange} required disabled={loading}
                />

                <input
                  type="password" name="password" placeholder="Password (use @)"
                  className={`w-full rounded-md border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputBg}`}
                  value={postInputs.password} onChange={handleChange} required disabled={loading}
                />

                <button
                  type="submit"
                  className={`w-full rounded-md py-2 text-white font-bold transition shadow-lg ${
                    loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
                  }`}
                  disabled={loading}
                >
                  {loading ? (isSignup ? 'Signing up...' : 'Signing in...') : (isSignup ? 'Sign Up' : 'Sign In')}
                </button>
              </form>

              {error && <p className="mt-3 text-center text-sm text-red-500 font-medium">{error}</p>}

              {/* Footer hint */}
              <p className={`relative mt-6 rounded-md ${guideBg} p-3 text-xs ${subTextColor} border`}>
                By continuing, the account will be created using the provided roll number and password.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudentAuth;
import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate, Link } from 'react-router-dom';
import { Appbar } from '../../components/Appbar';
import { useTheme } from '../../context/ThemeContext';

const TeacherAuth: React.FC = () => {
  const { darkMode } = useTheme();
  const [isSignup, setIsSignup] = useState(true);
  const [postInputs, setPostInputs] = useState({
    name: '',
    email: '',
    password: '',
    dept: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGuide, setShowGuide] = useState(true);
  const navigate = useNavigate();

  // --- THEME TOKENS ---
  const pageBg = darkMode ? "bg-[#1E293B]" : "bg-gradient-to-b from-slate-50 to-slate-100";
  const cardBg = darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-slate-200";
  const headingColor = darkMode ? "text-white" : "text-[#1E293B]";
  const subTextColor = darkMode ? "text-slate-400" : "text-slate-600";
  const inputStyle = darkMode 
    ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-600 focus:border-blue-500" 
    : "bg-white border-slate-200 text-slate-900";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInputs({ ...postInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isSignup ? '/signup' : '/signin';
      const payload = isSignup
        ? postInputs
        : { email: postInputs.email, password: postInputs.password };

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/admin${endpoint}`,
        payload
      );

      const token = response.data.jwt;
      const teacherId = response.data.teacherId;

      localStorage.setItem('jwt', token);
      localStorage.setItem('teacherId', String(teacherId));
      localStorage.setItem('userRole', 'teacher');


      navigate('/teacher/classes');
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
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Left: Intro / Guide */}
          <section className={`rounded-2xl border p-6 shadow-xl md:p-8 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <h1 className={`text-3xl font-black tracking-tighter ${headingColor}`}>
                Instructor Portal
              </h1>
              <Link
                to="/student/home"
                className="text-sm font-bold text-blue-500 hover:text-blue-400 transition"
              >
                Switch to Student
              </Link>
            </div>

            <p className={`mt-3 text-sm font-medium ${subTextColor}`}>
              Build your digital classroom and evaluate code in real-time.
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                <span className={darkMode ? "text-slate-300" : "text-slate-700"}>
                  Generate join codes for instant student enrollment.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                <span className={darkMode ? "text-slate-300" : "text-slate-700"}>
                  Craft custom problems with expected output validation.
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={() => setShowGuide((v) => !v)}
                className="text-xs font-bold uppercase tracking-widest text-blue-500 hover:underline"
              >
                {showGuide ? 'Hide' : 'Show'} Onboarding Guide
              </button>

              {showGuide && (
                <div className={`mt-4 overflow-hidden rounded-xl border p-5 text-sm animate-in fade-in slide-in-from-top-2 ${
                  darkMode ? "bg-slate-900/50 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-700"
                }`}>
                  <ol className="list-decimal space-y-3 pl-5 font-medium">
                    <li>Create an instructor account.</li>
                    <li>Initialize a class and share the unique join code.</li>
                    <li>Create assignments and populate them with problems.</li>
                    <li>Monitor real-time student submission history.</li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* Right: Auth Card */}
          <section className={`relative overflow-hidden rounded-2xl border p-6 shadow-2xl md:p-8 ${cardBg}`}>
            {/* Ambient Glow Effects */}
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-xl font-bold ${headingColor}`}>
                  {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                <button
                  onClick={() => setIsSignup((v) => !v)}
                  className="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400"
                  disabled={loading}
                >
                  {isSignup ? 'Sign In Instead' : 'Sign Up Instead'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      title="Full name"
                      placeholder="Full name"
                      className={`w-full rounded-lg border px-4 py-3 outline-none transition-all ${inputStyle}`}
                      value={postInputs.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <input
                      type="text"
                      name="dept"
                      title="Department"
                      placeholder="Department"
                      className={`w-full rounded-lg border px-4 py-3 outline-none transition-all ${inputStyle}`}
                      value={postInputs.dept}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                )}

                <input
                  type="email"
                  name="email"
                  title="Email Address"
                  placeholder="Email Address"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition-all ${inputStyle}`}
                  value={postInputs.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  name="password"
                  title="Password"
                  placeholder="Password"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition-all ${inputStyle}`}
                  value={postInputs.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <button
                  type="submit"
                  className={`w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : isSignup ? 'Initialize Account' : 'Access Portal'}
                </button>
              </form>

              {error && (
                <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-xs font-bold text-red-500">
                  {error}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TeacherAuth;
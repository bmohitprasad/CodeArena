import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate, Link } from 'react-router-dom';
import { Appbar } from '../../components/Appbar';

const StudentAuth: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isSignup ? '/signup' : '/signin';
      const payload = isSignup
        ? postInputs
        : { roll_num: postInputs.roll_num, password: postInputs.password };

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/student${endpoint}`,
        payload
      );

      const token = response.data.jwt;
      const studentId = response.data.roll_num;

      localStorage.setItem('jwt', token);
      localStorage.setItem('studentId', String(studentId));

      navigate('/student/classes');
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Appbar />

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Intro / Guide */}
          <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to CodeArena
              </h1>
              <Link
                to="/teacher/home"
                className="text-sm text-blue-600 hover:underline"
                aria-label="Switch to Teacher"
              >
                Switch to Teacher
              </Link>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              This is the student portal for joining classes, viewing assignments,
              and writing code solutions with live execution and submission history.
            </p>

            {/* Highlights */}
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                Join classes with a join code shared by the instructor.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                Access assignments and solve problems in the built‑in editor.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                Save attempts, view history, and submit when ready.
              </li>
            </ul>

            {/* Collapsible guide */}
            <div className="mt-6">
              <button
                onClick={() => setShowGuide((v) => !v)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showGuide ? 'Hide' : 'Show'} quick guide
              </button>

              {showGuide && (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Create an account or sign in below.</li>
                    <li>Open “Classes” → use the join code from the teacher.</li>
                    <li>Go to “Assignments” → pick a problem to solve.</li>
                    <li>Run code to test, then submit when confident.</li>
                  </ol>
                  <p className="mt-3 text-xs text-slate-500">
                    Tip: Keep the JWT token secure; it’s used to access class resources.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right: Auth Card */}
          <section className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-100 opacity-60 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-indigo-100 opacity-60 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {isSignup ? 'Student Sign Up' : 'Student Sign In'}
                </h2>
                <button
                  onClick={() => setIsSignup((v) => !v)}
                  className="text-sm text-blue-600 hover:underline"
                  disabled={loading}
                >
                  {isSignup ? 'Use existing account' : 'Create new account'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {isSignup && (
                  <>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      className="w-full rounded-md border px-4 py-2"
                      value={postInputs.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                    <input
                      type="text"
                      name="branch"
                      placeholder="Branch (e.g., CSE)"
                      className="w-full rounded-md border px-4 py-2"
                      value={postInputs.branch}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </>
                )}

                <input
                  type="text"
                  name="roll_num"
                  placeholder="Roll number"
                  inputMode="numeric"
                  className="w-full rounded-md border px-4 py-2"
                  value={postInputs.roll_num}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-md border px-4 py-2"
                  value={postInputs.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <button
                  type="submit"
                  className={`w-full rounded-md py-2 text-white transition ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={loading}
                >
                  {loading
                    ? isSignup
                      ? 'Signing up...'
                      : 'Signing in...'
                    : isSignup
                    ? 'Sign Up'
                    : 'Sign In'}
                </button>
              </form>

              {error && (
                <p className="mt-3 text-center text-sm text-red-600">{error}</p>
              )}

              {loading && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
                  <svg
                    className="h-4 w-4 animate-spin text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>
                    {isSignup ? 'Creating account...' : 'Authenticating...'}
                  </span>
                </div>
              )}

              {/* Footer hint */}
              <p className="relative mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                By continuing, the account will be created using the provided
                roll number and password. Make sure the roll number matches your
                institution records.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StudentAuth;

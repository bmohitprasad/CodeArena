import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate, Link } from 'react-router-dom';
import { Appbar } from '../../components/Appbar';

const TeacherAuth: React.FC = () => {
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

      navigate('/teacher/classes');
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
                Instructor Portal
              </h1>
              <Link
                to="/student/home"
                className="text-sm text-blue-600 hover:underline"
                aria-label="Switch to Student"
              >
                Switch to Student
              </Link>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Create classes, publish assignments, and review student code
              submissions with version history and quick feedback tools.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span>
                Generate join codes so students can enroll instantly.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span>
                Add problems with starter code and custom inputs.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500"></span>
                View latest attempts, run outputs, and mark completion.
              </li>
            </ul>

            <div className="mt-6">
              <button
                onClick={() => setShowGuide((v) => !v)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showGuide ? 'Hide' : 'Show'} getting started
              </button>

              {showGuide && (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>Create an account or sign in below.</li>
                    <li>Create a class → share the join code with students.</li>
                    <li>Publish an assignment → add problems.</li>
                    <li>Review submissions and provide feedback.</li>
                  </ol>
                  <p className="mt-3 text-xs text-slate-500">
                    Tip: Keep class names and problem statements concise and
                    consistent for easier navigation.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right: Auth Card */}
          <section className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-100 opacity-60 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-pink-100 opacity-60 blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {isSignup ? 'Teacher Sign Up' : 'Teacher Sign In'}
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
                      name="dept"
                      placeholder="Department"
                      className="w-full rounded-md border px-4 py-2"
                      value={postInputs.dept}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-md border px-4 py-2"
                  value={postInputs.email}
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

              <p className="relative mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                Use an institutional email for faster class verification and to
                avoid access issues for students joining via code.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TeacherAuth;

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
        : {
            email: postInputs.email,
            password: postInputs.password
          };

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
    <div className="flex h-screen">
      <div className="flex-1">
        <Appbar />
        <div className="flex flex-col h-screen items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {isSignup ? 'Teacher Sign Up' : 'Teacher Sign In'}
              </h2>
              <Link
                to="/student/home"
                className="text-sm text-blue-600 hover:underline"
                aria-label="Switch to Student"
              >
                Switch to Student
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {isSignup && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full px-4 py-2 border rounded-md"
                    value={postInputs.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <input
                    type="text"
                    name="dept"
                    placeholder="Department"
                    className="w-full px-4 py-2 border rounded-md"
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
                className="w-full px-4 py-2 border rounded-md"
                value={postInputs.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                value={postInputs.password}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <button
                type="submit"
                className={`w-full text-white py-2 rounded-md transition ${
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
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}

            <p className="text-center mt-6 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 hover:underline"
                disabled={loading}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>

            {loading && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg
                  className="animate-spin h-4 w-4 text-blue-600"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>
                  {isSignup ? 'Creating account...' : 'Authenticating...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAuth;

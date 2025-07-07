import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../../components/Appbar';

const TeacherAuth: React.FC = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [postInputs, setPostInputs] = useState({
    name: '',
    email: '',
    password: '',
    dept: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInputs({ ...postInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {

      const endpoint = isSignup ? '/signup' : '/signin';
      const payload = isSignup
        ? postInputs
        : { 
            email: postInputs.email,
            password: postInputs.password
          };

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/admin${endpoint}`, payload);
      
      const token = response.data.jwt
      
      const teacherId = response.data.teacherId
      const ID = teacherId.toString()
      
      // console.log(teacherId);
      
      localStorage.setItem("jwt", token);
      localStorage.setItem("teacherId", ID);
      localStorage.setItem("teacherId", ID);

      navigate("/teacher/classes");

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Appbar/>
        <div className="flex flex-col h-screen items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {isSignup ? 'Teacher Sign Up' : 'Teacher Sign In'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  />
                  <input
                    type="text"
                    name="dept"
                    placeholder="Department"
                    className="w-full px-4 py-2 border rounded-md"
                    value={postInputs.dept}
                    onChange={handleChange}
                    required
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
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                value={postInputs.password}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                {isSignup ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

            <p className="text-center mt-6 text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 hover:underline"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAuth;

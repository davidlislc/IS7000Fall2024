import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser  (credentials) {
  const response = await axios.post('http://3.218.8.102/api/authenticate', credentials);
  const { id_token } = response.data;
  return id_token;
}

async function requestPasswordReset(email) {
  await axios.post('paste your api for reset password', { email });
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser ({ username, password });
    setToken(token);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await requestPasswordReset(email);
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#efc8ce] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-2xl font-bold mb-6">{showForgotPassword ? 'Forgot Password?' : 'Please Log In'}</h1>
        {!showForgotPassword ? (
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Username</span>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>
            <div className="flex justify-between items-center">
              <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600">
                Submit
              </button>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <label className="block mb-4">
              <span className="text-gray-700">Enter your email:</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>
            <div className="flex justify-center">
              <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600">
                Send Reset Link
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

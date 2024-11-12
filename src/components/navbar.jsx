import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Logout handler to show an alert and redirect to Home
  const handleLogout = () => {
    alert('You have been logged out.');
    // You can add any other logout logic here (e.g., clearing session or token)
    navigate('/'); // Redirect to Home page
  };

  return (
    <nav className="bg-gray-800 p-4 w-full fixed top-0 left-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side buttons */}
        <div className="flex space-x-8">
          <Link to="/" className="text-white bg-gray-800 hover:bg-gray-600 hover:text-white text-lg font-semibold px-4 py-2 rounded-md transition duration-300">
            Home
          </Link>
          <Link to="/dashboard" className="text-white bg-gray-800 hover:bg-gray-600 hover:text-white text-lg font-semibold px-4 py-2 rounded-md transition duration-300">
            Dashboard
          </Link>
          <Link to="/wallet" className="text-white bg-gray-800 hover:bg-gray-600 hover:text-white text-lg font-semibold px-4 py-2 rounded-md transition duration-300">
            Wallet
          </Link>
          <Link to="/subscription" className="text-white bg-gray-800 hover:bg-gray-600 hover:text-white text-lg font-semibold px-4 py-2 rounded-md transition duration-300">
            Subscription
          </Link>
          <Link to="/admin" className="text-white bg-gray-800 hover:bg-gray-600 hover:text-white text-lg font-semibold px-4 py-2 rounded-md transition duration-300">
            Admin
          </Link>
        </div>

        {/* Right side Login and Logout buttons */}
        <div className="flex space-x-4">
          {/* Login Button as a Link */}
          <Link to="/login" className="text-white text-lg font-semibold bg-green-600 hover:bg-green-700 hover:scale-105 px-4 py-2 rounded-md transition duration-300">
            Login
          </Link>

          {/* Logout Button with alert and redirection */}
          <button
            onClick={handleLogout}
            className="text-white text-lg font-semibold bg-red-600 hover:bg-red-700 hover:scale-105 px-4 py-2 rounded-md transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) return null;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-2xl font-bold flex items-center">
            <span className="bg-white text-indigo-600 px-2 py-1 rounded mr-1">Job</span>
            <span className="text-yellow-300">Hunt</span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/" 
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Home
            </Link>

            <Link 
              to="/jobs/all-jobs" 
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Jobs List
            </Link>
            
            <Link 
              to="/jobs/create" 
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              Create Job
            </Link>
            
            <Link 
              to="/jobs/my-jobs"  
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              My Jobs
            </Link>

            <Link 
              to="/about" 
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              About
            </Link>
            

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 font-semibold">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-white hover:bg-gray-100 text-indigo-600 px-4 py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 font-semibold">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-indigo-700">
          <Link 
            to="/" 
            className="block text-white hover:text-yellow-300 py-2 border-b border-indigo-500 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          
          <Link
            to="/jobs/all-jobs"
            className="block text-white hover:text-yellow-300 py-2 border-b border-indigo-500 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            Jobs List
          </Link>
          
          <Link
            to="/jobs/create"
            className="block text-white hover:text-yellow-300 py-2 border-b border-indigo-500 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            Create Job
          </Link>
          
          <Link 
            to="/jobs/my-jobs"  
            className="block text-white hover:text-yellow-300 py-2 border-b border-indigo-500 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            My Jobs
          </Link>

          <Link 
            to="/about" 
            className="block text-white hover:text-yellow-300 py-2 border-b border-indigo-500 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
         

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-white hover:text-yellow-300 py-2 font-semibold transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="pt-2 space-y-3">
              <Link 
                to="/login" 
                className="block bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-center py-2 rounded-lg font-semibold transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              
              <Link 
                to="/register" 
                className="block bg-white hover:bg-gray-100 text-indigo-600 text-center py-2 rounded-lg font-semibold transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight"
        >
          Job<span className="text-white">Hunt</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/jobs/all-jobs" label="Jobs" />
          <NavLink to="/jobs/create" label="Create" />
          <NavLink to="/jobs/my-jobs" label="My Jobs" />
          <NavLink to="/about" label="About" />

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 px-5 py-2 rounded-lg font-semibold text-white transition-transform duration-200 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold transition-transform duration-200 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-transform duration-200 hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-gray-900/95 border-t border-gray-800 px-5 pb-5 space-y-4 text-white"
          >
            <MobileLink setOpen={setOpen} to="/" label="Home" />
            <MobileLink setOpen={setOpen} to="/jobs/all-jobs" label="Jobs" />
            <MobileLink setOpen={setOpen} to="/jobs/create" label="Create Job" />
            <MobileLink setOpen={setOpen} to="/jobs/my-jobs" label="My Jobs" />
            <MobileLink setOpen={setOpen} to="/about" label="About" />

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 py-2 rounded-lg font-semibold mt-2"
              >
                Logout
              </button>
            ) : (
              <div className="pt-2 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-center py-2 rounded-lg font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block bg-white text-gray-900 text-center py-2 rounded-lg font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-200 hover:text-cyan-400 font-medium transition-all duration-300"
  >
    {label}
  </Link>
);

const MobileLink = ({ to, label, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="block text-gray-200 hover:text-cyan-400 border-b border-gray-800 pb-2"
  >
    {label}
  </Link>
);

export default Navbar;

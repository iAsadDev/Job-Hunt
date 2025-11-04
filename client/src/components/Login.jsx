import React, { useState, useContext } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );
      setToken(res.data.token);
      loginSuccess();
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.6)] p-8 md:p-10"
      >
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Sign In
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6 text-sm text-center font-medium border border-red-400/30"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={load}
            className={`w-full py-3 rounded-xl font-semibold text-lg flex justify-center items-center transition-all duration-300 ${
              load
                ? "bg-cyan-500/40 text-white/70 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20"
            }`}
          >
            {load ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Signing in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-8">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
      const res = await axios.post("http://localhost:4000/api/auth/login", form);
      setToken(res.data.token);
      loginSuccess();
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.log(err)
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 md:p-10 text-white transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-sm">
          Welcome Back ✨
        </h2>

        {error && (
          <div className="bg-red-200 text-red-800 p-3 rounded-lg mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              load
                ? "bg-white/30 text-white cursor-not-allowed"
                : "bg-white text-indigo-600 hover:bg-indigo-100"
            }`}
            disabled={load}
          >
            {load ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-white/80 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-white font-medium underline hover:text-indigo-100">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;


// export default Form;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import scanner from "../scanner";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData =
        method === "login"
          ? { username, password }
          : { username, email, password };

      const res = await scanner.post(route, requestData);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/home");
      } else {
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      alert(
        `Error during ${name.toLowerCase()}: ${
          error.response?.data?.detail || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Blurred Neon Circles */}
      <div className="absolute w-72 h-72 bg-cyan-500 opacity-10 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full bottom-10 right-10" />

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-gray-700 shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-shadow rounded-3xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text tracking-wide mb-8 drop-shadow-lg">
          {name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/20 transition duration-200"
            />
          </div>

          {/* Email */}
          {method === "register" && (
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/20 transition duration-200"
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/20 transition duration-200"
            />
          </div>

          {loading && <LoadingIndicator />}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition duration-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : name}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          {method === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() =>
              navigate(method === "login" ? "/register" : "/login")
            }
          >
            {method === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Form;

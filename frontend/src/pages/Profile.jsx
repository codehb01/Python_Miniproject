import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaSignInAlt,
} from "react-icons/fa";
import scanner from "../scanner";
import LoadingIndicator from "../components/LoadingIndicator";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await scanner.get("/scanner/profile/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        const errorMessage =
          err.response?.data?.detail ||
          err.message ||
          "Failed to fetch profile";
        setError(errorMessage);
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (loading) return <LoadingIndicator />;
  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="text-center text-red-400">
          <p className="text-lg">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center py-10 px-4 relative overflow-hidden">
      <Navbar />
      {/* Background Effects */}
      <div className="absolute w-80 h-80 bg-cyan-500 opacity-10 blur-3xl rounded-full top-20 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full bottom-20 right-10 animate-pulse delay-1000" />

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/10 border border-gray-700 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/10 p-8 mt-10 z-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
          User Profile
        </h1>
        {user && (
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-500/30">
                <span className="text-4xl md:text-5xl text-cyan-400">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">
                  {user.username}
                </h2>
                <p className="flex items-center text-gray-300">
                  <FaEnvelope className="mr-2 text-cyan-400" />
                  {user.email || "Not provided"}
                </p>
                <p className="flex items-center text-sm text-gray-400">
                  <FaShieldAlt className="mr-2 text-cyan-400" />
                  Role: {user.role || "Standard User"}
                </p>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-gray-700 shadow-inner">
              <h3 className="text-lg font-medium text-cyan-300 mb-4">
                Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-cyan-400" />
                  <strong>Joined:</strong>{" "}
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="flex items-center">
                  <FaSignInAlt className="mr-2 text-cyan-400" />
                  <strong>Last Login:</strong>{" "}
                  {user.last_login
                    ? new Date(user.last_login).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Never"}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/settings")}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Edit Profile
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Profile;

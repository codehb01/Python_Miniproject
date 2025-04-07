// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-black/80 backdrop-blur-lg" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="w-8 h-8 rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-2 shadow-lg shadow-cyan-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all">
            ScanSecure
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {!token ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                  isActive("/login")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Login
                {isActive("/login") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                )}
              </Link>
              <Link
                to="/register"
                className="ml-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/home"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                  isActive("/home")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Dashboard
                {isActive("/home") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 text-sm font-medium border border-gray-700 rounded-md text-gray-300 hover:border-cyan-500 hover:text-white transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Subtle top border/glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
    </nav>
  );
}

export default Navbar;

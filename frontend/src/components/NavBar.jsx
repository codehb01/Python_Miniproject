import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  ); // Theme state
  const navbarRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Handle scroll events with debouncing
  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 10);
      setVisible(
        prevScrollPos > currentScrollPos ||
          currentScrollPos < 10 ||
          mobileMenuOpen
      );
      setPrevScrollPos(currentScrollPos);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, mobileMenuOpen]);

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Dark mode toggle effect
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Handle click outside to close dropdowns and menu
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target) &&
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
      setProfileDropdownOpen(false);
      setNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock user data (replace with API call in a real app)
  const user = token
    ? { username: "JohnDoe", email: "john@example.com", role: "Admin" }
    : null;

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-7xl z-50 transition-all duration-300 ease-in-out rounded-xl shadow-lg group ${
        scrolled
          ? "bg-white/60 dark:bg-gray-900/60 border border-gray-300/50 dark:border-gray-700/50 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-white/40 dark:bg-gray-900/40 border border-gray-200/30 dark:border-gray-800/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] animate-float"
      } ${
        !visible && !mobileMenuOpen ? "-translate-y-[120%]" : "translate-y-0"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go to homepage"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-blue-500/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6 text-white transition-transform duration-300 group-hover:scale-110"
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
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-300 animate-gradient-text">
            ScanSecure
          </span>
        </Link>

        {/* Search Bar (Commented out as per your code) */}
        {/* {token && (
          <div className="hidden md:block w-1/3">
            <input
              type="text"
              placeholder="Search URLs or scans..."
              className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              aria-label="Search scans"
            />
          </div>
        )} */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-md transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-6 flex flex-col items-center space-y-1">
            <span
              className={`block h-0.5 w-5 rounded-full bg-blue-500 dark:bg-purple-500 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-5 rounded-full bg-blue-500 dark:bg-purple-500 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-5 rounded-full bg-blue-500 dark:bg-purple-500 transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation and User Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {!token ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-transform hover:scale-105 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative group ${
                  isActive("/login") ? "text-blue-500 dark:text-purple-400" : ""
                }`}
                aria-current={isActive("/login") ? "page" : undefined}
              >
                Login
                {isActive("/login") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                )}
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50 active:scale-95 animate-bounce-once hover:animate-glow"
                aria-label="Register for an account"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-transform hover:scale-105 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative group ${
                  isActive("/dashboard")
                    ? "text-blue-500 dark:text-purple-400"
                    : ""
                }`}
                aria-current={isActive("/dashboard") ? "page" : undefined}
              >
                Dashboard
                {isActive("/dashboard") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                )}
              </Link>
              <Link
                to="/home"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-transform hover:scale-105 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative group ${
                  isActive("/home") ? "text-blue-500 dark:text-purple-400" : ""
                }`}
                aria-current={isActive("/home") ? "page" : undefined}
              >
                Home
                {isActive("/home") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                )}
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 relative group"
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                >
                  <FaBell className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow"></span>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/60 dark:bg-gray-900/60 border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-lg py-2 backdrop-blur-lg z-20 animate-scale-in">
                    <h3 className="px-4 py-2 text-sm font-semibold text-cyan-400 border-b border-gray-700">
                      Notifications
                    </h3>
                    <ul className="text-sm text-gray-400">
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        New scan completed for example.com
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        High severity vulnerability detected
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        System update available
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 relative group"
                  aria-label="User profile"
                  aria-expanded={profileDropdownOpen}
                >
                  <FaUser className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow"></span>
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/60 dark:bg-gray-900/60 border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-lg py-2 backdrop-blur-lg z-20 animate-scale-in">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 relative group"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <FaSun className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <FaMoon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                )}
                <span className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow"></span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 z-10 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center space-y-6 py-8">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/login")
                      ? "text-blue-500 dark:text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/login") ? "page" : undefined}
                >
                  Login
                  {isActive("/login") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                  )}
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/50 active:scale-95 animate-bounce-once hover:animate-glow"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Register for an account"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/dashboard")
                      ? "text-blue-500 dark:text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/dashboard") ? "page" : undefined}
                >
                  Dashboard
                  {isActive("/dashboard") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                  )}
                </Link>
                <Link
                  to="/home"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/home")
                      ? "text-blue-500 dark:text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/home") ? "page" : undefined}
                >
                  Home
                  {isActive("/home") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/profile")
                      ? "text-blue-500 dark:text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/profile") ? "page" : undefined}
                >
                  Profile
                  {isActive("/profile") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                  )}
                </Link>
                <Link
                  to="/notifications"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/notifications")
                      ? "text-blue-500 dark:text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/notifications") ? "page" : undefined}
                >
                  Notifications
                  {isActive("/notifications") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                  )}
                </Link>
                <Link
                  to="/settings"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/settings")
                      ? "text-blue-500 dark:text-purple-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/settings") ? "page" : undefined}
                >
                  Settings
                  {isActive("/settings") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient"></span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 text-lg font-medium bg-red-500 text-white rounded-md transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 active:scale-95 animate-bounce-once hover:animate-glow flex items-center space-x-2"
                  aria-label="Logout"
                >
                  <span>Logout</span>
                  <FaSignOutAlt className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Enhanced bottom border with animation */}
        <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent relative">
            <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Custom animations with Tailwind-compatible keyframes
const styles = `
  @keyframes gradient {
    0% { transform: scaleX(0); transform-origin: left; }
    50% { transform: scaleX(1); transform-origin: left; }
    51% { transform-origin: right; }
    100% { transform: scaleX(0); transform-origin: right; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes bounceOnce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
    100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
  }
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-gradient {
    animation: gradient 2s infinite ease-in-out;
  }
  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }
  .animate-bounce-once {
    transition: transform 0.2s ease;
  }
  .animate-bounce-once:hover {
    animation: bounceOnce 0.4s ease;
  }
  .animate-gradient-text {
    background-size: 200% 200%;
    animation: gradientText 4s ease infinite;
  }
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  .animate-float {
    animation: float 3s infinite ease-in-out;
  }
  .animate-pulse-glow {
    animation: pulseGlow 2s infinite linear;
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Navbar;
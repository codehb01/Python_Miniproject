
// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Handle navbar background change and visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Background change on scroll
      if (currentScrollPos > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10 || mobileMenuOpen;
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-black/80 backdrop-blur-lg shadow-lg shadow-black/10" : "py-4 bg-transparent"
      } ${!visible && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group z-20">
          <div className="w-8 h-8 rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-2 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-12">
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-20 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 flex flex-col items-end space-y-1.5">
            <span className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'}`}></span>
            <span className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5'}`}></span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {!token ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
                  isActive("/login")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="relative z-10">Login</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${isActive("/login") ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </Link>
              <Link
                to="/register"
                className="ml-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:translate-y-0.5 active:translate-y-1"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
                  isActive("/dashboard")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="relative z-10">Dashboard</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${isActive("/dashboard") ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </Link>
              <Link
                to="/home"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
                  isActive("/home")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="relative z-10">Home</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${isActive("/home") ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-5 py-2 text-sm font-medium border border-gray-700 rounded-md text-gray-300 hover:border-cyan-500 hover:text-white transition-all hover:bg-gray-900/50 group"
              >
                <span className="flex items-center">
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
                  </svg>
                </span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 z-10 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center space-y-6 py-8">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/login") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                  {isActive("/login") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-lg shadow-cyan-500/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/dashboard") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                  {isActive("/dashboard") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <Link
                  to="/home"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/home") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                  {isActive("/home") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 text-lg font-medium border border-gray-700 rounded-md text-gray-300 hover:border-cyan-500 transition-all flex items-center space-x-2"
                >
                  <span>Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced bottom border with animation */}
      <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent relative">
          <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent animate-pulse-glow"></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
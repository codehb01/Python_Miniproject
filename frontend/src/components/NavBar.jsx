
// // src/components/Navbar.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem("access");
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);

//   // Handle navbar background change and visibility on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
      
//       // Background change on scroll
//       if (currentScrollPos > 10) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
      
//       // Hide navbar when scrolling down, show when scrolling up
//       const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10 || mobileMenuOpen;
//       setVisible(isVisible);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollPos, mobileMenuOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setMobileMenuOpen(false);
//     navigate("/login");
//   };

//   // Check if link is active
//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "py-2 bg-black/80 backdrop-blur-lg shadow-lg shadow-black/10" : "py-4 bg-transparent"
//       } ${!visible && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"}`}
//     >
//       <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex items-center group z-20">
//           <div className="w-8 h-8 rounded bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-2 shadow-lg shadow-cyan-500/20 transition-all duration-500 group-hover:rotate-12">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//               />
//             </svg>
//           </div>
//           <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all">
//             ScanSecure
//           </span>
//         </Link>

//         {/* Mobile Menu Button */}
//         <button 
//           className="md:hidden z-20 focus:outline-none"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <div className="w-6 flex flex-col items-end space-y-1.5">
//             <span className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${mobileMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'}`}></span>
//             <span className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
//             <span className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${mobileMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5'}`}></span>
//           </div>
//         </button>

//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex items-center space-x-1">
//           {!token ? (
//             <>
//               <Link
//                 to="/login"
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
//                   isActive("/login")
//                     ? "text-cyan-400"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <span className="relative z-10">Login</span>
//                 <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${isActive("/login") ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
//                 <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
//               </Link>
//               <Link
//                 to="/register"
//                 className="ml-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:translate-y-0.5 active:translate-y-1"
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/dashboard"
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
//                   isActive("/dashboard")
//                     ? "text-cyan-400"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <span className="relative z-10">Dashboard</span>
//                 <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${isActive("/dashboard") ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
//                 <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
//               </Link>
//               <Link
//                 to="/home"
//                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
//                   isActive("/home")
//                     ? "text-cyan-400"
//                     : "text-gray-300 hover:text-white"
//                 }`}
//               >
//                 <span className="relative z-10">Home</span>
//                 <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${isActive("/home") ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
//                 <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="ml-2 px-5 py-2 text-sm font-medium border border-gray-700 rounded-md text-gray-300 hover:border-cyan-500 hover:text-white transition-all hover:bg-gray-900/50 group"
//               >
//                 <span className="flex items-center">
//                   Logout
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
//                   </svg>
//                 </span>
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div 
//           className={`fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 z-10 ${
//             mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//           }`}
//         >
//           <div className="flex flex-col items-center space-y-6 py-8">
//             {!token ? (
//               <>
//                 <Link
//                   to="/login"
//                   className={`px-6 py-3 text-lg font-medium transition-all relative ${
//                     isActive("/login") ? "text-cyan-400" : "text-gray-300"
//                   }`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Login
//                   {isActive("/login") && (
//                     <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
//                   )}
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-lg shadow-cyan-500/20"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/dashboard"
//                   className={`px-6 py-3 text-lg font-medium transition-all relative ${
//                     isActive("/dashboard") ? "text-cyan-400" : "text-gray-300"
//                   }`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Dashboard
//                   {isActive("/dashboard") && (
//                     <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
//                   )}
//                 </Link>
//                 <Link
//                   to="/home"
//                   className={`px-6 py-3 text-lg font-medium transition-all relative ${
//                     isActive("/home") ? "text-cyan-400" : "text-gray-300"
//                   }`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Home
//                   {isActive("/home") && (
//                     <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
//                   )}
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="px-8 py-3 text-lg font-medium border border-gray-700 rounded-md text-gray-300 hover:border-cyan-500 transition-all flex items-center space-x-2"
//                 >
//                   <span>Logout</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
//                   </svg>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced bottom border with animation */}
//       <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
//         <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent relative">
//           <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent animate-pulse-glow"></div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa"; // Icons from react-icons

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "py-2 bg-black/80 backdrop-blur-xl shadow-xl shadow-black/15"
          : "py-4 bg-gradient-to-b from-black/50 to-transparent"
      } ${!visible && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group z-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Go to homepage"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mr-3 shadow-lg shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
            ScanSecure
          </span>
        </Link>

        {/* Search Bar
        {token && (
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
          className="md:hidden z-20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-7 flex flex-col items-end space-y-1.5">
            <span
              className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${
                mobileMenuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
              }`}
            ></span>
            <span
              className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "w-4"
              }`}
            ></span>
            <span
              className={`block h-0.5 rounded-full bg-cyan-500 transition-all duration-300 ${
                mobileMenuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation and User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
                  isActive("/login")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
                aria-current={isActive("/login") ? "page" : undefined}
              >
                <span className="relative z-10">Login</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    isActive("/login")
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
                <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
                aria-label="Register for an account"
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
                aria-current={isActive("/dashboard") ? "page" : undefined}
              >
                <span className="relative z-10">Dashboard</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    isActive("/dashboard")
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
                <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </Link>
              <Link
                to="/home"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden group ${
                  isActive("/home")
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-white"
                }`}
                aria-current={isActive("/home") ? "page" : undefined}
              >
                <span className="relative z-10">Home</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    isActive("/home")
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                ></span>
                <span className="absolute inset-0 w-full h-full bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                >
                  <FaBell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-black/90 border border-gray-700 rounded-lg shadow-lg py-2 z-20 animate-fade-in">
                    <h3 className="px-4 py-2 text-sm font-semibold text-cyan-400 border-b border-gray-700">
                      Notifications
                    </h3>
                    <ul className="text-sm text-gray-300">
                      <li className="px-4 py-2 hover:bg-gray-800">
                        New scan completed for example.com
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-800">
                        High severity vulnerability detected
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-800">
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
                  className="p-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"
                  aria-label="User profile"
                  aria-expanded={profileDropdownOpen}
                >
                  <FaUser className="h-5 w-5" />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-700 rounded-lg shadow-lg py-2 z-20 animate-fade-in">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-400"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-400"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-red-400 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
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
                    isActive("/login") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/login") ? "page" : undefined}
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
                    isActive("/dashboard") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/dashboard") ? "page" : undefined}
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
                  aria-current={isActive("/home") ? "page" : undefined}
                >
                  Home
                  {isActive("/home") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/profile") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/profile") ? "page" : undefined}
                >
                  Profile
                  {isActive("/profile") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <Link
                  to="/notifications"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/notifications")
                      ? "text-cyan-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/notifications") ? "page" : undefined}
                >
                  Notifications
                  {isActive("/notifications") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <Link
                  to="/settings"
                  className={`px-6 py-3 text-lg font-medium transition-all relative ${
                    isActive("/settings") ? "text-cyan-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive("/settings") ? "page" : undefined}
                >
                  Settings
                  {isActive("/settings") && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 text-lg font-medium border border-gray-700 rounded-md text-gray-300 hover:border-cyan-500 transition-all flex items-center space-x-2"
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

// Animation keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-pulse-glow {
    animation: pulseGlow 2s infinite linear;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Navbar;
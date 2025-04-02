import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-blue-400 font-bold text-2xl">WebScanner</Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-blue-400">Home</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-gray-300 hover:text-blue-400">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-blue-400">Login</Link>
              <Link to="/register" className="bg-blue-400 text-gray-900 px-4 py-2 rounded-md hover:bg-blue-500">
                Register
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-blue-400 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {menuOpen ? (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-2">
          <Link to="/" className="block text-gray-300 hover:text-blue-400">Home</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="block text-gray-300 hover:text-blue-400">Logout</button>
          ) : (
            <>
              <Link to="/login" className="block text-gray-300 hover:text-blue-400">Login</Link>
              <Link to="/register" className="block text-gray-300 hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;



// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { ACCESS_TOKEN } from "../constants";

// function NavBar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     setIsLoggedIn(!!token);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem(ACCESS_TOKEN);
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-dark-bg shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <span className="text-futuristic-blue font-bold text-2xl tracking-wider">
//                 WebScanner
//               </span>
//             </Link>
//           </div>

//           {/* Desktop menu */}
//           <div className="hidden md:flex md:items-center md:space-x-6">
//             <Link
//               to="/"
//               className="text-gray-300 hover:text-futuristic-blue transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Home
//             </Link>

//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-gray-300 hover:text-futuristic-blue transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-300 hover:text-futuristic-blue transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-futuristic-blue text-dark-bg hover:bg-opacity-80 transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-futuristic-blue hover:bg-light-bg focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {menuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-light-bg">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link
//               to="/"
//               className="text-gray-300 hover:text-futuristic-blue block px-3 py-2 rounded-md text-base font-medium"
//               onClick={() => setMenuOpen(false)}
//             >
//               Home
//             </Link>

//             {isLoggedIn ? (
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setMenuOpen(false);
//                 }}
//                 className="text-gray-300 hover:text-futuristic-blue block w-full text-left px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-gray-300 hover:text-futuristic-blue block px-3 py-2 rounded-md text-base font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="text-gray-300 hover:text-futuristic-blue block px-3 py-2 rounded-md text-base font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default NavBar;
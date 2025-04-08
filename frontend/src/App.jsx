// // // import React from "react";
// // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // // import Login from "./pages/Login";
// // // import Register from "./pages/Register";
// // // import Home from "./pages/Home";
// // // import NotFound from "./pages/NotFound";
// // // import ProtectedRoute from "./components/ProtectedRoute";
// // // import LandingPage from "./pages/LandingPage";

// // // // Logout component: Clears localStorage and redirects to login
// // // function LandingPage() {
// // //   localStorage.clear();
// // //   return <Navigate to="/LandingPage" />;
// // // }
// // // function Logout() {
// // //   localStorage.clear();
// // //   return <Navigate to="/login" />;
// // // }

// // // // RegisterAndLogout component: Clears localStorage before showing registration
// // // function RegisterAndLogout() {
// // //   localStorage.clear();
// // //   return <Register />;
// // // }

// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>
// // //         {/* Protected Home Route */}
// // //         <Route
// // //           path="/"
// // //           element={
// // //             <ProtectedRoute>
// // //               <Home />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         {/* Public Routes */}
// // //         <Route path ="/LandingPage" element={<LandingPage />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/logout" element={<Logout />} />
// // //         <Route path="/register" element={<RegisterAndLogout />} />
// // //         {/* Catch-all for 404 */}
// // //         <Route path="*" element={<NotFound />} />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // src/App.jsx
// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Home from "./pages/Home";
// // import NotFound from "./pages/NotFound";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import LandingPage from "./pages/LandingPage";
// // import Navbar from "./components/NavBar";

// // function Logout() {
// //   localStorage.clear();
// //   return <Navigate to="/login" />;
// // }

// // function RegisterAndLogout() {
// //   localStorage.clear();
// //   return <Register />;
// // }

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<LandingPage />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/logout" element={<Logout />} />
// //         <Route path="/register" element={<RegisterAndLogout />} />

// //         <Route
// //           path="/home"
// //           element={
// //             <ProtectedRoute>
// //               <Home />
// //             </ProtectedRoute>
// //           }
// //         />

// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // src/App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";
// import LandingPage from "./pages/LandingPage";
// import Navbar from "./components/NavBar";
// import Dashboard from "./pages/Dashboard"; // <- Added

// function Logout() {
//   localStorage.clear();
//   return <Navigate to="/login" />;
// }

// function RegisterAndLogout() {
//   localStorage.clear();
//   return <Register />;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/register" element={<RegisterAndLogout />} />

//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Something Went Wrong</h1>
            <p className="mt-2">{this.state.error.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Logout Component
function Logout() {
  React.useEffect(() => {
    localStorage.clear();
    // Optional: Clear any other session data if needed
  }, []);
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
          {/* Add padding to account for fixed Navbar */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Home from "./pages/Home";
// // import NotFound from "./pages/NotFound";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // import LandingPage from "./pages/LandingPage";

// // // Logout component: Clears localStorage and redirects to login
// // function LandingPage() {
// //   localStorage.clear();
// //   return <Navigate to="/LandingPage" />;
// // }
// // function Logout() {
// //   localStorage.clear();
// //   return <Navigate to="/login" />;
// // }

// // // RegisterAndLogout component: Clears localStorage before showing registration
// // function RegisterAndLogout() {
// //   localStorage.clear();
// //   return <Register />;
// // }

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Protected Home Route */}
// //         <Route
// //           path="/"
// //           element={
// //             <ProtectedRoute>
// //               <Home />
// //             </ProtectedRoute>
// //           }
// //         />
// //         {/* Public Routes */}
// //         <Route path ="/LandingPage" element={<LandingPage />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/logout" element={<Logout />} />
// //         <Route path="/register" element={<RegisterAndLogout />} />
// //         {/* Catch-all for 404 */}
// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

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

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard"; // <- Added

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

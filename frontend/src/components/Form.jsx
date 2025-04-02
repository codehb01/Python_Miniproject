// import { useState } from "react";
// import scanner from "../scanner";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import "../styles/Form.css";
// import LoadingIndicator from "./LoadingIndicator"; // Assuming this exists

// function Form({ route, method }) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState(""); // Added for registration
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const name = method === "login" ? "Login" : "Register";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (method === "login") {
//         // Login: POST to /api/token/
//         const res = await scanner.post(route, { username, password });
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//         navigate("/");
//       } else {
//         // Register: POST to /api/register/
//         await scanner.post(route, { username, email, password });
//         alert("Registration successful! Please log in.");
//         navigate("/login");
//       }
//     } catch (error) {
//       alert(`Error during ${name.toLowerCase()}: ${error}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-container">
//       <h1>{name}</h1>
//       <input
//         className="form-input"
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       {method === "register" && (
//         <input
//           className="form-input"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//       )}
//       <input
//         className="form-input"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       {loading && <LoadingIndicator />}
//       <button className="form-button" type="submit" disabled={loading}>
//         {loading ? "Processing..." : name}
//       </button>
//     </form>
//   );
// }

// export default Form;

// // Form.jsx
// import { useState } from "react";
// import scanner from "../scanner";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import LoadingIndicator from "./LoadingIndicator";

// function Form({ route, method }) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const name = method === "login" ? "Login" : "Register";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const requestData = method === "login"
//         ? { username, password }
//         : { username, email, password };

//       const res = await scanner.post(route, requestData);

//       if (method === "login") {
//         localStorage.setItem(ACCESS_TOKEN, res.data.access);
//         localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//         navigate("/");
//       } else {
//         alert("Registration successful! Please log in.");
//         navigate("/login");
//       }
//     } catch (error) {
//       alert(`Error during ${name.toLowerCase()}: ${error.response?.data?.detail || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
//         <h1 className="text-2xl font-semibold text-center mb-4">{name}</h1>
//         <input
//           className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         {method === "register" && (
//           <input
//             className="w-full p-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         )}
//         <input
//           className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         {loading && <LoadingIndicator />}
//         <button
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : name}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Form;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import scanner from "../scanner";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

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
        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 pt-16 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#8E24AA,#2196F3)] opacity-50 animate-gradient" />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-xl rounded-lg p-8 relative z-10">
        <h2 className="text-2xl font-bold text-center text-white animate-fadeInDown">
          {name}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <motion.input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100/80 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {method === "register" && (
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100/80 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100/80 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {loading && <LoadingIndicator />}

          <motion.button
            type="submit"
            disabled={loading}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Processing..." : name}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-200 animate-fadeInUp">
          {method === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() =>
              navigate(method === "login" ? "/register" : "/login")
            }
          >
            {method === "login" ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Form;

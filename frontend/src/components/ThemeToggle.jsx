// // src/components/ThemeToggle.js

// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [isDark, setIsDark] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     const html = document.documentElement;
//     if (isDark) {
//       html.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       html.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDark]);

//   return (
//     <button
//       onClick={() => setIsDark(!isDark)}
//       className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white text-black hover:opacity-90 transition"
//     >
//       {isDark ? "🌙 Dark" : "☀️ Light"}
//     </button>
//   );
// }

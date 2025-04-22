import React from "react";

function LoadingIndicator() {
  return (
    <div
      className="flex items-center justify-center gap-3 p-4 bg-white/10 dark:bg-gray-900/10 rounded-lg shadow-lg backdrop-blur-sm"
      aria-label="Loading content, please wait"
    >
      {/* Spinner */}
      <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 dark:border-purple-500 rounded-full animate-spin-smooth"></div>
      
      {/* Gradient Text */}
      <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text">
        Loading...
      </span>
    </div>
  );
}

// Custom animations with Tailwind-compatible keyframes
const styles = `
  @keyframes spinSmooth {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-spin-smooth {
    animation: spinSmooth 1s linear infinite;
  }
  .animate-gradient-text {
    background-size: 200% 200%;
    animation: gradientText 4s ease infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default LoadingIndicator;


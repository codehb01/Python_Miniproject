// src/pages/NotFound.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:underline text-lg font-medium"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

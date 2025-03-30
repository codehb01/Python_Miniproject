import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css"; // Create this for styling

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;

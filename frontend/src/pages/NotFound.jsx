import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h2>
      <p className="text-gray-600 mt-2">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;



// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/NotFound.css"; // Create this for styling

// function NotFound() {
//   return (
//     <div className="not-found">
//       <h2>404 - Page Not Found</h2>
//       <p>Sorry, the page you’re looking for doesn’t exist.</p>
//       <Link to="/">Go back to Home</Link>
//     </div>
//   );
// }

// export default NotFound;

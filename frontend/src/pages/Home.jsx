import { useState, useEffect } from "react";
import scanner from "../scanner";
import ScanResult from "../components/ScanResult";

function Home() {
  const [scans, setScans] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getScans();
  }, []);

  const getScans = () => {
    scanner.get("/scanner/scans/")
      .then(res => setScans(res.data))
      .catch(err => alert(err.response?.data?.error || "Error fetching scans"));
  };

  const createScan = (e) => {
    e.preventDefault();
    setLoading(true);
    scanner.post("/scanner/scans/", { url })
      .then(() => {
        alert("Scan created successfully!");
        getScans();
        setUrl("");
      })
      .catch(err => alert(err.response?.data?.error || "Error creating scan"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Scan a Website</h2>
      <form onSubmit={createScan} className="space-y-3">
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          placeholder="Enter website URL"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          required
          disabled={loading}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-gray-300" disabled={loading}>
          {loading ? "Scanning..." : "Scan Now"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Scan Results</h2>
      {scans.length > 0 ? scans.map((scan) => <ScanResult scan={scan} key={scan.id} />) : <p>No scans yet. Enter a URL to start scanning!</p>}
    </div>
  );
}

export default Home;




// // import { useState, useEffect } from "react";
// // import scanner from "../scanner";
// // import ScanResult from "../components/ScanResult"; // Assuming you'll create this component
// // import "../styles/Home.css"; // Reuse or adapt the CSS

// // function Home() {
// //   const [scans, setScans] = useState([]);
// //   const [url, setUrl] = useState("");

// //   useEffect(() => {
// //     getScans();
// //   }, []);

// //   const getScans = () => {
// //     scanner
// //       .get("/scanner/scans/")
// //       .then((res) => res.data)
// //       .then((data) => {
// //         setScans(data);
// //         console.log(data);
// //       })
// //       .catch((err) => alert("Error fetching scans: " + err));
// //   };

// //   const createScan = (e) => {
// //     e.preventDefault();
// //     scanner
// //       .post("/scanner/scans/", { url })
// //       .then((res) => {
// //         if (res.status === 201) {
// //           alert("Scan created successfully!");
// //           getScans(); // Refresh the scan list
// //           setUrl(""); // Clear the input field
// //         } else {
// //           alert("Failed to create scan.");
// //         }
// //       })
// //       .catch((err) => alert("Error creating scan: " + err));
// //   };

// //   return (
// //     <div>
// //       <div>
// //         <h2>Scan Results</h2>
// //         {scans.length > 0 ? (
// //           scans.map((scan) => <ScanResult scan={scan} key={scan.id} />)
// //         ) : (
// //           <p>No scans yet. Enter a URL to start scanning!</p>
// //         )}
// //       </div>
// //       <h2>Scan a Website</h2>
// //       <form onSubmit={createScan}>
// //         <label htmlFor="url">Website URL:</label>
// //         <br />
// //         <input
// //           type="text"
// //           id="url"
// //           name="url"
// //           required
// //           placeholder="e.g., http://example.com"
// //           onChange={(e) => setUrl(e.target.value)}
// //           value={url}
// //         />
// //         <br />
// //         <input type="submit" value="Scan Now" />
// //       </form>
// //     </div>
// //   );
// // }

// // export default Home;

// import { useState, useEffect } from "react";
// import scanner from "../scanner";
// import ScanResult from "../components/ScanResult"; // Assuming you'll create this component
// import "../styles/Home.css"; // Reuse or adapt the CSS

// function Home() {
//   const [scans, setScans] = useState([]);
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false); // Add loading state

//   useEffect(() => {
//     getScans();
//   }, []);

//   const getScans = () => {
//     scanner
//       .get("/scanner/scans/")
//       .then((res) => res.data)
//       .then((data) => {
//         setScans(data);
//         console.log(data);
//       })
//       .catch((err) => {
//         const errorMessage =
//           err.response?.data?.error || "Error fetching scans";
//         alert(errorMessage);
//       });
//   };

//   const createScan = (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true while the scan is processing
//     scanner
//       .post("/scanner/scans/", { url })
//       .then((res) => {
//         if (res.status === 201) {
//           alert("Scan created successfully!");
//           getScans(); // Refresh the scan list
//           setUrl(""); // Clear the input field
//         } else {
//           alert("Failed to create scan.");
//         }
//       })
//       .catch((err) => {
//         // Display specific error message from the backend
//         const errorMessage = err.response?.data?.error || "Error creating scan";
//         alert(errorMessage);
//       })
//       .finally(() => setLoading(false)); // Reset loading state
//   };

//   return (
//     <div>
//       <div>
//         <h2>Scan Results</h2>
//         {scans.length > 0 ? (
//           scans.map((scan) => <ScanResult scan={scan} key={scan.id} />)
//         ) : (
//           <p>No scans yet. Enter a URL to start scanning!</p>
//         )}
//       </div>
//       <h2>Scan a Website</h2>
//       <form onSubmit={createScan}>
//         <label htmlFor="url">Website URL:</label>
//         <br />
//         <input
//           type="text"
//           id="url"
//           name="url"
//           required
//           placeholder="e.g., http://example.com"
//           onChange={(e) => setUrl(e.target.value)}
//           value={url}
//           disabled={loading} // Disable input while loading
//         />
//         <br />
//         <input
//           type="submit"
//           value={loading ? "Scanning..." : "Scan Now"} // Change button text while loading
//           disabled={loading} // Disable button while loading
//         />
//       </form>
//     </div>
//   );
// }

// export default Home;

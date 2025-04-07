//og code
// import { useState, useEffect } from "react";
// import scanner from "../scanner";
// import ScanResult from "../components/ScanResult";
// import Navbar from "../components/NavBar";

// function Home() {
//   const [scans, setScans] = useState([]);
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getScans();
//   }, []);

//   const getScans = () => {
//     scanner
//       .get("/scanner/scans/")
//       .then((res) => setScans(res.data))
//       .catch((err) =>
//         alert(err.response?.data?.error || "Error fetching scans")
//       );
//   };

//   const createScan = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     scanner
//       .post("/scanner/scans/", { url })
//       .then(() => {
//         alert("Scan created successfully!");
//         getScans();
//         setUrl("");
//       })
//       .catch((err) => alert(err.response?.data?.error || "Error creating scan"))
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <Navbar />
//       <h2 className="text-xl font-bold mb-4">Scan a Website</h2>
//       <form onSubmit={createScan} className="space-y-3">
//         <input
//           type="text"
//           className="w-full border p-2 rounded-md"
//           placeholder="Enter website URL"
//           onChange={(e) => setUrl(e.target.value)}
//           value={url}
//           required
//           disabled={loading}
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-gray-300"
//           disabled={loading}
//         >
//           {loading ? "Scanning..." : "Scan Now"}
//         </button>
//       </form>

//       <h2 className="text-xl font-bold mt-6">Scan Results</h2>
//       {scans.length > 0 ? (
//         scans.map((scan) => <ScanResult scan={scan} key={scan.id} />)
//       ) : (
//         <p>No scans yet. Enter a URL to start scanning!</p>
//       )}
//     </div>
//   );
// }

// export default Home;

//og code


import { useState, useEffect } from "react";
import scanner from "../scanner";
import ScanResult from "../components/ScanResult";
import Navbar from "../components/NavBar";

function Home() {
  const [scans, setScans] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getScans();
  }, []);

  const getScans = () => {
    scanner
      .get("/scanner/scans/")
      .then((res) => setScans(res.data))
      .catch((err) =>
        alert(err.response?.data?.error || "Error fetching scans")
      );
  };

  const createScan = (e) => {
    e.preventDefault();
    setLoading(true);
    scanner
      .post("/scanner/scans/", { url })
      .then(() => {
        alert("Scan created successfully!");
        getScans();
        setUrl("");
      })
      .catch((err) => alert(err.response?.data?.error || "Error creating scan"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <Navbar />

      <div className="w-full max-w-2xl bg-white/10 border border-gray-700 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/10 p-8 mt-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          Scan a Website
        </h2>

        <form onSubmit={createScan} className="space-y-4">
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/20 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Scan Now"}
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
            Scan Results
          </h2>
          {scans.length > 0 ? (
            <div className="space-y-4">
              {scans.map((scan) => (
                <ScanResult scan={scan} key={scan.id} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mt-4">
              No scans yet. Enter a URL to start scanning!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

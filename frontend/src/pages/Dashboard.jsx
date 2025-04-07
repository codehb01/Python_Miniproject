// import { useEffect, useState } from "react";
// import scanner from "../scanner"; // Axios instance
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6666", "#66ccff"];

// function Dashboard() {
//   const [scans, setScans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterTool, setFilterTool] = useState("All");
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     scanner
//       .get("/scanner/scans/")
//       .then((res) => setScans(res.data))
//       .catch(() => setError("Failed to load scan data"))
//       .finally(() => setLoading(false));
//   }, []);

//   const toolStats = scans.reduce((acc, scan) => {
//     acc[scan.tool_name] = (acc[scan.tool_name] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = Object.entries(toolStats).map(([tool, count]) => ({
//     name: tool,
//     count,
//   }));

//   const filteredScans = scans
//     .filter((scan) => filterTool === "All" || scan.tool_name === filterTool)
//     .sort((a, b) =>
//       sortOrder === "desc"
//         ? new Date(b.created_at) - new Date(a.created_at)
//         : new Date(a.created_at) - new Date(b.created_at)
//     );

//   const tools = [...new Set(scans.map((s) => s.tool_name))];

//   return (
//     <div className="max-w-6xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Scan Dashboard</h1>

//       {loading ? (
//         <div className="text-center text-gray-500">🔄 Loading...</div>
//       ) : error ? (
//         <div className="text-center text-red-500 font-medium">{error}</div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             <div className="p-4 bg-blue-100 rounded shadow-md">
//               <h2 className="text-xl font-semibold text-gray-700">
//                 Total Scans
//               </h2>
//               <p className="text-3xl mt-2">{scans.length}</p>
//             </div>

//             <div className="p-4 bg-green-100 rounded shadow-md">
//               <h2 className="text-xl font-semibold text-gray-700">
//                 Latest Scan
//               </h2>
//               {scans.length > 0 ? (
//                 <>
//                   <p>
//                     <strong>URL:</strong> {scans[0].url}
//                   </p>
//                   <p>
//                     <strong>Tool:</strong> {scans[0].tool_name}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <strong>Date:</strong>{" "}
//                     {new Date(scans[0].created_at).toLocaleString()}
//                   </p>
//                 </>
//               ) : (
//                 <p>No scans yet</p>
//               )}
//             </div>
//           </div>

//           <div className="bg-gray-100 p-4 rounded mb-8 shadow-inner">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               Tool Usage Statistics
//             </h2>
//             {chartData.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       dataKey="count"
//                       nameKey="name"
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       label
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <p className="text-gray-500">No data to display</p>
//             )}
//           </div>

//           <div className="mb-6 flex flex-wrap items-center gap-4">
//             <label className="font-medium text-gray-700">
//               Filter by Tool:
//               <select
//                 className="ml-2 px-2 py-1 rounded border"
//                 value={filterTool}
//                 onChange={(e) => setFilterTool(e.target.value)}
//               >
//                 <option value="All">All</option>
//                 {tools.map((tool) => (
//                   <option key={tool} value={tool}>
//                     {tool}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label className="font-medium text-gray-700">
//               Sort by Date:
//               <select
//                 className="ml-2 px-2 py-1 rounded border"
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//               >
//                 <option value="desc">Newest First</option>
//                 <option value="asc">Oldest First</option>
//               </select>
//             </label>
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Scan History
//             </h2>
//             {filteredScans.length > 0 ? (
//               filteredScans.map((scan) => (
//                 <div
//                   key={scan.id}
//                   className="p-4 border rounded-md shadow-sm bg-gray-50"
//                 >
//                   <p>
//                     <strong>URL:</strong> {scan.url}
//                   </p>
//                   <p>
//                     <strong>Tool:</strong> {scan.tool_name}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <strong>Scanned on:</strong>{" "}
//                     {new Date(scan.created_at).toLocaleString()}
//                   </p>
//                   <pre className="mt-2 text-sm bg-white p-2 rounded overflow-x-auto max-h-40">
//                     {scan.result}
//                   </pre>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600">No matching scans found.</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from "react";
import scanner from "../scanner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ScanResult from "../components/ScanResult";
import Navbar from "../components/NavBar";

const COLORS = ["#06b6d4", "#3b82f6", "#facc15", "#ef4444", "#10b981"];

function Dashboard() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTool, setFilterTool] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    scanner
      .get("/scanner/scans/")
      .then((res) => setScans(res.data))
      .catch(() => setError("Failed to load scan data"))
      .finally(() => setLoading(false));
  }, []);

  const toolStats = scans.reduce((acc, scan) => {
    acc[scan.tool_name] = (acc[scan.tool_name] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(toolStats).map(([tool, count]) => ({
    name: tool,
    count,
  }));

  const filteredScans = scans
    .filter((scan) => filterTool === "All" || scan.tool_name === filterTool)
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );

  const tools = [...new Set(scans.map((s) => s.tool_name))];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <Navbar />

      <div className="w-full max-w-6xl bg-white/10 border border-gray-700 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/10 p-8 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Scan Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-gray-300">🔄 Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400 font-medium">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-cyan-500/20 border border-cyan-700 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-cyan-400">
                  Total Scans
                </h2>
                <p className="text-3xl mt-2 text-white">{scans.length}</p>
              </div>

              <div className="p-6 bg-blue-500/20 border border-blue-700 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-blue-400">
                  Latest Scan
                </h2>
                {scans.length > 0 ? (
                  <>
                    <p className="mt-2">
                      <strong className="text-white/70">URL:</strong>{" "}
                      {scans[0].url}
                    </p>
                    <p>
                      <strong className="text-white/70">Tool:</strong>{" "}
                      {scans[0].tool_name}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Date:</strong>{" "}
                      {new Date(scans[0].created_at).toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">No scans yet</p>
                )}
              </div>
            </div>

            <div className="bg-white/10 border border-gray-700 rounded-xl p-6 mb-10 shadow-inner shadow-cyan-500/10">
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                Tool Usage Statistics
              </h2>
              {chartData.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#06b6d4" />
                    </BarChart>
                  </ResponsiveContainer>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-gray-400">No scan data available</p>
              )}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                Scan Results
              </h2>
              {filteredScans.length > 0 ? (
                <div className="space-y-4">
                  {filteredScans.map((scan) => (
                    <ScanResult scan={scan} key={scan.id} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No scans yet. Try scanning a website!
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

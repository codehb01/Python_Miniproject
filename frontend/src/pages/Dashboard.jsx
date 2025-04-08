// // import { useEffect, useState } from "react";
// // import scanner from "../scanner"; // Axios instance
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   PieChart,
// //   Pie,
// //   Cell,
// // } from "recharts";

// // const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6666", "#66ccff"];

// // function Dashboard() {
// //   const [scans, setScans] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [filterTool, setFilterTool] = useState("All");
// //   const [sortOrder, setSortOrder] = useState("desc");

// //   useEffect(() => {
// //     scanner
// //       .get("/scanner/scans/")
// //       .then((res) => setScans(res.data))
// //       .catch(() => setError("Failed to load scan data"))
// //       .finally(() => setLoading(false));
// //   }, []);

// //   const toolStats = scans.reduce((acc, scan) => {
// //     acc[scan.tool_name] = (acc[scan.tool_name] || 0) + 1;
// //     return acc;
// //   }, {});

// //   const chartData = Object.entries(toolStats).map(([tool, count]) => ({
// //     name: tool,
// //     count,
// //   }));

// //   const filteredScans = scans
// //     .filter((scan) => filterTool === "All" || scan.tool_name === filterTool)
// //     .sort((a, b) =>
// //       sortOrder === "desc"
// //         ? new Date(b.created_at) - new Date(a.created_at)
// //         : new Date(a.created_at) - new Date(b.created_at)
// //     );

// //   const tools = [...new Set(scans.map((s) => s.tool_name))];

// //   return (
// //     <div className="max-w-6xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
// //       <h1 className="text-3xl font-bold mb-6 text-gray-800">Scan Dashboard</h1>

// //       {loading ? (
// //         <div className="text-center text-gray-500">🔄 Loading...</div>
// //       ) : error ? (
// //         <div className="text-center text-red-500 font-medium">{error}</div>
// //       ) : (
// //         <>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //             <div className="p-4 bg-blue-100 rounded shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-700">
// //                 Total Scans
// //               </h2>
// //               <p className="text-3xl mt-2">{scans.length}</p>
// //             </div>

// //             <div className="p-4 bg-green-100 rounded shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-700">
// //                 Latest Scan
// //               </h2>
// //               {scans.length > 0 ? (
// //                 <>
// //                   <p>
// //                     <strong>URL:</strong> {scans[0].url}
// //                   </p>
// //                   <p>
// //                     <strong>Tool:</strong> {scans[0].tool_name}
// //                   </p>
// //                   <p className="text-sm text-gray-600">
// //                     <strong>Date:</strong>{" "}
// //                     {new Date(scans[0].created_at).toLocaleString()}
// //                   </p>
// //                 </>
// //               ) : (
// //                 <p>No scans yet</p>
// //               )}
// //             </div>
// //           </div>

// //           <div className="bg-gray-100 p-4 rounded mb-8 shadow-inner">
// //             <h2 className="text-xl font-semibold text-gray-700 mb-4">
// //               Tool Usage Statistics
// //             </h2>
// //             {chartData.length > 0 ? (
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={chartData}>
// //                     <XAxis dataKey="name" />
// //                     <YAxis />
// //                     <Tooltip />
// //                     <Bar dataKey="count" fill="#8884d8" />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <PieChart>
// //                     <Pie
// //                       data={chartData}
// //                       dataKey="count"
// //                       nameKey="name"
// //                       cx="50%"
// //                       cy="50%"
// //                       outerRadius={100}
// //                       label
// //                     >
// //                       {chartData.map((entry, index) => (
// //                         <Cell
// //                           key={`cell-${index}`}
// //                           fill={COLORS[index % COLORS.length]}
// //                         />
// //                       ))}
// //                     </Pie>
// //                     <Tooltip />
// //                   </PieChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             ) : (
// //               <p className="text-gray-500">No data to display</p>
// //             )}
// //           </div>

// //           <div className="mb-6 flex flex-wrap items-center gap-4">
// //             <label className="font-medium text-gray-700">
// //               Filter by Tool:
// //               <select
// //                 className="ml-2 px-2 py-1 rounded border"
// //                 value={filterTool}
// //                 onChange={(e) => setFilterTool(e.target.value)}
// //               >
// //                 <option value="All">All</option>
// //                 {tools.map((tool) => (
// //                   <option key={tool} value={tool}>
// //                     {tool}
// //                   </option>
// //                 ))}
// //               </select>
// //             </label>

// //             <label className="font-medium text-gray-700">
// //               Sort by Date:
// //               <select
// //                 className="ml-2 px-2 py-1 rounded border"
// //                 value={sortOrder}
// //                 onChange={(e) => setSortOrder(e.target.value)}
// //               >
// //                 <option value="desc">Newest First</option>
// //                 <option value="asc">Oldest First</option>
// //               </select>
// //             </label>
// //           </div>

// //           <div className="space-y-4">
// //             <h2 className="text-xl font-semibold text-gray-800">
// //               Scan History
// //             </h2>
// //             {filteredScans.length > 0 ? (
// //               filteredScans.map((scan) => (
// //                 <div
// //                   key={scan.id}
// //                   className="p-4 border rounded-md shadow-sm bg-gray-50"
// //                 >
// //                   <p>
// //                     <strong>URL:</strong> {scan.url}
// //                   </p>
// //                   <p>
// //                     <strong>Tool:</strong> {scan.tool_name}
// //                   </p>
// //                   <p className="text-sm text-gray-600">
// //                     <strong>Scanned on:</strong>{" "}
// //                     {new Date(scan.created_at).toLocaleString()}
// //                   </p>
// //                   <pre className="mt-2 text-sm bg-white p-2 rounded overflow-x-auto max-h-40">
// //                     {scan.result}
// //                   </pre>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-gray-600">No matching scans found.</p>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default Dashboard;
// import { useEffect, useState } from "react";
// import scanner from "../scanner";
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
// import ScanResult from "../components/ScanResult";
// import Navbar from "../components/NavBar";

// const COLORS = ["#06b6d4", "#3b82f6", "#facc15", "#ef4444", "#10b981"];

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
//     <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
//       <Navbar />

//       <div className="w-full max-w-6xl bg-white/10 border border-gray-700 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/10 p-8 mt-10">
//         <h1 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
//           Scan Dashboard
//         </h1>

//         {loading ? (
//           <div className="text-center text-gray-300">🔄 Loading...</div>
//         ) : error ? (
//           <div className="text-center text-red-400 font-medium">{error}</div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className="p-6 bg-cyan-500/20 border border-cyan-700 rounded-xl shadow-md">
//                 <h2 className="text-xl font-semibold text-cyan-400">
//                   Total Scans
//                 </h2>
//                 <p className="text-3xl mt-2 text-white">{scans.length}</p>
//               </div>

//               <div className="p-6 bg-blue-500/20 border border-blue-700 rounded-xl shadow-md">
//                 <h2 className="text-xl font-semibold text-blue-400">
//                   Latest Scan
//                 </h2>
//                 {scans.length > 0 ? (
//                   <>
//                     <p className="mt-2">
//                       <strong className="text-white/70">URL:</strong>{" "}
//                       {scans[0].url}
//                     </p>
//                     <p>
//                       <strong className="text-white/70">Tool:</strong>{" "}
//                       {scans[0].tool_name}
//                     </p>
//                     <p className="text-sm text-gray-300">
//                       <strong>Date:</strong>{" "}
//                       {new Date(scans[0].created_at).toLocaleString()}
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-gray-400">No scans yet</p>
//                 )}
//               </div>
//             </div>

//             <div className="bg-white/10 border border-gray-700 rounded-xl p-6 mb-10 shadow-inner shadow-cyan-500/10">
//               <h2 className="text-xl font-semibold text-cyan-400 mb-4">
//                 Tool Usage Statistics
//               </h2>
//               {chartData.length > 0 ? (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={chartData}>
//                       <XAxis dataKey="name" stroke="#ccc" />
//                       <YAxis stroke="#ccc" />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#06b6d4" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={chartData}
//                         dataKey="count"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={100}
//                         label
//                       >
//                         {chartData.map((entry, index) => (
//                           <Cell
//                             key={`cell-${index}`}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               ) : (
//                 <p className="text-gray-400">No scan data available</p>
//               )}
//             </div>

//             <div className="mt-10">
//               <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
//                 Scan Results
//               </h2>
//               {filteredScans.length > 0 ? (
//                 <div className="space-y-4">
//                   {filteredScans.map((scan) => (
//                     <ScanResult scan={scan} key={scan.id} />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 text-sm">
//                   No scans yet. Try scanning a website!
//                 </p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
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
  Legend,
  LineChart,
  Line,
  CartesianGrid,
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
  const [timeRange, setTimeRange] = useState("all"); // New: Filter by time range

  useEffect(() => {
    fetchScans();
  }, [timeRange]); // Re-fetch when timeRange changes

  const fetchScans = async () => {
    try {
      const response = await scanner.get("/scanner/scans/");
      let data = response.data;

      // Filter by time range
      if (timeRange !== "all") {
        const now = new Date();
        data = data.filter((scan) => {
          const scanDate = new Date(scan.created_at);
          const days = parseInt(timeRange.split("d")[0]);
          return (now - scanDate) / (1000 * 3600 * 24) <= days;
        });
      }

      setScans(data);
    } catch (err) {
      setError("Failed to load scan data");
    } finally {
      setLoading(false);
    }
  };

  // Tool usage statistics
  const toolStats = scans.reduce((acc, scan) => {
    acc[scan.tool_name] = (acc[scan.tool_name] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(toolStats).map(([tool, count]) => ({
    name: tool,
    count,
  }));

  // Trend data (scans over time)
  const trendData = scans
    .map((scan) => ({
      date: new Date(scan.created_at).toLocaleDateString(),
      count: 1,
    }))
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.date === curr.date);
      if (existing) existing.count += 1;
      else acc.push(curr);
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Parse scan results for insights
  const parseScanInsights = (scan) => {
    const insights = { risks: [], recommendations: [], severity: 0 };
    if (scan.tool_name === "Wapiti") {
      if (scan.result.includes("X-Frame-Options is not set")) {
        insights.risks.push("Missing X-Frame-Options (Clickjacking Risk)");
        insights.severity += 2;
        insights.recommendations.push(
          "Add X-Frame-Options header with DENY or SAMEORIGIN."
        );
      }
      if (scan.result.includes("Strict-Transport-Security is not set")) {
        insights.risks.push("Missing HSTS (Man-in-the-Middle Risk)");
        insights.severity += 3;
        insights.recommendations.push("Implement HSTS with a 6-month max-age.");
      }
      const reportMatch = scan.result.match(
        /C:\\Users\\nandu\\.wapiti\\generated_report\\.*\.html/
      );
      insights.reportLink = reportMatch ? reportMatch[0] : null;
    }
    if (
      scan.tool_name === "SQLMap" &&
      scan.result.includes("no injectable parameters")
    ) {
      insights.risks.push("No SQL Injection Detected");
      insights.severity += 0; // Low risk
      insights.recommendations.push(
        "Consider deeper testing with parameterized URLs."
      );
    }
    if (scan.tool_name === "Nmap") {
      const ports = scan.result.match(/(\d+)\/tcp\s+open\s+(\w+)/g);
      if (ports && ports.length > 0) {
        insights.risks.push(`Open Ports Detected: ${ports.length}`);
        insights.severity += ports.length; // Higher severity with more open ports
        insights.recommendations.push(
          "Review and secure open ports (e.g., close unused services)."
        );
      }
    }
    insights.severity = Math.min(insights.severity, 10); // Cap severity at 10
    return insights;
  };

  const filteredScans = scans
    .filter((scan) => filterTool === "All" || scan.tool_name === filterTool)
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );

  const tools = [...new Set(scans.map((s) => s.tool_name))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center py-10 px-4">
      <Navbar />

      <div className="w-full max-w-6xl bg-white/10 border border-gray-700 backdrop-blur-md rounded-3xl shadow-lg shadow-cyan-500/15 p-8 mt-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
          Security Scan Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-gray-300 animate-pulse">
            🔄 Loading scan data...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 font-medium">{error}</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-cyan-500/20 border border-cyan-700 rounded-xl shadow-md hover:shadow-cyan-500/30 transition">
                <h2 className="text-xl font-semibold text-cyan-400">
                  Total Scans
                </h2>
                <p className="text-3xl mt-2 text-white">{scans.length}</p>
              </div>
              <div className="p-6 bg-blue-500/20 border border-blue-700 rounded-xl shadow-md hover:shadow-blue-500/30 transition">
                <h2 className="text-xl font-semibold text-blue-400">
                  Average Severity
                </h2>
                <p className="text-3xl mt-2 text-white">
                  {scans.length > 0
                    ? (
                        scans.reduce(
                          (sum, scan) => sum + parseScanInsights(scan).severity,
                          0
                        ) / scans.length
                      ).toFixed(1)
                    : 0}
                  /10
                </p>
              </div>
              <div className="p-6 bg-green-500/20 border border-green-700 rounded-xl shadow-md hover:shadow-green-500/30 transition">
                <h2 className="text-xl font-semibold text-green-400">
                  Active Tools
                </h2>
                <p className="text-3xl mt-2 text-white">{tools.length}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <select
                value={filterTool}
                onChange={(e) => setFilterTool(e.target.value)}
                className="p-2 bg-white/10 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="All">All Tools</option>
                {tools.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 bg-white/10 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="p-2 bg-white/10 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-white/10 border border-gray-700 rounded-xl shadow-inner shadow-cyan-500/10">
                <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                  Tool Usage
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a202c",
                        border: "none",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#06b6d4">
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="p-6 bg-white/10 border border-gray-700 rounded-xl shadow-inner shadow-cyan-500/10">
                <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                  Scan Trends
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a202c",
                        border: "none",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#06b6d4"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scan Results */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                Detailed Scan Results
              </h2>
              {filteredScans.length > 0 ? (
                <div className="space-y-6">
                  {filteredScans.map((scan) => {
                    const insights = parseScanInsights(scan);
                    return (
                      <div
                        key={scan.id}
                        className="bg-white/5 border border-gray-700 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-cyan-500/10 transition hover:shadow-cyan-500/20"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold text-cyan-400 break-all">
                            {scan.url}{" "}
                            <span className="text-sm text-white/60">
                              ({scan.tool_name})
                            </span>
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              insights.severity >= 7
                                ? "bg-red-500/20 text-red-400"
                                : insights.severity >= 4
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            Severity: {insights.severity}/10
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          <strong className="text-white">Scanned on:</strong>{" "}
                          {new Date(scan.created_at).toLocaleString()}
                        </p>

                        {insights.risks.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-lg font-medium text-cyan-300">
                              Risks Identified:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-red-300 mt-2">
                              {insights.risks.map((risk, i) => (
                                <li key={i}>{risk}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {insights.recommendations.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-lg font-medium text-cyan-300">
                              Recommendations:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-green-300 mt-2">
                              {insights.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {insights.reportLink && (
                          <div className="mt-4">
                            <h4 className="text-lg font-medium text-cyan-300">
                              Report Link:
                            </h4>
                            <a
                              href={`file:///${insights.reportLink}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline break-all"
                            >
                              {insights.reportLink}
                            </a>
                            <p className="text-xs text-gray-500 mt-1">
                              (Note: Browser may block local file access.
                              Contact admin for server access.)
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No scan results match your filters.
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

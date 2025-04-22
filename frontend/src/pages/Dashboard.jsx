import { useEffect, useState, useRef } from "react";
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
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import domtoimage from "dom-to-image";

// Rest of your code remains the same...

// Initialize pdfmake fonts with fallback
try {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
  };
} catch (err) {
  console.error("Failed to load pdfmake fonts:", err);
  pdfMake.vfs = {};
  pdfMake.fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Regular.ttf",
      italics: "Roboto-Regular.ttf",
      bolditalics: "Roboto-Regular.ttf",
    },
  };
}

const COLORS = ["#06b6d4", "#3b82f6", "#facc15", "#ef4444", "#10b981"];
const TAILWIND_COLOR_MAP = {
  "gray-900": "#111827",
  "gray-800": "#1f2937",
  "gray-700": "#374151",
  "gray-400": "#9ca3af",
  "gray-300": "#d1d5db",
  "cyan-500": "#06b6d4",
  "cyan-400": "#22d3ee",
  "cyan-300": "#67e8f9",
  "blue-500": "#3b82f6",
  "blue-300": "#93c5fd",
  "blue-700": "#1d4ed8",
  "green-500": "#10b981",
  "green-300": "#86efac",
  "green-700": "#047857",
  "red-400": "#f87171",
  "white": "#ffffff",
};

function Dashboard() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTool, setFilterTool] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [timeRange, setTimeRange] = useState("all");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    fetchScans();
  }, [timeRange]);

  const fetchScans = async () => {
    try {
      const response = await scanner.get("/scanner/scans/");
      let data = response.data;

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

  const toolStats = scans.reduce((acc, scan) => {
    acc[scan.tool_name] = (acc[scan.tool_name] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(toolStats).map(([tool, count]) => ({
    name: tool,
    count,
  }));

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
      insights.severity += 0;
      insights.recommendations.push(
        "Consider deeper testing with parameterized URLs."
      );
    }
    if (scan.tool_name === "Nmap") {
      const ports = scan.result.match(/(\d+)\/tcp\s+open\s+(\w+)/g);
      if (ports && ports.length > 0) {
        insights.risks.push(`Open Ports Detected: ${ports.length}`);
        insights.severity += ports.length;
        insights.recommendations.push(
          "Review and secure open ports (e.g., close unused services)."
        );
      }
    }
    insights.severity = Math.min(insights.severity, 10);
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

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      // Render charts as images
      const barChartImage = barChartRef.current
        ? await domtoimage.toPng(barChartRef.current, {
            width: barChartRef.current.offsetWidth,
            height: barChartRef.current.offsetHeight,
          })
        : null;

      const lineChartImage = lineChartRef.current
        ? await domtoimage.toPng(lineChartRef.current, {
            width: lineChartRef.current.offsetWidth,
            height: lineChartRef.current.offsetHeight,
          })
        : null;

      // Define pdfmake document structure
      const docDefinition = {
        content: [
          // Header
          {
            text: "Security Scan Dashboard",
            style: "header",
            alignment: "center",
            margin: [0, 0, 0, 20],
          },

          // Summary Cards
          {
            columns: [
              {
                stack: [
                  { text: "Total Scans", style: "cardHeaderCyan" },
                  { text: scans.length, style: "cardValue" },
                ],
                width: "33%",
                style: "cardCyan",
              },
              {
                stack: [
                  { text: "Avg Severity", style: "cardHeaderBlue" },
                  {
                    text: scans.length > 0
                      ? `${(
                          scans.reduce(
                            (sum, scan) => sum + parseScanInsights(scan).severity,
                            0
                          ) / scans.length
                        ).toFixed(1)}/10`
                      : "0/10",
                    style: "cardValue",
                  },
                ],
                width: "33%",
                style: "cardBlue",
              },
              {
                stack: [
                  { text: "Active Tools", style: "cardHeaderGreen" },
                  { text: tools.length, style: "cardValue" },
                ],
                width: "33%",
                style: "cardGreen",
              },
            ],
            margin: [0, 0, 0, 20],
          },

          // Filters
          {
            stack: [
              { text: "Filters", style: "subheader" },
              {
                columns: [
                  { text: `Tool: ${filterTool}`, style: "filterText" },
                  { text: `Sort: ${sortOrder === "desc" ? "Newest" : "Oldest"}`, style: "filterText" },
                  { text: `Time: ${timeRange === "all" ? "All Time" : timeRange.replace("d", " Days")}`, style: "filterText" },
                ],
                columnGap: 20,
              },
            ],
            margin: [0, 0, 0, 20],
          },

          // Charts
          {
            stack: [
              { text: "Tool Usage", style: "subheader" },
              barChartImage
                ? {
                    image: barChartImage,
                    width: 500,
                    margin: [0, 10, 0, 10],
                  }
                : { text: "Tool Usage chart unavailable", style: "error" },
              { text: "Scan Trends", style: "subheader", margin: [0, 20, 0, 0] },
              lineChartImage
                ? {
                    image: lineChartImage,
                    width: 500,
                    margin: [0, 10, 0, 10],
                  }
                : { text: "Scan Trends chart unavailable", style: "error" },
            ],
            margin: [0, 0, 0, 20],
          },

          // Scan Results
          {
            stack: [
              { text: "Detailed Scan Results", style: "subheader" },
              filteredScans.length > 0
                ? filteredScans.map((scan) => {
                    const insights = parseScanInsights(scan);
                    return {
                      stack: [
                        {
                          text: `${scan.tool_name} - ${new Date(
                            scan.created_at
                          ).toLocaleDateString()}`,
                          style: "scanHeader",
                        },
                        {
                          ul: insights.risks.map((risk) => ({
                            text: risk,
                            style: "scanText",
                          })),
                          margin: [10, 5, 0, 5],
                        },
                        {
                          ul: insights.recommendations.map((rec) => ({
                            text: rec,
                            style: "scanText",
                          })),
                          margin: [10, 5, 0, 5],
                        },
                        {
                          text: `Severity: ${insights.severity}/10`,
                          style: "scanText",
                          margin: [10, 5, 0, 5],
                        },
                        insights.reportLink
                          ? {
                              text: `Report: ${insights.reportLink}`,
                              style: "scanText",
                              margin: [10, 5, 0, 5],
                            }
                          : null,
                      ].filter(Boolean),
                      style: "scanCard",
                      margin: [0, 5, 0, 5],
                    };
                  })
                : [{ text: "No scan results match your filters.", style: "error" }],
            ],
          },
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            color: TAILWIND_COLOR_MAP["cyan-400"],
          },
          subheader: {
            fontSize: 18,
            bold: true,
            color: TAILWIND_COLOR_MAP["cyan-300"],
          },
          cardCyan: {
            fillColor: TAILWIND_COLOR_MAP["cyan-700"],
            color: TAILWIND_COLOR_MAP["white"],
            padding: 10,
            margin: [5, 0, 5, 0],
          },
          cardBlue: {
            fillColor: TAILWIND_COLOR_MAP["blue-700"],
            color: TAILWIND_COLOR_MAP["white"],
            padding: 10,
            margin: [5, 0, 5, 0],
          },
          cardGreen: {
            fillColor: TAILWIND_COLOR_MAP["green-700"],
            color: TAILWIND_COLOR_MAP["white"],
            padding: 10,
            margin: [5, 0, 5, 0],
          },
          cardHeaderCyan: {
            fontSize: 14,
            bold: true,
            color: TAILWIND_COLOR_MAP["cyan-300"],
          },
          cardHeaderBlue: {
            fontSize: 14,
            bold: true,
            color: TAILWIND_COLOR_MAP["blue-300"],
          },
          cardHeaderGreen: {
            fontSize: 14,
            bold: true,
            color: TAILWIND_COLOR_MAP["green-300"],
          },
          cardValue: {
            fontSize: 24,
            bold: true,
            color: TAILWIND_COLOR_MAP["white"],
            margin: [0, 5, 0, 0],
          },
          filterText: {
            fontSize: 12,
            color: TAILWIND_COLOR_MAP["white"],
            fillColor: TAILWIND_COLOR_MAP["gray-900"],
            padding: 5,
          },
          scanCard: {
            fillColor: TAILWIND_COLOR_MAP["gray-800"],
            padding: 10,
          },
          scanHeader: {
            fontSize: 14,
            bold: true,
            color: TAILWIND_COLOR_MAP["gray-300"],
          },
          scanText: {
            fontSize: 12,
            color: TAILWIND_COLOR_MAP["gray-300"],
          },
          error: {
            fontSize: 12,
            color: TAILWIND_COLOR_MAP["red-400"],
            italic: true,
          },
        },
        defaultStyle: {
          font: "Roboto",
        },
        pageSize: "A4",
        pageMargins: [40, 60, 40, 60],
        background: [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 595.28, // A4 width in points
                h: 841.89, // A4 height in points
                color: TAILWIND_COLOR_MAP["gray-900"],
              },
            ],
          },
        ],
      };

      pdfMake.createPdf(docDefinition).download("dashboard-report.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Check the console for details.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center py-12 px-6">
      <Navbar />

      <div className="w-full max-w-7xl bg-white/5 border border-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/10 p-8 mt-12">
        <h1 className="text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
          Security Scan Dashboard
        </h1>

        {loading ? (
          <div className="space-y-12">
            {/* Skeleton for Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-2xl animate-pulse h-28"
                ></div>
              ))}
            </div>

            {/* Skeleton for Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl animate-pulse w-full sm:w-1/3 h-12"
                ></div>
              ))}
            </div>

            {/* Skeleton for Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-2xl animate-pulse h-96"
                ></div>
              ))}
            </div>

            {/* Skeleton for Scan Results */}
            <div className="mt-12 space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl animate-pulse h-20"
                ></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 font-medium text-lg">
            {error}
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-cyan-700/20 border border-cyan-800/50 rounded-2xl shadow-lg hover:shadow-cyan-500/40 transition-all duration-300">
                <h2 className="text-xl font-semibold text-cyan-300">
                  Total Scans
                </h2>
                <p className="text-4xl mt-3 font-bold text-white">
                  {scans.length}
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-800/50 rounded-2xl shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
                <h2 className="text-xl font-semibold text-blue-300">
                  Avg Severity
                </h2>
                <p className="text-4xl mt-3 font-bold text-white">
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
              <div className="p-6 bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-800/50 rounded-2xl shadow-lg hover:shadow-green-500/40 transition-all duration-300">
                <h2 className="text-xl font-semibold text-green-300">
                  Active Tools
                </h2>
                <p className="text-4xl mt-3 font-bold text-white">
                  {tools.length}
                </p>
              </div>
            </div>

            {/* Filters and Download Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
              <select
                value={filterTool}
                onChange={(e) => setFilterTool(e.target.value)}
                className="p-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-md hover:bg-gray-800 transition-all duration-200"
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
                className="p-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-md hover:bg-gray-800 transition-all duration-200"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="p-3 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-md hover:bg-gray-800 transition-all duration-200"
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className={`p-3 bg-cyan-500 text-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200 ${
                  isGeneratingPDF ? "opacity-50 cursor-not-allowed" : "hover:bg-cyan-600"
                }`}
              >
                {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div
                ref={barChartRef}
                className="p-6 bg-white/10 border border-gray-700/50 backdrop-blur-md rounded-2xl shadow-inner shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
                  Tool Usage
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis
                      dataKey="name"
                      stroke="#ddd"
                      tick={{ fill: "#ddd" }}
                    />
                    <YAxis stroke="#ddd" tick={{ fill: "#ddd" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ color: "#ddd" }} />
                    <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]}>
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
              <div
                ref={lineChartRef}
                className="p-6 bg-white/10 border border-gray-700/50 backdrop-blur-md rounded-2xl shadow-inner shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-cyan-300 mb-6">
                  Scan Trends
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis
                      dataKey="date"
                      stroke="#ddd"
                      tick={{ fill: "#ddd" }}
                    />
                    <YAxis stroke="#ddd" tick={{ fill: "#ddd" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ color: "#ddd" }} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      activeDot={{ r: 8, fill: "#06b6d4", stroke: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scan Results */}
            <div className="mt-12">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-300 text-center">
                Detailed Scan Results
              </h2>
              {filteredScans.length > 0 ? (
                <div className="space-y-6">
                  {filteredScans.map((scan) => (
                    <ScanResult
                      key={scan.id}
                      scan={{
                        ...scan,
                        insights: parseScanInsights(scan),
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center text-lg">
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
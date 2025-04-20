import React, { useState } from "react";

function ScanResult({ scan }) {
  // State for collapsible sections
  const [isExpanded, setIsExpanded] = useState(true);

  // Parse Wapiti results
  const parseWapitiResults = (result) => {
    const findings = [];
    if (result.includes("X-Frame-Options is not set"))
      findings.push("Missing X-Frame-Options");
    if (result.includes("X-Content-Type-Options is not set"))
      findings.push("Missing X-Content-Type-Options");
    if (result.includes("Strict-Transport-Security is not set"))
      findings.push("Missing HSTS");
    if (result.includes("CSP is not set")) findings.push("Missing CSP");
    const reportMatch = result.match(
      /C:\\Users\\nandu\\.wapiti\\generated_report\\.*\.html/
    );
    const reportLink = reportMatch ? reportMatch[0] : null;
    return { findings, reportLink };
  };

  // Parse SQLMap results
  const parseSQLMapResults = (result) => {
    return result.includes("no injectable parameters were found")
      ? ["No injectable parameters found"]
      : [];
  };

  // Parse Nmap results
  const parseNmapResults = (result) => {
    const ports = [];
    const lines = result.split("\n");
    lines.forEach((line) => {
      const match = line.match(/(\d+)\/tcp\s+open\s+(\w+)/);
      if (match) ports.push(`${match[1]}/tcp: ${match[2]}`);
    });
    return ports.length > 0 ? ports : ["No open ports detected"];
  };

  // Parse VirusTotal results
  const parseVirusTotalResults = (result) => {
    try {
      const parsedResult = JSON.parse(result);
      // Convert Unix timestamp to human-readable date if needed
      const scanDate = parsedResult.scan_date
        ? new Date(parsedResult.scan_date * 1000).toLocaleString()
        : "N/A";
      return {
        ...parsedResult,
        scan_date: scanDate,
      };
    } catch (e) {
      console.error("Failed to parse VirusTotal result:", e);
      return { raw: result, error: "Invalid JSON format" };
    }
  };

  // Determine safety status
  const getSafetyStatus = (malicious) => {
    return malicious > 0
      ? "Caution: Potential threat detected"
      : "Safe: No threats detected";
  };

  // Get formatted VirusTotal result
  const virusTotalResult =
    scan.tool_name === "VirusTotal"
      ? parseVirusTotalResults(scan.result)
      : null;

  return (
    <div className="bg-white/10 dark:bg-gray-900/70 border border-gradient-to-r from-blue-500/50 to-purple-600/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:scale-102 hover:shadow-cyan-500/30">
      {/* URL and Tool Name */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text break-all">
          {scan.url}
        </h3>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-md text-xs font-medium">
          {scan.tool_name}
        </span>
      </div>

      {/* Timestamp */}
      <p className="text-sm text-gray-400 dark:text-gray-200 mt-2">
        <strong className="text-white dark:text-gray-100">Scanned on:</strong>{" "}
        <span className="px-2 py-1 bg-gray-700/50 text-gray-300 dark:text-gray-200 rounded-full text-xs">
          {new Date(scan.created_at).toLocaleString()}
        </span>
      </p>

      {/* Collapsible Findings Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text">
            {scan.tool_name === "Nmap" ? "Open Ports" : "Key Findings"}
          </h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-300 hover:text-cyan-400 focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label={isExpanded ? "Collapse findings" : "Expand findings"}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {/* Wapiti Results */}
        {scan.tool_name === "Wapiti" && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? "max-h-[500px] opacity-100 animate-expand"
                : "max-h-0 opacity-0 animate-collapse"
            }`}
          >
            <ul className="mt-3 space-y-2 text-sm text-green-400 dark:text-green-300">
              {parseWapitiResults(scan.result).findings.map((finding, i) => (
                <li
                  key={i}
                  className="pl-4 relative hover:bg-white/20 dark:hover:bg-gray-800/80 rounded-md py-1 transition-all before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
                >
                  {finding}
                </li>
              ))}
            </ul>
            {parseWapitiResults(scan.result).reportLink && (
              <div className="mt-4">
                <h4 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text">
                  Report Link:
                </h4>
                <a
                  href={`file:///${parseWapitiResults(scan.result).reportLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 mt-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/40 transition-all truncate max-w-full"
                >
                  {parseWapitiResults(scan.result).reportLink}
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  (Note: Browser may block local file access. Consider serving
                  via server.)
                </p>
              </div>
            )}
          </div>
        )}

        {/* SQLMap Results */}
        {scan.tool_name === "SQLMap" && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? "max-h-[500px] opacity-100 animate-expand"
                : "max-h-0 opacity-0 animate-collapse"
            }`}
          >
            <ul className="mt-3 space-y-2 text-sm text-green-400 dark:text-green-300">
              {parseSQLMapResults(scan.result).map((finding, i) => (
                <li
                  key={i}
                  className="pl-4 relative hover:bg-white/20 dark:hover:bg-gray-800/80 rounded-md py-1 transition-all before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
                >
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nmap Results */}
        {scan.tool_name === "Nmap" && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? "max-h-[500px] opacity-100 animate-expand"
                : "max-h-0 opacity-0 animate-collapse"
            }`}
          >
            <ul className="mt-3 space-y-2 text-sm text-green-400 dark:text-green-300">
              {parseNmapResults(scan.result).map((port, i) => (
                <li
                  key={i}
                  className="pl-4 relative hover:bg-white/20 dark:hover:bg-gray-800/80 rounded-md py-1 transition-all before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
                >
                  {port}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* VirusTotal Results */}
        {scan.tool_name === "VirusTotal" && virusTotalResult && (
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded
                ? "max-h-[500px] opacity-100 animate-expand"
                : "max-h-0 opacity-0 animate-collapse"
            }`}
          >
            <h4 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text">
              VirusTotal Scan Analysis:
            </h4>
            <p className="text-sm text-gray-400 mb-2">
              VirusTotal scanned this URL with {virusTotalResult.total_scans}{" "}
              antivirus engines to check for malware, phishing, or other
              threats.
            </p>
            <p className="text-sm font-semibold text-white mb-2">
              Status:{" "}
              <span
                className={
                  virusTotalResult.malicious > 0
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {getSafetyStatus(virusTotalResult.malicious)}
              </span>
            </p>
            <table className="w-full text-sm text-green-400 dark:text-green-300 mt-2">
              <tbody>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Harmless:</strong> (Sites
                    deemed safe)
                  </td>
                  <td className="py-1">{virusTotalResult.harmless}</td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Malicious:</strong>{" "}
                    (Confirmed threats)
                  </td>
                  <td className="py-1">
                    <span
                      className={
                        virusTotalResult.malicious > 0
                          ? "text-red-500"
                          : "text-green-400"
                      }
                    >
                      {virusTotalResult.malicious}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Suspicious:</strong>{" "}
                    (Potential risks)
                  </td>
                  <td className="py-1">
                    <span
                      className={
                        virusTotalResult.suspicious > 0
                          ? "text-yellow-500"
                          : "text-green-400"
                      }
                    >
                      {virusTotalResult.suspicious}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Undetected:</strong> (Not
                    flagged)
                  </td>
                  <td className="py-1">{virusTotalResult.undetected}</td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Timeout:</strong> (Engines
                    failed to respond)
                  </td>
                  <td className="py-1">{virusTotalResult.timeout}</td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Total Scans:</strong> (Number
                    of engines)
                  </td>
                  <td className="py-1">{virusTotalResult.total_scans}</td>
                </tr>
                <tr>
                  <td className="py-1">
                    <strong className="text-white">Scan Date:</strong> (Last
                    analysis time)
                  </td>
                  <td className="py-1">{virusTotalResult.scan_date}</td>
                </tr>
              </tbody>
            </table>
            {virusTotalResult.detections &&
              virusTotalResult.detections.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text">
                    Detected Threats:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-red-400 mt-2">
                    {virusTotalResult.detections.map((detection, i) => (
                      <li
                        key={i}
                        className="pl-4 relative hover:bg-white/20 dark:hover:bg-gray-800/80 rounded-md py-1 transition-all before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
                      >
                        <strong>{detection.engine}:</strong>{" "}
                        {detection.category} - {detection.result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {virusTotalResult.error && (
              <p className="text-red-500 mt-2">
                Error: {virusTotalResult.error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Custom animations with Tailwind-compatible keyframes
const styles = `
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes gradient {
    0% { transform: scaleX(0); transform-origin: left; }
    50% { transform: scaleX(1); transform-origin: left; }
    51% { transform-origin: right; }
    100% { transform: scaleX(0); transform-origin: right; }
  }
  @keyframes expand {
    0% { max-height: 0; opacity: 0; }
    100% { max-height: 500px; opacity: 1; }
  }
  @keyframes collapse {
    0% { max-height: 500px; opacity: 1; }
    100% { max-height: 0; opacity: 0; }
  }
  .animate-gradient-text {
    background-size: 200% 200%;
    animation: gradientText 4s ease infinite;
  }
  .animate-gradient {
    animation: gradient 2s infinite ease-in-out;
  }
  .animate-expand {
    animation: expand 0.5s ease-in-out forwards;
  }
  .animate-collapse {
    animation: collapse 0.5s ease-in-out forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default ScanResult;
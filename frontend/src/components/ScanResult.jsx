// import React from "react";

// function ScanResult({ scan }) {
//   return (
//     <div className="bg-white/5 border border-gray-700 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-cyan-500/10 transition hover:shadow-cyan-500/20">
//       <h3 className="text-xl font-semibold text-cyan-400 break-all">
//         {scan.url}
//         <span className="text-sm text-white/60 ml-2">({scan.tool_name})</span>
//       </h3>

//       <p className="text-sm text-gray-400 mt-1">
//         <strong className="text-white">Scanned on:</strong>{" "}
//         {new Date(scan.created_at).toLocaleString()}
//       </p>

//       <pre className="mt-4 text-sm text-green-300 bg-black/60 p-4 rounded-lg overflow-auto whitespace-pre-wrap border border-cyan-700">
//         {scan.result}
//       </pre>
//     </div>
//   );
// }

// export default ScanResult;
import React from "react";

function ScanResult({ scan }) {
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

  return (
    <div className="bg-white/5 border border-gray-700 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-cyan-500/10 transition hover:shadow-cyan-500/20">
      <h3 className="text-xl font-semibold text-cyan-400 break-all">
        {scan.url}
        <span className="text-sm text-white/60 ml-2">({scan.tool_name})</span>
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        <strong className="text-white">Scanned on:</strong>{" "}
        {new Date(scan.created_at).toLocaleString()}
      </p>

      {scan.tool_name === "Wapiti" && (
        <div className="mt-4">
          <h4 className="text-lg font-medium text-cyan-300">Key Findings:</h4>
          <ul className="list-disc list-inside text-sm text-green-300 mt-2">
            {parseWapitiResults(scan.result).findings.map((finding, i) => (
              <li key={i}>{finding}</li>
            ))}
          </ul>
          {parseWapitiResults(scan.result).reportLink && (
            <div className="mt-3">
              <h4 className="text-lg font-medium text-cyan-300">
                Report Link:
              </h4>
              <a
                href={`file:///${parseWapitiResults(scan.result).reportLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all"
              >
                {parseWapitiResults(scan.result).reportLink}
              </a>
              <p className="text-xs text-gray-500 mt-1">
                (Note: Browser may block local file access. Consider serving via
                server.)
              </p>
            </div>
          )}
        </div>
      )}

      {scan.tool_name === "SQLMap" && (
        <div className="mt-4">
          <h4 className="text-lg font-medium text-cyan-300">Key Findings:</h4>
          <ul className="list-disc list-inside text-sm text-green-300 mt-2">
            {parseSQLMapResults(scan.result).map((finding, i) => (
              <li key={i}>{finding}</li>
            ))}
          </ul>
        </div>
      )}

      {scan.tool_name === "Nmap" && (
        <div className="mt-4">
          <h4 className="text-lg font-medium text-cyan-300">Open Ports:</h4>
          <ul className="list-disc list-inside text-sm text-green-300 mt-2">
            {parseNmapResults(scan.result).map((port, i) => (
              <li key={i}>{port}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScanResult;
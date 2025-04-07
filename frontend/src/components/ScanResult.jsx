import React from "react";

function ScanResult({ scan }) {
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

      <pre className="mt-4 text-sm text-green-300 bg-black/60 p-4 rounded-lg overflow-auto whitespace-pre-wrap border border-cyan-700">
        {scan.result}
      </pre>
    </div>
  );
}

export default ScanResult;

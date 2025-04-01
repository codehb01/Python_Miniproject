import React from "react";

function ScanResult({ scan }) {
  return (
    <div className="scan-result">
      <h3>
        {scan.url} - {scan.tool_name}
      </h3>
      <p>
        <strong>Scanned on:</strong>{" "}
        {new Date(scan.created_at).toLocaleString()}
      </p>
      <pre>{scan.result}</pre>
    </div>
  );
}

export default ScanResult;

// import React from "react";

// function ScanResult({ scan }) {
//   return (
//     <div className="scan-result">
//       <h3>
//         {scan.tool_name} Scan for {scan.url}
//       </h3>
//       <p>
//         <strong>Result:</strong>
//       </p>
//       <pre>{scan.result}</pre>
//       <small>Scanned on: {new Date(scan.created_at).toLocaleString()}</small>
//     </div>
//   );
// }

// export default ScanResult;

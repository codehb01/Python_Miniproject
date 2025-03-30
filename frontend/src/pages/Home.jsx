import { useState, useEffect } from "react";
import scanner from "../scanner";
import ScanResult from "../components/ScanResult"; // Assuming you'll create this component
import "../styles/Home.css"; // Reuse or adapt the CSS

function Home() {
  const [scans, setScans] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    getScans();
  }, []);

  const getScans = () => {
    scanner
      .get("/scanner/scans/")
      .then((res) => res.data)
      .then((data) => {
        setScans(data);
        console.log(data);
      })
      .catch((err) => alert("Error fetching scans: " + err));
  };

  const createScan = (e) => {
    e.preventDefault();
    scanner
      .post("/scanner/scans/", { url })
      .then((res) => {
        if (res.status === 201) {
          alert("Scan created successfully!");
          getScans(); // Refresh the scan list
          setUrl(""); // Clear the input field
        } else {
          alert("Failed to create scan.");
        }
      })
      .catch((err) => alert("Error creating scan: " + err));
  };

  return (
    <div>
      <div>
        <h2>Scan Results</h2>
        {scans.length > 0 ? (
          scans.map((scan) => <ScanResult scan={scan} key={scan.id} />)
        ) : (
          <p>No scans yet. Enter a URL to start scanning!</p>
        )}
      </div>
      <h2>Scan a Website</h2>
      <form onSubmit={createScan}>
        <label htmlFor="url">Website URL:</label>
        <br />
        <input
          type="text"
          id="url"
          name="url"
          required
          placeholder="e.g., http://example.com"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <br />
        <input type="submit" value="Scan Now" />
      </form>
    </div>
  );
}

export default Home;

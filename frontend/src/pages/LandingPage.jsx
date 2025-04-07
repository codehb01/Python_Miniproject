// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleNavLinkClick = (e) => {
      const target = e.target;
      if (target.classList.contains("nav-link")) {
        e.preventDefault();
        const sectionId = target.getAttribute("href");
        const section = document.querySelector(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleNavLinkClick);
    return () => document.removeEventListener("click", handleNavLinkClick);
  }, []);

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center h-screen relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-cyan-400 opacity-5 blur-3xl animate-pulse"></div>
        </div>

        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } z-10 px-4 text-center`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              ScanSecure
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Advanced vulnerability scanning for the modern web. Detect threats
            before they become breaches.
          </p>

          <div className="flex space-x-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Started
            </Link>
            <a 
              href="#services" 
              className="nav-link px-8 py-3 bg-transparent border border-gray-700 rounded-md font-medium hover:border-cyan-500 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="absolute bottom-16 left-0 w-full h-px bg-cyan-500/20 overflow-hidden">
          <div className="h-full w-20 bg-cyan-500 animate-scan"></div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                Our Services
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Advanced security solutions designed to protect your digital assets and infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vulnerability Scanning</h3>
              <p className="text-gray-400">
                Identify security flaws and misconfigurations in your systems before attackers do.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Penetration Testing</h3>
              <p className="text-gray-400">
                Simulated real-world attacks to uncover exploitable vulnerabilities in your environment.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h13v6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Security Audits</h3>
              <p className="text-gray-400">
                In-depth audits and compliance checks to align your infrastructure with industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">Why Choose ScanSecure?</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our platform blends automation with expert insights to provide you with actionable intelligence 
            and real-time protection. We are committed to ensuring your applications and networks stay 
            resilient in an ever-evolving threat landscape.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-500 text-center">
        <p>&copy; {new Date().getFullYear()} ScanSecure. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;

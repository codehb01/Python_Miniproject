import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ACCESS_TOKEN } from "../constants";

// Animation variant for fade-in-up effect
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({});
  const navigate = useNavigate();

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

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimatedElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((element) => observer.observe(element));

    document.addEventListener("click", handleNavLinkClick);

    return () => {
      document.removeEventListener("click", handleNavLinkClick);
      elementsToAnimate.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Dynamic Cybersecurity Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M0 0h100v100H0V0zm10 10h80v80H10V10z\' fill=\'none\' stroke=\'%233A5DFF\' stroke-width=\'1\' opacity=\'0.1\'/%3E%3Cline x1=\'0\' y1=\'0\' x2=\'100\' y2=\'100\' stroke=\'%233A5DFF\' stroke-width=\'0.5\' opacity=\'0.2\'/%3E%3Cline x1=\'100\' y1=\'0\' x2=\'0\' y2=\'100\' stroke=\'%236B21A8\' stroke-width=\'0.5\' opacity=\'0.2\'/%3E%3Canimatemotion dur=\'5s\' repeatCount=\'indefinite\'%3E%3Cmpath d=\'M0 50 Q 50 0 100 50 Q 50 100 0 50\'/%3E%3C/animatemotion%3E%3C/svg%3E')] bg-repeat opacity-50 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent 25%,rgba(58,93,255,0.05) 25%,rgba(58,93,255,0.05) 50%,transparent 50%,transparent 75%,rgba(107,33,168,0.05) 75%,rgba(107,33,168,0.05))] bg-[length:20px_20px] animate-scan-bg"></div>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center h-screen relative z-10"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-purple-600 opacity-5 blur-3xl animate-pulse"></div>
        </div>

        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } z-10 px-6 sm:px-4 text-center`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all hover:scale-110 hover:animate-glow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight text-shadow-lg animate-gradient-text"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              ScanSecure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-xl text-gray-300 max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Advanced vulnerability scanning for the modern web. Detect threats
            before they become breaches.
          </motion.p>

          <div className="flex space-x-4 justify-center">
            <motion.button
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 0.6 }}
              onClick={handleGetStarted}
              className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/50 active:scale-95 animate-bounce-once hover:animate-glow"
            >
              Let's get started
            </motion.button>

            <a
              href="#services"
              className="nav-link px-6 py-3 text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div
            id="services-header"
            className={`mb-16 text-center animate-on-scroll ${
              animatedElements["services-header"]
                ? "animate-fade-in-up"
                : "opacity-0 translate-y-8"
            }`}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text"
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Advanced security solutions designed to protect your digital
              assets and infrastructure
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1: Vulnerability Scanning */}
            <motion.div
              id="service-1"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 animate-on-scroll group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-200">
                Vulnerability Scanning
              </h3>
              <p className="text-gray-300">
                Identify security flaws and misconfigurations in your systems
                before attackers do.
              </p>
            </motion.div>

            {/* Service 2: Penetration Testing */}
            <motion.div
              id="service-2"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 animate-on-scroll group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-200">
                Penetration Testing
              </h3>
              <p className="text-gray-300">
                Simulated real-world attacks to uncover exploitable
                vulnerabilities in your environment.
              </p>
            </motion.div>

            {/* Service 3: VirusTotal & Wapiti Integration */}
            <motion.div
              id="service-3"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 animate-on-scroll group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-200">
                VirusTotal & Wapiti Integration
              </h3>
              <p className="text-gray-300">
                Provides reputation data and threat intelligence for your web
                applications.
              </p>
            </motion.div>

            {/* Service 4: Real-Time Dashboard */}
            <motion.div
              id="service-4"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 animate-on-scroll group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-200">
                Real-Time Dashboard
              </h3>
              <p className="text-gray-300">
                A real-time dashboard for vulnerability insights and trends.
              </p>
            </motion.div>

            {/* Service 5: Downloadable Reports */}
            <motion.div
              id="service-5"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 animate-on-scroll group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-200">
                Downloadable Reports
              </h3>
              <p className="text-gray-300">
                Downloadable PDF reports for audits and compliance.
              </p>
            </motion.div>

            {/* Service 6: SQLMap & Nmap Integration */}
            <motion.div
              id="service-6"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/20 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 animate-on-scroll group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0a2 2 0 00-2-2h-2a2 2 0 00-2 2m2-4h14"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-200">
                SQLMap & Nmap Integration
              </h3>
              <p className="text-gray-300">
                Detect SQL injections and network vulnerabilities with
                precision.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-black to-gray-950 text-center relative z-10"
      >
        <motion.div
          id="about-content"
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto px-4 p-6 bg-white/5 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-md animate-on-scroll"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-text"
          >
            Why Choose ScanSecure?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Our platform blends automation with expert insights to provide you
            with actionable intelligence and real-time protection. We are
            committed to ensuring your applications and networks stay resilient
            in an ever-evolving threat landscape.
          </motion.p>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 bg-gray-950/90 backdrop-blur-md text-gray-400 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                ScanSecure
              </h3>
              <p className="mb-4 text-gray-200">
                Protecting digital infrastructure for everyone
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Site Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/home"
                    className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="nav-link hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                  >
                    Dashboard
                  </a>
                </li>
                
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Our Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                  >
                    Vulnerability Scanning
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                  >
                    Penetration Testing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                  >
                    Security Audits
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
                  >
                    Security Consulting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Stay Updated
              </h3>
              <p className="mb-4 text-gray-200">
                Subscribe to our newsletter for security tips and updates.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800/80 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow border-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-r-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-200">
              © {new Date().getFullYear()} ScanSecure. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center space-x-6 text-sm">
              <a
                href="#"
                className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-blue-500 transition-transform duration-200 hover:scale-105"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom animations with Tailwind-compatible keyframes
const styles = `
  @keyframes gradient {
    0% { transform: scaleX(0); transform-origin: left; }
    50% { transform: scaleX(1); transform-origin: left; }
    51% { transform-origin: right; }
    100% { transform: scaleX(0); transform-origin: right; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes bounceOnce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes gradientText {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
    100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
  }
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanBg {
    0% { background-position: 0 0; }
    100% { background-position: 100% 100%; }
  }
  @keyframes pulseSlow {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .animate-gradient {
    animation: gradient 2s infinite ease-in-out;
  }
  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }
  .animate-bounce-once {
    transition: transform 0.2s ease;
  }
  .animate-bounce-once:hover {
    animation: bounceOnce 0.4s ease;
  }
  .animate-gradient-text {
    background-size: 200% 200%;
    animation: gradientText 4s ease infinite;
  }
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  .animate-float {
    animation: float 3s infinite ease-in-out;
  }
  .animate-pulse-glow {
    animation: pulseGlow 2s infinite linear;
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-scan-bg {
    animation: scanBg 10s infinite linear;
  }
  .animate-pulse-slow {
    animation: pulseSlow 6s infinite ease-in-out;
  }
  .text-shadow-lg {
    text-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
  }
  .text-shadow-sm {
    text-shadow: 0 1px 4px rgba(59, 130, 246, 0.3);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default LandingPage;
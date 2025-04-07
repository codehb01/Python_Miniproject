// // src/pages/LandingPage.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function LandingPage() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);

//     const handleNavLinkClick = (e) => {
//       const target = e.target;
//       if (target.classList.contains("nav-link")) {
//         e.preventDefault();
//         const sectionId = target.getAttribute("href");
//         const section = document.querySelector(sectionId);
//         if (section) {
//           section.scrollIntoView({ behavior: "smooth" });
//         }
//       }
//     };

//     document.addEventListener("click", handleNavLinkClick);
//     return () => document.removeEventListener("click", handleNavLinkClick);
//   }, []);

//   return (
//     <div className="bg-black text-white relative overflow-hidden">
//       <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

//       {/* Hero Section */}
//       <section id="hero" className="flex flex-col items-center justify-center h-screen relative">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-5 blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-cyan-400 opacity-5 blur-3xl animate-pulse"></div>
//         </div>

//         <div
//           className={`transition-all duration-1000 transform ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           } z-10 px-4 text-center`}
//         >
//           <div className="flex items-center justify-center mb-6">
//             <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                 />
//               </svg>
//             </div>
//           </div>

//           <h1 className="text-5xl font-bold mb-4 tracking-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
//               ScanSecure
//             </span>
//           </h1>

//           <p className="text-xl text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
//             Advanced vulnerability scanning for the modern web. Detect threats
//             before they become breaches.
//           </p>

//           <div className="flex space-x-4 justify-center">
//             <Link 
//               to="/login" 
//               className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
//             >
//               Get Started
//             </Link>
//             <a 
//               href="#services" 
//               className="nav-link px-8 py-3 bg-transparent border border-gray-700 rounded-md font-medium hover:border-cyan-500 transition-all"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>

//         <div className="absolute bottom-16 left-0 w-full h-px bg-cyan-500/20 overflow-hidden">
//           <div className="h-full w-20 bg-cyan-500 animate-scan"></div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//           </svg>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-24 relative">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="mb-16 text-center">
//             <h2 className="text-3xl font-bold mb-4">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
//                 Our Services
//               </span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">
//               Advanced security solutions designed to protect your digital assets and infrastructure
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Service 1 */}
//             <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group">
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Vulnerability Scanning</h3>
//               <p className="text-gray-400">
//                 Identify security flaws and misconfigurations in your systems before attackers do.
//               </p>
//             </div>

//             {/* Service 2 */}
//             <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group">
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Penetration Testing</h3>
//               <p className="text-gray-400">
//                 Simulated real-world attacks to uncover exploitable vulnerabilities in your environment.
//               </p>
//             </div>

//             {/* Service 3 */}
//             <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group">
//               <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h13v6" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Security Audits</h3>
//               <p className="text-gray-400">
//                 In-depth audits and compliance checks to align your infrastructure with industry best practices.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-center">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-6 text-white">Why Choose ScanSecure?</h2>
//           <p className="text-gray-400 text-lg leading-relaxed">
//             Our platform blends automation with expert insights to provide you with actionable intelligence 
//             and real-time protection. We are committed to ensuring your applications and networks stay 
//             resilient in an ever-evolving threat landscape.
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 bg-gray-900 text-gray-500 text-center">
//         <p>&copy; {new Date().getFullYear()} ScanSecure. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;
// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState({});

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

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimatedElements(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });

    document.addEventListener("click", handleNavLinkClick);
    
    return () => {
      document.removeEventListener("click", handleNavLinkClick);
      elementsToAnimate.forEach(element => {
        observer.unobserve(element);
      });
    };
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-float">
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

          <h1 className="text-5xl font-bold mb-4 tracking-tight animate-text-glow">
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
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105 duration-300"
            >
              Get Started
            </Link>
            <a 
              href="#services" 
              className="nav-link px-8 py-3 bg-transparent border border-gray-700 rounded-md font-medium hover:border-cyan-500 transition-all hover:bg-gray-800 duration-300"
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
          <div id="services-header" className={`mb-16 text-center animate-on-scroll ${animatedElements["services-header"] ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}>
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
            <div id="service-1" className={`bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group animate-on-scroll ${animatedElements["service-1"] ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "0ms" }}>
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
            <div id="service-2" className={`bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group animate-on-scroll ${animatedElements["service-2"] ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
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
            <div id="service-3" className={`bg-gray-900/60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-500/30 transition-all group animate-on-scroll ${animatedElements["service-3"] ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "300ms" }}>
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
        <div id="about-content" className={`max-w-4xl mx-auto px-4 animate-on-scroll ${animatedElements["about-content"] ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl font-bold mb-6 text-white">Why Choose ScanSecure?</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our platform blends automation with expert insights to provide you with actionable intelligence 
            and real-time protection. We are committed to ensuring your applications and networks stay 
            resilient in an ever-evolving threat landscape.
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">ScanSecure</h3>
              <p className="mb-4">Protecting digital infrastructure since 2020.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Site Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-cyan-500 transition-colors">Home</a></li>
                <li><a href="#services" className="nav-link hover:text-cyan-500 transition-colors">Services</a></li>
                <li><a href="#about" className="nav-link hover:text-cyan-500 transition-colors">About</a></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Services Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-cyan-500 transition-colors">Vulnerability Scanning</Link></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-colors">Penetration Testing</Link></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-colors">Security Audits</Link></li>
                <li><Link to="#" className="hover:text-cyan-500 transition-colors">Security Consulting</Link></li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
              <p className="mb-4">Subscribe to our newsletter for security tips and updates.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-cyan-500 flex-grow"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-r-md hover:shadow-md hover:shadow-cyan-500/20 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} ScanSecure. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cyan-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
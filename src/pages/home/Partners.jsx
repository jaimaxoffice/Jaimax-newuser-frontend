
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import catlog from "../../assets/catlog.svg";
// import coinmarket from "../../assets/coinmarket.svg";
// import binance from "../../assets/binance.svg";
// import github from "../../assets/github.svg";
// import gecko from "../../assets/gecko.png";

// gsap.registerPlugin(ScrollTrigger);

// const partners = [
//   { name: "Solar Communications", logo: catlog },
//   { name: "CBF", logo: coinmarket },
//   { name: "JPR", logo: github },
//   { name: "Talk Internet", logo: binance },
//   { name: "Talk Internet", logo: gecko },
// ];

// export default function CreativePartnersComponent() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const containerRef = useRef(null);
//   const duplicatedPartners = [...partners, ...partners];

//   useEffect(() => {
//     let isPaused = false;
//     const scrollContainer = scrollRef.current;

//     const scroll = () => {
//       if (scrollContainer && !isPaused) {
//         scrollContainer.scrollLeft += 0.5;
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//           scrollContainer.scrollLeft = 0;
//         }
//       }
//       requestAnimationFrame(scroll);
//     };

//     scroll();

//     const handleMouseEnter = () => (isPaused = true);
//     const handleMouseLeave = () => (isPaused = false);

//     scrollContainer.addEventListener("mouseenter", handleMouseEnter);
//     scrollContainer.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
//       scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".partner-heading", {
//         opacity: 0,
//         y: 30,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 85%",
//         },
//       });

//       gsap.from(".partner-card", {
//         opacity: 0,
//         scale: 0.8,
//         y: 50,
//         stagger: 0.15,
//         duration: 1,
//         ease: "back.out(1.7)",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 80%",
//         },
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className="py-0 sm:py-2 bg-[#085056]" ref={containerRef}>
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-lime-100 px-3 py-1 rounded-full text-lime-800 text-sm font-medium mb-4">
//             <div className="w-2 h-2 bg-lime-600 rounded-full" />
//             Partners
//           </div>
//           <h2 className="partner-heading text-3xl sm:text-4xl font-bold text-[#e3f252] mb-3">
//             Trusted by <span className="text-white">Industry Leaders</span>
//           </h2>
//           <p className="text-[#f0fdfa] max-w-2xl mx-auto text-sm sm:text-base">
//             Collaborating with forward-thinking companies across industries
//           </p>
//         </div>

//         {/* Scrolling Partners */}
//         <div className="relative mb-6 sm:mb-8">
//           <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-[#085056] to-transparent pointer-events-none z-10" />
//           <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-[#085056] to-transparent pointer-events-none z-10" />

//           <div
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-auto min-w-0 scroll-smooth scrollbar-hide px-2"
//           >
//             {duplicatedPartners.map((partner, index) => (
//               <div
//                 key={`${partner.name}-${index}`}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="partner-card relative flex-shrink-0 min-w-[4.5rem] sm:min-w-[5.5rem] md:min-w-[7rem] lg:min-w-[9.5rem] snap-start"
//               >
//                 <div className="relative h-14 sm:h-20 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-[#e3f252] hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
//                   {/* Overlay + Grayscale on hover */}
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10 rounded-lg" />
//                   <div className="absolute inset-0 flex items-center justify-center p-2 z-20">
//                     <img
//                       src={partner.logo}
//                       alt={partner.name}
//                       className="w-full h-full object-contain transition-all duration-300 group-hover:grayscale group-hover:scale-105"
//                       onError={(e) => {
//                         e.target.src = `data:image/svg+xml,${encodeURIComponent(`
//                           <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
//                             <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
//                             <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
//                           </svg>
//                         `)}`;
//                       }}
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//                 </div>

//                 {/* Tooltip only on md and above */}
//                 {hoveredIndex === index && (
//                   <div className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
//                     <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap relative">
//                       {partner.name}
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Disclaimer */}
//         <p className="text-lg text-[#d1f3ee] text-center max-w-3xl mx-auto px-4 sm:px-6 mt-2 sm:mt-4 leading-relaxed">
//           All company, product, and service names of third-party companies used
//           in this website are for identification purposes only. All these
//           product names, logos, and brands belong to their respective owners.
//         </p>

//         {/* CTA */}
//         <div className="text-center mt-0">
//           <p className="text-[#f0fdfa] text-sm mb-4">Join our partner network</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="group bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
//           >
//             <span className="flex items-center justify-center">
//               Become a Partner
//               <svg
//                 className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Custom CSS */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import catlog from "../../assets/catlog.webp";
// import coinmarket from "../../assets/coinmarket.webp";
// import binance from "../../assets/binance.webp";
// import github from "../../assets/github.webp";
// import gecko from "../../assets/gecko.webp";

// gsap.registerPlugin(ScrollTrigger);

// const partners = [
//   { 
//     name: "Solar Communications", 
//     logo: catlog,
//     title: "Solar Communications - Strategic Technology Partner",
//     description: "Leading communications provider"
//   },
//   { 
//     name: "CBF", 
//     logo: coinmarket,
//     title: "CoinMarketCap - Cryptocurrency Market Data Partner",
//     description: "Top crypto market analytics platform"
//   },
//   { 
//     name: "JPR", 
//     logo: github,
//     title: "GitHub - Development and Collaboration Partner",
//     description: "World's leading software development platform"
//   },
//   { 
//     name: "Talk Internet", 
//     logo: binance,
//     title: "Binance - Exchange Integration Partner",
//     description: "Global cryptocurrency exchange leader"
//   },
//   { 
//     name: "Talk Internet", 
//     logo: gecko,
//     title: "CoinGecko - Market Intelligence Partner",
//     description: "Comprehensive crypto data provider"
//   },
// ];

// export default function CreativePartnersComponent() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const containerRef = useRef(null);
//   const duplicatedPartners = [...partners, ...partners];

//   useEffect(() => {
//     let isPaused = false;
//     const scrollContainer = scrollRef.current;

//     const scroll = () => {
//       if (scrollContainer && !isPaused) {
//         scrollContainer.scrollLeft += 0.5;
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//           scrollContainer.scrollLeft = 0;
//         }
//       }
//       requestAnimationFrame(scroll);
//     };

//     scroll();

//     const handleMouseEnter = () => (isPaused = true);
//     const handleMouseLeave = () => (isPaused = false);

//     scrollContainer.addEventListener("mouseenter", handleMouseEnter);
//     scrollContainer.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
//       scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".partner-heading", {
//         opacity: 0,
//         y: 30,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 85%",
//         },
//       });

//       gsap.from(".partner-card", {
//         opacity: 0,
//         scale: 0.8,
//         y: 50,
//         stagger: 0.15,
//         duration: 1,
//         ease: "back.out(1.7)",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 80%",
//         },
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className="py-0 sm:py-2 bg-[#085056]" ref={containerRef}>
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-lime-100 px-3 py-1 rounded-full text-lime-800 text-sm font-medium mb-4">
//             <div className="w-2 h-2 bg-lime-600 rounded-full" />
//             Partners
//           </div>
//           <h2 className="partner-heading text-3xl sm:text-4xl font-bold text-[#e3f252] mb-3">
//             Trusted by <span className="text-white">Industry Leaders</span>
//           </h2>
//           <p className="text-[#f0fdfa] max-w-2xl mx-auto text-sm sm:text-base">
//             Collaborating with forward-thinking companies across industries
//           </p>
//         </div>

//         {/* Scrolling Partners */}
//         <div className="relative mb-6 sm:mb-8">
//           <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-[#085056] to-transparent pointer-events-none z-10" />
//           <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-[#085056] to-transparent pointer-events-none z-10" />

//           <div
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-auto min-w-0 scroll-smooth scrollbar-hide px-2"
//           >
//             {duplicatedPartners.map((partner, index) => (
//               <div
//                 key={`${partner.name}-${index}`}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="partner-card relative flex-shrink-0 min-w-[4.5rem] sm:min-w-[5.5rem] md:min-w-[7rem] lg:min-w-[9.5rem] snap-start"
//                 title={`Click to learn more about ${partner.name}`}
//               >
//                 <div className="relative h-14 sm:h-20 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-[#e3f252] hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
//                   {/* Overlay + Grayscale on hover */}
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10 rounded-lg" />
//                   <div className="absolute inset-0 flex items-center justify-center p-2 z-20">
//                     <img
//                       src={partner.logo}
//                       alt={`${partner.name} logo - ${partner.description || 'Trusted partner'}`}
//                       title={partner.title}
//                       className="w-full h-full object-contain transition-all duration-300 group-hover:grayscale group-hover:scale-105"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.src = `data:image/svg+xml,${encodeURIComponent(`
//                           <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
//                             <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
//                             <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
//                           </svg>
//                         `)}`;
//                         e.target.title = `${partner.name} - Logo unavailable`;
//                         e.target.alt = `${partner.name} - Placeholder image`;
//                       }}
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//                 </div>

//                 {/* Tooltip only on md and above */}
//                 {hoveredIndex === index && (
//                   <div className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
//                     <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap relative">
//                       {partner.name}
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Disclaimer */}
//         <p className="text-lg text-[#d1f3ee] text-center max-w-3xl mx-auto px-4 sm:px-6 mt-2 sm:mt-4 leading-relaxed">
//           All company, product, and service names of third-party companies used
//           in this website are for identification purposes only. All these
//           product names, logos, and brands belong to their respective owners.
//         </p>

//         {/* CTA */}
//         <div className="text-center mt-0">
//           <p className="text-[#f0fdfa] text-sm mb-4">Join our partner network</p>
//           <button
//             onClick={() => navigate("/login")}
//             className="group bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
//             title="Join Jaimax as a partner - Start your partnership journey"
//             aria-label="Navigate to partner registration page"
//           >
//             <span className="flex items-center justify-center">
//               Become a Partner
//               <svg
//                 className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Custom CSS */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Partner logos
import catlog from "../../assets/catlog.webp";
import coinmarket from "../../assets/coinmarket.webp";
import binance from "../../assets/binance.webp";
import github from "../../assets/github.webp";
import gecko from "../../assets/gecko.webp";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Partner data with detailed information
const PARTNERS = [
  { 
    id: "solar-comms",
    name: "Solar Communications", 
    logo: catlog,
    title: "Solar Communications - Strategic Technology Partner",
    description: "Leading communications provider enhancing our technological infrastructure"
  },
  { 
    id: "cbf-market",
    name: "CBF", 
    logo: coinmarket,
    title: "CoinMarketCap - Cryptocurrency Market Data Partner",
    description: "Top crypto market analytics platform providing real-time financial insights"
  },
  { 
    id: "jpr-dev",
    name: "JPR", 
    logo: github,
    title: "GitHub - Development and Collaboration Partner",
    description: "World's leading software development platform supporting our code infrastructure"
  },
  { 
    id: "talk-exchange",
    name: "Talk Internet", 
    logo: binance,
    title: "Binance - Exchange Integration Partner",
    description: "Global cryptocurrency exchange leader enabling seamless transactions"
  },
  { 
    id: "gecko-intel",
    name: "CoinGecko", 
    logo: gecko,
    title: "CoinGecko - Market Intelligence Partner",
    description: "Comprehensive crypto data provider enhancing our market analysis capabilities"
  },
];

const CreativePartnersComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  // Create a triple set of partners for smoother infinite scrolling
  const infinitePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  // Enhanced infinite scrolling implementation
  useEffect(() => {
    let isPaused = false;
    const scrollContainer = scrollRef.current;
    let scrollSpeed = 0.5; // Adjust speed as needed
    
    // Calculate the width of one set of partners (for reset position)
    const calculateSetWidth = () => {
      if (!scrollContainer) return 0;
      return scrollContainer.scrollWidth / 3;
    };
    
    // Improved scroll function with smoother looping
    const smoothScroll = () => {
      if (scrollContainer && !isPaused && document.visibilityState === 'visible') {
        // Increment scroll position
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Check if we need to reset the scroll position
        // When we reach the start of the third set, jump back to the identical position in the second set
        if (scrollContainer.scrollLeft >= calculateSetWidth() * 2) {
          // This creates a seamless loop by jumping back to the same relative position
          scrollContainer.scrollLeft = calculateSetWidth();
        }
      }
      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    // Initial positioning - start at the second set for seamless looping in both directions
    if (scrollContainer) {
      scrollContainer.scrollLeft = calculateSetWidth();
    }

    animationRef.current = requestAnimationFrame(smoothScroll);

    const handleMouseEnter = () => (isPaused = true);
    const handleMouseLeave = () => (isPaused = false);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(animationRef.current);
      } else {
        animationRef.current = requestAnimationFrame(smoothScroll);
      }
    };
    
    // Optional: Add touch/drag handling
    const handleTouchStart = () => (isPaused = true);
    const handleTouchEnd = () => {
      isPaused = false;
      // Reset to the second set if user scrolled too far
      if (scrollContainer.scrollLeft < calculateSetWidth() * 0.5 || 
          scrollContainer.scrollLeft > calculateSetWidth() * 2.5) {
        scrollContainer.scrollLeft = calculateSetWidth();
      }
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("touchstart", handleTouchStart);
    scrollContainer.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationRef.current);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // GSAP animations for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    const ctx = gsap.context(() => {
      gsap.from(".partner-heading", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".partner-card", {
        opacity: 0,
        scale: 0.8,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  // Handle partner card click
  const handlePartnerClick = useCallback((partner) => {
    console.log(`Partner clicked: ${partner.name}`);
    // Could navigate to partner detail page or open modal
  }, []);

  // Error handler for image loading
  const handleImageError = useCallback((e, partner) => {
    e.target.src = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
        <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
      </svg>
    `)}`;
    e.target.title = `${partner.name} - Logo unavailable`;
    e.target.alt = `${partner.name} - Placeholder image`;
  }, []);

  return (
    <section 
      className="py-12 sm:py-16 bg-[#085056]" 
      ref={containerRef}
      aria-labelledby="partners-section-title"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Framer Motion */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-lime-100/90 px-3 py-1 rounded-full text-lime-800 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-2 h-2 bg-lime-600 rounded-full" />
            <span>Strategic Partnerships</span>
          </motion.div>
          
          <h2 
            id="partners-section-title"
            className="partner-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e3f252] mb-4"
          >
            Trusted by <span className="text-white">Industry Leaders</span>
          </h2>
          
          <p className="text-[#f0fdfa] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Collaborating with forward-thinking companies across industries to drive innovation and deliver exceptional value to our users
          </p>
        </motion.div>

        {/* Enhanced Infinite Scrolling Partners Carousel */}
        <div className="relative mb-12 overflow-hidden">
          {/* Gradient overlays for scroll effect */}
          <div className="absolute left-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-r from-[#085056] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 w-16 sm:w-24 h-full bg-gradient-to-l from-[#085056] to-transparent pointer-events-none z-10" />

          {/* Partner logos carousel with triple set of logos for smoother infinite scrolling */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto min-w-0 scroll-smooth scrollbar-hide py-4 px-2"
            aria-label="Partner logos carousel"
            style={{ scrollBehavior: "auto" }} // Important for smooth resets
          >
            {infinitePartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handlePartnerClick(partner)}
                className="partner-card relative flex-shrink-0 min-w-[6rem] sm:min-w-[7rem] md:min-w-[8.5rem] lg:min-w-[10rem] snap-start"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label={`${partner.name} - ${partner.description}`}
              >
                <motion.div 
                  className="relative h-16 sm:h-24 bg-white/95 border border-gray-200/30 rounded-lg overflow-hidden group"
                  whileHover={{ boxShadow: "0 10px 25px -5px rgba(227, 242, 82, 0.3)" }}
                >
                  {/* Overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10 rounded-lg" 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                  />
                  
                  {/* Partner logo */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 z-20">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo - ${partner.description}`}
                      title={partner.title}
                      className="w-full h-full object-contain transition-all duration-300 group-hover:grayscale group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => handleImageError(e, partner)}
                    />
                  </div>
                  
                  {/* Animated bottom indicator */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-emerald-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Tooltip with Framer Motion */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div 
                      className="hidden md:block absolute -top-12 left-1/2 z-20"
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-gray-900/95 text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-lg whitespace-nowrap">
                        {partner.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer with improved styling */}
        <div className="bg-[#064045]/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 max-w-4xl mx-auto mb-10">
          <p className="text-sm sm:text-base text-[#d1f3ee] text-center leading-relaxed">
            All company, product, and service names of third-party companies used on this website are for identification purposes only. 
            All product names, logos, and brands belong to their respective owners and are used under fair use principles.
          </p>
        </div>

        {/* CTA with Framer Motion */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-[#f0fdfa] text-sm mb-5">Join our expanding network of industry-leading partners</p>
          
          <motion.button
            onClick={() => navigate("/login/")}
            className="group bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold px-7 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#085056]"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            title="Join our partner network - Start your partnership journey"
            aria-label="Navigate to partner registration page"
          >
            <span className="flex items-center justify-center">
              Become a Partner
              <motion.svg
                className="ml-1.5 w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                initial={{ x: 0 }}
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CreativePartnersComponent;


// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import gecko from '../../assets/Images/gecko.png';
// import github from '../../assets/Images/github (2).svg';
// // import coinmarket from '../../assets/Images/coinmarket.svg';
// import catalog from '../../assets/Images/catalog.svg';
// import binance from '../../assets/Images/binance.svg';
// import clients from '../../assets/Images/binance.svg';

// import coinmarket from "../../assets/coinmarket.svg"

// const partners = [
//   coinmarket,
//   catalog ,
//   binance,
//    clients,
//     coinmarket,
//   catalog ,
//   binance,
//    clients,
//     coinmarket,
//   catalog ,
//   binance,
 
// ];

// const cubeFaces = partners.slice(0, 6);

// export default function Perfect3DCubePartners() {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <>
//       <style>{`
//         .partners-section {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           background: linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%);
//           font-family: 'Inter', sans-serif;
//           color: #ffffff;
//           padding: 80px 0 40px 0;
//           min-height: 80vh;
//           gap: 60px;
//           box-sizing: border-box;
//           width: 100%;
//         }

//         .top-container {
//           display: flex;
//           gap: 80px;
//           align-items: center;
//           max-width: 1200px;
//           width: 100%;
//           flex-wrap: wrap;
//           justify-content: center;
//           padding: 0 40px;
//           box-sizing: border-box;
//         }

//         .cube-container {
//           flex-shrink: 0;
//           width: 140px;
//           height: 140px;
//           perspective: 1400px;
//         }

//         .cube {
//           width: 140px;
//           height: 140px;
//           position: relative;
//           transform-style: preserve-3d;
//           animation: rotateCube 20s linear infinite;
//           transition: animation-play-state 0.3s ease;
//           margin: auto;
//           border-radius: 10px;
//           box-shadow: none;
//         }
//         .cube.paused {
//           animation-play-state: paused;
//         }

//         .face {
//           position: absolute;
//           width: 140px;
//           height: 140px;
//           border-radius: 10px;
//           background: rgba(255, 255, 255, 0.06);
//           border: 2px solid #06b6d4;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.3);
//           backface-visibility: hidden;
//           cursor: pointer;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .face img {
//           max-width: 70%;
//           max-height: 70%;
//           object-fit: contain;
//           filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.8));
//           transition: transform 0.3s ease;
//           user-select: none;
//           pointer-events: none;
//         }
//         .face:hover img {
//           transform: scale(1.15);
//           filter: drop-shadow(0 0 12px rgba(0, 255, 255, 1));
//         }
//         .face:hover {
//           box-shadow: 0 0 20px 3px #06b6d4;
//         }

//         .face.front  { transform: translateZ(70px); }
//         .face.back   { transform: rotateY(180deg) translateZ(70px); }
//         .face.right  { transform: rotateY(90deg) translateZ(70px); }
//         .face.left   { transform: rotateY(-90deg) translateZ(70px); }
//         .face.top    { transform: rotateX(90deg) translateZ(70px); }
//         .face.bottom { transform: rotateX(-90deg) translateZ(70px); }

//         @keyframes rotateCube {
//           0%   { transform: rotateX(0deg) rotateY(0deg); }
//           100% { transform: rotateX(360deg) rotateY(360deg); }
//         }

//         .content {
//           max-width: 620px;
//           text-align: center;
//           user-select: none;
//           padding: 0 20px;
//         }
//         .content h2 {
//           font-size: 2.8rem;
//           margin-bottom: 0.6rem;
//           font-weight: 700;
//           color: #e0f7fa;
//         }
//         .content strong {
//           color: #06b6d4;
//         }
//         .content p {
//           font-size: 1.25rem;
//           line-height: 1.7;
//           margin-bottom: 1.8rem;
//           color: #d0e8ea;
//         }
//         .content button {
//           padding: 0.85rem 2.2rem;
//           background: #06b6d4;
//           border: none;
//           border-radius: 30px;
//           color: white;
//           font-weight: 600;
//           font-size: 1.1rem;
//           cursor: pointer;
//           box-shadow: 0 6px 18px rgba(6,182,212,0.6);
//           transition: background-color 0.3s ease;
//         }
//         .content button:hover {
//           background: #038ea6;
//         }

//         .cards-scroll-container {
//           width: 100vw;
//           padding: 15px 40px;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           background: rgba(255, 255, 255, 0.06);
         
       
//           user-select: none;
//           overflow: hidden;
//         }

//         .scroll-row {
//           display: flex;
//           gap: 16px;
//           animation: scrollLeft 15s linear infinite;
//           white-space: nowrap;
//         }

//         .scroll-row:nth-child(2) {
//           animation: scrollRight 15s linear infinite;
//         }

//         @keyframes scrollLeft {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }

//         @keyframes scrollRight {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }

//         .partner-card {
//           flex: 0 0 120px;
//           height: 90px;
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 12px;
        
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           cursor: pointer;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           border: 2px solid transparent;
//         }
//         .partner-card:hover {
//           transform: scale(1.1);
//           box-shadow: 0 10px 28px rgba(6,182,212,0.75);
//           border-color: #06b6d4;
//           z-index: 10;
//         }
//         .partner-card img {
//           max-width: 70%;
//           max-height: 70%;
//           object-fit: contain;
//           filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.9));
//           user-select: none;
//           pointer-events: none;
//           transition: filter 0.3s ease;
//         }
//         .partner-card:hover img {
//           filter: drop-shadow(0 0 18px rgba(0, 255, 255, 1));
//         }

//         @media (max-width: 900px) {
//           .top-container {
//             flex-direction: column;
//             gap: 40px;
//           }
//           .content {
//             max-width: 100%;
//             padding: 0 20px;
//           }
//           .cards-scroll-container {
//             padding: 20px 20px;
//             gap: 16px;
//           }
//           .partner-card {
//             flex: 0 0 100px;
//             height: 75px;
//             border-radius: 10px;
//           }
//           .cube-container {
//             width: 200px;
//             height: 200px;
//           }
//           .cube {
//             width: 170px;
//             height: 170px;
//           }
//           .face {
//             width: 170px;
//             height: 170px;
//           }
//         }

//         @media (max-width: 900px) {
//   .partners-section {
//     padding: 60px 20px 30px;
//     gap: 40px;
//   }

//   .top-container {
//     flex-direction: column;
//     gap: 30px;
//     padding: 0 20px;
//     align-items: center;
//   }

//   .cube-container {
//     width: 160px;
//     height: 160px;
//     perspective: 1200px;
//   }

//   .cube {
//     width: 140px;
//     height: 140px;
//   }

//   .face {
//     width: 140px;
//     height: 140px;
//   }

//   .content {
//     max-width: 100%;
//     text-align: center;
//     padding: 0;
//   }

//   .content h2 {
//     font-size: 2rem;
//   }

//   .content p {
//     font-size: 1rem;
//     line-height: 1.5;
//   }

//   .cards-scroll-container {
//     padding: 15px 15px;
//     gap: 12px;
//   }

//   .partner-card {
//     flex: 0 0 90px;
//     height: 70px;
//     border-radius: 10px;
//   }
// }

//       `}</style>

//       <section
//         className="partners-section"
//         aria-label="Partners showcase with perfect 3D rotating cube and scrollable partner cards"
//       >
//         <div className="top-container">
//           <div
//             className="cube-container"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             <div className={`cube ${isHovered ? "paused" : ""}`}>
//               {cubeFaces.map((logo, idx) => {
//                 const faceNames = [
//                   "front",
//                   "back",
//                   "right",
//                   "left",
//                   "top",
//                   "bottom",
//                 ];
//                 return (
//                   <div key={idx} className={`face ${faceNames[idx]}`}>
//                     <img
//                       src={logo}
//                       alt={`Partner logo ${idx + 1}`}
//                       loading="lazy"
//                       draggable={false}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="content">
//             <h2>
//               Our <strong>Trusted Partners</strong>
//             </h2>
//             <p>
//               We collaborate with industry leaders and innovators to bring you the
//               best solutions and services. Our partners are carefully selected to
//               ensure quality, reliability, and cutting-edge technology.
//             </p>
//             <button onClick={() => alert("Explore partners soon!")}>
//               Learn More
//             </button>
//           </div>
//         </div>

//         <div
//           className="cards-scroll-container"
//           aria-label="Scrolling partner logos in opposite directions"
//         >
//           <div className="scroll-row">
//             {[...partners, ...partners].map((logo, index) => (
//               <div
//                 key={`row1-${index}`}
//                 className="partner-card"
//                 title={`Partner ${(index % partners.length) + 1}`}
//               >
//                 <img
//                   src={logo}
//                   alt={`Partner logo ${(index % partners.length) + 1}`}
//                   loading="lazy"
//                   draggable={false}
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="scroll-row">
//             {[...partners, ...partners].map((logo, index) => (
//               <div
//                 key={`row2-${index}`}
//                 className="partner-card"
//                 title={`Partner ${(index % partners.length) + 1}`}
//               >
//                 <img
//                   src={logo}
//                   alt={`Partner logo ${(index % partners.length) + 1}`}
//                   loading="lazy"
//                   draggable={false}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }










// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const partners = [
//   {
//     name: "Solar Communications",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/solar-communications-200.png",
//   },
//   {
//     name: "CBF",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/cbf-200.png",
//   },
//   {
//     name: "GXS",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/gxs-200.png",
//   },
//   {
//     name: "JPR",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/jpr-200.png",
//   },
//   {
//     name: "Talk Internet",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/talk-internet-200.png",
//   },
//   {
//     name: "Opera3",
//     logo: "https://www.pmits.co.uk/Portals/0/img/opera3_logo.png",
//   },
//   {
//     name: "Pegasus",
//     logo: "https://www.pmits.co.uk/Portals/0/pegasus-logo.png",
//   },
//   {
//     name: "Sage",
//     logo: "https://www.pmits.co.uk/Portals/0/sage business partner.jpg",
//   },
// ];

// export default function CreativePartnersComponent() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [isScrolling, setIsScrolling] = useState(true);
//   const navigate = useNavigate();
//   // Duplicate partners for seamless loop
//   const duplicatedPartners = [...partners, ...partners];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (isScrolling) {
//         const container = document.getElementById('partners-scroll');
//         if (container) {
//           container.scrollLeft += 1;
//           // Reset when we've scrolled through first set
//           if (container.scrollLeft >= container.scrollWidth / 2) {
//             container.scrollLeft = 0;
//           }
//         }
//       }
//     }, 20);

//     return () => clearInterval(interval);
//   }, [isScrolling]);

//   return (
//     <section className="py-12 sm:py-16">
//       <div className="max-w-9xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full text-teal-700 text-sm font-medium mb-4">
//             <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
//             Partners
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-[#b2c625] mb-3">
//             Trusted by <span className="text-teal-600">Industry Leaders</span>
//           </h2>
//           <p className="text-white max-w-2xl mx-auto">
//             Collaborating with forward-thinking companies across industries
//           </p>
//         </div>

//         {/* Scrolling Partners Container */}
//         <div className="relative mb-10">
//           {/* Gradient overlays for fade effect */}
//           <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
//           {/* Scrolling container */}
//           <div 
//             id="partners-scroll"
//             className="flex gap-4 overflow-x-hidden scroll-smooth"
//             onMouseEnter={() => setIsScrolling(false)}
//             onMouseLeave={() => setIsScrolling(true)}
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {duplicatedPartners.map((partner, index) => (
//               <div
//                 key={`${partner.name}-${index}`}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="group relative flex-shrink-0"
//               >
//                 {/* Partner Card */}
//                 <div className="relative w-32 h-20 sm:w-36 sm:h-24 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">
//                   {/* Logo */}
//                   <div className="absolute inset-0 flex items-center justify-center p-3">
//                     <img
//                       src={partner.logo}
//                       alt={partner.name}
//                       className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
//                       onError={(e) => {
//                         e.target.src = `data:image/svg+xml,${encodeURIComponent(`
//                           <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
//                             <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
//                             <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
//                           </svg>
//                         `)}`;
//                       }}
//                     />
//                   </div>

//                   {/* Hover accent */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
//                 </div>

//                 {/* Tooltip */}
//                 {hoveredIndex === index && (
//                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
//                     <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap">
//                       {partner.name}
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Controls and CTA */}
//         <div className="text-center">
         
          
//           <p className="text-white text-sm mb-4">
//             Join our partner network
//           </p>
//           <button className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-200">
//             <span className="flex items-center" onClick={() => navigate("/login")}>
//               Become a Partner
//               <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>

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

//         #partners-scroll::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// }


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const partners = [
//   {
//     name: "Solar Communications",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/solar-communications-200.png",
//   },
//   {
//     name: "CBF",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/cbf-200.png",
//   },
//   {
//     name: "GXS",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/gxs-200.png",
//   },
//   {
//     name: "JPR",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/jpr-200.png",
//   },
//   {
//     name: "Talk Internet",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/talk-internet-200.png",
//   },
//   {
//     name: "Opera3",
//     logo: "https://www.pmits.co.uk/Portals/0/img/opera3_logo.png",
//   },
//   {
//     name: "Pegasus",
//     logo: "https://www.pmits.co.uk/Portals/0/pegasus-logo.png",
//   },
//   {
//     name: "Sage",
//     logo: "https://www.pmits.co.uk/Portals/0/sage business partner.jpg",
//   },
// ];

// export default function CreativePartnersComponent() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const scrollSpeed = 1;
//   const duplicatedPartners = [...partners, ...partners];

//   useEffect(() => {
//     let isPaused = false;
//     const scrollContainer = scrollRef.current;

//     const scroll = () => {
//       if (scrollContainer && !isPaused) {
//         scrollContainer.scrollLeft += scrollSpeed;
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//           scrollContainer.scrollLeft = 0;
//         }
//       }
//     };

//     const interval = setInterval(scroll, 20);

//     // Pause/resume on hover
//     const handleMouseEnter = () => (isPaused = true);
//     const handleMouseLeave = () => (isPaused = false);

//     scrollContainer.addEventListener("mouseenter", handleMouseEnter);
//     scrollContainer.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       clearInterval(interval);
//       scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
//       scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <section className="py-12 sm:py-16">
//       <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full text-teal-700 text-sm font-medium mb-4">
//             <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
//             Partners
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-[#b2c625] mb-3">
//             Trusted by <span className="text-teal-600">Industry Leaders</span>
//           </h2>
//           <p className="text-white max-w-2xl mx-auto">
//             Collaborating with forward-thinking companies across industries
//           </p>
//         </div>

//         {/* Scrolling Partners */}
//         <div className="relative mb-10">
//           <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//           <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

//           <div
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-hidden scroll-smooth scrollbar-hide"
//           >
//             {duplicatedPartners.map((partner, index) => (
//               <div
//                 key={`${partner.name}-${index}`}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="relative flex-shrink-0 w-28 sm:w-32 md:w-36 lg:w-40 snap-start"
//               >
//                 <div className="relative h-20 sm:h-24 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
//                   <div className="absolute inset-0 flex items-center justify-center p-3">
//                     <img
//                       src={partner.logo}
//                       alt={partner.name}
//                       className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
//                       onError={(e) => {
//                         e.target.src = `data:image/svg+xml,${encodeURIComponent(`
//                           <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
//                             <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
//                             <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
//                           </svg>
//                         `)}`;
//                       }}
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//                 </div>

//                 {hoveredIndex === index && (
//                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
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

//         {/* CTA */}
//         <div className="text-center">
//           <p className="text-white text-sm mb-4">Join our partner network</p>
//           <button
//             className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
//             onClick={() => navigate("/login")}
//           >
//             <span className="flex items-center justify-center">
//               Become a Partner
//               <svg
//                 className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
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

//       {/* CSS */}
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

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import catlog from "../../assets/catlog.svg";
import coinmarket from "../../assets/coinmarket.svg";
import binance from "../../assets/binance.svg";
import github from "../../assets/github.svg";
import gecko from "../../assets/gecko.png";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "Solar Communications", logo: catlog },
  { name: "CBF", logo: coinmarket },
  { name: "JPR", logo: github },
  { name: "Talk Internet", logo: binance },
  { name: "Talk Internet", logo: gecko },
];

export default function CreativePartnersComponent() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    let isPaused = false;
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += 0.5;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    scroll();

    const handleMouseEnter = () => (isPaused = true);
    const handleMouseLeave = () => (isPaused = false);

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-[#085056]" ref={containerRef}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-lime-100 px-3 py-1 rounded-full text-lime-800 text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-lime-600 rounded-full" />
            Partners
          </div>
          <h2 className="partner-heading text-3xl sm:text-4xl font-bold text-[#e3f252] mb-3">
            Trusted by <span className="text-white">Industry Leaders</span>
          </h2>
          <p className="text-[#f0fdfa] max-w-2xl mx-auto text-sm sm:text-base">
            Collaborating with forward-thinking companies across industries
          </p>
        </div>

        {/* Scrolling Partners */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-[#085056] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-[#085056] to-transparent pointer-events-none z-10" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto min-w-0 scroll-smooth scrollbar-hide px-2"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="partner-card relative flex-shrink-0 min-w-[4.5rem] sm:min-w-[5.5rem] md:min-w-[6.5rem] lg:min-w-[7.5rem] snap-start"
              >
                <div className="relative h-14 sm:h-20 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-[#e3f252] hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
                  {/* Overlay + Grayscale on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10 rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center p-2 z-20">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain transition-all duration-300 group-hover:grayscale group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
                            <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
                            <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>

                {/* Tooltip only on md and above */}
                {hoveredIndex === index && (
                  <div className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
                    <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap relative">
                      {partner.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-lg text-[#d1f3ee] text-center max-w-3xl mx-auto px-4 sm:px-6 mt-2 sm:mt-4 leading-relaxed">
          All company, product, and service names of third-party companies used
          in this website are for identification purposes only. All these
          product names, logos, and brands belong to their respective owners.
        </p>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-[#f0fdfa] text-sm mb-4">Join our partner network</p>
          <button
            onClick={() => navigate("/login")}
            className="group bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
          >
            <span className="flex items-center justify-center">
              Become a Partner
              <svg
                className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
}



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const partners = [
//   {
//     name: "Solar Communications",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/solar-communications-200.png",
//   },
//   {
//     name: "CBF",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/cbf-200.png",
//   },
//   {
//     name: "GXS",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/gxs-200.png",
//   },
//   {
//     name: "JPR",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/jpr-200.png",
//   },
//   {
//     name: "Talk Internet",
//     logo: "https://www.pmits.co.uk/portals/0/images/partners/talk-internet-200.png",
//   },
//   {
//     name: "Opera3",
//     logo: "https://www.pmits.co.uk/Portals/0/img/opera3_logo.png",
//   },
//   {
//     name: "Pegasus",
//     logo: "https://www.pmits.co.uk/Portals/0/pegasus-logo.png",
//   },
//   {
//     name: "Sage",
//     logo: "https://www.pmits.co.uk/Portals/0/sage business partner.jpg",
//   },
// ];

// export default function CreativePartnersComponent() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const navigate = useNavigate();
//   const scrollRef = useRef(null);
//   const scrollSpeed = 1;
//   const duplicatedPartners = [...partners, ...partners];

//   useEffect(() => {
//     let isPaused = false;
//     const scrollContainer = scrollRef.current;

//     const scroll = () => {
//       if (scrollContainer && !isPaused) {
//         scrollContainer.scrollLeft += scrollSpeed;
//         if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//           scrollContainer.scrollLeft = 0;
//         }
//       }
//     };

//     const interval = setInterval(scroll, 20);

//     // Pause/resume on hover
//     const handleMouseEnter = () => (isPaused = true);
//     const handleMouseLeave = () => (isPaused = false);

//     scrollContainer.addEventListener("mouseenter", handleMouseEnter);
//     scrollContainer.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       clearInterval(interval);
//       scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
//       scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <section className="py-12 sm:py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full text-teal-700 text-sm font-medium mb-4">
//             <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
//             Partners
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-[#b2c625] mb-3">
//             Trusted by <span className="text-teal-600">Industry Leaders</span>
//           </h2>
//           <p className="text-white max-w-2xl mx-auto">
//             Collaborating with forward-thinking companies across industries
//           </p>
//         </div>

//         {/* Scrolling Partners */}
//         <div className="relative mb-10">
//           <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//           <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

//           <div
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-hidden scroll-smooth scrollbar-hide"
//           >
//             {duplicatedPartners.map((partner, index) => (
//               <div
//                 key={`${partner.name}-${index}`}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className="relative flex-shrink-0 w-28 sm:w-32 md:w-36 lg:w-40 snap-start"
//               >
//                 <div className="relative h-20 sm:h-24 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden group">
//                   <div className="absolute inset-0 flex items-center justify-center p-3">
//                     <img
//                       src={partner.logo}
//                       alt={partner.name}
//                       className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
//                       onError={(e) => {
//                         e.target.src = `data:image/svg+xml,${encodeURIComponent(`
//                           <svg width="80" height="40" xmlns="http://www.w3.org/2000/svg">
//                             <rect width="80" height="40" fill="#f8fafc" stroke="#e2e8f0" rx="4"/>
//                             <text x="40" y="25" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="9">${partner.name}</text>
//                           </svg>
//                         `)}`;
//                       }}
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//                 </div>

//                 {hoveredIndex === index && (
//                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 animate-fadeIn">
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

//         {/* CTA */}
//         <div className="text-center">
//           <p className="text-white text-sm mb-4">Join our partner network</p>
//           <button
//             className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
//             onClick={() => navigate("/login")}
//           >
//             <span className="flex items-center justify-center">
//               Become a Partner
//               <svg
//                 className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
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

//       {/* CSS */}
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

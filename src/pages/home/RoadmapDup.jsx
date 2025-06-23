// // import React, { useState, useEffect, useRef } from 'react';

// // const ProjectRoadmap = () => {
// //   const [scrollY, setScrollY] = useState(0);
// //   const [visibleCards, setVisibleCards] = useState(new Set());
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// //   const containerRef = useRef(null);

// //   const roadmapData = {
// //     2024: [
// //       { 
// //         id: 'p1-2024',
// //         phase: "Phase 1", 
// //         title: "Concept Development",
// //         description: "Foundation building with core team assembly and strategic planning frameworks.",
// //         tags: ["Team Formation", "Strategy", "Planning"],
// //         icon: "🚀",
// //         progress: 100,
// //         status: "completed"
// //       },
// //       { 
// //         id: 'p2-2024',
// //         phase: "Phase 2", 
// //         title: "Smart Contract Development",
// //         description: "Advanced blockchain architecture with security audits and protocols.",
// //         tags: ["Smart Contracts", "Security", "Blockchain"],
// //         icon: "🔒",
// //         progress: 85,
// //         status: "active"
// //       },
// //       { 
// //         id: 'p3-2024',
// //         phase: "Phase 3", 
// //         title: "Platform Development",
// //         description: "Digital platform with comprehensive documentation and specifications.",
// //         tags: ["Platform", "Documentation", "UI/UX"],
// //         icon: "📄",
// //         progress: 70,
// //         status: "active"
// //       },
// //       { 
// //         id: 'p4-2024',
// //         phase: "Phase 4", 
// //         title: "Token Launch",
// //         description: "Token launch with comprehensive marketing and fundraising campaigns.",
// //         tags: ["Token", "Marketing", "Fundraising"],
// //         icon: "💰",
// //         progress: 40,
// //         status: "upcoming"
// //       },
// //       { 
// //         id: 'p5-2024',
// //         phase: "Phase 5", 
// //         title: "Mobile App Launch",
// //         description: "Cross-platform mobile applications with seamless user experience.",
// //         tags: ["Mobile", "Cross-Platform", "UX"],
// //         icon: "📱",
// //         progress: 25,
// //         status: "upcoming"
// //       },
// //     ],
// //     2025: [
// //       { 
// //         id: 'p1-2025',
// //         phase: "Phase 1", 
// //         title: "AI Integration",
// //         description: "Advanced AI features with machine learning capabilities and automation.",
// //         tags: ["AI", "Machine Learning", "Automation"],
// //         icon: "🤖",
// //         progress: 15,
// //         status: "future"
// //       },
// //       { 
// //         id: 'p2-2025',
// //         phase: "Phase 2", 
// //         title: "Metaverse Platform",
// //         description: "Virtual reality ecosystem with NFT integration and digital assets.",
// //         tags: ["Metaverse", "VR", "NFTs"],
// //         icon: "🌐",
// //         progress: 10,
// //         status: "future"
// //       },
// //       { 
// //         id: 'p3-2025',
// //         phase: "Phase 3", 
// //         title: "DeFi Ecosystem",
// //         description: "Decentralized finance platform with yield farming and staking.",
// //         tags: ["DeFi", "Yield Farming", "Staking"],
// //         icon: "⚡",
// //         progress: 5,
// //         status: "future"
// //       },
// //       { 
// //         id: 'p4-2025',
// //         phase: "Phase 4", 
// //         title: "Global Expansion",
// //         description: "Worldwide market penetration with strategic partnerships.",
// //         tags: ["Global", "Partnerships", "Expansion"],
// //         icon: "🌍",
// //         progress: 3,
// //         status: "future"
// //       },
// //     ],
// //     2026: [
// //       { 
// //         id: 'p1-2026',
// //         phase: "Phase 1", 
// //         title: "Advanced Technology",
// //         description: "Next-generation features with quantum integration and security.",
// //         tags: ["Quantum", "Advanced Tech", "Security"],
// //         icon: "⚛️",
// //         progress: 0,
// //         status: "future"
// //       },
// //       { 
// //         id: 'p2-2026',
// //         phase: "Phase 2", 
// //         title: "Neural Networks",
// //         description: "Brain-computer interface and advanced neural processing systems.",
// //         tags: ["Neural", "BCI", "Processing"],
// //         icon: "🧠",
// //         progress: 0,
// //         status: "future"
// //       },
// //       { 
// //         id: 'p3-2026',
// //         phase: "Phase 3", 
// //         title: "Space Integration",
// //         description: "Satellite-based infrastructure and interplanetary connectivity.",
// //         tags: ["Space", "Satellites", "Infrastructure"],
// //         icon: "🛰️",
// //         progress: 0,
// //         status: "future"
// //       },
// //       { 
// //         id: 'p4-2026',
// //         phase: "Phase 4", 
// //         title: "Universal Adoption",
// //         description: "Complete global transformation and mass market adoption.",
// //         tags: ["Universal", "Global", "Adoption"],
// //         icon: "🌟",
// //         progress: 0,
// //         status: "future"
// //       },
// //     ],
// //   };

// //   // Smooth mouse tracking
// //   useEffect(() => {
// //     const handleMouseMove = (e) => {
// //       setMousePosition({ 
// //         x: (e.clientX / window.innerWidth) * 2 - 1, 
// //         y: (e.clientY / window.innerHeight) * 2 - 1 
// //       });
// //     };
// //     window.addEventListener('mousemove', handleMouseMove, { passive: true });
// //     return () => window.removeEventListener('mousemove', handleMouseMove);
// //   }, []);

// //   // Ultra-smooth scroll
// //   useEffect(() => {
// //     let ticking = false;
// //     const handleScroll = () => {
// //       if (!ticking) {
// //         requestAnimationFrame(() => {
// //           if (containerRef.current) {
// //             const rect = containerRef.current.getBoundingClientRect();
// //             const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
// //             setScrollY(progress * 100);
// //           }
// //           ticking = false;
// //         });
// //         ticking = true;
// //       }
// //     };

// //     window.addEventListener('scroll', handleScroll, { passive: true });
// //     handleScroll();
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   // Smooth card reveal
// //   useEffect(() => {
// //     const allCardIds = Object.values(roadmapData).flat().map(m => m.id);
// //     allCardIds.forEach((id, index) => {
// //       setTimeout(() => {
// //         setVisibleCards(prev => new Set([...prev, id]));
// //       }, index * 100);
// //     });
// //   }, []);

// //   // Smooth floating particles
// //   const SmoothParticles = () => (
// //     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
// //       {[...Array(20)].map((_, i) => (
// //         <div
// //           key={i}
// //           className="absolute rounded-full opacity-40"
// //           style={{
// //             width: `${2 + Math.random() * 3}px`,
// //             height: `${2 + Math.random() * 3}px`,
// //             left: `${Math.random() * 100}%`,
// //             top: `${Math.random() * 100}%`,
// //             background: 'linear-gradient(45deg, #094e54, #4ecdc4)',
// //             transform: `
// //               translateX(${mousePosition.x * 10}px) 
// //               translateY(${mousePosition.y * 10 + Math.sin(scrollY * 0.1 + i) * 20}px)
// //             `,
// //             transition: 'transform 0.3s ease-out',
// //             boxShadow: '0 0 10px rgba(78, 205, 196, 0.5)',
// //           }}
// //         />
// //       ))}
// //     </div>
// //   );

// //   // Compact year badge
// //   const YearBadge = ({ year }) => (
// //     <div className="flex justify-center mb-8 relative z-10">
// //       <div 
// //         className="w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer backdrop-blur-sm"
// //         style={{
// //           background: 'linear-gradient(135deg, #094e54, #4ecdc4)',
// //           borderColor: '#4ecdc4',
// //           boxShadow: '0 0 30px rgba(78, 205, 196, 0.5)'
// //         }}
// //       >
// //         <span className="text-lg font-bold text-white font-mono">
// //           {year}
// //         </span>
// //       </div>
// //     </div>
// //   );

// //   // Compact milestone card
// //   const CompactCard = ({ milestone, globalIndex }) => {
// //     const [isHovered, setIsHovered] = useState(false);
// //     const isVisible = visibleCards.has(milestone.id);
// //     const isLeft = globalIndex % 2 === 0;

// //     const getStatusColor = (status) => {
// //       switch (status) {
// //         case 'completed': return '#00ff88';
// //         case 'active': return '#4ecdc4';
// //         case 'upcoming': return '#ffd700';
// //         case 'future': return '#888';
// //         default: return '#4ecdc4';
// //       }
// //     };

// //     return (
// //       <div
// //         id={milestone.id}
// //         className={`relative mb-8 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'} lg:w-1/2 ${isLeft ? 'lg:ml-0' : 'lg:ml-auto'}`}
// //         style={{
// //           transform: isVisible 
// //             ? 'translateY(0px) scale(1)' 
// //             : 'translateY(30px) scale(0.95)',
// //           opacity: isVisible ? 1 : 0,
// //           transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
// //           transitionDelay: `${globalIndex * 0.08}s`
// //         }}
// //       >
// //         {/* Smooth connection line */}
// //         <div 
// //           className={`absolute top-6 w-12 h-1 ${isLeft ? 'right-0' : 'left-0'} lg:block hidden rounded-full`}
// //           style={{
// //             background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
// //             boxShadow: `0 0 10px ${getStatusColor(milestone.status)}50`
// //           }}
// //         />

// //         {/* Smooth timeline dot */}
// //         <div 
// //           className={`absolute top-5 w-3 h-3 rounded-full border-2 border-gray-900 shadow-lg ${isLeft ? '-right-1.5' : '-left-1.5'} lg:block hidden transition-all duration-300 z-10`}
// //           style={{
// //             background: getStatusColor(milestone.status),
// //             boxShadow: `0 0 15px ${getStatusColor(milestone.status)}`
// //           }}
// //         />

// //         <div
// //           className={`group relative backdrop-blur-md rounded-2xl p-5 border shadow-lg transition-all duration-500 cursor-pointer overflow-hidden ${
// //             isHovered ? 'scale-102 -rotate-0.5' : ''
// //           }`}
// //           style={{
// //             background: `linear-gradient(135deg, rgba(9,78,84,0.3), rgba(78,205,196,0.1))`,
// //             borderColor: `${getStatusColor(milestone.status)}60`,
// //             boxShadow: isHovered 
// //               ? `0 20px 40px -10px rgba(9,78,84,0.3), 0 0 0 1px ${getStatusColor(milestone.status)}30` 
// //               : '0 8px 20px -5px rgba(9,78,84,0.2)',
// //             transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)'
// //           }}
// //           onMouseEnter={() => setIsHovered(true)}
// //           onMouseLeave={() => setIsHovered(false)}
// //         >
// //           {/* Status indicator */}
// //           <div 
// //             className="absolute top-3 right-3 w-2 h-2 rounded-full"
// //             style={{ backgroundColor: getStatusColor(milestone.status) }}
// //           />

// //           {/* Compact icon */}
// //           <div 
// //             className="absolute top-3 right-8 w-8 h-8 rounded-lg flex items-center justify-center text-lg backdrop-blur-sm border transition-all duration-300"
// //             style={{
// //               background: `linear-gradient(135deg, rgba(9,78,84,0.5), rgba(78,205,196,0.3))`,
// //               borderColor: `${getStatusColor(milestone.status)}40`,
// //               transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
// //             }}
// //           >
// //             {milestone.icon}
// //           </div>

// //           {/* Phase tag */}
// //           <div 
// //             className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
// //             style={{
// //               background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
// //             }}
// //           >
// //             {milestone.phase}
// //           </div>

// //           {/* Compact title */}
// //           <h3 className="text-lg font-bold text-white mb-2 font-mono">
// //             {milestone.title}
// //           </h3>

// //           {/* Compact description */}
// //           <p className="text-gray-300 text-sm leading-relaxed mb-3">
// //             {milestone.description}
// //           </p>

// //           {/* Compact tags */}
// //           <div className="flex flex-wrap gap-1.5 mb-3">
// //             {milestone.tags.map((tag, tagIndex) => (
// //               <span
// //                 key={tagIndex}
// //                 className="px-2 py-1 text-white text-xs rounded-md border transition-all duration-300"
// //                 style={{
// //                   background: `rgba(9,78,84,0.5)`,
// //                   borderColor: `${getStatusColor(milestone.status)}40`,
// //                   transform: isHovered ? 'translateY(-1px)' : 'translateY(0px)'
// //                 }}
// //               >
// //                 {tag}
// //               </span>
// //             ))}
// //           </div>

// //           {/* Compact progress */}
// //           <div className="relative">
// //             <div className="flex justify-between items-center mb-2">
// //               <span className="text-xs text-gray-400">Progress</span>
// //               <span 
// //                 className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
// //                 style={{
// //                   background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`
// //                 }}
// //               >
// //                 {milestone.progress}%
// //               </span>
// //             </div>
// //             <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
// //               <div
// //                 className="h-full rounded-full transition-all duration-1000"
// //                 style={{ 
// //                   width: isVisible ? `${milestone.progress}%` : '0%',
// //                   background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
// //                   boxShadow: `0 0 10px ${getStatusColor(milestone.status)}60`
// //                 }}
// //               />
// //             </div>
// //           </div>

// //           {/* Subtle hover effect */}
// //           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Smooth timeline
// //   const SmoothTimeline = () => (
// //     <div 
// //       className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 shadow-lg lg:block hidden rounded-full"
// //       style={{
// //         background: 'linear-gradient(180deg, #094e54, #4ecdc4)',
// //         boxShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
// //       }}
// //     >
// //       <div 
// //         className="absolute top-0 w-full transition-all duration-700 rounded-full"
// //         style={{
// //           height: `${Math.min(scrollY, 100)}%`,
// //           background: 'linear-gradient(180deg, #4ecdc4, #ffffff)',
// //           boxShadow: '0 0 15px rgba(78, 205, 196, 0.8)'
// //         }}
// //       />
// //     </div>
// //   );

// //   return (
// //     <>
// //       <style jsx>{`
// //         @keyframes float {
// //           0%, 100% { transform: translateY(0px); }
// //           50% { transform: translateY(-10px); }
// //         }

// //         @keyframes glow {
// //           0%, 100% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.5); }
// //           50% { box-shadow: 0 0 30px rgba(78, 205, 196, 0.8); }
// //         }

// //         .scale-102 {
// //           transform: scale(1.02);
// //         }
// //       `}</style>

// //       <div 
// //         ref={containerRef}
// //         className="relative min-h-screen text-white overflow-hidden"
// //         style={{
// //           background: 'linear-gradient(135deg, #0a1a1d, #1a4b52, #2a6b70)'
// //         }}
// //       >
// //         {/* Smooth animated background */}
// //         <div 
// //           className="absolute inset-0 opacity-60"
// //           style={{
// //             background: `
// //               radial-gradient(circle at 30% 70%, rgba(9,78,84,0.6) 0%, transparent 50%),
// //               radial-gradient(circle at 70% 30%, rgba(78,205,196,0.4) 0%, transparent 50%)
// //             `,
// //             transform: `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 5}px)`,
// //             transition: 'transform 0.5s ease-out'
// //           }}
// //         />

// //         <SmoothParticles />

// //         {/* Compact header */}
// //        <div className="relative z-10 text-center py-20 px-4">
// //           <div className="relative inline-block">
// //             <div className="absolute -inset-8 bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] rounded-full blur-3xl opacity-20 animate-pulse"></div>
// //             <h1 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] bg-clip-text text-transparent font-mono tracking-tighter hover:scale-105 transition-transform duration-700 cursor-default">
// //               PROJECT NEXUS
// //             </h1>
// //           </div>
// //           <p 
// //             className="text-xl md:text-2xl text-[#00a3b5] font-light tracking-[0.2em] uppercase mt-4 hover:tracking-[0.3em] transition-all duration-500"
// //             style={{ 
// //               animation: 'subtitleFloat 4s ease-in-out infinite'
// //             }}
// //           >
// //             Revolutionary Roadmap • 2024-2026
// //           </p>
// //         </div>

// //         {/* Compact main content */}
// //         <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
// //           <div className="relative">
// //             <SmoothTimeline />

// //             {Object.entries(roadmapData).map(([year, milestones], yearIndex) => (
// //               <div key={year} className="relative mb-16">
// //                 <YearBadge year={year} />
// //                 <div className="relative lg:pl-4">
// //                   {milestones.map((milestone, index) => {
// //                     const globalIdx = yearIndex * 5 + index;
// //                     return (
// //                       <CompactCard
// //                         key={milestone.id}
// //                         milestone={milestone}
// //                         globalIndex={globalIdx}
// //                       />
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Compact stats */}
// //           <div 
// //             className="mt-16 backdrop-blur-md rounded-2xl p-6 border shadow-lg"
// //             style={{
// //               background: 'linear-gradient(135deg, rgba(9,78,84,0.4), rgba(78,205,196,0.2))',
// //               borderColor: '#4ecdc4',
// //               boxShadow: '0 15px 35px rgba(9,78,84,0.3)'
// //             }}
// //           >
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
// //               {[
// //                 { value: "13", label: "Total Phases" },
// //                 { value: "3", label: "Years" },
// //                 { value: "5", label: "Active 2024" },
// //                 { value: "45%", label: "Complete" }
// //               ].map((stat, index) => (
// //                 <div key={index} className="hover:scale-105 transition-transform duration-300">
// //                   <h3 className="text-3xl font-black text-[#4ecdc4] mb-1 font-mono">
// //                     {stat.value}
// //                   </h3>
// //                   <p className="text-gray-400 text-sm uppercase tracking-wide">
// //                     {stat.label}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ProjectRoadmap;
// import React, { useState, useEffect, useRef } from 'react';

// const ProjectRoadmap = () => {
//     const [scrollY, setScrollY] = useState(0);
//     const [visibleCards, setVisibleCards] = useState(new Set());
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const containerRef = useRef(null);
//     const cardRefs = useRef({}); // To hold refs for each card

//     const roadmapData = {
//         2024: [
//             {
//                 id: 'p1-2024',
//                 phase: "Phase 1",
//                 title: "Concept Development",
//                 description: "Foundation building with core team assembly and strategic planning frameworks.",
//                 tags: ["Team Formation", "Strategy", "Planning"],
//                 icon: "🚀",
//                 progress: 100,
//                 status: "completed"
//             },
//             {
//                 id: 'p2-2024',
//                 phase: "Phase 2",
//                 title: "Smart Contract Development",
//                 description: "Advanced blockchain architecture with security audits and protocols.",
//                 tags: ["Smart Contracts", "Security", "Blockchain"],
//                 icon: "🔒",
//                 progress: 85,
//                 status: "active"
//             },
//             {
//                 id: 'p3-2024',
//                 phase: "Phase 3",
//                 title: "Platform Development",
//                 description: "Digital platform with comprehensive documentation and specifications.",
//                 tags: ["Platform", "Documentation", "UI/UX"],
//                 icon: "📄",
//                 progress: 70,
//                 status: "active"
//             },
//             {
//                 id: 'p4-2024',
//                 phase: "Phase 4",
//                 title: "Token Launch",
//                 description: "Token launch with comprehensive marketing and fundraising campaigns.",
//                 tags: ["Token", "Marketing", "Fundraising"],
//                 icon: "💰",
//                 progress: 40,
//                 status: "upcoming"
//             },
//             {
//                 id: 'p5-2024',
//                 phase: "Phase 5",
//                 title: "Mobile App Launch",
//                 description: "Cross-platform mobile applications with seamless user experience.",
//                 tags: ["Mobile", "Cross-Platform", "UX"],
//                 icon: "📱",
//                 progress: 25,
//                 status: "upcoming"
//             },
//         ],
//         2025: [
//             {
//                 id: 'p1-2025',
//                 phase: "Phase 1",
//                 title: "AI Integration",
//                 description: "Advanced AI features with machine learning capabilities and automation.",
//                 tags: ["AI", "Machine Learning", "Automation"],
//                 icon: "🤖",
//                 progress: 15,
//                 status: "future"
//             },
//             {
//                 id: 'p2-2025',
//                 phase: "Phase 2",
//                 title: "Metaverse Platform",
//                 description: "Virtual reality ecosystem with NFT integration and digital assets.",
//                 tags: ["Metaverse", "VR", "NFTs"],
//                 icon: "🌐",
//                 progress: 10,
//                 status: "future"
//             },
//             {
//                 id: 'p3-2025',
//                 phase: "Phase 3",
//                 title: "DeFi Ecosystem",
//                 description: "Decentralized finance platform with yield farming and staking.",
//                 tags: ["DeFi", "Yield Farming", "Staking"],
//                 icon: "⚡",
//                 progress: 5,
//                 status: "future"
//             },
//             {
//                 id: 'p4-2025',
//                 phase: "Phase 4",
//                 title: "Global Expansion",
//                 description: "Worldwide market penetration with strategic partnerships.",
//                 tags: ["Global", "Partnerships", "Expansion"],
//                 icon: "🌍",
//                 progress: 3,
//                 status: "future"
//             },
//         ],
//         2026: [
//             {
//                 id: 'p1-2026',
//                 phase: "Phase 1",
//                 title: "Advanced Technology",
//                 description: "Next-generation features with quantum integration and security.",
//                 tags: ["Quantum", "Advanced Tech", "Security"],
//                 icon: "⚛️",
//                 progress: 0,
//                 status: "future"
//             },
//             {
//                 id: 'p2-2026',
//                 phase: "Phase 2",
//                 title: "Neural Networks",
//                 description: "Brain-computer interface and advanced neural processing systems.",
//                 tags: ["Neural", "BCI", "Processing"],
//                 icon: "🧠",
//                 progress: 0,
//                 status: "future"
//             },
//             {
//                 id: 'p3-2026',
//                 phase: "Phase 3",
//                 title: "Space Integration",
//                 description: "Satellite-based infrastructure and interplanetary connectivity.",
//                 tags: ["Space", "Satellites", "Infrastructure"],
//                 icon: "🛰️",
//                 progress: 0,
//                 status: "future"
//             },
//             {
//                 id: 'p4-2026',
//                 phase: "Phase 4",
//                 title: "Universal Adoption",
//                 description: "Complete global transformation and mass market adoption.",
//                 tags: ["Universal", "Global", "Adoption"],
//                 icon: "�",
//                 progress: 0,
//                 status: "future"
//             },
//         ],
//     };

//     // Smooth mouse tracking
//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             setMousePosition({
//                 x: (e.clientX / window.innerWidth) * 2 - 1,
//                 y: (e.clientY / window.innerHeight) * 2 - 1
//             });
//         };
//         window.addEventListener('mousemove', handleMouseMove, { passive: true });
//         return () => window.removeEventListener('mousemove', handleMouseMove);
//     }, []);

//     // Ultra-smooth scroll
//     useEffect(() => {
//         let ticking = false;
//         const handleScroll = () => {
//             if (!ticking) {
//                 requestAnimationFrame(() => {
//                     if (containerRef.current) {
//                         const rect = containerRef.current.getBoundingClientRect();
//                         const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
//                         setScrollY(progress * 100);
//                     }
//                     ticking = false;
//                 });
//                 ticking = true;
//             }
//         };

//         window.addEventListener('scroll', handleScroll, { passive: true });
//         handleScroll();
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // Smooth card reveal using Intersection Observer
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         setVisibleCards(prev => new Set([...prev, entry.target.id]));
//                         observer.unobserve(entry.target); // Stop observing once visible
//                     }
//                 });
//             },
//             { threshold: 0.1 } // Adjust threshold as needed
//         );

//         Object.values(roadmapData).flat().forEach(milestone => {
//             const cardElement = cardRefs.current[milestone.id];
//             if (cardElement) {
//                 observer.observe(cardElement);
//             }
//         });

//         return () => observer.disconnect();
//     }, [roadmapData]);

//     // Smooth floating particles
//     const SmoothParticles = () => (
//         <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//             {[...Array(15)].map((_, i) => ( // Reduced particle count
//                 <div
//                     key={i}
//                     className="absolute rounded-full opacity-40"
//                     style={{
//                         width: `${2 + Math.random() * 3}px`,
//                         height: `${2 + Math.random() * 3}px`,
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         background: 'linear-gradient(45deg, #094e54, #4ecdc4)',
//                         transform: `
//                             translateX(${mousePosition.x * 8}px)
//                             translateY(${mousePosition.y * 8 + Math.sin(scrollY * 0.1 + i) * 15}px) // Slightly reduced Y offset
//                         `,
//                         transition: 'transform 0.2s ease-out, opacity 0.2s ease-out', // Added opacity transition
//                         boxShadow: '0 0 8px rgba(78, 205, 196, 0.4)', // Slightly reduced shadow
//                     }}
//                 />
//             ))}
//         </div>
//     );

//     // Compact year badge
//     const YearBadge = ({ year }) => (
//         <div className="flex justify-center mb-8 relative z-10">
//             <div
//                 className="w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer backdrop-blur-sm"
//                 style={{
//                     background: 'linear-gradient(135deg, #094e54, #4ecdc4)',
//                     borderColor: '#4ecdc4',
//                     boxShadow: '0 0 20px rgba(78, 205, 196, 0.4)' // Reduced shadow
//                 }}
//             >
//                 <span className="text-lg font-bold text-white font-mono">
//                     {year}
//                 </span>
//             </div>
//         </div>
//     );

//     // Compact milestone card (optimized transitions)
//     const CompactCard = ({ milestone, globalIndex }) => {
//         const [isHovered, setIsHovered] = useState(false);
//         const isVisible = visibleCards.has(milestone.id);
//         const isLeft = globalIndex % 2 === 0;

//         const getStatusColor = (status) => {
//             switch (status) {
//                 case 'completed': return '#00ff88';
//                 case 'active': return '#4ecdc4';
//                 case 'upcoming': return '#ffd700';
//                 case 'future': return '#888';
//                 default: return '#4ecdc4';
//             }
//         };

//         return (
//             <div
//                 ref={el => (cardRefs.current[milestone.id] = el)}
//                 id={milestone.id}
//                 className={`relative mb-8 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'} lg:w-1/2 ${isLeft ? 'lg:ml-0' : 'lg:ml-auto'}`}
//                 style={{
//                     opacity: isVisible ? 1 : 0,
//                     transform: isVisible ? 'translateY(0)' : 'translateY(20px)', // Simpler transform
//                     transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
//                     transitionDelay: `${globalIndex * 0.04}s` // Slightly reduced delay
//                 }}
//             >
//                 {/* Smooth connection line */}
//                 <div
//                     className={`absolute top-6 w-12 h-1 ${isLeft ? 'right-0' : 'left-0'} lg:block hidden rounded-full`}
//                     style={{
//                         background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//                         boxShadow: `0 0 6px ${getStatusColor(milestone.status)}50` // Reduced shadow
//                     }}
//                 />

//                 {/* Smooth timeline dot */}
//                 <div
//                     className={`absolute top-5 w-3 h-3 rounded-full border-2 border-gray-900 shadow-md ${isLeft ? '-right-1.5' : '-left-1.5'} lg:block hidden transition-all duration-300 z-10`}
//                     style={{
//                         background: getStatusColor(milestone.status),
//                         boxShadow: `0 0 6px ${getStatusColor(milestone.status)}` // Reduced shadow
//                     }}
//                 />

//                 <div
//                     className={`group relative backdrop-blur-md rounded-2xl p-5 border shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${
//                         isHovered ? 'scale-101 translate-y-[-2px]' : '' // Simpler hover transform
//                     }`}
//                     style={{
//                         background: `linear-gradient(135deg, rgba(9,78,84,0.3), rgba(78,205,196,0.1))`,
//                         borderColor: `${getStatusColor(milestone.status)}40`,
//                         boxShadow: isHovered
//                             ? `0 10px 20px -5px rgba(9,78,84,0.3), 0 0 0 1px ${getStatusColor(milestone.status)}30`
//                             : '0 5px 15px -5px rgba(9,78,84,0.2)', // Reduced shadow
//                         transform: isHovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0px) scale(1)' // Combined scale and translate
//                     }}
//                     onMouseEnter={() => setIsHovered(true)}
//                     onMouseLeave={() => setIsHovered(false)}
//                 >
//                     {/* Status indicator */}
//                     <div
//                         className="absolute top-3 right-3 w-2 h-2 rounded-full"
//                         style={{ backgroundColor: getStatusColor(milestone.status) }}
//                     />

//                     {/* Compact icon (simplified hover) */}
//                     <div
//                         className="absolute top-3 right-8 w-8 h-8 rounded-lg flex items-center justify-center text-lg backdrop-blur-sm border transition-transform duration-200"
//                         style={{
//                             background: `linear-gradient(135deg, rgba(9,78,84,0.5), rgba(78,205,196,0.3))`,
//                             borderColor: `${getStatusColor(milestone.status)}40`,
//                             transform: isHovered ? 'scale(1.05)' : 'scale(1)'
//                         }}
//                     >
//                         {milestone.icon}
//                     </div>

//                     {/* Phase tag */}
//                     <div
//                         className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
//                         style={{
//                             background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//                         }}
//                     >
//                         {milestone.phase}
//                     </div>

//                     {/* Compact title */}
//                     <h3 className="text-lg font-bold text-white mb-2 font-mono">
//                         {milestone.title}
//                     </h3>

//                     {/* Compact description */}
//                     <p className="text-gray-300 text-sm leading-relaxed mb-3">
//                         {milestone.description}
//                     </p>

//                     {/* Compact tags (simplified hover) */}
//                     <div className="flex flex-wrap gap-1.5 mb-3">
//                         {milestone.tags.map((tag, tagIndex) => (
//                             <span
//                                 key={tagIndex}
//                                 className="px-2 py-1 text-white text-xs rounded-md border transition-transform duration-200"
//                                 style={{
//                                     background: `rgba(9,78,84,0.5)`,
//                                     borderColor: `${getStatusColor(milestone.status)}40`,
//                                     transform: isHovered ? 'translateY(-1px)' : 'translateY(0px)'
//                                 }}
//                             >
//                                 {tag}
//                             </span>
//                         ))}
//                     </div>

//                     {/* Compact progress */}
//                     <div className="relative">
//                         <div className="flex justify-between items-center mb-2">
//                             <span className="text-xs text-gray-400">Progress</span>
//                             <span
//                                 className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
//                                 style={{
//                                     background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`
//                                 }}
//                             >
//                                 {milestone.progress}%
//                             </span>
//                         </div>
//                         <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
//                             <div
//                                 className="h-full rounded-full transition-all duration-1000"
//                                 style={{
//                                     width: isVisible ? `${milestone.progress}%` : '0%',
//                                     background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//                                     boxShadow: `0 0 6px ${getStatusColor(milestone.status)}60` // Reduced shadow
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     {/* Subtle hover effect (simplified) */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none rounded-2xl" />
//                 </div>
//             </div>
//         );
//     };

//     // Smooth timeline
//     const SmoothTimeline = () => (
//         <div
//             className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 shadow-lg lg:block hidden rounded-full"
//             style={{
//                 background: 'linear-gradient(180deg, #094e54, #4ecdc4)',
//                 boxShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
//             }}
//         >
//             <div
//                 className="absolute top-0 w-full transition-all duration-700 rounded-full"
//                 style={{
//                     height: `${Math.min(scrollY, 100)}%`,
//                     background: 'linear-gradient(180deg, #4ecdc4, #ffffff)',
//                     boxShadow: '0 0 15px rgba(78, 205, 196, 0.8)'
//                 }}
//             />
//         </div>
//     );

//     return (
//         <>
//             <style jsx>{`
//                 @keyframes float {
//                     0%, 100% { transform: translateY(0px); }
//                     50% { transform: translateY(-10px); }
//                 }

//                 @keyframes glow {
//                     0%, 100% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.5); }
//                     50% { box-shadow: 0 0 30px rgba(78, 205, 196, 0.8); }
//                 }

//                 @keyframes subtitleFloat {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-5px); }
//                 }

//                 .scale-101 {
//                     transform: scale(1.01);
//                 }
//                 .translate-y-[-2px] {
//                     transform: translateY(-2px);
//                 }
//             `}</style>

//             <div
//                 ref={containerRef}
//                 className="relative min-h-screen text-white overflow-hidden"
//                 style={{
//                     background: 'linear-gradient(135deg, #0a1a1d, #1a4b52, #2a6b70)'
//                 }}
//             >
//                 {/* Smooth animated background */}
//                 <div
//                     className="absolute inset-0 opacity-60"
//                     style={{
//                         background: `
//                             radial-gradient(circle at 30% 70%, rgba(9,78,84,0.6) 0%, transparent 50%),
//                             radial-gradient(circle at 70% 30%, rgba(78,205,196,0.4) 0%, transparent 50%)
//                         `,
//                         transform: `translateX(${mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)`, // Slightly reduced movement
//                         transition: 'transform 0.3s ease-out' // Faster transition
//                     }}
//                 />

//                 <SmoothParticles />

//                 {/* Compact header */}
//                 <div className="relative z-10 text-center py-20 px-4">
//                     <div className="relative inline-block">
//                         <div className="absolute -inset-8 bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] rounded-full blur-3xl opacity-20 animate-pulse"></div>
//                         <h1 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] bg-clip-text text-transparent font-mono tracking-tighter hover:scale-105 transition-transform duration-700 cursor-default">
//                             PROJECT NEXUS
//                         </h1>
//                     </div>
//                     <p
//                         className="text-xl md:text-2xl text-[#00a3b5] font-light tracking-[0.2em] uppercase mt-4 hover:tracking-[0.3em] transition-all duration-500"
//                         style={{
//                             animation: 'subtitleFloat 4s ease-in-out infinite'
//                         }}
//                     >
//                         Revolutionary Roadmap • 2024-2026
//                     </p>
//                 </div>

//                 {/* Compact main content */}
//                 <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
//                     <div className="relative">
//                         <SmoothTimeline />

//                         {Object.entries(roadmapData).map(([year, milestones], yearIndex) => (
//                             <div key={year} className="relative mb-16">
//                                 <YearBadge year={year} />
//                                 <div className="relative lg:pl-4">
//                                     {milestones.map((milestone, index) => {
//                                         const globalIdx = yearIndex * 5 + index;
//                                         return (
//                                             <CompactCard
//                                                 key={milestone.id}
//                                                 milestone={milestone}
//                                                 globalIndex={globalIdx}
//                                             />
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Compact stats */}
//                     <div
//                         className="mt-16 backdrop-blur-md rounded-2xl p-6 border shadow-lg"
//                         style={{
//                             background: 'linear-gradient(135deg, rgba(9,78,84,0.4), rgba(78,205,196,0.2))',
//                             borderColor: '#4ecdc4',
//                             boxShadow: '0 15px 35px rgba(9,78,84,0.3)'
//                         }}
//                     >
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//                             {[
//                                 { value: "13", label: "Total Phases" },
//                                 { value: "3", label: "Years" },
//                                 { value: "5", label: "Active 2024" },
//                                 { value: "45%", label: "Complete" }
//                             ].map((stat, index) => (
//                                 <div key={index} className="hover:scale-105 transition-transform duration-300">
//                                     <h3 className="text-3xl font-black text-[#4ecdc4] mb-1 font-mono">
//                                         {stat.value}
//                                     </h3>
//                                     <p className="text-gray-400 text-sm uppercase tracking-wide">
//                                         {stat.label}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProjectRoadmap;
// import React, { useState, useEffect, useRef } from 'react';

// const ProjectRoadmap = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [visibleCards, setVisibleCards] = useState(new Set());
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);
//   const cardRefs = useRef({}); // To hold refs for each card

//   const roadmapData = {
//     2024: [
//       {
//         id: 'p1-2024',
//         phase: "Phase 1",
//         title: "Concept Development",
//         description: "Foundation building with core team assembly and strategic planning frameworks.",
//         tags: ["Team Formation", "Strategy", "Planning"],
//         icon: "�",
//         progress: 100,
//         status: "completed"
//       },
//       {
//         id: 'p2-2024',
//         phase: "Phase 2",
//         title: "Smart Contract Development",
//         description: "Advanced blockchain architecture with security audits and protocols.",
//         tags: ["Smart Contracts", "Security", "Blockchain"],
//         icon: "🔒",
//         progress: 85,
//         status: "active"
//       },
//       {
//         id: 'p3-2024',
//         phase: "Phase 3",
//         title: "Platform Development",
//         description: "Digital platform with comprehensive documentation and specifications.",
//         tags: ["Platform", "Documentation", "UI/UX"],
//         icon: "📄",
//         progress: 70,
//         status: "active"
//       },
//       {
//         id: 'p4-2024',
//         phase: "Phase 4",
//         title: "Token Launch",
//         description: "Token launch with comprehensive marketing and fundraising campaigns.",
//         tags: ["Token", "Marketing", "Fundraising"],
//         icon: "💰",
//         progress: 40,
//         status: "upcoming"
//       },
//       {
//         id: 'p5-2024',
//         phase: "Phase 5",
//         title: "Mobile App Launch",
//         description: "Cross-platform mobile applications with seamless user experience.",
//         tags: ["Mobile", "Cross-Platform", "UX"],
//         icon: "📱",
//         progress: 25,
//         status: "upcoming"
//       },
//     ],
//     2025: [
//       {
//         id: 'p1-2025',
//         phase: "Phase 1",
//         title: "AI Integration",
//         description: "Advanced AI features with machine learning capabilities and automation.",
//         tags: ["AI", "Machine Learning", "Automation"],
//         icon: "🤖",
//         progress: 15,
//         status: "future"
//       },
//       {
//         id: 'p2-2025',
//         phase: "Phase 2",
//         title: "Metaverse Platform",
//         description: "Virtual reality ecosystem with NFT integration and digital assets.",
//         tags: ["Metaverse", "VR", "NFTs"],
//         icon: "🌐",
//         progress: 10,
//         status: "future"
//       },
//       {
//         id: 'p3-2025',
//         phase: "Phase 3",
//         title: "DeFi Ecosystem",
//         description: "Decentralized finance platform with yield farming and staking.",
//         tags: ["DeFi", "Yield Farming", "Staking"],
//         icon: "⚡",
//         progress: 5,
//         status: "future"
//       },
//       {
//         id: 'p4-2025',
//         phase: "Phase 4",
//         title: "Global Expansion",
//         description: "Worldwide market penetration with strategic partnerships.",
//         tags: ["Global", "Partnerships", "Expansion"],
//         icon: "🌍",
//         progress: 3,
//         status: "future"
//       },
//     ],
//     2026: [
//       {
//         id: 'p1-2026',
//         phase: "Phase 1",
//         title: "Advanced Technology",
//         description: "Next-generation features with quantum integration and security.",
//         tags: ["Quantum", "Advanced Tech", "Security"],
//         icon: "⚛️",
//         progress: 0,
//         status: "future"
//       },
//       {
//         id: 'p2-2026',
//         phase: "Phase 2",
//         title: "Neural Networks",
//         description: "Brain-computer interface and advanced neural processing systems.",
//         tags: ["Neural", "BCI", "Processing"],
//         icon: "🧠",
//         progress: 0,
//         status: "future"
//       },
//       {
//         id: 'p3-2026',
//         phase: "Phase 3",
//         title: "Space Integration",
//         description: "Satellite-based infrastructure and interplanetary connectivity.",
//         tags: ["Space", "Satellites", "Infrastructure"],
//         icon: "🛰️",
//         progress: 0,
//         status: "future"
//       },
//       {
//         id: 'p4-2026',
//         phase: "Phase 4",
//         title: "Universal Adoption",
//         description: "Complete global transformation and mass market adoption.",
//         tags: ["Universal", "Global", "Adoption"],
//         icon: "🌟",
//         progress: 0,
//         status: "future"
//       },
//     ],
//   };

//   // Smooth mouse tracking
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: (e.clientY / window.innerHeight) * 2 - 1
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove, { passive: true });
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Ultra-smooth scroll
//   useEffect(() => {
//     let ticking = false;
//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           if (containerRef.current) {
//             const rect = containerRef.current.getBoundingClientRect();
//             const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
//             setScrollY(progress * 100);
//           }
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Smooth card reveal using Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setVisibleCards(prev => new Set([...prev, entry.target.id]));
//             observer.unobserve(entry.target); // Stop observing once visible
//           }
//         });
//       },
//       { threshold: 0.1 } // Adjust threshold as needed
//     );

//     Object.values(roadmapData).flat().forEach(milestone => {
//       const cardElement = cardRefs.current[milestone.id];
//       if (cardElement) {
//         observer.observe(cardElement);
//       }
//     });

//     return () => observer.disconnect();
//   }, [roadmapData]);

//   // Smooth floating particles
//   const SmoothParticles = () => (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

//     </div>
//   );

//   const YearBadge = ({ year }) => (
//     <div className="flex justify-center mb-8 relative z-10">
//       <div
//         className="w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer backdrop-blur-sm"
//         style={{
//           // background: 'linear-gradient(135deg, #094e54, #4ecdc4)',
//           borderColor: '#4ecdc4',
//           boxShadow: '0 0 20px rgba(78, 205, 196, 0.4)' // Reduced shadow
//         }}
//       >
//         <span className="text-lg font-bold text-white font-mono">
//           {year}
//         </span>
//       </div>
//     </div>
//   );
//   const CompactCard = ({ milestone, globalIndex }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const isVisible = visibleCards.has(milestone.id);
//     const isLeft = globalIndex % 2 === 0;

//     const getStatusColor = (status) => {
//       switch (status) {
//         case 'completed': return '#00ff88';
//         case 'active': return '#4ecdc4';
//         case 'upcoming': return '#ffd700';
//         case 'future': return '#888';
//         default: return '#4ecdc4';
//       }
//     };
//     return (
//       <div
//         ref={(el) => (cardRefs.current[milestone.id] = el)}
//         id={milestone.id}
//         className={`relative mb-8 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'} lg:w-1/2 ${isLeft ? 'lg:ml-0' : 'lg:ml-auto'}`}
//         style={{
//           opacity: isVisible ? 1 : 0,
//           transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
//           transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
//           transitionDelay: `${globalIndex * 0.05}s`,
//           perspective: '1200px',
//         }}
//       >
//         {/* Line and Dot */}
//         <div
//           className={`absolute top-6 w-12 h-1 ${isLeft ? 'right-1.5' : 'left-0'} lg:block hidden rounded-full`}
//           style={{
//             background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//             boxShadow: `0 0 8px ${getStatusColor(milestone.status)}80`,
//           }}
//         />
//         <div
//           className={`absolute top-5 w-3 h-3 rounded-full border-2 border-gray-900 shadow-md ${isLeft ? 'right-1.5' : '-left-1.5'} lg:block hidden`}
//           style={{
//             backgroundColor: getStatusColor(milestone.status),
//             boxShadow: `0 0 10px ${getStatusColor(milestone.status)}`,
//           }}
//         />

//         {/* Milestone Card */}
//         <div
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           className="group relative p-6 rounded-2xl border shadow-xl transform-gpu transition-transform duration-500 cursor-pointer"
//           style={{
//             background: 'linear-gradient(135deg, rgba(9,78,84,0.4), rgba(78,205,196,0.15))',
//             borderColor: `${getStatusColor(milestone.status)}66`,
//             transform: isHovered
//               ? 'rotateX(4deg) rotateY(-4deg) scale(1.04)'
//               : 'rotateX(0deg) rotateY(0deg) scale(1)',
//             boxShadow: isHovered
//               ? `0 15px 35px -5px ${getStatusColor(milestone.status)}99, 0 5px 10px rgba(0,0,0,0.2)`
//               : '0 8px 18px rgba(0,0,0,0.15)',
//           }}
//         >
//           {/* Status dot and icon */}
//           <div
//             className="absolute top-3 right-3 w-2 h-2 rounded-full"
//             style={{ backgroundColor: getStatusColor(milestone.status) }}
//           />
//           <div
//             className="absolute top-3 right-8 w-8 h-8 flex items-center justify-center text-lg rounded-md backdrop-blur border"
//             style={{
//               background: `linear-gradient(135deg, rgba(9,78,84,0.5), rgba(78,205,196,0.3))`,
//               borderColor: `${getStatusColor(milestone.status)}50`,
//               transform: isHovered ? 'scale(1.1)' : 'scale(1)',
//               transition: 'transform 0.3s ease',
//             }}
//           >
//             {milestone.icon}
//           </div>

//           {/* Phase */}
//           <div
//             className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
//             style={{
//               background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//             }}
//           >
//             {milestone.phase}
//           </div>

//           {/* Title */}
//           <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>

//           {/* Description */}
//           <p className="text-sm text-gray-300 mb-3">{milestone.description}</p>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-1.5 mb-3">
//             {milestone.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="px-2 py-1 text-white text-xs rounded-md border"
//                 style={{
//                   background: `rgba(9,78,84,0.5)`,
//                   borderColor: `${getStatusColor(milestone.status)}40`,
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           {/* Progress */}
//           <div className="relative">
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-xs text-gray-400">Progress</span>
//               <span
//                 className="text-xs font-bold text-white px-2 py-0.5 rounded-full"
//                 style={{
//                   background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//                 }}
//               >
//                 {milestone.progress}%
//               </span>
//             </div>
//             <div className="w-full bg-gray-700/40 rounded-full h-2">
//               <div
//                 className="h-full rounded-full transition-all duration-700"
//                 style={{
//                   width: isVisible ? `${milestone.progress}%` : '0%',
//                   background: `linear-gradient(135deg, #094e54, ${getStatusColor(milestone.status)})`,
//                   boxShadow: `0 0 5px ${getStatusColor(milestone.status)}88`,
//                 }}
//               />
//             </div>
//           </div>

//           {/* Overlay effect */}
//           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none rounded-2xl" />
//         </div>
//       </div>
//     )

//   };
//   const SmoothTimeline = () => (
//     <div
//       className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 shadow-lg lg:block hidden rounded-full"
//       style={{
//         background: 'linear-gradient(180deg, #094e54, #4ecdc4)',
//         boxShadow: '0 0 28px rgba(78, 205, 196, 0.4)'
//       }}
//     >
//       <div
//         className="absolute top-0 w-full transition-all duration-700 rounded-full"
//         style={{
//           height: `${Math.min(scrollY, 100)}%`,
//           background: 'linear-gradient(180deg, #4ecdc4, #ffffff)',
//           boxShadow: '0 0 10px rgba(22, 192, 181, 0.6)' // Reduced shadow
//         }}
//       />
//     </div>
//   );

//   return (
//     <>
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); } /* Reduced float height */
//         }

//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 15px rgba(78, 205, 196, 0.4); } /* Reduced glow */
//           50% { box-shadow: 0 0 20px rgba(78, 205, 196, 0.6); } /* Reduced glow */
//         }

//         .scale-101 {
//           transform: scale(1.01);
//         }
//       `}</style>

//       <div
//         ref={containerRef}
//         className="relative min-h-screen text-white overflow-hidden"
//         style={{
//           background: 'linear-gradient(135deg, #0a1a1d, #1a4b52, #2a6b70)'
//         }}
//       >
//         {/* Smooth animated background */}
//         <div
//           className="absolute inset-0 opacity-50" // Reduced opacity
//           style={{
//             background: `
//               radial-gradient(circle at 30% 70%, rgba(9,78,84,0.5) 0%, transparent 50%),
//               radial-gradient(circle at 70% 30%, rgba(78,205,196,0.3) 0%, transparent 50%)
//             `,
//             transform: `translateX(${mousePosition.x * 4}px) translateY(${mousePosition.y * 4}px)`, // Reduced movement
//             transition: 'transform 0.4s ease-out' // Reduced transition time
//           }}
//         />

//         <SmoothParticles />

//         {/* Compact header */}
//         <div className="relative z-10 text-center py-16 px-4"> {/* Reduced padding */}
//           <div className="relative inline-block">
//             <div className="absolute -inset-6 bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] rounded-full blur-2xl opacity-15 animate-pulse"></div> {/* Reduced blur and opacity */}
//             <h1 className="relative text-5xl md:text-7xl font-black bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] bg-clip-text text-transparent font-mono tracking-tighter hover:scale-103 transition-transform duration-500 cursor-default"> {/* Reduced scale and duration */}
//               PROJECT NEXUS
//             </h1>
//           </div>
//           <p
//             className="text-xl md:text-xl text-[#00a3b5] font-light tracking-[0.15em] uppercase mt-3 hover:tracking-[0.2em] transition-all duration-300"
//             style={{
//               animation: 'subtitleFloat 3s ease-in-out infinite' /* Reduced animation duration */
//             }}
//           >
//             Revolutionary Roadmap • 2024-2026
//           </p>
//         </div>

//         {/* Compact main content */}
//         <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12"> {/* Reduced padding */}
//           <div className="relative">
//             <SmoothTimeline />

//             {Object.entries(roadmapData).map(([year, milestones], yearIndex) => (
//               <div key={year} className="relative mb-12"> {/* Reduced margin */}
//                 <YearBadge year={year} />
//                 <div className="relative lg:pl-4">
//                   {milestones.map((milestone, index) => {
//                     const globalIdx = yearIndex * 5 + index;
//                     return (
//                       <CompactCard
//                         key={milestone.id}
//                         milestone={milestone}
//                         globalIndex={globalIdx}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Compact stats */}
//           <div
//             className="mt-12 backdrop-blur-md rounded-xl p-5 border shadow-lg"
//             style={{
//               background: 'linear-gradient(135deg, rgba(9,78,84,0.3), rgba(78,205,196,0.15))', /* Reduced opacity */
//               borderColor: '#4ecdc480', /* Reduced border opacity */
//               boxShadow: '0 10px 25px rgba(9,78,84,0.2)' /* Reduced shadow */
//             }}
//           >
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"> {/* Reduced gap */}
//               {[
//                 { value: "13", label: "Total Phases" },
//                 { value: "3", label: "Years" },
//                 { value: "5", label: "Active 2024" },
//                 { value: "45%", label: "Complete" }
//               ].map((stat, index) => (
//                 <div key={index} className="hover:scale-103 transition-transform duration-200"> {/* Reduced scale and duration */}
//                   <h3 className="text-2xl font-black text-[#4ecdc4] mb-0.5 font-mono"> {/* Reduced text size and margin */}
//                     {stat.value}
//                   </h3>
//                   <p className="text-gray-400 text-sm uppercase tracking-wide">
//                     {stat.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectRoadmap;
// import React from 'react';

// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//     button: "Coming Soon",
//   },
// ];

// const TokenRoadmap = () => {
//   return (
//     <div className="min-h-screen  p-8">
//       <div className="max-w-9xl mx-auto">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Token Sale <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{backgroundImage: 'linear-gradient(to right, #bbcf28, #1c994a)'}}>Roadmap</span>
//           </h1>
//           <p className="text-xl text-gray-300">Join our phased token launch journey</p>
//         </div>
        
//         <div className="relative max-w-5xl mx-auto">
//           {/* Central Timeline */}
//           <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 z-0" style={{background: 'linear-gradient(to bottom, #bbcf28, #1c994a, #bbcf28)'}}></div>
          
//           {/* Timeline Phases */}
//           <div className="space-y-24">
//             {phaseData.map((phase, index) => (
//               <div key={index} className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center md:min-h-[200px]">
                
//                 {/* Left Side - Even indices (0, 2, 4) */}
//                 {index % 2 === 0 ? (
//                   <div className="flex justify-end pr-4">
//                     <div className="w-90 relative">
//                       <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                         phase.status === 'Live' ? 'ring-2' : ''
//                       }`} style={{
//                         ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                       }}>
//                         {/* Status Badge */}
//                         <div className="absolute -top-3 right-6">
//                           <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                             phase.status === 'Live' 
//                               ? 'text-white shadow-lg' 
//                               : 'bg-yellow-600 text-white'
//                           }`} style={{
//                             backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                             boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                           }}>
//                             {phase.status}
//                           </span>
//                         </div>
                        
//                         {/* Phase Content */}
//                         <div className="mt-4">
//                           <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                          
//                           <div className="space-y-3 mb-6">
//                             <div className="flex items-center space-x-2">
//                               <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                               <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                             </div>
                            
//                             <div className="text-gray-300 text-sm leading-relaxed">
//                               {phase.price}
//                             </div>
//                           </div>
                          
//                           <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                             phase.status === 'Live'
//                               ? 'text-white shadow-lg'
//                               : 'bg-yellow hover:bg-yellow text-gray-300 cursor-not-allowed'
//                           }`} style={{
//                             background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                             boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                           }}>
//                             {phase.button}
//                           </button>
//                         </div>
                        
//                         {/* Connecting Line from right edge of left card */}
//                         <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                           background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                         }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div></div>
//                 )}
                
//                 {/* Right Side - Odd indices (1, 3) */}
//                 {index % 2 === 1 ? (
//                   <div className="flex justify-start pl-4">
//                     <div className="w-90 relative">
//                       <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                         phase.status === 'Live' ? 'ring-2' : ''
//                       }`} style={{
//                         ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                       }}>
//                         {/* Status Badge */}
//                         <div className="absolute -top-3 left-6">
//                           <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                             phase.status === 'Live' 
//                               ? 'text-white shadow-lg' 
//                               : 'bg-gray-600 text-gray-200'
//                           }`} style={{
//                             backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                             boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                           }}>
//                             {phase.status}
//                           </span>
//                         </div>
                        
//                         {/* Phase Content */}
//                         <div className="mt-4">
//                           <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                          
//                           <div className="space-y-3 mb-6">
//                             <div className="flex items-center space-x-2">
//                               <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                               <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                             </div>
                            
//                             <div className="text-gray-300 text-sm leading-relaxed">
//                               {phase.price}
//                             </div>
//                           </div>
                          
//                           <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                             phase.status === 'Live'
//                               ? 'text-white shadow-lg'
//                               : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                           }`} style={{
//                             background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                             boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                           }}>
//                             {phase.button}
//                           </button>
//                         </div>
                        
//                         {/* Connecting Line from left edge of right card */}
//                         <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                           background: 'linear-gradient(to left, #bbcf28, #1c994a)'
//                         }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div></div>
//                 )}
                
//                 {/* Timeline Node - Always centered */}
//                 <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                   <div className={`w-6 h-6 rounded-full border-4 ${
//                     phase.status === 'Live' 
//                       ? 'border-4 shadow-lg' 
//                       : 'bg-gray-600 border-gray-500'
//                   }`} style={{
//                     backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                     borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                     boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(188, 207, 40, 0.5)' : 'none'
//                   }}>
//                     <div className={`absolute inset-0 rounded-full ${
//                       phase.status === 'Live' ? 'animate-ping' : ''
//                     }`} style={{backgroundColor: phase.status === 'Live' ? '#bbcf28' : 'transparent'}}></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>      
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;

// import React from 'react';

// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//     button: "Coming Soon",
//   },
// ];

// const TokenRoadmap = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8" style={{background: 'linear-gradient(135deg, #095258 0%, #1c994a 50%, #095258 100%)'}}>
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 md:mb-16">
//           <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
//             Token Sale <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{backgroundImage: 'linear-gradient(to right, #bbcf28, #1c994a)'}}>Roadmap</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300">Join our phased token launch journey</p>
//         </div>
        
//         <div className="relative max-w-5xl mx-auto">
//           {/* Central Timeline - Hidden on mobile */}
//           <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 z-0" style={{background: 'linear-gradient(to bottom, #bbcf28, #1c994a, #bbcf28)'}}></div>
          
//           {/* Left Timeline for mobile */}
//           <div className="md:hidden absolute left-6 h-full w-1 z-0" style={{background: 'linear-gradient(to bottom, #bbcf28, #1c994a, #bbcf28)'}}></div>
          
//           {/* Timeline Phases */}
//           <div className="space-y-8 md:space-y-24">
//             {phaseData.map((phase, index) => (
//               <div key={index} className="relative">
                
//                 {/* Desktop Layout - Alternating sides */}
//                 <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center md:min-h-[200px]">
                  
//                   {/* Left Side - Even indices (0, 2, 4) */}
//                   {index % 2 === 0 ? (
//                     <div className="flex justify-end pr-4">
//                       <div className="w-80 relative">
//                         <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                           phase.status === 'Live' ? 'ring-2' : ''
//                         }`} style={{
//                           ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                         }}>
//                           {/* Status Badge */}
//                           <div className="absolute -top-3 right-6">
//                             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-lg' 
//                                 : 'bg-gray-600 text-gray-200'
//                             }`} style={{
//                               backgroundColor: phase.status === 'Live' ? '#1c994a' : '#4b5563',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                             }}>
//                               {phase.status}
//                             </span>
//                           </div>
                          
//                           {/* Phase Content */}
//                           <div className="mt-4">
//                             <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                            
//                             <div className="space-y-3 mb-6">
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                                 <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                               </div>
                              
//                               <div className="text-gray-300 text-sm leading-relaxed">
//                                 {phase.price}
//                               </div>
//                             </div>
                            
//                             <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-lg'
//                                 : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: phase.status === 'Live' ? 'linear-gradient(to right, #1c994a, #bbcf28)' : '#4b5563',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line from right edge of left card */}
//                           <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                             background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Right Side - Odd indices (1, 3) */}
//                   {index % 2 === 1 ? (
//                     <div className="flex justify-start pl-4">
//                       <div className="w-80 relative">
//                         <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                           phase.status === 'Live' ? 'ring-2' : ''
//                         }`} style={{
//                           ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                         }}>
//                           {/* Status Badge */}
//                           <div className="absolute -top-3 left-6">
//                             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-lg' 
//                                 : 'bg-gray-600 text-gray-200'
//                             }`} style={{
//                               backgroundColor: phase.status === 'Live' ? '#1c994a' : '#4b5563',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                             }}>
//                               {phase.status}
//                             </span>
//                           </div>
                          
//                           {/* Phase Content */}
//                           <div className="mt-4">
//                             <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                            
//                             <div className="space-y-3 mb-6">
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                                 <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                               </div>
                              
//                               <div className="text-gray-300 text-sm leading-relaxed">
//                                 {phase.price}
//                               </div>
//                             </div>
                            
//                             <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-lg'
//                                 : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: phase.status === 'Live' ? 'linear-gradient(to right, #1c994a, #bbcf28)' : '#4b5563',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line from left edge of right card */}
//                           <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                             background: 'linear-gradient(to left, #bbcf28, #1c994a)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Timeline Node - Always centered on desktop */}
//                   <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                     <div className={`w-6 h-6 rounded-full border-4 ${
//                       phase.status === 'Live' 
//                         ? 'border-4 shadow-lg' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(188, 207, 40, 0.5)' : 'none'
//                     }}>
//                       <div className={`absolute inset-0 rounded-full ${
//                         phase.status === 'Live' ? 'animate-ping' : ''
//                       }`} style={{backgroundColor: phase.status === 'Live' ? '#bbcf28' : 'transparent'}}></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Layout - All cards on right side */}
//                 <div className="md:hidden flex items-center">
//                   {/* Timeline Node - Perfectly aligned with left timeline */}
//                   <div className="absolute left-6 transform -translate-x-1/2 z-20">
//                     <div className={`w-4 h-4 rounded-full border-2 ${
//                       phase.status === 'Live' 
//                         ? 'border-2 shadow-lg' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' ? '0 8px 20px rgba(188, 207, 40, 0.4)' : 'none'
//                     }}>
//                       <div className={`absolute inset-0 rounded-full ${
//                         phase.status === 'Live' ? 'animate-ping' : ''
//                       }`} style={{backgroundColor: phase.status === 'Live' ? '#bbcf28' : 'transparent'}}></div>
//                     </div>
//                   </div>

//                   {/* Connecting Line */}
//                   <div className="ml-8 w-6 h-0.5 z-10" style={{
//                     background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                   }}></div>

//                   {/* Card - Always on right */}
//                   <div className="flex-1 ml-2">
//                     <div className={`relative bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl transform transition-all duration-300 ${
//                       phase.status === 'Live' ? 'ring-2' : ''
//                     }`} style={{
//                       ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                     }}>
//                       {/* Status Badge */}
//                       <div className="absolute -top-2 right-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           phase.status === 'Live' 
//                             ? 'text-white shadow-lg' 
//                             : 'bg-gray-600 text-gray-200'
//                         }`} style={{
//                           backgroundColor: phase.status === 'Live' ? '#1c994a' : '#4b5563',
//                           boxShadow: phase.status === 'Live' ? '0 8px 20px rgba(28, 153, 74, 0.4)' : 'none'
//                         }}>
//                           {phase.status}
//                         </span>
//                       </div>
                      
//                       {/* Phase Content */}
//                       <div className="mt-3">
//                         <h3 className="text-xl font-bold text-white mb-2">{phase.phaseNo}</h3>
                        
//                         <div className="space-y-2 mb-4">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                             <span className="font-medium text-sm" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                           </div>
                          
//                           <div className="text-gray-300 text-xs leading-relaxed">
//                             {phase.price}
//                           </div>
//                         </div>
                        
//                         <button className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
//                           phase.status === 'Live'
//                             ? 'text-white shadow-lg'
//                             : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                         }`} style={{
//                           background: phase.status === 'Live' ? 'linear-gradient(to right, #1c994a, #bbcf28)' : '#4b5563',
//                           boxShadow: phase.status === 'Live' ? '0 8px 20px rgba(28, 153, 74, 0.2)' : 'none'
//                         }}>
//                           {phase.button}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//               </div>
//             ))}
//           </div>
//         </div>      
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;



// import React from 'react';

// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//     // icon: "🚀",
//     description: "Launch phase with exclusive early-bird benefits",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//     button: "Coming Soon",
//     // icon: "⭐",
//     description: "Enhanced rewards and premium token allocation",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
//     button: "Coming Soon",
//     // icon: "💎",
//     description: "Diamond tier with exclusive staking benefits",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//     button: "Coming Soon",
//     // icon: "👑",
//     description: "Premium phase with governance token access",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//     button: "Coming Soon",
//     // icon: "🏆",
//     description: "Ultimate tier with maximum rewards potential",
//   },
// ];

// const TokenRoadmap = () => {
//   return (
//     <div className="min-h-screen relative overflow-hidden p-4 md:p-8" style={{
//       // background: '#095258'
//     }}>
//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-8 md:mb-16">
//           <div className="inline-block p-1 rounded-full mb-6" style={{
//             background: 'linear-gradient(45deg, #bbcf28, #1c994a, #bbcf28)'
//           }}>
//             <div className="bg-black px-6 py-2 rounded-full">
//               <span className="text-sm font-medium text-white tracking-widest uppercase">Token Sale</span>
//             </div>
//           </div>
          
//           <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
//             Token Sale{' '}
//             <span className="relative inline-block">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-yellow-300 animate-pulse">
//                 Roadmap
//               </span>
//               <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-50"></div>
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 font-light">
//             Join our phased token launch journey
//           </p>
//         </div>
        
//         <div className="relative max-w-5xl mx-auto">
//           {/* Central Timeline - Enhanced */}
//           <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 z-0" style={{
//             background: 'linear-gradient(to bottom, #bbcf28 0%, #1c994a 50%, #bbcf28 100%)',
//             boxShadow: '0 0 20px rgba(188, 207, 40, 0.3)'
//           }}></div>
          
//           {/* Left Timeline for mobile - Enhanced */}
//           <div className="md:hidden absolute left-6 h-full w-1 z-0" style={{
//             background: 'linear-gradient(to bottom, #bbcf28 0%, #1c994a 50%, #bbcf28 100%)',
//             boxShadow: '0 0 15px rgba(188, 207, 40, 0.3)'
//           }}></div>
          
//           {/* Timeline Phases */}
//           <div className="space-y-8 md:space-y-24">
//             {phaseData.map((phase, index) => (
//               <div key={index} className="relative">
                
//                 {/* Desktop Layout - Alternating sides */}
//                 <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center md:min-h-[200px]">
                  
//                   {/* Left Side - Even indices (0, 2, 4) */}
//                   {index % 2 === 0 ? (
//                     <div className="flex justify-end pr-4">
//                       <div className="w-80 relative group">
//                         <div className={`relative backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
//                           phase.status === 'Live' 
//                             ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20 border-green-400/40 ring-2 ring-green-400/50' 
//                             : 'bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border-gray-600/30 hover:border-gray-500/50'
//                         }`} style={{
//                           backdropFilter: 'blur(20px)',
//                           boxShadow: phase.status === 'Live' 
//                             ? '0 25px 50px rgba(28, 153, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
//                             : '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
//                         }}>
//                           {/* Floating Icon */}
//                           <div className="absolute -top-6 left-8 text-4xl transform group-hover:scale-110 transition-transform duration-300">
//                             {phase.icon}
//                           </div>
                          
//                           {/* Status Badge - Redesigned */}
//                           <div className="absolute -top-4 right-8">
//                             <div className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-xl' 
//                                 : 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
//                             }`} style={{
//                               background: phase.status === 'Live' 
//                                 ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 100%)' 
//                                 : undefined,
//                               boxShadow: phase.status === 'Live' 
//                                 ? '0 15px 30px rgba(28, 153, 74, 0.4), 0 0 20px rgba(28, 153, 74, 0.3)' 
//                                 : 'none'
//                             }}>
//                               {phase.status}
//                               {phase.status === 'Live' && (
//                                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
//                               )}
//                             </div>
//                           </div>
                          
//                           {/* Content */}
//                           <div className="mt-8">
//                             <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{phase.phaseNo}</h3>
//                             <p className="text-gray-400 text-sm mb-6 italic">{phase.description}</p>
                            
//                             <div className="space-y-4 mb-8 flex flex-2">
//                               <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/20 border border-green-400/20">
//                                 {/* <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-300 animate-pulse"></div> */}
//                                 <span className="font-bold text-green-300">{phase.tokens}</span>
//                               </div>
                              
//                               <div className="p-3 rounded-xl bg-black/20 border border-gray-600/20">
//                                 <div className="text-gray-300 text-sm leading-relaxed font-medium">
//                                   {phase.price}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <button className={`w-full py-4 px-8 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-2xl hover:shadow-green-400/25'
//                                 : 'bg-gray-700 hover:bg-gray-600 text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: phase.status === 'Live' 
//                                 ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 50%, #1c994a 100%)' 
//                                 : undefined,
//                               boxShadow: phase.status === 'Live' 
//                                 ? '0 20px 40px rgba(28, 153, 74, 0.3)' 
//                                 : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line Enhanced */}
//                           <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-8 h-1 z-10" style={{
//                             background: 'linear-gradient(to right, #bbcf28, #1c994a)',
//                             boxShadow: '0 0 10px rgba(188, 207, 40, 0.5)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Right Side - Odd indices (1, 3) */}
//                   {index % 2 === 1 ? (
//                     <div className="flex justify-start pl-4">
//                       <div className="w-80 relative group">
//                         <div className={`relative backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
//                           phase.status === 'Live' 
//                             ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20 border-green-400/40 ring-2 ring-green-400/50' 
//                             : 'bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border-gray-600/30 hover:border-gray-500/50'
//                         }`} style={{
//                           backdropFilter: 'blur(20px)',
//                           boxShadow: phase.status === 'Live' 
//                             ? '0 25px 50px rgba(28, 153, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
//                             : '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
//                         }}>
//                           {/* Floating Icon */}
//                           <div className="absolute -top-6 right-8 text-4xl transform group-hover:scale-110 transition-transform duration-300">
//                             {phase.icon}
//                           </div>
                          
//                           {/* Status Badge */}
//                           <div className="absolute -top-4 left-8">
//                             <div className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-xl' 
//                                 : 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
//                             }`} style={{
//                               background: phase.status === 'Live' 
//                                 ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 100%)' 
//                                 : undefined,
//                               boxShadow: phase.status === 'Live' 
//                                 ? '0 15px 30px rgba(28, 153, 74, 0.4), 0 0 20px rgba(28, 153, 74, 0.3)' 
//                                 : 'none'
//                             }}>
//                               {phase.status}
//                               {phase.status === 'Live' && (
//                                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
//                               )}
//                             </div>
//                           </div>
                          
//                           {/* Content */}
//                           <div className="mt-8">
//                             <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{phase.phaseNo}</h3>
//                             <p className="text-gray-400 text-sm mb-6 italic">{phase.description}</p>
                            
//                             <div className="space-y-4 mb-8 flex flex-1">
//                               <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/20 border border-green-400/20">
//                                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-300 animate-pulse"></div>
//                                 <span className="font-bold text-green-300">{phase.tokens}</span>
//                               </div>
                              
//                               <div className="p-3 rounded-xl bg-black/20 border border-gray-600/20">
//                                 <div className="text-gray-300 text-sm leading-relaxed font-medium">
//                                   {phase.price}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <button className={`w-full py-4 px-8 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-2xl hover:shadow-green-400/25'
//                                 : 'bg-gray-700 hover:bg-gray-600 text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: phase.status === 'Live' 
//                                 ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 50%, #1c994a 100%)' 
//                                 : undefined,
//                               boxShadow: phase.status === 'Live' 
//                                 ? '0 20px 40px rgba(28, 153, 74, 0.3)' 
//                                 : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line Enhanced */}
//                           <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-8 h-1 z-10" style={{
//                             background: 'linear-gradient(to left, #bbcf28, #1c994a)',
//                             boxShadow: '0 0 10px rgba(188, 207, 40, 0.5)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Timeline Node - Enhanced */}
//                   <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                     <div className={`relative w-8 h-8 rounded-full border-4 ${
//                       phase.status === 'Live' 
//                         ? 'border-4 shadow-2xl' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' 
//                         ? '0 0 30px rgba(188, 207, 40, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)' 
//                         : 'none'
//                     }}>
//                       {phase.status === 'Live' && (
//                         <>
//                           <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></div>
//                           <div className="absolute inset-2 rounded-full bg-white opacity-30"></div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Layout - Enhanced */}
//                 <div className="md:hidden flex items-center">
//                   {/* Timeline Node */}
//                   <div className="absolute left-6 transform -translate-x-1/2 z-20">
//                     <div className={`relative w-6 h-6 rounded-full border-2 ${
//                       phase.status === 'Live' 
//                         ? 'border-2 shadow-xl' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' 
//                         ? '0 0 20px rgba(188, 207, 40, 0.5)' 
//                         : 'none'
//                     }}>
//                       {phase.status === 'Live' && (
//                         <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400 opacity-75"></div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Connecting Line */}
//                   <div className="ml-8 w-8 h-1 z-10" style={{
//                     background: 'linear-gradient(to right, #bbcf28, #1c994a)',
//                     boxShadow: '0 0 8px rgba(188, 207, 40, 0.4)'
//                   }}></div>

//                   {/* Card - Mobile Enhanced */}
//                   <div className="flex-1 ml-3">
//                     <div className={`relative backdrop-blur-xl rounded-2xl p-5 border shadow-xl transform transition-all duration-300 ${
//                       phase.status === 'Live' 
//                         ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20 border-green-400/30' 
//                         : 'bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border-gray-600/30'
//                     }`} style={{
//                       backdropFilter: 'blur(15px)',
//                       boxShadow: phase.status === 'Live' 
//                         ? '0 20px 40px rgba(28, 153, 74, 0.15)' 
//                         : '0 20px 40px rgba(0, 0, 0, 0.2)'
//                     }}>
//                       {/* Icon */}
//                       <div className="absolute -top-3 left-4 text-2xl">
//                         {phase.icon}
//                       </div>
                      
//                       {/* Status Badge */}
//                       <div className="absolute -top-3 right-4">
//                         <span className={`px-4 py-1 rounded-full text-xs font-bold ${
//                           phase.status === 'Live' 
//                             ? 'text-white shadow-lg' 
//                             : 'bg-gray-700 text-gray-300'
//                         }`} style={{
//                           background: phase.status === 'Live' 
//                             ? 'linear-gradient(135deg, #1c994a, #bbcf28)' 
//                             : undefined,
//                           boxShadow: phase.status === 'Live' 
//                             ? '0 10px 20px rgba(28, 153, 74, 0.3)' 
//                             : 'none'
//                         }}>
//                           {phase.status}
//                         </span>
//                       </div>
                      
//                       {/* Content */}
//                       <div className="mt-4">
//                         <h3 className="text-xl font-black text-white mb-1">{phase.phaseNo}</h3>
//                         <p className="text-gray-400 text-xs mb-4 italic">{phase.description}</p>
                        
//                         <div className="space-y-3 mb-5">
//                           <div className="flex items-center space-x-2 p-2 rounded-lg bg-black/20">
//                             <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-300"></div>
//                             <span className="font-bold text-green-300 text-sm">{phase.tokens}</span>
//                           </div>
                          
//                           <div className="p-2 rounded-lg bg-black/20">
//                             <div className="text-gray-300 text-xs leading-relaxed">
//                               {phase.price}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <button className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
//                           phase.status === 'Live'
//                             ? 'text-white shadow-xl'
//                             : 'bg-gray-700 text-gray-300 cursor-not-allowed'
//                         }`} style={{
//                           background: phase.status === 'Live' 
//                             ? 'linear-gradient(135deg, #1c994a, #bbcf28)' 
//                             : undefined,
//                           boxShadow: phase.status === 'Live' 
//                             ? '0 15px 30px rgba(28, 153, 74, 0.2)' 
//                             : 'none'
//                         }}>
//                           {phase.button}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//               </div>
//             ))}
//           </div>
//         </div>      
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;



// import React, { useState, useEffect } from 'react';
// import { CheckCircle, Clock, Rocket, Star, Diamond, Crown, Trophy } from 'lucide-react';

// const TokenRoadmap = () => {
//   const [visiblePhases, setVisiblePhases] = useState([]);

//   const phaseData = [
//     {
//       status: "Live",
//       phaseNo: "Phase 1",
//       tokens: "10 Billion Tokens",
//       price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//       button: "Buy Now",
//       description: "Launch phase with exclusive early-bird benefits",
//       icon: Rocket,
//       gradient: "from-teal-500 to-green-600",
//       bgGradient: "from-teal-50 to-green-50"
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 2",
//       tokens: "20 Billion Tokens",
//       price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//       button: "Coming Soon",
//       description: "Enhanced rewards and premium token allocation",
//       icon: Star,
//       gradient: "from-teal-400 to-teal-600",
//       bgGradient: "from-teal-50 to-teal-100"
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 3",
//       tokens: "25 Billion Tokens",
//       price: "Price INR 0.60 - 1.53 Paisa (0.0071 - 0.018 USD)",
//       button: "Coming Soon",
//       description: "Diamond tier with exclusive staking benefits",
//       icon: Diamond,
//       gradient: "from-green-400 to-green-600",
//       bgGradient: "from-green-50 to-green-100"
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 4",
//       tokens: "30 Billion Tokens",
//       price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//       button: "Coming Soon",
//       description: "Premium phase with governance token access",
//       icon: Crown,
//       gradient: "from-teal-500 to-green-500",
//       bgGradient: "from-teal-50 to-green-50"
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 5",
//       tokens: "25 Billion Tokens",
//       price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//       button: "Coming Soon",
//       description: "Ultimate tier with maximum rewards potential",
//       icon: Trophy,
//       gradient: "from-green-500 to-teal-600",
//       bgGradient: "from-green-50 to-teal-50"
//     },
//   ];

//   useEffect(() => {
//     phaseData.forEach((_, index) => {
//       setTimeout(() => {
//         setVisiblePhases(prev => [...prev, index]);
//       }, index * 200);
//     });
//   }, []);

//   const getStatusIcon = (status, index) => {
//     if (status === "Live") {
//       return <CheckCircle className="w-6 h-6 text-green-500" />;
//     }
//     return <Clock className="w-6 h-6 text-gray-400" />;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
//             Token Launch Roadmap
//           </h1>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Join our revolutionary token ecosystem across multiple phases with exclusive benefits and rewards
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Vertical line */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-400 to-green-400 opacity-30"></div>
          
//           {phaseData.map((phase, index) => {
//             const IconComponent = phase.icon;
//             const isVisible = visiblePhases.includes(index);
//             const isLive = phase.status === "Live";
            
//             return (
//               <div
//                 key={index}
//                 className={`relative flex items-center mb-16 transition-all duration-700 ${
//                   isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                 } ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
//               >
//                 {/* Phase Card */}
//                 <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
//                   <div className={`relative p-8 rounded-2xl shadow-2xl border transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
//                     isLive 
//                       ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-200/50' 
//                       : `bg-gradient-to-br ${phase.bgGradient} border-gray-200 shadow-gray-200/30`
//                   }`}>
//                     {/* Live Badge */}
//                     {isLive && (
//                       <div className="absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r from-teal-500 to-green-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
//                         🔥 LIVE NOW
//                       </div>
//                     )}
                    
//                     {/* Phase Header */}
//                     <div className="flex items-center mb-6">
//                       <div className={`p-3 rounded-xl bg-gradient-to-r ${phase.gradient} text-white mr-4 shadow-lg`}>
//                         <IconComponent className="w-8 h-8" />
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-bold text-gray-800">{phase.phaseNo}</h3>
//                         <div className="flex items-center mt-1">
//                           {getStatusIcon(phase.status)}
//                           <span className={`ml-2 font-semibold ${
//                             isLive ? 'text-green-600' : 'text-gray-500'
//                           }`}>
//                             {phase.status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Phase Details */}
//                     <div className="space-y-4">
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-teal-400/20 via-white/80 to-teal-600/30 rounded-2xl p-6 border border-teal-300/40 shadow-xl backdrop-blur-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
//                           <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <div className="relative z-10">
//                             <div className="flex items-center justify-center mb-3">
//                               <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-lg">
//                                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                   <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
//                                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
//                                 </svg>
//                               </div>
//                             </div>
//                             <h4 className="font-bold text-teal-800 mb-3 text-center text-sm uppercase tracking-wider">Token Allocation</h4>
//                             <div className="text-center">
//                               <p className="text-xl font-black text-teal-900 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">{phase.tokens}</p>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-green-400/20 via-white/80 to-green-600/30 rounded-2xl p-6 border border-green-300/40 shadow-xl backdrop-blur-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
//                           <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <div className="relative z-10">
//                             <div className="flex items-center justify-center mb-3">
//                               <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg">
//                                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                   <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
//                                 </svg>
//                               </div>
//                             </div>
//                             <h4 className="font-bold text-green-800 mb-3 text-center text-sm uppercase tracking-wider">Pricing Range</h4>
//                             <div className="text-center">
//                               <p className="text-xs font-black text-green-900 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent leading-relaxed">{phase.price}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <p className="text-gray-600 italic">{phase.description}</p>
                      
//                       <button className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
//                         isLive
//                           ? 'bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 shadow-lg hover:shadow-xl'
//                           : 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-70'
//                       }`}>
//                         {phase.button}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Center Timeline Node */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
//                     isLive 
//                       ? 'bg-gradient-to-r from-teal-500 to-green-500 scale-110 animate-pulse' 
//                       : `bg-gradient-to-r ${phase.gradient}`
//                   }`}>
//                     <IconComponent className="w-8 h-8 text-white" />
//                   </div>
//                 </div>

//                 {/* Phase Number on opposite side */}
//                 <div className={`w-5/12 flex ${index % 2 === 0 ? 'justify-start pl-8' : 'justify-end pr-8'}`}>
//                   <div className="text-center">
//                     <div className={`text-6xl font-bold bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent opacity-20`}>
//                       0{index + 1}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-20 p-8 bg-gradient-to-r from-teal-800/20 to-green-800/20 rounded-2xl border border-teal-400/30">
//           <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Revolution?</h2>
//           <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
//             Don't miss out on the exclusive early-bird benefits. Join Phase 1 now and be part of the future of tokenization.
//           </p>
//           <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//             Get Started Today
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;


// import React, { useState, useEffect } from 'react';
// import { CheckCircle, Clock, Rocket, Star, Diamond, Crown, Trophy, Zap, ArrowRight, TrendingUp } from 'lucide-react';

// const CreativeTokenRoadmap = () => {
//   const [currentPhase, setCurrentPhase] = useState(0);
//   const [animationComplete, setAnimationComplete] = useState(false);
//   const [hoveredPhase, setHoveredPhase] = useState(null);

//   const phaseData = [
//     {
//       status: "Live",
//       phaseNo: "Phase 1",
//       title: "Genesis Launch",
//       tokens: "10B",
//       fullTokens: "10 Billion Tokens",
//       priceRange: "₹0.01 - ₹0.04",
//       priceUSD: "$0.00012-$0.00046",
//       button: "Buy Now",
//       description: "Launch phase with exclusive early-bird benefits and founder rewards",
//       icon: Rocket,
//       color: "#14B8A6",
//       bgGradient: "from-teal-400 via-teal-500 to-cyan-600",
//       completion: 100,
//       benefits: ["Early Bird Bonus", "Founder Status", "Priority Access"]
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 2",
//       title: "Community Expansion",
//       tokens: "20B",
//       fullTokens: "20 Billion Tokens",
//       priceRange: "₹0.05 - ₹0.50",
//       priceUSD: "$0.00061-$0.0061",
//       button: "Coming Soon",
//       description: "Enhanced rewards and premium token allocation for community growth",
//       icon: Star,
//       color: "#3B82F6",
//       bgGradient: "from-blue-400 via-blue-500 to-indigo-600",
//       completion: 0,
//       benefits: ["Enhanced Rewards", "Premium Allocation", "Community Perks"]
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 3",
//       title: "Diamond Tier",
//       tokens: "25B",
//       fullTokens: "25 Billion Tokens",
//       priceRange: "₹0.60 - ₹1.53",
//       priceUSD: "$0.0071-$0.018",
//       button: "Coming Soon",
//       description: "Diamond tier with exclusive staking benefits and governance rights",
//       icon: Diamond,
//       color: "#8B5CF6",
//       bgGradient: "from-purple-400 via-purple-500 to-violet-600",
//       completion: 0,
//       benefits: ["Staking Rewards", "Governance Rights", "VIP Access"]
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 4",
//       title: "Governance Era",
//       tokens: "30B",
//       fullTokens: "30 Billion Tokens",
//       priceRange: "₹1.60 - ₹3.00",
//       priceUSD: "$0.019-$0.036",
//       button: "Coming Soon",
//       description: "Premium phase with full governance token access and DAO participation",
//       icon: Crown,
//       color: "#10B981",
//       bgGradient: "from-emerald-400 via-green-500 to-teal-600",
//       completion: 0,
//       benefits: ["DAO Participation", "Full Governance", "Premium Features"]
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 5",
//       title: "Ultimate Rewards",
//       tokens: "25B",
//       fullTokens: "25 Billion Tokens",
//       priceRange: "₹3.15 - ₹4.10",
//       priceUSD: "$0.037-$0.049",
//       button: "Coming Soon",
//       description: "Ultimate tier with maximum rewards potential and exclusive benefits",
//       icon: Trophy,
//       color: "#F59E0B",
//       bgGradient: "from-amber-400 via-orange-500 to-red-500",
//       completion: 0,
//       benefits: ["Maximum Rewards", "Exclusive Benefits", "Legacy Status"]
//     },
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAnimationComplete(true);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handlePhaseClick = (index) => {
//     setCurrentPhase(index);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        
//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${3 + Math.random() * 2}s`
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
//         {/* Futuristic Header */}
//         <div className="text-center mb-16 pt-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6 animate-spin-slow">
//             <Zap className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 animate-pulse">
//             TOKEN ROADMAP
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Experience the future of tokenomics through our revolutionary 5-phase journey
//           </p>
//           <div className="mt-6 flex items-center justify-center space-x-2 text-cyan-400">
//             <TrendingUp className="w-5 h-5" />
//             <span className="text-sm font-medium">Total Supply: 110 Billion Tokens</span>
//           </div>
//         </div>

//         {/* Interactive Phase Selector */}
//         <div className="flex justify-center mb-12">
//           <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 border border-white/10">
//             {phaseData.map((phase, index) => {
//               const IconComponent = phase.icon;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => handlePhaseClick(index)}
//                   className={`relative w-12 h-12 rounded-full mx-1 transition-all duration-300 ${
//                     currentPhase === index
//                       ? 'bg-gradient-to-r from-cyan-400 to-purple-500 scale-110 shadow-lg shadow-purple-500/50'
//                       : 'bg-white/10 hover:bg-white/20'
//                   }`}
//                 >
//                   <IconComponent className={`w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
//                     currentPhase === index ? 'text-white' : 'text-gray-400'
//                   }`} />
//                   {phase.status === 'Live' && (
//                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Main Phase Display */}
//         <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
//           {/* Left: Phase Details */}
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${phaseData[currentPhase].bgGradient} flex items-center justify-center shadow-lg`}>
//                   {React.createElement(phaseData[currentPhase].icon, { className: "w-8 h-8 text-white" })}
//                 </div>
//                 <div>
//                   <h2 className="text-3xl font-bold text-white">{phaseData[currentPhase].title}</h2>
//                   <p className="text-lg text-gray-300">{phaseData[currentPhase].phaseNo}</p>
//                 </div>
//                 <div className={`px-4 py-2 rounded-full ${
//                   phaseData[currentPhase].status === 'Live' 
//                     ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                     : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
//                 }`}>
//                   <div className="flex items-center space-x-2">
//                     {phaseData[currentPhase].status === 'Live' ? (
//                       <CheckCircle className="w-4 h-4" />
//                     ) : (
//                       <Clock className="w-4 h-4" />
//                     )}
//                     <span className="text-sm font-medium">{phaseData[currentPhase].status}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <p className="text-gray-300 text-lg leading-relaxed">
//                 {phaseData[currentPhase].description}
//               </p>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-6">
//               <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//                 <div className="text-center">
//                   <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
//                     {phaseData[currentPhase].tokens}
//                   </div>
//                   <div className="text-gray-400 text-sm mt-1">Token Supply</div>
//                   <div className="text-xs text-gray-500 mt-1">{phaseData[currentPhase].fullTokens}</div>
//                 </div>
//               </div>
              
//               <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-white">
//                     {phaseData[currentPhase].priceRange}
//                   </div>
//                   <div className="text-gray-400 text-sm mt-1">Price Range</div>
//                   <div className="text-xs text-gray-500 mt-1">{phaseData[currentPhase].priceUSD}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Benefits */}
//             <div className="space-y-3">
//               <h3 className="text-white font-semibold">Key Benefits:</h3>
//               <div className="grid grid-cols-1 gap-2">
//                 {phaseData[currentPhase].benefits.map((benefit, index) => (
//                   <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
//                     <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phaseData[currentPhase].bgGradient}`}></div>
//                     <span className="text-gray-300">{benefit}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Button */}
//             <button className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
//               phaseData[currentPhase].status === 'Live'
//                 ? `bg-gradient-to-r ${phaseData[currentPhase].bgGradient} text-white hover:scale-105 shadow-lg hover:shadow-xl`
//                 : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//             }`}>
//               <div className="flex items-center justify-center space-x-2">
//                 <span>{phaseData[currentPhase].button}</span>
//                 {phaseData[currentPhase].status === 'Live' && <ArrowRight className="w-5 h-5" />}
//               </div>
//             </button>
//           </div>

//           {/* Right: Visual Roadmap */}
//           <div className="relative">
//             <div className="space-y-6">
//               {phaseData.map((phase, index) => {
//                 const IconComponent = phase.icon;
//                 const isActive = index === currentPhase;
//                 const isCompleted = phase.status === 'Live';
                
//                 return (
//                   <div
//                     key={index}
//                     className={`relative transition-all duration-500 cursor-pointer ${
//                       isActive ? 'scale-105' : 'hover:scale-102'
//                     }`}
//                     onClick={() => handlePhaseClick(index)}
//                     onMouseEnter={() => setHoveredPhase(index)}
//                     onMouseLeave={() => setHoveredPhase(null)}
//                   >
//                     {/* Connection Line */}
//                     {index < phaseData.length - 1 && (
//                       <div className="absolute left-6 top-14 w-0.5 h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
//                     )}
                    
//                     <div className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
//                       isActive 
//                         ? 'bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl' 
//                         : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
//                     }`}>
//                       {/* Phase Icon */}
//                       <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                         isActive 
//                           ? `bg-gradient-to-r ${phase.bgGradient} shadow-lg`
//                           : isCompleted
//                             ? 'bg-green-500/20 border border-green-500/30'
//                             : 'bg-white/10'
//                       }`}>
//                         <IconComponent className={`w-6 h-6 ${
//                           isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-400'
//                         }`} />
                        
//                         {isCompleted && (
//                           <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse">
//                             <CheckCircle className="w-4 h-4 text-white" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Phase Info */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between">
//                           <h3 className={`font-semibold transition-colors ${
//                             isActive ? 'text-white' : 'text-gray-300'
//                           }`}>
//                             {phase.phaseNo}
//                           </h3>
//                           <span className="text-sm text-gray-400">{phase.tokens}</span>
//                         </div>
//                         <p className={`text-sm transition-colors ${
//                           isActive ? 'text-gray-200' : 'text-gray-500'
//                         }`}>
//                           {phase.title}
//                         </p>
                        
//                         {/* Progress Bar for Active/Completed Phases */}
//                         {(isActive || isCompleted) && (
//                           <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
//                             <div 
//                               className={`h-full bg-gradient-to-r ${phase.bgGradient} transition-all duration-1000 ease-out`}
//                               style={{ width: `${phase.completion}%` }}
//                             ></div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA Section */}
//         <div className="text-center bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
//           <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
//             Join the Revolution
//           </h2>
//           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//             Phase 1 is live with exclusive early-bird benefits. Be part of the future of decentralized finance.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
//               <div className="flex items-center space-x-2">
//                 <span>Start Your Journey</span>
//                 <Rocket className="w-5 h-5" />
//               </div>
//             </button>
//             <button className="border border-white/20 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/10 transition-all duration-300">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreativeTokenRoadmap;



// import React, { useState, useEffect } from 'react';
// import { Rocket, Star, Diamond, Crown, Trophy, TrendingUp, Zap, Target, ArrowUp } from 'lucide-react';

// const SpaceTradingRoadmap = () => {
//   const [currentLevel, setCurrentLevel] = useState(0);
//   const [rocketPosition, setRocketPosition] = useState(0);
//   const [showStats, setShowStats] = useState(false);

//   const levels = [
//     {
//       level: 1,
//       title: "LAUNCH PAD",
//       subtitle: "Genesis Protocol",
//       tokens: "10B",
//       price: "₹0.01-0.04",
//       marketCap: "$1.2M",
//       xp: 1000,
//       status: "ACTIVE",
//       color: "#00ff88",
//       bgColor: "from-emerald-400 to-cyan-500",
//       icon: Rocket,
//       planet: "Earth",
//       unlocks: ["Early Adopter Badge", "2x Rewards Multiplier"],
//       progress: 85
//     },
//     {
//       level: 2,
//       title: "ORBIT STATION",
//       subtitle: "Community Expansion", 
//       tokens: "20B",
//       price: "₹0.05-0.50",
//       marketCap: "$12M",
//       xp: 2500,
//       status: "LOCKED",
//       color: "#0099ff",
//       bgColor: "from-blue-400 to-indigo-500",
//       icon: Star,
//       planet: "Moon",
//       unlocks: ["Staking Rewards", "DAO Voting Rights"],
//       progress: 0
//     },
//     {
//       level: 3,
//       title: "ASTEROID BELT",
//       subtitle: "DeFi Mining",
//       tokens: "25B", 
//       price: "₹0.60-1.53",
//       marketCap: "$177M",
//       xp: 5000,
//       status: "LOCKED",
//       color: "#9933ff",
//       bgColor: "from-purple-400 to-pink-500",
//       icon: Diamond,
//       planet: "Mars",
//       unlocks: ["Yield Farming", "NFT Marketplace"],
//       progress: 0
//     },
//     {
//       level: 4,
//       title: "DEEP SPACE",
//       subtitle: "Galactic Network",
//       tokens: "30B",
//       price: "₹1.60-3.00", 
//       marketCap: "$570M",
//       xp: 10000,
//       status: "LOCKED",
//       color: "#ff9900",
//       bgColor: "from-orange-400 to-red-500",
//       icon: Crown,
//       planet: "Jupiter",
//       unlocks: ["Cross-Chain Bridge", "Governance Token"],
//       progress: 0
//     },
//     {
//       level: 5,
//       title: "GALAXY CORE",
//       subtitle: "Universal Adoption",
//       tokens: "25B",
//       price: "₹3.15-4.10",
//       marketCap: "$1.2B", 
//       xp: 25000,
//       status: "LOCKED",
//       color: "#ff3366",
//       bgColor: "from-pink-400 to-purple-600",
//       icon: Trophy,
//       planet: "Alpha Centauri",
//       unlocks: ["Mass Adoption", "Legacy Status"],
//       progress: 0
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRocketPosition(prev => (prev + 0.5) % 100);
//     }, 50);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     setShowStats(true);
//   }, []);

//   const totalXP = levels.reduce((sum, level) => sum + level.xp, 0);
//   const currentXP = levels.slice(0, currentLevel + 1).reduce((sum, level) => sum + level.xp, 0);

//   return (
//     <div className="min-h-screen  text-white relative overflow-hidden">
//       {/* Space Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full opacity-15 blur-3xl"></div>
//       </div>

//       {/* HUD Header */}
//       <div className="relative z-10 p-4 md:p-6">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
//           <div>
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
//               SPACE TRADING PROTOCOL
//             </h1>
//             <div className="text-green-400 font-mono text-xs md:text-sm mt-1">
//               MISSION STATUS: ACTIVE • LEVEL {currentLevel + 1}/5
//             </div>
//           </div>
          
//           <div className="bg-black/50 backdrop-blur border border-green-400/30 rounded-lg p-3 md:p-4 font-mono">
//             <div className="text-xs text-gray-400">TOTAL XP</div>
//             <div className="text-lg md:text-xl font-bold text-green-400">{currentXP.toLocaleString()}</div>
//             <div className="text-xs text-gray-400">/{totalXP.toLocaleString()}</div>
//           </div>
//         </div>
//       </div>
//       <div className="relative z-10 px-4 md:px-6 pb-4 md:pb-6">
//         <div className="bg-black/30 backdrop-blur border border-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6">
          
//           {/* Chart Header */}
//           <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="font-mono text-green-400 text-sm md:text-base">PHASE PROGRESSION CHART</span>
//             </div>
//             <div className="text-xs font-mono text-gray-400">
//               <span className="hidden md:inline">TIME FRAME: 12 MONTHS • CHART TYPE: EXPONENTIAL</span>
//               <span className="md:hidden">12M • EXPONENTIAL</span>
//             </div>
//           </div>

//           {/* Chart Grid */}
//           <div className="relative h-64 md:h-80 lg:h-96 mb-6 md:mb-8 overflow-hidden">
//             {/* Grid Lines */}
//             <div className="absolute inset-0">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="absolute w-full border-t border-gray-800/50" style={{ top: `${i * 20}%` }} />
//               ))}
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="absolute h-full border-l border-gray-800/50" style={{ left: `${i * 20}%` }} />
//               ))}
//             </div>

//             {/* Price Chart Line */}
//             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//               <defs>
//                 <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#00ff88" />
//                   <stop offset="25%" stopColor="#0099ff" />
//                   <stop offset="50%" stopColor="#9933ff" />
//                   <stop offset="75%" stopColor="#ff9900" />
//                   <stop offset="100%" stopColor="#ff3366" />
//                 </linearGradient>
//                 <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
//                   <stop offset="0%" stopColor="url(#chartGradient)" stopOpacity="0.3" />
//                   <stop offset="100%" stopColor="url(#chartGradient)" stopOpacity="0" />
//                 </linearGradient>
//               </defs>
              
//               {/* Chart Path - Responsive */}
//               <path
//                 d="M 0 85 Q 20 75 40 65 Q 60 50 80 35 Q 90 20 100 10"
//                 fill="none"
//                 stroke="url(#chartGradient)"
//                 strokeWidth="0.5"
//                 vectorEffect="non-scaling-stroke"
//                 className="drop-shadow-lg"
//               />
//               <path
//                 d="M 0 85 Q 20 75 40 65 Q 60 50 80 35 Q 90 20 100 10 L 100 100 L 0 100 Z"
//                 fill="url(#chartFill)"
//               />
//             </svg>

//             {/* Level Markers */}
//             {levels.map((level, index) => {
//               const x = (index * 20) + 10;
//               const y = 75 - (index * 12);
//               const isActive = index === currentLevel;
//               const isCompleted = index < currentLevel;
//               const IconComponent = level.icon;
              
//               return (
//                 <div
//                   key={index}
//                   className={`absolute cursor-pointer transition-all duration-300 ${
//                     isActive ? 'scale-110 md:scale-125 z-20' : 'hover:scale-105 md:hover:scale-110 z-10'
//                   }`}
//                   style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
//                   onClick={() => setCurrentLevel(index)}
//                 >
//                   {/* Level Node */}
//                   <div className={`relative w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300`}
//                        style={{
//                          backgroundColor: level.status === 'ACTIVE' ? level.color : (isCompleted ? level.color : '#374151'),
//                          borderColor: isActive ? '#ffffff' : level.color,
//                          boxShadow: isActive ? `0 0 15px ${level.color}` : 'none'
//                        }}>
//                     <IconComponent className="w-4 h-4 md:w-5 lg:w-6 md:h-5 lg:h-6 text-white" />
                    
//                     {level.status === 'ACTIVE' && (
//                       <div className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-ping" />
//                     )}
//                   </div>

//                   {/* Level Label */}
//                   <div className="absolute top-full mt-1 md:mt-2 left-1/2 transform -translate-x-1/2 text-center min-w-max">
//                     <div className="text-xs md:text-sm font-bold" style={{ color: level.color }}>
//                       LVL {level.level}
//                     </div>
//                     <div className="text-xs text-gray-400 hidden md:block">{level.planet}</div>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Rocket Animation */}
//             <div 
//               className="absolute transition-all duration-100 ease-linear"
//               style={{ 
//                 left: `${10 + (currentLevel * 20) + (rocketPosition * 0.15)}%`, 
//                 top: `${75 - (currentLevel * 12) - 8}%`,
//                 transform: 'translate(-50%, -50%)'
//               }}
//             >
//               <div className="text-lg md:text-2xl animate-bounce">
//                 🚀
//               </div>
//             </div>
//           </div>

//           {/* Level Details Panel */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//             {/* Left: Current Level Info */}
//             <div className={`bg-gradient-to-br ${levels[currentLevel].bgColor} p-4 md:p-6 rounded-xl border border-white/20`}>
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 md:w-12 md:h-12 bg-black/30 rounded-lg flex items-center justify-center">
//                   {React.createElement(levels[currentLevel].icon, { className: "w-5 h-5 md:w-6 md:h-6 text-white" })}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <h3 className="text-lg md:text-xl font-black text-white truncate">{levels[currentLevel].title}</h3>
//                   <p className="text-white/80 text-sm md:text-base">{levels[currentLevel].subtitle}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
//                 <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
//                   <div className="text-sm md:text-lg font-bold text-white">{levels[currentLevel].tokens}</div>
//                   <div className="text-xs text-white/70">SUPPLY</div>
//                 </div>
//                 <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
//                   <div className="text-xs md:text-sm font-bold text-white">{levels[currentLevel].price}</div>
//                   <div className="text-xs text-white/70">PRICE</div>
//                 </div>
//                 <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
//                   <div className="text-xs md:text-sm font-bold text-white">{levels[currentLevel].marketCap}</div>
//                   <div className="text-xs text-white/70">MCAP</div>
//                 </div>
//               </div>

//               {/* XP Progress */}
//               <div className="mb-4">
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-white/80">XP PROGRESS</span>
//                   <span className="text-white font-bold">{levels[currentLevel].progress}%</span>
//                 </div>
//                 <div className="w-full bg-black/30 rounded-full h-2">
//                   <div 
//                     className="h-2 bg-white rounded-full transition-all duration-1000"
//                     style={{ width: `${levels[currentLevel].progress}%` }}
//                   />
//                 </div>
//               </div>

//               {levels[currentLevel].status === 'ACTIVE' && (
//                 <button className="w-full bg-black/50 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-lg hover:bg-black/70 transition-colors border border-white/20">
//                   ENGAGE PROTOCOL
//                 </button>
//               )}
//             </div>

//             {/* Right: Unlocks & Stats */}
//             <div className="space-y-4">
//               {/* Unlocks */}
//               <div className="bg-black/50 backdrop-blur border border-gray-800 rounded-xl p-4">
//                 <h4 className="text-white font-bold mb-3 flex items-center text-sm md:text-base">
//                   <Target className="w-4 h-4 mr-2 text-green-400" />
//                   MISSION REWARDS
//                 </h4>
//                 <div className="space-y-2">
//                   {levels[currentLevel].unlocks.map((unlock, idx) => (
//                     <div key={idx} className="flex items-center space-x-3 text-xs md:text-sm">
//                       <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
//                       <span className="text-gray-300">{unlock}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trading Stats */}
//               <div className="bg-black/50 backdrop-blur border border-gray-800 rounded-xl p-4">
//                 <h4 className="text-white font-bold mb-3 flex items-center text-sm md:text-base">
//                   <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
//                   PROTOCOL STATS
//                 </h4>
//                 <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
//                   <div>
//                     <div className="text-gray-400">HOLDERS</div>
//                     <div className="text-white font-bold">1,247</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-400">24H VOL</div>
//                     <div className="text-green-400 font-bold">+247%</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-400">LIQUIDITY</div>
//                     <div className="text-white font-bold">$2.4M</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-400">APY</div>
//                     <div className="text-yellow-400 font-bold">420%</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpaceTradingRoadmap;




  // import React, { useState, useEffect } from 'react';
  // import { Rocket, Star, Diamond, Crown, Trophy, TrendingUp, Zap, Target, ArrowUp } from 'lucide-react';

  // const SpaceTradingRoadmap = () => {
  //   const [currentLevel, setCurrentLevel] = useState(0);
  //   const [rocketPosition, setRocketPosition] = useState(0);
  //   const [showStats, setShowStats] = useState(false);

  //   const levels = [
  //     {
  //       level: 1,
  //       title: "LAUNCH PAD",
  //       subtitle: "Genesis Protocol",
  //       tokens: "10B",
  //       fullTokens: "10 Billion Tokens",
  //       price: "₹0.01-0.04",
  //       priceUSD: "$0.00012-0.00046",
  //       marketCap: "$1.2M-4.6M",
  //       xp: 1000,
  //       status: "ACTIVE",
  //       color: "#14B8A6",
  //       bgColor: "from-teal-500 to-green-600",
  //       icon: Rocket,
  //       planet: "Earth",
  //       description: "Launch phase with exclusive early-bird benefits",
  //       unlocks: ["Early Adopter Badge", "2x Rewards Multiplier"],
  //       progress: 85,
  //       button: "Buy Now"
  //     },
  //     {
  //       level: 2,
  //       title: "ORBIT STATION",
  //       subtitle: "Community Expansion", 
  //       tokens: "20B",
  //       fullTokens: "20 Billion Tokens",
  //       price: "₹0.05-0.50",
  //       priceUSD: "$0.00061-0.0061",
  //       marketCap: "$12M-122M",
  //       xp: 2500,
  //       status: "LOCKED",
  //       color: "#14B8A6",
  //       bgColor: "from-teal-400 to-teal-600",
  //       icon: Star,
  //       planet: "Moon",
  //       description: "Enhanced rewards and premium token allocation",
  //       unlocks: ["Staking Rewards", "DAO Voting Rights"],
  //       progress: 0,
  //       button: "Coming Soon"
  //     },
  //     {
  //       level: 3,
  //       title: "ASTEROID BELT",
  //       subtitle: "DeFi Mining",
  //       tokens: "25B", 
  //       fullTokens: "25 Billion Tokens",
  //       price: "₹0.60-1.53",
  //       priceUSD: "$0.0071-0.018",
  //       marketCap: "$177M-450M",
  //       xp: 5000,
  //       status: "LOCKED",
  //       color: "#10B981",
  //       bgColor: "from-green-400 to-green-600",
  //       icon: Diamond,
  //       planet: "Mars",
  //       description: "Diamond tier with exclusive staking benefits",
  //       unlocks: ["Yield Farming", "NFT Marketplace"],
  //       progress: 0,
  //       button: "Coming Soon"
  //     },
  //     {
  //       level: 4,
  //       title: "DEEP SPACE",
  //       subtitle: "Galactic Network",
  //       tokens: "30B",
  //       fullTokens: "30 Billion Tokens",
  //       price: "₹1.60-3.00",
  //       priceUSD: "$0.019-0.036",
  //       marketCap: "$570M-1.08B",
  //       xp: 10000,
  //       status: "LOCKED",
  //       color: "#14B8A6",
  //       bgColor: "from-teal-500 to-green-500",
  //       icon: Crown,
  //       planet: "Jupiter",
  //       description: "Premium phase with governance token access",
  //       unlocks: ["Cross-Chain Bridge", "Governance Token"],
  //       progress: 0,
  //       button: "Coming Soon"
  //     },
  //     {
  //       level: 5,
  //       title: "GALAXY CORE",
  //       subtitle: "Universal Adoption",
  //       tokens: "25B",
  //       fullTokens: "25 Billion Tokens",
  //       price: "₹3.15-4.10",
  //       priceUSD: "$0.037-0.049",
  //       marketCap: "$925M-1.22B",
  //       xp: 25000,
  //       status: "LOCKED",
  //       color: "#10B981",
  //       bgColor: "from-green-500 to-teal-600",
  //       icon: Trophy,
  //       planet: "Alpha Centauri",
  //       description: "Ultimate tier with maximum rewards potential",
  //       unlocks: ["Mass Adoption", "Legacy Status"],
  //       progress: 0,
  //       button: "Coming Soon"
  //     }
  //   ];

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setRocketPosition(prev => (prev + 0.5) % 100);
  //     }, 50);
  //     return () => clearInterval(interval);
  //   }, []);

  //   useEffect(() => {
  //     setShowStats(true);
  //   }, []);

  //   const totalXP = levels.reduce((sum, level) => sum + level.xp, 0);
  //   const currentXP = levels.slice(0, currentLevel + 1).reduce((sum, level) => sum + level.xp, 0);

  //   return (
  //     <div className="min-h-screen bg-black text-white relative overflow-hidden">
  //       {/* Space Background */}
  //       <div className="absolute inset-0">
  //         {/* Stars */}
          
          
  //         {/* Nebula Effect */}
  //         <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
  //         <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full opacity-15 blur-3xl"></div>
  //       </div>

  //       {/* HUD Header */}
  //       <div className="relative z-10 p-4 md:p-6">
  //         <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
  //           <div>
  //             <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
  //               SPACE TRADING PROTOCOL
  //             </h1>
  //             <div className="text-green-400 font-mono text-xs md:text-sm mt-1">
  //               MISSION STATUS: ACTIVE • LEVEL {currentLevel + 1}/5
  //             </div>
  //           </div>
            
  //           <div className="bg-black/50 backdrop-blur border border-green-400/30 rounded-lg p-3 md:p-4 font-mono">
  //             <div className="text-xs text-gray-400">TOTAL XP</div>
  //             <div className="text-lg md:text-xl font-bold text-green-400">{currentXP.toLocaleString()}</div>
  //             <div className="text-xs text-gray-400">/{totalXP.toLocaleString()}</div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Main Trading Chart Area */}
  //       <div className="relative z-10 px-4 md:px-6 pb-4 md:pb-6">
  //         <div className="bg-black/30 backdrop-blur border border-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6">
            
  //           {/* Chart Header */}
  //           <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 space-y-2 md:space-y-0">
  //             <div className="flex items-center space-x-4">
  //               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
  //               <span className="font-mono text-green-400 text-sm md:text-base">PHASE PROGRESSION CHART</span>
  //             </div>
  //             <div className="text-xs font-mono text-gray-400">
  //               <span className="hidden md:inline">TIME FRAME: 12 MONTHS • CHART TYPE: EXPONENTIAL</span>
  //               <span className="md:hidden">12M • EXPONENTIAL</span>
  //             </div>
  //           </div>

  //           {/* Chart Grid */}
  //           <div className="relative h-64 md:h-80 lg:h-96 mb-6 md:mb-8 overflow-hidden">
  //             {/* Grid Lines */}
  //             <div className="absolute inset-0">
  //               {[...Array(6)].map((_, i) => (
  //                 <div key={i} className="absolute w-full border-t border-gray-800/50" style={{ top: `${i * 20}%` }} />
  //               ))}
  //               {[...Array(6)].map((_, i) => (
  //                 <div key={i} className="absolute h-full border-l border-gray-800/50" style={{ left: `${i * 20}%` }} />
  //               ))}
  //             </div>

  //             {/* Price Chart Line */}
  //             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
  //               <defs>
  //                 <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
  //                   <stop offset="0%" stopColor="#00ff88" />
  //                   <stop offset="25%" stopColor="#0099ff" />
  //                   <stop offset="50%" stopColor="#9933ff" />
  //                   <stop offset="75%" stopColor="#ff9900" />
  //                   <stop offset="100%" stopColor="#ff3366" />
  //                 </linearGradient>
  //                 <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
  //                   <stop offset="0%" stopColor="url(#chartGradient)" stopOpacity="0.3" />
  //                   <stop offset="100%" stopColor="url(#chartGradient)" stopOpacity="0" />
  //                 </linearGradient>
  //               </defs>
                
  //               {/* Chart Path - Responsive */}
  //               <path
  //                 d="M 0 85 Q 20 75 40 65 Q 60 50 80 35 Q 90 20 100 10"
  //                 fill="none"
  //                 stroke="url(#chartGradient)"
  //                 strokeWidth="0.5"
  //                 vectorEffect="non-scaling-stroke"
  //                 className="drop-shadow-lg"
  //               />
  //               <path
  //                 d="M 0 85 Q 20 75 40 65 Q 60 50 80 35 Q 90 20 100 10 L 100 100 L 0 100 Z"
  //                 fill="url(#chartFill)"
  //               />
  //             </svg>

  //             {/* Level Markers */}
  //             {levels.map((level, index) => {
  //               const x = (index * 20) + 10;
  //               const y = 75 - (index * 12);
  //               const isActive = index === currentLevel;
  //               const isCompleted = index < currentLevel;
  //               const IconComponent = level.icon;
                
  //               return (
  //                 <div
  //                   key={index}
  //                   className={`absolute cursor-pointer transition-all duration-300 ${
  //                     isActive ? 'scale-110 md:scale-125 z-20' : 'hover:scale-105 md:hover:scale-110 z-10'
  //                   }`}
  //                   style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
  //                   onClick={() => setCurrentLevel(index)}
  //                 >
  //                   {/* Level Node */}
  //                   <div className={`relative w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300`}
  //                       style={{
  //                         backgroundColor: level.status === 'ACTIVE' ? level.color : (isCompleted ? level.color : '#374151'),
  //                         borderColor: isActive ? '#ffffff' : level.color,
  //                         boxShadow: isActive ? `0 0 15px ${level.color}` : 'none'
  //                       }}>
  //                     <IconComponent className="w-4 h-4 md:w-5 lg:w-6 md:h-5 lg:h-6 text-white" />
                      
  //                     {level.status === 'ACTIVE' && (
  //                       <div className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-ping" />
  //                     )}
  //                   </div>

  //                   {/* Level Label */}
  //                   <div className="absolute top-full mt-1 md:mt-2 left-1/2 transform -translate-x-1/2 text-center min-w-max">
  //                     <div className="text-xs md:text-sm font-bold" style={{ color: level.color }}>
  //                       LVL {level.level}
  //                     </div>
  //                     <div className="text-xs text-gray-400 hidden md:block">{level.planet}</div>
  //                   </div>
  //                 </div>
  //               );
  //             })}

  //             {/* Rocket Animation */}
  //             <div 
  //               className="absolute transition-all duration-100 ease-linear"
  //               style={{ 
  //                 left: `${10 + (currentLevel * 20) + (rocketPosition * 0.15)}%`, 
  //                 top: `${75 - (currentLevel * 12) - 8}%`,
  //                 transform: 'translate(-50%, -50%)'
  //               }}
  //             >
  //               <div className="text-lg md:text-2xl animate-bounce">
  //                 🚀
  //               </div>
  //             </div>
  //           </div>

  //           {/* Level Details Panel */}
  //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
  //             {/* Left: Current Level Info */}
  //             <div className={`bg-gradient-to-br ${levels[currentLevel].bgColor} p-4 md:p-6 rounded-xl border border-white/20`}>
  //               <div className="flex items-center space-x-3 mb-4">
  //                 <div className="w-10 h-10 md:w-12 md:h-12 bg-black/30 rounded-lg flex items-center justify-center">
  //                   {React.createElement(levels[currentLevel].icon, { className: "w-5 h-5 md:w-6 md:h-6 text-white" })}
  //                 </div>
  //                 <div className="min-w-0 flex-1">
  //                   <h3 className="text-lg md:text-xl font-black text-white truncate">{levels[currentLevel].title}</h3>
  //                   <p className="text-white/80 text-sm md:text-base">{levels[currentLevel].subtitle}</p>
  //                 </div>
  //               </div>

  //               <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
  //                 <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
  //                   <div className="text-sm md:text-lg font-bold text-white">{levels[currentLevel].tokens}</div>
  //                   <div className="text-xs text-white/70">SUPPLY</div>
  //                 </div>
  //                 <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
  //                   <div className="text-xs md:text-sm font-bold text-white">{levels[currentLevel].price}</div>
  //                   <div className="text-xs text-white/70">PRICE</div>
  //                 </div>
  //                 <div className="bg-black/30 rounded-lg p-2 md:p-3 text-center">
  //                   <div className="text-xs md:text-sm font-bold text-white">{levels[currentLevel].marketCap}</div>
  //                   <div className="text-xs text-white/70">MCAP</div>
  //                 </div>
  //               </div>

  //               {/* XP Progress */}
  //               <div className="mb-4">
  //                 <div className="flex justify-between text-sm mb-1">
  //                   <span className="text-white/80">XP PROGRESS</span>
  //                   <span className="text-white font-bold">{levels[currentLevel].progress}%</span>
  //                 </div>
  //                 <div className="w-full bg-black/30 rounded-full h-2">
  //                   <div 
  //                     className="h-2 bg-white rounded-full transition-all duration-1000"
  //                     style={{ width: `${levels[currentLevel].progress}%` }}
  //                   />
  //                 </div>
  //               </div>

  //               {levels[currentLevel].status === 'ACTIVE' && (
  //                 <button className="w-full bg-black/50 text-white font-bold py-2 md:py-3 text-sm md:text-base rounded-lg hover:bg-black/70 transition-colors border border-white/20">
  //                   ENGAGE PROTOCOL
  //                 </button>
  //               )}
  //             </div>

  //             {/* Right: Unlocks & Stats */}
  //             <div className="space-y-4">
  //               {/* Unlocks */}
  //               <div className="bg-black/50 backdrop-blur border border-gray-800 rounded-xl p-4">
  //                 <h4 className="text-white font-bold mb-3 flex items-center text-sm md:text-base">
  //                   <Target className="w-4 h-4 mr-2 text-green-400" />
  //                   MISSION REWARDS
  //                 </h4>
  //                 <div className="space-y-2">
  //                   {levels[currentLevel].unlocks.map((unlock, idx) => (
  //                     <div key={idx} className="flex items-center space-x-3 text-xs md:text-sm">
  //                       <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
  //                       <span className="text-gray-300">{unlock}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>

  //               {/* Trading Stats */}
  //               <div className="bg-black/50 backdrop-blur border border-gray-800 rounded-xl p-4">
  //                 <h4 className="text-white font-bold mb-3 flex items-center text-sm md:text-base">
  //                   <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
  //                   PROTOCOL STATS
  //                 </h4>
  //                 <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
  //                   <div>
  //                     <div className="text-gray-400">HOLDERS</div>
  //                     <div className="text-white font-bold">1,247</div>
  //                   </div>
  //                   <div>
  //                     <div className="text-gray-400">24H VOL</div>
  //                     <div className="text-green-400 font-bold">+247%</div>
  //                   </div>
  //                   <div>
  //                     <div className="text-gray-400">LIQUIDITY</div>
  //                     <div className="text-white font-bold">$2.4M</div>
  //                   </div>
  //                   <div>
  //                     <div className="text-gray-400">APY</div>
  //                     <div className="text-yellow-400 font-bold">420%</div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default SpaceTradingRoadmap;




// import React from 'react';
// import { Home, Gift, User, Zap, Settings, Award } from 'lucide-react';

// const TimelineItem = ({ date, icon: Icon, title, description, isLeft }) => (
//   <div className={`flex items-center w-full mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
//     {/* Content Box */}
//     <div className={`
//       relative px-8 py-6 bg-yellow-300 max-w-md
//       ${isLeft ? 'rounded-r-full' : 'rounded-l-full'}
//     `}>
//       <h2 className="text-lg font-normal text-teal-700 mb-3">{title}</h2>
//       <p className="text-base leading-relaxed text-black">{description}</p>
//     </div>
    
//     {/* Connecting Line */}
//     <div className="w-12 h-0.5 bg-teal"></div>
    
//     {/* Icon Circle */}
//     <div className="w-12 h-12 bg-yellow-300 border-2 border-teal-700 rounded-full flex items-center justify-center">
//       <Icon size={20} className="text-teal-700" />
//     </div>
    
//     {/* Timeline Dot */}
//     <div className="w-4 h-4 bg-white border-2 border-teal-700 rounded-full"></div>
    
//     {/* Date */}
//     <div className={`
//       ml-4 text-sm font-bold text-teal-700 uppercase tracking-wider
//       ${isLeft ? 'ml-4' : 'mr-4 order-first'}
//     `}>
//       {date}
//     </div>
//   </div>
// );

// const Timeline = () => {
//   const timelineData = [
//     {
//       date: '15 DEC',
//       icon: Home,
//       title: 'Lorem ipsum dolor sit amet',
//       description: 'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
//       isLeft: true
//     },
//     {
//       date: '22 OCT',
//       icon: Gift,
//       title: 'Lorem ipsum dolor sit amet',
//       description: 'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
//       isLeft: false
//     },
//     {
//       date: '10 JUL',
//       icon: User,
//       title: 'Lorem ipsum dolor sit amet',
//       description: 'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
//       isLeft: true
//     },
//     {
//       date: '18 MAY',
//       icon: Zap,
//       title: 'Lorem ipsum dolor sit amet',
//       description: 'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
//       isLeft: false
//     },
//     {
//       date: '10 FEB',
//       icon: Settings,
//       title: 'Lorem ipsum dolor sit amet',
//       description: 'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
//       isLeft: true
//     },
//     {
//       date: '01 JAN',
//       icon: Award,
//       title: 'Lorem ipsum dolor sit amet',
//       description: 'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
//       isLeft: false
//     }
//   ];

//   return (
//     <div className="min-h-screen  py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="relative">
//           {/* Central vertical line */}
//           <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-white h-full hidden md:block"></div>
          
//           {/* Timeline items - Desktop */}
//           <div className="hidden md:block">
//             {timelineData.map((item, index) => (
//               <div key={index} className="relative">
//                 <div className={`flex items-center ${item.isLeft ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
//                   <div className={`flex items-center ${item.isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
//                     {/* Content Box */}
//                     <div className={`
//                       px-8 py-6 bg-yellow-300 max-w-md
//                       ${item.isLeft ? 'rounded-l-full' : 'rounded-r-full'}
//                     `}>
//                       <h2 className="text-lg font-normal text-teal-700 mb-3">{item.title}</h2>
//                       <p className="text-base leading-relaxed text-black">{item.description}</p>
//                     </div>
                    
//                     {/* Connecting Line */}
//                     <div className="w-12 h-0.5 bg-white"></div>
                    
//                     {/* Icon Circle */}
//                     <div className="w-12 h-12 bg-yellow-300 border-2 border-white rounded-full flex items-center justify-center z-10">
//                       <item.icon size={20} className="text-teal-700" />
//                     </div>
                    
//                     {/* Timeline Dot */}
//                     <div className="w-4 h-4 bg-white border-2 border-twhite rounded-full z-10"></div>
                    
//                     {/* Date */}
//                     <div className={`
//                       px-4 text-sm font-bold text-teal-700 uppercase tracking-wider
//                     `}>
//                       {item.date}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Mobile version - all items on one side */}
//           <div className="md:hidden">
//             <div className="absolute left-6 w-0.5 bg-teal-700 h-full"></div>
//             {timelineData.map((item, index) => (
//               <div key={index} className="relative flex items-center mb-8 pl-12">
//                 {/* Date */}
//                 <div className="absolute left-0 text-sm font-bold text-teal-700 uppercase tracking-wider">
//                   {item.date}
//                 </div>
                
//                 {/* Timeline Dot */}
//                 <div className="absolute left-5 w-4 h-4 bg-white border-2 border-teal-700 rounded-full z-10"></div>
                
//                 {/* Icon Circle */}
//                 <div className="w-12 h-12 bg-yellow-300 border-2 border-teal-700 rounded-full flex items-center justify-center mr-3">
//                   <item.icon size={20} className="text-teal-700" />
//                 </div>
                
//                 {/* Content Box */}
//                 <div className="px-8 py-6 bg-yellow-300 rounded-r-full flex-1">
//                   <h2 className="text-lg font-normal text-teal-700 mb-3">{item.title}</h2>
//                   <p className="text-base leading-relaxed text-black">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;

// import React from 'react';

// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//     button: "Coming Soon",
//   },
// ];

// const TokenRoadmap = () => {
//   return (
//     <div className="min-h-screen p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 md:mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Token Sale <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{backgroundImage: 'linear-gradient(to right, #bbcf28, #1c994a)'}}>Roadmap</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300">Join our phased token launch journey</p>
//         </div>
        
//         <div className="relative max-w-5xl mx-auto">
//           {/* Central Timeline - Desktop centered, Mobile left */}
//           <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 z-0" style={{background: 'linear-gradient(to bottom, #bbcf28, #1c994a, #bbcf28)'}}></div>
          
//           {/* Timeline Phases */}
//           <div className="space-y-12 md:space-y-24">
//             {phaseData.map((phase, index) => (
//               <div key={index} className="relative">
                
//                 {/* Desktop Layout */}
//                 <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center md:min-h-[200px]">
//                   {/* Left Side - Even indices (0, 2, 4) */}
//                   {index % 2 === 0 ? (
//                     <div className="flex justify-end pr-4">
//                       <div className="w-90 relative">
//                         <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                           phase.status === 'Live' ? 'ring-2' : ''
//                         }`} style={{
//                           ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                         }}>
//                           {/* Status Badge */}
//                           <div className="absolute -top-3 right-6">
//                             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-lg' 
//                                 : 'bg-yellow-600 text-white'
//                             }`} style={{
//                               backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                             }}>
//                               {phase.status}
//                             </span>
//                           </div>
                          
//                           {/* Phase Content */}
//                           <div className="mt-4">
//                             <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                            
//                             <div className="space-y-3 mb-6">
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                                 <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                               </div>
                              
//                               <div className="text-gray-300 text-sm leading-relaxed">
//                                 {phase.price}
//                               </div>
//                             </div>
                            
//                             <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-lg'
//                                 : 'bg-yellow hover:bg-yellow text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line from right edge of left card */}
//                           <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                             background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Right Side - Odd indices (1, 3) */}
//                   {index % 2 === 1 ? (
//                     <div className="flex justify-start pl-4">
//                       <div className="w-90 relative">
//                         <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                           phase.status === 'Live' ? 'ring-2' : ''
//                         }`} >
//                           {/* Status Badge */}
//                           <div className="absolute -top-3 left-6">
//                             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-lg' 
//                                 : 'bg-gray-600 text-gray-200'
//                             }`} style={{
//                               backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                             }}>
//                               {phase.status}
//                             </span>
//                           </div>
                          
//                           {/* Phase Content */}
//                           <div className="mt-4">
//                             <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                            
//                             <div className="space-y-3 mb-6">
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                                 <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                               </div>
                              
//                               <div className="text-gray-300 text-sm leading-relaxed">
//                                 {phase.price}
//                               </div>
//                             </div>
                            
//                             <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-lg'
//                                 : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line from left edge of right card */}
//                           <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                             background: 'linear-gradient(to left, #bbcf28, #1c994a)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Timeline Node - Always centered on desktop */}
//                   <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                     <div className={`w-6 h-6 rounded-full border-4 ${
//                       phase.status === 'Live' 
//                         ? 'border-4 shadow-lg' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(188, 207, 40, 0.5)' : 'none'
//                     }}>
//                       <div className={`absolute inset-0 rounded-full ${
//                         phase.status === 'Live' ? 'animate-ping' : ''
//                       }`} style={{backgroundColor: phase.status === 'Live' ? '#bbcf28' : 'transparent'}}></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Layout */}
//                 <div className="md:hidden flex items-start space-x-4">
//                   {/* Timeline Node - Left side on mobile */}
//                   <div className="flex-shrink-0 mt-8">
//                     <div className={`w-6 h-6 rounded-full border-4 ${
//                       phase.status === 'Live' 
//                         ? 'border-4 shadow-lg' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(188, 207, 40, 0.5)' : 'none'
//                     }}>
//                       <div className={`absolute inset-0 rounded-full ${
//                         phase.status === 'Live' ? '' : ''
//                       }`} ></div>
//                     </div>
//                   </div>

//                   {/* Connecting Line - Mobile */}
//                   <div className="flex-shrink-0 mt-11 w-6 h-0.5" style={{
//                     background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                   }}></div>

//                   {/* Card - All cards on right side on mobile */}
//                   <div className="flex-1">
//                     <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl ${
//                       phase.status === 'Live' ? 'ring-2' : ''
//                     }`} >
//                       {/* Status Badge */}
//                       <div className="absolute -top-3 left-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           phase.status === 'Live' 
//                             ? 'text-white shadow-lg' 
//                             : 'bg-gray-600 text-gray-200'
//                         }`} style={{
//                           backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                           boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                         }}>
//                           {phase.status}
//                         </span>
//                       </div>
                      
//                       {/* Phase Content */}
//                       <div className="mt-4">
//                         <h3 className="text-xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                        
//                         <div className="space-y-3 mb-6">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                             <span className="font-medium text-sm" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                           </div>
                          
//                           <div className="text-gray-300 text-xs leading-relaxed">
//                             {phase.price}
//                           </div>
//                         </div>
                        
//                         <button className={`w-full py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 ${
//                           phase.status === 'Live'
//                             ? 'text-white shadow-lg'
//                             : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                         }`} style={{
//                           background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                           boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                         }}>
//                           {phase.button}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>      
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;

// import React from 'react';

// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//     roadmapText: "Lunching mobile application Dapp Integration Own Crypto Wallet Development"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//     button: "Coming Soon",
//     roadmapText: "Crypto coins to buy Jmax coin, Multi coin integration, P2P deposits (or) Live, Defi + NFT development"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
//     button: "Coming Soon",
//     roadmapText: "Own Blockchain development, Pancake, Swap, Uniswap, Integration"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//     button: "Coming Soon",
//     roadmapText: "Jaimax exchange lunching, Trading live now, Stuting pairs, 25 Crypto coins, Crypto deposits & Withdraw, Live Jaimax own payment gateway development"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//     button: "Coming Soon",
//     roadmapText: "Global Exchange Listings and Continues..."
//   },
// ];

// const TokenRoadmap = () => {
//   return (
//     <div className="min-h-screen p-8" >
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8 md:mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Token Sale <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{backgroundImage: 'linear-gradient(to right, #bbcf28, #1c994a)'}}>Roadmap</span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300">Join our phased token launch journey</p>
//         </div>
        
//         <div className="relative max-w-5xl mx-auto">
//           {/* Central Timeline - Desktop centered, Mobile left */}
//           <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 z-0" style={{background: 'linear-gradient(to bottom, #bbcf28, #1c994a, #bbcf28)'}}></div>
          
//           {/* Timeline Phases */}
//           <div className="space-y-12 md:space-y-24">
//             {phaseData.map((phase, index) => (
//               <div key={index} className="relative">
                
//                 {/* Desktop Layout */}
//                 <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center md:min-h-[200px]">
//                   {/* Left Side - Even indices (0, 2, 4) */}
//                   {index % 2 === 0 ? (
//                     <div className="flex justify-end pr-4">
//                       <div className="w-90 relative">
//                         <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                           phase.status === 'Live' ? 'ring-2' : ''
//                         }`} style={{
//                           ringColor: phase.status === 'Live' ? 'rgba(188, 207, 40, 0.5)' : 'transparent'
//                         }}>
//                           {/* Status Badge */}
//                           <div className="absolute -top-3 right-6">
//                             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-lg' 
//                                 : 'bg-yellow-600 text-white'
//                             }`} style={{
//                               backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                             }}>
//                               {phase.status}
//                             </span>
//                           </div>
                          
//                           {/* Phase Content */}
//                           <div className="mt-4">
//                             <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                            
//                             <div className="space-y-3 mb-4">
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                                 <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                               </div>
                              
//                               <div className="text-gray-300 text-sm leading-relaxed">
//                                 {phase.price}
//                               </div>
//                             </div>

//                             {/* Roadmap Text */}
//                             <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
//                               <p className="text-gray-200 text-sm leading-relaxed">
//                                 {phase.roadmapText}
//                               </p>
//                             </div>
                            
//                             <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-lg'
//                                 : 'bg-yellow hover:bg-yellow text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line from right edge of left card */}
//                           <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                             background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Right Side - Odd indices (1, 3) */}
//                   {index % 2 === 1 ? (
//                     <div className="flex justify-start pl-4">
//                       <div className="w-90 relative">
//                         <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
//                           phase.status === 'Live' ? 'ring-2' : ''
//                         }`} >
//                           {/* Status Badge */}
//                           <div className="absolute -top-3 left-6">
//                             <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                               phase.status === 'Live' 
//                                 ? 'text-white shadow-lg' 
//                                 : 'bg-gray-600 text-gray-200'
//                             }`} style={{
//                               backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                             }}>
//                               {phase.status}
//                             </span>
//                           </div>
                          
//                           {/* Phase Content */}
//                           <div className="mt-4">
//                             <h3 className="text-2xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                            
//                             <div className="space-y-3 mb-4">
//                               <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                                 <span className="font-medium" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                               </div>
                              
//                               <div className="text-gray-300 text-sm leading-relaxed">
//                                 {phase.price}
//                               </div>
//                             </div>

//                             {/* Roadmap Text */}
//                             <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
//                               <p className="text-gray-200 text-sm leading-relaxed">
//                                 {phase.roadmapText}
//                               </p>
//                             </div>
                            
//                             <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
//                               phase.status === 'Live'
//                                 ? 'text-white shadow-lg'
//                                 : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                             }`} style={{
//                               background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                               boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                             }}>
//                               {phase.button}
//                             </button>
//                           </div>
                          
//                           {/* Connecting Line from left edge of right card */}
//                           <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-8 h-0.5 z-10" style={{
//                             background: 'linear-gradient(to left, #bbcf28, #1c994a)'
//                           }}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div></div>
//                   )}
                  
//                   {/* Timeline Node - Always centered on desktop */}
//                   <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                     <div className={`w-6 h-6 rounded-full border-4 ${
//                       phase.status === 'Live' 
//                         ? 'border-4 shadow-lg' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(188, 207, 40, 0.5)' : 'none'
//                     }}>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Layout */}
//                 <div className="md:hidden flex items-start space-x-4">
//                   {/* Timeline Node - Left side on mobile */}
//                   <div className="flex-shrink-0 mt-8">
//                     <div className={`w-6 h-6 rounded-full border-4 ${
//                       phase.status === 'Live' 
//                         ? 'border-4 shadow-lg' 
//                         : 'bg-gray-600 border-gray-500'
//                     }`} style={{
//                       backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
//                       borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
//                       boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(188, 207, 40, 0.5)' : 'none'
//                     }}>
//                     </div>
//                   </div>

//                   {/* Connecting Line - Mobile */}
//                   <div className="flex-shrink-0 mt-11 w-6 h-0.5" style={{
//                     background: 'linear-gradient(to right, #bbcf28, #1c994a)'
//                   }}></div>

//                   {/* Card - All cards on right side on mobile */}
//                   <div className="flex-1">
//                     <div className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl ${
//                       phase.status === 'Live' ? 'ring-2' : ''
//                     }`} >
//                       {/* Status Badge */}
//                       <div className="absolute -top-3 left-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           phase.status === 'Live' 
//                             ? 'text-white shadow-lg' 
//                             : 'bg-gray-600 text-gray-200'
//                         }`} style={{
//                           backgroundColor: phase.status === 'Live' ? '#1c994a' : '#1c994a',
//                           boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.5)' : 'none'
//                         }}>
//                           {phase.status}
//                         </span>
//                       </div>
                      
//                       {/* Phase Content */}
//                       <div className="mt-4">
//                         <h3 className="text-xl font-bold text-white mb-3">{phase.phaseNo}</h3>
                        
//                         <div className="space-y-3 mb-4">
//                           <div className="flex items-center space-x-2">
//                             <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#bbcf28'}}></div>
//                             <span className="font-medium text-sm" style={{color: '#bbcf28'}}>{phase.tokens}</span>
//                           </div>
                          
//                           <div className="text-gray-300 text-xs leading-relaxed">
//                             {phase.price}
//                           </div>
//                         </div>

//                         {/* Roadmap Text */}
//                         <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
//                           <p className="text-gray-200 text-xs leading-relaxed">
//                             {phase.roadmapText}
//                           </p>
//                         </div>
                        
//                         <button className={`w-full py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 ${
//                           phase.status === 'Live'
//                             ? 'text-white shadow-lg'
//                             : 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
//                         }`} style={{
//                           background: 'linear-gradient(to right, #1c994a, #bbcf28)' ,
//                           boxShadow: phase.status === 'Live' ? '0 10px 25px rgba(28, 153, 74, 0.25)' : 'none'
//                         }}>
//                           {phase.button}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>      
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;


// import React from 'react';

// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//     roadmapText: "Launching mobile application, Dapp Integration, Own Crypto Wallet Development"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//     button: "Coming Soon",
//     roadmapText: "Crypto coins to buy Jmax coin, Multi coin integration, P2P deposits or Live, DeFi + NFT development"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 Paisa (0.0071 - 0.018 USD)",
//     button: "Coming Soon",
//     roadmapText: "Own Blockchain development, Pancake, Swap, Uniswap Integration"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//     button: "Coming Soon",
//     roadmapText: "Jaimax Exchange Launching, Trading Live, Staking Pairs, 25 Crypto Coins, Deposits & Withdrawals, Payment Gateway"
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//     button: "Coming Soon",
//     roadmapText: "Global Exchange Listings and More..."
//   },
// ];

// const TokenRoadmap = () => {
//   return (
//     <div className="min-h-screen p-6 sm:p-8  text-white">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
//             Token Sale <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-green-500">Roadmap</span>
//           </h1>
//           {/* <p className="text-teal-200 text-base sm:text-lg">Join our phased token launch journey</p> */}
//         </div>

//         <div className="relative max-w-5xl mx-auto">
//           <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-1 z-0" style={{ background: 'linear-gradient(to bottom, #5eead4, #14b8a6)' }}></div>

//           <div className="space-y-16 md:space-y-24">
//             {phaseData.map((phase, index) => {
//               const isLive = phase.status === "Live";

//               const cardClass = `
//                 relative rounded-2xl p-6 border transition-all duration-300
//                 ${isLive
//                   ? "bg-gradient-to-br from-green-900 via-green-700 to-lime-600 ring-2 ring-lime-400/50 shadow-2xl hover:scale-[1.03]"
//                   : "bg-gradient-to-br from-green to-lime-600 border-green-700 text-teal-100 shadow-lg opacity-90 hover:scale-100"}
//               `;

//               const buttonClass = `
//                 w-full py-3 px-6 rounded-full font-semibold text-sm sm:text-base transition-all duration-300
//                 ${isLive
//                   ? "bg-gradient-to-r from-green-500 to-lime-400 text-white hover:scale-105 shadow-md"
//                   : "bg-gradient-to-r from-green-500 to-lime-400 text-teal-200 cursor-not-allowed"}
//               `;

//               const badgeClass = `
//                 px-4 py-1 rounded-full text-sm font-semibold shadow-sm
//                 ${isLive ? "bg-green-500 text-white animate-pulse" : "bg-teal-600 text-white"}
//               `;

//               return (
//                 <div key={index} className="relative">
//                   {/* Desktop layout */}
//                   <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-8">
//                     {index % 2 === 0 ? (
//                       <div className="flex justify-end pr-4">
//                         <div className={cardClass}>
//                           <div className="absolute -top-3 right-6">
//                             <span className={badgeClass}>{phase.status}</span>
//                           </div>
//                           <h3 className="text-2xl font-bold mb-3">{phase.phaseNo}</h3>
//                           <div className="mb-4 space-y-2">
//                             <div className="flex items-center gap-2 text-lime-300">
//                               <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
//                               <span>{phase.tokens}</span>
//                             </div>
//                             <p className="text-sm text-white">{phase.price}</p>
//                           </div>
//                           <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
//                             <p className="text-sm text-teal-100">{phase.roadmapText}</p>
//                           </div>
//                           <button className={buttonClass} disabled={!isLive}>{phase.button}</button>
//                           <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-teal-300 to-green-500 z-10"></div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div></div>
//                     )}

//                     {index % 2 === 1 ? (
//                       <div className="flex justify-start pl-4">
//                         <div className={cardClass}>
//                           <div className="absolute -top-3 left-6">
//                             <span className={badgeClass}>{phase.status}</span>
//                           </div>
//                           <h3 className="text-2xl font-bold mb-3">{phase.phaseNo}</h3>
//                           <div className="mb-4 space-y-2">
//                             <div className="flex items-center gap-2 text-lime-300">
//                               <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
//                               <span>{phase.tokens}</span>
//                             </div>
//                             <p className="text-sm text-white">{phase.price}</p>
//                           </div>
//                           <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
//                             <p className="text-sm text-teal-100">{phase.roadmapText}</p>
//                           </div>
//                           <button className={buttonClass} disabled={!isLive}>{phase.button}</button>
//                           <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-8 h-0.5 bg-gradient-to-l from-teal-300 to-green-500 z-10"></div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div></div>
//                     )}

//                     {/* Timeline node */}
//                     <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
//                       <div className={`w-6 h-6 rounded-full border-4 ${isLive ? "bg-lime-300 border-green-500 shadow-xl" : "bg-teal-400 border-teal-300"}`}></div>
//                     </div>
//                   </div>

//                   {/* Mobile layout */}
//                   <div className="md:hidden flex items-start gap-1">
//                     <div className="mt-8">
//                       <div className={`relative left-1/2 w-6 h-6 rounded-full border-4 ${isLive ? "bg-lime-300 border-green-500 shadow-xl" : "bg-gradient-to-br from-teal-900 via-green-700 to-teal-600 border-teal-300"}`}></div>
//                     </div>
//                     <div className="mt-11 w-6 h-0.5 bg-gradient-to-r from-teal-300 to-green-500"></div>
//                     <div className="flex-1">
//                       <div className={`${cardClass} p-5`}>
//                         <div className="absolute -top-3 left-4">
//                           <span className={`text-xs ${badgeClass}`}>{phase.status}</span>
//                         </div>
//                         <h3 className="text-lg font-bold mb-3">{phase.phaseNo}</h3>
//                         <div className="mb-3 space-y-2">
//                           <div className="flex items-center gap-2 text-lime-300 text-sm">
//                             <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
//                             <span>{phase.tokens}</span>
//                           </div>
//                           <p className="text-xs text-white">{phase.price}</p>
//                         </div>
//                         <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
//                           <p className="text-xs text-teal-100">{phase.roadmapText}</p>
//                         </div>
//                         <button className={buttonClass} disabled={!isLive}>{phase.button}</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TokenRoadmap;




// import React from "react";

// export default function TimelinePrimaryColor() {
//   const timelineData = [
//     {
//       date: "P1 2024",
//       title: "CONCEPT DEVELOPMENT AND TEAM FORMATION",
//       content: "Establish the foundational concept of JAIMAX TOKEN. Assemble a dedicated team of blockchain experts, developers, marketers, and legal advisors."
//     },
//     {
//       date: "P2 2024", 
//       title: "SMART CONTRACT DEVELOPMENT AND SECURITY AUDITS",
//       content: "Develop and deploy JAIMAX TOKEN smart contracts on the Binance Smart Chain (BSC). Conduct thorough security audits to ensure the robustness and security of the smart contracts."
//     },
//     {
//       date: "P3 2024",
//       title: "WEBSITE LAUNCH AND WHITEPAPER PUBLICATION", 
//       content: "Launch the official JAIMAX TOKEN website. Publish the comprehensive white paper detailing the vision, technical architecture, and roadmap of JAIMAX TOKEN."
//     },
//     {
//       date: "P4 2024",
//       title: "PRE-SALE AND PUBLIC ICO LAUNCH",
//       content: "Conduct the pre-sale and public Initial Coin Offering (ICO) of JAIMAX TOKEN. Initiate marketing campaigns to attract potential investors and build community engagement."
//     },
//     {
//       date: "P5 2024",
//       title: "MOBILE APP LAUNCH",
//       content: "Launch JAIMAX TOKEN mobile apps for both Android and iOS platforms. Ensure the apps support seamless and secure transactions within the JAIMAX ecosystem."
//     },
//     {
//       date: "P1 2025",
//       title: "MAINNET LAUNCH AND DAPP INTEGRATIONS",
//       content: "Launch the JAIMAX TOKEN mainnet. Integrate JAIMAX TOKEN with various decentralized applications (Dapps) to enhance its utility and adoption."
//     },
//     {
//       date: "P2 2025",
//       title: "EXPANSION OF USE CASES AND ECOSYSTEM DEVELOPMENT",
//       content: "Expand JAIMAX TOKEN's use cases across different sectors, including DeFi, NFTS, and payments. Faster ecosystem development through collaborations and innovations."
//     },
//     {
//       date: "P3 2025",
//       title: "EXCHANGE LISTINGS & STRATEGIC PARTNERSHIPS",
//       content: "List JAIMAX TOKEN on major cryptocurrency exchanges such as Binance, Coinbase, Kucoin, Gate.io, OKX, Bybit, and HTX. Forge strategic partnerships to enhance the JAIMAX TOKEN ecosystem and expand its use cases."
//     },
//     {
//       date: "P4 2025",
//       title: "JAIMAX CRYPTO EXCHANGE LAUNCH",
//       content: "Following the successful first phase token sale, launch the JAIMAX Crypto Exchange. Provide a platform for trading a wide range of cryptocurrencies."
//     },
//     {
//       date: "P5 2025",
//       title: "MULTI-BLOCKCHAIN SUPPORT", 
//       content: "Enhance JAIMAX TOKEN to support multiple blockchains, increasing its interoperability and reach."
//     },
//     {
//       date: "P6 2025",
//       title: "DEVELOPMENT OF JAIMAX BLOCKCHAIN",
//       content: "Begin the development of JAIMAX COIN proprietary blockchain. Focus on creating a highly scalable, secure, and efficient blockchain network."
//     },
//     {
//       date: "P7 2025",
//       title: "DEVELOPMENT OF JMC SWAP, DAPPS, AND WALLETS",
//       content: "Develop and launch JMC Swap, enabling users to exchange tokens seamlessly. Introduce various Dapps and secure JMC Wallets for storing JAIMAX COIN and other cryptocurrencies."
//     },
//     {
//       date: "P8 2025",
//       title: "MARKET POSITIONING & EXCHANGE PRICE",
//       content: "Aim for JAIMAX COIN to achieve a top 100 ranking on Coin Market Cap (CMC). Set the initial exchange listing price at INR 4.0 (approximately USD 0.046)."
//     },
//     {
//       date: "P1 2026",
//       title: "COMPREHENSIVE CRYPTO SUPPORT & PAYMENT GATEWAY DEVELOPMENT",
//       content: "Ensure JAIMAX Coin supports all major cryptocurrencies. Develop an integrated payment gateway for facilitating all types of money transactions."
//     },
//     {
//       date: "P2 2026",
//       title: "GLOBAL EXCHANGE LISTINGS",
//       content: "Continue listing JAIMAX COIN on leading global exchanges to enhance liquidity and accessibility. Focus on establishing a strong global presence and user base."
//     }
//   ];

//   return (
//     <div className="min-h-screen  relative overflow-hidden">
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
//         <div className="text-center mb-12 md:mb-24">
//           <div className="relative inline-block">
//             <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 md:mb-6 font-medium">JAIMAX TOKEN</p>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-teal-300 via-green-300 to-lime-300 bg-clip-text mb-4 tracking-tight">
//               Road Map
//             </h1>
//             <div className="w-16 sm:w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-teal-500 via-green-400 to-lime-500 mx-auto rounded-full"></div>
//           </div>
//         </div>
//         <div className="relative max-w-4xl mx-auto hidden lg:block">
//           <div className="absolute  top-0 h-full flex items-center justify-center w-20 xl:w-24 pointer-events-none">
//             <div className="relative h-full flex items-center">
//               <h1 className="text-6xl xl:text-8xl font-black text-transparent bg-gradient-to-b from-purple-400/40 via-pink-400/35 to-purple-500/30 bg-clip-text transform -rotate-90 whitespace-nowrap select-none tracking-[0.4em] xl:tracking-[0.2em] drop-shadow-lg">
//                 ROADMAP
//               </h1>
//               <div className="absolute inset-0 text-6xl xl:text-8xl font-black text-purple-500/10 transform -rotate-90 whitespace-nowrap select-none blur-sm tracking-[0.4em] xl:tracking-[0.6em] flex items-center">
//                 ROADMAP
//               </div>
//             </div>
//           </div>
//           <div className="absolute left-56 xl:left-[15rem] top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/20"></div>
          
//           <div className="space-y-6 xl:space-y-4">
//             {timelineData.map((item, index) => (
//               <div key={index} className="relative flex items-center group">
//                 <div className="w-48 xl:w-52 text-right pr-6 xl:pr-8">
//                   <h3 className="text-xl xl:text-2xl font-black text-transparent bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text group-hover:from-lime-300 group-hover:to-teal-300 transition-all duration-500">
//                     {item.date}
//                   </h3>
//                 </div>
                
//                 {/* Enhanced Timeline node */}
//                 <div className="relative z-10 ml-5">
//                   <div className="w-6 h-6  bg-gradient-to-br from-teal-400 to-green-500 rounded-full border-4 border-slate-900 shadow-xl shadow-teal-400/30 group-hover:scale-125 transition-transform duration-300">
//                     <div className="absolute inset-0 bg-teal-400 rounded-full  opacity-40" ></div>
//                     <div className="absolute inset-1 bg-gradient-to-br from-teal-300 to-green-400 rounded-full"></div>
//                   </div>
//                 </div>
                
//                 {/* Enhanced Horizontal line to content */}
//                 <div className="w-12 xl:w-16 h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent group-hover:w-16 xl:group-hover:w-20 transition-all duration-300"></div>
//                 <div className="flex-1 ml-3 xl:ml-4">
//                   <div className=" rounded-2xl p-4 xl:p-4   max-w-lg xl:max-w-xl group-hover:border-teal-400/30 group-hover:shadow-teal-400/10 transition-all duration-500">
//                     <h4 className="text-base xl:text-lg font-bold text-teal-300 mb-2 xl:mb-3 group-hover:text-teal-200 transition-colors duration-300">
//                       {item.title}
//                     </h4>
//                     <p className="text-slate-300 text-sm xl:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
//                       {item.content}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Timeline - Mobile/Tablet Layout */}
//         <div className="lg:hidden">
//           <div className="relative">
//             {/* Vertical timeline line for mobile */}
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/20"></div>
            
//             <div className="space-y-8 md:space-y-1">
//               {timelineData.map((item, index) => (
//                 <div key={index} className="relative flex items-start group">
//                   {/* Timeline node for mobile */}
//                   <div className="relative z-10 mt-2">
//                     <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-teal-400 to-green-500 rounded-full border-2 md:border-3 border-slate-900 shadow-lg shadow-teal-400/30">
//                       <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-40" style={{animationDelay: `${index * 200}ms`}}></div>
//                       <div className="absolute inset-0.5 md:inset-1 bg-gradient-to-br from-teal-300 to-green-400 rounded-full"></div>
//                     </div>
//                   </div>
                  
//                   {/* Content for mobile */}
//                   <div className="flex-1 ml-6 md:ml-8">
//                     <div className="bg-gradient-to-br from-slate-800/60 via-teal-900/40 to-slate-800/60 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-teal-600/50 shadow-xl group-hover:border-teal-400/30 group-hover:shadow-teal-400/10 transition-all duration-500">
//                       <h3 className="text-lg md:text-xl font-black text-transparent bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text mb-2 md:mb-3">
//                         {item.date}
//                       </h3>
//                       <h4 className="text-sm md:text-base font-bold text-teal-300 mb-2 md:mb-3 group-hover:text-teal-200 transition-colors duration-300">
//                         {item.title}
//                       </h4>
//                       <p className="text-slate-300 text-sm md:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
//                         {item.content}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from "react";

// export default function TimelinePrimaryColor() {
//   const timelineData = [
//     {
//       date: "P1 2024",
//       title: "CONCEPT DEVELOPMENT AND TEAM FORMATION",
//       content: "Establish the foundational concept of JAIMAX TOKEN. Assemble a dedicated team of blockchain experts, developers, marketers, and legal advisors."
//     },
//     {
//       date: "P2 2024", 
//       title: "SMART CONTRACT DEVELOPMENT AND SECURITY AUDITS",
//       content: "Develop and deploy JAIMAX TOKEN smart contracts on the Binance Smart Chain (BSC). Conduct thorough security audits to ensure the robustness and security of the smart contracts."
//     },
//     {
//       date: "P3 2024",
//       title: "WEBSITE LAUNCH AND WHITEPAPER PUBLICATION", 
//       content: "Launch the official JAIMAX TOKEN website. Publish the comprehensive white paper detailing the vision, technical architecture, and roadmap of JAIMAX TOKEN."
//     },
//     {
//       date: "P4 2024",
//       title: "PRE-SALE AND PUBLIC ICO LAUNCH",
//       content: "Conduct the pre-sale and public Initial Coin Offering (ICO) of JAIMAX TOKEN. Initiate marketing campaigns to attract potential investors and build community engagement."
//     },
//     {
//       date: "P5 2024",
//       title: "MOBILE APP LAUNCH",
//       content: "Launch JAIMAX TOKEN mobile apps for both Android and iOS platforms. Ensure the apps support seamless and secure transactions within the JAIMAX ecosystem."
//     },
//     {
//       date: "P1 2025",
//       title: "MAINNET LAUNCH AND DAPP INTEGRATIONS",
//       content: "Launch the JAIMAX TOKEN mainnet. Integrate JAIMAX TOKEN with various decentralized applications (Dapps) to enhance its utility and adoption."
//     },
//     {
//       date: "P2 2025",
//       title: "EXPANSION OF USE CASES AND ECOSYSTEM DEVELOPMENT",
//       content: "Expand JAIMAX TOKEN's use cases across different sectors, including DeFi, NFTS, and payments. Faster ecosystem development through collaborations and innovations."
//     },
//     {
//       date: "P3 2025",
//       title: "EXCHANGE LISTINGS & STRATEGIC PARTNERSHIPS",
//       content: "List JAIMAX TOKEN on major cryptocurrency exchanges such as Binance, Coinbase, Kucoin, Gate.io, OKX, Bybit, and HTX. Forge strategic partnerships to enhance the JAIMAX TOKEN ecosystem and expand its use cases."
//     },
//     {
//       date: "P4 2025",
//       title: "JAIMAX CRYPTO EXCHANGE LAUNCH",
//       content: "Following the successful first phase token sale, launch the JAIMAX Crypto Exchange. Provide a platform for trading a wide range of cryptocurrencies."
//     },
//     {
//       date: "P5 2025",
//       title: "MULTI-BLOCKCHAIN SUPPORT", 
//       content: "Enhance JAIMAX TOKEN to support multiple blockchains, increasing its interoperability and reach."
//     },
//     {
//       date: "P6 2025",
//       title: "DEVELOPMENT OF JAIMAX BLOCKCHAIN",
//       content: "Begin the development of JAIMAX COIN proprietary blockchain. Focus on creating a highly scalable, secure, and efficient blockchain network."
//     },
//     {
//       date: "P7 2025",
//       title: "DEVELOPMENT OF JMC SWAP, DAPPS, AND WALLETS",
//       content: "Develop and launch JMC Swap, enabling users to exchange tokens seamlessly. Introduce various Dapps and secure JMC Wallets for storing JAIMAX COIN and other cryptocurrencies."
//     },
//     {
//       date: "P8 2025",
//       title: "MARKET POSITIONING & EXCHANGE PRICE",
//       content: "Aim for JAIMAX COIN to achieve a top 100 ranking on Coin Market Cap (CMC). Set the initial exchange listing price at INR 4.0 (approximately USD 0.046)."
//     },
//     {
//       date: "P1 2026",
//       title: "COMPREHENSIVE CRYPTO SUPPORT & PAYMENT GATEWAY DEVELOPMENT",
//       content: "Ensure JAIMAX Coin supports all major cryptocurrencies. Develop an integrated payment gateway for facilitating all types of money transactions."
//     },
//     {
//       date: "P2 2026",
//       title: "GLOBAL EXCHANGE LISTINGS",
//       content: "Continue listing JAIMAX COIN on leading global exchanges to enhance liquidity and accessibility. Focus on establishing a strong global presence and user base."
//     }
//   ];

//   return (
//     <div className="min-h-screen relative overflow-hidden"style={{backgroundImage:"url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/video-bg.png')",backgroundRepeat:'no-repeat'}}>
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
//         <div className="text-center mb-12 md:mb-24" >
//           <div className="relative inline-block">
//             <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 md:mb-6 font-medium">JAIMAX TOKEN</p>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-teal-300 via-green-300 to-lime-300 bg-clip-text mb-4 tracking-tight">
//               Road Map
//             </h1>
            
//             <div className="w-16 sm:w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-teal-500 via-green-400 to-lime-500 mx-auto rounded-full"></div>
//           </div>
//         </div>

//         {/* Desktop Layout */}
//         <div className="relative max-w-6xl mx-auto hidden lg:block">
//           <div className="absolute -left-20 top-0  pointer-events-none">
//               <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/road_map.png"   alt="" />
//           </div>
//           <div className="absolute left-56 xl:left-[15rem] top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/20"></div>
          
//           <div className="space-y-6 xl:space-y-4">
//             {timelineData.map((item, index) => (
//               <div key={index} className="relative flex items-center group">
//                 <div className="w-48 xl:w-52 text-right pr-6 xl:pr-8">
//                   <h3 className="text-xl xl:text-2xl font-black text-transparent bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text group-hover:from-lime-300 group-hover:to-teal-300 transition-all duration-500">
//                     {item.date}
//                   </h3>
//                 </div>
                
//                 <div className="relative z-10 ml-5">
//                   <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full border-4 border-slate-950 shadow-xl shadow-teal-400/30 group-hover:scale-125 transition-transform duration-300">
//                     <div className="absolute inset-0 bg-teal-400 rounded-full opacity-40"></div>
//                     <div className="absolute inset-1 bg-gradient-to-br from-teal-300 to-green-400 rounded-full"></div>
//                   </div>
//                 </div>
                
//                 <div className="w-12 xl:w-16 h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent group-hover:w-16 xl:group-hover:w-20 transition-all duration-300"></div>
//                 <div className="flex-1 ml-3 xl:ml-4">
//                   <div className="rounded-2xl p-4 xl:p-4 max-w-lg xl:max-w-xl group-hover:border-teal-400/30 group-hover:shadow-teal-400/10 transition-all duration-500">
//                     <h4 className="text-base xl:text-lg font-bold text-teal-300 mb-2 xl:mb-3 group-hover:text-teal-200 transition-colors duration-300">
//                       {item.title}
//                     </h4>
//                     <p className="text-slate-300 text-sm xl:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
//                       {item.content}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile/Tablet Layout */}
//         <div className="lg:hidden">
//           <div className="relative max-w-4xl mx-auto">
//             <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/20"></div>
            
//             <div className="space-y-6 sm:space-y-8 md:space-y-10">
//               {timelineData.map((item, index) => (
//                 <div key={index} className="relative flex items-start group">
//                   <div className="relative z-10 mt-2">
//                     <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full border-2 sm:border-3 md:border-4 border-slate-950 shadow-lg shadow-teal-400/30">
//                       <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-40" style={{animationDelay: `${index * 200}ms`}}></div>
//                       <div className="absolute inset-0.5 sm:inset-1 bg-gradient-to-br from-teal-300 to-green-400 rounded-full"></div>
//                     </div>
//                   </div>
                  
//                   <div className="flex-1 ml-6 sm:ml-8 md:ml-10">
//                     <div className="bg-gradient-to-br from-slate-800/60 via-teal-900/40 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-teal-600/50 shadow-xl group-hover:border-teal-400/30 group-hover:shadow-teal-400/10 transition-all duration-500">
//                       <h3 className="text-base sm:text-lg md:text-xl font-black text-transparent bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text mb-2 md:mb-3">
//                         {item.date}
//                       </h3>
//                       <h4 className="text-sm sm:text-base md:text-lg font-bold text-teal-300 mb-2 md:mb-3 group-hover:text-teal-200 transition-colors duration-300">
//                         {item.title}
//                       </h4>
//                       <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
//                         {item.content}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";

export default function TimelinePrimaryColor() {
  const timelineData = [
    {
      date: "P1 2024",
      title: "CONCEPT DEVELOPMENT AND TEAM FORMATION",
      content: "Establish the foundational concept of JAIMAX TOKEN. Assemble a dedicated team of blockchain experts, developers, marketers, and legal advisors."
    },
    {
      date: "P2 2024", 
      title: "SMART CONTRACT DEVELOPMENT AND SECURITY AUDITS",
      content: "Develop and deploy JAIMAX TOKEN smart contracts on the Binance Smart Chain (BSC). Conduct thorough security audits to ensure the robustness and security of the smart contracts."
    },
    {
      date: "P3 2024",
      title: "WEBSITE LAUNCH AND WHITEPAPER PUBLICATION", 
      content: "Launch the official JAIMAX TOKEN website. Publish the comprehensive white paper detailing the vision, technical architecture, and roadmap of JAIMAX TOKEN."
    },
    {
      date: "P4 2024",
      title: "PRE-SALE AND PUBLIC ICO LAUNCH",
      content: "Conduct the pre-sale and public Initial Coin Offering (ICO) of JAIMAX TOKEN. Initiate marketing campaigns to attract potential investors and build community engagement."
    },
    {
      date: "P5 2024",
      title: "MOBILE APP LAUNCH",
      content: "Launch JAIMAX TOKEN mobile apps for both Android and iOS platforms. Ensure the apps support seamless and secure transactions within the JAIMAX ecosystem."
    },
    {
      date: "P1 2025",
      title: "MAINNET LAUNCH AND DAPP INTEGRATIONS",
      content: "Launch the JAIMAX TOKEN mainnet. Integrate JAIMAX TOKEN with various decentralized applications (Dapps) to enhance its utility and adoption."
    },
    {
      date: "P2 2025",
      title: "EXPANSION OF USE CASES AND ECOSYSTEM DEVELOPMENT",
      content: "Expand JAIMAX TOKEN's use cases across different sectors, including DeFi, NFTS, and payments. Faster ecosystem development through collaborations and innovations."
    },
    {
      date: "P3 2025",
      title: "EXCHANGE LISTINGS & STRATEGIC PARTNERSHIPS",
      content: "List JAIMAX TOKEN on major cryptocurrency exchanges such as Binance, Coinbase, Kucoin, Gate.io, OKX, Bybit, and HTX. Forge strategic partnerships to enhance the JAIMAX TOKEN ecosystem and expand its use cases."
    },
    {
      date: "P4 2025",
      title: "JAIMAX CRYPTO EXCHANGE LAUNCH",
      content: "Following the successful first phase token sale, launch the JAIMAX Crypto Exchange. Provide a platform for trading a wide range of cryptocurrencies."
    },
    {
      date: "P5 2025",
      title: "MULTI-BLOCKCHAIN SUPPORT", 
      content: "Enhance JAIMAX TOKEN to support multiple blockchains, increasing its interoperability and reach."
    },
    {
      date: "P6 2025",
      title: "DEVELOPMENT OF JAIMAX BLOCKCHAIN",
      content: "Begin the development of JAIMAX COIN proprietary blockchain. Focus on creating a highly scalable, secure, and efficient blockchain network."
    },
    {
      date: "P7 2025",
      title: "DEVELOPMENT OF JMC SWAP, DAPPS, AND WALLETS",
      content: "Develop and launch JMC Swap, enabling users to exchange tokens seamlessly. Introduce various Dapps and secure JMC Wallets for storing JAIMAX COIN and other cryptocurrencies."
    },
    {
      date: "P8 2025",
      title: "MARKET POSITIONING & EXCHANGE PRICE",
      content: "Aim for JAIMAX COIN to achieve a top 100 ranking on Coin Market Cap (CMC). Set the initial exchange listing price at INR 4.0 (approximately USD 0.046)."
    },
    {
      date: "P1 2026",
      title: "COMPREHENSIVE CRYPTO SUPPORT & PAYMENT GATEWAY DEVELOPMENT",
      content: "Ensure JAIMAX Coin supports all major cryptocurrencies. Develop an integrated payment gateway for facilitating all types of money transactions."
    },
    {
      date: "P2 2026",
      title: "GLOBAL EXCHANGE LISTINGS",
      content: "Continue listing JAIMAX COIN on leading global exchanges to enhance liquidity and accessibility. Focus on establishing a strong global presence and user base."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{backgroundImage:"url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/video-bg.png')",backgroundRepeat:'no-repeat'}}>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-12 md:mb-24">
          <div className="relative inline-block">
            <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 md:mb-6 font-medium">JAIMAX TOKEN</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-teal-300 via-green-300 to-lime-300 bg-clip-text mb-4 tracking-tight">
              Road Map
            </h1>
            
            <div className="w-16 sm:w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-teal-500 via-green-400 to-lime-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Desktop Layout - Left Aligned */}
        <div className="relative max-w-6xl mx-auto hidden lg:block">
          {/* Roadmap image positioned at left side */}
          <div className="absolute -left-20 top-0 pointer-events-none">
            <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/road_map.png" alt="" />
          </div>
          
          {/* Timeline line positioned more to the right */}
          <div className="absolute left-24 xl:left-32 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/20"></div>
          
          <div className="space-y-6 xl:space-y-4 pl-20 xl:pl-28">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex items-center group">
                {/* Timeline dot */}
                <div className="relative z-10 ml-8">
                  <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full border-4 border-slate-950 shadow-xl shadow-teal-400/30 group-hover:scale-125 transition-transform duration-300">
                    <div className="absolute inset-0 bg-teal-400 rounded-full opacity-40"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-teal-300 to-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Connecting line */}
                <div className="w-12 xl:w-16 h-0.5 bg-gradient-to-r from-teal-400 via-teal-300 to-transparent group-hover:w-16 xl:group-hover:w-20 transition-all duration-300"></div>
                
                {/* Content on the right side of timeline */}
                <div className="flex-1 ml-3 xl:ml-4">
                  <div className="rounded-2xl p-4 xl:p-4 max-w-lg xl:max-w-xl group-hover:border-teal-400/30 group-hover:shadow-teal-400/10 transition-all duration-500">
                    <h3 className="text-xl xl:text-2xl font-black text-transparent bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text group-hover:from-lime-300 group-hover:to-teal-300 transition-all duration-500 mb-2">
                      {item.date}
                    </h3>
                    <h4 className="text-base xl:text-lg font-bold text-teal-300 mb-2 xl:mb-3 group-hover:text-teal-200 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-sm xl:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-teal-400 to-transparent rounded-full shadow-lg shadow-teal-400/20"></div>
            
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex items-start group">
                  <div className="relative z-10 mt-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-full border-2 sm:border-3 md:border-4 border-slate-950 shadow-lg shadow-teal-400/30">
                      <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-40" style={{animationDelay: `${index * 200}ms`}}></div>
                      <div className="absolute inset-0.5 sm:inset-1 bg-gradient-to-br from-teal-300 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 ml-6 sm:ml-8 md:ml-10">
                    <div className="bg-gradient-to-br from-slate-800/60 via-teal-900/40 to-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-teal-600/50 shadow-xl group-hover:border-teal-400/30 group-hover:shadow-teal-400/10 transition-all duration-500">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-transparent bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text mb-2 md:mb-3">
                        {item.date}
                      </h3>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold text-teal-300 mb-2 md:mb-3 group-hover:text-teal-200 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
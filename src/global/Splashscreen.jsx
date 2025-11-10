// import React, { useState, useEffect } from "react";
// import icon from "../assets/3djaimax3.jpg";

// const JaimaxSplash = () => {
//   const [phase, setPhase] = useState("initial");

//   useEffect(() => {
//     const timeline = [
//       { delay: 100, phase: "split" },
//       { delay: 700, phase: "textReveal" },
//       { delay: 1800, phase: "sectionsComplete" },
//       { delay: 2000, phase: "settled" },
//     ];
//     timeline.forEach(({ delay, phase: nextPhase }) => {
//       setTimeout(() => setPhase(nextPhase), delay);
//     });
//   }, []);

//   return (
//     <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
//       {phase === "settled" && (
//         <div
//           className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
//           style={{
//             backgroundImage: `url(${icon})`,
//             // backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMTExIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iMTUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMTExIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iNTAiIGZpbGw9IiMxOWZmNzUiLz4KPHN2Zz4=")`,
//             filter: "brightness(0.5)",
//             opacity: 1,
//           }}
//         />
//       )}

//       {/* Left Section */}
//       <div
//         className={`absolute top-0 left-0 bottom-0 w-full md:w-1/2 flex items-center justify-center transition-all duration-1000 ease-in-out z-20 ${
//           phase === "initial"
//             ? "transform -translate-x-full md:-translate-x-full"
//             : phase === "sectionsComplete" || phase === "settled"
//             ? "opacity-0 transform -translate-x-full md:-translate-x-full"
//             : "transform translate-x-0 opacity-100"
//         }`}
//         // style={{ background: "#000000" }}
//         style={{
//           background: "linear-gradient(45deg, #1a1a1a, #1d974a, #195f64)",
//         }}
//       >
//         <div
//           className={`text-center transition-all duration-800 delay-200 ease-out px-4 ${
//             phase === "textReveal"
//               ? "opacity-100 translate-y-0"
//               : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div className="flex flex-col items-center justify-center mb-2 md:mb-4">
//             <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center mb-2 md:mb-4">
//               <div className="w-6 h-6 md:w-8 md:h-8 bg-cyan-400 rounded-full animate-pulse flex items-center justify-center">
//                 <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
//               </div>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
//               SECURE
//             </h2>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
//               DATA
//             </h2>
//           </div>
//           <p className="text-cyan-300 text-sm md:text-lg font-light">
//             End-to-end encryption{" "}
//           </p>
//           <p className="text-cyan-300 text-sm md:text-lg font-light">
//             Zero-knowledge architecture{" "}
//           </p>
//           <div className="flex justify-center mt-4 md:mt-6 space-x-1">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-1.5 h-6 md:w-2 md:h-8 bg-cyan-400 opacity-60 animate-pulse"
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div
//         className={`absolute top-0 right-0 bottom-0 w-full md:w-1/2 flex items-center justify-center transition-all duration-800 ease-in-out z-20 ${
//           phase === "initial"
//             ? "translate-x-full md:translate-x-full"
//             : phase === "sectionsComplete" || phase === "settled"
//             ? "opacity-0 translate-x-full md:translate-x-full"
//             : "translate-x-0 opacity-100"
//         }`}
//         // style={{ background: "#f8d00d" }}
//         style={{
//           background: "linear-gradient(45deg, #1a1a1a, #1d974a, #195f64)",
//         }}
//       >
//         <div
//           className={`text-center transition-all duration-600 delay-300 ease-out px-4 ${
//             phase === "textReveal" || phase === "settled"
//               ? "opacity-100 translate-x-0"
//               : "opacity-0 -translate-x-6"
//           }`}
//         >
//           <div className="flex flex-col items-center justify-center mb-2 md:mb-4">
//             <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-orange-400 rounded-full flex items-center justify-center mb-2 md:mb-4">
//               <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 rounded-sm animate-ping transform rotate-45"></div>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
//               GREAT
//             </h2>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
//               FUTURE
//             </h2>
//           </div>
//           <p className="text-orange-300 text-sm md:text-lg font-light">
//             AI-powered trading
//           </p>
//           <p className="text-orange-300 text-sm md:text-lg font-light">
//             Next-gen blockchain
//           </p>
//           <div className="mt-4 md:mt-6">
//             <div className="w-32 md:w-40 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mx-auto animate-pulse"></div>
//           </div>
//         </div>
//       </div>

//       {/* Divider Line */}
//       <div
//         className={`absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white to-transparent transition-all duration-800 ease-in-out z-30 hidden md:block ${
//           phase === "split" || phase === "textReveal"
//             ? "opacity-60 scale-y-100"
//             : "opacity-0 scale-y-0"
//         }`}
//       ></div>

//       {/* Logo Section */}
//       <div
//         className={`absolute inset-0 flex items-center justify-center z-40 transition-all duration-800 ease-out px-4 ${
//           phase === "settled" ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         <div className="text-center">
//           <h1
//             className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black transition-all duration-800 ease-out ${
//               phase === "settled" ? "blur-none scale-100" : "blur-xl scale-90"
//             }`}
//             style={{
//               textShadow:
//                 phase === "settled"
//                   ? "0 0 20px rgba(41, 185, 84, 0.3), 0 0 40px rgba(52, 143, 79, 0.1)"
//                   : "0 0 60px #bace27",
//               color: phase === "settled" ? "#ffffff" : "transparent",
//               filter:
//                 phase === "settled"
//                   ? "drop-shadow(0 0 10px rgba(255,255,255,0.1))"
//                   : "none",
//             }}
//           >
//             JAIMAX
//           </h1>
//           <div
//             className={`mt-4 md:mt-6 transition-all duration-1000 delay-300 ease-out ${
//               phase === "settled"
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-6"
//             }`}
//           >
//             <p className="text-gray-300 text-sm sm:text-base md:text-xl font-light tracking-wider sm:tracking-widest px-4">
//               WHERE SECURITY MEETS INNOVATION
//             </p>
//             <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-2 md:mt-4 opacity-50"></div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Particles */}
//       {phase === "settled" && (
//         <div className="absolute inset-0 z-30 pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className={`absolute opacity-30 ${
//                 i % 4 === 0
//                   ? "w-2 h-2 bg-cyan-400 rounded-full"
//                   : i % 4 === 1
//                   ? "w-1.5 h-1.5 bg-white rounded-full"
//                   : i % 4 === 2
//                   ? "w-2 h-2 bg-orange-400 rounded-sm transform rotate-45"
//                   : "w-1 h-1 bg-yellow-400 rounded-full"
//               }`}
//               style={{
//                 left: `${15 + Math.random() * 70}%`,
//                 top: `${15 + Math.random() * 70}%`,
//                 animation: `float ${
//                   3 + Math.random() * 2
//                 }s ease-in-out infinite`,
//                 animationDelay: `${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Custom CSS for floating animation */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//             opacity: 0.8;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default JaimaxSplash;



import React, { useEffect, useState } from "react";
import icon from "../assets/Images/greencoin.webp";

const cryptoIcons = [
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M2 12a10 10 0 0 1 18-6" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M9 6.8a6 6 0 0 1 9 5.2v2" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" /><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" /><path d="M5 21h14" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="m13 17-5-1h1a4 4 0 0 0 0-8" /></svg>
];



const JaimaxSplash = () => {
  const [stage, setStage] = useState("intro");
  const [particles, setParticles] = useState([]);
  const [hexGrid, setHexGrid] = useState([]);


  const getCircleRadius = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 100;
      if (window.innerWidth < 1024) return 140;
      return 180;
    }
    return 180;
  };
  const CIRCLE_RADIUS = getCircleRadius();
  const ICON_SIZE = 48;

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 0.5,
      }))
    );
    // Hex grid for faint bg
    setHexGrid(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: (i % 10) * 10,
        y: Math.floor(i / 10) * 10,
        delay: Math.random() * 2,
      }))
    );
    const timers = [
      setTimeout(() => setStage("showIcons"), 100),
      setTimeout(() => setStage("explode"), 3000),
      setTimeout(() => setStage("text"), 3800),
      setTimeout(() => setStage("fall"), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-[#085056] via-[#0a6169] to-[#0c7580] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {hexGrid.map((hex) => (
          <div
            key={hex.id}
            className="absolute w-8 h-8 border border-white/20 rotate-45 animate-pulse-hex"
            style={{
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              animationDelay: `${hex.delay}s`,
            }}
          />
        ))}
      </div>

    
      <div className="absolute inset-0 opacity-5 animate-digital-rain" />

      {stage === "explode" &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full animate-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}

      {/* Main blockchain circle animation + center */}
      {stage !== "text" && stage !== "fall" && (
        <div
          className={`absolute rounded-full backdrop-blur-sm transition-all
           
        `}>
          {/* Center icon */}
          {stage === "showIcons" && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center">
                <img
                  src={icon}
                  alt="Center Icon"
                  className="w-full h-full object-contain rounded-full"
                  style={{ boxShadow: "none", zIndex: 50 }}
                />
              </div>
            </div>
          )}

          {/* Blockchain connection lines */}
          {stage === "showIcons" &&
            cryptoIcons.map((_, index) => {
              const angle = (index / cryptoIcons.length) * 360;
              const lineWidth = typeof window !== "undefined"
                ? window.innerWidth < 640
                  ? 180
                  : window.innerWidth < 1024
                  ? 250
                  : 350
                : 350;
              return (
                <div
                  key={`line-${index}`}
                  className="absolute h-[1px] sm:h-[1.5px] lg:h-[2px] origin-left animate-drawLine"
                  style={{
                    width: `${lineWidth}px`,
                    background: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.5), transparent)",
                    transform: `rotate(${angle}deg)`,
                    left: "50%",
                    top: "50%",
                  }}
                />
              );
            })}

          {/* Circle outline for reference */}
          <div
            className="absolute"
            style={{
              top: `calc(50% - ${CIRCLE_RADIUS}px)`,
              left: `calc(50% - ${CIRCLE_RADIUS}px)`,
              width: `${CIRCLE_RADIUS * 2}px`,
              height: `${CIRCLE_RADIUS * 2}px`,
              borderRadius: "50%",
              border: "2px dashed rgba(17,169,153,0.2)",
            }}
          />

          {/* Circular arrangement of icons (centers aligned) */}
          {(stage === "showIcons" || stage === "explode") &&
            cryptoIcons.map((icon, index) => {
              const angle = (index / cryptoIcons.length) * 2 * Math.PI;
              const x = Math.cos(angle) * CIRCLE_RADIUS;
              const y = Math.sin(angle) * CIRCLE_RADIUS;
              return (
                <div
                  key={index}
                  className={`absolute ${stage === "showIcons" ? "animate-nodeAppear" : "animate-iconExpand"}`}
                  style={{
                    top: `calc(50% + ${y}px - ${ICON_SIZE / 2}px)`,
                    left: `calc(50% + ${x}px - ${ICON_SIZE / 2}px)`,
                    animationDelay: stage === "showIcons"
                      ? `${0.4 + index * 0.08}s`
                      : `${index * 0.05}s`,
                    width: `${ICON_SIZE}px`,
                    height: `${ICON_SIZE}px`,
                  }}
                >
                  <div className="relative group cursor-pointer w-full h-full">
                    <div className="rounded-full flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#11a999]/30 to-[#079670]/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                      <div className="w-2/3 h-2/3 text-white mx-auto">
                        {React.isValidElement(icon)
                          ? React.cloneElement(icon, {
                              className: "w-full h-full text-white",
                              stroke: "white",
                              style: { filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))" }
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Main headline/text */}
      {(stage === "text" || stage === "fall") && (
        <div className="absolute text-center z-10 animate-fadeInScale px-4 sm:px-6">
          <div className="relative">
            {/* <div className="absolute inset-0 blur-2xl sm:blur-3xl opacity-30 animate-pulse-slow" /> */}
            <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider drop-shadow-2xl mb-2">
              <span className="inline-block text-white animate-textReveal filter drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] sm:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                JAIMAX
              </span>
            </h1>
            <div className="relative mt-4 sm:mt-6 animate-slideUp" style={{ animationDelay: "0.5s" }}>
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 border border-white/40 rounded-full backdrop-blur-md">
                <p className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-wide">
                  WHERE SECURITY MEETS INNOVATION
                </p>
              </div>
            </div>
            <div className="relative mt-6 sm:mt-8 animate-slideUp" style={{ animationDelay: "0.8s" }}>
              <p className="text-xs sm:text-sm lg:text-xl text-white/80 font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                Blockchain • Security • Innovation
              </p>
            </div>
              {/* <div className="absolute -left-16 sm:-left-24 lg:-left-32 top-1/2 w-12 sm:w-16 lg:w-24 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-expandLine" /> */}
            {/* <div className="absolute -right-16 sm:-right-24 lg:-right-32 top-1/2 w-12 sm:w-16 lg:w-24 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent via-white to-transparent animate-expandLine" /> */}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-hex { 0%, 100% { opacity: 0.3; transform: rotate(45deg) scale(1); } 50% { opacity: 0.6; transform: rotate(45deg) scale(1.1); } }
        .animate-pulse-hex { animation: pulse-hex 4s ease-in-out infinite; }
        @keyframes digital-rain { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
        .animate-digital-rain { animation: digital-rain 20s linear infinite; }
        @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        @keyframes rotate-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-rotate-reverse { animation: rotate-reverse 15s linear infinite; }
        @keyframes pulse-blockchain { 0%, 100% { box-shadow: 0 0 60px rgba(255,255,255,0.6), inset 0 0 40px rgba(255,255,255,0.2); transform: scale(1);} 50% { box-shadow: 0 0 100px rgba(255,255,255,0.9), inset 0 0 60px rgba(255,255,255,0.4); transform: scale(1.03); } }
        .animate-pulse-blockchain { animation: pulse-blockchain 2s ease-in-out infinite; }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes ping-slower { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
        .animate-ping-slower { animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes drawLine { from { width: 0; opacity: 0; } to { opacity: 1; } }
        .animate-drawLine { animation: drawLine 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; width: 0; }
        @keyframes nodeAppear { 0% { transform: scale(0) rotate(-360deg); opacity: 0; } 70% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        .animate-nodeAppear { animation: nodeAppear 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; opacity: 0; }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; filter: brightness(1); } 50% { opacity: 1; filter: brightness(1.3); } }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        @keyframes pulse-core { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }
        .animate-pulse-core { animation: pulse-core 2s ease-in-out infinite; }
        @keyframes iconExpand { 0% { transform: scale(1) rotate(0deg); opacity: 1; } 100% { transform: scale(8) rotate(360deg); opacity: 0; } }
        .animate-iconExpand { animation: iconExpand 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        @keyframes particle { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(calc((50vw - 50%) * 0.8), calc((50vh - 50%) * 0.8)) scale(0); opacity: 0; } }
        .animate-particle { animation: particle 1s ease-out forwards; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.3) translateY(50px); filter: blur(20px); } to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } }
        .animate-fadeInScale { animation: fadeInScale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes textReveal { 0% { opacity: 0; transform: translateY(-30px) scale(0.8); filter: blur(15px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
        .animate-textReveal { animation: textReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradientShift { background-size: 200% 200%; animation: gradientShift 3s ease infinite; }
        @keyframes expandLine { from { width: 0; opacity: 0; } to { width: 6rem; opacity: 1; } }
        .animate-expandLine { animation: expandLine 1s ease-out forwards; animation-delay: 1s; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.6; } }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        @keyframes fallDown { 0% { top: -120px; opacity: 0; transform: rotate(0deg) scale(0.2); } 20% { opacity: 1; } 100% { top: 110vh; opacity: 0; transform: rotate(1080deg) scale(1.3); } }
        .animate-fallDown { animation: fallDown 3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        @keyframes zigZagFall { 0% { transform: translateX(0) translateY(0); } 25% { transform: translateX(var(--x1)) translateY(25vh); } 50% { transform: translateX(var(--x2)) translateY(50vh); } 75% { transform: translateX(var(--x3)) translateY(75vh); } 100% { transform: translateX(var(--x4)) translateY(100vh); } }
        .animate-coinFall { animation: zigZagFall var(--duration) linear forwards; }
      `}</style>
    </div>
  );
};

export default JaimaxSplash;



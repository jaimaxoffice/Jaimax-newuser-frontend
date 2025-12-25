

import { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import image from '../../assets/Images/roadmap.webp';
const roadmapData = {
  2024: {
    title: "Foundation & Launch Phase",
    status: "completed",
    progress: 100,
    phases: [
      "• Concept development and team formation of the core Jaimax team.",
      "• Official website launch introducing the Jaimax ecosystem.",
      "• Publication of the detailed whitepaper outlining goals and tokenomics.",
      "• Public ICO launch and community onboarding.",
      "• Release of the Jaimax mobile application for early users."
    ]
  },

  2025: {
    title: "Integration & Growth",
    status: "active",
    progress: 0,
    phases: [
      "• Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
      "• Integration of DigiLocker KYC for secure user verification.",
      "• Launch of token swapping within the Jaimax ecosystem.",
      "• Enable users to buy JMC through Binance exchange wallet connectivity."
    ]
  },

  2026: {
    title: "Blockchain & Platform Expansion",
    status: "future",
    progress: 0,
    phases: [
      "• Development of Jaimax’s own blockchain infrastructure.",
      "• Launch of DeFi features to enhance financial accessibility.",
      "• Launch of the NFT Platform.",
      "• Deployment of DApps across Education, Gaming, Tourism, and Finance.",
      "• Launch of person-to-person (P2P) buying and selling functionality.",
      "• Launch of Jaimax’s own payment gateway for seamless transactions."
    ]
  },

  2027: {
    title: "Global Presence",
    status: "future",
    progress: 0,
    phases: [
      "• Launch of the Jaimax Social Hub to connect users, traders, and developers.",
      "• Launch of the Jaimax Exchange for direct token trading.",
      "• Trading live for all verified users.",
      "• Expansion to global exchange listings."
    ]
  }
};

export default function RoadmapTimeline() {
  const years = Object.entries(roadmapData);
  const [activeIndex, setActiveIndex] = useState(-1);
  const refs = useRef([]);

  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveIndex((prev) => Math.max(prev, index));
        }
      });
    },
    [setActiveIndex]
  );

  const debouncedHandleIntersection = useCallback(
    debounce(handleIntersection, 100),
    [handleIntersection]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      debouncedHandleIntersection,
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [debouncedHandleIntersection]);

  return (
    <div className="min-h-screen  text-white bg-[#085056]">
      {/* Header */}
      <div className="text-center py-8  md:py-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">
          PROJECT NEXUS
        </h2>
        <p className="text-teal-400 text-xs md:text-sm uppercase tracking-wide">Roadmap Timeline</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8">
              <div className="relative">
                <img
                  
                  src={image}
                  alt="Roadmap Illustration"
                  title='Jaimax Roadmap'
                  className="w-full h-auto max-h-[600px] object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>

          {/* Timeline Container */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Main vertical timeline */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-60"></div>

              <div className="space-y-6 md:space-y-8">
                {years.map(([year, yearData], i) => {
                  const isActive = i <= activeIndex;

                  return (
                    <div
                      key={year}
                      className={`relative transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-2'
                        }`}
                    >
                      {/* Year Circle */}
                      <div
                        ref={(el) => (refs.current[i] = el)}
                        data-index={i}
                        className={`absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-3 flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-500 z-10 
    ${isActive
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 border-teal-300 text-white scale-110 shadow-lg shadow-teal-500/50'
                            : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500'
                          }
    top-1/2 -translate-y-1/2`}
                      >
                        {year}
                      </div>

                      {/* Connecting Line */}
                      <div
                        className={`absolute left-4 md:left-6 w-8 md:w-12 h-0.5 transition-all duration-500
    ${isActive
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 opacity-80'
                            : 'bg-slate-600 opacity-40'
                          }
    top-1/2 -translate-y-1/2`}
                      ></div>

                      {/* Content Card */}
                      <div className="ml-12 md:ml-20 relative">
                        <div className={`bg-slate-900 backdrop-blur-sm rounded-xl border transition-all duration-500 p-4 md:p-6 hover:transform hover:scale-105 hover:shadow-xl ${isActive
                          ? 'border-teal-500/50 shadow-lg shadow-teal-500/20'
                          : 'border-slate-700 hover:border-teal-500/30'
                          }`}>
                          {/* Progress indicator for active card */}
                          {yearData.status === 'active' && (
                            <div className="absolute -top-1 -left-1 -right-1 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-xl opacity-60"></div>
                          )}

                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                            <h3 className="text-lg md:text-xl font-bold text-white">{yearData.title}</h3>
                            <span
                              className={`self-start sm:self-center px-3 py-1 rounded-full text-sm font-bold uppercase transition-all duration-300 ${yearData.status === 'active'
                                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                                : 'bg-slate-500/20 text-slate-300 border border-slate-500/40'
                                }`}
                            >
                              {yearData.status}
                            </span>
                          </div>


                          {/* Phases */}
                          <div className="space-y-3">
                            {yearData.phases.map((phase, phaseIndex) => (
                              <div key={phaseIndex} className="text-sm text-slate-300 flex items-start hover:text-slate-200 transition-colors duration-200">
                                <span className="mr-3 mt-0.5 text-base flex-shrink-0">{phase.split(' ')[0]}</span>
                                <span className="leading-relaxed">{phase.substring(phase.indexOf(' ') + 1)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// import React from 'react';
// import { motion } from 'framer-motion';
// import './Timeline.css';
// import icon from "../../assets/coin.svg"


// const TimelineComponent = () => {
//   return (
//     <div className="vertical-timeline-wrapper">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="vertical-header"
//       >
//         <h1 className="vertical-title">Our Roadmap</h1>
//         <p className="vertical-subtitle">Building the future of blockchain technology</p>
//       </motion.div>

//       {/* Timeline */}
//       <div className="vertical-timeline">
//         {/* Central Line */}
//         <div className="vertical-line"></div>

//         {roadmapData.map((phase, phaseIndex) => (
//           <div key={phase.year} className="vertical-phase">
//             {/* Phase Header */}
//             <motion.div
//               className="vertical-phase-header"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="phase-badge-container">
//                 <motion.div
//                   className="phase-pulse"
//                   animate={{
//                     scale: [1, 1.5, 1],
//                     opacity: [0.5, 0, 0.5],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 />
//                 <div className="phase-badge">
//                   <span className="phase-year ">{phase.year}</span>
//                 </div>
//               </div>
//               <div className="phase-content">
//                 <h2 className="phase-title bg-[#085056] p-2">{phase.phase}</h2>
//               </div>
//             </motion.div>

//             {/* Phase Items */}
//             <div className="vertical-items">
//               {phase.items.map((item, itemIndex) => {
//                 const isLeft = itemIndex % 2 === 0;
                
//                 return (
//                   <motion.div
//                     key={itemIndex}
//                     className={`vertical-item ${isLeft ? 'item-left' : 'item-right'}`}
//                     initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, margin: "-50px" }}
//                     transition={{
//                       duration: 0.6,
//                       delay: itemIndex * 0.1,
//                       type: "spring",
//                       stiffness: 100
//                     }}
//                   >
//                     {/* Connector Dot */}
//                     <motion.div
//                       className="item-dot"
//                       whileHover={{ scale: 1.3 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <motion.div
//                         className="dot-ring"
//                         animate={{
//                           scale: [1, 1.4, 1],
//                           opacity: [0.6, 0, 0.6],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                           delay: itemIndex * 0.2
//                         }}
//                       />
//                       <span className="dot-icon">{item.icon}</span>
//                     </motion.div>

//                     {/* Card */}
//                     <motion.div
//                       className="item-card"
//                       whileHover={{
//                         scale: 1.03,
//                         boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)"
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <motion.div
//                         className="card-glow"
//                         animate={{
//                           opacity: [0.3, 0.6, 0.3],
//                         }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           ease: "easeInOut"
//                         }}
//                       />

//                       <div className="card-header">
//                         <h3 className="card-title">{item.title}</h3>
//                         {item.completed && (
//                           <motion.span
//                             className="card-completed"
//                             initial={{ scale: 0, rotate: -180 }}
//                             animate={{ scale: 1, rotate: 0 }}
//                             transition={{
//                               type: "spring",
//                               stiffness: 260,
//                               damping: 20,
//                               delay: 0.3
//                             }}
//                           >
//                             ✓ Completed
//                           </motion.span>
//                         )}
//                       </div>

//                       <p className="card-description">{item.desc}</p>

//                       {/* Shine Effect */}
//                       <motion.div
//                         className="card-shine"
//                         animate={{
//                           x: ['-200%', '200%'],
//                         }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           repeatDelay: 2,
//                           ease: "easeInOut"
//                         }}
//                       />
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}

        
       
//       </div>
//     </div>
//   );
// };

// export default TimelineComponent;
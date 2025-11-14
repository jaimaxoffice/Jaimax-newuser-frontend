

// import { useState, useRef, useEffect, useCallback } from 'react';
// import { debounce } from 'lodash';
// import image from '../../assets/Images/roadmap.webp';
// const roadmapData = {
//   2025: {
//     title: "Innovation & Expansion",
//     status: "Active",
//     progress: 0,
//     phases: [
//       "• AI Integration - Machine learning features",
//       "• Metaverse Platform - VR ecosystem with NFTs",
//       "• DeFi Ecosystem - Yield farming and staking",
//       "• Global Expansion - Strategic partnerships"
//     ]
//   },
//   2026: {
//     title: "Future Technology",
//     status: "future",
//     progress: 0,
//     phases: [
//       "• Advanced Technology - Quantum integration",
//       "• Neural Networks - Brain-computer interface",
//       "• Space Integration - Satellite infrastructure",
//       "• Universal Adoption - Global transformation"
//     ]
//   }
// };

// export default function RoadmapTimeline() {
//   const years = Object.entries(roadmapData);
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const refs = useRef([]);

//   const handleIntersection = useCallback(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const index = Number(entry.target.dataset.index);
//           setActiveIndex((prev) => Math.max(prev, index));
//         }
//       });
//     },
//     [setActiveIndex]
//   );

//   const debouncedHandleIntersection = useCallback(
//     debounce(handleIntersection, 100),
//     [handleIntersection]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       debouncedHandleIntersection,
//       {
//         root: null,
//         rootMargin: '-40% 0px -40% 0px',
//         threshold: 0,
//       }
//     );

//     refs.current.forEach((el) => {
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [debouncedHandleIntersection]);

//   return (
//     <div className="min-h-screen  text-white bg-[#085056]">
//       {/* Header */}
//       <div className="text-center py-8  md:py-12 px-4">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">
//           PROJECT NEXUS
//         </h2>
//         <p className="text-teal-400 text-xs md:text-sm uppercase tracking-wide">Roadmap Timeline</p>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
//           <div className="hidden lg:block lg:col-span-4">
//             <div className="sticky top-8">
//               <div className="relative">
//                 <img
                  
//                   src={image}
//                   alt="Roadmap Illustration"
//                   title='Jaimax Roadmap'
//                   className="w-full h-auto max-h-[600px] object-contain opacity-60 hover:opacity-80 transition-opacity duration-300"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Timeline Container */}
//           <div className="lg:col-span-8">
//             <div className="relative">
//               {/* Main vertical timeline */}
//               <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-500 opacity-60"></div>

//               <div className="space-y-6 md:space-y-8">
//                 {years.map(([year, yearData], i) => {
//                   const isActive = i <= activeIndex;

//                   return (
//                     <div
//                       key={year}
//                       className={`relative transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-2'
//                         }`}
//                     >
//                       {/* Year Circle */}
//                       <div
//                         ref={(el) => (refs.current[i] = el)}
//                         data-index={i}
//                         className={`absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-3 flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-500 z-10 
//     ${isActive
//                             ? 'bg-gradient-to-r from-teal-500 to-cyan-500 border-teal-300 text-white scale-110 shadow-lg shadow-teal-500/50'
//                             : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500'
//                           }
//     top-1/2 -translate-y-1/2`}
//                       >
//                         {year}
//                       </div>

//                       {/* Connecting Line */}
//                       <div
//                         className={`absolute left-4 md:left-6 w-8 md:w-12 h-0.5 transition-all duration-500
//     ${isActive
//                             ? 'bg-gradient-to-r from-teal-500 to-cyan-500 opacity-80'
//                             : 'bg-slate-600 opacity-40'
//                           }
//     top-1/2 -translate-y-1/2`}
//                       ></div>

//                       {/* Content Card */}
//                       <div className="ml-12 md:ml-20 relative">
//                         <div className={`bg-slate-900 backdrop-blur-sm rounded-xl border transition-all duration-500 p-4 md:p-6 hover:transform hover:scale-105 hover:shadow-xl ${isActive
//                           ? 'border-teal-500/50 shadow-lg shadow-teal-500/20'
//                           : 'border-slate-700 hover:border-teal-500/30'
//                           }`}>
//                           {/* Progress indicator for active card */}
//                           {yearData.status === 'active' && (
//                             <div className="absolute -top-1 -left-1 -right-1 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-xl opacity-60"></div>
//                           )}

//                           {/* Header */}
//                           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
//                             <h3 className="text-lg md:text-xl font-bold text-white">{yearData.title}</h3>
//                             <span
//                               className={`self-start sm:self-center px-3 py-1 rounded-full text-sm font-bold uppercase transition-all duration-300 ${yearData.status === 'active'
//                                 ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
//                                 : 'bg-slate-500/20 text-slate-300 border border-slate-500/40'
//                                 }`}
//                             >
//                               {yearData.status}
//                             </span>
//                           </div>


//                           {/* Phases */}
//                           <div className="space-y-3">
//                             {yearData.phases.map((phase, phaseIndex) => (
//                               <div key={phaseIndex} className="text-sm text-slate-300 flex items-start hover:text-slate-200 transition-colors duration-200">
//                                 <span className="mr-3 mt-0.5 text-base flex-shrink-0">{phase.split(' ')[0]}</span>
//                                 <span className="leading-relaxed">{phase.substring(phase.indexOf(' ') + 1)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const roadmapData = [
  {
    year: '2024',
    phase: 'Foundation & Launch Phase',
    gradient: 'from-teal-500 to-teal-700',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    items: [
      {
        title: 'Concept Development & Team Formation',
        desc: 'Formation of the core Jaimax team and project concept finalization.',
        image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80',
        completed: true,
      },
      {
        title: 'Official Website Launch',
        desc: 'Launch of the official website introducing the Jaimax ecosystem and roadmap.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      },
      {
        title: 'Whitepaper Publication',
        desc: 'Publication of the detailed whitepaper outlining Jaimax goals, vision, and tokenomics.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
      },
      {
        title: 'Public ICO Launch',
        desc: 'Initiation of the Public ICO for early investors and community onboarding.',
        image: 'https://images.unsplash.com/photo-1639322537231-2f206e06b3b1?w=800&q=80',
      },
      {
        title: 'Mobile Application Release',
        desc: 'Release of the Jaimax mobile app for early access users.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      },
    ],
  },
  {
    year: '2025',
    phase: 'Integration & Growth',
    gradient: 'from-[#177338] to-[#0d5c29]',
    glowColor: 'rgba(23, 115, 56, 0.4)',
    items: [
      {
        title: 'Launch of Jaimax Wallet (J-Wallet)',
        desc: 'Release of the Jaimax Wallet for secure token management and transactions.',
        image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80',
      },
      {
        title: 'DigiLocker KYC Integration',
        desc: 'Integration of DigiLocker KYC for verified and secure user onboarding.',
        image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80',
      },
      {
        title: 'Coin Swapping Feature',
        desc: 'Launch of seamless coin swapping within the Jaimax ecosystem.',
        image: 'https://images.unsplash.com/photo-1640826514546-7d2d4a1e6a1e?w=800&q=80',
      },
      {
        title: 'Binance Wallet Connectivity',
        desc: 'Enable users to purchase JMC directly through Binance wallet integration.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      },
    ],
  },
  {
    year: '2026',
    phase: 'Blockchain & Platform Expansion',
    gradient: 'from-[#b8cc26] to-[#9db01f]',
    glowColor: 'rgba(184, 204, 38, 0.4)',
    items: [
      {
        title: 'Jaimax Blockchain Development',
        desc: 'Development of Jaimax’s proprietary blockchain infrastructure for scalability and speed.',
        image: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=800&q=80',
      },
      {
        title: 'DeFi Platform Launch',
        desc: 'Launch of decentralized finance (DeFi) features to enhance financial accessibility.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      },
      {
        title: 'NFT Platform Release',
        desc: 'Launch of the NFT marketplace within the Jaimax ecosystem.',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      },
      {
        title: 'DApp Deployment',
        desc: 'Deployment of decentralized applications across Education, Gaming, Tourism, and Finance sectors.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      },
      {
        title: 'P2P Trading Launch',
        desc: 'Launch of secure person-to-person (P2P) buying and selling functionality.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      },
      {
        title: 'Jaimax Payment Gateway',
        desc: 'Introduction of Jaimax’s own payment gateway for seamless transactions across the ecosystem.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      },
    ],
  },
  {
    year: '2027',
    phase: 'Global Presence & Expansion',
    gradient: 'from-indigo-600 to-indigo-800',
    glowColor: 'rgba(79, 70, 229, 0.4)',
    items: [
      {
        title: 'Jaimax Social Hub Launch',
        desc: 'Launch of the Jaimax Social Hub to connect users, traders, and developers globally.',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80',
      },
      {
        title: 'Jaimax Exchange Launch',
        desc: 'Launch of the official Jaimax Exchange for direct token trading.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
      },
      {
        title: 'Global Trading Live',
        desc: 'Activate live trading features for all verified users.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      },
      {
        title: 'Global Exchange Listings',
        desc: 'Expand JMC listings across major international exchanges.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      },
    ],
  },
];


import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';
import icon from "../../assets/coin.svg"


const TimelineComponent = () => {
  return (
    <div className="vertical-timeline-wrapper">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="vertical-header"
      >
        <h1 className="vertical-title">Our Roadmap</h1>
        <p className="vertical-subtitle">Building the future of blockchain technology</p>
      </motion.div>

      {/* Timeline */}
      <div className="vertical-timeline">
        {/* Central Line */}
        <div className="vertical-line"></div>

        {roadmapData.map((phase, phaseIndex) => (
          <div key={phase.year} className="vertical-phase">
            {/* Phase Header */}
            <motion.div
              className="vertical-phase-header"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="phase-badge-container">
                <motion.div
                  className="phase-pulse"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="phase-badge">
                  <span className="phase-year ">{phase.year}</span>
                </div>
              </div>
              <div className="phase-content">
                <h2 className="phase-title bg-[#085056] p-2">{phase.phase}</h2>
              </div>
            </motion.div>

            {/* Phase Items */}
            <div className="vertical-items">
              {phase.items.map((item, itemIndex) => {
                const isLeft = itemIndex % 2 === 0;
                
                return (
                  <motion.div
                    key={itemIndex}
                    className={`vertical-item ${isLeft ? 'item-left' : 'item-right'}`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: itemIndex * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    {/* Connector Dot */}
                    <motion.div
                      className="item-dot"
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="dot-ring"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: itemIndex * 0.2
                        }}
                      />
                      <span className="dot-icon">{item.icon}</span>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                      className="item-card"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="card-glow"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      <div className="card-header">
                        <h3 className="card-title">{item.title}</h3>
                        {item.completed && (
                          <motion.span
                            className="card-completed"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                              delay: 0.3
                            }}
                          >
                            ✓ Completed
                          </motion.span>
                        )}
                      </div>

                      <p className="card-description">{item.desc}</p>

                      {/* Shine Effect */}
                      <motion.div
                        className="card-shine"
                        animate={{
                          x: ['-200%', '200%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        
       
      </div>
    </div>
  );
};

export default TimelineComponent;
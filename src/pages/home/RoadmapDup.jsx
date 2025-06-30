// import {
//   Briefcase,
//   TrendingUp,
//   Repeat,
//   Layers,
//   DollarSign,
//   CheckCircle,
//   Clock,
// } from "lucide-react";
// import { useRef } from "react";

// const timeline = [
//   {
//     year: "2020",
//     title: "Market Penetration",
//     description:
//       "The company is planning to expand its market penetration and share by selling more products to the customers. For this, the company is planning to start a campaign regarding awareness of banking products.",
//     Icon: Briefcase,
//     badgeColor: "bg-yellow-400 text-teal-800",
//   },
//   {
//     year: "2021",
//     title: "Market Expansion",
//     description:
//       "The company plans to expand its presence in domestic as well as international market. In this line, it is planning to:\n• Open new branches\n• Acquire companies in new markets",
//     Icon: TrendingUp,
//     badgeColor: "bg-green-500 text-teal-800",
//   },
//   {
//     year: "2022",
//     title: "Merger and Acquisition",
//     description:
//       "The bank has plans to expand its operations in new markets through merger and acquisition with other companies specifically in:\n• Auto financing solutions\n• Vehicle insurance operations",
//     Icon: Repeat,
//     badgeColor: "bg-yellow-400 text-teal-800",
//   },
//   {
//     year: "2023",
//     title: "Strengthen Financials",
//     description:
//       "The company has following targets for 2023:\n• Revenue: $ 30 Bn (15% growth)\n• EBIT Margin: 25–28%\n• Net Margin: 20–22%\n• Non‑Performing Loans: 10 MM (reduced by 90%)",
//     Icon: DollarSign,
//     badgeColor: "bg-green-500 text-teal-800",
//   },
//   {
//     year: "2024",
//     title: "Diversification",
//     description:
//       "The company plans to diversify its offerings. Adapt it to your needs and capture your audience's attention.",
//     Icon: Layers,
//     badgeColor: "bg-yellow-400 text-teal-800",
//   },
// ];

// export default function GrowthPlanTimeline() {
//   const cardRefs = useRef([]);

//   const handleIconClick = (index) => {
//     if (cardRefs.current[index]) {
//       cardRefs.current[index].scrollIntoView({ 
//         behavior: "smooth", 
//         inline: "center" 
//       });
//     }
//   };

//   return (
//     <section className="bg-[#085259] text-white py-12 px-4 md:px-10 lg:px-20 font-sans">
//       {/* Heading */}
//       <div className="text-center max-w-4xl mx-auto mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
//           Company's Growth Plan Outlook{" "}
//           <span className="text-yellow-400">(2020 – 2024)</span>
//         </h2>
//         <p className="mt-2 text-teal-100 text-sm md:text-base leading-relaxed">
//           The slide provides the company's future growth plans for the next
//           five years: market penetration, merger/acquisition, diversification,
//           market expansion, and strengthening financials.
//         </p>
//       </div>

//       {/* Timeline */}
//       <div className="relative flex md:justify-between gap-y-16 md:gap-y-0 overflow-x-auto space-x-6 pb-4">
//         {/* Center line on desktop */}
//         <div
//           className="hidden md:block absolute top-7 left-0 right-0 h-1 bg-teal-600"
//           aria-hidden="true"
//         />

//         {timeline.map((item, idx) => {
//           const { year, title, description } = item;
//           const isFirst = idx === 0;

//           return (
//             <div
//               key={year}
//               ref={(el) => (cardRefs.current[idx] = el)}
//               className="relative flex flex-col items-center md:basis-1/5 md:max-w-[18%] focus:outline-none min-w-[280px] snap-start"
//               tabIndex={0}
//             >
//               {/* Status Icon (live/pending) */}
//               <button
//                 onClick={() => handleIconClick(idx)}
//                 className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
//                   isFirst ? "bg-green-400" : "bg-yellow-400"
//                 }`}
//                 aria-label={`Navigate to ${year} - ${title}`}
//               >
//                 {isFirst ? (
//                   <CheckCircle className="w-7 h-7 text-teal-800" />
//                 ) : (
//                   <Clock className="w-7 h-7 text-teal-800" />
//                 )}
//               </button>

//               {/* Year label */}
//               <span className="mt-4 md:mt-0 md:rotate-90 md:absolute md:-left-7 md:top-1/2 md:-translate-y-1/2 font-semibold text-sm tracking-widest text-teal-100 select-none">
//                 {year}
//               </span>

//               {/* Card */}
//               <article
//                 className={`mt-6 md:mt-16 bg-teal-700 rounded-lg p-5 shadow-md max-w-xs md:max-w-none transition-opacity duration-300 ${
//                   isFirst ? "opacity-100" : "opacity-40 pointer-events-none"
//                 }`}
//               >
//                 <h3 className="text-lg font-semibold text-yellow-300 mb-2 leading-snug">
//                   {title}
//                 </h3>
//                 {description.split("\n").map((line, i) => (
//                   <p
//                     key={i}
//                     className="text-sm leading-relaxed whitespace-pre-line"
//                   >
//                     {line}
//                   </p>
//                 ))}
//               </article>

//               {/* Mobile connector line */}
//               {idx < timeline.length - 1 && (
//                 <div
//                   className="absolute md:hidden -bottom-8 w-1 h-16 bg-teal-600"
//                   aria-hidden="true"
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// import {
//   Briefcase,
//   TrendingUp,
//   Repeat,
//   Layers,
//   DollarSign,
//   CheckCircle,
//   Clock,
// } from "lucide-react";
// import { useRef } from "react";

// const timeline = [
//   {
//     year: "2020",
//     title: "Market Penetration",
//     description:
//       "The company is planning to expand its market penetration and share by selling more products to the customers. For this, the company is planning to start a campaign regarding awareness of banking products.",
//     Icon: Briefcase,
//     badgeColor: "bg-yellow-400 text-teal-800",
//   },
//   {
//     year: "2021",
//     title: "Market Expansion",
//     description:
//       "The company plans to expand its presence in domestic as well as international market. In this line, it is planning to:\n• Open new branches\n• Acquire companies in new markets",
//     Icon: TrendingUp,
//     badgeColor: "bg-green-500 text-teal-800",
//   },
//   {
//     year: "2022",
//     title: "Merger and Acquisition",
//     description:
//       "The bank has plans to expand its operations in new markets through merger and acquisition with other companies specifically in:\n• Auto financing solutions\n• Vehicle insurance operations",
//     Icon: Repeat,
//     badgeColor: "bg-yellow-400 text-teal-800",
//   },
//   {
//     year: "2023",
//     title: "Strengthen Financials",
//     description:
//       "The company has following targets for 2023:\n• Revenue: $ 30 Bn (15% growth)\n• EBIT Margin: 25–28%\n• Net Margin: 20–22%\n• Non‑Performing Loans: 10 MM (reduced by 90%)",
//     Icon: DollarSign,
//     badgeColor: "bg-green-500 text-teal-800",
//   },
//   {
//     year: "2024",
//     title: "Diversification",
//     description:
//       "The company plans to diversify its offerings. Adapt it to your needs and capture your audience's attention.",
//     Icon: Layers,
//     badgeColor: "bg-yellow-400 text-teal-800",
//   },
// ];


// import { CheckCircle, Clock } from "lucide-react";

// const timeline = [
//   {
//     year: "2020",
//     title: "Market Penetration",
//     description:
//       "The company is planning to expand its market penetration and share by selling more products to the customers. For this, the company is planning to start a campaign regarding awareness of banking products.",
//     badgeColor: "bg-green-400 text-teal-800", // success green
//     status: "success", // custom status field to decide icon
//   },
//   {
//     year: "2021",
//     title: "Market Expansion",
//     description:
//       "The company plans to expand its presence in domestic as well as international market. In this line, it is planning to:\n• Open new branches\n• Acquire companies in new markets",
//     badgeColor: "bg-yellow-400 text-teal-800",
//     status: "pending",
//   },
//   {
//     year: "2022",
//     title: "Merger and Acquisition",
//     description:
//       "The bank has plans to expand its operations in new markets through merger and acquisition with other companies specifically in:\n• Auto financing solutions\n• Vehicle insurance operations",
//     badgeColor: "bg-yellow-400 text-teal-800",
//     status: "pending",
//   },
//   {
//     year: "2023",
//     title: "Strengthen Financials",
//     description:
//       "The company has following targets for 2023:\n• Revenue: $ 30 Bn (15% growth)\n• EBIT Margin: 25–28%\n• Net Margin: 20–22%\n• Non‑Performing Loans: 10 MM (reduced by 90%)",
//     badgeColor: "bg-yellow-400 text-teal-800",
//     status: "pending",
//   },
//   {
//     year: "2024",
//     title: "Diversification",
//     description:
//       "The company plans to diversify its offerings. Adapt it to your needs and capture your audience's attention.",
//     badgeColor: "bg-yellow-400 text-teal-800",
//     status: "pending",
//   },
// ];

// export default function GrowthPlanTimeline() {
//   const cardRefs = useRef([]);

//   const handleIconClick = (index) => {
//     if (cardRefs.current[index]) {
//       cardRefs.current[index].scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//       });
//     }
//   };

//   return (
//     <section className="bg-[#085259] text-white py-12 px-4 md:px-10 lg:px-20 font-sans">
//       {/* Heading */}
//       <div className="text-center max-w-4xl mx-auto mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
//           Company's Growth Plan Outlook{" "}
//           <span className="text-yellow-400">(2020 – 2024)</span>
//         </h2>
//         <p className="mt-2 text-teal-100 text-sm md:text-base leading-relaxed">
//           The slide provides the company's future growth plans for the next
//           five years: market penetration, merger/acquisition, diversification,
//           market expansion, and strengthening financials.
//         </p>
//       </div>

//       {/* Timeline */}
//       <div className="relative">
//         {/* Center line on desktop */}
//         <div
//           className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-teal-600"
//           aria-hidden="true"
//         />

//         {/* Cards container */}
//         <div
//           className="
//             flex
//             md:justify-between
//             md:flex-nowrap
//             md:gap-0
//             gap-6
//             overflow-x-auto
//             snap-x snap-mandatory
//             scroll-smooth
//             scrollbar-hide
//             pb-4
//           "
//           role="list"
//         >
//           {timeline.map((item, idx) => {
//             const { year, title, description } = item;
//             const isFirst = idx === 0;

//             return (
//               <div
//                 key={year}
//                 ref={(el) => (cardRefs.current[idx] = el)}
//                 tabIndex={0}
//                 role="listitem"
//                 className="
//                   relative
//                   flex-shrink-0
//                   snap-center
//                   md:basis-[18%]
//                   max-w-xs
//                   md:max-w-none
//                   flex flex-col items-center
//                   focus:outline-none
//                 "
//               >
//                 {/* Status Icon (live/pending) */}

//                 <button
//                   onClick={() => handleIconClick(idx)}
//                   className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 ${item.status === "success" ? "bg-green-400" : "bg-yellow-400"
//                     }`}
//                   aria-label={`Navigate to ${year} - ${title}`}
//                 >
//                   {item.status === "success" ? (
//                     <CheckCircle className="w-7 h-7 text-teal-800" />
//                   ) : (
//                     <Clock className="w-7 h-7 text-teal-800" />
//                   )}
//                 </button>

//                 {/* Year label */}
//                 <span
//                   className="
//                     mt-4
//                     md:mt-0
//                     md:rotate-90
//                     md:absolute
//                     md:-left-7
//                     md:top-1/2
//                     md:-translate-y-1/2
//                     font-semibold
//                     text-sm
//                     tracking-widest
//                     text-teal-100
//                     select-none
//                   "
//                 >
//                   {year}
//                 </span>

//                 {/* Card */}
//                 <article
//                   className={`mt-6 md:mt-16 bg-teal-700 rounded-lg p-5 shadow-md max-w-xs md:max-w-none transition-opacity duration-300 ${isFirst ? "opacity-100" : "opacity-40 pointer-events-none"
//                     }`}
//                 >
//                   <h3 className="text-lg font-semibold text-yellow-300 mb-2 leading-snug">
//                     {title}
//                   </h3>
//                   {description.split("\n").map((line, i) => (
//                     <p
//                       key={i}
//                       className="text-sm leading-relaxed whitespace-pre-line"
//                     >
//                       {line}
//                     </p>
//                   ))}
//                 </article>

//                 {/* Mobile connector line */}
//                 {idx < timeline.length - 1 && (
//                   <div
//                     className="absolute md:hidden -bottom-8 w-1 h-16 bg-teal-600"
//                     aria-hidden="true"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }



// import React, { useRef, useState } from "react";
// import { CheckCircle, Clock } from "lucide-react";

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
//     price: "Price INR 0.60 - 1.53 Paisa (0.0071 - 0.018 USD)",
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

// export default function GrowthPlanTimeline() {
//   const cardRefs = useRef([]);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const handleIconClick = (index) => {
//     if (cardRefs.current[index]) {
//       cardRefs.current[index].scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//       });

//       setActiveIndex(index);

//       setTimeout(() => {
//         setActiveIndex(null);
//       }, 300);
//     }
//   };

//   return (
//     <section className="bg-[#085259] text-white  px-4 sm:px-8 md:px-10 lg:px-10 font-sans">
//       <div className="text-center max-w-4xl mx-auto mb-10 px-2 sm:px-6">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
//           Company's Growth Plan Outlook{" "}
//           <span className="text-yellow-400">(2020 – 2024)</span>
//         </h2>
//         <p className="mt-2 text-teal-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
//           The slide provides the company's future growth plans for the next five
//           years: market penetration, merger/acquisition, diversification, market
//           expansion, and strengthening financials.
//         </p>
//       </div>

//       <div className="relative">
//         <div
//           className="hidden md:block absolute left-0 right-0 h-1 bg-teal-600"
//           style={{ top: "28px" }}
//           aria-hidden="true"
//         />

//         <div
//           className="
//             flex
//             flex-nowrap
//             gap-6
//             overflow-x-auto
//             snap-x snap-mandatory
//             scroll-smooth
//             scrollbar-hide
//             pb-20
//             relative
//             w-full
//             pl-8
//           "
//           role="list"
//         >
//           {phaseData.map((item, idx) => {
//             const { status, phaseNo, tokens, price, button } = item;
//             const shouldBlurContent = status !== "Live";
//             const isActive = idx === activeIndex;

//             return (
//               <div
//                 key={idx}
//                 ref={(el) => (cardRefs.current[idx] = el)}
//                 tabIndex={0}
//                 role="listitem"
//                 className={`
//                   relative flex-shrink-0 snap-center
//                   min-w-[260px] max-w-[280px] sm:max-w-xs
//                   flex flex-col items-center focus:outline-none cursor-pointer
//                   transition-transform duration-300
//                   ${isActive ? "scale-110 z-30" : "scale-100"}
//                 `}
//                 onMouseEnter={() => setHoveredIndex(idx)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 <button
//                   onClick={() => handleIconClick(idx)}
//                   className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg cursor-pointer transition-transform duration-200 ${
//                     status === "Live" ? "bg-green-400" : "bg-white"
//                   }`}
//                   aria-label={`Navigate to ${phaseNo}`}
//                   type="button"
//                 >
//                   {status === "Live" ? (
//                     <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-teal-800" />
//                   ) : (
//                     <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-teal-800" />
//                   )}
//                 </button>

//                 <div
//                   className={`absolute top-[56px] text-yellow-300 font-semibold text-center mt-2 w-24 sm:w-32 opacity-0 pointer-events-none transition-opacity duration-300
//                     ${hoveredIndex === idx ? "opacity-100 pointer-events-auto" : ""}
//                   `}
//                   style={{ left: "50%", transform: "translateX(-50%)" }}
//                 >
//                   {phaseNo}
//                 </div>

//                 <span
//                   className="
//                     mt-3 sm:mt-4
//                     md:mt-0
//                     md:rotate-90
//                     md:absolute
//                     md:top-1/2
//                     md:-translate-y-1/2
//                     font-semibold
//                     text-xs sm:text-sm
//                     tracking-widest
//                     text-teal-100
//                     select-none
//                   "
//                   style={{ left: "-36px", zIndex: "1000" }}
//                 >
//                   {phaseNo}
//                 </span>

//                 <article
//                   className="mt-4 sm:mt-6 md:mt-16 bg-teal-700 rounded-lg p-4 sm:p-5 shadow-md relative w-full"
//                    style={{
//     minHeight: "180px",
//     width: "250px",  // <-- fixed/reduced width here
//     maxWidth: "100%", // ensures it won't overflow container on small screens
//   }}
//                 >
//                   <div className="relative">
//                     <p
//                       className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full inline-flex items-center gap-1 sm:gap-2 font-semibold 
//                       ${
//                         status === "Live"
//                           ? "bg-green-500 text-white animate-pulse"
//                           : status === "Upcoming"
//                           ? "bg-[#b8cc26] text-black absolute right-2"
//                           : "bg-gray-300 text-black"
//                       }`}
//                       style={
//                         status === "Upcoming"
//                           ? { width: "max-content", top: "-30px", left: "80px" }
//                           : {}
//                       }
//                     >
//                       {status === "Live" ? (
//                         <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       ) : (
//                         <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                       )}
//                       <span>{status}</span>
//                     </p>
//                   </div>

//                   <div
//                     style={{
//                       filter: shouldBlurContent ? "blur(4px)" : "none",
//                       pointerEvents: shouldBlurContent ? "none" : "auto",
//                       marginTop: status === "Upcoming" ? "2.2rem" : "0",
//                     }}
//                   >
//                     <h3 className="text-base sm:text-lg font-semibold text-yellow-300 mb-2 leading-snug">
//                       {phaseNo}
//                     </h3>
//                     <p className="text-xs sm:text-sm text-white mb-1">
//                       <strong>Tokens:</strong> {tokens}
//                     </p>
//                     <p className="text-xs sm:text-sm text-white mb-1">
//                       <strong>Price:</strong> {price}
//                     </p>
//                     <p className="text-xs sm:text-sm text-white mb-4">
//                       <strong>Action:</strong> {button}
//                     </p>
//                     <div className="text-center">
//                       <button className="bg-[#b8cc26] text-teal-900 px-4 sm:px-6 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
//                         {button}
//                       </button>
//                     </div>
//                   </div>
//                 </article>

//                 {idx < phaseData.length - 1 && (
//                   <div
//                     className="absolute md:hidden -bottom-8 w-1 h-16 bg-teal-600"
//                     aria-hidden="true"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// import React from "react";

/**
 * JaimaxRoadmap v2 – matches the original Shutterstock layout closely
 * ------------------------------------------------------------------
 * – Horizontal timeline on desktop (cards sit above a coloured bar & connector)
 * – Stacks vertically on tablets/mobiles (bar disappears / converts to inline)
 * – Only TailwindCSS utilities, no extra CSS file required
 * – Replace emoji placeholders with SVGs / icons as needed
 */

// const roadmapData = [
//   {
//     step: "STEP 01",
//     title: "IDEAS",
//     description: [
//       "Concept development completed",
//       "Tokenomics drafted & reviewed",
//       "White-paper outline ready"
//     ],
//     icon: "💡",
//     progress: "PROGRESS A",
//     bar: "bg-orange-400",
//     card: "bg-orange-50 text-orange-500"
//   },
//   {
//     step: "STEP 02",
//     title: "WORKS",
//     description: [
//       "Smart-contract coding started",
//       "Initial audits scheduled",
//       "Website wireframes done"
//     ],
//     icon: "⚙️",
//     progress: "PROGRESS B",
//     bar: "bg-pink-500",
//     card: "bg-pink-50 text-pink-600"
//   },
//   {
//     step: "STEP 03",
//     title: "VALUE",
//     description: [
//       "Private sale live",
//       "Strategic partnerships inked",
//       "Liquidity planning in motion"
//     ],
//     icon: "📊",
//     progress: "PROGRESS C",
//     bar: "bg-rose-500",
//     card: "bg-rose-50 text-rose-600"
//   },
//   {
//     step: "STEP 04",
//     title: "REFERENCE",
//     description: [
//       "Testnet deployment",
//       "Community testing phase",
//       "Security hardening"
//     ],
//     icon: "📚",
//     progress: "PROGRESS D",
//     bar: "bg-purple-700",
//     card: "bg-purple-50 text-purple-700"
//   },
//   {
//     step: "STEP 05",
//     title: "GROWTH",
//     description: [
//       "Mainnet launch",
//       "Marketing blitz",
//       "Exchange listings"
//     ],
//     icon: "🌱",
//     progress: "PROGRESS E",
//     bar: "bg-indigo-700",
//     card: "bg-indigo-50 text-indigo-700"
//   },
//   {
//     step: "STEP 06",
//     title: "OUR GOAL",
//     description: [
//       "Ecosystem expansion",
//       "Staking & farming",
//       "Global adoption push"
//     ],
//     icon: "🚀",
//     progress: "PROGRESS F",
//     bar: "bg-blue-700",
//     card: "bg-blue-50 text-blue-700"
//   }
// ];

// const JaimaxRoadmap = () => {
//   return (
//     <section className="w-full py-20 px-4 bg-gradient-to-r from-purple-900 via-purple-800 to-gray-900 overflow-x-auto">
//       <h2 className="text-center text-white text-4xl font-bold mb-16 tracking-wider">ROADMAP</h2>

//       {/* ---------- DESKTOP / LARGE ---------- */}
//       <div className="hidden lg:flex lg:space-x-8 max-w-7xl mx-auto relative">
//         {/* progress bar (bottom) */}
//         <div className="absolute bottom-0 left-0 right-0 flex">
//           {roadmapData.map(({ bar }, idx) => (
//             <div key={idx} className={`flex-1 h-6 ${bar}`} />
//           ))}
//         </div>

//         {roadmapData.map((item, idx) => (
//           <div key={idx} className="flex flex-col items-center flex-1 relative">
//             {/* card */}
//             <div
//               className={`w-full rounded-xl shadow-xl ${item.card} p-6 backdrop-blur-sm transition-transform hover:-translate-y-1`}
//             >
//               <p className="text-xs font-bold opacity-80 tracking-widest mb-2">
//                 {item.step}
//               </p>
//               <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
//                 {item.title}
//               </h3>
//               <ul className="space-y-1 text-sm list-disc list-inside opacity-90">
//                 {item.description.map((d, i) => (
//                   <li key={i}>{d}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* connector */}
//             <div className="h-8 w-0.5 bg-white/70" />
//             <div className="w-3 h-3 rounded-full bg-white relative -top-1" />

//             {/* progress label */}
//             <span className="mt-2 text-xs text-white/80 tracking-wide">
//               {item.progress}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* ---------- MOBILE / TABLET ---------- */}
//       <div className="lg:hidden flex flex-col space-y-14 max-w-md mx-auto">
//         {roadmapData.map((item, idx) => (
//           <div key={idx} className="flex flex-col items-center">
//             <div
//               className={`w-full rounded-xl ${item.card} p-6 shadow-lg`}
//             >
//               <p className="text-xs font-bold opacity-80 tracking-widest mb-1">
//                 {item.step}
//               </p>
//               <h3 className="text-lg font-semibold mb-2 uppercase">
//                 {item.title}
//               </h3>
//               <ul className="space-y-1 text-sm list-disc list-inside opacity-90">
//                 {item.description.map((d, i) => (
//                   <li key={i}>{d}</li>
//                 ))}
//               </ul>
//             </div>
//             {/* vertical bar */}
//             <div className="w-1 bg-white h-8" />
//             <div className={`w-full h-4 ${item.bar}`} />
//             <span className="mt-2 text-xs text-white/80 tracking-wide">
//               {item.progress}
//             </span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default JaimaxRoadmap;

// import React, { useState } from "react";

/**
 * JaimaxRoadmap – polished zig‑zag timeline (2024‑2026)
 * --------------------------------------------------------
 * ‣ Gradient background & subtle pattern for better visual depth
 * ‣ Perfected alignment: cards are symmetric around a centre guide
 * ‣ Connector dots + small stem that touches the vertical line
 * ‣ Responsive: single‑column on ≤md, two‑sided zig‑zag on ≥md
 * ‣ Accessible: highlighted focus states on year tab buttons
 * --------------------------------------------------------
 */

// const roadmap = {
//   2024: [
//     {
//       title: "P1 2024: Concept Development and Team Formation",
//       desc: `• Establish the foundational concept of JAIMAX TOKEN\n• Assemble a dedicated team of blockchain experts, developers, marketers, and legal advisors.`,
//     },
//     {
//       title: "P2 2024: Smart Contract Development and Security Audits",
//       desc: `• Develop and deploy JAIMAX TOKEN smart contracts on BSC\n• Conduct thorough security audits to ensure contract security.`,
//     },
//     {
//       title: "P3 2024: Website Launch and Whitepaper Publication",
//       desc: `• Launch the official JAIMAX TOKEN website\n• Publish the detailed whitepaper covering vision and architecture.`,
//     },
//     {
//       title: "P4 2024: Pre-Sale and Public ICO Launch",
//       desc: `• Conduct the pre-sale and ICO of JAIMAX TOKEN\n• Run marketing campaigns to attract investors.`,
//     },
//     {
//       title: "P5 2024: Mobile App Launch",
//       desc: `• Launch mobile apps for Android and iOS\n• Ensure secure and seamless in-app transactions.`,
//     },
//   ],
//   2025: [
//     {
//       title: "P1 2025: Mainnet Launch and DApp Integrations",
//       desc: `• Launch JAIMAX mainnet\n• Integrate with DApps to enhance utility.`,
//     },
//     {
//       title: "P2 2025: Expansion of Use Cases and Ecosystem",
//       desc: `• Broaden use cases in DeFi, NFTs, and payments\n• Collaborate for faster ecosystem growth.`,
//     },
//     {
//       title: "P3 2025: Exchange Listings & Partnerships",
//       desc: `• List on Binance, Coinbase, Gate.io, OKX, etc.\n• Form strategic ecosystem partnerships.`,
//     },
//     {
//       title: "P4 2025: JAIMAX Crypto Exchange Launch",
//       desc: `• Launch JAIMAX Exchange post-token sale\n• Provide multi-crypto trading platform.`,
//     },
//     {
//       title: "P5 2025: Multi-Blockchain Support",
//       desc: `• Enhance JAIMAX interoperability across chains.`,
//     },
//     {
//       title: "P6 2025: Development of JAIMAX Blockchain",
//       desc: `• Build proprietary scalable blockchain\n• Ensure secure, high-performance architecture.`,
//     },
//     {
//       title: "P7 2025: JMC Swap, DApps, and Wallets",
//       desc: `• Launch JMC Swap for token exchanges\n• Deploy JMC Wallets for secure storage.`,
//     },
//     {
//       title: "P8 2025: Market Positioning & Exchange Price",
//       desc: `• Target top 100 on CMC\n• Set listing price around ₹4.0 (USD 0.046).`,
//     },
//   ],
//   2026: [
//     {
//       title: "P1 2026: Crypto Support & Payment Gateway",
//       desc: `• Ensure JAIMAX supports major cryptocurrencies\n• Develop integrated crypto payment gateway.`,
//     },
//     {
//       title: "P2 2026: Global Exchange Listings",
//       desc: `• Continue global listings\n• Strengthen global user base.`,
//     },
//   ],
// };


// const years = Object.keys(roadmap);

// const JaimaxRoadmap = () => {
//   const [activeYear, setActiveYear] = useState(years[0]);

//   return (
  
//     <section className="relative w-full overflow-hidden select-none">
//   {/* Background gradient */}
//   <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-0" />

//   <div className="relative z-10 max-w-8xl mx-auto flex flex-col lg:flex-row justify-between gap-y-16 gap-x-12 py-20 px-4 md:px-10">
//     {/* ---------- LEFT COLUMN ---------- */}
//     <div className="w-full lg:w-[40%] flex flex-col justify-between lg:pr-4">
//       <div>
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-700 leading-tight mb-6">
//           Cryptocurrency <br /> Roadmap
//         </h2>
//         <p className="text-gray-700 dark:text-gray-300 max-w-md mb-10">
//           Explore our phased rollout. Click on a year below to reveal the milestones on Jaimax Coin’s journey.
//         </p>

//         {/* Decorative icons */}
//         <div className="relative w-max">
//           <img
//             src="https://img.icons8.com/ios-filled/100/seedling.png"
//             alt="seedling"
//             className="w-20 absolute -top-8 -left-6 rotate-[-10deg] opacity-90"
//           />
//           <img
//             src="https://img.icons8.com/fluency/144/bitcoin.png"
//             alt="bitcoin"
//             className="w-24 drop-shadow-xl"
//           />
//         </div>
//       </div>
//     </div>

//     {/* ---------- RIGHT COLUMN ---------- */}
//     <div className="w-full lg:w-[58%] relative">
//       {/* Year tabs */}
//       <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
//         {years.map((yr) => (
//           <button
//             key={yr}
//             onClick={() => setActiveYear(yr)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//               activeYear === yr
//                 ? "bg-emerald-600 text-white border-emerald-600 ring-emerald-500"
//                 : "bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-emerald-100 dark:hover:bg-gray-700 focus:ring-emerald-500"
//             }`}
//           >
//             {yr}
//           </button>
//         ))}
//       </div>

//       {/* Vertical center line for desktop */}
//       <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-emerald-600" />

//       {/* Timeline cards */}
//       <div className="relative grid gap-20 md:gap-24">
//         {roadmap[activeYear].map((item, idx) => {
//           const isLeft = idx % 2 === 0;

//           return (
//             <div
//               key={item.title}
//               className={`md:max-w-md w-full relative ${
//                 isLeft ? "md:pr-16 md:mr-auto text-left" : "md:pl-16 md:ml-auto text-left"
//               }`}
//             >
//               {/* Connector Line (Desktop) */}
//               <div
//                 className={`hidden md:block absolute top-6 h-px w-14 bg-emerald-600 ${
//                   isLeft ? "right-0" : "left-0"
//                 }`}
//               />

//               {/* Dot */}
//               <span
//                 className={`hidden md:block absolute top-4 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 bg-emerald-600 ${
//                   isLeft ? "-right-8" : "-left-8"
//                 }`}
//               />

//               {/* Timeline Card */}
//               <div className="p-6 rounded-xl shadow-lg border-l-4 border-emerald-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
//                 <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
//                   {item.title}
//                 </h4>
//                 <p className="text-sm text-gray-700 dark:text-gray-300">
//                   {item.desc}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   </div>
// </section>

//   );
// };

// export default JaimaxRoadmap;



// import React, { useState } from "react";
// import threedimage from "../../assets/3djaimax3.jpg"

// const roadmap = {
//   2024: [
//     {
//       title: "P1 2024: Concept Development and Team Formation",
//       desc: `• Establish the foundational concept of JAIMAX TOKEN\n• Assemble a dedicated team of blockchain experts, developers, marketers, and legal advisors.`,
//       image: "https://source.unsplash.com/600x400/?crypto,team",
//     },
//     {
//       title: "P2 2024: Smart Contract Development and Security Audits",
//       desc: `• Develop and deploy JAIMAX TOKEN smart contracts on BSC\n• Conduct thorough security audits to ensure contract security.`,
//       image: "https://source.unsplash.com/600x400/?blockchain,security",
//     },
//     {
//       title: "P3 2024: Website Launch and Whitepaper Publication",
//       desc: `• Launch the official JAIMAX TOKEN website\n• Publish the detailed whitepaper covering vision and architecture.`,
//       image: "https://source.unsplash.com/600x400/?website,crypto",
//     },
//     {
//       title: "P4 2024: Pre-Sale and Public ICO Launch",
//       desc: `• Conduct the pre-sale and ICO of JAIMAX TOKEN\n• Run marketing campaigns to attract investors.`,
//       image: "https://source.unsplash.com/600x400/?ico,launch",
//     },
//     {
//       title: "P5 2024: Mobile App Launch",
//       desc: `• Launch mobile apps for Android and iOS\n• Ensure secure and seamless in-app transactions.`,
//       image: "https://source.unsplash.com/600x400/?crypto,mobileapp",
//     },
//   ],
//   2025: [
//     {
//       title: "P1 2025: Mainnet Launch and DApp Integrations",
//       desc: `• Launch JAIMAX mainnet\n• Integrate with DApps to enhance utility.`,
//       image: "https://source.unsplash.com/600x400/?blockchain,dapps",
//     },
//     {
//       title: "P2 2025: Expansion of Use Cases and Ecosystem",
//       desc: `• Broaden use cases in DeFi, NFTs, and payments\n• Collaborate for faster ecosystem growth.`,
//       image: "https://source.unsplash.com/600x400/?defi,nft",
//     },
//     {
//       title: "P3 2025: Exchange Listings & Partnerships",
//       desc: `• List on Binance, Coinbase, Gate.io, OKX, etc.\n• Form strategic ecosystem partnerships.`,
//       image: "https://source.unsplash.com/600x400/?crypto,exchange",
//     },
//     {
//       title: "P4 2025: JAIMAX Crypto Exchange Launch",
//       desc: `• Launch JAIMAX Exchange post-token sale\n• Provide multi-crypto trading platform.`,
//       image: "https://source.unsplash.com/600x400/?crypto,platform",
//     },
//     {
//       title: "P5 2025: Multi-Blockchain Support",
//       desc: `• Enhance JAIMAX interoperability across chains.`,
//       image: "https://source.unsplash.com/600x400/?blockchain,interoperability",
//     },
//     {
//       title: "P6 2025: Development of JAIMAX Blockchain",
//       desc: `• Build proprietary scalable blockchain\n• Ensure secure, high-performance architecture.`,
//       image: "https://source.unsplash.com/600x400/?crypto,infrastructure",
//     },
//     {
//       title: "P7 2025: JMC Swap, DApps, and Wallets",
//       desc: `• Launch JMC Swap for token exchanges\n• Deploy JMC Wallets for secure storage.`,
//       image: "https://source.unsplash.com/600x400/?crypto,wallet",
//     },
//     {
//       title: "P8 2025: Market Positioning & Exchange Price",
//       desc: `• Target top 100 on CMC\n• Set listing price around ₹4.0 (USD 0.046).`,
//       image: "https://source.unsplash.com/600x400/?crypto,analytics",
//     },
//   ],
//   2026: [
//     {
//       title: "P1 2026: Crypto Support & Payment Gateway",
//       desc: `• Ensure JAIMAX supports major cryptocurrencies\n• Develop integrated crypto payment gateway.`,
//       image: "https://source.unsplash.com/600x400/?crypto,payment",
//     },
//     {
//       title: "P2 2026: Global Exchange Listings",
//       desc: `• Continue global listings\n• Strengthen global user base.`,
//       image: "https://source.unsplash.com/600x400/?crypto,global",
//     },
//   ],
// };

// const years = Object.keys(roadmap);
// const cardGradientMap = {
//   2024: "bg-[#18a04a]",
//   2025: "bg-[#18a04a]",
//   2026: "bg-[#18a04a]",
// };


// const JaimaxRoadmap = () => {
//   const [activeYear, setActiveYear] = useState(years[0]);

//   return (
// //     <section className="relative w-full overflow-hidden select-none bg-[#085056]">
// //       <div className="relative z-10 max-w-8xl mx-auto flex flex-col lg:flex-row justify-between gap-y-16 gap-x-12 py-20 px-4 md:px-10">
// //        <div className="w-full lg:w-[40%] flex flex-col justify-between lg:pr-4">
// //   <div>
// //     <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
// //       Our Roadmap
// //       <br />
// //       <span className="bg-gradient-to-r from-[#00ffe0] to-[#00ff7f] bg-clip-text text-transparent">
// //         Buy Jaimax, Grow Your Future
// //       </span>
// //     </h2>

// //     <p className="text-white/80 max-w-md mb-8">
// //       Invest in a vision built to scale. Our roadmap is your gateway to opportunity, innovation, and sustainable growth.
// //     </p>

// //     <ul className="space-y-6 text-white/90">
// //       <li className="border-l-4 border-cyan-400 pl-4">
// //         <h4 className="text-lg font-semibold">Phase 1: Trust the Start</h4>
// //         <p className="text-sm text-white/70">
// //           Buy early, join the mission, and become a foundational member of the Jaimax journey.
// //         </p>
// //       </li>
// //       <li className="border-l-4 border-green-400 pl-4">
// //         <h4 className="text-lg font-semibold">Phase 2: Build & Earn</h4>
// //         <p className="text-sm text-white/70">
// //           Enable staking, referrals, and real-time rewards as the ecosystem begins to grow.
// //         </p>
// //       </li>
// //       <li className="border-l-4 border-yellow-400 pl-4">
// //         <h4 className="text-lg font-semibold">Phase 3: Utility in Action</h4>
// //         <p className="text-sm text-white/70">
// //           Launch real-world integrations, payment tools, and token utilities that drive demand.
// //         </p>
// //       </li>
// //       <li className="border-l-4 border-pink-400 pl-4">
// //         <h4 className="text-lg font-semibold">Phase 4: Scale & Sustain</h4>
// //         <p className="text-sm text-white/70">
// //           Expand globally with strategic partners and unlock passive growth for long-term holders.
// //         </p>
// //       </li>
// //     </ul>
// //   </div>
// // </div>


// //         <div className="w-full lg:w-[58%] relative">
// //           <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
// //             {years.map((yr) => (
// //               <button
// //                 key={yr}
// //                 onClick={() => setActiveYear(yr)}
// //                 className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
// //                   activeYear === yr
// //                     ? "bg-white text-[#085056] border-white ring-white"
// //                     : "bg-[#0b616b] text-white border-white/30 hover:bg-[#0d6d76] focus:ring-white"
// //                 }`}
// //               >
// //                 {yr}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-white/40" />

// //           <div className="relative grid gap-20 md:gap-24">
// //             {roadmap[activeYear].map((item, idx) => {
// //               const isLeft = idx % 2 === 0;
// //               const cardColor = cardGradientMap[activeYear];

// //               return (
// //                 <div
// //                   key={item.title}
// //                   className={`md:max-w-md w-full relative ${
// //                     isLeft ? "md:pr-16 md:mr-auto text-left" : "md:pl-16 md:ml-auto text-left"
// //                   }`}
// //                 >
// //                   <div className={`hidden md:block absolute top-6 h-px w-14 bg-white ${isLeft ? "right-0" : "left-0"}`} />

// //                   <span className={`hidden md:block absolute top-4 w-4 h-4 rounded-full border-4 border-[#085056] bg-white ${isLeft ? "-right-8" : "-left-8"}`} />

// //                   <div className={`p-6 rounded-xl shadow-lg border-l-4 border-white ${cardColor}`}>
// //   <h4 className="text-lg text-white font-bold mb-2">{item.title}</h4>
// //   <p className="text-sm whitespace-pre-line">{item.desc}</p>
// // </div>

// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// <section className="relative w-full overflow-hidden select-none bg-[#085056]">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="relative z-10 max-w-8xl mx-auto lg:flex justify-between gap-x-12 py-20 px-4 md:px-10">
//         <div className="w-full lg:w-[40%] lg:pr-4 mb-16 lg:mb-0">
//           <div>
//             <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 animate-fade-in">
//               Our Roadmap
//               <br />
//               <span className="bg-gradient-to-r from-[#00ffe0] to-[#00ff7f] bg-clip-text text-transparent animate-pulse">
//                 Buy Jaimax, Grow Your Future
//               </span>
//             </h2>

//             <p className="text-white/80 max-w-md mb-8 animate-fade-in delay-200">
//               Invest in a vision built to scale. Our roadmap is your gateway to opportunity, innovation, and sustainable growth.
//             </p>

//             <ul className="space-y-6 text-white/90">
//               <li className="border-l-4 border-cyan-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-300">
//                 <h4 className="text-lg font-semibold">Phase 1: Trust the Start</h4>
//                 <p className="text-sm text-white/70">
//                   Buy early, join the mission, and become a foundational member of the Jaimax journey.
//                 </p>
//               </li>
//               <li className="border-l-4 border-green-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-400">
//                 <h4 className="text-lg font-semibold">Phase 2: Build & Earn</h4>
//                 <p className="text-sm text-white/70">
//                   Enable staking, referrals, and real-time rewards as the ecosystem begins to grow.
//                 </p>
//               </li>
//               <li className="border-l-4 border-yellow-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-500">
//                 <h4 className="text-lg font-semibold">Phase 3: Utility in Action</h4>
//                 <p className="text-sm text-white/70">
//                   Launch real-world integrations, payment tools, and token utilities that drive demand.
//                 </p>
//               </li>
//               <li className="border-l-4 border-pink-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-600">
//                 <h4 className="text-lg font-semibold">Phase 4: Scale & Sustain</h4>
//                 <p className="text-sm text-white/70">
//                   Expand globally with strategic partners and unlock passive growth for long-term holders.
//                 </p>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="w-full lg:w-[58%] relative">
//           <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
//             {years.map((yr, idx) => (
//               <button
//                 key={yr}
//                 onClick={() => setActiveYear(yr)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-fade-in ${
//                   activeYear === yr
//                     ? "bg-white text-[#085056] border-white ring-white shadow-lg scale-105"
//                     : "bg-[#0b616b] text-white border-white/30 hover:bg-[#0d6d76] hover:shadow-lg focus:ring-white"
//                 }`}
//                 style={{ animationDelay: `${idx * 100}ms` }}
//               >
//                 {yr}
//               </button>
//             ))}
//           </div>

//           <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-white/40 via-white/60 to-white/40" />

//           <div className="relative grid gap-20 md:gap-24">
//             {roadmap[activeYear].map((item, idx) => {
//               const isLeft = idx % 2 === 0;
//               const cardColor = cardGradientMap[activeYear];

//               return (
//                 <div
//                   key={item.title}
//                   className={`md:max-w-md w-full relative transition-all duration-500 hover:scale-105 animate-slide-in ${
//                     isLeft ? "md:pr-16 md:mr-auto text-left" : "md:pl-16 md:ml-auto text-left"
//                   }`}
//                   style={{ animationDelay: `${idx * 200}ms` }}
//                 >
//                   <div className={`hidden md:block absolute top-6 h-px w-14 bg-gradient-to-r from-white to-cyan-400 transition-all duration-300 hover:w-16 ${isLeft ? "right-0" : "left-0"}`} />

//                   <span className={`hidden md:block absolute top-4 w-4 h-4 rounded-full border-4 border-[#085056] bg-white transition-all duration-300 hover:bg-cyan-400 hover:scale-125 hover:shadow-lg hover:shadow-cyan-400/50 ${isLeft ? "-right-8" : "-left-8"}`} />

//                   <div className={`p-6 rounded-xl shadow-lg border-l-4 border-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-l-8 hover:border-cyan-400 cursor-pointer group ${cardColor}`}>
//                     <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
//                     <h4 className="text-lg text-white font-bold mb-2 transition-all duration-300 group-hover:text-cyan-300 group-hover:text-xl relative z-10">{item.title}</h4>
//                     <p className="text-sm whitespace-pre-line text-white/70 group-hover:text-white/90 transition-all duration-300 relative z-10">{item.desc}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JaimaxRoadmap;




  // import { useState, useRef, useEffect, useCallback } from 'react';
  // import { debounce } from 'lodash';

  // const roadmapData = {
  //   2024: [
  //     {
  //       id: 'p1-2024',
  //       phase: "Phase 1",
  //       title: "Concept Development",
  //       description: "Foundation building with core team assembly and strategic planning frameworks.",
  //       tags: ["Team Formation", "Strategy", "Planning"],
  //       icon: "🚀",
  //       progress: 100,
  //       status: "completed"
  //     },
  //     {
  //       id: 'p2-2024',
  //       phase: "Phase 2",
  //       title: "Smart Contract Development",
  //       description: "Advanced blockchain architecture with security audits and protocols.",
  //       tags: ["Smart Contracts", "Security", "Blockchain"],
  //       icon: "🔒",
  //       progress: 85,
  //       status: "active"
  //     },
  //     {
  //       id: 'p3-2024',
  //       phase: "Phase 3",
  //       title: "Platform Development",
  //       description: "Digital platform with comprehensive documentation and specifications.",
  //       tags: ["Platform", "Documentation", "UI/UX"],
  //       icon: "📄",
  //       progress: 70,
  //       status: "active"
  //     },
  //     {
  //       id: 'p4-2024',
  //       phase: "Phase 4",
  //       title: "Token Launch",
  //       description: "Token launch with comprehensive marketing and fundraising campaigns.",
  //       tags: ["Token", "Marketing", "Fundraising"],
  //       icon: "💰",
  //       progress: 40,
  //       status: "upcoming"
  //     },
  //     {
  //       id: 'p5-2024',
  //       phase: "Phase 5",
  //       title: "Mobile App Launch",
  //       description: "Cross-platform mobile applications with seamless user experience.",
  //       tags: ["Mobile", "Cross-Platform", "UX"],
  //       icon: "📱",
  //       progress: 25,
  //       status: "upcoming"
  //     },
  //   ],
  //   2025: [
  //     {
  //       id: 'p1-2025',
  //       phase: "Phase 1",
  //       title: "AI Integration",
  //       description: "Advanced AI features with machine learning capabilities and automation.",
  //       tags: ["AI", "Machine Learning", "Automation"],
  //       icon: "🤖",
  //       progress: 15,
  //       status: "future"
  //     },
  //     {
  //       id: 'p2-2025',
  //       phase: "Phase 2",
  //       title: "Metaverse Platform",
  //       description: "Virtual reality ecosystem with NFT integration and digital assets.",
  //       tags: ["Metaverse", "VR", "NFTs"],
  //       icon: "🌐",
  //       progress: 10,
  //       status: "future"
  //     },
  //     {
  //       id: 'p3-2025',
  //       phase: "Phase 3",
  //       title: "DeFi Ecosystem",
  //       description: "Decentralized finance platform with yield farming and staking.",
  //       tags: ["DeFi", "Yield Farming", "Staking"],
  //       icon: "⚡",
  //       progress: 5,
  //       status: "future"
  //     },
  //     {
  //       id: 'p4-2025',
  //       phase: "Phase 4",
  //       title: "Global Expansion",
  //       description: "Worldwide market penetration with strategic partnerships.",
  //       tags: ["Global", "Partnerships", "Expansion"],
  //       icon: "🌍",
  //       progress: 3,
  //       status: "future"
  //     },
  //   ],
  //   2026: [
  //     {
  //       id: 'p1-2026',
  //       phase: "Phase 1",
  //       title: "Advanced Technology",
  //       description: "Next-generation features with quantum integration and security.",
  //       tags: ["Quantum", "Advanced Tech", "Security"],
  //       icon: "⚛️",
  //       progress: 0,
  //       status: "future"
  //     },
  //     {
  //       id: 'p2-2026',
  //       phase: "Phase 2",
  //       title: "Neural Networks",
  //       description: "Brain-computer interface and advanced neural processing systems.",
  //       tags: ["Neural", "BCI", "Processing"],
  //       icon: "🧠",
  //       progress: 0,
  //       status: "future"
  //     },
  //     {
  //       id: 'p3-2026',
  //       phase: "Phase 3",
  //       title: "Space Integration",
  //       description: "Satellite-based infrastructure and interplanetary connectivity.",
  //       tags: ["Space", "Satellites", "Infrastructure"],
  //       icon: "🛰️",
  //       progress: 0,
  //       status: "future"
  //     },
  //     {
  //       id: 'p4-2026',
  //       phase: "Phase 4",
  //       title: "Universal Adoption",
  //       description: "Complete global transformation and mass market adoption.",
  //       tags: ["Universal", "Global", "Adoption"],
  //       icon: "🌟",
  //       progress: 0,
  //       status: "future"
  //     },
  //   ],
  // };

  // function flattenRoadmap(data) {
  //   return Object.entries(data).flatMap(([year, phases]) =>
  //     phases.map((phase) => ({ ...phase, year }))
  //   );
  // }

  // export default function RoadmapTimeline() {
  //   const phases = flattenRoadmap(roadmapData);
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
  //     <div
  //       className="relative min-h-screen text-white overflow-hidden flex flex-col items-center justify-center"
  //       style={{
  //         // background: 'linear-gradient(135deg, #bace27, #185e64)',
  //       }}
  //     >
  //       <div className="relative inline-block">
  //         <div className="absolute -inset-6  rounded-full blur-2xl opacity-15 animate-pulse"></div>
  //         <h1 className="relative text-5xl md:text-7xl font-black bg-gradient-to-r from-[#005358] via-[#00a3b5] to-[#00c2d1] bg-clip-text text-transparent font-mono tracking-tighter hover:scale-103 transition-transform duration-500 cursor-default">
  //           PROJECT NEXUS
  //         </h1>
  //       </div>
  //       <p
  //         className="text-xl md:text-xl text-[#00a3b5] font-light tracking-[0.15em] uppercase mt-3 hover:tracking-[0.2em] transition-all duration-300"
  //         style={{
  //           animation: 'subtitleFloat 3s ease-in-out infinite',
  //         }}
  //       >
  //         the name at the middle
  //       </p>

  //       <div className="flex justify-center py-16 min-h-screen">
  //         <div className="relative z-10 text-center py-16 px-4">
  //           <div className="relative max-w-4xl w-full px-6">
  //             {/* Vertical timeline line */}
  //             <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full"></div>

  //             <div className="space-y-24">
  //               {phases.map((phase, i) => {
  //                 const isActive = i <= activeIndex;

  //                 return (
  //                   <div
  //                     key={phase.id}
  //                     className={`relative flex items-center max-w-3xl gap-4 transition-all duration-700 ease-in-out
  //                   ${isActive ? 'opacity-100' : 'opacity-30'}
  //                 `}
  //                     style={{ willChange: 'opacity' }}
  //                   >
  //                     {/* Circle */}
  //                     <div
  //                       ref={(el) => (refs.current[i] = el)}
  //                       data-index={i}
  //                       className={`z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center text-2xl cursor-default select-none shadow-lg
  //                     transition-all duration-500 ease-out
  //                     ${isActive
  //                           ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 text-white scale-110 shadow-blue-500/50'
  //                           : 'bg-white border-gray-300 text-gray-400 scale-90 shadow-gray-300/30'
  //                         }`}
  //                       style={{ marginLeft: '-2.25rem' }}
  //                     >
  //                       {phase.icon}
  //                     </div>

  //                     {/* Horizontal line */}
  //                     <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded"></div>

  //                     {/* Card with new styling */}
  //                     <div
  //                       className={`relative group flex-1 transition-all duration-500 ease-out
  //                     ${isActive ? 'scale-100' : 'scale-95'} hover:scale-105`}
  //                     >
  //                       {/* Glass morphism background */}
  //                       <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl"></div>
                        
  //                       {/* Colored accent border based on status */}
  //                       <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300
  //                         ${phase.status === 'completed' 
  //                           ? 'border-emerald-400/50 shadow-emerald-400/20' 
  //                           : phase.status === 'active' 
  //                           ? 'border-amber-400/50 shadow-amber-400/20' 
  //                           : 'border-slate-400/30 shadow-slate-400/10'
  //                         }`}>
  //                       </div>

  //                       {/* Card content */}
  //                       <div className="relative p-8 rounded-2xl">
  //                         {/* Header */}
  //                         <div className="flex justify-between items-start mb-4">
  //                           <div className="flex items-center gap-3">
  //                             <span className="text-sm font-bold text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
  //                               {phase.year}
  //                             </span>
  //                             <span className="text-sm font-semibold text-white/70">
  //                               {phase.phase}
  //                             </span>
  //                           </div>
  //                           <div
  //                             className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
  //                             ${phase.status === 'completed'
  //                                 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
  //                                 : phase.status === 'active'
  //                                 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
  //                                 : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
  //                               }`}
  //                           >
  //                             {phase.status}
  //                           </div>
  //                         </div>

  //                         {/* Title */}
  //                         <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors duration-300">
  //                           {phase.title}
  //                         </h3>

  //                         {/* Description */}
  //                         <p className="text-white/80 mb-6 leading-relaxed">
  //                           {phase.description}
  //                         </p>

  //                         {/* Progress bar */}
  //                         <div className="mb-4">
  //                           <div className="flex justify-between items-center mb-2">
  //                             <span className="text-xs font-semibold text-white/70">Progress</span>
  //                             <span className="text-xs font-bold text-white">{phase.progress}%</span>
  //                           </div>
  //                           <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
  //                             <div 
  //                               className={`h-full rounded-full transition-all duration-700 ease-out
  //                                 ${phase.status === 'completed' 
  //                                   ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
  //                                   : phase.status === 'active' 
  //                                   ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
  //                                   : 'bg-gradient-to-r from-slate-400 to-slate-500'
  //                                 }`}
  //                               style={{ width: `${phase.progress}%` }}
  //                             ></div>
  //                           </div>
  //                         </div>

  //                         {/* Tags */}
  //                         <div className="flex flex-wrap gap-2">
  //                           {phase.tags.map((tag) => (
  //                             <span
  //                               key={tag}
  //                               className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
  //                             >
  //                               {tag}
  //                             </span>
  //                           ))}
  //                         </div>
  //                       </div>

  //                       {/* Subtle glow effect */}
  //                       <div className={`absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur transition-opacity duration-500
  //                         ${phase.status === 'completed' 
  //                           ? 'from-emerald-400 to-emerald-600' 
  //                           : phase.status === 'active' 
  //                           ? 'from-amber-400 to-amber-600' 
  //                           : 'from-slate-400 to-slate-600'
  //                         }`}>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }




// import { useState, useRef, useEffect, useCallback } from 'react';
// import { debounce } from 'lodash';

// const roadmapData = {
//   2024: {
//     title: "Foundation & Launch",
//     status: "active",
//     progress: 65,
//     phases: [
//       " Concept Development - Team assembly and planning",
//       " Smart Contract Development - Blockchain architecture",
//       " Platform Development - Digital platform creation",
//       " Token Launch - Marketing and fundraising",
//       " Mobile App Launch - Cross-platform apps"
//     ]
//   },
//   2025: {
//     title: "Innovation & Expansion",
//     status: "future",
//     progress: 0,
//     phases: [
//       " AI Integration - Machine learning features",
//       " Metaverse Platform - VR ecosystem with NFTs",
//       " DeFi Ecosystem - Yield farming and staking",
//       " Global Expansion - Strategic partnerships"
//     ]
//   },
//   2026: {
//     title: "Future Technology",
//     status: "future",
//     progress: 0,
//     phases: [
//       " Advanced Technology - Quantum integration",
//       " Neural Networks - Brain-computer interface",
//       " Space Integration - Satellite infrastructure",
//       " Universal Adoption - Global transformation"
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
//     <div className="min-h-screen  text-white">
//       {/* Header */}
//       <div className="text-center py-12 px-4">
//         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">
//           PROJECT NEXUS
//         </h1>
//         <p className="text-teal-400 text-sm uppercase tracking-wide">Roadmap Timeline</p>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
//           {/* Left Side Image */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className=" ">
//                 <img 
//                   src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/road_map.png" 
//                   alt="Roadmap Illustration" 
//                   className=" h-[500px]  opacity-60"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Side Timeline */}
//           <div className="lg:col-span-3">
//             <div className="relative">
//               {/* Vertical line */}
//               <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-cyan-500"></div>

//           <div className="space-y-8">
//             {years.map(([year, yearData], i) => {
//               const isActive = i <= activeIndex;

//               return (
//                 <div
//                   key={year}
//                   className={`relative transition-all duration-500 ${
//                     isActive ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-2'
//                   }`}
//                 >
//                   {/* Year Circle */}
//                   <div
//                     ref={(el) => (refs.current[i] = el)}
//                     data-index={i}
//                     className={`absolute left-0 w-12 h-12 rounded-full border-3 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
//                       isActive
//                         ? 'bg-teal-500 border-teal-400 text-white scale-110'
//                         : 'bg-slate-700 border-slate-600 text-slate-400'
//                     }`}
//                   >
//                     {year}
//                   </div>

//                   {/* Content Card */}
//                   <div className="ml-20 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6 hover:border-teal-500/50 transition-all duration-300 w-100">
//                     {/* Header */}
//                     <div className="flex justify-between items-center mb-0">
//                       <h3 className="text-xl font-bold text-white">{yearData.title}</h3>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//                           yearData.status === 'active'
//                             ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
//                             : 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
//                         }`}
//                       >
//                         {yearData.status}
//                       </span>
//                     </div>
//                     <div className="space-y-2">
//                       {yearData.phases.map((phase, phaseIndex) => (
//                         <div key={phaseIndex} className="text-sm text-slate-300 flex items-start">
//                           <span className="mr-2 mt-0.5 text-base">{phase.split(' ')[0]}</span>
//                           <span>{phase.substring(phase.indexOf(' ') + 1)}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

const roadmapData = {
  2024: {
    title: "Foundation & Launch",
    status: "active",
    progress: 65,
    phases: [
      "• Concept Development - Team assembly and planning",
      "• Smart Contract Development - Blockchain architecture",
      "• Platform Development - Digital platform creation",
      "• Token Launch - Marketing and fundraising",
      "• Mobile App Launch - Cross-platform apps"
    ]
  },
  2025: {
    title: "Innovation & Expansion",
    status: "future",
    progress: 0,
    phases: [
      "• AI Integration - Machine learning features",
      "• Metaverse Platform - VR ecosystem with NFTs",
      "• DeFi Ecosystem - Yield farming and staking",
      "• Global Expansion - Strategic partnerships"
    ]
  },
  2026: {
    title: "Future Technology",
    status: "future",
    progress: 0,
    phases: [
      "• Advanced Technology - Quantum integration",
      "• Neural Networks - Brain-computer interface",
      "• Space Integration - Satellite infrastructure",
      "• Universal Adoption - Global transformation"
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
    <div className="min-h-screen  text-white">
      {/* Header */}
      <div className="text-center py-8 md:py-12 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-2">
          PROJECT NEXUS
        </h1>
        <p className="text-teal-400 text-xs md:text-sm uppercase tracking-wide">Roadmap Timeline</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8">
              <div className="relative">
                <img 
                  src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/road_map.png" 
                  alt="Roadmap Illustration" 
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
                      className={`relative transition-all duration-700 ease-out ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-2'
                      }`}
                    >
                      {/* Year Circle */}
                      <div
                        ref={(el) => (refs.current[i] = el)}
                        data-index={i}
                        className={`absolute left-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-3 flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-500 z-10 ${
                          isActive
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 border-teal-300 text-white scale-110 shadow-lg shadow-teal-500/50'
                            : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {year}
                      </div>

                      {/* Connecting Line */}
                      <div className={`absolute left-4 md:left-6 top-4 md:top-6 w-8 md:w-12 h-0.5 transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 opacity-80' 
                          : 'bg-slate-600 opacity-40'
                      }`}></div>

                      {/* Content Card */}
                      <div className="ml-12 md:ml-20 relative">
                        <div className={`bg-slate-800/60 backdrop-blur-sm rounded-xl border transition-all duration-500 p-4 md:p-6 hover:transform hover:scale-105 hover:shadow-xl ${
                          isActive 
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
                              className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold uppercase transition-all duration-300 ${
                                yearData.status === 'active'
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
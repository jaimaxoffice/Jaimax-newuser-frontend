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

// /**
//  * JaimaxRoadmap v2 – matches the original Shutterstock layout closely
//  * ------------------------------------------------------------------
//  * – Horizontal timeline on desktop (cards sit above a coloured bar & connector)
//  * – Stacks vertically on tablets/mobiles (bar disappears / converts to inline)
//  * – Only TailwindCSS utilities, no extra CSS file required
//  * – Replace emoji placeholders with SVGs / icons as needed
//  */

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



import React, { useState } from "react";
import threedimage from "../../assets/3djaimax3.jpg"

const roadmap = {
  2024: [
    {
      title: "P1 2024: Concept Development and Team Formation",
      desc: `• Establish the foundational concept of JAIMAX TOKEN\n• Assemble a dedicated team of blockchain experts, developers, marketers, and legal advisors.`,
      image: "https://source.unsplash.com/600x400/?crypto,team",
    },
    {
      title: "P2 2024: Smart Contract Development and Security Audits",
      desc: `• Develop and deploy JAIMAX TOKEN smart contracts on BSC\n• Conduct thorough security audits to ensure contract security.`,
      image: "https://source.unsplash.com/600x400/?blockchain,security",
    },
    {
      title: "P3 2024: Website Launch and Whitepaper Publication",
      desc: `• Launch the official JAIMAX TOKEN website\n• Publish the detailed whitepaper covering vision and architecture.`,
      image: "https://source.unsplash.com/600x400/?website,crypto",
    },
    {
      title: "P4 2024: Pre-Sale and Public ICO Launch",
      desc: `• Conduct the pre-sale and ICO of JAIMAX TOKEN\n• Run marketing campaigns to attract investors.`,
      image: "https://source.unsplash.com/600x400/?ico,launch",
    },
    {
      title: "P5 2024: Mobile App Launch",
      desc: `• Launch mobile apps for Android and iOS\n• Ensure secure and seamless in-app transactions.`,
      image: "https://source.unsplash.com/600x400/?crypto,mobileapp",
    },
  ],
  2025: [
    {
      title: "P1 2025: Mainnet Launch and DApp Integrations",
      desc: `• Launch JAIMAX mainnet\n• Integrate with DApps to enhance utility.`,
      image: "https://source.unsplash.com/600x400/?blockchain,dapps",
    },
    {
      title: "P2 2025: Expansion of Use Cases and Ecosystem",
      desc: `• Broaden use cases in DeFi, NFTs, and payments\n• Collaborate for faster ecosystem growth.`,
      image: "https://source.unsplash.com/600x400/?defi,nft",
    },
    {
      title: "P3 2025: Exchange Listings & Partnerships",
      desc: `• List on Binance, Coinbase, Gate.io, OKX, etc.\n• Form strategic ecosystem partnerships.`,
      image: "https://source.unsplash.com/600x400/?crypto,exchange",
    },
    {
      title: "P4 2025: JAIMAX Crypto Exchange Launch",
      desc: `• Launch JAIMAX Exchange post-token sale\n• Provide multi-crypto trading platform.`,
      image: "https://source.unsplash.com/600x400/?crypto,platform",
    },
    {
      title: "P5 2025: Multi-Blockchain Support",
      desc: `• Enhance JAIMAX interoperability across chains.`,
      image: "https://source.unsplash.com/600x400/?blockchain,interoperability",
    },
    {
      title: "P6 2025: Development of JAIMAX Blockchain",
      desc: `• Build proprietary scalable blockchain\n• Ensure secure, high-performance architecture.`,
      image: "https://source.unsplash.com/600x400/?crypto,infrastructure",
    },
    {
      title: "P7 2025: JMC Swap, DApps, and Wallets",
      desc: `• Launch JMC Swap for token exchanges\n• Deploy JMC Wallets for secure storage.`,
      image: "https://source.unsplash.com/600x400/?crypto,wallet",
    },
    {
      title: "P8 2025: Market Positioning & Exchange Price",
      desc: `• Target top 100 on CMC\n• Set listing price around ₹4.0 (USD 0.046).`,
      image: "https://source.unsplash.com/600x400/?crypto,analytics",
    },
  ],
  2026: [
    {
      title: "P1 2026: Crypto Support & Payment Gateway",
      desc: `• Ensure JAIMAX supports major cryptocurrencies\n• Develop integrated crypto payment gateway.`,
      image: "https://source.unsplash.com/600x400/?crypto,payment",
    },
    {
      title: "P2 2026: Global Exchange Listings",
      desc: `• Continue global listings\n• Strengthen global user base.`,
      image: "https://source.unsplash.com/600x400/?crypto,global",
    },
  ],
};

const years = Object.keys(roadmap);
const cardGradientMap = {
  2024: "bg-[#18a04a]",
  2025: "bg-[#18a04a]",
  2026: "bg-[#18a04a]",
};


const JaimaxRoadmap = () => {
  const [activeYear, setActiveYear] = useState(years[0]);

  return (
//     <section className="relative w-full overflow-hidden select-none bg-[#085056]">
//       <div className="relative z-10 max-w-8xl mx-auto flex flex-col lg:flex-row justify-between gap-y-16 gap-x-12 py-20 px-4 md:px-10">
//        <div className="w-full lg:w-[40%] flex flex-col justify-between lg:pr-4">
//   <div>
//     <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
//       Our Roadmap
//       <br />
//       <span className="bg-gradient-to-r from-[#00ffe0] to-[#00ff7f] bg-clip-text text-transparent">
//         Buy Jaimax, Grow Your Future
//       </span>
//     </h2>

//     <p className="text-white/80 max-w-md mb-8">
//       Invest in a vision built to scale. Our roadmap is your gateway to opportunity, innovation, and sustainable growth.
//     </p>

//     <ul className="space-y-6 text-white/90">
//       <li className="border-l-4 border-cyan-400 pl-4">
//         <h4 className="text-lg font-semibold">Phase 1: Trust the Start</h4>
//         <p className="text-sm text-white/70">
//           Buy early, join the mission, and become a foundational member of the Jaimax journey.
//         </p>
//       </li>
//       <li className="border-l-4 border-green-400 pl-4">
//         <h4 className="text-lg font-semibold">Phase 2: Build & Earn</h4>
//         <p className="text-sm text-white/70">
//           Enable staking, referrals, and real-time rewards as the ecosystem begins to grow.
//         </p>
//       </li>
//       <li className="border-l-4 border-yellow-400 pl-4">
//         <h4 className="text-lg font-semibold">Phase 3: Utility in Action</h4>
//         <p className="text-sm text-white/70">
//           Launch real-world integrations, payment tools, and token utilities that drive demand.
//         </p>
//       </li>
//       <li className="border-l-4 border-pink-400 pl-4">
//         <h4 className="text-lg font-semibold">Phase 4: Scale & Sustain</h4>
//         <p className="text-sm text-white/70">
//           Expand globally with strategic partners and unlock passive growth for long-term holders.
//         </p>
//       </li>
//     </ul>
//   </div>
// </div>


//         <div className="w-full lg:w-[58%] relative">
//           <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
//             {years.map((yr) => (
//               <button
//                 key={yr}
//                 onClick={() => setActiveYear(yr)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//                   activeYear === yr
//                     ? "bg-white text-[#085056] border-white ring-white"
//                     : "bg-[#0b616b] text-white border-white/30 hover:bg-[#0d6d76] focus:ring-white"
//                 }`}
//               >
//                 {yr}
//               </button>
//             ))}
//           </div>

//           <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-white/40" />

//           <div className="relative grid gap-20 md:gap-24">
//             {roadmap[activeYear].map((item, idx) => {
//               const isLeft = idx % 2 === 0;
//               const cardColor = cardGradientMap[activeYear];

//               return (
//                 <div
//                   key={item.title}
//                   className={`md:max-w-md w-full relative ${
//                     isLeft ? "md:pr-16 md:mr-auto text-left" : "md:pl-16 md:ml-auto text-left"
//                   }`}
//                 >
//                   <div className={`hidden md:block absolute top-6 h-px w-14 bg-white ${isLeft ? "right-0" : "left-0"}`} />

//                   <span className={`hidden md:block absolute top-4 w-4 h-4 rounded-full border-4 border-[#085056] bg-white ${isLeft ? "-right-8" : "-left-8"}`} />

//                   <div className={`p-6 rounded-xl shadow-lg border-l-4 border-white ${cardColor}`}>
//   <h4 className="text-lg text-white font-bold mb-2">{item.title}</h4>
//   <p className="text-sm whitespace-pre-line">{item.desc}</p>
// </div>

//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
<section className="relative w-full overflow-hidden select-none bg-[#085056]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto lg:flex justify-between gap-x-12 py-20 px-4 md:px-10">
        <div className="w-full lg:w-[40%] lg:pr-4 mb-16 lg:mb-0">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6 animate-fade-in">
              Our Roadmap
              <br />
              <span className="bg-gradient-to-r from-[#00ffe0] to-[#00ff7f] bg-clip-text text-transparent animate-pulse">
                Buy Jaimax, Grow Your Future
              </span>
            </h2>

            <p className="text-white/80 max-w-md mb-8 animate-fade-in delay-200">
              Invest in a vision built to scale. Our roadmap is your gateway to opportunity, innovation, and sustainable growth.
            </p>

            <ul className="space-y-6 text-white/90">
              <li className="border-l-4 border-cyan-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-300">
                <h4 className="text-lg font-semibold">Phase 1: Trust the Start</h4>
                <p className="text-sm text-white/70">
                  Buy early, join the mission, and become a foundational member of the Jaimax journey.
                </p>
              </li>
              <li className="border-l-4 border-green-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-400">
                <h4 className="text-lg font-semibold">Phase 2: Build & Earn</h4>
                <p className="text-sm text-white/70">
                  Enable staking, referrals, and real-time rewards as the ecosystem begins to grow.
                </p>
              </li>
              <li className="border-l-4 border-yellow-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-500">
                <h4 className="text-lg font-semibold">Phase 3: Utility in Action</h4>
                <p className="text-sm text-white/70">
                  Launch real-world integrations, payment tools, and token utilities that drive demand.
                </p>
              </li>
              <li className="border-l-4 border-pink-400 pl-4 transition-all duration-300 hover:border-l-8 hover:pl-6 hover:bg-white/5 hover:backdrop-blur-sm rounded-r-lg py-2 animate-fade-in delay-600">
                <h4 className="text-lg font-semibold">Phase 4: Scale & Sustain</h4>
                <p className="text-sm text-white/70">
                  Expand globally with strategic partners and unlock passive growth for long-term holders.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-[58%] relative">
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
            {years.map((yr, idx) => (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-fade-in ${
                  activeYear === yr
                    ? "bg-white text-[#085056] border-white ring-white shadow-lg scale-105"
                    : "bg-[#0b616b] text-white border-white/30 hover:bg-[#0d6d76] hover:shadow-lg focus:ring-white"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {yr}
              </button>
            ))}
          </div>

          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-white/40 via-white/60 to-white/40" />

          <div className="relative grid gap-20 md:gap-24">
            {roadmap[activeYear].map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const cardColor = cardGradientMap[activeYear];

              return (
                <div
                  key={item.title}
                  className={`md:max-w-md w-full relative transition-all duration-500 hover:scale-105 animate-slide-in ${
                    isLeft ? "md:pr-16 md:mr-auto text-left" : "md:pl-16 md:ml-auto text-left"
                  }`}
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div className={`hidden md:block absolute top-6 h-px w-14 bg-gradient-to-r from-white to-cyan-400 transition-all duration-300 hover:w-16 ${isLeft ? "right-0" : "left-0"}`} />

                  <span className={`hidden md:block absolute top-4 w-4 h-4 rounded-full border-4 border-[#085056] bg-white transition-all duration-300 hover:bg-cyan-400 hover:scale-125 hover:shadow-lg hover:shadow-cyan-400/50 ${isLeft ? "-right-8" : "-left-8"}`} />

                  <div className={`p-6 rounded-xl shadow-lg border-l-4 border-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-l-8 hover:border-cyan-400 cursor-pointer group ${cardColor}`}>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <h4 className="text-lg text-white font-bold mb-2 transition-all duration-300 group-hover:text-cyan-300 group-hover:text-xl relative z-10">{item.title}</h4>
                    <p className="text-sm whitespace-pre-line text-white/70 group-hover:text-white/90 transition-all duration-300 relative z-10">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JaimaxRoadmap;

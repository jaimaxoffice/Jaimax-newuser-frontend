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

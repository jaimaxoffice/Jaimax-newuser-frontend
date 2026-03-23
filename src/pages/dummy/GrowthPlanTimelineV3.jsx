
// import React, { useState, useEffect } from "react";
// import { CheckCircle, ShoppingCart, Lock, Zap, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// /* ─────────────────────────────────
//    DATA
// ───────────────────────────────── */
// const PHASES = [
//   { status: "Completed",   phaseNo: "Phase 1", num: "01", tokens: "10 Billion",  suffix: "Tokens Distributed", price: "INR 0.01 – 0.04 Paisa", usd: "0.00012 – 0.00044 USD" },
//   { status: "Live",        phaseNo: "Phase 2", num: "02", tokens: "20 Billion",  suffix: "Tokens Available",   price: "INR 0.05 – 0.50 Paisa", usd: "0.00061 – 0.0061 USD"  },
//   { status: "ComingSoon",  phaseNo: "Phase 3", num: "03", tokens: "25 Billion",  suffix: "Tokens Planned",     price: "INR 0.60 – 1.53 Paisa", usd: "0.0071 – 0.018 USD"    },
//   { status: "ComingSoon",  phaseNo: "Phase 4", num: "04", tokens: "30 Billion",  suffix: "Tokens Planned",     price: "INR 1.60 – 3.00 Paisa", usd: "0.019 – 0.036 USD"     },
//   { status: "ComingSoon",  phaseNo: "Phase 5", num: "05", tokens: "25 Billion",  suffix: "Tokens Planned",     price: "INR 3.15 – 4.10 Paisa", usd: "0.037 – 0.049 USD"     },
// ];

// /* ─────────────────────────────────
//    LAYOUT CONSTANTS
// ───────────────────────────────── */
// const CARD_H = 228;
// const VGAP   = 40;
// const VB_W   = 1000;
// const L_X2   = 360, L_CX = 230;
// const R_X1   = 640, R_CX = 790;

// const TOPS = (() => {
//   const t = []; let y = 0;
//   PHASES.forEach(() => { t.push(y); y += CARD_H + VGAP; });
//   return t;
// })();
// const TOTAL_H = TOPS[TOPS.length - 1] + CARD_H;

// /* ─────────────────────────────────
//    KEYFRAMES
// ───────────────────────────────── */
// function useKeyframes() {
//   useEffect(() => {
//     const id = "gpt-kf-v6";
//     if (document.getElementById(id)) return;
//     const s = document.createElement("style");
//     s.id = id;
//     s.textContent = `
//       @keyframes shimmer {
//         0%   { transform: translateX(0) rotate(10deg); opacity: 0 }
//         8%   { opacity: 1 }
//         65%  { transform: translateX(600px) rotate(10deg); opacity: 1 }
//         75%  { opacity: 0 }
//         100% { transform: translateX(600px) rotate(10deg); opacity: 0 }
//       }
//       @keyframes lping {
//         0%   { transform: scale(1);   opacity: 0.75 }
//         70%  { transform: scale(2.4); opacity: 0 }
//         100% { transform: scale(2.4); opacity: 0 }
//       }
//     `;
//     document.head.appendChild(s);
//     return () => document.getElementById(id)?.remove();
//   }, []);
// }

// /* ─────────────────────────────────
//    PILL BADGE
// ───────────────────────────────── */
// function PillBadge({ status }) {
//   const isCompleted = status === "Completed";
//   return (
//     <div className={`absolute flex items-center top-6 left-4 justify-center z-10 p-2 rounded-full border ${isCompleted ? "bg-[#025c42] border-[#025c42]" : "bg-[#262626] border-[#262626]"} h-[80%]`}>
//       <span
//         className={`select-none whitespace-nowrap ${isCompleted ? "text-[#5fae66]" : "text-white"} text-xs font-semibold tracking-widest uppercase`}
//         style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
//       >
//         {status === "Completed" ? "Completed" : status === "Live" ? "Live" : "Soon"}
//       </span>
//     </div>
//   );
// }

// /* ─────────────────────────────────
//    COMPLETED CARD — green theme
// ───────────────────────────────── */
// function CompletedCard({ p, hovered, visible, delay, onHover, onLeave }) {
//   return (
//     <div
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       className={`relative w-full lg:w-4/5 overflow-hidden rounded-3xl bg-[#f5fde8] border border-[#f5fde8] transition-all duration-500`}
//       style={{
//         height: CARD_H,
//         opacity:   visible ? 1 : 0,
//         transform: visible ? (hovered ? "translateY(-7px)" : "translateY(0)") : "translateY(18px)",
//         transitionDelay: `${delay}ms`,
//       }}
//     >
//       <PillBadge status="Completed" />

//       <span className="absolute pointer-events-none select-none right-1.5 -bottom-3.5 text-[6.5rem] font-black leading-none tracking-tighter text-[#025c42]/[0.02]">
//         {p.num}
//       </span>

//       <div className="flex flex-col h-full pt-6 pl-16 sm:pl-20 pr-5 box-border">
//         <div className="flex justify-between items-start mb-5">
//           <div className="flex items-center gap-3 text-[#5fae66]">
//             <div className="bg-[#e4fdcd] text-[#025c42] p-3 rounded-full">
//               <CheckCircle className="shrink-0 w-3 h-3 sm:w-3.5 sm:h-4" />
//             </div>
//             <span className="uppercase sm:text-lg font-semibold">{p.phaseNo}</span>
//           </div>
//         </div>

//         <div className="flex-1" />

//         <p className="m-0 text-xl text-black font-medium tracking-tight leading-none mb-0.5">
//           {p.tokens}
//         </p>
//         <p className="uppercase text-black text-[8px] font-semibold mb-2 pl-1">
//           {p.suffix}
//         </p>

//         <div className="rounded-xl text-[#262626] py-2">
//           <p className="m-0 text-[13px] font-bold leading-snug">{p.price}</p>
//           <p className="m-0 text-[10px] font-medium mt-0.5">{p.usd}</p>
//         </div>

//         <div className="flex items-center gap-2 mt-1">
//           <div className="flex-1 h-px bg-gradient-to-r from-[#5fae66]/20 to-transparent" />
//           <span className="uppercase whitespace-nowrap text-[#5fae66] text-[8px] font-bold tracking-[.26em]">
//             Sale Ended
//           </span>
//           <div className="flex-1 h-px bg-gradient-to-r from-[#5fae66]/20 to-transparent" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────
//    LIVE CARD — black theme with Buy Now
// ───────────────────────────────── */
// function LiveCard({ p, hovered, visible, delay, onHover, onLeave, onBuy }) {
//   return (
//     <div
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       className="relative w-full lg:w-4/5 overflow-hidden bg-[#fafafa] rounded-3xl border border-[#fafafa] transition-all duration-500"
//       style={{
//         height: CARD_H,
//         opacity:   visible ? 1 : 0,
//         transform: visible ? (hovered ? "translateY(-11px) scale(1.015)" : "translateY(0)") : "translateY(20px) scale(0.97)",
//         transitionDelay: `${delay}ms`,
//       }}
//     >
//       <PillBadge status="Live" />

//       <div
//         className="absolute pointer-events-none inset-0"
//         style={{
//           background: "linear-gradient(108deg,transparent,rgba(255,255,255,0.06),transparent)",
//           animation: "shimmer 5s ease-in-out infinite 2s",
//         }}
//       />

//       <span className="absolute pointer-events-none select-none right-1.5 -bottom-4 text-[7.5rem] font-black leading-none tracking-tighter text-[#efefef]/40">
//         {p.num}
//       </span>

//       <div className="flex flex-col h-full pt-2 pl-16 sm:pl-20 pr-5 box-border">
//         <div className="flex justify-between items-start mt-4">
//           <div className="flex justify-between w-full">
//             <span className="uppercase sm:text-lg text-[#262626] font-semibold">{p.phaseNo}</span>
//             <div className="flex items-center gap-2">
//               <span className="relative flex shrink-0 w-[7px] h-[7px]">
//                 <span className="absolute inset-0 rounded-full bg-[#025c42]" style={{ animation: "lping 1.5s ease-in-out infinite" }} />
//                 <span className="w-full h-full rounded-full bg-[#025c42]" />
//               </span>
//               <span className="hidden sm:block uppercase text-[#025c42] text-[9px] font-bold tracking-[.2em]">Live Now</span>
//               <span className="block sm:hidden uppercase text-[#025c42] text-[9px] font-bold tracking-[.2em]">Live</span>
//             </div>
//           </div>
//         </div>

//         <p className="m-0 text-xl text-black font-medium tracking-tight leading-none mb-0.5 mt-5">
//           {p.tokens}
//         </p>
//         <p className="uppercase text-black text-[8px] font-semibold mb-5 pl-1">
//           {p.suffix}
//         </p>

//         <div className="rounded-xl text-black pb-2">
//           <p className="m-0 text-[13px] font-bold leading-snug">{p.price}</p>
//           <p className="m-0 text-[10px] font-medium mt-0.5">{p.usd}</p>
//         </div>

//         <div>
//           <button
//             onClick={onBuy}
//             className="w-auto px-4 py-2 flex items-center justify-center gap-2 cursor-pointer mt-2 bg-[#262626]/90 text-white rounded-full text-xs font-medium transition-transform duration-150 hover:scale-[1.02]"
//           >
//             <ShoppingCart className="w-3.5 h-3.5" />
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────
//    COMING SOON CARD — black theme, no button
// ───────────────────────────────── */
// function ComingSoonCard({ p, hovered, visible, delay, onHover, onLeave }) {
//   return (
//     <div
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//       className="relative w-full lg:w-4/5 overflow-hidden bg-[#fafafa] rounded-3xl border border-[#fafafa] transition-all duration-500"
//       style={{
//         height: CARD_H,
//         opacity:   visible ? 1 : 0,
//         transform: visible ? (hovered ? "translateY(-11px) scale(1.015)" : "translateY(0)") : "translateY(20px) scale(0.97)",
//         transitionDelay: `${delay}ms`,
//       }}
//     >
//       <PillBadge status="ComingSoon" />

//       <span className="absolute pointer-events-none select-none right-1.5 -bottom-4 text-[7.5rem] font-black leading-none tracking-tighter text-[#efefef]/40">
//         {p.num}
//       </span>

//       <div className="flex flex-col h-full pt-2 pl-16 sm:pl-20 pr-5 box-border">
//         <div className="flex justify-between items-start mt-4">
//           <div className="flex justify-between w-full">
//             <span className="uppercase sm:text-lg text-[#262626] font-semibold">{p.phaseNo}</span>
//             <div className="flex items-center gap-2">
//               <Clock className="w-[9px] h-[9px] text-[#888]" />
//               <span className="hidden sm:block uppercase text-[#888] text-[9px] font-bold tracking-[.2em]">Coming Soon</span>
//               <span className="block sm:hidden uppercase text-[#888] text-[9px] font-bold tracking-[.2em]">Soon</span>
//             </div>
//           </div>
//         </div>

//         <p className="m-0 text-xl text-black font-medium tracking-tight leading-none mb-0.5 mt-5">
//           {p.tokens}
//         </p>
//         <p className="uppercase text-black text-[8px] font-semibold mb-5 pl-1">
//           {p.suffix}
//         </p>

//         <div className="rounded-xl text-black pb-2">
//           <p className="m-0 text-[13px] font-bold leading-snug">{p.price}</p>
//           <p className="m-0 text-[10px] font-medium mt-0.5">{p.usd}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────
//    MOBILE CONNECTOR
// ───────────────────────────────── */
// function MobileConnector({ fromLeft }) {
//   const H   = 146;
//   const R   = 25;
//   const leftCardCX  = 35;
//   const rightCardCX = 62.5;
//   const leftEmptyX  = 5;
//   const rightEmptyX = 95;

//   let startX, endX, turnX;
//   if (fromLeft) {
//     startX = leftCardCX;
//     endX   = rightCardCX;
//     turnX  = rightEmptyX;
//   } else {
//     startX = rightCardCX;
//     endX   = leftCardCX;
//     turnX  = leftEmptyX;
//   }

//   const d = [
//     `M ${startX} 0`,
//     `H ${fromLeft ? turnX - R : turnX + R}`,
//     `Q ${turnX} 0 ${turnX} ${R}`,
//     `V ${H - R}`,
//     `Q ${turnX} ${H} ${fromLeft ? turnX - R : turnX + R} ${H}`,
//     `H ${endX}`,
//     `V ${H + R + 100}`,
//   ].join(" ");

//   const endY = H + R + 76;
//   const arrow = `M ${endX - 2} ${endY - 10} L ${endX} ${endY - 2} L ${endX + 2} ${endY - 10}`;

//   return (
//     <svg
//       width="100%"
//       height={H}
//       viewBox={`0 100 100 ${H}`}
//       preserveAspectRatio="none"
//       style={{ display: "block", overflow: "visible" }}
//     >
//       <defs>
//         <linearGradient id="mobConnGrad" x1="30" y1="30" x2="30" y2="30" gradientUnits="objectBoundingBox">
//           <stop offset="0%" stopColor="#f5fde8" />
//           <stop offset="100%" stopColor="#025c42" />
//         </linearGradient>
//       </defs>
//       <path d={d} fill="none" stroke="url(#mobConnGrad)" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
//       <path d={arrow} fill="none" stroke="url(#mobConnGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
//     </svg>
//   );
// }

// /* ─────────────────────────────────
//    MAIN
// ───────────────────────────────── */
// export default function GrowthPlanTimelineV3() {
//   const navigate = useNavigate();
//   useKeyframes();

//   const [hovered, setHovered]   = useState(null);
//   const [visible, setVisible]   = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMd, setIsMd]         = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 120);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     function check() {
//       setIsMobile(window.innerWidth < 640);
//       setIsMd(window.innerWidth >= 640 && window.innerWidth < 1024);
//     }
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   function renderCard(p, i) {
//     const common = {
//       p, hovered: hovered === i, visible, delay: i * 95,
//       onHover: () => setHovered(i),
//       onLeave: () => setHovered(null),
//     };
//     if (p.status === "Completed")  return <CompletedCard  {...common} />;
//     if (p.status === "Live")       return <LiveCard       {...common} onBuy={() => navigate("/register")} />;
//     return                                <ComingSoonCard {...common} />;
//   }

//   /* ── Mobile (<640px) ── */
//   if (isMobile) {
//     return (
//       <section className="py-6 bg-white" style={{ fontFamily: "sans-serif" }}>
//         <div className="text-center px-6 mb-12 mt-6">
//           <h2
//             className="m-0 text-[#2f2f2f] font-semibold tracking-tight transition-all duration-500"
//             style={{
//               fontSize: "clamp(1.8rem,4vw,2.5rem)",
//               opacity:   visible ? 1 : 0,
//               transform: visible ? "translateY(0)" : "translateY(14px)",
//             }}
//           >
//             Company's Growth Plan Outlook
//           </h2>
//         </div>

//         <div className="max-w-screen mx-auto px-4 flex flex-col">
//           {PHASES.map((p, i) => {
//             const isLeft = i % 2 === 0;
//             return (
//               <React.Fragment key={i}>
//                 <div style={{ width: "80%", marginLeft: isLeft ? "0%" : "20%" }}>
//                   {renderCard(p, i)}
//                 </div>
//                 {i < PHASES.length - 1 && <MobileConnector fromLeft={isLeft} />}
//               </React.Fragment>
//             );
//           })}
//         </div>
//       </section>
//     );
//   }

//   /* ── Desktop / Tablet ── */
//   // lg card left edges in viewBox units (VB_W=1000, card width≈46% of container)
//   // Approximate card right/left edges for connector anchors:
//   //   cycle 0: left card  starts at   0 → right edge ≈ 360  (L_X2)
//   //   cycle 1: right card starts at 540 → left  edge ≈ 640  (R_X1)
//   //   cycle 2: left card  starts at  50 → right edge ≈ 410
//   //   cycle 3: right card starts at 640 → left  edge ≈ 690  (pushed)
//   // turnX = where the connector bends around (empty space opposite to card)
//   const LG_ANCHOR = [
//     { cardSide: "left",  x1: 360, turnX: R_CX        },  // 0: far-left  → bend right
//     { cardSide: "right", x1: 640, turnX: L_CX        },  // 1: right     → bend left
//     { cardSide: "left",  x1: 410, turnX: R_CX + 50   },  // 2: left+push → bend right (tighter)
//     { cardSide: "right", x1: 690, turnX: L_CX + 50   },  // 3: right+push→ bend left  (tighter)
//   ];

//   const connectors = PHASES.slice(0, -1).map((_, i) => {
//     const anchor = LG_ANCHOR[i % 4];
//     const y1     = TOPS[i] + CARD_H / 2;
//     const y2     = TOPS[i + 1];
//     // For md: keep simple left/right
//     const isLeft = i % 2 === 0;
//     const x1     = isMd ? (isLeft ? L_X2 : R_X1) : anchor.x1;
//     const turnX  = isMd ? (isLeft ? R_CX  : L_CX) : anchor.turnX;
//     return { x1, y1, turnX, y2 };
//   });

//   // Desktop (lg) repeating 4-card cycle:
//   //   cycle pos 0 → far left  (0%)
//   //   cycle pos 1 → right     (54%)
//   //   cycle pos 2 → left+push (5%)
//   //   cycle pos 3 → right+push(64%)
//   const LG_LEFT = ["0%", "54%", "5%", "64%"];

//   function getLeft(i) {
//     const isLeft = i % 2 === 0;
//     if (isMd) return isLeft ? "0%" : "52%";
//     return LG_LEFT[i % 4];
//   }

//   function getWidth() {
//     return isMd ? "48%" : "46%";
//   }

//   return (
//     <section className="py-6 bg-white" style={{ fontFamily: "sans-serif" }}>
//       <div className="text-center px-6 mb-12 mt-6">
//         <h2
//           className="m-0 text-[#2f2f2f] font-semibold tracking-tight transition-all duration-500"
//           style={{
//             fontSize: "clamp(1.8rem,4vw,2.5rem)",
//             opacity:   visible ? 1 : 0,
//             transform: visible ? "translateY(0)" : "translateY(14px)",
//           }}
//         >
//           Company's Growth Plan Outlook
//         </h2>
//       </div>

//       <div className="max-w-screen lg:max-w-6xl mx-auto px-8">
//         <div className="relative w-full" style={{ height: TOTAL_H }}>

//           {/* SVG connector lines */}
//           <svg
//             width="100%"
//             height={TOTAL_H}
//             viewBox={`0 0 ${VB_W} ${TOTAL_H}`}
//             preserveAspectRatio="none"
//             className="absolute inset-0 pointer-events-none overflow-visible z-10"
//           >
//             <defs>
//               <linearGradient id="connectorGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2={TOTAL_H}>
//                 <stop offset="0%" stopColor="#f5fde8" />
//                 <stop offset="100%" stopColor="#025c42" />
//               </linearGradient>
//             </defs>
//             {connectors.map((c, i) => {
//               const R = 28;
//               const goingRight = c.turnX > c.x1;
//               const hEnd  = goingRight ? c.turnX - R : c.turnX + R;
//               const vStart = c.y1 + R;
//               const d = `M ${c.x1} ${c.y1} H ${hEnd} Q ${c.turnX} ${c.y1} ${c.turnX} ${vStart} V ${c.y2}`;
//               const ax = c.turnX;
//               const ay = c.y2;
//               const arrowPath = `M ${ax - 10} ${ay - 10} L ${ax} ${ay} L ${ax + 10} ${ay - 10}`;
//               return (
//                 <g key={i}>
//                   <path d={d} fill="none" stroke="url(#connectorGradient)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
//                   <path d={arrowPath} fill="none" stroke="url(#connectorGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//                 </g>
//               );
//             })}
//           </svg>

//           {/* Cards */}
//           {PHASES.map((p, i) => (
//             <div
//               key={i}
//               className="absolute z-20"
//               style={{ top: TOPS[i], left: getLeft(i), width: getWidth() }}
//             >
//               {renderCard(p, i)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/**
 * GrowthPlanTimelineV3.jsx
 *
 * All colors mapped to theme.css tokens — zero logic/layout changes.
 *
 * Color mapping:
 *   #f5fde8  (completed card bg)   → --color-bg-page      (#e8f5e0)
 *   #025c42  (completed dark green)→ --color-brand-dark    (#1a3d22)
 *   #5fae66  (completed accent)    → --color-brand-accent  (#7fc742)
 *   #e4fdcd  (completed icon bg)   → --color-brand-light   (#b8e07c) @ opacity
 *   #fafafa  (live/soon card bg)   → --color-bg-surface    (#ffffff)
 *   #262626  (dark text/buttons)   → --color-text-primary  (#111827)
 *   #888     (muted/soon text)     → --color-text-muted    (#9ca3af)
 *   #2f2f2f  (section heading)     → --color-text-primary
 *   SVG gradient stops updated to --color-bg-page → --color-brand-dark literals
 *   (SVG stopColor can't consume CSS vars, so literals matching tokens are used)
 */

import React, { useState, useEffect } from "react";
import { CheckCircle, ShoppingCart, Lock, Zap, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────
   DATA
───────────────────────────────── */
const PHASES = [
  { status: "Completed",  phaseNo: "Phase 1", num: "01", tokens: "10 Billion", suffix: "Tokens Distributed", price: "INR 0.01 – 0.04 Paisa", usd: "0.00012 – 0.00044 USD" },
  { status: "Live",       phaseNo: "Phase 2", num: "02", tokens: "20 Billion", suffix: "Tokens Available",   price: "INR 0.05 – 0.50 Paisa", usd: "0.00061 – 0.0061 USD"  },
  { status: "ComingSoon", phaseNo: "Phase 3", num: "03", tokens: "25 Billion", suffix: "Tokens Planned",     price: "INR 0.60 – 1.53 Paisa", usd: "0.0071 – 0.018 USD"    },
  { status: "ComingSoon", phaseNo: "Phase 4", num: "04", tokens: "30 Billion", suffix: "Tokens Planned",     price: "INR 1.60 – 3.00 Paisa", usd: "0.019 – 0.036 USD"     },
  { status: "ComingSoon", phaseNo: "Phase 5", num: "05", tokens: "25 Billion", suffix: "Tokens Planned",     price: "INR 3.15 – 4.10 Paisa", usd: "0.037 – 0.049 USD"     },
];

/* ─────────────────────────────────
   LAYOUT CONSTANTS  (unchanged)
───────────────────────────────── */
const CARD_H = 228;
const VGAP   = 40;
const VB_W   = 1000;
const L_X2   = 360, L_CX = 230;
const R_X1   = 640, R_CX = 790;

const TOPS = (() => {
  const t = []; let y = 0;
  PHASES.forEach(() => { t.push(y); y += CARD_H + VGAP; });
  return t;
})();
const TOTAL_H = TOPS[TOPS.length - 1] + CARD_H;

/* ─────────────────────────────────
   KEYFRAMES  (unchanged logic)
───────────────────────────────── */
function useKeyframes() {
  useEffect(() => {
    const id = "gpt-kf-v6";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes shimmer {
        0%   { transform: translateX(0) rotate(10deg); opacity: 0 }
        8%   { opacity: 1 }
        65%  { transform: translateX(600px) rotate(10deg); opacity: 1 }
        75%  { opacity: 0 }
        100% { transform: translateX(600px) rotate(10deg); opacity: 0 }
      }
      @keyframes lping {
        0%   { transform: scale(1);   opacity: 0.75 }
        70%  { transform: scale(2.4); opacity: 0 }
        100% { transform: scale(2.4); opacity: 0 }
      }
    `;
    document.head.appendChild(s);
    return () => document.getElementById(id)?.remove();
  }, []);
}

/* ─────────────────────────────────
   PILL BADGE
   completed: bg --color-brand-dark, text --color-brand-accent
   other:     bg --color-text-primary tint, text white
───────────────────────────────── */
function PillBadge({ status }) {
  const isCompleted = status === "Completed";
  return (
    <div
      className="absolute flex items-center top-6 left-4 justify-center z-10 p-2 rounded-full border h-[80%]"
      style={{
        background:  isCompleted ? "var(--color-brand-dark)"    : "var(--color-text-primary)",
        borderColor: isCompleted ? "var(--color-brand-dark)"    : "var(--color-text-primary)",
      }}
    >
      <span
        className="select-none whitespace-nowrap text-xs font-semibold tracking-widest uppercase"
        style={{
          color:        isCompleted ? "var(--color-brand-accent)" : "var(--color-text-on-dark)",
          writingMode:  "vertical-rl",
          transform:    "rotate(180deg)",
        }}
      >
        {status === "Completed" ? "Completed" : status === "Live" ? "Live" : "Soon"}
      </span>
    </div>
  );
}

/* ─────────────────────────────────
   COMPLETED CARD
   bg: --color-bg-page (pale mint)
   icon bg: --color-brand-dark tint (light lime)
   accent text: --color-brand-accent
───────────────────────────────── */
function CompletedCard({ p, hovered, visible, delay, onHover, onLeave }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative w-full lg:w-4/5 overflow-hidden rounded-3xl transition-all duration-500"
      style={{
        height:      CARD_H,
        background:  "var(--color-brand-primary)",
        border:      "1px solid var(--color-brand-primary)",
        opacity:     visible ? 1 : 0,
        transform:   visible ? (hovered ? "translateY(-7px)" : "translateY(0)") : "translateY(18px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <PillBadge status="Completed" />

      {/* Watermark number */}
      <span
        className="absolute pointer-events-none select-none right-1.5 -bottom-3.5 text-[6.5rem] font-black leading-none tracking-tighter"
        style={{ color: "var(--color-text-on-dark)", opacity: 0.06 }}
      >
        {p.num}
      </span>

      <div className="flex flex-col h-full pt-6 pl-16 sm:pl-20 pr-5 box-border">
        <div className="flex justify-between items-start mb-5">
          <div
            className="flex items-center gap-3"
            style={{ color: "var(--color-brand-accent)" }}
          >
            {/* Icon bubble — light lime bg, dark green icon */}
            <div
              className="p-3 rounded-full"
              style={{ background: "var(--color-brand-light)", color: "var(--color-brand-dark)" }}
            >
              <CheckCircle className="shrink-0 w-3 h-3 sm:w-3.5 sm:h-4" />
            </div>
            <span className="uppercase sm:text-lg font-semibold">{p.phaseNo}</span>
          </div>
        </div>

        {/* <div className="flex-1" /> */}

        <p className="m-0 text-xl font-medium tracking-tight leading-none mb-0.5" style={{ color: "var(--color-text-on-dark)" }}>
          {p.tokens}
        </p>
        <p className="uppercase text-[8px] font-semibold mb-2 pl-1" style={{ color: "rgba(255,255,255,0.70)" }}>
          {p.suffix}
        </p>

        <div className="rounded-xl py-2" style={{ color: "var(--color-text-on-dark)" }}>
          <p className="m-0 text-[13px] font-bold leading-snug">{p.price}</p>
          <p className="m-0 text-[10px] font-medium mt-0.5">{p.usd}</p>
        </div>

        {/* "Sale Ended" rule */}
        <div className="flex items-center gap-2 mt-1">
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, rgba(127,199,66,0.25), transparent)` }}
          />
          <span
            className="uppercase whitespace-nowrap text-[8px] font-bold tracking-[.26em]"
            style={{ color: "var(--color-brand-accent)" }}
          >
            Sale Ended
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, rgba(127,199,66,0.25), transparent)` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   LIVE CARD
   bg: --color-bg-surface (white)
   live dot + text: --color-brand-primary
   button: --color-text-primary bg
───────────────────────────────── */
function LiveCard({ p, hovered, visible, delay, onHover, onLeave, onBuy }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative w-full lg:w-4/5 overflow-hidden rounded-3xl transition-all duration-500"
      style={{
        height:      CARD_H,
        background:  "var(--color-bg-surface)",
        border:      "1px solid var(--color-bg-surface)",
        opacity:     visible ? 1 : 0,
        transform:   visible ? (hovered ? "translateY(-11px) scale(1.015)" : "translateY(0)") : "translateY(20px) scale(0.97)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <PillBadge status="Live" />

      {/* Shimmer sweep */}
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          background: "linear-gradient(108deg,transparent,rgba(255,255,255,0.06),transparent)",
          animation:  "shimmer 5s ease-in-out infinite 2s",
        }}
      />

      {/* Watermark number */}
      <span
        className="absolute pointer-events-none select-none right-1.5 -bottom-4 text-[7.5rem] font-black leading-none tracking-tighter"
        style={{ color: "#efefef", opacity: 0.4 }}
      >
        {p.num}
      </span>

      <div className="flex flex-col h-full pt-2 pl-16 sm:pl-20 pr-5 box-border">
        <div className="flex justify-between items-start mt-4">
          <div className="flex justify-between w-full">
            <span className="uppercase sm:text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
              {p.phaseNo}
            </span>

            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex shrink-0 w-[7px] h-[7px]">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--color-brand-primary)", animation: "lping 1.5s ease-in-out infinite" }}
                />
                <span className="w-full h-full rounded-full" style={{ background: "var(--color-brand-primary)" }} />
              </span>
              <span
                className="hidden sm:block uppercase text-[9px] font-bold tracking-[.2em]"
                style={{ color: "var(--color-brand-primary)" }}
              >
                Live Now
              </span>
              <span
                className="block sm:hidden uppercase text-[9px] font-bold tracking-[.2em]"
                style={{ color: "var(--color-brand-primary)" }}
              >
                Live
              </span>
            </div>
          </div>
        </div>

        <p className="m-0 text-xl font-medium tracking-tight leading-none mb-0.5 mt-5" style={{ color: "var(--color-text-primary)" }}>
          {p.tokens}
        </p>
        <p className="uppercase text-[8px] font-semibold mb-5 pl-1" style={{ color: "var(--color-text-primary)" }}>
          {p.suffix}
        </p>

        <div className="rounded-xl pb-2" style={{ color: "var(--color-text-primary)" }}>
          <p className="m-0 text-[13px] font-bold leading-snug">{p.price}</p>
          <p className="m-0 text-[10px] font-medium mt-0.5">{p.usd}</p>
        </div>

        {/* Buy Now button — brand-dark bg, accent text on hover */}
        <div>
          <button
            onClick={onBuy}
            className="w-auto px-4 py-2 flex items-center justify-center gap-2 cursor-pointer mt-2 rounded-full text-xs font-medium transition-all duration-150 hover:scale-[1.02]"
            style={{
              background: "var(--color-text-primary)",
              color:      "var(--color-text-on-dark)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--color-brand-dark)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--color-text-primary)";
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   COMING SOON CARD
   bg: --color-bg-surface (white)
   "soon" text/icon: --color-text-muted
───────────────────────────────── */
function ComingSoonCard({ p, hovered, visible, delay, onHover, onLeave }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative w-full lg:w-4/5 overflow-hidden rounded-3xl transition-all duration-500"
      style={{
        height:     CARD_H,
        background: "var(--color-bg-surface)",
        border:     "1px solid var(--color-bg-surface)",
        opacity:    visible ? 1 : 0,
        transform:  visible ? (hovered ? "translateY(-11px) scale(1.015)" : "translateY(0)") : "translateY(20px) scale(0.97)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <PillBadge status="ComingSoon" />

      {/* Watermark number */}
      <span
        className="absolute pointer-events-none select-none right-1.5 -bottom-4 text-[7.5rem] font-black leading-none tracking-tighter"
        style={{ color: "#efefef", opacity: 0.4 }}
      >
        {p.num}
      </span>

      <div className="flex flex-col h-full pt-2 pl-16 sm:pl-20 pr-5 box-border">
        <div className="flex justify-between items-start mt-4">
          <div className="flex justify-between w-full">
            <span className="uppercase sm:text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
              {p.phaseNo}
            </span>

            {/* Coming soon indicator */}
            <div className="flex items-center gap-2">
              <Clock className="w-[9px] h-[9px]" style={{ color: "var(--color-text-muted)" }} />
              <span
                className="hidden sm:block uppercase text-[9px] font-bold tracking-[.2em]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Coming Soon
              </span>
              <span
                className="block sm:hidden uppercase text-[9px] font-bold tracking-[.2em]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Soon
              </span>
            </div>
          </div>
        </div>

        <p className="m-0 text-xl font-medium tracking-tight leading-none mb-0.5 mt-5" style={{ color: "var(--color-text-primary)" }}>
          {p.tokens}
        </p>
        <p className="uppercase text-[8px] font-semibold mb-5 pl-1" style={{ color: "var(--color-text-primary)" }}>
          {p.suffix}
        </p>

        <div className="rounded-xl pb-2" style={{ color: "var(--color-text-primary)" }}>
          <p className="m-0 text-[13px] font-bold leading-snug">{p.price}</p>
          <p className="m-0 text-[10px] font-medium mt-0.5">{p.usd}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────
   MOBILE CONNECTOR  (unchanged geometry)
   SVG stopColors updated to token literals:
     --color-bg-page   = #e8f5e0
     --color-brand-dark = #1a3d22
───────────────────────────────── */
function MobileConnector({ fromLeft }) {
  const H          = 146;
  const R          = 25;
  const leftCardCX  = 35;
  const rightCardCX = 62.5;
  const leftEmptyX  = 5;
  const rightEmptyX = 95;

  let startX, endX, turnX;
  if (fromLeft) {
    startX = leftCardCX;  endX = rightCardCX; turnX = rightEmptyX;
  } else {
    startX = rightCardCX; endX = leftCardCX;  turnX = leftEmptyX;
  }

  const d = [
    `M ${startX} 0`,
    `H ${fromLeft ? turnX - R : turnX + R}`,
    `Q ${turnX} 0 ${turnX} ${R}`,
    `V ${H - R}`,
    `Q ${turnX} ${H} ${fromLeft ? turnX - R : turnX + R} ${H}`,
    `H ${endX}`,
    `V ${H + R + 100}`,
  ].join(" ");

  const endY  = H + R + 76;
  const arrow = `M ${endX - 2} ${endY - 10} L ${endX} ${endY - 2} L ${endX + 2} ${endY - 10}`;

  return (
    <svg
      width="100%" height={H}
      viewBox={`0 100 100 ${H}`}
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="mobConnGrad" x1="30" y1="30" x2="30" y2="30" gradientUnits="objectBoundingBox">
          {/* literals matching --color-bg-page → --color-brand-dark */}
          <stop offset="0%"   stopColor="#e8f5e0" />
          <stop offset="100%" stopColor="#1a3d22" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#mobConnGrad)" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d={arrow} fill="none" stroke="url(#mobConnGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ─────────────────────────────────
   MAIN  (unchanged logic)
───────────────────────────────── */
export default function GrowthPlanTimelineV3() {
  const navigate = useNavigate();
  useKeyframes();

  const [hovered, setHovered]   = useState(null);
  const [visible, setVisible]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMd, setIsMd]         = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 640);
      setIsMd(window.innerWidth >= 640 && window.innerWidth < 1024);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function renderCard(p, i) {
    const common = {
      p, hovered: hovered === i, visible, delay: i * 95,
      onHover: () => setHovered(i),
      onLeave: () => setHovered(null),
    };
    if (p.status === "Completed") return <CompletedCard  {...common} />;
    if (p.status === "Live")      return <LiveCard       {...common} onBuy={() => navigate("/register")} />;
    return                               <ComingSoonCard {...common} />;
  }

  /* ── Mobile ── */
  if (isMobile) {
    return (
      <section className="py-6" style={{ background: "var(--color-bg-page)", fontFamily: "sans-serif" }}>
        <div className="text-center px-6 mb-12 mt-6">
          <h2
            className="m-0 font-semibold tracking-tight transition-all duration-500"
            style={{
              color:     "var(--color-text-primary)",
              fontSize:  "clamp(1.8rem,4vw,2.5rem)",
              opacity:   visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
              fontFamily: "var(--font-display)"
            }}
          >
            Company's Growth Plan Outlook
          </h2>
        </div>

        <div className="max-w-screen mx-auto px-4 flex flex-col">
          {PHASES.map((p, i) => {
            const isLeft = i % 2 === 0;
            return (
              <React.Fragment key={i}>
                <div style={{ width: "80%", marginLeft: isLeft ? "0%" : "20%" }}>
                  {renderCard(p, i)}
                </div>
                {i < PHASES.length - 1 && <MobileConnector fromLeft={isLeft} />}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    );
  }

  /* ── Desktop / Tablet ── */
  const LG_ANCHOR = [
    { cardSide: "left",  x1: 360, turnX: R_CX        },
    { cardSide: "right", x1: 640, turnX: L_CX        },
    { cardSide: "left",  x1: 410, turnX: R_CX + 50   },
    { cardSide: "right", x1: 690, turnX: L_CX + 50   },
  ];

  const connectors = PHASES.slice(0, -1).map((_, i) => {
    const anchor = LG_ANCHOR[i % 4];
    const y1     = TOPS[i] + CARD_H / 2;
    const y2     = TOPS[i + 1];
    const isLeft = i % 2 === 0;
    const x1     = isMd ? (isLeft ? L_X2 : R_X1) : anchor.x1;
    const turnX  = isMd ? (isLeft ? R_CX : L_CX)  : anchor.turnX;
    return { x1, y1, turnX, y2 };
  });

  const LG_LEFT = ["0%", "54%", "5%", "64%"];
  function getLeft(i)  { const isLeft = i % 2 === 0; if (isMd) return isLeft ? "0%" : "52%"; return LG_LEFT[i % 4]; }
  function getWidth()  { return isMd ? "48%" : "46%"; }

  return (
    <section className="py-6" style={{ background: "var(--color-bg-page)", fontFamily: "sans-serif" }}>
      <div className="text-center px-6 mb-12 mt-6">
        <h2
          className="m-0 font-semibold tracking-tight transition-all duration-500"
          style={{
            color:     "var(--color-text-primary)",
            fontSize:  "clamp(1.8rem,4vw,2.5rem)",
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            fontFamily: "var(--font-display)"
          }}
        >
          Company's Growth Plan Outlook
        </h2>
      </div>

      <div className="max-w-screen lg:max-w-6xl mx-auto px-8">
        <div className="relative w-full" style={{ height: TOTAL_H }}>

          {/* SVG connector lines
              stopColor literals = --color-bg-page (#e8f5e0) → --color-brand-dark (#1a3d22)
              SVG stopColor can't consume CSS custom properties */}
          <svg
            width="100%" height={TOTAL_H}
            viewBox={`0 0 ${VB_W} ${TOTAL_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 pointer-events-none overflow-visible z-10"
          >
            <defs>
              <linearGradient id="connectorGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2={TOTAL_H}>
                <stop offset="0%"   stopColor="#e8f5e0" />
                <stop offset="100%" stopColor="#1a3d22" />
              </linearGradient>
            </defs>

            {connectors.map((c, i) => {
              const R          = 28;
              const goingRight = c.turnX > c.x1;
              const hEnd       = goingRight ? c.turnX - R : c.turnX + R;
              const vStart     = c.y1 + R;
              const d          = `M ${c.x1} ${c.y1} H ${hEnd} Q ${c.turnX} ${c.y1} ${c.turnX} ${vStart} V ${c.y2}`;
              const arrowPath  = `M ${c.turnX - 10} ${c.y2 - 10} L ${c.turnX} ${c.y2} L ${c.turnX + 10} ${c.y2 - 10}`;
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke="url(#connectorGradient)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
                  <path d={arrowPath} fill="none" stroke="url(#connectorGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              );
            })}
          </svg>

          {/* Phase cards */}
          {PHASES.map((p, i) => (
            <div key={i} className="absolute z-20" style={{ top: TOPS[i], left: getLeft(i), width: getWidth() }}>
              {renderCard(p, i)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
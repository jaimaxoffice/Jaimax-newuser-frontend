// import { useState, useRef, useEffect, useCallback } from "react";

// /* ─── Data ───────────────────────────────────────────────────────────────── */
// const roadmapData = [
//   {
//     year: "2024",
//     num: "01",
//     title: "Foundation & Launch Phase",
//     status: "completed",
//     phases: [
//       "Concept development and team formation of the core Jaimax team.",
//       "Official website launch introducing the Jaimax ecosystem.",
//       "Publication of the detailed whitepaper outlining goals and tokenomics.",
//       "Public ICO launch and community onboarding.",
//       "Release of the Jaimax mobile application for early users.",
//     ],
//   },
//   {
//     year: "2025",
//     num: "02",
//     title: "Integration & Growth",
//     status: "completed",
//     phases: [
//       "Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
//       "Integration of DigiLocker KYC for secure user verification.",
//       "Launch of token swapping within the Jaimax ecosystem.",
//       "Enable users to buy JMC through Binance exchange wallet connectivity.",
//     ],
//   },
//   {
//     year: "2026",
//     num: "03",
//     title: "Blockchain & Platform Expansion",
//     status: "active",
//     phases: [
//       "Development of Jaimax's own blockchain infrastructure.",
//       "Launch of DeFi features to enhance financial accessibility.",
//       "Launch of the NFT Platform.",
//       "Deployment of DApps across Education, Gaming, Tourism, and Finance.",
//       "Launch of person-to-person (P2P) buying and selling functionality.",
//       "Launch of Jaimax's own payment gateway for seamless transactions.",
//     ],
//   },
//   {
//     year: "2027",
//     num: "04",
//     title: "Global Presence",
//     status: "future",
//     phases: [
//       "Launch of the Jaimax Social Hub to connect users, traders, and developers.",
//       "Launch of the Jaimax Exchange for direct token trading.",
//       "Trading live for all verified users.",
//       "Expansion to global exchange listings.",
//     ],
//   },
// ];

// /* ─── Status config ──────────────────────────────────────────────────────── */
// const STATUS = {
//   completed: {
//     label: "Completed",
//     pill: "text-emerald-600 bg-emerald-50 border border-emerald-200",
//     num: "text-emerald-500",
//     dot: "bg-emerald-500",
//     nodeBg: "bg-emerald-500",
//     ring: "ring-4 ring-emerald-400/20",
//     bar: "bg-emerald-500",
//     barW: "100%",
//     pct: "100%",
//     cardBorder: "border-l-transparent",
//     hex: "#10b981",
//     mobilePill: "text-emerald-600 bg-emerald-50 border border-emerald-200",
//   },
//   active: {
//     label: "In Progress",
//     pill: "text-sky-600 bg-sky-50 border border-sky-200",
//     num: "text-sky-500",
//     dot: "bg-sky-500",
//     nodeBg: "bg-sky-500",
//     ring: "ring-4 ring-sky-400/25",
//     bar: "bg-sky-500",
//     barW: "35%",
//     pct: "35%",
//     cardBorder: "border-l-sky-400",
//     hex: "#0ea5e9",
//     mobilePill: "text-sky-600 bg-sky-50 border border-sky-200",
//   },
//   future: {
//     label: "Upcoming",
//     pill: "text-slate-500 bg-slate-100 border border-slate-200",
//     num: "text-slate-400",
//     dot: "bg-slate-400",
//     nodeBg: "bg-slate-400",
//     ring: "ring-4 ring-slate-300/30",
//     bar: "bg-slate-400",
//     barW: "0%",
//     pct: "0%",
//     cardBorder: "border-l-transparent",
//     hex: "#94a3b8",
//     mobilePill: "text-slate-500 bg-slate-100 border border-slate-200",
//   },
// };

// /* ─── Icons ──────────────────────────────────────────────────────────────── */
// const CheckIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );
// const ClockIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
//     <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" />
//   </svg>
// );
// const CircleIcon = () => (
//   <svg width="9" height="9" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#fff" /></svg>
// );
// const ChevLeft = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );
// const ChevRight = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );

// const mod = (n, m) => ((n % m) + m) % m;
// const total = roadmapData.length;

// /* ══════════════════════════════════════════════════════════════════════════
//    MOBILE — Light theme stacked swipe cards (< 768px only)
// ══════════════════════════════════════════════════════════════════════════ */
// function MobileRoadmap() {
//   const [current, setCurrent] = useState(0);
//   const [dragging, setDragging] = useState(false);
//   const [dragX, setDragX] = useState(0);
//   const [animating, setAnimating] = useState(false);
//   const startXRef = useRef(0);

//   const goTo = useCallback((dir) => {
//     if (animating) return;
//     setAnimating(true);
//     setCurrent((c) => mod(c + dir, total));
//     setTimeout(() => setAnimating(false), 450);
//   }, [animating]);

//   const onPointerDown = (e) => {
//     startXRef.current = e.clientX;
//     setDragging(true);
//     setDragX(0);
//   };
//   const onPointerMove = (e) => {
//     if (!dragging) return;
//     setDragX(e.clientX - startXRef.current);
//   };
//   const onPointerUp = () => {
//     if (!dragging) return;
//     setDragging(false);
//     if (dragX < -60) goTo(1);
//     else if (dragX > 60) goTo(-1);
//     setDragX(0);
//   };

//   const getCardStyle = (i) => {
//     const offset = mod(i - current, total);
//     const isActive = offset === 0;
//     const isDragging = dragging && isActive;

//     if (isActive) {
//       const tx = isDragging ? dragX : 0;
//       const rot = isDragging ? dragX * 0.04 : 0;
//       return {
//         transform: `translateX(${tx}px) rotate(${rot}deg) scale(1)`,
//         opacity: 1,
//         zIndex: 10,
//         boxShadow: "0 20px 50px rgba(0,0,0,.12)",
//         pointerEvents: "auto",
//         transition: isDragging ? "none" : "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease, box-shadow 0.42s ease",
//       };
//     } else if (offset === 1) {
//       return {
//         transform: "translateX(16%) rotate(4deg) scale(0.93)",
//         opacity: 0.6,
//         zIndex: 6,
//         boxShadow: "none",
//         pointerEvents: "none",
//         transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease",
//       };
//     } else if (offset === 2) {
//       return {
//         transform: "translateX(28%) rotate(7deg) scale(0.86)",
//         opacity: 0.25,
//         zIndex: 3,
//         boxShadow: "none",
//         pointerEvents: "none",
//         transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease",
//       };
//     } else {
//       return {
//         transform: "translateX(36%) rotate(9deg) scale(0.8)",
//         opacity: 0,
//         zIndex: 1,
//         pointerEvents: "none",
//         transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease",
//       };
//     }
//   };

//   return (
//     <div className="md:hidden bg-[#f4f5f7] min-h-screen" style={{ fontFamily: "'Sora', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
//         @keyframes shimmer-light {
//           0%{background-position:200% center} 100%{background-position:-200% center}
//         }
//         .shimmer-light {
//           background: linear-gradient(90deg,#f97316,#f59e0b,#10b981,#0ea5e9,#f97316);
//           background-size: 300% auto;
//           -webkit-background-clip: text; -webkit-text-fill-color: transparent;
//           background-clip: text; animation: shimmer-light 4s linear infinite;
//         }
//         @keyframes rm-bar { from{width:0} }
//         .rm-bar { animation: rm-bar 0.8s cubic-bezier(.4,0,.2,1) both; }
//       `}</style>

//       {/* Header */}
//       <div className="px-5 pt-12 pb-6">
//         <span className="block font-mono text-[10px] font-bold tracking-[.18em] text-orange-500 uppercase mb-3">
//           // Project Nexus · Roadmap
//         </span>
//         <h2 className="text-[1.8rem] font-black text-[#0d1117] leading-[1.1] tracking-tight mb-1.5">
//           Jaimax <span className="shimmer-light">Roadmap</span>
//         </h2>
//         <p className="text-slate-500 text-sm">Swipe through each phase.</p>
//       </div>

//       {/* Stacked cards */}
//       <div
//         className="relative flex items-center justify-center mx-auto"
//         style={{ height: 430, touchAction: "none" }}
//         onPointerDown={onPointerDown}
//         onPointerMove={onPointerMove}
//         onPointerUp={onPointerUp}
//         onPointerLeave={() => { if (dragging) { setDragging(false); setDragX(0); } }}
//       >
//         {roadmapData.map((item, i) => {
//           const c = STATUS[item.status];
//           const style = getCardStyle(i);

//           return (
//             <div
//               key={item.year}
//               className="absolute bg-[#0d1117] rounded-2xl border border-white/5 select-none cursor-grab active:cursor-grabbing"
//               style={{ width: "80vw", maxWidth: 290, ...style }}
//             >
//               <div className="p-5">
//                 {/* Number */}
//                 <p className={`text-[3rem] font-black tracking-tighter leading-none mb-1 ${c.num}`}>
//                   {item.num}
//                 </p>
//                 <p className="text-[9px] font-bold tracking-[.15em] text-slate-500 uppercase mb-1">{item.year}</p>
//                 <h3 className="text-white font-bold text-[14px] leading-snug mb-3">{item.title}</h3>

//                 <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${c.mobilePill}`}>
//                   {c.label}
//                 </span>

//                 <div className="w-full h-px bg-white/5 mb-4" />

//                 <div className="flex flex-col gap-2">
//                   {item.phases.slice(0, 4).map((ph, pi) => (
//                     <div key={pi} className="flex items-start gap-2.5 text-slate-400 text-[11px] leading-relaxed">
//                       <span className={`mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
//                       {ph}
//                     </div>
//                   ))}
//                   {item.phases.length > 4 && (
//                     <p className={`text-[11px] font-semibold mt-0.5 ${c.num}`}>+{item.phases.length - 4} more milestones</p>
//                   )}
//                 </div>

//                 {/* Progress */}
//                 <div className="mt-4">
//                   <div className="flex justify-between mb-1.5">
//                     <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Progress</span>
//                     <span className="text-[9px] font-bold" style={{ color: c.hex }}>{c.pct}</span>
//                   </div>
//                   <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
//                     <div className={`h-full rounded-full rm-bar ${c.bar}`} style={{ width: c.barW }} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Nav — arrow · dots · arrow */}
//       <div className="flex items-center justify-center gap-4 mt-2 pb-10">
//         {/* Left arrow */}
//         <button
//           onClick={() => goTo(-1)}
//           className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-orange-400 hover:text-orange-500 transition-all duration-200 active:scale-90 focus:outline-none shadow-sm"
//         >
//           <ChevLeft />
//         </button>

//         {/* Dots */}
//         <div className="flex items-center gap-2">
//           {roadmapData.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 if (!animating) {
//                   setAnimating(true);
//                   setCurrent(i);
//                   setTimeout(() => setAnimating(false), 450);
//                 }
//               }}
//               className="rounded-full h-[7px] transition-all duration-300 focus:outline-none"
//               style={{
//                 width: i === current ? 22 : 7,
//                 background: i === current ? STATUS[roadmapData[current].status].hex : "#cbd5e1",
//               }}
//             />
//           ))}
//         </div>

//         {/* Right arrow */}
//         <button
//           onClick={() => goTo(1)}
//           className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-orange-400 hover:text-orange-500 transition-all duration-200 active:scale-90 focus:outline-none shadow-sm"
//         >
//           <ChevRight />
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    DESKTOP — Sticky left + scrollable right (md: 768px+)
// ══════════════════════════════════════════════════════════════════════════ */
// function DesktopRoadmap() {
//   const [activeIdx, setActiveIdx] = useState(0);
//   const [visible, setVisible] = useState(new Set([0]));
//   const cardRefs = useRef([]);
//   const rightRef = useRef(null);

//   useEffect(() => {
//     const el = rightRef.current;
//     if (!el) return;
//     const onScroll = () => {
//       const mid = el.scrollTop + el.clientHeight / 2;
//       let best = 0, bestDist = Infinity;
//       cardRefs.current.forEach((r, i) => {
//         if (!r) return;
//         const d = Math.abs(r.offsetTop + r.offsetHeight / 2 - mid);
//         if (d < bestDist) { bestDist = d; best = i; }
//       });
//       setActiveIdx(best);
//     };
//     el.addEventListener("scroll", onScroll, { passive: true });
//     return () => el.removeEventListener("scroll", onScroll);
//   }, []);

//   const onIO = useCallback((entries) => {
//     entries.forEach((e) => {
//       if (e.isIntersecting) {
//         setVisible((prev) => new Set([...prev, Number(e.target.dataset.idx)]));
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const el = rightRef.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(onIO, { root: el, rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
//     cardRefs.current.forEach((r) => r && obs.observe(r));
//     return () => obs.disconnect();
//   }, [onIO]);

//   const jumpTo = (i) => {
//     cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
//   };

//   const ad = roadmapData[activeIdx];
//   const ac = STATUS[ad.status];

//   return (
//     <div className="hidden md:flex h-screen bg-[#f4f5f7]" style={{ fontFamily: "'Sora', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
//         @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
//         .anim-fadeup { animation: fadeUp 0.38s cubic-bezier(.4,0,.2,1) both; }
//         @keyframes barGrow { from{width:0} }
//         .anim-bar { animation: barGrow 0.8s cubic-bezier(.4,0,.2,1) both; }
//         @keyframes nodePulse {
//           0%  { box-shadow: 0 0 0 0   rgba(14,165,233,.55); }
//           70% { box-shadow: 0 0 0 10px rgba(14,165,233,0); }
//           100%{ box-shadow: 0 0 0 0   rgba(14,165,233,0); }
//         }
//         .anim-pulse { animation: nodePulse 2s ease-out infinite; }
//         .rm-right::-webkit-scrollbar { display: none; }
//         .rm-right { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       {/* LEFT sticky */}
//       <aside className="sticky top-0 h-screen flex-shrink-0 flex flex-col border-r border-slate-200 bg-[#f4f5f7]"
//         style={{ width: "clamp(260px, 30vw, 380px)" }}>

//         <div className="flex-1 flex flex-col justify-center px-4 lg:px-10 py-10 overflow-hidden">
//           <span className="block font-mono text-[10px] font-bold tracking-[.18em] text-orange-500 uppercase mb-4">
//             // Project Nexus · Roadmap
//           </span>

//           <h2 className="text-[1.8rem] lg:text-[2.4rem] font-black text-[#0d1117] leading-[1.08] tracking-tight mb-3">
//             Jaimax in{" "}
//             <span className="inline-block bg-orange-500 text-white rounded-xl px-2.5 py-0.5 text-[.78em] leading-tight align-middle">
//               4 Phases
//             </span>
//           </h2>

//           <p className="text-slate-500 text-xs lg:text-sm leading-relaxed mb-7 max-w-[260px]">
//             Every milestone is intentional — from launch fundamentals to a
//             fully decentralised global exchange.
//           </p>

//           {/* Live preview card */}
//           <div
//             key={activeIdx}
//             className="anim-fadeup bg-white rounded-[6px] p-4 lg:p-5 border border-slate-200 shadow-sm mb-6"
//           >
//             <div className="flex items-start justify-between mb-3">
//               <div>
//                 <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1 ">Currently viewing</p>
//                 <p className={`text-[2.5rem] lg:text-[3rem] font-black tracking-tighter leading-none ${ac.num}`}>{ad.num}</p>
//               </div>
//               <span className={`text-[7px] lg:text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full ${ac.pill}`}>
//                 {ac.label}
//               </span>
//             </div>
//             <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1">{ad.year}</p>
//             <h3 className="text-[#0d1117] font-bold text-[13px] leading-snug mb-3">{ad.title}</h3>
//             <div className="h-[3px] bg-slate-100 rounded-full overflow-hidden mb-1.5">
//               <div
//                 key={`bar-${activeIdx}`}
//                 className={`h-full rounded-full anim-bar ${ac.bar}`}
//                 style={{ width: ac.barW }}
//               />
//             </div>
//             <p className="text-[10px] text-slate-400 font-medium">{ad.phases.length} milestones</p>
//           </div>

//           {/* Dot nav */}
//           <div className="flex items-center gap-2">
//             {roadmapData.map((d, i) => {
//               const c = STATUS[d.status];
//               return (
//                 <button
//                   key={i}
//                   onClick={() => jumpTo(i)}
//                   className="rounded-full h-2 transition-all duration-300 focus:outline-none"
//                   style={{
//                     width: i === activeIdx ? 26 : 8,
//                     background: i === activeIdx ? c.hex : "#cbd5e1",
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="px-6 lg:px-10 pb-7 pt-5 border-t border-slate-200">
//           <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-3">Phase Status</p>
//           <div className="flex flex-col gap-2">
//             {Object.entries(STATUS).map(([k, c]) => (
//               <div key={k} className="flex items-center gap-3">
//                 <span className={`w-2 h-2 rounded-full ${c.dot}`} />
//                 <span className="text-slate-500 text-xs lg:text-sm">{c.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* RIGHT scrollable */}
//       <div ref={rightRef} className="rm-right flex-1 overflow-y-auto py-16 lg:py-20 px-6 lg:px-12 xl:px-14 flex flex-col gap-6 lg:gap-8">
//         {roadmapData.map((item, i) => {
//           const c = STATUS[item.status];
//           const isVis = visible.has(i);
//           const isAct = i === activeIdx;

//           return (
//             <div
//               key={item.year}
//               ref={(el) => (cardRefs.current[i] = el)}
//               data-idx={i}
//               className="flex items-start gap-4 lg:gap-5 transition-all duration-700 ease-out"
//               style={{
//                 opacity: isVis ? 1 : 0,
//                 transform: isVis ? "translateY(0)" : "translateY(28px)",
//                 transitionDelay: `${i * 55}ms`,
//               }}
//             >
//               {/* Node + line */}
//               <div className="flex flex-col items-center shrink-0 pt-6 lg:pt-7">
//                 <div
//                   className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center z-10
//                     transition-all duration-500 ${c.nodeBg} ${c.ring}
//                     ${isAct && item.status === "active" ? "anim-pulse scale-110" : "scale-100"}
//                   `}
//                 >
//                   {item.status === "completed" ? <CheckIcon /> :
//                    item.status === "active"    ? <ClockIcon /> : <CircleIcon />}
//                 </div>
//                 {i < roadmapData.length - 1 && (
//                   <div
//                     className={`w-px mt-2 rounded-full transition-colors duration-700 ${isVis ? c.dot : "bg-slate-200"}`}
//                     style={{ height: 64, opacity: 0.4 }}
//                   />
//                 )}
//               </div>

//               {/* Card */}
//               <div
//                 className={`flex-1 bg-[#0d1117] rounded-2xl border-l-[3px] overflow-hidden
//                   transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25
//                   ${c.cardBorder}
//                   ${isAct ? "shadow-xl shadow-black/20 ring-1 ring-white/5" : "shadow-md shadow-black/10"}
//                 `}
//               >
//                 <div className="p-5 lg:p-7">
//                   <span className={`block text-[2.6rem] lg:text-[3rem] font-black tracking-tighter leading-none mb-3 ${c.num}`}>
//                     {item.num}
//                   </span>

//                   <div className="flex flex-wrap items-start justify-between gap-3 mb-4 lg:mb-5">
//                     <div>
//                       <p className="text-[9px] font-bold tracking-[.15em] text-slate-500 uppercase mb-1">{item.year}</p>
//                       <h3 className="text-white font-bold text-base lg:text-xl leading-snug tracking-tight">{item.title}</h3>
//                     </div>
//                     <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full shrink-0 mt-1 ${c.pill}`}>
//                       {c.label}
//                     </span>
//                   </div>

//                   <div className="w-full h-px bg-white/5 mb-4 lg:mb-5" />

//                   <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2">
//                     {item.phases.map((ph, pi) => (
//                       <li key={pi} className="flex items-start gap-2.5 text-slate-400 text-[12px] lg:text-[13px] leading-relaxed">
//                         <span className={`mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
//                         {ph}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {item.status === "active" && (
//                   <div className="mx-5 lg:mx-7 mb-5 lg:mb-6">
//                     <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
//                       <div className={`h-full rounded-full anim-bar ${c.bar}`} style={{ width: c.barW }} />
//                     </div>
//                     <p className="text-[10px] text-slate-500 mt-1.5 font-medium">Phase 35% complete</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}

//         <div className="h-14 flex items-center justify-center">
//           <span className="text-slate-300 text-xs tracking-widest">· · · More milestones ahead · · ·</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════════
//    ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════ */
// export default function HomeRoadmapSection() {
//   return (
//     <>
//       <DesktopRoadmap />
//       <MobileRoadmap />
//     </>
//   );
// }

import { useState, useRef, useEffect, useCallback } from "react";

const roadmapData = [
  {
    year: "2024", num: "01", title: "Foundation & Launch Phase", status: "completed",
    phases: [
      "Concept development and team formation of the core Jaimax team.",
      "Official website launch introducing the Jaimax ecosystem.",
      "Publication of the detailed whitepaper outlining goals and tokenomics.",
      "Public ICO launch and community onboarding.",
      "Release of the Jaimax mobile application for early users.",
    ],
  },
  {
    year: "2025", num: "02", title: "Integration & Growth", status: "completed",
    phases: [
      "Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
      "Integration of DigiLocker KYC for secure user verification.",
      "Launch of token swapping within the Jaimax ecosystem.",
      "Enable users to buy JMC through Binance exchange wallet connectivity.",
    ],
  },
  {
    year: "2026", num: "03", title: "Blockchain & Platform Expansion", status: "active",
    phases: [
      "Development of Jaimax's own blockchain infrastructure.",
      "Launch of DeFi features to enhance financial accessibility.",
      "Launch of the NFT Platform.",
      "Deployment of DApps across Education, Gaming, Tourism, and Finance.",
      "Launch of person-to-person (P2P) buying and selling functionality.",
      "Launch of Jaimax's own payment gateway for seamless transactions.",
    ],
  },
  {
    year: "2027", num: "04", title: "Global Presence", status: "future",
    phases: [
      "Launch of the Jaimax Social Hub to connect users, traders, and developers.",
      "Launch of the Jaimax Exchange for direct token trading.",
      "Trading live for all verified users.",
      "Expansion to global exchange listings.",
    ],
  },
];

const STATUS = {
  completed: {
    label:      "Completed",
    pill:       "text-[var(--color-bg-surface)] bg-[var(--color-bg-overlay)] border border-[var(--color-text-muted)]",
    num:        "text-[var(--color-bg-surface)]",
    dot:        "bg-[var(--color-brand-primary)]",
    nodeBg:     "bg-[var(--color-brand-primary)]",
    ring:       "ring-4 ring-[var(--color-brand-primary)]/20",
    bar:        "bg-[var(--color-brand-primary)]",
    barW:       "100%",
    pct:        "100%",
    cardBorder: "border-l-transparent",
    hex:        "#2d7a3a",
    mobilePill: "text-[var(--color-brand-primary)] bg-[var(--color-bg-overlay)] border border-[var(--color-border-accent)]",
  },
  active: {
    label:      "In Progress",
    pill:       "text-[var(--color-brand-mid)] bg-[rgba(74,152,88,0.12)] border border-[rgba(74,152,88,0.35)]",
    num:        "text-[var(--color-brand-mid)]",
    dot:        "bg-[var(--color-brand-mid)]",
    nodeBg:     "bg-[var(--color-brand-mid)]",
    ring:       "ring-4 ring-[var(--color-brand-mid)]/25",
    bar:        "bg-[var(--color-brand-mid)]",
    barW:       "35%",
    pct:        "35%",
    cardBorder: "border-l-[var(--color-brand-mid)]",
    hex:        "#4a9858",
    mobilePill: "text-[var(--color-brand-mid)] bg-[rgba(74,152,88,0.12)] border border-[rgba(74,152,88,0.35)]",
  },
  future: {
    label:      "Upcoming",
    pill:       "text-[var(--color-text-muted)] bg-[rgba(156,163,175,0.15)] border border-[var(--color-border-accent)]",
    num:        "text-[var(--color-text-muted)]",
    dot:        "bg-[var(--color-text-muted)]",
    nodeBg:     "bg-[var(--color-text-muted)]",
    ring:       "ring-4 ring-[var(--color-text-muted)]/20",
    bar:        "bg-[var(--color-text-muted)]",
    barW:       "0%",
    pct:        "0%",
    cardBorder: "border-l-transparent",
    hex:        "#9ca3af",
    mobilePill: "text-[var(--color-text-muted)] bg-[rgba(156,163,175,0.15)] border border-[var(--color-border-accent)]",
  },
};

const CheckIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const ClockIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>;
const CircleIcon = () => <svg width="9" height="9" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#fff" /></svg>;
const ChevLeft   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevRight  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;

const mod   = (n, m) => ((n % m) + m) % m;
const total = roadmapData.length;

function MobileRoadmap() {
  const [current,   setCurrent]   = useState(0);
  const [dragging,  setDragging]  = useState(false);
  const [dragX,     setDragX]     = useState(0);
  const [animating, setAnimating] = useState(false);
  const startXRef = useRef(0);

  const goTo = useCallback((dir) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((c) => mod(c + dir, total));
    setTimeout(() => setAnimating(false), 450);
  }, [animating]);

  const onPointerDown = (e) => { startXRef.current = e.clientX; setDragging(true); setDragX(0); };
  const onPointerMove = (e) => { if (!dragging) return; setDragX(e.clientX - startXRef.current); };
  const onPointerUp   = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX < -60) goTo(1); else if (dragX > 60) goTo(-1);
    setDragX(0);
  };

  const getCardStyle = (i) => {
    const offset    = mod(i - current, total);
    const isActive  = offset === 0;
    const isDragging = dragging && isActive;
    if (isActive) return {
      transform: `translateX(${isDragging ? dragX : 0}px) rotate(${isDragging ? dragX * 0.04 : 0}deg) scale(1)`,
      opacity: 1, zIndex: 10, boxShadow: "0 20px 50px rgba(0,0,0,.12)", pointerEvents: "auto",
      transition: isDragging ? "none" : "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease, box-shadow 0.42s ease",
    };
    if (offset === 1) return { transform: "translateX(16%) rotate(4deg) scale(0.93)", opacity: 0.6,  zIndex: 6, boxShadow: "none", pointerEvents: "none", transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease" };
    if (offset === 2) return { transform: "translateX(28%) rotate(7deg) scale(0.86)", opacity: 0.25, zIndex: 3, boxShadow: "none", pointerEvents: "none", transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease" };
    return { transform: "translateX(36%) rotate(9deg) scale(0.8)", opacity: 0, zIndex: 1, pointerEvents: "none", transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease" };
  };

  return (
    <div className="md:hidden min-h-screen overflow-x-hidden bg-[var(--color-bg-page)]" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        @keyframes shimmer-light {
          0%  { background-position: 200% center }
          100%{ background-position: -200% center }
        }
        .shimmer-light {
          background: linear-gradient(90deg,
            var(--color-brand-accent),
            var(--color-brand-light),
            var(--color-brand-primary),
            var(--color-brand-mid),
            var(--color-brand-accent)
          );
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: shimmer-light 4s linear infinite;
        }
        @keyframes rm-bar { from { width: 0 } }
        .rm-bar { animation: rm-bar 0.8s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <div className="px-5 pt-12 pb-6 text-center">
       
        <h2
          className="text-[1.8rem] font-black leading-[1.1] tracking-tight mb-1 text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Roadmap &amp;{" "}
          <span className="text-[var(--color-brand-primary)]">Milestones</span>
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Swipe through each phase.</p>
      </div>

      <div
        className="relative flex items-center justify-center mx-auto overflow-hidden"
        style={{ height: 430, touchAction: "none", maxWidth: "100vw" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => { if (dragging) { setDragging(false); setDragX(0); } }}
      >
        {roadmapData.map((item, i) => {
          const c     = STATUS[item.status];
          const style = getCardStyle(i);

          return (
            <div
              key={item.year}
              className="absolute rounded-2xl select-none cursor-grab active:cursor-grabbing"
              style={{
                width: "80vw", maxWidth: 290,
                background:  "var(--color-bg-surface)",
                border:      `1px solid var(--color-border-accent)`,
                ...style,
              }}
            >
              <div className="p-5">
                <p className={`text-[3rem] font-black tracking-tighter leading-none mb-1 `}>{item.num}</p>
                <p className="text-[9px] font-bold tracking-[.15em] uppercase mb-1" style={{ color: c.hex }}>{item.year}</p>
                <h3 className="font-bold text-[14px] leading-snug mb-3 text-[var(--color-text-primary)]">{item.title}</h3>

                <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${c.mobilePill}`}>
                  {c.label}
                </span>

                <div className="w-full h-px mb-4 bg-[var(--color-border-accent)]" />

                <div className="flex flex-col gap-2">
                  {item.phases.slice(0, 4).map((ph, pi) => (
                    <div key={pi} className="flex items-start gap-2.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
                      <span className={`mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                      {ph}
                    </div>
                  ))}
                  {item.phases.length > 4 && (
                    <p className={`text-[11px] font-semibold mt-0.5 ${c.num}`}>+{item.phases.length - 4} more milestones</p>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">Progress</span>
                    <span className="text-[9px] font-bold" style={{ color: c.hex }}>{c.pct}</span>
                  </div>
                  <div className="h-[3px] rounded-full overflow-hidden bg-[var(--color-bg-overlay)]">
                    <div className={`h-full rounded-full rm-bar ${c.bar}`} style={{ width: c.barW }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-2 pb-4">
        <button
          onClick={() => goTo(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none bg-[var(--color-bg-surface)] border border-[var(--color-border-accent)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-primary)] shadow-sm"
        >
          <ChevLeft />
        </button>

        <div className="flex items-center gap-2">
          {roadmapData.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 450); } }}
              className="rounded-full h-[7px] transition-all duration-300 focus:outline-none"
              style={{
                width:      i === current ? 22 : 7,
                background: i === current ? STATUS[roadmapData[current].status].hex : "var(--color-border-accent)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none bg-[var(--color-bg-surface)] border border-[var(--color-border-accent)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-primary)] shadow-sm"
        >
          <ChevRight />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 py-8 border-t border-[var(--color-border-accent)] mx-5">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-[var(--color-border-accent)]" />
          <span className="text-[var(--color-brand-accent)] text-base">✦</span>
          <div className="h-px w-12 bg-[var(--color-border-accent)]" />
        </div>
        <p className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-text-muted)]">
          More phases coming soon
        </p>
      </div>
    </div>
  );
}

function DesktopRoadmap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible,   setVisible]   = useState(new Set([0, 1, 2, 3]));
  const cardRefs = useRef([]);
  const rightRef = useRef(null);

  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const onScroll = () => {
      const mid = el.scrollTop + el.clientHeight / 2;
      let best = 0, bestDist = Infinity;
      cardRefs.current.forEach((r, i) => {
        if (!r) return;
        const d = Math.abs(r.offsetTop + r.offsetHeight / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveIdx(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const onIO = useCallback((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setVisible((prev) => new Set([...prev, Number(e.target.dataset.idx)]));
    });
  }, []);

  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIO, { root: el, rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    cardRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [onIO]);

  const jumpTo = (i) => cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  const ad = roadmapData[activeIdx];
  const ac = STATUS[ad.status];

  return (

    <div className="hidden md:block" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .anim-fadeup { animation: fadeUp 0.38s cubic-bezier(.4,0,.2,1) both; }
        @keyframes barGrow { from{width:0} }
        .anim-bar { animation: barGrow 0.8s cubic-bezier(.4,0,.2,1) both; }
        @keyframes nodePulse {
          0%  { box-shadow: 0 0 0 0    rgba(45,122,58,.55); }
          70% { box-shadow: 0 0 0 10px rgba(45,122,58,0);   }
          100%{ box-shadow: 0 0 0 0    rgba(45,122,58,0);   }
        }
        .anim-pulse { animation: nodePulse 2s ease-out infinite; }
        .rm-right::-webkit-scrollbar { display: none; }
        .rm-right { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Sticky wrapper — pins the section to the top of the viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "120vh",
          background: "var(--color-bg-page)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Section heading */}
        <div className="text-center pt-10 pb-6 px-6 border-b border-[var(--color-border-accent)]">
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase border bg-[var(--color-bg-overlay)] border-[var(--color-border-accent)] text-[var(--color-brand-primary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
              Our Journey
            </span>
          </div>
          <h2
            className="font-black text-3xl lg:text-4xl leading-tight text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Roadmap &amp;{" "}
            <span className="text-[var(--color-brand-primary)]">Milestones</span>
          </h2>
          <p className="text-sm mt-2 max-w-lg mx-auto text-[var(--color-text-secondary)]">
            Every phase is a step toward a fully decentralised global ecosystem.
            Scroll through to explore where we've been and where we're headed.
          </p>
        </div>

        {/* Full-height flex row */}
        <div className="flex flex-1 min-h-0 w-full">

          {/* LEFT — non-scrolling sidebar */}
          <aside
            className="flex-shrink-0 flex flex-col h-full bg-[var(--color-bg-page)] border-r border-[var(--color-border-accent)]"
            style={{ width: "clamp(260px, 30vw, 380px)" }}
          >
            <div className="flex-1 flex flex-col justify-center px-4 lg:px-10 py-8 overflow-hidden">

             

              <h2
                className="text-[1.8rem] lg:text-[2.4rem] font-black leading-[1.08] tracking-tight mb-3 text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Jaimax in{" "}
                <span className="inline-block bg-[var(--color-brand-primary)] text-[var(--color-text-on-dark)] rounded-xl px-2.5 py-0.5 text-[.78em] leading-tight align-middle">
                  4 Phases
                </span>
              </h2>

              <p className="text-xs lg:text-sm leading-relaxed mb-6 max-w-[260px] text-[var(--color-text-secondary)]">
                Every milestone is intentional — from launch fundamentals to a
                fully decentralised global exchange.
              </p>

              {/* Live preview card */}
              <div
                key={activeIdx}
                className="anim-fadeup bg-[var(--color-bg-surface)] rounded-[6px] p-4 lg:p-5 border border-[var(--color-border-accent)] shadow-sm mb-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[9px] font-bold tracking-widest uppercase mb-1 text-[var(--color-text-muted)]">Currently viewing</p>
                    <p className={`text-[2.5rem] lg:text-[3rem] font-black tracking-tighter leading-none ${ac.num}`}>{ad.num}</p>
                  </div>
                  <span className={`text-[7px] lg:text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full ${ac.pill}`}>
                    {ac.label}
                  </span>
                </div>
                <p className="text-[9px] font-bold tracking-widest uppercase mb-1 text-[var(--color-text-muted)]">{ad.year}</p>
                <h3 className="font-bold text-[13px] leading-snug mb-3 text-[var(--color-text-primary)]">{ad.title}</h3>
                <div className="h-[3px] rounded-full overflow-hidden mb-1.5 bg-[var(--color-bg-overlay)]">
                  <div key={`bar-${activeIdx}`} className={`h-full rounded-full anim-bar ${ac.bar}`} style={{ width: ac.barW }} />
                </div>
                <p className="text-[10px] font-medium text-[var(--color-text-muted)]">{ad.phases.length} milestones</p>
              </div>

              {/* Dot nav */}
              <div className="flex items-center gap-2">
                {roadmapData.map((d, i) => {
                  const c = STATUS[d.status];
                  return (
                    <button
                      key={i}
                      onClick={() => jumpTo(i)}
                      className="rounded-full h-2 transition-all duration-300 focus:outline-none"
                      style={{
                        width:      i === activeIdx ? 26 : 8,
                        background: i === activeIdx ? c.hex : "var(--color-border-accent)",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="px-6 lg:px-10 pb-7 pt-5 border-t border-[var(--color-border-accent)]">
              <p className="text-[9px] font-bold tracking-widest uppercase mb-3 text-[var(--color-text-muted)]">Phase Status</p>
              <div className="flex flex-col gap-2">
                {Object.entries(STATUS).map(([k, c]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span className="text-xs lg:text-sm text-[var(--color-text-secondary)]">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT — scrolls internally, drives activeIdx
              FIX: removed stray `border` class, added border-[var(--color-border-accent)]
              and ensured it fills the remaining width with no gap */}
          <div
            ref={rightRef}
            className="rm-right flex-1 overflow-y-auto py-10 lg:py-14 px-6 lg:px-12 xl:px-14 flex flex-col gap-6 lg:gap-8"
            style={{
              background: "var(--color-bg-page)",
              /* no extra border here — left panel already has border-r */
            }}
          >
            {roadmapData.map((item, i) => {
              const c     = STATUS[item.status];
              const isVis = visible.has(i);
              const isAct = i === activeIdx;

              const isCompleted    = item.status === "completed";
              const cardBg         = isCompleted ? "var(--color-brand-primary)"  : "var(--color-bg-surface)";
              const cardTitleColor = isCompleted ? "var(--color-text-on-dark)"   : "var(--color-text-primary)";
              const cardYearColor  = isCompleted ? "rgba(255,255,255,0.55)"      : "var(--color-text-muted)";
              const cardListColor  = isCompleted ? "rgba(255,255,255,0.70)"      : "var(--color-text-muted)";
              const cardDivider    = isCompleted ? "rgba(255,255,255,0.10)"      : "var(--color-border-accent)";
              const cardBarTrack   = isCompleted ? "rgba(255,255,255,0.12)"      : "var(--color-bg-overlay)";
              const cardShadowAct  = isCompleted ? "0 20px 40px rgba(26,61,34,0.35)" : "0 16px 40px rgba(0,0,0,0.10)";
              const cardShadowIdle = isCompleted ? "0 4px 16px rgba(26,61,34,0.20)"  : "0 2px 12px rgba(0,0,0,0.06)";

              return (
                <div
                  key={item.year}
                  ref={(el) => (cardRefs.current[i] = el)}
                  data-idx={i}
                  className="flex items-start gap-4 lg:gap-5 transition-all duration-700 ease-out"
                  style={{
                    opacity:   isVis ? 1 : 0,
                    transform: isVis ? "translateY(0)" : "translateY(28px)",
                    transitionDelay: `${i * 55}ms`,
                  }}
                >
                  {/* Node + connector line */}
                  <div className="flex flex-col items-center shrink-0 pt-6 lg:pt-7">
                    <div
                      className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center z-10
                        transition-all duration-500 ${c.nodeBg} ${c.ring}
                        ${isAct && item.status === "active" ? "anim-pulse scale-110" : "scale-100"}
                      `}
                    >
                      {item.status === "completed" ? <CheckIcon /> :
                       item.status === "active"    ? <ClockIcon /> : <CircleIcon />}
                    </div>
                    {i < roadmapData.length - 1 && (
                      <div
                        className={`w-px mt-2 rounded-full transition-colors duration-700 ${isVis ? c.dot : "bg-[var(--color-border-accent)]"}`}
                        style={{ height: 64, opacity: 0.4 }}
                      />
                    )}
                  </div>

                  {/* Card — flex-1 ensures it fills all remaining width with no gap */}
                  <div
                    className={`flex-1 rounded-2xl border-l-[3px] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${c.cardBorder} ${isAct ? "ring-1 ring-white/5" : ""}`}
                    style={{
                      background: cardBg,
                      boxShadow:  isAct ? cardShadowAct : cardShadowIdle,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = cardShadowAct)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = isAct ? cardShadowAct : cardShadowIdle)}
                  >
                    <div className="p-5 lg:p-7">
                      <span className={`block text-[2.6rem] lg:text-[3rem] font-black tracking-tighter leading-none mb-3 ${c.num}`}>
                        {item.num}
                      </span>

                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4 lg:mb-5">
                        <div>
                          <p className="text-[9px] font-bold tracking-[.15em] uppercase mb-1" style={{ color: cardYearColor }}>{item.year}</p>
                          <h3 className="font-bold text-base lg:text-xl leading-snug tracking-tight" style={{ color: cardTitleColor }}>{item.title}</h3>
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full shrink-0 mt-1 ${c.pill}`}>
                          {c.label}
                        </span>
                      </div>

                      <div className="w-full h-px mb-4 lg:mb-5" style={{ background: cardDivider }} />

                      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2">
                        {item.phases.map((ph, pi) => (
                          <li key={pi} className="flex items-start gap-2.5 text-[12px] lg:text-[13px] leading-relaxed" style={{ color: cardListColor }}>
                            <span className={`mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                            {ph}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {item.status === "active" && (
                      <div className="mx-5 lg:mx-7 mb-5 lg:mb-6">
                        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: cardBarTrack }}>
                          <div className={`h-full rounded-full anim-bar ${c.bar}`} style={{ width: c.barW }} />
                        </div>
                        <p className="text-[10px] mt-1.5 font-medium text-[var(--color-text-muted)]">Phase 35% complete</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Exit footer inside scroll area */}
            <div className="flex flex-col items-center gap-3 py-8 border-t border-[var(--color-border-accent)] mt-2">
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-[var(--color-border-accent)]" />
                <span className="text-[var(--color-brand-accent)] text-lg">✦</span>
                <div className="h-px w-16 bg-[var(--color-border-accent)]" />
              </div>
              <p className="text-xs tracking-widest uppercase font-semibold text-[var(--color-text-muted)]">
                End of Roadmap · More phases coming soon
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function HomeRoadmapSection() {
  return (
    <>
      <DesktopRoadmap />
      <MobileRoadmap />
    </>
  );
}
// import { useState, useEffect, useRef, useCallback } from "react";
// import rajkumar from "../../assets/Rajkumar.webp";
// import mahendar from "../../assets/mahender.webp";
// import krishnamraju from "../../assets/krishnamraju.jpeg";
// import shekar from "../../assets/Shekar.jpg";
// import anjanelu from "../../assets/B.veeranjaneyulu.jpg";
// import Ratnam from "../../assets/Ratnam.jpg";
// import pramod from "../../assets/pramod.jpg";
// import BadgePill from "./BadgePill";

// const INTERVAL = 4000;

// const data = [
//   {
//     quote:
//       "Buying Jaimax Tokens was easy, and the transaction was super fast. The interface is clean, fast, and really easy to navigate.",
//     body: "I started using the Jaimax app last month and it has been smooth so far. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
//     name: "Krishnamraju",
//     role: "Verified Investor · 15 January, 2025",
//     avatar: krishnamraju,
//   },
//   {
//     quote:
//       "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. Their vision regarding digital payments is really unique.",
//     body: "It was a smooth process, and my tokens showed up instantly within my wallet. What's impressive is that the team actually responds to community feedback.",
//     name: "Mahendar",
//     role: "Verified Investor · 12 January, 2025",
//     avatar: mahendar,
//   },
//   {
//     quote:
//       "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems.",
//     body: "I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience!",
//     name: "Nimmala Rajkumar",
//     role: "Verified Investor · 10 January, 2025",
//     avatar: rajkumar,
//   },
//   {
//     quote:
//       "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are lightning-fast.",
//     body: "Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out!",
//     name: "Shekar K",
//     role: "Verified Investor · 8 January, 2025",
//     avatar: shekar,
//   },
//   {
//     quote:
//       "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks.",
//     body: "The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Huge potential for further scaling!",
//     name: "Yella Rathnaiah",
//     role: "Verified Investor · 5 January, 2025",
//     avatar: Ratnam,
//   },
//   {
//     quote:
//       "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised.",
//     body: "I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
//     name: "Pramod Kumar",
//     role: "Verified Investor · 3 January, 2025",
//     avatar: pramod,
//   },
//   {
//     quote:
//       "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions.",
//     body: "Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
//     name: "B. Veeranjaneyulu",
//     role: "Verified Investor · 1 January, 2025",
//     avatar: anjanelu,
//   },
//   {
//     quote:
//       "The first thing I notice with Jaimax is the quality of the design — it feels really premium. The transactions are instant.",
//     body: "I like how secure the login and KYC system are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
//     name: "Jithendar Reddy",
//     role: "Verified Investor · 28 December, 2024",
//     avatar:
//       "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=800",
//   },
//   {
//     quote:
//       "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and track my tokens.",
//     body: "Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
//     name: "Rohan Joshi",
//     role: "Verified Investor · 25 December, 2024",
//     avatar:
//       "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=800",
//   },
//   {
//     quote:
//       "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly — no hidden fees or delays.",
//     body: "The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
//     name: "Anjali Verma",
//     role: "Verified Investor · 22 December, 2024",
//     avatar:
//       "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=800",
//   },
// ];

// const n = data.length;

// /* ── Preload external images immediately ── */
// if (typeof window !== "undefined") {
//   data.forEach(({ avatar }) => {
//     if (typeof avatar === "string" && avatar.startsWith("http")) {
//       const img = new window.Image();
//       img.src = avatar;
//     }
//   });
// }

// function getIsMobile() {
//   return typeof window !== "undefined" && window.innerWidth < 640;
// }

// /* ── Split data into two rows ── */
// const row1 = data.slice(0, 5); // indices 0-4  → scrolls left
// const row2 = data.slice(5, 10); // indices 5-9  → scrolls right

// /* ════════════════════════════════════════════════════════
//    DESKTOP — Marquee rows
// ════════════════════════════════════════════════════════ */

// /* Single marquee card */
// function MarqueeCard({ item, onClick, isSpotlit }) {
//   return (
//     <button
//       onClick={onClick}
//       className="marquee-card flex-shrink-0 text-left"
//       style={{
//         width: 300,
//         background: isSpotlit
//           ? "var(--color-brand-primary)"
//           : "var(--color-bg-surface)",
//         border: isSpotlit
//           ? "1.5px solid var(--color-brand-primary)"
//           : "1.5px solid var(--color-border-accent)",
//         borderRadius: 16,
//         padding: "22px 24px 20px",
//         // boxShadow:     isSpotlit
//         //   ? "0 20px 60px rgba(45,122,58,.35)"
//         //   : "var(--shadow-card)",
//         cursor: "pointer",
//         outline: "none",
//       }}
//     >
//       {/* Avatar + name */}
//       <div className="flex items-center gap-3 mb-4">
//         <img
//           src={item.avatar}
//           alt={item.name}
//           loading="eager"
//           className="rounded-full object-cover flex-shrink-0"
//           style={{
//             width: 40,
//             height: 40,
//             border: isSpotlit
//               ? "2px solid rgba(255,255,255,0.5)"
//               : "2px solid var(--color-border-accent)",
//           }}
//         />
//         <div>
//           <p
//             className="text-[13.5px] font-semibold leading-tight"
//             style={{
//               color: isSpotlit ? "#fff" : "var(--color-text-primary)",
//               fontFamily: "var(--font-body)",
//             }}
//           >
//             {item.name}
//           </p>
//           <p
//             className="text-[11px] mt-[2px]"
//             style={{
//               color: isSpotlit
//                 ? "rgba(255,255,255,0.65)"
//                 : "var(--color-text-muted)",
//             }}
//           >
//             {item.role}
//           </p>
//         </div>
//         {/* Stars pushed right */}
//         <div className="ml-auto flex gap-[2px]">
//           {[...Array(5)].map((_, i) => (
//             <span
//               key={i}
//               style={{
//                 fontSize: 11,
//                 color: isSpotlit
//                   ? "rgba(255,255,255,0.85)"
//                   : "var(--color-brand-accent)",
//               }}
//             >
//               ★
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Quote */}
//       <p
//         className="text-[13px] leading-[1.7] line-clamp-4"
//         style={{
//           fontFamily: "var(--font-body)",
//           color: isSpotlit
//             ? "rgba(255,255,255,0.92)"
//             : "var(--color-text-secondary)",
//         }}
//       >
//         "{item.quote}"
//       </p>
//     </button>
//   );
// }

// /* One row of marquee — duplicated for seamless loop */
// function MarqueeRow({
//   items,
//   direction = "left",
//   speed = 38,
//   spotlit,
//   onCardClick,
//   paused,
// }) {
//   /* direction "left": translate from 0 → -50% (one copy width) */
//   const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";
//   /* Each copy width = items.length * (card 300 + gap 20) */
//   const copyWidth = items.length * 320;

//   return (
//     <div
//       className="marquee-track overflow-hidden"
//       style={{ width: "100%", position: "relative" }}
//       /* Pause whole row on hover */
//       onMouseEnter={() => {}}
//       onMouseLeave={() => {}}
//     >
//       <div
//         className="flex gap-5 py-2"
//         style={{
//           /* Two copies side-by-side so loop is seamless */
//           width: copyWidth * 2,
//           animation: `${animName} ${speed}s linear infinite`,
//           animationPlayState: paused ? "paused" : "running",
//           willChange: "transform",
//         }}
//       >
//         {/* Copy A */}
//         {items.map((item, i) => (
//           <MarqueeCard
//             key={`a-${i}`}
//             item={item}
//             onClick={() => onCardClick(item)}
//             isSpotlit={spotlit?.name === item.name}
//           />
//         ))}
//         {/* Copy B — identical, creates the seamless illusion */}
//         {items.map((item, i) => (
//           <MarqueeCard
//             key={`b-${i}`}
//             item={item}
//             onClick={() => onCardClick(item)}
//             isSpotlit={spotlit?.name === item.name}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* Spotlight modal — shown when a card is clicked */
// function Spotlight({ item, onClose }) {
//   if (!item) return null;
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center px-4"
//       style={{ background: "rgba(5,14,7,0.72)", backdropFilter: "blur(8px)" }}
//       onClick={onClose}
//     >
//       <div
//         className="spotlight-in relative w-full max-w-lg rounded-2xl p-10 text-left"
//         style={{
//           background: "var(--color-bg-surface)",
//           boxShadow: "0 40px 120px rgba(0,0,0,0.4)",
//           border: "1.5px solid var(--color-border-accent)",
//         }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-[22px] leading-none"
//           style={{
//             color: "var(--color-text-muted)",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ×
//         </button>

//         {/* Header */}
//         <div className="flex items-center gap-4 mb-6">
//           <img
//             src={item.avatar}
//             alt={item.name}
//             loading="eager"
//             className="rounded-full object-cover"
//             style={{
//               width: 60,
//               height: 60,
//               border: "3px solid var(--color-brand-primary)",
//             }}
//           />
//           <div>
//             <p
//               className="text-[17px] font-semibold"
//               style={{
//                 color: "var(--color-text-primary)",
//                 fontFamily: "var(--font-display)",
//               }}
//             >
//               {item.name}
//             </p>
//             <p
//               className="text-[12px] mt-[3px]"
//               style={{ color: "var(--color-text-muted)" }}
//             >
//               {item.role}
//             </p>
//             <div className="flex gap-[3px] mt-[5px]">
//               {[...Array(5)].map((_, i) => (
//                 <span
//                   key={i}
//                   style={{ fontSize: 13, color: "var(--color-brand-accent)" }}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Quote */}
//         <p
//           className="text-[clamp(1.05rem,2vw,1.3rem)] font-semibold leading-[1.55] mb-4"
//           style={{
//             color: "var(--color-text-primary)",
//             fontFamily: "var(--font-display)",
//           }}
//         >
//           "{item.quote}"
//         </p>

//         <p
//           className="text-[13.5px] leading-[1.8]"
//           style={{ color: "var(--color-text-secondary)" }}
//         >
//           {item.body}
//         </p>
//       </div>
//     </div>
//   );
// }

// function DesktopMarquee() {
//   const [spotlit, setSpotlit] = useState(null);
//   const [rowsPaused, setRowsPaused] = useState(false);

//   const handleCard = (item) => {
//     setSpotlit(item);
//     setRowsPaused(true);
//   };
//   const handleClose = () => {
//     setSpotlit(null);
//     setRowsPaused(false);
//   };

//   return (
//     <>
//       <div
//         className="relative w-full overflow-hidden"
//         /* Edge fade masks */
//         style={{
//           maskImage:
//             "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
//           WebkitMaskImage:
//             "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
//         }}
//       >
//         <div className="flex flex-col gap-5">
//           <MarqueeRow
//             items={row1}
//             direction="left"
//             speed={40}
//             spotlit={spotlit}
//             onCardClick={handleCard}
//             paused={rowsPaused}
//           />
//           <MarqueeRow
//             items={row2}
//             direction="right"
//             speed={34}
//             spotlit={spotlit}
//             onCardClick={handleCard}
//             paused={rowsPaused}
//           />
//         </div>
//       </div>

//       {/* Hint text */}
//       <p
//         className="text-center text-[12px] mt-5"
//         style={{ color: "var(--color-text-muted)" }}
//       >
//         Click any card to read the full review
//       </p>

//       {/* Spotlight modal */}
//       <Spotlight item={spotlit} onClose={handleClose} />
//     </>
//   );
// }

// function MobileMarqueeRow({ items, speed = 40, onCardClick, spotlit }) {
//   const copyWidth = items.length * 252; // card 232 + gap 20

//   return (
//     <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
//       <div
//         className="flex py-2"
//         style={{
//           gap: 12,
//           width: copyWidth * 2,
//           animation: `marqueeLeft ${speed}s linear infinite`,
//           willChange: "transform",
//         }}
//       >
//         {[...items, ...items].map((item, i) => (
//           <button
//             key={i}
//             onClick={() => onCardClick(item)}
//             className="flex-shrink-0 text-left"
//             style={{
//               width: 232,
//               background:
//                 spotlit?.name === item.name
//                   ? "var(--color-brand-primary)"
//                   : "var(--color-bg-surface)",
//               border: `1.5px solid ${spotlit?.name === item.name ? "var(--color-brand-primary)" : "var(--color-border-accent)"}`,
//               borderRadius: 14,
//               padding: "16px 18px",
//               cursor: "pointer",
//               outline: "none",
//               transition: "transform 0.2s ease, border-color 0.2s ease",
//             }}
//           >
//             {/* Avatar + name row */}
//             <div className="flex items-center gap-2 mb-3">
//               <img
//                 src={item.avatar}
//                 alt={item.name}
//                 loading="eager"
//                 className="rounded-full object-cover flex-shrink-0"
//                 style={{
//                   width: 34,
//                   height: 34,
//                   border:
//                     spotlit?.name === item.name
//                       ? "2px solid rgba(255,255,255,0.5)"
//                       : "2px solid var(--color-border-accent)",
//                 }}
//               />
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <p
//                   className="text-[12.5px] font-semibold leading-tight truncate"
//                   style={{
//                     color:
//                       spotlit?.name === item.name
//                         ? "#fff"
//                         : "var(--color-text-primary)",
//                     fontFamily: "var(--font-body)",
//                   }}
//                 >
//                   {item.name}
//                 </p>
//                 <p
//                   className="text-[10px] mt-[1px]"
//                   style={{
//                     color:
//                       spotlit?.name === item.name
//                         ? "rgba(255,255,255,0.65)"
//                         : "var(--color-text-muted)",
//                   }}
//                 >
//                   {item.role}
//                 </p>
//               </div>
//               {/* Stars */}
//               <div className="flex gap-[1px] flex-shrink-0">
//                 {[...Array(5)].map((_, i) => (
//                   <span
//                     key={i}
//                     style={{
//                       fontSize: 9,
//                       color:
//                         spotlit?.name === item.name
//                           ? "rgba(255,255,255,0.85)"
//                           : "var(--color-brand-accent)",
//                     }}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Quote */}
//             <p
//               className="text-[11.5px] leading-[1.65] line-clamp-4"
//               style={{
//                 fontFamily: "var(--font-body)",
//                 color:
//                   spotlit?.name === item.name
//                     ? "rgba(255,255,255,0.9)"
//                     : "var(--color-text-secondary)",
//               }}
//             >
//               "{item.quote}"
//             </p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════
//    ROOT
// ════════════════════════════════════════════════════════ */
// export default function Testimonials() {
//   const [current, setCurrent] = useState(0);
//   const [cardStamp, setCardStamp] = useState(0);
//   const [barStamp, setBarStamp] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [isMobile, setIsMobile] = useState(getIsMobile);
//   const [mobileSpotlit, setMobileSpotlit] = useState(null);

//   const timerRef = useRef(null);
//   const pausedRef = useRef(false);
//   pausedRef.current = paused;

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640);
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const startTimer = useCallback(() => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       if (!pausedRef.current) {
//         setCurrent((c) => (c + 1) % n);
//         setCardStamp((s) => s + 1);
//         setTimeout(() => setBarStamp((s) => s + 1), 20);
//       }
//     }, INTERVAL);
//   }, []);

//   useEffect(() => {
//     startTimer();
//     return () => clearInterval(timerRef.current);
//   }, [startTimer]);

//   const goAndReset = useCallback(
//     (i) => {
//       setCurrent(i);
//       setCardStamp((s) => s + 1);
//       setTimeout(() => setBarStamp((s) => s + 1), 20);
//       startTimer();
//     },
//     [startTimer],
//   );

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center py-[70px] px-5"
//       style={{ background: "var(--color-bg-surface)" }}
//     >
//       <style>{`
//         .testi-wrap { font-family: var(--font-body, 'DM Sans', sans-serif); }




//         /* ── Marquee keyframes ── */
//         @keyframes marqueeLeft {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes marqueeRight {
//           from { transform: translateX(-50%); }
//           to   { transform: translateX(0); }
//         }




//         /* ── Card hover lift ── */
//         .marquee-card {
//           transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
//         }
//         .marquee-card:hover {
//           transform: translateY(-5px) scale(1.02);
//           box-shadow: 0 24px 64px rgba(45,122,58,0.18) !important;
//           border-color: var(--color-brand-primary) !important;
//         }




//         /* ── Spotlight modal entrance ── */
//         @keyframes spotIn {
//           from { opacity: 0; transform: scale(0.94) translateY(12px); }
//           to   { opacity: 1; transform: scale(1)    translateY(0); }
//         }
//         .spotlight-in { animation: spotIn 0.3s cubic-bezier(0.22,0.61,0.36,1) both; }




//         /* ── Mobile animations (unchanged) ── */
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up { animation: fadeUp 0.44s cubic-bezier(0.22,0.61,0.36,1) both; }




//         @keyframes progressRun {
//           from { width: 0%; }
//           to   { width: 100%; }
//         }
//         .progress-run { animation: progressRun ${INTERVAL}ms linear forwards; }




//         .avatar-orbit {
//           transition:
//             top 0.65s cubic-bezier(0.4,0,0.2,1),
//             left 0.65s cubic-bezier(0.4,0,0.2,1),
//             transform 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             width 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             height 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             box-shadow 0.4s, filter 0.4s,
//             border-color 0.4s, border-radius 0.4s;
//         }




//         .cta-btn { transition: all 0.5s ease; }
//         .cta-btn:hover {
//           background: transparent !important;
//           color: var(--color-brand-primary) !important;
//           transform: translateY(-2px);
//           box-shadow: var(--shadow-btn);
//         }
//       `}</style>

//       <section className="testi-wrap w-full max-w-7xl">
//         {/* ── HEADER ── */}
//         <div className="text-center mb-[60px]">
//           <BadgePill label="What Clients Say" />

//           <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
//             Trusted by{" "}
//             <span style={{ color: "var(--color-brand-primary)" }}>
//               Thousands
//             </span>
//           </h2>
//           <p
//             className="text-[14.5px] max-w-xl mx-auto leading-[1.75]"
//             style={{ color: "var(--color-text-secondary)" }}
//           >
//             Real feedback from early investors and community members who trusted
//             Jaimax Coin. Their words reflect the impact of our platform.
//           </p>
//         </div>

//         {/* ── BODY ── */}
//         {isMobile ? (
//           /* ── MOBILE marquee (single row) ── */
//           <>
//             <div
//               className="relative w-full overflow-hidden"
//               style={{
//                 maskImage:
//                   "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
//                 WebkitMaskImage:
//                   "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
//               }}
//             >
//               <MobileMarqueeRow
//                 items={data}
//                 speed={40}
//                 onCardClick={(item) => setMobileSpotlit(item)}
//                 spotlit={mobileSpotlit}
//               />
//             </div>

//             <p
//               className="text-center text-[11px] mt-4"
//               style={{ color: "var(--color-text-muted)" }}
//             >
//               Tap any card to read the full review
//             </p>

//             <Spotlight
//               item={mobileSpotlit}
//               onClose={() => setMobileSpotlit(null)}
//             />
//           </>
//         ) : (
//           /* ── DESKTOP marquee ── */
//           <DesktopMarquee />
//         )}
//       </section>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import rajkumar from "../../assets/Rajkumar.webp";
import mahendar from "../../assets/mahender.webp";
import krishnamraju from "../../assets/krishnamraju.jpeg";
import shekar from "../../assets/Shekar.jpg";
import anjanelu from "../../assets/B.veeranjaneyulu.jpg";
import Ratnam from "../../assets/Ratnam.jpg";
import pramod from "../../assets/pramod.jpg";
import BadgePill from "./BadgePill";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

// ── Real investor data from Doc2 ──
const testimonials = [
  {
    id: "#0030",
    name: "Krishnamraju",
    role: "Verified Investor · 15 Jan 2025",
    avatarImg: krishnamraju || "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=200",
    pillBg: ["#8B1A1A", "#e67e22"],
    cardBg: ["#1a0a0a", "#4a1010", "#8B1A1A"],
    glowColor: "#c0392b",
    quote: "Buying Jaimax Tokens was easy, and the transaction was super fast. The interface is clean, fast, and really easy to navigate.",
    body: "I started using the Jaimax app last month and it has been smooth so far. I love how transparent the project team is regarding updates and goals. Definitely recommend it to all those interested in crypto!",
  },
  {
    id: "#0031",
    name: "Mahendar",
    role: "Verified Investor · 12 Jan 2025",
    avatarImg: mahendar || "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=200",
    pillBg: ["#2c2c6e", "#6c5ce7"],
    cardBg: ["#0d0d2e", "#1a1a4a", "#4a3a7a"],
    glowColor: "#6c5ce7",
    quote: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. Their vision regarding digital payments is really unique.",
    body: "It was a smooth process, and my tokens showed up instantly within my wallet. What's impressive is that the team actually responds to community feedback.",
  },
  {
    id: "#0032",
    name: "Nimmala Rajkumar",
    role: "Verified Investor · 10 Jan 2025",
    avatarImg: rajkumar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg&q=60&w=200",
    pillBg: ["#6b5a3e", "#c8a96e"],
    cardBg: ["#1a1208", "#3a2e1e", "#6b5a3e"],
    glowColor: "#c8a96e",
    quote: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems.",
    body: "I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience!",
  },
  {
    id: "#0033",
    name: "Shekar K",
    role: "Verified Investor · 8 Jan 2025",
    avatarImg: shekar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=200",
    pillBg: ["#1a3a2a", "#2d8a4a"],
    cardBg: ["#050f08", "#0f2a18", "#1a4a2a"],
    glowColor: "#2d8a4a",
    quote: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are lightning-fast.",
    body: "Nice to see an Indian company doing something innovative with blockchain. The roadmap instils confidence that this is a project that's here to stay. Already told my colleagues to check it out!",
  },
  {
    id: "#0034",
    name: "Yella Rathnaiah",
    role: "Verified Investor · 5 Jan 2025",
    avatarImg: Ratnam || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fm=jpg&q=60&w=200",
    pillBg: ["#3a1a4a", "#7c3aed"],
    cardBg: ["#120a1e", "#2a1040", "#4a2060"],
    glowColor: "#7c3aed",
    quote: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks.",
    body: "The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Huge potential for further scaling!",
  },
  {
    id: "#0035",
    name: "Pramod Kumar",
    role: "Verified Investor · 3 Jan 2025",
    avatarImg: pramod || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=200",
    pillBg: ["#1a2a3a", "#0ea5e9"],
    cardBg: ["#05101a", "#0f2030", "#1a3045"],
    glowColor: "#0ea5e9",
    quote: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised.",
    body: "I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
  },
  {
    id: "#0036",
    name: "B. Veeranjaneyulu",
    role: "Verified Investor · 1 Jan 2025",
    avatarImg: anjanelu || "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?fm=jpg&q=60&w=200",
    pillBg: ["#4a1a1a", "#dc2626"],
    cardBg: ["#1a0505", "#350f0f", "#4a1818"],
    glowColor: "#dc2626",
    quote: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions.",
    body: "Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
  },
   {
    id: "#0037",
    name: "Jithendar Reddy",
    role: "Verified Investor · 28 Dec 2024",
    avatarImg: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=200",
    pillBg: ["#1a3a4a", "#0891b2"],
    cardBg: ["#050f14", "#0f2a38", "#1a3a4a"],
    glowColor: "#0891b2",
    quote: "The first thing I notice with Jaimax is the quality of the design — it feels really premium. The transactions are instant.",
    body: "I like how secure the login and KYC system are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
  },
  {
    id: "#0038",
    name: "Rohan Joshi",
    role: "Verified Investor · 25 Dec 2024",
    avatarImg: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=200",
    pillBg: ["#2a3a1a", "#65a30d"],
    cardBg: ["#0a1005", "#182a0f", "#253a12"],
    glowColor: "#65a30d",
    quote: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and track my tokens.",
    body: "Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
  },
  {
    id: "#0039",
    name: "Anjali Verma",
    role: "Verified Investor · 22 Dec 2024",
    avatarImg: "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=800",
    pillBg: ["#4a1a3a", "#db2777"],
    cardBg: ["#1a0514", "#380f2a", "#4a1a38"],
    glowColor: "#db2777",
    quote: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly — no hidden fees or delays.",
    body: "The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
  },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  @keyframes zoomBlurIn {
    0%   { transform: scale(1.12); filter: blur(10px); opacity: 0; }
    60%  { filter: blur(2px); opacity: 1; }
    100% { transform: scale(1);    filter: blur(0px);  opacity: 1; }
  }
  @keyframes zoomBlurOut {
    0%   { transform: scale(1);    filter: blur(0px);  opacity: 1; }
    100% { transform: scale(0.88); filter: blur(10px); opacity: 0; }
  }
  .card-in  { animation: zoomBlurIn  0.48s cubic-bezier(.22,1,.36,1) forwards; }
  .card-out { animation: zoomBlurOut 0.26s cubic-bezier(.4,0,1,1)    forwards; }

  @keyframes avatarPop {
    0%   { transform: scale(0.4) rotate(-25deg); opacity: 0; }
    70%  { transform: scale(1.08) rotate(4deg);  opacity: 1; }
    100% { transform: scale(1)    rotate(0deg);  opacity: 1; }
  }
  .avatar-pop { animation: avatarPop 0.52s cubic-bezier(.34,1.56,.64,1) forwards; }

  @keyframes textReveal {
    0%   { transform: translateY(22px) skewY(3deg); opacity: 0; clip-path: inset(0 0 100% 0); }
    100% { transform: translateY(0)    skewY(0deg); opacity: 1; clip-path: inset(0 0 0% 0); }
  }
  .t-l1 { animation: textReveal 0.4s 0.05s cubic-bezier(.22,1,.36,1) both; }
  .t-l2 { animation: textReveal 0.4s 0.15s cubic-bezier(.22,1,.36,1) both; }
  .t-l3 { animation: textReveal 0.4s 0.22s cubic-bezier(.22,1,.36,1) both; }
  .t-l4 { animation: textReveal 0.4s 0.30s cubic-bezier(.22,1,.36,1) both; }

  @keyframes pillElastic {
    0%   { transform: translateX(36px) scaleX(0.88); opacity: 0; }
    65%  { transform: translateX(-4px) scaleX(1.02); opacity: 1; }
    100% { transform: translateX(0)    scaleX(1);    opacity: 1; }
  }
  .pill-slide { animation: pillElastic 0.42s cubic-bezier(.22,1,.36,1) both; }

  @keyframes badgeFadeUp {
    0%   { transform: translateY(16px); opacity: 0; }
    100% { transform: translateY(0);    opacity: 1; }
  }
  .badge-in { animation: badgeFadeUp 0.38s 0.22s cubic-bezier(.22,1,.36,1) both; }

  .testi-root { font-family: 'DM Sans', sans-serif; }
  .pill-btn { background: none; border: none; cursor: pointer; display: block; width: 100%; text-align: left; }
  .pill-btn:focus-visible { outline: 2px solid #16a34a; outline-offset: 2px; border-radius: 999px; }

  @media (max-width: 700px) {
    .testi-cols { flex-direction: column !important; }
    .testi-right { max-width: 100% !important; }
  }
`;

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#facc15">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function PillAvatar({ item, size = 30 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      overflow: "hidden", flexShrink: 0,
      border: "2px solid rgba(255,255,255,0.3)",
    }}>
      <img src={item.avatarImg} alt={item.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}

export default function TestimonialsSection() {
  const n = testimonials.length;
  const [active, setActive]   = useState(0);
  const [current, setCurrent] = useState(0);
  const [phase, setPhase]     = useState("idle");
  const [textKey, setTextKey] = useState(0);
  const loopRef               = useRef(null);
  const busyRef               = useRef(false);
  const pendingRef            = useRef(null);
  const hoverTimer            = useRef(null);

  const navigate = useNavigate();

  const go = (nextIdx) => {
    if (nextIdx === active && phase === "idle") return;
    if (busyRef.current) { pendingRef.current = nextIdx; return; }
    busyRef.current = true;
    clearInterval(loopRef.current);
    setActive(nextIdx);
    setPhase("out");
    setTimeout(() => {
      setCurrent(nextIdx);
      setPhase("in");
      setTextKey((k) => k + 1);
      setTimeout(() => {
        setPhase("idle");
        busyRef.current = false;
        if (pendingRef.current !== null) {
          const ni = pendingRef.current; pendingRef.current = null; go(ni);
        } else { startLoop(nextIdx); }
      }, 500);
    }, 270);
  };

  const startLoop = (from = 0) => {
    clearInterval(loopRef.current);
    let cur = from;
    loopRef.current = setInterval(() => { cur = (cur + 1) % n; go(cur); }, 4000);
  };

  useEffect(() => { startLoop(0); return () => clearInterval(loopRef.current); }, []);

  const pillHover = (idx) => { clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => go(idx), 180); };
  const cancelHover = () => clearTimeout(hoverTimer.current);

  const t         = testimonials[current];
  const prevIdx   = (active - 1 + n) % n;
  const nextIdxes = [1, 2, 3].map((o) => (active + o) % n);
  const cardAnim  = phase === "out" ? "card-out" : phase === "in" ? "card-in" : "";

  const pillStyle = (item, extra = {}) => ({
    position: "relative", height: 52, borderRadius: 999, overflow: "hidden",
    background: `linear-gradient(to right, ${item.pillBg[0]}, ${item.pillBg[1]})`,
    ...extra,
  });

  return (
    <>
      <style>{STYLES}</style>
      <div className="testi-root" style={{
        Height: "100vh",
        background: "var(--color-bg-overlay)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "64px 28px",
      }}>
        <div style={{ maxWidth: 1100, width: "100%" }}>

          

          {/* ── Two columns ── */}
          <div className="testi-cols" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>

            {/* LEFT */}
            
            <div style={{ flex: "1 1 300px" }}>
              {/* ── Header ── */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <BadgePill label="What Investors Say"/>
            
            <h2
            className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]"
            
          >
            Trusted by{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Thousands</span>
          </h2>
            <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
              Real feedback from early investors and community members who trusted Jaimax Coin.
            </p>
          </div>
              <div key={textKey}>
                <div className="t-l1"><Stars /></div>
                <p className="t-l2" style={{
                  fontSize: 17, lineHeight: 1.8, fontStyle: "italic",
                  color: "#333", maxWidth: 420, marginTop: 16,
                }}>
                  "{t.quote}"
                </p>
                <p className="t-l3" style={{
                  fontSize: 13.5, lineHeight: 1.75, color: "#666",
                  maxWidth: 400, marginTop: 10,
                }}>
                  {t.body}
                </p>
                <div className="t-l4" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    overflow: "hidden", border: "2px solid #d1d5db", flexShrink: 0,
                  }}>
                    <img src={t.avatarImg} alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{t.role}</p>
                  </div>
                </div>
              </div>
              {/* <button style={{
                marginTop: 28,
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#111", color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 500,
                padding: "11px 22px", borderRadius: 999, border: "none", cursor: "pointer",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#222"}
                onMouseLeave={e => e.currentTarget.style.background = "#111"}
                onClick={() => navigate("/register")}
              >
                Invest in Jaimax <span style={{ fontSize: 17 }}>↗</span>
              </button> */}
              <div className="pt-10 ">
                <ActionButton
    text="Start your Journey"
    to="/register"
    variant="primary"
  />
  </div>
            </div>

            {/* RIGHT */}
            <div className="testi-right" style={{
              flex: "1 1 300px", maxWidth: 460, width: "100%",
              display: "flex", flexDirection: "column", gap: 10,
            }}>

              {/* Prev pill */}
              <button
                key={`prev-${prevIdx}`}
                className="pill-btn pill-slide"
                onClick={() => go(prevIdx)}
                onMouseEnter={() => pillHover(prevIdx)}
                onMouseLeave={cancelHover}
              >
                <div style={pillStyle(testimonials[prevIdx])}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.01)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 20px", gap: 10 }}>
                    <PillAvatar item={testimonials[prevIdx]} size={28} />
                    <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12.5, fontWeight: 500 }}>
                      {testimonials[prevIdx].name}
                    </span>
                  </div>
                  <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
                    {testimonials[prevIdx].id}
                  </span>
                </div>
              </button>

              {/* Main card */}
              <div style={{ position: "relative", height: 360, borderRadius: 24, overflow: "hidden" }}>
                <div
                  key={`card-${current}-${phase}`}
                  className={cardAnim}
                  style={{
                    position: "absolute", inset: 0, borderRadius: 24,
                    background: `linear-gradient(135deg, ${t.cardBg[0]}, ${t.cardBg[1]}, ${t.cardBg[2]})`,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
                    willChange: "transform, filter, opacity",
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    pointerEvents: "none",
                  }}>
                    <div style={{
                      width: 200, height: 200, borderRadius: "50%",
                      background: t.glowColor,
                      opacity: 0.22, filter: "blur(50px)",
                    }} />
                  </div>

                  {/* Avatar spin-pop */}
                  <div
                    key={`av-${current}`}
                    className="avatar-pop"
                    style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <div style={{
                      width: 136, height: 136, borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid rgba(255,255,255,0.15)",
                      boxShadow: "0 20px 56px rgba(0,0,0,0.45)",
                    }}>
                      <img src={t.avatarImg} alt={t.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>

                  {/* Badge */}
                  <div
                    key={`badge-${current}`}
                    className="badge-in"
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "18px 22px",
                      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                    }}
                  >
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 2 }}>{t.id}</p>
                      <h3 style={{
                        color: "#fff", fontSize: 19, fontWeight: 700,
                        fontFamily: "'Syne', sans-serif", marginBottom: 3,
                      }}>
                        Jaimax <em style={{ fontStyle: "italic", fontWeight: 600 }}>Investor</em>
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 11 }}>
                        {t.name} · {t.role.split("·")[0].trim()}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: "#facc15", fontSize: 12 }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next pills */}
              {nextIdxes.map((idx, i) => {
                const pill = testimonials[idx];
                return (
                  <button
                    key={`next-${idx}-${active}`}
                    className="pill-btn pill-slide"
                    onClick={() => go(idx)}
                    onMouseEnter={() => pillHover(idx)}
                    onMouseLeave={cancelHover}
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    <div style={pillStyle(pill)}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.01)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = ""; }}
                    >
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 20px", gap: 10 }}>
                        <PillAvatar item={pill} size={28} />
                        <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12.5, fontWeight: 500 }}>{pill.name}</span>
                      </div>
                      <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
                        {pill.id}
                      </span>
                    </div>
                  </button>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
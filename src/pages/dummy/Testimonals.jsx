// import { useState, useEffect, useRef } from "react";
// import rajkumar from "../../assets/Rajkumar.webp";
// import mahendar from "../../assets/mahender.webp";
// import krishnamraju from "../../assets/krishnamraju.jpeg";
// import shekar from "../../assets/Shekar.jpg";
// import anjanelu from "../../assets/B.veeranjaneyulu.jpg";
// import Ratnam from "../../assets/Ratnam.jpg";
// import pramod from "../../assets/pramod.jpg";

// const INTERVAL = 4000;

// const data = [
//   {
//     quote: "Buying Jaimax Tokens was easy, and the transaction was super fast. The interface is clean, fast, and really easy to navigate.",
//     body: "I started using the Jaimax app last month and it has been smooth so far. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
//     name: "Krishnamraju",
//     role: "Verified Investor · 15 January, 2025",
//     avatar: krishnamraju,
//   },
//   {
//     quote: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. Their vision regarding digital payments is really unique.",
//     body: "It was a smooth process, and my tokens showed up instantly within my wallet. What's impressive is that the team actually responds to community feedback.",
//     name: "Mahendar",
//     role: "Verified Investor · 12 January, 2025",
//     avatar: mahendar,
//   },
//   {
//     quote: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems.",
//     body: "I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience!",
//     name: "Nimmala Rajkumar",
//     role: "Verified Investor · 10 January, 2025",
//     avatar: rajkumar,
//   },
//   {
//     quote: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are lightning-fast.",
//     body: "Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out!",
//     name: "Shekar K",
//     role: "Verified Investor · 8 January, 2025",
//     avatar: shekar,
//   },
//   {
//     quote: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks.",
//     body: "The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Huge potential for further scaling!",
//     name: "Yella Rathnaiah",
//     role: "Verified Investor · 5 January, 2025",
//     avatar: Ratnam,
//   },
//   {
//     quote: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised.",
//     body: "I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
//     name: "Pramod Kumar",
//     role: "Verified Investor · 3 January, 2025",
//     avatar: pramod,
//   },
//   {
//     quote: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions.",
//     body: "Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
//     name: "B. Veeranjaneyulu",
//     role: "Verified Investor · 1 January, 2025",
//     avatar: anjanelu,
//   },
//   {
//     quote: "The first thing I notice with Jaimax is the quality of the design — it feels really premium. The transactions are instant.",
//     body: "I like how secure the login and KYC system are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
//     name: "Jithendar Reddy",
//     role: "Verified Investor · 28 December, 2024",
//     avatar: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=800",
//   },
//   {
//     quote: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and track my tokens.",
//     body: "Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
//     name: "Rohan Joshi",
//     role: "Verified Investor · 25 December, 2024",
//     avatar: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=800",
//   },
//   {
//     quote: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly — no hidden fees or delays.",
//     body: "The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
//     name: "Anjali Verma",
//     role: "Verified Investor · 22 December, 2024",
//     avatar: "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=800",
//   },
// ];

// const n = data.length;

// // ─── DESKTOP: True rotating wheel ─────────────────────────────────────────────
// // Each image sits at a fixed angle on the wheel (360/n degrees apart).
// // The whole wheel div rotates via CSS transform. Each image counter-rotates
// // so it stays upright. The "active" one is always at the top (angle=0).
// // We track a cumulative rotation angle so spinning is always smooth/continuous.

// const WHEEL_RADIUS = 110; // px from center to image
// const IMG_W = 120;         // active image size
// const WHEEL_SIZE = 300;   // container size

// function ReelWheel({ current, onSelect, rotationDeg }) {
//   return (
//     <div
//       className="relative flex-shrink-0"
//       style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
//     >
//       {/* The rotating wheel */}
//       <div
//         className="wheel-ring absolute inset-0"
//         style={{ transform: `rotate(${rotationDeg}deg)` }}
//       >
//         {data.map((person, i) => {
//           // Each image is placed at angle = (360/n) * i
//           // i=0 starts at top (-90deg offset so 0 = top)
//           const angleDeg = (360 / n) * i - 90;
//           const angleRad = (angleDeg * Math.PI) / 180;
//           const cx = WHEEL_SIZE / 2;
//           const cy = WHEEL_SIZE / 2;
//           const x = cx + Math.cos(angleRad) * WHEEL_RADIUS;
//           const y = cy + Math.sin(angleRad) * WHEEL_RADIUS;

//           const isActive = i === current;
//           const imgSize = isActive ? IMG_W : 62;

//           return (
//             <button
//               key={i}
//               onClick={() => onSelect(i)}
//               aria-label={person.name}
//               className="wheel-item absolute bg-transparent border-0 p-0 cursor-pointer"
//               style={{
//                 left: x - imgSize / 2,
//                 top:  y - imgSize / 2,
//                 width:  imgSize,
//                 height: imgSize,
//                 zIndex: isActive ? 10 : 5,
//                 // counter-rotate so image stays upright
//                 transform: `rotate(${-rotationDeg}deg)`,
//               }}
//             >
//               <img
//                 src={person.avatar}
//                 alt={person.name}
//                 loading="lazy"
//                 className="w-full h-full object-cover"
//                 style={{
//                   borderRadius: isActive ? 18 : 12,
//                   border:    isActive ? "3px solid #d63031" : "2px solid transparent",
//                   boxShadow: isActive
//                     ? "0 12px 40px rgba(214,48,49,.38), 0 4px 16px rgba(0,0,0,.18)"
//                     : "0 2px 8px rgba(0,0,0,.15)",
//                   filter: isActive ? "none" : "grayscale(65%) brightness(68%)",
//                   transition: "border-radius .4s, border .4s, box-shadow .4s, filter .4s, width .4s, height .4s",
//                 }}
//               />
//             </button>
//           );
//         })}
//       </div>

//       {/* Center dot */}
//       <div
//         className="absolute rounded-full bg-[#d63031]/20 pointer-events-none"
//         style={{
//           width: 6, height: 6,
//           left: WHEEL_SIZE / 2 - 3,
//           top:  WHEEL_SIZE / 2 - 3,
//         }}
//       />

//       {/* Top highlight arc — shows "active zone" */}
//       {/* <div
//         className="absolute pointer-events-none"
//         style={{
//           width: WHEEL_SIZE ,
//           height: WHEEL_SIZE,
//           top: 0, left: 0,
//           borderRadius: "50%",
//           border: "1px dashed rgba(214,48,49,0.12)",
//         }}
//       /> */}
//     </div>
//   );
// }

// // ─── MOBILE: Original slot-based animation (from first version) ───────────────
// // 4 fixed slots: active left, others spaced right, shrinking & fading.
// // All 10 items rotate through these 4 slots.

// function getHorizontalSlot(slot) {
//   const configs = [
//     { left: "0%",  top: "50%", transform: "translate(0, -50%) scale(1)",    w: 108, h: 86, z: 20 },
//     { left: "38%", top: "50%", transform: "translate(0, -50%) scale(0.8)",  w: 86,  h: 68, z: 10 },
//     { left: "62%", top: "50%", transform: "translate(0, -50%) scale(0.72)", w: 80,  h: 64, z: 9  },
//     { left: "82%", top: "50%", transform: "translate(0, -50%) scale(0.65)", w: 76,  h: 60, z: 8  },
//   ];
//   return configs[slot % 4];
// }

// function MobileOrbit({ current, onSelect }) {
//   // Only render 4 slots: current, current+1, current+2, current+3
//   const visible = [0, 1, 2, 3].map((offset) => {
//     const dataIndex = (current + offset) % n;
//     return { dataIndex, slotIndex: offset, person: data[dataIndex] };
//   });

//   return (
//     <div
//       className="relative flex-shrink-0"
//       style={{ width: "100%", maxWidth: 340, height: 110 }}
//     >
//       <div className="absolute top-1/2 left-[5%] right-[5%] h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#d63031]/20 to-transparent pointer-events-none" />

//       {visible.map(({ dataIndex, slotIndex, person }) => {
//         const cfg = getHorizontalSlot(slotIndex);
//         const isActive = slotIndex === 0;

//         return (
//           <button
//             key={`mob-slot-${slotIndex}`}
//             onClick={() => onSelect(dataIndex)}
//             aria-label={person.name}
//             className="avatar-orbit absolute bg-transparent border-none p-0 cursor-pointer"
//             style={{
//               top:       cfg.top,
//               left:      cfg.left,
//               width:     cfg.w,
//               height:    cfg.h,
//               transform: cfg.transform,
//               zIndex:    cfg.z,
//             }}
//           >
//             <img
//               src={person.avatar}
//               alt={person.name}
//               loading="lazy"
//               className="w-full sm:h-[110%] h-[155%] object-cover"
//               style={{
//                 borderRadius: isActive ? 20 : 14,
//                 border:       isActive ? "3px solid #d63031" : "2px solid transparent",
//                 boxShadow:    isActive
//                   ? "0 16px 48px rgba(214,48,49,.32), 0 4px 16px rgba(0,0,0,.15)"
//                   : "0 4px 12px rgba(0,0,0,.12)",
//                 filter: isActive ? "none" : "grayscale(65%) brightness(80%)",
//               }}
//             />
//             {isActive && (
//               <span
//                 className="sm:block hidden absolute w-[6px] h-[6px] rounded-full bg-[#d63031]"
//                 style={{ bottom: -8, left: "50%", transform: "translateX(-50%)" }}
//               />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Card & Progress ──────────────────────────────────────────────────────────

// function CardContent({ t }) {
//   return (
//     <div className="fade-up relative z-10 flex flex-col gap-8 h-full justify-between">
//       <div>
//         <p className="cormorant text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold leading-[1.42] mb-5 text-[#181818]">
//           {t.quote}
//         </p>
//         <p className="text-[14px] text-[#666] leading-[1.78]">{t.body}</p>
//       </div>
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-dashed border-[#e0dbd4] pt-[22px]">
//         <div className="flex items-center gap-[14px]">
//           <img
//             src={t.avatar}
//             alt={t.name}
//             loading="lazy"
//             className="w-[46px] h-[46px] rounded-full object-cover border-2 border-[#e6e1da]"
//           />
//           <div>
//             <p className="text-[14.5px] font-semibold text-[#181818]">{t.name}</p>
//             <p className="text-[12px] text-[#aaa]">{t.role}</p>
//           </div>
//         </div>
//         <div className="flex gap-[3px]">
//           {[...Array(5)].map((_, si) => (
//             <span key={si} className="text-[#d63031] text-[17px]">★</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ProgressBar() {
//   return <div className="progress-run absolute bottom-0 left-0 h-[3px] bg-[#d63031] rounded-r-[3px]" />;
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────

// export default function Testimonials() {
//   const [current,     setCurrent]     = useState(0);
//   const [stamp,       setStamp]       = useState(0);
//   const [paused,      setPaused]      = useState(false);
//   const [isMobile,    setIsMobile]    = useState(false);
//   const [rotationDeg, setRotationDeg] = useState(0); // cumulative wheel rotation

//   const timerRef  = useRef(null);
//   const pausedRef = useRef(false);
//   pausedRef.current = paused;

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const stepAngle = 360 / n; // degrees per step

//   const startTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       if (!pausedRef.current) {
//         setCurrent((c) => (c + 1) % n);
//         setRotationDeg((r) => r + stepAngle); // always add, never reset → smooth spin
//         setStamp((s) => s + 1);
//       }
//     }, INTERVAL);
//   };

//   useEffect(() => {
//     startTimer();
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const goAndReset = (i) => {
//     // Spin forward the shortest path to the selected index
//     const diff = ((i - current) + n) % n;
//     setCurrent(i);
//     setRotationDeg((r) => r + diff * stepAngle);
//     setStamp((s) => s + 1);
//     startTimer();
//   };

//   return (
//     <div className="bg-[#f0ede8] min-h-screen flex items-center justify-center py-[70px] px-5">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');
//         .testi-wrap { font-family: 'Outfit', sans-serif; }
//         .cormorant  { font-family: 'Cormorant Garamond', serif; }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(22px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up { animation: fadeUp 0.42s cubic-bezier(0.22,0.61,0.36,1) both; }

//         @keyframes progressRun {
//           from { width: 0%; }
//           to   { width: 100%; }
//         }
//         .progress-run { animation: progressRun ${INTERVAL}ms linear forwards; }

//         /* Desktop wheel: smooth CSS rotation transition on the whole ring */
//         .wheel-ring {
//           transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         /* Each item counter-rotates to stay upright */
//         .wheel-item {
//           transition:
//             transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
//             left      0.65s cubic-bezier(0.4, 0, 0.2, 1),
//             top       0.65s cubic-bezier(0.4, 0, 0.2, 1),
//             width     0.4s ease,
//             height    0.4s ease;
//         }

//         /* Mobile: original slot transitions */
//         .avatar-orbit {
//           transition:
//             top       0.65s cubic-bezier(0.4,0,0.2,1),
//             left      0.65s cubic-bezier(0.4,0,0.2,1),
//             transform 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             width     0.65s cubic-bezier(0.34,1.3,0.64,1),
//             height    0.65s cubic-bezier(0.34,1.3,0.64,1),
//             box-shadow 0.4s, filter 0.4s,
//             border-color 0.4s, border-radius 0.4s;
//         }
//       `}</style>

//       <section className="testi-wrap w-full max-w-7xl">

//         {/* HEADER */}
//         <div className="text-center mb-[60px]">
//           <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase text-[#666] mb-[14px]">
//             <span className="w-5 h-[2px] bg-[#d63031] inline-block" />
//             What Clients Say
//           </div>
//           <h2 className="cormorant text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.12] tracking-[-0.02em] mb-4 text-[#181818]">
//             Trusted by Thousands<br />of Crypto Investors
//           </h2>
//           <p className="text-[14.5px] text-[#666] max-w-[460px] mx-auto leading-[1.75]">
//             Real feedback from early investors and community members who trusted Jaimax Coin. Their words reflect the impact of our platform.
//           </p>
//         </div>

//         {/* BODY */}
//         <div
//           className={isMobile ? "flex flex-col gap-6" : ""}
//           style={!isMobile ? { display: "grid", gridTemplateColumns: "320px 1fr", gap: "40px", alignItems: "center" } : {}}
//         >
//           <div className={isMobile ? "w-full flex justify-center px-2" : "flex justify-center"}>
//             {isMobile
//               ? <MobileOrbit current={current} onSelect={goAndReset} />
//               : <ReelWheel   current={current} onSelect={goAndReset} rotationDeg={rotationDeg} />
//             }
//           </div>

//           {/* QUOTE CARD */}
//           <div
//             className="bg-white rounded-[6px] mt-10 px-6 py-7 sm:px-[52px] sm:py-[52px] sm:pb-[44px] shadow-[0_24px_64px_rgba(0,0,0,0.13)] relative overflow-hidden min-h-[300px] sm:min-h-[360px] flex flex-col justify-between"
//             onMouseEnter={() => setPaused(true)}
//             onMouseLeave={() => setPaused(false)}
//           >
//             <span className="cormorant absolute top-[-40px] right-4 sm:right-6 text-[140px] sm:text-[260px] text-[#f5f0eb] leading-none pointer-events-none select-none">
//               &ldquo;
//             </span>
//             <CardContent key={stamp} t={data[current]} />
//             {!paused && <ProgressBar key={`p-${stamp}`} />}
//           </div>
//         </div>

//         {/* DOTS */}
//         <div className="flex justify-center gap-[9px] mt-[30px]">
//           {data.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goAndReset(i)}
//               aria-label={`Testimonial ${i + 1}`}
//               className={`h-[7px] rounded-full border-none p-0 cursor-pointer transition-all duration-300 ${
//                 i === current ? "bg-[#d63031] w-[28px]" : "bg-[#ccc] w-[7px]"
//               }`}
//             />
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-[56px] text-center">
//           <p className="text-[13px] text-[#666] leading-[1.65] mb-[18px]">
//             Ready to join the Jaimax<br />presale community?
//           </p>
//           <a
//             href="#"
//             className="inline-block bg-[#181818] text-white text-[12px] font-semibold tracking-[.1em] uppercase py-[15px] px-[38px] rounded-full border-2 border-[#181818] no-underline transition-all duration-[250ms] hover:bg-transparent hover:text-[#181818] hover:-translate-y-[2px]"
//           >
//             Participate in Presale
//           </a>
//         </div>

//       </section>
//     </div>
//   );
// }

import { useState, useEffect, useRef, useCallback } from "react";
import rajkumar from "../../assets/Rajkumar.webp";
import mahendar from "../../assets/mahender.webp";
import krishnamraju from "../../assets/krishnamraju.jpeg";
import shekar from "../../assets/Shekar.jpg";
import anjanelu from "../../assets/B.veeranjaneyulu.jpg";
import Ratnam from "../../assets/Ratnam.jpg";
import pramod from "../../assets/pramod.jpg";

const INTERVAL = 4000;

const data = [
  {
    quote: "Buying Jaimax Tokens was easy, and the transaction was super fast. The interface is clean, fast, and really easy to navigate.",
    body: "I started using the Jaimax app last month and it has been smooth so far. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
    name: "Krishnamraju",
    role: "Verified Investor · 15 January, 2025",
    avatar: krishnamraju,
  },
  {
    quote: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. Their vision regarding digital payments is really unique.",
    body: "It was a smooth process, and my tokens showed up instantly within my wallet. What's impressive is that the team actually responds to community feedback.",
    name: "Mahendar",
    role: "Verified Investor · 12 January, 2025",
    avatar: mahendar,
  },
  {
    quote: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems.",
    body: "I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience!",
    name: "Nimmala Rajkumar",
    role: "Verified Investor · 10 January, 2025",
    avatar: rajkumar,
  },
  {
    quote: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are lightning-fast.",
    body: "Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out!",
    name: "Shekar K",
    role: "Verified Investor · 8 January, 2025",
    avatar: shekar,
  },
  {
    quote: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks.",
    body: "The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Huge potential for further scaling!",
    name: "Yella Rathnaiah",
    role: "Verified Investor · 5 January, 2025",
    avatar: Ratnam,
  },
  {
    quote: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised.",
    body: "I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
    name: "Pramod Kumar",
    role: "Verified Investor · 3 January, 2025",
    avatar: pramod,
  },
  {
    quote: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions.",
    body: "Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
    name: "B. Veeranjaneyulu",
    role: "Verified Investor · 1 January, 2025",
    avatar: anjanelu,
  },
  {
    quote: "The first thing I notice with Jaimax is the quality of the design — it feels really premium. The transactions are instant.",
    body: "I like how secure the login and KYC system are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
    name: "Jithendar Reddy",
    role: "Verified Investor · 28 December, 2024",
    avatar: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=800",
  },
  {
    quote: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and track my tokens.",
    body: "Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
    name: "Rohan Joshi",
    role: "Verified Investor · 25 December, 2024",
    avatar: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=800",
  },
  {
    quote: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly — no hidden fees or delays.",
    body: "The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
    name: "Anjali Verma",
    role: "Verified Investor · 22 December, 2024",
    avatar: "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=800",
  },
];

const n = data.length;

const WHEEL_RADIUS = 110;
const IMG_W = 120;
const WHEEL_SIZE = 300;

// ── FIX 1: Read window.innerWidth synchronously on first render
//    so isMobile is correct before the first paint — no layout flash.
function getIsMobile() {
  return typeof window !== "undefined" && window.innerWidth < 640;
}

function ReelWheel({ current, onSelect, rotationDeg }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
    >
      <div
        className="wheel-ring absolute inset-0"
        style={{ transform: `rotate(${rotationDeg}deg)` }}
      >
        {data.map((person, i) => {
          const angleDeg = (360 / n) * i - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          const cx = WHEEL_SIZE / 2;
          const cy = WHEEL_SIZE / 2;
          const x = cx + Math.cos(angleRad) * WHEEL_RADIUS;
          const y = cy + Math.sin(angleRad) * WHEEL_RADIUS;

          const isActive = i === current;
          const imgSize = isActive ? IMG_W : 62;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={person.name}
              className="wheel-item absolute bg-transparent border-0 p-0 cursor-pointer"
              style={{
                left: x - imgSize / 2,
                top:  y - imgSize / 2,
                width:  imgSize,
                height: imgSize,
                zIndex: isActive ? 10 : 5,
                transform: `rotate(${-rotationDeg}deg)`,
              }}
            >
              <img
                src={person.avatar}
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{
                  borderRadius: isActive ? 18 : 12,
                  border:    isActive ? "3px solid var(--color-brand-primary)" : "2px solid transparent",
                  boxShadow: isActive
                    ? "0 12px 40px rgba(45,122,58,.32), 0 4px 16px rgba(0,0,0,.12)"
                    : "0 2px 8px rgba(0,0,0,.10)",
                  filter: isActive ? "none" : "grayscale(65%) brightness(68%)",
                  transition: "border-radius .4s, border .4s, box-shadow .4s, filter .4s, width .4s, height .4s",
                }}
              />
            </button>
          );
        })}
      </div>

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 6, height: 6,
          left: WHEEL_SIZE / 2 - 3,
          top:  WHEEL_SIZE / 2 - 3,
          background: "var(--color-brand-primary)",
          opacity: 0.3,
        }}
      />
    </div>
  );
}

function getHorizontalSlot(slot) {
  const configs = [
    { left: "0%",  top: "50%", transform: "translate(0, -50%) scale(1)",    w: 108, h: 86, z: 20 },
    { left: "38%", top: "50%", transform: "translate(0, -50%) scale(0.8)",  w: 86,  h: 68, z: 10 },
    { left: "62%", top: "50%", transform: "translate(0, -50%) scale(0.72)", w: 80,  h: 64, z: 9  },
    { left: "82%", top: "50%", transform: "translate(0, -50%) scale(0.65)", w: 76,  h: 60, z: 8  },
  ];
  return configs[slot % 4];
}

function MobileOrbit({ current, onSelect }) {
  const visible = [0, 1, 2, 3].map((offset) => {
    const dataIndex = (current + offset) % n;
    return { dataIndex, slotIndex: offset, person: data[dataIndex] };
  });

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "100%", maxWidth: 340, height: 110 }}
    >
      <div
        className="absolute top-1/2 left-[5%] right-[5%] h-[1px] -translate-y-1/2 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(45,122,58,0.2), transparent)" }}
      />

      {visible.map(({ dataIndex, slotIndex, person }) => {
        const cfg = getHorizontalSlot(slotIndex);
        const isActive = slotIndex === 0;

        return (
          <button
            key={`mob-slot-${slotIndex}`}
            onClick={() => onSelect(dataIndex)}
            aria-label={person.name}
            className="avatar-orbit absolute bg-transparent border-none p-0 cursor-pointer"
            style={{
              top:       cfg.top,
              left:      cfg.left,
              width:     cfg.w,
              height:    cfg.h,
              transform: cfg.transform,
              zIndex:    cfg.z,
            }}
          >
            <img
              src={person.avatar}
              alt={person.name}
              loading="lazy"
              className="w-full sm:h-[110%] h-[155%] object-cover"
              style={{
                borderRadius: isActive ? 20 : 14,
                border:       isActive ? "3px solid var(--color-brand-primary)" : "2px solid transparent",
                boxShadow:    isActive
                  ? "0 16px 48px rgba(45,122,58,.28), 0 4px 16px rgba(0,0,0,.12)"
                  : "0 4px 12px rgba(0,0,0,.10)",
                filter: isActive ? "none" : "grayscale(65%) brightness(80%)",
              }}
            />
            {isActive && (
              <span
                className="sm:block hidden absolute w-[6px] h-[6px] rounded-full"
                style={{
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--color-brand-primary)",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function CardContent({ t }) {
  return (
    <div className="fade-up relative z-10 flex flex-col gap-8 h-full justify-between">
      <div>
        <p
          className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold leading-[1.42] mb-5"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          {t.quote}
        </p>
        <p
          className="text-[14px] leading-[1.78]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {t.body}
        </p>
      </div>
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-[22px]"
        style={{ borderTop: "1px dashed rgba(45,122,58,0.20)" }}
      >
        <div className="flex items-center gap-[14px]">
          <img
            src={t.avatar}
            alt={t.name}
            loading="lazy"
            className="w-[46px] h-[46px] rounded-full object-cover"
            style={{ border: "2px solid var(--color-border-accent)" }}
          />
          <div>
            <p
              className="text-[14.5px] font-semibold"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}
            >
              {t.name}
            </p>
            <p
              className="text-[12px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.role}
            </p>
          </div>
        </div>
        <div className="flex gap-[3px]">
          {[...Array(5)].map((_, si) => (
            <span
              key={si}
              className="text-[17px]"
              style={{ color: "var(--color-brand-accent)" }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FIX 2: ProgressBar gets its own independent key prop passed from parent,
//    completely decoupled from the card's stamp so they don't race each other.
function ProgressBar({ animKey }) {
  return (
    <div
      key={animKey}
      className="progress-run absolute bottom-0 left-0 h-[3px] rounded-r-[3px]"
      style={{ background: "var(--color-brand-primary)" }}
    />
  );
}

export default function Testimonials() {
  // ── FIX 1 applied: lazy initialiser reads window immediately, no flash
  const [current,     setCurrent]     = useState(0);
  const [cardStamp,   setCardStamp]   = useState(0);   // drives CardContent re-mount
  const [barStamp,    setBarStamp]    = useState(0);   // drives ProgressBar re-mount (separate)
  const [paused,      setPaused]      = useState(false);
  const [isMobile,    setIsMobile]    = useState(getIsMobile);
  const [rotationDeg, setRotationDeg] = useState(0);

  const timerRef  = useRef(null);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stepAngle = 360 / n;

  // ── FIX 3: wrap startTimer in useCallback so goAndReset always
  //    gets a stable reference and won't re-create intervals unnecessarily.
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((c) => (c + 1) % n);
        setRotationDeg((r) => r + stepAngle);
        // Stagger bar reset slightly after card so animations don't collide
        setCardStamp((s) => s + 1);
        setTimeout(() => setBarStamp((s) => s + 1), 20);
      }
    }, INTERVAL);
  }, [stepAngle]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goAndReset = useCallback((i) => {
    setCurrent((prev) => {
      const diff = ((i - prev) + n) % n;
      setRotationDeg((r) => r + diff * stepAngle);
      return i;
    });
    setCardStamp((s) => s + 1);
    setTimeout(() => setBarStamp((s) => s + 1), 20);
    startTimer();
  }, [startTimer, stepAngle]);

  return (
    <div
      className="min-h-screen flex items-center justify-center py-[70px] px-5"
      style={{ background: "var(--color-bg-surface)" }}
    >
      {/*
        FIX 4: Move Google Fonts to a <link> in your index.html <head> instead.
        The @import inside a runtime <style> tag blocks paint and causes FOIT.
        Add this to your public/index.html:

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      */}
      <style>{`
        .testi-wrap { font-family: var(--font-body, 'DM Sans', sans-serif); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.42s cubic-bezier(0.22,0.61,0.36,1) both; }

        @keyframes progressRun {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .progress-run { animation: progressRun ${INTERVAL}ms linear forwards; }

        .wheel-ring {
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .wheel-item {
          transition:
            transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
            left      0.65s cubic-bezier(0.4, 0, 0.2, 1),
            top       0.65s cubic-bezier(0.4, 0, 0.2, 1),
            width     0.4s ease,
            height    0.4s ease;
        }

        .avatar-orbit {
          transition:
            top       0.65s cubic-bezier(0.4,0,0.2,1),
            left      0.65s cubic-bezier(0.4,0,0.2,1),
            transform 0.65s cubic-bezier(0.34,1.3,0.64,1),
            width     0.65s cubic-bezier(0.34,1.3,0.64,1),
            height    0.65s cubic-bezier(0.34,1.3,0.64,1),
            box-shadow 0.4s, filter 0.4s,
            border-color 0.4s, border-radius 0.4s;
        }

        .cta-btn {
          transition: var(--transition-slow, all 0.5s ease);
        }
        .cta-btn:hover {
          background: transparent !important;
          color: var(--color-brand-primary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-btn);
        }
      `}</style>

      <section className="testi-wrap w-full max-w-7xl">

        {/* HEADER */}
        <div className="text-center mb-[60px]">
          <div
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase mb-[14px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span
              className="w-5 h-[2px] inline-block"
              style={{ background: "var(--color-brand-primary)" }}
            />
            What Clients Say
          </div>
          <h2
            className="text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.12] tracking-[-0.02em] mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            Trusted by Thousands<br />of Crypto Investors
          </h2>
          <p
            className="text-[14.5px] max-w-[460px] mx-auto leading-[1.75]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Real feedback from early investors and community members who trusted Jaimax Coin. Their words reflect the impact of our platform.
          </p>
        </div>

        {/* BODY */}
        <div
          className={isMobile ? "flex flex-col gap-6" : ""}
          style={!isMobile ? { display: "grid", gridTemplateColumns: "320px 1fr", gap: "40px", alignItems: "center" } : {}}
        >
          <div className={isMobile ? "w-full flex justify-center px-2" : "flex justify-center"}>
            {isMobile
              ? <MobileOrbit current={current} onSelect={goAndReset} />
              : <ReelWheel   current={current} onSelect={goAndReset} rotationDeg={rotationDeg} />
            }
          </div>

          {/* QUOTE CARD */}
          <div
            className="rounded-[8px] mt-10 px-6 py-7 sm:px-[52px] sm:py-[52px] sm:pb-[44px] relative overflow-hidden min-h-[300px] sm:min-h-[360px] flex flex-col justify-between"
            style={{
              background: "var(--color-bg-surface)",
              boxShadow: "var(--shadow-card)",
              border: "1px solid var(--color-border-accent)",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Decorative quote mark */}
            <span
              className="absolute top-[-40px] right-4 sm:right-6 text-[140px] sm:text-[260px] leading-none pointer-events-none select-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "rgba(45,122,58,0.07)",
              }}
            >
              &ldquo;
            </span>

            {/* Subtle top-right accent blob */}
            <div
              className="absolute top-0 right-0 w-[120px] h-[120px] rounded-bl-full pointer-events-none"
              style={{ background: "rgba(127,199,66,0.06)" }}
            />

            {/* FIX 2 applied: card and bar have separate keys */}
            <CardContent key={cardStamp} t={data[current]} />
            {!paused && <ProgressBar animKey={barStamp} />}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-[9px] mt-[30px]">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => goAndReset(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="h-[7px] rounded-full border-none p-0 cursor-pointer"
              style={{
                width: i === current ? 28 : 7,
                background: i === current ? "var(--color-brand-primary)" : "var(--color-brand-light)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-[56px] text-center">
          <p
            className="text-[13px] leading-[1.65] mb-[18px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Ready to join the Jaimax<br />presale community?
          </p>
          <a
            href="#"
            className="cta-btn inline-block text-[12px] font-semibold tracking-[.1em] uppercase py-[15px] px-[38px] rounded-full border-2 no-underline"
            style={{
              background: "var(--color-brand-primary)",
              color: "var(--color-text-on-dark)",
              borderColor: "var(--color-brand-primary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Participate in Presale
          </a>
        </div>

      </section>
    </div>
  );
}
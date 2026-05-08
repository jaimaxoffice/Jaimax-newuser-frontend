// import { useState } from "react";

// // ── Icons ────────────────────────────────────────────────────────────────────

// const RocketIcon = () => (
//   <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
//     <ellipse cx="40" cy="42" rx="13" ry="28" fill="url(#rg1)" />
//     <path d="M40 10 C31 22 27 32 27 42 L53 42 C53 32 49 22 40 10Z" fill="url(#rg2)" />
//     <circle cx="40" cy="38" r="7" fill="url(#rg3)" />
//     <circle cx="40" cy="38" r="4.5" fill="#c8d0e0" />
//     <path d="M27 55 L18 68 L27 62 Z" fill="url(#rg2)" />
//     <path d="M53 55 L62 68 L53 62 Z" fill="url(#rg2)" />
//     <ellipse cx="40" cy="72" rx="7" ry="9" fill="#f46b1a" opacity=".9" />
//     <ellipse cx="40" cy="72" rx="4" ry="6" fill="#ffa040" opacity=".8" />
//     <ellipse cx="40" cy="83" rx="12" ry="3" fill="rgba(0,0,0,0.10)" />
//     <defs>
//       <linearGradient id="rg1" x1="27" y1="14" x2="53" y2="70" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
//       </linearGradient>
//       <linearGradient id="rg2" x1="20" y1="10" x2="60" y2="70" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#16213e" />
//       </linearGradient>
//       <linearGradient id="rg3" x1="33" y1="31" x2="47" y2="45" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#4a5a80" /><stop offset="100%" stopColor="#1e2a42" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// const AgentIcon = () => (
//   <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
//     <rect x="20" y="36" width="40" height="38" rx="8" fill="url(#sg1)" />
//     <ellipse cx="40" cy="36" rx="22" ry="6" fill="url(#sg2)" />
//     <rect x="26" y="14" width="28" height="24" rx="5" fill="url(#sg2)" />
//     <rect x="22" y="32" width="36" height="7" rx="3" fill="url(#sg3)" />
//     <ellipse cx="40" cy="44" rx="11" ry="9" fill="url(#sg4)" />
//     <ellipse cx="35" cy="43" rx="3.5" ry="3" fill="#c8d0e0" />
//     <ellipse cx="45" cy="43" rx="3.5" ry="3" fill="#c8d0e0" />
//     <circle cx="35.5" cy="43.5" r="1.5" fill="#1a2436" />
//     <circle cx="45.5" cy="43.5" r="1.5" fill="#1a2436" />
//     <path d="M20 60 Q12 64 14 74 L66 74 Q68 64 60 60 Z" fill="url(#sg1)" />
//     <path d="M38 55 L40 62 L42 55 Z" fill="#f46b1a" />
//     <ellipse cx="40" cy="83" rx="16" ry="3" fill="rgba(0,0,0,0.10)" />
//     <defs>
//       <linearGradient id="sg1" x1="20" y1="36" x2="60" y2="74" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
//       </linearGradient>
//       <linearGradient id="sg2" x1="20" y1="14" x2="60" y2="42" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#1e2a42" />
//       </linearGradient>
//       <linearGradient id="sg3" x1="22" y1="32" x2="58" y2="39" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#4a5a80" /><stop offset="100%" stopColor="#2a3850" />
//       </linearGradient>
//       <linearGradient id="sg4" x1="29" y1="35" x2="51" y2="53" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#d0d8ea" /><stop offset="100%" stopColor="#a0aac0" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
//     <path d="M40 12 L64 22 L64 46 C64 62 52 74 40 78 C28 74 16 62 16 46 L16 22 Z" fill="url(#shg1)" />
//     <path d="M40 18 L58 26 L58 46 C58 59 49 69 40 73 C31 69 22 59 22 46 L22 26 Z" fill="url(#shg2)" />
//     <path d="M29 44 L37 53 L53 36" stroke="#e8f0ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
//     <ellipse cx="40" cy="83" rx="16" ry="3" fill="rgba(0,0,0,0.10)" />
//     <defs>
//       <linearGradient id="shg1" x1="16" y1="12" x2="64" y2="78" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#0d1628" />
//       </linearGradient>
//       <linearGradient id="shg2" x1="22" y1="18" x2="58" y2="73" gradientUnits="userSpaceOnUse">
//         <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#16213e" />
//       </linearGradient>
//     </defs>
//   </svg>
// );

// // ── Data ──────────────────────────────────────────────────────────────────────

// const features = [
//   {
//     icon: <RocketIcon />,
//     title: "Value Performance",
//     desc: "At vero eos et accusamus et iusto odio dignissi ducimus blanditiis deleniti.",
//   },
//   {
//     icon: <AgentIcon />,
//     title: "High Security",
//     desc: "Et harum quidem rerum facilis est et expedita distinctio nam libero.",
//   },
//   {
//     icon: <ShieldIcon />,
//     title: "Propery Model",
//     desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
//   },
// ];

// const walletCards = [
//   {
//     title: "Automated Payouts",
//     desc: "Mining rewards are sent directly to your wallet on a fixed schedule — no manual withdrawals needed.",
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//         <path d="M3 9h18M7 3v3M17 3v3M4 5h16a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
//       </svg>
//     ),
//   },
//   {
//     title: "Multi-Coin Support",
//     desc: "Hold BTC, ETH, LTC and 9 more coins in a single wallet. Switch and convert between assets instantly.",
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//   },
//   {
//     title: "Bank-Grade Security",
//     desc: "AES-256 encryption and two-factor authentication protect every transaction and account access.",
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//         <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="1.8" />
//         <path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
//         <circle cx="12" cy="16" r="1.5" fill="white" />
//       </svg>
//     ),
//   },
//   {
//     title: "Real-Time Earnings Tracker",
//     desc: "Monitor your hashrate, daily output, and cumulative earnings with live charts updated every minute.",
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//         <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//         <polyline points="16 7 22 7 22 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     ),
//   },
// ];

// const TABS = [
//   { key: "features", label: "Our Features" },
//   { key: "wallet",   label: "Wallet" },
// ];

// const stats = [
//   ["99.9%", "Uptime"],
//   ["12+",   "Coins Supported"],
//   ["~5m",   "Payout Interval"],
// ];

// // ── Component ─────────────────────────────────────────────────────────────────

// export default function Features() {
//   const [tab, setTab] = useState("features");

//   return (
//     <section className="w-full py-12 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">

//         {/* ── Tab bar ── */}
//         <div className="flex gap-1 p-1 mb-6 w-fit rounded-xl bg-[#16213e]/[0.07]">
//           {TABS.map(({ key, label }) => {
//             const isActive = tab === key;
//             return (
//               <button
//                 key={key}
//                 onClick={() => setTab(key)}
//                 className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 outline-none border-0 cursor-pointer
//                   ${isActive
//                     ? "bg-white/90 text-[#16213e] shadow-[0_1px_6px_rgba(0,0,0,0.10)]"
//                     : "bg-transparent text-[#16213e]/50 hover:text-[#16213e]/70"
//                   }`}
//               >
//                 {label}
//               </button>
//             );
//           })}
//         </div>

//         {/* ── Card ── */}
//         <div className="bg-white/80 px-5 sm:px-6 md:px-6 py-10 sm:py-12 md:py-14 rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.06)]">

//           {/* ── Features Tab ── */}
//           {tab === "features" && (
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-gray-100">
//               {features.map((f) => (
//                 <div key={f.title} className="flex flex-col items-center text-center sm:px-8 md:px-10">
//                   {/* divider for mobile between items */}
//                   <div className="mb-5">{f.icon}</div>
//                   <h3 className="text-[16px] sm:text-[17px] font-bold mb-2 text-[#16213e]">
//                     {f.title}
//                   </h3>
//                   <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-400 max-w-[220px]">
//                     {f.desc}
//                   </p>
//                   {/* mobile separator line */}
//                   <div className="sm:hidden mt-8 w-16 h-px bg-gray-100" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ── Wallet Tab ── */}
//           {tab === "wallet" && (
//             <div>
//               {/* Header row */}
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-10">
//                 <div className="flex-1 min-w-0">
//                   <h2 className="text-[1.4rem] sm:text-[1.65rem] md:text-[1.75rem] font-bold mb-3 text-[#16213e] leading-snug">
//                     Your Mining Wallet,<br />Always Secure
//                   </h2>
//                   <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-400 max-w-[380px]">
//                     Receive your mining rewards automatically, track your earnings in real-time,
//                     and manage multiple coins — all from one unified wallet built for serious miners.
//                   </p>
//                 </div>

//                 {/* Stats */}
//                 <div className="flex gap-6 sm:gap-8 flex-shrink-0 flex-wrap">
//                   {stats.map(([n, l]) => (
//                     <div key={l} className="text-center min-w-[64px]">
//                       <div className="text-[1.6rem] sm:text-[2rem] font-bold text-[#16213e]">{n}</div>
//                       <div className="text-[12px] sm:text-[13px] text-gray-400 mt-1 leading-snug">{l}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Wallet cards grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {walletCards.map((wc) => (
//                   <div
//                     key={wc.title}
//                     className="flex gap-4 items-start p-5 sm:p-6 rounded-2xl bg-[#f8f9f6]"
//                   >
//                     <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#16213e]">
//                       {wc.icon}
//                     </div>
//                     <div className="min-w-0">
//                       <div className="text-[14px] sm:text-[15px] font-bold mb-1 text-[#16213e]">
//                         {wc.title}
//                       </div>
//                       <div className="text-[12px] sm:text-[13px] leading-[1.65] text-gray-400">
//                         {wc.desc}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";

// ── Icons ────────────────────────────────────────────────────────────────────

const RocketIcon = () => (
  <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
    <ellipse cx="40" cy="42" rx="13" ry="28" fill="url(#rg1)" />
    <path d="M40 10 C31 22 27 32 27 42 L53 42 C53 32 49 22 40 10Z" fill="url(#rg2)" />
    <circle cx="40" cy="38" r="7" fill="url(#rg3)" />
    <circle cx="40" cy="38" r="4.5" fill="#c8d0e0" />
    <path d="M27 55 L18 68 L27 62 Z" fill="url(#rg2)" />
    <path d="M53 55 L62 68 L53 62 Z" fill="url(#rg2)" />
    <ellipse cx="40" cy="72" rx="7" ry="9" fill="#f46b1a" opacity=".9" />
    <ellipse cx="40" cy="72" rx="4" ry="6" fill="#ffa040" opacity=".8" />
    <ellipse cx="40" cy="83" rx="12" ry="3" fill="rgba(0,0,0,0.10)" />
    <defs>
      <linearGradient id="rg1" x1="27" y1="14" x2="53" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="rg2" x1="20" y1="10" x2="60" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="rg3" x1="33" y1="31" x2="47" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4a5a80" /><stop offset="100%" stopColor="#1e2a42" />
      </linearGradient>
    </defs>
  </svg>
);

const AgentIcon = () => (
  <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
    <rect x="20" y="36" width="40" height="38" rx="8" fill="url(#sg1)" />
    <ellipse cx="40" cy="36" rx="22" ry="6" fill="url(#sg2)" />
    <rect x="26" y="14" width="28" height="24" rx="5" fill="url(#sg2)" />
    <rect x="22" y="32" width="36" height="7" rx="3" fill="url(#sg3)" />
    <ellipse cx="40" cy="44" rx="11" ry="9" fill="url(#sg4)" />
    <ellipse cx="35" cy="43" rx="3.5" ry="3" fill="#c8d0e0" />
    <ellipse cx="45" cy="43" rx="3.5" ry="3" fill="#c8d0e0" />
    <circle cx="35.5" cy="43.5" r="1.5" fill="#1a2436" />
    <circle cx="45.5" cy="43.5" r="1.5" fill="#1a2436" />
    <path d="M20 60 Q12 64 14 74 L66 74 Q68 64 60 60 Z" fill="url(#sg1)" />
    <path d="M38 55 L40 62 L42 55 Z" fill="#f46b1a" />
    <ellipse cx="40" cy="83" rx="16" ry="3" fill="rgba(0,0,0,0.10)" />
    <defs>
      <linearGradient id="sg1" x1="20" y1="36" x2="60" y2="74" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="sg2" x1="20" y1="14" x2="60" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#1e2a42" />
      </linearGradient>
      <linearGradient id="sg3" x1="22" y1="32" x2="58" y2="39" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4a5a80" /><stop offset="100%" stopColor="#2a3850" />
      </linearGradient>
      <linearGradient id="sg4" x1="29" y1="35" x2="51" y2="53" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#d0d8ea" /><stop offset="100%" stopColor="#a0aac0" />
      </linearGradient>
    </defs>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
    <path d="M40 12 L64 22 L64 46 C64 62 52 74 40 78 C28 74 16 62 16 46 L16 22 Z" fill="url(#shg1)" />
    <path d="M40 18 L58 26 L58 46 C58 59 49 69 40 73 C31 69 22 59 22 46 L22 26 Z" fill="url(#shg2)" />
    <path d="M29 44 L37 53 L53 36" stroke="#e8f0ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="40" cy="83" rx="16" ry="3" fill="rgba(0,0,0,0.10)" />
    <defs>
      <linearGradient id="shg1" x1="16" y1="12" x2="64" y2="78" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#0d1628" />
      </linearGradient>
      <linearGradient id="shg2" x1="22" y1="18" x2="58" y2="73" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
    </defs>
  </svg>
);

// Wallet SVG icons resized to match feature icon proportions
const PayoutIcon = () => (
  <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
    <rect x="14" y="22" width="52" height="46" rx="10" fill="url(#pg1)" />
    <rect x="14" y="34" width="52" height="8" fill="url(#pg2)" />
    <rect x="22" y="50" width="16" height="6" rx="3" fill="#f46b1a" opacity=".9" />
    <rect x="42" y="50" width="10" height="6" rx="3" fill="#c8d0e0" opacity=".6" />
    <ellipse cx="40" cy="83" rx="14" ry="3" fill="rgba(0,0,0,0.10)" />
    <defs>
      <linearGradient id="pg1" x1="14" y1="22" x2="66" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="pg2" x1="14" y1="34" x2="66" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#1e2a42" />
      </linearGradient>
    </defs>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
    <rect x="18" y="40" width="44" height="34" rx="9" fill="url(#lkg1)" />
    <path d="M28 40 V30 C28 18 52 18 52 30 V40" stroke="url(#lkg2)" strokeWidth="7" strokeLinecap="round" fill="none" />
    <circle cx="40" cy="57" r="6" fill="#f46b1a" opacity=".9" />
    <rect x="38" y="57" width="4" height="8" rx="2" fill="#ffa040" opacity=".8" />
    <ellipse cx="40" cy="83" rx="14" ry="3" fill="rgba(0,0,0,0.10)" />
    <defs>
      <linearGradient id="lkg1" x1="18" y1="40" x2="62" y2="74" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="lkg2" x1="28" y1="18" x2="52" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3a4a6a" /><stop offset="100%" stopColor="#1e2a42" />
      </linearGradient>
    </defs>
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 80 90" width="80" height="90" fill="none">
    <rect x="12" y="20" width="56" height="48" rx="10" fill="url(#cg1)" />
    <polyline points="22,54 34,38 44,46 58,26" stroke="#f46b1a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".9" />
    <circle cx="22" cy="54" r="3" fill="#ffa040" />
    <circle cx="34" cy="38" r="3" fill="#ffa040" />
    <circle cx="44" cy="46" r="3" fill="#ffa040" />
    <circle cx="58" cy="26" r="3" fill="#ffa040" />
    <rect x="20" y="60" width="8" height="8" rx="2" fill="#c8d0e0" opacity=".4" />
    <rect x="32" y="56" width="8" height="12" rx="2" fill="#c8d0e0" opacity=".4" />
    <rect x="44" y="58" width="8" height="10" rx="2" fill="#c8d0e0" opacity=".4" />
    <ellipse cx="40" cy="83" rx="14" ry="3" fill="rgba(0,0,0,0.10)" />
    <defs>
      <linearGradient id="cg1" x1="12" y1="20" x2="68" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2e3a55" /><stop offset="100%" stopColor="#16213e" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: <RocketIcon />,
    title: "Value Performance",
    desc: "At vero eos et accusamus et iusto odio dignissi ducimus blanditiis deleniti.",
  },
  {
    icon: <AgentIcon />,
    title: "High Security",
    desc: "Et harum quidem rerum facilis est et expedita distinctio nam libero.",
  },
  {
    icon: <ShieldIcon />,
    title: "Propery Model",
    desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
  },
];

const walletFeatures = [
  {
    icon: <PayoutIcon />,
    title: "Automated Payouts",
    desc: "Mining rewards are sent directly to your wallet on a fixed schedule — no manual withdrawals needed.",
  },
  {
    icon: <LockIcon />,
    title: "Bank-Grade Security",
    desc: "AES-256 encryption and two-factor authentication protect every transaction and account access.",
  },
  {
    icon: <ChartIcon />,
    title: "Real-Time Earnings",
    desc: "Monitor your hashrate, daily output, and cumulative earnings with live charts updated every minute.",
  },
];

const TABS = [
  { key: "features", label: "Our Features" },
  { key: "wallet",   label: "Wallet" },
];

// ── Shared card grid ──────────────────────────────────────────────────────────

function FeatureGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-gray-100">
      {items.map((f) => (
        <div key={f.title} className="flex flex-col items-center text-center sm:px-8 md:px-10">
          <div className="mb-5">{f.icon}</div>
          <h3 className="text-[16px] sm:text-[17px] font-bold mb-2 text-[#16213e]">
            {f.title}
          </h3>
          <p className="text-[13px] sm:text-[14px] leading-[1.7] text-gray-400 max-w-[220px]">
            {f.desc}
          </p>
          <div className="sm:hidden mt-8 w-16 h-px bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Features() {
  const [tab, setTab] = useState("features");

  return (
    <section className="w-full py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Tab bar */}
        <div className="flex gap-1 p-1 mb-6 w-fit rounded-xl bg-[#16213e]/[0.07]">
          {TABS.map(({ key, label }) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 outline-none border-0 cursor-pointer
                  ${isActive
                    ? "bg-white/90 text-[#16213e] shadow-[0_1px_6px_rgba(0,0,0,0.10)]"
                    : "bg-transparent text-[#16213e]/50 hover:text-[#16213e]/70"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white/80 px-5 sm:px-6 md:px-6 py-10 sm:py-12 md:py-14 rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
          {tab === "features" && <FeatureGrid items={features} />}
          {tab === "wallet"   && <FeatureGrid items={walletFeatures} />}
        </div>

      </div>
    </section>
  );
}
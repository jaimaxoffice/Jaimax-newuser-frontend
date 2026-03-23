// import { useState, useEffect } from "react";

// const NAV_LINKS = ["About", "Programs", "Stories", "Contact"];

// const LOGOS = [
//   { shape: "circle" },
//   { shape: "rect" },
//   { shape: "triangle" },
//   { shape: "star" },
//   { shape: "circle" },
// ];

// const STATS = [
//   { value: "22+", label: "Communities Reached" },
//   { value: "65+", label: "Projects Completed" },
//   { value: "850+", label: "Volunteers United" },
// ];

// const IMAGES = [
//   {
//     src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
//     alt: "Smiling children in community",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop&q=80",
//     alt: "Child studying by window",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop&q=80",
//     alt: "Community support scene",
//   },
// ];

// function LogoIcon({ shape }) {
//   const stroke = "#2d7a3a";
//   const w = 2;
//   if (shape === "circle")
//     return (
//       <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
//         <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth={w} fill="none" />
//       </svg>
//     );
//   if (shape === "rect")
//     return (
//       <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
//         <rect x="2" y="2" width="20" height="20" rx="4" stroke={stroke} strokeWidth={w} fill="none" />
//       </svg>
//     );
//   if (shape === "triangle")
//     return (
//       <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
//         <polygon points="12,2 22,22 2,22" stroke={stroke} strokeWidth={w} fill="none" />
//       </svg>
//     );
//   if (shape === "star")
//     return (
//       <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
//         <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" stroke={stroke} strokeWidth={w} fill="none" />
//       </svg>
//     );
//   return null;
// }

// const Arrow = ({ className = "w-4 h-4" }) => (
//   <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//   </svg>
// );

// const Hamburger = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// );

// export default function HeroSection() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hoveredImg, setHoveredImg] = useState(null);

//   return (
//     <div className="w-full min-h-screen overflow-x-hidden bg-[#e8f5e0] font-sans antialiased">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }
//         .font-display { font-family: 'Playfair Display', Georgia, serif; }
//         @keyframes borderPulse {
//           0%,100% { border-color: #7fc742; }
//           50%      { border-color: #2d7a3a; }
//         }
//         .animate-border-pulse { animation: borderPulse 2.5s ease-in-out infinite; }
//         @keyframes fadeUp {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .anim-0 { animation: fadeUp .65s .05s ease both; }
//         .anim-1 { animation: fadeUp .65s .20s ease both; }
//         .anim-2 { animation: fadeUp .65s .35s ease both; }
//         .anim-3 { animation: fadeUp .65s .50s ease both; }
//         .anim-4 { animation: fadeUp .65s .65s ease both; }
//         .anim-5 { animation: fadeUp .65s .80s ease both; }
//         .img-zoom { overflow: hidden; }
//         .img-zoom img { transition: transform .5s ease; }
//         .img-zoom:hover img { transform: scale(1.08); }
//       `}</style>

//       {/* ── NAV ── */}
//       {/* <nav className="flex items-center justify-between px-4 sm:px-6 md:px-14 py-4 relative z-20">
//         <span className="font-display font-black text-xl tracking-tight text-[#1a3d22]">
//           LightReach
//         </span>

//         <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
//           {NAV_LINKS.map((l) => (
//             <a key={l} href="#" className="hover:text-green-800 transition-colors duration-200">{l}</a>
//           ))}
//         </div>

//         <button className="hidden md:inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full bg-[#2d7a3a] hover:bg-[#1a3d22] transition-colors duration-200">
//           Get Involved <Arrow />
//         </button>

//         <button
//           className="md:hidden p-2 rounded-lg text-[#2d7a3a]"
//           onClick={() => setMobileOpen((o) => !o)}
//         >
//           <Hamburger />
//         </button>

//         {mobileOpen && (
//           <div className="absolute top-full left-4 right-4 bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4 z-30">
//             {NAV_LINKS.map((l) => (
//               <a key={l} href="#" className="text-sm font-medium text-gray-700">{l}</a>
//             ))}
//             <button className="self-start text-white text-sm font-semibold px-5 py-2.5 rounded-full bg-[#2d7a3a]">
//               Get Involved
//             </button>
//           </div>
//         )}
//       </nav> */}

//       {/* ── HERO TOP ── */}
//       <section className="w-full px-4 sm:px-6 md:px-14 pt-6 pb-10">

//         {/* Badge */}
//         <div className="anim-0 flex justify-center mb-5">
//           <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase bg-[#2d7a3a]/10 border border-[#2d7a3a]/30 text-[#2d7a3a]">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#7fc742]" />
//             Building Brighter Paths
//           </span>
//         </div>

//         {/* Headline */}
//         <div className="anim-1 text-center max-w-3xl mx-auto mb-4 px-2">
//           <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-gray-900">
//             Shine Hope Where It's
//             <br />
//             <span className="relative inline-block mx-1">
//               {/* Light pill background — sits behind text, doesn't bleed into line above */}
//               <span
//                 className="absolute inset-x-0 rounded-xl"
//                 style={{ background: "rgba(127,199,66,0.18)", top: "4px", bottom: "4px" }}
//               />
//               {/* Left vertical bar + bottom-left dot */}
//               <span className="absolute left-0 flex flex-col justify-between items-center" style={{ top: "4px", bottom: "4px", width: "3px" }}>
//                 <span className="w-0.5 flex-1" style={{ background: "#7fc742" }} />
//                 <span className="w-2.5 h-2.5 rounded-full -mb-1.5" style={{ background: "#7fc742", flexShrink: 0 }} />
//               </span>
//               {/* Right vertical bar + top-right dot */}
//               <span className="absolute right-0 flex flex-col justify-between items-center" style={{ top: "4px", bottom: "4px", width: "3px" }}>
//                 <span className="w-2.5 h-2.5 rounded-full -mt-1.5 -mr-0" style={{ background: "#7fc742", flexShrink: 0 }} />
//                 <span className="w-0.5 flex-1" style={{ background: "#7fc742" }} />
//               </span>
//               {/* Word */}
//               <span className="relative z-10 font-black px-4" style={{ color: "#2d7a3a" }}>
//                 Needed
//               </span>
//             </span>{" "}
//             <span className="text-gray-900">Most</span>
//           </h1>
//         </div>

//         {/* Sub-copy */}
//         <p className="anim-2 text-center text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed px-2">
//           At LightReach, we connect people with communities in need, turning
//           compassion into tangible change.
//         </p>

//         {/* CTA Buttons */}
//         <div className="anim-3 flex flex-wrap justify-center gap-3 mb-10">
//           <button className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full bg-[#2d7a3a] hover:bg-[#1a3d22] transition-colors duration-200 shadow-lg shadow-[#2d7a3a]/30">
//             Donate Now
//             <span className="rounded-full p-1 bg-[#7fc742]">
//               <Arrow className="w-3.5 h-3.5" />
//             </span>
//           </button>
//           <button className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full border-2 border-[#2d7a3a] text-[#2d7a3a] hover:bg-[#2d7a3a] hover:text-white transition-all duration-200">
//             Volunteer <Arrow />
//           </button>
//         </div>

//         {/* Image Grid */}
//         <div className="animate-border-pulse border-2 border-[#7fc742] rounded-[4px] p-1.5 sm:p-2 bg-white shadow-2xl w-full max-w-4xl mx-auto">
//           <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 rounded-lg overflow-hidden">
//             {IMAGES.map((img, i) => (
//               <div
//                 key={i}
//                 className="img-zoom rounded-lg overflow-hidden aspect-square sm:aspect-video"
//                 onMouseEnter={() => setHoveredImg(i)}
//                 onMouseLeave={() => setHoveredImg(null)}
//               >
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-full h-full object-cover"
//                   style={{
//                     transform: hoveredImg === i ? "scale(1.08)" : "scale(1)",
//                     transition: "transform 0.5s ease",
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── PARTNER LOGOS ── */}
//       <section className="anim-4 w-full px-4 sm:px-6 md:px-14 py-8 text-center">
//         <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-5">
//           Supported by Changemakers Worldwide
//         </p>
//         <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 opacity-50">
//           {LOGOS.map((l, i) => (
//             <div key={i} className="flex items-center gap-2 text-sm font-semibold text-[#2d7a3a]">
//               <LogoIcon shape={l.shape} />
//               <span style={{ fontFamily: "serif" }}>Logoipsum</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── OUR STORY ── */}
//       <section className="anim-5 rounded-[4px] mx-3 sm:mx-4 md:mx-10 mb-10 overflow-hidden text-white bg-[#1a3d22]">
//         <div className="p-5 sm:p-8 md:p-12">

//           {/* Two-column on sm+ — single column on mobile */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

//             {/* ── LEFT: badge + heading + stats (vertical on sm+) ── */}
//             <div className="flex flex-col gap-4 sm:gap-5">

//               <span className="self-start text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-[#7fc742]/20 border border-[#7fc742]/35 text-[#7fc742]">
//                 Our Story
//               </span>

//               <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl leading-tight">
//                 It Started With a Visit and a Promise.
//               </h2>

//               {/*
//                 mobile  → 3 cols side-by-side (compact cards)
//                 sm+     → 1 col stacked vertically (fills the left column)
//               */}
//               <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-3">
//                 {STATS.map((s) => (
//                   <div
//                     key={s.label}
//                     className="rounded-[6px] p-3 sm:p-4 bg-[#2d7a3a]/35 border border-[#2d7a3a]/60
//                                flex flex-col items-center text-center
//                                sm:flex-row sm:items-center sm:text-left sm:gap-4"
//                   >
//                     <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white leading-none shrink-0">
//                       {s.value}
//                     </p>
//                     <p className="text-[10px] sm:text-sm mt-1 sm:mt-0 leading-tight text-[#7fc742]/85">
//                       {s.label}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ── RIGHT: copy + button + image ── */}
//             <div className="flex flex-col gap-4 sm:gap-5">

//               <p className="text-sm md:text-base leading-relaxed text-gray-300">
//                 LightReach began when a small group of friends visited a rural
//                 community and saw children studying by candlelight. They didn't
//                 have much but they promised to return. That promise grew into a
//                 movement, one focused on reaching where light rarely goes through
//                 education, clean water, and mentorship.
//               </p>

//               <button className="self-start inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full border-2 border-[#7fc742] text-[#7fc742] hover:bg-[#7fc742] hover:text-[#1a3d22] transition-all duration-200">
//                 Read The Full Story <Arrow />
//               </button>

//               {/* Story image — always shown */}
//               <div className="img-zoom rounded-xl overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&auto=format&fit=crop&q=80"
//                   alt="Team smiling together"
//                   className="w-full h-48 sm:h-56 md:h-64 object-cover"
//                 />
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



import { useState } from "react";
import img1 from "../../assets/dummy/hero/image1.jpeg";
import img2 from "../../assets/dummy/hero/image2.jpeg";
import img3 from "../../assets/dummy/hero/image3.jpeg";
import img4 from "../../assets/dummy/hero/image4.jpeg";
import img5 from "../../assets/dummy/hero/image5.png";

const NAV_LINKS = ["About", "Programs", "Stories", "Contact"];

const LOGOS = [
  { shape: "circle" },
  { shape: "rect" },
  { shape: "triangle" },
  { shape: "star" },
  { shape: "circle" },
];

const STATS = [
  { value: "22+",  label: "Communities\nReached"  },
  { value: "65+",  label: "Projects\nCompleted"   },
  { value: "850+", label: "Volunteers\nUnited"    },
];

const IMAGES = [
  {
    src: img1 || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    alt: "Smiling children in community",
  },
  {
    src: img2 || "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop&q=80",
    alt: "Child studying by window",
  },
  {
    src: img3 || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop&q=80",
    alt: "Community support scene",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function LogoIcon({ shape }) {
  const props = {
    viewBox: "0 0 24 24",
    className: "w-5 h-5 shrink-0",
    stroke: "var(--color-brand-primary)",
    strokeWidth: 2,
    fill: "none",
  };

  if (shape === "circle")
    return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>;
  if (shape === "rect")
    return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="4" /></svg>;
  if (shape === "triangle")
    return <svg {...props}><polygon points="12,2 22,22 2,22" /></svg>;
  if (shape === "star")
    return (
      <svg {...props}>
        <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" />
      </svg>
    );
  return null;
}

const Arrow = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Hamburger = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// ── Main component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredImg, setHoveredImg] = useState(null);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[var(--color-bg-page)] font-sans antialiased">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .font-display { font-family: var(--font-display); }

        /* translateY on stat hover — can't express in Tailwind without custom config */
        .stat-card { transition: transform 0.25s ease, background 0.25s ease; }
        .stat-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.14);
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — badge · headline · sub-copy · CTAs · image grid
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full px-4 sm:px-6 md:px-14 pt-6 pb-10">

        {/* Badge */}
        <div className="anim-0 flex justify-center mb-5">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase border"
            style={{
              background: "var(--color-bg-overlay)",
              borderColor: "var(--color-border-accent)",
              color: "var(--color-brand-primary)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-accent)" }} />
            Building Brighter Paths
          </span>
        </div>

        {/* Headline */}
        <div className="anim-1 text-center max-w-3xl mx-auto mb-4 px-2">
          <h1
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight"
            style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
          >
            Shine Hope Where It's
            <br />
            <span className="relative inline-block mx-1">
              {/* Pill bg */}
              <span
                className="absolute inset-x-0 rounded-xl"
                style={{ background: "rgba(127,199,66,0.18)", top: "4px", bottom: "4px" }}
              />
              {/* Left bar + bottom dot */}
              <span
                className="absolute left-0 flex flex-col justify-between items-center"
                style={{ top: "4px", bottom: "4px", width: "3px" }}
              >
                <span className="w-0.5 flex-1" style={{ background: "var(--color-brand-accent)" }} />
                <span
                  className="w-2.5 h-2.5 rounded-full -mb-1.5"
                  style={{ background: "var(--color-brand-accent)", flexShrink: 0 }}
                />
              </span>
              {/* Right bar + top dot */}
              <span
                className="absolute right-0 flex flex-col justify-between items-center"
                style={{ top: "4px", bottom: "4px", width: "3px" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full -mt-1.5"
                  style={{ background: "var(--color-brand-accent)", flexShrink: 0 }}
                />
                <span className="w-0.5 flex-1" style={{ background: "var(--color-brand-accent)" }} />
              </span>
              <span
                className="relative z-10 font-black px-4"
                style={{ color: "var(--color-brand-primary)", fontFamily: "var(--font-display)" }}
              >
                Needed
              </span>
            </span>{" "}
            <span style={{ color: "var(--color-text-primary)" }}>Most</span>
          </h1>
        </div>

        {/* Sub-copy */}
        <p
          className="anim-2 text-center text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed px-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          At LightReach, we connect people with communities in need, turning
          compassion into tangible change.
        </p>

        {/* CTA Buttons */}
        <div className="anim-3 flex flex-wrap justify-center gap-3 mb-10">
          <button
            className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
            style={{ background: "var(--color-brand-primary)", boxShadow: "var(--shadow-btn)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--color-brand-dark)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--color-brand-primary)")}
          >
            Donate Now
            <span className="rounded-full p-1" style={{ background: "var(--color-brand-accent)" }}>
              <Arrow className="w-3.5 h-3.5" />
            </span>
          </button>

          <button
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full border-2 transition-all duration-200"
            style={{ borderColor: "var(--color-brand-primary)", color: "var(--color-brand-primary)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--color-brand-primary)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-brand-primary)"; }}
          >
            Volunteer <Arrow />
          </button>
        </div>

        {/* Image Grid */}
        <div
          className="animate-border-pulse border-2 rounded-[4px] p-1.5 sm:p-2 shadow-2xl w-full max-w-4xl mx-auto"
          style={{ background: "var(--color-bg-surface)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 rounded-lg overflow-hidden">
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className="img-zoom rounded-lg overflow-hidden aspect-square sm:aspect-video"
                onMouseEnter={() => setHoveredImg(i)}
                onMouseLeave={() => setHoveredImg(null)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{
                    transform: hoveredImg === i ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PARTNER LOGOS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="anim-4 w-full px-4 sm:px-6 md:px-14 py-8 text-center">
        <p
          className="text-xs uppercase tracking-widest font-semibold mb-5"
          style={{ color: "var(--color-text-muted)" }}
        >
          Supported by Changemakers Worldwide
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 opacity-50">
          {LOGOS.map((l, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--color-brand-primary)", fontFamily: "var(--font-display)" }}
            >
              <LogoIcon shape={l.shape} />
              <span>Logoipsum</span>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY*/}
      <section
        className="anim-5 rounded-[4px] mx-3 sm:mx-4 md:mx-10 mb-10 overflow-hidden text-white"
        style={{ background: "var(--color-brand-primary)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">

          {/* ── LEFT PILLAR ── */}
          <div
            className="md:col-span-5 flex flex-col gap-6 p-6 sm:p-8 md:p-10"
            style={{ background: "var(--color-section-pillar)" }}
          >

            {/* Badge + heading + supporting line */}
            <div className="flex flex-col gap-4">
              <span
                className="self-start text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest border"
                style={{
                  background: "rgba(127,199,66,0.18)",
                  borderColor: "rgba(127,199,66,0.40)",
                  color: "var(--color-brand-accent)",
                }}
              >
                Our Story
              </span>

              <h2
                className="font-black text-3xl sm:text-4xl md:text-[2.4rem] leading-[1.15]"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-on-dark)" }}
              >
                It Started With a&nbsp;Visit and a Promise.
              </h2>

              {/* Supporting line — fills visual space, adds context */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                A small act of compassion sparked a global mission — bringing
                light, learning, and hope to communities that need it most.
              </p>
            </div>

            {/* Thin separator — visually connects copy to stats */}
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.10)" }} />

            {/* Stat trio */}
            <div className="flex items-stretch">
              {STATS.map((s, i) => (
                <div key={s.value} className="flex items-stretch flex-1">

                  <div
                    className="stat-card flex-1 flex flex-col justify-center items-center text-center px-2 py-4 rounded-xl cursor-default"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <p
                      className="font-black leading-none mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-on-dark)",
                        fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-[11px] leading-snug whitespace-pre-line"
                      style={{ color: "var(--color-brand-accent)", opacity: 0.85 }}
                    >
                      {s.label}
                    </p>
                  </div>

                  {/* Hairline divider between cards, not after last */}
                  {i < STATS.length - 1 && (
                    <div
                      className="self-center mx-1 w-px"
                      style={{ height: "55%", background: "rgba(255,255,255,0.12)" }}
                    />
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="md:col-span-7 flex flex-col gap-5 p-6 sm:p-8 md:p-10">

            {/* Body copy */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              LightReach began when a small group of friends visited a rural
              community and saw children studying by candlelight. They didn't
              have much — but they promised to return. That promise grew into
              a movement, one focused on reaching where light rarely goes:
              through education, clean water, and mentorship.
            </p>

            {/* CTA */}
            <button
              className="self-start inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full border-2 transition-all duration-200"
              style={{ borderColor: "var(--color-brand-accent)", color: "var(--color-brand-accent)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--color-brand-accent)"; e.currentTarget.style.color = "var(--color-brand-dark)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-brand-accent)"; }}
            >
              Read The Full Story <Arrow />
            </button>

            {/*
              Image — explicit responsive heights so it NEVER grows beyond
              what's intended. object-top keeps the subject's face in frame.
            */}
            <div className="img-zoom rounded-2xl overflow-hidden w-full">
              <img
                src={img5}
                alt="Team smiling together"
                className="w-full object-cover object-top h-52 sm:h-60 md:h-64 lg:h-72"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
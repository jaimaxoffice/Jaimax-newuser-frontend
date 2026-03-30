// import React, { useEffect, useState } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";

// const NewSeoSection = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const { scrollYProgress } = useScroll();
//   const navigate = useNavigate();

//   const { data: roundData } = useGetRoundQuery();
//   const liveRounds =
//     roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
//   const currentRound = liveRounds[0];

//   const handlePresaleClick = () => {
//     navigate("/register");
//   };

//   const livePrice = currentRound?.atPriceInr || "0.0000";

//   useEffect(() => {
//     const handleScroll = () => setScrollPosition(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

//   return (
//     <section className="min-h-screen bg-[#e8f5e0] mt-5 text-[#111827] relative overflow-hidden font-[Sora,sans-serif]">

//       {/* Subtle ambient blobs */}
//       <motion.div
//         // style={{ y: y1 }}
//         animate={{ x: [60, 180, 60] }}
//         transition={{ x: { duration: 22, repeat: Infinity, ease: "easeInOut" } }}
//         className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
//         style={{
//           y: y1,
//           background:
//             "radial-gradient(circle, rgba(127,199,66,0.08) 0%, transparent 70%)",
//         }}
//       />
//       <motion.div
//         // style={{ y: y2 }}
//         animate={{ x: [-60, -200, -60] }}
//         transition={{ x: { duration: 26, repeat: Infinity, ease: "easeInOut" } }}
//         className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
//         style={{
//           y: y2,
//           background:
//             "radial-gradient(circle, rgba(45,122,58,0.07) 0%, transparent 70%)",
//         }}
//       />

//       <div className="max-w-6xl mx-auto px-5 md:px-10 py-10 relative z-10">

//         {/* ── MASTHEAD ─────────────────────────────── */}
//         <motion.div
//           initial={{ opacity: 0, y: -24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="border-b-2 border-[#2d7a3a] pb-5 mb-8"
//         >
//           <p className="text-[10px] tracking-[4px] uppercase font-bold text-[#2d7a3a] mb-3">
//             India's Trusted Pre-Sale Crypto Token
//           </p>

//           {/* Giant headline */}
//           <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
//             <h1 className="text-[52px] md:text-[72px] font-black leading-[0.95] tracking-[-2px] text-[#1a3d22]">
//               India's{" "}
//               <a
//                 href="https://www.jaimax.com"
//                 className="text-[#2d7a3a] underline decoration-[#7fc742] decoration-4 underline-offset-4 hover:text-[#7fc742] transition-colors"
//               >
//                 Best Pre-Sale
//               </a>
//               <br />
//               <span className="text-[#7fc742]">Crypto Token</span>
//               <br />
//               <span className="italic">— Jaimax</span>
//             </h1>

//             {/* Live price block — sits flush right of headline */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//               className="flex-shrink-0 border-l-4 border-[#7fc742] pl-5 pb-1"
//             >
//               <p className="text-[9px] tracking-[3px] uppercase font-bold text-[#6b7280] mb-1">
//                 Live Price
//               </p>
//               <p className="text-[42px] font-black leading-none text-[#2d7a3a]">
//                 ₹{livePrice}
//               </p>
//               <span className="inline-block mt-1 text-[9px] font-bold tracking-widest text-[#2d7a3a] border border-[#2d7a3a] rounded-full px-2 py-[2px] uppercase">
//                 Live
//               </span>
//             </motion.div>
//           </div>

//           {/* Accent rule */}
//           <div className="mt-5 flex items-center gap-3">
//             <div className="h-[3px] w-14 bg-[#7fc742] rounded-full" />
//             <div className="h-[3px] w-6 bg-[#4a9858] rounded-full opacity-50" />
//             <div className="h-[3px] w-3 bg-[#2d7a3a] rounded-full opacity-30" />
//           </div>
//         </motion.div>

//         {/* ── INTRO LEAD ───────────────────────────── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//           className="mb-10"
//         >
//           <p className="text-[15px] md:text-[17px] text-[#374151] leading-[1.85] font-medium max-w-4xl">
//             In the evolving world of digital finance,{" "}
//             <a
//               href="https://www.jaimax.com"
//               className="font-extrabold text-[#2d7a3a] underline decoration-[#7fc742] decoration-2 underline-offset-2 hover:text-[#7fc742] transition-colors"
//             >
//               Jaimax Token
//             </a>{" "}
//             has emerged as India's{" "}
//             <a
//               href="https://www.jaimax.com"
//               className="font-extrabold text-[#2d7a3a] underline decoration-[#7fc742] decoration-2 underline-offset-2 hover:text-[#7fc742] transition-colors"
//             >
//               best pre-sale crypto token
//             </a>
//             , built for investors who value innovation, transparency, and
//             long-term stability. As India embraces blockchain technology and
//             decentralized finance, Jaimax is shaping the future of how people
//             invest and grow wealth through digital currencies. From fast
//             transactions and strong blockchain security to a simple and
//             transparent investment model, Jaimax delivers everything an investor
//             needs to participate in the decentralized economy. More than just a
//             crypto token, Jaimax represents a new era of secure, accessible, and
//             rewarding investments for everyone.
//           </p>
//         </motion.div>

//         {/* ── SECTION RULE ─────────────────────────── */}
//         <div className="border-t border-b border-[#2d7a3a]/20 py-[2px] mb-10">
//           <div className="border-t border-[#2d7a3a]/10" />
//         </div>

//         {/* ── TWO-COLUMN EDITORIAL SPREAD ──────────── */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ duration: 0.6 }}
//           className="grid md:grid-cols-2 gap-0 mb-12"
//         >
//           {/* Left column */}
//           <div className="pr-0 md:pr-10 md:border-r-2 md:border-[#7fc742] pb-8 md:pb-0">
//             <p className="text-[9px] tracking-[3px] uppercase font-bold text-[#2d7a3a] mb-3">
//               What Makes Jaimax Unique
//             </p>
//             <h2 className="text-[24px] md:text-[28px] font-black text-[#1a3d22] leading-tight mb-5">
//               Trust, Technology &amp; Opportunity
//             </h2>
//             <p className="text-[13px] text-[#374151] leading-[1.8] mb-4">
//               What makes Jaimax truly unique among India's growing number of{" "}
//               <strong className="font-bold text-[#1a3d22]">
//                 crypto pre-sale token
//               </strong>{" "}
//               is its powerful combination of{" "}
//               <strong className="font-bold text-[#2d7a3a]">
//                 trust, technology, and opportunity
//               </strong>
//               . Backed by{" "}
//               <strong className="font-bold text-[#1a3d22]">
//                 Jaisvik Software Solutions Private Limited
//               </strong>
//               , the project is designed to empower users to invest confidently
//               in the future of cryptocurrency.
//             </p>
//             <p className="text-[13px] text-[#374151] leading-[1.8] mb-6">
//               From fast transactions and strong blockchain security to a simple
//               and transparent investment model, Jaimax delivers everything an
//               investor needs to participate in the decentralized economy.
//             </p>

//             {/* Three pillars — inline typographic list, not cards */}
//             <div className="space-y-4">
//               {[
//                 {
//                   n: "01",
//                   title: "Trust",
//                   desc: "Backed by Jaisvik Software Solutions Private Limited — a registered company with transparent governance.",
//                   color: "text-[#2d7a3a]",
//                 },
//                 {
//                   n: "02",
//                   title: "Technology",
//                   desc: "Lightning-fast transactions with advanced blockchain security protecting every operation.",
//                   color: "text-[#4a9858]",
//                 },
//                 {
//                   n: "03",
//                   title: "Opportunity",
//                   desc: "Transparent investment model designed for maximum returns and long-term stability.",
//                   color: "text-[#7fc742]",
//                 },
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -16 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.12, duration: 0.5 }}
//                   className="flex items-start gap-4"
//                 >
//                   <span className={`text-[28px] font-black leading-none flex-shrink-0 ${item.color} opacity-40`}>
//                     {item.n}
//                   </span>
//                   <div>
//                     <span className={`font-extrabold text-[13px] ${item.color}`}>
//                       {item.title} —{" "}
//                     </span>
//                     <span className="text-[13px] text-[#6b7280] leading-relaxed">
//                       {item.desc}
//                     </span>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Right column */}
//           <div className="pl-0 md:pl-10 pt-8 md:pt-0">
//             <p className="text-[9px] tracking-[3px] uppercase font-bold text-[#2d7a3a] mb-3">
//               Exclusive Pre-Sale Opportunity
//             </p>
//             <h2 className="text-[24px] md:text-[28px] font-black text-[#1a3d22] leading-tight mb-5">
//               Invest Early,<br />Grow Confidently
//             </h2>
//             <p className="text-[13px] text-[#374151] leading-[1.8] mb-4">
//               The Jaimax pre-sale offers early investors an exclusive opportunity
//               to purchase tokens at a low initial price before public trading
//               begins. This pre-sale advantage allows holders to maximize their
//               growth potential while supporting a rapidly expanding blockchain
//               ecosystem.
//             </p>
//             <p className="text-[13px] text-[#374151] leading-[1.8] mb-6">
//               Whether you are an experienced trader or a first-time investor,
//               Jaimax provides a trusted platform to access one of India's most
//               promising{" "}
//               <a
//                 href="https://www.jaimax.com"
//                 className="font-bold text-[#2d7a3a] underline decoration-[#7fc742] decoration-2 underline-offset-2 hover:text-[#7fc742] transition-colors"
//               >
//                 pre-sale crypto token
//               </a>
//               .
//             </p>

//             {/* Price comparison — typographic, no box */}
//             <div className="border-t-2 border-[#2d7a3a]/20 pt-5">
//               <div className="flex items-center gap-6 flex-wrap">
//                 <div>
//                   <p className="text-[9px] tracking-[2px] uppercase font-bold text-[#6b7280] mb-1">
//                     Current Price
//                   </p>
//                   <p className="text-[36px] font-black leading-none text-[#2d7a3a]">
//                     ₹{livePrice}
//                   </p>
//                 </div>
//                 <span className="text-[28px] font-black text-[#2d7a3a]/25 hidden sm:block">
//                   →
//                 </span>
//                 <div>
//                   <p className="text-[9px] tracking-[2px] uppercase font-bold text-[#6b7280] mb-1">
//                     Expected Launching Price
//                   </p>
//                   <p className="text-[36px] font-black leading-none text-[#7fc742]">
//                     ₹4.10
//                   </p>
//                   <p className="text-[10px] text-[#9ca3af] mt-1">
//                     As per mathematical calculations.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ── DOUBLE RULE ──────────────────────────── */}
//         <div className="border-t-2 border-[#1a3d22] mb-[2px]" />
//         <div className="border-t border-[#2d7a3a]/30 mb-10" />

//         {/* ── SECURITY FULL-WIDTH ──────────────────── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ duration: 0.6 }}
//           className="mb-10"
//         >
//           <div className="flex flex-col md:flex-row md:items-start gap-8">
//             <div className="md:w-1/4 flex-shrink-0">
//               <p className="text-[9px] tracking-[3px] uppercase font-bold text-[#2d7a3a] mb-2">
//                 Security
//               </p>
//               <h2 className="text-[22px] font-black text-[#1a3d22] leading-tight">
//                 Security at<br />the Heart
//               </h2>
//               <div className="mt-3 h-[3px] w-10 bg-[#7fc742] rounded-full" />
//             </div>
//             <div className="flex-1 grid md:grid-cols-2 gap-x-10 gap-y-4">
//               <p className="text-[13px] text-[#374151] leading-[1.8]">
//                 Security remains at the heart of the Jaimax ecosystem. Every
//                 transaction is protected by{" "}
//                 <strong className="font-bold text-[#1a3d22]">
//                   advanced blockchain encryption
//                 </strong>
//                 , ensuring full transparency and zero manipulation. Investors
//                 can buy, hold, and trade Jaimax confidently, knowing that the
//                 platform follows industry-leading standards for safety and
//                 compliance.
//               </p>
//               <p className="text-[13px] text-[#374151] leading-[1.8]">
//                 The Jaimax Token is built to handle real-world utility — from{" "}
//                 <strong className="font-bold text-[#1a3d22]">DeFi and NFTs</strong>{" "}
//                 to decentralized applications — ensuring that each coin holds
//                 long-term value beyond speculation. Unlike most projects that
//                 focus only on trading, Jaimax is creating a{" "}
//                 <strong className="font-bold text-[#1a3d22]">
//                   complete blockchain ecosystem
//                 </strong>{" "}
//                 where investors, developers, and learners come together.
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* ── PULL QUOTE ───────────────────────────── */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: false, amount: 0.4 }}
//           transition={{ duration: 0.6 }}
//           className="border-l-[5px] border-[#7fc742] pl-6 py-2 mb-10 bg-[#2d7a3a]/5 rounded-r-lg"
//         >
//           <p className="text-[18px] md:text-[22px] font-bold italic text-[#1a3d22] leading-[1.45]">
//             "Its vision extends beyond profit — aiming to educate, innovate,
//             and connect users worldwide through blockchain education and
//             financial empowerment. This human-centered approach sets Jaimax
//             apart as a best-in-class{" "}
//             <a
//               href="https://www.jaimax.com"
//               className="not-italic font-extrabold text-[#2d7a3a] underline decoration-[#7fc742] decoration-2 underline-offset-2 hover:text-[#7fc742] transition-colors"
//             >
//               crypto token
//             </a>{" "}
//             designed to sustain long-term growth."
//           </p>
//         </motion.div>

//         {/* ── DOUBLE RULE ──────────────────────────── */}
//         <div className="border-t-2 border-[#1a3d22] mb-[2px]" />
//         <div className="border-t border-[#2d7a3a]/30 mb-10" />

//         {/* ── THE FUTURE — FULL WIDTH ──────────────── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.2 }}
//           transition={{ duration: 0.6 }}
//           className="mb-12"
//         >
//           <p className="text-[9px] tracking-[3px] uppercase font-bold text-[#2d7a3a] mb-3">
//             The Future with Jaimax
//           </p>
//           <div className="flex flex-col md:flex-row md:items-end gap-8">
//             <div className="flex-1">
//               <h2 className="text-[28px] md:text-[36px] font-black text-[#1a3d22] leading-tight mb-5">
//                 Leading India into the<br />Next Generation of<br />
//                 <span className="text-[#2d7a3a]">Digital Finance</span>
//               </h2>
//               <p className="text-[13px] text-[#374151] leading-[1.8] max-w-xl">
//                 As India steps into the next generation of digital finance,
//                 Jaimax Token continues to lead as the{" "}
//                 <a
//                   href="https://www.jaimax.com"
//                   className="font-extrabold text-[#2d7a3a] underline decoration-[#7fc742] decoration-2 underline-offset-2 hover:text-[#7fc742] transition-colors"
//                 >
//                   best pre-sale crypto token
//                 </a>{" "}
//                 in India, offering a bridge between today's investors and
//                 tomorrow's decentralized economy. By investing early, users not
//                 only secure potential profits but also contribute to the
//                 development of a transparent and accessible financial future.
//               </p>
//             </div>
//             {/* Right side stat column */}
//             <div className="flex-shrink-0 md:text-right space-y-4">
//               <div>
//                 <p className="text-[9px] tracking-[2px] uppercase font-bold text-[#6b7280] mb-1">
//                   Current Price
//                 </p>
//                 <p className="text-[32px] font-black text-[#2d7a3a] leading-none">
//                   ₹{livePrice}
//                 </p>
//               </div>
//               <div className="w-full h-[1px] bg-[#2d7a3a]/20" />
//               <div>
//                 <p className="text-[9px] tracking-[2px] uppercase font-bold text-[#6b7280] mb-1">
//                   Expected Launching Price
//                 </p>
//                 <p className="text-[32px] font-black text-[#7fc742] leading-none">
//                   ₹4.10
//                 </p>
//                 <p className="text-[10px] text-[#9ca3af] mt-1">
//                   As per mathematical calculations.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ── FINAL CTA BAND ───────────────────────── */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//           className="bg-[#1a3d22] rounded-2xl px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
//         >
//           <div className="flex-1">
//             <p className="text-[9px] tracking-[3px] uppercase font-bold text-[#7fc742] mb-3">
//               Join Jaimax Today
//             </p>
//             <h3 className="text-[22px] md:text-[28px] font-black text-white leading-tight mb-3">
//               The{" "}
//               <a
//                 href="https://www.jaimax.com"
//                 className="text-[#7fc742] underline decoration-white/30 decoration-2 underline-offset-4 hover:decoration-[#7fc742] transition-colors"
//               >
//                 crypto pre-sale token
//               </a>{" "}
//               redefining how India invests in blockchain.
//             </h3>
//             <p className="text-[14px] font-bold text-[#b8e07c]">
//               Invest early. Grow confidently. Own the future with Jaimax.
//             </p>
//           </div>

//           <div className="flex-shrink-0">
//             <motion.button
//               onClick={handlePresaleClick}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.96 }}
//               className="group relative bg-[#7fc742] text-[#0f2414] font-black text-[15px] px-10 py-4 rounded-full overflow-hidden transition-all duration-300 hover:bg-[#b8e07c]"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 Join Pre-Sale
//                 <span className="group-hover:translate-x-1 transition-transform inline-block">
//                   →
//                 </span>
//               </span>
//             </motion.button>
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default NewSeoSection;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import ActionButton from "./ActionButton";

const JaimaxSeoSection = () => {
  const navigate = useNavigate();
  const { data: roundData } = useGetRoundQuery();
  const liveRounds =
    roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const livePrice = liveRounds[0]?.atPriceInr || "0.0000";

  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((p) => ({ ...p, [e.target.dataset.key]: true }));
        });
      },
      { threshold: 0.12 },
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (key) => (el) => {
    refs.current[key] = el;
    if (el) el.dataset.key = key;
  };
  const v = (key) => visible[key];

  return (
    <div className="w-full font-sans">
      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  · LIGHT
      ══════════════════════════════════════════ */}
      <section
        ref={ref("hero")}
        className="relative bg-[var(--color-bg-page)] overflow-hidden py-10"
      >
        {/* watermark */}
        <div className="absolute bottom-0 right-0 text-[#2d7a3a]/[0.04] font-black leading-none select-none pointer-events-none text-[clamp(5rem,13vw,12rem)] tracking-tighter">
          JAIMAX
        </div>
        <div className="w-full max-w-7xl text-center mx-auto pt-6">
          <h2 className="text-4xl sideHeading mt-2 lg:text-5xl font-bold leading-tight mb-12 tracking-[-0.02em]">
            India's Trusted Pre-Sale{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              Crypto Token — Jaimax
            </span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-8 md:px-14">
          <p className="text-[15px] leading-[1.85] text-[#6b7280] mb-3 text-center">
            In the evolving world of digital finance,{" "}
            <span className="text-[var(--color-bg-primary)] font-extrabold">
              <a href="https://www.jaimax.com"> Jaimax Token</a>
            </span>{" "}
            has emerged as India's{" "}
            <b>
              {" "}
              <a
                href="https://www.jaimax.com"
                className="text-[var(--color-bg-primary)]"
              >
                {" "}
                best pre-sale crypto token
              </a>
            </b>
            , built for investors who value innovation, transparency, and
            long-term stability. As India embraces blockchain technology and
            decentralized finance, Jaimax is shaping the future of how people
            invest and grow wealth through digital currencies. From fast
            transactions and strong blockchain security to a simple and
            transparent investment model, Jaimax delivers everything an investor
            needs to participate in the decentralized economy.
          </p>
          <p className="text-[15px] leading-[1.85] text-[#6b7280] mb-9 text-center">
            More than just a crypto token, Jaimax represents a new era of
            secure, accessible, and rewarding investments for everyone.
          </p>
          <div className="flex w-full justify-center">
           
            <ActionButton
    text="Join Presale"
    to="/register"
    variant="primary"
  />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — WHAT MAKES UNIQUE  · LIGHT
      ══════════════════════════════════════════ */}
      <section
        ref={ref("unique")}
        className={`bg-[#e8f5e0] py-10 transition-opacity duration-700 ${v("unique") ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14">
          <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold leading-[1.1] tracking-tight text-[#111827] mb-6">
            What Makes <span className="text-[#2d7a3a]">Jaimax</span>
            <br />
            Unique
          </h2>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-0.5 bg-[#2d7a3a] rounded" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#2d7a3a] font-semibold">
              Trust <span className="text-[#111827] text-[9px]">Technology</span>{" "}
              opportunity
            </span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-2 sm:gap-16 gap-4 items-center">
          <div>
            <p className="text-[14px] leading-[1.85] text-[#6b7280] text-justify">
              What makes Jaimax truly unique among India's growing number of
              crypto pre-sale tokens is its powerful combination of{" "}
              <strong className="text-[#2d7a3a] font-extrabold">
                trust, technology, and opportunity
              </strong>
              . Backed by Jaisvik Software Solutions Private Limited, the
              project is designed to empower users to invest confidently in the
              future of cryptocurrency. From fast transactions and strong
              blockchain security to a simple and transparent investment model,
              Jaimax delivers everything an investor needs to participate in the
              decentralized economy.
            </p>
          </div>

          <div className="border-t border-[rgba(45,122,58,0.3)]">
            {[
              {
                num: "01",
                title: "Trust",
                desc: "Backed by Jaisvik Software Solutions Private Limited",
                color: "text-[#2d7a3a]",
                dot: "bg-[#2d7a3a]",
              },
              {
                num: "02",
                title: "Technology",
                desc: "Lightning-fast transactions with advanced blockchain security",
                color: "text-[#4a9858]",
                dot: "bg-[#4a9858]",
              },
              {
                num: "03",
                title: "Opportunity",
                desc: "Transparent investment model designed for maximum long-term returns",
                color: "text-[#3a8447]",
                dot: "bg-[#3a8447]",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-5 py-5 border-b border-[rgba(45,122,58,0.15)] hover:bg-[rgba(45,122,58,0.08)] hover:px-3 rounded-lg transition-all duration-200"
              >
                <span
                  className={`font-mono text-[11px] font-bold tracking-widest opacity-60 w-7 shrink-0 ${item.color}`}
                >
                  {item.num}
                </span>
                <div className="flex-1">
                  <div
                    className={`text-[12px] font-extrabold uppercase mb-1 ${item.color}`}
                  >
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#6b7280] leading-relaxed">
                    {item.desc}
                  </div>
                </div>
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — PRE-SALE  · LIGHT
      ══════════════════════════════════════════ */}
      <section
        ref={ref("presale")}
        className={`bg-[#e8f5e0] border-t border-[rgba(45,122,58,0.15)] py-10 transition-opacity duration-700 ${v("presale") ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-2 sm:gap-16 items-start">
          <div>
            <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold leading-[1.1] tracking-tight text-[#111827] mb-6">
              Exclusive Pre-Sale{" "}
              <span className="text-[#2d7a3a]">Opportunity</span>
            </h2>
            <p className="text-[14px] leading-[1.85] text-[#6b7280] mb-4 text-justify">
              The Jaimax pre-sale offers early investors an exclusive
              opportunity to purchase tokens at a low initial price before
              public trading begins. This pre-sale advantage allows holders to
              maximize their growth potential while supporting a rapidly
              expanding blockchain ecosystem. Whether you are an experienced
              trader or a first-time investor, Jaimax provides a trusted
              platform to access one of India's most promising pre-sale crypto
              token.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[rgba(45,122,58,0.10)] border-[1.5px] border-[rgba(45,122,58,0.35)] rounded-2xl p-6 jm-pulse w-full lg:w-[50%] mx-auto">
              <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-[#6b7280] font-semibold mb-3">
                Current Price
              </span>
              <div className="text-[2.2rem] font-black leading-none tracking-tight text-[#2d7a3a] mb-3">
                ₹{livePrice}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a9858] jm-blink" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#4a9858] font-bold">
                  Live now
                </span>
              </div>
            </div>
            <div className="bg-[var(--color-brand-primary)] border-[1.5px] border-[rgba(45,122,58,0.20)] rounded-2xl p-6 shadow-sm w-full lg:w-[50%] mx-auto">
              <span className="block font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-bg-surface)] font-semibold mb-3">
                Expected Launching Price
              </span>
              <div className="text-[2.2rem] font-black leading-none tracking-tight text-[#7fc742] mb-3">
                ₹4.10
              </div>
              <p className="font-mono text-[10px] text-[var(--color-bg-surface)] tracking-wide leading-relaxed">
                As per mathematical calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — SECURITY  · LIGHT
      ══════════════════════════════════════════ */}
      <section
        ref={ref("security")}
        className={`bg-[#e8f5e0] border-t border-[rgba(45,122,58,0.15)] py-2 transition-opacity duration-700 ${v("security") ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14 py-8">
          <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold leading-[1.1] tracking-tight text-[#111827] mb-5">
            Security at <span className="text-[#2d7a3a]">the Heart</span>
          </h2>
          <p className="text-[14px] leading-[1.85] text-[#6b7280] mb-4 text-justify">
            Security remains at the heart of the Jaimax ecosystem. Every
            transaction is protected by advanced blockchain encryption, ensuring
            full transparency and zero manipulation. Investors can buy, hold,
            and trade Jaimax confidently, knowing that the platform follows
            industry-leading standards for safety and compliance. The Jaimax
            Token is built to handle real-world utility — from DeFi and NFTs to
            decentralized applications — ensuring that each coin holds long-term
            value beyond speculation.
          </p>
          <p className="text-[14px] leading-[1.85] text-[#6b7280] mb-6 text-justify">
            Unlike most projects that focus only on trading, Jaimax is creating
            a complete blockchain ecosystem where investors, developers, and
            learners come together. Its vision extends beyond profit — aiming to
            educate, innovate, and connect users worldwide through blockchain
            education and financial empowerment. This human-centered approach
            sets Jaimax apart as a best-in-class crypto token designed to
            sustain long-term growth.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — VISION + CTA  · LIGHT
      ══════════════════════════════════════════ */}
      <section
        ref={ref("vision")}
        className={`bg-[#e8f5e0] border-t border-[rgba(45,122,58,0.15)] py-2 transition-opacity duration-700 ${v("vision") ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-6xl mx-auto px-8 md:px-14 py-10">
          <div>
            <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold leading-[1.1] tracking-tight text-[#111827] mb-6">
              The Future <span className="text-[#2d7a3a]">with Jaimax</span>
            </h2>
            <p className="text-[14px] leading-[1.85] text-[#6b7280] mb-4 text-justify">
              As India steps into the next generation of digital finance, Jaimax
              Token continues to lead as the{" "}
              <b>
                {" "}
                <a
                  href="https://www.jaimax.com"
                  className="text-[var(--color-brand-primary)]"
                >
                  {" "}
                  best pre-sale crypto token
                </a>
              </b>{" "}
              in India, offering a bridge between today's investors and
              tomorrow's decentralized economy. By investing early, users not
              only secure potential profits but also contribute to the
              development of a transparent and accessible financial future.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-[#2d7a3a] to-[#4a9858] rounded-[6px] p-6 md:p-14 flex flex-col items-center justify-center gap-8 shadow-[0_24px_64px_rgba(45,122,58,0.28)] transition-shadow duration-300">
            <div className="flex-1">
              <h3 className="text-[clamp(1.1rem,2vw,1.6rem)] font-semibold text-center text-white leading-[1.3] tracking-tight mb-3">
                Join Jaimax today — the crypto pre-sale token redefining how India invests in blockchain.
              </h3>
              <p className="font-mono text-[12px] text-white/65 text-center">
                Invest early. Grow confidently. Own the future with Jaimax.
              </p>
            </div>

            <div>
              <ActionButton
    text="Join Presale"
    to="/register"
    variant="primary"
  />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .jm-blink { animation: jmBlink 1.4s ease-in-out infinite; }
        @keyframes jmBlink { 0%,100%{opacity:1} 50%{opacity:.25} }
        .jm-pulse { animation: jmPulse 2.5s ease-in-out infinite; }
        @keyframes jmPulse {
          0%,100% { border-color: rgba(127,199,66,0.55); }
          50%      { border-color: rgba(45,122,58,0.30); }
        }
      `}</style>
    </div>
  );
};

export default JaimaxSeoSection;
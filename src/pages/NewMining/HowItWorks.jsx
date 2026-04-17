// import { motion } from "framer-motion";
// import { Download, UserPlus, RefreshCw, Eye, Coins, ArrowRight } from "lucide-react";

// const steps = [
//   { icon: Download, step: "01", title: "Install the Jaimax Application", desc: "Download the Jaimax app from the Google Play Store or App Store on your smartphone.", gold: true },
//   { icon: UserPlus, step: "02", title: "Create Your Account", desc: "Sign up with your details to set up your personal Jaimax mining profile.", gold: false },
//   { icon: RefreshCw, step: "03", title: "Activate Your Mining Cycle", desc: "Tap to activate a cycle inside the app and begin your daily participation session.", gold: true },
//   { icon: Eye, step: "04", title: "Engage with the App", desc: "Watch advertisements and complete required in-app activities during your active cycle.", gold: false },
//   { icon: Coins, step: "05", title: "Earn FREE JMC Coins", desc: "Receive JMC coin rewards upon successful completion of each mining cycle.", gold: true },
// ];

// const HowItWorks = () => {
//   return (
//     <section id="how-it-works" className="py-14 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* ── Section 1: What is Jaimax Mining ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-6"
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-5">
//             <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
//             <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
//               Step by Step
//             </span>
//           </div>
//           {/* <div className="inline-flex items-center justify-center gap-2 glass-brand rounded-full px-4 py-2 mb-5">
//             <span className="text-[#085259] text-xs sm:text-sm font-medium">
//               Step by Step
//             </span>
//           </div> */}

//           {/* Primary heading — large serif-weight display */}
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
//             How{" "}
//             <span className="text-[#085259]">Jaimax Mining</span>{" "}
//             Works
//           </h2>

//           {/* Descriptive paragraph — longer, more prominent */}
//           <p className="text-black/60 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">
//             Jaimax Mining works through a structured participation model where users complete
//             simple activities inside the app to earn rewards. The system is designed to be
//             easy to follow and accessible for all users.
//           </p>
//         </motion.div>

//         {/* ── Divider between the two heading blocks ── */}
//         <div className="flex items-center gap-4 my-10 max-w-xl mx-auto">
//           <div className="flex-1 h-px bg-black/10" />
//           <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-black/35 whitespace-nowrap">
//             Get started in 5 steps
//           </span>
//           <div className="flex-1 h-px bg-black/10" />
//         </div>

//         {/* ── Section 2: How to Start ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           {/* Secondary heading — smaller, sans-serif weight */}
//           <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-3">
//             How to Start{" "}
//             <span className="text-[#085259]">Crypto Mining</span>{" "}
//             with Jaimax
//           </h3>

//           {/* Short intro — compact and muted */}
//           <p className="text-black/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
//             Getting started with crypto mining in India using Jaimax App is simple:
//           </p>
//         </motion.div>

//         {/* ── Step Cards ── */}

//         {/* Mobile & Tablet (< lg) */}
//         <div className="flex flex-col sm:grid sm:grid-cols-2 lg:hidden gap-4 mb-10">
//           {steps.map((step, i) => (
//             <motion.div
//               key={step.step}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.08 }}
//               className={`rounded-2xl p-6 border flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default
//                 ${step.gold
//                   ? "bg-[#085259]/5 border-[#085259]/20 hover:border-[#085259]/40 hover:bg-[#085259]/8"
//                   : "bg-white border-black/8 hover:border-[#085259]/25 hover:bg-[#085259]/3"
//                 }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className={`w-11 h-11 rounded-xl flex items-center justify-center
//                   ${step.gold ? "bg-[#085259]/12" : "bg-black/5"}`}>
//                   <step.icon className={`w-5 h-5 ${step.gold ? "text-[#085259]" : "text-black/60"}`} />
//                 </div>
//                 <span className={`text-3xl font-bold opacity-15 ${step.gold ? "text-[#085259]" : "text-black"}`}>
//                   {step.step}
//                 </span>
//               </div>
//               <div>
//                 <h4 className="text-black font-semibold text-sm mb-1.5 leading-snug">{step.title}</h4>
//                 <p className="text-black/50 text-xs leading-relaxed">{step.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Desktop (lg+) — equal height flex row with centered arrows */}
//         <div className="hidden lg:flex items-stretch gap-0 mb-10">
//           {steps.map((step, i) => (
//             <div key={step.step} className="flex items-stretch flex-1">
//               {/* Card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: i * 0.1 }}
//                 className={`flex-1 flex flex-col rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-default group
//                   ${step.gold
//                     ? "bg-[#085259]/5 border-[#085259]/20 hover:border-[#085259]/40 hover:bg-[#085259]/8"
//                     : "bg-white border-black/8 hover:border-[#085259]/25 hover:bg-[#085259]/3"
//                   }`}
//               >
//                 {/* Top row: icon + step number */}
//                 <div className="flex items-center justify-between mb-5">
//                   <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300
//                     ${step.gold
//                       ? "bg-[#085259]/12 group-hover:bg-[#085259]/20"
//                       : "bg-black/5 group-hover:bg-[#085259]/8"
//                     }`}>
//                     <step.icon className={`w-5 h-5 ${step.gold ? "text-[#085259]" : "text-black/60"}`} />
//                   </div>
//                   <span className={`text-3xl font-bold opacity-15 ${step.gold ? "text-[#085259]" : "text-black"}`}>
//                     {step.step}
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h4 className="text-black font-semibold text-sm mb-2 leading-snug">{step.title}</h4>

//                 {/* Desc — flex-1 pushes it to fill remaining space evenly */}
//                 <p className="text-black/50 text-xs leading-relaxed flex-1">{step.desc}</p>
//               </motion.div>

//               {/* Centered Arrow — vertically centered via self-center, hidden after last */}
//               {i < steps.length - 1 && (
//                 <div className="flex-shrink-0 flex items-center justify-center px-2 self-center">
//                   <ArrowRight className="w-4 h-4 text-black/20" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ── CTA Button ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="text-center mt-10"
//         >
//           <motion.button
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => {
//               const el = document.querySelector("#cta");
//               if (el) el.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="inline-flex items-center gap-2 bg-[#085259] hover:bg-[#064047] text-white font-semibold text-sm px-9 py-4 rounded-2xl transition-colors duration-200"
//           >
//             <Download className="w-4 h-4" />
//             Download Jaimax Now
//           </motion.button>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, UserPlus, RefreshCw, Eye, Coins, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Install the Jaimax Application",
    desc: "Download the Jaimax app from the Google Play Store or App Store on your smartphone.",
  },
  {
    icon: UserPlus,
    step: "02",
    title: "Create Your Account",
    desc: "Sign up with your details to set up your personal Jaimax mining profile.",
  },
  {
    icon: RefreshCw,
    step: "03",
    title: "Activate Your Mining Cycle",
    desc: "Tap to activate a cycle inside the app and begin your daily participation session.",
  },
  {
    icon: Eye,
    step: "04",
    title: "Engage with the App",
    desc: "Watch advertisements and complete required in-app activities during your active cycle.",
  },
  {
    icon: Coins,
    step: "05",
    title: "Earn FREE JMC Coins",
    desc: "Receive JMC coin rewards upon successful completion of each mining cycle.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    steps.forEach((_, i) => {
      // setTimeout(() => setActive(i), 300 + i * 550);
      setTimeout(() => setActive(i), 600 + i * 900);
    });
  }, [inView]);

   const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";

  return (
    <section id="how-it-works" className="py-2 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* subtle bg accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#085259]/[0.03] blur-[120px] pointer-events-none" />

      <div ref={ref}  className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              Step by Step
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
            How{" "}
            <span className="text-[#085259]">Jaimax Mining</span>{" "}
            Works
          </h2>

          <p className="text-black/60 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
            Jaimax Mining works through a structured participation model where users complete
            simple activities inside the app to earn rewards. The system is designed to be
            easy to follow and accessible for all users.
          </p>
        </motion.div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 my-10 max-w-xl mx-auto">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-black/35 whitespace-nowrap">
            Get started in 5 steps
          </span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        {/* ── Sub-heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-3">
            How to Start{" "}
            <span className="text-[#085259]">Crypto Mining</span>{" "}
            with Jaimax
          </h3>
          <p className="text-black/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Getting started with <span className="font-semibold text-black/65"><a href="https://www.jaimax.com/free-crypto-mining/">crypto mining India </a></span> using Jaimax App is simple:
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════
            DESKTOP stepper — horizontal track
        ══════════════════════════════════════════ */}
        <div className="hidden lg:block mb-6">

          {/* track row */}
          <div className="relative flex items-start justify-between gap-0">

            {/* full-width background rail */}
            <div className="absolute top-[22px] left-[calc(10%)] right-[calc(10%)] h-px bg-[#085259]/10 z-0" />

            {/* animated fill rail */}
            <motion.div
              className="absolute top-[22px] left-[calc(10%)] h-px bg-[#085259]/40 z-0 origin-left"
              style={{ right: "calc(10%)" }}
              initial={{ scaleX: 0 }}
              animate={active >= steps.length - 1 ? { scaleX: 1 } : { scaleX: active < 0 ? 0 : (active / (steps.length - 1)) }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {steps.map(({ icon: Icon, step, title, desc }, i) => {
              const isActive = active >= i;
              return (
                <div key={step} className="relative z-10 flex flex-col items-center flex-1 px-3">

                  {/* icon node */}
                  <div className="relative w-11 h-11 mb-5">
                    {/* ring */}
                    <div className="absolute inset-0 rounded-full border border-[#085259]/20" />

                    {/* fill */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#085259]"
                      initial={{ scale: 0 }}
                      animate={isActive ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    />

                    {/* pulse ring — fires once on activation */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[#085259]/40"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    )}

                    {/* icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Icon
                        className="w-4 h-4 transition-colors duration-300"
                        style={{ color: isActive ? "#fff" : "rgba(8,82,89,0.3)" }}
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  {/* step label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.18 }}
                    className="text-center"
                  >
                    {/* <span className="block text-[10px] font-bold text-[#085259]/35 tracking-widest mb-1">
                      {step}
                    </span> */}
                    <p className="text-black font-semibold text-sm leading-snug mb-1.5">
                      {title}
                    </p>
                    <p className="text-black/45 text-[11px] leading-relaxed max-w-[140px] mx-auto">
                      {desc}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>

          {/* completion tag */}
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 8 }}
            animate={active >= steps.length - 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* <div className="inline-flex items-center gap-2 bg-[#085259]/8 border border-[#085259]/20 rounded-full px-5 py-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#085259]"
                animate={active >= steps.length - 1 ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 1, repeat: 2 }}
              />
              <span className="text-[#085259] text-xs font-semibold">
                You're all set to start mining
              </span>
            </div> */}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE / TABLET stepper — vertical track
        ══════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col max-w-md mx-auto mb-6">
          {steps.map(({ icon: Icon, step, title, desc }, i) => {
            const isActive = active >= i;
            const isLast = i === steps.length - 1;

            return (
              <div key={step} className="flex items-stretch gap-0">

                {/* connector column */}
                <div className="flex flex-col items-center w-12 flex-shrink-0">

                  {/* node */}
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border border-[#085259]/20" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#085259]"
                      initial={{ scale: 0 }}
                      animate={isActive ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[#085259]/40"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Icon
                        className="w-4 h-4 transition-colors duration-300"
                        style={{ color: isActive ? "#fff" : "rgba(8,82,89,0.3)" }}
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  {/* line */}
                  {!isLast && (
                    <div className="relative w-px flex-1 my-1 bg-[#085259]/10 overflow-hidden min-h-[52px]">
                      <motion.div
                        className="absolute top-0 left-0 w-full bg-[#085259]/40"
                        initial={{ height: "0%" }}
                        animate={active >= i + 1 ? { height: "100%" } : { height: "0%" }}
                        transition={{ duration: 0.45, delay: 0.2, ease: "easeInOut" }}
                      />
                      {active === i && (
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#085259]"
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 0.5, ease: "easeIn" }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* content */}
                <motion.div
                  className="pb-9 pt-0.5 flex-1 min-w-0 pl-4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {/* <span className="text-[10px] font-bold text-[#085259]/35 tracking-widest">
                    {step}
                  </span> */}
                  <p className="text-black font-semibold text-sm leading-snug mb-1 mt-0.5">
                    {title}
                  </p>
                  <p className="text-black/45 text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </motion.div>

              </div>
            );
          })}

          {/* terminal */}
          {/* <div className="flex items-center gap-3 pl-1 mt-1">
            <div className="w-12 flex-shrink-0 flex justify-center">
              <motion.div
                className="w-2.5 h-2.5 rounded-full border-2 border-[#085259]/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={active >= steps.length - 1 ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.3 }}
              />
            </div>
            <motion.span
              className="text-xs text-[#085259]/50 font-medium"
              initial={{ opacity: 0 }}
              animate={active >= steps.length - 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              You're all set to start mining
            </motion.span>
          </div> */}
        </div>

        {/* ── CTA ── */}
                      <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className=" flex justify-center mb-6"
            >
              <a
  href={playStoreLink}
  target="_blank"
  rel="noopener noreferrer"
  title="Download Jaimax Coin app from Google Play Store"
  className="btn-glow px-9 py-4 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 relative overflow-hidden shine-effect pulse-glow w-full sm:w-auto"
>
  <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
  Download Jaimax Now
</a>
</motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
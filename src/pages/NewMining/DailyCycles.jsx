// import { useRef, useEffect, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import { RefreshCw, Coins, TrendingUp } from "lucide-react";

// const cycleStats = [
//   { icon: RefreshCw, value: "6x",    label: "Up to 6 cycles every 24 hours" },
//   { icon: Coins,     value: "FREE",  label: "Each cycle provides an opportunity to earn free JMC coins" },
//   { icon: TrendingUp,value: "Daily", label: "Consistent participation increases total rewards" },
// ];

// const DailyCycles = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     const timer = setTimeout(() => {
//       const interval = setInterval(() => {
//         setProgress((p) => {
//           if (p >= 100) { clearInterval(interval); return 100; }
//           return p + 1.5;
//         });
//       }, 20);
//       return () => clearInterval(interval);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [inView]);

//   const radius = 90;
//   const circumference = 2 * Math.PI * radius;
//   const activeDots = Math.floor((progress / 100) * 6);

//   return (
//     <section id="cycles" className="py-14 relative overflow-hidden">
//       {/* Soft background glow */}
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#085259]/4 blur-[140px] pointer-events-none" />

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* ── Heading ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-14"
//         >
//           <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
//             <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
//             <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
//               Daily Cycles
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
//             Daily Mining Cycles and{" "}
//             <span className="text-[#085259]">Earning Structure</span>
//           </h2>

//           <p className="text-black/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
//             Jaimax Mining operates on a cycle-based system:
//           </p>
//         </motion.div>

//         {/* ── Main grid ── */}
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

//           {/* ── Ring ── */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.85 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="flex items-center justify-center"
//           >
//             <div ref={ref} className="relative w-[220px] h-[220px]">

//               {/* SVG: progress arc */}
//               <svg
//                 className="absolute inset-0 w-full h-full -rotate-90"
//                 viewBox="0 0 220 220"
//               >
//                 <defs>
//                   <linearGradient id="cycleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%"   stopColor="#085259" />
//                     <stop offset="100%" stopColor="#0d8a96" />
//                   </linearGradient>
//                 </defs>
//                 {/* Track */}
//                 <circle
//                   cx="110" cy="110" r={radius}
//                   fill="none"
//                   stroke="rgba(8,82,89,0.08)"
//                   strokeWidth="6"
//                 />
//                 {/* Progress */}
//                 <circle
//                   cx="110" cy="110" r={radius}
//                   fill="none"
//                   stroke="url(#cycleGrad)"
//                   strokeWidth="6"
//                   strokeLinecap="round"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={circumference * (1 - progress / 100)}
//                   className="transition-all duration-[20ms]"
//                 />
//               </svg>

//               {/* SVG: 6 dots */}
//               <svg
//                 className="absolute inset-0 w-full h-full"
//                 viewBox="0 0 220 220"
//               >
//                 {[...Array(6)].map((_, i) => {
//                   const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
//                   const cx = Math.cos(angle) * radius + 110;
//                   const cy = Math.sin(angle) * radius + 110;
//                   const active = i < activeDots;
//                   return (
//                     <g key={i}>
//                       <circle
//                         cx={cx} cy={cy} r={10}
//                         fill={active ? "#085259" : "rgba(8,82,89,0.10)"}
//                         style={{ transition: "fill 0.3s" }}
//                       />
//                       <text
//                         x={cx} y={cy}
//                         textAnchor="middle"
//                         dominantBaseline="central"
//                         fontSize="10"
//                         fontWeight="600"
//                         fill={active ? "#ffffff" : "rgba(8,82,89,0.35)"}
//                       >
//                         {i + 1}
//                       </text>
//                     </g>
//                   );
//                 })}
//               </svg>

//               {/* Center label */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
//                 <div className="text-5xl font-bold text-[#085259] leading-none">6</div>
//                 <div className="text-black/50 text-xs font-medium mt-1.5">Cycles / Day</div>
//               </div>

//             </div>
//           </motion.div>

//           {/* ── Stat rows ── */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7 }}
//             className="divide-y divide-black/8"
//           >
//             {/* top border */}
//             <div className="border-t border-black/8" />

//             {cycleStats.map(({ icon: Icon, value, label }, i) => (
//               <motion.div
//                 key={label}
//                 initial={{ opacity: 0, y: 12 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.45, delay: i * 0.1 }}
//                 className="flex items-center gap-4 py-5"
//               >
//                 {/* Icon */}
//                 <div className="w-9 h-9 rounded-xl bg-[#085259]/8 flex items-center justify-center flex-shrink-0">
//                   <Icon className="w-4 h-4 text-[#085259]" strokeWidth={2} />
//                 </div>

//                 {/* Value */}
//                 <div className="text-lg font-bold text-[#085259] min-w-[52px]">
//                   {value}
//                 </div>

//                 {/* Label */}
//                 <div className="text-sm text-black/55 leading-snug">
//                   {label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DailyCycles;
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RefreshCw, Coins, TrendingUp } from "lucide-react";

const cycleStats = [
  { icon: RefreshCw, value: "6x", label: "Up to 6 cycles every 24 hours" },
  {
    icon: Coins,
    value: "FREE",
    label: "Each cycle provides an opportunity to earn free JMC coins",
  },
  {
    icon: TrendingUp,
    value: "Daily",
    label: "Consistent participation increases total rewards",
  },
];

const DailyCycles = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((p) => {
          const next = p + 1;
          if (next >= 100) {
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 28);

      return () => clearInterval(interval);
    }, 350);

    return () => clearTimeout(delay);
  }, [inView]);

  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const activeDots = Math.floor((progress / 100) * 6);

  return (
    <section id="cycles" className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#085259]/4 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              Daily Cycles
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
            Daily Mining Cycles and{" "}
            <span className="text-[#085259]">Earning Structure</span>
          </h2>

          <p className="mt-4 text-black/55 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Jaimax Mining operates on a simple cycle-based system.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-[220px] h-[220px] sm:w-[250px] sm:h-[250px]">
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 220 220"
              >
                <defs>
                  <linearGradient id="cycleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#085259" />
                    <stop offset="100%" stopColor="#0d8a96" />
                  </linearGradient>
                </defs>

                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="rgba(8,82,89,0.08)"
                  strokeWidth="6"
                />

                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="url(#cycleGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress / 100)}
                  className="transition-all duration-[28ms] ease-linear"
                />
              </svg>

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 220">
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
                  const cx = Math.cos(angle) * radius + 110;
                  const cy = Math.sin(angle) * radius + 110;
                  const active = i < activeDots;

                  return (
                    <g key={i}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={10}
                        fill={active ? "#085259" : "rgba(8,82,89,0.10)"}
                        style={{ transition: "fill 0.28s ease" }}
                      />
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fontWeight="600"
                        fill={active ? "#ffffff" : "rgba(8,82,89,0.35)"}
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="text-4xl sm:text-5xl font-bold text-[#085259] leading-none">
                  6
                </div>
                <div className="text-black/50 text-[11px] sm:text-xs font-medium mt-2 uppercase tracking-[0.18em]">
                  Cycles / Day
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border-t border-black/8"
          >
            {cycleStats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex items-start gap-4 py-5 border-b border-black/8"
              >
                <div className="mt-0.5 w-10 h-10 rounded-full bg-[#085259]/8 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#085259]" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-bold text-[#085259] mb-1">
                    {value}
                  </div>
                  <div className="text-sm sm:text-[15px] text-black/55 leading-relaxed max-w-md">
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DailyCycles;

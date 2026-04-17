// import { motion } from "framer-motion";
// import { Cpu, MonitorX, ShieldOff, Smartphone } from "lucide-react";

// const noNeedItems = [
//   { icon: Cpu, label: "Mining machines" },
//   { icon: MonitorX, label: "GPUs or ASIC devices" },
//   { icon: ShieldOff, label: "Technical expertise" },
// ];

// const CryptoMining = () => {
//   return (
//     <section id="about" className="py-14 relative overflow-hidden ">
//       {/* Background blobs */}
//       <div className="absolute left-0 top-1/2 w-72 h-72 rounded-full bg-[#085259]/4 blur-[100px] pointer-events-none" />
//       <div className="absolute right-0 top-1/4 w-60 h-60 rounded-full bg-white/2 blur-[100px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="flex flex-col items-center text-center"
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
//             <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
//             <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
//               Mining In India
//             </span>
//           </div>

//           {/* Heading */}
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
//             Crypto Mining in{" "}
//             <span className="text-[#085259]">India</span>
//           </h2>

//           {/* Intro paragraph */}
//           <p className="text-black/60 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto mb-8">
//             Jaimax Mining provides a way to explore free crypto mining in India
//             without expensive equipment or infrastructure.
//           </p>

//           {/* Divider */}
//           <div className="flex items-center gap-4 w-full max-w-sm mb-8">
//             <div className="flex-1 h-px bg-black/10" />
//             <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-black/35 whitespace-nowrap">
//               Users do not need
//             </span>
//             <div className="flex-1 h-px bg-black/10" />
//           </div>

//           {/* Icon list — responsive grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
//             {noNeedItems.map(({ icon: Icon, label }, i) => (
//               <motion.div
//                 key={label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className="flex flex-col items-center gap-3 bg-[#085259]/5 border border-[#085259]/12 rounded-2xl px-5 py-5 hover:border-[#085259]/30 hover:bg-[#085259]/8 transition-all duration-300 group"
//               >
//                 <div className="w-11 h-11 rounded-xl bg-[#085259]/10 flex items-center justify-center group-hover:bg-[#085259]/18 transition-colors duration-300">
//                   <Icon className="w-5 h-5 text-[#085259]" />
//                 </div>
//                 <span className="text-black/70 text-sm font-medium text-center leading-snug">
//                   {label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>

//           {/* Bottom paragraph */}
//           <div className="flex items-start gap-3 bg-white border border-black/8 rounded-2xl px-6 py-5 max-w-4xl w-full">
//             <div className="flex-shrink-0 mt-0.5">
//               <Smartphone className="w-5 h-5 text-[#085259]" />
//             </div>
//             <p className="text-black/60 text-sm leading-relaxed text-left">
//               Instead, participation is based on{" "}
//               <span className="text-black font-semibold">in-app engagement</span>,
//               making it accessible for beginners and everyday users.
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default CryptoMining;

import { useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, MonitorX, ShieldOff, Smartphone, ArrowRight } from "lucide-react";

const noNeedItems = [
  { icon: Cpu, label: "Mining machines" },
  { icon: MonitorX, label: "GPUs or ASIC devices" },
  { icon: ShieldOff, label: "Technical expertise" },
];

const stats = [
  { value: "₹0", label: "Hardware cost" },
  { value: "0",  label: "Skills needed" },
  { value: "6×", label: "Daily cycles" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const CryptoMining = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-[#085259]/10">

      {/* Angled edges */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white pointer-events-none"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#085259]/15 border border-[#085259]/25 rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              Mining In India
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight">
            Crypto Mining in{" "}
            <span className="text-[#085259]">India</span>
          </h2>

          <p className="text-black/60 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Jaimax Mining provides a way to explore <span className="text-[#085259] font-bold"><a href="https://www.jaimax.com/free-crypto-mining/"> free crypto mining in India </a></span>
            without expensive equipment or infrastructure.
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Strikethrough list */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-bold uppercase text-[#085259]/50 mb-8">
              Users do not need
            </p>

            <div className="space-y-6">
              {noNeedItems.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  variants={item}
                  className="relative flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#085259]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#085259]" strokeWidth={1.5} />
                  </div>

                  <div className="relative flex-1">
                    <span className="text-black/70 text-base font-medium">{label}</span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.2, ease: "easeInOut" }}
                      className="absolute left-0 top-1/2 h-[0.5px] w-full bg-gradient-to-r from-[#25848d] to-[#085259]/30 origin-left"
                    />
                  </div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.2, type: "spring", stiffness: 260, damping: 14 }}
                    className="w-6 h-6 rounded-full bg-[#085259]/10 flex items-center justify-center flex-shrink-0"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 2L8 8M8 2L2 8" stroke="#085259" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="absolute inset-0 bg-white/30 rounded-xl pointer-events-none"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Instead block + stats row */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* "Instead" statement */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#085259] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#085259]/50 mb-1">
                  Instead
                </p>
                <p className="text-black font-semibold text-lg leading-snug mb-1">
                  In-app engagement
                </p>
                <p className="text-black/55 text-sm leading-relaxed">
                  participation is based on in-app engagement, making it accessible for beginners and everyday users.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#085259]/12" />

            {/* Stats — horizontal pill row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
                  className="flex-1 flex flex-col items-center justify-center bg-white/90 border border-[#085259]/12 hover:border-[#085259]/30 hover:bg-[#085259]/3 transition-all duration-300 rounded-2xl py-5 px-4"
                >
                  <span className="text-[#085259] text-3xl font-bold leading-none mb-1">
                    {value}
                  </span>
                  <span className="text-black/40 text-xs uppercase tracking-wide text-center">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Arrow CTA hint */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-[#085259] text-sm font-medium cursor-pointer hover:text-[#0e828d]"
              onClick={() => {
                const el = document.querySelector("#how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>See how it works</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CryptoMining;
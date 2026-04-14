// import { motion } from "framer-motion";
// import { Coins, CreditCard, ArrowRightLeft } from "lucide-react";
// import coinImg from "@/assets/jmc-coin.png"; 

// const utilities = [
//   { icon: Coins, title: "Platform rewards", desc: "Earn JMC for in-app participation and cycle completion", gold: true },
//   { icon: ArrowRightLeft, title: "Transactions within the ecosystem", desc: "Use JMC across the Jaimax digital ecosystem", gold: false },
//   { icon: CreditCard, title: "Future applications such as payments and services", desc: "Future applications including payments and services", gold: true },
// ];

// const JMCCoin = () => {
//   return (
//     <section id="jmc-coin" className="py-8 relative overflow-hidden bg-[#085259]/10">
//       {/* Background */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#085259]/5 blur-[150px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
//               JMC Token
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
//             What is <span className="text-[#085259]">JMC Coin</span>?
//           </h2>

//           <p className="text-black/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-1">
//             JMC (Jaimax Coin) is the utility token within the Jaimax ecosystem.
//           </p>
//           <p className="text-black/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
//             It is designed to support:
//           </p>
//         </motion.div>

//         {/* ── Main grid ── */}
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

//           {/* ── Coin visual ── */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.7 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.9 }}
//             className="flex items-center justify-center py-10 lg:py-0"
//           >
//             <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">

//               {/* Outer orbit ring */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-0 rounded-full border border-[#085259]/15"
//               >
//                 <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#085259] shadow-[0_0_12px_rgba(8,82,89,0.5)]" />
//               </motion.div>

//               {/* Mid orbit ring */}
//               <motion.div
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-8 rounded-full border border-[#085259]/12"
//               >
//                 <div className="absolute -bottom-2 right-4 w-4 h-4 rounded-full bg-[#085259]/25" />
//               </motion.div>

//               {/* Inner orbit ring */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-16 rounded-full border border-[#085259]/10"
//               >
//                 <div className="absolute top-0 -right-2 w-3 h-3 rounded-full bg-[#085259]/60" />
//               </motion.div>

//               {/* Center coin */}
// <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "800px" }}>
//   <motion.div
//     animate={{ rotateY: 360 }}
//     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//     className="relative w-32 h-32 sm:w-36 sm:h-36"
//     style={{ transformStyle: "preserve-3d" }}
//   >
//     {/* Front */}
//     <div
//       className="absolute inset-0 rounded-full overflow-hidden shadow-[0_8px_40px_rgba(8,82,89,0.35)]"
//       style={{ backfaceVisibility: "hidden" }}
//     >
//       <img
//         src={coinImg}
//         alt="JMC Coin"
//         className="w-full h-full object-cover"
//       />
//     </div>

//     {/* Back (same image, flipped) */}
//     <div
//       className="absolute inset-0 rounded-full overflow-hidden"
//       style={{
//         transform: "rotateY(180deg)",
//         backfaceVisibility: "hidden",
//       }}
//     >
//       <img
//         src={coinImg}
//         alt="JMC Coin Back"
//         className="w-full h-full object-cover"
//       />
//     </div>
//   </motion.div>
// </div>

//               {/* Ambient glow */}
//               <div className="absolute inset-0 rounded-full bg-[#085259]/8 blur-3xl pointer-events-none" />
//             </div>
//           </motion.div>

//           {/* ── Utility cards ── */}
//           <div className="space-y-4">
//             {utilities.map((u, i) => (
//               <motion.div
//                 key={u.title}
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 className={`group flex items-center gap-5 rounded-2xl p-5 border cursor-default transition-all duration-300 hover:translate-x-1.5
//                   ${u.gold
//                     ? "bg-[#085259]/5 border-[#085259]/20 hover:border-[#085259]/40 hover:bg-[#085259]/8"
//                     : "bg-white border-black/8 hover:border-[#085259]/25 hover:bg-[#085259]/3"
//                   }`}
//               >
//                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300
//                   ${u.gold
//                     ? "bg-[#085259]/12 group-hover:bg-[#085259]/20"
//                     : "bg-black/5 group-hover:bg-[#085259]/8"
//                   }`}
//                 >
//                   <u.icon className={`w-6 h-6 transition-colors duration-300
//                     ${u.gold ? "text-[#085259]" : "text-black/60 group-hover:text-[#085259]"}`}
//                   />
//                 </div>
//                 <h3 className="text-black font-semibold text-sm leading-snug">{u.title}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* ── Footer note ── */}
//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="text-black/55 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed text-center mt-14"
//         >
//           JMC is part of a broader infrastructure that includes wallet systems, exchange
//           development, and a planned blockchain network.
//         </motion.p>

//       </div>
//     </section>
//   );
// };

// export default JMCCoin;

import { motion } from "framer-motion";
import { Coins, CreditCard, ArrowRightLeft } from "lucide-react";
import coinImg from "@/assets/jmc-coin.png";

const utilities = [
  {
    icon: Coins,
    title: "Platform rewards",
    desc: "Earn JMC for in-app participation and cycle completion",
  },
  {
    icon: ArrowRightLeft,
    title: "Transactions within the ecosystem",
    desc: "Use JMC across the Jaimax digital ecosystem",
  },
  {
    icon: CreditCard,
    title: "Future applications such as payments and services",
    desc: "Future applications including payments and services",
  },
];

const JMCCoin = () => {
  return (
    <section
      id="jmc-coin"
      className="py-12 lg:py-16 relative overflow-hidden bg-[#085259]/10"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#085259]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              JMC Token
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
            What is <span className="text-[#085259]">JMC Coin</span>?
          </h2>

          <p className="text-black/55 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-1">
            JMC (Jaimax Coin) is the utility token within the Jaimax ecosystem.
          </p>
          <p className="text-black/55 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            It is designed to support:
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Coin visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex items-center justify-center py-10 lg:py-0"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-[420px] lg:h-[420px]">
              {/* Outer orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[#085259]/15"
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#085259]" />
              </motion.div>

              {/* Mid orbit */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 lg:inset-14 rounded-full border border-[#085259]/12"
              >
                <div className="absolute -bottom-2 right-4 w-4 h-4 rounded-full bg-[#085259]/25" />
              </motion.div>

              {/* Inner orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 lg:inset-28 rounded-full border border-[#085259]/10"
              >
                <div className="absolute top-0 -right-2 w-3 h-3 rounded-full bg-[#085259]/60" />
              </motion.div>

              {/* Coin */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ perspective: "800px" }}
              >
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden shadow-[0_8px_40px_rgba(8,82,89,0.35)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={coinImg}
                      alt="JMC Coin"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={coinImg}
                      alt="JMC Coin Back"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-[#085259]/8 blur-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* ── Clean feature list ── */}
          <div className="relative pl-6">
            {/* vertical line */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-[#085259]/20" />

            <div className="space-y-6">
              {utilities.map((u, i) => (
                <motion.div
                  key={u.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 w-10 h-10 rounded-lg bg-[#085259]/10 flex items-center justify-center">
                    <u.icon className="w-5 h-5 text-[#085259]" />
                  </div>

                  <div>
                    <h3 className="text-black font-semibold text-base">
                      {u.title}
                    </h3>
                    <p className="text-black/50 text-sm mt-1 leading-relaxed">
                      {u.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-black/55 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed text-center mt-14"
        >
          JMC is part of a broader infrastructure that includes wallet systems,
          exchange development, and a planned blockchain network.
        </motion.p>
      </div>
    </section>
  );
};

export default JMCCoin;
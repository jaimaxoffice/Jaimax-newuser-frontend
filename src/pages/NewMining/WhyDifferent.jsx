// import { motion } from "framer-motion";
// import { Cpu, Code2, Smartphone, Network, Users, Zap } from "lucide-react";

// const points = [
//   { icon: Cpu, title: "Simple onboarding", desc: "Zero hardware investment needed", gold: true },
//   { icon: Code2, title: "Mobile-based access", desc: "Completely software-based participation", gold: false },
//   { icon: Zap, title: "No hardware required", desc: "Simple enough for absolute beginners", gold: true },
//   { icon: Smartphone, title: "Structured participation system", desc: "Mine directly from your smartphone", gold: false },
//   { icon: Users, title: "Ecosystem integration", desc: "Designed for India's growing crypto audience", gold: true },
// ];

// const WhyDifferent = () => {
//   return (
//     <section id="why" className="py-16 relative overflow-hidden">
//       {/* Background blob */}
//       <div className="absolute right-0 top-1/2 w-80 h-80 rounded-full bg-[#085259]/4 blur-[120px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* ── Heading ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-14"
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
//             <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
//             <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
//               Why Jaimax Mining
//             </span>
//           </div>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
//             Why Jaimax is a{" "}
//             <span className="text-[#085259]">Beginner Friendly</span>{" "}
//             Crypto Mining App
//           </h2>

//           <p className="text-black/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
//             Jaimax is designed for users who are new to crypto and want a simple entry point.
//           </p>
//         </motion.div>

//         {/* ── Cards grid ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
//           {points.map((point, i) => (
//             <motion.div
//               key={point.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className={`group flex flex-col rounded-2xl p-6 border cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg
//                 ${point.gold
//                   ? "bg-[#085259]/5 border-[#085259]/20 hover:border-[#085259]/40 hover:bg-[#085259]/8"
//                   : "bg-white border-black/8 hover:border-[#085259]/25 hover:bg-[#085259]/3"
//                 }`}
//             >
//               {/* Icon */}
//               <div
//                 className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300
//                   ${point.gold
//                     ? "bg-[#085259]/12 group-hover:bg-[#085259]/20"
//                     : "bg-black/5 group-hover:bg-[#085259]/8"
//                   }`}
//               >
//                 <point.icon
//                   className={`w-6 h-6 transition-colors duration-300
//                     ${point.gold ? "text-[#085259]" : "text-black/60 group-hover:text-[#085259]"}`}
//                 />
//               </div>

//               {/* Title */}
//               <h3 className="text-black font-semibold text-sm mb-2 leading-snug">
//                 {point.title}
//               </h3>

//               {/* Desc */}
//               <p className="text-black/50 text-xs leading-relaxed flex-1">
//                 {point.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>

      
//       </div>
//     </section>
//   );
// };

// export default WhyDifferent;

import { motion } from "framer-motion";
import { Cpu, Code2, Smartphone, Users, Zap } from "lucide-react";

const points = [
  { icon: Cpu,        title: "Simple onboarding",        desc: "Zero hardware investment needed. Get started in minutes with just your phone.",   step: "01" },
  { icon: Code2,      title: "Mobile-based access",      desc: "Completely software-based participation from anywhere in India.",                 step: "02" },
  { icon: Zap,        title: "No hardware required",     desc: "Simple enough for absolute beginners with no technical background.",              step: "03" },
  { icon: Smartphone, title: "Structured participation", desc: "Mine directly from your smartphone with a clear cycle-based system.",             step: "04" },
  { icon: Users,      title: "Ecosystem integration",    desc: "Designed for India's growing crypto audience and new users for a better future.",                     step: "05" },
];

const WhyDifferent = () => {
  return (
    <section id="why" className="py-16 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 w-80 h-80 rounded-full bg-[#085259]/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              Why Jaimax Mining
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
            Why Jaimax is a{" "}
            <span className="text-[#085259]">Beginner Friendly</span>{" "}
            Crypto Mining App
          </h2>

          <p className="text-black/55 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Jaimax is designed for users who are new to crypto and want a simple entry point.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        {/* extra bottom padding so the hanging pill doesn't clip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pb-8">
          {points.map(({ icon: Icon, title, desc, step }, i) => (
            <motion.div
  key={title}
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: i * 0.12 }}
  className="relative group"
>
  <div
    className="relative flex flex-col overflow-hidden bg-white text-black
               transition-all duration-300
               hover:scale-[1.04]
               shadow-[0_4px_24px_rgba(0,0,0,0.07)]
               hover:shadow-[0_10px_34px_rgba(8,82,89,0.18)]"
    style={{ borderRadius: "0 40px 0px 0px" }}
  >

    {/* Top */}
    <div className="flex flex-col items-center pt-8 px-5">

      {/* ICON */}
      <div className="w-12 h-12 rounded-xl bg-[#085259]/8 border border-[#085259]/10
                      flex items-center justify-center mb-4
                      transition-all duration-300
                      group-hover:bg-[#085259] group-hover:scale-110">
        <Icon
          className="w-5 h-5 text-[#085259] transition-colors duration-300 group-hover:text-white"
          strokeWidth={1.5}
        />
      </div>

      {/* Divider */}
      {/* <div className="w-16 h-1 bg-[#085259]/70" /> */}
      <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#085259] to-transparent opacity-70" />
    </div>

    {/* Body */}
    <div className="px-5 pt-4 pb-12">
      <h3 className="font-bold text-sm mb-2">
        {title}
      </h3>
      <p className="text-xs text-black/50 leading-relaxed">
        {desc}
      </p>
    </div>

    {/* Bottom thin strip */}
    <div className="absolute bottom-0 left-0 w-full h-2 bg-[#085259]/70" />

  </div>

  {/* Center floating step (RESTORED) */}
  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
    <div className="w-9 h-9 rounded-full bg-[#085259] text-white text-xs font-bold 
                    flex items-center justify-center shadow-lg
                    transition-all duration-300
                    group-hover:scale-110 group-hover:bg-[#064047]">
      {step}
    </div>
  </div>
</motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyDifferent;
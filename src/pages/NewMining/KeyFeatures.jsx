import { motion } from "framer-motion";
import { Cpu, Smile, Smartphone, Network } from "lucide-react";

const features = [
  { icon: Cpu, title: "No Hardware Needed", desc: "Start mining without any physical equipment or investment", gold: true },
  { icon: Smile, title: "Beginner Friendly Interface", desc: "Designed for users with zero crypto experience", gold: false },
  { icon: Smartphone, title: "Mobile Accessibility", desc: "Full functionality available on any Android or iOS device", gold: true },
  { icon: Network, title: "Ecosystem Connected Rewards", desc: "JMC coins connected to a growing digital ecosystem", gold: false },
];

const KeyFeatures = () => {
  return (
    <section id="features" className="py-14 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#085259]/4 blur-[140px] pointer-events-none" />

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
              Key Features
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
            Key Features of the {" "}
            <span className="text-[#085259]">Jaimax Mining</span>
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group flex flex-col rounded-2xl p-7 border cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden
                ${f.gold
                  ? "bg-[#085259]/5 border-[#085259]/20 hover:border-[#085259]/40 hover:bg-[#085259]/8"
                  : "bg-white border-black/8 hover:border-[#085259]/25 hover:bg-[#085259]/3"
                }`}
            >
              {/* Hover overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl
                ${f.gold ? "bg-[#085259]/4" : "bg-[#085259]/2"}`}
              />

              {/* Icon */}
              <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300
                ${f.gold
                  ? "bg-[#085259]/12 group-hover:bg-[#085259]/20"
                  : "bg-black/5 group-hover:bg-[#085259]/8"
                }`}
              >
                <f.icon className={`w-7 h-7 transition-colors duration-300
                  ${f.gold ? "text-[#085259]" : "text-black/60 group-hover:text-[#085259]"}`}
                />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-black font-semibold text-base mb-2 leading-snug">
                {f.title}
              </h3>

              {/* Desc */}
              <p className="relative z-10 text-black/50 text-sm leading-relaxed flex-1">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
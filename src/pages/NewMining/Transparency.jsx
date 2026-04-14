import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const badges = [
  "Rewards are linked to in-app engagement",
  "No background mining is performed",
  "Participation is activity-based",
];

const Transparency = () => {
  return (
    <section id="transparency" className="py-14 relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute right-0 top-1/3 w-72 h-72 rounded-full bg-[#085259]/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              Transparency
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
            Transparency of the{" "}
            <span className="text-[#085259]">Participation Model</span>
          </h2>

          {/* Description */}
          <p className="text-black/55 text-base leading-relaxed mb-10 max-w-xl">
            Jaimax Mining is based on user participation, not computational mining.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm mb-10">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-black/35 whitespace-nowrap">
              Our commitments
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Badges grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full ">
            {badges.map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group flex flex-col items-center gap-3 bg-[#085259]/5 border border-[#085259]/15 rounded-2xl px-5 py-5 hover:border-[#085259]/35 hover:bg-[#085259]/8 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#085259]/10 flex items-center justify-center group-hover:bg-[#085259]/18 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#085259]" />
                </div>
                <span className="text-black/70 text-sm font-medium text-center leading-snug">
                  {badge}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Transparency;
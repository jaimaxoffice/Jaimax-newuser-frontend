import { motion } from "framer-motion";
import { Wallet, BarChart3, User } from "lucide-react";

const features = [
  { icon: Wallet, title: "Wallet Balances", desc: "View and monitor all your wallet balances in one place." },
  { icon: BarChart3, title: "Transaction Tracking", desc: "Monitor and analyze your transaction history seamlessly." },
  { icon: User, title: "Account Dashboard", desc: "Access and manage your full account data with ease." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const About = () => {
  return (
    <section id="about" className="py-16 relative overflow-hidden bg-[#085259]/10">
      <div className="absolute left-1/4 top-1/3 w-72 h-72 rounded-full bg-[#085259]/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 w-60 h-60 rounded-full bg-[#085259]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
          <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
            About Jaimax
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight tracking-tight"
        >
          What is{" "}
          <span className="text-[#085259]">Jaimax</span>
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-black/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 max-w-4xl mx-auto">
            Jaimax is a digital platform that allows users to track and manage crypto-related activity through a structured dashboard.
          </p>
          <p className="text-black/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-10 max-w-4xl mx-auto">
            Jaimax is also building a broader ecosystem that includes a utility token (JMC), wallet infrastructure, exchange features, and payment systems designed for real-world use.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const el = document.querySelector("#mining");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#085259] hover:bg-[#157d89] transition-colors duration-200 px-7 py-3.5 rounded-xl font-semibold text-white"
          >
            Explore Jaimax Mining
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group bg-white/90 border border-[#085259]/12 hover:border-[#085259]/40 hover:bg-white hover:shadow-xl rounded-2xl p-6 cursor-default text-left transition-all duration-300"
            >
              {/* Icon box — dark on hover */}
              <div className="w-11 h-11 rounded-xl bg-[#085259]/10 group-hover:bg-[#085259] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_20px_rgba(8,82,89,0.35)]">
                <f.icon className="w-5 h-5 text-[#085259] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-black font-semibold text-sm mb-2 group-hover:text-[#085259] transition-colors duration-300">
                {f.title}
              </h3>

              {/* Desc */}
              <p className="text-black/50 text-xs leading-relaxed group-hover:text-black/70 transition-colors duration-300">
                {f.desc}
              </p>

              {/* Bottom accent line */}
              {/* <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-[#085259]/20 rounded-full transition-all duration-500" /> */}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
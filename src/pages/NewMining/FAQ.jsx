import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  { q: "How do I start using Jaimax Mining?", a: "Download the Jaimax app, create your account, and activate a mining cycle. Once active, complete in-app activities to start earning JMC coins." },
  { q: "Why am I not earning JMC coins after starting a cycle?", a: "If you are not receiving rewards, it usually means the required activities such as watching ads or completing the cycle have not been fully completed. Make sure each step in the cycle is finished properly." },
  { q: "How do mining cycles work in Jaimax?", a: "Jaimax Mining uses a cycle-based system where users activate a cycle and complete activities during that period. Each completed cycle allows you to earn JMC coins. Up to 6 cycles are available in 24 hours." },
  { q: "Do I need to keep the app open for mining to work?", a: "Jaimax Mining is based on user participation, so you need to interact with the app during active cycles. Rewards are not generated through background processing." },
  { q: "Why do I need to watch ads in Jaimax Mining?", a: "Watching ads is part of the participation system. It allows users to engage with the platform and receive JMC coins as rewards for their activity." },
  { q: "How can I track my JMC earnings?", a: "You can track your earnings directly in the Jaimax dashboard. It shows your JMC balance, completed cycles, and activity history in one place." },
  { q: "What happens if I miss a mining cycle?", a: "If you miss a cycle, you can start the next available one. Regular participation helps you make the most of the available earning opportunities." },
  { q: "Why is my mining cycle not activating?", a: "This can happen due to app issues, internet connectivity, or outdated versions. Try restarting the app, checking your connection, or updating to the latest version." },
  { q: "Can I use Jaimax Mining multiple times a day?", a: "Yes, users can participate in up to 6 mining cycles within a 24-hour period." },
];

const FAQItem = ({ q, a, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    onClick={onClick}
    className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
      ${isOpen
        ? "bg-[#085259]/5 border-[#085259]/30"
        : "bg-white border-black/8 hover:border-[#085259]/25 hover:bg-[#085259]/3"
      }`}
  >
    {/* Question row */}
    <div className="flex items-center justify-between gap-4 p-5 lg:p-6">
      <h3 className={`font-semibold text-sm lg:text-base leading-snug transition-colors duration-200
        ${isOpen ? "text-[#085259]" : "text-black"}`}
      >
        {q}
      </h3>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
        ${isOpen
          ? "bg-[#085259]/15 text-[#085259]"
          : "bg-black/5 text-black/40 group-hover:bg-[#085259]/8"
        }`}
      >
        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </div>

    {/* Answer */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="px-5 lg:px-6 pb-5 lg:pb-6">
            <div className="h-px bg-[#085259]/15 mb-4" />
            <p className="text-black/60 text-sm leading-relaxed">{a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-14 relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute left-1/4 top-1/2 w-80 h-80 rounded-full bg-[#085259]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
              FAQ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
            Frequently Asked{" "}
            <span className="text-[#085259]">Questions</span>
          </h2>

          <p className="text-black/55 text-sm sm:text-base leading-relaxed">
            Everything you need to know about Jaimax Mining and JMC coins.
          </p>
        </motion.div>

        {/* ── FAQ list ── */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
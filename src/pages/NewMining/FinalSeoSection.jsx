import { motion } from "framer-motion";
import { Wallet, BarChart3, User } from "lucide-react";

const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";

const SeoSection = () => {
  return (
    <section
      id="about"
      className="py-16 relative overflow-hidden bg-[#085259]/10"
    >
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
            Jaimax Mining
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
          Jaimax Mining The Smart Way to Start your  <span className="text-[#085259]">Crypto Journey</span>
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4 max-w-6xl mx-auto text-justify">
            Jaimax Mining is a simplified and beginner-friendly way to explore{" "}
            <span className="text-black font-bold">
              <a href="https://www.jaimax.com/free-crypto-mining/">
                crypto mining in India{" "}
              </a>
            </span>
            through a mobile-based participation model designed for everyday
            users. Built within the Jaimax platform, it allows users to track
            crypto activity, manage wallet data, and engage with a growing
            digital ecosystem while earning JMC coins through structured in-app
            activities. As a modern{" "}
            <span className="text-black font-bold">
              {" "}
              <a
                href={playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Jaimax Coin app from Google Play Store"
              >
                {" "}
                Crypto Mining App{" "}
              </a>{" "}
            </span>
            , it removes the complexity of traditional systems and focuses on
            user participation instead of hardware or technical setup, making it
            easier for users to get started without technical barriers.
          </p>

          <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4 max-w-6xl mx-auto text-justify">
            Unlike conventional methods, Jaimax Mining works through simple
            actions such as watching ads and activating daily cycles inside the
            app, making it accessible to anyone with a smartphone. With up to
            six cycles available every 24 hours, users can consistently engage
            and increase their rewards over time. This structured model creates
            a clear and easy experience while gradually introducing users to the
            fundamentals of digital platforms and blockchain-based systems
            powered by the{" "}
            <span className="text-black font-bold">
              <a href="https://www.jaimax.com/">Jaimax Token</a>
            </span>
            .
          </p>
          <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4 max-w-6xl mx-auto text-justify">
            At the core of this ecosystem is JMC, the utility asset designed to
            support rewards, transactions, and future platform features
            including payments and services. As the platform evolves, it is
            being developed alongside the upcoming {" "}
            <strong className="text-black">JMC-24 blockchain</strong>, which aims to enhance
            scalability, efficiency, and real-world usability across different
            applications. This broader infrastructure connects multiple
            components such as wallet systems, exchange development, and digital
            services into a unified ecosystem.
          </p>
          <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4 max-w-6xl mx-auto text-justify">
            With this foundation, Jaimax is positioning itself among the{" "}
            <span className="text-black font-bold">
              <a href="https://www.jaimax.com/best-presale-crypto-token-in-india">
                best presale crypto token in India{" "}
              </a>
            </span>
            projects that focus on practical use cases rather than complexity.
            The platform emphasizes accessibility, structured participation, and
            a clear user experience, allowing individuals to explore digital
            ecosystems in a simple and guided way.
          </p>
          <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4 max-w-6xl mx-auto text-justify">
            Overall, Jaimax Mining creates a transparent and accessible
            environment where users can participate, learn, and engage without
            technical challenges, making it a practical entry point into the
            evolving landscape of digital platforms and blockchain-driven
            ecosystems.
          </p>
        </motion.div>
      </div>

      {/* ── Tagline ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 text-2xl font-bold text-[#085259]"
      >
        Jaimax — Unlocking Your Wealth
      </motion.p>
    </section>
  );
};

export default SeoSection;

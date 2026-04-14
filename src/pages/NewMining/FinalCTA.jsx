import { motion } from "framer-motion";
import { Download, ArrowRight, Star } from "lucide-react";

const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";

const FinalCTA = () => {
  return (
    <section id="cta" className="pb-24 pt-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#085259]/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#085259]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#085259]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-[#085259]/15 rounded-3xl p-8 sm:p-10 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Inner decorative lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#085259]/30 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#085259]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#085259]/15 to-transparent" />

          {/* Inner corner glows — teal only */}
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#085259]/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#085259]/4 blur-2xl pointer-events-none" />

          {/* ── Stars ── */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              >
                <Star className="w-5 h-5 text-[#085259] fill-[#085259]" />
              </motion.div>
            ))}
          </div>

          {/* ── Heading & description ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-5 leading-tight tracking-tight">
              Start Your {" "}
              <span className="text-[#085259]">Journey Today</span>
            </h2>

            <p className="text-black/60 text-sm sm:text-base  leading-relaxed mb-4">
              Start exploring <span className="text-black font-bold"><a href="https://www.jaimax.com/free-crypto-mining/"> crypto mining in India </a></span> with a system designed for simplicity and accessibility.
            </p>
            <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4">
              Download the Jaimax app, create your account, and begin participating in daily cycles to earn JMC coins.
            </p>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
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
              Download App
            </a>
            </motion.div>
            
          </motion.div>

          {/* ── Store badges ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-10 flex-wrap"
          >
            {/* Google Play */}
            <div className="bg-white border border-[#085259]/12 rounded-2xl px-5 py-3 flex items-center gap-3 hover:border-[#085259]/30 hover:bg-[#085259]/3 transition-all duration-200 cursor-pointer">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.76c.37.2.79.24 1.19.12L15.84 12 12 8.16 3.18 23.76z" fill="#EA4335" />
                <path d="M20.82 10.24C20.41 9.7 19.8 9.32 19.1 9.2L16.62 7.8 12.78 11.64l3.84 3.84 2.48-1.4c.7-.12 1.31-.5 1.72-1.04.41-.54.6-1.22.54-1.9-.06-.68-.37-1.32-.87-1.8z" fill="#FBBC04" />
                <path d="M4.37 0.12c-.37.12-.7.37-.94.7L12 11.64 15.84 7.8 4.37.12z" fill="#4285F4" />
                <path d="M3.43.82C3.18 1.06 3 1.42 3 1.8v20.4c0 .38.18.74.43.98L12 11.64 3.43.82z" fill="#34A853" />
              </svg>
              <div className="text-left">
                <div className="text-black/40 text-xs">Get it on</div>
                <div className="text-black font-semibold text-sm">Google Play</div>
              </div>
            </div>

            {/* App Store */}
            <div className="bg-white border border-[#085259]/12 rounded-2xl px-5 py-3 flex items-center gap-3 hover:border-[#085259]/30 hover:bg-[#085259]/3 transition-all duration-200 cursor-pointer">
              <svg className="w-6 h-6 text-black flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-black/40 text-xs">Coming soon</div>
                <div className="text-black font-semibold text-sm">App Store</div>
              </div>
            </div>
          </motion.div>

          {/* ── Trust pills ── */}
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-black/40">
            {["Free to Download", "No Hardware Required", "Instant Start"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#085259]/50" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

       
      </div>
    </section>
  );
};

export default FinalCTA;
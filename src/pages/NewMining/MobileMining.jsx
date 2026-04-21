import { motion } from "framer-motion";
import { Play, Coins, Activity, RefreshCw, Download } from "lucide-react";

const mockupLabels = [
  { icon: Play, text: "Start Cycle", gold: true, pos: "top-16 -left-4 sm:-left-10 lg:-left-16" },
  { icon: Play, text: "Watch & Participate", gold: false, pos: "top-36 -right-4 sm:-right-12 lg:-right-20" },
  { icon: Coins, text: "Earn JMC", gold: true, pos: "bottom-36 -left-4 sm:-left-12 lg:-left-20" },
  { icon: Activity, text: "Track Activity", gold: false, pos: "bottom-16 -right-4 sm:-right-10 lg:-right-16" },
];

 const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";

const MobileMining = () => {
  return (
    <section id="mobile" className="py-2 sm:py-12 relative overflow-hidden bg-[#085259]/10">
      {/* Background */}
      <div className="absolute left-1/4 top-1/2 w-[500px] h-[500px] rounded-full bg-[#085259]/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Phone mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center order-2 lg:order-1 py-10 sm:py-16 lg:py-10"
          >
            <div className="relative w-56 sm:w-64 lg:w-72">
              {/* Phone frame */}
              <div className="relative bg-white/60 backdrop-blur-sm border border-[#085259]/15 rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div
                  className="bg-[hsl(220,27%,91%)] rounded-[2.5rem] overflow-hidden"
                  style={{ aspectRatio: "9/19" }}
                >
                  {/* Status bar */}
                  <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                    <span className="text-black/40 text-xs">9:41</span>
                    <div className="w-20 h-5 rounded-full bg-black" />
                    <div className="flex gap-1">
                      <div className="w-3 h-2 rounded-sm bg-[#085259]/8" />
                      <div className="w-2 h-2 rounded-full bg-[#085259]/8" />
                    </div>
                  </div>

                  {/* App content */}
                  <div className="px-5 pb-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-black/40 text-xs">Welcome back</p>
                        <p className="text-black font-bold text-sm">Jaimax Miner</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#085259]/20 flex items-center justify-center">
                        <Coins className="w-4 h-4 text-[#085259]" />
                      </div>
                    </div>

                    {/* Balance card */}
                    <div className="bg-[#085259]/8 border border-[#085259]/15 rounded-2xl p-4 mb-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#085259]/10 blur-2xl rounded-full" />
                      <p className="text-[#085259]/70 text-xs mb-1">JMC Balance</p>
                      <p className="text-black font-bold text-2xl">1,247.50</p>
                      <p className="text-black/50 text-xs mt-1">▲ +82.3 today</p>
                    </div>

                    {/* Cycles */}
                    <p className="text-black/50 text-xs mb-2">Today's Cycles</p>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5, 6].map((c) => (
                        <div
                          key={c}
                          className={`flex-1 h-7 rounded-lg text-xs font-bold flex items-center justify-center
                            ${c <= 4
                              ? "bg-[#085259]/20 text-[#085259]"
                              : "bg-[#085259]/4 text-black/20"
                            }`}
                        >
                          {c}
                        </div>
                      ))}
                    </div>

                    {/* CTA button */}
                    <div className="bg-[#085259] rounded-xl py-3 text-center cursor-pointer">
                      <span className="text-white font-bold text-sm flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Activate Cycle 5
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-white/50 border border-[#085259]/12 rounded-xl p-2.5 text-center">
                        <p className="text-[#085259] font-bold text-sm">4/6</p>
                        <p className="text-black/40 text-xs">Completed</p>
                      </div>
                      <div className="bg-white/50 border border-[#085259]/15 rounded-xl p-2.5 text-center">
                        <p className="text-black font-bold text-sm">Active</p>
                        <p className="text-black/40 text-xs">Status</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center mt-2">
                  <div className="w-20 h-1 rounded-full bg-[#085259]/6" />
                </div>
              </div>

              {/* Floating labels */}
              {mockupLabels.map((label, i) => (
                <motion.div
                  key={label.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                  className={`absolute ${label.pos} border border-[#085259]/10 backdrop-blur-md rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1.5 z-10
                    ${label.gold ? "bg-[#085259]/12" : "bg-white/70"}`}
                  style={{
                    animationDuration: `${3 + i}s`,
                    animationDelay: `${i * 0.5}s`,
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-in-out",
                  }}
                >
                  <label.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${label.gold ? "text-[#085259]" : "text-black/70"}`} />
                  <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${label.gold ? "text-[#085259]" : "text-black/70"}`}>
                    {label.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
              <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
                Mobile First
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight tracking-tight">
              <span className="text-[#085259]">Mobile Crypto</span>{" "}
              Mining Using Jaimax
            </h2>

            <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-4">
              Jaimax Mining introduces a mobile-first approach to{" "}
              <strong className="text-[#085259] hover:text-[#bfd22a] font-semibold"><a href="https://www.jaimax.com/free-crypto-mining/">crypto mining in India</a></strong>.
            </p>

            <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-8">
              Instead of running background mining processes, the app allows users to
              actively participate and earn JMC coins through engagement.
            </p>

            <div className="flex justify-center lg:justify-start">
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

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MobileMining;
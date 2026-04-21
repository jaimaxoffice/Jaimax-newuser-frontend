import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MonitorPlay, RefreshCcw, Zap } from "lucide-react";

const points = [
  {
    icon: MonitorPlay,
    title: "Watch in-app advertisements",
    desc: "View short ads inside the Jaimax app to trigger your mining cycle.",
    num: "01",
  },
  {
    icon: RefreshCcw,
    title: "Complete daily participation cycles",
    desc: "Engage with up to 6 cycles every 24 hours to maximise your earnings.",
    num: "02",
  },
  {
    icon: Zap,
    title: "Stay active inside the platform",
    desc: "Consistent daily activity compounds your total JMC coin rewards over time.",
    num: "03",
  },
];

const WhatIsMining = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    points.forEach((_, i) => {
      setTimeout(() => setActive(i), 500 + i * 700);
    });
  }, [inView]);

  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";

  return (
    <section id="mining" className="py-14 relative overflow-hidden">

      {/* desktop-only angled slab — hidden below lg so no clip-path bleed */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-[58%] bg-[#085259]/[0.05] pointer-events-none"
        style={{ clipPath: "polygon(24% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center justify-between min-h-[520px]">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-7">
              <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
              <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
                Jaimax Mining
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-black leading-[1.1] tracking-tight mb-7">
              What is{" "}
              <span className="text-[#085259]">Jaimax</span>
              {" "}Mining?
            </h2>

            <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-3 sm:mb-5">
              Jaimax Mining is an app-based participation system that enables
              users to earn JMC coins by engaging with activities inside the
              Jaimax application.
            </p>
            <p className="text-black/60 text-sm sm:text-base leading-relaxed mb-3 sm:mb-5">
              While it is inspired by{" "}
              <span className="font-semibold text-[#085259] hover:text-[#bfd22a]"><a href="https://www.jaimax.com/free-crypto-mining/">cryptomining India </a></span>
              {" "}trends, it does not involve computational mining. Instead, it
              focuses on user participation.
            </p>
            <p className="text-black/60 text-sm sm:text-base leading-relaxed">
              This makes it a beginner-friendly{" "}
              <span className="font-semibold text-[#085259] hover:text-[#bfd22a]"><a
                href={playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Jaimax Coin app from Google Play Store">crypto mining app </a></span>
              {" "}that removes technical barriers.
            </p>
          </motion.div>

          {/* ── RIGHT: vertical stepper ── */}
          <div
            ref={ref}
            className="flex flex-col lg:pl-6 max-w-md mx-auto w-full lg:max-w-none lg:mx-0"
          >
            {points.map(({ icon: Icon, title, desc, num }, i) => {
              const isActive = active >= i;
              const isLast = i === points.length - 1;

              return (
                <div key={title} className="flex gap-0 items-stretch">

                  {/* connector column */}
                  <div className="flex flex-col items-center w-14 flex-shrink-0">

                    {/* icon circle */}
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full border-2 border-[#085259]/15" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#085259]"
                        initial={{ scale: 0 }}
                        animate={isActive ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Icon
                          className="w-5 h-5 transition-colors duration-300"
                          style={{ color: isActive ? "#ffffff" : "rgba(8,82,89,0.35)" }}
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>

                    {/* line */}
                    {!isLast && (
                      <div className="relative w-px flex-1 my-1 bg-[#085259]/12 overflow-hidden min-h-[48px]">
                        <motion.div
                          className="absolute top-0 left-0 w-full bg-[#085259]/50"
                          initial={{ height: "0%" }}
                          animate={active >= i + 1 ? { height: "100%" } : { height: "0%" }}
                          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                        />
                        {active === i && (
                          <motion.div
                            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#085259]"
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 0.55, ease: "easeIn" }}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* content */}
                  <motion.div
                    className="pb-10 pt-1 flex-1 min-w-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-2 mb-1.5 pl-5">
                      {/* <span className="text-[10px] font-bold text-[#085259]/35 tracking-widest">
                        {num}
                      </span> */}
                      <p className="text-black font-semibold text-sm sm:text-[15px] leading-snug">
                        {title}
                      </p>
                    </div>
                    <p className="text-black/45 text-xs sm:text-sm leading-relaxed pl-5">
                      {desc}
                    </p>
                  </motion.div>

                </div>
              );
            })}

            {/* terminal node */}
            {/* <div className="flex gap-0 items-center">
              <div className="w-14 flex-shrink-0 flex justify-center">
                <motion.div
                  className="w-3 h-3 rounded-full border-2 border-[#085259]/30 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={active >= points.length - 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-[#085259]/40"
                    animate={active >= points.length - 1 ? { scale: [1, 1.6, 1], opacity: [1, 0, 1] } : {}}
                    transition={{ duration: 1.2, delay: 0.5, repeat: 2 }}
                  />
                </motion.div>
              </div>
              <motion.span
                className="text-xs text-[#085259]/50 font-medium ml-1"
                initial={{ opacity: 0 }}
                animate={active >= points.length - 1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                You're all set to start mining
              </motion.span>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatIsMining;
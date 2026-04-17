import { motion } from "framer-motion";
import { Download, ChevronDown, Cpu, Shield, RefreshCw, Coins } from "lucide-react";
import heroCoin from "@/assets/miningBgremoved.png";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 3,
}));

const highlights = [
  { icon: Cpu, text: "No Hardware Needed" },
  { icon: Shield, text: "Beginner Friendly" },
  { icon: RefreshCw, text: "Up to 6 Daily Cycles" },
  { icon: Coins, text: "Earn FREE JMC Coins" },
];

const Hero = () => {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const playStoreLink =
  "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60" />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-[#085259]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-[#085259]/3 blur-[120px] pointer-events-none" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#085259]/40 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1], y: [0, -20, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-brand rounded-full px-4 py-2 mb-5 sm:mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              India's Premier Crypto Mining App
            </span>
            </motion.div>
            {/* <div className="inline-flex items-center gap-2 bg-[#085259]/10 border border-[#085259]/20 rounded-full px-4 py-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#085259]" />
            <span className="text-[#085259] text-xs font-semibold tracking-widest uppercase">
              Step by Step
            </span>
          </div> */}

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-5 "
             
            >
              <span
  className="text-center bg-gradient-to-r from-black/50 to-[#0b6b72] bg-clip-text text-transparent"
  
>
                Jaimax Mining </span><br /> <span className="text-black">A Simple Way to Start Crypto{" "}</span>
              
              <span className="gradient-text-brand " >
                Mining in India
              </span>
            </motion.h1>

            {/* Para 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-black/60 text-sm md:text-base lg:text-lg leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0 text-justify"
            >
              Jaimax Mining offers a simplified way to explore{" "}
              <span className="text-[#085259] font-bold"><a href="https://www.jaimax.com/free-crypto-mining/"> crypto mining in India </a></span>
              through a mobile-based participation model. Instead of traditional
              mining that requires hardware and technical setup, Jaimax provides
              an accessible system where users can engage with the app and earn
              FREE JMC coins.
            </motion.p>

            {/* Para 2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-black/60 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-justify"
            >
              This approach makes it easier for beginners to start using a{" "}
              <span className="text-[#085259] font-bold"> <a
  href={playStoreLink}
  target="_blank"
  rel="noopener noreferrer"
  title="Download Jaimax Coin app from Google Play Store"> crypto mining app </a> </span>
              without investment while understanding how digital ecosystems work.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 w-full justify-center lg:justify-start mb-8 sm:mb-10"
            >
              <a
  href={playStoreLink}
  target="_blank"
  rel="noopener noreferrer"
  title="Download Jaimax Coin app from Google Play Store"
  className="btn-glow  px-9 py-4 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 relative overflow-hidden shine-effect pulse-glow w-full sm:w-auto"
>
  <Download className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
  Start Mining Now
</a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll("#how-it-works")}
                className="glass border border-[#085259]/15  px-9 py-4  rounded-full text-sm sm:text-base font-semibold text-black hover:border-[#085259]/40 hover:bg-[#085259]/5 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Explore How It Works
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right: Coin visual ── */}
         {/* ── Right: Coin visual ── */}
<motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
  className="relative flex items-center justify-center order-second lg:order-last lg:block hidden"
>
  <div className="mx-auto h-full">
    
    <motion.img
      src={heroCoin}
      alt="JMC Coin - Crypto Mining India"
      className="w-full h-full object-contain"
      style={{
        filter:
          "drop-shadow(0 0 40px rgba(8,82,89,0.28)) drop-shadow(0 0 80px rgba(8,82,89,0.12))",
      }}
    />

  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
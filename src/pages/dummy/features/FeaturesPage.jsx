import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Settings,
  CreditCard,
  Headphones,
  TrendingUp,
  Globe,
  BookOpen,
  FileText,
  ArrowUpRight,
  ArrowRight,
  Phone,
  Users,
  Activity,
  Coins,
} from "lucide-react";

// ── Replace these with your actual asset imports ──────────────────────────
// import featureImage from "../../assets/websiteicons.webp";
// import icon from "../../assets/coin.svg";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const stats = [
  { val: "48K+",  label: "Users",             Icon: Users    },
  { val: "2K+",   label: "Daily Transactions", Icon: Activity },
  { val: "50K+",  label: "Tokens Issued",      Icon: Coins    },
];

const features = [
  {
    num: "01",
    Icon: Users,
    title: "User Account Management",
    desc: "Easily create and manage your personal Jaimax wallet. Track token balances, purchases, and transaction history all in one place.",
  },
  {
    num: "02",
    Icon: Shield,
    title: "Privacy & Data Protection",
    desc: "Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared.",
  },
  {
    num: "03",
    Icon: CreditCard,
    title: "Secure Payment Processing",
    desc: "All transactions are powered by blockchain — fast, secure, and tamper-proof. Invest and transfer with full confidence.",
  },
  {
    num: "04",
    Icon: Headphones,
    title: "24/7 Expert Support",
    desc: "Round-the-clock assistance from our expert support team for any questions about your wallet, transactions, or features.",
  },
  {
    num: "05",
    Icon: TrendingUp,
    title: "Smart Analytics",
    desc: "Real-time performance insights with full cookie and tracking control for a transparent and secure user experience.",
  },
  {
    num: "06",
    Icon: Globe,
    title: "International Access",
    desc: "Jaimax supports global users with seamless cross-border crypto transactions, built for an international audience with full compliance.",
  },
  {
    num: "07",
    Icon: BookOpen,
    title: "Educational Resources",
    desc: "Simple, clear content about crypto, blockchain, DeFi, and tokenomics — ideal for beginners and experienced investors alike.",
  },
  {
    num: "08",
    Icon: FileText,
    title: "Policy Updates & Rights",
    desc: "Stay updated with regular policy notifications. Full user control over personal data, privacy settings, and account activity.",
  },
];

/* ─── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      custom={index % 4}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative bg-white border border-[#e8f4f5] rounded-[18px] p-6 flex flex-col cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(8,80,86,.12)] hover:border-[#b2dfe0]"
    >
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#085056] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-b-[18px]" />

      {/* Icon */}
      <div className="w-11 h-11 rounded-[12px] bg-[#e6f7f7] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#085056] group-hover:scale-105">
        <feature.Icon
          size={18}
          className="text-[#085056] transition-colors duration-300 group-hover:text-white"
        />
      </div>

      {/* Number */}
      <p className="text-[10px] font-bold tracking-widest text-[#b0c8c9] uppercase mb-1.5">
        {feature.num}
      </p>

      {/* Title */}
      <h3 className="text-[14px] font-bold text-[#0d1117] leading-snug tracking-tight mb-2.5">
        {feature.title}
      </h3>

      {/* Desc */}
      <p className="text-[12px] text-slate-500 leading-relaxed flex-1">
        {feature.desc}
      </p>

      {/* Arrow */}
      <div className="self-end mt-4 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:bg-[#085056] group-hover:border-[#085056]">
        <ArrowUpRight
          size={12}
          className="text-slate-400 transition-colors duration-300 group-hover:text-white"
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function FeaturesPage() {
  const heroRef   = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const featRef   = useRef(null);
  const featInView = useInView(featRef, { once: true, amount: 0.2 });

  return (
    <div
      className="min-h-screen bg-[#f0fdf4] mt-12"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
          • mobile  (< md)  : stacked — white top, teal bottom
          • desktop (≥ md)  : diagonal split side by side
      ══════════════════════════════════════════════════════════════════ */}



      {/* ── MOBILE hero (< md) ── */}
      <section ref={heroRef} className="md:hidden relative overflow-hidden min-h-[100svh]">

        {/* Layer 1 — your feature image as full background */}
        {/*
          When you have the real image, replace this div with:
          <img
            src={featureImage}
            alt="Jaimax Features"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        */}
        <div className="absolute inset-0 z-0 bg-[#d4eef0]">
          {/* placeholder pattern so you can see the bg layer */}
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <Coins size={160} className="text-[#085056]" />
          </div>
        </div>

        {/* Layer 2 — very light teal overlay so text is readable over the image */}
        <div className="absolute inset-0 z-[1] bg-white/75" />

        {/* Layer 3 — decorative circles */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <div className="absolute w-[220px] h-[220px] rounded-full bg-[#085056]/5 -top-10 -right-10" />
          <div className="absolute w-[100px] h-[100px] rounded-full bg-[#085056]/[0.04] bottom-16 left-4" />
          <div className="absolute w-[50px] h-[50px] rounded-full bg-[#085056]/[0.06] top-1/3 right-8" />
        </div>

        {/* Layer 4 — all text content on top */}
        <div className="relative z-[3] flex flex-col justify-between px-6 pt-10 pb-10 min-h-[100svh]">

          {/* Logo */}
          <motion.div
            variants={fadeIn} initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-2.5 mb-6"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[#085056] flex items-center justify-center">
              <Coins size={14} className="text-white" />
            </div>
            <span className="text-[15px] font-black text-[#0d1117] tracking-tight">Jaimax</span>
          </motion.div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center py-6">
            <motion.span
              custom={0} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="inline-block self-start text-[10px] font-bold tracking-[.14em] uppercase text-[#085056] bg-[#085056]/10 border border-[#085056]/20 rounded-full px-3.5 py-1.5 mb-5"
            >
              // Platform Features
            </motion.span>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-[34px] font-black text-[#0d1117] leading-[1.06] tracking-[-0.03em] mb-4"
            >
              Powering the<br />
              <span className="text-[#085056]">Future of</span><br />
              Crypto
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-[13.5px] text-slate-600 leading-relaxed mb-7 max-w-[340px]"
            >
              Welcome to <strong className="text-[#085056] font-semibold">Jaimax</strong>, designed
              for growth, transparency, and financial freedom. Built on powerful blockchain
              technology for the next generation of digital finance.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-3 flex-wrap"
            >
              <button className="flex items-center gap-2 px-5 py-3 bg-[#085056] text-white text-[13px] font-bold rounded-full border-none cursor-pointer active:scale-95 shadow-lg shadow-[#085056]/25">
                Get Started Now <ArrowRight size={14} />
              </button>
              <button className="flex items-center gap-2 text-[13px] font-semibold text-[#085056] bg-transparent border-none cursor-pointer">
                <span className="w-[32px] h-[32px] rounded-full border-[1.5px] border-[#085056] bg-white/60 flex items-center justify-center">
                  <Phone size={12} className="text-[#085056]" />
                </span>
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Stats at bottom */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-x-5 gap-y-4 pt-6 border-t border-[#085056]/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-white/70 border border-[#085056]/10 flex items-center justify-center flex-shrink-0">
                  <s.Icon size={16} className="text-[#085056]" />
                </div>
                <div>
                  <p className="text-[18px] font-black text-[#0d1117] leading-none tracking-tight">{s.val}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DESKTOP hero (≥ md) ── */}
      {/* <section className="relative overflow-hidden min-h-[520px] md:flex hidden"> */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[520px] md:flex hidden">
        {/* Teal full bg */}
        <div className="absolute inset-0 bg-[#085056] z-0" />

        {/* Decorative circles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-white/5 -top-16 -right-12" />
          <div className="absolute w-[140px] h-[140px] rounded-full bg-white/[0.04] bottom-10 right-10" />
          <div className="absolute w-[55px] h-[55px] rounded-full bg-white/[0.08] top-1/2 right-40" />
          <div className="absolute w-[32px] h-[32px] rounded-full bg-white/10 bottom-28 right-52" />
          <div className="absolute w-[70px] h-[70px] rounded-full bg-white/[0.06] top-16 left-1/2" />
        </div>

        {/* White diagonal panel */}
        <div
          className="absolute inset-0 bg-white z-[1]"
          style={{ clipPath: "polygon(0 0, 62% 0, 50% 100%, 0 100%)" }}
        />

        {/* Left content */}
        <div className="relative z-[5] flex flex-col justify-between px-8 md:px-10 lg:px-14 py-10 lg:py-14 w-full max-w-[54%] min-h-[520px]">
          <motion.div
            variants={fadeIn} initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-2.5 mb-8"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[#085056] flex items-center justify-center">
              <Coins size={14} className="text-white" />
            </div>
            <span className="text-[15px] font-black text-[#0d1117] tracking-tight">Jaimax</span>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center">
            <motion.span
              custom={0} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="inline-block self-start text-[10px] font-bold tracking-[.14em] uppercase text-[#085056] bg-[#d4f0f0] rounded-full px-3.5 py-1.5 mb-4"
            >
              // Platform Features
            </motion.span>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-[clamp(28px,4.5vw,48px)] font-black text-[#0d1117] leading-[1.06] tracking-[-0.03em] mb-4"
            >
              Powering the<br />
              <span className="text-[#085056]">Future of</span><br />
              Crypto
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-[clamp(12px,1.4vw,14px)] text-slate-500 leading-relaxed max-w-[340px] mb-7"
            >
              Welcome to <strong className="text-[#085056] font-semibold">Jaimax</strong>, designed
              for growth, transparency, and financial freedom. Built on powerful blockchain
              technology for the next generation of digital finance.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-3 flex-wrap mb-10"
            >
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#085056] text-white text-[13px] font-bold rounded-full border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(8,80,86,.35)] active:scale-95">
                Get Started Now <ArrowRight size={14} />
              </button>
              <button className="flex items-center gap-2 text-[13px] font-semibold text-[#085056] bg-transparent border-none cursor-pointer hover:gap-3 transition-all duration-200">
                <span className="w-[30px] h-[30px] rounded-full border-[1.5px] border-[#085056] flex items-center justify-center flex-shrink-0">
                  <Phone size={12} className="text-[#085056]" />
                </span>
                Learn More
              </button>
            </motion.div>
          </div>

          <motion.div
            custom={4} variants={fadeUp} initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-x-6 gap-y-4 pt-6 border-t border-slate-100"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[10px] bg-[#e6f7f7] flex items-center justify-center flex-shrink-0">
                  <s.Icon size={16} className="text-[#085056]" />
                </div>
                <div>
                  <p className="text-[clamp(15px,2vw,20px)] font-black text-[#0d1117] leading-none tracking-tight">{s.val}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 tracking-wide">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          variants={fadeIn} initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="absolute right-[3%] bottom-0 z-[4] flex items-end"
          style={{ height: "90%", width: "clamp(220px, 44%, 520px)" }}
        >
          {/*
            Replace with your image:
            <img src={featureImage} alt="Jaimax Features"
              className="w-full h-full object-contain object-bottom" />
          */}
          <div className="w-full h-full bg-white/5 border border-white/10 rounded-t-[20px] flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Coins size={28} className="text-white/40" />
            </div>
            <p className="text-white/30 text-xs text-center leading-relaxed font-medium">
              Your feature image<br />goes here
            </p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={featRef}
        className="bg-white px-4 sm:px-8 lg:px-14 py-16 lg:py-20 border-t border-[#f0f4f8]"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={featInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="inline-block text-[10px] font-bold tracking-[.14em] uppercase text-[#085056] bg-[#d4f0f0] rounded-full px-3.5 py-1.5 mb-4">
            // Core Features
          </span>
          <h2 className="text-[clamp(24px,3.5vw,38px)] font-black text-[#0d1117] tracking-tight leading-tight mb-3">
            Core{" "}
            <span className="text-[#085056]">Functional Features</span>
          </h2>
          <p className="text-[14px] text-slate-500 max-w-[480px] mx-auto leading-relaxed">
            Discover the powerful features that make Jaimax the perfect choice
            for your crypto journey.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
          {features.map((f, i) => (
            <FeatureCard key={f.num} feature={f} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
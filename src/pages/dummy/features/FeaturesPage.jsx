

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
import featureImage from "../../../assets/dummy/featurePage/womenImage.png";
// import icon from "../../assets/coin.svg";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const stats = [
  { val: "48K+", label: "Users", Icon: Users },
  { val: "2K+", label: "Daily Transactions", Icon: Activity },
  { val: "50K+", label: "Tokens Issued", Icon: Coins },
];

const features = [
  {
    num: "01",
    Icon: Users,
    title: "User Account Management",
    desc: "Easily create and manage your personal Jaimax wallet. Track token balances, purchases, and transaction history all in one place.",
    link: "/register",
    linkTitle: "Learn more about User Account Management",
  },
  {
    num: "02",
    Icon: Shield,
    title: "Privacy & Data Protection",
    desc: "Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared.",
    // link: "/best-presale-crypto-token-in-india/",
    link: "/newpresale",
    linkTitle: "Learn more about Privacy & Data Protection",
  },
  {
    num: "03",
    Icon: CreditCard,
    title: "Secure Payment Processing",
    desc: "All transactions are powered by blockchain — fast, secure, and tamper-proof. Invest and transfer with full confidence.",
    link: "/newabout/",
    linkTitle: "Learn more about Secure Payment Processing",
  },
  {
    num: "04",
    Icon: Headphones,
    title: "24/7 Expert Support",
    desc: "Round-the-clock assistance from our expert support team for any questions about your wallet, transactions, or features.",
    link: "/contactPage/",
    linkTitle: "Learn more about 24/7 Expert Support",
  },
  {
    num: "05",
    Icon: TrendingUp,
    title: "Smart Analytics",
    desc: "Real-time performance insights with full cookie and tracking control for a transparent and secure user experience.",
    link: "/blogGrid/",
    linkTitle: "Learn more about Smart Analytics",
  },
  {
    num: "06",
    Icon: Globe,
    title: "International Access",
    desc: "Jaimax supports global users with seamless cross-border crypto transactions, built for an international audience with full compliance.",
    link: "/login",
    linkTitle: "Learn more about International Access",
  },
  {
    num: "07",
    Icon: BookOpen,
    title: "Educational Resources",
    desc: "Simple, clear content about crypto, blockchain, DeFi, and tokenomics — ideal for beginners and experienced investors alike.",
    link: "/register",
    linkTitle: "Learn more about Educational Resources",
  },
  {
    num: "08",
    Icon: FileText,
    title: "Policy Updates & Rights",
    desc: "Stay updated with regular policy notifications. Full user control over personal data, privacy settings, and account activity.",
    link: "/privacy-policy/",
    linkTitle: "Learn more about Policy Updates & Rights",
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
      className="group relative rounded-[18px] p-6 flex flex-col cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-accent)",
        boxShadow: "0 4px 24px rgba(45,122,58,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.borderColor = "var(--color-brand-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(45,122,58,0.06)";
        e.currentTarget.style.borderColor = "var(--color-border-accent)";
      }}
    >
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-b-[18px]"
        style={{ background: "var(--color-brand-primary)" }}
      />

      {/* Wrap entire card content in Link for routing */}
      <Link
        to={feature.link}
        title={feature.linkTitle}
        className="flex flex-col h-full no-underline"
      >
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 bg-[var(--color-bg-overlay)] hover:bg-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:text-[var(--color-text-on-dark)]"
        >
          <feature.Icon size={18} className="transition-colors duration-300" />
        </div>

        {/* Number */}
        <p
          className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
          style={{ color: "var(--color-brand-accent)" }}
        >
          {feature.num}
        </p>

        {/* Title */}
        <h3
          className="text-[14px] font-bold leading-snug tracking-tight mb-2.5"
          style={{ color: "var(--color-text-primary)" }}
        >
          {feature.title}
        </h3>

        {/* Desc */}
        <p
          className="text-[12px] leading-relaxed flex-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {feature.desc}
        </p>

        {/* Arrow */}
        <div
  className="
    self-end mt-4 w-7 h-7 rounded-full
    flex items-center justify-center
    border border-[var(--color-border-accent)]
    transition-all duration-300
    group-hover:scale-110
    hover:bg-[var(--color-brand-primary)]
    hover:border-[var(--color-brand-primary)]
    text-[var(--color-brand-primary)]
    hover:text-[var(--color-bg-page)]
  "
>
  <ArrowUpRight
    size={12}
    className="   
      transition-colors duration-300
    "
  />
</div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function FeaturesPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, amount: 0.2 });

  // Handler kept for programmatic use if needed elsewhere
  const handleGetStartedClick = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--color-bg-page)",
        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════
          MOBILE HERO  (< md)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="md:hidden relative overflow-hidden min-h-[100svh]"
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div
            className="absolute w-[260px] h-[260px] rounded-full -top-16 -right-16 opacity-40"
            style={{ background: "var(--color-brand-light)" }}
          />
          <div
            className="absolute w-[120px] h-[120px] rounded-full bottom-20 left-4 opacity-20"
            style={{ background: "var(--color-brand-accent)" }}
          />
          <div
            className="absolute w-[60px] h-[60px] rounded-full top-1/3 right-10 opacity-30"
            style={{ background: "var(--color-brand-mid)" }}
          />
        </div>

        <div className="relative z-[3] flex flex-col justify-between px-6 pt-10 pb-10 min-h-[100svh]">
          {/* Logo mark — linked to home */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-2.5 mb-6"
          >
            <Link to="/" title="Jaimax Home" className="flex items-center gap-2.5 no-underline">
              <div
                className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                style={{ background: "var(--color-brand-primary)" }}
              >
                <Coins size={14} color="white" />
              </div>
              <span
                className="text-[15px] font-black tracking-tight"
                style={{ color: "var(--color-text-primary)" }}
              >
                Jaimax
              </span>
            </Link>
          </motion.div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center py-6">
            <motion.h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading">
              Powering the{" "}
              <Link
                to="/best-presale-crypto-token-in-india/"
                title="Best presale crypto token in India"
                className="no-underline"
              >
                <span style={{ color: "var(--color-brand-primary)" }}>
                  Crypto
                </span>
              </Link>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-[13.5px] leading-relaxed mb-7 max-w-[340px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Welcome to{" "}
              <Link to="/about" title="About Jaimax crypto token" className="no-underline">
                <strong style={{ color: "var(--color-brand-primary)", fontWeight: 600 }}>
                  Jaimax
                </strong>
              </Link>
              , designed for growth, transparency, and financial freedom. Built
              on powerful{" "}
              <Link
                to="/services"
                title="Jaimax blockchain services"
                className="no-underline"
                style={{ color: "var(--color-brand-primary)" }}
              >
                blockchain technology
              </Link>{" "}
              for the next generation of digital finance.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-3 flex-wrap"
            >
              {/* Get Started → /register */}
              <Link
                to="/register"
                title="Register on Jaimax - Start your crypto journey"
                className="flex items-center gap-2 px-5 py-3 text-[13px] font-bold rounded-full cursor-pointer active:scale-95 no-underline"
                style={{
                  background: "var(--color-brand-primary)",
                  color: "var(--color-text-on-dark)",
                  boxShadow: "var(--shadow-btn)",
                }}
              >
                Get Started Now <ArrowRight size={14} />
              </Link>

              {/* Learn More → /blog */}
              <Link
                to="/blogGrid"
                title="Read Jaimax blog - Crypto insights and updates"
                className="flex items-center gap-2 text-[13px] font-semibold bg-transparent cursor-pointer no-underline"
                style={{ color: "var(--color-brand-primary)" }}
              >
                <span
                  className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
                  style={{
                    border: "1.5px solid var(--color-brand-primary)",
                    background: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Phone size={12} style={{ color: "var(--color-brand-primary)" }} />
                </span>
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-x-5 gap-y-4 pt-6"
            style={{ borderTop: "1px solid var(--color-border-accent)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--color-bg-overlay)",
                    border: "1px solid var(--color-border-accent)",
                  }}
                >
                  <s.Icon size={16} style={{ color: "var(--color-brand-primary)" }} />
                </div>
                <div>
                  <p
                    className="text-[18px] font-black leading-none tracking-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {s.val}
                  </p>
                  <p
                    className="text-[10px] font-medium mt-0.5"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP HERO  (≥ md)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[520px] md:flex hidden"
        style={{ background: "var(--color-brand-dark)" }}
      >
        {/* Decorative circles on the dark side */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute w-[280px] h-[280px] rounded-full -top-16 -right-12 opacity-10"
            style={{ background: "var(--color-brand-accent)" }}
          />
          <div
            className="absolute w-[140px] h-[140px] rounded-full bottom-10 right-10 opacity-[0.06]"
            style={{ background: "var(--color-brand-light)" }}
          />
          <div
            className="absolute w-[55px] h-[55px] rounded-full top-1/2 right-40 opacity-10"
            style={{ background: "var(--color-brand-accent)" }}
          />
          <div
            className="absolute w-[32px] h-[32px] rounded-full bottom-28 right-52 opacity-15"
            style={{ background: "var(--color-brand-mid)" }}
          />
          <div
            className="absolute w-[70px] h-[70px] rounded-full top-16 left-1/2 opacity-[0.06]"
            style={{ background: "var(--color-brand-light)" }}
          />
        </div>

        {/* White diagonal panel */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "var(--color-bg-page)",
            clipPath: "polygon(0 0, 62% 0, 50% 100%, 0 100%)",
          }}
        />

        {/* Left content */}
        <div className="relative z-[5] flex flex-col justify-between px-8 md:px-10 lg:px-14 py-10 lg:py-14 w-full max-w-[54%] min-h-[520px]">
          <div className="flex-1 flex flex-col justify-center">
            <motion.h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading">
              Powering the{" "}
              <Link
                to="/best-presale-crypto-token-in-india/"
                title="Best presale crypto token in India"
                className="no-underline"
              >
                <span style={{ color: "var(--color-brand-primary)" }}>
                  Crypto
                </span>
              </Link>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="leading-relaxed max-w-[340px] mb-7"
              style={{
                fontSize: "clamp(12px,1.4vw,14px)",
                color: "var(--color-text-secondary)",
              }}
            >
              Welcome to{" "}
              <Link to="/about" title="About Jaimax crypto token" className="no-underline">
                <strong style={{ color: "var(--color-brand-primary)", fontWeight: 600 }}>
                  Jaimax
                </strong>
              </Link>
              , designed for growth, transparency, and financial freedom. Built
              on powerful{" "}
              <Link
                to="/services"
                title="Jaimax blockchain services"
                className="no-underline"
                style={{ color: "var(--color-brand-primary)" }}
              >
                blockchain technology
              </Link>{" "}
              for the next generation of digital finance.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-3 flex-wrap mb-10"
            >
              {/* Get Started → /register */}
              <Link
                to="/register"
                title="Register on Jaimax - Start your crypto journey"
                className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 no-underline"
                style={{
                  background: "var(--color-brand-primary)",
                  color: "var(--color-text-on-dark)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--shadow-btn)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "none")
                }
              >
                Get Started Now <ArrowRight size={14} />
              </Link>

              {/* Learn More → /blog */}
              <Link
                to="/blog"
                title="Read Jaimax blog - Crypto insights and updates"
                className="flex items-center gap-2 text-[13px] font-semibold bg-transparent cursor-pointer transition-all duration-200 no-underline"
                style={{ color: "var(--color-brand-primary)" }}
              >
                <span
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: "1.5px solid var(--color-brand-primary)" }}
                >
                  <Phone size={12} style={{ color: "var(--color-brand-primary)" }} />
                </span>
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right image panel — dark side, linked to /about */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="absolute right-[3%] bottom-0 z-[4] flex items-end"
          style={{ height: "90%", width: "clamp(220px, 44%, 520px)" }}
        >
          <Link to="/about" title="Learn more about Jaimax" className="w-full h-full flex items-end">
            <img
              src={featureImage}
              alt="Jaimax Features"
              className="w-full h-[95%] lg:h-[110%] object-cover hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={featRef}
        className="px-4 sm:px-8 lg:px-14 py-16 lg:py-20"
        style={{
          background: "var(--color-bg-page)",
          borderTop: "1px solid var(--color-border-accent)",
        }}
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={featInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading">
            Core{" "}
            <Link to="/services" title="Jaimax functional features and services" className="no-underline">
              <span style={{ color: "var(--color-brand-primary)" }}>
                Functional Features
              </span>
            </Link>
          </h2>
          <p
            className="text-[14px] max-w-[480px] mx-auto leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Discover the powerful features that make{" "}
            <Link to="/about" title="About Jaimax" className="no-underline" style={{ color: "var(--color-brand-primary)" }}>
              Jaimax
            </Link>{" "}
            the perfect choice for your{" "}
            <Link
              to="/best-presale-crypto-coin-in-/"
              title="Crypto journey with Jaimax"
              className="no-underline"
              style={{ color: "var(--color-brand-primary)" }}
            >
              crypto journey
            </Link>
            .
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
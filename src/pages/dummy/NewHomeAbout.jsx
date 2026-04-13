

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  useGetRoundQuery,
  useGetHolderCountQuery,
} from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import bscscan from "../../assets/image.png";
import logo from "/green_logo.svg";
import { CreditCard, DollarSign, Heart, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion"; 

/* ─── Animation variants ───────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Reusable Stat Card ───────────────────── */
function StatCard({ label, tag, icon, value, loading, error, colorVar, onClick, link, isPrice }) {
  const inner = (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative cursor-pointer h-full rounded-[6px] overflow-hidden border border-[rgba(45,122,58,0.25)] bg-[linear-gradient(135deg,rgba(26,61,34,0.85),rgba(45,122,58,0.9))]
backdrop-blur-md p-3 sm:p-5 flex flex-col justify-between shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[var(--color-brand-accent)]/50"
    >
      {/* Top */}
      <div className="flex items-start justify-between mb-2 sm:mb-4">
        <div className="flex flex-col gap-1">
          <span
            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ color: `var(${colorVar})` }}
          >
            {label}
          </span>
          <div
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-[6px] bg-[var(--color-bg-overlay)] border border-[var(--color-brand-primary)]"
            style={{ color: `var(${colorVar})` }}
          >
            {icon}
          </div>
        </div>
        <span
          className="text-[9px] uppercase  px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[var(--color-brand-mid)] bg-[var(--color-bg-overlay)]"
          style={{ color: `var(${colorVar})` }}
        >
          {tag}
        </span>
      </div>

      {/* Value */}
      <div className="mt-auto">
        {loading ? (
          <div className="h-8 sm:h-10 w-20 sm:w-24 rounded-[6px] bg-white/10 animate-pulse" />
        ) : error ? (
          <span className="text-red-400 text-xs font-semibold">Failed to load</span>
        ) : (
          <div className="flex items-baseline gap-1">
            {isPrice && (
              <span className="text-lg sm:text-2xl font-black leading-none" style={{ color: `var(${colorVar})` }}>
                ₹
              </span>
            )}
            <span className="text-2xl sm:text-[38px] font-black leading-none tracking-tight text-[var(--color-text-on-dark)]">
              {value ?? "--"}
            </span>
          </div>
        )}
        {/* Animated accent bar */}
        <div
          className="mt-2 sm:mt-3 h-[2px] rounded-full w-1/3 group-hover:w-2/3 transition-all duration-500"
          style={{ background: `var(${colorVar})` }}
        />
      </div>

      {/* Corner glow */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: `var(${colorVar})` }}
      />
    </motion.div>
  );

  if (link) return <Link to={link} className="no-underline h-full block">{inner}</Link>;
  return inner;
}

/* ─── Main Component ───────────────────────── */
const NewHomeAbout = () => {
  const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
  const navigate = useNavigate(); 
  const [copied, setCopied] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();
  const {
    data: holderCount,
    error: holderError,
    isLoading: holderLoading,
    refetch: refetchHolder,
  } = useGetHolderCountQuery(contractAddress, { pollingInterval: 60000 });

  const liveRounds   = roundData?.data?.rounds?.filter((r) => r.status === 1) || [];
  const currentRound = liveRounds[0];

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/best-presale-crypto-coin-in-india', label: 'Presale' },
    { to: '/about', label: 'About' },
    { to: '/features', label: 'Features' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const authLinks = [
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];

  const legalLinks = [
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/terms-and-conditions', label: 'Terms & Conditions' },
    { to: '/refund-policy', label: 'Refund Policy' },
    { to: '/kyc-pmla', label: 'KYC/PMLA' },
    { to: '/aml-ctf', label: 'AML/CTF Policy' },
  ];

  const formatNumber = (num) => {
    if (!num && num !== 0) return null;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000)     return (num / 1_000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const livePrice    = currentRound?.atPriceInr || 0;
  const soldTokens   = currentRound?.soldQty ? formatNumber(currentRound.soldQty) : 0;
  const tokenHolders = holderCount ? formatNumber(holderCount) : 0;
  const liveMembers = currentRound?.totalMembers
  ? formatNumber(currentRound.totalMembers)
  : 2345;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  const handleBSCScan = () =>
    window.open(`https://bscscan.com/address/${contractAddress}`, "_blank");

  useEffect(() => {
    const id = setInterval(() => { refetch(); refetchHolder(); }, 30000);
    return () => clearInterval(id);
  }, [refetch, refetchHolder]);

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-overlay)] py-8 sm:py-14 px-3 sm:px-6 lg:px-8">

      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(45,122,58,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Centre radial bloom */}
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[520px] h-[280px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(45,122,58,0.20) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ── LOGO ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-6 sm:mb-10"
        >
          <Link to="/" title="Go to Home">
            <img
              src={logo}
              alt="Jaimax Logo"
              title="Jaimax brand new crypto in market"
              className="mx-auto object-contain drop-shadow-[0_4px_28px_rgba(45,122,58,0.35)] transition-transform duration-300 hover:scale-105"
              style={{ width: "min(200px, 55vw)" }}
            />
          </Link>
        </motion.div>

        {/* ── MAIN ASYMMETRIC GRID ── */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-3 sm:gap-5 items-stretch"
        >

          {/* ─── LEFT — CONTRACT ADDRESS ─── */}
          <motion.div variants={itemVariants}>
            <div
              className="h-full p-px rounded-[6px] animate-border-pulse shadow-[var(--shadow-card)]"
              style={{
                background: "linear-gradient(135deg, var(--color-brand-accent), var(--color-brand-primary), var(--color-brand-accent))",
              }}
            >
              <div className="h-full rounded-[5px] bg-[linear-gradient(135deg,rgba(26,61,34,0.85),rgba(45,122,58,0.65))]
backdrop-blur-md p-4 sm:p-6 flex flex-col gap-3 sm:gap-5">

                {/* Heading */}
                <div className="flex items-center gap-2 sm:gap-3 font-[var(--font-body)]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] flex items-center justify-center shrink-0 bg-[var(--color-bg-overlay)] border border-[var(--color-brand-primary)]">
                    <CreditCard size={18} className="text-[var(--color-brand-mid)]"/>
                  </div>
                  <div>
                    <p className="m-0 text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-bold text-[var(--color-brand-mid)]">
                      Smart Contract
                    </p>
                    <h3 className="m-0 text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] text-[var(--color-text-on-dark)]">
                      Contract <span className="text-[var(--color-brand-accent)]">Address</span>
                    </h3>
                  </div>
                </div>

                {/* Address box */}
                <div className="flex-1 rounded-[6px] px-3 sm:px-4 py-2.5 sm:py-3.5 bg-[rgba(15,36,20,0.5)] border border-[var(--color-border-accent)] transition-all duration-200 hover:border-[var(--color-brand-accent)]/60 hover:bg-black/40">
                  <p
                    className="m-0 font-mono break-all leading-relaxed text-[#d1fae5]/90"
                    style={{ fontSize: "clamp(9px, 2vw, 12.5px)" }}
                  >
                    {contractAddress}
                  </p>
                </div>

                {/* Network badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] text-[var(--color-brand-accent)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-accent)] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-brand-accent)]" />
                    </span>
                    BNB Smart Chain
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] text-[var(--color-text-muted)]">
                    BEP-20
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[100px] py-2 sm:py-2.5 rounded-[6px] text-[10px] sm:text-xs font-semibold uppercase text-white bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-mid)] transition-colors duration-200 shadow-[var(--shadow-btn)]"
                  >
                    {copied ? "✓ Copied!" : "Copy Address"}
                  </motion.button>

                  <motion.button
                    onClick={handleBSCScan}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-2.5 sm:px-3 py-2 rounded-[6px] border border-white/20 bg-white/8 hover:bg-white/15 transition-all duration-200 flex items-center justify-center"
                  >
                    <img src={bscscan} width={70} alt="BscScan" title="View on BscScan" className="block brightness-110 sm:w-[82px]" />
                  </motion.button>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT — STATS ─── */}
          <div className="flex flex-col gap-3 sm:gap-4">

            {/* Live Price — hero card */}
            <Link to="/best-presale-crypto-coin-in-india" className="no-underline">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-[6px] overflow-hidden border border-[var(--color-brand-accent)]/25 bg-[linear-gradient(135deg,rgba(26,61,34,0.85),rgba(45,122,58,0.9))]
backdrop-blur-md px-4 sm:px-6 py-4 sm:py-5 cursor-pointer shadow-[var(--shadow-card)] hover:border-[var(--color-brand-accent)]/55 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-brand-accent)] mb-2 sm:mb-3">
                    
                      <DollarSign size={14}/>
                      Live Price
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-3xl font-black leading-none text-[var(--color-brand-accent)]">₹</span>
                      {isLoading
                        ? <div className="h-9 sm:h-12 w-24 sm:w-32 rounded-[6px] bg-white/10 animate-pulse" />
                        : <span className="text-4xl sm:text-5xl font-black leading-none tracking-tight text-[var(--color-text-on-dark)]">
                            {livePrice || "0"}
                          </span>
                      }
                    </div>
                  </div>
                  <span className="text-[9px] uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[var(--color-brand-accent)] bg-[var(--color-bg-overlay)] text-[var(--color-brand-accent)]">
                    INR
                  </span>
                </div>
                {/* Animated bar */}
                <div className="mt-3 sm:mt-4 h-[2px] w-1/4 group-hover:w-1/2 rounded-full transition-all duration-500 bg-[var(--color-brand-accent)]" />
                {/* Glow */}
                <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none bg-[var(--color-brand-accent)]" />
              </motion.div>
            </Link>

            {/* Sold Tokens + Token Holders — 2 cols */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
              <StatCard
                label="Sold Tokens"
                tag="LIVE"
                colorVar="--color-brand-accent"
                value={soldTokens}
                loading={isLoading}
                error={!!error}
                link="/newfeatures"
                icon={
                  <PlusCircle size={14}/>
                }
              />

              <StatCard
                label="Token Holders"
                tag="BSC"
                colorVar="--color-brand-light"
                value={tokenHolders}
                loading={holderLoading}
                error={!!holderError}
                onClick={handleBSCScan}
                icon={
                  <Heart size={14}/>
                }
              />
            </div>

          </div>
          {/* ─── end right col ─── */}

        </motion.div>
        {/* ─── end main grid ─── */}

        {/* ── Live label ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-4 sm:mt-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]/40"
        >
          ● Live data · Refreshes every 30s
        </motion.p>

      </div>
    </section>
  );
};

export default NewHomeAbout;

import {
  ArrowLeft,
  ArrowRight,
  Home,
  Heart,
  Users,
  CreditCard,
  List,
  MessageSquare,
  Ban,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import BadgePill from "./BadgePill";
import { useNavigate } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const allLinks = [
  {
    icon: <Home className="w-5 h-5" />,
    title: "Platform Overview",
    desc: "Understand how Jaimax connects blockchain, payments, and digital applications into one unified system.",
    category: "Quick Links",
    route: "/",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Jaimax Ecosystem",
    desc: "Explore JMC Token, J-Wallet, JMC-24 Blockchain, DApps, Exchange, and Payment Gateway.",
    category: "Quick Links",
    route: "/best-presale-crypto-token-in-india",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Technology & Infrastructure",
    desc: "Learn about the scalable architecture, security mechanisms, and network design powering Jaimax.",
    category: "Quick Links",
    route: "/newabout",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Token Utility",
    desc: "See how JMC powers transactions, staking, rewards, and participation across the entire ecosystem.",
    category: "Quick Links",
    route: "/jaimax-whitepaper.pdf",
  },
  {
    icon: <List className="w-5 h-5" />,
    title: "Use Cases",
    desc: "Discover how Jaimax enables real-world applications across finance, gaming, education, tourism, and payments.",
    category: "Other Pages",
    route: "/newFeatures",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Security & Trust",
    desc: "Explore the systems that ensure secure, reliable, and transparent transactions across the ecosystem.",
    category: "Other Pages",
    route: "/aml-ctf",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Support",
    desc: "Get assistance with onboarding, wallet setup, and managing your experience on the Jaimax platform.",
    category: "Other Pages",
    route: "/contactPage",
  },
  {
    icon: <ArrowRight className="w-5 h-5" />,
    title: "Get Started",
    desc: "Join Jaimax and start exploring the ecosystem with simple, guided steps designed for easy onboarding.",
    category: "Other Pages",
    route: "/register",
  },
];

const quickLinks = allLinks.filter((l) => l.category === "Quick Links");
const otherPages = allLinks.filter((l) => l.category === "Other Pages");

// ─── Arrow icon ───────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

// ─── Desktop link card ────────────────────────────────────────────────────────

function LinkCard({ icon, title, desc, route }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
  if (route.endsWith(".pdf")) {
    window.open(route, "_blank"); 
  } else {
    navigate(route);
  }
}}
      className="
        group flex items-start gap-3 p-3 rounded-xl cursor-pointer
        transition-all duration-200
        hover:shadow-md hover:scale-[1.02]
      "
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--color-bg-overlay)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Icon bubble — brand-dark gradient */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))",
          color: "var(--color-text-on-dark)",
        }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </p>
        <p
          className="text-xs mt-0.5 leading-snug"
          style={{ color: "var(--color-text-muted)" }}
        >
          {desc}
        </p>
      </div>

      <ChevronRight />
    </div>
  );
}

// ─── Mobile carousel ──────────────────────────────────────────────────────────

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const n = allLinks.length;
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % n), 2600);
  };
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const prev = () => {
    setActive((p) => (p - 1 + n) % n);
    resetTimer();
  };
  const next = () => {
    setActive((p) => (p + 1) % n);
    resetTimer();
  };
  const goTo = (i) => {
    setActive(i);
    resetTimer();
  };

  const activeCard = allLinks[active];
  const CARD_W_PCT = 52;
  const CARD_H = 220;
  const OFFSET_PCT = 30;

  return (
    <div
      className="md:hidden flex flex-col"
      style={{ background: "var(--color-bg-page)" }}
    >
      <div className="text-center px-4 py-4">
          {/* Section label */}
          <BadgePill label="Navigate Jaimax" />

          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading">
            Everything You Need,{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              All in One Ecosystem.
            </span>
          </h2>
          <p
            className="text-sm max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Access every part of Jaimax from blockchain infrastructure to
            real-world applications all designed to work together seamlessly.
          </p>
        </div>
      {/* Hero strip — brand-dark gradient */}
      <div
        className="px-6 pt-12 pb-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-8 -right-8 w-36 h-36 rounded-full"
          style={{ background: "rgba(127,199,66,0.15)" }}
        />
        <div
          className="absolute bottom-4 -left-6 w-20 h-20 rounded-full"
          style={{ background: "rgba(127,199,66,0.10)" }}
        />

        <div className="relative z-10">
              {/* Heading */}
              <h3
                className="text-2xl font-bold leading-tight mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-dark)",
                }}
              >
                Jaimax — Powering Real-World Blockchain Applications
              </h3>

              {/* Sub */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Quick access to Jaimax tools, products, and infrastructure,
                everything built to simplify how you interact with blockchain.
              </p>
            </div>

        
      </div>

      {/* Carousel */}
      <div className="flex flex-col items-center py-8 px-4 w-full">
        {/* Stack */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ maxWidth: 360, height: CARD_H + 40 }}
        >
          {/* Glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)`,
              filter: "blur(40px)",
              opacity: 0.2,
            }}
          />

          {allLinks.map((card, i) => {
            let pos = i - active;
            if (pos > n / 2) pos -= n;
            if (pos < -n / 2) pos += n;
            const abs = Math.abs(pos);
            if (abs > 2) return null;

            const isCenter = pos === 0;
            const scale = isCenter ? 1 : abs === 1 ? 0.84 : 0.68;
            const txPct = pos * OFFSET_PCT;
            const tyPx = abs === 1 ? 16 : abs === 2 ? 28 : 0;
            const rotate = pos * -4;
            const opacity = abs === 2 ? 0.5 : 1;
            const zIndex = 10 - abs;

            return (
              <div
                key={card.title}
                onClick={() => {
  if (card.route.endsWith(".pdf")) {
    window.open(card.route, "_blank"); // open like navbar
  } else {
    navigate(card.route);
  }
}}
                className="cursor-pointer"
                style={{
                  position: "absolute",
                  top: 20,
                  left: `${50 - CARD_W_PCT / 2}%`,
                  width: `${CARD_W_PCT}%`,
                  height: CARD_H,
                  transform: `translateX(${txPct * (100 / CARD_W_PCT)}%) translateY(${tyPx}px) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex,
                  opacity,
                  transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",
                  willChange: "transform,opacity",
                }}
              >
                <div
                  className="w-full h-full rounded-2xl flex flex-col justify-between p-4 relative overflow-hidden"
                  style={{
                    background: isCenter
                      ? `linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))`
                      : "var(--color-bg-surface)",
                    border: isCenter
                      ? "none"
                      : `1px solid var(--color-border-accent)`,
                    boxShadow: isCenter
                      ? "0 20px 50px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(255,255,255,0.10)"
                      : "var(--shadow-card)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/10 rounded-2xl pointer-events-none" />

                  {/* Category badge */}
                  <div className="flex justify-between items-center relative z-10">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={
                        isCenter
                          ? {
                              background: "rgba(127,199,66,0.25)",
                              color: "var(--color-brand-accent)",
                            }
                          : {
                              background: "var(--color-bg-overlay)",
                              color: "var(--color-brand-primary)",
                            }
                      }
                    >
                      {card.category === "Quick Links" ? "Quick" : "Pages"}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <span
                        className="font-bold text-sm leading-none"
                        style={{
                          color: isCenter
                            ? "var(--color-text-on-dark)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {(7 + Math.sin(card.title.length) * 1.5).toFixed(1)}
                      </span>
                      <span className="text-yellow-400 text-xs">★</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center items-center relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={
                        isCenter
                          ? {
                              background: "rgba(255,255,255,0.18)",
                              color: "var(--color-text-on-dark)",
                            }
                          : {
                              background: "var(--color-bg-overlay)",
                              color: "var(--color-brand-primary)",
                            }
                      }
                    >
                      {card.icon}
                    </div>
                  </div>

                  {/* Title + desc */}
                  <div className="relative z-10">
                    <p
                      className="font-bold text-sm leading-snug"
                      style={{
                        color: isCenter
                          ? "var(--color-text-on-dark)"
                          : "var(--color-text-primary)",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="text-[10px] mt-0.5 line-clamp-2 leading-snug"
                      style={{
                        color: isCenter
                          ? "rgba(255,255,255,0.60)"
                          : "var(--color-text-muted)",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "var(--color-bg-surface)",
              border: `1px solid var(--color-border-accent)`,
              color: "var(--color-brand-primary)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <ArrowLeft size={14} />
          </button>

          <div className="flex gap-1.5">
            {allLinks.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full"
                style={{
                  width: i === active ? 22 : 7,
                  height: 7,
                  background:
                    i === active
                      ? "var(--color-brand-primary)"
                      : "var(--color-brand-light)",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "var(--color-brand-dark)",
              color: "var(--color-text-on-dark)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Active info pill */}
        <div
          className="mt-5 w-full rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            maxWidth: 360,
            background: "var(--color-bg-surface)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--color-brand-primary)",
              color: "var(--color-text-on-dark)",
            }}
          >
            {activeCard.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-bold truncate"
              style={{ color: "var(--color-text-primary)" }}
            >
              {activeCard.title}
            </p>
            <p
              className="text-[10px] leading-snug line-clamp-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {activeCard.desc}
            </p>
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{
                background: "var(--color-bg-overlay)",
                color: "var(--color-brand-primary)",
              }}
            >
              {activeCard.category}
            </span>
          </div>
          <ChevronRight />
        </div>

        {/* CTA */}
        <div className="flex justify-center">
            {/* CTA button */}
            <button
              className="relative z-10 text-sm font-semibold py-3 px-7 rounded-full mt-8 
             bg-[#111827] text-white 
             transition-all duration-300 ease-in-out 
             hover:bg-[--color-brand-mid] "
              onClick={() => navigate("/login")}
            >
              <span className="flex items-center gap-2">
                Enter Ecosystem
                {/* Lucide Arrow Right */}
                <ArrowRight size={14} />
              </span>
            </button>
            </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SecondSection() {
  const navigate = useNavigate();
  return (
    <div style={{ background: "var(--color-bg-page)" }}>
      {/* MOBILE */}
      <MobileCarousel />

      {/* DESKTOP */}
      <div className="hidden md:block px-4 sm:px-6 md:px-10 py-16">
        <div className="text-center mb-10">
          <BadgePill label="Navigate Jaimax" />

          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading">
            Everything You Need,{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              All in One Ecosystem.
            </span>
          </h2>

          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Access every part of Jaimax from blockchain infrastructure to
            real-world applications all designed to work together seamlessly.
          </p>
        </div>

        {/* ── Panel ── */}
        {/* <div
          className="rounded-[4px] overflow-hidden flex w-full flex-wrap"
          style={{ boxShadow: "var(--shadow-card)" }}
        > */}
        <div
  className="
    rounded-[4px] overflow-hidden w-full
    flex flex-col md:flex-col lg:flex-row
  "
  style={{ boxShadow: "var(--shadow-card)" }}
>
          {/* Left hero pillar — brand-dark gradient, same visual DNA as OurStory */}
          {/* <div
            className="text-white flex flex-col justify-between p-8 w-full max-w-[260px] shrink relative overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, var(--color-brand-dark) 0%, var(--color-brand-primary) 100%)",
            }}
          > */}
          <div
  className="
    text-white flex flex-col justify-between p-8 relative overflow-hidden
    w-full
    lg:max-w-[260px]
  "
  style={{
    background:
      "linear-gradient(160deg, var(--color-brand-dark) 0%, var(--color-brand-primary) 100%)",
  }}
>
            {/* Decorative circles */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
              style={{ background: "rgba(127,199,66,0.12)" }}
            />
            <div
              className="absolute bottom-20 -left-8 w-24 h-24 rounded-full"
              style={{ background: "rgba(127,199,66,0.08)" }}
            />

            <div className="relative z-10">
              {/* Heading */}
              <h3
                className="text-2xl font-bold leading-tight mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-dark)",
                }}
              >
                Jaimax — Powering Real-World Blockchain Applications
              </h3>

              {/* Sub */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Quick access to Jaimax tools, products, and infrastructure,
                everything built to simplify how you interact with blockchain.
              </p>
            </div>
            
            <div className="flex justify-center">
            {/* CTA button */}
            <button
              className="relative z-10 text-sm font-semibold py-3 px-7 rounded-full mt-8 
             bg-[#111827] text-white 
             transition-all duration-300 ease-in-out 
             hover:bg-[--color-brand-mid] "
              onClick={() => navigate("/login")}
            >
              <span className="flex items-center gap-2">
                Enter Ecosystem
                {/* Lucide Arrow Right */}
                <ArrowRight size={14} />
              </span>
            </button>
            </div>
          </div>

          {/* Right grid — white surface */}
          {/* <div
            className="flex-1 px-2 py-10 xl:p-8"
            style={{ background: "var(--color-bg-surface)" }}
          > */}
          <div
  className="
    w-full
    px-4 py-8
    md:px-6
    lg:flex-1 lg:p-8
  "
  style={{ background: "var(--color-bg-surface)" }}
>
            {/* <div className="grid grid-cols-2 lg:gap-x-6"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 lg:gap-x-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 px-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Quick Links
                </p>
                <div className="space-y-1">
                  {quickLinks.map((link) => (
                    <LinkCard key={link.title} {...link} />
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 px-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Other Pages
                </p>
                <div className="space-y-1">
                  {otherPages.map((link) => (
                    <LinkCard key={link.title} {...link} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useEffect, useState, useRef } from "react";
import jaicoins  from "../../assets/Images/jaicoins.svg";
import access    from "../../assets/Images/accessToprofit.svg";
import rocket2   from "../../assets/dummy/image.png";
import eye       from "../../assets/Images/eye.svg";
import image     from "../../assets/dummy/whatWeOfferSectionImage.png";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 0, col: "left",
    title: "Secure Crypto Wallet",
    icon: jaicoins, iconAlt: "Jaicoins wallet icon",
    description: "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
  },
  {
    id: 1, col: "right",
    title: "Funds Management",
    icon: eye, iconAlt: "Funds management icon",
    description: "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
  },
  {
    id: 2, col: "left",
    title: "Access to Profits",
    icon: access, iconAlt: "Access to profits icon",
    description: "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
  },
  {
    id: 3, col: "right",
    title: "Financial Growth",
    icon: rocket2, iconAlt: "Financial growth icon",
    description: "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
  },
];

// ─── Arc constants (computed geometry — must stay as literals) ─────────────────

const ARC_ANGLES = [210, 250, 290, 330];
const ARC_R      = 130;
const CX_ARC     = 170;
const CY_ARC     = 130;
const STAGE_W    = 340;
const STAGE_H    = 240;
const BUBBLE     = 46;

// ─── Desktop feature card ──────────────────────────────────────────────────────

function FeatureCard({ service, visible, delay }) {
  return (
    <div
      data-item-id={service.id}
      className="rounded-[4px] p-3.5 lg:p-5 flex flex-col gap-4 shadow-sm transition-all duration-[550ms] ease-out"
      style={{
        background: "var(--color-bg-page)",         /* pale mint — warm, on-brand */
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Icon bubble — brand-dark bg */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "var(--color-brand-dark)" }}
      >
        <img src={service.icon} alt={service.iconAlt} className="w-10 h-10 object-contain" />
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        <span className="font-bold" style={{ color: "var(--color-text-primary)" }}>
          {service.title}{" "}
        </span>
        {service.description}
      </p>
    </div>
  );
}

// ─── Mobile arc frame ──────────────────────────────────────────────────────────

function MobileCircleFrame({ services }) {
  const [active, setActive]  = useState(0);
  const touchStartX          = useRef(null);
  const N                    = services.length;

  const goTo = (i) => setActive(i);
  const next = ()  => setActive((p) => (p + 1) % N);
  const prev = ()  => setActive((p) => (p - 1 + N) % N);

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  }

  const s = services[active];

  function iconPos(i) {
    const rad = (ARC_ANGLES[i] * Math.PI) / 180;
    return { x: CX_ARC + ARC_R * Math.cos(rad), y: CY_ARC + ARC_R * Math.sin(rad) };
  }

  const startRad  = (200 * Math.PI) / 180;
  const endRad    = (340 * Math.PI) / 180;
  const sx        = CX_ARC + ARC_R * Math.cos(startRad);
  const sy        = CY_ARC + ARC_R * Math.sin(startRad);
  const ex        = CX_ARC + ARC_R * Math.cos(endRad);
  const ey        = CY_ARC + ARC_R * Math.sin(endRad);
  const activePos = iconPos(active);

  return (
    <div
      className="flex flex-col items-center w-full select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Arc stage */}
      <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>

        {/* SVG arc — inline coords are computed geometry, must stay inline */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={STAGE_W} height={STAGE_H}
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        >
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#1a3d22" stopOpacity="0.07" />
              <stop offset="50%"  stopColor="#1a3d22" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1a3d22" stopOpacity="0.07" />
            </linearGradient>
          </defs>

          {/* Dashed arc track */}
          <path
            d={`M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${ARC_R} ${ARC_R} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`}
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />

          {/* Connector line from active bubble to card */}
          <line
            x1={activePos.x.toFixed(1)}
            y1={(activePos.y + BUBBLE / 2).toFixed(1)}
            x2={CX_ARC}
            y2={CY_ARC + 28}
            stroke="#1a3d22"
            strokeOpacity="0.15"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>

        {/* Content card */}
        <div
          className="absolute w-full px-4"
          style={{ left: CX_ARC - 170, top: CY_ARC - 30 }}
        >
          <div
            key={active}
            className="rounded-[10px] overflow-hidden flex flex-col relative"
            style={{
              background: "var(--color-bg-page)",
              boxShadow: "0 4px 24px rgba(26,61,34,0.13)",
              animation: "wwoZoom 0.32s cubic-bezier(.22,1,.36,1) both",
            }}
          >
            {/* Watermark number */}
            <span
              className="absolute pointer-events-none select-none font-black right-[-4px] bottom-[-8px] text-[4.5rem] leading-none tracking-[-0.04em]"
              style={{ color: "var(--color-brand-dark)", opacity: 0.07 }}
            >
              {String(active + 1).padStart(2, "0")}
            </span>

            {/* Icon + title row */}
            <div
              className="flex items-center gap-2 px-3 pt-3 pb-2 relative z-10"
              style={{ borderBottom: "1px solid rgba(26,61,34,0.10)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "var(--color-brand-dark)" }}
              >
                <img src={s.icon} alt={s.iconAlt} className="w-5 h-5 object-contain" />
              </div>
              <span
                className="font-bold leading-tight text-sm"
                style={{ color: "var(--color-text-primary)" }}
              >
                {s.title}
              </span>
            </div>

            {/* Description */}
            <div className="px-3 py-2 relative z-10">
              <p
                className="leading-relaxed text-[13px]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {s.description}
              </p>
            </div>
          </div>
        </div>

        {/* Icon bubbles on arc — positions are computed geometry */}
        {services.map((svc, i) => {
          const pos      = iconPos(i);
          const isActive = i === active;
          return (
            <button
              key={svc.id}
              onClick={() => goTo(i)}
              className="absolute flex items-center justify-center rounded-full cursor-pointer transition-all duration-[280ms] ease-in-out"
              style={{
                left:      pos.x - BUBBLE / 2,
                top:       pos.y - BUBBLE / 2,
                width:     BUBBLE,
                height:    BUBBLE,
                background: "var(--color-bg-page)",
                border:    isActive
                  ? `2.5px solid var(--color-brand-accent)`
                  : `1.5px solid var(--color-border-accent)`,
                boxShadow: isActive
                  ? `0 0 0 5px rgba(127,199,66,0.22), 0 4px 16px rgba(26,61,34,0.22)`
                  : "0 2px 8px rgba(0,0,0,0.08)",
                zIndex:    isActive ? 4 : 3,
                transform: isActive ? "scale(1.12)" : "scale(1)",
              }}
            >
              <img
                src={svc.icon}
                alt={svc.iconAlt}
                className="object-contain transition-all duration-[280ms]"
                style={{ width: isActive ? 24 : 20, height: isActive ? 24 : 20 }}
              />
            </button>
          );
        })}
      </div>

      {/* Arrow nav + dots */}
      <div className="flex items-center justify-between w-full mt-2 px-2">
        <button
          onClick={prev}
          className="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer transition-all duration-200 active:scale-95"
          style={{
            background: "var(--color-bg-overlay)",
            border: `1px solid var(--color-border-accent)`,
          }}
        >
          <ArrowLeft className="w-3 h-3" style={{ color: "var(--color-brand-dark)" }} />
        </button>

        <div className="flex items-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full border-0 cursor-pointer p-0 transition-all duration-300 h-[7px]"
              style={{
                width:      i === active ? 22 : 7,
                background: i === active
                  ? "var(--color-brand-primary)"
                  : "var(--color-border-accent)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer transition-all duration-200 active:scale-95"
          style={{ background: "var(--color-brand-dark)" }}
        >
          <ArrowRight className="w-3 h-3" style={{ color: "var(--color-text-on-dark)" }} />
        </button>
      </div>

      <style>{`
        @keyframes wwoZoom {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function WhatWeOffer() {
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.itemId);
            setVisibleItems((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll("[data-item-id]").forEach((el) => observer.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const leftCards  = services.filter((s) => s.col === "left");
  const rightCards = services.filter((s) => s.col === "right");

  return (
   
    <section
      className="py-16 lg:py-20 overflow-hidden"
      style={{ background: "var(--color-bg-surface)", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div className="text-center mb-12 max-w-2xl mx-auto">

          {/* Badge — same pattern as HeroSection and SecondSection */}
          <div className="flex justify-center mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase border"
              style={{
                background: "var(--color-bg-overlay)",
                borderColor: "var(--color-border-accent)",
                color: "var(--color-brand-primary)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-brand-accent)" }}
              />
              Our Services
            </span>
          </div>

          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]"
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            What We{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Offer</span>
          </h2>

          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Explore our standout features designed to deliver exceptional
            performance and value, distinguishing us from the competition.
          </p>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-stretch">

          {/* Left cards */}
          <div className="flex flex-col justify-around gap-4">
            {leftCards.map((s, i) => (
              <FeatureCard
                key={s.id} service={s}
                visible={visibleItems.has(s.id)}
                delay={i * 120}
              />
            ))}
          </div>

          {/* Centre image */}
          <div
            className="flex items-center justify-center rounded-[4px] overflow-hidden w-60 lg:w-72 xl:w-96 min-h-80 xl:min-h-96"
            style={{
              background: "var(--color-bg-page)",
              border: `1px solid var(--color-border-accent)`,
            }}
          >
            <img
              src={image}
              className="w-full h-full object-cover scale-100 lg:scale-125"
              alt="What we offer"
            />
          </div>

          {/* Right cards */}
          <div className="flex flex-col justify-around gap-4">
            {rightCards.map((s, i) => (
              <FeatureCard
                key={s.id} service={s}
                visible={visibleItems.has(s.id)}
                delay={i * 120 + 60}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex sm:hidden justify-center">
          <MobileCircleFrame services={services} />
        </div>

      </div>
    </section>
  );
}
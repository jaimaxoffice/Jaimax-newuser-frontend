import React, { useState, useRef, useEffect } from "react";
import { CheckCircle, ShoppingCart, Lock, Zap, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const phaseData = [
  {
    status: "Completed",
    phaseNo: "Phase 1",
    phaseNum: "01",
    tokens: "10 Billion",
    tokenSuffix: "Tokens Distributed",
    price: "INR 0.01 – 0.04",
    priceSub: "Paisa per token",
    priceUSD: "0.00012 – 0.00044 USD",
  },
  {
    status: "Live",
    phaseNo: "Phase 2",
    phaseNum: "02",
    tokens: "20 Billion",
    tokenSuffix: "Tokens Available",
    price: "INR 0.05 – 0.50",
    priceSub: "Paisa per token",
    priceUSD: "0.00061 – 0.0061 USD",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 3",
    phaseNum: "03",
    tokens: "25 Billion",
    tokenSuffix: "Tokens Planned",
    price: "INR 0.60 – 1.53",
    priceSub: "Paisa per token",
    priceUSD: "0.0071 – 0.018 USD",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 4",
    phaseNum: "04",
    tokens: "30 Billion",
    tokenSuffix: "Tokens Planned",
    price: "INR 1.60 – 3.00",
    priceSub: "Paisa per token",
    priceUSD: "0.019 – 0.036 USD",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 5",
    phaseNum: "05",
    tokens: "25 Billion",
    tokenSuffix: "Tokens Planned",
    price: "INR 3.15 – 4.10",
    priceSub: "Paisa per token",
    priceUSD: "0.037 – 0.049 USD",
  },
];

/* ─────────────────────────────────────────────
   Constants for stagger layout
───────────────────────────────────────────── */
const CARD_W        = 268;
const CARD_H        = 320;
const CONNECTOR_W   = 80;
const STAGGER_Y     = 90;   // vertical offset between top/bottom rows
const TRACK_PAD_X   = 60;
const TRACK_H       = CARD_H + STAGGER_Y * 2 + 40; // total track height

/* ─────────────────────────────────────────────
   Status indicator
───────────────────────────────────────────── */
function StatusIndicator({ status }) {
  if (status === "Completed") return (
    <div className="flex items-center gap-1.5">
      <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: "#C9A96A" }} />
      <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(201,169,106,0.8)" }}>
        Completed
      </span>
    </div>
  );
  if (status === "Live") return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "#4ade80" }} />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#22c55e" }} />
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "#4ade80" }}>
        Live Now
      </span>
    </div>
  );
  return (
    <div className="flex items-center gap-1.5">
      <Lock className="w-3 h-3 flex-shrink-0" style={{ color: "rgba(249,249,249,0.2)" }} />
      <span className="text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(249,249,249,0.2)" }}>
        Locked
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Phase Card
───────────────────────────────────────────── */
function PhaseCard({ item, isHovered, visible, onHover, onLeave, onBuy, animDelay }) {
  const isLive      = item.status === "Live";
  const isCompleted = item.status === "Completed";
  const isUpcoming  = item.status === "Upcoming";

  /* — per-state design tokens — */
  const cardBg = isLive
    ? "linear-gradient(160deg, #1C4268 0%, #1E5280 40%, #2070AA 100%)"
    : isCompleted
    ? "linear-gradient(160deg, #1C3B58 0%, #274E6C 55%, #355E7E 100%)"
    : "linear-gradient(160deg, #18304A 0%, #1C3852 100%)";

  const topBarBg = isLive
    ? "#22c55e"
    : isCompleted
    ? "#C9A96A"
    : "rgba(107,135,164,0.25)";

  const borderCol = isLive
    ? "rgba(32,112,170,0.65)"
    : isCompleted
    ? "rgba(201,169,106,0.3)"
    : "rgba(107,135,164,0.14)";

  const hoverShadow = isLive
    ? "0 0 0 1.5px rgba(32,112,170,0.55), 0 28px 56px rgba(21,56,90,0.85), 0 0 40px rgba(32,112,170,0.2)"
    : "0 28px 56px rgba(21,56,90,0.85), 0 4px 20px rgba(21,56,90,0.6)";

  const idleShadow = isLive
    ? "0 0 0 1px rgba(32,112,170,0.3), 0 8px 28px rgba(21,56,90,0.65)"
    : "0 6px 24px rgba(21,56,90,0.5)";

  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        opacity: visible ? 1 : 0,
        transform: visible
          ? isHovered ? "translateY(-10px) scale(1.01)" : "translateY(0) scale(1)"
          : "translateY(20px) scale(0.97)",
        transition: `opacity 0.5s ease ${animDelay}ms, transform 0.38s cubic-bezier(0.22,1,0.36,1)`,
        flexShrink: 0,
        position: "relative",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <article
        className="relative overflow-hidden rounded-2xl flex flex-col"
        style={{
          width: "100%",
          height: "100%",
          background: cardBg,
          border: `1px solid ${borderCol}`,
          borderTop: isCompleted
            ? "1px solid rgba(201,169,106,0.2)"
            : "1px solid rgba(255,255,255,0.09)",
          boxShadow: isHovered ? hoverShadow : idleShadow,
          transition: "box-shadow 0.38s ease",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, background: topBarBg, flexShrink: 0 }} />

        {/* Ghost numeral */}
        <span
          className="absolute select-none pointer-events-none font-black tabular-nums leading-none"
          style={{
            fontSize: "7rem",
            letterSpacing: "-0.05em",
            right: 6,
            bottom: -8,
            color: isLive
              ? "rgba(32,112,170,0.2)"
              : isCompleted
              ? "rgba(201,169,106,0.1)"
              : "rgba(255,255,255,0.04)",
          }}
        >
          {item.phaseNum}
        </span>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 relative z-10">

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-col gap-1">
              <span
                className="text-[9px] font-black uppercase tracking-[0.3em]"
                style={{
                  color: isLive
                    ? "rgba(100,185,230,0.55)"
                    : isCompleted
                    ? "rgba(201,169,106,0.5)"
                    : "rgba(249,249,249,0.18)",
                }}
              >
                {item.phaseNo}
              </span>
              <StatusIndicator status={item.status} />
            </div>

            {/* Icon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: isLive
                  ? "rgba(32,112,170,0.35)"
                  : isCompleted
                  ? "rgba(201,169,106,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: isLive
                  ? "1px solid rgba(32,112,170,0.5)"
                  : isCompleted
                  ? "1px solid rgba(201,169,106,0.3)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {isUpcoming  ? <Lock       className="w-3.5 h-3.5" style={{ color: "rgba(249,249,249,0.18)" }} /> :
               isLive      ? <Zap        className="w-3.5 h-3.5 text-white/80" /> :
                             <TrendingUp className="w-3.5 h-3.5" style={{ color: "rgba(201,169,106,0.7)" }} />}
            </div>
          </div>

          {/* Divider */}
          <div
            className="mb-4"
            style={{
              height: 1,
              background: isCompleted
                ? "linear-gradient(90deg, rgba(201,169,106,0.2) 0%, transparent 80%)"
                : "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 80%)",
            }}
          />

          {/* Body — blurred for upcoming */}
          <div
            className="flex flex-col flex-1"
            style={{
              filter:        isUpcoming ? "blur(6px)" : "none",
              pointerEvents: isUpcoming ? "none"      : "auto",
              userSelect:    isUpcoming ? "none"      : "auto",
              transition: "filter 0.3s ease",
            }}
          >
            {/* Token count */}
            <p
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: "1.95rem",
                color: isCompleted ? "rgba(231,206,156,0.88)" : "#F9F9F9",
              }}
            >
              {item.tokens}
            </p>
            <p
              className="mt-0.5 mb-4 text-[8.5px] uppercase tracking-[0.24em]"
              style={{ color: "rgba(249,249,249,0.28)" }}
            >
              {item.tokenSuffix}
            </p>

            {/* Price block */}
            <div
              className="rounded-lg px-3.5 py-2.5 mb-4"
              style={{
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] mb-0.5" style={{ color: "rgba(249,249,249,0.27)" }}>
                    Price Range
                  </p>
                  <p className="text-[13px] font-bold text-white leading-snug">{item.price}</p>
                  <p className="text-[8.5px] mt-0.5" style={{ color: "rgba(249,249,249,0.32)" }}>{item.priceSub}</p>
                </div>
                <p className="text-[10px] font-semibold text-right flex-shrink-0" style={{ color: "rgba(231,206,156,0.68)" }}>
                  {item.priceUSD}
                </p>
              </div>
            </div>

            {/* CTA */}
            {isLive ? (
              <button
                onClick={onBuy}
                className="w-full mt-auto py-2.5 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #EDD9A8 0%, #E7CE9C 50%, #D4B87A 100%)",
                  color: "#111",
                  border: "1px solid rgba(201,169,106,0.7)",
                  boxShadow: "0 3px 18px rgba(231,206,156,0.35)",
                  letterSpacing: "0.06em",
                }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Buy Now
              </button>
            ) : isCompleted ? (
              <div className="flex items-center gap-2.5 mt-auto">
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(201,169,106,0.25) 0%, transparent 100%)" }} />
                <span className="text-[8.5px] font-bold uppercase tracking-[0.28em] whitespace-nowrap" style={{ color: "rgba(201,169,106,0.38)" }}>
                  Sale Ended
                </span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(201,169,106,0.25) 100%)" }} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Upcoming lock overlay */}
        {isUpcoming && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl pointer-events-none"
            style={{ zIndex: 20 }}
          >
            <div
              className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-xl"
              style={{
                background: "rgba(18,44,68,0.72)",
                border: "1px solid rgba(107,135,164,0.18)",
              }}
            >
              <Lock className="w-4 h-4" style={{ color: "rgba(249,249,249,0.28)" }} />
              <span className="text-[8.5px] font-bold uppercase tracking-[0.28em]" style={{ color: "rgba(249,249,249,0.26)" }}>
                Coming Soon
              </span>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG track drawn behind all cards —
   one continuous path with dots at card centres
───────────────────────────────────────────── */
function TrackSVG({ positions, trackW }) {
  if (positions.length < 2) return null;

  // Build smooth path through all card centre-bottom / centre-top points
  const pts = positions.map((p) => ({
    x: p.cx,
    y: p.row === 0 ? p.cy + CARD_H * 0.5 + 8 : p.cy - CARD_H * 0.5 - 8,
  }));

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={trackW}
      height={TRACK_H}
      style={{ top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(201,169,106,0.55)" />
          <stop offset="40%"  stopColor="rgba(40,131,194,0.65)"  />
          <stop offset="100%" stopColor="rgba(107,135,164,0.25)" />
        </linearGradient>
        <marker id="trackDot" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <circle cx="2.5" cy="2.5" r="2" fill="rgba(107,135,164,0.7)" />
        </marker>
      </defs>

      {/* Track path */}
      <path
        d={d}
        fill="none"
        stroke="url(#trackGrad)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        opacity="0.6"
      />

      {/* Dot at each card connection point */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="rgba(107,135,164,0.5)" />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function GrowthPlanTimeline() {
  const navigate   = useNavigate();
  const scrollRef  = useRef(null);
  const [hovered, setHovered]   = useState(null);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* Scroll helpers */
  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  /* Compute card positions for SVG track */
  const unitW  = CARD_W + CONNECTOR_W;
  const trackW = TRACK_PAD_X * 2 + unitW * phaseData.length - CONNECTOR_W;

  const positions = phaseData.map((_, idx) => {
    const row = idx % 2; // 0 = top, 1 = bottom
    const cx  = TRACK_PAD_X + idx * unitW + CARD_W / 2;
    const cy  = STAGGER_Y + row * STAGGER_Y + CARD_H / 2;
    return { cx, cy, row };
  });

  return (
    <section
      className="py-20 font-sans text-white"
      style={{
        background: "linear-gradient(160deg, #15385A 0%, #31628A 35%, #1B3D62 61%)",
        minHeight: "100vh",
      }}
    >
      {/* ── Heading ── */}
      <div className="text-center mb-16 px-6">
        <span
          className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.35em] px-4 py-1.5 rounded-full mb-5"
          style={{
            color: "#E7CE9C",
            background: "rgba(231,206,156,0.07)",
            border: "1px solid rgba(231,206,156,0.18)",
          }}
        >
          Roadmap
        </span>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight text-white mt-1"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Company's Growth Plan
        </h2>
        <p
          className="mt-3 text-sm max-w-xs mx-auto leading-relaxed"
          style={{
            color: "rgba(249,249,249,0.38)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.15s",
          }}
        >
          Five strategic phases driving token distribution and platform growth.
        </p>
      </div>

      {/* ── Scroll nav + hint ── */}
      <div className="flex items-center justify-between px-10 mb-2">
        <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "rgba(249,249,249,0.2)" }}>
          Scroll to explore →
        </p>
        <div className="flex gap-2">
          {[{ dir: "left", Icon: ChevronLeft }, { dir: "right", Icon: ChevronRight }].map(({ dir, Icon }) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(107,135,164,0.25)",
                color: "rgba(249,249,249,0.45)",
              }}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Horizontal scroll track ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-visible"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 16,
        }}
      >
        {/* Inner fixed-width canvas */}
        <div
          className="relative"
          style={{
            width: trackW,
            height: TRACK_H,
            minWidth: "100%",
          }}
        >
          {/* SVG connecting path */}
          <TrackSVG positions={positions} trackW={trackW} />

          {/* Cards placed absolutely */}
          {phaseData.map((item, idx) => {
            const pos    = positions[idx];
            const cardTop = pos.cy - CARD_H / 2;
            const cardLeft = pos.cx - CARD_W / 2;

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: cardTop,
                  left: cardLeft,
                }}
              >
                <PhaseCard
                  item={item}
                  isHovered={hovered === idx}
                  visible={visible}
                  animDelay={idx * 90}
                  onHover={() => setHovered(idx)}
                  onLeave={() => setHovered(null)}
                  onBuy={() => item.status === "Live" && navigate("/register")}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Phase progress dots ── */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {phaseData.map((item, idx) => (
          <div
            key={idx}
            style={{
              height: 3,
              width: item.status === "Live" ? 24 : 10,
              borderRadius: 9999,
              background:
                item.status === "Completed"
                  ? "rgba(201,169,106,0.6)"
                  : item.status === "Live"
                  ? "#E7CE9C"
                  : "rgba(255,255,255,0.12)",
              transition: "width 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
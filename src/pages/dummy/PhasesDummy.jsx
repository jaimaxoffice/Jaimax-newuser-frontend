import React, { useRef, useState, useEffect } from "react";
import { CheckCircle, Clock, Monitor, Rocket, BarChart2, Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const phaseData = [
  {
    status: "Completed",
    phaseNo: "Phase 1",
    tokens: "10 Billion Tokens",
    priceINR: "INR 0.01 – 0.04 Paisa",
    priceUSD: "0.00012 – 0.00044 USD",
    button: "Sale Completed",
    icon: Monitor,
    desc: "Foundational launch. Early adopter rates at the lowest price in the roadmap.",
  },
  {
    status: "Live",
    phaseNo: "Phase 2",
    tokens: "20 Billion Tokens",
    priceINR: "INR 0.05 – 0.50 Paisa",
    priceUSD: "0.00061 – 0.0061 USD",
    button: "Buy Now",
    icon: Rocket,
    desc: "Active growth phase — live now. Purchase before prices rise in Phase 3.",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 3",
    tokens: "25 Billion Tokens",
    priceINR: "INR 0.60 – 1.53 Paisa",
    priceUSD: "0.0071 – 0.018 USD",
    button: "Coming Soon",
    icon: BarChart2,
    desc: "Expansion phase with increased supply and wider market access.",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 4",
    tokens: "30 Billion Tokens",
    priceINR: "INR 1.60 – 3.00 Paisa",
    priceUSD: "0.019 – 0.036 USD",
    button: "Coming Soon",
    icon: Search,
    desc: "Scale phase targeting institutional and enterprise distribution.",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 5",
    tokens: "25 Billion Tokens",
    priceINR: "INR 3.15 – 4.10 Paisa",
    priceUSD: "0.037 – 0.049 USD",
    button: "Coming Soon",
    icon: Star,
    desc: "Final phase completing supply distribution at peak valuation.",
  },
];

/* ─────────────────────────────────────────────
   ARROW CONNECTOR
───────────────────────────────────────────── */
function ArrowConnector({ gold }) {
  return (
    <div style={styles.arrWrap}>
      <div style={{ ...styles.arrLineV, ...(gold ? styles.arrLineVGold : {}) }} />
      <div style={{ ...styles.arrLineH, ...(gold ? styles.arrLineHGold : {}) }} />
      <div style={{ ...styles.arrHead, ...(gold ? styles.arrHeadGold : {}) }} />
      <span style={{ ...styles.arrLabel, ...(gold ? styles.arrLabelGold : {}) }}>Next</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SINGLE PHASE CARD
───────────────────────────────────────────── */
function PhaseCard({ item, index, cardRef, onBuyNow }) {
  const [hovered, setHovered] = useState(false);
  const isLive = item.status === "Live";
  const isCompleted = item.status === "Completed";
  const isUpcoming = item.status === "Upcoming";
  const Icon = item.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      style={{
        ...styles.cw,
        ...(hovered ? styles.cwHovered : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Live banner */}
      {isLive && <div style={styles.liveBanner}>● Current Phase</div>}

      {/* Tilted slab */}
      <div
        style={{
          ...styles.slab,
          ...slabColors[index],
          ...(isLive ? styles.slabLive : {}),
          ...(hovered ? styles.slabHovered : {}),
        }}
      />

      {/* Card face */}
      <div
        style={{
          ...styles.card,
          ...(isLive ? styles.cardLive : {}),
          ...(hovered ? styles.cardHovered : {}),
        }}
      >
        {/* Shimmer overlay */}
        <div style={styles.cardShimmer} />

        {/* Icon */}
        <div style={{ ...styles.iconBox, ...(isLive ? styles.iconBoxLive : {}) }}>
          <Icon
            size={16}
            strokeWidth={1.5}
            color={isLive ? "#E7CE9C" : "rgba(249,249,249,0.45)"}
          />
        </div>

        {/* Phase tag */}
        <span style={{ ...styles.phaseTag, ...(isLive ? styles.phaseTagLive : {}) }}>
          {item.phaseNo}
        </span>

        {/* Token title */}
        <p style={styles.cardTitle}>{item.tokens.replace(" Tokens", "")}<br />Tokens</p>

        {/* Description */}
        <p style={{ ...styles.cardDesc, ...(isLive ? styles.cardDescLive : {}) }}>
          {item.desc}
        </p>

        <div style={{ ...styles.hdiv, ...(isLive ? styles.hdivLive : {}) }} />

        {/* Price chip — blurred if upcoming */}
        <div style={isUpcoming ? styles.blurred : {}}>
          <div style={{ ...styles.priceChip, ...(isLive ? styles.priceChipLive : {}) }}>
            <p style={styles.priceLabel}>Price Range</p>
            <p style={{ ...styles.priceINR, ...(isLive ? styles.priceINRLive : {}) }}>
              {item.priceINR}
            </p>
            <p style={styles.priceUSD}>{item.priceUSD}</p>
          </div>
        </div>

        {/* Footer: pill + number */}
        <div style={styles.footer}>
          {isCompleted && (
            <span style={{ ...styles.pill, ...styles.pillDone }}>✓ Completed</span>
          )}
          {isLive && (
            <span style={{ ...styles.pill, ...styles.pillLive }}>
              <span style={styles.blink} />
              Live Now
            </span>
          )}
          {isUpcoming && (
            <span style={{ ...styles.pill, ...styles.pillSoon }}>Upcoming</span>
          )}

          {/* Number badge */}
          <div
            style={{
              ...styles.numBadge,
              ...numColors[index],
              ...(isLive ? styles.numBadgeLive : {}),
            }}
          >
            {num}
          </div>
        </div>

        {/* Button */}
        {isLive && (
          <button
            style={styles.btnBuy}
            onClick={() => onBuyNow(item)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(231,206,156,0.07)";
              e.currentTarget.style.borderColor = "rgba(231,206,156,0.7)";
              e.currentTarget.style.color = "#f0deb0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(231,206,156,0.45)";
              e.currentTarget.style.color = "#E7CE9C";
            }}
          >
            Buy Now
          </button>
        )}
        {isCompleted && (
          <button style={styles.btnDone} disabled>
            Sale Completed
          </button>
        )}
        {isUpcoming && (
          <button style={styles.btnSoon} disabled>
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function GrowthPlanTimeline2() {
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  // Auto-scroll to live card on mount
  useEffect(() => {
    const liveIndex = phaseData.findIndex((p) => p.status === "Live");
    if (cardRefs.current[liveIndex]) {
      cardRefs.current[liveIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  const handleBuyNow = (item) => {
    if (item.status === "Live") navigate("/register");
  };

  return (
    <section style={styles.section}>
      {/* Heading */}
      <div style={styles.head}>
        <p style={styles.eyebrow}>Token Distribution Roadmap</p>
        <h2 style={styles.title}>Company's Growth Plan Outlook</h2>
        <p style={styles.sub}>5 phases · 110 billion tokens · Strategic expansion</p>
      </div>

      {/* Timeline row */}
      <div style={styles.timeline}>
        {phaseData.map((item, idx) => (
          <React.Fragment key={idx}>
            <PhaseCard
              item={item}
              index={idx}
              cardRef={(el) => (cardRefs.current[idx] = el)}
              onBuyNow={handleBuyNow}
            />
            {idx < phaseData.length - 1 && (
              <ArrowConnector gold={item.status === "Live" || phaseData[idx + 1].status === "Live"} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Blink keyframe injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes gpt-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        @keyframes gpt-fadeUp {
          from { opacity: 0; transform: translateY(18px) scale(0.95); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STYLES  (all values from theme.css tokens)
───────────────────────────────────────────── */
const styles = {
  section: {
    background: "linear-gradient(160deg, #15385A 0%, #31628A 35%, #1B3D62 61%)",
    fontFamily: "'DM Sans', sans-serif",
    color: "#F9F9F9",
    padding: "48px 16px 64px",
    minHeight: "100%",
  },

  /* Heading */
  head: { textAlign: "center", marginBottom: 48 },
  eyebrow: {
    fontSize: 10, fontWeight: 600, letterSpacing: "0.22em",
    textTransform: "uppercase", color: "#E7CE9C", opacity: 0.65, marginBottom: 10,
  },
  title: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
    fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.1, color: "#F9F9F9",
  },
  sub: { fontSize: "0.8rem", color: "rgba(249,249,249,0.3)", marginTop: 8, fontWeight: 300 },

  /* Timeline row */
  timeline: {
    display: "flex", alignItems: "flex-start",
    overflowX: "auto", scrollSnapType: "x mandatory",
    scrollbarWidth: "none", padding: "22px 8px 32px", gap: "35px",
    WebkitOverflowScrolling: "touch",
  },

  /* Arrow */
  arrWrap: {
    flexShrink: 0, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    width: 44, paddingTop: 60,
  },
  arrLineV: { width: 1, height: 16, background: "rgba(107,135,164,0.3)" },
  arrLineVGold: { background: "rgba(231,206,156,0.35)" },
  arrLineH: { height: 1, width: 24, background: "rgba(107,135,164,0.3)" },
  arrLineHGold: { background: "rgba(231,206,156,0.35)" },
  arrHead: {
    width: 0, height: 0,
    borderTop: "4px solid transparent", borderBottom: "4px solid transparent",
    borderLeft: "7px solid rgba(107,135,164,0.4)",
  },
  arrHeadGold: { borderLeftColor: "rgba(231,206,156,0.5)" },
  arrLabel: {
    fontSize: 8, fontWeight: 500, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "rgba(249,249,249,0.18)",
    marginTop: 5, whiteSpace: "nowrap",
  },
  arrLabelGold: { color: "rgba(231,206,156,0.4)" },

  /* Card wrapper */
  cw: {
    flexShrink: 0, scrollSnapAlign: "center",
    width: 200, position: "relative",
    paddingTop: 14, paddingRight: 14,
    animation: "gpt-fadeUp 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
    transition: "transform 0.3s",
  },
  cwHovered: {},

  /* Slab */
  slab: {
    position: "absolute", top: 0, right: 0,
    width: "calc(100% - 6px)", height: "calc(100% - 6px)",
    borderRadius: 18,
    transform: "rotate(4.5deg)", transformOrigin: "bottom right",
    zIndex: 0,
    transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
  },
  slabHovered: { transform: "rotate(7deg) scale(1.02)" },
  slabLive: {
    background: "linear-gradient(135deg, #E7CE9C, #C9A96A)",
    boxShadow: "0 0 20px rgba(231,206,156,0.2)",
  },

  /* Card face */
  card: {
    position: "relative", zIndex: 1, borderRadius: 18,
    background: "#245078",
    border: "1px solid rgba(255,255,255,0.06)",
    borderTop: "1px solid rgba(255,255,255,0.11)",
    padding: "20px 18px 18px",
    display: "flex", flexDirection: "column", gap: 11,
    minHeight: 310,
    boxShadow: "0 4px 18px rgba(13,28,46,0.4)",
    transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s",
    overflow: "hidden",
  },
  cardHovered: { transform: "translateY(-4px)", boxShadow: "0 12px 30px rgba(13,28,46,0.5)" },
  cardLive: {
    background: "linear-gradient(135deg, #215988, #2883C2)",
    border: "1.5px solid rgba(231,206,156,0.28)",
    borderTop: "1.5px solid rgba(231,206,156,0.45)",
    boxShadow: "0 0 0 3px rgba(231,206,156,0.07), 0 8px 28px rgba(21,56,90,0.5)",
  },
  cardShimmer: {
    position: "absolute", inset: 0, borderRadius: 18,
    background: "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
    pointerEvents: "none",
  },

  /* Live banner */
  liveBanner: {
    position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #E7CE9C, #D4B87A)",
    color: "#12243a",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 8.5, fontWeight: 700, letterSpacing: "0.15em",
    textTransform: "uppercase", padding: "3px 13px", borderRadius: 99,
    whiteSpace: "nowrap", zIndex: 3,
    boxShadow: "0 2px 10px rgba(231,206,156,0.28)",
  },

  /* Icon */
  iconBox: {
    width: 36, height: 36, borderRadius: 8,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  iconBoxLive: {
    background: "rgba(231,206,156,0.1)",
    border: "1px solid rgba(231,206,156,0.22)",
  },

  /* Text */
  phaseTag: {
    fontSize: 9, fontWeight: 600, letterSpacing: "0.15em",
    textTransform: "uppercase", color: "rgba(249,249,249,0.26)",
  },
  phaseTagLive: { color: "rgba(231,206,156,0.55)" },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.2, letterSpacing: "0.01em",
    color: "#F9F9F9",
  },
  cardDesc: { fontSize: 11, color: "rgba(249,249,249,0.36)", lineHeight: 1.65, fontWeight: 300, flex: 1 },
  cardDescLive: { color: "rgba(249,249,249,0.55)" },
  hdiv: { height: 1, background: "rgba(255,255,255,0.07)" },
  hdivLive: { background: "rgba(231,206,156,0.1)" },

  /* Price */
  priceChip: {
    background: "rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: 8, padding: "8px 10px",
  },
  priceChipLive: { borderColor: "rgba(231,206,156,0.1)" },
  priceLabel: {
    fontSize: 8.5, fontWeight: 600, letterSpacing: "0.11em",
    textTransform: "uppercase", color: "rgba(249,249,249,0.22)", marginBottom: 3,
  },
  priceINR: { fontSize: 10.5, color: "rgba(249,249,249,0.62)" },
  priceINRLive: { color: "rgba(249,249,249,0.82)" },
  priceUSD: { fontSize: 9.5, color: "rgba(249,249,249,0.26)", marginTop: 1 },
  blurred: { filter: "blur(4px)", pointerEvents: "none", userSelect: "none" },

  /* Footer */
  footer: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 },

  /* Pills */
  pill: { fontSize: 8.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 99 },
  pillDone: { background: "rgba(107,135,164,0.12)", color: "rgba(249,249,249,0.38)", border: "1px solid rgba(107,135,164,0.18)" },
  pillLive: {
    background: "rgba(231,206,156,0.12)", color: "#E7CE9C",
    border: "1px solid rgba(231,206,156,0.28)",
    display: "flex", alignItems: "center", gap: 4,
  },
  pillSoon: { background: "rgba(107,135,164,0.07)", color: "rgba(249,249,249,0.2)", border: "1px solid rgba(107,135,164,0.1)" },
  blink: {
    width: 4, height: 4, borderRadius: "50%", background: "#E7CE9C",
    animation: "gpt-blink 2s ease-in-out infinite",
    display: "inline-block",
  },

  /* Number badges */
  numBadge: {
    width: 34, height: 34, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11.5, fontWeight: 700, flexShrink: 0,
    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
  },
  numBadgeLive: {
    background: "linear-gradient(135deg, #E7CE9C, #D4B87A)",
    color: "#12243a", border: "none",
    boxShadow: "0 0 0 3px rgba(231,206,156,0.15), 0 3px 12px rgba(231,206,156,0.25)",
  },

  /* Buttons — slim, elegant, Cormorant serif */
  btnBuy: {
    width: "100%", padding: "8px 0", borderRadius: 6,
    background: "transparent",
    border: "1px solid rgba(231,206,156,0.45)",
    color: "#E7CE9C",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13, fontWeight: 600,
    letterSpacing: "0.12em", textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  },
  btnDone: {
    width: "100%", padding: "8px 0", borderRadius: 6,
    background: "transparent",
    border: "1px solid rgba(107,135,164,0.15)",
    color: "rgba(249,249,249,0.22)",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13, fontWeight: 500,
    letterSpacing: "0.1em", textTransform: "uppercase", cursor: "not-allowed",
  },
  btnSoon: {
    width: "100%", padding: "8px 0", borderRadius: 6,
    background: "transparent",
    border: "1px solid rgba(107,135,164,0.1)",
    color: "rgba(249,249,249,0.16)",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13, fontWeight: 500,
    letterSpacing: "0.1em", textTransform: "uppercase", cursor: "not-allowed",
  },
};

/* Per-index slab background colors (all from theme blue-steel palette) */
const slabColors = [
  { background: "linear-gradient(135deg, #1D426B, #3B5B82)" },
  { background: "linear-gradient(135deg, #215988, #2883C2)" },
  { background: "linear-gradient(135deg, #245078, #4A8AC4)" },
  { background: "linear-gradient(135deg, #2C5F89, #6B87A4)" },
  { background: "linear-gradient(135deg, #31628A, #5A7FA0)" },
];

/* Per-index number badge colors */
const numColors = [
  { background: "linear-gradient(135deg, #1D426B, #3B5B82)", color: "rgba(249,249,249,0.55)", border: "1px solid rgba(107,135,164,0.25)" },
  { background: "linear-gradient(135deg, #215988, #2883C2)", color: "rgba(249,249,249,0.65)", border: "1px solid rgba(40,131,194,0.25)" },
  { background: "linear-gradient(135deg, #245078, #4A8AC4)", color: "rgba(249,249,249,0.65)", border: "1px solid rgba(74,138,196,0.25)" },
  { background: "linear-gradient(135deg, #2C5F89, #6B87A4)", color: "rgba(249,249,249,0.65)", border: "1px solid rgba(107,135,164,0.25)" },
  { background: "linear-gradient(135deg, #31628A, #5A7FA0)", color: "rgba(249,249,249,0.65)", border: "1px solid rgba(107,135,164,0.25)" },
];
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.webp"

const CURRENT_PRICE = 0.10;

// Set dates so sale is currently ACTIVE (between start and end)
const SALE_START = new Date("2026-03-25T00:00:00").getTime(); // Past date
const SALE_END = new Date("2026-04-02T00:00:00").getTime();   // Future date

/* ── Circular Progress Timer ── */
function CircularTimer({ total, remaining, saleStatus }) {
  const SIZE = 72;
  const STROKE = 5;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC - (remaining / total) * CIRC;

  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bbcf28" />
            <stop offset="100%" stopColor="#18a14a" />
          </linearGradient>
        </defs>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke="rgba(255,255,255,0.1)" strokeWidth={STROKE} />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none"
          stroke="url(#cg)" strokeWidth={STROKE} strokeLinecap="round"
          strokeDasharray={CIRC} strokeDashoffset={saleStatus === "ended" ? CIRC : offset}
          style={{
            transition: remaining === 59 ? "none" : "stroke-dashoffset 1s linear",
            filter: "drop-shadow(0 0 6px rgba(187, 207, 40, 0.7))",
          }} />
      </svg>
      {/* Coin logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={logo} alt="" width={65} height={65} />
      </div>
    </div>
  );
}

/* ── Countdown Tile ── */
function Tile({ n, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{
        width: 38, height: 38,
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, fontWeight: 900, color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
        fontVariantNumeric: "tabular-nums",
        flexShrink: 0,
      }}>
        {String(n).padStart(2, "0")}
      </div>
      <span style={{
        fontSize: 7, color: "#fff",
        textTransform: "uppercase", letterSpacing: "1px",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Animated number ── */
function AnimNum({ to, duration = 1800 }) {
  const [val, setVal] = useState(0);
  const raf = useRef();
  useEffect(() => {
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(to * e);
      if (t < 1) raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [to, duration]);
  return <>₹{val.toFixed(2)}</>;
}

/* ── Main ── */
export default function JMCCoinPopup() {
  const [open, setOpen] = useState(false);
  const [tl, setTl] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [saleStatus, setSaleStatus] = useState("upcoming");
  const [btnPulse, setBtnPulse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 400);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (now < SALE_START) {
        setSaleStatus("upcoming");
        const d = SALE_START - now;
        setTl({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
      } else if (now >= SALE_START && now < SALE_END) {
        setSaleStatus("active");
        const d = SALE_END - now;
        setTl({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
      } else {
        setSaleStatus("ended");
        setTl({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBtnPulse(true);
      setTimeout(() => setBtnPulse(false), 700);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const saleLabel =
    saleStatus === "upcoming" ? "Sale Starts In" :
    saleStatus === "active" ? "Sale Ends In" :
    "Sale Ended";

  const sep = (
    <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 16, fontWeight: 900, paddingTop: 8, lineHeight: 1, flexShrink: 0 }}>:</span>
  );

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 40,
          left: 16,
          zIndex: 50,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "0 6px 0 14px",
          height: 48,
          borderRadius: 99,
          background: "linear-gradient(135deg, #166534 0%, #052e16 100%)",
          border: "1px solid rgba(187,207,40,0.35)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 13,
          cursor: "pointer",
          letterSpacing: "0.3px",
          transform: btnPulse ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.15s",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Sheen overlay */}
        <span style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Ripple rings */}
        {[0, 0.8, 1.6].map((delay, i) => (
          <span key={i} style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            border: "1.5px solid rgba(187,207,40,0.5)",
            animation: `jmc-ripple 2.4s ease-out ${delay}s infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Coin icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, position: "relative" }}>
          <circle cx="10" cy="10" r="9" fill="#bbcf28" stroke="#fff" strokeWidth="0.5" opacity="0.9" />
          <text x="10" y="14" textAnchor="middle" fontSize="10" fontWeight="900" fill="#14532d" fontFamily="sans-serif">₹</text>
        </svg>

        {/* Label */}
        <span style={{ color: "rgba(255,255,255,0.9)", position: "relative" }}>JMC Coin</span>

        {/* Price badge */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "rgba(187,207,40,0.18)",
          border: "1px solid rgba(187,207,40,0.4)",
          borderRadius: 99, padding: "4px 10px 4px 7px",
          fontSize: 13, fontWeight: 900, color: "#d9f99d",
          position: "relative",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#bbcf28", boxShadow: "0 0 6px #bbcf28",
            animation: "jmc-blink 1.6s ease-in-out infinite",
            flexShrink: 0,
          }} />
          ₹0.10
        </span>

        <style>{`
          @keyframes jmc-ripple {
            0%   { transform: scale(1);    opacity: 0.7; }
            100% { transform: scale(1.45); opacity: 0; }
          }
          @keyframes jmc-blink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: 0.4; transform: scale(0.65); }
          }
        `}</style>
      </button>

      {/* ── Modal ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            animation: "fadeIn 0.2s ease",
            boxSizing: "border-box",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 400,
              maxHeight: "calc(100dvh - 24px)",
              overflowY: "auto",
              borderRadius: 8,
              border: "1.5px solid rgba(255,255,255,0.15)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
              animation: "popUp 0.3s cubic-bezier(.34,1.4,.64,1)",
              background: "radial-gradient(ellipse at bottom, #052e16 0%, #14532d 50%, #166534 100%)",
              position: "relative",
              boxSizing: "border-box",
              scrollbarWidth: "none",
            }}
          >
            {/* Glow */}
            <div style={{
              position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
              width: 280, height: 180, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(74,222,128,0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }} />

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute", top: 12, right: 12, zIndex: 10,
                width: 30, height: 30, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#fff", cursor: "pointer",
                fontSize: 11, fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div style={{ padding: "20px 16px 20px", position: "relative", boxSizing: "border-box" }}>

              {/* ── Title ── */}
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 99, padding: "3px 12px", marginBottom: 10,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#4ade80", boxShadow: "0 0 8px #bbcf28",
                    display: "inline-block", animation: "blink 1.4s ease-in-out infinite",
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                    Live Price
                  </span>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1, margin: "0 0 3px" }}>
                  JMC Coin Update
                </h2>
              </div>

              {/* ── Big Price ── */}
              <div style={{
                textAlign: "center",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.11)",
                borderRadius: 8, padding: "14px 16px", marginBottom: 14,
              }}>
                <div style={{
                  fontSize: isMobile ? 36 : 42,
                  fontWeight: 900, color: "#fff",
                  letterSpacing: "-1px", lineHeight: 1,
                  textShadow: "0 0 40px rgba(187, 207, 40, 0.3)",
                }}>
                  <AnimNum to={CURRENT_PRICE} duration={2200} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#fff" }}>INR</span>
                </div>
              </div>

              {/* ── Timer + Countdown ── */}
              <div style={{
                display: "flex",
                alignItems: "stretch",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: 14,
                minHeight: 110,
              }}>
                {/* Left: ring timer - SYNCED WITH COUNTDOWN SECONDS */}
                <div style={{
                  padding: "14px 12px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: 6, flexShrink: 0,
                }}>
                  <CircularTimer 
                    total={60} 
                    remaining={tl.days} 
                    saleStatus={saleStatus}
                  />
                  <span style={{ fontSize: 8, color: "#fff", textTransform: "uppercase", letterSpacing: 1 }}>
                    {saleStatus === "ended" ? "Ended" : "Seconds"}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ width: 1, background: "rgba(255,255,255,0.09)", flexShrink: 0 }} />

                {/* Right: sale countdown */}
                <div style={{ flex: 1, padding: "14px 10px", minWidth: 0 }}>
                  <p style={{ fontSize: 8, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                    {saleLabel}
                  </p>

                  {saleStatus === "ended" ? (
                    <div style={{ textAlign: "center", color: "#fff", fontSize: 13, fontWeight: 700, padding: "8px 0" }}>
                       Sale has ended!
                    </div>
                  ) : (
                    <div style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: isMobile ? 2 : 4,
                      justifyContent: "space-evenly",
                      flexWrap: "nowrap",
                      color: "#fff",
                    }}>
                      <Tile n={tl.days} label="Days" />
                      {sep}
                      <Tile n={tl.hours} label="Hrs" />
                      {sep}
                      <Tile n={tl.minutes} label="Min" />
                      {sep}
                      <Tile n={tl.seconds} label="Sec" />
                    </div>
                  )}
                </div>
              </div>

              {/* ── Sale Date Info ── */}
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  Don't miss out – the sale ends in just <strong>{tl.days}</strong> days! Buy now before it's too late!
                </p>
              </div>

              {/* ── CTA Button ── */}
              <button
                onClick={() => {
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: 99,
                  background: "linear-gradient(135deg, #16a34a, #14532d)",
                  border: "none",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 900,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(24, 161, 74, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(187,207,40,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(24, 161, 74, 0.4)";
                }}
                onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
                onMouseUp={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
              >
                Buy JMC Coin Now
              </button>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popUp  { from { opacity: 0; transform: scale(0.88) translateY(28px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes blink  { 0%,100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.4; transform: scale(0.7) } }
        *, *::before, *::after { box-sizing: border-box; }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
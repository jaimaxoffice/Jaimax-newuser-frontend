import React, { useState } from "react";
import { CheckCircle, Clock, Zap, TrendingUp, Layers, Rocket } from "lucide-react";

const phases = [
  {
    num: "01", label: "Phase 1",
    tokens: "10 Billion Tokens",
    price: "INR 0.01 – 0.04 Paisa",
    usd: "0.00012 – 0.00044 USD",
    status: "Completed", button: "Buy Now",
    color: "#f59e0b", icon: CheckCircle,
  },
  {
    num: "02", label: "Phase 2",
    tokens: "20 Billion Tokens",
    price: "INR 0.05 – 0.50 Paisa",
    usd: "0.00061 – 0.0061 USD",
    status: "Live", button: "Buy Now",
    color: "#f97316", icon: Zap,
  },
  {
    num: "03", label: "Phase 3",
    tokens: "25 Billion Tokens",
    price: "INR 0.60 – 1.53 Paisa",
    usd: "0.0071 – 0.018 USD",
    status: "Upcoming", button: "Coming Soon",
    color: "#ec4899", icon: TrendingUp,
  },
  {
    num: "04", label: "Phase 4",
    tokens: "30 Billion Tokens",
    price: "INR 1.60 – 3.00 Paisa",
    usd: "0.019 – 0.036 USD",
    status: "Upcoming", button: "Coming Soon",
    color: "#8b5cf6", icon: Layers,
  },
  {
    num: "05", label: "Phase 5",
    tokens: "25 Billion Tokens",
    price: "INR 3.15 – 4.10 Paisa",
    usd: "0.037 – 0.049 USD",
    status: "Upcoming", button: "Coming Soon",
    color: "#06b6d4", icon: Rocket,
  },
];

const ROW_H = 96;       // height of each row
const TOTAL_H = ROW_H * 5;   // 480
const AW = 200;         // arrow block width
const SLANT = 48;       // diagonal cut on top-left / bottom-left corners
// The tip x = AW, tip y = TOTAL_H / 2 = 240

export default function DummyPhases() {
  const [hovered, setHovered] = useState(null);

  // Full arrow polygon (all 5 bands share this shape, clipped per row)
  // Points: top-left-cut → top-right → TIP → bottom-right → bottom-left-cut → left-bottom → left-top
  const W = AW, H = TOTAL_H, S = SLANT, mid = H / 2;
  const arrowPts = `${S},0 ${W},0 ${W},${mid} ${W},${H} ${S},${H} 0,${H - S} 0,${S}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:.6} }

        .dp-wrap {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(145deg,#dff0f4,#eaf8f2);
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 16px;
        }
        .dp-inner { width:100%; max-width:900px; animation: fadeUp .5s ease both; }

        .dp-heading { text-align:center; margin-bottom:28px; }
        .dp-eye {
          font-size:11px; font-weight:700; letter-spacing:.2em;
          text-transform:uppercase; color:#0d9488;
          display:block; margin-bottom:8px;
        }
        .dp-h2 {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(28px,5vw,48px);
          letter-spacing:.04em; color:#0f172a; line-height:1.1;
        }

        /* Logo bar above card */
        .dp-logo {
          background:#0f172a; border-radius:16px 16px 0 0;
          padding:10px 20px; display:flex; align-items:flex-end; gap:3px;
        }
        .dp-lb { width:7px; border-radius:2px 2px 0 0; }
        .dp-lt { margin-left:8px; }
        .dp-lm {
          font-family:'Bebas Neue',sans-serif; font-size:15px;
          color:#fff; letter-spacing:.1em; display:block; line-height:1;
        }
        .dp-ls {
          font-size:8px; font-weight:600; color:#64748b;
          letter-spacing:.1em; text-transform:uppercase; display:block; margin-top:2px;
        }

        /* Card */
        .dp-card {
          background:#fff; border-radius:0 0 16px 16px; overflow:hidden;
          box-shadow:0 20px 60px rgba(0,0,0,.1),0 4px 16px rgba(0,0,0,.05);
          display:flex; flex-direction:row;
        }

        /* LEFT: SVG arrow block */
        .dp-left {
          flex: 0 0 ${AW}px;
          position:relative;
          height:${TOTAL_H}px;
        }
        .dp-left svg { position:absolute; top:0; left:0; width:100%; height:100%; }

        /* Number overlays */
        .dp-num {
          position:absolute; left:0; width:${AW - 16}px;
          display:flex; align-items:center; justify-content:flex-start;
          padding-left:20px; pointer-events:none;
        }
        .dp-num span {
          font-family:'Bebas Neue',sans-serif;
          font-size:36px; color:rgba(255,255,255,.85);
          letter-spacing:.06em; line-height:1;
        }

        /* RIGHT: info rows */
        .dp-right { flex:1; display:flex; flex-direction:column; }

        .dp-row {
          flex:1; display:flex; align-items:center;
          gap:12px; padding:0 20px 0 28px;
          border-bottom:1px solid #f1f5f9;
          transition:background .18s; position:relative; cursor:default;
        }
        .dp-row:last-child { border-bottom:none; }
        .dp-accent {
          position:absolute; left:0; top:20%; bottom:20%;
          width:3px; border-radius:999px;
        }
        .dp-info { flex:1; min-width:0; padding:10px 0; }
        .dp-lbl  { font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:.14em; margin-bottom:1px; }
        .dp-tok  { font-weight:700; font-size:14px; color:#0f172a; margin-bottom:2px; }
        .dp-pr   { font-size:12px; color:#475569; font-weight:500; }
        .dp-usd  { font-size:11px; color:#94a3b8; }

        .dp-badge {
          flex-shrink:0; font-size:10px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
          padding:3px 9px; border-radius:999px;
          display:flex; align-items:center; gap:4px; white-space:nowrap;
        }
        .b-live      { background:#dcfce7; color:#15803d; animation:livePulse 2s infinite; }
        .b-completed { background:#d1fae5; color:#065f46; }
        .b-upcoming  { background:#f1f5f9; color:#64748b; }
        .dp-dot { width:6px;height:6px;border-radius:50%;background:#15803d;display:inline-block; }

        .dp-ico {
          flex-shrink:0; width:42px; height:42px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 3px 10px rgba(0,0,0,.15); transition:transform .2s;
        }
        .dp-row:hover .dp-ico { transform:scale(1.1) rotate(-5deg); }

        .dp-btn {
          flex-shrink:0; font-family:'DM Sans',sans-serif;
          font-weight:700; font-size:11px; letter-spacing:.08em;
          text-transform:uppercase; padding:7px 14px;
          border-radius:999px; border:none; white-space:nowrap;
          transition:transform .15s,box-shadow .15s;
        }
        .btn-on  { color:#fff; cursor:pointer; }
        .btn-on:hover { transform:translateY(-2px); box-shadow:0 6px 16px rgba(0,0,0,.18); }
        .btn-off { background:#e2e8f0; color:#94a3b8; cursor:not-allowed; }

        /* TABLET 641-768 */
        @media (min-width:641px) and (max-width:768px) {
          .dp-left { flex: 0 0 160px; height:${TOTAL_H}px; }
          .dp-row  { padding:0 14px 0 20px; gap:9px; }
          .dp-tok  { font-size:12px; }
          .dp-ico  { width:36px; height:36px; }
          .dp-btn  { font-size:10px; padding:5px 10px; }
        }

        /* MOBILE ≤640 */
        @media (max-width:640px) {
          .dp-card { flex-direction:column; }
          .dp-left {
            flex:none; width:100%; height:60px;
            overflow:hidden;
          }
          /* On mobile, show arrow as a thin horizontal coloured strip row */
          .dp-left svg { display:none; }
          .dp-mobile-strips {
            display:flex; width:100%; height:100%;
          }
          .dp-ms {
            flex:1; display:flex; align-items:center; justify-content:center;
          }
          .dp-ms span {
            font-family:'Bebas Neue',sans-serif;
            font-size:14px; color:rgba(255,255,255,.9); letter-spacing:.06em;
          }
          .dp-num { display:none; }
          .dp-right { flex:none; }
          .dp-row { padding:10px 14px 10px 18px; gap:8px; min-height:72px; }
          .dp-ico  { width:32px; height:32px; }
          .dp-btn  { font-size:9px; padding:5px 10px; }
          .dp-badge { font-size:9px; padding:2px 7px; }
          .dp-tok  { font-size:12px; }
        }
        @media (min-width:641px) {
          .dp-mobile-strips { display:none; }
        }
      `}</style>

      <div className="dp-wrap">
        <div className="dp-inner">

          <div className="dp-heading">
            <span className="dp-eye">Token Sale Roadmap</span>
            <h2 className="dp-h2">Company's Growth Plan Outlook</h2>
          </div>

          {/* Logo */}
          <div className="dp-logo">
            {phases.map((p, i) => (
              <div key={i} className="dp-lb" style={{ height: [12,20,28,22,16][i], background: p.color }} />
            ))}
            <div className="dp-lt">
              <span className="dp-lm">5 PHASES</span>
              <span className="dp-ls">Growth Plan</span>
            </div>
          </div>

          <div className="dp-card">

            {/* ── LEFT: single SVG arrow with 5 clipped colour bands ── */}
            <div className="dp-left">
              <svg
                viewBox={`0 0 ${AW} ${TOTAL_H}`}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  {phases.map((_, i) => (
                    <clipPath key={i} id={`cp${i}`}>
                      <rect x="0" y={i * ROW_H} width={AW} height={ROW_H} />
                    </clipPath>
                  ))}
                </defs>

                {/* One arrow polygon per band, each clipped to its row height */}
                {phases.map((p, i) => (
                  <polygon
                    key={i}
                    points={arrowPts}
                    fill={hovered === i ? p.color : p.color}
                    clipPath={`url(#cp${i})`}
                    opacity={hovered === i ? 1 : 0.88}
                    style={{ transition: "opacity .2s" }}
                  />
                ))}

                {/* Thin white separator lines between bands */}
                {[1,2,3,4].map(i => (
                  <line
                    key={i}
                    x1="0" y1={i * ROW_H}
                    x2={AW} y2={i * ROW_H}
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>

              {/* Mobile horizontal strips (shown only on mobile via CSS) */}
              <div className="dp-mobile-strips">
                {phases.map((p, i) => (
                  <div key={i} className="dp-ms" style={{ background: p.color }}>
                    <span>{p.num}</span>
                  </div>
                ))}
              </div>

              {/* Number overlays (desktop/tablet) */}
              {phases.map((p, i) => (
                <div
                  key={i}
                  className="dp-num"
                  style={{ top: i * ROW_H, height: ROW_H }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span>{p.num}</span>
                </div>
              ))}
            </div>

            {/* ── RIGHT: info rows ── */}
            <div className="dp-right">
              {phases.map((p, i) => {
                const Icon = p.icon;
                const isLive = p.status === "Live";
                const bc = p.status === "Live" ? "b-live" : p.status === "Completed" ? "b-completed" : "b-upcoming";
                return (
                  <div
                    key={i}
                    className="dp-row"
                    style={hovered === i ? { background: `${p.color}12` } : {}}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="dp-accent" style={{ background: p.color }} />
                    <div className="dp-info">
                      <div className="dp-lbl" style={{ color: p.color }}>{p.label.toUpperCase()}</div>
                      <div className="dp-tok">{p.tokens}</div>
                      <div className="dp-pr">{p.price}</div>
                      <div className="dp-usd">{p.usd}</div>
                    </div>
                    <span className={`dp-badge ${bc}`}>
                      {isLive && <span className="dp-dot" />}
                      {p.status}
                    </span>
                    <div className="dp-ico" style={{ background: p.color }}>
                      <Icon size={16} color="#fff" strokeWidth={2.2} />
                    </div>
                    <button
                      className={`dp-btn ${isLive ? "btn-on" : "btn-off"}`}
                      style={isLive ? { background: p.color } : {}}
                      disabled={!isLive}
                    >
                      {p.button}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <p style={{ textAlign:"center", marginTop:12, fontSize:11, color:"#94a3b8" }}>
            * Prices are indicative and subject to change based on market conditions.
          </p>
        </div>
      </div>
    </>
  );
}
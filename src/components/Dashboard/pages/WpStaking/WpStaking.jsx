
// import React, { useState } from "react";

// import Loader from "../../../../ReusableComponents/Loader/loader";
// import { useGetWpStakingWalletQuery } from "./wpStakingApiSlice";
// import { useGetP2PHistorySellerQuery } from "../p2p/p2pApiSlice";

// const FONT_LINK = `https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap`;

// const T = {
//   bg: "#F0FAFA",
//   surface: "#FFFFFF",
//   surfaceHover: "#F4FEFE",
//   border: "#D0EEEC",
//   borderDark: "#A8DEDD",
//   teal900: "#0D4F4A",
//   teal800: "#0F6259",
//   teal700: "#0E7B70",
//   teal600: "#0D9488",
//   teal500: "#14B8A6",
//   teal400: "#2DD4BF",
//   teal300: "#5EEAD4",
//   teal100: "#CCFBF1",
//   teal50: "#F0FDFA",
//   textPrimary: "#0D3D38",
//   textSecondary: "#2D6E68",
//   textMuted: "#6BA8A2",
//   white: "#FFFFFF",
//   red: "#DC2626",
//   redDim: "#FEF2F2",
//   redBorder: "#FECACA",
//   green: "#059669",
//   greenDim: "#ECFDF5",
//   greenBorder: "#A7F3D0",
//   amber: "#D97706",
//   amberDim: "#FFFBEB",
//   amberBorder: "#FDE68A",
// };

// const fmt = (n) =>
//   new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n || 0);

// const fmtDate = (s) => {
//   if (!s) return "—";
//   return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// };

// const fmtDateTime = (s) => {
//   if (!s) return "—";
//   return new Date(s).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
// };

// // ─── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const map = {
//     completed: { bg: T.greenDim, color: T.green, border: T.greenBorder },
//     pending: { bg: T.amberDim, color: T.amber, border: T.amberBorder },
//     cancelled: { bg: T.redDim, color: T.red, border: T.redBorder },
//     processing: { bg: T.teal50, color: T.teal700, border: T.teal300 },
//   };
//   const s = map[status?.toLowerCase()] || { bg: "#F9FAFB", color: "#6B7280", border: "#E5E7EB" };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       padding: "3px 10px", borderRadius: 20,
//       fontSize: 11, fontWeight: 600, fontFamily: "'Outfit', sans-serif",
//       background: s.bg, color: s.color, border: `1px solid ${s.border}`,
//       textTransform: "capitalize", letterSpacing: ".03em",
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
//       {status || "N/A"}
//     </span>
//   );
// };

// // ─── Metric Card ──────────────────────────────────────────────────────────────
// const MetricCard = ({ label, value, unit, primary, delay = 0 }) => (
//   <div style={{
//     background: primary ? `linear-gradient(135deg, ${T.teal700} 0%, ${T.teal500} 100%)` : T.surface,
//     border: primary ? "none" : `1px solid ${T.border}`,
//     borderRadius: 14,
//     padding: "22px 24px",
//     boxShadow: primary ? `0 8px 32px rgba(13,148,136,0.25)` : "0 1px 4px rgba(13,74,70,0.06)",
//     animation: `slideUp .45s ease ${delay}s both`,
//     transition: "transform .18s, box-shadow .18s",
//     cursor: "default",
//     position: "relative",
//     overflow: "hidden",
//   }}
//     onMouseEnter={e => {
//       e.currentTarget.style.transform = "translateY(-2px)";
//       e.currentTarget.style.boxShadow = primary ? "0 12px 40px rgba(13,148,136,0.35)" : "0 6px 20px rgba(13,74,70,0.1)";
//     }}
//     onMouseLeave={e => {
//       e.currentTarget.style.transform = "";
//       e.currentTarget.style.boxShadow = primary ? "0 8px 32px rgba(13,148,136,0.25)" : "0 1px 4px rgba(13,74,70,0.06)";
//     }}
//   >
//     {primary && (
//       <>
//         <div style={{ position: "absolute", top: -24, right: -24, width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
//         <div style={{ position: "absolute", bottom: -16, right: 16, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
//       </>
//     )}
//     <div style={{ position: "relative", zIndex: 1 }}>
//       <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Outfit', sans-serif", color: primary ? "rgba(255,255,255,0.7)" : T.textMuted }}>
//         {label}
//       </div>
//       <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'DM Serif Display', serif", lineHeight: 1, color: primary ? T.white : T.textPrimary }}>
//         {value}
//       </div>
//       {unit && (
//         <div style={{ fontSize: 11, marginTop: 5, fontFamily: "'DM Mono', monospace", color: primary ? "rgba(255,255,255,0.55)" : T.textMuted }}>
//           {unit}
//         </div>
//       )}
//     </div>
//   </div>
// );

// // ─── Token Bar Row ────────────────────────────────────────────────────────────
// const TokenBarRow = ({ label, value, pct, color, trackColor }) => (
//   <div style={{ marginBottom: 22 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
//       <span style={{ fontSize: 12, fontWeight: 500, color: T.textSecondary, fontFamily: "'Outfit', sans-serif" }}>{label}</span>
//       <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "'DM Serif Display', serif" }}>{value}</span>
//     </div>
//     <div style={{ height: 5, background: trackColor || T.border, borderRadius: 3, overflow: "hidden" }}>
//       <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 3, transition: "width 1s cubic-bezier(.4,0,.2,1) .4s" }} />
//     </div>
//   </div>
// );

// // ─── Section Card ─────────────────────────────────────────────────────────────
// const SectionCard = ({ title, sub, children, delay = 0, style = {} }) => (
//   <div style={{
//     background: T.surface, border: `1px solid ${T.border}`,
//     borderRadius: 16, padding: "26px 28px",
//     boxShadow: "0 1px 4px rgba(13,74,70,0.06)",
//     animation: `slideUp .45s ease ${delay}s both`,
//     ...style,
//   }}>
//     <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }}>
//       <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: T.textPrimary, fontFamily: "'Outfit', sans-serif" }}>{title}</h2>
//       {sub && <p style={{ margin: "3px 0 0", fontSize: 12, color: T.textMuted, fontFamily: "'Outfit', sans-serif" }}>{sub}</p>}
//     </div>
//     {children}
//   </div>
// );

// // ─── ID Field ─────────────────────────────────────────────────────────────────
// const IDField = ({ label, value }) => (
//   <div style={{ marginBottom: 16 }}>
//     <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>
//       {label}
//     </div>
//     <div style={{ background: T.teal50, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: T.teal800, wordBreak: "break-all", lineHeight: 1.6 }}>
//       {value}
//     </div>
//   </div>
// );

// // ─── Main ─────────────────────────────────────────────────────────────────────
// function WpStaking() {
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data: response, isLoading, isError, error, refetch } = useGetWpStakingWalletQuery();
//   const { data: historyResponse, isLoading: historyLoading } = useGetP2PHistorySellerQuery({ page, limit, tradeType: "wpStaking" });

//   const data = response?.success ? response.data : null;
//   const historyData = historyResponse?.data?.trades || [];
//   const totalPages = historyResponse?.data?.totalPages || 1;

//   const retentionPct = data ? (data.netTokens / data.totalTokensAwarded) * 100 : 0;
//   const p2pPct = data ? (data.totalSoldInP2P / data.totalTokensAwarded) * 100 : 0;

//   if (isLoading) return <Loader />;

//   if (isError || !response?.success) {
//     return (
//       <div style={{ minHeight: "60vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ textAlign: "center", padding: "40px 32px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, maxWidth: 340, boxShadow: "0 4px 24px rgba(13,74,70,0.1)" }}>
//           <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.redDim, border: `1px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 26 }}>⚠️</div>
//           <div style={{ fontSize: 16, fontWeight: 600, color: T.textPrimary, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>Failed to load wallet</div>
//           <div style={{ fontSize: 13, color: T.textMuted, fontFamily: "'Outfit', sans-serif", marginBottom: 20 }}>
//             {error?.data?.message || "Unable to fetch WP staking wallet"}
//           </div>
//           <button onClick={refetch} style={{ padding: "10px 28px", background: `linear-gradient(135deg, ${T.teal700}, ${T.teal500})`, color: T.white, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 12px rgba(13,148,136,0.3)" }}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <link rel="stylesheet" href={FONT_LINK} />
//       <style>{`
//         @keyframes slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
//         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
//         * { box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 6px; height: 6px; }
//         ::-webkit-scrollbar-track { background: ${T.bg}; }
//         ::-webkit-scrollbar-thumb { background: ${T.borderDark}; border-radius: 3px; }
//         .th-cell { padding: 11px 18px; text-align: left; font-size: 10px; font-weight: 600; color: ${T.textMuted}; letter-spacing: .09em; text-transform: uppercase; font-family: 'Outfit', sans-serif; white-space: nowrap; background: ${T.teal50}; }
//         .td-cell { padding: 14px 18px; font-size: 13px; color: ${T.textSecondary}; font-family: 'Outfit', sans-serif; white-space: nowrap; border-top: 1px solid ${T.border}; background: ${T.white}; transition: background .12s; }
//         .tr-row:hover .td-cell { background: ${T.surfaceHover}; }
//         .pg-btn { padding: 7px 16px; font-size: 12px; font-weight: 500; border-radius: 8px; border: 1px solid ${T.border}; background: ${T.surface}; color: ${T.textSecondary}; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all .15s; }
//         .pg-btn:hover:not(:disabled) { background: ${T.teal50}; color: ${T.teal700}; border-color: ${T.teal300}; }
//         .pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
//         .pg-btn-active { background: ${T.teal600} !important; color: ${T.white} !important; border-color: ${T.teal600} !important; }
//       `}</style>

//       <div style={{ minHeight: "100vh", background: T.bg, padding: "20px 20px", fontFamily: "'Outfit', sans-serif" }}>
//         <div style={{ maxWidth: 1500, margin: "0 auto" }}>

//           {/* ── Header ────────────────────────────── */}
//           <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, animation: "slideUp .35s ease both" }}>
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
//                 <div style={{ width: 3, height: 15, background: T.teal500, borderRadius: 2 }} />
//                 <span style={{ fontSize: 11, fontWeight: 600, color: T.teal600, letterSpacing: ".1em", textTransform: "uppercase" }}>Wealth Plan</span>
//               </div>
//               <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: T.textPrimary, letterSpacing: "-.02em" }}>
//                 Staking Wallet
//               </h1>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.teal50, border: `1px solid ${T.teal300}`, borderRadius: 20, padding: "5px 15px" }}>
//               <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.teal500, animation: "pulse 2s infinite" }} />
//               <span style={{ fontSize: 11, fontWeight: 600, color: T.teal700, letterSpacing: ".05em" }}>LIVE</span>
//             </div>
//           </div>

//           {/* ── Hero Balance Card ─────────────────── */}
//           <div style={{
//             background: `linear-gradient(135deg, ${T.teal900} 0%, ${T.teal700} 55%, ${T.teal600} 100%)`,
//             borderRadius: 8, padding: "16px 20px", marginBottom: 10,
//             position: "relative", overflow: "hidden",
//             boxShadow: "0 12px 18px rgba(13,79,74,0.28)",
//             animation: "slideUp .4s ease .05s both",
//           }}>
//             {/* decorative rings */}
//             <div style={{ position: "absolute", top: -48, right: -48, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
//             <div style={{ position: "absolute", top: -28, right: -28, width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
//             <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.teal400}, transparent)`, pointerEvents: "none" }} />

//             <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
//               <div>
//                 <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 3 }}>
//                   Net Token Balance
//                 </div>
//                 <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
//                   <span style={{ fontSize: 30, fontWeight: 700, color: T.white, fontFamily: "'DM Serif Display', serif", lineHeight: 1, letterSpacing: "-.02em" }}>
//                     {fmt(data.netTokens)}
//                   </span>
//                   <span style={{ fontSize: 20, color: T.teal300, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>JMC</span>
//                 </div>
//                 <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 8, fontFamily: "'DM Mono', monospace" }}>
//                   Converted on {fmtDate(data.convertedAt)}
//                 </div>
//               </div>

//               {/* Mini stats in hero */}
//               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//                 {[
//                   { label: "Total Awarded", value: `${fmt(data.totalTokensAwarded)} JMC` },
//                   { label: "Sold in P2P", value: `${fmt(data.totalSoldInP2P)} JMC` },
//                 ].map(({ label, value }) => (
//                   <div key={label} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 18px", backdropFilter: "blur(4px)", minWidth: 150 }}>
//                     <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
//                     <div style={{ fontSize: 16, fontWeight: 700, color: T.white, fontFamily: "'DM Serif Display', serif" }}>{value}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── Metric Row ────────────────────────── */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 16 }}>
//             <MetricCard label="Total Awarded" value={fmt(data.totalTokensAwarded)} unit="JMC tokens" primary delay={0.1} />
//             <MetricCard label="Net Balance" value={fmt(data.netTokens)} unit="JMC available" delay={0.14} />
//             <MetricCard label="Sold in P2P" value={fmt(data.totalSoldInP2P)} unit="JMC transferred" delay={0.18} />
//             {/* <MetricCard label="P2P Share" value={`${p2pPct.toFixed(3)}%`} unit="of total awarded" delay={0.22} />
//             <MetricCard label="Retention Rate" value={`${retentionPct.toFixed(3)}%`} unit="tokens held" delay={0.26} /> */}
//           </div>



//           {/* ── P2P History Table ─────────────────── */}
//           <div style={{
//             background: T.surface, border: `1px solid ${T.border}`,
//             borderRadius: 16, overflow: "hidden",
//             boxShadow: "0 1px 4px rgba(13,74,70,0.06)",
//             animation: "slideUp .5s ease .2s both",
//           }}>
//             <div style={{ padding: "24px 28px 8px" }}>
//               <h2 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 600, color: T.textPrimary, fontFamily: "'Outfit', sans-serif" }}>P2P Transaction History</h2>
//               <p style={{ margin: 0, fontSize: 12, color: T.textMuted, fontFamily: "'Outfit', sans-serif" }}>WP staking token sales — most recent first</p>
//               <div style={{ height: 1, background: T.border, marginTop: 18 }} />
//             </div>

//             {historyLoading ? (
//               <div style={{ padding: 48, textAlign: "center" }}><Loader /></div>
//             ) : historyData.length === 0 ? (
//               <div style={{ padding: "60px 24px", textAlign: "center" }}>
//                 {/* <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.teal50, border: `1px solid ${T.teal300}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22 }}>📭</div> */}
//                 <div style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, fontFamily: "'Outfit', sans-serif", marginBottom: 5 }}>No transactions yet</div>
//                 <div style={{ fontSize: 13, color: T.textMuted, fontFamily: "'Outfit', sans-serif" }}>Your P2P trading history will appear here</div>
//               </div>
//             ) : (
//               <>
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead>
//                       <tr>
//                         {["Date & Time", "Trade ID", "Amount", "Price / Token", "Total", "Status"].map(h => (
//                           <th key={h} className="th-cell">{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {historyData.map((trade, i) => (
//                         <tr key={trade._id || i} className="tr-row">
//                           <td className="td-cell" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
//                             {fmtDateTime(trade.createdAt)}
//                           </td>
//                           <td className="td-cell">
//                             <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: T.teal700, background: T.teal50, padding: "3px 9px", borderRadius: 5, border: `1px solid ${T.border}` }}>
//                               {trade.tradeId || trade._id?.slice(-8).toUpperCase()}
//                             </span>
//                           </td>
//                           <td className="td-cell" style={{ fontWeight: 600, color: T.textPrimary }}>
//                             {fmt(trade.amount || trade.tokenAmount)}{" "}
//                             <span style={{ fontSize: 10, color: T.textMuted }}>JMC</span>
//                           </td>
//                           <td className="td-cell" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
//                             ₹{fmt(trade.price || trade.pricePerToken)}
//                           </td>
//                           <td className="td-cell" style={{ fontWeight: 700, color: T.teal700, fontFamily: "'DM Serif Display', serif", fontSize: 14 }}>
//                             ₹{fmt(trade.totalAmount || (trade.amount * trade.price))}
//                           </td>
//                           <td className="td-cell"><StatusBadge status={trade.status} /></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {totalPages > 1 && (
//                   <div style={{ padding: "14px 22px", borderTop: `1px solid ${T.border}`, background: T.teal50, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <span style={{ fontSize: 12, color: T.textMuted }}>
//                       Page <span style={{ color: T.textSecondary, fontWeight: 600 }}>{page}</span> of{" "}
//                       <span style={{ color: T.textSecondary, fontWeight: 600 }}>{totalPages}</span>
//                     </span>
//                     <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//                       <button className="pg-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
//                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         const n = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
//                         return (
//                           <button key={n} className={`pg-btn${page === n ? " pg-btn-active" : ""}`} onClick={() => setPage(n)}>
//                             {n}
//                           </button>
//                         );
//                       })}
//                       <button className="pg-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next →</button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default WpStaking;


import React, { useState } from "react";
import Loader from "../../../../ReusableComponents/Loader/loader";
import { useGetWpStakingWalletQuery } from "./wpStakingApiSlice";
import { useGetP2PHistorySellerQuery } from "../p2p/p2pApiSlice";

const FONT_LINK = `https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap`;

const T = {
  bg: "#F0FAFA",
  surface: "#FFFFFF",
  surfaceHover: "#F4FEFE",
  border: "#D0EEEC",
  borderDark: "#A8DEDD",
  teal900: "#0D4F4A",
  teal800: "#0F6259",
  teal700: "#0E7B70",
  teal600: "#0D9488",
  teal500: "#14B8A6",
  teal400: "#2DD4BF",
  teal300: "#5EEAD4",
  teal100: "#CCFBF1",
  teal50: "#F0FDFA",
  textPrimary: "#0D3D38",
  textSecondary: "#2D6E68",
  textMuted: "#6BA8A2",
  white: "#FFFFFF",
  red: "#DC2626",
  redDim: "#FEF2F2",
  redBorder: "#FECACA",
  green: "#059669",
  greenDim: "#ECFDF5",
  greenBorder: "#A7F3D0",
  amber: "#D97706",
  amberDim: "#FFFBEB",
  amberBorder: "#FDE68A",
};

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n || 0);

const fmtDate = (s) => {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const fmtDateTime = (s) => {
  if (!s) return "—";
  return new Date(s).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    completed: { bg: T.greenDim, color: T.green, border: T.greenBorder },
    pending: { bg: T.amberDim, color: T.amber, border: T.amberBorder },
    cancelled: { bg: T.redDim, color: T.red, border: T.redBorder },
    processing: { bg: T.teal50, color: T.teal700, border: T.teal300 },
  };
  const s = map[status?.toLowerCase()] || { bg: "#F9FAFB", color: "#6B7280", border: "#E5E7EB" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 12,
      fontSize: 10, fontWeight: 600, fontFamily: "'Outfit', sans-serif",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      textTransform: "capitalize", letterSpacing: ".02em",
    }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
      {status || "N/A"}
    </span>
  );
};

// ─── Metric Card ──────────────────────────────────────────────────────────────
const MetricCard = ({ label, value, unit, primary, delay = 0 }) => (
  <div style={{
    background: primary ? `linear-gradient(135deg, ${T.teal700} 0%, ${T.teal500} 100%)` : T.surface,
    border: primary ? "none" : `1px solid ${T.border}`,
    borderRadius: 14,
    padding: "22px 24px",
    boxShadow: primary ? `0 8px 32px rgba(13,148,136,0.25)` : "0 1px 4px rgba(13,74,70,0.06)",
    animation: `slideUp .45s ease ${delay}s both`,
    transition: "transform .18s, box-shadow .18s",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = primary ? "0 12px 40px rgba(13,148,136,0.35)" : "0 6px 20px rgba(13,74,70,0.1)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = primary ? "0 8px 32px rgba(13,148,136,0.25)" : "0 1px 4px rgba(13,74,70,0.06)";
    }}
  >
    {primary && (
      <>
        <div style={{ position: "absolute", top: -24, right: -24, width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -16, right: 16, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      </>
    )}
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Outfit', sans-serif", color: primary ? "rgba(255,255,255,0.7)" : T.textMuted }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'DM Serif Display', serif", lineHeight: 1, color: primary ? T.white : T.textPrimary }}>
        {value}
      </div>
      {unit && (
        <div style={{ fontSize: 11, marginTop: 5, fontFamily: "'DM Mono', monospace", color: primary ? "rgba(255,255,255,0.55)" : T.textMuted }}>
          {unit}
        </div>
      )}
    </div>
  </div>
);

// ─── Compact Mobile Trade Card ────────────────────────────────────────────────
const MobileTradeCard = ({ trade, index, sno }) => (
  <div style={{
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    padding: "12px",
    marginBottom: 10,
    boxShadow: "0 2px 6px rgba(13,74,70,0.05)",
    animation: `slideUp .3s ease ${index * 0.03}s both`,
  }}>
    {/* Header Row */}
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      paddingBottom: 8,
      borderBottom: `1px solid ${T.border}`
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: T.teal600,
          color: T.white,
          fontSize: 10,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Outfit', sans-serif"
        }}>
          {sno}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: T.teal700,
          background: T.teal50,
          padding: "3px 8px",
          borderRadius: 5,
          fontWeight: 600
        }}>
          {trade.tradeId?.slice(-8).toUpperCase()}
        </span>
      </div>
      <StatusBadge status={trade.status} />
    </div>

    {/* Main Info Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
      {/* Total Amount */}
      <div style={{
        gridColumn: "1 / -1",
        background: `linear-gradient(135deg, ${T.teal50}, ${T.teal100})`,
        padding: "10px",
        borderRadius: 8,
        border: `1px solid ${T.teal300}`
      }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: T.teal700, marginBottom: 3, letterSpacing: ".05em" }}>
          TOTAL AMOUNT
        </div>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: T.teal800,
          fontFamily: "'DM Serif Display', serif"
        }}>
          ₹{fmt(trade.payment?.totalInr)}
        </div>
      </div>

      {/* Coins */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, marginBottom: 3 }}>COINS</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary }}>
          {fmt(trade.coins?.totalCoins)}
        </div>
      </div>

      {/* Price */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, marginBottom: 3 }}>PRICE/TOKEN</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.textSecondary, fontFamily: "'DM Mono', monospace" }}>
          ₹{fmt(trade.payment?.pricePerCoinInr)}
        </div>
      </div>

      {/* Seller Gets */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, marginBottom: 3 }}>SELLER GETS</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: "'DM Mono', monospace" }}>
          ₹{fmt(trade.payment?.sellerReceivesInr)}
        </div>
      </div>

      {/* Supply */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, marginBottom: 3 }}>SUPPLY</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.teal700 }}>
          {trade.split?.sellerSupplyPct}
        </div>
      </div>
    </div>

    {/* Buyer & Seller */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      paddingTop: 8,
      borderTop: `1px solid ${T.border}`,
      fontSize: 10
    }}>
      <div>
        <div style={{ fontSize: 8, fontWeight: 600, color: T.textMuted, marginBottom: 2 }}>BUYER</div>
        <div style={{ fontWeight: 600, color: T.textPrimary }}>{trade.buyer?.username}</div>
      </div>
      <div>
        <div style={{ fontSize: 8, fontWeight: 600, color: T.textMuted, marginBottom: 2 }}>SELLER</div>
        <div style={{ fontWeight: 600, color: T.textPrimary }}>{trade.seller?.username}</div>
      </div>
    </div>

    {/* Date */}
    <div style={{
      fontSize: 9,
      color: T.textMuted,
      fontFamily: "'DM Mono', monospace",
      textAlign: "center",
      marginTop: 8,
      paddingTop: 6,
      borderTop: `1px solid ${T.border}`
    }}>
      {fmtDateTime(trade.createdAt)}
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
function WpStaking() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isLoading, isError, error, refetch } = useGetWpStakingWalletQuery();
  const { data: historyResponse, isLoading: historyLoading } = useGetP2PHistorySellerQuery({ page, limit, tradeType: "wpStaking" });

  const data = response?.success ? response.data : null;
  const historyData = historyResponse?.data?.trades || [];
  const totalPages = historyResponse?.data?.pagination?.totalPages || 1;

  if (isLoading) return <Loader />;

  if (isError || !response?.success) {
    return (
      <div style={{ minHeight: "60vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ textAlign: "center", padding: "40px 32px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, maxWidth: 340, boxShadow: "0 4px 24px rgba(13,74,70,0.1)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.redDim, border: `1px solid ${T.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 26 }}>⚠️</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.textPrimary, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>Failed to load wallet</div>
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: "'Outfit', sans-serif", marginBottom: 20 }}>
            {error?.data?.message || "Unable to fetch WP staking wallet"}
          </div>
          <button onClick={refetch} style={{ padding: "10px 28px", background: `linear-gradient(135deg, ${T.teal700}, ${T.teal500})`, color: T.white, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 12px rgba(13,148,136,0.3)" }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.borderDark}; border-radius: 3px; }
        
        .th-cell { 
          padding: 10px 12px; 
          text-align: left; 
          font-size: 9px; 
          font-weight: 700; 
          color: ${T.teal800}; 
          letter-spacing: .06em; 
          text-transform: uppercase; 
          font-family: 'Outfit', sans-serif; 
          white-space: nowrap; 
          background: ${T.teal50}; 
          border-bottom: 2px solid ${T.teal300}; 
        }
        
        .td-cell { 
          padding: 12px; 
          font-size: 12px; 
          color: ${T.textSecondary}; 
          font-family: 'Outfit', sans-serif; 
          border-bottom: 1px solid ${T.border}; 
          background: ${T.white}; 
          transition: background .15s;
        }
        
        .tr-row:hover .td-cell { 
          background: ${T.surfaceHover}; 
        }
        
        .tr-row:last-child .td-cell {
          border-bottom: none;
        }
        
        .pg-btn { 
          padding: 6px 14px; 
          font-size: 11px; 
          font-weight: 600; 
          border-radius: 8px; 
          border: 1px solid ${T.border}; 
          background: ${T.surface}; 
          color: ${T.textSecondary}; 
          cursor: pointer; 
          font-family: 'Outfit', sans-serif; 
          transition: all .15s; 
        }
        
        .pg-btn:hover:not(:disabled) { 
          background: ${T.teal50}; 
          color: ${T.teal700}; 
          border-color: ${T.teal300}; 
          transform: translateY(-1px);
        }
        
        .pg-btn:disabled { 
          opacity: 0.4; 
          cursor: not-allowed; 
        }
        
        .pg-btn-active { 
          background: ${T.teal600} !important; 
          color: ${T.white} !important; 
          border-color: ${T.teal600} !important; 
        }
        
        .desktop-table { display: block; }
        .mobile-cards { display: none; }
        
        @media (max-width: 1024px) {
          .desktop-table { display: none; }
          .mobile-cards { display: block; }
        }

        @media (max-width: 480px) {
          .hero-stats { flex-direction: column; align-items: flex-start !important; }
          .hero-mini-stats { width: 100%; }
          .hero-mini-stat { min-width: auto !important; flex: 1; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: T.bg, padding: "20px", fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ maxWidth: 1600, margin: "0 auto" }}>

          {/* ── Header ────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 5, animation: "slideUp .35s ease both", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 3, height: 15, background: T.teal500, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: T.teal600, letterSpacing: ".1em", textTransform: "uppercase" }}>Wealth Plan</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: T.textPrimary, letterSpacing: "-.02em" }}>
                Staking Wallet
              </h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.teal50, border: `1px solid ${T.teal300}`, borderRadius: 20, padding: "5px 15px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.teal500, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: T.teal700, letterSpacing: ".05em" }}>LIVE</span>
            </div>
          </div>

          {/* ── Hero Balance Card ─────────────────── */}
          <div style={{
            background: `linear-gradient(135deg, ${T.teal900} 0%, ${T.teal700} 55%, ${T.teal600} 100%)`,
            borderRadius: 18, padding: "20px", marginBottom: 16,
            position: "relative", overflow: "hidden",
            boxShadow: "0 12px 18px rgba(13,79,74,0.28)",
            animation: "slideUp .4s ease .05s both",
          }}>
            <div style={{ position: "absolute", top: -48, right: -48, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -28, right: -28, width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.teal400}, transparent)`, pointerEvents: "none" }} />

            <div className="hero-stats" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }}>
                  Net Token Balance
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 30, fontWeight: 700, color: T.white, fontFamily: "'DM Serif Display', serif", lineHeight: 1, letterSpacing: "-.02em" }}>
                    {fmt(data.netTokens)}
                  </span>
                  <span style={{ fontSize: 18, color: T.teal300, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>JMC</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 8, fontFamily: "'DM Mono', monospace" }}>
                  Converted on {fmtDate(data.convertedAt)}
                </div>
              </div>

              <div className="hero-mini-stats" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "Total Awarded", value: `${fmt(data.totalTokensAwarded)} JMC` },
                  { label: "Sold in P2P", value: `${fmt(data.totalSoldInP2P)} JMC` },
                ].map(({ label, value }) => (
                  <div key={label} className="hero-mini-stat" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 16px", backdropFilter: "blur(4px)", minWidth: 140 }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.white, fontFamily: "'DM Serif Display', serif" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Metric Row ────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
            <MetricCard label="Total Awarded" value={fmt(data.totalTokensAwarded)} unit="JMC tokens" primary delay={0.1} />
            <MetricCard label="Net Balance" value={fmt(data.netTokens)} unit="JMC available" delay={0.14} />
            <MetricCard label="Sold in P2P" value={fmt(data.totalSoldInP2P)} unit="JMC transferred" delay={0.18} />
          </div>

          {/* ── P2P History ─────────────────────────── */}
          <div style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(13,74,70,0.08)",
            animation: "slideUp .5s ease .2s both",
          }}>
            <div style={{ padding: "20px 24px" }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: T.textPrimary, fontFamily: "'Outfit', sans-serif" }}>
                P2P Transaction History
              </h2>
              <p style={{ margin: 0, fontSize: 12, color: T.textMuted, fontFamily: "'Outfit', sans-serif" }}>
                Complete trading activity for WP staking tokens
              </p>
            </div>

            {historyLoading ? (
              <div style={{ padding: 48, textAlign: "center" }}><Loader /></div>
            ) : historyData.length === 0 ? (
              <div style={{ padding: "60px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, fontFamily: "'Outfit', sans-serif", marginBottom: 5 }}>No transactions yet</div>
                <div style={{ fontSize: 13, color: T.textMuted, fontFamily: "'Outfit', sans-serif" }}>Your P2P trading history will appear here</div>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="desktop-table" style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th className="th-cell" style={{ width: 50, textAlign: "center" }}>S.No</th>
                        <th className="th-cell">Trade ID</th>
                        <th className="th-cell">Status</th>
                        <th className="th-cell">Coins</th>
                        <th className="th-cell">Price/Token</th>
                        <th className="th-cell">Total ₹</th>
                        <th className="th-cell">Seller Gets</th>
                        <th className="th-cell">Supply %</th>
                        <th className="th-cell">Buyer</th>
                        <th className="th-cell">Seller</th>
                        <th className="th-cell">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.map((trade, i) => {
                        const sno = (page - 1) * limit + i + 1;
                        return (
                          <tr key={trade._id || i} className="tr-row">
                            <td className="td-cell" style={{
                              textAlign: "center",
                              fontWeight: 700,
                              color: T.teal700,
                              fontSize: 13
                            }}>
                              {sno}
                            </td>
                            <td className="td-cell">
                              <span style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 10,
                                color: T.teal700,
                                background: T.teal50,
                                padding: "4px 8px",
                                borderRadius: 5,
                                fontWeight: 600,
                                border: `1px solid ${T.teal300}`
                              }}>
                                {trade.tradeId?.slice(-10).toUpperCase()}
                              </span>
                            </td>
                            <td className="td-cell">
                              <StatusBadge status={trade.status} />
                            </td>
                            <td className="td-cell" style={{
                              fontWeight: 700,
                              color: T.textPrimary,
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 13
                            }}>
                              {fmt(trade.coins?.totalCoins)}
                            </td>
                            <td className="td-cell" style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 12,
                              color: T.textSecondary
                            }}>
                              ₹{fmt(trade.payment?.pricePerCoinInr)}
                            </td>
                            <td className="td-cell" style={{
                              fontWeight: 700,
                              color: T.teal700,
                              fontFamily: "'DM Serif Display', serif",
                              fontSize: 15
                            }}>
                              ₹{fmt(trade.payment?.totalInr)}
                            </td>
                            <td className="td-cell" style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 12,
                              color: T.green,
                              fontWeight: 600
                            }}>
                              ₹{fmt(trade.payment?.sellerReceivesInr)}
                            </td>
                            <td className="td-cell" style={{
                              fontWeight: 600,
                              color: T.teal700,
                              fontSize: 12
                            }}>
                              {trade.split?.sellerSupplyPct || "—"}
                            </td>
                            <td className="td-cell" style={{ fontSize: 11 }}>
                              <div style={{ fontWeight: 600, color: T.textPrimary }}>
                                {trade.buyer?.username}
                              </div>
                            </td>
                            <td className="td-cell" style={{ fontSize: 11 }}>
                              <div style={{ fontWeight: 600, color: T.textPrimary }}>
                                {trade.seller?.username}
                              </div>
                            </td>
                            <td className="td-cell" style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 10,
                              color: T.textMuted,
                              whiteSpace: "nowrap"
                            }}>
                              {fmtDateTime(trade.createdAt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="mobile-cards" style={{ padding: "0 16px 16px" }}>
                  {historyData.map((trade, i) => {
                    const sno = (page - 1) * limit + i + 1;
                    return <MobileTradeCard key={trade._id || i} trade={trade} index={i} sno={sno} />;
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{
                    padding: "14px 20px",
                    borderTop: `1px solid ${T.border}`,
                    background: T.teal50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12
                  }}>
                    <span style={{ fontSize: 12, color: T.textMuted, fontFamily: "'Outfit', sans-serif" }}>
                      Page <span style={{ color: T.textSecondary, fontWeight: 600 }}>{page}</span> of{" "}
                      <span style={{ color: T.textSecondary, fontWeight: 600 }}>{totalPages}</span>
                    </span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                      <button className="pg-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                        ← Prev
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const n = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                        return (
                          <button
                            key={n}
                            className={`pg-btn${page === n ? " pg-btn-active" : ""}`}
                            onClick={() => setPage(n)}
                          >
                            {n}
                          </button>
                        );
                      })}
                      <button className="pg-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default WpStaking;
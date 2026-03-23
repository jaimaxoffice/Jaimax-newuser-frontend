import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
// ✅ Swap this for your real RTK Query hook:
import { useGetUserDashboardQuery } from "./DashboardApliSlice";

// ─── Google Font injection ────────────────────────────────────────────────────
if (!document.getElementById("jaimax-fonts")) {
  const l = document.createElement("link");
  l.id = "jaimax-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap";
  document.head.appendChild(l);
}


// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt    = (n) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);
const fmtCur = (n) => `₹${fmt(n)}`;
const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const fmtShort = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  light: {
    bg: "#f0fdfa", card: "#ffffff", cardBorder: "#d1faf4",
    sidebar: "#0c4a4a", sidebarActive: "rgba(45,212,191,0.18)",
    text: "#0f172a", muted: "#5a7a80", subtle: "#f8fffe",
    accent: "#0d9488", accentLight: "#ccfbf1",
    danger: "#f43f5e", dangerLight: "#ffe4e6",
    amber: "#d97706",  amberLight:  "#fef3c7",
    indigo: "#4f46e5", indigoLight: "#e0e7ff",
    gridLine: "#e0f7f2", tooltipBg: "#fff",
    green: "#0d9488", red: "#f43f5e", yellow: "#f59e0b", purple: "#8b5cf6",
  },
  dark: {
    bg: "#080f1a", card: "#0d1b2e", cardBorder: "#162840",
    sidebar: "#060d18", sidebarActive: "rgba(45,212,191,0.12)",
    text: "#dff6f3", muted: "#6b9aaa", subtle: "#0a1525",
    accent: "#2dd4bf", accentLight: "#0a2e2a",
    danger: "#fb7185", dangerLight: "#2b0a12",
    amber: "#fbbf24",  amberLight:  "#2a1a00",
    indigo: "#818cf8", indigoLight: "#1a1840",
    gridLine: "#162840", tooltipBg: "#0d1b2e",
    green: "#2dd4bf", red: "#fb7185", yellow: "#fbbf24", purple: "#a78bfa",
  },
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV = [
  { key: "overview",      label: "Overview",      icon: "◈" },
  { key: "analytics",     label: "Analytics",     icon: "∿" },
  { key: "transactions",  label: "Transactions",  icon: "⇄" },
  { key: "withdrawals",   label: "Withdrawals",   icon: "↑" },
  { key: "invoices",      label: "Invoices",      icon: "⊞" },
  { key: "account",       label: "Account",       icon: "◎" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onNav, t, collapsed, setCollapsed, isDark, toggleTheme }) {
  const S = {
    root: { width: collapsed ? 62 : 216, background: t.sidebar, display: "flex", flexDirection: "column", flexShrink: 0, transition: "width .22s ease", borderRight: "1px solid rgba(255,255,255,0.06)" },
    logo: { padding: collapsed ? "18px 0" : "18px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)", justifyContent: collapsed ? "center" : "flex-start" },
    logoMark: { width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#2dd4bf,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Syne", fontWeight: 800, fontSize: 15, flexShrink: 0 },
    logoText: { fontFamily: "Syne", fontWeight: 800, color: "#fff", fontSize: 16, letterSpacing: 1.5 },
    nav: { flex: 1, padding: "10px 0", overflowY: "auto" },
    bottom: { padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.07)" },
  };
  const navBtn = (isActive) => ({
    width: "100%", display: "flex", alignItems: "center", gap: 11,
    padding: collapsed ? "11px 0" : "10px 16px",
    justifyContent: collapsed ? "center" : "flex-start",
    background: isActive ? t.sidebarActive : "transparent",
    borderLeft: isActive ? "3px solid #2dd4bf" : "3px solid transparent",
    color: isActive ? "#2dd4bf" : "rgba(255,255,255,0.45)",
    cursor: "pointer", border: "none",
    fontFamily: "DM Sans", fontWeight: isActive ? 600 : 400, fontSize: 13.5,
    transition: "all .13s",
  });
  const bottomBtn = { ...navBtn(false), borderLeft: "none", fontSize: 12.5 };

  return (
    <aside style={S.root}>
      <div style={S.logo}>
        <div style={S.logoMark}>J</div>
        {!collapsed && <span style={S.logoText}>JAIMAX</span>}
      </div>
      <nav style={S.nav}>
        {NAV.map(n => (
          <button key={n.key} style={navBtn(active === n.key)} onClick={() => onNav(n.key)}>
            <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0 }}>{n.icon}</span>
            {!collapsed && n.label}
          </button>
        ))}
      </nav>
      <div style={S.bottom}>
        <button style={bottomBtn} onClick={toggleTheme}>
          <span style={{ fontSize: 16 }}>{isDark ? "☀" : "◑"}</span>
          {!collapsed && (isDark ? "Light Mode" : "Dark Mode")}
        </button>
        <button style={bottomBtn} onClick={() => setCollapsed(c => !c)}>
          <span style={{ fontSize: 15 }}>{collapsed ? "▷" : "◁"}</span>
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon, iconBg, iconColor, delta, t }) {
  return (
    <div style={{
      background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16,
      padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14,
      position: "relative", overflow: "hidden", cursor: "default",
      transition: "box-shadow .2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${t.accent}22`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19 }}>{icon}</div>
        {delta !== undefined && (
          <span style={{ fontSize: 11, fontWeight: 700, color: delta >= 0 ? t.accent : t.danger, background: delta >= 0 ? t.accentLight : t.dangerLight, padding: "3px 8px", borderRadius: 20, fontFamily: "DM Sans" }}>
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div>
        <p style={{ color: t.muted, fontSize: 10.5, fontFamily: "DM Sans", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>{label}</p>
        <p style={{ color: t.text, fontSize: 21, fontFamily: "Syne", fontWeight: 700, lineHeight: 1.1 }}>{value}</p>
        {sub && <p style={{ color: t.muted, fontSize: 11.5, fontFamily: "DM Sans", marginTop: 5 }}>{sub}</p>}
      </div>
      <div style={{ position: "absolute", right: -14, bottom: -14, width: 58, height: 58, borderRadius: "50%", background: iconBg, opacity: 0.5 }} />
    </div>
  );
}

// ─── Chart Card ───────────────────────────────────────────────────────────────
function ChartCard({ title, sub, children, t, style: sx = {} }) {
  return (
    <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: "18px 20px", ...sx }}>
      <p style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14.5, color: t.text, marginBottom: sub ? 2 : 14 }}>{title}</p>
      {sub && <p style={{ fontFamily: "DM Sans", fontSize: 11.5, color: t.muted, marginBottom: 14 }}>{sub}</p>}
      {children}
    </div>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
function CTip({ active, payload, label, t }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: t.tooltipBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, padding: "9px 13px" }}>
      <p style={{ color: t.muted, fontSize: 11, fontFamily: "DM Sans", marginBottom: 5 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12.5, fontFamily: "DM Sans", fontWeight: 600 }}>{p.name}: ₹{fmt(p.value)}</p>
      ))}
    </div>
  );
}

// ─── Tx Row ───────────────────────────────────────────────────────────────────
function TxRow({ tx, t }) {
  const cr = tx.transactionType === "Credit";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", borderBottom: `1px solid ${t.cardBorder}` }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: cr ? t.accentLight : t.dangerLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, color: cr ? t.accent : t.danger }}>
        {cr ? "↙" : "↗"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: 12.5, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.transactionId}</p>
        <p style={{ fontFamily: "DM Sans", fontSize: 11, color: t.muted }}>{fmtDate(tx.transactionDate)} · {tx.paymentMode}</p>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: cr ? t.accent : t.danger }}>{cr ? "+" : "−"}{fmtCur(tx.transactionAmount)}</p>
        {tx.transactionFee > 0 && <p style={{ fontFamily: "DM Sans", fontSize: 10.5, color: t.muted }}>Fee ₹{tx.transactionFee}</p>}
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "DM Sans", padding: "3px 9px", borderRadius: 20, background: t.accentLight, color: t.accent, flexShrink: 0 }}>{tx.transactionStatus}</span>
    </div>
  );
}

function WdRow({ w, t }) {
  const amt = parseFloat(w.amount.$numberDecimal);
  const fee = parseFloat(w.admin_inr_charges.$numberDecimal);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", borderBottom: `1px solid ${t.cardBorder}` }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: t.amberLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: t.amber, flexShrink: 0 }}>↑</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: 12.5, color: t.text }}>UTR: {w.utr_number}</p>
        <p style={{ fontFamily: "DM Sans", fontSize: 11, color: t.muted }}>{fmtDate(w.created_at)} · Fee ₹{fee}</p>
      </div>
      <p style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: t.amber }}>−{fmtCur(amt)}</p>
      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "DM Sans", padding: "3px 9px", borderRadius: 20, background: t.accentLight, color: t.accent }}>Paid</span>
    </div>
  );
}

// ─── OVERVIEW PAGE ────────────────────────────────────────────────────────────
function Overview({ d, t }) {
  const { userDetails: u, recentTransactions: txs, withdrawals: wds, credit } = d;
  const totalWithdrawn = wds.reduce((s, w) => s + parseFloat(w.amount.$numberDecimal), 0);
  const totalFees      = wds.reduce((s, w) => s + parseFloat(w.admin_inr_charges.$numberDecimal), 0);

  const wdTrend = [...wds]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map(w => ({ date: fmtShort(w.created_at), amount: parseFloat(w.amount.$numberDecimal), fee: parseFloat(w.admin_inr_charges.$numberDecimal) }));

  const pieData = [
    { name: "Available", value: u.tokens - u.totalOrderedCoins, fill: t.green },
    { name: "Ordered",   value: u.totalOrderedCoins,            fill: t.purple },
  ];

  const RADIAN = Math.PI / 180;
  const pctLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    return <text x={cx + r * Math.cos(-midAngle * RADIAN)} y={cy + r * Math.sin(-midAngle * RADIAN)} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontFamily="DM Sans" fontWeight={700}>{`${(percent * 100).toFixed(0)}%`}</text>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 13 }}>
        <KpiCard label="Token Balance"   value={fmt(u.tokens)}            sub="Available tokens"       icon="🪙" iconBg={t.accentLight}  delta={2.4} t={t} />
        <KpiCard label="INR Balance"     value={fmtCur(u.Inr)}            sub="Wallet balance"         icon="💰" iconBg={t.accentLight}  delta={0.8} t={t} />
        <KpiCard label="Frozen INR"      value={fmtCur(u.freezed_inr)}    sub="Locked amount"          icon="🔒" iconBg={t.amberLight}               t={t} />
        <KpiCard label="Ordered Coins"   value={fmt(u.totalOrderedCoins)} sub="Total purchased"        icon="📦" iconBg={t.indigoLight} delta={5.1} t={t} />
        <KpiCard label="Total Withdrawn" value={fmtCur(totalWithdrawn)}   sub={`${wds.length} payouts`} icon="📤" iconBg={t.dangerLight}             t={t} />
        <KpiCard label="Fees Paid"       value={fmtCur(totalFees)}        sub="Admin charges"          icon="🏷" iconBg={t.amberLight}               t={t} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        <ChartCard title="Withdrawal Trend" sub="Daily amounts — last 10 days" t={t}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={wdTrend} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={t.green} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={t.green} stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={t.gridLine} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: t.muted, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: t.muted, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CTip t={t} />} />
              <Area type="monotone" dataKey="amount" name="Amount" stroke={t.green} strokeWidth={2.5} fill="url(#ag1)" dot={{ r: 3, fill: t.green, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Token Split" sub="Available vs Ordered" t={t}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={78} labelLine={false} label={pctLabel} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip formatter={v => [fmt(v)]} contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, fontFamily: "DM Sans", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans", color: t.muted }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Transactions */}
      <ChartCard title="Recent Transactions" sub="Latest wallet activity" t={t}>
        {d.recentTransactions.map(tx => <TxRow key={tx._id} tx={tx} t={t} />)}
      </ChartCard>
    </div>
  );
}

// ─── ANALYTICS PAGE ───────────────────────────────────────────────────────────
function Analytics({ d, t }) {
  const { recentTransactions: txs, withdrawals: wds } = d;

  const wdSorted = [...wds].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  const barData = wdSorted.map(w => ({
    date: fmtShort(w.created_at),
    amount: parseFloat(w.amount.$numberDecimal),
    fee: parseFloat(w.admin_inr_charges.$numberDecimal),
  }));

  const cumData = wdSorted.reduce((acc, w, i) => {
    const prev = i === 0 ? 0 : acc[i - 1].cumulative;
    acc.push({ date: fmtShort(w.created_at), cumulative: prev + parseFloat(w.amount.$numberDecimal) });
    return acc;
  }, []);

  // Payment mode donut
  const modeMap = {};
  txs.forEach(tx => { modeMap[tx.paymentMode] = (modeMap[tx.paymentMode] || 0) + tx.transactionAmount; });
  const modeData = Object.entries(modeMap).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = [t.green, t.purple, t.yellow, t.red];

  // Credit ratio radial
  const totalAmt  = txs.reduce((s, tx) => s + tx.transactionAmount, 0);
  const creditAmt = txs.filter(tx => tx.transactionType === "Credit").reduce((s, tx) => s + tx.transactionAmount, 0);
  const creditPct = Math.round((creditAmt / (totalAmt || 1)) * 100);
  const radial = [{ name: "Credit", value: creditPct, fill: t.green }];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Amount vs Fee Bar */}
        <ChartCard title="Amount vs Fee" sub="Withdrawal breakdown per day" t={t}>
          <ResponsiveContainer width="100%" height={215}>
            <BarChart data={barData} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
              <CartesianGrid stroke={t.gridLine} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: t.muted, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: t.muted, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CTip t={t} />} />
              <Bar dataKey="amount" name="Amount" fill={t.green}  radius={[5, 5, 0, 0]} maxBarSize={22} />
              <Bar dataKey="fee"    name="Fee"    fill={t.yellow} radius={[5, 5, 0, 0]} maxBarSize={22} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans", color: t.muted }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Payment Mode Donut */}
        <ChartCard title="Payment Mode Split" sub="Volume by payment method" t={t}>
          <ResponsiveContainer width="100%" height={215}>
            <PieChart>
              <Pie data={modeData} cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={4} dataKey="value">
                {modeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={v => [fmtCur(v)]} contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.cardBorder}`, borderRadius: 10, fontFamily: "DM Sans", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans", color: t.muted }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        {/* Cumulative Area */}
        <ChartCard title="Cumulative Withdrawals" sub="Running total of all payouts" t={t}>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={cumData} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
              <defs>
                <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={t.purple} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={t.purple} stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={t.gridLine} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: t.muted, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: t.muted, fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CTip t={t} />} />
              <Area type="monotone" dataKey="cumulative" name="Cumulative" stroke={t.purple} strokeWidth={2.5} fill="url(#ag2)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Radial Credit Ratio */}
        <ChartCard title="Credit Ratio" sub="Credits vs all transactions" t={t}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 195 }}>
            <ResponsiveContainer width="100%" height={150}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="95%" data={radial} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: t.gridLine }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, color: t.green, marginTop: -54 }}>{creditPct}%</p>
            <p style={{ fontFamily: "DM Sans", fontSize: 11.5, color: t.muted, marginTop: 6 }}>Credits of total volume</p>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ─── ACCOUNT PAGE ─────────────────────────────────────────────────────────────
function AccountPage({ u, t }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(u.walletadress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const fields = [
    ["Full Name", u.name.trim()], ["Username", u.username], ["Email", u.email],
    ["Phone", `+${u.countryCode ?? 91} ${u.phone}`], ["Reference ID", u.referenceId],
    ["Country", u.country], ["Member Since", fmtDate(u.createdAt)],
    ["2FA", u.twoFactorEnabled ? "✓ Enabled" : "✗ Disabled"],
    ["Status", u.isActive ? "✓ Active" : "✗ Inactive"],
    ["KYC", u.isVerified ? "✓ Verified" : "Pending"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Hero */}
      <div style={{ borderRadius: 18, background: "linear-gradient(135deg, #0c5a5a 0%, #0d9488 55%, #14b8a6 100%)", padding: "26px 26px", display: "flex", alignItems: "center", gap: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -18, top: -18, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", right: 50, bottom: -28, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <img src={u.profile} alt={u.name} style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.35)", flexShrink: 0 }} onError={e => { e.target.style.display = "none"; }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <p style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 21, color: "#fff" }}>{u.name.trim()}</p>
            {u.isVerified && <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, fontFamily: "DM Sans" }}>✓ Verified</span>}
          </div>
          <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "DM Sans", fontSize: 13.5, marginTop: 2 }}>{u.email}</p>
          <div style={{ display: "flex", gap: 7, marginTop: 10, flexWrap: "wrap" }}>
            {[u.username, `Ref: ${u.referenceId}`, `🇮🇳 +91 ${u.phone}`].map(s => (
              <span key={s} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontFamily: "DM Sans" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Wallet address */}
      <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>🔗</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "DM Sans", fontSize: 11, color: t.muted }}>Wallet Address</p>
          <p style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: t.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.walletadress}</p>
        </div>
        <button onClick={copy} style={{ flexShrink: 0, background: copied ? t.accentLight : t.accentLight, color: t.accent, border: `1px solid ${t.cardBorder}`, borderRadius: 8, padding: "6px 14px", fontFamily: "DM Sans", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Fields */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(195px,1fr))", gap: 10 }}>
        {fields.map(([label, value]) => (
          <div key={label} style={{ background: t.subtle, border: `1px solid ${t.cardBorder}`, borderRadius: 12, padding: "11px 14px" }}>
            <p style={{ fontFamily: "DM Sans", fontSize: 10.5, color: t.muted, marginBottom: 3 }}>{label}</p>
            <p style={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: 13, color: t.text, wordBreak: "break-all" }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function UserDashboard() {
  // ✅ Replace these 3 lines with your RTK Query hook when wiring up:
  const { data: apiData, isLoading, isError } = useGetUserDashboardQuery();
//   const apiData  = MOCK;
//   const isLoading = false;
//   const isError   = false;

  const [page, setPage]       = useState("overview");
  const [isDark, setIsDark]   = useState(false);
  const [collapsed, setCol]   = useState(false);
  const [mobileOpen, setMob]  = useState(false);
  const t = THEMES[isDark ? "dark" : "light"];

  if (isLoading) return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `4px solid ${t.accent}`, borderTopColor: "transparent", animation: "spin .75s linear infinite" }} />
        <p style={{ fontFamily: "DM Sans", color: t.muted, fontSize: 14 }}>Loading dashboard…</p>
      </div>
    </div>
  );

  if (isError || !apiData?.data) return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "DM Sans", color: t.danger, fontWeight: 600 }}>Failed to load. Please try again.</p>
    </div>
  );

  const d = apiData.data;
  const u = d.userDetails;

  const PAGES = {
    overview:     <Overview d={d} t={t} />,
    analytics:    <Analytics d={d} t={t} />,
    transactions: (
      <ChartCard title="All Transactions" sub="Complete transaction history" t={t}>
        {d.recentTransactions.map(tx => <TxRow key={tx._id} tx={tx} t={t} />)}
      </ChartCard>
    ),
    withdrawals: (
      <ChartCard title="Withdrawal History" sub="All processed payouts" t={t}>
        {d.withdrawals.map(w => <WdRow key={w._id} w={w} t={t} />)}
      </ChartCard>
    ),
    invoices: (
      <ChartCard title="Invoices" sub="Purchase invoices" t={t}>
        {u.invoices.map(inv => (
          <div key={inv.invoiceNo} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", borderBottom: `1px solid ${t.cardBorder}` }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: t.indigoLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>📄</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: 13, color: t.text }}>{inv.invoiceNo}</p>
              <p style={{ fontFamily: "DM Sans", fontSize: 11, color: t.muted }}>{fmtDate(inv.orderDate)} · {fmt(inv.coins)} coins</p>
            </div>
            <p style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: t.text }}>{fmtCur(inv.amount)}</p>
            <a href={inv.invoiceUrl} target="_blank" rel="noreferrer" style={{ color: t.accent, fontFamily: "DM Sans", fontSize: 12, fontWeight: 600 }}>View</a>
          </div>
        ))}
      </ChartCard>
    ),
    account: <AccountPage u={u} t={t} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", fontFamily: "DM Sans, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:${t.cardBorder};border-radius:10px}
        @media(max-width:768px){
          .desk-sidebar{display:none!important}
          .mob-btn{display:flex!important}
        }
        @media(min-width:769px){
          .mob-btn{display:none!important}
          .mob-overlay{display:none!important}
        }
      `}</style>

      {/* Desktop sidebar */}
      <div className="desk-sidebar">
        <Sidebar active={page} onNav={setPage} t={t} collapsed={collapsed} setCollapsed={setCol} isDark={isDark} toggleTheme={() => setIsDark(d => !d)} />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mob-overlay" style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }} onClick={() => setMob(false)}>
          <div style={{ width: 216 }} onClick={e => e.stopPropagation()}>
            <Sidebar active={page} onNav={k => { setPage(k); setMob(false); }} t={t} collapsed={false} setCollapsed={() => {}} isDark={isDark} toggleTheme={() => setIsDark(d => !d)} />
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.45)" }} />
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowX: "hidden" }}>
        {/* Header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 10,
          background: isDark ? "rgba(8,15,26,0.88)" : "rgba(240,253,250,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${t.cardBorder}`,
          padding: "12px 22px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <button className="mob-btn" onClick={() => setMob(o => !o)}
              style={{ display: "none", background: t.accentLight, border: "none", borderRadius: 8, padding: "6px 11px", cursor: "pointer", color: t.accent, fontSize: 17 }}>
              ☰
            </button>
            <div>
              <p style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 17, color: t.text }}>{NAV.find(n => n.key === page)?.label}</p>
              <p style={{ fontFamily: "DM Sans", fontSize: 11, color: t.muted }}>{fmtDate(new Date())}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: t.text }}>{u.name.trim().split(" ")[0]}</p>
              <p style={{ fontFamily: "DM Sans", fontSize: 10.5, color: t.muted }}>{u.username}</p>
            </div>
            <img src={u.profile} alt={u.name} style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: `2px solid ${t.accent}` }} onError={e => { e.target.style.display = "none"; }} />
          </div>
        </header>

        {/* Page */}
        <main style={{ flex: 1, padding: "20px 22px", maxWidth: 1080, width: "100%" }}>
          {PAGES[page]}
        </main>

        <footer style={{ padding: "14px 22px", textAlign: "center" }}>
          <p style={{ fontFamily: "DM Sans", fontSize: 10.5, color: t.muted }}>JAIMAX · Last updated {fmtDate(u.updatedAt)}</p>
        </footer>
      </div>
    </div>
  );
}
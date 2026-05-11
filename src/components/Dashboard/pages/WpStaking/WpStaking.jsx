import React, { useState } from "react";
import Loader from "../../../../ReusableComponents/Loader/loader";
import { useGetWpStakingWalletQuery } from "./wpStakingApiSlice";
// import { useGetWpStakingWalletQuery } from "./stakingApiSlice"; // adjust import path
// import Loader from "../../../ReusableComponents/Loader/loader"; // adjust import path

// ─── Formatters ───────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n || 0);

const fmtCurrency = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

const fmtDate = (s) => {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fmtLakh = (n) => {
  if (!n) return "0";
  if (n >= 10000000) return (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return (n / 100000).toFixed(2) + " L";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return fmt(n);
};

// ─── Sparkline ────────────────────────────────────────────────────────────────
const Sparkline = ({ values = [3, 5, 8, 12, 18], color = "#1D9E75" }) => {
  const max = Math.max(...values);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        height: 28,
        marginTop: 6,
      }}
    >
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRadius: "2px 2px 0 0",
            background: color,
            opacity: 0.25 + (i / values.length) * 0.65,
            height: `${Math.round((v / max) * 100)}%`,
            minWidth: 5,
            transition: "height .4s ease",
          }}
        />
      ))}
    </div>
  );
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    active: { bg: "#E1F5EE", color: "#0F6E56", border: "#9FE1CB", dot: true },
    inactive: {
      bg: "#F3F4F6",
      color: "#6B7280",
      border: "#D1D5DB",
      dot: false,
    },
    suspended: {
      bg: "#FEF2F2",
      color: "#B91C1C",
      border: "#FECACA",
      dot: false,
    },
  };
  const s = map[status] || map.inactive;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 500,
        padding: "3px 10px",
        borderRadius: 100,
        background: s.bg,
        color: s.color,
        border: `0.5px solid ${s.border}`,
        textTransform: "capitalize",
      }}
    >
      {s.dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: s.color,
            animation: "pulse 2s infinite",
          }}
        />
      )}
      {status}
    </span>
  );
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({
  value,
  color = "linear-gradient(90deg, #1D9E75, #5DCAA5)",
}) => (
  <div
    style={{
      width: "100%",
      height: 6,
      background: "#E1F5EE",
      borderRadius: 100,
      overflow: "hidden",
      marginTop: 6,
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${Math.min(Math.max(value || 0, 0), 100)}%`,
        background: color,
        borderRadius: 100,
        transition: "width .8s cubic-bezier(.4,0,.2,1)",
      }}
    />
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  label,
  value,
  sub,
  highlight,
  sparkline,
  icon,
  accent,
}) => (
  <div
    style={{
      background: highlight ? "#0F6E56" : "white",
      border: highlight ? "none" : "0.5px solid #e5e7eb",
      borderRadius: 8,
      padding: "1rem 1.1rem",
      position: "relative",
      overflow: "hidden",
      boxShadow: highlight
        ? "0 4px 24px rgba(15,110,86,.22)"
        : "0 1px 4px rgba(0,0,0,.04)",
      transition: "transform .18s, box-shadow .18s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = highlight
        ? "0 8px 32px rgba(15,110,86,.3)"
        : "0 4px 16px rgba(0,0,0,.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = highlight
        ? "0 4px 24px rgba(15,110,86,.22)"
        : "0 1px 4px rgba(0,0,0,.04)";
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -16,
        right: -16,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: highlight ? "rgba(255,255,255,.1)" : "rgba(29,158,117,.06)",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: highlight ? "rgba(255,255,255,.75)" : "#9ca3af",
          marginBottom: 4,
          letterSpacing: ".04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: highlight ? "#fff" : "#111827",
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: highlight ? "rgba(255,255,255,.6)" : "#9ca3af",
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      )}
      {sparkline && (
        <Sparkline
          color={highlight ? "rgba(255,255,255,.7)" : "#1D9E75"}
          values={sparkline}
        />
      )}
    </div>
  </div>
);

// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, mono }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "0.5px solid #f3f4f6",
    }}
  >
    <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
      {label}
    </span>
    <span
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "#111827",
        fontFamily: mono ? "monospace" : undefined,
        letterSpacing: mono ? ".02em" : undefined,
      }}
    >
      {value}
    </span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
function WpStaking() {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetWpStakingWalletQuery();

  const data = response?.success ? response.data : null;

  const settlementProgress = data
    ? ((data.previousDisbursedInr / data.totalInr) * 100).toFixed(1)
    : 0;

  const remainingPercent = data
    ? ((data.remainingInrToSettle / data.totalInr) * 100).toFixed(1)
    : 0;

  if (isLoading) return <Loader />;

  if (isError || !response?.success) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 320, padding: "0 1rem" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#FEF2F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: 24,
            }}
          >
            ⚠️
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#111827",
              marginBottom: 6,
            }}
          >
            Failed to load
          </div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
            {error?.data?.message || "Unable to fetch WP staking wallet"}
          </div>
          <button
            onClick={refetch}
            style={{
              padding: "8px 20px",
              background: "#0F6E56",
              color: "#fff",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .wp-dash { animation: fadeUp .4s ease both; }
        .wp-card { animation: fadeUp .35s ease both; }
      `}</style>

      <div
        className="wp-dash"
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "1.5rem 1rem",
        }}
      >
        <div style={{ maxWidth: 1500, margin: "0 auto" }}>
          {/* ── Header ─────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              gap: ".75rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                  letterSpacing: "-.02em",
                }}
              >
                WP Staking Wallet
              </h1>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: "3px 0 0" }}>
                Wealth plan settlement overview
              </p>
            </div>
            <StatusBadge status={data.status} />
          </div>

          {/* ── Stat Cards ─────────────────────────── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 10,
              marginBottom: "1.25rem",
            }}
          >
            <StatCard
              highlight
              label="Total Tokens Awarded"
              value={`${fmtLakh(data.totalTokensAwarded)} JMC`}
              sub="Lifetime awarded"
            />
            <StatCard
              label="Net Tokens"
              value={`${fmtLakh(data.netTokens)} JMC`}
              sub="Current balance"
              sparkline={[4, 6, 9, 14, 20]}
            />
            <StatCard
              label="Total INR Value"
              value={fmtCurrency(data.totalInr)}
              sub="Portfolio value"
              sparkline={[3, 5, 8, 13, 17]}
            />
            {/* <StatCard
              label="Disbursed INR"
              value={fmtCurrency(data.previousDisbursedInr)}
              sub="Already settled"
            /> */}
            {/* <StatCard
              label="Remaining to Settle"
              value={fmtCurrency(data.remainingInrToSettle)}
              sub="Pending settlement"
            /> */}
            <StatCard
              label="Sold in P2P"
              value={`${fmt(data.totalSoldInP2P)} JMC`}
              sub="Transferred out"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WpStaking;

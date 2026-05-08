// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "12+", label: "Supported cryptocurrencies" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "~5 min", label: "Average payout interval" },
  { value: "256-bit", label: "AES encryption standard" },
];

const features = [
  {
    number: "01",
    title: "Automated Payouts",
    body: "Mining rewards are transferred directly to your wallet on a fixed schedule. No manual withdrawals, no delays — your earnings arrive like clockwork.",
    tag: "Automation",
  },
  {
    number: "02",
    title: "Multi-Coin Support",
    body: "Hold BTC, ETH, LTC, DOGE and 8 more coins in a single unified wallet. Switch between assets instantly without leaving the dashboard.",
    tag: "Flexibility",
  },
  {
    number: "03",
    title: "Bank-Grade Security",
    body: "Every account is protected with AES-256 encryption and two-factor authentication. Your funds are secured at the same standard as traditional financial institutions.",
    tag: "Security",
  },
  {
    number: "04",
    title: "Real-Time Earnings Tracker",
    body: "Live charts updated every minute show your hashrate, daily output, and cumulative earnings. Know exactly what you've made at any point in time.",
    tag: "Insights",
  },
  {
    number: "05",
    title: "Instant Transfers",
    body: "Send crypto to any external wallet in seconds. No withdrawal limits, no hidden fees — just direct peer-to-peer transactions on the blockchain.",
    tag: "Speed",
  },
  {
    number: "06",
    title: "Full Transaction History",
    body: "Every deposit, withdrawal, and payout is logged with a timestamp and block confirmation. Export your full history as CSV for tax reporting or auditing.",
    tag: "Transparency",
  },
];

const supportedCoins = [
  { symbol: "BTC", name: "Bitcoin", color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", color: "#627eea" },
  { symbol: "LTC", name: "Litecoin", color: "#bfbbbb" },
  { symbol: "DOGE", name: "Dogecoin", color: "#c2a633" },
  { symbol: "XMR", name: "Monero", color: "#ff6600" },
  { symbol: "RVN", name: "Ravencoin", color: "#384182" },
  { symbol: "ERG", name: "Ergo", color: "#ff5722" },
  { symbol: "KAS", name: "Kaspa", color: "#49dbc0" },
  { symbol: "ZEC", name: "Zcash", color: "#f4b728" },
  { symbol: "ETC", name: "Ethereum Classic", color: "#328332" },
  { symbol: "FLUX", name: "Flux", color: "#2b61d1" },
  { symbol: "CFX", name: "Conflux", color: "#1e90ff" },
];

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    body: "Sign up in under two minutes. No KYC required to start — just an email and a password.",
  },
  {
    number: "2",
    title: "Connect a Wallet Address",
    body: "Paste in any external wallet address for your chosen coin. We support hardware wallets, software wallets, and exchanges.",
  },
  {
    number: "3",
    title: "Start Mining",
    body: "Point your rig at our pool or choose a cloud plan. Your wallet starts receiving payouts automatically.",
  },
  {
    number: "4",
    title: "Track & Withdraw",
    body: "Monitor live earnings on your dashboard and withdraw to any address at any time, with no minimum threshold.",
  },
];

const faqs = [
  {
    q: "Is there a minimum withdrawal amount?",
    a: "No. You can withdraw any amount at any time. There are no minimum thresholds or lock-in periods on your earned balance.",
  },
  {
    q: "Which wallets are compatible?",
    a: "Any standard crypto wallet works — including Ledger, Trezor, MetaMask, Trust Wallet, and exchange deposit addresses like Binance or Coinbase.",
  },
  {
    q: "How often are payouts processed?",
    a: "Payouts are processed approximately every 5 minutes once your balance crosses the micro-threshold for the selected coin. Most miners receive multiple payouts per day.",
  },
  {
    q: "Is my wallet address stored securely?",
    a: "Yes. All wallet addresses are encrypted at rest using AES-256. They are never shared with third parties or used for anything other than sending your rewards.",
  },
];

// ── Icons ────────────────────────────────────────────────────────────────────

const ArrowIcon = ({ color = "white" }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L17 5v6c0 5-7 7-7 7S3 16 3 11V5l7-3z" stroke="#f46b1a" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M7 10l2 2 4-4" stroke="#f46b1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── FAQ Item ─────────────────────────────────────────────────────────────────

import { useState } from "react";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-0 cursor-pointer gap-4"
      >
        <span className="text-sm font-bold" style={{ color: "var(--clr-navy)", fontFamily: "var(--font-heading)" }}>
          {q}
        </span>
        <span
          className="text-lg flex-shrink-0 leading-none"
          style={{ color: open ? "var(--clr-text)" : "var(--clr-orange)" }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-400 leading-relaxed pr-8">{a}</p>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MineWallet() {
  return (
    <div
      className="w-full min-h-screen"
      style={{
        background: "linear-gradient(160deg, var(--clr-bg-from) 0%, var(--clr-bg-mid) 40%, var(--clr-bg-to) 100%)",
        fontFamily: "var(--font-body)",
        color: "var(--clr-text)",
      }}
    >

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-20 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-orange-100 text-orange-500 tracking-wide uppercase">
          Your Mining Wallet
        </span>
        <h1
          className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
        >
          One Wallet. Every Coin. Always Secure.
        </h1>
        <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10 text-gray-500">
          Receive payouts automatically, track your earnings in real time, and manage multiple cryptocurrencies — all from a single, unified wallet built for serious miners.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            className="flex items-center gap-3 pl-6 pr-2 py-3 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer bg-[#16213e] shadow-[0_4px_18px_rgba(22,33,62,0.28)] hover:opacity-90 active:scale-95 transition-all duration-200"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Connect Your Wallet
            <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
              <ArrowIcon />
            </span>
          </button>
          <button
            className="px-6 py-3 rounded-xl text-sm font-semibold border border-[#16213e]/20 bg-white/50 hover:bg-white/80 transition-all duration-200 cursor-pointer"
            style={{ color: "var(--clr-navy)" }}
          >
            View Supported Coins
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/60 rounded-2xl px-6 py-8 text-center border border-white/80 backdrop-blur-sm"
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
              >
                {s.value}
              </div>
              <div className="text-sm text-gray-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            Everything Your Wallet Needs
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base">
            Built from the ground up for crypto miners — not just holders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.number}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-4xl font-bold text-gray-100 group-hover:text-orange-100 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)", lineHeight: 1 }}
                >
                  {f.number}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-500">
                  {f.tag}
                </span>
              </div>
              <h3
                className="text-[17px] font-bold mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUPPORTED COINS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            12 Coins, One Wallet
          </h2>
          <p className="text-gray-500 text-base">
            Mine any of these coins and receive payouts directly to your wallet.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {supportedCoins.map((coin) => (
            <div
              key={coin.symbol}
              className="bg-white rounded-2xl px-4 py-5 flex flex-col items-center gap-2 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: coin.color }}
              >
                {coin.symbol.slice(0, 2)}
              </div>
              <div
                className="text-xs font-bold text-center"
                style={{ color: "var(--clr-navy)", fontFamily: "var(--font-heading)" }}
              >
                {coin.symbol}
              </div>
              <div className="text-[11px] text-gray-400 text-center leading-tight">{coin.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            Up and Running in 4 Steps
          </h2>
          <p className="text-gray-500 text-base">From zero to first payout in under 10 minutes.</p>
        </div>

        <div className="relative">
          {/* vertical connector */}
          <div
            className="absolute left-[22px] top-8 bottom-8 w-px"
            style={{
              background: "repeating-linear-gradient(to bottom, #f46b1a 0px, #f46b1a 6px, transparent 6px, transparent 14px)",
            }}
          />

          <div className="flex flex-col gap-8">
            {steps.map((s) => (
              <div key={s.number} className="flex gap-6 items-start">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 z-10"
                  style={{ background: "var(--clr-navy)", fontFamily: "var(--font-heading)" }}
                >
                  {s.number}
                </div>
                <div className="bg-white rounded-2xl px-6 py-5 flex-1 border border-gray-100 hover:shadow-sm transition-shadow duration-200">
                  <h3
                    className="text-[16px] font-bold mb-1"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY CALLOUT ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-50">
            <ShieldIcon />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
            >
              Your Security Is Non-Negotiable
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
              We use AES-256 encryption for all stored wallet addresses and credentials. Two-factor authentication is enforced on every login and withdrawal. Our infrastructure runs on isolated, audited servers with no third-party data sharing — ever.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              className="flex items-center gap-3 pl-5 pr-2 py-2.5 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer bg-[#16213e] hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_4px_14px_rgba(22,33,62,0.22)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Learn About Security
              <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            Wallet FAQs
          </h2>
          <p className="text-gray-500 text-base">Common questions about payouts, security, and compatibility.</p>
        </div>
        <div className="bg-white rounded-2xl px-8 py-2 border border-gray-100">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-28">
        <div
          className="rounded-3xl px-10 py-16 text-center"
          style={{ background: "var(--clr-navy)" }}
        >
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Receive Your First Payout?
          </h2>
          <p className="text-white/60 text-base mb-10 max-w-md mx-auto">
            Connect a wallet address in seconds and start earning from your mining pool balance today.
          </p>
          <button
            className="flex items-center gap-3 pl-6 pr-2 py-3 rounded-xl text-sm font-semibold text-[#16213e] bg-white border-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-200 mx-auto shadow-[0_4px_18px_rgba(0,0,0,0.2)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Connect Wallet Now
            <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#16213e]/10">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="#16213e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </section>

    </div>
  );
}
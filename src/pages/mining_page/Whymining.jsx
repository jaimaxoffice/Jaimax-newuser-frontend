// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "$18.3B", label: "Global mining revenue in 2023" },
  { value: "4.2×", label: "Average ROI over 3 years" },
  { value: "420M+", label: "Active crypto wallets worldwide" },
  { value: "24/7", label: "Markets never close" },
];

const reasons = [
  {
    number: "01",
    title: "Passive Income Stream",
    body: "Once your mining rig is set up, it generates crypto around the clock — no active management needed. Your hardware works while you sleep, accumulating rewards every block.",
    tag: "Earnings",
  },
  {
    number: "02",
    title: "Decentralised & Censorship-Resistant",
    body: "Unlike traditional investments, crypto mining isn't tied to any bank, government, or broker. You own your hardware, your keys, and your rewards — completely.",
    tag: "Freedom",
  },
  {
    number: "03",
    title: "Low Barrier to Entry",
    body: "Starting with a single GPU or even a cloud mining plan, anyone can begin mining today. You don't need thousands of dollars or technical expertise to get your first payout.",
    tag: "Accessibility",
  },
  {
    number: "04",
    title: "Hedge Against Inflation",
    body: "Bitcoin's hard cap of 21 million coins means it's deflationary by design. Mining gives you direct exposure to scarce digital assets that historically outpace inflation.",
    tag: "Security",
  },
  {
    number: "05",
    title: "Contribute to the Network",
    body: "Miners don't just earn — they secure the blockchain. Every hash you compute validates transactions and keeps the network trustless, distributed and resilient.",
    tag: "Impact",
  },
  {
    number: "06",
    title: "Scalable at Any Level",
    body: "Start with one machine and scale to a full rack. Our platform grows with you — from hobbyist to professional miner — with no contracts or lock-in periods.",
    tag: "Growth",
  },
];

const comparisons = [
  { label: "Setup time", mining: "< 1 day", traditional: "Weeks of paperwork" },
  { label: "Working hours", mining: "None — fully automated", traditional: "Active daily management" },
  { label: "Ownership", mining: "You own the asset", traditional: "Broker / exchange holds it" },
  { label: "Market hours", mining: "24 / 7 / 365", traditional: "9am – 5pm weekdays" },
  { label: "Inflation hedge", mining: "Built-in scarcity", traditional: "Eroded by money printing" },
  { label: "Entry cost", mining: "From $50 / month", traditional: "Varies, often high minimums" },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Solo miner since 2021",
    quote:
      "I started with a single RTX 3080 and was pocketing my first ETH within 48 hours. The platform made the whole setup trivial.",
    initials: "AM",
  },
  {
    name: "Sofia Reyes",
    role: "Small mining farm owner",
    quote:
      "Scaling from 2 rigs to 18 was painless. The real-time dashboard tells me exactly what each machine is earning at any given moment.",
    initials: "SR",
  },
  {
    name: "David Okonkwo",
    role: "Cloud mining subscriber",
    quote:
      "No hardware, no electricity bills, no noise. I mine BTC from my laptop and the payouts land every Friday like clockwork.",
    initials: "DO",
  },
];

// ── Icons ────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5L13 5" stroke="#f46b1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WhyMining() {
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
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-orange-100 text-orange-600 tracking-wide uppercase"
        >
          Why Crypto Mining?
        </span>
        <h1
          className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
        >
          The Smartest Way to Earn in the Digital Economy
        </h1>
        <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10 text-gray-500">
          Crypto mining isn't just for tech experts. It's a proven, scalable way to build passive income — with assets you actually own.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            className="flex items-center gap-3 pl-6 pr-2 py-3 rounded-xl text-sm font-semibold text-white border-0 cursor-pointer bg-[#16213e] shadow-[0_4px_18px_rgba(22,33,62,0.28)] hover:opacity-90 active:scale-95 transition-all duration-200"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Start Mining Today
            <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
              <ArrowIcon />
            </span>
          </button>
          <button
            className="px-6 py-3 rounded-xl text-sm font-semibold border border-[#16213e]/20 bg-white/50 hover:bg-white/80 transition-all duration-200 cursor-pointer"
            style={{ color: "var(--clr-navy)" }}
          >
            See How It Works
          </button>
        </div>
      </section>

      {/* ── STATS BAND ── */}
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

      {/* ── 6 REASONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            6 Reasons to Start Mining
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base">
            Whether you're building wealth or diversifying your portfolio, here's why thousands of people mine every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.number}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-4xl font-bold text-gray-100 group-hover:text-orange-100 transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)", lineHeight: 1 }}
                >
                  {r.number}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-500">
                  {r.tag}
                </span>
              </div>
              <h3
                className="text-[17px] font-bold mb-3"
                style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
              >
                {r.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            Mining vs. Traditional Investing
          </h2>
          <p className="text-gray-500 text-base">
            See how crypto mining stacks up against conventional routes.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wide">Criteria</div>
            <div
              className="px-6 py-4 text-sm font-bold text-center border-l border-gray-100"
              style={{ color: "var(--clr-orange)", fontFamily: "var(--font-heading)" }}
            >
              Crypto Mining
            </div>
            <div className="px-6 py-4 text-sm font-bold text-center text-gray-400 border-l border-gray-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Traditional
            </div>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <div className="px-6 py-4 text-sm text-gray-500 font-medium">{row.label}</div>
              <div className="px-6 py-4 text-sm font-medium text-center border-l border-gray-100 flex items-center justify-center gap-2"
                style={{ color: "var(--clr-navy)" }}
              >
                <CheckIcon />
                {row.mining}
              </div>
              <div className="px-6 py-4 text-sm text-gray-400 text-center border-l border-gray-100 flex items-center justify-center gap-2">
                <CrossIcon />
                {row.traditional}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
          >
            Real Miners, Real Results
          </h2>
          <p className="text-gray-500 text-base">From hobbyists to full farms — here's what people are saying.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Quote mark */}
              <div
                className="text-5xl leading-none mb-4 font-extrabold text-orange-100"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                "
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 italic">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "var(--clr-navy)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
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
            Ready to Mine Your First Coin?
          </h2>
          <p className="text-white/60 text-base mb-10 max-w-md mx-auto">
            Join over 420,000 miners already earning with Jaimax. Setup takes less than 10 minutes.
          </p>
          <button
            className="flex items-center gap-3 pl-6 pr-2 py-3 rounded-xl text-sm font-semibold text-[#16213e] bg-white border-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-200 mx-auto shadow-[0_4px_18px_rgba(0,0,0,0.2)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Get Started Free
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
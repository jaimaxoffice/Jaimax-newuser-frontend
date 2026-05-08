import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All", "Mining", "Security", "Market", "Guides", "News"];

const featured = {
  id: 1,
  category: "Guides",
  title: "The Complete 2024 Guide to GPU Mining: Setup, Coins & Profitability",
  excerpt:
    "Everything you need to know to start GPU mining this year — from picking the right hardware and OS to calculating your break-even point and choosing the most profitable coin to mine.",
  author: "Arjun Mehta",
  initials: "AM",
  date: "12 Jan 2024",
  readTime: "11 min read",
  tag: "Featured",
};

const posts = [
  {
    id: 2,
    category: "Mining",
    title: "Kaspa vs Ravencoin: Which Is More Profitable to Mine in 2024?",
    excerpt:
      "We ran both coins on identical hardware for 30 days and compared daily earnings, difficulty changes, and long-term outlook.",
    author: "Sofia Reyes",
    initials: "SR",
    date: "8 Jan 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Security",
    title: "How to Secure Your Mining Wallet Against the 5 Most Common Attacks",
    excerpt:
      "Phishing, clipboard hijacking, remote access trojans — here's how professional miners lock down their wallets and rigs.",
    author: "David Okonkwo",
    initials: "DO",
    date: "3 Jan 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Market",
    title: "Bitcoin Halving 2024: What It Means for Miners",
    excerpt:
      "The next halving cuts block rewards in half. We break down what that means for your hashrate, your earnings, and whether to hodl or sell.",
    author: "Arjun Mehta",
    initials: "AM",
    date: "28 Dec 2023",
    readTime: "9 min read",
  },
  {
    id: 5,
    category: "Guides",
    title: "Overclocking Your GPU for Mining: A Safe Step-by-Step Guide",
    excerpt:
      "Boost your hashrate by up to 30% without voiding your warranty or burning out your card. Covers MSI Afterburner, memory timings, and thermal management.",
    author: "Sofia Reyes",
    initials: "SR",
    date: "21 Dec 2023",
    readTime: "8 min read",
  },
  {
    id: 6,
    category: "News",
    title: "Ethereum's Dencun Upgrade and Its Ripple Effect on Alt-Coin Mining",
    excerpt:
      "The latest Ethereum upgrade changed the gas fee landscape. Here's which GPU-minable coins benefited most and which saw their pools dry up.",
    author: "David Okonkwo",
    initials: "DO",
    date: "15 Dec 2023",
    readTime: "5 min read",
  },
  {
    id: 7,
    category: "Mining",
    title: "Solo Mining vs Pool Mining: A Honest Comparison for 2024",
    excerpt:
      "Pool mining offers steady small payouts; solo mining offers rare but large ones. We crunch the real numbers so you can decide what fits your setup.",
    author: "Arjun Mehta",
    initials: "AM",
    date: "10 Dec 2023",
    readTime: "6 min read",
  },
  {
    id: 8,
    category: "Security",
    title: "Two-Factor Authentication for Miners: Which Method Is Actually Safest?",
    excerpt:
      "SMS, authenticator apps, hardware keys — not all 2FA is equal. This deep-dive ranks every method by threat model and ease of use.",
    author: "Sofia Reyes",
    initials: "SR",
    date: "5 Dec 2023",
    readTime: "5 min read",
  },
  {
    id: 9,
    category: "Guides",
    title: "Setting Up a Home Mining Farm: Ventilation, Power & Noise Control",
    excerpt:
      "Turn a spare room into a professional mining setup without overheating, tripping breakers, or driving your household insane.",
    author: "David Okonkwo",
    initials: "DO",
    date: "29 Nov 2023",
    readTime: "10 min read",
  },
];

const categoryColors = {
  Mining: "bg-blue-50 text-blue-600",
  Security: "bg-red-50 text-red-500",
  Market: "bg-amber-50 text-amber-600",
  Guides: "bg-orange-50 text-orange-500",
  News: "bg-green-50 text-green-600",
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MiningBlog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, var(--clr-bg-from) 0%, var(--clr-bg-mid) 40%, var(--clr-bg-to) 100%)",
        fontFamily: "var(--font-body)",
        color: "var(--clr-text)",
      }}
    >
      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-24 pb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-orange-100 text-orange-500 tracking-wide uppercase">
          Jaimax Blog
        </span>
        <h1
          className="text-5xl md:text-6xl font-bold leading-tight mb-5 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
        >
          Insights, Guides & Mining News
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          Practical articles written by miners, for miners. No fluff — just
          actionable knowledge to help you earn more.
        </p>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-16">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer">
          <div className="flex flex-col md:flex-row">
            {/* Illustration placeholder */}
            <div
              className="md:w-2/5 min-h-[260px] flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #16213e 0%, #2e3a55 100%)" }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="30" stroke="rgba(244,107,26,0.4)" strokeWidth="2" />
                <circle cx="40" cy="40" r="18" stroke="rgba(244,107,26,0.6)" strokeWidth="2" />
                <circle cx="40" cy="40" r="8" fill="#f46b1a" />
                <line x1="40" y1="10" x2="40" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="40" y1="60" x2="40" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="10" y1="40" x2="20" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="60" y1="40" x2="70" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-500">
                    {featured.tag}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4 leading-snug group-hover:text-orange-500 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
                >
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xl">
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--clr-navy)" }}
                  >
                    {featured.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "var(--clr-navy)", fontFamily: "var(--font-heading)" }}>
                      {featured.author}
                    </div>
                    <div className="text-xs text-gray-400">
                      {featured.date} · {featured.readTime}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Read article
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="#f46b1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-10">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border-0 cursor-pointer ${
                  isActive
                    ? "bg-[#16213e] text-white shadow-sm"
                    : "bg-white/70 text-gray-500 hover:bg-white hover:text-[#16213e]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-28">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
              >
                {/* Top colour band */}
                <div
                  className="h-2 w-full flex-shrink-0"
                  style={{ background: "var(--clr-orange)", opacity: 0.15 }}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Category badge */}
                  <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-[16px] font-bold mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-200 flex-1"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: "var(--clr-navy)" }}
                      >
                        {post.initials}
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: "var(--clr-navy)", fontFamily: "var(--font-heading)" }}>
                          {post.author}
                        </div>
                        <div className="text-[11px] text-gray-400">{post.date}</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load more */}
        <div className="text-center mt-14">
          <button
            className="px-8 py-3 rounded-xl text-sm font-semibold border border-[#16213e]/20 bg-white/60 hover:bg-white transition-all duration-200 cursor-pointer"
            style={{ color: "var(--clr-navy)", fontFamily: "var(--font-body)" }}
          >
            Load More Articles
          </button>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-28">
        <div
          className="rounded-3xl px-10 py-16 text-center"
          style={{ background: "var(--clr-navy)" }}
        >
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Never Miss a Mining Update
          </h2>
          <p className="text-white/60 text-base mb-10 max-w-md mx-auto">
            Get the latest guides, market insights and profitability tips delivered straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-5 py-3 rounded-xl text-sm outline-none border-0 w-64"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              className="flex items-center gap-3 pl-5 pr-2 py-3 rounded-xl text-sm font-semibold text-[#16213e] bg-white border-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_4px_18px_rgba(0,0,0,0.15)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Subscribe
              <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#16213e]/10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="#16213e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
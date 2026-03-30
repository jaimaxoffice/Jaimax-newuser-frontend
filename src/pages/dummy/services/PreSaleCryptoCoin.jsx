import React, { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  TrendingUp,
  Coins,
  Users,
  Globe,
  ChevronRight,
  Check,
  Download,
  FileText,
  Wallet,
  ArrowBigRight,
  ArrowRight,
  IndianRupee,
  Timer,
  ChartColumn,
  BarChart2,
  Star,
  Flag,
  Layers,
  Smartphone,
  BookOpen,
  Building2,
  Code2,
  Image,
} from "lucide-react";
import { useGetRoundQuery } from "../../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import presale1 from "../../../assets/presalePage/coin.png";
import presale2 from "../../../assets/presalepngiconfinal.webp";
import Seo from "../../../SeoContent/Seo";
import BadgePill from "../BadgePill";

const DOTS = {
  backgroundImage: "radial-gradient(circle,#7fc742 1px,transparent 1px)",
  backgroundSize: "36px 36px",
};

const Sparkle = ({ style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={style}
    className="absolute text-[#7fc742] pointer-events-none select-none"
  >
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
  </svg>
);

function NewPreSaleCryptoCoin() {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  /* ── Schema ─────────────────────────────────────────────────────────── */
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.jaimax.com/#organization",
        name: "Jaimax",
        legalName: "Jaisvik Software Solutions Private Limited",
        url: "https://www.jaimax.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.jaimax.com/logo.webp",
        },
        description:
          "Jaimax is an innovative cryptocurrency project building a financial ecosystem across blockchain, DeFi, NFTs, and crypto education.",
        sameAs: [
          "https://www.instagram.com/jaimax_coin/",
          "https://www.facebook.com/jaimaxcoin/",
          "https://x.com/jaimax_coin",
          "https://www.threads.net/@jaimax_coin",
          "https://in.pinterest.com/jaimax_coin/",
          "https://g.page/r/CdDTqJnUq_5LEBM/review",
          "https://www.youtube.com/@jaimax_coin",
          "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
          "https://t.me/Jaimaxcoinn",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.jaimax.com/#website",
        url: "https://www.jaimax.com/",
        name: "Jaimax",
        publisher: { "@id": "https://www.jaimax.com/#organization" },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": "https://www.jaimax.com/best-presale-crypto-token-in-india",
        url: "https://www.jaimax.com/best-presale-crypto-token-in-india",
        name: "Best Pre-Sale Crypto token in India – Invest Early in Jaimax",
        description:
          "Dedicated presale page for Jaimax Coin, explaining current presale price, allocation, JMC-24 blockchain roadmap and how investors in India can securely participate.",
        isPartOf: { "@id": "https://www.jaimax.com/#website" },
        about: { "@id": "https://www.jaimax.com/#organization" },
        inLanguage: "en",
        keywords: [
          "best pre sale crypto token in India",
          "pre sale crypto token",
          "crypto pre sale token",
          "Jaimax Coin",
          "crypto token in India",
          "pre sale crypto India",
          "new crypto token India",
        ],
        mainEntity: { "@id": "https://www.jaimax.com/#product" },
        breadcrumb: {
          "@id":
            "https://www.jaimax.com/best-presale-crypto-token-in-india#breadcrumb",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.jaimax.com/best-presale-crypto-token-in-india#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.jaimax.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Best Pre-Sale Crypto token in India",
            item: "https://www.jaimax.com/best-presale-crypto-token-in-india",
          },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://www.jaimax.com/#product",
        name: "Jaimax Coin",
        alternateName: "Jaimax Crypto token",
        url: "https://www.jaimax.com/best-presale-crypto-token-in-india",
        image: "https://www.jaimax.com/logo.webp",
        brand: { "@type": "Brand", name: "Jaimax" },
        category: "Cryptocurrency",
        description:
          "Jaimax Coin is an innovative cryptocurrency with a dedicated presale for Indian investors, built on the JMC-24 blockchain for secure trading, DeFi and global digital payments.",
        offers: {
          "@type": "Offer",
          url: "https://www.jaimax.com/best-presale-crypto-token-in-india",
          priceCurrency: "INR",
          price: "0.04",
          priceValidUntil: "2027-08-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": "https://www.jaimax.com/#organization" },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "IN",
            returnPolicyCategory: "https://schema.org/NonRefundable",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
          reviewCount: "127",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.jaimax.com/best-presale-crypto-token-in-india#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why is Jaimax considered the best presale crypto token in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jaimax is considered one of the best pre-sale crypto token in India because it combines a low early entry price, a strong JMC-24 blockchain roadmap, real Web3 utility and a transparent Indian company behind the project.",
            },
          },
          {
            "@type": "Question",
            name: "What is the current presale price of Jaimax Coin?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The current pre-sale price of Jaimax Coin is 0.03 INR per coin, giving early investors high upside potential before public listing.",
            },
          },
          {
            "@type": "Question",
            name: "When does the Jaimax presale end?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Jaimax presale is scheduled to run until August 2027, allowing investors time to accumulate this pre-sale crypto token at its early-stage price.",
            },
          },
          {
            "@type": "Question",
            name: "Is Jaimax suitable for new crypto investors in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, Jaimax is designed to be beginner-friendly with a simple platform, clear presale pricing and educational content, making it ideal for new crypto investors in India.",
            },
          },
          {
            "@type": "Question",
            name: "How do I buy Jaimax Coin during the presale?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To buy Jaimax Coin during the pre-sale, visit the official website at https://www.jaimax.com, create an account, complete KYC, add funds and purchase Jaimax at the presale price.",
            },
          },
        ],
      },
    ],
  };

  /* ── RTK Query ───────────────────────────────────────────────────────── */
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const { data: roundData, refetch } = useGetRoundQuery();
  const liveRounds =
    roundData?.data?.rounds?.filter((r) => r.status === 1) || [];
  const currentRound = liveRounds[0];
  useEffect(() => {
    const id = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(id);
  }, [refetch]);
  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toLocaleString();
  };
  const livePrice = currentRound?.atPriceInr || "0.00";

  /* ── Data ────────────────────────────────────────────────────────────── */
  const features = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: `₹${livePrice} Early Price`,
      desc: "Lock in the lowest possible entry point before the public listing drives price upward.",
      num: "01",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "JMC-24 Blockchain",
      desc: "Fast, scalable, low gas fees built on a Layer-2 architecture designed for India.",
      num: "02",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Registered Company",
      desc: "Backed by Jaisvik Software Solutions — a fully incorporated Indian entity.",
      num: "03",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trusted Community",
      desc: "A rapidly growing Web3 ecosystem with real users, not bots.",
      num: "04",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Web3 Ecosystem",
      desc: "NFTs, DeFi, Wallet, and dApps all under one unified infrastructure.",
      num: "05",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI-Ready",
      desc: "Advanced blockchain architecture primed for the next wave of AI-Web3 convergence.",
      num: "06",
    },
  ];

  const ecosystem = [
    "Jaimax App",
    "Jaimax Wallet",
    "NFT Marketplace",
    "DeFi Tools",
    "Crypto Education Hub",
    "dApps for Businesses",
    "JMC-24 Infrastructure",
    "Dev Tools & APIs",
  ];

  const directBenefits = [
    "Lowest possible price before listing",
    "Higher long-term profits",
    "Priority access to utility features",
    "Early community rewards",
  ];
  const jaimaxBenefits = [
    "Adoption-focused Indian Web3 roadmap",
    "Real use-case ecosystem (not a meme coin)",
    "Transparent business operations",
    "Developer-friendly blockchain",
  ];

  const faqs = [
    {
      q: "Is Jaimax the best pre-sale crypto token in India?",
      a: "Yes. Jaimax offers a strong ecosystem, early-stage price advantage, and future blockchain utility.",
    },
    {
      q: "What is the current price of Jaimax?",
      a: `The pre-sale price is ₹${livePrice}.`,
    },
    { q: "When does the pre-sale end?", a: "August 2027." },
    {
      q: "Is Jaimax a safe investment?",
      a: "Yes. It is backed by Jaisvik Software Solutions Pvt Ltd, ensuring transparency and credibility.",
    },
    {
      q: "Can I buy Jaimax worldwide?",
      a: "Yes. Users from most countries can buy using the website/app.",
    },
  ];

  const whyItems = [
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Transparent Leadership",
      desc: "Open, accountable leadership driving the project with integrity.",
    },
    {
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "Real Tech Development",
      desc: "Cutting-edge blockchain with proven, measurable capabilities.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Community-First Planning",
      desc: "Every decision is made with the community at its core.",
    },
    {
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
      title: "Decentralized Architecture",
      desc: "Built for growth on robust, future-proof infrastructure.",
    },
    {
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      title: "AI-Integrated Presence",
      desc: "Enhanced accessibility through advanced AI integration.",
    },
  ];

  const jmcFeatures = [
    { label: "High-speed Transactions", big: true },
    { label: "Low Gas Fees", big: false },
    { label: "100% EVM Compatible", big: false },
    { label: "Enterprise Security", big: true },
    { label: "Multi-chain Development", big: false },
    { label: "Decentralized Hosting", big: false },
    { label: "Blockchain Domains", big: true },
  ];

  const howSteps = [
    { step: 1, title: "Visit Website", desc: "Go to jaimax.com" },
    { step: 2, title: "Click Register", desc: "Create your account" },
    { step: 3, title: "Complete KYC", desc: "Verify your identity" },
    { step: 4, title: "Add Payment", desc: "Choose payment method" },
    { step: 5, title: "Buy Jaimax", desc: `Purchase at ₹${livePrice}` },
  ];

  /* ── Shared class atoms ──────────────────────────────────────────────── */
  const BADGE =
    "inline-block px-4 py-1 bg-[#e8f5e0] text-[#2d7a3a] text-xs font-bold tracking-widest uppercase rounded-full border border-[#2d7a3a]/30";
  const BTN_PRI =
    "inline-flex items-center gap-2 px-7 py-3 bg-[#2d7a3a] text-white font-semibold text-sm rounded-full shadow-[0_8px_24px_rgba(45,122,58,0.30)] hover:bg-[#1a3d22] transition-all duration-300 hover:scale-105";
  const BTN_OUT =
    "inline-flex items-center gap-2 px-7 py-3 border-2 border-[#2d7a3a] text-[#2d7a3a] font-semibold text-sm rounded-full hover:bg-[#e8f5e0] transition-all duration-300 hover:scale-105";
  const H2 = "font-extrabold text-[#111827] text-3xl md:text-4xl leading-tight";

  return (
    <>
      <Seo page="presalecryptocoin" />

      <div
        className="bg-[var(--color-bg-page)] text-[#111827] overflow-x-hidden"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {/* ══════════════════════════════════════════
            S1 — HERO
        ══════════════════════════════════════════ */}
        <section className="relative max-h-screen flex items-center px-6 xl:px-24 py-16 md:py-12 lg:py-16 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={DOTS}
          />
          <Sparkle
            style={{ width: 26, top: "12%", left: "3%", opacity: 0.5 }}
          />
          <Sparkle
            style={{ width: 16, top: "65%", left: "42%", opacity: 0.35 }}
          />
          <Sparkle
            style={{ width: 30, top: "7%", right: "20%", opacity: 0.4 }}
          />

          {/* right blush panel — narrower on mobile */}
          <div className="absolute top-0 right-0 w-full h-full md:w-[50%] h-full bg-[#b8e07c]/20 md:bg-[#b8e07c]/30 xl:rounded-br-[265px] xl:rounded-tl-[265px] rounded-br-[130px] rounded-tl-[130px] z-0" />

          {/* ── Mobile-only: hero image as faint full-bleed bg ── */}
          <div className="absolute inset-0 z-0 md:hidden pointer-events-none">
            <img
              src={presale1}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-[0.06]"
            />
            {/* subtle radial fade so edges dissolve into bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
          </div>

          <div
            className={`relative z-10 xl:max-w-7xl mx-auto w-full
                grid md:grid-cols-2 gap-10 lg:gap-16 items-center
                transition-all duration-1000
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* ── LEFT ── */}
            <div className="flex flex-col sm:items-start items-center">
              <BadgePill label="Pre Sale Now Live" />

              <h2 className="text-4xl sideHeading lg:text-5xl xl:text-6xl font-bold leading-tight mt-5 mb-5 tracking-[-0.02em] sm:text-start text-center">
                Best PreSale{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  Crypto Token — in India
                </span>
              </h2>

              <p className="text-[#6b7280] text-sm md:text-base leading-relaxed mb-8 max-w-md sm:text-start text-center">
                Jaimax is India's fast-growing blockchain project offering
                investors a chance to buy the{" "}
                <span className="text-[#2d7a3a] font-bold">
                  best presale crypto token in India
                </span>{" "}
                at the early price of{" "}
                <span className="text-[#2d7a3a] font-bold">
                  ₹{livePrice} per token
                </span>
                . Designed for scalability, transparency, and long-term
                adoption, Jaimax aims to become one of the strongest digital
                assets in the Indian Web3 ecosystem.
              </p>

              <div className="flex flex-wrap gap-3 flex-col">
                <a
                  href="https://www.jaimax.com/register"
                  title="jaimax best presale crypto token in india"
                  className={BTN_PRI}
                >
                  Buy Jaimax Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax"
                  title="jaimax Application"
                  className={BTN_OUT}
                >
                  <Download className="w-4 h-4" /> Download App
                </a>
              </div>
            </div>

            {/* ── RIGHT — circular image (hidden on mobile, shown md+) ── */}
            <div className="hidden md:flex relative justify-center items-center border">
              <div className="relative w-100 h-100 lg:w-[400px] lg:h-[400px] xl:w-[495px] xl:h-[495px]">
                {/* glow ring */}
                {/* <div className="absolute inset-0 rounded-full bg-[#b8e07c]/40 scale-110 blur-sm" /> */}
                <img
                  src={presale1}
                  alt="Jaimax presale crypto token"
                  title="presale crypto token in india"
                  className="relative z-10 w-full h-full object-cover
                     "
                />
              
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
    S2 — ABOUT JAIMAX
══════════════════════════════════════════ */}
        <section className="py-12 md:py-16 px-6 bg-[var(--color-bg-surface)]">
          <div className="max-w-6xl w-full text-center sm:mb-6 mx-auto">
            <BadgePill label="About Jaimax" />

            <h2 className="text-4xl sideHeading lg:text-5xl xl:text-6xl font-bold leading-tight mt-5 tracking-[-0.02em]">
              Welcome To{" "}
              <span style={{ color: "var(--color-brand-primary)" }}>
                Jaimax Coin
              </span>
            </h2>
          </div>
          <div className="max-w-7xl mx-auto ">
            {/* ── LEFT: journey path ── */}

            {/* ── RIGHT: content ── */}
            <div className="order-1 md:order-2 flex flex-col text-center">
              <p className="mt-4 text-[#6b7280] text-sm lg:text-base leading-relaxed">
                Jaimax Coin (JMC) is a digital asset designed for secure
                transactions, Web3 applications, NFT ecosystem, decentralised
                finance, and global digital payments.
              </p>
              <p className="mt-3 text-[#6b7280] text-sm md:text-base leading-relaxed">
                Transitioning from BSC to its independent{" "}
                <span className="text-[#2d7a3a] font-medium">
                  Layer-2 blockchain JMC-24
                </span>
                , improving scalability and performance for the entire
                ecosystem.
              </p>

              {/* ── divider ── */}
              <div className="my-3 w-full h-px bg-[#e5f0d5]" />

              {/* ── stats ── */}
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  {
                    icon: <Star className="w-3.5 h-3.5 text-[#7fc742]" />,
                    val: "4.8★",
                    lbl: "App Rating",
                  },
                  {
                    icon: <Users className="w-3.5 h-3.5 text-[#7fc742]" />,
                    val: "127+",
                    lbl: "Investors",
                  },
                  {
                    icon: <Flag className="w-3.5 h-3.5 text-[#7fc742]" />,
                    val: "2027",
                    lbl: "Roadmap",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-[#e5f0d5] rounded-2xl px-4 py-3 hover:border-[#7fc742]/50 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center shrink-0">
                      {s.icon}
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-base font-extrabold text-[#111827]">
                        {s.val}
                      </span>
                      <span className="text-[11px] text-[#9ca3af] mt-0.5 font-medium">
                        {s.lbl}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── CTA ── */}
              <div className="my-8 mx-auto">
                <a
                  href="https://www.jaimax.com/whitepaper"
                  title="jaimax-whitepaper"
                  className={BTN_PRI}
                >
                  <FileText className="w-4 h-4" /> Read Whitepaper
                </a>
              </div>
            </div>
          </div>
          <section className="w-full bg-[--color-bg-overlay] border-y border-[#e5f0d5] px-6 xl:px-24 py-14 md:py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              {/* ── LEFT: headline copy ── */}
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7fc742] mb-3">
                  <span className="w-5 h-[2px] bg-[#7fc742] rounded-full" />
                  Blockchain · Web3 · India
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] leading-snug tracking-tight">
                  India's Most Trusted{" "}
                  <span style={{ color: "var(--color-brand-primary)" }}>
                    Pre-Sale Crypto Token
                  </span>
                </h2>
                <p className="text-[#6b7280] text-sm md:text-base mt-3 leading-relaxed">
                  Early investment.{" "}
                  <span className="text-[#2d7a3a] font-medium">
                    Strong blockchain utility.
                  </span>{" "}
                  High long-term growth potential.
                </p>
              </div>

              {/* ── RIGHT: stats ── */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-3 xl:gap-5 shrink-0">
                {[
                  {
                    icon: (
                      <IndianRupee className="w-3.5 h-3.5 text-[#7fc742]" />
                    ),
                    value: `₹${livePrice}`,
                    label: "Current Price",
                    sub: "Per Token",
                  },
                  {
                    icon: <Timer className="w-3.5 h-3.5 text-[#7fc742]" />,
                    value: "Aug 2027",
                    label: "Pre-Sale Ends",
                    sub: "Limited Window",
                  },
                  {
                    icon: (
                      <ChartColumn className="w-3.5 h-3.5 text-[#7fc742]" />
                    ),
                    value: "JMC-24",
                    label: "Blockchain",
                    sub: "Native Chain",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#f9fdf4] border border-[#e5f0d5] rounded-2xl px-5 py-4 min-w-[160px] hover:border-[#7fc742]/50 hover:shadow-sm transition-all duration-200"
                  >
                    {/* icon bubble */}
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center shrink-0">
                      {s.icon}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9ca3af]">
                        {s.label}
                      </span>
                      <span className="text-xl font-extrabold text-[#111827] tracking-tight leading-snug mt-0.5">
                        {s.value}
                      </span>
                      <span className="text-[11px] text-[#7fc742] font-medium mt-0.5">
                        {s.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        {/* ══════════════════════════════════════════
            S3 — FEATURES (numbered editorial rows)
        ══════════════════════════════════════════ */}
        <style>{`
  @keyframes slideFromLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideFromRight {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .slide-left  { animation: slideFromLeft  1.6s cubic-bezier(.22,.68,0,1.2) both; }
  .slide-right { animation: slideFromRight 1.6s cubic-bezier(.22,.68,0,1.2) both; }
`}</style>

        <section className="py-10 md:py-16 px-6 xl:px-24 bg-[#edf7e0] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* header */}
            <div className=" text-center flex flex-col justify-center items-center">
              <BadgePill label="Features" />
              <h2 className="text-4xl sideHeading mt-2 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
                Why Jaimax is{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  the Best
                </span>
              </h2>
              <p className="text-[#6b7280] text-sm text-center leading-relaxed w-full mb-8">
                Advanced blockchain with real-world use cases built for India
              </p>
            </div>

            {/* ── Row 1: first 3 cards ── left / right / right */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {features.slice(0, 3).map((f, i) => (
                <div
                  key={i}
                  style={{ animationDelay: `${i * 0.12}s` }}
                  className={`group relative bg-white border border-[#d4edba] p-6 flex flex-col gap-4
            hover:border-[#7fc742]/70 hover:shadow-[0_8px_32px_rgba(45,122,58,0.12)]
            transition-colors duration-300 overflow-hidden
            rounded-[24px_24px_4px_24px]
            ${i === 0 ? "slide-left" : "slide-right"}
          `}
                >
                  {/* watermark num */}
                  <span className="absolute -bottom-2 -right-1 text-[72px] font-extrabold text-[#b8e07c]/5 leading-none select-none pointer-events-none transition-colors duration-300 group-hover:text-[#7fc742]/20">
                    {f.num}
                  </span>

                  {/* icon + arrow */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-11 h-11 rounded-[12px_12px_4px_12px] bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center text-[#2d7a3a] group-hover:bg-[#2d7a3a] group-hover:text-white group-hover:border-[#2d7a3a] transition-all duration-300 shrink-0">
                      {f.icon}
                    </div>
                    {/* <span className="w-7 h-7 rounded-full border border-[#d4edba] flex items-center justify-center text-[#b8e07c] text-xs group-hover:bg-[#2d7a3a] group-hover:text-white group-hover:border-[#2d7a3a] transition-all duration-300">
              →
            </span> */}
                  </div>

                  {/* text */}
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold text-[#111827] leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-[#6b7280] text-xs mt-1.5 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Row 2: last 3 cards — all slide from left with stagger ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.slice(3, 6).map((f, i) => (
                <div
                  key={i}
                  style={{ animationDelay: `${0.36 + i * 0.12}s` }}
                  className="group relative bg-white border border-[#d4edba] p-6 flex flex-col gap-4
            hover:border-[#7fc742]/70 hover:shadow-[0_8px_32px_rgba(45,122,58,0.12)]
            transition-colors duration-300 overflow-hidden
            rounded-[4px_24px_24px_24px]
            slide-left
          "
                >
                  {/* watermark num */}
                  <span className="absolute -bottom-2 -right-1 text-[72px] font-extrabold text-[#b8e07c]/5 leading-none select-none pointer-events-none transition-colors duration-300 group-hover:text-[#7fc742]/20">
                    {f.num}
                  </span>

                  {/* icon + arrow */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-11 h-11 rounded-[4px_12px_12px_12px] bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center text-[#2d7a3a] group-hover:bg-[#2d7a3a] group-hover:text-white group-hover:border-[#2d7a3a] transition-all duration-300 shrink-0">
                      {f.icon}
                    </div>
                  </div>

                  {/* text */}
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold text-[#111827] leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-[#6b7280] text-xs mt-1.5 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
    S4 — BENEFITS
══════════════════════════════════════════ */}
        <section className="py-10 md:py-16 px-6 xl:px-24 bg-white overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={DOTS}
          />
          <Sparkle
            style={{ width: 26, top: "7%", right: "4%", opacity: 0.35 }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* ── top header row ── */}
            <div className="flex flex-col items-center mb-8">
              <BadgePill label="Why Invest Early" />
              <h2 className="text-4xl sideHeading mt-2 lg:text-5xl font-bold leading-tight mb-6 tracking-[-0.02em]">
                Early means{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  more.
                </span>
              </h2>

              <p className="text-[#6b7280] text-sm text-center leading-relaxed">
                Pre-sale investors consistently see the highest returns. Jaimax
                gives you that window — before public listing changes
                everything.
              </p>
            </div>

            {/* ── two benefit columns ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Direct Benefits */}
              <div className="bg-[#f9fdf4] border border-[#e5f0d5] rounded-br-[50px] rounded-tl-[50px] p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 rounded-full bg-[#7fc742]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7fc742]">
                    Direct Benefits
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  {directBenefits.map((b, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 py-3.5 border-b border-[#e5f0d5] last:border-0"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center shrink-0 group-hover:bg-[#2d7a3a] group-hover:border-[#2d7a3a] transition-all duration-200">
                        <Check className="w-3 h-3 text-[#2d7a3a] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <span className="text-sm text-[#374151] leading-snug">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jaimax-Specific */}
              <div className="bg-[#2d7a3a] border border-[#2d7a3a] rounded-bl-[50px] rounded-tr-[50px] p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 rounded-full bg-[#b8e07c]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b8e07c]">
                    Jaimax-Specific
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  {jaimaxBenefits.map((b, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 py-3.5 border-b border-white/10 last:border-0"
                    >
                      <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#b8e07c] group-hover:border-[#b8e07c] transition-all duration-200">
                        <Check className="w-3 h-3 text-white group-hover:text-[#2d7a3a] transition-colors duration-200" />
                      </div>
                      <span className="text-sm text-white/85 leading-snug group-hover:text-white transition-colors duration-200">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
    S5 — JMC-24 TECHNOLOGY
══════════════════════════════════════════ */}
        <section className="py-6 md:py-8 px-6 xl:px-24 bg-[#edf7e0] relative overflow-hidden">
          <Sparkle
            style={{ width: 18, top: "5%", left: "3%", opacity: 0.45 }}
          />
          <Sparkle
            style={{ width: 14, bottom: "8%", right: "4%", opacity: 0.35 }}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* ── centered header ── */}
            <div className="flex flex-col items-center text-center mb-12">
              <BadgePill label="Technology" />
              <h2 className="text-3xl sideHeading mt-2 lg:text-4xl font-bold leading-tight  tracking-[-0.02em]">
                Powered By{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  JMC-24 Blockchain
                </span>
              </h2>
              <p className="mt-3 text-[#6b7280] text-sm max-w-md leading-relaxed">
                The upgraded blockchain supports:
              </p>
            </div>

            {/* ── zigzag grid ── */}
            <div className="grid grid-cols-1 mx-auto md:grid-cols-2 gap-y-4 gap-x-6">
              {jmcFeatures.map((tag, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`flex items-center
              ${isLeft ? "justify-end md:justify-end" : "justify-start md:col-start-2"}
            `}
                  >
                    {/* LEFT col pill: number on right end */}
                    {isLeft ? (
                      <div className="flex items-center w-full max-w-[300px]">
                        <div className="flex items-center gap-3 flex-1 bg-white border border-[#e5f0d5] rounded-full pl-4 pr-5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
                          <div className="w-7 h-7 rounded-full bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-[#7fc742]" />
                          </div>
                          <span className="text-sm font-semibold text-[#111827]">
                            {tag.label}
                          </span>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-[#2d7a3a] flex items-center justify-center shrink-0 -ml-3 z-10 shadow-[0_4px_14px_rgba(45,122,58,0.35)]">
                          <span className="text-white font-extrabold text-sm">
                            {i + 1}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* RIGHT col pill: number on left end */
                      <div className="flex items-center w-full max-w-[300px]">
                        <div className="w-11 h-11 rounded-full bg-[#2d7a3a] flex items-center justify-center shrink-0 -mr-3 z-10 shadow-[0_4px_14px_rgba(45,122,58,0.35)]">
                          <span className="text-white font-extrabold text-sm">
                            {i + 1}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-1 bg-white border border-[#e5f0d5] rounded-full pr-4 pl-5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
                          <div className="w-7 h-7 rounded-full bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-[#7fc742]" />
                          </div>
                          <span className="text-sm font-semibold text-[#111827]">
                            {tag.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── CTA ── */}
            <div className="flex justify-center mt-12">
              <a
                href="https://www.jaimax.com/whitepaper"
                title="jaimax-whitepaper"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#2d7a3a] hover:text-white bg-white hover:bg-[#2d7a3a] border border-[#d4edba] hover:border-[#2d7a3a] font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200"
              >
                <FileText className="w-4 h-4" />
                Full tech details in Whitepaper
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
    S6 — ECOSYSTEM
══════════════════════════════════════════ */}

        <section className="py-6 md:py-8 px-6 xl:px-24 bg-[#b8e07c]/25 relative overflow-hidden">
          <Sparkle style={{ width: 20, top: "6%", left: "2%", opacity: 0.4 }} />
          <Sparkle
            style={{ width: 14, bottom: "8%", right: "3%", opacity: 0.35 }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* ── header ── */}
            <div className="flex flex-col items-center text-center gap-4 mb-14">
              <BadgePill label="Ecosystem" />
              <h2 className="text-4xl sideHeading mt-2 lg:text-5xl font-bold leading-tight tracking-[-0.02em]">
                The Jaimax{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  Ecosystem
                </span>
              </h2>
              <p className="text-[#6b7280] text-sm">
                Building a complete Web3 ecosystem
              </p>
            </div>

            {/* ── circle grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 place-items-center max-w-5xl w-full mx-auto">
              {[
                {
                  label: "Jaimax App",
                  icon: <Smartphone className="w-6 h-6" />,
                },
                {
                  label: "Jaimax Wallet",
                  icon: <Wallet className="w-6 h-6" />,
                },
                {
                  label: "NFT Marketplace",
                  icon: <Image className="w-6 h-6" />,
                },
                {
                  label: "DeFi Tools",
                  icon: <BarChart2 className="w-6 h-6" />,
                },
                {
                  label: "Crypto Education Hub",
                  icon: <BookOpen className="w-6 h-6" />,
                },
                {
                  label: "dApps for Businesses",
                  icon: <Building2 className="w-6 h-6" />,
                },
                {
                  label: "JMC-24 Infrastructure",
                  icon: <Layers className="w-6 h-6" />,
                },
                {
                  label: "Dev Tools & APIs",
                  icon: <Code2 className="w-6 h-6" />,
                },
              ].map((item, i) => (
                <div key={i} className="group flex flex-col items-center gap-3">
                  {/* circle */}
                  <div className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-white group-hover:bg-[#2d7a3a] transition-all duration-300 flex items-center justify-center cursor-default shadow-[0_4px_20px_rgba(45,122,58,0.12)] group-hover:shadow-[0_8px_32px_rgba(45,122,58,0.30)]">
                    <span className="text-[#2d7a3a] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>

                  {/* label below */}
                  <p className="text-xs md:text-sm font-semibold text-[#374151] group-hover:text-[#2d7a3a] text-center leading-snug transition-colors duration-300 max-w-[110px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax"
                title="jaimax Application"
                className={BTN_PRI + " shrink-0"}
              >
                <Download className="w-4 h-4" /> Explore App
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
    S7 — HOW TO BUY
══════════════════════════════════════════ */}
        {(() => {
          const [done, setDone] = React.useState(0);

          const check = (i) => {
            if (i === done) setDone(done + 1);
            else if (i < done) setDone(i);
          };

          return (
            <section className="py-6 md:py-8 px-6 xl:px-24 bg-white overflow-hidden">
              <div className="max-w-5xl mx-auto">
                {/* ── header ── */}
                <div className="flex flex-col items-center text-center">
                  <BadgePill label="Get Started" />
                  <h2 className="text-4xl sideHeading mt-2 lg:text-5xl font-bold leading-tight mb-12 tracking-[-0.02em]">
                    How to{" "}
                    <span style={{ color: "var(--color-brand-primary)" }}>
                      Buy Jaimax
                    </span>
                  </h2>
                </div>

                {/* ── desktop stepper ── */}
                <div className="hidden md:flex items-start relative">
                  {/* base line — only between first and last circle centers */}
                  <div
                    className="absolute top-[26px] h-px bg-[#d4edba] z-0"
                    style={{
                      left: "calc(100% / (var(--steps)) / 2)",
                      right: "calc(100% / (var(--steps)) / 2)",
                    }}
                  />

                  {/* simpler: fixed offsets based on step count */}
                  <div className="absolute top-[26px] h-px bg-[#d4edba] z-0 left-[calc(50%/6)] right-[calc(50%/6)]" />

                  {/* green fill — stops at last step, never beyond */}
                  <div
                    className="absolute top-[26px] h-px bg-[#2d7a3a] z-0 transition-all duration-500"
                    style={{
                      left: "calc(50% / 6)",
                      width:
                        done === 0
                          ? "0%"
                          : done >= howSteps.length
                            ? `calc(100% - (50% / 6) * 2)`
                            : `calc((100% - (50% / 6) * 2) * ${done / (howSteps.length - 1)})`,
                    }}
                  />

                  {howSteps.map((item, i) => {
                    const completed = i < done;
                    const active = i === done;
                    const locked = i > done;
                    return (
                      <div
                        key={i}
                        onClick={() => check(i)}
                        className={`flex-1 flex flex-col items-center text-center relative z-10 px-2
                  ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {/* circle */}
                        <div
                          className={`w-[52px] h-[52px] rounded-full border flex items-center justify-center mb-4 transition-all duration-300
                  ${
                    completed
                      ? "bg-[#2d7a3a] border-[#2d7a3a]"
                      : active
                        ? "bg-white border-[#2d7a3a]"
                        : "bg-[#f9fdf4] border-[#d4edba]"
                  }`}
                        >
                          {completed ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <span
                              className={`text-base font-extrabold transition-colors duration-300
                        ${active ? "text-[#2d7a3a]" : "text-[#9ca3af]"}`}
                            >
                              {item.step}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-[#111827] mb-1 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[#9ca3af] text-xs leading-relaxed max-w-[100px]">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* ── mobile vertical ── */}
                <div className="flex flex-col md:hidden relative">
                  {/* base line — only between first and last, not through them */}
                  <div
                    className="absolute left-[25px] w-px bg-[#d4edba]"
                    style={{ top: "52px", bottom: "52px" }}
                  />

                  {/* green fill */}
                  <div
                    className="absolute left-[25px] w-px bg-[#2d7a3a] transition-all duration-500"
                    style={{
                      top: "52px",
                      height:
                        done === 0
                          ? "0px"
                          : done >= howSteps.length
                            ? `calc(100% - 104px)`
                            : `calc((100% - 104px) * ${done / (howSteps.length - 1)})`,
                    }}
                  />

                  {howSteps.map((item, i) => {
                    const completed = i < done;
                    const active = i === done;
                    const locked = i > done;
                    return (
                      <div
                        key={i}
                        onClick={() => check(i)}
                        className={`relative flex items-start gap-5 pb-7 last:pb-0
                  ${locked ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div
                          className={`relative z-10 w-[52px] h-[52px] rounded-full border flex items-center justify-center shrink-0 transition-all duration-300
                  ${
                    completed
                      ? "bg-[#2d7a3a] border-[#2d7a3a]"
                      : active
                        ? "bg-white border-[#2d7a3a]"
                        : "bg-[#f9fdf4] border-[#d4edba]"
                  }`}
                        >
                          {completed ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <span
                              className={`text-sm font-extrabold ${active ? "text-[#2d7a3a]" : "text-[#9ca3af]"}`}
                            >
                              {item.step}
                            </span>
                          )}
                        </div>
                        <div className="pt-3">
                          <h3 className="text-sm font-bold text-[#111827] leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-[#9ca3af] text-xs mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── completion message ── */}
                <div
                  className={`flex justify-center mt-6 transition-all duration-500
          ${done === howSteps.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                >
                  <div className="inline-flex items-center gap-2.5 bg-[#f9fdf4] border border-[#d4edba] rounded-full px-5 py-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#2d7a3a] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#2d7a3a]">
                      You've completed all steps — ready to buy!
                    </span>
                  </div>
                </div>

                {/* ── CTA ── */}
                <div className="flex justify-center mt-6">
                  <a
                    href="https://www.jaimax.com/register"
                    title="jaimax register"
                    className={BTN_PRI}
                  >
                    <Wallet className="w-4 h-4" /> Start Buying Now
                  </a>
                </div>
              </div>
            </section>
          );
        })()}

        {/* ══════════════════════════════════════════
    S8 — WHY #1
══════════════════════════════════════════ */}
        <section className="py-8 md:py-10 px-6 xl:px-24 bg-[#edf7e0] overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* ── header ── */}
            <div className="flex flex-col mb-10 items-center text-center">
              <BadgePill label="Expertise" />
              <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
                Why Jaimax Is India's{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  #1 Pre-Sale Crypto Choice
                </span>
              </h2>

              <p className="text-[#6b7280] text-sm leading-relaxed">
                Five pillars that separate Jaimax from every other pre-sale
                token in the Indian market.
              </p>
            </div>

            {/* ── two-col grid on desktop, single on mobile ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {whyItems.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 bg-white border border-[#e5f0d5] rounded-2xl px-5 py-4
            hover:border-[#7fc742]/50 hover:shadow-[0_4px_20px_rgba(45,122,58,0.08)]
            transition-all duration-200 relative overflow-hidden"
                >
                  {/* left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#d4edba] group-hover:bg-[#2d7a3a] transition-colors duration-200 rounded-l-2xl" />

                  {/* number */}
                  <span className="text-[11px] font-bold text-[#d4edba] group-hover:text-[#b8e07c] w-5 text-center select-none shrink-0 transition-colors duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* icon */}
                  <div
                    className="w-9 h-9 rounded-xl bg-[#edf7e0] border border-[#d4edba] flex items-center justify-center text-[#2d7a3a] shrink-0
            group-hover:bg-[#2d7a3a] group-hover:border-[#2d7a3a] group-hover:text-white transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  </div>

                  {/* text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#111827] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#9ca3af] text-xs mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S9 — FAQ (sticky left + right accordion)
        ══════════════════════════════════════════ */}
        <section className="py-10 px-6 md:px-16 lg:px-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto flex lg:flex-row flex-col items-center justify-between gap-8">
            {/* Sticky left */}
            <div className=" flex flex-col items-center text-center lg:max-w-[40%] w-full">
              <BadgePill label="FAQ" />
              <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight tracking-[-0.02em]">
                Frequently Asked{" "}
                <span style={{ color: "var(--color-brand-primary)" }}>
                  Questions
                </span>
              </h2>
              <p className="mt-5 text-[#6b7280] text-sm leading-relaxed">
                Everything you need to know before investing in India's
                fastest-growing pre-sale crypto project.
              </p>
              <a
                href="https://www.jaimax.com/register"
                className={BTN_PRI + " mt-8"}
              >
                Buy Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Accordion */}
            <div className="md:col-span-3 space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#2d7a3a]/40 shadow-sm" : "border-[#2d7a3a]/15"}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-[#111827] text-sm bg-[#e8f5e0] hover:bg-[#b8e07c]/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${openFaq === i ? "bg-[#2d7a3a] text-white rotate-45" : "bg-[#b8e07c]/40 text-[#2d7a3a]"}`}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 pt-3 text-[#6b7280] text-sm leading-relaxed border-t border-[#2d7a3a]/10 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S10 — CTA (light green, large editorial type)
        ══════════════════════════════════════════ */}
        <section className="py-10 px-6 md:px-16 bg-[#e8f5e0] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={DOTS}
          />
          <Sparkle
            style={{ width: 34, top: "10%", left: "6%", opacity: 0.5 }}
          />
          <Sparkle
            style={{ width: 22, bottom: "14%", right: "8%", opacity: 0.45 }}
          />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <BadgePill label="Get Started Today" />
            <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
              Start Your Jaimax{" "}
              <span style={{ color: "var(--color-brand-primary)" }}>
                Investment Today
              </span>
            </h2>
            <p className="my-6 text-[#6b7280] text-base max-w-md mx-auto">
              Make your early move into India's fastest-growing crypto project
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.jaimax.com/register"
                title="jaimax Register"
                className={BTN_PRI}
              >
                Buy Jaimax · ₹{livePrice}
              </a>
              <a
                href="https://www.jaimax.com/whitepaper"
                title="jaimax-whitepaper"
                className={BTN_OUT}
              >
                Read the Whitepaper
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax"
                title="jaimax Application launch"
                className={BTN_OUT}
              >
                Download App
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
    S11 — SEO PROSE
══════════════════════════════════════════ */}
<section className="relative py-20 px-6 md:px-16 lg:px-24 bg-white">
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={DOTS} />
  <div className="max-w-6xl mx-auto relative z-10">

    <div className="mb-5 text-center">
      <BadgePill label="Deep Dive" />
      <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
        India's Trusted Pre-Sale{" "}
        <span style={{ color: "var(--color-brand-primary)" }}>
          Crypto Token – Jaimax
        </span>
      </h2>
    </div>

    <div className="space-y-6 text-[var(--color-text-primary)] text-base leading-[1.9] max-w-5xl mx-auto w-full text-justify">
      <p>
        Jaimax Coin is emerging as the{" "}
        <a
          href="https://www.jaimax.com/"
          title="jaimax best presale crypto token in india"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
          style={{ color: "var(--color-brand-primary)" }}
        >
          best presale crypto token in India
        </a>
        , designed for investors who want to enter the crypto market early with
        a strong, utility-based project. At a pre-sale price of just{" "}
        <span className="font-extrabold text-xl" style={{ color: "var(--color-brand-primary)" }}>
          ₹{livePrice} per token
        </span>
        , Jaimax gives early buyers a rare opportunity to secure a
        high-potential crypto token before it reaches public exchanges. Instead
        of chasing hype-driven tokens, Jaimax focuses on real technology,
        transparency, and a long-term roadmap, making it one of the most
        promising{" "}
        <a
          href="https://www.jaimax.com/"
          title="jaimax best presale crypto token in india"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
          style={{ color: "var(--color-brand-primary)" }}
        >
          crypto pre-sale tokens
        </a>{" "}
        in the Indian market.
      </p>

      <p>
        Backed by{" "}
        <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
          Jaisvik Software Solutions Private Limited
        </span>
        , Jaimax is built as a complete Web3 ecosystem rather than just a
        simple token. It is designed to support decentralized finance (DeFi),
        NFT applications, digital payments, and scalable blockchain
        infrastructure. This combination of real-world use cases and
        early-stage pricing is what makes investors consider Jaimax among the
        best{" "}
        <a
          href="https://www.jaimax.com/"
          title="jaimax best presale crypto token in india"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
          style={{ color: "var(--color-brand-primary)" }}
        >
          pre sale crypto token
        </a>{" "}
        options available in India today.
      </p>

      <p>
        The project is currently in an active pre-sale phase, giving investors
        enough time to analyze the roadmap, understand the technology, and
        accumulate coins at a fixed low price. Many early-stage investors look
        specifically for a pre-sale crypto token India can call its own — one
        that is rooted in local innovation but built for global adoption. Jaimax
        fits that vision perfectly by combining Indian leadership with a global
        blockchain roadmap.
      </p>

      <p>
        One of the strongest advantages of Jaimax Coin as a crypto pre-sale
        token is its upcoming migration to the{" "}
        <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
          JMC-24 blockchain
        </span>
        , a next-generation Layer-2 network focused on speed, low fees, and
        scalability. This shift will allow developers to build dApps, DeFi
        protocols, and NFT platforms on top of the Jaimax ecosystem, increasing
        the real value and utility of the coin over time. For investors, this
        means Jaimax is not just a speculative{" "}
        <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
          crypto token
        </span>
        , but a long-term infrastructure asset.
      </p>

      <p>
        Security and transparency are key pillars of the Jaimax project. All
        transactions are recorded on the blockchain, the pre-sale price is
        clearly defined, and the vision is openly shared through the project's
        whitepaper and official communication channels.
      </p>

      <p>
        As India continues to explore digital assets and blockchain adoption,
        the demand for a reliable, growth-focused crypto token in India is
        increasing rapidly. Jaimax aims to answer that demand by delivering a
        secure platform, clear tokenomics, and user-friendly access through its
        app and website. Whether you are a beginner exploring your first
        pre-sale or an experienced investor searching for the next
        high-potential{" "}
        <span className="font-semibold" style={{ color: "var(--color-brand-primary)" }}>
          best pre sale crypto token
        </span>
        , Jaimax offers a balanced mix of opportunity and trust.
      </p>

      <blockquote className="border-l-4 border-[#2d7a3a] pl-6 py-1 font-bold text-lg"
        style={{ color: "var(--color-text-primary)" }}>
        In simple terms, Jaimax Coin gives you the chance to invest early, grow
        with a scalable ecosystem, and be part of a project that is built for
        the future of Web3.
      </blockquote>

      <blockquote className="border-l-4 border-[#2d7a3a] pl-6 py-1 font-bold text-lg"
        style={{ color: "var(--color-text-primary)" }}>
        If you are serious about finding a crypto pre-sale token with strong
        fundamentals and a clear roadmap, Jaimax is one of the most compelling
        choices available in India today.
      </blockquote>
    </div>

    <div className="text-center mt-14">
      <a
        href="https://www.jaimax.com/register"
        title="jaimax best presale crypto token in india"
        className={BTN_PRI + " justify-center"}
      >
        BUY JAIMAX AT ₹{livePrice} NOW
      </a>
      <p className="mt-4 text-xs uppercase tracking-widest font-semibold"
        style={{ color: "var(--color-brand-primary)" }}>
        Pre-sale live · ₹{livePrice} will never return after listing
      </p>
    </div>

  </div>
</section>

        {/* ══ GLOBAL STYLES ══ */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');

          @keyframes float {
            0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)}
          }
          .jmx-float { animation: float 5s ease-in-out infinite; }

          @keyframes marquee {
            0%{transform:translateX(0)} 100%{transform:translateX(-50%)}
          }
          @keyframes marquee-rev {
            0%{transform:translateX(-50%)} 100%{transform:translateX(0)}
          }
          .jmx-marquee     { display:flex; width:max-content; animation:marquee     28s linear infinite; }
          .jmx-marquee:hover     { animation-play-state:paused; }
          .jmx-marquee-rev { display:flex; width:max-content; animation:marquee-rev 32s linear infinite; }
          .jmx-marquee-rev:hover { animation-play-state:paused; }
        `}</style>
      </div>
    </>
  );
}

export default NewPreSaleCryptoCoin;

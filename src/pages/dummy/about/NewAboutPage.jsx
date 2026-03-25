import { useState, useEffect, useRef } from "react";
import {
  Shield, TrendingUp, Globe, Users, Coins,
  ArrowRight, Play, X, Check,
  BarChart2, Clock, MessageSquare
} from "lucide-react";
import img1 from "../../../assets/aboutPage/image1.jpeg"
import img2 from "../../../assets/aboutPage/image2.jpeg"
import img3 from "../../../assets/aboutPage/image3.jpeg"
import img4 from "../../../assets/aboutPage/image4.jpeg"
import img5 from "../../../assets/aboutPage/image5.jpeg"
import img6 from "../../../assets/aboutPage/image6.jpeg"
import BadgePill from "../BadgePill";


// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}


function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}


// ─── Data (all content from JaimaxOverview) ───────────────────────────────────


const HERO_FEATURES = [
  {
    icon: <Shield size={14} />,
    title: "Secure & Transparent",
    desc: "Built on advanced blockchain infrastructure ensuring full data integrity and security.",
  },
  {
    icon: <TrendingUp size={14} />,
    title: "User-Focused Platform",
    desc: "Easy to use, fast, and reliable for everyday crypto transactions.",
  },
  {
    icon: <Globe size={14} />,
    title: "Growing Ecosystem",
    desc: "Jaimax continues to expand its utility use cases in trading, payments, and smart applications.",
  },
];


const STATS = [
  { value: "500K+", label: "Active Users" },
  { value: "$2.4B", label: "Volume Traded" },
  { value: "120+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
];


// Real Jaimax/crypto images from JaimaxOverview
const CONVEYOR_IMGS = [
  { src: img4 || "https://m.foolcdn.com/media/dubs/images/Businessman_using_tablet_online_banking_exchan.width-600.jpg", rot: 2 },
  { src: img2 || "https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg", rot: -3 },
  { src: img6 || "https://researchworld.com/uploads/attachments/cl5gw4sah25fd86tdzezrzu0f-gettyimages-1334086618.max.jpg", rot: 4 },
  { src: img3 || "https://images.stockcake.com/public/a/8/5/a852b6e8-6b91-4957-b31a-c7082a74b56e_large/business-discussion-meeting-stockcake.jpg", rot: -2 },
  { src: img5 || "https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/30/full/1648657657-322.jpg?im=FeatureCrop,size=(826,465)", rot: 3 },
  { src: img2 || "https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg", rot: -4 },
  { src: img1 || "https://m.foolcdn.com/media/dubs/images/Businessman_using_tablet_online_banking_exchan.width-600.jpg", rot: 2 },
];


// Vision photo grid — same 3 images from JaimaxOverview vision section
const VISION_PHOTOS = [
  "https://researchworld.com/uploads/attachments/cl5gw4sah25fd86tdzezrzu0f-gettyimages-1334086618.max.jpg",
  "https://images.stockcake.com/public/a/8/5/a852b6e8-6b91-4957-b31a-c7082a74b56e_large/business-discussion-meeting-stockcake.jpg",
  "https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/30/full/1648657657-322.jpg?im=FeatureCrop,size=(826,465)",
];


// WHY cards — exact text from JaimaxOverview features array + community item
const WHY_CARDS = [
  {
    icon: <Shield size={20} />,
    title: "Secure & Transparent",
    desc: "Built on advanced blockchain infrastructure ensuring full data integrity and security.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "User-Focused Platform",
    desc: "Easy to use, fast, and reliable for everyday crypto transactions.",
  },
  {
    icon: <Globe size={20} />,
    title: "Growing Ecosystem",
    desc: "Jaimax continues to expand its utility use cases in trading, payments, and smart applications.",
  },
  {
    icon: <Coins size={20} />,
    title: "Global Vision",
    desc: "Aiming to become one of the top cryptocurrencies in India with an international footprint.",
  },
  {
    icon: <Users size={20} />,
    title: "Community Powered",
    desc: "Our strength lies in our users — a united Jaimax community that believes in long-term value and shared growth.",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "24/7 Support",
    desc: "Round-the-clock support to help every investor navigate their crypto journey with confidence.",
  },
];


// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 transition-colors"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          <X size={24} />
        </button>
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/SsoOifQVL5s?autoplay=1"
            title="Jaimax"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════════
export default function NewAbout() {
  const [videoOpen,  setVideoOpen]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);


  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);


  return (
    <div
      className="w-full min-h-screen overflow-x-hidden"
      style={{ background: "var(--color-bg-page)", fontFamily: "var(--font-body)" }}
    >
      <style>{`
        .font-display { font-family: var(--font-display); }


        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }


        .hero-anim-0 { animation: fadeUp .8s .10s ease both; }
        .hero-anim-1 { animation: fadeUp .8s .25s ease both; }
        .hero-anim-2 { animation: fadeUp .8s .40s ease both; }
        .hero-anim-3 { animation: fadeUp .8s .55s ease both; }


        .card-hover { transition: transform .3s ease, box-shadow .3s ease; }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card);
        }


        .bento-img { transition: transform .5s ease; }
        .bento-img:hover { transform: scale(1.03); }


        .cta-btn-primary {
          background: var(--color-brand-primary);
          color: var(--color-text-on-dark);
          transition: var(--transition-base);
        }
        .cta-btn-primary:hover { background: var(--color-brand-dark); }


        .cta-btn-outline {
          border: 1px solid var(--color-border-accent);
          color: var(--color-text-secondary);
          transition: var(--transition-base);
        }
        .cta-btn-outline:hover { color: var(--color-text-primary); }
      `}</style>


      {/* ════ HERO ════ */}
      <section
        className="relative pt-24 pb-0 overflow-hidden"
        style={{ background: "var(--color-bg-page)" }}
      >
        <div className="text-center px-4 relative z-10 lg:mb-10 ">
          <div className="hero-anim-0 max-w-5xl mx-auto mb-8">
            {/* From JaimaxOverview hero h1 + subtitle */}
             <h2
            className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]"
            
          >
           Building the Future of {" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Digital Finance</span>
          </h2>
          </div>
          <div className="hero-anim-1 ">
            <p
              className="text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed "
              style={{ color: "var(--color-text-secondary)" }}
            >
              A secure, utility-driven crypto token — making blockchain investing simple, safe, and rewarding.
            </p>
            <button className="cta-btn-primary inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full">
              Start Investing <ArrowRight size={14} />
            </button>
          </div>
        </div>


        {/* Infinite conveyor — real Jaimax images */}
        <div
          className="hero-anim-2 relative w-full overflow-hidden"
          style={{ height: "clamp(220px,34vw,280px)" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--color-bg-page), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--color-bg-page), transparent)" }}
          />
          <div
            className="flex items-end h-full gap-3 sm:gap-4"
            style={{ animation: "marquee 18s linear infinite" }}
          >
            {[...CONVEYOR_IMGS, ...CONVEYOR_IMGS].map((p, i) => (
              <div
                key={i}
                className="shrink-0 rounded-2xl overflow-hidden border-[3px] shadow-xl"
                style={{
                  width:           "clamp(110px,16vw,180px)",
                  height:          "clamp(145px,22vw,240px)",
                  background:      "var(--color-brand-light)",
                  borderColor:     "var(--color-bg-surface)",
                  transform:       `rotate(${p.rot}deg)`,
                  transformOrigin: "bottom center",
                  marginBottom:    `${Math.abs(p.rot) * 3}px`,
                }}
              >
                <img src={p.src} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
        </div>


        {/* 3 feature blurbs — exact text from JaimaxOverview features */}
        <div
          className="hero-anim-3 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-px mt-0"
          style={{
            background:  "var(--color-border-accent)",
            borderTop:   "1px solid var(--color-border-accent)",
          }}
        >
          {HERO_FEATURES.map((f, i) => (
            <div
              key={i}
              className="px-8 py-7 text-left"
              style={{ background: "var(--color-bg-page)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "var(--color-bg-overlay)", color: "var(--color-brand-primary)" }}
              >
                {f.icon}
              </div>
              <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--color-text-primary)" }}>
                {f.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ════ OUR MISSION ════ */}
      {/* Heading + both paragraphs taken verbatim from JaimaxOverview mission section */}
      <section className="py-8 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12 max-w-5xl mx-auto">
            {/* <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Empowering financial freedom{" "}
              <span className="italic" style={{ color: "var(--color-brand-primary)" }}>
                through blockchain
              </span>
            </h2> */}
            <h2
            className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading"
          
          >
            Empowering financial freedom{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              All in One Place.
            </span>
          </h2>
            <p className="text-sm sm:text-base max-w-4xl mx-auto leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>
              Jaimax is an innovative cryptocurrency in India designed to transform the way people invest, transact, and grow in the blockchain era. As a secure and utility-driven crypto token, Jaimax brings together technology, transparency, and trust to create a strong foundation for the future of decentralized finance (DeFi).
            </p>
            <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              We believe that digital currency should not just be a trend — it should be a tool for empowerment. That's why Jaimax is built to make crypto investing simple, safe, and rewarding for everyone, from new investors to blockchain experts.
            </p>
          </Reveal>


          {/* Bento grid — card titles/descs from JaimaxOverview missionCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


            {/* Card 1 — Transparency */}
            <Reveal delay={0}>
              <div
                className="card-hover rounded-2xl overflow-hidden relative h-64 sm:h-80"
                style={{ background: "var(--color-brand-mid)" }}
              >
                <img
                  src="https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg"
                  alt="Blockchain Technology"
                  className="bento-img w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,61,34,0.75), transparent)" }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-semibold text-base mb-1" style={{ color: "var(--color-text-on-dark)" }}>
                    Transparency
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>
                    Built on advanced blockchain infrastructure ensuring full data integrity and security for all transactions.
                  </p>
                </div>
              </div>
            </Reveal>


            {/* Card 2 — Experienced Team */}
            <Reveal delay={80}>
              <div
                className="card-hover rounded-2xl border p-4 sm:p-7 h-64 sm:h-80 flex flex-col justify-start gap-3 sm:gap-6"
                style={{ background: "var(--color-bg-surface)", borderColor: "var(--color-border-accent)" }}
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center sm:mb-4 mb-2 shadow-sm"
                    style={{ background: "var(--color-bg-page)" }}
                  >
                    <Users size={20} style={{ color: "var(--color-brand-primary)" }} />
                  </div>
                  <p className="font-semibold text-lg sm:mb-2" style={{ color: "var(--color-text-primary)" }}>
                    Experienced Team
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    Our strength lies in our users — a united Jaimax community that believes in long-term value and shared growth.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {["Long-term value focus", "United investor community", "Shared growth for all"].map(t => (
                    <div key={t} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--color-brand-primary)" }}
                      >
                        <Check size={9} style={{ color: "var(--color-text-on-dark)" }} />
                      </span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>


            {/* Card 3 — Security Guarantee */}
            <Reveal delay={120}>
              <div
                className="card-hover rounded-2xl p-4 sm:p-7 h-56 sm:h-64 flex flex-col justify-between"
                style={{ background: "var(--color-bg-overlay)", border: "1px solid var(--color-border-accent)" }}
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "var(--color-bg-surface)" }}
                  >
                    <Shield size={20} style={{ color: "var(--color-brand-primary)" }} />
                  </div>
                  <p className="font-semibold text-lg mb-2" style={{ color: "var(--color-text-primary)" }}>
                    Security Guarantee
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    We create a complete financial ecosystem that connects opportunity, security, and scalability for every investor.
                  </p>
                </div>
              </div>
            </Reveal>


            {/* Card 4 — Global Vision */}
            <Reveal delay={160}>
              <div
                className="card-hover rounded-2xl overflow-hidden relative h-56 sm:h-64"
                style={{ background: "var(--color-brand-dark)" }}
              >
                <img
                  src="https://researchworld.com/uploads/attachments/cl5gw4sah25fd86tdzezrzu0f-gettyimages-1334086618.max.jpg"
                  alt="Jaimax Global Reach"
                  className="bento-img absolute right-0 bottom-0 w-1/2 h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, var(--color-brand-dark) 40%, transparent)" }}
                />
                <div className="absolute top-6 left-6 right-1/2">
                  <p className="font-semibold text-lg mb-2" style={{ color: "var(--color-text-on-dark)" }}>
                    Global Vision
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                    Aiming to become one of the top cryptocurrencies in India with an international footprint.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════ FOR BEGINNERS ════ */}
      {/* Heading + paragraph verbatim from JaimaxOverview "For Beginners" section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2
            className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading"
          
          >
            Understanding{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
             Crypto
            </span>
          </h2>
            <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Whether you're new to crypto or looking to diversify your portfolio, Jaimax provides a powerful foundation to grow with a trustworthy and forward-looking project. We offer comprehensive guides and educational resources to help you understand the cryptocurrency market and make informed decisions.
            </p>
          </Reveal>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VISION_PHOTOS.map((src, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="card-hover rounded-xl overflow-hidden relative h-64 sm:h-72"
                  style={{ background: "var(--color-brand-light)" }}
                >
                  <img src={src} alt="" className="bento-img w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(26,61,34,0.50), transparent)" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════ WHY CHOOSE JAIMAX ════ */}
      {/* Card titles + descriptions verbatim from JaimaxOverview features array */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" style={{ background: "var(--color-bg-overlay)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            {/* <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "var(--color-text-muted)" }}
            >
              
            </span> */}
            <BadgePill label="Why Choose Jaimax"/>
            <h2
            className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading"
          
          >
            Built for every{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              Investor
            </span>
          </h2>
          </Reveal>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div
                  className="card-hover rounded-2xl p-6 border h-full"
                  style={{ background: "var(--color-bg-surface)", borderColor: "var(--color-border-accent)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "var(--color-bg-page)", color: "var(--color-brand-primary)" }}
                  >
                    {c.icon}
                  </div>
                  <p className="font-semibold text-sm mb-2" style={{ color: "var(--color-text-primary)" }}>
                    {c.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════ VIDEO / OUR VISION ════ */}
      {/* Both paragraphs + checklist verbatim from JaimaxOverview vision section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        
         <Reveal>
          <div className="text-center mb-8">
             
              <BadgePill label="Our Vision"/>
              <h2
            className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading"
          
          >
            A Global Crypto Brand{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              from India
            </span>
          </h2>
          </div>
            </Reveal>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">


          {/* Video card — same YouTube ID as JaimaxOverview */}
          <Reveal>
            <div
              className="card-hover relative rounded-xl overflow-hidden cursor-pointer group h-full sm:h-80"
              style={{ background: "var(--color-brand-mid)" }}
              onClick={() => setVideoOpen(true)}
            >
              <img
                src="https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg"
                alt="Vision"
                className="bento-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0" style={{ background: "rgba(26,61,34,0.35)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "var(--color-bg-surface)" }}
                >
                  <Play size={20} style={{ color: "var(--color-brand-dark)", marginLeft: 3 }} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.70)" }}>Watch Overview</p>
                <p className="font-semibold text-sm" style={{ color: "var(--color-text-on-dark)" }}>
                  Jaimax — Future of DeFi in India
                </p>
              </div>
            </div>
          </Reveal>


          {/* Vision text — exact from JaimaxOverview */}
          
          <div>
           
            <Reveal delay={100}>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
                To position Jaimax Coin as a leading global crypto brand originating from India. We envision a world where blockchain technology enables financial equality, where every transaction is secure, and where every investor can be part of a borderless digital economy.
              </p>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--color-text-secondary)" }}>
                Our goal is to make Jaimax the most trusted cryptocurrency brand in India and across international markets.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-col gap-3 mb-7">
                {[
                  "Decentralized & borderless",
                  "No hidden fees or middlemen",
                  "Smart contract enabled",
                  "Built for emerging markets",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--color-brand-primary)" }}
                    >
                      <Check size={10} style={{ color: "var(--color-text-on-dark)" }} />
                    </span>
                    {t}
                  </div>
                ))}
              </div>
              
            </Reveal>
          </div>
          
        </div>
        <div className="mt-4 sm:mt-8 w-full flex justify-center">
        <button className="cta-btn-primary inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full">
                Join Our Vision <ArrowRight size={15} />
              </button>
              </div>
      </section>


      {/* ════ CTA ════ */}
      {/* Heading + paragraph exact from JaimaxOverview CTA section */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div
              className="rounded-3xl p-10 sm:p-16 text-center"
              style={{ background: "var(--color-brand-dark)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--color-text-accent-lit)" }}
              >
                Our Commitment to Digital Finance
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight"
                style={{ color: "var(--color-text-on-dark)" }}
              >
                Jaimax — Your Gateway to the
                <br />
                <span className="italic" style={{ color: "var(--color-brand-accent)" }}>
                  Future of Digital Finance
                </span>
              </h2>
              <p
                className="text-sm max-w-md mx-auto mb-8 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                At Jaimax, we are dedicated to building trust in digital currency through innovation and integrity. We are creating not just a token, but a complete financial ecosystem that connects opportunity, security, and scalability.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full transition-colors"
                  style={{ background: "var(--color-brand-accent)", color: "var(--color-brand-deepest)" }}
                >
                  Start Investing <ArrowRight size={15} />
                </button>
                <button className="cta-btn-outline inline-flex items-center gap-2 font-semibold text-sm px-7 py-3 rounded-full">
                  Learn More
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}

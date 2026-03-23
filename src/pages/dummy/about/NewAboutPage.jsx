import { useState, useEffect, useRef } from "react";
import {
  Shield, TrendingUp, Globe, Users, Coins,
  ArrowRight, Play, X, Check, ChevronRight,
  Zap, BarChart2, Clock, Star, MessageSquare
} from "lucide-react";

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

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV = ["Services", "Features", "Blog", "Solution"];

// r=rotate(deg), y=translateY(px drop from top), w/h=card size, z=zIndex, bg=card bg color
const HERO_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", bg: "#c2c8d4", r: -15, y: 52, w: 110, h: 145, z: 1 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80", bg: "#c8bcb8", r: -7,  y: 22, w: 128, h: 168, z: 2 },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80", bg: "#c4a09a", r:  0,  y:  0, w: 148, h: 192, z: 3 },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80", bg: "#b0b8c8", r:  7,  y: 22, w: 128, h: 168, z: 2 },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", bg: "#9098b8", r: 15,  y: 52, w: 110, h: 145, z: 1 },
];

const HERO_FEATURES = [
  { icon: <Zap size={14} />, title: "Real-Time Collaboration", desc: "Stay connected and build winning strategies with your community in real time." },
  { icon: <BarChart2 size={14} />, title: "Task & Project Tracking", desc: "Track your investments, milestones, and key goals with intuitive dashboards." },
  { icon: <Star size={14} />, title: "Performance Insights", desc: "Powerful analytics that help you understand your portfolio performance and next steps." },
];

const STATS = [
  { value: "500K+", label: "Active Users" },
  { value: "$2.4B", label: "Volume Traded" },
  { value: "120+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
];

const TEAM_PHOTOS = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&auto=format&fit=crop&q=80",
];

const WHY_CARDS = [
  { icon: <Shield size={20} />, title: "Secure & Transparent", desc: "Built on advanced blockchain infrastructure ensuring full data integrity and security." },
  { icon: <TrendingUp size={20} />, title: "User-Focused Platform", desc: "Easy to use, fast, and reliable for everyday crypto transactions." },
  { icon: <Globe size={20} />, title: "Growing Ecosystem", desc: "Expanding utility in trading, payments, and smart applications globally." },
  { icon: <Coins size={20} />, title: "Global Vision", desc: "Aiming to become one of the top cryptocurrencies with an international footprint." },
  { icon: <Users size={20} />, title: "Community Powered", desc: "A united Jaimax community that believes in long-term value and shared growth." },
  { icon: <MessageSquare size={20} />, title: "24/7 Support", desc: "Round-the-clock support to help every investor navigate their journey." },
];

// ─── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/70 hover:text-white">
          <X size={24} />
        </button>
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          <iframe className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/SsoOifQVL5s?autoplay=1"
            title="Jaimax" frameBorder="0" allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function NewAbout() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: "#f5f0e8", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap');
        .font-serif-display { font-family: 'Instrument Serif', Georgia, serif; }
        @keyframes carouselSpin {
          0%   { transform: rotate(var(--r-from)) translateY(var(--y-from)); opacity: var(--o-from); }
          100% { transform: rotate(var(--r-to))   translateY(var(--y-to));   opacity: var(--o-to); }
        }
        @keyframes subtleBob {
          0%,100% { margin-bottom: var(--mb); }
          50%      { margin-bottom: calc(var(--mb) + 8px); }
        }
        .photo-card { animation: subtleBob 4s ease-in-out infinite; }
        @keyframes fadeSlideIn {
          from { opacity:0; transform: translateY(30px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .hero-anim-0 { animation: fadeSlideIn .8s .1s ease both; }
        .hero-anim-1 { animation: fadeSlideIn .8s .25s ease both; }
        .hero-anim-2 { animation: fadeSlideIn .8s .4s ease both; }
        .hero-anim-3 { animation: fadeSlideIn .8s .55s ease both; }
        .hero-anim-4 { animation: fadeSlideIn .8s .7s ease both; }
        .card-hover { transition: transform .3s ease, box-shadow .3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.10); }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .bento-img { transition: transform .5s ease; }
        .bento-img:hover { transform: scale(1.03); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f5f0e8; }
        ::-webkit-scrollbar-thumb { background: #c8c0b0; border-radius: 3px; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#f5f0e8]/90 backdrop-blur-md shadow-sm" : ""}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-[#444]">
            {NAV.map(l => <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>)}
          </div>
          <span className="font-serif-display text-lg tracking-tight text-black absolute left-1/2 -translate-x-1/2">Jaimax</span>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#444]">
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
            <button className="bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-black transition-colors">
              Get started
            </button>
          </div>
          <button className="md:hidden text-black p-1" onClick={() => setMobileOpen(o => !o)}>
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current" />
            </div>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-[#f5f0e8] border-t border-black/5 px-5 py-4 flex flex-col gap-3">
            {[...NAV, "About", "Pricing", "Contact"].map(l => (
              <a key={l} href="#" className="text-sm text-[#444] hover:text-black py-1">{l}</a>
            ))}
            <button className="self-start bg-[#1a1a1a] text-white text-xs font-semibold px-5 py-2.5 rounded-full mt-1">Get started</button>
          </div>
        )}
      </nav>

      {/* ════ HERO ════ */}
      <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: "#f0ece4" }}>
        {/* Text block */}
        <div className="text-center px-4 relative z-10 mb-10">
          <div className="hero-anim-0 max-w-2xl mx-auto mb-3">
            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-[3.6rem] text-[#1a1a1a] leading-tight">
              Streamline Your Team,<br />
              <span className="italic">Supercharge Your Workflow</span>
            </h1>
          </div>
          <div className="hero-anim-1">
            <p className="text-[#777] text-sm sm:text-base max-w-xs mx-auto mb-6 leading-relaxed">
              All-in-one platform to plan, collaborate,<br />and deliver — faster and smarter.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black transition-colors">
              Get started for Free <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Infinite sliding photo conveyor — continuous left scroll ── */}
        <div className="hero-anim-2 relative w-full overflow-hidden" style={{ height: "clamp(220px, 34vw, 280px)" }}>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #f0ece4, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #f0ece4, transparent)" }} />

          {/* Scrolling track */}
          <div className="flex items-end h-full gap-3 sm:gap-4" style={{ animation: "marquee 18s linear infinite" }}>
            {[
              { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80", bg: "#b8a898", rot:  2 },
              { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80", bg: "#c8b89a", rot: -3 },
              { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80", bg: "#b0c0b8", rot:  4 },
              { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80", bg: "#c8aca0", rot: -2 },
              { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", bg: "#9898b8", rot:  3 },
              { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", bg: "#b8b0a0", rot: -4 },
              { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80", bg: "#a8b8c8", rot:  2 },
              /* duplicate for seamless loop */
              { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80", bg: "#b8a898", rot:  2 },
              { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80", bg: "#c8b89a", rot: -3 },
              { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80", bg: "#b0c0b8", rot:  4 },
              { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80", bg: "#c8aca0", rot: -2 },
              { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", bg: "#9898b8", rot:  3 },
              { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80", bg: "#b8b0a0", rot: -4 },
              { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80", bg: "#a8b8c8", rot:  2 },
            ].map((p, i) => (
              <div
                key={i}
                className="shrink-0 rounded-2xl overflow-hidden border-[3px] border-white shadow-xl"
                style={{
                  width:  "clamp(110px, 16vw, 180px)",
                  height: "clamp(145px, 22vw, 240px)",
                  background: p.bg,
                  transform: `rotate(${p.rot}deg)`,
                  transformOrigin: "bottom center",
                  marginBottom: `${Math.abs(p.rot) * 3}px`,
                }}
              >
                <img src={p.src} alt="" className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </div>
        </div>

        {/* ── 3 feature blurbs ── */}
        <div className="hero-anim-3 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/5 border-t border-black/8 mt-0">
          {HERO_FEATURES.map((f, i) => (
            <div key={i} className="bg-[#f0ece4] px-8 py-7 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#e4ddd0] flex items-center justify-center text-[#555] mb-3">
                {f.icon}
              </div>
              <p className="text-sm font-semibold text-[#1a1a1a] mb-1.5">{f.title}</p>
              <p className="text-xs text-[#888] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════ EVERYTHING YOUR TEAM NEEDS ════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] mb-4">
              Everything Your Team Needs to<br />
              <span className="italic">Work Smarter</span>
            </h2>
            <p className="text-[#888] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              From day one, we built Jaimax to help your team stay connected, organized and moving forward — together.
            </p>
          </Reveal>

          {/* ── Bento grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Card 1 — large image left */}
            <Reveal delay={0}>
              <div className="card-hover rounded-3xl overflow-hidden relative h-64 sm:h-80 bg-[#c8a882]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
                  alt="Team chat"
                  className="bento-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white font-semibold text-base mb-1">Built-in Team Chat</p>
                  <p className="text-white/70 text-xs leading-relaxed">Message teammates instantly, share updates and keep every conversation in context.</p>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — plain right */}
            <Reveal delay={80}>
              <div className="card-hover rounded-3xl bg-[#f0ebe0] border border-black/5 p-7 h-64 sm:h-80 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                    <BarChart2 size={20} className="text-[#1a1a1a]" />
                  </div>
                  <p className="font-semibold text-[#1a1a1a] text-lg mb-2">Task Assignment</p>
                  <p className="text-[#888] text-sm leading-relaxed">Easily create, assign, and track tasks to keep everyone aligned and accountable.</p>
                </div>
                <div className="flex flex-col gap-2">
                  {["Drag & drop board", "Due date reminders", "Priority labeling"].map(t => (
                    <div key={t} className="flex items-center gap-2 text-xs text-[#666]">
                      <span className="w-4 h-4 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                        <Check size={9} className="text-white" />
                      </span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Card 3 — muted beige */}
            <Reveal delay={120}>
              <div className="card-hover rounded-3xl bg-[#d9d0c0] p-7 h-56 sm:h-64 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center mb-4">
                    <Clock size={20} className="text-[#1a1a1a]" />
                  </div>
                  <p className="font-semibold text-[#1a1a1a] text-lg mb-2">Real-Time Scheduling</p>
                  <p className="text-[#555] text-sm leading-relaxed">Plan sprints, set deadlines and keep your team in sync with a shared live calendar.</p>
                </div>
              </div>
            </Reveal>

            {/* Card 4 — dark green with image */}
            <Reveal delay={160}>
              <div className="card-hover rounded-3xl overflow-hidden relative h-56 sm:h-64 bg-[#2d4a35]">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&auto=format&fit=crop&q=80"
                  alt="Progress"
                  className="bento-img absolute right-0 bottom-0 w-1/2 h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2d4a35] via-[#2d4a35]/80 to-transparent" />
                <div className="absolute top-6 left-6 right-1/2">
                  <p className="text-white font-semibold text-lg mb-2">Progress Tracking</p>
                  <p className="text-white/60 text-xs leading-relaxed">Visualize team performance with dashboards that highlight what's done and what's next.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════ STATS ════ */}
      <section className="py-14 px-4 sm:px-6 border-y border-black/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <p className="font-serif-display text-4xl sm:text-5xl text-[#1a1a1a] mb-1">{s.value}</p>
              <p className="text-[#999] text-xs font-medium uppercase tracking-widest">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════ PROVEN RESULTS ════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] mb-4">
              Proven Results, <span className="italic">Real Impact</span>
            </h2>
            <p className="text-[#888] text-sm max-w-md mx-auto leading-relaxed">
              Teams around the world are already transforming how they work and grow together.
            </p>
          </Reveal>

          {/* Bento row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TEAM_PHOTOS.map((src, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="card-hover rounded-3xl overflow-hidden relative h-64 sm:h-72 bg-[#ddd]">
                  <img src={src} alt="" className="bento-img w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ WHY JAIMAX ════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#ede8dc]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-3 block">Why Choose Jaimax</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a]">
              Built for Every <span className="italic">Investor</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="card-hover bg-white rounded-2xl p-6 border border-black/5 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#f0ebe0] flex items-center justify-center text-[#1a1a1a] mb-4">
                    {c.icon}
                  </div>
                  <p className="font-semibold text-[#1a1a1a] text-sm mb-2">{c.title}</p>
                  <p className="text-[#888] text-xs leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ VIDEO / VISION ════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Video card */}
          <Reveal>
            <div
              className="card-hover relative rounded-3xl overflow-hidden cursor-pointer group h-72 sm:h-80 bg-[#c8a882]"
              onClick={() => setVideoOpen(true)}
            >
              <img
                src="https://www.techfunnel.com/wp-content/uploads/2024/10/Blockchain-in-Corporate-Finance.jpg"
                alt="Vision"
                className="bento-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play size={20} className="text-[#1a1a1a] ml-1" fill="#1a1a1a" />
                </div>
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="text-white/70 text-xs mb-0.5">Watch Overview</p>
                <p className="text-white font-semibold text-sm">Jaimax — Future of DeFi in India</p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#888] mb-4 block">Our Vision</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#1a1a1a] mb-5 leading-tight">
                A Global Crypto Brand <br /><span className="italic">from India</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-[#666] text-sm leading-relaxed mb-5">
                To position Jaimax Coin as a leading global crypto brand originating from India — where blockchain enables financial equality and every investor can be part of a borderless digital economy.
              </p>
              <p className="text-[#666] text-sm leading-relaxed mb-7">
                We believe digital currency should be a tool for empowerment — making crypto investing simple, safe, and rewarding for everyone.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-col gap-3 mb-7">
                {["Decentralized & borderless", "No hidden fees or middlemen", "Smart contract enabled", "Built for emerging markets"].map(t => (
                  <div key={t} className="flex items-center gap-3 text-sm text-[#555]">
                    <span className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <Check size={10} className="text-white" />
                    </span>
                    {t}
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-black transition-colors">
                Join Our Vision <ArrowRight size={15} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-[#1a1a1a] rounded-3xl p-10 sm:p-16 text-center">
              <p className="text-[#888] text-xs font-semibold uppercase tracking-widest mb-5">Get Started</p>
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
                Your Gateway to the<br /><span className="italic">Future of Finance</span>
              </h2>
              <p className="text-[#666] text-sm max-w-md mx-auto mb-8 leading-relaxed">
                At Jaimax, we are dedicated to building trust in digital currency through innovation and integrity. Join thousands of investors already on the journey.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-semibold text-sm px-7 py-3 rounded-full hover:bg-[#f0ebe0] transition-colors">
                  Start Investing <ArrowRight size={15} />
                </button>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white font-semibold text-sm px-7 py-3 rounded-full transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-black/8 py-8 px-4 sm:px-6 text-center">
        <p className="text-[#aaa] text-xs">© 2024 Jaimax · Built by Jaisvik Software Solutions Pvt. Ltd.</p>
      </footer>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}
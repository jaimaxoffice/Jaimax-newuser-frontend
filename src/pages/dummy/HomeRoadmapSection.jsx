import { useState, useRef, useEffect, useCallback } from "react";
import BadgePill from "./BadgePill";
import { ArrowLeft, ArrowRight } from "lucide-react";
import coin from "../../assets/dummy/coinImage.png";

const roadmapData = [
  {
    year: "2024",
    num: "01",
    title: "Foundation & Launch Phase",
    status: "completed",
    phases: [
      "Concept development and team formation of the core Jaimax team.",
      "Official website launch introducing the Jaimax ecosystem.",
      "Publication of the detailed whitepaper outlining goals and tokenomics.",
      "Public ICO launch and community onboarding.",
      "Release of the Jaimax mobile application for early users.",
    ],
  },
  {
    year: "2025",
    num: "02",
    title: "Integration & Growth",
    status: "completed",
    phases: [
      "Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
      "Integration of DigiLocker KYC for secure user verification.",
      "Launch of token swapping within the Jaimax ecosystem.",
      "Enable users to buy JMC through Binance exchange wallet connectivity.",
    ],
  },
  {
    year: "2026",
    num: "03",
    title: "Blockchain & Platform Expansion",
    status: "active",
    phases: [
      "Development of Jaimax's own blockchain infrastructure.",
      "Launch of DeFi features to enhance financial accessibility.",
      "Launch of the NFT Platform.",
      "Deployment of DApps across Education, Gaming, Tourism, and Finance.",
      "Launch of person-to-person (P2P) buying and selling functionality.",
      "Launch of Jaimax's own payment gateway for seamless transactions.",
    ],
  },
  {
    year: "2027",
    num: "04",
    title: "Global Presence",
    status: "future",
    phases: [
      "Launch of the Jaimax Social Hub to connect users, traders, and developers.",
      "Launch of the Jaimax Exchange for direct token trading.",
      "Trading live for all verified users.",
      "Expansion to global exchange listings.",
    ],
  },
];

const STATUS = {
  completed: {
    label: "Completed",
    pill: "text-white bg-[#2d7a3a] border border-[#2d7a3a]",
    num: "text-[#2d7a3a]",
    dot: "bg-[#2d7a3a]",
    nodeBg: "bg-[#2d7a3a]",
    ring: "ring-4 ring-[#2d7a3a]/20",
    bar: "bg-[#2d7a3a]",
    barW: "100%",
    pct: "100%",
    hex: "#2d7a3a",
    mobilePill:
      "text-[#2d7a3a] bg-[rgba(45,122,58,0.10)] border border-[rgba(45,122,58,0.30)]",
  },
  active: {
    label: "In Progress",
    pill: "text-[#4a9858] bg-[rgba(74,152,88,0.12)] border border-[rgba(74,152,88,0.35)]",
    num: "text-[#4a9858]",
    dot: "bg-[#4a9858]",
    nodeBg: "bg-[#4a9858]",
    ring: "ring-4 ring-[#4a9858]/25",
    bar: "bg-[#4a9858]",
    barW: "35%",
    pct: "35%",
    hex: "#4a9858",
    mobilePill:
      "text-[#4a9858] bg-[rgba(74,152,88,0.12)] border border-[rgba(74,152,88,0.35)]",
  },
  future: {
    label: "Upcoming",
    pill: "text-[#9ca3af] bg-[rgba(156,163,175,0.15)] border border-[rgba(45,122,58,0.30)]",
    num: "text-[#9ca3af]",
    dot: "bg-[#9ca3af]",
    nodeBg: "bg-[#9ca3af]",
    ring: "ring-4 ring-[#9ca3af]/20",
    bar: "bg-[#9ca3af]",
    barW: "0%",
    pct: "0%",
    hex: "#9ca3af",
    mobilePill:
      "text-[#9ca3af] bg-[rgba(156,163,175,0.15)] border border-[rgba(45,122,58,0.30)]",
  },
};

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);
const CircleIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" fill="#fff" />
  </svg>
);
const ChevLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const mod = (n, m) => ((n % m) + m) % m;
const total = roadmapData.length;

function MobileRoadmap() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const startXRef = useRef(0);

  const goTo = useCallback(
    (dir) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((c) => mod(c + dir, total));
      setTimeout(() => setAnimating(false), 450);
    },
    [animating],
  );

  const onPointerDown = (e) => {
    startXRef.current = e.clientX;
    setDragging(true);
    setDragX(0);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    setDragX(e.clientX - startXRef.current);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX < -60) goTo(1);
    else if (dragX > 60) goTo(-1);
    setDragX(0);
  };

  const getCardStyle = (i) => {
    const offset = mod(i - current, total);
    const isActive = offset === 0;
    const isDragging = dragging && isActive;
    if (isActive)
      return {
        transform: `translateX(${isDragging ? dragX : 0}px) rotate(${isDragging ? dragX * 0.04 : 0}deg) scale(1)`,
        opacity: 1,
        zIndex: 10,
        boxShadow: "0 20px 50px rgba(0,0,0,.12)",
        pointerEvents: "auto",
        transition: isDragging
          ? "none"
          : "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease, box-shadow 0.42s ease",
      };
    if (offset === 1)
      return {
        transform: "translateX(16%) rotate(4deg) scale(0.93)",
        opacity: 0.6,
        zIndex: 6,
        boxShadow: "none",
        pointerEvents: "none",
        transition:
          "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease",
      };
    if (offset === 2)
      return {
        transform: "translateX(28%) rotate(7deg) scale(0.86)",
        opacity: 0.25,
        zIndex: 3,
        boxShadow: "none",
        pointerEvents: "none",
        transition:
          "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease",
      };
    return {
      transform: "translateX(36%) rotate(9deg) scale(0.8)",
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none",
      transition: "transform 0.42s cubic-bezier(.4,0,.2,1), opacity 0.42s ease",
    };
  };

  return (
    <div
      className="md:hidden min-h-screen overflow-x-hidden bg-[var(--color-bg-page)]"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        @keyframes rm-bar { from { width: 0 } }
        .rm-bar { animation: rm-bar 0.8s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <div className="px-5 pt-8 pb-6 text-center">
        {/* <h2
          className="text-[1.8rem] font-black leading-[1.1] tracking-tight mb-1 text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Roadmap &amp;{" "}
          <span className="text-[var(--color-brand-primary)]">Milestones</span>
        </h2> */}
        <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
          Roadmap &amp;{" "}
          <span style={{ color: "var(--color-brand-primary)" }}>
            Milestones
          </span>
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Swipe through each phase.
        </p>
      </div>

      <div
        className="relative flex items-center justify-center mx-auto overflow-hidden"
        style={{ height: 430, touchAction: "none", maxWidth: "100vw" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          if (dragging) {
            setDragging(false);
            setDragX(0);
          }
        }}
      >
        {roadmapData.map((item, i) => {
          const c = STATUS[item.status];
          const style = getCardStyle(i);
          return (
            <div
              key={item.year}
              className="absolute rounded-2xl select-none cursor-grab active:cursor-grabbing"
              style={{
                width: "80vw",
                maxWidth: 290,
                background: "var(--color-bg-surface)",
                border: `1px solid var(--color-border-accent)`,
                ...style,
              }}
            >
              <div className="p-5">
                <p
                  className={`text-[3rem] font-black tracking-tighter leading-none mb-1 ${c.num}`}
                >
                  {item.num}
                </p>
                <p
                  className="text-[9px] font-bold tracking-[.15em] uppercase mb-1"
                  style={{ color: c.hex }}
                >
                  {item.year}
                </p>
                <h3 className="font-bold text-[14px] leading-snug mb-3 text-[var(--color-text-primary)]">
                  {item.title}
                </h3>
                <span
                  className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${c.mobilePill}`}
                >
                  {c.label}
                </span>
                <div className="w-full h-px mb-4 bg-[var(--color-border-accent)]" />
                <div className="flex flex-col gap-2">
                  {item.phases.slice(0, 4).map((ph, pi) => (
                    <div
                      key={pi}
                      className="flex items-start gap-2.5 text-[11px] leading-relaxed text-[var(--color-text-muted)]"
                    >
                      <span
                        className={`mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`}
                      />
                      {ph}
                    </div>
                  ))}
                  {item.phases.length > 4 && (
                    <p className={`text-[11px] font-semibold mt-0.5 ${c.num}`}>
                      +{item.phases.length - 4} more milestones
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
                      Progress
                    </span>
                    <span
                      className="text-[9px] font-bold"
                      style={{ color: c.hex }}
                    >
                      {c.pct}
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full overflow-hidden bg-[var(--color-bg-overlay)]">
                    <div
                      className={`h-full rounded-full rm-bar ${c.bar}`}
                      style={{ width: c.barW }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-2 pb-4">
        <button
          onClick={() => goTo(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none bg-[var(--color-bg-surface)] border border-[var(--color-border-accent)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-primary)] shadow-sm"
        >
          <ChevLeft />
        </button>
        <div className="flex items-center gap-2">
          {roadmapData.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!animating) {
                  setAnimating(true);
                  setCurrent(i);
                  setTimeout(() => setAnimating(false), 450);
                }
              }}
              className="rounded-full h-[7px] transition-all duration-300 focus:outline-none"
              style={{
                width: i === current ? 22 : 7,
                background:
                  i === current
                    ? STATUS[roadmapData[current].status].hex
                    : "var(--color-border-accent)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none bg-[var(--color-bg-surface)] border border-[var(--color-border-accent)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-primary)] shadow-sm"
        >
          <ChevRight />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 py-8 border-t border-[var(--color-border-accent)] mx-5">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-[var(--color-border-accent)]" />
          <span className="text-[var(--color-brand-accent)] text-base">✦</span>
          <div className="h-px w-12 bg-[var(--color-border-accent)]" />
        </div>
        <p className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-text-muted)]">
          More phases coming soon
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP — spaced 4-quadrant grid with gap around centre hub
───────────────────────────────────────────── */

const cardThemes = [
  {
    bg: "linear-gradient(135deg, #1a3d22 0%, #2d7a3a 100%)",
    text: "#fff",
    sub: "rgba(255,255,255,0.55)",
    dot: "#7fc742",
    isLight: false,
  },
  {
    bg: "linear-gradient(135deg, #2d7a3a 0%, #4a9858 100%)",
    text: "#fff",
    sub: "rgba(255,255,255,0.55)",
    dot: "#b8e07c",
    isLight: false,
  },
  {
    bg: "linear-gradient(135deg, #e8f5e0 0%, #c8e6b4 100%)",
    text: "#1a3d22",
    sub: "#4a7a3a",
    dot: "#2d7a3a",
    isLight: true,
  },
  {
    bg: "linear-gradient(135deg, #4a9858 0%, #7fc742 100%)",
    text: "#fff",
    sub: "rgba(255,255,255,0.65)",
    dot: "#fff",
    isLight: false,
  },
];

// Grid order: TL=index 0 (2024), TR=index 1 (2025), BL=index 2 (2027), BR=index 3 (2026)
const gridOrder = [0, 1, 2, 3]; // roadmapData indices mapped to TL, TR, BL, BR
const gridData = [
  roadmapData[0],
  roadmapData[1],
  roadmapData[3],
  roadmapData[2],
];
const gridThemes = [cardThemes[0], cardThemes[1], cardThemes[2], cardThemes[3]];

function DesktopRoadmap() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="hidden md:block bg-[var(--color-bg-page)] py-16 px-4 lg:px-8"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');


        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(22px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .quad-card {
          transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s ease;
        }
        .quad-card.is-visible { animation: fadeUpIn 0.55s cubic-bezier(.4,0,.2,1) both; }
        .quad-card.is-visible:nth-child(1) { animation-delay: 0.05s; }
        .quad-card.is-visible:nth-child(2) { animation-delay: 0.15s; }
        .quad-card.is-visible:nth-child(3) { animation-delay: 0.25s; }
        .quad-card.is-visible:nth-child(4) { animation-delay: 0.35s; }
        .quad-card:hover { transform: scale(1.025); z-index: 20; }

        @keyframes barGrow { from { width: 0 } }
        .bar-grow { animation: barGrow 0.9s cubic-bezier(.4,0,.2,1) 0.6s both; }

        @keyframes hubPulse {
          0%,100% { box-shadow: 0 0 0 6px var(--color-bg-page, #fff), 0 0 0 8px rgba(74,152,88,0.12); }
          50%      { box-shadow: 0 0 0 6px var(--color-bg-page, #fff), 0 0 0 14px rgba(74,152,88,0.04); }
        }
        .center-hub { animation: hubPulse 3s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto" style={{fontFamily: "'Sora', sans-serif"}}>
        <BadgePill label="Our Journey" />

        {/* <h2
          className="font-black text-3xl sideHeading lg:text-4xl leading-tight text-[var(--color-text-primary)] mb-2"
          // style={{ fontFamily: "var(--font-display)" }}
        >
          Roadmap &amp; <span className="text-[var(--color-brand-primary)]">Milestones</span>
        </h2> */}
        <h2 className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]">
          Roadmap &amp;{" "}
          <span style={{ color: "var(--color-brand-primary)" }}>
            Milestones
          </span>
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
          Every phase is a step toward a fully decentralised global ecosystem.
        </p>
      </div>

      {/* 2×2 grid with gap — creates natural breathing room around centre hub */}
      <div className="relative mx-auto" style={{ maxWidth: 900 }}>
        <div className="grid grid-cols-2" style={{ gap: 18, borderRadius: 28 }}>
          {gridData.map((item, i) => {
            const theme = gridThemes[i];
            const c = STATUS[item.status];
            const isAct = i === activeIdx;

            return (
              <div
                key={item.year}
                className={`quad-card relative p-6 lg:p-8 cursor-pointer select-none rounded-[20px] ${visible ? "is-visible" : "opacity-0"}`}
                style={{ background: theme.bg, minHeight: 220 }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Top row: year+num left, status pill right */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p
                      className="text-[9px] font-bold tracking-[.2em] uppercase mb-0.5"
                      style={{ color: theme.sub }}
                    >
                      {item.year}
                    </p>
                    <p
                      className="text-[2.6rem] lg:text-[3rem] font-black tracking-tighter leading-none"
                      style={{ color: theme.text, opacity: 0.18 }}
                    >
                      {item.num}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border mt-1"
                    style={{
                      color: theme.isLight ? "#2d7a3a" : "#fff",
                      background: theme.isLight
                        ? "rgba(45,122,58,0.10)"
                        : "rgba(255,255,255,0.15)",
                      borderColor: theme.isLight
                        ? "rgba(45,122,58,0.25)"
                        : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {c.label}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-[13px] lg:text-[15px] leading-snug mb-3"
                  style={{ color: theme.text }}
                >
                  {item.title}
                </h3>

                {/* Divider */}
                <div
                  className="w-full h-px mb-3"
                  style={{
                    background: theme.isLight
                      ? "rgba(45,122,58,0.15)"
                      : "rgba(255,255,255,0.12)",
                  }}
                />

                {/* Milestones */}
                <ul className="flex flex-col gap-1.5">
                  {item.phases.slice(0, 3).map((ph, pi) => (
                    <li
                      key={pi}
                      className="flex items-start gap-2 text-[11px] lg:text-[12px] leading-relaxed"
                      style={{ color: theme.sub, fontFamily: "'Sora', sans-serif" }}
                    >
                      <span
                        className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: theme.dot }}
                      />
                      {ph}
                    </li>
                  ))}
                  {item.phases.length > 3 && (
                    <li
                      className="text-[11px] font-semibold mt-0.5"
                      style={{ color: theme.dot }}
                    >
                      +{item.phases.length - 3} more milestones
                    </li>
                  )}
                </ul>

                {/* Progress bar for active phase */}
                {item.status === "active" && (
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span
                        className="text-[9px] font-bold tracking-widest uppercase"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        Progress
                      </span>
                      <span className="text-[9px] font-bold text-white">
                        {c.pct}
                      </span>
                    </div>
                    <div
                      className="h-[3px] rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <div
                        className="h-full rounded-full bar-grow"
                        style={{
                          width: c.barW,
                          background: "rgba(255,255,255,0.8)",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Hover shimmer overlay */}
                <div
                  className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    opacity: isAct ? 1 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Centre hub — sits over the gap between all four cards */}
        {/* <div
          className="center-hub absolute pointer-events-none"
          style={{
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 110, height: 110,
            borderRadius: "50%",
            background: "var(--color-bg-surface, #fff)",
            border: "1px solid var(--color-border-accent, rgba(45,122,58,0.2))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
          }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
            style={{ background: "linear-gradient(135deg, #2d7a3a, #7fc742)" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <p className="text-[9px] font-black tracking-[.18em] uppercase text-[#1a3d22] leading-none">Jaimax</p>
          <p className="text-[8px] tracking-wider text-[#9ca3af] mt-0.5">Roadmap</p>
        </div> */}

        {/* <div
          className="center-hub absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",

            backgroundImage: `url(${coin})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            border: "2px solid rgba(45,122,58,0.25)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",

            zIndex: 30,
          }}
        /> */}
        <div
  className="center-hub absolute pointer-events-none"
  style={{
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 120,
    height: 120,
    borderRadius: "50%",
    // background: "var(--color-bg-surface, #fff)",
    background: "var(--color-bg-page)",
    border: "2px solid rgba(45,122,58,0.25)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  }}
>
  <img
    src={coin}
    alt="coin"
    className="w-full h-full object-contain"
  />
</div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
        {Object.entries(STATUS).map(([k, c]) => (
          <div key={k} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: c.hex }}
            />
            <span className="text-xs text-[var(--color-text-secondary)] font-medium">
              {c.label}
            </span>
          </div>
        ))}
        <div className="h-4 w-px bg-[var(--color-border-accent)]" />
        <p className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-text-muted)]">
          More phases coming soon ✦
        </p>
      </div>
    </div>
  );
}

export default function HomeRoadmapSection() {
  return (
    <>
      <DesktopRoadmap />
      <MobileRoadmap />
    </>
  );
}

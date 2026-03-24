



import { useState, useRef, useEffect, useCallback } from "react";
import BadgePill from "./BadgePill";
import { ArrowLeft, ArrowRight } from "lucide-react";




const roadmapData = [
  {
    year: "2024", num: "01", title: "Foundation & Launch Phase", status: "completed",
    phases: [
      "Concept development and team formation of the core Jaimax team.",
      "Official website launch introducing the Jaimax ecosystem.",
      "Publication of the detailed whitepaper outlining goals and tokenomics.",
      "Public ICO launch and community onboarding.",
      "Release of the Jaimax mobile application for early users.",
    ],
  },
  {
    year: "2025", num: "02", title: "Integration & Growth", status: "completed",
    phases: [
      "Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
      "Integration of DigiLocker KYC for secure user verification.",
      "Launch of token swapping within the Jaimax ecosystem.",
      "Enable users to buy JMC through Binance exchange wallet connectivity.",
    ],
  },
  {
    year: "2026", num: "03", title: "Blockchain & Platform Expansion", status: "active",
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
    year: "2027", num: "04", title: "Global Presence", status: "future",
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
    mobilePill: "text-[#2d7a3a] bg-[rgba(45,122,58,0.10)] border border-[rgba(45,122,58,0.30)]",
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
    mobilePill: "text-[#4a9858] bg-[rgba(74,152,88,0.12)] border border-[rgba(74,152,88,0.35)]",
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
    mobilePill: "text-[#9ca3af] bg-[rgba(156,163,175,0.15)] border border-[rgba(45,122,58,0.30)]",
  },
};




const CheckIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const ClockIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>;
const CircleIcon = () => <svg width="9" height="9" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#fff" /></svg>;
const ChevLeft   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevRight  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;




const mod   = (n, m) => ((n % m) + m) % m;
const total = roadmapData.length;




/* ─────────────────────────────────────────────
   MOBILE
───────────────────────────────────────────── */

function MobileRoadmap() {
  const [cur, setCur] = useState(2); // start on active (2026)
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const draggingRef = useRef(false);

  const SLIDE_W = 230;

  const CARD_DATA = [
    {
      num: "01", year: "2024", title: "Foundation & Launch Phase", status: "completed",
      phases: ["Core team formation & concept", "Official website launch", "Whitepaper publication", "Public ICO launch", "Mobile app release"],
       border: "rgba(45,122,58,0.55)", pin: "#c0392b", dotCol: "var(--color-bg-page)",
      yearCol: "#7fc742", 
      pillBg: "rgba(127,199,66,0.14)", pillBd: "rgba(127,199,66,0.4)", pillTx: "#7fc742",
      numCol: "rgba(127,199,66,0.11)", label: "Completed", pct: null, rot: -3,
    },
    {
      num: "02", year: "2025", title: "Integration & Growth", status: "completed",
      phases: ["J-Wallet for token management", "DigiLocker KYC integration", "Token swapping live", "Binance wallet connectivity", "Exchange connectivity"],
     border: "rgba(74,152,88,0.5)", pin: "#e67e22", dotCol: "var(--color-bg-page)",
      yearCol: "#b8e07c", 
      pillBg: "rgba(184,224,124,0.14)", pillBd: "rgba(184,224,124,0.4)", pillTx: "#b8e07c",
      numCol: "rgba(184,224,124,0.11)", label: "Completed", pct: null, rot: 2,
    },
    {
      num: "03", year: "2026", title: "Blockchain & Platform Expansion", status: "active",
      phases: ["Own blockchain infrastructure", "DeFi features launch", "NFT Platform launch", "DApps across sectors", "P2P transactions"],
      border: "rgba(74,152,88,0.65)", pin: "#27ae60", dotCol: "#4a9858",
      yearCol: "#4a9858", 
      pillBg: "rgba(74,152,88,0.18)", pillBd: "rgba(74,152,88,0.5)", pillTx: "#7fc742",
      numCol: "rgba(74,152,88,0.15)", label: "In Progress", pct: "35%", rot: -2,
    },
    {
      num: "04", year: "2027", title: "Global Presence", status: "future",
      phases: ["Jaimax Social Hub launch", "Jaimax Exchange launch", "Trading live for all users", "Global exchange listings", "More phases coming soon"],
     border: "rgba(100,100,100,0.35)", pin: "#7f8c8d", dotCol: "#ffff",
      yearCol: "#fff", 
      pillBg: "rgba(156,163,175,0.1)", pillBd: "rgba(156,163,175,0.28)", pillTx: "#9ca3af",
      numCol: "rgba(156,163,175,0.5)", label: "Upcoming", pct: null, rot: 3,
    },
  ];

  const getPinX = useCallback((idx, stageWidth) => {
    return stageWidth / 2 + (idx - cur) * SLIDE_W;
  }, [cur]);

  const drawString = useCallback(() => {
  if (!svgRef.current || !stageRef.current) return;
  const vw = svgRef.current.parentElement.offsetWidth;
  const stageW = stageRef.current.offsetWidth;
  const pinY = 15; // stage paddingTop(18) - pin half(6) + adjustment = lines up with pin center

  const xs = CARD_DATA.map((_, i) =>
    Math.max(8, Math.min(vw - 8, stageW / 2 + (i - cur) * SLIDE_W))
  );

  let linePath = `M ${xs[0]} ${pinY}`;
  for (let i = 1; i < xs.length; i++) {
    const mx = (xs[i - 1] + xs[i]) / 2;
    linePath += ` Q ${mx} ${pinY - 8} ${xs[i]} ${pinY}`;
  }

  // NO circles here — the card pin dot IS the visual anchor
  svgRef.current.innerHTML = `
    <path d="${linePath}" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1" stroke-dasharray="4,3"/>
  `;
}, [cur]);

  const updatePos = useCallback((animate) => {
    if (!trackRef.current || !stageRef.current) return;
    const vw = stageRef.current.offsetWidth;
    const offset = vw / 2 - SLIDE_W / 2 - cur * SLIDE_W;
    trackRef.current.style.transition = animate
      ? "transform 0.42s cubic-bezier(.4,0,.2,1)"
      : "none";
    trackRef.current.style.transform = `translateX(${offset}px)`;
    drawString();
  }, [cur, drawString]);

  useEffect(() => {
    requestAnimationFrame(() => updatePos(false));
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => updatePos(true));
  }, [cur]);

  useEffect(() => {
    const handleResize = () => updatePos(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePos]);

  const goTo = useCallback((i) => {
    if (i < 0 || i >= CARD_DATA.length || i === cur || animating) return;
    setAnimating(true);
    setCur(i);
    setTimeout(() => setAnimating(false), 450);
  }, [cur, animating]);

  const onPointerDown = (e) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    draggingRef.current = true;
  };
  const onPointerUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const dx = e.clientX - startXRef.current;
    const dy = Math.abs(e.clientY - startYRef.current);
    if (Math.abs(dx) > 40 && dy < 60) dx < 0 ? goTo(cur + 1) : goTo(cur - 1);
  };
  const onPointerLeave = () => { draggingRef.current = false; };

  return (
    <div
      className="md:hidden bg-[var(--color-bg-page)]"
      style={{
        // background: "#0d1a0f",
        // fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      }}
    >
      <style>{`
        @keyframes rm-bar { from { width: 0 } }
        .rm-prog-fill { animation: rm-bar 0.9s cubic-bezier(.4,0,.2,1) 0.3s both; }
      `}</style>

      {/* Header */}
      <div className="text-center px-6 pt-8 pb-0">
        < BadgePill label="Our Journey" />
        <h2
          className="text-4xl sideHeading mt-2 font-bold leading-tight tracking-[-0.02em]"
        >
          Roadmap &amp;{" "}
          <span style={{ color: "var(--color-brand-primary)" }}>Milestones</span>
        </h2>
        <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>
          Swipe through each phase
        </p>
      </div>

      {/* String SVG */}
      <div style={{ position: "relative", height: 0, width: "100%", overflow: "visible", zIndex: 10 }}>
  <svg
    ref={svgRef}
    width="100%"
    height="40"
    style={{ display: "block", overflow: "visible", position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
  />
</div>

      {/* Card Stage */}
      <div
        ref={stageRef}
        style={{ width: "100%", height: 310, overflow: "hidden", position: "relative", touchAction: "pan-y", cursor: "grab" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <div
          ref={trackRef}
          style={{ display: "flex", alignItems: "flex-start", height: "100%", willChange: "transform" }}
        >
          {CARD_DATA.map((card, idx) => {
            const theme = cardThemes[idx];
            const isActive = idx === cur;
            return (
              <div
                key={card.num}
                style={{
                  flexShrink: 0,
                  width: SLIDE_W,
                  height: 310,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 8,
                  transition: "transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s",
                  transform: isActive ? "scale(1)" : "scale(0.82)",
                  opacity: isActive ? 1 : 0.35,
                }}
              >
                <div
                  style={{
                    width: 250,
                    height: 286,
                    borderRadius: 6,
                    padding: "18px 16px 16px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    background: theme.bg,
                    border: `1px solid ${card.border}`,
                    transform: `rotate(${card.rot}deg)`,
                    boxShadow: "3px 5px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                >
                  {/* Pin */}
                  <div style={{
                    width: 11, height: 11, borderRadius: "50%",
                    position: "absolute", top: -5, left: "50%",
                    transform: "translateX(-50%)",
                    background: card.pin,
                    border: "1.5px solid rgba(0,0,0,0.3)",
                    zIndex: 2,
                  }} />

                  {/* Big number watermark */}
                  <div style={{
                    fontSize: 40, fontWeight: 900, letterSpacing: "-0.05em",
                    lineHeight: 1, color: card.numCol,
                    position: "absolute", top: 10, right: 10,
                  }}>{card.num}</div>

                  <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: card.yearCol, marginBottom: 3 }}>{card.year}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, lineHeight: 1.35, color: theme.text, marginBottom: 7, paddingRight: 26, minHeight: 32 }}>{card.title}</div>

                  {/* Pill */}
                  <div style={{
                    display: "inline-block", alignSelf: "flex-start",
                    fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "2.5px 8px", borderRadius: 20,
                    background: theme.isLight
  ? "rgba(45,122,58,0.10)"
  : "rgba(255,255,255,0.15)",
border: `0.75px solid ${
  theme.isLight
    ? "rgba(45,122,58,0.25)"
    : "rgba(255,255,255,0.25)"
}`,
color: theme.isLight ? "#2d7a3a" : "#fff",
                    marginBottom: 8,
                  }}>{card.label}</div>

                  <div style={{ height: 0.75, background: "rgba(255,255,255,0.08)", marginBottom: 8 }} />

                  {/* Phases */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                    {card.phases.slice(0, 5).map((ph, pi) => (
                      <div key={pi} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", flexShrink: 0, marginTop: 4, background: card.dotCol }} />
                        <span style={{ fontSize: 9.5, lineHeight: 1.4, color: theme.sub }}>{ph}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress or spacer */}
                  {card.pct ? (
                    <div style={{ marginTop: "auto", paddingTop: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: card.subCol }}>Progress</span>
                        <span style={{ fontSize: 7, fontWeight: 700, color: card.dotCol }}>{card.pct}</span>
                      </div>
                      <div style={{ height: 2, borderRadius: 2, overflow: "hidden", background: "rgba(255,255,255,0.1)" }}>
                        <div className="rm-prog-fill" style={{ height: "100%", borderRadius: 2, width: card.pct, background: theme.dot }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: 22 }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots + Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "10px 20px 28px" }}>
        <button
          onClick={() => goTo(cur - 1)}
          disabled={cur === 0}
          className="w-6 h-6 rounded-full"
          style={{
            border: "1px solid rgba(45,122,58,0.3)",
            background: "rgba(45,122,58,0.08)",
            color: "#4a9858", cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: cur === 0 ? 0.2 : 1,
          }}
        ><ArrowLeft size={12}/></button>

        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {CARD_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                height: 5, borderRadius: 5, border: "none", cursor: "pointer", padding: 0,
                width: i === cur ? 18 : 5,
                background: i === cur ? "#4a9858" : "rgba(45,122,58,0.25)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(cur + 1)}
          disabled={cur === CARD_DATA.length - 1}
          className="w-6 h-6 rounded-full"
          style={{
           
            border: "1px solid rgba(45,122,58,0.3)",
            background: "rgba(45,122,58,0.08)",
            color: "#4a9858", cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: cur === CARD_DATA.length - 1 ? 0.2 : 1,
          }}
        ><ArrowRight size={12}/></button>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   DESKTOP — spaced 4-quadrant grid with gap around centre hub
───────────────────────────────────────────── */




const cardThemes = [
  { bg: "linear-gradient(135deg, #1a3d22 0%, #2d7a3a 100%)", text: "#fff",     sub: "rgba(255,255,255,0.55)", dot: "#7fc742", isLight: false },
  { bg: "linear-gradient(135deg, #2d7a3a 0%, #4a9858 100%)", text: "#fff",     sub: "rgba(255,255,255,0.55)", dot: "#b8e07c", isLight: false },
  { bg: "linear-gradient(135deg, #e8f5e0 0%, #c8e6b4 100%)", text: "#1a3d22",  sub: "#4a7a3a",               dot: "#2d7a3a", isLight: true  },
  { bg: "linear-gradient(135deg, #4a9858 0%, #7fc742 100%)", text: "#fff",     sub: "rgba(255,255,255,0.65)", dot: "#fff",    isLight: false },
];




// Grid order: TL=index 0 (2024), TR=index 1 (2025), BL=index 2 (2027), BR=index 3 (2026)
const gridOrder = [0, 1, 2, 3]; // roadmapData indices mapped to TL, TR, BL, BR
const gridData  = [roadmapData[0], roadmapData[1], roadmapData[3], roadmapData[2]];
const gridThemes = [cardThemes[0], cardThemes[1], cardThemes[2], cardThemes[3]];




function DesktopRoadmap() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [visible,   setVisible]   = useState(false);
  const sectionRef = useRef(null);




  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);




  return (
    <div ref={sectionRef} className="hidden md:block bg-[var(--color-bg-page)] py-16 px-4 lg:px-8" style={{ fontFamily: "'Sora', sans-serif" }}>
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
      <div className="text-center mb-10 max-w-2xl mx-auto">
         < BadgePill label="Our Journey" />
                 
        {/* <h2
          className="font-black text-3xl sideHeading lg:text-4xl leading-tight text-[var(--color-text-primary)] mb-2"
          // style={{ fontFamily: "var(--font-display)" }}
        >
          Roadmap &amp; <span className="text-[var(--color-brand-primary)]">Milestones</span>
        </h2> */}
        <h2
            className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]"
            
          >
            Roadmap &amp;{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Milestones</span>
          </h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
          Every phase is a step toward a fully decentralised global ecosystem.
        </p>
      </div>




      {/* 2×2 grid with gap — creates natural breathing room around centre hub */}
      <div className="relative mx-auto" style={{ maxWidth: 900 }}>
        <div
          className="grid grid-cols-2"
          style={{ gap: 18, borderRadius: 28 }}
        >
          {gridData.map((item, i) => {
            const theme  = gridThemes[i];
            const c      = STATUS[item.status];
            const isAct  = i === activeIdx;




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
                      color:       theme.isLight ? "#2d7a3a" : "#fff",
                      background:  theme.isLight ? "rgba(45,122,58,0.10)" : "rgba(255,255,255,0.15)",
                      borderColor: theme.isLight ? "rgba(45,122,58,0.25)" : "rgba(255,255,255,0.25)",
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
                  style={{ background: theme.isLight ? "rgba(45,122,58,0.15)" : "rgba(255,255,255,0.12)" }}
                />




                {/* Milestones */}
                <ul className="flex flex-col gap-1.5">
                  {item.phases.slice(0, 3).map((ph, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-[11px] lg:text-[12px] leading-relaxed" style={{ color: theme.sub }}>
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: theme.dot }} />
                      {ph}
                    </li>
                  ))}
                  {item.phases.length > 3 && (
                    <li className="text-[11px] font-semibold mt-0.5" style={{ color: theme.dot }}>
                      +{item.phases.length - 3} more milestones
                    </li>
                  )}
                </ul>




                {/* Progress bar for active phase */}
                {item.status === "active" && (
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>Progress</span>
                      <span className="text-[9px] font-bold text-white">{c.pct}</span>
                    </div>
                    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <div className="h-full rounded-full bar-grow" style={{ width: c.barW, background: "rgba(255,255,255,0.8)" }} />
                    </div>
                  </div>
                )}




                {/* Hover shimmer overlay */}
                <div
                  className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300"
                  style={{ background: "rgba(255,255,255,0.04)", opacity: isAct ? 1 : 0 }}
                />
              </div>
            );
          })}
        </div>




        {/* Centre hub — sits over the gap between all four cards */}
        <div
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
        </div>
      </div>




      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
        {Object.entries(STATUS).map(([k, c]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.hex }} />
            <span className="text-xs text-[var(--color-text-secondary)] font-medium">{c.label}</span>
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

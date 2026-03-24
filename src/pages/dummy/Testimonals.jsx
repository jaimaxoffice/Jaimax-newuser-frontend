import { useState, useEffect, useRef, useCallback } from "react";
import rajkumar     from "../../assets/Rajkumar.webp";
import mahendar     from "../../assets/mahender.webp";
import krishnamraju from "../../assets/krishnamraju.jpeg";
import shekar       from "../../assets/Shekar.jpg";
import anjanelu     from "../../assets/B.veeranjaneyulu.jpg";
import Ratnam       from "../../assets/Ratnam.jpg";
import pramod       from "../../assets/pramod.jpg";

const INTERVAL = 4000;

const data = [
  {
    quote: "Buying Jaimax Tokens was easy, and the transaction was super fast. The interface is clean, fast, and really easy to navigate.",
    body:  "I started using the Jaimax app last month and it has been smooth so far. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
    name:  "Krishnamraju",
    role:  "Verified Investor · 15 January, 2025",
    avatar: krishnamraju,
  },
  {
    quote: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. Their vision regarding digital payments is really unique.",
    body:  "It was a smooth process, and my tokens showed up instantly within my wallet. What's impressive is that the team actually responds to community feedback.",
    name:  "Mahendar",
    role:  "Verified Investor · 12 January, 2025",
    avatar: mahendar,
  },
  {
    quote: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems.",
    body:  "I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience!",
    name:  "Nimmala Rajkumar",
    role:  "Verified Investor · 10 January, 2025",
    avatar: rajkumar,
  },
  {
    quote: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are lightning-fast.",
    body:  "Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out!",
    name:  "Shekar K",
    role:  "Verified Investor · 8 January, 2025",
    avatar: shekar,
  },
  {
    quote: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks.",
    body:  "The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Huge potential for further scaling!",
    name:  "Yella Rathnaiah",
    role:  "Verified Investor · 5 January, 2025",
    avatar: Ratnam,
  },
  {
    quote: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised.",
    body:  "I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
    name:  "Pramod Kumar",
    role:  "Verified Investor · 3 January, 2025",
    avatar: pramod,
  },
  {
    quote: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions.",
    body:  "Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
    name:  "B. Veeranjaneyulu",
    role:  "Verified Investor · 1 January, 2025",
    avatar: anjanelu,
  },
  {
    quote: "The first thing I notice with Jaimax is the quality of the design — it feels really premium. The transactions are instant.",
    body:  "I like how secure the login and KYC system are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
    name:  "Jithendar Reddy",
    role:  "Verified Investor · 28 December, 2024",
    avatar: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=800",
  },
  {
    quote: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and track my tokens.",
    body:  "Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
    name:  "Rohan Joshi",
    role:  "Verified Investor · 25 December, 2024",
    avatar: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=800",
  },
  {
    quote: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly — no hidden fees or delays.",
    body:  "The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
    name:  "Anjali Verma",
    role:  "Verified Investor · 22 December, 2024",
    avatar: "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=800",
  },
];

const n = data.length;

/* ── Preload external images immediately ── */
if (typeof window !== "undefined") {
  data.forEach(({ avatar }) => {
    if (typeof avatar === "string" && avatar.startsWith("http")) {
      const img = new window.Image();
      img.src = avatar;
    }
  });
}

function getIsMobile() {
  return typeof window !== "undefined" && window.innerWidth < 640;
}

/* ── Split data into two rows ── */
const row1 = data.slice(0, 5);   // indices 0-4  → scrolls left
const row2 = data.slice(5, 10);  // indices 5-9  → scrolls right

/* ════════════════════════════════════════════════════════
   DESKTOP — Marquee rows
════════════════════════════════════════════════════════ */

/* Single marquee card */
function MarqueeCard({ item, onClick, isSpotlit }) {
  return (
    <button
      onClick={onClick}
      className="marquee-card flex-shrink-0 text-left"
      style={{
        width: 300,
        background:    isSpotlit ? "var(--color-brand-primary)" : "var(--color-bg-surface)",
        border:        isSpotlit
          ? "1.5px solid var(--color-brand-primary)"
          : "1.5px solid var(--color-border-accent)",
        borderRadius:  16,
        padding:       "22px 24px 20px",
        boxShadow:     isSpotlit
          ? "0 20px 60px rgba(45,122,58,.35)"
          : "var(--shadow-card)",
        cursor: "pointer",
        outline: "none",
      }}
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={item.avatar}
          alt={item.name}
          loading="eager"
          className="rounded-full object-cover flex-shrink-0"
          style={{
            width: 40, height: 40,
            border: isSpotlit
              ? "2px solid rgba(255,255,255,0.5)"
              : "2px solid var(--color-border-accent)",
          }}
        />
        <div>
          <p
            className="text-[13.5px] font-semibold leading-tight"
            style={{
              color:      isSpotlit ? "#fff" : "var(--color-text-primary)",
              fontFamily: "var(--font-body)",
            }}
          >{item.name}</p>
          <p
            className="text-[11px] mt-[2px]"
            style={{ color: isSpotlit ? "rgba(255,255,255,0.65)" : "var(--color-text-muted)" }}
          >{item.role}</p>
        </div>
        {/* Stars pushed right */}
        <div className="ml-auto flex gap-[2px]">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                color: isSpotlit ? "rgba(255,255,255,0.85)" : "var(--color-brand-accent)",
              }}
            >★</span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <p
        className="text-[13px] leading-[1.7] line-clamp-4"
        style={{
          fontFamily: "var(--font-body)",
          color:      isSpotlit ? "rgba(255,255,255,0.92)" : "var(--color-text-secondary)",
        }}
      >
        "{item.quote}"
      </p>
    </button>
  );
}

/* One row of marquee — duplicated for seamless loop */
function MarqueeRow({ items, direction = "left", speed = 38, spotlit, onCardClick, paused }) {
  /* direction "left": translate from 0 → -50% (one copy width) */
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";
  /* Each copy width = items.length * (card 300 + gap 20) */
  const copyWidth = items.length * 320;

  return (
    <div
      className="marquee-track overflow-hidden"
      style={{ width: "100%", position: "relative" }}
      /* Pause whole row on hover */
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      <div
        className="flex gap-5"
        style={{
          /* Two copies side-by-side so loop is seamless */
          width: copyWidth * 2,
          animation: `${animName} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {/* Copy A */}
        {items.map((item, i) => (
          <MarqueeCard
            key={`a-${i}`}
            item={item}
            onClick={() => onCardClick(item)}
            isSpotlit={spotlit?.name === item.name}
          />
        ))}
        {/* Copy B — identical, creates the seamless illusion */}
        {items.map((item, i) => (
          <MarqueeCard
            key={`b-${i}`}
            item={item}
            onClick={() => onCardClick(item)}
            isSpotlit={spotlit?.name === item.name}
          />
        ))}
      </div>
    </div>
  );
}

/* Spotlight modal — shown when a card is clicked */
function Spotlight({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(5,14,7,0.72)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="spotlight-in relative w-full max-w-lg rounded-2xl p-10 text-left"
        style={{
          background:  "var(--color-bg-surface)",
          boxShadow:   "0 40px 120px rgba(0,0,0,0.4)",
          border:      "1.5px solid var(--color-border-accent)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[22px] leading-none"
          style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer" }}
        >×</button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={item.avatar}
            alt={item.name}
            loading="eager"
            className="rounded-full object-cover"
            style={{ width: 60, height: 60, border: "3px solid var(--color-brand-primary)" }}
          />
          <div>
            <p
              className="text-[17px] font-semibold"
              style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
            >{item.name}</p>
            <p className="text-[12px] mt-[3px]" style={{ color: "var(--color-text-muted)" }}>{item.role}</p>
            <div className="flex gap-[3px] mt-[5px]">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ fontSize: 13, color: "var(--color-brand-accent)" }}>★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <p
          className="text-[clamp(1.05rem,2vw,1.3rem)] font-semibold leading-[1.55] mb-4"
          style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
        >"{item.quote}"</p>

        <p className="text-[13.5px] leading-[1.8]" style={{ color: "var(--color-text-secondary)" }}>
          {item.body}
        </p>
      </div>
    </div>
  );
}

function DesktopMarquee() {
  const [spotlit,    setSpotlit]    = useState(null);
  const [rowsPaused, setRowsPaused] = useState(false);

  const handleCard = (item) => {
    setSpotlit(item);
    setRowsPaused(true);
  };
  const handleClose = () => {
    setSpotlit(null);
    setRowsPaused(false);
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden"
        /* Edge fade masks */
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex flex-col gap-5">
          <MarqueeRow
            items={row1}
            direction="left"
            speed={40}
            spotlit={spotlit}
            onCardClick={handleCard}
            paused={rowsPaused}
          />
          <MarqueeRow
            items={row2}
            direction="right"
            speed={34}
            spotlit={spotlit}
            onCardClick={handleCard}
            paused={rowsPaused}
          />
        </div>
      </div>

      {/* Hint text */}
      <p
        className="text-center text-[12px] mt-5"
        style={{ color: "var(--color-text-muted)" }}
      >
        Click any card to read the full review
      </p>

      {/* Spotlight modal */}
      <Spotlight item={spotlit} onClose={handleClose} />
    </>
  );
}

/* ════════════════════════════════════════════════════════
   MOBILE — exactly unchanged
════════════════════════════════════════════════════════ */
function getHorizontalSlot(slot) {
  const configs = [
    { left: "0%",  top: "50%", transform: "translate(0, -50%) scale(1)",    w: 108, h: 86, z: 20 },
    { left: "38%", top: "50%", transform: "translate(0, -50%) scale(0.8)",  w: 86,  h: 68, z: 10 },
    { left: "62%", top: "50%", transform: "translate(0, -50%) scale(0.72)", w: 80,  h: 64, z: 9  },
    { left: "82%", top: "50%", transform: "translate(0, -50%) scale(0.65)", w: 76,  h: 60, z: 8  },
  ];
  return configs[slot % 4];
}

function MobileOrbit({ current, onSelect }) {
  const visible = [0, 1, 2, 3].map((offset) => {
    const dataIndex = (current + offset) % n;
    return { dataIndex, slotIndex: offset, person: data[dataIndex] };
  });
  return (
    <div className="relative flex-shrink-0" style={{ width: "100%", maxWidth: 340, height: 110 }}>
      <div
        className="absolute top-1/2 left-[5%] right-[5%] h-[1px] -translate-y-1/2 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(45,122,58,0.2), transparent)" }}
      />
      {visible.map(({ dataIndex, slotIndex, person }) => {
        const cfg = getHorizontalSlot(slotIndex);
        const isActive = slotIndex === 0;
        return (
          <button
            key={`mob-slot-${slotIndex}`}
            onClick={() => onSelect(dataIndex)}
            aria-label={person.name}
            className="avatar-orbit absolute bg-transparent border-none p-0 cursor-pointer"
            style={{ top: cfg.top, left: cfg.left, width: cfg.w, height: cfg.h, transform: cfg.transform, zIndex: cfg.z }}
          >
            <img
              src={person.avatar}
              alt={person.name}
              loading="lazy"
              className="w-full sm:h-[110%] h-[155%] object-cover"
              style={{
                borderRadius: isActive ? 20 : 14,
                border:       isActive ? "3px solid var(--color-brand-primary)" : "2px solid transparent",
                boxShadow:    isActive
                  ? "0 16px 48px rgba(45,122,58,.28), 0 4px 16px rgba(0,0,0,.12)"
                  : "0 4px 12px rgba(0,0,0,.10)",
                filter: isActive ? "none" : "grayscale(65%) brightness(80%)",
              }}
            />
            {isActive && (
              <span
                className="sm:block hidden absolute w-[6px] h-[6px] rounded-full"
                style={{ bottom: -8, left: "50%", transform: "translateX(-50%)", background: "var(--color-brand-primary)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function MobileCardContent({ t }) {
  return (
    <div className="fade-up relative z-10 flex flex-col gap-8 h-full justify-between">
      <div>
        <p
          className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold leading-[1.42] mb-5"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
        >{t.quote}</p>
        <p className="text-[14px] leading-[1.78]" style={{ color: "var(--color-text-secondary)" }}>{t.body}</p>
      </div>
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-[22px]"
        style={{ borderTop: "1px dashed rgba(45,122,58,0.20)" }}
      >
        <div className="flex items-center gap-[14px]">
          <img
            src={t.avatar} alt={t.name} loading="lazy"
            className="w-[46px] h-[46px] rounded-full object-cover"
            style={{ border: "2px solid var(--color-border-accent)" }}
          />
          <div>
            <p className="text-[14.5px] font-semibold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}>{t.name}</p>
            <p className="text-[12px]" style={{ color: "var(--color-text-muted)" }}>{t.role}</p>
          </div>
        </div>
        <div className="flex gap-[3px]">
          {[...Array(5)].map((_, si) => (
            <span key={si} className="text-[17px]" style={{ color: "var(--color-brand-accent)" }}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ animKey }) {
  return (
    <div
      key={animKey}
      className="progress-run absolute bottom-0 left-0 h-[3px] rounded-r-[3px]"
      style={{ background: "var(--color-brand-primary)" }}
    />
  );
}

/* ════════════════════════════════════════════════════════
   ROOT
════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const [current,   setCurrent]   = useState(0);
  const [cardStamp, setCardStamp] = useState(0);
  const [barStamp,  setBarStamp]  = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [isMobile,  setIsMobile]  = useState(getIsMobile);

  const timerRef  = useRef(null);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((c) => (c + 1) % n);
        setCardStamp((s) => s + 1);
        setTimeout(() => setBarStamp((s) => s + 1), 20);
      }
    }, INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goAndReset = useCallback((i) => {
    setCurrent(i);
    setCardStamp((s) => s + 1);
    setTimeout(() => setBarStamp((s) => s + 1), 20);
    startTimer();
  }, [startTimer]);

  return (
    <div
      className="min-h-screen flex items-center justify-center py-[70px] px-5"
      style={{ background: "var(--color-bg-surface)" }}
    >
      <style>{`
        .testi-wrap { font-family: var(--font-body, 'DM Sans', sans-serif); }

        /* ── Marquee keyframes ── */
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* ── Card hover lift ── */
        .marquee-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .marquee-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 24px 64px rgba(45,122,58,0.18) !important;
          border-color: var(--color-brand-primary) !important;
        }

        /* ── Spotlight modal entrance ── */
        @keyframes spotIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .spotlight-in { animation: spotIn 0.3s cubic-bezier(0.22,0.61,0.36,1) both; }

        /* ── Mobile animations (unchanged) ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.44s cubic-bezier(0.22,0.61,0.36,1) both; }

        @keyframes progressRun {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .progress-run { animation: progressRun ${INTERVAL}ms linear forwards; }

        .avatar-orbit {
          transition:
            top 0.65s cubic-bezier(0.4,0,0.2,1),
            left 0.65s cubic-bezier(0.4,0,0.2,1),
            transform 0.65s cubic-bezier(0.34,1.3,0.64,1),
            width 0.65s cubic-bezier(0.34,1.3,0.64,1),
            height 0.65s cubic-bezier(0.34,1.3,0.64,1),
            box-shadow 0.4s, filter 0.4s,
            border-color 0.4s, border-radius 0.4s;
        }

        .cta-btn { transition: all 0.5s ease; }
        .cta-btn:hover {
          background: transparent !important;
          color: var(--color-brand-primary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-btn);
        }
      `}</style>

      <section className="testi-wrap w-full max-w-7xl">

        {/* ── HEADER ── */}
        <div className="text-center mb-[60px]">
          <div
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase mb-[14px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span className="w-5 h-[2px] inline-block" style={{ background: "var(--color-brand-primary)" }} />
            What Clients Say
          </div>
          <h2
            className="text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.12] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            Trusted by Thousands<br />of Crypto Investors
          </h2>
          <p
            className="text-[14.5px] max-w-[460px] mx-auto leading-[1.75]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Real feedback from early investors and community members who trusted Jaimax Coin.
            Their words reflect the impact of our platform.
          </p>
        </div>

        {/* ── BODY ── */}
        {isMobile ? (
          /* ── MOBILE (unchanged) ── */
          <div className="flex flex-col gap-6">
            <div className="w-full flex justify-center px-2">
              <MobileOrbit current={current} onSelect={goAndReset} />
            </div>
            <div
              className="rounded-[8px] mt-10 px-6 py-7 relative overflow-hidden min-h-[300px] flex flex-col justify-between"
              style={{ background: "var(--color-bg-surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--color-border-accent)" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span
                className="absolute top-[-40px] right-4 text-[140px] leading-none pointer-events-none select-none"
                style={{ fontFamily: "var(--font-display)", color: "rgba(45,122,58,0.07)" }}
              >&ldquo;</span>
              <div
                className="absolute top-0 right-0 w-[120px] h-[120px] rounded-bl-full pointer-events-none"
                style={{ background: "rgba(127,199,66,0.06)" }}
              />
              <MobileCardContent key={cardStamp} t={data[current]} />
              {!paused && <ProgressBar animKey={barStamp} />}
            </div>
            <div className="flex justify-center gap-[9px] mt-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goAndReset(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="h-[7px] rounded-full border-none p-0 cursor-pointer"
                  style={{
                    width:      i === current ? 28 : 7,
                    background: i === current ? "var(--color-brand-primary)" : "var(--color-brand-light)",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP marquee ── */
          <DesktopMarquee />
        )}

        {/* ── CTA ── */}
        <div className="mt-[56px] text-center">
          <p className="text-[13px] leading-[1.65] mb-[18px]" style={{ color: "var(--color-text-secondary)" }}>
            Ready to join the Jaimax<br />presale community?
          </p>
          <a
            href="#"
            className="cta-btn inline-block text-[12px] font-semibold tracking-[.1em] uppercase py-[15px] px-[38px] rounded-full border-2 no-underline"
            style={{
              background:  "var(--color-brand-primary)",
              color:       "var(--color-text-on-dark)",
              borderColor: "var(--color-brand-primary)",
              fontFamily:  "var(--font-body)",
            }}
          >
            Participate in Presale
          </a>
        </div>

      </section>
    </div>
  );
}

// import { useState, useEffect, useRef, useCallback } from "react";
// import rajkumar     from "../../assets/Rajkumar.webp";
// import mahendar     from "../../assets/mahender.webp";
// import krishnamraju from "../../assets/krishnamraju.jpeg";
// import shekar       from "../../assets/Shekar.jpg";
// import anjanelu     from "../../assets/B.veeranjaneyulu.jpg";
// import Ratnam       from "../../assets/Ratnam.jpg";
// import pramod       from "../../assets/pramod.jpg";

// const INTERVAL = 4000;

// const data = [
//   {
//     quote: "Buying Jaimax Tokens was easy, and the transaction was super fast. The interface is clean, fast, and really easy to navigate.",
//     body:  "I started using the Jaimax app last month and it has been smooth so far. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
//     name:  "Krishnamraju",
//     role:  "Verified Investor · 15 January, 2025",
//     avatar: krishnamraju,
//   },
//   {
//     quote: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. Their vision regarding digital payments is really unique.",
//     body:  "It was a smooth process, and my tokens showed up instantly within my wallet. What's impressive is that the team actually responds to community feedback.",
//     name:  "Mahendar",
//     role:  "Verified Investor · 12 January, 2025",
//     avatar: mahendar,
//   },
//   {
//     quote: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems.",
//     body:  "I bought a few tokens to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience!",
//     name:  "Nimmala Rajkumar",
//     role:  "Verified Investor · 10 January, 2025",
//     avatar: rajkumar,
//   },
//   {
//     quote: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are lightning-fast.",
//     body:  "Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out!",
//     name:  "Shekar K",
//     role:  "Verified Investor · 8 January, 2025",
//     avatar: shekar,
//   },
//   {
//     quote: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks.",
//     body:  "The process of buying tokens is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Huge potential for further scaling!",
//     name:  "Yella Rathnaiah",
//     role:  "Verified Investor · 5 January, 2025",
//     avatar: Ratnam,
//   },
//   {
//     quote: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised.",
//     body:  "I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
//     name:  "Pramod Kumar",
//     role:  "Verified Investor · 3 January, 2025",
//     avatar: pramod,
//   },
//   {
//     quote: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions.",
//     body:  "Buying the tokens was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
//     name:  "B. Veeranjaneyulu",
//     role:  "Verified Investor · 1 January, 2025",
//     avatar: anjanelu,
//   },
//   {
//     quote: "The first thing I notice with Jaimax is the quality of the design — it feels really premium. The transactions are instant.",
//     body:  "I like how secure the login and KYC system are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
//     name:  "Jithendar Reddy",
//     role:  "Verified Investor · 28 December, 2024",
//     avatar: "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=800",
//   },
//   {
//     quote: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and track my tokens.",
//     body:  "Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
//     name:  "Rohan Joshi",
//     role:  "Verified Investor · 25 December, 2024",
//     avatar: "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=800",
//   },
//   {
//     quote: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly — no hidden fees or delays.",
//     body:  "The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
//     name:  "Anjali Verma",
//     role:  "Verified Investor · 22 December, 2024",
//     avatar: "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=800",
//   },
// ];

// const n = data.length;

// /* ─── helpers ─────────────────────────────────────────────────── */
// function getIsMobile() {
//   return typeof window !== "undefined" && window.innerWidth < 640;
// }

// if (typeof window !== "undefined") {
//   data.forEach(({ avatar }) => {
//     if (typeof avatar === "string" && avatar.startsWith("http")) {
//       const img = new window.Image();
//       img.src = avatar;
//     }
//   });
// }

// /* ─── ProgressBar ─────────────────────────────────────────────── */
// function ProgressBar({ animKey }) {
//   return (
//     <div
//       key={animKey}
//       className="progress-run absolute bottom-0 left-0 h-[3px] rounded-r-[3px]"
//       style={{ background: "var(--color-brand-primary)" }}
//     />
//   );
// }

// function DesktopTestimonial({ current, goAndReset, paused, setPaused, cardStamp, barStamp }) {
//   const t    = data[current];
//   const prev = (current - 1 + n) % n;
//   const next = (current + 1) % n;

//   return (
//     <div className="w-full">

//       {/* ── Main card ── */}
//       <div
//         className="flex overflow-hidden rounded-2xl"
//         style={{
//           minHeight: 460,
//           boxShadow: "var(--shadow-card)",
//           border: "1px solid var(--color-border-accent)",
//         }}
//       >

//         {/* ── LEFT portrait panel ── */}
//         <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 340 }}>

//           {/* All portraits stacked, stable key — never unmounts, never re-fetches */}
//           {data.map((person, i) => (
//             <img
//               key={i}
//               src={person.avatar}
//               alt={person.name}
//               loading={i === 0 ? "eager" : "lazy"}
//               className="absolute inset-0 w-full h-full object-cover object-top"
//               style={{
//                 opacity:    i === current ? 1 : 0,
//                 transform:  i === current ? "scale(1)" : "scale(1.05)",
//                 transition: "opacity 0.55s ease, transform 0.55s ease",
//                 zIndex:     i === current ? 2 : 1,
//                 willChange: "opacity, transform",
//               }}
//             />
//           ))}

//           {/* Gradient overlay */}
//           <div
//             className="absolute inset-0 pointer-events-none"
//             style={{
//               background: "linear-gradient(175deg, transparent 36%, rgba(5,14,7,0.88) 100%)",
//               zIndex: 3,
//             }}
//           />

//           {/* Left accent line */}
//           <div
//             className="absolute top-0 left-0 w-[3px] h-full pointer-events-none"
//             style={{ background: "linear-gradient(to bottom, var(--color-brand-primary), transparent)", zIndex: 4 }}
//           />

//           {/* Name / role / stars at bottom */}
//           <div className="absolute bottom-0 left-0 right-0 p-7" style={{ zIndex: 4 }}>
//             <div className="flex gap-[3px] mb-2">
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} style={{ color: "var(--color-brand-accent)", fontSize: 13 }}>★</span>
//               ))}
//             </div>
//             <p
//               className="text-white font-semibold text-[17px] leading-tight"
//               style={{ fontFamily: "var(--font-display)" }}
//             >{t.name}</p>
//             <p className="text-white/50 text-[11.5px] mt-[3px]">{t.role}</p>
//           </div>

//           {/* Prev / Next arrows */}
//           <button
//             onClick={() => goAndReset(prev)}
//             aria-label="Previous testimonial"
//             className="desk-arrow absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold"
//             style={{
//               background: "rgba(255,255,255,0.13)",
//               border: "1px solid rgba(255,255,255,0.18)",
//               backdropFilter: "blur(6px)",
//               WebkitBackdropFilter: "blur(6px)",
//               zIndex: 5,
//             }}
//           >‹</button>
//           <button
//             onClick={() => goAndReset(next)}
//             aria-label="Next testimonial"
//             className="desk-arrow absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold"
//             style={{
//               background: "rgba(255,255,255,0.13)",
//               border: "1px solid rgba(255,255,255,0.18)",
//               backdropFilter: "blur(6px)",
//               WebkitBackdropFilter: "blur(6px)",
//               zIndex: 5,
//             }}
//           >›</button>
//         </div>

//         {/* ── RIGHT content panel ── */}
//         <div
//           className="flex-1 flex flex-col justify-between relative overflow-hidden px-12 py-11"
//           style={{ background: "var(--color-bg-surface)" }}
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//         >
//           <span
//             className="absolute top-[-30px] right-5 text-[220px] leading-none pointer-events-none select-none"
//             style={{ fontFamily: "var(--font-display)", color: "rgba(45,122,58,0.055)" }}
//           >&ldquo;</span>

//           <div
//             className="absolute top-0 right-0 w-[140px] h-[140px] rounded-bl-full pointer-events-none"
//             style={{ background: "rgba(127,199,66,0.05)" }}
//           />

//           {/* Text re-animates on each change — key is fine here, it's only text */}
//           <div key={cardStamp} className="fade-up relative z-10 flex flex-col gap-5">
//             <p
//               className="text-[clamp(1.15rem,1.8vw,1.55rem)] font-semibold leading-[1.5]"
//               style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
//             >{t.quote}</p>
//             <p className="text-[13.5px] leading-[1.82]" style={{ color: "var(--color-text-secondary)" }}>
//               {t.body}
//             </p>
//           </div>

//           {/* Counter badge */}
//           <div
//             className="relative z-10 mt-8 flex items-center gap-3"
//             style={{ borderTop: "1px dashed rgba(45,122,58,0.18)", paddingTop: 18 }}
//           >
//             <span
//               className="text-[11px] font-semibold tracking-[.12em] uppercase px-3 py-[5px] rounded-full"
//               style={{
//                 background: "rgba(45,122,58,0.08)",
//                 color: "var(--color-brand-primary)",
//                 border: "1px solid rgba(45,122,58,0.18)",
//               }}
//             >
//               {String(current + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
//             </span>
//             <span className="text-[12px]" style={{ color: "var(--color-text-muted)" }}>
//               Verified Investor Review
//             </span>
//           </div>

//           {!paused && <ProgressBar animKey={barStamp} />}
//         </div>
//       </div>

//       {/* ── Avatar thumbnail strip ── */}
//       <div className="flex justify-center gap-[9px] mt-6 flex-wrap">
//         {data.map((person, i) => (
//           <button
//             key={i}
//             onClick={() => goAndReset(i)}
//             aria-label={person.name}
//             className="thumb-btn rounded-full overflow-hidden p-0 bg-transparent cursor-pointer flex-shrink-0"
//             style={{
//               width:         i === current ? 50 : 38,
//               height:        i === current ? 50 : 38,
//               outline:       i === current ? "2.5px solid var(--color-brand-primary)" : "2.5px solid transparent",
//               outlineOffset: 2,
//               filter:        i === current ? "none" : "grayscale(75%) brightness(62%)",
//               border:        "none",
//             }}
//           >
//             <img src={person.avatar} alt={person.name} loading="eager" className="w-full h-full object-cover" />
//           </button>
//         ))}
//       </div>

//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    MOBILE — exactly unchanged from original
// ═══════════════════════════════════════════════════════════════ */
// function getHorizontalSlot(slot) {
//   const configs = [
//     { left: "0%",  top: "50%", transform: "translate(0, -50%) scale(1)",    w: 108, h: 86, z: 20 },
//     { left: "38%", top: "50%", transform: "translate(0, -50%) scale(0.8)",  w: 86,  h: 68, z: 10 },
//     { left: "62%", top: "50%", transform: "translate(0, -50%) scale(0.72)", w: 80,  h: 64, z: 9  },
//     { left: "82%", top: "50%", transform: "translate(0, -50%) scale(0.65)", w: 76,  h: 60, z: 8  },
//   ];
//   return configs[slot % 4];
// }

// function MobileOrbit({ current, onSelect }) {
//   const visible = [0, 1, 2, 3].map((offset) => {
//     const dataIndex = (current + offset) % n;
//     return { dataIndex, slotIndex: offset, person: data[dataIndex] };
//   });

//   return (
//     <div className="relative flex-shrink-0" style={{ width: "100%", maxWidth: 340, height: 110 }}>
//       <div
//         className="absolute top-1/2 left-[5%] right-[5%] h-[1px] -translate-y-1/2 pointer-events-none"
//         style={{ background: "linear-gradient(to right, transparent, rgba(45,122,58,0.2), transparent)" }}
//       />
//       {visible.map(({ dataIndex, slotIndex, person }) => {
//         const cfg      = getHorizontalSlot(slotIndex);
//         const isActive = slotIndex === 0;
//         return (
//           <button
//             key={`mob-slot-${slotIndex}`}
//             onClick={() => onSelect(dataIndex)}
//             aria-label={person.name}
//             className="avatar-orbit absolute bg-transparent border-none p-0 cursor-pointer"
//             style={{ top: cfg.top, left: cfg.left, width: cfg.w, height: cfg.h, transform: cfg.transform, zIndex: cfg.z }}
//           >
//             <img
//               src={person.avatar}
//               alt={person.name}
//               loading="lazy"
//               className="w-full sm:h-[110%] h-[155%] object-cover"
//               style={{
//                 borderRadius: isActive ? 20 : 14,
//                 border:       isActive ? "3px solid var(--color-brand-primary)" : "2px solid transparent",
//                 boxShadow:    isActive
//                   ? "0 16px 48px rgba(45,122,58,.28), 0 4px 16px rgba(0,0,0,.12)"
//                   : "0 4px 12px rgba(0,0,0,.10)",
//                 filter: isActive ? "none" : "grayscale(65%) brightness(80%)",
//               }}
//             />
//             {isActive && (
//               <span
//                 className="sm:block hidden absolute w-[6px] h-[6px] rounded-full"
//                 style={{ bottom: -8, left: "50%", transform: "translateX(-50%)", background: "var(--color-brand-primary)" }}
//               />
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function MobileCardContent({ t }) {
//   return (
//     <div className="fade-up relative z-10 flex flex-col gap-8 h-full justify-between">
//       <div>
//         <p
//           className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-semibold leading-[1.42] mb-5"
//           style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
//         >{t.quote}</p>
//         <p className="text-[14px] leading-[1.78]" style={{ color: "var(--color-text-secondary)" }}>{t.body}</p>
//       </div>
//       <div
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-[22px]"
//         style={{ borderTop: "1px dashed rgba(45,122,58,0.20)" }}
//       >
//         <div className="flex items-center gap-[14px]">
//           <img
//             src={t.avatar} alt={t.name} loading="lazy"
//             className="w-[46px] h-[46px] rounded-full object-cover"
//             style={{ border: "2px solid var(--color-border-accent)" }}
//           />
//           <div>
//             <p className="text-[14.5px] font-semibold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}>{t.name}</p>
//             <p className="text-[12px]" style={{ color: "var(--color-text-muted)" }}>{t.role}</p>
//           </div>
//         </div>
//         <div className="flex gap-[3px]">
//           {[...Array(5)].map((_, si) => (
//             <span key={si} className="text-[17px]" style={{ color: "var(--color-brand-accent)" }}>★</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// export default function Testimonials() {
//   const [current,   setCurrent]   = useState(0);
//   const [cardStamp, setCardStamp] = useState(0);
//   const [barStamp,  setBarStamp]  = useState(0);
//   const [paused,    setPaused]    = useState(false);
//   const [isMobile,  setIsMobile]  = useState(getIsMobile);

//   const timerRef  = useRef(null);
//   const pausedRef = useRef(false);
//   pausedRef.current = paused;

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640);
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   const startTimer = useCallback(() => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       if (!pausedRef.current) {
//         setCurrent((c) => (c + 1) % n);
//         setCardStamp((s) => s + 1);
//         setTimeout(() => setBarStamp((s) => s + 1), 20);
//       }
//     }, INTERVAL);
//   }, []);

//   useEffect(() => {
//     startTimer();
//     return () => clearInterval(timerRef.current);
//   }, [startTimer]);

//   const goAndReset = useCallback((i) => {
//     setCurrent(i);
//     setCardStamp((s) => s + 1);
//     setTimeout(() => setBarStamp((s) => s + 1), 20);
//     startTimer();
//   }, [startTimer]);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center py-[70px] px-5"
//       style={{ background: "var(--color-bg-surface)" }}
//     >
//       <style>{`
//         .testi-wrap { font-family: var(--font-body, 'DM Sans', sans-serif); }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up { animation: fadeUp 0.44s cubic-bezier(0.22,0.61,0.36,1) both; }

//         @keyframes progressRun {
//           from { width: 0%; }
//           to   { width: 100%; }
//         }
//         .progress-run { animation: progressRun ${INTERVAL}ms linear forwards; }

//         .thumb-btn {
//           transition:
//             width 0.35s cubic-bezier(0.34,1.3,0.64,1),
//             height 0.35s cubic-bezier(0.34,1.3,0.64,1),
//             outline-color 0.3s ease,
//             filter 0.3s ease;
//         }

//         .desk-arrow {
//           transition: background 0.25s ease, transform 0.2s ease;
//         }
//         .desk-arrow:hover {
//           background: rgba(45,122,58,0.35) !important;
//           transform: translateY(-50%) scale(1.08);
//         }

//         .avatar-orbit {
//           transition:
//             top 0.65s cubic-bezier(0.4,0,0.2,1),
//             left 0.65s cubic-bezier(0.4,0,0.2,1),
//             transform 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             width 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             height 0.65s cubic-bezier(0.34,1.3,0.64,1),
//             box-shadow 0.4s, filter 0.4s,
//             border-color 0.4s, border-radius 0.4s;
//         }

//         .cta-btn { transition: all 0.5s ease; }
//         .cta-btn:hover {
//           background: transparent !important;
//           color: var(--color-brand-primary) !important;
//           transform: translateY(-2px);
//           box-shadow: var(--shadow-btn);
//         }
//       `}</style>

//       <section className="testi-wrap w-full max-w-5xl">

//         {/* ── HEADER ── */}
//         <div className="text-center mb-[60px]">
//           <div
//             className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.14em] uppercase mb-[14px]"
//             style={{ color: "var(--color-text-muted)" }}
//           >
//             <span className="w-5 h-[2px] inline-block" style={{ background: "var(--color-brand-primary)" }} />
//             What Clients Say
//           </div>
//           <h2
//             className="text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.12] tracking-[-0.02em] mb-4"
//             style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
//           >
//             Trusted by Thousands<br />of Crypto Investors
//           </h2>
//           <p
//             className="text-[14.5px] max-w-[460px] mx-auto leading-[1.75]"
//             style={{ color: "var(--color-text-secondary)" }}
//           >
//             Real feedback from early investors and community members who trusted Jaimax Coin.
//             Their words reflect the impact of our platform.
//           </p>
//         </div>

//         {/* ── BODY ── */}
//         {isMobile ? (
//           <div className="flex flex-col gap-6">
//             <div className="w-full flex justify-center px-2">
//               <MobileOrbit current={current} onSelect={goAndReset} />
//             </div>
//             <div
//               className="rounded-[8px] mt-10 px-6 py-7 relative overflow-hidden min-h-[300px] flex flex-col justify-between"
//               style={{ background: "var(--color-bg-surface)", boxShadow: "var(--shadow-card)", border: "1px solid var(--color-border-accent)" }}
//               onMouseEnter={() => setPaused(true)}
//               onMouseLeave={() => setPaused(false)}
//             >
//               <span
//                 className="absolute top-[-40px] right-4 text-[140px] leading-none pointer-events-none select-none"
//                 style={{ fontFamily: "var(--font-display)", color: "rgba(45,122,58,0.07)" }}
//               >&ldquo;</span>
//               <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-bl-full pointer-events-none"
//                 style={{ background: "rgba(127,199,66,0.06)" }} />
//               <MobileCardContent key={cardStamp} t={data[current]} />
//               {!paused && <ProgressBar animKey={barStamp} />}
//             </div>
//             <div className="flex justify-center gap-[9px] mt-2">
//               {data.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goAndReset(i)}
//                   aria-label={`Testimonial ${i + 1}`}
//                   className="h-[7px] rounded-full border-none p-0 cursor-pointer"
//                   style={{
//                     width:      i === current ? 28 : 7,
//                     background: i === current ? "var(--color-brand-primary)" : "var(--color-brand-light)",
//                     transition: "width 0.3s ease, background 0.3s ease",
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <DesktopTestimonial
//             current={current}
//             goAndReset={goAndReset}
//             paused={paused}
//             setPaused={setPaused}
//             cardStamp={cardStamp}
//             barStamp={barStamp}
//           />
//         )}

//         {/* ── CTA ── */}
//         <div className="mt-[56px] text-center">
//           <p className="text-[13px] leading-[1.65] mb-[18px]" style={{ color: "var(--color-text-secondary)" }}>
//             Ready to join the Jaimax<br />presale community?
//           </p>
//           <a
//             href="#"
//             className="cta-btn inline-block text-[12px] font-semibold tracking-[.1em] uppercase py-[15px] px-[38px] rounded-full border-2 no-underline"
//             style={{
//               background:  "var(--color-brand-primary)",
//               color:       "var(--color-text-on-dark)",
//               borderColor: "var(--color-brand-primary)",
//               fontFamily:  "var(--font-body)",
//             }}
//           >
//             Participate in Presale
//           </a>
//         </div>

//       </section>
//     </div>
//   );
// }
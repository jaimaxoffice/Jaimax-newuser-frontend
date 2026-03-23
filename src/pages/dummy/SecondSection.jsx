/**
 * SecondSection.jsx
 *
 * Converted to LightReach theme.css design tokens.
 * - All colors via CSS variables — zero raw hex
 * - Centered section heading added above the panel
 * - bg: --color-bg-page (pale mint) — harmonises with HeroSection below it
 *   Left hero panel: --color-brand-dark gradient (deep forest)
 *   Right grid: --color-bg-surface (white cards on very light page tint)
 * - Mobile carousel: hero strip uses --color-brand-dark gradient
 * - Lucide icons, carousel logic, and layout logic untouched
 */

import {
  ArrowLeft,
  ArrowRight,
  Home,
  Heart,
  Users,
  CreditCard,
  List,
  MessageSquare,
  Ban,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import BadgePill from "./BadgePill";

// ─── Data ────────────────────────────────────────────────────────────────────

const allLinks = [
  {
    icon: <Home className="w-5 h-5" />,
    title: "Homepage",
    desc: "Discover who we are, what drives us, and the communities we serve every day.",
    category: "Quick Links",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Who We Are",
    desc: "A passionate team turning compassion into action across 22+ communities.",
    category: "Quick Links",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Our Programs",
    desc: "Education, clean water, and mentorship — explore the work that changes lives.",
    category: "Quick Links",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Donate",
    desc: "Every contribution, however small, brings light to someone who needs it most.",
    category: "Quick Links",
  },
  {
    icon: <List className="w-5 h-5" />,
    title: "FAQ",
    desc: "Answers to the most common questions about volunteering, donating, and impact.",
    category: "Other Pages",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Stories",
    desc: "Real voices, real change — read testimonials from the people we've helped.",
    category: "Other Pages",
  },
  {
    icon: <Ban className="w-5 h-5" />,
    title: "Contact Us",
    desc: "Have a question or want to partner with us? We'd love to hear from you.",
    category: "Other Pages",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Volunteer",
    desc: "Join 850+ volunteers already making a difference in communities worldwide.",
    category: "Other Pages",
  },
];

const quickLinks = allLinks.filter((l) => l.category === "Quick Links");
const otherPages = allLinks.filter((l) => l.category === "Other Pages");

// ─── Arrow icon ───────────────────────────────────────────────────────────────

const ChevronRight = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);

// ─── Desktop link card ────────────────────────────────────────────────────────

function LinkCard({ icon, title, desc }) {
  return (
    <div
      className="
        group flex items-start gap-3 p-3 rounded-xl cursor-pointer
        transition-all duration-200
        hover:shadow-md hover:scale-[1.02]
      "
      style={{ "--hover-bg": "var(--color-bg-overlay)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--color-bg-overlay)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Icon bubble — brand-dark gradient */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))",
          color: "var(--color-text-on-dark)",
        }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </p>
        <p
          className="text-xs mt-0.5 leading-snug"
          style={{ color: "var(--color-text-muted)" }}
        >
          {desc}
        </p>
      </div>

      <ChevronRight />
    </div>
  );
}

// ─── Mobile carousel ──────────────────────────────────────────────────────────

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const n = allLinks.length;
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % n), 2600);
  };
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const prev = () => {
    setActive((p) => (p - 1 + n) % n);
    resetTimer();
  };
  const next = () => {
    setActive((p) => (p + 1) % n);
    resetTimer();
  };
  const goTo = (i) => {
    setActive(i);
    resetTimer();
  };

  const activeCard = allLinks[active];
  const CARD_W_PCT = 52;
  const CARD_H = 220;
  const OFFSET_PCT = 30;

  return (
    <div
      className="md:hidden flex flex-col"
      style={{ background: "var(--color-bg-page)" }}
    >
      {/* Hero strip — brand-dark gradient */}
      <div
        className="px-6 pt-12 pb-8 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-8 -right-8 w-36 h-36 rounded-full"
          style={{ background: "rgba(127,199,66,0.15)" }}
        />
        <div
          className="absolute bottom-4 -left-6 w-20 h-20 rounded-full"
          style={{ background: "rgba(127,199,66,0.10)" }}
        />

        <div className="relative z-10">
          {/* Section label */}
          <BadgePill label="              Navigate LightReach" />

          <h2
            className="text-xl font-bold leading-tight"
            style={{
              color: "var(--color-text-on-dark)",
              fontFamily: "var(--font-display)",
            }}
          >
            Every Page,{" "}
            <span
              className="italic font-light"
              style={{ color: "var(--color-brand-accent)" }}
            >
              A New Direction.
            </span>
          </h2>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Swipe through all sections below
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex flex-col items-center py-8 px-4 w-full">
        {/* Stack */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ maxWidth: 360, height: CARD_H + 40 }}
        >
          {/* Glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)`,
              filter: "blur(40px)",
              opacity: 0.2,
            }}
          />

          {allLinks.map((card, i) => {
            let pos = i - active;
            if (pos > n / 2) pos -= n;
            if (pos < -n / 2) pos += n;
            const abs = Math.abs(pos);
            if (abs > 2) return null;

            const isCenter = pos === 0;
            const scale = isCenter ? 1 : abs === 1 ? 0.84 : 0.68;
            const txPct = pos * OFFSET_PCT;
            const tyPx = abs === 1 ? 16 : abs === 2 ? 28 : 0;
            const rotate = pos * -4;
            const opacity = abs === 2 ? 0.5 : 1;
            const zIndex = 10 - abs;

            return (
              <div
                key={card.title}
                style={{
                  position: "absolute",
                  top: 20,
                  left: `${50 - CARD_W_PCT / 2}%`,
                  width: `${CARD_W_PCT}%`,
                  height: CARD_H,
                  transform: `translateX(${txPct * (100 / CARD_W_PCT)}%) translateY(${tyPx}px) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex,
                  opacity,
                  transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",
                  willChange: "transform,opacity",
                }}
              >
                <div
                  className="w-full h-full rounded-2xl flex flex-col justify-between p-4 relative overflow-hidden"
                  style={{
                    background: isCenter
                      ? `linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))`
                      : "var(--color-bg-surface)",
                    border: isCenter
                      ? "none"
                      : `1px solid var(--color-border-accent)`,
                    boxShadow: isCenter
                      ? "0 20px 50px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(255,255,255,0.10)"
                      : "var(--shadow-card)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/10 rounded-2xl pointer-events-none" />

                  {/* Category badge */}
                  <div className="flex justify-between items-center relative z-10">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={
                        isCenter
                          ? {
                              background: "rgba(127,199,66,0.25)",
                              color: "var(--color-brand-accent)",
                            }
                          : {
                              background: "var(--color-bg-overlay)",
                              color: "var(--color-brand-primary)",
                            }
                      }
                    >
                      {card.category === "Quick Links" ? "Quick" : "Pages"}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <span
                        className="font-bold text-sm leading-none"
                        style={{
                          color: isCenter
                            ? "var(--color-text-on-dark)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {(7 + Math.sin(card.title.length) * 1.5).toFixed(1)}
                      </span>
                      <span className="text-yellow-400 text-xs">★</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center items-center relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={
                        isCenter
                          ? {
                              background: "rgba(255,255,255,0.18)",
                              color: "var(--color-text-on-dark)",
                            }
                          : {
                              background: "var(--color-bg-overlay)",
                              color: "var(--color-brand-primary)",
                            }
                      }
                    >
                      {card.icon}
                    </div>
                  </div>

                  {/* Title + desc */}
                  <div className="relative z-10">
                    <p
                      className="font-bold text-sm leading-snug"
                      style={{
                        color: isCenter
                          ? "var(--color-text-on-dark)"
                          : "var(--color-text-primary)",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="text-[10px] mt-0.5 line-clamp-2 leading-snug"
                      style={{
                        color: isCenter
                          ? "rgba(255,255,255,0.60)"
                          : "var(--color-text-muted)",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "var(--color-bg-surface)",
              border: `1px solid var(--color-border-accent)`,
              color: "var(--color-brand-primary)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <ArrowLeft size={14} />
          </button>

          <div className="flex gap-1.5">
            {allLinks.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full"
                style={{
                  width: i === active ? 22 : 7,
                  height: 7,
                  background:
                    i === active
                      ? "var(--color-brand-primary)"
                      : "var(--color-brand-light)",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "var(--color-brand-dark)",
              color: "var(--color-text-on-dark)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Active info pill */}
        <div
          className="mt-5 w-full rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            maxWidth: 360,
            background: "var(--color-bg-surface)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--color-brand-primary)",
              color: "var(--color-text-on-dark)",
            }}
          >
            {activeCard.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-bold truncate"
              style={{ color: "var(--color-text-primary)" }}
            >
              {activeCard.title}
            </p>
            <p
              className="text-[10px] leading-snug line-clamp-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {activeCard.desc}
            </p>
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{
                background: "var(--color-bg-overlay)",
                color: "var(--color-brand-primary)",
              }}
            >
              {activeCard.category}
            </span>
          </div>
          <ChevronRight />
        </div>

        {/* CTA */}
        <button
          className="mt-5 text-sm font-semibold py-3 px-10 rounded-full transition-all active:scale-95"
          style={{
            background: "var(--color-brand-dark)",
            color: "var(--color-text-on-dark)",
            boxShadow: "var(--shadow-btn)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--color-brand-deepest)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--color-brand-dark)")
          }
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SecondSection() {
  return (
    /*
     * Outer wrapper — bg-page so it flows seamlessly from HeroSection above.
     * The panel itself sits on the page bg with lateral padding + shadow
     * so it feels like a floating card lifted off the page.
     */
    <div style={{ background: "var(--color-bg-page)" }}>
      {/* MOBILE */}
      <MobileCarousel />

      {/* DESKTOP */}
      <div className="hidden md:block px-4 sm:px-6 md:px-10 py-16">
      
        <div className="text-center mb-10">
          <BadgePill label="              Navigate LightReach" />
         

          <h2
            className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading"
            // style={{
            //   fontFamily: "var(--font-display)",
            //   color: "var(--color-text-primary)",
            // }}
          >
            Everything You Need,{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>
              All in One Place.
            </span>
          </h2>

          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Jump straight to any section of LightReach — from our story and
            programs to ways you can get involved today.
          </p>
        </div>

        {/* ── Panel ── */}
        <div
          className="rounded-[4px] overflow-hidden flex w-full"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Left hero pillar — brand-dark gradient, same visual DNA as OurStory */}
          <div
            className="text-white flex flex-col justify-between p-8 w-64 flex-shrink-0 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, var(--color-brand-dark) 0%, var(--color-brand-primary) 100%)",
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
              style={{ background: "rgba(127,199,66,0.12)" }}
            />
            <div
              className="absolute bottom-20 -left-8 w-24 h-24 rounded-full"
              style={{ background: "rgba(127,199,66,0.08)" }}
            />

            <div className="relative z-10">
              {/* Icon mark */}
              <div
                className="w-9 h-9 rounded-lg mb-6 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <Layers
                  className="w-4 h-4"
                  style={{ color: "var(--color-brand-accent)" }}
                />
              </div>

              {/* Heading */}
              <h3
                className="text-2xl font-bold leading-tight mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-dark)",
                }}
              >
                Explore Every Corner of LightReach.
              </h3>

              {/* Sub */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Quick links and resources — everything you need, right here.
              </p>
            </div>

            {/* CTA button */}
            <button
              className="relative z-10 text-sm font-semibold py-3 px-7 rounded-full mt-8 
             bg-[#111827] text-white 
             transition-all duration-300 ease-in-out 
             hover:bg-[#1f2937]"
            >
              <span className="flex items-center gap-2">
                Get Involved
                {/* Lucide Arrow Right */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M13 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Right grid — white surface */}
          <div
            className="flex-1 px-2 py-10 lg:p-8"
            style={{ background: "var(--color-bg-surface)" }}
          >
            <div className="grid grid-cols-2 lg:gap-x-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 px-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Quick Links
                </p>
                <div className="space-y-1">
                  {quickLinks.map((link) => (
                    <LinkCard key={link.title} {...link} />
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 px-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Other Pages
                </p>
                <div className="space-y-1">
                  {otherPages.map((link) => (
                    <LinkCard key={link.title} {...link} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

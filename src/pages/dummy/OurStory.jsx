import React from "react";
import { ArrowRight } from "lucide-react";
import img5 from "../../assets/dummy/hero/image5.png";
import { div } from "three/src/nodes/math/OperatorNode.js";
import BadgePill from "./BadgePill";

const STATS = [
  { value: "22+", label: "Communities\nReached" },
  { value: "65+", label: "Projects\nCompleted" },
  { value: "850+", label: "Volunteers\nUnited" },
];

const OurStory = () => {
  return (
    <div className="px-3 md:px-10 w-full mx-0 bg-white py-10">
      <section
        className="anim-5 overflow-hidden text-white bg-gradient-to-r from-[#071214] via-[#2F7C8F] to-[#071214] rounded-[4px]"
        // style={{ background: "var(--color-brand-primary)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* ── LEFT PILLAR ── */}
          <div
            className="md:col-span-5 flex flex-col gap-6 p-6 sm:p-8 md:p-10"
            style={{ background: "var(--color-section-pillar)" }}
          >
            {/* Badge + heading + supporting line */}
            <div className="flex flex-col gap-4">
              <BadgePill label="How We Started" />

              <h2
                className="font-black text-3xl sm:text-4xl md:text-[2.4rem] leading-[1.15]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-dark)",
                }}
              >
                It Started With a&nbsp;Visit and a Promise.
              </h2>

              {/* Supporting line — fills visual space, adds context */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                A small act of compassion sparked a global mission — bringing
                light, learning, and hope to communities that need it most.
              </p>
            </div>

            {/* Thin separator — visually connects copy to stats */}
            <div
              className="w-full h-px"
              style={{ background: "rgba(255,255,255,0.10)" }}
            />

            {/* Stat trio */}
            <div className="flex items-stretch">
              {STATS.map((s, i) => (
                <div key={s.value} className="flex items-stretch flex-1">
                  <div
                    className="stat-card flex-1 flex flex-col justify-center items-center text-center px-2 py-4 rounded-xl cursor-default"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <p
                      className="font-black leading-none mb-1"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-text-on-dark)",
                        fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-[11px] leading-snug whitespace-pre-line"
                      style={{
                        color: "var(--color-brand-accent)",
                        opacity: 0.85,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>

                  {/* Hairline divider between cards, not after last */}
                  {i < STATS.length - 1 && (
                    <div
                      className="self-center mx-1 w-px"
                      style={{
                        height: "55%",
                        background: "rgba(255,255,255,0.12)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="md:col-span-7 flex flex-col gap-5 p-6 sm:p-8 md:p-10">
            {/* Body copy */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              LightReach began when a small group of friends visited a rural
              community and saw children studying by candlelight. They didn't
              have much — but they promised to return. That promise grew into a
              movement, one focused on reaching where light rarely goes: through
              education, clean water, and mentorship.
            </p>

            {/* CTA */}
            <button
              className="self-start inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full border-2 transition-all duration-200"
              style={{
                borderColor: "var(--color-brand-accent)",
                color: "var(--color-brand-accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-brand-accent)";
                e.currentTarget.style.color = "var(--color-brand-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--color-brand-accent)";
              }}
            >
              Read The Full Story <ArrowRight />
            </button>

            {/*
              Image — explicit responsive heights so it NEVER grows beyond
              what's intended. object-top keeps the subject's face in frame.
            */}
            <div className="img-zoom rounded-2xl overflow-hidden w-full">
              <img
                src={img5}
                alt="Team smiling together"
                className="w-full object-cover object-top h-52 sm:h-60 md:h-64 lg:h-72"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;




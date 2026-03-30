import React from "react";
import { ArrowRight } from "lucide-react";
import img5 from "../../assets/dummy/hero/image5.png";
import { div } from "three/src/nodes/math/OperatorNode.js";
import BadgePill from "./BadgePill";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: "22+", label: "Communities\nReached" },
  { value: "65+", label: "Projects\nCompleted" },
  { value: "850+", label: "Volunteers\nUnited" },
];

const OurStory = () => {
  const navigate = useNavigate();
  return (
    <div className="px-3 md:px-10 w-full mx-0 bg-white py-10">
      <section
        className="anim-5 overflow-hidden text-white bg-gradient-to-r from-[#071214] via-[#2F7C8F] to-[#071214] rounded-[4px]"
        // style={{ background: "var(--color-brand-primary)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ── LEFT PILLAR ── */}
          <div
            className="md:col-span-5 flex flex-col gap-6 p-6 sm:p-8 md:p-10"
            style={{ background: "var(--color-section-pillar)" }}
          >
            {/* Badge + heading + supporting line */}
            <div className="flex flex-col gap-4">
              <div className="lg:text-start text-center space-y-3">
              <BadgePill label="How Jaimax Began" />

              <h2
                className=" text-3xl sm:text-4xl md:text-[2.4rem] leading-[1.15]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-on-dark)",
                }}
              >
                Built for Real-World Use
              </h2>
              </div>
              {/* Supporting line — fills visual space, adds context */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Jaimax started with a simple observation that while blockchain
                technology was advancing, everyday usability was still missing.
                Transactions were complex, costs were inconsistent, and most
                platforms were not designed for real users or businesses. That
                is where <b className="text-[var(--color-brand-light)] ">
                    <a href="https://www.jaimax.com"> Jaimax Token</a>
                  </b>{" "} takes a different approach.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                By building a connected ecosystem that combines blockchain,
                wallet, exchange, and payment solutions into one seamless
                system, Jaimax focuses on simplicity, reliability, and
                scalability. It is emerging as a  <b>
                    {" "}
                    <a href="https://www.jaimax.com" className="text-[var(--color-brand-light)]">
                      {" "}
                      best pre-sale crypto token{" "}
                    </a>
                  </b>
                designed for real-world adoption and long-term value.
              </p>
              
            </div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="md:col-span-7 flex flex-col justify-center gap-5 p-6 sm:p-8 md:p-10">
            <div className="img-zoom rounded-[12px] overflow-hidden w-full ">
              <img
                src={img5}
                alt="Team smiling together"
                className="w-full object-cover xl:h-full lg:h-96 h-64"
              />
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="mb-4 flex justify-center">
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
            onClick={() => navigate("/register")}
          >
            Join Jaimax Pre-Sale <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

export default OurStory;

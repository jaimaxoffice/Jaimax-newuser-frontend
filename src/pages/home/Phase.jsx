import React, { useRef, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const phaseData = [
  {
    status: "Completed",
    phaseNo: "Phase 1",
    tokens: "10 Billion Tokens",
    price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00044 USD)",
    button: "Buy Now",
  },
  {
    status: "Live",
    phaseNo: "Phase 2",
    tokens: "20 Billion Tokens",
    price: "Price INR 0.05 - 0.50 Paisa (0.00061-0.0061 USD)",
    button: "Buy Now",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 3",
    tokens: "25 Billion Tokens",
    price: "Price INR 0.60 - 1.53 Paisa (0.0071-0.018 USD)",
    button: "Coming Soon",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 4",
    tokens: "30 Billion Tokens",
    price: "Price INR 1.60 - 3.00 Paisa (0.019-0.036 USD)",
    button: "Coming Soon",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 5",
    tokens: "25 Billion Tokens",
    price: "Price INR 3.15 - 4.10 Paisa (0.037-0.049 USD)",
    button: "Coming Soon",
  },
];

export default function GrowthPlanTimeline() {
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // Scroll to card
  const handleIconClick = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });

      setActiveIndex(index);
      setTimeout(() => setActiveIndex(null), 300);
    }
  };

  // Navigate when Live
  const handleBuyNow = (item) => {
    if (item.status === "Live") {
      navigate("/register");
    }
  };

  return (
    <section className="text-white px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 font-sans">
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
          Company's Growth Plan Outlook
        </h2>
      </div>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Horizontal line */}
        <div
          className="absolute left-0 right-0 h-1 bg-teal-600"
          style={{ top: "24px" }}
        />

        {/* Scrollable cards */}
        <div
          className="
            flex flex-nowrap gap-4 md:gap-6 
            overflow-x-auto scroll-smooth snap-x snap-mandatory 
            scrollbar-none pb-16 w-full 
            px-4
          "
          role="list"
        >
          {phaseData.map((item, idx) => {
            const { status, phaseNo, tokens, price, button } = item;
            const shouldBlur = status !== "Live";
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`
                  relative flex-shrink-0 snap-center 
                  w-64 sm:w-72 md:w-80 
                  flex flex-col items-center
                  transition-transform duration-300 cursor-pointer
                  ${isActive ? "scale-105 sm:scale-110 z-30" : ""}
                `}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Top clickable icon */}
                <button
                  onClick={() => handleIconClick(idx)}
                  className={`
                    flex items-center justify-center 
                    w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg
                    ${status === "Live" ? "bg-green-400" : "bg-white"}
                  `}
                >
                  {status === "Live" ? (
                    <CheckCircle className="w-6 h-6 text-teal-900" />
                  ) : (
                    <Clock className="w-6 h-6 text-teal-900" />
                  )}
                </button>

                {/* Mobile label */}
                <span className="mt-3 text-xs sm:text-sm font-semibold tracking-widest text-teal-100">
                  {phaseNo}
                </span>

                {/* Card */}
                <article
                  className="
                    mt-4 bg-gradient-to-br from-[#1c984a] to-[#166a34] 
                    rounded-lg p-6 shadow-xl border border-teal-700/30
                    w-full h-72 sm:h-80 flex flex-col justify-between
                  "
                >
                  {/* Status badge */}
                  <p
                    className={`
                      text-sm px-4 py-1.5 rounded-full font-bold w-fit shadow-lg 
                      ${status === "Live" ? "bg-green-500 text-white animate-pulse" : "bg-[#b8cc26] text-black"}
                    `}
                  >
                    {status}
                  </p>

                  {/* Content */}
                  <div
                    style={{
                      filter: shouldBlur ? "blur(3px)" : "none",
                      pointerEvents: shouldBlur ? "none" : "auto",
                    }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-xl sm:text-2xl text-white font-bold text-center">
                      {tokens}
                    </p>

                    <div className="bg-white/10 p-3 rounded-lg border border-white/20 text-center">
                      <p className="text-sm sm:text-base font-semibold">
                        {price}
                      </p>
                    </div>

                    <button
                      disabled={status !== "Live"}
                      onClick={() => handleBuyNow(item)}
                      className={`
                        px-8 py-3 rounded-full font-bold w-full
                        transition-all duration-200 shadow-lg
                        ${status === "Live"
                          ? "bg-[#1d8d84] text-white hover:scale-105"
                          : "bg-gray-500 text-gray-200 cursor-not-allowed"}
                      `}
                    >
                      {button}
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

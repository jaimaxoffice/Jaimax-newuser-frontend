const steps = [
  {
    number: 1,
    title: "Sign Up",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni.",
    icon: "🔒",
    side: "left",
  },
  {
    number: 2,
    title: "Connect your Wallet",
    description:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non.",
    icon: "👜",
    side: "right",
  },
  {
    number: 3,
    title: "Start Crypto Mining",
    description:
      "Numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    icon: "⛏️",
    side: "left",
  },
  {
    number: 4,
    title: "Start Earning Money",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea.",
    icon: "💰",
    side: "right",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-16 px-4 sm:px-6">

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#16213e]" style={{fontFamily:"var(--font-heading)"}}>
          How it Works
        </h2>
        <p className="max-w-sm mx-auto text-sm sm:text-base leading-relaxed text-[#16213e]/50">
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
          quam nihil molestiae consequatur.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative max-w-4xl mx-auto">

        {/* Vertical dashed line — hidden on mobile, shown md+ */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
          style={{
            background:
              "repeating-linear-gradient(to bottom, #f46b1a 0px, #f46b1a 8px, transparent 8px, transparent 16px)",
          }}
        />

        {/* Mobile: left-side dashed line */}
        <div
          className="md:hidden absolute left-5 top-0 bottom-0 w-px"
          style={{
            background:
              "repeating-linear-gradient(to bottom, #f46b1a 0px, #f46b1a 8px, transparent 8px, transparent 16px)",
          }}
        />

        <div className="flex flex-col">
          {steps.map((step) => {
            const isLeft = step.side === "left";

            return (
              <div key={step.number} className="relative">

                {/* ── MOBILE layout (< md) ── */}
                <div className="md:hidden flex items-start gap-4 pl-0 py-7">
                  {/* Step badge on the left line */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#16213e] text-white text-sm font-bold flex items-center justify-center shadow-md border-[3px] border-white z-10 relative">
                    {step.number}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl leading-none select-none">{step.icon}</span>
                      <h3 className="text-[15px] font-bold text-[#16213e] leading-snug">{step.title}</h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#16213e]/50">{step.description}</p>
                  </div>
                </div>

                {/* ── DESKTOP layout (md+) ── */}
                <div className="hidden md:flex items-center min-h-[200px] lg:min-h-[220px]">

                  {/* LEFT column */}
                  <div className="w-1/2 pr-14 lg:pr-16 flex justify-end">
                    {isLeft ? (
                      <div className="text-right max-w-xs">
                        <h3 className="text-base lg:text-lg font-bold mb-2 text-[#16213e]">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#16213e]/50">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      <span
                        className="text-7xl lg:text-8xl select-none"
                        style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}
                      >
                        {step.icon}
                      </span>
                    )}
                  </div>

                  {/* Centre badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-[#16213e] text-white text-sm font-bold flex items-center justify-center shadow-lg border-[3px] border-white">
                    {step.number}
                  </div>

                  {/* RIGHT column */}
                  <div className="w-1/2 pl-14 lg:pl-16 flex justify-start">
                    {!isLeft ? (
                      <div className="text-left max-w-xs">
                        <h3 className="text-base lg:text-lg font-bold mb-2 text-[#16213e]">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#16213e]/50">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      <span
                        className="text-7xl lg:text-8xl select-none"
                        style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}
                      >
                        {step.icon}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
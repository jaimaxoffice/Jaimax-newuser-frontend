import React, { useState } from "react";

/* ── Google Logo SVG ── */
function GoogleLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.2-2.7-.4-4z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.6-3-11.3-7.3l-6.5 5C9.7 39.7 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6L37 39.2C40.9 35.7 44 30.3 44 24c0-1.3-.2-2.7-.4-4z"/>
    </svg>
  );
}

/* ── Trustpilot Star ── */
function TrustpilotStar({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#00B67A">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

/* ── Discord Icon ── */
function DiscordIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

/* ── Twitter/X Icon ── */
function XIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

/* ── LinkedIn Icon ── */
function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

/* ── Social Button ── */
function SocialButton({ icon, label, href = "#" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 px-8 py-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-gray-700 font-medium text-sm min-w-[100px]"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

const socialLinks = [
  {
    name: "Discord",
    url: "#",
    bg: "bg-[#5865F2]/10",
    hover: "hover:bg-[#5865F2]",
    icon: <DiscordIcon />,
  },
  {
    name: "Twitter",
    url: "https://x.com/jaimax_coin",
    bg: "bg-black/10",
    hover: "hover:bg-black",
    icon: <XIcon />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
    bg: "bg-[#0077B5]/10",
    hover: "hover:bg-[#0077B5]",
    icon: <LinkedInIcon />,
  },
];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function NewRatings() {
  const [copied, setCopied] = useState(false);

  const googleReviewUrl = "https://g.page/r/CdDTqJnUq_5LEBE/review";
  const trustpilotReviewUrl =
    "https://www.trustpilot.com/review/jaimax.com?utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

  const handleGoogleClick = () => window.open(googleReviewUrl, "_blank");
  const handleTrustpilotClick = () => window.open(trustpilotReviewUrl, "_blank");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="w-full bg-[var(--color-bg-surface)] px-4 py-20 font-sans">
      <div className="max-w-3xl mx-auto flex flex-col items-center">

        {/* ── Badge ── */}
        {/* <div className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-sm"> */}
          <div className="flex items-center gap-2 bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <GoogleLogo size={16} />
          <span>Customer Reviews</span>
        </div>

        {/* ── Heading ── */}
       <h2
            className="text-4xl sideHeading mt-4 lg:text-5xl font-bold leading-tight mb-4 tracking-[-0.02em]"
            
          >
            What Our{" "}
            <span style={{ color: "var(--color-brand-primary)" }}>Customers Say</span>
          </h2>

        {/* ── Subheading ── */}
        <p
            className="text-base leading-relaxed text-center mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
          Your trust means everything to us. Read what our customers have to say
          about their experience with Jaimax.
        </p>
        <p
            className="text-base leading-relaxed text-center mb-10"
            style={{ color: "var(--color-text-secondary)" }}
          >
          Share your experience and help others discover Jaimax.
        </p>

        {/* ── Main Stats Row: Google logo left | stats right ──
             This is the ONLY block — no separate 3-panel grid.
             Google click → opens google review URL
             Trustpilot click → opens trustpilot review URL         ── */}
        {/* <div className="w-full rounded-[6px] border border-gray-200 bg-white shadow-sm p-6 sm:p-8 mb-8 hover:shadow-md transition-shadow duration-300"> */}
          <div className="w-full rounded-2xl border border-[var(--color-border-accent)] bg-white shadow-sm p-6 sm:p-8 mb-8 hover:shadow-[var(--shadow-card)] transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">

            {/* Left — Google logo + Jaimax branding, clicking opens Google review */}
            <div
              onClick={handleGoogleClick}
              className="flex flex-col items-start gap-1 min-w-[160px] cursor-pointer group"
            >
              {/* <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-2 shadow group-hover:bg-gray-700 transition-colors duration-200"> */}
                <div className="w-14 h-14 bg-[var(--color-brand-dark)]/10 rounded-full flex items-center justify-center mb-2 shadow hover:bg-[var(--color-brand-primary)] transition-colors duration-200">
                <GoogleLogo size={28} />
              </div>
              <p className="text-xl font-bold flex items-center gap-[2px]">
  <span className="text-[#4285F4]">G</span>
  <span className="text-[#EA4335]">o</span>
  <span className="text-[#FBBC05]">o</span>
  <span className="text-[#4285F4]">g</span>
  <span className="text-[#34A853]">l</span>
  <span className="text-[#EA4335]">e</span>
</p>
              <a
                href="https://www.jaimax.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                // className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors" 
              >
                jaimax.com
              </a>
            </div>

            {/* Divider */}
            {/* <div className="hidden sm:block w-px bg-gray-100 self-stretch" /> */}
            <div className="hidden sm:block w-px bg-[var(--color-border-accent)] self-stretch" />

            {/* Right — stats */}
            <div className="flex flex-col gap-3 flex-1">
              {/* <p className="text-gray-500 text-sm"> */}
              <p className="text-[var(--color-text-secondary)] text-sm">
                Your trust means everything to us.</p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-1">

                {/* 40+ Reviews — clicking opens Google review URL */}
                <div
                  onClick={handleGoogleClick}
                //   className="flex items-center gap-2 pr-6 border-r border-gray-100 cursor-pointer hover:opacity-75 transition-opacity"
                className="flex items-center gap-2 pr-6 border-r border-[var(--color-border-accent)] cursor-pointer transition-opacity"
                >
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-bold text-[var(--color-text-primary)]">40+</span>
<span className="relative text-[var(--color-text-secondary)] text-sm group cursor-pointer">
  Reviews
  <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full"></span>
</span>
                </div>

                {/* 4.9 Rating — static display */}
                <div className="flex items-center gap-2 pr-6 border-r border-gray-100">
                  <span className="font-bold text-[var(--color-text-primary)]">4.9</span>
<span className="text-[var(--color-text-secondary)] text-sm ">Rating</span>
                </div>

                {/* Trustpilot — clicking opens Trustpilot review URL */}
                <div
                  onClick={handleTrustpilotClick}
                  className="flex items-center gap-2 cursor-pointer transition-opacity"
                >
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <TrustpilotStar key={i} size={16} />
                    ))}
                  </div>
                  <span className="relative text-[var(--color-text-secondary)] text-sm group cursor-pointer">
  TrustPilot
  <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full"></span>
</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom note ── */}
        <p className="text-sm text-[var(--color-text-muted)] text-center mb-10">
          We appreciate every review. Your feedback helps us improve and guides
          others in their journey.
        </p>

        {/* ── Social Buttons ── */}
        <div className="flex flex-wrap justify-center gap-3">
  {socialLinks.map((item) => (
    <a
      key={item.name}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      title={item.name}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center
        border border-white/20 backdrop-blur-sm
        text-black transition-all duration-300
        ${item.bg}
        ${item.hover}
        hover:text-white hover:scale-110 hover:shadow-lg
        active:scale-95
      `}
    >
      {item.icon}
    </a>
  ))}
</div>

      </div>
    </section>
  );
}
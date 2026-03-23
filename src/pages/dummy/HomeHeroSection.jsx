import { useState } from "react";
import img1 from "../../assets/dummy/hero/image1.jpeg";
import img2 from "../../assets/dummy/hero/image2.jpeg";
import img3 from "../../assets/dummy/hero/image3.jpeg";
import img4 from "../../assets/dummy/hero/image4.jpeg";
import { ArrowRight } from "lucide-react";
import img5 from "../../assets/dummy/hero/image5.png";
import SupportedWallets from "./SupportedWallets";

const NAV_LINKS = ["About", "Programs", "Stories", "Contact"];





const IMAGES = [
  {
    src:
      img1 ||
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    alt: "Smiling children in community",
  },
  {
    src:
      img2 ||
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop&q=80",
    alt: "Child studying by window",
  },
  {
    src:
      img3 ||
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&auto=format&fit=crop&q=80",
    alt: "Community support scene",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function LogoIcon({ shape }) {
  const props = {
    viewBox: "0 0 24 24",
    className: "w-5 h-5 shrink-0",
    stroke: "var(--color-brand-primary)",
    strokeWidth: 2,
    fill: "none",
  };

  if (shape === "circle")
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  if (shape === "rect")
    return (
      <svg {...props}>
        <rect x="2" y="2" width="20" height="20" rx="4" />
      </svg>
    );
  if (shape === "triangle")
    return (
      <svg {...props}>
        <polygon points="12,2 22,22 2,22" />
      </svg>
    );
  if (shape === "star")
    return (
      <svg {...props}>
        <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" />
      </svg>
    );
  return null;
}

const Arrow = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const Hamburger = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

// ── Main component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredImg, setHoveredImg] = useState(null);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[var(--color-bg-page)] font-sans antialiased">
      <section className="w-full h-[100vh] px-4 sm:px-6 md:px-14  flex items-center justify-center">
        <div>
          {/* Badge */}
          <div className="anim-0 flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-[2px] tracking-widest uppercase border"
              style={{
                background: "var(--color-bg-overlay)",
                borderColor: "var(--color-border-accent)",
                color: "var(--color-brand-primary)",
              }}
            >
              <span className="w-1.5 h-1.5 bg-[#000] text-[#000]" />
              Building Brighter Paths
            </span>
          </div>

          <div className="anim-1 text-center max-w-4xl mx-auto mb-6 px-4">
            <h1 className="dmSansFont font-black leading-[1.1]">
              Best Pre-Sale
              <br />
              <h1 className="oneWordHero">CRYPTO token</h1>
            </h1>
            <h1>
              <h1 className="oneWordHero2"> Jaimax</h1>
            </h1>
          </div>

          <p
            className="anim-2 text-center text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed px-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Secure, transparent pre-sale crypto investing made simple with
            Jaimax.
          </p>

          <div className="anim-3 flex flex-wrap justify-center gap-4 mt-6">
            {/* Primary Button */}
            <button
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full 
  bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#020617] 
  hover:from-[#1e293b] hover:to-[#020617] 
  text-white text-sm font-semibold tracking-wide 
  border border-[#2bb7a4]/30 
  shadow-[0_0_20px_rgba(43,183,164,0.15)] 
  hover:shadow-[0_0_30px_rgba(43,183,164,0.35)] 
  transition-all duration-300"
            >
              Get Started
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full 
    bg-[#2bb7a4] group-hover:bg-white transition"
              >
                <ArrowRight className="w-4 h-4 text-black group-hover:text-[#0f172a]" />
              </span>
            </button>

            {/* Secondary Button */}
            <button
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full 
  border border-[#2bb7a4]/40 text-[#2bb7a4] 
  text-sm font-semibold tracking-wide 
  hover:bg-[#2bb7a4] hover:text-black 
  hover:shadow-[0_0_25px_rgba(43,183,164,0.3)] 
  transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

    
    </div>
  );
}

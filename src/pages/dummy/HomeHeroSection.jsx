


import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full lg:h-screen overflow-x-hidden bg-[var(--color-bg-page)] font-sans antialiased">
      
      <section className="w-full h-full py-20 sm:py-16 px-4 sm:px-6 md:px-14 flex items-center justify-center border">
        <div>

          {/* Badge */}
          <div className="anim-0 flex justify-center mb-5">
            <span
              className="
                inline-flex items-center gap-1.5 text-[8px] sm:text-xs font-semibold 
                px-4 py-1.5 rounded-[2px] tracking-widest uppercase border
                bg-[var(--color-bg-overlay)]
                border-[var(--color-border-accent)]
                text-[var(--color-brand-primary)]
              "
            >
              <span className="sm:w-1.5 sm:h-1.5 w-1 h-1 bg-black" />
              Building Brighter Paths
            </span>
          </div>

          {/* Heading */}
          <div className="anim-1 text-center max-w-4xl mx-auto mb-6 px-4">
            <h1 className="dmSansFont font-black leading-[1.1] xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl">
              Best Pre-Sale
              <br />
              <span className="oneWordHero lg:text-4xl md:text-3xl sm:text-2xl text-xl">CRYPTO token</span>
            </h1>

            <div>
              <span className="oneWordHero2 lg:text-[120px] sm:text-[90px] text-[60px]">Jaimax</span>
            </div>
          </div>

          {/* Description */}
          <p
            className="
              anim-2 text-center text-sm md:text-lg 
              max-w-xl mx-auto mb-8 leading-relaxed px-2
              text-[var(--color-text-secondary)]
            "
          >
            Secure, transparent pre-sale crypto investing made simple with
            Jaimax.
          </p>

          {/* Buttons */}
          <div className="anim-3 flex flex-wrap justify-center gap-4 mt-6">

            {/* Primary Button */}
            <ActionButton
    text="Get Started"
    to="/login"
    variant="primary"
  />

  <ActionButton
    text="Learn More"
    to="/newabout"
    variant="secondary"
  />

          </div>

        </div>
      </section>

    </div>
  );
}
// JaimaxInfo.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Coin3D from "./3dcoin";
gsap.registerPlugin(ScrollTrigger);

const JaimaxInfo = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Simple fade-in animation for the heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Content reveal animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Decorative element animation
      gsap.fromTo(
        decorRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-20 bg-teal-800 text-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 relative z-10">
        {/* Decorative element */}
        <div ref={decorRef} className="flex-shrink-0">
          <Coin3D />
        </div>

        <div>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6 opacity-0"
          >
            About Jaimax
            <span className="block w-16 h-1 bg-[#b8cc26] mt-2"></span>
          </h2>

          <div ref={contentRef} className="opacity-0">
            <p className="text-lg leading-relaxed text-teal-50">
              Jaimax is India's premier pre-sale cryptocurrency platform,
              offering early access to high-potential tokens before mainstream
              exchange listings. Established in 2023, our platform combines
              cutting-edge blockchain technology with robust security protocols
              to provide a seamless investment experience. We prioritize
              transparency, accessibility, and education, empowering both novice
              and experienced investors to participate in the future of digital
              finance with confidence. Our community-driven approach and
              dedicated support team ensure every investor receives personalized
              guidance throughout their crypto journey.
            </p>

            <div className="mt-8 inline-block bg-teal-700 px-6 py-3 rounded-lg border border-teal-600">
              <span className="text-teal-200 font-medium">
                Over 24,600+ members trust Jaimax for their crypto investments
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-700 rounded-full -mr-32 -mt-32 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-600 rounded-full -ml-40 -mb-40 opacity-30"></div>
      <div className="absolute bottom-1/2 right-1/4 w-12 h-12 bg-[#b8cc26] rounded-full opacity-20"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-[#b8cc26] rounded-full opacity-10"></div>
    </div>
  );
};

export default JaimaxInfo;

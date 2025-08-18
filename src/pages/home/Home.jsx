


import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Seo from '../../SeoContent/Seo';
import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
import homeBgMobile from "../../assets/Images/HomeMobile.jpg";

// Lazy-loaded components
const CryptoStakingSection = lazy(() => import('./HomeAbout'));
const ServicesComponent = lazy(() => import('./Homeservices'));
const GrowthPlanTimeline = lazy(() => import('./Phase'));
const Partners = lazy(() => import('./Partners'));
const AnimatedTestimonials = lazy(() => import('./Testimonals'));
const JaimaxRoadmap = lazy(() => import('./RoadmapDup'));
const JaimaxFAQ = lazy(() => import('./Faq'));
const HomeContact = lazy(() => import('./HomeContact'));
const HomeFooter = lazy(() => import('./HomeFoot'));

const Home = () => {
  const navigate = useNavigate();

  // Preload critical images
  useEffect(() => {
    const preloadImages = [homeBgDesktop, homeBgMobile];
    preloadImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  return (
    <>
      <Seo page="homePage" />

      <div className="outer-container">
        <header className="relative min-h-[100dvh] flex flex-col justify-center">
          {/* Hero background image (LCP) */}
          <div className="absolute inset-0 w-full h-full">
            <picture>
              {/* Use the imported image variables instead of hardcoded paths */}
              <img
                src={homeBgDesktop}
                srcSet={`${homeBgMobile} 767w, ${homeBgDesktop} 1920w`}
                sizes="100vw"
                alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="1920"
                height="1080"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 py-4 mx-auto w-full max-w-9xl">
            <div className="relative w-full min-h-[100dvh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
              <h1 className="absolute top-6 left-4 sm:top-10 sm:left-10 font-600 leading-tight 
                              text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                              text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1
                              opacity-0 translate-y-3 animate-fadeUp">
                <span className="block text-[#b8cc26]">Secure Your</span>
                <span className="block">Financial Tomorrow</span>
                <span className="block">with Innovation</span>
                <span className="block">and Trust</span>
              </h1>

              <p className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10
                            text-white text-sm sm:text-base md:text-lg lg:text-xl 
                            font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4
                            opacity-0 translate-y-3 animate-fadeUp delay-150">
                Our expertly designed platform ensures a seamless and secure investment process,
                allowing you to capitalize on the dynamic nature of the cryptocurrency market.
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  aria-label="Start building your crypto investment"
                  className="block ml-auto mt-4 font-bold text-center
                             bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] 
                             text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
                             rounded-full hover:scale-105 active:scale-95
                             transition-transform duration-300 px-4 py-2"
                >
                  Start Building
                </button>
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full" role="main">
          {/* Sections with better loading indicators */}
          {[
            { Component: CryptoStakingSection, id: 'crypto-staking' },
            { Component: ServicesComponent, id: 'services' },
            { Component: GrowthPlanTimeline, id: 'growth-plan' },
            { Component: Partners, id: 'partners' },
            { Component: AnimatedTestimonials, id: 'testimonials' },
            { Component: JaimaxRoadmap, id: 'roadmap' },
            { Component: JaimaxFAQ, id: 'faq' },
            { Component: HomeContact, id: 'contact' }
          ].map(({ Component, id }) => (
            <section 
              key={id}
              id={id}
              style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}
            >
              <Suspense fallback={
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-t-[#b8cc26] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <Component />
              </Suspense>
            </section>
          ))}

          <footer style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 400px' }}>
            <Suspense fallback={
              <div className="min-h-[200px]"></div>
            }>
              <HomeFooter />
            </Suspense>
          </footer>
        </main>
      </div>

      {/* Lightweight CSS animations and reduced-motion support */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .animate-fadeUp { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
          .animate-fadeUp {
            animation: fadeUp 500ms ease-out forwards;
          }
          .delay-150 { animation-delay: 150ms; }
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default Home;


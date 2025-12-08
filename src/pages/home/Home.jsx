import React, { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../SeoContent/Seo";
import '../../index.css'
import { Helmet } from "react-helmet-async";

import homeBgDesktop from "../../assets/Images/HomeDesktop.webp";
import homeBgMobile from "../../assets/Images/HomeMobile.webp";
import whatsapp from "../../assets/Images/whatsup copy.svg";
const CryptoStakingSection = lazy(() => import("./HomeAbout"));
const ServicesComponent = lazy(() => import("./Homeservices"));
const GrowthPlanTimeline = lazy(() => import("./Phase"));
const JaimaxContent = lazy(() => import("./Seosection"));
const Partners = lazy(() => import("./Partners"));
const JaimaxRoadmap = lazy(() => import("./RoadmapDup"));
const AnimatedTestimonials = lazy(() => import("./Testimonals"));
const JaimaxFAQ = lazy(() => import("./Faq"));
const HomeContact = lazy(() => import("./HomeContact"));
const HomeFooter = lazy(() => import("./HomeFoot"));
const ReviewsSection = lazy(() => import("./Rating"));
const WorldMap = lazy(() => import("./WorldMap"));
import CountdownTimer from "../popups/CoinPricePopup1";
const Home = () => {
  const navigate = useNavigate();

  // Preload critical images
  useEffect(() => {
    const preloadImages = [homeBgDesktop, homeBgMobile];
    preloadImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  // ✅ JSON-LD schema data
const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [

    /* ---------------------- ORGANIZATION ---------------------- */
    {
      "@type": "Organization",
      "@id": "https://www.jaimax.com/#organization",
      "name": "Jaimax",
      "url": "https://www.jaimax.com",
      "logo": "https://www.jaimax.com/logo.webp",
      "description":
        "Jaimax is an innovative cryptocurrency project building a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and global crypto education.",
      "sameAs": [
        "https://www.instagram.com/jaimax_coin/",
        "https://www.facebook.com/jaimaxcoin/",
        "https://x.com/jaimax_coin",
        "https://www.threads.net/@jaimax_coin",
        "https://in.pinterest.com/jaimax_coin/",
        "https://g.page/r/CdDTqJnUq_5LEBM/review",
        "https://www.youtube.com/@jaimax_coin",
        "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
        "https://t.me/Jaimaxcoinn"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9381872947",
        "contactType": "Customer Support",
        "areaServed": "Worldwide",
        "availableLanguage": ["English"]
      },
      "founder": "Jaimax Team",
      "keywords": [
        "Jaimax",
        "Jaimax coin",
        "Jaimax crypto",
        "Jaimax crypto coin",
        "Jaimax token",
        "cryptocurrency in India",
        "cryptocurrency worldwide",
        "crypto coin",
        "digital currency",
        "crypto wallet",
        "blockchain technology",
        "crypto trading",
        "crypto investment",
        "decentralized finance",
        "DeFi",
        "NFT marketplace",
        "blockchain education",
        "future of cryptocurrency",
        "crypto exchange",
        "Jaimax blockchain"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "4th Floor, Vaishnavi's Cynosure, Survey No:18, India Building, Gachibowli",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500032",
        "addressCountry": "IN"
      },
      "service": [
        { "@type": "Service", "name": "Cryptocurrency Exchange", "areaServed": "Worldwide" },
        { "@type": "Service", "name": "Crypto Wallet", "areaServed": "Worldwide" },
        { "@type": "Service", "name": "Blockchain Education", "areaServed": "Worldwide" },
        { "@type": "Service", "name": "DeFi Solutions", "areaServed": "Worldwide" },
        { "@type": "Service", "name": "NFT Marketplace", "areaServed": "Worldwide" }
      ]
    },

    /* ---------------------- PRODUCT (JAIMAX COIN) ---------------------- */
    {
      "@type": "Product",
      "@id": "https://www.jaimax.com/#product",
      "name": "Jaimax Coin",
      "alternateName": "Jaimax Crypto Coin",
      "url": "https://www.jaimax.com/best-presale-crypto-coin-in-india",
      "logo": "https://www.jaimax.com/logo.webp",
      "image": "https://www.jaimax.com/logo.webp",
      "description":
        "Jaimax Coin is an innovative cryptocurrency designed for secure trading, blockchain adoption, DeFi, NFTs, and global digital payments.",
      "brand": {
        "@type": "Organization",
        "name": "Jaimax",
        "url": "https://www.jaimax.com"
      },
      "category": "Cryptocurrency",
      "keywords": [
        "Jaimax Coin",
        "Jaimax crypto coin",
        "Jaimax token",
        "crypto coin",
        "cryptocurrency",
        "blockchain coin",
        "digital currency",
        "crypto investment",
        "decentralized finance",
        "NFT marketplace coin",
        "future of crypto",
        "crypto in India",
        "worldwide cryptocurrency"
      ],
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaimax.com/best-presale-crypto-coin-in-india",
        "priceCurrency": "INR",
        "price": "0.035",
        "availability": "https://schema.org/InStock"
      }
    },

    /* ---------------------- MOBILE APP ---------------------- */
    {
      "@type": "MobileApplication",
      "@id": "https://www.jaimax.com/#mobileapp",
      "name": "Jaimax App",
      "operatingSystem": "Android",
      "applicationCategory": "FinanceApplication",
      "downloadUrl":
        "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
      "installUrl":
        "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "50"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Jaimax",
        "url": "https://www.jaimax.com"
      }
    },

    /* ---------------------- FAQ ---------------------- */
    {
      "@type": "FAQPage",
      "@id": "https://www.jaimax.com/#homepagefaq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Jaimax Coin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jaimax Coin is a next-generation cryptocurrency designed to create a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and secure digital payments worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "How can I buy Jaimax Coin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can buy Jaimax Coin through the official Jaimax platform and supported exchanges. Visit https://www.jaimax.com for the latest details."
          }
        },
        {
          "@type": "Question",
          "name": "Is Jaimax Coin available worldwide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Jaimax Coin is designed to be a global cryptocurrency, accessible and tradable worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "What services does Jaimax provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jaimax offers cryptocurrency exchange, crypto wallet, blockchain education, DeFi solutions, and an NFT marketplace to empower the digital economy."
          }
        },
        {
          "@type": "Question",
          "name": "Is Jaimax safe to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Jaimax prioritizes security with advanced blockchain technology, transparent transactions, and a reliable support system."
          }
        }
      ]
    },

    /* ---------------------- WEBSITE ---------------------- */
    {
      "@type": "WebSite",
      "@id": "https://www.jaimax.com/#website",
      "url": "https://www.jaimax.com/",
      "name": "Jaimax Website",
      "publisher": { "@id": "https://www.jaimax.com/#organization" },
      "inLanguage": "en"
    },

    /* ---------------------- HOMEPAGE WEBPAGE ---------------------- */
    {
      "@type": "WebPage",
      "@id": "https://www.jaimax.com/#webpage",
      "url": "https://www.jaimax.com/",
      "name": "Jaimax Coin – India’s Trusted Pre-Sale Crypto Coin",
      "description":
        "Invest early in Jaimax, India’s trusted pre-sale crypto coin powered by the JMC-24 blockchain.",
      "isPartOf": { "@id": "https://www.jaimax.com/#website" },
      "inLanguage": "en"
    },

    /* ---------------------- SITE NAVIGATION ---------------------- */
    {
      "@type": "SiteNavigationElement",
      "@id": "https://www.jaimax.com/#navigation",
      "name": [
        "Home",
        "About",
        "Services",
        "Features",
        "Blog",
        "Contact",
        "Pre-Sale Crypto Coin",
        "Refund Policy",
        "Terms and Conditions",
        "Privacy Policy",
        "AML-CTF",
        "KYC-PMLA"
      ],
      "url": [
        "https://www.jaimax.com/",
        "https://www.jaimax.com/about",
        "https://www.jaimax.com/services",
        "https://www.jaimax.com/features",
        "https://www.jaimax.com/blog",
        "https://www.jaimax.com/contact",
        "https://www.jaimax.com/best-presale-crypto-coin-in-india",
        "https://www.jaimax.com/refund-policy",
        "https://www.jaimax.com/terms-and-conditions",
        "https://www.jaimax.com/privacy-policy",
        "https://www.jaimax.com/aml-ctf",
        "https://www.jaimax.com/kyc-pmla"
      ]
    },

    /* ---------------------- HOMEPAGE BREADCRUMBS ---------------------- */
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaimax.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaimax.com/"
        }
      ]
    }

  ]
};

  return (
    <>

      <Seo page="homePage" />
<CountdownTimer className="" />
      <div className="outer-container overflow-y-auto scrollbar-hide">
        <header className="relative min-h-[100dvh] flex flex-col justify-center">
          <div className="absolute inset-0 w-full h-full">
            <picture>
              <img
                src={homeBgDesktop}
                srcSet={ `${homeBgMobile} 767w, ${homeBgDesktop} 1920w`}
                sizes="100vw"
                alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
                title="Jaimax - Your Trusted Partner in Cryptocurrency Investment"
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

          <div className="relative z-10 px-0  py-0 mx-auto w-full max-w-9xl">
            <div className="relative w-full min-h-[100dvh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
              <h1
                className="absolute top-6 left-4 sm:top-10 sm:left-10 font-600 leading-tight
                              text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                              text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1
                              opacity-0 translate-y-3 animate-fadeUp"
              >
                <span className="block text-[#b8cc26]"><a href="https://www.jaimax.com/best-presale-crypto-coin-in-india">Best Pre-Sale</a></span>
                <span className="block">Crypto Coin in India</span>
                <span className="block">Invest Early in </span>
                <span className="block"> Jaimax</span>
              </h1>

              <p
                className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10
                            text-white text-sm sm:text-base md:text-lg lg:text-xl
                            font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4
                            opacity-0 translate-y-3 animate-fadeUp delay-150"
              >
                Our advanced platform simplifies your pre-sale crypto investment
                journey, offering a secure and transparent experience to help
                you grow with India’s most trusted
                <b className="text-[#aadc32]">
                  <a href="https://www.jaimax.com/best-presale-crypto-coin-in-india"> pre-sale crypto coin</a>
                </b>{" "}
                - jaimax.
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  aria-label="Start building your crypto investment"
                  className="block ml-auto mt-4 font-bold text-center
                             bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f]
                             text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
                             rounded-full hover:scale-105 active:scale-95
                             transition-transform duration-300 px-4 py-2"
                >
                  Join Jaimax Pre-Sale
                </button>
              </p>
            </div>
          </div>
        </header>

        <main className="w-full scrollbar-none" role="main">
          {[
            { Component: CryptoStakingSection, id: "crypto-staking" },
            { Component: ServicesComponent, id: "services" },
            { Component: GrowthPlanTimeline, id: "growth-plan" },
            // { Component: Partners, id: "partners" },
            { Component: JaimaxContent, id: "seo-section" },
            // {Component :WorldMap,id:'world-section'},
            { Component: ReviewsSection, id: "rating-section" },
            { Component: AnimatedTestimonials, id: "testimonials" },
            { Component: JaimaxRoadmap, id: "roadmap" },
            { Component: JaimaxFAQ, id: "faq" },
            { Component: HomeContact, id: "contact" },
          ].map(({ Component, id,props }) => (
            <section
              key={id}
              id={id}
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "1px 800px",
              }}
            >
              <Suspense
                fallback={
                  <div className="min-h-[400px] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-[#b8cc26] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                }
              >
                <Component />
              </Suspense>
            </section>
          ))}

          <footer
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "1px 400px",
            }}
          >
            <Suspense fallback={<div className="min-h-[200px]"></div>}>
              <HomeFooter />
            </Suspense>
          </footer>
        </main>
      </div>

      {/* Animations */}
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

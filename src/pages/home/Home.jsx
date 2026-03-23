import React, { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../SeoContent/Seo";
import "../../index.css";

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
import AdSlot from "./AdSlot";
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
        name: "Jaimax",
        url: "https://www.jaimax.com",
        logo: "https://www.jaimax.com/logo.webp",
        description:
          "Jaimax is an innovative cryptocurrency project building a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and global crypto education.",
        sameAs: [
          "https://www.instagram.com/jaimax_coin/",
          "https://www.facebook.com/jaimaxcoin/",
          "https://x.com/jaimax_coin",
          "https://www.threads.net/@jaimax_coin",
          "https://in.pinterest.com/jaimax_coin/",
          "https://g.page/r/CdDTqJnUq_5LEBM/review",
          "https://www.youtube.com/@jaimax_coin",
          "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
          "https://t.me/Jaimaxcoinn",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-9381872947",
          contactType: "Customer Support",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
        founder: "Jaimax Team",
        keywords: [
          "Jaimax",
          "Jaimax Token",
          "Jaimax crypto",
          "Jaimax crypto token",
          "Jaimax token",
          "cryptocurrency in India",
          "cryptocurrency worldwide",
          "crypto token",
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
          "Jaimax blockchain",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "4th Floor, Vaishnavi's Cynosure, Survey No:18, India Building, Gachibowli",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500032",
          addressCountry: "IN",
        },
        service: [
          {
            "@type": "Service",
            name: "Cryptocurrency Exchange",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "Crypto Wallet",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "Blockchain Education",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "DeFi Solutions",
            areaServed: "Worldwide",
          },
          {
            "@type": "Service",
            name: "NFT Marketplace",
            areaServed: "Worldwide",
          },
        ],
      },

      /* ---------------------- PRODUCT (JAIMAX COIN) ---------------------- */
      {
        "@type": "Product",
        "@id": "https://www.jaimax.com/#product",
        name: "Jaimax Token",
        alternateName: "Jaimax Crypto token",
        url: "https://www.jaimax.com/best-presale-crypto-token-in-india/",
        logo: "https://www.jaimax.com/logo.webp",
        image: "https://www.jaimax.com/logo.webp",
        description:
          "Jaimax Token is an innovative cryptocurrency designed for secure trading, blockchain adoption, DeFi, NFTs, and global digital payments.",
        brand: {
          "@type": "Organization",
          name: "Jaimax",
          url: "https://www.jaimax.com",
        },
        category: "Cryptocurrency",
        keywords: [
          "Jaimax Token",
          "Jaimax crypto token",
          "Jaimax token",
          "crypto token",
          "cryptocurrency",
          "blockchain coin",
          "digital currency",
          "crypto investment",
          "decentralized finance",
          "NFT marketplace coin",
          "future of crypto",
          "crypto in India",
          "worldwide cryptocurrency",
        ],
        offers: {
          "@type": "Offer",
          url: "https://www.jaimax.com/best-presale-crypto-token-in-india/",
          priceCurrency: "INR",
          price: "0.04",
          availability: "https://schema.org/InStock",
        },
      },

      /* ---------------------- MOBILE APP ---------------------- */
      {
        "@type": "MobileApplication",
        "@id": "https://www.jaimax.com/#mobileapp",
        name: "Jaimax App",
        operatingSystem: "Android",
        applicationCategory: "FinanceApplication",
        downloadUrl:
          "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
        installUrl:
          "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "50",
        },
        publisher: {
          "@type": "Organization",
          name: "Jaimax",
          url: "https://www.jaimax.com",
        },
      },

      /* ---------------------- FAQ ---------------------- */
      {
        "@type": "FAQPage",
        "@id": "https://www.jaimax.com/#homepagefaq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Jaimax Token?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jaimax Token is a next-generation cryptocurrency designed to create a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and secure digital payments worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "How can I buy Jaimax Token?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can buy Jaimax Token through the official Jaimax platform and supported exchanges. Visit https://www.jaimax.com for the latest details.",
            },
          },
          {
            "@type": "Question",
            name: "Is Jaimax Token available worldwide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Jaimax Token is designed to be a global cryptocurrency, accessible and tradable worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "What services does Jaimax provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jaimax offers cryptocurrency exchange, crypto wallet, blockchain education, DeFi solutions, and an NFT marketplace to empower the digital economy.",
            },
          },
          {
            "@type": "Question",
            name: "Is Jaimax safe to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Jaimax prioritizes security with advanced blockchain technology, transparent transactions, and a reliable support system.",
            },
          },
        ],
      },

      /* ---------------------- WEBSITE ---------------------- */
      {
        "@type": "WebSite",
        "@id": "https://www.jaimax.com/#website",
        url: "https://www.jaimax.com/",
        name: "Jaimax Website",
        publisher: { "@id": "https://www.jaimax.com/#organization" },
        inLanguage: "en",
      },

      /* ---------------------- HOMEPAGE WEBPAGE ---------------------- */
      {
        "@type": "WebPage",
        "@id": "https://www.jaimax.com/#webpage",
        url: "https://www.jaimax.com/",
        name: "Jaimax Token – India’s Trusted Pre-Sale Crypto token",
        description:
          "Invest early in Jaimax, India’s trusted pre-sale crypto token powered by the JMC-24 blockchain.",
        isPartOf: { "@id": "https://www.jaimax.com/#website" },
        inLanguage: "en",
      },

      /* ---------------------- SITE NAVIGATION ---------------------- */
      {
        "@type": "SiteNavigationElement",
        "@id": "https://www.jaimax.com/#navigation",
        name: [
          "Home",
          "About",
          "Services",
          "Features",
          "Blog",
          "Contact",
          "Pre-Sale Crypto token",
          "Refund Policy",
          "Terms and Conditions",
          "Privacy Policy",
          "AML-CTF",
          "KYC-PMLA",
        ],
        url: [
          "https://www.jaimax.com/",
          "https://www.jaimax.com/about",
          "https://www.jaimax.com/services",
          "https://www.jaimax.com/features",
          "https://www.jaimax.com/blog",
          "https://www.jaimax.com/contact",
          "https://www.jaimax.com/best-presale-crypto-token-in-india/",
          "https://www.jaimax.com/refund-policy",
          "https://www.jaimax.com/terms-and-conditions",
          "https://www.jaimax.com/privacy-policy",
          "https://www.jaimax.com/aml-ctf",
          "https://www.jaimax.com/kyc-pmla",
        ],
      },

      /* ---------------------- HOMEPAGE BREADCRUMBS ---------------------- */
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.jaimax.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.jaimax.com/",
          },
        ],
      },
    ],
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
                srcSet={`${homeBgMobile} 767w, ${homeBgDesktop} 1920w`}
                sizes="100vw"
                alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
                decoding="sync"
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
                <span className="block text-[#b8cc26]">
                  <a href="https://www.jaimax.com/best-presale-crypto-token-in-india/">
                    Best Pre-Sale
                  </a>
                </span>
                <span className="block">Crypto Token in India</span>
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
                  <a href="https://www.jaimax.com/best-presale-crypto-token-in-india/">
                    {" "}
                    pre-sale crypto token
                  </a>
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

              <AdSlot slot="first-ad" />
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
          ].map(({ Component, id, props }) => (
            <React.Fragment key={id}>

                {/* AD AFTER HOMEABOUT */}
    {/* {id === "crypto-staking" && (
      <AdSlot slot="1234567890" />
    )} */}
            <section
              // key={id}
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
    {id === "growth-plan" && (
      <AdSlot slot="second-ad" />
    )}
    {id === "seo-section" && (
      <AdSlot slot="third-ad" />
    )}
    {id === "testimonials" && (
      <AdSlot slot="fourth-ad" />
    )}

    {/* AD AFTER ROADMAP */}
    {id === "roadmap" && (
      <AdSlot slot="fifth-ad" />
    )}
    {id === "contact" && (
      <AdSlot slot="sixth-ad" />
    )}

            </React.Fragment>
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

// import React, { lazy, Suspense, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Seo from "../../SeoContent/Seo";
// import "../../index.css";

// import whatsapp from "../../assets/Images/whatsup copy.svg";
// const CryptoStakingSection = lazy(() => import("./HomeAbout"));
// const ServicesComponent = lazy(() => import("./Homeservices"));
// const GrowthPlanTimeline = lazy(() => import("./Phase"));
// const JaimaxContent = lazy(() => import("./Seosection"));
// const Partners = lazy(() => import("./Partners"));
// const JaimaxRoadmap = lazy(() => import("./RoadmapDup"));
// const AnimatedTestimonials = lazy(() => import("./Testimonals"));
// const JaimaxFAQ = lazy(() => import("./Faq"));
// const HomeContact = lazy(() => import("./HomeContact"));
// const HomeFooter = lazy(() => import("./HomeFoot"));
// const ReviewsSection = lazy(() => import("./Rating"));
// const WorldMap = lazy(() => import("./WorldMap"));
// import CountdownTimer from "../popups/CoinPricePopup1";
// import AdSlot from "./AdSlot";
// import "./jaimax-theme.css";
// import "./home-styles/home-hero.css";

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const preloadImages = [];
//     preloadImages.forEach((url) => {
//       const img = new Image();
//       img.src = url;
//     });
//   }, []);

// useEffect(() => {

// const canvas = document.querySelector(".jxh-antigravity");
// if (!canvas) return;

// const ctx = canvas.getContext("2d");

// let particles = [];
// let mouse = { x: null, y: null };

// const spacing = 40;

// const resize = () => {
//   const rect = canvas.getBoundingClientRect();
//   canvas.width = rect.width;
//   canvas.height = rect.height;

//   particles = [];

//   const cols = Math.floor(canvas.width / spacing);
//   const rows = Math.floor(canvas.height / spacing);

//   for (let x = 0; x < cols; x++) {
//     for (let y = 0; y < rows; y++) {

//       let px = x * spacing;
//       let py = y * spacing;

//       particles.push({
//         x: px + Math.random() * 6,
//         y: py + Math.random() * 6,
//         ox: px,
//         oy: py,
//         vx: 0,
//         vy: 0,
//         angle: Math.random() * Math.PI * 2
//       });

//     }
//   }
// };

// resize();
// window.addEventListener("resize", resize);

// const draw = () => {

// ctx.clearRect(0,0,canvas.width,canvas.height);

// particles.forEach(p => {

//   let visible = false;

//   if(mouse.x !== null){

//     let dx = p.x - mouse.x;
//     let dy = p.y - mouse.y;

//     let dist = Math.sqrt(dx*dx + dy*dy);

//     // only show particles near mouse
//     if(dist < 160){

//       visible = true;

//       let force = (140 - dist) / 140;

//       // pull particles toward cursor
//       p.vx += (-dx/dist) * force * 0.6;
//       p.vy += (-dy/dist) * force * 0.6;

//     }
//   }

//   // smooth physics
//   p.vx *= 0.92;
//   p.vy *= 0.92;

//   p.x += p.vx;
//   p.y += p.vy;

//   // return slowly to original position
//   p.x += (p.ox - p.x) * 0.01;
//   p.y += (p.oy - p.y) * 0.01;

//   if(visible){

//     ctx.beginPath();

//     ctx.shadowColor = "#48CFFF";
//     ctx.shadowBlur = 8;

//     ctx.arc(p.x, p.y, 0.9, 0, Math.PI*2);
//     // ctx.arc(p.x, p.y, 0.7, 0, Math.PI*2);

//     ctx.fillStyle = "rgba(72,207,255,0.6)";

//     ctx.fill();

//   }

// });

// requestAnimationFrame(draw);

// };

// window.addEventListener("mousemove", e => {

//   const rect = canvas.getBoundingClientRect();

//   mouse.x = e.clientX - rect.left;
//   mouse.y = e.clientY - rect.top;

// });

// window.addEventListener("mouseleave", () => {
//   mouse.x = null;
//   mouse.y = null;
// });

// draw();

// }, []);

//   const jsonLdData = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         "@id": "https://www.jaimax.com/#organization",
//         name: "Jaimax",
//         url: "https://www.jaimax.com",
//         logo: "https://www.jaimax.com/logo.webp",
//         description:
//           "Jaimax is an innovative cryptocurrency project building a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and global crypto education.",
//         sameAs: [
//           "https://www.instagram.com/jaimax_coin/",
//           "https://www.facebook.com/jaimaxcoin/",
//           "https://x.com/jaimax_coin",
//           "https://www.threads.net/@jaimax_coin",
//           "https://in.pinterest.com/jaimax_coin/",
//           "https://g.page/r/CdDTqJnUq_5LEBM/review",
//           "https://www.youtube.com/@jaimax_coin",
//           "https://www.linkedin.com/company/jaimax-software-solutions-private-limited/",
//           "https://t.me/Jaimaxcoinn",
//         ],
//         contactPoint: {
//           "@type": "ContactPoint",
//           telephone: "+91-9381872947",
//           contactType: "Customer Support",
//           areaServed: "Worldwide",
//           availableLanguage: ["English"],
//         },
//         founder: "Jaimax Team",
//         address: {
//           "@type": "PostalAddress",
//           streetAddress:
//             "4th Floor, Vaishnavi's Cynosure, Survey No:18, India Building, Gachibowli",
//           addressLocality: "Hyderabad",
//           addressRegion: "Telangana",
//           postalCode: "500032",
//           addressCountry: "IN",
//         },
//       },
//       {
//         "@type": "Product",
//         "@id": "https://www.jaimax.com/#product",
//         name: "Jaimax Token",
//         url: "https://www.jaimax.com/best-presale-crypto-token-in-india/",
//         description:
//           "Jaimax Token is an innovative cryptocurrency designed for secure trading, blockchain adoption, DeFi, NFTs, and global digital payments.",
//         brand: { "@type": "Organization", name: "Jaimax" },
//         category: "Cryptocurrency",
//         offers: {
//           "@type": "Offer",
//           url: "https://www.jaimax.com/best-presale-crypto-token-in-india/",
//           priceCurrency: "INR",
//           price: "0.04",
//           availability: "https://schema.org/InStock",
//         },
//       },
//       {
//         "@type": "MobileApplication",
//         "@id": "https://www.jaimax.com/#mobileapp",
//         name: "Jaimax App",
//         operatingSystem: "Android",
//         applicationCategory: "FinanceApplication",
//         downloadUrl:
//           "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
//         offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
//         aggregateRating: {
//           "@type": "AggregateRating",
//           ratingValue: "5",
//           reviewCount: "50",
//         },
//         publisher: { "@type": "Organization", name: "Jaimax" },
//       },
//       {
//         "@type": "WebSite",
//         "@id": "https://www.jaimax.com/#website",
//         url: "https://www.jaimax.com/",
//         name: "Jaimax Website",
//         publisher: { "@id": "https://www.jaimax.com/#organization" },
//         inLanguage: "en",
//       },
//       {
//         "@type": "WebPage",
//         "@id": "https://www.jaimax.com/#webpage",
//         url: "https://www.jaimax.com/",
//         name: "Jaimax Token – India's Trusted Pre-Sale Crypto token",
//         isPartOf: { "@id": "https://www.jaimax.com/#website" },
//         inLanguage: "en",
//       },
//       {
//         "@type": "BreadcrumbList",
//         "@id": "https://www.jaimax.com/#breadcrumb",
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Home",
//             item: "https://www.jaimax.com/",
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <>
//       <Seo page="homePage" />
//       <CountdownTimer className="" />

//       <div className="outer-container overflow-y-auto scrollbar-hide">
//         <header className="jxh-root" role="banner">
//           <canvas className="jxh-antigravity" />
//           <div className="jxh-bg" aria-hidden="true" />
//           <div className="jxh-glow jxh-glow--left" aria-hidden="true" />
//           <div className="jxh-glow jxh-glow--right" aria-hidden="true" />
//           {/* <div className="jxh-dotgrid" aria-hidden="true" />

//           <div className="jxh-stars" aria-hidden="true">
//             {[
//               [8, 18],
//               [16, 72],
//               [25, 35],
//               [33, 55],
//               [44, 14],
//               [52, 80],
//               [60, 28],
//               [70, 62],
//               [78, 44],
//               [88, 20],
//               [92, 75],
//               [6, 90],
//               [20, 48],
//               [38, 88],
//               [48, 8],
//               [62, 95],
//               [74, 38],
//               [84, 66],
//               [94, 50],
//               [14, 60],
//               [30, 22],
//               [56, 48],
//             ].map(([x, y], i) => (
//               <span
//                 key={i}
//                 className="jxh-star"
//                 style={{
//                   left: `${x}%`,
//                   top: `${y}%`,
//                   width: `${[2, 1.5, 2.5, 1, 2, 1.5][i % 6]}px`,
//                   height: `${[2, 1.5, 2.5, 1, 2, 1.5][i % 6]}px`,
//                   animationDelay: `${(i * 0.55) % 5}s`,
//                   animationDuration: `${3 + (i % 4) * 0.7}s`,
//                 }}
//               />
//             ))}
//           </div> */}

//           <div className="jxh-layout">
//             <div className="jxh-left">
//               <div className="jxh-eyebrow jxh-fade jxh-fade--1">
//                 <svg
//                   width="10"
//                   height="10"
//                   viewBox="0 0 10 10"
//                   fill="none"
//                   aria-hidden="true"
//                 >
//                   <path
//                     d="M5 0L10 5L5 10L0 5Z"
//                     fill="var(--jaimax-primary)"
//                     opacity="0.85"
//                   />
//                 </svg>
//                 Best Pre-Sale Crypto
//               </div>

//               <h1 className="jxh-h1 jxh-fade jxh-fade--2">
//                 <span className="jxh-h1__line jxh-h1__line--rule">
//                   <span className="jxh-h1__word">Invest Early</span>
//                   <span className="jxh-h1__dash-group" aria-hidden="true">
//                     <span className="jxh-h1__dash" />
//                     <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
//                       <path
//                         d="M5 0L10 5L5 10L0 5Z"
//                         fill="var(--jaimax-primary)"
//                       />
//                     </svg>
//                   </span>
//                 </span>

//                 <span className="jxh-h1__line">
//                   <span className="jxh-h1__word">In India's</span>
//                 </span>

//                 <span className="jxh-h1__line jxh-h1__line--hero">
//                  <a
//   href="https://www.jaimax.com/best-presale-crypto-token-in-india/"
//   className="jxh-h1__hero-link jxh-type"
// >
//   {"Jaimax".split("").map((c,i)=>(
//     <span key={i} style={{animationDelay:`${i*0.18+0.3}s`}}>
//       {c}
//     </span>
//   ))}
// </a>

//                   <div className="jxh-scribble-wrap">
//                     <svg className="jxh-scribble" viewBox="0 0 500 150">
//                       <path
//                         className="jxh-line l1"
//                         d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2"
//                       />

//                       <path
//                         className="jxh-line l2"
//                         d="M380.1,129.6C181.2,130.6,70,139,70,139"
//                       />

//                       <path
//                         className="jxh-line l3"
//                         d="M70,139c82.6-2.9,254.2-1,335.9,1.3"
//                       />

//                       <path
//                         className="jxh-line l4"
//                         d="M405.9,140.3c-56,1.4-137.2-0.3-197.1,9"
//                       />
//                     </svg>
//                   </div>
//                 </span>
//               </h1>

//               <p className="jxh-body jxh-fade jxh-fade--3">
//                 Our advanced platform simplifies your pre-sale crypto investment
//                 journey, offering a secure and transparent experience. Powered
//                 by JMC-24 blockchain.
//               </p>

//               <div className="jxh-actions jxh-fade jxh-fade--4">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/login")}
//                   aria-label="Join Jaimax Pre-Sale"
//                   className="jxh-btn jxh-btn--primary"
//                 >
//                   Join Pre-Sale
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigate("/about")}
//                   aria-label="How it works"
//                   className="jxh-btn jxh-btn--ghost"
//                 >
//                   How it Works?
//                 </button>
//               </div>

//               <div className="jxh-stats jxh-fade jxh-fade--5">
//                 <div className="jxh-stat">
//                   <span className="jxh-stat__v">₹0.04</span>
//                   <span className="jxh-stat__l">Pre-Sale Price</span>
//                 </div>
//                 <div className="jxh-stat__sep" />
//                 <div className="jxh-stat">
//                   <span className="jxh-stat__v">JMC-24</span>
//                   <span className="jxh-stat__l">Blockchain</span>
//                 </div>
//                 <div className="jxh-stat__sep" />
//                 <div className="jxh-stat">
//                   <span className="jxh-stat__v">5 ★</span>
//                   <span className="jxh-stat__l">50+ Reviews</span>
//                 </div>
//               </div>
//             </div>

//             <div className="jxh-media-wrap jxh-fade jxh-fade--2 border">
//               <div className="jxh-media-box">
//                 {/* IMAGE VERSION */}
//                 <img
//                   src="/hero-image.webp"
//                   alt="Jaimax platform preview"
//                   className="jxh-media"
//                 />

//                 {/* OR VIDEO VERSION */}
//                 {/* 
//     <video
//       autoPlay
//       loop
//       muted
//       playsInline
//       className="jxh-media"
//     >
//       <source src="/hero-animation.mp4" type="video/mp4" />
//     </video>
//     */}
//               </div>
//             </div>
//           </div>

//           <div className="jxh-scroll" aria-hidden="true"></div>
//         </header>

//         <AdSlot slot="first-ad" />

//         <main className="w-full scrollbar-none" role="main">
//           {[
//             { Component: CryptoStakingSection, id: "crypto-staking" },
//             { Component: ServicesComponent, id: "services" },
//             { Component: GrowthPlanTimeline, id: "growth-plan" },
//             { Component: JaimaxContent, id: "seo-section" },
//             { Component: ReviewsSection, id: "rating-section" },
//             { Component: AnimatedTestimonials, id: "testimonials" },
//             { Component: JaimaxRoadmap, id: "roadmap" },
//             { Component: JaimaxFAQ, id: "faq" },
//             { Component: HomeContact, id: "contact" },
//           ].map(({ Component, id }) => (
//             <React.Fragment key={id}>
//               <section
//                 id={id}
//                 style={{
//                   contentVisibility: "auto",
//                   containIntrinsicSize: "1px 800px",
//                 }}
//               >
//                 <Suspense
//                   fallback={
//                     <div className="min-h-[400px] flex items-center justify-center">
//                       <div className="w-8 h-8 border-4 border-t-[#48CFFF] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
//                     </div>
//                   }
//                 >
//                   <Component />
//                 </Suspense>
//               </section>
//               {id === "growth-plan" && <AdSlot slot="second-ad" />}
//               {id === "seo-section" && <AdSlot slot="third-ad" />}
//               {id === "testimonials" && <AdSlot slot="fourth-ad" />}
//               {id === "roadmap" && <AdSlot slot="fifth-ad" />}
//               {id === "contact" && <AdSlot slot="sixth-ad" />}
//             </React.Fragment>
//           ))}
//           <footer
//             style={{
//               contentVisibility: "auto",
//               containIntrinsicSize: "1px 400px",
//             }}
//           >
//             <Suspense fallback={<div className="min-h-[200px]" />}>
//               <HomeFooter />
//             </Suspense>
//           </footer>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Home;

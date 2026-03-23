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
import Loader from "../../ReusableComponents/Loader/loader";
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

  const sections = [
  { Component: CryptoStakingSection, id: "crypto-staking" },
  { Component: ServicesComponent, id: "services" },
  { Component: GrowthPlanTimeline, id: "growth-plan" },
  { Component: JaimaxContent, id: "seo-section" },
  { Component: ReviewsSection, id: "rating-section" },
  { Component: AnimatedTestimonials, id: "testimonials" },
  { Component: JaimaxRoadmap, id: "roadmap" },
  { Component: JaimaxFAQ, id: "faq" },
  { Component: HomeContact, id: "contact" },
];

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

        {/* <main className="w-full scrollbar-none" role="main">
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
        </main> */}

        <main className="w-full scrollbar-none" role="main">

  {/* TOP AD */}
  <AdSlot slot="first-ad" />

  {sections.map(({ Component, id }) => (
    <React.Fragment key={id}>

      <section
        id={id}
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1px 800px",
        }}
      >
        <Suspense fallback={Loader}>
          <Component />
        </Suspense>
      </section>

      {id === "growth-plan" && <AdSlot slot="second-ad" />}
      {id === "seo-section" && <AdSlot slot="third-ad" />}
      {id === "testimonials" && <AdSlot slot="fourth-ad" />}
      {id === "roadmap" && <AdSlot slot="fifth-ad" />}
      {id === "contact" && <AdSlot slot="sixth-ad" />}

    </React.Fragment>
  ))}

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
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useLayoutEffect,
// } from "react";
// import {
//   ChevronDown,
//   Globe,
//   Shield,
//   Circle ,
//   Plus,
//   Minus,
//   Star,
//   CheckCircle,
//   Mail,
//   Trophy ,
//   Crown ,
//   Phone,
//   MapPin,
//   ArrowRight,
//   Sparkles,
//   TrendingUp,
//   Wallet,
//   Coins,
//   DollarSign,
//   Bell,
//   Check,
//   ArrowLeft,
//   ArrowRight as ArrowRightIcon,
//   Zap,
//   Lock,
//   Award,
//   Users,
//   Target,
//   Rocket,
//   Building2,
//   LineChart,
//   Flag,
//   FileText,
//   Flame,
//   Building,
//   ChevronLeft ,
//   ChevronRight ,
//   CreditCard,
//   Calendar ,
//   HelpCircle,
//   MessageCircle ,
//   Send ,
//   X,
//   IndianRupee,
// } from "lucide-react";
// import {
//   FaShieldAlt,
//   FaRocket,
//   FaGlobe,
//   FaDownload ,
//   FaArrowRight ,
//   FaLock,
//   FaChartLine,
//   FaUsers,
//   FaGem,
//   FaCheckCircle,
//   FaBolt,
//   FaCube ,
//   FaHandshake,
//   FaCubes,
//   FaLightbulb,
//   FaPlay ,
//   FaArrowUp ,
//   FaMobileAlt ,
//   FaBell ,
//   FaStar ,
//   FaChartArea ,
//   FaGooglePlay ,
//   FaApple ,
//   FaArrowDown ,
//   FaCoins ,
//   FaLongArrowAltRight ,
// } from "react-icons/fa";
// import { motion, useScroll, useTransform, useInView,useSpring,AnimatePresence  } from "framer-motion";
// import homeBgDesktop from "../../assets/websitepg.jpg";
// import homeBgMobile from "../../assets/mobilepg.jpg";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { Observer } from "gsap/Observer";
// import { SplitText } from "gsap/SplitText";
// import { Flip } from "gsap/Flip";

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useSubmitEnquiryMutation } from "./HomePageApiSlice";

// import {
//   Navigation,
//   Pagination,
//   Autoplay,
//   EffectCoverflow,
// } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";
// import { useNavigate } from "react-router-dom";
// import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
// import jaicoins from "../../assets/Images/jaicoins.svg";
// import frameTwo from "../../assets/Images/securitymeasure.svg";
// import access from "../../assets/Images/accessToprofit.svg";
// import rocket2 from "../../assets/Images/framefour.svg";
// import eye from "../../assets/Images/eye.svg";
// import rajkumar from "../../assets/Rajkumar.webp";
// import mahendar from "../../assets/mahender.webp";
// import krishnamraju from "../../assets/krishnamraju.webp";
// import shekar from "../../assets/Shekar.jpg";
// import anjanelu from "../../assets/B.veeranjaneyulu.jpg";
// import Ratnam from "../../assets/Ratnam.jpg";
// import pramod from "../../assets/pramod.jpg";
// import app from '../../assets/app.jpeg'
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, SplitText, Flip);

// const services = [
//   {
//     title: "Secure Crypto Wallet",
//     icon: jaicoins,
//     iconAlt: "Jaicoins wallet icon for cryptocurrency storage",
//     iconTitle: "Secure Digital Wallet",
//     description:
//       "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
//   },
//   {
//     title: "Access to Profits",
//     icon: access,
//     iconAlt: "Profit access icon showing financial gains",
//     iconTitle: "Easy Profit Access",
//     description:
//       "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
//   },
//   {
//     title: "Financial Growth",
//     icon: rocket2,
//     iconAlt: "Rocket icon symbolizing financial growth and success",
//     iconTitle: "Accelerate Your Growth",
//     description:
//       "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
//   },
//   {
//     title: "Funds Management",
//     icon: eye,
//     iconAlt: "Eye icon representing funds monitoring and management",
//     iconTitle: "Complete Fund Visibility",
//     description:
//       "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
//   },
// ];

// const testimonials = [
//   {
//     id: 1,
//     name: "Krishnamraju",
//     date: "15 January, 2025",
//     image: krishnamraju,
//     text: "I started using the Jaimax app last month and it has been smooth so far. The interface is clean, fast, and really easy to navigate. Buying Jaimax Coins was easy, and the transaction was super fast. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
//   },
//   {
//     id: 2,
//     name: "Mahendar",
//     date: "12 January, 2025",
//     image: mahendar,
//     text: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. It was a smooth process, and my coins showed up instantly within my wallet. Their vision regarding digital payments is really unique among other projects. What's impressive is that the team actually responds to community feedback. ",
//   },
//   {
//     id: 3,
//     name: "Nimmala Rajkumar",
//     date: "10 January, 2025",
//     image: rajkumar,
//     text: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems. I bought a few coins to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience; very excited to see how this project develops!",
//   },
//   {
//     id: 4,
//     name: "Shekar.k",
//     date: "8 January, 2025",
//     image: shekar,
//     text: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are really lightning-fast. Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out: it's totally worth it!",
//   },
//   {
//     id: 5,
//     name: "Yella Rathnaiah",
//     date: "5 January, 2025",
//     image: Ratnam,
//     text: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks. The process of buying coins is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Overall, a great project with huge potential for further scaling!",
//   },
//   {
//     id: 6,
//     name: "Pramod Kumar",
//     date: "3 January, 2025",
//     image: pramod,
//     text: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised. I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
//   },
//   {
//     id: 7,
//     name: "B.Veeranjaneyulu",
//     date: "1 January, 2025",
//     image: anjanelu,
//     text: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions. Buying the coins was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
//   },
//   {
//     id: 8,
//     name: "jithendar Reddy",
//     date: "28 December, 2024",
//     image:
//       "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
//     text: "The first thing I notice with Jaimax is the quality of the design, it feels really premium. The transactions are instant, and I didn't face any downtime yet. I like how secure the login and system for KYC are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
//   },
//   {
//     id: 9,
//     name: "Rohan Joshi",
//     date: "25 December, 2024",
//     image:
//       "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
//     text: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and keep track of my coins. Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
//   },
//   {
//     id: 10,
//     name: "Anjali Verma",
//     date: "22 December, 2024",
//     image:
//       "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=0&k=20&c=6JTBSXZojVJQKSIVDZIIW2Du6_B_iWg9DWShjHjNO6U=",
//     text: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly: no hidden fees or delays. The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
//   },
// ];
// const roadmapData = {
//   2024: {
//     title: "Foundation & Launch Phase",
//     status: "completed",
//     progress: 100,
//     phases: [
//       "• Concept development and team formation of the core Jaimax team.",
//       "• Official website launch introducing the Jaimax ecosystem.",
//       "• Publication of the detailed whitepaper outlining goals and tokenomics.",
//       "• Public ICO launch and community onboarding.",
//       "• Release of the Jaimax mobile application for early users.",
//     ],
//   },
//   2025: {
//     title: "Integration & Growth",
//     status: "completed",
//     progress: 100,
//     phases: [
//       "• Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
//       "• Integration of DigiLocker KYC for secure user verification.",
//       "• Launch of token swapping within the Jaimax ecosystem.",
//       "• Enable users to buy JMC through Binance exchange wallet connectivity.",
//     ],
//   },
//   2026: {
//     title: "Blockchain & Platform Expansion",
//     status: "active",
//     progress: 25,
//     phases: [
//       "• Development of Jaimax's own blockchain infrastructure.",
//       "• Launch of DeFi features to enhance financial accessibility.",
//       "• Launch of the NFT Platform.",
//       "• Deployment of DApps across Education, Gaming, Tourism, and Finance.",
//       "• Launch of person-to-person (P2P) buying and selling functionality.",
//       "• Launch of Jaimax's own payment gateway for seamless transactions.",
//     ],
//   },
//   2027: {
//     title: "Global Presence",
//     status: "future",
//     progress: 0,
//     phases: [
//       "• Launch of the Jaimax Social Hub to connect users, traders, and developers.",
//       "• Launch of the Jaimax Exchange for direct token trading.",
//       "• Trading live for all verified users.",
//       "• Expansion to global exchange listings.",
//     ],
//   },
// };

// const statusConfig = {
//   completed: {
//     badge: "Completed",
//     badgeColor: "bg-[#085056]",
//     borderColor: "border-[#085056]",
//     glowColor: "shadow-[#085056]/30",
//     textColor: "text-white",
//     bgGradient: "from-[#085056]/20 to-[#0a6b73]/20",
//     icon: "✓", // Keep this one as it's functional
//   },
//   active: {
//     badge: "In Progress",
//     badgeColor: "bg-white",
//     borderColor: "border-white",
//     glowColor: "shadow-white/30",
//     textColor: "text-white",
//     bgGradient: "from-white/10 to-[#085056]/20",
//     icon: "◉", // Simple circle dot
//   },
//   future: {
//     badge: "Upcoming",
//     badgeColor: "bg-[#085056]",
//     borderColor: "border-white/50",
//     glowColor: "shadow-white/20",
//     textColor: "text-white",
//     bgGradient: "from-[#085056]/20 to-white/10",
//     icon: "◯", // Simple circle outline
//   },
// };

// const IMG_PADDING = 2;

// const phases = [
//   {
//     status: "Live",
//     phaseNo: "1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//     icon: <TrendingUp className="w-8 h-8" />,
//     color: "#10b981",
//     progress: 45,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061-0.0061 USD)",
//     button: "Coming Soon",
//     icon: <TrendingUp className="w-8 h-8" />,
//     color: "#3b82f6",
//     progress: 0,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 Paisa (0.0071-0.018 USD)",
//     button: "Coming Soon",
//     icon: <TrendingUp className="w-8 h-8" />,
//     color: "#8b5cf6",
//     progress: 0,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.019-0.036 USD)",
//     button: "Coming Soon",
//     icon: <TrendingUp className="w-8 h-8" />,
//     color: "#f59e0b",
//     progress: 0,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037-0.049 USD)",
//     button: "Coming Soon",
//     icon: <TrendingUp className="w-8 h-8" />,
//     color: "#ef4444",
//     progress: 0,
//   },
// ];

// const JaimaxFAQ = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const faqs = [
//     {
//       question: "What is Jaimax Token?",
//       answer: "Jaimax Token is a secure and innovative cryptocurrency that delivers fast, transparent, and low-cost blockchain-based transactions. Designed for both daily use and long-term crypto investment, Jaimax empowers users to take control of their financial future.",
//       icon: <Coins className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "How is Jaimax Token different from other cryptocurrencies?",
//       answer: "Jaimax Token is more than just a digital asset. It offers users access to our exclusive Jaimax App, a built-in crypto wallet, and a powerful referral-based ecosystem. We focus on real-world usability, scalability, and building a strong crypto community in India and worldwide.",
//       icon: <Sparkles className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "Is Jaimax Token safe to use?",
//       answer: "Yes. Jaimax Token is built on a decentralized blockchain using strong cryptographic security protocols to ensure each transaction is transparent and tamper-proof. Our Jaimax Wallet inside the app adds another layer of protection for storing and managing your crypto assets.",
//       icon: <Shield className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "Where can I store my Jaimax Tokens?",
//       answer: "You can store your Jaimax Tokens securely in the official Jaimax Wallet, available in the Jaimax App. Our wallet is easy to use, supports fast transfers, and gives you full control over your digital assets with complete privacy and security.",
//       icon: <Wallet className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "How can I access Jaimax Token?",
//       answer: "You can access Jaimax Token directly through the Jaimax App, available for download on Android and iOS. From here, you can create a wallet, invest in Jaimax, track your balance, and manage referrals—all in one place.",
//       icon: <TrendingUp className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "What can I do with Jaimax Token?",
//       answer: "Jaimax Token can be used for fast and secure digital transactions, stored safely in your Jaimax Wallet, and managed directly through the Jaimax App. As the Jaimax ecosystem grows, it will be integrated into more platforms and services, offering even greater utility and real-world use for crypto enthusiasts.",
//       icon: <DollarSign className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "Can I use Jaimax Token for real-world transactions?",
//       answer: "Yes, Jaimax is working on expanding real-world utility through merchant partnerships, making it easier to use Jaimax for payments, services, and online transactions. We aim to make Jaimax a widely accepted digital currency for everyday use.",
//       icon: <Globe className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "Is Jaimax listed on any crypto exchanges?",
//       answer: "Jaimax Token is currently available exclusively through our official Jaimax platform and app. We're planning future listings on popular crypto exchanges, which will enhance liquidity and accessibility. Stay tuned for updates on exchange integrations.",
//       icon: <TrendingUp className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "What blockchain is Jaimax Token built on?",
//       answer: "Jaimax Token is developed on a reliable and high-performance blockchain network that supports fast transactions, low gas fees, and smart contract functionality. Our tech ensures that your crypto experience is seamless and future-ready.",
//       icon: <Shield className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//     {
//       question: "How can I stay updated with Jaimax Token news?",
//       answer: "Stay connected by following our official Jaimax social media channels, joining our community, and using the Jaimax App for real-time updates. You'll receive notifications about new features, roadmap progress, and exciting developments in the Jaimax ecosystem.",
//       icon: <Bell className="w-5 h-5" />,
//       gradient: "from-green-500 to-teal-600"
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-[#085056]">
//       {/* Subtle Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: 'radial-gradient(circle at 25% 25%, #4ecdc4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #4ecdc4 1px, transparent 1px)',
//           backgroundSize: '80px 80px, 40px 40px'
//         }}></div>
//       </div>

//       <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-12 lg:py-10">
//         <div className="max-w-7xl mx-auto">
//           {/* Hero Header */}
//           <div className="text-center mb-12 sm:mb-16">
           
//             <p className="text-lg sm:text-xl lg:text-2xl font-light text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
//               Frequently Asked Questions
//             </p>
//             <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#4ecdc4] to-[#094e54] mx-auto rounded-full"></div>
//           </div>

//           {/* FAQ Grid - Responsive Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-5">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="group"
//                 style={{
//                   animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
//                 }}
//               >
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/70 hover:border-[#4ecdc4]/30 hover:shadow-lg hover:shadow-[#4ecdc4]/10">
//                   {/* Question */}
//                   <button
//                     onClick={() => toggleFAQ(index)}
//                     className="w-full p-4 sm:p-6 text-left flex items-center justify-between group/btn focus:outline-none focus:bg-slate-800/70 transition-colors duration-200"
//                   >
//                     <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
//                       <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${faq.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}>
//                         <div className="text-white">
//                           {faq.icon}
//                         </div>
//                       </div>
//                       <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white group-hover/btn:text-[#4ecdc4] transition-colors duration-300 pr-2">
//                         {faq.question}
//                       </h3>
//                     </div>

//                     <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
//                       activeIndex === index ? 'rotate-180 bg-gradient-to-br from-[#4ecdc4] to-[#094e54]' : 'group-hover/btn:bg-slate-600'
//                     }`}>
//                       {activeIndex === index ? (
//                         <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       ) : (
//                         <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
//                       )}
//                     </div>
//                   </button>

//                   {/* Answer */}
//                   <div className={`overflow-hidden  transition-all duration-500 ease-out ${
//                     activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                   }`}>
//                     <div className="px-4 sm:px-6 pb-4  py-3 sm:pb-6">
//                       <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#4ecdc4]/70">
//                         <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Bottom CTA Section */}
          
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// const TokenStats = () => {
//   const [copied, setCopied] = useState(false);

//   // Contract address
//   const CONTRACT_ADDRESS = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
//   const BSCSCAN_URL = `https://bscscan.com/token/${CONTRACT_ADDRESS}`;

//   // Copy to clipboard
//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(CONTRACT_ADDRESS);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   };

//   // Fetch data
//   const { data: roundData, isLoading, refetch } = useGetRoundQuery();
//   const currentRound = roundData?.data?.rounds?.find((r) => r.status === 1) || {};

//   useEffect(() => {
//     const interval = setInterval(refetch, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const formatNumber = (num) => {
//     if (!num) return "0";
//     if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K";
//     return num.toLocaleString();
//   };

//   // Stats
//   const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 0);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 0);
//   const progressPercent = Math.min(((currentRound?.soldQty || 0) / 10000000000) * 100, 100);

//   // Truncate address for mobile
//   const truncateAddress = (address) => {
//     return `${address.slice(0, 8)}...${address.slice(-6)}`;
//   };

//   return (
//     <div className="w-full bg-[#085056] py-6 sm:py-8 md:py-5 lg:py-5 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
//       {/* Decorative elements - responsive sizes */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[150px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-teal-200/5 rounded-full filter blur-[80px] sm:blur-[100px]"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-teal-400/5 rounded-full filter blur-[100px] sm:blur-[120px]"></div>
//       </div>
      
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 0.3; }
//           50% { transform: scale(2); opacity: 0.7; }
//         }
//       `}</style>
      
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header section */}
//         <div className="flex flex-col items-center mb-6 sm:mb-8 md:mb-10 lg:mb-14 text-center">
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#064046] rounded-full mb-3 sm:mb-4 border border-teal-800/70 shadow-lg shadow-teal-900/20"
//           >
//             <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-teal-300 animate-pulse"></span>
//             <span className="text-white/90 text-[10px] sm:text-xs md:text-sm font-medium">Phase {currentRound?.round || 1} Active</span>
//           </motion.div>
          
//           <motion.h2
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-100 mb-2 sm:mb-3 md:mb-4 px-4"
//           >
//             Jaimax Token Metrics
//           </motion.h2>
          
         
//         </div>
        
//         {/* Contract Address Card - Improved mobile layout */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 bg-[#064046] rounded-xl sm:rounded-2xl overflow-hidden border border-teal-800/70 shadow-xl relative"
//         >
//           <div className="absolute -right-10 sm:-right-20 -top-10 sm:-top-20 w-20 sm:w-40 md:w-60 h-20 sm:h-40 md:h-60 bg-teal-300/5 rounded-full filter blur-[30px] sm:blur-[50px]"></div>
          
//           <div className="px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 relative">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
//               <div className="flex-grow w-full lg:w-auto">
//                 <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
//                   <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#053439]">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-white text-base sm:text-lg md:text-xl font-medium">Contract Address</h3>
//                 </div>
                
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
//                   {/* Mobile: Show truncated address, Desktop: Show full */}
//                   <div className="bg-[#053439] rounded-full py-1.5 sm:py-2 px-3 sm:px-4 font-mono text-xs sm:text-sm md:text-base text-teal-50 tracking-wider w-full sm:w-auto">
//                     <span className="sm:hidden">{truncateAddress(CONTRACT_ADDRESS)}</span>
//                     <span className="hidden sm:inline">{CONTRACT_ADDRESS}</span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 w-full sm:w-auto">
//                     <motion.button 
//                       onClick={copyToClipboard}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-[#053439] hover:bg-[#042d32] border border-teal-800/50 rounded-full text-white text-xs sm:text-sm md:text-base transition-all duration-300 flex-1 sm:flex-initial"
//                     >
//                       {copied ? (
//                         <>
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                           <span>Copied</span>
//                         </>
//                       ) : (
//                         <>
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                           </svg>
//                           <span>Copy</span>
//                         </>
//                       )}
//                     </motion.button>
                    
//                     <motion.a 
//                       href={BSCSCAN_URL} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-teal-400/20 hover:bg-teal-400/30 border border-teal-800/60 rounded-full text-white text-xs sm:text-sm md:text-base transition-all duration-300 flex-1 sm:flex-initial"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                       <span>BscScan</span>
//                     </motion.a>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Round Status - Better mobile layout */}
//               <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-[#053439] p-1.5 sm:p-2 rounded-full border border-teal-800/60 shadow-lg w-full sm:w-auto justify-center">
//                 <div className="flex flex-col items-center px-4 sm:px-5 md:px-6 py-1 sm:py-1.5 md:py-2 border-r border-teal-800/40">
//                   <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">Phase</span>
//                   <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">{currentRound?.round || 1}</span>
//                 </div>
//                 <div className="flex flex-col items-center px-4 sm:px-5 md:px-6 py-1 sm:py-1.5 md:py-2">
//                   <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">Status</span>
//                   <span className="text-[10px] sm:text-xs md:text-sm font-bold text-teal-300 flex items-center gap-1 sm:gap-1.5">
//                     <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-300 rounded-full animate-pulse"></span>
//                     Active
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
        
//         {/* Stats Grid - Enhanced mobile responsiveness */}
// <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-10 lg:mb-14">
//   {/* Live Price Card */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.7, delay: 0.1 }}
//     className="group relative"
//   >
//     <div className="absolute inset-0 bg-teal-400/5 rounded-xl sm:rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
    
//     <div className="relative bg-gradient-to-br from-[#053439] to-[#064046] rounded-xl sm:rounded-2xl border-l border-t border-teal-500/20 border-r border-b border-teal-900/70 shadow-xl overflow-hidden h-full">
//       {/* Pattern overlay */}
//       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:10px_10px]"></div>
      
//       {/* Top accent bar */}
//       {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500"></div> */}
      
//       <div className="p-4 sm:p-5 md:p-6 relative h-full flex flex-col">
//         <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4 lg:mb-5">
//           <div className="w-full">
//             <div className="flex items-center justify-between">
//               <h3 className="text-teal-300 text-[10px] sm:text-xs uppercase tracking-wider font-medium">Current Price</h3>
              
//               <div className="bg-teal-900/50 px-2 py-0.5 rounded text-[10px] text-teal-300 flex items-center gap-1">
//                 <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
//                 LIVE
//               </div>
//             </div>
            
//             <div className="flex items-baseline gap-1 sm:gap-1.5 md:gap-2 mt-2 sm:mt-3">
//               <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">₹{livePrice}</div>
//               <div className="text-teal-400 text-[10px] sm:text-xs md:text-sm">INR</div>
              
//               {/* Price trend indicator */}
              
//             </div>
            
//             {/* Mini chart - Linear increase with slight variations */}
//             <div className="mt-3 sm:mt-4 h-8 sm:h-10 w-full flex items-end gap-0.5 sm:gap-1">
//               {[4, 5, 5.5, 6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12].map((h, i) => (
//                 <div 
//                   key={i} 
//                   style={{height: `${h * 8}%`}}
//                   className="w-full bg-teal-400/30 group-hover:bg-teal-400/40 transition-colors rounded-sm"
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </motion.div>
  
//   {/* Tokens Sold Card - Keeping as is */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.7, delay: 0.2 }}
//     className="group relative"
//   >
//     <div className="absolute inset-0 bg-teal-400/5 rounded-xl sm:rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
    
//     <div className="relative bg-gradient-to-br from-[#053439] to-[#064046] rounded-xl sm:rounded-2xl border-t border-l border-teal-500/20 border-b border-r border-teal-950 shadow-xl overflow-hidden h-full">
//       <div className="absolute bottom-0 left-0 h-16 w-16 bg-teal-300/5 rounded-full translate-y-8 -translate-x-8"></div>
//       <div className="p-4 sm:p-5 md:p-6 relative h-full flex flex-col">
//         <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
//           <div className="w-full">
//             <div className="flex items-center gap-1.5 sm:gap-2">
              
//               <h3 className="text-teal-300 text-[10px] sm:text-xs uppercase tracking-wider font-medium">Tokens Sold</h3>
//             </div>
            
//             <div className="flex items-baseline gap-1 sm:gap-1.5 md:gap-2 mt-1.5 sm:mt-2">
//               <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{soldTokens}</div>
//               <div className="text-teal-400 text-[10px] sm:text-xs md:text-sm">JMC</div>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-auto">
//           {/* Progress visualization */}
//           <div className="mb-2">
//             <div className="flex justify-between text-[10px] sm:text-xs text-teal-400/80 mb-1">
//               <span className="font-medium">{progressPercent.toFixed(1)}% Complete</span>
//               <span>Goal: 10B</span>
//             </div>
//             <div className="h-2 sm:h-2.5 md:h-3 w-full bg-teal-900/50 rounded-full overflow-hidden relative">
//               <motion.div 
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progressPercent}%` }}
//                 transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
//                 className="h-full bg-teal-400 rounded-full absolute"
//               />
//               <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNiIgaGVpZ2h0PSI2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-30"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </motion.div>
  
//   {/* Community Card */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.7, delay: 0.3 }}
//     className="group relative sm:col-span-2 xl:col-span-1"
//   >
//     <div className="absolute inset-0 bg-teal-400/5 rounded-xl sm:rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
    
//     <div className="relative bg-gradient-to-br from-[#053439] to-[#064046] rounded-xl sm:rounded-2xl border-l border-t border-teal-500/20 border-r border-b border-teal-900/70 shadow-xl overflow-hidden h-full">

//       {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-400"></div> */}
      
//       <div className="p-4 sm:p-5 md:p-6 relative h-full flex flex-col">
//         <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5 lg:mb-6">
//           <div className="w-full">
//             <div className="flex items-center justify-between">
//               <h3 className="text-teal-300 text-[10px] sm:text-xs uppercase tracking-wider font-medium">Token Holders</h3>
              
              
//             </div>
            
//             <div className="flex items-baseline gap-1 sm:gap-1.5 md:gap-2 mt-1.5 sm:mt-2">
//               <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">26.3k</div>
//               <div className="text-teal-400 text-[10px] sm:text-xs md:text-sm">Members</div>
//             </div>
            
//             {/* Member visualization */}
//             <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
//               <div className="flex -space-x-2 mr-2">
               
//               </div>
              
//               <div className="bg-teal-900/50 px-2 py-0.5 h-fit rounded text-[10px] text-teal-300 flex items-center">
//                 {/* <span className="text-teal-200 font-medium">6.5k</span> */}
//                 <span className="ml-1">active now</span>
//               </div>
//             </div>
            
//             {/* Activity indicator */}
//             <div className="mt-3 sm:mt-4 w-full flex items-center gap-1 sm:gap-1.5">
//               {[...Array(7)].map((_, i) => (
//                 <div 
//                   key={i} 
//                   className={`h-1 grow rounded-full ${i % 2 === 0 ? 'bg-teal-500/40' : 'bg-teal-700/40'}`}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </motion.div>
// </div>
//       </div>
//     </div>
//   );
// };
// // 3D Wheel Component (without floating particles)
// const Wheel3D = ({ 
//   wheelRef, 
//   activePhase, 
//   setActivePhase, 
//   phases, 
//   segmentAngle, 
//   tealColors, 
//   size = 'desktop' 
// }) => {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const containerRef = useRef(null);

//   const config = size === 'mobile' 
//     ? { outerRadius: 125, innerRadius: 35, centerSize: 'w-16 h-16', fontSize: 'text-lg' }
//     : { outerRadius: 170, innerRadius: 50, centerSize: 'w-28 h-28', fontSize: 'text-2xl' };

//   const handleMouseMove = (e) => {
//     if (!containerRef.current || size === 'mobile') return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
//     const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
//     setMousePos({ x: x * 10, y: y * 10 });
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setMousePos({ x: 0, y: 0 });
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="relative"
//       style={{ perspective: '1200px' }}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Ambient Glow */}
//       <div 
//         className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse"
//         style={{ 
//           background: `radial-gradient(circle, ${tealColors.main}60 0%, transparent 70%)`,
//           transform: 'scale(1.3)'
//         }}
//       />

//       {/* 3D Wheel Container */}
//       <div
//         ref={wheelRef}
//         className="relative w-full h-full transition-transform duration-200 ease-out"
//         style={{ 
//           transformStyle: 'preserve-3d',
//           transform: size === 'desktop' 
//             ? `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)` 
//             : 'none',
//           transformOrigin: 'center center'
//         }}
//       >
//         {/* Back shadow layer for depth */}
//         <svg 
//           className="absolute w-full h-full"
//           viewBox="0 0 400 400"
//           style={{ transform: 'translateZ(-30px)' }}
//         >
//           <defs>
//             <radialGradient id={`backGlow-${size}`} cx="40%" cy="40%">
//               <stop offset="0%" stopColor={tealColors.dark} stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
//             </radialGradient>
//           </defs>
//           <circle 
//             cx="200" 
//             cy="200" 
//             r={config.outerRadius + 15} 
//             fill={`url(#backGlow-${size})`}
//             opacity="0.5"
//           />
//         </svg>

//         {/* Main 3D Wheel SVG */}
//         <svg className="w-full h-full relative" viewBox="0 0 400 400">
//           <defs>
//             {/* 3D Lighting Gradient */}
//             <radialGradient id={`lighting-${size}`} cx="30%" cy="30%">
//               <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
//               <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
//               <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
//             </radialGradient>

//             {/* Active Segment 3D Gradient */}
//             <linearGradient id={`activeGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#3db8b8" />
//               <stop offset="40%" stopColor={tealColors.main} />
//               <stop offset="100%" stopColor={tealColors.dark} />
//             </linearGradient>

//             {/* Inactive Segment 3D Gradient */}
//             <linearGradient id={`inactiveGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#ffffff" />
//               <stop offset="50%" stopColor="#f8f8f8" />
//               <stop offset="100%" stopColor="#e8e8e8" />
//             </linearGradient>

//             {/* Glow Filter */}
//             <filter id={`glow3d-${size}`} x="-50%" y="-50%" width="200%" height="200%">
//               <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
//               <feMerge>
//                 <feMergeNode in="coloredBlur"/>
//                 <feMergeNode in="coloredBlur"/>
//                 <feMergeNode in="SourceGraphic"/>
//               </feMerge>
//             </filter>

//             {/* Bevel/Emboss Filter */}
//             <filter id={`bevel-${size}`} x="-20%" y="-20%" width="140%" height="140%">
//               <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
//               <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.8" 
//                                   specularExponent="25" lightingColor="#ffffff" result="specOut">
//                 <fePointLight x="100" y="100" z="200"/>
//               </feSpecularLighting>
//               <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
//               <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" 
//                            k1="0" k2="1" k3="1" k4="0"/>
//             </filter>

//             {/* Drop Shadow */}
//             <filter id={`dropShadow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
//               <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.35"/>
//             </filter>

//             {/* Inner Shadow for depth */}
//             <filter id={`innerShadow-${size}`}>
//               <feComponentTransfer in="SourceAlpha">
//                 <feFuncA type="table" tableValues="1 0"/>
//               </feComponentTransfer>
//               <feGaussianBlur stdDeviation="3"/>
//               <feOffset dx="2" dy="3" result="offsetblur"/>
//               <feFlood floodColor="#000" floodOpacity="0.4"/>
//               <feComposite in2="offsetblur" operator="in"/>
//               <feMerge>
//                 <feMergeNode/>
//                 <feMergeNode in="SourceGraphic"/>
//               </feMerge>
//             </filter>
//           </defs>

//           {/* Outer Ring - 3D Rim Effect */}
//           <circle 
//             cx="200" 
//             cy="200" 
//             r={config.outerRadius + 8}
//             fill="none"
//             stroke={`url(#lighting-${size})`}
//             strokeWidth="12"
//             filter={`url(#dropShadow-${size})`}
//           />

//           {/* Segments */}
//           {phases.map((phase, index) => {
//             const startAngle = index * segmentAngle - 90;
//             const endAngle = (index + 1) * segmentAngle - 90;
//             const isActive = index === activePhase;
            
//             const startAngleRad = (startAngle * Math.PI) / 180;
//             const endAngleRad = (endAngle * Math.PI) / 180;
            
//             const { outerRadius, innerRadius } = config;
            
//             const x1 = 200 + outerRadius * Math.cos(startAngleRad);
//             const y1 = 200 + outerRadius * Math.sin(startAngleRad);
//             const x2 = 200 + outerRadius * Math.cos(endAngleRad);
//             const y2 = 200 + outerRadius * Math.sin(endAngleRad);
//             const x3 = 200 + innerRadius * Math.cos(endAngleRad);
//             const y3 = 200 + innerRadius * Math.sin(endAngleRad);
//             const x4 = 200 + innerRadius * Math.cos(startAngleRad);
//             const y4 = 200 + innerRadius * Math.sin(startAngleRad);
            
//             const largeArcFlag = segmentAngle > 180 ? 1 : 0;
            
//             const pathData = [
//               `M ${x1} ${y1}`,
//               `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
//               `L ${x3} ${y3}`,
//               `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
//               'Z'
//             ].join(' ');
            
//             const textAngle = (startAngle + endAngle) / 2;
//             const textRadius = (outerRadius + innerRadius) / 2;
//             const textAngleRad = (textAngle * Math.PI) / 180;
//             const textX = 200 + textRadius * Math.cos(textAngleRad);
//             const textY = 200 + textRadius * Math.sin(textAngleRad);
            
//             return (
//               <g key={index} className="transition-all duration-300">
//                 {/* Shadow layer */}
//                 <path
//                   d={pathData}
//                   fill={isActive ? tealColors.dark : '#999'}
//                   transform="translate(3, 4)"
//                   opacity="0.3"
//                 />
                
//                 {/* Main Segment */}
//                 <path
//                   d={pathData}
//                   fill={isActive ? `url(#activeGrad-${size})` : `url(#inactiveGrad-${size})`}
//                   stroke={isActive ? '#ffffff' : tealColors.main}
//                   strokeWidth={isActive ? "2.5" : "1.5"}
//                   className="cursor-pointer transition-all duration-300"
//                   onClick={() => setActivePhase(index)}
//                   filter={isActive ? `url(#glow3d-${size})` : `url(#bevel-${size})`}
//                 />

//                 {/* 3D Highlight Overlay */}
//                 <path
//                   d={pathData}
//                   fill={`url(#lighting-${size})`}
//                   className="pointer-events-none"
//                   opacity={isActive ? "0.5" : "0.3"}
//                 />

//                 {/* Segment Number */}
//                 <text
//                   x={textX}
//                   y={textY}
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   className="pointer-events-none font-black"
//                   style={{
//                     fill: isActive ? '#ffffff' : tealColors.dark,
//                     fontSize: size === 'mobile' ? '12px' : '16px',
//                     filter: isActive ? 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' : 'none'
//                   }}
//                   transform={`rotate(${textAngle}, ${textX}, ${textY})`}
//                 >
//                   {index + 1}
//                 </text>

//                 {/* Active indicator dot */}
//                 {isActive && (
//                   <circle
//                     cx={textX}
//                     cy={textY + (size === 'mobile' ? 12 : 18)}
//                     r="3"
//                     fill="#ffffff"
//                     opacity="0.8"
//                     className="animate-pulse"
//                     transform={`rotate(${textAngle}, ${textX}, ${textY + (size === 'mobile' ? 12 : 18)})`}
//                   />
//                 )}
//               </g>
//             );
//           })}

//           {/* Inner Ring 3D Effect */}
//           <circle 
//             cx="200" 
//             cy="200" 
//             r={config.innerRadius + 2}
//             fill="none"
//             stroke={tealColors.dark}
//             strokeWidth="4"
//             opacity="0.4"
//             filter={`url(#innerShadow-${size})`}
//           />
//         </svg>

//         {/* 3D Center Hub */}
//         <div 
//           className="absolute top-1/2 left-1/2"
//           style={{ 
//             transform: 'translate(-50%, -50%) translateZ(25px)',
//             transformStyle: 'preserve-3d'
//           }}
//         >
//           {/* Hub Shadow */}
//           <div 
//             className={`absolute ${config.centerSize} rounded-full opacity-40`}
//             style={{ 
//               background: '#000',
//               filter: 'blur(8px)',
//               transform: 'translate(4px, 6px) translateZ(-10px)'
//             }}
//           />
          
//           {/* Hub Base */}
//           <div 
//             className={`${config.centerSize} rounded-full flex items-center justify-center relative overflow-hidden`}
//             style={{ 
//               background: `linear-gradient(145deg, #3db8b8 0%, ${tealColors.main} 40%, ${tealColors.dark} 100%)`,
//               boxShadow: `
//                 inset -3px -3px 10px rgba(0,0,0,0.4),
//                 inset 3px 3px 10px rgba(255,255,255,0.2),
//                 0 10px 40px rgba(0,0,0,0.4),
//                 0 0 30px ${tealColors.main}50
//               `
//             }}
//           >
//             {/* Glossy Highlight */}
//             <div 
//               className="absolute top-1 left-3 w-1/2 h-1/4 rounded-full opacity-40"
//               style={{ 
//                 background: 'linear-gradient(180deg, rgba(255,255,255,0.8), transparent)',
//               }}
//             />
            
//             {/* Hub Content */}
//             <div className="text-center relative z-10">
//               <div className={`text-white ${config.fontSize} font-black drop-shadow-lg`}>
//                 {activePhase + 1}
//               </div>
//               <div className="text-white/70 text-[10px] font-bold tracking-widest">
//                 PHASE
//               </div>
//             </div>

//             {/* Subtle ring */}
//             <div 
//               className="absolute inset-2 rounded-full border border-white/20"
//             />
//           </div>
//         </div>

//         {/* 3D Indicator Arrow */}
//         <div 
//           className="absolute top-0 left-1/2"
//           style={{ 
//             transform: 'translateX(-50%) translateZ(35px)',
//             transformStyle: 'preserve-3d'
//           }}
//         >
//           {/* Arrow Shadow */}
//           <div 
//             className="absolute"
//             style={{
//               width: size === 'mobile' ? '12px' : '20px',
//               height: size === 'mobile' ? '20px' : '32px',
//               background: '#000',
//               clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
//               filter: 'blur(4px)',
//               opacity: 0.4,
//               transform: 'translate(3px, 4px)'
//             }}
//           />
          
//           {/* Main Arrow */}
//           <div 
//             style={{
//               width: size === 'mobile' ? '12px' : '20px',
//               height: size === 'mobile' ? '20px' : '32px',
//               background: `linear-gradient(180deg, #3db8b8, ${tealColors.main}, ${tealColors.dark})`,
//               clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
//               boxShadow: `0 4px 15px ${tealColors.main}80`
//             }}
//           >
//             {/* Arrow Highlight */}
//             <div 
//               className="absolute top-0 left-0 w-1/2 h-1/2 opacity-50"
//               style={{
//                 background: 'linear-gradient(135deg, rgba(255,255,255,0.6), transparent)',
//                 clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Card3D = ({ phase, index, isActive, tealColors, isMobile }) => {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const cardRef = useRef(null);
//   const { data: roundData, isLoading, refetch } = useGetRoundQuery();
//   const currentRound = roundData?.data?.rounds?.find((r) => r.status === 1) || {};

//   useEffect(() => {
//     const interval = setInterval(refetch, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const formatNumber = (num) => {
//     if (!num) return "0";
//     if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K";
//     return num.toLocaleString();
//   };

//   // Stats
//   const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 0);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 0);
//   const totalQty =formatNumber(currentRound?.totalQty || 0);
//   const soldQty =formatNumber(currentRound?.soldQty||0);
// const progressPercent =
//   phase.status === 'Live' && currentRound?.totalQty > 0
//     ? Math.min((currentRound.soldQty / currentRound.totalQty) * 100, 100)
//     : 0;

    
// const handleMouseMove = (e) => {
//     if (!cardRef.current || isMobile) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
//     const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
//     setMousePos({ x: x * 8, y: y * 8 });
//   };

//   const handleMouseLeave = () => {
//     setMousePos({ x: 0, y: 0 });
//   };

//   return (
//     <div 
//       className="relative w-full"
//       style={{ 
//         perspective: '1000px',
//         transformStyle: 'preserve-3d'
//       }}
//     >
//       <div
//         ref={cardRef}
//         className="relative w-full transition-transform duration-300 ease-out"
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         style={{
//           transform: !isMobile 
//             ? `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateZ(${isActive ? '20px' : '0'})` 
//             : 'none',
//           transformStyle: 'preserve-3d'
//         }}
//       >
//         {/* Card Shadow */}
//         <div 
//           className="absolute inset-0 rounded-2xl"
//           style={{
//             background: 'linear-gradient(145deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
//             filter: 'blur(20px)',
//             transform: 'translateZ(-30px) translateY(10px) scaleX(0.9)',
//             opacity: 0.6
//           }}
//         />

//         {/* Main Card Container */}
//         <div 
//           className={`overflow-hidden ${isMobile ? 'rounded-xl' : 'rounded-2xl'} relative`}
//           style={{
//             background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
//             boxShadow: `
//               0 20px 60px rgba(0,0,0,0.2),
//               0 10px 20px rgba(0,0,0,0.15),
//               inset 0 -2px 5px rgba(0,0,0,0.1)
//             `
//           }}
//         >
//           {/* 3D Header */}
//           <div 
//             className={`${isMobile ? 'p-3' : 'p-5'} text-white relative overflow-hidden`}
//             style={{ 
//               background: `linear-gradient(135deg, ${tealColors.main}, ${tealColors.dark})`,
//               transformStyle: 'preserve-3d'
//             }}
//           >
//             {/* Header depth layer */}
//             <div 
//               className="absolute inset-0"
//               style={{
//                 background: 'linear-gradient(45deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
//                 transform: 'translateZ(5px)'
//               }}
//             />

//             {/* Glossy overlay */}
//             <div 
//               className="absolute inset-0"
//               style={{
//                 background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
//                 transform: 'translateZ(10px)'
//               }}
//             />

//             <div className="relative z-10 flex justify-between items-start">
//               <div>
//                 {/* 3D Status Badge */}
//                 <div 
//                   className={`inline-flex items-center ${isMobile ? 'px-1.5 py-0.5' : 'px-2 py-1'} rounded-full text-xs font-semibold ${isMobile ? 'mb-1' : 'mb-2'}`}
//                   style={{
//                     background: phase.status === 'Live' 
//                       ? 'linear-gradient(135deg, #10b981, #059669)' 
//                       : 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
//                     boxShadow: phase.status === 'Live'
//                       ? '0 4px 12px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
//                       : 'inset 0 1px 0 rgba(255,255,255,0.3)',
//                     transform: 'translateZ(15px)'
//                   }}
//                 >
//                   {phase.status === 'Live' && (
//                     <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse shadow-lg" />
//                   )}
//                   {phase.status}
//                 </div>

//                 <h3 className={`${isMobile ? 'text-base' : 'text-2xl'} font-bold drop-shadow-lg`}>
//                   Phase {phase.phaseNo}
//                 </h3>
//                 <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'}`}>Investment Round</p>
//               </div>
              
//               {/* 3D Icon Container */}
//               <div 
//                 className={`relative ${isMobile ? 'p-1' : 'p-2'} rounded-lg backdrop-blur-sm`}
//                 style={{
//                   background: 'linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
//                   boxShadow: `
//                     inset 1px 1px 2px rgba(255,255,255,0.3),
//                     inset -1px -1px 2px rgba(0,0,0,0.2),
//                     0 4px 8px rgba(0,0,0,0.2)
//                   `,
//                   transform: 'translateZ(20px)'
//                 }}
//               >
//                 {React.cloneElement(phase.icon, { 
//                   className: `${isMobile ? 'w-3 h-3' : 'w-5 h-5'} text-white filter drop-shadow-lg` 
//                 })}
//               </div>
//             </div>
//           </div>
          
//           {/* 3D Content */}
//           <div className={`${isMobile ? 'p-3' : 'p-5'} relative`}>
//             {/* Content background gradient */}
//             <div 
//               className="absolute inset-0 opacity-5"
//               style={{
//                 background: `radial-gradient(circle at 30% 30%, ${tealColors.main}, transparent)`
//               }}
//             />

//             {/* 3D Progress Bar */}
//             <div className={`${isMobile ? 'mb-3' : 'mb-4'} relative`}>
//               <div className={`flex justify-between items-center ${isMobile ? 'mb-1' : 'mb-2'}`}>
//                 <span className={`text-gray-600 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
//                   {isMobile ? 'Progress' : 'Phase Progress'}
//                 </span>
//                 <span 
//                   className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}
//                   style={{ 
//                     color: tealColors.main,
//                     textShadow: `0 2px 4px ${tealColors.main}30`
//                   }}
//                 >
//                   {progressPercent}%
//                 </span>
//               </div>
              
//               {/* 3D Progress Track */}
//               <div 
//                 className={`${isMobile ? 'h-1.5' : 'h-3'} rounded-full overflow-hidden relative`}
//                 style={{
//                   background: 'linear-gradient(180deg, #e5e5e5, #f0f0f0)',
//                   boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
//                 }}
//               >
//                 {/* Progress Fill */}
//                 <div 
//                   className="h-full rounded-full transition-all duration-1000 relative"
//                   style={{ 
//                     width: `${phase.progress}%`,
//                     background: `linear-gradient(180deg, ${tealColors.main}, ${tealColors.dark})`,
//                     boxShadow: `
//                       0 2px 4px ${tealColors.main}50,
//                       inset 0 1px 0 rgba(255,255,255,0.3)
//                     `
//                   }}
//                 >
//                   {/* Progress shine */}
//                   <div 
//                     className="absolute inset-0 opacity-30"
//                     style={{
//                       background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)'
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* 3D Token Details */}
//             <div className={`space-y-${isMobile ? '2' : '3'} ${isMobile ? 'mb-3' : 'mb-4'}`}>
//               {/* Token Supply */}
//               <div className="flex items-start gap-2">
//                 <div 
//                   className={`${isMobile ? 'w-5 h-5' : 'w-10 h-10'} rounded-lg flex items-center justify-center relative`}
//                   style={{
//                     background: 'linear-gradient(145deg, #e8fffe, #d0f7f5)',
//                     boxShadow: `
//                       2px 2px 6px rgba(0,0,0,0.1),
//                       -2px -2px 6px rgba(255,255,255,0.8),
//                       inset 1px 1px 2px rgba(255,255,255,0.5)
//                     `
//                   }}
//                 >
//                   <Coins className={`${isMobile ? 'w-2.5 h-2.5' : 'w-5 h-5'} text-[#0fcbcc]`} />
//                 </div>
//                 <div>
//                   <p className={`font-semibold text-gray-900 ${isMobile ? 'text-xs' : 'text-base'}`}>
//                     Token Supply
//                   </p>
//                   <p className="text-gray-600 text-xs">{phase.tokens}</p>
//                 </div>
//               </div>
              
//               {/* Price Range */}
//               <div className="flex items-start gap-2">
//                 <div 
//                   className={`${isMobile ? 'w-5 h-5' : 'w-10 h-10'} rounded-lg flex items-center justify-center relative`}
//                   style={{
//                     background: 'linear-gradient(145deg, #e8fffe, #d0f7f5)',
//                     boxShadow: `
//                       2px 2px 6px rgba(0,0,0,0.1),
//                       -2px -2px 6px rgba(255,255,255,0.8),
//                       inset 1px 1px 2px rgba(255,255,255,0.5)
//                     `
//                   }}
//                 >
//                   <IndianRupee className={`${isMobile ? 'w-2.5 h-2.5' : 'w-5 h-5'} text-[#0fcbcc]`} />
//                 </div>
//                 <div>
//                   <p className={`font-semibold text-gray-900 ${isMobile ? 'text-xs' : 'text-base'}`}>
//                     Price Range
//                   </p>
//                   <p className="text-gray-600 text-xs">{phase.price}</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* 3D Action Button */}
//             <button
//               className={`w-full ${isMobile ? 'py-2 text-sm' : 'py-3'} rounded-${isMobile ? 'lg' : 'full'} font-bold text-white transition-all duration-300 relative overflow-hidden`}
//               style={{ 
//                 background: phase.status === 'Live' 
//                   ? `linear-gradient(135deg, ${tealColors.main}, ${tealColors.dark})` 
//                   : 'linear-gradient(135deg, #9ca3af, #6b7280)',
//                 opacity: phase.status === 'Live' ? 1 : 0.7,
//                 boxShadow: phase.status === 'Live'
//                   ? `
//                     0 4px 15px ${tealColors.main}40,
//                     inset 0 1px 0 rgba(255,255,255,0.2),
//                     inset 0 -2px 0 rgba(0,0,0,0.2)
//                   `
//                   : 'inset 0 1px 0 rgba(255,255,255,0.2)',
//                 transform: phase.status === 'Live' ? 'translateZ(5px)' : 'none',
//                 transformStyle: 'preserve-3d'
//               }}
//               disabled={phase.status !== 'Live'}
//             >
//               {/* Button shine effect */}
//               <div 
//                 className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
//                 style={{
//                   background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
//                   animation: phase.status === 'Live' ? 'shine 3s infinite' : 'none'
//                 }}
//               />
//               <span className="relative z-10">{phase.button}</span>
//             </button>
            
//             {/* Footer */}
//             <div className={`flex justify-between items-center ${isMobile ? 'mt-2 pt-2' : 'mt-4 pt-4'} border-t border-gray-100`}>
//               <span className="text-gray-500 text-xs">
//                 Phase {index + 1} of {phases.length}
//               </span>
//               {!isMobile && index < phases.length - 1 && (
//                 <span 
//                   className="text-xs font-medium"
//                   style={{ 
//                     color: tealColors.main,
//                     textShadow: `0 1px 2px ${tealColors.main}20`
//                   }}
//                 >
//                   Next: Phase {index + 2} →
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PhasesWheelSection = () => {
//   const pinContainerRef = useRef(null);
//   const contentContainerRef = useRef(null);
//   const wheelSectionRef = useRef(null);
//   const wheelRef = useRef(null);
//   const [activePhase, setActivePhase] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   const tealColors = {
//     main: "#268888ff",
//     dark: "#085056", 
//     medium: "#064046",
//     light: "#064046",
//     bg: "#054248"
//   };

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     ScrollTrigger.getAll().forEach((trigger) => {
//       if (trigger.vars.id?.toString().includes("phases-wheel")) {
//         trigger.kill();
//       }
//     });

//     if (!wheelRef.current || !contentContainerRef.current || !wheelSectionRef.current) {
//       console.error("Required refs not found");
//       return;
//     }

//     let currentPhaseIndex = 0;
//     let isAnimating = false;
//     let isPinned = false; // Track if section is pinned
//     const totalPhases = phases.length;
//     const rotationPerPhase = 360 / totalPhases;

//     // Function to navigate to specific phase
//     const navigateToPhase = (index) => {
//       if (isAnimating || index === currentPhaseIndex || index < 0 || index >= totalPhases) {
//         return;
//       }

//       isAnimating = true;
//       currentPhaseIndex = index;

//       // Rotate wheel to new position
//       gsap.to(wheelRef.current, {
//         rotation: currentPhaseIndex * rotationPerPhase,
//         duration: isMobile ? 0.4 : 0.6,
//         ease: "power2.inOut",
//         onComplete: () => {
//           isAnimating = false;
//         }
//       });

//       setActivePhase(currentPhaseIndex);
//     };

//     const ctx = gsap.context(() => {
//       const wheelHeight = wheelSectionRef.current.offsetHeight;
      
//       // Pin the section and track pin state
//       ScrollTrigger.create({
//         trigger: contentContainerRef.current,
//         endTrigger: pinContainerRef.current,
//         start: `top+=${wheelHeight / 2}px center`,
//         end: "bottom bottom",
//         pin: contentContainerRef.current,
//         id: isMobile ? "phases-wheel-pin-mobile" : "phases-wheel-pin",
//         markers: false,
//         onEnter: () => {
//           currentPhaseIndex = 0;
//           isPinned = true; // Section is now pinned
//           gsap.set(wheelRef.current, { rotation: 0 });
//           setActivePhase(0);
//         },
//         onLeave: () => {
//           isPinned = false; // Section is no longer pinned
//         },
//         onEnterBack: () => {
//           isPinned = true; // Section is pinned again
//         },
//         onLeaveBack: () => {
//           currentPhaseIndex = 0;
//           isPinned = false; // Section is no longer pinned
//           gsap.set(wheelRef.current, { rotation: 0 });
//           setActivePhase(0);
//         },
//       });

//       if (!isMobile) {
//         // Desktop wheel event handler
//         let lastWheelTime = 0;
//         const wheelCooldown = 600;

//         const handleWheel = (e) => {
//           // Only handle wheel events when section is pinned
//           if (!isPinned) {
//             return; // Allow normal scrolling
//           }

//           const currentTime = Date.now();
          
//           // If at boundaries, allow normal scroll
//           if ((currentPhaseIndex === 0 && e.deltaY < 0) || 
//               (currentPhaseIndex === totalPhases - 1 && e.deltaY > 0)) {
//             return; 
//           }

//           e.preventDefault();
//           e.stopPropagation();

//           if (currentTime - lastWheelTime < wheelCooldown || isAnimating) {
//             return;
//           }

//           const delta = e.deltaY;

//           if (Math.abs(delta) > 5) {
//             if (delta > 0) {
//               if (currentPhaseIndex < totalPhases - 1) {
//                 lastWheelTime = currentTime;
//                 navigateToPhase(currentPhaseIndex + 1);
//               }
//             } else {
//               if (currentPhaseIndex > 0) {
//                 lastWheelTime = currentTime;
//                 navigateToPhase(currentPhaseIndex - 1);
//               }
//             }
//           }
//         };

//         window.addEventListener('wheel', handleWheel, { passive: false });
        
//         window.phasesWheelCleanup = () => {
//           window.removeEventListener('wheel', handleWheel);
//         };

//       } else {
//         // Mobile touch handler
//         let touchStartY = 0;
//         let touchStartX = 0;
//         let lastTouchTime = 0;
//         const touchCooldown = 500;

//         const handleTouchStart = (e) => {
//           // Only handle touch when section is pinned
//           if (!isPinned) return;
          
//           touchStartY = e.touches[0].clientY;
//           touchStartX = e.touches[0].clientX;
//         };

//         const handleTouchMove = (e) => {
//           // Only handle touch when section is pinned
//           if (!isPinned) return;

//           // If at boundaries, allow normal scroll
//           if ((currentPhaseIndex === 0 && e.touches[0].clientY > touchStartY) || 
//               (currentPhaseIndex === totalPhases - 1 && e.touches[0].clientY < touchStartY)) {
//             return; 
//           }

//           // Prevent default to stop normal scrolling
//           e.preventDefault();
//         };

//         const handleTouchEnd = (e) => {
//           // Only handle touch when section is pinned
//           if (!isPinned) return;

//           const currentTime = Date.now();
          
//           if (currentTime - lastTouchTime < touchCooldown || isAnimating) {
//             return;
//           }

//           const touchEndY = e.changedTouches[0].clientY;
//           const touchEndX = e.changedTouches[0].clientX;
          
//           const deltaY = touchStartY - touchEndY;
//           const deltaX = Math.abs(touchStartX - touchEndX);
          
//           // Make sure it's a vertical swipe (not horizontal)
//           if (Math.abs(deltaY) > 30 && deltaX < 100) {
//             if (deltaY > 0 && currentPhaseIndex < totalPhases - 1) {
//               // Swipe up - next phase
//               lastTouchTime = currentTime;
//               navigateToPhase(currentPhaseIndex + 1);
//             } else if (deltaY < 0 && currentPhaseIndex > 0) {
//               // Swipe down - previous phase
//               lastTouchTime = currentTime;
//               navigateToPhase(currentPhaseIndex - 1);
//             }
//           }
//         };

//         // For mobile, attach to the body to catch all touch events
//         document.body.addEventListener('touchstart', handleTouchStart, { passive: false });
//         document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
//         document.body.addEventListener('touchend', handleTouchEnd, { passive: false });

//         window.phasesWheelCleanup = () => {
//           document.body.removeEventListener('touchstart', handleTouchStart);
//           document.body.removeEventListener('touchmove', handleTouchMove);
//           document.body.removeEventListener('touchend', handleTouchEnd);
//         };
//       }

//       // Phase dots click handler
//       const handlePhaseClick = (index) => {
//         if (!isAnimating && isPinned) {
//           navigateToPhase(index);
//         }
//       };

//       // Expose the click handler
//       window.navigateToPhase = handlePhaseClick;
//     });

//     ScrollTrigger.refresh();
//     return () => ctx.revert();
//   }, 300);

//   return () => {
//     clearTimeout(timer);
//     if (window.phasesWheelCleanup) {
//       window.phasesWheelCleanup();
//       delete window.phasesWheelCleanup;
//     }
//     ScrollTrigger.getAll().forEach((trigger) => {
//       if (trigger.vars.id?.toString().includes("phases-wheel")) {
//         trigger.kill();
//       }
//     });
//   };
// }, [isMobile]);

//   const segmentAngle = 360 / phases.length;

//   return (
//     <>
//       <style jsx>{`
//         @keyframes shine {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }
//       `}</style>

//       <section className="relative overflow-hidden bg-[#054248]">
//         {/* Background Waves */}
//         <div className="absolute inset-0 opacity-15 sm:opacity-25 overflow-hidden">
//           <svg 
//             className="absolute top-0 left-0 w-full h-[15%] sm:h-[30%]"
//             viewBox="0 0 1440 320" 
//             preserveAspectRatio="none"
//           >
//             <path 
//               fill={tealColors.main} 
//               fillOpacity="0.3"
//               d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,208C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
//             />
//           </svg>
          
//           <svg 
//             className="absolute bottom-0 left-0 w-full h-[15%] sm:h-[30%]"
//             viewBox="0 0 1440 320" 
//             preserveAspectRatio="none"
//           >
//             <path 
//               fill={tealColors.main} 
//               fillOpacity="0.3"
//               d="M0,64L60,96C120,128,240,192,360,192C480,192,600,128,720,117.3C840,107,960,149,1080,170.7C1200,192,1320,192,1380,181.3L1440,171L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
//             />
//           </svg>
//         </div>

//         {/* Grid Pattern */}
//         <div className="absolute inset-0 pointer-events-none opacity-[0.01] sm:opacity-[0.03]">
//           <div
//             className="h-full w-full"
//             style={{
//               backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
//                              linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
//               backgroundSize: "20px 20px",
//             }}
//           />
//         </div>

//         {/* Header */}
//         <div className="relative z-10 text-center pt-4 sm:pt-10 pb-3 sm:pb-6 px-4">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#053137] mb-2 sm:mb-3">
//             <div className="w-1.5 h-1.5 bg-[#085056] rounded-full animate-pulse" />
//             <span className="text-white font-medium text-xs">Token Distribution</span>
//           </div>
//           <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-white">
//             Investment Phases
//           </h2>
//         </div>

//         {/* Pin Container */}
//         <div
//           ref={pinContainerRef}
//           className="relative"
//           style={{ height: isMobile ? "200vh" : "320vh" }}
//         >
//           <div ref={contentContainerRef} className="w-full">
//             <div
//               ref={wheelSectionRef}
//               className={`${
//                 isMobile 
//                   ? 'min-h-screen flex flex-col justify-center py-4' 
//                   : 'min-h-screen flex items-center justify-center'
//               } px-4`}
//             >
//               <div className="w-full max-w-7xl mx-auto">
                
//                 {/* Mobile Layout */}
//                 {isMobile ? (
//                   <div className="flex flex-col items-center justify-center h-full space-y-5">
//                     {/* Mobile 3D Wheel */}
//                     <div className="flex justify-center items-center relative">
//                       <div className="relative w-72 h-72">
//                         <Wheel3D
//                           wheelRef={wheelRef}
//                           activePhase={activePhase}
//                           setActivePhase={setActivePhase}
//                           phases={phases}
//                           segmentAngle={segmentAngle}
//                           tealColors={tealColors}
//                           size="mobile"
//                         />
//                       </div>
//                     </div>

//                     {/* Mobile 3D Card */}
//                     <div className="w-full max-w-sm px-2">
//                       {phases.map((phase, index) => (
//                         <div
//                           key={index}
//                           className={`transition-all duration-500 ${
//                             index === activePhase ? "block" : "hidden"
//                           }`}
//                         >
//                           <Card3D
//                             phase={phase}
//                             index={index}
//                             isActive={index === activePhase}
//                             tealColors={tealColors}
//                             isMobile={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   /* Desktop Layout */
//                   <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-6 lg:gap-x-8">
                    
//                     {/* Desktop 3D Wheel */}
//                     <div className="lg:col-span-2 order-2 lg:order-1 flex justify-center items-center relative">
//                       <div className="relative w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[380px] aspect-square">
//                         <Wheel3D
//                           wheelRef={wheelRef}
//                           activePhase={activePhase}
//                           setActivePhase={setActivePhase}
//                           phases={phases}
//                           segmentAngle={segmentAngle}
//                           tealColors={tealColors}
//                           size="desktop"
//                         />
                        
//                         {/* Phase Dots */}
//                         <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
//                           {phases.map((_, index) => (
//                             <button
//                               key={index}
//                               onClick={() => setActivePhase(index)}
//                               className={`h-2 rounded-full transition-all duration-500 ${
//                                 index === activePhase 
//                                   ? "w-9 opacity-100" 
//                                   : "w-2 opacity-40"
//                               }`}
//                               style={{
//                                 backgroundColor: index === activePhase ? tealColors.main : "#ffffff",
//                                 boxShadow: index === activePhase ? `0 0 10px ${tealColors.main}` : 'none'
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Desktop 3D Card */}
//                     <div className="lg:col-span-3 order-1 lg:order-2 relative flex items-center justify-center">
//                       {phases.map((phase, index) => (
//                         <div
//                           key={index}
//                           className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
//                             index === activePhase
//                               ? "opacity-100 transform-none z-10"
//                               : "opacity-0 translate-y-8 z-0"
//                           }`}
//                         >
//                           <div className="w-full max-w-lg px-4">
//                             <Card3D
//                               phase={phase}
//                               index={index}
//                               isActive={index === activePhase}
//                               tealColors={tealColors}
//                               isMobile={false}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// const SecurityContent = () => (
//   <div className="mx-auto max-w-4xl px-6 py-20 text-center">
    
//     {/* Heading */}
//     <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
//       Security First <span className="text-teal-300">Approach</span>
//     </h2>

//     {/* Paragraphs */}
//     <p className="mb-5 text-xl md:text-2xl text-gray-200 leading-relaxed">
//       Your crypto assets are protected with military-grade encryption and
//       multi-layer security protocols to safeguard every transaction.
//     </p>


//     {/* Button */}
//     <button className="rounded-full bg-gradient-to-r mt-10 from-[#085056] to-[#0a6b73] px-5 py-2 lg:text-xl sm:text-xs text-white font-semibold shadow-md hover:shadow-[#0a6b73]/50 hover:scale-105 transition-all duration-300">
//       Explore  Features 
//       <ArrowRight className="inline ml-2" />
//     </button>
//   </div>
// );

// const SecuritySec=()=> {
//   return (
//     <div
//       className="bg-cover bg-center bg-fixed"
//       style={{
//         backgroundImage:
//           'linear-gradient(rgba(17, 30, 31, 0.85),rgba(71, 78, 79, 0.85))), url("https://i.pinimg.com/736x/69/d2/c1/69d2c1763cf91e13adad4f6069b283bc.jpg")',
//       }}
//     >
//       <SecurityContent />
//     </div>
//   );
// }

// const TestimonialCard = ({ testimonial, isActive }) => {
//   return (
//     <div
//       className={`
//     relative overflow-hidden
//     rounded-2xl 
//     transition-all duration-500 ease-out
//     group
//     ${
//       isActive
//         ? "bg-[#e0ecec]/90 backdrop-blur-xl border-2 border-[#b8cc26]  scale-100 opacity-100"
//         : "bg-white/55 backdrop-blur-md border border-white/40 shadow-lg scale-95 opacity-75"
//     }
//     w-full max-w-[500px] sm:max-w-[420px] md:max-w-[460px] lg:min-w-[500px]
//     min-h-[120px] sm:min-h-[100px] md:min-h-[110px]
//   `}
//     >
//       {/* Content Container */}
//       <div className="relative z-10 p-6 md:p-7">
//         {/* Header Section */}
//         <div className="flex items-start gap-4 mb-5">
//           {/* Profile Image */}
//           <div className="relative flex-shrink-0">
//             <img
//               src={testimonial.image}
//               title="Trusted Users of jaimax coin"
//               className={`
//                 relative w-24 h-24 md:w-16 md:h-16
//                 rounded-full object-cover
//                 transition-all duration-500
//                 border-2
//                 ${isActive ? "border-[#b8cc26]" : "border-gray-200"}
//               `}
//               alt={`${testimonial.name}`}
//             />
//           </div>

//           {/* User Info */}
//           <div className="flex-grow min-w-0">
//             <h4
//               className={`
//                 text-base md:text-lg font-bold
//                 transition-colors duration-500
//                 truncate
//                 ${isActive ? "text-[#085056]" : "text-gray-700"}
//               `}
//             >
//               {testimonial.name}
//             </h4>

//             <p className="text-xs text-gray-500 mt-0.5">{testimonial.date}</p>
//           </div>
//         </div>

//         {/* Testimonial Text */}
//         <div className="relative mb-5">
//           {/* Quote Icon */}
//           <div
//             className={`
//             absolute -left-2 -top-2 w-8 h-8
//             transition-all duration-500
//             ${isActive ? "text-[#b8cc26]/30" : "text-gray-200"}
//           `}
//           >
//             <svg fill="currentColor" viewBox="0 0 32 32">
//               <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
//             </svg>
//           </div>

//           <p
//             className={`
//               text-xs md:text-sm
//               leading-relaxed
//               pl-8
//               transition-all duration-500
//               ${isActive ? "text-gray-700" : "text-gray-600"}
//             `}
//           >
//             {testimonial.text}
//           </p>
//         </div>
//       </div>

//       {/* Hover Gradient Overlay */}
//       <div
//         className={`
//         absolute inset-0 opacity-0 group-hover:opacity-100 
//         transition-opacity duration-700
//         bg-gradient-to-br from-[#085056]/5 via-transparent to-[#b8cc26]/5
//         pointer-events-none
//       `}
//       />

//       {/* Shimmer Effect */}
//       <div
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000
//         bg-gradient-to-r from-transparent via-white/20 to-transparent
//         transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"
//         style={{ transition: "transform 1.5s ease-in-out" }}
//       />

//       {/* Corner Decoration */}
//       <div
//         className={`
//         absolute bottom-0 right-0 w-24 h-24
//         transition-opacity duration-500
//         ${isActive ? "opacity-100" : "opacity-0"}
//       `}
//       >
//         <svg className="w-full h-full text-[#b8cc26]/10" viewBox="0 0 100 100">
//           <circle cx="80" cy="80" r="40" fill="currentColor" />
//           <circle
//             cx="80"
//             cy="80"
//             r="25"
//             fill="currentColor"
//             className="opacity-60"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

// const ReviewsSection = () => {
//   const googleReviewUrl = "https://g.page/r/CdDTqJnUq_5LEBE/review";
//   const trustpilotReviewUrl =
//     "https://www.trustpilot.com/review/jaimax.com?utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

//   const handleGoogleClick = () => {
//     window.open(googleReviewUrl, "_blank");
//   };

//   const handleTrustpilotClick = () => {
//     window.open(trustpilotReviewUrl, "_blank");
//   };

//   return (
//     <div
//       className="w-full py-8 md:py-16 px-4"
//       style={{ backgroundColor: "#085056" }}
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Heading Section */}
//         <div className="text-center mb-8 md:mb-12">
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
//             What Our Customers Say
//           </h2>
//           <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4">
//             Your trust means everything to us. Read what our customers have to
//             say about their experience with Jaimax.
//           </p>
//           <div className="mt-4 md:mt-6">
//             <p className="text-sm md:text-base text-white/80 font-medium">
//               Share your experience and help others discover Jaimax
//             </p>
//           </div>
//         </div>

//         {/* Review Cards */}
//         <div className="rounded-2xl p-4 md:p-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
//             {/* Section 1: 800+ Reviews on Google */}
//             <div
//               className="text-center pb-4 md:pb-0 border-b bg-[#ffff] md:border-b-0 md:border-r border-gray-200 cursor-pointer transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50"
//               onClick={handleGoogleClick}
//             >
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
//                 40+ Reviews
//               </h2>
//               <div className="flex items-center justify-center gap-2 text-gray-600">
//                 <span className="text-base md:text-lg">on Google</span>
//                 <svg
//                   className="w-5 h-5 md:w-6 md:h-6"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <path
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     fill="#4285F4"
//                   />
//                   <path
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     fill="#34A853"
//                   />
//                   <path
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     fill="#FBBC05"
//                   />
//                   <path
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     fill="#EA4335"
//                   />
//                 </svg>
//               </div>
//               <div className="flex justify-center gap-0.5 md:gap-1 mt-3">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     className="w-5 h-5 md:w-6 md:h-6"
//                     viewBox="0 0 24 24"
//                     fill="#FFD700"
//                   >
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 Click to leave a review
//               </p>
//             </div>

//             {/* Section 2: Google Rating */}
//             <div className="text-center bg-[#ffff] cursor-pointer transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50 pb-4 md:pb-3 border-b md:border-b-0 md:border-r border-gray-200">
//               <div className="flex justify-center gap-0.5 md:gap-1 mb-2 md:mb-3">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     className="w-6 h-6 md:w-8 md:h-8"
//                     viewBox="0 0 24 24"
//                     fill="#FFD700"
//                   >
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                   </svg>
//                 ))}
//               </div>
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <svg
//                   className="w-5 h-5 md:w-6 md:h-6"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <path
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     fill="#4285F4"
//                   />
//                   <path
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     fill="#34A853"
//                   />
//                   <path
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     fill="#FBBC05"
//                   />
//                   <path
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     fill="#EA4335"
//                   />
//                 </svg>
//                 <span className="text-base md:text-lg font-semibold text-gray-700">
//                   Google Rating
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500">Rate your experience</p>
//             </div>

//             {/* Section 3: Trustpilot Rating */}
//             <div
//               className="cursor-pointer bg-[#ffff] transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50"
//               onClick={handleTrustpilotClick}
//             >
//               <div className="flex flex-col items-center gap-2">
//                 {/* Trustpilot Stars */}
//                 <div className="text-[#00b67a] text-2xl md:text-3xl tracking-tight">
//                   ★★★★★
//                 </div>

//                 {/* Trustpilot Logo */}
//                 <div className="flex items-center gap-1 mt-1">
//                   <span className="text-sm md:text-base font-bold text-gray-800">
//                     Review Us On{" "}
//                     <span className="text-[#00b67a]">Trustpilot</span>
//                   </span>
//                 </div>

//                 <div className="text-xs text-gray-500 mt-1">
//                   Help others by sharing your experience
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="text-center mt-8 md:mt-10">
//           <p className="text-white/90 text-sm md:text-base">
//             We appreciate every review. Your feedback helps us improve and
//             guides others in their journey.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
//   return (
//     <div
//       style={{
//         paddingLeft: IMG_PADDING,
//         paddingRight: IMG_PADDING,
//       }}
//     >
//       <div className="relative h-[100vh]">
//         <StickyImage imgUrl={imgUrl} />
//         <OverlayCopy heading={heading} subheading={subheading} />
//       </div>
//       {children}
//     </div>
//   );
// };

// const StickyImage = ({ imgUrl }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["end end", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
//   const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);

//   const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

//   return (
//     <motion.div
//       style={{
//         height: `calc(100vh - ${IMG_PADDING * 2}px)`,
//         top: IMG_PADDING,
//         scale: smoothScale,
//       }}
//       ref={targetRef}
//       className="sticky z-0 overflow-hidden rounded-3xl"
//     >
//       <motion.div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `url(${imgUrl})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           filter: useTransform(blur, (v) => `blur(${v}px)`),
//         }}
//       />

//       <motion.div
//         className="absolute inset-0"
//         style={{
//           background: `
//             linear-gradient(
//               135deg,
//               rgba(8, 80, 86, 0.9) 0%,
//               rgba(8, 80, 86, 0.6) 50%,
//               rgba(8, 80, 86, 0.8) 100%
//             )
//           `,
//           opacity,
//         }}
//       />

//       <motion.div
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
//             radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
//           `,
//           backgroundSize: "60px 60px",
//         }}
//       />

//       <FloatingParticles />
//       <CornerDecorations opacity={opacity} />

//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
//     </motion.div>
//   );
// };

// const FloatingParticles = () => {
//   const particles = Array.from({ length: 20 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 2,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     duration: Math.random() * 10 + 10,
//     delay: Math.random() * 5,
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute rounded-full bg-white/20"
//           style={{
//             width: particle.size,
//             height: particle.size,
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//           }}
//           animate={{
//             y: [0, -100, 0],
//             x: [0, Math.random() * 50 - 25, 0],
//             opacity: [0, 1, 0],
//             scale: [0, 1, 0],
//           }}
//           transition={{
//             duration: particle.duration,
//             repeat: Infinity,
//             delay: particle.delay,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const CornerDecorations = ({ opacity }) => {
//   return (
//     <>
//       <motion.div className="absolute top-8 left-0 right-0 h-2 z-0" style={{ opacity }}>
//         <motion.div
//           className="w-20 h-20 border-l-2 border-t-2 border-white/30 rounded-tl-2xl"
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 4, repeat: Infinity }}
//         />
//       </motion.div>

//       <motion.div className="absolute top-8 right-8" style={{ opacity }}>
//         <motion.div
//           className="w-20 h-20 border-r-2 border-t-2 border-white/30 rounded-tr-2xl"
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 4, repeat: Infinity, delay: 1 }}
//         />
//       </motion.div>

//       <motion.div className="absolute bottom-8 left-8" style={{ opacity }}>
//         <motion.div
//           className="w-20 h-20 border-l-2 border-b-2 border-white/30 rounded-bl-2xl"
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 4, repeat: Infinity, delay: 2 }}
//         />
//       </motion.div>

//       <motion.div className="absolute bottom-8 right-8" style={{ opacity }}>
//         <motion.div
//           className="w-20 h-20 border-r-2 border-b-2 border-white/30 rounded-br-2xl"
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 4, repeat: Infinity, delay: 3 }}
//         />
//       </motion.div>
//     </>
//   );
// };

// const OverlayCopy = ({ subheading, heading }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
//   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
//   const scale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.8, 1, 0.8]);

//   const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
//   const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

//   return (
//     <motion.div
//       style={{
//         y: smoothY,
//         opacity,
//         scale: smoothScale,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
//     >
//       <motion.div
//         className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-8 rounded-full"
//         animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
//         transition={{ duration: 3, repeat: Infinity }}
//       />

//       <motion.div
//         className="flex items-center gap-3 mb-4"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <motion.span
//           className="text-2xl"
//           animate={{ rotate: [0, 360] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         >
//           ✦
//         </motion.span>
//         <p className="text-center text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-white/90">
//           {subheading}
//         </p>
//         <motion.span
//           className="text-2xl"
//           animate={{ rotate: [360, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         >
//           ✦
//         </motion.span>
//       </motion.div>

//       <div className="relative">
//         <motion.h2
//           className="text-center text-5xl md:text-8xl font-bold tracking-tight"
//           style={{
//             textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
//           }}
//         >
//           {heading}
//         </motion.h2>

//         <motion.div
//           className="absolute -bottom-4 left-1/2 h-1 bg-white rounded-full"
//           style={{ x: "-50%" }}
//           initial={{ width: 0 }}
//           whileInView={{ width: "60%" }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         />
//         <motion.div
//           className="absolute -bottom-4 left-1/2 h-1 bg-white rounded-full blur-md"
//           style={{ x: "-50%" }}
//           initial={{ width: 0 }}
//           whileInView={{ width: "60%" }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         />
//       </div>
//     </motion.div>
//   );
// };


// const IntroductionSection = () => {
//   const words = ["Innovation", "Transparency", "Stability", "Growth"];
//   const [currentWord, setCurrentWord] = useState(0);
//  const { data: roundData, isLoading, refetch } = useGetRoundQuery();
//   const currentRound = roundData?.data?.rounds?.find((r) => r.status === 1) || {};

//   useEffect(() => {
//     const interval = setInterval(refetch, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const formatNumber = (num) => {
//     if (!num) return "0";
//     if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(1) + "K";
//     return num.toLocaleString();
//   };
//     const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 0);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 0);
//   const progressPercent = Math.min(((currentRound?.soldQty || 0) / 10000000000) * 100, 100);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev + 1) % words.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-teal-50 overflow-hidden min-h-screen flex items-center">
//       {/* Background Wave Element */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//           className="relative block w-full h-12 sm:h-16 md:h-20 lg:h-24"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//             className="fill-[#085056]"
//           />
//         </svg>
//       </div>

//       {/* Background Pattern & Blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute top-0 left-0 w-full h-full opacity-[0.03]" 
//           style={{
//             backgroundImage: 'radial-gradient(#14b8a6 1.5px, transparent 1.5px)',
//             backgroundSize: '20px 20px'
//           }} 
//         />
        
//         {/* Gradient Blobs - Responsive sizes */}
//         <motion.div
//           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
//           transition={{ duration: 8, repeat: Infinity }}
//           className="absolute top-10 sm:top-20 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 rounded-full bg-teal-200/30 blur-3xl"
//         />
//         <motion.div
//           animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
//           transition={{ duration: 10, repeat: Infinity }}
//           className="absolute bottom-10 sm:bottom-20 left-1/4 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 rounded-full bg-cyan-200/30 blur-3xl"
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-center">
          
//           {/* Left Side - Creative Visual */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="lg:col-span-5 order-2 lg:order-1"
//           >
//             <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-sm mx-auto">
//               {/* Main Card Stack */}
//               <div className="relative">
//                 {/* Back Card */}
//                 <motion.div
//                   animate={{ rotate: [6, 8, 6] }}
//                   transition={{ duration: 4, repeat: Infinity }}
//                   className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl sm:rounded-3xl transform rotate-6"
//                 />
                
//                 {/* Middle Card */}
//                 <motion.div
//                   animate={{ rotate: [3, 4, 3] }}
//                   transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
//                   className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl sm:rounded-3xl transform rotate-3"
//                 />
                
//                 {/* Front Card */}
//                 <motion.div
//                   whileHover={{ y: -10 }}
//                   className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl"
//                 >
//                   {/* Card Content */}
//                   <div className="flex items-center justify-between">
//                     <img 
//                       src="https://i.pinimg.com/736x/36/18/db/3618db8b1fa852459e23accdcb40aa7b.jpg" 
//                       alt="Jaimax Coin" 
//                       className="w-full h-auto rounded-xl sm:rounded-2xl object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Floating Elements - Responsive positioning and sizes */}
//               {/* Top Right - Chart Icon */}
//               <motion.div
//                 animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//                 className="absolute -top-3 sm:-top-4 md:-top-6 -right-3 sm:-right-4 md:-right-6 
//                            w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 
//                            rounded-xl sm:rounded-2xl bg-white shadow-xl shadow-teal-100 
//                            flex items-center justify-center border border-teal-100"
//               >
//                 <FaChartLine className="text-teal-500 text-base sm:text-lg md:text-xl" />
//               </motion.div>

//               {/* Bottom Left - Shield Icon */}
//               <motion.div
//                 animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -left-2 sm:-left-3 md:-left-4 
//                            w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 
//                            rounded-lg sm:rounded-xl bg-white shadow-xl shadow-teal-100 
//                            flex items-center justify-center border border-teal-100"
//               >
//                 <FaShieldAlt className="text-teal-500 text-sm sm:text-base md:text-lg" />
//               </motion.div>

//               {/* Left Middle - Rocket Icon */}
//               <motion.div
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 3.5, repeat: Infinity }}
//                 className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 md:-left-8 
//                            w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 
//                            rounded-md sm:rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 
//                            shadow-lg flex items-center justify-center"
//               >
//                 <FaRocket className="text-white text-xs sm:text-sm" />
//               </motion.div>

//               {/* Right Top - Gem Icon */}
//               <motion.div
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ duration: 2.5, repeat: Infinity }}
//                 className="absolute top-1/4 -right-2 sm:-right-3 md:-right-4 
//                            w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 
//                            rounded-md sm:rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 
//                            shadow-lg flex items-center justify-center"
//               >
//                 <FaGem className="text-white text-[10px] sm:text-xs" />
//               </motion.div>

//               {/* India Badge */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.5 }}
//                 className="absolute -bottom-6 sm:-bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 
//                            px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 
//                            bg-white rounded-full shadow-xl shadow-teal-100 
//                            border border-teal-100 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
//               >
//                 <span className="text-lg sm:text-xl md:text-2xl">🇮🇳</span>
//                 <span className="text-gray-800 font-bold text-[10px] sm:text-xs md:text-sm">
//                   Made in India
//                 </span>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Right Side - Content */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="lg:col-span-7 order-1 lg:order-2"
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
//                          rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 
//                          border border-teal-200 mb-4 sm:mb-5 md:mb-6"
//             >
//               <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-teal-500 animate-pulse" />
//               <span className="text-teal-700 text-xs sm:text-sm font-semibold">
//                 India's #1 Pre-Sale Crypto
//               </span>
//             </motion.div>

//             {/* Animated Heading */}
//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
//                            font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
//               Built for{" "}
//               <span className="relative inline-block">
//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={currentWord}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent"
//                   >
//                     {words[currentWord]}
//                   </motion.span>
//                 </AnimatePresence>
//                 <motion.div
//                   animate={{ scaleX: [0, 1, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 
//                              bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full origin-left"
//                 />
//               </span>
//             </h2>

//             {/* Main Content */}
//             <div className="space-y-4 sm:space-y-5 md:space-y-6">
//               {/* First Paragraph */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2 }}
//                 className="relative pl-4 sm:pl-5 md:pl-6 border-l-2 sm:border-l-4"
//                 style={{ borderImage: "linear-gradient(to bottom, #14b8a6, #06b6d4) 1" }}
//               >
//                 <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
//                   In the evolving world of digital finance,{" "}
//                   <span className="font-bold text-gray-900">Jaimax Coin</span> has emerged as{" "}
//                   <span className="relative inline-block">
//                     <span className="relative z-10 font-bold text-teal-600">
//                       India's best pre-sale crypto coin
//                     </span>
//                     <span className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-teal-100 -z-0" />
//                   </span>
//                   , built for investors who value innovation, transparency, and long-term stability.
//                 </p>
//               </motion.div>

//               {/* Second Paragraph */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.4 }}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 
//                                 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-10 
//                                 blur-xl transition-all duration-500" />
//                 <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 
//                                 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-teal-100">
//                   <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
//                     As India embraces{" "}
//                     <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 
//                                      rounded-md sm:rounded-lg bg-white shadow-sm text-teal-600 
//                                      font-semibold text-xs sm:text-sm md:text-base">
//                       <FaCube className="text-[10px] sm:text-xs md:text-sm" /> 
//                       <span className="hidden xs:inline">blockchain</span>
//                       <span className="xs:hidden">blockchain</span> technology
//                     </span>{" "}
//                     and{" "}
//                     <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 
//                                      rounded-md sm:rounded-lg bg-white shadow-sm text-cyan-600 
//                                      font-semibold text-xs sm:text-sm md:text-base">
//                       <FaGlobe className="text-[10px] sm:text-xs md:text-sm" /> 
//                       <span className="hidden sm:inline">decentralized finance</span>
//                       <span className="sm:hidden">DeFi</span>
//                     </span>
//                     , Jaimax is shaping the future of how people invest and grow wealth.
//                   </p>
//                 </div>
//               </motion.div>

//               {/* Third Paragraph */}

//   {/* Price Section */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
    
//     {/* Current Price */}
//     <div className="rounded-xl border border-teal-200 bg-teal-50 p-3 sm:p-4">
//       <p className="text-xs sm:text-sm text-teal-700 font-medium">
//         Current Price
//       </p>
//       <p className="text-lg sm:text-xl md:text-2xl font-bold text-teal-900">
//       ₹ {livePrice}
//       </p>
//     </div>

//     {/* Expected Launch Price */}
//     <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-3 sm:p-4">
//       <p className="text-xs sm:text-sm text-cyan-700 font-medium">
//         Expected Launch Price
//       </p>
//       <p className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-900">
//         ₹4.10
//       </p>

//       {/* Note */}
//       <p className="mt-1 text-[10px] sm:text-xs text-cyan-700 leading-snug">
//         As per mathematical calculations
//       </p>
//     </div>

//   </div>


//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const JaimaxUniqueFeature = ({ uniqueFeaturesRef }) => {
//   const features = [
//     {
//       id: 1,
//       bgColor: '#085056',
//       title: 'Low Entry Point',
//       subtitle: 'Start Your Journey',
//       description:
//         'Begin investing in Jaimax with just ₹2500. A simple and accessible entry point designed to empower every Indian to step confidently into cryptocurrency.',
//       icon: <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
//       image:
//         'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
//       stats: { value: '₹50', label: 'Minimum' },
//     },
//     {
//       id: 2,
//       bgColor: '#085056',
//       title: 'High Returns',
//       subtitle: 'Maximize Growth',
//       description:
//         'Early investors unlock powerful growth potential through the Jaimax pre-sale advantage, gaining access to premium pricing before public trading begins.',
//       icon: <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
//       image:
//         'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
//       stats: { value: '410%', label: 'ROI' },
//     },
//     {
//       id: 3,
//       bgColor: '#085056',
//       title: 'Secure Platform',
//       subtitle: 'Trust & Safety',
//       description:
//         'Every Jaimax transaction is protected by advanced blockchain encryption, ensuring full transparency, zero manipulation, and industry-leading security.',
//       icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
//       image:
//         'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
//       stats: { value: '100%', label: 'Secure' },
//     },
//     {
//       id: 4,
//       bgColor: '#085056',
//       title: 'Community Driven',
//       subtitle: 'Growing Together',
//       description:
//         'Join a rapidly growing ecosystem where investors, developers, and learners unite to build a transparent, educational, and future-ready blockchain community.',
//       icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
//       image:
//         'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
//       stats: { value: '10K+', label: 'Members' },
//     },
//     {
//       id: 5,
//       bgColor: '#085056',
//       title: 'Future Ready',
//       subtitle: 'Innovation First',
//       description:
//         'Jaimax is building a complete blockchain ecosystem powering DeFi, NFTs, dApps, and real-world utility — connecting India to the next generation of digital finance.',
//       icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />,
//       image:
//         'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
//       stats: { value: '2026', label: 'Launch' },
//     },
//   ];

//   return (
//     <>
//       {/* Section Title */}
//       <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20 bg-[#085056] px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 mb-3 sm:mb-4 md:mb-6"
//         >
//           <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-teal-500 animate-pulse" />
//           <span className="text-teal-700 text-xs sm:text-sm font-semibold">
//             What Makes Us Different
//           </span>
//         </motion.div>

//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4"
//         >
//           What Makes Jaimax{" "}
//           <span className="bg-gradient-to-r from-teal-500 to-lime-500 bg-clip-text text-transparent">
//             Unique?
//           </span>
//         </motion.h2>
        
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto"
//         >
//           Discover the features that make Jaimax India's most promising cryptocurrency
//         </motion.p>
//       </div>

//       {/* Horizontal Scroll Container */}
//       <div 
//         ref={uniqueFeaturesRef}
//         className="relative overflow-hidden bg-[#085056]"
//         style={{ minHeight: '100vh', height: 'auto' }}
//       >
//         {features.map((feature) => (
//           <div
//             key={feature.id}
//             className={`unique-feature-${feature.id} absolute top-0 left-0 w-full h-full flex items-center justify-center py-8 sm:py-12`}
//             style={{ backgroundColor: feature.bgColor }}
//           >
//             {/* Background Pattern */}
//             <div className="absolute inset-0 overflow-hidden opacity-5">
//               <div className="h-full w-full" style={{
//                 backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
//                 backgroundSize: '30px 30px'
//               }} />
//             </div>

//             <div className="feature-content w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
                
//                 {/* Content Side */}
//                 <div className="max-w-lg mx-auto lg:mx-0 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center lg:text-left order-2 lg:order-1">
//                   {/* Badge */}
//                   <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
//                     <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#b8cc26] animate-pulse" />
//                     <span className="text-white text-xs sm:text-sm font-semibold">
//                       {feature.subtitle}
//                     </span>
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
//                     {feature.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
//                     {feature.description}
//                   </p>

//                   {/* CTA Buttons */}
//                   <div className="flex items-center justify-start pt-3">
//   <button 
//     onClick={() => window.location.href = "/login/"}
//     className="
//       px-5 sm:px-6 md:px-7
//       py-2 sm:py-2.5
//        justify-center sm:justify-start
//       bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f]
//       text-[#0f1c14]
//       rounded-full
//       font-semibold
//       text-xs sm:text-sm
//       hover:scale-105
//       transition-transform duration-300
//       shadow-lg
//     "
//   >
//     Get Started
//   </button>
// </div>

//                 </div>

//                 {/* Image Side */}
//                 <div className="relative flex items-center justify-center order-1 lg:order-2 h-48 xs:h-56 sm:h-64 md:h-80 lg:h-auto mb-4 sm:mb-6 lg:mb-0">
//                   {/* Animated Background Circles - Scaled down on smaller screens */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <motion.div 
//                       animate={{ 
//                         scale: [1, 1.2, 1],
//                         opacity: [0.2, 0.4, 0.2]
//                       }}
//                       transition={{ 
//                         duration: 4,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                       }}
//                       className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full bg-white/10 blur-3xl"
//                     />
//                     <motion.div 
//                       animate={{ 
//                         scale: [1, 1.3, 1],
//                         opacity: [0.15, 0.3, 0.15]
//                       }}
//                       transition={{ 
//                         duration: 5,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                         delay: 0.5
//                       }}
//                       className="absolute w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full bg-[#b8cc26]/20 blur-2xl"
//                     />
//                   </div>
                  
//                   {/* Main Image Container - Responsive sizing */}
//                   <motion.div 
//                     animate={{ 
//                       y: [0, -10, 0],
//                       rotate: [0, 2, 0]
//                     }}
//                     transition={{ 
//                       duration: 6,
//                       repeat: Infinity,
//                       ease: "easeInOut"
//                     }}
//                     className="relative z-10 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
//                   >
//                     {/* Outer Ring with Gradient Border */}
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-sm border-2 sm:border-3 md:border-4 border-white/40 shadow-2xl overflow-hidden">
//                       {/* Image */}
//                       <img 
//                         src={feature.image}
//                         alt={feature.title}
//                         className="w-full h-full object-cover rounded-full opacity-80 hover:opacity-100 transition-opacity duration-500"
//                         loading="lazy"
//                       />
//                     </div>

//                     {/* Rotating Gradient Border Effect */}
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                       className="absolute inset-0 rounded-full opacity-50"
//                       style={{
//                         background: `conic-gradient(from 0deg, transparent, rgba(184, 204, 38, 0.6), transparent)`
//                       }}
//                     />
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             {/* Feature Number - Better responsive sizing */}
//             <div className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 text-white/5 font-bold pointer-events-none select-none" 
//               style={{ 
//                 fontSize: 'clamp(4rem, 10vw, 12rem)', 
//                 lineHeight: 0.8
//               }}>
//               0{feature.id}
//             </div>

//             {/* Progress Indicator */}
//             <div className="absolute bottom-3 xs:bottom-10 sm:bottom-10 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 xs:gap-1.5 sm:gap-2  px-2 xs:px-3 sm:px-4 md:px-6 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-full ">
//               {features.map((_, i) => (
//                 <div 
//                   key={i}
//                   className={`rounded-full transition-all duration-500 ${
//                     i === feature.id - 1 
//                       ? 'w-5 xs:w-6 sm:w-8 md:w-5 lg:w-6 h-1 xs:h-1.5 md:h-2 bg-[#b8cc26] shadow-lg shadow-[#b8cc26]/50' 
//                       : 'w-1 xs:w-1.5 sm:w-2 h-1 xs:h-1.5 sm:h-2 bg-white/30 hover:bg-white/50'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// const SecuritySection = () => {
//   const securityFeatures = [
//     {
//       icon: FaLock,
//       title: "Advanced Encryption",
//       description: "Every transaction protected by blockchain encryption",
//     },
//     {
//       icon: FaShieldAlt,
//       title: "Full Transparency",
//       description: "Zero manipulation with complete transaction visibility",
//     },
//     {
//       icon: FaCheckCircle,
//       title: "Industry Standards",
//       description: "Following industry-leading safety and compliance protocols",
//     },
//   ];

//   return (
//     <section className="relative py-20 px-4 md:px-8 bg-teal-50 overflow-hidden">
//       {/* Top Wave */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//           className="relative block w-full h-16 md:h-24"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//             className="fill-[#085056]"
//           />
//         </svg>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
//         <svg
//           className="relative block w-full h-16 md:h-24"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//             className="fill-[#085056]"
//           />
//         </svg>
//       </div>


//       {/* Floating Bubbles/Circles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-100/50 blur-3xl" />
//         <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-teal-200/30 blur-3xl" />
//         <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-teal-100/40 blur-3xl" />
//         <div className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full bg-teal-300/20 blur-2xl" />
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left - Security Visualization */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <div className="relative w-full aspect-square max-w-md mx-auto">
//               {/* Outer Ring */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-0 rounded-full border-2 border-dashed border-teal-300"
//               />

//               {/* Middle Ring */}
//               <motion.div
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-8 rounded-full border-2 border-dashed border-teal-400"
//               />

//               {/* Inner Ring */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-16 rounded-full border-2 border-dashed border-teal-500"
//               />

//               {/* Center Icon */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <motion.div
//                   animate={{ scale: [1, 1.1, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-teal-500/40"
//                 >
//                   <FaShieldAlt className="text-5xl text-white" />
//                 </motion.div>
//               </div>

//               {/* Floating Icons */}
//               {[
//                 { icon: FaLock, position: "top-0 left-1/2 -translate-x-1/2" },
//                 { icon: FaCheckCircle, position: "bottom-0 left-1/2 -translate-x-1/2" },
//                 { icon: FaGlobe, position: "left-0 top-1/2 -translate-y-1/2" },
//                 { icon: FaCubes, position: "right-0 top-1/2 -translate-y-1/2" },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
//                   className={`absolute ${item.position} w-12 h-12 rounded-xl bg-white border-2 border-teal-200 flex items-center justify-center shadow-lg shadow-teal-100`}
//                 >
//                   <item.icon className="text-xl text-teal-600" />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right - Content */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//               Security at the{" "}
//               <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
//                 Heart
//               </span>
//             </h2>

//             <p className="text-gray-600 text-lg mb-8 leading-relaxed">
//               Security remains at the heart of the Jaimax ecosystem. Investors can
//               buy, hold, and trade Jaimax confidently, knowing that the platform
//               follows industry-leading standards for safety and compliance.
//             </p>

//             <div className="space-y-6">
//               {securityFeatures.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-teal-100 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100 transition-all duration-300"
//                 >
//                   <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-200">
//                     <feature.icon className="text-xl text-white" />
//                   </div>
//                   <div>
//                     <h4 className="text-gray-900 font-semibold mb-1">{feature.title}</h4>
//                     <p className="text-gray-600 text-sm">{feature.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const EcosystemSection = () => {
//   const ecosystemItems = [
//     { label: "DeFi", icon: FaChartLine },
//     { label: "NFTs", icon: FaGem },
//     { label: "dApps", icon: FaCubes },
//     { label: "Education", icon: FaLightbulb },
//     { label: "Community", icon: FaUsers },
//     { label: "Innovation", icon: FaRocket },
//   ];

//   return (
//     <section className="py-6 px-4 md:px-8 bg-[#085056] overflow-hidden relative">


//       {/* Content */}
//       <div className="max-w-6xl mx-auto relative z-10 mt-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8"
//           >
//             <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
//             <span className="text-white text-sm font-medium tracking-wide">COMPLETE SOLUTION</span>
//           </motion.div>
          
//           {/* Heading with Wavy Underline */}
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative inline-block">
//             Complete Blockchain{" "}
//             <span className="relative inline-block">
//               <span className="text-teal-200">
//                 Ecosystem
//               </span>
//               <motion.svg 
//                 width="100%" 
//                 height="10" 
//                 viewBox="0 0 200 10" 
//                 className="absolute -bottom-4 left-0"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 whileInView={{ pathLength: 1, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 1, delay: 0.5 }}
//               >
//                 <motion.path
//                   d="M0,5 Q40,0 80,5 T160,5 T240,5"
//                   fill="none"
//                   stroke="url(#ecosystemGradient)"
//                   strokeWidth="3"
//                   initial={{ pathLength: 0 }}
//                   whileInView={{ pathLength: 1 }}
//                   viewport={{ once: true }}
//                 />
//                 <defs>
//                   <linearGradient id="ecosystemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#ffffff" />
//                     <stop offset="100%" stopColor="#a7f3d0" />
//                   </linearGradient>
//                 </defs>
//               </motion.svg>
//             </span>
//           </h2>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//             className="text-teal-100/80 text-lg max-w-3xl mx-auto leading-relaxed"
//           >
//             Unlike most projects that focus only on trading, Jaimax is creating a
//             complete blockchain ecosystem where investors, developers, and learners
//             come together.
//           </motion.p>
//         </motion.div>

//         {/* Ecosystem Diagram with Connection Lines */}
//         <div className="relative mb-20">
//           {/* Central Hub */}
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//             className="relative z-20 w-32 h-32 bg-white rounded-full mx-auto mb-16 flex items-center justify-center shadow-xl shadow-white/20"
//           >
//             <div className="text-[#085056] font-bold text-xl"> <img src={jaicoins}/>
//           </div>
//             {/* Pulsing ring animation */}
//             <motion.div
//               animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className="absolute inset-0 rounded-full border-2 border-white/30"
//             />
//             <motion.div
//               animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
//               transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
//               className="absolute inset-0 rounded-full border-2 border-white/20"
//             />
//           </motion.div>

//           {/* Connection lines with animated dashes - we'll create these with SVG */}
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <svg className="w-full h-full max-w-2xl max-h-64" viewBox="0 0 500 150">
//               {/* Lines from center to each item */}
//               {Array.from({ length: 6 }).map((_, i) => {
//                 const angle = (i * 60) * (Math.PI / 180);
//                 const radius = 90; // Adjust based on layout
//                 const x = 250 + radius * Math.cos(angle);
//                 const y = 75 + radius * Math.sin(angle);
                
//                 return (
//                   <motion.line
//                     key={i}
//                     x1="250" y1="75"
//                     x2={x} y2={y}
//                     stroke="url(#lineGradient)"
//                     strokeWidth="2"
//                     strokeDasharray="5,5"
//                     initial={{ pathLength: 0, opacity: 0 }}
//                     whileInView={{ pathLength: 1, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
//                     className="animate-dash"
//                   />
//                 );
//               })}
              
//               <defs>
//                 <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#ffffff" />
//                   <stop offset="100%" stopColor="#a7f3d0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>

//           {/* Ecosystem Items in a Circle */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-20">
//             {ecosystemItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.8, y: 30 }}
//                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.3 + (index * 0.1), type: "spring" }}
//                 whileHover={{ y: -15, scale: 1.05 }}
//                 className="relative group"
//               >
//                 {/* Glow effect on hover */}
//                 <motion.div
//                   className="absolute -inset-1 bg-white/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
//                   animate={{ scale: [1, 1.05, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 />
                
//                 {/* Card container */}
//                 <div className="relative bg-[#06424a] shadow-xl rounded-2xl p-6 text-center border border-white/10 group-hover:border-white/30 transition-all duration-300 h-full flex flex-col items-center backdrop-blur-md">
//                   {/* Icon container with background wave */}
//                   <div className="relative w-16 h-16 mb-4">
//                     {/* Background wave */}
//                     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//                       <motion.path
//                         d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
//                         fill="url(#iconGrad)"
//                         animate={{
//                           d: [
//                             "M0,50 Q25,40 50,50 T100,50 V100 H0 Z",
//                             "M0,50 Q25,60 50,50 T100,50 V100 H0 Z",
//                             "M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
//                           ]
//                         }}
//                         transition={{ duration: 5, repeat: Infinity }}
//                       />
//                       <defs>
//                         <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//                           <stop offset="0%" stopColor="#a7f3d0" />
//                           <stop offset="100%" stopColor="#ffffff" />
//                         </linearGradient>
//                       </defs>
//                     </svg>
                    
//                     {/* Icon */}
//                     <motion.div
//                       whileHover={{ rotate: 360, scale: 1.1 }}
//                       transition={{ duration: 0.5 }}
//                       className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center"
//                     >
//                       <item.icon className="text-2xl text-[#085056]" />
//                     </motion.div>
//                   </div>
                  
//                   {/* Label */}
//                   <span className="text-white font-semibold mb-2">{item.label}</span>
                  
//                   {/* Animated underline */}
//                   <motion.div
//                     initial={{ width: 0 }}
//                     whileInView={{ width: "60%" }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.5 + (index * 0.1) }}
//                     className="h-0.5 bg-white/60 mx-auto rounded-full mt-auto"
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//       </div>
      
//       {/* Custom animations */}
//       <style jsx>{`
//         @keyframes dash {
//           to {
//             stroke-dashoffset: 20;
//           }
//         }
//         .animate-dash {
//           animation: dash 20s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// const AppSection = () => {
//   const appFeatures = [
//     { 
//       icon: FaMobileAlt, 
//       title: "Real-time Trading", 
//       description: "Trade from anywhere" 
//     },
//     { 
//       icon: FaBell, 
//       title: "Price Alerts", 
//       description: "Never miss a move" 
//     },
//     { 
//       icon: FaChartArea, 
//       title: "Live Analytics", 
//       description: "Advanced charts" 
//     },
//     { 
//       icon: FaShieldAlt, 
//       title: "Secure Wallet", 
//       description: "Bank-grade security" 
//     }
//   ];

//   return (
//     <section className="relative bg-[#085056] overflow-hidden">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#085056] via-[#0a6b6b] to-[#085056]" />
      
//       {/* Subtle Pattern */}
//       <div 
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
//           backgroundSize: '40px 40px'
//         }}
//       />

//       {/* Glow Effects */}
//       <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
//         {/* ============================================ */}
//         {/* MOBILE LAYOUT (Default - Stacked) */}
//         {/* ============================================ */}
//         <div className="lg:hidden">
//           {/* Header - Centered */}
//           <div className="text-center mb-8">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
//               <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
//               <span className="text-white text-xs font-medium">MOBILE APP</span>
//             </div>
            
//             {/* Title */}
//             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
//               Jaimax in Your
//               <span className="block text-teal-300">Pocket</span>
//             </h2>
            
//             {/* Description */}
//             <p className="text-teal-100/80 text-sm sm:text-base max-w-md mx-auto">
//               Trade, monitor, and manage your crypto investments from anywhere with our mobile app.
//             </p>
//           </div>

//           {/* Phone Mockup - Centered */}
//           <div className="flex justify-center mb-8">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               {/* Glow behind phone */}
//               <div className="absolute inset-0 bg-teal-400/20 blur-3xl rounded-full scale-75" />
              
//               {/* Phone Frame */}
//               <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-gray-800">
//                 {/* Screen */}
//                 <div className="relative w-48 sm:w-56 h-96 sm:h-[420px] rounded-[2rem] overflow-hidden bg-[#085056]">
//                   {/* Notch */}
//                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                  
//                   {/* App Screenshot */}
//                   <img 
//                     src={app} 
//                     alt="Jaimax App" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
                
//                 {/* Home Indicator */}
//                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full" />
//               </div>
//             </motion.div>
//           </div>

//           {/* Download Buttons - Stacked */}
//           <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
//             {/* Google Play */}
//             <a 
//               href="#download"
//               className="flex items-center justify-center gap-3 bg-white text-[#085056] px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
//             >
//               <FaGooglePlay className="text-xl" />
//               <div className="text-left">
//                 <div className="text-[10px] text-gray-500 leading-none">GET IT ON</div>
//                 <div className="text-sm font-bold leading-tight">Google Play</div>
//               </div>
//             </a>
            
//             {/* App Store */}
//             <div className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl relative">
//               <FaApple className="text-xl" />
//               <div className="text-left">
//                 <div className="text-[10px] text-teal-200 leading-none">COMING SOON</div>
//                 <div className="text-sm font-bold leading-tight">App Store</div>
//               </div>
//             </div>
//           </div>

//           {/* Features Grid - 2x2 */}
//           <div className="grid grid-cols-2 gap-3">
//             {appFeatures.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
//               >
//                 <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
//                   <feature.icon className="text-teal-300 text-lg" />
//                 </div>
//                 <h3 className="text-white text-xs font-semibold mb-0.5">{feature.title}</h3>
//                 <p className="text-teal-100/60 text-[10px]">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ============================================ */}
//         {/* DESKTOP LAYOUT (lg and above - Side by Side) */}
//         {/* ============================================ */}
//         <div className="hidden lg:block">
//          <div className="flex items-center gap-16 xl:gap-24 2xl:gap-28">

            
//             {/* Left - Content */}
//             <div className="flex-1 max-w-xl">
//               {/* Badge */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
//               >
//                 <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
//                 <span className="text-white text-sm font-medium tracking-wide">MOBILE ACCESS</span>
//               </motion.div>

//               {/* Title */}
//               <motion.h2
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 }}
//                 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-5 leading-tight"
//               >
//                 Jaimax in
//                 <span className="text-teal-300 ml-3">Your Pocket</span>
//               </motion.h2>

//               {/* Description */}
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2 }}
//                 className="text-teal-100/80 text-lg xl:text-xl mb-8 leading-relaxed"
//               >
//                 Access the complete Jaimax ecosystem on-the-go with our powerful and secure mobile app. Trade, monitor, and manage your crypto investments from anywhere in the world.
//               </motion.p>

//               {/* Download Buttons */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.3 }}
//                 className="flex flex-wrap gap-4 mb-10"
//               >
//                 {/* Google Play */}
//                 <a 
//                   href="#download"
//                   className="flex items-center gap-3 bg-white text-[#085056] px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//                 >
//                   <FaGooglePlay className="text-2xl" />
//                   <div className="text-left">
//                     <div className="text-[10px] text-gray-500 leading-none">GET IT ON</div>
//                     <div className="text-base font-bold leading-tight">Google Play</div>
//                   </div>
//                 </a>
                
//                 {/* App Store */}
//                 <div className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-xl cursor-not-allowed relative overflow-hidden">
//                   <FaApple className="text-2xl" />
//                   <div className="text-left">
//                     <div className="text-[10px] text-teal-200 leading-none">COMING SOON</div>
//                     <div className="text-base font-bold leading-tight">App Store</div>
//                   </div>
//                   {/* Diagonal ribbon */}
                
//                 </div>
//               </motion.div>

//               {/* Features - Horizontal */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.4 }}
//                 className="grid grid-cols-2 gap-4"
//               >
//                 {appFeatures.map((feature, index) => (
//                   <div 
//                     key={index}
//                     className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <feature.icon className="text-teal-300 text-lg" />
//                     </div>
//                     <div>
//                       <h3 className="text-white text-sm font-semibold">{feature.title}</h3>
//                       <p className="text-teal-100/60 text-xs">{feature.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right - Phone Mockup */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               className="flex-shrink-0 relative"
//             >
//               {/* Decorative circles */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                   className="w-80 h-80 rounded-full border-2 border-dashed border-white/10 absolute"
//                 />
//                 <motion.div
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//                   className="w-96 h-96 rounded-full border border-white/5 absolute"
//                 />
//               </div>

//               {/* Glow Effect */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
//               </div>

//               {/* Phone Stack */}
//               <div className="relative">
//                 {/* Back Phone (Shadow) */}
//                 <motion.div
//                   animate={{ y: [5, -5, 5] }}
//                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                   className="absolute left-6 top-6 bg-gray-900 rounded-[3rem] p-2 border-4 border-gray-800 opacity-20 blur-[1px]"
//                 >
//                   <div className="w-64 xl:w-72 h-[500px] xl:h-[560px] rounded-[2.5rem] bg-gray-800" />
//                 </motion.div>

//                 {/* Main Phone */}
//                 <motion.div
//                   animate={{ y: [-8, 8, -8] }}
//                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                   className="relative z-10 bg-gray-900 rounded-[3rem] p-2 shadow-2xl border-4 border-gray-800"
//                   style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(20, 184, 166, 0.2)' }}
//                 >
//                   {/* Screen */}
//                   <div className="relative w-64 xl:w-72 h-[500px] xl:h-[560px] rounded-[2.5rem] overflow-hidden bg-[#085056]">
//                     {/* Notch */}
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-3xl z-10 flex items-center justify-center">
//                       <div className="w-16 h-4 bg-gray-800 rounded-full" />
//                     </div>
                    
//                     {/* App Screenshot */}
//                     <img 
//                       src={app} 
//                       alt="Jaimax App" 
//                       className="w-full h-full object-cover"
//                     />
                    
//                     {/* Screen Glare Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
//                   </div>
                  
//                   {/* Home Indicator */}
//                   <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
//                 </motion.div>



//               </div>
//             </motion.div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// const JaimaxRoadmap = () => {
//   const containerRef = useRef(null);
//   const trackRef = useRef(null);
//   const progressBarRef = useRef(null);
//   const progressTextRef = useRef(null);
//   const timelineRef = useRef(null);

//   const years = Object.keys(roadmapData);

//   const totalPhases = years.reduce((acc, year) => acc + roadmapData[year].phases.length, 0);
//   const completedPhases = years.reduce((acc, year) => {
//     if (roadmapData[year].status === 'completed') return acc + roadmapData[year].phases.length;
//     if (roadmapData[year].status === 'active') return acc + Math.floor(roadmapData[year].phases.length * roadmapData[year].progress / 100);
//     return acc;
//   }, 0);
//   const overallProgress = Math.round((completedPhases / totalPhases) * 100);

//   useEffect(() => {
//     ScrollTrigger.getAll().forEach(trigger => {
//       if (trigger.vars.id && trigger.vars.id.includes('jaimax-roadmap')) {
//         trigger.kill();
//       }
//     });

//     const container = containerRef.current;
//     const track = trackRef.current;
    
//     if (!container || !track) {
//       console.error('Refs not found');
//       return;
//     }

//     const timer = setTimeout(() => {
//       const getScrollAmount = () => {
//         const trackWidth = track.scrollWidth;
//         const containerWidth = container.offsetWidth;
//         return trackWidth - containerWidth + 100;
//       };

//       const scrollTween = gsap.to(track, {
//         x: () => -(getScrollAmount()),
//         ease: "none"
//       });

//       ScrollTrigger.create({
//         id: 'jaimax-roadmap-main',
//         trigger: container,
//         start: "top top",
//         end: () => `+=${getScrollAmount()}`,
//         pin: true,
//         animation: scrollTween,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         onUpdate: (self) => {
//           if (progressBarRef.current && progressTextRef.current) {
//             const progress = Math.round(self.progress * 100);
//             progressBarRef.current.style.width = `${progress}%`;
//             progressTextRef.current.textContent = `${progress}%`;
//           }
          
//           if (timelineRef.current) {
//             const progressLine = timelineRef.current.querySelector('.timeline-progress');
//             if (progressLine) {
//               progressLine.style.width = `${self.progress * 100}%`;
//             }
//           }
//         }
//       });

//       const cards = track.querySelectorAll('.roadmap-card');
//       cards.forEach((card, i) => {
//         gsap.fromTo(card,
//           { opacity: 0, y: 40, scale: 0.95 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 1,
//             ease: "power2.out",
//             scrollTrigger: {
//               id: `jaimax-roadmap-card-${i}`,
//               trigger: card,
//               containerAnimation: scrollTween,
//               start: "left 85%",
//               end: "left 50%",
//               scrub: 1
//             }
//           }
//         );
//       });

//       const nodes = track.querySelectorAll('.roadmap-node');
//       nodes.forEach((node, i) => {
//         gsap.fromTo(node,
//           { scale: 0, opacity: 0 },
//           {
//             scale: 1,
//             opacity: 1,
//             duration: 0.5,
//             ease: "back.out(1.7)",
//             scrollTrigger: {
//               id: `jaimax-roadmap-node-${i}`,
//               trigger: node,
//               containerAnimation: scrollTween,
//               start: "left 90%",
//               end: "left 70%",
//               scrub: 1
//             }
//           }
//         );
//       });

//       ScrollTrigger.refresh();
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//       ScrollTrigger.getAll().forEach(trigger => {
//         if (trigger.vars.id && trigger.vars.id.includes('jaimax-roadmap')) {
//           trigger.kill();
//         }
//       });
//     };
//   }, []);

//   const getStatusConfig = (status) => {
//     const configs = {
//       completed: {
//         nodeClass: 'bg-gradient-to-br from-teal-500 to-emerald-500 border-4 border-white shadow-lg shadow-teal-500/30',
//         cardClass: 'bg-white border-2 border-teal-100 hover:border-teal-200 hover:shadow-xl',
//         titleClass: 'text-teal-800',
//         textClass: 'text-gray-600',
//         badge: 'bg-teal-100 text-teal-700 border border-teal-200',
//         badgeText: '✓ Completed',
//         yearClass: 'text-teal-600',
//         dotClass: 'bg-teal-400',
//         lineClass: 'bg-gradient-to-b from-teal-500 to-teal-400'
//       },
//       active: {
//         nodeClass: 'bg-white border-4 border-teal-500 shadow-xl shadow-teal-500/40 ring-4 ring-teal-100',
//         cardClass: 'bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 border-0 shadow-2xl shadow-teal-500/30',
//         titleClass: 'text-white',
//         textClass: 'text-teal-50',
//         badge: 'bg-white/20 text-white border border-white/30 backdrop-blur-sm',
//         badgeText: '● In Progress',
//         yearClass: 'text-teal-600 font-extrabold',
//         dotClass: 'bg-white/80',
//         lineClass: 'bg-gradient-to-b from-teal-500 to-teal-300'
//       },
//       future: {
//         nodeClass: 'bg-white border-4 border-gray-200 shadow-md',
//         cardClass: 'bg-gray-50 border-2 border-gray-100 hover:border-gray-200',
//         titleClass: 'text-gray-700',
//         textClass: 'text-gray-500',
//         badge: 'bg-gray-100 text-gray-500 border border-gray-200',
//         badgeText: 'Upcoming',
//         yearClass: 'text-gray-400',
//         dotClass: 'bg-gray-300',
//         lineClass: 'bg-gray-200'
//       }
//     };
//     return configs[status];
//   };

//   const cardWidth = 350;
//   const cardGap = 30;
//   const totalTimelineWidth = (years.length * (cardWidth + cardGap)) + 300;

//   return (
//     <div className="bg-[#085056">
    
//       {/* Hero Section - Reduced height */}
//       <div className="min-h-[35vh] flex flex-col items-center justify-center text-center px-4 py-4">
      
//         <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-sm font-semibold mb-6 border border-teal-200/50 shadow-sm">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
//           </span>
//           Building the Future
//         </div>
        
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           <span className="bg-gradient-to-r from-lime-500 via-white-900 to-lime-500 bg-clip-text text-transparent">
//             Jaimax Roadmap
//           </span>
//         </h1>
        
//         <p className="text-gray-600 max-w-2xl mx-auto text-white md:text-lg mb-6 leading-relaxed">
//           Our journey to revolutionize the blockchain ecosystem. 
//           Scroll down to explore our milestones.
//         </p>


//       </div>

//       {/* Horizontal Scroll Section */}
//       <div ref={containerRef} className="relative h-screen overflow-hidden bg-teal-100">
        
//         {/* Progress Header - Moved up */}
//               <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//           className="relative block w-full h-16 md:h-24"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//             className="fill-[#085056]"
//           />
//         </svg>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
//         <svg
//           className="relative block w-full h-16 md:h-24"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//             className="fill-[#085056]"
//           />
//         </svg>
//       </div>


//         {/* Track Container - Adjusted for better vertical centering */}
//         <div className="h-full flex items-start pt-10">
//           <div 
//             ref={trackRef} 
//             className="relative flex items-start pl-[12vw] pr-[25vw]" 
//             style={{ width: 'max-content' }}
//           >
            
//             {/* TIMELINE - Positioned higher */}
//             <div 
//               ref={timelineRef}
//               className="absolute h-1 bg-gray-200 rounded-full"
//               style={{ 
//                 width: `${totalTimelineWidth}px`,
//                 left: '0',
//                 top: '80px',
//               }}
//             >
//               <div 
//                 className="timeline-progress h-full bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-500 rounded-full transition-all duration-300 relative"
//                 style={{ width: '0%' }}
//               >
//                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50">
//                   <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-75"></div>
//                 </div>
//               </div>
//             </div>

//             {/* ROADMAP CARDS */}
//             {years.map((year, index) => {
//               const data = roadmapData[year];
//               const config = getStatusConfig(data.status);

//               return (
//                 <div 
//                   key={year} 
//                   className="roadmap-card flex-shrink-0 relative"
//                   style={{ 
//                     width: `${cardWidth}px`, 
//                     marginRight: `${cardGap}px`,
//                   }}
//                 >
//                   <div className="flex flex-col items-center">
                    
//                     {/* NODE - On timeline (80px - 24px for half of 48px node) */}
//                     <div 
//                       className="relative"
//                       style={{ marginTop: '56px' }}
//                     >
//                       <div 
//                         className={`roadmap-node relative z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer ${config.nodeClass}`}
//                       >
//                         {data.status === 'completed' ? (
//                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                           </svg>
//                         ) : data.status === 'active' ? (
//                           <div className="relative">
//                             <div className="w-3 h-3 bg-teal-500 rounded-full animate-ping absolute inset-0"></div>
//                             <div className="w-3 h-3 bg-teal-500 rounded-full relative"></div>
//                           </div>
//                         ) : (
//                           <span className="text-gray-400 font-bold text-sm">{year.slice(-2)}</span>
//                         )}
                        
//                         {data.status === 'active' && (
//                           <>
//                             <div className="absolute -inset-1.5 rounded-full border-2 border-teal-400/50 animate-ping"></div>
//                             <div className="absolute -inset-3 rounded-full bg-teal-400/10 animate-pulse"></div>
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     {/* CONNECTOR LINE */}
//                     <div className={`w-0.5 h-6 ${config.lineClass}`} />

//                     {/* YEAR LABEL */}
//                     <div className={`text-xl font-bold mb-2 ${config.yearClass}`}>
//                       {year}
//                     </div>

//                     {/* CARD - Compact */}
//                     <div className={`w-full p-5 rounded-xl transition-all duration-300 ${config.cardClass}`}>
//                       {/* Header */}
//                       <div className="flex items-start justify-between gap-2 mb-3">
//                         <h3 className={`font-bold text-lg leading-tight ${config.titleClass}`}>
//                           {data.title}
//                         </h3>
//                         <span className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${config.badge}`}>
//                           {config.badgeText}
//                         </span>
//                       </div>

//                       {/* Progress for Active */}
//                       {data.status === 'active' && (
//                         <div className="mb-4">
//                           <div className="flex justify-between text-xs mb-1.5">
//                             <span className="text-teal-100">Progress</span>
//                             <span className="font-bold text-white">{data.progress}%</span>
//                           </div>
//                           <div className="h-2 bg-white/20 rounded-full overflow-hidden">
//                             <div 
//                               className="h-full bg-white rounded-full transition-all duration-500 relative overflow-hidden"
//                               style={{ width: `${data.progress}%` }}
//                             >
//                               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 animate-shimmer"></div>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {/* Phases */}
//                       <ul className="space-y-2">
//                         {data.phases.map((phase, idx) => (
//                           <li 
//                             key={idx} 
//                             className={`flex items-start gap-2 text-xs ${config.textClass}`}
//                           >
//                             <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dotClass}`} />
//                             <span className="leading-relaxed">{phase}</span>
//                           </li>
//                         ))}
//                       </ul>

//                       {/* Active Footer */}
                      
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* END MARKER */}
//             <div className="flex-shrink-0 relative" style={{ width: '250px' }}>
//               <div className="flex flex-col items-center">
                
//                 {/* End Node - On Timeline */}
//                 <div 
//                   className="relative"
//                   style={{ marginTop: '52px' }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-lg opacity-40 animate-pulse scale-150"></div>
                  
//                   <div className="roadmap-node relative w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-2xl border-4 border-white z-20">
//                    <img src={jaicoins} alt="" />
//                   </div>
//                 </div>
                
//                 {/* Connector */}
//                 <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-cyan-200" />
                
//                 {/* Year Label */}
//                 <div className="text-center mb-2">
//                   <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
//                     2028+
//                   </span>
//                   <p className="text-gray-500 text-xs mt-0.5">The Future</p>
//                 </div>
                
//                 {/* Future Card */}
//                 <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200 w-full">
//                   <div className="text-center">
//                     <div className="text-2xl mb-1"></div>
//                     <p className="text-gray-600 text-xs leading-relaxed">
//                       Endless possibilities ahead
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// const ContactForm = () => {
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const formRef = useRef(null);
//   const infoRef = useRef(null);
//   const decorRef = useRef(null);
//   const formElements = useRef([]);
//   const infoElements = useRef([]);
  
//   const [formState, setFormState] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
  
//   const [focusedField, setFocusedField] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [formStatus, setFormStatus] = useState(null);
//   const [charCount, setCharCount] = useState(0);
//   const maxChars = 500;
  
//   const addToFormElements = (el) => {
//     if (el && !formElements.current.includes(el)) {
//       formElements.current.push(el);
//     }
//   };

//   const addToInfoElements = (el) => {
//     if (el && !infoElements.current.includes(el)) {
//       infoElements.current.push(el);
//     }
//   };
  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'message') {
//       if (value.length <= maxChars) {
//         setCharCount(value.length);
//         setFormState(prev => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormState(prev => ({ ...prev, [name]: value }));
//     }
    
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleFocus = (field) => {
//     setFocusedField(field);
//   };

//   const handleBlur = () => {
//     setFocusedField(null);
//   };
  
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formState.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formState.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }
    
//     if (!formState.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (formState.phone && !/^[\d\s\-+()]{10,}$/.test(formState.phone)) {
//       newErrors.phone = 'Please enter a valid phone number';
//     }
    
//     if (!formState.subject.trim()) {
//       newErrors.subject = 'Subject is required';
//     }
    
//     if (!formState.message.trim()) {
//       newErrors.message = 'Message is required';
//     } else if (formState.message.trim().length < 10) {
//       newErrors.message = 'Message must be at least 10 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setFormStatus('submitting');
      
//       // Simulate API call
//       setTimeout(() => {
//         if (Math.random() > 0.05) {
//           setFormStatus('success');
//           setFormState({
//             name: '',
//             email: '',
//             phone: '',
//             subject: '',
//             message: ''
//           });
//           setCharCount(0);
          
//           // Success animation
//           gsap.fromTo(formRef.current,
//             { scale: 1 },
//             { 
//               scale: 1.02, 
//               duration: 0.2, 
//               yoyo: true, 
//               repeat: 1,
//               ease: "power2.inOut"
//             }
//           );
          
//           setTimeout(() => setFormStatus(null), 5000);
//         } else {
//           setFormStatus('error');
//         }
//       }, 1500);
//     } else {
//       // Shake animation on error
//       gsap.to(formRef.current, {
//         x: [-15, 15, -10, 10, -5, 5, 0],
//         duration: 0.6,
//         ease: "power2.inOut"
//       });
//     }
//   };

//   const InputWrapper = ({ children, label, name, error, icon, required = false }) => (
//     <div ref={addToFormElements} className="relative group">
//       <label 
//         htmlFor={name} 
//         className={`absolute left-12 transition-all duration-300 pointer-events-none
//           ${focusedField === name || formState[name] 
//             ? '-top-2.5 text-xs bg-white px-2 text-teal-600 font-semibold' 
//             : 'top-3.5 text-gray-400'
//           }`}
//       >
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>
//       <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors">
//         {icon}
//       </div>
//       {children}
//       {error && (
//         <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1">
//           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//           </svg>
//           {error}
//         </p>
//       )}
//     </div>
//   );

//   const contactInfo = [
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//           <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//         </svg>
//       ),
//       title: "Call Us",
//       lines: ["+91 9121799947", "+91 9121758880"]
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//           <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//           <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//         </svg>
//       ),
//       title: "Email Us",
//       lines: ["office@jaimax.com"]
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//         </svg>
//       ),
//       title: "Visit Our Office",
//       lines: ["Survey No: 18, India Building", "4th Floor, Vaishnavi's Cynosure", "Gachibowli, Hyderabad - 500081"]
//     },
//     {
//       icon: (
//         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//         </svg>
//       ),
//       title: "Business Hours",
//       lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"]
//     }
//   ];

//   const socialLinks = [
//     { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', href: '#' },
//     { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', href: '#' },
//     { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', href: '#' },
//     { name: 'Instagram', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', href: '#' }
//   ];

//   return (
//     <section 
//       ref={sectionRef} 
//       className="relative py-5 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50"
//     >
//       {/* Animated Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div 
//           ref={decorRef}
//           className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"
//         />
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl" />
        
//         {/* Floating shapes */}
//         <svg className="absolute top-20 left-20 w-20 h-20 text-teal-200/50 animate-bounce" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
//           <circle cx="50" cy="50" r="40" fill="currentColor" />
//         </svg>
//         <svg className="absolute bottom-40 right-20 w-16 h-16 text-cyan-200/50 animate-pulse" viewBox="0 0 100 100">
//           <rect x="10" y="10" width="80" height="80" rx="20" fill="currentColor" />
//         </svg>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div ref={headingRef} className="text-center mb-16">
//           <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold mb-4 tracking-wide">
//             GET IN TOUCH
//           </span>
//           <h2 className="text-3xl md:text-3xl lg:text-6xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
//             Contact Us
//           </h2>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
//             Have a question or want to work together? We'd love to hear from you. 
//             Send us a message and we'll respond as soon as possible.
//           </p>
//           <div className="flex justify-center mt-6">
//             <div className="flex items-center gap-2">
//               <span className="w-12 h-1 bg-gradient-to-r from-transparent to-teal-500 rounded-full"></span>
//               <span className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></span>
//               <span className="w-12 h-1 bg-gradient-to-l from-transparent to-teal-500 rounded-full"></span>
//             </div>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
//            <div className="lg:col-span-2 space-y-6">
//             <div 
//               ref={infoRef} 
//               className="bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 rounded-3xl shadow-2xl shadow-teal-500/20 p-8 text-white relative overflow-hidden"
//             >
//               {/* Decorative elements */}
//               <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
//               <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
//               <div className="relative z-10">
//                 <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
//                   <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </span>
//                   Contact Information
//                 </h3>
                
//                 <div className="space-y-6">
//                   {contactInfo.map((item, index) => (
//                     <div 
//                       key={index}
//                       ref={addToInfoElements}
//                       className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors duration-300 group cursor-pointer"
//                     >
//                       <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         {item.icon}
//                       </div>
//                       <div>
//                         <p className="text-teal-200 text-sm font-medium">{item.title}</p>
//                         {item.lines.map((line, i) => (
//                           <p key={i} className="font-medium text-white/90">{line}</p>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//               </div>
//             </div>

//           </div>
//           {/* Contact Form - Takes 3 columns */}
//           <div 
//             ref={formRef} 
//             className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-teal-500/10 p-8 md:p-10 border border-white/50"
//           >
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
//                 <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you</p>
//               </div>
//             </div>
            
//             {/* Status Messages */}
//             {formStatus === 'success' && (
//               <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl flex items-start gap-4 animate-fadeIn">
//                 <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-green-800">Message sent successfully!</p>
//                   <p className="text-green-600 text-sm mt-1">Thank you for reaching out. We'll get back to you within 24 hours.</p>
//                 </div>
//               </div>
//             )}
            
//             {formStatus === 'error' && (
//               <div className="mb-6 p-5 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl flex items-start gap-4 animate-fadeIn">
//                 <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-red-800">Failed to send message</p>
//                   <p className="text-red-600 text-sm mt-1">Please try again later or contact us directly via email.</p>
//                 </div>
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputWrapper 
//                   label="Full Name" 
//                   name="name" 
//                   error={errors.name}
//                   required
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   }
//                 >
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formState.name}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('name')}
//                     onBlur={handleBlur}
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-300 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
//                   />
//                 </InputWrapper>
                
//                 <InputWrapper 
//                   label="Email Address" 
//                   name="email" 
//                   error={errors.email}
//                   required
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   }
//                 >
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formState.email}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('email')}
//                     onBlur={handleBlur}
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-300 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
//                   />
//                 </InputWrapper>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputWrapper 
//                   label="Phone Number" 
//                   name="phone" 
//                   error={errors.phone}
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   }
//                 >
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formState.phone}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('phone')}
//                     onBlur={handleBlur}
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-300 ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
//                   />
//                 </InputWrapper>
                
//                 <InputWrapper 
//                   label="Subject" 
//                   name="subject" 
//                   error={errors.subject}
//                   required
//                   icon={
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                     </svg>
//                   }
//                 >
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formState.subject}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('subject')}
//                     onBlur={handleBlur}
//                     className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-300 ${errors.subject ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
//                   />
//                 </InputWrapper>
//               </div>
              
//               <div ref={addToFormElements} className="relative group">
//                 <label 
//                   htmlFor="message" 
//                   className={`absolute left-12 transition-all duration-300 pointer-events-none z-10
//                     ${focusedField === 'message' || formState.message 
//                       ? '-top-2.5 text-xs bg-white px-2 text-teal-600 font-semibold' 
//                       : 'top-3.5 text-gray-400'
//                     }`}
//                 >
//                   Your Message <span className="text-red-400">*</span>
//                 </label>
//                 <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-teal-500 transition-colors">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                   </svg>
//                 </div>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formState.message}
//                   onChange={handleChange}
//                   onFocus={() => handleFocus('message')}
//                   onBlur={handleBlur}
//                   rows="5"
//                   className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-300 resize-none ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200'}`}
//                 />
//                 <div className="absolute bottom-3 right-3 text-xs text-gray-400">
//                   <span className={charCount > maxChars * 0.9 ? 'text-orange-500' : ''}>{charCount}</span>/{maxChars}
//                 </div>
//                 {errors.message && (
//                   <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {errors.message}
//                   </p>
//                 )}
//               </div>
              
//               <div ref={addToFormElements} className="pt-2">
//                 <button 
//                   type="submit"
//                   disabled={formStatus === 'submitting'}
//                   className="group relative w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/30 disabled:transform-none disabled:shadow-none overflow-hidden"
//                 >
//                   <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
//                   <span className="relative flex justify-center items-center gap-2">
//                     {formStatus === 'submitting' ? (
//                       <>
//                         <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Sending Message...
//                       </>
//                     ) : (
//                       <>
//                         Send Message
//                         <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                         </svg>
//                       </>
//                     )}
//                   </span>
//                 </button>
//               </div>
//             </form>
//           </div>
          
//           {/* Contact Information - Takes 2 columns */}
         
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </section>
//   );
// };


// const JaimaxLanding = () => {
//   const [openFaq, setOpenFaq] = useState(null);
//   const navigate = useNavigate();
//   const heroRef = useRef(null);
//   const servicesRef = useRef(null);
//   const trustedSectionRef = useRef(null);
//   const phasesRef = useRef(null);
//   const phasesContainerRef = useRef(null);
//   const securityVideoRef = useRef(null);
//   const securityMainVideoRef = useRef(null);
//   const securityLeftCardsRef = useRef(null);
//   const securityRightCardsRef = useRef(null);
//   const faqRef = useRef(null);
//   const uniqueFeaturesRef = useRef(null); 
//   const [activeIndex, setActiveIndex] = useState(0);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     // Clear existing ScrollTriggers more selectively
//     ScrollTrigger.getAll().forEach((trigger) => {
//       const id = trigger.vars.id;
//       // Preserve specific animations
//       if (
//         id &&
//         (id.toString().startsWith("card-") || 
//          id === "bento-gallery" ||
//          id === "phases-wheel-pin" ||
//          id === "phases-wheel-rotation" ||
//          id.toString().includes("roadmap") ||
//          id === "security-main" ||
//          id === "unique-features-horizontal" || // ✅ Added for horizontal scroll
//          id === "services-stack" ||
//          id.toString().startsWith("faq-"))
//       ) {
//         return; // Don't kill these
//       }
//       trigger.kill();
//     });

//     // Hero animations
//     if (heroRef.current) {
//       const tl = gsap.timeline();
//       tl.from(heroRef.current.querySelector(".hero-badge"), {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         ease: "power3.out",
//       })
//         .from(
//           heroRef.current.querySelector(".hero-title"),
//           {
//             opacity: 0,
//             y: 50,
//             duration: 1,
//             ease: "power3.out",
//           },
//           "-=0.4"
//         )
//         .from(
//           heroRef.current.querySelector(".hero-subtitle"),
//           {
//             opacity: 0,
//             y: 30,
//             duration: 0.8,
//             ease: "power3.out",
//           },
//           "-=0.6"
//         )
//         .from(
//           heroRef.current.querySelectorAll(".hero-button"),
//           {
//             opacity: 0,
//             y: 30,
//             stagger: 0.2,
//             duration: 0.6,
//             ease: "power3.out",
//           },
//           "-=0.4"
//         )
//         .from(
//           heroRef.current.querySelectorAll(".stat-card"),
//           {
//             opacity: 0,
//             scale: 0.8,
//             stagger: 0.1,
//             duration: 0.6,
//             ease: "back.out(1.7)",
//           },
//           "-=0.3"
//         );
//     }

//     // Services section
//  if (servicesRef.current) {
//       const cards = gsap.utils.toArray(".service-card");
//       const totalCards = cards.length;

//       // Set initial positions - stacked horizontally
//       gsap.set(cards, {
//         x: (i) => i * 30, // Slight horizontal offset
//         scale: (i) => 1 - i * 0.05,
//         opacity: (i) => 1 - i * 0.2,
//         zIndex: (i) => totalCards - i,
//         rotationY: (i) => i * 5, // Slight Y rotation for depth
//       });

//       const serviceTl = gsap.timeline({
//         scrollTrigger: {
//           id: "services-stack",
//           trigger: servicesRef.current,
//           start: "top top",
//           end: `+=${totalCards * 500}`,
//           scrub: 1,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//         },
//       });

//       cards.forEach((card, index) => {
//         if (index < totalCards - 1) {
//           // Move current card to the left
//           serviceTl.to(
//             card,
//             {
//               x: -window.innerWidth, // Move completely off screen to the left
//               opacity: 0,
//               scale: 0.8,
//               rotationY: -20, // Rotate as it moves away
//               duration: 1,
//               ease: "power2.inOut",
//             },
//             index
//           );

//           // Bring next cards forward
//           cards.slice(index + 1).forEach((nextCard, nextIndex) => {
//             serviceTl.to(
//               nextCard,
//               {
//                 x: nextIndex * 30,
//                 scale: 1 - nextIndex * 0.05,
//                 opacity: 1 - nextIndex * 0.2,
//                 rotationY: nextIndex * 5,
//                 duration: 1,
//               },
//               index
//             );
//           });
//         }
//       });
//     }

//     // Phases section
//     if (phasesRef.current && phasesContainerRef.current) {
//       const phasesContainer = phasesContainerRef.current;

//       gsap.to(phasesContainer, {
//         x: () => -(phasesContainer.scrollWidth - window.innerWidth + 100),
//         ease: "none",
//         scrollTrigger: {
//           id: "phases-horizontal",
//           trigger: phasesRef.current,
//           start: "top top",
//           end: () => `+=${phasesContainer.scrollWidth}`,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });
//     }

//     // ✅ NEW: Unique Features Horizontal Scroll Section
// // ✅ UPDATED: Unique Features Horizontal Scroll Section
// if (uniqueFeaturesRef.current) {
//   const existingTrigger = ScrollTrigger.getById("unique-features-horizontal");
//   if (existingTrigger) existingTrigger.kill();

//   const totalFeatures = 5;
//   const isMobile = window.innerWidth < 768;

//   // Set initial positions
//   gsap.set(".unique-feature-1", { x: "0vw", zIndex: 5, opacity: 1 });
//   gsap.set(".unique-feature-2", { x: "100vw", zIndex: 4, opacity: 0 });
//   gsap.set(".unique-feature-3", { x: "100vw", zIndex: 3, opacity: 0 });
//   gsap.set(".unique-feature-4", { x: "100vw", zIndex: 2, opacity: 0 });
//   gsap.set(".unique-feature-5", { x: "100vw", zIndex: 1, opacity: 0 });

//   // Mobile-optimized timeline
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       id: "unique-features-horizontal",
//       trigger: uniqueFeaturesRef.current,
//       start: "top top",
//       end: isMobile ? "+=300%" : "+=400%", // Shorter scroll distance on mobile
//       scrub: isMobile ? 0.3 : 0.5, // More responsive on mobile
//       pin: true,
//       anticipatePin: 1,
//       snap: {
//         snapTo: [0, 0.25, 0.5, 0.75, 1],
//         duration: { min: 0.1, max: 0.3 }, // Faster snapping on mobile
//         ease: "power1.inOut"
//       },
//       onUpdate: (self) => {
//         const progress = self.progress;
//         let activeIndex = 0;
        
//         if (progress <= 0.125) activeIndex = 0;
//         else if (progress <= 0.375) activeIndex = 1;
//         else if (progress <= 0.625) activeIndex = 2;
//         else if (progress <= 0.875) activeIndex = 3;
//         else activeIndex = 4;

//         // Update dots
//         gsap.utils.toArray('.progress-indicator div').forEach((dot, i) => {
//           if (i === activeIndex) {
//             gsap.set(dot, { 
//               width: isMobile ? "1rem" : "2rem", 
//               backgroundColor: "#b8cc26"
//             });
//           } else {
//             gsap.set(dot, { 
//               width: isMobile ? "0.375rem" : "0.5rem", 
//               backgroundColor: "rgba(255,255,255,0.3)"
//             });
//           }
//         });
//       }
//     }
//   });

//   // Faster transitions on mobile
//   const duration = isMobile ? 0.6 : 1;
//   const ease = isMobile ? "power1.inOut" : "power2.inOut";

//   // Build timeline with mobile-optimized timing
//   tl.to(".unique-feature-1", { x: "-100vw", duration, ease }, 0)
//     .set(".unique-feature-2", { x: "100vw", zIndex: 5 }, 0)
//     .to(".unique-feature-2", { x: "0vw", opacity: 1, duration, ease }, 0)
//     .fromTo(".unique-feature-2 .feature-content", 
//       { opacity: 0, scale: 0.95 }, 
//       { opacity: 1, scale: 1, duration: duration * 0.5 }, 
//       0.1
//     )

//     .to(".unique-feature-2", { x: "-100vw", duration, ease }, 1)
//     .set(".unique-feature-3", { x: "100vw", zIndex: 5 }, 1)
//     .to(".unique-feature-3", { x: "0vw", opacity: 1, duration, ease }, 1)
//     .fromTo(".unique-feature-3 .feature-content", 
//       { opacity: 0, scale: 0.95 }, 
//       { opacity: 1, scale: 1, duration: duration * 0.5 }, 
//       1.1
//     )

//     .to(".unique-feature-3", { x: "-100vw", duration, ease }, 2)
//     .set(".unique-feature-4", { x: "100vw", zIndex: 5 }, 2)
//     .to(".unique-feature-4", { x: "0vw", opacity: 1, duration, ease }, 2)
//     .fromTo(".unique-feature-4 .feature-content", 
//       { opacity: 0, scale: 0.95 }, 
//       { opacity: 1, scale: 1, duration: duration * 0.5 }, 
//       2.1
//     )

//     .to(".unique-feature-4", { x: "-100vw", duration, ease }, 3)
//     .set(".unique-feature-5", { x: "100vw", zIndex: 5 }, 3)
//     .to(".unique-feature-5", { x: "0vw", opacity: 1, duration, ease }, 3)
//     .fromTo(".unique-feature-5 .feature-content", 
//       { opacity: 0, scale: 0.95 }, 
//       { opacity: 1, scale: 1, duration: duration * 0.5 }, 
//       3.1
//     );
// }
//     // Security section
//     if (securityVideoRef.current && securityMainVideoRef.current) {
//       const calculateDimensions = () => {
//         const initialWidth = Math.min(window.innerWidth * 0.45, 650);
//         const finalWidth = Math.min(window.innerWidth * 0.74, 1400);
//         const scaleRatio = finalWidth / initialWidth;
//         const cardOffset = Math.min(window.innerWidth * 0.34, 550);
//         const leftCardsInitialLeft = window.innerWidth * 0.48 - cardOffset;
//         const rightCardsInitialRight = window.innerWidth * 0.474 - cardOffset;

//         return {
//           initialWidth,
//           finalWidth,
//           scaleRatio,
//           leftCardsInitialLeft,
//           rightCardsInitialRight,
//         };
//       };

//       const dimensions = calculateDimensions();
//       const video = securityMainVideoRef.current;

//       gsap.set(video, {
//         width: dimensions.initialWidth + "px",
//       });

//       if (securityLeftCardsRef.current) {
//         gsap.set(securityLeftCardsRef.current, {
//           left: dimensions.leftCardsInitialLeft + "px",
//         });
//       }

//       if (securityRightCardsRef.current) {
//         gsap.set(securityRightCardsRef.current, {
//           right: dimensions.rightCardsInitialRight + "px",
//         });
//       }

//       const securityTl = gsap.timeline({
//         scrollTrigger: {
//           id: "security-main",
//           trigger: securityVideoRef.current,
//           start: "top 45%",
//           end: "bottom bottom",
//           scrub: 0.3,
//         },
//         defaults: {
//           ease: "none",
//         },
//       });

//       securityTl.fromTo(
//         video,
//         {
//           scale: 1,
//           boxShadow: "0px 4px 24px 0px rgba(255, 255, 255, 0.4)",
//         },
//         {
//           scale: dimensions.scaleRatio,
//           boxShadow: "0px 8px 48px 0px rgba(255, 255, 255, 0.6)",
//         }
//       );

//       if (securityLeftCardsRef.current) {
//         securityTl.fromTo(
//           securityLeftCardsRef.current,
//           { y: 0 },
//           {
//             y: "18vh",
//             xPercent: -105,
//           },
//           0
//         );
//       }

//       if (securityRightCardsRef.current) {
//         securityTl.fromTo(
//           securityRightCardsRef.current,
//           { y: 0, xPercent: 0 },
//           {
//             y: "20vh",
//             xPercent: 110,
//           },
//           0
//         );
//       }
//     }

//     // FAQ section
//     if (faqRef.current) {
//       const faqItems = faqRef.current.querySelectorAll(".faq-item");

//       faqItems.forEach((item, index) => {
//         gsap.fromTo(
//           item,
//           { opacity: 0, y: 40 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: "power2.out",
//             scrollTrigger: {
//               id: `faq-${index}`,
//               trigger: item,
//               start: "top 90%",
//               end: "top 70%",
//               toggleActions: "play none none reverse",
//             },
//           }
//         );
//       });
//     }

//     ScrollTrigger.refresh();
//   }, 150);

//   // Resize handler with debouncing
//   let resizeTimeout;
//   const handleResize = () => {
//     clearTimeout(resizeTimeout);
//     resizeTimeout = setTimeout(() => {
//       ScrollTrigger.refresh();
//     }, 250);
//   };

//   window.addEventListener("resize", handleResize);

//   return () => {
//     clearTimeout(timer);
//     clearTimeout(resizeTimeout);
//     window.removeEventListener("resize", handleResize);
//   };
// }, []);

//   return (
//     <div id="main-content" className="bg-[#085056] text-white">
//     <header
//       ref={heroRef}
//       className="relative min-h-[100dvh] flex flex-col justify-center"
//     >
//       <div className="absolute inset-0 w-full h-full">
//         <picture>
//           {/* Mobile image source */}
//           <source
//             media="(max-width: 767px)"
//             srcSet={homeBgMobile}
//             type="image/jpeg"
//           />
//           {/* Desktop image source */}
//           <source
//             media="(min-width: 768px)"
//             srcSet={homeBgDesktop}
//             type="image/jpeg"
//           />
//           {/* Fallback image */}
//           <img
//             src={homeBgDesktop}
//             alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
//             title="Jaimax - Your Trusted Partner in Cryptocurrency Investment"
//             className="w-full h-full object-cover object-center"
//             loading="eager"
//             fetchPriority="high"
//             decoding="async"
//             width="1920"
//             height="1080"
//           />
//         </picture>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
//       </div>

//       <div className="relative z-10 px-4 py-10 mx-auto w-full max-w-9xl mt-14 sm:mt-16 lg:mt-0">
//         <div className="relative w-full min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] lg:min-h-[100dvh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
//           <h1
//             className="hero-title absolute 
//             top-4 left-4
//             sm:top-10 sm:left-10
//             lg:top-20 lg:left-10
//             font-600 leading-tight 
//             text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
//             text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1"
//           >
//             <span className="block text-[#b8cc26]">Best Crypto Coin</span>
//             <span className="block"> in India</span>
//             <span className="block">Invest Early in </span>
//             <span className="block"> Jaimax</span>
//           </h1>

//           <p
//             className="hero-subtitle absolute 
//             bottom-20 right-4
//             sm:bottom-24 sm:right-10
//             md:bottom-32 lg:bottom-40
//             text-white text-sm sm:text-base md:text-lg lg:text-xl 
//             font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4"
//           >
//             Our advanced platform simplifies your pre-sale crypto investment
//             journey, offering a secure and transparent experience to help you
//             grow with India's most trusted
//             <b className="text-[#aadc32]">
//               <a href="https://www.jaimax.com"> pre-sale crypto token</a>
//             </b>{" "}
//             - jaimax.
//             <button
//               type="button"
//               onClick={() => navigate("/login/")}
//               className="hero-button block ml-auto mt-4 font-bold text-center
//               bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] 
//               text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
//               rounded-full hover:scale-105 active:scale-95
//               transition-transform duration-300 px-4 py-1"
//             >
//               Join Jaimax Pre-Sale
//             </button>
//           </p>
//         </div>
//       </div>
//     </header>
//       <TokenStats />
//       <section
//         ref={servicesRef}
//         className="relative bg-[#085056] overflow-x-hidden"
//       >
//         {/* Content Container */}
//         <div className="relative min-h-screen flex flex-col overflow-hidden">
//           {/* Header - Fully responsive */}
//           <div className="pt-[8vh] pb-[4vh] text-center px-4 relative z-10">
//             <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#b8cc26]/10 border border-[#b8cc26]/30 rounded-full text-[#b8cc26] font-medium mb-4" 
//               style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
//               <span className="w-2 h-2 rounded-full bg-[#b8cc26] animate-pulse" />
//               Our Services
//             </span>
//             <h2 className="font-bold text-white mb-4" 
//               style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}>
//               What We <span className="text-[#b8cc26]">Offer</span>
//             </h2>
//             <p className="text-white/60 max-w-xl mx-auto" 
//               style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
//               Comprehensive solutions for your crypto journey
//             </p>
//           </div>

//           {/* Cards Container - Viewport based sizing */}
//           <div className="flex-1 flex items-center justify-center px-4 pb-[8vh]">
//             <div className="relative w-full max-w-[90vw] md:max-w-4xl" 
//               style={{ height: 'clamp(350px, 45vh, 550px)' }}>
//               {services.map((service, index) => (
//                 <div
//                   key={index}
//                   className="service-card absolute top-0 left-0 w-full h-full"
//                 >
//                   <div className="w-full h-full bg-[#064046] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
//                     {/* Big Background Number - Viewport responsive */}
//                     <div className="absolute top-4 right-4 overflow-hidden">
//                       <span className="font-black text-white/5 select-none leading-none"
//                         style={{ fontSize: 'clamp(3rem, 12vw, 8rem)' }}>
//                         {String(index + 1).padStart(2, '0')}
//                       </span>
//                     </div>

//                     {/* Content - Viewport responsive padding */}
//                     <div className="relative h-full flex flex-col justify-center overflow-hidden"
//                       style={{ padding: 'clamp(1rem, 4vw, 3rem)' }}>
                      
//                       {/* Icon + Label Row */}
//                       <div className="flex items-center mb-4" 
//                         style={{ gap: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
//                         <div className="bg-gradient-to-br from-[#b8cc26] to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-[#b8cc26]/20 flex-shrink-0"
//                           style={{ 
//                             width: 'clamp(2.5rem, 6vw, 5rem)',
//                             height: 'clamp(2.5rem, 6vw, 5rem)'
//                           }}>
//                           <img
//                             src={service.icon}
//                             alt={service.iconAlt}
//                             className="filter brightness-0 invert"
//                             style={{ 
//                               width: 'clamp(1.25rem, 3vw, 2.5rem)',
//                               height: 'clamp(1.25rem, 3vw, 2.5rem)'
//                             }}
//                           />
//                         </div>
//                         <div className="overflow-hidden">
//                           <span className="text-[#b8cc26] font-bold uppercase tracking-wider block"
//                             style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}>
//                             Service {String(index + 1).padStart(2, '0')}
//                           </span>
//                           <div className="h-px bg-[#b8cc26]/30 mt-1" 
//                             style={{ width: 'clamp(2rem, 4vw, 4rem)' }} />
//                         </div>
//                       </div>

//                       {/* Title - Viewport responsive */}
//                       <h3 className="font-bold text-white mb-3 max-w-lg leading-tight"
//                         style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)' }}>
//                         {service.title}
//                       </h3>

//                       {/* Description - Fixed and responsive */}
//                       <p className="text-white/60 leading-relaxed mb-6 max-w-xl"
//                         style={{ 
//                           fontSize: 'clamp(0.75rem, 1.8vw, 1.125rem)',
//                           display: '-webkit-box',
//                           WebkitLineClamp: '3',
//                           WebkitBoxOrient: 'vertical',
//                           overflow: 'hidden'
//                         }}>
//                         {service.description}
//                       </p>

//                       {/* CTA + Progress Row */}
//                       <div className="flex items-center justify-between flex-wrap gap-4">
//                         <button className="group inline-flex items-center gap-2 bg-[#b8cc26] hover:bg-[#a3b821] text-[#085056] font-bold rounded-full transition-all"
//                           style={{ 
//                             padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)',
//                             fontSize: 'clamp(0.75rem, 1.5vw, 1rem)'
//                           }}>
//                           <span>Learn More</span>
//                           <svg 
//                             className="group-hover:translate-x-1 transition-transform" 
//                             fill="none" 
//                             stroke="currentColor" 
//                             viewBox="0 0 24 24"
//                             style={{ 
//                               width: 'clamp(0.875rem, 2vw, 1.25rem)',
//                               height: 'clamp(0.875rem, 2vw, 1.25rem)'
//                             }}>
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                           </svg>
//                         </button>

//                         {/* Progress Dots - Viewport responsive */}
//                         <div className="flex items-center" style={{ gap: 'clamp(0.375rem, 1vw, 0.5rem)' }}>
//                           {services.map((_, i) => (
//                             <div
//                               key={i}
//                               className={`rounded-full transition-all ${
//                                 i === index 
//                                   ? 'bg-[#b8cc26]' 
//                                   : 'bg-white/20'
//                               }`}
//                               style={{
//                                 width: i === index 
//                                   ? 'clamp(1rem, 3vw, 2rem)' 
//                                   : 'clamp(0.375rem, 1vw, 0.5rem)',
//                                 height: 'clamp(0.375rem, 1vw, 0.5rem)'
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Corner Decorations - Viewport responsive */}
//                     <div className="absolute bottom-0 left-0 bg-[#b8cc26]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"
//                       style={{ 
//                         width: 'clamp(6rem, 15vw, 10rem)',
//                         height: 'clamp(6rem, 15vw, 10rem)'
//                       }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       <div 
//           style={{ 
//           backgroundImage: 'linear-gradient(rgba(30, 43, 42, 0.9), rgba(11, 22, 21, 0.8)), url("https://i.pinimg.com/736x/69/d2/c1/69d2c1763cf91e13adad4f6069b283bc.jpg")',
//           backgroundAttachment: 'fixed',
//         }}>

//         <SecuritySec />
//       </div>
//       <PhasesWheelSection />
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
//         subheading="Innovation"
//         heading="The Future is Here"
//       >

//       {/* Main Content */}
//       <div className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
//       {/* Background Elements */}
      

//       {/* Main Content */}
//       <div className="relative z-10">

//         {/* Introduction Section */}
//         <IntroductionSection />

//         {/* Features Grid */}
//            <JaimaxUniqueFeature uniqueFeaturesRef={uniqueFeaturesRef} />


//         {/* Security Section */}
//         <SecuritySection />

//         {/* Ecosystem Section */}
//         <EcosystemSection />

//         {/* App section */}
//         <AppSection/>
//       </div>
//     </div>
//       </TextParallaxContent>
//       <section className="py-2  relative overflow-hidden">
//         <div className="relative z-10 py-1 md:py-4">
//           <div className="container max-w-7xl mx-auto px-4">
//             <section className="py-0 bg-[#085056] relative overflow-hidden">
//               {/* Animated Background Elements */}
//               <motion.div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute inset-0 opacity-5">
//                   <div
//                     className="h-full w-full"
//                     style={{
//                       backgroundImage: `linear-gradient(rgba(184, 204, 38, 0.3) 1px, transparent 1px),
//                                linear-gradient(90deg, rgba(184, 204, 38, 0.3) 1px, transparent 1px)`,
//                       backgroundSize: "50px 50px",
//                     }}
//                   ></div>
//                 </div>
//               </motion.div>

//               {/* Main Content */}
//               <div className="relative z-10 py-16 md:py-20 lg:py-24">
//                 <div className="container max-w-7xl mx-auto px-4">
//                   {/* Header Section */}
//                   <motion.div className="text-center mb-12 md:mb-16">
//                     {/* Badge */}
//                     <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
//                       <span className="w-2 h-2 bg-[#b8cc26] rounded-full animate-pulse"></span>
//                       <span className="text-white/90 text-sm font-medium">
//                         Presale Live Now
//                       </span>
//                     </motion.div>

//                     {/* Main Heading */}
//                     <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
//                       Trusted by Thousands of Crypto Investors
//                     </motion.h2>

//                     {/* Description */}
//                     <motion.p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
//                       Join the most successful crypto presale of 2025. Our
//                       community of early investors has already generated over{" "}
//                       <span className="text-[#b8cc26] font-semibold">
//                         $50M in verified returns
//                       </span>
//                       . Secure your position in the next generation of
//                       blockchain innovation.
//                     </motion.p>
//                   </motion.div>

//                   {/* Carousel Section */}
//                   <div className="relative">
//                     <div className="relative" style={{ overflow: "visible" }}>
//                       <Swiper
//                         modules={[
//                           Navigation,
//                           Pagination,
//                           Autoplay,
//                           EffectCoverflow,
//                         ]}
//                         effect="coverflow"
//                         grabCursor={true}
//                         centeredSlides={true}
//                         slidesPerView={3}
//                         loop={true}
//                         speed={600}
//                         coverflowEffect={{
//                           rotate: 0,
//                           stretch: 80,
//                           depth: 200,
//                           modifier: 1,
//                           slideShadows: false,
//                         }}
//                         autoplay={{
//                           delay: 4000,
//                           disableOnInteraction: false,
//                           pauseOnMouseEnter: true,
//                         }}
//                         navigation={{
//                           nextEl: ".owl-next",
//                           prevEl: ".owl-prev",
//                         }}
//                         pagination={{
//                           el: ".owl-dots",
//                           clickable: true,
//                           dynamicBullets: false,
//                         }}
//                         onSlideChange={(swiper) => {
//                           setActiveIndex(swiper.realIndex);
//                         }}
//                         onSwiper={(swiper) => {
//                           setActiveIndex(swiper.realIndex);
//                         }}
//                         className="!overflow-visible !py-8"
//                         style={{
//                           paddingBottom: "80px",
//                         }}
//                         breakpoints={{
//                           320: {
//                             slidesPerView: 1,
//                             coverflowEffect: {
//                               rotate: 0,
//                               stretch: 0,
//                               depth: 0,
//                               modifier: 1,
//                             },
//                           },
//                           768: {
//                             slidesPerView: 2,
//                             coverflowEffect: {
//                               rotate: 0,
//                               stretch: 50,
//                               depth: 100,
//                               modifier: 1,
//                             },
//                           },
//                           1024: {
//                             slidesPerView: 3,
//                             coverflowEffect: {
//                               rotate: 0,
//                               stretch: 80,
//                               depth: 200,
//                               modifier: 1,
//                             },
//                           },
//                         }}
//                       >
//                         {testimonials.map((testimonial, index) => (
//                           <SwiperSlide
//                             key={testimonial.id}
//                             style={{ width: "100%", maxWidth: "600px" }}
//                           >
//                             {({ isActive, isPrev, isNext, isVisible }) => (
//                               <motion.div
//                                 className={`
//                           transition-all duration-500
//                           ${
//                             !isActive && !isPrev && !isNext
//                               ? "invisible opacity-0"
//                               : "visible opacity-100"
//                           }
//                         `}
//                               >
//                                 <TestimonialCard
//                                   testimonial={testimonial}
//                                   isActive={isActive}
//                                 />
//                               </motion.div>
//                             )}
//                           </SwiperSlide>
//                         ))}
//                       </Swiper>
//                     </div>

//                     {/* Navigation Buttons */}
//                     <div className=" absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-4 md:gap-6 pointer-events-none z-[100] ">
//                       <motion.button
//                         type="button"
//                         role="presentation"
//                         className="owl-prev pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-[#b8cc26] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
//                       >
//                         <span
//                           aria-label="Previous"
//                           className="text-4xl md:text-5xl font-thin leading-none block -mt-0"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             stroke-width="2"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             class="lucide lucide-arrow-left-icon lucide-arrow-left"
//                           >
//                             <path d="m12 19-7-7 7-7" />
//                             <path d="M19 12H5" />
//                           </svg>{" "}
//                         </span>
//                       </motion.button>
//                       <motion.button
//                         type="button"
//                         role="presentation"
//                         className="owl-next pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-[#b8cc26] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
//                       >
//                         <span
//                           aria-label="Next"
//                           className="text-4xl md:text-5xl font-thin leading-none block -mt-0"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             stroke-width="2"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             class="lucide lucide-arrow-right-icon lucide-arrow-right"
//                           >
//                             <path d="M5 12h14" />
//                             <path d="m12 5 7 7-7 7" />
//                           </svg>
//                         </span>
//                       </motion.button>
//                     </div>
//                     <div className=" mt-4 "></div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </section>
//       <JaimaxRoadmap/>
//        <ReviewsSection />
//       <JaimaxFAQ />
//       <ContactForm />
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.5);
//         }
//         /* Initial state */
//         /* Bento Gallery Styles */
//         .gallery-bento {
//           display: grid;
//           gap: 1vh;
//           grid-template-columns: repeat(3, 32.5vw);
//           grid-template-rows: repeat(4, 23vh);
//           justify-content: center;
//           align-content: center;
//         }

//         .gallery-bento.gallery-final {
//           grid-template-columns: repeat(3, 100vw) !important;
//           grid-template-rows: repeat(4, 49.5vh) !important;
//           gap: 1vh;
//         }

//         .gallery-item {
//           background-position: 50% 50%;
//           background-size: cover;
//           flex: none;
//           position: relative;
//         }

//         .gallery-item img {
//           object-fit: cover;
//           width: 100%;
//           height: 100%;
//         }

//         .gallery-item:nth-child(1) {
//           grid-area: 1 / 1 / 3 / 2;
//         }
//         .gallery-item:nth-child(2) {
//           grid-area: 1 / 2 / 2 / 3;
//         }
//         .gallery-item:nth-child(3) {
//           grid-area: 2 / 2 / 4 / 3;
//         }
//         .gallery-item:nth-child(4) {
//           grid-area: 1 / 3 / 3 / 4;
//         }
//         .gallery-item:nth-child(5) {
//           grid-area: 3 / 1 / 4 / 2;
//         }
//         .gallery-item:nth-child(6) {
//           grid-area: 3 / 3 / 5 / 4;
//         }
//         .gallery-item:nth-child(7) {
//           grid-area: 4 / 1 / 5 / 2;
//         }
//         .gallery-item:nth-child(8) {
//           grid-area: 4 / 2 / 5 / 3;
//         }

//         @media (max-width: 768px) {
//           .gallery-bento {
//             grid-template-columns: repeat(2, 45vw);
//             grid-template-rows: repeat(4, 20vh);
//           }

//           .gallery-bento.gallery-final {
//             grid-template-columns: repeat(2, 95vw) !important;
//             grid-template-rows: repeat(4, 45vh) !important;
//           }
//         }
//         /* ===== COMPACT SECURITY SECTION ===== */

//         .compact-security-section {
//           position: relative;
//           padding: 3rem 1rem;
//           background: linear-gradient(
//             180deg,
//             #0d9488 0%,
//             #14b8a6 15%,
//             #5eead4 30%,
//             #99f6e4 45%,
//             #ccfbf1 60%,
//             #f0fdfa 75%,
//             #ffffff 90%,
//             #f0fdfa 100%
//           );
//           overflow: hidden;
//         }

//         .compact-container {
//           position: relative;
//           max-width: 1200px;
//           margin: 0 auto;
//           z-index: 10;
//         }

//         /* ===== COMPACT HEADER ===== */

//         .compact-header {
//           text-align: center;
//           margin-bottom: 2rem;
//         }

//         .compact-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.375rem;
//           padding: 0.375rem 1rem;
//           background: rgba(255, 255, 255, 0.95);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           border-radius: 9999px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           color: #0d9488;
//           backdrop-filter: blur(10px);
//           box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);
//           margin-bottom: 1rem;
//           animation: badge-float 3s ease-in-out infinite;
//         }

//         .compact-title {
//           font-size: clamp(1.75rem, 4vw, 2.5rem);
//           font-weight: 800;
//           color: rgba(255, 255, 255, 0.95);
//           margin-bottom: 0.75rem;
//           letter-spacing: -0.02em;
//           text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
//           animation: title-pulse 4s ease-in-out infinite;
//         }

//         .title-gradient {
//           background: linear-gradient(
//             90deg,
//             #ffffff,
//             #f0fdfa,
//             #ccfbf1,
//             #f0fdfa,
//             #ffffff
//           );
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: title-shimmer 4s linear infinite;
//           filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
//         }

//         .compact-intro {
//           font-size: 0.95rem;
//           color: rgba(255, 255, 255, 0.9);
//           max-width: 600px;
//           margin: 0 auto;
//           line-height: 1.6;
//           text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }

//         .compact-link {
//           color: #ffffff;
//           font-weight: 700;
//           text-decoration: underline;
//           text-decoration-color: rgba(255, 255, 255, 0.5);
//           text-decoration-thickness: 2px;
//           text-underline-offset: 2px;
//           transition: all 0.3s ease;
//           animation: link-glow 3s ease-in-out infinite;
//         }

//         .compact-link:hover {
//           text-decoration-color: #ffffff;
//           text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
//         }

//         /* ===== COMPACT GRID ===== */

//         .compact-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         /* ===== COMPACT CARD ===== */

//         .compact-card {
//           position: relative;
//           padding: 1.25rem;
//           background: rgba(255, 255, 255, 0.95);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.5);
//           border-radius: 1rem;
//           box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.1),
//             0 2px 4px -1px rgba(13, 148, 136, 0.06);
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           overflow: hidden;
//         }

//         .compact-card::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(
//             135deg,
//             rgba(20, 184, 166, 0.05),
//             rgba(6, 182, 212, 0.05)
//           );
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .compact-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.2),
//             0 4px 6px -2px rgba(13, 148, 136, 0.1);
//           border-color: rgba(20, 184, 166, 0.3);
//         }

//         .compact-card:hover::before {
//           opacity: 1;
//         }

//         /* ===== CARD HEADER ===== */

//         .compact-card-header {
//           display: flex;
//           align-items: flex-start;
//           gap: 0.875rem;
//           margin-bottom: 1rem;
//           position: relative;
//           z-index: 1;
//         }

//         .compact-icon {
//           flex-shrink: 0;
//           width: 2.5rem;
//           height: 2.5rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, #14b8a6, #06b6d4);
//           border-radius: 0.75rem;
//           box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
//           animation: icon-pulse 3s ease-in-out infinite;
//         }

//         .compact-icon svg {
//           width: 1.25rem;
//           height: 1.25rem;
//           color: white;
//           stroke-width: 2.5;
//           filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
//         }

//         .compact-card-content {
//           flex: 1;
//           min-width: 0;
//         }

//         .compact-card-title {
//           font-size: 1rem;
//           font-weight: 700;
//           margin-bottom: 0.25rem;
//           background: linear-gradient(
//             90deg,
//             #134e4a,
//             #0d9488,
//             #14b8a6,
//             #0d9488,
//             #134e4a
//           );
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: card-title-flow 5s linear infinite;
//         }

//         .compact-card-desc {
//           font-size: 0.8125rem;
//           color: #5f7d7b;
//           line-height: 1.4;
//         }

//         /* ===== COMPACT LIST ===== */

//         .compact-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 0.5rem;
//           position: relative;
//           z-index: 1;
//         }

//         .compact-list li {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-size: 0.8125rem;
//           color: #4b6462;
//           transition: transform 0.2s ease;
//         }

//         .compact-card:hover .compact-list li {
//           transform: translateX(2px);
//         }

//         .compact-check {
//           flex-shrink: 0;
//           width: 1rem;
//           height: 1rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(
//             135deg,
//             rgba(20, 184, 166, 0.15),
//             rgba(6, 182, 212, 0.15)
//           );
//           border-radius: 50%;
//           color: #0d9488;
//           font-size: 0.625rem;
//           font-weight: 700;
//           animation: check-bounce 2s ease-in-out infinite;
//         }

//         /* ===== COMPACT BADGES ===== */

//         .compact-badges {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//           position: relative;
//           z-index: 1;
//         }

//         .mini-badge {
//           display: inline-flex;
//           align-items: center;
//           padding: 0.375rem 0.75rem;
//           background: linear-gradient(
//             135deg,
//             rgba(240, 253, 250, 0.9),
//             rgba(204, 251, 241, 0.9)
//           );
//           border: 1px solid rgba(20, 184, 166, 0.2);
//           border-radius: 0.5rem;
//           font-size: 0.75rem;
//           font-weight: 600;
//           color: #0f766e;
//           transition: all 0.3s ease;
//           animation: badge-pulse 3s ease-in-out infinite;
//         }

//         .mini-badge:nth-child(1) {
//           animation-delay: 0s;
//         }
//         .mini-badge:nth-child(2) {
//           animation-delay: 0.3s;
//         }
//         .mini-badge:nth-child(3) {
//           animation-delay: 0.6s;
//         }
//         .mini-badge:nth-child(4) {
//           animation-delay: 0.9s;
//         }

//         .mini-badge:hover {
//           transform: scale(1.05);
//           background: linear-gradient(
//             135deg,
//             rgba(204, 251, 241, 1),
//             rgba(153, 246, 228, 1)
//           );
//           border-color: rgba(20, 184, 166, 0.4);
//           box-shadow: 0 2px 8px rgba(20, 184, 166, 0.2);
//         }

//         /* ===== COMPACT STATS ===== */

//         .compact-stats {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//           gap: 1rem;
//           align-items: center;
//           padding: 1.5rem;
//           background: rgba(255, 255, 255, 0.9);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.5);
//           border-radius: 1rem;
//           box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.1);
//         }

//         .stat-item {
//           text-align: center;
//         }

//         .stat-value {
//           font-size: 1.5rem;
//           font-weight: 800;
//           margin-bottom: 0.125rem;
//           background: linear-gradient(
//             90deg,
//             #14b8a6,
//             #0d9488,
//             #06b6d4,
//             #0ea5e9,
//             #06b6d4,
//             #0d9488,
//             #14b8a6
//           );
//           background-size: 300% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: stat-flow 5s linear infinite;
//         }

//         .stat-item:nth-child(2) .stat-value {
//           animation-delay: 0.5s;
//         }
//         .stat-item:nth-child(4) .stat-value {
//           animation-delay: 1s;
//         }
//         .stat-item:nth-child(6) .stat-value {
//           animation-delay: 1.5s;
//         }

//         .stat-label {
//           font-size: 0.75rem;
//           color: #5f7d7b;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .stat-divider {
//           width: 1px;
//           height: 2.5rem;
//           background: linear-gradient(
//             180deg,
//             transparent,
//             rgba(20, 184, 166, 0.3),
//             transparent
//           );
//           justify-self: center;
//           animation: divider-pulse 2s ease-in-out infinite;
//         }

//         /* ===== ANIMATIONS ===== */

//         @keyframes badge-float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-3px);
//           }
//         }

//         @keyframes title-pulse {
//           0%,
//           100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.95;
//           }
//         }

//         @keyframes title-shimmer {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 200% 50%;
//           }
//         }

//         @keyframes link-glow {
//           0%,
//           100% {
//             text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
//           }
//           50% {
//             text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
//           }
//         }

//         @keyframes icon-pulse {
//           0%,
//           100% {
//             box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
//             transform: scale(1);
//           }
//           50% {
//             box-shadow: 0 4px 20px rgba(20, 184, 166, 0.5);
//             transform: scale(1.05);
//           }
//         }

//         @keyframes card-title-flow {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 200% 50%;
//           }
//         }

//         @keyframes check-bounce {
//           0%,
//           100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.1);
//           }
//         }

//         @keyframes badge-pulse {
//           0%,
//           100% {
//             background: linear-gradient(
//               135deg,
//               rgba(240, 253, 250, 0.9),
//               rgba(204, 251, 241, 0.9)
//             );
//           }
//           50% {
//             background: linear-gradient(
//               135deg,
//               rgba(204, 251, 241, 1),
//               rgba(153, 246, 228, 0.9)
//             );
//           }
//         }

//         @keyframes stat-flow {
//           0% {
//             background-position: 0% 50%;
//           }
//           100% {
//             background-position: 300% 50%;
//           }
//         }

//         @keyframes divider-pulse {
//           0%,
//           100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }

//         /* ===== RESPONSIVE ===== */

//         @media (max-width: 768px) {
//           .compact-security-section {
//             padding: 2rem 1rem;
//           }

//           .compact-grid {
//             grid-template-columns: 1fr;
//           }

//           .compact-list {
//             grid-template-columns: 1fr;
//           }

//           .compact-stats {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 1rem;
//           }

//           .stat-divider {
//             display: none;
//           }

//           .compact-card {
//             padding: 1rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .compact-title {
//             font-size: 1.5rem;
//           }

//           .compact-stats {
//             grid-template-columns: 1fr;
//           }

//           .compact-badges {
//             justify-content: center;
//           }
//         }

//         /* Accessibility */
//         @media (prefers-reduced-motion: reduce) {
//           *,
//           *::before,
//           *::after {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default JaimaxLanding;

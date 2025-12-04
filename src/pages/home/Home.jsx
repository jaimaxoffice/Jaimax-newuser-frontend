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
{/* <Helmet>
  <title>Jaimax Coin | India’s Emerging Digital Finance & Crypto Ecosystem</title>
  <meta
    name="description"
    content="Jaimax Coin powers a growing digital finance ecosystem for India with secure crypto wallets, JMC-24 blockchain, staking and long-term value creation."
  />
  <link rel="canonical" href="https://www.jaimax.com/" />

   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}>
        </script>
</Helmet> */}

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
                <span className="block text-[#b8cc26]">Best Pre-Sale</span>
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
                  <a href="https://www.jaimax.com"> pre-sale crypto coin</a>
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
//   Star,
//   CheckCircle,
//   Mail,
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
//   CreditCard,
//   HelpCircle,
// } from "lucide-react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import icon from "../../assets/jcoin.webp";
// import homeBgDesktop from "../../assets/Images/HomeDesktop.webp";
// import homeBgMobile from "../../assets/Images/HomeMobile.webp";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { Observer } from "gsap/Observer";
// import { SplitText } from "gsap/SplitText";
// import { Flip } from "gsap/Flip";
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

// const IMG_PADDING = 12;
// const phase = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//     icon: <Rocket className="w-8 h-8" />,
//     color: "#10b981",
//     progress: 45,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061-0.0061 USD)",
//     button: "Coming Soon",
//     icon: <TrendingUp className="w-8 h-8" />,
//     color: "#3b82f6",
//     progress: 0,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 Paisa (0.0071-0.018 USD)",
//     button: "Coming Soon",
//     icon: <Zap className="w-8 h-8" />,
//     color: "#8b5cf6",
//     progress: 0,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.019-0.036 USD)",
//     button: "Coming Soon",
//     icon: <Coins className="w-8 h-8" />,
//     color: "#f59e0b",
//     progress: 0,
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037-0.049 USD)",
//     button: "Coming Soon",
//     icon: <DollarSign className="w-8 h-8" />,
//     color: "#ef4444",
//     progress: 0,
//   },
// ];

// const phases = [
//   {
//     phaseNo: "Phase 01",
//     status: "Live",
//     tokens: "10,000,000 TOKENS",
//     price: "$0.001 - $0.005",
//     progress: 75,
//     button: "Buy Now",
//     icon: "🚀",
//     color: "#14b8a6",
//   },
//   {
//     phaseNo: "Phase 02",
//     status: "Upcoming",
//     tokens: "15,000,000 TOKENS",
//     price: "$0.005 - $0.010",
//     progress: 0,
//     button: "Coming Soon",
//     icon: "⚡",
//     color: "#0d9488",
//   },
//   {
//     phaseNo: "Phase 03",
//     status: "Upcoming",
//     tokens: "20,000,000 TOKENS",
//     price: "$0.010 - $0.020",
//     progress: 0,
//     button: "Coming Soon",
//     icon: "💎",
//     color: "#0f766e",
//   },
//   {
//     phaseNo: "Phase 04",
//     status: "Upcoming",
//     tokens: "25,000,000 TOKENS",
//     price: "$0.020 - $0.050",
//     progress: 0,
//     button: "Coming Soon",
//     icon: "🌟",
//     color: "#115e59",
//   },
//   {
//     phaseNo: "Phase 05",
//     status: "Upcoming",
//     tokens: "25,000,000 TOKENS",
//     price: "$0.020 - $0.050",
//     progress: 0,
//     button: "Coming Soon",
//     icon: "🌟",
//     color: "#115e59",
//   },
// ];
// const PhasesWheelSection = () => {
//   const pinContainerRef = useRef(null);
//   const contentContainerRef = useRef(null);
//   const wheelSectionRef = useRef(null);
//   const smallCircleContainerRef = useRef(null);
//   const phaseContentRefs = useRef([]);
//   const [activePhase, setActivePhase] = useState(0);
//   const [debugInfo, setDebugInfo] = useState({
//     progress: 0,
//     rotation: 0,
//     phase: 0,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (
//           trigger.vars.id &&
//           trigger.vars.id.toString().includes("phases-wheel")
//         ) {
//           trigger.kill();
//         }
//       });

//       if (
//         !smallCircleContainerRef.current ||
//         !contentContainerRef.current ||
//         !wheelSectionRef.current
//       ) {
//         console.error("Required refs not found");
//         return;
//       }

//       const wheelHeight = wheelSectionRef.current.offsetHeight;

//       const ctx = gsap.context(() => {
//         ScrollTrigger.create({
//           trigger: contentContainerRef.current,
//           endTrigger: pinContainerRef.current,
//           start: `top+=${wheelHeight / 2}px center`,
//           end: "bottom bottom",
//           pin: contentContainerRef.current,
//           id: "phases-wheel-pin",
//           markers: false,
//         });

//         gsap.to(smallCircleContainerRef.current, {
//           rotation: 360,
//           ease: "none",
//           scrollTrigger: {
//             trigger: contentContainerRef.current,
//             endTrigger: pinContainerRef.current,
//             start: `top+=${wheelHeight / 2}px center`,
//             end: "bottom bottom",
//             scrub: 1,
//             snap: {
//               snapTo: 1 / phases.length,
//               duration: { min: 0.2, max: 0.4 },
//               ease: "power2.inOut",
//             },
//             onUpdate: (self) => {
//               const currentPhase = Math.floor(self.progress * phases.length);
//               const clampedPhase = Math.min(currentPhase, phases.length - 1);
//               setActivePhase(clampedPhase);

//               const currentRotation = gsap.getProperty(
//                 smallCircleContainerRef.current,
//                 "rotation"
//               );
//               setDebugInfo({
//                 progress: (self.progress * 100).toFixed(1),
//                 rotation: Math.round(currentRotation),
//                 phase: clampedPhase + 1,
//               });
//             },
//             id: "phases-wheel-rotation",
//           },
//         });
//       });

//       ScrollTrigger.refresh();

//       return () => {
//         ctx.revert();
//       };
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (
//           trigger.vars.id &&
//           trigger.vars.id.toString().includes("phases-wheel")
//         ) {
//           trigger.kill();
//         }
//       });
//     };
//   }, []);

//   return (
//     <section className="relative bg-teal-50 overflow-hidden">
//       {/* Background decorations - Neumorphic style */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)",
//           }}
//         />
//         <div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%)",
//           }}
//         />
//       </div>

//       {/* Subtle grid pattern */}
//       <div
//         className="absolute inset-0 opacity-[0.03] pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(13, 148, 136, 0.5) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(13, 148, 136, 0.5) 1px, transparent 1px)
//           `,
//           backgroundSize: "50px 50px",
//         }}
//       />

//       {/* Header - Neumorphic Style */}
//       <div className="relative z-10 text-center py-20 px-4">
//         <div
//           className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-50 mb-6"
//           style={{
//             boxShadow: "8px 8px 16px #c5dfe1, -8px -8px 16px #ffffff",
//           }}
//         >
//           <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
//           <span className="text-teal-700 font-semibold text-sm sm:text-base">
//             Token Distribution
//           </span>
//         </div>
//         <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-teal-800">
//           Investment Phases
//         </h2>
//         <p className="text-lg sm:text-xl text-teal-600 max-w-2xl mx-auto">
//           Strategic token release across {phases.length} phases for optimal
//           growth
//         </p>
//       </div>

//       {/* Pin Container */}
//       <div
//         ref={pinContainerRef}
//         className="relative"
//         style={{ height: "400vh" }}
//       >
//         <div ref={contentContainerRef} className="w-full">
//           <div
//             ref={wheelSectionRef}
//             className="min-h-screen flex items-center justify-center px-4"
//           >
//             <div className="w-full max-w-7xl mx-auto">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//                 {/* Wheel Column - Neumorphic Style */}
//                 <div className="flex justify-center items-center relative order-2 lg:order-1">
//                   <div className="relative w-full max-w-[400px] aspect-square">
//                     {/* Neumorphic background circle */}
//                     <div
//                       className="absolute inset-8 rounded-full bg-teal-50"
//                       style={{
//                         boxShadow:
//                           "inset 15px 15px 30px #c5dfe1, inset -15px -15px 30px #ffffff",
//                       }}
//                     />

//                     {/* Big Circle SVG - Neumorphic */}
//                     <svg
//                       className="w-full h-full"
//                       viewBox="-10 -10 622 621"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       style={{
//                         filter: "drop-shadow(8px 8px 16px #c5dfe1)",
//                       }}
//                     >
//                       <defs>
//                         <linearGradient
//                           id="bigCircleGradient"
//                           x1="0%"
//                           y1="0%"
//                           x2="100%"
//                           y2="100%"
//                         >
//                           <stop offset="0%" stopColor="#e0f2f1" />
//                           <stop offset="50%" stopColor="#b2dfdb" />
//                           <stop offset="100%" stopColor="#80cbc4" />
//                         </linearGradient>
//                         <filter
//                           id="neumorphicShadow"
//                           x="-50%"
//                           y="-50%"
//                           width="200%"
//                           height="200%"
//                         >
//                           <feDropShadow
//                             dx="5"
//                             dy="5"
//                             stdDeviation="10"
//                             floodColor="#c5dfe1"
//                             floodOpacity="0.8"
//                           />
//                           <feDropShadow
//                             dx="-5"
//                             dy="-5"
//                             stdDeviation="10"
//                             floodColor="#ffffff"
//                             floodOpacity="0.9"
//                           />
//                         </filter>
//                       </defs>
//                       <path
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                         d="M0 300.5C0 134.5 134.8 0 301 0s301 134.5 301 300.5S467.2 601 301 601A300.7 300.7 0 0 1 0 300.5Zm55.1 0C55.1 436.1 165.2 546 301 546a245.7 245.7 0 0 0 245.9-245.5c0-135.6-110.1-245.5-246-245.5A245.7 245.7 0 0 0 55.2 300.5Z"
//                         fill="url(#bigCircleGradient)"
//                         filter="url(#neumorphicShadow)"
//                       />
//                     </svg>

//                     {/* Small Circle Container (Rotates) - Neumorphic */}
//                     <div
//                       ref={smallCircleContainerRef}
//                       className="absolute inset-0 w-full h-full"
//                       style={{ transformOrigin: "center center" }}
//                     >
//                       <svg
//                         className="w-full h-full"
//                         viewBox="-10 -10 622 621"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <defs>
//                           <filter
//                             id="smallCircleNeumorphic"
//                             x="-100%"
//                             y="-100%"
//                             width="300%"
//                             height="300%"
//                           >
//                             <feDropShadow
//                               dx="3"
//                               dy="3"
//                               stdDeviation="4"
//                               floodColor="#0d9488"
//                               floodOpacity="0.4"
//                             />
//                           </filter>
//                         </defs>
//                         {/* Outer circle with phase color */}
//                         <circle
//                           cx="574.5"
//                           cy="301.5"
//                           r="30"
//                           fill={phases[activePhase].color}
//                           className="transition-all duration-500"
//                           filter="url(#smallCircleNeumorphic)"
//                         />
//                         {/* Inner white circle */}
//                         <circle
//                           cx="574.5"
//                           cy="301.5"
//                           r="20"
//                           fill="#f0fdfa"
//                           className="transition-all duration-300"
//                         />
//                         {/* Phase number */}
//                         <text
//                           x="574.5"
//                           y="308"
//                           textAnchor="middle"
//                           fill={phases[activePhase].color}
//                           fontSize="18"
//                           fontWeight="900"
//                           className="transition-all duration-500"
//                         >
//                           {activePhase + 1}
//                         </text>
//                       </svg>
//                     </div>

//                     {/* Center phase indicator - Neumorphic */}
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <div
//                         className="text-center bg-teal-50 rounded-full w-32 h-32 flex flex-col items-center justify-center"
//                         style={{
//                           boxShadow:
//                             "8px 8px 16px #c5dfe1, -8px -8px 16px #ffffff, inset 2px 2px 4px #ffffff, inset -2px -2px 4px #c5dfe1",
//                         }}
//                       >
//                         <div
//                           className="text-5xl font-black transition-all duration-500"
//                           style={{
//                             color: phases[activePhase].color,
//                           }}
//                         >
//                           {activePhase + 1}
//                         </div>
//                         <div className="text-xs text-teal-500 font-semibold">
//                           of {phases.length}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Phase dots indicator - Neumorphic */}
//                     <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
//                       {phases.map((phase, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setActivePhase(index)}
//                           className={`rounded-full transition-all duration-500 ${
//                             index === activePhase ? "w-10 h-3" : "w-3 h-3"
//                           }`}
//                           style={{
//                             backgroundColor:
//                               index === activePhase
//                                 ? phases[activePhase].color
//                                 : "#b2dfdb",
//                             boxShadow:
//                               index === activePhase
//                                 ? `3px 3px 6px #c5dfe1, -3px -3px 6px #ffffff, 0 0 10px ${phases[activePhase].color}40`
//                                 : "2px 2px 4px #c5dfe1, -2px -2px 4px #ffffff",
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content Column - Full Neumorphic Style */}
//                 <div className="relative min-h-[500px] flex items-center justify-center order-1 lg:order-2">
//                   {phases.map((phase, index) => (
//                     <div
//                       key={index}
//                       className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
//                         index === activePhase
//                           ? "opacity-100 scale-100 z-10"
//                           : "opacity-0 scale-95 z-0"
//                       }`}
//                     >
//                       <div className="w-full max-w-md px-4">
//                         <div
//                           className="bg-teal-50 rounded-3xl p-8 transition-all duration-500"
//                           style={{
//                             boxShadow:
//                               index === activePhase
//                                 ? "20px 20px 60px #b8d4d6, -20px -20px 60px #ffffff"
//                                 : "10px 10px 30px #c5dfe1, -10px -10px 30px #ffffff",
//                           }}
//                         >
//                           {/* Header */}
//                           <div className="flex items-center justify-between mb-6">
//                             <span
//                               className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
//                                 phase.status === "Live"
//                                   ? "bg-teal-500 text-white"
//                                   : "bg-teal-100 text-teal-500"
//                               }`}
//                               style={{
//                                 boxShadow:
//                                   phase.status === "Live"
//                                     ? "inset 2px 2px 4px rgba(0,0,0,0.1), 0 4px 12px rgba(20, 184, 166, 0.3)"
//                                     : "3px 3px 6px #c5dfe1, -3px -3px 6px #ffffff",
//                               }}
//                             >
//                               {phase.status === "Live" && (
//                                 <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
//                               )}
//                               {phase.status}
//                             </span>
                            
//                           </div>

//                           {/* Phase Number */}
//                           <h3
//                             className="text-5xl font-black mb-2 transition-all duration-500"
//                             style={{ color: phase.color }}
//                           >
//                             {phase.phaseNo}
//                           </h3>

//                           {/* Separator - Neumorphic */}
//                           <div className="flex gap-2 mb-6">
//                             <div
//                               className="h-1.5 w-16 rounded-full transition-all duration-500"
//                               style={{ backgroundColor: phase.color }}
//                             />
//                             <div className="h-1.5 w-8 bg-teal-200 rounded-full" />
//                             <div className="h-1.5 w-4 bg-teal-100 rounded-full" />
//                           </div>

//                           {/* Details - Neumorphic inset */}
//                           <div className="space-y-4 mb-6">
//                             <div
//                               className="bg-teal-50 rounded-xl p-4 transition-all duration-300"
//                               style={{
//                                 boxShadow:
//                                   "inset 4px 4px 8px #c5dfe1, inset -4px -4px 8px #ffffff",
//                               }}
//                             >
//                               <p className="text-xs text-teal-500 uppercase tracking-wider mb-1 font-semibold">
//                                 Total Supply
//                               </p>
//                               <p className="text-xl font-bold text-teal-800">
//                                 {phase.tokens}
//                               </p>
//                             </div>

//                             <div
//                               className="bg-teal-50 rounded-xl p-4 transition-all duration-300"
//                               style={{
//                                 boxShadow:
//                                   "inset 4px 4px 8px #c5dfe1, inset -4px -4px 8px #ffffff",
//                               }}
//                             >
//                               <p className="text-xs text-teal-500 uppercase tracking-wider mb-1 font-semibold">
//                                 Price Range
//                               </p>
//                               <p className="text-lg font-bold text-teal-700">
//                                 {phase.price}
//                               </p>
//                             </div>
//                           </div>

//                           {/* Progress - Neumorphic */}
//                           <div className="mb-6">
//                             <div className="flex justify-between items-center mb-3">
//                               <span className="text-xs text-teal-600 uppercase tracking-wider font-semibold">
//                                 Phase Progress
//                               </span>
//                               <span
//                                 className="text-sm font-bold px-3 py-1 rounded-full"
//                                 style={{
//                                   color: phase.color,
//                                   backgroundColor: `${phase.color}15`,
//                                 }}
//                               >
//                                 {phase.progress}%
//                               </span>
//                             </div>
//                             <div
//                               className="w-full bg-teal-50 rounded-full h-4 overflow-hidden"
//                               style={{
//                                 boxShadow:
//                                   "inset 3px 3px 6px #c5dfe1, inset -3px -3px 6px #ffffff",
//                               }}
//                             >
//                               <div
//                                 className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
//                                 style={{
//                                   width: `${phase.progress}%`,
//                                   background: `linear-gradient(90deg, ${phase.color}, ${phase.color}cc)`,
//                                   boxShadow: `0 0 10px ${phase.color}60`,
//                                 }}
//                               >
//                                 {/* Animated shine effect */}
//                                 <div
//                                   className="absolute inset-0 opacity-30"
//                                   style={{
//                                     background:
//                                       "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
//                                     animation:
//                                       "shimmer 2s infinite linear",
//                                   }}
//                                 />
//                               </div>
//                             </div>
//                           </div>

//                           {/* Action Button - Neumorphic */}
//                           <button
//                             className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
//                               phase.status === "Live"
//                                 ? "text-white hover:scale-[1.02] active:scale-[0.98]"
//                                 : "text-teal-300 cursor-not-allowed"
//                             }`}
//                             style={{
//                               backgroundColor:
//                                 phase.status === "Live"
//                                   ? phase.color
//                                   : "transparent",
//                               boxShadow:
//                                 phase.status === "Live"
//                                   ? `8px 8px 16px #c5dfe1, -8px -8px 16px #ffffff, 0 4px 15px ${phase.color}40`
//                                   : "inset 4px 4px 8px #c5dfe1, inset -4px -4px 8px #ffffff",
//                             }}
//                             disabled={phase.status !== "Live"}
//                           >
//                             {phase.button}
//                           </button>

//                           {/* Additional info for live phase */}
//                           {phase.status === "Live" && (
//                             <div
//                               className="mt-4 p-3 rounded-xl bg-teal-50 flex items-center justify-center gap-2"
//                               style={{
//                                 boxShadow:
//                                   "inset 2px 2px 4px #c5dfe1, inset -2px -2px 4px #ffffff",
//                               }}
//                             >
//                               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                               <span className="text-xs text-teal-600 font-medium">
//                                 Sale is currently active
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add shimmer animation keyframes */}
//       <style jsx>{`
//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(100%);
//           }
//         }
//       `}</style>
//     </section>
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

//   return (
//     <motion.div
//       style={{
//         backgroundImage: `url(${imgUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: `calc(100vh - ${IMG_PADDING * 2}px)`,
//         top: IMG_PADDING,
//         scale,
//       }}
//       ref={targetRef}
//       className="sticky z-0 overflow-hidden rounded-3xl"
//     >
//       <motion.div
//         className="absolute inset-0 bg-[#085056]/80"
//         style={{
//           opacity,
//         }}
//       />
//     </motion.div>
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

//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
//     >
//       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-white">
//         {subheading}
//       </p>
//       <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
//     </motion.div>
//   );
// };
// const SecurityContent = () => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-7 pt-1 md:grid-cols-12 bg-[#085056]">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
//       Security First Approach
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-gray-300 md:text-2xl">
//         Your crypto assets are protected with military-grade encryption and
//         multi-layer security protocols.
//       </p>
//       <p className="mb-8 text-xl text-gray-300 md:text-2xl">
//         Real-time monitoring, two-factor authentication, and biometric security
//         combine to create an impenetrable fortress.
//       </p>
//       <button className="w-full rounded-full bg-gradient-to-r from-[#085056] to-[#0a6b73] px-9 py-4 text-xl text-white transition-all hover:shadow-lg hover:shadow-[#085056]/50 hover:scale-105 md:w-fit">
//         Explore Security Features <ArrowRight className="inline ml-2" />
//       </button>
//     </div>
//   </div>
// );
// const InnovationContent = () => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 bg-[#085056]">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
//       Built for the Future
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-gray-300 md:text-2xl">
//         We're building an entire ecosystem from DeFi integration to NFT
//         platforms.
//       </p>
//       <p className="mb-8 text-xl text-gray-300 md:text-2xl">
//         Our dedicated development team is constantly innovating to keep Jaimax
//         ahead of the curve.
//       </p>
//       <button className="w-full rounded-full bg-gradient-to-r from-[#085056] to-[#0a6b73] px-9 py-4 text-xl text-white transition-all hover:shadow-lg hover:shadow-[#085056]/50 hover:scale-105 md:w-fit">
//         View Roadmap <ArrowRight className="inline ml-2" />
//       </button>
//     </div>
//   </div>
// );
// const VelocityHero = () => {
//   const containerRef = useRef(null);
//   const text1Ref = useRef(null);
//   const text2Ref = useRef(null);
//   const text3Ref = useRef(null);
//   const text4Ref = useRef(null);
//   const videoRef = useRef(null);
//   const [videoLoaded, setVideoLoaded] = useState(false);

//   // Fetch data using RTK Query
//   const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

//   // Get live rounds (status = 1)
//   const liveRounds =
//     roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
//   const currentRound = liveRounds[0];

//   // Auto-refresh data every 30 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetch();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [refetch]);

//   const formatNumber = (num) => {
//     if (num >= 1000000000) {
//       return (num / 1000000000).toFixed(1) + "B";
//     }
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + "M";
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + "K";
//     }
//     return num?.toLocaleString() || "0";
//   };

//   // Get stats data
//   const livePrice = currentRound?.atPriceInr || "0.0000";
//   const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
//   const liveMembers = formatNumber(currentRound?.totalMembers || 24567);
//   const totalSupply = formatNumber(10000000000); // 10B

//   // GSAP Scroll Animations
//   useEffect(() => {
//     const initTimer = setTimeout(() => {
//       const ctx = gsap.context(() => {
//         if (
//           text1Ref.current &&
//           text2Ref.current &&
//           text3Ref.current &&
//           text4Ref.current
//         ) {
//           // Set initial positions
//           gsap.set(text1Ref.current, { x: "0%" });
//           gsap.set(text2Ref.current, { x: "-10%" });
//           gsap.set(text3Ref.current, { x: "0%" });
//           gsap.set(text4Ref.current, { x: "-15%" });

//           // Animate text 1 - move left
//           gsap.to(text1Ref.current, {
//             x: "-50%",
//             ease: "none",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 2,
//               invalidateOnRefresh: true,
//             },
//           });

//           // Animate text 2 - move right
//           gsap.to(text2Ref.current, {
//             x: "50%",
//             ease: "none",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 0.5,
//               invalidateOnRefresh: true,
//             },
//           });

//           // Animate text 3 - move left
//           gsap.to(text3Ref.current, {
//             x: "-45%",
//             ease: "none",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 1.5,
//               invalidateOnRefresh: true,
//             },
//           });

//           // Animate text 4 - move right
//           gsap.to(text4Ref.current, {
//             x: "55%",
//             ease: "none",
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 0.3,
//               invalidateOnRefresh: true,
//             },
//           });
//         }
//       }, containerRef);

//       return () => ctx.revert();
//     }, 100);

//     return () => clearTimeout(initTimer);
//   }, []);

//   // Handle video load
//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       video.addEventListener("loadeddata", () => setVideoLoaded(true));
//     }
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen md:min-h-[120vh] overflow-hidden"
//     >
//       {/* Background Video */}
//       <div className="absolute inset-0 w-full h-full">
//         <video
//           ref={videoRef}
//           className="absolute inset-0 w-full h-full object-cover"
//           autoPlay
//           loop
//           muted
//           playsInline
//           poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23085056' width='1920' height='1080'/%3E%3C/svg%3E"
//         >
//           <source
//             src="https://www.shutterstock.com/shutterstock/videos/3738718917/preview/stock-footage-futuristic-digital-globe-of-earth-with-glowing-data-points-network-connections-on-a-dark-background.webm"
//             type="video/webm"
//           />
//         </video>

//         {/* Dark overlay for better readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#085056]/80 via-[#085056]/70 to-[#085056]/90"></div>
//       </div>

//       {/* Grid overlay */}
//       <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
//         <div
//           className="h-full w-full"
//           style={{
//             backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
//             backgroundSize: "50px 50px",
//           }}
//         ></div>
//       </div>

//       {/* Gradient blobs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white rounded-full filter blur-[100px] md:blur-[150px] opacity-10"></div>
//         <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#0a6b73] rounded-full filter blur-[100px] md:blur-[150px] opacity-10"></div>
//       </div>

//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         <div className="h-full flex flex-col justify-between py-2 md:py-4">
//           {/* First scrolling text */}
//           <div className="relative flex-shrink-0">
//             <div className="overflow-hidden">
//               <div
//                 ref={text1Ref}
//                 className="flex whitespace-nowrap"
//                 style={{ willChange: "transform" }}
//               >
//                 {[...Array(20)].map((_, i) => (
//                   <div key={i} className="flex items-center">
//                     <span className="text-sm sm:text-lg md:text-2xl lg:text-5xl font-semibold text-white/10 mx-3 md:mx-6">
//                       Join India's trusted presale crypto coin • Invest early in
//                       Jaimax for secure, smart returns
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Second scrolling text */}

//           {/* Center content */}
//           <div className="relative z-20 flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 my-4 md:my-8">
//             <div className="text-center max-w-6xl mx-auto w-full">
//               {/* Live Badge */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-4 md:mb-6 shadow-lg"
//               >
//                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
//                 <span className="text-white font-bold text-xs md:text-sm lg:text-base uppercase tracking-wider">
//                   Live Pre-Sale • Phase {currentRound?.roundNo || 1}
//                 </span>
//                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
//               </motion.div>

//               {/* Main Heading */}
//               <motion.h2
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight px-2"
//               >
//                 <span className="block text-white drop-shadow-2xl">
//                   Persistence & Determination
//                 </span>
//               </motion.h2>

//               {/* Subtitle */}
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed font-light px-2"
//               >
//                 India's revolutionary cryptocurrency.{" "}
//                 <span className="text-white font-semibold">Persistence</span>{" "}
//                 and{" "}
//                 <span className="text-white font-semibold">determination</span>{" "}
//                 alone are omnipotent.
//               </motion.p>

//               {/* Stats Grid */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.8 }}
//                 className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 px-2"
//               >
//                 {/* Live Price */}
//                 <div className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg">
//                   <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
//                     {isLoading ? (
//                       <span className="animate-pulse">...</span>
//                     ) : (
//                       `₹${livePrice}`
//                     )}
//                   </div>
//                   <div className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider font-semibold">
//                     Live Price (INR)
//                   </div>
//                 </div>

//                 {/* Tokens Sold */}
//                 <div className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg">
//                   <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
//                     {isLoading ? (
//                       <span className="animate-pulse">...</span>
//                     ) : (
//                       soldTokens
//                     )}
//                   </div>
//                   <div className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider font-semibold">
//                     Tokens Sold
//                   </div>
//                   {/* Progress bar */}
//                   <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000"
//                       style={{
//                         width: `${Math.min(
//                           ((currentRound?.soldQty || 0) / 10000000000) * 100,
//                           100
//                         )}%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>

//                 {/* Active Investors */}
//                 <div className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg">
//                   <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
//                     {isLoading ? (
//                       <span className="animate-pulse">...</span>
//                     ) : (
//                       liveMembers
//                     )}
//                   </div>
//                   <div className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider font-semibold">
//                     Active Investors
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Additional Info */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 1 }}
//                 className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300 px-2"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-green-400"></div>
//                   <span>Total Supply: {totalSupply}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-blue-400"></div>
//                   <span>BSC Network</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-purple-400"></div>
//                   <span>Verified Contract</span>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Third scrolling text */}
//           <div className="relative flex-shrink-0">
//             <div className="overflow-hidden">
//               <div
//                 ref={text3Ref}
//                 className="flex whitespace-nowrap"
//                 style={{ willChange: "transform" }}
//               >
//                 {[...Array(20)].map((_, i) => (
//                   <div key={i} className="flex items-center">
//                     <span className="text-xs sm:text-base md:text-xl lg:text-3xl font-medium text-white/10 mx-3 md:mx-6">
//                       Join the Future of Digital Finance
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
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
// const Roadmap = () => {
//   const roadmapRef = useRef(null);
//   const roadmapTimelineRef = useRef(null);

//   const roadmapData = {
//     2024: {
//       title: "Growth & Expansion Phase",
//       status: "completed",
//       progress: 100,
//       phases: [
//         "• Concept development and team formation of the core Jaimax team.",
//         "• Official website launch introducing the Jaimax ecosystem.",
//         "• Publication of the detailed whitepaper outlining goals and tokenomics.",
//         "• Public ICO launch and community onboarding.",
//         "• Release of the Jaimax mobile application for early users.",
//       ],
//     },
//     2025: {
//       title: "Ecosystem Development Phase",
//       status: "active",
//       progress: 85,
//       phases: [
//         "• Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
//         "• Integration of DigiLocker KYC for secure user verification.",
//         "• Launch of coin swapping within the Jaimax ecosystem.",
//         "• Enable users to buy JMC through Binance exchange wallet connectivity.",
//       ],
//     },
//     2026: {
//       title: "Global Dominance Phase",
//       status: "upcoming",
//       progress: 0,
//       phases: [
//         "• Development of Jaimax's own blockchain infrastructure.",
//         "• Launch of DeFi features to enhance financial accessibility.",
//         "• Launch of the NFT Platform.",
//         "• Deployment of DApps across Education, Gaming, Tourism, and Finance.",
//         "• Launch of person-to-person (P2P) buying and selling functionality.",
//         "• Launch of Jaimax's own payment gateway for seamless transactions.",
//       ],
//     },
//     2027: {
//       title: "Global Presence",
//       status: "upcoming",
//       progress: 0,
//       phases: [
//         "• Launch of the Jaimax Social Hub to connect users, traders, and developers.",
//         "• Launch of the Jaimax Exchange for direct token trading.",
//         "• Trading live for all verified users.",
//         "• Expansion to global exchange listings.",
//       ],
//     },
//   };

//   const statusConfig = {
//     completed: {
//       icon: "✓",
//       badge: "Completed",
//       badgeColor: "bg-gradient-to-r from-teal-400 to-cyan-400",
//       textColor: "text-teal-300",
//       borderColor: "border-teal-400/30",
//       glowColor: "hover:shadow-teal-500/20",
//     },
//     active: {
//       icon: "⚡",
//       badge: "In Progress",
//       badgeColor: "bg-gradient-to-r from-cyan-400 to-teal-400",
//       textColor: "text-cyan-300",
//       borderColor: "border-cyan-400/30",
//       glowColor: "hover:shadow-cyan-500/20",
//     },
//     upcoming: {
//       icon: "🎯",
//       badge: "Upcoming",
//       badgeColor: "bg-slate-600",
//       textColor: "text-slate-300",
//       borderColor: "border-slate-500/30",
//       glowColor: "hover:shadow-slate-500/20",
//     },
//   };

//   useEffect(() => {
//     // Wait for DOM to be ready
//     const timer = setTimeout(() => {
//       if (!roadmapRef.current || !roadmapTimelineRef.current) {
//         console.error("Roadmap refs not found");
//         return;
//       }

//       const timeline = roadmapTimelineRef.current;
//       const section = roadmapRef.current;

//       // Calculate the scroll width
//       const scrollWidth = timeline.scrollWidth;
//       const viewportWidth = window.innerWidth;
//       const scrollDistance = scrollWidth - viewportWidth;

//       console.log("Roadmap Debug:", {
//         scrollWidth,
//         viewportWidth,
//         scrollDistance,
//         timelineElement: timeline,
//         sectionElement: section,
//       });

//       // Kill any existing roadmap triggers
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (trigger.vars.id && trigger.vars.id.toString().includes("roadmap")) {
//           trigger.kill();
//         }
//       });

//       // Create the horizontal scroll animation
//       const ctx = gsap.context(() => {
//         const horizontalScroll = gsap.to(timeline, {
//           x: -scrollDistance,
//           ease: "none",
//           scrollTrigger: {
//             id: "roadmap-horizontal",
//             trigger: section,
//             start: "top top",
//             end: () => `+=${scrollDistance}`,
//             scrub: 1,
//             pin: true,
//             pinSpacing: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//             markers: false, // Set to true for debugging
//             onUpdate: (self) => {
//               console.log("Roadmap scroll progress:", self.progress.toFixed(2));
//             },
//           },
//         });

//         // Animate individual cards
//         const cards = timeline.querySelectorAll(".roadmap-card");
//         cards.forEach((card, index) => {
//           const phases = card.querySelectorAll(".phase-item");

//           gsap.fromTo(
//             card,
//             {
//               scale: 0.85,
//               opacity: 0.5,
//               filter: "blur(2px)",
//             },
//             {
//               scale: 1,
//               opacity: 1,
//               filter: "blur(0px)",
//               scrollTrigger: {
//                 id: `roadmap-card-${index}`,
//                 trigger: card,
//                 containerAnimation: horizontalScroll,
//                 start: "left 85%",
//                 end: "left 50%",
//                 scrub: 1,
//               },
//             }
//           );

//           gsap.fromTo(
//             phases,
//             { opacity: 0, x: -20, y: 10 },
//             {
//               opacity: 1,
//               x: 0,
//               y: 0,
//               stagger: 0.05,
//               scrollTrigger: {
//                 id: `roadmap-phases-${index}`,
//                 trigger: card,
//                 containerAnimation: horizontalScroll,
//                 start: "left 70%",
//                 end: "left 40%",
//                 scrub: 1,
//               },
//             }
//           );
//         });
//       }, section);

//       ScrollTrigger.refresh();

//       return () => {
//         ctx.revert();
//       };
//     }, 500); // Increased delay to ensure DOM is ready

//     // Handle resize
//     const handleResize = () => {
//       ScrollTrigger.refresh();
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", handleResize);
//       // Clean up roadmap triggers
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (trigger.vars.id && trigger.vars.id.toString().includes("roadmap")) {
//           trigger.kill();
//         }
//       });
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
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
        
//         .shimmer-effect {
//           animation: shimmer 2s infinite;
//         }
//       `}</style>

//       <section
//         ref={roadmapRef}
//         className="relative overflow-hidden"
//         style={{
//           background:
//             "radial-gradient(ellipse at center, #085056 0%, #064248 50%, #042a2e 100%)",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div
//             className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
//             style={{ backgroundColor: "rgba(20, 184, 166, 0.1)" }}
//           />
//           <div
//             className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
//             style={{
//               backgroundColor: "rgba(6, 182, 212, 0.1)",
//               animationDelay: "1000ms",
//             }}
//           />
//         </div>

//         {/* Header */}
//         <div
//           className="absolute top-0 left-0 right-0 z-20 py-6 px-6"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(8, 80, 86, 0.95) 0%, transparent 100%)",
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
//             Roadmap
//           </h2>
//           <p
//             className="text-center mt-2 text-sm"
//             style={{ color: "rgba(153, 246, 228, 0.6)" }}
//           >
//             Our journey to revolutionize the future
//           </p>
//         </div>

//         {/* Timeline Container - IMPORTANT: This needs proper width */}
//         <div
//           ref={roadmapTimelineRef}
//           className="flex items-center h-screen pt-24 pb-16 px-8 gap-8"
//           style={{
//             width: "max-content", // This is crucial for horizontal scroll
//             minWidth: "100vw",
//           }}
//         >
//           {Object.entries(roadmapData).map(([year, data], index) => {
//             const config = statusConfig[data.status];
//             const isCompleted = data.status === "completed";
//             const isActive = data.status === "active";
//             const totalCards = Object.keys(roadmapData).length;

//             return (
//               <div
//                 key={year}
//                 className="roadmap-card flex-shrink-0 w-[320px] sm:w-[360px] relative"
//               >
//                 {/* Connector Line */}
//                 {index < totalCards - 1 && (
//                   <div className="absolute top-1/2 -right-8 w-8 h-0.5 -translate-y-1/2 z-0">
//                     <div
//                       className="w-full h-full"
//                       style={{
//                         background:
//                           "linear-gradient(to right, rgba(20, 184, 166, 0.6) 0%, rgba(6, 182, 212, 0.4) 50%, transparent 100%)",
//                       }}
//                     />
//                     <div
//                       className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
//                       style={{ backgroundColor: "rgba(20, 184, 166, 0.6)" }}
//                     />
//                   </div>
//                 )}

//                 {/* Card */}
//                 <div
//                   className={`
//                     relative h-[460px] flex flex-col transition-all duration-500 group
//                     backdrop-blur-xl rounded-3xl p-5 sm:p-6
//                     border
//                     ${
//                       isCompleted
//                         ? "border-teal-400/30"
//                         : isActive
//                         ? "border-cyan-400/30"
//                         : "border-slate-500/30"
//                     }
//                   `}
//                   style={{
//                     background: isCompleted
//                       ? "linear-gradient(to bottom right, rgba(20, 184, 166, 0.15) 0%, rgba(6, 78, 59, 0.2) 50%, rgba(6, 182, 212, 0.15) 100%)"
//                       : isActive
//                       ? "linear-gradient(to bottom right, rgba(6, 182, 212, 0.2) 0%, rgba(20, 184, 166, 0.15) 50%, rgba(6, 78, 59, 0.2) 100%)"
//                       : "linear-gradient(to bottom right, rgba(51, 65, 85, 0.3) 0%, rgba(71, 85, 105, 0.2) 50%, rgba(51, 65, 85, 0.3) 100%)",
//                     boxShadow: "0 0 40px rgba(20, 184, 166, 0.1)",
//                   }}
//                 >
//                   {/* Gradient Overlay */}
//                   <div
//                     className="absolute inset-0 rounded-3xl pointer-events-none"
//                     style={{
//                       background:
//                         "linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)",
//                     }}
//                   />

//                   {/* Glow Effect for Active */}
//                   {isActive && (
//                     <div
//                       className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
//                       style={{
//                         background:
//                           "linear-gradient(to right, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2), rgba(20, 184, 166, 0.2))",
//                       }}
//                     />
//                   )}

//                   {/* Header Section */}
//                   <div className="relative mb-5">
//                     {/* Icon Badge */}

//                     <div className="flex items-center justify-between pt-2">
//                       <h2
//                         className="text-4xl sm:text-5xl font-bold ml-14 sm:ml-16"
//                         style={{
//                           background:
//                             "linear-gradient(to right, #ffffff 0%, #ccfbf1 50%, #a5f3fc 100%)",
//                           WebkitBackgroundClip: "text",
//                           WebkitTextFillColor: "transparent",
//                           backgroundClip: "text",
//                         }}
//                       >
//                         {year}
//                       </h2>
//                       <span
//                         className={`
//                           px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider
//                           shadow-md
//                           ${config.badgeColor}
//                           ${isActive ? "animate-pulse" : ""}
//                         `}
//                         style={{
//                           color:
//                             isCompleted || isActive ? "#042f2e" : "#e2e8f0",
//                         }}
//                       >
//                         {config.badge}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Title */}
//                   <h3
//                     className={`
//                       text-lg sm:text-xl font-bold mb-4 line-clamp-2 
//                       group-hover:translate-x-1 transition-transform duration-300
//                       ${config.textColor}
//                     `}
//                   >
//                     {data.title}
//                   </h3>

//                   {/* Progress Bar */}
//                   <div className="mb-5">
//                     <div className="flex justify-between items-center mb-2">
//                       <span
//                         className="text-xs font-medium uppercase tracking-wide"
//                         style={{ color: "rgba(153, 246, 228, 0.6)" }}
//                       >
//                         Progress
//                       </span>
//                       <span className={`text-sm font-bold ${config.textColor}`}>
//                         {data.progress}%
//                       </span>
//                     </div>
//                     <div
//                       className="w-full rounded-full h-2.5 overflow-hidden backdrop-blur-sm"
//                       style={{
//                         backgroundColor: "rgba(0, 0, 0, 0.3)",
//                         border: "1px solid rgba(255, 255, 255, 0.1)",
//                       }}
//                     >
//                       <div
//                         className={`h-full rounded-full transition-all duration-1000 relative overflow-hidden ${config.badgeColor}`}
//                         style={{ width: `${data.progress}%` }}
//                       >
//                         <div
//                           className="absolute inset-0 shimmer-effect"
//                           style={{
//                             background:
//                               "linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Phases List */}
//                   <div className="space-y-2.5 overflow-y-auto flex-1 pr-2 custom-scrollbar">
//                     {data.phases.map((phase, phaseIndex) => (
//                       <div
//                         key={phaseIndex}
//                         className="phase-item flex items-start gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white/5"
//                       >
//                         <span
//                           className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ring-2 ring-offset-1 ${config.badgeColor}`}
//                           style={{
//                             boxShadow:
//                               isCompleted || isActive
//                                 ? "0 0 8px rgba(20, 184, 166, 0.5)"
//                                 : "none",
//                             ringColor: isCompleted
//                               ? "rgba(20, 184, 166, 0.3)"
//                               : isActive
//                               ? "rgba(6, 182, 212, 0.3)"
//                               : "rgba(100, 116, 139, 0.3)",
//                             ringOffsetColor: "transparent",
//                           }}
//                         />
//                         <span className="text-slate-300 text-sm leading-relaxed hover:text-white transition-colors duration-300">
//                           {phase}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Footer */}
//                   <div
//                     className="mt-4 pt-4 flex items-center justify-between"
//                     style={{ borderTop: "1px solid rgba(20, 184, 166, 0.2)" }}
//                   >
//                     <span
//                       className="text-[10px] uppercase tracking-widest font-medium"
//                       style={{ color: "rgba(20, 184, 166, 0.5)" }}
//                     >
//                       Phase {index + 1} of {totalCards}
//                     </span>
//                     {index < totalCards - 1 && (
//                       <div
//                         className="flex items-center gap-1"
//                         style={{ color: "rgba(20, 184, 166, 0.7)" }}
//                       >
//                         <span className="text-xs">Next</span>
//                         <span className="animate-bounce">→</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Corner Accent */}
//                   <div
//                     className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-20"
//                     style={{
//                       background:
//                         isCompleted || isActive
//                           ? "linear-gradient(to top left, rgba(20, 184, 166, 0.4) 0%, transparent 100%)"
//                           : "linear-gradient(to top left, rgba(100, 116, 139, 0.2) 0%, transparent 100%)",
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           })}

//           {/* End Card */}
//           <div className="flex-shrink-0 w-72 sm:w-80 h-[460px] flex items-center justify-center">
//             <div className="text-center p-6 relative">
//               <div
//                 className="absolute inset-0 rounded-3xl blur-2xl"
//                 style={{
//                   background:
//                     "linear-gradient(to right, rgba(20, 184, 166, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(20, 184, 166, 0.1) 100%)",
//                 }}
//               />
//               <div className="relative">
//                 <img src={icon} alt="" />
//                 <h3
//                   className="text-2xl sm:text-3xl font-bold mb-3"
//                   style={{
//                     background:
//                       "linear-gradient(to right, #99f6e4 0%, #ffffff 50%, #a5f3fc 100%)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     backgroundClip: "text",
//                   }}
//                 >
//                   The Journey
//                   <br />
//                   Continues
//                 </h3>
//                 <p
//                   className="text-sm"
//                   style={{ color: "rgba(153, 246, 228, 0.6)" }}
//                 >
//                   Stay tuned for more exciting updates
//                 </p>
//                 <div className="mt-4 flex justify-center gap-2">
//                   <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
//                   <span
//                     className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
//                     style={{ animationDelay: "150ms" }}
//                   />
//                   <span
//                     className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"
//                     style={{ animationDelay: "300ms" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// const BentoGallery = () => {
//   const galleryWrapRef = useRef(null);
//   const galleryRef = useRef(null);
//   const [isFinal, setIsFinal] = useState(false);

//   const images = [
//     "https://i.pinimg.com/736x/54/07/79/5407796d4c71f0e2af99702a30fea41f.jpg",
//     "https://i.pinimg.com/1200x/b2/57/fd/b257fd44c315090e0c743427863f55f8.jpg",
//     "https://i.pinimg.com/736x/e8/f0/73/e8f07376379f694e5fed8f3e66cefe74.jpg",
//     "https://i.pinimg.com/1200x/68/f3/83/68f3838dd7423a0edaf8cd78cbb99532.jpg",
//     "https://i.pinimg.com/736x/f3/d7/63/f3d763d085b7a81c8d4d82b71f27c7fa.jpg",
//     "https://i.pinimg.com/1200x/92/a9/88/92a988838276b4cfaaae225aff3b9ede.jpg",
//     "https://i.pinimg.com/736x/cf/3b/dc/cf3bdcd596bb6aadd00a71799c03195b.jpg",
//     "https://i.pinimg.com/736x/c6/91/39/c69139966d1f2671ddef79ff476fc10f.jpg",
//     "https://i.pinimg.com/736x/51/b7/ba/51b7bac48af430afbbc955e7279e2b35.jpg",
//   ];

//   // Grid area positions for each gallery item
//   const gridAreas = [
//     "1 / 1 / 3 / 2", // item 1
//     "1 / 2 / 2 / 3", // item 2
//     "2 / 2 / 4 / 3", // item 3
//     "1 / 3 / 3 / 4", // item 4
//     "3 / 1 / 4 / 2", // item 5
//     "3 / 3 / 5 / 4", // item 6
//     "4 / 1 / 5 / 2", // item 7
//     "4 / 2 / 5 / 3", // item 8
//     "5 / 1 / 6 / 4", // item 9 (if needed)
//   ];

//   useEffect(() => {
//     let flipCtx;

//     const createFlipAnimation = () => {
//       const galleryElement = galleryRef.current;
//       const galleryWrap = galleryWrapRef.current;
//       const galleryItems = galleryElement?.querySelectorAll(".gallery-item");

//       if (!galleryElement || !galleryItems || galleryItems.length === 0) return;

//       if (flipCtx) {
//         flipCtx.revert();
//       }

//       setIsFinal(false);

//       flipCtx = gsap.context(() => {
//         // Apply final state to get flip state
//         galleryElement.style.gridTemplateColumns = "repeat(3, 100vw)";
//         galleryElement.style.gridTemplateRows = "repeat(4, 49.5vh)";
//         const flipState = Flip.getState(galleryItems);

//         // Reset to initial state
//         galleryElement.style.gridTemplateColumns = "repeat(3, 32.5vw)";
//         galleryElement.style.gridTemplateRows = "repeat(4, 23vh)";

//         const flip = Flip.to(flipState, {
//           simple: true,
//           ease: "power2.inOut",
//           duration: 1,
//         });

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             id: "bento-gallery",
//             trigger: galleryElement,
//             start: "center center",
//             end: "+=100%",
//             scrub: true,
//             pin: galleryWrap,
//             anticipatePin: 1,
//           },
//         });

//         tl.add(flip);
//       }, galleryElement);
//     };

//     const timer = setTimeout(() => {
//       createFlipAnimation();
//       ScrollTrigger.refresh();
//     }, 200);

//     const handleResize = () => {
//       createFlipAnimation();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       clearTimeout(timer);
//       if (flipCtx) {
//         flipCtx.revert();
//       }
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Feature cards data
//   const featureCards = [
//     {
//       title: "DigiLocker Integration",
//       description: "Secure government document storage with encryption",
//       icon: (
//         <svg
//           className="w-5 h-5 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           strokeWidth={2.5}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//           />
//         </svg>
//       ),
//       items: [
//         "Aadhaar verification",
//         "PAN Card access",
//         "Driving License",
//         "Gov-verified",
//       ],
//       type: "list",
//     },
//     {
//       title: "Layer 2 on Ethereum",
//       description: "Advanced scaling with reduced fees",
//       icon: (
//         <svg
//           className="w-5 h-5 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           strokeWidth={2.5}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M13 10V3L4 14h7v7l9-11h-7z"
//           />
//         </svg>
//       ),
//       items: [
//         "Faster processing",
//         "Lower gas fees",
//         "Ethereum security",
//         "Mainnet compatible",
//       ],
//       type: "list",
//     },
//     {
//       title: "Our Certifications",
//       description: "Industry-recognized standards",
//       icon: (
//         <svg
//           className="w-5 h-5 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           strokeWidth={2.5}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//           />
//         </svg>
//       ),
//       badges: ["ISO 27001", "SOC 2", "GDPR", "PCI DSS"],
//       type: "badges",
//     },
//   ];

//   return (
//     <>
//       {/* Gallery Section */}
//       <div
//         ref={galleryWrapRef}
//         className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500"
//       >
//         <div
//           ref={galleryRef}
//           className="gallery-bento relative w-full h-full flex-none"
//           style={{
//             display: "grid",
//             gap: "1vh",
//             gridTemplateColumns: "repeat(3, 32.5vw)",
//             gridTemplateRows: "repeat(4, 23vh)",
//             justifyContent: "center",
//             alignContent: "center",
//           }}
//         >
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="gallery-item rounded-lg overflow-hidden flex-none relative"
//               style={{
//                 gridArea: gridAreas[index],
//                 backgroundPosition: "50% 50%",
//                 backgroundSize: "cover",
//               }}
//             >
//               <img
//                 src={image}
//                 alt={`Gallery item ${index + 1}`}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Security Content Section - Compact Version */}
//       <div
//         className="relative py-12 px-4 overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(180deg, #0d9488 0%, #14b8a6 15%, #5eead4 30%, #99f6e4 45%, #ccfbf1 60%, #f0fdfa 75%, #ffffff 90%, #f0fdfa 100%)",
//         }}
//       >
//         <div className="relative max-w-6xl mx-auto z-10">
//           {/* Compact Header */}
//           <div className="text-center mb-8">
//             <span
//               className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 animate-bounce"
//               style={{
//                 background: "rgba(255, 255, 255, 0.95)",
//                 border: "1px solid rgba(255, 255, 255, 0.3)",
//                 color: "#0d9488",
//                 backdropFilter: "blur(10px)",
//                 boxShadow: "0 2px 8px rgba(13, 148, 136, 0.2)",
//               }}
//             >
//               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Enterprise Security
//             </span>

//             <h2
//               className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight"
//               style={{
//                 color: "rgba(255, 255, 255, 0.95)",
//                 textShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               Security We{" "}
//               <span
//                 className="inline-block"
//                 style={{
//                   background:
//                     "linear-gradient(90deg, #ffffff, #f0fdfa, #ccfbf1, #f0fdfa, #ffffff)",
//                   backgroundSize: "200% auto",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                   filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
//                   animation: "shimmer 4s linear infinite",
//                 }}
//               >
//                 Provide
//               </span>
//             </h2>

//             <p
//               className="text-base max-w-xl mx-auto leading-relaxed"
//               style={{
//                 color: "rgba(255, 255, 255, 0.9)",
//                 textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               At{" "}
//               <a
//                 href="https://www.jaimax.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
//                 style={{
//                   color: "#ffffff",
//                   textDecorationColor: "rgba(255, 255, 255, 0.5)",
//                   textDecorationThickness: "2px",
//                 }}
//               >
//                 Jaimax.com
//               </a>
//               , we deliver enterprise-grade security solutions.
//             </p>
//           </div>

//           {/* Compact Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//             {featureCards.map((card, cardIndex) => (
//               <div
//                 key={cardIndex}
//                 className="relative p-5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
//                 style={{
//                   background: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(20px)",
//                   border: "1px solid rgba(255, 255, 255, 0.5)",
//                   boxShadow:
//                     "0 4px 6px -1px rgba(13, 148, 136, 0.1), 0 2px 4px -1px rgba(13, 148, 136, 0.06)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.boxShadow =
//                     "0 10px 15px -3px rgba(13, 148, 136, 0.2), 0 4px 6px -2px rgba(13, 148, 136, 0.1)";
//                   e.currentTarget.style.borderColor = "rgba(20, 184, 166, 0.3)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 6px -1px rgba(13, 148, 136, 0.1), 0 2px 4px -1px rgba(13, 148, 136, 0.06)";
//                   e.currentTarget.style.borderColor =
//                     "rgba(255, 255, 255, 0.5)";
//                 }}
//               >
//                 {/* Hover overlay */}
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05))",
//                   }}
//                 />

//                 {/* Card Header */}
//                 <div className="flex items-start gap-3.5 mb-4 relative z-10">
//                   <div
//                     className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
//                     style={{
//                       background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
//                       boxShadow: "0 4px 12px rgba(20, 184, 166, 0.3)",
//                     }}
//                   >
//                     {card.icon}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3
//                       className="text-base font-bold mb-1"
//                       style={{
//                         background:
//                           "linear-gradient(90deg, #134e4a, #0d9488, #14b8a6, #0d9488, #134e4a)",
//                         backgroundSize: "200% auto",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                         backgroundClip: "text",
//                       }}
//                     >
//                       {card.title}
//                     </h3>
//                     <p className="text-sm text-teal-700/70 leading-snug">
//                       {card.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Card Content */}
//                 {card.type === "list" ? (
//                   <ul className="grid grid-cols-2 gap-2 relative z-10 list-none p-0 m-0">
//                     {card.items.map((item, itemIndex) => (
//                       <li
//                         key={itemIndex}
//                         className="flex items-center gap-2 text-sm transition-transform duration-200 group-hover:translate-x-0.5"
//                         style={{ color: "#4b6462" }}
//                       >
//                         <span
//                           className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold"
//                           style={{
//                             background:
//                               "linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.15))",
//                             color: "#0d9488",
//                             fontSize: "0.625rem",
//                           }}
//                         >
//                           ✓
//                         </span>
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <div className="flex flex-wrap gap-2 relative z-10">
//                     {card.badges.map((badge, badgeIndex) => (
//                       <span
//                         key={badgeIndex}
//                         className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 cursor-default"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, rgba(240, 253, 250, 0.9), rgba(204, 251, 241, 0.9))",
//                           border: "1px solid rgba(20, 184, 166, 0.2)",
//                           color: "#0f766e",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.background =
//                             "linear-gradient(135deg, rgba(204, 251, 241, 1), rgba(153, 246, 228, 1))";
//                           e.currentTarget.style.borderColor =
//                             "rgba(20, 184, 166, 0.4)";
//                           e.currentTarget.style.boxShadow =
//                             "0 2px 8px rgba(20, 184, 166, 0.2)";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.background =
//                             "linear-gradient(135deg, rgba(240, 253, 250, 0.9), rgba(204, 251, 241, 0.9))";
//                           e.currentTarget.style.borderColor =
//                             "rgba(20, 184, 166, 0.2)";
//                           e.currentTarget.style.boxShadow = "none";
//                         }}
//                       >
//                         {badge}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Stats Section */}
//           <div
//             className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center p-6 rounded-2xl"
//             style={{
//               background: "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(20px)",
//               border: "1px solid rgba(255, 255, 255, 0.5)",
//               boxShadow: "0 4px 6px -1px rgba(13, 148, 136, 0.1)",
//             }}
//           >
//             {[
//               { value: "99.9%", label: "Uptime" },
//               { value: "256-bit", label: "Encryption" },
//               { value: "24/7", label: "Monitoring" },
//               { value: "100%", label: "Compliance" },
//             ].map((stat, index) => (
//               <>
//                 <div key={`stat-${index}`} className="text-center">
//                   <div
//                     className="text-2xl font-extrabold mb-0.5"
//                     style={{
//                       background:
//                         "linear-gradient(90deg, #14b8a6, #0d9488, #06b6d4, #0ea5e9, #06b6d4, #0d9488, #14b8a6)",
//                       backgroundSize: "300% auto",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       backgroundClip: "text",
//                     }}
//                   >
//                     {stat.value}
//                   </div>
//                   <div
//                     className="text-xs font-medium uppercase tracking-wide"
//                     style={{ color: "#5f7d7b" }}
//                   >
//                     {stat.label}
//                   </div>
//                 </div>
//                 {index < 3 && (
//                   <div
//                     key={`divider-${index}`}
//                     className="hidden md:block w-px h-10 justify-self-center"
//                     style={{
//                       background:
//                         "linear-gradient(180deg, transparent, rgba(20, 184, 166, 0.3), transparent)",
//                     }}
//                   />
//                 )}
//               </>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Keyframes for shimmer animation - using a style tag is necessary for keyframes */}
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//           @keyframes shimmer {
//             0% { background-position: 0% 50%; }
//             100% { background-position: 200% 50%; }
//           }
          
//           @media (max-width: 768px) {
//             .gallery-bento {
//               grid-template-columns: repeat(2, 45vw) !important;
//               grid-template-rows: repeat(4, 20vh) !important;
//             }
//           }
//         `,
//         }}
//       />
//     </>
//   );
// };
// const JaimaxFAQ = () => {
//   const [openFaq, setOpenFaq] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const faqRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (faqRef.current) {
//       observer.observe(faqRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const faqs = [
//     {
//       question: "What is Jaimax?",
//       answer:
//         "Jaimax is a digital ecosystem built on blockchain to provide secure, fast, and transparent financial transactions through its own cryptocurrency, JMC Coin.",
//       icon: <Coins className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "Is it legal to invest in Jaimax Tokens in India?",
//       answer:
//         "Yes. Investing in cryptocurrencies like Jaimax Tokens is legal in India. However, such investments are taxable under the Finance Act, 2022. A 30% tax applies on profits, and a 1% TDS is deducted per transaction.",
//       icon: <Shield className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "How can you say Jaimax is not a scam company?",
//       answer:
//         "Jaimax operates transparently with verified registration, a clear whitepaper, and funds securely held in regulated bank accounts. It follows compliance standards and ensures investor protection.",
//       icon: <FileText className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "Are the funds raised through the ICO locked in a bank?",
//       answer:
//         "Yes, the funds are securely locked in regulated bank accounts to prevent misuse. The lock ensures that money is released only after project milestones are met.",
//       icon: <Lock className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "What happens to unsold JMC tokens after presale?",
//       answer:
//         "Unsold JMC tokens are managed as per Jaimax's tokenomics policy. Some may be burned to reduce supply and maintain value stability, while others may be reallocated for future ecosystem needs.",
//       icon: <Flame className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "What makes Jaimax unique from other coins?",
//       answer:
//         "Unlike speculative coins, Jaimax is linked to real business projects — including Blockchain Technology, Social Media Application, J-payment gateway, DApps, NFT Platform and De-Finance.",
//       icon: <Sparkles className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "What is the main goal of Jaimax?",
//       answer:
//         "To bridge traditional finance and blockchain innovation by creating a secure, decentralized, and user-friendly digital finance system.",
//       icon: <TrendingUp className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "On which blockchain is Jaimax built?",
//       answer:
//         "Jaimax is built on the Binance Smart Chain (BSC-20) — known for its speed, scalability, and low transaction fees.",
//       icon: <Building className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "What is the price range of JMC in ICO?",
//       answer: "The ICO price ranges from ₹0.01 to ₹4.10 across five phases.",
//       icon: <DollarSign className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "How can investors buy Jaimax Coins?",
//       answer:
//         "Investors can buy using USDT, USDC, XRP, TRX, ADA, or INR (via UPI, PhonePe, Google Pay).",
//       icon: <CreditCard className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "Will Jaimax be listed on global exchanges?",
//       answer:
//         "Yes, plans include listing on PancakeSwap, Uniswap, and major exchanges during later ICO phases.",
//       icon: <Globe className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//     {
//       question: "Can JMC be used for cross-border payments?",
//       answer:
//         "Yes, Jaimax enables global, borderless transfers without needing banks or currency conversion.",
//       icon: <Globe className="w-5 h-5" />,
//       color: "from-teal-400 to-teal-500",
//       glow: "shadow-teal-500/50",
//     },
//   ];

//   const leftColumnFaqs = faqs.slice(0, 6);
//   const rightColumnFaqs = faqs.slice(6, 12);

//   const renderFaqItem = (faq, index, columnOffset = 0) => {
//     const actualIndex = index + columnOffset;
//     const isOpen = openFaq === actualIndex;
//     const isHovered = hoveredIndex === actualIndex;
//     const delay = index * 100;

//     return (
//       <div
//         key={actualIndex}
//         className={`
//           relative group cursor-pointer
//           transform transition-all duration-500 ease-out
//           ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }
//         `}
//         style={{
//           transitionDelay: `${delay}ms`,
//           perspective: "1000px",
//         }}
//         onMouseEnter={() => setHoveredIndex(actualIndex)}
//         onMouseLeave={() => setHoveredIndex(null)}
//       >
//         {/* Animated Background Glow */}
//         <div
//           className={`
//             absolute -inset-1 bg-gradient-to-r ${faq.color} rounded-2xl blur-lg
//             transition-all duration-500 opacity-0 group-hover:opacity-30
//             ${isOpen ? "opacity-40" : ""}
//           `}
//         />

//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
//           {isHovered && (
//             <>
//               <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-float-1" />
//               <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-white/70 rounded-full animate-float-2" />
//               <div className="absolute bottom-4 left-12 w-1 h-1 bg-white/50 rounded-full animate-float-3" />
//               <div className="absolute bottom-8 right-4 w-0.5 h-0.5 bg-white rounded-full animate-float-1" />
//             </>
//           )}
//         </div>

//         {/* Main Card */}
//         <div
//           className={`
//             relative bg-gradient-to-br from-white/10 to-white/5 
//             backdrop-blur-xl rounded-2xl border overflow-hidden
//             transition-all duration-500 ease-out
//             ${
//               isOpen
//                 ? "border-white/40 shadow-2xl " + faq.glow
//                 : "border-white/20 hover:border-white/40"
//             }
//             ${isHovered && !isOpen ? "scale-[1.02] shadow-xl" : "scale-100"}
//           `}
//         >
//           {/* Question Button */}
//           <button
//             onClick={() => setOpenFaq(isOpen ? null : actualIndex)}
//             className="relative w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors duration-300"
//           >
//             <div className="flex items-center gap-4 flex-1 min-w-0">
//               {/* Animated Icon Container */}
//               <div
//                 className={`
//                   relative p-3 rounded-xl bg-gradient-to-br ${faq.color} 
//                   flex-shrink-0 text-white shadow-lg ${faq.glow}
//                   transform transition-all duration-500
//                   ${isOpen ? "rotate-0 scale-110" : "rotate-0 scale-100"}
//                   ${isHovered ? "scale-110 rotate-3" : ""}
//                 `}
//               >
//                 {/* Icon Pulse Ring */}
//                 <div
//                   className={`
//                     absolute inset-0 rounded-xl bg-gradient-to-br ${faq.color}
//                     animate-ping opacity-30
//                     ${isOpen || isHovered ? "block" : "hidden"}
//                   `}
//                 />
//                 <div className="relative z-10">{faq.icon}</div>
//               </div>

//               {/* Question Text */}
//               <span
//                 className={`
//                   font-semibold text-sm sm:text-base leading-tight
//                   transition-all duration-300
//                   ${
//                     isOpen
//                       ? "text-white"
//                       : "text-white/90 group-hover:text-white"
//                   }
//                 `}
//               >
//                 {faq.question}
//               </span>
//             </div>

//             {/* Animated Chevron */}
//             <div
//               className={`
//                 relative w-10 h-10 rounded-full flex items-center justify-center
//                 transition-all duration-500 flex-shrink-0 ml-3
//                 ${
//                   isOpen
//                     ? `bg-gradient-to-br ${faq.color} shadow-lg ${faq.glow}`
//                     : "bg-white/10 group-hover:bg-white/20"
//                 }
//               `}
//             >
//               <ChevronDown
//                 className={`
//                   w-5 h-5 text-white transition-all duration-500
//                   ${isOpen ? "rotate-180" : "rotate-0"}
//                 `}
//               />
//             </div>
//           </button>

//           {/* Answer Section */}
//           <div
//             className={`
//               grid transition-all duration-500 ease-out
//               ${
//                 isOpen
//                   ? "grid-rows-[1fr] opacity-100"
//                   : "grid-rows-[0fr] opacity-0"
//               }
//             `}
//           >
//             <div className="overflow-hidden">
//               <div className="px-5 sm:px-6 pb-5 sm:pb-6">
//                 {/* Answer Card */}
//                 <div
//                   className={`
//                     relative p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5
//                     border border-white/10
//                     transform transition-all duration-500 delay-100
//                     ${
//                       isOpen
//                         ? "translate-y-0 opacity-100"
//                         : "-translate-y-4 opacity-0"
//                     }
//                   `}
//                 >
//                   {/* Accent Line */}
//                   <div
//                     className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${faq.color}`}
//                   />

//                   <p className="text-gray-300 leading-relaxed text-sm pl-3">
//                     {faq.answer}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Card Number Badge */}
//       </div>
//     );
//   };

//   return (
//     <section
//       ref={faqRef}
//       className="relative min-h-screen px-4 py-20 overflow-hidden bg-gradient-to-b from-[#0a5a61] via-[#085056] to-[#064248]"
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Gradient Orbs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />

//         {/* Floating Grid Pattern */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//             `,
//             backgroundSize: "50px 50px",
//             animation: "gridMove 20s linear infinite",
//           }}
//         />

//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-random"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 10}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div
//           className={`
//             text-center mb-16 transform transition-all duration-1000
//             ${
//               isVisible
//                 ? "translate-y-0 opacity-100"
//                 : "-translate-y-10 opacity-0"
//             }
//           `}
//         >
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
//             <HelpCircle className="w-4 h-4 text-emerald-400" />
//             <span className="text-sm text-white/80">Got Questions?</span>
//           </div>

//           {/* Title */}
//           <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6">
//             <span className="inline-block animate-title-word-1">
//               Frequently
//             </span>{" "}
//             <span className="inline-block animate-title-word-2">Asked</span>{" "}
//             <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-title-word-3">
//               Questions
//             </span>
//           </h2>

//           {/* Subtitle */}
//           <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
//             Everything you need to know about Jaimax and JMC Coin
//           </p>

//           {/* Animated Line */}
//           <div className="flex justify-center gap-1">
//             <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-line-1" />
//             <div className="w-8 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-line-2" />
//             <div className="w-4 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-line-3" />
//           </div>
//         </div>

//         {/* FAQ Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {/* Left Column */}
//           <div className="space-y-5">
//             {leftColumnFaqs.map((faq, index) => renderFaqItem(faq, index, 0))}
//           </div>

//           {/* Right Column */}
//           <div className="space-y-5">
//             {rightColumnFaqs.map((faq, index) => renderFaqItem(faq, index, 6))}
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes gridMove {
//           0% {
//             transform: translate(0, 0);
//           }
//           100% {
//             transform: translate(50px, 50px);
//           }
//         }

//         @keyframes float-1 {
//           0%,
//           100% {
//             transform: translateY(0) scale(1);
//             opacity: 0.7;
//           }
//           50% {
//             transform: translateY(-20px) scale(1.2);
//             opacity: 1;
//           }
//         }

//         @keyframes float-2 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0);
//             opacity: 0.5;
//           }
//           50% {
//             transform: translateY(-15px) translateX(10px);
//             opacity: 0.8;
//           }
//         }

//         @keyframes float-3 {
//           0%,
//           100% {
//             transform: translateY(0) rotate(0deg);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(-25px) rotate(180deg);
//             opacity: 1;
//           }
//         }

//         @keyframes float-random {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0);
//             opacity: 0.3;
//           }
//           25% {
//             transform: translateY(-30px) translateX(20px);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(-10px) translateX(-10px);
//             opacity: 0.4;
//           }
//           75% {
//             transform: translateY(-40px) translateX(15px);
//             opacity: 0.7;
//           }
//         }

//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 0.2;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.3;
//             transform: scale(1.1);
//           }
//         }

//         .animate-float-1 {
//           animation: float-1 3s ease-in-out infinite;
//         }
//         .animate-float-2 {
//           animation: float-2 4s ease-in-out infinite;
//         }
//         .animate-float-3 {
//           animation: float-3 5s ease-in-out infinite;
//         }
//         .animate-float-random {
//           animation: float-random 8s ease-in-out infinite;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 6s ease-in-out infinite;
//         }

//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }

//         .animate-title-word-1 {
//           animation: fadeSlideUp 0.8s ease-out 0.2s both;
//         }
//         .animate-title-word-2 {
//           animation: fadeSlideUp 0.8s ease-out 0.4s both;
//         }
//         .animate-title-word-3 {
//           animation: fadeSlideUp 0.8s ease-out 0.6s both;
//         }

//         @keyframes fadeSlideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-line-1 {
//           animation: lineGrow 0.6s ease-out 0.8s both;
//         }
//         .animate-line-2 {
//           animation: lineGrow 0.6s ease-out 1s both;
//         }
//         .animate-line-3 {
//           animation: lineGrow 0.6s ease-out 1.2s both;
//         }

//         @keyframes lineGrow {
//           from {
//             width: 0;
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
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
//   const roadmapRef = useRef(null);
//   const roadmapTimelineRef = useRef(null);
//   const faqRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       ScrollTrigger.getAll().forEach((trigger) => {
//         if (
//           !trigger.vars.id ||
//           !trigger.vars.id.toString().startsWith("card-")
//         ) {
//           trigger.kill();
//         }
//       });

//       // Hero animations
//       if (heroRef.current) {
//         const tl = gsap.timeline();
//         tl.from(heroRef.current.querySelector(".hero-badge"), {
//           opacity: 0,
//           y: 30,
//           duration: 0.8,
//           ease: "power3.out",
//         })
//           .from(
//             heroRef.current.querySelector(".hero-title"),
//             {
//               opacity: 0,
//               y: 50,
//               duration: 1,
//               ease: "power3.out",
//             },
//             "-=0.4"
//           )
//           .from(
//             heroRef.current.querySelector(".hero-subtitle"),
//             {
//               opacity: 0,
//               y: 30,
//               duration: 0.8,
//               ease: "power3.out",
//             },
//             "-=0.6"
//           )
//           .from(
//             heroRef.current.querySelectorAll(".hero-button"),
//             {
//               opacity: 0,
//               y: 30,
//               stagger: 0.2,
//               duration: 0.6,
//               ease: "power3.out",
//             },
//             "-=0.4"
//           )
//           .from(
//             heroRef.current.querySelectorAll(".stat-card"),
//             {
//               opacity: 0,
//               scale: 0.8,
//               stagger: 0.1,
//               duration: 0.6,
//               ease: "back.out(1.7)",
//             },
//             "-=0.3"
//           );
//       }

//       // Services section
//       // Services section animation - Replace in useEffect
// if (servicesRef.current) {
//   const cards = gsap.utils.toArray(".service-card");
//   const totalCards = cards.length;

//   // Initial setup - stack cards
//   gsap.set(cards, {
//     y: (i) => i * 15,
//     scale: (i) => 1 - i * 0.04,
//     opacity: (i) => 1 - i * 0.15,
//     zIndex: (i) => totalCards - i,
//     rotationX: 0,
//   });

//   const serviceTl = gsap.timeline({
//     scrollTrigger: {
//       trigger: servicesRef.current,
//       start: "top top",
//       end: `+=${totalCards * 500}`,
//       scrub: 1,
//       pin: true,
//       pinSpacing: true,
//       anticipatePin: 1,
//     },
//   });

//   cards.forEach((card, index) => {
//     if (index < totalCards - 1) {
//       // Animate current card out
//       serviceTl.to(
//         card,
//         {
//           y: -500,
//           opacity: 0,
//           scale: 0.9,
//           rotationX: -15,
//           duration: 1,
//           ease: "power2.inOut",
//         },
//         index
//       );

//       // Update remaining cards
//       cards.slice(index + 1).forEach((nextCard, nextIndex) => {
//         serviceTl.to(
//           nextCard,
//           {
//             y: nextIndex * 15,
//             scale: 1 - nextIndex * 0.04,
//             opacity: 1 - nextIndex * 0.15,
//             duration: 1,
//           },
//           index
//         );
//       });
//     }
//   });
// }


//       // Phases section
//       if (phasesRef.current && phasesContainerRef.current) {
//         const phasesContainer = phasesContainerRef.current;

//         gsap.to(phasesContainer, {
//           x: () => -(phasesContainer.scrollWidth - window.innerWidth + 100),
//           ease: "none",
//           scrollTrigger: {
//             trigger: phasesRef.current,
//             start: "top top",
//             end: () => `+=${phasesContainer.scrollWidth}`,
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//           },
//         });
//       }

//       // Security section
//       if (securityVideoRef.current && securityMainVideoRef.current) {
//         const calculateDimensions = () => {
//           const initialWidth = Math.min(window.innerWidth * 0.45, 650);
//           const finalWidth = Math.min(window.innerWidth * 0.74, 1400);
//           const scaleRatio = finalWidth / initialWidth;
//           const cardOffset = Math.min(window.innerWidth * 0.34, 550);
//           const leftCardsInitialLeft = window.innerWidth * 0.48 - cardOffset;
//           const rightCardsInitialRight = window.innerWidth * 0.474 - cardOffset;

//           return {
//             initialWidth,
//             finalWidth,
//             scaleRatio,
//             leftCardsInitialLeft,
//             rightCardsInitialRight,
//           };
//         };

//         const dimensions = calculateDimensions();
//         const video = securityMainVideoRef.current;

//         gsap.set(video, {
//           width: dimensions.initialWidth + "px",
//         });

//         if (securityLeftCardsRef.current) {
//           gsap.set(securityLeftCardsRef.current, {
//             left: dimensions.leftCardsInitialLeft + "px",
//           });
//         }

//         if (securityRightCardsRef.current) {
//           gsap.set(securityRightCardsRef.current, {
//             right: dimensions.rightCardsInitialRight + "px",
//           });
//         }

//         const securityTl = gsap.timeline({
//           scrollTrigger: {
//             trigger: securityVideoRef.current,
//             start: "top 45%",
//             end: "bottom bottom",
//             scrub: 0.3,
//           },
//           defaults: {
//             ease: "none",
//           },
//         });

//         securityTl.fromTo(
//           video,
//           {
//             scale: 1,
//             boxShadow: "0px 4px 24px 0px rgba(255, 255, 255, 0.4)",
//           },
//           {
//             scale: dimensions.scaleRatio,
//             boxShadow: "0px 8px 48px 0px rgba(255, 255, 255, 0.6)",
//           }
//         );

//         if (securityLeftCardsRef.current) {
//           securityTl.fromTo(
//             securityLeftCardsRef.current,
//             { y: 0 },
//             {
//               y: "18vh",
//               xPercent: -105,
//             },
//             0
//           );
//         }

//         if (securityRightCardsRef.current) {
//           securityTl.fromTo(
//             securityRightCardsRef.current,
//             { y: 0, xPercent: 0 },
//             {
//               y: "20vh",
//               xPercent: 110,
//             },
//             0
//           );
//         }
//       }

//       // FAQ section
//       if (faqRef.current) {
//         const faqItems = faqRef.current.querySelectorAll(".faq-item");

//         faqItems.forEach((item) => {
//           gsap.fromTo(
//             item,
//             { opacity: 0, y: 40 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.6,
//               ease: "power2.out",
//               scrollTrigger: {
//                 trigger: item,
//                 start: "top 90%",
//                 end: "top 70%",
//                 toggleActions: "play none none reverse",
//               },
//             }
//           );
//         });
//       }

//       ScrollTrigger.refresh();
//     }, 100);

//     const handleResize = () => ScrollTrigger.refresh();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", handleResize);
//       ScrollTrigger.getAll().forEach((trigger) => {
//         const id = trigger.vars.id;
//         // Don't kill card animations or bento gallery
//         if (
//           id &&
//           (id.toString().startsWith("card-") || id === "bento-gallery")
//         ) {
//           return; // Skip these
//         }
//         trigger.kill();
//       });
//     };
//   }, []);
//   return (
//     <div id="main-content" className="bg-[#085056] text-white">
//       <header
//         ref={heroRef}
//         className="relative min-h-[100dvh] flex flex-col justify-center"
//       >
//         <div className="absolute inset-0 w-full h-full">
//           <picture>
//             <img
//               src={homeBgDesktop}
//               srcSet={`${homeBgMobile} 767w, ${homeBgDesktop} 1920w`}
//               sizes="100vw"
//               alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
//               title="Jaimax - Your Trusted Partner in Cryptocurrency Investment"
//               className="w-full h-full object-cover object-center"
//               loading="eager"
//               fetchPriority="high"
//               decoding="async"
//               width="1920"
//               height="1080"
//             />
//           </picture>
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
//         </div>

//         <div className="relative z-10 px-4 py-4 mx-auto w-full max-w-9xl">
//           <div className="relative w-full min-h-[100dvh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
//             <h1
//               className="hero-title absolute top-6 left-4 sm:top-10 sm:left-10 font-600 leading-tight 
//               text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
//               text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1"
//             >
//               <span className="block text-[#b8cc26]">Best Pre-Sale</span>
//               <span className="block">Crypto Coin in India</span>
//               <span className="block">Invest Early in </span>
//               <span className="block"> Jaimax</span>
//             </h1>

//             <p
//               className="hero-subtitle absolute bottom-6 right-4 sm:bottom-10 sm:right-10
//               text-white text-sm sm:text-base md:text-lg lg:text-xl 
//               font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4"
//             >
//               Our advanced platform simplifies your pre-sale crypto investment
//               journey, offering a secure and transparent experience to help you
//               grow with India's most trusted
//               <b className="text-[#aadc32]">
//                 <a href="https://www.jaimax.com"> pre-sale crypto coin</a>
//               </b>{" "}
//               - jaimax.
//               <button
//                 type="button"
//                 onClick={() => navigate("/login")}
//                 className="hero-button block ml-auto mt-4 font-bold text-center
//                bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] 
//                text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
//                rounded-full hover:scale-105 active:scale-95
//                transition-transform duration-300 px-4 py-2"
//               >
//                 Join Jaimax Pre-Sale
//               </button>
//             </p>
//           </div>
//         </div>
//       </header>
//       <VelocityHero />
//       <section
//         ref={servicesRef}
//         className="min-h-screen relative px-4 py-10 bg-teal-50 flex items-center justify-center overflow-hidden"
//       >
//         {/* Background decorations */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-50/50 to-cyan-50/50 rounded-full blur-3xl" />

//         <div className="w-full max-w-7xl mx-auto relative z-10">
//           <div className="text-center mb-16">
//             <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg shadow-teal-500/25">
//               What We Offer
//             </span>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//               Our Services
//             </h2>
//             <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
//               Comprehensive solutions for your crypto journey
//             </p>
//           </div>

//           {/* Stacked Cards Container */}
//           <div
//             className="relative w-full max-w-4xl mx-auto"
//             style={{ height: "300px", perspective: "1500px" }}
//           >
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="service-card absolute inset-0 bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl"
//                 style={{
//                   transformOrigin: "center center",
//                   transformStyle: "preserve-3d",
//                   backfaceVisibility: "hidden",
//                 }}
//               >
//                 <div className="flex flex-col h-full">
//                   {/* Card Number Badge */}
//                   <div className="absolute top-6 right-6">
//                     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-bold text-sm shadow-lg">
//                       {`0${index + 1}`}
//                     </span>
//                   </div>

//                   {/* Icon */}
//                   <div className="w-20 h-20 mb-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/30">
//                     <img
//                       src={service.icon}
//                       alt={service.iconAlt}
//                       className="w-12 h-12 filter brightness-0 invert"
//                     />
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-3xl font-bold mb-4 text-gray-900">
//                     {service.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-gray-600 leading-relaxed text-lg flex-grow">
//                     {service.description}
//                   </p>

//                 </div>

//                 {/* Card decorations */}
//                 <div className="absolute top-4 right-20 w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full blur-2xl opacity-60" />
//                 <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-xl opacity-40" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <PhasesWheelSection />
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop"
//         subheading="Security"
//         heading="Bank-Level Protection"
//       >
//         <SecurityContent />
//       </TextParallaxContent>
//       <section className="py-2  relative overflow-hidden">
//         <div className="relative z-10 py-1 md:py-20">
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

//                     {/* Pagination Dots */}

//                     <div className=" mt-4 "></div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </section>
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
//         subheading="Innovation"
//         heading="The Future is Here"
//       >
//         <InnovationContent />
//       </TextParallaxContent>
//       <Roadmap />
//       <BentoGallery />
//       <JaimaxFAQ />
//     </div>
//   );
// };

// export default JaimaxLanding;

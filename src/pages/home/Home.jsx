// import React, { lazy, Suspense, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Seo from "../../SeoContent/Seo";
// import '../../index.css'
// import { Helmet } from "react-helmet-async";

// import homeBgDesktop from "../../assets/Images/HomeDesktop.webp";
// import homeBgMobile from "../../assets/Images/HomeMobile.webp";
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
// const Home = () => {
//   const navigate = useNavigate();

//   // Preload critical images
//   useEffect(() => {
//     const preloadImages = [homeBgDesktop, homeBgMobile];
//     preloadImages.forEach((imageUrl) => {
//       const img = new Image();
//       img.src = imageUrl;
//     });
//   }, []);

//   // ✅ JSON-LD schema data
//   const jsonLdData = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         name: "Jaimax",
//         url: "https://www.jaimax.com",
//         logo: "https://www.jaimax.com/logo.png",
//         description:
//           "Jaimax is an innovative cryptocurrency project building a strong financial ecosystem with blockchain, DeFi, NFT marketplace, and global crypto education.",
//         sameAs: [
//           "https://www.instagram.com/jaimax_coin/",
//           "https://www.facebook.com/jaimaxcoin/",
//           "https://x.com/jaimax_coin",
//           "https://www.threads.com/@jaimax_coin",
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
//         keywords: [
//           "Jaimax",
//           "Jaimax coin",
//           "Jaimax crypto",
//           "Jaimax crypto coin",
//           "Jaimax token",
//           "cryptocurrency in India",
//           "cryptocurrency worldwide",
//           "crypto coin",
//           "digital currency",
//           "crypto wallet",
//           "blockchain technology",
//           "crypto trading",
//           "crypto investment",
//           "decentralized finance",
//           "DeFi",
//           "NFT marketplace",
//           "blockchain education",
//           "future of cryptocurrency",
//           "crypto exchange",
//           "Jaimax blockchain",
//         ],
//         address: {
//           "@type": "PostalAddress",
//           streetAddress:
//             "4th Floor, Vaishnavi's Cynosure, Survey No:18, India Building, Gachibowli",
//           addressLocality: "Hyderabad",
//           addressRegion: "Telangana",
//           postalCode: "500032",
//           addressCountry: "IN",
//         },
//         service: [
//           {
//             "@type": "Service",
//             name: "Cryptocurrency Exchange",
//             areaServed: "Worldwide",
//           },
//           {
//             "@type": "Service",
//             name: "Crypto Wallet",
//             areaServed: "Worldwide",
//           },
//           {
//             "@type": "Service",
//             name: "Blockchain Education",
//             areaServed: "Worldwide",
//           },
//           {
//             "@type": "Service",
//             name: "DeFi Solutions",
//             areaServed: "Worldwide",
//           },
//           {
//             "@type": "Service",
//             name: "NFT Marketplace",
//             areaServed: "Worldwide",
//           },
//         ],
//       },
//       {
//         "@type": "Product",
//         name: "Jaimax Coin",
//         alternateName: "Jaimax Crypto Coin",
//         url: "https://www.jaimax.com",
//         logo: "https://www.jaimax.com/logo.png",
//         image: "https://www.jaimax.com/logo.png",
//         description:
//           "Jaimax Coin is an innovative cryptocurrency designed for secure trading, blockchain adoption, DeFi, NFTs, and global digital payments.",
//         brand: {
//           "@type": "Organization",
//           name: "Jaimax",
//           url: "https://www.jaimax.com",
//         },
//         category: "Cryptocurrency",
//         keywords: [
//           "Jaimax Coin",
//           "Jaimax crypto coin",
//           "Jaimax token",
//           "crypto coin",
//           "cryptocurrency",
//           "blockchain coin",
//           "digital currency",
//           "crypto investment",
//           "decentralized finance",
//           "NFT marketplace coin",
//           "future of crypto",
//           "crypto in India",
//           "worldwide cryptocurrency",
//         ],
//         offers: {
//           "@type": "Offer",
//           url: "https://www.jaimax.com",
//           priceCurrency: "INR",
//           price: "0.03",
//           availability: "https://schema.org/InStock",
//         },
//       },
//       {
//         "@type": "MobileApplication",
//         name: "Jaimax App",
//         operatingSystem: "Android",
//         applicationCategory: "FinanceApplication",
//         downloadUrl:
//           "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
//         installUrl:
//           "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
//         offers: {
//           "@type": "Offer",
//           price: "0",
//           priceCurrency: "INR",
//         },
//         aggregateRating: {
//           "@type": "AggregateRating",
//           ratingValue: "5",
//           reviewCount: "50",
//         },
//         publisher: {
//           "@type": "Organization",
//           name: "Jaimax",
//           url: "https://www.jaimax.com",
//         },
//       },
//       {
//         "@type": "FAQPage",
//         mainEntity: [
//           {
//             "@type": "Question",
//             name: "What is Jaimax Coin?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Jaimax Coin is a next-generation cryptocurrency designed to create a strong financial ecosystem with blockchain technology, DeFi, NFT marketplace, and secure digital payments worldwide.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "How can I buy Jaimax Coin?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "You can buy Jaimax Coin through the official Jaimax platform and supported exchanges. Visit https://www.jaimax.com for the latest details.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is Jaimax Coin available worldwide?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Jaimax Coin is designed to be a global cryptocurrency, accessible and tradable worldwide.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "What services does Jaimax provide?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Jaimax offers cryptocurrency exchange, crypto wallet, blockchain education, DeFi solutions, and an NFT marketplace to empower the digital economy.",
//             },
//           },
//           {
//             "@type": "Question",
//             name: "Is Jaimax safe to use?",
//             acceptedAnswer: {
//               "@type": "Answer",
//               text: "Yes. Jaimax prioritizes security with advanced blockchain technology, transparent transactions, and a reliable support system to ensure safe trading and storage.",
//             },
//           },
//         ],
//       },
//     ],
//   };

//   return (
//     <>
//       {/* <Seo page="homePage" /> */}
// <Helmet>
//   <title>Jaimax Coin – The Best PreSale Crypto Coin in India for Smart Investments</title>
//   <meta
//     name="description"
//     content="Jaimax Coin is India’s most trusted pre-sale crypto coin, designed for secure and profitable investments. Join early, grow faster, and be part of the next big blockchain innovation."
//   />
//   <link rel="canonical" href="https://www.jaimax.com/" />
// </Helmet>

//       {/* ✅ Correct JSON-LD injection */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
//       />
// <CountdownTimer className="" />
//       <div className="outer-container overflow-y-auto scrollbar-hide">
//         <header className="relative min-h-[100dvh] flex flex-col justify-center">
//           <div className="absolute inset-0 w-full h-full">
//             <picture>
//               <img
//                 src={homeBgDesktop}
//                 srcSet={ `${homeBgMobile} 767w, ${homeBgDesktop} 1920w`}
//                 sizes="100vw"
//                 alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
//                 title="Jaimax - Your Trusted Partner in Cryptocurrency Investment"
//                 className="w-full h-full object-cover object-center"
//                 loading="eager"
//                 fetchpriority="high"
//                 decoding="async"
//                 width="1920"
//                 height="1080"
//               />
//             </picture>
//             <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
//           </div>

//           <div className="relative z-10 px-0  py-0 mx-auto w-full max-w-9xl">
//             <div className="relative w-full min-h-[100dvh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
//               <h1
//                 className="absolute top-6 left-4 sm:top-10 sm:left-10 font-600 leading-tight
//                               text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
//                               text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1
//                               opacity-0 translate-y-3 animate-fadeUp"
//               >
//                 <span className="block text-[#b8cc26]">Best Pre-Sale</span>
//                 <span className="block">Crypto Coin in India</span>
//                 <span className="block">Invest Early in </span>
//                 <span className="block"> Jaimax</span>
//               </h1>

//               <p
//                 className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10
//                             text-white text-sm sm:text-base md:text-lg lg:text-xl
//                             font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4
//                             opacity-0 translate-y-3 animate-fadeUp delay-150"
//               >
//                 Our advanced platform simplifies your pre-sale crypto investment
//                 journey, offering a secure and transparent experience to help
//                 you grow with India’s most trusted
//                 <b className="text-[#aadc32]">
//                   <a href="https://www.jaimax.com"> pre-sale crypto coin</a>
//                 </b>{" "}
//                 - jaimax.
//                 <button
//                   type="button"
//                   onClick={() => navigate("/login")}
//                   aria-label="Start building your crypto investment"
//                   className="block ml-auto mt-4 font-bold text-center
//                              bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f]
//                              text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
//                              rounded-full hover:scale-105 active:scale-95
//                              transition-transform duration-300 px-4 py-2"
//                 >
//                   Join Jaimax Pre-Sale
//                 </button>
//               </p>
//             </div>
//           </div>
//         </header>

//         <main className="w-full scrollbar-none" role="main">
//           {[
//             { Component: CryptoStakingSection, id: "crypto-staking" },
//             { Component: ServicesComponent, id: "services" },
//             { Component: GrowthPlanTimeline, id: "growth-plan" },
//             // { Component: Partners, id: "partners" },
//             { Component: JaimaxContent, id: "seo-section" },
//             // {Component :WorldMap,id:'world-section'},
//             { Component: ReviewsSection, id: "rating-section" },
//             { Component: AnimatedTestimonials, id: "testimonials" },
//             { Component: JaimaxRoadmap, id: "roadmap" },
//             { Component: JaimaxFAQ, id: "faq" },
//             { Component: HomeContact, id: "contact" },
//           ].map(({ Component, id,props }) => (
//             <section
//               key={id}
//               id={id}
//               style={{
//                 contentVisibility: "auto",
//                 containIntrinsicSize: "1px 800px",
//               }}
//             >
//               <Suspense
//                 fallback={
//                   <div className="min-h-[400px] flex items-center justify-center">
//                     <div className="w-8 h-8 border-4 border-t-[#b8cc26] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//                   </div>
//                 }
//               >
//                 <Component />
//               </Suspense>
//             </section>
//           ))}

//           <footer
//             style={{
//               contentVisibility: "auto",
//               containIntrinsicSize: "1px 400px",
//             }}
//           >
//             <Suspense fallback={<div className="min-h-[200px]"></div>}>
//               <HomeFooter />
//             </Suspense>
//           </footer>
//         </main>
//       </div>

//       {/* Animations */}
//       <style>
//         {`
//           @media (prefers-reduced-motion: reduce) {
//             .animate-fadeUp { animation: none !important; opacity: 1 !important; transform: none !important; }
//           }
//           .animate-fadeUp {
//             animation: fadeUp 500ms ease-out forwards;
//           }
//           .delay-150 { animation-delay: 150ms; }
//           @keyframes fadeUp {
//             0% { opacity: 0; transform: translateY(12px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Home;

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  ChevronDown,
  Globe,
  Shield,
  Star,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Wallet,
  Coins,
  DollarSign,
  Bell,
  Check,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Zap,
  Lock,
  Award,
  Users,
  Target,
  Rocket,
  Building2,
  LineChart,
  Flag,
  FileText,
  Flame,
  Building,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import homeBgDesktop from "../../assets/Images/HomeDesktop.webp";
import homeBgMobile from "../../assets/Images/HomeMobile.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
import jaicoins from "../../assets/Images/jaicoins.svg";
import frameTwo from "../../assets/Images/securitymeasure.svg";
import access from "../../assets/Images/accessToprofit.svg";
import rocket2 from "../../assets/Images/framefour.svg";
import eye from "../../assets/Images/eye.svg";
import rajkumar from "../../assets/Rajkumar.webp";
import mahendar from "../../assets/mahender.webp";
import krishnamraju from "../../assets/krishnamraju.webp";
import shekar from "../../assets/Shekar.jpg";
import anjanelu from "../../assets/B.veeranjaneyulu.jpg";
import Ratnam from "../../assets/Ratnam.jpg";
import pramod from "../../assets/pramod.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, SplitText, Flip);

const services = [
  {
    title: "Secure Crypto Wallet",
    icon: jaicoins,
    iconAlt: "Jaicoins wallet icon for cryptocurrency storage",
    iconTitle: "Secure Digital Wallet",
    description:
      "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
  },
  {
    title: "Access to Profits",
    icon: access,
    iconAlt: "Profit access icon showing financial gains",
    iconTitle: "Easy Profit Access",
    description:
      "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
  },
  {
    title: "Financial Growth",
    icon: rocket2,
    iconAlt: "Rocket icon symbolizing financial growth and success",
    iconTitle: "Accelerate Your Growth",
    description:
      "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
  },
  {
    title: "Funds Management",
    icon: eye,
    iconAlt: "Eye icon representing funds monitoring and management",
    iconTitle: "Complete Fund Visibility",
    description:
      "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Krishnamraju",
    date: "15 January, 2025",
    image: krishnamraju,
    text: "I started using the Jaimax app last month and it has been smooth so far. The interface is clean, fast, and really easy to navigate. Buying Jaimax Coins was easy, and the transaction was super fast. I love how transparent the project team is regarding updates and goals. Definitely, I recommend it to all those interested in crypto!",
  },
  {
    id: 2,
    name: "Mahendar",
    date: "12 January, 2025",
    image: mahendar,
    text: "First, I had my doubts about investing in Jaimax Coin, but now I'm glad I did. It was a smooth process, and my coins showed up instantly within my wallet. Their vision regarding digital payments is really unique among other projects. What's impressive is that the team actually responds to community feedback. ",
  },
  {
    id: 3,
    name: "Nimmala Rajkumar",
    date: "10 January, 2025",
    image: rajkumar,
    text: "The Jaimax website looks professional; it also loads very fast. Setup was smooth, and KYC verification went without any problems. I bought a few coins to try it out, and everything went great. The real-time transactions that this dashboard shows are really helpful to me. Overall, a great experience; very excited to see how this project develops!",
  },
  {
    id: 4,
    name: "Shekar.k",
    date: "8 January, 2025",
    image: shekar,
    text: "I've used a lot of crypto apps, but Jaimax really stands out with its simplicity. The wallet integration is very secure, and the payments are really lightning-fast. Nice to see an Indian company doing something innovative with blockchain. The roadmap instills confidence that this is a project that's here to stay. Already told my colleagues to check it out: it's totally worth it!",
  },
  {
    id: 5,
    name: "Yella Rathnaiah",
    date: "5 January, 2025",
    image: Ratnam,
    text: "Downloaded the Jaimax mobile app a week ago, and it's impressive. It is modern, intuitive, and doesn't lag even on slower networks. The process of buying coins is very straightforward and easy for complete beginners. The support team helped me instantly when I had a query about swapping. Overall, a great project with huge potential for further scaling!",
  },
  {
    id: 6,
    name: "Pramod Kumar",
    date: "3 January, 2025",
    image: pramod,
    text: "Been following Jaimax since the whitepaper release, and I'm really impressed. The team keeps delivering on each milestone as promised. I invested a little to start with, just to wet my feet. Everything is going excellently, so I've increased my holdings. This project feels trustworthy, as if it's built to last.",
  },
  {
    id: 7,
    name: "B.Veeranjaneyulu",
    date: "1 January, 2025",
    image: anjanelu,
    text: "Jaimax is exactly what crypto users have been waiting for! The application is lightweight, smooth, and promotes quick transactions. Buying the coins was easy, even for a complete beginner like myself. The constant updates and community engagement build real trust. Definitely a project I'll keep supporting as it grows.",
  },
  {
    id: 8,
    name: "jithendar Reddy",
    date: "28 December, 2024",
    image:
      "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
    text: "The first thing I notice with Jaimax is the quality of the design, it feels really premium. The transactions are instant, and I didn't face any downtime yet. I like how secure the login and system for KYC are. It's good to see them combine crypto with real-world usability. Can't wait to see future integrations they have planned!",
  },
  {
    id: 9,
    name: "Rohan Joshi",
    date: "25 December, 2024",
    image:
      "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
    text: "I have used Jaimax for more than one month and found it smooth. I love how easy it is to manage my wallet and keep track of my coins. Their tutorials made me grasp everything really fast. The app is constantly updated with new features and improved performance. Highly recommended to anyone starting in crypto!",
  },
  {
    id: 10,
    name: "Anjali Verma",
    date: "22 December, 2024",
    image:
      "https://media.istockphoto.com/id/1528157373/photo/portrait-of-a-happy-smiling-woman-of-indian-origin-wearing-traditional-dress-sari.jpg?s=612x612&w=0&k=20&c=6JTBSXZojVJQKSIVDZIIW2Du6_B_iWg9DWShjHjNO6U=",
    text: "Just bought some Jaimax Coins after reading about their ecosystem plans. Everything worked seamlessly: no hidden fees or delays. The application interface feels up-to-date and safe to transact. Customer support is actually responsive, a true rarity these days. I'm already inviting my friends to join before it goes mainstream!",
  },
];
const roadmapData = {
  2024: {
    title: "Foundation & Launch Phase",
    status: "completed",
    progress: 100,
    phases: [
      "• Concept development and team formation of the core Jaimax team.",
      "• Official website launch introducing the Jaimax ecosystem.",
      "• Publication of the detailed whitepaper outlining goals and tokenomics.",
      "• Public ICO launch and community onboarding.",
      "• Release of the Jaimax mobile application for early users.",
    ],
  },
  2025: {
    title: "Integration & Growth",
    status: "active",
    progress: 35,
    phases: [
      "• Launch of the Jaimax Wallet (J-Wallet) for secure token management.",
      "• Integration of DigiLocker KYC for secure user verification.",
      "• Launch of coin swapping within the Jaimax ecosystem.",
      "• Enable users to buy JMC through Binance exchange wallet connectivity.",
    ],
  },
  2026: {
    title: "Blockchain & Platform Expansion",
    status: "future",
    progress: 0,
    phases: [
      "• Development of Jaimax's own blockchain infrastructure.",
      "• Launch of DeFi features to enhance financial accessibility.",
      "• Launch of the NFT Platform.",
      "• Deployment of DApps across Education, Gaming, Tourism, and Finance.",
      "• Launch of person-to-person (P2P) buying and selling functionality.",
      "• Launch of Jaimax's own payment gateway for seamless transactions.",
    ],
  },
  2027: {
    title: "Global Presence",
    status: "future",
    progress: 0,
    phases: [
      "• Launch of the Jaimax Social Hub to connect users, traders, and developers.",
      "• Launch of the Jaimax Exchange for direct token trading.",
      "• Trading live for all verified users.",
      "• Expansion to global exchange listings.",
    ],
  },
};


const statusConfig = {
  completed: {
    badge: "Completed",
    badgeColor: "bg-[#085056]",
    borderColor: "border-[#085056]",
    glowColor: "shadow-[#085056]/30",
    textColor: "text-white",
    bgGradient: "from-[#085056]/20 to-[#0a6b73]/20",
    icon: "✓",
  },
  active: {
    badge: "In Progress",
    badgeColor: "bg-white",
    borderColor: "border-white",
    glowColor: "shadow-white/30",
    textColor: "text-white",
    bgGradient: "from-white/10 to-[#085056]/20",
    icon: "⚡",
  },
  future: {
    badge: "Upcoming",
    badgeColor: "bg-[#085056]",
    borderColor: "border-white/50",
    glowColor: "shadow-white/20",
    textColor: "text-white",
    bgGradient: "from-[#085056]/20 to-white/10",
    icon: "🎯",
  },
};

const IMG_PADDING = 12;

const phases = [
  {
    status: "Live",
    phaseNo: "Phase 1",
    tokens: "10 Billion Tokens",
    price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
    button: "Buy Now",
    icon: <Rocket className="w-8 h-8" />,
    color: "#10b981",
    progress: 45,
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 2",
    tokens: "20 Billion Tokens",
    price: "Price INR 0.05 - 0.50 Paisa (0.00061-0.0061 USD)",
    button: "Coming Soon",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "#3b82f6",
    progress: 0,
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 3",
    tokens: "25 Billion Tokens",
    price: "Price INR 0.60 - 1.53 Paisa (0.0071-0.018 USD)",
    button: "Coming Soon",
    icon: <Zap className="w-8 h-8" />,
    color: "#8b5cf6",
    progress: 0,
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 4",
    tokens: "30 Billion Tokens",
    price: "Price INR 1.60 - 3.00 Paisa (0.019-0.036 USD)",
    button: "Coming Soon",
    icon: <Coins className="w-8 h-8" />,
    color: "#f59e0b",
    progress: 0,
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 5",
    tokens: "25 Billion Tokens",
    price: "Price INR 3.15 - 4.10 Paisa (0.037-0.049 USD)",
    button: "Coming Soon",
    icon: <DollarSign className="w-8 h-8" />,
    color: "#ef4444",
    progress: 0,
  },
];

const JaimaxFAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "What is Jaimax?",
      answer:
        "Jaimax is a digital ecosystem built on blockchain to provide secure, fast, and transparent financial transactions through its own cryptocurrency, JMC Coin.",
      icon: <Coins className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "Is it legal to invest in Jaimax Tokens in India?",
      answer:
        "Yes. Investing in cryptocurrencies like Jaimax Tokens is legal in India. However, such investments are taxable under the Finance Act, 2022. A 30% tax applies on profits, and a 1% TDS is deducted per transaction.",
      icon: <Shield className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "How can you say Jaimax is not a scam company?",
      answer:
        "Jaimax operates transparently with verified registration, a clear whitepaper, and funds securely held in regulated bank accounts. It follows compliance standards and ensures investor protection.",
      icon: <FileText className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "Are the funds raised through the ICO locked in a bank?",
      answer:
        "Yes, the funds are securely locked in regulated bank accounts to prevent misuse. The lock ensures that money is released only after project milestones are met.",
      icon: <Lock className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "What happens to unsold JMC tokens after presale?",
      answer:
        "Unsold JMC tokens are managed as per Jaimax's tokenomics policy. Some may be burned to reduce supply and maintain value stability, while others may be reallocated for future ecosystem needs.",
      icon: <Flame className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "What makes Jaimax unique from other coins?",
      answer:
        "Unlike speculative coins, Jaimax is linked to real business projects — including Blockchain Technology, Social Media Application, J-payment gateway, DApps, NFT Platform and De-Finance.",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "What is the main goal of Jaimax?",
      answer:
        "To bridge traditional finance and blockchain innovation by creating a secure, decentralized, and user-friendly digital finance system.",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "On which blockchain is Jaimax built?",
      answer:
        "Jaimax is built on the Binance Smart Chain (BSC-20) — known for its speed, scalability, and low transaction fees.",
      icon: <Building className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "What is the price range of JMC in ICO?",
      answer: "The ICO price ranges from ₹0.01 to ₹4.10 across five phases.",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "How can investors buy Jaimax Coins?",
      answer:
        "Investors can buy using USDT, USDC, XRP, TRX, ADA, or INR (via UPI, PhonePe, Google Pay).",
      icon: <CreditCard className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "Will Jaimax be listed on global exchanges?",
      answer:
        "Yes, plans include listing on PancakeSwap, Uniswap, and major exchanges during later ICO phases.",
      icon: <Globe className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
    {
      question: "Can JMC be used for cross-border payments?",
      answer:
        "Yes, Jaimax enables global, borderless transfers without needing banks or currency conversion.",
      icon: <Globe className="w-5 h-5" />,
      color: "from-teal-400 to-teal-500",
      glow: "shadow-teal-500/50",
    },
  ];

  const leftColumnFaqs = faqs.slice(0, 6);
  const rightColumnFaqs = faqs.slice(6, 12);

  const renderFaqItem = (faq, index, columnOffset = 0) => {
    const actualIndex = index + columnOffset;
    const isOpen = openFaq === actualIndex;
    const isHovered = hoveredIndex === actualIndex;
    const delay = index * 100;

    return (
      <div
        key={actualIndex}
        className={`
          relative group cursor-pointer
          transform transition-all duration-500 ease-out
          ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }
        `}
        style={{
          transitionDelay: `${delay}ms`,
          perspective: "1000px",
        }}
        onMouseEnter={() => setHoveredIndex(actualIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Animated Background Glow */}
        <div
          className={`
            absolute -inset-1 bg-gradient-to-r ${faq.color} rounded-2xl blur-lg
            transition-all duration-500 opacity-0 group-hover:opacity-30
            ${isOpen ? "opacity-40" : ""}
          `}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {isHovered && (
            <>
              <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-float-1" />
              <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-white/70 rounded-full animate-float-2" />
              <div className="absolute bottom-4 left-12 w-1 h-1 bg-white/50 rounded-full animate-float-3" />
              <div className="absolute bottom-8 right-4 w-0.5 h-0.5 bg-white rounded-full animate-float-1" />
            </>
          )}
        </div>

        {/* Main Card */}
        <div
          className={`
            relative bg-gradient-to-br from-white/10 to-white/5 
            backdrop-blur-xl rounded-2xl border overflow-hidden
            transition-all duration-500 ease-out
            ${
              isOpen
                ? "border-white/40 shadow-2xl " + faq.glow
                : "border-white/20 hover:border-white/40"
            }
            ${isHovered && !isOpen ? "scale-[1.02] shadow-xl" : "scale-100"}
          `}
        >
          {/* Question Button */}
          <button
            onClick={() => setOpenFaq(isOpen ? null : actualIndex)}
            className="relative w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors duration-300"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Animated Icon Container */}
              <div
                className={`
                  relative p-3 rounded-xl bg-gradient-to-br ${faq.color} 
                  flex-shrink-0 text-white shadow-lg ${faq.glow}
                  transform transition-all duration-500
                  ${isOpen ? "rotate-0 scale-110" : "rotate-0 scale-100"}
                  ${isHovered ? "scale-110 rotate-3" : ""}
                `}
              >
                {/* Icon Pulse Ring */}
                <div
                  className={`
                    absolute inset-0 rounded-xl bg-gradient-to-br ${faq.color}
                    animate-ping opacity-30
                    ${isOpen || isHovered ? "block" : "hidden"}
                  `}
                />
                <div className="relative z-10">{faq.icon}</div>
              </div>

              {/* Question Text */}
              <span
                className={`
                  font-semibold text-sm sm:text-base leading-tight
                  transition-all duration-300
                  ${
                    isOpen
                      ? "text-white"
                      : "text-white/90 group-hover:text-white"
                  }
                `}
              >
                {faq.question}
              </span>
            </div>

            {/* Animated Chevron */}
            <div
              className={`
                relative w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-500 flex-shrink-0 ml-3
                ${
                  isOpen
                    ? `bg-gradient-to-br ${faq.color} shadow-lg ${faq.glow}`
                    : "bg-white/10 group-hover:bg-white/20"
                }
              `}
            >
              <ChevronDown
                className={`
                  w-5 h-5 text-white transition-all duration-500
                  ${isOpen ? "rotate-180" : "rotate-0"}
                `}
              />
            </div>
          </button>

          {/* Answer Section */}
          <div
            className={`
              grid transition-all duration-500 ease-out
              ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }
            `}
          >
            <div className="overflow-hidden">
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                {/* Answer Card */}
                <div
                  className={`
                    relative p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5
                    border border-white/10
                    transform transition-all duration-500 delay-100
                    ${
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                    }
                  `}
                >
                  {/* Accent Line */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${faq.color}`}
                  />

                  <p className="text-gray-300 leading-relaxed text-sm pl-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Number Badge */}
      </div>
    );
  };

  return (
    <section
      ref={faqRef}
      className="relative min-h-screen px-4 py-20 overflow-hidden bg-gradient-to-b from-[#0a5a61] via-[#085056] to-[#064248]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />

        {/* Floating Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div
          className={`
            text-center mb-16 transform transition-all duration-1000
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }
          `}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/80">Got Questions?</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-6">
            <span className="inline-block animate-title-word-1">
              Frequently
            </span>{" "}
            <span className="inline-block animate-title-word-2">Asked</span>{" "}
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-title-word-3">
              Questions
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Everything you need to know about Jaimax and JMC Coin
          </p>

          {/* Animated Line */}
          <div className="flex justify-center gap-1">
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-line-1" />
            <div className="w-8 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-line-2" />
            <div className="w-4 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-line-3" />
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            {leftColumnFaqs.map((faq, index) => renderFaqItem(faq, index, 0))}
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {rightColumnFaqs.map((faq, index) => renderFaqItem(faq, index, 6))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes float-random {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-40px) translateX(15px);
            opacity: 0.7;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 4s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 5s ease-in-out infinite;
        }
        .animate-float-random {
          animation: float-random 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-title-word-1 {
          animation: fadeSlideUp 0.8s ease-out 0.2s both;
        }
        .animate-title-word-2 {
          animation: fadeSlideUp 0.8s ease-out 0.4s both;
        }
        .animate-title-word-3 {
          animation: fadeSlideUp 0.8s ease-out 0.6s both;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-line-1 {
          animation: lineGrow 0.6s ease-out 0.8s both;
        }
        .animate-line-2 {
          animation: lineGrow 0.6s ease-out 1s both;
        }
        .animate-line-3 {
          animation: lineGrow 0.6s ease-out 1.2s both;
        }

        @keyframes lineGrow {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

const PhasesWheelSection = () => {
  const pinContainerRef = useRef(null);
  const contentContainerRef = useRef(null);
  const wheelSectionRef = useRef(null);
  const smallCircleContainerRef = useRef(null);
  const phaseContentRefs = useRef([]);
  const [activePhase, setActivePhase] = useState(0);
  const [debugInfo, setDebugInfo] = useState({
    progress: 0,
    rotation: 0,
    phase: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      // Kill existing wheel triggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          trigger.vars.id.toString().includes("phases-wheel")
        ) {
          trigger.kill();
        }
      });

      if (
        !smallCircleContainerRef.current ||
        !contentContainerRef.current ||
        !wheelSectionRef.current
      ) {
        console.error("Required refs not found");
        return;
      }

      const wheelHeight = wheelSectionRef.current.offsetHeight;

      const ctx = gsap.context(() => {
        // Pin the content container
        ScrollTrigger.create({
          trigger: contentContainerRef.current,
          endTrigger: pinContainerRef.current,
          start: `top+=${wheelHeight / 2}px center`,
          end: "bottom bottom",
          pin: contentContainerRef.current,
          id: "phases-wheel-pin",
          markers: false,
        });

        // Rotate small circle with snapping
        gsap.to(smallCircleContainerRef.current, {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: contentContainerRef.current,
            endTrigger: pinContainerRef.current,
            start: `top+=${wheelHeight / 2}px center`,
            end: "bottom bottom",
            scrub: 1,
            snap: {
              snapTo: 1 / phases.length,
              duration: { min: 0.2, max: 0.4 },
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              const currentPhase = Math.floor(self.progress * phases.length);
              const clampedPhase = Math.min(currentPhase, phases.length - 1);
              setActivePhase(clampedPhase);

              const currentRotation = gsap.getProperty(
                smallCircleContainerRef.current,
                "rotation"
              );
              setDebugInfo({
                progress: (self.progress * 100).toFixed(1),
                rotation: Math.round(currentRotation),
                phase: clampedPhase + 1,
              });
            },
            id: "phases-wheel-rotation",
          },
        });
      });

      ScrollTrigger.refresh();

      return () => {
        ctx.revert();
      };
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          trigger.vars.id.toString().includes("phases-wheel")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#064248] via-[#7FF2D4] to-[#0AA5A6] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/50 rounded-full filter blur-[128px]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-20 px-4">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white font-semibold text-sm sm:text-base">
            Token Distribution
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
          Investment Phases
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Strategic token release across {phases.length} phases for optimal
          growth
        </p>
      </div>

      {/* Pin Container */}
      <div
        ref={pinContainerRef}
        className="relative"
        style={{ height: "400vh" }}
      >
        <div ref={contentContainerRef} className="w-full">
          <div
            ref={wheelSectionRef}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Wheel Column */}
                <div className="flex justify-center items-center relative order-2 lg:order-1">
                  <div className="relative w-full max-w-[400px] aspect-square">
                    {/* Big Circle SVG */}
                    <svg
                      className="w-full h-full drop-shadow-2xl"
                      viewBox="-10 -10 622 621"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="bigCircleGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(255, 255, 255, 0.3)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(255, 255, 255, 0.08)"
                          />
                        </linearGradient>
                        <filter
                          id="bigCircleShadow"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feDropShadow
                            dx="0"
                            dy="8"
                            stdDeviation="12"
                            floodOpacity="0.4"
                          />
                        </filter>
                      </defs>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 300.5C0 134.5 134.8 0 301 0s301 134.5 301 300.5S467.2 601 301 601A300.7 300.7 0 0 1 0 300.5Zm55.1 0C55.1 436.1 165.2 546 301 546a245.7 245.7 0 0 0 245.9-245.5c0-135.6-110.1-245.5-246-245.5A245.7 245.7 0 0 0 55.2 300.5Z"
                        fill="url(#bigCircleGradient)"
                        filter="url(#bigCircleShadow)"
                        className="opacity-90"
                      />
                    </svg>

                    {/* Small Circle Container (Rotates) */}
                    <div
                      ref={smallCircleContainerRef}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: "center center" }}
                    >
                      <svg
                        className="w-full h-full"
                        viewBox="-10 -10 622 621"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <filter
                            id="smallCircleGlow"
                            x="-100%"
                            y="-100%"
                            width="300%"
                            height="300%"
                          >
                            <feGaussianBlur
                              stdDeviation="4"
                              result="coloredBlur"
                            />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* Outer circle with phase color */}
                        <circle
                          cx="574.5"
                          cy="301.5"
                          r="27.5"
                          fill={phases[activePhase].color}
                          className="transition-all duration-500"
                          filter="url(#smallCircleGlow)"
                        />
                        {/* Inner white circle */}
                        <circle
                          cx="574.5"
                          cy="301.5"
                          r="18.3"
                          fill="white"
                          className="opacity-90"
                        />
                        {/* Phase number */}
                        <text
                          x="574.5"
                          y="310"
                          textAnchor="middle"
                          fill={phases[activePhase].color}
                          fontSize="22"
                          fontWeight="900"
                          className="transition-all duration-500"
                        >
                          {activePhase + 1}
                        </text>
                      </svg>
                    </div>

                    {/* Center phase indicator */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div
                          className="text-7xl md:text-8xl font-black transition-all duration-500"
                          style={{
                            color: `${phases[activePhase].color}20`,
                            textShadow: `0 0 30px ${phases[activePhase].color}40`,
                          }}
                        >
                          {activePhase + 1}
                        </div>
                        <div className="text-sm text-white/50 font-semibold mt-2">
                          of {phases.length}
                        </div>
                      </div>
                    </div>

                    {/* Phase dots indicator */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                      {phases.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index === activePhase
                              ? "w-8 opacity-100"
                              : "w-2 opacity-40"
                          }`}
                          style={{
                            backgroundColor:
                              index === activePhase
                                ? phases[activePhase].color
                                : "#ffffff",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="relative min-h-[500px] flex items-center justify-center order-1 lg:order-2">
                  {phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                        index === activePhase
                          ? "opacity-100 scale-100 z-10"
                          : "opacity-0 scale-95 z-0"
                      }`}
                    >
                      <div className="w-full max-w-md">
                        <div
                          className="bg-white/10 backdrop-blur-xl border-2 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                          style={{
                            borderColor:
                              index === activePhase
                                ? phase.color
                                : "rgba(255,255,255,0.3)",
                            boxShadow:
                              index === activePhase
                                ? `0 0 60px ${phase.color}40`
                                : "",
                          }}
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6">
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-bold ${
                                phase.status === "Live"
                                  ? "bg-green-500 text-white shadow-lg shadow-green-500/50"
                                  : "bg-white/20 text-white border-2 border-white/30"
                              }`}
                            >
                              {phase.status}
                            </span>
                            <div
                              className="p-3 rounded-xl backdrop-blur-sm border-2 transition-all duration-500"
                              style={{
                                backgroundColor: `${phase.color}20`,
                                borderColor: `${phase.color}60`,
                              }}
                            >
                              {phase.icon}
                            </div>
                          </div>

                          {/* Phase Number */}
                          <h3 className="text-5xl font-black text-white mb-2">
                            {phase.phaseNo}
                          </h3>

                          {/* Separator */}
                          <div className="flex gap-2 mb-6">
                            <div
                              className="h-1 w-16 rounded-full transition-all duration-500"
                              style={{ backgroundColor: phase.color }}
                            />
                            <div className="h-1 w-8 bg-white/30 rounded-full" />
                            <div className="h-1 w-4 bg-white/20 rounded-full" />
                          </div>

                          {/* Details */}
                          <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                              <Coins className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                  Total Supply
                                </p>
                                <p className="text-lg font-bold text-white">
                                  {phase.tokens}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <DollarSign className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                              <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                  Price Range
                                </p>
                                <p className="text-sm font-semibold text-white">
                                  {phase.price}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                Phase Progress
                              </span>
                              <span className="text-white text-sm font-bold">
                                {phase.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
                              <div
                                className="h-full rounded-full transition-all duration-1000 shadow-lg"
                                style={{
                                  width: `${phase.progress}%`,
                                  backgroundColor: phase.color,
                                  boxShadow: `0 0 10px ${phase.color}`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                              phase.status === "Live"
                                ? "bg-white text-[#085056] hover:scale-105 hover:shadow-xl"
                                : "bg-white/10 text-gray-400 border-2 border-white/30 cursor-not-allowed"
                            }`}
                            disabled={phase.status !== "Live"}
                            style={{
                              ...(phase.status === "Live" && {
                                boxShadow: `0 10px 30px ${phase.color}40`,
                              }),
                            }}
                          >
                            {phase.button}
                          </button>

                          {/* Footer Info */}
                          <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
                            <span className="text-gray-400 uppercase tracking-wider">
                              Phase {index + 1} • {phases.length} Total
                            </span>
                            {index < phases.length - 1 && (
                              <span className="text-white/50">
                                Scroll for next →
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 py-20 px-4 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Join{" "}
          <span style={{ color: phases[activePhase].color }}>
            Phase {activePhase + 1}
          </span>
          ?
        </h3>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Don't miss out on this exclusive opportunity. Early investors get the
          best returns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="px-8 py-4 bg-white text-[#085056] font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
            style={{ boxShadow: `0 10px 40px ${phases[activePhase].color}60` }}
          >
            Buy Jaimax Coins Now
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

// ============= ANIMATED SECTIONS COMPONENT =============
const AnimatedSections = () => {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const headingsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const splitHeadingsRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const observerRef = useRef(null);
  const containerRef = useRef(null);
  const canScrollAwayRef = useRef(false); // Allow scrolling away after last slide

  const sectionsData = [
    {
      heading: "Blockchain Innovation",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80",
      description: "Powered by Advanced Technology",
    },
    {
      heading: "Secure Investments",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1920&q=80",
      description: "Your Assets Protected",
    },
    {
      heading: "Global Reach",
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1920&q=80",
      description: "Worldwide Community",
    },
    {
      heading: "Smart Contracts",
      image:
        "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=1920&q=80",
      description: "Automated Excellence",
    },
    {
      heading: "DeFi Ecosystem",
      image:
        "https://images.unsplash.com/photo-1640826514546-7d2736c78f1e?w=1920&q=80",
      description: "Decentralized Finance",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          trigger.vars.id.toString().startsWith("animated-section")
        ) {
          trigger.kill();
        }
      });

      if (!containerRef.current) return;

      splitHeadingsRef.current = headingsRef.current.filter(Boolean).map(
        (heading) =>
          new SplitText(heading, {
            type: "chars,words,lines",
            linesClass: "overflow-hidden",
          })
      );

      gsap.set(outerWrappersRef.current.filter(Boolean), { yPercent: 100 });
      gsap.set(innerWrappersRef.current.filter(Boolean), { yPercent: -100 });

      const wrap = gsap.utils.wrap(0, sectionsData.length);

      function gotoSection(index, direction) {
        index = wrap(index);
        animatingRef.current = true;

        const fromTop = direction === -1;
        const dFactor = fromTop ? -1 : 1;
        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => {
            animatingRef.current = false;

            // Check if we're at the last section scrolling down
            if (index === sectionsData.length - 1 && direction === 1) {
              canScrollAwayRef.current = true;
            } else {
              canScrollAwayRef.current = false;
            }
          },
        });

        if (
          currentIndexRef.current >= 0 &&
          sectionsRef.current[currentIndexRef.current]
        ) {
          gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
          tl.to(imagesRef.current[currentIndexRef.current], {
            yPercent: -15 * dFactor,
          }).set(sectionsRef.current[currentIndexRef.current], {
            autoAlpha: 0,
          });
        }

        if (sectionsRef.current[index]) {
          gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });

          tl.fromTo(
            [outerWrappersRef.current[index], innerWrappersRef.current[index]],
            { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
            { yPercent: 0 },
            0
          )
            .fromTo(
              imagesRef.current[index],
              { yPercent: 15 * dFactor },
              { yPercent: 0 },
              0
            )
            .fromTo(
              splitHeadingsRef.current[index]?.chars || [],
              {
                autoAlpha: 0,
                yPercent: 150 * dFactor,
              },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 1,
                ease: "power2",
                stagger: {
                  each: 0.02,
                  from: "random",
                },
              },
              0.2
            );
        }

        currentIndexRef.current = index;
      }

      // Custom scroll handler
      const handleScroll = (event) => {
        const delta = event.deltaY || event.detail || -event.wheelDelta;

        // If at last section and scrolling down, allow normal scroll
        if (currentIndexRef.current === sectionsData.length - 1 && delta > 0) {
          if (canScrollAwayRef.current) {
            // Allow normal scroll to next section
            if (observerRef.current) {
              observerRef.current.disable();
            }
            return;
          }
        }

        // If at first section and scrolling up, allow normal scroll
        if (currentIndexRef.current === 0 && delta < 0) {
          return;
        }
      };

      observerRef.current = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => {
          if (currentIndexRef.current === 0) {
            // At first section, allow scrolling up to previous sections
            return;
          }
          if (!animatingRef.current) {
            canScrollAwayRef.current = false;
            gotoSection(currentIndexRef.current - 1, -1);
          }
        },
        onUp: () => {
          if (
            currentIndexRef.current === sectionsData.length - 1 &&
            canScrollAwayRef.current
          ) {
            // At last section and already saw it, allow scroll to next section
            if (observerRef.current) {
              observerRef.current.disable();
            }
            return;
          }
          if (!animatingRef.current) {
            gotoSection(currentIndexRef.current + 1, 1);
          }
        },
        tolerance: 10,
        preventDefault: (self) => {
          // Prevent default only if we're not at boundaries
          if (currentIndexRef.current === 0 && self.deltaY < 0) {
            return false; // Allow scroll up
          }
          if (
            currentIndexRef.current === sectionsData.length - 1 &&
            self.deltaY > 0 &&
            canScrollAwayRef.current
          ) {
            return false; // Allow scroll down to next section
          }
          return true; // Prevent default in all other cases
        },
        target: containerRef.current,
      });

      // Re-enable observer when scrolling back into view
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (observerRef.current) {
                observerRef.current.enable();
                canScrollAwayRef.current = false;
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      if (containerRef.current) {
        intersectionObserver.observe(containerRef.current);
      }

      gotoSection(0, 1);

      ScrollTrigger.refresh();

      return () => {
        intersectionObserver.disconnect();
      };
    }, 400);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.kill();
      }
      splitHeadingsRef.current.forEach((split) => split?.revert());
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id &&
          trigger.vars.id.toString().startsWith("animated-section")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#085056]"
      style={{
        height: "100vh",
        isolation: "isolate",
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sectionsData.map((section, index) => (
          <section
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="absolute top-0 left-0 h-full w-full invisible"
          >
            <div
              ref={(el) => (outerWrappersRef.current[index] = el)}
              className="w-full h-full overflow-y-hidden"
            >
              <div
                ref={(el) => (innerWrappersRef.current[index] = el)}
                className="w-full h-full overflow-y-hidden"
              >
                <div
                  ref={(el) => (imagesRef.current[index] = el)}
                  className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(8, 80, 86, 0.85) 0%, rgba(8, 80, 86, 0.4) 100%), url(${section.image})`,
                    backgroundPosition: section.bgPosition || "center",
                  }}
                >
                  <div className="text-center z-10 px-4">
                    <h2
                      ref={(el) => (headingsRef.current[index] = el)}
                      className="text-[clamp(2.5rem,8vw,8rem)] font-black text-white mb-4"
                      style={{ willChange: "transform" }}
                    >
                      {section.heading}
                    </h2>
                    {section.description && (
                      <p className="text-[clamp(1.2rem,3vw,2.5rem)] text-white/90 font-semibold">
                        {section.description}
                      </p>
                    )}

                    {/* Progress indicator */}
                    <div className="mt-8 flex justify-center gap-2">
                      {sectionsData.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === index ? "w-8 bg-white" : "w-4 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Show "Scroll to continue" on last slide */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

// ============= PARALLAX COMPONENTS =============
const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[100vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-[#085056]/80"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-white">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const SecurityContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-7 pt-1 md:grid-cols-12 bg-[#085056]">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
      Security First Approach
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-gray-300 md:text-2xl">
        Your crypto assets are protected with military-grade encryption and
        multi-layer security protocols.
      </p>
      <p className="mb-8 text-xl text-gray-300 md:text-2xl">
        Real-time monitoring, two-factor authentication, and biometric security
        combine to create an impenetrable fortress.
      </p>
      <button className="w-full rounded-full bg-gradient-to-r from-[#085056] to-[#0a6b73] px-9 py-4 text-xl text-white transition-all hover:shadow-lg hover:shadow-[#085056]/50 hover:scale-105 md:w-fit">
        Explore Security Features <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </div>
);

const InnovationContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 bg-[#085056]">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
      Built for the Future
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-gray-300 md:text-2xl">
        We're building an entire ecosystem from DeFi integration to NFT
        platforms.
      </p>
      <p className="mb-8 text-xl text-gray-300 md:text-2xl">
        Our dedicated development team is constantly innovating to keep Jaimax
        ahead of the curve.
      </p>
      <button className="w-full rounded-full bg-gradient-to-r from-[#085056] to-[#0a6b73] px-9 py-4 text-xl text-white transition-all hover:shadow-lg hover:shadow-[#085056]/50 hover:scale-105 md:w-fit">
        View Roadmap <ArrowRight className="inline ml-2" />
      </button>
    </div>
  </div>
);

const VelocityHero = () => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Fetch data using RTK Query
  const { data: roundData, error, isLoading, refetch } = useGetRoundQuery();

  // Get live rounds (status = 1)
  const liveRounds =
    roundData?.data?.rounds?.filter((round) => round.status === 1) || [];
  const currentRound = liveRounds[0];

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toLocaleString() || "0";
  };

  // Get stats data
  const livePrice = currentRound?.atPriceInr || "0.0000";
  const soldTokens = formatNumber(currentRound?.soldQty || 225765326);
  const liveMembers = formatNumber(currentRound?.totalMembers || 24567);
  const totalSupply = formatNumber(10000000000); // 10B

  // GSAP Scroll Animations
  useEffect(() => {
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (
          text1Ref.current &&
          text2Ref.current &&
          text3Ref.current &&
          text4Ref.current
        ) {
          // Set initial positions
          gsap.set(text1Ref.current, { x: "0%" });
          gsap.set(text2Ref.current, { x: "-10%" });
          gsap.set(text3Ref.current, { x: "0%" });
          gsap.set(text4Ref.current, { x: "-15%" });

          // Animate text 1 - move left
          gsap.to(text1Ref.current, {
            x: "-50%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
              invalidateOnRefresh: true,
            },
          });

          // Animate text 2 - move right
          gsap.to(text2Ref.current, {
            x: "50%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });

          // Animate text 3 - move left
          gsap.to(text3Ref.current, {
            x: "-45%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });

          // Animate text 4 - move right
          gsap.to(text4Ref.current, {
            x: "55%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          });
        }
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  // Handle video load
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadeddata", () => setVideoLoaded(true));
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen md:min-h-[120vh] overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23085056' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source
            src="https://www.shutterstock.com/shutterstock/videos/3738718917/preview/stock-footage-futuristic-digital-globe-of-earth-with-glowing-data-points-network-connections-on-a-dark-background.webm"
            type="video/webm"
          />
        </video>

        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#085056]/80 via-[#085056]/70 to-[#085056]/90"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white rounded-full filter blur-[100px] md:blur-[150px] opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#0a6b73] rounded-full filter blur-[100px] md:blur-[150px] opacity-10"></div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="h-full flex flex-col justify-between py-2 md:py-4">
          {/* First scrolling text */}
          <div className="relative flex-shrink-0">
            <div className="overflow-hidden">
              <div
                ref={text1Ref}
                className="flex whitespace-nowrap"
                style={{ willChange: "transform" }}
              >
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-sm sm:text-lg md:text-2xl lg:text-5xl font-semibold text-white/10 mx-3 md:mx-6">
                      Join India's trusted presale crypto coin • Invest early in
                      Jaimax for secure, smart returns
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second scrolling text */}

          {/* Center content */}
          <div className="relative z-20 flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 my-4 md:my-8">
            <div className="text-center max-w-6xl mx-auto w-full">
              {/* Live Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-4 md:mb-6 shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-white font-bold text-xs md:text-sm lg:text-base uppercase tracking-wider">
                  Live Pre-Sale • Phase {currentRound?.roundNo || 1}
                </span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight px-2"
              >
                <span className="block text-white drop-shadow-2xl">
                  Persistence & Determination
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed font-light px-2"
              >
                India's revolutionary cryptocurrency.{" "}
                <span className="text-white font-semibold">Persistence</span>{" "}
                and{" "}
                <span className="text-white font-semibold">determination</span>{" "}
                alone are omnipotent.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 px-2"
              >
                {/* Live Price */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      `₹${livePrice}`
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider font-semibold">
                    Live Price (INR)
                  </div>
                </div>

                {/* Tokens Sold */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      soldTokens
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider font-semibold">
                    Tokens Sold
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000"
                      style={{
                        width: `${Math.min(
                          ((currentRound?.soldQty || 0) / 10000000000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Active Investors */}
                <div className="group bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      liveMembers
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-200 uppercase tracking-wider font-semibold">
                    Active Investors
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300 px-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Total Supply: {totalSupply}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span>BSC Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span>Verified Contract</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Third scrolling text */}
          <div className="relative flex-shrink-0">
            <div className="overflow-hidden">
              <div
                ref={text3Ref}
                className="flex whitespace-nowrap"
                style={{ willChange: "transform" }}
              >
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-xs sm:text-base md:text-xl lg:text-3xl font-medium text-white/10 mx-3 md:mx-6">
                      Join the Future of Digital Finance
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div
      className={`
    relative overflow-hidden
    rounded-2xl 
    transition-all duration-500 ease-out
    group
    ${
      isActive
        ? "bg-[#e0ecec]/90 backdrop-blur-xl border-2 border-[#b8cc26]  scale-100 opacity-100"
        : "bg-white/55 backdrop-blur-md border border-white/40 shadow-lg scale-95 opacity-75"
    }
    w-full max-w-[500px] sm:max-w-[420px] md:max-w-[460px] lg:min-w-[500px]
    min-h-[120px] sm:min-h-[100px] md:min-h-[110px]
  `}
    >
      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-7">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-5">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <img
              src={testimonial.image}
              title="Trusted Users of jaimax coin"
              className={`
                relative w-24 h-24 md:w-16 md:h-16
                rounded-full object-cover
                transition-all duration-500
                border-2
                ${isActive ? "border-[#b8cc26]" : "border-gray-200"}
              `}
              alt={`${testimonial.name}`}
            />
          </div>

          {/* User Info */}
          <div className="flex-grow min-w-0">
            <h4
              className={`
                text-base md:text-lg font-bold
                transition-colors duration-500
                truncate
                ${isActive ? "text-[#085056]" : "text-gray-700"}
              `}
            >
              {testimonial.name}
            </h4>

            <p className="text-xs text-gray-500 mt-0.5">{testimonial.date}</p>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="relative mb-5">
          {/* Quote Icon */}
          <div
            className={`
            absolute -left-2 -top-2 w-8 h-8
            transition-all duration-500
            ${isActive ? "text-[#b8cc26]/30" : "text-gray-200"}
          `}
          >
            <svg fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>

          <p
            className={`
              text-xs md:text-sm
              leading-relaxed
              pl-8
              transition-all duration-500
              ${isActive ? "text-gray-700" : "text-gray-600"}
            `}
          >
            {testimonial.text}
          </p>
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-700
        bg-gradient-to-br from-[#085056]/5 via-transparent to-[#b8cc26]/5
        pointer-events-none
      `}
      />

      {/* Shimmer Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%]"
        style={{ transition: "transform 1.5s ease-in-out" }}
      />

      {/* Corner Decoration */}
      <div
        className={`
        absolute bottom-0 right-0 w-24 h-24
        transition-opacity duration-500
        ${isActive ? "opacity-100" : "opacity-0"}
      `}
      >
        <svg className="w-full h-full text-[#b8cc26]/10" viewBox="0 0 100 100">
          <circle cx="80" cy="80" r="40" fill="currentColor" />
          <circle
            cx="80"
            cy="80"
            r="25"
            fill="currentColor"
            className="opacity-60"
          />
        </svg>
      </div>
    </div>
  );
};
const BentoGallery = () => {
  const galleryWrapRef = useRef(null);
  const galleryRef = useRef(null);

  const images = [
    "https://i.pinimg.com/736x/54/07/79/5407796d4c71f0e2af99702a30fea41f.jpg",
    "https://i.pinimg.com/1200x/b2/57/fd/b257fd44c315090e0c743427863f55f8.jpg",
    "https://i.pinimg.com/736x/e8/f0/73/e8f07376379f694e5fed8f3e66cefe74.jpg",
    "https://i.pinimg.com/1200x/68/f3/83/68f3838dd7423a0edaf8cd78cbb99532.jpg",
    "https://i.pinimg.com/736x/f3/d7/63/f3d763d085b7a81c8d4d82b71f27c7fa.jpg",
    "https://i.pinimg.com/1200x/92/a9/88/92a988838276b4cfaaae225aff3b9ede.jpg",
    "https://i.pinimg.com/736x/cf/3b/dc/cf3bdcd596bb6aadd00a71799c03195b.jpg",
    "https://i.pinimg.com/736x/c6/91/39/c69139966d1f2671ddef79ff476fc10f.jpg",
    "https://i.pinimg.com/736x/51/b7/ba/51b7bac48af430afbbc955e7279e2b35.jpg",
  ];

  useEffect(() => {
    let flipCtx;

    const createFlipAnimation = () => {
      const galleryElement = galleryRef.current;
      const galleryWrap = galleryWrapRef.current;
      const galleryItems = galleryElement?.querySelectorAll(".gallery-item");

      if (!galleryElement || !galleryItems || galleryItems.length === 0) return;

      if (flipCtx) {
        flipCtx.revert();
      }

      galleryElement.classList.remove("gallery-final");

      flipCtx = gsap.context(() => {
        galleryElement.classList.add("gallery-final");
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove("gallery-final");

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "power2.inOut",
          duration: 1,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "bento-gallery",
            trigger: galleryElement,
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: galleryWrap,
            anticipatePin: 1,
          },
        });

        tl.add(flip);
      }, galleryElement);
    };

    const timer = setTimeout(() => {
      createFlipAnimation();
      ScrollTrigger.refresh();
    }, 200);

    const handleResize = () => {
      createFlipAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      if (flipCtx) {
        flipCtx.revert();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Gallery Section */}
      <div
        ref={galleryWrapRef}
        className="gallery-wrap relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500"
      >
        <div
          ref={galleryRef}
          className="gallery-bento relative w-full h-full flex-none"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security Content Section - Compact Version */}
      <div className="compact-security-section">
        <div className="compact-container">
          {/* Compact Header */}
          <div className="compact-header">
            <span className="compact-badge">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Enterprise Security
            </span>
            <h2 className="compact-title">
              Security We <span className="title-gradient">Provide</span>
            </h2>
            <p className="compact-intro">
              At <a href="https://www.jaimax.com" target="_blank" rel="noopener noreferrer" className="compact-link">Jaimax.com</a>, we deliver enterprise-grade security solutions.
            </p>
          </div>

          {/* Compact Features Grid */}
          <div className="compact-grid">
            {/* DigiLocker */}
            <div className="compact-card">
              <div className="compact-card-header">
                <div className="compact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="compact-card-content">
                  <h3 className="compact-card-title">DigiLocker Integration</h3>
                  <p className="compact-card-desc">Secure government document storage with encryption</p>
                </div>
              </div>
              <ul className="compact-list">
                <li><span className="compact-check">✓</span> Aadhaar verification</li>
                <li><span className="compact-check">✓</span> PAN Card access</li>
                <li><span className="compact-check">✓</span> Driving License</li>
                <li><span className="compact-check">✓</span> Gov-verified</li>
              </ul>
            </div>

            {/* Layer 2 */}
            <div className="compact-card">
              <div className="compact-card-header">
                <div className="compact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="compact-card-content">
                  <h3 className="compact-card-title">Layer 2 on Ethereum</h3>
                  <p className="compact-card-desc">Advanced scaling with reduced fees</p>
                </div>
              </div>
              <ul className="compact-list">
                <li><span className="compact-check">✓</span> Faster processing</li>
                <li><span className="compact-check">✓</span> Lower gas fees</li>
                <li><span className="compact-check">✓</span> Ethereum security</li>
                <li><span className="compact-check">✓</span> Mainnet compatible</li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="compact-card">
              <div className="compact-card-header">
                <div className="compact-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="compact-card-content">
                  <h3 className="compact-card-title">Our Certifications</h3>
                  <p className="compact-card-desc">Industry-recognized standards</p>
                </div>
              </div>
              <div className="compact-badges">
                <span className="mini-badge">ISO 27001</span>
                <span className="mini-badge">SOC 2</span>
                <span className="mini-badge">GDPR</span>
                <span className="mini-badge">PCI DSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const JaimaxLanding = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const trustedSectionRef = useRef(null);
  const phasesRef = useRef(null);
  const phasesContainerRef = useRef(null);
  const securityVideoRef = useRef(null);
  const securityMainVideoRef = useRef(null);
  const securityLeftCardsRef = useRef(null);
  const securityRightCardsRef = useRef(null);
  const roadmapRef = useRef(null);
  const roadmapTimelineRef = useRef(null);
  const faqRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          !trigger.vars.id ||
          !trigger.vars.id.toString().startsWith("card-")
        ) {
          trigger.kill();
        }
      });

      // Hero animations
      if (heroRef.current) {
        const tl = gsap.timeline();
        tl.from(heroRef.current.querySelector(".hero-badge"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        })
          .from(
            heroRef.current.querySelector(".hero-title"),
            {
              opacity: 0,
              y: 50,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            heroRef.current.querySelector(".hero-subtitle"),
            {
              opacity: 0,
              y: 30,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .from(
            heroRef.current.querySelectorAll(".hero-button"),
            {
              opacity: 0,
              y: 30,
              stagger: 0.2,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            heroRef.current.querySelectorAll(".stat-card"),
            {
              opacity: 0,
              scale: 0.8,
              stagger: 0.1,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          );
      }

      // Services section
      if (servicesRef.current) {
        gsap.set(".service-card", {
          x: "100vw",
          scale: 1,
          zIndex: (i) => i + 1,
        });

        const serviceTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "center center",
            end: "+=2000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });

        gsap.utils.toArray(".service-card").forEach((card, index) => {
          const isLastCard = index === services.length - 1;

          serviceTl
            .to(
              card,
              {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
              },
              index * 0.2
            )
            .to(
              card,
              {
                scale: isLastCard ? 1 : 0.85,
                duration: 0.2,
                ease: "power2.out",
              },
              index * 0.2 + 0.3
            );
        });
      }

      // Phases section
      if (phasesRef.current && phasesContainerRef.current) {
        const phasesContainer = phasesContainerRef.current;

        gsap.to(phasesContainer, {
          x: () => -(phasesContainer.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: phasesRef.current,
            start: "top top",
            end: () => `+=${phasesContainer.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // Roadmap section
      if (roadmapRef.current && roadmapTimelineRef.current) {
        const timeline = roadmapTimelineRef.current;
        const scrollWidth = timeline.scrollWidth;

        const horizontalScroll = gsap.to(timeline, {
          x: () => -(scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: roadmapRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".roadmap-card").forEach((card) => {
          const phases = card.querySelectorAll(".phase-item");

          gsap.fromTo(
            card,
            { scale: 0.8, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: "left 80%",
                end: "left 20%",
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            phases,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: "left 60%",
                end: "left 30%",
                scrub: 1,
              },
            }
          );
        });
      }

      // Security section
      if (securityVideoRef.current && securityMainVideoRef.current) {
        const calculateDimensions = () => {
          const initialWidth = Math.min(window.innerWidth * 0.45, 650);
          const finalWidth = Math.min(window.innerWidth * 0.74, 1400);
          const scaleRatio = finalWidth / initialWidth;
          const cardOffset = Math.min(window.innerWidth * 0.34, 550);
          const leftCardsInitialLeft = window.innerWidth * 0.48 - cardOffset;
          const rightCardsInitialRight = window.innerWidth * 0.474 - cardOffset;

          return {
            initialWidth,
            finalWidth,
            scaleRatio,
            leftCardsInitialLeft,
            rightCardsInitialRight,
          };
        };

        const dimensions = calculateDimensions();
        const video = securityMainVideoRef.current;

        gsap.set(video, {
          width: dimensions.initialWidth + "px",
        });

        if (securityLeftCardsRef.current) {
          gsap.set(securityLeftCardsRef.current, {
            left: dimensions.leftCardsInitialLeft + "px",
          });
        }

        if (securityRightCardsRef.current) {
          gsap.set(securityRightCardsRef.current, {
            right: dimensions.rightCardsInitialRight + "px",
          });
        }

        const securityTl = gsap.timeline({
          scrollTrigger: {
            trigger: securityVideoRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 0.3,
          },
          defaults: {
            ease: "none",
          },
        });

        securityTl.fromTo(
          video,
          {
            scale: 1,
            boxShadow: "0px 4px 24px 0px rgba(255, 255, 255, 0.4)",
          },
          {
            scale: dimensions.scaleRatio,
            boxShadow: "0px 8px 48px 0px rgba(255, 255, 255, 0.6)",
          }
        );

        if (securityLeftCardsRef.current) {
          securityTl.fromTo(
            securityLeftCardsRef.current,
            { y: 0 },
            {
              y: "18vh",
              xPercent: -105,
            },
            0
          );
        }

        if (securityRightCardsRef.current) {
          securityTl.fromTo(
            securityRightCardsRef.current,
            { y: 0, xPercent: 0 },
            {
              y: "20vh",
              xPercent: 110,
            },
            0
          );
        }
      }

      // FAQ section
      if (faqRef.current) {
        const faqItems = faqRef.current.querySelectorAll(".faq-item");

        faqItems.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        const id = trigger.vars.id;
        // Don't kill card animations or bento gallery
        if (
          id &&
          (id.toString().startsWith("card-") || id === "bento-gallery")
        ) {
          return; // Skip these
        }
        trigger.kill();
      });
    };
  }, []);

  return (
    <div id="main-content" className="bg-[#085056] text-white">
      <header
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-center"
      >
        <div className="absolute inset-0 w-full h-full">
          <picture>
            <img
              src={homeBgDesktop}
              srcSet={`${homeBgMobile} 767w, ${homeBgDesktop} 1920w`}
              sizes="100vw"
              alt="Secure, innovative, and trustworthy crypto investing with Jaimax"
              title="Jaimax - Your Trusted Partner in Cryptocurrency Investment"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1920"
              height="1080"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 px-4 py-4 mx-auto w-full max-w-9xl">
          <div className="relative w-full min-h-[100dvh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
            <h1
              className="hero-title absolute top-6 left-4 sm:top-10 sm:left-10 font-600 leading-tight 
              text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1"
            >
              <span className="block text-[#b8cc26]">Best Pre-Sale</span>
              <span className="block">Crypto Coin in India</span>
              <span className="block">Invest Early in </span>
              <span className="block"> Jaimax</span>
            </h1>

            <p
              className="hero-subtitle absolute bottom-6 right-4 sm:bottom-10 sm:right-10
              text-white text-sm sm:text-base md:text-lg lg:text-xl 
              font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4"
            >
              Our advanced platform simplifies your pre-sale crypto investment
              journey, offering a secure and transparent experience to help you
              grow with India's most trusted
              <b className="text-[#aadc32]">
                <a href="https://www.jaimax.com"> pre-sale crypto coin</a>
              </b>{" "}
              - jaimax.
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hero-button block ml-auto mt-4 font-bold text-center
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
      <AnimatedSections />
      <VelocityHero />
      <PhasesWheelSection />
      {/* Services Section */}
      <section
        ref={servicesRef}
        className="min-h-screen relative px-4 py-20 bg-gradient-to-b from-[#085056] via-[#0a5a61] to-[#064248] flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions for your crypto journey
            </p>
          </div>

          <div
            className="relative w-full max-w-4xl mx-auto"
            style={{ height: "450px" }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/30"
                style={{
                  transformOrigin: "center center",
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="w-20 h-20 mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <img
                      src={service.icon}
                      alt={service.iconAlt}
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Parallax Sections */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop"
        subheading="Security"
        heading="Bank-Level Protection"
      >
        <SecurityContent />
      </TextParallaxContent>
      {/* Testimonials Section */}
      <section className="py-2  relative overflow-hidden">
        <div className="relative z-10 py-1 md:py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <section className="py-0 bg-[#085056] relative overflow-hidden">
              {/* Animated Background Elements */}
              <motion.div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `linear-gradient(rgba(184, 204, 38, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(184, 204, 38, 0.3) 1px, transparent 1px)`,
                      backgroundSize: "50px 50px",
                    }}
                  ></div>
                </div>
              </motion.div>

              {/* Main Content */}
              <div className="relative z-10 py-16 md:py-20 lg:py-24">
                <div className="container max-w-7xl mx-auto px-4">
                  {/* Header Section */}
                  <motion.div className="text-center mb-12 md:mb-16">
                    {/* Badge */}
                    <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                      <span className="w-2 h-2 bg-[#b8cc26] rounded-full animate-pulse"></span>
                      <span className="text-white/90 text-sm font-medium">
                        Presale Live Now
                      </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                      Trusted by Thousands of Crypto Investors
                    </motion.h2>

                    {/* Description */}
                    <motion.p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                      Join the most successful crypto presale of 2025. Our
                      community of early investors has already generated over{" "}
                      <span className="text-[#b8cc26] font-semibold">
                        $50M in verified returns
                      </span>
                      . Secure your position in the next generation of
                      blockchain innovation.
                    </motion.p>
                  </motion.div>

                  {/* Carousel Section */}
                  <div className="relative">
                    <div className="relative" style={{ overflow: "visible" }}>
                      <Swiper
                        modules={[
                          Navigation,
                          Pagination,
                          Autoplay,
                          EffectCoverflow,
                        ]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        loop={true}
                        speed={600}
                        coverflowEffect={{
                          rotate: 0,
                          stretch: 80,
                          depth: 200,
                          modifier: 1,
                          slideShadows: false,
                        }}
                        autoplay={{
                          delay: 4000,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }}
                        navigation={{
                          nextEl: ".owl-next",
                          prevEl: ".owl-prev",
                        }}
                        pagination={{
                          el: ".owl-dots",
                          clickable: true,
                          dynamicBullets: false,
                        }}
                        onSlideChange={(swiper) => {
                          setActiveIndex(swiper.realIndex);
                        }}
                        onSwiper={(swiper) => {
                          setActiveIndex(swiper.realIndex);
                        }}
                        className="!overflow-visible !py-8"
                        style={{
                          paddingBottom: "80px",
                        }}
                        breakpoints={{
                          320: {
                            slidesPerView: 1,
                            coverflowEffect: {
                              rotate: 0,
                              stretch: 0,
                              depth: 0,
                              modifier: 1,
                            },
                          },
                          768: {
                            slidesPerView: 2,
                            coverflowEffect: {
                              rotate: 0,
                              stretch: 50,
                              depth: 100,
                              modifier: 1,
                            },
                          },
                          1024: {
                            slidesPerView: 3,
                            coverflowEffect: {
                              rotate: 0,
                              stretch: 80,
                              depth: 200,
                              modifier: 1,
                            },
                          },
                        }}
                      >
                        {testimonials.map((testimonial, index) => (
                          <SwiperSlide
                            key={testimonial.id}
                            style={{ width: "100%", maxWidth: "600px" }}
                          >
                            {({ isActive, isPrev, isNext, isVisible }) => (
                              <motion.div
                                className={`
                          transition-all duration-500
                          ${
                            !isActive && !isPrev && !isNext
                              ? "invisible opacity-0"
                              : "visible opacity-100"
                          }
                        `}
                              >
                                <TestimonialCard
                                  testimonial={testimonial}
                                  isActive={isActive}
                                />
                              </motion.div>
                            )}
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    {/* Navigation Buttons */}
                    <div className=" absolute -bottom-8 left-0 right-0 flex justify-center items-center gap-4 md:gap-6 pointer-events-none z-[100] ">
                      <motion.button
                        type="button"
                        role="presentation"
                        className="owl-prev pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-[#b8cc26] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
                      >
                        <span
                          aria-label="Previous"
                          className="text-4xl md:text-5xl font-thin leading-none block -mt-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-arrow-left-icon lucide-arrow-left"
                          >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                          </svg>{" "}
                        </span>
                      </motion.button>
                      <motion.button
                        type="button"
                        role="presentation"
                        className="owl-next pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-[#b8cc26] text-white border border-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
                      >
                        <span
                          aria-label="Next"
                          className="text-4xl md:text-5xl font-thin leading-none block -mt-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-arrow-right-icon lucide-arrow-right"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </span>
                      </motion.button>
                    </div>

                    {/* Pagination Dots */}

                    <div className=" mt-4 "></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        subheading="Innovation"
        heading="The Future is Here"
      >
        <InnovationContent />
      </TextParallaxContent>
      {/* Roadmap Section */}
      <section
        ref={roadmapRef}
        className="relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#085056] via-[#064248] to-[#042a2e] overflow-hidden"
      >
        {/* Header - Slightly smaller */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-[#085056]/95 to-transparent backdrop-blur-sm py-6 px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
            Roadmap
          </h2>
        </div>

        {/* Timeline Container - Reduced padding and gap */}
        <div
          ref={roadmapTimelineRef}
          className="flex items-center h-screen pt-24 pb-16 px-6 gap-5"
        >
          {Object.entries(roadmapData).map(([year, data], index) => {
            const config = statusConfig[data.status];

            return (
              <div
                key={year}
                className="roadmap-card flex-shrink-0 w-[300px] sm:w-[340px] relative"
              >
                {/* Connector Line - Smaller */}
                {index < Object.keys(roadmapData).length - 1 && (
                  <div className="absolute top-1/2 -right-5 w-5 h-0.5 bg-gradient-to-r from-white/50 to-transparent transform -translate-y-1/2 z-0"></div>
                )}

                {/* Card - Compact */}
                <div
                  className={`relative bg-white/5 backdrop-blur-xl border ${config.borderColor} rounded-2xl p-4 sm:p-5 h-[420px] flex flex-col hover:shadow-2xl ${config.glowColor} transition-all duration-500 group`}
                >
                  {/* Header Section - Compact */}
                  <div className="relative mb-4">
                    {/* Icon Badge - Smaller */}
                    <div
                      className={`absolute -top-8 -left-8 w-14 h-14 sm:w-16 sm:h-16 ${config.badgeColor} rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-xl border-3 border-[#085056] group-hover:scale-110 transition-transform duration-300`}
                    >
                      {config.icon}
                    </div>

                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl sm:text-4xl font-bold text-white ml-8 sm:ml-10">
                        {year}
                      </h2>
                      <span
                        className={`${config.badgeColor} ${
                          config.badgeColor === "bg-white"
                            ? "text-[#085056]"
                            : "text-white"
                        } px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider`}
                      >
                        {config.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title - Smaller */}
                  <h3
                    className={`text-base sm:text-lg font-bold ${config.textColor} mb-4 group-hover:scale-105 transition-transform duration-300 line-clamp-1`}
                  >
                    {data.title}
                  </h3>

                  {/* Progress Bar - Compact */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-gray-400 text-xs font-medium">
                        Progress
                      </span>
                      <span className={`${config.textColor} text-xs font-bold`}>
                        {data.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                      <div
                        className={`h-full ${config.badgeColor} rounded-full transition-all duration-1000 shadow-lg`}
                        style={{ width: `${data.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Phases List - Compact */}
                  <div className="space-y-2 overflow-y-auto flex-1 pr-1.5 custom-scrollbar">
                    {data.phases.map((phase, phaseIndex) => (
                      <div
                        key={phaseIndex}
                        className="phase-item text-gray-300 leading-snug hover:text-white transition-colors duration-300 text-xs sm:text-sm flex items-start gap-2"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${config.badgeColor} mt-1.5 flex-shrink-0`}
                        ></span>
                        <span>{phase}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer - Compact */}
                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                      Phase {index + 1} of {Object.keys(roadmapData).length}
                    </span>
                    {index < Object.keys(roadmapData).length - 1 && (
                      <span className="text-white/70 animate-pulse text-sm">
                        →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* End Card - Compact */}
          <div className="flex-shrink-0 w-64 sm:w-72 h-[420px] flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl sm:text-5xl mb-3">🚀</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                The Journey Continues
              </h3>
              <p className="text-gray-400 text-sm">
                Stay tuned for more updates
              </p>
            </div>
          </div>
        </div>
      </section>
      <BentoGallery />
      <JaimaxFAQ />
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        /* Initial state */
        /* Bento Gallery Styles */
        .gallery-bento {
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .gallery-bento.gallery-final {
          grid-template-columns: repeat(3, 100vw) !important;
          grid-template-rows: repeat(4, 49.5vh) !important;
          gap: 1vh;
        }

        .gallery-item {
          background-position: 50% 50%;
          background-size: cover;
          flex: none;
          position: relative;
        }

        .gallery-item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .gallery-item:nth-child(1) {
          grid-area: 1 / 1 / 3 / 2;
        }
        .gallery-item:nth-child(2) {
          grid-area: 1 / 2 / 2 / 3;
        }
        .gallery-item:nth-child(3) {
          grid-area: 2 / 2 / 4 / 3;
        }
        .gallery-item:nth-child(4) {
          grid-area: 1 / 3 / 3 / 4;
        }
        .gallery-item:nth-child(5) {
          grid-area: 3 / 1 / 4 / 2;
        }
        .gallery-item:nth-child(6) {
          grid-area: 3 / 3 / 5 / 4;
        }
        .gallery-item:nth-child(7) {
          grid-area: 4 / 1 / 5 / 2;
        }
        .gallery-item:nth-child(8) {
          grid-area: 4 / 2 / 5 / 3;
        }

        @media (max-width: 768px) {
          .gallery-bento {
            grid-template-columns: repeat(2, 45vw);
            grid-template-rows: repeat(4, 20vh);
          }

          .gallery-bento.gallery-final {
            grid-template-columns: repeat(2, 95vw) !important;
            grid-template-rows: repeat(4, 45vh) !important;
          }
        }
      /* ===== COMPACT SECURITY SECTION ===== */

.compact-security-section {
  position: relative;
  padding: 3rem 1rem;
  background: linear-gradient(
    180deg,
    #0d9488 0%,
    #14b8a6 15%,
    #5eead4 30%,
    #99f6e4 45%,
    #ccfbf1 60%,
    #f0fdfa 75%,
    #ffffff 90%,
    #f0fdfa 100%
  );
  overflow: hidden;
}

.compact-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 10;
}

/* ===== COMPACT HEADER ===== */

.compact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.compact-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0d9488;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);
  margin-bottom: 1rem;
  animation: badge-float 3s ease-in-out infinite;
}

.compact-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  animation: title-pulse 4s ease-in-out infinite;
}

.title-gradient {
  background: linear-gradient(
    90deg,
    #ffffff,
    #f0fdfa,
    #ccfbf1,
    #f0fdfa,
    #ffffff
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: title-shimmer 4s linear infinite;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
}

.compact-intro {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.compact-link {
  color: #ffffff;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.5);
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
  transition: all 0.3s ease;
  animation: link-glow 3s ease-in-out infinite;
}

.compact-link:hover {
  text-decoration-color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* ===== COMPACT GRID ===== */

.compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

/* ===== COMPACT CARD ===== */

.compact-card {
  position: relative;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  box-shadow: 
    0 4px 6px -1px rgba(13, 148, 136, 0.1),
    0 2px 4px -1px rgba(13, 148, 136, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.compact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.compact-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 10px 15px -3px rgba(13, 148, 136, 0.2),
    0 4px 6px -2px rgba(13, 148, 136, 0.1);
  border-color: rgba(20, 184, 166, 0.3);
}

.compact-card:hover::before {
  opacity: 1;
}

/* ===== CARD HEADER ===== */

.compact-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.compact-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  animation: icon-pulse 3s ease-in-out infinite;
}

.compact-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
  stroke-width: 2.5;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
}

.compact-card-content {
  flex: 1;
  min-width: 0;
}

.compact-card-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  background: linear-gradient(
    90deg,
    #134e4a,
    #0d9488,
    #14b8a6,
    #0d9488,
    #134e4a
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: card-title-flow 5s linear infinite;
}

.compact-card-desc {
  font-size: 0.8125rem;
  color: #5f7d7b;
  line-height: 1.4;
}

/* ===== COMPACT LIST ===== */

.compact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.compact-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #4b6462;
  transition: transform 0.2s ease;
}

.compact-card:hover .compact-list li {
  transform: translateX(2px);
}

.compact-check {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.15));
  border-radius: 50%;
  color: #0d9488;
  font-size: 0.625rem;
  font-weight: 700;
  animation: check-bounce 2s ease-in-out infinite;
}

/* ===== COMPACT BADGES ===== */

.compact-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.mini-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background: linear-gradient(135deg, rgba(240, 253, 250, 0.9), rgba(204, 251, 241, 0.9));
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0f766e;
  transition: all 0.3s ease;
  animation: badge-pulse 3s ease-in-out infinite;
}

.mini-badge:nth-child(1) { animation-delay: 0s; }
.mini-badge:nth-child(2) { animation-delay: 0.3s; }
.mini-badge:nth-child(3) { animation-delay: 0.6s; }
.mini-badge:nth-child(4) { animation-delay: 0.9s; }

.mini-badge:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(204, 251, 241, 1), rgba(153, 246, 228, 1));
  border-color: rgba(20, 184, 166, 0.4);
  box-shadow: 0 2px 8px rgba(20, 184, 166, 0.2);
}

/* ===== COMPACT STATS ===== */

.compact-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.125rem;
  background: linear-gradient(
    90deg,
    #14b8a6,
    #0d9488,
    #06b6d4,
    #0ea5e9,
    #06b6d4,
    #0d9488,
    #14b8a6
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: stat-flow 5s linear infinite;
}

.stat-item:nth-child(2) .stat-value { animation-delay: 0.5s; }
.stat-item:nth-child(4) .stat-value { animation-delay: 1s; }
.stat-item:nth-child(6) .stat-value { animation-delay: 1.5s; }

.stat-label {
  font-size: 0.75rem;
  color: #5f7d7b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background: linear-gradient(180deg, transparent, rgba(20, 184, 166, 0.3), transparent);
  justify-self: center;
  animation: divider-pulse 2s ease-in-out infinite;
}

/* ===== ANIMATIONS ===== */

@keyframes badge-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}

@keyframes title-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}

@keyframes title-shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes link-glow {
  0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.3); }
  50% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.6); }
}

@keyframes icon-pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 4px 20px rgba(20, 184, 166, 0.5);
    transform: scale(1.05);
  }
}

@keyframes card-title-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes check-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes badge-pulse {
  0%, 100% {
    background: linear-gradient(135deg, rgba(240, 253, 250, 0.9), rgba(204, 251, 241, 0.9));
  }
  50% {
    background: linear-gradient(135deg, rgba(204, 251, 241, 1), rgba(153, 246, 228, 0.9));
  }
}

@keyframes stat-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 300% 50%; }
}

@keyframes divider-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ===== RESPONSIVE ===== */

@media (max-width: 768px) {
  .compact-security-section {
    padding: 2rem 1rem;
  }

  .compact-grid {
    grid-template-columns: 1fr;
  }

  .compact-list {
    grid-template-columns: 1fr;
  }

  .compact-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-divider {
    display: none;
  }

  .compact-card {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .compact-title {
    font-size: 1.5rem;
  }

  .compact-stats {
    grid-template-columns: 1fr;
  }

  .compact-badges {
    justify-content: center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
      `}</style>
    </div>
  );
};

export default JaimaxLanding;

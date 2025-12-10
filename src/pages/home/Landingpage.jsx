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
import {
  FaShieldAlt,
  FaRocket,
  FaGlobe,
  FaArrowRight ,
  FaLock,
  FaChartLine,
  FaUsers,
  FaGem,
  FaCheckCircle,
  FaBolt,
  FaCube ,
  FaHandshake,
  FaCubes,
  FaLightbulb,
  FaPlay ,
  FaArrowUp ,
  FaMobileAlt ,
  FaBell ,
  FaChartArea ,
  FaGooglePlay ,
  FaApple ,
  FaArrowDown 
} from "react-icons/fa";
import { motion, useScroll, useTransform, useInView,useSpring,AnimatePresence  } from "framer-motion";
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
// import ContactForm from "../components/Contact";
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
    icon: "✓", // Keep this one as it's functional
  },
  active: {
    badge: "In Progress",
    badgeColor: "bg-white",
    borderColor: "border-white",
    glowColor: "shadow-white/30",
    textColor: "text-white",
    bgGradient: "from-white/10 to-[#085056]/20",
    icon: "◉", // Simple circle dot
  },
  future: {
    badge: "Upcoming",
    badgeColor: "bg-[#085056]",
    borderColor: "border-white/50",
    glowColor: "shadow-white/20",
    textColor: "text-white",
    bgGradient: "from-[#085056]/20 to-white/10",
    icon: "◯", // Simple circle outline
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
  const [activePhase, setActivePhase] = useState(0);
  const [debugInfo, setDebugInfo] = useState({
    progress: 0,
    rotation: 0,
    phase: 0,
  });

  // Teal color constants
  const tealColors = {
    main: "#0fcbcc",
    dark: "#064248",
    medium: "#0a6972",
    light: "#8cdfe0", 
    bg: "#054248"
  };

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
    <section className="relative overflow-hidden bg-[#054248]">
      {/* Wavy Background */}
      <div className="absolute inset-0 opacity-25 overflow-hidden">
        <svg 
          className="absolute top-0 left-0 w-full"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: "30%" }}
        >
          <path 
            fill={tealColors.main} 
            fillOpacity="0.3"
            d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,208C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
        
        <svg 
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: "30%" }}
        >
          <path 
            fill={tealColors.main} 
            fillOpacity="0.3"
            d="M0,64L60,96C120,128,240,192,360,192C480,192,600,128,720,117.3C840,107,960,149,1080,170.7C1200,192,1320,192,1380,181.3L1440,171L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        
        <svg 
          className="absolute top-1/2 left-0 w-full transform -translate-y-1/2"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: "40%" }}
        >
          <path 
            fill={tealColors.main} 
            fillOpacity="0.1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-10 pb-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#053137] mb-3">
          <div className="w-1.5 h-1.5 bg-[#0fcbcc] rounded-full animate-pulse"></div>
          <span className="text-white font-medium text-xs">Token Distribution</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
          Investment Phases
        </h2>
        <p className="text-sm text-white/80 max-w-lg mx-auto">
          Strategic token release across {phases.length} phases
        </p>
      </div>

      {/* Pin Container */}
      <div
        ref={pinContainerRef}
        className="relative"
        style={{ height: "320vh" }}
      >
        <div ref={contentContainerRef} className="w-full">
          <div
            ref={wheelSectionRef}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-8 lg:gap-x-6">
                {/* Wheel Column */}
                <div className="lg:col-span-2 flex justify-center items-center relative order-2 lg:order-1">
                  <div className="relative w-full max-w-[300px] aspect-square">
                    {/* Outer glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg opacity-30"
                      style={{ backgroundColor: tealColors.main }}
                    ></div>

                    {/* Outer Decorative Rings */}
                    <div className="absolute inset-0 rounded-full border-4 border-[#0a6972] opacity-20"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-[#0fcbcc] opacity-30"></div>
                    
                    {/* Main Circle Background */}
                    <div className="absolute inset-4 rounded-full bg-[#05363b] border border-[#0fcbcc]"></div>
                    
                    {/* Rotating indicators */}
                    <div
                      ref={smallCircleContainerRef}
                      className="absolute inset-0 w-full h-full"
                      style={{ transformOrigin: "center center" }}
                    >
                      {/* Ticks around the circle */}
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute top-0 left-1/2 -ml-0.5 h-2 w-1 bg-white/20"
                          style={{ 
                            transformOrigin: "bottom center",
                            transform: `rotate(${i * 30}deg) translateY(10px)`
                          }}
                        ></div>
                      ))}
                      
                      {/* Orbiting circle */}
                      <div 
                        className="absolute"
                        style={{ 
                          top: '2%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          filter: 'drop-shadow(0 0 8px rgba(15, 203, 204, 0.5))'
                        }}
                      >
                        <div 
                          className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: tealColors.main }}
                        >
                          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                            <span 
                              className="text-xl font-bold"
                              style={{ color: tealColors.main }}
                            >
                              {activePhase + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div
                          className="text-5xl sm:text-6xl font-black"
                          style={{
                            color: tealColors.main,
                          }}
                        >
                          {activePhase + 1}
                        </div>
                        <div className="text-xs font-medium mt-1 text-white/90">
                          of {phases.length}
                        </div>
                      </div>
                    </div>

                    {/* Phase dots */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                      {phases.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            index === activePhase ? "w-7 opacity-100" : "w-2.5 opacity-40"
                          }`}
                          style={{
                            backgroundColor: index === activePhase
                              ? tealColors.main
                              : "#ffffff"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* TEAL & WHITE CARD DESIGN */}
                <div className="lg:col-span-3 relative flex items-center justify-center order-1 lg:order-2">
                  {phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                        index === activePhase
                          ? "opacity-100 transform-none z-10"
                          : "opacity-0 translate-y-8 z-0"
                      }`}
                    >
                      <div className="w-full max-w-lg px-4">
                        {/* Clean teal and white card */}
                        <div className="overflow-hidden rounded-2xl shadow-2xl">
                          {/* Header with teal background */}
                          <div 
                            className="py-5 px-6 bg-[#0fcbcc]"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="inline-flex items-center px-2 py-1 rounded bg-white/20 text-xs text-white font-medium mb-2">
                                  {phase.status === "Live" && (
                                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                                  )}
                                  {phase.status}
                                </div>
                                <h3 className="text-2xl font-bold text-white">Phase {phase.phaseNo}</h3>
                                <p className="text-white/80 text-sm mt-1">Investment Round {index + 1}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                                  <div className="text-2xl font-bold text-[#0fcbcc]">{phase.phaseNo}</div>
                                </div>
                                <div className="bg-white/20 p-2.5 rounded-lg">
                                  {React.cloneElement(phase.icon, { className: "w-5 h-5 text-white" })}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Main Content Area - White Background */}
                          <div className="bg-white p-6">
                            {/* Progress bar */}
                            <div className="mb-6">
                              <div className="flex justify-between mb-2">
                                <div className="text-[#064248] font-medium">Progress</div>
                                <div className="text-[#0fcbcc] font-bold">{phase.progress}%</div>
                              </div>
                              <div className="h-2.5 w-full bg-[#e7f9f9] rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full"
                                  style={{ 
                                    width: `${phase.progress}%`,
                                    backgroundColor: tealColors.main
                                  }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Key metrics */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="p-3 rounded-xl border border-[#e7f9f9] bg-[#f7fdfd]">
                                <div className="text-[#0a6972] text-xs font-medium mb-1">Total Supply</div>
                                <div className="flex items-center">
                                  <Coins className="w-4 h-4 mr-2 text-[#0fcbcc]" />
                                  <div className="text-[#064248] font-bold">{phase.tokens}</div>
                                </div>
                              </div>
                              
                              <div className="p-3 rounded-xl border border-[#e7f9f9] bg-[#f7fdfd]">
                                <div className="text-[#0a6972] text-xs font-medium mb-1">Price Range</div>
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-2 text-[#0fcbcc]" />
                                  <div className="text-[#064248] font-bold">{phase.price}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3 mb-4">
                              <button
                                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                                  phase.status === "Live"
                                    ? "hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                                    : "opacity-60 cursor-not-allowed"
                                }`}
                                disabled={phase.status !== "Live"}
                                style={{
                                  backgroundColor: tealColors.main,
                                  boxShadow: phase.status === "Live" ? `0 4px 14px 0 ${tealColors.main}30` : "none"
                                }}
                              >
                                {phase.button}
                              </button>
                              
                              <button
                                className="px-4 py-3 rounded-xl border border-[#e7f9f9] hover:bg-[#f7fdfd] text-[#0a6972]"
                              >
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>
                            </div>
                            
                            {/* Footer */}
                            <div className="flex justify-between items-center text-sm text-[#0a6972]">
                              <div>
                                Phase {index + 1} of {phases.length}
                              </div>
                              {index < phases.length - 1 && (
                                <div className="flex items-center cursor-pointer group text-[#0fcbcc]">
                                  <span>Next Phase</span>
                                  <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    className="ml-1 transition-transform group-hover:translate-x-0.5 text-[#0fcbcc]"
                                  >
                                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
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
    </section>
  );
};



// Animated text component for letter-by-letter animation
const AnimatedText = ({ text }) => {
  const words = text.split(" ");

  return (
    <span className="inline-flex flex-wrap justify-center gap-x-4">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: wordIndex * 0.1 + charIndex * 0.03,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="inline-block hover:text-white/80 transition-colors cursor-default"
              whileHover={{ scale: 1.2, color: "#4ade80" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};


const SecurityContent = () => (
  <div className="mx-auto max-w-4xl px-6 py-20 text-center">
    
    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
      Security First <span className="text-teal-300">Approach</span>
    </h2>

    {/* Paragraphs */}
    <p className="mb-5 text-xl md:text-2xl text-gray-200 leading-relaxed">
      Your crypto assets are protected with military-grade encryption and
      multi-layer security protocols to safeguard every transaction.
    </p>


    {/* Button */}
    <button className="rounded-full bg-gradient-to-r mt-10 from-[#085056] to-[#0a6b73] px-10 py-4 text-xl text-white font-semibold shadow-md hover:shadow-[#0a6b73]/50 hover:scale-105 transition-all duration-300">
      Explore Security Features 
      <ArrowRight className="inline ml-2" />
    </button>
  </div>
);

const SecuritySec=()=> {
  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          'linear-gradient(rgba(17, 30, 31, 0.85),rgba(71, 78, 79, 0.85))), url("https://i.pinimg.com/736x/69/d2/c1/69d2c1763cf91e13adad4f6069b283bc.jpg")',
      }}
    >
      <SecurityContent />
    </div>
  );
}

const VelocityHero = () => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Contract address - replace with your actual contract address
  const CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";
  const BSCSCAN_URL = `https://bscscan.com/token/${CONTRACT_ADDRESS}`;

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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


          {/* Center content */}
          <div className="relative z-20 flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 my-4 md:my-8">
            <div className="text-center max-w-6xl mx-auto w-full">
              {/* Live Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-slate-800 border border-slate-700 mb-4 md:mb-6 shadow-xl"
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-black mb-4 md:mb-6 leading-tight px-2"
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
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 px-2 mb-6"
              >
                {/* Live Price */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-slate-600 hover:bg-slate-750 transition-all duration-300 shadow-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      `₹${livePrice}`
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Live Price (INR)
                  </div>
                </div>

                {/* Tokens Sold */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-slate-600 hover:bg-slate-750 transition-all duration-300 shadow-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      soldTokens
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Tokens Sold
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
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
                <div className="bg-slate-800 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-slate-600 hover:bg-slate-750 transition-all duration-300 shadow-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 md:mb-2 drop-shadow-lg">
                    {isLoading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      liveMembers
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Active Investors
                  </div>
                </div>
              </motion.div>

              {/* Contract Address Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-slate-900 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 mx-2 shadow-xl"
              >
                <div className="text-center">
                  <h3 className="text-white font-bold text-sm md:text-base mb-4 uppercase tracking-wider">
                    Contract Address
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {/* Contract Address Display */}
                    <div className="flex items-center bg-slate-800 rounded-lg px-4 py-3 border border-slate-600 min-w-0 flex-1 max-w-md">
                      <span className="text-gray-300 text-xs md:text-sm font-mono truncate">
                        {`${CONTRACT_ADDRESS}`}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {/* Copy Button */}
                      <button
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 text-xs md:text-sm font-semibold shadow-lg ${
                          copied 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {copied ? (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>

                      {/* BSCscan Button */}
                      <a
                        href={BSCSCAN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg transition-all duration-200 text-xs md:text-sm font-semibold shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                        </svg>
                        BSCscan
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300 px-2"
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
  const securityContentRef = useRef(null);

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

  const securityFeatures = [
    {
      icon: "🔒",
      title: "End-to-End Encryption",
      description: "Military-grade encryption protects your data and transactions.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: "🛡️",
      title: "Multi-Factor Authentication",
      description: "Advanced security layers ensure only you can access your account.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🔐",
      title: "Cold Storage",
      description: "Your assets are stored offline in bank-grade security vaults.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: "⚡",
      title: "Real-time Monitoring",
      description: "24/7 threat detection and instant alerts for suspicious activity.",
      color: "from-orange-500 to-red-600"
    }
  ];

  useEffect(() => {
    let flipCtx;

    const createFlipAnimation = () => {
      const galleryElement = galleryRef.current;
      const galleryWrap = galleryWrapRef.current;
      const galleryItems = galleryElement?.querySelectorAll(".gallery-item");
      const securityContent = securityContentRef.current;

      if (!galleryElement || !galleryItems || galleryItems.length === 0) return;

      if (flipCtx) {
        flipCtx.revert();
      }

      galleryElement.classList.remove("gallery-final");

      flipCtx = gsap.context(() => {
        gsap.set(securityContent, {
          opacity: 0,
          y: -200,
          scale: 0.8,
          display: "none"
        });

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
            end: "+=300%",
            scrub: true,
            pin: galleryWrap,
            anticipatePin: 1,
          },
        });

        tl.add(flip);
        tl.to({}, { duration: 2 });
        tl.set(securityContent, { display: "block" }, "+=1");
        
        tl.to(securityContent, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out"
        }, "-=0.2");

        const securityCards = securityContent?.querySelectorAll(".security-card");
        if (securityCards) {
          tl.fromTo(securityCards, 
            {
              y: -60,
              opacity: 0,
              rotationX: -20
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out"
            }, "-=1"
          );
        }

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

        {/* Security Content Overlay */}
        <div
          ref={securityContentRef}
          className="absolute top-0 left-0 right-0 pointer-events-none z-20"
          style={{ display: "none" }}
        >
          <div className="bg-gradient-to-b from-slate-900/95 via-slate-800/80 to-transparent pt-6 pb-20 px-6">
            <div className="max-w-6xl mx-auto pointer-events-auto">
              {/* Security Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-xl mb-4">
                  <span className="text-2xl">🔐</span>
                  <span className="text-lg font-bold text-gray-800">Bank-Grade Security</span>
                </div>
                <p className="text-lg text-white max-w-2xl mx-auto">
                  Your assets protected by industry-leading security measures
                </p>
              </div>

              {/* Security Features Grid - New Card Style */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {securityFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="security-card group relative transform hover:-translate-y-3 transition-all duration-500"
                  >
                    {/* Clean White Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                      
                      {/* Gradient accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon with gradient background */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-white text-xl font-bold">
                            {feature.icon}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight group-hover:text-gray-900">
                          {feature.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-700">
                          {feature.description}
                        </p>
                      </div>

                      {/* Subtle pattern overlay */}
                      <div className="absolute top-4 right-4 w-8 h-8 opacity-5">
                        <div className="w-full h-full bg-current rounded-full" />
                      </div>
                      
                      {/* Hover glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center mt-8">
                <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <span>Learn More About Security</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex justify-center items-center gap-6 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
                  <span className="text-white text-xs font-medium">🏛️ Bank Partners</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
                  <span className="text-white text-xs font-medium">🔍 Security Audited</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
                  <span className="text-white text-xs font-medium">🛡️ Fully Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ReviewsSection = () => {
  const googleReviewUrl = "https://g.page/r/CdDTqJnUq_5LEBE/review";
  const trustpilotReviewUrl =
    "https://www.trustpilot.com/review/jaimax.com?utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

  const handleGoogleClick = () => {
    window.open(googleReviewUrl, "_blank");
  };

  const handleTrustpilotClick = () => {
    window.open(trustpilotReviewUrl, "_blank");
  };

  return (
    <div
      className="w-full py-8 md:py-16 px-4"
      style={{ backgroundColor: "#085056" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4">
            Your trust means everything to us. Read what our customers have to
            say about their experience with Jaimax.
          </p>
          <div className="mt-4 md:mt-6">
            <p className="text-sm md:text-base text-white/80 font-medium">
              Share your experience and help others discover Jaimax
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="rounded-2xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {/* Section 1: 800+ Reviews on Google */}
            <div
              className="text-center pb-4 md:pb-0 border-b bg-[#ffff] md:border-b-0 md:border-r border-gray-200 cursor-pointer transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50"
              onClick={handleGoogleClick}
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
                40+ Reviews
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-base md:text-lg">on Google</span>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <div className="flex justify-center gap-0.5 md:gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click to leave a review
              </p>
            </div>

            {/* Section 2: Google Rating */}
            <div className="text-center bg-[#ffff] cursor-pointer transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50 pb-4 md:pb-3 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex justify-center gap-0.5 md:gap-1 mb-2 md:mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 md:w-8 md:h-8"
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-base md:text-lg font-semibold text-gray-700">
                  Google Rating
                </span>
              </div>
              <p className="text-xs text-gray-500">Rate your experience</p>
            </div>

            {/* Section 3: Trustpilot Rating */}
            <div
              className="cursor-pointer bg-[#ffff] transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50"
              onClick={handleTrustpilotClick}
            >
              <div className="flex flex-col items-center gap-2">
                {/* Trustpilot Stars */}
                <div className="text-[#00b67a] text-2xl md:text-3xl tracking-tight">
                  ★★★★★
                </div>

                {/* Trustpilot Logo */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm md:text-base font-bold text-gray-800">
                    Review Us On{" "}
                    <span className="text-[#00b67a]">Trustpilot</span>
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Help others by sharing your experience
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-10">
          <p className="text-white/90 text-sm md:text-base">
            We appreciate every review. Your feedback helps us improve and
            guides others in their journey.
          </p>
        </div>
      </div>
    </div>
  );
};


const HorizontalRoadmap = () => {
  const containerRef = useRef(null);
  const roadmapRef = useRef(null);
  
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

  // Convert the object into an array for easier mapping
  const roadmapArray = Object.keys(roadmapData).map((year) => ({
    year,
    ...roadmapData[year]
  }));

  // Status styling configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          badge: "Completed",
          badgeColor: "bg-teal-600",
          borderColor: "border-teal-500",
          bgColor: "from-teal-50 to-teal-100/50",
          iconColor: "text-teal-600",
          progressColor: "bg-teal-500",
          progressBg: "bg-teal-200/50",
          icon: "✓"
        };
      case 'active':
        return {
          badge: "In Progress",
          badgeColor: "bg-teal-500",
          borderColor: "border-teal-400",
          bgColor: "from-teal-50 to-teal-100/40",
          iconColor: "text-teal-500",
          progressColor: "bg-teal-400",
          progressBg: "bg-teal-200/40",
          icon: "◉"
        };
      default:
        return {
          badge: "Upcoming",
          badgeColor: "bg-teal-700/50",
          borderColor: "border-teal-300/50",
          bgColor: "from-teal-50/70 to-teal-100/30",
          iconColor: "text-teal-600/50",
          progressColor: "bg-teal-300/50",
          progressBg: "bg-teal-100/50",
          icon: "○"
        };
    }
  };

  useEffect(() => {
    // Clean up previous instances
    const cleanup = () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === "roadmapScroller") {
          trigger.kill();
        }
      });
    };

    // Initialize ScrollTrigger with delay to ensure DOM is ready
    const timer = setTimeout(() => {
      cleanup();

      const container = containerRef.current;
      const roadmap = roadmapRef.current;

      if (!container || !roadmap) return;

      // Calculate the total width to ensure we can see all years
      const totalWidth = roadmap.scrollWidth;
      const viewportWidth = container.offsetWidth;
      const scrollDistance = Math.max(0, totalWidth - viewportWidth);

      // Set initial state for items
      gsap.set(".roadmap-card", {
        opacity: 0.6,
        y: 20,
        scale: 0.95
      });

      // Create horizontal scroll animation
      gsap.to(roadmap, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          id: "roadmapScroller",
          trigger: container,
          start: "top center",
          end: `+=${scrollDistance + 300}`, // Add extra distance for smoother scrolling
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            // Make cards more prominent as they come into view
            const cards = document.querySelectorAll(".roadmap-card");
            const containerCenter = viewportWidth / 2;
            const scrollX = self.progress * scrollDistance;
            
            cards.forEach((card, i) => {
              // Get the card's center position relative to the viewport
              const cardRect = card.getBoundingClientRect();
              const cardCenterX = cardRect.left + (cardRect.width / 2) - container.getBoundingClientRect().left;
              
              // Calculate distance from center (normalized)
              const distFromCenter = Math.abs(cardCenterX - containerCenter) / (viewportWidth / 2);
              const activeAmount = Math.max(0, 1 - distFromCenter);
              
              // Apply animations based on position
              gsap.to(card, {
                opacity: 0.6 + (activeAmount * 0.4),
                y: 20 * (1 - activeAmount),
                scale: 0.95 + (activeAmount * 0.05),
                duration: 0.3
              });
              
              // Animate phase items when card is active
              const phaseItems = card.querySelectorAll(".phase-item");
              if (activeAmount > 0.7) {
                gsap.to(phaseItems, {
                  opacity: 1,
                  x: 0,
                  stagger: 0.05,
                  duration: 0.3
                });
              } else {
                gsap.to(phaseItems, {
                  opacity: 0.7,
                  x: -10,
                  duration: 0.3
                });
              }
            });
          }
        }
      });
      
      // Pre-set phase items
      gsap.set(".phase-item", {
        opacity: 0.7,
        x: -10
      });
      
      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, 600);

    // Resize handler
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-teal-50/40 to-teal-100/20 py-16 md:py-20 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/60 text-teal-700 text-sm font-medium mb-4">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
          <span>Strategic Timeline</span>
        </div>
        <h2 className="text-4xl font-bold text-teal-800 mb-4">
          Our Roadmap to Success
        </h2>
        <p className="text-teal-700 max-w-2xl">
          Follow Jaimax's journey from concept to global presence - our strategic path to revolutionize digital finance
        </p>
      </div>

      {/* Roadmap Container */}
      <div 
        ref={containerRef}
        className="relative h-[600px] overflow-hidden"
      >
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-teal-50/40 to-transparent"></div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-teal-50/40 to-transparent"></div>
        
        <div 
          ref={roadmapRef}
          className="flex items-center h-full px-[10vw] gap-12 md:gap-16 lg:gap-20"
          style={{ width: 'max-content', paddingTop: '0', paddingBottom: '0' }}
        >
          {/* Timeline Bar */}
          <div className="absolute top-1/2 left-0 h-3 bg-gradient-to-r from-teal-200/30 via-teal-300/40 to-teal-200/30 rounded-full z-0"
               style={{ width: '100%', transform: 'translateY(-50%)' }}/>
          
          {roadmapArray.map((item, index) => {
            const statusConfig = getStatusConfig(item.status);
            
            return (
              <div key={index} className="roadmap-card relative flex-shrink-0 w-[300px] md:w-[350px]">
                {/* Year Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-24 z-20">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-b ${statusConfig.bgColor} border-4 ${statusConfig.borderColor} flex items-center justify-center shadow-lg`}>
                    <div className="text-center">
                      <div className={`text-xl font-bold ${statusConfig.iconColor}`}>{item.year}</div>
                      <div className={`text-xs ${item.status === 'future' ? 'text-teal-600/50' : 'text-teal-500'}`}>
                        {statusConfig.icon}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Card */}
                <div className="relative mt-0 bg-gradient-to-br from-teal-50/80 to-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-teal-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-teal-100/60 to-teal-50/60 p-4 border-b border-teal-200/50">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg md:text-xl font-bold text-teal-800">{item.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig.badgeColor}`}>
                        {statusConfig.badge}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-teal-700 font-medium">Progress</span>
                        <span className={item.status === 'future' ? 'text-teal-600/50' : 'text-teal-700'}>
                          {item.progress}%
                        </span>
                      </div>
                      <div className={`h-2.5 w-full rounded-full ${statusConfig.progressBg}`}>
                        <div 
                          className={`h-full rounded-full ${statusConfig.progressColor} transition-all duration-1000 ease-out`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-5 text-left max-h-[300px] overflow-y-auto custom-scrollbar">
                    <h4 className="text-sm font-semibold text-teal-700 mb-3">Key Developments:</h4>
                    <ul className="space-y-2.5 text-sm">
                      {item.phases.map((phase, phaseIndex) => (
                        <li 
                          key={phaseIndex} 
                          className="phase-item text-teal-800/90 leading-tight"
                        >
                          <span>{phase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Dot on timeline */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className={`w-5 h-5 rounded-full ${item.status === 'active' ? 'bg-teal-400' : item.status === 'completed' ? 'bg-teal-500' : 'bg-teal-300/50'} border-4 border-white/80 ${item.status === 'active' ? 'animate-pulse' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center text-teal-700 bg-teal-100/50 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm border border-teal-200/50">
          <span className="mr-2">Scroll to explore our journey</span>
          <div className="animate-bounce">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 118, 110, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 118, 110, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 118, 110, 0.3);
        }
      `}</style>
    </div>
  );
};


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
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale: smoothScale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(8, 80, 86, 0.9) 0%,
              rgba(8, 80, 86, 0.6) 50%,
              rgba(8, 80, 86, 0.8) 100%
            )
          `,
          opacity,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <FloatingParticles />
      <CornerDecorations opacity={opacity} />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </motion.div>
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const CornerDecorations = ({ opacity }) => {
  return (
    <>
      <motion.div className="absolute top-8 left-8" style={{ opacity }}>
        <motion.div
          className="w-20 h-20 border-l-2 border-t-2 border-white/30 rounded-tl-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      <motion.div className="absolute top-8 right-8" style={{ opacity }}>
        <motion.div
          className="w-20 h-20 border-r-2 border-t-2 border-white/30 rounded-tr-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      <motion.div className="absolute bottom-8 left-8" style={{ opacity }}>
        <motion.div
          className="w-20 h-20 border-l-2 border-b-2 border-white/30 rounded-bl-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <motion.div className="absolute bottom-8 right-8" style={{ opacity }}>
        <motion.div
          className="w-20 h-20 border-r-2 border-b-2 border-white/30 rounded-br-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 3 }}
        />
      </motion.div>
    </>
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
  const scale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.8, 1, 0.8]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        y: smoothY,
        opacity,
        scale: smoothScale,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-8 rounded-full"
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span
          className="text-2xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.span>
        <p className="text-center text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-white/90">
          {subheading}
        </p>
        <motion.span
          className="text-2xl"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.span>
      </motion.div>

      <div className="relative">
        <motion.h2
          className="text-center text-5xl md:text-8xl font-bold tracking-tight"
          style={{
            textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          {heading}
        </motion.h2>

        <motion.div
          className="absolute -bottom-4 left-1/2 h-1 bg-white rounded-full"
          style={{ x: "-50%" }}
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.div
          className="absolute -bottom-4 left-1/2 h-1 bg-white rounded-full blur-md"
          style={{ x: "-50%" }}
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

// ==================== JAIMAX CONTENT SECTION ====================

const JaimaxContent = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <BackgroundElements />

      {/* Main Content */}
      <div className="relative z-10">

        {/* Introduction Section */}
        <IntroductionSection />

        {/* Features Grid */}
        <FeaturesSection />

        {/* Security Section */}
        <SecuritySection />

        {/* Ecosystem Section */}
        <EcosystemSection />

        {/* App section */}
        <AppSection/>
      </div>
    </div>
  );  
};

const BackgroundElements = () => {
  return (
    <>
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
};

const IntroductionSection = () => {
  const words = ["Innovation", "Transparency", "Stability", "Growth"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 bg-white overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#085056]"
          />
        </svg>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#14b8a6 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px'
        }} />
        
        {/* Gradient Blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side - Creative Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Main Card Stack */}
              <div className="relative">
                {/* Back Card */}
                <motion.div
                  animate={{ rotate: [6, 8, 6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl transform rotate-6"
                />
                
                {/* Middle Card */}
                <motion.div
                  animate={{ rotate: [3, 4, 3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl transform rotate-3"
                />
                
                {/* Front Card */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">J</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">JAIMAX</p>
                        <p className="text-gray-400 text-xs">Premium Crypto</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                      <span className="text-green-400 text-xs font-medium">Live</span>
                    </div>
                  </div>

                  {/* Coin Display */}
                  <div className="relative flex justify-center py-8">
                    {/* Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-32 h-32 rounded-full bg-teal-500/30 blur-2xl"
                      />
                    </div>
                    
                    {/* 3D Coin */}
                    <motion.div
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative"
                    >
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-300 to-teal-500 flex items-center justify-center border-4 border-teal-200/30">
                          <span className="text-white font-black text-3xl">JMX</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Price Section */}
                  <div className="text-center mb-6">
                    <p className="text-gray-400 text-sm mb-1">Current Price</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-white text-3xl font-bold">₹0.50</span>
                      <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold flex items-center gap-1">
                        <FaArrowUp className="text-[10px]" />
                        12.5%
                      </span>
                    </div>
                  </div>



                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 5" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements Around Card */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-14 h-14 rounded-2xl bg-white shadow-xl shadow-teal-100 flex items-center justify-center border border-teal-100"
              >
                <FaChartLine className="text-teal-500 text-xl" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-white shadow-xl shadow-teal-100 flex items-center justify-center border border-teal-100"
              >
                <FaShieldAlt className="text-teal-500 text-lg" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-1/2 -left-8 w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg flex items-center justify-center"
              >
                <FaRocket className="text-white text-sm" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-1/4 -right-4 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg flex items-center justify-center"
              >
                <FaGem className="text-white text-xs" />
              </motion.div>

              {/* India Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white rounded-full shadow-xl shadow-teal-100 border border-teal-100 flex items-center gap-2"
              >
                <span className="text-2xl">🇮🇳</span>
                <span className="text-gray-800 font-bold text-sm">Made in India</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-teal-700 text-sm font-semibold">
                India's #1 Pre-Sale Crypto
              </span>
            </motion.div>

            {/* Animated Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Built for{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
                <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full origin-left"
                />
              </span>
            </h2>

            {/* Main Content */}
            <div className="space-y-6">
              {/* First Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative pl-6 border-l-4"
                style={{ borderImage: "linear-gradient(to bottom, #14b8a6, #06b6d4) 1" }}
              >
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  In the evolving world of digital finance,{" "}
                  <span className="font-bold text-gray-900">Jaimax Coin</span> has emerged as{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 font-bold text-teal-600">
                      India's best pre-sale crypto coin
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-teal-100 -z-0" />
                  </span>
                  , built for investors who value innovation, transparency, and long-term stability.
                </p>
              </motion.div>

              {/* Second Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />
                <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    As India embraces{" "}
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white shadow-sm text-teal-600 font-semibold">
                      <FaCube className="text-sm" /> blockchain technology
                    </span>{" "}
                    and{" "}
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white shadow-sm text-cyan-600 font-semibold">
                      <FaGlobe className="text-sm" /> decentralized finance
                    </span>
                    , Jaimax is shaping the future of how people invest and grow wealth.
                  </p>
                </div>
              </motion.div>

              {/* Third Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border-2 border-teal-200 shadow-lg shadow-teal-100/50"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center"
                >
                  <FaGem className="text-2xl text-white" />
                </motion.div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  More than just a crypto coin, Jaimax represents{" "}
                  <span className="font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    a new era of secure, accessible, and rewarding investments
                  </span>{" "}
                  for everyone.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: FaHandshake,
      title: "Trust",
      description: "Built on transparency and backed by a reputable company",
    },
    {
      icon: FaCubes,
      title: "Technology", 
      description: "Advanced blockchain infrastructure for secure transactions",
    },
    {
      icon: FaChartLine,
      title: "Opportunity",
      description: "Early access to India's most promising crypto project",
    },
    {
      icon: FaBolt,
      title: "Fast Transactions",
      description: "Lightning-fast processing with minimal fees",
    },
    {
      icon: FaShieldAlt,
      title: "Strong Security",
      description: "Industry-leading encryption and protection",
    },
    {
      icon: FaGlobe,
      title: "Transparent Model",
      description: "Simple and clear investment structure",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 px-4 bg-[#085056] overflow-hidden">
      {/* Underwater lighting effect */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          animate={{ 
            opacity: [0.5, 0.7, 0.5], 
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-full h-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(0,240,255,0.2), transparent 70%)"
          }}
        />
        <motion.div
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-full h-full"
          style={{
            background: "radial-gradient(circle at 70% 60%, rgba(0,240,255,0.15), transparent 60%)"
          }}
        />
      </div>
      
      {/* Bubbles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm border border-white/40"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
            }}
            animate={{
              y: "-10%",
              x: `calc(${Math.random() * 20 - 10}% + ${Math.sin(Math.random() * Math.PI) * 50}px)`,
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 20,
            }}
          />
        ))}
      </div>
      
      {/* Ocean floor texture */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#06424a]/50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ocean-floor" x="0" y="0" width="80" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 Q10,15 20,10 Q30,5 40,10 Q50,15 60,10 Q70,5 80,10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ocean-floor)" />
        </svg>
      </div>
      
      {/* Swimming fish silhouettes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          initial={{
            x: i % 2 === 0 ? "-10%" : "110%",
            y: 100 + (i * 100),
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            x: i % 2 === 0 ? "110%" : "-10%",
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="100" height="40" viewBox="0 0 100 40" fill="white">
            <path d="M20,20 Q30,5 50,5 Q70,5 80,20 Q70,35 50,35 Q30,35 20,20 Z" />
            <path d="M80,20 L95,10 L95,30 Z" />
            <circle cx="30" cy="15" r="2" />
          </svg>
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block relative">
              <span className="w-3 h-3 rounded-full bg-white absolute -left-6 top-1/2 transform -translate-y-1/2"></span>
              <span className="text-white/70 uppercase tracking-widest text-sm font-medium">Why Choose Jaimax</span>
              <span className="w-3 h-3 rounded-full bg-white absolute -right-6 top-1/2 transform -translate-y-1/2"></span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              <span>Dive into the </span>
              <span className="relative inline-block">
                Future
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    d="M0,6 C50,-10 150,20 200,6" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.5)" 
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Explore the depths of our innovative blockchain technology that's transforming the way India invests in cryptocurrency.
          </motion.p>
        </div>
        
        {/* Features Display - Hexagonal Layout */}
        <div className="relative">
          {/* Central logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-40 h-40 rounded-full bg-white/10 backdrop-blur-md items-center justify-center"
          >
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <span className="text-white font-bold text-4xl">JMX</span>
            </div>
            
            {/* Pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-white/30"
            />
            <motion.div
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-white/20"
            />
          </motion.div>
          
          {/* Mobile Central Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="lg:hidden flex mx-auto mb-12 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md items-center justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <span className="text-white font-bold text-3xl">JMX</span>
            </div>
          </motion.div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-all duration-500 opacity-80"></div>
                
                <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 h-full transform transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/15 overflow-hidden">
                  {/* Wave Animation Inside Card */}
                  <div className="absolute inset-x-0 bottom-0 h-16 opacity-20">
                    <motion.div
                      animate={{ 
                        x: [-100, 100],
                        y: [0, 5, 0]
                      }}
                      transition={{
                        x: { duration: 10, repeat: Infinity, repeatType: "mirror" },
                        y: { duration: 5, repeat: Infinity, repeatType: "mirror" }
                      }}
                    >
                      <svg width="300" height="50" viewBox="0 0 300 50" preserveAspectRatio="none">
                        <path 
                          d="M0,25 C50,10 100,40 150,25 C200,10 250,40 300,25 L300,50 L0,50 Z" 
                          fill="white"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon with glow effect */}
                    <div className="w-16 h-16 flex items-center justify-center relative mb-5">
                      <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-md group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative bg-[#06424a] rounded-full w-14 h-14 flex items-center justify-center border border-white/30 group-hover:border-white/50 transition-colors">
                        <feature.icon className="text-white text-2xl" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-white text-xl font-bold mb-3 group-hover:text-white/90">{feature.title}</h3>
                    <p className="text-white/70 mb-4 group-hover:text-white/80 transition-colors">{feature.description}</p>
                    
                    {/* Bottom Reveal Animation */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-0.5 bg-gradient-to-r from-white/80 to-white/20 rounded-full"
                      />
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaArrowRight className="text-white text-xs" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated Light Reflection */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-45 rounded-2xl"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Seaweed/Coral Decoration */}
        <div className="absolute -bottom-10 left-10 opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                rotateZ: [0, 5, -5, 0],
                scaleY: [1, 1.02, 0.98, 1]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-0"
              style={{
                left: `${i * 15}px`,
                height: `${80 + Math.random() * 60}px`,
                width: '10px',
                background: 'linear-gradient(to top, white, transparent)',
                borderRadius: '0 0 10px 10px',
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </div>
        
        {/* Coral Right Side */}
        <div className="absolute -bottom-5 right-20 opacity-20">
          <motion.div
            animate={{ 
              scaleY: [1, 1.05, 0.95, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
            style={{
              height: '60px',
              width: '80px',
            }}
          >
            <svg viewBox="0 0 100 70" fill="white">
              <path d="M10,70 C0,40 30,30 20,0 C40,20 50,10 60,0 C65,30 85,20 90,0 C95,30 100,40 90,70 Z" />
            </svg>
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(255,255,255,0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white px-10 py-4 rounded-full text-[#085056] font-bold text-lg shadow-lg shadow-white/10 relative overflow-hidden group"
          >
            <motion.span
              initial={{ y: 0, opacity: 1 }}
              whileHover={{ y: -30, opacity: 0 }}
              className="inline-block"
            >
              Explore Features
            </motion.span>
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              Dive Deeper <FaArrowRight className="ml-2" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: FaLock,
      title: "Advanced Encryption",
      description: "Every transaction protected by blockchain encryption",
    },
    {
      icon: FaShieldAlt,
      title: "Full Transparency",
      description: "Zero manipulation with complete transaction visibility",
    },
    {
      icon: FaCheckCircle,
      title: "Industry Standards",
      description: "Following industry-leading safety and compliance protocols",
    },
  ];

  return (
    <section className="relative py-20 px-4 md:px-8 bg-white overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#085056]"
          />
        </svg>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#085056]"
          />
        </svg>
      </div>


      {/* Floating Bubbles/Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-teal-100/40 blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full bg-teal-300/20 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Security Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-teal-300"
              />

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-teal-400"
              />

              {/* Inner Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 rounded-full border-2 border-dashed border-teal-500"
              />

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-2xl shadow-teal-500/40"
                >
                  <FaShieldAlt className="text-5xl text-white" />
                </motion.div>
              </div>

              {/* Floating Icons */}
              {[
                { icon: FaLock, position: "top-0 left-1/2 -translate-x-1/2" },
                { icon: FaCheckCircle, position: "bottom-0 left-1/2 -translate-x-1/2" },
                { icon: FaGlobe, position: "left-0 top-1/2 -translate-y-1/2" },
                { icon: FaCubes, position: "right-0 top-1/2 -translate-y-1/2" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className={`absolute ${item.position} w-12 h-12 rounded-xl bg-white border-2 border-teal-200 flex items-center justify-center shadow-lg shadow-teal-100`}
                >
                  <item.icon className="text-xl text-teal-600" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Security at the{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                Heart
              </span>
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Security remains at the heart of the Jaimax ecosystem. Investors can
              buy, hold, and trade Jaimax confidently, knowing that the platform
              follows industry-leading standards for safety and compliance.
            </p>

            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-teal-100 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-200">
                    <feature.icon className="text-xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const EcosystemSection = () => {
  const ecosystemItems = [
    { label: "DeFi", icon: FaChartLine },
    { label: "NFTs", icon: FaGem },
    { label: "dApps", icon: FaCubes },
    { label: "Education", icon: FaLightbulb },
    { label: "Community", icon: FaUsers },
    { label: "Innovation", icon: FaRocket },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#085056] overflow-hidden relative">


      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <motion.div
          initial={{ opacity: 0.05 }}
          animate={{
            opacity: [0.03, 0.05, 0.03],
            backgroundPosition: ["0px 0px", "50px 50px"]
          }}
          transition={{
            opacity: { duration: 5, repeat: Infinity },
            backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: ["-10%", "110%"],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-2 h-2 rounded-full bg-white/30"
          />
        ))}

        {/* Gradient Blobs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.2, 0.1],
            x: [-50, 50, -50],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1], 
            opacity: [0.15, 0.25, 0.15],
            x: [30, -30, 30],
            y: [10, -10, 10]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-teal-200/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10 mt-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-sm font-medium tracking-wide">COMPLETE SOLUTION</span>
          </motion.div>
          
          {/* Heading with Wavy Underline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative inline-block">
            Complete Blockchain{" "}
            <span className="relative inline-block">
              <span className="text-teal-200">
                Ecosystem
              </span>
              <motion.svg 
                width="100%" 
                height="10" 
                viewBox="0 0 200 10" 
                className="absolute -bottom-4 left-0"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M0,5 Q40,0 80,5 T160,5 T240,5"
                  fill="none"
                  stroke="url(#ecosystemGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                />
                <defs>
                  <linearGradient id="ecosystemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#a7f3d0" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-teal-100/80 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Unlike most projects that focus only on trading, Jaimax is creating a
            complete blockchain ecosystem where investors, developers, and learners
            come together.
          </motion.p>
        </motion.div>

        {/* Ecosystem Diagram with Connection Lines */}
        <div className="relative mb-20">
          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative z-20 w-32 h-32 bg-white rounded-full mx-auto mb-16 flex items-center justify-center shadow-xl shadow-white/20"
          >
            <div className="text-[#085056] font-bold text-xl">JAIMAX</div>
            {/* Pulsing ring animation */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-white/30"
            />
            <motion.div
              animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-white/20"
            />
          </motion.div>

          {/* Connection lines with animated dashes - we'll create these with SVG */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <svg className="w-full h-full max-w-2xl max-h-64" viewBox="0 0 500 150">
              {/* Lines from center to each item */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const radius = 90; // Adjust based on layout
                const x = 250 + radius * Math.cos(angle);
                const y = 75 + radius * Math.sin(angle);
                
                return (
                  <motion.line
                    key={i}
                    x1="250" y1="75"
                    x2={x} y2={y}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                    className="animate-dash"
                  />
                );
              })}
              
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#a7f3d0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Ecosystem Items in a Circle */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-20">
            {ecosystemItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1), type: "spring" }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-1 bg-white/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Card container */}
                <div className="relative bg-[#06424a] shadow-xl rounded-2xl p-6 text-center border border-white/10 group-hover:border-white/30 transition-all duration-300 h-full flex flex-col items-center backdrop-blur-md">
                  {/* Icon container with background wave */}
                  <div className="relative w-16 h-16 mb-4">
                    {/* Background wave */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path
                        d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
                        fill="url(#iconGrad)"
                        animate={{
                          d: [
                            "M0,50 Q25,40 50,50 T100,50 V100 H0 Z",
                            "M0,50 Q25,60 50,50 T100,50 V100 H0 Z",
                            "M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
                          ]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                      <defs>
                        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a7f3d0" />
                          <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center"
                    >
                      <item.icon className="text-2xl text-[#085056]" />
                    </motion.div>
                  </div>
                  
                  {/* Label */}
                  <span className="text-white font-semibold mb-2">{item.label}</span>
                  
                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="h-0.5 bg-white/60 mx-auto rounded-full mt-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 mt-10 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="ecosystem-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L40 20 M20 0 L20 40" stroke="#ffffff" strokeWidth="0.5" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#ecosystem-pattern)" />
            </svg>
          </div>
          
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed relative z-10 text-center">
            The Jaimax Coin is built to handle{" "}
            <motion.span 
              className="relative inline-block text-teal-200 font-semibold px-1"
              whileHover={{ scale: 1.05 }}
            >
              real-world utility
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-200/30"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
              />
            </motion.span>{" "}
            — from DeFi and NFTs to decentralized applications — ensuring that each
            coin holds{" "}
            <motion.span 
              className="relative inline-block text-teal-200 font-semibold px-1"
              whileHover={{ scale: 1.05 }}
            >
              long-term value
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-200/30" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
              />
            </motion.span>{" "}
            beyond speculation.
          </p>
          
          {/* Call to action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-[#085056] font-bold py-3 px-8 rounded-xl shadow-lg shadow-black/20 relative overflow-hidden group"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-200/30 to-transparent -skew-x-45"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Ecosystem</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 20;
          }
        }
        .animate-dash {
          animation: dash 20s linear infinite;
        }
      `}</style>
    </section>
  );
};
const AppSection = () => {
  const appFeatures = [
    { 
      icon: FaMobileAlt, 
      title: "Real-time Trading", 
      description: "Monitor prices and execute trades from anywhere, anytime" 
    },
    { 
      icon: FaBell, 
      title: "Price Alerts", 
      description: "Set custom alerts for price movements and market trends" 
    },
    { 
      icon: FaChartArea, 
      title: "Live Analytics", 
      description: "Advanced charts and technical indicators at your fingertips" 
    },
    { 
      icon: FaShieldAlt, 
      title: "Secure Wallet", 
      description: "Industry-leading security for your digital assets" 
    }
  ];

  return (
    <section className="py-24 px-4 md:px-4 bg-[#085056] overflow-hidden relative">


      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.4 + 0.2,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: ["-20%", "120%"],
              x: [
                `${parseFloat(Math.random() * 10 - 5 + i * 5)}%`,
                `${parseFloat(Math.random() * 10 - 5 + i * 5)}%`
              ],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-3 h-3 rounded-full bg-white/20"
          />
        ))}

        {/* Gradient Blobs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.2, 0.1],
            x: [-50, 50, -50],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-300/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2], 
            opacity: [0.15, 0.25, 0.15],
            x: [30, -30, 30],
            y: [10, -10, 10]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-200/10 blur-3xl"
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - App Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-sm font-medium tracking-wide">MOBILE ACCESS</span>
            </motion.div>
            
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Jaimax in 
              <span className="relative ml-2">
                <span className="text-teal-200">Your Pocket</span>
                <motion.svg 
                  width="100%" 
                  height="10" 
                  viewBox="0 0 200 10" 
                  className="absolute -bottom-3 left-0"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <motion.path
                    d="M0,5 Q40,0 80,5 T160,5 T240,5"
                    fill="none"
                    stroke="url(#pocketGradient)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                  />
                  <defs>
                    <linearGradient id="pocketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#a7f3d0" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </h2>
            
            <p className="text-teal-100/80 text-lg mb-8 leading-relaxed">
              Access the complete Jaimax ecosystem on-the-go with our powerful and secure mobile app. Trade, monitor, and manage your crypto investments from anywhere in the world.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              {/* Google Play - Available */}
              <motion.a 
                href="#download-android"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaGooglePlay className="text-[#085056] text-2xl" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">GET IT ON</span>
                  <span className="text-[#085056] font-bold">Google Play</span>
                </div>
              </motion.a>
              
              {/* App Store - Coming Soon */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 bg-white/20 border border-white/30 backdrop-blur-sm px-6 py-3 rounded-xl relative overflow-hidden group"
              >
                <FaApple className="text-white text-2xl" />
                <div className="flex flex-col">
                  <span className="text-xs text-teal-100">DOWNLOAD ON THE</span>
                  <span className="text-white font-bold">App Store</span>
                </div>
                {/* Coming Soon Badge */}
                <div className="absolute right-0 top-0 bg-white text-[#085056] text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Coming Soon
                </div>
              </motion.div>
            </div>

          </motion.div>
          
          {/* Right Content - Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[600px] max-w-[300px] mx-auto">
              {/* Background Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 rounded-full border-2 border-dashed border-white/30 absolute"
                />
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-40 h-40 rounded-full bg-white/5 blur-lg absolute"
                />
              </div>
              
              {/* Main Phone Mockup */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 bg-gray-900 w-[280px] h-[580px] rounded-[3rem] shadow-2xl border-8 border-gray-800 mx-auto overflow-hidden"
              >
                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-t-3xl flex items-center justify-center">
                  <div className="w-20 h-4 rounded-full bg-black border border-gray-800" />
                </div>
                
                {/* App Screenshot */}
                <div className="absolute top-6 bottom-0 inset-x-0 bg-[#085056] overflow-hidden">
                  {/* App Header */}
                  <div className="pt-4 px-4 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <span className="text-[#085056] font-bold">J</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-white text-xs">Live</span>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4">
                    <div className="bg-[#06424a] rounded-xl p-3 mb-4">
                      <div className="text-white text-xs mb-1">Current Balance</div>
                      <div className="text-white text-2xl font-bold mb-1">₹75,240.50</div>
                      <div className="flex items-center gap-1 text-teal-200 text-xs">
                        <FaArrowUp className="text-[10px]" />
                        <span>18.24% this month</span>
                      </div>
                    </div>
                    
                    {/* Chart Mockup */}
                    <div className="bg-[#06424a] rounded-xl p-3 h-40 mb-4 relative overflow-hidden">
                      <div className="text-white text-xs mb-2">JMX/INR</div>
                      <svg className="w-full h-24" viewBox="0 0 200 100">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2 }}
                          d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,40 C140,30 160,45 180,20 C190,10 200,5"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <motion.path
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          transition={{ duration: 1, delay: 1 }}
                          d="M0,80 C20,70 40,90 60,60 C80,30 100,50 120,40 C140,30 160,45 180,20 C190,10 200,5 L200,100 L0,100 Z"
                          fill="url(#chartGradient)"
                        />
                      </svg>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>1H</span>
                        <span>1D</span>
                        <span>1W</span>
                        <span className="text-white">1M</span>
                        <span>1Y</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 bg-white rounded-xl py-2 flex items-center justify-center gap-1 text-[#085056] font-semibold">
                        <FaArrowDown className="text-xs" />
                        <span>Buy</span>
                      </div>
                      <div className="flex-1 bg-[#06424a] rounded-xl py-2 flex items-center justify-center gap-1 text-white font-semibold">
                        <FaArrowUp className="text-xs" />
                        <span>Sell</span>
                      </div>
                    </div>
                    
                    {/* Portfolio Items */}
                    <div className="space-y-3">
                      <div className="bg-[#06424a] rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                            <span className="text-[#085056] font-bold">J</span>
                          </div>
                          <div>
                            <div className="text-white text-sm">Jaimax</div>
                            <div className="text-teal-200/80 text-xs">JMX</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm">₹0.50</div>
                          <div className="text-teal-200 text-xs">+12.5%</div>
                        </div>
                      </div>
                      
                      <div className="bg-[#06424a]/50 rounded-xl p-3 flex items-center justify-between opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-white text-xs">BTC</span>
                          </div>
                          <div>
                            <div className="text-white text-sm">Bitcoin</div>
                            <div className="text-white/60 text-xs">BTC</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm">₹49,30,150</div>
                          <div className="text-red-300 text-xs">-2.1%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Pill/Home Button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
              </motion.div>
              
              {/* Second Phone (Back) */}
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [5, 5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute left-0 top-10 z-10 bg-gray-900 w-[280px] h-[580px] rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden opacity-20"
              >
                {/* Empty screen for depth effect */}
                <div className="absolute inset-0 bg-[#085056]/80" />
              </motion.div>
            </div>
            
            {/* Download QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute bottom-0 -right-10 bg-white rounded-2xl p-4 shadow-xl rotate-3"
            >
              <div className="w-24 h-24 bg-[#085056]/10 rounded-xl flex items-center justify-center">
                {/* Mock QR Code */}
                <svg viewBox="0 0 100 100" width="80" height="80">
                  <rect x="10" y="10" width="30" height="30" fill="#085056" rx="5" />
                  <rect x="60" y="10" width="30" height="30" fill="#085056" rx="5" />
                  <rect x="10" y="60" width="30" height="30" fill="#085056" rx="5" />
                  <rect x="50" y="50" width="40" height="40" fill="#085056" rx="5" />
                  <rect x="20" y="20" width="10" height="10" fill="white" />
                  <rect x="70" y="20" width="10" height="10" fill="white" />
                  <rect x="20" y="70" width="10" height="10" fill="white" />
                  <rect x="65" y="65" width="10" height="10" fill="white" />
                </svg>
              </div>
              <div className="text-center mt-2">
                <div className="text-xs text-gray-600">Scan to</div>
                <div className="text-[#085056] text-sm font-semibold">Download</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

    </section>
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
    // Clear existing ScrollTriggers more selectively
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        !trigger.vars.id ||
        (!trigger.vars.id.toString().startsWith("card-") && 
         trigger.vars.id !== "bento-gallery")
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
      const cards = gsap.utils.toArray(".service-card");
      const totalCards = cards.length;

      // Initial setup - stack cards
      gsap.set(cards, {
        y: (i) => i * 15,
        scale: (i) => 1 - i * 0.04,
        opacity: (i) => 1 - i * 0.15,
        zIndex: (i) => totalCards - i,
        rotationX: 0,
      });

      const serviceTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top top",
          end: `+=${totalCards * 500}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        if (index < totalCards - 1) {
          // Animate current card out
          serviceTl.to(
            card,
            {
              y: -500,
              opacity: 0,
              scale: 0.9,
              rotationX: -15,
              duration: 1,
              ease: "power2.inOut",
            },
            index
          );

          // Update remaining cards
          cards.slice(index + 1).forEach((nextCard, nextIndex) => {
            serviceTl.to(
              nextCard,
              {
                y: nextIndex * 15,
                scale: 1 - nextIndex * 0.04,
                opacity: 1 - nextIndex * 0.15,
                duration: 1,
              },
              index
            );
          });
        }
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
          invalidateOnRefresh: true,
        },
      });
    }

    // IMPROVED Roadmap section
    if (roadmapRef.current && roadmapTimelineRef.current) {
      const timeline = roadmapTimelineRef.current;
      const section = roadmapRef.current;
      
      // Calculate scroll distance more accurately
      const getScrollDistance = () => {
        const timelineWidth = timeline.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, timelineWidth - viewportWidth);
      };

      // Main horizontal scroll animation
      const horizontalScroll = gsap.to(timeline, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "roadmap-main", // Add ID for better management
          onRefresh: () => {
            // Recalculate on resize
            gsap.set(timeline, { x: 0 });
          }
        },
      });

      // Enhanced card animations
      gsap.utils.toArray(".roadmap-card").forEach((card, index) => {
        const phases = card.querySelectorAll(".phase-item");

        // Card entrance animation with improved timing
        gsap.fromTo(
          card,
          { 
            scale: 0.85, 
            opacity: 0.4,
            y: 60,
            rotationY: -15
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "left 95%",
              end: "left 60%",
              scrub: 1,
              id: `roadmap-card-${index}`,
            },
          }
        );

        // Phase items stagger animation
        gsap.fromTo(
          phases,
          { 
            opacity: 0, 
            x: -40,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "left 75%",
              end: "left 45%",
              scrub: 1,
              id: `roadmap-phases-${index}`,
            },
          }
        );

        // Card highlight effect when in center view
        gsap.to(card, {
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(8, 80, 86, 0.3)",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalScroll,
            start: "left 65%",
            end: "left 35%",
            scrub: 1,
            yoyo: true,
            id: `roadmap-highlight-${index}`,
          }
        });

        // Progress bar animation
        const progressBar = card.querySelector('.bg-\\[\\#085056\\]');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: "0%" },
            {
              width: `${roadmapData[Object.keys(roadmapData)[index]]?.progress || 0}%`,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: "left 70%",
                end: "left 40%",
                scrub: 1,
                id: `roadmap-progress-${index}`,
              }
            }
          );
        }
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
          id: "security-main",
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

      faqItems.forEach((item, index) => {
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
              id: `faq-${index}`,
            },
          }
        );
      });
    }

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
  }, 150); // Slightly increased timeout for better initialization

  // Improved resize handler with debouncing
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    clearTimeout(timer);
    clearTimeout(resizeTimeout);
    window.removeEventListener("resize", handleResize);
    
    // More selective cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      const id = trigger.vars.id;
      // Preserve card animations and bento gallery
      if (
        id &&
        (id.toString().startsWith("card-") || 
         id === "bento-gallery" ||
         id.toString().startsWith("roadmap-"))
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
      <VelocityHero />
      <section
        ref={servicesRef}
        className="min-h-screen relative px-4 py-20 bg-teal-50 flex items-center justify-center overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-50/50 to-cyan-50/50 rounded-full blur-3xl" />

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg shadow-teal-500/25">
              What We Offer
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
              Comprehensive solutions for your crypto journey
            </p>
          </div>

          {/* Stacked Cards Container */}
          <div
            className="relative w-full max-w-4xl mx-auto"
            style={{ height: "500px", perspective: "1500px" }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card absolute inset-0 bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl"
                style={{
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Card Number Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-bold text-sm shadow-lg">
                      {`0${index + 1}`}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 mb-6 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/30">
                    <img
                      src={service.icon}
                      alt={service.iconAlt}
                      className="w-12 h-12 filter brightness-0 invert"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-lg flex-grow">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:-translate-y-1">
                      Learn More
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-2">
                      {services.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === index
                              ? "w-8 bg-gradient-to-r from-teal-500 to-cyan-500"
                              : "w-1.5 bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card decorations */}
                <div className="absolute top-4 right-20 w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full blur-2xl opacity-60" />
                <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-xl opacity-40" />
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              Scroll to explore services
            </p>
          </div>
        </div>
      </section>
      <div 
              style={{ 
          backgroundImage: 'linear-gradient(rgba(30, 43, 42, 0.9), rgba(11, 22, 21, 0.8)), url("https://i.pinimg.com/736x/69/d2/c1/69d2c1763cf91e13adad4f6069b283bc.jpg")',
          backgroundAttachment: 'fixed',
        }}>

        <SecuritySec />
      </div>
      <PhasesWheelSection />
      
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        subheading="Innovation"
        heading="The Future is Here"
      >
        <JaimaxContent />
      </TextParallaxContent>
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
                    <div className=" mt-4 "></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <BentoGallery />
       <ReviewsSection />
       <HorizontalRoadmap/>
      <JaimaxFAQ />
      {/* <ContactForm /> */}
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
          box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.1),
            0 2px 4px -1px rgba(13, 148, 136, 0.06);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .compact-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(20, 184, 166, 0.05),
            rgba(6, 182, 212, 0.05)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .compact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.2),
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
          background: linear-gradient(
            135deg,
            rgba(20, 184, 166, 0.15),
            rgba(6, 182, 212, 0.15)
          );
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
          background: linear-gradient(
            135deg,
            rgba(240, 253, 250, 0.9),
            rgba(204, 251, 241, 0.9)
          );
          border: 1px solid rgba(20, 184, 166, 0.2);
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #0f766e;
          transition: all 0.3s ease;
          animation: badge-pulse 3s ease-in-out infinite;
        }

        .mini-badge:nth-child(1) {
          animation-delay: 0s;
        }
        .mini-badge:nth-child(2) {
          animation-delay: 0.3s;
        }
        .mini-badge:nth-child(3) {
          animation-delay: 0.6s;
        }
        .mini-badge:nth-child(4) {
          animation-delay: 0.9s;
        }

        .mini-badge:hover {
          transform: scale(1.05);
          background: linear-gradient(
            135deg,
            rgba(204, 251, 241, 1),
            rgba(153, 246, 228, 1)
          );
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

        .stat-item:nth-child(2) .stat-value {
          animation-delay: 0.5s;
        }
        .stat-item:nth-child(4) .stat-value {
          animation-delay: 1s;
        }
        .stat-item:nth-child(6) .stat-value {
          animation-delay: 1.5s;
        }

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
          background: linear-gradient(
            180deg,
            transparent,
            rgba(20, 184, 166, 0.3),
            transparent
          );
          justify-self: center;
          animation: divider-pulse 2s ease-in-out infinite;
        }

        /* ===== ANIMATIONS ===== */

        @keyframes badge-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes title-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes title-shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes link-glow {
          0%,
          100% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
          }
        }

        @keyframes icon-pulse {
          0%,
          100% {
            box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 20px rgba(20, 184, 166, 0.5);
            transform: scale(1.05);
          }
        }

        @keyframes card-title-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes check-bounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes badge-pulse {
          0%,
          100% {
            background: linear-gradient(
              135deg,
              rgba(240, 253, 250, 0.9),
              rgba(204, 251, 241, 0.9)
            );
          }
          50% {
            background: linear-gradient(
              135deg,
              rgba(204, 251, 241, 1),
              rgba(153, 246, 228, 0.9)
            );
          }
        }

        @keyframes stat-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }

        @keyframes divider-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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

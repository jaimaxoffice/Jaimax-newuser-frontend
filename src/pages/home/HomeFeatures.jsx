import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Users,
  Globe,
  BookOpen,
  Settings,
  CreditCard,
  Headphones,
  ArrowRight,
} from "lucide-react";
// import icon from '../../assets/logo.webp'
import icon from "../../assets/coin.svg";
import featureImage from "../../assets/websiteicons.webp";
import { useNavigate } from "react-router-dom";
import Seo from "../../SeoContent/Seo";
import { Link } from 'react-router-dom';
const JaimaxLanding = () => {
    const featuresSchemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.jaimax.com/#organization",
        "name": "Jaimax",
        "legalName": "Jaisvik Software Solutions Private Limited",
        "url": "https://www.jaimax.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.jaimax.com/logo.png"
        },
        "description": "Jaimax is an innovative cryptocurrency project building a financial ecosystem across blockchain, DeFi, NFTs, and crypto education.",
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
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.jaimax.com/",
        "url": "https://www.jaimax.com/",
        "name": "Jaimax",
        "publisher": { "@id": "https://www.jaimax.com/#organization" },
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": "https://www.jaimax.com/features",
        "url": "https://www.jaimax.com/features",
        "name": "Jaimax Coin Features | Secure and Seamless Cryptocurrency Experience",
        "description": "Discover the powerful features of Jaimax Coin, including fast transactions, top-tier security, and scalable solutions for users looking to invest in digital assets.",
        "isPartOf": { "@id": "https://www.jaimax.com/#website" },
        "about": { "@id": "https://www.jaimax.com/#organization" },
        "inLanguage": "en",
        "breadcrumb": { "@id": "https://www.jaimax.com/features#breadcrumb" },
        "mainEntity": { "@id": "https://www.jaimax.com/features#featurelist" },
        "datePublished": "2024-01-01",
        "dateModified": "2025-01-15"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.jaimax.com/features#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.jaimax.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "https://www.jaimax.com/features"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://www.jaimax.com/features#featurelist",
        "name": "Jaimax Coin Core Features",
        "description": "Comprehensive list of features that make Jaimax the perfect choice for your crypto journey",
        "numberOfItems": 8,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Thing",
              "name": "User Account Management",
              "description": "Easily create and manage your personal Jaimax wallet. Our secure dashboard helps you track token balances, purchases, and transaction history all in one place."
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Thing",
              "name": "Privacy Settings & Data Protection",
              "description": "Your privacy matters. Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared."
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Thing",
              "name": "Secure Payment Processing",
              "description": "All transactions are powered by blockchain, ensuring fast, secure, and tamper-proof payments. You can invest and transfer with confidence."
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Thing",
              "name": "24/7 Communication and Support",
              "description": "Get round-the-clock assistance from our expert support team. Whether you have questions about your wallet, transactions, or features, we're here to help."
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "Thing",
              "name": "Smart Analytics & Cookie Control",
              "description": "We provide real-time performance insights while allowing full control over cookies and tracking. It's all part of a transparent and secure user experience."
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "Thing",
              "name": "International Access & Data Transfers",
              "description": "Jaimax supports global users with seamless cross-border crypto transactions. Our platform is built to serve an international audience with full compliance."
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "Thing",
              "name": "Educational Resources",
              "description": "We empower users with simple, clear content about crypto, blockchain, DeFi, and tokenomics. Our resources are ideal for beginners and experts alike."
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "Thing",
              "name": "Policy Updates & User Rights",
              "description": "Stay up to date with regular policy notifications. Jaimax ensures full user control over personal data, privacy settings, and account activity."
            }
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.jaimax.com/features#platform",
        "name": "Jaimax Platform",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": "Jaimax cryptocurrency platform featuring secure wallet management, fast transactions, DeFi integration, and comprehensive user support.",
        "url": "https://www.jaimax.com/features",
        "author": { "@id": "https://www.jaimax.com/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "User Account Management",
          "Privacy Settings & Data Protection",
          "Secure Payment Processing",
          "24/7 Communication and Support",
          "Smart Analytics & Cookie Control",
          "International Access & Data Transfers",
          "Educational Resources",
          "Policy Updates & User Rights"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "245",
          "reviewCount": "127"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.jaimax.com/features#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What features does Jaimax offer for account management?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jaimax offers a secure personal wallet with a comprehensive dashboard to track token balances, purchases, and complete transaction history. Users can easily manage their accounts with intuitive controls."
            }
          },
          {
            "@type": "Question",
            "name": "How does Jaimax protect user privacy and data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jaimax uses advanced military-grade encryption to protect user data. Users have full control over their privacy settings and can manage how their personal information is stored and shared on the platform."
            }
          },
          {
            "@type": "Question",
            "name": "Is Jaimax payment processing secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all Jaimax transactions are powered by blockchain technology, ensuring fast, secure, and tamper-proof payments. The platform uses multiple security layers to protect every transaction."
            }
          },
          {
            "@type": "Question",
            "name": "Does Jaimax offer customer support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Jaimax provides 24/7 round-the-clock customer support. Our expert team is available to assist with wallet queries, transaction issues, feature explanations, and any other concerns."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use Jaimax internationally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Jaimax supports global users with seamless cross-border crypto transactions. The platform is built to serve an international audience with full regulatory compliance."
            }
          },
          {
            "@type": "Question",
            "name": "Does Jaimax provide educational content for beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Jaimax offers comprehensive educational resources about crypto, blockchain, DeFi, and tokenomics. The content is designed to be simple and clear, suitable for both beginners and experienced investors."
            }
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.jaimax.com/features#service",
        "name": "Jaimax Cryptocurrency Services",
        "description": "Complete cryptocurrency services including secure wallet, fast transactions, DeFi integration, NFT marketplace, and 24/7 support.",
        "provider": { "@id": "https://www.jaimax.com/#organization" },
        "serviceType": "Cryptocurrency Platform",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Jaimax Features",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Secure Wallet Management"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Fast Transaction Processing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "24/7 Customer Support"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Educational Resources"
              }
            }
          ]
        }
      }
    ]
  };
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Refs for each section you want to animate when it comes into view
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const whyChooseRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isWhyChooseInView = useInView(whyChooseRef, {
    once: true,
    amount: 0.4,
  });

  const hexImages = [
    {
      src: "https://www.cyberbahnit.com/wp-content/uploads/2017/11/blockchain.jpg",
      rotate: "-5deg",
      top: "0px",
      left: "10px",
      category: "jaimac-blockchain",
    },
    {
      src: "https://img.freepik.com/free-vector/gradient-stock-market-concept_52683-76908.jpg?semt=ais_items_boosted&w=740",
      rotate: "10deg",
      top: "210px",
      left: "100px",
      category: "jaimac-wallet",
    },
    {
      src: "https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "-15deg",
      top: "0px",
      left: "190px",
      category: "jaimac-trading",
    },
    {
      src: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "8deg",
      top: "210px",
      left: "280px",
      category: "jaimac-defi",
    },
    {
      src: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "18deg",
      top: "420px",
      left: "10px",
      category: "jaimac-finance",
    },
    {
      src: "https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "-10deg",
      top: "420px",
      left: "190px",
      category: "jaimac-crypto",
    },
  ];

  const RotatedHex = ({ src, rotate, top, left }) => (
    <div
      className="absolute w-[120px] h-[130px] sm:w-[150px] sm:h-[160px] lg:w-[180px] lg:h-[200px] hex"
      style={{ top, left, transform: `rotate(${rotate})` }}
    >
      <img
        src={src}
        alt="hex"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );

  const FloatingCircle = ({ size, top, left, color }) => (
    <div
      className="absolute rounded-full opacity-30 blur-2xl"
      style={{
        width: size,
        height: size,
        top,
        left,
        backgroundColor: color,
      }}
    ></div>
  );

  const features = [
    {
      icon: Shield,
      title: "User Account Management",
      description:
        "Easily create and manage your personal Jaimax wallet. Our secure dashboard helps you track token balances, purchases, and transaction history all in one place.",
    },
    {
      icon: Settings,
      title: "Privacy Settings & Data Protection",
      description:
        "Your privacy matters. Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment Processing",
      description:
        "All transactions are powered by blockchain, ensuring fast, secure, and tamper-proof payments. You can invest and transfer with confidence.",
    },
    {
      icon: Headphones,
      title: "24/7 Communication and Support",
      description:
        "Get round-the-clock assistance from our expert support team. Whether you have questions about your wallet, transactions, or features, we're here to help.",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics & Cookie Control",
      description:
        "We provide real-time performance insights while allowing full control over cookies and tracking. It's all part of a transparent and secure user experience.",
    },
    {
      icon: Globe,
      title: "International Access & Data Transfers",
      description:
        "Jaimax supports global users with seamless cross-border crypto transactions. Our platform is built to serve an international audience with full compliance.",
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description:
        "We empower users with simple, clear content about crypto, blockchain, DeFi, and tokenomics. Our resources are ideal for beginners and experts alike.",
    },
    {
      icon: Users,
      title: "Policy Updates & User Rights",
      description:
        "Stay up to date with regular policy notifications. Jaimax ensures full user control over personal data, privacy settings, and account activity.",
    },
  ];

  // --- Framer Motion Animation Variants ---
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Handler for navigation (e.g., to a login page)
  const handleGetStartedClick = () => {
    navigate("/login");
  };

  return (
<div className="min-h-screen text-white bg-[#085056]">
  <Seo page="features" />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2 p-4 sm:p-5 items-center">
      {/* Left: Feature Image - LINKED */}
      <div className="relative order-2 lg:order-1">
        <Link to="/about" title="Learn more about Jaimax">
          <img
            src={featureImage}
            alt="Jaimax Features"
            title="Jaimax Features - Explore the Powerful Features of Jaimax Crypto Coin"
            className="w-full h-auto max-w-md sm:max-w-lg lg:max-w-full mx-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Animated floating element */}
        <div className="absolute bottom-10 sm:bottom-20 left-2 sm:left-5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse shadow-2xl"></div>
      </div>

      {/* Right: Hero Content */}
      <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
          Powering the <br />
          <Link 
            to="/best-presale-crypto-coin-in-india" 
            title="Best presale crypto coin in India"
            className="hover:opacity-80 transition-opacity"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-[#b9cd27]">
              Future of Crypto
            </span>
          </Link>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-4 lg:px-0"
        >
          Welcome to{" "}
          <Link to="/about" title="About Jaimax crypto coin">
            <strong className="text-lime-400 hover:underline">Jaimax</strong>
          </Link>
          , one of the{" "}
          <Link 
            to="/best-presale-crypto-coin-in-india" 
            title="Best crypto coins in India"
            className="text-lime-400 hover:underline"
          >
            best crypto coins
          </Link>{" "}
          designed for growth, transparency, and financial freedom. Built on powerful{" "}
          <Link to="/services" title="Jaimax blockchain services" className="text-lime-400 hover:underline">
            blockchain technology
          </Link>
          , Jaimax offers a secure and scalable platform for users who want to be
          part of the next generation of digital finance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center"
        >
          <Link
            to="/register"
            title="Register on Jaimax - Start your crypto journey"
            className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto max-w-xs sm:max-w-none text-center"
          >
            Get Started Now
            <ArrowRight
              className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
              size={16}
            />
          </Link>

          <Link
            to="/blog"
            title="Read Jaimax blog - Crypto insights and updates"
            className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-lime-500 text-lime-400 font-semibold text-sm sm:text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none text-center"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </div>
  </div>

  {/* Geometric background pattern */}
  <div className="absolute inset-0 overflow-hidden">
    <img
      src={icon}
      alt="Geometric Pattern"
      title="Jaimax Crypto Coin - Geometric Background Pattern"
      className="absolute top-120 -right-40 sm:-right-60 lg:-right-80 opacity-10 w-40 sm:w-60 lg:w-auto"
    />
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
  </div>

  {/* Features Section */}
  <motion.div
    ref={featuresRef}
    initial="hidden"
    animate={isFeaturesInView ? "visible" : "hidden"}
    variants={fadeIn}
    className="relative z-10"
  >
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Core{" "}
            <Link to="/services" title="Jaimax functional features and services">
              <span className="text-lime-400 hover:underline">Functional Features</span>
            </Link>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4"
          >
            Discover the powerful features that make{" "}
            <Link to="/about" title="About Jaimax" className="text-lime-400 hover:underline">
              Jaimax
            </Link>{" "}
            the perfect choice for your{" "}
            <Link to="/best-presale-crypto-coin-in-india" title="Crypto journey with Jaimax" className="text-lime-400 hover:underline">
              crypto journey
            </Link>
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            // Map features to different pages
            const featureLinks = [
              "/services",
              "/best-presale-crypto-coin-in-india",
              "/about",
              "/contact",
              "/blog",
              "/login",
              "/register",
              "/services"
            ];
            const featureLink = featureLinks[index % featureLinks.length];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-teal-700 rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-600 border border-slate-600 hover:border-lime-500/50 h-full"
              >
                <Link to={featureLink} title={`Learn more about ${feature.title}`} className="flex flex-col h-full">
                  <div className="flex items-start sm:items-center mb-3 sm:mb-4">
                    <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mr-3 sm:mr-4 flex-shrink-0">
                      <IconComponent className="text-white" size={18} />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-lime-400 group-hover:text-lime-300 transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300 mb-3 sm:mb-4">
                    {feature.description}
                  </p>
                  <div className="flex justify-end">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center bg-lime-500 border border-lime-500 group-hover:bg-slate-500 transition-all duration-300">
                      <ArrowRight
                        className="text-black group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
                        size={12}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  </motion.div>



  <style jsx>{`
    .bg-grid-pattern {
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 1px,
          transparent 1px
        );
      background-size: 50px 50px;
    }

    @media (max-width: 640px) {
      .bg-grid-pattern {
        background-size: 30px 30px;
      }
    }
  `}</style>
</div>
  );
};

export default JaimaxLanding;

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Users, Globe, BookOpen, Settings, CreditCard, Headphones, ArrowRight } from 'lucide-react';
// import icon from '../../assets/logo.webp'
import icon from '../../assets/Images/loginReg.svg'
import featureImage from "../../assets/websiteicons.webp"
import { useNavigate } from 'react-router-dom';
import Seo from '../../SeoContent/Seo'
const JaimaxLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Refs for each section you want to animate when it comes into view
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const whyChooseRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isWhyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.4 });

  const hexImages = [
    {
      src: "https://www.cyberbahnit.com/wp-content/uploads/2017/11/blockchain.jpg",
      rotate: "-5deg",
      top: "0px",
      left: "10px",
      category: "jaimac-blockchain"
    },
    {
      src: "https://img.freepik.com/free-vector/gradient-stock-market-concept_52683-76908.jpg?semt=ais_items_boosted&w=740",
      rotate: "10deg",
      top: "210px",
      left: "100px",
      category: "jaimac-wallet"
    },
    {
      src: "https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "-15deg",
      top: "0px",
      left: "190px",
      category: "jaimac-trading"
    },
    {
      src: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "8deg",
      top: "210px",
      left: "280px",
      category: "jaimac-defi"
    },
    {
      src: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "18deg",
      top: "420px",
      left: "10px",
      category: "jaimac-finance"
    },
    {
      src: "https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=400",
      rotate: "-10deg",
      top: "420px",
      left: "190px",
      category: "jaimac-crypto"
    },
  ]

  const RotatedHex = ({ src, rotate, top, left }) => (
    <div
      className="absolute w-[120px] h-[130px] sm:w-[150px] sm:h-[160px] lg:w-[180px] lg:h-[200px] hex"
      style={{ top, left, transform: `rotate(${rotate})` }}
    >
      <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
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
      description: "Easily create and manage your personal Jaimax wallet. Our secure dashboard helps you track token balances, purchases, and transaction history all in one place."
    },
    {
      icon: Settings,
      title: "Privacy Settings & Data Protection",
      description: "Your privacy matters. Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared."
    },
    {
      icon: CreditCard,
      title: "Secure Payment Processing",
      description: "All transactions are powered by blockchain, ensuring fast, secure, and tamper-proof payments. You can invest and transfer with confidence."
    },
    {
      icon: Headphones,
      title: "24/7 Communication and Support",
      description: "Get round-the-clock assistance from our expert support team. Whether you have questions about your wallet, transactions, or features, we're here to help."
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics & Cookie Control",
      description: "We provide real-time performance insights while allowing full control over cookies and tracking. It's all part of a transparent and secure user experience."
    },
    {
      icon: Globe,
      title: "International Access & Data Transfers",
      description: "Jaimax supports global users with seamless cross-border crypto transactions. Our platform is built to serve an international audience with full compliance."
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "We empower users with simple, clear content about crypto, blockchain, DeFi, and tokenomics. Our resources are ideal for beginners and experts alike."
    },
    {
      icon: Users,
      title: "Policy Updates & User Rights",
      description: "Stay up to date with regular policy notifications. Jaimax ensures full user control over personal data, privacy settings, and account activity."
    }
  ];

  // --- Framer Motion Animation Variants ---
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Handler for navigation (e.g., to a login page)
  const handleGetStartedClick = () => {
    navigate("/login")
  };

  return (
    <div className="min-h-screen text-white bg-[#085056]">
      {/* Hero Section */}
      <Seo page="features" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2 p-4 sm:p-5 items-center">
          
          {/* Left: Feature Image */}
          <div className="relative order-2 lg:order-1">
            <img 
              src={featureImage} 
              alt="Jaimax Features" 
              title="Jaimax Features - Explore the Powerful Features of Jaimax Crypto Coin"
              className="w-full h-auto max-w-md sm:max-w-lg lg:max-w-full mx-auto"
            />
            
            {/* Animated floating element - responsive sizing */}
            <div className="absolute bottom-10 sm:bottom-20 left-2 sm:left-5 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse shadow-2xl"></div>
          </div>

          {/* Right: Hero Content */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
              Powering the <br />
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-[#b9cd27]">Future of Crypto</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-4 lg:px-0"
            >
              Welcome to <strong className="text-lime-400">Jaimax</strong>, one of the best crypto coins designed for growth,
              transparency, and financial freedom. Built on powerful blockchain technology,
              Jaimax offers a secure and scalable platform for users who want to be part of
              the next generation of digital finance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center"
            >
              <button
                onClick={handleGetStartedClick}
                className="group relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                Get Started Now
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
              </button>

              <button
                onClick={() => navigate("/blog")}
                className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-lime-500 text-lime-400 font-semibold text-sm sm:text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                Learn More
              </button>
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
          className="absolute -top-0 -right-40 sm:-right-60 lg:-right-80 opacity-10 w-40 sm:w-60 lg:w-auto" 
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
                Core <span className="text-lime-400">Functional Features</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4"
              >
                Discover the powerful features that make Jaimax the perfect choice for your crypto journey
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
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-teal-700 rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-600 border border-slate-600 hover:border-lime-500/50 h-full"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start sm:items-center mb-3 sm:mb-4">
                        {/* Responsive icon container */}
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
                        {/* Responsive arrow button */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center bg-lime-500 border border-lime-500 group-hover:bg-slate-500 transition-all duration-300">
                          <ArrowRight
                            className="text-black group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
                            size={12}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Why Choose Section */}
      <motion.div
        ref={whyChooseRef}
        initial="hidden"
        animate={isWhyChooseInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 lg:py-8">
          <div className="rounded-3xl p-4 sm:p-6 lg:p-8">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
              >
                Why <span className="text-lime-400">Jaimax</span> Stands Out
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xs sm:text-sm lg:text-base text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Jaimax goes beyond being a crypto coin — it's a full-stack platform built for secure, scalable, and user-focused crypto solutions.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isWhyChooseInView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8"
              >
                <motion.div
                  variants={itemVariants}
                  className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-4 sm:p-5 lg:p-6 transition-all duration-300"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-lime-400">99.9%</div>
                  <div className="text-gray-300 text-xs sm:text-sm lg:text-base font-medium mt-1">Uptime Guarantee</div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-4 sm:p-5 lg:p-6 transition-all duration-300"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-lime-400">50K+</div>
                  <div className="text-gray-300 text-xs sm:text-sm lg:text-base font-medium mt-1">Active Users</div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-4 sm:p-5 lg:p-6 transition-all duration-300"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-lime-400">24/7</div>
                  <div className="text-gray-300 text-xs sm:text-sm lg:text-base font-medium mt-1">Live Support</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
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
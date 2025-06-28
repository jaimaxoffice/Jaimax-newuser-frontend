import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Users, Globe, BookOpen, Settings, CreditCard, Headphones, ArrowRight } from 'lucide-react';
import icon from '../../assets/Images/loginReg.svg'
import icon2 from '../../assets/Images/jaicoin.svg'
import { useNavigate } from 'react-router-dom';
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
    src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    rotate: "-5deg",
    top: "0px",
    left: "10px",
  },
  {
    src:  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    rotate: "10deg",
    top: "210px",
    left: "100px",
  },
  {
    src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    rotate: "-15deg",
    top: "0px",
    left: "190px",
  },
  {
    src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    rotate: "8deg",
    top: "210px",
    left: "280px",
  },
  {
    src:  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    rotate: "18deg",
    top: "420px",
    left: "10px",
  },
  {
    src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    rotate: "-10deg",
    top: "420px",
    left: "190px",
  },
];

const RotatedHex = ({ src, rotate, top, left }) => (
  <div
    className="absolute w-[180px] h-[200px] hex"
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
    <div className="min-h-screen text-white">


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            
            {/* Left: Hexagon Images */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1">
              {hexImages.map((img, index) => (
                <RotatedHex
                  key={index}
                  src={img.src}
                  rotate={img.rotate}
                  top={img.top}
                  left={img.left}
                />
              ))}
              
              {/* Floating elements */}
            {/* <div className="absolute top-10 right-10 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-bounce shadow-2xl flex items-center justify-center">
  <img src={icon} alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />
</div> */}

              <div className="absolute bottom-20 left-5 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse shadow-2xl"></div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2 text-center lg:text-left">
              <div className="hidden lg:block w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mb-8 rounded"></div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                Powering the <br />
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-[#b9cd27]">Future of Crypto</span>
              </h2>

                 <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Welcome to <strong className="text-lime-400">Jaimax</strong>, one of the best crypto coins designed for growth,
              transparency, and financial freedom. Built on powerful blockchain technology,
              Jaimax offers a secure and scalable platform for users who want to be part of
              the next generation of digital finance.
            </motion.p>

              {/* <div className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-base font-semibold text-cyan-400">
                <span className="inline-flex items-center justify-center w-6 h-6 border-2 border-cyan-400 rounded-full text-sm">
                  i
                </span>
                DeFi Yield Farming Disclosures
              </div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={handleGetStartedClick}
                className="group relative px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Get Started Now
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </button>

              <button
              onClick={() => navigate("/blog")}
              className="px-6 py-3 border-2 border-lime-500 text-lime-400 font-semibold text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
                Learn More
              </button>
            </motion.div>
            </div>
          </div>
        </div>
      {/* Geometric background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={icon} alt="" className="absolute -top-0 -right-80  opacity-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={isVisible || isHeroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative z-10"
      >
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-10 pb-2 sm:pb-20 lg:pb-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block mb-2">Powering the</span>
              <span className="bg-gradient-to-r from-lime-400 via-green-500 to-lime-400 bg-clip-text text-transparent">
                Future of Crypto
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
            >
              Welcome to Jaimax, one of the best crypto coins designed for growth, transparency, and financial freedom. Built on powerful blockchain technology, Jaimax offers a secure and scalable platform for users who want to be part of the next generation of digital finance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <button
                onClick={handleGetStartedClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Get Started Now
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-lime-500 text-lime-400 font-bold text-lg rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
                Learn More
              </button>
            </motion.div>
          </div>
        </div> */}

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-12 pb-10 sm:pb-16 lg:pb-12">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block mb-2">Powering the</span>
              <span className="bg-gradient-to-r from-[#a3e635] via-[#22c55e] to-[#a3e635] bg-clip-text text-transparent drop-shadow-md">
                Future of Crypto
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
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
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={handleGetStartedClick}
                className="group relative px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Get Started Now
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </button>

              <button className="px-6 py-3 border-2 border-lime-500 text-lime-400 font-semibold text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto">
                Learn More
              </button>
            </motion.div>
          </div>
        </div> */}

      </motion.div>

      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={isFeaturesInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative z-10"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-16 lg:py-10">
  <div className="max-w-[1200px] ml-[7vw] mr-[7vw]">
    <div className="text-center mb-12 sm:mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
      >
        Core <span className="text-lime-400">Functional Features</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg sm:text-xl text-gray-400 max-w-3xl ml-auto mr-auto"
      >
        Discover the powerful features that make Jaimax the perfect choice for your crypto journey
      </motion.p>
    </div>

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate={isFeaturesInView ? "visible" : "hidden"}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-center"
>
  {features.map((feature, index) => {
    const IconComponent = feature.icon;
    return (
      <motion.div
        key={index}
        variants={itemVariants}
        className="group bg-teal-700 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-600 border border-slate-600 hover:border-lime-500/50"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg w-12 h-12 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mr-4">
              <IconComponent className="text-white" size={22} />
            </div>
            <h3 className="text-lg font-bold text-lime-400 group-hover:text-lime-300 transition-colors duration-300">
              {feature.title}
            </h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300">
            {feature.description}
          </p>
          <div className="mt-4 flex justify-end">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-lime-500 border border-lime-500 group-hover:bg-slate-500 transition-all duration-300">
              <ArrowRight
                className="text-black-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
                size={15}
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
      {/* <motion.div
        ref={whyChooseRef}
        initial="hidden"
        animate={isWhyChooseInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="bg-gradient-to-r from-[#095359] to-[#006400] rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-600 shadow-2xl">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Why <span className="text-lime-400">Jaimax</span> is a Top Choice
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Jaimax isn't just another coin — it's a complete crypto investment platform with features designed for real-world use. Our mission is to provide secure, scalable, and user-friendly solutions that put you first.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Whether you're holding for long-term gains or exploring the future of decentralized finance, Jaimax offers everything you need in one place.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isWhyChooseInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              >
                <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-600 hover:border-lime-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">99.9%</div>
                  <div className="text-gray-300 font-medium">Uptime Guarantee</div>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-600 hover:border-lime-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">50K+</div>
                  <div className="text-gray-300 font-medium">Active Users</div>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center p-6 rounded-2xl bg-slate-800 border border-slate-600 hover:border-lime-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold text-lime-400 mb-2">24/7</div>
                  <div className="text-gray-300 font-medium">Support Available</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div> */}

      <motion.div
  ref={whyChooseRef}
  initial="hidden"
  animate={isWhyChooseInView ? "visible" : "hidden"}
  variants={fadeIn}
  className="relative z-10"
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10 sm:py-14 lg:py-10">
    <div className=" rounded-3xl p-2 sm:p-10 lg:p-4  ">
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Why <span className="text-lime-400">Jaimax</span> Stands Out
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
        >
          Jaimax goes beyond being a crypto coin — it's a full-stack platform built for secure, scalable, and user-focused crypto solutions.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isWhyChooseInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl font-bold text-lime-400">99.9%</div>
            <div className="text-gray-300 text-sm font-medium mt-1">Uptime Guarantee</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl font-bold text-lime-400">50K+</div>
            <div className="text-gray-300 text-sm font-medium mt-1">Active Users</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
          >
            <div className="text-2xl sm:text-3xl font-bold text-lime-400">24/7</div>
            <div className="text-gray-300 text-sm font-medium mt-1">Live Support</div>
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
      `}</style>
    </div>
  );
};

export default JaimaxLanding;

// import React from "react";
// import { Play } from "lucide-react";

// const hexImages = [
//   {
//     src: "https://images.unsplash.com/photo-1611079221193-1d3d34df3ff1?w=400&h=400&fit=crop",
//     rotate: "-5deg",
//     top: "10%",
//     left: "10%",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612435974214-c351f7a8f984?w=400&h=400&fit=crop",
//     rotate: "10deg",
//     top: "35%",
//     left: "0%",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1613145992851-67b44853bb09?w=400&h=400&fit=crop",
//     rotate: "-15deg",
//     top: "20%",
//     left: "35%",
//   },
//   {
//     src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//     rotate: "8deg",
//     top: "55%",
//     left: "20%",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612937893669-05caefec74f7?w=400&h=400&fit=crop",
//     rotate: "18deg",
//     top: "70%",
//     left: "5%",
//   },
// ];

// const RotatedHex = ({ src, rotate, top, left }) => (
//   <div
//     className="absolute w-[110px] h-[125px] hex"
//     style={{ top, left, transform: `rotate(${rotate})` }}
//   >
//     <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
//   </div>
// );

// const JaimaxLanding = () => {
//   return (
//     <section className="relative bg-[#1d8e85] text-white py-16 px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
//         {/* Left: Floating Hexagons */}
//         <div className="relative w-full h-[500px]">
//           {hexImages.map((hex, index) => (
//             <RotatedHex key={index} {...hex} />
//           ))}
//         </div>

//         {/* Right: Headline + Content */}
//         <div className="z-20">
//           <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
//             Life With <span className="text-white">Jaimax Coin</span><br /> Is Secure &{" "}
//             <span className="text-yellow-500">Powerful</span>
//           </h1>
//           <p className="text-gray-300 mt-6 text-lg max-w-md">
//             Experience seamless digital transactions and revolutionary blockchain technology with Jaimax.
//           </p>

//           <div className="flex gap-4 mt-8 flex-wrap">
//             <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition">
//               Start Investing
//             </button>
//             <button className="flex items-center gap-2 px-6 py-3 border border-yellow-500 text-yellow-300 hover:bg-yellow-500 hover:text-black rounded-lg transition">
//               <div className="bg-yellow-500 text-black p-1.5 rounded-full">
//                 <Play size={16} />
//               </div>
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Hexagon Shape CSS */}
//       <style jsx>{`
//         .hex {
//           clip-path: polygon(
//             50% 0%,
//             93% 25%,
//             93% 75%,
//             50% 100%,
//             7% 75%,
//             7% 25%
//           );
//           background-color: #1a1a1a;
//           box-shadow: 0 0 10px #facc15;
//           transition: transform 0.3s ease;
//         }

//         .hex:hover {
//           transform: scale(1.05);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default JaimaxLanding;
// import React from "react";
// import { Play } from "lucide-react";

// const hexImages = [
//   {
//     src: "https://images.unsplash.com/photo-1611079221193-1d3d34df3ff1?w=400&h=400&fit=crop",
//     rotate: "-5deg",
//     top: "0px",
//     left: "10px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612435974214-c351f7a8f984?w=400&h=400&fit=crop",
//     rotate: "10deg",
//     top: "210px",
//     left: "100px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1613145992851-67b44853bb09?w=400&h=400&fit=crop",
//     rotate: "-15deg",
//     top: "0px",
//     left: "190px",
//   },
//   {
//     src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//     rotate: "8deg",
//     top: "210px",
//     left: "280px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1612937893669-05caefec74f7?w=400&h=400&fit=crop",
//     rotate: "18deg",
//     top: "420px",
//     left: "10px",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1591696331119-7b0b4f1b387c?w=400&h=400&fit=crop",
//     rotate: "-10deg",
//     top: "420px",
//     left: "190px",
//   },
// ];

// const RotatedHex = ({ src, rotate, top, left }) => (
//   <div
//     className="absolute w-[180px] h-[200px] hex"
//     style={{ top, left, transform: `rotate(${rotate})` }}
//   >
//     <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
//   </div>
// );

// const FloatingCircle = ({ size, top, left, color }) => (
//   <div
//     className="absolute rounded-full opacity-30 blur-2xl"
//     style={{
//       width: size,
//       height: size,
//       top,
//       left,
//       backgroundColor: color,
//     }}
//   ></div>
// );

// const JaimaxLanding = () => {
//   return (
//     <section className="relative bg-[#1d8e85] text-white px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10 min-h-[750px]">
//         <div className="relative w-[500px] h-[500px] overflow-hidden">
//           {hexImages.map((hex, index) => (
//             <RotatedHex key={index} {...hex} />
//           ))}
//           <FloatingCircle size="120px" top="20%" left="70%" color="#facc15" />
//           <FloatingCircle size="170px" top="65%" left="60%" color="#ffffff" />
//           <FloatingCircle size="140px" top="40%" left="85%" color="#00ffc3" />
//         </div>
//         <div className="z-20">
//           <h1 className="text-5xl font-bold text-white leading-snug">
//             Life With <span className="text-[#b8cc26]">Jaimax Coin</span><br />Is Secure & <span className="text-yellow-400">Powerful</span>
//           </h1>
//           <p className="text-gray-200 mt-6 text-lg max-w-md">
//             Experience seamless digital transactions and revolutionary blockchain technology with Jaimax.
//           </p>
//           <div className="flex gap-4 mt-8 flex-wrap">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition">
//               Start Investing
//             </button>
//             <button className="flex items-center gap-2 px-6 py-3 border border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-lg transition">
//               <div className="bg-yellow-300 text-black p-1.5 rounded-full">
//                 <Play size={16} />
//               </div>
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .hex {
//           clip-path: polygon(
//             50% 0%,
//             93% 25%,
//             93% 75%,
//             50% 100%,
//             7% 75%,
//             7% 25%
//           );
//           background-color: #1a1a1a;
//           box-shadow: 0 0 10px #facc15;
//           transition: transform 0.3s ease;
//         }
//         .hex:hover {
//           transform: scale(1.05);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default JaimaxLanding;


// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { TrendingUp, Shield, Users, Globe, BookOpen, Settings, CreditCard, Headphones, ArrowRight, Play } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// import blockchain from "../../assets/blockchain1.jpg"
// import featureImage from "../../assets/websiteicons.png"
// import RealTimeTicker from './scroll';

// const JaimaxLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate()

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Refs for each section
//   const heroRef = useRef(null);
//   const featuresRef = useRef(null);
//   const whyChooseRef = useRef(null);
//   const hexSectionRef = useRef(null);
  
//   const isHeroInView = useInView(heroRef, { once: true, amount: 0.5 });
//   const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
//   const isWhyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.4 });
//   const isHexSectionInView = useInView(hexSectionRef, { once: true, amount: 0.3 });

//   const features = [
//     {
//       icon: Shield,
//       title: "User Account Management",
//       description: "Easily create and manage your personal Jaimax wallet. Our secure dashboard helps you track token balances, purchases, and transaction history all in one place."
//     },
//     {
//       icon: Settings,
//       title: "Privacy Settings & Data Protection",
//       description: "Your privacy matters. Jaimax uses advanced encryption to protect your data and allows you to control how your personal information is stored and shared."
//     },
//     {
//       icon: CreditCard,
//       title: "Secure Payment Processing",
//       description: "All transactions are powered by blockchain, ensuring fast, secure, and tamper-proof payments. You can invest and transfer with confidence."
//     },
//     {
//       icon: Headphones,
//       title: "24/7 Communication and Support",
//       description: "Get round-the-clock assistance from our expert support team. Whether you have questions about your wallet, transactions, or features, we're here to help."
//     },
//     {
//       icon: TrendingUp,
//       title: "Smart Analytics & Cookie Control",
//       description: "We provide real-time performance insights while allowing full control over cookies and tracking. It's all part of a transparent and secure user experience."
//     },
//     {
//       icon: Globe,
//       title: "International Access & Data Transfers",
//       description: "Jaimax supports global users with seamless cross-border crypto transactions. Our platform is built to serve an international audience with full compliance."
//     },
//     {
//       icon: BookOpen,
//       title: "Educational Resources",
//       description: "We empower users with simple, clear content about crypto, blockchain, DeFi, and tokenomics. Our resources are ideal for beginners and experts alike."
//     },
//     {
//       icon: Users,
//       title: "Policy Updates & User Rights",
//       description: "Stay up to date with regular policy notifications. Jaimax ensures full user control over personal data, privacy settings, and account activity."
//     }
//   ];

//   const hexImages = [
//     {
//       src:blockchain,
//       rotate: "-5deg",
//       top: "0px",
//       left: "10px",
//     },
//     {
//       src: "",
//       rotate: "10deg",
//       top: "210px",
//       left: "100px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1613145992851-67b44853bb09?w=400&h=400&fit=crop",
//       rotate: "-15deg",
//       top: "0px",
//       left: "190px",
//     },
//     {
//       src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//       rotate: "8deg",
//       top: "210px",
//       left: "280px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1612937893669-05caefec74f7?w=400&h=400&fit=crop",
//       rotate: "18deg",
//       top: "420px",
//       left: "10px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1591696331119-7b0b4f1b387c?w=400&h=400&fit=crop",
//       rotate: "-10deg",
//       top: "420px",
//       left: "190px",
//     },
//   ];

//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const handleGetStartedClick = () => {
//    navigate("/register")
//   };

//   const RotatedHex = ({ src, rotate, top, left }) => (
//     <div
//       className="absolute w-[180px] h-[200px] hex"
//       style={{ top, left, transform: `rotate(${rotate})` }}
//     >
//       <img src={src} alt="hex" className="w-full h-full object-cover rounded-lg" />
//     </div>
//   );

//   const FloatingCircle = ({ size, top, left, color }) => (
//     <div
//       className="absolute rounded-full opacity-30 blur-2xl"
//       style={{
//         width: size,
//         height: size,
//         top,
//         left,
//         // backgroundColor: color,
//       }}
//     ></div>
//   );

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//           <RealTimeTicker  />
// <motion.section
//   ref={hexSectionRef}
//   initial="hidden"
//   animate={isHexSectionInView ? "visible" : "hidden"}
//   variants={fadeIn}
//   className="relative  text-white px-4 md:px-6 overflow-hidden"
// >
//   <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 py-12 md:py-14 gap-12 relative z-10">

//     {/* 🔹 Left: Full Static Image */}
//     <motion.div
//       initial={{ opacity: 0, x: -50 }}
//       animate={isHexSectionInView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.8, delay: 0.2 }}
//       className="relative w-full h-[380px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
//     >
//       <img
//         src={featureImage}
//         alt="Jaimax Features"
//         className="w-full h-full object-contain "
//       />
//     </motion.div>

//     {/* 🔹 Right: Content */}
//     <motion.div
//       initial={{ opacity: 0, x: 50 }}
//       animate={isHexSectionInView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.8, delay: 0.4 }}
//       className="z-20 flex flex-col justify-center"
//     >
//       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
//         Life With <span className="text-[#b8cc26]">Jaimax Coin</span><br />
//         Is Secure & <span className="text-yellow-400">Powerful</span>
//       </h1>
//       <p className="text-gray-200 mt-6 text-base sm:text-lg max-w-md">
//         Experience seamless digital transactions and revolutionary blockchain technology with Jaimax.
//       </p>
//       <div className="flex gap-4 mt-8 flex-wrap">
//         <button
//           onClick={() => navigate("/")}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md transition"
//         >
//           Start Investing
//         </button>
//         <button
//           onClick={() => navigate("/blog")}
//           className="flex items-center gap-2 px-6 py-3 border border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-lg transition"
//         >
//           <div className="bg-yellow-300 text-black p-1.5 rounded-full">
//             <Play size={16} />
//           </div>
//           Learn More
//         </button>
//       </div>
//     </motion.div>
//   </div>
// </motion.section>

//       <div className="text-white bg-[#095359]  relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute inset-0  opacity-5"></div>
//         </div>

//         <motion.div
//           ref={heroRef}
//           initial="hidden"
//           animate={isVisible || isHeroInView ? "visible" : "hidden"}
//           variants={fadeIn}
//           className="relative z-10"
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-12 pb-10 sm:pb-16 lg:pb-12">
//             <div className="text-center">
              
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isVisible || isHeroInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.8, delay: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//               >
//                 <button
//                   onClick={handleGetStartedClick}
//                   className="group relative px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
//                 >
//                   Get Started Now
//                   <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
//                 </button>

//                 <button className="px-6 py-3 border-2 border-lime-500 text-lime-400 font-semibold text-base rounded-full hover:bg-lime-500 hover:text-white transition-all duration-300 w-full sm:w-auto" 
//                 onClick={() => navigate("/blog")}
//                 >
//                   Learn More
//                 </button>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Features Section */}
//       <div className=" bg-[#095359]  text-white">
//         <motion.div
//           ref={featuresRef}
//           initial="hidden"
//           animate={isFeaturesInView ? "visible" : "hidden"}
//           variants={fadeIn}
//           className="relative z-10"
//         >
//           <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-16 lg:py-10">
//             <div className="max-w-[1200px] ml-[7vw] mr-[7vw]">
//               <div className="text-center mb-12 sm:mb-16">
//                 <motion.h2
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.2, delay: 0.2 }}
//                   className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
//                 >
//                   Core <span className="text-lime-400">Functional Features</span>
//                 </motion.h2>
//                 <motion.p
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.8, delay: 0.4 }}
//                   className="text-lg sm:text-xl text-gray-400 max-w-3xl ml-auto mr-auto"
//                 >
//                   Discover the powerful features that make Jaimax the perfect choice for your crypto journey
//                 </motion.p>
//               </div>

//               <motion.div
//                 variants={staggerContainer}
//                 initial="hidden"
//                 animate={isFeaturesInView ? "visible" : "hidden"}
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 sm:gap-6 justify-center"
//               >
//                 {features.map((feature, index) => {
//                   const IconComponent = feature.icon;
//                   return (
//                     <motion.div
//                       key={index}
//                       variants={itemVariants}
//                       className="group bg-teal-700 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:bg-slate-600 border border-slate-600 hover:border-lime-500/50"
//                     >
//                       <div className="flex flex-col h-full">
//                         <div className="flex items-center mb-4">
//                           <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg w-12 h-12 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mr-4">
//                             <IconComponent className="text-white" size={22} />
//                           </div>
//                           <h3 className="text-lg font-bold text-lime-400 group-hover:text-lime-300 transition-colors duration-300">
//                             {feature.title}
//                           </h3>
//                         </div>
//                         <p className="text-gray-300 text-sm leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300">
//                           {feature.description}
//                         </p>
//                         <div className="mt-4 flex justify-end">
//                           <div className="w-9 h-9 rounded-full flex items-center justify-center bg-lime-500 border border-lime-500 group-hover:bg-slate-500 transition-all duration-300">
//                             <ArrowRight
//                               className="text-black-400 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300"
//                               size={15}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Why Choose Section */}
//       <div className="bg-[#095359]  text-white">
//         <motion.div
//           ref={whyChooseRef}
//           initial="hidden"
//           animate={isWhyChooseInView ? "visible" : "hidden"}
//           variants={fadeIn}
//           className="relative z-10"
//         >
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-10 sm:py-14 lg:py-10">
//             <div className="rounded-3xl p-2 sm:p-10 lg:p-4">
//               <div className="text-center">
//                 <motion.h2
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.7, delay: 0.2 }}
//                   className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
//                 >
//                   Why <span className="text-lime-400">Jaimax</span> Stands Out
//                 </motion.h2>

//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isWhyChooseInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.7, delay: 0.4 }}
//                   className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
//                 >
//                   Jaimax goes beyond being a crypto coin — it's a full-stack platform built for secure, scalable, and user-focused crypto solutions.
//                 </motion.p>

//                 <motion.div
//                   variants={staggerContainer}
//                   initial="hidden"
//                   animate={isWhyChooseInView ? "visible" : "hidden"}
//                   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8"
//                 >
//                   <motion.div
//                     variants={itemVariants}
//                     className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
//                   >
//                     <div className="text-2xl sm:text-3xl font-bold text-lime-400">99.9%</div>
//                     <div className="text-gray-300 text-sm font-medium mt-1">Uptime Guarantee</div>
//                   </motion.div>

//                   <motion.div
//                     variants={itemVariants}
//                     className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
//                   >
//                     <div className="text-2xl sm:text-3xl font-bold text-lime-400">50K+</div>
//                     <div className="text-gray-300 text-sm font-medium mt-1">Active Users</div>
//                   </motion.div>

//                   <motion.div
//                     variants={itemVariants}
//                     className="rounded-xl text-center bg-slate-800 border border-slate-700 hover:border-lime-400/50 p-5 transition-all duration-300"
//                   >
//                     <div className="text-2xl sm:text-3xl font-bold text-lime-400">24/7</div>
//                     <div className="text-gray-300 text-sm font-medium mt-1">Live Support</div>
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Hexagon Section */}
     
//     </div>
//   );
// };

// export default JaimaxLanding;

// import React from "react";
// /* ▼ swap these with your own asset paths or external URLs */
// import blockchain from "../../assets/blockchain1.jpg"
// import featureImage from "../../assets/websiteicons.png"
// import RealTimeTicker from './scroll';

// const JaimaxLanding = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-20">
//       {/* grid: stack on mobile, 2-col from lg up */}
//       <div className="grid gap-10 lg:gap-16 lg:grid-cols-2">
//         {/* ───────── Left: hero image & floating cards ───────── */}
//         <div className="relative">
//           <img
//             src={blockchain}
//             alt="Man eating a burger while checking his phone"
//             className="w-full h-auto rounded"
//           />

//           {/* floating mini-cards (show only ≥ sm for space) */}
//           <div className="hidden sm:flex gap-4 absolute bottom-4 left-1/2 -translate-x-1/2">
//             {/* Vacation card */}
//             <div className="w-40 md:w-48 bg-white border rounded-xl shadow-lg">
//               <div className="relative">
//                 <img
//                   src={featureImage}
//                   alt="Beach vacation"
//                   className="w-full h-24 md:h-28 object-cover rounded-t-xl"
//                 />
//                 <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[10px] px-2 py-[1px] rounded-full">
//                   4.00%
//                 </span>
//               </div>
//               <div className="p-3 text-center space-y-1">
//                 <p className="text-xs text-gray-600 font-medium">Vacation</p>
//                 <p className="text-lg md:text-xl font-semibold">$1,580.44</p>
//               </div>
//             </div>

//             {/* Car card */}
//             <div className="w-40 md:w-48 bg-white border rounded-xl shadow-lg">
//               <div className="relative">
//                 <img
//                   src={RealTimeTicker}
//                   alt="SUV with mountains"
//                   className="w-full h-24 md:h-28 object-cover rounded-t-xl"
//                 />
//                 <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[10px] px-2 py-[1px] rounded-full">
//                   4.00%
//                 </span>
//               </div>
//               <div className="p-3 text-center space-y-1">
//                 <p className="text-xs text-gray-600 font-medium">Car</p>
//                 <p className="text-lg md:text-xl font-semibold">$2,660.23</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ───────── Right: copy & CTA ───────── */}
//         <div className="flex flex-col justify-center">
//           {/* thin top rule */}
//           <div className="hidden lg:block w-full h-px bg-black mb-8" />

//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
//             Boost <br /> your savings
//           </h2>

//           <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-md">
//             Earn a bonus of up to <b>4.00% annually</b> on your savings, save
//             automatically with Round-Ups, set your goals, and more.
//           </p>

//           {/* disclosure */}
//           <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
//             <span className="inline-flex items-center justify-center w-5 h-5 border border-gray-400 rounded-full text-gray-700 text-[11px]">
//               i
//             </span>
//             Savings Pods Disclosures
//           </div>

//           {/* CTA */}
//           <button className="mt-8 inline-block rounded-full bg-black text-white px-8 py-3 text-base sm:text-lg font-medium hover:bg-gray-900 transition">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JaimaxLanding;


// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Shield, 
//   Settings, 
//   CreditCard, 
//   Headphones, 
//   TrendingUp, 
//   Globe, 
//   BookOpen, 
//   Users, 
//   ArrowRight, 
//   Play 
// } from "lucide-react";

// /**
//  * Unified Jaimax Landing Page - Complete Crypto Experience
//  * Perfect color combinations for cryptocurrency platform
//  * Features: Hero, Features, Why Choose, Hexagon sections
//  */

// const JaimaxLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Refs for sections
//   const heroRef = useRef(null);
//   const featuresRef = useRef(null);
//   const whyChooseRef = useRef(null);
//   const hexSectionRef = useRef(null);

//   // Mock navigation functions
//   const navigate = (path) => {
//     console.log(`Navigating to: ${path}`);
//   };

//   // Feature data with crypto-focused content
//   const features = [
//     {
//       icon: Shield,
//       title: "Secure Wallet Management",
//       description: "Advanced multi-signature wallets with hardware security module integration. Your private keys remain encrypted and protected with military-grade security protocols."
//     },
//     {
//       icon: Settings,
//       title: "DeFi Protocol Integration",
//       description: "Seamlessly interact with leading DeFi protocols including Uniswap, Compound, and Aave. Manage your yield farming and liquidity mining from one dashboard."
//     },
//     {
//       icon: CreditCard,
//       title: "Instant Crypto Payments",
//       description: "Send and receive payments in over 50+ cryptocurrencies with near-zero fees. Lightning-fast transactions powered by Layer 2 scaling solutions."
//     },
//     {
//       icon: Headphones,
//       title: "24/7 Crypto Support",
//       description: "Expert blockchain support team available around the clock. Get help with transactions, smart contracts, and technical issues from certified professionals."
//     },
//     {
//       icon: TrendingUp,
//       title: "Advanced Trading Analytics",
//       description: "Professional-grade charting tools, real-time market data, and AI-powered trading signals. Make informed decisions with comprehensive market analysis."
//     },
//     {
//       icon: Globe,
//       title: "Global Cross-Chain Bridge",
//       description: "Seamlessly bridge assets across Ethereum, BSC, Polygon, and other major blockchains. Access the entire DeFi ecosystem from one platform."
//     },
//     {
//       icon: BookOpen,
//       title: "Blockchain Education Hub",
//       description: "Comprehensive learning resources covering DeFi, NFTs, smart contracts, and crypto fundamentals. From beginner to advanced trading strategies."
//     },
//     {
//       icon: Users,
//       title: "DAO Governance & Voting",
//       description: "Participate in decentralized governance decisions. Vote on protocol upgrades, treasury allocation, and community proposals with your JMX tokens."
//     }
//   ];

//   // Crypto-themed images
//   const hexImages = [
//     {
//       src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop", // Bitcoin/crypto
//       rotate: "-5deg",
//       top: "0px",
//       left: "10px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop", // Ethereum
//       rotate: "10deg",
//       top: "210px",
//       left: "100px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=400&fit=crop", // Blockchain
//       rotate: "-15deg",
//       top: "0px",
//       left: "190px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=400&fit=crop", // DeFi
//       rotate: "8deg",
//       top: "210px",
//       left: "280px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&h=400&fit=crop", // Trading
//       rotate: "18deg",
//       top: "420px",
//       left: "10px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1640826843552-e525540f6d79?w=400&h=400&fit=crop", // Crypto mining
//       rotate: "-10deg",
//       top: "420px",
//       left: "190px",
//     },
//   ];

//   // Real-time crypto ticker component
//   const RealTimeTicker = () => (
//     <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 text-black py-3 overflow-hidden">
//       <div className="flex animate-scroll whitespace-nowrap">
//         <div className="flex space-x-8 text-sm font-bold">
//           <span>BTC: $67,234.56 ↗ +2.34%</span>
//           <span>ETH: $3,456.78 ↗ +1.23%</span>
//           <span>JMX: $12.45 ↗ +5.67%</span>
//           <span>BNB: $456.78 ↘ -0.45%</span>
//           <span>ADA: $0.67 ↗ +3.21%</span>
//           <span>DOT: $23.45 ↗ +2.87%</span>
//           <span>LINK: $16.78 ↘ -1.12%</span>
//           <span>UNI: $8.90 ↗ +4.56%</span>
//         </div>
//       </div>
//     </div>
//   );

//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const RotatedHex = ({ src, rotate, top, left }) => (
//     <div
//       className="absolute w-[180px] h-[200px] hex"
//       style={{ top, left, transform: `rotate(${rotate})` }}
//     >
//       <img src={src} alt="crypto hex" className="w-full h-full object-cover rounded-lg shadow-2xl" />
//     </div>
//   );

//   return (
//    <>
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
//       {/* Real-time Crypto Ticker */}
//       <RealTimeTicker />

//       {/* Hero Section with Feature Image */}
//       <section className="relative text-white px-4 md:px-6 overflow-hidden">
//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
//         </div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 py-12 md:py-14 gap-12 relative z-10">
//           {/* Left: Feature Image */}
//           <div className="relative w-full h-[380px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=500&fit=crop"
//                 alt="Jaimax Crypto Features"
//                 className="w-full h-full object-contain rounded-2xl shadow-2xl border border-amber-400/30"
//               />
//               {/* Floating crypto icons */}
//               <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
//                 <span className="text-black font-bold text-2xl">₿</span>
//               </div>
//               <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-bounce delay-500">
//                 <span className="text-white font-bold">Ξ</span>
//               </div>
//             </div>
//           </div>

//           {/* Right: Hero Content */}
//           <div className="z-20 flex flex-col justify-center">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
//               Life With <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Jaimax Coin</span><br />
//               Is Secure & <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Powerful</span>
//             </h1>
//             <p className="text-gray-300 mt-6 text-base sm:text-lg max-w-md leading-relaxed">
//               Experience seamless digital transactions and revolutionary blockchain technology with Jaimax. 
//               Join the future of decentralized finance today.
//             </p>
//             <div className="flex gap-4 mt-8 flex-wrap">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="group bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Start Investing
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
//               </button>
//               <button
//                 onClick={() => navigate("/blog")}
//                 className="flex items-center gap-3 px-8 py-4 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-black rounded-xl transition-all duration-300 font-bold"
//               >
//                 <div className="bg-amber-400 text-black p-2 rounded-full">
//                   <Play size={16} />
//                 </div>
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//  <div className="text-white bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Decorative SVG Background Overlay */}
    

//       {/* CTA Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
//         <div className="text-center">
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <button
//               onClick={() => navigate("/register")}
//               className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
//             >
//               Get Started Now
//               <ArrowRight
//                 className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
//                 size={20}
//               />
//             </button>

//             <button
//               onClick={() => navigate("/learn")}
//               className="px-8 py-4 border-2 border-emerald-400 text-emerald-300 font-bold text-lg rounded-full hover:bg-emerald-400 hover:text-black transition-all duration-300 w-full sm:w-auto"
//             >
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>


//       <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
//         <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
//                 Core <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Blockchain Features</span>
//               </h2>
//               <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
//                 Discover the powerful crypto features that make Jaimax the perfect choice for your DeFi journey
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {features.map((feature, index) => {
//                 const IconComponent = feature.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:bg-gradient-to-br hover:from-blue-800 hover:to-indigo-900 border border-slate-700 hover:border-amber-400/50"
//                   >
//                     <div className="flex flex-col h-full">
//                       <div className="flex items-center mb-6">
//                         <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mr-4">
//                           <IconComponent className="text-black" size={24} />
//                         </div>
//                         <h3 className="text-lg font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
//                           {feature.title}
//                         </h3>
//                       </div>
//                       <p className="text-gray-300 text-sm leading-relaxed flex-grow group-hover:text-gray-200 transition-colors duration-300 mb-4">
//                         {feature.description}
//                       </p>
//                       <div className="flex justify-end">
//                         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-300 shadow-lg">
//                           <ArrowRight
//                             className="text-white group-hover:text-black transform group-hover:translate-x-1 transition-all duration-300"
//                             size={16}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Jaimax Section */}
//       <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 text-white">
//         <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           <div className="text-center">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
//               Why <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Jaimax</span> Dominates Crypto
//             </h2>

//             <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
//               Jaimax isn't just another cryptocurrency — it's a revolutionary DeFi ecosystem built for scalable, 
//               secure, and profitable crypto solutions that deliver real value to investors.
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
//               <div className="rounded-2xl text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/30 hover:border-amber-400/70 p-8 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
//                 <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">99.9%</div>
//                 <div className="text-gray-300 text-base font-semibold mt-2">Network Uptime</div>
//                 <div className="text-gray-400 text-sm mt-1">Guaranteed Reliability</div>
//               </div>

//               <div className="rounded-2xl text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/30 hover:border-amber-400/70 p-8 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
//                 <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">250K+</div>
//                 <div className="text-gray-300 text-base font-semibold mt-2">Active Traders</div>
//                 <div className="text-gray-400 text-sm mt-1">Growing Community</div>
//               </div>

//               <div className="rounded-2xl text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-400/30 hover:border-amber-400/70 p-8 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
//                 <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">24/7</div>
//                 <div className="text-gray-300 text-base font-semibold mt-2">Expert Support</div>
//                 <div className="text-gray-400 text-sm mt-1">Always Available</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hexagon Visual Section */}
//       <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-transparent to-orange-500/5"></div>
        
//         <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
//           <div className="grid gap-16 lg:grid-cols-2 items-center">
            
//             {/* Left: Hexagon Images */}
//             <div className="relative h-[500px] lg:h-[600px]">
//               {hexImages.map((img, index) => (
//                 <RotatedHex
//                   key={index}
//                   src={img.src}
//                   rotate={img.rotate}
//                   top={img.top}
//                   left={img.left}
//                 />
//               ))}
              
//               {/* Floating elements */}
//               <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce shadow-2xl flex items-center justify-center">
//                 <span className="text-black font-bold text-xl">JMX</span>
//               </div>
//               <div className="absolute bottom-20 left-5 w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse shadow-2xl"></div>
//             </div>

//             {/* Right: Content */}
//             <div className="flex flex-col justify-center space-y-6">
//               <div className="hidden lg:block w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 mb-8 rounded"></div>

//               <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
//                 Maximize Your <br />
//                 <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Crypto Returns</span>
//               </h2>

//               <p className="text-lg lg:text-xl text-gray-300 max-w-md leading-relaxed">
//                 Earn up to <span className="font-bold text-emerald-400">25.5% APY</span> on your crypto holdings through our 
//                 advanced staking pools, liquidity mining, and yield farming strategies.
//               </p>

//               <div className="flex items-center gap-3 text-base font-semibold text-amber-400">
//                 <span className="inline-flex items-center justify-center w-6 h-6 border-2 border-amber-400 rounded-full text-sm">
//                   i
//                 </span>
//                 DeFi Yield Farming Disclosures
//               </div>

//               <button 
//                 onClick={() => navigate("/defi")}
//                 className="inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black px-10 py-4 text-lg font-bold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl w-fit"
//               >
//                 Start Earning Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer CTA */}
//       <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 py-16">
//         <div className="max-w-4xl mx-auto text-center px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Join the <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Crypto Revolution</span>?
//           </h2>
//           <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Start your journey with Jaimax today and be part of the decentralized finance ecosystem that's reshaping the future of money.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <button 
//               onClick={() => navigate("/register")}
//               className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
//             >
//               Create Free Account
//             </button>
//             <button 
//               onClick={() => navigate("/whitepaper")}
//               className="border-2 border-amber-400 text-amber-300 px-10 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 hover:text-black transition-all duration-300"
//             >
//               Read Whitepaper
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//    </>
//   );
// };

// export default JaimaxLanding;




// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Shield, 
//   Settings, 
//   CreditCard, 
//   Headphones, 
//   TrendingUp, 
//   Globe, 
//   BookOpen, 
//   Users, 
//   ArrowRight, 
//   Play 
// } from "lucide-react";

/**
 * Unified Jaimax Landing Page - Complete Crypto Experience
 * Primary Color: #085259 (Deep Teal)
 * Perfect color combinations for cryptocurrency platform
 * Features: Hero, Features, Why Choose, Hexagon sections
 */

// const JaimaxLanding = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Refs for sections
//   const heroRef = useRef(null);
//   const featuresRef = useRef(null);
//   const whyChooseRef = useRef(null);
//   const hexSectionRef = useRef(null);

//   // Mock navigation functions
//   const navigate = (path) => {
//     console.log(`Navigating to: ${path}`);
//   };

//   // Feature data with crypto-focused content
//   const features = [
//     {
//       icon: Shield,
//       title: "Secure Wallet Management",
//       description: "Advanced multi-signature wallets with hardware security module integration. Your private keys remain encrypted and protected with military-grade security protocols."
//     },
//     {
//       icon: Settings,
//       title: "DeFi Protocol Integration",
//       description: "Seamlessly interact with leading DeFi protocols including Uniswap, Compound, and Aave. Manage your yield farming and liquidity mining from one dashboard."
//     },
//     {
//       icon: CreditCard,
//       title: "Instant Crypto Payments",
//       description: "Send and receive payments in over 50+ cryptocurrencies with near-zero fees. Lightning-fast transactions powered by Layer 2 scaling solutions."
//     },
//     {
//       icon: Headphones,
//       title: "24/7 Crypto Support",
//       description: "Expert blockchain support team available around the clock. Get help with transactions, smart contracts, and technical issues from certified professionals."
//     },
//     {
//       icon: TrendingUp,
//       title: "Advanced Trading Analytics",
//       description: "Professional-grade charting tools, real-time market data, and AI-powered trading signals. Make informed decisions with comprehensive market analysis."
//     },
//     {
//       icon: Globe,
//       title: "Global Cross-Chain Bridge",
//       description: "Seamlessly bridge assets across Ethereum, BSC, Polygon, and other major blockchains. Access the entire DeFi ecosystem from one platform."
//     },
//     {
//       icon: BookOpen,
//       title: "Blockchain Education Hub",
//       description: "Comprehensive learning resources covering DeFi, NFTs, smart contracts, and crypto fundamentals. From beginner to advanced trading strategies."
//     },
//     {
//       icon: Users,
//       title: "DAO Governance & Voting",
//       description: "Participate in decentralized governance decisions. Vote on protocol upgrades, treasury allocation, and community proposals with your JMX tokens."
//     }
//   ];

//   // Crypto-themed images
//   const hexImages = [
//     {
//       src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
//       rotate: "-5deg",
//       top: "0px",
//       left: "10px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=400&fit=crop",
//       rotate: "10deg",
//       top: "210px",
//       left: "100px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=400&fit=crop",
//       rotate: "-15deg",
//       top: "0px",
//       left: "190px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=400&fit=crop",
//       rotate: "8deg",
//       top: "210px",
//       left: "280px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&h=400&fit=crop",
//       rotate: "18deg",
//       top: "420px",
//       left: "10px",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1640826843552-e525540f6d79?w=400&h=400&fit=crop",
//       rotate: "-10deg",
//       top: "420px",
//       left: "190px",
//     },
//   ];

//   // Real-time crypto ticker component

// const RealTimeTicker = () => {
//   const quotes = [
//     "BTC: $67,234.56 ↗ +2.34%",
//     "ETH: $3,456.78 ↗ +1.23%",
//     "JMX: $12.45 ↗ +5.67%",
//     "BNB: $456.78 ↘ -0.45%",
//     "ADA: $0.67 ↗ +3.21%",
//     "DOT: $23.45 ↗ +2.87%",
//     "LINK: $16.78 ↘ -1.12%",
//     "UNI: $8.90 ↗ +4.56%",
//   ];

//   return (
//     <div style={{ overflow: "hidden", background: "linear-gradient(to right, #22d3ee, #14b8a6, #10b981)", padding: "12px 0", color: "#111827" }}>
//       {/* Inline <style> for ticker animation */}
//       <style>
//         {`
//           @keyframes tickerScroll {
//             0%   { transform: translateX(100%); }
//             100% { transform: translateX(-100%); }
//           }
//           .ticker-track {
//             display: flex;
//             white-space: nowrap;
//             animation: tickerScroll 12s linear infinite;
//           }
//           .ticker-item {
//             margin: 0 1rem;
//             font-weight: bold;
//             font-size: 0.875rem;
//           }
//         `}
//       </style>

//       {/* Ticker content */}
//       <div className="ticker-track">
//         {[...quotes, ...quotes].map((text, idx) => (
//           <span className="ticker-item" key={idx}>
//             {text}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };
//   const RotatedHex = ({ src, rotate, top, left }) => (
//     <div
//       className="absolute w-[180px] h-[200px] hex"
//       style={{ top, left, transform: `rotate(${rotate})` }}
//     >
//       <img src={src} alt="crypto hex" className="w-full h-full object-cover rounded-lg shadow-2xl border border-cyan-400/30" />
//     </div>
//   );

//   return (
//    <>
//     <div className="min-h-screen" style={{ backgroundColor: '#085259' }}>
//       {/* Real-time Crypto Ticker */}
//       <RealTimeTicker />

//       {/* Hero Section with Feature Image */}
//       <section className="relative text-white px-4 md:px-6 overflow-hidden">
//         {/* Animated background elements */}
//         {/* <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-teal-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
//         </div> */}

//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 py-12 md:py-16 lg:py-20 gap-8 lg:gap-12 relative z-10 items-center">
//           {/* Left: Feature Image */}
//           <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex items-center justify-center order-2 lg:order-1">
//             <div className="relative w-full max-w-[500px]">
//               <img
//                 src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=500&fit=crop"
//                 alt="Jaimax Crypto Features"
//                 className="w-full h-full object-contain rounded-2xl shadow-2xl border border-cyan-400/30"
//               />
//               {/* Floating crypto icons */}
//               <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
//                 <span className="text-gray-900 font-bold text-lg sm:text-2xl">₿</span>
//               </div>
//               <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl animate-bounce delay-500">
//                 <span className="text-gray-900 font-bold text-sm sm:text-base">Ξ</span>
//               </div>
//             </div>
//           </div>

//           {/* Right: Hero Content */}
//           <div className="z-20 flex flex-col justify-center order-1 lg:order-2 text-center lg:text-left">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//               Life With <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Jaimax Coin</span><br />
//               Is Secure & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Powerful</span>
//             </h1>
//             <p className="text-gray-200 text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
//               Experience seamless digital transactions and revolutionary blockchain technology with Jaimax. 
//               Join the future of decentralized finance today.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="group bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
//               >
//                 Start Investing
//                 <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
//               </button>
//               <button
//                 onClick={() => navigate("/blog")}
//                 className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-gray-900 rounded-xl transition-all duration-300 font-bold text-sm sm:text-base"
//               >
//                 <div className="bg-cyan-400 text-gray-900 p-2 rounded-full">
//                   <Play size={16} />
//                 </div>
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <div className="text-white relative overflow-hidden" style={{ backgroundColor: '#0a6b73' }}>
//         {/* CTA Content */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//           <div className="text-center">
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-gray-900 font-bold text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
//               >
//                 Get Started Now
//                 <ArrowRight
//                   className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300"
//                   size={20}
//                 />
//               </button>

//               <button
//                 onClick={() => navigate("/learn")}
//                 className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-emerald-400 text-emerald-300 font-bold text-base sm:text-lg rounded-full hover:bg-emerald-400 hover:text-gray-900 transition-all duration-300 w-full sm:w-auto"
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="text-white" style={{ backgroundColor: '#085259' }}>
//         <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-12 lg:mb-16">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
//                 Core <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Blockchain Features</span>
//               </h2>
//               <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
//                 Discover the powerful crypto features that make Jaimax the perfect choice for your DeFi journey
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
//               {features.map((feature, index) => {
//                 const IconComponent = feature.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="group bg-gradient-to-br from-teal-800/60 to-cyan-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:bg-gradient-to-br hover:from-teal-700/70 hover:to-cyan-800/70 border border-teal-600/30 hover:border-cyan-400/50"
//                   >
//                     <div className="flex flex-col h-full">
//                       <div className="flex flex-col sm:flex-row sm:items-center mb-6">
//                         <div className="bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
//                           <IconComponent className="text-gray-900" size={20} />
//                         </div>
//                         <h3 className="text-base sm:text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 text-center sm:text-left">
//                           {feature.title}
//                         </h3>
//                       </div>
//                       <p className="text-gray-200 text-sm leading-relaxed flex-grow group-hover:text-gray-100 transition-colors duration-300 mb-4 text-center sm:text-left">
//                         {feature.description}
//                       </p>
//                       <div className="flex justify-center sm:justify-end">
//                         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-cyan-600 group-hover:from-cyan-400 group-hover:to-teal-500 transition-all duration-300 shadow-lg">
//                           <ArrowRight
//                             className="text-gray-900 transform group-hover:translate-x-1 transition-all duration-300"
//                             size={16}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Jaimax Section */}
//       <div className="text-white" style={{ backgroundColor: '#0a6b73' }}>
//         <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//           <div className="text-center">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
//               Why <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Jaimax</span> Dominates Crypto
//             </h2>

//             <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
//               Jaimax isn't just another cryptocurrency — it's a revolutionary DeFi ecosystem built for scalable, 
//               secure, and profitable crypto solutions that deliver real value to investors.
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
//               <div className="rounded-2xl text-center bg-gradient-to-br from-teal-800/60 to-cyan-900/60 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/70 p-6 lg:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
//                 <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">99.9%</div>
//                 <div className="text-gray-200 text-sm sm:text-base font-semibold mt-2">Network Uptime</div>
//                 <div className="text-gray-300 text-xs sm:text-sm mt-1">Guaranteed Reliability</div>
//               </div>

//               <div className="rounded-2xl text-center bg-gradient-to-br from-teal-800/60 to-cyan-900/60 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/70 p-6 lg:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
//                 <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">250K+</div>
//                 <div className="text-gray-200 text-sm sm:text-base font-semibold mt-2">Active Traders</div>
//                 <div className="text-gray-300 text-xs sm:text-sm mt-1">Growing Community</div>
//               </div>

//               <div className="rounded-2xl text-center bg-gradient-to-br from-teal-800/60 to-cyan-900/60 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/70 p-6 lg:p-8 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 sm:col-span-2 lg:col-span-1">
//                 <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">24/7</div>
//                 <div className="text-gray-200 text-sm sm:text-base font-semibold mt-2">Expert Support</div>
//                 <div className="text-gray-300 text-xs sm:text-sm mt-1">Always Available</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hexagon Visual Section */}
//       <div className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#085259' }}>
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-teal-500/5"></div>
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            
//             {/* Left: Hexagon Images */}
//             <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1">
//               {hexImages.map((img, index) => (
//                 <RotatedHex
//                   key={index}
//                   src={img.src}
//                   rotate={img.rotate}
//                   top={img.top}
//                   left={img.left}
//                 />
//               ))}
              
//               {/* Floating elements */}
//               <div className="absolute top-10 right-10 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-bounce shadow-2xl flex items-center justify-center">
//                 <span className="text-gray-900 font-bold text-lg sm:text-xl">JMX</span>
//               </div>
//               <div className="absolute bottom-20 left-5 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse shadow-2xl"></div>
//             </div>

//             {/* Right: Content */}
//             <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2 text-center lg:text-left">
//               <div className="hidden lg:block w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mb-8 rounded"></div>

//               <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
//                 Maximize Your <br />
//                 <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Crypto Returns</span>
//               </h2>

//               <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-lg mx-auto lg:mx-0 leading-relaxed">
//                 Earn up to <span className="font-bold text-emerald-400">25.5% APY</span> on your crypto holdings through our 
//                 advanced staking pools, liquidity mining, and yield farming strategies.
//               </p>

//               <div className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-base font-semibold text-cyan-400">
//                 <span className="inline-flex items-center justify-center w-6 h-6 border-2 border-cyan-400 rounded-full text-sm">
//                   i
//                 </span>
//                 DeFi Yield Farming Disclosures
//               </div>

//               <div className="flex justify-center lg:justify-start">
//                 <button 
//                   onClick={() => navigate("/defi")}
//                   className="inline-block rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 text-gray-900 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold hover:from-cyan-500 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
//                 >
//                   Start Earning Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer CTA */}
//       <div className="py-16" style={{ backgroundColor: '#0a6b73' }}>
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
//             Ready to Join the <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Crypto Revolution</span>?
//           </h2>
//           <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Start your journey with Jaimax today and be part of the decentralized finance ecosystem that's reshaping the future of money.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
//             <button 
//               onClick={() => navigate("/register")}
//               className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-gray-900 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
//             >
//               Create Free Account
//             </button>
//             <button 
//               onClick={() => navigate("/whitepaper")}
//               className="border-2 border-cyan-400 text-cyan-300 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
//             >
//               Read Whitepaper
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//    </>
//   );
// };

// export default JaimaxLanding;
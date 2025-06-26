import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
import homeBgMobile from "../../assets/Images/HomeMobile.jpg";
const Threads = React.lazy(() => import('../../global/Threads'));
import Roadmap from './RoadmapDup';
import Partners from './Partners';
import HomeFooter from './HomeFoot';
import JaimaxFAQ from './Faq';
import AnimatedTestimonials from './Testimonals';
import ServicesComponent from './Homeservices';
import PhaseCarousel from './Phase';
import CryptoStakingSection from './HomeAbout';
import HomeContact from './HomeContact';
const Home = () => {
  const [currentBg, setCurrentBg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateBackgroundImage = () => {
      setCurrentBg(window.innerWidth < 768 ? homeBgMobile : homeBgDesktop);
    };

    const debounceResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(updateBackgroundImage, 150);
    };

    updateBackgroundImage();
    window.addEventListener('resize', debounceResize);

    return () => {
      window.removeEventListener('resize', debounceResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  const handleJoinRevolution = () => {
    navigate('/login');
  };

  return (
    <div className="outer-container">

      {/* Hero Section */}

      {/* <div className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-[#1d8e85]">


  <div className="absolute inset-0 bg-gradient-to-b from-[#1d8e85] via-[#1d8e85] to-[#10766e] opacity-90 z-0"></div>


  <img
    src={homeBgDesktop}
    alt="Jaimax Coin"
    className="absolute inset-0 w-full h-full object-cover sm:object-contain md:object-cover z-0 opacity-80"
  />

 
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="absolute top-6 left-6 z-10 max-w-[80%] md:max-w-[40%]"
  >
    <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
      🌐 Empowering a <span className="font-bold text-[#e2f531]">Decentralized Tomorrow</span> with Trust & Technology
    </p>
  </motion.div>

  
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-6 right-6 z-10 text-right max-w-[80%] md:max-w-[40%]"
  >
    <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
      💸 Unlock Financial <span className="font-bold text-[#e2f531]">Freedom</span> with <span className="font-semibold text-[#fff]">Jaimax</span>
    </p>
  </motion.div>

 
  <div className="relative z-10 px-4 text-center mt-auto mb-20 sm:mb-24 md:mb-32 max-w-[90%]">
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl"
      style={{ textShadow: '0 3px 8px rgba(0,0,0,0.5)' }}
    >
      <span className="block text-[#b8cc26]">Secure Your</span>
      <span className="block">Financial Tomorrow</span>
      <span className="block">with Innovation & Trust</span>
    </motion.h1>

    <div className="mt-6 sm:mt-8">
      <button
        onClick={handleJoinRevolution}
        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1e964a] hover:bg-lime-600 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg border border-[#bace27] shadow-xl transition-transform duration-300 hover:scale-105"
      >
        Join the Jaimax Revolution
      </button>
    </div>
  </div> */}

      {/* 

<div className="w-full min-h-screen relative flex items-center justify-center overflow-hidden bg-[#1d8e85]">

  <div className="absolute inset-0 bg-gradient-to-b from-[#1d8e85] via-[#1d8e85] to-[#10766e] opacity-90 z-0"></div>


  <img
    src={homeBgDesktop}
    alt="Jaimax Coin"
    className="absolute inset-0 w-full h-full object-cover sm:object-contain md:object-cover z-0 opacity-80"
  />


  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.3 }}
    className="absolute top-6 left-6 z-10 max-w-[80%] md:max-w-[40%]"
  >
    <p className="text-white text-xs sm:text-sm md:text-lg font-semibold drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
      🌍 Empowering <span className="text-[#e2f531]">Decentralized Finance</span> for Everyone
    </p>
  </motion.div>

  
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-6 right-6 z-10 text-right max-w-[80%] md:max-w-[40%]"
  >
    <p className="text-white text-xs sm:text-sm md:text-lg font-semibold drop-shadow-md" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
      ⚡ Fast. 🔒 Secure. 💡 Transparent. <span className="text-[#e2f531]">Powered by Jaimax</span>
    </p>
  </motion.div>


  <div className="relative z-10 px-4 text-center mt-auto mb-20 sm:mb-24 md:mb-32 max-w-[90%]">
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl"
      style={{ textShadow: '0 3px 8px rgba(0,0,0,0.5)' }}
    >
      <span className="block text-[#b8cc26]">Secure Your</span>
      <span className="block">Financial Tomorrow</span>
      <span className="block">with Innovation & Trust</span>
    </motion.h1>

    <p className="mt-4 text-white text-sm sm:text-base md:text-lg drop-shadow-md">
      Join the movement transforming finance for the new generation.
    </p>

    <div className="mt-6 sm:mt-8">
      <button
        onClick={handleJoinRevolution}
        className="px-6 sm:px-8 py-3 bg-[#1e964a] hover:bg-lime-600 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg border border-[#bace27] shadow-xl transition-transform duration-300 hover:scale-105"
      >
        Join the Jaimax Revolution
      </button>
    </div>
  </div> */}


      {/* <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0a0f11] via-[#121a1c] to-[#0f2021] flex items-center justify-center overflow-hidden px-4 sm:px-8">

  <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1d8e85]/20 via-[#1d8e85]/10 to-transparent"></div>


  <div className="relative z-10 text-center max-w-4xl">
   
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight"
    >
      Empowering Financial Freedom.<br />
      Built for Everyone.
    </motion.h1>

 
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-white/70 text-base sm:text-lg mt-6"
    >
      Jaimax connects innovation with trust to create a truly decentralized financial future—fast, transparent, and accessible.
    </motion.p>


    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="mt-10 flex justify-center flex-wrap gap-4"
    >
      <button className="bg-gradient-to-r from-[#8e60f8] to-[#c96fff] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
        Start Building
      </button>
      <button className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all">
        Explore Resources
      </button>
    </motion.div>
  </div> */}





      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8 bg-[#09535a]">

        {/* ✅ Background Image with blur */}
        <img
          src={homeBgDesktop}
          alt="Jaimax Background"
          className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-110 opacity-90 blur-sm z-0"
        />

        {/* ✅ Layered overlay with smooth glow */}
        <div className="absolute inset-0 z-0" />

        {/* ✅ Glow Ring Effect */}
        <div className="absolute w-[500px] h-[500px] bg-[#b8cc26]/10 rounded-full blur-3xl opacity-50 z-0 top-[10%] left-[10%]" />
        <div className="absolute w-[400px] h-[400px] bg-[#1d8e85]/20 rounded-full blur-2xl opacity-40 z-0 bottom-[5%] right-[5%]" />

        {/* ✅ Foreground Content */}
        <div className="relative z-10 text-center mt-16 max-w-4xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]"
          >
            <span className="block text-[#b8cc26]">Secure Your</span>
            <span className="block">Financial Tomorrow</span>
            <span className="block text-[#ffffff]">with Innovation & Trust</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white/80 text-base sm:text-lg mt-6 drop-shadow-sm"
          >
            Jaimax blends blockchain technology with speed and safety — built to empower the next generation of financial freedom.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex justify-center flex-wrap gap-4"
          >
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] text-[#0f1c14] px-6 py-3 rounded-full font-bold shadow-xl hover:scale-110 transition-transform duration-300">
              Start Building
            </button>
            <button
              onClick={() => navigate("/blog")}
              className="border border-yellow-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 hover:border-yellow-300 transition-all duration-300"
            >
              Explore Resources
            </button>

          </motion.div>
        </div>



        {/* <div
        className="revolutionSection w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
       
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-square square-1"></div>
          <div className="floating-square square-2"></div>
        </div>

       
        <div className="gradient-overlay-1"></div>
        <div className="gradient-overlay-2"></div>

        <div className="relative z-10 text-center px-6 md:px-12 max-w-6xl mx-auto mt-44 md:mt-48">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="tagline text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-center"
          >
            <span
              style={{
                color: '#b8cc26',
                display: 'block',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
              }}
            >
              Secure Your Financial Tomorrow
            </span>
            <span
              style={{
                color: '#fff',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                display: 'block',
                marginTop: '0.5rem',
              }}
            >
              with Innovation & Trust
            </span>
          </motion.h2>

        
          <div className="cta-section mt-6">
            <button
              className="cta-button rounded-full hover:bg-lime-600 transition-transform duration-300 hover:scale-105"
              style={{
                padding: "1rem 3rem",
                color: "white",
                backgroundColor: "#1e964a",
                boxShadow: "0 0 12px rgba(186, 206, 39, 0.5)",
                border: "1px solid #bace27"
              }}
              onClick={handleJoinRevolution}
            >
              <span className="uppercase tracking-wide font-semibold">Join Revolution</span>
            </button>
          </div>
        </div> */}

        {/* Threads Animation */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-[400px] md:h-[600px] pointer-events-none">
          <div className="w-full h-full relative opacity-60">
            <Suspense fallback={<div>Loading threads...</div>}>
              <Threads
                amplitude={1.5}
                distance={0}
                enableMouseInteraction={true}
              />
            </Suspense>
          </div>
        </div> */}
      </div>

      {/* Page Sections */}
      <CryptoStakingSection />
      {/* <PhaseCarousel /> */}
      <ServicesComponent />
      <Roadmap />
      {/* <img  src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg.png"  className="absolute left-20 right-20 ml-20" alt="" /> */}
      {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg-space.png"  alt=""/> */}
      {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg1.png" alt="" /> */}
      {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg-1.png" alt="" /> */}

      <Partners />
      <AnimatedTestimonials />
      <JaimaxFAQ />
      {/* <HomeContact /> */}
      <HomeFooter />
    </div>
  );
};

export default Home;

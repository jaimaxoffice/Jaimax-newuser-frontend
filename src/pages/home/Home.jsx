import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
import homeBgMobile from "../../assets/Images/HomeMobile.jpg";
const Threads = React.lazy(() => import('../../global/Threads'));

import Partners from './Partners';
import HomeFooter from './HomeFoot';
import JaimaxFAQ from './Faq';
import AnimatedTestimonials from './Testimonals';
import ServicesComponent from './Homeservices';
import PhaseCarousel from './Phase';
import CryptoStakingSection from './HomeAbout';
import HomeContact from './HomeContact';
import GrowthPlanTimeline from './Phase';
import RealTimeTicker from './scroll';
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
            className="text-white/80 text-base sm:text-lg mt-6 "
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


      </div>

      {/* Page Sections */}
      <CryptoStakingSection />
      {/* <PhaseCarousel /> */}
      <ServicesComponent />
      {/* <Roadmap /> */}
      <GrowthPlanTimeline />
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

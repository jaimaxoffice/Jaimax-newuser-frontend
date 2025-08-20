import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
import homeBgMobile from "../../assets/Images/HomeMobile.jpg";
const Threads = React.lazy(() => import("../../global/Threads"));
import Partners from "./Partners";
import HomeFooter from "./HomeFoot";
import JaimaxFAQ from "./Faq";
import AnimatedTestimonials from "./Testimonals";
import ServicesComponent from "./Homeservices";
import GrowthPlanTimeline from "./Phase";
import CryptoStakingSection from "./HomeAbout";
import HomeContact from "./HomeContact";
import RealTimeTicker from "./scroll";
import JaimaxRoadmap from "./RoadmapDup";
import CreativePartnersComponent from "./Partners";
import seoContent from "../../SeoContent/seoContent";
import ChatAssistant from "./chatComponent";
// import { Helmet } from 'react-helmet-async';
const Home = () => {
  const [currentBg, setCurrentBg] = useState(homeBgDesktop);
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  const { title, description } = seoContent.homePage;

  const toggleChat = () => setChatOpen((prev) => !prev);

  useEffect(() => {
    const updateBackgroundImage = () => {
      setCurrentBg(window.innerWidth < 768 ? homeBgMobile : homeBgDesktop);
    };

    const debounceResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(updateBackgroundImage, 150);
    };

    updateBackgroundImage();
    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  const handleJoinRevolution = () => {
    navigate("/login");
  };

  return (
    <>
      {/* <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Jaimax, crypto, blockchain, India" />
      </Helmet> */}
      <div className="outer-container">
        <div className="relative min-h-screen flex flex-col justify-center">
          {/* Background Image with proper mobile optimization */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={currentBg}
              alt="Jaimax Background"
              className="w-full h-full object-cover object-center"
            />
            {/* Enhanced overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          </div>

          {/* Content Container - Mobile First */}
          <div
            className="relative z-10 px-4 py-4 mx-auto w-full max-w-9xl
                        "
          >
            {/* Main Content */}
            <div className="relative w-full h-[100vh] max-w-8xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
              {/* h1 - Top Left */}
              <motion.h1
                initial={{ opacity: 0, x: -30, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-6 left-4 sm:top-10 sm:left-10 font-600 leading-tight 
               text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
               text-3xl sm:text-4xl md:text-5xl lg:text-6xl space-y-1"
              >
                <span className="block text-[#b8cc26]">Secure Your</span>
                <span className="block">Financial Tomorrow</span>
                <span className="block">with Innovation</span>
                <span className="block">and Trust</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10
    text-white text-sm sm:text-base md:text-lg lg:text-xl 
    font-medium max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg text-right space-y-4"
              >
                Our expertly designed platform ensures a seamless and secure
                investment process, allowing you to capitalize on the dynamic
                nature of the cryptocurrency market.
                <button
                  onClick={() => navigate("/login")}
                  className="block ml-auto mt-4 font-bold text-center
      bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] 
      text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
      rounded-full hover:scale-105 active:scale-95
      transition-transform duration-300 px-4 py-2"
                >
                  Start Building
                </button>
              </motion.p>
            </div>
          </div>
        </div>

        {/* Components Section - Proper spacing for mobile */}
        <div className="w-full">
          {/* AI Assistant Button */}
   
          <CryptoStakingSection />
          <ServicesComponent />
          <GrowthPlanTimeline />
          <CreativePartnersComponent />
          <AnimatedTestimonials />
          <JaimaxRoadmap />
          <JaimaxFAQ />
          <HomeContact />
          <HomeFooter />
        </div>
      </div>
    </>
  );
};

export default Home;

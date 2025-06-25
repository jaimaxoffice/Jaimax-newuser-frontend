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
      <div
        className="revolutionSection w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-square square-1"></div>
          <div className="floating-square square-2"></div>
        </div>

        {/* Overlays */}
        <div className="gradient-overlay-1"></div>
        <div className="gradient-overlay-2"></div>

        {/* Main Heading */}
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

          {/* CTA Button */}
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
        </div>

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
      <PhaseCarousel />
      <ServicesComponent />
      <Roadmap />
{/* <img  src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg.png"  className="absolute left-20 right-20 ml-20" alt="" /> */}
{/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg-space.png"  alt=""/> */}
{/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg1.png" alt="" /> */}
{/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg-1.png" alt="" /> */}

      <Partners />
      <AnimatedTestimonials />
      <JaimaxFAQ />
      <HomeContact />
      <HomeFooter />
    </div>
  );
};

export default Home;

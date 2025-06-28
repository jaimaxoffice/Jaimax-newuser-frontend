// import React, { useState, useEffect, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
// import homeBgMobile from "../../assets/Images/HomeMobile.jpg";
// const Threads = React.lazy(() => import('../../global/Threads'));

// import Partners from './Partners';
// import HomeFooter from './HomeFoot';
// import JaimaxFAQ from './Faq';
// import AnimatedTestimonials from './Testimonals';
// import ServicesComponent from './Homeservices';
// import PhaseCarousel from './Phase';
// import CryptoStakingSection from './HomeAbout';
// import HomeContact from './HomeContact';
// import GrowthPlanTimeline from './Phase';
// import RealTimeTicker from './scroll';
// import JaimaxRoadmap from './RoadmapDup';
// import CreativePartnersComponent from './Partners';
// const Home = () => {
//   const [currentBg, setCurrentBg] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updateBackgroundImage = () => {
//       setCurrentBg(window.innerWidth < 768 ? homeBgMobile : homeBgDesktop);
//     };

//     const debounceResize = () => {
//       clearTimeout(window.resizeTimeout);
//       window.resizeTimeout = setTimeout(updateBackgroundImage, 150);
//     };

//     updateBackgroundImage();
//     window.addEventListener('resize', debounceResize);

//     return () => {
//       window.removeEventListener('resize', debounceResize);
//       clearTimeout(window.resizeTimeout);
//     };
//   }, []);

//   const handleJoinRevolution = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="outer-container">
//           {/* <RealTimeTicker/> */}
//       <div className="relative w-full min-h-screen flex items-start justify-start overflow-hidden px-4 sm:px-10 pt-28 bg-[#09535a]">
//   <img
//     src={currentBg}
//     alt="Jaimax Background"
//     className="absolute inset-0 w-full h-full object-cover z-0"
//   />

//   <div className="absolute inset-0 z-0" />
//   <div className="relative z-10 text-start max-w-3xl sm:max-w-4xl">
//     <motion.h1
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//       className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]"
//     >
//       <span className="block text-[#b8cc26]">Secure Your</span>
//       <span className="block">Financial Tomorrow</span>
//       <span className="block text-white">with Innovation</span>
//       <span className="block text-white">and Trust</span>
//     </motion.h1>
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 1, duration: 1 }}
//       className="mt-10 flex flex-wrap gap-4"
//     >
//       <button
//         onClick={() => navigate("/login")}
//         className="bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] text-[#0f1c14] px-6 py-3 rounded-full font-bold shadow-xl hover:scale-110 transition-transform duration-300">
//         Start Building
//       </button>
//       <button
//         onClick={() => navigate("/blog")}
//         className="border border-yellow-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 hover:border-yellow-300 transition-all duration-300"
//       >
//         Explore Resources
//       </button>
//     </motion.div>
//     {/* <motion.p
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.5, duration: 1 }}
//       className="text-white text-base sm:text-lg mt-6"
//     >
//       Jaimax blends blockchain technology with speed and safety — built to empower the next generation of financial freedom.
//     </motion.p> */}
//     <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-xl shadow-lg w-[90%] sm:w-[380px]">
//   <p className="text-sm sm:text-base leading-relaxed mb-3">
//     Our expertly designed platform ensures a seamless and secure investment process, allowing you to capitalize on the dynamic nature of the cryptocurrency market.
//   </p>
//   <button className="bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white text-sm px-4 py-2 rounded-full font-semibold transition duration-300">
//     Join the Revolution
//   </button>
// </div>



//   </div>
// </div>

//       <CryptoStakingSection />
//       {/* <PhaseCarousel /> */}
//       <ServicesComponent />
//       {/* <Roadmap /> */}
//       <GrowthPlanTimeline />
//       <img  src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg.png"  className="absolute left-20 right-20 ml-20" alt="" />
//       {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg-space.png"  alt=""/> */}
//       {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg1.png" alt="" /> */}
//       {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg-1.png" alt="" /> */}

//       <CreativePartnersComponent/>
//       <AnimatedTestimonials />
//       <JaimaxRoadmap/>
//       <JaimaxFAQ />
//       <HomeContact />
//       <HomeFooter />
//     </div>
//   );
// };

// export default Home;






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
import GrowthPlanTimeline from './Phase';
import CryptoStakingSection from './HomeAbout';
import HomeContact from './HomeContact';
import RealTimeTicker from './scroll';
import JaimaxRoadmap from './RoadmapDup';
import CreativePartnersComponent from './Partners';

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
      <div className="relative w-full min-h-screen flex items-start justify-start overflow-hidden px-4 sm:px-10 pt-28 pb-40 sm:pb-28 bg-[#09535a]">
        {/* Background Image */}
        <img
          src={currentBg}
          alt="Jaimax Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay Layer */}
        <div className="absolute inset-0 z-0" />

        {/* Headline & CTA */}
        <div className="relative z-10 text-start max-w-3xl sm:max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]"
          >
            <span className="block text-[#b8cc26]">Secure Your</span>
            <span className="block">Financial Tomorrow</span>
            <span className="block text-white">with Innovation</span>
            <span className="block text-white">and Trust</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] text-[#0f1c14] px-6 py-3 rounded-full font-bold shadow-xl hover:scale-110 transition-transform duration-300"
            >
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

        {/* Bottom CTA Box - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="
            hidden sm:block
            absolute
            bottom-24 sm:bottom-14 md:bottom-20 lg:bottom-24
            left-4 sm:left-auto sm:right-6
            w-[92%] sm:w-[420px]
           
            text-white px-6 py-5
            rounded-2xl shadow-xl text-center
            z-10
          "
        >
          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
            Our expertly designed platform ensures a seamless and secure investment process,
            allowing you to capitalize on the dynamic nature of the cryptocurrency market.
          </p>
          <button
            onClick={handleJoinRevolution}
            className="bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] text-[#0f1c14] hover:text-[#0e9488] font-bold text-sm sm:text-base px-6 py-3 mt-2 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          >
            Join the Revolution
          </button>
        </motion.div>
      </div>

      {/* Main Sections Below Hero */}
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
  );
};

export default Home;

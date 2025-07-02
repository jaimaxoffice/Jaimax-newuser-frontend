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
// import GrowthPlanTimeline from './Phase';
// import CryptoStakingSection from './HomeAbout';
// import HomeContact from './HomeContact';
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
//       {/* Hero Section */}
//       <div className="relative w-full min-h-screen flex items-start justify-start overflow-hidden px-4 sm:px-10 pt-0  sm:pt-5 pb-40 sm:pb-28 ">
//         {/* Background Image */}
//         <img
//           src={currentBg}
//           alt="Jaimax Background"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//         />

//         {/* Overlay Layer */}
//         <div className="absolute inset-0 z-0" />

//         {/* Headline & CTA */}
//         <div className="relative z-10 text-start max-w-3xl sm:max-w-4xl">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]"
//           >
//             <span className="block text-[#b8cc26]">Secure Your</span>
//             <span className="block">Financial Tomorrow</span>
//             <span className="block text-white">with Innovation</span>
//             <span className="block text-white">and Trust</span>
//           </motion.h1>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1, duration: 1 }}
//             className="mt-28 pt-60 sm:mt-12 flex flex-wrap gap-4"
//           >

//             <button
//               onClick={() => navigate("/login")}
//               className="bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] text-[#0f1c14] px-6 py-3 rounded-full font-bold shadow-xl hover:scale-110 transition-transform duration-300"
//             >
//               Start Building
//             </button>
//             <button
//               onClick={() => navigate("/blog")}
//               className="border border-yellow-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 hover:border-yellow-300 transition-all duration-300"
//             >
//               Explore Resources
//             </button>
//             <p className="text-lg text-[#1dcad5] sm:text-lg md:text-lg leading-relaxed mb-4 sm:text-white font-extrabold">
//               Our expertly designed platform ensures a seamless and secure investment process,
//               allowing you to capitalize on the dynamic nature of the cryptocurrency market.
//             </p>
//           </motion.div>
//         </div>

//       </div>
//       <CryptoStakingSection />
//       <ServicesComponent />
//       <GrowthPlanTimeline />
//       <CreativePartnersComponent />
//       <AnimatedTestimonials />
//       <JaimaxRoadmap />
//       <JaimaxFAQ />
//       <HomeContact />
//       <HomeFooter />
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
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
      {/* Hero Section - Mobile First Design */}
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
        <div className="relative z-10 px-4 py-4 mx-auto w-full max-w-9xl
                        ">
          
          {/* Main Content */}
          <div className="max-w-9xl sm:max-w-8xl md:max-w-9xl lg:max-w-7xl">
            
            {/* Headline - Optimized for mobile reading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-bold leading-[1.1] mb-3
                         text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                         text-3xl
                         sm:text-4xl sm:leading-[1.1] sm:mb-4
                         md:text-5xl md:leading-[1.1] md:mb-6
                         lg:text-6xl lg:leading-[1.1] lg:mb-8"
            >
              <span className="block text-[#b8cc26] mb-1 sm:mb-2">Secure Your</span>
              <span className="block mb-1 sm:mb-2">Financial Tomorrow</span>
              <span className="block mb-1 sm:mb-2">with Innovation</span>
              <span className="block">and Trust</span>
            </motion.h1>

            {/* Description - Mobile optimized typography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-semibold leading-relaxed mb-4
                          text-base
                         text-white sm:text-lg sm:mb-10
                         md:text-xl md:mb-4
                         lg:text-xl lg:mb-6
                         max-w-full sm:max-w-xl md:max-w-2xl"
            >
              Our expertly designed platform ensures a seamless and secure investment process,
              allowing you to capitalize on the dynamic nature of the cryptocurrency market.
            </motion.p>

            {/* CTA Buttons - Touch-friendly mobile design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col gap-4 w-full
                         sm:flex-row sm:gap-6
                         md:gap-8"
            >
              {/* Primary CTA - Mobile optimized */}
              <button
                onClick={() => navigate("/login")}
                className="w-full font-bold text-center
                          bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f] 
                          text-[#0f1c14] shadow-xl
                          px-6 py-4 text-lg rounded-full
                          hover:scale-105 active:scale-95
                          transition-transform duration-300
                          sm:w-auto sm:min-w-[180px] sm:px-8 sm:py-4 sm:text-lg
                          md:min-w-[200px] md:px-8 md:py-4 md:text-xl
                          lg:min-w-[220px] lg:px-10 lg:py-5 lg:text-xl
                          touch-manipulation"
                
              >
                Start Building
              </button>
              
              {/* Secondary CTA - Mobile optimized */}
              <button
                onClick={() => navigate("/blog")}
                className="w-full font-semibold text-center
                          border-2 border-yellow-400 text-white
                          px-6 py-4 text-lg rounded-full
                          hover:bg-white/10 hover:border-yellow-300 
                          active:bg-white/5
                          transition-all duration-300
                          sm:w-auto sm:min-w-[180px] sm:px-4 sm:py-4 sm:text-lg
                          md:min-w-[200px] md:px-10 md:py-4 md:text-xl
                          lg:min-w-[220px] lg:px-12 lg:py-5 lg:text-xl
                          touch-manipulation"
               
              >
                Explore Resources
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Components Section - Proper spacing for mobile */}
      <div className="w-full">
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
  );
};

export default Home;
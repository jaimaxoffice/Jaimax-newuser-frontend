// // "use client";
// // import React, { useRef } from 'react'; // Import useRef
// // import logoLeft from '../../assets/images/logowithleft.svg';
// // import { motion } from 'framer-motion';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import 'swiper/css';
// // import 'swiper/css/navigation';
// // import 'swiper/css/pagination';
// // import { Navigation, Pagination, A11y } from 'swiper/modules';
// // import { ArrowLeft, ArrowRight } from 'lucide-react';


// // function PhaseCarousel() {
// //   const bounceUpVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// //   };

// //   const navigationPrevRef = useRef(null); 
// //   const navigationNextRef = useRef(null);

// //   const phaseData = [
// //     {
// //       status: "Live",
// //       phaseNo: "Phase 1",
// //       tokens: "10 Billion Tokens",
// //       price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
// //       button: "Buy Now",
// //     },
// //     {
// //       status: "Upcoming",
// //       phaseNo: "Phase 2",
// //       tokens: "20 Billion Tokens",
// //       price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
// //       button: "Coming Soon",
// //     },
// //     {
// //       status: "Upcoming",
// //       phaseNo: "Phase 3",
// //       tokens: "25 Billion Tokens",
// //       price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
// //       button: "Coming Soon",
// //     },
// //     {
// //       status: "Upcoming",
// //       phaseNo: "Phase 4",
// //       tokens: "30 Billion Tokens",
// //       price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
// //       button: "Coming Soon",
// //     },
// //     {
// //       status: "Upcoming",
// //       phaseNo: "Phase 5",
// //       tokens: "25 Billion Tokens",
// //       price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
// //       button: "Coming Soon",
// //     },
// //   ];

// //   return (
// //     <div
// //       className="py-10"
// //       style={{ 
// //           background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)',
// //           WebkitBackdropFilter: 'blur(16px)' 
// //       }}
// //     >

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <motion.div
// //           variants={bounceUpVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: false, amount: 0.2 }}
// //         >
// //           <Swiper
// //             modules={[Navigation, Pagination, A11y]}
// //             spaceBetween={20}
// //             slidesPerView={1}
// //             centeredSlides={true}
// //             initialSlide={phaseData.findIndex(item => item.status === "Live")}
// //             navigation={{
// //               prevEl: navigationPrevRef.current, // Use the ref
// //               nextEl: navigationNextRef.current, // Use the ref
// //             }}
// //             pagination={{ clickable: true }}
// //             grabCursor={true}
// //             loop={true}
// //             onBeforeInit={(swiper) => {
// //               swiper.params.navigation.prevEl = navigationPrevRef.current;
// //               swiper.params.navigation.nextEl = navigationNextRef.current;
// //             }}
// //             breakpoints={{
// //               640: {
// //                 slidesPerView: 1,
// //               },
// //               768: {
// //                 slidesPerView: 2,
// //               },
// //               1024: {
// //                 slidesPerView: 3,
// //               },
// //               1440: {
// //                 slidesPerView: 3,
// //               },
// //             }}
// //             className="!pb-10"
// //           >
// //             {phaseData?.map((item, index) => (
// //               <SwiperSlide key={index}>
// //                 <div
// //                   className={`relative rounded-xl py-6 px-4 shadow-md  bg-[#145b56] ${index >= 1 ? 'opacity-70 blur-sm' : ''
// //                     }`}
// //                 >
// //                   {item.status === "Live" && (
// //                     <div className="absolute top-2 left-2 bg-[#C5D82E] text-[#021516] text-xs font-bold py-1 px-2 rounded-md">
// //                       {item.status}
// //                     </div>
// //                   )}
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className="flex flex-col">
// //                       <h5 className="font-extrabold text-xl text-gray-100 mb-1">{item.phaseNo}</h5>
// //                       <p className="text-sm text-gray-300">{item.tokens}</p>
// //                     </div>
// //                     <div className="relative w-20 h-auto">
// //                       <img
// //                         className="img-fluid"
// //                         src={logoLeft}
// //                         alt="Phase Logo"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <p className="font-semibold text-white text-sm mb-6 ">{item.price}</p>
// //                     <button
// //                       className={`w-full rounded-full py-2 font-semibold text-sm ${item.status === "Live"
// //                         ? 'bg-[#C5D82E] text-[#021516]'
// //                         : 'bg-gray-400 text-gray-100 cursor-not-allowed'
// //                         }`}
// //                       disabled={item.status !== "Live"}
// //                     >
// //                       {item.button}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </SwiperSlide>
// //             ))}
// //                        <div
// //               ref={navigationPrevRef}
// //               className=" cursor-pointer absolute top-1/2 -translate-y-1/2 left-2 z-10 focus:outline-none  bg-[#C5D82E] text-[#021516] rounded-full p-2"
// //             >
// //               <ArrowLeft size={24} />
// //             </div>
// //             <div
// //               ref={navigationNextRef}
// //               className="  cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 z-10 focus:outline-none  bg-[#C5D82E] text-[#021516] rounded-full p-2"
// //             >
// //               <ArrowRight size={24} />
// //             </div>


// //           </Swiper>
// //         </motion.div>
// //       </div>
// //       <style jsx>{`
// //         .swiper-button-prev,
// //         .swiper-button-next {
// //           color: white; /* Adjust the color */
// //           background-color: rgba(0, 0, 0, 0.3); /* Add a background */
// //           padding: 10px;
// //           border-radius: 50%; /* Make them circular */
// //           width: 30px; /* Adjust the width */
// //           height: 30px; /* Adjust the height */
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .swiper-button-prev::after,
// //         .swiper-button-next::after {
// //           font-size: 16px; /* Adjust the arrow size */
// //           font-weight: bold;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // export default PhaseCarousel;


// // 1B4242 4FBDBA CDEED6
// "use client";
// import React, { useRef, useEffect } from "react";
// import logoLeft from "../../assets/images/logowithleft.svg";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, A11y } from "swiper/modules";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// function PhaseCarousel() {
//   const bounceUpVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const navigationPrevRef = useRef(null);
//   const navigationNextRef = useRef(null);
//   const swiperRef = useRef(null);

//   const phaseData = [
//     {
//       status: "Live",
//       phaseNo: "Phase 1",
//       tokens: "10 Billion Tokens",
//       price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//       button: "Buy Now",
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 2",
//       tokens: "20 Billion Tokens",
//       price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
//       button: "Coming Soon",
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 3",
//       tokens: "25 Billion Tokens",
//       price: "Price INR 0.60 - 1.53 Paisa (0.0071 - 0.018 USD)",
//       button: "Coming Soon",
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 4",
//       tokens: "30 Billion Tokens",
//       price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
//       button: "Coming Soon",
//     },
//     {
//       status: "Upcoming",
//       phaseNo: "Phase 5",
//       tokens: "25 Billion Tokens",
//       price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
//       button: "Coming Soon",
//     },
//   ];

//   useEffect(() => {
//     const handleWheel = (e) => {
//       if (!swiperRef.current) return;
//       if (e.deltaY > 0) {
//         swiperRef.current.swiper.slideNext();
//       } else if (e.deltaY < 0) {
//         swiperRef.current.swiper.slidePrev();
//       }
//     };
//     const el = swiperRef.current?.el;
//     if (el) el.addEventListener("wheel", handleWheel);
//     return () => {
//       if (el) el.removeEventListener("wheel", handleWheel);
//     };
//   }, []);

//   return (
//     <div
//       className="py-10"
//       style={{

//         WebkitBackdropFilter: "blur(16px)",
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <motion.div
//           variants={bounceUpVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, amount: 0.2 }}
//         >
//           <Swiper
//             modules={[Navigation, Pagination, A11y]}
//             spaceBetween={10}
//             slidesPerView={1}
//             centeredSlides={true}
//             initialSlide={phaseData.findIndex((item) => item.status === "Live")}
//             navigation={{
//               prevEl: navigationPrevRef.current,
//               nextEl: navigationNextRef.current,
//             }}
//             pagination={{ clickable: true }}
//             grabCursor={true}
//             loop={true}
//             onBeforeInit={(swiper) => {
//               swiper.params.navigation.prevEl = navigationPrevRef.current;
//               swiper.params.navigation.nextEl = navigationNextRef.current;
//             }}
//             breakpoints={{
//               640: {
//                 slidesPerView: 1,
//                 spaceBetween: 10,
//               },
//               768: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//               },
//               1440: {
//                 slidesPerView: 3,
//                 spaceBetween: 40,
//               },
//             }}
//             className="!pb-10"
//           >
//             {phaseData?.map((item, index) => (
//               <SwiperSlide key={index} ref={swiperRef}>
//                 <div
//                   className={`relative rounded-xl py-6 px-4 shadow-md bg-[#145b56] ${
//                     index >= 1 ? "opacity-70 blur-sm" : ""
//                   }`}
//                 >
//                   {item.status === "Live" && (
//                     <div className="absolute top-2 left-2 bg-[#C5D82E] text-[#021516] text-xs font-bold py-1 px-2 rounded-md">
//                       {item.status}
//                     </div>
//                   )}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex flex-col">
//                       <h5 className="font-extrabold text-xl text-gray-100 mb-1">
//                         {item.phaseNo}
//                       </h5>
//                       <p className="text-sm text-gray-300">{item.tokens}</p>
//                     </div>
//                     <div className="relative w-20 h-auto">
//                       <img
//                         className="img-fluid"
//                         src={logoLeft}
//                         alt="Phase Logo"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-white text-sm mb-6">
//                       {item.price}
//                     </p>
//                     <button
//                       className={`w-full rounded-full py-2 font-semibold text-sm ${
//                         item.status === "Live"
//                           ? "bg-[#C5D82E] text-[#021516]"
//                           : "bg-gray-400 text-gray-100 cursor-not-allowed"
//                       }`}
//                       disabled={item.status !== "Live"}
//                     >
//                       {item.button}
//                     </button>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//             {/* Custom Navigation Buttons - hidden on mobile (sm:hidden) */}
//             <div
//               ref={navigationPrevRef}
//               className="cursor-pointer absolute top-1/2 -translate-y-1/2 left-2 z-10 focus:outline-none bg-[#C5D82E] text-[#021516] rounded-full p-2 sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center hidden sm:flex"
//             >
//               <ArrowLeft size={20} className="sm:w-6 sm:h-6 w-5 h-5" />
//             </div>
//             <div
//               ref={navigationNextRef}
//               className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 z-10 focus:outline-none bg-[#C5D82E] text-[#021516] rounded-full p-2 sm:w-10 sm:h-10 w-8 h-8 flex items-center justify-center hidden sm:flex"
//             >
//               <ArrowRight size={20} className="sm:w-6 sm:h-6 w-5 h-5" />
//             </div>
//           </Swiper>
//         </motion.div>
//       </div>
//       <style jsx>{`
//         @media (max-width: 640px) {
//           .swiper-button-prev,
//           .swiper-button-next {
//             display: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default PhaseCarousel;

import React, { useState, useEffect } from 'react';
import { TrendingUp, Shield, Users, Zap, ArrowRight, Bitcoin, DollarSign, PieChart, Coins } from 'lucide-react';

const JaimaxCoinComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    { number: "01", title: "Sign Up", icon: <Users className="w-6 h-6" /> },
    { number: "02", title: "Choose Plan", icon: <PieChart className="w-6 h-6" /> },
    { number: "03", title: "Deposit", icon: <DollarSign className="w-6 h-6" /> },
    { number: "04", title: "Invest", icon: <Bitcoin className="w-6 h-6" /> },
    { number: "05", title: "Profit", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen  text-white">
    

      <div className="relative z-10 container mx-auto px-6 py-16" style={{backgroundImage:"url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg-1.png')",backgroundRepeat:'no-repeat'}} >

        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
         
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
            Profits Transformation
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-green-300 mb-8">
            Transform Your Holdings Into Profits
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Understanding the Jaimax Coin process is simple and straight forward.
          </p>
        </div>

        {/* Five Steps Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Explore the Five Easy Steps
            </h3>
            <p className="text-xl text-gray-300">
              Embark on your journey towards cryptocurrency investment success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center h-full hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-r from-green-500 to-lime-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div>
                  
                  <div className="flex justify-center mb-3 text-purple-400">
                    {step.icon}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white">
                    {step.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Starter Investment Plan Section */}
        {/* <div className=" backdrop-blur-lg  rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Starter Investment Plan
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Begin your journey into the world of cryptocurrency investment with our Starter Investment plan. 
              Designed for those taking their first steps in the digital asset landscape, this plan offers an 
              accessible entry point to explore the potential of cryptocurrencies.
            </p>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Enjoy the ease of diversifying your holdings among a selection of popular coins while benefiting 
              from our secure platform and responsive support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg">
                Get Started Now
                <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div> */}
        <div className="backdrop-blur-lg rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <img 
                  src="https://t3.ftcdn.net/jpg/04/24/53/50/360_F_424535039_f0HgjloFjZodjP0qDErF6HZrVm7qJ7mo.jpg" 
                  alt="Cryptocurrency Token" 
                  className="w-full h-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg filter blur-xl"></div> */}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 md:order-2">
              <div className="text-center md:text-left mb-8">
                <div className="flex justify-center md:justify-start mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Starter Investment Plan
                </h3>
              </div>

              <div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Begin your journey into the world of cryptocurrency investment with our Starter Investment plan. 
                  Designed for those taking their first steps in the digital asset landscape, this plan offers an 
                  accessible entry point to explore the potential of cryptocurrencies.
                </p>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Enjoy the ease of diversifying your holdings among a selection of popular coins while benefiting 
                  from our secure platform and responsive support.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Get Started Now
                    <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="border-2 border-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="text-purple-400 mb-4 flex justify-center">
              <PieChart className="w-12 h-12" />
            </div>
            <h4 className="text-xl font-bold mb-3">Diversified Holdings</h4>
            <p className="text-gray-300">Select from popular cryptocurrencies</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="text-blue-400 mb-4 flex justify-center">
              <Shield className="w-12 h-12" />
            </div>
            <h4 className="text-xl font-bold mb-3">Secure Platform</h4>
            <p className="text-gray-300">Advanced security for your investments</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="text-green-400 mb-4 flex justify-center">
              <Users className="w-12 h-12" />
            </div>
            <h4 className="text-xl font-bold mb-3">Responsive Support</h4>
            <p className="text-gray-300">Expert assistance when you need it</p>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default JaimaxCoinComponent;
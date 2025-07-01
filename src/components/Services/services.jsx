// import React from 'react';
// import { Shield, Wallet, TrendingUp, PieChart, BarChart3, Coins } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const CryptoServicesFlipCards = () => {
//   // Main services data (top section - Our Services)
//   const navigate = useNavigate()
//   const mainServices = [
//     {
//       icon: <Shield size={48} />,
//       title: "SECURITY MEASURES",
//       description: "Advanced crypto security protocols with KYC verification, Google Authenticator, and end-to-end encryption.",
//       backContent: "Our comprehensive security framework includes blockchain protection, multi-factor authentication, and compliance-first strategies. Every transaction is secured with military-grade encryption and real-time monitoring."
//     },
//     {
//       icon: <Wallet size={48} />,
//       title: "SECURE CRYPTO WALLET",
//       description: "Integrated wallet with encryption, backup recovery options, and user-friendly features for seamless transactions.",
//       backContent: "Store, send, and receive crypto assets with confidence. Our wallet features cold storage integration, instant transfers, and multi-currency support with industry-leading security protocols."
//     },
//     {
//       icon: <TrendingUp size={48} />,
//       title: "ACCESS TO PROFITS",
//       description: "Real-time tracking, growth analytics, and easy withdrawal systems to maximize your crypto earnings.",
//       backContent: "Unlock passive income opportunities through smart investment strategies. Our platform provides automated trading signals, yield farming options, and comprehensive profit tracking tools."
//     }
//   ];

//   // Why choose us data (bottom section)
//   const whyChooseUs = [
//     {
//       icon: <PieChart size={48} />,
//       title: "FUND MANAGEMENT",
//       description: "Intelligent portfolio management system to track performance and allocate funds smartly across digital assets.",
//       backContent: "Take control of your crypto portfolio with advanced analytics, risk assessment tools, and automated rebalancing. Monitor all your investments with precision and make data-driven decisions.",
//       isPrimary: true
//     },
//     {
//       icon: <BarChart3 size={48} />,
//       title: "FINANCIAL GROWTH",
//       description: "Gateway to financial growth through crypto with reliable and ethical investment opportunities.",
//       backContent: "Build long-term wealth with our ecosystem of growth opportunities. Access exclusive investment rounds, staking rewards, and participate in the future of decentralized finance.",
//       isPrimary: false
//     },
//     {
//       icon: <Coins size={48} />,
//       title: "EXPERT ANALYSIS",
//       description: "Professional market analysis and insights to guide your investment decisions with confidence.",
//       backContent: "Get access to expert cryptocurrency analysis, market trends, and investment recommendations from our team of professional traders and analysts.",
//       isPrimary: false
//     },
//     {
//       icon: <Shield size={48} />,
//       title: "24/7 SUPPORT",
//       description: "Round-the-clock customer support to assist you with any queries or technical issues you may encounter.",
//       backContent: "Our dedicated support team is available 24/7 to help you navigate the crypto world. Get instant assistance through multiple channels and resolve issues quickly.",
//       isPrimary: false
//     }
//   ];

//   const FlipCard = ({ service, index, delay = 0, isPrimary = false }) => (
//     <motion.div
//       key={index}
//       className="group perspective-1000 h-80"
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.5, delay: delay }}
//       whileHover={{ scale: 1.05 }}
//     >
//       <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
//         {/* Front of card */}
//         <motion.div
//           className={`absolute inset-0 backface-hidden ${
//             isPrimary 
//               ? 'bg-gradient-to-br from-[#1e964a] to-[#195f64] border-[#bace27]' 
//               : 'bg-gradient-to-br from-[#195f64] via-[#1e964a] to-[#bace27] border-[#195f64]'
//           } rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center border hover:border-[#bace27] transition-all duration-300 hover:shadow-[0_0_30px_rgba(186,206,39,0.3)]`}
//         >
//           <motion.div
//             className="text-[#bace27] mb-6 drop-shadow-lg"
//             transition={{ duration: 0.3 }}
//           >
//             {service.icon}
//           </motion.div>
//           <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
//             {service.title}
//           </h3>
//           <p className="text-gray-300 text-sm leading-relaxed">
//             {service.description}
//           </p>
//           <div className="absolute top-4 right-4 w-2 h-2 bg-[#1e964a] rounded-full animate-pulse"></div>
//         </motion.div>

//         {/* Back of card */}
//         <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#195f64] rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center text-white">
//           <motion.div
//             className="mb-6 opacity-90 drop-shadow-lg"
//             initial={{ rotateY: -180 }}
//             animate={{ rotateY: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//           >
//             {service.icon}
//           </motion.div>
//           <h3 className="text-xl font-bold mb-4 tracking-wide">
//             {service.title}
//           </h3>
//           <p className="text-white/90 text-sm leading-relaxed mb-6">
//             {service.backContent}
//           </p>
//           <motion.button
//             className="px-8 py-3 bg-white/90 text-[#195f64] rounded-full font-bold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate("/register")}
//           >
//             {isPrimary ? 'Join Now' : 'Get Started'}
//           </motion.button>
//           <div className="absolute top-4 right-4 w-3 h-3 bg-white/50 rounded-full"></div>
//           <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full"></div>
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-[#1a5f65] py-16 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Our Services Section */}
//         <div className="mb-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//          <motion.h1
//             className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-[#bace27] to-[#1e964a] bg-clip-text text-transparent"
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Our Service Offerings
//           </motion.h1>
//           <motion.p
//             className="text-xl text-[#bace27] max-w-3xl mx-auto mb-6 font-semibold"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Explore the Future of Digital Finance with Jaimax – The Best Crypto Coin in India
//           </motion.p>
//           <motion.p
//             className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-lg"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             At Jaimax, we provide a powerful range of crypto services designed to help users grow, secure, and manage their digital assets with ease. Whether you're a new investor or a crypto-savvy expert, our platform delivers the tools and features you need to succeed in the world of cryptocurrency. Discover why Jaimax is fast becoming the best crypto coin in India.
//           </motion.p>
//           <motion.div
//             className="w-24 h-1 bg-gradient-to-r from-[#195f64] to-[#1e964a] mx-auto mt-8 rounded-full"
//             initial={{ width: 0 }}
//             animate={{ width: "6rem" }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           ></motion.div>
//         </div>


//           {/* Services Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <AnimatePresence>
//               {mainServices.map((service, index) => (
//                 <FlipCard 
//                   key={index} 
//                   service={service} 
//                   index={index} 
//                   delay={index * 0.1 + 0.5} 
//                 />
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Why Choose Us Section */}
//         <div>
//           {/* Header */}
//           <div className="text-center mb-16">
//             <motion.h2
//               className="text-4xl lg:text-5xl font-bold text-white mb-6"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.0 }}
//             >
//               Why Choose Us?
//             </motion.h2>
//             <motion.p
//               className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg mb-8"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.2 }}
//             >
//               We are committed to our clients and maintain the highest standards. Discover how unique benefits that set us apart and ensure your best financial experience at your every journey.
//             </motion.p>
//             <motion.button
//               className="bg-[#bace27] hover:bg-white text-[#195f64] font-semibold px-8 py-3 rounded-full transition-all duration-300"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 1.4 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}

//               onClick={() => navigate("/")}
//             >
//               Join Now
//             </motion.button>
//           </div>

//           {/* Why Choose Us Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <AnimatePresence>
//               {whyChooseUs.map((item, index) => (
//                 <FlipCard 
//                   key={index + 10} 
//                   service={item} 
//                   index={index + 10} 
//                   delay={index * 0.1 + 1.6} 
//                   isPrimary={item.isPrimary}
//                 />
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mt-20">
//           <motion.div
//             className="rounded-2xl p-8"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 2.2 }}
//             whileHover={{ scale: 1.02 }}
//           >
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Ready to Start Your Crypto Journey?
//             </h2>
//             <p className="text-white/90 mb-6 text-lg">
//               Join thousands of investors who trust Jaimax for their digital asset management
//             </p>
//             <motion.button
//               className="px-10 py-4 bg-[#bace27] text-[#195f64] rounded-full font-bold text-lg hover:bg-white shadow-lg"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.2 }}
              
//               onClick={() => navigate("/")}
//             >
//               Launch App
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       <style jsx>{`
//         .perspective-1000 {
//           perspective: 1000px;
//         }
//         .transform-style-preserve-3d {
//           transform-style: preserve-3d;
//         }
//         .backface-hidden {
//           backface-visibility: hidden;
//         }
//         .rotate-y-180 {
//           transform: rotateY(180deg);
//         }
//         .group:hover .group-hover\\:rotate-y-180 {
//           transform: rotateY(180deg);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CryptoServicesFlipCards;

import React from 'react';
import { Shield, Wallet, TrendingUp, PieChart, BarChart3, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CryptoServicesFlipCards = () => {
  const navigate=useNavigate()
  const mainServices = [
    {
      icon: <Shield size={48} />,
      title: "SECURITY MEASURES",
      description: "Advanced crypto security protocols with KYC verification, Google Authenticator, and end-to-end encryption.",
      backContent: "Our comprehensive security framework includes blockchain protection, multi-factor authentication, and compliance-first strategies. Every transaction is secured with military-grade encryption and real-time monitoring."
    },
    {
      icon: <Wallet size={48} />,
      title: "SECURE CRYPTO WALLET",
      description: "Integrated wallet with encryption, backup recovery options, and user-friendly features for seamless transactions.",
      backContent: "Store, send, and receive crypto assets with confidence. Our wallet features cold storage integration, instant transfers, and multi-currency support with industry-leading security protocols."
    },
    {
      icon: <TrendingUp size={48} />,
      title: "ACCESS TO PROFITS",
      description: "Real-time tracking, growth analytics, and easy withdrawal systems to maximize your crypto earnings.",
      backContent: "Unlock passive income opportunities through smart investment strategies. Our platform provides automated trading signals, yield farming options, and comprehensive profit tracking tools."
    }
  ];

  // Why choose us data (bottom section)
  const whyChooseUs = [
    {
      icon: <PieChart size={48} />,
      title: "FUND MANAGEMENT",
      description: "Intelligent portfolio management system to track performance and allocate funds smartly across digital assets.",
      backContent: "Take control of your crypto portfolio with advanced analytics, risk assessment tools, and automated rebalancing. Monitor all your investments with precision and make data-driven decisions.",
      isPrimary: true
    },
    {
      icon: <BarChart3 size={48} />,
      title: "FINANCIAL GROWTH",
      description: "Gateway to financial growth through crypto with reliable and ethical investment opportunities.",
      backContent: "Build long-term wealth with our ecosystem of growth opportunities. Access exclusive investment rounds, staking rewards, and participate in the future of decentralized finance.",
      isPrimary: false
    },
    {
      icon: <Coins size={48} />,
      title: "EXPERT ANALYSIS",
      description: "Professional market analysis and insights to guide your investment decisions with confidence.",
      backContent: "Get access to expert cryptocurrency analysis, market trends, and investment recommendations from our team of professional traders and analysts.",
      isPrimary: false
    },
    {
      icon: <Shield size={48} />,
      title: "24/7 SUPPORT",
      description: "Round-the-clock customer support to assist you with any queries or technical issues you may encounter.",
      backContent: "Our dedicated support team is available 24/7 to help you navigate the crypto world. Get instant assistance through multiple channels and resolve issues quickly.",
      isPrimary: false
    }
  ];

  const FlipCard = ({ service, index, delay = 0, isPrimary = false }) => (
    <div
      key={index}
      className="group perspective-1000 h-72 sm:h-80 lg:h-80 hover:scale-105 transition-transform duration-300"
      style={{
        animationDelay: `${delay}s`,
        animation: 'fadeInScale 0.5s ease-out forwards',
        opacity: 0,
        transform: 'scale(0.8)'
      }}
    >
      <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front of card */}
        <div
          className={`absolute inset-0 backface-hidden ${
            isPrimary 
              ? 'bg-gradient-to-br from-green-600 to-teal-700 border-lime-400' 
              : 'bg-gradient-to-br from-teal-700 via-green-600 to-lime-400 border-teal-700'
          } rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center border hover:border-lime-400 transition-all duration-300 hover:shadow-lime-400/30 hover:shadow-2xl`}
        >
          <div className="text-lime-400 mb-4 sm:mb-6 drop-shadow-lg">
            <div className="block sm:hidden">
              {React.cloneElement(service.icon, { size: 32 })}
            </div>
            <div className="hidden sm:block lg:hidden">
              {React.cloneElement(service.icon, { size: 40 })}
            </div>
            <div className="hidden lg:block">
              {service.icon}
            </div>
          </div>
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 tracking-wide px-2">
            {service.title}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
            {service.description}
          </p>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-teal-700 rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center text-white">
          <div className="mb-4 sm:mb-6 opacity-90 drop-shadow-lg">
            <div className="block sm:hidden">
              {React.cloneElement(service.icon, { size: 32 })}
            </div>
            <div className="hidden sm:block lg:hidden">
              {React.cloneElement(service.icon, { size: 40 })}
            </div>
            <div className="hidden lg:block">
              {service.icon}
            </div>
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 tracking-wide px-2">
            {service.title}
          </h3>
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 px-2">
            {service.backContent}
          </p>
          <button
            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white/90 text-teal-700 rounded-full font-bold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base hover:scale-105 active:scale-95"
            onClick={() => navigate("/register")}
          >
            {isPrimary ? 'Join Now' : 'Get Started'}
          </button>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-3 h-3 bg-white/50 rounded-full"></div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Our Services Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-lime-400 to-green-600 bg-clip-text text-transparent px-4">
              Our Service Offerings
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-lime-400 max-w-3xl mx-auto mb-4 sm:mb-6 font-semibold px-4">
              Explore the Future of Digital Finance with Jaimax – The Best Crypto Coin in India
            </p>
            <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg px-4">
              At Jaimax, we provide a powerful range of crypto services designed to help users grow, secure, and manage their digital assets with ease. Whether you're a new investor or a crypto-savvy expert, our platform delivers the tools and features you need to succeed in the world of cryptocurrency. Discover why Jaimax is fast becoming the best crypto coin in India.
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-teal-700 to-green-600 mx-auto mt-6 sm:mt-8 rounded-full"></div>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {mainServices.map((service, index) => (
              <FlipCard 
                key={index} 
                service={service} 
                index={index} 
                delay={index * 0.1 + 0.5} 
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div>
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 px-4">
              We are committed to our clients and maintain the highest standards. Discover how unique benefits that set us apart and ensure your best financial experience at your every journey.
            </p>
            <button
              className="bg-lime-400 hover:bg-white text-teal-700 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base hover:scale-105 active:scale-95"
              onClick={() => navigate("/login")}
            >
              Join Now
            </button>
          </div>

          {/* Why Choose Us Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyChooseUs.map((item, index) => (
              <FlipCard 
                key={index + 10} 
                service={item} 
                index={index + 10} 
                delay={index * 0.1 + 1.6} 
                isPrimary={item.isPrimary}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <div className="rounded-2xl p-6 sm:p-8 hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 px-4">
              Ready to Start Your Crypto Journey?
            </h2>
            <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg px-4">
              Join thousands of investors who trust Jaimax for their digital asset management
            </p>
            <button
              className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-lime-400 text-teal-700 rounded-full font-bold text-base sm:text-lg hover:bg-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              onClick={() => navigate("/login")}
            >
              Launch App
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        /* Responsive grid adjustments */
        @media (max-width: 640px) {
          .grid-cols-1 {
            gap: 1rem;
          }
        }
        
        @media (min-width: 640px) and (max-width: 1024px) {
          .sm\\:grid-cols-2 > * {
            min-height: 20rem;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .group:active .group-hover\\:rotate-y-180 {
            transform: rotateY(180deg);
          }
          
          .hover\\:scale-105:active {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoServicesFlipCards;
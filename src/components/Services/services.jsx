// import React from 'react';
// import { Shield, Wallet, TrendingUp, PieChart, BarChart3, Coins } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CryptoServicesFlipCards = () => {
//   const services = [
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
//     },
//     {
//       icon: <PieChart size={48} />,
//       title: "FUND MANAGEMENT",
//       description: "Intelligent portfolio management system to track performance and allocate funds smartly across digital assets.",
//       backContent: "Take control of your crypto portfolio with advanced analytics, risk assessment tools, and automated rebalancing. Monitor all your investments with precision and make data-driven decisions."
//     },
//     {
//       icon: <BarChart3 size={48} />,
//       title: "FINANCIAL GROWTH",
//       description: "Gateway to financial growth through crypto with reliable and ethical investment opportunities.",
//       backContent: "Build long-term wealth with our ecosystem of growth opportunities. Access exclusive investment rounds, staking rewards, and participate in the future of decentralized finance."
//     },
//     {
//       icon: <Coins size={48} />,
//       title: "JAIMAX TOKEN",
//       description: "The best crypto coin in India backed by real utility and a growing ecosystem for massive opportunities.",
//       backContent: "Join India's most promising cryptocurrency project. Enjoy exclusive benefits, governance rights, early access to new features, and be part of the digital finance revolution."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-[#1a5f65] py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <motion.h1
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

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <AnimatePresence>
//             {services.map((service, index) => (
//               <motion.div
//                 key={index}
//                 className="group perspective-1000 h-80"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.05 }} // Subtle zoom on hover for the whole card
//               >
//                 <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
//                   {/* Front of card */}
//                   <motion.div
//                     className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#195f64] via-[#1e964a] to-[#bace27] rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center border border-[#195f64] hover:border-[#bace27] transition-all duration-300 hover:shadow-[0_0_30px_rgba(186,206,39,0.3)]"
//                     // No direct Framer Motion animation here as the parent div handles the flip
//                   >
//                     <motion.div
//                       className="text-[#bace27] mb-6 drop-shadow-lg"
//                       transition={{ duration: 0.3 }}
//                       // The group-hover:scale-110 in Tailwind handles the scale on hover
//                     >
//                       {service.icon}
//                     </motion.div>
//                     <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
//                       {service.title}
//                     </h3>
//                     <p className="text-gray-300 text-sm leading-relaxed">
//                       {service.description}
//                     </p>
//                     <div className="absolute top-4 right-4 w-2 h-2 bg-[#1e964a] rounded-full animate-pulse"></div>
//                   </motion.div>

//                   {/* Back of card */}
//                   <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#195f64] rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center text-white">
//                     <motion.div
//                       className="mb-6 opacity-90 drop-shadow-lg"
//                       initial={{ rotateY: -180 }} // Counter-rotate so icon appears upright
//                       animate={{ rotateY: 0 }}
//                       transition={{ duration: 0.7, delay: 0.1 }}
//                     >
//                       {service.icon}
//                     </motion.div>
//                     <h3 className="text-xl font-bold mb-4 tracking-wide">
//                       {service.title}
//                     </h3>
//                     <p className="text-white/90 text-sm leading-relaxed mb-6">
//                       {service.backContent}
//                     </p>
//                     <motion.button
//                       className="px-8 py-3 bg-white/90 text-[#195f64] rounded-full font-bold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Get Started
//                     </motion.button>
//                     <div className="absolute top-4 right-4 w-3 h-3 bg-white/50 rounded-full"></div>
//                     <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full"></div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mt-20">
//           <motion.div
//             className="rounded-2xl p-8 "
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: services.length * 0.1 + 0.5 }} // Delay after cards appear
//             whileHover={{ scale: 1.02, }}
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
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CryptoServicesFlipCards = () => {
  // Main services data (top section - Our Services)
  const navigate = useNavigate()
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
    <motion.div
      key={index}
      className="group perspective-1000 h-80"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front of card */}
        <motion.div
          className={`absolute inset-0 backface-hidden ${
            isPrimary 
              ? 'bg-gradient-to-br from-[#1e964a] to-[#195f64] border-[#bace27]' 
              : 'bg-gradient-to-br from-[#195f64] via-[#1e964a] to-[#bace27] border-[#195f64]'
          } rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center border hover:border-[#bace27] transition-all duration-300 hover:shadow-[0_0_30px_rgba(186,206,39,0.3)]`}
        >
          <motion.div
            className="text-[#bace27] mb-6 drop-shadow-lg"
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>
          <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
            {service.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {service.description}
          </p>
          <div className="absolute top-4 right-4 w-2 h-2 bg-[#1e964a] rounded-full animate-pulse"></div>
        </motion.div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#195f64] rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center text-white">
          <motion.div
            className="mb-6 opacity-90 drop-shadow-lg"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {service.icon}
          </motion.div>
          <h3 className="text-xl font-bold mb-4 tracking-wide">
            {service.title}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed mb-6">
            {service.backContent}
          </p>
          <motion.button
            className="px-8 py-3 bg-white/90 text-[#195f64] rounded-full font-bold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
          >
            {isPrimary ? 'Join Now' : 'Get Started'}
          </motion.button>
          <div className="absolute top-4 right-4 w-3 h-3 bg-white/50 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#1a5f65] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Our Services Section */}
        <div className="mb-20">
          {/* Header */}
          <div className="text-center mb-16">
         <motion.h1
            className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-[#bace27] to-[#1e964a] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Service Offerings
          </motion.h1>
          <motion.p
            className="text-xl text-[#bace27] max-w-3xl mx-auto mb-6 font-semibold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the Future of Digital Finance with Jaimax – The Best Crypto Coin in India
          </motion.p>
          <motion.p
            className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Jaimax, we provide a powerful range of crypto services designed to help users grow, secure, and manage their digital assets with ease. Whether you're a new investor or a crypto-savvy expert, our platform delivers the tools and features you need to succeed in the world of cryptocurrency. Discover why Jaimax is fast becoming the best crypto coin in India.
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#195f64] to-[#1e964a] mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </div>


          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {mainServices.map((service, index) => (
                <FlipCard 
                  key={index} 
                  service={service} 
                  index={index} 
                  delay={index * 0.1 + 0.5} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div>
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Why Choose Us?
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              We are committed to our clients and maintain the highest standards. Discover how unique benefits that set us apart and ensure your best financial experience at your every journey.
            </motion.p>
            <motion.button
              className="bg-[#bace27] hover:bg-white text-[#195f64] font-semibold px-8 py-3 rounded-full transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

              onClick={() => navigate("/")}
            >
              Join Now
            </motion.button>
          </div>

          {/* Why Choose Us Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {whyChooseUs.map((item, index) => (
                <FlipCard 
                  key={index + 10} 
                  service={item} 
                  index={index + 10} 
                  delay={index * 0.1 + 1.6} 
                  isPrimary={item.isPrimary}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <motion.div
            className="rounded-2xl p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Crypto Journey?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of investors who trust Jaimax for their digital asset management
            </p>
            <motion.button
              className="px-10 py-4 bg-[#bace27] text-[#195f64] rounded-full font-bold text-lg hover:bg-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              
              onClick={() => navigate("/")}
            >
              Launch App
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default CryptoServicesFlipCards;


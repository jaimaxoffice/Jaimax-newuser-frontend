// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import sevices from "../../assets/Images/services.svg";
// // import jaicoins from "../../assets/Images/jaicoins.svg";
// // import jaimaxthreecoins from "../../assets/Images/JaimaxthreeCoin4.png";
// // import frameTwo from "../../assets/Images/securitymeasure.svg";
// // import serviceImg from "../../assets/Images/serviceImg.svg";
// // import profits from "../../assets/Images/profits.svg";
// // import access from "../../assets/Images/accessToprofit.svg";
// // import rocket2 from '../../assets/Images/rocket2.svg'
// // import eye from "../../assets/Images/eye.svg";
// // import features from "../../assets/Images/Futures.svg";
// // import service from '../../assets/Images/homeservice.jpg'

// // const bounceUpVariants = {
// //   hidden: { opacity: 0, y: 50 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// // };

// // const ServicesComponent = () => {
// //   const onClickNavigateToLogin = () => {
// //     console.log("Navigate to login");
// //   };

// //   return (
// //     <div
// //   className="min-h-screen bg-cover bg-center"

// // >
// //       {/* Services Section */}
// //       <div className="container mx-auto px-4 py-16" id="services">
// //         <div className="text-center mb-12">
// //           <img src={sevices} alt="services" className="mx-auto mb-4" />
// //           <h2 className="text-4xl font-bold text-white mb-4" style={{ 
// //             background: 'linear-gradient(to right, #bbcf28, #1d974a)',
// //             WebkitBackgroundClip: 'text',
// //             WebkitTextFillColor: 'transparent',
// //             backgroundClip: 'text'
// //           }}>
// //             Our Service Offerings
// //           </h2>
// //           <p className="text-gray-100 text-lg uppercase tracking-wider">
// //             We offer various services like
// //           </p>
// //         </div>

// //         <div className="mt-12 pt-8">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
// //             {/* Security Measures */}
// //             <motion.div
// //               variants={bounceUpVariants}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: false, amount: 0 }}
// //               className="group"
// //             >
// //               <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
// //                    style={{ 
// //                      background: 'rgba(187, 207, 40, 0.3)',
// //                      boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
// //                    }}>
// //                 {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #bbcf28, #1d974a)' }}></div> */}
// //                 <div className="flex items-center mb-6">
// //                   <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #bbcf28, #1d974a)' }}>
// //                     <img src={jaicoins} alt="jaicoin" className="w-8 h-8" />
// //                   </div>
// //                   <h3 className="text-white font-bold text-xl">
// //                     Security Measures
// //                   </h3>
// //                 </div>
// //                 <p className="text-gray-200 leading-relaxed">
// //                   Our KYC verification and Google Authenticator features
// //                   fortify your account against unauthorized access. Trust in
// //                   our platform to protect your digital holdings and secure
// //                   your financial future.
// //                 </p>
// //               </div>
// //             </motion.div>

// //             {/* Decorative Image */}
// //             <div className="hidden lg:flex items-center justify-center">
// //               <div className="text-center">
// //                 <img src={frameTwo} alt="frame" className="mx-auto filter drop-shadow-lg" />
// //               </div>
// //             </div>

// //             {/* Secure Crypto Wallet */}
// //             <motion.div
// //               variants={bounceUpVariants}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: false, amount: 0 }}
// //               className="group"
// //             >
// //               <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
// //                    style={{ 
// //                      background: 'rgba(187, 207, 40, 0.3)',
// //                      boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
// //                    }}>
// //                 <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #1d974a, #bbcf28)' }}></div>
// //                 <div className="flex items-center mb-6">
// //                   <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #1d974a, #bbcf28)' }}>
// //                     <img src={jaicoins} alt="jaicoin" className="w-8 h-8" />
// //                   </div>
// //                   <h3 className="text-white font-bold text-xl">
// //                     Secure Crypto Wallet
// //                   </h3>
// //                 </div>
// //                 <p className="text-gray-200 leading-relaxed">
// //                   Cryptocurrencies are shielded by state-of-the-art security
// //                   protocols, ensuring your digital wealth remains
// //                   impenetrable. Experience the convenience of managing and
// //                   accessing your assets securely, anytime, anywhere.
// //                 </p>
// //               </div>
// //             </motion.div>

// //             {/* Decorative Image */}
// //             <div className="hidden lg:flex items-center justify-center">
// //               <div className="text-center">
// //                 <img src={serviceImg} alt="frame" className="mx-auto filter drop-shadow-lg" />
// //               </div>
// //             </div>

// //             {/* Access to Profits */}
// //             <motion.div
// //               variants={bounceUpVariants}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: false, amount: 0 }}
// //               className="group"
// //             >
// //               <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
// //                    style={{ 
// //                      background: 'rgba(187, 207, 40, 0.3)',
// //                      boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
// //                    }}>
// //                 {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #045c61, #1d974a)' }}></div> */}
// //                 <div className="flex items-center mb-6">
// //                   <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #045c61, #1d974a)' }}>
// //                     <img src={profits} alt="profits" className="w-8 h-8" />
// //                   </div>
// //                   <h3 className="text-white font-bold text-xl">
// //                     Access to Profits
// //                   </h3>
// //                 </div>
// //                 <p className="text-gray-200 leading-relaxed">
// //                   Convert your investments into real-world gains, making the
// //                   most of your financial endeavors. Enjoy the flexibility and
// //                   speed you deserve.
// //                 </p>
// //               </div>
// //             </motion.div>

// //             {/* Decorative Image */}
// //             <div className="hidden lg:flex items-center justify-center">
// //               <div className="text-center">
// //                 <img src={access} alt="frame" className="mx-auto filter drop-shadow-lg" />
// //               </div>
// //             </div>

// //             {/* Financial Growth */}
// //             <motion.div
// //               variants={bounceUpVariants}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: false, amount: 0 }}
// //               className="group"
// //             >
// //               <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
// //                    style={{ 
// //                      background: 'rgba(187, 207, 40, 0.3)',
// //                      boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
// //                    }}>
// //                 {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #bbcf28, #095659)' }}></div> */}
// //                 <div className="flex items-center mb-6">
// //                   <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #bbcf28, #095659)' }}>
// //                     <img src={jaicoins} alt="rocket" className="w-8 h-8" />
// //                   </div>
// //                   <h3 className="text-white font-bold text-xl">
// //                     Financial Growth
// //                   </h3>
// //                 </div>
// //                 <p className="text-gray-200 leading-relaxed">
// //                   Jaimax Coin offers plans that align with your aspirations.
// //                   Achieve optimal growth and maximize your returns through
// //                   intelligently designed investment options.
// //                 </p>
// //               </div>
// //             </motion.div>

// //             {/* Decorative Image */}
// //             <div className="hidden lg:flex items-center justify-center">
// //               <div className="text-center">
// //                 <img src={eye} alt="frame" className="mx-auto filter drop-shadow-lg" />
// //               </div>
// //             </div>

// //             {/* Fund Management */}
// //                                <motion.div
// //               variants={bounceUpVariants}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: false, amount: 0 }}
// //               className="group"
// //             >
// //               <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
// //                    style={{ 
// //                      background: 'rgba(187, 207, 40, 0.3)',
// //                      boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
// //                    }}>
// //                 {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #bbcf28, #095659)' }}></div> */}
// //                 <div className="flex items-center mb-6">
// //                   <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #bbcf28, #095659)' }}>
// //                     <img src={jaicoins} alt="rocket" className="w-8 h-8" />
// //                   </div>
// //                   <h3 className="text-white font-bold text-xl">
// //                     Funds management
// //                   </h3>
// //                 </div>
// //                 <p className="text-gray-200 leading-relaxed">
// //                    Add money, transfer funds, and monitor your investments with
// //                   ease. Navigate through your financial journey smoothly as
// //                   you react promptly to market opportunities.
// //                 </p>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </div>

// //     <div className=" text-white py-16 px-6 lg:px-24 flex flex-col lg:flex-row items-center justify-between">

// //       {/* Text content */}
// //       <div className="lg:w-1/2 space-y-6">
// //         <h2 className="text-green-400 text-4xl lg:text-5xl font-extrabold">
// //           Financial Growth
// //         </h2>
// //         <h3 className="uppercase text-white tracking-widest text-sm">
// //           FINANCIAL GROWTH THROUGH SMART INVESTMENTS
// //         </h3>
// //         <p className="text-2xl font-extrabold leading-snug">
// //           Discover a range of meticulously crafted investment plans designed to
// //           cater to your unique financial aspirations.
// //         </p>
// //         <p className="text-gray-300">
// //           At Jaimax Coin, we understand that every investor is different, and
// //           that’s why we offer a variety of plans tailored to your needs. Whether
// //           you’re a newcomer looking to start small, an experienced investor
// //           seeking substantial growth, or someone planning for retirement, our
// //           plans provide you with the tools, strategies, and support to achieve
// //           your goals. Explore our diverse investment options and embark on a
// //           journey towards financial success with Jaimax Coin.
// //         </p>
// //         <button className="bg-[#C6F839] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b5e634] transition">
// //           Invest now
// //         </button>
// //       </div>

// //       {/* Rocket Illustration */}
// //       <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
// //         <img
// //           src={service}
// //           alt="Rocket Boosting Growth"
// //           className="w-[500px] max-w-full"
// //         />
// //       </div>
// //     </div>

// //     </div>
// //   );
// // };

// // export default ServicesComponent;

// // import sevices from "../../assets/Images/services.svg";
// // import jaicoins from "../../assets/Images/jaicoins.svg";
// // import jaimaxthreecoins from "../../assets/Images/JaimaxthreeCoin4.png";
// // import frameTwo from "../../assets/Images/securitymeasure.svg";
// // import serviceImg from "../../assets/Images/serviceImg.svg";
// // import profits from "../../assets/Images/profits.svg";
// // import access from "../../assets/Images/accessToprofit.svg";
// // import rocket2 from '../../assets/Images/rocket2.svg';
// // import eye from "../../assets/Images/eye.svg";
// // import features from "../../assets/Images/Futures.svg";

// // import React, { useState, useEffect } from 'react';


// // const ServicesSection = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [digitalTime, setDigitalTime] = useState('');
// //   const [blockchainData, setBlockchainData] = useState([]);

// //   const services = [
// //     {
// //       title: "Quantum Security Protocol",
// //       description: "Military-grade quantum encryption secures your digital assets across multiple blockchain networks with zero-trust architecture.",
// //       icon: frameTwo,
// //       gradient: "from-cyan-400 via-teal-500 to-green-500",
// //       crypto: "BTC/ETH",
// //       hashRate: "256-bit",
// //       network: "Multi-Chain",
// //       status: "SECURED"
// //     },
// //     {
// //       title: "Multi-Chain Wallet Hub",
// //       description: "Seamlessly manage 500+ cryptocurrencies across Ethereum, Bitcoin, Solana, and emerging DeFi protocols in one unified interface.",
// //       icon: jaicoins,
// //       gradient: "from-green-400 via-emerald-500 to-teal-500",
// //       crypto: "500+ Coins",
// //       hashRate: "Lightning",
// //       network: "Layer-2",
// //       status: "SYNCED"
// //     },
// //     {
// //       title: "DeFi Yield Optimizer",
// //       description: "AI-powered algorithms automatically compound your yields across multiple DeFi protocols while minimizing impermanent loss.",
// //       icon: profits,
// //       gradient: "from-teal-400 via-cyan-500 to-blue-500",
// //       crypto: "DeFi/NFT",
// //       hashRate: "Auto-APY",
// //       network: "Cross-Chain",
// //       status: "FARMING"
// //     },
// //     {
// //       title: "Smart Contract Analytics",
// //       description: "Real-time blockchain analytics with predictive AI models to optimize your portfolio performance and identify market opportunities.",
// //       icon: rocket2,
// //       gradient: "from-emerald-400 via-green-500 to-teal-500",
// //       crypto: "AI/ML",
// //       hashRate: "Real-time",
// //       network: "Analytics",
// //       status: "ACTIVE"
// //     },
// //     {
// //       title: "Institutional Trading Bot",
// //       description: "Professional-grade algorithmic trading with MEV protection, flash loan arbitrage, and institutional-level execution.",
// //       icon: eye,
// //       gradient: "from-cyan-500 via-teal-500 to-green-400",
// //       crypto: "BOT/API",
// //       hashRate: "HFT",
// //       network: "Trading",
// //       status: "TRADING"
// //     }
// //   ];

// //   useEffect(() => {
// //     // Digital clock
// //     const updateTime = () => {
// //       const now = new Date();
// //       setDigitalTime(now.toISOString().slice(11, 19));
// //     };
// //     updateTime();
// //     const timeInterval = setInterval(updateTime, 1000);

// //     // Mock blockchain data
// //     const generateBlockData = () => {
// //       return Array.from({ length: 20 }, (_, i) => ({
// //         block: 18500000 + i,
// //         hash: Math.random().toString(36).substring(2, 15),
// //         txs: Math.floor(Math.random() * 500) + 100,
// //         gas: Math.floor(Math.random() * 50) + 20
// //       }));
// //     };
// //     setBlockchainData(generateBlockData());

// //     // Auto-rotate services
// //     const serviceInterval = setInterval(() => {
// //       setActiveIndex(prev => (prev + 1) % services.length);
// //     }, 4000);

// //     return () => {
// //       clearInterval(timeInterval);
// //       clearInterval(serviceInterval);
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#085259] relative overflow-hidden">


// //       {/* Header */}
// //       <div className="relative z-10 pt-20 pb-12">
// //         <div className="max-w-7xl mx-auto px-6">
          
// //           {/* Top Status Bar */}
// //           <div className="flex items-center justify-between mb-12 p-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
// //             <div className="flex items-center space-x-6 text-sm font-mono">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //                 <span className="text-green-400">NETWORK: ONLINE</span>
// //               </div>
// //               <div className="text-cyan-400">BLOCK: #{blockchainData[0]?.block || '18500000'}</div>
// //               <div className="text-yellow-400">GAS: {blockchainData[0]?.gas || '25'} GWEI</div>
// //               <div className="text-purple-400">TIME: {digitalTime}</div>
// //             </div>
// //             <div className="text-cyan-400 font-mono text-sm">
// //               JAIMAX PROTOCOL v2.0
// //             </div>
// //           </div>

// //           {/* Main Title */}
// //           <div className="text-center mb-16">
// //             <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-full">
// //               <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
// //               <span className="text-cyan-400 font-mono text-sm tracking-wider">DECENTRALIZED ECOSYSTEM</span>
// //             </div>
            
// //             <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none">
// //               <span className="block text-white mb-4">NEXT-GEN</span>
// //               <span className="block bg-gradient-to-r from-cyan-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
// //                 CRYPTO STACK
// //               </span>
// //             </h1>
            
// //             <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
// //               Professional blockchain infrastructure for the decentralized future
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Services Section */}
// //       <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        
// //         {/* Service Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
// //           {services.map((service, index) => (
// //             <div
// //               key={index}
// //               className={`group relative bg-gray-900/30 backdrop-blur-xl border rounded-xl p-4 cursor-pointer transition-all duration-500 hover:scale-105 ${
// //                 index === activeIndex 
// //                   ? 'border-cyan-400/50 bg-gray-900/50 shadow-xl shadow-cyan-500/20' 
// //                   : 'border-gray-700/30 hover:border-gray-600/50'
// //               }`}
// //               onClick={() => setActiveIndex(index)}
// //             >
              
// //               {/* Header */}
// //               <div className="flex items-center justify-between mb-3">
// //                 <div className="flex items-center space-x-2">
// //                   <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
// //                     index === activeIndex ? 'bg-cyan-400' : 'bg-gray-500'
// //                   }`}></div>
// //                   <span className="text-xs font-mono text-gray-400 uppercase">
// //                     {service.status}
// //                   </span>
// //                 </div>
// //                 <div className="text-xs font-mono text-cyan-400">
// //                   #{index.toString().padStart(2, '0')}
// //                 </div>
// //               </div>

// //               {/* Icon */}
// //               <div className="mb-3">
// //                 <div 
// //                   className={`w-12 h-12 rounded-lg p-2 bg-gradient-to-br ${service.gradient} transform group-hover:rotate-3 transition-all duration-500`}
// //                 >
// //                   <img 
// //                     src={service.icon} 
// //                     alt=""
// //                     className="w-full h-full object-contain filter brightness-0 invert"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Title */}
// //               <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
// //                 index === activeIndex ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'
// //               }`}>
// //                 {service.title}
// //               </h3>

// //               {/* Stats */}
// //               <div className="grid grid-cols-1 gap-2 mb-3">
// //                 <div className="bg-black/30 rounded-md p-2 border border-gray-700/30">
// //                   <div className="text-xs text-gray-400 font-mono">PROTOCOL</div>
// //                   <div className="text-sm font-bold text-white">{service.crypto}</div>
// //                 </div>
// //               </div>

// //               {/* Action */}
// //               <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
// //                 index === activeIndex
// //                   ? `bg-gradient-to-r ${service.gradient} text-black`
// //                   : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
// //               }`}>
// //                 {index === activeIndex ? 'ACTIVE' : 'DEPLOY'}
// //               </button>

// //               {/* Glow Effect */}
// //               {index === activeIndex && (
// //                 <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 pointer-events-none"></div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {/* Detailed Active Service */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 mb-16">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
// //             {/* Left: Content */}
// //             <div>
// //               <div className="flex items-center space-x-3 mb-4">
// //                 <div 
// //                   className={`w-16 h-16 rounded-xl p-3 bg-gradient-to-br ${services[activeIndex].gradient}`}
// //                 >
// //                   <img 
// //                     src={services[activeIndex].icon} 
// //                     alt=""
// //                     className="w-full h-full object-contain filter brightness-0 invert"
// //                   />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-2xl font-bold text-cyan-400">{services[activeIndex].title}</h3>
// //                   <span className="text-sm font-mono text-green-400">{services[activeIndex].status}</span>
// //                 </div>
// //               </div>
              
// //               <p className="text-gray-300 mb-6 leading-relaxed">
// //                 {services[activeIndex].description}
// //               </p>

// //               <div className="flex space-x-4">
// //                 <button className={`bg-gradient-to-r ${services[activeIndex].gradient} text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300`}>
// //                   DEPLOY NOW
// //                 </button>
// //                 <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-cyan-400/10 transition-all duration-300">
// //                   LEARN MORE
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Right: Stats */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">PROTOCOL</div>
// //                 <div className="text-xl font-bold text-white">{services[activeIndex].crypto}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">RATE</div>
// //                 <div className="text-xl font-bold text-green-400">{services[activeIndex].hashRate}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">NETWORK</div>
// //                 <div className="text-xl font-bold text-purple-400">{services[activeIndex].network}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">HASH</div>
// //                 <div className="text-sm font-mono text-green-400 break-all">
// //                   0x{Math.random().toString(16).slice(2, 12)}...
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Live Blockchain Feed */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
// //           <div className="flex items-center justify-between mb-6">
// //             <h3 className="text-2xl font-bold text-white">Live Blockchain Feed</h3>
// //             <div className="flex items-center space-x-2">
// //               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //               <span className="text-green-400 font-mono text-sm">LIVE</span>
// //             </div>
// //           </div>
          
// //           <div className="space-y-3 max-h-48 overflow-y-auto">
// //             {blockchainData.slice(0, 8).map((block, index) => (
// //               <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
// //                 <div className="flex items-center space-x-4">
// //                   <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
// //                     <span className="text-black font-bold text-xs">B</span>
// //                   </div>
// //                   <div>
// //                     <div className="text-white font-mono text-sm">Block #{block.block}</div>
// //                     <div className="text-gray-400 font-mono text-xs">{block.txs} txs</div>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className="text-cyan-400 font-mono text-xs">{block.hash}</div>
// //                   <div className="text-green-400 font-mono text-xs">{block.gas} gwei</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* CTA Section */}

// //       </div>
// //     </div>
// //   );
// // };

// // export default ServicesSection;

// // import React, { useState, useEffect } from 'react';
// // import { Shield, Wallet, TrendingUp, BarChart3, Zap } from 'lucide-react';

// // const ServicesSection = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [digitalTime, setDigitalTime] = useState('');
// //   const [systemData, setSystemData] = useState([]);

// //   const services = [
// //     {
// //       title: "Advanced Security Suite",
// //       description: "Enterprise-grade security protocols protect your digital assets with multi-layered encryption and real-time threat detection.",
// //       icon: Shield,
// //       gradient: "from-cyan-400 via-teal-500 to-green-500",
// //       tech: "SSL/TLS",
// //       performance: "99.9%",
// //       network: "Global CDN",
// //       status: "SECURED"
// //     },
// //     {
// //       title: "Digital Asset Manager",
// //       description: "Centralized dashboard to manage all your digital resources, files, and accounts with seamless synchronization across devices.",
// //       icon: Wallet,
// //       gradient: "from-green-400 via-emerald-500 to-teal-500",
// //       tech: "Cloud Sync",
// //       performance: "Real-time",
// //       network: "Multi-Platform",
// //       status: "SYNCED"
// //     },
// //     {
// //       title: "Performance Optimizer",
// //       description: "AI-powered algorithms automatically optimize your system performance and resource allocation for maximum efficiency.",
// //       icon: TrendingUp,
// //       gradient: "from-teal-400 via-cyan-500 to-blue-500",
// //       tech: "AI/ML",
// //       performance: "Auto-Scale",
// //       network: "Distributed",
// //       status: "OPTIMIZED"
// //     },
// //     {
// //       title: "Analytics Dashboard",
// //       description: "Real-time analytics with predictive insights to monitor performance metrics and identify optimization opportunities.",
// //       icon: BarChart3,
// //       gradient: "from-emerald-400 via-green-500 to-teal-500",
// //       tech: "BigData",
// //       performance: "Live Feed",
// //       network: "Analytics",
// //       status: "ACTIVE"
// //     },
// //     {
// //       title: "Automation Engine",
// //       description: "Professional-grade automation workflows with intelligent task scheduling and seamless integration capabilities.",
// //       icon: Zap,
// //       gradient: "from-cyan-500 via-teal-500 to-green-400",
// //       tech: "API/SDK",
// //       performance: "Instant",
// //       network: "Integration",
// //       status: "RUNNING"
// //     }
// //   ];

// //   useEffect(() => {
// //     // Digital clock
// //     const updateTime = () => {
// //       const now = new Date();
// //       setDigitalTime(now.toISOString().slice(11, 19));
// //     };
// //     updateTime();
// //     const timeInterval = setInterval(updateTime, 1000);

// //     // Mock system data
// //     const generateSystemData = () => {
// //       return Array.from({ length: 20 }, (_, i) => ({
// //         id: `SYS-${(18500000 + i).toString().slice(-6)}`,
// //         hash: Math.random().toString(36).substring(2, 15),
// //         load: Math.floor(Math.random() * 100) + 1,
// //         cpu: Math.floor(Math.random() * 50) + 20
// //       }));
// //     };
// //     setSystemData(generateSystemData());

// //     // Auto-rotate services
// //     const serviceInterval = setInterval(() => {
// //       setActiveIndex(prev => (prev + 1) % services.length);
// //     }, 4000);

// //     return () => {
// //       clearInterval(timeInterval);
// //       clearInterval(serviceInterval);
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#085259] relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
// //       </div>

// //       {/* Header */}
// //       <div className="relative z-10 pt-20 pb-12">
// //         <div className="max-w-7xl mx-auto px-6">
          
// //           {/* Top Status Bar */}
// //           <div className="flex items-center justify-between mb-12 p-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
// //             <div className="flex items-center space-x-6 text-sm font-mono">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //                 <span className="text-green-400">SYSTEM: ONLINE</span>
// //               </div>
// //               <div className="text-cyan-400">ID: #{systemData[0]?.id || 'SYS-500000'}</div>
// //               <div className="text-yellow-400">CPU: {systemData[0]?.cpu || '25'}%</div>
// //               <div className="text-purple-400">TIME: {digitalTime}</div>
// //             </div>
// //             <div className="text-cyan-400 font-mono text-sm">
// //               JAIMAX PLATFORM v2.0
// //             </div>
// //           </div>

// //           {/* Main Title */}
// //           <div className="text-center mb-16">
// //             <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-full">
// //               <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
// //               <span className="text-cyan-400 font-mono text-sm tracking-wider">INTEGRATED ECOSYSTEM</span>
// //             </div>
            
// //             <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none">
// //               <span className="block text-white mb-4">NEXT-GEN</span>
// //               <span className="block bg-gradient-to-r from-cyan-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
// //                 TECH STACK
// //               </span>
// //             </h1>
            
// //             <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
// //               Professional technology infrastructure for the digital future
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Services Section */}
// //       <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        
// //         {/* Service Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
// //           {services.map((service, index) => {
// //             const IconComponent = service.icon;
// //             return (
// //               <div
// //                 key={index}
// //                 className={`group relative bg-gray-900/30 backdrop-blur-xl border rounded-xl p-4 cursor-pointer transition-all duration-500 hover:scale-105 ${
// //                   index === activeIndex 
// //                     ? 'border-cyan-400/50 bg-gray-900/50 shadow-xl shadow-cyan-500/20' 
// //                     : 'border-gray-700/30 hover:border-gray-600/50'
// //                 }`}
// //                 onClick={() => setActiveIndex(index)}
// //               >
                
// //                 {/* Header */}
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center space-x-2">
// //                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
// //                       index === activeIndex ? 'bg-cyan-400' : 'bg-gray-500'
// //                     }`}></div>
// //                     <span className="text-xs font-mono text-gray-400 uppercase">
// //                       {service.status}
// //                     </span>
// //                   </div>
// //                   <div className="text-xs font-mono text-cyan-400">
// //                     #{index.toString().padStart(2, '0')}
// //                   </div>
// //                 </div>

// //                 {/* Icon */}
// //                 <div className="mb-3">
// //                   <div 
// //                     className={`w-12 h-12 rounded-lg p-2 bg-gradient-to-br ${service.gradient} transform group-hover:rotate-3 transition-all duration-500 flex items-center justify-center`}
// //                   >
// //                     <IconComponent className="w-6 h-6 text-black" />
// //                   </div>
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
// //                   index === activeIndex ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'
// //                 }`}>
// //                   {service.title}
// //                 </h3>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-1 gap-2 mb-3">
// //                   <div className="bg-black/30 rounded-md p-2 border border-gray-700/30">
// //                     <div className="text-xs text-gray-400 font-mono">TECHNOLOGY</div>
// //                     <div className="text-sm font-bold text-white">{service.tech}</div>
// //                   </div>
// //                 </div>

// //                 {/* Action */}
// //                 <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
// //                   index === activeIndex
// //                     ? `bg-gradient-to-r ${service.gradient} text-black`
// //                     : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
// //                 }`}>
// //                   {index === activeIndex ? 'ACTIVE' : 'ACTIVATE'}
// //                 </button>

// //                 {/* Glow Effect */}
// //                 {index === activeIndex && (
// //                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 pointer-events-none"></div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Detailed Active Service */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 mb-16">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
// //             {/* Left: Content */}
// //             <div>
// //               <div className="flex items-center space-x-3 mb-4">
// //                 <div 
// //                   className={`w-16 h-16 rounded-xl p-3 bg-gradient-to-br ${services[activeIndex].gradient} flex items-center justify-center`}
// //                 >
// //                   {React.createElement(services[activeIndex].icon, { 
// //                     className: "w-8 h-8 text-black" 
// //                   })}
// //                 </div>
// //                 <div>
// //                   <h3 className="text-2xl font-bold text-cyan-400">{services[activeIndex].title}</h3>
// //                   <span className="text-sm font-mono text-green-400">{services[activeIndex].status}</span>
// //                 </div>
// //               </div>
              
// //               <p className="text-gray-300 mb-6 leading-relaxed">
// //                 {services[activeIndex].description}
// //               </p>

// //               <div className="flex space-x-4">
// //                 <button className={`bg-gradient-to-r ${services[activeIndex].gradient} text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300`}>
// //                   ACTIVATE NOW
// //                 </button>
// //                 <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-cyan-400/10 transition-all duration-300">
// //                   LEARN MORE
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Right: Stats */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">TECHNOLOGY</div>
// //                 <div className="text-xl font-bold text-white">{services[activeIndex].tech}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">PERFORMANCE</div>
// //                 <div className="text-xl font-bold text-green-400">{services[activeIndex].performance}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">NETWORK</div>
// //                 <div className="text-xl font-bold text-purple-400">{services[activeIndex].network}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">ID</div>
// //                 <div className="text-sm font-mono text-green-400 break-all">
// //                   {systemData[0]?.hash || Math.random().toString(16).slice(2, 12)}...
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Live System Feed */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
// //           <div className="flex items-center justify-between mb-6">
// //             <h3 className="text-2xl font-bold text-white">Live System Monitor</h3>
// //             <div className="flex items-center space-x-2">
// //               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //               <span className="text-green-400 font-mono text-sm">LIVE</span>
// //             </div>
// //           </div>
          
// //           <div className="space-y-3 max-h-48 overflow-y-auto">
// //             {systemData.slice(0, 8).map((system, index) => (
// //               <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
// //                 <div className="flex items-center space-x-4">
// //                   <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
// //                     <span className="text-black font-bold text-xs">S</span>
// //                   </div>
// //                   <div>
// //                     <div className="text-white font-mono text-sm">{system.id}</div>
// //                     <div className="text-gray-400 font-mono text-xs">{system.load}% load</div>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className="text-cyan-400 font-mono text-xs">{system.hash}</div>
// //                   <div className="text-green-400 font-mono text-xs">{system.cpu}% cpu</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServicesSection;




// // import React, { useState, useEffect } from 'react';
// // import { Shield, Wallet, TrendingUp, BarChart3, Zap } from 'lucide-react';
// // import service from '../../assets/Images/homeservice.jpg'
// // const ServicesSection = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [digitalTime, setDigitalTime] = useState('');
// //   const [systemData, setSystemData] = useState([]);

// //   const services = [
// //     {
// //       title: "Security Measures",
// //       description: "Our KYC verification and Google Authenticator features fortify your account against unauthorized access. Trust in our platform to protect your digital holdings and secure your financial future.",
// //       icon: Shield,
// //       gradient: "from-teal-500 to-green-500",
// //       tech: "KYC/2FA",
// //       performance: "99.9%",
// //       network: "Secure",
// //       status: "PROTECTED"
// //     },
// //     {
// //       title: "Secure Crypto Wallet",
// //       description: "Cryptocurrencies are shielded by state-of-the-art security protocols, ensuring your digital wealth remains impenetrable. Experience the convenience of managing and accessing your assets securely, anytime, anywhere.",
// //       icon: Wallet,
// //       gradient: "from-green-500 to-teal-500",
// //       tech: "Crypto",
// //       performance: "24/7",
// //       network: "Global",
// //       status: "SECURED"
// //     },
// //     {
// //       title: "Access to Profits",
// //       description: "Convert your investments into real-world gains, making the most of your financial endeavors. Enjoy the flexibility and speed you deserve.",
// //       icon: TrendingUp,
// //       gradient: "from-teal-600 to-green-600",
// //       tech: "Profits",
// //       performance: "Instant",
// //       network: "Fast",
// //       status: "EARNING"
// //     },
// //     {
// //       title: "Financial Growth",
// //       description: "Jaimax Coin offers plans that align with your aspirations. Achieve optimal growth and maximize your returns through intelligently designed investment options.",
// //       icon: BarChart3,
// //       gradient: "from-green-600 to-teal-600",
// //       tech: "Growth",
// //       performance: "High ROI",
// //       network: "Plans",
// //       status: "GROWING"
// //     },
// //     {
// //       title: "Funds Management",
// //       description: "Add money, transfer funds, and monitor your investments with ease. Navigate through your financial journey smoothly as you react promptly to market opportunities.",
// //       icon: Zap,
// //       gradient: "from-teal-400 to-green-400",
// //       tech: "Transfer",
// //       performance: "Real-time",
// //       network: "Monitoring",
// //       status: "ACTIVE"
// //     }
// //   ];

// //   useEffect(() => {
// //     // Digital clock
// //     const updateTime = () => {
// //       const now = new Date();
// //       setDigitalTime(now.toISOString().slice(11, 19));
// //     };
// //     updateTime();
// //     const timeInterval = setInterval(updateTime, 1000);

// //     // Mock system data
// //     const generateSystemData = () => {
// //       return Array.from({ length: 20 }, (_, i) => ({
// //         id: `SYS-${(18500000 + i).toString().slice(-6)}`,
// //         hash: Math.random().toString(36).substring(2, 15),
// //         load: Math.floor(Math.random() * 100) + 1,
// //         cpu: Math.floor(Math.random() * 50) + 20
// //       }));
// //     };
// //     setSystemData(generateSystemData());

// //     // Auto-rotate services
// //     const serviceInterval = setInterval(() => {
// //       setActiveIndex(prev => (prev + 1) % services.length);
// //     }, 4000);

// //     return () => {
// //       clearInterval(timeInterval);
// //       clearInterval(serviceInterval);
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#085259] relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
// //       </div>

// //       {/* Header */}
// //       <div className="relative z-10 pt-20 pb-12">
// //         <div className="max-w-7xl mx-auto px-6">
          
// //           {/* Top Status Bar */}
// //           <div className="flex items-center justify-between mb-12 p-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
// //             <div className="flex items-center space-x-6 text-sm font-mono">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //                 <span className="text-green-400">SYSTEM: ONLINE</span>
// //               </div>
// //               <div className="text-cyan-400">ID: #{systemData[0]?.id || 'SYS-500000'}</div>
// //               <div className="text-yellow-400">CPU: {systemData[0]?.cpu || '25'}%</div>
// //               <div className="text-purple-400">TIME: {digitalTime}</div>
// //             </div>
// //             <div className="text-cyan-400 font-mono text-sm">
// //               JAIMAX PLATFORM v2.0
// //             </div>
// //           </div>

// //           {/* Main Title */}
// //           <div className="text-center mb-16">
// //             <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-full">
// //               <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
// //               <span className="text-cyan-400 font-mono text-sm tracking-wider">CRYPTO INVESTMENT PLATFORM</span>
// //             </div>
            
// //             <h1 className="text-7xl md:text-8xl font-black mb-8 leading-none">
// //               <span className="block text-white mb-4">JAIMAX</span>
// //               <span className="block bg-gradient-to-r from-cyan-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
// //                 SERVICES
// //               </span>
// //             </h1>
            
// //             <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
// //               Professional cryptocurrency platform for secure digital investments
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Services Section */}
// //       <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        
// //         {/* Service Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
// //           {services.map((service, index) => {
// //             const IconComponent = service.icon;
// //             return (
// //               <div
// //                 key={index}
// //                 className={`group relative bg-gray-900/30 backdrop-blur-xl border rounded-xl p-4 cursor-pointer transition-all duration-500 hover:scale-105 ${
// //                   index === activeIndex 
// //                     ? 'border-cyan-400/50 bg-gray-900/50 shadow-xl shadow-cyan-500/20' 
// //                     : 'border-gray-700/30 hover:border-gray-600/50'
// //                 }`}
// //                 onClick={() => setActiveIndex(index)}
// //               >
                
// //                 {/* Header */}
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center space-x-2">
// //                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
// //                       index === activeIndex ? 'bg-cyan-400' : 'bg-gray-500'
// //                     }`}></div>
// //                     <span className="text-xs font-mono text-gray-400 uppercase">
// //                       {service.status}
// //                     </span>
// //                   </div>
// //                   <div className="text-xs font-mono text-cyan-400">
// //                     #{index.toString().padStart(2, '0')}
// //                   </div>
// //                 </div>

// //                 {/* Icon */}
// //                 <div className="mb-3">
// //                   <div 
// //                     className={`w-12 h-12 rounded-lg p-2 bg-gradient-to-br ${service.gradient} transform group-hover:rotate-3 transition-all duration-500 flex items-center justify-center`}
// //                   >
// //                     <IconComponent className="w-6 h-6 text-black" />
// //                   </div>
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
// //                   index === activeIndex ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'
// //                 }`}>
// //                   {service.title}
// //                 </h3>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-1 gap-2 mb-3">
// //                   <div className="bg-black/30 rounded-md p-2 border border-gray-700/30">
// //                     <div className="text-xs text-gray-400 font-mono">TECHNOLOGY</div>
// //                     <div className="text-sm font-bold text-white">{service.tech}</div>
// //                   </div>
// //                 </div>

// //                 {/* Action */}
// //                 <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
// //                   index === activeIndex
// //                     ? `bg-gradient-to-r ${service.gradient} text-black`
// //                     : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
// //                 }`}>
// //                   {index === activeIndex ? 'ACTIVE' : 'ACTIVATE'}
// //                 </button>

// //                 {/* Glow Effect */}
// //                 {index === activeIndex && (
// //                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 pointer-events-none"></div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Detailed Active Service */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-6 mb-16">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
// //             {/* Left: Content */}
// //             <div>
// //               <div className="flex items-center space-x-3 mb-4">
// //                 <div 
// //                   className={`w-16 h-16 rounded-xl p-3 bg-gradient-to-br ${services[activeIndex].gradient} flex items-center justify-center`}
// //                 >
// //                   {React.createElement(services[activeIndex].icon, { 
// //                     className: "w-8 h-8 text-black" 
// //                   })}
// //                 </div>
// //                 <div>
// //                   <h3 className="text-2xl font-bold text-cyan-400">{services[activeIndex].title}</h3>
// //                   <span className="text-sm font-mono text-green-400">{services[activeIndex].status}</span>
// //                 </div>
// //               </div>
              
// //               <p className="text-gray-300 mb-6 leading-relaxed">
// //                 {services[activeIndex].description}
// //               </p>

// //               <div className="flex space-x-4">
// //                 <button className={`bg-gradient-to-r ${services[activeIndex].gradient} text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300`}>
// //                   ACTIVATE NOW
// //                 </button>
// //                 <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl font-bold hover:bg-cyan-400/10 transition-all duration-300">
// //                   LEARN MORE
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Right: Stats */}
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">TECHNOLOGY</div>
// //                 <div className="text-xl font-bold text-white">{services[activeIndex].tech}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">PERFORMANCE</div>
// //                 <div className="text-xl font-bold text-green-400">{services[activeIndex].performance}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">NETWORK</div>
// //                 <div className="text-xl font-bold text-purple-400">{services[activeIndex].network}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">ID</div>
// //                 <div className="text-sm font-mono text-green-400 break-all">
// //                   {systemData[0]?.hash || Math.random().toString(16).slice(2, 12)}...
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Live System Feed */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
// //           <div className="flex items-center justify-between mb-6">
// //             <h3 className="text-2xl font-bold text-white">Live System Monitor</h3>
// //             <div className="flex items-center space-x-2">
// //               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //               <span className="text-green-400 font-mono text-sm">LIVE</span>
// //             </div>
// //           </div>
          
// //           <div className="space-y-3 max-h-48 overflow-y-auto">
// //             {systemData.slice(0, 8).map((system, index) => (
// //               <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-gray-800">
// //                 <div className="flex items-center space-x-4">
// //                   <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
// //                     <span className="text-black font-bold text-xs">S</span>
// //                   </div>
// //                   <div>
// //                     <div className="text-white font-mono text-sm">{system.id}</div>
// //                     <div className="text-gray-400 font-mono text-xs">{system.load}% load</div>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className="text-cyan-400 font-mono text-xs">{system.hash}</div>
// //                   <div className="text-green-400 font-mono text-xs">{system.cpu}% cpu</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Financial Growth Section */}
// //         <div className="text-white py-16 px-6 lg:px-24 flex flex-col lg:flex-row items-center justify-between">
// //           {/* Text content */}
// //           <div className="lg:w-1/2 space-y-6">
// //             <h2 className="text-green-400 text-4xl lg:text-5xl font-extrabold">
// //               Financial Growth
// //             </h2>
// //             <h3 className="uppercase text-white tracking-widest text-sm">
// //               FINANCIAL GROWTH THROUGH SMART INVESTMENTS
// //             </h3>
// //             <p className="text-2xl font-extrabold leading-snug">
// //               Discover a range of meticulously crafted investment plans designed to
// //               cater to your unique financial aspirations.
// //             </p>
// //             <p className="text-gray-300">
// //               At Jaimax Coin, we understand that every investor is different, and
// //               that's why we offer a variety of plans tailored to your needs. Whether
// //               you're a newcomer looking to start small, an experienced investor
// //               seeking substantial growth, or someone planning for retirement, our
// //               plans provide you with the tools, strategies, and support to achieve
// //               your goals. Explore our diverse investment options and embark on a
// //               journey towards financial success with Jaimax Coin.
// //             </p>
// //             <button className="bg-[#C6F839] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b5e634] transition">
// //               Invest now
// //             </button>
// //           </div>
// //           <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
// //                   <img src={service} alt="" className="rounded-3xl ml-10" />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServicesSection;



// // import React, { useState, useEffect } from 'react';
// // import { Shield, Wallet, TrendingUp, BarChart3, Zap } from 'lucide-react';
// // import service from '../../assets/Images/homeservice.jpg'
// // const ServicesSection = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [digitalTime, setDigitalTime] = useState('');
// //   const [systemData, setSystemData] = useState([]);

// //   // Placeholder image for the service image
// //   const serviceImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23085259'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='24' fill='%23C6F839' text-anchor='middle'%3EService Image%3C/text%3E%3C/svg%3E";

// //   const services = [
// //     {
// //       title: "Security Measures",
// //       description: "Our KYC verification and Google Authenticator features fortify your account against unauthorized access. Trust in our platform to protect your digital holdings and secure your financial future.",
// //       icon: Shield,
// //       gradient: "from-teal-500 to-green-500",
// //       tech: "KYC/2FA",
// //       performance: "99.9%",
// //       network: "Secure",
// //       status: "PROTECTED"
// //     },
// //     {
// //       title: "Secure Crypto Wallet",
// //       description: "Cryptocurrencies are shielded by state-of-the-art security protocols, ensuring your digital wealth remains impenetrable. Experience the convenience of managing and accessing your assets securely, anytime, anywhere.",
// //       icon: Wallet,
// //       gradient: "from-green-500 to-teal-500",
// //       tech: "Crypto",
// //       performance: "24/7",
// //       network: "Global",
// //       status: "SECURED"
// //     },
// //     {
// //       title: "Access to Profits",
// //       description: "Convert your investments into real-world gains, making the most of your financial endeavors. Enjoy the flexibility and speed you deserve.",
// //       icon: TrendingUp,
// //       gradient: "from-teal-600 to-green-600",
// //       tech: "Profits",
// //       performance: "Instant",
// //       network: "Fast",
// //       status: "EARNING"
// //     },
// //     {
// //       title: "Financial Growth",
// //       description: "Jaimax Coin offers plans that align with your aspirations. Achieve optimal growth and maximize your returns through intelligently designed investment options.",
// //       icon: BarChart3,
// //       gradient: "from-green-600 to-teal-600",
// //       tech: "Growth",
// //       performance: "High ROI",
// //       network: "Plans",
// //       status: "GROWING"
// //     },
// //     {
// //       title: "Funds Management",
// //       description: "Add money, transfer funds, and monitor your investments with ease. Navigate through your financial journey smoothly as you react promptly to market opportunities.",
// //       icon: Zap,
// //       gradient: "from-teal-400 to-green-400",
// //       tech: "Transfer",
// //       performance: "Real-time",
// //       network: "Monitoring",
// //       status: "ACTIVE"
// //     }
// //   ];

// //   useEffect(() => {
// //     // Digital clock
// //     const updateTime = () => {
// //       const now = new Date();
// //       setDigitalTime(now.toISOString().slice(11, 19));
// //     };
// //     updateTime();
// //     const timeInterval = setInterval(updateTime, 1000);

// //     // Mock system data
// //     const generateSystemData = () => {
// //       return Array.from({ length: 20 }, (_, i) => ({
// //         id: `SYS-${(18500000 + i).toString().slice(-6)}`,
// //         hash: Math.random().toString(36).substring(2, 15),
// //         load: Math.floor(Math.random() * 100) + 1,
// //         cpu: Math.floor(Math.random() * 50) + 20
// //       }));
// //     };
// //     setSystemData(generateSystemData());

// //     // Auto-rotate services
// //     const serviceInterval = setInterval(() => {
// //       setActiveIndex(prev => (prev + 1) % services.length);
// //     }, 4000);

// //     return () => {
// //       clearInterval(timeInterval);
// //       clearInterval(serviceInterval);
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#085259] relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 lg:w-[600px] lg:h-[600px] bg-teal-500/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
// //       </div>

// //       {/* Header */}
// //       <div className="relative z-10 pt-8 sm:pt-12 lg:pt-20 pb-6 sm:pb-8 lg:pb-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
// //           {/* Top Status Bar */}
// //           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 p-3 sm:p-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
// //             <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm font-mono mb-2 sm:mb-0">
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //                 <span className="text-green-400">SYSTEM: ONLINE</span>
// //               </div>
// //               <div className="text-cyan-400">ID: #{systemData[0]?.id || 'SYS-500000'}</div>
// //               <div className="text-yellow-400">CPU: {systemData[0]?.cpu || '25'}%</div>
// //               <div className="text-purple-400">TIME: {digitalTime}</div>
// //             </div>
// //             <div className="text-cyan-400 font-mono text-xs sm:text-sm">
// //               JAIMAX PLATFORM v2.0
// //             </div>
// //           </div>

// //           {/* Main Title */}
// //           <div className="text-center mb-12 sm:mb-16">
// //             <div className="inline-flex items-center space-x-3 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-full">
// //               <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
// //               <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-wider">CRYPTO INVESTMENT PLATFORM</span>
// //             </div>
            
// //             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-none">
// //               <span className="block text-white mb-2 sm:mb-4">JAIMAX</span>
// //               <span className="block bg-gradient-to-r from-cyan-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
// //                 SERVICES
// //               </span>
// //             </h1>
            
// //             <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light px-4">
// //               Professional cryptocurrency platform for secure digital investments
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Services Section */}
// //       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        
// //         {/* Service Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-12 sm:mb-16">
// //           {services.map((service, index) => {
// //             const IconComponent = service.icon;
// //             return (
// //               <div
// //                 key={index}
// //                 className={`group relative bg-gray-900/30 backdrop-blur-xl border rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-500 hover:scale-105 ${
// //                   index === activeIndex 
// //                     ? 'border-cyan-400/50 bg-gray-900/50 shadow-xl shadow-cyan-500/20' 
// //                     : 'border-gray-700/30 hover:border-gray-600/50'
// //                 }`}
// //                 onClick={() => setActiveIndex(index)}
// //               >
                
// //                 {/* Header */}
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center space-x-2">
// //                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
// //                       index === activeIndex ? 'bg-cyan-400' : 'bg-gray-500'
// //                     }`}></div>
// //                     <span className="text-xs font-mono text-gray-400 uppercase">
// //                       {service.status}
// //                     </span>
// //                   </div>
// //                   <div className="text-xs font-mono text-cyan-400">
// //                     #{index.toString().padStart(2, '0')}
// //                   </div>
// //                 </div>

// //                 {/* Icon */}
// //                 <div className="mb-3">
// //                   <div 
// //                     className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg p-2 bg-gradient-to-br ${service.gradient} transform group-hover:rotate-3 transition-all duration-500 flex items-center justify-center`}
// //                   >
// //                     <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
// //                   </div>
// //                 </div>

// //                 {/* Title */}
// //                 <h3 className={`text-base sm:text-lg font-bold mb-2 transition-colors duration-300 ${
// //                   index === activeIndex ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'
// //                 }`}>
// //                   {service.title}
// //                 </h3>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-1 gap-2 mb-3">
// //                   <div className="bg-black/30 rounded-md p-2 border border-gray-700/30">
// //                     <div className="text-xs text-gray-400 font-mono">TECHNOLOGY</div>
// //                     <div className="text-sm font-bold text-white">{service.tech}</div>
// //                   </div>
// //                 </div>

// //                 {/* Action */}
// //                 <button className={`w-full py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
// //                   index === activeIndex
// //                     ? `bg-gradient-to-r ${service.gradient} text-black`
// //                     : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
// //                 }`}>
// //                   {index === activeIndex ? 'ACTIVE' : 'ACTIVATE'}
// //                 </button>

// //                 {/* Glow Effect */}
// //                 {index === activeIndex && (
// //                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 pointer-events-none"></div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Detailed Active Service */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-4 sm:p-6 mb-12 sm:mb-16">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            
// //             {/* Left: Content */}
// //             <div>
// //               <div className="flex items-center space-x-3 mb-4">
// //                 <div 
// //                   className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl p-2 sm:p-3 bg-gradient-to-br ${services[activeIndex].gradient} flex items-center justify-center`}
// //                 >
// //                   {React.createElement(services[activeIndex].icon, { 
// //                     className: "w-6 h-6 sm:w-8 sm:h-8 text-black" 
// //                   })}
// //                 </div>
// //                 <div>
// //                   <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">{services[activeIndex].title}</h3>
// //                   <span className="text-xs sm:text-sm font-mono text-green-400">{services[activeIndex].status}</span>
// //                 </div>
// //               </div>
              
// //               <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
// //                 {services[activeIndex].description}
// //               </p>

// //               <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
// //                 <button className={`bg-gradient-to-r ${services[activeIndex].gradient} text-black px-6 sm:px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-sm sm:text-base`}>
// //                   ACTIVATE NOW
// //                 </button>
// //                 <button className="border border-cyan-400 text-cyan-400 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-cyan-400/10 transition-all duration-300 text-sm sm:text-base">
// //                   LEARN MORE
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Right: Stats */}
// //             <div className="grid grid-cols-2 gap-3 sm:gap-4">
// //               <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">TECHNOLOGY</div>
// //                 <div className="text-lg sm:text-xl font-bold text-white">{services[activeIndex].tech}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">PERFORMANCE</div>
// //                 <div className="text-lg sm:text-xl font-bold text-green-400">{services[activeIndex].performance}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">NETWORK</div>
// //                 <div className="text-lg sm:text-xl font-bold text-purple-400">{services[activeIndex].network}</div>
// //               </div>
// //               <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-gray-700/30">
// //                 <div className="text-xs text-gray-400 font-mono mb-2">ID</div>
// //                 <div className="text-xs sm:text-sm font-mono text-green-400 break-all">
// //                   {systemData[0]?.hash || Math.random().toString(16).slice(2, 12)}...
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Live System Feed */}
// //         <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16">
// //           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
// //             <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">Live System Monitor</h3>
// //             <div className="flex items-center space-x-2">
// //               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //               <span className="text-green-400 font-mono text-sm">LIVE</span>
// //             </div>
// //           </div>
          
// //           <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
// //             {systemData.slice(0, 8).map((system, index) => (
// //               <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-black/30 rounded-lg border border-gray-800">
// //                 <div className="flex items-center space-x-3 sm:space-x-4">
// //                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
// //                     <span className="text-black font-bold text-xs">S</span>
// //                   </div>
// //                   <div>
// //                     <div className="text-white font-mono text-xs sm:text-sm">{system.id}</div>
// //                     <div className="text-gray-400 font-mono text-xs">{system.load}% load</div>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className="text-cyan-400 font-mono text-xs truncate max-w-20 sm:max-w-none">{system.hash}</div>
// //                   <div className="text-green-400 font-mono text-xs">{system.cpu}% cpu</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Financial Growth Section */}
// //         <div className="text-white py-8 sm:py-12 lg:py-16 px-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
// //           {/* Text content */}
// //           <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
// //             <h2 className="text-green-400 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
// //               Financial Growth
// //             </h2>
// //             <h3 className="uppercase text-white tracking-widest text-xs sm:text-sm">
// //               FINANCIAL GROWTH THROUGH SMART INVESTMENTS
// //             </h3>
// //             <p className="text-lg sm:text-xl lg:text-2xl font-extrabold leading-snug">
// //               Discover a range of meticulously crafted investment plans designed to
// //               cater to your unique financial aspirations.
// //             </p>
// //             <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
// //               At Jaimax Coin, we understand that every investor is different, and
// //               that's why we offer a variety of plans tailored to your needs. Whether
// //               you're a newcomer looking to start small, an experienced investor
// //               seeking substantial growth, or someone planning for retirement, our
// //               plans provide you with the tools, strategies, and support to achieve
// //               your goals. Explore our diverse investment options and embark on a
// //               journey towards financial success with Jaimax Coin.
// //             </p>
// //             <button className="bg-[#C6F839] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b5e634] transition text-sm sm:text-base">
// //               Invest now
// //             </button>
// //           </div>
// //           <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
// //             <img 
// //               src={service} 
// //               alt="Financial Growth Service" 
// //               className="rounded-3xl w-full max-w-md lg:max-w-lg xl:max-w-xl object-cover" 
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServicesSection;



// import React from "react";
// import { motion } from "framer-motion";

// import sevices from "../../assets/Images/services.svg";
// import jaicoins from "../../assets/Images/jaicoins.svg";
// import profits from "../../assets/Images/profits.svg";
// import access from "../../assets/Images/accessToprofit.svg";
// import eye from "../../assets/Images/eye.svg";
// import service from "../../assets/Images/homeservice.jpg";

// const services = [
//   {
//     title: "Security Measures",
//     icon: jaicoins,
//     description:
//       "KYC verification and Google Authenticator fortify your account from unauthorized access. Trust Jaimax to protect your digital assets.",
//     gradient: "from-[#bbcf28] to-[#1d974a]",
//   },
//   {
//     title: "Secure Crypto Wallet",
//     icon: jaicoins,
//     description:
//       "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
//     gradient: "from-[#1d974a] to-[#bbcf28]",
//   },
//   {
//     title: "Access to Profits",
//     icon: profits,
//     description:
//       "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
//     gradient: "from-[#045c61] to-[#1d974a]",
//   },
//   {
//     title: "Financial Growth",
//     icon: jaicoins,
//     description:
//       "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
//     gradient: "from-[#bbcf28] to-[#095659]",
//   },
//   {
//     title: "Funds Management",
//     icon: jaicoins,
//     description:
//       "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
//     gradient: "from-[#bbcf28] to-[#095659]",
//   },
// ];

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.6 },
//   }),
// };

// const ServicesComponent = () => {
//   return (
//     <section className=" text-white relative z-10 overflow-hidden">
//       <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/partenrs-bg.png" alt="" />
//       <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/cases-bg.png" className="ml-20" alt="" />
//       {/* Services Header */}
//       <div className="text-center py-20 px-4 max-w-4xl mx-auto">
        
//         <img src={sevices} alt="Services" className="mx-auto w-20 md:w-24 mb-4" />
//         <h2
//           className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#bbcf28] to-[#1d974a] text-transparent bg-clip-text"
//         >
          
//           Our Service Offerings
//         </h2>
//         <p className="text-gray-300 mt-4 text-lg tracking-widest uppercase">
//           Empowering your crypto journey
//         </p>
//       </div>

//       {/* Services Cards Grid */}
//       <div className="container mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 pb-20">
//         {services.map((service, i) => (
//           <motion.div
//             key={i}
//             custom={i}
//             variants={fadeInUp}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-500"
//           >
//             <div
//               className={`w-14 h-14 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}
//             >
//               <img src={service.icon} alt={service.title} className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
//             <p className="text-gray-300">{service.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* CTA Section */}
//       <div className=" py-20 px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-10">
//         {/* Left text */}
//         <div className="lg:w-1/2 space-y-5">
//           <h2 className="text-3xl md:text-5xl font-bold text-green-400">Financial Growth</h2>
//           <h4 className="uppercase text-sm text-white tracking-widest">
//             Smart Crypto Investment Solutions
//           </h4>
//           <p className="text-xl font-semibold">
//             Discover investment plans designed for your success.
//           </p>
//           <p className="text-gray-300">
//             Whether you're a new investor or a seasoned pro, Jaimax provides secure, scalable, and strategic plans for maximum return. Start small or go big—our ecosystem adapts to your goals.
//           </p>
//           <button className="mt-4 bg-[#C6F839] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b5e634] transition-all">
//             Invest Now
//           </button>
//         </div>

//         {/* Right image */}
//         <div className="lg:w-1/2">
//           <img
//             src={service}
//             alt="Financial Growth with Jaimax"
//             className="rounded-xl w-full max-w-md mx-auto drop-shadow-2xl"
//           />
//         </div>
        
//       </div>
     
//       <img width="1147" height="418" decoding="async" src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201147%20418'%3E%3C/svg%3E" class="data__img" alt="data-bg.png" data-lazy-src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg.png"></img>
//      <div className="absolute left-20 p-5">
//      <img  src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg.png" alt="" />
//      </div>
//      <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg-space.png" alt=""/>
     
     
//      <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/docs-bg.png" alt="" />
//     </section>
//   );
// };

// export default ServicesComponent;



// import React, { useEffect, useRef, useState } from 'react';

// const ServicesSection = () => {
//   const [visibleItems, setVisibleItems] = useState(new Set());
//   const observerRef = useRef(null);

//   // Your services data
//   const services = [
//     {
//       title: "Security Measures",
//       icon: "🔒", // Placeholder - replace with your jaicoins icon
//       description: "KYC verification and Google Authenticator fortify your account from unauthorized access. Trust Jaimax to protect your digital assets.",
//       // gradient: "from-[#bbcf28] to-[#1d974a]",
//     },
//     {
//       title: "Secure Crypto Wallet",
//       icon: "💰", // Placeholder - replace with your jaicoins icon
//       description: "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
//       // gradient: "from-[#1d974a] to-[#bbcf28]",
//     },
//     {
//       title: "Access to Profits",
//       icon: "📈", // Placeholder - replace with your profits icon
//       description: "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
//       // gradient: "from-[#045c61] to-[#1d974a]",
//     },
//     {
//       title: "Financial Growth",
//       icon: "🚀", // Placeholder - replace with your jaicoins icon
//       description: "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
//       // gradient: "from-[#bbcf28] to-[#095659]",
//     },
//     {
//       title: "Funds Management",
//       icon: "💼", // Placeholder - replace with your jaicoins icon
//       description: "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
//       // gradient: "from-[#bbcf28] to-[#095659]",
//     },
//   ];

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const itemId = parseInt(entry.target.dataset.itemId);
//             setVisibleItems(prev => new Set([...prev, itemId]));
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '0px 0px -20px 0px'
//       }
//     );

//     const items = document.querySelectorAll('[data-item-id]');
//     items.forEach(item => {
//       if (observerRef.current) {
//         observerRef.current.observe(item);
//       }
//     });

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, []);

//   const getAnimationClasses = (itemId, side) => {
//     const isVisible = visibleItems.has(itemId);
    
//     if (!isVisible) {
//       return side === 'left' 
//         ? 'transform -translate-x-20 opacity-0'
//         : 'transform translate-x-20 opacity-0';
//     }
    
//     return 'transform translate-x-0 opacity-100';
//   }

//   return (
//     <div className=" py-16 lg:py-24 overflow-hidden" style={{
//     backgroundImage: "url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/cases-bg.png')",
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//   }}

//     >

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h4 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-4">
//             OUR SERVICES
//           </h4>
//           <h2 className="text-4xl lg:text-5xl font-bold text-white">
//             What We Offer
//           </h2>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {services.map((service, index) => {
//             const side = index % 2 === 0 ? 'left' : 'right';
//             return (
//               <div
//                 key={index}
//                 data-item-id={index}
//                 className={`flex items-start space-x-6 group transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${getAnimationClasses(index, side)}`}
//                 style={{
//                   transitionDelay: `${index * 150}ms`
//                 }}
//               >
//                 {/* Icon Circle with Custom Gradient */}
//                 <div className="flex-shrink-0">
//                   <div className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${service.gradient} rounded-full border-2 border-white/20 flex items-center justify-center text-white text-2xl lg:text-3xl group-hover:border-white/40 group-hover:scale-110 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-black/30`}>
//                     {/* Replace this with your actual icon component */}
//                     <span className="text-2xl lg:text-3xl">{service.icon}</span>
//                   </div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1 pt-2">
//                   <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#bbcf28] transition-colors duration-300">
//                     {service.title}
//                   </h3>
//                   <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
//                     {service.description}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

       
//       </div>

     
      
//     </div>
//   );
// };

// export default ServicesSection;



// import React, { useEffect, useRef, useState } from 'react';

// // Icon imports
// import sevices from "../../assets/Images/services.svg";
// import jaicoins from "../../assets/Images/jaicoins.svg";
// import jaimaxthreecoins from "../../assets/Images/JaimaxthreeCoin4.png";
// import frameTwo from "../../assets/Images/securitymeasure.svg";
// import serviceImg from "../../assets/Images/serviceImg.svg";
// import profits from "../../assets/Images/profits.svg";
// import access from "../../assets/Images/accessToprofit.svg";
// import rocket2 from '../../assets/Images/rocket2.svg';
// import eye from "../../assets/Images/eye.svg";
// import features from "../../assets/Images/Futures.svg";

// const ServicesSection = () => {
//   const [visibleItems, setVisibleItems] = useState(new Set());
//   const observerRef = useRef(null);

//   // Your services data
//   const services = [
//     {
//       title: "Security Measures",
//       icon: frameTwo, // Security measure icon
//       description: "KYC verification and Google Authenticator fortify your account from unauthorized access. Trust Jaimax to protect your digital assets.",
//       // gradient: "from-[#bbcf28] to-[#1d974a]",
//     },
//     {
//       title: "Secure Crypto Wallet",
//       icon: jaicoins, // Jaicoins icon for wallet
//       description: "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
//       // gradient: "from-[#1d974a] to-[#bbcf28]",
//     },
//     {
//       title: "Access to Profits",
//       icon: access, // Access to profits icon
//       description: "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
//       // gradient: "from-[#045c61] to-[#1d974a]",
//     },
//     {
//       title: "Financial Growth",
//       icon: rocket2, // Rocket icon for growth
//       description: "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
//       // gradient: "from-[#bbcf28] to-[#095659]",
//     },
//     {
//       title: "Funds Management",
//       icon: eye, // Eye icon for monitoring/management
//       description: "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
//       // gradient: "from-[#bbcf28] to-[#095659]",
//     },
//   ];

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const itemId = parseInt(entry.target.dataset.itemId);
//             setVisibleItems(prev => new Set([...prev, itemId]));
//           }
//         });
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '0px 0px -20px 0px'
//       }
//     );

//     const items = document.querySelectorAll('[data-item-id]');
//     items.forEach(item => {
//       if (observerRef.current) {
//         observerRef.current.observe(item);
//       }
//     });

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, []);

//   const getAnimationClasses = (itemId, side) => {
//     const isVisible = visibleItems.has(itemId);
    
//     if (!isVisible) {
//       return side === 'left' 
//         ? 'transform -translate-x-20 opacity-0'
//         : 'transform translate-x-20 opacity-0';
//     }
    
//     return 'transform translate-x-0 opacity-100';
//   }

//   return (
//     <div className=" py-16 lg:py-24 overflow-hidden" style={{
//     backgroundImage: "url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/cases-bg.png')",
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//   }}

//     >

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h4 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-4">
//             OUR SERVICES
//           </h4>
//           <h2 className="text-4xl lg:text-5xl font-bold text-white">
//             What We Offer
//           </h2>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {services.map((service, index) => {
//             const side = index % 2 === 0 ? 'left' : 'right';
//             return (
//               <div
//                 key={index}
//                 data-item-id={index}
//                 className={`flex items-start space-x-6 group transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${getAnimationClasses(index, side)}`}
//                 style={{
//                   transitionDelay: `${index * 150}ms`
//                 }}
//               >
//                 {/* Icon Circle with Custom Gradient */}
//                 <div className="flex-shrink-0">
//                   <div className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${service.gradient} rounded-full border-2 border-white/20 flex items-center justify-center text-white text-2xl lg:text-3xl group-hover:border-white/40 group-hover:scale-110 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-black/30`}>
//                     {/* Using actual SVG icons */}
//                     <img 
//                       src={service.icon} 
//                       alt={service.title}
//                       className="w-22 h-12 lg:w-20 lg:h-20 object-contain"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1 pt-2">
//                   <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#bbcf28] transition-colors duration-300">
//                     {service.title}
//                   </h3>
//                   <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
//                     {service.description}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

       
//       </div>

     
      
//     </div>
//   );
// };

// export default ServicesSection;



import React, { useEffect, useRef, useState } from 'react';

// Icon imports
import sevices from "../../assets/Images/services.svg";
import jaicoins from "../../assets/Images/jaicoins.svg";
import jaimaxthreecoins from "../../assets/Images/JaimaxthreeCoin4.png";
import frameTwo from "../../assets/Images/securitymeasure.svg";
import serviceImg from "../../assets/Images/serviceImg.svg";
import profits from "../../assets/Images/profits.svg";
import access from "../../assets/Images/accessToprofit.svg";
import rocket2 from '../../assets/Images/rocket2.svg';
import eye from "../../assets/Images/eye.svg";
import features from "../../assets/Images/Futures.svg";

const ServicesSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  // Your services data
  const services = [
    {
      title: "Security Measures",
      icon: frameTwo, // Security measure icon
      description: "KYC verification and Google Authenticator fortify your account from unauthorized access. Trust Jaimax to protect your digital assets.",
      // gradient: "from-[#bbcf28] to-[#1d974a]",
    },
    {
      title: "Secure Crypto Wallet",
      icon: jaicoins, // Jaicoins icon for wallet
      description: "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
      // gradient: "from-[#1d974a] to-[#bbcf28]",
    },
    {
      title: "Access to Profits",
      icon: access, // Access to profits icon
      description: "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
      // gradient: "from-[#045c61] to-[#1d974a]",
    },
    {
      title: "Financial Growth",
      icon: rocket2, // Rocket icon for growth
      description: "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
      // gradient: "from-[#bbcf28] to-[#095659]",
    },
    {
      title: "Funds Management",
      icon: eye, // Eye icon for monitoring/management
      description: "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
      // gradient: "from-[#bbcf28] to-[#095659]",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.itemId);
            setVisibleItems(prev => new Set([...prev, itemId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const items = document.querySelectorAll('[data-item-id]');
      items.forEach(item => {
        if (observerRef.current) {
          observerRef.current.observe(item);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getAnimationClasses = (itemId, side) => {
    const isVisible = visibleItems.has(itemId);
    
    if (!isVisible) {
      return side === 'left' 
        ? '-translate-x-20 opacity-0'
        : 'translate-x-20 opacity-0';
    }
    
    return 'translate-x-0 opacity-100';
  };

  return (
    <div className="py-10 lg:py-12 overflow-hidden" style={{
      backgroundImage: "url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/cases-bg.png')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h4 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-4">
            OUR SERVICES
          </h4>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            What We Offer
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            return (
              <div
                key={index}
                data-item-id={index}
                className={`flex items-start space-x-6 group transition-all duration-1000 ease-out ${getAnimationClasses(index, side)}`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Icon Circle with Custom Gradient */}
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${service.gradient} rounded-full border-2 border-white/20 flex items-center justify-center text-white text-2xl lg:text-3xl group-hover:border-white/40 group-hover:scale-110 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-black/30`}>
                    {/* Using actual SVG icons */}
                    <img 
                      src={service.icon} 
                      alt={service.title}
                      className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#bbcf28] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;


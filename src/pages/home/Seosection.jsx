// import React, { useEffect, useState } from 'react';

// const JaimaxContent = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
  
//   // Simple scroll listener
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Function to determine active section based on scroll position
//   const getActiveSection = () => {
//     const height = window.innerHeight;
//     if (scrollPosition < height * 0.3) return 0;
//     if (scrollPosition < height * 0.6) return 1;
//     if (scrollPosition < height) return 2;
//     if (scrollPosition < height * 1.4) return 3;
//     if (scrollPosition < height * 1.8) return 4;
//     return 5;
//   };
  
//   const activeSection = getActiveSection();
  
//   return (
//     <div className="bg-[#085056] text-white">
//       {/* All content is always visible, but we highlight sections based on scroll */}
//       <div className="max-w-8xl mx-auto px-4 py-8">
//         {/* Header stays visible */}
//         <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
//           India's Trusted <span className="text-[#b8cc26]">Pre-Sale</span> Crypto Coin – Jaimax
//         </h1>
        
//         {/* Navigation bar that shows progress */}
//         <div className="sticky top-4 z-30 bg-[#085056]/80 backdrop-blur-sm rounded-full p-1 border border-[#177338] mb-10">
//           <div className="flex justify-between">
//             {['Intro', 'About', 'Pre-Sale', 'Security', 'Ecosystem', 'Future'].map((name, index) => (
//               <div 
//                 key={index}
//                 className={`px-3 py-1 rounded-full transition-colors cursor-pointer text-sm
//                           ${activeSection === index ? 
//                              'bg-[#177338] text-[#b8cc26]' : 
//                              'hover:bg-[#177338]/30'}`}
//                 onClick={() => window.scrollTo({
//                   top: index * window.innerHeight * 0.4,
//                   behavior: 'smooth'
//                 })}
//               >
//                 {name}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Main content - all visible but highlighted based on scroll */}
        
//         {/* Section 0: Introduction */}
//         <div className={`mb-16 p-6 rounded-lg transition-all duration-300 ${
//           activeSection === 0 ? 'bg-[#177338]/20 border-l-4 border-[#2bcc39] transform scale-100' : 
//           'opacity-70 transform scale-95'
//         }`}>
//           <h2 className="text-2xl font-bold text-[#b8cc26] mb-4">The Evolution of Digital Finance</h2>
//           <p className="text-lg leading-relaxed">
//             In the evolving world of digital finance, <span className="text-[#b8cc26] font-semibold">Jaimax Coin</span> has emerged as India's best pre-sale crypto coin, built for investors who value innovation, transparency, and long-term stability. As India embraces blockchain technology and decentralized finance, Jaimax is shaping the future of how people invest and grow wealth through digital currencies.
//           </p>
//           <p className="mt-4 text-lg">
//             More than just a crypto coin, Jaimax represents a new era of secure, accessible, and rewarding investments for everyone.
//           </p>
//         </div>
        
//         {/* Section 1: What Makes Unique */}
//         <div className={`mb-16 p-6 rounded-lg transition-all duration-300 ${
//           activeSection === 1 ? 'bg-[#177338]/20 border-l-4 border-[#2bcc39] transform scale-100' : 
//           'opacity-70 transform scale-95'
//         }`}>
//           <h2 className="text-2xl font-bold text-[#b8cc26] mb-4">What Makes Jaimax Unique</h2>
//           <p className="leading-relaxed mb-6">
//             What makes Jaimax truly unique among India's growing number of crypto pre-sale coins is its powerful combination of <span className="text-[#b8cc26] font-semibold">trust, technology, and opportunity</span>. Backed by Jaisvik Software Solutions Private Limited, the project is designed to empower users to invest confidently in the future of cryptocurrency.
//           </p>
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="bg-[#085056]/80 p-4 rounded-lg border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26]">Trust</h4>
//               <p className="mt-2 text-sm opacity-80">Backed by Jaisvik Software Solutions Private Limited.</p>
//             </div>
//             <div className="bg-[#085056]/80 p-4 rounded-lg border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26]">Technology</h4>
//               <p className="mt-2 text-sm opacity-80">Fast transactions and strong blockchain security.</p>
//             </div>
//             <div className="bg-[#085056]/80 p-4 rounded-lg border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26]">Opportunity</h4>
//               <p className="mt-2 text-sm opacity-80">Simple and transparent investment model.</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Section 2: Pre-Sale */}
//         <div className={`mb-16 p-6 rounded-lg transition-all duration-300 ${
//           activeSection === 2 ? 'bg-[#177338]/20 border-l-4 border-[#2bcc39] transform scale-100' : 
//           'opacity-70 transform scale-95'
//         }`}>
//           <h2 className="text-2xl font-bold text-[#b8cc26] mb-4">Exclusive Pre-Sale Opportunity</h2>
//           <p className="text-lg leading-relaxed mb-6">
//             The Jaimax pre-sale offers early investors an exclusive opportunity to purchase coins at a low initial price before public trading begins. This pre-sale advantage allows holders to maximize their growth potential while supporting a rapidly expanding blockchain ecosystem.
//           </p>
//           <div className="bg-[#085056]/80 border border-[#177338] p-6 rounded-lg">
//             <div className="flex justify-between mb-2">
//               <span>Current Price:</span>
//               <span className="text-[#2bcc39] font-semibold">₹XX.XX</span>
//             </div>
//             <div className="flex justify-between mb-4">
//               <span>Expected Launch Price:</span>
//               <span className="text-[#2bcc39] font-semibold">₹XX.XX</span>
//             </div>
//             <div className="w-full h-3 bg-[#085056] border border-[#177338] rounded-full mb-2 overflow-hidden">
//               <div className="h-full bg-gradient-to-r from-[#177338] to-[#2bcc39]" style={{width: '65%'}}></div>
//             </div>
//             <div className="flex justify-between text-sm opacity-80">
//               <span>0%</span>
//               <span>Pre-Sale: 65% Complete</span>
//               <span>100%</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Section 3: Security */}
//         <div className={`mb-16 p-6 rounded-lg transition-all duration-300 ${
//           activeSection === 3 ? 'bg-[#177338]/20 border-l-4 border-[#2bcc39] transform scale-100' : 
//           'opacity-70 transform scale-95'
//         }`}>
//           <h2 className="text-2xl font-bold text-[#b8cc26] mb-4">Security at the Heart</h2>
//           <p className="text-lg leading-relaxed mb-6">
//             Security remains at the heart of the Jaimax ecosystem. Every transaction is protected by advanced blockchain encryption, ensuring full transparency and zero manipulation.
//           </p>
//           <div className="grid md:grid-cols-2 gap-6 mb-6">
//             <div className="bg-[#085056]/80 p-4 rounded-lg border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26] mb-2">Advanced Protection</h4>
//               <p className="opacity-80">Blockchain encryption ensures full transparency and zero manipulation.</p>
//             </div>
//             <div className="bg-[#085056]/80 p-4 rounded-lg border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26] mb-2">Industry Standards</h4>
//               <p className="opacity-80">Platform follows industry-leading standards for safety and compliance.</p>
//             </div>
//           </div>
//           <p className="text-lg leading-relaxed">
//             Investors can buy, hold, and trade Jaimax confidently, knowing that the platform follows industry-leading standards for safety and compliance. The Jaimax Coin is built to handle real-world utility — from DeFi and NFTs to decentralized applications.
//           </p>
//         </div>
        
//         {/* Section 4: Ecosystem */}
//         <div className={`mb-16 p-6 rounded-lg transition-all duration-300 ${
//           activeSection === 4 ? 'bg-[#177338]/20 border-l-4 border-[#2bcc39] transform scale-100' : 
//           'opacity-70 transform scale-95'
//         }`}>
//           <h2 className="text-2xl font-bold text-[#b8cc26] mb-4">Complete Blockchain Ecosystem</h2>
//           <p className="text-lg leading-relaxed mb-6">
//             Unlike most projects that focus only on trading, Jaimax is creating a complete blockchain ecosystem where investors, developers, and learners come together. Its vision extends beyond profit — aiming to educate, innovate, and connect users worldwide.
//           </p>
//           <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
//             <div className="bg-[#085056]/80 p-4 rounded border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26]">Educate</h4>
//               <p className="mt-2 text-sm opacity-80">Building knowledge of blockchain technology</p>
//             </div>
//             <div className="bg-[#085056]/80 p-4 rounded border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26]">Innovate</h4>
//               <p className="mt-2 text-sm opacity-80">Driving new blockchain solutions</p>
//             </div>
//             <div className="bg-[#085056]/80 p-4 rounded border border-[#177338]">
//               <h4 className="font-bold text-[#b8cc26]">Connect</h4>
//               <p className="mt-2 text-sm opacity-80">Bringing users worldwide together</p>
//             </div>
//           </div>
//           <p className="text-lg leading-relaxed">
//             This human-centered approach sets Jaimax apart as a best-in-class crypto coin designed to sustain long-term growth.
//           </p>
//         </div>
        
//         {/* Section 5: Future & CTA */}
//         <div className={`mb-16 p-6 rounded-lg transition-all duration-300 ${
//           activeSection === 5 ? 'bg-[#177338]/20 border-l-4 border-[#2bcc39] transform scale-100' : 
//           'opacity-70 transform scale-95'
//         }`}>
//           <h2 className="text-2xl font-bold text-[#b8cc26] mb-4">The Future with Jaimax</h2>
//           <p className="text-lg leading-relaxed mb-8">
//             As India steps into the next generation of digital finance, Jaimax Coin continues to lead as the best pre-sale crypto coin in India, offering a bridge between today's investors and tomorrow's decentralized economy. By investing early, users not only secure potential profits but also contribute to the development of a transparent and accessible financial future.
//           </p>
//           <div className="bg-gradient-to-r from-[#177338] to-[#085056] p-6 rounded-lg text-center">
//             <h3 className="text-2xl font-bold mb-3">
//               Join Jaimax today — the crypto pre-sale coin redefining how India invests in blockchain.
//             </h3>
//             <p className="text-xl font-semibold text-[#b8cc26] mb-6">
//               Invest early. Grow confidently. Own the future with Jaimax.
//             </p>
//             <button className="bg-[#b8cc26] hover:bg-[#2bcc39] transition-colors px-8 py-3 rounded-lg text-[#085056] font-bold">
//               Join Pre-Sale
//             </button>
//           </div>
//         </div>
        
       
//       </div>
//     </div>
//   );
// };

// export default JaimaxContent;

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const JaimaxContent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);
  
  const getActiveSection = () => {
    const height = window.innerHeight;
    if (scrollPosition < height * 0.3) return 0;
    if (scrollPosition < height * 0.6) return 1;
    if (scrollPosition < height) return 2;
    if (scrollPosition < height * 1.4) return 3;
    if (scrollPosition < height * 1.8) return 4;
    return 5;
  };
  
  const activeSection = getActiveSection();

  // Parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div className="min-h-screen bg-[#085056] text-white relative overflow-hidden">
      {/* Animated Orbs with Mouse Follow */}
      <motion.div 
        className="fixed w-96 h-96 bg-[#177338] opacity-20 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 30 },
          y: { type: "spring", stiffness: 50, damping: 30 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="fixed w-80 h-80 bg-[#2bcc39] opacity-15 rounded-full blur-3xl pointer-events-none"
        style={{ y: y1 }}
        animate={{
          x: [100, 300, 100],
          rotate: [0, 360],
        }}
        transition={{
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
      <motion.div 
        className="fixed w-64 h-64 bg-[#b8cc26] opacity-10 rounded-full blur-3xl pointer-events-none"
        style={{ y: y2 }}
        animate={{
          x: [-100, -300, -100],
        }}
        transition={{
          x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#177338] via-[#2bcc39] to-[#b8cc26] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Compact Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#177338] to-[#2bcc39] rounded-full text-xs font-bold tracking-widest mb-4"
            animate={{
              boxShadow: [
                "0 0 20px rgba(43, 204, 57, 0.3)",
                "0 0 40px rgba(43, 204, 57, 0.6)",
                "0 0 20px rgba(43, 204, 57, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PRE-SALE LIVE
          </motion.span>
          
          <motion.h1 className="text-4xl md:text-6xl font-black mb-3 leading-tight">
            India's Trusted{' '}
            <motion.span 
              className="text-[#b8cc26]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(184, 204, 38, 0.5)",
                  "0 0 40px rgba(184, 204, 38, 0.9)",
                  "0 0 20px rgba(184, 204, 38, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Pre-Sale
            </motion.span>{' '}
            Crypto – Jaimax
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Empowering India's Decentralized Future
          </motion.p>
        </motion.div>
        
        {/* Compact Navigation */}
        <motion.div 
          className="sticky top-4 z-30 mb-12"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="bg-[#085056]/90 backdrop-blur-xl rounded-full p-1.5 border border-[#177338] shadow-xl">
            <div className="grid grid-cols-6 gap-1">
              {['Intro', 'About', 'Pre-Sale', 'Security', 'Ecosystem', 'Future'].map((name, index) => (
                <motion.button
                  key={index}
                  className={`px-3 py-2 rounded-full font-bold text-xs transition-all ${
                    activeSection === index ? 'bg-gradient-to-r from-[#177338] to-[#2bcc39] text-white' : 'text-gray-400'
                  }`}
                  onClick={() => window.scrollTo({ top: index * window.innerHeight * 0.4, behavior: 'smooth' })}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={activeSection === index ? {
                    boxShadow: "0 0 20px rgba(43, 204, 57, 0.6)"
                  } : {}}
                >
                  {name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Section 0: Intro */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-[#085056]/40 backdrop-blur rounded-2xl p-6 border transition-all ${
              activeSection === 0 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/40' : 'border-[#177338]/30'
            }`}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(43, 204, 57, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-12 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26]">Evolution of Digital Finance</h2>
            </div>
            
            <motion.p 
              className="text-base text-gray-200 leading-relaxed mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              In the evolving world of digital finance, <span className="text-[#b8cc26] font-bold">Jaimax Coin</span> has emerged as India's best pre-sale crypto coin, built for investors who value innovation, transparency, and long-term stability.
            </motion.p>
            
            <motion.p 
              className="text-base text-gray-200 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              More than just a crypto coin, Jaimax represents a new era of secure, accessible, and rewarding investments.
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Section 1: Unique Features */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-[#085056]/40 backdrop-blur rounded-2xl p-6 border transition-all ${
              activeSection === 1 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/40' : 'border-[#177338]/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-12 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26]">What Makes Jaimax Unique</h2>
            </div>
            
            <p className="text-base text-gray-200 mb-6">
              Powerful combination of <span className="text-[#2bcc39] font-bold">trust, technology, and opportunity</span>.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Trust', desc: 'Backed by Jaisvik Software Solutions', color: '#177338' },
                { title: 'Technology', desc: 'Fast & secure blockchain', color: '#2bcc39' },
                { title: 'Opportunity', desc: 'Transparent investment model', color: '#b8cc26' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="relative bg-gradient-to-br from-[#177338]/30 to-transparent p-5 rounded-xl border border-[#177338] overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "#2bcc39",
                  }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 font-black text-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${item.color}, #085056)` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {idx + 1}
                  </motion.div>
                  <h4 className="font-black text-lg text-[#b8cc26] mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 2: Pre-Sale - Highlight */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-gradient-to-br from-[#177338]/30 to-[#085056]/40 backdrop-blur rounded-2xl p-6 border-2 transition-all ${
              activeSection === 2 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/50' : 'border-[#177338]/30'
            }`}
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(43, 204, 57, 0.2)",
                "0 0 60px rgba(43, 204, 57, 0.4)",
                "0 0 30px rgba(43, 204, 57, 0.2)",
              ]
            }}
            transition={{ boxShadow: { duration: 3, repeat: Infinity } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-12 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26]">Exclusive Pre-Sale</h2>
            </div>
            
            <p className="text-base text-gray-200 mb-6">
              Early investors get exclusive opportunity to purchase at low initial price before public trading.
            </p>
            
            <div className="bg-[#085056] border border-[#177338] p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-[#177338]/40 to-transparent p-4 rounded-lg border border-[#2bcc39]"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(43, 204, 57, 0.3)" }}
                >
                  <span className="text-xs text-gray-400 block mb-1">CURRENT PRICE</span>
                  <motion.span 
                    className="text-3xl font-black text-[#2bcc39]"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ₹XX.XX
                  </motion.span>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-[#b8cc26]/20 to-transparent p-4 rounded-lg border border-[#b8cc26]"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(184, 204, 38, 0.3)" }}
                >
                  <span className="text-xs text-gray-400 block mb-1">LAUNCH PRICE</span>
                  <span className="text-3xl font-black text-[#b8cc26]">₹XX.XX</span>
                </motion.div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-300 font-bold">Pre-Sale Progress</span>
                  <motion.span 
                    className="text-[#2bcc39] font-black"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    65%
                  </motion.span>
                </div>
                <div className="relative w-full h-4 bg-[#085056] border border-[#177338] rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full bg-gradient-to-r from-[#177338] via-[#2bcc39] to-[#b8cc26]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '65%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 3: Security - Compact */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, rotate: -5 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-[#085056]/40 backdrop-blur rounded-2xl p-6 border transition-all ${
              activeSection === 3 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/40' : 'border-[#177338]/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-12 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26]">Security First</h2>
            </div>
            
            <p className="text-base text-gray-200 mb-6">
              Every transaction protected by advanced blockchain encryption.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Advanced Protection', desc: 'Zero manipulation guarantee' },
                { title: 'Industry Standards', desc: 'Leading safety compliance' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-gradient-to-br from-[#177338]/30 to-transparent p-5 rounded-xl border border-[#177338]"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "#2bcc39",
                    boxShadow: "0 15px 35px rgba(43, 204, 57, 0.3)"
                  }}
                >
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-[#2bcc39] to-[#177338] rounded-full mb-4 flex items-center justify-center relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-[#085056] rounded-full flex items-center justify-center"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-2 h-2 bg-[#b8cc26] rounded-full" />
                    </motion.div>
                  </motion.div>
                  <h4 className="font-black text-lg text-[#b8cc26] mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 4: Ecosystem - Compact */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-[#085056]/40 backdrop-blur rounded-2xl p-6 border transition-all ${
              activeSection === 4 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/40' : 'border-[#177338]/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-12 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26]">Complete Ecosystem</h2>
            </div>
            
            <p className="text-base text-gray-200 mb-6">
              Creating a complete blockchain ecosystem for everyone.
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: 'Educate', color: '#177338' },
                { title: 'Innovate', color: '#2bcc39' },
                { title: 'Connect', color: '#b8cc26' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center bg-gradient-to-br from-[#177338]/30 to-transparent p-4 rounded-xl border border-[#177338]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    borderColor: "#2bcc39",
                    boxShadow: "0 15px 35px rgba(43, 204, 57, 0.3)"
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${item.color}, #085056)` }}
                    animate={{
                      boxShadow: [
                        `0 0 15px ${item.color}40`,
                        `0 0 30px ${item.color}70`,
                        `0 0 15px ${item.color}40`,
                      ],
                      rotate: [0, 360],
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <span className="text-2xl font-black text-white">{idx + 1}</span>
                  </motion.div>
                  <h4 className="font-black text-base text-[#b8cc26]">{item.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Section 5: CTA - Compact */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={`bg-[#085056]/40 backdrop-blur rounded-2xl p-6 border transition-all ${
              activeSection === 5 ? 'border-[#2bcc39] shadow-2xl shadow-[#2bcc39]/40' : 'border-[#177338]/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-12 bg-gradient-to-b from-[#b8cc26] to-[#2bcc39] rounded-full"
                animate={{ scaleY: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-2xl md:text-3xl font-black text-[#b8cc26]">The Future with Jaimax</h2>
            </div>
            
            <p className="text-base text-gray-200 mb-6">
              As India steps into the next generation of digital finance, Jaimax leads the way.
            </p>
            
            <motion.div 
              className="relative overflow-hidden bg-gradient-to-r from-[#177338] via-[#2bcc39] to-[#177338] p-8 rounded-2xl text-center"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.h3 
                className="text-xl md:text-2xl font-black mb-3 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                Join Jaimax — Redefining India's Blockchain Investment
              </motion.h3>
              
              <motion.p 
                className="text-lg font-bold text-[#085056] mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Invest Early. Grow Confidently. Own the Future.
              </motion.p>
              
              <motion.button 
                className="relative bg-[#085056] px-10 py-3 rounded-full text-white font-black text-base shadow-xl overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-[#b8cc26]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-[#085056] transition-colors">
                  Join Pre-Sale →
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        
      </div>
    </div>
  );
};

export default JaimaxContent;
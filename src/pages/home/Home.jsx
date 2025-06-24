// import React, { useState, useEffect, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
// import homeBgMobile from "../../assets/Images/HomeMobile.jpg";
// const Threads = React.lazy(() => import('../../global/Threads'));
// import Roadmap from './RoadmapDup';
// import Partners from './Partners';
// import HomeFooter from './HomeFoot';
// import JaimaxFAQ from './Faq';
// import AnimatedTestimonials from './Testimonals';
// import ServicesComponent from './Homeservices';
// import PhaseCarousel from './Phase';
// import CryptoStakingSection from './HomeAbout';
// import HomeContact from './HomeContact';
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
//       <div
//         className="revolutionSection w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
//         style={{
//           backgroundImage: `url(${currentBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           backgroundAttachment: "fixed"
//         }}
//       >
//         {/* Floating Elements */}
//         <div className="floating-elements">
//           <div className="floating-circle circle-1"></div>
//           <div className="floating-circle circle-2"></div>
//           <div className="floating-circle circle-3"></div>
//           <div className="floating-square square-1"></div>
//           <div className="floating-square square-2"></div>
//         </div>

//         {/* Overlays */}
//         <div className="gradient-overlay-1"></div>
//         <div className="gradient-overlay-2"></div>

//         {/* Main Heading */}
//         <div className="relative z-10 text-center px-6 md:px-12 max-w-6xl mx-auto mt-44 md:mt-48">
//           <motion.h2
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2, ease: 'easeOut' }}
//             className="tagline text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-center"
//           >
//             <span
//               style={{
//                 color: '#b8cc26',
//                 display: 'block',
//                 textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
//               }}
//             >
//               Secure Your Financial Tomorrow
//             </span>
//             <span
//               style={{
//                 color: '#fff',
//                 textShadow: '0 1px 4px rgba(0,0,0,0.4)',
//                 display: 'block',
//                 marginTop: '0.5rem',
//               }}
//             >
//               with Innovation & Trust
//             </span>
//           </motion.h2>

//           {/* CTA Button */}
//           <div className="cta-section mt-6">
//             <button
//               className="cta-button rounded-full hover:bg-lime-600 transition-transform duration-300 hover:scale-105"
//               style={{
//                 padding: "1rem 3rem",
//                 color: "white",
//                 backgroundColor: "#1e964a",
//                 boxShadow: "0 0 12px rgba(186, 206, 39, 0.5)",
//                 border: "1px solid #bace27"
//               }}
//               onClick={handleJoinRevolution}
//             >
//               <span className="uppercase tracking-wide font-semibold">Join Revolution</span>
//             </button>
//           </div>
//         </div>

//         {/* Threads Animation */}
//         {/* <div className="absolute bottom-0 left-0 right-0 h-[400px] md:h-[600px] pointer-events-none">
//           <div className="w-full h-full relative opacity-60">
//             <Suspense fallback={<div>Loading threads...</div>}>
//               <Threads
//                 amplitude={1.5}
//                 distance={0}
//                 enableMouseInteraction={true}
//               />
//             </Suspense>
//           </div>
//         </div> */}
//       </div>

//       {/* Page Sections */}
//       <CryptoStakingSection />
//       <PhaseCarousel />
//       <ServicesComponent />
//       <Roadmap />
// {/* <img  src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg.png"  className="absolute left-20 right-20 ml-20" alt="" /> */}
// {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/data-bg-space.png"  alt=""/> */}
// {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg1.png" alt="" /> */}
// {/* <img src="https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/services-bg-1.png" alt="" /> */}

//       <Partners />
//       <AnimatedTestimonials />
//       <JaimaxFAQ />
//       <HomeContact />
//       <HomeFooter />
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useRef } from 'react';
import homeBgDesktop from "../../assets/Images/HomeDesktop.jpg";
const CreativeHeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const gsap = window.gsap;
    if (!gsap) return;

    // Timeline for entrance animations
    const tl = gsap.timeline();

    // Title animation
    tl.fromTo(titleRef.current.children, 
      { 
        y: 100, 
        opacity: 0, 
        rotationX: -90 
      },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power3.out" 
      }
    );

    // Subtitle animation
    tl.fromTo(subtitleRef.current, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.5"
    );

    // Buttons animation
    tl.fromTo(buttonsRef.current.children, 
      { 
        scale: 0, 
        rotation: 180 
      },
      { 
        scale: 1, 
        rotation: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.7)" 
      }, "-=0.3"
    );

    // Stats animation
    tl.fromTo(statsRef.current.children, 
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.3"
    );

    // Image animation
    tl.fromTo(imageRef.current, 
      { 
        x: 200, 
        opacity: 0, 
        rotationY: 45 
      },
      { 
        x: 0, 
        opacity: 1, 
        rotationY: 0, 
        duration: 1, 
        ease: "power3.out" 
      }, "-=1"
    );

    // Floating animations for crypto icons
    gsap.to(".crypto-icon", {
      y: -20,
      rotation: 10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });

    // Continuous particles animation
    gsap.to(".particle", {
      y: -window.innerHeight - 100,
      rotation: 360,
      duration: 8,
      ease: "none",
      repeat: -1,
      stagger: {
        amount: 5,
        repeat: -1
      }
    });

    // Hover animations
    const buttons = document.querySelectorAll('.hero-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

  }, []);

  // Create particles
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${100 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 8}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='50' font-family='Arial, sans-serif' font-size='60' fill='%23ffffff' opacity='0.02'%3EHOME%3C/text%3E%3C/svg%3E")
        `,
        backgroundSize: 'cover, cover, cover, 200px 200px',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat'
      }}
    >
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-[20vw] font-black text-white opacity-[0.02] select-none transform -rotate-12">
          HOME
        </div>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {createParticles()}
      </div>

      {/* Crypto Icons Floating */}
      <div className="crypto-icon absolute top-20 left-10 text-6xl">₿</div>
      <div className="crypto-icon absolute top-32 right-20 text-4xl">Ξ</div>
      <div className="crypto-icon absolute top-60 left-20 text-5xl">◊</div>
      <div className="crypto-icon absolute bottom-40 right-10 text-4xl">🚀</div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <section className="py-16 md:py-24 flex flex-col md:flex-row items-center min-h-screen">
          {/* Left Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 relative">
            {/* Animated Title */}
            <div ref={titleRef} className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight font-mono">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-2">
                  Crypto,
                </div>
                <div className="bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  NFT,
                </div>
                <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  Trade,
                </div>
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Fun
                </div>
              </h1>
            </div>
            
            {/* Enhanced Description */}
            <div 
              ref={subtitleRef}
              className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 backdrop-blur-lg p-6 rounded-2xl mb-8 border border-purple-500/20 shadow-2xl shadow-purple-500/20"
            >
              <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
                Enter the future of digital finance where 
                <span className="text-purple-400 font-bold"> innovation meets opportunity</span>. 
                Experience next-generation crypto trading with AI-powered insights and 
                <span className="text-pink-400 font-bold"> revolutionary NFT marketplace</span>.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <button className="hero-button group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-purple-500/50 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  🚀 Connect Wallet
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="hero-button group relative bg-transparent border-2 border-violet-500 text-violet-400 hover:text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 overflow-hidden backdrop-blur-sm">
                <span className="relative z-10 flex items-center justify-center">
                  📊 Explore Platform
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            
            {/* Stats Counter */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              <div className="text-center bg-purple-500/10 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50K+</div>
                <div className="text-xs text-gray-400">Active Users</div>
              </div>
              <div className="text-center bg-pink-500/10 backdrop-blur-sm p-4 rounded-lg border border-pink-500/20">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">$250M</div>
                <div className="text-xs text-gray-400">Trading Volume</div>
              </div>
              <div className="text-center bg-violet-500/10 backdrop-blur-sm p-4 rounded-lg border border-violet-500/20">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">15K+</div>
                <div className="text-xs text-gray-400">NFTs Minted</div>
              </div>
            </div>
          </div>
          
          {/* Right Visual Section */}
          <div className="md:w-1/2 relative">
            <div ref={imageRef} className="relative transform perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              
              {/* Holographic Frame */}
              <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 backdrop-blur-lg p-8 rounded-3xl border border-purple-500/20">
                <img
                  alt="AI generated image of a dynamic crypto market overview with abstract glowing lines and data visualizations"
                  className="w-full rounded-2xl transform hover:scale-105 transition-transform duration-500"
                  src={homeBgDesktop}
                  onError={(e) => { e.target.src = 'https://placehold.co/800x600/1a0a1a/E0E0E0?text=Crypto+Trading+Platform'; }}
                />
                
                {/* Floating UI Elements */}
                <div className="absolute top-4 right-4 bg-purple-500/20 backdrop-blur-sm p-3 rounded-lg border border-purple-500/30 floating-animation">
                  <div className="text-purple-400 font-bold">+24.5%</div>
                  <div className="text-xs text-gray-400">BTC/USD</div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-pink-500/20 backdrop-blur-sm p-3 rounded-lg border border-pink-500/30 floating-animation">
                  <div className="text-pink-400 font-bold">🎨 NFT</div>
                  <div className="text-xs text-gray-400">Live Auction</div>
                </div>
                
                <div className="absolute top-1/2 left-4 bg-violet-500/20 backdrop-blur-sm p-3 rounded-lg border border-violet-500/30 floating-animation">
                  <div className="text-violet-400 font-bold">⚡ Fast</div>
                  <div className="text-xs text-gray-400">0.02s trades</div>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute top-1/4 right-0 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-animation">
                <span className="text-2xl">🪙</span>
              </div>
              
              <div className="absolute bottom-1/4 left-0 w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-animation">
                <span className="text-xl">💎</span>
              </div>
              
              <div className="absolute top-0 left-1/3 w-14 h-14 bg-violet-500/20 rounded-full flex items-center justify-center backdrop-blur-sm floating-animation">
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="w-6 h-10 border-2 border-purple-500 rounded-full mx-auto mb-2 relative">
          <div className="w-1 h-3 bg-purple-500 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
        <p className="text-xs text-gray-400">Scroll to explore</p>
      </div>
    </div>
  );
};

export default CreativeHeroSection;
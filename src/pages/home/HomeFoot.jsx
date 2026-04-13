// import coinsmax from "../../assets/Images/coinsmax.webp";
// import icon from "../../assets/3dcoin.webp";
// import playstore from "../../assets/Images/playStore.svg";
// import secureImg from "../../assets/Images/3dsecure.webp";
// import applestore from "../../assets/Images/appleStore.svg";
// import React, { useState, useEffect } from "react";
// import {
//   Smartphone,
//   Download,
//   Rocket,
//   Sparkles,
//   ArrowRight,
//   Play,
//   Apple,
//   Waves,
//   Shield,
//   TrendingUp,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function HomeFooter() {
//   const [isIframeSupported, setIsIframeSupported] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const navigate = useNavigate();

//   const onClickNavigateToLogin = () => {
//     navigate("/login");
//   };

//   const checkWebGL2Support = () => {
//     const canvas = document.createElement("canvas");
//     const gl = canvas.getContext("webgl2");
//     return !!gl;
//   };

//   useEffect(() => {
//     const isSupported = checkWebGL2Support();
//     setIsIframeSupported(isSupported);
//     setTimeout(() => setLoading(false), 1000);

//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 100,
//         y: (e.clientY / window.innerHeight) * 100,
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const playStoreLink =
//     "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";
//   const appleStoreLink = "#";

//   return (
//     <div className="relative overflow-hidden bg-[#085056]">
//       {/* Main Hero Section */}
//       <div className="w-full min-h-screen relative ">
//         <div className="relative z-10 max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center w-full">
//             {/* Left Column – Content */}
//             <div className="space-y-6 sm:space-y-8 animate-fadeInUp text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1">
//               <div
//                 className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md border border-white/20 shadow-2xl mx-auto lg:mx-0 text-xs sm:text-sm"
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   boxShadow: "0 8px 32px rgba(78, 205, 196, 0.3)",
//                 }}
//               >
//                 <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white flex-shrink-0" />
//                 <span className="font-semibold text-white tracking-wider uppercase whitespace-nowrap">
//                   Secure Investment
//                 </span>
//               </div>

//               {/* Main Heading */}
//               <div className="space-y-4 sm:space-y-6">
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-yellow-400 leading-tight tracking-tight">
//                   Secure Your{" "}
//                   <span className="relative inline-block">
//                     <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-pulse">
//                       Financial
//                     </span>
//                     <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 rounded-full animate-pulse bg-gradient-to-r from-teal-400 to-cyan-400" />
//                   </span>{" "}
//                   Tomorrow
//                 </h2>

//                 <div className="relative group">
//                   <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-white mb-2">
//                     with{" "}
//                     <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
//                       Jaimax
//                     </span>
//                   </h2>
//                 </div>

//                 <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
//                   Begin your journey into the world of cryptocurrency investment
//                   with our{" "}
//                   <span className="font-semibold text-yellow-400">
//                     revolutionary Starter Investment plan
//                   </span>
//                   . Your gateway to financial freedom awaits.
//                 </p>
//               </div>

//               {/* Download Section */}
//               <div className="space-y-6 sm:space-y-8 pt-2 sm:pt-4">
//                 <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 flex-shrink-0">
//                     <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white animate-bounce" />
//                   </div>
//                   <div>
//                     <span className="block text-white font-bold tracking-widest text-xs sm:text-sm uppercase">
//                       Download Now
//                     </span>
//                     <span className="text-yellow-400 text-xs sm:text-sm">
//                       Available on all platforms
//                     </span>
//                   </div>
//                 </div>

//                 {/* Store Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6">
//                   {/* Google Play */}
//                   <a
//                     href={playStoreLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     title="Download Jaimax Coin app from Google Play Store"
//                     className="group w-full sm:w-40 md:w-44 lg:w-48 relative overflow-hidden rounded-xl p-1 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/40"
//                   >
//                     <div className="relative rounded-lg p-2 sm:p-3 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md bg-slate-800/60">
//                       <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
//                         <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0">
//                           <img
//                             src={playstore}
//                             alt="Google Play Store"
//                             title="Download from Google Play Store"
//                             className="w-full h-full rounded"
//                           />
//                         </div>
//                         <div className="text-left min-w-0">
//                           <div className="text-xs text-cyan-200">Get it Now</div>
//                           <div className="text-sm sm:text-base font-bold text-yellow-400 truncate">
//                             Google Play
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </a>

//                   {/* App Store */}
//                   <a
//                     href={appleStoreLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     title="Download Jaimax Coin app from Apple App Store"
//                     className="group w-full sm:w-40 md:w-44 lg:w-48 relative overflow-hidden rounded-xl p-1 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/40"
//                   >
//                     <div className="relative rounded-lg p-2 sm:p-3 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md bg-slate-800/60">
//                       <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
//                         <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0">
//                           <img
//                             src={applestore}
//                             alt="Apple App Store"
//                             title="Download from Apple App Store"
//                             className="w-full h-full rounded"
//                           />
//                         </div>
//                         <div className="text-left min-w-0">
//                           <div className="text-xs text-cyan-200">
//                             Coming Soon
//                           </div>
//                           <div className="text-sm sm:text-base font-bold text-yellow-400 truncate">
//                             App Store
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column – Visual */}
//             <div className="relative flex justify-center lg:justify-end animate-fadeInRight order-1 lg:order-2">
//               <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
//                 <img
//                   src={secureImg}
//                   alt="Secure Investment Illustration"
//                   title="Secure and Protected Investment Platform - Jaimax"
//                   className="w-full h-auto object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Second Section */}
//       <div className="w-full relative bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-600 min-h-[50vh] sm:min-h-[60vh]">
//         <div
//           className="relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 text-center"
//           style={{
//             backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${coinsmax}')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundAttachment: "scroll",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <div className="space-y-8 sm:space-y-12 lg:space-y-16 animate-fadeInUp">
//             <div className="relative inline-block group">
//               <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl mx-auto">
//                 <img
//                   src={icon}
//                   alt="3D Coin Icon"
//                   title="Jaimax Coin - Digital Currency for the Future"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>

//             <div className="space-y-4 sm:space-y-6">
//               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight px-4">
//                 Stay connected with us for
//               </h2>
//               <div className="relative inline-block group px-4">
//                 <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
//                   regular updates
//                 </span>
//               </div>
//             </div>

//             <div className="pt-6 sm:pt-8 lg:pt-12 flex justify-center px-4">
//               <button
//                 onClick={onClickNavigateToLogin}
//                 title="Join Jaimax - Start Your Crypto Journey Today"
//                 aria-label="Join the revolution and start investing"
//                 className="
//                   group relative flex items-center justify-center gap-2 sm:gap-3
//                   px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4
//                   rounded-full font-bold text-black text-sm sm:text-base lg:text-lg
//                   uppercase tracking-wide
//                   transition-all duration-500 transform
//                   hover:scale-105 hover:-translate-y-2
//                   shadow-2xl border-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-auto
//                   bg-[#b9cd27]
//                 "
//                 style={{
//                   boxShadow:
//                     "0 25px 50px rgba(78, 205, 196, 0.4), 0 0 0 1px rgba(78, 205, 196, 0.2)",
//                 }}
//               >
//                 <span className="truncate">Join the Revolution</span>
//                 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0" />

//                 {/* Active click effect */}
//                 <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-150 bg-white/20" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import coinsmax from "../../assets/Images/coinsmax.webp";
import icon from "../../assets/3dcoin.webp";
import playstore from "../../assets/Images/playStore.svg";
import secureImg from "../../assets/Images/3dsecure.webp";
import applestore from "../../assets/Images/appleStore.svg";
import React, { useState, useEffect } from "react";
import {
  Download,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeFooter() {
  const [isIframeSupported, setIsIframeSupported] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onClickNavigateToLogin = () => {
    navigate("/login");
  };

  const checkWebGL2Support = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    return !!gl;
  };

  useEffect(() => {
    const isSupported = checkWebGL2Support();
    setIsIframeSupported(isSupported);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";
  const appleStoreLink = "#";

  return (
    <div className="relative w-full overflow-hidden bg-[#085056]">
      {/* Main Hero Section */}
      <div className="w-full min-h-screen relative">
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center w-full">
            
            {/* Left Column – Content */}
            <div className="w-full space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              
              {/* Badge */}
              <div className="flex justify-center lg:justify-start">
                <div
                  className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md border border-white/20 shadow-2xl text-xs sm:text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(78, 205, 196, 0.3)",
                  }}
                >
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white flex-shrink-0" />
                  <span className="font-semibold text-white tracking-wider uppercase whitespace-nowrap">
                    Secure Investment
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-yellow-400 leading-tight tracking-tight">
                  Secure Your{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-pulse">
                      Financial
                    </span>
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 rounded-full animate-pulse bg-gradient-to-r from-teal-400 to-cyan-400" />
                  </span>{" "}
                  Tomorrow
                </h2>

                <div className="relative">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-white mb-2">
                    with{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      Jaimax
                    </span>
                  </h2>
                </div>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                  Begin your journey into the world of cryptocurrency investment
                  with our{" "}
                  <span className="font-semibold text-yellow-400">
                    revolutionary Starter Investment plan
                  </span>
                  . Your gateway to financial freedom awaits.
                </p>
              </div>

              {/* Download Section */}
              <div className="space-y-6 sm:space-y-8 pt-2 sm:pt-4">
                <div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 flex-shrink-0">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white animate-bounce" />
                  </div>
                  <div className="text-left">
                    <span className="block text-white font-bold tracking-widest text-xs sm:text-sm uppercase">
                      Download Now
                    </span>
                    <span className="text-yellow-400 text-xs sm:text-sm">
                      Available on all platforms
                    </span>
                  </div>
                </div>

                {/* Store Buttons */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6">
                  {/* Google Play */}
                  <a
                    href={playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download Jaimax Coin app from Google Play Store"
                    className="group w-full sm:w-auto relative overflow-hidden rounded-xl p-1 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/40"
                  >
                    <div className="relative rounded-lg p-2 sm:p-3 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md bg-slate-800/60">
                      <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0">
                          <img
                            src={playstore}
                            alt="Google Play Store"
                            title="Download from Google Play Store"
                            className="w-full h-full rounded"
                          />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs text-cyan-200">Get it Now</div>
                          <div className="text-sm sm:text-base font-bold text-yellow-400 truncate">
                            Google Play
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* App Store */}
                  <a
                    href={appleStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download Jaimax Coin app from Apple App Store"
                    className="group w-full sm:w-auto relative overflow-hidden rounded-xl p-1 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-r from-teal-400/30 to-cyan-400/40"
                  >
                    <div className="relative rounded-lg p-2 sm:p-3 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md bg-slate-800/60">
                      <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0">
                          <img
                            src={applestore}
                            alt="Apple App Store"
                            title="Download from Apple App Store"
                            className="w-full h-full rounded"
                          />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs text-cyan-200">
                            Coming Soon
                          </div>
                          <div className="text-sm sm:text-base font-bold text-yellow-400 truncate">
                            App Store
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column – Visual */}
            <div className="relative w-full flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                <img
                  src={secureImg}
                  alt="Secure Investment Illustration"
                  title="Secure and Protected Investment Platform - Jaimax"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      {/* <div className="w-full relative bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-600 min-h-[50vh] sm:min-h-[60vh]">
        <div
          className="relative z-10 w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${coinsmax}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
   
            <div className="flex justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-500 shadow-2xl">
                <img
                  src={icon}
                  alt="3D Coin Icon"
                  title="Jaimax Coin - Digital Currency for the Future"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

      
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight px-4">
                Stay connected with us for
              </h2>
              <div className="px-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                  regular updates
                </span>
              </div>
            </div>

      
            <div className="pt-6 sm:pt-8 lg:pt-12 flex justify-center px-4">
              <button
                onClick={onClickNavigateToLogin}
                title="Join Jaimax - Start Your Crypto Journey Today"
                aria-label="Join the revolution and start investing"
                className="
                  group relative flex items-center justify-center gap-2 sm:gap-3
                  px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5
                  rounded-full font-bold text-black text-sm sm:text-base lg:text-lg
                  uppercase tracking-wide
                  transition-all duration-500 transform
                  hover:scale-105 hover:-translate-y-2
                  shadow-2xl border-0
                  bg-[#b9cd27]
                "
                style={{
                  boxShadow:
                    "0 25px 50px rgba(78, 205, 196, 0.4), 0 0 0 1px rgba(78, 205, 196, 0.2)",
                }}
              >
                <span>Join the Revolution</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0" />
                <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-150 bg-white/20" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
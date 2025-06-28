import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Rocket, Sparkles, ArrowRight, Play, Apple, Waves, Shield, TrendingUp } from 'lucide-react';
import coinsmax from '../../assets/Images/coinsmax.png';
import icon from "../../assets/3dcoin.png"
import playstore from '../../assets/Images/playStore.svg'
import secureImg from "../../assets/Images/3dsecure.png"
import applestore from '../../assets/Images/appleStore.svg'
import { useNavigate } from 'react-router-dom';
export default function HomeFooter() {
  const [isIframeSupported, setIsIframeSupported] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate()

  const onClickNavigateToLogin = () => {
    navigate("/register")
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

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const playStoreLink = "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax";
  const appleStoreLink = "#";

  return (
    <div className="relative overflow-hidden">
      {/* Main Hero Section */}
      <div
        className="w-full min-h-screen relative"
        style={{
          // background: loading ? '#666' : 'linear-gradient(135deg, #094e54, #4ecdc4)',
        }}
      >
    

  <div className="relative z-10 max-w-8xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
    {/* Left Column – Content */}
    <div className="space-y-8 animate-fadeInUp text-center lg:text-left mx-auto lg:mx-0">
      <div
        className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md border border-white/20 shadow-2xl mx-auto lg:mx-0"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(78, 205, 196, 0.3)",
        }}
      >
        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        <span className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
          Secure Investment
        </span>
      </div>

      {/* Main Heading */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-[#bace27] leading-tight tracking-tight">
          Secure Your{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Financial
            </span>
            <div
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full animate-pulse"
              style={{
                background: "linear-gradient(90deg, #4ecdc4, #26a69a, #4ecdc4)",
              }}
            />
          </span>{" "}
          Tomorrow
        </h1>

        <div className="relative group">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-2">
            with{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(45deg, #4ecdc4, #26a69a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Jaimax
            </span>
          </h2>
          <div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
            style={{
              background:
                "linear-gradient(45deg, rgba(78, 205, 196, 0.3), rgba(38, 166, 154, 0.3))",
            }}
          />
        </div>

        <p className="text-base sm:text-xl lg:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
          Begin your journey into the world of cryptocurrency investment with our{" "}
          <span className="font-semibold text-[#bace27]">
            revolutionary Starter Investment plan
          </span>
          . Your gateway to financial freedom awaits.
        </p>
      </div>

      {/* Download Section */}
      <div className="space-y-8 pt-4">
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(45deg, #4ecdc4, #26a69a)",
            }}
          >
            <Download className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div>
            <span className="block text-white font-bold tracking-widest text-xs sm:text-sm uppercase">
              Download Now
            </span>
            <span className="text-[#bace27] text-xs sm:text-sm">Available on all platforms</span>
          </div>
        </div>

        {/* Store Buttons */}
      {/* Store Buttons */}
<div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
  {/* Google Play */}
  <a
    href={playStoreLink}
    target="_blank"
    rel="noopener noreferrer"
    className="group w-40 sm:w-48 relative overflow-hidden rounded-xl p-1 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
    style={{
      background:
        "linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(38, 166, 154, 0.4))",
    }}
  >
    <div
      className="relative rounded-lg p-3 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md"
      style={{ background: "rgba(9, 78, 84, 0.6)" }}
    >
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <div className="w-8 h-8 sm:w-10 sm:h-10">
          <img src={playstore} alt="Google Play" className="w-full h-full" />
        </div>
        <div className="text-left">
          <div className="text-xs text-cyan-200">Get it on</div>
          <div className="text-sm sm:text-base font-bold text-[#bace27]">Google Play</div>
        </div>
      </div>
    </div>
  </a>

  {/* App Store */}
  <a
    href={appleStoreLink}
    target="_blank"
    rel="noopener noreferrer"
    className="group w-40 sm:w-48 relative overflow-hidden rounded-xl p-1 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
    style={{
      background:
        "linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(38, 166, 154, 0.4))",
    }}
  >
    <div
      className="relative rounded-lg p-3 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md"
      style={{ background: "rgba(9, 78, 84, 0.6)" }}
    >
      <div className="flex items-center gap-3 justify-center sm:justify-start">
        <div className="w-8 h-8 sm:w-10 sm:h-10">
          <img src={applestore} alt="App Store" className="w-full h-full" />
        </div>
        <div className="text-left">
          <div className="text-xs text-cyan-200">Download on</div>
          <div className="text-sm sm:text-base font-bold text-[#bace27]">App Store</div>
        </div>
      </div>
    </div>
  </a>
</div>

      </div>
    </div>

    {/* Right Column – Visual */}
    <div className="relative flex justify-center lg:justify-end animate-fadeInRight">
      <img
        src={secureImg}
        alt="Secure"
        className="w-full max-w-[80%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      />
    </div>
  </div>
</div>

      </div>
      <div
        className="w-full relative"
        style={{
          background: loading ? '#666' : 'linear-gradient(135deg, #094e54, #4ecdc4)',
          minHeight: '60vh'
        }}
      >
        <div className="relative z-10 container mx-auto px-6 py-24 text-center" style={{
          backgroundImage: `url('${coinsmax}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundBlendMode: 'multiply',


          width: '100%', height: '100%'
        }}>
          <div className="space-y-16 animate-fadeInUp">
            <div className="relative inline-block group" >
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center  group-hover:scale-110 transition-all duration-500 shadow-2xl"
              >
                <img src={icon} alt="" width={500} height={500} />

              </div>

            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Stay connected with us for
              </h2>
              <div className="relative inline-block group">
                <span
                  className="text-4xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
                >
                  regular updates
                </span>
              </div>
            </div>
            <div className="pt-12 flex justify-center px-4">
      <button
        onClick={onClickNavigateToLogin}
        className="
          group relative flex items-center justify-center gap-3
          px-6 py-3 sm:px-8 sm:py-4
          rounded-full font-bold text-white text-sm sm:text-base md:text-lg
          uppercase tracking-wide
          transition-all duration-500 transform
          hover:scale-105 hover:-translate-y-2
          shadow-2xl border-0
        "
        style={{
          background: "linear-gradient(135deg, #bace27, rgb(202, 211, 130))",
          boxShadow:
            "0 25px 50px rgba(78, 205, 196, 0.4), 0 0 0 1px rgba(78, 205, 196, 0.2)",
          "--tw-ring-color": "#094e54",
        }}
      >
        Join the Revolution
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-2" />

        {/* Active click effect */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-150"
          style={{ background: "rgba(255, 255, 255, 0.2)" }}
        />
      </button>
    </div>
          </div>
        </div>
      </div>


    </div>
  );
}
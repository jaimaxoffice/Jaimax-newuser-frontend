// Hero.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from "react-router-dom";
import Coin3D from './3dcoin';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const coinContainerRef = useRef(null);
  return (
    <div 
      ref={heroRef} 
      className="h-screen  flex items-center relative overflow-hidden max-w-8xl"
      style={{
        background: "linear-gradient(to bottom, #115e59, #0d9488)"
      }}
    >
      {/* Left Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center">
          <h1
            ref={titleRef}
            className="font-bold leading-tight text-white"
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#b8cc26]">
              <a href="https://www.jaimax.com/best-presale-crypto-coin-in-india" className="hover:underline">
                Best Pre-Sale
              </a>
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Crypto Coin in India</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Invest Early in </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Jaimax</span>
          </h1> 
          
          <p
            ref={descriptionRef}
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl
                    font-medium max-w-xl mt-8"
          >
            Our advanced platform simplifies your pre-sale crypto investment
            journey, offering a secure and transparent experience to help
            you grow with India's most trusted
            <b className="text-[#aadc32]">
              <a href="https://www.jaimax.com/best-presale-crypto-coin-in-india" className="hover:underline"> pre-sale crypto coin</a>
            </b>{" "}
            - jaimax.
          </p>
          
          <button
            ref={buttonRef}
            type="button"
            onClick={() => navigate("/login")}
            aria-label="Start building your crypto investment"
            className="mt-8 w-fit font-bold text-center
                     bg-gradient-to-r from-[#8ee000] via-[#aadc32] to-[#c3f23f]
                     text-[#0f1c14] shadow-xl text-sm sm:text-base md:text-lg
                     rounded-full hover:scale-105 active:scale-95
                     transition-transform duration-300 px-6 py-3"
          >
            Join Jaimax Pre-Sale
          </button>
        </div>
        
        {/* Right Side - 3D Coin */}
        <div ref={coinContainerRef} className="flex items-center justify-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 cursor-pointer">
            <Coin3D 
              className="w-full h-full" 
              rotationSpeed={0.8}
              orbit={true}
              edgeColor="#b8cc26"
              ambientColor="#aadc32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


import React, { useState, useEffect } from 'react';
import icon from "../assets/3djaimax3.jpg";
const JaimaxSplash = () => {
  const [phase, setPhase] = useState('initial');

  useEffect(() => {
    const timeline = [
      { delay: 90, phase: 'split' },
      { delay: 700, phase: 'textReveal' },
      { delay: 1800, phase: 'sectionsComplete' },
      { delay: 2000, phase: 'logoBlur' },
      { delay: 3000, phase: 'settled' }
    ];
    timeline.forEach(({ delay, phase: nextPhase }) => {
      setTimeout(() => setPhase(nextPhase), delay);
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
      {(phase === 'logoBlur' || phase === 'settled') && (
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${icon})`,
            filter: 'brightness(0.5)',
            opacity: 1
          }}
        />
      )}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1/2 flex items-center justify-center transition-all duration-1000 ease-in-out z-20 ${
          phase === 'initial'
            ? 'transform -translate-y-full'
            : phase === 'sectionsComplete' || phase === 'logoBlur' || phase === 'settled'
            ? 'opacity-0 transform -translate-y-full'
            : 'transform translate-y-0 opacity-100'
        }`}
        style={{ background: 'linear-gradient(45deg, #0f172a, #195f64, #c2d52c)' }}
      >
        <div
          className={`text-center transition-all duration-800 delay-200 ease-out ${
            phase === 'textReveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">SECURE</h2>
            <h2 className="text-5xl font-bold text-white">DATA</h2>
          </div>
          <p className="text-cyan-300 text-lg font-light">End-to-end encryption</p>
          <p className="text-cyan-300 text-lg font-light">Zero-knowledge architecture</p>
          <div className="flex justify-center mt-6 space-x-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-8 bg-cyan-400 opacity-60 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 w-1/2 flex items-center justify-center transition-all duration-800 ease-in-out z-20 ${
          phase === 'initial'
            ? 'translate-x-full'
            : phase === 'sectionsComplete' || phase === 'logoBlur' || phase === 'settled'
            ? 'opacity-0 translate-x-full'
            : 'translate-x-0 opacity-100'
        }`}
        style={{ background: 'linear-gradient(45deg, #1a1a1a, #1d974a, #195f64)' }}
      >
        <div
          className={`text-center transition-all duration-600 delay-300 ease-out ${
            phase === 'textReveal' || phase === 'logoBlur' || phase === 'settled'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-6'
          }`}
        >
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-16 h-16 border-2 border-orange-400 rounded-full flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">GREAT</h2>
            <h2 className="text-5xl font-bold text-white">FUTURE</h2>
          </div>
          <p className="text-orange-300 text-lg font-light">AI-powered trading</p>
          <p className="text-orange-300 text-lg font-light">Next-gen blockchain</p>
          <div className="mt-6">
            <div className="w-40 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white to-transparent transition-all duration-800 ease-in-out z-30 ${
          phase === 'split' || phase === 'textReveal' ? 'opacity-60 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
      ></div>
      <div
        className={`absolute inset-0 flex items-center justify-center z-40 transition-all duration-800 ease-out ${
          phase === 'logoBlur' || phase === 'settled' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center">
 
          <h1
            className={`text-9xl font-black transition-all duration-800 ease-out ${
              phase === 'logoBlur'
                ? 'blur-lg scale-95'
                : phase === 'settled'
                ? 'blur-none scale-100'
                : 'blur-xl scale-90'
            }`}
            style={{
              textShadow:
                phase === 'settled'
                  ? '0 0 20px rgba(41, 185, 84, 0.3), 0 0 40px rgba(52, 143, 79, 0.1)'
                  : '0 0 60px #bace27',
              color: phase === 'settled' ? '#ffffff' : 'transparent',
              background:
                phase === 'logoBlur'
                  ? 'linear-gradient(45deg, #ffffff, #e5e5e5)'
                  : 'none',
              backgroundClip: phase === 'logoBlur' ? 'text' : 'initial',
              WebkitBackgroundClip: phase === 'logoBlur' ? 'text' : 'initial',
              filter: phase === 'settled' ? 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' : 'none',
            }}
          >
            JAIMAX
          </h1>
          <div
            className={`mt-6 transition-all duration-1000 delay-300 ease-out ${
              phase === 'settled' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-gray-300 text-xl font-light tracking-widest">
              WHERE SECURITY MEETS INNOVATION
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4 opacity-50"></div>
          </div>
        </div>
      </div>
      {(phase === 'logoBlur' || phase === 'settled') && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-30 ${
                i % 3 === 0
                  ? 'w-1 h-1 bg-cyan-400'
                  : i % 3 === 1
                  ? 'w-2 h-2 bg-white'
                  : 'w-1.5 h-1.5 bg-orange-400'
              }`}
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default JaimaxSplash;






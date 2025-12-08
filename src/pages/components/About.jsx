// About.js
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
  const [copied, setCopied] = useState(false);
  
  const aboutRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const contractRef = useRef(null);
  const statsItemsRef = useRef([]);

  // Add to statsItemsRef
  const addToStatsRef = (el) => {
    if (el && !statsItemsRef.current.includes(el)) {
      statsItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Ensure ScrollTrigger is registered
    if (!ScrollTrigger) {
      console.error("ScrollTrigger not registered");
      return;
    }

    // Force a ScrollTrigger refresh to ensure proper positioning
    ScrollTrigger.refresh();
    
    let ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Content animation
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Stats items animation
      statsItemsRef.current.forEach((item, index) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      
      // Contract section animation
      gsap.fromTo(contractRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contractRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, aboutRef);
    
    return () => {
      ctx.revert(); // Clean up all animations when component unmounts
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Failed to copy
    }
  };

  return (
    <div id="about" ref={aboutRef} className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 ref={headingRef} className="text-4xl font-bold text-center text-teal-800 mb-8 opacity-0">
          About Jaimax
          <span className="block w-20 h-1 bg-teal-500 mx-auto mt-4"></span>
        </h2>
        
        <div ref={contentRef} className="text-center mb-16 opacity-0">
          <p className="text-xl text-teal-700 max-w-3xl mx-auto">
            India's most trusted pre-sale cryptocurrency platform. We provide secure, transparent, 
            and accessible crypto investment opportunities for everyone.
          </p>
        </div>
        
        {/* Stats section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div ref={addToStatsRef} className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg shadow-lg p-8 text-center opacity-0">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-3">Live Price</h3>
            <p className="text-teal-700 text-3xl font-bold">₹0.0000</p>
          </div>
          
          <div ref={addToStatsRef} className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg shadow-lg p-8 text-center opacity-0">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7H7v6h6V7z"></path>
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-3">Tokens Sold</h3>
            <p className="text-teal-700 text-3xl font-bold">225.8M+</p>
          </div>
          
          <div ref={addToStatsRef} className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg shadow-lg p-8 text-center opacity-0">
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-3">Active Members</h3>
            <p className="text-teal-700 text-3xl font-bold">24.6K+</p>
          </div>
        </div>
        
        {/* Contract Section */}
        <div ref={contractRef} className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 rounded-lg border border-teal-200 mb-16 opacity-0">
          <h3 className="text-2xl font-semibold text-teal-800 mb-6">Contract Address</h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white p-4 rounded text-teal-700 border border-teal-200 flex-1 overflow-x-auto">
              <code>{contractAddress}</code>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button 
                onClick={() => window.open(`https://bscscan.com/address/${contractAddress}`, "_blank")}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded transition"
              >
                View on BSCScan
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
// TokenomicsSection.js
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TokenomicsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const chartRef = useRef(null);
  const tokenInfoRef = useRef(null);
  const segmentsRef = useRef([]);
  const bgRef = useRef(null);
  const [activeSegment, setActiveSegment] = useState(null);
  
  // Add to segments ref
  const addToSegmentsRef = (el) => {
    if (el && !segmentsRef.current.includes(el)) {
      segmentsRef.current.push(el);
    }
  };
  
  // Tokenomics data
  const tokenomicsData = [
    {
      id: 'presale',
      name: 'Public Presale',
      percentage: 40,
      amount: '400,000,000',
      color: '#0D9488', // teal-600
      description: 'Allocated for the 5-phase presale events. These tokens are offered to early investors at favorable rates, with prices increasing across phases.'
    },
    {
      id: 'liquidity',
      name: 'Liquidity Pool',
      percentage: 20,
      amount: '200,000,000',
      color: '#14B8A6', // teal-500
      description: 'Reserved for providing trading liquidity on exchanges. These tokens are locked to ensure stable trading with minimal slippage and price volatility.'
    },
    {
      id: 'team',
      name: 'Team & Advisors',
      percentage: 15,
      amount: '150,000,000',
      color: '#2DD4BF', // teal-400
      description: 'Allocated to the founding team and advisors with a 2-year vesting period and 6-month cliff to ensure long-term commitment to the project.'
    },
    {
      id: 'marketing',
      name: 'Marketing & Partnerships',
      percentage: 10,
      amount: '100,000,000',
      color: '#5EEAD4', // teal-300
      description: 'Used for marketing campaigns, strategic partnerships, listings, and promotional activities to increase project visibility and user adoption.'
    },
    {
      id: 'ecosystem',
      name: 'Ecosystem Development',
      percentage: 10,
      amount: '100,000,000',
      color: '#99F6E4', // teal-200
      description: 'Dedicated to platform development, feature enhancements, security audits, and technological improvements of the Jaimax ecosystem.'
    },
    {
      id: 'reserve',
      name: 'Reserve Fund',
      percentage: 5,
      amount: '50,000,000',
      color: '#B8CC26', // lime accent color
      description: 'Strategic reserve for unforeseen circumstances, market operations, and future expansion opportunities. Controlled by governance votes.'
    }
  ];
  
  // Token details
  const tokenInfo = {
    name: 'Jaimax Token',
    symbol: 'JMX',
    totalSupply: '1,000,000,000',
    type: 'BEP-20 (Binance Smart Chain)',
    decimal: '18',
    initialPrice: '₹0.015',
    listingPrice: '₹0.080',
    expectedROI: '~430%'
  };
  
  useEffect(() => {
    // Reset refs
    segmentsRef.current = [];
    
    let ctx = gsap.context(() => {
      // Background parallax effect
      gsap.to(bgRef.current, {
        y: '-20%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Heading animation
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
      
      // Chart animation
      gsap.fromTo(chartRef.current,
        { opacity: 0, scale: 0.8, rotation: -30 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.3
        }
      );
      
      // Pie segments animation
      const segments = chartRef.current.querySelectorAll('.pie-segment');
      segments.forEach((segment, index) => {
        gsap.fromTo(segment,
          { scale: 0, transformOrigin: 'center' },
          {
            scale: 1,
            duration: 0.5,
            delay: 0.5 + (index * 0.1),
            ease: "back.out(1.7)"
          }
        );
      });
      
      // Token info animation
      gsap.fromTo(tokenInfoRef.current,
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          delay: 0.5
        }
      );
      
      // Segments animation
      setTimeout(() => {
        gsap.fromTo(segmentsRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1,
            duration: 0.5
          }
        );
      }, 800);
      
      // Continuous rotation animation for the chart
      gsap.to(chartRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none"
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  // Handle segment hover
  const handleSegmentHover = (id) => {
    setActiveSegment(id);
    
    // Animate the segments
    segmentsRef.current.forEach((segment, index) => {
      if (tokenomicsData[index].id === id) {
        gsap.to(segment, {
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3
        });
      } else {
        gsap.to(segment, {
          scale: 1,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          duration: 0.3
        });
      }
    });
    
    // Animate the pie chart segments
    const pieSegments = document.querySelectorAll('.pie-segment');
    pieSegments.forEach(segment => {
      if (segment.getAttribute('data-id') === id) {
        gsap.to(segment, {
          scale: 1.05,
          transformOrigin: 'center',
          duration: 0.3
        });
      } else {
        gsap.to(segment, {
          scale: 1,
          transformOrigin: 'center',
          duration: 0.3
        });
      }
    });
  };
  
  // Handle segment leave
  const handleSegmentLeave = () => {
    setActiveSegment(null);
    
    // Reset all segments
    segmentsRef.current.forEach(segment => {
      gsap.to(segment, {
        scale: 1,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        duration: 0.3
      });
    });
    
    // Reset pie chart segments
    const pieSegments = document.querySelectorAll('.pie-segment');
    pieSegments.forEach(segment => {
      gsap.to(segment, {
        scale: 1,
        transformOrigin: 'center',
        duration: 0.3
      });
    });
  };

  return (
    <div ref={sectionRef} className="min-h-screen h-full w-full flex items-center relative overflow-hidden py-12">
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
          alt="Abstract finance background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/80"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <h2 ref={headingRef} className="text-4xl font-bold text-center text-teal-800 mb-12" style={{opacity: 1}}>
          Tokenomics
          <span className="block w-24 h-1 bg-teal-500 mx-auto mt-4"></span>
        </h2>
        
        {/* Token Supply Overview */}
        <div className="text-center mb-16">
          <div className="inline-block bg-teal-800 text-white rounded-full px-8 py-3 mb-4 shadow-lg">
            <span className="text-2xl font-bold">Total Supply: {tokenInfo.totalSupply} {tokenInfo.symbol}</span>
          </div>
          <p className="text-lg text-teal-700 max-w-3xl mx-auto">
            The Jaimax token ({tokenInfo.symbol}) is designed with a balanced distribution model to ensure long-term sustainability, 
            fair participation, and incentives aligned with platform growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Pie Chart Column */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div ref={chartRef} className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* SVG Pie Chart */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Creating a donut chart with SVG */}
                <circle cx="50" cy="50" r="40" fill="white" />
                
                {tokenomicsData.map((segment, index) => {
                  // Calculate SVG arc parameters
                  const startAngle = tokenomicsData.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0) * 3.6; // 3.6 degrees per percentage point
                  const endAngle = startAngle + segment.percentage * 3.6;
                  
                  // Convert angles to radians for SVG arc
                  const startRad = (startAngle - 90) * Math.PI / 180; // -90 to start from top
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  // Calculate path coordinates
                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);
                  
                  // Create SVG arc path
                  const largeArcFlag = segment.percentage > 50 ? 1 : 0;
                  const pathData = `
                    M 50 50
                    L ${x1} ${y1}
                    A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
                    Z
                  `;
                  
                  return (
                    <path
                      key={segment.id}
                      className="pie-segment"
                      data-id={segment.id}
                      d={pathData}
                      fill={segment.color}
                      stroke="white"
                      strokeWidth="1"
                      onMouseEnter={() => handleSegmentHover(segment.id)}
                      onMouseLeave={handleSegmentLeave}
                    />
                  );
                })}
                
                {/* Center circle for donut effect */}
                <circle cx="50" cy="50" r="25" fill="white" />
                
                {/* Center text */}
                <text x="50" y="45" textAnchor="middle" fill="#0D9488" fontSize="6" fontWeight="bold">JMX</text>
                <text x="50" y="55" textAnchor="middle" fill="#0D9488" fontSize="5">TOKEN</text>
              </svg>
            </div>
            
            {/* Token Info Card */}
            <div ref={tokenInfoRef} className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 mt-8 w-full">
              <h3 className="text-xl font-bold text-teal-800 mb-4 text-center">Token Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-teal-100 pb-2">
                  <span className="text-teal-600">Token Name:</span>
                  <span className="font-medium">{tokenInfo.name}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-teal-100 pb-2">
                  <span className="text-teal-600">Symbol:</span>
                  <span className="font-medium">{tokenInfo.symbol}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-teal-100 pb-2">
                  <span className="text-teal-600">Type:</span>
                  <span className="font-medium">{tokenInfo.type}</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-teal-100 pb-2">
                  <span className="text-teal-600">Initial Price:</span>
                  <span className="font-medium">{tokenInfo.initialPrice}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-teal-600">Listing Price:</span>
                  <span className="font-medium">{tokenInfo.listingPrice}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Token Distribution Details */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {tokenomicsData.map((segment, index) => (
                <div
                  key={segment.id}
                  ref={addToSegmentsRef}
                  className={`bg-white/70 backdrop-blur-sm rounded-lg shadow-md p-5 transition-all duration-300 border-l-4
                    ${activeSegment === segment.id ? 'scale-105' : ''}
                  `}
                  style={{
                    borderLeftColor: segment.color
                  }}
                  onMouseEnter={() => handleSegmentHover(segment.id)}
                  onMouseLeave={handleSegmentLeave}
                >
                  <div className="flex flex-wrap justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-teal-800">{segment.name}</h3>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: segment.color }}></div>
                      <span className="text-2xl font-bold text-teal-800">{segment.percentage}%</span>
                    </div>
                  </div>
                  
                  <p className="text-teal-600 mb-2">
                    <span className="font-medium">{segment.amount}</span> tokens
                  </p>
                  
                  <p className="text-teal-700">{segment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsSection;
// PresalePhases.js
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PresalePhases = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const phasesRef = useRef([]);
  const [activeTab, setActiveTab] = useState(3); // Default to the current phase (3)
  
  const addToPhaseRefs = (el) => {
    if (el && !phasesRef.current.includes(el)) {
      phasesRef.current.push(el);
    }
  };
  
  // Presale phase data
  const phases = [
    {
      number: 1,
      name: "Early Adopter Round",
      price: "₹0.015",
      allocation: "50M JMX",
      dates: "Jun 15 - Jul 15, 2023",
      status: "Completed",
      bonus: "30% bonus tokens",
      percentComplete: 100
    },
    {
      number: 2,
      name: "Seed Round",
      price: "₹0.025",
      allocation: "75M JMX",
      dates: "Aug 1 - Sep 15, 2023",
      status: "Completed",
      bonus: "20% bonus tokens",
      percentComplete: 100
    },
    {
      number: 3,
      name: "Private Sale",
      price: "₹0.035",
      allocation: "100M JMX",
      dates: "Oct 1 - Dec 15, 2023",
      status: "Active",
      bonus: "10% bonus tokens",
      percentComplete: 72
    },
    {
      number: 4,
      name: "Pre-listing",
      price: "₹0.045",
      allocation: "100M JMX",
      dates: "Jan 5 - Mar 15, 2024",
      status: "Upcoming",
      bonus: "5% bonus tokens",
      percentComplete: 0
    },
    {
      number: 5,
      name: "Final Round",
      price: "₹0.060",
      allocation: "75M JMX",
      dates: "Apr 1 - May 15, 2024",
      status: "Upcoming",
      bonus: "No bonus",
      percentComplete: 0
    }
  ];
  
  useEffect(() => {
    // Reset phases ref array
    phasesRef.current = [];
    
    let ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
      
      // Timeline animation
      gsap.fromTo(timelineRef.current,
        { opacity: 0, width: 0 },
        { 
          opacity: 1, 
          width: '100%', 
          duration: 1.5, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );
      
      // Phase dots animation
      gsap.fromTo(phasesRef.current,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          },
          onComplete: () => {
            // Animate the active phase
            if (phasesRef.current[activeTab-1]) {
              gsap.to(phasesRef.current[activeTab-1], {
                scale: 1.2,
                duration: 0.3
              });
            }
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, [activeTab]);

  const handleTabChange = (phaseNumber) => {
    // Animate the previously active tab back to normal
    if (phasesRef.current[activeTab-1]) {
      gsap.to(phasesRef.current[activeTab-1], {
        scale: 1,
        duration: 0.3
      });
    }
    
    // Set new active tab
    setActiveTab(phaseNumber);
    
    // Animate the new active tab
    if (phasesRef.current[phaseNumber-1]) {
      gsap.to(phasesRef.current[phaseNumber-1], {
        scale: 1.2,
        duration: 0.3
      });
    }
  };
  
  // Get current phase data
  const currentPhase = phases.find(phase => phase.number === activeTab);
  
  return (
    <div ref={sectionRef} className="py-24 px-4 bg-white/50 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 ref={headingRef} className="text-4xl font-bold text-center mb-16" style={{opacity: 1}}>
          Presale Phases
          <span className="block w-24 h-1 bg-[#b8cc26] mx-auto mt-4"></span>
        </h2>
        
        {/* Timeline UI */}
        <div className="mb-16 relative">
          {/* Main timeline */}
          <div ref={timelineRef} className="h-2 bg-teal-600 rounded-full relative mx-auto mb-2"></div>
          
          {/* Phase dots */}
          <div className="flex justify-between items-center relative">
            {phases.map((phase, index) => {
              const isActive = phase.number === activeTab;
              const isCompleted = phase.number < activeTab;
              const isUpcoming = phase.number > activeTab;
              
              return (
                <div key={index} className="flex flex-col items-center relative w-full">
                  {/* Phase dot */}
                  <div 
                    ref={addToPhaseRefs}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10 border-4 transition-all duration-300 ease-in-out
                      ${isActive ? 'border-[#b8cc26] bg-[#b8cc26]' : 
                        isCompleted ? 'border-teal-300 bg-teal-300' : 
                        'border-teal-700 bg-teal-700'}
                    `}
                    onClick={() => handleTabChange(phase.number)}
                  >
                    <span className={`font-bold ${isActive ? 'text-teal-900' : isCompleted ? 'text-teal-900' : 'text-white'}`}>
                      {phase.number}
                    </span>
                  </div>
                  
                  {/* Phase label */}
                  <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    <p className="text-center text-sm md:text-base">{phase.name}</p>
                    <p className="text-center text-xs text-teal-300">{phase.dates}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Phase details card */}
        <div className="bg-teal-800 rounded-2xl p-8 shadow-2xl border border-teal-700 max-w-3xl mx-auto transform transition-all duration-500">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2 text-[#b8cc26]">
                Phase {currentPhase.number}: {currentPhase.name}
              </h3>
              
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-teal-300">Token Price:</span>
                  <span className="text-xl font-bold">{currentPhase.price}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-teal-300">Total Allocation:</span>
                  <span className="text-xl font-bold">{currentPhase.allocation}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-teal-300">Bonus:</span>
                  <span className="text-xl font-bold">{currentPhase.bonus}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-teal-300">Status:</span>
                  <span className={`text-xl font-bold ${
                    currentPhase.status === 'Active' ? 'text-[#b8cc26]' : 
                    currentPhase.status === 'Completed' ? 'text-teal-300' : 
                    'text-teal-500'
                  }`}>
                    {currentPhase.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex flex-col justify-center">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-teal-300">Progress</span>
                  <span className="font-bold">{currentPhase.percentComplete}%</span>
                </div>
                <div className="h-4 bg-teal-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8ee000] to-[#b8cc26] rounded-full"
                    style={{ width: `${currentPhase.percentComplete}%` }}
                  ></div>
                </div>
                
                {currentPhase.status === 'Active' && (
                  <button className="mt-8 w-full bg-gradient-to-r from-[#8ee000] to-[#b8cc26] text-teal-900 font-bold py-3 px-6 rounded-full text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Join This Phase Now
                  </button>
                )}
                
                {currentPhase.status === 'Upcoming' && (
                  <button className="mt-8 w-full bg-teal-700 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-teal-600 transition-all duration-300">
                    Get Notified
                  </button>
                )}
                
                {currentPhase.status === 'Completed' && (
                  <div className="mt-8 bg-teal-700 rounded-lg p-4 text-center">
                    <p className="text-teal-300 font-medium">This phase is completed.</p>
                    <p className="text-sm text-teal-400 mt-1">Check current active phase for investment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional information */}
        <div className="mt-16 text-center">
          <p className="text-teal-300 max-w-3xl mx-auto">
            Our phased presale approach ensures fair distribution of tokens and steady growth in token value. 
            Each phase offers a different entry price, allowing early investors to benefit from the best rates.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-teal-800 rounded-lg p-4 border border-teal-700">
              <p className="text-sm text-teal-300">Total Presale Allocation</p>
              <p className="text-2xl font-bold text-white">400M JMX</p>
            </div>
            
            <div className="bg-teal-800 rounded-lg p-4 border border-teal-700">
              <p className="text-sm text-teal-300">Price Increase</p>
              <p className="text-2xl font-bold text-white">300%</p>
            </div>
            
            <div className="bg-teal-800 rounded-lg p-4 border border-teal-700">
              <p className="text-sm text-teal-300">Token Listing Price</p>
              <p className="text-2xl font-bold text-white">₹0.080</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresalePhases;
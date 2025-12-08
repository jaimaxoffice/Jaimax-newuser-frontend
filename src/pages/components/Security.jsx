// SecuritySection.js
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const layersRef = useRef(null);
  const featuresRef = useRef([]);
  const shieldRef = useRef(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  const addToFeaturesRef = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };
  
  // Security features data
  const securityFeatures = [
    {
      id: 1,
      name: "Multi-Signature Wallets",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "All funds require multiple signatures for withdrawal, preventing single-point vulnerabilities and ensuring no individual can access funds alone."
    },
    {
      id: 2,
      name: "Cold Storage",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
        </svg>
      ),
      description: "95% of all assets are stored offline in cold wallets, physically isolated from the internet, making them inaccessible to hackers."
    },
    {
      id: 3,
      name: "Smart Contract Audits",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "Our contracts undergo rigorous auditing by leading security firms including CertiK and Hacken to identify and resolve vulnerabilities."
    },
    {
      id: 4,
      name: "KYC/AML Compliance",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "Strict identity verification protocols and anti-money laundering measures ensure a secure and compliant trading environment."
    },
    {
      id: 5,
      name: "Two-Factor Authentication",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
        </svg>
      ),
      description: "Mandatory 2FA protects all accounts, requiring a second verification step beyond passwords to prevent unauthorized access."
    },
    {
      id: 6,
      name: "Real-time Monitoring",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
        </svg>
      ),
      description: "24/7 surveillance by our security team and AI systems detect suspicious activities and prevent potential threats in real-time."
    }
  ];
  
  useEffect(() => {
    // Reset refs
    featuresRef.current = [];
    
    let ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Shield animation
      gsap.fromTo(shieldRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );
      
      // Security layers animation
      gsap.fromTo(layersRef.current.children,
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: layersRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Features animation - staggered entries
      setTimeout(() => {
        gsap.fromTo(featuresRef.current,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%"
            }
          }
        );
      }, 300);
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const handleFeatureHover = (id) => {
    setHoveredFeature(id);
    
    // Animate the corresponding security layer
    const layerElements = layersRef.current.children;
    for (let i = 0; i < layerElements.length; i++) {
      if (i === id - 1) {
        gsap.to(layerElements[i], {
          scale: 1.1,
          opacity: 1,
          duration: 0.3
        });
      } else {
        gsap.to(layerElements[i], {
          scale: 0.95,
          opacity: 0.6,
          duration: 0.3
        });
      }
    }
  };
  
  const handleFeatureLeave = () => {
    setHoveredFeature(null);
    
    // Reset all layers
    const layerElements = layersRef.current.children;
    for (let i = 0; i < layerElements.length; i++) {
      gsap.to(layerElements[i], {
        scale: 1,
        opacity: 1,
        duration: 0.3
      });
    }
  };

  return (
    <div ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 ref={headingRef} className="text-4xl font-bold text-center text-teal-800 mb-4" style={{opacity: 1}}>
          Bank-Grade Security
          <span className="block w-24 h-1 bg-teal-500 mx-auto mt-4"></span>
        </h2>
        
        <p className="text-xl text-teal-700 text-center max-w-3xl mx-auto mb-16">
          Your assets are protected by multiple layers of cutting-edge security
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Visual security layers representation */}
          <div className="lg:w-1/2 relative flex justify-center">
            {/* Shield background */}
            <div ref={shieldRef} className="relative w-64 h-80 md:w-80 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-b from-teal-600 to-teal-800 rounded-t-full rounded-b-lg opacity-20"></div>
              
              {/* Concentric security layers */}
              <div ref={layersRef} className="absolute inset-0 flex items-center justify-center">
                {/* Layer 6 - outermost */}
                <div className="absolute w-[95%] h-[92%] rounded-t-full rounded-b-lg border-4 border-teal-200 opacity-30"></div>
                
                {/* Layer 5 */}
                <div className="absolute w-[85%] h-[85%] rounded-t-full rounded-b-lg border-4 border-teal-300 opacity-40"></div>
                
                {/* Layer 4 */}
                <div className="absolute w-[75%] h-[78%] rounded-t-full rounded-b-lg border-4 border-teal-400 opacity-50"></div>
                
                {/* Layer 3 */}
                <div className="absolute w-[65%] h-[70%] rounded-t-full rounded-b-lg border-4 border-teal-500 opacity-60"></div>
                
                {/* Layer 2 */}
                <div className="absolute w-[55%] h-[62%] rounded-t-full rounded-b-lg border-4 border-teal-600 opacity-70"></div>
                
                {/* Layer 1 - innermost */}
                <div className="absolute w-[45%] h-[54%] rounded-t-full rounded-b-lg border-4 border-[#b8cc26] opacity-90"></div>
              </div>
              
              {/* Center icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                <svg className="w-10 h-10 text-teal-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              
              {/* Animated glow effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#b8cc26] rounded-full opacity-10 animate-pulse"></div>
            </div>
            
            {/* Security stats */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-8">
              <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                <p className="text-xs text-teal-600 font-medium">Uptime</p>
                <p className="text-xl font-bold text-teal-800">99.99%</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                <p className="text-xs text-teal-600 font-medium">Secure Assets</p>
                <p className="text-xl font-bold text-teal-800">$50M+</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-3 text-center">
                <p className="text-xs text-teal-600 font-medium">Breaches</p>
                <p className="text-xl font-bold text-teal-800">Zero</p>
              </div>
            </div>
          </div>
          
          {/* Security features list */}
          <div className="lg:w-1/2 mt-16 lg:mt-0">
            <div className="space-y-6">
              {securityFeatures.map((feature) => (
                <div 
                  key={feature.id}
                  ref={addToFeaturesRef}
                  className={`flex items-start p-4 rounded-lg transition-all duration-300 cursor-pointer
                    ${hoveredFeature === feature.id ? 'bg-teal-50 shadow-md' : 'hover:bg-teal-50'}
                  `}
                  onMouseEnter={() => handleFeatureHover(feature.id)}
                  onMouseLeave={handleFeatureLeave}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-300
                    ${hoveredFeature === feature.id ? 'bg-[#b8cc26] text-teal-900' : 'bg-teal-100 text-teal-600'}
                  `}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-teal-800 mb-1">{feature.name}</h3>
                    <p className="text-teal-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            

          </div>
        </div>

      </div>
    </div>
  );
};

export default SecuritySection;
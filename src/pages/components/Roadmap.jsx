// Roadmap.js
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Roadmap = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const yearsRef = useRef(null);
  const [activeYear, setActiveYear] = useState('2024');
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Roadmap data by year and quarter
  const roadmapData = {
    '2024': [
      {
        quarter: 'Q1',
        title: 'Platform Launch & Initial Growth',
        items: [
          'Complete all security audits and compliance certifications',
          'Launch Jaimax presale platform with multi-currency support',
          'Onboard first 10,000 users and establish community channels',
          'Release token staking feature with competitive APY'
        ],
        status: 'completed',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q1'
      },
      {
        quarter: 'Q2',
        title: 'Exchange Listings & Expansion',
        items: [
          'List JMX token on 3 major centralized exchanges',
          'Launch decentralized exchange partnerships',
          'Expand marketing campaigns across India',
          'Release mobile application for iOS and Android'
        ],
        status: 'in-progress',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q2'
      },
      {
        quarter: 'Q3',
        title: 'Product Enhancements',
        items: [
          'Implement advanced trading features and analytics',
          'Establish strategic partnerships with payment processors',
          'Launch referral program with token rewards',
          'Release Jaimax Academy for crypto education'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q3'
      },
      {
        quarter: 'Q4',
        title: 'Ecosystem Expansion',
        items: [
          'Implement governance system for token holders',
          'Launch NFT marketplace integration',
          'Expand to Southeast Asian markets',
          'Achieve 100,000 active users milestone'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q4'
      }
    ],
    '2025': [
      {
        quarter: 'Q1',
        title: 'DeFi Integration',
        items: [
          'Launch yield farming protocols',
          'Introduce cross-chain liquidity pools',
          'Implement automated portfolio management',
          'Begin institutional partnership program'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q1'
      },
      {
        quarter: 'Q2',
        title: 'Global Expansion',
        items: [
          'Launch in European and American markets',
          'Implement AI-driven market analysis tools',
          'Establish regulatory compliance framework for global operations',
          'Secure strategic investments from venture capital firms'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q2'
      },
      {
        quarter: 'Q3',
        title: 'Advanced Security & Features',
        items: [
          'Implement quantum-resistant security measures',
          'Launch institutional-grade custody solutions',
          'Develop OTC trading desk for high-volume transactions',
          'Enhance platform with predictive analytics'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q3'
      },
      {
        quarter: 'Q4',
        title: 'Ecosystem Maturity',
        items: [
          'Release decentralized identity solutions',
          'Launch Jaimax incubator for crypto startups',
          'Implement advanced tokenomics adjustments',
          'Reach 1 million user milestone'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q4'
      }
    ],
    '2026': [
      {
        quarter: 'Q1',
        title: 'Enterprise Solutions',
        items: [
          'Launch enterprise blockchain solutions',
          'Develop B2B payment infrastructure',
          'Establish interoperability with traditional finance systems',
          'Release white-label solutions for businesses'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q1'
      },
      {
        quarter: 'Q2',
        title: 'Advanced Tech Integration',
        items: [
          'Implement layer-2 scaling solutions',
          'Integrate with metaverse platforms',
          'Develop AI-driven trading bots',
          'Launch real-world asset tokenization'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q2'
      },
      {
        quarter: 'Q3',
        title: 'Financial Ecosystem',
        items: [
          'Launch decentralized insurance products',
          'Implement cross-border remittance solutions',
          'Develop crypto-backed lending platform',
          'Establish Jaimax Labs for R&D'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q3'
      },
      {
        quarter: 'Q4',
        title: 'Governance Evolution',
        items: [
          'Transition to fully decentralized governance',
          'Implement on-chain voting mechanisms',
          'Launch community-driven development fund',
          'Begin development of Jaimax 2.0'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q4'
      }
    ],
    '2027': [
      {
        quarter: 'Q1',
        title: 'Next-Gen Platform',
        items: [
          'Launch Jaimax 2.0 with enhanced infrastructure',
          'Implement quantum computing security features',
          'Develop proprietary blockchain solution',
          'Establish global research centers'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q1'
      },
      {
        quarter: 'Q2',
        title: 'Web3 Integration',
        items: [
          'Full integration with Web3 ecosystem',
          'Launch decentralized autonomous organization',
          'Implement zero-knowledge privacy features',
          'Develop cross-chain interoperability protocol'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q2'
      },
      {
        quarter: 'Q3',
        title: 'Financial Innovation',
        items: [
          'Launch synthetic asset creation platform',
          'Implement AI-driven financial advisory',
          'Develop predictive market analytics',
          'Establish global financial inclusion initiatives'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q3'
      },
      {
        quarter: 'Q4',
        title: 'Long-Term Vision',
        items: [
          'Complete global ecosystem integration',
          'Achieve full regulatory compliance worldwide',
          'Establish Jaimax Foundation for blockchain education',
          'Begin planning for 2028-2030 vision'
        ],
        status: 'upcoming',
        image: 'https://via.placeholder.com/120/0d9488/FFFFFF?text=Q4'
      }
    ]
  };
  
  // Years array for navigation
  const years = Object.keys(roadmapData);
  
  useEffect(() => {
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
      
      // Timeline line animation
      gsap.fromTo(timelineRef.current,
        { width: 0 },
        { 
          width: '100%', 
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%"
          }
        }
      );
    }, sectionRef);
    
    // Scroll event listener to update active year
    const handleScroll = () => {
      if (isScrolling || !scrollContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      const totalYears = years.length;
      const yearIndex = Math.min(
        totalYears - 1,
        Math.floor(scrollPercentage * totalYears * 4) / 4
      );
      
      const year = years[Math.floor(yearIndex)];
      if (year !== activeYear) {
        setActiveYear(year);
      }
    };
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      ctx.revert();
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeYear, isScrolling, years]);
  
  // Handle year navigation click
  const handleYearClick = (year) => {
    setIsScrolling(true);
    
    const yearIndex = years.indexOf(year);
    const scrollContainer = scrollContainerRef.current;
    const quarterWidth = scrollContainer.scrollWidth / (years.length * 4);
    const targetScroll = yearIndex * quarterWidth * 4;
    
    gsap.to(scrollContainer, {
      scrollTo: { x: targetScroll, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveYear(year);
        setIsScrolling(false);
      }
    });
  };

  return (
    <div ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-teal-900 to-teal-800 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 ref={headingRef} className="text-4xl font-bold text-center mb-16" style={{opacity: 1}}>
          Roadmap 2024-2027
          <span className="block w-24 h-1 bg-[#b8cc26] mx-auto mt-4"></span>
        </h2>
        
        {/* Year navigation */}
        <div ref={yearsRef} className="flex justify-center mb-10 relative">
          <div ref={timelineRef} className="absolute h-1 bg-teal-600 bottom-0 left-0 right-0 w-full"></div>
          
          <div className="flex space-x-6 md:space-x-12 relative z-10">
            {years.map((year) => (
              <button
                key={year}
                className={`relative pb-6 font-bold text-xl transition-all duration-300 ${
                  activeYear === year ? 'text-[#b8cc26]' : 'text-teal-300 hover:text-white'
                }`}
                onClick={() => handleYearClick(year)}
              >
                {year}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300 ${
                  activeYear === year ? 'bg-[#b8cc26]' : 'bg-teal-600 hover:bg-teal-500'
                }`}></div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Horizontally scrollable roadmap */}
        <div 
          ref={scrollContainerRef} 
          className="overflow-x-auto pb-8 hide-scrollbar"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="flex" style={{ width: `${years.length * 4 * 350}px` }}>
            {years.map((year) => (
              <React.Fragment key={year}>
                {roadmapData[year].map((quarter, index) => (
                  <div 
                    key={`${year}-${quarter.quarter}`} 
                    className="min-w-[350px] px-4"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className={`bg-gradient-to-br from-teal-800 to-teal-700 rounded-lg p-6 h-full border-2 transition-all duration-300 ${
                      activeYear === year ? 'border-teal-600' : 'border-transparent'
                    }`}>
                      {/* Quarter header */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex items-center justify-center bg-teal-600 rounded-lg mr-4">
                            <span className="text-2xl font-bold">{quarter.quarter}</span>
                          </div>
                          <div>
                            <span className="text-teal-300 text-sm">{year}</span>
                            <h3 className="text-xl font-bold">{quarter.title}</h3>
                          </div>
                        </div>
                        
                        <div className={`w-3 h-3 rounded-full ${
                          quarter.status === 'completed' ? 'bg-green-400' :
                          quarter.status === 'in-progress' ? 'bg-[#b8cc26]' :
                          'bg-teal-600'
                        }`}></div>
                      </div>
                      
                      {/* Quarter milestones */}
                      <ul className="space-y-3 mb-6">
                        {quarter.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <div className={`mt-1.5 w-4 h-4 flex-shrink-0 mr-3 rounded-full ${
                              quarter.status === 'completed' ? 'bg-green-400' :
                              quarter.status === 'in-progress' && i < 2 ? 'bg-[#b8cc26]' :
                              'bg-teal-600'
                            }`}></div>
                            <span className="text-teal-100">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Status indicator */}
                      <div className="mt-auto">
                        <div className={`text-sm font-medium ${
                          quarter.status === 'completed' ? 'text-green-400' :
                          quarter.status === 'in-progress' ? 'text-[#b8cc26]' :
                          'text-teal-400'
                        }`}>
                          {quarter.status === 'completed' ? 'Completed' :
                           quarter.status === 'in-progress' ? 'In Progress' :
                           'Upcoming'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        

        
      </div>
      
      {/* Custom CSS for hiding scrollbars but maintaining functionality */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
};

export default Roadmap;
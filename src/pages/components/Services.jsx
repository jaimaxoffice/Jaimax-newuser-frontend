// Services.js
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCard, setActiveCard] = useState(null);

  // Add to cardsRef
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Reset refs array on component mount
    cardsRef.current = [];

    let ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Staggered cards animation
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, servicesRef);

    return () => {
      ctx.revert(); // Clean up animations
    };
  }, []);

  // Handle card hover
  const handleMouseEnter = (index) => {
    setActiveCard(index);
    gsap.to(cardsRef.current[index], {
      y: -10,
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      duration: 0.3,
    });
  };

  // Handle card hover out
  const handleMouseLeave = (index) => {
    setActiveCard(null);
    gsap.to(cardsRef.current[index], {
      y: 0,
      scale: 1,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
    });
  };

  // Service data
  const services = [
    {
      icon: (
        <svg
          className="w-10 h-10 text-teal-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
        </svg>
      ),
      title: "Token Trading",
      description:
        "Buy and sell Jaimax tokens with ease. Our platform provides simple, secure trading with real-time market data and zero hidden fees.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-teal-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      title: "Enhanced Security",
      description:
        "Multi-layered security protocols protect your investment. We employ industry-leading encryption, multi-sig wallets, and regular security audits.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-teal-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      title: "Investment Analytics",
      description:
        "Track your investment performance with detailed analytics and visual dashboards. Get insights into growth trends and market movements.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-teal-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
        </svg>
      ),
      title: "Educational Resources",
      description:
        "Expand your crypto knowledge with our comprehensive educational resources. Access guides, webinars, and market insights.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-teal-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock. Get immediate assistance through live chat, email, or phone support.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-teal-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
      ),
      title: "Community Access",
      description:
        "Join our thriving community of investors and enthusiasts. Participate in discussions, share strategies, and connect with like-minded individuals.",
    },
  ];

  return (
    <div
      id="services"
      ref={servicesRef}
      className="min-h-screen bg-gradient-to-b from-white to-teal-50 py-2 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading section - modified to ensure visibility */}
        <h2
          ref={headingRef}
          className="text-4xl font-bold text-center text-teal-800 mb-4"
          style={{ opacity: 1 }}
        >
          Our Services
          <span className="block w-20 h-1 bg-teal-500 mx-auto mt-4"></span>
        </h2>

        <p
          ref={subtitleRef}
          className="text-xl text-teal-700 text-center max-w-3xl mx-auto mb-16"
          style={{ opacity: 1 }}
        >
          Comprehensive crypto solutions tailored for both beginners and
          experienced investors
        </p>

        {/* Service cards - modified to ensure visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              className="bg-white rounded-lg shadow-lg p-8 border border-transparent hover:border-teal-400 transition-all duration-300"
              style={{ opacity: 1, transform: "none" }} // Ensure initial visibility
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className={`mb-6 transition-transform duration-300 ${
                  activeCard === index ? "scale-110" : ""
                }`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">
                {service.title}
              </h3>
              <p className="text-teal-700">{service.description}</p>

              <div
                className={`mt-6 overflow-hidden transition-all duration-300 ${
                  activeCard === index ? "h-10 opacity-100" : "h-0 opacity-0"
                }`}
              >
                <button className="text-teal-600 font-medium flex items-center group">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

import React, { useEffect, useRef, useState } from "react";
import jaicoins from "../../assets/Images/jaicoins.svg";
import frameTwo from "../../assets/Images/securitymeasure.svg";
import access from "../../assets/Images/accessToprofit.svg";
import rocket2 from "../../assets/Images/framefour.svg";
import eye from "../../assets/Images/eye.svg";

const ServicesSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  // Your services data with links and image titles added
  const services = [
    {
      title: "Security Measures",
      icon: frameTwo,
      iconAlt: "Security shield icon representing account protection",
      iconTitle: "Advanced Security Features",
      description:
        "KYC verification and Google Authenticator fortify your account from unauthorized access. Trust Jaimax to protect your digital assets.",
      // link: "/services/security",
      // linkTitle: "Learn more about our security measures",
    },
    {
      title: "Secure Crypto Wallet",
      icon: jaicoins,
      iconAlt: "Jaicoins wallet icon for cryptocurrency storage",
      iconTitle: "Secure Digital Wallet",
      description:
        "Your crypto is protected with top-tier encryption and real-time monitoring. Manage your assets securely from anywhere.",
      // link: "/services/wallet",
      // linkTitle: "Explore our secure crypto wallet features",
    },
    {
      title: "Access to Profits",
      icon: access,
      iconAlt: "Profit access icon showing financial gains",
      iconTitle: "Easy Profit Access",
      description:
        "Convert your crypto into real-world gains. Flexible, fast, and built for your financial success.",
      // link: "/services/profits",
      // linkTitle: "Discover how to access your profits",
    },
    {
      title: "Financial Growth",
      icon: rocket2,
      iconAlt: "Rocket icon symbolizing financial growth and success",
      iconTitle: "Accelerate Your Growth",
      description:
        "Tailored plans aligned with your goals. Grow your portfolio with strategic crypto investments.",
      // link: "/services/growth",
      // linkTitle: "View our financial growth strategies",
    },
    {
      title: "Funds Management",
      icon: eye,
      iconAlt: "Eye icon representing funds monitoring and management",
      iconTitle: "Complete Fund Visibility",
      description:
        "Add, withdraw, and monitor investments effortlessly. Stay in control of your capital anytime, anywhere.",
      // link: "/services/funds",
      // linkTitle: "Manage your funds efficiently",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.itemId);
            setVisibleItems((prev) => new Set([...prev, itemId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const items = document.querySelectorAll("[data-item-id]");
      items.forEach((item) => {
        if (observerRef.current) {
          observerRef.current.observe(item);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getAnimationClasses = (itemId, side) => {
    const isVisible = visibleItems.has(itemId);

    if (!isVisible) {
      return side === "left"
        ? "-translate-x-20 opacity-0"
        : "translate-x-20 opacity-0";
    }

    return "translate-x-0 opacity-100";
  };

  return (
    <div
      className="py-10 lg:py-12 overflow-hidden bg-[#085056]"
      style={{
        backgroundImage:
          "url('https://ninetheme.com/themes/cryptoland/wp-content/uploads/2018/10/cases-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h4 className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-4">
            OUR SERVICES
          </h4>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            What We Offer
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return (
              <div
                key={index}
                data-item-id={index}
                className={`flex items-start space-x-6 group transition-all duration-1000 ease-out ${getAnimationClasses(
                  index,
                  side
                )}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Icon Circle with Link */}
 
                  <div
                    className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${service.gradient} rounded-full border-2 border-white/20 flex items-center justify-center text-white text-2xl lg:text-3xl group-hover:border-white/40 group-hover:scale-110 transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-black/30`}
                  >
                    <img
                      src={service.icon}
                      alt={service.iconAlt}
                      title={service.iconTitle}
                      className={`object-contain ${
                        service.title === "Financial Growth"
                          ? "w-26 h-26 lg:w-50 lg:h-50"
                          : "w-12 h-12 lg:w-14 lg:h-14"
                      }`}
                    />
                  </div>
                

                {/* Content */}
                <div className="flex-1 pt-2">
                  <a
                    href={service.link}
                    title={service.linkTitle}
                    
                    className="inline-block"
                  >
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#bbcf28] transition-colors duration-300 cursor-pointer">
                      {service.title}
                    </h3>
                  </a>
                  <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
                    {service.description}
                  </p>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
import React from "react";
import {
  Shield,
  Wallet,
  TrendingUp,
  PieChart,
  BarChart3,
  Coins,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Seo from "../../SeoContent/Seo";
import { Link } from 'react-router-dom';
const CryptoServicesFlipCards = () => {
  const navigate = useNavigate();
  const servicesschema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.jaimax.com/services",
        url: "https://www.jaimax.com/services",
        name: "Jaimax Services | Digital Finance, Wallet & Blockchain Solutions",
        description:
          "Explore Jaimax services including digital wallet solutions, blockchain infrastructure, staking support and secure crypto transaction tools for users and businesses.",
        inLanguage: "en",
        isPartOf: { "@id": "https://www.jaimax.com/#website" },
        publisher: { "@id": "https://www.jaimax.com/#organization" },
      },
      {
        "@type": "Service",
        "@id": "https://www.jaimax.com/services#service",
        name: "Jaimax Digital Finance & Crypto Services",
        provider: { "@id": "https://www.jaimax.com/#organization" },
        serviceType: "Digital finance, crypto wallet and blockchain services",
        areaServed: "IN",
        url: "https://www.jaimax.com/services",
      },
    ],
  };
  const mainServices = [
    {
      icon: <Shield size={48} />,
      title: "SECURITY MEASURES",
      description:
        "Advanced crypto security protocols with KYC verification, Google Authenticator, and end-to-end encryption.",
      backContent:
        "Our comprehensive security framework includes blockchain protection, multi-factor authentication, and compliance-first strategies. Every transaction is secured with military-grade encryption and real-time monitoring.",
    },
    {
      icon: <Wallet size={48} />,
      title: "SECURE CRYPTO WALLET",
      description:
        "Integrated wallet with encryption, backup recovery options, and user-friendly features for seamless transactions.",
      backContent:
        "Store, send, and receive crypto assets with confidence. Our wallet features cold storage integration, instant transfers, and multi-currency support with industry-leading security protocols.",
    },
    {
      icon: <TrendingUp size={48} />,
      title: "ACCESS TO PROFITS",
      description:
        "Real-time tracking, growth analytics, and easy withdrawal systems to maximize your crypto earnings.",
      backContent:
        "Unlock passive income opportunities through smart investment strategies. Our platform provides automated trading signals, yield farming options, and comprehensive profit tracking tools.",
    },
  ];

  // Why choose us data (bottom section)
  const whyChooseUs = [
    {
      icon: <PieChart size={48} />,
      title: "FUND MANAGEMENT",
      description:
        "Intelligent portfolio management system to track performance and allocate funds smartly across digital assets.",
      backContent:
        "Take control of your crypto portfolio with advanced analytics, risk assessment tools, and automated rebalancing. Monitor all your investments with precision and make data-driven decisions.",
      isPrimary: true,
    },
    {
      icon: <BarChart3 size={48} />,
      title: "FINANCIAL GROWTH",
      description:
        "Gateway to financial growth through crypto with reliable and ethical investment opportunities.",
      backContent:
        "Build long-term wealth with our ecosystem of growth opportunities. Access exclusive investment rounds, staking rewards, and participate in the future of decentralized finance.",
      isPrimary: false,
    },
    {
      icon: <Coins size={48} />,
      title: "EXPERT ANALYSIS",
      description:
        "Professional market analysis and insights to guide your investment decisions with confidence.",
      backContent:
        "Get access to expert cryptocurrency analysis, market trends, and investment recommendations from our team of professional traders and analysts.",
      isPrimary: false,
    },
    {
      icon: <Shield size={48} />,
      title: "24/7 SUPPORT",
      description:
        "Round-the-clock customer support to assist you with any queries or technical issues you may encounter.",
      backContent:
        "Our dedicated support team is available 24/7 to help you navigate the crypto world. Get instant assistance through multiple channels and resolve issues quickly.",
      isPrimary: false,
    },
  ];

  const FlipCard = ({ service, index, delay = 0, isPrimary = false }) => (
    <div
      key={index}
      className="group perspective-1000 h-72 sm:h-80 md:h-96 lg:h-80 hover:scale-105 transition-transform duration-300"
      style={{
        animationDelay: `${delay}s`,
        animation: "fadeInScale 0.5s ease-out forwards",
        opacity: 0,
        transform: "scale(0.8)",
      }}
    >
      <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
        {/* Front of card */}

        <div
          className={`absolute inset-0 backface-hidden ${
            isPrimary
              ? "bg-gradient-to-br from-green-600 to-teal-700 border-lime-400"
              : "bg-gradient-to-br from-teal-700 via-green-600 to-lime-400 border-teal-700"
          } rounded-xl shadow-2xl p-4 sm:p-5 md:p-5 lg:p-6 flex flex-col items-center justify-center text-center border hover:border-lime-400 transition-all duration-300 hover:shadow-lime-400/30 hover:shadow-2xl`}
        >
          <div className="text-lime-400 mb-3 sm:mb-4 md:mb-4 lg:mb-4 drop-shadow-lg">
            <div className="block sm:hidden">
              {React.cloneElement(service.icon, { size: 32 })}
            </div>
            <div className="hidden sm:block md:hidden">
              {React.cloneElement(service.icon, { size: 36 })}
            </div>
            <div className="hidden md:block lg:hidden">
              {React.cloneElement(service.icon, { size: 36 })}
            </div>
            <div className="hidden lg:block">
              {React.cloneElement(service.icon, { size: 40 })}
            </div>
          </div>
          <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3 md:mb-2 lg:mb-3 tracking-wide px-1">
            {service.title}
          </h3>
          <p className="text-gray-300 text-xs sm:text-xs md:text-xs lg:text-sm leading-relaxed px-1">
            {service.description}
          </p>
          <div className="absolute top-3 right-3 w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-teal-700 rounded-xl shadow-2xl p-4 sm:p-5 md:p-5 lg:p-6 flex flex-col items-center justify-between text-center text-white">
          <div className="mb-2 sm:mb-3 md:mb-2 lg:mb-3 opacity-90 drop-shadow-lg mt-3 md:mt-2">
            <div className="block sm:hidden">
              {React.cloneElement(service.icon, { size: 28 })}
            </div>
            <div className="hidden sm:block md:hidden">
              {React.cloneElement(service.icon, { size: 32 })}
            </div>
            <div className="hidden md:block lg:hidden">
              {React.cloneElement(service.icon, { size: 32 })}
            </div>
            <div className="hidden lg:block">
              {React.cloneElement(service.icon, { size: 36 })}
            </div>
          </div>
          <div className="flex-grow flex flex-col items-center">
            <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-bold mb-2 tracking-wide px-1">
              {service.title}
            </h3>
            <p className="text-white/90 text-xs leading-tight mb-3 px-1 overflow-y-auto max-h-32 md:max-h-40 lg:max-h-28">
              {service.backContent}
            </p>
          </div>
          <button
            className="px-4 py-1.5 sm:py-2 md:py-1.5 lg:py-2 bg-white/90 text-teal-700 rounded-full font-bold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm lg:text-sm hover:scale-105 active:scale-95 mb-3"
            onClick={() => navigate("/register")}
          >
            {isPrimary ? "Join Now" : "Get Started"}
          </button>
          <div className="absolute top-3 right-3 w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
<div className="min-h-screen py-8 sm:py-20 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6 lg:px-4 bg-[#085056] mt-8 sm:mt-20">
  <div className="max-w-7xl mx-auto">
    <Seo page="services" />

    {/* Our Services Section */}
    <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-20">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-5 lg:mb-6 bg-gradient-to-r from-lime-400 to-green-600 bg-clip-text text-transparent px-4">
          Our Service Offerings
        </h1>
        <p className="text-base sm:text-base md:text-lg lg:text-xl text-lime-400 max-w-3xl mx-auto mb-4 sm:mb-5 md:mb-5 lg:mb-6 font-semibold px-4">
          Explore the Future of Digital Finance with{" "}
          <Link to="/about" title="About Jaimax crypto token" className="hover:underline">
            Jaimax
          </Link>{" "}
          –{" "}
          <Link 
            to="/best-presale-crypto-token-in-india" 
            title="Best crypto token in India - Jaimax presale"
            className="hover:underline"
          >
            The Best Crypto token in India
          </Link>
        </p>
        <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-sm sm:text-sm md:text-base lg:text-lg px-4">
          At{" "}
          <Link to="/about" title="About Jaimax" className="text-lime-400 hover:underline">
            Jaimax
          </Link>
          , we provide a powerful range of crypto services designed to help users grow, secure, and manage their digital assets with ease. Whether you're a{" "}
          <Link to="/register/" title="Register on Jaimax - New investor" className="text-lime-400 hover:underline">
            new investor
          </Link>{" "}
          or a crypto-savvy expert, our platform delivers the tools and{" "}
          <Link to="/features" title="Jaimax platform features" className="text-lime-400 hover:underline">
            features
          </Link>{" "}
          you need to succeed in the world of cryptocurrency. Discover why{" "}
          <Link to="/best-presale-crypto-token-in-india" title="Why Jaimax is the best crypto token" className="text-lime-400 hover:underline">
            Jaimax is fast becoming the best crypto token in India
          </Link>.
        </p>
        <div className="w-16 sm:w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-teal-700 to-green-600 mx-auto mt-6 sm:mt-6 md:mt-7 lg:mt-8 rounded-full"></div>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
        {mainServices.map((service, index) => {
          // Map services to different pages for internal linking
          const serviceLinks = [
            "/features",
            "/best-presale-crypto-token-in-india",
            "/about/",
            "/contact/",
            "/blog/",
            "/login"
          ];
          const serviceLink = serviceLinks[index % serviceLinks.length];
          
          return (
            <Link 
              to={serviceLink} 
              title={`Learn more about ${service.title}`}
              key={index}
            >
              <FlipCard
                service={service}
                index={index}
                delay={index * 0.1 + 0.5}
              />
            </Link>
          );
        })}
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-5 lg:mb-6 px-4">
          <Link to="/about" title="Why choose Jaimax crypto platform">
            Why Choose Us?
          </Link>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-6 md:mb-7 lg:mb-8 px-4">
          We are committed to our clients and maintain the highest standards. Discover how unique{" "}
          <Link to="/features" title="Jaimax benefits and features" className="text-lime-400 hover:underline">
            benefits
          </Link>{" "}
          that set us apart and ensure your best financial experience at your every journey.
        </p>
        <Link
          to="/register/"
          title="Join Jaimax - Register now"
          className="inline-block bg-lime-400 hover:bg-white text-teal-700 font-semibold px-6 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-2 md:py-2.5 lg:py-3 rounded-full transition-all duration-300 text-sm sm:text-sm md:text-base lg:text-base hover:scale-105 active:scale-95"
        >
          Join Now
        </Link>
      </div>

      {/* Why Choose Us Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-6">
        {whyChooseUs.map((item, index) => {
          // Map why choose cards to pages
          const whyChooseLinks = [
            "/about",
            "/contact",
            "/features",
            "/blog"
          ];
          const whyChooseLink = whyChooseLinks[index % whyChooseLinks.length];
          
          return (
            <Link 
              to={whyChooseLink} 
              title={`${item.title} - Learn more`}
              key={index + 10}
            >
              <FlipCard
                service={item}
                index={index + 10}
                delay={index * 0.1 + 1.6}
                isPrimary={item.isPrimary}
              />
            </Link>
          );
        })}
      </div>
    </div>

    {/* CTA Section */}
    <div className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-20">
      <div className="rounded-2xl p-6 sm:p-6 md:p-7 lg:p-8 hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-3 md:mb-3 lg:mb-4 px-4">
          Ready to Start Your{" "}
          <Link to="/best-presale-crypto-token-in-india" title="Start your crypto journey with Jaimax" className="text-lime-400 hover:underline">
            Crypto Journey
          </Link>?
        </h2>
        <p className="text-white/90 mb-4 sm:mb-4 md:mb-5 lg:mb-6 text-base sm:text-base md:text-lg lg:text-lg px-4">
          Join thousands of investors who trust{" "}
          <Link to="/about" title="About Jaimax - Trusted crypto platform" className="text-lime-400 hover:underline">
            Jaimax
          </Link>{" "}
          for their{" "}
          <Link to="/features" title="Digital asset management features" className="text-lime-400 hover:underline">
            digital asset management
          </Link>
        </p>
        <button
          className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-lime-400 text-teal-700 rounded-full font-semibold text-sm sm:text-base md:text-base hover:bg-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=com.jaimaxjaimax.jaimaxjaimax",
              "_blank"
            )
          }
        >
          Launch App
        </button>
      </div>
    </div>

  </div>

  <style jsx>{`
    @keyframes fadeInScale {
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .perspective-1000 {
      perspective: 1000px;
    }
    .transform-style-preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    .group:hover .group-hover\\:rotate-y-180 {
      transform: rotateY(180deg);
    }

    /* Fix for 1024px specifically */
    @media (min-width: 768px) and (max-width: 1024px) {
      .md\\:h-96 {
        height: 24rem;
      }

      .md\\:grid-cols-3 > *,
      .md\\:grid-cols-2 > * {
        min-height: auto;
      }

      .md\\:text-xs {
        font-size: 0.75rem;
        line-height: 1rem;
      }

      .md\\:max-h-40 {
        max-height: 10rem;
      }
    }

    /* Touch device optimizations */
    @media (hover: none) and (pointer: coarse) {
      .group:active .group-hover\\:rotate-y-180 {
        transform: rotateY(180deg);
      }

      .hover\\:scale-105:active {
        transform: scale(1.05);
      }
    }
  `}</style>
</div>
  );
};

export default CryptoServicesFlipCards;

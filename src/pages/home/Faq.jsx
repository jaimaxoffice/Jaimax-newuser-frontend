
// import React, { useState, useEffect } from 'react';
// import { Plus, Minus, Sparkles, TrendingUp, Shield, Wallet } from 'lucide-react';

// const JaimaxFAQ = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const faqs = [
//     {
//       question: "What is Jaimax Coin?",
//       answer: "Jaimax Coin is a secure and innovative cryptocurrency that delivers fast, transparent, and low-cost blockchain-based transactions. Designed for both daily use and long-term crypto investment, Jaimax empowers users to take control of their financial future.",
//       icon: <TrendingUp className="w-5 h-5" />
//     },
//     {
//       question: "How is Jaimax Coin different from other cryptocurrencies?",
//       answer: "Jaimax Coin is more than just a digital asset. It offers users access to our exclusive Jaimax App, a built-in crypto wallet, and a powerful referral-based ecosystem. We focus on real-world usability, scalability, and building a strong crypto community in India and worldwide.",
//       icon: <Sparkles className="w-5 h-5" />
//     },
//     {
//       question: "Is Jaimax Coin safe to use?",
//       answer: "Yes. Jaimax Coin is built on a decentralized blockchain using strong cryptographic security protocols to ensure each transaction is transparent and tamper-proof. Our Jaimax Wallet inside the app adds another layer of protection for storing and managing your crypto assets.",
//       icon: <Shield className="w-5 h-5" />
//     },
//     {
//       question: "Where can I store my Jaimax Coins?",
//       answer: "You can store your Jaimax Coins securely in the official Jaimax Wallet, available in the Jaimax App. Our wallet is easy to use, supports fast transfers, and gives you full control over your digital assets with complete privacy and security.",
//       icon: <Wallet className="w-5 h-5" />
//     },
//     {
//       question: "How can I access Jaimax Coin?",
//       answer: "You can access Jaimax Coin directly through the Jaimax App, available for download on Android and iOS. From here, you can create a wallet, invest in Jaimax, track your balance, and manage referrals—all in one place.",
//       icon: <TrendingUp className="w-5 h-5" />
//     },
//     {
//       question: "What can I do with Jaimax Coin?",
//       answer: "Jaimax Coin can be used for fast and secure digital transactions, stored safely in your Jaimax Wallet, and managed directly through the Jaimax App. As the Jaimax ecosystem grows, it will be integrated into more platforms and services, offering even greater utility and real-world use for crypto enthusiasts.",
//       icon: <Sparkles className="w-5 h-5" />
//     },
//     {
//       question: "Can I use Jaimax Coin for real-world transactions?",
//       answer: "Yes, Jaimax is working on expanding real-world utility through merchant partnerships, making it easier to use Jaimax for payments, services, and online transactions. We aim to make Jaimax a widely accepted digital currency for everyday use.",
//       icon: <Shield className="w-5 h-5" />
//     },
//     {
//       question: "Is Jaimax listed on any crypto exchanges?",
//       answer: "Jaimax Coin is currently available exclusively through our official Jaimax platform and app. We're planning future listings on popular crypto exchanges, which will enhance liquidity and accessibility. Stay tuned for updates on exchange integrations.",
//       icon: <Wallet className="w-5 h-5" />
//     },
//     {
//       question: "What blockchain is Jaimax Coin built on?",
//       answer: "Jaimax Coin is developed on a reliable and high-performance blockchain network that supports fast transactions, low gas fees, and smart contract functionality. Our tech ensures that your crypto experience is seamless and future-ready.",
//       icon: <TrendingUp className="w-5 h-5" />
//     },
//     {
//       question: "How can I stay updated with Jaimax Coin news?",
//       answer: "Stay connected by following our official Jaimax social media channels, joining our community, and using the Jaimax App for real-time updates. You'll receive notifications about new features, roadmap progress, and exciting developments in the Jaimax ecosystem.",
//       icon: <Sparkles className="w-5 h-5" />
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen  to-slate-900">
//       {/* Subtle Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           // backgroundImage: 'radial-gradient(circle at 25% 25%, #4ecdc4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #4ecdc4 1px, transparent 1px)',
//           backgroundSize: '100px 100px, 60px 60px'
//         }}></div>
//       </div>

//       <div className="relative z-10 px-4 py-10">
//         <div className="max-w-6xl mx-auto">
//           {/* Hero Header */}
//           <div className="text-center mb-16">

//             <p className="text-2xl font-light text-slate-300 mb-8">
//               Frequently Asked Questions
//             </p>
//             <div className="w-20 h-1 bg-gradient-to-r from-[#4ecdc4] to-[#094e54] mx-auto rounded-full"></div>
//           </div>

//           {/* FAQ Grid - Two Columns */}
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Left Column - First 5 FAQs */}
//             <div className="space-y-4">
//               {faqs.slice(0, 5).map((faq, index) => (
//                 <div
//                   key={index}
//                   className="group"
//                   style={{
//                     animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`
//                   }}
//                 >
//                   <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/70 hover:border-[#4ecdc4]/30 hover:shadow-lg hover:shadow-[#4ecdc4]/10">
//                     {/* Question */}
//                     <button
//                       onClick={() => toggleFAQ(index)}
//                       className="w-full p-6 text-left flex items-center justify-between group/btn focus:outline-none focus:bg-slate-800/70 transition-colors duration-200"
//                     >
//                       <div className="flex items-center space-x-4 flex-1">
//                         <div className="w-12 h-12 bg-[#4ecdc4] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
//                           <div className="text-white">
//                             {faq.icon}
//                           </div>
//                         </div>
//                         <h3 className="text-base md:text-lg font-semibold text-white group-hover/btn:text-[#4ecdc4] transition-colors duration-300">
//                           {faq.question}
//                         </h3>
//                       </div>

//                       <div className={`w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center transition-all duration-400 ${activeIndex === index ? 'rotate-180 bg-[#4ecdc4]' : 'group-hover/btn:bg-slate-600'
//                         }`}>
//                         {activeIndex === index ? (
//                           <Minus className="w-5 h-5 text-white" />
//                         ) : (
//                           <Plus className="w-5 h-5 text-slate-300" />
//                         )}
//                       </div>
//                     </button>

//                     {/* Answer */}
//                     <div className={`overflow-hidden transition-all duration-300 ease-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                       }`}>
//                       <div className="px-6 pb-6">
//                         <div className="bg-slate-700/30 rounded-xl p-5 border-l-4 border-[#4ecdc4]/70">
//                           <p className="text-slate-200 text-sm leading-relaxed">
//                             {faq.answer}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Right Column - Last 5 FAQs */}
//             <div className="space-y-4">
//               {faqs.slice(5, 10).map((faq, index) => (
//                 <div
//                   key={index + 5}
//                   className="group"
//                   style={{
//                     animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`
//                   }}
//                 >
//                   <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/70 hover:border-[#4ecdc4]/30 hover:shadow-lg hover:shadow-[#4ecdc4]/10">
//                     {/* Question */}
//                     <button
//                       onClick={() => toggleFAQ(index + 5)}
//                       className="w-full p-6 text-left flex items-center justify-between group/btn focus:outline-none focus:bg-slate-800/70 transition-colors duration-200"
//                     >
//                       <div className="flex items-center space-x-4 flex-1">
//                         <div className="w-12 h-12 bg-[#4ecdc4] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
//                           <div className="text-white">
//                             {faq.icon}
//                           </div>
//                         </div>
//                         <h3 className="text-base md:text-lg font-semibold text-white group-hover/btn:text-[#4ecdc4] transition-colors duration-300">
//                           {faq.question}
//                         </h3>
//                       </div>

//                       <div className={`w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index + 5 ? 'rotate-180 bg-[#4ecdc4]' : 'group-hover/btn:bg-slate-600'
//                         }`}>
//                         {activeIndex === index + 5 ? (
//                           <Minus className="w-5 h-5 text-white" />
//                         ) : (
//                           <Plus className="w-5 h-5 text-slate-300" />
//                         )}
//                       </div>
//                     </button>

//                     {/* Answer */}
//                     <div className={`overflow-hidden transition-all duration-500 ease-out ${activeIndex === index + 5 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                       }`}>
//                       <div className="px-6 pb-6">
//                         <div className="bg-slate-700/30 rounded-xl p-5 border-l-4 border-[#4ecdc4]/70">
//                           <p className="text-slate-200 text-sm leading-relaxed">
//                             {faq.answer}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default JaimaxFAQ;

import React, { useState, useEffect } from 'react';
import { Plus, Minus, Sparkles, TrendingUp, Shield, Wallet, Coins, DollarSign, Globe, Bell } from 'lucide-react';

const JaimaxFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Jaimax Coin?",
      answer: "Jaimax Coin is a secure and innovative cryptocurrency that delivers fast, transparent, and low-cost blockchain-based transactions. Designed for both daily use and long-term crypto investment, Jaimax empowers users to take control of their financial future.",
      icon: <Coins className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "How is Jaimax Coin different from other cryptocurrencies?",
      answer: "Jaimax Coin is more than just a digital asset. It offers users access to our exclusive Jaimax App, a built-in crypto wallet, and a powerful referral-based ecosystem. We focus on real-world usability, scalability, and building a strong crypto community in India and worldwide.",
      icon: <Sparkles className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "Is Jaimax Coin safe to use?",
      answer: "Yes. Jaimax Coin is built on a decentralized blockchain using strong cryptographic security protocols to ensure each transaction is transparent and tamper-proof. Our Jaimax Wallet inside the app adds another layer of protection for storing and managing your crypto assets.",
      icon: <Shield className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "Where can I store my Jaimax Coins?",
      answer: "You can store your Jaimax Coins securely in the official Jaimax Wallet, available in the Jaimax App. Our wallet is easy to use, supports fast transfers, and gives you full control over your digital assets with complete privacy and security.",
      icon: <Wallet className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "How can I access Jaimax Coin?",
      answer: "You can access Jaimax Coin directly through the Jaimax App, available for download on Android and iOS. From here, you can create a wallet, invest in Jaimax, track your balance, and manage referrals—all in one place.",
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "What can I do with Jaimax Coin?",
      answer: "Jaimax Coin can be used for fast and secure digital transactions, stored safely in your Jaimax Wallet, and managed directly through the Jaimax App. As the Jaimax ecosystem grows, it will be integrated into more platforms and services, offering even greater utility and real-world use for crypto enthusiasts.",
      icon: <DollarSign className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "Can I use Jaimax Coin for real-world transactions?",
      answer: "Yes, Jaimax is working on expanding real-world utility through merchant partnerships, making it easier to use Jaimax for payments, services, and online transactions. We aim to make Jaimax a widely accepted digital currency for everyday use.",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "Is Jaimax listed on any crypto exchanges?",
      answer: "Jaimax Coin is currently available exclusively through our official Jaimax platform and app. We're planning future listings on popular crypto exchanges, which will enhance liquidity and accessibility. Stay tuned for updates on exchange integrations.",
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "What blockchain is Jaimax Coin built on?",
      answer: "Jaimax Coin is developed on a reliable and high-performance blockchain network that supports fast transactions, low gas fees, and smart contract functionality. Our tech ensures that your crypto experience is seamless and future-ready.",
      icon: <Shield className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
    {
      question: "How can I stay updated with Jaimax Coin news?",
      answer: "Stay connected by following our official Jaimax social media channels, joining our community, and using the Jaimax App for real-time updates. You'll receive notifications about new features, roadmap progress, and exciting developments in the Jaimax ecosystem.",
      icon: <Bell className="w-5 h-5" />,
      gradient: "from-green-500 to-teal-600"
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen ">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #4ecdc4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #4ecdc4 1px, transparent 1px)',
          backgroundSize: '80px 80px, 40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12 sm:mb-16">
           
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Frequently Asked Questions
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#4ecdc4] to-[#094e54] mx-auto rounded-full"></div>
          </div>

          {/* FAQ Grid - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group"
                style={{
                  animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/70 hover:border-[#4ecdc4]/30 hover:shadow-lg hover:shadow-[#4ecdc4]/10">
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between group/btn focus:outline-none focus:bg-slate-800/70 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${faq.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0`}>
                        <div className="text-white">
                          {faq.icon}
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white group-hover/btn:text-[#4ecdc4] transition-colors duration-300 pr-2">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      activeIndex === index ? 'rotate-180 bg-gradient-to-br from-[#4ecdc4] to-[#094e54]' : 'group-hover/btn:bg-slate-600'
                    }`}>
                      {activeIndex === index ? (
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#4ecdc4]/70">
                        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default JaimaxFAQ;
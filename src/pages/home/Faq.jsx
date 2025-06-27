
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Sparkles, TrendingUp, Shield, Wallet } from 'lucide-react';

const JaimaxFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Jaimax Coin?",
      answer: "Jaimax Coin is a secure and innovative cryptocurrency that delivers fast, transparent, and low-cost blockchain-based transactions. Designed for both daily use and long-term crypto investment, Jaimax empowers users to take control of their financial future.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      question: "How is Jaimax Coin different from other cryptocurrencies?",
      answer: "Jaimax Coin is more than just a digital asset. It offers users access to our exclusive Jaimax App, a built-in crypto wallet, and a powerful referral-based ecosystem. We focus on real-world usability, scalability, and building a strong crypto community in India and worldwide.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      question: "Is Jaimax Coin safe to use?",
      answer: "Yes. Jaimax Coin is built on a decentralized blockchain using strong cryptographic security protocols to ensure each transaction is transparent and tamper-proof. Our Jaimax Wallet inside the app adds another layer of protection for storing and managing your crypto assets.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "Where can I store my Jaimax Coins?",
      answer: "You can store your Jaimax Coins securely in the official Jaimax Wallet, available in the Jaimax App. Our wallet is easy to use, supports fast transfers, and gives you full control over your digital assets with complete privacy and security.",
      icon: <Wallet className="w-5 h-5" />
    },
    {
      question: "How can I access Jaimax Coin?",
      answer: "You can access Jaimax Coin directly through the Jaimax App, available for download on Android and iOS. From here, you can create a wallet, invest in Jaimax, track your balance, and manage referrals—all in one place.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      question: "What can I do with Jaimax Coin?",
      answer: "Jaimax Coin can be used for fast and secure digital transactions, stored safely in your Jaimax Wallet, and managed directly through the Jaimax App. As the Jaimax ecosystem grows, it will be integrated into more platforms and services, offering even greater utility and real-world use for crypto enthusiasts.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      question: "Can I use Jaimax Coin for real-world transactions?",
      answer: "Yes, Jaimax is working on expanding real-world utility through merchant partnerships, making it easier to use Jaimax for payments, services, and online transactions. We aim to make Jaimax a widely accepted digital currency for everyday use.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "Is Jaimax listed on any crypto exchanges?",
      answer: "Jaimax Coin is currently available exclusively through our official Jaimax platform and app. We're planning future listings on popular crypto exchanges, which will enhance liquidity and accessibility. Stay tuned for updates on exchange integrations.",
      icon: <Wallet className="w-5 h-5" />
    },
    {
      question: "What blockchain is Jaimax Coin built on?",
      answer: "Jaimax Coin is developed on a reliable and high-performance blockchain network that supports fast transactions, low gas fees, and smart contract functionality. Our tech ensures that your crypto experience is seamless and future-ready.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      question: "How can I stay updated with Jaimax Coin news?",
      answer: "Stay connected by following our official Jaimax social media channels, joining our community, and using the Jaimax App for real-time updates. You'll receive notifications about new features, roadmap progress, and exciting developments in the Jaimax ecosystem.",
      icon: <Sparkles className="w-5 h-5" />
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen  to-slate-900">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          // backgroundImage: 'radial-gradient(circle at 25% 25%, #4ecdc4 2px, transparent 2px), radial-gradient(circle at 75% 75%, #4ecdc4 1px, transparent 1px)',
          backgroundSize: '100px 100px, 60px 60px'
        }}></div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#4ecdc4]/5 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-[#094e54]/5 rounded-full blur-3xl top-1/3 -right-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-64 h-64 bg-[#4ecdc4]/3 rounded-full blur-3xl bottom-1/4 left-1/4 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-16">
            
            <p className="text-2xl font-light text-slate-300 mb-8">
              Frequently Asked Questions
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#4ecdc4] to-[#094e54] mx-auto rounded-full"></div>
          </div>

          {/* FAQ Grid - Two Columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - First 5 FAQs */}
            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq, index) => (
                <div
                  key={index}
                  className="group"
                  style={{
                    animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/70 hover:border-[#4ecdc4]/30 hover:shadow-lg hover:shadow-[#4ecdc4]/10">
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 text-left flex items-center justify-between group/btn focus:outline-none focus:bg-slate-800/70 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4ecdc4] to-[#094e54] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                          <div className="text-white">
                            {faq.icon}
                          </div>
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-white group-hover/btn:text-[#4ecdc4] transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>

                      <div className={`w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center transition-all duration-400 ${
                        activeIndex === index ? 'rotate-180 bg-[#4ecdc4]' : 'group-hover/btn:bg-slate-600'
                      }`}>
                        {activeIndex === index ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${
                      activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="bg-slate-700/30 rounded-xl p-5 border-l-4 border-[#4ecdc4]/70">
                          <p className="text-slate-200 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Last 5 FAQs */}
            <div className="space-y-4">
              {faqs.slice(5, 10).map((faq, index) => (
                <div
                  key={index + 5}
                  className="group"
                  style={{
                    animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-slate-800/70 hover:border-[#4ecdc4]/30 hover:shadow-lg hover:shadow-[#4ecdc4]/10">
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index + 5)}
                      className="w-full p-6 text-left flex items-center justify-between group/btn focus:outline-none focus:bg-slate-800/70 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4ecdc4] to-[#094e54] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                          <div className="text-white">
                            {faq.icon}
                          </div>
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-white group-hover/btn:text-[#4ecdc4] transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>

                      <div className={`w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeIndex === index + 5 ? 'rotate-180 bg-[#4ecdc4]' : 'group-hover/btn:bg-slate-600'
                      }`}>
                        {activeIndex === index + 5 ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${
                      activeIndex === index + 5 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6">
                        <div className="bg-slate-700/30 rounded-xl p-5 border-l-4 border-[#4ecdc4]/70">
                          <p className="text-slate-200 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default JaimaxFAQ;



// import React, { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';
// import clsx from 'clsx';
// import jaimaxCoin from "../../assets/3dcoin.png";
// import balance from "../../assets/balance.svg";
// import ActiveMem from "../../assets/activeMem.png";
// import Jcoin from "../../assets/jcoin.png";
// import walletBal from "../../assets/walletBal.png";
// import bloackChain from "../../assets/blockChain.png";
// import walletBalance from "../../assets/walletBal.png";
// import Jcoin1 from "../../assets/logo.png";
// import Exchange from "../../assets/icon.png";
// // const gradientColors = {
// //   emerald: "52 211 153",
// //   purple: "168 85 247",
// //   orange: "251 146 60",
// //   blue: "96 165 250",
// //   pink: "244 114 182",
// //   yellow: "251 191 36",
// //   green: "34 197 94",
// //   violet: "139 92 246",
// //   indigo: "99 102 241",
// //   teal: "20 184 166",
// // };

// const gradientColors = {
//   light: "186 230 253", // Light cyan
// };

// const faqs = [
//   {
//     question: "What is Jaimax Coin?",
//     answer: "Jaimax Coin is a secure and innovative cryptocurrency...",
//     icon: <img src={jaimaxCoin} alt="Cryptocurrency" className="w-8 h-8 object-contain" />,
//     gradient: "from-emerald-400 to-teal-600"
//   },
//   {
//     question: "How is Jaimax Coin different from other cryptocurrencies?",
//     answer: "Jaimax Coin is more than just a digital asset...",
//     icon: <img src={walletBalance} alt="Wallet" className="w-8 h-8 object-contain" />,
//     gradient: "from-purple-400 to-indigo-600"
//   },
//   {
//     question: "Is Jaimax Coin safe to use?",
//     answer: "Yes. Jaimax Coin is built on a decentralized blockchain...",
//     icon: <img src={Jcoin1}  alt="Shield" className="w-8 h-8 object-contain" />,
//     gradient: "from-orange-400 to-red-600"
//   },
//   {
//     question: "Where can I store my Jaimax Coins?",
//     answer: "You can store your Jaimax Coins securely in the official Jaimax Wallet...",
//     icon: <img src={balance} alt="Wallet Balance" className="w-8 h-8 object-contain" />,
//     gradient: "from-blue-400 to-cyan-600"
//   },
//   {
//     question: "How can I access Jaimax Coin?",
//     answer: "You can access Jaimax Coin directly through the Jaimax App...",
//     icon: <img src={ActiveMem} alt="Active Member" className="w-8 h-8 object-contain" />,
//     gradient: "from-pink-400 to-rose-600"
//   },
//   {
//     question: "What can I do with Jaimax Coin?",
//     answer: "Jaimax Coin can be used for fast and secure digital transactions...",
//     icon: <img src={Jcoin} alt="Jcoin" className="w-8 h-8 object-contain" />,
//     gradient: "from-yellow-400 to-amber-600"
//   },
//   {
//     question: "Can I use Jaimax Coin for real-world transactions?",
//     answer: "Yes, Jaimax is working on expanding real-world utility...",
//     icon: <img src={walletBal} alt="Wallet" className="w-8 h-8 object-contain" />,
//     gradient: "from-green-400 to-emerald-600"
//   },
//   {
//     question: "Is Jaimax listed on any crypto exchanges?",
//     answer: "Jaimax Coin is currently available exclusively through our platform...",
//     icon: <img src={Exchange} alt="Bitcoin" className="w-8 h-8 object-contain" />,
//     gradient: "from-violet-400 to-purple-600"
//   },
//   {
//     question: "What blockchain is Jaimax Coin built on?",
//     answer: "Jaimax Coin is developed on a reliable and high-performance blockchain...",
//     icon: <img src={bloackChain} alt="Blockchain" className="w-8 h-8 object-contain" />,
//     gradient: "from-indigo-400 to-blue-600"
//   },
//   {
//     question: "How can I stay updated with Jaimax Coin news?",
//     answer: "Stay connected by following our official Jaimax social channels...",
//     icon: <img src="https://www.svgrepo.com/show/530510/notifications.svg" alt="Notifications" className="w-8 h-8 object-contain" />,
//     gradient: "from-teal-400 to-cyan-600"
//   }
// ];

// export default function JaimaxFAQ() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-[#09535a] py-16 px-4">
//       <div className="text-center mb-16">
//         <h1 className="text-6xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-orange-400 bg-clip-text">
//           JAIMAX
//         </h1>
//         <p className="text-xl text-slate-200">Frequently Asked Questions</p>
//       </div>

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
//         {faqs.map((faq, index) => {
//           const isActive = activeIndex === index;
//           const gradientKey = faq.gradient.match(/from-(\w+)/)?.[1];
//           const borderColor = gradientColors[gradientKey] || "255 255 255";

//           return (
//             <div key={index} className="group transition-all duration-300">
//               <div
//                 className={clsx(
//                   "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all",
//                   isActive && "shadow-lg"
//                 )}
//               >
//                 <button
//                   aria-expanded={isActive}
//                   aria-controls={`faq-${index}`}
//                   onClick={() => toggleFAQ(index)}
//                   className="w-full flex items-center justify-between px-6 py-4 text-left text-white focus:outline-none"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className={`w-12 h-12 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center`}>
//                       {faq.icon}
//                     </div>
//                     <h3 className="text-lg font-medium">{faq.question}</h3>
//                   </div>
//                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-600">
//                     {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
//                   </div>
//                 </button>

//                 <div
//                   id={`faq-${index}`}
//                   role="region"
//                   aria-hidden={!isActive}
//                   className={clsx(
//                     "overflow-hidden transition-all duration-300",
//                     isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                   )}
//                 >
//                   <div className="px-6 pb-4">
//                     <div
//                       className="p-4 rounded-xl bg-slate-700/30"
//                       style={{ borderLeft: `4px solid rgb(${borderColor})` }}
//                     >
//                       <p className="text-sm text-slate-200">{faq.answer}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';
// import clsx from 'clsx';

// import jaimaxCoin from '../../assets/3dcoin.png';
// import balance from '../../assets/balance.svg';
// import ActiveMem from '../../assets/activeMem.png';
// import Jcoin from '../../assets/jcoin.png';
// import walletBal from '../../assets/walletBal.png';
// import bloackChain from '../../assets/blockChain.png';
// import walletBalance from '../../assets/walletBal.png';
// import Jcoin1 from '../../assets/logo.png';
// import Exchange from '../../assets/icon.png';

// /* Single light accent colour (rgb string, no spaces needed in Tailwind) */
// const LIGHT_CYAN = '186 230 253';

// const faqs = [
//   {
//     question: 'What is Jaimax Coin?',
//     answer: 'Jaimax Coin is a secure and innovative cryptocurrency...',
//     icon: <img src={jaimaxCoin} alt="Cryptocurrency" className="w-8 h-8 object-contain" />,
//     gradient: 'from-emerald-400 to-teal-600',
//   },
//   {
//     question: 'How is Jaimax Coin different from other cryptocurrencies?',
//     answer: 'Jaimax Coin is more than just a digital asset...',
//     icon: <img src={walletBalance} alt="Wallet" className="w-8 h-8 object-contain" />,
//     gradient: 'from-purple-400 to-indigo-600',
//   },
//   {
//     question: 'Is Jaimax Coin safe to use?',
//     answer: 'Yes. Jaimax Coin is built on a decentralized blockchain...',
//     icon: <img src={Jcoin1} alt="Shield" className="w-8 h-8 object-contain" />,
//     gradient: 'from-orange-400 to-red-600',
//   },
//   {
//     question: 'Where can I store my Jaimax Coins?',
//     answer: 'You can store your Jaimax Coins securely in the official Jaimax Wallet...',
//     icon: <img src={balance} alt="Wallet Balance" className="w-8 h-8 object-contain" />,
//     gradient: 'from-blue-400 to-cyan-600',
//   },
//   {
//     question: 'How can I access Jaimax Coin?',
//     answer: 'You can access Jaimax Coin directly through the Jaimax App...',
//     icon: <img src={ActiveMem} alt="Active Member" className="w-8 h-8 object-contain" />,
//     gradient: 'from-pink-400 to-rose-600',
//   },
//   {
//     question: 'What can I do with Jaimax Coin?',
//     answer: 'Jaimax Coin can be used for fast and secure digital transactions...',
//     icon: <img src={Jcoin} alt="Jcoin" className="w-8 h-8 object-contain" />,
//     gradient: 'from-yellow-400 to-amber-600',
//   },
//   {
//     question: 'Can I use Jaimax Coin for real-world transactions?',
//     answer: 'Yes, Jaimax is working on expanding real-world utility...',
//     icon: <img src={walletBal} alt="Wallet" className="w-8 h-8 object-contain" />,
//     gradient: 'from-green-400 to-emerald-600',
//   },
//   {
//     question: 'Is Jaimax listed on any crypto exchanges?',
//     answer: 'Jaimax Coin is currently available exclusively through our platform...',
//     icon: <img src={Exchange} alt="Exchange" className="w-8 h-8 object-contain" />,
//     gradient: 'from-violet-400 to-purple-600',
//   },
//   {
//     question: 'What blockchain is Jaimax Coin built on?',
//     answer: 'Jaimax Coin is developed on a reliable and high-performance blockchain...',
//     icon: <img src={bloackChain} alt="Blockchain" className="w-8 h-8 object-contain" />,
//     gradient: 'from-indigo-400 to-blue-600',
//   },
//   {
//     question: 'How can I stay updated with Jaimax Coin news?',
//     answer: 'Stay connected by following our official Jaimax social channels...',
//     icon: (
//       <img
//         src="https://www.svgrepo.com/show/530510/notifications.svg"
//         alt="Notifications"
//         className="w-8 h-8 object-contain"
//       />
//     ),
//     gradient: 'from-teal-400 to-cyan-600',
//   },
// ];

// export default function JaimaxFAQ() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   return (
//    <div className="min-h-screen bg-[#09535a] py-10 px-4 sm:px-6 lg:px-8">
//       {/* Heading */}
//       <div className="text-center mb-12 sm:mb-16">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-orange-400 bg-clip-text">
//           JAIMAX
//         </h1>
//         <p className="mt-2 text-base sm:text-lg md:text-xl text-slate-200">
//           Frequently Asked Questions
//         </p>
//       </div>

//       {/* FAQ grid */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
//         {faqs.map((faq, index) => {
//           const isActive = activeIndex === index;

//           return (
//             <div key={index} className="group transition-all duration-300">
//               <div
//                 className={clsx(
//                   'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden transition-all',
//                   isActive && 'shadow-lg'
//                 )}
//               >
//                 {/* Question row */}
//                 <button
//                   aria-expanded={isActive}
//                   aria-controls={`faq-${index}`}
//                   onClick={() => setActiveIndex(isActive ? null : index)}
//                   className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left text-white focus:outline-none"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2dd4bf] rounded-xl flex items-center justify-center">
//                       {faq.icon}
//                     </div>
//                     <h3 className="text-sm sm:text-base md:text-lg font-medium">
//                       {faq.question}
//                     </h3>
//                   </div>

//                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-600">
//                     {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
//                   </div>
//                 </button>

//                 {/* Answer */}
//                 <div
//                   id={`faq-${index}`}
//                   role="region"
//                   aria-hidden={!isActive}
//                   className={clsx(
//                     'overflow-hidden transition-all mt-3 duration-300',
//                     isActive ? 'max-h-105 opacity-100' : 'max-h-0 opacity-0'
//                   )}
//                 >
//                   <div className="px-4 sm:px-6 pb-4">
//                     <div
//                       className="p-4 rounded-xl bg-slate-700/30"
//                       style={{ borderLeft: `4px solid rgb(${LIGHT_CYAN})` }}
//                     >
//                       <p className="text-sm sm:text-base text-slate-200">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

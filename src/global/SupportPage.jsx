// import React, { useEffect, useState } from "react";
// import { Mail, Shield, Clock, Zap, AlertTriangle, Headphones } from "lucide-react";

// const SupportPage = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="min-h-screen relative overflow-hidden">

//       <div className="relative z-10 container mx-auto px-4 py-16">
//         {/* Hero Section */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

//           <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
//             Support
//           </h1>
//           <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6"></div>
//           <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//             Your crypto journey never sleeps, and neither do we. Expert guidance at your fingertips, anytime, anywhere.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           {[
//             {
//               icon: Clock,
//               title: "Always Available",
//               description: "Round-the-clock support for all your cryptocurrency needs",
//               delay: "delay-200"
//             },
//             {
//               icon: Zap,
//               title: "Lightning Fast",
//               description: "Quick responses and prompt resolutions to keep you moving",
//               delay: "delay-400"
//             },
//             {
//               icon: Shield,
//               title: "Expert Guidance",
//               description: "Professional team with deep cryptocurrency expertise",
//               delay: "delay-600"
//             }
//           ].map((feature, index) => (
//             <div
//               key={index}
//               className={`group relative bg-white/5 rounded-3xl p-8 hover:scale-105 hover:bg-white/10 transition-all duration-500 ${isVisible ? `animate-fade-in-up ${feature.delay}` : 'opacity-0'}`}
//             >
//               <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="relative z-10">
//                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                   <feature.icon className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
//                 <p className="text-white/80 leading-relaxed">{feature.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-2 gap-12 mb-16">
//           {/* Support Information */}
//           <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//             <div className="bg-white/5 rounded-3xl p-8 h-full">
//               <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
//                 <Mail className="w-8 h-8 mr-3 text-white" />
//                 Get In Touch
//               </h2>
//               <div className="space-y-6">
//                 <p className="text-white/80 leading-relaxed text-lg">
//                   Our dedicated support team is here for you anytime, anywhere, ready to provide expert guidance and prompt resolutions to enhance your cryptocurrency experience.
//                 </p>
//                 <p className="text-white/80 leading-relaxed text-lg">
//                   Enjoy peace of mind with our always-on support service, available 24/7 to help you navigate any challenges related to your cryptocurrency transactions or account management.
//                 </p>

//                 {/* Contact Buttons */}
//                 <div className="space-y-4 pt-6">
//                   <h3 className="text-xl font-semibold text-white mb-4">Contact Us:</h3>
//                   <a
//                     href="mailto:support@jaimax.com"
//                     className="group flex items-center justify-between bg-white/20 hover:bg-white/30 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
//                   >
//                     <div className="flex items-center">
//                       <Mail className="w-5 h-5 mr-3" />
//                       <span className="font-semibold">support@jaimax.com</span>
//                     </div>
//                     <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
//                   </a>
//                   <a
//                     href="mailto:office@jaimax.com"
//                     className="group flex items-center justify-between bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
//                   >
//                     <div className="flex items-center">
//                       <Mail className="w-5 h-5 mr-3" />
//                       <span className="font-semibold">office@jaimax.com</span>
//                     </div>
//                     <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Risk Disclosure */}
//           <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//             <div className="bg-white/10 rounded-3xl p-8 h-full">
//               <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
//                 <AlertTriangle className="w-8 h-8 mr-3 text-white" />
//                 Risk Disclosure
//               </h2>
//               <div className="bg-white/10 rounded-2xl p-6">
//                 <p className="text-white/80 leading-relaxed text-lg mb-4">
//                   <strong className="text-white">Important:</strong> Cryptocurrency markets are highly volatile, and prices can fluctuate dramatically in short periods. Investors may experience significant gains or losses.
//                 </p>
//                 <p className="text-white/80 leading-relaxed text-lg">
//                   The regulatory environment for cryptocurrencies varies by jurisdiction and can change rapidly. This can affect the legality and accessibility of certain services or products.
//                 </p>
//                 <div className="mt-6 p-4 bg-white/10 rounded-xl">
//                   <p className="text-white text-sm font-medium">
//                     💡 Always do your own research and never invest more than you can afford to lose.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="bg-white/10 rounded-3xl p-8">
//             <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
//             <p className="text-white/80 mb-6 max-w-2xl mx-auto">
//               Don't let questions hold you back. Our expert team is standing by to help you succeed in your crypto journey.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="mailto:support@jaimax.com"
//                 className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
//               >
//                 <Mail className="w-5 h-5 mr-2" />
//                 Contact Support
//               </a>
//               <a
//                 href="mailto:office@jaimax.com"
//                 className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
//               >
//                 General Inquiries
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//         }
//         .delay-200 { animation-delay: 200ms; }
//         .delay-400 { animation-delay: 400ms; }
//         .delay-600 { animation-delay: 600ms; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// };

// export default SupportPage;



import React from "react";

const SupportAndRiskDisclosure = () => {
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl mx-auto space-y-8">
        {/* 24/7 Support Section */}
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            24/7 Support
            {/* <span role="img" aria-label="support">💬</span> */}
          </h2>
          <p className="text-teal-800 mb-4">
            At <span className="font-semibold text-teal-600">Jaimax</span>, your experience is our top priority. That’s why we’ve built a responsive and reliable 24/7 customer support system designed to assist you every step of the way in your crypto journey.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-teal-900 mb-4">
            <li>• Account setup and verification</li>
            <li>• KYC/AML processes</li>
            <li>• Wallet management and security</li>
            <li>• Transaction issues or delays</li>
            <li>• Platform navigation</li>
            <li>• General queries and concerns</li>
          </ul>
          <p className="text-teal-800 mb-2">
            Our goal is to ensure that every user enjoys a seamless, secure, and confident experience while using Jaimax. No matter the time or day — we're just a message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-teal-700 font-medium">
            <a href="mailto:support@jaimax.com" className="hover:underline">support@jaimax.com</a>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:info@jaimax.com" className="hover:underline">info@jaimax.com</a>
          </div>
          <p className="text-teal-500 text-sm mt-3">
            We’re committed to giving you fast, friendly, and helpful responses to keep your crypto experience smooth and stress-free.
          </p>
        </section>

        {/* Risk Disclosure Section */}
        <section className="bg-white border border-teal-100 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 flex items-center gap-2">
            Risk Disclosure
            {/* <span role="img" aria-label="warning">⚠️</span> */}
          </h2>
          <p className="text-teal-800 mb-4">
            <span className="font-semibold">Please Read Before You Invest</span>
            <br />
            Investing in cryptocurrency involves substantial risk. The value of digital assets like Jaimax Coin can rise or fall rapidly based on market demand, regulatory changes, technological developments, or investor sentiment.
          </p>
          <ul className="space-y-2 text-teal-900 mb-4">
            <li>
              <span className="font-bold text-teal-600">Market Volatility:</span> Cryptocurrency prices are highly volatile and can fluctuate sharply within short timeframes. This means potential for both significant gains and losses.
            </li>
            <li>
              <span className="font-bold text-teal-500"> Regulatory Impact:</span> Regulations vary across countries and can change without notice. These shifts can impact how cryptocurrencies are bought, sold, traded, or used in your region.
            </li>
            <li>
              <span className="font-bold text-teal-400"> Security Responsibility:</span> While Jaimax implements strong security measures, users are also responsible for securing their wallets, passwords, and devices. Always use caution with third-party platforms and avoid sharing sensitive information.
            </li>
          </ul>
          <div className="mb-4">
            <span className="font-semibold text-teal-800">We encourage you to:</span>
            <ul className="list-disc list-inside text-teal-900 mt-1 space-y-1">
              <li>Do your own research before investing</li>
              <li>Understand the risks involved</li>
              <li>Only invest what you can afford to lose</li>
              <li>Seek professional advice when needed</li>
            </ul>
          </div>
          <p className="text-teal-500 text-sm">
            By using Jaimax, you acknowledge and accept these risks and agree to stay informed about market and legal changes that may impact your crypto assets.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SupportAndRiskDisclosure;
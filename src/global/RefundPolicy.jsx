// import React, { useEffect } from "react";

// const RefundPolicy = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         <div className="relative max-w-6xl mx-auto px-6 py-16">
//           <div className="text-center">
//             <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
//               Refund Policy
//             </h1>
//             <div className="w-24 h-1 bg-white mx-auto rounded-full mb-8"></div>
//             <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//               At Jaimax Coin, we strive to provide a transparent and satisfactory experience to all our users. 
//               This Refund Policy outlines the circumstances under which refunds may be granted for our services.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-6 pb-16">
//         <div className="bg-white/5 rounded-2xl overflow-hidden">
//           <div className="p-8 md:p-12 space-y-12">
            
//             {/* Section 1: Eligibility */}
//             <section className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                   1
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Eligibility for Refunds</h2>
//               </div>
              
//               <p className="text-white/90 text-lg leading-relaxed">
//                 Refunds may be considered under the following conditions:
//               </p>
              
//               <div className="grid gap-4">
//                 <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
//                   <h3 className="text-lg font-semibold text-white mb-3">Technical Issues</h3>
//                   <p className="text-white/80 leading-relaxed">
//                     If you experience technical difficulties that prevent you from using our platform as intended, 
//                     you may be eligible for a refund.
//                   </p>
//                 </div>
                
//                 <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
//                   <h3 className="text-lg font-semibold text-white mb-3">Failed Transactions</h3>
//                   <p className="text-white/80 leading-relaxed">
//                     In the event of a failed transaction due to system errors or other issues, a refund may be granted.
//                   </p>
//                 </div>
                
//                 <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
//                   <h3 className="text-lg font-semibold text-white mb-3">Dissatisfaction</h3>
//                   <p className="text-white/80 leading-relaxed">
//                     If you are dissatisfied with our services and wish to terminate your account within a specified 
//                     timeframe, a refund may be evaluated on a case-by-case basis.
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* Section 2: Process */}
//             <section className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                   2
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Refund Process</h2>
//               </div>
              
//               <p className="text-white/90 text-lg leading-relaxed">
//                 To request a refund, please follow these steps:
//               </p>
              
//               <div className="space-y-4">
//                 {[
//                   {
//                     step: "Contact Support",
//                     description: "Reach out to our customer support team at [support email] within [number of days] days of the issue.",
//                     icon: "📞"
//                   },
//                   {
//                     step: "Provide Details",
//                     description: "Explain the reason for your refund request, providing relevant details such as transaction ID, account information, and a clear description of the issue.",
//                     icon: "📋"
//                   },
//                   {
//                     step: "Evaluation",
//                     description: "Our team will review your request and assess your eligibility for a refund based on the outlined criteria.",
//                     icon: "🔍"
//                   },
//                   {
//                     step: "Refund Approval",
//                     description: "If your refund request is approved, we will initiate the refund process within 7-14 days.",
//                     icon: "✅"
//                   }
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-start space-x-4 bg-white/5 rounded-lg p-6">
//                     <div className="text-2xl">{item.icon}</div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-white mb-2">{item.step}</h3>
//                       <p className="text-white/80 leading-relaxed">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Section 3: Non-Refundable */}
//             <section className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                   3
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Non-Refundable Circumstances</h2>
//               </div>
              
//               <p className="text-white/90 text-lg leading-relaxed">
//                 Please note that refunds will not be granted in the following cases:
//               </p>
              
//               <div className="grid gap-4">
//                 <div className="bg-white/10 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-white mb-3">Change of Mind</h3>
//                   <p className="text-white/80 leading-relaxed">
//                     Refunds will not be provided for services used or purchased based on a change of mind.
//                   </p>
//                 </div>
                
//                 <div className="bg-white/10 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-white mb-3">Investment Outcomes</h3>
//                   <p className="text-white/80 leading-relaxed">
//                     Cryptocurrency investments carry inherent risks, and we do not provide refunds based on 
//                     the performance of your investments.
//                   </p>
//                 </div>
                
//                 <div className="bg-white/10 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-white mb-3">Violation of Terms</h3>
//                   <p className="text-white/80 leading-relaxed">
//                     If your account has been found in violation of our Terms and Conditions, you will not be 
//                     eligible for a refund.
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* Section 4: Contact */}
//             <section className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                   4
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Contact Us</h2>
//               </div>
              
//               <div className="bg-white/10 rounded-lg p-6">
//                 <p className="text-white/90 text-lg leading-relaxed">
//                   If you have any questions or concerns about our refund policy, please contact us at{" "}
//                   <a href="mailto:info@jaimax.in" className="text-white hover:text-white/80 transition-colors font-semibold underline">
//                     info@jaimax.in
//                   </a>
//                   . We are here to assist you and ensure a fair resolution to any issues you may encounter.
//                 </p>
//               </div>
//             </section>

//             {/* Section 5: Updates */}
//             <section className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                   5
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Policy Updates</h2>
//               </div>
              
//               <div className="bg-white/10 rounded-lg p-6">
//                 <p className="text-white/90 text-lg leading-relaxed mb-4">
//                   We may update this Refund Policy from time to time to reflect changes in our practices or 
//                   legal requirements. Any revisions will be posted on our website, and your continued use of 
//                   our services after such changes signifies your acceptance of the updated policy.
//                 </p>
//                 <p className="text-white/90 text-lg leading-relaxed">
//                   Please carefully review this Refund Policy before using our services. If you have any queries 
//                   or require further clarification, do not hesitate to contact us.
//                 </p>
//               </div>
//             </section>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default RefundPolicy;



import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl mx-auto space-y-8">
        <section className="bg-teal-50 rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
            Return Policy
            {/* <span role="img" aria-label="policy">📄</span> */}
          </h2>
          <p className="text-teal-800 mb-6">
            At <span className="font-semibold text-teal-600">Jaimax</span>, we are committed to operating with clarity and integrity. Due to the decentralized nature of blockchain technology and the volatile nature of crypto markets, the following terms apply to any returns, exits, or unforeseen events:
          </p>

          {/* 1. Company Loss or Shutdown Scenario */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-2">1. Company Loss or Shutdown Scenario</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-2">
              <li>
                In the unfortunate event that Jaimax faces major financial losses, legal restrictions, or business closure:
                <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-teal-800">
                  <li>
                    Jaimax will aim to return <span className="font-semibold text-teal-600">up to 80%</span> of the user’s eligible assets or holdings, based on the availability of company reserves and subject to regulatory conditions.
                  </li>
                  <li>
                    The remaining amount (up to 20%) may be retained to cover company liabilities, legal costs, and final operational expenses.
                  </li>
                  <li>
                    This return is <span className="font-semibold text-teal-600">not guaranteed</span> and will be processed based on available resources and final audit results.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* 2. Voluntary Exit by User */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-2">2. Voluntary Exit by User</h3>
            <ul className="list-disc list-inside text-teal-900 space-y-2">
              <li>
                If a user voluntarily chooses to leave Jaimax or withdraw participation without any issue on the company's part:
                <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-teal-800">
                  <li>No refund or return of any funds, tokens, or investments will be provided.</li>
                  <li>Users are solely responsible for managing and withdrawing their digital assets, if any, before exiting.</li>
                  <li>Once exited, the user forfeits all benefits, bonuses, rewards, or pending entitlements from Jaimax.</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-white border border-teal-100 rounded-lg p-4">
            <h4 className="font-semibold text-teal-700 mb-2">Important Note</h4>
            <ul className="list-disc list-inside text-teal-900 space-y-1">
              <li>
                By participating in Jaimax, users acknowledge and agree that cryptocurrency investments are high-risk and subject to market fluctuations.
              </li>
              <li>
                Jaimax reserves the right to modify this policy based on legal, regulatory, or financial requirements.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
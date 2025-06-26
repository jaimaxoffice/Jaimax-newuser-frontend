// import React from "react";

// const Security = () => {
//   return (
//     <div className="w-full bg-[#1d8e85] min-h-screen px-4 sm:px-6 lg:px-8 py-10 text-[#eafaf9] text-justify relative overflow-hidden">

//       {/* Glow Orbs (optional for soft animated background) */}
//       <div className="absolute top-[-30px] left-[-30px] w-40 h-40 bg-[#5fffe2]/10 blur-2xl rounded-full animate-pulse pointer-events-none" />
//       <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#84fff4]/10 blur-3xl rounded-full animate-ping pointer-events-none" />

//       <div className="relative z-10 space-y-12">

//         {/* Page Title */}
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-r from-[#a6fff4] to-[#26a69a] bg-clip-text animate-fadeIn">
//           Legal Details
//         </h1>

//         {/* Terms Section */}
//         <section className="space-y-8 animate-fadeIn delay-200">
//           <h2 className="text-2xl font-semibold text-[#b2fef7] border-b border-[#ffffff22] pb-2">Terms and Conditions</h2>
//           <p className="text-white/90 leading-relaxed">
//             Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services...
//           </p>

//           <ol className="list-decimal pl-6 space-y-6 marker:text-teal-300 marker:font-bold">
//             {[
//               {
//                 title: "Account Security",
//                 desc: "You are responsible for maintaining the security of your account credentials. JAIMAX shall not be liable for any unauthorized access."
//               },
//               {
//                 title: "Suspicious Activity",
//                 desc: "JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity."
//               },
//               {
//                 title: "Compliance and Conduct",
//                 desc: "You agree not to tamper with services or impersonate others."
//               },
//               {
//                 title: "Financial Obligations",
//                 desc: "Any excess deposits or profits from bugs must be returned to JAIMAX."
//               },
//               {
//                 title: "Fraud and Security",
//                 desc: "Accounts involved in fraud will be suspended pending investigation."
//               },
//               {
//                 title: "Prohibited Uses",
//                 desc: "Misuse or unauthorized interference may result in account termination."
//               },
//               {
//                 title: "Limitation of Liability",
//                 desc: "JAIMAX is not liable for indirect or incidental damages."
//               },
//               {
//                 title: "Disclaimer",
//                 desc: "You use our platform at your own risk."
//               },
//               {
//                 title: "Governing Law",
//                 desc: "Terms are governed by the laws of your jurisdiction."
//               },
//               {
//                 title: "Changes to Terms",
//                 desc: "JAIMAX may update terms at any time."
//               },
//               {
//                 title: "Contact Us",
//                 desc: "For help, contact support@jaimax.com"
//               }
//             ].map((item, index) => (
//               <li key={index}>
//                 <strong className="text-[#5fffe2]">{item.title}:</strong>
//                 <p className="mt-1 text-white/90">{item.desc}</p>
//               </li>
//             ))}
//           </ol>
//         </section>

//         {/* Privacy Policy Section */}
//         <section className="space-y-8 animate-fadeIn delay-300">
//           <h2 className="text-2xl font-semibold text-[#84fff4] border-b border-[#ffffff22] pb-2">Privacy Policy</h2>

//           <ol className="list-decimal pl-6 space-y-6 marker:text-teal-300 marker:font-bold">
//             <li>
//               <strong className="text-[#5fffe2]">Introduction:</strong>
//               <p className="mt-1">JAIMAX respects your privacy and complies with this policy.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Personal Data We Collect:</strong>
//               <p className="mt-1">We collect only necessary data:</p>
//               <ul className="list-disc pl-6 mt-2 text-white/80 space-y-1">
//                 <li>Account Info (name, ID)</li>
//                 <li>Payment Details</li>
//                 <li>Device & Usage Data</li>
//                 <li>Third-party verification data</li>
//               </ul>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Retention and Deletion:</strong>
//               <p className="mt-1">Data is retained only as long as required.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">International Transfers:</strong>
//               <p className="mt-1">Your data may be stored securely outside your region.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Third-Party Sharing:</strong>
//               <p className="mt-1">Only shared for necessary operations with safeguards.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Data Security:</strong>
//               <p className="mt-1">Encrypted, secured on AWS, and access-controlled.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Managing Preferences:</strong>
//               <p className="mt-1">You can opt-out or adjust preferences anytime.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Automated Decision-Making:</strong>
//               <p className="mt-1">You have the right to opt out of profiling systems.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Policy Review:</strong>
//               <p className="mt-1">Reviewed annually and updated as needed.</p>
//             </li>
//             <li>
//               <strong className="text-[#5fffe2]">Contact:</strong>
//               <p className="mt-1">
//                 Reach us at{" "}
//                 <a
//                   className="text-blue-300 underline hover:text-white transition"
//                   href="https://jaimax.com/support-page"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   jaimax.com/support-page
//                 </a>
//               </p>
//             </li>
//           </ol>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Security;



// import React from "react";

// const Security = () => {
//   return (
//     <div className="w-full bg-[#1d8e85] min-h-screen px-4 sm:px-6 lg:px-8 py-10 text-[#eafaf9] text-justify relative overflow-hidden">

//       {/* Glow Orbs (optional for soft animated background) */}
//       <div className="absolute top-[-30px] left-[-30px] w-40 h-40 bg-[#5fffe2]/10 blur-2xl rounded-full animate-pulse pointer-events-none" />
//       <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#84fff4]/10 blur-3xl rounded-full animate-ping pointer-events-none" />

//       <div className="relative z-10 space-y-12">

//         {/* Page Title */}
//         <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-r from-[#a6fff4] to-[#26a69a] bg-clip-text animate-fadeIn">
//           Legal Details
//         </h1>

//         {/* Terms Section */}
//         <section className="space-y-8 animate-fadeIn delay-200">
//           <h2 className="text-2xl font-semibold text-[#b2fef7] border-b border-[#ffffff22] pb-2">Terms and Conditions</h2>
//           <p className="text-white/90 leading-relaxed">
//             Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
//           </p>

//           <div className="space-y-6">
            
//             {/* Account Security */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Account Security</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account.</li>
//                 <li>You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities.</li>
//                 <li>JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password.</li>
//                 <li>Promptly notify JAIMAX of any unauthorized access or use of your account.</li>
//               </ul>
//             </div>

//             {/* Suspicious Activity */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Suspicious Activity</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.</li>
//               </ul>
//             </div>

//             {/* Compliance and Conduct */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Compliance and Conduct</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>You agree not to disrupt or attempt to tamper with JAIMAX's services or servers in any manner that could harm our platform.</li>
//                 <li>Respect the privacy of others and refrain from disclosing personal information without consent.</li>
//                 <li>Do not impersonate JAIMAX employees or any other individuals.</li>
//               </ul>
//             </div>

//             {/* Financial Obligations */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Financial Obligations</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>Any excess deposits or withdrawals mistakenly made to your account must be promptly returned. Failure to do so may result in legal action.</li>
//                 <li>Profits gained from exploiting platform inconsistencies must be returned to JAIMAX.</li>
//               </ul>
//             </div>

//             {/* Fraud and Security */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Fraud and Security</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>Accounts involved in fraudulent or suspicious activities will be temporarily suspended pending investigation by JAIMAX.</li>
//               </ul>
//             </div>

//             {/* Prohibited Uses */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Prohibited Uses</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>Misuse of our services, including unauthorized access or interference, may result in the suspension or termination of your account.</li>
//               </ul>
//             </div>

//             {/* Limitation of Liability */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Limitation of Liability</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>JAIMAX and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</li>
//               </ul>
//             </div>

//             {/* Disclaimer */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Disclaimer</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.</li>
//               </ul>
//             </div>

//             {/* Governing Law */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Governing Law</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>These Terms are governed by the laws of Your Jurisdiction, without regard to its conflict of law provisions.</li>
//               </ul>
//             </div>

//             {/* Changes to Terms */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Changes to Terms</h3>
//               <ul className="list-disc pl-6 space-y-2 text-white/90">
//                 <li>JAIMAX reserves the right to modify these Terms at any time. Revised Terms will be effective upon posting on our website.</li>
//               </ul>
//             </div>

//             {/* Contact Us */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">Contact Us</h3>
//               <p className="text-white/90">
//                 If you have any questions or concerns regarding these Terms and Conditions, please contact us at{" "}
//                 <a 
//                   href="mailto:support@jaimax.com"
//                   className="text-blue-300 underline hover:text-white transition"
//                 >
//                   support@jaimax.com
//                 </a>.
//               </p>
//             </div>

//           </div>
//         </section>

//         {/* Privacy Policy Section */}
//         <section className="space-y-8 animate-fadeIn delay-300">
//           <h2 className="text-2xl font-semibold text-[#84fff4] border-b border-[#ffffff22] pb-2">Privacy Policy</h2>

//           <div className="space-y-6">
            
//             {/* Introduction */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">1. Introduction</h3>
//               <div className="space-y-3 text-white/90">
//                 <p>
//                   In this policy, we, us, our, and JAIMAX refer to JAIMAX. For more information about us and how to contact us, see Section 10. We respect your privacy and are committed to protecting it through our compliance with this Policy.
//                 </p>
//                 <p>
//                   This privacy policy (Policy) applies when we are acting as a data controller with respect to the personal data of our users. This Policy describes how we collect, use, and share personal data of consumer users across our websites, including www.Jaimax.com (the Website), JAIMAX's mobile and desktop application (the App), and services offered to users (collectively with the Website and the App, the Services), and from our partners and other third parties. When using any of our Services, you consent to the collection, transfer, storage, disclosure, and use of your personal data as described in this Policy. This Policy does not apply to anonymized data, as it cannot be used to identify you.
//                 </p>
//                 <p>
//                   Please read this Policy carefully to understand our policies and practices regarding your personal data and how we will treat it. By accessing or using the Services, you agree to this Policy. Our Services also incorporate privacy controls which affect how we will process your personal data. Please refer to Section 5 for a list of rights with regard to your personal data and how to exercise them.
//                 </p>
//                 <p>
//                   This Policy may change from time to time. Your continued use of the Services after we make changes is deemed to be acceptance of those changes, so please check the Policy periodically for updates.
//                 </p>
//                 <p>
//                   To improve accessibility for all users, a summary and/or FAQ section is included at the beginning of this policy, written in plain language.
//                 </p>
//               </div>
//             </div>

//             {/* Personal Data We Collect */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">2. Personal Data We Collect About You and How We Collect It</h3>
//               <div className="space-y-3 text-white/90">
//                 <p>
//                   We collect only the data necessary for each specific purpose, ensuring we adhere to the principles of data minimization and purpose limitation. We do not process data for unrelated purposes without further consent.
//                 </p>
//                 <p>There are three general categories of personal data we collect:</p>
                
//                 <div className="ml-4 space-y-3">
//                   <div>
//                     <p className="font-semibold text-[#5fffe2]">2.1 Information You Give to Us</p>
//                     <div className="ml-4 space-y-2">
//                       <p>(a) <strong>Account Data:</strong> We collect personal identification information such as your name, date of birth, age, nationality, gender, signature, utility bills, photographs, phone number, home address, email address, and formal identification information. This information is necessary for adequate performance of our contract with you and to comply with legal obligations.</p>
//                       <p>(b) <strong>Payment Information:</strong> We process financial information such as bank account, credit card, or PayPal information to facilitate the processing of payments. This is collected only as needed for the contractual relationship or legitimate business interests in service delivery.</p>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <p className="font-semibold text-[#5fffe2]">2.2 Information We Automatically Collect</p>
//                     <p className="ml-4">When you use the Services, we may automatically process information about your device, usage patterns, and transactional data to improve the user experience and functionality of our Services.</p>
//                   </div>
                  
//                   <div>
//                     <p className="font-semibold text-[#5fffe2]">2.3 Information We Collect from Third Parties</p>
//                     <p className="ml-4">We may obtain information from public databases, credit bureaus, ID verification partners, joint marketing partners, and social media platforms for identity verification, as required for compliance with our legal obligations.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Retention and Deletion */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">3. Retention and Deletion of Personal Data</h3>
//               <div className="space-y-3 text-white/90">
//                 <p>
//                   We retain personal data only for as long as necessary to fulfill contractual obligations or comply with legal obligations. For example, financial data may be retained for up to 7 years after a transaction to meet auditing requirements.
//                 </p>
//                 <p>
//                   Users may request the deletion of their data if it is no longer needed for the purposes it was collected.
//                 </p>
//               </div>
//             </div>

//             {/* International Transfers */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">4. International Transfers of Your Personal Data</h3>
//               <div className="space-y-3 text-white/90">
//                 <p>
//                   We may transfer, store, and process your data outside the EEA, including countries where our affiliates and third-party service providers are located.
//                 </p>
//                 <p>
//                   Appropriate safeguards, such as Standard Contractual Clauses (SCCs) or adequacy decisions, are in place to ensure an adequate level of data protection for international transfers. You have the right to request more details regarding these safeguards.
//                 </p>
//               </div>
//             </div>

//             {/* Third-Party Data Sharing */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">5. Third-Party Data Sharing</h3>
//               <p className="text-white/90">
//                 We may share data with specific third parties, such as payment processors, ID verification services, and analytics providers. Data sharing with each third party is limited to the purpose required, such as processing payments or verifying identity.
//               </p>
//             </div>

//             {/* Data Security */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">6. Data Security</h3>
//               <p className="text-white/90">
//                 We employ a combination of technical and organizational measures to secure your data, including encryption standards, multi-factor authentication, and monitoring practices. Only authorized personnel can access your information, and all data is securely stored on Amazon AWS servers. Despite our security measures, internet transmission of data carries some risks, so transmission is at the user's discretion.
//               </p>
//             </div>

//             {/* Managing Data Collection */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">7. Managing Data Collection and Marketing Preferences</h3>
//               <p className="text-white/90">
//                 Users have the option to manage their data preferences through a privacy preferences center, where they can opt-out of certain types of data processing or third-party sharing. Users may contact support for assistance or use the provided link for immediate preference management.
//               </p>
//             </div>

//             {/* Automated Decision-Making */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">8. Automated Decision-Making and Profiling</h3>
//               <p className="text-white/90">
//                 Where automated systems are used for profiling (e.g., fraud detection or targeted marketing), we provide transparency regarding the impact on the user and ensure rights related to automated decision-making. Users can request more information or opt out of profiling if desired.
//               </p>
//             </div>

//             {/* Policy Review */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">9. Policy Review and Update Schedule</h3>
//               <p className="text-white/90">
//                 This policy is reviewed annually to remain compliant with evolving legal requirements and industry standards. Significant changes to the policy will be communicated to users via email or an in-app notification.
//               </p>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#5fffe2] mb-3">10. Contact Information</h3>
//               <p className="text-white/90">
//                 If you have questions, concerns, or requests regarding this policy, please contact us via our support page at{" "}
//                 <a 
//                   href="https://jaimax.com/support-page"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-300 underline hover:text-white transition"
//                 >
//                   https://jaimax.com/support-page
//                 </a>
//               </p>
//             </div>

//           </div>
//         </section>

//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
//         .delay-200 {
//           animation-delay: 0.2s;
//         }
//         .delay-300 {
//           animation-delay: 0.3s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Security;


// import React from "react";

// const Security = () => {
//   return (
//     <div className="w-full  bg-[#1d8e85] min-h-screen px-4 sm:px-6 lg:px-8 py-12 text-gray-100">
//       {/* Removed max-w-3xl mx-auto so content spans full width with padding */}

//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-white mb-2">Legal Documentation</h1>
//         <p className="text-gray-400 text-lg">
//           Review our terms of service and privacy policy
//         </p>
//       </div>

//       {/* Terms and Conditions Section */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-blue-400 pl-4">
//           Terms and Conditions
//         </h2>
//         <p className="text-gray-300 mb-6">
//           Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
//         </p>

//         {/* Account Security */}
//         <h3 className="text-2xl font-semibold text-blue-400 mb-4">Account Security</h3>
//         <ul className="list-disc list-inside space-y-3 text-gray-300 mb-8">
//           <li>You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account.</li>
//           <li>You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities.</li>
//           <li>JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password.</li>
//           <li>Promptly notify JAIMAX of any unauthorized access or use of your account.</li>
//         </ul>

//         {/* Suspicious Activity */}
//         <h3 className="text-xl font-semibold text-blue-400 mb-2">Suspicious Activity</h3>
//         <p className="text-gray-300 mb-6">
//           JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.
//         </p>

//         {/* Compliance and Conduct */}
//         <h3 className="text-xl font-semibold text-blue-400 mb-2">Compliance and Conduct</h3>
//         <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
//           <li>You agree not to disrupt or attempt to tamper with JAIMAX's services or servers.</li>
//           <li>Respect the privacy of others and refrain from disclosing personal information without consent.</li>
//           <li>Do not impersonate JAIMAX employees or any other individuals.</li>
//         </ul>

//         {/* Financial Obligations */}
//         <h3 className="text-xl font-semibold text-blue-400 mb-2">Financial Obligations</h3>
//         <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
//           <li>Any excess deposits or withdrawals mistakenly made must be promptly returned.</li>
//           <li>Profits from exploiting platform inconsistencies must be returned to JAIMAX.</li>
//         </ul>

//         {/* Fraud and Security */}
//         <h3 className="text-xl font-semibold text-blue-400 mb-2">Fraud and Security</h3>
//         <p className="text-gray-300 mb-6">
//           Accounts involved in fraudulent activities will be suspended pending investigation.
//         </p>

//         {/* Important Notices */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-orange-400 mb-2">Disclaimer</h3>
//           <p className="text-orange-300 mb-4">
//             Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
//           </p>

//           <h3 className="text-xl font-semibold text-green-400 mb-2">Contact Information</h3>
//           <p className="text-green-300">
//             For questions regarding these Terms and Conditions, contact us at{" "}
//             <a href="mailto:support@jaimax.com" className="underline hover:text-green-200">
//               support@jaimax.com
//             </a>
//           </p>
//         </div>
//       </section>

//       {/* Privacy Policy Section */}
//       <section>
//         <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-purple-400 pl-4">
//           Privacy Policy
//         </h2>
//         <p className="text-gray-400 mb-8">How we protect and handle your personal information</p>

//         {/* Introduction */}
//         <h3 className="text-xl font-semibold text-purple-400 mb-3">Introduction</h3>
//         <p className="text-gray-300 mb-4">
//           We respect your privacy and are committed to protecting it through our compliance with this Policy. This privacy policy applies when we are acting as a data controller with respect to the personal data of our users.
//         </p>
//         <p className="text-gray-300 mb-8">
//           By accessing or using the Services, you agree to this Policy. Please read this Policy carefully to understand our policies and practices regarding your personal data.
//         </p>

//         {/* Personal Data We Collect */}
//         <h3 className="text-2xl font-semibold text-purple-400 mb-4 border-l-4 border-purple-400 pl-4">
//           Personal Data We Collect
//         </h3>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">Information You Provide</h4>
//         <ul className="list-disc list-inside text-gray-300 mb-6">
//           <li><strong>Account Data:</strong> Personal identification information such as name, date of birth, nationality, phone number, home address, and email address.</li>
//           <li><strong>Payment Information:</strong> Financial information such as bank account, credit card, or PayPal details for payment processing.</li>
//         </ul>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">Automatically Collected Information</h4>
//         <p className="text-gray-300 mb-6">
//           Device information, usage patterns, and transactional data to improve user experience and service functionality.
//         </p>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">Third-Party Information</h4>
//         <p className="text-gray-300 mb-8">
//           Information from public databases, credit bureaus, and ID verification partners for identity verification and compliance purposes.
//         </p>

//         {/* Key Policies */}
//         <h3 className="text-2xl font-semibold text-purple-400 mb-4 border-l-4 border-purple-400 pl-4">
//           Key Policies
//         </h3>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">Data Retention</h4>
//         <ul className="list-disc list-inside text-gray-300 mb-6">
//           <li>We retain personal data only as long as necessary to fulfill contractual obligations or comply with legal requirements.</li>
//           <li>Financial data may be retained for up to 7 years for auditing purposes.</li>
//         </ul>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">Data Security</h4>
//         <ul className="list-disc list-inside text-gray-300 mb-6">
//           <li>We employ encryption standards, multi-factor authentication, and monitoring practices to secure your data.</li>
//           <li>Data is securely stored on Amazon AWS servers with restricted access to authorized personnel only.</li>
//         </ul>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">International Transfers</h4>
//         <ul className="list-disc list-inside text-gray-300 mb-6">
//           <li>We may transfer and process your data outside the EEA with appropriate safeguards in place.</li>
//           <li>Standard Contractual Clauses ensure adequate data protection for international transfers.</li>
//         </ul>

//         <h4 className="text-lg font-semibold text-purple-300 mb-2">Third-Party Sharing</h4>
//         <p className="text-gray-300 mb-8">
//           Data sharing with payment processors, ID verification services, and analytics providers is limited to required purposes only.
//         </p>

//         {/* Contact Section */}
//         <h3 className="text-xl font-semibold text-indigo-400 mb-2">Questions About Privacy?</h3>
//         <p className="text-indigo-300">
//           For questions or concerns regarding this privacy policy, visit our support page at{" "}
//           <a
//             href="https://jaimax.com/support-page"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="underline hover:text-indigo-200"
//           >
//             jaimax.com/support-page
//           </a>
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Security;

import React from "react";

const Security = () => {
  return (
    <div className="w-full bg-[#1d8e85] min-h-screen px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Legal Documentation</h1>
        <p className="text-gray-100 text-lg">
          Review our terms of service and privacy policy
        </p>
      </div>

      {/* Terms and Conditions Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-white pl-4">
          Terms and Conditions
        </h2>
        <p className="text-white/90 mb-6">
          Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
        </p>

        <h3 className="text-2xl font-semibold text-white mb-4">Account Security</h3>
        <ul className="list-disc list-inside space-y-3 text-white/90 mb-8">
          <li>You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account.</li>
          <li>You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities.</li>
          <li>JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password.</li>
          <li>Promptly notify JAIMAX of any unauthorized access or use of your account.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-2">Suspicious Activity</h3>
        <p className="text-white/90 mb-6">
          JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.
        </p>

        <h3 className="text-xl font-semibold text-white mb-2">Compliance and Conduct</h3>
        <ul className="list-disc list-inside space-y-2 text-white/90 mb-6">
          <li>You agree not to disrupt or attempt to tamper with JAIMAX's services or servers.</li>
          <li>Respect the privacy of others and refrain from disclosing personal information without consent.</li>
          <li>Do not impersonate JAIMAX employees or any other individuals.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-2">Financial Obligations</h3>
        <ul className="list-disc list-inside space-y-2 text-white/90 mb-6">
          <li>Any excess deposits or withdrawals mistakenly made must be promptly returned.</li>
          <li>Profits from exploiting platform inconsistencies must be returned to JAIMAX.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-2">Fraud and Security</h3>
        <p className="text-white/90 mb-6">
          Accounts involved in fraudulent activities will be suspended pending investigation.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Disclaimer</h3>
          <p className="text-yellow-100 mb-4">
            Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
          </p>

          <h3 className="text-xl font-semibold text-green-300 mb-2">Contact Information</h3>
          <p className="text-green-100">
            For questions regarding these Terms and Conditions, contact us at{" "}
            <a href="mailto:support@jaimax.com" className="underline hover:text-green-200">
              support@jaimax.com
            </a>
          </p>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-purple-300 pl-4">
          Privacy Policy
        </h2>
        <p className="text-white/90 mb-8">How we protect and handle your personal information</p>

        <h3 className="text-xl font-semibold text-purple-200 mb-3">Introduction</h3>
        <p className="text-white/90 mb-4">
          We respect your privacy and are committed to protecting it through our compliance with this Policy. This privacy policy applies when we are acting as a data controller with respect to the personal data of our users.
        </p>
        <p className="text-white/90 mb-8">
          By accessing or using the Services, you agree to this Policy. Please read this Policy carefully to understand our policies and practices regarding your personal data.
        </p>

        <h3 className="text-2xl font-semibold text-purple-300 mb-4 border-l-4 border-purple-300 pl-4">
          Personal Data We Collect
        </h3>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">Information You Provide</h4>
        <ul className="list-disc list-inside text-white/90 mb-6">
          <li><strong>Account Data:</strong> Personal identification information such as name, date of birth, nationality, phone number, home address, and email address.</li>
          <li><strong>Payment Information:</strong> Financial information such as bank account, credit card, or PayPal details for payment processing.</li>
        </ul>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">Automatically Collected Information</h4>
        <p className="text-white/90 mb-6">
          Device information, usage patterns, and transactional data to improve user experience and service functionality.
        </p>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">Third-Party Information</h4>
        <p className="text-white/90 mb-8">
          Information from public databases, credit bureaus, and ID verification partners for identity verification and compliance purposes.
        </p>

        <h3 className="text-2xl font-semibold text-purple-300 mb-4 border-l-4 border-purple-300 pl-4">
          Key Policies
        </h3>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">Data Retention</h4>
        <ul className="list-disc list-inside text-white/90 mb-6">
          <li>We retain personal data only as long as necessary to fulfill contractual obligations or comply with legal requirements.</li>
          <li>Financial data may be retained for up to 7 years for auditing purposes.</li>
        </ul>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">Data Security</h4>
        <ul className="list-disc list-inside text-white/90 mb-6">
          <li>We employ encryption standards, multi-factor authentication, and monitoring practices to secure your data.</li>
          <li>Data is securely stored on Amazon AWS servers with restricted access to authorized personnel only.</li>
        </ul>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">International Transfers</h4>
        <ul className="list-disc list-inside text-white/90 mb-6">
          <li>We may transfer and process your data outside the EEA with appropriate safeguards in place.</li>
          <li>Standard Contractual Clauses ensure adequate data protection for international transfers.</li>
        </ul>

        <h4 className="text-lg font-semibold text-purple-200 mb-2">Third-Party Sharing</h4>
        <p className="text-white/90 mb-8">
          Data sharing with payment processors, ID verification services, and analytics providers is limited to required purposes only.
        </p>

        <h3 className="text-xl font-semibold text-indigo-200 mb-2">Questions About Privacy?</h3>
        <p className="text-indigo-100">
          For questions or concerns regarding this privacy policy, visit our support page at{" "}
          <a
            href="https://jaimax.com/support-page"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-indigo-200"
          >
            jaimax.com/support-page
          </a>
        </p>
      </section>
    </div>
  );
};

export default Security;


// import React from "react";

// const Security = () => {
//   return (
//     <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen px-4 sm:px-6 lg:px-8 py-12 text-gray-100 relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

//       <div className="relative z-10 w-full">
//         {/* Clean Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Legal Documentation
//           </h1>
//           <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Review our terms of service and privacy policy
//           </p>
//         </div>

//         {/* Terms and Conditions Section */}
//         <section className="mb-20">
//           <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
//             <div className="border-l-4 border-blue-400 pl-6 mb-8">
//               <h2 className="text-3xl font-bold text-white mb-2">Terms and Conditions</h2>
//               <p className="text-gray-400">Your agreement to use JAIMAX services</p>
//             </div>

//             <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 mb-10 border border-blue-400/20">
//               <p className="text-gray-200 leading-relaxed text-lg">
//                 Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
//               </p>
//             </div>

//             <div className="space-y-10">
//               {/* Account Security */}
//               <div>
//                 <h3 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
//                   <div className="w-2 h-8 bg-blue-400 rounded-l mr-4"></div>
//                   Account Security
//                 </h3>
//                 <div className="ml-6 space-y-4">
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account.
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities.
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password.
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       Promptly notify JAIMAX of any unauthorized access or use of your account.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Two Column Layout */}
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Suspicious Activity
//                   </h3>
//                   <div className="ml-5">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Compliance and Conduct
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         You agree not to disrupt or attempt to tamper with JAIMAX's services or servers.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Respect the privacy of others and refrain from disclosing personal information without consent.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Do not impersonate JAIMAX employees or any other individuals.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Financial Obligations
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Any excess deposits or withdrawals mistakenly made must be promptly returned.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Profits from exploiting platform inconsistencies must be returned to JAIMAX.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Fraud and Security
//                   </h3>
//                   <div className="ml-5">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Accounts involved in fraudulent activities will be suspended pending investigation.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Important Notices */}
//               <div className="space-y-6">
//                 <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-6">
//                   <h3 className="text-xl font-semibold text-orange-200 mb-4 flex items-center">
//                     <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Disclaimer
//                   </h3>
//                   <p className="text-orange-100">
//                     Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
//                   </p>
//                 </div>

//                 <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-6">
//                   <h3 className="text-xl font-semibold text-green-200 mb-4 flex items-center">
//                     <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                     Contact Information
//                   </h3>
//                   <p className="text-green-100">
//                     For questions regarding these Terms and Conditions, contact us at{" "}
//                     <a
//                       href="mailto:support@jaimax.com"
//                       className="text-green-300 underline hover:text-green-200 transition-colors"
//                     >
//                       support@jaimax.com
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Privacy Policy Section */}
//         <section>
//           <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
//             <div className="border-l-4 border-purple-400 pl-6 mb-8">
//               <h2 className="text-3xl font-bold text-white mb-2">Privacy Policy</h2>
//               <p className="text-gray-400">How we protect and handle your personal information</p>
//             </div>

//             <div className="space-y-10">
//               {/* Introduction */}
//               <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-400/20">
//                 <h3 className="text-xl font-semibold text-purple-200 mb-4">Introduction</h3>
//                 <div className="space-y-4 text-gray-200">
//                   <p>
//                     We respect your privacy and are committed to protecting it through our compliance with this Policy. This privacy policy applies when we are acting as a data controller with respect to the personal data of our users.
//                   </p>
//                   <p>
//                     By accessing or using the Services, you agree to this Policy. Please read this Policy carefully to understand our policies and practices regarding your personal data.
//                   </p>
//                 </div>
//               </div>

//               {/* Data Collection */}
//               <div>
//                 <h3 className="text-2xl font-semibold text-purple-300 mb-6 flex items-center">
//                   <div className="w-2 h-8 bg-purple-400 rounded-l mr-4"></div>
//                   Personal Data We Collect
//                 </h3>
//                 <div className="ml-6 space-y-6">
//                   <div>
//                     <h4 className="text-lg font-medium text-purple-200 mb-3">Information You Provide</h4>
//                     <div className="ml-4 space-y-2">
//                       <div className="flex items-start">
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                         <p className="text-gray-300">
//                           <span className="font-medium text-purple-200">Account Data:</span> Personal identification information such as name, date of birth, nationality, phone number, home address, and email address.
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                         <p className="text-gray-300">
//                           <span className="font-medium text-purple-200">Payment Information:</span> Financial information such as bank account, credit card, or PayPal details for payment processing.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-lg font-medium text-purple-200 mb-3">Automatically Collected Information</h4>
//                     <div className="ml-4">
//                       <div className="flex items-start">
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                         <p className="text-gray-300">
//                           Device information, usage patterns, and transactional data to improve user experience and service functionality.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-lg font-medium text-purple-200 mb-3">Third-Party Information</h4>
//                     <div className="ml-4">
//                       <div className="flex items-start">
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                         <p className="text-gray-300">
//                           Information from public databases, credit bureaus, and ID verification partners for identity verification and compliance purposes.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Key Policies Grid */}
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//                     Data Retention
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         We retain personal data only as long as necessary to fulfill contractual obligations or comply with legal requirements.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         Financial data may be retained for up to 7 years for auditing purposes.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//                     Data Security
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         We employ encryption standards, multi-factor authentication, and monitoring practices to secure your data.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         Data is securely stored on Amazon AWS servers with restricted access to authorized personnel only.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//                     International Transfers
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         We may transfer and process your data outside the EEA with appropriate safeguards in place.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         Standard Contractual Clauses ensure adequate data protection for international transfers.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//                     Third-Party Sharing
//                   </h3>
//                   <div className="ml-5">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300">
//                         Data sharing with payment processors, ID verification services, and analytics providers is limited to required purposes only.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Section */}
//               <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-6">
//                 <h3 className="text-xl font-semibold text-indigo-200 mb-4 flex items-center">
//                   <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
//                   </svg>
//                   Questions About Privacy?
//                 </h3>
//                 <p className="text-indigo-100">
//                   For questions or concerns regarding this privacy policy, visit our support page at{" "}
//                   <a
//                     href="https://jaimax.com/support-page"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-300 underline hover:text-indigo-200 transition-colors"
//                   >
//                     jaimax.com/support-page
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };


// export default Security;

// import React from "react";

// const Security = () => {
//   return (
//     <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen px-4 sm:px-6 lg:px-8 py-12 text-gray-100 relative overflow-hidden">
//       {/* Background blurred circles */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

//       <div className="relative z-10 w-full">
//         {/* Header */}
//         <div className="text-center mb-5">
//           <h1 className="text-4xl md:text-4xl font-bold text-white mb-2">
//             Legal Documentation
//           </h1>
//           <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6" />
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Review our terms of service and privacy policy
//           </p>
//         </div>

//         {/* Terms and Conditions Section WITHOUT card effects */}
//         <section className="mb-20">
//           <div>
//             <div className="border-l-4 border-blue-400 pl-6 mb-8">
//               <h2 className="text-3xl font-bold text-white mb-2">Terms and Conditions</h2>
//               <p className="text-gray-400">Your agreement to use JAIMAX services</p>
//             </div>

//             <div className="mb-10">
//               <p className="text-gray-200 leading-relaxed text-lg">
//                 Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
//               </p>
//             </div>

//             <div className="space-y-10">
//               {/* Account Security */}
//               <div>
//                 <h3 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
//                   <div className="w-2 h-8 bg-blue-400 rounded-l mr-4"></div>
//                   Account Security
//                 </h3>
//                 <div className="ml-6 space-y-4">
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account.
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities.
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password.
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                     <p className="text-gray-300 leading-relaxed">
//                       Promptly notify JAIMAX of any unauthorized access or use of your account.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Two Column Layout */}
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Suspicious Activity
//                   </h3>
//                   <div className="ml-5">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Compliance and Conduct
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         You agree not to disrupt or attempt to tamper with JAIMAX's services or servers.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Respect the privacy of others and refrain from disclosing personal information without consent.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Do not impersonate JAIMAX employees or any other individuals.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Financial Obligations
//                   </h3>
//                   <div className="ml-5 space-y-3">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Any excess deposits or withdrawals mistakenly made must be promptly returned.
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Profits from exploiting platform inconsistencies must be returned to JAIMAX.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
//                     <div className="w-2 h-6 bg-blue-400 rounded-l mr-3"></div>
//                     Fraud and Security
//                   </h3>
//                   <div className="ml-5">
//                     <div className="flex items-start">
//                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                       <p className="text-gray-300 leading-relaxed">
//                         Accounts involved in fraudulent activities will be suspended pending investigation.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Important Notices */}
//               <div className="space-y-6">
//                 <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-6">
//                   <h3 className="text-xl font-semibold text-orange-200 mb-4 flex items-center">
//                     <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     Disclaimer
//                   </h3>
//                   <p className="text-orange-100">
//                     Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
//                   </p>
//                 </div>

//                 <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-6">
//                   <h3 className="text-xl font-semibold text-green-200 mb-4 flex items-center">
//                     <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                     Contact Information
//                   </h3>
//                   <p className="text-green-100">
//                     For questions regarding these Terms and Conditions, contact us at{" "}
//                     <a
//                       href="mailto:support@jaimax.com"
//                       className="text-green-300 underline hover:text-green-200 transition-colors"
//                     >
//                       support@jaimax.com
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Privacy Policy Section WITH card effects */}
//        <section>
//   <div className="rounded-2xl p-4 md:p-2">
//     <div className="border-l-4 border-purple-400 pl-6 mb-8">
//       <h2 className="text-3xl font-bold text-white mb-2">Privacy Policy</h2>
//       <p className="text-gray-400">How we protect and handle your personal information</p>
//     </div>

//     <div className="space-y-10">
//       {/* Introduction */}
//       <div>
//         <h3 className="text-xl font-semibold text-purple-200 mb-4">Introduction</h3>
//         <div className="space-y-4 text-gray-200">
//           <p>
//             We respect your privacy and are committed to protecting it through our compliance with this Policy. This privacy policy applies when we are acting as a data controller with respect to the personal data of our users.
//           </p>
//           <p>
//             By accessing or using the Services, you agree to this Policy. Please read this Policy carefully to understand our policies and practices regarding your personal data.
//           </p>
//         </div>
//       </div>

//       {/* Data Collection */}
//       <div>
//         <h3 className="text-2xl font-semibold text-purple-300 mb-6 flex items-center">
//           <div className="w-2 h-8 bg-purple-400 rounded-l mr-4"></div>
//           Personal Data We Collect
//         </h3>
//         <div className="ml-6 space-y-6">
//           <div>
//             <h4 className="text-lg font-medium text-purple-200 mb-3">Information You Provide</h4>
//             <div className="ml-4 space-y-2">
//               <div className="flex items-start">
//                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                 <p className="text-gray-300">
//                   <span className="font-medium text-purple-200">Account Data:</span> Personal identification information such as name, date of birth, nationality, phone number, home address, and email address.
//                 </p>
//               </div>
//               <div className="flex items-start">
//                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                 <p className="text-gray-300">
//                   <span className="font-medium text-purple-200">Payment Information:</span> Financial information such as bank account, credit card, or PayPal details for payment processing.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-medium text-purple-200 mb-3">Automatically Collected Information</h4>
//             <div className="ml-4">
//               <div className="flex items-start">
//                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                 <p className="text-gray-300">
//                   Device information, usage patterns, and transactional data to improve user experience and service functionality.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-medium text-purple-200 mb-3">Third-Party Information</h4>
//             <div className="ml-4">
//               <div className="flex items-start">
//                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//                 <p className="text-gray-300">
//                   Information from public databases, credit bureaus, and ID verification partners for identity verification and compliance purposes.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Key Policies Grid */}
//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//             <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//             Data Retention
//           </h3>
//           <div className="ml-5 space-y-3">
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 We retain personal data only as long as necessary to fulfill contractual obligations or comply with legal requirements.
//               </p>
//             </div>
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 Financial data may be retained for up to 7 years for auditing purposes.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//             <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//             Data Security
//           </h3>
//           <div className="ml-5 space-y-3">
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 We employ encryption standards, multi-factor authentication, and monitoring practices to secure your data.
//               </p>
//             </div>
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 Data is securely stored on Amazon AWS servers with restricted access to authorized personnel only.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//             <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//             Data Sharing
//           </h3>
//           <div className="ml-5 space-y-3">
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 Personal data is shared only with third parties necessary for service provision and compliance.
//               </p>
//             </div>
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 No data is sold or rented to any third parties.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
//             <div className="w-2 h-6 bg-purple-400 rounded-l mr-3"></div>
//             User Rights
//           </h3>
//           <div className="ml-5 space-y-3">
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 You may access, update, or delete your personal data by contacting support.
//               </p>
//             </div>
//             <div className="flex items-start">
//               <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
//               <p className="text-gray-300">
//                 You have the right to withdraw consent and restrict processing where applicable.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className="mt-10">
//         <h3 className="text-2xl font-semibold text-purple-200 mb-4">Contact Information</h3>
//         <p className="text-purple-300 leading-relaxed mb-4">
//           If you have questions or concerns regarding your privacy, please contact us at{" "}
//           <a
//             href="mailto:support@jaimax.com"
//             className="text-purple-400 underline hover:text-purple-300 transition-colors"
//           >
//             support@jaimax.com
//           </a>.
//         </p>
//         <p className="text-purple-300 leading-relaxed">
//           We will respond to your inquiry as soon as possible.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>

//       </div>
//     </div>
//   );
// };

// export default Security;


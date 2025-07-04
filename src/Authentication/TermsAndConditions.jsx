// import React, { useRef, useState } from "react";

// /**
//  * Terms & Conditions Modal Component (Tailwind Version with Full Data)
//  */
// const TermsConditionsModal = ({ show, onHide, onAgree }) => {
//   const [isAgreeEnabled, setIsAgreeEnabled] = useState(false);
//   const privacyPolicyRef = useRef(null);

//   const handleScroll = () => {
//     if (privacyPolicyRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } = privacyPolicyRef.current;
//       const threshold = 5;
//       if (scrollTop + clientHeight >= scrollHeight - threshold) {
//         setIsAgreeEnabled(true);
//       } else {
//         setIsAgreeEnabled(false);
//       }
//     }
//   };

//   const onClickAgree = () => {
//     if (isAgreeEnabled) {
//       onAgree(true);
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-blue-700 text-white px-4 py-3">
//           <h5 className="text-lg font-semibold">
//             Terms & Conditions and Privacy Policy
//           </h5>
//           <button
//             onClick={onHide}
//             className="text-white font-bold text-xl focus:outline-none"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-4 py-4 text-sm text-gray-700 overflow-y-auto">
//           <div className="border rounded-md p-3">
//             <div
//               className="h-[400px] overflow-y-auto pr-3 space-y-4"
//               onScroll={handleScroll}
//               ref={privacyPolicyRef}
//             >
//               <h1 className="text-xl font-bold">Terms and Conditions</h1>
//               <p>
//                 Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
//               </p>

//               <h5 className="font-semibold">1. Account Security</h5>
//               <p>
//                 You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account. You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities. JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password. Promptly notify JAIMAX of any unauthorized access or use of your account.
//               </p>

//               <h5 className="font-semibold">2. Suspicious Activity</h5>
//               <p>JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.</p>

//               <h5 className="font-semibold">3. Compliance and Conduct</h5>
//               <p>You agree not to disrupt or attempt to tamper with JAIMAX's services or servers in any manner that could harm our platform. Respect the privacy of others and refrain from disclosing personal information without consent. Do not impersonate JAIMAX employees or any other individuals.</p>

//               <h5 className="font-semibold">4. Financial Obligations</h5>
//               <p>Any excess deposits or withdrawals mistakenly made to your account must be promptly returned. Failure to do so may result in legal action. Profits gained from exploiting platform inconsistencies must be returned to JAIMAX.</p>

//               <h5 className="font-semibold">5. Fraud and Security</h5>
//               <p>Accounts involved in fraudulent or suspicious activities will be temporarily suspended pending investigation by JAIMAX.</p>

//               <h5 className="font-semibold">6. Prohibited Uses</h5>
//               <p>Misuse of our services, including unauthorized access or interference, may result in the suspension or termination of your account.</p>

//               <h5 className="font-semibold">7. Limitation of Liability</h5>
//               <p>JAIMAX and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</p>

//               <h5 className="font-semibold">8. Disclaimer</h5>
//               <p>Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.</p>

//               <h5 className="font-semibold">9. Governing Law</h5>
//               <p>These Terms are governed by the laws of Your Jurisdiction, without regard to its conflict of law provisions.</p>

//               <h5 className="font-semibold">10. Changes to Terms</h5>
//               <p>JAIMAX reserves the right to modify these Terms at any time. Revised Terms will be effective upon posting on our website.</p>

//               <h5 className="font-semibold">11. Contact Us</h5>
//               <p>
//                 If you have any questions or concerns regarding these Terms and Conditions, please contact us at{" "}
//                 <a href="mailto:support@jaimax.com" className="text-blue-600 underline">support@jaimax.com</a>.
//               </p>

//               <h1 className="text-xl font-bold mt-6">Privacy Policy</h1>
//               <h5 className="font-semibold">1. Introduction</h5>
//               <p>...</p>
//               <h5 className="font-semibold">2. Personal Data We Collect About You and How We Collect It</h5>
//               <p>...</p>
//               <h5 className="font-semibold">3. Retention and Deletion of Personal Data</h5>
//               <p>...</p>
//               <h5 className="font-semibold">4. International Transfers of Your Personal Data</h5>
//               <p>...</p>
//               <h5 className="font-semibold">5. Third-Party Data Sharing</h5>
//               <p>...</p>
//               <h5 className="font-semibold">6. Data Security</h5>
//               <p>...</p>
//               <h5 className="font-semibold">7. Managing Data Collection and Marketing Preferences</h5>
//               <p>...</p>
//               <h5 className="font-semibold">8. Automated Decision-Making and Profiling</h5>
//               <p>...</p>
//               <h5 className="font-semibold">9. Policy Review and Update Schedule</h5>
//               <p>...</p>
//               <h5 className="font-semibold">10. Contact Information</h5>
//               <p>
//                 Visit our support page:{" "}
//                 <a
//                   href="https://jaimax.com/support-page"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   https://jaimax.com/support-page
//                 </a>
//               </p>
//             </div>

//             {/* Agree Button */}
//             <div className="text-center mt-4">
//               <button
//                 type="button"
//                 className={`px-6 py-2 text-white font-semibold rounded transition ${
//                   isAgreeEnabled
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//                 onClick={onClickAgree}
//                 disabled={!isAgreeEnabled}
//               >
//                 Agree
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsConditionsModal;
import React, { useRef, useState } from "react";
import { X, CheckCircle } from "lucide-react";

/**
 * Simple Responsive Terms & Conditions Modal (Clean Teal Theme)
 */
const TermsConditionsModal = ({ show, onHide, onAgree }) => {
    const [isAgreeEnabled, setIsAgreeEnabled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const privacyPolicyRef = useRef(null);

    const handleScroll = () => {
        if (privacyPolicyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = privacyPolicyRef.current;
            const threshold = 10;
            const progress = Math.min((scrollTop / (scrollHeight - clientHeight)) * 100, 100);
            setScrollProgress(progress);

            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                setIsAgreeEnabled(true);
            } else {
                setIsAgreeEnabled(false);
            }
        }
    };

    const onClickAgree = () => {
        if (isAgreeEnabled) {
            onAgree(true);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 md:p-4">
            <div className="bg-white w-full max-w-4xl h-[90vh] md:h-[85vh] rounded-lg shadow-xl flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center bg-teal-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-t-lg">
                    <h5 className="text-base md:text-lg font-semibold">
                        Terms & Conditions and Privacy Policy
                    </h5>
                    <button
                        onClick={onHide}
                        className="text-white hover:bg-teal-700 rounded-full p-1 transition-colors"
                    >
                        <X className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-teal-100">
                    <div
                        className="h-full bg-teal-500 transition-all duration-300"
                        style={{ width: `${scrollProgress}%` }}
                    ></div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    <div
                        className="h-full overflow-y-auto px-4 md:px-6 py-4 md:py-6"
                        onScroll={handleScroll}
                        ref={privacyPolicyRef}
                    >
                        <div className="prose prose-sm md:prose-base max-w-none">

                            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
                            <p className="text-gray-700 mb-6">
                                Welcome to JAIMAX. Please read these Terms and Conditions ("Terms") carefully before using our services. By accessing or using our services, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Account Security</h5>
                            <p className="text-gray-700 mb-4">
                                You are responsible for maintaining the security of your account credentials. While we provide tools such as two-factor authentication to enhance security, you are ultimately responsible for safeguarding your account. You are liable for all activities conducted under your account, including but not limited to deposits, withdrawals, and trading activities. JAIMAX shall not be liable for any loss or damage arising from your failure to maintain the security of your account or password. Promptly notify JAIMAX of any unauthorized access or use of your account.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. Suspicious Activity</h5>
                            <p className="text-gray-700 mb-4">
                                JAIMAX reserves the right to suspend or restrict your account in the event of suspicious activity.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Compliance and Conduct</h5>
                            <p className="text-gray-700 mb-4">
                                You agree not to disrupt or attempt to tamper with JAIMAX's services or servers in any manner that could harm our platform. Respect the privacy of others and refrain from disclosing personal information without consent. Do not impersonate JAIMAX employees or any other individuals.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. Financial Obligations</h5>
                            <p className="text-gray-700 mb-4">
                                Any excess deposits or withdrawals mistakenly made to your account must be promptly returned. Failure to do so may result in legal action. Profits gained from exploiting platform inconsistencies must be returned to JAIMAX.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5. Fraud and Security</h5>
                            <p className="text-gray-700 mb-4">
                                Accounts involved in fraudulent or suspicious activities will be temporarily suspended pending investigation by JAIMAX.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6. Prohibited Uses</h5>
                            <p className="text-gray-700 mb-4">
                                Misuse of our services, including unauthorized access or interference, may result in the suspension or termination of your account.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">7. Limitation of Liability</h5>
                            <p className="text-gray-700 mb-4">
                                JAIMAX and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">8. Disclaimer</h5>
                            <p className="text-gray-700 mb-4">
                                Use of our services is at your own risk. JAIMAX provides the service on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">9. Governing Law</h5>
                            <p className="text-gray-700 mb-4">
                                These Terms are governed by the laws of Your Jurisdiction, without regard to its conflict of law provisions.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">10. Changes to Terms</h5>
                            <p className="text-gray-700 mb-4">
                                JAIMAX reserves the right to modify these Terms at any time. Revised Terms will be effective upon posting on our website.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">11. Contact Us</h5>
                            <p className="text-gray-700 mb-8">
                                If you have any questions or concerns regarding these Terms and Conditions, please contact us at{" "}
                                <a href="mailto:support@jaimax.com" className="text-teal-600 hover:text-teal-800 underline">
                                    support@jaimax.com
                                </a>.
                            </p>

                            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">Privacy Policy</h1>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">1. Introduction</h5>
                            <p className="text-gray-700 mb-4">
                                This Privacy Policy describes how JAIMAX collects, uses, and shares your personal information when you use our services. We are committed to protecting your privacy and ensuring the security of your personal data.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2. Personal Data We Collect About You and How We Collect It</h5>
                            <p className="text-gray-700 mb-4">
                                We collect personal information that you provide directly to us, such as when you create an account, make transactions, or contact us for support. This may include your name, email address, phone number, identification documents, and financial information.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">3. Retention and Deletion of Personal Data</h5>
                            <p className="text-gray-700 mb-4">
                                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">4. International Transfers of Your Personal Data</h5>
                            <p className="text-gray-700 mb-4">
                                Your personal data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">5. Third-Party Data Sharing</h5>
                            <p className="text-gray-700 mb-4">
                                We do not sell your personal data to third parties. We may share your information with service providers, regulatory authorities, and other parties as necessary to provide our services and comply with legal requirements.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">6. Data Security</h5>
                            <p className="text-gray-700 mb-4">
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">7. Managing Data Collection and Marketing Preferences</h5>
                            <p className="text-gray-700 mb-4">
                                You have the right to access, update, or delete your personal information. You can also opt out of certain marketing communications through your account settings or by contacting us.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">8. Automated Decision-Making and Profiling</h5>
                            <p className="text-gray-700 mb-4">
                                We may use automated decision-making processes for purposes such as fraud prevention and risk assessment. You have the right to request human intervention in these processes.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">9. Policy Review and Update Schedule</h5>
                            <p className="text-gray-700 mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the "Last Updated" date.
                            </p>

                            <h5 className="text-lg font-semibold text-gray-900 mt-6 mb-3">10. Contact Information</h5>
                            <p className="text-gray-700 mb-8">
                                Visit our support page:{" "}
                                <a
                                    href="https://jaimax.com/support-page"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 hover:text-teal-800 underline"
                                >
                                    https://jaimax.com/support-page
                                </a>
                            </p>

                            {/* End marker for scroll detection */}
                            <div className="h-4"></div>
                        </div>
                    </div>
                </div>

                {/* Footer with Agree Button */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 md:px-6 py-4 rounded-b-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-sm text-gray-600 text-center sm:text-left">
                            {isAgreeEnabled ? (
                                <span className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    Ready to proceed
                                </span>
                            ) : (
                                <span>Please scroll through all content to continue</span>
                            )}
                        </div>
                        <button
                            type="button"
                            className={`w-full sm:w-auto px-6 py-2 md:py-3 text-white font-semibold rounded-lg transition-all duration-200 ${isAgreeEnabled
                                    ? "bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                            onClick={onClickAgree}
                            disabled={!isAgreeEnabled}
                        >
                            {isAgreeEnabled ? "I Agree" : "Scroll to Enable"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditionsModal;
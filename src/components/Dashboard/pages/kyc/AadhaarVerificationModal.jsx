// import React, { useState, useEffect, useRef } from "react";
// import stringSimilarity from "string-similarity";
// import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
// import {
//   useSendAadhaarOtpMutation,
//   useVerifyAadhaarOtpMutation,
// } from "./kycApiSlice";
// import Loader from '../../../../ReusableComponents/Loader/loader'

// const AadhaarVerification = ({
//   onVerificationComplete,
//   formData,
//   isLoading: parentLoading
// }) => {
//   const [step, setStep] = useState("aadhaar");
//   const [aadhaarNumber, setAadhaarNumber] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [tempId, setTempId] = useState(null);
//   const [countdown, setCountdown] = useState(0);
//   const [error, setError] = useState("");
//   const [verifiedData, setVerifiedData] = useState(null);
//   const [nameMatchStatus, setNameMatchStatus] = useState(null);
//   const [dobMatchStatus, setDobMatchStatus] = useState(null);

//   const otpRefs = useRef([]);

//   const [sendAadhaarOtp, { isLoading: isSendingOtp }] = useSendAadhaarOtpMutation();
//   const [verifyAadhaarOtp, { isLoading: isVerifyingOtp }] = useVerifyAadhaarOtpMutation();

//   // Get DigiLocker data from formData
//   const digilockerName = formData?.applicantName || "";
//   const digilockerDob = formData?.dob || "";

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const formatAadhaar = (value) => {
//     const cleaned = value.replace(/\D/g, "");
//     const limited = cleaned.slice(0, 12);
//     return limited.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
//   };

//   const handleAadhaarChange = (e) => {
//     const formatted = formatAadhaar(e.target.value);
//     setAadhaarNumber(formatted);
//     setError("");
//   };

//   const validateAadhaar = (aadhaar) => {
//     const cleaned = aadhaar.replace(/\s/g, "");
//     return /^\d{12}$/.test(cleaned);
//   };

//   const handleSendOtp = async () => {
//     const cleanedAadhaar = aadhaarNumber.replace(/\s/g, "");
//     if (!validateAadhaar(cleanedAadhaar)) {
//       setError("Please enter a valid 12-digit Aadhaar number");
//       return;
//     }
//     setError("");

//     try {
//       const result = await sendAadhaarOtp({ aadhaarNumber: cleanedAadhaar });
//       if (result.error) {
//         const errorMessage = result.error?.data?.message || "Failed to send OTP";
//         setError(errorMessage);
//         toast.error(errorMessage, { position: "top-center" });
//         return;
//       }

//       const response = result.data;
//       if (response?.success || response?.status_code === 200) {
//         const receivedTempId = response?.data?.tempId || response?.tempId;
//         setTempId(receivedTempId);
//         setStep("otp");
//         setCountdown(85);
//         toast.success(response?.message || "OTP sent successfully!", { position: "top-center" });
//       } else {
//         const msg = response?.message || "Failed to send OTP";
//         setError(msg);
//         toast.error(msg, { position: "top-center" });
//       }
//     } catch (err) {
//       const errorMessage = err?.data?.message || err?.message || "Failed to send OTP";
//       setError(errorMessage);
//       toast.error(errorMessage, { position: "top-center" });
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);
//     setError("");
//     if (value && index < 5) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
//     const newOtp = [...otp];
//     pastedData.split("").forEach((digit, index) => {
//       if (index < 6) newOtp[index] = digit;
//     });
//     setOtp(newOtp);
//   };

//   const extractAadhaarData = (response) => {
//     if (response?.data?.data?.data) return response.data.data.data;
//     if (response?.data?.data) return response.data.data;
//     if (response?.data) return response.data;
//     return response;
//   };

//   const matchDob = (aadhaarDob, digilockerDob) => {
//     if (!aadhaarDob || !digilockerDob) {
//       return { matched: false, reason: "DOB data missing" };
//     }

//     const parseDob = (dobStr) => {
//       dobStr = dobStr.toString().trim();
//       let day, month, year;

//       if (dobStr.match(/^\d{1,2}[-\.\/]\d{1,2}[-\.\/]\d{4}$/)) {
//         const parts = dobStr.split(/[-\.\/]/);
//         day = parseInt(parts[0], 10);
//         month = parseInt(parts[1], 10);
//         year = parseInt(parts[2], 10);
//       } else if (dobStr.match(/^\d{4}[-\.\/]\d{1,2}[-\.\/]\d{1,2}$/)) {
//         const parts = dobStr.split(/[-\.\/]/);
//         year = parseInt(parts[0], 10);
//         month = parseInt(parts[1], 10);
//         day = parseInt(parts[2], 10);
//       } else if (dobStr.match(/^\d{8}$/)) {
//         year = parseInt(dobStr.substring(0, 4), 10);
//         month = parseInt(dobStr.substring(4, 6), 10);
//         day = parseInt(dobStr.substring(6, 8), 10);
//       } else if (dobStr.match(/^\d{4}$/)) {
//         year = parseInt(dobStr, 10);
//         month = 0;
//         day = 0;
//       } else {
//         return null;
//       }
//       return { day, month, year };
//     };

//     const aadhaarDate = parseDob(aadhaarDob);
//     const digilockerDate = parseDob(digilockerDob);

//     if (!aadhaarDate || !digilockerDate) {
//       return { matched: false, aadhaarDob, digilockerDob, reason: "Could not parse dates" };
//     }

//     if (aadhaarDate.month === 0 || digilockerDate.month === 0) {
//       const matched = aadhaarDate.year === digilockerDate.year;
//       return { matched, aadhaarDob, digilockerDob, reason: matched ? "Year matched" : "Year mismatch" };
//     }

//     const matched = aadhaarDate.day === digilockerDate.day && 
//                     aadhaarDate.month === digilockerDate.month && 
//                     aadhaarDate.year === digilockerDate.year;

//     return { matched, aadhaarDob, digilockerDob, reason: matched ? "DOB matched" : "DOB mismatch" };
//   };

//   const matchNames = (aadhaarName, digilockerName) => {
//     if (!aadhaarName || !digilockerName) return { matched: false, similarity: 0 };

//     const normalize = (str) => str.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();
//     const normalizedAadhaar = normalize(aadhaarName);
//     const normalizedDigilocker = normalize(digilockerName);

//     if (normalizedAadhaar === normalizedDigilocker) {
//       return { matched: true, similarity: 1.0 };
//     }

//     const similarity = stringSimilarity.compareTwoStrings(normalizedAadhaar, normalizedDigilocker);
//     const aadhaarWords = normalizedAadhaar.split(" ").filter((w) => w.length > 0);
//     const digilockerWords = normalizedDigilocker.split(" ").filter((w) => w.length > 0);

//     const aadhaarWordsInDigilocker = aadhaarWords.every((word) =>
//       digilockerWords.some((dWord) => stringSimilarity.compareTwoStrings(word, dWord) > 0.8)
//     );
//     const digilockerWordsInAadhaar = digilockerWords.every((word) =>
//       aadhaarWords.some((aWord) => stringSimilarity.compareTwoStrings(word, aWord) > 0.8)
//     );

//     const isMatched = similarity >= 0.8 || (aadhaarWordsInDigilocker && digilockerWordsInAadhaar);

//     return {
//       matched: isMatched,
//       similarity,
//       details: {
//         aadhaarName: normalizedAadhaar,
//         digilockerName: normalizedDigilocker,
//         similarityScore: (similarity * 100).toFixed(1) + "%",
//       },
//     };
//   };

//   const handleVerifyOtp = async () => {
//     const otpString = otp.join("");
//     if (otpString.length !== 6) {
//       setError("Please enter complete 6-digit OTP");
//       return;
//     }
//     if (!tempId) {
//       setError("Session expired. Please request OTP again.");
//       setStep("aadhaar");
//       return;
//     }

//     setError("");
//     setStep("verifying");

//     try {
//       const result = await verifyAadhaarOtp({ tempId, otp: otpString });

//       if (result.error) {
//         const errorMessage = result.error?.data?.message || "Verification failed";
//         setError(errorMessage);
//         setStep("otp");
//         toast.error(errorMessage, { position: "top-center" });
//         return;
//       }

//       const response = result.data;
//       if (response?.success || response?.status_code === 200) {
//         const aadhaarData = extractAadhaarData(response);
//         setVerifiedData(aadhaarData);

//         const aadhaarName = aadhaarData?.name || "";
//         const aadhaarDob = aadhaarData?.date_of_birth || aadhaarData?.year_of_birth || "";

//         let dobMatched = false;
//         if (digilockerDob && aadhaarDob) {
//           const dobResult = matchDob(aadhaarDob, digilockerDob);
//           setDobMatchStatus(dobResult);
//           dobMatched = dobResult.matched;
//         }

//         if (digilockerName && aadhaarName) {
//           const nameResult = matchNames(aadhaarName, digilockerName);
//           setNameMatchStatus(nameResult);
//           const nameMatched = nameResult.matched;

//           if (dobMatched && nameMatched) {
//             setStep("success");
//             toast.success("Aadhaar verified successfully!", { position: "top-center" });
//           } else if (dobMatched && !nameMatched) {
//             setStep("nameMismatch");
//             toast.warning(`Name similarity: ${nameResult.details.similarityScore}`, { position: "top-center" });
//           } else if (!dobMatched && nameMatched) {
//             setStep("dobMismatch");
//             toast.warning("DOB mismatch detected", { position: "top-center" });
//           } else {
//             setStep("dobMismatch");
//             toast.error("Both name and DOB mismatch", { position: "top-center" });
//           }
//         } else {
//           if (!dobMatched && digilockerDob) {
//             setStep("dobMismatch");
//             toast.warning("DOB mismatch detected", { position: "top-center" });
//           } else {
//             setStep("success");
//             toast.success("Aadhaar verified!", { position: "top-center" });
//           }
//         }
//       } else {
//         setError(response?.message || "Verification failed");
//         setStep("otp");
//         toast.error(response?.message || "Verification failed", { position: "top-center" });
//       }
//     } catch (err) {
//       const errorMessage = err?.message || "Verification failed";
//       setError(errorMessage);
//       setStep("otp");
//       toast.error(errorMessage, { position: "top-center" });
//     }
//   };

//   const handleProceed = () => {
//     const aadhaarInfo = {
//       aadhaarNumber: aadhaarNumber.replace(/\s/g, ""),
//       tempId,
//       verifiedData,
//       dobMatched: dobMatchStatus?.matched || false,
//       nameMatched: nameMatchStatus?.matched || false,
//       similarityScore: nameMatchStatus?.similarity || 0,
//       aadhaarName: verifiedData?.name || "",
//       dateOfBirth: verifiedData?.date_of_birth || "",
//       gender: verifiedData?.gender || "",
//       address: verifiedData?.address || {},
//       fullAddress: verifiedData?.full_address || "",
//       photo: verifiedData?.photo || "",
//       shareCode: verifiedData?.share_code || "",
//     };
//     onVerificationComplete(aadhaarInfo);
//   };

//   const handleResendOtp = async () => {
//     if (countdown > 0) return;
//     setOtp(["", "", "", "", "", ""]);
//     await handleSendOtp();
//   };

//   const resetForm = () => {
//     setStep("aadhaar");
//     setAadhaarNumber("");
//     setOtp(["", "", "", "", "", ""]);
//     setError("");
//     setVerifiedData(null);
//     setDobMatchStatus(null);
//     setNameMatchStatus(null);
//   };

//   // Icon Components
//   const AadhaarIcon = () => (
//     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//     </svg>
//   );

//   const LockIcon = () => (
//     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//     </svg>
//   );

//   const CheckIcon = () => (
//     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   );

//   const CrossIcon = () => (
//     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//     </svg>
//   );

//   const WarningIcon = () => (
//     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//     </svg>
//   );

//   const Spinner = ({ className = "" }) => (
//     <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//     </svg>
//   );

//   const VerifiedBadge = ({ text }) => (
//     <span className="inline-flex items-center text-teal-600 text-xs sm:text-sm font-medium">
//       <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//       </svg>
//       {text}
//     </span>
//   );

//   return (
//     <div className="max-w-md mx-auto">
//       {/* Step: Aadhaar Input */}
//       {step === "aadhaar" && (
//         <div className="space-y-4 sm:space-y-5">
//           <div className="text-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
//               <AadhaarIcon />
//             </div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">Verify Aadhaar</h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1">Enter your 12-digit Aadhaar number</p>
            
//             {(digilockerName || digilockerDob) && (
//               <div className="mt-3 bg-teal-50 rounded-xl px-3 py-2 text-left max-w-xs mx-auto">
//                 {digilockerName && (
//                   <p className="text-teal-700 text-xs sm:text-sm">
//                     <span className="font-medium">Name:</span> {digilockerName}
//                   </p>
//                 )}
//                 {digilockerDob && (
//                   <p className="text-teal-700 text-xs sm:text-sm mt-0.5">
//                     <span className="font-medium">DOB:</span> {digilockerDob}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div>
//             <input
//               type="text"
//               value={aadhaarNumber}
//               onChange={handleAadhaarChange}
//               placeholder="XXXX XXXX XXXX"
//               className="w-full px-4 py-3 text-center text-lg sm:text-xl tracking-widest border-2 border-gray-200 
//                        rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 
//                        transition-all outline-none bg-gray-50 focus:bg-white"
//               maxLength={14}
//             />
//             <p className="mt-2 text-xs text-gray-400 text-center flex items-center justify-center gap-1">
//               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//               </svg>
//               Your Aadhaar is encrypted & secure
//             </p>
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs sm:text-sm text-center">
//               {error}
//             </div>
//           )}

//           <button
//             onClick={handleSendOtp}
//             disabled={isSendingOtp || !validateAadhaar(aadhaarNumber)}
//             className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
//               ${isSendingOtp || !validateAadhaar(aadhaarNumber)
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-teal-600 hover:bg-teal-700 active:scale-[0.98] shadow-lg shadow-teal-200"
//               } transition-all`}
//           >
//             {isSendingOtp ? (
//               <span className="flex items-center justify-center gap-2">
//                 <Spinner className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                 Sending...
//               </span>
//             ) : (
//               "Send OTP"
//             )}
//           </button>
//         </div>
//       )}

//       {/* Step: OTP Input */}
//       {step === "otp" && (
//         <div className="space-y-4 sm:space-y-5">
//           <div className="text-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
//               <LockIcon />
//             </div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">Enter OTP</h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1">
//               Sent to Aadhaar linked mobile
//             </p>
//             <p className="text-xs text-gray-400 mt-0.5">
//               {aadhaarNumber.slice(0, 4)} **** {aadhaarNumber.slice(-4)}
//             </p>
//           </div>

//           <div className="flex justify-center gap-1.5 sm:gap-2">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (otpRefs.current[index] = el)}
//                 type="text"
//                 inputMode="numeric"
//                 value={digit}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                 onPaste={handleOtpPaste}
//                 className="w-10 h-12 sm:w-11 sm:h-13 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 
//                          rounded-lg sm:rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 
//                          transition-all outline-none bg-gray-50 focus:bg-white"
//                 maxLength={1}
//               />
//             ))}
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs sm:text-sm text-center">
//               {error}
//             </div>
//           )}

//           <button
//             onClick={handleVerifyOtp}
//             disabled={isVerifyingOtp || otp.join("").length !== 6}
//             className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
//               ${isVerifyingOtp || otp.join("").length !== 6
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-teal-600 hover:bg-teal-700 active:scale-[0.98] shadow-lg shadow-teal-200"
//               } transition-all`}
//           >
//             {isVerifyingOtp ? (
//               <span className="flex items-center justify-center gap-2">
//                 <Spinner className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                 Verifying...
//               </span>
//             ) : (
//               "Verify OTP"
//             )}
//           </button>

//           <div className="flex items-center justify-between text-xs sm:text-sm">
//             <button
//               onClick={() => { setStep("aadhaar"); setOtp(["", "", "", "", "", ""]); setError(""); }}
//               className="text-gray-500 hover:text-teal-600 transition-colors"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={handleResendOtp}
//               disabled={countdown > 0 || isSendingOtp}
//               className={`${countdown > 0 ? "text-gray-400" : "text-teal-600 hover:text-teal-700"} transition-colors`}
//             >
//               {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step: Verifying */}
//       {step === "verifying" && (
//         <div className="text-center py-8 sm:py-10">
//           <Loader/>
//           <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">Verifying Aadhaar</h2>
//           <p className="text-gray-500 text-xs sm:text-sm mt-1">Please wait...</p>
//         </div>
//       )}

//       {/* Step: Success */}
//       {step === "success" && (
//         <div className="space-y-4 sm:space-y-5">
//           <div className="text-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
//               <CheckIcon />
//             </div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">Verified!</h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1">Aadhaar verified successfully</p>
//           </div>

//           <div className="bg-teal-50 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-2.5">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 text-xs sm:text-sm">Name</span>
//               <span className="font-medium text-gray-800 text-xs sm:text-sm">{verifiedData?.name || "Verified"}</span>
//             </div>
//             {verifiedData?.date_of_birth && (
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-xs sm:text-sm">DOB</span>
//                 <span className="font-medium text-gray-800 text-xs sm:text-sm">{verifiedData.date_of_birth}</span>
//               </div>
//             )}
//             {verifiedData?.gender && (
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-xs sm:text-sm">Gender</span>
//                 <span className="font-medium text-gray-800 text-xs sm:text-sm">
//                   {verifiedData.gender === "M" ? "Male" : verifiedData.gender === "F" ? "Female" : verifiedData.gender}
//                 </span>
//               </div>
//             )}
//             {dobMatchStatus?.matched && (
//               <div className="flex justify-between items-center pt-1 border-t border-teal-100">
//                 <span className="text-gray-600 text-xs sm:text-sm">DOB Match</span>
//                 <VerifiedBadge text="Verified" />
//               </div>
//             )}
//             {nameMatchStatus?.matched && (
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-xs sm:text-sm">Name Match</span>
//                 <VerifiedBadge text="Matched" />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleProceed}
//             className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
//                      bg-teal-600 hover:bg-teal-700 active:scale-[0.98] shadow-lg shadow-teal-200 transition-all"
//           >
//             Continue →
//           </button>
//         </div>
//       )}

//       {/* Step: DOB Mismatch */}
//       {step === "dobMismatch" && (
//         <div className="space-y-4 sm:space-y-5">
//           <div className="text-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
//               <CrossIcon />
//             </div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">DOB Mismatch</h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1">Date of birth doesn't match</p>
//           </div>

//           <div className="bg-red-50 rounded-xl p-3 sm:p-4 space-y-2">
//             <div>
//               <span className="text-gray-500 text-xs">Aadhaar DOB</span>
//               <p className="font-medium text-gray-800 text-sm">{verifiedData?.date_of_birth || "N/A"}</p>
//             </div>
//             <div>
//               <span className="text-gray-500 text-xs">DigiLocker DOB</span>
//               <p className="font-medium text-gray-800 text-sm">{digilockerDob || "N/A"}</p>
//             </div>
//           </div>

//           <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg">
//             ⚠️ DOB must match for verification. Please ensure correct Aadhaar number.
//           </p>

//           <div className="flex gap-2 sm:gap-3">
//             <button
//               onClick={resetForm}
//               className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium border-2 border-gray-200 
//                        text-gray-700 hover:bg-gray-50 text-xs sm:text-sm transition-all"
//             >
//               Try Again
//             </button>
//             <button
//               onClick={handleProceed}
//               className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium text-white
//                        bg-gray-500 hover:bg-gray-600 text-xs sm:text-sm transition-all"
//             >
//               Skip
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step: Name Mismatch */}
//       {step === "nameMismatch" && (
//         <div className="space-y-4 sm:space-y-5">
//           <div className="text-center">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
//               <WarningIcon />
//             </div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">Name Variation</h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-1">DOB matches but names differ</p>
//           </div>

//           <div className="bg-teal-50 rounded-lg p-2.5 flex items-center gap-2">
//             <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//             <span className="text-teal-700 text-xs sm:text-sm font-medium">DOB Verified</span>
//           </div>

//           <div className="bg-amber-50 rounded-xl p-3 sm:p-4 space-y-2">
//             <div>
//               <span className="text-gray-500 text-xs">Aadhaar Name</span>
//               <p className="font-medium text-gray-800 text-sm">{verifiedData?.name || "N/A"}</p>
//             </div>
//             <div>
//               <span className="text-gray-500 text-xs">DigiLocker Name</span>
//               <p className="font-medium text-gray-800 text-sm">{digilockerName || "N/A"}</p>
//             </div>
//             {nameMatchStatus?.details && (
//               <div className="pt-2 border-t border-amber-200">
//                 <span className="text-gray-500 text-xs">Similarity</span>
//                 <p className="font-medium text-amber-700 text-sm">{nameMatchStatus.details.similarityScore}</p>
//               </div>
//             )}
//           </div>

//           <div className="flex gap-2 sm:gap-3">
//             <button
//               onClick={resetForm}
//               className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium border-2 border-gray-200 
//                        text-gray-700 hover:bg-gray-50 text-xs sm:text-sm transition-all"
//             >
//               Try Again
//             </button>
//             <button
//               onClick={handleProceed}
//               className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium text-white
//                        bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm transition-all"
//             >
//               Proceed
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AadhaarVerification;
import React, { useState, useEffect, useRef } from "react";
import stringSimilarity from "string-similarity";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import {
  useSendAadhaarOtpMutation,
  useVerifyAadhaarOtpMutation,
} from "./kycApiSlice";
import Loader from '../../../../ReusableComponents/Loader/loader';

const AadhaarVerification = ({
  onVerificationComplete,
  digiLockerData, // DigiLocker API response data passed from parent
  isLoading: parentLoading,
}) => {
  const [step, setStep] = useState("aadhaar");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [tempId, setTempId] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [verifiedData, setVerifiedData] = useState(null);
  const [nameMatchStatus, setNameMatchStatus] = useState(null);
  const [dobMatchStatus, setDobMatchStatus] = useState(null);

  const otpRefs = useRef([]);

  const [sendAadhaarOtp, { isLoading: isSendingOtp }] = useSendAadhaarOtpMutation();
  const [verifyAadhaarOtp, { isLoading: isVerifyingOtp }] = useVerifyAadhaarOtpMutation();

  // Extract DigiLocker data from API response
  const digilockerName = digiLockerData?.name || digiLockerData?.fullName || digiLockerData?.applicantName || "";
  const digilockerDob = digiLockerData?.dob || digiLockerData?.dateOfBirth || digiLockerData?.date_of_birth || "";

  // Debug log to verify DigiLocker data
  useEffect(() => {
    
    
    
    
    
  }, [digiLockerData, digilockerName, digilockerDob]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 12);
    return limited.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleAadhaarChange = (e) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarNumber(formatted);
    setError("");
  };

  const validateAadhaar = (aadhaar) => {
    const cleaned = aadhaar.replace(/\s/g, "");
    return /^\d{12}$/.test(cleaned);
  };

  const handleSendOtp = async () => {
    const cleanedAadhaar = aadhaarNumber.replace(/\s/g, "");
    if (!validateAadhaar(cleanedAadhaar)) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setError("");

    try {
      const result = await sendAadhaarOtp({ aadhaarNumber: cleanedAadhaar });
      if (result.error) {
        const errorMessage = result.error?.data?.message || "Failed to send OTP";
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center" });
        return;
      }

      const response = result.data;
      if (response?.success || response?.status_code === 200) {
        const receivedTempId = response?.data?.tempId || response?.tempId;
        setTempId(receivedTempId);
        setStep("otp");
        setCountdown(85);
        toast.success(response?.message || "OTP sent successfully!", { position: "top-center" });
      } else {
        const msg = response?.message || "Failed to send OTP";
        setError(msg);
        toast.error(msg, { position: "top-center" });
      }
    } catch (err) {
      const errorMessage = err?.data?.message || err?.message || "Failed to send OTP";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pastedData.split("").forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
  };

  const extractAadhaarData = (response) => {
    // Handle various response structures from Aadhaar API
    if (response?.data?.data?.data) return response.data.data.data;
    if (response?.data?.data) return response.data.data;
    if (response?.data) return response.data;
    return response;
  };

  // Normalize and parse DOB from various formats
  const normalizeDob = (dobStr) => {
    if (!dobStr) return null;
    
    dobStr = dobStr.toString().trim();
    
    // DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY
    if (dobStr.match(/^\d{1,2}[-\.\/]\d{1,2}[-\.\/]\d{4}$/)) {
      const parts = dobStr.split(/[-\.\/]/);
      return {
        day: parseInt(parts[0], 10),
        month: parseInt(parts[1], 10),
        year: parseInt(parts[2], 10),
        original: dobStr
      };
    }
    
    // YYYY-MM-DD, YYYY/MM/DD
    if (dobStr.match(/^\d{4}[-\.\/]\d{1,2}[-\.\/]\d{1,2}$/)) {
      const parts = dobStr.split(/[-\.\/]/);
      return {
        day: parseInt(parts[2], 10),
        month: parseInt(parts[1], 10),
        year: parseInt(parts[0], 10),
        original: dobStr
      };
    }
    
    // YYYYMMDD
    if (dobStr.match(/^\d{8}$/)) {
      return {
        day: parseInt(dobStr.substring(6, 8), 10),
        month: parseInt(dobStr.substring(4, 6), 10),
        year: parseInt(dobStr.substring(0, 4), 10),
        original: dobStr
      };
    }
    
    // Year only (YYYY)
    if (dobStr.match(/^\d{4}$/)) {
      return {
        day: 0,
        month: 0,
        year: parseInt(dobStr, 10),
        original: dobStr,
        yearOnly: true
      };
    }
    
    return null;
  };

  // Compare DOB from Aadhaar and DigiLocker
  const matchDob = (aadhaarDob, dlDob) => {
    
    
    
    
    if (!aadhaarDob || !dlDob) {
      return { 
        matched: false, 
        reason: "DOB data missing",
        aadhaarDob: aadhaarDob || "Not provided",
        digilockerDob: dlDob || "Not provided"
      };
    }

    const aadhaarDate = normalizeDob(aadhaarDob);
    const digilockerDate = normalizeDob(dlDob);

    
    

    if (!aadhaarDate || !digilockerDate) {
      return { 
        matched: false, 
        aadhaarDob, 
        digilockerDob: dlDob, 
        reason: "Could not parse dates" 
      };
    }

    // If either is year-only, just compare years
    if (aadhaarDate.yearOnly || digilockerDate.yearOnly) {
      const matched = aadhaarDate.year === digilockerDate.year;
      return { 
        matched, 
        aadhaarDob, 
        digilockerDob: dlDob, 
        reason: matched ? "Year matched" : "Year mismatch" 
      };
    }

    // Full date comparison
    const matched = 
      aadhaarDate.day === digilockerDate.day && 
      aadhaarDate.month === digilockerDate.month && 
      aadhaarDate.year === digilockerDate.year;

    

    return { 
      matched, 
      aadhaarDob, 
      digilockerDob: dlDob, 
      reason: matched ? "DOB matched" : "DOB mismatch",
      details: {
        aadhaarParsed: aadhaarDate,
        digilockerParsed: digilockerDate
      }
    };
  };

  // Compare names from Aadhaar and DigiLocker
  const matchNames = (aadhaarName, dlName) => {
    
    
    

    if (!aadhaarName || !dlName) {
      return { matched: false, similarity: 0, reason: "Name data missing" };
    }

    const normalize = (str) => str.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim();
    const normalizedAadhaar = normalize(aadhaarName);
    const normalizedDigilocker = normalize(dlName);

    
    

    // Exact match
    if (normalizedAadhaar === normalizedDigilocker) {
      
      return { matched: true, similarity: 1.0 };
    }

    // String similarity
    const similarity = stringSimilarity.compareTwoStrings(normalizedAadhaar, normalizedDigilocker);
    

    // Word-by-word matching
    const aadhaarWords = normalizedAadhaar.split(" ").filter((w) => w.length > 0);
    const digilockerWords = normalizedDigilocker.split(" ").filter((w) => w.length > 0);

    const aadhaarWordsInDigilocker = aadhaarWords.every((word) =>
      digilockerWords.some((dWord) => stringSimilarity.compareTwoStrings(word, dWord) > 0.8)
    );
    const digilockerWordsInAadhaar = digilockerWords.every((word) =>
      aadhaarWords.some((aWord) => stringSimilarity.compareTwoStrings(word, aWord) > 0.8)
    );

    const isMatched = similarity >= 0.8 || (aadhaarWordsInDigilocker && digilockerWordsInAadhaar);

    

    return {
      matched: isMatched,
      similarity,
      details: {
        aadhaarName: normalizedAadhaar,
        digilockerName: normalizedDigilocker,
        similarityScore: (similarity * 100).toFixed(1) + "%",
      },
    };
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }
    if (!tempId) {
      setError("Session expired. Please request OTP again.");
      setStep("aadhaar");
      return;
    }

    setError("");
    setStep("verifying");

    try {
      const result = await verifyAadhaarOtp({ tempId, otp: otpString });

      if (result.error) {
        const errorMessage = result.error?.data?.message || "Verification failed";
        setError(errorMessage);
        setStep("otp");
        toast.error(errorMessage, { position: "top-center" });
        return;
      }

      const response = result.data;
      
      
      
      if (response?.success || response?.status_code === 200) {
        const aadhaarData = extractAadhaarData(response);
        
        setVerifiedData(aadhaarData);

        // Get Aadhaar data
        const aadhaarName = aadhaarData?.name || aadhaarData?.fullName || "";
        const aadhaarDob = aadhaarData?.date_of_birth || aadhaarData?.dob || aadhaarData?.dateOfBirth || aadhaarData?.year_of_birth || "";


        let dobMatched = false;
        let nameMatched = false;

        // DOB Matching - Compare Aadhaar DOB with DigiLocker DOB from API
        if (digilockerDob && aadhaarDob) {
          const dobResult = matchDob(aadhaarDob, digilockerDob);
          
          setDobMatchStatus(dobResult);
          dobMatched = dobResult.matched;
        } else {
          
          // You can decide: fail verification or skip DOB check
          if (!digilockerDob) {
            toast.warning("DigiLocker DOB not available for verification", { position: "top-center" });
            // Option 1: Fail - dobMatched = false;
            // Option 2: Skip - dobMatched = true;
            dobMatched = false; // Fail if no DigiLocker DOB
            setDobMatchStatus({ matched: false, reason: "DigiLocker DOB not available" });
          }
        }

        // Name Matching - Compare Aadhaar Name with DigiLocker Name from API
        if (digilockerName && aadhaarName) {
          const nameResult = matchNames(aadhaarName, digilockerName);
          
          setNameMatchStatus(nameResult);
          nameMatched = nameResult.matched;
        } else {
          
          if (!digilockerName) {
            toast.warning("DigiLocker Name not available for verification", { position: "top-center" });
            nameMatched = false; // Fail if no DigiLocker name
            setNameMatchStatus({ matched: false, reason: "DigiLocker Name not available" });
          }
        }

        // Determine final step based on matches
        if (dobMatched && nameMatched) {
          setStep("success");
          toast.success("Aadhaar verified successfully! Both Name and DOB matched.", { position: "top-center" });
        } else if (dobMatched && !nameMatched) {
          setStep("nameMismatch");
          toast.warning(`DOB matched but Name similarity: ${nameMatchStatus?.details?.similarityScore || 'Low'}`, { position: "top-center" });
        } else if (!dobMatched && nameMatched) {
          setStep("dobMismatch");
          toast.warning("Name matched but DOB mismatch detected", { position: "top-center" });
        } else {
          setStep("dobMismatch"); // or create a new step for both mismatch
          toast.error("Both Name and DOB do not match with DigiLocker data", { position: "top-center" });
        }
      } else {
        setError(response?.message || "Verification failed");
        setStep("otp");
        toast.error(response?.message || "Verification failed", { position: "top-center" });
      }
    } catch (err) {
      const errorMessage = err?.message || "Verification failed";
      setError(errorMessage);
      setStep("otp");
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  const handleProceed = () => {
    // Pass complete verification data to parent
    const aadhaarInfo = {
      isVerified: true,
      aadhaarNumber: aadhaarNumber.replace(/\s/g, ""),
      tempId,
      // Aadhaar API data
      name: verifiedData?.name || "",
      dob: verifiedData?.date_of_birth || verifiedData?.dob || "",
      gender: verifiedData?.gender || "",
      address: verifiedData?.address || verifiedData?.full_address || "",
      photo: verifiedData?.photo || "",
      // Match results
      dobMatched: dobMatchStatus?.matched || false,
      nameMatched: nameMatchStatus?.matched || false,
      similarityScore: nameMatchStatus?.similarity || 0,
      // DigiLocker data used for comparison
      digiLockerDataUsed: {
        name: digilockerName,
        dob: digilockerDob,
      },
      // Full verified data from Aadhaar API
      fullResponse: verifiedData,
    };
    
    
    onVerificationComplete(aadhaarInfo);
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setOtp(["", "", "", "", "", ""]);
    await handleSendOtp();
  };

  const resetForm = () => {
    setStep("aadhaar");
    setAadhaarNumber("");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setVerifiedData(null);
    setDobMatchStatus(null);
    setNameMatchStatus(null);
  };

  // Icon Components
  const AadhaarIcon = () => (
    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const CrossIcon = () => (
    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const WarningIcon = () => (
    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );

  const Spinner = ({ className = "" }) => (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const VerifiedBadge = ({ text }) => (
    <span className="inline-flex items-center text-teal-600 text-xs sm:text-sm font-medium">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {text}
    </span>
  );

  // Check if DigiLocker data is available
  const hasDigiLockerData = digilockerName || digilockerDob;

  return (
    <div className="max-w-md mx-auto">
      {/* Step: Aadhaar Input */}
      {step === "aadhaar" && (
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <AadhaarIcon />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Verify Aadhaar</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Enter your 12-digit Aadhaar number</p>
            
            {/* DigiLocker Data Display - From API */}
            {hasDigiLockerData ? (
              <div className="mt-3 bg-teal-50 rounded-xl px-3 py-2 text-left max-w-xs mx-auto">
                <p className="text-xs text-teal-600 font-medium mb-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  DigiLocker Verified Data:
                </p>
                {digilockerName && (
                  <p className="text-teal-700 text-xs sm:text-sm">
                    <span className="font-medium">Name:</span> {digilockerName}
                  </p>
                )}
                {digilockerDob && (
                  <p className="text-teal-700 text-xs sm:text-sm mt-0.5">
                    <span className="font-medium">DOB:</span> {digilockerDob}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-3 bg-red-50 rounded-xl px-3 py-2 text-left max-w-xs mx-auto">
                <p className="text-red-600 text-xs sm:text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  DigiLocker data not available. Please complete DigiLocker verification first.
                </p>
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={handleAadhaarChange}
              placeholder="XXXX XXXX XXXX"
              className="w-full px-4 py-3 text-center text-lg sm:text-xl tracking-widest border-2 border-gray-200 
                       rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 
                       transition-all outline-none bg-gray-50 focus:bg-white"
              maxLength={14}
              disabled={!hasDigiLockerData}
            />
            <p className="mt-2 text-xs text-gray-400 text-center flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Your Aadhaar is encrypted & secure
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleSendOtp}
            disabled={isSendingOtp || !validateAadhaar(aadhaarNumber) || !hasDigiLockerData}
            className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
              ${isSendingOtp || !validateAadhaar(aadhaarNumber) || !hasDigiLockerData
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 active:scale-[0.98] shadow-lg shadow-teal-200"
              } transition-all`}
          >
            {isSendingOtp ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                Sending...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      )}

      {/* Step: OTP Input */}
      {step === "otp" && (
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <LockIcon />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Enter OTP</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Sent to Aadhaar linked mobile
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {aadhaarNumber.slice(0, 4)} **** {aadhaarNumber.slice(-4)}
            </p>
          </div>

          <div className="flex justify-center gap-1.5 sm:gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handleOtpPaste}
                className="w-10 h-12 sm:w-11 sm:h-13 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 
                         rounded-lg sm:rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 
                         transition-all outline-none bg-gray-50 focus:bg-white"
                maxLength={1}
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleVerifyOtp}
            disabled={isVerifyingOtp || otp.join("").length !== 6}
            className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
              ${isVerifyingOtp || otp.join("").length !== 6
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700 active:scale-[0.98] shadow-lg shadow-teal-200"
              } transition-all`}
          >
            {isVerifyingOtp ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <button
              onClick={() => { setStep("aadhaar"); setOtp(["", "", "", "", "", ""]); setError(""); }}
              className="text-gray-500 hover:text-teal-600 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleResendOtp}
              disabled={countdown > 0 || isSendingOtp}
              className={`${countdown > 0 ? "text-gray-400" : "text-teal-600 hover:text-teal-700"} transition-colors`}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      )}

      {/* Step: Verifying */}
      {step === "verifying" && (
        <div className="text-center py-8 sm:py-10">
          <Loader />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">Verifying Aadhaar</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Comparing with DigiLocker data...</p>
        </div>
      )}

      {/* Step: Success */}
      {step === "success" && (
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckIcon />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Verified!</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Aadhaar matches DigiLocker data</p>
          </div>

          <div className="bg-teal-50 rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs sm:text-sm">Aadhaar Name</span>
              <span className="font-medium text-gray-800 text-xs sm:text-sm">{verifiedData?.name || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs sm:text-sm">DigiLocker Name</span>
              <span className="font-medium text-gray-800 text-xs sm:text-sm">{digilockerName || "N/A"}</span>
            </div>
            {(verifiedData?.date_of_birth || verifiedData?.dob) && (
              <>
                <div className="flex justify-between items-center border-t border-teal-100 pt-2">
                  <span className="text-gray-600 text-xs sm:text-sm">Aadhaar DOB</span>
                  <span className="font-medium text-gray-800 text-xs sm:text-sm">{verifiedData.date_of_birth || verifiedData.dob}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs sm:text-sm">DigiLocker DOB</span>
                  <span className="font-medium text-gray-800 text-xs sm:text-sm">{digilockerDob || "N/A"}</span>
                </div>
              </>
            )}
            {verifiedData?.gender && (
              <div className="flex justify-between items-center border-t border-teal-100 pt-2">
                <span className="text-gray-600 text-xs sm:text-sm">Gender</span>
                <span className="font-medium text-gray-800 text-xs sm:text-sm">
                  {verifiedData.gender === "M" ? "Male" : verifiedData.gender === "F" ? "Female" : verifiedData.gender}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center border-t border-teal-100 pt-2">
              <span className="text-gray-600 text-xs sm:text-sm">DOB Match</span>
              <VerifiedBadge text="Matched" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs sm:text-sm">Name Match</span>
              <VerifiedBadge text={nameMatchStatus?.details?.similarityScore || "Matched"} />
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
                     bg-teal-600 hover:bg-teal-700 active:scale-[0.98] shadow-lg shadow-teal-200 transition-all"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step: DOB Mismatch */}
      {step === "dobMismatch" && (
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CrossIcon />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">DOB Mismatch</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Aadhaar DOB doesn't match DigiLocker</p>
          </div>

          <div className="bg-red-50 rounded-xl p-3 sm:p-4 space-y-2">
            <div>
              <span className="text-gray-500 text-xs">Aadhaar DOB</span>
              <p className="font-medium text-gray-800 text-sm">{verifiedData?.date_of_birth || verifiedData?.dob || "N/A"}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">DigiLocker DOB (from API)</span>
              <p className="font-medium text-gray-800 text-sm">{digilockerDob || "N/A"}</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg">
            ⚠️ The DOB in your Aadhaar doesn't match the DOB from DigiLocker. Please verify you entered the correct Aadhaar number.
          </p>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={resetForm}
              className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium border-2 border-gray-200 
                       text-gray-700 hover:bg-gray-50 text-xs sm:text-sm transition-all"
            >
              Try Again
            </button>
            <button
              onClick={handleProceed}
              className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium text-white
                       bg-gray-500 hover:bg-gray-600 text-xs sm:text-sm transition-all"
            >
              Proceed Anyway
            </button>
          </div>
        </div>
      )}

      {/* Step: Name Mismatch */}
      {step === "nameMismatch" && (
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <WarningIcon />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Name Variation</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">DOB matches but names differ</p>
          </div>

          <div className="bg-teal-50 rounded-lg p-2.5 flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-teal-700 text-xs sm:text-sm font-medium">DOB Verified ✓</span>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 sm:p-4 space-y-2">
            <div>
              <span className="text-gray-500 text-xs">Aadhaar Name</span>
              <p className="font-medium text-gray-800 text-sm">{verifiedData?.name || "N/A"}</p>
            </div>
            <div>
              <span className="text-gray-500 text-xs">DigiLocker Name (from API)</span>
              <p className="font-medium text-gray-800 text-sm">{digilockerName || "N/A"}</p>
            </div>
            {nameMatchStatus?.details && (
              <div className="pt-2 border-t border-amber-200">
                <span className="text-gray-500 text-xs">Similarity Score</span>
                <p className="font-medium text-amber-700 text-sm">{nameMatchStatus.details.similarityScore}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={resetForm}
              className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium border-2 border-gray-200 
                       text-gray-700 hover:bg-gray-50 text-xs sm:text-sm transition-all"
            >
              Try Again
            </button>
            <button
              onClick={handleProceed}
              className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium text-white
                       bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm transition-all"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AadhaarVerification;
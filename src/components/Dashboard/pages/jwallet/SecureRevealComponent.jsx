// import React, { useState, useEffect } from "react";
// import {
//   Eye,
//   EyeOff,
//   Copy,
//   CheckCircle,
//   Lock,
// } from "lucide-react";
// import { encryptPayload, decryptPayload } from "../../../../utils/crypto";
// import {
//   useCheck2FAStatusQuery,
//   useStart2FASetupMutation,
//   useVerify2FAMutation,
//   useRevealSensitiveDataMutation,
//   useDisable2FAMutation,
// } from "./secureRevealApiSlice";
// import OtpInput from "./OtpInput";

// const SecureRevealComponent = () => {
//   const [step, setStep] = useState("initial");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [enableOtp, setEnableOtp] = useState("");
//   const [disableOtp, setDisableOtp] = useState("");
//   const [revealedData, setRevealedData] = useState(null);
//   const [revealed, setRevealed] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [copied, setCopied] = useState(false);
//   const [error, setError] = useState("");
//   const [revealType, setRevealType] = useState("seed");
//   const [passwordRevealed, setPasswordRevealed] = useState(false);
//   const [show2FAModal, setShow2FAModal] = useState(false);
//   const [mode, setMode] = useState(null); // "qr" | "manual"
//   const [qrCode, setQrCode] = useState("");
//   const [manualKey, setManualKey] = useState("");
//   const [is2FAEnabled, setIs2FAEnabled] = useState(false);

//   const is2FAVerified = sessionStorage.getItem("2faVerified") === "true";

//   // RTK Query hooks
//   const { data: statusData, isLoading: checking2FA, refetch: refetch2FA } =
//     useCheck2FAStatusQuery();
//   const [start2FASetup, { isLoading: loadingSetup }] = useStart2FASetupMutation();
//   const [verify2FA, { isLoading: loadingVerify }] = useVerify2FAMutation();
//   const [revealSensitiveData, { isLoading: loadingReveal }] =
//     useRevealSensitiveDataMutation();
//   const [disable2FA, { isLoading: disabling2FA }] = useDisable2FAMutation();

//   useEffect(() => {
//     if (statusData?.data?.twoFactorEnabled) {
//       setIs2FAEnabled(true);
//     }
//   }, [statusData]);

//   useEffect(() => {
//     refetch2FA();
//   }, []);

//   const getApiErrorMessage = (err) => {
//     if (err?.data) {
//       const { message, status_code, data } = err.data;
//       if (status_code === 423 && data?.remainingTime) {
//         return `${message}. Try again in ${data.remainingTime}.`;
//       }
//       return message || "Something went wrong";
//     }
//     return err?.message || "Unexpected error occurred";
//   };

//   const handleStart2FASetup = async () => {
//     setError("");
//     try {
//       const result = await start2FASetup().unwrap();
//       if (result.success === 0) throw new Error(result.message);

//       setQrCode(result.data.qrCodeUrl);
//       setManualKey(result.data.manualKey);
//     } catch (err) {
//       setError(getApiErrorMessage(err));
//     }
//   };

//   const handleOpen2FA = async (selectedMode) => {
//     setMode(selectedMode);
//     setShow2FAModal(true);
//     setError("");

//     // Prevent regenerating secret if already fetched
//     if (qrCode || manualKey) return;

//     await handleStart2FASetup();
//   };

//   const handleVerify2FA = async () => {
//     if (enableOtp.length !== 6) return setError("Enter valid 6-digit code");

//     setError("");
//     try {
//       const result = await verify2FA(enableOtp).unwrap();
//       if (result.success === 0) throw new Error(result.message);

//       // SUCCESS
//       sessionStorage.setItem("2faVerified", "true");

//       // Close modal & cleanup
//       setShow2FAModal(false);
//       setEnableOtp("");
//       setMode(null);
//       setQrCode("");
//       setManualKey("");
//       setIs2FAEnabled(true);
//       setError("");
//     } catch (err) {
//       setError(getApiErrorMessage(err));
//     }
//   };

//   const handleDisable2FA = async () => {
//     if (disableOtp.length !== 6) return setError("Enter valid 2FA code to disable");
//     setError("");
//     try {
//       const res = await disable2FA(disableOtp).unwrap();
//       if (res.success === 0) throw new Error(res.message);

//       sessionStorage.removeItem("2faVerified");
//       sessionStorage.removeItem("2faVerifiedTime");
//       setDisableOtp("");
//       setIs2FAEnabled(false);
//       setShow2FAModal(false);
//       setError("");
//       // alert("2FA disabled successfully");
//     } catch (err) {
//       setError(getApiErrorMessage(err));
//     }
//   };

//   const handleReveal = async () => {
//     if (!password) return setError("Please enter your password");
//     if (is2FAEnabled && otp.length !== 6)
//       return setError("Please enter a valid 6-digit 2FA code");

//     setError("");
//     try {
//       const payload = {
//         action: revealType === "seed" ? "reveal_seed_phrase" : "reveal_private_key",
//         otp: otp || null,
//         timestamp: Date.now(),
//       };

//       const { consent, terms } = await encryptPayload(payload, password);
//       const revealPayload = { consent, terms, password, otp: otp || null };
//       const result = await revealSensitiveData(revealPayload).unwrap();
//       if (result.success === 0) throw new Error(result.message);

//       const decryptedData = await decryptPayload(result.data.consent, result.data.terms, password);

//       setRevealedData(decryptedData);
//       setStep("display");

//       if (is2FAEnabled) {
//         sessionStorage.setItem("2faVerified", "true");
//         sessionStorage.setItem("2faVerifiedTime", Date.now().toString());
//       }

//       let counter = 60;
//       const timer = setInterval(() => {
//         counter--;
//         setTimeLeft(counter);
//         if (counter === 0) {
//           clearInterval(timer);
//           handleClose();
//         }
//       }, 1000);
//     } catch (err) {
//       setError(getApiErrorMessage(err));
//     }
//   };

//   const handleCopy = () => {
//     const textToCopy = revealType === "seed" ? revealedData?.seedPhrase : revealedData?.privateKey;
//     if (textToCopy) {
//       navigator.clipboard.writeText(textToCopy);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleClose = () => {
//     setStep("initial");
//     setPassword("");
//     setOtp("");
//     setRevealedData(null);
//     setRevealed(false);
//     setTimeLeft(60);
//     setError("");
//     setQrCode("");
//     setManualKey("");
//   };

//   useEffect(() => {
//     if (qrCode || manualKey) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [qrCode, manualKey]);

//   if (checking2FA) {
//     return (
//       <div className="min-h-screen bg-green-50 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <div className="max-w-2xl mx-auto">
//         {/* Initial Step */}
//         {step === "initial" && (
//           <div className="p-4 sm:p-6 md:p-8">
//             <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
//               Access Sensitive Data
//             </h1>
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-2">
//               <div className="flex gap-2 sm:gap-3">
//                 {/* <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} /> */}
//                 <div className="text-xs sm:text-sm text-red-800">
//                   <p className="font-semibold mb-2">Security Warning</p>
//                   <ul className="space-y-1 list-disc list-inside">
//                     <li>Never share your seed phrase or private key</li>
//                     <li>Ensure you're in a private location</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {is2FAEnabled ? (
//               <div className="mb-2 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
//                 <div className="flex items-center gap-2 text-green-700">
//                   <CheckCircle size={18} />
//                   <span className="font-semibold text-sm sm:text-base">2FA is enabled for your account</span>
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-700 mt-2">
//                   {is2FAVerified
//                     ? "✓ You have already verified with 2FA in this session"
//                     : "You will be asked for your authenticator code when revealing sensitive data"}
//                 </p>

//                 {/* Disable 2FA Button */}
//                 <div className="mt-3">
//                   <button
//                     onClick={() => setShow2FAModal(true)}
//                     className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-full text-sm sm:text-base transition-colors"
//                   >
//                     Disable 2FA
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="mb-4 sm:mb-6">
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-3">
//                   <p className="text-yellow-800 text-xs sm:text-sm">
//                     <strong>Recommended:</strong> Enable 2FA for additional security when accessing sensitive data.
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleOpen2FA("qr")}
//                     className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 rounded-full"
//                   >
//                     Scan QR Code
//                   </button>
//                   <button
//                     onClick={() => handleOpen2FA("manual")}
//                     className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-full"
//                   >
//                     Use Manual Key
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* 2FA Modal - Enable or Disable */}
//             {show2FAModal && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
//                 <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl">
//                   {is2FAEnabled ? (
//                     // Disable 2FA Modal
//                     <>
//                       <h2 className="text-lg font-bold text-center mb-3 text-red-600">Disable 2FA</h2>
//                       <p className="text-sm text-gray-600 text-center mb-4">
//                         Enter your authenticator code to disable two-factor authentication
//                       </p>

//                       <OtpInput value={disableOtp} onChange={setDisableOtp} />
//                       <p className="text-xs text-gray-500 text-center mt-2">Enter 6-digit code from your authenticator app</p>

//                       {error && (
//                         <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2">
//                           <p className="text-red-700 text-xs text-center">{error}</p>
//                         </div>
//                       )}

//                       <div className="flex gap-2 mt-4">
//                         <button
//                           onClick={() => {
//                             setShow2FAModal(false);
//                             setDisableOtp("");
//                             setError("");
//                           }}
//                           className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 rounded-lg font-semibold transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleDisable2FA}
//                           disabled={disabling2FA || disableOtp.length !== 6}
//                           className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2.5 rounded-lg font-semibold transition-colors"
//                         >
//                           {disabling2FA ? "Disabling..." : "Disable"}
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     // Enable 2FA Modal
//                     <>
//                       <h2 className="text-lg font-bold text-center mb-3">Enable Google Authenticator</h2>

//                       {mode === "qr" && qrCode && (
//                         <div className="flex justify-center mb-4">
//                           <img src={qrCode} alt="QR Code" className="w-40 h-40 border rounded-lg" />
//                         </div>
//                       )}

//                       {mode === "manual" && manualKey && (
//                         <div className="bg-gray-50 border rounded-lg p-3 mb-4 flex justify-between items-center">
//                           <code className="text-xs break-all">{manualKey}</code>
//                           <button
//                             onClick={() => navigator.clipboard.writeText(manualKey)}
//                             className="text-xs bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600 transition-colors"
//                           >
//                             Copy
//                           </button>
//                         </div>
//                       )}

//                       <OtpInput value={enableOtp} onChange={setEnableOtp} />
//                       <p className="text-xs text-teal-400 text-center mt-2">Enter 6-digit OTP</p>

//                       {error && (
//                         <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2">
//                           <p className="text-red-700 text-xs text-center">{error}</p>
//                         </div>
//                       )}

//                       <div className="flex gap-2 mt-4">
//                         <button
//                           onClick={() => {
//                             setShow2FAModal(false);
//                             setEnableOtp("");
//                             setError("");
//                             setMode(null);
//                           }}
//                           className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 rounded-lg font-semibold transition-colors"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleVerify2FA}
//                           disabled={loadingVerify || enableOtp.length !== 6}
//                           className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-400 text-white py-2.5 rounded-lg font-semibold transition-colors"
//                         >
//                           {loadingVerify ? "Verifying..." : "Verify"}
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Reveal Options */}
//             <div className="mb-4 sm:mb-6">
//               <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
//                 What do you want to reveal?
//               </label>
//               <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                 <button
//                   onClick={() => setRevealType("seed")}
//                   className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${revealType === "seed" ? "border-teal-500 bg-teal-50" : "border-gray-300 bg-gray-50"}`}
//                 >
//                   <div className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">Seed Phrase</div>
//                   <div className="text-xs text-gray-600">12-word recovery phrase</div>
//                 </button>
//                 <button
//                   onClick={() => setRevealType("private")}
//                   className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${revealType === "private" ? "border-teal-500 bg-teal-50" : "border-gray-300 bg-gray-50"}`}
//                 >
//                   <div className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">Private Key</div>
//                   <div className="text-xs text-gray-600">Hexadecimal key</div>
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={() => setStep("verify")}
//               className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
//             >
//               I Understand, Continue
//             </button>
//           </div>
//         )}

//         {/* Verify Step */}
//         {step === "verify" && (
//           <div className="p-4 sm:p-6 md:p-8">
//             <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">Verify Your Identity</h1>
//             {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"><p className="text-red-700 text-xs sm:text-sm">{error}</p></div>}

//             <div className="space-y-3 sm:space-y-4 mt-4">
//               <div>
//                 <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Enter Jaimax Password</label>
//                 <div className="relative">
//                   <input
//                     type={passwordRevealed ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm sm:text-base pr-10"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setPasswordRevealed(!passwordRevealed)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none transition-colors"
//                   >
//                     {passwordRevealed ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {is2FAEnabled && (
//                 <div className="mb-4">
//                   <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">2FA Code from Google Authenticator</label>
//                   <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4">
//                     <OtpInput length={6} value={otp} onChange={setOtp} />
//                     <p className="text-xs sm:text-sm text-gray-600 mt-2">Enter the 6-digit code from your authenticator app</p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
//                 <button
//                   onClick={() => setStep("initial")}
//                   className="w-full sm:flex-1 bg-teal-100 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleReveal}
//                   disabled={loadingReveal || !password || (is2FAEnabled && otp.length !== 6)}
//                   className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-teal-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
//                 >
//                   {loadingReveal ? "Verifying..." : "Verify & Decrypt"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Display Step */}
//         {step === "display" && revealedData && (
//           <div className="p-4 sm:p-6 md:p-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <Eye className="text-teal-600 flex-shrink-0" size={24} />
//                 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
//                   {revealType === "seed" ? "Seed Phrase" : "Private Key"}
//                 </h1>
//               </div>
//               <div className="text-left sm:text-right">
//                 <div className="text-xs text-gray-600">Auto-hide in</div>
//                 <div className={`text-xl sm:text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-teal-600"}`}>
//                   {timeLeft}s
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 border border-teal-200">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-xs sm:text-sm font-medium text-gray-700">
//                   {revealType === "seed" ? "Seed Phrase" : "Private Key"}
//                 </span>
//                 <button onClick={() => setRevealed(!revealed)} className="text-teal-600 hover:text-teal-700 transition-colors">
//                   {revealed ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>

//               {revealType === "seed" ? (
//                 // Seed Phrase in 4x3 Grid (MetaMask style)
//                 <div className={`grid grid-cols-3 gap-2 sm:gap-3 ${!revealed ? "blur-lg select-none" : ""}`}>
//                   {revealedData.seedPhrase.split(" ").map((word, index) => (
//                     <div key={index} className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
//                       <span className="text-xs text-gray-500 mr-1">{index + 1}.</span>
//                       <span className="font-mono text-sm sm:text-base text-gray-800">{word}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 // Private Key as single text
//                 <div className={`font-mono text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed break-all ${!revealed ? "blur-lg select-none" : ""}`}>
//                   {revealedData.privateKey}
//                 </div>
//               )}
//             </div>
//             {/* 
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <div className="text-gray-600 mb-1">Public Address</div>
//                 <div className="text-gray-800 font-mono text-xs break-all">{revealedData.publicAddress}</div>
//               </div>
//               <div className="bg-gray-50 rounded-lg p-3">
//                 <div className="text-gray-600 mb-1">Retrieved At</div>
//                 <div className="text-gray-800 font-mono text-xs">{new Date(revealedData.retrievedAt).toLocaleString()}</div>
//               </div>
//             </div> */}

//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//               <button
//                 onClick={handleClose}
//                 className="w-full sm:w-auto px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleCopy}
//                 disabled={!revealed}
//                 className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-teal-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
//               >
//                 {copied ? (
//                   <>
//                     <CheckCircle size={18} />
//                     Copied!
//                   </>
//                 ) : (
//                   <>
//                     <Copy size={18} />
//                     Copy to Clipboard
//                   </>
//                 )}
//               </button>
//             </div>

//             <div className="mt-4 text-xs text-gray-600 text-center">
//               This action has been logged. A notification may be sent to your email.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SecureRevealComponent;





import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  Lock,
} from "lucide-react";
import { encryptPayload, decryptPayload } from "../../../../utils/crypto";
import {
  useCheck2FAStatusQuery,
  useStart2FASetupMutation,
  useVerify2FAMutation,
  useRevealSensitiveDataMutation,
  useDisable2FAMutation,
} from "./secureRevealApiSlice";
import OtpInput from "./OtpInput";
import Loader from '../../../../ReusableComponents/Loader/loader'
const SecureRevealComponent = () => {
  const [step, setStep] = useState("initial");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [enableOtp, setEnableOtp] = useState("");
  const [disableOtp, setDisableOtp] = useState("");
  const [revealedData, setRevealedData] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [revealType, setRevealType] = useState("seed");
  const [passwordRevealed, setPasswordRevealed] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [mode, setMode] = useState(null); // "qr" | "manual"
  const [qrCode, setQrCode] = useState("");
  const [manualKey, setManualKey] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const is2FAVerified = sessionStorage.getItem("2faVerified") === "true";

  // RTK Query hooks
  const { data: statusData, isLoading: checking2FA, refetch: refetch2FA } =
    useCheck2FAStatusQuery();
  const [start2FASetup, { isLoading: loadingSetup }] = useStart2FASetupMutation();
  const [verify2FA, { isLoading: loadingVerify }] = useVerify2FAMutation();
  const [revealSensitiveData, { isLoading: loadingReveal }] =
    useRevealSensitiveDataMutation();
  const [disable2FA, { isLoading: disabling2FA }] = useDisable2FAMutation();

  useEffect(() => {
    if (statusData?.data?.twoFactorEnabled) {
      setIs2FAEnabled(true);
    }
  }, [statusData]);

  useEffect(() => {
    refetch2FA();
  }, []);

  const getApiErrorMessage = (err) => {
    if (err?.data) {
      const { message, status_code, data } = err.data;
      if (status_code === 423 && data?.remainingTime) {
        return `${message}. Try again in ${data.remainingTime}.`;
      }
      return message || "Something went wrong";
    }
    return err?.message || "Unexpected error occurred";
  };

  const handleStart2FASetup = async () => {
    setError("");
    try {
      const result = await start2FASetup().unwrap();
      if (result.success === 0) throw new Error(result.message);

      setQrCode(result.data.qrCodeUrl);
      setManualKey(result.data.manualKey);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleOpen2FA = async (selectedMode) => {
    setMode(selectedMode);
    setShow2FAModal(true);
    setError("");

    // Prevent regenerating secret if already fetched
    if (qrCode || manualKey) return;

    await handleStart2FASetup();
  };

  const handleVerify2FA = async () => {
    if (enableOtp.length !== 6) return setError("Enter valid 6-digit code");

    setError("");
    try {
      const result = await verify2FA(enableOtp).unwrap();
      if (result.success === 0) throw new Error(result.message);

      // SUCCESS
      sessionStorage.setItem("2faVerified", "true");

      // Close modal & cleanup
      setShow2FAModal(false);
      setEnableOtp("");
      setMode(null);
      setQrCode("");
      setManualKey("");
      setIs2FAEnabled(true);
      setError("");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleDisable2FA = async () => {
    if (disableOtp.length !== 6) return setError("Enter valid 2FA code to disable");
    setError("");
    try {
      const res = await disable2FA(disableOtp).unwrap();
      if (res.success === 0) throw new Error(res.message);

      sessionStorage.removeItem("2faVerified");
      sessionStorage.removeItem("2faVerifiedTime");
      setDisableOtp("");
      setIs2FAEnabled(false);
      setShow2FAModal(false);
      setError("");
      alert("2FA disabled successfully");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleReveal = async () => {
    if (!password) return setError("Please enter your password");
    if (is2FAEnabled && otp.length !== 6)
      return setError("Please enter a valid 6-digit 2FA code");

    setError("");
    try {
      const payload = {
        action: revealType === "seed" ? "reveal_seed_phrase" : "reveal_private_key",
        otp: otp || null,
        timestamp: Date.now(),
      };

      const { consent, terms } = await encryptPayload(payload, password);
      const revealPayload = { consent, terms, password, otp: otp || null };
      const result = await revealSensitiveData(revealPayload).unwrap();
      if (result.success === 0) throw new Error(result.message);

      const decryptedData = await decryptPayload(result.data.consent, result.data.terms, password);

      setRevealedData(decryptedData);
      setStep("display");

      if (is2FAEnabled) {
        sessionStorage.setItem("2faVerified", "true");
        sessionStorage.setItem("2faVerifiedTime", Date.now().toString());
      }

      let counter = 60;
      const timer = setInterval(() => {
        counter--;
        setTimeLeft(counter);
        if (counter === 0) {
          clearInterval(timer);
          handleClose();
        }
      }, 1000);
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleCopy = () => {
    const textToCopy = revealType === "seed" ? revealedData?.seedPhrase : revealedData?.privateKey;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setStep("initial");
    setPassword("");
    setOtp("");
    setRevealedData(null);
    setRevealed(false);
    setTimeLeft(60);
    setError("");
    setQrCode("");
    setManualKey("");
  };

  useEffect(() => {
    if (qrCode || manualKey) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [qrCode, manualKey]);

  if (checking2FA) {
    return (
     <Loader/>
    );
  }

  return (
    <div className="">
      <div className="max-w-2xl mx-auto">
        {/* Initial Step */}
        {step === "initial" && (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Access Sensitive Data
            </h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-2 sm:mb-2">
              <div className="flex gap-2 sm:gap-3">
                {/* <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} /> */}
                <div className="text-xs sm:text-sm text-red-800">
                  <p className="font-semibold mb-2">Security Warning</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Never share your seed phrase or private key</li>
                    <li>Ensure you're in a private location</li>
                  </ul>
                </div>
              </div>
            </div>
            {is2FAEnabled ? (
              <div className="mb-2 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle size={18} />
                  <span className="font-semibold text-sm sm:text-base">2FA is enabled for your account</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">
                  {is2FAVerified
                    ? "✓ You have already verified with 2FA in this session"
                    : "You will be asked for your authenticator code when revealing sensitive data"}
                </p>

                {/* Disable 2FA Button */}
                <div className="mt-3">
                  <button
                    onClick={() => setShow2FAModal(true)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-full text-sm sm:text-base transition-colors"
                  >
                    Disable 2FA
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-4 sm:mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-3">
                  <p className="text-yellow-800 text-xs sm:text-sm">
                    <strong>Recommended:</strong> Enable 2FA for additional security when accessing sensitive data.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleOpen2FA("qr")}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 rounded-full"
                  >
                    Scan QR Code
                  </button>
                  <button
                    onClick={() => handleOpen2FA("manual")}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-full"
                  >
                    Use Manual Key
                  </button>
                </div>
              </div>
            )}

            {/* 2FA Modal - Enable or Disable */}
            {show2FAModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-xl">
                  {is2FAEnabled ? (
                    // Disable 2FA Modal
                    <>
                      <h2 className="text-lg font-bold text-center mb-3 text-red-600">Disable 2FA</h2>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Enter your authenticator code to disable two-factor authentication
                      </p>

                      <OtpInput value={disableOtp} onChange={setDisableOtp} />
                      <p className="text-xs text-gray-500 text-center mt-2">Enter 6-digit code from your authenticator app</p>

                      {error && (
                        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2">
                          <p className="text-red-700 text-xs text-center">{error}</p>
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => {
                            setShow2FAModal(false);
                            setDisableOtp("");
                            setError("");
                          }}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 rounded-lg font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDisable2FA}
                          disabled={disabling2FA || disableOtp.length !== 6}
                          className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2.5 rounded-lg font-semibold transition-colors"
                        >
                          {disabling2FA ? "Disabling..." : "Disable"}
                        </button>
                      </div>
                    </>
                  ) : (
                    // Enable 2FA Modal
                    <>
                      <h2 className="text-lg font-bold text-center mb-3">Enable Google Authenticator</h2>

                      {mode === "qr" && qrCode && (
                        <div className="flex justify-center mb-4">
                          <img src={qrCode} alt="QR Code" className="w-40 h-40 border rounded-lg" />
                        </div>
                      )}

                      {mode === "manual" && manualKey && (
                        <div className="bg-gray-50 border rounded-lg p-3 mb-4 flex justify-between items-center">
                          <code className="text-xs break-all">{manualKey}</code>
                          <button
                            onClick={() => navigator.clipboard.writeText(manualKey)}
                            className="text-xs bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      )}

                      <OtpInput value={enableOtp} onChange={setEnableOtp} />
                      <p className="text-xs text-teal-400 text-center mt-2">Enter 6-digit OTP</p>

                      {error && (
                        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2">
                          <p className="text-red-700 text-xs text-center">{error}</p>
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => {
                            setShow2FAModal(false);
                            setEnableOtp("");
                            setError("");
                            setMode(null);
                          }}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 rounded-lg font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleVerify2FA}
                          disabled={loadingVerify || enableOtp.length !== 6}
                          className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-400 text-white py-2.5 rounded-lg font-semibold transition-colors"
                        >
                          {loadingVerify ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Reveal Options */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                What do you want to reveal?
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setRevealType("seed")}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${revealType === "seed" ? "border-teal-500 bg-teal-50" : "border-gray-300 bg-gray-50"}`}
                >
                  <div className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">Seed Phrase</div>
                  <div className="text-xs text-gray-600">12-word recovery phrase</div>
                </button>
                <button
                  onClick={() => setRevealType("private")}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${revealType === "private" ? "border-teal-500 bg-teal-50" : "border-gray-300 bg-gray-50"}`}
                >
                  <div className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">Private Key</div>
                  <div className="text-xs text-gray-600">Hexadecimal key</div>
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep("verify")}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
            >
              I Understand, Continue
            </button>
          </div>
        )}

        {/* Verify Step */}
        {step === "verify" && (
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">Verify Your Identity</h1>
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"><p className="text-red-700 text-xs sm:text-sm">{error}</p></div>}

            <div className="space-y-3 sm:space-y-4 mt-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Enter Jaimax Password</label>
                <div className="relative">
                  <input
                    type={passwordRevealed ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-gray-800 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-sm sm:text-base pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordRevealed(!passwordRevealed)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600 focus:outline-none transition-colors"
                  >
                    {passwordRevealed ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {is2FAEnabled && (
                <div className="mb-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">2FA Code from Google Authenticator</label>
                  <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4">
                    <OtpInput length={6} value={otp} onChange={setOtp} />
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">Enter the 6-digit code from your authenticator app</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  onClick={() => setStep("initial")}
                  className="w-full sm:flex-1 bg-teal-100 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReveal}
                  disabled={loadingReveal || !password || (is2FAEnabled && otp.length !== 6)}
                  className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-teal-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all text-sm sm:text-base"
                >
                  {loadingReveal ? "Verifying..." : "Verify & Decrypt"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Step */}
        {step === "display" && revealedData && (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Eye className="text-teal-600 flex-shrink-0" size={24} />
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  {revealType === "seed" ? "Seed Phrase" : "Private Key"}
                </h1>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs text-gray-600">Auto-hide in</div>
                <div className={`text-xl sm:text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-teal-600"}`}>
                  {timeLeft}s
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 border border-teal-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {revealType === "seed" ? "Seed Phrase" : "Private Key"}
                </span>
                <button onClick={() => setRevealed(!revealed)} className="text-teal-600 hover:text-teal-700 transition-colors">
                  {revealed ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {revealType === "seed" ? (
                // Seed Phrase in 4x3 Grid (MetaMask style)
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ${!revealed ? "blur-lg select-none" : ""}`}>
                  {revealedData.seedPhrase.split(" ").map((word, index) => (
                    <div key={index} className="bg-white rounded-lg p-2 border border-gray-200">
                      <span className="text-[10px] text-gray-500 mr-1">{index + 1}.</span>
                      <span className="font-mono text-xs text-gray-800">{word}</span>
                    </div>
                  ))}
                </div>
              ) : (
                // Private Key as single text
                <div className={`font-mono text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed break-all ${!revealed ? "blur-lg select-none" : ""}`}>
                  {revealedData.privateKey}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 mb-1">Public Address</div>
                <div className="text-gray-800 font-mono text-xs break-all">{revealedData.publicAddress}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-600 mb-1">Retrieved At</div>
                <div className="text-gray-800 font-mono text-xs">{new Date(revealedData.retrievedAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleCopy}
                disabled={!revealed}
                className="w-full sm:flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-teal-400 disabled:to-teal-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 rounded-full transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {copied ? (
                  <>
                    <CheckCircle size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy to Clipboard
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-600 text-center">
              This action has been logged. A notification may be sent to your email.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureRevealComponent;
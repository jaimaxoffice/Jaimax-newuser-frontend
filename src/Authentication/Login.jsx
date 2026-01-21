// import React, {
//   useState,
//   useEffect,
//   useContext,
//   useRef,
//   useCallback,
// } from "react";
// import { Link } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   Phone,
//   Users,
//   Sparkles,
//   Shield,
//   ChevronDown,
//   AlertCircle,
//   CheckCircle,
//   CreditCard,
//   ChevronRight,
//   FileText,
//   ArrowRight,
//   Info,
//   Calendar,
//   ArrowLeft,
//   Globe,
//   Camera,
  
// } from "lucide-react";
// import icon from "../assets/Images/greencoin.webp";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import {
//   useRegisterMutation,
//   useVerifyMutation,
//   useLoginMutation,
//   useOTPresentMutation,
//   useSendAadhaarOtpMutation,
//   useVerifyAadhaarOtpMutation,
//   useVerifyPanMutation,
// } from "./authApiSlice";
// import Seo from "../SeoContent/Seo";
// import countrycodes from "./countryCodes.json";
// import TermsConditionsModal from "./TermsAndConditions";
// import * as yup from "yup";
// import Webcam from "react-webcam";
// import loaderImage from "../assets/jcoin.webp";
// import Loader from '../ReusableComponents/Loader/loader'
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor =
//     type === "success"
//       ? "bg-green-50 border-green-200"
//       : "bg-red-50 border-red-200";
//   const textColor = type === "success" ? "text-green-800" : "text-red-800";
//   const Icon = type === "success" ? CheckCircle : AlertCircle;

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}
//     >
//       <div className="flex items-center gap-3">
//         <Icon className="h-5 w-5 flex-shrink-0" />
//         <p className="text-sm font-medium">{message}</p>
//         <button
//           onClick={onClose}
//           className="ml-auto text-gray-400 hover:text-gray-600"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// };

// const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Use the prop if provided, otherwise fallback to imported data
//   const dataSource = countryCodes || countrycodes;

//   const filteredCountries = dataSource.filter(
//     (country) =>
//       country.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       country.country_code.includes(searchTerm) ||
//       country.country_code_alpha3
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   const selectedCountry =
//     dataSource.find((c) => c.country_code === value) || dataSource[0];

//   // Add click outside handler to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest(".country-dropdown-container")) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="country-dropdown-container relative">
//       <button
//         type="button"
//         onClick={() => {
//           // console.log('Dropdown button clicked, isOpen:', !isOpen);
//           setIsOpen(!isOpen);
//         }}
//         className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
//       >
//         <span className="flex items-center gap-2 text-sm">
//           <span className="text-lg">{selectedCountry?.flag}</span>
//           <span className="font-medium">{selectedCountry?.country_code}</span>
//         </span>
//         <ChevronDown
//           className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* IMPORTANT: Added fixed positioning and higher z-index */}
//       {isOpen && (
//         <div
//           className="fixed top-auto left-auto mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-hidden"
//           style={{
//             zIndex: 9999,
//             position: "absolute",
//             top: "100%",
//             left: "0",
//             minWidth: "280px",
//           }}
//         >
//           <div className="p-3 border-b border-gray-100 bg-gray-50">
//             <input
//               type="text"
//               placeholder="Search countries..."
//               value={searchTerm}
//               onChange={(e) => {
//                 // console.log('Search term:', e.target.value);
//                 setSearchTerm(e.target.value);
//               }}
//               className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>

//           <div className="max-h-48 overflow-y-auto bg-white">
//             {/* {console.log('Rendering countries, count:', filteredCountries.length)} */}
//             {filteredCountries.length > 0 ? (
//               filteredCountries.map((country, index) => {
//                 // console.log('Rendering country:', country.country_name);
//                 return (
//                   <button
//                     key={`${country.country_code}-${country.country_code_alpha3}-${index}`}
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       // console.log('Selected country:', country);
//                       onChange(country.country_code);
//                       setIsOpen(false);
//                       setSearchTerm("");
//                     }}
//                     className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
//                   >
//                     <span className="text-lg">{country.flag}</span>
//                     <span className="font-medium text-gray-900">
//                       {country.country_code}
//                     </span>
//                     <span className="text-gray-600 truncate">
//                       {country.country_name}
//                     </span>
//                   </button>
//                 );
//               })
//             ) : (
//               <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                 {dataSource.length === 0
//                   ? "No country data loaded"
//                   : "No countries found"}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const LoginComponent = ({ onToggleMode, isVisible,toggleLoader }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const [login, { isLoading, error: loginError }] = useLoginMutation();
//   const loginschema = {
//     "@context": "https://schema.org",
//     "@type": "WebPage",
//     "@id": "https://www.jaimax.com/login",
//     url: "https://www.jaimax.com/login",
//     name: "Jaimax Account Login",
//     description:
//       "Securely log in to your Jaimax account to access your wallet, transactions and digital finance dashboard.",
//     inLanguage: "en",
//     isPartOf: { "@id": "https://www.jaimax.com/#website" },
//     about: {
//       "@id": "https://www.jaimax.com/#organization",
//     },
//     potentialAction: {
//       "@type": "LoginAction",
//       target: "https://www.jaimax.com/login",
//     },
//   };
//   // Handle login error from RTK Query
//   useEffect(() => {
//     if (loginError) {
//       const message =
//         loginError?.data?.message || "Login failed. Please try again.";
//       setNotification({ type: "error", message });
//     }
//   }, [loginError]);

//   // Load saved email and remember me status
//   useEffect(() => {
//     const savedEmail = localStorage.getItem("email");
//     const savedRememberMe = localStorage.getItem("rememberMe") === "true";

//     if (savedEmail) {
//       setFormData((prevValues) => ({ ...prevValues, email: savedEmail }));
//     }
//     setRememberMe(savedRememberMe);
//   }, []);

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (!formData.email?.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleRememberMeChange = (e) => {
//     setRememberMe(e.target.checked);
//   };

//   // Enhanced keydown handler for Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !isLoading) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       setNotification({
//         type: "error",
//         message: "Please fix the highlighted fields.",
//       });
//       return;
//     }
//     // toggleLoader(true);
//     if (rememberMe) {
//       Cookies.set("email", formData.email?.trim(), { expires: 30 });
//       Cookies.set("rememberMe", "true", { expires: 30 });
//     } else {
//       Cookies.remove("email");
//       Cookies.remove("rememberMe");
//     }

//     try {
//       const response = await login({
//         email: formData.email?.trim(),
//         password: formData.password,
//         role: 1,
//       }).unwrap();

//       if (response?.success) {
//         const userData = response?.data;

//         // store tokens & user info
//         Cookies.set("token", userData?.token, { expires: 7 });
//         sessionStorage.setItem("token", userData?.token);
//         Cookies.set("userData", JSON.stringify(userData), { expires: 7 });

//         setNotification({
//           type: "success",
//           message: response?.message || "Login successful! Redirecting...",
//         });

//         // ✅ check KYC status before redirect
//         setTimeout(() => {
//           if (userData?.kycVerified === "approve") {
//             navigate("/dashboard");
//             // console.log("Redirecting to Dashboard");
//           } else {
//             navigate("/kyc-information");
//             // console.log("Redirecting to KYC Information");
//           }
//         }, 1000);
//       } else {
//         setNotification({
//           type: "error",
//           message: response?.message || "Login failed.",
//         });
//       }
//     } catch (err) {
//       const errorMessage = err?.data?.message || "Login error";
//       setNotification({
//         type: "error",
//         message: errorMessage,
//       });
//     }
//   };

//   return (
//     <div
//       className={`w-full max-w-md transition-all duration-500 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//       }`}
//     >
//       <Seo page="login" />

//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2 uppercase">
//           Login
//         </h1>
//         <p className="text-gray-600">
//           If you are already a customer, enter your details
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email Field */}
//         <div className="relative mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email <span className="text-red-500 ml-1">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your email"
//               autoComplete="off"
//               className={`w-full pl-10 pr-4 bg-white py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             />
//           </div>
//           {errors.email && (
//             <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="relative mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password <span className="text-red-500 ml-1">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your password"
//               autoComplete="off"
//               className={`w-full bg-white pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-gray-400" />
//               ) : (
//                 <Eye className="h-5 w-5 text-gray-400" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <div className="text-red-500 text-sm mt-1">{errors.password}</div>
//           )}
//         </div>

//         {/* Remember Me and Forgot Password */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               checked={rememberMe}
//               onChange={handleRememberMeChange}
//               className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
//             />
//             <label
//               htmlFor="rememberMe"
//               className="ml-2 text-sm text-gray-600 cursor-pointer"
//             >
//               Remember me
//             </label>
//           </div>
//           <Link
//             to="/forgot-password"
//             className="text-teal-600 hover:text-teal-700 text-sm font-medium"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 uppercase"
//         >
//           {isLoading ? "Signing In..." : "Login"}
//         </button>
//       </form>

//       {/* Register Link */}
//       <div className="mt-8 text-center">
//         <p className="text-gray-600 mb-2">Don't have an account?</p>
//         <button
//           onClick={onToggleMode}
//           className="text-teal-600 hover:text-teal-700 font-semibold"
//         >
//           Register Now
//         </button>
//       </div>
//     </div>
//   );
// };

// const STEPS_INDIAN = [
//   { id: 1, title: "Country", icon: Globe },
//   { id: 2, title: "Aadhaar", icon: FileText },
//   { id: 3, title: "PAN", icon: CreditCard },
//   { id: 4, title: "Photo", icon: Camera },
//   { id: 5, title: "Register", icon: User },
// ];

// const STEPS_FOREIGN = [
//   { id: 1, title: "Country", icon: Globe },
//   { id: 2, title: "Details", icon: User },
//   { id: 3, title: "Photo", icon: Camera },
//   { id: 4, title: "Register", icon: User },
// ];

// // Progress Bar - Made Responsive
// const ProgressBar = ({ currentStep, steps }) => {
//   return (
//     <div className="w-full mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-0">
//       <div className="flex justify-between items-center relative">
//         {/* Background line */}
//         <div className="absolute top-3 sm:top-4 lg:top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

//         {/* Progress line */}
//         <div
//           className="absolute top-3 sm:top-4 lg:top-5 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 -z-10 transition-all duration-500"
//           style={{
//             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         />

//         {steps.map((step) => {
//           const StepIcon = step.icon;
//           const isCompleted = currentStep > step.id;
//           const isCurrent = currentStep === step.id;

//           return (
//             <div key={step.id} className="flex flex-col items-center z-10">
//               <div
//                 className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
//                   isCompleted
//                     ? "bg-teal-500 border-teal-500 text-white"
//                     : isCurrent
//                     ? "bg-white border-teal-500 text-teal-500 shadow-lg shadow-teal-200"
//                     : "bg-white border-gray-300 text-gray-400"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                 ) : (
//                   <StepIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                 )}
//               </div>
//               <span
//                 className={`mt-1 text-[8px] sm:text-[10px] lg:text-xs font-medium text-center max-w-[40px] sm:max-w-[60px] lg:max-w-[80px] leading-tight ${
//                   isCurrent
//                     ? "text-teal-600"
//                     : isCompleted
//                     ? "text-teal-500"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.title}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // Country Selection Step - Made Responsive
// const CountrySelectionStep = ({
//   formData,
//   setFormData,
//   onNext,
//   setIsIndianUser,
// }) => {
//   const [selectedCountry, setSelectedCountry] = useState(
//     formData.countryCode || "+91"
//   );

//   const handleContinue = () => {
//     const isIndian = selectedCountry === "+91";
//     setIsIndianUser(isIndian);
//     setFormData((prev) => ({
//       ...prev,
//       countryCode: selectedCountry,
//       country: isIndian
//         ? "India"
//         : countrycodes.find((c) => c.country_code === selectedCountry)
//             ?.country_name || "Other",
//     }));
//     onNext();
//   };

//   return (
//     <div className="space-y-3">
//       {/* Compact Header */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//           <Globe className="h-5 w-5 text-blue-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             Select Your Country
//           </h2>
//           <p className="text-xs text-gray-500">
//             Choose your country to continue registration
//           </p>
//         </div>
//       </div>

//       {/* Country Dropdown */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 mb-1 inline-block">
//           Country
//         </label>
//         <CountryCodeDropdown
//           value={selectedCountry}
//           onChange={setSelectedCountry}
//           className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
//           countryCodes={countrycodes}
//           showFullCountry={true}
//         />
//       </div>

//       {/* Compact Information Box */}
//       <div className="bg-gray-50 rounded-lg p-2 text-xs">
//         <div className="flex items-start gap-1.5">
//           <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
//           <div className="text-gray-600">
//             {selectedCountry === "+91" ? (
//               <div>
//                 <p className="font-medium">Indian Citizens:</p>
//                 <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5">
//                   <li>Aadhaar verification required</li>
//                   <li>PAN verification required</li>
//                   <li>Live photo verification</li>
//                 </ul>
//               </div>
//             ) : (
//               <div>
//                 <p className="font-medium">International Users:</p>
//                 <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5">
//                   <li>Photo ID verification required</li>
//                   <li>Live photo capture for identity</li>
//                   <li>Manual KYC review process</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleContinue}
//         className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 
//                  rounded-full text-sm font-medium hover:from-teal-600 hover:to-teal-700 
//                  transition-all flex items-center justify-center gap-1.5 mt-2"
//       >
//         Continue
//         <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// // Aadhaar Step - Made Responsive
// const AadhaarStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   touched,
//   setTouched,
//   onNext,
//   onPrev,
//   setNotification,
//   toggleLoader
// }) => {
//   const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResend, setCanResend] = useState(false);

//   const [sendAadhaarOtp, { isLoading: isSendingOtp }] =
//     useSendAadhaarOtpMutation();
//   const [verifyAadhaarOtp, { isLoading: isVerifyingOtp }] =
//     useVerifyAadhaarOtpMutation();

//   useEffect(() => {
//     let interval;
//     if (aadhaarOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [aadhaarOtpSent, timer]);

//   const handleSendAadhaarOtp = async () => {
//     if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
//       setErrors((prev) => ({
//         ...prev,
//         aadhaarNumber: "Please enter a valid 12-digit Aadhaar number",
//       }));
//       return;
//     }
// toggleLoader?.(true);
//     try {
//       const result = await sendAadhaarOtp({
//         aadhaarNumber: formData.aadhaarNumber,
//       }).unwrap();

//       setFormData((prev) => ({
//         ...prev,
//         aadhaarTempId: result.data?.tempId || result.tempId,
//       }));

//       setAadhaarOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       setNotification({
//         type: "success",
//         message: "OTP sent to your Aadhaar-linked mobile!",
//       });
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Failed to send OTP",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleVerifyAadhaar = async () => {
//     if (!formData.aadhaarOtp || formData.aadhaarOtp.length !== 6) {
//       setErrors((prev) => ({
//         ...prev,
//         aadhaarOtp: "Please enter 6-digit OTP",
//       }));
//       return;
//     }
// toggleLoader?.(true);
//     try {
//       const result = await verifyAadhaarOtp({
//         tempId: formData.aadhaarTempId,
//         otp: formData.aadhaarOtp,
//       }).unwrap();

//       setFormData((prev) => ({
//         ...prev,
//         aadhaarVerified: true,
//         aadhaarData: result.data,
//         name: result.data?.name || prev.name,
//         dob: result.data?.dob || prev.dob,
//       }));

//       setNotification({
//         type: "success",
//         message: "Aadhaar verified successfully!",
//       });
//       setTimeout(() => onNext(), 1000);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "OTP verification failed",
//       });
//     }finally {
//       toggleLoader?.(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {/* Compact Header with Side Icon */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
//           <FileText className="h-5 w-5 text-teal-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             Aadhaar Verification
//           </h2>
//           <p className="text-xs text-gray-500">
//             Verify your identity with Aadhaar
//           </p>
//         </div>
//       </div>

//       {/* Aadhaar Number Input */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Aadhaar Number
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FileText className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             maxLength={12}
//             value={formData.aadhaarNumber || ""}
//             onChange={(e) => {
//               const value = e.target.value.replace(/\D/g, "");
//               setFormData((prev) => ({ ...prev, aadhaarNumber: value }));
//               if (errors.aadhaarNumber && value.length === 12) {
//                 setErrors((prev) => ({ ...prev, aadhaarNumber: null }));
//               }
//             }}
//             placeholder="Enter 12-digit Aadhaar number"
//             disabled={aadhaarOtpSent && !canResend}
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all ${
//               errors.aadhaarNumber
//                 ? "border-red-500 bg-red-50"
//                 : "border-gray-300"
//             } ${aadhaarOtpSent && !canResend ? "bg-gray-100" : "bg-white"}`}
//           />
//         </div>
//         {errors.aadhaarNumber && (
//           <p className="text-red-500 text-xs">{errors.aadhaarNumber}</p>
//         )}
//         <p className="text-xs text-gray-500">
//           Format: XXXX XXXX XXXX (12 digits)
//         </p>
//       </div>

//       {/* OTP Section */}
//       {aadhaarOtpSent && (
//         <div className="space-y-1 animate-fadeIn">
//           <label className="text-xs font-medium text-gray-700">Enter OTP</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Shield className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               maxLength={6}
//               value={formData.aadhaarOtp || ""}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "");
//                 setFormData((prev) => ({ ...prev, aadhaarOtp: value }));
//               }}
//               placeholder="Enter 6-digit OTP"
//               className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
//             />
//           </div>
//           <p className="text-xs text-gray-500">
//             OTP sent to your Aadhaar-linked mobile number
//           </p>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-2">
//         {!aadhaarOtpSent ? (
//           <button
//             onClick={handleSendAadhaarOtp}
//             disabled={
//               isSendingOtp ||
//               !formData.aadhaarNumber ||
//               formData.aadhaarNumber.length !== 12
//             }
//             className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
//           >
//             {isSendingOtp ? (
//               <>
                
//                 Sending OTP...
//               </>
//             ) : (
//               <>
//                 Send OTP
//                 <ArrowRight className="w-5 h-5" />
//               </>
//             )}
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={handleSendAadhaarOtp}
//               disabled={!canResend || isSendingOtp}
//               className="px-4 py-1 border border-teal-500 text-teal-600 rounded-full font-medium hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               {timer > 0 ? `Resend (${timer}s)` : "Resend OTP"}
//             </button>
//             <button
//               onClick={handleVerifyAadhaar}
//               disabled={
//                 isVerifyingOtp ||
//                 !formData.aadhaarOtp ||
//                 formData.aadhaarOtp.length !== 6
//               }
//               className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
//             >
//               {isVerifyingOtp ? (
//                 <>
                
//                   Verifying...
//                 </>
//               ) : (
//                 <>
//                   Verify
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // PAN Step - Made Responsive
// const PanStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onNext,
//   onPrev,
//   setNotification,
//   toggleLoader
// }) => {
//   const [verifyPan, { isLoading }] = useVerifyPanMutation();

//   const handleVerifyPan = async () => {
//     const panErrors = {};

//     if (
//       !formData.panNumber ||
//       !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)
//     ) {
//       panErrors.panNumber = "Enter valid PAN (e.g., ABCDE1234F)";
//     }
//     if (!formData.panName) {
//       panErrors.panName = "Name is required";
//     }
//     if (!formData.panDob) {
//       panErrors.panDob = "Date of birth is required";
//     }

//     if (Object.keys(panErrors).length > 0) {
//       setErrors((prev) => ({ ...prev, ...panErrors }));
//       return;
//     }
//  toggleLoader?.(true);
//     try {
//       const result = await verifyPan({
//         tempId: formData.aadhaarTempId,
//         panNumber: formData.panNumber,
//         name: formData.panName,
//         dob: formData.panDob,
//       }).unwrap();

//       setFormData((prev) => ({
//         ...prev,
//         panVerified: true,
//         panData: result.data,
//       }));

//       setNotification({
//         type: "success",
//         message: "PAN verified successfully!",
//       });
//       setTimeout(() => onNext(), 1000);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "PAN verification failed",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {/* Compact Header with Side Icon */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//           <CreditCard className="h-5 w-5 text-blue-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             PAN Verification
//           </h2>
//           <p className="text-xs text-gray-500">Verify your PAN card details</p>
//         </div>
//       </div>

//       {/* PAN Number */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">PAN Number</label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <CreditCard className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             maxLength={10}
//             value={formData.panNumber || ""}
//             onChange={(e) => {
//               const value = e.target.value
//                 .toUpperCase()
//                 .replace(/[^A-Z0-9]/g, "");
//               setFormData((prev) => ({ ...prev, panNumber: value }));
//             }}
//             placeholder="Enter PAN number (e.g., ABCDE1234F)"
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white ${
//               errors.panNumber ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.panNumber && (
//           <p className="text-red-500 text-xs">{errors.panNumber}</p>
//         )}
//       </div>

//       {/* Name on PAN */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Name (as on PAN)
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             value={formData.panName || formData.name || ""}
//             onChange={(e) => {
//               const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
//               setFormData((prev) => ({ ...prev, panName: value }));
//             }}
//             placeholder="Enter name as on PAN card"
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white ${
//               errors.panName ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.panName && (
//           <p className="text-red-500 text-xs">{errors.panName}</p>
//         )}
//       </div>

//       {/* Date of Birth */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Date of Birth
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Calendar className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="date"
//             value={formData.panDob || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, panDob: e.target.value }))
//             }
//             max={new Date().toISOString().split("T")[0]}
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white ${
//               errors.panDob ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.panDob && (
//           <p className="text-red-500 text-xs">{errors.panDob}</p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-2">
//         <button
//           onClick={onPrev}
//           className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back
//         </button>
//         <button
//           onClick={handleVerifyPan}
//           disabled={isLoading}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
//         >
//           {isLoading ? (
//             <>
            
//               Verifying...
//             </>
//           ) : (
//             <>
//               Verify PAN
//               <ArrowRight className="w-5 h-5" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Photo Capture Step - Made Responsive
// const PhotoCaptureStep = ({
//   formData,
//   setFormData,
//   onNext,
//   onPrev,
//   setNotification,
// }) => {
//   const webcamRef = useRef(null);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState(
//     formData.livePhoto || null
//   );
//   const [facingMode, setFacingMode] = useState("user");
//   const [hasPermission, setHasPermission] = useState(true);

//   const videoConstraints = {
//     width: { ideal: 1280, min: 640 },
//     height: { ideal: 720, min: 480 },
//     facingMode: facingMode,
//   };

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setFormData((prev) => ({ ...prev, livePhoto: imageSrc }));
//       setIsCapturing(false);
//     }
//   }, [webcamRef, setFormData]);

//   const retakePhoto = () => {
//     setCapturedPhoto(null);
//     setFormData((prev) => ({ ...prev, livePhoto: null }));
//     setIsCapturing(true);
//   };

//   const handleUserMediaError = () => {
//     setHasPermission(false);
//     setNotification({
//       type: "error",
//       message: "Camera access denied. Please allow camera access.",
//     });
//   };

//   const handleNext = () => {
//     if (!capturedPhoto) {
//       setNotification({
//         type: "error",
//         message: "Please capture a photo to continue",
//       });
//       return;
//     }
//     onNext();
//   };

//   return (
//     <div className="space-y-2">
//       {/* Minimal Header */}
//       <div className="flex items-center mb-1.5">
//         <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
//           <Camera className="h-4 w-4 text-indigo-600" />
//         </div>
//         <h2 className="text-sm font-bold text-gray-800">Photo Verification</h2>
//       </div>

//       {/* Camera/Photo Display - Reduced height */}
//       <div className="relative bg-gray-100 rounded overflow-hidden h-[190px]">
//         {!isCapturing && !capturedPhoto && (
//           <div className="flex flex-col items-center justify-center h-full p-2">
//             <Camera className="w-8 h-8 text-gray-400 mb-1" />
//             <p className="text-xs text-gray-600 mb-1.5">Camera not active</p>
//             {hasPermission ? (
//               <button
//                 onClick={() => setIsCapturing(true)}
//                 className="px-3 py-1.5 bg-teal-500 text-white rounded-full text-xs hover:bg-teal-600"
//               >
//                 Start Camera
//               </button>
//             ) : (
//               <div className="text-center">
//                 <p className="text-[10px] text-red-600">
//                   Camera permission denied
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {isCapturing && hasPermission && (
//           <div className="relative w-full h-full">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={videoConstraints}
//               onUserMediaError={handleUserMediaError}
//               className="w-full h-full object-cover"
//               mirrored={facingMode === "user"}
//             />
//             {/* Face guide overlay */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="w-24 h-32 border-2 border-white/80 rounded shadow"></div>
//             </div>
//             {/* Camera switch button */}
//             <button
//               onClick={() =>
//                 setFacingMode((prev) =>
//                   prev === "user" ? "environment" : "user"
//                 )
//               }
//               className="absolute top-1 right-1 p-1.5 bg-white/70 rounded-full hover:bg-white/90 shadow-sm"
//             >
//               <svg
//                 className="w-3.5 h-3.5 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                 />
//               </svg>
//             </button>
//           </div>
//         )}

//         {capturedPhoto && (
//           <div className="relative w-full h-full">
//             <img
//               src={capturedPhoto}
//               alt="Captured"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-1 right-1 bg-green-500 text-white px-1.5 py-0.5 rounded-sm text-xs">
//               ✓ Photo Captured
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Minimal Instructions - Inline */}
//       <div className="bg-blue-50 rounded p-1.5 text-[10px] flex items-start gap-1">
//         <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
//         <div className="text-blue-700">
//           <span className="font-medium">Tips: </span>
//           Face camera directly • Good lighting • No glare from glasses
//         </div>
//       </div>

//       {/* Action Buttons - Compact */}
//       <div className="flex gap-1.5">
//         <button
//           onClick={onPrev}
//           className="px-2.5 py-1.5 border border-gray-300 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-50"
//         >
//           <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
//           Back
//         </button>

//         {isCapturing ? (
//           <button
//             onClick={capture}
//             className="flex-1 bg-teal-500 text-white py-1.5 rounded-full text-xs font-medium hover:bg-teal-600 flex items-center justify-center"
//           >
//             <Camera className="w-3.5 h-3.5 mr-1" />
//             Capture
//           </button>
//         ) : capturedPhoto ? (
//           <>
//             <button
//               onClick={retakePhoto}
//               className="flex-1 border border-teal-500 text-teal-600 py-1.5 rounded-full text-xs font-medium hover:bg-teal-50"
//             >
//               Retake
//             </button>
//             <button
//               onClick={handleNext}
//               className="flex-1 bg-teal-500 text-white py-1.5 rounded-full text-xs font-medium hover:bg-teal-600 flex items-center justify-center"
//             >
//               Continue
//               <ArrowRight className="w-3.5 h-3.5 ml-1" />
//             </button>
//           </>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// const PersonalDetailsAndSetupStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onPrev,
//   setNotification,
//   isChecked,
//   setIsChecked,
//   isConfirmAgree,
//   onShowModal,
//   onComplete,
//   toggleLoader
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResend, setCanResend] = useState(false);

//   const navigate = useNavigate();

//   const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
//   const [OTPresent, { isLoading: isResending }] = useOTPresentMutation();

//   useEffect(() => {
//     let interval;
//     if (emailOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0 && emailOtpSent) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [emailOtpSent, timer]);

//   const validatePersonalDetails = () => {
//     const stepErrors = {};
//     if (!formData.phone || formData.phone.length !== 10)
//       stepErrors.phone = "Enter valid 10-digit phone";
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       stepErrors.email = "Enter valid email";
//     if (!formData.password || formData.password.length < 6)
//       stepErrors.password = "Min 6 characters";
//     if (formData.password !== formData.confirmPassword)
//       stepErrors.confirmPassword = "Passwords don't match";
//     setErrors((prev) => ({ ...prev, ...stepErrors }));
//     return Object.keys(stepErrors).length === 0;
//   };

//   const getEssentialUserData = (data) => ({
//     _id: data._id,
//     name: data.name,
//     role: data.role,
//     email: data.email,
//     country: data.country,
//     city: data.city || "N/A",
//     state: data.state || "N/A",
//     address: data.address || "N/A",
//     phone: data.phone,
//     countryCode: data.countryCode,
//     username: data.username,
//     permissions: data.permissions || [],
//     walletadress: data.walletadress,
//     kycVerified: data.kycVerified,
//     token: data.token,
//   });

//   const handleSendEmailOtp = async () => {
//     if (!validatePersonalDetails()) return;
// toggleLoader?.(true);
//     try {
//       const payload = {
//         tempId: formData.aadhaarTempId,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword,
//         countryCode: formData.countryCode || "+91",
//         country: formData.country || "India",
//         livePhoto: formData.livePhoto,
//       };

//       const result = await register(payload).unwrap();

//       if (result?.data) {
//         const essentialData = getEssentialUserData(result.data);
//         Cookies.set("token", essentialData.token, { expires: 7 });
//         sessionStorage.setItem("token", essentialData.token);
//         Cookies.set("userData", JSON.stringify(essentialData), { expires: 7 });
//       }

//       setEmailOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       setNotification({ type: "success", message: "OTP sent to your email!" });
//     } catch (err) {
//       if (err?.data?.message === "User verification pending") {
//         try {
//           await OTPresent({
//             email: formData.email,
//             otpType: "register",
//             tempId: formData.aadhaarTempId,
//           }).unwrap();
//           setEmailOtpSent(true);
//           setTimer(120);
//           setCanResend(false);
//           setNotification({ type: "success", message: "OTP resent!" });
//         } catch (otpErr) {
//           setNotification({
//             type: "error",
//             message: otpErr?.data?.message || "Failed to resend OTP",
//           });
//         }
//       } else {
//         setNotification({
//           type: "error",
//           message: err?.data?.message || "Failed to send OTP",
//         });
//       }
      
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleResendOtp = async () => {
//      toggleLoader?.(true);
//     try {
//       await OTPresent({
//         email: formData.email,
//         otpType: "register",
//         tempId: formData.aadhaarTempId,
//       }).unwrap();
//       setTimer(120);
//       setCanResend(false);
//       setNotification({ type: "success", message: "OTP resent!" });
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Failed to resend OTP",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleFinalSubmit = async () => {
//     if (!isChecked || !isConfirmAgree) {
//       setNotification({
//         type: "error",
//         message: "Please accept Terms & Conditions",
//       });
//       return;
//     }
//     if (!formData.emailOtp || formData.emailOtp.length !== 6) {
//       setErrors((prev) => ({ ...prev, emailOtp: "Enter 6-digit OTP" }));
//       return;
//     }
//  toggleLoader?.(true);
//     try {
//       const res = await verify({
//         tempId: formData.aadhaarTempId,
//         email: formData.email,
//         otp: Number(formData.emailOtp),
//         otpType: "register",
//         referenceId: formData.referralId || "",
//       }).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: "error",
//           message: res.message || "Verification failed",
//         });
//         return;
//       }

//       if (res?.data) {
//         const essentialData = getEssentialUserData(res.data);
//         Cookies.set("token", essentialData.token, { expires: 7 });
//         sessionStorage.setItem("token", essentialData.token);
//         Cookies.set("userData", JSON.stringify(essentialData), { expires: 7 });
//       }

//       onComplete?.();
//       setNotification({ type: "success", message: "Registration successful!" });
//       setTimeout(() => navigate("/dashboard"), 1500);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Registration failed",
//       });
//        toggleLoader?.(false);
//     }
//   };

//   const isFormValid =
//     formData.phone?.length === 10 &&
//     formData.email &&
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
//     formData.password?.length >= 6 &&
//     formData.password === formData.confirmPassword;

//   const canSubmit =
//     emailOtpSent &&
//     formData.emailOtp?.length === 6 &&
//     isChecked &&
//     isConfirmAgree;

//   return (
//     <div className="space-y-3">
//       {/* Compact Header with Verification Badges */}
//       <div className="flex items-center justify-between pb-2 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-sm">
//             <Sparkles className="h-4 w-4 text-white" />
//           </div>
//           <div>
//             <h2 className="text-sm font-semibold text-gray-800">
//               Complete Registration
//             </h2>
//             <p className="text-[10px] text-gray-500">
//               Final step - verify your email
//             </p>
//           </div>
//         </div>
//         {/* Inline Verification Badges */}
//         <div className="hidden sm:flex items-center gap-1.5">
//           {["Aadhaar", "PAN", "Photo"].map((item) => (
//             <span
//               key={item}
//               className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-medium"
//             >
//               <CheckCircle className="w-2.5 h-2.5" />
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Verification Badges */}
//       <div className="flex sm:hidden items-center gap-1.5 flex-wrap">
//         {["Aadhaar", "PAN", "Photo"].map((item) => (
//           <span
//             key={item}
//             className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-medium"
//           >
//             <CheckCircle className="w-2.5 h-2.5" />
//             {item}
//           </span>
//         ))}
//         {formData.name && (
//           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium truncate max-w-[100px]">
//             <User className="w-2.5 h-2.5" />
//             {formData.name}
//           </span>
//         )}
//       </div>

//       {/* Form Grid - Responsive */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//         {/* Phone */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Phone Number
//           </label>
//           <div className="relative">
//             {/* FIXED: Added pointer-events-none to icon container */}
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Phone className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="tel"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               autoComplete="tel"
//               maxLength={10}
//               value={formData.phone || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({
//                   ...p,
//                   phone: e.target.value.replace(/\D/g, ""),
//                 }))
//               }
//               placeholder="10-digit number"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.phone
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//           </div>
//           {errors.phone && (
//             <p className="text-red-500 text-[10px]">{errors.phone}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Email Address
//           </label>
//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Mail className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               inputMode="email"
//               autoComplete="email"
//               value={formData.email || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({
//                   ...p,
//                   email: e.target.value.toLowerCase(),
//                 }))
//               }
//               placeholder="your@email.com"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.email
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//           </div>
//           {errors.email && (
//             <p className="text-red-500 text-[10px]">{errors.email}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Password
//           </label>
//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Lock className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               autoComplete="new-password"
//               value={formData.password || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, password: e.target.value }))
//               }
//               placeholder="Min 6 characters"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-9 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.password
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//             {/* FIXED: Proper touch target for toggle button */}
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               disabled={emailOtpSent}
//               className="absolute right-0 top-0 h-full px-2.5 flex items-center justify-center 
//                 text-gray-400 hover:text-gray-600 disabled:opacity-50 touch-manipulation"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4" />
//               ) : (
//                 <Eye className="h-4 w-4" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-[10px]">{errors.password}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Lock className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               autoComplete="new-password"
//               value={formData.confirmPassword || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, confirmPassword: e.target.value }))
//               }
//               placeholder="Re-enter password"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-9 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.confirmPassword
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               disabled={emailOtpSent}
//               className="absolute right-0 top-0 h-full px-2.5 flex items-center justify-center 
//                 text-gray-400 hover:text-gray-600 disabled:opacity-50 touch-manipulation"
//               aria-label={
//                 showConfirmPassword ? "Hide password" : "Show password"
//               }
//             >
//               {showConfirmPassword ? (
//                 <EyeOff className="h-4 w-4" />
//               ) : (
//                 <Eye className="h-4 w-4" />
//               )}
//             </button>
//           </div>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-[10px]">{errors.confirmPassword}</p>
//           )}
//         </div>
//       </div>

//       {/* Referral - Full Width */}
//       <div className="space-y-0.5">
//         <label className="text-[11px] font-medium text-gray-600">
//           Referral ID{" "}
//           <span className="text-gray-400 font-normal">(Optional)</span>
//         </label>
//         <div className="relative">
//           <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//             <Users className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             autoComplete="off"
//             maxLength={13}
//             value={formData.referralId || ""}
//             onChange={(e) =>
//               setFormData((p) => ({
//                 ...p,
//                 referralId: e.target.value
//                   .toUpperCase()
//                   .replace(/[^A-Z0-9]/g, ""),
//               }))
//             }
//             placeholder="Enter referral code"
//             disabled={emailOtpSent}
//             className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg 
//               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//               ${
//                 emailOtpSent
//                   ? "bg-gray-50 text-gray-500"
//                   : "bg-white border-gray-200"
//               }`}
//           />
//         </div>
//       </div>

//       {/* OTP Section */}
//       {!emailOtpSent ? (
//         <button
//           onClick={handleSendEmailOtp}
//           disabled={isRegistering || !isFormValid}
//           className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-full text-sm font-medium 
//             hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 
//             disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md touch-manipulation"
//         >
//           {isRegistering ? (
//             <>
           
//               <span>Sending OTP...</span>
//             </>
//           ) : (
//             <>
//               <Mail className="w-4 h-4" />
//               <span>Send OTP to Email</span>
//             </>
//           )}
//         </button>
//       ) : (
//         <div className="p-2.5 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border border-teal-100">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-1.5">
//               <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                 <CheckCircle className="w-3 h-3 text-white" />
//               </div>
//               <span className="text-xs text-gray-600 truncate">
//                 OTP sent to{" "}
//                 <span className="font-medium text-gray-800">
//                   {formData.email?.slice(0, 15)}...
//                 </span>
//               </span>
//             </div>
//            <button
//   onClick={handleResendOtp}
//   disabled={isResending || !canResend}
//   className={`text-xs font-medium px-2 py-1 rounded-full transition-all flex-shrink-0 touch-manipulation ${
//     canResend
//       ? "text-teal-600 hover:bg-teal-100 active:bg-teal-200"
//       : "text-gray-400"
//   }`}
// >
//   {canResend ? "Resend" : <span className="tabular-nums">{timer}s</span>}
// </button>

//           </div>

//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Shield className="h-4 w-4 text-teal-500" />
//             </div>
//             <input
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               autoComplete="one-time-code"
//               maxLength={6}
//               value={formData.emailOtp || ""}
//               onChange={(e) => {
//                 setFormData((p) => ({
//                   ...p,
//                   emailOtp: e.target.value.replace(/\D/g, ""),
//                 }));
//                 if (errors.emailOtp)
//                   setErrors((p) => ({ ...p, emailOtp: null }));
//               }}
//               placeholder="Enter 6-digit OTP"
//               className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg text-center tracking-[0.3em] font-mono
//                 focus:ring-2 focus:ring-teal-500 outline-none bg-white
//                 ${errors.emailOtp ? "border-red-400" : "border-teal-200"}`}
//             />
//           </div>
//           {errors.emailOtp && (
//             <p className="text-red-500 text-[10px] text-center mt-1">
//               {errors.emailOtp}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Terms - Compact */}
//       <label className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation">
//         <input
//           type="checkbox"
//           checked={isChecked && isConfirmAgree}
//           onChange={(e) =>
//             e.target.checked ? onShowModal() : setIsChecked(false)
//           }
//           className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
//         />
//         <span className="text-[11px] text-gray-600 leading-relaxed">
//           I agree to the{" "}
//           <button
//             type="button"
//             onClick={onShowModal}
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Terms & Conditions
//           </button>{" "}
//           and{" "}
//           <button
//             type="button"
//             onClick={onShowModal}
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Privacy Policy
//           </button>
//         </span>
//       </label>

//       {/* Action Buttons - Compact */}
//       <div className="flex gap-2 pt-1">

//         <button
//           onClick={handleFinalSubmit}
//           disabled={isVerifying || !canSubmit}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-full text-sm font-medium 
//             hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed 
//             transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md touch-manipulation"
//         >
//           {isVerifying ? (
//             <>
              
//               <span>Creating...</span>
//             </>
//           ) : (
//             <>
//               <span>Complete Registration</span>
//               <CheckCircle className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const ForeignPersonalDetailsStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onNext,
//   onPrev,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validateStep = () => {
//     const stepErrors = {};
//     if (!formData.name || formData.name.length < 2)
//       stepErrors.name = "Name required";
//     if (!formData.phone || formData.phone.length < 8)
//       stepErrors.phone = "Valid phone required";
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       stepErrors.email = "Valid email required";
//     if (!formData.password || formData.password.length < 6)
//       stepErrors.password = "Min 6 characters";
//     if (formData.password !== formData.confirmPassword)
//       stepErrors.confirmPassword = "Passwords don't match";
//     setErrors((prev) => ({ ...prev, ...stepErrors }));
//     return Object.keys(stepErrors).length === 0;
//   };

//   return (
//     <div className="space-y-2">
//       {/* Horizontal Header */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//           <User className="h-5 w-5 text-purple-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             Personal Details
//           </h2>
//           <p className="text-xs text-gray-500">
//             Enter your personal information
//           </p>
//         </div>
//       </div>

//       {/* Name */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">Full Name</label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             value={formData.name || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, name: e.target.value }))
//             }
//             placeholder="Enter your full name"
//             className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//               errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//       </div>

//       {/* Phone */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Phone Number
//         </label>
//         <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-teal-500 overflow-hidden">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//               <Phone className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="tel"
//               value={formData.phone || ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   phone: e.target.value.replace(/[^\d]/g, ""),
//                 }))
//               }
//               placeholder="Enter phone number"
//               className="w-full pl-9 pr-4 py-2 border-0 outline-none bg-white"
//             />
//           </div>
//         </div>
//         {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
//       </div>

//       {/* Email */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Email Address
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             value={formData.email || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 email: e.target.value.toLowerCase(),
//               }))
//             }
//             placeholder="Enter your email"
//             className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//               errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//       </div>

//       {/* Password and Confirm Password in one line */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">Password</label>
//         <div className="grid grid-cols-2 gap-2">
//           {/* Password */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={formData.password || ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, password: e.target.value }))
//               }
//               placeholder="Create password"
//               className={`w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//                 errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-2 flex items-center"
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4 text-gray-400" />
//               ) : (
//                 <Eye className="h-4 w-4 text-gray-400" />
//               )}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={formData.confirmPassword || ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   confirmPassword: e.target.value,
//                 }))
//               }
//               placeholder="Confirm password"
//               className={`w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//                 errors.confirmPassword
//                   ? "border-red-500 bg-red-50"
//                   : "border-gray-300"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute inset-y-0 right-0 pr-2 flex items-center"
//             >
//               {showConfirmPassword ? (
//                 <EyeOff className="h-4 w-4 text-gray-400" />
//               ) : (
//                 <Eye className="h-4 w-4 text-gray-400" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-between">
//           {errors.password && (
//             <p className="text-red-500 text-xs">{errors.password}</p>
//           )}
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
//           )}
//         </div>
//       </div>

//       {/* Referral ID */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Referral ID <span className="text-gray-400">(Optional)</span>
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             maxLength={13}
//             value={formData.referralId || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 referralId: e.target.value
//                   .toUpperCase()
//                   .replace(/[^A-Z0-9]/g, ""),
//               }))
//             }
//             placeholder="Enter referral ID"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-2">
//         <button
//           onClick={onPrev}
//           className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back
//         </button>
//         <button
//           onClick={() => validateStep() && onNext()}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
//         >
//           Continue
//           <ArrowRight className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const ForeignAccountSetupStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onPrev,
//   setNotification,
//   isChecked,
//   setIsChecked,
//   isConfirmAgree,
//   onShowModal,
//    toggleLoader
// }) => {
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResend, setCanResend] = useState(false);
//   const navigate = useNavigate();

//   const [registerForeign, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verifyForeign, { isLoading: isVerifying }] = useVerifyMutation();

//   useEffect(() => {
//     let interval;
//     if (emailOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [emailOtpSent, timer]);

//   const handleSendEmailOtp = async () => {
//     toggleLoader?.(true);
//     try {
//       const result = await registerForeign({
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword,
//         countryCode: formData.countryCode,
//         country: formData.country,
//         referralId: formData.referralId,
//         livePhoto: formData.livePhoto,
//       }).unwrap();

//       if (result?.data?.username)
//         Cookies.set("username", result.data.username, { expires: 7 });
//       setEmailOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       setNotification({ type: "success", message: "OTP sent!" });
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Failed to send OTP",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleFinalSubmit = async () => {
//      toggleLoader?.(false);
//     if (!isChecked || !isConfirmAgree) {
//       setNotification({ type: "error", message: "Accept Terms & Conditions" });
//       return;
//     }
//     if (!formData.emailOtp || formData.emailOtp.length !== 6) {
//       setErrors((prev) => ({ ...prev, emailOtp: "Enter 6-digit OTP" }));
//       return;
//     }
//  toggleLoader?.(false);
//     try {
//       const res = await verifyForeign({
//         email: formData.email,
//         otp: Number(formData.emailOtp),
//         otpType: "register",
//         referenceId: formData.referralId || "",

//       }).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: "error",
//           message: res.message || "Verification failed",
//         });
//          toggleLoader?.(false);
//         return;
//       }

//       Cookies.set("token", res?.data?.token, { expires: 7 });
//       Cookies.set("userData", JSON.stringify(res?.data), { expires: 7 });
//       setNotification({ type: "success", message: "Registration successful!" });
//       setTimeout(() => navigate("/dashboard"), 1000);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Registration failed",
//       });
//       toggleLoader?.(false);
//     }
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="text-center mb-4 sm:mb-6">
//         <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//           <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Account Setup
//         </h2>
//       </div>

//       {/* Summary */}
//       <div className="bg-gray-50 rounded-xl p-3 sm:p-4 space-y-2">
//         <h3 className="text-sm font-medium text-gray-700">Summary</h3>
//         <div className="flex items-center gap-2">
//           <CheckCircle className="w-4 h-4 text-green-500" />
//           <span className="text-xs sm:text-sm text-gray-600">
//             Details Completed
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <CheckCircle className="w-4 h-4 text-green-500" />
//           <span className="text-xs sm:text-sm text-gray-600">
//             Photo Captured
//           </span>
//         </div>
//       </div>

//       {/* Email OTP */}
//       <div className="space-y-3">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//           <div>
//             <p className="text-xs sm:text-sm font-medium text-gray-700">
//               Email Verification
//             </p>
//             <p className="text-xs text-gray-500 truncate max-w-[200px]">
//               {formData.email}
//             </p>
//           </div>
//           <button
//             onClick={handleSendEmailOtp}
//             disabled={isRegistering || (emailOtpSent && !canResend)}
//             className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${
//               emailOtpSent && !canResend
//                 ? "bg-green-100 text-green-700"
//                 : "bg-teal-500 text-white hover:bg-teal-600"
//             } disabled:opacity-50`}
//           >
//             {isRegistering
//               ? "Sending..."
//               : emailOtpSent && !canResend
//               ? `Resend (${timer}s)`
//               : emailOtpSent
//               ? "Resend"
//               : "Send OTP"}
//           </button>
//         </div>

//         {emailOtpSent && (
//           <div className="space-y-1 animate-fadeIn">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                 <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 maxLength={6}
//                 value={formData.emailOtp || ""}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     emailOtp: e.target.value.replace(/\D/g, ""),
//                   }))
//                 }
//                 placeholder="Enter 6-digit OTP"
//                 className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//                   errors.emailOtp ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//             </div>
//             {errors.emailOtp && (
//               <p className="text-red-500 text-xs">{errors.emailOtp}</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Terms */}
//       <div className="flex items-start gap-2 sm:gap-3">
//         <input
//           type="checkbox"
//           id="foreignTerms"
//           checked={isChecked && isConfirmAgree}
//           onChange={(e) =>
//             e.target.checked ? onShowModal() : setIsChecked(false)
//           }
//           className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600"
//         />
//         <label
//           htmlFor="foreignTerms"
//           className="text-xs sm:text-sm text-gray-600"
//         >
//           I agree to{" "}
//           <button
//             type="button"
//             onClick={onShowModal}
//             className="text-teal-600 hover:underline"
//           >
//             Terms & Conditions
//           </button>
//         </label>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

//         <button
//           onClick={handleFinalSubmit}
//           disabled={
//             isVerifying ||
//             !emailOtpSent ||
//             !formData.emailOtp ||
//             formData.emailOtp.length !== 6 ||
//             !isChecked ||
//             !isConfirmAgree
//           }
//           className="order-1 sm:order-2 flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 sm:py-2 rounded-full text-sm sm:text-base font-medium disabled:opacity-50 flex items-center justify-center gap-2"
//         >
//           {isVerifying ? (
//             <>
              
//               Creating...
//             </>
//           ) : (
//             <>
//               Complete
//               <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const RegisterComponent = ({
//   onToggleMode,
//   isVisible,
//   showModal,
//   onShowModal,
//   onCloseModal,
//   onAgreeTerms,
//   isConfirmAgree,
//   toggleLoader
// }) => {
//   const location = useLocation();
//   const [notification, setNotification] = useState(null);
//   const [isChecked, setIsChecked] = useState(false);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [isIndianUser, setIsIndianUser] = useState(true);
//   const [registrationKey, setRegistrationKey] = useState(null);

//   const [formData, setFormData] = useState({
//     // Country
//     countryCode: "+91",
//     country: "India",
//     // Common fields
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     referralId: "",
//     emailOtp: "",
//     // Indian specific
//     aadhaarNumber: "",
//     aadhaarOtp: "",
//     aadhaarTempId: "",
//     aadhaarVerified: false,
//     aadhaarData: null,
//     panNumber: "",
//     panName: "",
//     panDob: "",
//     panVerified: false,
//     panData: null,
//     // Foreign specific
//     livePhoto: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Get appropriate steps based on user type
//   const STEPS = isIndianUser ? STEPS_INDIAN : STEPS_FOREIGN;

//   // ... (keep all useEffect hooks the same)

//   useEffect(() => {
//     const activeSession = localStorage.getItem("active_registration_session");
//     if (activeSession) {
//       try {
//         const sessionData = JSON.parse(activeSession);
//         const currentTime = new Date().getTime();
//         const hoursPassed =
//           (currentTime - sessionData.timestamp) / (1000 * 60 * 60);

//         if (hoursPassed < 24) {
//           setRegistrationKey(sessionData.key);
//           const savedStepData = localStorage.getItem(sessionData.key);
//           if (savedStepData) {
//             const parsed = JSON.parse(savedStepData);
//             setCurrentStep(parsed.step);
//             setIsIndianUser(parsed.isIndianUser);

//             if (sessionData.isIndianUser && sessionData.aadhaarTempId) {
//               setFormData((prev) => ({
//                 ...prev,
//                 aadhaarTempId: sessionData.aadhaarTempId,
//               }));
//             } else if (!sessionData.isIndianUser && sessionData.email) {
//               setFormData((prev) => ({ ...prev, email: sessionData.email }));
//             }

//             setNotification({
//               type: "info",
//               message: `Welcome back! Resuming from step ${parsed.step}`,
//             });
//           }
//         } else {
//           localStorage.removeItem("active_registration_session");
//           localStorage.removeItem(sessionData.key);
//         }
//       } catch (error) {
//         console.error("Error loading session:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const referralCode = params.get("referralCode");
//     if (referralCode && !formData.referralId) {
//       setFormData((prev) => ({ ...prev, referralId: referralCode }));
//     }
//   }, [location.search]);

//   useEffect(() => {
//     setIsChecked(isConfirmAgree);
//   }, [isConfirmAgree]);

//   const handleNext = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
//   };

//   const handlePrev = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//   };

//   const clearProgress = () => {
//     if (registrationKey) {
//       localStorage.removeItem(registrationKey);
//     }
//     localStorage.removeItem("active_registration_session");
//   };

//   const clearAllRegistrationProgress = () => {
//     localStorage.removeItem("active_registration_session");
//     const keysToRemove = [];
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (
//         key &&
//         (key.startsWith("reg_step_aadhaar_") ||
//           key.startsWith("reg_step_email_"))
//       ) {
//         keysToRemove.push(key);
//       }
//     }
//     keysToRemove.forEach((key) => localStorage.removeItem(key));
//   };

//   const renderStep = () => {
//     // Country selection is always step 1
//     if (currentStep === 1) {
//       return (
//         <CountrySelectionStep
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//           setIsIndianUser={setIsIndianUser}
//         />
//       );
//     }

//     // Indian flow (now 5 steps instead of 6)
//     if (isIndianUser) {
//       switch (currentStep) {
//         case 2:
//           return (
//             <AadhaarStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               touched={touched}
//               setTouched={setTouched}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 3:
//           return (
//             <PanStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 4:
//           return (
//             <PhotoCaptureStep
//               formData={formData}
//               setFormData={setFormData}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 5:
//           // Combined Personal Details + Account Setup
//           return (
//             <PersonalDetailsAndSetupStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               isChecked={isChecked}
//               setIsChecked={setIsChecked}
//               isConfirmAgree={isConfirmAgree}
//               onShowModal={onShowModal}
//               onComplete={clearProgress}
//               toggleLoader={toggleLoader}
//             />
//           );
//         default:
//           return null;
//       }
//     }
//     // Foreign flow (now 4 steps)
//     else {
//       switch (currentStep) {
//         case 2:
//           return (
//             <ForeignPersonalDetailsStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 3:
//           return (
//             <PhotoCaptureStep
//               formData={formData}
//               setFormData={setFormData}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 4:
//           // Combined Foreign Account Setup
//           return (
//             <ForeignAccountSetupStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               isChecked={isChecked}
//               setIsChecked={setIsChecked}
//               isConfirmAgree={isConfirmAgree}
//               onShowModal={onShowModal}
//               onComplete={clearProgress}
//               toggleLoader={toggleLoader}
//             />
//           );
//         default:
//           return null;
//       }
//     }
//   };

//   return (
//     <div
//       className={`max-w-[120%] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//       }`}
//     >
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       {/* Progress Bar */}
//       <ProgressBar currentStep={currentStep} steps={STEPS} />

//       {/* Step Content */}
//       <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8">
//         {renderStep()}
//       </div>

//       {/* Login Link */}
//       <div className="mt-3 text-center">
//         <p className="text-sm text-gray-600">
//           Already have an account?{" "}
//           <button
//             onClick={onToggleMode}
//             className="text-teal-600 hover:text-teal-700 font-medium"
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function AuthContainer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cluster } = useParams();

//   const [isLogin, setIsLogin] = useState(() => {
//     if (cluster === "login/") return true;
//     if (cluster === "register/") return false;
//     return window.location.pathname.includes("register/") ? false : true;
//   });
//   const toggleLoader = (show) => {
//     setShowGlobalLoader(show);
//   };
//   const [showGlobalLoader, setShowGlobalLoader] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isConfirmAgree, setIsConfirmAgree] = useState(false);

//   const handleBack = () => navigate("/");

//   useEffect(() => {
//     if (cluster === "login/") {
//       setIsLogin(true);
//     } else if (cluster === "register/") {
//       setIsLogin(false);
//     }
//   }, [cluster]);

//   const handleLoginSubmit = (values) => {
//     // console.log('Login submitted:', values);
//   };

//   const handleRegisterSubmit = (values) => {
//     // console.log('Register submitted:', values);
//   };

//   const handleShowModal = () => setShowModal(true);

//   const handleCloseModal = () => {
//     if (!isConfirmAgree) {
//       setIsConfirmAgree(false);
//     }
//     setShowModal(false);
//   };

//   const handleAgreeTerms = (isAgreed) => {
//     setIsConfirmAgree(isAgreed);
//     setShowModal(false);
//   };

//   const toggleMode = () => {
//     setIsTransitioning(true);
//     const newCluster = isLogin ? "register/" : "login/";
//     navigate(`/${newCluster}`, { replace: true });

//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 50);
//     }, 250);
//   };

//   const handleTabClick = (mode) => {
//     if (isTransitioning) return;
//     const cluster = mode === "login/" ? "login/" : "register/";
//     navigate(`/${cluster}`, { replace: true });

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setIsLogin(mode === "login/");
//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 50);
//     }, 250);
//   };

//   // Reusable Back Button Component
//   const BackButton = ({ className = "" }) => (
//     <button
//       onClick={handleBack}
//       className={`group flex items-center justify-center text-white hover:text-white/90 
//         bg-white/10 hover:bg-white/20 backdrop-blur-sm
//         rounded-full transition-all duration-300 ${className}`}
//       aria-label="Go back"
//     >
// <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-[-2px] transition-transform duration-300" />
//     </button>
//   );

//   // Reusable Tab Button Component
//   const TabButton = ({
//     active,
//     onClick,
//     disabled,
//     children,
//     className = "",
//   }) => (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`flex-1 py-1 sm:py-1 md:py-2 lg:py-2 px-4 sm:px-4 md:px-5 lg:px-6 
//         rounded-full font-bold transition-all duration-500 
//         text-xs sm:text-sm md:text-base
//         ${
//           active
//             ? "bg-white/90 text-teal-700 shadow-lg md:shadow-xl transform scale-[1] md:scale-100 backdrop-blur-sm"
//             : "text-white/80 hover:text-white "
//         } 
//         ${disabled ? "opacity-50 cursor-not-allowed" : ""}
//         ${className}`}
//     >
//       {children}
//     </button>
//   );



//   return (
//     <div className="min-h-screen w-full overflow-hidden bg-gray-50">
//       {showGlobalLoader && <Loader />}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* DESKTOP & LARGE TABLET VIEW (lg and above) */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <div className="hidden lg:flex w-full h-screen relative">
//         {/* Left Section - Gradient Background (Sliding) */}
//         <div
//           className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 
//             transform transition-all duration-1000 ease-out
//             ${isLogin ? "left-0 translate-x-0" : "left-1/2 translate-x-0"}`}
//         >
//           {/* Desktop Header with Back Button and Tabs */}
//           <div className="absolute top-0 left-0 right-0 z-20 p-6 xl:p-8">
//             <div className="flex items-center gap-4">
//               {/* Back Button - Desktop */}
//               <BackButton className="w-10 h-10 xl:w-12 xl:h-12 p-2.5 xl:p-3 shrink-0" />

//               {/* Navigation Tabs - Desktop */}
//               <div className="flex-1 max-w-md">
//                 <div
//                   className="flex bg-white/10 backdrop-blur-md rounded-full p-1.5 xl:p-2 
//                   shadow-xl border border-white/10"
//                 >
//                   <TabButton
//                     active={isLogin}
//                     onClick={() => handleTabClick("login/")}
//                     disabled={isTransitioning}
//                   >
//                     LOGIN
//                   </TabButton>
//                   <TabButton
//                     active={!isLogin}
//                     onClick={() => handleTabClick("register/")}
//                     disabled={isTransitioning}
//                   >
//                     SIGN UP
//                   </TabButton>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Icon Section - Desktop */}
//           <div className="relative text-center text-white px-6 xl:px-8 flex flex-col items-center justify-center h-full overflow-hidden pt-20">


//             {/* Main Icon */}
//             <div
//               className="relative w-40 h-40 xl:w-56 xl:h-56 rounded-full flex items-center justify-center 
//               transform transition-all duration-700 hover:scale-110 hover:rotate-3"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
//               <img
//                 src={icon}
//                 alt="Secure Crypto Wallet Icon"
//                 title="Jaimax Digital Payment"
//                 className="relative w-full h-full object-contain drop-shadow-2xl"
//                 loading="lazy"
//               />

//             </div>

//             {/* Text Content */}
//             <div className="relative mt-6 xl:mt-8 max-w-sm xl:max-w-md">
//               <h2
//                 className={`text-2xl xl:text-4xl font-bold mb-3 xl:mb-4 transition-all duration-700 transform 
//                   bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin ? "Welcome Back!" : "Join Us Today!"}
//               </h2>
//               <p
//                 className={`text-teal-50 text-sm xl:text-lg leading-relaxed transition-all duration-700 transform
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin
//                   ? "Trade, Earn, Grow — All from One Jaimax Account."
//                   : "The Next-Gen Crypto Platform Built for You. Register Today."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Form (Sliding) */}
//         <div
//           className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out 
//             overflow-y-auto scrollbar-none scrollbar-thumb-gray-10
//             ${isLogin ? "right-0 translate-x-0" : "right-1/2 translate-x-0"}`}
//         >
//           <div className="flex items-start justify-center w-full min-h-full p-6 lg:p-8 xl:p-12 pt-8 lg:pt-12">
//             <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
//               {isLogin ? (
//                 <LoginComponent
//                   onSubmit={handleLoginSubmit}
//                   onToggleMode={toggleMode}
//                   isVisible={!isTransitioning}
//                   toggleLoader={toggleLoader}
//                 />
//               ) : (
//                 <RegisterComponent
//                   onSubmit={handleRegisterSubmit}
//                   onToggleMode={toggleMode}
//                   isVisible={!isTransitioning}
//                   showModal={showModal}
//                   onShowModal={handleShowModal}
//                   onCloseModal={handleCloseModal}
//                   onAgreeTerms={handleAgreeTerms}
//                   isConfirmAgree={isConfirmAgree}
//                   toggleLoader={toggleLoader}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* TABLET VIEW (md to lg) */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <div className="hidden md:flex lg:hidden w-full min-h-screen flex-col">
//         {/* Tablet Header */}
//         <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
//           {/* Tablet Header with Back Button and Tabs */}
//           <div className="relative z-10 px-4 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               {/* Back Button - Tablet */}
//               <BackButton className="w-9 h-9 p-2 shrink-0" />

//               {/* Tablet Navigation */}
//               <div className="flex-1 max-w-sm mx-auto">
//                 <div
//                   className="flex bg-white/15 backdrop-blur-md rounded-full p-1.5 
//                   shadow-xl border border-white/10"
//                 >
//                   <TabButton
//                     active={isLogin}
//                     onClick={() => handleTabClick("login")}
//                     disabled={isTransitioning}
//                   >
//                     LOGIN
//                   </TabButton>
//                   <TabButton
//                     active={!isLogin}
//                     onClick={() => handleTabClick("register")}
//                     disabled={isTransitioning}
//                   >
//                     SIGN UP
//                   </TabButton>
//                 </div>
//               </div>

//               {/* Spacer for balance */}
//               <div className="w-9 h-9"></div>
//             </div>
//           </div>

//           {/* Tablet Icon Section - Horizontal Layout */}
//           <div className="relative z-10 py-6 px-8">
//             <div className="flex items-center justify-center gap-6">
//               {/* Icon */}
//               <div className="relative shrink-0">
//                 <div
//                   className="absolute inset-0 w-28 h-28 bg-gradient-to-r from-teal-400 to-green-400 
//                   rounded-full blur-xl opacity-30 animate-pulse"
//                 ></div>
//                 <div
//                   className="relative w-28 h-28 rounded-full flex items-center justify-center 
//                   backdrop-blur-sm shadow-xl"
//                 >
//                   <img
//                     src={icon}
//                     alt=""
//                     className="w-full h-full object-contain"
//                     loading="lazy"
//                   />

//                 </div>
//               </div>

//               {/* Text */}
//               <div className="text-left text-white">
//                 <h2
//                   className={`text-2xl font-bold mb-2 transition-all duration-700 transform 
//                     bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent
//                     ${
//                       isTransitioning
//                         ? "opacity-0 translate-y-4"
//                         : "opacity-100 translate-y-0"
//                     }`}
//                 >
//                   {isLogin ? "Welcome Back!" : "Join Us Today!"}
//                 </h2>
//                 <p
//                   className={`text-teal-50 text-sm leading-relaxed max-w-xs transition-all duration-700 transform
//                     ${
//                       isTransitioning
//                         ? "opacity-0 translate-y-4"
//                         : "opacity-100 translate-y-0"
//                     }`}
//                 >
//                   {isLogin
//                     ? "Trade, Earn, Grow — All from One Account."
//                     : "Next-Gen Crypto Platform Built for You."}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tablet Form Content */}
//         <div className="flex-1 bg-white overflow-y-auto">
//           <div className="max-w-lg mx-auto p-6 py-8">
//             {isLogin ? (
//               <LoginComponent
//                 onSubmit={handleLoginSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 toggleLoader={toggleLoader}
//               />
//             ) : (
//               <RegisterComponent
//                 onSubmit={handleRegisterSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 showModal={showModal}
//                 onShowModal={handleShowModal}
//                 onCloseModal={handleCloseModal}
//                 onAgreeTerms={handleAgreeTerms}
//                 isConfirmAgree={isConfirmAgree}
//                 toggleLoader={toggleLoader}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* MOBILE VIEW (below md) */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <div className="md:hidden w-full min-h-screen flex flex-col">
//         {/* Mobile Header */}
//         <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden shrink-0">
//           {/* Mobile Header with Back Button and Tabs */}
//           <div className="relative z-10 px-3 pt-3 pb-2">
//             <div className="flex items-center gap-2">
//               {/* Back Button - Mobile */}
//               <BackButton className="w-8 h-8 p-1.5 shrink-0" />

//               {/* Mobile Navigation */}
//               <div className="flex-1 max-w-xs mx-auto">
//                 <div
//                   className="flex bg-white/15 backdrop-blur-md rounded-full p-1 
//                   shadow-lg border border-white/10"
//                 >
//                   <TabButton
//                     active={isLogin}
//                     onClick={() => handleTabClick("login")}
//                     disabled={isTransitioning}
//                     className="text-[11px] xs:text-xs"
//                   >
//                     LOGIN
//                   </TabButton>
//                   <TabButton
//                     active={!isLogin}
//                     onClick={() => handleTabClick("register")}
//                     disabled={isTransitioning}
//                     className="text-[11px] xs:text-xs"
//                   >
//                     SIGN UP
//                   </TabButton>
//                 </div>
//               </div>

//               {/* Spacer for balance */}
//               <div className="w-8 h-8"></div>
//             </div>
//           </div>

//           {/* Mobile Icon Section */}
//           <div className="relative z-10 py-4 sm:py-6 text-center text-white">
//             {/* Compact Layout for Small Screens */}
//             <div className="px-4">
//               {/* Icon - Smaller on mobile */}
//               <div className="relative mb-3 sm:mb-4 inline-block">
//                 <div
//                   className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-r 
//                   from-teal-400 to-green-400 rounded-full blur-xl opacity-30 animate-pulse"
//                 ></div>
//                 <div
//                   className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full 
//                   flex items-center justify-center backdrop-blur-sm shadow-xl"
//                 >
//                   <img
//                     src={icon}
//                     alt=""
//                     className="w-full h-full object-contain"
//                     loading="lazy"
//                   />

//                 </div>
//               </div>

//               {/* Text - Compact */}
//               <h2
//                 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 transition-all duration-700 transform 
//                   bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin ? "Welcome Back!" : "Join Us Today!"}
//               </h2>
//               <p
//                 className={`text-teal-50 text-xs sm:text-sm leading-relaxed transition-all duration-700 transform
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin
//                   ? "Trade, Earn, Grow — All from One Account."
//                   : "Next-Gen Crypto Platform Built for You."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Form Content */}
//         <div className="flex-1 bg-white overflow-y-auto">
//           <div className="w-full max-w-md mx-auto px-3 sm:px-4 py-3 sm:py-4">
//             {isLogin ? (
//               <LoginComponent
//                 onSubmit={handleLoginSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 toggleLoader={toggleLoader}
//               />
//             ) : (
//               <RegisterComponent
//                 onSubmit={handleRegisterSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 showModal={showModal}
//                 onShowModal={handleShowModal}
//                 onCloseModal={handleCloseModal}
//                 onAgreeTerms={handleAgreeTerms}
//                 isConfirmAgree={isConfirmAgree}
//                 toggleLoader={toggleLoader}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* MODAL */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {showModal && (
//         <TermsConditionsModal
//           show={showModal}
//           onHide={handleCloseModal}
//           onAgree={handleAgreeTerms}
//         />
//       )}

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* CUSTOM STYLES */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <style jsx>{`
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .animate-float-slow {
//           animation: float 3s ease-in-out infinite;
//         }

//         /* Custom Scrollbar */
//         .scrollbar-thin {
//           scrollbar-width: none;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar {
//           width: 6px;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 3px;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
//           background: #9ca3af;
//         }

//         /* Smooth Transitions */
//         * {
//           -webkit-tap-highlight-color: transparent;
//         }

//         /* Better Touch Targets */
//         @media (hover: none) and (pointer: coarse) {
//           button {
//             min-height: 44px;
//             min-width: 44px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, {
//   useState,
//   useEffect,
//   useContext,
//   useRef,
//   useCallback,
// } from "react";
// import { Link } from "react-router-dom";
// import {
//   User,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   Phone,
//   Users,
//   Sparkles,
//   Shield,
//   ChevronDown,
//   AlertCircle,
//   CheckCircle,
//   CreditCard,
//   ChevronRight,
//   FileText,
//   ArrowRight,
//   Info,
//   Calendar,
//   ArrowLeft,
//   Globe,
//   Camera,
  
// } from "lucide-react";
// import icon from "../assets/Images/greencoin.webp";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// import {
//   useRegisterMutation,
//   useVerifyMutation,
//   useLoginMutation,
//   useOTPresentMutation,
//   useSendAadhaarOtpMutation,
//   useVerifyAadhaarOtpMutation,
//   useVerifyPanMutation,
// } from "./authApiSlice";
// import Seo from "../SeoContent/Seo";
// import countrycodes from "./countryCodes.json";
// import TermsConditionsModal from "./TermsAndConditions";
// import * as yup from "yup";
// import Webcam from "react-webcam";
// import loaderImage from "../assets/jcoin.webp";
// import Loader from '../ReusableComponents/Loader/loader'
// const Notification = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor =
//     type === "success"
//       ? "bg-green-50 border-green-200"
//       : "bg-red-50 border-red-200";
//   const textColor = type === "success" ? "text-green-800" : "text-red-800";
//   const Icon = type === "success" ? CheckCircle : AlertCircle;

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}
//     >
//       <div className="flex items-center gap-3">
//         <Icon className="h-5 w-5 flex-shrink-0" />
//         <p className="text-sm font-medium">{message}</p>
//         <button
//           onClick={onClose}
//           className="ml-auto text-gray-400 hover:text-gray-600"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// };

// const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Use the prop if provided, otherwise fallback to imported data
//   const dataSource = countryCodes || countrycodes;

//   const filteredCountries = dataSource.filter(
//     (country) =>
//       country.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       country.country_code.includes(searchTerm) ||
//       country.country_code_alpha3
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   const selectedCountry =
//     dataSource.find((c) => c.country_code === value) || dataSource[0];

//   // Add click outside handler to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest(".country-dropdown-container")) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <div className="country-dropdown-container relative">
//       <button
//         type="button"
//         onClick={() => {
//           // console.log('Dropdown button clicked, isOpen:', !isOpen);
//           setIsOpen(!isOpen);
//         }}
//         className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
//       >
//         <span className="flex items-center gap-2 text-sm">
//           <span className="text-lg">{selectedCountry?.flag}</span>
//           <span className="font-medium">{selectedCountry?.country_code}</span>
//         </span>
//         <ChevronDown
//           className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* IMPORTANT: Added fixed positioning and higher z-index */}
//       {isOpen && (
//         <div
//           className="fixed top-auto left-auto mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-hidden"
//           style={{
//             zIndex: 9999,
//             position: "absolute",
//             top: "100%",
//             left: "0",
//             minWidth: "280px",
//           }}
//         >
//           <div className="p-3 border-b border-gray-100 bg-gray-50">
//             <input
//               type="text"
//               placeholder="Search countries..."
//               value={searchTerm}
//               onChange={(e) => {
//                 // console.log('Search term:', e.target.value);
//                 setSearchTerm(e.target.value);
//               }}
//               className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>

//           <div className="max-h-48 overflow-y-auto bg-white">
//             {/* {console.log('Rendering countries, count:', filteredCountries.length)} */}
//             {filteredCountries.length > 0 ? (
//               filteredCountries.map((country, index) => {
//                 // console.log('Rendering country:', country.country_name);
//                 return (
//                   <button
//                     key={`${country.country_code}-${country.country_code_alpha3}-${index}`}
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       // console.log('Selected country:', country);
//                       onChange(country.country_code);
//                       setIsOpen(false);
//                       setSearchTerm("");
//                     }}
//                     className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
//                   >
//                     <span className="text-lg">{country.flag}</span>
//                     <span className="font-medium text-gray-900">
//                       {country.country_code}
//                     </span>
//                     <span className="text-gray-600 truncate">
//                       {country.country_name}
//                     </span>
//                   </button>
//                 );
//               })
//             ) : (
//               <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                 {dataSource.length === 0
//                   ? "No country data loaded"
//                   : "No countries found"}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const LoginComponent = ({ onToggleMode, isVisible,toggleLoader }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const [login, { isLoading, error: loginError }] = useLoginMutation();
//   const loginschema = {
//     "@context": "https://schema.org",
//     "@type": "WebPage",
//     "@id": "https://www.jaimax.com/login",
//     url: "https://www.jaimax.com/login",
//     name: "Jaimax Account Login",
//     description:
//       "Securely log in to your Jaimax account to access your wallet, transactions and digital finance dashboard.",
//     inLanguage: "en",
//     isPartOf: { "@id": "https://www.jaimax.com/#website" },
//     about: {
//       "@id": "https://www.jaimax.com/#organization",
//     },
//     potentialAction: {
//       "@type": "LoginAction",
//       target: "https://www.jaimax.com/login",
//     },
//   };
//   // Handle login error from RTK Query
//   useEffect(() => {
//     if (loginError) {
//       const message =
//         loginError?.data?.message || "Login failed. Please try again.";
//       setNotification({ type: "error", message });
//     }
//   }, [loginError]);

//   // Load saved email and remember me status
//   useEffect(() => {
//     const savedEmail = localStorage.getItem("email");
//     const savedRememberMe = localStorage.getItem("rememberMe") === "true";

//     if (savedEmail) {
//       setFormData((prevValues) => ({ ...prevValues, email: savedEmail }));
//     }
//     setRememberMe(savedRememberMe);
//   }, []);

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (!formData.email?.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleRememberMeChange = (e) => {
//     setRememberMe(e.target.checked);
//   };

//   // Enhanced keydown handler for Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !isLoading) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       setNotification({
//         type: "error",
//         message: "Please fix the highlighted fields.",
//       });
//       return;
//     }
//     // toggleLoader(true);
//     if (rememberMe) {
//       Cookies.set("email", formData.email?.trim(), { expires: 30 });
//       Cookies.set("rememberMe", "true", { expires: 30 });
//     } else {
//       Cookies.remove("email");
//       Cookies.remove("rememberMe");
//     }

//     try {
//       const response = await login({
//         email: formData.email?.trim(),
//         password: formData.password,
//         role: 1,
//       }).unwrap();

//       if (response?.success) {
//         const userData = response?.data;

//         // store tokens & user info
//         Cookies.set("token", userData?.token, { expires: 7 });
//         sessionStorage.setItem("token", userData?.token);
//         Cookies.set("userData", JSON.stringify(userData), { expires: 7 });

//         setNotification({
//           type: "success",
//           message: response?.message || "Login successful! Redirecting...",
//         });

//         // ✅ check KYC status before redirect
//         setTimeout(() => {
//           if (userData?.kycVerified === "approve") {
//             navigate("/dashboard");
//             // console.log("Redirecting to Dashboard");
//           } else {
//             navigate("/kyc-information");
//             // console.log("Redirecting to KYC Information");
//           }
//         }, 1000);
//       } else {
//         setNotification({
//           type: "error",
//           message: response?.message || "Login failed.",
//         });
//       }
//     } catch (err) {
//       const errorMessage = err?.data?.message || "Login error";
//       setNotification({
//         type: "error",
//         message: errorMessage,
//       });
//     }
//   };

//   return (
//     <div
//       className={`w-full max-w-md transition-all duration-500 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//       }`}
//     >
//       <Seo page="login" />

//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2 uppercase">
//           Login
//         </h1>
//         <p className="text-gray-600">
//           If you are already a customer, enter your details
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email Field */}
//         <div className="relative mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email <span className="text-red-500 ml-1">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <Mail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your email"
//               autoComplete="off"
//               className={`w-full pl-10 pr-4 bg-white py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             />
//           </div>
//           {errors.email && (
//             <div className="text-red-500 text-sm mt-1">{errors.email}</div>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="relative mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Password <span className="text-red-500 ml-1">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your password"
//               autoComplete="off"
//               className={`w-full bg-white pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                 errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-gray-400" />
//               ) : (
//                 <Eye className="h-5 w-5 text-gray-400" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <div className="text-red-500 text-sm mt-1">{errors.password}</div>
//           )}
//         </div>

//         {/* Remember Me and Forgot Password */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               checked={rememberMe}
//               onChange={handleRememberMeChange}
//               className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
//             />
//             <label
//               htmlFor="rememberMe"
//               className="ml-2 text-sm text-gray-600 cursor-pointer"
//             >
//               Remember me
//             </label>
//           </div>
//           <Link
//             to="/forgot-password"
//             className="text-teal-600 hover:text-teal-700 text-sm font-medium"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 uppercase"
//         >
//           {isLoading ? "Signing In..." : "Login"}
//         </button>
//       </form>

//       {/* Register Link */}
//       <div className="mt-8 text-center">
//         <p className="text-gray-600 mb-2">Don't have an account?</p>
//         <button
//           onClick={onToggleMode}
//           className="text-teal-600 hover:text-teal-700 font-semibold"
//         >
//           Register Now
//         </button>
//       </div>
//     </div>
//   );
// };

// const STEPS_INDIAN = [
//   { id: 1, title: "Country", icon: Globe },
//   { id: 2, title: "Aadhaar", icon: FileText },
//   { id: 3, title: "PAN", icon: CreditCard },
//   { id: 4, title: "Photo", icon: Camera },
//   { id: 5, title: "Register", icon: User },
// ];

// const STEPS_FOREIGN = [
//   { id: 1, title: "Country", icon: Globe },
//   { id: 2, title: "Details", icon: User },
//   { id: 3, title: "Photo", icon: Camera },
//   { id: 4, title: "Register", icon: User },
// ];

// // Progress Bar - Made Responsive
// const ProgressBar = ({ currentStep, steps }) => {
//   return (
//     <div className="w-full mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-0">
//       <div className="flex justify-between items-center relative">
//         {/* Background line */}
//         <div className="absolute top-3 sm:top-4 lg:top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

//         {/* Progress line */}
//         <div
//           className="absolute top-3 sm:top-4 lg:top-5 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 -z-10 transition-all duration-500"
//           style={{
//             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         />

//         {steps.map((step) => {
//           const StepIcon = step.icon;
//           const isCompleted = currentStep > step.id;
//           const isCurrent = currentStep === step.id;

//           return (
//             <div key={step.id} className="flex flex-col items-center z-10">
//               <div
//                 className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
//                   isCompleted
//                     ? "bg-teal-500 border-teal-500 text-white"
//                     : isCurrent
//                     ? "bg-white border-teal-500 text-teal-500 shadow-lg shadow-teal-200"
//                     : "bg-white border-gray-300 text-gray-400"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                 ) : (
//                   <StepIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                 )}
//               </div>
//               <span
//                 className={`mt-1 text-[8px] sm:text-[10px] lg:text-xs font-medium text-center max-w-[40px] sm:max-w-[60px] lg:max-w-[80px] leading-tight ${
//                   isCurrent
//                     ? "text-teal-600"
//                     : isCompleted
//                     ? "text-teal-500"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.title}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // Country Selection Step - Made Responsive
// const CountrySelectionStep = ({
//   formData,
//   setFormData,
//   onNext,
//   setIsIndianUser,
// }) => {
//   const [selectedCountry, setSelectedCountry] = useState(
//     formData.countryCode || "+91"
//   );

//   const handleContinue = () => {
//     const isIndian = selectedCountry === "+91";
//     setIsIndianUser(isIndian);
//     setFormData((prev) => ({
//       ...prev,
//       countryCode: selectedCountry,
//       country: isIndian
//         ? "India"
//         : countrycodes.find((c) => c.country_code === selectedCountry)
//             ?.country_name || "Other",
//     }));
//     onNext();
//   };

//   return (
//     <div className="space-y-3">
//       {/* Compact Header */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//           <Globe className="h-5 w-5 text-blue-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             Select Your Country
//           </h2>
//           <p className="text-xs text-gray-500">
//             Choose your country to continue registration
//           </p>
//         </div>
//       </div>

//       {/* Country Dropdown */}
//       <div>
//         <label className="text-xs font-medium text-gray-700 mb-1 inline-block">
//           Country
//         </label>
//         <CountryCodeDropdown
//           value={selectedCountry}
//           onChange={setSelectedCountry}
//           className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
//           countryCodes={countrycodes}
//           showFullCountry={true}
//         />
//       </div>

//       {/* Compact Information Box */}
//       <div className="bg-gray-50 rounded-lg p-2 text-xs">
//         <div className="flex items-start gap-1.5">
//           <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
//           <div className="text-gray-600">
//             {selectedCountry === "+91" ? (
//               <div>
//                 <p className="font-medium">Indian Citizens:</p>
//                 <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5">
//                   <li>Aadhaar verification required</li>
//                   <li>PAN verification required</li>
//                   <li>Live photo verification</li>
//                 </ul>
//               </div>
//             ) : (
//               <div>
//                 <p className="font-medium">International Users:</p>
//                 <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5">
//                   <li>Photo ID verification required</li>
//                   <li>Live photo capture for identity</li>
//                   <li>Manual KYC review process</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleContinue}
//         className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 
//                  rounded-full text-sm font-medium hover:from-teal-600 hover:to-teal-700 
//                  transition-all flex items-center justify-center gap-1.5 mt-2"
//       >
//         Continue
//         <ArrowRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// // Aadhaar Step - Made Responsive
// const AadhaarStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   touched,
//   setTouched,
//   onNext,
//   onPrev,
//   setNotification,
//   toggleLoader
// }) => {
//   const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResend, setCanResend] = useState(false);

//   const [sendAadhaarOtp, { isLoading: isSendingOtp }] =
//     useSendAadhaarOtpMutation();
//   const [verifyAadhaarOtp, { isLoading: isVerifyingOtp }] =
//     useVerifyAadhaarOtpMutation();

//   useEffect(() => {
//     let interval;
//     if (aadhaarOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [aadhaarOtpSent, timer]);

//   const handleSendAadhaarOtp = async () => {
//     if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
//       setErrors((prev) => ({
//         ...prev,
//         aadhaarNumber: "Please enter a valid 12-digit Aadhaar number",
//       }));
//       return;
//     }
// toggleLoader?.(true);
//     try {
//       const result = await sendAadhaarOtp({
//         aadhaarNumber: formData.aadhaarNumber,
//       }).unwrap();

//       setFormData((prev) => ({
//         ...prev,
//         aadhaarTempId: result.data?.tempId || result.tempId,
//       }));

//       setAadhaarOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       setNotification({
//         type: "success",
//         message: "OTP sent to your Aadhaar-linked mobile!",
//       });
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Failed to send OTP",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleVerifyAadhaar = async () => {
//     if (!formData.aadhaarOtp || formData.aadhaarOtp.length !== 6) {
//       setErrors((prev) => ({
//         ...prev,
//         aadhaarOtp: "Please enter 6-digit OTP",
//       }));
//       return;
//     }
// toggleLoader?.(true);
//     try {
//       const result = await verifyAadhaarOtp({
//         tempId: formData.aadhaarTempId,
//         otp: formData.aadhaarOtp,
//       }).unwrap();

//       setFormData((prev) => ({
//         ...prev,
//         aadhaarVerified: true,
//         aadhaarData: result.data,
//         name: result.data?.name || prev.name,
//         dob: result.data?.dob || prev.dob,
//       }));

//       setNotification({
//         type: "success",
//         message: "Aadhaar verified successfully!",
//       });
//       setTimeout(() => onNext(), 1000);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "OTP verification failed",
//       });
//     }finally {
//       toggleLoader?.(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {/* Compact Header with Side Icon */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
//           <FileText className="h-5 w-5 text-teal-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             Aadhaar Verification
//           </h2>
//           <p className="text-xs text-gray-500">
//             Verify your identity with Aadhaar
//           </p>
//         </div>
//       </div>

//       {/* Aadhaar Number Input */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Aadhaar Number
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FileText className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             maxLength={12}
//             value={formData.aadhaarNumber || ""}
//             onChange={(e) => {
//               const value = e.target.value.replace(/\D/g, "");
//               setFormData((prev) => ({ ...prev, aadhaarNumber: value }));
//               if (errors.aadhaarNumber && value.length === 12) {
//                 setErrors((prev) => ({ ...prev, aadhaarNumber: null }));
//               }
//             }}
//             placeholder="Enter 12-digit Aadhaar number"
//             disabled={aadhaarOtpSent && !canResend}
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all ${
//               errors.aadhaarNumber
//                 ? "border-red-500 bg-red-50"
//                 : "border-gray-300"
//             } ${aadhaarOtpSent && !canResend ? "bg-gray-100" : "bg-white"}`}
//           />
//         </div>
//         {errors.aadhaarNumber && (
//           <p className="text-red-500 text-xs">{errors.aadhaarNumber}</p>
//         )}
//         <p className="text-xs text-gray-500">
//           Format: XXXX XXXX XXXX (12 digits)
//         </p>
//       </div>

//       {/* OTP Section */}
//       {aadhaarOtpSent && (
//         <div className="space-y-1 animate-fadeIn">
//           <label className="text-xs font-medium text-gray-700">Enter OTP</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Shield className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               maxLength={6}
//               value={formData.aadhaarOtp || ""}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "");
//                 setFormData((prev) => ({ ...prev, aadhaarOtp: value }));
//               }}
//               placeholder="Enter 6-digit OTP"
//               className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
//             />
//           </div>
//           <p className="text-xs text-gray-500">
//             OTP sent to your Aadhaar-linked mobile number
//           </p>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-2">
//         {!aadhaarOtpSent ? (
//           <button
//             onClick={handleSendAadhaarOtp}
//             disabled={
//               isSendingOtp ||
//               !formData.aadhaarNumber ||
//               formData.aadhaarNumber.length !== 12
//             }
//             className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
//           >
//             {isSendingOtp ? (
//               <>
                
//                 Sending OTP...
//               </>
//             ) : (
//               <>
//                 Send OTP
//                 <ArrowRight className="w-5 h-5" />
//               </>
//             )}
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={handleSendAadhaarOtp}
//               disabled={!canResend || isSendingOtp}
//               className="px-4 py-1 border border-teal-500 text-teal-600 rounded-full font-medium hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//             >
//               {timer > 0 ? `Resend (${timer}s)` : "Resend OTP"}
//             </button>
//             <button
//               onClick={handleVerifyAadhaar}
//               disabled={
//                 isVerifyingOtp ||
//                 !formData.aadhaarOtp ||
//                 formData.aadhaarOtp.length !== 6
//               }
//               className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
//             >
//               {isVerifyingOtp ? (
//                 <>
                
//                   Verifying...
//                 </>
//               ) : (
//                 <>
//                   Verify
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // PAN Step - Made Responsive
// const PanStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onNext,
//   onPrev,
//   setNotification,
//   toggleLoader
// }) => {
//   const [verifyPan, { isLoading }] = useVerifyPanMutation();

//   const handleVerifyPan = async () => {
//     const panErrors = {};

//     if (
//       !formData.panNumber ||
//       !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)
//     ) {
//       panErrors.panNumber = "Enter valid PAN (e.g., ABCDE1234F)";
//     }
//     if (!formData.panName) {
//       panErrors.panName = "Name is required";
//     }
//     if (!formData.panDob) {
//       panErrors.panDob = "Date of birth is required";
//     }

//     if (Object.keys(panErrors).length > 0) {
//       setErrors((prev) => ({ ...prev, ...panErrors }));
//       return;
//     }
//  toggleLoader?.(true);
//     try {
//       const result = await verifyPan({
//         tempId: formData.aadhaarTempId,
//         panNumber: formData.panNumber,
//         name: formData.panName,
//         dob: formData.panDob,
//       }).unwrap();

//       setFormData((prev) => ({
//         ...prev,
//         panVerified: true,
//         panData: result.data,
//       }));

//       setNotification({
//         type: "success",
//         message: "PAN verified successfully!",
//       });
//       setTimeout(() => onNext(), 1000);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "PAN verification failed",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {/* Compact Header with Side Icon */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//           <CreditCard className="h-5 w-5 text-blue-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             PAN Verification
//           </h2>
//           <p className="text-xs text-gray-500">Verify your PAN card details</p>
//         </div>
//       </div>

//       {/* PAN Number */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">PAN Number</label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <CreditCard className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             maxLength={10}
//             value={formData.panNumber || ""}
//             onChange={(e) => {
//               const value = e.target.value
//                 .toUpperCase()
//                 .replace(/[^A-Z0-9]/g, "");
//               setFormData((prev) => ({ ...prev, panNumber: value }));
//             }}
//             placeholder="Enter PAN number (e.g., ABCDE1234F)"
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white ${
//               errors.panNumber ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.panNumber && (
//           <p className="text-red-500 text-xs">{errors.panNumber}</p>
//         )}
//       </div>

//       {/* Name on PAN */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Name (as on PAN)
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             value={formData.panName || formData.name || ""}
//             onChange={(e) => {
//               const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
//               setFormData((prev) => ({ ...prev, panName: value }));
//             }}
//             placeholder="Enter name as on PAN card"
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white ${
//               errors.panName ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.panName && (
//           <p className="text-red-500 text-xs">{errors.panName}</p>
//         )}
//       </div>

//       {/* Date of Birth */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Date of Birth
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Calendar className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="date"
//             value={formData.panDob || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, panDob: e.target.value }))
//             }
//             max={new Date().toISOString().split("T")[0]}
//             className={`w-full pl-10 pr-4 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white ${
//               errors.panDob ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.panDob && (
//           <p className="text-red-500 text-xs">{errors.panDob}</p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-2">
//         <button
//           onClick={onPrev}
//           className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back
//         </button>
//         <button
//           onClick={handleVerifyPan}
//           disabled={isLoading}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
//         >
//           {isLoading ? (
//             <>
            
//               Verifying...
//             </>
//           ) : (
//             <>
//               Verify PAN
//               <ArrowRight className="w-5 h-5" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// // Photo Capture Step - Made Responsive
// const PhotoCaptureStep = ({
//   formData,
//   setFormData,
//   onNext,
//   onPrev,
//   setNotification,
// }) => {
//   const webcamRef = useRef(null);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState(
//     formData.livePhoto || null
//   );
//   const [facingMode, setFacingMode] = useState("user");
//   const [hasPermission, setHasPermission] = useState(true);

//   const videoConstraints = {
//     width: { ideal: 1280, min: 640 },
//     height: { ideal: 720, min: 480 },
//     facingMode: facingMode,
//   };

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setCapturedPhoto(imageSrc);
//       setFormData((prev) => ({ ...prev, livePhoto: imageSrc }));
//       setIsCapturing(false);
//     }
//   }, [webcamRef, setFormData]);

//   const retakePhoto = () => {
//     setCapturedPhoto(null);
//     setFormData((prev) => ({ ...prev, livePhoto: null }));
//     setIsCapturing(true);
//   };

//   const handleUserMediaError = () => {
//     setHasPermission(false);
//     setNotification({
//       type: "error",
//       message: "Camera access denied. Please allow camera access.",
//     });
//   };

//   const handleNext = () => {
//     if (!capturedPhoto) {
//       setNotification({
//         type: "error",
//         message: "Please capture a photo to continue",
//       });
//       return;
//     }
//     onNext();
//   };

//   return (
//     <div className="space-y-2">
//       {/* Minimal Header */}
//       <div className="flex items-center mb-1.5">
//         <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
//           <Camera className="h-4 w-4 text-indigo-600" />
//         </div>
//         <h2 className="text-sm font-bold text-gray-800">Photo Verification</h2>
//       </div>

//       {/* Camera/Photo Display - Reduced height */}
//       <div className="relative bg-gray-100 rounded overflow-hidden h-[190px]">
//         {!isCapturing && !capturedPhoto && (
//           <div className="flex flex-col items-center justify-center h-full p-2">
//             <Camera className="w-8 h-8 text-gray-400 mb-1" />
//             <p className="text-xs text-gray-600 mb-1.5">Camera not active</p>
//             {hasPermission ? (
//               <button
//                 onClick={() => setIsCapturing(true)}
//                 className="px-3 py-1.5 bg-teal-500 text-white rounded-full text-xs hover:bg-teal-600"
//               >
//                 Start Camera
//               </button>
//             ) : (
//               <div className="text-center">
//                 <p className="text-[10px] text-red-600">
//                   Camera permission denied
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {isCapturing && hasPermission && (
//           <div className="relative w-full h-full">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={videoConstraints}
//               onUserMediaError={handleUserMediaError}
//               className="w-full h-full object-cover"
//               mirrored={facingMode === "user"}
//             />
//             {/* Face guide overlay */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="w-24 h-32 border-2 border-white/80 rounded shadow"></div>
//             </div>
//             {/* Camera switch button */}
//             <button
//               onClick={() =>
//                 setFacingMode((prev) =>
//                   prev === "user" ? "environment" : "user"
//                 )
//               }
//               className="absolute top-1 right-1 p-1.5 bg-white/70 rounded-full hover:bg-white/90 shadow-sm"
//             >
//               <svg
//                 className="w-3.5 h-3.5 text-gray-700"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                 />
//               </svg>
//             </button>
//           </div>
//         )}

//         {capturedPhoto && (
//           <div className="relative w-full h-full">
//             <img
//               src={capturedPhoto}
//               alt="Captured"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute top-1 right-1 bg-green-500 text-white px-1.5 py-0.5 rounded-sm text-xs">
//               ✓ Photo Captured
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Minimal Instructions - Inline */}
//       <div className="bg-blue-50 rounded p-1.5 text-[10px] flex items-start gap-1">
//         <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
//         <div className="text-blue-700">
//           <span className="font-medium">Tips: </span>
//           Face camera directly • Good lighting • No glare from glasses
//         </div>
//       </div>

//       {/* Action Buttons - Compact */}
//       <div className="flex gap-1.5">
//         <button
//           onClick={onPrev}
//           className="px-2.5 py-1.5 border border-gray-300 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-50"
//         >
//           <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
//           Back
//         </button>

//         {isCapturing ? (
//           <button
//             onClick={capture}
//             className="flex-1 bg-teal-500 text-white py-1.5 rounded-full text-xs font-medium hover:bg-teal-600 flex items-center justify-center"
//           >
//             <Camera className="w-3.5 h-3.5 mr-1" />
//             Capture
//           </button>
//         ) : capturedPhoto ? (
//           <>
//             <button
//               onClick={retakePhoto}
//               className="flex-1 border border-teal-500 text-teal-600 py-1.5 rounded-full text-xs font-medium hover:bg-teal-50"
//             >
//               Retake
//             </button>
//             <button
//               onClick={handleNext}
//               className="flex-1 bg-teal-500 text-white py-1.5 rounded-full text-xs font-medium hover:bg-teal-600 flex items-center justify-center"
//             >
//               Continue
//               <ArrowRight className="w-3.5 h-3.5 ml-1" />
//             </button>
//           </>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// const PersonalDetailsAndSetupStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onPrev,
//   setNotification,
//   isChecked,
//   setIsChecked,
//   isConfirmAgree,
//   onShowModal,
//   onComplete,
//   toggleLoader
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResend, setCanResend] = useState(false);

//   const navigate = useNavigate();

//   const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
//   const [OTPresent, { isLoading: isResending }] = useOTPresentMutation();

//   useEffect(() => {
//     let interval;
//     if (emailOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0 && emailOtpSent) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [emailOtpSent, timer]);

//   const validatePersonalDetails = () => {
//     const stepErrors = {};
//     if (!formData.phone || formData.phone.length !== 10)
//       stepErrors.phone = "Enter valid 10-digit phone";
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       stepErrors.email = "Enter valid email";
//     if (!formData.password || formData.password.length < 6)
//       stepErrors.password = "Min 6 characters";
//     if (formData.password !== formData.confirmPassword)
//       stepErrors.confirmPassword = "Passwords don't match";
//     setErrors((prev) => ({ ...prev, ...stepErrors }));
//     return Object.keys(stepErrors).length === 0;
//   };

//   const getEssentialUserData = (data) => ({
//     _id: data._id,
//     name: data.name,
//     role: data.role,
//     email: data.email,
//     country: data.country,
//     city: data.city || "N/A",
//     state: data.state || "N/A",
//     address: data.address || "N/A",
//     phone: data.phone,
//     countryCode: data.countryCode,
//     username: data.username,
//     permissions: data.permissions || [],
//     walletadress: data.walletadress,
//     kycVerified: data.kycVerified,
//     token: data.token,
//   });

//   const handleSendEmailOtp = async () => {
//     if (!validatePersonalDetails()) return;
// toggleLoader?.(true);
//     try {
//       const payload = {
//         tempId: formData.aadhaarTempId,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword,
//         countryCode: formData.countryCode || "+91",
//         country: formData.country || "India",
//         livePhoto: formData.livePhoto,
//       };

//       const result = await register(payload).unwrap();

//       if (result?.data) {
//         const essentialData = getEssentialUserData(result.data);
//         Cookies.set("token", essentialData.token, { expires: 7 });
//         sessionStorage.setItem("token", essentialData.token);
//         Cookies.set("userData", JSON.stringify(essentialData), { expires: 7 });
//       }

//       setEmailOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       setNotification({ type: "success", message: "OTP sent to your email!" });
//     } catch (err) {
//       if (err?.data?.message === "User verification pending") {
//         try {
//           await OTPresent({
//             email: formData.email,
//             otpType: "register",
//             tempId: formData.aadhaarTempId,
//           }).unwrap();
//           setEmailOtpSent(true);
//           setTimer(120);
//           setCanResend(false);
//           setNotification({ type: "success", message: "OTP resent!" });
//         } catch (otpErr) {
//           setNotification({
//             type: "error",
//             message: otpErr?.data?.message || "Failed to resend OTP",
//           });
//         }
//       } else {
//         setNotification({
//           type: "error",
//           message: err?.data?.message || "Failed to send OTP",
//         });
//       }
      
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleResendOtp = async () => {
//      toggleLoader?.(true);
//     try {
//       await OTPresent({
//         email: formData.email,
//         otpType: "register",
//         tempId: formData.aadhaarTempId,
//       }).unwrap();
//       setTimer(120);
//       setCanResend(false);
//       setNotification({ type: "success", message: "OTP resent!" });
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Failed to resend OTP",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleFinalSubmit = async () => {
//     if (!isChecked || !isConfirmAgree) {
//       setNotification({
//         type: "error",
//         message: "Please accept Terms & Conditions",
//       });
//       return;
//     }
//     if (!formData.emailOtp || formData.emailOtp.length !== 6) {
//       setErrors((prev) => ({ ...prev, emailOtp: "Enter 6-digit OTP" }));
//       return;
//     }
//  toggleLoader?.(true);
//     try {
//       const res = await verify({
//         tempId: formData.aadhaarTempId,
//         email: formData.email,
//         otp: Number(formData.emailOtp),
//         otpType: "register",
//         referenceId: formData.referralId || "",
//       }).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: "error",
//           message: res.message || "Verification failed",
//         });
//         return;
//       }

//       if (res?.data) {
//         const essentialData = getEssentialUserData(res.data);
//         Cookies.set("token", essentialData.token, { expires: 7 });
//         sessionStorage.setItem("token", essentialData.token);
//         Cookies.set("userData", JSON.stringify(essentialData), { expires: 7 });
//       }

//       onComplete?.();
//       setNotification({ type: "success", message: "Registration successful!" });
//       setTimeout(() => navigate("/dashboard"), 1500);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Registration failed",
//       });
//        toggleLoader?.(false);
//     }
//   };

//   const isFormValid =
//     formData.phone?.length === 10 &&
//     formData.email &&
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
//     formData.password?.length >= 6 &&
//     formData.password === formData.confirmPassword;

//   const canSubmit =
//     emailOtpSent &&
//     formData.emailOtp?.length === 6 &&
//     isChecked &&
//     isConfirmAgree;

//   return (
//     <div className="space-y-3">
//       {/* Compact Header with Verification Badges */}
//       <div className="flex items-center justify-between pb-2 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
//             <Sparkles className="h-4 w-4 text-white" />
//           </div>
//           <div>
//             <h2 className="text-sm font-semibold text-gray-800">
//               Complete Registration
//             </h2>
//             <p className="text-[10px] text-gray-500">
//               Final step - verify your email
//             </p>
//           </div>
//         </div>
//         {/* Inline Verification Badges */}
//         <div className="hidden sm:flex items-center gap-1.5">
//           {["Aadhaar", "PAN", "Photo"].map((item) => (
//             <span
//               key={item}
//               className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-medium"
//             >
//               <CheckCircle className="w-2.5 h-2.5" />
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Verification Badges */}
//       <div className="flex sm:hidden items-center gap-1.5 flex-wrap">
//         {["Aadhaar", "PAN", "Photo"].map((item) => (
//           <span
//             key={item}
//             className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-medium"
//           >
//             <CheckCircle className="w-2.5 h-2.5" />
//             {item}
//           </span>
//         ))}
//         {formData.name && (
//           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium truncate max-w-[100px]">
//             <User className="w-2.5 h-2.5" />
//             {formData.name}
//           </span>
//         )}
//       </div>

//       {/* Form Grid - Responsive */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//         {/* Phone */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Phone Number
//           </label>
//           <div className="relative">
//             {/* FIXED: Added pointer-events-none to icon container */}
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Phone className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="tel"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               autoComplete="tel"
//               maxLength={10}
//               value={formData.phone || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({
//                   ...p,
//                   phone: e.target.value.replace(/\D/g, ""),
//                 }))
//               }
//               placeholder="10-digit number"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.phone
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//           </div>
//           {errors.phone && (
//             <p className="text-red-500 text-[10px]">{errors.phone}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Email Address
//           </label>
//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Mail className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               inputMode="email"
//               autoComplete="email"
//               value={formData.email || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({
//                   ...p,
//                   email: e.target.value.toLowerCase(),
//                 }))
//               }
//               placeholder="your@email.com"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.email
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//           </div>
//           {errors.email && (
//             <p className="text-red-500 text-[10px]">{errors.email}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Password
//           </label>
//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Lock className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               autoComplete="new-password"
//               value={formData.password || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, password: e.target.value }))
//               }
//               placeholder="Min 6 characters"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-9 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.password
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//             {/* FIXED: Proper touch target for toggle button */}
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               disabled={emailOtpSent}
//               className="absolute right-0 top-0 h-full px-2.5 flex items-center justify-center 
//                 text-gray-400 hover:text-gray-600 disabled:opacity-50 touch-manipulation"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4" />
//               ) : (
//                 <Eye className="h-4 w-4" />
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-[10px]">{errors.password}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="space-y-0.5">
//           <label className="text-[11px] font-medium text-gray-600">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Lock className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               autoComplete="new-password"
//               value={formData.confirmPassword || ""}
//               onChange={(e) =>
//                 setFormData((p) => ({ ...p, confirmPassword: e.target.value }))
//               }
//               placeholder="Re-enter password"
//               disabled={emailOtpSent}
//               className={`w-full pl-8 pr-9 py-2.5 text-sm border rounded-lg 
//                 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//                 ${emailOtpSent ? "bg-gray-50 text-gray-500" : "bg-white"}
//                 ${
//                   errors.confirmPassword
//                     ? "border-red-400 bg-red-50/50"
//                     : "border-gray-200"
//                 }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               disabled={emailOtpSent}
//               className="absolute right-0 top-0 h-full px-2.5 flex items-center justify-center 
//                 text-gray-400 hover:text-gray-600 disabled:opacity-50 touch-manipulation"
//               aria-label={
//                 showConfirmPassword ? "Hide password" : "Show password"
//               }
//             >
//               {showConfirmPassword ? (
//                 <EyeOff className="h-4 w-4" />
//               ) : (
//                 <Eye className="h-4 w-4" />
//               )}
//             </button>
//           </div>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-[10px]">{errors.confirmPassword}</p>
//           )}
//         </div>
//       </div>

//       {/* Referral - Full Width */}
//       <div className="space-y-0.5">
//         <label className="text-[11px] font-medium text-gray-600">
//           Referral ID{" "}
//           <span className="text-gray-400 font-normal">(Optional)</span>
//         </label>
//         <div className="relative">
//           <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//             <Users className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             autoComplete="off"
//             maxLength={13}
//             value={formData.referralId || ""}
//             onChange={(e) =>
//               setFormData((p) => ({
//                 ...p,
//                 referralId: e.target.value
//                   .toUpperCase()
//                   .replace(/[^A-Z0-9]/g, ""),
//               }))
//             }
//             placeholder="Enter referral code"
//             disabled={emailOtpSent}
//             className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg 
//               focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all
//               ${
//                 emailOtpSent
//                   ? "bg-gray-50 text-gray-500"
//                   : "bg-white border-gray-200"
//               }`}
//           />
//         </div>
//       </div>

//       {/* OTP Section */}
//       {!emailOtpSent ? (
//         <button
//           onClick={handleSendEmailOtp}
//           disabled={isRegistering || !isFormValid}
//           className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-full text-sm font-medium 
//             hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 
//             disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md touch-manipulation"
//         >
//           {isRegistering ? (
//             <>
           
//               <span>Sending OTP...</span>
//             </>
//           ) : (
//             <>
//               <Mail className="w-4 h-4" />
//               <span>Send OTP to Email</span>
//             </>
//           )}
//         </button>
//       ) : (
//         <div className="p-2.5 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl border border-teal-100">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-1.5">
//               <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
//                 <CheckCircle className="w-3 h-3 text-white" />
//               </div>
//               <span className="text-xs text-gray-600 truncate">
//                 OTP sent to{" "}
//                 <span className="font-medium text-gray-800">
//                   {formData.email?.slice(0, 15)}...
//                 </span>
//               </span>
//             </div>
//            <button
//   onClick={handleResendOtp}
//   disabled={isResending || !canResend}
//   className={`text-xs font-medium px-2 py-1 rounded-full transition-all flex-shrink-0 touch-manipulation ${
//     canResend
//       ? "text-teal-600 hover:bg-teal-100 active:bg-teal-200"
//       : "text-gray-400"
//   }`}
// >
//   {canResend ? "Resend" : <span className="tabular-nums">{timer}s</span>}
// </button>

//           </div>

//           <div className="relative">
//             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
//               <Shield className="h-4 w-4 text-teal-500" />
//             </div>
//             <input
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               autoComplete="one-time-code"
//               maxLength={6}
//               value={formData.emailOtp || ""}
//               onChange={(e) => {
//                 setFormData((p) => ({
//                   ...p,
//                   emailOtp: e.target.value.replace(/\D/g, ""),
//                 }));
//                 if (errors.emailOtp)
//                   setErrors((p) => ({ ...p, emailOtp: null }));
//               }}
//               placeholder="Enter 6-digit OTP"
//               className={`w-full pl-8 pr-3 py-2.5 text-sm border rounded-lg text-center tracking-[0.3em] font-mono
//                 focus:ring-2 focus:ring-teal-500 outline-none bg-white
//                 ${errors.emailOtp ? "border-red-400" : "border-teal-200"}`}
//             />
//           </div>
//           {errors.emailOtp && (
//             <p className="text-red-500 text-[10px] text-center mt-1">
//               {errors.emailOtp}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Terms - Compact */}
//       <label className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation">
//         <input
//           type="checkbox"
//           checked={isChecked && isConfirmAgree}
//           onChange={(e) =>
//             e.target.checked ? onShowModal() : setIsChecked(false)
//           }
//           className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
//         />
//         <span className="text-[11px] text-gray-600 leading-relaxed">
//           I agree to the{" "}
//           <button
//             type="button"
//             onClick={onShowModal}
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Terms & Conditions
//           </button>{" "}
//           and{" "}
//           <button
//             type="button"
//             onClick={onShowModal}
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Privacy Policy
//           </button>
//         </span>
//       </label>

//       {/* Action Buttons - Compact */}
//       <div className="flex gap-2 pt-1">

//         <button
//           onClick={handleFinalSubmit}
//           disabled={isVerifying || !canSubmit}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-xl text-sm font-medium 
//             hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed 
//             transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md touch-manipulation"
//         >
//           {isVerifying ? (
//             <>
              
//               <span>Creating...</span>
//             </>
//           ) : (
//             <>
//               <span>Complete Registration</span>
//               <CheckCircle className="w-4 h-4" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const ForeignPersonalDetailsStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onNext,
//   onPrev,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const validateStep = () => {
//     const stepErrors = {};
//     if (!formData.name || formData.name.length < 2)
//       stepErrors.name = "Name required";
//     if (!formData.phone || formData.phone.length < 8)
//       stepErrors.phone = "Valid phone required";
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       stepErrors.email = "Valid email required";
//     if (!formData.password || formData.password.length < 6)
//       stepErrors.password = "Min 6 characters";
//     if (formData.password !== formData.confirmPassword)
//       stepErrors.confirmPassword = "Passwords don't match";
//     setErrors((prev) => ({ ...prev, ...stepErrors }));
//     return Object.keys(stepErrors).length === 0;
//   };

//   return (
//     <div className="space-y-2">
//       {/* Horizontal Header */}
//       <div className="flex items-center mb-2">
//         <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
//           <User className="h-5 w-5 text-purple-600" />
//         </div>
//         <div>
//           <h2 className="text-base font-bold text-gray-800">
//             Personal Details
//           </h2>
//           <p className="text-xs text-gray-500">
//             Enter your personal information
//           </p>
//         </div>
//       </div>

//       {/* Name */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">Full Name</label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             value={formData.name || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, name: e.target.value }))
//             }
//             placeholder="Enter your full name"
//             className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//               errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//       </div>

//       {/* Phone */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Phone Number
//         </label>
//         <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-teal-500 overflow-hidden">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//               <Phone className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="tel"
//               value={formData.phone || ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   phone: e.target.value.replace(/[^\d]/g, ""),
//                 }))
//               }
//               placeholder="Enter phone number"
//               className="w-full pl-9 pr-4 py-2 border-0 outline-none bg-white"
//             />
//           </div>
//         </div>
//         {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
//       </div>

//       {/* Email */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Email Address
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             value={formData.email || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 email: e.target.value.toLowerCase(),
//               }))
//             }
//             placeholder="Enter your email"
//             className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//               errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
//             }`}
//           />
//         </div>
//         {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//       </div>

//       {/* Password and Confirm Password in one line */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">Password</label>
//         <div className="grid grid-cols-2 gap-2">
//           {/* Password */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={formData.password || ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, password: e.target.value }))
//               }
//               placeholder="Create password"
//               className={`w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//                 errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-2 flex items-center"
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4 text-gray-400" />
//               ) : (
//                 <Eye className="h-4 w-4 text-gray-400" />
//               )}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
//               <Lock className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               value={formData.confirmPassword || ""}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   confirmPassword: e.target.value,
//                 }))
//               }
//               placeholder="Confirm password"
//               className={`w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//                 errors.confirmPassword
//                   ? "border-red-500 bg-red-50"
//                   : "border-gray-300"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute inset-y-0 right-0 pr-2 flex items-center"
//             >
//               {showConfirmPassword ? (
//                 <EyeOff className="h-4 w-4 text-gray-400" />
//               ) : (
//                 <Eye className="h-4 w-4 text-gray-400" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-between">
//           {errors.password && (
//             <p className="text-red-500 text-xs">{errors.password}</p>
//           )}
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
//           )}
//         </div>
//       </div>

//       {/* Referral ID */}
//       <div className="space-y-1">
//         <label className="text-xs font-medium text-gray-700">
//           Referral ID <span className="text-gray-400">(Optional)</span>
//         </label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             maxLength={13}
//             value={formData.referralId || ""}
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 referralId: e.target.value
//                   .toUpperCase()
//                   .replace(/[^A-Z0-9]/g, ""),
//               }))
//             }
//             placeholder="Enter referral ID"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 pt-2">
//         <button
//           onClick={onPrev}
//           className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back
//         </button>
//         <button
//           onClick={() => validateStep() && onNext()}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-full font-medium hover:from-teal-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
//         >
//           Continue
//           <ArrowRight className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// const ForeignAccountSetupStep = ({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onPrev,
//   setNotification,
//   isChecked,
//   setIsChecked,
//   isConfirmAgree,
//   onShowModal,
//    toggleLoader
// }) => {
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResend, setCanResend] = useState(false);
//   const navigate = useNavigate();

//   const [registerForeign, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verifyForeign, { isLoading: isVerifying }] = useVerifyMutation();

//   useEffect(() => {
//     let interval;
//     if (emailOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [emailOtpSent, timer]);

//   const handleSendEmailOtp = async () => {
//     toggleLoader?.(true);
//     try {
//       const result = await registerForeign({
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword,
//         countryCode: formData.countryCode,
//         country: formData.country,
//         referralId: formData.referralId,
//         livePhoto: formData.livePhoto,
//       }).unwrap();

//       if (result?.data?.username)
//         Cookies.set("username", result.data.username, { expires: 7 });
//       setEmailOtpSent(true);
//       setTimer(120);
//       setCanResend(false);
//       setNotification({ type: "success", message: "OTP sent!" });
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Failed to send OTP",
//       });
//     }
//     finally {
//       // Hide global loader
//       toggleLoader?.(false);
//     }
//   };

//   const handleFinalSubmit = async () => {
//      toggleLoader?.(false);
//     if (!isChecked || !isConfirmAgree) {
//       setNotification({ type: "error", message: "Accept Terms & Conditions" });
//       return;
//     }
//     if (!formData.emailOtp || formData.emailOtp.length !== 6) {
//       setErrors((prev) => ({ ...prev, emailOtp: "Enter 6-digit OTP" }));
//       return;
//     }
//  toggleLoader?.(false);
//     try {
//       const res = await verifyForeign({
//         email: formData.email,
//         otp: Number(formData.emailOtp),
//         otpType: "register",
//         referenceId: formData.referralId || "",

//       }).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: "error",
//           message: res.message || "Verification failed",
//         });
//          toggleLoader?.(false);
//         return;
//       }

//       Cookies.set("token", res?.data?.token, { expires: 7 });
//       Cookies.set("userData", JSON.stringify(res?.data), { expires: 7 });
//       setNotification({ type: "success", message: "Registration successful!" });
//       setTimeout(() => navigate("/dashboard"), 1000);
//     } catch (err) {
//       setNotification({
//         type: "error",
//         message: err?.data?.message || "Registration failed",
//       });
//       toggleLoader?.(false);
//     }
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <div className="text-center mb-4 sm:mb-6">
//         <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//           <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
//         </div>
//         <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//           Account Setup
//         </h2>
//       </div>

//       {/* Summary */}
//       <div className="bg-gray-50 rounded-xl p-3 sm:p-4 space-y-2">
//         <h3 className="text-sm font-medium text-gray-700">Summary</h3>
//         <div className="flex items-center gap-2">
//           <CheckCircle className="w-4 h-4 text-green-500" />
//           <span className="text-xs sm:text-sm text-gray-600">
//             Details Completed
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <CheckCircle className="w-4 h-4 text-green-500" />
//           <span className="text-xs sm:text-sm text-gray-600">
//             Photo Captured
//           </span>
//         </div>
//       </div>

//       {/* Email OTP */}
//       <div className="space-y-3">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//           <div>
//             <p className="text-xs sm:text-sm font-medium text-gray-700">
//               Email Verification
//             </p>
//             <p className="text-xs text-gray-500 truncate max-w-[200px]">
//               {formData.email}
//             </p>
//           </div>
//           <button
//             onClick={handleSendEmailOtp}
//             disabled={isRegistering || (emailOtpSent && !canResend)}
//             className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium ${
//               emailOtpSent && !canResend
//                 ? "bg-green-100 text-green-700"
//                 : "bg-teal-500 text-white hover:bg-teal-600"
//             } disabled:opacity-50`}
//           >
//             {isRegistering
//               ? "Sending..."
//               : emailOtpSent && !canResend
//               ? `Resend (${timer}s)`
//               : emailOtpSent
//               ? "Resend"
//               : "Send OTP"}
//           </button>
//         </div>

//         {emailOtpSent && (
//           <div className="space-y-1 animate-fadeIn">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                 <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 maxLength={6}
//                 value={formData.emailOtp || ""}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     emailOtp: e.target.value.replace(/\D/g, ""),
//                   }))
//                 }
//                 placeholder="Enter 6-digit OTP"
//                 className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white ${
//                   errors.emailOtp ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//             </div>
//             {errors.emailOtp && (
//               <p className="text-red-500 text-xs">{errors.emailOtp}</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Terms */}
//       <div className="flex items-start gap-2 sm:gap-3">
//         <input
//           type="checkbox"
//           id="foreignTerms"
//           checked={isChecked && isConfirmAgree}
//           onChange={(e) =>
//             e.target.checked ? onShowModal() : setIsChecked(false)
//           }
//           className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600"
//         />
//         <label
//           htmlFor="foreignTerms"
//           className="text-xs sm:text-sm text-gray-600"
//         >
//           I agree to{" "}
//           <button
//             type="button"
//             onClick={onShowModal}
//             className="text-teal-600 hover:underline"
//           >
//             Terms & Conditions
//           </button>
//         </label>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

//         <button
//           onClick={handleFinalSubmit}
//           disabled={
//             isVerifying ||
//             !emailOtpSent ||
//             !formData.emailOtp ||
//             formData.emailOtp.length !== 6 ||
//             !isChecked ||
//             !isConfirmAgree
//           }
//           className="order-1 sm:order-2 flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 sm:py-2 rounded-full text-sm sm:text-base font-medium disabled:opacity-50 flex items-center justify-center gap-2"
//         >
//           {isVerifying ? (
//             <>
              
//               Creating...
//             </>
//           ) : (
//             <>
//               Complete
//               <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const RegisterComponent = ({
//   onToggleMode,
//   isVisible,
//   showModal,
//   onShowModal,
//   onCloseModal,
//   onAgreeTerms,
//   isConfirmAgree,
//   toggleLoader
// }) => {
//   const location = useLocation();
//   const [notification, setNotification] = useState(null);
//   const [isChecked, setIsChecked] = useState(false);

//   const [currentStep, setCurrentStep] = useState(1);
//   const [isIndianUser, setIsIndianUser] = useState(true);
//   const [registrationKey, setRegistrationKey] = useState(null);

//   const [formData, setFormData] = useState({
//     // Country
//     countryCode: "+91",
//     country: "India",
//     // Common fields
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     referralId: "",
//     emailOtp: "",
//     // Indian specific
//     aadhaarNumber: "",
//     aadhaarOtp: "",
//     aadhaarTempId: "",
//     aadhaarVerified: false,
//     aadhaarData: null,
//     panNumber: "",
//     panName: "",
//     panDob: "",
//     panVerified: false,
//     panData: null,
//     // Foreign specific
//     livePhoto: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Get appropriate steps based on user type
//   const STEPS = isIndianUser ? STEPS_INDIAN : STEPS_FOREIGN;

//   // ... (keep all useEffect hooks the same)

//   useEffect(() => {
//     const activeSession = localStorage.getItem("active_registration_session");
//     if (activeSession) {
//       try {
//         const sessionData = JSON.parse(activeSession);
//         const currentTime = new Date().getTime();
//         const hoursPassed =
//           (currentTime - sessionData.timestamp) / (1000 * 60 * 60);

//         if (hoursPassed < 24) {
//           setRegistrationKey(sessionData.key);
//           const savedStepData = localStorage.getItem(sessionData.key);
//           if (savedStepData) {
//             const parsed = JSON.parse(savedStepData);
//             setCurrentStep(parsed.step);
//             setIsIndianUser(parsed.isIndianUser);

//             if (sessionData.isIndianUser && sessionData.aadhaarTempId) {
//               setFormData((prev) => ({
//                 ...prev,
//                 aadhaarTempId: sessionData.aadhaarTempId,
//               }));
//             } else if (!sessionData.isIndianUser && sessionData.email) {
//               setFormData((prev) => ({ ...prev, email: sessionData.email }));
//             }

//             setNotification({
//               type: "info",
//               message: `Welcome back! Resuming from step ${parsed.step}`,
//             });
//           }
//         } else {
//           localStorage.removeItem("active_registration_session");
//           localStorage.removeItem(sessionData.key);
//         }
//       } catch (error) {
//         console.error("Error loading session:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const referralCode = params.get("referralCode");
//     if (referralCode && !formData.referralId) {
//       setFormData((prev) => ({ ...prev, referralId: referralCode }));
//     }
//   }, [location.search]);

//   useEffect(() => {
//     setIsChecked(isConfirmAgree);
//   }, [isConfirmAgree]);

//   const handleNext = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
//   };

//   const handlePrev = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//   };

//   const clearProgress = () => {
//     if (registrationKey) {
//       localStorage.removeItem(registrationKey);
//     }
//     localStorage.removeItem("active_registration_session");
//   };

//   const clearAllRegistrationProgress = () => {
//     localStorage.removeItem("active_registration_session");
//     const keysToRemove = [];
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (
//         key &&
//         (key.startsWith("reg_step_aadhaar_") ||
//           key.startsWith("reg_step_email_"))
//       ) {
//         keysToRemove.push(key);
//       }
//     }
//     keysToRemove.forEach((key) => localStorage.removeItem(key));
//   };

//   const renderStep = () => {
//     // Country selection is always step 1
//     if (currentStep === 1) {
//       return (
//         <CountrySelectionStep
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//           setIsIndianUser={setIsIndianUser}
//         />
//       );
//     }

//     // Indian flow (now 5 steps instead of 6)
//     if (isIndianUser) {
//       switch (currentStep) {
//         case 2:
//           return (
//             <AadhaarStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               touched={touched}
//               setTouched={setTouched}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 3:
//           return (
//             <PanStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 4:
//           return (
//             <PhotoCaptureStep
//               formData={formData}
//               setFormData={setFormData}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 5:
//           // Combined Personal Details + Account Setup
//           return (
//             <PersonalDetailsAndSetupStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               isChecked={isChecked}
//               setIsChecked={setIsChecked}
//               isConfirmAgree={isConfirmAgree}
//               onShowModal={onShowModal}
//               onComplete={clearProgress}
//               toggleLoader={toggleLoader}
//             />
//           );
//         default:
//           return null;
//       }
//     }
//     // Foreign flow (now 4 steps)
//     else {
//       switch (currentStep) {
//         case 2:
//           return (
//             <ForeignPersonalDetailsStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 3:
//           return (
//             <PhotoCaptureStep
//               formData={formData}
//               setFormData={setFormData}
//               onNext={handleNext}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               toggleLoader={toggleLoader}
//             />
//           );
//         case 4:
//           // Combined Foreign Account Setup
//           return (
//             <ForeignAccountSetupStep
//               formData={formData}
//               setFormData={setFormData}
//               errors={errors}
//               setErrors={setErrors}
//               onPrev={handlePrev}
//               setNotification={setNotification}
//               isChecked={isChecked}
//               setIsChecked={setIsChecked}
//               isConfirmAgree={isConfirmAgree}
//               onShowModal={onShowModal}
//               onComplete={clearProgress}
//               toggleLoader={toggleLoader}
//             />
//           );
//         default:
//           return null;
//       }
//     }
//   };

//   return (
//     <div
//       className={`max-w-[120%] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//       }`}
//     >
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       {/* Progress Bar */}
//       <ProgressBar currentStep={currentStep} steps={STEPS} />

//       {/* Step Content */}
//       <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8">
//         {renderStep()}
//       </div>

//       {/* Login Link */}
//       <div className="mt-3 text-center">
//         <p className="text-sm text-gray-600">
//           Already have an account?{" "}
//           <button
//             onClick={onToggleMode}
//             className="text-teal-600 hover:text-teal-700 font-medium"
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function AuthContainer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cluster } = useParams();

//   const [isLogin, setIsLogin] = useState(() => {
//     if (cluster === "login/") return true;
//     if (cluster === "register/") return false;
//     return window.location.pathname.includes("register/") ? false : true;
//   });
//   const toggleLoader = (show) => {
//     setShowGlobalLoader(show);
//   };
//   const [showGlobalLoader, setShowGlobalLoader] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isConfirmAgree, setIsConfirmAgree] = useState(false);

//   const handleBack = () => navigate("/");

//   useEffect(() => {
//     if (cluster === "login/") {
//       setIsLogin(true);
//     } else if (cluster === "register/") {
//       setIsLogin(false);
//     }
//   }, [cluster]);

//   const handleLoginSubmit = (values) => {
//     // console.log('Login submitted:', values);
//   };

//   const handleRegisterSubmit = (values) => {
//     // console.log('Register submitted:', values);
//   };

//   const handleShowModal = () => setShowModal(true);

//   const handleCloseModal = () => {
//     if (!isConfirmAgree) {
//       setIsConfirmAgree(false);
//     }
//     setShowModal(false);
//   };

//   const handleAgreeTerms = (isAgreed) => {
//     setIsConfirmAgree(isAgreed);
//     setShowModal(false);
//   };

//   const toggleMode = () => {
//     setIsTransitioning(true);
//     const newCluster = isLogin ? "register/" : "login/";
//     navigate(`/${newCluster}`, { replace: true });

//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 50);
//     }, 250);
//   };

//   const handleTabClick = (mode) => {
//     if (isTransitioning) return;
//     const cluster = mode === "login/" ? "login/" : "register/";
//     navigate(`/${cluster}`, { replace: true });

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setIsLogin(mode === "login/");
//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 50);
//     }, 250);
//   };

//   // Reusable Back Button Component
//   const BackButton = ({ className = "" }) => (
//     <button
//       onClick={handleBack}
//       className={`group flex items-center justify-center text-white hover:text-white/90 
//         bg-white/10 hover:bg-white/20 backdrop-blur-sm
//         rounded-full transition-all duration-300 ${className}`}
//       aria-label="Go back"
//     >
// <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-[-2px] transition-transform duration-300" />
//     </button>
//   );

//   // Reusable Tab Button Component
//   const TabButton = ({
//     active,
//     onClick,
//     disabled,
//     children,
//     className = "",
//   }) => (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`flex-1 py-1 sm:py-1 md:py-2 lg:py-2 px-4 sm:px-4 md:px-5 lg:px-6 
//         rounded-full font-bold transition-all duration-500 
//         text-xs sm:text-sm md:text-base
//         ${
//           active
//             ? "bg-white/90 text-teal-700 shadow-lg md:shadow-xl transform scale-[1] md:scale-100 backdrop-blur-sm"
//             : "text-white/80 hover:text-white "
//         } 
//         ${disabled ? "opacity-50 cursor-not-allowed" : ""}
//         ${className}`}
//     >
//       {children}
//     </button>
//   );



//   return (
//     <div className="min-h-screen w-full overflow-hidden bg-gray-50">
//       {showGlobalLoader && <Loader />}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* DESKTOP & LARGE TABLET VIEW (lg and above) */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <div className="hidden lg:flex w-full h-screen relative">
//         {/* Left Section - Gradient Background (Sliding) */}
//         <div
//           className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 
//             transform transition-all duration-1000 ease-out
//             ${isLogin ? "left-0 translate-x-0" : "left-1/2 translate-x-0"}`}
//         >
//           {/* Desktop Header with Back Button and Tabs */}
//           <div className="absolute top-0 left-0 right-0 z-20 p-6 xl:p-8">
//             <div className="flex items-center gap-4">
//               {/* Back Button - Desktop */}
//               <BackButton className="w-10 h-10 xl:w-12 xl:h-12 p-2.5 xl:p-3 shrink-0" />

//               {/* Navigation Tabs - Desktop */}
//               <div className="flex-1 max-w-md">
//                 <div
//                   className="flex bg-white/10 backdrop-blur-md rounded-full p-1.5 xl:p-2 
//                   shadow-xl border border-white/10"
//                 >
//                   <TabButton
//                     active={isLogin}
//                     onClick={() => handleTabClick("login/")}
//                     disabled={isTransitioning}
//                   >
//                     LOGIN
//                   </TabButton>
//                   <TabButton
//                     active={!isLogin}
//                     onClick={() => handleTabClick("register/")}
//                     disabled={isTransitioning}
//                   >
//                     SIGN UP
//                   </TabButton>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Icon Section - Desktop */}
//           <div className="relative text-center text-white px-6 xl:px-8 flex flex-col items-center justify-center h-full overflow-hidden pt-20">


//             {/* Main Icon */}
//             <div
//               className="relative w-40 h-40 xl:w-56 xl:h-56 rounded-full flex items-center justify-center 
//               transform transition-all duration-700 hover:scale-110 hover:rotate-3"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
//               <img
//                 src={icon}
//                 alt="Secure Crypto Wallet Icon"
//                 title="Jaimax Digital Payment"
//                 className="relative w-full h-full object-contain drop-shadow-2xl"
//                 loading="lazy"
//               />

//             </div>

//             {/* Text Content */}
//             <div className="relative mt-6 xl:mt-8 max-w-sm xl:max-w-md">
//               <h2
//                 className={`text-2xl xl:text-4xl font-bold mb-3 xl:mb-4 transition-all duration-700 transform 
//                   bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin ? "Welcome Back!" : "Join Us Today!"}
//               </h2>
//               <p
//                 className={`text-teal-50 text-sm xl:text-lg leading-relaxed transition-all duration-700 transform
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin
//                   ? "Trade, Earn, Grow — All from One Jaimax Account."
//                   : "The Next-Gen Crypto Platform Built for You. Register Today."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Form (Sliding) */}
//         <div
//           className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out 
//             overflow-y-auto scrollbar-none scrollbar-thumb-gray-10
//             ${isLogin ? "right-0 translate-x-0" : "right-1/2 translate-x-0"}`}
//         >
//           <div className="flex items-start justify-center w-full min-h-full p-6 lg:p-8 xl:p-12 pt-8 lg:pt-12">
//             <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
//               {isLogin ? (
//                 <LoginComponent
//                   onSubmit={handleLoginSubmit}
//                   onToggleMode={toggleMode}
//                   isVisible={!isTransitioning}
//                   toggleLoader={toggleLoader}
//                 />
//               ) : (
//                 <RegisterComponent
//                   onSubmit={handleRegisterSubmit}
//                   onToggleMode={toggleMode}
//                   isVisible={!isTransitioning}
//                   showModal={showModal}
//                   onShowModal={handleShowModal}
//                   onCloseModal={handleCloseModal}
//                   onAgreeTerms={handleAgreeTerms}
//                   isConfirmAgree={isConfirmAgree}
//                   toggleLoader={toggleLoader}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* TABLET VIEW (md to lg) */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <div className="hidden md:flex lg:hidden w-full min-h-screen flex-col">
//         {/* Tablet Header */}
//         <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
//           {/* Tablet Header with Back Button and Tabs */}
//           <div className="relative z-10 px-4 pt-4 pb-2">
//             <div className="flex items-center gap-3">
//               {/* Back Button - Tablet */}
//               <BackButton className="w-9 h-9 p-2 shrink-0" />

//               {/* Tablet Navigation */}
//               <div className="flex-1 max-w-sm mx-auto">
//                 <div
//                   className="flex bg-white/15 backdrop-blur-md rounded-full p-1.5 
//                   shadow-xl border border-white/10"
//                 >
//                   <TabButton
//                     active={isLogin}
//                     onClick={() => handleTabClick("login")}
//                     disabled={isTransitioning}
//                   >
//                     LOGIN
//                   </TabButton>
//                   <TabButton
//                     active={!isLogin}
//                     onClick={() => handleTabClick("register")}
//                     disabled={isTransitioning}
//                   >
//                     SIGN UP
//                   </TabButton>
//                 </div>
//               </div>

//               {/* Spacer for balance */}
//               <div className="w-9 h-9"></div>
//             </div>
//           </div>

//           {/* Tablet Icon Section - Horizontal Layout */}
//           <div className="relative z-10 py-6 px-8">
//             <div className="flex items-center justify-center gap-6">
//               {/* Icon */}
//               <div className="relative shrink-0">
//                 <div
//                   className="absolute inset-0 w-28 h-28 bg-gradient-to-r from-teal-400 to-green-400 
//                   rounded-full blur-xl opacity-30 animate-pulse"
//                 ></div>
//                 <div
//                   className="relative w-28 h-28 rounded-full flex items-center justify-center 
//                   backdrop-blur-sm shadow-xl"
//                 >
//                   <img
//                     src={icon}
//                     alt=""
//                     className="w-full h-full object-contain"
//                     loading="lazy"
//                   />

//                 </div>
//               </div>

//               {/* Text */}
//               <div className="text-left text-white">
//                 <h2
//                   className={`text-2xl font-bold mb-2 transition-all duration-700 transform 
//                     bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent
//                     ${
//                       isTransitioning
//                         ? "opacity-0 translate-y-4"
//                         : "opacity-100 translate-y-0"
//                     }`}
//                 >
//                   {isLogin ? "Welcome Back!" : "Join Us Today!"}
//                 </h2>
//                 <p
//                   className={`text-teal-50 text-sm leading-relaxed max-w-xs transition-all duration-700 transform
//                     ${
//                       isTransitioning
//                         ? "opacity-0 translate-y-4"
//                         : "opacity-100 translate-y-0"
//                     }`}
//                 >
//                   {isLogin
//                     ? "Trade, Earn, Grow — All from One Account."
//                     : "Next-Gen Crypto Platform Built for You."}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tablet Form Content */}
//         <div className="flex-1 bg-white overflow-y-auto">
//           <div className="max-w-lg mx-auto p-6 py-8">
//             {isLogin ? (
//               <LoginComponent
//                 onSubmit={handleLoginSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 toggleLoader={toggleLoader}
//               />
//             ) : (
//               <RegisterComponent
//                 onSubmit={handleRegisterSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 showModal={showModal}
//                 onShowModal={handleShowModal}
//                 onCloseModal={handleCloseModal}
//                 onAgreeTerms={handleAgreeTerms}
//                 isConfirmAgree={isConfirmAgree}
//                 toggleLoader={toggleLoader}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* MOBILE VIEW (below md) */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <div className="md:hidden w-full min-h-screen flex flex-col">
//         {/* Mobile Header */}
//         <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden shrink-0">
//           {/* Mobile Header with Back Button and Tabs */}
//           <div className="relative z-10 px-3 pt-3 pb-2">
//             <div className="flex items-center gap-2">
//               {/* Back Button - Mobile */}
//               <BackButton className="w-8 h-8 p-1.5 shrink-0" />

//               {/* Mobile Navigation */}
//               <div className="flex-1 max-w-xs mx-auto">
//                 <div
//                   className="flex bg-white/15 backdrop-blur-md rounded-full p-1 
//                   shadow-lg border border-white/10"
//                 >
//                   <TabButton
//                     active={isLogin}
//                     onClick={() => handleTabClick("login")}
//                     disabled={isTransitioning}
//                     className="text-[11px] xs:text-xs"
//                   >
//                     LOGIN
//                   </TabButton>
//                   <TabButton
//                     active={!isLogin}
//                     onClick={() => handleTabClick("register")}
//                     disabled={isTransitioning}
//                     className="text-[11px] xs:text-xs"
//                   >
//                     SIGN UP
//                   </TabButton>
//                 </div>
//               </div>

//               {/* Spacer for balance */}
//               <div className="w-8 h-8"></div>
//             </div>
//           </div>

//           {/* Mobile Icon Section */}
//           <div className="relative z-10 py-4 sm:py-6 text-center text-white">
//             {/* Compact Layout for Small Screens */}
//             <div className="px-4">
//               {/* Icon - Smaller on mobile */}
//               <div className="relative mb-3 sm:mb-4 inline-block">
//                 <div
//                   className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-r 
//                   from-teal-400 to-green-400 rounded-full blur-xl opacity-30 animate-pulse"
//                 ></div>
//                 <div
//                   className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full 
//                   flex items-center justify-center backdrop-blur-sm shadow-xl"
//                 >
//                   <img
//                     src={icon}
//                     alt=""
//                     className="w-full h-full object-contain"
//                     loading="lazy"
//                   />

//                 </div>
//               </div>

//               {/* Text - Compact */}
//               <h2
//                 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 transition-all duration-700 transform 
//                   bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin ? "Welcome Back!" : "Join Us Today!"}
//               </h2>
//               <p
//                 className={`text-teal-50 text-xs sm:text-sm leading-relaxed transition-all duration-700 transform
//                   ${
//                     isTransitioning
//                       ? "opacity-0 translate-y-4"
//                       : "opacity-100 translate-y-0"
//                   }`}
//               >
//                 {isLogin
//                   ? "Trade, Earn, Grow — All from One Account."
//                   : "Next-Gen Crypto Platform Built for You."}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Form Content */}
//         <div className="flex-1 bg-white overflow-y-auto">
//           <div className="w-full max-w-md mx-auto px-3 sm:px-4 py-3 sm:py-4">
//             {isLogin ? (
//               <LoginComponent
//                 onSubmit={handleLoginSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 toggleLoader={toggleLoader}
//               />
//             ) : (
//               <RegisterComponent
//                 onSubmit={handleRegisterSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//                 showModal={showModal}
//                 onShowModal={handleShowModal}
//                 onCloseModal={handleCloseModal}
//                 onAgreeTerms={handleAgreeTerms}
//                 isConfirmAgree={isConfirmAgree}
//                 toggleLoader={toggleLoader}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* MODAL */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {showModal && (
//         <TermsConditionsModal
//           show={showModal}
//           onHide={handleCloseModal}
//           onAgree={handleAgreeTerms}
//         />
//       )}

//       {/* ═══════════════════════════════════════════════════════════════ */}
//       {/* CUSTOM STYLES */}
//       {/* ═══════════════════════════════════════════════════════════════ */}
//       <style jsx>{`
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .animate-float-slow {
//           animation: float 3s ease-in-out infinite;
//         }

//         /* Custom Scrollbar */
//         .scrollbar-thin {
//           scrollbar-width: none;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar {
//           width: 6px;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
//           background: #d1d5db;
//           border-radius: 3px;
//         }

//         .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
//           background: #9ca3af;
//         }

//         /* Smooth Transitions */
//         * {
//           -webkit-tap-highlight-color: transparent;
//         }

//         /* Better Touch Targets */
//         @media (hover: none) and (pointer: coarse) {
//           button {
//             min-height: 44px;
//             min-width: 44px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Users,
  Shield,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import icon from "../assets/Images/greencoin.webp";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation,
} from "./authApiSlice";
import Seo from "../SeoContent/Seo";

import countrycodes from "./countryCodes.json";
import TermsConditionsModal from "./TermsAndConditions";
import * as yup from "yup";

const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Use the prop if provided, otherwise fallback to imported data
  const dataSource = countryCodes || countrycodes;

  const filteredCountries = dataSource.filter(
    (country) =>
      country.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.country_code.includes(searchTerm) ||
      country.country_code_alpha3
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const selectedCountry =
    dataSource.find((c) => c.country_code === value) || dataSource[0];

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".country-dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="country-dropdown-container relative">
      <button
        type="button"
        onClick={() => {
          // console.log('Dropdown button clicked, isOpen:', !isOpen);
          setIsOpen(!isOpen);
        }}
        className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="text-lg">{selectedCountry?.flag}</span>
          <span className="font-medium">{selectedCountry?.country_code}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* IMPORTANT: Added fixed positioning and higher z-index */}
      {isOpen && (
        <div
          className="fixed top-auto left-auto mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-hidden"
          style={{
            zIndex: 9999,
            position: "absolute",
            top: "100%",
            left: "0",
            minWidth: "280px",
          }}
        >
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => {
                // console.log('Search term:', e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-48 overflow-y-auto bg-white">
            {/* {console.log('Rendering countries, count:', filteredCountries.length)} */}
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => {
                // console.log('Rendering country:', country.country_name);
                return (
                  <button
                    key={`${country.country_code}-${country.country_code_alpha3}-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // console.log('Selected country:', country);
                      onChange(country.country_code);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium text-gray-900">
                      {country.country_code}
                    </span>
                    <span className="text-gray-600 truncate">
                      {country.country_name}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {dataSource.length === 0
                  ? "No country data loaded"
                  : "No countries found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoginComponent = ({ onToggleMode, isVisible }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isLoading, error: loginError }] = useLoginMutation();
  const loginschema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.jaimax.com/login",
    url: "https://www.jaimax.com/login",
    name: "Jaimax Account Login",
    description:
      "Securely log in to your Jaimax account to access your wallet, transactions and digital finance dashboard.",
    inLanguage: "en",
    isPartOf: { "@id": "https://www.jaimax.com/#website" },
    "about": {
    "@id": "https://www.jaimax.com/#organization" 
  },
    potentialAction: {
      "@type": "LoginAction",
      target: "https://www.jaimax.com/login",
    },
  };
  // Handle login error from RTK Query
  useEffect(() => {
    if (loginError) {
      const message =
        loginError?.data?.message || "Login failed. Please try again.";
      setNotification({ type: "error", message });
    }
  }, [loginError]);

  // Load saved email and remember me status
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail) {
      setFormData((prevValues) => ({ ...prevValues, email: savedEmail }));
    }
    setRememberMe(savedRememberMe);
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Enhanced keydown handler for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setNotification({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    if (rememberMe) {
      Cookies.set("email", formData.email?.trim(), { expires: 30 });
      Cookies.set("rememberMe", "true", { expires: 30 });
    } else {
      Cookies.remove("email");
      Cookies.remove("rememberMe");
    }

    try {
      const response = await login({
        email: formData.email?.trim(),
        password: formData.password,
        role: 1,
      }).unwrap();

      if (response?.success) {
        const userData = response?.data;

        // store tokens & user info
        Cookies.set("token", userData?.token, { expires: 7 });
        sessionStorage.setItem("token", userData?.token);
        Cookies.set("userData", JSON.stringify(userData), { expires: 7 });

        setNotification({
          type: "success",
          message: response?.message || "Login successful! Redirecting...",
        });

        // ✅ check KYC status before redirect
        setTimeout(() => {
          if (userData?.kycVerified === "approve") {
            navigate("/dashboard");
            // console.log("Redirecting to Dashboard");
          } else {
            navigate("/kyc-information");
            // console.log("Redirecting to KYC Information");
          }
        }, 1000);
      } else {
        setNotification({
          type: "error",
          message: response?.message || "Login failed.",
        });
      }
    } catch (err) {
      const errorMessage = err?.data?.message || "Login error";
      setNotification({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <div
      className={`w-full max-w-md transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Seo page="login" />


      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 uppercase">
          Login
        </h1>
        <p className="text-gray-600">
          If you are already a customer, enter your details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              autoComplete="off"
              className={`w-full pl-10 pr-4 bg-white py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
              autoComplete="off"
              className={`w-full bg-white pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 uppercase"
        >
          {isLoading ? "Signing In..." : "Login"}
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Don't have an account?</p>
        <button
          onClick={onToggleMode}
          className="text-teal-600 hover:text-teal-700 font-semibold"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};
const RegisterComponent = ({
  onSubmit,
  onToggleMode,
  isVisible,
  showModal,
  onShowModal,
  onCloseModal,
  onAgreeTerms,
  isConfirmAgree,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [notification, setNotification] = useState(null);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [referralApplied, setReferralApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralId: "",
    referralLocked: false,
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const registerschema={

  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.jaimax.com/register",
  "url": "https://www.jaimax.com/register",
  "name": "Create Your Jaimax Account",
  "description": "Register for a Jaimax account to start using the wallet, explore digital finance tools and participate in the Jaimax ecosystem.",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://www.jaimax.com/#website" },
  "about": {
    "@id": "https://www.jaimax.com/#organization" 
  },
  "potentialAction": {
    "@type": "RegisterAction",
    "target": "https://www.jaimax.com/register"
  }

  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get("referralCode");

    if (referralCode) {
      // console.log("Referral code found in URL:", referralCode);

      setFormData((prevData) => ({
        ...prevData,
        referralId: referralCode,
      }));

      setReferralApplied(true);

      // Mark as touched for validation purposes
      setTouched((prev) => ({
        ...prev,
        referralId: true,
      }));

      // Validate referral code
      const fieldError = validateField("referralId", referralCode);
      if (fieldError) {
        // console.log("Referral code validation error:", fieldError);
        setErrors((prev) => ({
          ...prev,
          referralId: fieldError,
        }));
      }
    }
  }, [location.search]);
  const [register, { isLoading: isRegisterLoading, error: registerError }] =
    useRegisterMutation();
  const [verify, { isLoading: isVerifyLoading, error: verifyError }] =
    useVerifyMutation();
  const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] =
    useOTPresentMutation();

  // when component mounts, check URL for referralCode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralCode = params.get("referralCode");
    if (referralCode) {
      setFormData((prev) => ({
        ...prev,
        referralId: referralCode,
        referralLocked: true, // ✅ lock only for link-based refs
      }));
    }
  }, [location.search]);

  const getCurrentCountry = () => {
    const country = countrycodes.find(
      (item) => item.country_code === selectedCode
    );
    return country;
  };

  // Yup validation schema
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number can only contain digits")
      .test("phone-length", function (value) {
        const currentCountry = getCurrentCountry();
        const exactPhoneLength = currentCountry
          ? currentCountry.phone_number_length
          : 10;

        if (value && value.length !== exactPhoneLength) {
          return this.createError({
            message: `Phone number must be exactly ${exactPhoneLength} digits for ${
              currentCountry?.country_name || "selected country"
            }`,
          });
        }
        return true;
      }),

    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/,
        "Invalid email(must contain at least one letter)"
      ),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters"),
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),

    referralId: yup
      .string()
      .nullable()
      .test(
        "referral-format",
        "Referral ID can only contain letters and numbers length 13",
        function (value) {
          if (!value) return true; // Optional field
          return /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(value);
        }
      ),

    otp: yup.string().when("otpSent", {
      is: true,
      then: (schema) =>
        schema
          .required("OTP is required")
          .matches(/^\d{6}$/, "OTP must be 6 digits"),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !isVerifyLoading &&
      !isRegisterLoading &&
      !isOTPresentLoading
    ) {
      e.preventDefault();

      // If OTP is not sent yet, try to send OTP
      if (!otpSent) {
        const validationErrors = validate();
        const formErrorsExceptOtp =
          Object.keys(validationErrors).filter((key) => key !== "otp").length >
          0;

        if (!formErrorsExceptOtp) {
          handleVerify(e);
        }
      }
      // If OTP is sent and form is complete, submit the form
      else if (otpSent && formData.otp.trim() && isChecked && isConfirmAgree) {
        handleSubmit(e);
      }
    }
  };

  const handleOtpKeyDown = (e) => {
    if (e.key === "Enter" && !isVerifyLoading) {
      e.preventDefault();

      // If form is complete and OTP is entered, submit
      if (otpSent && formData.otp.trim() && isChecked && isConfirmAgree) {
        handleSubmit(e);
      }
      // If OTP field has 4 digits and can resend, allow sending OTP
      else if (!otpSent || (canResendOtp && formData.otp.length === 4)) {
        handleVerify(e);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // User wants to check the box - show modal first
      onShowModal();
    } else {
      // User unchecked the box - reset everything
      setIsChecked(false);
    }
  };

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    onShowModal();
  };

  // Update checkbox state when terms are confirmed
  useEffect(() => {
    if (isConfirmAgree) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isConfirmAgree]);

  const getErrorMessage = (error) => {
    if (error) {
      if (error.data && error.data.message) {
        return error.data.message;
      } else if (error.error) {
        return error.error;
      } else if (error.status) {
        if (error.status === 400)
          return `Bad Request: ${
            error.data?.message || "Please check your input."
          }`;
        if (error.status === 401)
          return `Unauthorized: ${
            error.data?.message || "Invalid credentials."
          }`;
        if (error.status === 409)
          return `Conflict: ${
            error.data?.message || "User already exists or other conflict."
          }`;
        if (error.status >= 500)
          return `Server Error: ${
            error.data?.message || "Please try again later."
          }`;
        return `Error ${error.status}: ${
          error.data?.message || "An API error occurred."
        }`;
      }
    }
    return "An unexpected error occurred. Please try again.";
  };

  useEffect(() => {
    if (registerError) {
      setNotification({
        type: "error",
        message: getErrorMessage(registerError),
      });
    }
  }, [registerError]);

  useEffect(() => {
    if (verifyError) {
      setNotification({ type: "error", message: getErrorMessage(verifyError) });
    }
  }, [verifyError]);

  useEffect(() => {
    if (OTPresentError) {
      setNotification({
        type: "error",
        message: getErrorMessage(OTPresentError),
      });
    }
  }, [OTPresentError]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResendOtp(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Validate single field
  const validateField = (fieldName, value) => {
    try {
      const dataToValidate = { ...formData, [fieldName]: value, otpSent };
      validationSchema.validateSyncAt(fieldName, dataToValidate);
      return null;
    } catch (error) {
      return error.message;
    }
  };

  // Validate all fields
  const validateAll = () => {
    try {
      const dataToValidate = { ...formData, otpSent };
      validationSchema.validateSync(dataToValidate, { abortEarly: false });
      return {};
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      return validationErrors;
    }
  };

  // Legacy validate function for backward compatibility
  const validate = () => {
    return validateAll();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Don't allow changing referral code if it was applied from URL
    if (name === "referralId" && referralApplied) {
      return;
    }

    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    if (name === "referralId" && !/^[A-Za-z0-9]*$/.test(value)) {
      return;
    }
    if (name === "otp" && !/^[0-9]*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only validate and show error if field was touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate only this field on blur
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setNotification(null);

    const validationErrors = validateAll();
    const formErrorsExceptOtp =
      Object.keys(validationErrors).filter((key) => key !== "otp").length > 0;

    if (formErrorsExceptOtp) {
      // Mark all fields as touched and show all errors
      const touchedFields = {};
      Object.keys(formData).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched(touchedFields);
      setErrors(validationErrors);

      setNotification({
        type: "error",
        message: "Please fill all required fields correctly.",
      });
      return;
    }

    setIsOtpSending(true);

    try {
      const currentCountry = getCurrentCountry();

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPwd: formData.confirmPassword,
        countryCode: currentCountry?.country_code || "+91",
        country: currentCountry?.country_name || "India",
      };

      const result = await register(payload).unwrap();

      // if (result?.data?.username) {
      //   localStorage.setItem("username", result.data.username);
      // }
      if (result?.data?.username) {
        Cookies.set("username", result.data.username, { expires: 7 }); // expires in 7 days
      }
      setOtpSent(true);
      setTimer(120);
      setCanResendOtp(false);
      setNotification({ type: "success", message: "OTP sent to your email!" });
    } catch (err) {
      if (err?.data?.message === "User verification pending") {
        try {
          const otpPayload = {
            email: formData.email,
            otpType: "register",
          };
          const ress = await OTPresent(otpPayload).unwrap();
          setOtpSent(true);
          setTimer(120);
          setCanResendOtp(false);
          setNotification({
            type: "success",
            message: "OTP resent to your email!",
          });
        } catch (otpErr) {
          setNotification({ type: "error", message: getErrorMessage(otpErr) });
        }
      } else {
        setNotification({ type: "error", message: getErrorMessage(err) });
      }
    } finally {
      setIsOtpSending(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    // Mark all fields as touched for final validation
    const touchedFields = {};
    Object.keys(formData).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    // Check if terms are accepted
    if (!isChecked || !isConfirmAgree) {
      setNotification({
        type: "error",
        message:
          "Please accept the Terms & Conditions and Privacy Policy to continue.",
      });
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setNotification({
        type: "error",
        message: "Please correct the highlighted fields.",
      });
      return;
    }

    if (!otpSent) {
      setNotification({
        type: "error",
        message: "Please send OTP and verify your phone number first.",
      });
      return;
    }

    if (!formData.otp.trim()) {
      setNotification({
        type: "error",
        message: "OTP is required to complete registration.",
      });
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    try {
      const verifyPayload = {
        email: formData.email,
        otp: Number(formData.otp),
        otpType: "register",
        referenceId: formData.referralId,
      };

      const res = await verify(verifyPayload).unwrap();

      if (!res.success) {
        setNotification({
          type: "error",
          message: res.message || "OTP verification failed. Please try again.",
        });
        return;
      }

      const userRegisterData = {
        ...res,
        email: formData.email,
        name: formData.name,
        username: Cookies.get("username"), // Changed from localStorage
      };

      // Set cookies instead of localStorage
      Cookies.set("token", res?.data?.token, { expires: 7 }); // expires in 7 days
      Cookies.set("userData", JSON.stringify(res?.data), { expires: 7 });
      const userData = JSON.parse(Cookies.get("userData") || "{}");
      // console.log("User Data:", userData);
      Cookies.set("userRegisterData", JSON.stringify(userRegisterData), {
        expires: 7,
      });

      setNotification({
        type: "success",
        message: res?.message || "Registration completed successfully!",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setNotification({ type: "error", message: getErrorMessage(err) });
    }
  };
  return (
    <div
      className={`w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <Seo page="register" />


      <div className="text-center mb-1 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          REGISTER
        </h1>
        <p className="text-sm text-gray-600">
          Create a new account to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Full Name"
              className={`w-full pl-10 bg-white pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.name && touched.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs pl-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-0">
          <div
            className={`flex rounded-lg border transition-all duration-200 ${
              errors.phone && touched.phone
                ? "border-red-500 bg-red-50"
                : "border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500"
            }`}
          >
            <div className="flex-shrink-0">
              <CountryCodeDropdown
                value={selectedCode}
                onChange={setSelectedCode}
                className="bg-gray-50 py-2.5 px-2 text-sm border-r border-gray-200 hover:bg-gray-100 min-w-0"
                countryCodes={countrycodes}
              />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Phone Number"
                className="w-full pl-10 pr-3 py-2.5 text-sm border-0 bg-transparent outline-none"
              />
            </div>
          </div>
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs pl-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Email"
              className={`w-full pl-10 pr-3 py-2.5  bg-white text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.email && touched.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs pl-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Password"
              className={`w-full pl-10 pr-10 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.password && touched.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs pl-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className={`w-full pl-10 pr-10 bg-white py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs pl-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="referralId"
              value={formData.referralId}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              readOnly={referralApplied}
              placeholder="Referral ID (Optional)"
              className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.referralId && touched.referralId
                  ? "border-red-500 bg-red-50"
                  : referralApplied && formData.referralId
                  ? "border-green-500 bg-green-50 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />
            {referralApplied && formData.referralId && !errors.referralId && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            )}
          </div>
          {errors.referralId && touched.referralId && (
            <p className="text-red-500 text-xs pl-1">{errors.referralId}</p>
          )}
          {referralApplied && formData.referralId && !errors.referralId && (
            <p className="text-green-600 text-xs pl-1">
              Referral code applied!
            </p>
          )}
        </div>

        {/* OTP Field */}
        <div className="space-y-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className={`w-full bg-white pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                  errors.otp && touched.otp
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={handleVerify}
              disabled={
                isRegisterLoading ||
                isOTPresentLoading ||
                (otpSent && !canResendOtp) ||
                Object.keys(validate()).filter((key) => !["otp"].includes(key))
                  .length > 0
              }
              className={`px-3 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                otpSent && !canResendOtp
                  ? "bg-green-100 text-green-700 cursor-default"
                  : isRegisterLoading || isOTPresentLoading
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : Object.keys(validate()).filter(
                      (key) => !["otp"].includes(key)
                    ).length > 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105"
              }`}
            >
              {isRegisterLoading || isOTPresentLoading
                ? "Sending..."
                : otpSent && !canResendOtp
                ? `Sent (${timer}s)`
                : canResendOtp
                ? "Send OTP"
                : "Resend"}
            </button>
          </div>
          {errors.otp && touched.otp && (
            <p className="text-red-500 text-xs pl-1">{errors.otp}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 pt-2">
          <input
            id="terms_and_conditions"
            type="checkbox"
            checked={isChecked && isConfirmAgree}
            onChange={handleCheckboxChange}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
          />
          <label
            htmlFor="terms_and_conditions"
            className="text-xs sm:text-sm text-gray-700 leading-relaxed"
          >
            I accept the{" "}
            <button
              type="button"
              onClick={handleTermsLinkClick}
              className="text-teal-600 hover:underline font-medium"
            >
              Terms & Conditions
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={handleTermsLinkClick}
              className="text-teal-600 hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={
            isVerifyLoading ||
            !otpSent ||
            !formData.otp.trim() ||
            !isChecked ||
            !isConfirmAgree ||
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword ||
            formData.password !== formData.confirmPassword ||
            (formData.referralId &&
              !/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(formData.referralId))
          }
          className="w-full  bg-gradient-to-b from-[#0B736F]  to-[#0B736F] text-white py-2.5 px-4 rounded-full font-medium as focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
        >
          {isVerifyLoading ? "Verifying OTP..." : "REGISTER"}
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onToggleMode}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default function AuthContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cluster } = useParams();
  const [isLogin, setIsLogin] = useState(() => {
    // Add fallback for when cluster is undefined initially
    if (cluster === "login") return true;
    if (cluster === "register") return false;
    // Default based on current location
    return window.location.pathname.includes("register") ? false : true;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // ADD: Terms modal state management at AuthContainer level
  const [showModal, setShowModal] = useState(false);
  const [isConfirmAgree, setIsConfirmAgree] = useState(false);
  const handleBack = () => navigate("/");
  useEffect(() => {
    if (cluster === "login") {
      setIsLogin(true);
    } else if (cluster === "register") {
      setIsLogin(false);
    }
  }, [cluster]); // This is already correct, but make sure cluster is being extracted properly

  const handleLoginSubmit = (values) => {
    // console.log('Login submitted:', values);
  };

  const handleRegisterSubmit = (values) => {
    // console.log('Register submitted:', values);
  };

  // ADD: Terms modal handlers at AuthContainer level
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!isConfirmAgree) {
      // If user closes without agreeing, reset the agreement
      setIsConfirmAgree(false);
    }
    setShowModal(false);
  };

  const handleAgreeTerms = (isAgreed) => {
    setIsConfirmAgree(isAgreed);
    setShowModal(false);
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    const newCluster = isLogin ? "register" : "login";
    navigate(`/${newCluster}`, { replace: true });

    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  const handleTabClick = (mode) => {
    if (isTransitioning) return;
    const cluster = mode === "login" ? "login" : "register";
    navigate(`/${cluster}`, { replace: true });

    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(mode === "login");
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop View */}
      <div className="hidden lg:flex w-full h-screen relative">
        
        <button
          onClick={handleBack}
          className="absolute top-[8%] left-0 z-50 text-white hover:text-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* Left Section - Gradient Background */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 transform transition-all duration-1000 ease-out ${
            isLogin ? "left-0 translate-x-0" : "left-1/2 translate-x-0"
          }`}
        >
          {/* Navigation Tabs */}
          <div className="absolute top-8 left-8 right-8 z-20">
            <div className="flex rounded-full p-2 shadow-xl border border-white/10">
              <button
                onClick={() => handleTabClick("login")}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${
                  isLogin
                    ? "bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm"
                    : ""
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => handleTabClick("register/")}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${
                  !isLogin
                    ? "bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm"
                    : ""
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          {/* Icon Section */}
          <div className="relative text-center text-white px-8 flex flex-col items-center justify-center h-full overflow-hidden">
            {/* ────── Background SVGs ────── */}
            <svg
              className="absolute w-16 h-16 text-white opacity-10 top-4 left-8 animate-float-slow"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
            <svg
              className="absolute w-20 h-20 text-yellow-300 opacity-20 bottom-8 right-6 animate-spin-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L15 8H9L12 2Z" /> {/* Profit arrow */}
            </svg>
            <svg
              className="absolute top-8 left-10 w-24 h-24 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>

            {/* Document/Code SVG */}
            <svg
              className="absolute top-16 left-24 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M6 3h12v2H6v2h7c.55 0 1 .45 1 1s-.45 1-1 1H6v2h7.5c.83 0 1.5.67 1.5 1.5S14.33 14 13.5 14H6v2h5l5 5h-3l-4-4H6v-2H5v-2h1v-2H5V9h1V7H5V5h1V3z" />
            </svg>

            {/* Currency Loop SVG */}
            <svg
              className="absolute top-12 right-16 w-24 h-24 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 1v2.05c-2.83.49-5 2.94-5 5.95h2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4h-1v2h1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4H7c0 3.01 2.17 5.46 5 5.95V23h2v-2.05c2.83-.49 5-2.94 5-5.95s-2.17-5.46-5-5.95V7.95C17.83 7.46 20 5.01 20 2h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H9c0 3.01 2.17 5.46 5 5.95V1h-2z" />
            </svg>

            {/* Coins SVG */}
            <svg
              className="absolute bottom-24 left-20 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.64 8 2s-3.03 2-8 2-8-1.64-8-2 3.03-2 8-2zm0 14c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V16c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V12c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V10c0 .36-3.03 2-8 2z" />
            </svg>

            {/* User SVG */}
            <svg
              className="absolute top-2/3 right-24 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>

            {/* Share SVG */}
            <svg
              className="absolute bottom-8 right-16 w-16 h-16 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.018 3.018 0 0 0 0-1.39l7.05-4.11a2.99 2.99 0 1 0-.96-1.72L8 9.59a3 3 0 1 0 0 4.83l7.05 4.11c.12.62.45 1.17.95 1.56.5.39 1.14.61 1.8.61a3 3 0 1 0 0-6z" />
            </svg>

            {/* Arrow SVG */}
            <svg
              className="absolute top-6 right-10 w-16 h-16 opacity-10 rotate-12"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>

            {/* Plant SVG */}
            <svg
              className="absolute bottom-10 left-10 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2C10.34 2 9 3.34 9 5c0 .66.26 1.26.68 1.7L12 9l2.32-2.3A2.5 2.5 0 0 0 15 5c0-1.66-1.34-3-3-3zm6 7c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 9c-2.33 0-7 1.17-7 3.5V22h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>

            {/* Group SVG */}
            <svg
              className="absolute top-1/3 right-8 w-20 h-20 opacity-10"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h8v-1c0-.76.32-1.45.84-1.94C11.03 16.35 13.94 16 16 16s4.97.35 6.16.56c.52.49.84 1.18.84 1.94v1h-8v-1.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>

            {/* ────── Main Content ────── */}
            <div className="relative w-56 h-56 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
              <img
                src={icon}
                alt="Secure Crypto Wallet Icon - Fast and Reliable Digital Payments"
                title="Secure Crypto Wallet Icon - Jaimax Digital Payment"
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
            </div>

            <div className="relative mt-6">
              <h2
                className={`text-4xl font-bold mb-4 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </h2>
              <p
                className={`text-teal-50 text-lg leading-relaxed transition-all duration-700 transform ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin
                  ? "Trade, Earn, Grow — All from One Jaimax Account."
                  : "The Next-Gen Crypto Platform Built for You. Register Today."}
              </p>
            </div>
          </div>
        </div>
        {/* Right Section - Form */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out ${
            isLogin ? "right-0 translate-x-0" : "right-1/2 translate-x-0"
          }`}
        >
          <div className="flex items-start justify-center w-full h-full p-12">
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginComponent
                  onSubmit={handleLoginSubmit}
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                />
              ) : (
                <RegisterComponent
                  onSubmit={handleRegisterSubmit}
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                  // PASS: Modal props to RegisterComponent
                  showModal={showModal}
                  onShowModal={handleShowModal}
                  onCloseModal={handleCloseModal}
                  onAgreeTerms={handleAgreeTerms}
                  isConfirmAgree={isConfirmAgree}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Stack Layout */}
      <div className="lg:hidden w-full min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
          <button
            onClick={handleBack}
            className="absolute top-[7.8%] -left-1 z-50 text-white hover:text-gray-200 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Mobile Navigation */}
          <div className="relative z-10 p-4">
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
              <button
                onClick={() => handleTabClick("login")}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${
                  isLogin
                    ? "bg-white/90 text-teal-700 shadow-lg transform scale-105"
                    : "hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => handleTabClick("register/")}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${
                  !isLogin
                    ? "bg-white/90 text-teal-700 shadow-lg transform scale-105"
                    : "hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          {/* Mobile Icon Section */}
          <div className="relative z-10 py-8 text-center text-white">
            <div className="mb-6 relative">
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl transform transition-all duration-500 hover:scale-110">
                <img src={icon} alt="" width={200} loading="lazy" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>

            <div className="px-4">
              <h2
                className={`text-2xl font-bold mb-2 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </h2>
              <p
                className={`text-teal-50 text-sm leading-relaxed transition-all duration-700 transform ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin
                  ? "Trade, Earn, Grow — All from One Account."
                  : "Next-Gen Crypto Platform Built for You."}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Form Content */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            {isLogin ? (
              <LoginComponent
                onSubmit={handleLoginSubmit}
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
              />
            ) : (
              <RegisterComponent
                onSubmit={handleRegisterSubmit}
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
                // PASS: Modal props to RegisterComponent
                showModal={showModal}
                onShowModal={handleShowModal}
                onCloseModal={handleCloseModal}
                onAgreeTerms={handleAgreeTerms}
                isConfirmAgree={isConfirmAgree}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Render at AuthContainer level */}
      {showModal && (
        <TermsConditionsModal
          show={showModal}
          onHide={handleCloseModal}
          onAgree={handleAgreeTerms}
        />
      )}

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

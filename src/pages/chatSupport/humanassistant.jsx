// import ReactMarkdown from "react-markdown";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiRefreshCw, FiX } from "react-icons/fi";
// import { FaUser, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaUserFriends, FaGlobe } from "react-icons/fa";
// import { HiArrowLeft, HiX } from "react-icons/hi";
// import { FaLocationCrosshairs } from "react-icons/fa6";
// import { TbWorld } from "react-icons/tb";
// import { MdOutlineClose } from "react-icons/md";
// import { SlArrowDown } from "react-icons/sl";
// import { useGetChatSupportDataMutation, useSubmitUserLocationMutation } from "./chatApi.js";
//  import logo from "../../assets/jcoin.webp";


// export default function HumanAssistant({ onclose }) {
//   const [currentLanguage, setCurrentLanguage] = useState(null);
//   const [showLanguageSelection, setShowLanguageSelection] = useState(true);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [translations, setTranslations] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const chatContainerRef = useRef(null);
//   const toggleRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [referralSource, setReferralSource] = useState("");
//   const menuRef = useRef(null);
//   const inputRef = useRef(null);
//   const [showQuickActions, setShowQuickActions] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const [showContactForm, setshowContactForm] = useState(false);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [step, setStep] = useState(1);
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState({
//     lat: null,
//     lon: null,
//     accuracy: null,
//   });
//   const [address, setAddress] = useState("");
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("");

//   // API Hooks
//   const [getChatSupportData, { isLoading: isChatSupportLoading, error: chatSupportError }] = useGetChatSupportDataMutation();
//   const [submitUserLocation, { isLoading: isLocationSubmitting }] = useSubmitUserLocationMutation();

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   // Check authentication status from cookies
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         const cookies = document.cookie.split(";");
//         const userCookie = cookies.find((cookie) =>
//           cookie.trim().startsWith("userData=")
//         );

//         if (userCookie) {
//           const cookieValue = userCookie.split("=")[1];
//           const userDataFromCookie = JSON.parse(decodeURIComponent(cookieValue));

//           if (userDataFromCookie.data && userDataFromCookie.data.token) {
//             setIsAuthenticated(true);
//             setUserData(userDataFromCookie.data);
//           } else {
//             setIsAuthenticated(false);
//             setUserData(null);
//           }
//         } else {
//           setIsAuthenticated(false);
//           setUserData(null);
//         }
//       } catch (error) {
//         // console.error("Error parsing user data:", error);
//         setIsAuthenticated(false);
//         setUserData(null);
//       }
//     };

//     checkAuth();
//   }, []);

//   // Fetch chatbot content from API when language is selected
//   useEffect(() => {
//     if (!currentLanguage) return;

//     const fetchChatbotContent = async () => {
//       try {
//         const response = await getChatSupportData({
//           query: currentLanguage,
//           isAuthenticated: isAuthenticated,
//         }).unwrap();

//         const data = response.data;

//         const transformedData = {
//           categoryName: data.categoryName,
//           supportTitle: data.supportTitle,
//           reset: data.reset,
//           home: data.home,
//           support: data.support,
//           helpAvailable: data.helpAvailable,
//           needMoreHelp: data.needMoreHelp,
//           contactSupport: data.contactSupport,
//           poweredBy: data.poweredBy,
//           chatOptions: data.chatOptions,
//         };

//         setTranslations(transformedData);
//       } catch (error) {
//         // console.error("Error fetching chatbot content:", error);
//         setTranslations(null);
//       }
//     };

//     fetchChatbotContent();
//   }, [currentLanguage, isAuthenticated, getChatSupportData]);

//   const handleLocationRequest = () => {
//     const consent = window.confirm(
//       "We need your location to process your query. Click OK to allow location access."
//     );
//     if (!consent) return;

//     if (!navigator.geolocation) {
//       setStatus("Geolocation not supported by browser.");
//       return;
//     }

//     setStatus("Requesting location...");
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude, accuracy } = pos.coords;
//         setLocation({ lat: latitude, lon: longitude, accuracy });
//         setStatus("Location captured. Proceed to enter your query.");
//         setStep(4);
//       },
//       (err) => setStatus("Location denied or unavailable: " + err.message),
//       { enableHighAccuracy: true, timeout: 15000 }
//     );
//   };

//   // Submit query to backend using API slice
//   const handleSubmitQuery = async () => {
//     if (!query) {
//       alert("Please enter your query.");
//       return;
//     }

//     const payload = {
//       phone,
//       latitude: location.lat,
//       longitude: location.lon,
//       query,
//       email,
//       referralSource,
//       name,
//       consentText: "User agreed to share location for query submission",
//     };

//     try {
//       const response = await submitUserLocation(payload).unwrap();
      
//       setAddress(response.address || "");
//       setStatus("Query submitted successfully! Address: " + response.address);
//       setStep(5);

//       setTimeout(() => {
//         setshowContactForm(false);
//       }, 2000);
//     } catch (err) {
//       setStatus("Error: " + (err.error || err.message || "Failed to submit query"));
//     }
//   };

//   // Initialize chat with loaded data
//   useEffect(() => {
//     if (translations && translations.chatOptions) {
//       const welcomeMessage =
//         isAuthenticated && userData
//           ? `Hello ${userData.name}! Welcome to JAIMAX Support. How can we help you today?`
//           : translations.chatOptions.initial.message;

//       const initialMessage = {
//         type: "bot",
//         text: welcomeMessage,
//         options: translations.chatOptions.initial.options,
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setChatHistory([initialMessage]);
//     }
//   }, [translations, isAuthenticated, userData]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [chatHistory, isTyping]);

//   // Typing indicator simulation
//   const simulateTyping = (callback, delay = 1000) => {
//     setIsTyping(true);
//     setTimeout(() => {
//       setIsTyping(false);
//       callback();
//     }, delay);
//   };

//   const handleLanguageSelect = (language) => {
//     setCurrentLanguage(language);
//     setShowLanguageSelection(false);
//   };

//   const handleOptionClick = (option) => {
//     if (!translations) return;

//     // Handle special authentication options
//     if (option === "Sign In" || option === "Go to Login") {
//       window.location.href = "/login";
//       return;
//     }

//     if (option === "Register" || option === "Create Account") {
//       window.location.href = "/register";
//       return;
//     }

//     if (option === "connect to Jaimax Team") {
//       setshowContactForm(true);
//     }

//     const userMessage = {
//       type: "user",
//       text: option,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setChatHistory((prev) => [...prev, userMessage]);
//     setShowQuickActions(false);
//     setMenuOpen(false);

//     const currentChatOptions = translations.chatOptions;

//     simulateTyping(() => {
//       const nextBot = currentChatOptions[option]
//         ? {
//             type: "bot",
//             text: currentChatOptions[option].message,
//             options: currentChatOptions[option].options,
//             timestamp: new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           }
//         : option === "connect to Jaimax Team"
//         ? null
//         : {
//             type: "bot",
//             text: "Thank you for your input. Our support team will reach out if needed.",
//             options: [],
//             timestamp: new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           };

//       if (nextBot) {
//         setChatHistory((prev) => [...prev, nextBot]);
//       }
//     }, 800);
//   };

//   const handleLanguage = async (data) => {
//     setCurrentLanguage(data);
//     setShowLanguageSelection(false);
//     setChatHistory([]);

//     try {
//       await getChatSupportData({
//         query: data,
//         isAuthenticated: isAuthenticated,
//       }).unwrap();
//     } catch (err) {
//       // console.error("Error sending message:", err);
//     }
//   };

//   const handleReset = () => {
//     setShowLanguageSelection(true);
//     setshowContactForm(false);
//     setCurrentLanguage(null);
//     setChatHistory([]);
//     setShowQuickActions(true);
//     setMenuOpen(false);
//     setInputMessage("");
//     setTranslations(null);
//   };

//   const closeChat = () => {
//     setMenuOpen(false);
//   };

//   const handleWrapperClick = (e) => {
//     if (toggleRef.current && toggleRef.current.contains(e.target)) return;
//     if (menuRef.current && menuRef.current.contains(e.target)) return;
//     if (menuOpen) setMenuOpen(false);
//   };

//   const handleNavigateToSupport = () => {
//     if (!isAuthenticated) {
//       const authMessage = {
//         type: "bot",
//         text: "Please sign in or register to contact support directly.",
//         options: ["connect to Jaimax Team"],
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setChatHistory((prev) => [...prev, authMessage]);
//     } else {
//       window.open("https://www.jaimax.com/support", "_blank");
//     }
//   };

//   // Language Selection Screen
//   if (showLanguageSelection) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="fixed bottom-0 right-0 w-full h-full md:bottom-[5.75rem] md:right-1 md:w-96 md:h-[550px] lg:w-[350px] md:max-w-md md:max-h-[80vh] md:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden z-[9999]"
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] text-white p-4 md:p-4 font-semibold text-lg md:text-lg flex justify-between items-center shadow-lg">
//           <div className="flex gap-5 items-center">
//             <button
//               onClick={onclose}
//               className="text-white text-2xl md:text-2xl p-2 rounded-full hover:bg-white/20 transition"
//             >
//               <HiArrowLeft />
//             </button>

//             <div className="relative">
//               <img
//                 src="https://thumbs.dreamstime.com/b/friendly-girl-technical-support-person-call-center-manager-office-271091395.jpg"
//                 alt="Logo"
//                 className="w-12 h-12 md:w-10 md:h-10 object-contain rounded-full border-2 border-white/30 shadow-md"
//               />
//             </div>

//             <div className="flex flex-col font-bold leading-tight text-base md:text-base">
//               JAIMAX SUPPORT
//             </div>

//             <div onClick={onclose} className="flex flex-col P-5 font-bold leading-tight text-base md:text-base">
//               <SlArrowDown size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Language Selection Content */}
//         <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-6 bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring" }}
//             className="mb-6 md:mb-6"
//           >
//             <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#085056] to-[#0a6e74] flex items-center justify-center shadow-lg">
//               <span className="text-4xl md:text-3xl">
//                 <TbWorld className="text-white" />
//               </span>
//             </div>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-2xl md:text-xl font-bold text-gray-800 mb-3 md:mb-2 text-center"
//           >
//             Choose Language
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-gray-600 mb-8 md:mb-6 text-center text-base md:text-sm"
//           >
//             Select your preferred language
//           </motion.p>

//           <div className="w-full space-y-4 md:space-y-3 max-w-sm px-4">
//             {[
//               { lang: "English", flag: "🇬🇧", label: "English" },
//               { lang: "Hindi", flag: "🇮🇳", label: "हिंदी" },
//               { lang: "Telugu", flag: "🇮🇳", label: "తెలుగు" }
//             ].map((item, idx) => (
//               <motion.button
//                 key={item.lang}
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 + idx * 0.1 }}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => handleLanguageSelect(item.lang)}
//                 className="w-full bg-white border-2 border-gray-200 hover:border-[#085056] text-gray-800 font-semibold py-4 md:py-3 px-6 md:px-5 rounded-xl md:rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-4 md:gap-3 group"
//               >
//                 <span className="text-3xl md:text-2xl">{item.flag}</span>
//                 <div className="flex-1 text-left">
//                   <div className="text-lg md:text-base font-bold">{item.label}</div>
//                 </div>
//                 <span className="text-[#085056] opacity-0 group-hover:opacity-100 transition-opacity text-xl md:text-lg">
//                   →
//                 </span>
//               </motion.button>
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] py-4 md:py-4 px-4 md:px-4">
//           <p className="text-center text-sm md:text-xs text-white/90 flex items-center justify-center gap-1 select-none font-medium">
//             <span>⚡</span>
//             Powered by JAIMAX AI
//           </p>
//         </div>
//       </motion.div>
//     );
//   }

//   // Loading state
//   if (isChatSupportLoading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="fixed bottom-0 right-0 w-full h-full md:bottom-[5.75rem] md:right-1 md:w-96 md:h-[550px] lg:w-[350px] md:max-w-md md:max-h-[80vh] md:rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl flex items-center justify-center border border-gray-200 z-[9999]"
//       >
//         <div className="text-center px-6 md:px-4">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-20 w-20 md:h-16 md:w-16 border-4 border-gray-200 border-t-[#085056] mx-auto"></div>
//             <img
//               src={logo}
//               alt="Logo"
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 rounded-full"
//             />
//           </div>
//           <p className="mt-8 md:mt-6 text-gray-600 font-medium text-lg md:text-base">
//             Loading support chat...
//           </p>
//           <div className="flex justify-center gap-2 md:gap-1 mt-4 md:mt-3">
//             {[0, 150, 300].map((delay, i) => (
//               <div
//                 key={i}
//                 className="w-3 h-3 md:w-2 md:h-2 bg-[#085056] rounded-full animate-bounce"
//                 style={{ animationDelay: `${delay}ms` }}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   // Main Chat Interface
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: 20, scale: 0.95 }}
//       onClick={handleWrapperClick}
//       className={`fixed bottom-0 right-0 w-full md:bottom-[6rem] md:right-1 md:w-96 lg:w-[350px] md:max-w-md md:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-[9999] ${
//         isMinimized ? "h-16 md:h-16" : "h-full md:h-[550px] md:max-h-[80vh]"
//       }`}
//       role="region"
//       aria-label="Support chat interface"
//     >
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] text-white p-4 md:p-4 font-semibold text-lg md:text-lg flex justify-between items-center shadow-lg">
//         <div className="flex gap-5 items-center">
//           <button
//             onClick={handleReset}
//             className="text-white text-2xl md:text-2xl p-2 rounded-full hover:bg-white/20 transition"
//           >
//             <HiArrowLeft />
//           </button>

//           <div className="relative">
//             <img
//               src="https://thumbs.dreamstime.com/b/friendly-girl-technical-support-person-call-center-manager-office-271091395.jpg"
//               alt="Logo"
//               className="w-12 h-12 md:w-10 md:h-10 object-contain rounded-full border-2 border-white/30 shadow-md"
//             />
//           </div>

//           <div className="flex flex-col font-bold leading-tight text-base md:text-base">
//             JAIMAX SUPPORT
//           </div>

//           <div onClick={onclose} className="flex flex-col font-bold leading-tight text-base md:text-base">
//             <SlArrowDown size={20} />
//           </div>
//         </div>
//       </div>

//       {!isMinimized && (
//         <>
//           {/* Chat Container */}
//           <div
//             ref={chatContainerRef}
//             className={`flex-1 p-4 md:p-4 space-y-4 md:space-y-4 bg-gradient-to-b from-gray-50 to-white font-[Poppins] ${
//               menuOpen ? "pointer-events-none opacity-50 overflow-hidden shadow-none" : "overflow-y-auto"
//             }`}
//             style={{ backgroundSize: "40px 40px" }}
//             aria-live="polite"
//             aria-relevant="additions"
//           >
//             <AnimatePresence mode="popLayout">
//               {chatHistory.map((entry, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   className={`flex ${entry.type === "bot" ? "justify-start" : "justify-end"} items-end gap-2 md:gap-2`}
//                 >
//                   {entry.type === "bot" && (
//                     <img
//                       src={logo}
//                       alt="Bot"
//                       className={`w-10 h-10 md:w-8 md:h-8 rounded-full border-2 border-[#085056] mb-1 ${menuOpen ? "shadow-none" : "shadow-md"}`}
//                     />
//                   )}
//                   <div className={`flex flex-col ${entry.type === "user" ? "items-end" : "items-start"} max-w-[85%] md:max-w-[80%]`}>
//                     <div
//                       className={`px-4 md:px-4 py-3 md:py-3 rounded-2xl md:rounded-2xl text-sm md:text-sm font-poppins ${
//                         entry.type === "bot"
//                           ? "bg-white text-gray-800 rounded-tl-none border border-gray-100 font-msmadi"
//                           : "bg-gradient-to-r from-[#085056] to-[#0a6e74] text-white rounded-tr-none"
//                       } ${menuOpen ? "shadow-none" : "shadow-lg"}`}
//                       aria-label={`${entry.type === "bot" ? "Bot message" : "User message"}: ${entry.text}`}
//                     >
//                       <ReactMarkdown
//                         components={{
//                           a: ({ node, ...props }) => (
//                             <a {...props} className="text-blue-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer" />
//                           ),
//                           p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0 font-poppins">{props.children}</p>,
//                           strong: ({ node, ...props }) => <strong {...props} />,
//                         }}
//                       >
//                         {entry.text}
//                       </ReactMarkdown>

//                       {entry.options?.length > 0 && (
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.3 }}
//                           className="flex flex-col space-y-2 md:space-y-2 mt-3 md:mt-3"
//                         >
//                           {entry.options.map((opt, i) => (
//                             <motion.button
//                               key={i}
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: 0.1 * i }}
//                               whileHover={{ scale: 1.02, x: 5 }}
//                               whileTap={{ scale: 0.98 }}
//                               onClick={() => handleOptionClick(opt)}
//                               className={`bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-[#085056] text-sm md:text-sm py-3 md:py-2.5 px-4 md:px-4 rounded-xl md:rounded-xl transition-all text-left font-poppins font-semibold text-gray-700 hover:text-[#085056] ${menuOpen ? "shadow-none" : "shadow-xl"}`}
//                               aria-label={`Chat option: ${opt}`}
//                             >
//                               <ReactMarkdown>{opt}</ReactMarkdown>
//                             </motion.button>
//                           ))}
//                         </motion.div>
//                       )}
//                     </div>

//                     <span className="text-xs md:text-xs text-gray-400 mt-1 md:mt-1 px-1 select-none font-roboto">
//                       {entry.timestamp}
//                     </span>
//                   </div>

//                   {entry.type === "user" && (
//                     <div className={`w-10 h-10 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#085056] to-[#0a6e74] flex items-center justify-center text-white mb-1 select-none ${menuOpen ? "shadow-none" : "shadow-md"}`}>
//                       <FaUser className="w-5 h-5 md:w-4 md:h-4" />
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* Contact Form */}
//             {showContactForm && (
//               <ContactForm
//                 step={step}
//                 setStep={setStep}
//                 name={name}
//                 setName={setName}
//                 phone={phone}
//                 setPhone={setPhone}
//                 email={email}
//                 setEmail={setEmail}
//                 referralSource={referralSource}
//                 setReferralSource={setReferralSource}
//                 handleLocationRequest={handleLocationRequest}
//                 query={query}
//                 setQuery={setQuery}
//                 handleSubmitQuery={handleSubmitQuery}
//                 status={status}
//                 setshowContactForm={setshowContactForm}
//                 isLocationSubmitting={isLocationSubmitting}
//               />
//             )}

//             {/* Typing Indicator */}
//             <AnimatePresence>
//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="flex justify-start items-end gap-2 md:gap-2"
//                   aria-live="assertive"
//                   aria-label="Bot is typing"
//                 >
//                   <img
//                     src={logo}
//                     alt="Bot"
//                     className={`w-10 h-10 md:w-8 md:h-8 rounded-full border-2 border-[#085056] ${menuOpen ? "shadow-none" : "shadow-md"}`}
//                   />
//                   <div className={`bg-white px-5 md:px-5 py-3 md:py-3 rounded-2xl md:rounded-2xl rounded-tl-none border border-gray-100 ${menuOpen ? "shadow-none" : "shadow-lg"}`}>
//                     <div className="flex space-x-2 md:space-x-2">
//                       {[0, 150, 300].map((delay, i) => (
//                         <div
//                           key={i}
//                           className="w-2.5 h-2.5 md:w-2.5 md:h-2.5 bg-[#085056] rounded-full animate-bounce"
//                           style={{ animationDelay: `${delay}ms` }}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Footer Actions */}
//           <div className="p-4 md:p-4 border-t bg-white shadow-lg flex flex-col space-y-3 md:space-y-3">
//             <div className="flex justify-between items-center text-sm md:text-xs">
//               <span className="text-gray-500">{translations?.needMoreHelp}</span>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleNavigateToSupport}
//                 className="bg-gradient-to-r from-[#085056] to-[#0a6e74] hover:from-[#0a6e74] hover:to-[#085056] text-white px-4 py-2 md:px-4 md:py-2 rounded-lg md:rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-xs"
//                 aria-label="Contact Support"
//               >
//                 {translations?.contactSupport}
//               </motion.button>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] py-3 md:py-2 px-4 md:px-4">
//             <p className="text-center text-sm md:text-xs text-white/90 flex items-center justify-center gap-1 select-none font-medium">
//               <span>⚡</span>
//               {translations?.poweredBy || "Powered by JAIMAX AI"}
//             </p>
//           </div>
//         </>
//       )}

//       {/* Popup Modal */}
//       {showPopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//             backdropFilter: "blur(2px)",
//             padding: "1rem",
//           }}
//           className="md:p-5"
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "24px",
//               borderRadius: "12px",
//               textAlign: "center",
//               minWidth: "280px",
//               maxWidth: "90%",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//             }}
//             className="md:p-6 md:min-w-[280px]"
//           >
//             <p
//               style={{
//                 color: "#075157",
//                 fontWeight: "600",
//                 fontSize: "16px",
//               }}
//               className="md:text-base"
//             >
//               Do you want to end chat?
//             </p>

//             <button
//               style={{
//                 background: "#075157",
//                 color: "white",
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 marginRight: "12px",
//                 marginTop: "16px",
//                 fontSize: "15px",
//               }}
//               className="md:text-[13px] md:px-4.5 md:py-2 md:mr-2.5 md:mt-3"
//               onClick={() => {
//                 setShowPopup(false);
//                 onclose();
//               }}
//             >
//               Yes
//             </button>

//             <button
//               style={{
//                 background: "white",
//                 color: "#075157",
//                 padding: "10px 20px",
//                 border: "2px solid #075157",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 marginTop: "16px",
//                 fontSize: "15px",
//               }}
//               className="md:text-[13px] md:px-4.5 md:py-2 md:mt-3"
//               onClick={() => setShowPopup(false)}
//             >
//               No
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }

// // Contact Form Component
// function ContactForm({
//   step,
//   setStep,
//   name,
//   setName,
//   phone,
//   setPhone,
//   email,
//   setEmail,
//   referralSource,
//   setReferralSource,
//   handleLocationRequest,
//   query,
//   setQuery,
//   handleSubmitQuery,
//   status,
//   setshowContactForm,
//   isLocationSubmitting
// }) {
//   const referralOptions = [
//     { label: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
//     { label: "Facebook", icon: <FaFacebook className="text-blue-600" /> },
//     { label: "Twitter", icon: <FaTwitter className="text-sky-500" /> },
//     { label: "LinkedIn", icon: <FaLinkedin className="text-blue-700" /> },
//     { label: "Friend/Family Referral", icon: <FaUserFriends className="text-green-500" /> },
//     { label: "Other", icon: <FaGlobe className="text-gray-500" /> },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       style={{
//         maxWidth: "100%",
//         margin: "auto",
//         padding: "20px",
//         background: "#085358",
//         borderRadius: "16px",
//         boxShadow: "0 10px 30px rgba(8, 83, 88, 0.3)",
//         color: "#fff",
//       }}
//       className="md:p-[18px] md:max-w-[320px] md:rounded-xl"
//     >
//       {step === 1 && (
//         <div>
//           <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", textAlign: "center" }} className="md:text-lg md:mb-1.5">
//             Step 1: Contact Details
//           </h3>
//           <p style={{ fontSize: "14px", opacity: "0.85", textAlign: "center", marginBottom: "16px" }} className="md:text-xs md:mb-4">
//             We'll use this to contact you
//           </p>
//           <input
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "12px 14px",
//               fontSize: "15px",
//               border: "1.5px solid rgba(255, 255, 255, 0.3)",
//               borderRadius: "10px",
//               background: "rgba(255, 255, 255, 0.1)",
//               color: "#fff",
//               outline: "none",
//               transition: "all 0.3s ease",
//               boxSizing: "border-box",
//             }}
//             className="md:p-[10px_12px] md:text-[13px]"
//           />
//           <input
//             placeholder="+91XXXXXXXXXX"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "12px 14px",
//               marginTop: "12px",
//               fontSize: "15px",
//               border: "1.5px solid rgba(255, 255, 255, 0.3)",
//               borderRadius: "10px",
//               background: "rgba(255, 255, 255, 0.1)",
//               color: "#fff",
//               outline: "none",
//               transition: "all 0.3s ease",
//               boxSizing: "border-box",
//             }}
//             className="md:p-[10px_12px] md:text-[13px] md:mt-2.5"
//           />
//           <input
//             placeholder="your.email@example.com"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "12px 14px",
//               marginTop: "12px",
//               fontSize: "15px",
//               border: "1.5px solid rgba(255, 255, 255, 0.3)",
//               borderRadius: "10px",
//               background: "rgba(255, 255, 255, 0.1)",
//               color: "#fff",
//               outline: "none",
//               transition: "all 0.3s ease",
//               boxSizing: "border-box",
//             }}
//             className="md:p-[10px_12px] md:text-[13px] md:mt-2.5"
//           />
//           <button
//             onClick={() => (name && phone && email ? setStep(2) : alert("Please fill all fields"))}
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginTop: "14px",
//               fontSize: "15px",
//               fontWeight: "600",
//               background: "#fff",
//               color: "#085358",
//               border: "none",
//               borderRadius: "10px",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
//             }}
//             className="md:p-2.5 md:text-[13px] md:mt-3"
//           >
//             Next →
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div>
//           <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", textAlign: "center" }} className="md:text-lg md:mb-1.5">
//             Step 2: How Did You Hear About Us?
//           </h3>
//           <p style={{ fontSize: "14px", opacity: "0.85", textAlign: "center", marginBottom: "16px" }} className="md:text-xs md:mb-4">
//             Select one option
//           </p>

//           <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//             {referralOptions.map((option) => (
//               <button
//                 key={option.label}
//                 onClick={() => {
//                   setReferralSource(option.label);
//                   setStep(3);
//                 }}
//                 style={{
//                   width: "100%",
//                   padding: "12px 16px",
//                   fontSize: "15px",
//                   fontWeight: "500",
//                   background: referralSource === option.label ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
//                   color: "#fff",
//                   border: "1.5px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "10px",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                   textAlign: "left",
//                 }}
//                 className="md:p-[10px_14px] md:text-[13px]"
//               >
//                 <span style={{ fontSize: "20px" }}>{option.icon}</span>
//                 <span>{option.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {step === 3 && (
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               width: "64px",
//               height: "64px",
//               margin: "0 auto 16px",
//               background: "rgba(255, 255, 255, 0.15)",
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "32px",
//             }}
//             className="md:w-[60px] md:h-[60px] md:text-[28px] md:mb-3.5"
//           >
//             <FaLocationCrosshairs />
//           </div>
//           <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }} className="md:text-lg md:mb-2">
//             Step 3: Location Access
//           </h3>
//           <p style={{ fontSize: "14px", opacity: "0.85", marginBottom: "20px", lineHeight: "1.5" }} className="md:text-xs md:mb-4.5">
//             We need your location to show nearby services
//           </p>
//           <button
//             onClick={handleLocationRequest}
//             style={{
//               width: "100%",
//               padding: "12px",
//               fontSize: "15px",
//               fontWeight: "600",
//               background: "#fff",
//               color: "#085358",
//               border: "none",
//               borderRadius: "10px",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
//             }}
//             className="md:p-2.5 md:text-[13px]"
//           >
//             Share Location →
//           </button>
//         </div>
//       )}

//       {step === 4 && (
//         <div>
//           <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", textAlign: "center" }} className="md:text-lg md:mb-1.5">
//             Step 4: Your Query
//           </h3>
//           <p style={{ fontSize: "14px", opacity: "0.85", textAlign: "center", marginBottom: "16px" }} className="md:text-xs md:mb-4">
//             Tell us how we can help you
//           </p>
//           <textarea
//             placeholder="Enter your query..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             style={{
//               width: "100%",
//               minHeight: "100px",
//               padding: "12px 14px",
//               fontSize: "15px",
//               border: "1.5px solid rgba(255, 255, 255, 0.3)",
//               borderRadius: "10px",
//               background: "rgba(255, 255, 255, 0.1)",
//               color: "#fff",
//               outline: "none",
//               resize: "vertical",
//               fontFamily: "inherit",
//               transition: "all 0.3s ease",
//               boxSizing: "border-box",
//             }}
//             className="md:min-h-[90px] md:p-[10px_12px] md:text-[13px]"
//           />
//           <button
//             onClick={handleSubmitQuery}
//             disabled={isLocationSubmitting}
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginTop: "14px",
//               fontSize: "15px",
//               fontWeight: "600",
//               background: isLocationSubmitting ? "#ccc" : "#fff",
//               color: "#085358",
//               border: "none",
//               borderRadius: "10px",
//               cursor: isLocationSubmitting ? "not-allowed" : "pointer",
//               transition: "all 0.3s ease",
//               boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
//             }}
//             className="md:p-2.5 md:text-[13px] md:mt-3"
//           >
//             {isLocationSubmitting ? "Submitting..." : "Submit Query ✓"}
//           </button>
//         </div>
//       )}

//       {step === 5 && (
//         <div style={{ textAlign: "center" }}>
//           <div
//             style={{
//               width: "56px",
//               height: "56px",
//               margin: "0 auto 12px",
//               background: "#fff",
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               animation: "scaleIn 0.5s ease",
//             }}
//             className="md:w-[50px] md:h-[50px] md:mb-3"
//           >
//             <svg width="32" height="32" viewBox="0 0 50 50" style={{ animation: "checkmark 0.6s ease 0.2s both" }} className="md:w-[30px] md:h-[30px]">
//               <circle cx="25" cy="25" r="23" fill="none" stroke="#10b981" strokeWidth="3" />
//               <path
//                 d="M14 25l8 8 14-16"
//                 fill="none"
//                 stroke="#10b981"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeDasharray="50"
//                 strokeDashoffset="50"
//                 style={{ animation: "draw 0.5s ease 0.4s forwards" }}
//               />
//             </svg>
//           </div>

//           <h3 style={{ fontSize: "17px", fontWeight: "600", marginBottom: "8px", color: "#fff" }} className="md:text-base md:mb-1.5">
//             Query Submitted!
//           </h3>

//           <p style={{ fontSize: "13px", opacity: "0.85", marginBottom: "14px", lineHeight: "1.4" }} className="md:text-[11px] md:mb-3.5">
//             We'll get back to you soon.
//           </p>

//           <button
//             onClick={() => {
//               setStep(1);
//               setName("");
//               setPhone("");
//               setEmail("");
//               setReferralSource("");
//               setQuery("");
//               setshowContactForm(false);
//             }}
//             style={{
//               width: "100%",
//               padding: "11px",
//               fontSize: "14px",
//               fontWeight: "600",
//               background: "#fff",
//               color: "#085358",
//               border: "none",
//               borderRadius: "10px",
//               cursor: "pointer",
//               transition: "all 0.3s ease",
//               boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
//             }}
//             className="md:p-2 md:text-[13px]"
//           >
//             Submit Another Query
//           </button>
//         </div>
//       )}

//       {status && step !== 5 && (
//         <p
//           style={{
//             marginTop: "14px",
//             padding: "10px",
//             background: "rgba(255, 255, 255, 0.15)",
//             borderRadius: "8px",
//             textAlign: "center",
//             fontSize: "13px",
//             fontWeight: "500",
//           }}
//           className="md:text-xs md:p-2.5 md:mt-3.5"
//         >
//           {status}
//         </p>
//       )}

//       <style>
//         {`
//           @keyframes scaleIn {
//             from {
//               transform: scale(0);
//               opacity: 0;
//             }
//             to {
//               transform: scale(1);
//               opacity: 1;
//             }
//           }
          
//           @keyframes draw {
//             to {
//               stroke-dashoffset: 0;
//             }
//           }
          
//           @keyframes checkmark {
//             0% {
//               transform: scale(0);
//             }
//             50% {
//               transform: scale(1.1);
//             }
//             100% {
//               transform: scale(1);
//             }
//           }
//         `}
//       </style>
//     </motion.div>
//   );
// }





import ReactMarkdown from "react-markdown";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiX } from "react-icons/fi";
import { FaUser, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaUserFriends, FaGlobe } from "react-icons/fa";
import { HiArrowLeft, HiX } from "react-icons/hi";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { MdOutlineClose } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { useGetChatSupportDataMutation, useSubmitUserLocationMutation } from "./chatApi.js";
import logo from "../../assets/jcoin.webp";


export default function HumanAssistant({ onclose }) {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [translations, setTranslations] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const chatContainerRef = useRef(null);
  const toggleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [referralSource, setReferralSource] = useState("");
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showContactForm, setshowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    accuracy: null,
  });
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  // API Hooks
  const [getChatSupportData, { isLoading: isChatSupportLoading, error: chatSupportError }] = useGetChatSupportDataMutation();
  const [submitUserLocation, { isLoading: isLocationSubmitting }] = useSubmitUserLocationMutation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Check authentication status from cookies
  useEffect(() => {
    const checkAuth = () => {
      try {
        const cookies = document.cookie.split(";");
        const userCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("userData=")
        );

        if (userCookie) {
          const cookieValue = userCookie.split("=")[1];
          const userDataFromCookie = JSON.parse(decodeURIComponent(cookieValue));

          if (userDataFromCookie.data && userDataFromCookie.data.token) {
            setIsAuthenticated(true);
            setUserData(userDataFromCookie.data);
          } else {
            setIsAuthenticated(false);
            setUserData(null);
          }
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  // Fetch chatbot content from API when language is selected
  useEffect(() => {
    if (!currentLanguage) return;

    const fetchChatbotContent = async () => {
      try {
        const response = await getChatSupportData({
          query: currentLanguage,
          isAuthenticated: isAuthenticated,
        }).unwrap();

        const data = response.data;

        const transformedData = {
          categoryName: data.categoryName,
          supportTitle: data.supportTitle,
          reset: data.reset,
          home: data.home,
          support: data.support,
          helpAvailable: data.helpAvailable,
          needMoreHelp: data.needMoreHelp,
          contactSupport: data.contactSupport,
          poweredBy: data.poweredBy,
          chatOptions: data.chatOptions,
        };

        setTranslations(transformedData);
      } catch (error) {
        console.error("Error fetching chatbot content:", error);
        setTranslations(null);
      }
    };

    fetchChatbotContent();
  }, [currentLanguage, isAuthenticated, getChatSupportData]);

  const handleLocationRequest = () => {
    const consent = window.confirm(
      "We need your location to process your query. Click OK to allow location access."
    );
    if (!consent) return;

    if (!navigator.geolocation) {
      setStatus("Geolocation not supported by browser.");
      return;
    }

    setStatus("Requesting location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setLocation({ lat: latitude, lon: longitude, accuracy });
        setStatus("Location captured. Proceed to enter your query.");
        setStep(4);
      },
      (err) => setStatus("Location denied or unavailable: " + err.message),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  // Submit query to backend using API slice
  const handleSubmitQuery = async () => {
    if (!query) {
      alert("Please enter your query.");
      return;
    }

    const payload = {
      phone,
      latitude: location.lat,
      longitude: location.lon,
      query,
      email,
      referralSource,
      name,
      consentText: "User agreed to share location for query submission",
    };

    try {
      const response = await submitUserLocation(payload).unwrap();
      
      setAddress(response.address || "");
      setStatus("Query submitted successfully! Address: " + response.address);
      setStep(5);

      setTimeout(() => {
        // Reset all form states
        setshowContactForm(false);
        setStep(1);
        setName("");
        setPhone("");
        setEmail("");
        setReferralSource("");
        setQuery("");
        setStatus("");
        setLocation({ lat: null, lon: null, accuracy: null });
        setAddress("");

        // Add success message to chat history
        const successMessage = {
          type: "bot",
          text: ` Query Submitted Successfully!\n\nThank you ${name}! We have received your query and will get back to you soon at ${email} or ${phone}.\n\nYour query: "${query}"\n\nOur team will contact you within 2-3 hours.`,
          options: [],
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatHistory((prev) => [...prev, successMessage]);
      }, 2000);
    } catch (err) {
      setStatus("Error: " + (err.error || err.message || "Failed to submit query"));
      
      // Add error message to chat history
      setTimeout(() => {
        setshowContactForm(false);
        const errorMessage = {
          type: "bot",
          text: `Submission Failed\n\nWe encountered an error while submitting your query. Please try again or contact us directly.\n\nError: ${err.error || err.message || "Unknown error"}`,
          options: ["connect to Jaimax Team"],
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatHistory((prev) => [...prev, errorMessage]);
      }, 2000);
    }
  };

  // Initialize chat with loaded data
  useEffect(() => {
    if (translations && translations.chatOptions) {
      const welcomeMessage =
        isAuthenticated && userData
          ? `Hello ${userData.name}! Welcome to JAIMAX Support. How can we help you today?`
          : translations.chatOptions.initial.message;

      const initialMessage = {
        type: "bot",
        text: welcomeMessage,
        options: translations.chatOptions.initial.options,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatHistory([initialMessage]);
    }
  }, [translations, isAuthenticated, userData]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, isTyping]);

  // Typing indicator simulation
  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language);
    setShowLanguageSelection(false);
  };

  const handleOptionClick = (option) => {
    if (!translations) return;

    // Handle special authentication options
    if (option === "Sign In" || option === "Go to Login") {
      window.location.href = "/login/";
      return;
    }

    if (option === "Register" || option === "Create Account") {
      window.location.href = "/register/";
      return;
    }

    if (option === "connect to Jaimax Team") {
      // Reset form states when opening contact form
      setStep(1);
      setName("");
      setPhone("");
      setEmail("");
      setReferralSource("");
      setQuery("");
      setStatus("");
      setLocation({ lat: null, lon: null, accuracy: null });
      setAddress("");
      setshowContactForm(true);
    }

    const userMessage = {
      type: "user",
      text: option,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setShowQuickActions(false);
    setMenuOpen(false);

    const currentChatOptions = translations.chatOptions;

    simulateTyping(() => {
      const nextBot = currentChatOptions[option]
        ? {
            type: "bot",
            text: currentChatOptions[option].message,
            options: currentChatOptions[option].options,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        : option === "connect to Jaimax Team"
        ? null
        : {
            type: "bot",
            text: "Thank you for your input. Our support team will reach out if needed.",
            options: [],
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

      if (nextBot) {
        setChatHistory((prev) => [...prev, nextBot]);
      }
    }, 800);
  };

  const handleLanguage = async (data) => {
    setCurrentLanguage(data);
    setShowLanguageSelection(false);
    setChatHistory([]);

    try {
      await getChatSupportData({
        query: data,
        isAuthenticated: isAuthenticated,
      }).unwrap();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleReset = () => {
    setShowLanguageSelection(true);
    setshowContactForm(false);
    setCurrentLanguage(null);
    setChatHistory([]);
    setShowQuickActions(true);
    setMenuOpen(false);
    setInputMessage("");
    setTranslations(null);
    // Reset form states
    setStep(1);
    setName("");
    setPhone("");
    setEmail("");
    setReferralSource("");
    setQuery("");
    setStatus("");
    setLocation({ lat: null, lon: null, accuracy: null });
    setAddress("");
  };

  const closeChat = () => {
    setMenuOpen(false);
  };

  const handleWrapperClick = (e) => {
    if (toggleRef.current && toggleRef.current.contains(e.target)) return;
    if (menuRef.current && menuRef.current.contains(e.target)) return;
    if (menuOpen) setMenuOpen(false);
  };

  const handleNavigateToSupport = () => {
    if (!isAuthenticated) {
      const authMessage = {
        type: "bot",
        text: "Please sign in or register to contact support directly.",
        options: ["connect to Jaimax Team"],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatHistory((prev) => [...prev, authMessage]);
    } else {
      window.open("https://www.jaimax.com/support", "_blank");
    }
  };

  // Language Selection Screen
  if (showLanguageSelection) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-0 right-0 w-full h-full md:bottom-[5.75rem] md:right-1 md:w-96 md:h-[550px] lg:w-[350px] md:max-w-md md:max-h-[80vh] md:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden z-[9999]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] text-white p-4 md:p-4 font-semibold text-lg md:text-lg flex justify-between items-center shadow-lg">
          <div className="flex gap-5 items-center">
            <button
              onClick={onclose}
              className="text-white text-2xl md:text-2xl p-2 rounded-full hover:bg-white/20 transition"
            >
              <HiArrowLeft />
            </button>

            <div className="relative">
              <img
                src="https://thumbs.dreamstime.com/b/friendly-girl-technical-support-person-call-center-manager-office-271091395.jpg"
                alt="Logo"
                className="w-12 h-12 md:w-10 md:h-10 object-contain rounded-full border-2 border-white/30 shadow-md"
              />
            </div>

            <div className="flex flex-col font-bold leading-tight text-base md:text-base">
              JAIMAX SUPPORT
            </div>

            <div onClick={onclose} className="flex flex-col P-5 font-bold leading-tight text-base md:text-base">
              <SlArrowDown size={20} />
            </div>
          </div>
        </div>

        {/* Language Selection Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-6 bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6 md:mb-6"
          >
            <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#085056] to-[#0a6e74] flex items-center justify-center shadow-lg">
              <span className="text-4xl md:text-3xl">
                <TbWorld className="text-white" />
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-xl font-bold text-gray-800 mb-3 md:mb-2 text-center"
          >
            Choose Language
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 md:mb-6 text-center text-base md:text-sm"
          >
            Select your preferred language
          </motion.p>

          <div className="w-full space-y-4 md:space-y-3 max-w-sm px-4">
            {[
              { lang: "English", flag: "🇬🇧", label: "English" },
              { lang: "Hindi", flag: "🇮🇳", label: "हिंदी" },
              { lang: "Telugu", flag: "🇮🇳", label: "తెలుగు" }
            ].map((item, idx) => (
              <motion.button
                key={item.lang}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLanguageSelect(item.lang)}
                className="w-full bg-white border-2 border-gray-200 hover:border-[#085056] text-gray-800 font-semibold py-4 md:py-3 px-6 md:px-5 rounded-xl md:rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-4 md:gap-3 group"
              >
                <span className="text-3xl md:text-2xl">{item.flag}</span>
                <div className="flex-1 text-left">
                  <div className="text-lg md:text-base font-bold">{item.label}</div>
                </div>
                <span className="text-[#085056] opacity-0 group-hover:opacity-100 transition-opacity text-xl md:text-lg">
                  →
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] py-4 md:py-4 px-4 md:px-4">
          <p className="text-center text-sm md:text-xs text-white/90 flex items-center justify-center gap-1 select-none font-medium">
            <span>⚡</span>
            Powered by JAIMAX AI
          </p>
        </div>
      </motion.div>
    );
  }

  // Loading state
  if (isChatSupportLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-0 right-0 w-full h-full md:bottom-[5.75rem] md:right-1 md:w-96 md:h-[550px] lg:w-[350px] md:max-w-md md:max-h-[80vh] md:rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl flex items-center justify-center border border-gray-200 z-[9999]"
      >
        <div className="text-center px-6 md:px-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 md:h-16 md:w-16 border-4 border-gray-200 border-t-[#085056] mx-auto"></div>
            <img
              src={logo}
              alt="Logo"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-8 md:h-8 rounded-full"
            />
          </div>
          <p className="mt-8 md:mt-6 text-gray-600 font-medium text-lg md:text-base">
            Loading support chat...
          </p>
          <div className="flex justify-center gap-2 md:gap-1 mt-4 md:mt-3">
            {[0, 150, 300].map((delay, i) => (
              <div
                key={i}
                className="w-3 h-3 md:w-2 md:h-2 bg-[#085056] rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Main Chat Interface
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      onClick={handleWrapperClick}
      className={`fixed bottom-0 right-0 w-full md:bottom-[6rem] md:right-1 md:w-96 lg:w-[350px] md:max-w-md md:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-[9999] ${
        isMinimized ? "h-16 md:h-16" : "h-full md:h-[550px] md:max-h-[80vh]"
      }`}
      role="region"
      aria-label="Support chat interface"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] text-white p-4 md:p-4 font-semibold text-lg md:text-lg flex justify-between items-center shadow-lg">
        <div className="flex gap-5 items-center">
          <button
            onClick={handleReset}
            className="text-white text-2xl md:text-2xl p-2 rounded-full hover:bg-white/20 transition"
          >
            <HiArrowLeft />
          </button>

          <div className="relative">
            <img
              src="https://thumbs.dreamstime.com/b/friendly-girl-technical-support-person-call-center-manager-office-271091395.jpg"
              alt="Logo"
              className="w-12 h-12 md:w-10 md:h-10 object-contain rounded-full border-2 border-white/30 shadow-md"
            />
          </div>

          <div className="flex flex-col font-bold leading-tight text-base md:text-base">
            JAIMAX SUPPORT
          </div>

          <div onClick={onclose} className="flex flex-col font-bold leading-tight text-base md:text-base">
            <SlArrowDown size={20} />
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Container */}
          <div
            ref={chatContainerRef}
            className={`flex-1 p-4 md:p-4 space-y-4 md:space-y-4 bg-gradient-to-b from-gray-50 to-white font-[Poppins] ${
              menuOpen ? "pointer-events-none opacity-50 overflow-hidden shadow-none" : "overflow-y-auto"
            }`}
            style={{ backgroundSize: "40px 40px" }}
            aria-live="polite"
            aria-relevant="additions"
          >
            <AnimatePresence mode="popLayout">
              {chatHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${entry.type === "bot" ? "justify-start" : "justify-end"} items-end gap-2 md:gap-2`}
                >
                  {entry.type === "bot" && (
                    <img
                      src={logo}
                      alt="Bot"
                      className={`w-10 h-10 md:w-8 md:h-8 rounded-full border-2 border-[#085056] mb-1 ${menuOpen ? "shadow-none" : "shadow-md"}`}
                    />
                  )}
                  <div className={`flex flex-col ${entry.type === "user" ? "items-end" : "items-start"} max-w-[85%] md:max-w-[80%]`}>
                    <div
                      className={`px-4 md:px-4 py-3 md:py-3 rounded-2xl md:rounded-2xl text-sm md:text-sm font-poppins ${
                        entry.type === "bot"
                          ? "bg-white text-gray-800 rounded-tl-none border border-gray-100 font-msmadi"
                          : "bg-gradient-to-r from-[#085056] to-[#0a6e74] text-white rounded-tr-none"
                      } ${menuOpen ? "shadow-none" : "shadow-lg"}`}
                      aria-label={`${entry.type === "bot" ? "Bot message" : "User message"}: ${entry.text}`}
                    >
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer" />
                          ),
                          p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0 font-poppins">{props.children}</p>,
                          strong: ({ node, ...props }) => <strong {...props} />,
                        }}
                      >
                        {entry.text}
                      </ReactMarkdown>

                      {entry.options?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-col space-y-2 md:space-y-2 mt-3 md:mt-3"
                        >
                          {entry.options.map((opt, i) => (
                            <motion.button
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * i }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleOptionClick(opt)}
                              className={`bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-[#085056] text-sm md:text-sm py-3 md:py-2.5 px-4 md:px-4 rounded-xl md:rounded-xl transition-all text-left font-poppins font-semibold text-gray-700 hover:text-[#085056] ${menuOpen ? "shadow-none" : "shadow-xl"}`}
                              aria-label={`Chat option: ${opt}`}
                            >
                              <ReactMarkdown>{opt}</ReactMarkdown>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <span className="text-xs md:text-xs text-gray-400 mt-1 md:mt-1 px-1 select-none font-roboto">
                      {entry.timestamp}
                    </span>
                  </div>

                  {entry.type === "user" && (
                    <div className={`w-10 h-10 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#085056] to-[#0a6e74] flex items-center justify-center text-white mb-1 select-none ${menuOpen ? "shadow-none" : "shadow-md"}`}>
                      <FaUser className="w-5 h-5 md:w-4 md:h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Contact Form */}
            {showContactForm && (
              <ContactForm
                step={step}
                setStep={setStep}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                referralSource={referralSource}
                setReferralSource={setReferralSource}
                handleLocationRequest={handleLocationRequest}
                query={query}
                setQuery={setQuery}
                handleSubmitQuery={handleSubmitQuery}
                status={status}
                setshowContactForm={setshowContactForm}
                isLocationSubmitting={isLocationSubmitting}
              />
            )}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start items-end gap-2 md:gap-2"
                  aria-live="assertive"
                  aria-label="Bot is typing"
                >
                  <img
                    src={logo}
                    alt="Bot"
                    className={`w-10 h-10 md:w-8 md:h-8 rounded-full border-2 border-[#085056] ${menuOpen ? "shadow-none" : "shadow-md"}`}
                  />
                  <div className={`bg-white px-5 md:px-5 py-3 md:py-3 rounded-2xl md:rounded-2xl rounded-tl-none border border-gray-100 ${menuOpen ? "shadow-none" : "shadow-lg"}`}>
                    <div className="flex space-x-2 md:space-x-2">
                      {[0, 150, 300].map((delay, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 md:w-2.5 md:h-2.5 bg-[#085056] rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="p-4 md:p-4 border-t bg-white shadow-lg flex flex-col space-y-3 md:space-y-3">
            <div className="flex justify-between items-center text-sm md:text-xs">
              <span className="text-gray-500">{translations?.needMoreHelp}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNavigateToSupport}
                className="bg-gradient-to-r from-[#085056] to-[#0a6e74] hover:from-[#0a6e74] hover:to-[#085056] text-white px-4 py-2 md:px-4 md:py-2 rounded-lg md:rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-xs"
                aria-label="Contact Support"
              >
                {translations?.contactSupport}
              </motion.button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-[#085056] to-[#0a6e74] py-3 md:py-2 px-4 md:px-4">
            <p className="text-center text-sm md:text-xs text-white/90 flex items-center justify-center gap-1 select-none font-medium">
              <span>⚡</span>
              {translations?.poweredBy || "Powered by JAIMAX AI"}
            </p>
          </div>
        </>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backdropFilter: "blur(2px)",
            padding: "1rem",
          }}
          className="md:p-5"
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              textAlign: "center",
              minWidth: "280px",
              maxWidth: "90%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            className="md:p-6 md:min-w-[280px]"
          >
            <p
              style={{
                color: "#075157",
                fontWeight: "600",
                fontSize: "16px",
              }}
              className="md:text-base"
            >
              Do you want to end chat?
            </p>

            <button
              style={{
                background: "#075157",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginRight: "12px",
                marginTop: "16px",
                fontSize: "15px",
              }}
              className="md:text-[13px] md:px-4.5 md:py-2 md:mr-2.5 md:mt-3"
              onClick={() => {
                setShowPopup(false);
                onclose();
              }}
            >
              Yes
            </button>

            <button
              style={{
                background: "white",
                color: "#075157",
                padding: "10px 20px",
                border: "2px solid #075157",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "16px",
                fontSize: "15px",
              }}
              className="md:text-[13px] md:px-4.5 md:py-2 md:mt-3"
              onClick={() => setShowPopup(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Contact Form Component
function ContactForm({
  step,
  setStep,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  referralSource,
  setReferralSource,
  handleLocationRequest,
  query,
  setQuery,
  handleSubmitQuery,
  status,
  setshowContactForm,
  isLocationSubmitting
}) {
  const referralOptions = [
    { label: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
    { label: "Facebook", icon: <FaFacebook className="text-blue-600" /> },
    { label: "Twitter", icon: <FaTwitter className="text-sky-500" /> },
    { label: "LinkedIn", icon: <FaLinkedin className="text-blue-700" /> },
    { label: "Friend/Family Referral", icon: <FaUserFriends className="text-green-500" /> },
    { label: "Other", icon: <FaGlobe className="text-gray-500" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        maxWidth: "100%",
        margin: "auto",
        padding: "20px",
        background: "#085358",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(8, 83, 88, 0.3)",
        color: "#fff",
      }}
      className="md:p-[18px] md:max-w-[320px] md:rounded-xl"
    >
      {step === 1 && (
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", textAlign: "center" }} className="md:text-lg md:mb-1.5">
            Step 1: Contact Details
          </h3>
          <p style={{ fontSize: "14px", opacity: "0.85", textAlign: "center", marginBottom: "16px" }} className="md:text-xs md:mb-4">
            We'll use this to contact you
          </p>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: "15px",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            className="md:p-[10px_12px] md:text-[13px]"
          />
          <input
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              marginTop: "12px",
              fontSize: "15px",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            className="md:p-[10px_12px] md:text-[13px] md:mt-2.5"
          />
          <input
            placeholder="your.email@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              marginTop: "12px",
              fontSize: "15px",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            className="md:p-[10px_12px] md:text-[13px] md:mt-2.5"
          />
          <button
            onClick={() => (name && phone && email ? setStep(2) : alert("Please fill all fields"))}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "14px",
              fontSize: "15px",
              fontWeight: "600",
              background: "#fff",
              color: "#085358",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
            }}
            className="md:p-2.5 md:text-[13px] md:mt-3"
          >
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", textAlign: "center" }} className="md:text-lg md:mb-1.5">
            Step 2: How Did You Hear About Us?
          </h3>
          <p style={{ fontSize: "14px", opacity: "0.85", textAlign: "center", marginBottom: "16px" }} className="md:text-xs md:mb-4">
            Select one option
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {referralOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => {
                  setReferralSource(option.label);
                  setStep(3);
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "15px",
                  fontWeight: "500",
                  background: referralSource === option.label ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  border: "1.5px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textAlign: "left",
                }}
                className="md:p-[10px_14px] md:text-[13px]"
              >
                <span style={{ fontSize: "20px" }}>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
            className="md:w-[60px] md:h-[60px] md:text-[28px] md:mb-3.5"
          >
            <FaLocationCrosshairs />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }} className="md:text-lg md:mb-2">
            Step 3: Location Access
          </h3>
          <p style={{ fontSize: "14px", opacity: "0.85", marginBottom: "20px", lineHeight: "1.5" }} className="md:text-xs md:mb-4.5">
            We need your location to show nearby services
          </p>
          <button
            onClick={handleLocationRequest}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
              background: "#fff",
              color: "#085358",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
            }}
            className="md:p-2.5 md:text-[13px]"
          >
            Share Location →
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", textAlign: "center" }} className="md:text-lg md:mb-1.5">
            Step 4: Your Query
          </h3>
          <p style={{ fontSize: "14px", opacity: "0.85", textAlign: "center", marginBottom: "16px" }} className="md:text-xs md:mb-4">
            Tell us how we can help you
          </p>
          <textarea
            placeholder="Enter your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px 14px",
              fontSize: "15px",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
              boxSizing: "border-box",
            }}
            className="md:min-h-[90px] md:p-[10px_12px] md:text-[13px]"
          />
          <button
            onClick={handleSubmitQuery}
            disabled={isLocationSubmitting}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "14px",
              fontSize: "15px",
              fontWeight: "600",
              background: isLocationSubmitting ? "#ccc" : "#fff",
              color: "#085358",
              border: "none",
              borderRadius: "10px",
              cursor: isLocationSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
            }}
            className="md:p-2.5 md:text-[13px] md:mt-3"
          >
            {isLocationSubmitting ? "Submitting..." : "Submit Query ✓"}
          </button>
        </div>
      )}

      {step === 5 && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 12px",
              background: "#fff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "scaleIn 0.5s ease",
            }}
            className="md:w-[50px] md:h-[50px] md:mb-3"
          >
            <svg width="32" height="32" viewBox="0 0 50 50" style={{ animation: "checkmark 0.6s ease 0.2s both" }} className="md:w-[30px] md:h-[30px]">
              <circle cx="25" cy="25" r="23" fill="none" stroke="#10b981" strokeWidth="3" />
              <path
                d="M14 25l8 8 14-16"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="50"
                strokeDashoffset="50"
                style={{ animation: "draw 0.5s ease 0.4s forwards" }}
              />
            </svg>
          </div>

          <h3 style={{ fontSize: "17px", fontWeight: "600", marginBottom: "8px", color: "#fff" }} className="md:text-base md:mb-1.5">
            Query Submitted!
          </h3>

          <p style={{ fontSize: "13px", opacity: "0.85", marginBottom: "14px", lineHeight: "1.4" }} className="md:text-[11px] md:mb-3.5">
            We'll get back to you soon.
          </p>

          <button
            onClick={() => {
              setStep(1);
              setName("");
              setPhone("");
              setEmail("");
              setReferralSource("");
              setQuery("");
              setshowContactForm(false);
            }}
            style={{
              width: "100%",
              padding: "11px",
              fontSize: "14px",
              fontWeight: "600",
              background: "#fff",
              color: "#085358",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
            }}
            className="md:p-2 md:text-[13px]"
          >
            Submit Another Query
          </button>
        </div>
      )}

      {status && step !== 5 && (
        <p
          style={{
            marginTop: "14px",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "500",
          }}
          className="md:text-xs md:p-2.5 md:mt-3.5"
        >
          {status}
        </p>
      )}

      <style>
        {`
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes checkmark {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </motion.div>
  );
}


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import {
//   Trash2,
//   XCircle,
//   Mic,
//   Paperclip,
//   Smile,
//   Send,
//   MapPin,
//   Loader2,
//   MicOff,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import JaimaxLogo from "../../assets/Images/logo.svg";
// import logo from "../../assets/jcoin.png";
// import SupportBot from "./humanassistant";
// import HumantAssistant from "./humanassistant";
// import { useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";

// const ChatAssistant = ({ onClose }) => {
//   const [input, setInput] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [mode, setMode] = useState(null);
//   const [data, setData] = useState();
//   const [screenSize, setScreenSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   const navigate = useNavigate();
//   const [messages, setMessages] = useState(() => {
//     const saved = localStorage.getItem("chat_messages");
//     return saved
//       ? JSON.parse(saved)
//       : [
//           {
//             id: 1,
//             from: "bot",
//             text: "Hi 👋 How can I help you?",
//             time: new Date().toLocaleTimeString(),
//           },
//         ];
//   });

//   const [loading, setLoading] = useState(false);
//   const [typingText, setTypingText] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userName, setUsername] = useState("");
//   const menuRef = useRef(null);
//   const toggleRef = useRef(null);
//   const chatEndRef = useRef(null);

//   // Real-time screen size tracking
//   useEffect(() => {
//     const handleResize = () => {
//       setScreenSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Dynamic styling based on screen size
//   const getResponsiveStyles = () => {
//     const width = screenSize.width;
//     const height = screenSize.height;

//     // Full screen for devices below 375px
//     if (width < 375) {
//       return {
//         containerClass:
//           "fixed inset-0 w-screen h-screen rounded-none overflow-hidden",
//         headerHeight: height < 600 ? "h-[180px]" : "h-[220px]",
//         logoWidth: "w-28",
//         titleSize: "text-sm",
//         subtitleSize: "text-[9px]",
//         cardPadding: "p-2",
//         iconSize: "w-3 h-3",
//         textSize: "text-xs",
//         buttonPadding: "py-1.5",
//         headerPadding: "p-2",
//         chatPadding: "p-1",
//         messageTextSize: "text-[8px]",
//         inputTextSize: "text-[9px]",
//         inputPadding: "px-1 py-1",
//         buttonSize: "w-4 h-4",
//         menuWidth: "w-32",
//         menuTextSize: "text-[8px]",
//         menuIconSize: "w-2 h-2",
//         menuPadding: "px-1.5 py-1",
//         maxMessageWidth: "max-w-[92%]",
//         shadow: "shadow-none",
//         border: "border-0",
//         fullScreen: true,
//         chatHeight: `${height - 260}px`, // Adjust chat area based on screen height
//         isExtraSmall: true,
//       };
//     } else if (width <= 425) {
//       return {
//         containerClass: "fixed inset-0 w-screen h-screen rounded-none",
//         headerHeight: "h-[240px]",
//         logoWidth: "w-36",
//         titleSize: "text-base",
//         subtitleSize: "text-[10px]",
//         cardPadding: "p-2",
//         iconSize: "w-3 h-3",
//         textSize: "text-xs",
//         buttonPadding: "py-2",
//         headerPadding: "p-2",
//         chatPadding: "p-1",
//         messageTextSize: "text-[9px]",
//         inputTextSize: "text-[10px]",
//         inputPadding: "px-1 py-1",
//         buttonSize: "w-5 h-5",
//         menuWidth: "w-36",
//         menuTextSize: "text-[9px]",
//         menuIconSize: "w-2 h-2",
//         menuPadding: "px-2 py-1.5",
//         maxMessageWidth: "max-w-[90%]",
//         shadow: "shadow-none",
//         border: "border-0",
//         fullScreen: true,
//       };
//     } else if (width <= 540) {
//       return {
//         containerClass: "fixed bottom-4 right-4 w-80 h-[480px] rounded-xl",
//         headerHeight: "h-[280px]",
//         logoWidth: "w-44",
//         titleSize: "text-xl",
//         subtitleSize: "text-xs",
//         cardPadding: "p-1",
//         iconSize: "w-16 h-16",
//         textSize: "text-sm",
//         buttonPadding: "py-3",
//         headerPadding: "p-3",
//         chatPadding: "p-2",
//         messageTextSize: "text-xs",
//         inputTextSize: "text-xs",
//         inputPadding: "px-2 py-2",
//         buttonSize: "w-7 h-7",
//         menuWidth: "w-44",
//         menuTextSize: "text-xs",
//         menuIconSize: "w-3 h-3",
//         menuPadding: "px-3 py-2",
//         maxMessageWidth: "max-w-[85%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else if (width <= 650) {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-84 h-[520px] rounded-xl",
//         headerHeight: "h-[300px]",
//         logoWidth: "w-48",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-2",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-sm",
//         inputPadding: "px-3 py-3",
//         buttonSize: "w-8 h-8",
//         menuWidth: "w-48",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[80%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else if (width <= 725) {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-88 h-[560px] rounded-xl",
//         headerHeight: "h-[300px]",
//         logoWidth: "w-52",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-3",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-base",
//         inputPadding: "px-3 py-3",
//         buttonSize: "w-9 h-9",
//         menuWidth: "w-52",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[75%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else if (width <= 1080) {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-96 h-[600px] rounded-xl",
//         headerHeight: "h-[250px]",
//         logoWidth: "w-64",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-3",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-base",
//         inputPadding: "px-3 py-3",
//         buttonSize: "w-10 h-10",
//         menuWidth: "w-56",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[75%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-96 h-[600px] rounded-xl",
//         headerHeight: "h-[250px]",
//         logoWidth: "w-64",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-3",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-base",
//         inputPadding: "px-4 py-3",
//         buttonSize: "w-10 h-10",
//         menuWidth: "w-56",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[75%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     }
//   };

//   const styles = getResponsiveStyles();

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, typingText]);

//   useEffect(() => {
//     localStorage.setItem("chat_messages", JSON.stringify(messages));
//   }, [messages]);

//   const sendMessage = async (text) => {
//     if (!text.trim()) return;

//     const userMsg = {
//       id: Date.now(),
//       from: "user",
//       text,
//       time: new Date().toLocaleTimeString(),
//     };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);
//     setTypingText("");

//     try {
//       const res = await axios.post("http://localhost:3000/admin/aiDocument/ask", {
//         query: text,

//       }
//       ,
//       {
//         headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Njc2ZmUwNGQ1MWUzMDNlYThiNGYxOSIsImV4cCI6MTc1NDk4MzQwMywiaWF0IjoxNzU0OTgyODAzfQ.Mxc1Z1HbuHAhmVfZtJwgFvklVjosJmnU4mGObeIZLQU`,
//             // Add other headers if needed
//           },
//       }
//     );

//       //  const query_res = await axios.post("http://localhost:3000/admin/aiDocument/insert-query", {
//       //   query: text,
//       // });

//       // console.log( query_res  , " query_res ")
//       const fullText =
//         res.data.answer || "🤖 Sorry, I couldn't find an answer.";

//       let i = 0;
//       const typingInterval = setInterval(() => {
//         setTypingText(fullText.slice(0, i + 1));
//         i++;
//         if (i === fullText.length) {
//           clearInterval(typingInterval);
//           setTypingText("");
//           setMessages((prev) => [
//             ...prev,
//             {
//               id: Date.now() + 1,
//               from: "bot",
//               text: fullText,
//               time: new Date().toLocaleTimeString(),
//             },
//           ]);
//           setLoading(false);
//         }
//       }, 20);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           from: "bot",
//           text: "⚠️ We're facing a technical issue. Please try again shortly.",
//           time: new Date().toLocaleTimeString(),
//         },
//       ]);
//       setLoading(false);
//     }

//     try {
//       const query_res = await axios.post(
//         "http://localhost:3000/admin/aiDocument/insert-query",
//         {
//           query: text,
//         },
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Njc2ZmUwNGQ1MWUzMDNlYThiNGYxOSIsImV4cCI6MTc1NDk4MzQwMywiaWF0IjoxNzU0OTgyODAzfQ.Mxc1Z1HbuHAhmVfZtJwgFvklVjosJmnU4mGObeIZLQU`,
//             // Add other headers if needed
//           },
//         }
//       );

//       console.log("Query submitted successfully:", query_res.data);
//       return query_res.data; // return response if needed
//     } catch (error) {
//       console.error("Error submitting user query:", error);
//       // Optionally rethrow or handle error as needed
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !loading) {
//       sendMessage(input);
//     }
//   };

//   const handleAi = () => {
//     navigate("/");
//   };

//   const handleWrapperClick = (e) => {
//     if (toggleRef.current && toggleRef.current.contains(e.target)) return;
//     if (menuRef.current && menuRef.current.contains(e.target)) return;
//     if (menuOpen) {
//       setMenuOpen(false);
//     }
//   };

//   const handleVoiceInput = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Speech recognition not supported in this browser");
//       return;
//     }
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event) => {
//       const voiceText = event.results[0][0].transcript;
//       sendMessage(voiceText);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech error", event.error);
//     };

//     recognition.start();
//   };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);
//   const handleCloseConversation = () => {
//     setMenuOpen(false);
//     onClose();
//   };
//   const handleClearChat = () => {
//     const welcome = {
//       id: 1,
//       from: "bot",
//       text: "Hi 👋 How can I help you?",
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };
//     setMessages([welcome]);
//     localStorage.removeItem("chat_messages");
//   };

//   const handleDeleteConversation = () => {
//     setMenuOpen(false);
//     handleClearChat();
//   };

//   // Mode Selector UI
//   if (!mode) {
//     return (
//       // <div className={`${styles.containerClass} ${styles.shadow} ${styles.border} overflow-hidden bg-white z-50 ${styles.fullScreen ? 'min-h-screen' : ''}`}>
//       <div
//         className={`${styles.containerClass} ${styles.shadow} ${
//           styles.border
//         } overflow-hidden bg-white z-50 ${styles.full} ${
//           styles.Screen ? "min-h-screen" : "h-auto"
//         }`}
//       >
//         {/* Header */}
//         <div
//           className={`bg-[#085056] ${styles.headerHeight} flex flex-col items-center justify-center text-white relative`}
//         >
//           {/* Close button */}

//           <div
//             className={`${styles.logoWidth} rounded-full flex items-center justify-center`}
//           >
//             <img
//               src={JaimaxLogo}
//               alt="Logo"
//               className="object-contain max-w-full h-auto"
//             />
//           </div>
//           <h1 className={`${styles.titleSize} font-bold mt-6`}>Jaimax</h1>
//           <p
//             className={`text-green-100 ${styles.subtitleSize} mt-1 px-4 text-center`}
//           >
//             We are here to help you!
//           </p>
//         </div>

//            {/* <div className="absolute top-4 right-4">
//             <div className="w-8 h-8 bg-opacity-20 rounded flex items-center justify-center">
//               <button
//                 onClick={onClose}
//                 className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors duration-200"
//                 title="Close"
//               >
//                 <IoCloseCircle size={28} />
//               </button>
//             </div>
//           </div> */}

// <div className="absolute top-4 right-4">
//   <button
//     onClick={onClose}
//     title="Back"
//     className="
//       flex items-center space-x-2
//       bg-[#085056] bg-opacity-90 hover:bg-opacity-100
//       text-white font-semibold
//       rounded-full
//       px-4 py-2
//       shadow-lg
//       transition
//       duration-300
//       ease-in-out
//       focus:outline-none focus:ring-2 focus:ring-[#0bc5ea]
//       select-none
//       cursor-pointer
//     "
//   >
//     <IoArrowBack size={22} />
//     <span className="text-base">Back</span>
//   </button>
// </div>

// {/*
// <div className="absolute top-4 right-4">
//   <div className="w-auto bg-opacity-20 rounded flex items-center justify-center space-x-1 px-2 py-1 cursor-pointer">
//     <button
//       onClick={onClose}
//       className="flex items-center text-white hover:text-red-500 transition-colors duration-200"
//       title="Back"
//     >
//       <IoArrowBack size={24} />
//       <span className="ml-1 text-sm font-semibold">Back</span>
//     </button>
//   </div>
// </div> */}

//         {/* Chat cards */}
//         <div
//           className={`relative -mt-6 ${
//             styles.isExtraSmall
//               ? "mx-1 px-1"
//               : styles.fullScreen
//               ? "mx-2 px-1"
//               : "mx-4 px-2"
//           }`}
//         >
//           <div
//             className={`flex items-center justify-between border border-green-800  bg-white rounded-xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-200 `}
//             onClick={() => setMode("chat")}
//           >
//             <div className="flex items-center space-x-3">
//               <div
//                 className={`bg-green-100 ${styles.cardPadding} rounded-full`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`${styles.iconSize} text-green-600`}
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <rect x="4" y="7" width="16" height="10" rx="2" ry="2" />
//                   <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
//                   <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
//                   <path d="M9 17v2h6v-2" />
//                   <path d="M2 11h1" />
//                   <path d="M21 11h1" />
//                 </svg>
//               </div>
//               <span className={`text-gray-800 font-medium ${styles.textSize}`}>
//                 Need AI Assistant
//               </span>
//             </div>
//             <div className="text-gray-400 text-lg">›</div>
//           </div>

//           <div
//             className={`flex items-center mt-2 border border-green-800 justify-between bg-white rounded-xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-100`}
//             onClick={() => setMode("human")}
//           >
//             <div className="flex items-center space-x-3">
//               <div
//                 className={`bg-green-100 ${styles.cardPadding} rounded-full`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`${styles.iconSize} text-green-600`}
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                 </svg>
//               </div>
//               <span className={`text-gray-800 font-medium ${styles.textSize}`}>
//                 Chat with us now
//               </span>
//             </div>
//             <div className="text-gray-400 text-lg">›</div>
//           </div>
//         </div>

//         {/* Bottom section */}
//         <div
//           className={`bg-gray-50 mt-4 pb-4 ${
//             styles.fullScreen ? "flex-1" : ""
//           }`}
//         >
//           <div className="flex border-t border-gray-200">
//             <button
//               className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-green-600 bg-white`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`${styles.iconSize} mb-1`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 12l2-2m0 0l7-7 7 7m-7-7v18"
//                 />
//               </svg>
//               <button
//                 className={`${styles.subtitleSize} font-medium`}
//                 onClick={handleAi}
//               >
//                 Home
//               </button>
//               <div className="w-8 h-0.5 bg-green-600 mt-1 rounded-full"></div>
//             </button>
//             <button
//               onClick={() => setMode("human")}
//               className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-gray-400 hover:text-green-600 transition-colors`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`${styles.iconSize} mb-1`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2z"
//                 />
//               </svg>
//               <span className={styles.subtitleSize}>Conversation</span>
//             </button>
//           </div>

//           <div className="text-center mt-2">
//             <span className={`${styles.subtitleSize} text-gray-400`}>
//               ⚡ Driven by Jaimax
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (mode === "human") {
//     return <HumantAssistant onclose={onClose} />;
//   }

//   // AI Chat Assistant
//   return (
//     <div
//       onClick={handleWrapperClick}
//       className={`${styles.containerClass} ${
//         styles.shadow
//       } bg-white flex flex-col overflow-hidden z-50 font-sans ${
//         styles.fullScreen ? "min-h-screen" : ""
//       }`}
//     >
//       {/* Header */}
//       <div
//         className={`${
//           styles.headerPadding
//         } flex items-center justify-between text-white ${
//           styles.fullScreen ? "sticky top-0 z-10" : ""
//         }`}
//         style={{ backgroundColor: "#085056" }}
//       >
//         <div className="flex items-center">
//           <img
//             src={logo}
//             alt="agent"
//             className={`${styles.buttonSize} rounded-full mr-3`}
//           />
//           <div>
//             <p className={`font-semibold leading-tight ${styles.textSize}`}>
//               JAIMAX AI
//             </p>
//             <p className={`${styles.subtitleSize} opacity-90`}>
//               We are online!
//             </p>
//           </div>
//         </div>
//         {/* Menu */}
//         <div className="relative">
//           <button
//             onClick={toggleMenu}
//             className={`text-white text-3xl ${styles.inputPadding} rounded-full transition-all duration-200`}
//           >
//             ⋮
//           </button>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: -10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: -10 }}
//               transition={{ duration: 0.2 }}
//               className={`absolute right-0 top-8 ${styles.menuWidth} shadow-2xl border border-white/20 rounded-2xl z-50 backdrop-blur-md`}
//               style={{ backgroundColor: "#085056" }}
//             >
//               <div className="relative z-10">
//                 <button
//                   onClick={handleCloseConversation}
//                   className={`group flex items-center gap-3 w-full ${styles.menuPadding} mb-1 ${styles.menuTextSize} text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200`}
//                 >
//                   <XCircle
//                     className={`${styles.menuIconSize} text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200`}
//                   />
//                   <span className="font-medium">Close the conversation</span>
//                 </button>

//                 <button
//                   onClick={handleDeleteConversation}
//                   className={`group flex items-center gap-3 w-full ${styles.menuPadding} ${styles.menuTextSize} text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200`}
//                 >
//                   <Trash2
//                     className={`${styles.menuIconSize} text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200`}
//                   />
//                   <span className="font-medium">Delete the conversation</span>
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div
//         className={`flex-1 ${
//           styles.chatPadding
//         } overflow-y-auto bg-white space-y-2 ${
//           styles.fullScreen ? "pb-safe" : ""
//         }`}
//         style={styles.chatHeight ? { maxHeight: styles.chatHeight } : {}}
//       >
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`${styles.messageTextSize} break-words relative ${
//               msg.from === "bot"
//                 ? `self-start ${styles.maxMessageWidth}`
//                 : `self-end ml-auto ${styles.maxMessageWidth}`
//             }`}
//             style={{
//               fontSize:
//                 msg.text.length > 100
//                   ? styles.isExtraSmall
//                     ? "7px"
//                     : screenSize.width <= 425
//                     ? "8px"
//                     : "11px"
//                   : undefined,
//               width: "fit-content",
//             }}
//           >
//             <div
//               className={`rounded-xl ${styles.inputPadding} ${
//                 msg.from === "bot"
//                   ? "bg-gray-100 text-gray-800"
//                   : "bg-[#085056] text-white"
//               }`}
//               style={{ fontSize: msg.text.length > 100 ? "16px" : "16px" }}
//             >
//               {msg.text}
//             </div>
//             <div
//               className={`${
//                 styles.isExtraSmall ? "text-[8px]" : "text-[10px]"
//               } mt-1 opacity-50 text-right`}
//             >
//               {msg.time}
//             </div>
//           </div>
//         ))}
//         {loading && typingText && (
//           <div
//             className={`rounded-xl ${styles.inputPadding} ${styles.messageTextSize} ${styles.maxMessageWidth} bg-gray-100 text-gray-800 self-start`}
//           >
//             {typingText}
//           </div>
//         )}
//         <div ref={chatEndRef} />
//       </div>

//       {/* Input Area */}
//       <div
//         style={{ borderColor: "rgba(8, 80, 86, 0.6)" }}
//         className={`flex items-center bg-white/90 backdrop-blur-sm ${
//           styles.inputPadding
//         } ${
//           styles.fullScreen
//             ? "sticky bottom-0 rounded-none border-t"
//             : "rounded-2xl"
//         } shadow-lg border border-red-200/60 border-[2px] hover:shadow-xl transition-all duration-300 focus-within:shadow-xl focus-within:border-blue-400/60 max-w-full`}
//       >
//         <button
//           onClick={handleVoiceInput}
//           title={isListening ? "Stop voice input" : "Start voice input"}
//           disabled={loading}
//           className={`
//               flex items-center justify-center ${styles.buttonSize} rounded-xl
//               transition-all duration-200 hover:scale-105 active:scale-95
//               ${
//                 isListening
//                   ? "bg-blue-500 text-white shadow-md animate-pulse"
//                   : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
//               }
//               ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
//             `}
//         >
//           {isListening ? (
//             <MicOff className={styles.iconSize} />
//           ) : (
//             <Mic className={styles.iconSize} />
//           )}
//         </button>

//         <input
//           type="text"
//           placeholder={loading ? "Sending message..." : "Type your message..."}
//           className={`flex-1 ${styles.inputTextSize} ${styles.inputPadding} mx-3 bg-transparent focus:outline-none placeholder-gray-400 text-gray-800 min-w-0`}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//         />

//         <div className="flex items-center gap-2">
//           <button
//             title="Send message"
//             onClick={() => sendMessage(input)}
//             className={`flex items-center justify-center ${styles.buttonSize} rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 bg-[#085056] hover:bg-blue-600 cursor-pointer shadow-md`}
//           >
//             {loading ? (
//               <Loader2
//                 className={`${styles.iconSize} animate-spin text-gray-200`}
//               />
//             ) : (
//               <Send className={`${styles.iconSize} text-white`} />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatAssistant;

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Trash2,
//   XCircle,
//   Mic,
//   Paperclip,
//   Smile,
//   Send,
//   MapPin,
//   Loader2,
//   MicOff,
//   Wifi,
//   WifiOff,
//   AlertCircle,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import JaimaxLogo from "../../assets/Images/logo.svg";
// import logo from "../../assets/jcoin.png";
// import SupportBot from "./humanassistant";
// import HumantAssistant from "./humanassistant";
// import { useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import {
//   useSendChatMessageMutation,
//   useInsertUserQueryMutation,
//   useGetChatHistoryQuery,
//   useDeleteChatConversationMutation,
//   useGetAiStatusQuery,
// } from "./chatApi";

// const ChatAssistant = ({ onClose }) => {
//   const [input, setInput] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [mode, setMode] = useState(null);
//   const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
//   const [screenSize, setScreenSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   const navigate = useNavigate();

//   // RTK Query hooks
//   const [sendChatMessage, { isLoading: isSending, error: sendError }] = useSendChatMessageMutation();
//   const [insertUserQuery] = useInsertUserQueryMutation();
//   const { data: aiStatus, error: statusError } = useGetAiStatusQuery();
//   const [deleteChatConversation] = useDeleteChatConversationMutation();

//   // Local state for messages with localStorage persistence
//   const [messages, setMessages] = useState(() => {
//     try {
//       const saved = localStorage.getItem(`chat_messages_${conversationId}`);
//       return saved ? JSON.parse(saved) : [{
//         id: 1,
//         from: "bot",
//         text: "Hi 👋 How can I help you today?",
//         time: new Date().toLocaleTimeString(),
//         timestamp: new Date().toISOString(),
//       }];
//     } catch {
//       return [{
//         id: 1,
//         from: "bot",
//         text: "Hi 👋 How can I help you today?",
//         time: new Date().toLocaleTimeString(),
//         timestamp: new Date().toISOString(),
//       }];
//     }
//   });

//   const [typingText, setTypingText] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   const menuRef = useRef(null);
//   const toggleRef = useRef(null);
//   const chatEndRef = useRef(null);
//   const typingIntervalRef = useRef(null);

//   // Network status monitoring
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   // Real-time screen size tracking
//   useEffect(() => {
//     const handleResize = () => {
//       setScreenSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, typingText]);

//   // Save messages to localStorage
//   useEffect(() => {
//     try {
//       localStorage.setItem(`chat_messages_${conversationId}`, JSON.stringify(messages));
//     } catch (error) {
//       console.warn('Failed to save messages to localStorage:', error);
//     }
//   }, [messages, conversationId]);

//   // Cleanup typing effect on unmount
//   useEffect(() => {
//     return () => {
//       if (typingIntervalRef.current) {
//         clearInterval(typingIntervalRef.current);
//       }
//     };
//   }, []);

//   // Enhanced typing effect
//   const simulateTyping = useCallback((text, callback) => {
//     if (typingIntervalRef.current) {
//       clearInterval(typingIntervalRef.current);
//     }

//     setTypingText("");
//     let i = 0;

//     typingIntervalRef.current = setInterval(() => {
//       if (i < text.length) {
//         setTypingText(text.slice(0, i + 1));
//         i++;
//       } else {
//         clearInterval(typingIntervalRef.current);
//         setTypingText("");
//         callback();
//       }
//     }, 30); // Slower typing for better UX
//   }, []);

//   // Enhanced message sending with RTK Query
//   const sendMessage = useCallback(async (text) => {
//     if (!text.trim() || isSending) return;

//     const userMsg = {
//       id: Date.now(),
//       from: "user",
//       text: text.trim(),
//       time: new Date().toLocaleTimeString(),
//       timestamp: new Date().toISOString(),
//     };

//     setMessages(prev => [...prev, userMsg]);
//     setInput("");

//     try {
//       // Send message to AI
//       const response = await sendChatMessage({
//         query: text.trim(),
//         conversationId
//       }).unwrap();

//       // Log user query (fire and forget)
//       insertUserQuery({
//         query: text.trim(),
//         conversationId,
//         metadata: {
//           screenSize,
//           userAgent: navigator.userAgent.slice(0, 100),
//         }
//       }).catch(console.warn);

//       // Simulate typing effect for bot response
//       simulateTyping(response.answer, () => {
//         setMessages(prev => [...prev, {
//           id: Date.now() + 1,
//           from: "bot",
//           text: response.answer,
//           time: new Date().toLocaleTimeString(),
//           timestamp: new Date().toISOString(),
//           conversationId: response.conversationId,
//         }]);
//       });

//     } catch (error) {
//       console.error('Failed to send message:', error);

//       const errorMessage = error?.data?.error ||
//         error?.message ||
//         "⚠️ Connection failed. Please check your internet and try again.";

//       setMessages(prev => [...prev, {
//         id: Date.now() + 1,
//         from: "bot",
//         text: errorMessage,
//         time: new Date().toLocaleTimeString(),
//         timestamp: new Date().toISOString(),
//         isError: true,
//       }]);
//     }
//   }, [isSending, sendChatMessage, insertUserQuery, conversationId, screenSize, simulateTyping]);

//   // Enhanced voice input with better error handling
//   const handleVoiceInput = useCallback(() => {
//     if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
//       setMessages(prev => [...prev, {
//         id: Date.now(),
//         from: "bot",
//         text: "🎤 Speech recognition is not supported in this browser. Please try using Chrome or Edge.",
//         time: new Date().toLocaleTimeString(),
//         timestamp: new Date().toISOString(),
//         isError: true,
//       }]);
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//     recognition.continuous = false;

//     setIsListening(true);

//     recognition.onstart = () => {
//       setMessages(prev => [...prev, {
//         id: Date.now(),
//         from: "bot",
//         text: "🎤 Listening... Please speak now.",
//         time: new Date().toLocaleTimeString(),
//         timestamp: new Date().toISOString(),
//         isTemporary: true,
//       }]);
//     };

//     recognition.onresult = (event) => {
//       const voiceText = event.results[0][0].transcript;
//       setMessages(prev => prev.filter(msg => !msg.isTemporary));
//       sendMessage(voiceText);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setMessages(prev => prev.filter(msg => !msg.isTemporary));

//       let errorMsg = "🎤 Voice input failed. ";
//       switch(event.error) {
//         case 'no-speech':
//           errorMsg += "No speech detected. Please try again.";
//           break;
//         case 'network':
//           errorMsg += "Network error. Please check your connection.";
//           break;
//         case 'not-allowed':
//           errorMsg += "Microphone access denied. Please allow microphone permission.";
//           break;
//         default:
//           errorMsg += "Please try again or type your message.";
//       }

//       setMessages(prev => [...prev, {
//         id: Date.now(),
//         from: "bot",
//         text: errorMsg,
//         time: new Date().toLocaleTimeString(),
//         timestamp: new Date().toISOString(),
//         isError: true,
//       }]);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       setMessages(prev => prev.filter(msg => !msg.isTemporary));
//     };

//     recognition.start();
//   }, [sendMessage]);

//   const handleKeyDown = useCallback((e) => {
//     if (e.key === "Enter" && !e.shiftKey && !isSending) {
//       e.preventDefault();
//       sendMessage(input);
//     }
//   }, [input, sendMessage, isSending]);

//   // Dynamic styling based on screen size (keeping your existing responsive logic)
//   const getResponsiveStyles = () => {
//     const width = screenSize.width;
//     const height = screenSize.height;

//     if (width < 375) {
//       return {
//         containerClass: "fixed inset-0 w-screen h-screen rounded-none overflow-hidden",
//         headerHeight: height < 600 ? "h-[180px]" : "h-[220px]",
//         logoWidth: "w-28",
//         titleSize: "text-sm",
//         subtitleSize: "text-[9px]",
//         cardPadding: "p-2",
//         iconSize: "w-3 h-3",
//         textSize: "text-xs",
//         buttonPadding: "py-1.5",
//         headerPadding: "p-2",
//         chatPadding: "p-1",
//         messageTextSize: "text-[8px]",
//         inputTextSize: "text-[9px]",
//         inputPadding: "px-1 py-1",
//         buttonSize: "w-4 h-4",
//         menuWidth: "w-32",
//         menuTextSize: "text-[8px]",
//         menuIconSize: "w-2 h-2",
//         menuPadding: "px-1.5 py-1",
//         maxMessageWidth: "max-w-[92%]",
//         shadow: "shadow-none",
//         border: "border-0",
//         fullScreen: true,
//         chatHeight: `${height - 260}px`,
//         isExtraSmall: true,
//       };
//     } else if (width <= 425) {
//       return {
//         containerClass: "fixed inset-0 w-screen h-screen rounded-none",
//         headerHeight: "h-[240px]",
//         logoWidth: "w-36",
//         titleSize: "text-base",
//         subtitleSize: "text-[10px]",
//         cardPadding: "p-2",
//         iconSize: "w-3 h-3",
//         textSize: "text-xs",
//         buttonPadding: "py-2",
//         headerPadding: "p-2",
//         chatPadding: "p-1",
//         messageTextSize: "text-[9px]",
//         inputTextSize: "text-[10px]",
//         inputPadding: "px-1 py-1",
//         buttonSize: "w-5 h-5",
//         menuWidth: "w-36",
//         menuTextSize: "text-[9px]",
//         menuIconSize: "w-2 h-2",
//         menuPadding: "px-2 py-1.5",
//         maxMessageWidth: "max-w-[90%]",
//         shadow: "shadow-none",
//         border: "border-0",
//         fullScreen: true,
//       };
//     } else if (width <= 540) {
//       return {
//         containerClass: "fixed bottom-4 right-4 w-80 h-[480px] rounded-xl",
//         headerHeight: "h-[280px]",
//         logoWidth: "w-44",
//         titleSize: "text-xl",
//         subtitleSize: "text-xs",
//         cardPadding: "p-1",
//         iconSize: "w-16 h-16",
//         textSize: "text-sm",
//         buttonPadding: "py-3",
//         headerPadding: "p-3",
//         chatPadding: "p-2",
//         messageTextSize: "text-xs",
//         inputTextSize: "text-xs",
//         inputPadding: "px-2 py-2",
//         buttonSize: "w-7 h-7",
//         menuWidth: "w-44",
//         menuTextSize: "text-xs",
//         menuIconSize: "w-3 h-3",
//         menuPadding: "px-3 py-2",
//         maxMessageWidth: "max-w-[85%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else if (width <= 650) {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-84 h-[520px] rounded-xl",
//         headerHeight: "h-[300px]",
//         logoWidth: "w-48",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-2",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-sm",
//         inputPadding: "px-3 py-3",
//         buttonSize: "w-8 h-8",
//         menuWidth: "w-48",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[80%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else if (width <= 1080) {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-96 h-[600px] rounded-xl",
//         headerHeight: "h-[250px]",
//         logoWidth: "w-64",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-3",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-base",
//         inputPadding: "px-3 py-3",
//         buttonSize: "w-10 h-10",
//         menuWidth: "w-56",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[75%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     } else {
//       return {
//         containerClass: "fixed bottom-6 right-6 w-96 h-[600px] rounded-xl",
//         headerHeight: "h-[250px]",
//         logoWidth: "w-64",
//         titleSize: "text-2xl",
//         subtitleSize: "text-sm",
//         cardPadding: "p-3",
//         iconSize: "w-5 h-5",
//         textSize: "text-base",
//         buttonPadding: "py-4",
//         headerPadding: "p-4",
//         chatPadding: "p-3",
//         messageTextSize: "text-sm",
//         inputTextSize: "text-base",
//         inputPadding: "px-4 py-3",
//         buttonSize: "w-10 h-10",
//         menuWidth: "w-56",
//         menuTextSize: "text-sm",
//         menuIconSize: "w-4 h-4",
//         menuPadding: "px-4 py-3",
//         maxMessageWidth: "max-w-[75%]",
//         shadow: "shadow-2xl",
//         border: "border border-gray-200",
//       };
//     }
//   };

//   const styles = getResponsiveStyles();

//   const handleAi = () => navigate("/");

//   const handleWrapperClick = (e) => {
//     if (toggleRef.current && toggleRef.current.contains(e.target)) return;
//     if (menuRef.current && menuRef.current.contains(e.target)) return;
//     if (menuOpen) {
//       setMenuOpen(false);
//     }
//   };

//   const toggleMenu = () => setMenuOpen(prev => !prev);

//   const handleCloseConversation = () => {
//     setMenuOpen(false);
//     onClose();
//   };

//   const handleClearChat = useCallback(async () => {
//     try {
//       await deleteChatConversation({ conversationId });
//     } catch (error) {
//       console.warn('Failed to delete conversation on server:', error);
//     }

//     const welcome = {
//       id: 1,
//       from: "bot",
//       text: "Hi 👋 How can I help you today?",
//       time: new Date().toLocaleTimeString(),
//       timestamp: new Date().toISOString(),
//     };
//     setMessages([welcome]);
//     localStorage.removeItem(`chat_messages_${conversationId}`);
//   }, [deleteChatConversation, conversationId]);

//   const handleDeleteConversation = () => {
//     setMenuOpen(false);
//     handleClearChat();
//   };

//   // Connection status indicator
//   const ConnectionStatus = ({ isOnline, aiStatus }) => (
//     <div className="flex items-center space-x-1">
//       {isOnline ? (
//         aiStatus?.status === 'healthy' ? (
//           <div className="flex items-center text-green-300">
//             <Wifi className="w-3 h-3" />
//             <span className="text-[10px] ml-1">Online</span>
//           </div>
//         ) : (
//           <div className="flex items-center text-yellow-300">
//             <AlertCircle className="w-3 h-3" />
//             <span className="text-[10px] ml-1">Limited</span>
//           </div>
//         )
//       ) : (
//         <div className="flex items-center text-red-300">
//           <WifiOff className="w-3 h-3" />
//           <span className="text-[10px] ml-1">Offline</span>
//         </div>
//       )}
//     </div>
//   );

//   // Mode Selector UI (keeping your existing logic)
//   if (!mode) {
//     return (
//       <div className={`${styles.containerClass} ${styles.shadow} ${styles.border} overflow-hidden bg-white z-50 ${styles.fullScreen ? "min-h-screen" : "h-auto"}`}>
//         {/* Header */}
//         <div className={`bg-[#085056] ${styles.headerHeight} flex flex-col items-center justify-center text-white relative`}>
//           <div className={`${styles.logoWidth} rounded-full flex items-center justify-center`}>
//             <img src={JaimaxLogo} alt="Logo" className="object-contain max-w-full h-auto" />
//           </div>
//           <h1 className={`${styles.titleSize} font-bold mt-6`}>Jaimax</h1>
//           <p className={`text-green-100 ${styles.subtitleSize} mt-1 px-4 text-center`}>
//             We are here to help you!
//           </p>

//           {/* Connection Status */}
//           <div className="absolute bottom-4 left-4">
//             <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
//           </div>

//           {/* Back button */}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={onClose}
//               title="Back"
//               className="flex items-center space-x-2 bg-[#085056] bg-opacity-90 hover:bg-opacity-100 text-white font-semibold rounded-full px-4 py-2 shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0bc5ea] select-none cursor-pointer"
//             >
//               <IoArrowBack size={22} />
//               <span className="text-base">Back</span>
//             </button>
//           </div>
//         </div>

//         {/* Chat cards */}
//         <div className={`relative -mt-6 ${styles.isExtraSmall ? "mx-1 px-1" : styles.fullScreen ? "mx-2 px-1" : "mx-4 px-2"}`}>
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex items-center justify-between border border-green-800 bg-white rounded-xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-200`}
//             onClick={() => setMode("chat")}
//           >
//             <div className="flex items-center space-x-3">
//               <div className={`bg-green-100 ${styles.cardPadding} rounded-full`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.iconSize} text-green-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="4" y="7" width="16" height="10" rx="2" ry="2" />
//                   <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
//                   <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
//                   <path d="M9 17v2h6v-2" />
//                   <path d="M2 11h1" />
//                   <path d="M21 11h1" />
//                 </svg>
//               </div>
//               <span className={`text-gray-800 font-medium ${styles.textSize}`}>Need AI Assistant</span>
//             </div>
//             <div className="text-gray-400 text-lg">›</div>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`flex items-center mt-2 border border-green-800 justify-between bg-white rounded-xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-200`}
//             onClick={() => setMode("human")}
//           >
//             <div className="flex items-center space-x-3">
//               <div className={`bg-green-100 ${styles.cardPadding} rounded-full`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`${styles.iconSize} text-green-600`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//                 </svg>
//               </div>
//               <span className={`text-gray-800 font-medium ${styles.textSize}`}>Chat with us now</span>
//             </div>
//             <div className="text-gray-400 text-lg">›</div>
//           </motion.div>
//         </div>

//         {/* Bottom section */}
//         <div className={`bg-gray-50 mt-4 pb-4 ${styles.fullScreen ? "flex-1" : ""}`}>
//           <div className="flex border-t border-gray-200">
//             <button className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-green-600 bg-white`}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`${styles.iconSize} mb-1`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 12l2-2m0 0l7-7 7 7m-7-7v18"
//                 />
//               </svg>
//               <span
//                 className={`${styles.subtitleSize} font-medium`}
//                 onClick={handleAi}
//               >
//                 Home
//               </span>
//               <div className="w-8 h-0.5 bg-green-600 mt-1 rounded-full"></div>
//             </button>
//             <button
//               onClick={() => setMode("human")}
//               className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-gray-400 hover:text-green-600 transition-colors`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`${styles.iconSize} mb-1`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2z"
//                 />
//               </svg>
//               <span className={styles.subtitleSize}>Conversation</span>
//             </button>
//           </div>

//           <div className="text-center mt-2">
//             <span className={`${styles.subtitleSize} text-gray-400`}>
//               ⚡ Driven by Jaimax
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (mode === "human") {
//     return <HumantAssistant onclose={onClose} />;
//   }

//   // AI Chat Assistant
//   return (
//     <div
//       onClick={handleWrapperClick}
//       className={`${styles.containerClass} ${styles.shadow} bg-white flex flex-col overflow-hidden z-50 font-sans ${styles.fullScreen ? "min-h-screen" : ""}`}
//     >
//       {/* Header */}
//       <div
//         className={`${styles.headerPadding} flex items-center justify-between text-white ${styles.fullScreen ? "sticky top-0 z-10" : ""}`}
//         style={{ backgroundColor: "#085056" }}
//       >
//         <div className="flex items-center">
//           <img
//             src={logo}
//             alt="agent"
//             className={`${styles.buttonSize} rounded-full mr-3`}
//           />
//           <div>
//             <p className={`font-semibold leading-tight ${styles.textSize}`}>
//               JAIMAX AI
//             </p>
//             <div className="flex items-center space-x-2">
//               <p className={`${styles.subtitleSize} opacity-90`}>
//                 {isSending ? "Typing..." : "Ready to help!"}
//               </p>
//               <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
//             </div>
//           </div>
//         </div>

//         {/* Menu */}
//         <div className="relative">
//           <button
//             ref={toggleRef}
//             onClick={toggleMenu}
//             className={`text-white text-3xl ${styles.inputPadding} rounded-full transition-all duration-200 hover:bg-white/10`}
//           >
//             ⋮
//           </button>
//           <AnimatePresence>
//             {menuOpen && (
//               <motion.div
//                 ref={menuRef}
//                 initial={{ opacity: 0, scale: 0.95, y: -10 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className={`absolute right-0 top-8 ${styles.menuWidth} shadow-2xl border border-white/20 rounded-2xl z-50 backdrop-blur-md`}
//                 style={{ backgroundColor: "#085056" }}
//               >
//                 <div className="relative z-10">
//                   <button
//                     onClick={handleCloseConversation}
//                     className={`group flex items-center gap-3 w-full ${styles.menuPadding} mb-1 ${styles.menuTextSize} text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200`}
//                   >
//                     <XCircle
//                       className={`${styles.menuIconSize} text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200`}
//                     />
//                     <span className="font-medium">Close conversation</span>
//                   </button>

//                   <button
//                     onClick={handleDeleteConversation}
//                     className={`group flex items-center gap-3 w-full ${styles.menuPadding} ${styles.menuTextSize} text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200`}
//                   >
//                     <Trash2
//                       className={`${styles.menuIconSize} text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200`}
//                     />
//                     <span className="font-medium">Clear chat</span>
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div
//         className={`flex-1 ${styles.chatPadding} overflow-y-auto bg-white space-y-2 ${styles.fullScreen ? "pb-safe" : ""}`}
//         style={styles.chatHeight ? { maxHeight: styles.chatHeight } : {}}
//       >
//         <AnimatePresence initial={false}>
//           {messages.map((msg) => (
//             <motion.div
//               key={msg.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className={`${styles.messageTextSize} break-words relative ${
//                 msg.from === "bot"
//                   ? `self-start ${styles.maxMessageWidth}`
//                   : `self-end ml-auto ${styles.maxMessageWidth}`
//               }`}
//               style={{
//                 fontSize:
//                   msg.text.length > 100
//                     ? styles.isExtraSmall
//                       ? "7px"
//                       : screenSize.width <= 425
//                       ? "8px"
//                       : "11px"
//                     : undefined,
//                 width: "fit-content",
//               }}
//             >
//               <div
//                 className={`rounded-xl ${styles.inputPadding} ${
//                   msg.from === "bot"
//                     ? msg.isError
//                       ? "bg-red-50 text-red-800 border border-red-200"
//                       : "bg-gray-100 text-gray-800"
//                     : "bg-[#085056] text-white"
//                 } ${msg.isTemporary ? "opacity-70" : ""}`}
//                 style={{ fontSize: "16px" }}
//               >
//                 {msg.text}
//               </div>
//               <div
//                 className={`${
//                   styles.isExtraSmall ? "text-[8px]" : "text-[10px]"
//                 } mt-1 opacity-50 text-right`}
//               >
//                 {msg.time}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Typing Indicator */}
//         <AnimatePresence>
//           {(isSending && typingText) && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`rounded-xl ${styles.inputPadding} ${styles.messageTextSize} ${styles.maxMessageWidth} bg-gray-100 text-gray-800 self-start`}
//             >
//               {typingText}
//               <span className="animate-pulse">|</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Loading Indicator */}
//         <AnimatePresence>
//           {isSending && !typingText && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`rounded-xl ${styles.inputPadding} ${styles.messageTextSize} ${styles.maxMessageWidth} bg-gray-100 text-gray-800 self-start flex items-center space-x-2`}
//             >
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <span>AI is thinking...</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div ref={chatEndRef} />
//       </div>

//       {/* Input Area */}
//       <div
//         style={{ borderColor: "rgba(8, 80, 86, 0.6)" }}
//         className={`flex items-center bg-white/90 backdrop-blur-sm ${styles.inputPadding} ${
//           styles.fullScreen
//             ? "sticky bottom-0 rounded-none border-t"
//             : "rounded-2xl"
//         } shadow-lg border border-red-200/60 border-[2px] hover:shadow-xl transition-all duration-300 focus-within:shadow-xl focus-within:border-blue-400/60 max-w-full ${
//           !isOnline ? "opacity-60" : ""
//         }`}
//       >
//         <button
//           onClick={handleVoiceInput}
//           title={isListening ? "Stop voice input" : "Start voice input"}
//           disabled={isSending || !isOnline}
//           className={`
//             flex items-center justify-center ${styles.buttonSize} rounded-xl
//             transition-all duration-200 hover:scale-105 active:scale-95
//             ${
//               isListening
//                 ? "bg-blue-500 text-white shadow-md animate-pulse"
//                 : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
//             }
//             ${isSending || !isOnline ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
//           `}
//         >
//           {isListening ? (
//             <MicOff className={styles.iconSize} />
//           ) : (
//             <Mic className={styles.iconSize} />
//           )}
//         </button>

//         <input
//           type="text"
//           placeholder={
//             !isOnline
//               ? "No internet connection..."
//               : isSending
//               ? "Sending message..."
//               : "Type your message..."
//           }
//           className={`flex-1 ${styles.inputTextSize} ${styles.inputPadding} mx-3 bg-transparent focus:outline-none placeholder-gray-400 text-gray-800 min-w-0`}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={isSending || !isOnline}
//           maxLength={1000}
//         />

//         <div className="flex items-center gap-2">
//           <button
//             title="Send message"
//             onClick={() => sendMessage(input)}
//             disabled={isSending || !input.trim() || !isOnline}
//             className={`flex items-center justify-center ${styles.buttonSize} rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 bg-[#085056] hover:bg-blue-600 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
//           >
//             {isSending ? (
//               <Loader2
//                 className={`${styles.iconSize} animate-spin text-gray-200`}
//               />
//             ) : (
//               <Send className={`${styles.iconSize} text-white`} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Character Count */}
//       {input.length > 800 && (
//         <div className="text-center py-1">
//           <span className={`${styles.subtitleSize} ${input.length > 950 ? 'text-red-500' : 'text-yellow-500'}`}>
//             {input.length}/1000
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatAssistant;

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Trash2,
  XCircle,
  Mic,
  Paperclip,
  Smile,
  Send,
  MapPin,
  Loader2,
  MicOff,
  Wifi,
  WifiOff,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JaimaxLogo from "../../assets/Images/logo.svg";
import logo from "../../assets/jcoin.png";
import SupportBot from "./humanassistant";
import HumantAssistant from "./humanassistant";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import {
  useSendChatMessageMutation,
  useInsertUserQueryMutation,
  useGetChatHistoryQuery,
  useDeleteChatConversationMutation,
  useGetAiStatusQuery,
} from "./chatApi";

const ChatAssistant = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [mode, setMode] = useState(null);
const [TriggerSpeech,setTriggerSpeech] = useState(false)
  const [conversationId] = useState(
    () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(mode ,"mode")
  const navigate = useNavigate();

  console.log(TriggerSpeech , 'TriggerSpeech')


useEffect(() => {
  if ( mode === "chat" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
  "Welcome to Jaimax! Feel free to ask me anything."
    );
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);

    // Check every 500ms if speech has finished
    const intervalId = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setTriggerSpeech(false);
        clearInterval(intervalId);
      }
    }, 500);

    // Cleanup interval on unmount or re-run
    return () => clearInterval(intervalId);
  }
}, [ mode]);

  // RTK Query hooks
  const [sendChatMessage, { isLoading: isSending, error: sendError }] =
    useSendChatMessageMutation();
  const [insertUserQuery] = useInsertUserQueryMutation();
  const { data: aiStatus, error: statusError } = useGetAiStatusQuery();
  const [deleteChatConversation] = useDeleteChatConversationMutation();

  // Local state for messages with localStorage persistence
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(`chat_messages_${conversationId}`);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              from: "bot",
              text: "Hi 👋 How can I help you today?",
              time: new Date().toLocaleTimeString(),
              timestamp: new Date().toISOString(),
            },
          ];
    } catch {
      return [
        {
          id: 1,
          from: "bot",
          text: "Hi 👋 How can I help you today?",
          time: new Date().toLocaleTimeString(),
          timestamp: new Date().toISOString(),
        },
      ];
    }
  });

  const [typingMessage, setTypingMessage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isTypingComplete, setIsTypingComplete] = useState(true);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const chatEndRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Real-time screen size tracking
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMessage]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        `chat_messages_${conversationId}`,
        JSON.stringify(messages)
      );
    } catch (error) {
      console.warn("Failed to save messages to localStorage:", error);
    }
  }, [messages, conversationId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced typing effect with realistic speed
  const simulateTyping = useCallback((fullText, onComplete) => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    setIsTypingComplete(false);
    let currentText = "";
    let currentIndex = 0;

    // Create typing message immediately
    const typingMsgId = Date.now() + 1;
    setTypingMessage({
      id: typingMsgId,
      from: "bot",
      text: "",
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().toISOString(),
      isTyping: true,
    });

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];

        setTypingMessage((prev) =>
          prev
            ? {
                ...prev,
                text: currentText + "█", // Add cursor
              }
            : null
        );

        currentIndex++;

        // Variable typing speed for more realism
        const char = fullText[currentIndex - 1];
        let delay = 10; // Default speed

        if (char === "." || char === "!" || char === "?") {
          delay = 200; // Pause at sentence endings
        } else if (char === "," || char === ";") {
          delay = 100; // Pause at commas
        } else if (char === " ") {
          delay = 30; // Quick for spaces
        } else if (char === "\n") {
          delay = 150; // Pause at line breaks
        }

        responseTimeoutRef.current = setTimeout(typeNextChar, delay);
      } else {
        // Remove cursor and complete typing
        setTypingMessage((prev) =>
          prev
            ? {
                ...prev,
                text: currentText,
              }
            : null
        );

        // Wait a moment then finalize
        responseTimeoutRef.current = setTimeout(() => {
          setTypingMessage(null);
          setIsTypingComplete(true);
          onComplete(currentText);
        }, 300);
      }
    };

    // Start typing after a brief delay to show "thinking"
    responseTimeoutRef.current = setTimeout(typeNextChar, 500);
  }, []);

  // Enhanced message sending with immediate UI feedback
  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isSending || !isTypingComplete) return;

      const userMsg = {
        id: Date.now(),
        from: "user",
        text: text.trim(),
        time: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString(),
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      // Show "thinking" indicator immediately
      const thinkingMsg = {
        id: Date.now() + 0.5,
        from: "bot",
        text: " just Wait Thinking...",
        time: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString(),
        isTemporary: true,
      };

      setMessages((prev) => [...prev, thinkingMsg]);

      try {
        // Send message to AI
        const response = await sendChatMessage({
          query: text.trim(),
          conversationId,
        }).unwrap();

        // Remove thinking message
        setMessages((prev) => prev.filter((msg) => !msg.isTemporary));

        // Log user query (fire and forget)
        insertUserQuery({
          query: text.trim(),
          conversationId,
          metadata: {
            screenSize,
            userAgent: navigator.userAgent.slice(0, 100),
          },
        }).catch(console.warn);

        // Start typing animation
        simulateTyping(
          response.answer || "🤖 Sorry, I couldn't find an answer.",
          (finalText) => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                from: "bot",
                text: finalText,
                time: new Date().toLocaleTimeString(),
                timestamp: new Date().toISOString(),
                conversationId: response.conversationId,
              },
            ]);
          }
        );
      } catch (error) {
        console.error("Failed to send message:", error);

        // Remove thinking message
        setMessages((prev) => prev.filter((msg) => !msg.isTemporary));

        const errorMessage =
          error?.data?.error ||
          error?.message ||
          "⚠️ Connection failed. Please check your internet and try again.";

        // Type out error message
        simulateTyping(errorMessage, (finalText) => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              from: "bot",
              text: finalText,
              time: new Date().toLocaleTimeString(),
              timestamp: new Date().toISOString(),
              isError: true,
            },
          ]);
        });
      }
    },
    [
      isSending,
      isTypingComplete,
      sendChatMessage,
      insertUserQuery,
      conversationId,
      screenSize,
      simulateTyping,
    ]
  );

  // Enhanced voice input with better error handling
  const handleVoiceInput = useCallback(() => {
    if (!isTypingComplete) return;

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          from: "bot",
          text: "🎤 Speech recognition is not supported in this browser. Please try using Chrome or Edge.",
          time: new Date().toLocaleTimeString(),
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    setIsListening(true);

    recognition.onstart = () => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          from: "bot",
          text: "🎤 Listening... Please speak now.",
          time: new Date().toLocaleTimeString(),
          timestamp: new Date().toISOString(),
          isTemporary: true,
        },
      ]);
    };

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setMessages((prev) => prev.filter((msg) => !msg.isTemporary));
      setInput(voiceText); // Set input instead of sending immediately
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setMessages((prev) => prev.filter((msg) => !msg.isTemporary));

      let errorMsg = "🎤 Voice input failed. ";
      switch (event.error) {
        case "no-speech":
          errorMsg += "No speech detected. Please try again.";
          break;
        case "network":
          errorMsg += "Network error. Please check your connection.";
          break;
        case "not-allowed":
          errorMsg +=
            "Microphone access denied. Please allow microphone permission.";
          break;
        default:
          errorMsg += "Please try again or type your message.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          from: "bot",
          text: errorMsg,
          time: new Date().toLocaleTimeString(),
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    };

    recognition.onend = () => {
      setIsListening(false);
      setMessages((prev) => prev.filter((msg) => !msg.isTemporary));
    };

    recognition.start();
  }, [isTypingComplete]);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        !isSending &&
        input.trim() &&
        isTypingComplete
      ) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage, isSending, isTypingComplete]
  );

  // Dynamic styling based on screen size (keeping your existing responsive logic)
  const getResponsiveStyles = () => {
    const width = screenSize.width;
    const height = screenSize.height;

    if (width < 375) {
      return {
        containerClass:
          "fixed inset-0 w-screen h-screen rounded-none overflow-hidden",
        headerHeight: height < 600 ? "h-[180px]" : "h-[220px]",
        logoWidth: "w-28",
        titleSize: "text-sm",
        subtitleSize: "text-[9px]",
        cardPadding: "p-2",
        iconSize: "w-3 h-3",
        textSize: "text-xs",
        buttonPadding: "py-1.5",
        headerPadding: "p-2",
        chatPadding: "p-1",
        messageTextSize: "text-[8px]",
        inputTextSize: "text-[9px]",
        inputPadding: "px-1 py-1",
        buttonSize: "w-4 h-4",
        menuWidth: "w-32",
        menuTextSize: "text-[8px]",
        menuIconSize: "w-2 h-2",
        menuPadding: "px-1.5 py-1",
        maxMessageWidth: "max-w-[92%]",
        shadow: "shadow-none",
        border: "border-0",
        fullScreen: true,
        chatHeight: `${height - 260}px`,
        isExtraSmall: true,
      };
    } else if (width <= 425) {
      return {
        containerClass: "fixed inset-0 w-screen h-screen rounded-none",
        headerHeight: "h-[240px]",
        logoWidth: "w-36",
        titleSize: "text-base",
        subtitleSize: "text-[10px]",
        cardPadding: "p-2",
        iconSize: "w-3 h-3",
        textSize: "text-xs",
        buttonPadding: "py-2",
        headerPadding: "p-2",
        chatPadding: "p-1",
        messageTextSize: "text-[9px]",
        inputTextSize: "text-[10px]",
        inputPadding: "px-1 py-1",
        buttonSize: "w-5 h-5",
        menuWidth: "w-36",
        menuTextSize: "text-[9px]",
        menuIconSize: "w-2 h-2",
        menuPadding: "px-2 py-1.5",
        maxMessageWidth: "max-w-[90%]",
        shadow: "shadow-none",
        border: "border-0",
        fullScreen: true,
      };
    } else if (width <= 540) {
      return {
        containerClass: "fixed bottom-4 right-4 w-80 h-[480px] rounded-xl",
        headerHeight: "h-[280px]",
        logoWidth: "w-44",
        titleSize: "text-xl",
        subtitleSize: "text-xs",
        cardPadding: "p-1",
        iconSize: "w-16 h-16",
        textSize: "text-sm",
        buttonPadding: "py-3",
        headerPadding: "p-3",
        chatPadding: "p-2",
        messageTextSize: "text-xs",
        inputTextSize: "text-xs",
        inputPadding: "px-2 py-2",
        buttonSize: "w-7 h-7",
        menuWidth: "w-44",
        menuTextSize: "text-xs",
        menuIconSize: "w-3 h-3",
        menuPadding: "px-3 py-2",
        maxMessageWidth: "max-w-[85%]",
        shadow: "shadow-2xl",
        border: "border border-gray-200",
      };
    } else if (width <= 650) {
      return {
        containerClass: "fixed bottom-6 right-6 w-84 h-[520px] rounded-xl",
        headerHeight: "h-[300px]",
        logoWidth: "w-48",
        titleSize: "text-2xl",
        subtitleSize: "text-sm",
        cardPadding: "p-2",
        iconSize: "w-5 h-5",
        textSize: "text-base",
        buttonPadding: "py-4",
        headerPadding: "p-4",
        chatPadding: "p-3",
        messageTextSize: "text-sm",
        inputTextSize: "text-sm",
        inputPadding: "px-3 py-3",
        buttonSize: "w-8 h-8",
        menuWidth: "w-48",
        menuTextSize: "text-sm",
        menuIconSize: "w-4 h-4",
        menuPadding: "px-4 py-3",
        maxMessageWidth: "max-w-[80%]",
        shadow: "shadow-2xl",
        border: "border border-gray-200",
      };
    } else if (width <= 1080) {
      return {
        containerClass: "fixed bottom-6 right-6 w-96 h-[600px] rounded-xl",
        headerHeight: "h-[250px]",
        logoWidth: "w-64",
        titleSize: "text-2xl",
        subtitleSize: "text-sm",
        cardPadding: "p-3",
        iconSize: "w-5 h-5",
        textSize: "text-base",
        buttonPadding: "py-4",
        headerPadding: "p-4",
        chatPadding: "p-3",
        messageTextSize: "text-sm",
        inputTextSize: "text-base",
        inputPadding: "px-3 py-3",
        buttonSize: "w-10 h-10",
        menuWidth: "w-56",
        menuTextSize: "text-sm",
        menuIconSize: "w-4 h-4",
        menuPadding: "px-4 py-3",
        maxMessageWidth: "max-w-[75%]",
        shadow: "shadow-2xl",
        border: "border border-gray-200",
      };
    } else {
      return {
        containerClass: "fixed bottom-6 right-6 w-96 h-[600px] rounded-xl",
        headerHeight: "h-[250px]",
        logoWidth: "w-64",
        titleSize: "text-2xl",
        subtitleSize: "text-sm",
        cardPadding: "p-3",
        iconSize: "w-5 h-5",
        textSize: "text-base",
        buttonPadding: "py-4",
        headerPadding: "p-4",
        chatPadding: "p-3",
        messageTextSize: "text-sm",
        inputTextSize: "text-base",
        inputPadding: "px-4 py-3",
        buttonSize: "w-10 h-10",
        menuWidth: "w-56",
        menuTextSize: "text-sm",
        menuIconSize: "w-4 h-4",
        menuPadding: "px-4 py-3",
        maxMessageWidth: "max-w-[75%]",
        shadow: "shadow-2xl",
        border: "border border-gray-200",
      };
    }
  };

  const styles = getResponsiveStyles();

  const handleAi = () => navigate("/");

  const handleWrapperClick = (e) => {
    if (toggleRef.current && toggleRef.current.contains(e.target)) return;
    if (menuRef.current && menuRef.current.contains(e.target)) return;
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleCloseConversation = () => {
    setMenuOpen(false);
    onClose();
  };

  const handleClearChat = useCallback(async () => {
    try {
      await deleteChatConversation({ conversationId });
    } catch (error) {
      console.warn("Failed to delete conversation on server:", error);
    }

    const welcome = {
      id: 1,
      from: "bot",
      text: "Hi 👋 How can I help you today?",
      time: new Date().toLocaleTimeString(),
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
    setTypingMessage(null);
    setIsTypingComplete(true);
    localStorage.removeItem(`chat_messages_${conversationId}`);
  }, [deleteChatConversation, conversationId]);

  const handleDeleteConversation = () => {
    setMenuOpen(false);
    handleClearChat();
  };

  // Connection status indicator
  const ConnectionStatus = ({ isOnline, aiStatus }) => (
    <div className="flex items-center space-x-1">
      {isOnline ? (
        aiStatus?.status === "healthy" ? (
          <div className="flex items-center text-green-300">
            <Wifi className="w-3 h-3" />
            <span className="text-[10px] ml-1">Online</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-300">
            {/* <AlertCircle className="w-3 h-3" /> */}
            {/* <span className="text-[10px] ml-1">Limited</span> */}
          </div>
        )
      ) : (
        <div className="flex items-center text-red-300">
          <WifiOff className="w-3 h-3" />
          <span className="text-[10px] ml-1">Offline</span>
        </div>
      )}
    </div>
  );

  // Check if send button should be enabled
  const canSend = input.trim() && !isSending && isOnline && isTypingComplete;

  // Mode Selector UI (keeping your existing logic)
  // if (!mode) {
  //   return (
  //     <div
  //       className={`${styles.containerClass} ${styles.shadow} ${
  //         styles.border
  //       } overflow-hidden bg-white z-50 ${
  //         styles.fullScreen ? "min-h-screen" : "h-auto"
  //       }`}
  //     >
  //       {/* Header */}
  //       <div
  //         className={`bg-[#085056] ${styles.headerHeight} flex flex-col items-center justify-center text-white relative`}
  //       >
  //         <div
  //           className={`${styles.logoWidth} rounded-full flex items-center justify-center`}
  //         >
  //           <img
  //             src={JaimaxLogo}
  //             alt="Logo"
  //             className="object-contain max-w-full h-auto"
  //           />
  //         </div>
  //         <h1 className={`${styles.titleSize} font-bold mt-6`}>Jaimax</h1>
  //         <p
  //           className={`text-green-100 ${styles.subtitleSize} mt-1 px-4 text-center`}
  //         >
  //           We are here to help you!
  //         </p>

  //         {/* Connection Status */}
  //         <div className="absolute bottom-4 left-4">
  //           <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
  //         </div>

  //         {/* Back button */}
  //         <div className="absolute top-4 right-4">
  //           <button
  //             onClick={onClose}
  //             title="Back"
  //             className="flex items-center space-x-2 bg-[#085056] bg-opacity-90 hover:bg-opacity-100 text-white font-semibold rounded-full px-4 py-2 shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0bc5ea] select-none cursor-pointer"
  //           >
  //             <IoArrowBack size={22} />
  //             <span className="text-base">Back</span>
  //           </button>
  //         </div>
  //       </div>

  //       {/* Chat cards */}
  //       <div
  //         className={`relative -mt-6 ${
  //           styles.isExtraSmall
  //             ? "mx-1 px-1"
  //             : styles.fullScreen
  //             ? "mx-2 px-1"
  //             : "mx-4 px-2"
  //         }`}
  //       >
  //         <motion.div
  //           whileHover={{ scale: 1.02 }}
  //           whileTap={{ scale: 0.98 }}
  //           className={`flex items-center justify-between border border-green-800 bg-white rounded-xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-200`}
  //           onClick={() => setMode("chat")}
  //         >
  //           <div className="flex items-center space-x-3">
  //             <div
  //               className={`bg-green-100 ${styles.cardPadding} rounded-full`}
  //             >
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className={`${styles.iconSize} text-green-600`}
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth={2}
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               >
  //                 <rect x="4" y="7" width="16" height="10" rx="2" ry="2" />
  //                 <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
  //                 <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
  //                 <path d="M9 17v2h6v-2" />
  //                 <path d="M2 11h1" />
  //                 <path d="M21 11h1" />
  //               </svg>
  //             </div>
  //             <span className={`text-gray-800 font-medium ${styles.textSize}`}>
  //               Need AI Assistant
  //             </span>
  //           </div>
  //           <di className="text-gray-400 text-lg">›</di
  //         </motion.div>

  //         <motion.div
  //           whileHover={{ scale: 1.02 }}
  //           whileTap={{ scale: 0.98 }}
  //           className={`flex items-center mt-2 border border-green-800 justify-between bg-white rounded-xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-200`}
  //           onClick={() => setMode("human")}
  //         >
  //           <div className="flex items-center space-x-3">
  //             <div
  //               className={`bg-green-100 ${styles.cardPadding} rounded-full`}
  //             >
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className={`${styles.iconSize} text-green-600`}
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth={2}
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               >
  //                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  //               </svg>
  //             </div>
  //             <span className={`text-gray-800 font-medium ${styles.textSize}`}>
  //               Chat with us now
  //             </span>
  //           </div>
  //           <div className="text-gray-400 text-lg">›</div>
  //         </motion.div>
  //       </div>

  //       {/* Bottom section */}
  //       <div
  //         className={`bg-gray-50 mt-4 pb-4 ${
  //           styles.fullScreen ? "flex-1" : ""
  //         }`}
  //       >
  //         <div className="flex border-t border-gray-200">
  //           <button
  //             className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-green-600 bg-white`}
  //           >
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               className={`${styles.iconSize} mb-1`}
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               stroke="currentColor"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M3 12l2-2m0 0l7-7 7 7m-7-7v18"
  //               />
  //             </svg>
  //             <span
  //               className={`${styles.subtitleSize} font-medium`}
  //               onClick={handleAi}
  //             >
  //               Home
  //             </span>
  //             <div className="w-8 h-0.5 bg-green-600 mt-1 rounded-full"></div>
  //           </button>
  //           <button
  //             onClick={() => setMode("human")}
  //             className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-gray-400 hover:text-green-600 transition-colors`}
  //           >
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               className={`${styles.iconSize} mb-1`}
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               stroke="currentColor"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2z"
  //               />
  //             </svg>
  //             <span className={styles.subtitleSize}>Conversation</span>
  //           </button>
  //         </div>

  //         <div className="text-center mt-2">
  //           <span className={`${styles.subtitleSize} text-gray-400`}>
  //             ⚡ Driven by Jaimax
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }



  if (!mode) {
  return (
    <div
      className={`${styles.containerClass} overflow-hidden bg-white z-50 ${
        styles.fullScreen ? "min-h-screen" : "h-auto"
      } rounded-2xl shadow-2xl`}
    >
      {/* Header */}
      <div
        className={`bg-gradient-to-r from-[#085056] to-[#0b646e] ${styles.headerHeight} flex flex-col items-center justify-center text-white relative`}
      >
        {/* Logo */}
        <div
          className={`${styles.logoWidth} rounded-full flex items-center justify-center p-2`}
        >
          <img
            src={JaimaxLogo}
            alt="Logo"
            className="object-contain max-w-full h-auto"
          />
        </div>

        <h1 className={`${styles.titleSize} font-bold mt-6 tracking-wide`}>
          Jaimax
        </h1>
        <p
          className={`text-green-100 ${styles.subtitleSize} mt-1 px-4 text-center`}
        >
          We are here to help you!
        </p>

        {/* Connection Status */}
        <div className="absolute bottom-4 left-4">
          <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
        </div>

        {/* Back button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            title="Back"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full px-4 py-2 shadow-lg transition-all duration-300 backdrop-blur-sm"
          >
            <IoArrowBack size={20} />
            <span className="text-sm">Back</span>
          </button>
        </div>
      </div>

      {/* Chat cards */}
      <div
        className={`relative -mt-6 ${
          styles.isExtraSmall
            ? "mx-1 px-1"
            : styles.fullScreen
            ? "mx-2 px-1"
            : "mx-4 px-2"
        }`}
      >
        {/* AI Assistant Card */}
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-between border border-green-700 bg-white rounded-xl shadow-md ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-300`}
         onClick={() => setMode("chat")}
          
        >
          <div className="flex items-center space-x-3">
            <div
              className={`bg-green-100 ${styles.cardPadding} rounded-full shadow-inner`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.iconSize} text-green-600`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="7" width="16" height="10" rx="2" ry="2" />
                <circle cx="8.5" cy="12" r="1.5" fill="currentColor" />
                <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
                <path d="M9 17v2h6v-2" />
                <path d="M2 11h1" />
                <path d="M21 11h1" />
              </svg>
            </div>
            <span className={`text-gray-800 font-semibold ${styles.textSize}`}>
              Need AI Assistant
            </span>
          </div>
          <div className="text-gray-400 text-lg">›</div>
        </motion.div>

        {/* Human Chat Card */}
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center mt-3 border border-green-700 justify-between bg-white rounded-xl shadow-md ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-300`}
          onClick={() => setMode("human")}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`bg-green-100 ${styles.cardPadding} rounded-full shadow-inner`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.iconSize} text-green-600`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className={`text-gray-800 font-semibold ${styles.textSize}`}>
              Chat with us now
            </span>
          </div>
          <div className="text-gray-400 text-lg">›</div>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div
        className={`bg-gray-50 mt-4 pb-4 ${
          styles.fullScreen ? "flex-1" : ""
        } rounded-t-xl`}
      >
        <div className="flex border-t border-gray-200">
          <button
            className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-green-600 bg-white hover:bg-green-50 transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.iconSize} mb-1`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7m-7-7v18"
              />
            </svg>
            <span
              className={`${styles.subtitleSize} font-medium`}
              onClick={handleAi}
            >
              Home
            </span>
            <div className="w-8 h-0.5 bg-green-600 mt-1 rounded-full"></div>
          </button>
          <button
            onClick={() => setMode("human")}
            className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.iconSize} mb-1`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2z"
              />
            </svg>
            <span className={styles.subtitleSize}>Conversation</span>
          </button>
        </div>

        <div className="text-center mt-2">
          <span className={`${styles.subtitleSize} text-gray-400`}>
            ⚡ Driven by Jaimax
          </span>
        </div>
      </div>
    </div>
  );
}

  if (mode === "human") {
    return <HumantAssistant onclose={onClose} />;
  }

  // AI Chat Assistant
  // return (
  //   <div
  //     onClick={handleWrapperClick}
  //     className={`${styles.containerClass} ${styles.shadow} bg-white flex flex-col overflow-hidden z-50 font-sans ${styles.fullScreen ? "min-h-screen" : ""}`}
  //   >
  //     {/* Header */}
  //     <div
  //       className={`${styles.headerPadding} flex items-center justify-between text-white ${styles.fullScreen ? "sticky top-0 z-10" : ""}`}
  //       style={{ backgroundColor: "#085056" }}
  //     >
  //       <div className="flex items-center">
  //         <img
  //           src={logo}
  //           alt="agent"
  //           className={`${styles.buttonSize} rounded-full mr-3`}
  //         />
  //         <div>
  //           <p className={`font-semibold leading-tight ${styles.textSize}`}>
  //             JAIMAX AI
  //           </p>
  //           <div className="flex items-center space-x-2">
  //             <p className={`${styles.subtitleSize} opacity-90`}>
  //               {!isTypingComplete ? "Typing..." : isSending ? "Processing..." : "Ready to help!"}
  //             </p>
  //             <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Menu */}
  //       <div className="relative">
  //         <button
  //           ref={toggleRef}
  //           onClick={toggleMenu}
  //           className={`text-white text-3xl ${styles.inputPadding} rounded-full transition-all duration-200 hover:bg-white/10`}
  //         >
  //           ⋮
  //         </button>
  //         <AnimatePresence>
  //           {menuOpen && (
  //             <motion.div
  //               ref={menuRef}
  //               initial={{ opacity: 0, scale: 0.95, y: -10 }}
  //               animate={{ opacity: 1, scale: 1, y: 0 }}
  //               exit={{ opacity: 0, scale: 0.95, y: -10 }}
  //               transition={{ duration: 0.2 }}
  //               className={`absolute right-0 top-8 ${styles.menuWidth} shadow-2xl border border-white/20 rounded-2xl z-50 backdrop-blur-md`}
  //               style={{ backgroundColor: "#085056" }}
  //             >
  //               <div className="relative z-10">
  //                 <button
  //                   onClick={handleCloseConversation}
  //                   className={`group flex items-center gap-3 w-full ${styles.menuPadding} mb-1 ${styles.menuTextSize} text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200`}
  //                 >
  //                   <XCircle
  //                     className={`${styles.menuIconSize} text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200`}
  //                   />
  //                   <span className="font-medium">Close conversation</span>
  //                 </button>

  //                 <button
  //                   onClick={handleDeleteConversation}
  //                   className={`group flex items-center gap-3 w-full ${styles.menuPadding} ${styles.menuTextSize} text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200`}
  //                 >
  //                   <Trash2
  //                     className={`${styles.menuIconSize} text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200`}
  //                   />
  //                   <span className="font-medium">Clear chat</span>
  //                 </button>
  //               </div>
  //             </motion.div>
  //           )}
  //         </AnimatePresence>
  //       </div>
  //     </div>

  //     {/* Chat Messages */}
  //     <div
  //       className={`flex-1 ${styles.chatPadding} overflow-y-auto bg-white space-y-2 ${styles.fullScreen ? "pb-safe" : ""}`}
  //       style={styles.chatHeight ? { maxHeight: styles.chatHeight } : {}}
  //     >
  //       <AnimatePresence initial={false}>
  //         {messages.map((msg) => (
  //           <motion.div
  //             key={msg.id}
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             exit={{ opacity: 0, y: -20 }}
  //             transition={{ duration: 0.3 }}
  //             className={`${styles.messageTextSize} break-words relative ${
  //               msg.from === "bot"
  //                 ? `self-start ${styles.maxMessageWidth}`
  //                 : `self-end ml-auto ${styles.maxMessageWidth}`
  //             }`}
  //             style={{
  //               fontSize:
  //                 msg.text.length > 100
  //                   ? styles.isExtraSmall
  //                     ? "7px"
  //                     : screenSize.width <= 425
  //                     ? "8px"
  //                     : "11px"
  //                   : undefined,
  //               width: "fit-content",
  //             }}
  //           >
  //             <div
  //               className={`rounded-xl ${styles.inputPadding} ${
  //                 msg.from === "bot"
  //                   ? msg.isError
  //                     ? "bg-red-50 text-red-800 border border-red-200"
  //                     : msg.isTemporary
  //                     ? "bg-blue-50 text-blue-700 animate-pulse"
  //                     : "bg-gray-100 text-gray-800"
  //                   : "bg-[#085056] text-white"
  //               } ${msg.isTemporary ? "opacity-70" : ""}`}
  //               style={{ fontSize: "16px" }}
  //             >
  //               {msg.text}
  //             </div>
  //             <div
  //               className={`${
  //                 styles.isExtraSmall ? "text-[8px]" : "text-[10px]"
  //               } mt-1 opacity-50 text-right`}
  //             >
  //               {msg.time}
  //             </div>
  //           </motion.div>
  //         ))}
  //       </AnimatePresence>

  //       {/* Real-time Typing Message */}
  //       <AnimatePresence>
  //         {typingMessage && (
  //           <motion.div
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             exit={{ opacity: 0, y: -20 }}
  //             transition={{ duration: 0.3 }}
  //             className={`${styles.messageTextSize} break-words relative self-start ${styles.maxMessageWidth}`}
  //             style={{ width: "fit-content" }}
  //           >
  //             <div
  //               className={`rounded-xl ${styles.inputPadding} bg-gray-100 text-gray-800`}
  //               style={{ fontSize: "16px", minHeight: "24px" }}
  //             >
  //               {typingMessage.text || ""}
  //             </div>
  //             <div
  //               className={`${
  //                 styles.isExtraSmall ? "text-[8px]" : "text-[10px]"
  //               } mt-1 opacity-50 text-right`}
  //             >
  //               {typingMessage.time}
  //             </div>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>

  //       <div ref={chatEndRef} />
  //     </div>

  //     {/* Input Area */}
  //     <div
  //       style={{ borderColor: "rgba(8, 80, 86, 0.6)" }}
  //       className={`flex items-center bg-white/90 backdrop-blur-sm ${styles.inputPadding} ${
  //         styles.fullScreen
  //           ? "sticky bottom-0 rounded-none border-t"
  //           : "rounded-2xl"
  //       } shadow-lg border border-red-200/60 border-[2px] hover:shadow-xl transition-all duration-300 focus-within:shadow-xl focus-within:border-blue-400/60 max-w-full ${
  //         !isOnline ? "opacity-60" : ""
  //       }`}
  //     >
  //       <button
  //         onClick={handleVoiceInput}
  //         title={isListening ? "Stop voice input" : "Start voice input"}
  //         disabled={isSending || !isOnline || !isTypingComplete}
  //         className={`
  //           flex items-center justify-center ${styles.buttonSize} rounded-xl
  //           transition-all duration-200 hover:scale-105 active:scale-95
  //           ${
  //             isListening
  //               ? "bg-blue-500 text-white shadow-md animate-pulse"
  //               : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
  //           }
  //           ${isSending || !isOnline || !isTypingComplete ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  //         `}
  //       >
  //         {isListening ? (
  //           <MicOff className={styles.iconSize} />
  //         ) : (
  //           <Mic className={styles.iconSize} />
  //         )}
  //       </button>

  //       <input
  //         type="text"
  //         placeholder={
  //           !isTypingComplete
  //             ? "AI is typing..."
  //             : !isOnline
  //             ? "No internet connection..."
  //             : isSending
  //             ? "Sending message..."
  //             : "Type your message..."
  //         }
  //         className={`flex-1 ${styles.inputTextSize} ${styles.inputPadding} mx-3 bg-transparent focus:outline-none placeholder-gray-400 text-gray-800 min-w-0`}
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //         onKeyDown={handleKeyDown}
  //         disabled={isSending || !isOnline || !isTypingComplete}
  //         maxLength={1000}
  //       />

  //       <div className="flex items-center gap-2">
  //         <button
  //           title={canSend ? "Send message" : "Complete your message first"}
  //           onClick={() => sendMessage(input)}
  //           disabled={!canSend}
  //           className={`flex items-center justify-center ${styles.buttonSize} rounded-xl transition-all duration-200 shadow-md ${
  //             canSend
  //               ? "bg-[#085056] hover:bg-blue-600 cursor-pointer hover:scale-105 active:scale-95"
  //               : "bg-gray-300 cursor-not-allowed opacity-50"
  //           }`}
  //         >
  //           {isSending ? (
  //             <Loader2
  //               className={`${styles.iconSize} animate-spin text-gray-200`}
  //             />
  //           ) : (
  //             <Send className={`${styles.iconSize} ${canSend ? "text-white" : "text-gray-500"}`} />
  //           )}
  //         </button>
  //       </div>
  //     </div>

  //     {/* Character Count and Status */}
  //     <div className="flex justify-between items-center px-4 py-1">
  //       {input.length > 800 && (
  //         <span className={`${styles.subtitleSize} ${input.length > 950 ? 'text-red-500' : 'text-yellow-500'}`}>
  //           {input.length}/1000
  //         </span>
  //       )}
  //       <div className={`${styles.subtitleSize} text-gray-400 ml-auto`}>
  //         {!isTypingComplete ? "⏳ Please wait for AI to finish..." :
  //          !canSend && input.trim() ? "💬 Ready to send" : ""}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div
      onClick={handleWrapperClick}
      className={`${styles.containerClass} ${
        styles.shadow
      } bg-white flex flex-col overflow-hidden z-50 font-sans ${
        styles.fullScreen ? "min-h-screen" : ""
      }`}
    >
      {/* HEADER */}
      <div
        className={`px-4 py-3 flex items-center justify-between shadow-md ${
          styles.fullScreen ? "sticky top-0 z-10" : ""
        }`}
        style={{ backgroundColor: "#085056" }}
      >
        {/* Left: Avatar + Title */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="agent"
            className="w-10 h-10 rounded-full border border-white/20 mr-3"
          />
          <div>
            <p className="font-bold text-lg text-white">JAIMAX AI</p>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-green-200 italic">
                {!isTypingComplete
                  ? "Typing..."
                  : isSending
                  ? "Processing..."
                  : "Ai Assistant"}
              </p>
              <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
            </div>
          </div>
        </div>

        {/* Right: Menu */}
        <div className="relative">
          <button
            ref={toggleRef}
            onClick={toggleMenu}
            className="p-1 rounded-full hover:bg-white/10 transition text-2xl text-white"
          >
            ⋮
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-10 w-52 bg-[#085056] rounded-xl z-50 shadow-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={handleCloseConversation}
                  className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-white/5"
                >
                  <XCircle className="w-4 h-4 text-red-400 mr-2" />
                  Close conversation
                </button>
                <button
                  onClick={handleDeleteConversation}
                  className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-white/5"
                >
                  <Trash2 className="w-4 h-4 text-red-400 mr-2" />
                  Clear chat
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CHAT AREA */}
      <div
        className={`flex-1 px-4 py-3 overflow-y-auto bg-gray-50 space-y-3`}
        style={styles.chatHeight ? { maxHeight: styles.chatHeight } : {}}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.from === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`relative px-4 py-2 rounded-2xl shadow-sm max-w-[80%] ${
                  msg.from === "bot"
                    ? msg.isError
                      ? "bg-red-100 text-red-700"
                      : msg.isTemporary
                      ? "bg-blue-50 text-blue-700 animate-pulse"
                      : "bg-white text-gray-800"
                    : "bg-[#085056] text-white"
                }`}
              >
                {msg.text}
                <span className="absolute bottom-0 right-2 text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition">
                  {msg.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {typingMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
              {typingMessage.text}
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* INPUT BAR */}
      <div className="bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2">
        {/* Voice Button */}
        <button
          onClick={handleVoiceInput}
          disabled={isSending || !isOnline || !isTypingComplete}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            isListening
              ? "bg-blue-500 text-white animate-pulse"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder={
            !isTypingComplete
              ? "AI is typing..."
              : !isOnline
              ? "Offline..."
              : "Type your message..."
          }
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending || !isOnline || !isTypingComplete}
        />

        {/* Send Button */}
        <button
          onClick={() => sendMessage(input)}
          disabled={!canSend}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            canSend
              ? "bg-[#085056] hover:bg-teal-700 text-white"
              : "bg-gray-300 cursor-not-allowed"
          } transition`}
        >
          {isSending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;

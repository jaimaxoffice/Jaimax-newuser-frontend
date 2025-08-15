
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
import logo from "../../assets/Images/whiteIcon.png";
import SupportBot from "./humanassistant";
import HumantAssistant from "./humanassistant";
import { useNavigate } from "react-router-dom";

import { IoClose } from "react-icons/io5"; 
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
  const inputRef = useRef(null);
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
    responseTimeoutRef.current = setTimeout(typeNextChar, 80);
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
          // response.answer || "🤖 Sorry, I couldn't find an answer.",
          response.answer || "🤖 Sorry, I couldn't find an answer. I'm in the learning stage and will improve over time.",
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



//   if (!mode) {
//   return (
//     <div
//       className={`${styles.containerClass} overflow-hidden bg-white z-50 ${
//         styles.fullScreen ? "min-h-screen" : "h-auto"
//       } rounded-2xl shadow-2xl mt-6`}
//     >
//       {/* Header */}
//       <div
//         className={`bg-gradient-to-r from-[#085056] to-[#0b646e] ${styles.headerHeight} flex flex-col items-center justify-center text-white relative`}
//       >
//         {/* Logo */}
//         <div
//           className={`${styles.logoWidth} rounded-full flex items-center justify-center p-2`}
//         >
//           <img
//             src={JaimaxLogo}
//             alt="Logo"
//             className="object-contain max-w-full h-auto"
//           />
//         </div>

//         <h1 className={`${styles.titleSize} font-bold mt-6 tracking-wide`}>
//           Jaimax
//         </h1>
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
//             className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full px-4 py-2 shadow-lg transition-all duration-300 backdrop-blur-sm"
//           >
//             <IoArrowBack size={20} />
//             <span className="text-sm">Back</span>
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
//         {/* AI Assistant Card */}
//         <motion.div
//           whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
//           whileTap={{ scale: 0.98 }}
//           className={`flex items-center justify-between border border-green-700 bg-white rounded-xl shadow-md ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-300`}
//          onClick={() => setMode("chat")}
          
//         >
//           <div className="flex items-center space-x-3">
//             <div
//               className={`bg-green-100 ${styles.cardPadding} rounded-full shadow-inner`}
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
//             <span className={`text-gray-800 font-semibold ${styles.textSize}`}>
//               Need AI Assistant
//             </span>
//           </div>
//           <div className="text-gray-400 text-lg">›</div>
//         </motion.div>

//         {/* Human Chat Card */}
//         <motion.div
//           whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
//           whileTap={{ scale: 0.98 }}
//           className={`flex items-center mt-3 border border-green-700 justify-between bg-white rounded-xl shadow-md ${styles.cardPadding} cursor-pointer hover:shadow-xl transition-all duration-300`}
//           onClick={() => setMode("human")}
//         >
//           <div className="flex items-center space-x-3">
//             <div
//               className={`bg-green-100 ${styles.cardPadding} rounded-full shadow-inner`}
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
//             <span className={`text-gray-800 font-semibold ${styles.textSize}`}>
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
//         } rounded-t-xl`}
//       >
//         <div className="flex border-t border-gray-200">
//           <button
//             className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-green-600 bg-white hover:bg-green-50 transition-colors`}
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
//             className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors`}
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
      className={`${styles.containerClass} overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50 z-50 ${
        styles.fullScreen ? "min-h-screen" : "h-auto"
      } rounded-none sm:rounded-2xl lg:rounded-3xl shadow-none sm:shadow-2xl lg:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] mt-0 sm:mt-6 `}
    >
      {/* Header */}
      <div
        className={`bg-gradient-to-br from-[#085056] via-[#0b646e] to-[#0d7377] ${styles.headerHeight} flex flex-col items-center justify-center text-white relative overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-2xl"></div>
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`${styles.logoWidth} rounded-full flex items-center justify-center p-3  transition-all duration-300`}
        >
          <img
            src={JaimaxLogo}
            alt="Logo"
            className="object-contain max-w-full h-auto filter drop-shadow-sm"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${styles.titleSize} font-bold mt-6 tracking-wide text-white drop-shadow-sm`}
        >
          JAIMAX
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-green-100 ${styles.subtitleSize} mt-2 px-4 text-center drop-shadow-sm`}
        >
          We are here to help you!
        </motion.p>

        {/* Connection Status */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-4 left-4"
        >
          <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
        </motion.div>

        {/* Back button */}
   <motion.div
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="absolute top-4 right-4"
>
  <button
    onClick={onClose}
    title="Close"
    className="flex items-center justify-center bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-medium rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95"
  >
    <IoClose size={20} />
  </button>
</motion.div>
      </div>

      {/* Chat cards */}
      <div
        className={`relative -mt-8 ${
          styles.isExtraSmall
            ? "mx-2 px-2"
            : styles.fullScreen
            ? "mx-4 px-2"
            : "mx-4 px-2"
        }`}
      >
        {/* AI Assistant Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{
            scale: 1.02,
            y: -4,
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
          }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-between border-2 border-green-200/60 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-2xl hover:border-green-300/80 transition-all duration-300 group relative overflow-hidden`}
          onClick={() => setMode("chat")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/0 to-green-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex items-center space-x-4 relative z-10">
            <div
              className={`bg-gradient-to-br from-green-100 to-green-200 ${styles.cardPadding} rounded-2xl shadow-inner border border-green-200/50 group-hover:shadow-md transition-all duration-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.iconSize} text-green-600 group-hover:text-green-700 transition-colors duration-300`}
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
            <div>
              <span
                className={`text-gray-800 font-bold ${styles.textSize} group-hover:text-gray-900 transition-colors duration-300`}
              >
                Need AI Assistant
              </span>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-600 transition-colors duration-300">
                Get instant AI-powered help
              </p>
            </div>
          </div>
          <div className="text-gray-400 text-2xl group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300 relative z-10">
            ›
          </div>
        </motion.div>

        {/* Human Chat Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{
            scale: 1.02,
            y: -4,
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
          }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center mt-4 border-2 border-green-200/60 justify-between bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg ${styles.cardPadding} cursor-pointer hover:shadow-2xl hover:border-green-300/80 transition-all duration-300 group relative overflow-hidden`}
          onClick={() => setMode("human")}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex items-center space-x-4 relative z-10">
            <div
              className={`bg-gradient-to-br from-blue-100 to-blue-200 ${styles.cardPadding} rounded-2xl shadow-inner border border-blue-200/50 group-hover:shadow-md transition-all duration-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.iconSize} text-blue-600 group-hover:text-blue-700 transition-colors duration-300`}
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
            <div>
              <span
                className={`text-gray-800 font-bold ${styles.textSize} group-hover:text-gray-900 transition-colors duration-300`}
              >
                Chat with us now
              </span>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-600 transition-colors duration-300">
                Connect with our support team
              </p>
            </div>
          </div>
          <div className="text-gray-400 text-2xl group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 relative z-10">
            ›
          </div>
        </motion.div>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className={`bg-gradient-to-r from-gray-50 via-white to-gray-50 mt-2 pb-2 ${
          styles.fullScreen ? "flex-1" : ""
        } rounded-t-3xl border-t border-gray-200/50`}
      >
        <div className="flex border-t border-gray-200/30 bg-white/50 backdrop-blur-sm">
          <button
            className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-green-600 bg-gradient-to-b from-white to-green-50/30 hover:from-green-50 hover:to-green-100/50 transition-all duration-300 hover:shadow-inner border-r border-gray-200/30`}
            onClick={handleAi} // Moved here for proper click handling
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.iconSize} mb-1 transition-transform duration-300 hover:scale-110`}
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
            </div>
            <span className={`${styles.subtitleSize} font-semibold transition-colors duration-300`}>
              Home
            </span>
            <motion.div
              className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-600 mt-2 rounded-full shadow-sm"
              layoutId="activeTab"
            ></motion.div>
          </button>
          <button
            onClick={() => setMode("human")}
            className={`flex-1 ${styles.buttonPadding} flex flex-col items-center text-gray-400 hover:text-green-600 hover:bg-gradient-to-b hover:from-green-50/30 hover:to-green-100/50 transition-all duration-300`}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.iconSize} mb-1 transition-transform duration-300 hover:scale-110`}
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
            </div>
            <span className={`${styles.subtitleSize} font-semibold transition-colors duration-300`}>
              Conversation
            </span>
          </button>
        </div>

        <div className="text-center mt-4 px-4">
          <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2 ">
            <span className="text-yellow-500 animate-pulse">⚡</span>
            <span className={`${styles.subtitleSize} text-[#085056] font-medium`}>
              Powered by Jaimax
            </span>
          </div>
        </div>
      </motion.div>
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
  // return (
  //   <div
  //     onClick={handleWrapperClick}
  //     className={`${styles.containerClass} ${
  //       styles.shadow
  //     } bg-white flex flex-col overflow-hidden z-50 font-sans ${
  //       styles.fullScreen ? "min-h-screen" : ""
  //     }`}
  //   >
  //     {/* HEADER */}
  //     <div
  //       className={`px-4 py-3 flex items-center justify-between shadow-md ${
  //         styles.fullScreen ? "sticky top-0 z-10" : ""
  //       }`}
  //       style={{ backgroundColor: "#085056" }}
  //     >
  //       {/* Left: Avatar + Title */}
  //       <div className="flex items-center">
  //         <img
  //           src={logo}
  //           alt="agent"
  //           className="w-10 h-10 rounded-full border border-white/20 mr-3"
  //         />
  //         <div>
  //           <p className="font-bold text-lg text-white">JAIMAX AI</p>
  //           <div className="flex items-center space-x-2">
  //             <p className="text-xs text-green-200 ">
  //               {!isTypingComplete
  //                 ? "Typing..."
  //                 : isSending
  //                 ? "Processing..."
  //                 : "Ai Assistant"}
  //             </p>
  //             <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Right: Menu */}
  //       <div className="relative">
  //         <button
  //           ref={toggleRef}
  //           onClick={toggleMenu}
  //           className="p-1 rounded-full hover:bg-white/10 transition text-2xl text-white"
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
  //               className="absolute right-0 top-10 w-52 bg-[#085056] rounded-xl z-50 shadow-lg border border-gray-700 overflow-hidden"
  //             >
  //               <button
  //                 onClick={handleCloseConversation}
  //                 className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-white/5"
  //               >
  //                 <XCircle className="w-4 h-4 text-red-400 mr-2" />
  //                 Close conversation
  //               </button>
  //               <button
  //                 onClick={handleDeleteConversation}
  //                 className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-white/5"
  //               >
  //                 <Trash2 className="w-4 h-4 text-red-400 mr-2" />
  //                 Clear chat
  //               </button>
  //             </motion.div>
  //           )}
  //         </AnimatePresence>
  //       </div>
  //     </div>

  //     {/* CHAT AREA */}
  //     <div
  //       className={`flex-1 px-4 py-3 overflow-y-auto bg-gray-50 space-y-3`}
  //       style={styles.chatHeight ? { maxHeight: styles.chatHeight } : {}}
  //     >
  //       <AnimatePresence initial={false}>
  //         {messages.map((msg) => (
  //           <motion.div
  //             key={msg.id}
  //             initial={{ opacity: 0, y: 15 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.3 }}
  //             className={`flex ${
  //               msg.from === "bot" ? "justify-start" : "justify-end"
  //             }`}
  //           >
  //             <div
  //               className={`relative px-4 py-2 rounded-2xl shadow-sm max-w-[80%] ${
  //                 msg.from === "bot"
  //                   ? msg.isError
  //                     ? "bg-red-100 text-red-700"
  //                     : msg.isTemporary
  //                     ? "bg-blue-50 text-blue-700 animate-pulse"
  //                     : "bg-white text-gray-800"
  //                   : "bg-[#085056] text-white"
  //               }`}
  //             >
  //               {msg.text}
  //               <span className="absolute bottom-0 right-2 text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition">
  //                 {msg.time}
  //               </span>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </AnimatePresence>

  //       {/* Typing Indicator */}
  //       {typingMessage && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 15 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           className="flex justify-start"
  //         >
  //           <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
  //             {typingMessage.text}
  //           </div>
  //         </motion.div>
  //       )}
  //       <div ref={chatEndRef}></div>
  //     </div>

  //     {/* INPUT BAR */}
  //     <div className="bg-white border-t border-gray-200 px-3 py-3 flex items-center gap-2">
  //       {/* Voice Button */}
  //       <button
  //         onClick={handleVoiceInput}
  //         disabled={isSending || !isOnline || !isTypingComplete}
  //         className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
  //           isListening
  //             ? "bg-blue-500 text-white animate-pulse"
  //             : "bg-gray-100 text-gray-500 hover:bg-gray-200"
  //         }`}
  //       >
  //         {isListening ? <MicOff size={18} /> : <Mic size={18} />}
  //       </button>

  //       {/* Input */}
  //       <input
  //         type="text"
  //         placeholder={
  //           !isTypingComplete
  //             ? "AI is typing..."
  //             : !isOnline
  //             ? "Offline..."
  //             : "Type your message..."
  //         }
  //         className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none text-sm"
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //         onKeyDown={handleKeyDown}
  //         disabled={isSending || !isOnline || !isTypingComplete}
  //       />

  //       {/* Send Button */}
  //       <button
  //         onClick={() => sendMessage(input)}
  //         disabled={!canSend}
  //         className={`flex items-center justify-center w-10 h-10 rounded-full ${
  //           canSend
  //             ? "bg-[#085056] hover:bg-teal-700 text-white"
  //             : "bg-gray-300 cursor-not-allowed"
  //         } transition`}
  //       >
  //         {isSending ? (
  //           <Loader2 className="w-5 h-5 animate-spin" />
  //         ) : (
  //           <Send className="w-5 h-5" />
  //         )}
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
  <motion.div
    onClick={handleWrapperClick}
    className={`${styles.containerClass} ${
      styles.shadow
    } bg-gradient-to-br from-white via-gray-50 to-white flex flex-col overflow-hidden z-50 font-sans rounded-2xl backdrop-blur-sm ${
      styles.fullScreen ? "min-h-screen" : ""
    }`}
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
  >
    {/* ENHANCED HEADER */}
    <motion.div
      className={`px-6 py-4 flex items-center justify-between relative ${
        styles.fullScreen ? "sticky top-0 z-10" : ""
      }`}
      style={{ 
        background: 'linear-gradient(135deg, #085056 0%, #0a6b73 50%, #0d7f88 100%)',
      }}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Floating particles background */}
      {/* <div className="absolute inset-0 overflow-hidden rounded-t-2xl">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div> */}

      {/* Left: Enhanced Avatar + Title */}
      <div className="flex items-center relative z-10">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.08, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={logo}
            alt="agent"
            className="w-12 h-12 rounded-full border-2 mr-4 "
          />
          {/* Status indicator */}
          {/* <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          /> */}
        </motion.div>
        
        <div>
          <motion.p 
            className="font-bold text-xl text-white tracking-wide drop-shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            JAIMAX AI
          </motion.p>
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <p className="text-sm text-emerald-200 font-medium">
              {!isTypingComplete
                ? "✨ Thinking..."
                : isSending
                ? "⏳  Processing..."
                : "🤖 AI Assistant"}
            </p>
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
            </motion.div> */}
          </motion.div>
        </div>
      </div>

      {/* Right: Enhanced Menu */}
      <div className="relative z-10">
        <motion.button
          ref={toggleRef}
          onClick={toggleMenu}
          className="p-2 rounded-xl hover:bg-white/15 transition-all duration-200 text-white group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            ⋮
          </motion.div>
          <div className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200" />
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
              className="absolute right-0 top-12 w-56 bg-white/95 backdrop-blur-xl rounded-2xl z-50 shadow-2xl border border-gray-200/50 overflow-hidden"
            >
              <div className="p-1">
                <motion.button
                  onClick={handleCloseConversation}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-xl transition-all duration-200 group"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <XCircle className="w-4 h-4 text-red-500 mr-3 group-hover:scale-110 transition-transform" />
                  Close conversation
                </motion.button>
                <motion.button
                  onClick={handleDeleteConversation}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-xl transition-all duration-200 group"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-4 h-4 text-red-500 mr-3 group-hover:scale-110 transition-transform" />
                  Clear chat
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>

    {/* ENHANCED CHAT AREA */}
    <div
      className={`flex-1 px-6 py-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}
      style={styles.chatHeight ? { maxHeight: styles.chatHeight } : {}}
    >
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200 
            }}
            className={`flex ${
              msg.from === "bot" ? "justify-start" : "justify-end"
            } group`}
          >
            <motion.div
              className={`relative px-6 py-3 rounded-2xl shadow-lg max-w-[85%] backdrop-blur-sm ${
                msg.from === "bot"
                  ? msg.isError
                    ? "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200"
                    : msg.isTemporary
                    ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 animate-pulse border border-blue-200"
                    : "bg-gradient-to-r from-white to-gray-50 text-gray-800 border border-gray-200/50 shadow-xl"
                  : "bg-gradient-to-r from-[#085056] to-[#0a6b73] text-white shadow-xl"
              }`}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Message bubble tail */}
              <div
                className={`absolute top-4 w-3 h-3 rotate-45 ${
                  msg.from === "bot"
                    ? msg.isError
                      ? "bg-red-100 -left-1.5 border-l border-t border-red-200"
                      : msg.isTemporary
                      ? "bg-blue-100 -left-1.5 border-l border-t border-blue-200"
                      : "bg-white -left-1.5 border-l border-t border-gray-200/50"
                    : "bg-[#085056] -right-1.5"
                }`}
              />
              
              <div className="relative z-10">
                {msg.text}
              </div>
              
              <motion.span 
                className="absolute -bottom-6 right-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                {msg.time}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Enhanced Typing Indicator */}
      {typingMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex justify-start"
        >
          <motion.div 
            className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 px-6 py-3 rounded-2xl shadow-lg border border-gray-200/50 backdrop-blur-sm"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <span className="ml-2">{typingMessage.text}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div ref={chatEndRef}></div>
    </div>

    {/* ENHANCED INPUT BAR */}
    <motion.div 
      className="bg-white/80 backdrop-blur-xl border-t border-[#085056] px-4 py-4 flex items-center gap-3"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Enhanced Voice Button */}
      <motion.button
        onClick={handleVoiceInput}
        disabled={isSending || !isOnline || !isTypingComplete}
        className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
          isListening
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 hover:from-gray-200 hover:to-gray-100 shadow-md"
        }`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? { 
          boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 10px rgba(59, 130, 246, 0)"]
        } : {}}
        transition={isListening ? { duration: 1, repeat: Infinity } : {}}
      >
        <motion.div
          animate={{ rotate: isListening ? 360 : 0 }}
          transition={{ duration: 2, repeat: isListening ? Infinity : 0, ease: "linear" }}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </motion.div>
        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300" />
      </motion.button>

      {/* Enhanced Input Field */}
      <div className="flex-1 relative">
        <motion.input
          ref={inputRef}
          type="text"
          placeholder={
            !isTypingComplete
              ? "AI is thinking..."
              : !isOnline
              ? "Currently offline..."
              : "Type your message here..."
          }
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-50 to-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#085056]/20 focus:border-[#085056]/30 text-gray-700 shadow-inner border border-gray-200/50 transition-all duration-300 placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending || !isOnline || !isTypingComplete}
          whileFocus={{ scale: 1.02 }}
        />
        {input && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {input.length}/80
          </motion.div>
        )}
      </div>

      {/* Enhanced Send Button */}
      <motion.button
        onClick={() => sendMessage(input)}
        disabled={!canSend}
        className={`flex items-center justify-center w-12 h-12 rounded-2xl relative overflow-hidden group transition-all duration-300 ${
          canSend
            ? "bg-gradient-to-r from-[#085056] to-[#0a6b73] hover:from-[#0a6b73] to-[#0d7f88] text-white shadow-lg"
            : "bg-gradient-to-r from-gray-300 to-gray-200 cursor-not-allowed text-gray-500 shadow-md"
        }`}
        whileHover={canSend ? { scale: 1.05, rotate: -5 } : {}}
        whileTap={canSend ? { scale: 0.95 } : {}}
        animate={isSending ? { 
          boxShadow: ["0 0 0 0 rgba(8, 80, 86, 0.4)", "0 0 0 10px rgba(8, 80, 86, 0)"]
        } : {}}
        transition={isSending ? { duration: 1, repeat: Infinity } : {}}
      >
        <AnimatePresence mode="wait">
          {isSending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="send"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              whileHover={{ x: 2 }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
        {canSend && (
          <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300" />
        )}
      </motion.button>
    </motion.div>
  </motion.div>
);
};

export default ChatAssistant;

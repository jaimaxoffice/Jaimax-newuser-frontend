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
  import { HiArrowLeft, HiX } from "react-icons/hi";

  import SupportBot from "./humanassistant";
  import HumantAssistant from "./humanassistant";
  import { Search, MessageCircle } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  import { HiDotsVertical } from "react-icons/hi";

  import { MdOutlineSupportAgent } from "react-icons/md";
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
    const [TriggerSpeech, setTriggerSpeech] = useState(false);
    const [conversationId] = useState(
      () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    );
    const [screenSize, setScreenSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [showAllFAQs, setShowAllFAQs] = useState(false);
    const [expandedFAQId, setExpandedFAQId] = useState(null);

    const [ChatHistory, setChatHistory] = useState([]);
    console.log(ChatHistory, "ChatHistory  received from user ");
    const navigate = useNavigate();

    console.log(TriggerSpeech, "TriggerSpeech");

    // Sample FAQs data
    const allFAQs = [
      {
        id: 1,
        question: "What is Jaimax?",
        answer:
          "Jaimax is a digital ecosystem built on blockchain to provide secure, fast, and transparent financial transactions through its own cryptocurrency, JMC Coin.",
      },
      {
        id: 2,
        question: "What is an ICO?",
        answer:
          "An ICO (Initial Coin Offering) is a fundraising method where a project sells its own digital tokens to investors in exchange for cryptocurrencies or cash. These tokens can later be used in the project's ecosystem or traded on exchanges once listed.",
      },
      {
        id: 3,
        question: "Is it legal to invest in Jaimax Tokens in India?",
        answer:
          "Yes. Investing in cryptocurrencies like Jaimax Tokens is legal in India. However, such investments are taxable under the Finance Act, 2022. A 30% tax applies on profits, and a 1% TDS is deducted per transaction. Investors must also follow KYC and AML norms through registered exchanges.",
      },
      {
        id: 4,
        question: "How can you say Jaimax is not a scam company?",
        answer:
          "Jaimax operates transparently with verified registration, a clear whitepaper, and funds securely held in regulated bank accounts. It follows compliance standards, ensures investor protection, and maintains open communication about its ICO and token operations.",
      },
      {
        id: 5,
        question: "Does Jaimax have a physical office?",
        answer:
          "Yes, Jaimax has its own physical office, allowing investors and partners to directly connect with the team for any query or verification.",
      },
      {
        id: 6,
        question:
          "Are the funds raised through the ICO locked in a bank, and what's their purpose?",
        answer:
          "Yes, the funds are securely locked in regulated bank accounts to prevent misuse. The lock ensures that money is released only after project milestones are met — such as achieving fundraising goals or launching the token. Raising and exchanging tokens during the ICO helps build token value, investor trust, and regulatory compliance, while the locked funds ensure accountability and safe utilization for project growth.",
      },
      {
        id: 7,
        question:
          "What happens to unsold Jaimax (JMC) tokens after the presale ends?",
        answer:
          "Unsold JMC tokens are managed as per Jaimax's tokenomics policy. Some may be burned to reduce supply and maintain value stability, while others may be reallocated for future ecosystem needs like liquidity pools, staking rewards, or exchange listings. All actions are audited and publicly disclosed on the official website and BSC Scan for transparency.",
      },
      {
        id: 8,
        question:
          "What makes JMC (Jaimax Coin) different from other cryptocurrencies in the market?",
        answer:
          "Unlike most coins that rely only on speculation, JMC is linked to a real business ecosystem under Jaimax, focusing on utility-based token usage in digital marketing, retail, and financial services. Its value is supported by ongoing projects and business growth rather than just market hype.",
      },
      {
        id: 9,
        question:
          "What is FIU-IND and why hasn't Jaimax received permission yet?",
        answer:
          "FIU-IND (Financial Intelligence Unit – India) monitors financial transactions to prevent money laundering and fraud. Jaimax hasn't received FIU-IND approval yet because the company's registration and compliance review process is still under verification by the authorities.",
      },
      {
        id: 10,
        question: "What is a DApp, and how is it different from a normal app?",
        answer:
          "DApp (Decentralized Application) runs on blockchain technology instead of a central server, making it more secure and transparent. Unlike normal apps controlled by one company, DApps are community-driven and tamper-proof. They're expanding across sectors like finance, gaming, tourism, and even Jaimax's own payment gateway system, offering real-world utility and faster, safer digital transactions.",
      },
      {
        id: 11,
        question:
          "What is DeFi (Decentralized Finance), and how is it different from my bank?",
        answer:
          "DeFi (Decentralized Finance) uses blockchain technology to provide financial services like lending, borrowing, and trading without banks or intermediaries. Unlike traditional banks that control and process your money, DeFi lets you directly manage your funds through smart contracts, offering faster transactions, lower fees, and full transparency.",
      },
      {
        id: 12,
        question: "What makes Jaimax unique from other coins?",
        answer:
          "Unlike speculative coins, Jaimax is linked to real business projects — including Block-chain Technology, Social Media Application, J-payment gateway, DApps, Own exchange platform, NFT Platform and De-Finance, giving it practical utility.",
      },
      {
        id: 13,
        question: "What is the main goal of Jaimax?",
        answer:
          "To bridge traditional finance and blockchain innovation by creating a secure, decentralized, and user-friendly digital finance system.",
      },
      {
        id: 14,
        question: "On which blockchain is Jaimax built?",
        answer:
          "Jaimax is built on the Binance Smart Chain (BSC-20) — known for its speed, scalability, and low transaction fees.",
      },
      {
        id: 15,
        question: "What is the total supply of JMC Coins?",
        answer:
          "The total supply is 125 billion coins, with a phased release structure for stability and value growth.",
      },
      {
        id: 16,
        question: "What is a smart contract?",
        answer:
          "A self-executing blockchain program that automatically performs actions (like fund transfers) when certain conditions are met.",
      },
      {
        id: 17,
        question: "Does Jaimax have its own payment gateway?",
        answer:
          "Yes, Jaimax is developing its own crypto payment gateway for faster and borderless transactions.",
      },
      {
        id: 18,
        question: "What is the price range of JMC in ICO?",
        answer: "The ICO price ranges from ₹0.01 to ₹4.10 across five phases.",
      },
      {
        id: 19,
        question: "How can investors buy Jaimax Coins?",
        answer:
          "Investors can buy using USDT, USDC, XRP, TRX, ADA, or INR (via UPI, PhonePe, Google Pay).",
      },
      {
        id: 20,
        question: "Will Jaimax be listed on global exchanges?",
        answer:
          "Yes, plans include listing on PancakeSwap, Uniswap, and major exchanges during later ICO phases.",
      },
      {
        id: 21,
        question: "What is Jaimax's long-term vision?",
        answer:
          "To become a complete crypto ecosystem with its own blockchain, exchange, wallet, and DeFi network.",
      },
      {
        id: 22,
        question: "What happens to unsold tokens after the ICO?",
        answer:
          "Unsold tokens will be burned to reduce supply and maintain long-term value.",
      },
      {
        id: 23,
        question: "Can JMC be used for cross-border payments?",
        answer:
          "Yes, Jaimax enables global, borderless transfers without needing banks or currency conversion delays.",
      },
      {
        id: 24,
        question:
          "If ICO funds are locked in the bank, what's the purpose of raising and exchanging tokens?",
        answer:
          "Locked ICO funds mean the money is kept safely in escrow until project goals are met. Raising and exchanging tokens still helps build market value, investor trust, and compliance, while ensuring funds are used transparently once development milestones are achieved.",
      },
      {
        id: 25,
        question: "What role does DigiLocker play?",
        answer:
          "DigiLocker ensures secure, government-verified KYC for all users joining Jaimax.",
      },
    ];

    const filteredFAQs = searchQuery
      ? allFAQs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allFAQs;

    const displayedFAQs = showAllFAQs ? filteredFAQs : filteredFAQs.slice(0, 3);

    const toggleFAQ = (id) => {
      setExpandedFAQId(expandedFAQId === id ? null : id);
    };

    useEffect(() => {
      if (mode === "chat" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(
          "Welcome to Jaimax! Feel free to ask me anything."
        );
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);

        const intervalId = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            setTriggerSpeech(false);
            clearInterval(intervalId);
          }
        }, 500);

        return () => clearInterval(intervalId);
      }
    }, [mode]);

    useEffect(() => {
      const storedChat = JSON.parse(localStorage.getItem("chatHistory")) || [];
      setChatHistory(storedChat);
    }, []);

    // RTK Query hooks
    const [sendChatMessage, { isLoading: isSending, error: sendError }] =
      useSendChatMessageMutation();
    const [insertUserQuery] = useInsertUserQueryMutation();
    const { data: aiStatus, error: statusError } = useGetAiStatusQuery();
    const [deleteChatConversation] = useDeleteChatConversationMutation();

    // Local state for messages
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
                  text: currentText + "█",
                }
              : null
          );

          currentIndex++;

          const char = fullText[currentIndex - 1];
          let delay = 10;

          if (char === "." || char === "!" || char === "?") {
            delay = 200;
          } else if (char === "," || char === ";") {
            delay = 100;
          } else if (char === " ") {
            delay = 30;
          } else if (char === "\n") {
            delay = 150;
          }

          responseTimeoutRef.current = setTimeout(typeNextChar, delay);
        } else {
          setTypingMessage((prev) =>
            prev
              ? {
                  ...prev,
                  text: currentText,
                }
              : null
          );

          responseTimeoutRef.current = setTimeout(() => {
            setTypingMessage(null);
            setIsTypingComplete(true);
            onComplete(currentText);
          }, 300);
        }
      };

      responseTimeoutRef.current = setTimeout(typeNextChar, 80);
    }, []);

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
      <div className="flex items-center space-x-1 z-10 relative">
        {isOnline ? (
          aiStatus?.status === "healthy" ? (
            <div className="flex items-center text-green-300">
              <Wifi className="w-3 h-3" />
              <span className="text-[10px] ml-1">Online</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-300"></div>
          )
        ) : (
          <div className="flex items-center text-red-300">
            <WifiOff className="w-3 h-3" />
            <span className="text-[10px] ml-1">Offline</span>
          </div>
        )}
      </div>
    );

    const canSend = input.trim() && !isSending && isOnline && isTypingComplete;

    if (!mode) {
      return (
        <div
          className="fixed bottom-0 right-0 w-full h-full
        sm:top-4 sm:right-4 sm:bottom-auto sm:w-auto sm:max-w-[22rem] sm:h-[800px]
        lg:top-[46%] lg:-translate-y-1/2 lg:right-4 lg:w-[22rem] lg:h-[540px]
        overflow-hidden bg-gradient-to-br from-white via-gray-50 to-green-50
        z-[9999] rounded-2xl shadow-2xl  mt-0 sm:mt-6 flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[#085056] via-[#0b646e] to-[#0d7377] h-[250px] sm:h-[300px] flex flex-col items-center justify-center text-white relative overflow-hidden shrink-0 z-30">
            {/* Logo */}
            <div className="w-44 sm:w-48 lg:w-64 rounded-full flex items-center justify-center p-2 relative z-10">
              <img
                src={JaimaxLogo}
                alt="Logo"
                className="object-contain max-w-full h-auto filter drop-shadow-sm"
              />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold mt-3 tracking-wide text-white drop-shadow-sm relative z-10">
              JAIMAX
            </h1>

            <p className="text-green-100 text-xs sm:text-sm mt-1 px-4 text-center drop-shadow-sm relative z-10">
              We are here to help you!
            </p>

            {/* Connection Status */}
            <div className="absolute bottom-4 left-4 z-20">
              <ConnectionStatus isOnline={isOnline} aiStatus={aiStatus} />
            </div>

            {/* Back button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                title="Close"
                className="flex items-center justify-center text-white font-medium rounded-full p-2"
              >
                <IoClose size={30} />
              </button>
            </div>
          </div>

          {/* Chat cards */}
          <div className="relative flex-1 px-4 py-6 z-[10000]">
            <div className="flex flex-col gap-4 absolute top-0 left-0 w-[90%] mx-auto right-0">
              {/* Human Chat Card */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: -30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center border-2 border-green-200/60 justify-between bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3 cursor-pointer hover:shadow-2xl hover:border-green-300/80 transition-all duration-200 group relative overflow-hidden"
                onClick={() => setMode("human")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="flex items-center space-x-4 relative z-10">
                  <div className="p-3 rounded-2xl shadow-inner border group-hover:shadow-md transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 sm:w-5 sm:h-5 text-[#085056] group-hover:text-[#085056] transition-colors duration-200"
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
                    <span className="text-black font-bold  sm:text-[1.3rem] group-hover:text-gray-900 transition-colors duration-200">
                      Chat with us now
                    </span>
                    {/* <p className="text-gray-500 text-sm sm:text-[1rem] mt-1 group-hover:text-gray-600 transition-colors duration-200">
                      Connect with our support team
                    </p> */}
                  </div>
                </div>
                <div className="text-gray-400 text-2xl group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 relative z-10">
                  ›
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 pb-2 shrink-0 rounded-t-3xl border-t border-gray-200/50 z-20 relative">
            <div className="flex border-t border-gray-200/30 bg-white/50 backdrop-blur-sm">
              <button
                className="flex-1 py-3 sm:py-4 flex flex-col items-center text-green-600 bg-gradient-to-b from-white to-green-50/30 hover:from-green-50 hover:to-green-100/50 transition-all duration-200 hover:shadow-inner border-r border-gray-200/30"
                onClick={handleAi}
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mb-1 transition-transform duration-200 hover:scale-110"
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
                <span className="text-xs sm:text-sm font-semibold transition-colors duration-200">
                  Home
                </span>
                <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-600 mt-2 rounded-full shadow-sm"></div>
              </button>
              <button
                onClick={() => setMode("need")}
                className="flex-1 py-3 sm:py-4 flex flex-col items-center text-gray-400 hover:text-green-600 hover:bg-gradient-to-b hover:from-green-50/30 hover:to-green-100/50 transition-all duration-200"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mb-1 transition-transform duration-200 hover:scale-110"
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
                <span className="text-xs sm:text-sm font-semibold transition-colors duration-200">
                  Conversation
                </span>
              </button>
            </div>

            <div className="text-center mt-3 px-4">
              <div className="inline-flex items-center space-x-2 rounded-full px-4 py-2">
                {/* <span className="text-yellow-500 animate-pulse">⚡</span> */}
                <span className="text-xs sm:text-sm text-[#085056] font-medium">
                  Powered by Jaimax
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (mode === "human") {
      return <HumantAssistant onclose={onClose} />;
    }

    return (
      <motion.div
        onClick={handleWrapperClick}
        className="fixed bottom-0 right-0 w-full h-full
      sm:top-4 sm:right-4 sm:bottom-auto sm:w-auto sm:max-w-[22rem] sm:h-[600px]
      lg:top-[13%] lg:-translate-y-1/2 lg:right-4 lg:w-[22rem] lg:h-[530px]
      shadow-2xl bg-gradient-to-br from-[#085056] via-[#0b646e] to-[#0d7377]
      flex flex-col overflow-hidden z-[9999] font-sans rounded-none sm:rounded-2xl
      backdrop-blur-sm "
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        {/* HEADER */}
        <motion.div
          className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between w-full relative z-40"
          style={{
            background:
              "linear-gradient(135deg, #085056 0%, #0b646e 50%, #0d7377 100%)",
          }}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 relative z-30">
            {/* Back Arrow */}
            <motion.button
              onClick={onClose}
              className="text-white text-2xl p-2 rounded-full hover:bg-white/20 transition"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiArrowLeft />
            </motion.button>

            {/* Avatar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logo}
                alt="agent"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2"
              />
            </motion.div>

            {/* Title */}
            <div>
              <motion.p
                className="font-bold text-base sm:text-lg text-white tracking-wide drop-shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                HELP & SUPPORT
              </motion.p>
              <motion.div
                className="flex items-center space-x-2 sm:space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  Jaimax Assistant
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CHAT AREA */}
        <div
          className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white space-y-4
      scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded
      z-10 relative "
        >
          <div className="bg-gray-50 px-3 py-3 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-full sm:max-w-sm space-y-3">
              {/* FAQ */}
              <div className="bg-white rounded-xl shadow-sm sm:p-4">
                <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Got Questions?
                </h1>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* FAQs List */}
                <div className="mt-2 space-y-2">
                  {displayedFAQs.length > 0 ? (
                    displayedFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border border-gray-200 overflow-hidden"
                        onClick={() => toggleFAQ(faq.id)}
                      >
                        <div className="p-2 sm:p-3 flex items-center justify-between">
                          <p className="text-sm sm:text-base font-medium text-gray-900 flex-1">
                            {faq.question}
                          </p>
                          <motion.div
                            animate={{
                              rotate: expandedFAQId === faq.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="ml-2 text-gray-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-5 sm:w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        </div>
                        <AnimatePresence>
                          {expandedFAQId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-2 sm:px-3 pb-2 pt-1 border-t border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-700">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500 text-center py-2">
                      No FAQs found
                    </p>
                  )}

                  {filteredFAQs.length > 3 && (
                    <button
                      onClick={() => setShowAllFAQs(!showAllFAQs)}
                      className="w-full mt-3 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      {showAllFAQs
                        ? "Show Less"
                        : `Show ${filteredFAQs.length - 3} More`}
                    </button>
                  )}
                </div>
              </div>

              {/* Help Assistant */}
              <div className="bg-white rounded-xl shadow-sm p-2 sm:p-3 text-center">
                <div className="flex justify-center mb-2">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#0a606a" }}
                  >
                    <MdOutlineSupportAgent className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                </div>
                <h2 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  Need Assistance?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  Jaimax Buddy is here to help you
                </p>
                <button
                  onClick={() => setMode("human")}
                  className="w-full py-2 sm:py-2.5 rounded-lg text-white text-sm sm:text-base font-medium transition-all hover:opacity-90 shadow-md"
                  style={{ backgroundColor: "#0d5d64" }}
                >
                  Start a Conversation
                </button>
              </div>
            </div>
            <div ref={chatEndRef}></div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs sm:text-sm font-medium text-white py-2 sm:py-3 shadow-inner relative z-30"
          style={{
            background:
              "linear-gradient(135deg, #085056 0%, #0a6b73 50%, #0d7f88 100%)",
          }}
        >
          {/* <span className="text-yellow-400 mr-1">⚡</span> */}
          Powered by <span className="font-semibold">JAIMAX </span>
        </motion.div>
      </motion.div>
    );
  };

  export default ChatAssistant;

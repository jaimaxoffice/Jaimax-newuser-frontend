import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/Images/jaimaxcoin.png";

const PriceIncreasePopup = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const STORAGE_KEY = "priceAlertCampaign";
  useEffect(() => {
    const checkVisibility = () => {
      const now = new Date();
      const visibleFromDate = new Date("2025-09-12T00:00:00");
      const invisibleFromDate = new Date("2025-09-15T00:00:00");

      const campaignActive = now >= visibleFromDate && now < invisibleFromDate;
      const userDismissed =
        sessionStorage.getItem(`${STORAGE_KEY}_dismissed`) === "true";
      const shouldBeVisible = campaignActive && !userDismissed;

      setIsVisible(shouldBeVisible);

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            campaignActive,
            userDismissed,
            isVisible: shouldBeVisible, // Add this!
            checkedAt: now.toISOString(),
          })
        );
      } catch (e) {
        // Ignore storage errors
      }
    };

    // First check session storage
    try {
      if (sessionStorage.getItem(`${STORAGE_KEY}_dismissed`) === "true") {
        setIsVisible(false);
        return; // Exit early if dismissed
      }

      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
  setIsVisible(Boolean(parsed.isVisible)); // Use the stored visibility
} else {
  checkVisibility();
}
      } else {
        checkVisibility();
      }
    } catch (e) {
      checkVisibility();
    }

    // Re-check periodically
    const id = setInterval(checkVisibility, 60_000);
    return () => clearInterval(id);
  }, []);

  // Handle the countdown timer
  // useEffect(() => {
  //   if (!isVisible) return; // Don't start timer if not visible

  //   setTimeout(() => setIsLoaded(true), 100);

  //   const startDate = new Date("2025-09-11T00:00:00");
  //   const endDate = new Date("2025-09-11T15:32:00");
  //   const totalDuration = (endDate - startDate) / 1000;

  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     const secondsPassed = Math.max(0, (now - startDate) / 1000);
  //     const progress = Math.min(
  //       100,
  //       Math.max(0, (secondsPassed / totalDuration) * 100)
  //     );

  //     if (now > endDate) {
  //       clearInterval(timer);
  //       setTimeLeft({
  //         days: 0,
  //         hours: 0,
  //         minutes: 0,
  //         seconds: 0,
  //         progress: 100,
  //       });
  //       return;
  //     }

  //     const timeDiff = endDate - now;
  //     const totalSeconds = Math.floor(timeDiff / 1000);
  //     const days = Math.floor(totalSeconds / 86400);
  //     const hours = Math.floor((totalSeconds % 86400) / 3600);
  //     const minutes = Math.floor((totalSeconds % 3600) / 60);
  //     const seconds = totalSeconds % 60;

  //     setTimeLeft({ days, hours, minutes, seconds, progress });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [isVisible]);
// Handle the countdown timer
useEffect(() => {
  if (!isVisible) return; // Don't start timer if not visible

  setTimeout(() => setIsLoaded(true), 100);

  const startDate = new Date("2025-09-12T00:00:00");
  const endDate = new Date("2025-09-15T00:00:00");
  const totalDuration = (endDate - startDate) / 1000;

  const timer = setInterval(() => {
    const now = new Date();
    
    // Check if time has expired
    if (now > endDate) {
      clearInterval(timer);
      
      // Close the popup by updating state
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        progress: 100,
      });
      
      // Auto-dismiss when timer expires
      try {
        // Update session storage to track that campaign has ended
        const currentData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...currentData,
            campaignActive: false,
            isVisible: false,
            timerExpired: true,
            expiredAt: now.toISOString()
          })
        );
      } catch (e) {
        console.error("Error updating storage after timer expiry:", e);
      }
      
      // Close the popup
      setIsVisible(false);
      return;
    }

    // Rest of the timer code remains the same
    const secondsPassed = Math.max(0, (now - startDate) / 1000);
    const progress = Math.min(
      100,
      Math.max(0, (secondsPassed / totalDuration) * 100)
    );

    const timeDiff = endDate - now;
    const totalSeconds = Math.floor(timeDiff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setTimeLeft({ days, hours, minutes, seconds, progress });
  }, 1000);

  return () => clearInterval(timer);
}, [isVisible]);
  // Early return if popup shouldn't be visible
  if (!isVisible) return null;

  // Circle progress properties
  const size = 140;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - timeLeft.progress / 100);

  // Handle popup dismissal
const handleDismiss = () => {
  try {
    // Set the dismissed flag
    sessionStorage.setItem(`${STORAGE_KEY}_dismissed`, "true");
    
    // Also update the main storage item
    const currentData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...currentData,
        userDismissed: true,
        isVisible: false,
        dismissedAt: new Date().toISOString()
      })
    );
  } catch (e) {
    // Ignore storage errors
  }
  setIsVisible(false);
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md p-4 bg-black/40 animate-fadeIn">
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative ${
          isLoaded ? "animate-popIn" : "opacity-0 scale-95"
        }`}
        style={{
          backgroundColor: "#f0f4e8",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Animated decorative elements */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 opacity-30 animate-pulse"
          style={{
            backgroundColor: "#bacd27",
            animationDuration: "10s",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl -ml-20 -mb-20 opacity-20 animate-pulse"
          style={{
            backgroundColor: "#18a04a",
            animationDuration: "15s",
            animationDelay: "1s",
          }}
        ></div>

        {/* Close button with hover animation */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 shadow-md transition-all duration-300 hover:scale-110 hover:rotate-90"
          style={{ backgroundColor: "white", color: "#18a04a" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header section with animated gradient */}
        <div
          className="relative px-6 pt-8 pb-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #18a04a, #008080)" }}
        >
          {/* Animated background lights */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white/10 animate-float"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-20 left-40 w-12 h-12 rounded-full bg-white/10 animate-float"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-5 right-10 w-16 h-16 rounded-full bg-white/10 animate-float"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          <h2 className="text-white text-2xl font-bold leading-tight mb-2 animate-slideInRight">
            Price Increase Alert
          </h2>
          <p
            className="text-white/90 text-sm animate-slideInRight"
            style={{ animationDelay: "0.2s" }}
          >
            Secure today's rate before our upcoming price adjustment. Don't miss
            out!
          </p>
        </div>

        {/* Progress ring */}
        <div className="px-6 pt-6 relative z-10">
          <div
            className="rounded-2xl p-5 mb-5 border relative overflow-hidden animate-fadeIn"
            style={{
              backgroundColor: "white",
              borderColor: "#bacd27",
              animationDelay: "0.3s",
            }}
          >
            {/* Decorative spark */}
            <div
              className="absolute top-2 right-2 w-2 h-2 rounded-full animate-ping opacity-70"
              style={{ backgroundColor: "#bacd27" }}
            ></div>

            <div className="flex flex-row items-center justify-between">
              {/* Progress circle with coin image */}
              <div
                className="relative animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
              >
                <svg
                  className="w-[140px] h-[140px] transform -rotate-90"
                  viewBox={`0 0 ${size} ${size}`}
                >
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth / 2}
                    stroke="rgba(186, 205, 39, 0.2)"
                    fill="none"
                  />
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke="url(#greenGradient)"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      filter: "drop-shadow(0px 1px 3px rgba(24, 160, 74, 0.5))",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="greenGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#18a04a" />
                      <stop offset="50%" stopColor="#008080" />
                      <stop offset="100%" stopColor="#bacd27" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Coin image overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-[200px] h-[200px] rounded-full bg-contain bg-center bg-no-repeat animate-pulse"
                    style={{
                      backgroundImage: `url(${icon})`,
                      animationDuration: "3s",
                      filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))",
                    }}
                  ></div>
                </div>
              </div>

              {/* Countdown with staggered animations */}
              <div className="flex flex-col space-y-2">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HOURS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEC" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center animate-slideInRight"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div
                      className="w-14 h-10 rounded flex items-center justify-center border shadow-inner transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "#18a04a",
                        borderColor: "#bacd27",
                      }}
                    >
                      <span className="text-xl font-mono font-bold text-white">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      className="text-[10px] ml-2 font-medium tracking-wider"
                      style={{ color: "#18a04a" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price comparison section */}
          <div className="flex space-x-4 mb-6">
            <div
              className="flex-1 rounded-2xl p-4 border relative overflow-hidden group transition-all duration-500 hover:shadow-lg hover:-translate-y-1 animate-slideInLeft"
              style={{
                backgroundColor: "white",
                borderColor: "#18a04a",
                boxShadow: "0 4px 6px rgba(24, 160, 74, 0.1)",
                animationDelay: "0.6s",
              }}
            >
              <span
                className="block text-xs mb-3 font-medium"
                style={{ color: "#18a04a" }}
              >
                Current Price
              </span>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#18a04a" }}
                >
                  ₹0.025
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#18a04a" }}
                >
                  $0.00029
                </span>
              </div>
              <div
                className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 opacity-10"
                style={{ backgroundColor: "#18a04a" }}
              ></div>
            </div>

            <div
              className="w-8 flex items-center justify-center text-gray-400 animate-fadeIn"
              style={{ animationDelay: "0.7s" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 animate-bounceX"
                style={{
                  animationDuration: "2s",
                  animationIterationCount: "infinite",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>

            <div
              className="flex-1 rounded-2xl p-4 border relative overflow-hidden group transition-all duration-500 hover:shadow-lg hover:-translate-y-1 animate-slideInRight"
              style={{
                backgroundColor: "white",
                borderColor: "#bacd27",
                boxShadow: "0 4px 6px rgba(186, 205, 39, 0.1)",
                animationDelay: "0.7s",
              }}
            >
              <span
                className="block text-xs mb-3 font-medium"
                style={{ color: "#18a04a" }}
              >
                New Price
              </span>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-bold mb-1 animate-pulse"
                  style={{
                    color: "#bacd27",
                    animationDuration: "2s",
                  }}
                >
                  ₹0.028
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#bacd27" }}
                >
                  $0.00032
                </span>
              </div>
              <div
                className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 opacity-10"
                style={{ backgroundColor: "#bacd27" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Call to action with animations */}
        <div
          className="px-6 pb-8 animate-slideInUp"
          style={{ animationDelay: "0.8s" }}
        >
          <button
            className="w-full py-4 px-6 rounded-xl text-white font-bold transition-all duration-500 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #18a04a, #bacd27)",
              boxShadow: "0 10px 25px rgba(24, 160, 74, 0.3)",
            }}
            onClick={() => {
              handleDismiss();
              navigate("/dashboard");
            }}
          >
            <span
              className="relative z-10 flex items-center justify-center animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              Act Now — Secure Today's Price!
            </span>
            <div className="absolute inset-0 w-full h-full bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>

      {/* Add CSS for custom animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          70% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(0px) translateX(10px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes bounceX {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .animate-popIn {
          animation: popIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.7s ease forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.7s ease forwards;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-bounceX {
          animation: bounceX 2s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceIncreasePopup;

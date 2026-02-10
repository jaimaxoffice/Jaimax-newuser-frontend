
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import logo from "../../assets/Images/jaicoin.svg";

// ===== CONFIGURE YOUR DATES HERE =====
const START_DATE = new Date("2026-01-24T00:00:00");
const END_DATE = new Date("2026-01-26T23:59:59");
// =====================================

// Storage Keys
const POPUP_DISMISSED_KEY = "coinPricePopupDismissed";
const POPUP_DISMISSED_TIME_KEY = "coinPricePopupDismissedTime";
const DISMISS_DURATION = 5 * 60 * 60 * 1000; // 5 hours

// Flip Card Number Component
const FlipNumber = ({ value, label }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentValue) {
      setIsFlipping(true);
      setPreviousValue(currentValue);
      const timeout = setTimeout(() => {
        setCurrentValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value, currentValue]);

  const formatValue = (val) => String(val).padStart(2, "0");

  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-md sm:rounded-lg px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-center min-w-[32px] sm:min-w-[44px] shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
      <div className="relative h-4 sm:h-6 overflow-hidden flex items-center justify-center">
        <div
          className={`absolute inset-x-0 transition-all duration-300 ease-out ${
            isFlipping
              ? "transform -translate-y-full opacity-0"
              : "transform translate-y-0 opacity-0"
          }`}
        >
          <span className="block text-sm sm:text-lg font-black text-white leading-none">
            {formatValue(previousValue)}
          </span>
        </div>
        <div
          className={`transition-all duration-300 ease-out ${
            isFlipping
              ? "transform translate-y-full opacity-0 scale-90"
              : "transform translate-y-0 opacity-100 scale-100"
          }`}
        >
          <span className="block text-sm sm:text-lg font-black text-white leading-none">
            {formatValue(currentValue)}
          </span>
        </div>
      </div>
      <span className="text-[5px] sm:text-[7px] text-teal-100 uppercase font-semibold relative leading-none mt-0.5 sm:mt-1 block">
        {label}
      </span>
    </div>
  );
};

const CoinPricePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  // Price data
  const oldPriceINR = 0.035;
  const newPriceINR = 0.04;
  const oldPriceUSD = 0.00039;
  const newPriceUSD = 0.00044;

  // Check if current time is within START_DATE and END_DATE
  const isWithinDateRange = useCallback(() => {
    const now = new Date();
    const nowTime = now.getTime();
    const startTime = START_DATE.getTime();
    const endTime = END_DATE.getTime();

    return nowTime >= startTime && nowTime <= endTime;
  }, []);

  // Check if popup was dismissed within last 5 hours
  const isDismissed = useCallback(() => {
    const dismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY);
    const dismissedTime = sessionStorage.getItem(POPUP_DISMISSED_TIME_KEY);

    if (dismissed === "true" && dismissedTime) {
      const dismissedTimestamp = parseInt(dismissedTime, 10);
      const timePassed = Date.now() - dismissedTimestamp;

      if (timePassed >= DISMISS_DURATION) {
        // 5 hours passed, clear storage
        sessionStorage.removeItem(POPUP_DISMISSED_KEY);
        sessionStorage.removeItem(POPUP_DISMISSED_TIME_KEY);
        return false;
      }
      return true; // Still within dismiss period
    }
    return false;
  }, []);

  // Calculate time remaining from NOW to END_DATE
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const nowTime = now.getTime();
    const startTime = START_DATE.getTime();
    const endTime = END_DATE.getTime();

    // Remaining time from NOW to END_DATE
    const remainingMs = endTime - nowTime;

    // Total duration between START and END
    const totalDuration = endTime - startTime;

    // Elapsed time since START
    const elapsed = nowTime - startTime;

    // Progress percentage (how much time has passed)
    let progressPercent = 0;
    if (totalDuration > 0 && elapsed >= 0) {
      progressPercent = (elapsed / totalDuration) * 100;
      progressPercent = Math.min(100, Math.max(0, progressPercent));
    }

    // If time expired
    if (remainingMs <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        progress: 100,
        isExpired: true,
      };
    }

    // Convert remaining milliseconds to time units
    const totalSeconds = Math.floor(remainingMs / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      days: d,
      hours: h,
      minutes: m,
      seconds: s,
      progress: progressPercent,
      isExpired: false,
    };
  }, []);

  // Update timer state
  const updateTimer = useCallback(() => {
    const timeData = calculateTimeRemaining();

    setDays(timeData.days);
    setHours(timeData.hours);
    setMinutes(timeData.minutes);
    setSeconds(timeData.seconds);
    setProgress(timeData.progress);

    return timeData.isExpired;
  }, [calculateTimeRemaining]);

  // Initialize popup
  useEffect(() => {
    const checkAndShowPopup = () => {
      const inRange = isWithinDateRange();
      const dismissed = isDismissed();

    

      if (inRange && !dismissed) {
        setShowPopup(true);
        updateTimer();

        // Start interval
        intervalRef.current = setInterval(() => {
          // Check if still in range
          if (!isWithinDateRange()) {
            setShowPopup(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return;
          }

          const expired = updateTimer();
          if (expired) {
            setShowPopup(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        }, 1000);
      } else {
        setShowPopup(false);
      }
    };

    checkAndShowPopup();

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWithinDateRange, isDismissed, updateTimer]);

  // Mount animation
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [showPopup]);

  // Handle close
  const handleClose = () => {
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
    sessionStorage.setItem(POPUP_DISMISSED_TIME_KEY, Date.now().toString());
    setMounted(false);
    setTimeout(() => {
      setShowPopup(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 300);
  };

  // Circle properties
  const size = 80;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Don't render if popup shouldn't show
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          opacity: mounted ? 1 : 0,
          background:
            "radial-gradient(circle at center, rgba(20, 184, 166, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%)",
          backdropFilter: "blur(8px)",
        }}
        onClick={handleClose}
      />

      {/* Main Card */}
      <div
        className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] transition-all duration-500 ease-out"
        style={{
          transform: mounted
            ? "scale(1) translateY(0) rotate(0deg)"
            : "scale(0.9) translateY(40px) rotate(-2deg)",
          opacity: mounted ? 1 : 0,
        }}
      >
        {/* Banner Header */}
        <div className="relative z-20 mb-[5px] sm:mb-[5px] md:mb-[0px]">
          <div
            className="relative mx-auto w-[95%] sm:w-[92%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            style={{
              transform: "rotate(-2deg) translateY(8px)",
              background:
                "linear-gradient(135deg, #14b8a6 0%, #0d9488 40%, #0f766e 100%)",
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)
                  `,
                }}
              />
            </div>

            <div className="relative px-4 sm:px-6 py-4 sm:py-6 md:py-7 text-center">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)`,
                }}
              />
              <h1 className="text-white font-black text-base sm:text-xl md:text-2xl lg:text-3xl tracking-tight drop-shadow-lg mb-1">
                Price Alert!
              </h1>
              <p className="text-white/80 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium">
                Jaimax Coin price Update
              </p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-red-50 flex items-center justify-center transition-all duration-300 z-10 group hover:rotate-90"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>

          <div className="px-3 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-14 pb-3 sm:pb-5 md:pb-6">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold leading-tight mb-1 sm:mb-2 text-gray-800">
                Jaimax Coin price set to update
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
                Keep an eye on the trend and make informed decisions.
              </p>
            </div>

            {/* Price Comparison */}
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl" />
              <div className="relative p-2.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-teal-100">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  {/* Old Price */}
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-gray-200/60 rounded-full mb-1.5 sm:mb-2">
                      <span className="text-[7px] sm:text-[9px] text-gray-500 uppercase tracking-wider font-semibold">
                        Previous
                      </span>
                    </div>
                    <div className="relative">
                      <span className="text-base sm:text-xl md:text-2xl font-bold text-gray-400 line-through decoration-red-400 decoration-2">
                        ₹{oldPriceINR.toFixed(3)}
                      </span>
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">
                      ${oldPriceUSD.toFixed(5)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-teal-400 rounded-full blur-md opacity-30" />
                      <div className="relative w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* New Price */}
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-teal-500 rounded-full mb-1.5 sm:mb-2">
                      <span className="text-[7px] sm:text-[9px] text-white uppercase tracking-wider font-semibold">
                        New Price
                      </span>
                    </div>
                    <div className="relative">
                      <span className="text-lg sm:text-2xl md:text-3xl font-black text-teal-600">
                        ₹{newPriceINR.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[8px] sm:text-[10px] text-teal-500 mt-0.5 sm:mt-1 font-medium">
                      ${newPriceUSD.toFixed(5)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer Section */}
            <div className="mb-4 sm:mb-6">
              <p className="text-center text-[9px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 sm:mb-3">
                Time left until price rise
              </p>

              <div className="flex items-center justify-center gap-2 sm:gap-4">
                {/* Circular Progress with Logo */}
                <div
                  className="relative flex-shrink-0"
                  style={{ width: size, height: size }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-teal-400 opacity-20 animate-ping"
                    style={{ animationDuration: "2s" }}
                  />

                  <svg
                    className="w-full h-full"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth={strokeWidth}
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#0f766e" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Logo in Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[70px] h-[70px] sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center shadow-inner overflow-hidden">
                      <img
                        src={logo}
                        alt="Jaimax Logo"
                        className="w-[85%] h-[85%] object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Display */}
                <div className="flex items-center gap-0.5 sm:gap-1.5">
                  <FlipNumber value={days} label="days" />
                  <span className="text-teal-400 font-bold text-xs sm:text-lg animate-pulse">
                    :
                  </span>
                  <FlipNumber value={hours} label="hrs" />
                  <span className="text-teal-400 font-bold text-xs sm:text-lg animate-pulse">
                    :
                  </span>
                  <FlipNumber value={minutes} label="min" />
                  <span className="text-teal-400 font-bold text-xs sm:text-lg animate-pulse">
                    :
                  </span>
                  <FlipNumber value={seconds} label="sec" />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              className="group relative w-full py-2 sm:py-3 md:py-3 rounded-full font-bold text-white text-xs sm:text-sm tracking-wide transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Act Fast</span>
            </button>
          </div>

          <div className="h-1 sm:h-1.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400" />
        </div>
      </div>
    </div>
  );
};

export default CoinPricePopup;
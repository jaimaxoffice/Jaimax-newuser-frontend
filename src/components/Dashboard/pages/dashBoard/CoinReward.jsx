import React, { useState, useEffect, useCallback } from "react";
import { X, Star, Trophy, Loader2 } from "lucide-react";
import { useGetRegisterBonusMutation } from './DashboardApliSlice';

const CoinRewardModal = ({ isOpen, onClose, onComplete }) => {
  const [phase, setPhase] = useState("ready"); // "ready" | "counting" | "celebrating" | "claiming" | "error"
  const [finalCoins, setFinalCoins] = useState(0);
  const [isJackpot, setIsJackpot] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [digits, setDigits] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // RTK Query mutation hook
  const [getRegisterBonus, { isLoading: isClaiming }] = useGetRegisterBonusMutation();

  // Calculate reward locally (same as before)
  const calculateReward = useCallback(() => {
    const random = Math.random();
    
    if (random < 0.9) {
      return {
        coins: Math.floor(Math.random() * 201) + 500, // 500-700
        jackpot: false,
      };
    } else {
      return {
        coins: Math.floor(Math.random() * 100) + 700, // 700-1000
        jackpot: true,
      };    
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Calculate reward locally
      const reward = calculateReward();
      setFinalCoins(reward.coins);
      setIsJackpot(reward.jackpot);
      setPhase("ready");
      setShowConfetti(false);
      setDigits([0, 0, 0]);
      setIsSpinning(false);
      setErrorMessage("");

      const startTimer = setTimeout(() => {
        setPhase("counting");
        setIsSpinning(true);
        
        // Pad coins to display properly (handle 3 or 4 digits)
        const coinStr = reward.coins.toString().padStart(3, "0");
        const digitArray = coinStr.split("").map(Number);
        setDigits(digitArray);
      }, 500);

      return () => clearTimeout(startTimer);
    }
  }, [isOpen, calculateReward]);

  useEffect(() => {
    if (phase === "counting") {
      const celebrateTimer = setTimeout(() => {
        setPhase("celebrating");
        setShowConfetti(true);
        setIsSpinning(false);
      }, 3500);

      return () => clearTimeout(celebrateTimer);
    }
  }, [phase]);

  // Handle claim - POST jmc to API
  const handleClaim = async () => {
    setPhase("claiming");
    setErrorMessage("");

    try {
      // POST the jmc coins to the API
      const response = await getRegisterBonus(finalCoins).unwrap();
      
      console.log("Bonus claimed successfully:", response);

      // Call onComplete callback with coins
      if (onComplete) {
        onComplete(finalCoins);
      }
      
      onClose();
    } catch (err) {
      console.error("Failed to claim bonus:", err);
      setPhase("error");
      setErrorMessage(
        err?.data?.message || 
        err?.message || 
        "Failed to claim your bonus. Please try again."
      );
    }
  };

  // Retry claiming
  const handleRetry = async () => {
    await handleClaim();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-teal-900/60 backdrop-blur-sm"
        onClick={phase === "celebrating" || phase === "error" ? onClose : undefined}
      />

      {showConfetti && <Confetti />}

      <div className="relative w-full max-w-md transform transition-all">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur-lg opacity-75 animate-pulse" />

        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="h-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />

          <div className="relative p-6 sm:p-8">
            {(phase === "celebrating" || phase === "error") && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Header */}
            <div className="text-center mb-8">
              {phase === "ready" && (
                <h2 className="text-2xl font-bold text-gray-800">Get Ready!</h2>
              )}
              {phase === "counting" && (
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Counting Your Coins...
                  </h2>
                </div>
              )}
              {phase === "claiming" && (
                <div className="space-y-2">
                  <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Claiming Your Bonus...
                  </h2>
                  <p className="text-gray-500 text-sm">Please wait while we add coins to your wallet</p>
                </div>
              )}
              {phase === "error" && (
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Oops!</h2>
                  <p className="text-gray-500 text-sm">{errorMessage}</p>
                </div>
              )}
              {phase === "celebrating" && (
                <div className="space-y-2">
                  {isJackpot ? (
                    <>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full animate-bounce">
                        <Trophy className="w-5 h-5 text-white" />
                        <span className="text-white font-bold">JACKPOT!</span>
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-teal-600">
                        You're a Lucky Winner!
                      </h2>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
                        <Star className="w-5 h-5 text-teal-600 fill-teal-600" />
                        <span className="text-teal-700 font-bold">
                          Congratulations!
                        </span>
                        <Star className="w-5 h-5 text-teal-600 fill-teal-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        You Won JMC Coins!
                      </h2>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Slot Counter Display */}
            {phase !== "claiming" && phase !== "error" && (
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl shadow-inner">
                    <div className="flex gap-2">
                      {digits.map((digit, index) => (
                        <ScrollingDigitSlot
                          key={index}
                          targetDigit={digit}
                          isSpinning={isSpinning}
                          delay={index * 0.5}
                          duration={2 + index * 0.5}
                        />
                      ))}
                    </div>

                    <span className="text-gray-500 font-medium text-lg ml-2">
                      JMC
                    </span>
                  </div>

                  <div
                    className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-2xl pointer-events-none"
                    style={{ height: "50%" }}
                  />
                </div>
              </div>
            )}

            {/* Error state - show coins info */}
            {phase === "error" && (
              <div className="flex justify-center mb-6">
                <div className="px-6 py-3 bg-gray-100 rounded-xl">
                  <span className="text-2xl font-bold text-gray-800">
                    {finalCoins.toLocaleString()} JMC
                  </span>
                </div>
              </div>
            )}

            {/* Jackpot Badge */}
            {isJackpot && phase === "celebrating" && (
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg shadow-teal-200">
                  <Star
                    className="w-5 h-5 text-white fill-white animate-spin"
                    style={{ animationDuration: "3s" }}
                  />
                  <span className="text-white font-bold">Top 10% Winner!</span>
                  <Star
                    className="w-5 h-5 text-white fill-white animate-spin"
                    style={{ animationDuration: "3s", animationDirection: "reverse" }}
                  />
                </div>
              </div>
            )}

            {/* Status text during counting */}
            {phase === "counting" && (
              <div className="text-center mb-6">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">Please wait...</p>
              </div>
            )}

            {/* Error Retry Button */}
            {phase === "error" && (
              <div className="space-y-4">
                <button
                  onClick={handleRetry}
                  disabled={isClaiming}
                  className="w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClaiming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Claiming...</span>
                    </>
                  ) : (
                    <span>Try Again</span>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Close
                </button>
              </div>
            )}

            {/* Claim Button */}
            {phase === "celebrating" && (
              <div className="space-y-4">
                <button
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className="w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClaiming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Claiming...</span>
                    </>
                  ) : (
                    <span>Claim {finalCoins.toLocaleString()} JMC Coins</span>
                  )}
                </button>

                <p className="text-center text-gray-400 text-sm">
                  Tap to add JMC coins to your wallet
                </p>
              </div>
            )}
          </div>

          <div className="h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600" />
        </div>
      </div>
    </div>
  );
};

// Scrolling Digit Slot Component
const ScrollingDigitSlot = ({ targetDigit, isSpinning, delay, duration }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const digitHeight = 80;
  const totalDigits = 10;
  const extraSpins = 3;

  useEffect(() => {
    if (isSpinning) {
      setShowFinal(false);
      setIsAnimating(true);

      const delayTimer = setTimeout(() => {
        const finalPosition = (extraSpins * totalDigits + targetDigit) * digitHeight;
        setScrollY(finalPosition);

        const completeTimer = setTimeout(() => {
          setIsAnimating(false);
          setShowFinal(true);
        }, duration * 1000);

        return () => clearTimeout(completeTimer);
      }, delay * 1000);

      return () => clearTimeout(delayTimer);
    } else {
      setScrollY(0);
      setIsAnimating(false);
      setShowFinal(false);
    }
  }, [isSpinning, targetDigit, delay, duration]);

  const numbers = [];
  for (let i = 0; i <= extraSpins + 1; i++) {
    for (let j = 0; j <= 9; j++) {
      numbers.push(j);
    }
  }

  return (
    <div className="relative">
      <div
        className={`relative w-16 h-20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
          isAnimating
            ? "border-2 border-teal-400 shadow-teal-200"
            : showFinal
            ? "border-2 border-teal-500 shadow-teal-300"
            : "border-2 border-gray-200"
        }`}
        style={{ backgroundColor: "#fff" }}
      >
        <div
          className="absolute left-0 right-0 transition-transform"
          style={{
            transform: `translateY(-${scrollY}px)`,
            transitionDuration: isAnimating ? `${duration}s` : "0s",
            transitionTimingFunction: "cubic-bezier(0.15, 0.85, 0.35, 1)",
          }}
        >
          {numbers.map((num, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
              style={{ height: `${digitHeight}px` }}
            >
              <span
                className={`text-5xl font-bold tabular-nums ${
                  isAnimating ? "text-teal-500" : "text-gray-800"
                }`}
              >
                {num}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />

        {showFinal && (
          <div className="absolute inset-0 bg-teal-400/10 animate-pulse pointer-events-none rounded-xl" />
        )}

        {isAnimating && (
          <div className="absolute inset-0 backdrop-blur-[0.5px] pointer-events-none" />
        )}
      </div>

      <div className="absolute -bottom-1 left-1 right-1 h-2 bg-gradient-to-b from-gray-300/40 to-transparent rounded-b-xl blur-sm" />
    </div>
  );
};

// Confetti Component
const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    const colors = ["#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4", "#0d9488", "#0f766e", "#ffffff"];

    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * 360;
      const velocity = 5 + Math.random() * 10;
      const size = 6 + Math.random() * 8;

      newParticles.push({
        id: i,
        angle,
        velocity,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.3,
        shape: Math.floor(Math.random() * 3),
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-burst"
            style={{
              width: `${particle.size}px`,
              height: particle.shape === 2 ? `${particle.size * 2}px` : `${particle.size}px`,
              backgroundColor: particle.color,
              borderRadius: particle.shape === 0 ? "50%" : "2px",
              animationDelay: `${particle.delay}s`,
              "--angle": `${particle.angle}deg`,
              "--velocity": `${particle.velocity * 50}px`,
            }}
          />
        ))}
      </div>

      {[...Array(30)].map((_, i) => (
        <div
          key={`fall-${i}`}
          className="absolute w-3 h-3 bg-teal-400 rounded-full animate-confetti-fall"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 30}%`,
            animationDelay: `${0.5 + Math.random() * 1}s`,
            opacity: 0,
          }}
        />
      ))}

      <style>{`
        @keyframes burst {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: 
              translate(
                calc(cos(var(--angle)) * var(--velocity)), 
                calc(sin(var(--angle)) * var(--velocity) + 200px)
              )
              rotate(720deg)
              scale(0);
            opacity: 0;
          }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(60vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-burst {
          animation: burst 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-confetti-fall {
          animation: confetti-fall 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CoinRewardModal;
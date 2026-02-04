import React, { useState, useEffect } from 'react';
import { useLazyKycrewardQuery } from '../kyc/kycApiSlice';
import { toast } from '../../../../ReusableComponents/Toasts/Toasts';

const KycBonusPopup = ({ kycBonusEligible, kycBonusClaimed, refetchUser }) => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardCoins, setRewardCoins] = useState(0);
  const [rewardMessage, setRewardMessage] = useState('');
  const [isCountingComplete, setIsCountingComplete] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const [triggerKycReward, { isLoading }] = useLazyKycrewardQuery();

  // Show welcome popup if eligible and not claimed
  useEffect(() => {
    if (kycBonusEligible && !kycBonusClaimed) {
      setShowWelcomePopup(true);
    }
  }, [kycBonusEligible, kycBonusClaimed]);

  // Start counting animation when scratch card shows
  useEffect(() => {
    if (showScratchCard && rewardCoins > 0) {
      setIsCountingComplete(false);
      setIsSpinning(false);

      setTimeout(() => {
        setIsSpinning(true);
        
        // Stop spinning and show result
        setTimeout(() => {
          setIsSpinning(false);
          setIsCountingComplete(true);
          
          // Auto-transition to reward popup
          setTimeout(() => {
            setShowScratchCard(false);
            setShowRewardPopup(true);
          }, 2000);
        }, 4000); // Spin for 4 seconds
      }, 500);
    }
  }, [showScratchCard, rewardCoins]);

  const handleClaimBonus = async () => {
    try {
      const response = await triggerKycReward().unwrap();
      
      if (response.success) {
        setRewardCoins(response.data.tokens);
        setRewardMessage(response.message);
        setShowWelcomePopup(false);
        
        setTimeout(() => {
          setShowScratchCard(true);
        }, 300);
        
        if (refetchUser) {
          await refetchUser();
        }
      }
    } catch (error) {
      console.error('Failed to claim reward:', error);
      toast.error(error?.data?.message || 'Failed to claim reward');
      setShowWelcomePopup(false);
    }
  };

  const handleCloseReward = () => {
    setShowRewardPopup(false);
    setIsCountingComplete(false);
  };

  // Generate reel items (0-9 with coin in middle)
  const generateReelItems = () => {
    const items = [];
    // Create 5 sets of 0-9 with coin at position 5
    for (let set = 0; set < 5; set++) {
      for (let i = 0; i <= 9; i++) {
        if (i === 5 && set > 0) {
          items.push({ type: 'coin', value: 'C' });
        }
        items.push({ type: 'number', value: i });
      }
    }
    return items;
  };

  const reelItems = generateReelItems();

  // Slot Reel Component
  const SlotReel = ({ targetDigit, delay, isComplete }) => {
    const finalPosition = reelItems.findIndex(
      (item, idx) => item.type === 'number' && item.value === targetDigit && idx > 20
    );

    return (
      <div className="relative">
        <div className="w-24 h-32 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 rounded-xl border-4 border-yellow-600/30 overflow-hidden relative shadow-2xl">
          {/* Top shadow */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Center highlight */}
          {isComplete && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-full h-28 border-y-2 border-yellow-400/50"></div>
            </div>
          )}
          
          {/* Reel strip */}
          <div 
            className="absolute w-full transition-transform ease-out"
            style={{
              top: '50%',
              transform: isSpinning 
                ? `translateY(calc(-50% - ${finalPosition * 100}px))`
                : 'translateY(-50%)',
              transitionDuration: isSpinning ? `${3 + delay * 0.3}s` : '0s',
              transitionDelay: `${delay * 0.3}s`
            }}
          >
            {reelItems.map((item, idx) => (
              <div
                key={idx}
                className="h-[100px] flex items-center justify-center"
              >
                {item.type === 'coin' ? (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 shadow-xl flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-inner flex items-center justify-center">
                      <span className="text-yellow-900 font-black text-2xl">{item.value}</span>
                    </div>
                  </div>
                ) : (
                  <span className={`font-mono text-6xl font-bold transition-all duration-500 ${
                    isComplete && !isSpinning && idx === finalPosition
                      ? 'text-yellow-400 scale-110 glow-text' 
                      : 'text-green-400'
                  }`}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!showWelcomePopup && !showScratchCard && !showRewardPopup) return null;

  const digits = rewardCoins.toString().padStart(4, '0').split('').map(d => parseInt(d));

  return (
    <>
      {/* Welcome Bonus Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-bounce-in">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-2xl p-6 text-center">
              <h2 className="text-2xl font-bold text-white">Welcome Bonus!</h2>
            </div>

            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg mb-6">
                Congratulations! You've been rewarded with JMC coins!
              </p>
              
              <div className="bg-teal-50 rounded-xl p-4 mb-6">
                <p className="text-teal-600 font-medium">
                  Click below to claim your bonus
                </p>
              </div>

              <button
                onClick={handleClaimBonus}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Claiming...
                  </span>
                ) : (
                  'Claim Now'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slot Machine Counter */}
      {showScratchCard && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full animate-scale-in overflow-hidden border-4 border-yellow-600/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              <h3 className="text-3xl font-black text-white uppercase tracking-widest relative z-10">
                {isCountingComplete ? 'WINNER!' : isSpinning ? 'SPINNING...' : 'GET READY!'}
              </h3>
            </div>
            
            <div className="p-10">
              {/* Slot Machine Display */}
              <div className="bg-gradient-to-b from-black via-gray-900 to-black rounded-2xl p-8 shadow-2xl border-4 border-gray-800">
                {/* Top lights */}
                <div className="flex justify-center space-x-3 mb-6">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isCountingComplete 
                          ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse' 
                          : isSpinning
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-gray-600'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>

                {/* Reels */}
                <div className="bg-gradient-to-b from-gray-950 to-black rounded-xl p-6 shadow-inner">
                  <div className="flex justify-center items-center gap-4">
                    {digits.map((digit, index) => (
                      <SlotReel 
                        key={index}
                        targetDigit={digit}
                        delay={index}
                        isComplete={isCountingComplete}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom lights */}
                <div className="flex justify-center space-x-3 mt-6">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isCountingComplete 
                          ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse' 
                          : isSpinning
                          ? 'bg-blue-500 animate-pulse'
                          : 'bg-gray-600'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Label */}
              <div className="text-center mt-8">
                <p className={`text-3xl font-black uppercase tracking-widest transition-all duration-500 ${
                  isCountingComplete ? 'text-yellow-400 glow-text' : 'text-gray-500'
                }`}>
                  JMC COINS
                </p>
              </div>

              {/* Loading indicator */}
              {isSpinning && !isCountingComplete && (
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reward Success Popup */}
      {showRewardPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in relative">
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl p-6 text-center">
              <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
            </div>

            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="inline-block bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                  <p className="text-5xl font-bold text-white mb-2">
                    {rewardCoins}
                  </p>
                  <p className="text-white font-semibold text-lg">JMC Coins</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 font-medium">
                {rewardMessage || `You've received ${rewardCoins} coins!`}
              </p>

              <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 mb-6">
                <p className="text-teal-700 font-medium">
                  Your coins have been added to your wallet
                </p>
              </div>

              <button
                onClick={handleCloseReward}
                className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .glow-text {
          text-shadow: 
            0 0 10px rgba(251, 191, 36, 1),
            0 0 20px rgba(251, 191, 36, 0.8),
            0 0 30px rgba(251, 191, 36, 0.6);
        }
      `}</style>
    </>
  );
};

export default KycBonusPopup;



import React, { useState, useEffect } from 'react';
import { useLazyKycrewardQuery } from '../kyc/kycApiSlice';
import { toast } from '../../../../ReusableComponents/Toasts/Toasts';

const KycBonusPopup = ({ kycBonusEligible, kycBonusClaimed, refetchUser }) => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardCoins, setRewardCoins] = useState(0);
  const [rewardMessage, setRewardMessage] = useState('');
  const [isScratched, setIsScratched] = useState(false);

  const [triggerKycReward, { isLoading }] = useLazyKycrewardQuery();

  // Show welcome popup if eligible and not claimed
  useEffect(() => {
    if (kycBonusEligible && kycBonusClaimed) {
      setShowWelcomePopup(true);
    }
  }, [kycBonusEligible, kycBonusClaimed]);

  const handleClaimBonus = async () => {
    try {
      const response = await triggerKycReward().unwrap();
      
      if (response.success) {
        // Updated to match the actual response structure
        setRewardCoins(response.data.tokens); // Changed from response.data to response.data.tokens
        setRewardMessage(response.message);
        setShowWelcomePopup(false);
        
        // Show scratch card after a short delay
        setTimeout(() => {
          setShowScratchCard(true);
        }, 300);
        
        // Refetch user data to update kycBonusClaimed status
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

  const handleScratch = () => {
    setIsScratched(true);
    
    // Show full reward popup after scratch animation
    setTimeout(() => {
      setShowScratchCard(false);
      setShowRewardPopup(true);
    }, 1500);
  };

  const handleCloseReward = () => {
    setShowRewardPopup(false);
    setIsScratched(false);
  };

  if (!showWelcomePopup && !showScratchCard && !showRewardPopup) return null;

  return (
    <>
      {/* Welcome Bonus Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-bounce-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-2xl p-6 text-center">
              <div className="text-6xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-white">Welcome Bonus!</h2>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <p className="text-gray-700 text-lg mb-6">
                Congratulations! You've been rewarded with JMC coins!
              </p>
              
              <div className="bg-teal-50 rounded-xl p-4 mb-6">
                <p className="text-teal-600 font-medium">
                  Click below to claim your bonus
                </p>
              </div>

              {/* Claim Button */}
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

      {/* Scratch Card Popup - Shows only coins number */}
      {showScratchCard && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-teal-600 mb-6">
                Scratch to reveal your reward!
              </h3>
              
              {/* Scratch Card */}
              <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
                {/* Background - Revealed Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-7xl font-bold text-white mb-2 animate-pulse">
                      {rewardCoins}
                    </p>
                    <p className="text-white font-semibold text-xl">Coins</p>
                  </div>
                </div>

                {/* Scratch Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl shadow-xl cursor-pointer transition-all duration-1000 flex items-center justify-center ${
                    isScratched ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                  }`}
                  onClick={handleScratch}
                >
                  {!isScratched && (
                    <div className="text-center">
                      <p className="text-white font-bold text-2xl mb-2">SCRATCH</p>
                      <p className="text-white text-sm">👆 Click to scratch</p>
                    </div>
                  )}
                </div>
              </div>

              {!isScratched && (
                <p className="text-gray-600 mt-6 text-sm">
                  Click on the card to reveal your reward
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reward Success Popup - Full details */}
      {showRewardPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in relative">
            {/* Confetti Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="confetti">🎊</div>
              <div className="confetti">✨</div>
              <div className="confetti">🎉</div>
              <div className="confetti">⭐</div>
            </div>

            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-2xl p-6 text-center">
              <div className="text-6xl mb-3 animate-pulse">✨</div>
              <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
            </div>

            {/* Content */}
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
                  🎁 Your coins have been added to your wallet
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseReward}
                className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Awesome! 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        .confetti {
          position: absolute;
          font-size: 2rem;
          animation: float 3s infinite;
        }

        .confetti:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
        }

        .confetti:nth-child(2) {
          left: 30%;
          animation-delay: 0.5s;
        }

        .confetti:nth-child(3) {
          right: 30%;
          animation-delay: 1s;
        }

        .confetti:nth-child(4) {
          right: 10%;
          animation-delay: 1.5s;
        }
      `}</style>
    </>
  );
};

export default KycBonusPopup;
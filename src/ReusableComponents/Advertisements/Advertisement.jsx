import { useNavigate } from "react-router-dom";
import icon from "../../assets/logo.webp";

const KycAdvertisement = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <>
      {/* The CSS-in-JS animations remain the same as they are perfect. */}
      <style>{`
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .kyc-ad-bottom {
          animation: slideInFromBottom 0.5s ease-out;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes bounceArrow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        .bounce-arrow {
          animation: bounceArrow 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* --- RESPONSIVE CHANGES START HERE --- */}
      <div 
        // Mobile: Full width at the bottom with margins.
        // Desktop (md+): Fixed to the bottom-right.
        className="fixed bottom-4 left-4 right-4 z-50 kyc-ad-bottom md:left-auto md:right-8 md:w-auto"
      >
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg shadow-xl border border-teal-500/30 relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>

          {/* Close button (no changes needed) */}
          <button
            onClick={onClose}
            className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-gray-900 transition-colors text-xs z-10"
            aria-label="Close KYC advertisement"
          >
            ×
          </button>

          <div
            className="flex items-center gap-2 p-2 cursor-pointer md:gap-3 md:p-3"
            onClick={() => navigate('/kyc-information')}
          >
            {/* Icon Section */}
            <div className="flex-shrink-0">
              <div className="rounded-full shadow-lg">
                <img 
                  src={icon} 
                  alt="JMC Coin" 
                  // Responsive width and height classes
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                  Welcome Bonus
                </span>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                  NEW
                </span>
              </div>
              <h4 className="text-white font-bold text-sm">
                Complete KYC → Get 500-1000 JMC Coins!
              </h4>
              <p className="text-teal-100 text-xs mt-0.5">
                Quick verification • Instant bonus • One-time offer
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 bounce-arrow">
              <svg
                // Slightly larger arrow on desktop for better visual balance
                className="w-5 h-5 text-white md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* --- RESPONSIVE CHANGES END HERE --- */}
    </>
  );
};

export default KycAdvertisement;
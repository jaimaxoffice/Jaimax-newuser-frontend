import React from 'react';

export default function ReviewsSection() {
  const googleReviewUrl = "https://g.page/r/CdDTqJnUq_5LEBE/review";
  const trustpilotReviewUrl = "https://www.trustpilot.com/review/jaimax.com?utm_medium=trustbox&utm_source=TrustBoxReviewCollector";

  const handleGoogleClick = () => {
    window.open(googleReviewUrl, '_blank');
  };

  const handleTrustpilotClick = () => {
    window.open(trustpilotReviewUrl, '_blank');
  };

  return (
    <div className="w-full py-8 md:py-16 px-4" style={{ backgroundColor: '#085056' }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto px-4">
            Your trust means everything to us. Read what our customers have to say about their experience with Jaimax.
          </p>
          <div className="mt-4 md:mt-6">
            <p className="text-sm md:text-base text-white/80 font-medium">
              Share your experience and help others discover Jaimax
            </p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="rounded-2xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
            
            {/* Section 1: 800+ Reviews on Google */}
            <div 
              className="text-center pb-4 md:pb-0 border-b bg-[#ffff] md:border-b-0 md:border-r border-gray-200 cursor-pointer transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50"
              onClick={handleGoogleClick}
            >
              <h2 className="text-xl md:text-4xl font-bold text-gray-800 mb-1 md:mb-2">800+ Reviews</h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-base md:text-lg">on Google</span>
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="flex justify-center gap-0.5 md:gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Click to leave a review</p>
            </div>

            {/* Section 2: Google Rating */}
            <div 
              className="text-center bg-[#ffff] cursor-pointer transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50 pb-4 md:pb-3 border-b md:border-b-0 md:border-r border-gray-200"
              
            >
              <div className="flex justify-center gap-0.5 md:gap-1 mb-2 md:mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-base md:text-lg font-semibold text-gray-700">Google Rating</span>
              </div>
              <p className="text-xs text-gray-500">Rate your experience</p>
            </div>

            {/* Section 3: Trustpilot Rating */}
            <div 
              className="cursor-pointer bg-[#ffff] transition-transform hover:scale-105 active:scale-95 p-3 md:p-4 rounded-xl hover:bg-white/50"
              onClick={handleTrustpilotClick}
            >
              <div className="flex flex-col items-center gap-2">
                {/* Trustpilot Stars */}
                <div className="text-[#00b67a] text-2xl md:text-3xl tracking-tight">
                  ★★★★★
                </div>

                {/* Trustpilot Logo */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm md:text-base font-bold text-gray-800">
                    Review Us On{" "}
                    <span className="text-[#00b67a]">Trustpilot</span>
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Help others by sharing your experience
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-10">
          <p className="text-white/90 text-sm md:text-base">
            We appreciate every review. Your feedback helps us improve and guides others in their journey.
          </p>
        </div>

      </div>
    </div>
  );
}
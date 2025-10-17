import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetailsQueryDataQuery } from "./GoaVacationApiSlice";
import Loader from "../../../../ReusableComponents/Loader/loader";
import Cookies from "js-cookie";
import ReferralModal from "../../../../ReusableComponents/modals/referalModal";

const MarketingPlanReferrals = () => {
  const navigate = useNavigate();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef(null);

  let storedUser = null;
  try {
    storedUser = JSON.parse(Cookies.get("userData"));
  } catch (e) {
    console.error("Invalid JSON in localStorage:", e);
  }

  const userId = storedUser?._id;
  console.log("Stored User ID:", userId);
  const {
    data: userDetails,
    isLoading,
    error,
  } = useUserDetailsQueryDataQuery(userId);
  const handleClick = () => {
    navigate("/add-funds");
  };
  const directRefs = userDetails?.data?.directRefs || [];
  const chainRefs = userDetails?.data?.chainRefs || [];
  const grandTotal = userDetails?.data?.grandTotal || 0;
  const totalGrandTotalRequired =
    userDetails?.data?.totalGrandTotalRequired || 0;
  const [activeTab, setActiveTab] = useState("L1");
  const currentReferrals = activeTab === "L1" ? directRefs : chainRefs;
  const eligibilityCount =
    activeTab === "L1" ? directRefs.length : chainRefs.length;
  const targetCount = activeTab === "L1" ? 10 : 40;
  const userProfile = userDetails?.data;
  const eligible = userDetails?.data?.eligible;
  const message = eligible
    ? "Congratulations! You are eligible for GOA vacation."
    : directRefs.length > 7
    ? "You're so close! Just a few more referrals and you'll be enjoying your dream Goa vacation."
    : "Share with your network today and unlock your paradise getaway to Goa tomorrow!";
  console.log("console", grandTotal, totalGrandTotalRequired);
  return (
    <div className="min-h-screen bg-[#f8fffd]">
      {/* Paradise Header */}
      <div
        className="relative h-48 sm:h-56 md:h-64 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 to-teal-800/90"></div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white px-4">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-1 text-center">
              Paradise Awaits in Goa
            </h1>
            <div className="flex justify-center">
              <p className="text-sm sm:text-base md:text-lg text-teal-100 italic max-w-2xl text-center">
                Refer friends. Earn rewards. Experience paradise.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen mx-auto px-3 sm:px-4 pt-2 sm:pt-12 md:pt-6 pb-12 md:pb-20">
        {/* User Profile & Progress Section */}
        <div className="mb-8 md:mb-12">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* User Profile - Full width on mobile, 1/3 on md+ */}
              <div className="w-full md:w-1/3 bg-gradient-to-br from-teal-600 to-emerald-500 p-4 sm:p-5 md:p-6 lg:p-8 text-white">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="inline-flex p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm mb-3 sm:mb-4">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                      {userProfile?.name || "Loading..."}
                    </h2>
                    <div className="flex items-center gap-1 sm:gap-2 text-teal-100 mb-3 sm:mb-4 text-xs sm:text-sm">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                      </svg>
                      <span className="truncate">
                        {userProfile?.email || "email@example.com"}
                      </span>
                    </div>
                  </div>

                  {/* Referral ID - Responsive padding & text size */}
                  <div className="mt-3 sm:mt-4 md:mt-6">
                    <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                      <div className="text-xs uppercase tracking-wide mb-1">
                        Your Referral ID
                      </div>
                      <div className="text-base sm:text-lg md:text-xl font-mono font-bold tracking-wider truncate">
                        {userProfile?.username || "loading..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress & Eligibility - Full width on mobile, 2/3 on md+ */}
              <div className="w-full md:w-2/3 p-4 sm:p-5 md:p-6 lg:p-8">
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                    Your Goa Vacation Progress
                  </h3>

                  <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100">
                    <p className="text-teal-800 font-medium text-xs sm:text-sm">
                      {message}
                    </p>
                  </div>
                </div>

                <div className="mb-4 sm:mb-5">
                  <div className="flex flex-wrap justify-between mb-1 sm:mb-2 items-baseline">
                    <span className="font-medium text-gray-700 text-xs sm:text-sm">
                      Business Requirement
                    </span>
                    <div className="text-right">
                      <span className="font-bold text-teal-600 text-xs sm:text-sm">
                        ₹{grandTotal.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                        <span className="text-gray-500 font-normal"> / </span>
                       ₹ {totalGrandTotalRequired.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                     
                    </div>
                  </div>

                  <div className="h-2 sm:h-2.5 md:h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min(
                          100,
                          (grandTotal / totalGrandTotalRequired) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-5">
                  <div className="flex flex-wrap justify-between mb-1 sm:mb-2 items-baseline">
                    <span className="font-medium text-gray-700 text-xs sm:text-sm">
                      Eligibility Progress
                    </span>
                    <span className="font-bold text-teal-600 text-xs sm:text-sm">
                      {eligibilityCount}/{targetCount}
                    </span>
                  </div>

                  <div className="h-2 sm:h-2.5 md:h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min(
                          100,
                          (eligibilityCount / targetCount) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Tab Selector - More compact on mobile */}
                <div className="flex gap-1.5 sm:gap-2 md:gap-4">
                  <button
                    className={`flex-1 py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                      activeTab === "L1"
                        ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab("L1")}
                  >
                    L1 Eligibility
                  </button>
                  <button
                    className={`flex-1 py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-md sm:rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                      activeTab === "L2"
                        ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab("L2")}
                  >
                    L2 Eligibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {activeTab === "L1" ? "Direct Referrals" : "Chain Referrals"}
            </h2>
            <div className="text-xs sm:text-sm font-medium text-teal-600 bg-teal-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              {currentReferrals.length} People Referred
            </div>
          </div>

          {currentReferrals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentReferrals.map((referral, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="h-1.5 sm:h-2 bg-gradient-to-r from-teal-400 via-emerald-500 to-green-400"></div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-teal-600 font-bold text-base sm:text-lg">
                          {referral.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                            {referral.name}
                          </h3>
                          <div className="text-xs text-gray-500">
                            {referral.username}
                          </div>
                        </div>
                      </div>
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                        </svg>
                        <span className="truncate">{referral.email}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="truncate">{referral.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center shadow-sm border border-gray-100">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Start Your Journey to Goa!
              </h4>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto mb-4 sm:mb-6">
                Invite your friends and family to join you on this amazing
                vacation opportunity. Each referral brings you closer to
                paradise!
              </p>
              {/* <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-teal-200 transform hover:-translate-y-1 duration-300">
                Share Your Invite Code
              </button> */}
              <button
                onClick={handleClick}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-teal-200 transform hover:-translate-y-1 duration-300"
              >
                Share Your Invite Code
              </button>
            </div>
          )}
        </div>
      </div>

      {(isLoading || loading) && <Loader />}

    {/* Referral Modal */}
{showReferralModal && (
  <ReferralModal
  show={showReferralModal}
  onHide={() => setShowReferralModal(false)}
  userData={userProfile}
  referralContent={referralContent}
  />
)}
</div>

  );
};

export default MarketingPlanReferrals;

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../src/App.css";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import Cookies from "js-cookie";
import Loader from "../../../../ReusableComponents/Loader/loader";
import Pagination from "../../../../ReusableComponents/pagination/pagination";
import { useUserDetailsQuery } from "../myTotalTeam/myTotalTeamApiSlice";
import KycBonusPopup from "../dashBoard/kycpopup";
import {
  useGetRoundQuery,
  useGetAnnounceQuery,
  useUserDataQuery,
} from "../dashBoard/DashboardApliSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KycAdvertisement from "../../../../ReusableComponents/Advertisements/Advertisement";
// Lazy-loaded components
const ActionButtons = lazy(() => import("./actionComponent/actionCompent"));
const TopCards = lazy(() => import("./cards/cards"));
const SlabTabs = lazy(() => import("./timeTracker/timeTracker"));
import CountdownTimer from "../../../../pages/popups/CoinPricePopup1";
// Loading fallback component
const ComponentLoader = () => (
  <div className="p-4 bg-white/10 animate-pulse rounded-lg">
    <div className="h-24 bg-teal-100/30 rounded"></div>
  </div>
);

// Memoized Table component to prevent unnecessary re-renders
const TeamTable = React.memo(({ data, isLoading, currentPage, perPage }) => {
  if (isLoading) {
    return (
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="bg-white border-t border-teal-200">
            <td colSpan="7" className="p-3">
              <Loader />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr className="border-t border-teal-200 justify-center align-center">
          <td colSpan="7" className="p-4 text-center text-gray-600">
            <p className="text-teal text-lg font-medium">
              No team members found
            </p>
            <p className="text-teal text-sm mt-2">
              Try adjusting your search criteria
            </p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item, i) => (
        <tr
          key={item._id || i}
          className="bg-white text-xs font-semibold hover:bg-gray-50 transition-colors"
        >
          <td className="p-3 text-gray-700">
            {currentPage * perPage - (perPage - 1) + i}
          </td>
          <td className="p-3 text-gray-900">{item.name || "N/A"}</td>
          <td className="p-3 break-all text-gray-700">{item.email || "N/A"}</td>
          <td className="p-3 text-gray-700">{item.username || "N/A"}</td>
          <td className="p-3 text-gray-700">
            {item.totalDirectReferrals + item.totalChainReferrals || 0}
          </td>
          <td className="p-3 text-gray-700">
            {item.createdAt
              ? item.createdAt.slice(0, 10).split("-").reverse().join("-")
              : "N/A"}
          </td>
          <td className="p-3">
            <span
              className={`text-xs px-2 py-1 rounded-full text-white ${
                item.isActive ? "bg-teal-600" : "bg-teal-400"
              }`}
            >
              {item.isActive ? "Active" : "Inactive"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
});

// Memoized mobile cards component
const MobileTeamCards = React.memo(({ data, isLoading }) => {
  if (isLoading) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full p-6 bg-white rounded-xl shadow-md border border-teal-100"
          >
            <Loader />
          </div>
        ))}
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-8 bg-white rounded-xl shadow-md border border-teal-100 text-center">
        <div className="text-teal-300 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-teal-600 text-lg font-medium">
          No team members found
        </p>
        <p className="text-teal-400 text-sm mt-2">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <>
      {data.map((item, i) => (
        <div
          key={item._id || i}
          className="w-full bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-teal-200"
        >
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white truncate">
                {item.name || "N/A"}
              </h2>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  item.isActive
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-500 text-white shadow-sm"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">Email:</span>
              <span className="text-sm text-teal-800 break-all">
                {item.email || "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">
                Username:
              </span>
              <span className="text-sm text-teal-800">
                {item.username || "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">
                Referrals:
              </span>
              <span className="text-sm font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded-md">
                {item.totalChainReferrals + item.totalDirectReferrals || 0}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-teal-600 font-medium">
                Join Date:
              </span>
              <span className="text-sm text-teal-800">
                {item.createdAt
                  ? item.createdAt.slice(0, 10).split("-").reverse().join("-")
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

// Add display names for React DevTools
TeamTable.displayName = "TeamTable";
MobileTeamCards.displayName = "MobileTeamCards";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showKycAd, setShowKycAd] = useState(true);
    const [isInTimeRange, setIsInTimeRange] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [queryState, setQueryState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      setIsTokenVerified(true);
    }
  }, [token]);
  const { data: userData, fetch: userRefetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });

  // Memoized query parameters
  const queryParams = useMemo(
    () => `limit=${queryState.perPage}&page=${queryState.currentPage}}`,
    [queryState.perPage, queryState.currentPage]
  );

  // API data fetching
  const { data, isLoading, isError, error, refetch } =
    useUserDetailsQuery(queryParams);
  const tableData = useMemo(
    () => data?.data?.detailedDirectRefs || [],
    [data?.data?.detailedDirectRefs]
  );
  const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
  const shouldFetch = apiData?.data?.isActiveAnnouncement === true;
  const {
    data: announceData,
    isLoading: announceLoading,
    Error,
  } = useGetAnnounceQuery(undefined, { skip: !shouldFetch });
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    if (error?.data?.status_code === 400) {
      toast.error(error?.data?.message);
      Cookies.remove("token");
      Cookies.remove("userData");
      Cookies.remove("email");
      Cookies.remove("rememberMe");
      navigate("/login");
    }
  }, [error, navigate]);

  // Debounced search handler
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const timeoutId = setTimeout(() => {
      setQueryState((prev) => ({
        ...prev,
        search: value,
        currentPage: 1,
      }));
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  const handleImageClick = (redirectUrl) => {
    navigate(`/${redirectUrl}`);
  };

  // Pagination handler
  const handlePageChange = useCallback((page) => {
    setQueryState((prev) => ({ ...prev, currentPage: page }));
  }, []);
  // KYC Advertisement Component - Horizontal Teal Theme
  useEffect(() => {
    const startDate = new Date("2025-11-24T00:00:00").getTime();
    const endDate = new Date("2025-12-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();

      // Check if before start date or after end date
      if (now < startDate || now > endDate) {
        setIsInTimeRange(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsInTimeRange(true);

      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsInTimeRange(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen p-0 bg-[#1d8e85] rounded-xl text-sm sm:text-base md:text-lg overflow-auto">
      {/* {userData?.data && (
        <KycBonusPopup
          kycBonusEligible={userData?.data?.kycBonusEligible}
          kycBonusClaimed={userData?.data?.kycBonusClaimed}
          onClose={() => {
            console.log("Bonus popup closed");
          }}
          refetchUser={userRefetch}
        />
      )}
      {userData?.data?.kycStatus === "" && showKycAd && (
        <KycAdvertisement 
          show={true}
          onClose={() => setShowKycAd(false)}
        />
      )} */}
      {/* Announcement Slider - Mobile Only */}
      {apiData?.data?.isActiveAnnouncement &&
        announceData?.data?.[0]?.slides && (
          <>
            <style>{`
  .announcement-slider {
    position: relative;
    padding-bottom: 8px;
    margin-bottom: 5px;
  }

  .announcement-slider .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  /* Perfectly centered horizontal dots */
  .custom-dots {
    position: absolute;
    bottom: -2;
    left: 0;
    right: 0;
    width: 100%;
    display: flex !important;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto; /* Center with auto margins */
    padding: 0;
    list-style: none;
    height: 10px;
    text-align: center; /* Additional centering */
  }

  .custom-dots li {
    display: inline-flex; /* Use inline-flex for better alignment */
    margin: 0 3px;
    vertical-align: middle;
    height: 6px;
  }

  .custom-dots li button {
    padding: 0;
    border: 0;
    background: transparent;
    display: block;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 0;
    line-height: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .custom-dots li.slick-active button {
    width: 18px;
    border-radius: 3px;
    background-color: white;
  }

  /* Ensure slider container doesn't clip dots */
  .slider-container {
    overflow: visible !important;
    position: relative; /* Ensure proper positioning context */
  }
`}</style>

            <div className="w-full px-1 sm:px-2 mb-0 block md:hidden">
              <div className="announcement-slider max-w-sm sm:max-w-md md:max-w-lg mx-auto rounded-lg">
                <Slider
                  {...settings}
                  dots={true}
                  arrows={false}
                  dotsClass="custom-dots"
                  customPaging={(i) => <button aria-label={`Slide ${i + 1}`} />}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  className="slider-container"
                >
                  {announceData.data[0].slides.map((slide, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageClick(slide.redirectUrl)}
                      className="cursor-pointer"
                    >
                      <div
                        className="
          absolute 
          top-[75%]       min-[640px]:top-[25%]      md:top-[50%]
          left-[23%]      min-[640px]:left-[28%]     md:left-[30%]
          -translate-x-1/2 
          -translate-y-1/2 
          z-10 mb-2
        "
                      >
                        <div className="rounded-lg p-3 sm:p-4 md:p-6   transition-all duration-300">
                          <h6 className="hidden sm:block text-white text-[8px] sm:text-xs md:text-sm font-bold mb-2 md:mb-4 text-center">
                            Time Remaining
                          </h6>

                          <div className="flex gap-1.5 md:gap-4">
                            <div className="text-center">
                              <div className="bg-white/20 rounded-lg p-0.5 sm:md:p-0 md:p-3 min-w-[20px] sm:max-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                <span
                                  key={timeLeft.days}
                                  className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
                                >
                                  {String(timeLeft.days).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-white text-[6px] sm:text-[5px] md:text-xs  md:mt-2">
                                Days
                              </p>
                            </div>

                            <div className="text-center">
                              <div className="bg-white/20 rounded-lg p-0.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                <span
                                  key={timeLeft.hours}
                                  className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
                                >
                                  {String(timeLeft.hours).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-white text-[6px] sm:text-[5px] md:text-xs  md:mt-2">
                                Hours
                              </p>
                            </div>

                            <div className="text-center">
                              <div className="bg-white/20 rounded-lg p-0.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[30px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110">
                                <span
                                  key={timeLeft.minutes}
                                  className="text-[9px] md:text-sm sm:text-[5px] font-semibold text-white block animate-flip"
                                >
                                  {String(timeLeft.minutes).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-white text-[6px] sm:text-[5px] md:text-xs  md:mt-2">
                                Minutes
                              </p>
                            </div>

                            <div className="text-center">
                              <div className="bg-white/20 rounded-lg p-0.5 md:p-3 sm:md:p-0 min-w-[20px] sm:min-w-[20px] md:min-w-[60px] hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-glow">
                                <span
                                  key={timeLeft.seconds}
                                  className="text-[9px] md:text-sm sm:text-xs font-semibold text-white block animate-scale"
                                >
                                  {String(timeLeft.seconds).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-white text-[6px] sm:text-xs md:text-xs  md:mt-2">
                                Seconds
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <img src={slide.image} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </>
        )}
     {/* CountdownTimer - Only visible on desktop (md and above) */}
<div className="mb-3 hidden md:block">
  <Suspense fallback={<Loader />}>
    <CountdownTimer />
  </Suspense>
</div>
      <div className="mb-3">
        <Suspense fallback={<Loader />}>
          <ActionButtons />
        </Suspense>
      </div>

      {/* SlabTabs and TopCards - Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-2 mb-3">
        <div className="lg:w-1/3">
          <Suspense fallback={<Loader />}>
            <SlabTabs />
          </Suspense>
        </div>

        <div className="w-full">
          <Suspense fallback={<Loader />}>
            <TopCards />
          </Suspense>
        </div>
      </div>

      {/* Team Details Section */}
      <div className="w-full bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen px-4 py-6">
        <div className="max-w-9xl mx-auto">
          {/* Header with Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-teal-800 mb-4 sm:mb-0">
              Total Team Details
            </h1>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search"
                className="w-full h-10 bg-white border border-gray-300 rounded-lg pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200 text-sm shadow-sm hover:border-gray-400"
                onChange={handleSearch}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile View - Cards */}
          <div className="flex flex-wrap gap-4 lg:hidden">
            <MobileTeamCards data={tableData} isLoading={isLoading} />
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto mt-4 rounded-lg">
            <table className="w-full border-collapse rounded-lg">
              <thead>
                <tr style={{ backgroundColor: "#13b3a1" }}>
                  <th className="p-3 text-left text-white text-sm font-semibold w-[60px]">
                    S.No
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Name
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Email
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Username
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Referrals
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Join Date
                  </th>
                  <th className="p-3 text-left text-white text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <TeamTable
                data={tableData}
                isLoading={isLoading}
                currentPage={queryState.currentPage}
                perPage={queryState.perPage}
              />
            </table>
          </div>

          {/* Pagination */}
          {!isLoading &&
            tableData.length > 0 &&
            data?.data?.pagination?.totalPages > 1 && (
              <div className="mt-3 flex justify-center">
                <Pagination
                  currentPage={queryState.currentPage}
                  totalPages={data?.data?.pagination?.totalPages || 1}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);

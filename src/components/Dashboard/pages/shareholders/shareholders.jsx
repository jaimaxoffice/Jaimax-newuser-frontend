import React, { useState, useEffect ,useRef} from "react";
import { ChevronLeft, ChevronRight, Search, Users, CheckCircle, Clock, XCircle, User, Mail, Phone, TrendingUp, Award, Target } from "lucide-react";
import { useGetUserInfoMutation } from "./shareholderApiSlice";
import ShareholderCard from "./SharePop";
import ShareholderForm from "./ShareUpdate";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Loader/loader";


const ShareholderEligibility = () => {
  const [getUserInfo, { isLoading, data, error }] = useGetUserInfoMutation();
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [showShareholders, setShowShareholders] = useState(false);
  const [errormessage, setErrormessage] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPage: 1,
    perPage: "10",
    search: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData") || "{}");
    const username = user.data.username;
    console.log("Username:", username);
    if (username) {
      setLoading(true);
      setErrormessage("");
      getUserInfo({ username })
        .then((response) => {
          if (response.data && response.data.success === 1) {
            // Success case
          } else {
            const message = response.data?.message || "API response error";
            setErrormessage(message);
          }
        })
        .catch((err) => {
          setErrormessage("Failed to fetch user info.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [getUserInfo]);

  useEffect(() => {
    const handleError = async () => {
      if (error) {
        const errorMsg = error.data?.message || "Something went wrong.";
        setErrormessage(errorMsg);
      }
    };
    handleError();
  }, [error]);

  useEffect(() => {
    if (data?.data?.detailedDirectReferrals) {
      setFilteredReferrals(data.data.detailedDirectReferrals);
    }
  }, [data]);

  // Search functionality
  let searchTimeout;
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
      if (data?.data?.detailedDirectReferrals) {
        const filtered = data.data.detailedDirectReferrals.filter(referral =>
          referral.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          referral.username.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredReferrals(filtered);
      }
    }, 500);
  };

  const handlePageChange = (page) => {
    const totalPages = Math.ceil(filteredReferrals.length / Number(state.perPage)) || 1;
    if (page < 1 || page > totalPages) return;

    setLoading(true);
    setState(prevState => ({
      ...prevState,
      currentPage: page
    }));

    setTimeout(() => setLoading(false), 300);
  };

  // Create placeholder data for skeleton loading
  const placeholderData = {
    username: "LOADING...",
    name: "Loading...",
    email: "loading@example.com",
    phone: "+91 XXXXXXXXXX",
    directReferrals: 0,
    chainReferrals: 0,
    isEligibleForShareHolder: false,
    eligibilityPercentage: 0,
    progressStatus: "Loading...",
    detailedDirectReferrals: [],
    photoVerificationCompleted: false,
    profileImage: null,
    qualifiedDirectMembers: 0
  };

  const userData = (isLoading || loading || !data?.data) ? placeholderData : data.data;

  // Sort function
  function sortByProgressStatus(referrals) {
    return referrals.sort((a, b) => {
      if (a.isQualified && !b.isQualified) return -1;
      if (!a.isQualified && b.isQualified) return 1;
      if (a.eligibilityPercentage !== b.eligibilityPercentage) {
        return b.eligibilityPercentage - a.eligibilityPercentage;
      }
      if (a.totalReferrals !== b.totalReferrals) {
        return b.totalReferrals - a.totalReferrals;
      }
      return a.name.localeCompare(b.name);
    });
  }

  const {
    username,
    name,
    email,
    phone,
    directReferrals,
    chainReferrals,
    isEligibleForShareHolder,
    eligibilityPercentage,
    progressStatus,
    detailedDirectReferrals,
    photoVerificationCompleted,
    profileImage,
    qualifiedDirectMembers,
  } = userData;

  const indexOfLastReferral = state.currentPage * Number(state.perPage);
  const indexOfFirstReferral = indexOfLastReferral - Number(state.perPage);
  const currentReferrals = sortByProgressStatus([...filteredReferrals]).slice(
    indexOfFirstReferral,
    indexOfLastReferral
  );

  const totalPages = Math.ceil(filteredReferrals.length / Number(state.perPage)) || 1;

  const handleShareholdersClick = () => {
    setShowShareholders(true);
    document.body.style.overflow = 'hidden';
  };
 useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && event.target === modalRef.current) {
        handleCloseModalAndNavigate(); // Call the combined function
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array as handleCloseModalAndNavigate is defined inside

  const handleCloseModalAndNavigate = () => {
    handleCloseModal(); // Close the modal
    navigate('/profile'); // Navigate to the profile route
  };
  const handleCloseModal = () => {
    setShowShareholders(false);
    document.body.style.overflow = 'unset';
  };

  // Eligible form modal
  if (data?.data && userData.isEligibleForShareHolder === true && userData.photoVerificationCompleted === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-teal-100">

          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"ref={modalRef}>
            <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-md w-full mx-0 relative border border-gray-100">
              <button
                onClick={handleCloseModalAndNavigate}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold transition-colors"
              >
                ✕
              </button>
              <ShareholderForm />
            </div>
          </div>
        
      </div>
    );
  }

  // Error state
  if (errormessage && !isLoading && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-teal-100">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 text-center p-8 max-w-md w-full">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">{errormessage}</h3>
            <div className="space-y-3">
              <button
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => navigate("/dashboard")}
              >
                Invest Now
              </button>
              <button
                className="w-full border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
                onClick={handleShareholdersClick}
              >
                View Shareholders
              </button>
            </div>
          </div>

          {/* Modal */}
          {showShareholders && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
                  <h2 className="text-gray-800 text-2xl font-bold">Shareholders</h2>
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
                <div className="p-2 overflow-y-auto max-h-[calc(90vh-100px)]">
                  <ShareholderCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-600">
      <section className="py-4 sm:py-6 min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-4 sm:pb-6 mb-6 sm:mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Shareholder Eligibility
              </h1>
            </div>
            <div className="w-full lg:w-auto">
              <button
                onClick={handleShareholdersClick}
                className="w-full lg:w-auto bg-white text-teal-600 hover:bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Shareholders
              </button>
            </div>
          </div>

          {/* Compact Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Profile Card */}
            <div
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredCard('profile')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'profile' ? 'opacity-10' : 'opacity-5'}`}>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-teal-300 rounded-full blur-lg transform -translate-x-2 translate-y-2"></div>
              </div>

              <div className="relative p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110 shadow-lg' : ''}`}>
                    {isLoading || loading ? (
                      <div className="w-full h-full animate-pulse rounded-lg sm:rounded-xl bg-gray-300"></div>
                    ) : profileImage ? (
                      <img
                        src={`${profileImage}?t=${new Date().getTime()}`}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                      />
                    ) : (
                      <User className={`w-5 h-5 sm:w-6 sm:h-6 text-teal-600 transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`} />
                    )}
                  </div>
                  {!isLoading && !loading && (
                    <span className={`bg-teal-50 text-teal-700 text-xs font-medium px-2 py-1 rounded-lg transition-all duration-300 text-center sm:text-left ${hoveredCard === 'profile' ? 'bg-teal-100 scale-105 shadow-sm' : ''}`}>
                      {username}
                    </span>
                  )}
                </div>

                {isLoading || loading ? (
                  <div className="space-y-2">
                    <div className="w-20 sm:w-24 h-3 sm:h-4 animate-pulse rounded bg-gray-300"></div>
                    <div className="w-24 sm:w-32 h-2 sm:h-3 animate-pulse rounded bg-gray-300"></div>
                    <div className="w-20 sm:w-28 h-2 sm:h-3 animate-pulse rounded bg-gray-300"></div>
                  </div>
                ) : (
                  <>
                    <h5 className={`font-bold text-gray-800 mb-2 text-sm sm:text-base truncate transition-all duration-300 ${hoveredCard === 'profile' ? 'text-teal-700' : ''}`}>{name}</h5>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className={`flex items-center transition-all duration-300 ${hoveredCard === 'profile' ? 'text-gray-700' : ''}`}>
                        <Mail className={`w-3 h-3 mr-2 text-teal-500 flex-shrink-0 transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`} />
                        <span className="truncate text-xs">{email}</span>
                      </div>
                      <div className={`flex items-center transition-all duration-300 ${hoveredCard === 'profile' ? 'text-gray-700' : ''}`}>
                        <Phone className={`w-3 h-3 mr-2 text-teal-500 flex-shrink-0 transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`} />
                        <span className="text-xs">{phone}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Eligibility Status Card */}
            <div
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredCard('eligibility')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'eligibility' ? 'opacity-10' : 'opacity-5'}`}>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-green-400 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
              </div>

              <div className="relative p-3 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mr-2 transition-all duration-300 ${hoveredCard === 'eligibility' ? 'scale-110 shadow-lg' : ''}`}>
                      <CheckCircle className={`w-3 h-3 sm:w-4 sm:h-4 text-green-600 transition-all duration-300 ${hoveredCard === 'eligibility' ? 'scale-110' : ''}`} />
                    </div>
                    <h6 className={`font-semibold text-gray-800 text-xs sm:text-sm transition-all duration-300 ${hoveredCard === 'eligibility' ? 'text-green-700' : ''}`}>Eligibility</h6>
                  </div>
                  {!isLoading && !loading && (
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold text-white transition-all duration-300 ${eligibilityPercentage >= 100 ? 'bg-green-500' :
                      eligibilityPercentage > 50 ? 'bg-orange-500' : 'bg-orange-500'
                      } ${hoveredCard === 'eligibility' ? 'scale-105 shadow-lg' : ''}`}>
                      {eligibilityPercentage}%
                    </span>
                  )}
                </div>

                {isLoading || loading ? (
                  <div className="space-y-2">
                    <div className="w-16 sm:w-20 h-3 sm:h-4 animate-pulse rounded bg-gray-300"></div>
                    <div className="w-full h-2 animate-pulse rounded bg-gray-300"></div>
                  </div>
                ) : (
                  <>
                    <div className={`inline-block px-2 sm:px-3 py-1 rounded-lg text-white font-medium text-xs mb-2 transition-all duration-300 ${isEligibleForShareHolder
                      ? 'bg-green-500'
                      : 'bg-orange-500'
                      } ${hoveredCard === 'eligibility' ? 'scale-105 shadow-md' : ''}`}>
                      {isEligibleForShareHolder ? "Eligible" : "Not Eligible"}
                    </div>

                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ease-in-out rounded-full ${hoveredCard === 'eligibility' ? 'scale-y-125' : ''}`}
                        style={{
                          width: `${eligibilityPercentage}%`,
                          background: eligibilityPercentage >= 100 ?
                            'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' :
                            eligibilityPercentage > 50 ?
                              'linear-gradient(90deg, #f97316 0%, #ea580c 100%)' :
                              'linear-gradient(90deg, #f97316 0%, #ea580c 100%)',
                          transformOrigin: 'left center'
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Referrals Card */}
            <div
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredCard('referrals')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'referrals' ? 'opacity-10' : 'opacity-5'}`}>
                <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-teal-400 rounded-full blur-xl transform -translate-x-4 -translate-y-4"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-teal-300 rounded-full blur-lg transform translate-x-2 translate-y-2"></div>
              </div>

              <div className="relative p-3 sm:p-4 lg:p-5">
                <div className="flex items-center mb-3">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mr-2 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110 shadow-lg' : ''}`}>
                    <Users className={`w-3 h-3 sm:w-4 sm:h-4 text-teal-600 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110' : ''}`} />
                  </div>
                  <h6 className={`font-semibold text-gray-800 text-xs sm:text-sm transition-all duration-300 ${hoveredCard === 'referrals' ? 'text-teal-700' : ''}`}>Referrals</h6>
                </div>

                {isLoading || loading ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="w-10 sm:w-12 h-5 sm:h-6 animate-pulse rounded bg-gray-300"></div>
                      <div className="w-10 sm:w-12 h-5 sm:h-6 animate-pulse rounded bg-gray-300"></div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className={`text-center transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-105' : ''}`}>
                      <div className={`text-base sm:text-lg font-bold text-teal-600 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110 text-teal-700' : ''}`}>{directReferrals}</div>
                      <div className={`text-xs text-gray-500 transition-all duration-300 ${hoveredCard === 'referrals' ? 'text-gray-600' : ''}`}>Direct</div>
                    </div>
                    <div className={`text-center transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-105' : ''}`}>
                      <div className={`text-base sm:text-lg font-bold text-teal-600 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110 text-teal-700' : ''}`}>{chainReferrals}</div>
                      <div className={`text-xs text-gray-500 transition-all duration-300 ${hoveredCard === 'referrals' ? 'text-gray-600' : ''}`}>Chain</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Card */}
            <div
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredCard('performance')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'performance' ? 'opacity-10' : 'opacity-5'}`}>
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-green-400 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
              </div>

              <div className="relative p-3 sm:p-4 lg:p-5">
                <div className="flex items-center mb-3">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mr-2 transition-all duration-300 ${hoveredCard === 'performance' ? 'scale-110 shadow-lg' : ''}`}>
                    <TrendingUp className={`w-3 h-3 sm:w-4 sm:h-4 text-green-600 transition-all duration-300 ${hoveredCard === 'performance' ? 'scale-110' : ''}`} />
                  </div>
                  <h6 className={`font-semibold text-gray-800 text-xs sm:text-sm transition-all duration-300 ${hoveredCard === 'performance' ? 'text-green-700' : ''}`}>Performance</h6>
                </div>

                {isLoading || loading ? (
                  <div className="space-y-2">
                    <div className="w-12 sm:w-16 h-5 sm:h-6 animate-pulse rounded bg-gray-300"></div>
                    <div className="w-16 sm:w-20 h-2 sm:h-3 animate-pulse rounded bg-gray-300"></div>
                  </div>
                ) : (
                  <>
                    <div className={`text-base sm:text-lg font-bold text-green-600 mb-1 transition-all duration-300 ${hoveredCard === 'performance' ? 'scale-110 text-green-700' : ''}`}>{qualifiedDirectMembers}</div>
                    <div className={`text-xs text-gray-500 mb-2 transition-all duration-300 ${hoveredCard === 'performance' ? 'text-gray-600' : ''}`}>Qualified Members</div>
                    <div className={`text-xs text-gray-600 italic transition-all duration-300 ${hoveredCard === 'performance' ? 'text-gray-700 not-italic' : ''}`}>{progressStatus}</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Direct Referrals Table */}
          <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="relative bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-xl transform hover:scale-105 transition-transform duration-200">
                    <Users className="relative w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="text-gray-800 font-bold text-lg sm:text-xl mb-1">Direct Referrals Network</h5>
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                      <span className="text-gray-600 text-sm">Total entries:</span>
                      <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-md">
                        {isLoading || loading ? (
                          <div className="w-6 sm:w-8 h-3 sm:h-4 animate-pulse rounded bg-teal-300"></div>
                        ) : (
                          filteredReferrals.length
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative w-full lg:w-64 xl:w-80">
                  <input
                    type="text"
                    className="relative w-full bg-white border-2 border-gray-200 text-gray-800 placeholder-gray-500 px-4 sm:px-5 py-2 sm:py-3 pr-10 sm:pr-12 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-lg transition-all duration-200 hover:shadow-xl text-sm sm:text-base"
                    placeholder="Search your network..."
                    onChange={handleSearch}
                  />
                  <Search className="absolute right-3 sm:right-4 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                    {['S/No', 'Name', 'Username', 'Direct', 'Chain', 'Total', 'Progress', 'Status'].map((header, index) => (
                      <th key={index} className="px-4 xl:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading || loading ? (
                    [...Array(Number(state.perPage))].map((_, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
                        {[...Array(8)].map((_, j) => (
                          <td key={j} className="px-4 xl:px-6 py-3 sm:py-4">
                            <div className="animate-pulse h-3 sm:h-4 rounded bg-gray-300"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : currentReferrals.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-12 sm:py-16">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          </div>
                          <h6 className="text-gray-800 font-bold text-base sm:text-lg mb-2">No referrals found</h6>
                          <p className="text-gray-500 text-sm max-w-md text-center">
                            Try adjusting your search criteria or start building your network by inviting new members.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentReferrals.map((referral, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-teal-50/30 transition-all duration-300 hover:shadow-md group"
                      >
                        <td className="px-4 xl:px-6 py-3 sm:py-4">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-center text-teal-700 text-xs sm:text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow duration-200">
                            {indexOfFirstReferral + i + 1}
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4">
                          <div className="font-semibold text-gray-800 text-sm group-hover:text-teal-700 transition-colors duration-200">{referral.name}</div>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4">
                          <span className="text-gray-600 text-xs bg-gray-50 px-2 py-1 rounded-lg">{referral.username}</span>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4 text-center">
                          <span className="text-gray-600 text-xs font-semibold px-2 sm:px-3 py-1 sm:py-2 rounded-xl min-w-[32px] inline-block">
                            {referral.directReferrals}
                          </span>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4 text-center">
                          <span className="text-gray-600 text-xs font-semibold px-2 sm:px-3 py-1 sm:py-2 rounded-xl min-w-[32px] inline-block">
                            {referral.chainReferrals}
                          </span>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4 text-center">
                          <span className="text-gray-600 text-xs font-semibold px-2 sm:px-3 py-1 sm:py-2 rounded-xl min-w-[32px] inline-block">
                            {referral.totalReferrals}
                          </span>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4 text-center">
                          <div className="inline-block min-w-[140px] sm:min-w-[160px]">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-700 text-xs font-semibold">{referral.taskCompletionPercentage}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2 sm:h-2.5 w-28 sm:w-32 overflow-hidden shadow-inner">
                              <div
                                className="h-full transition-all duration-700 ease-out rounded-full shadow-sm"
                                style={{
                                  width: `${referral.taskCompletionPercentage}%`,
                                  background: referral.taskCompletionPercentage >= 100 ?
                                    'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' :
                                    referral.taskCompletionPercentage > 50 ?
                                      'linear-gradient(90deg, #f97316 0%, #ea580c 100%)' :
                                      'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 xl:px-6 py-3 sm:py-4 text-center">
                          {referral.isQualified ? (
                            <span className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center min-w-[70px] sm:min-w-[90px] justify-center shadow-sm">
                              <CheckCircle className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden sm:inline">Qualified</span>
                              <span className="sm:hidden">✓</span>
                            </span>
                          ) : referral.eligibilityPercentage > 0 ? (
                            <span className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 text-orange-700 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center min-w-[70px] sm:min-w-[90px] justify-center shadow-sm">
                              <Clock className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden sm:inline">Pending</span>
                              <span className="sm:hidden">⏳</span>
                            </span>
                          ) : (
                            <span className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center min-w-[70px] sm:min-w-[90px] justify-center shadow-sm">
                              <XCircle className="w-3 h-3 mr-1 sm:mr-1.5 flex-shrink-0" />
                              <span className="hidden sm:inline">Not Eligible</span>
                              <span className="sm:hidden">✗</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden p-3 sm:p-4 space-y-3 sm:space-y-4">
              {isLoading || loading ? (
                [...Array(Number(state.perPage))].map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-pulse">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-lg sm:rounded-xl mr-2 sm:mr-3"></div>
                        <div>
                          <div className="w-20 sm:w-24 h-3 sm:h-4 bg-gray-300 rounded mb-1"></div>
                          <div className="w-16 sm:w-20 h-2 sm:h-3 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                      <div className="w-12 sm:w-16 h-5 sm:h-6 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                      <div className="w-full h-6 sm:h-8 bg-gray-300 rounded-lg"></div>
                      <div className="w-full h-6 sm:h-8 bg-gray-300 rounded-lg"></div>
                      <div className="w-full h-6 sm:h-8 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded-full mb-2"></div>
                    <div className="w-16 sm:w-20 h-5 sm:h-6 bg-gray-300 rounded-lg"></div>
                  </div>
                ))
              ) : currentReferrals.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
                    <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h6 className="text-gray-800 font-bold text-base sm:text-lg mb-2">No referrals found</h6>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Try adjusting your search criteria or start building your network by inviting new members.
                  </p>
                </div>
              ) : (
                currentReferrals.map((referral, i) => (
                  <div
                    key={i}
                    className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden group"
                  >
                    <div className="relative p-3 sm:p-4 lg:p-5">
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 rounded-xl flex items-center justify-center text-teal-700 text-xs sm:text-sm font-bold shadow-sm mr-2 sm:mr-3 group-hover:shadow-md transition-shadow duration-200 flex-shrink-0">
                            {indexOfFirstReferral + i + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h6 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-teal-700 transition-colors duration-200 truncate">{referral.name}</h6>
                            <span className="text-gray-500  text-xs bg-gray-50 px-2 py-1 rounded-lg inline-block mt-1">{referral.username}</span>
                          </div>
                        </div>

                        {/* Status Badge - Made more responsive */}
                        <div className="flex-shrink-0 ml-2">
                          {referral.isQualified ? (
                            <span className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center shadow-sm min-w-[60px] sm:min-w-[80px] justify-center">
                              <CheckCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="hidden xs:inline">Qualified</span>
                              <span className="xs:hidden">✓</span>
                            </span>
                          ) : referral.eligibilityPercentage > 0 ? (
                            <span className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 text-orange-700 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center shadow-sm min-w-[60px] sm:min-w-[80px] justify-center">
                              <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="hidden xs:inline">Pending</span>
                              <span className="xs:hidden">⏳</span>
                            </span>
                          ) : (
                            <span className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl inline-flex items-center shadow-sm min-w-[60px] sm:min-w-[80px] justify-center">
                              <XCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="hidden xs:inline">Not Eligible</span>
                              <span className="xs:hidden">✗</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Referral Stats */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg sm:rounded-2xl p-2 sm:p-3 text-center shadow-sm">
                          <div className="text-sm sm:text-lg font-bold text-teal-600 mb-1">{referral.directReferrals}</div>
                          <div className="text-xs text-teal-700 font-medium">Direct</div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg sm:rounded-2xl p-2 sm:p-3 text-center shadow-sm">
                          <div className="text-sm sm:text-lg font-bold text-teal-600 mb-1">{referral.chainReferrals}</div>
                          <div className="text-xs text-teal-700 font-medium">Chain</div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg sm:rounded-2xl p-2 sm:p-3 text-center shadow-sm">
                          <div className="text-sm sm:text-lg font-bold text-teal-600 mb-1">{referral.totalReferrals}</div>
                          <div className="text-xs text-teal-700 font-medium">Total</div>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 text-sm font-semibold">Task Progress</span>
                          <span className="text-gray-700 text-sm font-bold">{referral.taskCompletionPercentage}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
                          <div
                            className="h-full transition-all duration-700 ease-out rounded-full shadow-sm"
                            style={{
                              width: `${referral.taskCompletionPercentage}%`,
                              background: referral.taskCompletionPercentage >= 100 ?
                                'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)' :
                                referral.taskCompletionPercentage > 50 ?
                                  'linear-gradient(90deg, #f97316 0%, #ea580c 100%)' :
                                  'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Enhanced Pagination */}
          <div className="flex flex-col lg:flex-row justify-between items-center mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100 gap-4 sm:gap-6 relative overflow-hidden">
            <div className="relative">
              {isLoading || loading ? (
                <div className="w-48 sm:w-64 h-4 sm:h-5 animate-pulse rounded bg-gray-300"></div>
              ) : (
                <div className="flex items-center bg-gradient-to-r from-gray-50 to-teal-50 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl">
                  <span className="text-gray-700 text-sm font-medium">
                    Showing <span className="font-bold text-teal-600">{currentReferrals.length > 0 ? indexOfFirstReferral + 1 : 0}</span> to <span className="font-bold text-teal-600">{Math.min(indexOfLastReferral, filteredReferrals.length)}</span> of <span className="font-bold text-teal-600">{filteredReferrals.length}</span> entries
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative">
              {/* Per Page Selector */}
              <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl shadow-sm">
                <span className="text-gray-700 text-sm font-medium mr-2 sm:mr-3">Show:</span>
                <select
                  className="bg-white border-2 border-gray-200 text-gray-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm min-w-[60px] sm:min-w-[80px] font-medium transition-all duration-200 hover:border-gray-300 text-sm"
                  value={state.perPage}
                  disabled={isLoading || loading}
                  onChange={(e) => {
                    setState({
                      ...state,
                      perPage: e.target.value,
                      currentPage: 1,
                    });
                  }}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>

              {/* Pagination Controls */}
              <nav className="relative">
                {isLoading || loading ? (
                  <div className="flex gap-1 sm:gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse rounded-lg sm:rounded-xl bg-gray-300"></div>
                    ))}
                  </div>
                ) : (
                  <ul className="flex items-center gap-1 sm:gap-2">
                    <li>
                      <button
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${state.currentPage === 1
                          ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
                          : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
                          }`}
                        onClick={() => handlePageChange(state.currentPage - 1)}
                        disabled={state.currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </li>

                    {totalPages <= 5 ? (
                      [...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        const isActive = state.currentPage === pageNum;
                        return (
                          <li key={index}>
                            <button
                              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 font-bold text-xs sm:text-sm ${isActive
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
                                : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
                                }`}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <li>
                          <button
                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 font-bold text-xs sm:text-sm ${state.currentPage === 1
                              ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
                              : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
                              }`}
                            onClick={() => handlePageChange(1)}
                          >
                            1
                          </button>
                        </li>

                        {state.currentPage > 3 && (
                          <li>
                            <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                              ...
                            </span>
                          </li>
                        )}

                        {[...Array(totalPages)].map((_, index) => {
                          const pageNum = index + 1;
                          if (
                            (pageNum !== 1 && pageNum !== totalPages) &&
                            (pageNum === state.currentPage - 1 ||
                              pageNum === state.currentPage ||
                              pageNum === state.currentPage + 1)
                          ) {
                            const isActive = state.currentPage === pageNum;
                            return (
                              <li key={index}>
                                <button
                                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 font-bold text-xs sm:text-sm ${isActive
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
                                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
                                    }`}
                                  onClick={() => handlePageChange(pageNum)}
                                >
                                  {pageNum}
                                </button>
                              </li>
                            );
                          }
                          return null;
                        })}

                        {state.currentPage < totalPages - 2 && (
                          <li>
                            <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                              ...
                            </span>
                          </li>
                        )}

                        <li>
                          <button
                            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 font-bold text-xs sm:text-sm ${state.currentPage === totalPages
                              ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
                              : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
                              }`}
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </li>
                      </>
                    )}

                    <li>
                      <button
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${state.currentPage === totalPages
                          ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
                          : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
                          }`}
                        onClick={() => handlePageChange(state.currentPage + 1)}
                        disabled={state.currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </div>

        {/* Shareholders Modal */}
        {showShareholders && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-6 flex justify-between items-center">
                <h2 className="text-gray-800 text-xl sm:text-2xl font-bold">Shareholders</h2>
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <ShareholderCard />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Loading Overlay */}
      {!data && isLoading && <Loader />}
    </div>
  );
};

export default ShareholderEligibility;
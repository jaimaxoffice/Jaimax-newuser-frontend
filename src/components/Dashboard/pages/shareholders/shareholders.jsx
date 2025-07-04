import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Users, CheckCircle, Clock, XCircle, User, Mail, Phone, TrendingUp, Award, Target } from "lucide-react";
import { useGetUserInfoMutation } from "./shareholderApiSlice";
import ShareholderCard from "./SharePop";
import ShareholderForm from "./ShareUpdate";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Loader/loader";
// const SkeltonComponent = () => <div className="animate-pulse bg-gray-300 h-4 rounded"></div>;

// const Loader = () => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
//   </div>
// );


// const ShareholderEligibility = () => {
//   const [getUserInfo, { isLoading, data, error }] = useGetUserInfoMutation();
//   const [loading, setLoading] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [filteredReferrals, setFilteredReferrals] = useState([]);
//   const [showShareholders, setShowShareholders] = useState(false);
//   const [errormessage, setErrormessage] = useState(null);
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: "10",
//     search: "",
//   });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userData") || "{}");
//     const username = 'JAIMAX433PHEU';
//     console.log("Username:", username);
//     if (username) {
//       setLoading(true);
//       setErrormessage("");
//       getUserInfo({ username })
//         .then((response) => {
//           if (response.data && response.data.success === 1) {
//             // Success case
//           } else {
//             const message = response.data?.message || "API response error";
//             setErrormessage(message);
//           }
//         })
//         .catch((err) => {
//           setErrormessage("Failed to fetch user info.");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [getUserInfo]);

//   useEffect(() => {
//     const handleError = async () => {
//       if (error) {
//         const errorMsg = error.data?.message || "Something went wrong.";
//         setErrormessage(errorMsg);
//       }
//     };
//     handleError();
//   }, [error]);

//   useEffect(() => {
//     if (data?.data?.detailedDirectReferrals) {
//       setFilteredReferrals(data.data.detailedDirectReferrals);
//     }
//   }, [data]);

//   // Search functionality
//   let searchTimeout;
//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//       if (data?.data?.detailedDirectReferrals) {
//         const filtered = data.data.detailedDirectReferrals.filter(referral =>
//           referral.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
//           referral.username.toLowerCase().includes(e.target.value.toLowerCase())
//         );
//         setFilteredReferrals(filtered);
//       }
//     }, 500);
//   };

//   const handlePageChange = (page) => {
//     const totalPages = Math.ceil(filteredReferrals.length / Number(state.perPage)) || 1;
//     if (page < 1 || page > totalPages) return;

//     setLoading(true);
//     setState(prevState => ({
//       ...prevState,
//       currentPage: page
//     }));

//     setTimeout(() => setLoading(false), 300);
//   };

//   // Create placeholder data for skeleton loading
//   const placeholderData = {
//     username: "LOADING...",
//     name: "Loading...",
//     email: "loading@example.com",
//     phone: "+91 XXXXXXXXXX",
//     directReferrals: 0,
//     chainReferrals: 0,
//     isEligibleForShareHolder: false,
//     eligibilityPercentage: 0,
//     progressStatus: "Loading...",
//     detailedDirectReferrals: [],
//     photoVerificationCompleted: false,
//     profileImage: null,
//     qualifiedDirectMembers: 0
//   };

//   const userData = (isLoading || loading || !data?.data) ? placeholderData : data.data;

//   // Sort function
//   function sortByProgressStatus(referrals) {
//     return referrals.sort((a, b) => {
//       if (a.isQualified && !b.isQualified) return -1;
//       if (!a.isQualified && b.isQualified) return 1;
//       if (a.eligibilityPercentage !== b.eligibilityPercentage) {
//         return b.eligibilityPercentage - a.eligibilityPercentage;
//       }
//       if (a.totalReferrals !== b.totalReferrals) {
//         return b.totalReferrals - a.totalReferrals;
//       }
//       return a.name.localeCompare(b.name);
//     });
//   }

//   const {
//     username,
//     name,
//     email,
//     phone,
//     directReferrals,
//     chainReferrals,
//     isEligibleForShareHolder,
//     eligibilityPercentage,
//     progressStatus,
//     detailedDirectReferrals,
//     photoVerificationCompleted,
//     profileImage,
//     qualifiedDirectMembers,
//   } = userData;

//   const indexOfLastReferral = state.currentPage * Number(state.perPage);
//   const indexOfFirstReferral = indexOfLastReferral - Number(state.perPage);
//   const currentReferrals = sortByProgressStatus([...filteredReferrals]).slice(
//     indexOfFirstReferral,
//     indexOfLastReferral
//   );

//   const totalPages = Math.ceil(filteredReferrals.length / Number(state.perPage)) || 1;

//   const handleShareholdersClick = () => {
//     setShowShareholders(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const handleCloseModal = () => {
//     setShowShareholders(false);
//     document.body.style.overflow = 'unset';
//   };

//   // Eligible form modal
//   if (data?.data && userData.isEligibleForShareHolder === true && userData.photoVerificationCompleted === false) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative border border-gray-100">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold transition-colors"
//             >
//               ✕
//             </button>
//             <ShareholderForm />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (errormessage && !isLoading && !loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <div className="min-h-screen flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 text-center p-8 max-w-md w-full">
//             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <XCircle className="w-8 h-8 text-orange-500" />
//             </div>
//             <h3 className="text-xl font-semibold mb-6 text-gray-800">{errormessage}</h3>
//             <div className="space-y-3">
//               <button
//                 className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Invest Now
//               </button>
//               <button
//                 className="w-full border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:border-gray-300"
//                 onClick={handleShareholdersClick}
//               >
//                 View Shareholders
//               </button>
//             </div>
//           </div>

//           {/* Modal */}
//           {showShareholders && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//                 <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
//                   <h2 className="text-gray-800 text-2xl font-bold">Shareholders</h2>
//                   <button
//                     onClick={handleCloseModal}
//                     className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition-colors duration-200 font-medium"
//                   >
//                     Close
//                   </button>
//                 </div>
//                 <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
//                   <ShareholderCard />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#13b5a3]">
//       <section className="py-6 min-h-screen">
//         <div className="container mx-auto px-2 lg:px-6">
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 mb-8">
//             <div className="mb-4 lg:mb-0">
//               <h1 className="text-white text-3xl lg:text-4xl font-bold mb-2">
//                 Shareholder Eligibility
//               </h1>
//               {/* <p className="text-gray-600">Monitor your progress and referral network</p> */}
//             </div>
//             <div className="w-full lg:w-auto">
//               <button
//                 onClick={handleShareholdersClick}
//                 className="w-full lg:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               >
//                 View Shareholders
//               </button>
//             </div>
//           </div>

//           {/* Compact Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             {/* Profile Card */}
//             <div
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
//               onMouseEnter={() => setHoveredCard('profile')}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Enhanced Background SVG with animation */}
//               <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'profile' ? 'opacity-25 scale-105' : 'opacity-5'}`}>
//                 <svg viewBox="0 0 200 200" className="w-full h-full">
//                   <circle
//                     cx="160"
//                     cy="40"
//                     r="30"
//                     fill="currentColor"
//                     className={`transition-all duration-500 ${hoveredCard === 'profile' ? 'text-teal-400 drop-shadow-lg' : 'text-teal-500'}`}
//                     style={{
//                       transformOrigin: '160px 40px',
//                       filter: hoveredCard === 'profile' ? 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.4))' : 'none'
//                     }}
//                   />
//                   <circle
//                     cx="40"
//                     cy="160"
//                     r="20"
//                     fill="currentColor"
//                     className={`transition-all duration-700 ${hoveredCard === 'profile' ? 'text-blue-300 drop-shadow-lg' : 'text-blue-400'}`}
//                     style={{
//                       transformOrigin: '40px 160px',
//                       filter: hoveredCard === 'profile' ? 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.4))' : 'none'
//                     }}
//                   />
//                   <path
//                     d="M20,180 Q100,120 180,160"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     fill="none"
//                     className={`transition-all duration-300 ${hoveredCard === 'profile' ? 'text-teal-300 stroke-[4]' : 'text-teal-400'}`}
//                     style={{
//                       filter: hoveredCard === 'profile' ? 'drop-shadow(0 0 4px rgba(45, 212, 191, 0.5))' : 'none'
//                     }}
//                   />
//                 </svg>
//               </div>

//               {/* Hover glow effect */}
//               <div className={`absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5 transition-opacity duration-300 ${hoveredCard === 'profile' ? 'opacity-100' : 'opacity-0'}`}></div>

//               <div className="relative p-5">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110 shadow-lg from-teal-200 to-teal-300' : ''}`}>
//                     {isLoading || loading ? (
//                       <div className="w-full h-full animate-pulse rounded-xl bg-gray-300"></div>
//                     ) : profileImage ? (
//                       <img
//                         src={`${profileImage}?t=${new Date().getTime()}`}
//                         alt="Profile"
//                         className="w-full h-full object-cover rounded-xl"
//                       />
//                     ) : (
//                       <User className={`w-6 h-6 text-teal-600 transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`} />
//                     )}
//                   </div>
//                   {!isLoading && !loading && (
//                     <span className={`bg-teal-50 text-teal-700 text-xs font-medium px-2 py-1 rounded-lg transition-all duration-300 ${hoveredCard === 'profile' ? 'bg-teal-100 scale-105 shadow-sm' : ''}`}>
//                       {username}
//                     </span>
//                   )}
//                 </div>

//                 {isLoading || loading ? (
//                   <div className="space-y-2">
//                     <div className="w-24 h-4 animate-pulse rounded bg-gray-300"></div>
//                     <div className="w-32 h-3 animate-pulse rounded bg-gray-300"></div>
//                     <div className="w-28 h-3 animate-pulse rounded bg-gray-300"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <h5 className={`font-bold text-gray-800 mb-2 truncate transition-all duration-300 ${hoveredCard === 'profile' ? 'text-teal-700 scale-105' : ''}`}>{name}</h5>
//                     <div className="space-y-1 text-xs text-gray-600">
//                       <div className={`flex items-center transition-all duration-300 ${hoveredCard === 'profile' ? 'text-gray-700' : ''}`}>
//                         <Mail className={`w-3 h-3 mr-2 text-teal-500 transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`} />
//                         <span className="truncate">{email}</span>
//                       </div>
//                       <div className={`flex items-center transition-all duration-300 ${hoveredCard === 'profile' ? 'text-gray-700' : ''}`}>
//                         <Phone className={`w-3 h-3 mr-2 text-teal-500 transition-all duration-300 ${hoveredCard === 'profile' ? 'scale-110' : ''}`} />
//                         <span>{phone}</span>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Eligibility Status Card */}
//             <div
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
//               onMouseEnter={() => setHoveredCard('eligibility')}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Enhanced Background SVG */}
//               <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'eligibility' ? 'opacity-30 scale-105' : 'opacity-5'}`}>
//                 <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000" preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1892 2683 c-12 -2 -20 -8 -18 -12 7 -10 76 -1 76 10 0 9 -17 10 -58 2z" /> <path d="M2000 2680 c0 -5 6 -10 13 -10 6 0 23 -3 37 -6 17 -5 22 -3 15 3 -15 15 -65 25 -65 13z" /> <path d="M1789 2640 c-13 -10 -21 -19 -17 -20 14 0 58 23 58 32 0 14 -16 9 -41 -12z" /> <path d="M2130 2630 c14 -11 32 -20 40 -20 10 0 7 7 -10 20 -14 11 -32 20 -40 20 -10 0 -7 -7 10 -20z" /> <path d="M945 2586 c-72 -18 -131 -51 -192 -108 -114 -108 -131 -167 -135 -451 l-3 -217 38 0 c26 0 37 -4 37 -15 0 -11 -20 -15 -92 -18 -51 -1 346 -3 882 -3 536 0 941 2 899 3 l-77 4 -3 219 c-3 146 -8 223 -16 231 -8 8 -13 3 -18 -23 -4 -18 -16 -50 -27 -71 -11 -22 -17 -41 -14 -45 5 -4 31 48 49 98 3 8 6 -81 6 -197 l1 -213 -790 0 c-696 0 -790 2 -790 15 0 13 90 15 754 15 l755 0 3 138 c2 75 0 175 -4 222 -4 47 -8 110 -7 142 0 69 -18 115 -72 179 -54 64 -102 89 -174 89 -71 0 -111 -17 -156 -67 -46 -51 -63 -102 -56 -164 6 -49 51 -151 65 -146 5 1 24 -6 43 -15 18 -9 42 -19 52 -22 20 -6 14 -26 -8 -26 -8 0 -30 14 -50 31 -19 17 -35 27 -35 21 0 -13 58 -62 73 -62 7 0 6 -4 -3 -10 -11 -7 -7 -10 19 -10 l34 0 -21 -23 c-12 -13 -22 -26 -22 -29 0 -3 20 -2 45 3 86 16 194 86 237 154 18 27 19 28 13 5 -33 -118 -146 -221 -294 -266 -58 -17 -61 -17 -61 1 0 8 -7 15 -17 15 -34 0 -125 54 -157 94 -62 76 -71 102 -71 206 0 82 4 102 25 144 14 27 47 68 73 92 27 24 44 44 38 44 -24 0 -102 -84 -128 -139 -23 -47 -28 -69 -28 -136 0 -96 24 -158 88 -222 47 -49 38 -56 -19 -14 -91 65 -135 144 -142 251 -5 91 19 164 75 229 l36 43 73 -3 c40 -2 76 0 80 4 4 4 -24 7 -62 7 -65 1 -68 2 -44 15 22 13 -15 14 -315 14 -235 -1 -355 -5 -390 -13z m360 -16 c-307 -6 -316 -8 -418 -73 -88 -56 -162 -163 -186 -267 -6 -25 -11 -125 -11 -222 0 -98 -4 -178 -8 -178 -5 0 -16 8 -24 18 -12 14 -15 49 -13 197 3 198 5 217 39 290 49 106 136 182 246 215 95 28 92 27 385 27 l270 -1 -280 -6z m233 -47 c-81 -84 -101 -249 -44 -363 36 -72 97 -134 158 -160 l49 -21 -21 -29 c-27 -38 -10 -38 33 -1 31 27 35 29 70 18 61 -19 53 -28 -47 -47 -47 -10 -56 -14 -42 -22 11 -6 28 -6 48 1 43 15 47 13 18 -9 -30 -24 -25 -24 82 -5 129 22 212 52 281 99 l64 44 -4 -82 c-3 -44 -6 -87 -8 -93 -4 -10 -157 -13 -724 -13 -395 0 -726 -3 -735 -6 -14 -6 -16 12 -16 168 0 197 12 261 63 347 60 99 170 179 279 200 24 5 153 9 288 10 l244 1 -36 -37z m422 23 c-73 -15 -117 -42 -157 -95 -37 -47 -46 -37 -11 12 46 66 102 96 178 96 l45 -1 -55 -12z m105 -32 c50 -24 66 -47 72 -108 10 -93 -39 -173 -133 -223 -45 -23 -57 -26 -71 -15 -10 6 -28 16 -41 22 -12 5 -28 14 -35 20 -6 5 -26 21 -43 35 -75 59 -33 208 74 265 46 24 132 26 177 4z m122 -164 c8 -68 -16 -127 -73 -180 -41 -38 -113 -77 -171 -95 -22 -6 -23 -6 -6 23 9 16 36 38 62 50 110 51 164 126 164 226 -1 71 14 55 24 -24z m-4 -266 c13 -70 -155 -160 -353 -189 -42 -7 -44 -6 -29 10 10 10 37 18 68 20 71 5 196 72 253 135 24 26 46 48 49 49 4 1 9 -11 12 -25z" /> <path d="M1015 2275 c-22 -8 -41 -15 -43 -15 -2 0 -10 -16 -17 -35 -19 -44 -6 -82 30 -91 57 -14 101 37 75 86 -6 12 -9 33 -6 46 4 13 5 24 4 24 -2 -1 -21 -7 -43 -15z m15 -51 c19 -50 -4 -82 -44 -62 -30 16 -8 87 27 88 4 0 12 -12 17 -26z" /> <path d="M1173 2279 c-88 -26 -97 -149 -11 -149 46 0 78 66 46 98 -9 9 -9 18 0 37 13 27 12 28 -35 14z m18 -55 c7 -20 6 -32 -6 -50 -18 -27 -19 -28 -47 -13 -15 8 -18 17 -13 37 6 26 30 52 47 52 5 0 13 -12 19 -26z" /> <path d="M1966 2423 c-4 -5 -14 -22 -21 -39 -8 -19 -29 -40 -56 -55 -24 -13 -45 -32 -47 -40 -4 -23 26 -51 47 -44 12 4 21 -3 29 -21 12 -26 40 -28 33 -3 -2 8 -6 22 -8 32 -4 14 1 17 26 17 18 0 42 -5 53 -11 27 -14 48 9 41 45 -4 20 -1 24 13 22 11 -2 13 -1 7 1 -23 8 -14 40 12 47 14 4 25 11 25 17 0 5 -11 4 -26 -4 -23 -12 -31 -12 -54 0 -16 7 -31 20 -34 28 -6 16 -28 20 -40 8z m56 -64 c37 -75 37 -93 -3 -85 -17 3 -39 6 -48 6 -9 0 -22 14 -29 32 -10 26 -9 35 3 48 8 9 15 23 15 32 0 18 10 29 24 25 6 -2 23 -28 38 -58z m-82 -71 c0 -5 -7 -11 -15 -14 -13 -5 -13 -8 0 -21 8 -8 15 -22 15 -30 0 -9 -13 4 -30 28 -34 51 -37 66 -12 72 16 3 42 -18 42 -35z" /> <path d="M1986 2360 c9 -35 33 -78 33 -60 0 8 -9 31 -20 50 -15 26 -18 29 -13 10z" /> <path d="M2221 2553 c13 -16 25 -30 27 -32 1 -2 5 -1 9 2 8 8 -36 57 -50 57 -6 0 0 -12 14 -27z" /> <path d="M2275 2463 c4 -10 10 -26 12 -35 4 -15 23 -26 23 -14 0 16 -24 66 -32 66 -6 0 -7 -8 -3 -17z" /> <path d="M2300 2329 c0 -24 4 -38 10 -34 6 3 10 22 10 41 0 19 -4 34 -10 34 -5 0 -10 -18 -10 -41z" /> <path d="M1214 1580 c-105 -52 -112 -215 -11 -276 47 -28 155 -27 194 2 26 19 28 27 31 95 l3 74 -76 0 -75 0 0 -32 c0 -32 2 -33 40 -33 36 0 40 -3 40 -24 0 -19 -7 -25 -34 -30 -47 -9 -85 8 -101 46 -34 83 34 151 120 118 20 -8 32 -6 51 6 31 21 27 32 -16 56 -45 24 -115 23 -166 -2z" /> <path d="M395 1440 l0 -150 128 0 127 0 0 35 0 35 -85 0 c-84 0 -85 0 -85 25 0 24 2 25 75 25 l75 0 0 36 0 35 -72 -2 c-68 -2 -73 -1 -76 19 -3 21 0 22 77 22 l81 0 0 35 0 35 -122 0 -123 0 0 -150z m75 101 c0 -5 -6 -14 -14 -20 -16 -13 -32 2 -21 19 8 12 35 13 35 1z m10 -99 c0 -5 -7 -15 -15 -22 -18 -15 -20 -51 -3 -68 15 -15 4 -26 -17 -19 -12 5 -15 23 -15 80 0 41 3 77 6 80 7 7 44 -36 44 -51z" /> <path d="M710 1440 l0 -150 119 0 119 0 0 35 0 35 -81 0 -80 0 7 115 6 115 -45 0 -45 0 0 -150z m64 -87 c19 -23 19 -23 -2 -23 -17 0 -22 6 -22 27 0 14 1 24 3 22 1 -2 11 -14 21 -26z" /> <path d="M990 1440 l0 -150 43 0 42 0 0 150 0 150 -42 0 -43 0 0 -150z" /> <path d="M1500 1440 l0 -150 43 0 42 0 0 150 0 150 -42 0 -43 0 0 -150z" /> <path d="M1655 1440 l0 -150 98 0 c62 0 110 5 132 14 56 24 71 73 34 120 -19 24 -19 27 -5 42 25 24 19 62 -13 95 -29 28 -31 29 -138 29 l-108 0 0 -150z m60 84 c-14 -27 -11 -54 6 -54 5 0 9 -11 9 -25 0 -14 -4 -25 -10 -25 -5 0 -10 -7 -10 -15 0 -8 -4 -15 -9 -15 -9 0 -13 138 -4 153 2 4 10 7 18 7 12 0 12 -4 0 -26z m91 -4 c27 0 34 -4 34 -20 0 -16 -7 -20 -34 -20 -19 0 -41 -3 -50 -6 -13 -5 -16 1 -16 26 0 25 3 31 16 26 9 -3 31 -6 50 -6z m77 -43 c-11 -17 -11 -29 0 -52 10 -18 9 -19 -9 -5 -10 8 -21 15 -23 17 -2 1 3 15 10 32 7 16 17 27 21 25 5 -3 5 -11 1 -17z m-45 -66 c6 -1 12 -12 12 -26 0 -22 -4 -25 -39 -25 -22 0 -46 -3 -55 -6 -13 -5 -16 1 -16 28 0 34 0 34 43 32 23 -2 48 -3 55 -3z" /> <path d="M1995 1440 l0 -150 120 0 120 0 0 35 0 35 -78 0 -78 0 3 115 3 115 -45 0 -45 0 0 -150z m74 -108 c-5 -2 -16 -1 -24 1 -11 5 -12 14 -6 46 1 2 10 -7 20 -20 11 -13 15 -26 10 -27z" /> <path d="M2275 1440 l0 -150 128 0 127 0 0 35 0 35 -85 0 c-84 0 -85 0 -85 25 0 24 2 25 75 25 l75 0 0 36 0 36 -75 -4 c-72 -3 -75 -2 -75 20 0 21 4 22 80 22 l80 0 0 35 0 35 -122 0 -123 0 0 -150z m60 84 c-14 -22 -14 -26 6 -54 21 -28 21 -31 6 -48 -20 -22 -22 -53 -5 -70 15 -15 4 -26 -17 -19 -12 5 -15 25 -15 105 0 61 4 102 12 110 19 19 30 1 13 -24z" /> <path d="M630 1092 c0 -5 14 -7 30 -4 25 4 30 1 30 -16 0 -18 -5 -20 -35 -15 -41 7 -43 -1 -24 -89 25 -115 103 -227 200 -285 99 -59 132 -63 550 -63 l377 0 7 -30 c9 -41 -13 -127 -38 -151 -11 -10 -18 -21 -16 -24 10 -9 258 82 314 116 141 84 265 294 265 449 0 19 3 51 6 70 l6 35 175 -4 c118 -2 179 1 186 8 8 8 -267 11 -1011 11 -562 0 -1022 -4 -1022 -8z m1650 -59 c-1 -186 -102 -384 -246 -484 -62 -42 -63 -36 -2 20 92 84 161 225 173 352 3 35 8 81 11 102 l4 37 -760 -2 c-718 -3 -760 -2 -760 15 0 16 44 17 790 17 l790 0 0 -57z m-1513 -193 c49 -69 126 -132 200 -161 57 -24 64 -24 461 -27 l402 -3 0 -57 c0 -37 -7 -70 -18 -92 -20 -37 -52 -58 -37 -24 5 11 11 44 13 74 6 93 28 88 -418 92 -377 3 -386 4 -445 27 -69 27 -153 86 -189 134 -54 70 -101 217 -69 217 7 0 13 6 14 13 0 6 11 -22 24 -63 14 -42 41 -100 62 -130z m685 187 l723 -2 3 -57 c5 -105 -70 -286 -156 -373 -47 -48 -92 -86 -92 -78 0 5 -4 2 -8 -5 -9 -13 -112 -56 -112 -46 0 3 7 18 15 33 14 28 20 77 17 134 l-2 27 -375 0 c-235 0 -394 4 -427 11 -121 25 -244 123 -295 235 -28 62 -43 142 -25 130 6 -4 337 -8 734 -9z" /> <path d="M1842 974 c-24 -17 -28 -49 -11 -88 9 -20 9 -29 -1 -41 -16 -20 -2 -20 48 1 60 23 81 85 42 124 -24 24 -48 25 -78 4z m72 -36 c12 -20 1 -44 -28 -62 -13 -9 -19 -7 -29 9 -16 28 -18 47 -5 63 15 17 48 12 62 -10z" /> <path d="M1990 963 c-14 -18 -19 -34 -14 -48 4 -11 7 -35 7 -52 1 -37 4 -39 50 -20 64 27 83 82 43 121 -32 33 -59 33 -86 -1z m80 -38 c0 -23 -23 -55 -39 -55 -11 0 -26 19 -34 43 -4 11 1 25 13 37 26 26 60 11 60 -25z" /> <path d="M550 876 c0 -16 24 -66 32 -66 6 0 7 8 3 18 -4 9 -10 25 -12 35 -4 14 -23 25 -23 13z" /> <path d="M600 764 c0 -11 42 -65 47 -60 6 6 -29 66 -39 66 -4 0 -8 -3 -8 -6z" /> <path d="M680 672 c0 -10 43 -52 53 -52 16 0 5 18 -23 38 -16 13 -30 19 -30 14z" /> <path d="M770 602 c0 -8 50 -32 66 -32 12 0 1 19 -13 23 -10 2 -26 8 -35 12 -10 4 -18 3 -18 -3z" /> <path d="M1010 550 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z" /> <path d="M1130 550 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z" /> <path d="M1250 550 c0 -5 16 -10 35 -10 19 0 35 5 35 10 0 6 -16 10 -35 10 -19 0 -35 -4 -35 -10z" /> <path d="M1370 550 c0 -6 16 -10 35 -8 19 1 35 6 35 10 0 4 -16 8 -35 8 -19 0 -35 -5 -35 -10z" /> <path d="M1490 550 c0 -5 13 -10 29 -10 17 0 33 5 36 10 4 6 -8 10 -29 10 -20 0 -36 -4 -36 -10z" /> <path d="M1610 550 c0 -5 13 -10 29 -10 17 0 33 5 36 10 4 6 -8 10 -29 10 -20 0 -36 -4 -36 -10z" /> <path d="M1145 439 c-167 -11 -225 -27 -160 -43 163 -41 935 -29 935 15 0 13 -54 11 -67 -2 -6 -6 -62 -15 -125 -18 -129 -9 -545 -5 -598 4 -19 4 -44 7 -55 6 -19 0 -19 1 -2 10 25 15 259 27 461 24 114 -2 154 0 121 5 -58 10 -365 9 -510 -1z" /> </g> </svg>
//               </div>

//               {/* Hover glow effect */}
//               <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 transition-opacity duration-300 ${hoveredCard === 'eligibility' ? 'opacity-100' : 'opacity-0'}`}></div>

//               <div className="relative p-5">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center">
//                     <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mr-2 transition-all duration-300 ${hoveredCard === 'eligibility' ? 'scale-110 shadow-lg from-emerald-200 to-emerald-300' : ''}`}>
//                       <CheckCircle className={`w-4 h-4 text-emerald-600 transition-all duration-300 ${hoveredCard === 'eligibility' ? 'scale-110' : ''}`} />
//                     </div>
//                     <h6 className={`font-semibold text-gray-800 text-sm transition-all duration-300 ${hoveredCard === 'eligibility' ? 'text-emerald-700' : ''}`}>Eligibility</h6>
//                   </div>
//                   {!isLoading && !loading && (
//                     <span className={`px-2 py-1 rounded-lg text-xs font-semibold text-white transition-all duration-300 ${eligibilityPercentage >= 100 ? 'bg-emerald-500' :
//                         eligibilityPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
//                       } ${hoveredCard === 'eligibility' ? 'scale-105 shadow-lg' : ''}`}>
//                       {eligibilityPercentage}%
//                     </span>
//                   )}
//                 </div>

//                 {isLoading || loading ? (
//                   <div className="space-y-2">
//                     <div className="w-20 h-4 animate-pulse rounded bg-gray-300"></div>
//                     <div className="w-full h-2 animate-pulse rounded bg-gray-300"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className={`inline-block px-3 py-1 rounded-lg text-white font-medium text-xs mb-2 transition-all duration-300 ${isEligibleForShareHolder
//                         ? 'bg-emerald-500'
//                         : 'bg-green-500'
//                       } ${hoveredCard === 'eligibility' ? 'scale-105 shadow-md' : ''}`}>
//                       {isEligibleForShareHolder ? "Eligible" : "Not Eligible"}
//                     </div>

//                     <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
//                       <div
//                         className={`h-full transition-all duration-1000 ease-in-out rounded-full ${hoveredCard === 'eligibility' ? 'scale-y-125' : ''}`}
//                         style={{
//                           width: `${eligibilityPercentage}%`,
//                           background: eligibilityPercentage >= 100 ?
//                             'linear-gradient(90deg, #10b981 0%, #059669 100%)' :
//                             eligibilityPercentage > 50 ?
//                               'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' :
//                               'linear-gradient(90deg, #22c55e 0%, #22c55e 100%)',
//                           transformOrigin: 'left center'
//                         }}
//                       ></div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Referrals Card */}
//             <div
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
//               onMouseEnter={() => setHoveredCard('referrals')}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Enhanced Background SVG */}
//               <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'referrals' ? 'opacity-25 scale-105' : 'opacity-5'}`}>
//                 <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="200.000000pt" viewBox="0 0 300.000000 200.000000" preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1060 1900 c-23 -23 -25 -50 -7 -102 9 -25 17 -34 26 -29 7 4 22 6 34 4 39 -8 77 13 77 42 0 79 -82 133 -130 85z m81 -20 c24 -19 24 -19 3 -20 -12 0 -36 3 -53 6 -25 5 -29 9 -20 20 16 20 43 17 70 -6z m-18 -66 c20 -4 37 -11 37 -15 0 -15 -77 -10 -90 6 -14 17 -8 19 53 9z" /> <path d="M1790 1839 c-65 -26 -105 -102 -82 -154 20 -42 64 -57 166 -54 50 1 105 -1 121 -6 l30 -8 -19 22 c-19 21 -19 22 1 44 31 33 36 62 19 96 -28 52 -65 71 -143 70 -37 0 -79 -5 -93 -10z m188 -38 c39 -27 44 -77 12 -106 -11 -10 -20 -23 -20 -29 0 -19 -173 -20 -209 -2 -62 33 -47 105 29 144 58 30 141 27 188 -7z" /> <path d="M1747 1763 c-4 -3 -7 -19 -7 -35 0 -26 3 -28 41 -28 32 0 40 3 37 17 -2 9 -10 18 -18 20 -13 4 -13 3 0 -6 8 -5 11 -13 8 -17 -10 -9 -58 4 -58 17 0 6 4 8 9 5 5 -4 8 1 7 9 -3 19 -11 27 -19 18z" /> <path d="M1784 1763 c10 -10 106 -11 106 -1 0 4 -25 8 -57 8 -31 0 -53 -3 -49 -7z" /> <path d="M1834 1717 c0 -18 5 -19 60 -13 32 3 70 6 82 6 13 0 24 3 24 8 0 9 -81 9 -97 -1 -6 -4 -13 -1 -16 5 -3 10 -8 9 -22 -2 -17 -13 -18 -13 -13 1 3 9 1 16 -6 16 -6 0 -12 -9 -12 -20z" /> <path d="M1006 1781 c-10 -16 5 -41 26 -41 14 0 19 6 16 22 -3 24 -32 36 -42 19z" /> <path d="M390 1743 c-31 -12 -60 -48 -76 -96 l-17 -51 25 -21 c19 -16 23 -26 16 -38 -11 -21 5 -23 21 -3 7 8 27 17 46 20 19 4 48 18 65 32 25 22 30 33 30 70 0 69 -50 109 -110 87z m75 -38 c14 -13 25 -32 24 -42 0 -15 -2 -14 -11 5 -11 22 -28 30 -28 13 0 -5 -9 -7 -20 -4 -11 3 -34 0 -51 -6 -36 -13 -42 -11 -34 12 7 16 60 46 83 47 7 0 24 -11 37 -25z m-97 -100 c36 14 103 27 109 22 12 -13 -21 -37 -66 -51 -43 -12 -46 -12 -63 10 -10 12 -18 33 -17 46 1 22 2 22 12 -5 7 -18 16 -26 25 -22z" /> <path d="M1361 1723 c-61 -48 -82 -154 -41 -206 16 -20 18 -30 10 -52 -15 -39 -13 -41 15 -15 13 12 49 33 79 45 l54 22 7 -33 c11 -62 97 -133 161 -134 11 0 40 -17 64 -37 24 -20 41 -33 39 -28 -3 6 -13 27 -24 47 -18 37 -18 38 1 59 14 15 19 35 19 73 -1 100 -68 188 -154 202 -37 6 -43 4 -71 -25 -16 -18 -32 -48 -36 -67 -7 -37 -19 -45 -101 -72 -22 -7 -33 -7 -33 0 0 5 -9 21 -20 35 -20 26 -28 79 -10 68 6 -3 10 -19 10 -35 0 -28 1 -29 30 -19 18 7 30 18 30 29 0 10 7 20 15 24 8 3 15 1 15 -3 0 -5 -6 -11 -12 -14 -7 -2 -11 -7 -8 -10 9 -10 71 25 86 47 16 25 8 67 -12 59 -9 -3 -11 -14 -7 -34 4 -19 1 -29 -6 -29 -8 0 -10 8 -6 19 3 11 1 22 -4 26 -10 6 -91 -31 -101 -46 -3 -4 -11 -4 -19 0 -27 17 33 96 80 106 41 9 65 -1 88 -38 18 -27 21 -29 21 -11 0 12 -9 33 -21 48 -29 36 -91 36 -138 -1z m269 -98 c77 -40 127 -177 80 -220 -14 -13 -18 -25 -14 -39 6 -20 6 -20 -13 -3 -11 9 -33 17 -50 17 -72 0 -152 102 -138 176 13 72 72 102 135 69z" /> <path d="M1510 1546 c0 -40 3 -47 30 -61 29 -15 30 -15 30 5 0 14 -4 19 -12 14 -8 -5 -9 -1 -5 12 7 18 7 18 -8 0 -12 -16 -15 -17 -15 -4 0 8 7 21 15 28 11 9 15 9 15 1 0 -7 4 -10 9 -7 5 4 16 3 25 0 14 -5 14 -8 1 -21 -27 -26 -16 -43 40 -69 31 -13 60 -24 65 -24 6 0 10 22 10 49 0 41 -3 50 -21 54 -19 5 -21 2 -17 -34 2 -24 0 -38 -7 -36 -5 2 -10 21 -10 41 0 36 -2 38 -57 61 -32 13 -58 21 -58 18 0 -3 -7 0 -15 7 -13 11 -15 6 -15 -34z" /> <path d="M994 1721 c-11 -11 -3 -72 10 -77 8 -3 17 -23 21 -45 6 -32 11 -39 29 -39 31 0 35 7 26 41 -6 21 -5 31 6 37 11 6 11 15 4 44 -9 33 -14 36 -51 40 -22 2 -42 2 -45 -1z m56 -45 c0 -8 3 -23 7 -33 4 -11 -2 -8 -15 9 -26 31 -27 38 -7 38 8 0 15 -6 15 -14z" /> <path d="M654 1700 c-33 -13 -64 -59 -64 -95 0 -18 10 -47 23 -66 34 -51 79 -70 167 -68 49 0 88 -5 113 -15 21 -9 37 -12 37 -6 0 5 -4 10 -9 10 -14 0 -41 29 -41 43 0 9 2 9 8 0 15 -23 44 43 36 80 -6 28 -8 30 -15 12 -6 -17 -8 -17 -8 -3 -1 30 -67 94 -109 106 -45 14 -107 15 -138 2z m156 -34 c63 -29 99 -107 64 -137 -8 -7 -13 -21 -11 -31 3 -12 1 -16 -6 -11 -7 4 -41 6 -77 5 -75 -4 -114 8 -147 44 -26 28 -31 80 -10 107 36 48 116 58 187 23z" /> <path d="M620 1608 c1 -44 12 -58 51 -58 30 0 37 3 33 15 -4 8 -1 15 5 15 6 0 11 -8 11 -18 0 -16 10 -18 81 -19 72 -2 80 0 74 15 -4 9 -10 27 -12 40 -8 33 -20 27 -15 -8 3 -19 0 -30 -7 -30 -7 0 -9 5 -6 10 7 12 -3 50 -14 50 -4 0 -6 -13 -3 -30 3 -19 0 -30 -8 -30 -7 0 -10 6 -7 14 3 8 -1 22 -8 33 -13 17 -14 17 -29 -2 -8 -11 -16 -26 -16 -32 0 -7 -5 -13 -11 -13 -6 0 -9 6 -6 14 3 8 1 16 -6 19 -8 2 -8 5 1 11 7 4 12 2 12 -4 0 -6 5 -8 10 -5 24 15 6 25 -44 25 -51 0 -53 -1 -49 -24 3 -16 10 -23 19 -19 8 3 14 1 14 -4 0 -5 -9 -9 -19 -10 -14 -1 -21 6 -23 24 -3 27 -28 46 -28 21z" /> <path d="M2076 1657 c-27 -19 -18 -71 12 -75 25 -4 62 23 62 44 0 16 -28 44 -44 44 -7 0 -20 -6 -30 -13z" /> <path d="M1271 1564 c-1 -23 34 -74 51 -74 6 0 3 9 -8 21 -10 11 -24 33 -31 47 -10 24 -11 25 -12 6z" /> <path d="M2083 1563 l-72 -4 -12 -37 c-15 -50 -9 -96 14 -100 14 -3 17 4 17 35 0 21 5 45 10 53 6 10 7 -24 3 -97 l-6 -113 32 0 c65 0 71 10 71 120 0 60 4 100 10 100 6 0 10 -21 10 -46 0 -38 3 -45 18 -42 35 7 24 142 -11 136 -7 -1 -45 -4 -84 -5z m39 -75 c-1 -64 -1 -65 -11 -50 -5 9 -10 -7 -15 -44 -3 -31 -4 -59 -1 -62 3 -3 5 6 5 19 0 13 5 31 10 39 7 11 8 5 4 -20 -4 -19 -13 -42 -20 -50 -12 -12 -14 -11 -14 8 0 13 -4 20 -10 17 -13 -8 -13 1 0 26 8 14 7 19 -2 19 -9 0 -9 3 -2 8 17 11 24 52 8 45 -10 -4 -12 6 -9 44 2 26 4 49 4 51 1 2 13 2 27 0 25 -3 27 -6 26 -50z" /> <path d="M248 1515 c-10 -21 -9 -29 5 -43 24 -23 52 -5 52 34 0 40 -40 47 -57 9z" /> <path d="M978 1489 c-27 -16 -23 -65 7 -85 23 -15 27 -15 50 0 30 20 32 49 5 76 -22 22 -37 24 -62 9z" /> <path d="M1772 1475 c-1 -16 -13 -49 -27 -73 -26 -46 -14 -53 18 -11 13 19 17 38 14 70 -2 29 -4 34 -5 14z" /> <path d="M295 1450 c-11 -5 -32 -11 -47 -14 -25 -6 -28 -10 -28 -50 0 -54 8 -76 26 -76 13 0 18 -13 27 -65 2 -15 10 -19 32 -18 37 3 46 19 39 71 -5 33 -3 46 9 55 14 10 14 20 6 60 -11 49 -22 55 -64 37z m31 -55 c8 -31 -2 -59 -17 -49 -9 5 -10 -5 -6 -37 6 -36 5 -40 -4 -25 -20 34 -30 95 -19 116 15 28 38 25 46 -5z" /> <path d="M1214 1434 c-22 -33 -9 -78 24 -82 32 -5 52 15 52 52 0 58 -46 76 -76 30z" /> <path d="M933 1373 c-25 -9 -13 -93 14 -93 7 0 35 -21 62 -48 34 -34 51 -61 59 -95 8 -28 18 -47 26 -47 27 0 31 48 10 122 -4 12 -1 16 8 13 7 -3 20 -1 28 5 12 7 13 18 2 66 -6 31 -16 62 -22 69 -11 13 -158 19 -187 8z m174 -53 c15 -30 17 -80 3 -80 -6 0 -15 20 -22 45 -7 25 -16 45 -21 45 -4 0 -5 -10 -1 -22 15 -48 24 -95 24 -133 l0 -40 -18 30 c-10 17 -22 43 -26 58 -3 15 -10 25 -15 23 -16 -10 -63 44 -58 64 3 11 1 20 -3 20 -5 0 -11 -10 -13 -22 -4 -16 -5 -14 -4 7 2 35 26 43 96 35 36 -4 48 -10 58 -30z" /> <path d="M1240 1325 c-30 -13 -59 -33 -64 -44 -5 -12 -5 -46 0 -83 8 -53 12 -63 30 -66 18 -3 22 -12 27 -54 9 -73 35 -86 81 -43 26 24 27 30 21 78 -3 29 -9 60 -12 70 -3 14 0 17 14 15 15 -2 18 3 17 37 0 22 -4 57 -8 78 -8 45 -24 46 -106 12z m68 -38 c6 -62 3 -81 -11 -92 -12 -9 -14 -24 -11 -76 5 -58 4 -62 -10 -46 -8 10 -20 51 -26 90 -14 91 -22 108 -16 37 5 -50 4 -53 -9 -36 -18 24 -19 76 -2 100 26 36 82 51 85 23z" /> <path d="M1796 1314 c-22 -22 -20 -66 5 -98 25 -31 52 -33 80 -5 16 16 19 27 14 52 -13 61 -63 87 -99 51z m54 -54 c0 -5 3 -16 6 -25 6 -15 4 -15 -15 -4 -24 16 -30 52 -6 43 8 -4 15 -10 15 -14z" /> <path d="M2382 1305 c-18 -8 -31 -19 -28 -24 3 -5 -5 -16 -19 -25 -68 -45 -90 -174 -46 -273 l23 -53 -26 -34 -26 -35 47 -7 c27 -3 55 -8 64 -9 9 -2 30 -16 47 -32 43 -39 129 -90 204 -120 53 -22 73 -25 130 -20 138 12 190 68 194 211 1 44 0 63 -2 41 -15 -141 -75 -226 -169 -239 -22 -3 -31 -3 -20 1 69 19 114 93 115 183 0 159 -91 305 -233 375 -88 43 -163 58 -220 45 -55 -12 -66 -12 -42 2 11 6 47 15 80 18 l60 7 -50 1 c-27 1 -65 -5 -83 -13z m214 -84 c131 -61 223 -194 232 -335 3 -62 1 -75 -20 -106 -33 -49 -63 -62 -127 -56 -68 6 -161 51 -243 117 -34 27 -72 49 -85 49 -20 0 -22 4 -17 24 4 16 -4 49 -20 90 -32 79 -32 97 -2 162 46 98 147 118 282 55z" /> <path d="M2346 1143 c-14 -64 -11 -108 5 -67 6 16 8 15 8 -8 1 -35 21 -37 21 -3 0 14 5 45 12 69 9 36 9 48 -1 60 -22 26 -29 19 -45 -51z" /> <path d="M2410 1158 c0 -13 -6 -46 -14 -75 -10 -37 -11 -54 -3 -62 20 -20 30 -12 24 19 -4 19 -2 30 5 30 6 0 8 11 4 31 -5 25 -3 30 9 25 18 -7 21 24 3 42 -18 18 -28 14 -28 -10z" /> <path d="M2445 1074 c-12 -55 -14 -79 -6 -87 8 -8 11 -5 11 10 0 12 7 28 15 37 11 10 13 24 9 42 -5 18 -3 25 3 21 6 -4 14 0 17 9 4 9 5 17 4 18 -2 1 -10 7 -19 14 -15 11 -19 4 -34 -64z" /> <path d="M2486 1040 c-14 -56 -15 -74 -6 -85 22 -26 33 -17 25 21 -4 22 -3 34 3 30 6 -3 12 1 16 9 3 8 1 17 -4 20 -15 9 -12 25 4 25 19 0 27 25 13 39 -22 22 -33 10 -51 -59z" /> <path d="M2538 1018 c-8 -35 -17 -69 -19 -77 -2 -7 1 -15 8 -18 6 -2 13 4 16 14 3 12 5 9 6 -9 1 -37 21 -46 21 -10 0 16 7 43 15 58 20 39 19 67 -3 87 -10 10 -21 17 -23 17 -3 0 -12 -28 -21 -62z" /> <path d="M2602 965 c-12 -41 -22 -79 -22 -85 0 -18 17 -11 28 13 11 20 12 19 7 -9 -5 -25 -1 -34 19 -47 14 -10 33 -14 42 -10 13 5 16 3 11 -10 -4 -10 5 -24 28 -41 45 -35 59 -34 52 3 -4 18 1 52 13 85 16 47 16 56 4 66 -15 14 -25 -4 -45 -86 -6 -24 -16 -47 -22 -51 -6 -4 -7 4 -3 23 24 94 27 137 13 152 -14 13 -19 7 -51 -54 -33 -65 -35 -67 -36 -36 0 18 7 40 16 49 21 22 15 82 -12 99 -19 13 -21 11 -42 -61z" /> <path d="M794 1255 c-140 -38 -252 -123 -304 -228 -55 -113 -51 -202 13 -259 23 -21 27 -28 14 -28 -25 0 -92 65 -105 102 l-12 33 5 -34 c3 -19 12 -46 21 -59 20 -30 75 -53 111 -46 16 3 36 0 45 -8 15 -11 16 -19 7 -52 -6 -22 -20 -52 -32 -67 -17 -24 -23 -26 -35 -16 -12 10 -14 9 -10 -3 11 -33 39 -19 108 54 54 56 84 79 119 91 67 22 179 87 233 134 54 48 98 129 98 181 0 81 -46 162 -110 195 -41 21 -111 26 -166 10z m147 -41 c58 -24 99 -83 99 -144 0 -63 -39 -139 -96 -186 -53 -43 -165 -101 -210 -110 -18 -3 -47 -21 -65 -40 -38 -39 -49 -43 -42 -14 7 27 -14 50 -45 50 -16 0 -39 13 -59 32 -30 29 -33 38 -33 87 0 134 118 271 278 322 72 23 120 23 173 3z" /> <path d="M948 1175 c-3 -3 3 -33 13 -66 21 -69 24 -99 5 -55 -13 29 -31 22 -20 -8 3 -9 1 -16 -4 -16 -17 0 -19 34 -4 46 12 9 13 17 2 48 -6 20 -17 35 -23 33 -13 -4 -14 -36 -5 -117 6 -50 6 -53 -7 -36 -8 11 -15 36 -15 57 0 40 -19 63 -47 57 -21 -4 -21 -21 1 -102 9 -32 14 -61 12 -63 -8 -9 -30 42 -33 76 -3 46 -27 70 -51 53 -9 -7 -29 -17 -44 -23 -16 -6 -28 -14 -28 -18 0 -4 10 -41 23 -83 23 -78 27 -81 65 -53 8 6 -12 35 -24 35 -16 0 -19 16 -4 25 5 3 7 12 4 20 -4 8 -10 13 -14 10 -4 -3 -10 2 -14 10 -3 8 -1 15 4 15 6 0 10 8 10 18 0 13 2 14 9 3 6 -9 10 -10 16 -2 5 9 10 9 21 0 16 -13 18 -38 3 -59 -8 -12 -10 -12 -8 5 3 44 -1 59 -12 48 -9 -9 -8 -25 2 -63 14 -51 36 -69 32 -27 -2 19 -1 20 10 6 11 -15 17 -13 65 13 28 17 52 36 52 44 0 7 6 11 14 8 18 -7 66 24 66 41 0 7 -5 15 -12 17 -7 3 -17 26 -23 53 -9 45 -23 63 -37 50z m-77 -107 c0 -7 2 -21 4 -30 2 -10 -1 -20 -6 -24 -5 -3 -9 4 -9 15 0 11 -5 23 -10 26 -12 7 -4 25 11 25 5 0 9 -6 10 -12z" /> <path d="M635 1013 c-27 -14 -51 -27 -53 -28 -2 -1 4 -18 12 -36 8 -19 22 -55 32 -81 16 -46 17 -47 40 -32 23 16 23 49 -1 40 -8 -3 -16 2 -19 10 -3 8 -1 14 4 14 18 0 10 29 -11 41 -13 6 -17 14 -12 18 6 3 13 15 15 26 3 13 13 -5 28 -52 15 -45 29 -73 38 -73 10 0 12 6 7 23 -4 12 -7 37 -6 55 1 22 -4 32 -14 32 -17 0 -19 11 -6 26 5 5 6 16 2 26 -5 14 -11 13 -56 -9z" /> <path d="M520 950 c-12 -8 -12 -16 4 -62 29 -82 46 -112 58 -100 7 7 6 17 -2 32 -6 12 -9 24 -6 27 3 3 11 -6 17 -21 13 -28 24 -33 34 -15 4 6 -3 21 -15 34 -12 13 -20 30 -17 38 3 7 -1 27 -9 45 -13 33 -35 40 -64 22z" /> <path d="M2640 1266 c0 -2 19 -15 43 -29 41 -24 101 -83 140 -137 17 -24 17 -24 0 8 -22 41 -108 123 -151 146 -18 9 -32 15 -32 12z" /> <path d="M604 1191 c-21 -16 -55 -46 -74 -67 -27 -30 -23 -27 20 11 30 28 66 58 80 67 14 9 22 17 19 17 -3 1 -24 -12 -45 -28z" /> <path d="M1749 1193 c-12 -3 -18 -21 -23 -72 -8 -80 4 -125 32 -117 17 6 18 1 14 -53 -2 -32 1 -74 7 -92 11 -35 57 -69 91 -69 24 0 44 60 37 105 -5 30 -2 35 24 44 28 10 29 12 29 79 0 38 -5 83 -11 100 -9 26 -18 32 -60 41 -28 6 -63 18 -79 26 -30 15 -33 16 -61 8z m98 -59 c18 -8 42 -23 53 -34 22 -22 26 -11 10 21 -7 12 -7 19 -1 19 10 0 17 -31 24 -102 2 -22 -1 -38 -8 -38 -6 0 -6 -3 1 -8 7 -5 3 -15 -12 -32 l-24 -25 0 61 c0 37 -6 68 -15 80 -13 18 -14 16 -10 -16 9 -67 13 -175 8 -207 -4 -23 -10 -31 -24 -30 -17 1 -19 10 -19 90 0 52 -4 86 -9 82 -6 -3 -7 -37 -4 -78 7 -93 -9 -79 -20 16 -18 168 -23 201 -30 187 -3 -8 -8 -33 -10 -55 -4 -39 -4 -38 -5 8 -1 27 3 57 9 68 11 21 19 20 86 -7z" /> <path d="M2155 1019 c-36 -10 -55 -34 -55 -70 0 -32 27 -99 40 -99 5 0 15 -12 22 -27 7 -16 28 -36 47 -45 66 -33 74 -48 75 -142 2 -92 -5 -126 -27 -126 -24 0 -47 -35 -47 -72 0 -20 -8 -46 -19 -59 l-19 -24 -26 24 c-25 23 -26 30 -21 85 3 34 8 76 11 94 3 19 1 32 -6 32 -6 0 -10 -28 -11 -67 -1 -38 -5 -81 -8 -98 -7 -29 -8 -29 -15 15 -7 43 -2 152 8 168 3 4 1 14 -4 22 -17 28 -30 -5 -36 -95 -7 -98 4 -144 35 -152 10 -2 28 -18 40 -34 26 -35 34 -36 64 -7 15 16 23 39 27 77 5 51 7 54 39 65 44 14 55 50 49 163 -5 95 -12 107 -93 148 -62 31 -69 45 -25 45 35 0 50 23 50 77 0 73 -42 117 -95 102z m61 -66 c11 -56 -5 -87 -45 -91 -27 -3 -33 0 -28 12 3 8 3 18 -2 20 -4 3 -7 15 -5 28 1 13 3 29 3 37 1 9 9 12 27 8 21 -4 25 -1 21 13 -3 13 0 17 9 13 7 -3 16 -21 20 -40z" /> <path d="M1117 923 c-40 -6 -103 -72 -111 -116 -20 -107 75 -252 216 -331 74 -41 213 -96 243 -96 12 0 70 -35 129 -77 110 -77 131 -83 145 -42 3 9 -2 8 -14 -4 -17 -18 -19 -17 -47 10 -36 34 -71 100 -64 119 3 8 14 14 24 14 62 0 77 112 30 214 -38 80 -151 190 -245 239 -74 39 -206 78 -252 76 -14 -1 -39 -4 -54 -6z m220 -73 c139 -53 241 -141 297 -255 44 -91 30 -145 -48 -174 -28 -11 -28 -12 -11 -37 21 -33 11 -43 -18 -17 -33 30 -75 49 -137 63 -89 19 -229 92 -284 147 -68 68 -99 133 -94 195 12 116 122 145 295 78z" /> <path d="M1082 765 c5 -79 13 -99 28 -75 8 13 10 13 10 -1 0 -13 84 -69 104 -69 3 0 6 13 6 29 0 16 6 32 13 34 9 4 9 8 -1 15 -8 5 -12 18 -10 27 3 17 4 17 20 2 13 -13 15 -29 11 -71 -5 -48 -3 -55 16 -65 18 -10 21 -9 21 9 0 11 -4 20 -10 20 -5 0 -10 9 -10 21 0 11 5 17 10 14 6 -3 10 1 10 10 0 9 -4 13 -10 10 -5 -3 -10 3 -10 15 0 12 5 18 10 15 6 -3 10 3 10 14 0 12 -2 21 -4 21 -2 0 -38 16 -81 35 -63 29 -76 32 -70 18 11 -26 15 -112 5 -118 -12 -7 -21 39 -14 73 7 32 -15 76 -43 86 -14 6 -15 -3 -11 -69z m122 -21 c3 -9 6 -31 6 -50 0 -26 -3 -32 -16 -27 -11 4 -13 13 -9 33 3 16 1 31 -4 35 -16 9 -13 25 3 25 8 0 17 -7 20 -16z" /> <path d="M1310 705 c0 -14 5 -25 10 -25 6 0 10 -9 10 -20 0 -11 -5 -20 -11 -20 -8 0 -8 -5 1 -15 10 -12 10 -18 -1 -31 -10 -13 -10 -17 2 -24 10 -7 16 -4 21 8 6 15 7 14 7 -3 1 -25 51 -51 63 -32 6 9 8 8 8 -4 0 -21 44 -51 63 -43 8 3 17 -2 20 -10 4 -9 11 -16 16 -16 13 0 1 163 -13 172 -19 13 -26 9 -26 -18 0 -37 -21 -104 -33 -104 -6 0 -7 25 -2 64 6 57 4 67 -14 85 -27 27 -56 29 -43 4 9 -18 8 -111 -2 -120 -3 -3 -10 7 -17 23 -6 16 -15 37 -20 46 -13 25 -11 58 2 58 7 0 9 -10 7 -25 -3 -13 -1 -22 3 -19 11 6 11 45 1 60 -4 6 -17 16 -29 23 -21 11 -23 9 -23 -14z" /> <path d="M1550 562 c0 -31 -3 -67 -6 -79 -4 -15 0 -25 16 -33 27 -14 38 -5 23 19 -7 11 -9 41 -6 78 5 49 3 61 -11 66 -14 5 -16 -2 -16 -51z" /> <path d="M2068 872 c-22 -3 -30 -11 -38 -42 -17 -64 -17 -168 1 -185 28 -28 49 -8 49 45 0 27 3 56 7 66 4 12 2 15 -8 12 -8 -3 -16 -24 -19 -54 -4 -34 -7 -44 -12 -31 -11 26 -10 51 5 98 10 34 16 40 35 36 21 -4 21 -3 7 13 -19 21 -19 28 3 32 26 5 1 14 -30 10z" /> <path d="M2193 594 c-1 -52 3 -94 8 -94 11 0 12 177 2 183 -5 3 -9 -37 -10 -89z" /> <path d="M303 580 c-91 -55 -95 -158 -7 -201 65 -31 135 -6 169 61 32 62 15 112 -48 141 -53 24 -74 24 -114 -1z m12 -35 c-18 -19 -37 -51 -43 -72 l-10 -38 -1 39 c-1 31 5 44 33 72 45 45 63 44 21 -1z m115 -19 c25 -48 -11 -139 -53 -132 -12 3 -30 5 -39 5 -51 3 -64 74 -21 121 35 40 93 43 113 6z" /> <path d="M1746 553 c3 -41 -2 -61 -22 -100 l-26 -48 31 33 c26 27 31 40 30 80 0 26 -4 56 -9 67 -5 13 -7 2 -4 -32z" /> <path d="M481 420 c-28 -22 -51 -42 -51 -45 0 -8 33 8 79 37 61 38 72 35 25 -7 -23 -22 -30 -32 -16 -25 12 6 22 15 22 20 0 6 13 10 29 10 21 0 35 -8 48 -27 51 -78 63 -127 36 -154 -17 -17 -29 -4 -41 44 -8 32 -19 47 -38 56 -40 18 -52 0 -30 -45 9 -20 19 -34 22 -31 3 3 -2 19 -11 37 -16 31 -15 47 3 37 7 -5 20 -42 38 -104 1 -7 18 -20 35 -29 33 -16 33 -16 57 11 29 34 26 58 -20 158 -26 56 -39 73 -65 83 -50 21 -67 17 -122 -26z" /> <path d="M319 319 c-121 -60 -143 -85 -136 -154 6 -53 33 -144 48 -160 10 -10 29 10 29 30 0 6 -4 4 -9 -3 -11 -18 -41 90 -41 146 0 52 19 72 103 113 66 32 115 65 107 72 -3 3 -48 -17 -101 -44z" /> <path d="M1794 306 c-51 -51 -57 -85 -21 -136 36 -54 47 -47 25 14 -20 53 -20 55 -2 80 16 22 25 26 51 22 51 -7 97 -34 117 -67 10 -17 20 -28 23 -26 18 19 -89 107 -130 107 -9 0 -19 5 -22 10 -4 6 9 10 33 10 64 0 135 -60 147 -125 5 -23 0 -37 -21 -60 -15 -16 -36 -40 -48 -53 l-20 -22 33 11 c47 16 94 85 87 124 -11 52 -51 101 -107 129 -74 36 -94 34 -145 -18z" /> <path d="M278 247 c-31 -24 -44 -41 -46 -62 l-3 -30 16 30 c21 39 45 65 60 65 7 0 18 7 25 15 22 26 -6 17 -52 -18z" /> <path d="M344 182 c-17 -27 43 -198 62 -179 2 2 -5 36 -16 75 -11 39 -20 81 -20 91 0 27 -14 33 -26 13z" /> <path d="M584 187 c-3 -9 5 -44 19 -79 14 -35 28 -73 32 -85 7 -24 35 -32 35 -10 0 18 -58 169 -69 180 -7 7 -12 5 -17 -6z" /> <path d="M1652 137 c-24 -25 -35 -47 -41 -85 -7 -47 -6 -52 10 -52 15 0 19 8 19 33 0 50 19 71 53 58 35 -14 35 -6 0 13 -24 13 -26 15 -10 21 18 7 48 4 80 -10 25 -11 21 12 -5 29 -48 31 -71 29 -106 -7z" /> <path d="M310 110 c0 -16 4 -30 8 -30 5 0 14 -10 21 -22 11 -23 11 -23 5 2 -3 14 -8 37 -11 53 -7 36 -23 35 -23 -3z" /> <path d="M503 98 c31 -78 40 -98 47 -98 4 0 0 25 -9 55 -9 32 -22 55 -30 55 -7 0 -11 -6 -8 -12z" /> <path d="M1952 38 c6 -18 79 -39 128 -36 l45 3 -72 23 c-80 25 -107 28 -101 10z" /> </g> </svg>
//               </div>

//               {/* Hover glow effect */}
//               <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 transition-opacity duration-300 ${hoveredCard === 'referrals' ? 'opacity-100' : 'opacity-0'}`}></div>

//               <div className="relative p-5">
//                 <div className="flex items-center mb-3">
//                   <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-2 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110 shadow-lg from-blue-200 to-blue-300' : ''}`}>
//                     <Users className={`w-4 h-4 text-blue-600 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110' : ''}`} />
//                   </div>
//                   <h6 className={`font-semibold text-gray-800 text-sm transition-all duration-300 ${hoveredCard === 'referrals' ? 'text-blue-700' : ''}`}>Referrals</h6>
//                 </div>

//                 {isLoading || loading ? (
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <div className="w-12 h-6 animate-pulse rounded bg-gray-300"></div>
//                       <div className="w-12 h-6 animate-pulse rounded bg-gray-300"></div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className={`text-center transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-105' : ''}`}>
//                       <div className={`text-lg font-bold text-teal-600 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110 text-teal-700' : ''}`}>{directReferrals}</div>
//                       <div className={`text-xs text-gray-500 transition-all duration-300 ${hoveredCard === 'referrals' ? 'text-gray-600' : ''}`}>Direct</div>
//                     </div>
//                     <div className={`text-center transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-105' : ''}`}>
//                       <div className={`text-lg font-bold text-blue-600 transition-all duration-300 ${hoveredCard === 'referrals' ? 'scale-110 text-blue-700' : ''}`}>{chainReferrals}</div>
//                       <div className={`text-xs text-gray-500 transition-all duration-300 ${hoveredCard === 'referrals' ? 'text-gray-600' : ''}`}>Chain</div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Performance Card */}
//             <div
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden group cursor-pointer"
//               onMouseEnter={() => setHoveredCard('performance')}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Enhanced Background SVG */}
//               <div className={`absolute inset-0 transition-all duration-500 ${hoveredCard === 'performance' ? 'opacity-30 scale-105' : 'opacity-5'}`}>
//                 <svg viewBox="0 0 200 200" className="w-full h-full">
//                   <path
//                     d="M20,180 L50,120 L80,140 L120,80 L160,100 L180,40"
//                     stroke="currentColor"
//                     strokeWidth="3"
//                     fill="none"
//                     className={`transition-all duration-500 ${hoveredCard === 'performance' ? 'text-emerald-400 stroke-[5]' : 'text-emerald-500'}`}
//                     style={{
//                       filter: hoveredCard === 'performance' ? 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))' : 'none'
//                     }}
//                   />
//                   <circle
//                     cx="180"
//                     cy="40"
//                     r="8"
//                     fill="currentColor"
//                     className={`transition-all duration-300 ${hoveredCard === 'performance' ? 'text-emerald-400 drop-shadow-lg' : 'text-emerald-600'}`}
//                     style={{
//                       transformOrigin: '180px 40px',
//                       filter: hoveredCard === 'performance' ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' : 'none'
//                     }}
//                   />
//                   <polygon
//                     points="170,30 190,30 180,10"
//                     fill="currentColor"
//                     className={`transition-all duration-500 ${hoveredCard === 'performance' ? 'text-emerald-400 drop-shadow-lg' : 'text-emerald-600'}`}
//                     style={{
//                       transformOrigin: '180px 23px',
//                       filter: hoveredCard === 'performance' ? 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))' : 'none'
//                     }}
//                   />
//                 </svg>
//               </div>

//               {/* Hover glow effect */}
//               <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 transition-opacity duration-300 ${hoveredCard === 'performance' ? 'opacity-100' : 'opacity-0'}`}></div>

//               <div className="relative p-5">
//                 <div className="flex items-center mb-3">
//                   <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mr-2 transition-all duration-300 ${hoveredCard === 'performance' ? 'scale-110 shadow-lg from-emerald-200 to-emerald-300' : ''}`}>
//                     <TrendingUp className={`w-4 h-4 text-emerald-600 transition-all duration-300 ${hoveredCard === 'performance' ? 'scale-110' : ''}`} />
//                   </div>
//                   <h6 className={`font-semibold text-gray-800 text-sm transition-all duration-300 ${hoveredCard === 'performance' ? 'text-emerald-700' : ''}`}>Performance</h6>
//                 </div>

//                 {isLoading || loading ? (
//                   <div className="space-y-2">
//                     <div className="w-16 h-6 animate-pulse rounded bg-gray-300"></div>
//                     <div className="w-20 h-3 animate-pulse rounded bg-gray-300"></div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className={`text-lg font-bold text-emerald-600 mb-1 transition-all duration-300 ${hoveredCard === 'performance' ? 'scale-110 text-emerald-700' : ''}`}>{qualifiedDirectMembers}</div>
//                     <div className={`text-xs text-gray-500 mb-2 transition-all duration-300 ${hoveredCard === 'performance' ? 'text-gray-600' : ''}`}>Qualified Members</div>
//                     <div className={`text-xs text-gray-600 italic transition-all duration-300 ${hoveredCard === 'performance' ? 'text-gray-700 not-italic' : ''}`}>{progressStatus}</div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Direct Referrals Section */}
//           <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
//             {/* Enhanced Background SVG */}
//             <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
//               <svg viewBox="0 0 1200 800" className="w-full h-full">
//                 {/* Network nodes */}
//                 <circle cx="200" cy="150" r="40" fill="currentColor" className="text-teal-500" />
//                 <circle cx="400" cy="100" r="35" fill="currentColor" className="text-blue-500" />
//                 <circle cx="600" cy="180" r="45" fill="currentColor" className="text-indigo-500" />
//                 <circle cx="800" cy="120" r="30" fill="currentColor" className="text-emerald-500" />
//                 <circle cx="1000" cy="200" r="38" fill="currentColor" className="text-purple-500" />

//                 {/* Connection lines */}
//                 <path d="M200,150 Q300,100 400,100" stroke="currentColor" strokeWidth="3" fill="none" className="text-teal-400" />
//                 <path d="M400,100 Q500,140 600,180" stroke="currentColor" strokeWidth="3" fill="none" className="text-blue-400" />
//                 <path d="M600,180 Q700,150 800,120" stroke="currentColor" strokeWidth="3" fill="none" className="text-indigo-400" />
//                 <path d="M800,120 Q900,160 1000,200" stroke="currentColor" strokeWidth="3" fill="none" className="text-emerald-400" />

//                 {/* Secondary network */}
//                 <circle cx="300" cy="400" r="25" fill="currentColor" className="text-pink-500" />
//                 <circle cx="500" cy="450" r="30" fill="currentColor" className="text-orange-500" />
//                 <circle cx="700" cy="380" r="35" fill="currentColor" className="text-cyan-500" />
//                 <circle cx="900" cy="420" r="28" fill="currentColor" className="text-violet-500" />

//                 {/* Flowing curves */}
//                 <path d="M100,600 Q300,500 500,580 Q700,650 900,550 Q1100,450 1200,600"
//                   stroke="currentColor" strokeWidth="2" fill="none" className="text-teal-300" />
//                 <path d="M0,700 Q200,600 400,680 Q600,750 800,650 Q1000,550 1200,700"
//                   stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-300" />
//               </svg>
//             </div>

//             {/* Enhanced Table Header */}
//             <div className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-teal-50 px-6 py-6 border-b border-gray-100">
//               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                 <div className="flex items-center">
//                   <div className="relative w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl transform hover:scale-105 transition-transform duration-200">
//                     {/* Icon glow effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-2xl blur opacity-20"></div>
//                     <Users className="relative w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h5 className="text-gray-800 font-bold text-xl mb-1">Direct Referrals Network</h5>
//                     <div className="flex items-center flex-wrap gap-3">
//                       <span className="text-gray-600 text-sm">Total entries:</span>
//                       <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold px-3 py-1.5 rounded-xl shadow-md">
//                         {isLoading || loading ? (
//                           <div className="w-8 h-4 animate-pulse rounded bg-teal-300"></div>
//                         ) : (
//                           filteredReferrals.length
//                         )}
//                       </span>
//                       <div className="hidden sm:flex items-center gap-2">
//                         <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                         <span className="text-xs text-gray-500">Active Network</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="relative w-full lg:w-80">
//                   <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 rounded-2xl blur opacity-20"></div>
//                   <input
//                     type="text"
//                     className="relative w-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-gray-800 placeholder-gray-500 px-5 py-3 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-lg transition-all duration-200 hover:shadow-xl"
//                     placeholder="Search your network..."
//                     onChange={handleSearch}
//                   />
//                   <Search className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Table View */}
//             <div className="hidden lg:block overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
//                     {['S/No', 'Name', 'Username', 'Direct', 'Chain', 'Total', 'Progress', 'Status'].map((header, index) => (
//                       <th key={index} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {isLoading || loading ? (
//                     // Skeleton rows
//                     [...Array(Number(state.perPage))].map((_, i) => (
//                       <tr key={i} className="hover:bg-gray-50 transition-colors duration-200">
//                         {[...Array(8)].map((_, j) => (
//                           <td key={j} className="px-6 py-4">
//                             <div className="animate-pulse h-4 rounded bg-gray-300"></div>
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : currentReferrals.length === 0 ? (
//                     <tr>
//                       <td colSpan="8" className="text-center py-16">
//                         <div className="flex flex-col items-center">
//                           <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center mb-6 shadow-md">
//                             <Search className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <h6 className="text-gray-800 font-bold text-lg mb-2">No referrals found</h6>
//                           <p className="text-gray-500 text-sm max-w-md text-center">
//                             Try adjusting your search criteria or start building your network by inviting new members.
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentReferrals.map((referral, i) => (
//                       <tr
//                         key={i}
//                         className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 transition-all duration-300 hover:shadow-md group"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="w-9 h-9  rounded-2xl flex items-center justify-center text-teal-700 text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow duration-200">
//                             {indexOfFirstReferral + i + 1}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="font-semibold text-gray-800 text-sm group-hover:text-teal-700 transition-colors duration-200">{referral.name}</div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="text-gray-600 font-mono text-xs bg-gray-50 px-2 py-1 rounded-lg">{referral.username}</span>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <span className=" text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl min-w-[36px] inline-block ">
//                             {referral.directReferrals}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <span className=" text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl min-w-[36px] inline-block ">
//                             {referral.chainReferrals}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <span className=" text-gray-600 text-xs font-semibold px-3 py-2 rounded-xl min-w-[36px] inline-block ">
//                             {referral.totalReferrals}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <div className="inline-block min-w-[160px]">
//                             <div className="flex justify-between items-center mb-2">
//                               <span className="text-gray-700 text-xs font-semibold">{referral.taskCompletionPercentage}%</span>
//                             </div>
//                             <div className="bg-gray-200 rounded-full h-2.5 w-32 overflow-hidden shadow-inner">
//                               <div
//                                 className="h-full transition-all duration-700 ease-out rounded-full shadow-sm"
//                                 style={{
//                                   width: `${referral.taskCompletionPercentage}%`,
//                                   background: referral.taskCompletionPercentage >= 100 ?
//                                     'linear-gradient(90deg, #10b981 0%, #059669 100%)' :
//                                     referral.taskCompletionPercentage > 50 ?
//                                       'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' :
//                                       'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
//                                 }}
//                               ></div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           {referral.isQualified ? (
//                             <span className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center min-w-[90px] justify-center shadow-sm">
//                               <CheckCircle className="w-3 h-3 mr-1.5" />
//                               Qualified
//                             </span>
//                           ) : referral.eligibilityPercentage > 0 ? (
//                             <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 text-yellow-700 text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center min-w-[90px] justify-center shadow-sm">
//                               <Clock className="w-3 h-3 mr-1.5" />
//                               Pending
//                             </span>
//                           ) : (
//                             <span className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center min-w-[90px] justify-center shadow-sm">
//                               <XCircle className="w-3 h-3 mr-1.5" />
//                               Not Eligible
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Card View */}
//             <div className="lg:hidden p-4 space-y-4">
//               {isLoading || loading ? (
//                 // Mobile skeleton cards
//                 [...Array(Number(state.perPage))].map((_, i) => (
//                   <div key={i} className="bg-gray-50 rounded-2xl p-4 animate-pulse">
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 bg-gray-300 rounded-xl mr-3"></div>
//                         <div>
//                           <div className="w-24 h-4 bg-gray-300 rounded mb-1"></div>
//                           <div className="w-20 h-3 bg-gray-300 rounded"></div>
//                         </div>
//                       </div>
//                       <div className="w-16 h-6 bg-gray-300 rounded-lg"></div>
//                     </div>
//                     <div className="grid grid-cols-3 gap-3 mb-3">
//                       <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
//                       <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
//                       <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
//                     </div>
//                     <div className="w-full h-2 bg-gray-300 rounded-full mb-2"></div>
//                     <div className="w-20 h-6 bg-gray-300 rounded-lg"></div>
//                   </div>
//                 ))
//               ) : currentReferrals.length === 0 ? (
//                 <div className="text-center py-16">
//                   <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md">
//                     <Search className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <h6 className="text-gray-800 font-bold text-lg mb-2">No referrals found</h6>
//                   <p className="text-gray-500 text-sm max-w-md mx-auto">
//                     Try adjusting your search criteria or start building your network by inviting new members.
//                   </p>
//                 </div>
//               ) : (
//                 currentReferrals.map((referral, i) => (
//                   <div
//                     key={i}
//                     className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden group"
//                   >
//                     {/* Card Background SVG */}
//                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
//                       <svg viewBox="0 0 400 200" className="w-full h-full">
//                         <circle cx="350" cy="50" r="30" fill="currentColor" className="text-teal-500" />
//                         <circle cx="50" cy="150" r="20" fill="currentColor" className="text-blue-400" />
//                         <path d="M30,180 Q150,100 350,130" stroke="currentColor" strokeWidth="2" fill="none" className="text-teal-400" />
//                         <circle cx="200" cy="80" r="15" fill="currentColor" className="text-indigo-400" />
//                       </svg>
//                     </div>

//                     <div className="relative p-5">
//                       {/* Card Header */}
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 rounded-2xl flex items-center justify-center text-teal-700 text-sm font-bold shadow-sm mr-3 group-hover:shadow-md transition-shadow duration-200">
//                             {indexOfFirstReferral + i + 1}
//                           </div>
//                           <div>
//                             <h6 className="font-bold text-gray-800 text-base group-hover:text-teal-700 transition-colors duration-200">{referral.name}</h6>
//                             <span className="text-gray-500 font-mono text-xs bg-gray-50 px-2 py-1 rounded-lg">{referral.username}</span>
//                           </div>
//                         </div>

//                         {/* Status Badge */}
//                         {referral.isQualified ? (
//                           <span className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center shadow-sm">
//                             <CheckCircle className="w-3 h-3 mr-1" />
//                             Qualified
//                           </span>
//                         ) : referral.eligibilityPercentage > 0 ? (
//                           <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 text-yellow-700 text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center shadow-sm">
//                             <Clock className="w-3 h-3 mr-1" />
//                             Pending
//                           </span>
//                         ) : (
//                           <span className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 text-xs font-bold px-3 py-2 rounded-xl inline-flex items-center shadow-sm">
//                             <XCircle className="w-3 h-3 mr-1" />
//                             Not Eligible
//                           </span>
//                         )}
//                       </div>

//                       {/* Referral Stats */}
//                       <div className="grid grid-cols-3 gap-3 mb-4">
//                         <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 text-center shadow-sm">
//                           <div className="text-lg font-bold text-blue-600 mb-1">{referral.directReferrals}</div>
//                           <div className="text-xs text-blue-700 font-medium">Direct</div>
//                         </div>
//                         <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-3 text-center shadow-sm">
//                           <div className="text-lg font-bold text-indigo-600 mb-1">{referral.chainReferrals}</div>
//                           <div className="text-xs text-indigo-700 font-medium">Chain</div>
//                         </div>
//                         <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-3 text-center shadow-sm">
//                           <div className="text-lg font-bold text-teal-600 mb-1">{referral.totalReferrals}</div>
//                           <div className="text-xs text-teal-700 font-medium">Total</div>
//                         </div>
//                       </div>

//                       {/* Progress Section */}
//                       <div className="space-y-3">
//                         <div className="flex justify-between items-center">
//                           <span className="text-gray-700 text-sm font-semibold">Task Progress</span>
//                           <span className="text-gray-700 text-sm font-bold">{referral.taskCompletionPercentage}%</span>
//                         </div>
//                         <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
//                           <div
//                             className="h-full transition-all duration-700 ease-out rounded-full shadow-sm"
//                             style={{
//                               width: `${referral.taskCompletionPercentage}%`,
//                               background: referral.taskCompletionPercentage >= 100 ?
//                                 'linear-gradient(90deg, #10b981 0%, #059669 100%)' :
//                                 referral.taskCompletionPercentage > 50 ?
//                                   'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' :
//                                   'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Enhanced Pagination */}
//           <div className="flex flex-col lg:flex-row justify-between items-center mt-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 gap-6 relative overflow-hidden">
//             {/* Background decoration */}
//             <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
//               <svg viewBox="0 0 800 200" className="w-full h-full">
//                 <path d="M0,100 Q200,50 400,100 Q600,150 800,100" stroke="currentColor" strokeWidth="3" fill="none" className="text-teal-500" />
//                 <circle cx="100" cy="100" r="8" fill="currentColor" className="text-teal-400" />
//                 <circle cx="300" cy="100" r="8" fill="currentColor" className="text-blue-400" />
//                 <circle cx="500" cy="100" r="8" fill="currentColor" className="text-indigo-400" />
//                 <circle cx="700" cy="100" r="8" fill="currentColor" className="text-emerald-400" />
//               </svg>
//             </div>

//             <div className="relative">
//               {isLoading || loading ? (
//                 <div className="w-64 h-5 animate-pulse rounded bg-gray-300"></div>
//               ) : (
//                 <div className="flex items-center bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-2 rounded-xl">
//                   <span className="text-gray-700 text-sm font-medium">
//                     Showing <span className="font-bold text-teal-600">{currentReferrals.length > 0 ? indexOfFirstReferral + 1 : 0}</span> to <span className="font-bold text-teal-600">{Math.min(indexOfLastReferral, filteredReferrals.length)}</span> of <span className="font-bold text-teal-600">{filteredReferrals.length}</span> entries
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-6 relative">
//               {/* Enhanced Per Page Selector */}
//               <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-xl shadow-sm">
//                 <span className="text-gray-700 text-sm font-medium mr-3">Show:</span>
//                 <select
//                   className="bg-white border-2 border-gray-200 text-gray-800 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm min-w-[80px] font-medium transition-all duration-200 hover:border-gray-300"
//                   value={state.perPage}
//                   disabled={isLoading || loading}
//                   onChange={(e) => {
//                     setState({
//                       ...state,
//                       perPage: e.target.value,
//                       currentPage: 1,
//                     });
//                   }}
//                 >
//                   <option value="10">10</option>
//                   <option value="20">20</option>
//                   <option value="50">50</option>
//                 </select>
//               </div>

//               {/* Enhanced Pagination Controls */}
//               <nav className="relative">
//                 {isLoading || loading ? (
//                   <div className="flex gap-2">
//                     {[...Array(5)].map((_, i) => (
//                       <div key={i} className="w-10 h-10 animate-pulse rounded-xl bg-gray-300"></div>
//                     ))}
//                   </div>
//                 ) : (
//                   <ul className="flex items-center gap-2">
//                     <li>
//                       <button
//                         className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${state.currentPage === 1
//                             ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
//                             : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
//                           }`}
//                         onClick={() => handlePageChange(state.currentPage - 1)}
//                         disabled={state.currentPage === 1}
//                       >
//                         <ChevronLeft className="w-5 h-5" />
//                       </button>
//                     </li>

//                     {totalPages <= 5 ? (
//                       // Show all pages if 5 or fewer
//                       [...Array(totalPages)].map((_, index) => {
//                         const pageNum = index + 1;
//                         const isActive = state.currentPage === pageNum;
//                         return (
//                           <li key={index}>
//                             <button
//                               className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-300 font-bold text-sm ${isActive
//                                   ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
//                                   : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
//                                 }`}
//                               onClick={() => handlePageChange(pageNum)}
//                             >
//                               {pageNum}
//                             </button>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       // Show pagination with ellipsis
//                       <>
//                         {/* First page */}
//                         <li>
//                           <button
//                             className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-300 font-bold text-sm ${state.currentPage === 1
//                                 ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
//                                 : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
//                               }`}
//                             onClick={() => handlePageChange(1)}
//                           >
//                             1
//                           </button>
//                         </li>

//                         {/* Ellipsis */}
//                         {state.currentPage > 3 && (
//                           <li>
//                             <span className="w-10 h-10 flex items-center justify-center text-gray-500 bg-white border-2 border-gray-200 rounded-xl">
//                               ...
//                             </span>
//                           </li>
//                         )}

//                         {/* Pages around current */}
//                         {[...Array(totalPages)].map((_, index) => {
//                           const pageNum = index + 1;
//                           if (
//                             (pageNum !== 1 && pageNum !== totalPages) &&
//                             (pageNum === state.currentPage - 1 ||
//                               pageNum === state.currentPage ||
//                               pageNum === state.currentPage + 1)
//                           ) {
//                             const isActive = state.currentPage === pageNum;
//                             return (
//                               <li key={index}>
//                                 <button
//                                   className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-300 font-bold text-sm ${isActive
//                                       ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
//                                       : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
//                                     }`}
//                                   onClick={() => handlePageChange(pageNum)}
//                                 >
//                                   {pageNum}
//                                 </button>
//                               </li>
//                             );
//                           }
//                           return null;
//                         })}

//                         {/* Ellipsis */}
//                         {state.currentPage < totalPages - 2 && (
//                           <li>
//                             <span className="w-10 h-10 flex items-center justify-center text-gray-500 bg-white border-2 border-gray-200 rounded-xl">
//                               ...
//                             </span>
//                           </li>
//                         )}

//                         {/* Last page */}
//                         <li>
//                           <button
//                             className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-300 font-bold text-sm ${state.currentPage === totalPages
//                                 ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg scale-110'
//                                 : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
//                               }`}
//                             onClick={() => handlePageChange(totalPages)}
//                           >
//                             {totalPages}
//                           </button>
//                         </li>
//                       </>
//                     )}

//                     <li>
//                       <button
//                         className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${state.currentPage === totalPages
//                             ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
//                             : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 border-gray-200 hover:border-teal-300 hover:shadow-md transform hover:-translate-y-0.5'
//                           }`}
//                         onClick={() => handlePageChange(state.currentPage + 1)}
//                         disabled={state.currentPage === totalPages}
//                       >
//                         <ChevronRight className="w-5 h-5" />
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </nav>
//             </div>
//           </div>
//         </div>

//         {/* Shareholders Modal */}
//         {showShareholders && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//               <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
//                 <h2 className="text-gray-800 text-2xl font-bold">Shareholders</h2>
//                 <button
//                   onClick={handleCloseModal}
//                   className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-xl transition-colors duration-200 font-medium"
//                 >
//                   Close
//                 </button>
//               </div>
//               <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
//                 <ShareholderCard />
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Loading Overlay */}
//       {!data && isLoading && <Loader />}
//     </div>
//   );
// };

// export default ShareholderEligibility;



const ShareholderEligibility = () => {
  const [getUserInfo, { isLoading, data, error }] = useGetUserInfoMutation();
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [showShareholders, setShowShareholders] = useState(false);
  const [errormessage, setErrormessage] = useState(null);
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPage: 1,
    perPage: "10",
    search: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData") || "{}");
    const username = user.data.username ; 
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

  const handleCloseModal = () => {
    setShowShareholders(false);
    document.body.style.overflow = 'unset';
  };

  // Eligible form modal
  if (data?.data && userData.isEligibleForShareHolder === true && userData.photoVerificationCompleted === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-teal-100">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative border border-gray-100">
            <button
              onClick={() => navigate("/dashboard")}
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
                          <span className="text-gray-600 font-mono text-xs bg-gray-50 px-2 py-1 rounded-lg">{referral.username}</span>
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
                            <span className="text-gray-500 font-mono text-xs bg-gray-50 px-2 py-1 rounded-lg inline-block mt-1">{referral.username}</span>
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
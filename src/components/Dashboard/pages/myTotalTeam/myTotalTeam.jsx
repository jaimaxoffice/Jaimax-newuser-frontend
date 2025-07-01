
// import React, { useEffect, useState } from 'react';
// import membersImage from "../../../../assets/members.svg";
// import referralImage from "../../../../assets/referral.svg";
// import { toast, ToastContainer } from 'react-toastify';
// import { useUserDetailsQuery } from './myTotatTeamApliSlice';
// import { useNavigate } from 'react-router-dom';
// import search from "../../../../assets/search.svg";
// import Loader from '../../../Loader/loader';
// import TextField from "@mui/material/TextField";
// import InputAdornment from '@mui/material/InputAdornment';
// import { FaShareAlt } from 'react-icons/fa';
// import Pagination from '../../../pagination/pagination';

// const MyTotalTeam = () => {


//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
//   const userData =
//     localStorage.getItem("userData") &&
//     JSON.parse(localStorage.getItem("userData"));
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;
//   const referralContent = `
//   🚀 Join the Jaimax Coin Revolution! 🚀

//   Hey there! 🌟

//   I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗

//   Don’t miss out on this chance to be part of something BIG! 💥

//   👉 ${REGISTER_REFERAL + userData?.data?.username}

//   #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

//   const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""
//     }&search=${state?.search || ""}`;
//   const {
//     data: userDetails,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useUserDetailsQuery(queryParams);

//   const TableData = userDetails?.data?.withdrawRequests || [];
//   const totalUsers = userDetails?.data?.pagination?.total || 0;
//   const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 0;

//   // Handle PerChange
//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState({ ...state, currentPage: e });
//   };

//   // Function for handling search with delay
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   const paginatedData = TableData.slice(
//     (state.currentPage - 1) * state.perPage,
//     state.currentPage * state.perPage
//   );

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const verifyToken = async () => {
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       setIsTokenVerified(true);
//     };

//     verifyToken();
//   }, [navigate]);

//   useEffect(() => {
//     if (isTokenVerified) {
//       const debounce = setTimeout(() => {
//         if (error?.data?.status_code === 400) {
//           localStorage.clear();
//           navigate("/login");
//           toast.error(error?.data?.message, {
//             position: "top-center",
//           });
//         }
//       }, 2000);

//       return () => clearTimeout(debounce);
//     }
//   }, [isTokenVerified, error, navigate]);

//   useEffect(() => {
//     refetch();
//     return () => {
//       clearTimeout(searchTimeout);
//     };
//   }, []);

//   useEffect(() => {
//     setLoading(false);
//   }, [userDetails?.data?.withdrawRequests]);

//   const infoBoxes = [
//     {
//       title: "Total Active Members",
//       value: totalUsers,
//       description: "Active team members",
//       image: membersImage,
//       iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
//       shapes: ['circle', 'triangle']
//     },
//     {
//       title: "Foundation",
//       value: totalChainUsers,
//       description: "Foundation members",
//       image: referralImage,
//       iconBg: "bg-gradient-to-br from-green-400 to-green-600",
//       shapes: ['square', 'pentagon']
//     },
//     {
//       title: "Referral Code",
//       value: userData?.data?.username,
//       // description: "Your unique referral code",
//       image: referralImage,
//       iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
//       shapes: ['diamond', 'ellipse']
//     }
//   ];

//   const shapeBaseStyles = {
//     position: 'absolute',
//     backgroundColor: 'white',
//     opacity: 0.1,
//     pointerEvents: 'none',
//     transition: 'opacity 0.3s ease, transform 3s ease-in-out',
//     zIndex: 0,
//     animationIterationCount: 'infinite',
//     animationDirection: 'alternate',
//     willChange: 'transform',
//   };

//   const shapeStyles = {
//     circle: {
//       width: '6rem',
//       height: '6rem',
//       borderRadius: '50%',
//       backgroundColor: '#084e54',
//       animationName: 'floatUpDown',
//       animationDuration: '6s',
//     },
//     triangle: {
//       width: 0,
//       height: 0,
//       borderLeft: '3rem solid transparent',
//       borderRight: '3rem solid transparent',
//       borderBottom: '5rem solid #084e54',
//       animationName: 'floatLeftRight',
//       animationDuration: '5s',
//     },
//     square: {
//       width: '6rem',
//       height: '6rem',
//       backgroundColor: '#084e54',
//       animationName: 'floatUpDown',
//       animationDuration: '7s',
//     },
//     pentagon: {
//       width: '6rem',
//       height: '6rem',
//       backgroundColor: '#084e54',
//       clipPath: 'polygon(50% 0%, 95% 35%, 77% 90%, 23% 90%, 5% 35%)',
//       animationName: 'floatLeftRight',
//       animationDuration: '6.5s',
//     },
//     diamond: {
//       width: '5rem',
//       height: '5rem',
//       backgroundColor: '#084e54',
//       transform: 'rotate(45deg)',
//       animationName: 'floatUpDown',
//       animationDuration: '5.5s',
//     },
//     ellipse: {
//       width: '7rem',
//       height: '4rem',
//       backgroundColor: '#084e54',
//       borderRadius: '50% / 100%',
//       animationName: 'floatLeftRight',
//       animationDuration: '6s',
//     },
//   };

//   const shapePositions = [
//     { top: '-1.5rem', right: '-1.5rem' },
//     { bottom: '-1.5rem', left: '-1.5rem' },
//   ];

//   // Dummy team members
//   const teamMembers = [
//     {
//       name: "Alice Johnson",
//       task: "Design System",
//       status: "Active",
//       avatar: "https://i.pravatar.cc/100?img=1",
//       bg: "bg-green-500",
//       badge: "bg-green-200 text-green-800"
//     },
//     {
//       name: "Bob Smith",
//       task: "Backend API",
//       status: "Idle",
//       avatar: "https://i.pravatar.cc/100?img=2",
//       bg: "bg-yellow-500",
//       badge: "bg-yellow-200 text-yellow-800"
//     },
//     {
//       name: "Charlie Davis",
//       task: "Frontend UI",
//       status: "Offline",
//       avatar: "https://i.pravatar.cc/100?img=3",
//       bg: "bg-red-500",
//       badge: "bg-red-200 text-red-800"
//     }
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @media (max-width: 1330px) {
//             .custom-grid {
//               grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
//             }
//           }
//           @media (max-width: 960px) {
//             .custom-grid {
//               grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
//             }
//           }
//           .hide-scrollbar {
//             scrollbar-width: none;
//             -ms-overflow-style: none;
//           }
//           .hide-scrollbar::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>

//       <div className="w-full bg-[#1d8e85] min-h-screen space-y-6 px-4 py-6">
//         {/* Info Boxes */}


//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
//           {infoBoxes.map((box, idx) => (
//             <div
//               key={idx}
//               className="relative p-6 rounded-xl bg-white text-[#084e54]
//       overflow-hidden transition duration-300 ease-in-out hover:scale-[1.02]"
//             >
//               {/* Shapes */}
//               {box.shapes.map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     ...shapeBaseStyles,
//                     ...shapeStyles[shape],
//                     ...shapePositions[i],
//                   }}
//                 />
//               ))}

//               {/* Main Content */}
//               <div className="z-10 pr-20">
//                 <div className="text-lg font-semibold mb-2">{box.title}</div>

//                 {box.title === "Referral Code" ? (
//                   <div className="w-full rounded-md border border-lime-400 bg-[#1d8e85] px-4 py-2 flex items-center justify-between">
//                     <div className="flex flex-col w-full max-w-xs">
//                       <TextField
//                         id={`referralCode-${idx}`}
//                         label="Referral Code"
//                         value={box.value}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <FaShareAlt style={{ cursor: 'pointer', color: 'white' }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         variant="outlined"
//                         size="small"
//                         sx={{
//                           input: { color: 'white' },
//                           label: { color: 'white' },
//                           '& .MuiOutlinedInput-root': {
//                             '& fieldset': {
//                               borderColor: '#4caf50',
//                             },
//                             '&:hover fieldset': {
//                               borderColor: '#81c784',
//                             },
//                             '&.Mui-focused fieldset': {
//                               borderColor: '#66bb6a',
//                             },
//                           },
//                         }}
//                       />

//                     </div>

//                   </div>
//                 ) : (
//                   <div className="text-2xl font-bold mb-2">{box.value}</div>
//                 )}

//                 <div className="text-sm text-[#1d4d4f]">{box.description}</div>
//               </div>

//               {/* Icon bubble */}
//               <div
//                 className={`absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full
//           flex items-center justify-center border-4 border-white z-10 ${box.iconBg}`}
//               >
//                 <img
//                   src={box.image}
//                   alt={box.title}
//                   className="w-14 h-14 object-contain opacity-80"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Team Members Panel */}
//         <div className="p-2 sm:p-4 lg:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 max-w-8xl w-full">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//             <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold">Total Team Details</h1>
//             <div className="w-full sm:w-auto sm:flex-initial max-w-sm">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="w-full bg-transparent border border-white/30 text-white rounded-md py-2 pl-10 pr-4 placeholder-white/70 text-sm sm:text-base focus:outline-none focus:border-white/50 transition-colors"
//                   onChange={handleSearch}
//                 />
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                   <img src={search} className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
//                 </span>
//               </div>
//             </div>
//           </div>

//           {isLoading ? (
//             [...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className="p-3 sm:p-4 mb-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30"
//               >
//                 <Loader />
//               </div>
//             ))
//           ) : TableData.length === 0 ? (
//             <div className="flex justify-center items-center text-white py-6 sm:py-8 text-sm sm:text-base text-center">
//               No data found
//             </div>
//           ) : (
//             <>
//               {/* Cards for Mobile & Tablet */}
//               <div className="flex flex-wrap gap-2 sm:gap-3 lg:hidden">
//                 {TableData.map((data, i) => (
//                   <div
//                     key={i}
//                     className="p-3 sm:p-4 bg-white/15 rounded-xl border border-white/30 text-white space-y-1 sm:space-y-2 shadow-md hover:bg-white/25 transition-colors flex-1 min-w-[280px] max-w-full"
//                   >
//                     <div className="flex justify-between items-start sm:items-center gap-2">
//                       <div className="text-base sm:text-lg font-semibold break-words flex-1">{data.name || "N/A"}</div>
//                       <span
//                         className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ${data.isActive ? "bg-green-600" : "bg-red-600"
//                           }`}
//                       >
//                         {data.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>
//                     <div className="text-xs sm:text-sm space-y-1">
//                       <div>
//                         <strong className="text-white/90">Email:</strong>
//                         <span className="ml-1 break-all">{data.email || "N/A"}</span>
//                       </div>
//                       <div>
//                         <strong className="text-white/90">Username:</strong>
//                         <span className="ml-1 break-words">{data.username || "N/A"}</span>
//                       </div>
//                       <div>
//                         <strong className="text-white/90">Referrals:</strong>
//                         <span className="ml-1">{data.totalChainReferrals || 0}</span>
//                       </div>
//                       <div>
//                         <strong className="text-white/90">Join Date:</strong>{" "}
//                         <span className="ml-1">
//                           {data.createdAt
//                             ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
//                             : "N/A"}
//                         </span>
//                       </div>
//                       <div>
//                         <strong className="text-white/90">S.No:</strong>{" "}
//                         <span className="ml-1">
//                           {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Table-like View for Desktop */}
//               <div className="hidden lg:block overflow-x-auto mt-2">
//                 <div className="min-w-full">
//                   {/* Updated grid template columns here to balance email width */}
//                   <div className="grid grid-cols-[60px_1.2fr_1.5fr_1.2fr_1fr_1fr_100px] bg-white/20 border border-white/30 text-white rounded-t-md font-semibold text-sm lg:text-base">
//                     <div className="p-2 lg:p-3">S.No</div>
//                     <div className="p-2 lg:p-3">Name</div>
//                     <div className="p-2 lg:p-3">Email</div>
//                     <div className="p-2 lg:p-3">Username</div>
//                     <div className="p-2 lg:p-3">Referrals</div>
//                     <div className="p-2 lg:p-3">Join Date</div>
//                     <div className="p-2 lg:p-3">Status</div>
//                   </div>
//                   {TableData.map((data, i) => (
//                     <div
//                       key={i}
//                       className="grid grid-cols-[60px_1.2fr_1.5fr_1.2fr_1fr_1fr_100px] border-t border-white/20 text-white text-sm lg:text-base hover:bg-white/10 transition-colors"
//                     >
//                       <div className="p-2 lg:p-3">
//                         {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                       </div>
//                       <div className="p-2 lg:p-3 break-words">{data.name || "N/A"}</div>
//                       <div className="p-2 lg:p-3 break-all">{data.email || "N/A"}</div>
//                       <div className="p-2 lg:p-3 break-words">{data.username || "N/A"}</div>
//                       <div className="p-2 lg:p-3 px-12" >{data.totalChainReferrals || 0}</div>
//                       <div className="p-2 lg:p-3">
//                         {data.createdAt
//                           ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
//                           : "N/A"}
//                       </div>
//                       <div className="p-2 lg:p-3">
//                         <span
//                           className={`px-2 sm:px-3 py-1 rounded-full text-xs lg:text-sm font-bold ${data.isActive
//                             ? "bg-green-600 text-white"
//                             : "bg-red-600 text-white"
//                             }`}
//                         >
//                           {data.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//    <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//         <div className="flex justify-center mt-6">
//           <Pagination
//             currentPage={state.currentPage}
//             totalPages={userDetails?.data?.pagination?.totalPages || 1}
//             onPageChange={(page) =>
//               setState((prev) => ({ ...prev, currentPage: page }))
//             }
//           />
//         </div>


//       </div>
//     </>
//   );
// };

// export default MyTotalTeam;




// import React, { useEffect, useState } from 'react';
// import membersImage from "../../../../assets/members.svg";
// import referralImage from "../../../../assets/referral.svg";
// import { toast, ToastContainer } from 'react-toastify';
// import { useUserDetailsQuery } from './myTotatTeamApliSlice';
// import { useNavigate } from 'react-router-dom';
// import search from "../../../../assets/search.svg";
// import Loader from '../../../Loader/loader';
// import TextField from "@mui/material/TextField";
// import InputAdornment from '@mui/material/InputAdornment';
// import { FaShareAlt, FaUsers, FaChartLine, FaSearch, FaCopy } from 'react-icons/fa';
// import { HiOutlineUserGroup, HiOutlineTrendingUp } from 'react-icons/hi';
// import Pagination from '../../../pagination/pagination';

// const MyTotalTeam = () => {
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
//   const userData =
//     localStorage.getItem("userData") &&
//     JSON.parse(localStorage.getItem("userData"));
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [copiedCode, setCopiedCode] = useState(false);

//   const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;
//   const referralContent = `
//   🚀 Join the Jaimax Coin Revolution! 🚀
  
//   Hey there! 🌟
  
//   I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗
  
//   Don't miss out on this chance to be part of something BIG! 💥
  
//   👉 ${REGISTER_REFERAL + userData?.data?.username}
  
//   #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

//   const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""
//     }&search=${state?.search || ""}`;
//   const {
//     data: userDetails,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useUserDetailsQuery(queryParams);

//   const TableData = userDetails?.data?.withdrawRequests || [];
//   const totalUsers = userDetails?.data?.pagination?.total || 0;
//   const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 0;

//   // Handle copy referral code
//   const handleCopyReferralCode = async () => {
//     try {
//       await navigator.clipboard.writeText(userData?.data?.username);
//       setCopiedCode(true);
//       toast.success('Referral code copied!', { position: "top-center" });
//       setTimeout(() => setCopiedCode(false), 2000);
//     } catch (err) {
//       toast.error('Failed to copy referral code', { position: "top-center" });
//     }
//   };

//   // Handle PerChange
//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState({ ...state, currentPage: e });
//   };

//   // Function for handling search with delay
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   const paginatedData = TableData.slice(
//     (state.currentPage - 1) * state.perPage,
//     state.currentPage * state.perPage
//   );

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const verifyToken = async () => {
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       setIsTokenVerified(true);
//     };

//     verifyToken();
//   }, [navigate]);

//   useEffect(() => {
//     if (isTokenVerified) {
//       const debounce = setTimeout(() => {
//         if (error?.data?.status_code === 400) {
//           localStorage.clear();
//           navigate("/login");
//           toast.error(error?.data?.message, {
//             position: "top-center",
//           });
//         }
//       }, 2000);

//       return () => clearTimeout(debounce);
//     }
//   }, [isTokenVerified, error, navigate]);

//   useEffect(() => {
//     refetch();
//     return () => {
//       clearTimeout(searchTimeout);
//     };
//   }, []);

//   useEffect(() => {
//     setLoading(false);
//   }, [userDetails?.data?.withdrawRequests]);

//   const infoBoxes = [
//     {
//       title: "Total Active Members",
//       value: totalUsers,
//       description: "Active team members",
//       icon: <HiOutlineUserGroup className="w-8 h-8" />,
//       gradient: "from-blue-500 via-blue-600 to-blue-700",
//       shadowColor: "shadow-blue-500/25",
//       borderColor: "border-blue-500/20",
//       textColor: "text-blue-50"
//     },
//     {
//       title: "Foundation",
//       value: totalChainUsers,
//       description: "Foundation members",
//       icon: <HiOutlineTrendingUp className="w-8 h-8" />,
//       gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
//       shadowColor: "shadow-emerald-500/25",
//       borderColor: "border-emerald-500/20",
//       textColor: "text-emerald-50"
//     },
//     {
//       title: "Referral Code",
//       value: userData?.data?.username,
//       description: "Your unique referral code",
//       icon: <FaShareAlt className="w-6 h-6" />,
//       gradient: "from-purple-500 via-purple-600 to-purple-700",
//       shadowColor: "shadow-purple-500/25",
//       borderColor: "border-purple-500/20",
//       textColor: "text-purple-50",
//       isReferral: true
//     }
//   ];

//   return (
//     <>
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//           }
          
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           @keyframes shimmer {
//             0% { background-position: -200% 0; }
//             100% { background-position: 200% 0; }
//           }
          
//           .animate-float {
//             animation: float 3s ease-in-out infinite;
//           }
          
//           .animate-fadeInUp {
//             animation: fadeInUp 0.6s ease-out forwards;
//           }
          
//           .shimmer {
//             background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
//             background-size: 200% 100%;
//             animation: shimmer 2s infinite;
//           }
          
//           .glass-effect {
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.2);
//           }
          
//           .hover-lift {
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           }
          
//           .hover-lift:hover {
//             transform: translateY(-8px);
//             box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
//           }
          
//           .gradient-border {
//             position: relative;
//             background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
//             border-radius: 1rem;
//           }
          
//           .gradient-border::before {
//             content: '';
//             position: absolute;
//             inset: 0;
//             padding: 1px;
//             background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
//             border-radius: inherit;
//             mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//             mask-composite: xor;
//           }
          
//           .custom-scrollbar {
//             scrollbar-width: thin;
//             scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 6px;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: rgba(0, 0, 0, 0.2);
//             border-radius: 3px;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: rgba(0, 0, 0, 0.3);
//           }
          
//           @media (max-width: 768px) {
//             .mobile-grid {
//               grid-template-columns: 1fr;
//               gap: 1rem;
//             }
//           }
          
//           @media (min-width: 769px) and (max-width: 1024px) {
//             .tablet-grid {
//               grid-template-columns: repeat(2, 1fr);
//               gap: 1.5rem;
//             }
//           }
          
//           @media (min-width: 1025px) {
//             .desktop-grid {
//               grid-template-columns: repeat(3, 1fr);
//               gap: 2rem;
//             }
//           }
//         `}
//       </style>

//       <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 p-4 sm:p-6 lg:p-8">
//         {/* Header Section */}

//         {/* Stats Cards */}
//         <div className="grid mobile-grid tablet-grid desktop-grid mb-8">
//           {infoBoxes.map((box, idx) => (
//             <div
//               key={idx}
//               className="relative overflow-hidden rounded-2xl bg-white p-2 sm:p-8 hover-lift shadow-xl border border-gray-100 animate-fadeInUp">
//               <div className="absolute inset-0 opacity-5">
//                 <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${box.gradient} animate-float`}></div>
//                 <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br ${box.gradient} animate-float`} ></div>
//               </div>
//               <div className="relative z-10">
//                 {box.isReferral ? (
//                   <div className="space-y-2">
//                     {/* Icon and Title Inline */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className={`p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg`}>
//                           {box.icon}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                             {box.title}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             {box.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Copy Button */}
//                       <button
//                         onClick={handleCopyReferralCode}
//                         className={`p-2 rounded-lg bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200`}
//                       >
//                         <FaCopy className={`w-4 h-4 ${copiedCode ? 'text-green-100' : ''}`} />
//                       </button>
//                     </div>

//                     {/* Referral Code Display */}
//                     <div className="bg-gray-50 rounded-lg p-0 border border-gray-200">
//                       <div className="flex items-center justify-between">
//                         <code className="text-lg font-mono font-bold text-gray-800 truncate">
//                           {box.value}
//                         </code>
//                         <span className="text-xs text-gray-500 ml-2">
//                           {copiedCode ? 'Copied!' : 'Click to copy'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )
//                   : (
//                     <div className="space-y-2">
//                       {/* Icon and Title in a Row */}
//                       <div className="flex items-center gap-4">
//                         <div className={`p-1 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg w-fit`}>
//                           {box.icon}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                             {box.title}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             {box.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Value Section */}
//                       <div className="text-3xl sm:text-4xl font-bold text-gray-800">
//                         {box.value.toLocaleString()}
//                       </div>
//                     </div>

//                   )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Team Data Section */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//                 Team Members
//               </h2>
//               <p className="text-gray-600">
//                 {totalUsers} total members across your network
//               </p>
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full sm:w-80">
//               <input
//                 type="text"
//                 placeholder="Search members..."
//                 className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl py-3 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-200"
//                 onChange={handleSearch}
//               />
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </div>
//           </div>

//           {/* Loading State */}
//           {isLoading ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-20 bg-gray-100 rounded-xl shimmer border border-gray-200"
//                 />
//               ))}
//             </div>
//           ) : TableData.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                 <FaUsers className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//               <p className="text-gray-600">Start inviting people to build your team!</p>
//             </div>
//           ) : (
//             <>
//               {/* Mobile Cards */}
//               <div className="grid gap-4 lg:hidden">
//                 {TableData.map((data, i) => (
//                   <div
//                     key={i}
//                     className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-200"
//                   >
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
//                           {data.name || "N/A"}
//                         </h3>
//                         <p className="text-sm text-gray-600 truncate">
//                           @{data.username || "N/A"}
//                         </p>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${data.isActive
//                           ? "bg-green-100 text-green-700 border border-green-200"
//                           : "bg-red-100 text-red-700 border border-red-200"
//                           }`}
//                       >
//                         {data.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>

//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Email:</span>
//                         <span className="text-gray-800 truncate ml-2">{data.email || "N/A"}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Referrals:</span>
//                         <span className="text-gray-800 font-medium">{data.totalChainReferrals || 0}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Joined:</span>
//                         <span className="text-gray-800">
//                           {data.createdAt
//                             ? new Date(data.createdAt).toLocaleDateString()
//                             : "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Desktop Table */}
//               <div className="hidden lg:block overflow-x-auto custom-scrollbar">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium">#</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium">Member</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium">Contact</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium">Referrals</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium">Join Date</th>
//                       <th className="text-left py-4 px-4 text-gray-600 font-medium">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {TableData.map((data, i) => (
//                       <tr
//                         key={i}
//                         className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
//                       >
//                         <td className="py-4 px-4 text-gray-600">
//                           {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
//                         </td>
//                         <td className="py-4 px-4">
//                           <div>
//                             <div className="font-medium text-gray-800">{data.name || "N/A"}</div>
//                             <div className="text-sm text-gray-600">@{data.username || "N/A"}</div>
//                           </div>
//                         </td>
//                         <td className="py-4 px-4 text-gray-700">{data.email || "N/A"}</td>
//                         <td className="py-4 px-4">
//                           <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
//                             {data.totalChainReferrals || 0}
//                           </span>
//                         </td>
//                         <td className="py-4 px-4 text-gray-700">
//                           {data.createdAt
//                             ? new Date(data.createdAt).toLocaleDateString()
//                             : "N/A"}
//                         </td>
//                         <td className="py-4 px-4">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-medium ${data.isActive
//                               ? "bg-green-100 text-green-700 border border-green-200"
//                               : "bg-red-100 text-red-700 border border-red-200"
//                               }`}
//                           >
//                             {data.isActive ? "Active" : "Inactive"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}

//           {/* Pagination */}
//           {TableData.length > 0 && (
//             <div className="flex justify-center mt-8">
//               <Pagination
//                 currentPage={state.currentPage}
//                 totalPages={userDetails?.data?.pagination?.totalPages || 1}
//                 onPageChange={(page) =>
//                   setState((prev) => ({ ...prev, currentPage: page }))
//                 }
//               />
//             </div>
//           )}
//         </div>

//         {/* Toast Container */}
//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//         />
//       </div>
//     </>
//   );
// };

// export default MyTotalTeam;




// import React, { useEffect, useState } from 'react';
// import membersImage from "../../../../assets/members.svg";
// import referralImage from "../../../../assets/referral.svg";
// import { toast, ToastContainer } from 'react-toastify';
// import { useUserDetailsQuery } from './myTotatTeamApliSlice';
// import { useNavigate } from 'react-router-dom';
// import search from "../../../../assets/search.svg";
// import Loader from '../../../Loader/loader';
// import TextField from "@mui/material/TextField";
// import InputAdornment from '@mui/material/InputAdornment';
// import { FaShareAlt, FaUsers, FaChartLine, FaSearch, FaCopy } from 'react-icons/fa';
// import { HiOutlineUserGroup, HiOutlineTrendingUp } from 'react-icons/hi';
// import Pagination from '../../../pagination/pagination';

// const MyTotalTeam = () => {
//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
//   const userData =
//     localStorage.getItem("userData") &&
//     JSON.parse(localStorage.getItem("userData"));
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [copiedCode, setCopiedCode] = useState(false);

//   const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;
//   const referralContent = `
//   🚀 Join the Jaimax Coin Revolution! 🚀
  
//   Hey there! 🌟
  
//   I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗
  
//   Don't miss out on this chance to be part of something BIG! 💥
  
//   👉 ${REGISTER_REFERAL + userData?.data?.username}
  
//   #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

//   // Static data for the table
//   const staticData = [
//     {
//       name: "John Smith",
//       username: "johnsmith123",
//       email: "john.smith@example.com",
//       totalChainReferrals: 25,
//       createdAt: "2024-01-15T10:30:00Z",
//       isActive: true
//     },
//     {
//       name: "Sarah Johnson",
//       username: "sarahj456",
//       email: "sarah.johnson@example.com",
//       totalChainReferrals: 18,
//       createdAt: "2024-02-20T14:22:00Z",
//       isActive: true
//     },
//     {
//       name: "Michael Brown",
//       username: "mikebrown",
//       email: "mike.brown@example.com",
//       totalChainReferrals: 32,
//       createdAt: "2024-01-08T09:15:00Z",
//       isActive: false
//     },
//     {
//       name: "Emily Davis",
//       username: "emilyd789",
//       email: "emily.davis@example.com",
//       totalChainReferrals: 12,
//       createdAt: "2024-03-05T16:45:00Z",
//       isActive: true
//     },
//     {
//       name: "David Wilson",
//       username: "davidw321",
//       email: "david.wilson@example.com",
//       totalChainReferrals: 8,
//       createdAt: "2024-02-28T11:30:00Z",
//       isActive: true
//     },
//     {
//       name: "Lisa Anderson",
//       username: "lisaa654",
//       email: "lisa.anderson@example.com",
//       totalChainReferrals: 41,
//       createdAt: "2024-01-22T13:20:00Z",
//       isActive: false
//     },
//     {
//       name: "Robert Taylor",
//       username: "robtaylor",
//       email: "robert.taylor@example.com",
//       totalChainReferrals: 15,
//       createdAt: "2024-03-12T08:10:00Z",
//       isActive: true
//     },
//     {
//       name: "Jennifer Lee",
//       username: "jenlee987",
//       email: "jennifer.lee@example.com",
//       totalChainReferrals: 23,
//       createdAt: "2024-02-14T12:05:00Z",
//       isActive: true
//     },
//     {
//       name: "Christopher Clark",
//       username: "chrisclark",
//       email: "chris.clark@example.com",
//       totalChainReferrals: 6,
//       createdAt: "2024-03-18T15:40:00Z",
//       isActive: false
//     },
//     {
//       name: "Amanda Martinez",
//       username: "amanda_m",
//       email: "amanda.martinez@example.com",
//       totalChainReferrals: 29,
//       createdAt: "2024-01-30T10:25:00Z",
//       isActive: true
//     }
//   ];

//   const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""
//     }&search=${state?.search || ""}`;
//   const {
//     data: userDetails,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useUserDetailsQuery(queryParams);

//   // Use static data if API data is not available or empty
//   const TableData = userDetails?.data?.withdrawRequests?.length > 0 
//     ? userDetails?.data?.withdrawRequests 
//     : staticData;
  
//   const totalUsers = userDetails?.data?.pagination?.total || staticData.length;
//   const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 85;

//   // Filter data based on search
//   const filteredData = TableData.filter(item => 
//     item.name?.toLowerCase().includes(state.search.toLowerCase()) ||
//     item.username?.toLowerCase().includes(state.search.toLowerCase()) ||
//     item.email?.toLowerCase().includes(state.search.toLowerCase())
//   );

//   // Paginate filtered data
//   const paginatedData = filteredData.slice(
//     (state.currentPage - 1) * state.perPage,
//     state.currentPage * state.perPage
//   );

//   // Handle copy referral code
//   const handleCopyReferralCode = async () => {
//     try {
//       await navigator.clipboard.writeText(userData?.data?.username || "DEMO123");
//       setCopiedCode(true);
//       toast.success('Referral code copied!', { position: "top-center" });
//       setTimeout(() => setCopiedCode(false), 2000);
//     } catch (err) {
//       toast.error('Failed to copy referral code', { position: "top-center" });
//     }
//   };

//   // Handle PerChange
//   const handlePageChange = (e) => {
//     setLoading(true);
//     setState({ ...state, currentPage: e });
//   };

//   // Function for handling search with delay
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const verifyToken = async () => {
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       setIsTokenVerified(true);
//     };

//     verifyToken();
//   }, [navigate]);

//   useEffect(() => {
//     if (isTokenVerified) {
//       const debounce = setTimeout(() => {
//         if (error?.data?.status_code === 400) {
//           localStorage.clear();
//           navigate("/login");
//           toast.error(error?.data?.message, {
//             position: "top-center",
//           });
//         }
//       }, 2000);

//       return () => clearTimeout(debounce);
//     }
//   }, [isTokenVerified, error, navigate]);

//   useEffect(() => {
//     refetch();
//     return () => {
//       clearTimeout(searchTimeout);
//     };
//   }, []);

//   useEffect(() => {
//     setLoading(false);
//   }, [userDetails?.data?.withdrawRequests]);

//   const infoBoxes = [
//     {
//       title: "Total Active Members",
//       value: totalUsers,
//       description: "Active team members",
//       icon: <HiOutlineUserGroup className="w-8 h-8" />,
//       gradient: "from-blue-500 via-blue-600 to-blue-700",
//       shadowColor: "shadow-blue-500/25",
//       borderColor: "border-blue-500/20",
//       textColor: "text-blue-50"
//     },
//     {
//       title: "Foundation",
//       value: totalChainUsers,
//       description: "Foundation members",
//       icon: <HiOutlineTrendingUp className="w-8 h-8" />,
//       gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
//       shadowColor: "shadow-emerald-500/25",
//       borderColor: "border-emerald-500/20",
//       textColor: "text-emerald-50"
//     },
//     {
//       title: "Referral Code",
//       value: userData?.data?.username || "DEMO123",
//       description: "Your unique referral code",
//       icon: <FaShareAlt className="w-6 h-6" />,
//       gradient: "from-purple-500 via-purple-600 to-purple-700",
//       shadowColor: "shadow-purple-500/25",
//       borderColor: "border-purple-500/20",
//       textColor: "text-purple-50",
//       isReferral: true
//     }
//   ];

//   const totalPages = Math.ceil(filteredData.length / state.perPage);

//   return (
//     <>
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//           }
          
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           @keyframes shimmer {
//             0% { background-position: -200% 0; }
//             100% { background-position: 200% 0; }
//           }
          
//           .animate-float {
//             animation: float 3s ease-in-out infinite;
//           }
          
//           .animate-fadeInUp {
//             animation: fadeInUp 0.6s ease-out forwards;
//           }
          
//           .shimmer {
//             background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
//             background-size: 200% 100%;
//             animation: shimmer 2s infinite;
//           }
          
//           .glass-effect {
//             background: rgba(255, 255, 255, 0.1);
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255, 255, 255, 0.2);
//           }
          
//           .hover-lift {
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           }
          
//           .hover-lift:hover {
//             transform: translateY(-8px);
//             box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
//           }
          
//           .gradient-border {
//             position: relative;
//             background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
//             border-radius: 1rem;
//           }
          
//           .gradient-border::before {
//             content: '';
//             position: absolute;
//             inset: 0;
//             padding: 1px;
//             background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
//             border-radius: inherit;
//             mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//             mask-composite: xor;
//           }
          
//           .custom-scrollbar {
//             scrollbar-width: thin;
//             scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 6px;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: rgba(0, 0, 0, 0.2);
//             border-radius: 3px;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: rgba(0, 0, 0, 0.3);
//           }
          
//           @media (max-width: 768px) {
//             .mobile-grid {
//               grid-template-columns: 1fr;
//               gap: 1rem;
//             }
//           }
          
//           @media (min-width: 769px) and (max-width: 1024px) {
//             .tablet-grid {
//               grid-template-columns: repeat(2, 1fr);
//               gap: 1.5rem;
//             }
//           }
          
//           @media (min-width: 1025px) {
//             .desktop-grid {
//               grid-template-columns: repeat(3, 1fr);
//               gap: 2rem;
//             }
//           }
//         `}
//       </style>

//       <div className="min-h-screen bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 p-4 sm:p-6 lg:p-8">
//         {/* Header Section */}

//         {/* Stats Cards */}
//         <div className="grid mobile-grid tablet-grid desktop-grid mb-8">
//           {infoBoxes.map((box, idx) => (
//             <div
//               key={idx}
//               className="relative overflow-hidden rounded-2xl bg-white p-2 sm:p-8 hover-lift shadow-xl border border-gray-100 animate-fadeInUp">
//               <div className="absolute inset-0 opacity-5">
//                 <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${box.gradient} animate-float`}></div>
//                 <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br ${box.gradient} animate-float`} ></div>
//               </div>
//               <div className="relative z-10">
//                 {box.isReferral ? (
//                   <div className="space-y-2">
//                     {/* Icon and Title Inline */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className={`p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg`}>
//                           {box.icon}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                             {box.title}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             {box.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Copy Button */}
//                       <button
//                         onClick={handleCopyReferralCode}
//                         className={`p-2 rounded-lg bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200`}
//                       >
//                         <FaCopy className={`w-4 h-4 ${copiedCode ? 'text-green-100' : ''}`} />
//                       </button>
//                     </div>

//                     {/* Referral Code Display */}
//                     <div className="bg-gray-50 rounded-lg p-0 border border-gray-200">
//                       <div className="flex items-center justify-between">
//                         <code className="text-lg font-mono font-bold text-gray-800 truncate">
//                           {box.value}
//                         </code>
//                         <span className="text-xs text-gray-500 ml-2">
//                           {copiedCode ? 'Copied!' : 'Click to copy'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )
//                   : (
//                     <div className="space-y-2">
//                       {/* Icon and Title in a Row */}
//                       <div className="flex items-center gap-4">
//                         <div className={`p-1 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg w-fit`}>
//                           {box.icon}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                             {box.title}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             {box.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Value Section */}
//                       <div className="text-3xl sm:text-4xl font-bold text-gray-800">
//                         {box.value.toLocaleString()}
//                       </div>
//                     </div>

//                   )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Team Data Section */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//                 Team Members
//               </h2>
//               <p className="text-gray-600">
//                 {totalUsers} total members across your network
//               </p>
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full sm:w-80">
//               <input
//                 type="text"
//                 placeholder="Search members..."
//                 className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl py-3 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-200"
//                 onChange={handleSearch}
//               />
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </div>
//           </div>

//           {/* Loading State */}
//           {isLoading ? (
//             <div className="space-y-4">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-20 bg-gray-100 rounded-xl shimmer border border-gray-200"
//                 />
//               ))}
//             </div>
//           ) : (
//             <>
//               {/* Mobile Cards */}
//               <div className="grid gap-4 lg:hidden">
//                 {paginatedData.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                       <FaUsers className="w-12 h-12 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//                     <p className="text-gray-600">Try adjusting your search criteria!</p>
//                   </div>
//                 ) : (
//                   paginatedData.map((data, i) => (
//                     <div
//                       key={i}
//                       className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
//                             {data.name || "N/A"}
//                           </h3>
//                           <p className="text-sm text-gray-600 truncate">
//                             @{data.username || "N/A"}
//                           </p>
//                         </div>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${data.isActive
//                             ? "bg-green-100 text-green-700 border border-green-200"
//                             : "bg-red-100 text-red-700 border border-red-200"
//                             }`}
//                         >
//                           {data.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </div>

//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Email:</span>
//                           <span className="text-gray-800 truncate ml-2">{data.email || "N/A"}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Referrals:</span>
//                           <span className="text-gray-800 font-medium">{data.totalChainReferrals || 0}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Joined:</span>
//                           <span className="text-gray-800">
//                             {data.createdAt
//                               ? new Date(data.createdAt).toLocaleDateString()
//                               : "N/A"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {/* Desktop Table - Header always shows */}
//               <div className="hidden lg:block overflow-x-auto custom-scrollbar">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200 text-white txte-xs bg-[#0d9387]">
//                       <th className="text-left py-4 px-4 font-medium">s/No</th>
//                       <th className="text-left py-4 px-4  font-medium">Member</th>
//                       <th className="text-left py-4 px-4 font-medium">Contact</th>
//                       <th className="text-left py-4 px-4  font-medium">Referrals</th>
//                       <th className="text-left py-4 px-4 font-medium">Join Date</th>
//                       <th className="text-left py-4 px-4  font-medium">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedData.length === 0 ? (
//                       <tr>
//                         <td colSpan="6" className="text-center py-10">
//                           <div className="flex flex-col items-center">
//                             <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                               <FaUsers className="w-12 h-12 text-gray-400" />
//                             </div>
//                             <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//                             <p className="text-gray-600">Try adjusting your search criteria!</p>
//                           </div>
//                         </td>
//                       </tr>
//                     ) : (
//                       paginatedData.map((data, i) => (
//                         <tr
//                           key={i}
//                           className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 text-sm"
//                         >
//                           <td className="py-4 px-4 text-gray-600">
//                             {(state?.currentPage - 1) * state?.perPage + i + 1}
//                           </td>
//                           <td className="py-4 px-4">
//                             <div>
//                               <div className="font-medium text-gray-800">{data.name || "N/A"}</div>
//                               <div className="text-sm text-gray-600">@{data.username || "N/A"}</div>
//                             </div>
//                           </td>
//                           <td className="py-4 px-4 text-gray-700">{data.email || "N/A"}</td>
//                           <td className="py-4 px-4">
//                             <span className=" text-gray-700 px-3 py-1 rounded-full  font-medium">
//                               {data.totalChainReferrals || 0}
//                             </span>
//                           </td>
//                           <td className="py-4 px-4 text-gray-700">
//                             {data.createdAt
//                               ? new Date(data.createdAt).toLocaleDateString()
//                               : "N/A"}
//                           </td>
//                           <td className="py-4 px-4">
//                             <span
//                               className={`px-3 py-1 rounded-full text-xs font-medium ${data.isActive
//                                 ? "bg-green-100 text-green-700 border border-green-200"
//                                 : "bg-red-100 text-red-700 border border-red-200"
//                                 }`}
//                             >
//                               {data.isActive ? "Active" : "Inactive"}
//                             </span>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}

//           {/* Pagination - Only show if there are pages to paginate */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-8">
//               <Pagination
//                 currentPage={state.currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) =>
//                   setState((prev) => ({ ...prev, currentPage: page }))
//                 }
//               />
//             </div>
//           )}
//         </div>

//         {/* Toast Container */}
//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//         />
//       </div>
//     </>
//   );
// };

// export default MyTotalTeam;




// import React, { useState, useEffect } from 'react';
// import { FaShareAlt, FaUsers, FaSearch, FaCopy, FaChartLine } from 'react-icons/fa';
// import { HiOutlineUserGroup, HiOutlineTrendingUp } from 'react-icons/hi';

// const MyTotalTeam = () => {
//   const [state, setState] = useState({
//     currentPage: 1,
//     perPage: 10,
//     search: "",
//   });
//   const [copiedCode, setCopiedCode] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Sample data
//   const staticData = [
//     {
//       name: "John Smith",
//       username: "johnsmith123",
//       email: "john.smith@example.com",
//       totalChainReferrals: 25,
//       createdAt: "2024-01-15T10:30:00Z",
//       isActive: true
//     },
//     {
//       name: "Sarah Johnson",
//       username: "sarahj456",
//       email: "sarah.johnson@example.com",
//       totalChainReferrals: 18,
//       createdAt: "2024-02-20T14:22:00Z",
//       isActive: true
//     },
//     {
//       name: "Michael Brown",
//       username: "mikebrown",
//       email: "mike.brown@example.com",
//       totalChainReferrals: 32,
//       createdAt: "2024-01-08T09:15:00Z",
//       isActive: false
//     },
//     {
//       name: "Emily Davis",
//       username: "emilyd789",
//       email: "emily.davis@example.com",
//       totalChainReferrals: 12,
//       createdAt: "2024-03-05T16:45:00Z",
//       isActive: true
//     },
//     {
//       name: "David Wilson",
//       username: "davidw321",
//       email: "david.wilson@example.com",
//       totalChainReferrals: 8,
//       createdAt: "2024-02-28T11:30:00Z",
//       isActive: true
//     },
//     {
//       name: "Lisa Anderson",
//       username: "lisaa654",
//       email: "lisa.anderson@example.com",
//       totalChainReferrals: 41,
//       createdAt: "2024-01-22T13:20:00Z",
//       isActive: false
//     },
//     {
//       name: "Robert Taylor",
//       username: "robtaylor",
//       email: "robert.taylor@example.com",
//       totalChainReferrals: 15,
//       createdAt: "2024-03-12T08:10:00Z",
//       isActive: true
//     },
//     {
//       name: "Jennifer Lee",
//       username: "jenlee987",
//       email: "jennifer.lee@example.com",
//       totalChainReferrals: 23,
//       createdAt: "2024-02-14T12:05:00Z",
//       isActive: true
//     }
//   ];

//   const userData = {
//     data: {
//       username: "DEMO123"
//     }
//   };

//   const totalUsers = staticData.length;
//   const totalChainUsers = 85;

//   // Filter data based on search
//   const filteredData = staticData.filter(item => 
//     item.name?.toLowerCase().includes(state.search.toLowerCase()) ||
//     item.username?.toLowerCase().includes(state.search.toLowerCase()) ||
//     item.email?.toLowerCase().includes(state.search.toLowerCase())
//   );

//   // Paginate filtered data
//   const paginatedData = filteredData.slice(
//     (state.currentPage - 1) * state.perPage,
//     state.currentPage * state.perPage
//   );

//   // Handle copy referral code
//   const handleCopyReferralCode = async () => {
//     try {
//       await navigator.clipboard.writeText(userData?.data?.username || "DEMO123");
//       setCopiedCode(true);
//       setTimeout(() => setCopiedCode(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy referral code');
//     }
//   };

//   // Function for handling search with delay
//   let searchTimeout;
//   const handleSearch = (e) => {
//     clearTimeout(searchTimeout);
//     searchTimeout = setTimeout(() => {
//       setState({ ...state, search: e.target.value, currentPage: 1 });
//     }, 1000);
//   };

//   const infoBoxes = [
//     {
//       title: "Total Active Members",
//       value: totalUsers,
//       description: "Active team members",
//       icon: <HiOutlineUserGroup className="w-8 h-8" />,
//       gradient: "from-teal-500 via-teal-600 to-teal-700"
//     },
//     {
//       title: "Foundation",
//       value: totalChainUsers,
//       description: "Foundation members",
//       icon: <HiOutlineTrendingUp className="w-8 h-8" />,
//       gradient: "from-teal-500 via-teal-600 to-teal-700"
//     },
//     {
//       title: "Referral Code",
//       value: userData?.data?.username || "DEMO123",
//       description: "Your unique referral code",
//       icon: <FaShareAlt className="w-6 h-6" />,
//       gradient: "from-teal-500 via-teal-600 to-teal-700",
//       isReferral: true
//     }
//   ];

//   const totalPages = Math.ceil(filteredData.length / state.perPage);

//   // Simple Pagination Component
//   const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getVisiblePages = () => {
//       const delta = 2;
//       const range = [];
//       const rangeWithDots = [];

//       for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
//         range.push(i);
//       }

//       if (currentPage - delta > 2) {
//         rangeWithDots.push(1, '...');
//       } else {
//         rangeWithDots.push(1);
//       }

//       rangeWithDots.push(...range);

//       if (currentPage + delta < totalPages - 1) {
//         rangeWithDots.push('...', totalPages);
//       } else {
//         rangeWithDots.push(totalPages);
//       }

//       return rangeWithDots;
//     };

//     if (totalPages <= 1) return null;

//     return (
//       <div className=" flex items-center justify-center space-x-2">
//         <button
//           onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
        
//         {getVisiblePages().map((page, index) => (
//           <button
//             key={index}
//             onClick={() => typeof page === 'number' ? onPageChange(page) : null}
//             disabled={typeof page !== 'number'}
//             className={`px-3 py-2 text-sm rounded-full ${
//               page === currentPage
//                 ? 'bg-teal-600 text-white'
//                 : typeof page === 'number'
//                 ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
//                 : 'bg-transparent text-gray-500 cursor-default'
//             }`}
//           >
//             {page}
//           </button>
//         ))}
        
//         <button
//           onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   return (
//     <>
//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//           }
          
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           .animate-float {
//             animation: float 3s ease-in-out infinite;
//           }
          
//           .animate-fadeInUp {
//             animation: fadeInUp 0.6s ease-out forwards;
//           }
          
//           .hover-lift {
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           }
          
//           .hover-lift:hover {
//             transform: translateY(-4px);
//             box-shadow: 0 10px 25px rgba(0, 128, 128, 0.15);
//           }
          
//           .custom-scrollbar {
//             scrollbar-width: thin;
//             scrollbar-color: rgba(0, 128, 128, 0.3) transparent;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 6px;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: rgba(0, 128, 128, 0.3);
//             border-radius: 3px;
//           }
          
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: rgba(0, 128, 128, 0.5);
//           }
//         `}
//       </style>

//       <div className="min-h-screen bg-[#1d8e85] to-white p-4 sm:p-6 lg:p-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {infoBoxes.map((box, idx) => (
//             <div
//               key={idx}
//               className="relative overflow-hidden rounded-2xl bg-white p-6 hover-lift shadow-lg border border-gray-100 animate-fadeInUp"
//               style={{ animationDelay: `${idx * 0.1}s` }}
//             >
//               <div className="absolute inset-0 opacity-5">
//                 <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${box.gradient} animate-float`}></div>
//                 <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br ${box.gradient} animate-float`}></div>
//               </div>
              
//               <div className="relative z-10">
//                 {box.isReferral ? (
//                   <div className="space-y-4">
//                     {/* Icon and Title */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className={`p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg`}>
//                           {box.icon}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                             {box.title}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             {box.description}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Copy Button */}
//                       <button
//                         onClick={handleCopyReferralCode}
//                         className={`p-2 rounded-full bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200 ${copiedCode ? 'bg-green-500' : ''}`}
//                         title="Copy referral code"
//                       >
//                         <FaCopy className={`w-4 h-4 ${copiedCode ? 'text-white' : ''}`} />
//                       </button>
//                     </div>

//                     {/* Referral Code Display */}
//                     <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
//                       <div className="flex items-center justify-between">
//                         <code className="text-lg  font-bold text-teal-800 truncate">
//                           {box.value}
//                         </code>
//                         <span className="text-xs text-teal-600 ml-2">
//                           {copiedCode ? 'Copied!' : 'Click to copy'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {/* Icon and Title */}
//                     <div className="flex items-center gap-4">
//                       <div className={`p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg`}>
//                         {box.icon}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                           {box.title}
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           {box.description}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Value Section */}
//                     <div className="text-3xl sm:text-4xl font-bold text-teal-700">
//                       {box.value.toLocaleString()}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Team Data Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//                 Team Members
//               </h2>
//               <p className="text-gray-600">
//                 {totalUsers} total members across your network
//               </p>
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full sm:w-80">
//               <input
//                 type="text"
//                 placeholder="Search members..."
//                 className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl py-3 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:bg-white transition-all duration-200"
//                 onChange={handleSearch}
//               />
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </div>
//           </div>

//           {/* Mobile Cards */}
//           <div className="grid gap-4 lg:hidden">
//             {paginatedData.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                   <FaUsers className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//                 <p className="text-gray-600">Try adjusting your search criteria!</p>
//               </div>
//             ) : (
//               paginatedData.map((data, i) => (
//                 <div
//                   key={i}
//                   className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-4 border border-teal-100 hover:border-teal-200 hover:shadow-md transition-all duration-200"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
//                         {data.name || "N/A"}
//                       </h3>
//                       {/* <p className="text-sm text-teal-600 truncate">
//                         @{data.username || "N/A"}
//                       </p> */}
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         data.isActive
//                           ? "bg-green-100 text-green-700 border border-green-200"
//                           : "bg-red-100 text-red-700 border border-red-200"
//                       }`}
//                     >
//                       {data.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </div>

//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Email:</span>
//                       <span className="text-gray-800 truncate ">{data.email || "N/A"}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Referrals:</span>
//                       <span className="text-teal-700 ">{data.totalChainReferrals || 0}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Joined:</span>
//                       <span className="text-gray-800">
//                         {data.createdAt
//                           ? new Date(data.createdAt).toLocaleDateString()
//                           : "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden lg:block overflow-x-auto custom-scrollbar">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-xs">
//                   <th className="text-left py-4 px-4  rounded-tl-lg">S.No</th>
//                   <th className="text-left py-4 px-4">Member</th>
//                   <th className="text-left py-4 px-4 ">Contact</th>
//                   <th className="text-left py-4 px-4 ">Referrals</th>
//                   <th className="text-left py-4 px-4 ">Join Date</th>
//                   <th className="text-left py-4 px-4  rounded-tr-lg">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedData.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-center py-10">
//                       <div className="flex flex-col items-center">
//                         <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//                           <FaUsers className="w-12 h-12 text-gray-400" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
//                         <p className="text-gray-600">Try adjusting your search criteria!</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedData.map((data, i) => (
//                     <tr
//                       key={i}
//                       className="border-b border-gray-100 hover:bg-teal-50 transition-colors duration-200 text-xs"
//                     >
//                       <td className="py-4 px-4 text-gray-800">
//                         {(state?.currentPage - 1) * state?.perPage + i + 1}
//                       </td>
//                       <td className="py-4 px-4">
//                         <div>
//                           <div className=" text-gray-800">{data.name || "N/A"}</div>
//                           {/* <div className="text-sm text-teal-600">@{data.username || "N/A"}</div> */}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-gray-700">{data.email || "N/A"}</td>
//                       <td className="py-4 px-4">
//                         <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
//                           {data.totalChainReferrals || 0}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4 text-gray-700">
//                         {data.createdAt
//                           ? new Date(data.createdAt).toLocaleDateString()
//                           : "N/A"}
//                       </td>
//                       <td className="py-4 px-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs ${
//                             data.isActive
//                               ? "bg-green-100 text-green-700 border border-green-200"
//                               : "bg-red-100 text-red-700 border border-red-200"
//                           }`}
//                         >
//                           {data.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-8">
//               <Pagination
//                 currentPage={state.currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) =>
//                   setState((prev) => ({ ...prev, currentPage: page }))
//                 }
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyTotalTeam; 



import React, { useState, useEffect } from 'react';
import { Users, Search, Copy, TrendingUp, UserCheck, Calendar, Mail, Award, Filter, ChevronDown } from 'lucide-react';

const MyTotalTeam = () => {
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 8,
    search: "",
    sortBy: 'name',
    filterStatus: 'all'
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced sample data
  const staticData = [
    {
      name: "John Smith",
      username: "johnsmith123",
      email: "john.smith@example.com",
      totalChainReferrals: 25,
      createdAt: "2024-01-15T10:30:00Z",
      isActive: true,
      avatar: "JS"
    },
    {
      name: "Sarah Johnson",
      username: "sarahj456",
      email: "sarah.johnson@example.com",
      totalChainReferrals: 18,
      createdAt: "2024-02-20T14:22:00Z",
      isActive: true,
      avatar: "SJ"
    },
    {
      name: "Michael Brown",
      username: "mikebrown",
      email: "mike.brown@example.com",
      totalChainReferrals: 32,
      createdAt: "2024-01-08T09:15:00Z",
      isActive: false,
      avatar: "MB"
    },
    {
      name: "Emily Davis",
      username: "emilyd789",
      email: "emily.davis@example.com",
      totalChainReferrals: 12,
      createdAt: "2024-03-05T16:45:00Z",
      isActive: true,
      avatar: "ED"
    },
    {
      name: "David Wilson",
      username: "davidw321",
      email: "david.wilson@example.com",
      totalChainReferrals: 8,
      createdAt: "2024-02-28T11:30:00Z",
      isActive: true,
      avatar: "DW"
    },
    {
      name: "Lisa Anderson",
      username: "lisaa654",
      email: "lisa.anderson@example.com",
      totalChainReferrals: 41,
      createdAt: "2024-01-22T13:20:00Z",
      isActive: false,
      avatar: "LA"
    },
    {
      name: "Robert Taylor",
      username: "robtaylor",
      email: "robert.taylor@example.com",
      totalChainReferrals: 15,
      createdAt: "2024-03-12T08:10:00Z",
      isActive: true,
      avatar: "RT"
    },
    {
      name: "Jennifer Lee",
      username: "jenlee987",
      email: "jennifer.lee@example.com",
      totalChainReferrals: 23,
      createdAt: "2024-02-14T12:05:00Z",
      isActive: true,
      avatar: "JL"
    }
  ];

  const userData = {
    data: {
      username: "JAIMAX156VODZ",
      name: "Demo User"
    }
  };

  const totalUsers = staticData.length;
  const totalChainUsers = 85;
  const activeUsers = staticData.filter(user => user.isActive).length;

  // Enhanced filtering and sorting
  const filteredData = staticData
    .filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(state.search.toLowerCase()) ||
        item.username?.toLowerCase().includes(state.search.toLowerCase()) ||
        item.email?.toLowerCase().includes(state.search.toLowerCase());
      
      const matchesStatus = state.filterStatus === 'all' || 
        (state.filterStatus === 'active' && item.isActive) ||
        (state.filterStatus === 'inactive' && !item.isActive);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (state.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'referrals':
          return b.totalChainReferrals - a.totalChainReferrals;
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (state.currentPage - 1) * state.perPage,
    state.currentPage * state.perPage
  );

  // Handle copy referral code
  const handleCopyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(userData?.data?.username || "DEMO123");
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy referral code');
    }
  };

  // Enhanced search with debounce
  const handleSearch = (e) => {
    const value = e.target.value;
    setState(prev => ({ ...prev, search: value, currentPage: 1 }));
  };

  const infoBoxes = [
    {
      title: "Total Members",
      value: totalUsers,
      description: `${activeUsers} active members`,
      icon: <Users className="w-6 h-6" />,
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Foundation",
      value: totalChainUsers,
      description: "Foundation network",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      change: "+8%",
      trend: "up"
    },
    {
      title: "Referral Code",
      value: userData?.data?.username || "JAIAMX156VODZ",
      description: "Your unique code",
      icon: <Award className="w-6 h-6" />,
      gradient: "from-teal-500 via-teal-600 to-teal-700",
      isReferral: true
    }
  ];

  const totalPages = Math.ceil(filteredData.length / state.perPage);

  // Enhanced Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 1;
      const range = [];
      
      for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        range.push(i);
      }
      
      return range;
    };

    return (
      <div className="flex items-center justify-between mt-6 px-2">
        <div className="text-sm text-gray-600">
          Showing {((currentPage - 1) * state.perPage) + 1} to {Math.min(currentPage * state.perPage, filteredData.length)} of {filteredData.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1d8d84] p-3 sm:p-4 lg:p-2">
      {/* Header Section */}
      <div className="mb-2 sm:mb-8">
        

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {infoBoxes.map((box, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                {box.isReferral ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          {box.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-xs sm:text-base">
                            {box.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {box.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleCopyReferralCode}
                        className={`p-2 rounded-full bg-gradient-to-br ${box.gradient} text-white hover:shadow-lg transition-all duration-200 ${copiedCode ? 'scale-110' : ''}`}
                        title="Copy referral code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-3 sm:p-4 border border-teal-200">
                      <div className="flex items-center justify-between">
                        <code className="text-xs sm:text-xl font-bold text-teal-800 truncate">
                          {box.value}
                        </code>
                        <span className="text-xs text-teal-600 ml-2">
                          {copiedCode ? '✓ Copied!' : 'Click to copy'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${box.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          {box.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                            {box.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {box.description}
                          </p>
                        </div>
                      </div>
                      {box.change && (
                        <div className="text-right">
                          <span className="text-green-600 text-xs sm:text-sm font-bold">
                            {box.change}
                          </span>
                          <div className="text-xs text-gray-500">vs last month</div>
                        </div>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-2xl font-bold text-gray-800">
                      {typeof box.value === 'number' ? box.value.toLocaleString() : box.value}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Data Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8">
        {/* Header with Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Team Members
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredData.length} of {totalUsers} members
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 lg:w-80">
              <input
                type="text"
                placeholder="Search members..."
                className="w-full bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-xl py-3 pl-12 pr-4 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:bg-white/90 transition-all duration-200"
                onChange={handleSearch}
                value={state.search}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors duration-200 border border-teal-200"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50/80 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={state.sortBy}
                  onChange={(e) => setState(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="referrals">Referrals (High to Low)</option>
                  <option value="date">Join Date (Newest)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={state.filterStatus}
                  onChange={(e) => setState(prev => ({ ...prev, filterStatus: e.target.value, currentPage: 1 }))}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Members</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        <div className="grid gap-4 lg:hidden">
          {paginatedData.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No members found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search or filters</p>
            </div>
          ) : (
            paginatedData.map((data, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-white to-teal-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-teal-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base group-hover:scale-110 transition-transform duration-300">
                    {data.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 truncate">
                      {data.name || "N/A"}
                    </h3>
                    {/* <p className="text-teal-600 text-sm truncate">
                      @{data.username || "N/A"}
                    </p> */}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      data.isActive
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {data.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{data.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-teal-700 font-medium">{data.totalChainReferrals || 0} referrals</span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Joined {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <th className="text-left py-4 px-6 font-semibold rounded-tl-xl">Member</th>
                <th className="text-left py-4 px-6 font-semibold">Contact</th>
                <th className="text-left py-4 px-6 font-semibold">Referrals</th>
                <th className="text-left py-4 px-6 font-semibold">Join Date</th>
                <th className="text-left py-4 px-6 font-semibold rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">No members found</h3>
                      <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((data, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-teal-50/50 transition-colors duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium text-sm group-hover:scale-110 transition-transform duration-300">
                          {data.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{data.name || "N/A"}</div>
                          {/* <div className="text-sm text-teal-600">@{data.username || "N/A"}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{data.email || "N/A"}</td>
                    <td className="py-4 px-6">
                      <span className=" text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {data.totalChainReferrals || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          data.isActive
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={state.currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setState(prev => ({ ...prev, currentPage: page }))}
        />
      </div>
    </div>
  );
};

export default MyTotalTeam;
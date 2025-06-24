
import React, { useEffect, useState } from 'react';
import membersImage from "../../../../assets/members.svg";
import referralImage from "../../../../assets/referral.svg";
import { toast, ToastContainer } from 'react-toastify';
import { useUserDetailsQuery } from './myTotatTeamApliSlice';
import { useNavigate } from 'react-router-dom';
import search from "../../../../assets/search.svg";
import Loader from '../../../Loader/loader';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import { FaShareAlt } from 'react-icons/fa';
import Pagination from '../../../pagination/pagination';

const MyTotalTeam = () => {


  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });
  const userData =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"));
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;
  const referralContent = `
  🚀 Join the Jaimax Coin Revolution! 🚀
  
  Hey there! 🌟
  
  I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗
  
  Don’t miss out on this chance to be part of something BIG! 💥
  
  👉 ${REGISTER_REFERAL + userData?.data?.username}
  
  #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

  const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""
    }&search=${state?.search || ""}`;
  const {
    data: userDetails,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserDetailsQuery(queryParams);

  const TableData = userDetails?.data?.withdrawRequests || [];
  const totalUsers = userDetails?.data?.pagination?.total || 0;
  const totalChainUsers = userDetails?.data?.pagination?.chainTotal || 0;

  // Handle PerChange
  const handlePageChange = (e) => {
    setLoading(true);
    setState({ ...state, currentPage: e });
  };

  // Function for handling search with delay
  let searchTimeout;
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setState({ ...state, search: e.target.value, currentPage: 1 });
    }, 1000);
  };

  const paginatedData = TableData.slice(
    (state.currentPage - 1) * state.perPage,
    state.currentPage * state.perPage
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setIsTokenVerified(true);
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    if (isTokenVerified) {
      const debounce = setTimeout(() => {
        if (error?.data?.status_code === 400) {
          localStorage.clear();
          navigate("/login");
          toast.error(error?.data?.message, {
            position: "top-center",
          });
        }
      }, 2000);

      return () => clearTimeout(debounce);
    }
  }, [isTokenVerified, error, navigate]);

  useEffect(() => {
    refetch();
    return () => {
      clearTimeout(searchTimeout);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [userDetails?.data?.withdrawRequests]);

  const infoBoxes = [
    {
      title: "Total Active Members",
      value: totalUsers,
      description: "Active team members",
      image: membersImage,
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
      shapes: ['circle', 'triangle']
    },
    {
      title: "Foundation",
      value: totalChainUsers,
      description: "Foundation members",
      image: referralImage,
      iconBg: "bg-gradient-to-br from-green-400 to-green-600",
      shapes: ['square', 'pentagon']
    },
    {
      title: "Referral Code",
      value: userData?.data?.username,
      // description: "Your unique referral code",
      image: referralImage,
      iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
      shapes: ['diamond', 'ellipse']
    }
  ];

  const shapeBaseStyles = {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.1,
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease, transform 3s ease-in-out',
    zIndex: 0,
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    willChange: 'transform',
  };

  const shapeStyles = {
    circle: {
      width: '6rem',
      height: '6rem',
      borderRadius: '50%',
      backgroundColor: '#084e54',
      animationName: 'floatUpDown',
      animationDuration: '6s',
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: '3rem solid transparent',
      borderRight: '3rem solid transparent',
      borderBottom: '5rem solid #084e54',
      animationName: 'floatLeftRight',
      animationDuration: '5s',
    },
    square: {
      width: '6rem',
      height: '6rem',
      backgroundColor: '#084e54',
      animationName: 'floatUpDown',
      animationDuration: '7s',
    },
    pentagon: {
      width: '6rem',
      height: '6rem',
      backgroundColor: '#084e54',
      clipPath: 'polygon(50% 0%, 95% 35%, 77% 90%, 23% 90%, 5% 35%)',
      animationName: 'floatLeftRight',
      animationDuration: '6.5s',
    },
    diamond: {
      width: '5rem',
      height: '5rem',
      backgroundColor: '#084e54',
      transform: 'rotate(45deg)',
      animationName: 'floatUpDown',
      animationDuration: '5.5s',
    },
    ellipse: {
      width: '7rem',
      height: '4rem',
      backgroundColor: '#084e54',
      borderRadius: '50% / 100%',
      animationName: 'floatLeftRight',
      animationDuration: '6s',
    },
  };

  const shapePositions = [
    { top: '-1.5rem', right: '-1.5rem' },
    { bottom: '-1.5rem', left: '-1.5rem' },
  ];

  // Dummy team members
  const teamMembers = [
    {
      name: "Alice Johnson",
      task: "Design System",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=1",
      bg: "bg-green-500",
      badge: "bg-green-200 text-green-800"
    },
    {
      name: "Bob Smith",
      task: "Backend API",
      status: "Idle",
      avatar: "https://i.pravatar.cc/100?img=2",
      bg: "bg-yellow-500",
      badge: "bg-yellow-200 text-yellow-800"
    },
    {
      name: "Charlie Davis",
      task: "Frontend UI",
      status: "Offline",
      avatar: "https://i.pravatar.cc/100?img=3",
      bg: "bg-red-500",
      badge: "bg-red-200 text-red-800"
    }
  ];

  return (
    <>
      <style>
        {`
          @media (max-width: 1330px) {
            .custom-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
          @media (max-width: 960px) {
            .custom-grid {
              grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
            }
          }
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="w-full bg-[#1d8e85] min-h-screen space-y-6 px-4 py-6">
        {/* Info Boxes */}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
          {infoBoxes.map((box, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-xl bg-white text-[#084e54]
      overflow-hidden transition duration-300 ease-in-out hover:scale-[1.02]"
            >
              {/* Shapes */}
              {box.shapes.map((shape, i) => (
                <div
                  key={i}
                  style={{
                    ...shapeBaseStyles,
                    ...shapeStyles[shape],
                    ...shapePositions[i],
                  }}
                />
              ))}

              {/* Main Content */}
              <div className="z-10 pr-20">
                <div className="text-lg font-semibold mb-2">{box.title}</div>

                {box.title === "Referral Code" ? (
                  <div className="w-full rounded-md border border-lime-400 bg-[#1d8e85] px-4 py-2 flex items-center justify-between">
                    <div className="flex flex-col w-full max-w-xs">
                      <TextField
                        id={`referralCode-${idx}`}
                        label="Referral Code"
                        value={box.value}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <FaShareAlt style={{ cursor: 'pointer', color: 'white' }} />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        size="small"
                        sx={{
                          input: { color: 'white' },
                          label: { color: 'white' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#4caf50',
                            },
                            '&:hover fieldset': {
                              borderColor: '#81c784',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#66bb6a',
                            },
                          },
                        }}
                      />

                    </div>

                  </div>
                ) : (
                  <div className="text-2xl font-bold mb-2">{box.value}</div>
                )}

                <div className="text-sm text-[#1d4d4f]">{box.description}</div>
              </div>

              {/* Icon bubble */}
              <div
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full
          flex items-center justify-center border-4 border-white z-10 ${box.iconBg}`}
              >
                <img
                  src={box.image}
                  alt={box.title}
                  className="w-14 h-14 object-contain opacity-80"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Team Members Panel */}
        <div className="p-2 sm:p-4 lg:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 max-w-8xl w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold">Total Team Details</h1>
            <div className="w-full sm:w-auto sm:flex-initial max-w-sm">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent border border-white/30 text-white rounded-md py-2 pl-10 pr-4 placeholder-white/70 text-sm sm:text-base focus:outline-none focus:border-white/50 transition-colors"
                  onChange={handleSearch}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <img src={search} className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                </span>
              </div>
            </div>
          </div>

          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 mb-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30"
              >
                <Loader />
              </div>
            ))
          ) : TableData.length === 0 ? (
            <div className="flex justify-center items-center text-white py-6 sm:py-8 text-sm sm:text-base text-center">
              No data found
            </div>
          ) : (
            <>
              {/* Cards for Mobile & Tablet */}
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:hidden">
                {TableData.map((data, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 bg-white/15 rounded-xl border border-white/30 text-white space-y-1 sm:space-y-2 shadow-md hover:bg-white/25 transition-colors flex-1 min-w-[280px] max-w-full"
                  >
                    <div className="flex justify-between items-start sm:items-center gap-2">
                      <div className="text-base sm:text-lg font-semibold break-words flex-1">{data.name || "N/A"}</div>
                      <span
                        className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ${data.isActive ? "bg-green-600" : "bg-red-600"
                          }`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm space-y-1">
                      <div>
                        <strong className="text-white/90">Email:</strong>
                        <span className="ml-1 break-all">{data.email || "N/A"}</span>
                      </div>
                      <div>
                        <strong className="text-white/90">Username:</strong>
                        <span className="ml-1 break-words">{data.username || "N/A"}</span>
                      </div>
                      <div>
                        <strong className="text-white/90">Referrals:</strong>
                        <span className="ml-1">{data.totalChainReferrals || 0}</span>
                      </div>
                      <div>
                        <strong className="text-white/90">Join Date:</strong>{" "}
                        <span className="ml-1">
                          {data.createdAt
                            ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                            : "N/A"}
                        </span>
                      </div>
                      <div>
                        <strong className="text-white/90">S.No:</strong>{" "}
                        <span className="ml-1">
                          {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table-like View for Desktop */}
              <div className="hidden lg:block overflow-x-auto mt-2">
                <div className="min-w-full">
                  {/* Updated grid template columns here to balance email width */}
                  <div className="grid grid-cols-[60px_1.2fr_1.5fr_1.2fr_1fr_1fr_100px] bg-white/20 border border-white/30 text-white rounded-t-md font-semibold text-sm lg:text-base">
                    <div className="p-2 lg:p-3">S.No</div>
                    <div className="p-2 lg:p-3">Name</div>
                    <div className="p-2 lg:p-3">Email</div>
                    <div className="p-2 lg:p-3">Username</div>
                    <div className="p-2 lg:p-3">Referrals</div>
                    <div className="p-2 lg:p-3">Join Date</div>
                    <div className="p-2 lg:p-3">Status</div>
                  </div>
                  {TableData.map((data, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[60px_1.2fr_1.5fr_1.2fr_1fr_1fr_100px] border-t border-white/20 text-white text-sm lg:text-base hover:bg-white/10 transition-colors"
                    >
                      <div className="p-2 lg:p-3">
                        {state?.currentPage * state?.perPage - (state?.perPage - 1) + i}
                      </div>
                      <div className="p-2 lg:p-3 break-words">{data.name || "N/A"}</div>
                      <div className="p-2 lg:p-3 break-all">{data.email || "N/A"}</div>
                      <div className="p-2 lg:p-3 break-words">{data.username || "N/A"}</div>
                      <div className="p-2 lg:p-3 px-12" >{data.totalChainReferrals || 0}</div>
                      <div className="p-2 lg:p-3">
                        {data.createdAt
                          ? data.createdAt.slice(0, 10).split("-").reverse().join("-")
                          : "N/A"}
                      </div>
                      <div className="p-2 lg:p-3">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs lg:text-sm font-bold ${data.isActive
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                            }`}
                        >
                          {data.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
   <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={state.currentPage}
            totalPages={userDetails?.data?.pagination?.totalPages || 1}
            onPageChange={(page) =>
              setState((prev) => ({ ...prev, currentPage: page }))
            }
          />
        </div>


      </div>
    </>
  );
};

export default MyTotalTeam;

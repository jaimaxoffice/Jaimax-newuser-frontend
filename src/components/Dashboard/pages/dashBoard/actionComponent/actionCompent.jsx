// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaShareAlt, FaDownload, FaUser } from "react-icons/fa";
// import { TextField, InputAdornment } from "@mui/material";
// import { toast } from "react-toastify";
// import assets from "../../../../../assets/assets";
// import { MyContext } from "../../../../../Authentication/AuthContext";
// import {
//   useUserDataQuery,
//   useGetAdminSettingsQuery
// } from "../DashboardApliSlice";
// import ReferralModal from "../../../modals/referalModal";

// const ActionButtons = () => {
//   const navigate = useNavigate();
//   const { data } = useContext(MyContext);

//   const token = localStorage.getItem("token");
//   const userDataTopasID = localStorage.getItem("userData");
//   const parsedUserData = userDataTopasID ? JSON.parse(userDataTopasID) : null;

//   const [isTokenVerified, setIsTokenVerified] = useState(false);
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [currency, setCurrency] = useState("");
//   const [currencySymbol, setCurrencySymbol] = useState("");

//   const { data: userData, refetch } = useUserDataQuery(undefined, {
//     skip: !isTokenVerified,
//   });

//   const { data: settings, refetch: refetchAdminSetting } = useGetAdminSettingsQuery();

//   const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;

//   const referralContent = `
// 🚀 Join the Jaimax Coin Revolution! 🚀

// Hey there! 🌟

// I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗

// Don't miss out on this chance to be part of something BIG! 💥

// 👉 ${REGISTER_REFERAL + userData?.data?.username}

// #JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       setIsTokenVerified(true);
//     };

//     verifyToken();
//   }, [token, navigate]);

//   useEffect(() => {
//     setCurrency(userData && userData?.data?.countryCode === 91 ? "INR" : "USD");

//     if (userData && userData?.data?.countryCode !== 91) {
//       setCurrencySymbol("$");
//     } else if (userData && userData?.data?.countryCode === 91) {
//       setCurrencySymbol("₹");
//     }
//   }, [userData?.data?.countryCode]);

//   useEffect(() => {
//     if (userData?.data?.profile) {
//       localStorage.setItem("profile", userData?.data?.profile);
//     } else {
//       localStorage.removeItem("profile");
//     }
//   }, [userData?.data?.profile]);

//   useEffect(() => {
//     if (isTokenVerified) {
//       refetch();
//       refetchAdminSetting();
//     }
//   }, [isTokenVerified, refetch, refetchAdminSetting]);

//   const handleOpenReferralModal = () => {
//     setShowReferralModal(true);
//   };

//   const handleCloseReferralModal = () => {
//     setShowReferralModal(false);
//   };

//   const handleImportData = () => {
//     toast.info('Import data functionality coming soon!', {
//       position: "top-center",
//     });
//   };

//   const getUserDisplayName = () => {
//     if (userData?.data?.name) {
//       return userData.data.name.toUpperCase();
//     }
//     if (userData?.data?.username) {
//       return userData.data.username.toUpperCase();
//     }
//     return "jaimax";
//   };

//   return (
//     <>
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
//           {/* Profile Section */}
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-100">
//               {userData?.data?.profile ? (
//                 <img
//                   src={userData.data.profile}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-teal-50 flex items-center justify-center">
//                   <FaUser className="text-teal-600 text-lg" />
//                 </div>
//               )}
//             </div>
            
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {getUserDisplayName()}
//               </h3>
//               <p className="text-sm text-gray-600">Welcome to Jaimax</p>
//             </div>
//           </div>

//           {/* Actions Section */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            
//             {/* Referral Code Input */}
//             <div className="min-w-[260px] shadow-xl rounded-full">
//               <TextField
//                 label="Referral Code"
//                 value={userData?.data?.username || "JAIMAXXXXXXXX"}
//                 size="small"
//                 fullWidth
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <button
//                         onClick={handleOpenReferralModal}
//                         className="p-1.5 rounded-full hover:bg-teal-50 text-teal-600 hover:text-teal-700 transition-colors duration-200"
//                         title="Share Referral Code"
//                       >
//                         <FaShareAlt size={16} />
//                       </button>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     backgroundColor: '#f8fafc',
//                     '& fieldset': {
//                       borderColor: '#e2e8f0',
//                     },
//                     '&:hover fieldset': {
//                       borderColor: '#e2e8f0',
//                     },
//                     '&.Mui-focused fieldset': {
//                       // borderColor: '#14b8a6',
//                     },
//                   },
//                   '& .MuiInputLabel-root': {
//                     // color: '#64748b',
//                     '&.Mui-focused': {
//                       color: '#14b8a6',
//                     },
//                   },
//                 }}
//               />
//             </div>
            
//           </div>
//         </div>
//       </div>

//       <ReferralModal
//         show={showReferralModal}
//         onHide={() => setShowReferralModal(false)}
//         userData={userData}
//       />
//     </>
//   );
// };

// export default ActionButtons;


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import assets from "../../../../../assets/assets";
import { MyContext } from "../../../../../Authentication/AuthContext";
import {
  useUserDataQuery,
  useGetAdminSettingsQuery
} from "../DashboardApliSlice";
import ReferralModal from "../../../modals/referalModal";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { data } = useContext(MyContext);

  const token = localStorage.getItem("token");
  const userDataTopasID = localStorage.getItem("userData");
  const parsedUserData = userDataTopasID ? JSON.parse(userDataTopasID) : null;

  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [currency, setCurrency] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");

  const { data: userData, refetch } = useUserDataQuery(undefined, {
    skip: !isTokenVerified,
  });

  const { data: settings, refetch: refetchAdminSetting } = useGetAdminSettingsQuery();

  const REGISTER_REFERAL = `${window.location.origin}/register?referralCode=`;

  const referralContent = `
🚀 Join the Jaimax Coin Revolution! 🚀

Hey there! 🌟

I'm excited to introduce you to Jaimax Coin – the future of cryptocurrency! 💰✨ It's a fast, secure, and innovative digital currency that offers amazing opportunities for everyone. Whether you're new to crypto or a seasoned investor, Jaimax Coin is designed to bring you great value. 🌍🔗

Don't miss out on this chance to be part of something BIG! 💥

👉 ${REGISTER_REFERAL + userData?.data?.username}

#JaimaxCoin #CryptoRevolution #JoinUs #FutureOfFinance`;

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setIsTokenVerified(true);
    };

    verifyToken();
  }, [token, navigate]);

  useEffect(() => {
    setCurrency(userData && userData?.data?.countryCode === 91 ? "INR" : "USD");

    if (userData && userData?.data?.countryCode !== 91) {
      setCurrencySymbol("$");
    } else if (userData && userData?.data?.countryCode === 91) {
      setCurrencySymbol("₹");
    }
  }, [userData?.data?.countryCode]);

  useEffect(() => {
    if (userData?.data?.profile) {
      localStorage.setItem("profile", userData?.data?.profile);
    } else {
      localStorage.removeItem("profile");
    }
  }, [userData?.data?.profile]);

  useEffect(() => {
    if (isTokenVerified) {
      refetch();
      refetchAdminSetting();
    }
  }, [isTokenVerified, refetch, refetchAdminSetting]);

  const handleOpenReferralModal = () => {
    setShowReferralModal(true);
  };

  const handleCloseReferralModal = () => {
    setShowReferralModal(false);
  };

  const getUserDisplayName = () => {
    if (userData?.data?.name) {
      return userData.data.name.toUpperCase();
    }
    if (userData?.data?.username) {
      return userData.data.username.toUpperCase();
    }
    return "JAIMAX";
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-100">
              {userData?.data?.profile ? (
                <img
                  src={userData.data.profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-teal-50 flex items-center justify-center">
                  <FaUser className="text-teal-600 text-lg" />
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Hi {getUserDisplayName()}
              </h3>
              <p className="text-sm text-gray-600">Welcome to Jaimax</p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            
            {/* Referral Code Input */}
            <div className="min-w-[260px] shadow-xl rounded-full">
              <TextField
                label="Referral Code"
                value={userData?.data?.username || "Loading..."}
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <button
                        onClick={handleOpenReferralModal}
                        className="p-1.5 rounded-full hover:bg-teal-50 text-teal-600 hover:text-teal-700 transition-colors duration-200"
                        title="Share Referral Code"
                      >
                        <FaShareAlt size={16} />
                      </button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8fafc',
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#e2e8f0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14b8a6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#64748b',
                    '&.Mui-focused': {
                      color: '#14b8a6',
                    },
                  },
                }}
              />
            </div>
            
          </div>
        </div>
      </div>

      <ReferralModal
        show={showReferralModal}
        onHide={() => setShowReferralModal(false)}
        userData={userData}
      />
    </>
  );
};

export default ActionButtons;
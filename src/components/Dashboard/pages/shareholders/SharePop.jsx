
// import React, { useState, useEffect } from "react";
// // import logo from "../../assets/Images/footer.svg"; 
// import logo from "../../../../assets/Images/footer.svg";
// import { useShareAuthQuery } from './ShareholderAuthorizedApiSlice';

// // Icons as separate components for better readability
// const UserIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//     <circle cx="12" cy="7" r="4"></circle>
//   </svg>
// );

// const EmailBoxIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 4h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2z" />
//     <path d="M4 6l8 6 8-6" />
//   </svg>
// );

// const StarIcon = () => (
//   <svg
//     xmlns="http://www.w3.org="
//     width="12"
//     height="12"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     stroke="none"
//   >
//     <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
//   </svg>
// );

// const CrownIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     stroke="none"
//   >
//     <path d="M5 16L3 6l5.5 4L12 2l3.5 8L21 6l-2 10H5z" />
//   </svg>
// );

// const ShareholderCard = () => {
//   const { data, error, isLoading } = useShareAuthQuery();
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     if (isLoading) {
//       // Handle loading state, e.g., show a skeleton loader
//     } else if (error) {
//       console.error("❌ Error fetching data:", error);
//     } else if (data?.data?.shareholders) {
//       // console.log("✅ Fetched data:", data.data.shareholders);
//     }
//   }, [data, error, isLoading]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setMousePosition({ x, y });
//   };

//   // --- Loading State ---
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-teal-950 flex items-center justify-center text-emerald-400 text-lg">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>
//           Loading shareholders...
//         </div>
//       </div>
//     );
//   }

//   // --- Error State ---
//   if (error) {
//     return (
//       <div className="min-h-screen  flex flex-col items-center justify-center p-5 text-red-400 text-lg gap-3 text-center">
//         {/* Server Crash Icon */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="48"
//           height="48"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="text-red-400 mb-2"
//         >
//           <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
//           <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
//           <path d="M6 6h.01" />
//           <path d="M6 18h.01" />
//           <path d="m13 6-4 6h6l-4 6" />
//         </svg>
//         <span>Error loading shareholders</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Tailwind's JIT mode handles CSS, so direct <style jsx> is not typically needed.
//           Animations are defined in tailwind.config.js or via arbitrary values if complex. */}
//       {/* For custom animations, you'd usually extend your tailwind.config.js with keyframes */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-10px) rotate(120deg); }
//           66% { transform: translateY(5px) rotate(240deg); }
//         }
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }
//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(154, 205, 50, 0.3); }
//           50% { box-shadow: 0 0 30px rgba(154, 205, 50, 0.6), 0 0 40px rgba(154, 205, 50, 0.4); }
//         }

//         .card-container::before {
//           content: '';
//           position: absolute;
//           top: -2px;
//           left: -2px;
//           right: -2px;
//           bottom: -2px;
//           background: linear-gradient(45deg, #9ACD32 0%, #2E8B57 25%, #FFD700 50%, #9ACD32 75%, #2E8B57 100%);
//           border-radius: 20px;
//           z-index: -1;
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
        
//         .card-container:hover::before {
//           opacity: 1;
//           animation: shimmer 2s infinite linear;
//         }

//         .floating-particle {
//           position: absolute;
//           background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(154, 205, 50, 0.8));
//           border-radius: 50%;
//           pointer-events: none;
//           animation: float 4s infinite ease-in-out;
//           z-index: 10;
//           box-shadow: 0 0 10px rgba(154, 205, 50, 0.5);
//         }

//         .profile-image-wrapper::before {
//           content: '';
//           position: absolute;
//           top: -5px;
//           left: -5px;
//           right: -5px;
//           bottom: -5px;
//           background: conic-gradient(from 0deg, #9ACD32, #FFD700, #2E8B57, #9ACD32);
//           border-radius: 50%;
//           z-index: -1;
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
        
//         .profile-image-wrapper:hover::before {
//           opacity: 1;
//           animation: spin 3s linear infinite;
//         }
//       `}</style>

//       <div
//         className="min-h-screen relative overflow-hidden py-2 px-0 sm:px-5 lg:px-10"
//       >
       
//         <div className="text-center mb-12 mt-2">
//           <div className="inline-block bg-gradient-to-br from-teal-900 to-teal-600 rounded-full border-2 border-emerald-400/30 backdrop-blur-lg px-2 py-1 sm:px-4 sm:py-2">
//             <h3 className="m-0 text-white text-xl sm:text-2xl font-semibold">
//               Our Elite Shareholders
//             </h3>
//           </div>
//         </div>

//         <div className="container mx-auto">
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
//             {!data?.data?.shareholders?.length ? (
//               <div className="col-span-full text-center p-10">
//                 <div className="bg-emerald-400/10 border-2 border-dashed border-emerald-400/30 rounded-2xl p-5 text-white/70">
//                   <div className="text-5xl mb-5">👥</div>
//                   <h3 className="text-emerald-400 mb-2 text-2xl font-semibold">No Shareholders Yet</h3>
//                   <p className="text-lg">Be among the first to join our exclusive shareholder community</p>
//                 </div>
//               </div>
//             ) : (
//               data.data.shareholders.map((person, index) => {
//                 const isHovered = hoveredCard === person._id;
//                 return (
//                   <div
//                     key={person._id}
//                     className="col-span-1 min-h-full flex"
//                     onMouseEnter={() => setHoveredCard(person._id)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                     onMouseMove={(e) => handleMouseMove(e, person._id)}
//                   >
//                     <div className="card-container relative w-full">
//                       <div
//                         className={`card-inner rounded-2xl overflow-hidden transform transition-all duration-400 ease-in-out-quad bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col h-full 
//                           ${isHovered ? 'translate-y-[-10px] scale-102 shadow-2xl shadow-emerald-400/30' : 'translate-y-0 scale-100'}`}
//                       >
//                         {/* Floating particles for hovered card */}
//                         {isHovered && (
//                           <>
//                             <div className="floating-particle w-3 h-3 top-1/6 left-1/10 animate-float-delay-0"></div>
//                             <div className="floating-particle w-2 h-2 top-1/4 right-1/6 animate-float-delay-500"></div>
//                             <div className="floating-particle w-2.5 h-2.5 top-1/2 left-4/5 animate-float-delay-1000"></div>
//                             <div className="floating-particle w-1.5 h-1.5 top-3/4 left-1/5 animate-float-delay-1500"></div>
//                             <div className="floating-particle w-3.5 h-3.5 top-3/5 right-1/4 animate-float-delay-2000"></div>
//                           </>
//                         )}

//                         {/* Header with gradient */}
//                         <div className="bg-gradient-to-br from-teal-800 to-emerald-700 p-8 pt-6 pb-2 relative text-center">
//                           {/* Rank badge */}
//                           <div
//                             className={`absolute top-4 right-4 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-yellow-500/40 transition-all duration-300 ease-in-out ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}`}
//                           >
//                             <span className="text-sm font-bold text-teal-900">
//                               #{index + 1}
//                             </span>
//                           </div>

//                           {/* Profile Image */}
//                           <div className="profile-image-wrapper relative inline-block mb-3">
//                             <div
//                               className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg relative mx-auto
//                                 ${isHovered ? 'shadow-xl shadow-emerald-400/50' : ''}`}
//                             >
//                               <img
//                                 src={`${person.profileImage}?t=${new Date().getTime()}`}
//                                 alt={person.name}
//                                 className={`w-full h-full object-cover transition-all duration-500 ease-in-out
//                                   ${isHovered ? 'grayscale-0 brightness-110 scale-110' : 'grayscale-10 filter-brightness-100 scale-100'}`}
//                               />
//                               {/* Status indicator */}
//                               <div className={`absolute bottom-1 right-1 w-5 h-5 bg-gradient-to-br from-green-500 to-green-700 rounded-full border-3 border-white shadow-md shadow-green-500/50
//                                 ${isHovered ? 'animate-glow' : ''}`}></div>
//                             </div>
//                           </div>

//                           {/* Name */}
//                           <h3
//                             className={`text-xl font-bold text-white mb-0 text-shadow-md transition-all duration-300 ease-in-out
//                               ${isHovered ? 'scale-105' : 'scale-100'}`}
//                           >
//                             {person.name}
//                           </h3>
//                         </div>

//                         {/* Info Section */}
//                         <div
//                           className="p-3 bg-white/95 flex flex-col flex-grow"
//                         >
//                           {/* Logo */}
//                           <div
//                             className={`text-center mb-2 transition-all duration-300 ease-in-out
//                               ${isHovered ? 'scale-110' : 'scale-100'}`}
//                           >
//                             <img
//                               src={logo}
//                               alt="JAIMAX Logo"
//                               className={`h-9 object-contain mx-auto
//                                 ${isHovered ? 'brightness-110 saturate-125' : 'brightness-100'}`}
//                             />
//                           </div>

//                           {/* Info Items */}
//                           <div className="space-y-2">
//                             <div className="info-item flex items-center p-3 rounded-xl mb-2 text-emerald-700 text-sm font-medium bg-white/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-emerald-400/10 hover:border-emerald-400/30 hover:translate-x-1">
//                               <UserIcon />
//                               <span className="ml-2 flex-1">
//                                 {person.username}
//                               </span>
//                             </div>

//                             <div className="info-item flex items-start p-3 rounded-xl text-emerald-700 text-sm font-medium bg-white/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-emerald-400/10 hover:border-emerald-400/30 hover:translate-x-1">
//                               <div className="mt-0.5 flex-shrink-0">
//                                 <EmailBoxIcon />
//                               </div>
//                               <span className="ml-2 flex-1 leading-normal break-all text-xs">
//                                 {person.email}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShareholderCard;



import { useShareAuthQuery } from './ShareholderAuthorizedApiSlice';
import logo from "../../../../assets/Images/footer.svg";
import React, { useState, useEffect } from "react";
// const useShareAuthQuery = () => ({
//   data: {
//     data: {
//       shareholders: [
//         {
//           _id: "1",
//           name: "John Doe",
//           username: "JOHN001",
//           email: "john.doe@example.com",
//           profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
//         },
//         {
//           _id: "2", 
//           name: "Jane Smith",
//           username: "JANE002",
//           email: "jane.smith@example.com",
//           profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
//         },
//         {
//           _id: "3",
//           name: "Mike Johnson", 
//           username: "MIKE003",
//           email: "mike.johnson@example.com",
//           profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
//         },
//         {
//           _id: "4",
//           name: "Sarah Wilson",
//           username: "SARAH004", 
//           email: "sarah.wilson@example.com",
//           profileImage: "https://randomuser.me/api/portraits/women/4.jpg"
//         },
//         {
//           _id: "5",
//           name: "David Brown",
//           username: "DAVID005", 
//           email: "david.brown@example.com",
//           profileImage: "https://randomuser.me/api/portraits/men/5.jpg"
//         },
//         {
//           _id: "6",
//           name: "Emma Davis",
//           username: "EMMA006", 
//           email: "emma.davis@example.com",
//           profileImage: "https://randomuser.me/api/portraits/women/6.jpg"
//         }
//       ]
//     }
//   },
//   error: null,
//   isLoading: false
// });
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const EmailBoxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2z" />
    <path d="M4 6l8 6 8-6" />
  </svg>
);

const ShareholderCard = () => {
  const { data, error, isLoading } = useShareAuthQuery();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isLoading) {
      // Handle loading state
    } else if (error) {
      // console.error("❌ Error fetching data:", error);
    } else if (data?.data?.shareholders) {
      // console.log("✅ Fetched data:", data.data.shareholders);
    }
  }, [data, error, isLoading]);

  const handleMouseMove = (e, cardId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 flex items-center justify-center text-white">
        <div className="text-center p-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm sm:text-lg">Loading shareholders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 flex flex-col items-center justify-center p-4 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-400 mb-4"
        >
          <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
          <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
          <path d="M6 6h.01" />
          <path d="M6 18h.01" />
          <path d="m13 6-4 6h6l-4 6" />
        </svg>
        <p className="text-sm sm:text-lg text-center">Error loading shareholders</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
          50% { box-shadow: 0 0 30px rgba(20, 184, 166, 0.6), 0 0 40px rgba(20, 184, 166, 0.4); }
        }

        .card-container {
          position: relative;
          height: 100%;
        }
        
        .card-container::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            #14b8a6 0%, 
            #0d9488 25%, 
            #22c55e 50%, 
            #14b8a6 75%, 
            #0d9488 100%);
          border-radius: 20px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .card-container:hover::before {
          opacity: 1;
          animation: shimmer 2s infinite linear;
        }
        
        .floating-particle {
          position: absolute;
          background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(20, 184, 166, 0.8));
          border-radius: 50%;
          pointer-events: none;
          animation: float 4s infinite ease-in-out;
          z-index: 10;
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
        }
        
        .profile-image-wrapper {
          position: relative;
          overflow: visible;
        }
        
        .profile-image-wrapper::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: conic-gradient(from 0deg, #14b8a6, #22c55e, #0d9488, #14b8a6);
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .profile-image-wrapper:hover::before {
          opacity: 1;
          animation: spin 3s linear infinite;
        }
        
        .info-item {
          transition: all 0.3s ease;
          background: rgba(20, 184, 166, 0.05);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(20, 184, 166, 0.1);
        }
        
        .info-item:hover {
          background: rgba(20, 184, 166, 0.1);
          border-color: rgba(20, 184, 166, 0.3);
          transform: translateX(5px);
        }
        
        .premium-gradient {
          background: linear-gradient(135deg, 
            #0f766e 0%,
            #0d9488 25%,
            #14b8a6 50%,
            #5eead4 75%,
            #14b8a6 100%);
        }

        /* Mobile: 2 cards per row */
        @media (max-width: 575.98px) {
          .floating-particle {
            display: none;
          }
        }

        @media (max-width: 639px) {
          .mobile-2-cols {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
        }

        @media (min-width: 640px) and (max-width: 767px) {
          .sm-3-cols {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .md-4-cols {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .lg-5-cols {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 relative overflow-hidden py-3 sm:py-6 px-2 sm:px-4 lg:px-8">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/12 w-16 h-16 sm:w-24 sm:h-24 bg-teal-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/12 w-20 h-20 sm:w-32 sm:h-32 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="inline-block bg-gradient-to-br from-teal-700/80 to-teal-800/80 rounded-full border-2 border-teal-400/30 backdrop-blur-lg px-4 py-2 sm:px-6 sm:py-3 shadow-xl">
            <h3 className="m-0 text-white text-lg sm:text-xl lg:text-2xl font-semibold">
              Our Elite Shareholders
            </h3>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl">
          {/* Responsive Grid */}
          <div className="mobile-2-cols sm-3-cols md-4-cols lg-5-cols grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {!data?.data?.shareholders?.length ? (
              <div className="col-span-full">
                <div className="text-center p-6 sm:p-12">
                  <div className="bg-teal-400/10 border-2 border-dashed border-teal-400/30 rounded-2xl p-6 sm:p-8 text-white max-w-md mx-auto">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">👥</div>
                    <h3 className="text-teal-400 mb-3 text-xl sm:text-2xl font-semibold">No Shareholders Yet</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-white/80">Be among the first to join our exclusive shareholder community</p>
                  </div>
                </div>
              </div>
            ) : (
              data.data.shareholders.map((person, index) => {
                const isHovered = hoveredCard === person._id;
                return (
                  <div
                    key={person._id}
                    className="h-full"
                    onMouseEnter={() => setHoveredCard(person._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onMouseMove={(e) => handleMouseMove(e, person._id)}
                  >
                    <div className="card-container h-full">
                      <div
                        className={`card-inner rounded-xl sm:rounded-2xl overflow-hidden transform transition-all duration-400 ease-out bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/30 shadow-lg flex flex-col h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]
                          ${isHovered ? 'translate-y-[-4px] sm:translate-y-[-8px] lg:translate-y-[-12px] scale-[1.02] sm:scale-[1.03] lg:scale-[1.05] shadow-2xl shadow-teal-400/30' : 'translate-y-0 scale-100'}`}
                      >
                        {/* Floating particles for hovered card - hidden on mobile */}
                        {isHovered && (
                          <>
                            <div className="floating-particle hidden sm:block w-2 h-2 sm:w-3 sm:h-3 top-1/6 left-1/10" style={{ animationDelay: '0s' }}></div>
                            <div className="floating-particle hidden sm:block w-1.5 h-1.5 sm:w-2 sm:h-2 top-1/4 right-1/6" style={{ animationDelay: '0.5s' }}></div>
                            <div className="floating-particle hidden sm:block w-2 h-2 sm:w-2.5 sm:h-2.5 top-1/2 left-4/5" style={{ animationDelay: '1s' }}></div>
                            <div className="floating-particle hidden sm:block w-1 h-1 sm:w-1.5 sm:h-1.5 top-3/4 left-1/5" style={{ animationDelay: '1.5s' }}></div>
                            <div className="floating-particle hidden sm:block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 top-3/5 right-1/4" style={{ animationDelay: '2s' }}></div>
                          </>
                        )}

                        {/* Header with gradient */}
                        <div className="premium-gradient p-2 sm:p-3 md:p-4 lg:p-6 pt-3 sm:pt-4 lg:pt-6 pb-2 sm:pb-3 relative text-center">
                          {/* Rank badge */}
                          <div
                            className={`absolute top-1 sm:top-2 lg:top-3 right-1 sm:right-2 lg:right-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}`}
                          >
                            <span className="text-xs sm:text-xs md:text-sm font-bold text-white">
                              #{index + 1}
                            </span>
                          </div>

                          {/* Profile Image */}
                          <div className="profile-image-wrapper relative inline-block mb-1 sm:mb-2 lg:mb-3">
                            <div
                              className={`w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden border-2 sm:border-3 lg:border-4 border-white/30 shadow-lg relative mx-auto
                                ${isHovered ? 'shadow-xl shadow-teal-400/50' : ''}`}
                            >
                              <img
                                src={`${person.profileImage}?t=${new Date().getTime()}`}
                                alt={person.name}
                                className={`w-full h-full object-cover transition-all duration-500 ease-in-out
                                  ${isHovered ? 'scale-110 brightness-110' : 'scale-100'}`}
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/150/14b8a6/ffffff?text=" + person.name.charAt(0);
                                }}
                              />
                              {/* Status indicator */}
                              <div className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-1 sm:border-2 border-white shadow-md
                                ${isHovered ? 'animate-pulse' : ''}`}></div>
                            </div>
                          </div>

                          {/* Name */}
                          <h3
                            className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white mb-0 transition-all duration-300 ease-in-out leading-tight px-1 text-center break-words hyphens-auto
                              ${isHovered ? 'scale-105' : 'scale-100'}`}
                          >
                            {person.name}
                          </h3>
                        </div>

                        {/* Info Section */}
                        <div className="p-1.5 sm:p-2 md:p-3 lg:p-4 bg-white flex flex-col flex-grow">
                          {/* Logo */}
                          <div
                            className={`text-center mb-1.5 sm:mb-2 lg:mb-3 transition-all duration-300 ease-in-out
                              ${isHovered ? 'scale-110' : 'scale-100'}`}
                          >
                            <img
                              src={logo}
                              alt="JAIMAX Logo"
                              className={`h-3 sm:h-4 md:h-5 lg:h-6 xl:h-7 object-contain mx-auto
                                ${isHovered ? 'brightness-110 saturate-125' : 'brightness-100'}`}
                            />
                          </div>

                          {/* Info Items */}
                          <div className="space-y-1 sm:space-y-1.5 lg:space-y-2 flex-grow">
                            {/* Username */}
                            <div className="info-item flex items-center p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-md sm:rounded-lg lg:rounded-xl text-teal-700 text-xs sm:text-sm font-medium min-h-[1.75rem] sm:min-h-[2rem]">
                              <div className="flex-shrink-0">
                                <UserIcon />
                              </div>
                              <span className="ml-1.5 sm:ml-2 flex-1 font-semibold text-xs sm:text-sm break-words hyphens-auto leading-tight">
                                {person.username}
                              </span>
                            </div>

                            {/* Email */}
                            <div className="info-item flex items-start p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-md sm:rounded-lg lg:rounded-xl text-teal-700 text-xs sm:text-sm font-medium min-h-[2rem] sm:min-h-[2.5rem]">
                              <div className="mt-0.5 flex-shrink-0">
                                <EmailBoxIcon />
                              </div>
                              <span className="ml-1.5 sm:ml-2 flex-1 font-medium text-xs leading-tight break-all hyphens-auto" title={person.email}>
                                {person.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
                
              })
            )}
          </div>
        </div>
        
      </div>
    </>
  );
  
};

export default ShareholderCard;
import React, { useState, useEffect } from "react";
import { Copy, Users, Coins, TrendingUp, Check } from "lucide-react";
import logo from '../../../src/assets/Images/jaimaxlogo1.svg';
import { useNavigate } from "react-router-dom";
import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice"; // Update this path to your actual API file

const HomeAbout = () => {
  const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Fetch data using RTK Query
  const { 
    data: roundData, 
    error, 
    isLoading, 
    refetch 
  } = useGetRoundQuery();



  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // console.error('Failed to copy:', err);
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const handleNavigate = () => {
    navigate("/blog");
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  // Process the API data to create stats
  const getStatsFromApiData = () => {
    if (!roundData || isLoading) {
      // Use fallback data while loading or if no data
      return [
        {
          label: "LIVE PRICE",
          value: `0.00024`,
          icon: <TrendingUp className="w-4 h-4 text-lime-400" />,
          color: "text-lime-400",
        },
        {
          label: "SOLD TOKENS",
          value: '20M',
          icon: <TrendingUp className="w-4 h-4 text-white" />,
          color: "text-white",
        },
        {
          label: "LIVE MEMBERS",
          value: '1M',
          icon: <TrendingUp className="w-4 h-4 text-emerald-300" />,
          color: "text-emerald-300",
        },
      ];
    }

    // Adapt this based on your actual API response structure
    // You'll need to update these field names based on what your API returns
    const currentRound = roundData.rounds?.[0] || roundData; // Adjust based on API structure
    
    return [
      {
        label: "LIVE PRICE",
        value: `${(currentRound.currentPrice || currentRound.price || 0.00024).toFixed(5)}`,
        icon: <TrendingUp className="w-4 h-4 text-lime-400" />,
        color: "text-lime-400",
      },
      {
        label: "SOLD TOKENS",
        value: formatNumber(currentRound.soldTokens || currentRound.tokensSold || 225765326),
        icon: <TrendingUp className="w-4 h-4 text-white" />,
        color: "text-white",
      },
      {
        label: "LIVE MEMBERS",
        value: formatNumber(currentRound.totalMembers || currentRound.members || 24567),
        icon: <TrendingUp className="w-4 h-4 text-emerald-300" />,
        color: "text-emerald-300",
      },
    ];
  };

  const stats = getStatsFromApiData();

  // Handle loading and error states
  if (error) {
    // console.error('Error fetching round data:', error);
  }

  return (
    <>
      <section className=" text-white py-10 px-4 lg:px-14 sm:py-5 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <img src={logo} alt="" width="500px" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 uppercase mb-8 leading-tight">
              About Jaimax
            </h2>

            {/* Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-6">
                Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for crypto investing, trading, and literacy...
              </p>
              <button
                onClick={handleNavigate}
                className="inline-flex items-center text-teal-400 font-semibold hover:text-teal-300 transition-colors duration-200 group"
              >
                <span className="border-b-2 border-teal-400 group-hover:border-teal-300 transition-colors duration-200">
                  READ MORE
                </span>
                <TrendingUp className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Contract Address */}
            <div className="max-w-2xl mx-auto">
              <h4 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
                CONTRACT ADDRESS
              </h4>
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-2">
                  <p className="flex-1 text-center sm:text-left font-mono text-sm sm:text-base md:text-lg text-white break-all leading-tight">
                    {contractAddress}
                  </p>

                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center space-x-0 sm:space-x-2 bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copied ? (
                      <>
                        <Check className="hidden sm:inline" size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="hidden sm:inline" size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#085056] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-300 to-emerald-400 uppercase mb-2">
            LIVE UPDATE
           
          </h2>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-white text-sm tracking-wide mb-2 uppercase">
                {stat.label}
              </p>
              <div className="flex items-center gap-1">
                <h3 className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>
                  {stat.value}
                </h3>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeAbout;



// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Copy, Users, Coins, TrendingUp, Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useGetRoundQuery } from "../../components/Dashboard/pages/dashBoard/DashboardApliSlice";
// import { lazy, Suspense } from "react";

// // Lazy load the image
// const Logo = lazy(() => import('../../../src/assets/Images/jaimaxlogo1.svg'));

// // Create separate components for better code splitting
// const ContractAddressSection = React.memo(({ contractAddress, copied, handleCopy }) => (
//   <div className="max-w-2xl mx-auto">
//     <h4 className="text-xl md:text-2xl font-semibold mb-6 text-gray-200">
//       CONTRACT ADDRESS
//     </h4>
//     <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full">
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-2">
//         <p className="flex-1 text-center sm:text-left font-mono text-sm sm:text-base md:text-lg text-white break-all leading-tight">
//           {contractAddress}
//         </p>
//         <button
//           onClick={handleCopy}
//           className="flex items-center justify-center space-x-0 sm:space-x-2 bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-medium px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
//           title={copied ? 'Copied!' : 'Copy to clipboard'}
//         >
//           {copied ? (
//             <>
//               <Check className="hidden sm:inline" size={16} />
//               <span>Copied!</span>
//             </>
//           ) : (
//             <>
//               <Copy className="hidden sm:inline" size={16} />
//               <span>Copy</span>
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   </div>
// ));

// const StatCard = React.memo(({ label, value, icon, color }) => (
//   <div className="bg-[#063c40] border border-[#17bba3] rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition duration-300">
//     <p className="text-white text-sm tracking-wide mb-2 uppercase">
//       {label}
//     </p>
//     <div className="flex items-center gap-1">
//       <h3 className={`text-2xl sm:text-3xl font-extrabold ${color}`}>
//         {value}
//       </h3>
//       {icon}
//     </div>
//   </div>
// ));

// const HomeAbout = () => {
//   const contractAddress = "0xD898d23a082136f4d752e4dE31D8296EaEb94277";
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();

//   // Control when to fetch data - only fetch when component is visible
//   const [shouldFetch, setShouldFetch] = useState(true);
  
//   // Fetch data using RTK Query with controlled fetching
//   const { 
//     data: roundData, 
//     error, 
//     isLoading,
//     refetch 
//   } = useGetRoundQuery(undefined, {
//     skip: !shouldFetch,
//     pollingInterval: 30000 // Built-in RTK Query polling instead of manual interval
//   });

//   // Format number function memoized to avoid recreating on each render
//   const formatNumber = useCallback((num) => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M';
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toLocaleString();
//   }, []);

//   // Handle visibility changes to optimize API calls
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       setShouldFetch(!document.hidden);
//     };
    
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   const handleCopy = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(contractAddress);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       // Silent fail
//     }
//   }, [contractAddress]);

//   const handleNavigate = useCallback(() => {
//     navigate("/blog");
//   }, [navigate]);

//   // Memoize stats calculation to prevent recalculation on every render
//   const stats = useMemo(() => {
//     if (!roundData || isLoading) {
//       // Use fallback data while loading or if no data
//       return [
//         {
//           label: "LIVE PRICE",
//           value: `0.00024`,
//           icon: <TrendingUp className="w-4 h-4 text-lime-400" />,
//           color: "text-lime-400",
//         },
//         {
//           label: "SOLD TOKENS",
//           value: '20M',
//           icon: <TrendingUp className="w-4 h-4 text-white" />,
//           color: "text-white",
//         },
//         {
//           label: "LIVE MEMBERS",
//           value: '1M',
//           icon: <TrendingUp className="w-4 h-4 text-emerald-300" />,
//           color: "text-emerald-300",
//         },
//       ];
//     }

//     const currentRound = roundData.rounds?.[0] || roundData;
    
//     return [
//       {
//         label: "LIVE PRICE",
//         value: `${(currentRound.currentPrice || currentRound.price || 0.00024).toFixed(5)}`,
//         icon: <TrendingUp className="w-4 h-4 text-lime-400" />,
//         color: "text-lime-400",
//       },
//       {
//         label: "SOLD TOKENS",
//         value: formatNumber(currentRound.soldTokens || currentRound.tokensSold || 225765326),
//         icon: <TrendingUp className="w-4 h-4 text-white" />,
//         color: "text-white",
//       },
//       {
//         label: "LIVE MEMBERS",
//         value: formatNumber(currentRound.totalMembers || currentRound.members || 24567),
//         icon: <TrendingUp className="w-4 h-4 text-emerald-300" />,
//         color: "text-emerald-300",
//       },
//     ];
//   }, [roundData, isLoading, formatNumber]);

//   return (
//     <>
//       <section className="text-white py-10 px-4 lg:px-14 sm:py-5 relative overflow-hidden">
//         <div className="relative z-10 max-w-7xl mx-auto">
//           {/* Logo Section with lazy loading */}
//           <div className="flex justify-center mb-12">
//             <div className="relative">
//               <Suspense fallback={<div className="w-[500px] h-[200px] bg-gray-700 animate-pulse"></div>}>
//                 <img src={lazy} alt="Jaimax Logo" width="500" height="auto" loading="lazy" />
//               </Suspense>
//             </div>
//           </div>
//           <div className="text-center">
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 uppercase mb-8 leading-tight">
//               About Jaimax
//             </h2>

//             <div className="max-w-4xl mx-auto mb-12">
//               <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-6">
//                 Jaimax, the most valuable crypto investment app, is dedicated to making crypto accessible in a simple way. Established in 2024, Jaimax has addressed numerous challenges faced by the crypto community, providing solutions for crypto investing, trading, and literacy...
//               </p>
//               <button
//                 onClick={handleNavigate}
//                 className="inline-flex items-center text-teal-400 font-semibold hover:text-teal-300 transition-colors duration-200 group"
//               >
//                 <span className="border-b-2 border-teal-400 group-hover:border-teal-300 transition-colors duration-200">
//                   READ MORE
//                 </span>
//                 <TrendingUp className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
//               </button>
//             </div>

//             <ContractAddressSection 
//               contractAddress={contractAddress}
//               copied={copied}
//               handleCopy={handleCopy}
//             />
//           </div>
//         </div>
//       </section>

//       <section className="bg-[#085056] py-10 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto text-center mb-10">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-300 to-emerald-400 uppercase mb-2">
//             LIVE UPDATE
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {stats.map((stat, index) => (
//             <StatCard
//               key={index}
//               label={stat.label}
//               value={stat.value}
//               icon={stat.icon}
//               color={stat.color}
//             />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default React.memo(HomeAbout);
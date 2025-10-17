// import React, { useState, useEffect } from "react";
// import {
//   useGetAllPromotersQuery,
//   useGetEligiblePromotersQuery,
//   useGetAllBelovedPromotersQuery
// } from "./promotersApiSlice";
// import Pagination from "../../../pagination/pagination";
// import Loader from "../../../Loader/loader"
// import {
//   HiUser,
//   HiMail,
//   HiPhone,
//   HiUserGroup,
//   HiCheck,
//   HiX,
//   HiChartBar,
//   HiTrendingUp,
//   HiBadgeCheck,
//   HiUserCircle,
//   HiUsers,
//   HiSparkles,
//   HiLightningBolt,
//   HiArrowRight,
//   HiGlobe,
//   HiFilter,
// } from "react-icons/hi";
// import { motion, AnimatePresence } from "framer-motion";

// // Refined color palette
// const colors = {
//   lightMint: "#dffcf5",
//   deepTeal: "#0f766e",
//   lightTealAccent: "#64d2bd",
//   mediumTeal: "#0d9488",
//   paleGreen: "#e6fff9",
//   lightGray: "#f0f9f8",
// };

// // Animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 },
// };

// const PromoterDashboard = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showCloseModal, setShowCloseModal] = useState(false);
//   const [showClaimModal, setShowClaimModal] = useState(false);
//   const [showCongratsModal, setShowCongratsModal] = useState(false);
//   const {
//     data: badgeData,
//     isLoading: badgeLoading,
//     refetch: badgeRefetch,
//   } = useGetEligiblePromotersQuery();
//   const { data, isLoading, isError, error } = useGetAllPromotersQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//   });
//    const { data: promoters, isLoad, err } = useGetAllBelovedPromotersQuery();

//   const promoterData = data?.data;

//   useEffect(() => {
//     if (promoterData) {
//       if (promoterData.areSlotsOpen === false) setShowCloseModal(true);
//       if (
//         promoterData.isUserElegibleToPromoter &&
//         !promoterData.alreadyClimedPromoterBadge
//       )
//         setShowClaimModal(true);
//       if (promoterData.alreadyClimedPromoterBadge) setShowCongratsModal(true);
//     }
//   }, [promoterData]);

//   // Modal components
//   const Modal = ({ show, onClose, children }) => (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           {...fadeInUp}
//           className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
//             style={{
//               backgroundImage: `radial-gradient(circle at top right, ${colors.lightMint}, transparent 70%)`,
//             }}
//           >
//             {children}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={onClose}
//                 className="px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white"
//                 style={{
//                   background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   // Card component
//   const Card = ({ icon, title, children, className = "", badge = null }) => (
//     <motion.div
//       whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(15, 118, 110, 0.1)" }}
//       className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${className}`}
//     >
//       <div
//         className="p-1"
//         style={{
//           background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//         }}
//       ></div>
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center">
//             <div
//               className="p-2 rounded-lg mr-3"
//               style={{ background: colors.lightMint }}
//             >
//               {icon}
//             </div>
//             <h3
//               className="text-lg font-bold"
//               style={{ color: colors.deepTeal }}
//             >
//               {title}
//             </h3>
//           </div>
//           {badge}
//         </div>
//         {children}
//       </div>
//     </motion.div>
//   );

//   // Progress bar component
//   const ProgressBar = ({ value, max, label, color = colors.deepTeal }) => (
//     <div>
//       <div className="flex justify-between mb-2 text-sm">
//         <span>{label}</span>
//         <span className="font-medium" style={{ color }}>
//           {value}/{max}
//         </span>
//       </div>
//       <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200">
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{
//             width: `${Math.min(100, Math.round((value / max) * 100))}%`,
//           }}
//           transition={{ duration: 0.8 }}
//           className="h-full rounded-full"
//           style={{
//             background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//           }}
//         />
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return (
// <Loader/>
//     );
//   }

//   if (isError) {
//     return (
//       <motion.div
//         {...fadeInUp}
//         className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md my-6 mx-auto max-w-3xl"
//       >
//         <div className="flex items-center">
//           <div className="bg-red-100 p-2 rounded-full mr-4">
//             <HiX className="text-red-500 text-2xl" />
//           </div>
//           <div>
//             <p className="font-bold text-lg">Error Occurred</p>
//             <p className="mt-1">
//               {error?.data?.message || "Failed to load promoter information"}
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ background: colors.lightMint }}>
//       <Modal show={showCloseModal} onClose={() => setShowCloseModal(false)}>
//         <div className="text-center">
//           <motion.div
//             initial={{ rotateY: 0 }}
//             animate={{ rotateY: 360 }}
//             transition={{ duration: 1.5 }}
//             className="mx-auto rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-lg"
//             style={{
//               background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//             }}
//           >
//             <HiX className="text-white text-3xl" />
//           </motion.div>
//           <h3
//             className="text-2xl font-bold mb-3"
//             style={{ color: colors.deepTeal }}
//           >
//             Slots Closed
//           </h3>
//           <p className="text-gray-600 mb-4">
//             All promoter slots are currently closed or have been filled. Please
//             check back later for new opportunities.
//           </p>
//         </div>
//       </Modal>

//       <Modal show={showClaimModal} onClose={() => setShowClaimModal(false)}>
//         <div className="text-center">
//           <h3
//             className="text-2xl font-bold mb-3"
//             style={{ color: colors.deepTeal }}
//           >
//             You're Eligible!
//           </h3>
//           <p className="text-gray-600 mb-4">
//             Congratulations! You've met all the requirements to become a
//             promoter. Claim your badge now to unlock special benefits!
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg text-white"
//             style={{
//               background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
//             }}
//             onClick={() => badgeRefetch()} // Use the badge redeem API instead
//             disabled={badgeLoading}
//           >
//             {badgeLoading ? "Processing..." : "Claim Badge"}
//           </motion.button>
//         </div>
//       </Modal>

//       <Modal
//         show={showCongratsModal}
//         onClose={() => setShowCongratsModal(false)}
//       >
//         <div className="text-center relative z-10">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1, rotateY: [0, 360] }}
//             transition={{
//               delay: 0.2,
//               duration: 1,
//               rotateY: { duration: 2, ease: "easeInOut" },
//             }}
//             className="relative mx-auto w-32 h-32 mb-6"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 2.5,
//                 ease: "easeInOut",
//               }}
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: `radial-gradient(circle, ${colors.lightMint}, ${colors.lightTealAccent})`,
//               }}
//             ></motion.div>
//             <div
//               className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl"
//               style={{
//                 background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//               }}
//             >
//               <HiSparkles className="text-white text-5xl relative z-10" />
//             </div>
//           </motion.div>
//           <h3
//             className="text-3xl font-bold mb-3"
//             style={{ color: colors.deepTeal }}
//           >
//             Congratulations!
//           </h3>
//           <p className="text-gray-600 mb-4">
//             You have successfully claimed your promoter badge. Enjoy your
//             exclusive benefits!
//           </p>
//         </div>
//       </Modal>

//       <div className="container mx-auto px-4 py-6">
//         {/* Stats Overview Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
//           {/* User Info Card */}
//           <Card
//             icon={
//               <HiUserCircle
//                 style={{ color: colors.deepTeal }}
//                 className="text-2xl"
//               />
//             }
//             title="Your Profile"
//             badge={
//               <div
//                 className="text-xs font-medium rounded-full px-3 py-1 text-white"
//                 style={{ background: colors.deepTeal }}
//               >
//                 {promoterData?.isActive ? "Active" : "Inactive"}
//               </div>
//             }
//           >
//             <div className="space-y-4 mb-5">
//               {[
//                 {
//                   icon: <HiUser />,
//                   label: "Full Name",
//                   value: promoterData?.name,
//                 },
//                 {
//                   icon: <HiMail />,
//                   label: "Email Address",
//                   value: promoterData?.email,
//                 },
//                 {
//                   icon: <HiPhone />,
//                   label: "Phone Number",
//                   value: promoterData?.phone,
//                 },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center">
//                   <div
//                     className="w-10 flex-shrink-0"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     {item.icon}
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-xs text-gray-500">{item.label}</div>
//                     <div className="font-medium truncate">{item.value}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               className="w-full py-2 rounded-lg text-white text-sm font-medium flex items-center justify-center"
//               style={{ background: colors.deepTeal }}
//             >
//               <HiGlobe className="mr-2" /> Get Referral Link
//             </button>
//           </Card>

//           {/* Referral Stats Card */}
//           <Card
//             icon={
//               <HiUsers
//                 style={{ color: colors.deepTeal }}
//                 className="text-2xl"
//               />
//             }
//             title="Referral Stats"
//             badge={
//               <div
//                 className="text-xs font-medium px-3 py-1 rounded-full"
//                 style={{ background: colors.lightMint, color: colors.deepTeal }}
//               >
//                 <span className="font-bold">
//                   {promoterData?.directRefsCount || 0}
//                 </span>{" "}
//                 Total
//               </div>
//             }
//           >
//             <div className="grid grid-cols-2 gap-4 mb-5">
//               {[
//                 {
//                   label: "Direct Referrals",
//                   value: promoterData?.directRefsCount || 0,
//                   progress: promoterData?.directRefsProgress || 0,
//                   icon: <HiTrendingUp className="mr-1" />,
//                 },
//                 {
//                   label: "Qualified Directs",
//                   value: promoterData?.qualifiedDirects || 0,
//                   progress: promoterData?.qualifiedDirectsProgress || 0,
//                   icon: <HiCheck className="mr-1" />,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="p-4 rounded-xl"
//                   style={{ background: colors.lightMint }}
//                 >
//                   <div className="text-xs text-gray-600 mb-1">{item.label}</div>
//                   <div
//                     className="text-2xl font-bold"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     {item.value}
//                   </div>
//                   <div
//                     className="mt-2 text-xs flex items-center"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     {item.icon} {item.progress}% of goal
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <ProgressBar
//               value={promoterData?.qualifiedDirects || 0}
//               max={promoterData?.directRefsCount || 1}
//               label="Conversion Rate"
//             />
//           </Card>

//           {/* Promoter Status Card */}
//           <Card
//             icon={
//               <HiBadgeCheck
//                 style={{ color: colors.deepTeal }}
//                 className="text-2xl"
//               />
//             }
//             title="Promoter Status"
//             badge={
//               <div
//                 className={`text-xs font-medium rounded-full px-3 py-1 ${
//                   promoterData?.isUserElegibleToPromoter
//                     ? "text-green-800 bg-green-100"
//                     : "text-orange-800 bg-orange-100"
//                 }`}
//               >
//                 {promoterData?.isUserElegibleToPromoter
//                   ? "Eligible"
//                   : "In Progress"}
//               </div>
//             }
//           >
//             <div className="space-y-5 mb-5">
//               <ProgressBar
//                 value={promoterData?.directRefsCount || 0}
//                 max={55}
//                 label="Eligibility Status"
//               />

//               <ProgressBar
//                 value={promoterData?.alreadyClimedPromoterBadge ? 1 : 0}
//                 max={1}
//                 label="Badge Status"
//               />
//             </div>

//             {promoterData &&
//             !promoterData.alreadyClimedPromoterBadge &&
//             promoterData.isUserElegibleToPromoter ? (
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => setShowClaimModal(true)}
//                 className="w-full py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-white flex items-center justify-center"
//                 style={{
//                   background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
//                 }}
//               >
//                 <HiBadgeCheck className="mr-2" /> Claim Promoter Badge
//               </motion.button>
//             ) : (
//               promoterData?.alreadyClimedPromoterBadge && (
//                 <div
//                   className="flex items-center justify-center p-3 rounded-xl"
//                   style={{ background: colors.lightMint }}
//                 >
//                   <HiBadgeCheck
//                     className="mr-2 text-xl"
//                     style={{ color: colors.deepTeal }}
//                   />
//                   <span
//                     className="font-medium"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Badge Claimed Successfully
//                   </span>
//                 </div>
//               )
//             )}
//           </Card>
//         </div>

//         {/* Progress Tracking Section */}
//         <motion.div
//           {...fadeInUp}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden relative"
//         >
//           <div
//             className="p-1"
//             style={{
//               background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//             }}
//           ></div>
//           <div className="p-6">
//             <div className="flex items-center mb-6">
//               <div
//                 className="p-2 rounded-lg mr-3"
//                 style={{ background: colors.lightMint }}
//               >
//                 <HiChartBar
//                   style={{ color: colors.deepTeal }}
//                   className="text-2xl"
//                 />
//               </div>
//               <h2
//                 className="text-xl font-bold"
//                 style={{ color: colors.deepTeal }}
//               >
//                 Progress Tracking
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
//               {[
//                 {
//                   title: "Direct Referrals",
//                   target: 55,
//                   current: promoterData?.directRefsCount || 0,
//                   progress: promoterData?.directRefsProgress || 0,
//                 },
//                 {
//                   title: "Qualified Directs",
//                   target: 10,
//                   current: promoterData?.qualifiedDirects || 0,
//                   progress: promoterData?.qualifiedDirectsProgress || 0,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="rounded-xl p-5 relative overflow-hidden"
//                   style={{
//                     background: `linear-gradient(to right, ${colors.lightMint}, ${colors.paleGreen})`,
//                   }}
//                 >
//                   <div className="flex justify-between items-center mb-4">
//                     <div>
//                       <p
//                         className="font-medium mb-1"
//                         style={{ color: colors.deepTeal }}
//                       >
//                         {item.title}
//                       </p>
//                       <div className="text-sm text-gray-500 flex items-center">
//                         <HiLightningBolt
//                           className="mr-1"
//                           style={{ color: colors.deepTeal }}
//                         />
//                         Target: {item.target} {item.title}
//                       </div>
//                     </div>
//                     <div
//                       className="text-2xl font-bold"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {item.progress}%
//                     </div>
//                   </div>

//                   <div className="relative w-full h-5 bg-white rounded-full overflow-hidden shadow-inner mb-2">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${item.progress}%` }}
//                       transition={{ duration: 1 }}
//                       className="absolute top-0 left-0 h-full rounded-full"
//                       style={{
//                         background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//                       }}
//                     />
//                     <div className="absolute top-0 left-0 h-full w-full flex items-center px-3">
//                       <span className="text-xs font-medium text-white z-10">
//                         {item.current} / {item.target}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div
//               className="p-4 rounded-lg"
//               style={{ background: colors.paleGreen }}
//             >
//               <div className="flex">
//                 <div
//                   className="p-2 rounded-full mr-4 self-start"
//                   style={{ background: "rgba(15, 118, 110, 0.1)" }}
//                 >
//                   <HiLightningBolt
//                     style={{ color: colors.deepTeal }}
//                     className="text-xl"
//                   />
//                 </div>
//                 <div>
//                   <h4
//                     className="font-medium mb-1"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Next Milestone: Promoter Badge
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     You need{" "}
//                     {promoterData
//                       ? Math.max(0, 10 - promoterData.qualifiedDirects)
//                       : 10}{" "}
//                     more qualified directs. Keep sharing your referral link and
//                     guiding your referrals.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Direct Referrals Table/Cards */}
//         <motion.div
//           {...fadeInUp}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 relative"
//         >
//           <div
//             className="p-1"
//             style={{
//               background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//             }}
//           ></div>
//           <div
//             className="p-4 sm:p-5 border-b flex flex-wrap justify-between items-center gap-3"
//             style={{ borderColor: colors.lightMint }}
//           >
//             <div className="flex items-center">
//               <div
//                 className="p-2 rounded-lg mr-3"
//                 style={{ background: colors.lightMint }}
//               >
//                 <HiUserGroup
//                   style={{ color: colors.deepTeal }}
//                   className="text-2xl"
//                 />
//               </div>
//               <h2
//                 className="text-xl font-bold"
//                 style={{ color: colors.deepTeal }}
//               >
//                 Direct Referrals
//               </h2>
//               <span
//                 className="ml-2 text-sm py-0.5 px-2.5 rounded-full text-white"
//                 style={{ background: colors.deepTeal }}
//               >
//                 {promoterData?.pagination?.totalRecords || 0}
//               </span>
//             </div>

//           </div>

//           {/* Table View (Responsive) */}
//           <div className="overflow-x-auto hidden md:block">
//             <table
//               className="min-w-full divide-y"
//               style={{ borderColor: colors.lightMint }}
//             >
//               <thead style={{ background: colors.lightMint }}>
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     User
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Username
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Referrals
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Team Size
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Progress
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody
//                 className="bg-white divide-y"
//                 style={{ borderColor: colors.lightMint }}
//               >
//                 {promoterData?.directUserInfo?.map((user, index) => (
//                   <motion.tr
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     key={index}
//                     className="hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div
//                           className="flex-shrink-0 h-9 w-9 rounded-full text-white flex items-center justify-center shadow-sm overflow-hidden"
//                           style={{
//                             background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                           }}
//                         >
//                           {user.profile ? (
//                             <img
//                               src={user.profile}
//                               alt={user.name}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <span className="font-medium">
//                               {user.name.charAt(0).toUpperCase()}
//                             </span>
//                           )}
//                         </div>

//                         <div className="ml-3">
//                           <div className="text-sm font-medium text-gray-900">
//                             {user.name}
//                           </div>
//                           <div className="text-xs text-gray-500 lg:hidden">
//                             {user.username}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
//                       {user.username}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         Direct: {user.actualDirectReferrals}
//                       </div>
//                       <div
//                         className="text-xs"
//                         style={{ color: colors.deepTeal }}
//                       >
//                         Chain: {user.chainReferrals}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">
//                       <span
//                         className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full"
//                         style={{
//                           background: colors.lightMint,
//                           color: colors.deepTeal,
//                         }}
//                       >
//                         {user.actualTeam}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
//                         <div
//                           className="h-2 rounded-full"
//                           style={{
//                             width: `${parseFloat(user.progress)}%`,
//                             background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                           }}
//                         ></div>
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {user.progress}%
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           user.directUserElegibleToContribute
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {user.directUserElegibleToContribute ? (
//                           <>
//                             <HiCheck className="mr-1 text-green-600" />{" "}
//                             Contributed
//                           </>
//                         ) : (
//                           <>
//                             <HiX className="mr-1 text-gray-500" /> Not
//                             Contributed
//                           </>
//                         )}
//                       </span>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Card View */}
//           <div className="md:hidden">
//             {promoterData?.directUserInfo?.map((user, index) => (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 key={index}
//                 className="p-4 border-b"
//                 style={{ borderColor: colors.lightMint }}
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center">
//                     <div
//                       className="h-10 w-10 rounded-full text-white flex items-center justify-center"
//                       style={{
//                         background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                       }}
//                     >
//                       <span className="font-medium">{user.name.charAt(0)}</span>
//                     </div>
//                     <div className="ml-3">
//                       <div className="font-medium">{user.name}</div>
//                       <div className="text-xs text-gray-500">
//                         {user.username}
//                       </div>
//                     </div>
//                   </div>
//                   <span
//                     className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       user.directUserElegibleToContribute
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {user.directUserElegibleToContribute
//                       ? "Active"
//                       : "Inactive"}
//                   </span>
//                 </div>

//                 <div
//                   className="grid grid-cols-2 gap-3 mb-3 p-3 rounded-lg"
//                   style={{ background: colors.lightMint }}
//                 >
//                   <div>
//                     <div className="text-xs text-gray-600">Direct</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.actualDirectReferrals}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">Chain</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.chainReferrals}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">Team Size</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.actualTeam}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">Progress</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.progress}%
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
//                   <div
//                     className="h-2 rounded-full"
//                     style={{
//                       width: `${parseFloat(user.progress)}%`,
//                       background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                     }}
//                   ></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {(!promoterData?.directUserInfo ||
//             promoterData.directUserInfo.length === 0) && (
//             <div className="flex flex-col items-center justify-center py-12">
//               <div
//                 className="rounded-full w-16 h-16 flex items-center justify-center mb-4"
//                 style={{ background: colors.lightMint }}
//               >
//                 <HiUsers
//                   className="text-2xl"
//                   style={{ color: colors.deepTeal }}
//                 />
//               </div>
//               <h3
//                 className="text-lg font-semibold mb-2"
//                 style={{ color: colors.deepTeal }}
//               >
//                 No Referrals Found
//               </h3>
//               <p className="text-gray-500 text-center max-w-md text-sm">
//                 Share your referral link to start building your network.
//               </p>
//             </div>
//           )}

//           {/* Pagination Controls */}
//           {promoterData?.pagination &&
//             promoterData.directUserInfo?.length > 0 && (
//               <div
//                 className="px-4 py-3 border-t flex justify-center items-center"
//                 style={{
//                   borderColor: colors.lightMint,
//                   background: colors.lightMint,
//                 }}
//               >
//                 <Pagination
//                   currentPage={promoterData.pagination.currentPage}
//                   totalPages={promoterData.pagination.totalPages}
//                   onPageChange={(page) => setCurrentPage(page)}
//                 />
//               </div>
//             )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PromoterDashboard;

// import React, { useState, useEffect } from "react";
// import {
//   useGetAllPromotersQuery,
//   useGetEligiblePromotersQuery,
//   useGetAllBelovedPromotersQuery
// } from "./promotersApiSlice";
// import Pagination from "../../../pagination/pagination";
// import Loader from "../../../Loader/loader";
// import {
//   HiUser, HiMail, HiPhone, HiUserGroup, HiCheck, HiX,
//   HiChartBar, HiTrendingUp, HiBadgeCheck, HiUserCircle,
//   HiUsers, HiSparkles, HiLightningBolt, HiArrowRight,
//   HiFilter, HiOutlineHeart, HiOutlineStar, HiGift
// } from "react-icons/hi";
// import { motion, AnimatePresence } from "framer-motion";

// // Enhanced color palette
// const colors = {
//   lightMint: "#dffcf5",
//   deepTeal: "#0f766e",
//   lightTealAccent: "#64d2bd",
//   mediumTeal: "#0d9488",
//   paleGreen: "#e6fff9",
//   lightGray: "#f0f9f8",
//   gold: "#fbbf24",
//   rose: "#fb7185",
//   purple: "#8b5cf6",
//   royalBlue: "#3b82f6"
// };

// // Animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 },
// };

// const PromoterDashboard = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showCloseModal, setShowCloseModal] = useState(false);
//   const [showClaimModal, setShowClaimModal] = useState(false);
//   const [showCongratsModal, setShowCongratsModal] = useState(false);
//   const [showBelovedModal, setShowBelovedModal] = useState(false);

//   const {
//     data: badgeData,
//     isLoading: badgeLoading,
//     refetch: badgeRefetch,
//   } = useGetEligiblePromotersQuery();

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     refetch: refetchPromoters
//   } = useGetAllPromotersQuery({
//     page: currentPage,
//     limit: itemsPerPage,
//   });

//   const {
//     data: belovedData,
//     isLoading: belovedLoading
//   } = useGetAllBelovedPromotersQuery();

//   const promoterData = data?.data;
//   const belovedPromoters = belovedData?.data?.promoters || [];

//   // Refetch function that chains both API calls
//   const handleBadgeRefetch = async () => {
//     try {
//       await badgeRefetch();
//       refetchPromoters();
//     } catch (error) {
//       console.error("Error refetching data:", error);
//     }
//   };

//   useEffect(() => {
//     if (promoterData) {
//       if (promoterData.areSlotsOpen === false) setShowCloseModal(true);
//       if (
//         promoterData.isUserElegibleToPromoter &&
//         !promoterData.alreadyClimedPromoterBadge
//       )
//         setShowClaimModal(true);
//       if (promoterData.alreadyClimedPromoterBadge) setShowCongratsModal(true);
//     }
//   }, [promoterData]);

//   // Modal component
//   const Modal = ({ show, onClose, children }) => (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           {...fadeInUp}
//           className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl m-4"
//             style={{
//               backgroundImage: `radial-gradient(circle at top right, ${colors.lightMint}, transparent 70%)`,
//             }}
//           >
//             {children}
//             <div className="mt-5 flex justify-center">
//               <button
//                 onClick={onClose}
//                 className="px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white"
//                 style={{
//                   background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );

//   // Card component with enhanced styling
//   const Card = ({ icon, title, children, className = "", badge = null }) => (
//     <motion.div
//       whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(15, 118, 110, 0.1)" }}
//       className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${className} h-full`}
//     >
//       <div
//         className="p-1"
//         style={{
//           background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//         }}
//       ></div>
//       <div className="p-5 flex flex-col h-[calc(100%-4px)]">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <div
//               className="p-2 rounded-lg mr-3 shadow-sm"
//               style={{ background: colors.lightMint }}
//             >
//               {icon}
//             </div>
//             <h3
//               className="text-lg font-bold"
//               style={{ color: colors.deepTeal }}
//             >
//               {title}
//             </h3>
//           </div>
//           {badge}
//         </div>
//         <div className="flex-grow">{children}</div>
//       </div>
//     </motion.div>
//   );

//   // Progress bar component
//   const ProgressBar = ({ value, max, label, color = colors.deepTeal }) => (
//     <div>
//       <div className="flex justify-between mb-1 text-sm">
//         <span>{label}</span>
//         <span className="font-medium" style={{ color }}>
//           {value}/{max}
//         </span>
//       </div>
//       <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200">
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{
//             width: `${Math.min(100, Math.round((value / max) * 100))}%`,
//           }}
//           transition={{ duration: 0.8 }}
//           className="h-full rounded-full"
//           style={{
//             background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//           }}
//         />
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (isError) {
//     return (
//       <motion.div
//         {...fadeInUp}
//         className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md my-6 mx-auto max-w-3xl"
//       >
//         <div className="flex items-center">
//           <div className="bg-red-100 p-2 rounded-full mr-4">
//             <HiX className="text-red-500 text-2xl" />
//           </div>
//           <div>
//             <p className="font-bold text-lg">Error Occurred</p>
//             <p className="mt-1">
//               {error?.data?.message || "Failed to load promoter information"}
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="min-h-screen" style={{ background: colors.lightMint }}>
//       {/* Modals */}
//       <Modal show={showCloseModal} onClose={() => setShowCloseModal(false)}>
//         <div className="text-center">
//           <motion.div
//             initial={{ rotateY: 0 }}
//             animate={{ rotateY: 360 }}
//             transition={{ duration: 1.5 }}
//             className="mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-5 shadow-lg"
//             style={{
//               background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//             }}
//           >
//             <HiX className="text-white text-3xl" />
//           </motion.div>
//           <h3
//             className="text-xl font-bold mb-3"
//             style={{ color: colors.deepTeal }}
//           >
//             Slots Closed
//           </h3>
//           <p className="text-gray-600 mb-2 text-sm">
//             All promoter slots are currently closed or have been filled. Please
//             check back later for new opportunities.
//           </p>
//         </div>
//       </Modal>

//       <Modal show={showClaimModal} onClose={() => setShowClaimModal(false)}>
//         <div className="text-center">
//           <h3
//             className="text-xl font-bold mb-3"
//             style={{ color: colors.deepTeal }}
//           >
//             You're Eligible!
//           </h3>
//           <p className="text-gray-600 mb-4 text-sm">
//             Congratulations! You've met all the requirements to become a
//             promoter. Claim your badge now to unlock special benefits!
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg text-white"
//             style={{
//               background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
//             }}
//             onClick={handleBadgeRefetch}
//             disabled={badgeLoading}
//           >
//             {badgeLoading ? "Processing..." : "Claim Badge"}
//           </motion.button>
//         </div>
//       </Modal>

//       <Modal show={showCongratsModal} onClose={() => setShowCongratsModal(false)}>
//         <div className="text-center relative z-10">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1, rotateY: [0, 360] }}
//             transition={{
//               delay: 0.2,
//               duration: 1,
//               rotateY: { duration: 2, ease: "easeInOut" },
//             }}
//             className="relative mx-auto w-24 h-24 mb-5"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 2.5,
//                 ease: "easeInOut",
//               }}
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: `radial-gradient(circle, ${colors.lightMint}, ${colors.lightTealAccent})`,
//               }}
//             ></motion.div>
//             <div
//               className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl"
//               style={{
//                 background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//               }}
//             >
//               <HiSparkles className="text-white text-4xl relative z-10" />
//             </div>
//           </motion.div>
//           <h3
//             className="text-xl font-bold mb-2"
//             style={{ color: colors.deepTeal }}
//           >
//             Congratulations!
//           </h3>
//           <p className="text-gray-600 mb-2 text-sm">
//             You have successfully claimed your promoter badge. Enjoy your
//             exclusive benefits!
//           </p>
//         </div>
//       </Modal>

//       <Modal show={showBelovedModal} onClose={() => setShowBelovedModal(false)}>
//         <div className="text-center">
//           <div className="flex items-center justify-center mb-4">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{
//                 scale: [1, 1.1, 1],
//                 rotate: [0, 5, 0, -5, 0]
//               }}
//               transition={{
//                 scale: { repeat: Infinity, duration: 2 },
//                 rotate: { repeat: Infinity, duration: 5 }
//               }}
//               className="w-10 h-10 mr-2"
//             >
//               <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-pink-600 text-white">
//                 <HiOutlineHeart className="w-6 h-6" />
//               </div>
//             </motion.div>
//             <h3
//               className="text-xl font-bold"
//               style={{ color: colors.deepTeal }}
//             >
//               Beloved Promoters
//             </h3>
//           </div>

//           {belovedLoading ? (
//             <div className="py-8">
//               <Loader />
//             </div>
//           ) : (
//             <div className="max-h-80 overflow-y-auto pr-2">
//               {belovedPromoters.length > 0 ? (
//                 belovedPromoters.map((promoter, index) => (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     key={promoter._id}
//                     className="mb-3 relative"
//                   >
//                     <div
//                       className="bg-white rounded-xl p-4 shadow-sm flex items-center relative overflow-hidden"
//                       style={{
//                         background: `linear-gradient(135deg, white, ${colors.lightMint} 120%)`,
//                       }}
//                     >
//                       <div
//                         className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-10"
//                         style={{ background: `radial-gradient(circle, ${colors.rose}, transparent 70%)` }}
//                       />
//                       <div className="flex-shrink-0 mr-3">
//                         <div className="relative">
//                           <div
//                             className="w-12 h-12 rounded-full overflow-hidden border-2 shadow-sm"
//                             style={{borderColor: colors.rose}}
//                           >
//                             {promoter.profile ? (
//                               <img
//                                 src={promoter.profile}
//                                 alt={promoter.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div
//                                 className="w-full h-full flex items-center justify-center text-white font-bold"
//                                 style={{background: colors.deepTeal}}
//                               >
//                                 {promoter.name.charAt(0)}
//                               </div>
//                             )}
//                           </div>
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                             className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md"
//                           >
//                             <HiOutlineStar className="text-yellow-500 w-3 h-3" />
//                           </motion.div>
//                         </div>
//                       </div>
//                       <div className="flex-1 overflow-hidden">
//                         <div className="flex justify-between">
//                           <h4 className="font-semibold text-sm truncate">{promoter.name}</h4>
//                           <motion.div
//                             whileHover={{ scale: 1.2, rotate: 5 }}
//                             className="flex-shrink-0 ml-2"
//                           >
//                             <div className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-medium flex items-center">
//                               <HiGift className="mr-1 text-white" size={10} />
//                               <span>VIP</span>
//                             </div>
//                           </motion.div>
//                         </div>
//                         <div className="mt-0.5 flex flex-col text-xs text-gray-500 truncate">
//                           <div className="flex items-center">
//                             <HiMail className="mr-1 flex-shrink-0 opacity-70" size={12} />
//                             <span className="truncate">{promoter.email}</span>
//                           </div>
//                           <div className="flex items-center">
//                             <HiUser className="mr-1 flex-shrink-0 opacity-70" size={12} />
//                             <span className="truncate">{promoter.username}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))
//               ) : (
//                 <div className="py-8 text-center">
//                   <p className="text-gray-500">No beloved promoters found</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </Modal>

//       <div className="container mx-auto px-3 py-4">
//         <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
//           <h1 className="text-xl font-bold" style={{ color: colors.deepTeal }}>Promoter Dashboard</h1>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowBelovedModal(true)}
//             className="flex items-center px-4 py-2 rounded-full text-white text-sm font-medium shadow-md"
//             style={{
//               background: `linear-gradient(to right, ${colors.rose}, ${colors.purple})`,
//             }}
//           >
//             <HiOutlineHeart className="mr-1" /> Beloved Promoters
//           </motion.button>
//         </div>

//         {/* Stats Overview Section - 3 cards in a responsive grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
//           {/* User Info Card */}
//           <Card
//             icon={
//               <HiUserCircle
//                 style={{ color: colors.deepTeal }}
//                 className="text-xl"
//               />
//             }
//             title="Your Profile"
//             badge={
//               <div
//                 className="text-xs font-medium rounded-full px-3 py-1 text-white shadow-sm"
//                 style={{ background: colors.deepTeal }}
//               >
//                 {promoterData?.isActive ? "Active" : "Inactive"}
//               </div>
//             }
//           >
//             <div className="space-y-3 mb-4">
//               {[
//                 {
//                   icon: <HiUser />,
//                   label: "Full Name",
//                   value: promoterData?.name,
//                 },
//                 {
//                   icon: <HiMail />,
//                   label: "Email",
//                   value: promoterData?.email,
//                 },
//                 {
//                   icon: <HiPhone />,
//                   label: "Phone",
//                   value: promoterData?.phone,
//                 },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center">
//                   <div
//                     className="w-8 flex-shrink-0"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     {item.icon}
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-xs text-gray-500">{item.label}</div>
//                     <div className="font-medium truncate text-sm">{item.value}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Referral Stats Card */}
//           <Card
//             icon={
//               <HiUsers
//                 style={{ color: colors.deepTeal }}
//                 className="text-xl"
//               />
//             }
//             title="Referral Stats"
//             badge={
//               <div
//                 className="text-xs font-medium px-3 py-1 rounded-full shadow-sm"
//                 style={{ background: colors.lightMint, color: colors.deepTeal }}
//               >
//                 <span className="font-bold">
//                   {promoterData?.directRefsCount || 0}
//                 </span>{" "}
//                 Total
//               </div>
//             }
//           >
//             <div className="grid grid-cols-2 gap-3 mb-4">
//               {[
//                 {
//                   label: "Direct Referrals",
//                   value: promoterData?.directRefsCount || 0,
//                   progress: promoterData?.directRefsProgress || 0,
//                   icon: <HiTrendingUp className="mr-1" />,
//                 },
//                 {
//                   label: "Qualified Directs",
//                   value: promoterData?.qualifiedDirects || 0,
//                   progress: promoterData?.qualifiedDirectsProgress || 0,
//                   icon: <HiCheck className="mr-1" />,
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="p-3 rounded-lg"
//                   style={{ background: colors.lightMint }}
//                 >
//                   <div className="text-xs text-gray-600 mb-1">{item.label}</div>
//                   <div
//                     className="text-xl font-bold"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     {item.value}
//                   </div>
//                   <div
//                     className="mt-1 text-xs flex items-center"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     {item.icon} {item.progress}% of goal
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>

//           {/* Promoter Status Card */}
//           <Card
//             icon={
//               <HiBadgeCheck
//                 style={{ color: colors.deepTeal }}
//                 className="text-xl"
//               />
//             }
//             title="Promoter Status"
//             badge={
//               <div
//                 className={`text-xs font-medium rounded-full px-3 py-1 shadow-sm ${
//                   promoterData?.isUserElegibleToPromoter
//                     ? "text-green-800 bg-green-100"
//                     : "text-orange-800 bg-orange-100"
//                 }`}
//               >
//                 {promoterData?.isUserElegibleToPromoter
//                   ? "Eligible"
//                   : "In Progress"}
//               </div>
//             }
//           >
//             <div className="space-y-4 mb-4">
//               <ProgressBar
//                 value={promoterData?.directRefsCount || 0}
//                 max={55}
//                 label="Eligibility Status"
//               />

//               <ProgressBar
//                 value={promoterData?.alreadyClimedPromoterBadge ? 1 : 0}
//                 max={1}
//                 label="Badge Status"
//               />
//             </div>

//             {promoterData &&
//             !promoterData.alreadyClimedPromoterBadge &&
//             promoterData.isUserElegibleToPromoter ? (
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => setShowClaimModal(true)}
//                 className="w-full py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all text-white flex items-center justify-center"
//                 style={{
//                   background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
//                 }}
//               >
//                 <HiBadgeCheck className="mr-2" /> Claim Promoter Badge
//               </motion.button>
//             ) : null}
//           </Card>
//         </div>

//         {/* Progress Tracking Section */}
//         <motion.div
//           {...fadeInUp}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-lg mb-5 overflow-hidden relative"
//         >
//           <div
//             className="p-1"
//             style={{
//               background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//             }}
//           ></div>
//           <div className="p-4">
//             <div className="flex items-center mb-4">
//               <div
//                 className="p-2 rounded-lg mr-3 shadow-sm"
//                 style={{ background: colors.lightMint }}
//               >
//                 <HiChartBar
//                   style={{ color: colors.deepTeal }}
//                   className="text-xl"
//                 />
//               </div>
//               <h2
//                 className="text-lg font-bold"
//                 style={{ color: colors.deepTeal }}
//               >
//                 Progress Tracking
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {[
//                 {
//                   title: "Direct Referrals",
//                   target: 55,
//                   current: promoterData?.directRefsCount || 0,
//                   progress: promoterData?.directRefsProgress || 0,
//                 },
//                 {
//                   title: "Qualified Directs",
//                   target: 10,
//                   current: promoterData?.qualifiedDirects || 0,
//                   progress: promoterData?.qualifiedDirectsProgress || 0,
//                 },
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(15, 118, 110, 0.1)" }}
//                   className="rounded-xl p-4 relative overflow-hidden shadow-sm"
//                   style={{
//                     background: `linear-gradient(to right, ${colors.lightMint}, ${colors.paleGreen})`,
//                   }}
//                 >
//                   <div className="flex justify-between items-center mb-3">
//                     <div>
//                       <p
//                         className="font-medium mb-1 text-sm"
//                         style={{ color: colors.deepTeal }}
//                       >
//                         {item.title}
//                       </p>
//                       <div className="text-xs text-gray-500 flex items-center">
//                         <HiLightningBolt
//                           className="mr-1"
//                           style={{ color: colors.deepTeal }}
//                         />
//                         Target: {item.target}
//                       </div>
//                     </div>
//                     <div
//                       className="text-xl font-bold"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {item.progress}%
//                     </div>
//                   </div>

//                   <div className="relative w-full h-4 bg-white rounded-full overflow-hidden shadow-inner mb-2">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${item.progress}%` }}
//                       transition={{ duration: 1 }}
//                       className="absolute top-0 left-0 h-full rounded-full"
//                       style={{
//                         background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//                       }}
//                     />
//                     <div className="absolute top-0 left-0 h-full w-full flex items-center px-3">
//                       <span className="text-xs font-medium text-white z-10">
//                         {item.current} / {item.target}
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.div
//               whileHover={{ y: -2 }}
//               className="p-3 rounded-lg shadow-sm"
//               style={{ background: colors.paleGreen }}
//             >
//               <div className="flex">
//                 <div
//                   className="p-2 rounded-full mr-3 self-start"
//                   style={{ background: "rgba(15, 118, 110, 0.1)" }}
//                 >
//                   <HiLightningBolt
//                     style={{ color: colors.deepTeal }}
//                     className="text-lg"
//                   />
//                 </div>
//                 <div>
//                   <h4
//                     className="font-medium mb-1 text-sm"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Next Milestone: Promoter Badge
//                   </h4>
//                   <p className="text-xs text-gray-600">
//                     You need{" "}
//                     {promoterData
//                       ? Math.max(0, 10 - promoterData.qualifiedDirects)
//                       : 10}{" "}
//                     more qualified directs. Keep sharing your referral link!
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Direct Referrals Table/Cards */}
//         <motion.div
//           {...fadeInUp}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5 relative"
//         >
//           <div
//             className="p-1"
//             style={{
//               background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
//             }}
//           ></div>
//           <div
//             className="p-4 border-b flex flex-wrap justify-between items-center gap-2"
//             style={{ borderColor: colors.lightMint }}
//           >
//             <div className="flex items-center">
//               <div
//                 className="p-2 rounded-lg mr-2 shadow-sm"
//                 style={{ background: colors.lightMint }}
//               >
//                 <HiUserGroup
//                   style={{ color: colors.deepTeal }}
//                   className="text-lg"
//                 />
//               </div>
//               <h2
//                 className="text-lg font-bold"
//                 style={{ color: colors.deepTeal }}
//               >
//                 Direct Referrals
//               </h2>
//               <span
//                 className="ml-2 text-xs py-0.5 px-2 rounded-full text-white shadow-sm"
//                 style={{ background: colors.deepTeal }}
//               >
//                 {promoterData?.pagination?.totalRecords || 0}
//               </span>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-xs rounded-lg py-1.5 px-3 text-white flex items-center shadow-sm"
//                 style={{ background: colors.deepTeal }}
//               >
//                 <HiFilter className="mr-1" /> Filter
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-xs rounded-lg py-1.5 px-3 text-white flex items-center shadow-sm"
//                 style={{ background: colors.deepTeal }}
//               >
//                 <HiArrowRight className="mr-1" /> Export
//               </motion.button>
//             </div>
//           </div>

//           {/* Table View (Responsive) */}
//           <div className="overflow-x-auto hidden md:block">
//             <table
//               className="min-w-full divide-y"
//               style={{ borderColor: colors.lightMint }}
//             >
//               <thead style={{ background: colors.lightMint }}>
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     User
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Username
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Referrals
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Team Size
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Progress
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
//                     style={{ color: colors.deepTeal }}
//                   >
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody
//                 className="bg-white divide-y"
//                 style={{ borderColor: colors.lightMint }}
//               >
//                 {promoterData?.directUserInfo?.map((user, index) => (
//                   <motion.tr
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     key={index}
//                     className="hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <td className="px-4 py-2 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div
//                           className="flex-shrink-0 h-8 w-8 rounded-full text-white flex items-center justify-center shadow-sm overflow-hidden"
//                           style={{
//                             background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                           }}
//                         >
//                           {user.profile ? (
//                             <img
//                               src={user.profile}
//                               alt={user.name}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <span className="font-medium">
//                               {user.name.charAt(0).toUpperCase()}
//                             </span>
//                           )}
//                         </div>

//                         <div className="ml-3">
//                           <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
//                             {user.name}
//                           </div>
//                           <div className="text-xs text-gray-500 lg:hidden">
//                             {user.username}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
//                       {user.username}
//                     </td>
//                     <td className="px-4 py-2 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         Direct: {user.actualDirectReferrals}
//                       </div>
//                       <div
//                         className="text-xs"
//                         style={{ color: colors.deepTeal }}
//                       >
//                         Chain: {user.chainReferrals}
//                       </div>
//                     </td>
//                     <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
//                       <span
//                         className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full"
//                         style={{
//                           background: colors.lightMint,
//                           color: colors.deepTeal,
//                         }}
//                       >
//                         {user.actualTeam}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2 whitespace-nowrap">
//                       <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${parseFloat(user.progress)}%` }}
//                           transition={{ duration: 0.8 }}
//                           className="h-2 rounded-full"
//                           style={{
//                             background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                           }}
//                         ></motion.div>
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {user.progress}%
//                       </div>
//                     </td>
//                     <td className="px-4 py-2 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           user.directUserElegibleToContribute
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {user.directUserElegibleToContribute ? (
//                           <>
//                             <HiCheck className="mr-1 text-green-600" />{" "}
//                             Contributed
//                           </>
//                         ) : (
//                           <>
//                             <HiX className="mr-1 text-gray-500" /> Not
//                             Contributed
//                           </>
//                         )}
//                       </span>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Card View */}
//           <div className="md:hidden">
//             {promoterData?.directUserInfo?.map((user, index) => (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 key={index}
//                 className="p-3 border-b"
//                 style={{ borderColor: colors.lightMint }}
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center">
//                     <div
//                       className="h-9 w-9 rounded-full text-white flex items-center justify-center shadow-sm"
//                       style={{
//                         background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                       }}
//                     >
//                       {user.profile ? (
//                         <img
//                           src={user.profile}
//                           alt={user.name}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <span className="font-medium">{user.name.charAt(0).toUpperCase()}</span>
//                       )}
//                     </div>
//                     <div className="ml-2">
//                       <div className="font-medium text-sm truncate max-w-[180px]">{user.name}</div>
//                       <div className="text-xs text-gray-500 truncate max-w-[180px]">
//                         {user.username}
//                       </div>
//                     </div>
//                   </div>
//                   <span
//                     className={`px-2 py-0.5 text-xs font-semibold rounded-full shadow-sm ${
//                       user.directUserElegibleToContribute
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {user.directUserElegibleToContribute
//                       ? "Active"
//                       : "Inactive"}
//                   </span>
//                 </div>

//                 <div
//                   className="grid grid-cols-2 gap-2 mb-2 p-2 rounded-lg shadow-sm"
//                   style={{ background: colors.lightMint }}
//                 >
//                   <div>
//                     <div className="text-xs text-gray-600">Direct</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.actualDirectReferrals}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">Chain</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.chainReferrals}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">Team Size</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.actualTeam}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">Progress</div>
//                     <div
//                       className="font-medium"
//                       style={{ color: colors.deepTeal }}
//                     >
//                       {user.progress}%
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${parseFloat(user.progress)}%` }}
//                     transition={{ duration: 0.8 }}
//                     className="h-2 rounded-full"
//                     style={{
//                       background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
//                     }}
//                   ></motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {(!promoterData?.directUserInfo ||
//             promoterData.directUserInfo.length === 0) && (
//             <div className="flex flex-col items-center justify-center py-10">
//               <div
//                 className="rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow-md"
//                 style={{ background: colors.lightMint }}
//               >
//                 <HiUsers
//                   className="text-xl"
//                   style={{ color: colors.deepTeal }}
//                 />
//               </div>
//               <h3
//                 className="text-lg font-semibold mb-1"
//                 style={{ color: colors.deepTeal }}
//               >
//                 No Referrals Found
//               </h3>
//               <p className="text-gray-500 text-center max-w-md text-sm">
//                 Share your referral link to start building your network.
//               </p>
//             </div>
//           )}

//           {/* Pagination Controls */}
//           {promoterData?.pagination &&
//             promoterData.directUserInfo?.length > 0 && (
//               <div
//                 className="px-4 py-3 border-t flex justify-center items-center"
//                 style={{
//                   borderColor: colors.lightMint,
//                   background: colors.lightMint,
//                 }}
//               >
//                 <Pagination
//                   currentPage={promoterData.pagination.currentPage}
//                   totalPages={promoterData.pagination.totalPages}
//                   onPageChange={(page) => setCurrentPage(page)}
//                 />
//               </div>
//             )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PromoterDashboard;

import React, { useState, useEffect } from "react";
import {
  useGetAllPromotersQuery,
  useRedeemPromoterBadgeMutation,
  useGetAllBelovedPromotersQuery,
} from "./promotersApiSlice";
import Pagination from "../../../pagination/pagination";
import Loader from "../../../Loader/loader";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiUserGroup,
  HiCheck,
  HiX,
  HiChartBar,
  HiTrendingUp,
  HiBadgeCheck,
  HiUserCircle,
  HiUsers,
  HiSparkles,
  HiLightningBolt,
  HiArrowRight,
  HiFilter,
  HiOutlineHeart,
  HiOutlineStar,
  HiGift,
  HiClock,
  HiShieldCheck,
  HiExternalLink,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const colors = {
  lightMint: "#dffcf5",
  deepTeal: "#0f766e",
  lightTealAccent: "#64d2bd",
  mediumTeal: "#0d9488",
  paleGreen: "#e6fff9",
  lightGray: "#f0f9f8",
  gold: "#0f766e",
  rose: "#64d2bd",
  purple: "#0d9488",
  royalBlue: "#64d2bd",
  amber: "#0f766e",
  indigo: "#0d9488",
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PromoterDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showBelovedModal, setShowBelovedModal] = useState(false);

const [redeemPromoterBadge, {
  data: badgeData,
  isLoading: badgeLoading
}] = useRedeemPromoterBadgeMutation();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchPromoters,
  } = useGetAllPromotersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const { data: belovedData, isLoading: belovedLoading } =
    useGetAllBelovedPromotersQuery();

  const promoterData = data?.data;
  const belovedPromoters = belovedData?.data?.promoters || [];

const handleBadgeRefetch = async () => {
  try {
    await redeemPromoterBadge().unwrap();
    refetchPromoters();
  } catch (error) {
    console.error("Error redeeming badge:", error);
  }
};

  useEffect(() => {
    if (promoterData) {
      if (promoterData.areSlotsOpen === false) setShowCloseModal(true);
      if (
        promoterData.isUserElegibleToPromoter &&
        !promoterData.alreadyClimedPromoterBadge
      )
        setShowClaimModal(true);
      if (promoterData.alreadyClimedPromoterBadge) setShowCongratsModal(true);
    }
  }, [promoterData]);

  // Modal component
  const Modal = ({ show, onClose, children, className = "" }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          {...fadeInUp}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl m-4 ${className}`}
            style={{
              backgroundImage: `radial-gradient(circle at top right, ${colors.lightMint}, transparent 70%)`,
            }}
          >
            {children}
            <div className="mt-5 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-white"
                style={{
                  background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Card component with enhanced styling
  const Card = ({ icon, title, children, className = "", badge = null }) => (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(15, 118, 110, 0.1)" }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${className} h-full`}
    >
      <div
        className="p-1"
        style={{
          background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
        }}
      ></div>
      <div className="p-5 flex flex-col h-[calc(100%-4px)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className="p-2 rounded-lg mr-3 shadow-sm"
              style={{ background: colors.lightMint }}
            >
              {icon}
            </div>
            <h3
              className="text-lg font-bold"
              style={{ color: colors.deepTeal }}
            >
              {title}
            </h3>
          </div>
          {badge}
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </motion.div>
  );

  // Progress bar component
  const ProgressBar = ({ value, max, label, color = colors.deepTeal }) => (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span className="font-medium" style={{ color }}>
          {value}/{max}
        </span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden bg-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(100, Math.round((value / max) * 100))}%`,
          }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
          }}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <motion.div
        {...fadeInUp}
        className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md my-6 mx-auto max-w-3xl"
      >
        <div className="flex items-center">
          <div className="bg-red-100 p-2 rounded-full mr-4">
            <HiX className="text-red-500 text-2xl" />
          </div>
          <div>
            <p className="font-bold text-lg">Error Occurred</p>
            <p className="mt-1">
              {error?.data?.message || "Failed to load promoter information"}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: colors.lightMint }}>
      {/* Modals */}
      <Modal show={showCloseModal} onClose={() => setShowCloseModal(false)}>
        <div className="text-center">
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 1.5 }}
            className="mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-5 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
            }}
          >
            <HiX className="text-white text-3xl" />
          </motion.div>
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: colors.deepTeal }}
          >
            Slots Closed
          </h3>
          <p className="text-gray-600 mb-2 text-sm">
            All promoter slots are currently closed or have been filled. Please
            check back later for new opportunities.
          </p>
        </div>
      </Modal>

      <Modal show={showClaimModal} onClose={() => setShowClaimModal(false)}>
        <div className="text-center">
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: colors.deepTeal }}
          >
            You're Eligible!
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Congratulations! You've met all the requirements to become a
            promoter. Claim your badge now to unlock special benefits!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg text-white"
            style={{
              background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
            }}
            onClick={handleBadgeRefetch}
            disabled={badgeLoading}
          >
            {badgeLoading ? "Processing..." : "Claim Badge"}
          </motion.button>
        </div>
      </Modal>

      <Modal
        show={showCongratsModal}
        onClose={() => setShowCongratsModal(false)}
      >
        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotateY: [0, 360] }}
            transition={{
              delay: 0.2,
              duration: 1,
              rotateY: { duration: 2, ease: "easeInOut" },
            }}
            className="relative mx-auto w-24 h-24 mb-5"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors.lightMint}, ${colors.lightTealAccent})`,
              }}
            ></motion.div>
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
              }}
            >
              <HiSparkles className="text-white text-4xl relative z-10" />
            </div>
          </motion.div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: colors.deepTeal }}
          >
            Congratulations!
          </h3>
          <p className="text-gray-600 mb-2 text-sm">
            You have successfully claimed your promoter badge. Enjoy your
            exclusive benefits!
          </p>
        </div>
      </Modal>

      {/* Redesigned Beloved Promoters Modal */}
      <Modal
        show={showBelovedModal}
        onClose={() => setShowBelovedModal(false)}
        className="max-w-xl"
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `linear-gradient(45deg, ${colors.deepTeal} 25%, transparent 25%, transparent 75%, ${colors.deepTeal} 75%, ${colors.deepTeal}), 
                            linear-gradient(45deg, ${colors.deepTeal} 25%, transparent 25%, transparent 75%, ${colors.deepTeal} 75%, ${colors.deepTeal})`,
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 15px 15px",
              }}
            />
          </div>
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-xl font-bold tracking-tight"
                style={{ color: colors.deepTeal }}
              >
                Beloved Promoters
              </h2>

              
            </div>

            <div className="mt-1 text-sm text-gray-500">
              Elite community members with exceptional performance
            </div>
          </div>

          {belovedLoading ? (
            <div className="py-8 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="max-h-[360px] overflow-y-auto pr-1 m-2">
              {belovedPromoters.length > 0 ? (
                <div className="space-y-3 m-2">
                  {belovedPromoters.map((promoter, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={promoter._id}
                      className="group relative"
                    >
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: `linear-gradient(to right, ${colors.lightMint}20, ${colors.paleGreen}30)`,
                        }}
                      ></div>

                      <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-white p-1 m-2">
                        <div className="flex items-start p-2">
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-16 rounded overflow-hidden shadow-sm">
                              {promoter.profile ? (
                                <img
                                  src={promoter.profile}
                                  alt={promoter.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div
                                  className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
                                  style={{ background: colors.deepTeal }}
                                >
                                  {promoter.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>

                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: colors.deepTeal }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0 pl-3">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900 truncate pr-2">
                                {promoter.name}
                              </h4>

                              <div
                                className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  color: colors.deepTeal,
                                  background: colors.lightMint,
                                }}
                              >
                                Promoter
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center text-xs text-gray-500">
                                <HiUser
                                  className="mr-1 flex-shrink-0"
                                  style={{ color: colors.deepTeal }}
                                />
                                <span className="truncate">
                                  @{promoter.username}
                                </span>
                              </div>

                              <div className="flex items-center text-xs text-gray-500">
                                <HiMail
                                  className="mr-1 flex-shrink-0"
                                  style={{ color: colors.deepTeal }}
                                />
                                <span className="truncate">
                                  {promoter.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          className="h-1 w-full origin-left"
                          style={{
                            background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-lg shadow-sm mb-4 flex items-center justify-center"
                    style={{ background: colors.lightMint }}
                  >
                    <HiUsers
                      className="text-3xl"
                      style={{ color: colors.deepTeal }}
                    />
                  </div>
                  <p className="text-gray-500 font-medium text-center">
                    No beloved promoters found
                  </p>
                  <p className="text-gray-400 text-sm mt-1 text-center">
                    We're waiting for exceptional members to join
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      <div className="container mx-auto  px-3 py-4">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h1 className="text-xl font-bold" style={{ color: colors.deepTeal }}>
            Promoter Dashboard
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBelovedModal(true)}
            className="flex items-center px-4 py-2 rounded-full text-white text-sm font-medium shadow-md"
            style={{
              background: `linear-gradient(to right, ${colors.rose}, ${colors.purple})`,
            }}
          >
            Beloved Promoters
          </motion.button>
        </div>

        {/* Stats Overview Section - 3 cards in a responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          <Card
            icon={
              <HiUserCircle
                style={{ color: colors.deepTeal }}
                className="text-xl"
              />
            }
            title="Your Profile"
            badge={
              <div
                className="text-xs font-medium rounded-full px-3 py-1 text-white shadow-sm"
                style={{ background: colors.deepTeal }}
              >
                {promoterData?.isActive ? "Active" : "Inactive"}
              </div>
            }
          >
            <div className="space-y-3 mb-4">
              {[
                {
                  icon: <HiUser />,
                  label: "Full Name",
                  value: promoterData?.name,
                },
                {
                  icon: <HiMail />,
                  label: "Email",
                  value: promoterData?.email,
                },
                {
                  icon: <HiPhone />,
                  label: "Phone",
                  value: promoterData?.phone,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className="w-8 flex-shrink-0"
                    style={{ color: colors.deepTeal }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className="font-medium truncate text-sm">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Referral Stats Card */}
          <Card
            icon={
              <HiUsers style={{ color: colors.deepTeal }} className="text-xl" />
            }
            title="Referral Stats"
            badge={
              <div
                className="text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                style={{ background: colors.lightMint, color: colors.deepTeal }}
              >
                <span className="font-bold">
                  {promoterData?.directRefsCount || 0}
                </span>{" "}
                Total
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                {
                  label: "Direct Referrals",
                  value: promoterData?.directRefsCount || 0,
                  progress: promoterData?.directRefsProgress || 0,
                  icon: <HiTrendingUp className="mr-1" />,
                },
                {
                  label: "Qualified Directs",
                  value: promoterData?.qualifiedDirects || 0,
                  progress: promoterData?.qualifiedDirectsProgress || 0,
                  icon: <HiCheck className="mr-1" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg"
                  style={{ background: colors.lightMint }}
                >
                  <div className="text-xs text-gray-600 mb-1">{item.label}</div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: colors.deepTeal }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="mt-1 text-xs flex items-center"
                    style={{ color: colors.deepTeal }}
                  >
                    {item.icon} {item.progress}% of goal
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Promoter Status Card */}
          <Card
            icon={
              <HiBadgeCheck
                style={{ color: colors.deepTeal }}
                className="text-xl"
              />
            }
            title="Promoter Status"
          >
            <div className="space-y-4 mb-4">
<div className="grid grid-cols-1 gap-3 mb-3">
  {[
    {
      title: "Direct Referrals",
      target: 55,
      current: promoterData?.directRefsCount || 0,
      progress: promoterData?.directRefsProgress || 0,
    },
    {
      title: "Qualified Directs",
      target: 10,
      current: promoterData?.qualifiedDirects || 0,
      progress: promoterData?.qualifiedDirectsProgress || 0,
    },
  ].map((item, i) => (
    <motion.div
      key={i}
      whileHover={{
        y: -1,
        boxShadow: "0 6px 14px rgba(15,118,110,0.08)",
      }}
      className="rounded-lg p-3 relative overflow-hidden shadow-sm transition-all duration-200"
      style={{
        background: `linear-gradient(to right, ${colors.lightMint}, ${colors.paleGreen})`,
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <p
            className="font-semibold text-xs mb-0.5"
            style={{ color: colors.deepTeal }}
          >
            {item.title}
          </p>
          <div className="text-[11px] text-gray-600 flex items-center">
            <HiLightningBolt
              className="mr-1"
              size={12}
              style={{ color: colors.deepTeal }}
            />
            Target: {item.target}
          </div>
        </div>
        <div
          className="text-base font-bold"
          style={{ color: colors.deepTeal }}
        >
          {item.progress}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${item.progress}%` }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-medium text-white">
            {item.current} / {item.target}
          </span>
        </div>
      </div>
    </motion.div>
  ))}
</div>

             
            </div>

            {promoterData &&
            !promoterData.alreadyClimedPromoterBadge &&
            promoterData.isUserElegibleToPromoter ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowClaimModal(true)}
                className="w-full py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all text-white flex items-center justify-center"
                style={{
                  background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.mediumTeal})`,
                }}
              >
                <HiBadgeCheck className="mr-2" /> Claim Promoter Badge
              </motion.button>
            ) : null}
          </Card>
        </div>

        {/* Progress Tracking Section */}


        {/* Direct Referrals Table/Cards */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5 relative"
        >
          <div
            className="p-1"
            style={{
              background: `linear-gradient(to right, ${colors.deepTeal}, ${colors.lightTealAccent})`,
            }}
          ></div>
          <div
            className="p-4 border-b flex flex-wrap justify-between items-center gap-2"
            style={{ borderColor: colors.lightMint }}
          >
            <div className="flex items-center">
              <div
                className="p-2 rounded-lg mr-2 shadow-sm"
                style={{ background: colors.lightMint }}
              >
                <HiUserGroup
                  style={{ color: colors.deepTeal }}
                  className="text-lg"
                />
              </div>
              <h2
                className="text-lg font-bold"
                style={{ color: colors.deepTeal }}
              >
                Direct Referrals
              </h2>
              <span
                className="ml-2 text-xs py-0.5 px-2 rounded-full text-white shadow-sm"
                style={{ background: colors.deepTeal }}
              >
                {promoterData?.pagination?.totalRecords || 0}
              </span>
            </div>
          </div>

          {/* Table View (Responsive) */}
          <div className="overflow-x-auto hidden md:block">
            <table
              className="min-w-full divide-y"
              style={{ borderColor: colors.lightMint }}
            >
              <thead style={{ background: colors.lightMint }}>
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: colors.deepTeal }}
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell"
                    style={{ color: colors.deepTeal }}
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: colors.deepTeal }}
                  >
                    Referrals
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider hidden lg:table-cell"
                    style={{ color: colors.deepTeal }}
                  >
                    Team Size
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: colors.deepTeal }}
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
                    style={{ color: colors.deepTeal }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y"
                style={{ borderColor: colors.lightMint }}
              >
                {promoterData?.directUserInfo?.map((user, index) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="flex-shrink-0 h-8 w-8 rounded-full text-white flex items-center justify-center shadow-sm overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
                          }}
                        >
                          {user.profile ? (
                            <img
                              src={user.profile}
                              alt={user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500 lg:hidden">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {user.username}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Direct: {user.actualDirectReferrals}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: colors.deepTeal }}
                      >
                        Chain: {user.chainReferrals}
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
                      <span
                        className="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full"
                        style={{
                          background: colors.lightMint,
                          color: colors.deepTeal,
                        }}
                      >
                        {user.actualTeam}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${parseFloat(user.progress)}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-2 rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
                          }}
                        ></motion.div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.progress}%
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.directUserElegibleToContribute
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.directUserElegibleToContribute ? (
                          <>
                            <HiCheck className="mr-1 text-green-600" />{" "}
                            Contributed
                          </>
                        ) : (
                          <>
                            <HiX className="mr-1 text-gray-500" /> Not
                            Contributed
                          </>
                        )}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {promoterData?.directUserInfo?.map((user, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={index}
                className="p-3 border-b"
                style={{ borderColor: colors.lightMint }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div
                      className="h-9 w-9 rounded-full text-white flex items-center justify-center shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${colors.lightTealAccent}, ${colors.deepTeal})`,
                      }}
                    >
                      {user.profile ? (
                        <img
                          src={user.profile}
                          alt={user.name}
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="ml-2">
                      <div className="font-medium text-sm truncate max-w-[180px]">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[180px]">
                        {user.username}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full shadow-sm ${
                      user.directUserElegibleToContribute
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.directUserElegibleToContribute
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 gap-2 mb-2 p-2 rounded-lg shadow-sm"
                  style={{ background: colors.lightMint }}
                >
                  <div>
                    <div className="text-xs text-gray-600">Direct</div>
                    <div
                      className="font-medium"
                      style={{ color: colors.deepTeal }}
                    >
                      {user.actualDirectReferrals}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Chain</div>
                    <div
                      className="font-medium"
                      style={{ color: colors.deepTeal }}
                    >
                      {user.chainReferrals}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Team Size</div>
                    <div
                      className="font-medium"
                      style={{ color: colors.deepTeal }}
                    >
                      {user.actualTeam}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Progress</div>
                    <div
                      className="font-medium"
                      style={{ color: colors.deepTeal }}
                    >
                      {user.progress}%
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${parseFloat(user.progress)}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-2 rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${colors.lightTealAccent}, ${colors.deepTeal})`,
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {(!promoterData?.directUserInfo ||
            promoterData.directUserInfo.length === 0) && (
            <div className="flex flex-col items-center justify-center py-10">
              <div
                className="rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow-md"
                style={{ background: colors.lightMint }}
              >
                <HiUsers
                  className="text-xl"
                  style={{ color: colors.deepTeal }}
                />
              </div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: colors.deepTeal }}
              >
                No Referrals Found
              </h3>
              <p className="text-gray-500 text-center max-w-md text-xs">
                Share your referral link to start building your network.
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {promoterData?.pagination &&
            promoterData.directUserInfo?.length > 0 && (
              <div
                className="px-4 py-3 border-t flex justify-center items-center"
                style={{
                  borderColor: colors.lightMint,
                  background: colors.lightMint,
                }}
              >
                <Pagination
                  currentPage={promoterData.pagination.currentPage}
                  totalPages={promoterData.pagination.totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
        </motion.div>
      </div>
    </div>
  );
};

export default PromoterDashboard;

// import React, { useState, useEffect } from "react";
// import logo from "../../assets/Images/footer.svg";
// import { useShareAuthQuery } from './ShareholderAuthorizedApiSlice';

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
//     xmlns="http://www.w3.org/2000/svg"
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

//     } else if (error) {
//       console.error("❌ Error fetching data:", error);
//     } else if (data?.data?.shareholders) {
//       // console.log("✅ Fetched data:", data.data.shareholders);
//     }
//   }, [data, error, isLoading]);

//   const handleMouseMove = (e, cardId) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setMousePosition({ x, y });
//   };

//   if (isLoading) {
//     return (
//       <div style={{
//         minHeight: "50vh",
//         backgroundColor: "#012426",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "#9ACD32",
//         fontSize: "18px"
//       }}>
//         <div style={{ textAlign: "center" }}>
//           <div style={{
//             width: "50px",
//             height: "50px",
//             border: "3px solid #9ACD32",
//             borderTop: "3px solid transparent",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             margin: "0 auto 20px"
//           }}></div>
//           Loading shareholders...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         style={{
//           minHeight: "50vh",
//           backgroundColor: "#012426",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "20px",
//           color: "#ff6b6b",
//           fontSize: "18px",
//           gap: "12px",
//           textAlign: "center",
//           flexDirection: "column",
//         }}
//       >
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
//           style={{
//             color: "#ff6b6b",
//             marginBottom: "8px",
//           }}
//           className="lucide lucide-server-crash"
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
//       <style jsx>{`
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

//         .card-container {
//           position: relative;
//           height: 100%;
//         }
        
//         .card-container::before {
//           content: '';
//           position: absolute;
//           top: -2px;
//           left: -2px;
//           right: -2px;
//           bottom: -2px;
//           background: linear-gradient(45deg, 
//             #9ACD32 0%, 
//             #2E8B57 25%, 
//             #FFD700 50%, 
//             #9ACD32 75%, 
//             #2E8B57 100%);
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
        
//         .profile-image-wrapper {
//           position: relative;
//           overflow: visible;
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
        
//         .stats-badge {
//           background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8));
//           backdrop-filter: blur(10px);
//           border: 1px solid rgba(255,255,255,0.3);
//         }
        
//         .info-item {
//           transition: all 0.3s ease;
//           background: rgba(255,255,255,0.05);
//           backdrop-filter: blur(5px);
//           border: 1px solid rgba(255,255,255,0.1);
//         }
        
//         .info-item:hover {
//           background: rgba(154, 205, 50, 0.1);
//           border-color: rgba(154, 205, 50, 0.3);
//           transform: translateX(5px);
//         }
        
//         .glow-text {
//           text-shadow: 0 0 10px rgba(154, 205, 50, 0.5);
//         }
        
//         .premium-gradient {
//           background: linear-gradient(135deg, 
//             #1a4a3a 0%,
//             #2E8B57 25%,
//             #228B22 50%,
//             #32CD32 75%,
//             #9ACD32 100%);
//         }
        
//         .glass-effect {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         /* Responsive Grid System */
//         .responsive-grid {
//           --bs-gutter-x: 1rem;
//           --bs-gutter-y: 1rem;
//         }

//         /* Small screens (≤575px): 2 cards per row */
//         @media (max-width: 575.98px) {
//           .responsive-grid .col {
//             flex: 0 0 50% !important;
//             max-width: 50% !important;
//           }
          
//           .shareholders-header {
//             margin-bottom: 20px !important;
//           }
          
//           .shareholders-header h3 {
//             font-size: 1.25rem !important;
//             padding: 3px 8px !important;
//           }
          
//           .shareholders-container {
           
//             min-height: auto !important;
//           }
          
//           .card-inner {
//             margin-bottom: 0.5rem !important;
//           }
          
//           .premium-gradient {
//             padding: 20px 15px 8px !important;
//           }
          
//           .profile-image-container {
//             width: 80px !important;
//             height: 80px !important;
//           }
          
//           .rank-badge {
//             width: 30px !important;
//             height: 30px !important;
//             top: 10px !important;
//             right: 10px !important;
//           }
          
//           .rank-badge span {
//             font-size: 12px !important;
//           }
          
//           .shareholder-name {
//             font-size: 16px !important;
//           }
          
//           .info-section {
//             padding: 3px 8px !important;
//           }
          
//           .logo-container {
//             margin-bottom: 5px !important;
//           }
          
//           .logo-container img {
//             height: 20px !important;
//           }
          
//           .info-item {
//             padding: 8px 10px !important;
//             margin-bottom: 5px !important;
//             font-size: 11px !important;
//           }
//         }

//         /* Medium screens (576px-767px): 2 cards per row */
//         @media (min-width: 576px) and (max-width: 767.98px) {
//           .responsive-grid .col {
//             flex: 0 0 50% !important;
//             max-width: 50% !important;
//           }
          
//           .shareholders-header h3 {
//             font-size: 1.5rem !important;
//           }
          
//           .premium-gradient {
//             padding: 25px 18px 8px !important;
//           }
          
//           .profile-image-container {
//             width: 100px !important;
//             height: 100px !important;
//           }
          
//           .shareholder-name {
//             font-size: 18px !important;
//           }
//         }

//         /* Tablet screens (768px-991px): 3 cards per row */
//         @media (min-width: 768px) and (max-width: 991.98px) {
//           .responsive-grid .col {
//             flex: 0 0 33.333333% !important;
//             max-width: 33.333333% !important;
//           }
//         }

//         /* Desktop screens (≥992px): 4 cards per row */
//         @media (min-width: 992px) {
//           .responsive-grid .col {
//             flex: 0 0 25% !important;
//             max-width: 25% !important;
//           }
//         }

//         /* Large desktop screens (≥1200px): 4 cards per row with better spacing */
//         @media (min-width: 1200px) {
//           .responsive-grid .col {
//             flex: 0 0 25% !important;
//             max-width: 25% !important;
//           }
          
//           .shareholders-container {
//             padding: 10px 20px !important;
//           }
//         }

//         /* Extra large screens (≥1400px): Still 4 cards per row but with more padding */
//         @media (min-width: 1400px) {
//           .shareholders-container {
//             padding: 15px 40px !important;
//           }
//         }
//       `}</style>

//       <div
//         className="shareholders-container"
//         style={{
//           minHeight: "100vh",
//           background: "#063236",
//           position: "relative",
//           overflow: "hidden"
//         }}
//       >
//         {/* Background decorative elements */}
//         <div style={{
//           position: "absolute",
//           top: "10%",
//           left: "5%",
//           width: "100px",
//           height: "100px",
//           background: "radial-gradient(circle, rgba(154, 205, 50, 0.1) 0%, transparent 70%)",
//           borderRadius: "50%",
//           animation: "pulse 4s infinite"
//         }}></div>
//         <div style={{
//           position: "absolute",
//           bottom: "20%",
//           right: "10%",
//           width: "150px",
//           height: "150px",
//           background: "radial-gradient(circle, rgba(46, 139, 87, 0.1) 0%, transparent 70%)",
//           borderRadius: "50%",
//           animation: "pulse 6s infinite"
//         }}></div>

//         <div style={{ padding: "10px 0px" }}>
//           {/* Enhanced Header */}
//           <div
//             className="shareholders-header"
//             style={{ textAlign: "center", marginBottom: "50px" }}
//           >
//             <div style={{
//               display: "inline-block",
//               background: "linear-gradient(135deg, rgba(154, 205, 50, 0.2), rgba(46, 139, 87, 0.2))",
//               borderRadius: "50px",
//               border: "2px solid rgba(154, 205, 50, 0.3)",
//               backdropFilter: "blur(10px)",
//               padding: "5px 10px"
//             }}>
//               <h3 style={{
//                 margin: 0,
//                 color: "white"
//               }}>
//                 Our Elite Shareholders
//               </h3>
//             </div>
//           </div>

//           <div className="container">
//             <div className="row responsive-grid g-4">
//               {(!data?.data?.shareholders?.length) ? (
//                 <div className="col-12" style={{ textAlign: "center", padding: "60px 20px" }}>
//                   <div style={{
//                     background: "rgba(154, 205, 50, 0.1)",
//                     border: "2px dashed rgba(154, 205, 50, 0.3)",
//                     borderRadius: "20px",
//                     padding: "20px",
//                     color: "rgba(255,255,255,0.7)"
//                   }}>
//                     <div style={{ fontSize: "48px", marginBottom: "20px" }}>👥</div>
//                     <h3 style={{ color: "#9ACD32", marginBottom: "10px" }}>No Shareholders Yet</h3>
//                     <p>Be among the first to join our exclusive shareholder community</p>
//                   </div>
//                 </div>
//               ) : (
//                 data.data.shareholders.map((person, index) => {
//                   const isHovered = hoveredCard === person._id;
//                   return (
//                     <>

//                       <div
//                         key={person._id}
//                         className="col"
//                         onMouseEnter={() => setHoveredCard(person._id)}
//                         onMouseLeave={() => setHoveredCard(null)}
//                         onMouseMove={(e) => handleMouseMove(e, person._id)}
//                         style={{ minHeight: "100%" }}
//                       >
//                         <div className="card-container">
//                           <div
//                             className="card-inner"
//                             style={{
//                               borderRadius: "18px",
//                               overflow: "hidden",
//                               transform: isHovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
//                               transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                               background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
//                               backdropFilter: "blur(20px)",
//                               border: "1px solid rgba(255,255,255,0.2)",
//                               boxShadow: isHovered
//                                 ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(154, 205, 50, 0.2), 0 0 30px rgba(154, 205, 50, 0.2)"
//                                 : "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
//                               height: "100%",
//                               display: "flex",
//                               flexDirection: "column",
//                               position: "relative"
//                             }}
//                           >
//                             {/* Floating particles for hovered card */}
//                             {isHovered && (
//                               <>
//                                 <div className="floating-particle" style={{
//                                   width: "12px", height: "12px", top: "15%", left: "10%",
//                                   animationDelay: "0s"
//                                 }}></div>
//                                 <div className="floating-particle" style={{
//                                   width: "8px", height: "8px", top: "25%", right: "15%",
//                                   animationDelay: "0.5s"
//                                 }}></div>
//                                 <div className="floating-particle" style={{
//                                   width: "10px", height: "10px", top: "45%", left: "85%",
//                                   animationDelay: "1s"
//                                 }}></div>
//                                 <div className="floating-particle" style={{
//                                   width: "6px", height: "6px", top: "70%", left: "20%",
//                                   animationDelay: "1.5s"
//                                 }}></div>
//                                 <div className="floating-particle" style={{
//                                   width: "14px", height: "14px", top: "60%", right: "25%",
//                                   animationDelay: "2s"
//                                 }}></div>
//                               </>
//                             )}

//                             {/* Header with gradient */}
//                             <div className="premium-gradient" style={{
//                               padding: "30px 20px 10px",
//                               position: "relative",
//                               textAlign: "center"
//                             }}>
//                               {/* Rank badge */}
//                               <div
//                                 className="rank-badge"
//                                 style={{
//                                   position: "absolute",
//                                   top: "15px",
//                                   right: "15px",
//                                   background: "linear-gradient(135deg, #bfd120, #bfd120)",
//                                   borderRadius: "50%",
//                                   width: "40px",
//                                   height: "40px",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                   boxShadow: "0 4px 15px rgba(255, 215, 0, 0.4)",
//                                   transform: isHovered ? "rotate(10deg) scale(1.1)" : "rotate(0) scale(1)",
//                                   transition: "all 0.3s ease"
//                                 }}
//                               >
//                                 <span style={{
//                                   fontSize: "14px",
//                                   fontWeight: "bold",
//                                   color: "#1a4a3a"
//                                 }}>
//                                   #{index + 1}
//                                 </span>
//                               </div>

//                               {/* Profile Image */}
//                               <div className="profile-image-wrapper" style={{
//                                 position: "relative",
//                                 display: "inline-block",
//                                 marginBottom: "10px"
//                               }}>
//                                 <div
//                                   className="profile-image-container"
//                                   style={{
//                                     width: "120px",
//                                     height: "120px",
//                                     borderRadius: "50%",
//                                     overflow: "hidden",
//                                     border: "4px solid rgba(255,255,255,0.3)",
//                                     boxShadow: isHovered
//                                       ? "0 15px 35px rgba(0,0,0,0.3), 0 0 0 2px rgba(154, 205, 50, 0.5)"
//                                       : "0 8px 25px rgba(0,0,0,0.2)",
//                                     transition: "all 0.4s ease",
//                                     position: "relative",
//                                     margin: "0 auto"
//                                   }}
//                                 >
//                                   <img
//                                     src={`${person.profileImage}?t=${new Date().getTime()}`}
//                                     alt={person.name}
//                                     style={{
//                                       width: "100%",
//                                       height: "100%",
//                                       objectFit: "cover",
//                                       transition: "all 0.5s ease",
//                                       filter: isHovered ? "grayscale(0%) brightness(1.1)" : "grayscale(10%)",
//                                       transform: isHovered ? "scale(1.1)" : "scale(1)"
//                                     }}
//                                   />

//                                   {/* Status indicator */}
//                                   <div style={{
//                                     position: "absolute",
//                                     bottom: "5px",
//                                     right: "5px",
//                                     width: "20px",
//                                     height: "20px",
//                                     background: "linear-gradient(135deg, #32CD32, #228B22)",
//                                     borderRadius: "50%",
//                                     border: "3px solid white",
//                                     boxShadow: "0 2px 10px rgba(50, 205, 50, 0.5)",
//                                     animation: isHovered ? "glow 2s infinite" : "none"
//                                   }}></div>
//                                 </div>
//                               </div>

//                               {/* Name */}
//                               <h3
//                                 className="shareholder-name"
//                                 style={{
//                                   fontSize: "20px",
//                                   fontWeight: "bold",
//                                   color: "white",
//                                   margin: "0",
//                                   textShadow: "0 2px 10px rgba(0,0,0,0.3)",
//                                   transform: isHovered ? "scale(1.05)" : "scale(1)",
//                                   transition: "all 0.3s ease"
//                                 }}
//                               >
//                                 {person.name}
//                               </h3>
//                             </div>

//                             {/* Info Section */}
//                             <div
//                               className="info-section"
//                               style={{
//                                 padding: "5px 10px",
//                                 background: "rgba(255,255,255,0.95)",
//                                 flexGrow: 1,
//                                 display: "flex",
//                                 flexDirection: "column"
//                               }}
//                             >
//                               {/* Logo */}
//                               <div
//                                 className="logo-container"
//                                 style={{
//                                   textAlign: "center",
//                                   marginBottom: "10px",
//                                   transform: isHovered ? "scale(1.1)" : "scale(1)",
//                                   transition: "all 0.3s ease"
//                                 }}
//                               >
//                                 <img
//                                   src={logo}
//                                   alt="JAIMAX Logo"
//                                   style={{
//                                     height: "35px",
//                                     objectFit: "contain",
//                                     filter: isHovered ? "brightness(1.1) saturate(1.2)" : "brightness(1)"
//                                   }}
//                                 />
//                               </div>

//                               {/* Info Items */}
//                               <div style={{ space: "10px" }}>
//                                 <div className="info-item" style={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   // padding: "12px 15px",
//                                   borderRadius: "12px",
//                                   marginBottom: "8px",
//                                   color: "#2E8B57",
//                                   fontSize: "13px",
//                                   fontWeight: "500"
//                                 }}>
//                                   <UserIcon />
//                                   <span style={{ marginLeft: "10px", flex: 1 }}>
//                                     {person.username}
//                                   </span>
//                                 </div>

//                                 <div className="info-item" style={{
//                                   display: "flex",
//                                   alignItems: "flex-start",
//                                   padding: "12px 15px",
//                                   borderRadius: "12px",
//                                   color: "#2E8B57",
//                                   fontSize: "13px",
//                                   fontWeight: "500"
//                                 }}>
//                                   <div style={{ marginTop: "2px", flexShrink: 0 }}>
//                                     <EmailBoxIcon />
//                                   </div>
//                                   <span style={{
//                                     marginLeft: "10px",
//                                     flex: 1,
//                                     lineHeight: "1.4",
//                                     wordBreak: "break-all",
//                                     fontSize: "12px"
//                                   }}>
//                                     {person.email}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                       </div>
                      
//                     </>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShareholderCard;


import React, { useState, useEffect } from "react";
// import logo from "../../assets/Images/footer.svg"; 
import logo from "../../../../assets/Images/footer.svg";
import { useShareAuthQuery } from './ShareholderAuthorizedApiSlice';

// Icons as separate components for better readability
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

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org="
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const CrownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M5 16L3 6l5.5 4L12 2l3.5 8L21 6l-2 10H5z" />
  </svg>
);

const ShareholderCard = () => {
  const { data, error, isLoading } = useShareAuthQuery();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isLoading) {
      // Handle loading state, e.g., show a skeleton loader
    } else if (error) {
      console.error("❌ Error fetching data:", error);
    } else if (data?.data?.shareholders) {
      // console.log("✅ Fetched data:", data.data.shareholders);
    }
  }, [data, error, isLoading]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-teal-950 flex items-center justify-center text-emerald-400 text-lg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>
          Loading shareholders...
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center p-5 text-red-400 text-lg gap-3 text-center">
        {/* Server Crash Icon */}
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
          className="text-red-400 mb-2"
        >
          <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
          <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
          <path d="M6 6h.01" />
          <path d="M6 18h.01" />
          <path d="m13 6-4 6h6l-4 6" />
        </svg>
        <span>Error loading shareholders</span>
      </div>
    );
  }

  return (
    <>
      {/* Tailwind's JIT mode handles CSS, so direct <style jsx> is not typically needed.
          Animations are defined in tailwind.config.js or via arbitrary values if complex. */}
      {/* For custom animations, you'd usually extend your tailwind.config.js with keyframes */}
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
          0%, 100% { box-shadow: 0 0 20px rgba(154, 205, 50, 0.3); }
          50% { box-shadow: 0 0 30px rgba(154, 205, 50, 0.6), 0 0 40px rgba(154, 205, 50, 0.4); }
        }

        .card-container::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #9ACD32 0%, #2E8B57 25%, #FFD700 50%, #9ACD32 75%, #2E8B57 100%);
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
          background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(154, 205, 50, 0.8));
          border-radius: 50%;
          pointer-events: none;
          animation: float 4s infinite ease-in-out;
          z-index: 10;
          box-shadow: 0 0 10px rgba(154, 205, 50, 0.5);
        }

        .profile-image-wrapper::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: conic-gradient(from 0deg, #9ACD32, #FFD700, #2E8B57, #9ACD32);
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .profile-image-wrapper:hover::before {
          opacity: 1;
          animation: spin 3s linear infinite;
        }
      `}</style>

      <div
        className="min-h-screen bg-teal-900 relative overflow-hidden py-2 px-0 sm:px-5 lg:px-10"
      >
        {/* Background decorative elements */}
        <div className="absolute top-1/10 left-5 w-24 h-24 bg-radial-gradient-emerald-circle rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/5 right-10 w-36 h-36 bg-radial-gradient-dark-emerald-circle rounded-full animate-pulse-slow"></div>

        {/* Enhanced Header */}
        <div className="text-center mb-12 mt-2">
          <div className="inline-block bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full border-2 border-emerald-400/30 backdrop-blur-lg px-2 py-1 sm:px-4 sm:py-2">
            <h3 className="m-0 text-white text-xl sm:text-2xl font-semibold">
              Our Elite Shareholders
            </h3>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {!data?.data?.shareholders?.length ? (
              <div className="col-span-full text-center p-10">
                <div className="bg-emerald-400/10 border-2 border-dashed border-emerald-400/30 rounded-2xl p-5 text-white/70">
                  <div className="text-5xl mb-5">👥</div>
                  <h3 className="text-emerald-400 mb-2 text-2xl font-semibold">No Shareholders Yet</h3>
                  <p className="text-lg">Be among the first to join our exclusive shareholder community</p>
                </div>
              </div>
            ) : (
              data.data.shareholders.map((person, index) => {
                const isHovered = hoveredCard === person._id;
                return (
                  <div
                    key={person._id}
                    className="col-span-1 min-h-full flex"
                    onMouseEnter={() => setHoveredCard(person._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onMouseMove={(e) => handleMouseMove(e, person._id)}
                  >
                    <div className="card-container relative w-full">
                      <div
                        className={`card-inner rounded-2xl overflow-hidden transform transition-all duration-400 ease-in-out-quad bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col h-full 
                          ${isHovered ? 'translate-y-[-10px] scale-102 shadow-2xl shadow-emerald-400/30' : 'translate-y-0 scale-100'}`}
                      >
                        {/* Floating particles for hovered card */}
                        {isHovered && (
                          <>
                            <div className="floating-particle w-3 h-3 top-1/6 left-1/10 animate-float-delay-0"></div>
                            <div className="floating-particle w-2 h-2 top-1/4 right-1/6 animate-float-delay-500"></div>
                            <div className="floating-particle w-2.5 h-2.5 top-1/2 left-4/5 animate-float-delay-1000"></div>
                            <div className="floating-particle w-1.5 h-1.5 top-3/4 left-1/5 animate-float-delay-1500"></div>
                            <div className="floating-particle w-3.5 h-3.5 top-3/5 right-1/4 animate-float-delay-2000"></div>
                          </>
                        )}

                        {/* Header with gradient */}
                        <div className="bg-gradient-to-br from-teal-800 to-emerald-700 p-8 pt-6 pb-2 relative text-center">
                          {/* Rank badge */}
                          <div
                            className={`absolute top-4 right-4 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-yellow-500/40 transition-all duration-300 ease-in-out ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'}`}
                          >
                            <span className="text-sm font-bold text-teal-900">
                              #{index + 1}
                            </span>
                          </div>

                          {/* Profile Image */}
                          <div className="profile-image-wrapper relative inline-block mb-3">
                            <div
                              className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg relative mx-auto
                                ${isHovered ? 'shadow-xl shadow-emerald-400/50' : ''}`}
                            >
                              <img
                                src={`${person.profileImage}?t=${new Date().getTime()}`}
                                alt={person.name}
                                className={`w-full h-full object-cover transition-all duration-500 ease-in-out
                                  ${isHovered ? 'grayscale-0 brightness-110 scale-110' : 'grayscale-10 filter-brightness-100 scale-100'}`}
                              />
                              {/* Status indicator */}
                              <div className={`absolute bottom-1 right-1 w-5 h-5 bg-gradient-to-br from-green-500 to-green-700 rounded-full border-3 border-white shadow-md shadow-green-500/50
                                ${isHovered ? 'animate-glow' : ''}`}></div>
                            </div>
                          </div>

                          {/* Name */}
                          <h3
                            className={`text-xl font-bold text-white mb-0 text-shadow-md transition-all duration-300 ease-in-out
                              ${isHovered ? 'scale-105' : 'scale-100'}`}
                          >
                            {person.name}
                          </h3>
                        </div>

                        {/* Info Section */}
                        <div
                          className="p-3 bg-white/95 flex flex-col flex-grow"
                        >
                          {/* Logo */}
                          <div
                            className={`text-center mb-2 transition-all duration-300 ease-in-out
                              ${isHovered ? 'scale-110' : 'scale-100'}`}
                          >
                            <img
                              src={logo}
                              alt="JAIMAX Logo"
                              className={`h-9 object-contain mx-auto
                                ${isHovered ? 'brightness-110 saturate-125' : 'brightness-100'}`}
                            />
                          </div>

                          {/* Info Items */}
                          <div className="space-y-2">
                            <div className="info-item flex items-center p-3 rounded-xl mb-2 text-emerald-700 text-sm font-medium bg-white/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-emerald-400/10 hover:border-emerald-400/30 hover:translate-x-1">
                              <UserIcon />
                              <span className="ml-2 flex-1">
                                {person.username}
                              </span>
                            </div>

                            <div className="info-item flex items-start p-3 rounded-xl text-emerald-700 text-sm font-medium bg-white/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-emerald-400/10 hover:border-emerald-400/30 hover:translate-x-1">
                              <div className="mt-0.5 flex-shrink-0">
                                <EmailBoxIcon />
                              </div>
                              <span className="ml-2 flex-1 leading-normal break-all text-xs">
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
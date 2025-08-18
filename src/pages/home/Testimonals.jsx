// // import React, { useState } from "react";
// // import { ChevronLeft, ChevronRight } from "lucide-react";

// // const testimonials = [
// //   {
// //     quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
// //     name: "Sarah Chen",
// //     designation: "Product Manager at TechFlow",
// //     src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3",
// //   },
// //   {
// //     quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
// //     name: "Michael Rodriguez",
// //     designation: "CTO at InnovateSphere",
// //     src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
// //   },
// //   {
// //     quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
// //     name: "Emily Watson",
// //     designation: "Operations Director at CloudScale",
// //     src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
// //   },
// //   {
// //     quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
// //     name: "James Kim",
// //     designation: "Engineering Lead at DataPro",
// //     src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
// //   },
// //   {
// //     quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
// //     name: "Lisa Thompson",
// //     designation: "VP of Technology at FutureNet",
// //     src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
// //   },
// // ];

// // const AnimatedTestimonials = () => {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isAnimating, setIsAnimating] = useState(false);

// //   const handleNext = () => {
// //     if (isAnimating) return;
// //     setIsAnimating(true);
// //     setTimeout(() => {
// //       setActiveIndex((prev) => (prev + 1) % testimonials.length);
// //       setIsAnimating(false);
// //     }, 150);
// //   };

// //   const handlePrev = () => {
// //     if (isAnimating) return;
// //     setIsAnimating(true);
// //     setTimeout(() => {
// //       setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
// //       setIsAnimating(false);
// //     }, 150);
// //   };

// //   const testimonial = testimonials[activeIndex];

// //   return (
// //     <div className="w-full min-h-screen flex  justify-center items-center px-4 py-20 text-white" 
// //       style={{ 
// //           background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)',
// //           WebkitBackdropFilter: 'blur(16px)' 
// //       }}
// //     >
// //       <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 max-w-6xl w-full">
        
// //         {/* Image */}
// //         <div className="flex justify-center items-center">
// //           <div className="relative h-80 w-full max-w-sm">
// //             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
// //             <img
// //               key={activeIndex}
// //               src={testimonial.src}
// //               alt={testimonial.name}
// //               className={`relative rounded-3xl object-cover object-center w-full h-full shadow-2xl transition-all duration-500 ease-in-out transform ${
// //                 isAnimating ? 'scale-95 opacity-70 rotate-1' : 'scale-100 opacity-100 rotate-0'
// //               } hover:scale-105 hover:shadow-3xl`}
// //               draggable={false}
// //             />
// //           </div>
// //         </div>

// //         {/* Text */}
// //         <div className="flex flex-col justify-between py-4">
// //           <div 
// //             className={`transition-all duration-300 ease-in-out transform ${
// //               isAnimating ? 'translate-y-4 opacity-60' : 'translate-y-0 opacity-100'
// //             }`}
// //           >
// //             <div className="mb-6">
// //               <h3 className="text-3xl font-bold text-white">{testimonial.name}</h3>
// //               <p className="text-sm text-neutral-300 mt-2">{testimonial.designation}</p>
// //             </div>
// //             <blockquote className="relative">
// //               <div className="absolute -left-4 -top-2 text-6xl text-white/20 font-serif">"</div>
// //               <p className="text-lg text-white leading-relaxed italic pl-6">
// //                 {testimonial.quote}
// //               </p>
// //             </blockquote>
// //           </div>

// //           {/* Arrows */}
// //           <div className="flex gap-4 pt-12 md:pt-8">
// //             <button
// //               onClick={handlePrev}
// //               disabled={isAnimating}
// //               className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-50 border border-white/20"
// //               aria-label="Previous testimonial"
// //             >
// //               <ChevronLeft className="h-5 w-5 text-white group-hover:text-blue-300 transition-colors" />
// //             </button>
// //             <button
// //               onClick={handleNext}
// //               disabled={isAnimating}
// //               className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-50 border border-white/20"
// //               aria-label="Next testimonial"
// //             >
// //               <ChevronRight className="h-5 w-5 text-white group-hover:text-blue-300 transition-colors" />
// //             </button>
// //           </div>

// //           {/* Dots */}
// //           <div className="flex gap-2 pt-6">
// //             {testimonials.map((_, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => {
// //                   if (!isAnimating && index !== activeIndex) {
// //                     setIsAnimating(true);
// //                     setTimeout(() => {
// //                       setActiveIndex(index);
// //                       setIsAnimating(false);
// //                     }, 150);
// //                   }
// //                 }}
// //                 className={`h-2 rounded-full transition-all duration-300 ${
// //                   index === activeIndex 
// //                     ? 'w-8 bg-blue-400' 
// //                     : 'w-2 bg-white/30 hover:bg-blue-300'
// //                 }`}
// //                 aria-label={`Go to testimonial ${index + 1}`}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AnimatedTestimonials;


// // import React, { useEffect, useState } from "react";
// // const testimonialsNew = [
// //   {
// //     quote:
// //       "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
// //     name: "Michael R.",
// //     designation: "Crypto Investor (USA)",
// //     src: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
// //   },
// //   {
// //     quote:
// //       "I've been in the blockchain space for years, and Jaimax stands out for its clarity, transparency, and future potential. I'm excited to be part of its early growth phase.",
// //     name: "Elena F.",
// //     designation: "Blockchain Consultant (Germany)",
// //     src: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?semt=ais_hybrid&w=740",
// //   },
// //   {
// //     quote:
// //       "I love how easy it is to use the Jaimax app. The wallet setup was quick, and I feel confident managing my crypto in it. It's perfect for beginners and serious investors alike.",
// //     name: "Rohit Sharma",
// //     designation: "Pune",
// //     src: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
// //   },
// //   {
// //     quote:
// //       "I've tried a few coins before, but Jaimax has the best experience so far. The team is active, updates are regular, and the app makes everything so convenient.",
// //     name: "Karthik Menon",
// //     designation: "Bangalore",
// //     src: "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740",
// //   },
// //   {
// //     quote:
// //       "Jaimax Coin gave me a fresh perspective on cryptocurrency. It's secure, user-friendly, and feels like something built for the future of India's digital economy.",
// //     name: "Ayesha Khan",
// //     designation: "Hyderabad",
// //     src: "https://media.gettyimages.com/id/1354842602/photo/portrait-of-a-young-businesswoman-working-on-a-laptop-in-an-office.jpg?s=612x612&w=0&k=20&c=kfP1g2712RiaxsDriIxFo363ARlaL2D591s-22CnIo8=",
// //   },
// // ];

// // const AnimatedTestimonials = ({ autoplay = true }) => {
// //   const [active, setActive] = useState(0);
// //   const [isHovered, setIsHovered] = useState(false);

// //   // --- DEBUGGING STEP 1: Add console logs to handlers ---
// //   const handleNext = () => {
// //     setActive((prev) => {
// //       const newActive = (prev + 1) % testimonialsNew.length;
// //       // console.log("handleNext: New active index is", newActive);
// //       return newActive;
// //     });
// //   };

// //   const handlePrev = () => {
// //     setActive((prev) => {
// //       const newActive = (prev - 1 + testimonialsNew.length) % testimonialsNew.length;
// //       // console.log("handlePrev: New active index is", newActive);
// //       return newActive;
// //     });
// //   };

// //   const handleDotClick = (index) => {
// //     // console.log("handleDotClick: Setting active index to", index);
// //     setActive(index);
// //   };

// //   useEffect(() => {
// //     if (autoplay && !isHovered) {
// //       const interval = setInterval(handleNext, 2500);
// //       return () => clearInterval(interval);
// //     }
// //   }, [autoplay, isHovered, active]);

// //   const isActive = (index) => index === active;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-green-900 to-indigo-900 flex items-center justify-center p-4">
// //       <div className="max-w-7xl w-full">
// //         {/* Header */}
// //         <div className="text-center mb-16">
// //           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
// //             What Our Users Say
// //           </h2>
// //           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
// //         </div>

// //         <div
// //           className="relative"
// //           onMouseEnter={() => setIsHovered(true)}
// //           onMouseLeave={() => setIsHovered(false)}
// //         >
// //           {/* Main Content */}
// //           <div className="flex flex-col lg:flex-row gap-12 items-center">
// //             {/* Image Section */}
// //             {/* The blur div is rotated and might extend beyond its parent. Ensure it doesn't cover elements. */}
// //             <div className="relative w-full lg:w-1/3 h-[280px] lg:h-[350px]">
// //               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl transform -rotate-6"></div>

// //               {testimonialsNew.map((t, i) => (
// //                 <div
// //                   key={t.src} // Using src as key, ensure unique srcs or consider index as a fallback for simplicity
// //                   className={`absolute inset-0 transition-all duration-700 transform ${isActive(i)
// //                       ? 'opacity-100 scale-100 z-10'
// //                       : 'opacity-0 scale-95 z-0'
// //                     }`}
// //                 >
// //                   <div className="relative h-full group">
// //                     <img
// //                       src={t.src}
// //                       alt={t.name}
// //                       className="w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
// //                       draggable={false}
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>

// //                     {/* Floating name badge */}
// //                     <div className={`absolute bottom-6 left-6 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 transition-all duration-500 ${isActive(i) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
// //                       }`}>
// //                       <p className="text-white font-semibold text-lg">{t.name}</p>
// //                       <p className="text-purple-200 text-sm">{t.designation}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Text Section */}
// //             <div className="w-full lg:w-2/3 space-y-8">
// //               <div className="relative">
// //                 {/* Quote Icon - positioned absolutely, but should be behind text. */}
// //                 <div className="absolute -top-4 -left-4 text-6xl text-purple-400/30 font-serif">"</div>

// //                 {/* Quote Text */}
// //                 <div className="relative z-10"> {/* Ensure this has a z-index if quote icon is covering it */}
// //                   <p className="text-2xl lg:text-2xl text-white leading-relaxed font-light">
// //                     {testimonialsNew[active].quote.split(" ").map((word, i) => (
// //                       <span
// //                         key={i}
// //                         className="inline-block transition-all duration-300 hover:text-purple-300"
// //                         style={{
// //                           animationDelay: `${i * 0.02}s`,
// //                           animation: 'fadeInUp 0.6s ease-out forwards'
// //                         }}
// //                       >
// //                         {word}&nbsp;
// //                       </span>
// //                     ))}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Star Rating */}
// //               <div className="flex gap-1">
// //                 {[...Array(5)].map((_, i) => (
// //                   <span key={i} className="text-yellow-400 text-2xl">★</span>
// //                 ))}
// //               </div>

// //               {/* Navigation Controls */}
// //               {/* --- POTENTIAL CULPRIT: Layering Issue Here --- */}
// //               <div className="flex items-center justify-between z-20 relative">
// //                 {/* Navigation Arrows */}
// //                 <div className="flex gap-4">
// //                   <button
// //                     onClick={handlePrev}
// //                     aria-label="Previous testimonial"
// //                     className="group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
// //                   >
// //                     <svg
// //                       className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //                     </svg>
// //                   </button>

// //                   <button
// //                     onClick={handleNext}
// //                     aria-label="Next testimonial"
// //                     className="group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
// //                   >
// //                     <svg
// //                       className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                     </svg>
// //                   </button>
// //                 </div>

// //                 {/* Progress Dots */}
// //                 <div className="flex gap-3">
// //                   {testimonialsNew.map((_, i) => (
// //                     <button
// //                       key={i}
// //                       onClick={() => handleDotClick(i)}
// //                       aria-label={`Go to testimonial ${i + 1}`}
// //                       className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive(i)
// //                           ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125'
// //                           : 'bg-white/30 hover:bg-white/50'
// //                         }`}
// //                     />
// //                   ))}
// //                 </div>
// //               </div>

// //             </div>
// //           </div>

// //           {/* Background Decorations - These are often the culprits for covering things! */}
// //           {/* Ensure these elements are behind interactive elements or contained. */}
// //           <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse -z-10"></div> {/* ADDED -z-10 */}
// //           <div className="absolute bottom-10 left-10 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-pulse -z-10" style={{ animationDelay: '1s' }}></div> {/* ADDED -z-10 */}
// //         </div>

// //         {/* Progress Bar */}
// //         <div className="mt-12 w-full bg-white/10 rounded-full h-2 overflow-hidden">
// //           <div
// //             className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
// //             style={{ width: `${((active + 1) / testimonialsNew.length) * 100}%` }}
// //           ></div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes fadeInUp {
// //           from {
// //             opacity: 0;
// //             transform: translateY(10px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default AnimatedTestimonials;


// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
//     name: "Sarah Chen",
//     designation: "Product Manager at TechFlow",
//     src: "https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg",
//   },
//   {
//     quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
//     name: "Michael Rodriguez",
//     designation: "CTO at InnovateSphere",
//     src: "https://img.freepik.com/free-photo/portrait-smiling-charming-young-man-grey-t-shirt-standing-against-plain-background_23-2148213406.jpg?semt=ais_hybrid&w=740",
//   },
//   {
//     quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
//     name: "Emily Watson",
//     designation: "Operations Director at CloudScale",
//     src: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?cs=srgb&dl=pexels-hannah-nelson-390257-1065084.jpg&fm=jpg",
//   },
//   {
//     quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
//     name: "James Kim",
//     designation: "Engineering Lead at DataPro",
//     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaYwJw0XtuSwlvs2AJa04UDxsp6eRl-tv0WQ&s",
//   },
//   {
//     quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
//     name: "Lisa Thompson",
//     designation: "VP of Technology at FutureNet",
//     src: "https://www.iom3.org/static/46d95062-0906-427d-bf91f52aff812b41/whoswhogrid_a2f960173125876b45a1d78e4b52192c_4a7c7e45a350/Hamish-Dow-ScotlandPNG.png",
//   },
// ];

// const AnimatedTestimonials = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   // Auto-rotate every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isAnimating) {
//         setIsAnimating(true);
//         setTimeout(() => {
//           setActiveIndex((prev) => (prev + 1) % testimonials.length);
//           setIsAnimating(false);
//         }, 150);
//       }
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [isAnimating]);

//   const handleNext = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setTimeout(() => {
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//       setIsAnimating(false);
//     }, 150);
//   };

//   const handlePrev = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setTimeout(() => {
//       setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//       setIsAnimating(false);
//     }, 150);
//   };

//   const testimonial = testimonials[activeIndex];

//   return (
//     <div
//       className="w-full min-h-screen flex justify-center items-center px-4 py-20 text-white"
//       style={{
//         background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)',
//         WebkitBackdropFilter: 'blur(16px)'
//       }}
//     >
//       <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 max-w-6xl w-full">

//         {/* Image */}
//         <div className="flex justify-center items-center">
//           <div className="relative h-80 w-full max-w-sm">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
//             <img
//               key={activeIndex}
//               src={testimonial.src}
//               alt={testimonial.name}
//               className={`relative rounded-3xl object-cover object-center w-full h-full shadow-2xl transition-all duration-500 ease-in-out transform ${
//                 isAnimating ? 'scale-95 opacity-70 rotate-1' : 'scale-100 opacity-100 rotate-0'
//               } hover:scale-105 hover:shadow-3xl`}
//               draggable={false}
//             />
//           </div>
//         </div>

//         {/* Text */}
//         <div className="flex flex-col justify-between py-4">
//           <div
//             className={`transition-all duration-300 ease-in-out transform ${
//               isAnimating ? 'translate-y-4 opacity-60' : 'translate-y-0 opacity-100'
//             }`}
//           >
//             <div className="mb-6">
//               <h3 className="text-3xl font-bold text-white">{testimonial.name}</h3>
//               <p className="text-sm text-neutral-300 mt-2">{testimonial.designation}</p>
//             </div>
//             <blockquote className="relative">
//               <div className="absolute -left-4 -top-2 text-6xl text-white/20 font-serif">"</div>
//               <p className="text-lg text-white leading-relaxed italic pl-6">
//                 {testimonial.quote}
//               </p>
//             </blockquote>
//           </div>

//           {/* Arrows */}
//           <div className="flex gap-4 pt-12 md:pt-8">
//             <button
//               onClick={handlePrev}
//               disabled={isAnimating}
//               className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-50 border border-white/20"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="h-5 w-5 text-white group-hover:text-blue-300 transition-colors" />
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={isAnimating}
//               className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-110 disabled:opacity-50 border border-white/20"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="h-5 w-5 text-white group-hover:text-blue-300 transition-colors" />
//             </button>
//           </div>

//           {/* Dots */}
//           <div className="flex gap-2 pt-6">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   if (!isAnimating && index !== activeIndex) {
//                     setIsAnimating(true);
//                     setTimeout(() => {
//                       setActiveIndex(index);
//                       setIsAnimating(false);
//                     }, 150);
//                   }
//                 }}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   index === activeIndex
//                     ? 'w-8 bg-blue-400'
//                     : 'w-2 bg-white/30 hover:bg-blue-300'
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnimatedTestimonials;



import React, { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Michael R.",
    designation: "Crypto Investor (USA)",
    src: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    quote:
      "I've been in the blockchain space for years, and Jaimax stands out for its clarity, transparency, and future potential. I'm excited to be part of its early growth phase.",
    name: "Elena F.",
    designation: "Blockchain Consultant (Germany)",
    src: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "I love how easy it is to use the Jaimax app. The wallet setup was quick, and I feel confident managing my crypto in it. It's perfect for beginners and serious investors alike.",
    name: "Rohit Sharma",
    designation: "Pune",
    src: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
  },
  {
    quote:
      "I've tried a few coins before, but Jaimax has the best experience so far. The team is active, updates are regular, and the app makes everything so convenient.",
    name: "Karthik Menon",
    designation: "Bangalore",
    src: "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg?semt=ais_hybrid&w=740",
  },
  {
    quote:
      "Jaimax Coin gave me a fresh perspective on cryptocurrency. It's secure, user-friendly, and feels like something built for the future of India's digital economy.",
    name: "Ayesha Khan",
    designation: "Hyderabad",
    src: "https://media.gettyimages.com/id/1354842602/photo/portrait-of-a-young-businesswoman-working-on-a-laptop-in-an-office.jpg?s=612x612&w=0&k=20&c=kfP1g2712RiaxsDriIxFo363ARlaL2D591s-22CnIo8=",
  },
];

const AnimatedTestimonials = ({ autoplay = true }) => {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const handleDotClick = (index) => setActive(index);

  useEffect(() => {
    if (autoplay && !isHovered) {
      const interval = setInterval(handleNext, 3500);
      return () => clearInterval(interval);
    }
  }, [autoplay, isHovered, active]);

  const isActive = (index) => index === active;

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 md:p-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent mb-6">
            What Our Users Say
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
            {/* Image Section */}
            <div className="relative w-full sm:max-w-xs lg:w-1/3 h-[220px] sm:h-[280px] lg:h-[350px] transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl transform -rotate-6"></div>
              {testimonials.map((t, i) => (
                <div
                  key={t.src}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    isActive(i)
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-95 z-0 pointer-events-none'
                  }`}
                >
                  <div className="relative h-full group">
                    <img
                      src={t.src}
                      alt={t.name}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl"></div>
                    {/* Name badge */}
                    <div className={`absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-2 border border-white/20 transition-all duration-500 ${
                      isActive(i) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <p className="text-white font-semibold text-base sm:text-lg">{t.name}</p>
                      <p className="text-purple-200 text-xs sm:text-sm">{t.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-2/3 space-y-8">
              <div className="relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 text-5xl sm:text-6xl text-purple-400/30 font-serif select-none pointer-events-none">"</div>
                {/* Quote Text */}
                <div className="relative z-10">
                  <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-light">
                    {testimonials[active].quote.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className="inline-block transition-all duration-300 hover:text-purple-300"
                        style={{
                          animationDelay: `${i * 0.02}s`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            
              {/* Navigation Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Navigation Arrows */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#bbcf28] to-[#20934a] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    {/* Left Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#bbcf28] to-[#20934a] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    {/* Right Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                        index === active
                          ? 'w-8 bg-blue-400'
                          : 'w-2 bg-black/30 hover:bg-blue-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Keyframes for fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default AnimatedTestimonials;


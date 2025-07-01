
// import React from "react";
// import { Gift, Award, ArrowRightCircle, Trophy, Sparkles, Star } from "lucide-react";
// const levels = Array.from({ length: 10 }, (_, i) => ({
//   level: i + 1,
//   progress: i < 3 ? "100%" : "0%",
//   status: i < 3 ? "completed" : "locked",
// }));

// const VictoryScreen = () => {
//   const allLevelsCompleted = levels.every((lvl) => lvl.status === "completed");
//   const completedLevelsCount = levels.filter((lvl) => lvl.status === "completed").length;

//   // Find the very next uncompleted level
//   const nextLevelToUnlock = levels.find((lvl) => lvl.status === "locked");

//   return (
//     <div className="bg-teal-800 text-white px-3 py-6 flex flex-col items-center space-y-6 min-h-screen font-sans overflow-hidden relative sm:px-4 md:px-6">
//       <div
//         className={`relative z-10 max-w-3xl mx-auto bg-white text-teal-800 rounded-2xl p-5 text-center shadow-xl border border-teal-500 transition-all duration-700 ease-in-out
//           ${allLevelsCompleted ? 'mt-20 sm:mt-24' : 'mt-6 sm:mt-10'} `}
//       >
//         <div className="flex flex-col items-center justify-center max-w-3xl">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-800 drop-shadow-lg leading-tight">
//             VICTORY!
//           </h1>
//           <p className="text-base sm:text-lg text-teal-600 mt-1 font-medium">
//             A Moment of <span className="font-bold text-teal-900">Triumph</span>
//           </p>
//         </div>
//       </div>

//       {/* Stats Row - Solid Teal Background */}
//       <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 w-full max-w-8xl z-10 px-3">
//         {/* Levels Achieved */}
//         <div className="bg-teal-700 text-white rounded-lg p-4 flex flex-col items-center flex-1 shadow-md border border-teal-500 hover:border-teal-400 transition-all duration-300 transform hover:scale-105">
//           <span className="text-teal-200 mb-1 font-semibold text-sm sm:text-base">Levels Achieved</span>
//           <span className="text-3xl sm:text-4xl font-extrabold text-white">
//             {completedLevelsCount} / {levels.length}
//           </span>
//         </div>

//         {/* Time Left */}
//         <div className="bg-teal-700 text-white rounded-lg p-4 flex flex-col items-center flex-1 shadow-md border border-teal-500 hover:border-teal-400 transition-all duration-300 transform hover:scale-105">
//           <span className="text-teal-200 mb-1 font-semibold text-sm sm:text-base">⏱ Time Left</span>
//           <span className="text-3xl sm:text-4xl font-extrabold text-white">4h 15m</span>
//         </div>
//       </div>

//       {/* Conditional Content: Completion Message or Continue Journey */}
//       {allLevelsCompleted ? (
//         // Completion Message - Solid White Background with Teal Accents
//         <div className="relative z-10 bg-white text-teal-800 border-l-6 border-teal-500 rounded-xl shadow-lg p-6 w-full max-w-8xl text-center space-y-3 transform scale-105 animate-fade-in-scale border border-teal-400">
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-800 leading-tight flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 drop-shadow">
//             <Trophy size={32} className="text-amber-600 animate-bounce-slow" />
//             <span className="text-teal-800">You've Conquered Them All!</span>
//             <Trophy size={32} className="text-amber-600 animate-bounce-slow" />
//           </h2>
//           <p className="text-base sm:text-lg text-teal-700 mt-1">
//             Congratulations on achieving <strong className="text-teal-900">100% completion!</strong> A truly remarkable feat!
//           </p>
//           <Gift className="mx-auto text-teal-500 w-12 h-12 mt-3 animate-jiggle" />
//           <p className="text-xs sm:text-sm text-gray-600 italic">Your name will be etched in history!</p>
//         </div>
//       ) : (
//         // Continue Journey Section - Solid White Background with Teal Accents
//         <div className="relative z-10 bg-white text-teal-800 border-l-6 border-teal-500 rounded-xl shadow-lg p-6 w-full max-w-8xl text-center space-y-4 animate-fade-in-up border border-teal-400">
//           <h2 className="text-xl sm:text-2xl font-bold text-teal-800 drop-shadow">
//             Your Journey Continues!
//           </h2>
//           <p className="text-base sm:text-lg text-teal-700 font-light">
//             There's more to explore. Your <strong className="text-teal-900">next challenge awaits!</strong>
//           </p>

//           {nextLevelToUnlock && (
//             <div className="bg-teal-100 text-teal-800 rounded-lg p-5 shadow-md border border-teal-300 transform hover:scale-105 transition-transform duration-300 ease-in-out animate-bounce-subtle">
//               <p className="text-sm sm:text-base font-semibold text-teal-600 mb-1">Your Next Target:</p>
//               <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-900 flex items-center justify-center gap-1 drop-shadow">
//                 Level {nextLevelToUnlock.level}
//                 <span className="text-xs text-gray-500 ml-1">(Upcoming)</span>
//               </h3>
//               <p className="text-xs sm:text-sm text-teal-700 mt-1">
//                 Ready to unlock new challenges?
//               </p>
//             </div>
//           )}
//           <button className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto text-sm sm:text-base">
//             Continue <ArrowRightCircle className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
//           </button>
//         </div>
//       )}

//       {/* Leaderboard - Solid Teal Background for container, White for items */}
//       <div className="w-full max-w-8xl z-10 px-3">
//         <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 drop-shadow-lg">
//           Global Leaderboard
//         </h3>
//         <div className="bg-teal-700 rounded-xl shadow-lg p-4 max-h-[300px] overflow-y-auto space-y-3 border border-teal-500">
//           {levels.map((lvl) => (
//             <div
//               key={lvl.level}
//               className={`flex items-center justify-between pb-2 border-b border-teal-600 last:border-b-0 transition-all duration-300 ease-in-out ${
//                 lvl.status === "locked"
//                   ? "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
//                   : "hover:bg-teal-600"
//               } py-1.5`}
//             >
//               <div className="flex items-center gap-3">
//                 <span className="text-teal-200 text-lg sm:text-xl font-extrabold w-6 text-center">
//                   {lvl.level}
//                 </span>
//                 <div>
//                   <p className="font-semibold text-white text-sm sm:text-base">Level {lvl.level}</p>
//                   <p className="text-xs text-gray-300 mt-0.5">
//                     <span className="font-medium text-teal-300">{lvl.progress}</span> —{" "}
//                     <span
//                       className={`capitalize ${
//                         lvl.status === "completed" ? "text-green-300 font-bold" : "text-gray-400"
//                       }`}
//                     >
//                       {lvl.status}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               {lvl.status === "completed" && (
//                 <span className="text-xs sm:text-sm text-teal-300 font-semibold flex items-center gap-1">
//                   <Star size={14} className="text-amber-300" /> Completed!
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VictoryScreen;



// import React from "react";
// import { Gift, Award, ArrowRightCircle, Trophy, Sparkles, Star } from "lucide-react";

// const levels = Array.from({ length: 10 }, (_, i) => ({
//   level: i + 1,
//   progress: i < 3 ? "100%" : "0%",
//   status: i < 3 ? "completed" : "locked",
// }));

// const VictoryScreen = () => {
//   const allLevelsCompleted = levels.every((lvl) => lvl.status === "completed");
//   const completedLevelsCount = levels.filter((lvl) => lvl.status === "completed").length;
//   const nextLevelToUnlock = levels.find((lvl) => lvl.status === "locked");

//   return (
//     <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white px-2 py-4 flex flex-col items-center space-y-3 min-h-screen font-sans overflow-hidden relative"> {/* Reduced px, py, space-y */}      <div
//         className={`relative z-10 max-w-8xl mx-auto bg-white text-teal-800 rounded-lg p-3 text-center shadow-md shadow-teal-500/30 transform transition-all duration-700 ease-in-out
//           ${allLevelsCompleted ? 'scale-105' : 'scale-100'} `}>
//         <div className=" p-2 max-w-8xl">
//           <h1 className=" font-extrabold text-teal-800  ">
//             VICTORY!
//           </h1>
//           <p className="text-sm sm:text-base text-teal-600 font-medium">
//             Triumph Achieved!
//           </p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-2 w-full max-w-8xl z-10"> {/* Reduced gap, max-w */}
//         {/* Levels Achieved */}
//         <div className="bg-teal-600/70 backdrop-blur-sm text-white rounded-md p-2 flex flex-col items-center shadow-sm shadow-teal-500/20 border border-teal-500 hover:border-teal-300 transition-all duration-300"> {/* Reduced p, rounded, shadow */}
//           <span className="text-teal-200 text-xs mb-0.5 font-semibold">Levels</span> {/* Reduced text, mb */}
//           <span className="text-xl sm:text-2xl font-extrabold text-white"> {/* Reduced text */}
//             {completedLevelsCount} / {levels.length}
//           </span>
//         </div>

//         {/* Time Left */}
//         <div className="bg-teal-600/70 backdrop-blur-sm text-white rounded-md p-2 flex flex-col items-center shadow-sm shadow-teal-500/20 border border-teal-500 hover:border-teal-300 transition-all duration-300"> {/* Reduced p, rounded, shadow */}
//           <span className="text-teal-200 text-xs mb-0.5 font-semibold">⏱ Time Left</span> {/* Reduced text, mb */}
//           <span className="text-xl sm:text-2xl font-extrabold text-white">4h 15m</span> {/* Reduced text */}
//         </div>
//       </div>

//       {/* Conditional Content: Completion Message or Continue Journey - Very compact */}
//       {allLevelsCompleted ? (
//         <div className="relative z-10 bg-white text-teal-800 rounded-md shadow-md shadow-amber-500/20 p-4 w-full max-w-8xl text-center space-y-2 transform animate-fade-in-up border-t-2 border-amber-400"> {/* Reduced p, space-y, border */}
//           <h2 className="text-lg sm:text-xl font-extrabold text-teal-800 leading-tight flex items-center justify-center gap-1 drop-shadow"> {/* Reduced text */}
//             <Award size={24} className="text-amber-600 animate-pulse-slow" /> {/* Smaller Award icon */}
//             <span>All Levels Complete!</span>
//           </h2>
//           <p className="text-sm sm:text-base text-teal-700"> {/* Reduced text */}
//             Congrats on <strong className="text-teal-900">100% completion!</strong>
//           </p>
//           <Gift className="mx-auto text-amber-500 w-8 h-8 mt-1 animate-bounce-subtle" /> {/* Smaller Gift icon, mt */}
//           <p className="text-xs text-gray-600 italic">Remarkable feat!</p> {/* Reduced text */}
//         </div>
//       ) : (
//         <div className="relative z-10 bg-white text-teal-800 rounded-md shadow-md shadow-teal-500/20 p-4 w-full max-w-8xl text-center space-y-2  border-b-2 border-teal-400"> {/* Reduced p, space-y, border */}
//           <h2 className="text-lg sm:text-xl font-bold text-teal-800 drop-shadow"> {/* Reduced text */}
//             Journey Continues!
//           </h2>
//           <p className="text-sm sm:text-base text-teal-700 font-light"> {/* Reduced text */}
//             Next <strong className="text-teal-900">challenge awaits!</strong>
//           </p>

//           {nextLevelToUnlock && (
//             <div className="bg-teal-50 text-teal-800 rounded-md p-3 shadow-xs border border-teal-200 transform  transition-transform duration-300 ease-in-out"> {/* Reduced p, rounded, shadow */}
//               <p className="text-xs font-semibold text-teal-600 mb-0.5">Next Up:</p> {/* Reduced text, mb */}
//               <h3 className="text-base sm:text-lg font-extrabold text-teal-900 flex items-center justify-center gap-1"> {/* Reduced text */}
//                 Level {nextLevelToUnlock.level}
//               </h3>
//             </div>
//           )}
          
//         </div>
//       )}

//       {/* Leaderboard - Extremely compact list items and container */}
//       <div className="w-full max-w-8xl z-10"> {/* Reduced max-w */}
//         <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-3 drop-shadow-lg">
//           Global Leaderboard
//         </h3>
//         <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-sm shadow-teal-500/10 p-3  overflow-y-auto space-y-1.5 border-l border-r border-teal-400"> {/* Reduced p, max-h, space-y, border */}
//           {levels.map((lvl) => (
//             <div
//               key={lvl.level}
//               className={`flex items-center justify-between p-1.5 rounded-sm transition-all duration-300 ease-in-out
//                 ${
//                   lvl.status === "locked"
//                     ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100 bg-white/5"
//                     : "bg-teal-500/20 hover:bg-teal-500/40"
//                 }`}
//             > {/* Reduced p, rounded */}
//               <div className="flex items-center gap-2"> {/* Reduced gap */}
//                 <span className="text-teal-100 text-sm font-extrabold w-5 h-5 flex items-center justify-center bg-teal-600 rounded-full shadow-xs"> {/* Even smaller level circle */}
//                   {lvl.level}
//                 </span>
//                 <div>
//                   <p className="font-semibold text-white text-xs">Level {lvl.level}</p> {/* Reduced text */}
//                   <p className="text-[10px] text-gray-300 mt-0.5"> {/* Even smaller text */}
//                     <span className="font-medium text-teal-200">{lvl.progress}</span> —{" "}
//                     <span
//                       className={`capitalize ${
//                         lvl.status === "completed" ? "text-green-300 font-bold" : "text-gray-400"
//                       }`}
//                     >
//                       {lvl.status}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               {lvl.status === "completed" && (
//                 <span className="text-[10px] text-teal-200 font-semibold flex items-center gap-0.5"> {/* Reduced text, gap */}
//                   <Star size={10} className="text-amber-300 animate-spin-slow" /> Clear!
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Animations (adjusted for smaller scale) */}
//       <style jsx>{`
//         @keyframes wiggle {
//           0%, 100% { transform: rotate(-2deg); } /* Less rotation */
//           50% { transform: rotate(2deg); }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.6; } /* Slightly more subtle pulse */
//         }
//         @keyframes bounce-subtle {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-2px); } /* Less bounce */
//         }
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(5px); } /* Less translation */
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pop-in {
//           0% { transform: scale(0.95); opacity: 0; } /* Smaller scale start */
//           100% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-wiggle { animation: wiggle 1s infinite alternate; }
//         .animate-pulse-slow { animation: pulse-slow 2s infinite ease-in-out; }
//         .animate-bounce-subtle { animation: bounce-subtle 1.5s infinite ease-in-out; }
//         .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
//         .animate-pop-in { animation: pop-in 0.3s ease-out forwards; }
//         .animate-spin-slow { animation: spin-slow 10s linear infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default VictoryScreen;




// import React from "react";
// import { Gift, Award, ArrowRightCircle, Trophy, Sparkles, Star } from "lucide-react";

// const levels = Array.from({ length: 10 }, (_, i) => ({
//   level: i + 1,
//   progress: i < 3 ? "100%" : "0%",
//   status: i < 3 ? "completed" : "locked",
// }));

// const VictoryScreen = () => {
//   const allLevelsCompleted = levels.every((lvl) => lvl.status === "completed");
//   const completedLevelsCount = levels.filter((lvl) => lvl.status === "completed").length;
//   const nextLevelToUnlock = levels.find((lvl) => lvl.status === "locked");

//   return (
//     <div className="min-h-screen bg-[#1d8d84] relative overflow-hidden">
    
//       {/* Floating Particles */}
//       <div className="absolute inset-0">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-[#1d8d84] rounded-full opacity-30 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-3 py-4 max-w-8xl">
//         {/* Victory Header */}
//         <div className="text-center mb-4">
//           <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1d8d84] rounded-full mb-3 shadow-lg shadow-[#1d8d84]/30 animate-pulse-glow">
//             <Trophy className="w-6 h-6 text-white animate-bounce-gentle" />
//           </div>
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1d8d84] mb-2 animate-fade-in-up drop-shadow-sm">
//             VICTORY!
//           </h1>
//           <p className="text-sm md:text-base text-[#1d8d84] font-medium animate-fade-in-up animation-delay-300">
//             Triumph Achieved! ✨
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//           {/* Levels Achieved */}
//           <div className="group relative">
//             <div className="absolute -inset-0.5 bg-[#1d8d84] rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
//             <div className="relative bg-white rounded-lg p-3 border border-[#1d8d84]/20 hover:border-[#1d8d84]/40 transition-all duration-300 hover:scale-102 shadow-md">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="w-8 h-8 bg-[#1d8d84] rounded-lg flex items-center justify-center shadow-sm">
//                   <Award className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-[#1d8d84] text-xs font-semibold uppercase tracking-wide">Levels</span>
//               </div>
//               <div className="text-xl font-black text-[#1d8d84] mb-1">
//                 {completedLevelsCount} <span className="text-[#1d8d84]/60">/ {levels.length}</span>
//               </div>
//               <div className="w-full bg-[#1d8d84]/10 rounded-full h-2 overflow-hidden">
//                 <div 
//                   className="h-full bg-[#1d8d84] rounded-full animate-progress-fill"
//                   style={{ width: `${(completedLevelsCount / levels.length) * 100}%` }}
//                 />
//               </div>
//               <p className="text-[#1d8d84]/70 text-xs mt-1 font-medium">Great progress!</p>
//             </div>
//           </div>

//           {/* Time Left */}
//           <div className="group relative">
//             <div className="absolute -inset-0.5 bg-[#1d8d84] rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
//             <div className="relative bg-white rounded-lg p-3 border border-[#1d8d84]/20 hover:border-[#1d8d84]/40 transition-all duration-300 hover:scale-102 shadow-md">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="w-8 h-8 bg-[#1d8d84] rounded-lg flex items-center justify-center shadow-sm">
//                   <span className="text-sm text-white">⏱</span>
//                 </div>
//                 <span className="text-[#1d8d84] text-xs font-semibold uppercase tracking-wide">Time Left</span>
//               </div>
//               <div className="text-xl font-black text-[#1d8d84] mb-1">4h 15m</div>
//               <p className="text-[#1d8d84]/70 text-xs font-medium">Keep it up!</p>
//             </div>
//           </div>
//         </div>

//         {/* Conditional Content */}
//         {allLevelsCompleted ? (
//           <div className="relative mb-4 animate-fade-in-up animation-delay-600">
//             <div className="absolute -inset-0.5 bg-[#1d8d84] rounded-xl blur opacity-20"></div>
//             <div className="relative bg-white rounded-xl p-4 border border-[#1d8d84]/20 text-center shadow-lg">
//               <div className="flex justify-center mb-3">
//                 <div className="relative">
//                   <Gift className="w-10 h-10 text-[#1d8d84] animate-bounce-gentle" />
//                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1d8d84] rounded-full flex items-center justify-center">
//                     <Sparkles className="w-2 h-2 text-white" />
//                   </div>
//                 </div>
//               </div>
//               <h2 className="text-lg font-black text-[#1d8d84] mb-2">
//                 🎉 All Levels Complete! 🎉
//               </h2>
//               <p className="text-sm text-[#1d8d84]/80 mb-3">
//                 Congratulations on achieving <span className="text-[#1d8d84] font-bold">100% completion!</span>
//               </p>
//               <div className="inline-flex items-center space-x-2 bg-[#1d8d84]/10 border border-[#1d8d84]/20 rounded-full px-4 py-2">
//                 <Star className="w-4 h-4 text-[#1d8d84] animate-spin-slow" />
//                 <span className="text-[#1d8d84] font-semibold text-sm">Remarkable!</span>
//                 <Star className="w-4 h-4 text-[#1d8d84] animate-spin-slow" />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="relative mb-4 animate-fade-in-up animation-delay-600">
//             <div className="absolute -inset-0.5 bg-[#1d8d84] rounded-xl blur opacity-20"></div>
//             <div className="relative bg-white rounded-xl p-4 border border-[#1d8d84]/20 text-center shadow-lg">
//               <h2 className="text-lg font-black text-[#1d8d84] mb-2">
//                 🚀 Journey Continues!
//               </h2>
//               <p className="text-sm text-[#1d8d84]/80 mb-3">
//                 Your next <span className="text-[#1d8d84] font-bold">challenge awaits!</span>
//               </p>
              
//               {nextLevelToUnlock && (
//                 <div className="inline-flex items-center space-x-3 bg-[#1d8d84]/10 border border-[#1d8d84]/20 rounded-lg px-4 py-2 hover:bg-[#1d8d84]/20 transition-all duration-300 cursor-pointer group">
//                   <div className="text-left">
//                     <p className="text-[#1d8d84]/70 text-xs font-semibold mb-0.5">Next Up:</p>
//                     <h3 className="text-sm font-black text-[#1d8d84]">Level {nextLevelToUnlock.level}</h3>
//                   </div>
//                   <ArrowRightCircle className="w-5 h-5 text-[#1d8d84] group-hover:translate-x-0.5 transition-transform duration-300" />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Leaderboard */}
//         <div className="animate-fade-in-up animation-delay-900">
//           <h3 className="text-lg font-black text-[#1d8d84] text-center mb-4 flex items-center justify-center space-x-2">
//             <Trophy className="w-5 h-5 text-[#1d8d84]" />
//             <span>Global Leaderboard</span>
//             <Trophy className="w-5 h-5 text-[#1d8d84]" />
//           </h3>
          
//           <div className="relative">
//             <div className="absolute -inset-0.5 bg-[#1d8d84] rounded-xl blur opacity-20"></div>
//             <div className="relative bg-white rounded-xl p-3 border border-[#1d8d84]/20 shadow-lg">
//               <div className="space-y-2">
//                 {levels.map((lvl, index) => (
//                   <div
//                     key={lvl.level}
//                     className={`group flex items-center justify-between p-2 rounded-lg transition-all duration-300 hover:scale-101
//                       ${lvl.status === "locked"
//                         ? "bg-[#1d8d84]/5 border border-[#1d8d84]/10 opacity-60"
//                         : "bg-white border border-[#1d8d84]/15 hover:border-[#1d8d84]/30 shadow-sm hover:shadow-md"
//                       }`}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <div className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm
//                         ${index === 0 ? "bg-[#1d8d84]" :
//                           index === 1 ? "bg-[#1d8d84]/80" :
//                           index === 2 ? "bg-[#1d8d84]/60" :
//                           "bg-[#1d8d84]/90"}`}
//                       >
//                         {lvl.level}
//                         {index < 3 && (
//                           <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#1d8d84] rounded-full flex items-center justify-center">
//                             <Star className="w-2 h-2 text-white" />
//                           </div>
//                         )}
//                       </div>
                      
//                       <div>
//                         <h4 className="font-bold text-[#1d8d84] text-sm">Level {lvl.level}</h4>
//                         <div className="flex items-center space-x-1">
//                           <span className="text-xs text-[#1d8d84]/60">Progress:</span>
//                           <span className="font-semibold text-[#1d8d84] text-xs">{lvl.progress}</span>
//                           <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
//                             ${lvl.status === "completed" 
//                               ? "bg-[#1d8d84]/10 text-[#1d8d84] border border-[#1d8d84]/20" 
//                               : "bg-gray-100 text-gray-500 border border-gray-200"}`}
//                           >
//                             {lvl.status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {lvl.status === "completed" && (
//                       <div className="flex items-center space-x-1 text-[#1d8d84] animate-pulse-gentle">
//                         <Star className="w-3 h-3 animate-spin-slow" />
//                         <span className="font-bold text-xs">Clear!</span>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(15px, -25px) scale(1.05);
//           }
//           66% {
//             transform: translate(-10px, 10px) scale(0.95);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         @keyframes pulse-glow {
//           0%, 100% {
//             box-shadow: 0 0 10px rgba(29, 141, 132, 0.3);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(29, 141, 132, 0.5);
//           }
//         }
        
//         @keyframes bounce-gentle {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-5px);
//           }
//         }
        
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(15px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes progress-fill {
//           from { width: 0%; }
//           to { width: var(--progress-width, 30%); }
//         }
        
//         @keyframes pulse-gentle {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }
        
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         .animate-pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }
        
//         .animate-bounce-gentle {
//           animation: bounce-gentle 2s ease-in-out infinite;
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
        
//         .animate-progress-fill {
//           animation: progress-fill 1.5s ease-out forwards;
//         }
        
//         .animate-pulse-gentle {
//           animation: pulse-gentle 2s ease-in-out infinite;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }
        
//         .hover\\:scale-102:hover {
//           transform: scale(1.02);
//         }
        
//         .hover\\:scale-101:hover {
//           transform: scale(1.01);
//         }
        
//         .animation-delay-300 {
//           animation-delay: 300ms;
//         }
        
//         .animation-delay-600 {
//           animation-delay: 600ms;
//         }
        
//         .animation-delay-900 {
//           animation-delay: 900ms;
//         }
        
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
        
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VictoryScreen;




// import React from "react";
// import { Gift, Award, ArrowRightCircle, Trophy, Sparkles, Star } from "lucide-react";

// const levels = Array.from({ length: 10 }, (_, i) => ({
//   level: i + 1,
//   progress: i < 3 ? "100%" : "0%",
//   status: i < 3 ? "completed" : "locked",
// }));

// const VictoryScreen = () => {
//   const allLevelsCompleted = levels.every((lvl) => lvl.status === "completed");
//   const completedLevelsCount = levels.filter((lvl) => lvl.status === "completed").length;
//   const nextLevelToUnlock = levels.find((lvl) => lvl.status === "locked");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-600 to-teal-800 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full opacity-5 animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full opacity-10 animate-bounce"></div>
//         <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full opacity-5"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-3 py-4 max-w-8xl">
//         {/* Victory Header */}
//         <div className="text-center mb-5">
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full mb-3 shadow-xl">
//             <Trophy className="w-7 h-7 text-teal-600" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
//             VICTORY!
//           </h1>
//           <p className="text-base text-teal-100 font-medium">
//             Triumph Achieved! 🎉
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//           {/* Levels Achieved */}
//           <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
//                 <Award className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-teal-700 text-sm font-semibold">Levels</span>
//             </div>
//             <div className="text-2xl font-black text-teal-800 mb-2">
//               {completedLevelsCount} <span className="text-teal-500">/ {levels.length}</span>
//             </div>
//             <div className="w-full bg-teal-100 rounded-full h-2">
//               <div 
//                 className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-1000"
//                 style={{ width: `${(completedLevelsCount / levels.length) * 100}%` }}
//               />
//             </div>
//           </div>

//           {/* Time Left */}
//           <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center space-x-3 mb-2">
//               <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
//                 <span className="text-sm text-white">⏱</span>
//               </div>
//               <span className="text-teal-700 text-sm font-semibold">Time Left</span>
//             </div>
//             <div className="text-2xl font-black text-teal-800 mb-2">4h 15m</div>
//             <p className="text-teal-600 text-sm">Keep it up!</p>
//           </div>
//         </div>

//         {/* Status Message */}
//         {allLevelsCompleted ? (
//           <div className="bg-white rounded-xl p-5 mb-5 text-center shadow-lg">
//             <div className="flex justify-center mb-3">
//               <Gift className="w-12 h-12 text-teal-600 animate-bounce" />
//             </div>
//             <h2 className="text-xl font-bold text-teal-800 mb-2">
//               🎉 All Levels Complete! 🎉
//             </h2>
//             <p className="text-teal-700 mb-3">
//               Congratulations on achieving <span className="font-bold">100% completion!</span>
//             </p>
//             <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-2">
//               <Star className="w-4 h-4 text-teal-600" />
//               <span className="text-teal-700 font-semibold text-sm">Amazing!</span>
//               <Star className="w-4 h-4 text-teal-600" />
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl p-5 mb-5 text-center shadow-lg">
//             <h2 className="text-xl font-bold text-teal-800 mb-2">
//               🚀 Journey Continues!
//             </h2>
//             <p className="text-teal-700 mb-3">
//               Your next <span className="font-bold">challenge awaits!</span>
//             </p>
            
//             {nextLevelToUnlock && (
//               <div className="inline-flex items-center space-x-3 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-100 transition-all duration-300 cursor-pointer group">
//                 <div className="text-left">
//                   <p className="text-teal-600 text-xs font-semibold">Next Up:</p>
//                   <h3 className="text-sm font-bold text-teal-800">Level {nextLevelToUnlock.level}</h3>
//                 </div>
//                 <ArrowRightCircle className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             )}
//           </div>
//         )}

//         {/* Leaderboard */}
//         <div>
//           <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center space-x-2">
//             <Trophy className="w-5 h-5" />
//             <span>Global Leaderboard</span>
//             <Trophy className="w-5 h-5" />
//           </h3>
          
//           <div className="bg-white rounded-xl p-3 shadow-lg">
//             <div className="space-y-2">
//               {levels.map((lvl, index) => (
//                 <div
//                   key={lvl.level}
//                   className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300
//                     ${lvl.status === "locked"
//                       ? "bg-gray-50 opacity-60"
//                       : "bg-teal-50 hover:bg-teal-100 hover:scale-102"
//                     }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
//                       ${lvl.status === "completed" 
//                         ? "bg-teal-600 text-white" 
//                         : "bg-gray-300 text-gray-600"}`}
//                     >
//                       {lvl.level}
//                       {index < 3 && lvl.status === "completed" && (
//                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
//                           <Star className="w-2 h-2 text-white" />
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <h4 className="font-semibold text-teal-800 text-sm">Level {lvl.level}</h4>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-xs text-teal-600">Progress:</span>
//                         <span className="font-medium text-teal-700 text-xs">{lvl.progress}</span>
//                         <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
//                           ${lvl.status === "completed" 
//                             ? "bg-teal-200 text-teal-800" 
//                             : "bg-gray-200 text-gray-600"}`}
//                         >
//                           {lvl.status}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {lvl.status === "completed" && (
//                     <div className="text-teal-600">
//                       <Star className="w-4 h-4" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         .hover\\:scale-102:hover {
//           transform: scale(1.02);
//         }
        
//         .hover\\:scale-105:hover {
//           transform: scale(1.05);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VictoryScreen;




// import React from "react";
// import { Gift, Award, ArrowRightCircle, Trophy, Sparkles, Star } from "lucide-react";

// const levels = Array.from({ length: 10 }, (_, i) => ({
//   level: i + 1,
//   progress: i < 3 ? "100%" : "0%",
//   status: i < 3 ? "completed" : "locked",
// }));


// const VictoryScreen = () => {
//   const allLevelsCompleted = levels.every((lvl) => lvl.status === "completed");
//   const completedLevelsCount = levels.filter((lvl) => lvl.status === "completed").length;
//   const nextLevelToUnlock = levels.find((lvl) => lvl.status === "locked");
// // Example in your React component before the map function
// const sortedLevels = [...levels].sort((a, b) => {
//   if (a.status === "completed" && b.status !== "completed") {
//     return 1; // 'a' (completed) goes after 'b' (not completed)
//   }
//   if (a.status !== "completed" && b.status === "completed") {
//     return -1; // 'a' (not completed) goes before 'b' (completed)
//   }
//   // Add more sorting logic if needed, e.g., by level number
//   return a.level - b.level;
// });

// // Then use sortedLevels in your map function:
// // {sortedLevels.map((lvl, index) => (...))}
//   return (
//     <div className="min-h-screen bg-[#1d8d84] relative overflow-hidden">
//       {/* Dynamic Background */}
//       <div className="absolute inset-0">
       
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 container mx-auto px-4 py-6 max-w-8xl">
//         {/* Victory Header */}
//         <div className="text-center mb-8">
//           <div className="relative inline-block mb-4">
//             <div className="relative w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/50">
//               <Trophy className="w-8 h-8 text-white " />
//             </div>
//           </div>
          
//           <div className="relative">
//             <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent mb-2 drop-shadow-2xl">
//               VICTORY!
//             </h1>
//             <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent blur-sm"></div>
//           </div>
          
//           <p className="text-lg text-teal-100 font-light tracking-wide">
//             Mission Accomplished 
//           </p>
//         </div>

//         {/* Stats Cards with 3D Effect */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           {/* Levels Card */}
//           <div className="group relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
//             <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
//                       <Award className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping"></div>
//                   </div>
//                   <span className="text-teal-700 font-semibold uppercase tracking-wider text-sm">Levels Acheived</span>
//                 </div>
//               </div>
              
//               <div className="text-3xl font-black text-teal-800 mb-3">
//                 {completedLevelsCount} <span className="text-teal-400 text-2xl">/ {levels.length}</span>
//               </div>
              
//               <div className="relative w-full h-3 bg-teal-100 rounded-full overflow-hidden shadow-inner">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full shadow-sm transition-all duration-1000 ease-out"
//                   style={{ width: `${(completedLevelsCount / levels.length) * 100}%` }}
//                 >
//                   <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <p className="text-teal-600 text-sm mt-2 font-medium">Excellent progress!</p>
//             </div>
//           </div>

//           {/* Time Card */}
//           <div className="group relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
//             <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
//                       <span className="text-white text-lg">⏱</span>
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
//                   </div>
//                   <span className="text-teal-700 font-semibold uppercase tracking-wider text-sm">Time Left</span>
//                 </div>
//               </div>
              
//               <div className="text-3xl font-black text-teal-800 mb-3">4hr</div>
              
//               <div className="relative w-full h-3 bg-teal-100 rounded-full overflow-hidden shadow-inner">
//                 <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full shadow-sm">
//                   <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
              
//               <p className="text-teal-600 text-sm mt-2 font-medium">Stay focused!</p>
//             </div>
//           </div>
//         </div>

//         {/* Status Section */}
//         {allLevelsCompleted ? (
//           <div className="relative mb-8">
//             <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-teal-400 to-yellow-400 rounded-3xl blur opacity-30 animate-pulse"></div>
//             <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/30 text-center shadow-2xl">
//               <div className="relative mb-6">
//                 <Gift className="w-16 h-16 text-teal-600 mx-auto animate-bounce" />
//                 <div className="absolute inset-0 bg-teal-400 blur-xl opacity-30 animate-pulse"></div>
//               </div>
              
//               <h2 className="text-2xl font-black text-teal-800 mb-3">
//                 🎉 Perfect Victory! 🎉
//               </h2>
//               <p className="text-lg text-teal-700 mb-6">
//                 You've achieved <span className="font-black text-teal-800">complete mastery</span> of all challenges!
//               </p>
              
//               <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-50 to-white border-2 border-teal-300 rounded-full px-6 py-3 shadow-lg">
//                 <Star className="w-5 h-5 text-teal-600 animate-spin" />
//                 <span className="text-teal-700 font-bold tracking-wide">LEGENDARY STATUS</span>
//                 <Star className="w-5 h-5 text-teal-600 animate-spin" />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="relative mb-8">
//             <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-20"></div>
//             <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/30 text-center shadow-2xl">
//               <h2 className="text-2xl font-black text-teal-800 mb-3">
//                  The Adventure Continues!
//               </h2>
//               <p className="text-lg text-teal-700 mb-6">
//                 Your next <span className="font-black text-teal-800">epic challenge</span> awaits!
//               </p>
              
//               {nextLevelToUnlock && (
//                 <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-teal-50 to-white border-2 border-teal-300 rounded-2xl px-8 py-4 hover:from-teal-100 hover:to-teal-50 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-lg">
//                   <div className="text-left">
//                     <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Next Challenge</p>
//                     <h3 className="text-xl font-black text-teal-800">Level {nextLevelToUnlock.level}</h3>
//                   </div>
//                   <ArrowRightCircle className="w-7 h-7 text-teal-600 group-hover:translate-x-2 transition-transform duration-300" />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Enhanced Leaderboard */}
//         <div>
//           <div className="text-center mb-6">
//             <h3 className="text-2xl font-black text-white mb-2 flex items-center justify-center space-x-3">
//               {/* <Trophy className="w-6 h-6 text-teal-400" /> */}
//               <span className="bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
//                 Global Leaderboard
//               </span>
//               {/* <Trophy className="w-6 h-6 text-teal-400" /> */}
//             </h3>
//             <div className="w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto"></div>
//           </div>
          
//           <div className="relative">
//             <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-teal-600/20 rounded-3xl blur"></div>
//             <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-2xl">
//               <div className="space-y-3">
//                 {sortedLevels.map((lvl, index) => (
//                   <div
//                     key={lvl.level}
//                     className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-102
//                       ${lvl.status === "locked"
//                         ? "bg-gradient-to-r from-gray-50 to-gray-100 opacity-50"
//                         : "bg-gradient-to-r from-teal-50 to-white hover:from-teal-100 hover:to-teal-50 shadow-md hover:shadow-lg"
//                       }`}
//                   >
//                     <div className="flex items-center justify-between p-4">
//                       <div className="flex items-center space-x-4">
//                         <div className="relative">
//                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg transform transition-transform group-hover:scale-110
//                             ${index === 0 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
//                               index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
//                               index === 2 ? "bg-gradient-to-br from-amber-400 to-yellow-600" :
//                               "bg-gradient-to-br from-teal-500 to-teal-700"}`}
//                           >
//                             {lvl.level}
//                           </div>
                          
//                           {index < 3 && lvl.status === "completed" && (
//                             <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
//                               <Star className="w-3 h-3 text-white" />
//                             </div>
//                           )}
//                         </div>
                        
//                         <div>
//                           <h4 className="font-black text-teal-800 text-lg">Level {lvl.level}</h4>
//                           <div className="flex items-center space-x-2">
//                             <span className="text-sm text-teal-600 font-medium">Progress:</span>
//                             <span className="font-bold text-teal-700">{lvl.progress}</span>
//                             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm
//                               ${lvl.status === "completed" 
//                                 ? "bg-gradient-to-r from-teal-200 to-teal-300 text-teal-800 border border-teal-400" 
//                                 : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 border border-gray-400"}`}
//                             >
//                               {lvl.status}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {lvl.status === "completed" && (
//                         <div className="flex items-center space-x-2 text-teal-600">
//                           <Star className="w-5 h-5 animate-pulse" />
//                           <span className="font-black text-sm">CLEARED!</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Subtle glow effect for completed levels */}
//                     {lvl.status === "completed" && (
//                       <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent pointer-events-none"></div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px);
//           }
//           33% {
//             transform: translateY(-10px) translateX(5px);
//           }
//           66% {
//             transform: translateY(5px) translateX(-5px);
//           }
//         }
        
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }
        
//         .hover\\:scale-102:hover {
//           transform: scale(1.02);
//         }
        
//         .delay-500 {
//           animation-delay: 500ms;
//         }
        
//         .delay-1000 {
//           animation-delay: 1000ms;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VictoryScreen;




import React from "react";
import { Gift, Award, ArrowRightCircle, Trophy, Sparkles, Star } from "lucide-react";

const levels = Array.from({ length: 10 }, (_, i) => ({
  level: i + 1,
  progress: i < 3 ? "100%" : "0%",
  status: i < 3 ? "completed" : "locked",
}));

const VictoryScreen = () => {
  const allLevelsCompleted = levels.every((lvl) => lvl.status === "completed");
  const completedLevelsCount = levels.filter((lvl) => lvl.status === "completed").length;
  const nextLevelToUnlock = levels.find((lvl) => lvl.status === "locked");

  const sortedLevels = [...levels].sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") {
      return 1;
    }
    if (a.status !== "completed" && b.status === "completed") {
      return -1;
    }
    return a.level - b.level;
  });

  return (
    <div className="min-h-screen bg-[#1d8d84] relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {/* Victory Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative inline-block mb-3 sm:mb-4">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/50">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent mb-2 drop-shadow-2xl">
              VICTORY!
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent blur-sm"></div>
          </div>
          
          <p className="text-base sm:text-lg text-teal-100 font-light tracking-wide px-4">
            Mission Accomplished 
          </p>
        </div>

        {/* Stats Cards with 3D Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Levels Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-teal-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-teal-700 font-semibold uppercase tracking-wider text-xs sm:text-sm">Levels Achieved</span>
                </div>
              </div>
              
              <div className="text-2xl sm:text-3xl font-black text-teal-800 mb-2 sm:mb-3">
                {completedLevelsCount} <span className="text-teal-400 text-xl sm:text-2xl">/ {levels.length}</span>
              </div>
              
              <div className="relative w-full h-2 sm:h-3 bg-teal-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full shadow-sm transition-all duration-1000 ease-out"
                  style={{ width: `${(completedLevelsCount / levels.length) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-teal-600 text-xs sm:text-sm mt-2 font-medium">Excellent progress!</p>
            </div>
          </div>

          {/* Time Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-base sm:text-lg">⏱</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                  <span className="text-teal-700 font-semibold uppercase tracking-wider text-xs sm:text-sm">Time Left</span>
                </div>
              </div>
              
              <div className="text-2xl sm:text-3xl font-black text-teal-800 mb-2 sm:mb-3">4hr</div>
              
              <div className="relative w-full h-2 sm:h-3 bg-teal-100 rounded-full overflow-hidden shadow-inner">
                <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-full shadow-sm">
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-teal-600 text-xs sm:text-sm mt-2 font-medium">Stay focused!</p>
            </div>
          </div>
        </div>

        {/* Status Section */}
        {allLevelsCompleted ? (
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-teal-400 to-yellow-400 rounded-3xl blur opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 text-center shadow-2xl">
              <div className="relative mb-4 sm:mb-6">
                <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-teal-600 mx-auto animate-bounce" />
                <div className="absolute inset-0 bg-teal-400 blur-xl opacity-30 animate-pulse"></div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-black text-teal-800 mb-2 sm:mb-3">
                🎉 Perfect Victory! 🎉
              </h2>
              <p className="text-base sm:text-lg text-teal-700 mb-4 sm:mb-6 px-2">
                You've achieved <span className="font-black text-teal-800">complete mastery</span> of all challenges!
              </p>
              
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-teal-50 to-white border-2 border-teal-300 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 animate-spin" />
                <span className="text-teal-700 font-bold tracking-wide text-sm sm:text-base">LEGENDARY STATUS</span>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 animate-spin" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 text-center shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-black text-teal-800 mb-2 sm:mb-3">
                The Adventure Continues!
              </h2>
              <p className="text-base sm:text-lg text-teal-700 mb-4 sm:mb-6 px-2">
                Your next <span className="font-black text-teal-800">epic challenge</span> awaits!
              </p>
              
              {nextLevelToUnlock && (
                <div className="inline-flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-teal-50 to-white border-2 border-teal-300 rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-4 hover:from-teal-100 hover:to-teal-50 hover:scale-105 transition-all duration-300 cursor-pointer group shadow-lg">
                  <div className="text-left">
                    <p className="text-teal-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">Next Challenge</p>
                    <h3 className="text-lg sm:text-xl font-black text-teal-800">Level {nextLevelToUnlock.level}</h3>
                  </div>
                  <ArrowRightCircle className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Leaderboard */}
        <div>
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center justify-center space-x-3">
              <span className="bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
                Global Leaderboard
              </span>
            </h3>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/20 to-teal-600/20 rounded-3xl blur"></div>
            <div className="relative bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-2xl">
              <div className="space-y-2 sm:space-y-3">
                {sortedLevels.map((lvl, index) => (
                  <div
                    key={lvl.level}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-102
                      ${lvl.status === "locked"
                        ? "bg-gradient-to-r from-gray-50 to-gray-100 opacity-50"
                        : "bg-gradient-to-r from-teal-50 to-white hover:from-teal-100 hover:to-teal-50 shadow-md hover:shadow-lg"
                      }`}
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="relative flex-shrink-0">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-white shadow-lg transform transition-transform group-hover:scale-110 text-sm sm:text-base
                            ${index === 0 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
                              index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                              index === 2 ? "bg-gradient-to-br from-amber-400 to-yellow-600" :
                              "bg-gradient-to-br from-teal-500 to-teal-700"}`}
                          >
                            {lvl.level}
                          </div>
                          
                          {index < 3 && lvl.status === "completed" && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                              <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-teal-800 text-base sm:text-lg truncate">Level {lvl.level}</h4>
                          <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                            <span className="text-xs sm:text-sm text-teal-600 font-medium">Progress:</span>
                            <span className="font-bold text-teal-700 text-xs sm:text-sm">{lvl.progress}</span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm
                              ${lvl.status === "completed" 
                                ? "bg-gradient-to-r from-teal-200 to-teal-300 text-teal-800 border border-teal-400" 
                                : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 border border-gray-400"}`}
                            >
                              {lvl.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {lvl.status === "completed" && (
                        <div className="flex items-center space-x-1 sm:space-x-2 text-teal-600 flex-shrink-0 ml-2">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                          <span className="font-black text-xs sm:text-sm hidden sm:inline">CLEARED!</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Subtle glow effect for completed levels */}
                    {lvl.status === "completed" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }

        @media (max-width: 640px) {
          .hover\\:scale-102:hover {
            transform: scale(1.01);
          }
        }
      `}</style>
    </div>
  );
};

export default VictoryScreen;

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

  return (
    <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white px-2 py-4 flex flex-col items-center space-y-3 min-h-screen font-sans overflow-hidden relative"> {/* Reduced px, py, space-y */}      <div
        className={`relative z-10 max-w-8xl mx-auto bg-white text-teal-800 rounded-lg p-3 text-center shadow-md shadow-teal-500/30 transform transition-all duration-700 ease-in-out
          ${allLevelsCompleted ? 'scale-105' : 'scale-100'} `}>
        <div className=" p-2 max-w-8xl">
          <h1 className=" font-extrabold text-teal-800  ">
            VICTORY!
          </h1>
          <p className="text-sm sm:text-base text-teal-600 font-medium">
            Triumph Achieved!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full max-w-8xl z-10"> {/* Reduced gap, max-w */}
        {/* Levels Achieved */}
        <div className="bg-teal-600/70 backdrop-blur-sm text-white rounded-md p-2 flex flex-col items-center shadow-sm shadow-teal-500/20 border border-teal-500 hover:border-teal-300 transition-all duration-300"> {/* Reduced p, rounded, shadow */}
          <span className="text-teal-200 text-xs mb-0.5 font-semibold">Levels</span> {/* Reduced text, mb */}
          <span className="text-xl sm:text-2xl font-extrabold text-white"> {/* Reduced text */}
            {completedLevelsCount} / {levels.length}
          </span>
        </div>

        {/* Time Left */}
        <div className="bg-teal-600/70 backdrop-blur-sm text-white rounded-md p-2 flex flex-col items-center shadow-sm shadow-teal-500/20 border border-teal-500 hover:border-teal-300 transition-all duration-300"> {/* Reduced p, rounded, shadow */}
          <span className="text-teal-200 text-xs mb-0.5 font-semibold">⏱ Time Left</span> {/* Reduced text, mb */}
          <span className="text-xl sm:text-2xl font-extrabold text-white">4h 15m</span> {/* Reduced text */}
        </div>
      </div>

      {/* Conditional Content: Completion Message or Continue Journey - Very compact */}
      {allLevelsCompleted ? (
        <div className="relative z-10 bg-white text-teal-800 rounded-md shadow-md shadow-amber-500/20 p-4 w-full max-w-8xl text-center space-y-2 transform animate-fade-in-up border-t-2 border-amber-400"> {/* Reduced p, space-y, border */}
          <h2 className="text-lg sm:text-xl font-extrabold text-teal-800 leading-tight flex items-center justify-center gap-1 drop-shadow"> {/* Reduced text */}
            <Award size={24} className="text-amber-600 animate-pulse-slow" /> {/* Smaller Award icon */}
            <span>All Levels Complete!</span>
          </h2>
          <p className="text-sm sm:text-base text-teal-700"> {/* Reduced text */}
            Congrats on <strong className="text-teal-900">100% completion!</strong>
          </p>
          <Gift className="mx-auto text-amber-500 w-8 h-8 mt-1 animate-bounce-subtle" /> {/* Smaller Gift icon, mt */}
          <p className="text-xs text-gray-600 italic">Remarkable feat!</p> {/* Reduced text */}
        </div>
      ) : (
        <div className="relative z-10 bg-white text-teal-800 rounded-md shadow-md shadow-teal-500/20 p-4 w-full max-w-8xl text-center space-y-2  border-b-2 border-teal-400"> {/* Reduced p, space-y, border */}
          <h2 className="text-lg sm:text-xl font-bold text-teal-800 drop-shadow"> {/* Reduced text */}
            Journey Continues!
          </h2>
          <p className="text-sm sm:text-base text-teal-700 font-light"> {/* Reduced text */}
            Next <strong className="text-teal-900">challenge awaits!</strong>
          </p>

          {nextLevelToUnlock && (
            <div className="bg-teal-50 text-teal-800 rounded-md p-3 shadow-xs border border-teal-200 transform  transition-transform duration-300 ease-in-out"> {/* Reduced p, rounded, shadow */}
              <p className="text-xs font-semibold text-teal-600 mb-0.5">Next Up:</p> {/* Reduced text, mb */}
              <h3 className="text-base sm:text-lg font-extrabold text-teal-900 flex items-center justify-center gap-1"> {/* Reduced text */}
                Level {nextLevelToUnlock.level}
              </h3>
            </div>
          )}
          
        </div>
      )}

      {/* Leaderboard - Extremely compact list items and container */}
      <div className="w-full max-w-8xl z-10"> {/* Reduced max-w */}
        <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-3 drop-shadow-lg">
          Global Leaderboard
        </h3>
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-sm shadow-teal-500/10 p-3  overflow-y-auto space-y-1.5 border-l border-r border-teal-400"> {/* Reduced p, max-h, space-y, border */}
          {levels.map((lvl) => (
            <div
              key={lvl.level}
              className={`flex items-center justify-between p-1.5 rounded-sm transition-all duration-300 ease-in-out
                ${
                  lvl.status === "locked"
                    ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100 bg-white/5"
                    : "bg-teal-500/20 hover:bg-teal-500/40"
                }`}
            > {/* Reduced p, rounded */}
              <div className="flex items-center gap-2"> {/* Reduced gap */}
                <span className="text-teal-100 text-sm font-extrabold w-5 h-5 flex items-center justify-center bg-teal-600 rounded-full shadow-xs"> {/* Even smaller level circle */}
                  {lvl.level}
                </span>
                <div>
                  <p className="font-semibold text-white text-xs">Level {lvl.level}</p> {/* Reduced text */}
                  <p className="text-[10px] text-gray-300 mt-0.5"> {/* Even smaller text */}
                    <span className="font-medium text-teal-200">{lvl.progress}</span> —{" "}
                    <span
                      className={`capitalize ${
                        lvl.status === "completed" ? "text-green-300 font-bold" : "text-gray-400"
                      }`}
                    >
                      {lvl.status}
                    </span>
                  </p>
                </div>
              </div>
              {lvl.status === "completed" && (
                <span className="text-[10px] text-teal-200 font-semibold flex items-center gap-0.5"> {/* Reduced text, gap */}
                  <Star size={10} className="text-amber-300 animate-spin-slow" /> Clear!
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animations (adjusted for smaller scale) */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); } /* Less rotation */
          50% { transform: rotate(2deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; } /* Slightly more subtle pulse */
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); } /* Less bounce */
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(5px); } /* Less translation */
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { transform: scale(0.95); opacity: 0; } /* Smaller scale start */
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-wiggle { animation: wiggle 1s infinite alternate; }
        .animate-pulse-slow { animation: pulse-slow 2s infinite ease-in-out; }
        .animate-bounce-subtle { animation: bounce-subtle 1.5s infinite ease-in-out; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-pop-in { animation: pop-in 0.3s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
};

export default VictoryScreen;
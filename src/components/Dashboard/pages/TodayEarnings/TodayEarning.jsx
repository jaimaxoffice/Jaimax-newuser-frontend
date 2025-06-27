// import React from "react";
// import { Gift } from "lucide-react";

// const levels = Array.from({ length: 10 }, (_, i) => ({
//   level: i + 1,
//   progress: "0%",
//   status: "locked",
// }));

// const VictoryScreen = () => {
//   return (
//     <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white px-4 py-4 flex flex-col items-center space-y-4">
//       {/* Top Victory Banner */}
//       <div className="bg-white text-teal-700 rounded-2xl px-12 py-3 text-center shadow-lg">
//         <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
//            VICTORY
//         </h1>
//       </div>

//       {/* Stats Row (Same Line) */}
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-7xl">
//         {/* Levels Achieved */}
//         <div className="bg-white text-teal-800 rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 shadow-md">
//           <span className="text-teal-600 mb-1 font-semibold"> Levels Achieved</span>
//           <span className="text-xl font-bold">0</span>
//         </div>

//         {/* Time Left */}
//         <div className="bg-white text-teal-800 rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 shadow-md">
//           <span className="text-teal-600 mb-1 font-semibold">⏱ Time Left</span>
//           <span className="text-xl font-bold">0h</span>
//         </div>
//       </div>

//       {/* Completion Message */}
//       <div className="bg-white border-l-4 border-teal-400 text-teal-800 rounded-xl shadow-xl p-10 w-full max-w-7xl text-center space-y-0">
//         <h2 className="text-3xl font-extrabold text-teal-700">You've done it!</h2>
//         <p className="text-lg">Congratulations! You've completed all levels!</p>
//         <Gift className="mx-auto text-teal-600 w-8 h-8 mt-2" />
//       </div>

//       {/* Leaderboard */}
//       <div className="w-full max-w-7xl">
//         <h3 className="text-xl font-bold text-white text-center mb-4">Leaderboard</h3>
//         <div className="bg-white rounded-xl shadow-md p-4 max-h-[400px] overflow-y-auto space-y-4">
//           {levels.map((lvl) => (
//             <div
//               key={lvl.level}
//               className="flex items-center justify-between border-b pb-3 last:border-b-0"
//             >
//               <div className="flex items-center gap-4">
//                 <span className="text-teal-600 text-lg font-bold"> {lvl.level}</span>
//                 <div>
//                   <p className="font-medium text-teal-800">Level {lvl.level}</p>
//                   <p className="text-sm text-gray-600">
//                     {lvl.progress} — <span className="text-gray-400">{lvl.status}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>  
//       </div>
//     </div>
//   );
// };

// export default VictoryScreen;



import React from "react";
import { Gift } from "lucide-react";

// Sample level data (3 completed, rest locked)
const levels = Array.from({ length: 10 }, (_, i) => ({
  level: i + 1,
  progress: i < 3 ? "100%" : "0%",
  status: i < 3 ? "completed" : "locked",
}));

const VictoryScreen = () => {
  return (
    <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white px-4 py-4 flex flex-col items-center space-y-4 min-h-screen">
      {/* Top Victory Banner */}
      <div className="bg-white text-teal-700 rounded-2xl px-12 py-3 text-center shadow-lg">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          VICTORY
        </h1>
      </div>

      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-7xl">
        {/* Levels Achieved */}
        <div className="bg-white text-teal-800 rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 shadow-md">
          <span className="text-teal-600 mb-1 font-semibold">Levels Achieved</span>
          <span className="text-xl font-bold">
            {levels.filter((lvl) => lvl.status === "completed").length}
          </span>
        </div>

        {/* Time Left */}
        <div className="bg-white text-teal-800 rounded-lg p-6 flex flex-col items-center w-full sm:w-1/2 shadow-md">
          <span className="text-teal-600 mb-1 font-semibold">⏱ Time Left</span>
          <span className="text-xl font-bold">4h</span>
        </div>
      </div>

      {/* Completion Message */}
      {levels.every((lvl) => lvl.status === "completed") && (
        <div className="bg-white border-l-4 border-teal-400 text-teal-800 rounded-xl shadow-xl p-10 w-full max-w-7xl text-center space-y-0">
          <h2 className="text-3xl font-extrabold text-teal-700">You've done it!</h2>
          <p className="text-lg">Congratulations! You've completed all levels!</p>
          <Gift className="mx-auto text-teal-600 w-8 h-8 mt-2" />
        </div>
      )}

      {/* Leaderboard */}
     {/* Leaderboard */}
<div className="w-full max-w-7xl ">
  <h3 className="text-xl font-bold text-white text-center mb-4">Leaderboard</h3>
  <div className="bg-white rounded-xl shadow-md p-4 max-h-[400px] overflow-y-auto space-y-4">
    {levels.map((lvl) => (
      <div
        key={lvl.level}
        className={`flex items-center justify-between border-b pb-3 last:border-b-0 transition ${
          lvl.status === "locked" ? "blur-sm opacity-50 grayscale hover:blur-none" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="text-teal-600 text-lg font-bold">{lvl.level}</span>
          <div>
            <p className="font-medium text-teal-800">Level {lvl.level}</p>
            <p className="text-sm text-gray-600">
              {lvl.progress} — <span className="text-gray-400 capitalize">{lvl.status}</span>
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default VictoryScreen;

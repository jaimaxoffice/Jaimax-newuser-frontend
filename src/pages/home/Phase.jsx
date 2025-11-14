// import React, { useRef, useState } from "react";
// import { CheckCircle, Clock, TrendingUp } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import '../../index.css'
// const phaseData = [
//   {
//     status: "Live",
//     phaseNo: "Phase 1",
//     tokens: "10 Billion Tokens",
//     price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
//     button: "Buy Now",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 2",
//     tokens: "20 Billion Tokens",
//     price: "Price INR 0.05 - 0.50 Paisa (0.00061-0.0061 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 3",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 0.60 - 1.53 Paisa (0.0071-0.018 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 4",
//     tokens: "30 Billion Tokens",
//     price: "Price INR 1.60 - 3.00 Paisa (0.019-0.036 USD)",
//     button: "Coming Soon",
//   },
//   {
//     status: "Upcoming",
//     phaseNo: "Phase 5",
//     tokens: "25 Billion Tokens",
//     price: "Price INR 3.15 - 4.10 Paisa (0.037-0.049 USD)",
//     button: "Coming Soon",
//   },
// ];

// export default function GrowthPlanTimeline() {
//   const cardRefs = useRef([]);
//   const navigate=useNavigate();
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);

//   // Snap-scroll to a card when its circular icon is clicked
//   const handleIconClick = (index) => {
//     if (cardRefs.current[index]) {
//       cardRefs.current[index].scrollIntoView({ behavior: "smooth", inline: "center" });
//       setActiveIndex(index);
//       setTimeout(() => setActiveIndex(null), 300);
//     }
//   };

//   // Navigate to the register page on *Live* cards
//   const handleBuyNow = (item) => {
//     if (item.status === "Live") {
//       navigate("/register");
//       // console.log("Navigate to register page");
//     }
//   };

//   return (
//   <div
//   className="
//     flex flex-nowrap gap-3 sm:gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory
//     scroll-smooth scrollbar-none pb-12 sm:pb-16 md:pb-20 w-full 
//     pl-4 sm:pl-6 md:pl-6 pr-4 sm:pr-6 md:pr-8
//   "
// >
//       <section className="text-white px-2 sm:px-4 md:px-8 lg:px-10 xl:px-12 font-sans">
//         {/* Heading */}
//         <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 md:px-6">
//           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white drop-shadow-lg">
//             Company's Growth Plan Outlook
//           </h2>
//         </div>

//         {/* Horizontal timeline line (all screens) */}
//         <div className="relative">
//           <div
//             className="absolute left-0 right-0 h-0.5 sm:h-1 bg-teal-600"
//             style={{ top: "24px" }}
//             aria-hidden="true"
//           />
          
//           <div
//             className="
//               flex flex-nowrap gap-3 sm:gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory
//               scroll-smooth scrollbar-hide pb-12 sm:pb-16 md:pb-20 w-full 
//               pl-4 sm:pl-6 md:pl-8 pr-4 sm:pr-6 md:pr-8
//             "
//             role="list"
//           >
//             {phaseData.map((item, idx) => {
//               const { status, phaseNo, tokens, price, button } = item;
//               const shouldBlurContent = status !== "Live";
//               const isActive = idx === activeIndex;

//               return (
//                 <div
//                   key={idx}
//                   ref={(el) => (cardRefs.current[idx] = el)}
//                   tabIndex={0}
//                   role="listitem"
//                   className={`
//                     relative flex-shrink-0 snap-center
//                     w-64 sm:w-72 md:w-80 lg:w-80
//                     flex flex-col items-center focus:outline-none cursor-pointer
//                     transition-transform duration-300
//                     ${isActive ? "scale-105 sm:scale-110 z-30" : "scale-100"}
//                   `}
//                   onMouseEnter={() => setHoveredIndex(idx)}
//                   onMouseLeave={() => setHoveredIndex(null)}
//                 >
//                   {/* Circular icon */}
//                   <button
//                     onClick={() => handleIconClick(idx)}
//                     className={`
//                       flex items-center justify-center 
//                       w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
//                       rounded-full shadow-lg transition-transform duration-200
//                       ${status === "Live" ? "bg-green-400" : "bg-white"}
//                     `}
//                     aria-label={`Navigate to ${phaseNo}`}
//                     type="button"
//                   >
//                     {status === "Live" ? (
//                       <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-teal-800" />
//                     ) : (
//                       <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-teal-800" />
//                     )}
//                   </button>

//                   {/* Phase label on hover (desktop only) */}
//                   <div
//                     className={`
//                       hidden lg:block absolute top-[48px] sm:top-[56px] md:top-[64px] 
//                       text-yellow-300 font-semibold text-center text-sm sm:text-base
//                       mt-2 w-20 sm:w-24 md:w-32 opacity-0 pointer-events-none 
//                       transition-opacity duration-300 drop-shadow-lg
//                       ${hoveredIndex === idx ? "opacity-100 pointer-events-auto" : ""}
//                     `}
//                     style={{ left: "50%", transform: "translateX(-50%)" }}
//                   >
//                     {phaseNo}
//                   </div>

//                   {/* Phase label (mobile/tablet) */}
//                   <span
//                     className="
//                       mt-2 sm:mt-3 md:mt-4 lg:mt-0 lg:rotate-90 lg:absolute lg:top-1/2
//                       lg:-translate-y-1/2 font-semibold text-xs sm:text-sm
//                       tracking-widest text-teal-100 select-none drop-shadow-lg
//                     "
//                     style={{ left: "-32px", zIndex: "1000" }}
//                   >
//                     {phaseNo}
//                   </span>

//                   {/* Card content - Fixed height for even sizing */}
//                   <article
//                     className={`
//                       mt-3 sm:mt-4 md:mt-6 lg:mt-16 bg-gradient-to-br from-[#1c984a] to-[#166a34] rounded-lg 
//                       p-4 sm:p-5 md:p-6 shadow-xl relative w-full 
//                       flex flex-col justify-between border border-teal-700/30
//                       h-64 sm:h-72 md:h-80
//                     `}
//                   >
//                     {/* Status badge */}
//                     <div className="relative mb-3">
//                       <p
//                         className={`
//                           text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full 
//                           inline-flex items-center gap-1.5 font-semibold w-fit
//                           shadow-lg
//                           ${status === "Live"
//                             ? "bg-green-500 text-white animate-pulse"
//                             : "bg-[#b8cc26] text-black absolute right-0 sm:right-2"}
//                         `}
//                         style={
//                           status !== "Live"
//                             ? { top: "-24px", right: "0" }
//                             : {}
//                         }
//                       >
//                         {status === "Live" ? (
//                           <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                         ) : (
//                           <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
//                         )}
//                         <span className="text-xs sm:text-sm font-bold">{status}</span>
//                       </p>
//                     </div>

//                     {/* Content */}
//                     <div
//                       style={{
//                         filter: shouldBlurContent ? "blur(3px)" : "none",
//                         pointerEvents: shouldBlurContent ? "none" : "auto",
//                         marginTop: status !== "Live" ? "1.5rem" : "0",
//                       }}
//                       className="flex flex-col gap-3 sm:gap-4 flex-1 justify-between"
//                     >
//                       {/* Tokens */}
//                       <div className="text-center">
//                         <p className="text-lg sm:text-xl md:text-2xl leading-tight text-white font-bold drop-shadow-lg">
//                           {tokens}
//                         </p>
//                       </div>
                      
//                       {/* Price */}
//                       <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
//                         <p className="text-sm sm:text-base md:text-lg text-white leading-tight font-semibold drop-shadow-lg">
//                           {price}
//                         </p>
//                       </div>

//                       {/* Button */}
//                       <div className="mt-auto">
//                         <button
//                           onClick={() => handleBuyNow(item)}
//                           className={`
//                             px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4
//                             rounded-full text-sm sm:text-base font-bold
//                             w-full transition-all duration-200 shadow-lg
//                             ${status === "Live"
//                               ? "bg-[#1d8d84] text-white hover:from-green-600 hover:to-green-700 hover:shadow-xl transform hover:scale-105"
//                               : "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed"}
//                           `}
//                           disabled={status !== "Live"}
//                         >
//                           <span className="drop-shadow-sm">{button}</span>
//                         </button>
//                       </div>
//                     </div>
//                   </article>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import React, { useRef, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const phaseData = [
  {
    status: "Live",
    phaseNo: "Phase 1",
    tokens: "10 Billion Tokens",
    price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
    button: "Buy Now",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 2",
    tokens: "20 Billion Tokens",
    price: "Price INR 0.05 - 0.50 Paisa (0.00061-0.0061 USD)",
    button: "Coming Soon",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 3",
    tokens: "25 Billion Tokens",
    price: "Price INR 0.60 - 1.53 Paisa (0.0071-0.018 USD)",
    button: "Coming Soon",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 4",
    tokens: "30 Billion Tokens",
    price: "Price INR 1.60 - 3.00 Paisa (0.019-0.036 USD)",
    button: "Coming Soon",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 5",
    tokens: "25 Billion Tokens",
    price: "Price INR 3.15 - 4.10 Paisa (0.037-0.049 USD)",
    button: "Coming Soon",
  },
];

export default function GrowthPlanTimeline() {
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // Scroll to card
  const handleIconClick = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });

      setActiveIndex(index);
      setTimeout(() => setActiveIndex(null), 300);
    }
  };

  // Navigate when Live
  const handleBuyNow = (item) => {
    if (item.status === "Live") {
      navigate("/register");
    }
  };

  return (
    <section className="text-white px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 font-sans">
      {/* Heading */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
          Company's Growth Plan Outlook
        </h2>
      </div>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Horizontal line */}
        <div
          className="absolute left-0 right-0 h-1 bg-teal-600"
          style={{ top: "24px" }}
        />

        {/* Scrollable cards */}
        <div
          className="
            flex flex-nowrap gap-4 md:gap-6 
            overflow-x-auto scroll-smooth snap-x snap-mandatory 
            scrollbar-none pb-16 w-full 
            px-4
          "
          role="list"
        >
          {phaseData.map((item, idx) => {
            const { status, phaseNo, tokens, price, button } = item;
            const shouldBlur = status !== "Live";
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`
                  relative flex-shrink-0 snap-center 
                  w-64 sm:w-72 md:w-80 
                  flex flex-col items-center
                  transition-transform duration-300 cursor-pointer
                  ${isActive ? "scale-105 sm:scale-110 z-30" : ""}
                `}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Top clickable icon */}
                <button
                  onClick={() => handleIconClick(idx)}
                  className={`
                    flex items-center justify-center 
                    w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg
                    ${status === "Live" ? "bg-green-400" : "bg-white"}
                  `}
                >
                  {status === "Live" ? (
                    <CheckCircle className="w-6 h-6 text-teal-900" />
                  ) : (
                    <Clock className="w-6 h-6 text-teal-900" />
                  )}
                </button>

                {/* Hover label (desktop only) */}
                <div
                  className={`
                    hidden lg:block absolute mt-2 text-yellow-300 font-semibold 
                    text-center text-sm drop-shadow-lg transition-opacity
                    ${hoveredIndex === idx ? "opacity-100" : "opacity-0"}
                  `}
                  style={{ top: "56px" }}
                >
                  {phaseNo}
                </div>

                {/* Mobile label */}
                <span className="mt-3 text-xs sm:text-sm font-semibold tracking-widest text-teal-100">
                  {phaseNo}
                </span>

                {/* Card */}
                <article
                  className="
                    mt-4 bg-gradient-to-br from-[#1c984a] to-[#166a34] 
                    rounded-lg p-6 shadow-xl border border-teal-700/30
                    w-full h-72 sm:h-80 flex flex-col justify-between
                  "
                >
                  {/* Status badge */}
                  <p
                    className={`
                      text-sm px-4 py-1.5 rounded-full font-bold w-fit shadow-lg 
                      ${status === "Live" ? "bg-green-500 text-white animate-pulse" : "bg-[#b8cc26] text-black"}
                    `}
                  >
                    {status}
                  </p>

                  {/* Content */}
                  <div
                    style={{
                      filter: shouldBlur ? "blur(3px)" : "none",
                      pointerEvents: shouldBlur ? "none" : "auto",
                    }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-xl sm:text-2xl text-white font-bold text-center">
                      {tokens}
                    </p>

                    <div className="bg-white/10 p-3 rounded-lg border border-white/20 text-center">
                      <p className="text-sm sm:text-base font-semibold">
                        {price}
                      </p>
                    </div>

                    <button
                      disabled={status !== "Live"}
                      onClick={() => handleBuyNow(item)}
                      className={`
                        px-8 py-3 rounded-full font-bold w-full
                        transition-all duration-200 shadow-lg
                        ${status === "Live"
                          ? "bg-[#1d8d84] text-white hover:scale-105"
                          : "bg-gray-500 text-gray-200 cursor-not-allowed"}
                      `}
                    >
                      {button}
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

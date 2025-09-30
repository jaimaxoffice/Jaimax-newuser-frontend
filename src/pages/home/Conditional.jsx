// import React, { useState, useEffect } from "react";
// import CoinPricePopup from "./popup";
// import DussehraPopup from "./Dussera";

// const ConditionalPopup = () => {
//   const [activePopup, setActivePopup] = useState(null);

//   useEffect(() => {
//     const checkPopups = () => {
//       const now = new Date();
//       const month = now.getMonth(); // 0-based
//       const date = now.getDate();
//       const hours = now.getHours();
//       const minutes = now.getMinutes();

//       const priceClosed = sessionStorage.getItem("pricePopupClosed") === "true";
//       const dussehraClosed =
//         sessionStorage.getItem("dusseraPopupClosed") === "true";

//       // Only run for Sept 29
//       if (month === 8 && date === 29) {
//         // 12:37–12:40 → only Price
//         if (hours === 15 && minutes >= 48 && minutes < 59) {
//           if (!priceClosed) {
//             setActivePopup("price");
//             localStorage.setItem("lastShownPopup", "price"); // always Price
//           } else setActivePopup(null);
//           return;
//         }
//         if (hours === 16 && minutes >= 0 && minutes < 59) {
//           const nextPopup =
//             Math.floor(Date.now() / 1000) % 2 === 0
//               ? !priceClosed
//                 ? "price"
//                 : !dussehraClosed
//                 ? "dussehra"
//                 : null
//               : !dussehraClosed
//               ? "dussehra"
//               : !priceClosed
//               ? "price"
//               : null;

//           if (nextPopup) setActivePopup(nextPopup);
//           return;
//         }
//       }

//       setActivePopup(null); // outside time window
//     };

//     checkPopups();

//     const timer = setInterval(checkPopups, 30 * 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleClose = (type) => {
//     if (type === "price") sessionStorage.setItem("pricePopupClosed", "true");
//     if (type === "dussehra")
//       sessionStorage.setItem("dusseraPopupClosed", "true");
//     setActivePopup(null);
//     // Do NOT update localStorage here — alternation is only on refresh
//   };

//   return (
//     <>
//       {activePopup === "price" && (
//         <CoinPricePopup onClose={() => handleClose("price")} />
//       )}
//       {activePopup === "dussehra" && (
//         <DussehraPopup onClose={() => handleClose("dussehra")} />
//       )}
//     </>
//   );
// };

// export default ConditionalPopup;
import React, { useState, useEffect } from "react";
import CoinPricePopup from "./popup";
import DussehraPopup from "./Dussera";

const ConditionalPopup = () => {
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const checkPopups = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-based
      const date = now.getDate();
      const priceClosed = sessionStorage.getItem("pricePopupClosed") === "true";
      const dussehraClosed =
        sessionStorage.getItem("dusseraPopupClosed") === "true";

      // ---------- Sept 30 → Oct 1, 2025 ----------
      if ((month === 8 && date === 30) || (month === 9 && date === 1)) {
        if (!priceClosed) {
          setActivePopup("price");
        } else {
          setActivePopup(null);
        }
        return;
      }

      // ---------- Oct 2, 2025 ----------
      if (month === 9 && date === 2) {
        // Track refresh count in sessionStorage
        let refreshCount = parseInt(
          sessionStorage.getItem("refreshCountOct2") || "0"
        );
        refreshCount++;
        sessionStorage.setItem("refreshCountOct2", refreshCount);

        const nextPopup =
          refreshCount % 2 === 1
            ? !priceClosed
              ? "price"
              : !dussehraClosed
              ? "dussehra"
              : null
            : !dussehraClosed
            ? "dussehra"
            : !priceClosed
            ? "price"
            : null;

        setActivePopup(nextPopup);
        return;
      }

      // ---------- Oct 3, 2025 ----------
      if (month === 9 && date === 3) {
        setActivePopup(null); // no popup
        return;
      }

      // default: no popup
      setActivePopup(null);
    };

    checkPopups();

    const timer = setInterval(checkPopups, 30 * 1000); // recheck periodically
    return () => clearInterval(timer);
  }, []);

  const handleClose = (type) => {
    if (type === "price") sessionStorage.setItem("pricePopupClosed", "true");
    if (type === "dussehra")
      sessionStorage.setItem("dusseraPopupClosed", "true");
    setActivePopup(null);
    // Do NOT change alternation count here
  };

  return (
    <>
      {activePopup === "price" && (
        <CoinPricePopup onClose={() => handleClose("price")} />
      )}
      {activePopup === "dussehra" && (
        <DussehraPopup onClose={() => handleClose("dussehra")} />
      )}
    </>
  );
};

export default ConditionalPopup;

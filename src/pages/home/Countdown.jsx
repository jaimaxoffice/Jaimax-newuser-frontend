// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import jaimaxGoa from "../../assets/Images/jaimaxGoa.png";
// import GaneshWeb from '../../assets/Images/GaneshWeb.jpg';
// const PriceRiseAlert = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkVisibility = () => {
//       const now = new Date();
//       const visibleFromDate = new Date("2025-08-24T00:00:00");
//       const invisibleFromDate = new Date("2025-09-30T00:00:00");
//       setIsVisible(now >= visibleFromDate && now < invisibleFromDate);
//     };
//     checkVisibility();
//     const id = setInterval(checkVisibility, 60000);
//     return () => clearInterval(id);
//   }, []);

//   if (!isVisible) return null;

//   const handleClose = () => setIsVisible(false);
//   const handleImageClick = () => {
//     setIsVisible(false); // optional: hide instantly
//     navigate("/home");
//   };

//   return (
//     <div
//       className="price-alert-container"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Jaimax Goa"
//     >
//       <button className="close-button" onClick={handleClose} aria-label="Close">
//         ×
//       </button>

//       <div className="alert-card image-only">
//         <button
//           className="image-button"
//           onClick={handleImageClick}
//           aria-label="Go to Home"
//         >
//           <img src={jaimaxGoa} alt="Jaimax Goa" className="popup-image" />
//         </button>
//       </div>

//       <style>{`
//         .price-alert-container {
//           font-family: "Inter", -apple-system, sans-serif;
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 420px;
//           max-width: 90vw;
//           z-index: 9999;
//           filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4));
//           animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
//         }
//         .close-button {
//           position: absolute;
//           top: 8px;
//           right: 5px;
//           width: 24px;
//           height: 24px;
//           background: rgba(255, 255, 255, 0.9);
//           color: #155724;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//           cursor: pointer;
//           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
//           z-index: 10;
//           border: none;
//           padding: 0;
//           line-height: 1;
//         }
//         .close-button:hover { transform: scale(1.1); }
//         @keyframes popIn {
//           from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
//           to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
//         }
//         .alert-card.image-only {
//           background: transparent;
//           border-radius: 16px;
//           overflow: hidden;
//           padding: 0;
//         }
//         .image-button {
//           width: 100%;
//           padding: 0;
//           margin: 0;
//           background: transparent;
//           border: none;
//           cursor: pointer;
//           display: block;
//           line-height: 0;
//         }
//         .image-button:focus-visible {
//           outline: 2px solid #d3ed0c;
//           outline-offset: 4px;
//           border-radius: 12px;
//         }
//         .popup-image {
//           display: block;
//           width: 100%;
//           height: auto;
//           object-fit: cover;
//         }
//         @media (max-width: 480px) {
//           .price-alert-container { width: 85%; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PriceRiseAlert;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jaimaxGoa from "../../assets/Images/jaimaxGoa.png";
import GaneshWeb from "../../assets/Images/GaneshWeb.jpg";

const PriceRiseAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGanesh, setShowGanesh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVisibility = () => {
      const now = new Date();

      // main visibility (whole campaign)
      const visibleFromDate = new Date("2025-08-24T00:00:00");
      const invisibleFromDate = new Date("2025-09-30T00:00:00");

      // Ganesh special window
      const ganeshFrom = new Date("2025-08-27T00:00:00");
      const ganeshTo = new Date("2025-08-30T00:00:00");

      const campaignVisible = now >= visibleFromDate && now < invisibleFromDate;

      if (campaignVisible) {
        setIsVisible(true);

        // if inside Ganesh window, start with Ganesh
        if (now >= ganeshFrom && now < ganeshTo) {
          setShowGanesh(true);
        } else {
          setShowGanesh(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    checkVisibility();
    const id = setInterval(checkVisibility, 60000);
    return () => clearInterval(id);
  }, []);

  // switch Ganesh → Jaimax after 2 sec
  useEffect(() => {
    if (showGanesh) {
      const timer = setTimeout(() => setShowGanesh(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showGanesh]);

  if (!isVisible) return null;

  const handleClose = () => setIsVisible(false);
  const handleImageClick = () => {
    setIsVisible(false);
    navigate("/home");
  };

  return (
    <div
      className="price-alert-container"
      role="dialog"
      aria-modal="true"
      aria-label="Jaimax Goa"
    >
      <button className="close-button" onClick={handleClose} aria-label="Close">
        ×
      </button>

      <div className="alert-card image-only">
        <button
          className="image-button"
          onClick={handleImageClick}
          aria-label="Go to Home"
        >
          <img
            src={showGanesh ? GaneshWeb : jaimaxGoa}
            alt="Popup"
            className="popup-image fade-in"
          />
        </button>
      </div>

      <style>{`
        .price-alert-container {
          font-family: "Inter", -apple-system, sans-serif;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 420px;
          max-width: 90vw;
          z-index: 9999;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4));
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .close-button {
          position: absolute;
          top: 8px;
          right: 5px;
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.9);
          color: #155724;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          z-index: 10;
          border: none;
          padding: 0;
          line-height: 1;
        }
        .close-button:hover { transform: scale(1.1); }
        @keyframes popIn {
          from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .alert-card.image-only {
          background: transparent;
          border-radius: 16px;
          overflow: hidden;
          padding: 0;
        }
        .image-button {
          width: 100%;
          padding: 0;
          margin: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          display: block;
          line-height: 0;
        }
        .image-button:focus-visible {
          outline: 2px solid #d3ed0c;
          outline-offset: 4px;
          border-radius: 12px;
        }
        .popup-image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .popup-image.fade-in {
          opacity: 1;
        }
        @media (max-width: 480px) {
          .price-alert-container { width: 85%; }
        }
      `}</style>
    </div>
  );
};

export default PriceRiseAlert;

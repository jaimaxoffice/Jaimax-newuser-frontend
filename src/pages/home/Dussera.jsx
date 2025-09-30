import React, { useState, useEffect } from "react";
import Dussera from "../../assets/Dussehra.jpg";

const DusseraPopup = ({ onCelebrate = () => {},onClose = () => {},forceVisible = false }) => {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
    } else {
      const shouldShowPopup = sessionStorage.getItem("dusseraPopupClosed") !== "true";
      setIsVisible(shouldShowPopup);
    }
  }, [forceVisible]);
  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("dusseraPopupClosed", "true");
    onClose(); // Important: call the onClose prop
  };
  const handleImageClick = () => {
    onCelebrate();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60] p-3">
      <div className="relative bg-gradient-to-br from-yellow-400 via-red-500 to-orange-600 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-black/20 rounded-full p-1.5 z-10"
          aria-label="Close"
        >
          ✖
        </button>

        {/* Just the image */}
        <div className="p-4">
          <img 
            src={Dussera} 
            alt="Happy Dussehra" 
            className="w-full max-w-md rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
            onClick={handleImageClick}
          />
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm -z-10"
        onClick={handleClose}
      />
    </div>
  );
};

export default DusseraPopup;
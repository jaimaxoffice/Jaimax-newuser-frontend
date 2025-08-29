import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jaimaxGoa from "../../assets/Images/jaimaxGoa.png";

const PriceRiseAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const STORAGE_KEY = "priceAlertCampaign"; // Use a specific key for this campaign

    const checkVisibility = () => {
      const now = new Date();

      // Campaign date range
      const visibleFromDate = new Date("2025-08-24T00:00:00");
      const invisibleFromDate = new Date("2025-09-30T00:00:00");
      
      // Check if we're within the campaign period
      const campaignActive = now >= visibleFromDate && now < invisibleFromDate;
      
      // Check if user has manually dismissed this campaign
      const userDismissed = sessionStorage.getItem(`${STORAGE_KEY}_dismissed`) === "true";
      
      // Only show if campaign is active and user hasn't dismissed it
      const shouldBeVisible = campaignActive && !userDismissed;
      
      setIsVisible(shouldBeVisible);
      
      // Store the current campaign state
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
          campaignActive,
          checkedAt: now.toISOString()
        }));
      } catch {
        // Ignore storage errors
      }
    };

    // First check session storage to avoid flicker
    try {
      // Check if user has dismissed this popup
      if (sessionStorage.getItem(`${STORAGE_KEY}_dismissed`) === "true") {
        setIsVisible(false);
        return; // Exit early if dismissed
      }
      
      // Otherwise check campaign timing
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && "campaignActive" in parsed) {
          setIsVisible(Boolean(parsed.campaignActive));
        } else {
          checkVisibility();
        }
      } else {
        checkVisibility();
      }
    } catch {
      checkVisibility();
    }

    // Re-check periodically
    const id = setInterval(checkVisibility, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    // Remember that user closed this popup
    try {
      sessionStorage.setItem("priceAlertCampaign_dismissed", "true");
    } catch {
      // Ignore storage errors
    }
  };

  const handleImageClick = () => {
    setIsVisible(false);
    navigate("/dashboard");
    // Remember that user interacted with this popup
    try {
      sessionStorage.setItem("priceAlertCampaign_dismissed", "true");
    } catch {
      // Ignore storage errors
    }
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
          <img src={jaimaxGoa} alt="Popup" className="popup-image fade-in" />
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
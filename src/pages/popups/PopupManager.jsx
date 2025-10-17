import React, { useEffect, useState } from 'react';
import { useGetActivePopupQuery } from './popupApiSlice';
import PriceRiseAlertStyle1 from './popup1';

import CoinPricePopup from './CoinPricePopup1';

const PopupManager = () => {
  const { data, isLoading, isError } = useGetActivePopupQuery();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (data?.success && data?.data) {
      const popupId = data.data._id;
      const dismissed = sessionStorage.getItem(`popup_dismissed_${popupId}`);
      
      if (!dismissed) {
        setShowPopup(true);
      }
    }
  }, [data]);

  const handleClose = () => {
    if (data?.data?._id) {
      sessionStorage.setItem(`popup_dismissed_${data.data._id}`, 'true');
    }
    setShowPopup(false);
  };

  // Don't render if loading, error, no data, or dismissed
  if (isLoading || isError || !data?.success || !data?.data || !showPopup) {
    return null;
  }

  const activePopup = data.data;
  const { popupType, popupStyle } = activePopup;

  const renderPopup = () => {
    // Image Popups
    if (popupType === 'image') {
      const props = { 
        data: activePopup, 
        onClose: handleClose, 
        imageUrl: activePopup.imageSignedUrl 
      };      if (popupStyle === 1) return <PriceRiseAlertStyle1 {...props} />;
    }
    if (popupType === 'coinPrice') {
      return (
        <CoinPricePopup
          coinName={activePopup.coinName}
          coinSymbol={activePopup.coinSymbol}
          oldPriceINR={activePopup.oldPriceINR}
          newPriceINR={activePopup.newPriceINR}
          oldPriceUSD={activePopup.oldPriceUSD}
          newPriceUSD={activePopup.newPriceUSD}
          startDate={activePopup.startDate}
          endDate={activePopup.endDate}
          onClose={handleClose}
          forceVisible={true}
          theme={`style${popupStyle}`}
           description={activePopup.description}
          buttonText={activePopup.buttonText}
        />
      );
    }

    return null;
  };

  return <>{renderPopup()}</>;
};

export default PopupManager;


// import PropTypes from "prop-types";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import digiLocker from "../../../../assets/digilockermodel.svg";
// import Loader from "../../../Loader/loader";

// /**
//  * DigiLocker Modal Component
//  * @param {*} { show, onHide, onClickDigiLocker }
//  * @return {*}
//  */
// function DigiLockerModal({ show, onHide, onClickDigiLocker }) {
//   const [staticLoading, setStaticLoading] = useState(false);

//   /**
//    * This method is used to navigate to digiLocker when clicked on the image
//    */
//   const onClickDigiLockerImage = () => {
//     setStaticLoading(true);
//     onClickDigiLocker();
//     setStaticLoading(false);
//   };

//   if (!show) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onHide}
//       />
      
//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div 
//           className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transform transition-all"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Modal Header */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-lg">
//             <h5 className="text-lg font-semibold text-white m-0">
//               KYC Verification
//             </h5>
//             <Link
//               to="/dashboard"
//               className="text-white hover:text-gray-200 transition-colors duration-200 no-underline"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
//               </svg>
//             </Link>
//           </div>

//           {/* Modal Body */}
//           <div className="p-6 text-sm">
//             <div className="text-center">
//               <h6 className="text-base font-medium text-gray-800 mb-4">
//                 Verify your KYC with DigiLocker{" "}
//                 <span className="text-red-500">*</span>
//               </h6>
//               <button
//                 className="bg-transparent border-0 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 rounded-lg"
//                 onClick={onClickDigiLockerImage}
//                 disabled={staticLoading}
//               >
//                 <img
//                   src={digiLocker}
//                   alt="digiLockerIcon"
//                   className="w-30 h-30 py-2 mx-auto"
//                   style={{ width: "120px", height: "120px" }}
//                 />
//               </button>
//               <p className="text-xs text-gray-600 mt-2">
//                 Click on the DigiLocker icon to proceed with verification
//               </p>
//             </div>
//           </div>

//           {/* Optional Footer with Cancel Button */}
//           <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
//             <button
//               onClick={onHide}
//               className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Loading Overlay */}
//       {staticLoading && <Loader />}
//     </>
//   );
// }

// /**
//  * PropTypes validation
//  */
// DigiLockerModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onHide: PropTypes.func.isRequired,
//   onClickDigiLocker: PropTypes.func.isRequired,
// };

// export default DigiLockerModal;
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import digiLocker from "../../../../assets/digilockermodel.svg";
import Loader from "../../../Loader/loader";
import { useNavigate } from "react-router-dom";
/**
 * DigiLocker Modal Component
 * @param {*} { show, onHide, onClickDigiLocker }
 * @return {*}
 */
function DigiLockerModal({ show, onHide, onClickDigiLocker }) {
  const [staticLoading, setStaticLoading] = useState(false);
  const navigate=useNavigate();
  /**
   * This method is used to navigate to digiLocker when clicked on the image
   * Fixed: Removed premature setStaticLoading(false) and let parent handle loading state
   */
  const onClickDigiLockerImage = async () => {
    setStaticLoading(true);
    try {
      // Call the parent's DigiLocker handler
      await onClickDigiLocker();
    } catch (error) {
      // console.error("DigiLocker error:", error);
    } finally {
      // Reset loading state after the operation
      setStaticLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onHide}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-lg">
            <h5 className="text-lg font-semibold text-white m-0">
              KYC Verification
            </h5>
            {/* Fixed: Close button instead of Link to dashboard */}
            <button
              onClick={()=>{navigate('/dashboard')}}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-md hover:bg-white hover:bg-opacity-20"
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 text-sm">
            <div className="text-center">
              <h6 className="text-base font-medium text-gray-800 mb-4">
                Verify your KYC with DigiLocker{" "}
                <span className="text-red-500">*</span>
              </h6>
              
              {/* DigiLocker Button */}
              <button
                className="bg-transparent border-0 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={onClickDigiLockerImage}
                disabled={staticLoading}
                type="button"
              >
                <img
                  src={digiLocker}
                  alt="digiLockerIcon"
                  className="w-30 h-30 py-2 mx-auto"
                  style={{ width: "120px", height: "120px" }}
                />
              </button>
              
              <p className="text-xs text-gray-600 mt-2">
                Click on the DigiLocker icon to proceed with verification
              </p>

              {/* Loading indicator inside modal when processing */}
              {staticLoading && (
                <div className="mt-4 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-teal-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm text-gray-600">Connecting to DigiLocker...</span>
                </div>
              )}
            </div>
          </div>

                  </div>
      </div>

      {/* Global Loading Overlay - Keep this for consistency with original implementation */}
      {staticLoading && <Loader />}
    </>
  );
}

/**
 * PropTypes validation
 */
DigiLockerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onClickDigiLocker: PropTypes.func.isRequired,
};

export default DigiLockerModal;
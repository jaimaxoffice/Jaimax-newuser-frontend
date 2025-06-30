// import "bootstrap/dist/css/bootstrap.min.css";
// import PropTypes from "prop-types";
// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import digiLocker from "../../../../assets/digilocker.jpg";

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

//   return (
//     <Modal
//       show={show}
//       centered
//       backdrop="static"
//       keyboard={false}
//       onHide={onHide}
//       className="paymentModal"
//     >
//       <Modal.Header className="d-flex justify-content-between title">
//         <Modal.Title>
//           <h5 className="m-0">KYC Verification</h5>
//         </Modal.Title>
//         <Link
//           to="/home"
//           style={{
//             textDecoration: "none",
//             fontSize: "18px",
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             style={{ fill: "#fff" }}
//           >
//             <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
//           </svg>
//         </Link>
//       </Modal.Header>
//       <Modal.Body style={{ fontSize: "14px", textWrap: "wrap" }}>
//         <div className="container text-center">
//           <h6>
//             Verify your KYC with DigiLocker{" "}
//             <span className="text-danger"> *</span>
//           </h6>
//           <button
//             className="bg-transparent border-0"
//             onClick={onClickDigiLockerImage}
//           >
//             <img
//               src={digiLocker}
//               alt="digiLockerIcon"
//               className="img-fluid py-2"
//               style={{ width: "120px", height: "120px" }}
//             />
//           </button>
//         </div>
//       </Modal.Body>
//       {staticLoading && <Loader />}
//     </Modal>
//   );
// }

// /**
//  */
// DigiLockerModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onHide: PropTypes.func.isRequired,
//   onClickDigiLocker: PropTypes.func.isRequired,
// };

// export default DigiLockerModal;





import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import digiLocker from "../../../../assets/digilocker.jpg";
// Assuming you have a Loader component, otherwise, you'd need to define it with Tailwind
// import Loader from "./Loader";

/**
 * DigiLocker Modal Component
 * @param {*} { show, onHide, onClickDigiLocker }
 * @return {*}
 */
function DigiLockerModal({ show, onHide, onClickDigiLocker }) {
  const [staticLoading, setStaticLoading] = useState(false);
  const modalRef = useRef(null);

  // Effect to handle keyboard (Escape key) for closing the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && show) {
        onHide();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onHide]);

  // Effect to manage body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Prevent scrolling on body
    } else {
      document.body.style.overflow = "unset"; // Restore body scrolling
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [show]);

  /**
   * This method is used to navigate to digiLocker when clicked on the image
   */
  const onClickDigiLockerImage = () => {
    setStaticLoading(true);
    onClickDigiLocker();
    // In a real-world scenario, you might want to set staticLoading to false
    // only after the onClickDigiLocker callback has completed its asynchronous operation.
    setStaticLoading(false);
  };

  if (!show) {
    return null; // Don't render anything if modal is not shown
  }

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      // Close modal when clicking outside of the content (backdrop)
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          // If backdrop is "static", don't close on backdrop click
          // For this example, we assume `onHide` should always be callable if backdrop isn't strict.
          // If you need a 'static' backdrop like react-bootstrap, remove this onClick.
          // Since the original was `backdrop="static"`, I'll remove this default close on backdrop click
          // to maintain similar behavior. If you want to allow clicking outside to close, re-add this.
          // onHide();
        }
      }}
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-sm w-full mx-4" // Centered, responsive width
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
          <h5 className="m-0 text-white text-lg font-semibold">
            KYC Verification
          </h5>
          <Link
            to="/dashboard"
            className="text-white text-lg no-underline hover:text-gray-200"
            aria-label="Go to Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
            </svg>
          </Link>
          {/* You could also add a close button (X) for the modal */}
          {/* <button
            onClick={onHide}
            className="ml-auto text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </button> */}
        </div>

        {/* Modal Body */}
        <div className="p-4 text-sm break-words">
          <div className="text-center">
            <h6 className="text-base mb-4">
              Verify your KYC with DigiLocker{" "}
              <span className="text-red-500"> *</span>
            </h6>
            <button
              className="bg-transparent border-0 p-0 focus:outline-none" // Ensure focus styles are handled
              onClick={onClickDigiLockerImage}
              aria-label="Verify with DigiLocker"
            >
              <img
                src={digiLocker}
                alt="DigiLocker Icon"
                className="max-w-full h-auto py-2 w-32 h-32 object-contain mx-auto" // mx-auto to center the image within the button
              />
            </button>
          </div>
        </div>

        {/* Loader (Conditional) */}
        {staticLoading && (
          <div className="flex justify-center items-center p-4">
            {/* Replace with your actual Loader component or Tailwind spinner */}
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            {/* <Loader /> */}
          </div>
        )}
      </div>
    </div>
  );
}

DigiLockerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onClickDigiLocker: PropTypes.func.isRequired,
};

export default DigiLockerModal;
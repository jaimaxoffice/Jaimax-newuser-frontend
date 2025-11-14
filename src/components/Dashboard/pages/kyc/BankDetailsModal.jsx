// // BankDetailsModal.jsx
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const BankDetailsModal = ({ show, onClose, bankDetails, onSubmit, isCountryCodeIndia, loading }) => {
//   const [formData, setFormData] = useState({
//     bank_name: bankDetails?.bank_name || "",
//     ifsc_code: bankDetails?.ifsc_code || "",
//     bank_account: bankDetails?.bank_account || "",
//     upi_id: bankDetails?.upi_id || ""
//   });
  
//   const [errors, setErrors] = useState({});

//   const toUpperCase = (text) => {
//     return text ? text.toUpperCase() : '';
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Validate IFSC Code
//     if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) {
//       return;
//     }
    
//     // Validate UPI ID
//     if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) {
//       return;
//     }

//     // Validate Bank Name: Allow only alphabetic characters (a-z, A-Z)
//     if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) {
//       return;
//     }

//     // For bank account, only allow numbers
//     if (name === "bank_account" && !/^[0-9]*$/.test(value)) {
//       return;
//     }

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.bank_name)
//       newErrors.bank_name = "The bank name field is mandatory.";
//     if (!formData.ifsc_code)
//       newErrors.ifsc_code = `The ${isCountryCodeIndia ? "ifsc" : "bank"} code field is mandatory.`;
//     if (!formData.bank_account)
//       newErrors.bank_account = "The bank account field is mandatory.";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       onSubmit(formData);
//     }
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-bold text-gray-900">Edit Bank Details</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             {isCountryCodeIndia && (
//               <div>
//                 <label htmlFor="modal_upi_id" className="block text-sm font-medium text-gray-700 mb-1">
//                   UPI Number
//                 </label>
//                 <input
//                   type="text"
//                   id="modal_upi_id"
//                   autoComplete="off"
//                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                   name="upi_id"
//                   placeholder="Enter UPI number"
//                   value={formData.upi_id}
//                   onChange={handleChange}
//                 />
//                 {errors.upi_id && (
//                   <p className="mt-1 text-sm text-red-500">{errors.upi_id}</p>
//                 )}
//               </div>
//             )}
            
//             <div>
//               <label htmlFor="modal_bank_account" className="block text-sm font-medium text-gray-700 mb-1">
//                 Bank Account Number <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="modal_bank_account"
//                 autoComplete="off"
//                 className="w-full px-3 py-2  bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                 name="bank_account"
//                 placeholder="Enter bank account number"
//                 value={formData.bank_account}
//                 onChange={handleChange}
//               />
//               {errors.bank_account && (
//                 <p className="mt-1 text-sm text-red-500">{errors.bank_account}</p>
//               )}
//             </div>
            
//             <div>
//               <label htmlFor="modal_bank_name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Bank Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="modal_bank_name"
//                 autoComplete="off"
//                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                 name="bank_name"
//                 placeholder="Enter bank name"
//                 value={formData.bank_name}
//                 onChange={handleChange}
//               />
//               {errors.bank_name && (
//                 <p className="mt-1 text-sm text-red-500">{errors.bank_name}</p>
//               )}
//             </div>
            
//             <div>
//               <label htmlFor="modal_ifsc_code" className="block text-sm font-medium text-gray-700 mb-1">
//                 Bank {isCountryCodeIndia && "IFSC"} Code <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="modal_ifsc_code"
//                 autoComplete="off"
//                 className="w-full px-3  bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                 name="ifsc_code"
//                 placeholder="Enter bank code"
//                 value={toUpperCase(formData.ifsc_code)}
//                 onChange={handleChange}
//               />
//               {errors.ifsc_code && (
//                 <p className="mt-1 text-sm text-red-500">{errors.ifsc_code}</p>
//               )}
//             </div>
//           </div>
          
//           <div className="flex justify-end mt-6 space-x-3">
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
//               onClick={onClose}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Updating...
//                 </span>
//               ) : (
//                 "Update Bank Details"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankDetailsModal;


// BankDetailsModal.jsx
import React, { useState, useEffect } from "react";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";

const BankDetailsModal = ({ show, onClose, bankDetails, onSubmit, isCountryCodeIndia, loading }) => {
  const [formData, setFormData] = useState({
    bank_name: "",
    ifsc_code: "",
    bank_account: "",
    upi_id: ""
  });
  
  const [errors, setErrors] = useState({});
  const [animateIn, setAnimateIn] = useState(false);

  // Update form data when bankDetails prop changes
  useEffect(() => {
    if (bankDetails) {
      setFormData({
        bank_name: bankDetails.bank_name || "",
        ifsc_code: bankDetails.ifsc_code || "",
        bank_account: bankDetails.bank_account || "",
        upi_id: bankDetails.upi_id || ""
      });
    }
  }, [bankDetails]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = 'auto';
    }
    
    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const toUpperCase = (text) => {
    return text ? text.toUpperCase() : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) return;
    if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "bank_account" && !/^[0-9]*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bank_name.trim())
      newErrors.bank_name = "Bank name is required";
    if (!formData.ifsc_code.trim())
      newErrors.ifsc_code = `${isCountryCodeIndia ? "IFSC" : "Bank"} code is required`;
    if (!formData.bank_account.trim())
      newErrors.bank_account = "Account number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error("Please fill all required fields", {
        position: "top-center"
      });
    }
  };

  const handleCloseWithAnimation = () => {
    setAnimateIn(false);
    setTimeout(() => onClose(), 300);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-0">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm bg-black transition-opacity duration-300 ease-in-out ${animateIn ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleCloseWithAnimation}
      ></div>
      
      {/* Modal Card */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto transform transition-all duration-300 ease-in-out ${
          animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } max-h-[90vh] overflow-auto`}
      >
        {/* Decorative Gradient Header */}
        <div className="h-2 sm:h-3 bg-gradient-to-r from-teal-500 to-teal-400 rounded-t-2xl sticky top-0 z-10"></div>
        
        {/* Modal Content */}
        <div className="p-5 sm:p-6 md:p-8">
          {/* Header with Title and Close Button */}
          <div className="flex items-center justify-between mb-5 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Update Bank Details</h2>
            <button 
              onClick={handleCloseWithAnimation}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* UPI Number Field - Only for India */}
            {isCountryCodeIndia && (
              <div className="space-y-1.5">
                <label htmlFor="modal_upi_id" className="block text-sm font-medium text-gray-700">
                  UPI ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="modal_upi_id"
                    name="upi_id"
                    autoComplete="off"
                    placeholder="name@bank"
                    className={`pl-9 sm:pl-10 w-full py-2.5 sm:py-3 bg-gray-50 border ${
                      errors.upi_id ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base`}
                    value={formData.upi_id}
                    onChange={handleChange}
                  />
                </div>
                {errors.upi_id && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.upi_id}</p>
                )}
              </div>
            )}
            
            {/* Bank Account Number Field */}
            <div className="space-y-1.5">
              <label htmlFor="modal_bank_account" className="block text-sm font-medium text-gray-700">
                Bank Account Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="modal_bank_account"
                  name="bank_account"
                  autoComplete="off"
                  placeholder="Enter bank account number"
                  className={`pl-9 sm:pl-10 w-full py-2.5 sm:py-3 bg-gray-50 border ${
                    errors.bank_account ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base`}
                  value={formData.bank_account}
                  onChange={handleChange}
                />
              </div>
              {errors.bank_account && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.bank_account}</p>
              )}
            </div>
            
            {/* Bank Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="modal_bank_name" className="block text-sm font-medium text-gray-700">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00.496-1.868l-7-4zM3 9v6h4v-6H3zm6 0v6h2V9H9zm4 0v6h4V9h-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="modal_bank_name"
                  name="bank_name"
                  autoComplete="off"
                  placeholder="Enter bank name"
                  className={`pl-9 sm:pl-10 w-full py-2.5 sm:py-3 bg-gray-50 border ${
                    errors.bank_name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base`}
                  value={formData.bank_name}
                  onChange={handleChange}
                />
              </div>
              {errors.bank_name && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.bank_name}</p>
              )}
            </div>
            
            {/* IFSC/Bank Code Field */}
            <div className="space-y-1.5">
              <label htmlFor="modal_ifsc_code" className="block text-sm font-medium text-gray-700">
                {isCountryCodeIndia ? "IFSC Code" : "Bank Code"} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="modal_ifsc_code"
                  name="ifsc_code"
                  autoComplete="off"
                  placeholder={isCountryCodeIndia ? "e.g. HDFC0001233" : "Enter bank code"}
                  className={`pl-9 sm:pl-10 w-full py-2.5 sm:py-3 bg-gray-50 border ${
                    errors.ifsc_code ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-1 transition-all duration-200 text-sm sm:text-base`}
                  value={toUpperCase(formData.ifsc_code)}
                  onChange={handleChange}
                />
              </div>
              {errors.ifsc_code && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.ifsc_code}</p>
              )}
            </div>
          </form>
          
          {/* Action Buttons - Stack on mobile, side by side on larger screens */}
          <div className="flex flex-col sm:flex-row sm:justify-end mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
              onClick={handleCloseWithAnimation}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                "Update Details"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsModal;
// import React from "react";
// import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const LogoutModal = ({ onCancel, onConfirm }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear user data and token from localStorage
//     localStorage.removeItem('userdata');
//     localStorage.removeItem('token');
    
//     // You might also want to clear all localStorage if needed
//     // localStorage.clear();
    
//     // Call onConfirm callback if provided
//     if (onConfirm) {
//       onConfirm();
//     }
    
//     // Navigate to home/login page
//     navigate("/");
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white w-full max-w-sm rounded-xl shadow-xl px-6 py-8 text-center">
//         <div className="flex flex-col items-center">
//           <div className="bg-red-100 p-4 rounded-full mb-4">
//             <LogOut size={36} className="text-red-600" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800">
//             Confirm Logout
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Are you sure you want to logout from your account?
//           </p>
          
//           <div className="mt-6 flex justify-center gap-4">
//             <button
//               onClick={onCancel}
//               className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogoutModal;



import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onCancel, onConfirm }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem('userdata');
    localStorage.removeItem('token');
    
    // You might also want to clear all localStorage if needed
    // localStorage.clear();
    
    // Call onConfirm callback if provided
    if (onConfirm) {
      onConfirm();
    }
    
    // Navigate to home/login page
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-xl px-4 py-6 sm:px-6 sm:py-8 text-center mx-4">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
            <LogOut size={24} className="text-red-600 sm:w-9 sm:h-9" />
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 px-2">
            Confirm Logout
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 px-2 leading-relaxed">
            Are you sure you want to logout from your account?
          </p>
          
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 w-full">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
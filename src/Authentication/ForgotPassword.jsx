// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MailIcon, ArrowLeft } from 'lucide-react';
// import icon from '../assets/Images/jaimacxoin.png'; // Replace with actual path

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) return;
//     // You can replace this with an API call
//     console.log('Reset link sent to:', email);
//     setSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex">
//       {/* Left Section (Brand / Visual) */}
//       <div className="w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative hidden lg:flex flex-col justify-center items-center text-white p-12">
//         <div className="relative w-56 h-56 mb-6 transform transition-all duration-700 hover:scale-105">
//           <img src={icon} alt="Logo" className="w-full h-full object-contain" />
//           <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
//           <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
//         </div>
//         <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
//           Reset Your Password
//         </h2>
//         <p className="text-teal-50 text-center text-lg leading-relaxed max-w-md">
//           Forgot your password? Don’t worry — we’ll send you a link to reset it!
//         </p>
//       </div>

//       {/* Right Section (Form) */}
//       <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
//         <div className="w-full max-w-md">
//           <div className="flex items-center gap-2 mb-4 text-teal-700 cursor-pointer" onClick={() => navigate('/login')}>
//             <ArrowLeft size={18} />
//             <span className="text-sm font-medium">Back to Login</span>
//           </div>

//           <div className="text-center mb-6">
//             <MailIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
//             <h2 className="text-2xl font-bold text-teal-800">Forgot Password</h2>
//             <p className="text-gray-600 text-sm mt-2">
//               Enter your registered email to receive a password reset link.
//             </p>
//           </div>

//           {!submitted ? (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="email"
//                 placeholder="example@domain.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
//               />
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-300"
//               >
//                 Send Reset Link
//               </button>
//             </form>
//           ) : (
//             <div className="text-center text-green-600 font-medium">
//               ✅ A reset link has been sent to your email.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MailIcon, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
// import { useForgotMutation } from './authApiSlice';
// import icon from '../assets/Images/jaimaxcoin.png'; // replace with your logo path

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [notification, setNotification] = useState(null);
//   const [forgot, { isLoading }] = useForgotMutation();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setNotification({ type: 'error', message: 'Please enter your email.' });
//       return;
//     }

//     try {
//       const res = await forgot({ email }).unwrap();

//       if (res?.success) {
//         setNotification({
//           type: 'success',
//           message: res.message || 'Reset link sent to your email!',
//         });
//       } else {
//         setNotification({
//           type: 'error',
//           message: res.message || 'Unable to send reset link.',
//         });
//       }
//     } catch (err) {
//       setNotification({
//         type: 'error',
//         message: err?.data?.message || 'Something went wrong. Try again.',
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex">
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       {/* Left Side - Branding */}
//       <div className="w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 hidden lg:flex flex-col items-center justify-center text-white p-12">
//         <img src={icon} alt="Logo" className="w-56 h-56 mb-6" />
//         <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
//           Forgot Password?
//         </h2>
//         <p className="text-teal-50 text-center text-lg max-w-md">
//           No worries! We'll email you a reset link. Just enter your email.
//         </p>
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
//         <div className="w-full max-w-md">
//           <div
//             className="flex items-center gap-2 mb-4 text-teal-700 cursor-pointer"
//             onClick={() => navigate('/login')}
//           >
//             <ArrowLeft size={18} />
//             <span className="text-sm font-medium">Back to Login</span>
//           </div>

//           <div className="text-center mb-6">
//             <MailIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />
//             <h2 className="text-2xl font-bold text-teal-800">Forgot Password</h2>
//             <p className="text-gray-600 text-sm mt-2">
//               Enter your email to receive a password reset link.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               placeholder="example@domain.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
//             />
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 font-semibold rounded-lg transition duration-300 ${
//                 isLoading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-teal-600 hover:bg-teal-700 text-white'
//               }`}
//             >
//               {isLoading ? 'Sending...' : 'Send Reset Link'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ⬇️ Included Notification Component Inside This File
// function Notification({ type = 'success', message, onClose }) {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
//   const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
//   const Icon = type === 'success' ? CheckCircle : AlertCircle;

//   return (
//     <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}>
//       <div className="flex items-center gap-3">
//         <Icon className="h-5 w-5 flex-shrink-0" />
//         <p className="text-sm font-medium">{message}</p>
//         <button
//           onClick={onClose}
//           className="ml-auto text-gray-400 hover:text-gray-600"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useForgotMutation,
  useVerifyMutation,
  useVerifyOtpMutation,
} from "./authApiSlice";
import { MailIcon, ArrowLeft, CheckCircle, AlertCircle, LockKeyhole, ShieldCheck } from "lucide-react";
// import logo from "../assets/Images/jaimaxcoin.png";
import logo from '../assets/Images/greencoin.png'

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [notification, setNotification] = useState(null);

  const [forgot, { isLoading: loadingEmail }] = useForgotMutation();
  const [verify, { isLoading: loadingOtp }] = useVerifyMutation();
  const [verifyOtp, { isLoading: loadingReset }] = useVerifyOtpMutation();

  const showNotification = (type, message) =>
    setNotification({ type, message });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return showNotification("error", "Email is required");

    try {
      const res = await forgot({ email }).unwrap();
      if (res?.success) {
        showNotification("success", res.message || "OTP sent!");
        setStep(2);
      } else {
        showNotification("error", res.message || "Failed to send OTP.");
      }
    } catch (err) {
      showNotification("error", err?.data?.message || "Something went wrong.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return showNotification("error", "OTP is required");

    try {
      const res = await verify({
        email,
        otp: Number(otp),
        otpType: "forgotPassword",
      }).unwrap();
      if (res?.success) {
        showNotification("success", res.message || "OTP verified!");
        setStep(3);
      } else {
        showNotification("error", res.message || "Invalid OTP.");
      }
    } catch (err) {
      showNotification("error", err?.data?.message || "OTP verification failed.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPwd)
      return showNotification("error", "Both password fields are required");
    if (password !== confirmPwd)
      return showNotification("error", "Passwords do not match");

    try {
      const res = await verifyOtp({ email, password }).unwrap();
      if (res?.success) {
        showNotification("success", res.message || "Password updated!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        showNotification("error", res.message || "Failed to update password.");
      }
    } catch (err) {
      showNotification("error", err?.data?.message || "Reset failed.");
    }
  };

return (
  <div className="min-h-screen w-full bg-gray-50 flex flex-col lg:flex-row">
    {notification && (
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification(null)}
      />
    )}

    {/* Branding Section - full width on mobile, 1/2 on desktop */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 text-white p-8 lg:p-12">
      <img src={logo} alt="Logo" className="w-48 h-48 mb-6" />
      <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent mb-2">
        Forgot Password?
      </h2>
      <p className="text-base lg:text-lg text-teal-100 text-center max-w-xs">
        We’ll send you a code to reset your password.
      </p>
    </div>

    {/* Form Section */}
    <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div
          className="flex items-center gap-2 mb-4 text-teal-700 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Login</span>
        </div>

        {/* Icon & Heading */}
        <div className="text-center mb-6">
          {step === 1 && <MailIcon className="w-12 h-12 text-teal-600 mx-auto mb-2" />}
          {step === 2 && <ShieldCheck className="w-12 h-12 text-teal-600 mx-auto mb-2" />}
          {step === 3 && <LockKeyhole className="w-12 h-12 text-teal-600 mx-auto mb-2" />}
          <h2 className="text-2xl font-bold text-teal-800">
            {step === 1 ? "Forgot Password" : step === 2 ? "Enter OTP" : "Set New Password"}
          </h2>
        </div>

        {/* Forms (unchanged) */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="submit"
              disabled={loadingEmail}
              className={`w-full py-3 font-semibold rounded-full ${
                loadingEmail
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {loadingEmail ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="submit"
              disabled={loadingOtp}
              className={`w-full py-3 font-semibold rounded-full ${
                loadingOtp
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {loadingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
            <button
              type="submit"
              disabled={loadingReset}
              className={`w-full py-3 font-semibold rounded-full ${
                loadingReset
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              {loadingReset ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
);

}

function Notification({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";
  const text = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bg} ${text} shadow-lg max-w-sm animate-slide-in`}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>
    </div>
  );
}

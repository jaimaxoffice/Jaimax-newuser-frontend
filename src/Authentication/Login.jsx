// import React, { useState, useEffect } from 'react';
// import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
// import icon from '../../public/logo.png'
// import { useNavigate } from 'react-router-dom';
// import { 
//   useRegisterMutation, 
//   useVerifyMutation, 
//   useLoginMutation, 
//   useOTPresentMutation 
// } from './authApiSlice';
// const countrycodes = [
//   { code: '+1', country: 'United States', flag: '🇺🇸', name: 'US' },
//   { code: '+91', country: 'India', flag: '🇮🇳', name: 'IN' },
//   { code: '+44', country: 'United Kingdom', flag: '🇬🇧', name: 'UK' },
//   { code: '+49', country: 'Germany', flag: '🇩🇪', name: 'DE' },
//   { code: '+33', country: 'France', flag: '🇫🇷', name: 'FR' },
//   { code: '+86', country: 'China', flag: '🇨🇳', name: 'CN' },
//   { code: '+81', country: 'Japan', flag: '🇯🇵', name: 'JP' },
//   { code: '+82', country: 'South Korea', flag: '🇰🇷', name: 'KR' },
//   { code: '+61', country: 'Australia', flag: '🇦🇺', name: 'AU' },
//   { code: '+7', country: 'Russia', flag: '🇷🇺', name: 'RU' },
//   { code: '+55', country: 'Brazil', flag: '🇧🇷', name: 'BR' },
//   { code: '+34', country: 'Spain', flag: '🇪🇸', name: 'ES' },
//   { code: '+39', country: 'Italy', flag: '🇮🇹', name: 'IT' },
//   { code: '+31', country: 'Netherlands', flag: '🇳🇱', name: 'NL' },
//   { code: '+46', country: 'Sweden', flag: '🇸🇪', name: 'SE' }
// ];

// const Notification = ({ type, message, onClose }) => {
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
// };

// const CountryCodeDropdown = ({ value, onChange, className,countryCodes }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCountries = countrycodes.filter(country => 
//     country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     country.code.includes(searchTerm) ||
//     country.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectedCountry = countrycodes.find(c => c.code === value) || countrycodes[1];

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
//       >
//         <span className="flex items-center gap-2 text-sm">
//           <span className="text-lg">{selectedCountry.flag}</span>
//           <span className="font-medium">{selectedCountry.code}</span>
//         </span>
//         <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-1 w-full min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
//           <div className="p-3 border-b border-gray-100">
//             <input
//               type="text"
//               placeholder="Search countries..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
//             />
//           </div>
//           <div className="max-h-48 overflow-y-auto">
//             {filteredCountries.map((country) => (
//               <button
//                 key={country.code}
//                 type="button"
//                 onClick={() => {
//                   onChange(country.code);
//                   setIsOpen(false);
//                   setSearchTerm('');
//                 }}
//                 className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
//               >
//                 <span className="text-lg">{country.flag}</span>
//                 <span className="font-medium text-gray-900">{country.code}</span>
//                 <span className="text-gray-600 truncate">{country.country}</span>
//               </button>
//             ))}
//             {filteredCountries.length === 0 && (
//               <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                 No countries found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const LoginComponent = ({ onSubmit, onToggleMode, isVisible }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [notification, setNotification] = useState(null);

//   // API Hook from RTK Query (or similar)
//   // 'error' here will capture errors directly from the RTK Query fetch process,
//   // including network errors, non-2xx responses, etc.
//   const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();

//   // Effect to handle API errors and display them as notifications
//   useEffect(() => {
//     if (loginError) {
//       console.error("Login API Error:", loginError);
//       // Determine the best message from the error object
//       let errorMessage = 'An unexpected error occurred during login.';
//       if (loginError.data && loginError.data.message) {
//         errorMessage = loginError.data.message; // From backend validation/error messages
//       } else if (loginError.error) {
//         errorMessage = loginError.error; // Generic RTK Query error string (e.g., "FETCH_ERROR")
//       } else if (loginError.status) {
//           // If status is available but no data.message, can infer from status code
//           if (loginError.status === 401) {
//               errorMessage = 'Invalid credentials. Please check your email and password.';
//           } else if (loginError.status === 403) {
//               errorMessage = 'Access denied.';
//           } else if (loginError.status >= 500) {
//               errorMessage = 'Server error. Please try again later.';
//           } else {
//               errorMessage = `Error: ${loginError.status}`;
//           }
//       }

//       setNotification({
//         type: 'error',
//         message: errorMessage
//       });
//     }
//   }, [loginError]);

//   const validateField = (name, value) => {
//     // Create a mutable copy of errors for updates
//     const newErrors = { ...errors }; 

//     switch (name) {
//       case 'email':
//         if (!value.trim()) {
//           newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           newErrors.email = 'Invalid email address';
//         } else {
//           // If valid, remove the error for this field
//           delete newErrors.email; 
//         }
//         break;
//       case 'password':
//         if (!value) {
//           newErrors.password = 'Password is required';
//         } else if (value.length < 6) {
//           newErrors.password = 'Password must be at least 6 characters';
//         } else {
//           // If valid, remove the error for this field
//           delete newErrors.password;
//         }
//         break;
//       default:
//         break;
//     }

//     // Set the updated errors state. It's important to do this after all checks
//     // to ensure the state reflects the current validation status.
//     setErrors(newErrors); 
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Validate field immediately on change
//     validateField(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Re-validate all fields on submit to catch any errors missed by on-change validation
//     // (e.g., if user types nothing and tries to submit)
//     const currentErrors = {};
//     Object.keys(formData).forEach(key => {
//         // Temporarily store validation results for submission check
//         validateField(key, formData[key]); 
//         // We need to re-check the 'errors' state after all validateField calls.
//         // A better approach for handleSubmit might be to collect errors directly here
//         // without relying on the async state update from validateField.
//     });

//     // A more robust way to check for errors before submitting:
//     let hasSubmitErrors = false;
//     const errorsOnSubmit = {};
//     if (!formData.email.trim()) {
//       errorsOnSubmit.email = 'Email is required';
//       hasSubmitErrors = true;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errorsOnSubmit.email = 'Invalid email address';
//       hasSubmitErrors = true;
//     }

//     if (!formData.password) {
//       errorsOnSubmit.password = 'Password is required';
//       hasSubmitErrors = true;
//     } else if (formData.password.length < 6) {
//       errorsOnSubmit.password = 'Password must be at least 6 characters';
//       hasSubmitErrors = true;
//     }

//     setErrors(errorsOnSubmit); // Update the state with all current errors

//     if (hasSubmitErrors) {
//       console.log("Validation errors detected, preventing API call.");
//       setNotification({
//         type: 'error',
//         message: 'Please correct the highlighted fields.'
//       });
//       return;
//     }

//     // Clear any previous notification before attempting new login
//     setNotification(null);

//     try {
//       const payload = {
//         ...formData,
//         role: 1 // As per your original code
//       };

//       // Using .unwrap() for RTK Query will automatically throw an error
//       // if the server responds with a non-2xx status code.
//       const response = await loginUser(payload).unwrap(); 

//       // If unwrap() didn't throw, it means the request was successful (2xx status)
//       // and response.success should be true based on your backend contract.
//       if (response.success) {
//         setNotification({
//           type: 'success',
//           message: 'Login successful! Redirecting...'
//         });

//         if (response.token) {
//           localStorage.setItem('authToken', response.token);
//         }

//         // Call the onSubmit prop if provided
//         if (onSubmit) {
//             onSubmit(payload); 
//         }

//         // Redirect to dashboard after a short delay
//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 1000); 
//       } else {
//         // This block might be less common if unwrap() is used,
//         // but included for clarity if the backend sends { success: false } with a 2xx status.
//         setNotification({
//           type: 'error',
//           message: response.message || 'Login failed. Please try again.'
//         });
//       }
//     } catch (error) {
//       // This catch block will execute if:
//       // 1. A network error occurs (e.g., server unreachable).
//       // 2. The server responds with a non-2xx status code (due to .unwrap()).
//       console.error("Login API Catch Error:", error);
//       // The useEffect for loginError will typically handle the notification here,
//       // but if you want immediate feedback from the catch, you can set it.
//       // The `loginError` state update by RTK Query will likely trigger the useEffect.
//     }
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
//         <p className="text-gray-600">Enter your credentials to access your account</p>
//       </div>

//       <div className="space-y-4">
//         {/* Email Input */}
//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             required
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {/* Fixed error container - always reserves space to prevent layout shifting */}
//           <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

//         {/* Password Input */}
//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             required
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {/* Fixed error container - always reserves space */}
//           <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

//         <div className="text-right mt-4">
//           <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
//             Forgot Password?
//           </a>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isLoginLoading} // Disable button while API call is in progress
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
//         >
//           {isLoginLoading ? 'Signing In...' : 'LOGIN'}
//         </button>
//       </div>

//       <div className="mt-8 text-center">
//         <p className="text-gray-600">
//           Don't have an account?{' '}
//           <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };


// const RegisterComponent = ({ onSubmit, onToggleMode, isVisible }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   // selectedCode stores the flag (e.g., '🇮🇳') which will be used to find the numeric code (+91)
//   const [selectedCode, setSelectedCode] = useState('🇮🇳'); // Default to India's flag
//   const [notification, setNotification] = useState(null);
//   const [isOtpSending, setIsOtpSending] = useState(false); // For managing loading state of OTP send
//   const [timer, setTimer] = useState(0); // OTP resend timer
//   const [canResendOtp, setCanResendOtp] = useState(false); // To enable/disable resend button

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     referralId: '', 
//     otp: ''         
//   });
//   const [errors, setErrors] = useState({});

//   // API Hooks from RTK Query (or similar)
//   // Renamed to match the calls in your provided functions
//   const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifyLoading, error: verifyError }] = useVerifyMutation();
//   const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] = useOTPresentMutation();

//   // State for temporary data if needed (e.g., from verify response)
//   const [userDataFromVerify, setUserDataFromVerify] = useState(null);


//   // --- Utility to get error messages from RTK Query error objects ---
//   const getErrorMessage = (error) => {
//     if (error) {
//       if (error.data && error.data.message) {
//         return error.data.message; // Backend custom message
//       } else if (error.error) {
//         return error.error; // RTK Query generic error (e.g., "FETCH_ERROR")
//       } else if (error.status) {
//         // More specific message based on HTTP status
//         if (error.status === 400) return `Bad Request: ${error.data?.message || 'Please check your input.'}`;
//         if (error.status === 401) return `Unauthorized: ${error.data?.message || 'Invalid credentials.'}`;
//         if (error.status === 409) return `Conflict: ${error.data?.message || 'User already exists or other conflict.'}`;
//         if (error.status >= 500) return `Server Error: ${error.data?.message || 'Please try again later.'}`;
//         return `Error ${error.status}: ${error.data?.message || 'An API error occurred.'}`; // Fallback for other status codes
//       }
//     }
//     return 'An unexpected error occurred. Please try again.';
//   };

//   // --- useEffect for API Error Notifications ---
//   useEffect(() => {
//     if (registerError) {
//       console.error("Register API Error:", registerError);
//       setNotification({ type: 'error', message: getErrorMessage(registerError) });
//     }
//   }, [registerError]);

//   useEffect(() => {
//     if (verifyError) {
//       console.error("Verify OTP API Error:", verifyError);
//       setNotification({ type: 'error', message: getErrorMessage(verifyError) });
//     }
//   }, [verifyError]);

//   useEffect(() => {
//     if (OTPresentError) {
//       console.error("OTPresent API Error:", OTPresentError);
//       setNotification({ type: 'error', message: getErrorMessage(OTPresentError) });
//     }
//   }, [OTPresentError]);

//   // --- Timer for OTP Resend ---
//   useEffect(() => {
//     let interval;
//     if (otpSent && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResendOtp(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [otpSent, timer]);


//   // --- Centralized Validation Logic ---
//   const validate = () => {
//     const newErrors = {};

//     // Name
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }

//     // Phone
//     const currentCountry = countryCodes.find(c => c.flag === selectedCode);
//     const minPhoneLength = 7; // Default minimum
//     const maxPhoneLength = currentCountry ? currentCountry.phone_length : 15; // Use specific or generic max

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d*$/.test(formData.phone)) {
//         newErrors.phone = 'Phone number can only contain digits';
//     } else if (formData.phone.length < minPhoneLength || formData.phone.length > maxPhoneLength) {
//         newErrors.phone = `Phone number must be ${minPhoneLength}-${maxPhoneLength} digits long`;
//     }

//     // Email
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address';
//     }

//     // Password
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     } else if (!/[a-z]/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one lowercase letter';
//     } else if (!/[A-Z]/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one uppercase letter';
//     } else if (!/\d/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one number';
//     }

//     // Confirm Password
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = 'Passwords must match';
//     }

//     // Referral ID (Optional)
//     if (formData.referralId && !/^[A-Za-z0-9]*$/.test(formData.referralId)) {
//       newErrors.referralId = 'Referral ID can only contain letters and numbers';
//     }

//     // OTP (only if OTP is sent)
//     if (otpSent) {
//       if (!formData.otp.trim()) {
//         newErrors.otp = 'OTP is required';
//       } else if (!/^\d{6}$/.test(formData.otp)) {
//         newErrors.otp = 'OTP must be 6 digits';
//       }
//     }

//     return newErrors;
//   };

//   // --- Input Change Handler ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Specific input restrictions
//     if (name === "phone" && !/^\d*$/.test(value)) {
//       return; // Only digits allowed
//     }
//     if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) { // Allows spaces in name
//       return;
//     }
//     if (name === "referralId" && !/^[A-Za-z0-9]*$/.test(value)) { // Corrected name
//       return;
//     }
//     if (name === "otp" && !/^[0-9]*$/.test(value)) { // Corrected name
//       return;
//     }

//     // Update formData for specific cases or generally
//     if (name === "countryCode") {
//       setSelectedCode(value); // Update selected flag
//       // No need to set country in formData if it's derived for API payload
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//     // Perform validation on change
//     setErrors(validate()); // Re-validate all fields on change for real-time feedback
//   };

//   // --- Blur Event Handler (for field-specific validation display) ---
//   const handleBlur = (e) => {
//     const { name } = e.target;
//     // Re-validate all fields to get the latest errors
//     const currentErrors = validate();
//     setErrors(currentErrors); // Apply all errors after blur
//   };

//   // --- handleVerify (This is your "Send OTP" / Initial Registration Trigger) ---
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setNotification(null); // Clear previous notifications

//     const validationErrors = validate();
//     setErrors(validationErrors); // Update errors state with all validation issues

//     // Check if there are any errors that are not just related to OTP (since OTP isn't sent yet)
//     const formErrorsExceptOtp = Object.keys(validationErrors).filter(key => key !== 'otp').length > 0;

//     if (formErrorsExceptOtp) {
//       toast.error("Please fill all required details correctly.", {
//         position: "top-center",
//       });
//       return;
//     }

//     setIsOtpSending(true); // Start loading for OTP sending

//     try {
//       const currentCountry = countryCodes.find(item => item.flag === selectedCode);
//       const phoneWithCode = (currentCountry?.country_code || selectedCode) + formData.phone.replace(/\s/g, '');

//       const payload = {
//         name: formData.name,
//         phone: phoneWithCode,
//         email: formData.email,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         referralId: formData.referralId || undefined,
//         // IMPORTANT: Add otpType here as your backend seems to require it for initial registration
//         otpType: "register", // CONFIRM THIS EXACT STRING WITH YOUR BACKEND!
//         country: currentCountry?.country_name || '', // Include country name if backend expects it
//         countryCode: currentCountry?.country_code || selectedCode // Send numeric code
//       };

//       // Call the register mutation (initial registration/send OTP)
//       const result = await register(payload).unwrap();

//       // Assuming result.data.username is the username string
//       localStorage.setItem("username", result?.data?.username || formData.email); // Fallback to email if username not returned

//       setOtpSent(true);
//       setTimer(120); // reset timer (2 minutes)
//       setCanResendOtp(false); // Disable resend until timer runs out
//       setNotification({ type: 'success', message: "OTP sent to your email!" });
//       toast.success("OTP sent to your email!", { position: "top-center" });

//     } catch (err) {
//       console.error("handleVerify (Register/OTPresent) Error:", err);
//       // Check for 'User verification pending' message for resend scenario
//       if (err?.data?.message === "User verification pending") {
//         try {
//           // Attempt to resend OTP if user is pending verification
//           const ress = await OTPresent({ email: formData.email, otpType: "register" }).unwrap(); // Ensure otpType is sent for resend
//           setOtpSent(true);
//           setTimer(120);
//           setCanResendOtp(false);
//           setNotification({ type: 'success', message: "OTP resent to your email!" });
//           toast.success("OTP resent to your email!", { position: "top-center" });
//         } catch (otpErr) {
//           console.error("OTPresent (Resend OTP) Error:", otpErr);
//           setNotification({ type: 'error', message: getErrorMessage(otpErr) });
//           toast.error(getErrorMessage(otpErr), { position: "top-center" });
//         }
//       } else {
//         setNotification({ type: 'error', message: getErrorMessage(err) });
//         toast.error(getErrorMessage(err), { position: "top-center" });
//       }
//     } finally {
//       setIsOtpSending(false); // End loading regardless of success/failure
//     }
//   };

//   // --- handleSubmit (This is your "Verify OTP" and Final Registration Trigger) ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNotification(null); // Clear previous notifications

//     // Re-validate all fields on submit to ensure everything is correct, including OTP
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       toast.error("Please correct the highlighted fields.", {
//         position: "top-center",
//       });
//       return;
//     }

//     // Ensure OTP was sent and entered
//     if (!otpSent) {
//       setNotification({
//         type: 'error',
//         message: 'Please send OTP and verify your phone number first.'
//       });
//       return;
//     }
//     if (!formData.otp.trim()) {
//       setNotification({
//         type: 'error',
//         message: 'OTP is required to complete registration.'
//       });
//       setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
//       return;
//     }

//     try {
//       // --- First, Verify OTP ---
//       const verifyPayload = {
//         email: formData.email,
//         otp: Number(formData.otp), // Convert OTP string to number
//         otpType: "register", // IMPORTANT: This was required by your backend
//       };

//       const res = await verify(verifyPayload).unwrap(); // Use 'verify' hook name

//       if (!res.success) { // If unwrap() didn't throw, but backend sent { success: false }
//         setNotification({
//           type: 'error',
//           message: res.message || 'OTP verification failed. Please try again.'
//         });
//         toast.error(res.message || 'OTP verification failed!', { position: "top-center" });
//         return;
//       }

//       // Store data from the verification response for final registration payload if needed
//       setUserDataFromVerify(res.data); // Store the actual data object from verify response

//       // --- Then, Final Registration (if backend requires another call after OTP verify) ---
//       // NOTE: Your original structure implies that 'verify' completes registration.
//       // If 'register' in handleVerify *is* the full registration, then this section
//       // below (the second 'register' call) might be redundant or for a different purpose.
//       // Assuming 'verify' also provides final user data or token for navigation.

//       // If 'res' already contains the token and is sufficient to proceed:
//       localStorage.setItem("token", res?.data?.token || res.token); // Prioritize res.data.token, then res.token
//       localStorage.setItem("userData", JSON.stringify(res?.data || res)); // Store verified user data. Stringify objects!

//       toast.success(`${res?.message || 'OTP verified successfully!'}`, { position: "top-center" });

//       // Navigate after success
//       setTimeout(() => {
//         navigate("/home"); // Redirect to home on successful registration
//       }, 1000);

//     } catch (err) {
//       console.error("handleSubmit (Verify OTP) Error:", err);
//       setNotification({ type: 'error', message: getErrorMessage(err) });
//       toast.error(getErrorMessage(err), { position: "top-center" });
//     }
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTER</h1>
//         <p className="text-gray-600">Create a new account to get started</p>
//       </div>

//       <div className="space-y-3">
//         {/* Name Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Full Name"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.name && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.name}</div>
//             )}
//           </div>
//         </div>

//         {/* Phone Input */}
//         <div className="relative mb-5">
//           <div className={`flex rounded-lg border transition-all duration-200 overflow-hidden ${
//             errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
//           }`}>
//             <CountryCodeDropdown
//               value={selectedCode}
//               onChange={setSelectedCode}
//               className="bg-gray-50 py-3 px-3 border-r border-gray-200 hover:bg-gray-100"
//               countryCodes={countryCodes} // Pass countryCodes to the dropdown
//             />
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="tel" // Use type="tel" for phone numbers
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Phone Number"
//                 className="w-full pl-10 pr-4 py-3 border-0 bg-transparent outline-none"
//               />
//             </div>
//           </div>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.phone && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.phone}</div>
//             )}
//           </div>
//         </div>

//         {/* Email Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Email"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

//         {/* Password Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

//         {/* Confirm Password Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Confirm Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.confirmPassword && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.confirmPassword}</div>
//             )}
//           </div>
//         </div>

//         {/* Referral ID Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId" // Corrected name
//             value={formData.referralId}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.referralId && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.referralId}</div>
//             )}
//           </div>
//         </div>

//         {/* OTP Input and Send OTP Button */}
//         <div className="relative mb-5">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Shield className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="otp" // Corrected name
//                 value={formData.otp}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter 6-digit OTP"
//                 maxLength="6"
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                   errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                 }`}
//               />
//             </div>

//             {/* "Send OTP" / Initial Registration Button */}
//             <button
//               type="button"
//               onClick={handleVerify} // This now triggers initial registration/send OTP
//               disabled={isRegisterLoading || isOTPresentLoading || otpSent || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
//               className={`px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
//                 otpSent && timer > 0
//                   ? 'bg-green-100 text-green-700 cursor-default' // OTP sent and timer running
//                   : (isRegisterLoading || isOTPresentLoading)
//                   ? 'bg-gray-100 text-gray-500 cursor-not-allowed' // Loading
//                   : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // Form errors present
//                   : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md' // Ready to send
//               }`}
//             >
//               {isRegisterLoading || isOTPresentLoading ? 'Sending...' : otpSent && timer > 0 ? `Sent (${timer}s)` : 'Send OTP'}
//             </button>
//           </div>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.otp && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.otp}</div>
//             )}
//           </div>
//         </div>

//         {/* Resend OTP Button (Optional, if you want a separate button) */}
//         {otpSent && timer === 0 && (
//           <div className="text-center mt-2">
//             <button
//               type="button"
//               onClick={() => {
//                 setCanResendOtp(false); // Disable immediately on click
//                 handleVerify(); // Use handleVerify to re-trigger OTP send
//               }}
//               disabled={isOTPresentLoading || timer > 0}
//               className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
//             >
//               {isOTPresentLoading ? 'Resending...' : 'Resend OTP'}
//             </button>
//           </div>
//         )}

//         {/* Final Registration Button (after OTP verification) */}
//         <button
//           type="submit"
//           onClick={handleSubmit} // This now verifies OTP and completes registration
//           disabled={isVerifyLoading || !otpSent || Object.keys(errors).length > 0 || !formData.otp.trim()}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//         >
//           {isVerifyLoading ? 'Verifying OTP...' : 'REGISTER'}
//         </button>
//       </div>

//       <div className="mt-4 text-center">
//         <p className="text-gray-600">
//           Already have an account?{' '}
//           <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };



// export default function AuthContainer() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const handleLoginSubmit = (values) => {
//     console.log('Login submitted:', values);
//   };

//   const handleRegisterSubmit = (values) => {
//     console.log('Register submitted:', values);
//   };

//   const toggleMode = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 50);
//     }, 250);
//   };

//   return (
//     <div className="min-h-screen w-full overflow-hidden bg-gray-50">
//       {/* Desktop View */}
//       <div className="hidden lg:flex w-full h-screen relative">
//         <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 transform transition-all duration-1000 ease-out ${isLogin ? 'left-0 translate-x-0' : 'left-1/2 translate-x-0'}`}>
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
//             <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//             <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="absolute top-8 left-8 right-8 z-20">
//             <div className="flex rounded-full p-2 shadow-xl border border-white/10">
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(true)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
//                   : ''
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(false)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${!isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
//                   : ''
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 SIGN UP
//               </button>
//             </div>
//           </div>

//           {/* Enhanced Icon Section */}
//           <div className="flex items-center justify-center w-full h-full relative z-10">
//             <div className="text-center text-white px-8">
//               {/* Highlighted Icon Container */}
//               <div className="mb-12 relative">
//                 <div className="relative w-58 h-58 mx-auto mb-6 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
//                  <img src={icon} alt="" width={300} />

//                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
//                   <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
//                   <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
//                 </div>
//                 <div className="relative">
//                   <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                     {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
//                   </h2>
//                   <p className={`text-teal-50 text-lg leading-relaxed transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                     {isLogin
//                       ? 'Trade, Earn, Grow — All from One Jaimax Account.'
//                       : 'The Next-Gen Crypto Platform Built for You. Register Today.'
//                     }
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Form */}
//         <div className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out ${isLogin ? 'right-0 translate-x-0' : 'right-1/2 translate-x-0'}`}>
//           <div className="flex items-center justify-center w-full h-full p-12">
//             <div className="w-full max-w-md">
//               {isLogin ? (
//                 <LoginComponent
//                   onSubmit={handleLoginSubmit}
//                   onToggleMode={toggleMode}
//                   isVisible={!isTransitioning}
//                 />
//               ) : (
//                 <RegisterComponent
//                   onSubmit={handleRegisterSubmit}
//                   onToggleMode={toggleMode}
//                   isVisible={!isTransitioning}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile View - Stack Layout */}
//       <div className="lg:hidden w-full min-h-screen flex flex-col">
//         {/* Mobile Header with Icon */}
//         <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
//             <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
//             <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
//           </div>

//           {/* Mobile Navigation */}
//           <div className="relative z-10 p-4">
//             <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(true)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
//                   : 'hover:bg-white/20'
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(false)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${!isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
//                   : 'hover:bg-white/20'
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 SIGN UP
//               </button>
//             </div>
//           </div>

//           {/* Mobile Icon Section */}
//           <div className="relative z-10 py-8 text-center text-white">
//             <div className="mb-6 relative">
//               {/* Mobile Glow Effect */}
//               <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>

//               {/* Mobile Icon Container */}
//               <div className="relative w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-110">
//                 <div className="w-24 h-24 bg-gradient-to-br from-teal-300 to-green-400 rounded-full flex items-center justify-center shadow-lg">
//                   <div className="text-4xl font-bold text-white">J</div>
//                 </div>

//                 {/* Mobile Particles */}
//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
//                 <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
//               </div>
//             </div>

//             {/* Mobile Text */}
//             <div className="px-4">
//               <h2 className={`text-2xl font-bold mb-2 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                 {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
//               </h2>
//               <p className={`text-teal-50 text-sm leading-relaxed transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                 {isLogin
//                   ? 'Trade, Earn, Grow — All from One Account.'
//                   : 'Next-Gen Crypto Platform Built for You.'
//                 }
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Form Content */}
//         <div className="flex-1 bg-white p-6 overflow-y-auto">
//           <div className="w-full max-w-sm mx-auto">
//             {isLogin ? (
//               <LoginComponent
//                 onSubmit={handleLoginSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//               />
//             ) : (
//               <RegisterComponent
//                 onSubmit={handleRegisterSubmit}
//                 onToggleMode={toggleMode}
//                 isVisible={!isTransitioning}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles for Animations */}
//       <style jsx>{`
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }

//         .bg-gradient-radial {
//           background: radial-gradient(circle, var(--tw-gradient-stops));
//         }

//         @keyframes slide-in {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
// import icon from '../../public/logo.png';
// import { useNavigate } from 'react-router-dom';
// import { 
//   useRegisterMutation, 
//   useVerifyMutation, 
//   useLoginMutation, 
//   useOTPresentMutation 
// } from './authApiSlice';
// import { toast } from 'react-toastify';
// const countrycodes = [
//   { code: '+1', country: 'United States', flag: '🇺🇸', name: 'US', phone_length: 10 },
//   { code: '+91', country: 'India', flag: '🇮🇳', name: 'IN', phone_length: 10 },
//   { code: '+44', country: 'United Kingdom', flag: '🇬🇧', name: 'UK', phone_length: 10 },
//   { code: '+49', country: 'Germany', flag: '🇩🇪', name: 'DE', phone_length: 11 },
//   { code: '+33', country: 'France', flag: '🇫🇷', name: 'FR', phone_length: 9 },
//   { code: '+86', country: 'China', flag: '🇨🇳', name: 'CN', phone_length: 11 },
//   { code: '+81', country: 'Japan', flag: '🇯🇵', name: 'JP', phone_length: 10 },
//   { code: '+82', country: 'South Korea', flag: '🇰🇷', name: 'KR', phone_length: 10 },
//   { code: '+61', country: 'Australia', flag: '🇦🇺', name: 'AU', phone_length: 9 },
//   { code: '+7', country: 'Russia', flag: '🇷🇺', name: 'RU', phone_length: 10 },
//   { code: '+55', country: 'Brazil', flag: '🇧🇷', name: 'BR', phone_length: 11 },
//   { code: '+34', country: 'Spain', flag: '🇪🇸', name: 'ES', phone_length: 9 },
//   { code: '+39', country: 'Italy', flag: '🇮🇹', name: 'IT', phone_length: 10 },
//   { code: '+31', country: 'Netherlands', flag: '🇳🇱', name: 'NL', phone_length: 9 },
//   { code: '+46', country: 'Sweden', flag: '🇸🇪', name: 'SE', phone_length: 7 }
// ];

// const Notification = ({ type, message, onClose }) => {
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
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

// const CountryCodeDropdown = ({ value, onChange, className }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter countries based on search term (country name, code, or short name)
//   const filteredCountries = countrycodes.filter(country => 
//     country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     country.code.includes(searchTerm) ||
//     country.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Find the selected country based on the current value, default to India if not found
//   const selectedCountry = countrycodes.find(c => c.code === value) || countrycodes.find(c => c.code === '+91'); // Default to India if value not found

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
//       >
//         <span className="flex items-center gap-2 text-sm">
//           <span className="text-lg">{selectedCountry?.flag || '❓'}</span> {/* Use optional chaining and fallback */}
//           <span className="font-medium">{selectedCountry?.code || '+00'}</span>
//         </span>
//         <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-1 w-full min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
//           <div className="p-3 border-b border-gray-100">
//             <input
//               type="text"
//               placeholder="Search countries..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
//             />
//           </div>
//           <div className="max-h-48 overflow-y-auto">
//             {filteredCountries.map((country) => (
//               <button
//                 key={country.code}
//                 type="button"
//                 onClick={() => {
//                   onChange(country.code); // Pass the country code back
//                   setIsOpen(false);
//                   setSearchTerm('');
//                 }}
//                 className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
//               >
//                 <span className="text-lg">{country.flag}</span>
//                 <span className="font-medium text-gray-900">{country.code}</span>
//                 <span className="text-gray-600 truncate">{country.country}</span>
//               </button>
//             ))}
//             {filteredCountries.length === 0 && (
//               <div className="px-4 py-3 text-sm text-gray-500 text-center">
//                 No countries found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export const LoginComponent = ({ onSubmit, onToggleMode, isVisible }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [notification, setNotification] = useState(null);

//   // API Hook from RTK Query
//   const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();

//   // Effect to handle API errors and display them as notifications
//   useEffect(() => {
//     if (loginError) {
//       console.error("Login API Error:", loginError);
//       let errorMessage = 'An unexpected error occurred during login.';
//       if (loginError.data && loginError.data.message) {
//         errorMessage = loginError.data.message;
//       } else if (loginError.error) {
//         errorMessage = loginError.error;
//       } else if (loginError.status) {
//           if (loginError.status === 401) {
//               errorMessage = 'Invalid credentials. Please check your email and password.';
//           } else if (loginError.status === 403) {
//               errorMessage = 'Access denied.';
//           } else if (loginError.status >= 500) {
//               errorMessage = 'Server error. Please try again later.';
//           } else {
//               errorMessage = `Error: ${loginError.status}`;
//           }
//       }

//       setNotification({
//         type: 'error',
//         message: errorMessage
//       });
//     }
//   }, [loginError]);

//   const validateField = (name, value) => {
//     const newErrors = { ...errors }; 

//     switch (name) {
//       case 'email':
//         if (!value.trim()) {
//           newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           newErrors.email = 'Invalid email address';
//         } else {
//           delete newErrors.email; 
//         }
//         break;
//       case 'password':
//         if (!value) {
//           newErrors.password = 'Password is required';
//         } else if (value.length < 6) {
//           newErrors.password = 'Password must be at least 6 characters';
//         } else {
//           delete newErrors.password;
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors); 
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let hasSubmitErrors = false;
//     const errorsOnSubmit = {};
//     if (!formData.email.trim()) {
//       errorsOnSubmit.email = 'Email is required';
//       hasSubmitErrors = true;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errorsOnSubmit.email = 'Invalid email address';
//       hasSubmitErrors = true;
//     }

//     if (!formData.password) {
//       errorsOnSubmit.password = 'Password is required';
//       hasSubmitErrors = true;
//     } else if (formData.password.length < 6) {
//       errorsOnSubmit.password = 'Password must be at least 6 characters';
//       hasSubmitErrors = true;
//     }

//     setErrors(errorsOnSubmit);

//     if (hasSubmitErrors) {
//       console.log("Validation errors detected, preventing API call.");
//       setNotification({
//         type: 'error',
//         message: 'Please correct the highlighted fields.'
//       });
//       return;
//     }

//     setNotification(null);

//     try {
//       const payload = {
//         ...formData,
//         role: 1
//       };

//       const response = await loginUser(payload).unwrap(); 

//       if (response.success) {
//         setNotification({
//           type: 'success',
//           message: 'Login successful! Redirecting...'
//         });

//         if (response.token) {
//           localStorage.setItem('authToken', response.token);
//         }

//         if (onSubmit) {
//             onSubmit(payload); 
//         }

//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 1000); 
//       } else {
//         setNotification({
//           type: 'error',
//           message: response.message || 'Login failed. Please try again.'
//         });
//       }
//     } catch (error) {
//       console.error("Login API Catch Error:", error);
//     }
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
//         <p className="text-gray-600">Enter your credentials to access your account</p>
//       </div>

//       <div className="space-y-4">
//         {/* Email Input */}
//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             required
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {/* Fixed error container - always reserves space to prevent layout shifting */}
//           <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

//         {/* Password Input */}
//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             required
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {/* Fixed error container - always reserves space */}
//           <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

//         <div className="text-right mt-4">
//           <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
//             Forgot Password?
//           </a>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isLoginLoading} // Disable button while API call is in progress
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
//         >
//           {isLoginLoading ? 'Signing In...' : 'LOGIN'}
//         </button>
//       </div>

//       <div className="mt-8 text-center">
//         <p className="text-gray-600">
//           Don't have an account?{' '}
//           <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };
// export const RegisterComponent = ({ onSubmit, onToggleMode, isVisible }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedCode, setSelectedCode] = useState(countrycodes.find(c => c.name === 'IN')?.code || '+91'); 
//   const [notification, setNotification] = useState(null);
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   const [timer, setTimer] = useState(0); 
//   const [canResendOtp, setCanResendOtp] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     referralId: '', 
//     otp: ''        
//   });
//   const [errors, setErrors] = useState({});
//   const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifyLoading, error: verifyError }] = useVerifyMutation();
//   const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] = useOTPresentMutation();
//   const [userDataFromVerify, setUserDataFromVerify] = useState(null);
//   const getErrorMessage = (error) => {
//     if (error) {
//       if (error.data && error.data.message) {
//         return error.data.message; 
//       } else if (error.error) {
//         return error.error; 
//       } else if (error.status) {
//         if (error.status === 400) return `Bad Request: ${error.data?.message || 'Please check your input.'}`;
//         if (error.status === 401) return `Unauthorized: ${error.data?.message || 'Invalid credentials.'}`;
//         if (error.status === 409) return `Conflict: ${error.data?.message || 'User already exists or other conflict.'}`;
//         if (error.status >= 500) return `Server Error: ${error.data?.message || 'Please try again later.'}`;
//         return `Error ${error.status}: ${error.data?.message || 'An API error occurred.'}`;
//       }
//     }
//     return 'An unexpected error occurred. Please try again.';
//   };

//   // --- useEffect for API Error Notifications ---
//   useEffect(() => {
//     if (registerError) {
//       console.error("Register API Error:", registerError);
//       setNotification({ type: 'error', message: getErrorMessage(registerError) });
//     }
//   }, [registerError]);

//   useEffect(() => {
//     if (verifyError) {
//       console.error("Verify OTP API Error:", verifyError);
//       setNotification({ type: 'error', message: getErrorMessage(verifyError) });
//     }
//   }, [verifyError]);

//   useEffect(() => {
//     if (OTPresentError) {
//       console.error("OTPresent API Error:", OTPresentError);
//       setNotification({ type: 'error', message: getErrorMessage(OTPresentError) });
//     }
//   }, [OTPresentError]);
//   useEffect(() => {
//     let interval;
//     if (otpSent && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResendOtp(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [otpSent, timer]);
//  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|mil|info|co|io|me|biz|live|yahoo|gmail)$/i;

// const validate = (formData, selectedCode, countrycodes, otpSent) => {
//   const newErrors = {};

//   // Name Validation
//   if (!formData.name || !formData.name.trim()) {
//     newErrors.name = 'Name is required';
//   } else if (formData.name.length < 2) {
//     newErrors.name = 'Name must be at least 2 characters';
//   } else if (formData.name.length > 50) { // Added max length
//     newErrors.name = 'Name cannot exceed 50 characters';
//   } else if (!/^[a-zA-Z\s.-]+$/.test(formData.name)) { // Allows hyphen and period for names like "Jean-Luc" or "Dr. Smith"
//     newErrors.name = 'Name can only contain letters, spaces, hyphens, and periods';
//   }

//   // Phone Number Validation
//   const currentCountry = countrycodes.find(c => c.code === selectedCode);
//   const minPhoneLength = currentCountry ? currentCountry.min_phone_length : 7; // Assuming min_phone_length in countrycodes
//   const maxPhoneLength = currentCountry ? currentCountry.max_phone_length : 15; // Assuming max_phone_length in countrycodes

//   if (!formData.phone || !formData.phone.trim()) {
//     newErrors.phone = 'Phone number is required';
//   } else if (!/^\+?\d+$/.test(formData.phone)) { // Allows optional '+' for international format
//     newErrors.phone = 'Phone number can only contain digits (and an optional leading +)';
//   } else {
//     // Remove non-digit characters for length check, especially if allowing '+'
//     const digitsOnlyPhone = formData.phone.replace(/\D/g, '');
//     if (digitsOnlyPhone.length < minPhoneLength || digitsOnlyPhone.length > maxPhoneLength) {
//       newErrors.phone = `Phone number must be between ${minPhoneLength} and ${maxPhoneLength} digits long`;
//     }
//     // Consider adding a more specific country-based regex for phone numbers if `countrycodes` has this data.
//     // Example: if (currentCountry && currentCountry.phone_regex && !new RegExp(currentCountry.phone_regex).test(formData.phone)) { ... }
//   }

//   // Email Validation
//   if (!formData.email || !formData.email.trim()) {
//     newErrors.email = 'Email is required';
//   } else if (!emailRegex.test(formData.email)) {
//     newErrors.email = 'Invalid email address. Please use a valid format (e.g., user@example.com)';
//   } else if (formData.email.length > 254) { // Max length for email addresses (RFC 3696)
//     newErrors.email = 'Email address is too long';
//   }

//   // Password Validation
//   if (!formData.password) {
//     newErrors.password = 'Password is required';
//   } else if (formData.password.length < 8) {
//     newErrors.password = 'Password must be at least 8 characters long';
//   } else if (formData.password.length > 18) { // Added max length for security
//     newErrors.password = 'Password cannot exceed 18 characters';
//   } else if (!/[a-z]/.test(formData.password)) {
//     newErrors.password = 'Password must contain at least one lowercase letter';
//   } else if (!/[A-Z]/.test(formData.password)) {
//     newErrors.password = 'Password must contain at least one uppercase letter';
//   } else if (!/\d/.test(formData.password)) {
//     newErrors.password = 'Password must contain at least one number';
//   } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~` ]/.test(formData.password)) {
//     newErrors.password = 'Password must contain at least one special character (e.g., !@#$%)';
//   }

//   // Confirm Password Validation
//   if (!formData.confirmPassword) {
//     newErrors.confirmPassword = 'Please confirm your password';
//   } else if (formData.confirmPassword !== formData.password) {
//     newErrors.confirmPassword = 'Passwords do not match';
//   }

//   // Referral ID Validation (Optional and conditional)
//   if (formData.referralId) { // Only validate if a referral ID is provided
//     if (!/^[A-Za-z0-9]{5,20}$/.test(formData.referralId)) { // Example: 5-20 alphanumeric characters
//       newErrors.referralId = 'Referral ID can only contain letters and numbers, and be between 5 and 20 characters long';
//     }
//   }

//   // OTP Validation (Conditional)
//   if (otpSent) {
//     if (!formData.otp || !formData.otp.trim()) {
//       newErrors.otp = 'OTP is required';
//     } else if (!/^\d{4,8}$/.test(formData.otp)) { // Allows for 4-8 digit OTPs, common in real-world scenarios
//       newErrors.otp = 'OTP must be 4 to 8 digits long';
//     }
//   }

//   // General form data presence checks (if applicable to other fields)
//   // Example: if (formData.termsAccepted !== true) { newErrors.termsAccepted = 'You must accept the terms and conditions'; }

//   return newErrors;
// };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone" && !/^\d*$/.test(value)) {
//       return;
//     }
//     if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
//       return;
//     }
//     if (name === "referralId" && !/^[A-Za-z0-9]*$/.test(value)) { 
//       return;
//     }
//     if (name === "otp" && !/^[0-9]*$/.test(value)) {
//       return;
//     }
//     if (name === "countryCode") {
//       setSelectedCode(value);
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//     setErrors(validate());
//   };

//   // --- Blur Event Handler (for field-specific validation display) ---
//   const handleBlur = (e) => {
//     // Re-validate all fields to get the latest errors and update the state.
//     // This provides immediate feedback after a user leaves a field.
//     const currentErrors = validate();
//     setErrors(currentErrors);
//   };

//   // --- handleVerify (This is your "Send OTP" / Initial Registration Trigger) ---
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setNotification(null); // Clear previous notifications

//     const validationErrors = validate();
//     setErrors(validationErrors); // Update errors state with all validation issues

//     // Filter out OTP related errors as OTP is not expected yet for this step
//     const formErrorsExceptOtp = Object.keys(validationErrors).filter(key => key !== 'otp').length > 0;

//     if (formErrorsExceptOtp) {
//       toast.error("Please fill all required details correctly.", {
//         position: "top-center",
//       });
//       return;
//     }

//     setIsOtpSending(true); // Start loading for OTP sending

//     try {
//       // Find the currently selected country object to get its country_code and country_name
//       const currentCountry = countrycodes.find(item => item.code === selectedCode);
//       const phoneWithCode = (currentCountry?.code || selectedCode) + formData.phone.replace(/\s/g, '');

//       const payload = {
//         name: formData.name,
//         phone: phoneWithCode,
//         email: formData.email,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         referralId: formData.referralId || undefined,
//         otpType: "register",
//         country: currentCountry?.country || '', 
//         countryCode: currentCountry?.code || selectedCode,
//       };

//       // Call the register mutation (initial registration/send OTP)
//       const result = await register(payload).unwrap();

//       // Assuming result.data.username is the username string
//       localStorage.setItem("username", result?.data?.username || formData.email); // Fallback to email if username not returned

//       setOtpSent(true);
//       setTimer(120); // reset timer (2 minutes)
//       setCanResendOtp(false); // Disable resend until timer runs out
//       setNotification({ type: 'success', message: "OTP sent to your email!" });
//       toast.success("OTP sent to your email!", { position: "top-center" });

//     } catch (err) {
//       console.error("handleVerify (Register/OTPresent) Error:", err);
//       // Check for 'User verification pending' message for resend scenario
//       if (err?.data?.message === "User verification pending") {
//         try {
//           // Attempt to resend OTP if user is pending verification
//           const ress = await OTPresent({ email: formData.email, otpType: "register" }).unwrap(); // Ensure otpType is sent for resend
//           setOtpSent(true);
//           setTimer(120);
//           setCanResendOtp(false);
//           setNotification({ type: 'success', message: "OTP resent to your email!" });
//           toast.success("OTP resent to your email!", { position: "top-center" });
//         } catch (otpErr) {
//           console.error("OTPresent (Resend OTP) Error:", otpErr);
//           setNotification({ type: 'error', message: getErrorMessage(otpErr) });
//           toast.error(getErrorMessage(otpErr), { position: "top-center" });
//         }
//       } else {
//         setNotification({ type: 'error', message: getErrorMessage(err) });
//         toast.error(getErrorMessage(err), { position: "top-center" });
//       }
//     } finally {
//       setIsOtpSending(false); // End loading regardless of success/failure
//     }
//   };

//   // --- handleSubmit (This is your "Verify OTP" and Final Registration Trigger) ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNotification(null); // Clear previous notifications

//     // Re-validate all fields on submit to ensure everything is correct, including OTP
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       toast.error("Please correct the highlighted fields.", {
//         position: "top-center",
//       });
//       return;
//     }

//     // Ensure OTP was sent and entered
//     if (!otpSent) {
//       setNotification({
//         type: 'error',
//         message: 'Please send OTP and verify your phone number first.'
//       });
//       return;
//     }
//     if (!formData.otp.trim()) {
//       setNotification({
//         type: 'error',
//         message: 'OTP is required to complete registration.'
//       });
//       setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
//       return;
//     }

//     try {
//       // --- First, Verify OTP ---
//       const verifyPayload = {
//         email: formData.email,
//         otp: Number(formData.otp), // Convert OTP string to number
//         otpType: "register", // IMPORTANT: This was required by your backend
//       };

//       const res = await verify(verifyPayload).unwrap(); // Use 'verify' hook name

//       if (!res.success) { // If unwrap() didn't throw, but backend sent { success: false }
//         setNotification({
//           type: 'error',
//           message: res.message || 'OTP verification failed. Please try again.'
//         });
//         toast.error(res.message || 'OTP verification failed!', { position: "top-center" });
//         return;
//       }

//       // Store data from the verification response for final registration payload if needed
//       setUserDataFromVerify(res.data); // Store the actual data object from verify response

//       // If 'res' already contains the token and is sufficient to proceed:
//       localStorage.setItem("token", res?.data?.token || res.token); // Prioritize res.data.token, then res.token
//       localStorage.setItem("userData", JSON.stringify(res?.data || res)); // Store verified user data. Stringify objects!

//       toast.success(`${res?.message || 'OTP verified successfully!'}`, { position: "top-center" });

//       // Navigate after success
//       setTimeout(() => {
//         navigate("/dashboard"); 
//       }, 1000);

//     } catch (err) {
//       console.error("handleSubmit (Verify OTP) Error:", err);
//       setNotification({ type: 'error', message: getErrorMessage(err) });
//       toast.error(getErrorMessage(err), { position: "top-center" });
//     }
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTER</h1>
//         <p className="text-gray-600">Create a new account to get started</p>
//       </div>

//       <div className="space-y-3">
//         {/* Name Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Full Name"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.name && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.name}</div>
//             )}
//           </div>
//         </div>

//         {/* Phone Input */}
//         <div className="relative mb-5">
//           <div className={`flex rounded-lg border transition-all duration-200 overflow-hidden ${
//             errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
//           }`}>
//             <CountryCodeDropdown
//               value={selectedCode}
//               onChange={setSelectedCode}
//               className="bg-gray-50 py-3 px-3 border-r border-gray-200 hover:bg-gray-100"
//               // Pass the global countrycodes array to the dropdown
//               countryCodes={countrycodes} 
//             />
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="tel" // Use type="tel" for phone numbers
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Phone Number"
//                 className="w-full pl-10 pr-4 py-3 border-0 bg-transparent outline-none"
//               />
//             </div>
//           </div>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.phone && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.phone}</div>
//             )}
//           </div>
//         </div>

//         {/* Email Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Email"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

//         {/* Password Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

//         {/* Confirm Password Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Confirm Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.confirmPassword && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.confirmPassword}</div>
//             )}
//           </div>
//         </div>

//         {/* Referral ID Input */}
//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId" // Corrected name
//             value={formData.referralId}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.referralId && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.referralId}</div>
//             )}
//           </div>
//         </div>

//         {/* OTP Input and Send OTP Button */}
//         <div className="relative mb-5">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Shield className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="otp" // Corrected name
//                 value={formData.otp}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter 6-digit OTP"
//                 maxLength="6"
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                   errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                 }`}
//               />
//             </div>

//             {/* "Send OTP" / Initial Registration Button */}
//             <button
//               type="button"
//               onClick={handleVerify} // This now triggers initial registration/send OTP
//               disabled={isRegisterLoading || isOTPresentLoading || otpSent || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
//               className={`px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
//                 otpSent && timer > 0
//                   ? 'bg-green-100 text-green-700 cursor-default' // OTP sent and timer running
//                   : (isRegisterLoading || isOTPresentLoading)
//                   ? 'bg-gray-100 text-gray-500 cursor-not-allowed' // Loading
//                   : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // Form errors present
//                   : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md' // Ready to send
//               }`}
//             >
//               {isRegisterLoading || isOTPresentLoading ? 'Sending...' : otpSent && timer > 0 ? `Sent (${timer}s)` : 'Send OTP'}
//             </button>
//           </div>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.otp && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.otp}</div>
//             )}
//           </div>
//         </div>

//         {/* Resend OTP Button (Optional, if you want a separate button) */}
//         {otpSent && timer === 0 && (
//           <div className="text-center mt-2">
//             <button
//               type="button"
//               onClick={() => {
//                 setCanResendOtp(false); // Disable immediately on click
//                 handleVerify(); // Use handleVerify to re-trigger OTP send
//               }}
//               disabled={isOTPresentLoading || timer > 0}
//               className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
//             >
//               {isOTPresentLoading ? 'Resending...' : 'Resend OTP'}
//             </button>
//           </div>
//         )}

//         {/* Final Registration Button (after OTP verification) */}
//         <button
//           type="submit"
//           onClick={handleSubmit} // This now verifies OTP and completes registration
//           disabled={isVerifyLoading || !otpSent || Object.keys(errors).length > 0 || !formData.otp.trim()}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//         >
//           {isVerifyLoading ? 'Verifying OTP...' : 'REGISTER'}
//         </button>
//       </div>

//       <div className="mt-4 text-center">
//         <p className="text-gray-600">
//           Already have an account?{' '}
//           <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };




import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
import icon from '../assets/Images/greencoin.png'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation
} from './authApiSlice';

const countrycodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸', name: 'US' },
  { code: '+91', country: 'India', flag: '🇮🇳', name: 'IN' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', name: 'UK' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', name: 'DE' },
  { code: '+33', country: 'France', flag: '🇫🇷', name: 'FR' },
  { code: '+86', country: 'China', flag: '🇨🇳', name: 'CN' },
  { code: '+81', country: 'Japan', flag: '🇯🇵', name: 'JP' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷', name: 'KR' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', name: 'AU' },
  { code: '+7', country: 'Russia', flag: '🇷🇺', name: 'RU' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', name: 'BR' },
  { code: '+34', country: 'Spain', flag: '🇪🇸', name: 'ES' },
  { code: '+39', country: 'Italy', flag: '🇮🇹', name: 'IT' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱', name: 'NL' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', name: 'SE' }
];

const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countrycodes.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm) ||
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countrycodes.find(c => c.code === value) || countrycodes[1];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="font-medium">{selectedCountry.code}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="font-medium text-gray-900">{country.code}</span>
                <span className="text-gray-600 truncate">{country.country}</span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// const LoginComponent = ({ onSubmit, onToggleMode, isVisible }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [notification, setNotification] = useState(null);

//   const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();

//   useEffect(() => {
//     if (loginError) {
//       console.error("Login API Error:", loginError);
//       let errorMessage = 'An unexpected error occurred during login.';
//       if (loginError.data && loginError.data.message) {
//         errorMessage = loginError.data.message;
//       } else if (loginError.error) {
//         errorMessage = loginError.error;
//       } else if (loginError.status) {
//         if (loginError.status === 401) {
//           errorMessage = 'Invalid credentials. Please check your email and password.';
//         } else if (loginError.status === 403) {
//           errorMessage = 'Access denied.';
//         } else if (loginError.status >= 500) {
//           errorMessage = 'Server error. Please try again later.';
//         } else {
//           errorMessage = `Error: ${loginError.status}`;
//         }
//       }

//       setNotification({
//         type: 'error',
//         message: errorMessage
//       });
//     }
//   }, [loginError]);

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };
//     const emailRegex = /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/;
//     switch (name) {
//       case 'email':
//         if (!value.trim()) {
//           newErrors.email = 'Email is required';
//         } else if (!emailRegex.test(value)) {
//           newErrors.email = 'Invalid email address';
//         } else {
//           delete newErrors.email;
//         }
//         break;
//       case 'password':
//         if (!value) {
//           newErrors.password = 'Password is required';
//         } else if (value.length < 6) {
//           newErrors.password = 'Password must be at least 6 characters';
//         } else {
//           delete newErrors.password;
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let hasSubmitErrors = false;
//     const errorsOnSubmit = {};
//     if (!formData.email.trim()) {
//       errorsOnSubmit.email = 'Email is required';
//       hasSubmitErrors = true;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errorsOnSubmit.email = 'Invalid email address';
//       hasSubmitErrors = true;
//     }

//     if (!formData.password) {
//       errorsOnSubmit.password = 'Password is required';
//       hasSubmitErrors = true;
//     }
//     // else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//     //   errorsOnSubmit.password = 'Password must contain at least one special character';
//     //   hasSubmitErrors = true;
//     // }

//     setErrors(errorsOnSubmit);

//     if (hasSubmitErrors) {
//       console.log("Validation errors detected, preventing API call.");
//       setNotification({
//         type: 'error',
//         message: 'Please correct the highlighted fields.'
//       });
//       return;
//     }

//     setNotification(null);

//     try {
//       const payload = {
//         ...formData,
//         role: 1
//       };

//       const response = await loginUser(payload).unwrap();

//       if (response.success) {
//         setNotification({
//           type: 'success',
//           message: 'Login successful! Redirecting...'
//         });

//         if (response.token) {
//           localStorage.setItem('authToken', response.token);
//         }

//         if (onSubmit) {
//           onSubmit(payload);
//         }

//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 1000);
//       } else {
//         setNotification({
//           type: 'error',
//           message: response.message || 'Login failed. Please try again.'
//         });
//       }
//     } catch (error) {
//       console.error("Login API Catch Error:", error);
//     }
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
//         <p className="text-gray-600">Enter your credentials to access your account</p>
//       </div>

//       <div className="space-y-4">
//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             required
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

//         <div className="relative mb-6">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             required
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

//         <div className="text-right mt-4">
//           <button
//         onClick={() => navigate("/forgot-password")}
//         className="text-teal-600 hover:text-teal-700 text-sm font-medium"
//       >
//         Forgot Password?
//       </button>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isLoginLoading}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
//         >
//           {isLoginLoading ? 'Signing In...' : 'LOGIN'}
//         </button>
//       </div>

//       <div className="mt-8 text-center">
//         <p className="text-gray-600">
//           Don't have an account?{' '}
//           <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };
const LoginComponent = ({ onToggleMode, isVisible }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [login, { isLoading, error: loginError }] = useLoginMutation();

  useEffect(() => {
    if (loginError) {
      const message =
        loginError?.data?.message || "Login failed. Please try again.";
      setNotification({ type: "error", message });
    }
  }, [loginError]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setNotification({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    try {
      const response = await login({ ...formData, role: 1 }).unwrap();

      if (response?.success) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userData", JSON.stringify(response));

        setNotification({
          type: "success",
          message: response?.message || "Login successful! Redirecting...",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setNotification({
          type: "error",
          message: response?.message || "Login failed.",
        });
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: err?.data?.message || "Login error",
      });
    }
  };

  return (
    <div
      className={`w-full max-w-md transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
        <p className="text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        <div className="text-right mt-4">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isLoading ? "Signing In..." : "LOGIN"}
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onToggleMode}
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};
const RegisterComponent = ({ onSubmit, onToggleMode, isVisible }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCode, setSelectedCode] = useState('🇮🇳');
  const [notification, setNotification] = useState(null);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralId: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});

  const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
  const [verify, { isLoading: isVerifyLoading, error: verifyError }] = useVerifyMutation();
  const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] = useOTPresentMutation();

  const [userDataFromVerify, setUserDataFromVerify] = useState(null);

  const getErrorMessage = (error) => {
    if (error) {
      if (error.data && error.data.message) {
        return error.data.message;
      } else if (error.error) {
        return error.error;
      } else if (error.status) {
        if (error.status === 400) return `Bad Request: ${error.data?.message || 'Please check your input.'}`;
        if (error.status === 401) return `Unauthorized: ${error.data?.message || 'Invalid credentials.'}`;
        if (error.status === 409) return `Conflict: ${error.data?.message || 'User already exists or other conflict.'}`;
        if (error.status >= 500) return `Server Error: ${error.data?.message || 'Please try again later.'}`;
        return `Error ${error.status}: ${error.data?.message || 'An API error occurred.'}`;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };

  useEffect(() => {
    if (registerError) {
      console.error("Register API Error:", registerError);
      setNotification({ type: 'error', message: getErrorMessage(registerError) });
    }
  }, [registerError]);

  useEffect(() => {
    if (verifyError) {
      console.error("Verify OTP API Error:", verifyError);
      setNotification({ type: 'error', message: getErrorMessage(verifyError) });
    }
  }, [verifyError]);

  useEffect(() => {
    if (OTPresentError) {
      console.error("OTPresent API Error:", OTPresentError);
      setNotification({ type: 'error', message: getErrorMessage(OTPresentError) });
    }
  }, [OTPresentError]);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResendOtp(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/;
    const referralIdRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    const currentCountry = countrycodes.find(c => c.flag === selectedCode);
    const minPhoneLength = 7;
    const maxPhoneLength = currentCountry ? currentCountry.phone_length : 15;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d*$/.test(formData.phone)) {
      newErrors.phone = 'Phone number can only contain digits';
    } else if (formData.phone.length < minPhoneLength || formData.phone.length > maxPhoneLength) {
      newErrors.phone = `Phone number must be ${minPhoneLength}-${maxPhoneLength} digits long`;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email(must contain at least one letter)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (formData.referralId && !referralIdRegex.test(formData.referralId)) {
      newErrors.referralId = 'Referral ID can only contain letters and numbers length 13';
    }

    if (otpSent) {
      if (!formData.otp.trim()) {
        newErrors.otp = 'OTP is required';
      } else if (!/^\d{6}$/.test(formData.otp)) {
        newErrors.otp = 'OTP must be 6 digits';
      }
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }
    if (name === "referralId" && !/^[A-Za-z0-9]*$/.test(value)) {
      return;
    }
    if (name === "otp" && !/^[0-9]*$/.test(value)) {
      return;
    }

    if (name === "countryCode") {
      setSelectedCode(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors(validate());
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const currentErrors = validate();
    setErrors(currentErrors);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setNotification(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    const formErrorsExceptOtp = Object.keys(validationErrors).filter(key => key !== 'otp').length > 0;

    if (formErrorsExceptOtp) {
      setNotification({
        type: 'error',
        message: "Please fill all required details correctly."
      });
      return;
    }

    setIsOtpSending(true);

    try {
      const currentCountry = countrycodes.find(item => item.flag === selectedCode);
      const phoneWithCode = (currentCountry?.code || selectedCode) + formData.phone.replace(/\s/g, '');

      const payload = {
        name: formData.name,
        phone: phoneWithCode,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        referralId: formData.referralId || undefined,
        otpType: "register",
        country: currentCountry?.country || '',
        countryCode: currentCountry?.code || selectedCode
      };

      const result = await register(payload).unwrap();

      localStorage.setItem("username", result?.data?.username || formData.email);

      setOtpSent(true);
      setTimer(120);
      setCanResendOtp(false);
      setNotification({ type: 'success', message: "OTP sent to your email!" });

    } catch (err) {
      console.error("handleVerify (Register/OTPresent) Error:", err);
      if (err?.data?.message === "User verification pending") {
        try {
          const ress = await OTPresent({ email: formData.email, otpType: "register" }).unwrap();
          setOtpSent(true);
          setTimer(120);
          setCanResendOtp(false);
          setNotification({ type: 'success', message: "OTP resent to your email!" });
        } catch (otpErr) {
          console.error("OTPresent (Resend OTP) Error:", otpErr);
          setNotification({ type: 'error', message: getErrorMessage(otpErr) });
        }
      } else {
        setNotification({ type: 'error', message: getErrorMessage(err) });
      }
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setNotification({
        type: 'error',
        message: "Please correct the highlighted fields."
      });
      return;
    }

    if (!otpSent) {
      setNotification({
        type: 'error',
        message: 'Please send OTP and verify your phone number first.'
      });
      return;
    }
    if (!formData.otp.trim()) {
      setNotification({
        type: 'error',
        message: 'OTP is required to complete registration.'
      });
      setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
      return;
    }

    try {
      const verifyPayload = {
        email: formData.email,
        otp: Number(formData.otp),
        otpType: "register",
      };

      const res = await verify(verifyPayload).unwrap();

      if (!res.success) {
        setNotification({
          type: 'error',
          message: res.message || 'OTP verification failed. Please try again.'
        });
        return;
      }

      setUserDataFromVerify(res.data);

      localStorage.setItem("token", res?.data?.token || res.token);
      localStorage.setItem("userData", JSON.stringify(res?.data || res));

      setNotification({
        type: 'success',
        message: res?.message || 'Registration completed successfully!'
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("handleSubmit (Verify OTP) Error:", err);
      setNotification({ type: 'error', message: getErrorMessage(err) });
    }
  };

  return (
    <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">REGISTER</h1>
        <p className="text-gray-600">Create a new account to get started</p>
      </div>

      <div className="space-y-6">
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Full Name"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
          />
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.name && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.name}</div>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <div className={`flex rounded-lg border transition-all duration-200 overflow-hidden ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
            }`}>
            <CountryCodeDropdown
              value={selectedCode}
              onChange={setSelectedCode}
              className="bg-gray-50 py-3 px-3 border-r border-gray-200 hover:bg-gray-100"
              countryCodes={countrycodes}
            />
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Phone Number"
                className="w-full pl-10 pr-4 py-3 border-0 bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.phone && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.phone}</div>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
          />
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.email && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Password"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.password && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Confirm Password"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="referralId"
            value={formData.referralId}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Referral ID (Optional)"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
          />
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.referralId && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.referralId}</div>
            )}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
              />
            </div>

            <button
              type="button"
              onClick={handleVerify}
              disabled={isRegisterLoading || isOTPresentLoading || otpSent || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
              className={`px-4 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${otpSent && timer > 0
                ? 'bg-green-100 text-green-700 cursor-default'
                : (isRegisterLoading || isOTPresentLoading)
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md'
                }`}
            >
              {isRegisterLoading || isOTPresentLoading ? 'Sending...' : otpSent && timer > 0 ? `Sent (${timer}s)` : 'Send OTP'}
            </button>
          </div>
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.otp && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.otp}</div>
            )}
          </div>
        </div>

        {otpSent && timer === 0 && (
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => {
                setCanResendOtp(false);
                handleVerify();
              }}
              disabled={isOTPresentLoading || timer > 0}
              className="text-teal-600 hover:text-teal-700 font-semibold text-sm"
            >
              {isOTPresentLoading ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isVerifyLoading || !otpSent || Object.keys(errors).length > 0 || !formData.otp.trim()}
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isVerifyLoading ? 'Verifying OTP...' : 'REGISTER'}
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default function AuthContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cluster } = useParams();
  const [isLogin, setIsLogin] = useState(() => {
    if (cluster === 'login') return true;
    if (cluster === 'register') return false;
    return true;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    if (cluster === 'login') {
      setIsLogin(true);
    } else if (cluster === 'register') {
      setIsLogin(false);
    }
  }, [cluster]);

  const handleLoginSubmit = (values) => {
    console.log('Login submitted:', values);
  };

  const handleRegisterSubmit = (values) => {
    console.log('Register submitted:', values);
  };

  const toggleMode = () => {
    setIsTransitioning(true);

    // Navigate to appropriate cluster route
    const newCluster = isLogin ? 'register' : 'login';
    navigate(`/${newCluster}`, { replace: true });

    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  // Handle direct navigation via tab clicks
  const handleTabClick = (mode) => {
    if (isTransitioning) return;

    const cluster = mode === 'login' ? 'login' : 'register';
    navigate(`/${cluster}`, { replace: true });

    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(mode === 'login');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop View */}
      <div className="hidden lg:flex w-full h-screen relative">
        <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 transform transition-all duration-1000 ease-out ${isLogin ? 'left-0 translate-x-0' : 'left-1/2 translate-x-0'}`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>

          {/* Navigation Tabs */}
          <div className="absolute top-8 left-8 right-8 z-20">
            <div className="flex rounded-full p-2 shadow-xl border border-white/10">
              <button
                onClick={() => handleTabClick('login')}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${isLogin
                  ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
                  : ''
                  } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => handleTabClick('register')}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${!isLogin
                  ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
                  : ''
                  } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          {/* Enhanced Icon Section */}
          <div className="flex items-center justify-center w-full h-full relative z-10">
            {/* Inline SVG Backgrounds */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Place SVG */}
              <svg className="absolute top-12 left-12 w-28 h-28 opacity-10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>

              {/* Coins SVG */}
              <svg className="absolute bottom-16 left-16 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.64 8 2s-3.03 2-8 2-8-1.64-8-2 3.03-2 8-2zm0 14c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V16c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V12c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V10c0 .36-3.03 2-8 2z" />
              </svg>

              {/* User SVG */}
              <svg className="absolute top-1/2 right-16 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>

              {/* Share/Network SVG */}
              <svg className="absolute bottom-8 right-10 w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="white">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.018 3.018 0 0 0 0-1.39l7.05-4.11a2.99 2.99 0 1 0-.96-1.72L8 9.59a3 3 0 1 0 0 4.83l7.05 4.11c.12.62.45 1.17.95 1.56.5.39 1.14.61 1.8.61a3 3 0 1 0 0-6z" />
              </svg>
              <svg className="absolute top-8 right-12 w-20 h-20 opacity-10 rotate-12" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>

              {/* 🌱 Plant SVG */}
              <svg className="absolute bottom-12 left-6 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C10.34 2 9 3.34 9 5c0 .66.26 1.26.68 1.7L12 9l2.32-2.3A2.5 2.5 0 0 0 15 5c0-1.66-1.34-3-3-3zm6 7c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 9c-2.33 0-7 1.17-7 3.5V22h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>

              {/* 👥 Group SVG */}
              <svg className="absolute top-1/4 right-8 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
                <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h8v-1c0-.76.32-1.45.84-1.94C11.03 16.35 13.94 16 16 16s4.97.35 6.16.56c.52.49.84 1.18.84 1.94v1h-8v-1.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>

            {/* <div className="text-center text-white px-8">
              <div className="mb-14 relative">
                <div className="relative w-58 h-58 mx-auto mb-0 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
                  <img src={icon} alt="" width={300} />

                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
                  <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
                </div>
                <div className="relative">
                  <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
                  </h2>
                  <p className={`text-teal-50 text-lg leading-relaxed transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    {isLogin
                      ? 'Trade, Earn, Grow — All from One Jaimax Account.'
                      : 'The Next-Gen Crypto Platform Built for You. Register Today.'
                    }
                  </p>
                </div>
              </div>
            </div> */}
            <div className="text-center text-white px-8 flex flex-col items-center justify-center h-full">
  <div className="relative w-56 h-56 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
    <img src={icon} alt="Icon" className="w-full h-full object-contain" />
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
    <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
  </div>
  <div className="relative mt-6">
    <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
    </h2>
    <p className={`text-teal-50 text-lg leading-relaxed transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      {isLogin
        ? 'Trade, Earn, Grow — All from One Jaimax Account.'
        : 'The Next-Gen Crypto Platform Built for You. Register Today.'}
    </p>
  </div>
</div>

          </div>
        </div>

        {/* Right Section - Form */}
        <div className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out ${isLogin ? 'right-0 translate-x-0' : 'right-1/2 translate-x-0'}`}>
          <div className="flex items-center justify-center w-full h-full p-12">
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginComponent
                  onSubmit={handleLoginSubmit}
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                />
              ) : (
                <RegisterComponent
                  onSubmit={handleRegisterSubmit}
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Stack Layout */}
      <div className="lg:hidden w-full min-h-screen flex flex-col">

        {/* Mobile Header with Icon */}
        <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
          {/* Inline SVG Backgrounds */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Place SVG */}
            <svg className="absolute top-12 left-12 w-28 h-28 opacity-10" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>

            {/* Coins SVG */}
            <svg className="absolute bottom-16 left-16 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.64 8 2s-3.03 2-8 2-8-1.64-8-2 3.03-2 8-2zm0 14c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V16c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V12c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V10c0 .36-3.03 2-8 2z" />
            </svg>

            {/* User SVG */}
            <svg className="absolute top-1/2 right-16 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>

           

            <svg className="absolute top-8 right-12 w-20 h-20 opacity-10 rotate-12" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>

            <svg className="absolute bottom-12 left-6 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
              <path d="M18 2C10.34 2 9 3.34 9 5c0 .66.26 1.26.68 1.7L12 9l2.32-2.3A2.5 2.5 0 0 0 15 5c0-1.66-1.34-3-3-3zm6 7c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 9c-2.33 0-7 1.17-7 3.5V22h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>

          </div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>

          {/* Mobile Navigation */}
          <div className="relative z-10 p-4">
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
              <button
                onClick={() => handleTabClick('login')}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${isLogin
                  ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
                  : 'hover:bg-white/20'
                  } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => handleTabClick('register')}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${!isLogin
                  ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
                  : 'hover:bg-white/20'
                  } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                SIGN UP
              </button>
            </div>
          </div>

          {/* Mobile Icon Section */}
          <div className="relative z-10 py-8 text-center text-white">
            <div className="mb-6 relative">
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto mb-4  rounded-full flex items-center justify-center backdrop-blur-sm  shadow-xl transform transition-all duration-500 hover:scale-110">
                <img src={icon} alt="" width={200} />


                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>

            <div className="px-4">
              <h2 className={`text-2xl font-bold mb-2 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
              </h2>
              <p className={`text-teal-50 text-sm leading-relaxed transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                {isLogin
                  ? 'Trade, Earn, Grow — All from One Account.'
                  : 'Next-Gen Crypto Platform Built for You.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Form Content */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            {isLogin ? (
              <LoginComponent
                onSubmit={handleLoginSubmit}
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
              />
            ) : (
              <RegisterComponent
                onSubmit={handleRegisterSubmit}
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
              />
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}



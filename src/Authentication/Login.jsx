import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
import icon from '../assets/Images/greencoin.png'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import { MyContext } from './authContent';
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation
} from './authApiSlice';

import countrycodes from './countrycodes.json';
import TermsConditionsModal from './TermsAndConditions';
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

// const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
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

const CountryCodeDropdown = ({ value, onChange, className, countryCodes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Use the prop if provided, otherwise fallback to imported data
  const dataSource = countryCodes || countrycodes;

  const filteredCountries = dataSource.filter(country =>
    country.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.country_code.includes(searchTerm) ||
    country.country_code_alpha3.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = dataSource.find(c => c.country_code === value) || dataSource[0];

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.country-dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="country-dropdown-container relative">
      <button
        type="button"
        onClick={() => {
          console.log('Dropdown button clicked, isOpen:', !isOpen);
          setIsOpen(!isOpen);
        }}
        className={`${className} flex items-center justify-between min-w-[120px] hover:bg-teal-50 transition-colors duration-200`}
      >
        <span className="flex items-center gap-2 text-sm">
          <span className="text-lg">{selectedCountry?.flag}</span>
          <span className="font-medium">{selectedCountry?.country_code}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* IMPORTANT: Added fixed positioning and higher z-index */}
      {isOpen && (
        <div
          className="fixed top-auto left-auto mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-hidden"
          style={{
            zIndex: 9999,
            position: 'absolute',
            top: '100%',
            left: '0',
            minWidth: '280px',
          }}
        >
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => {
                console.log('Search term:', e.target.value);
                setSearchTerm(e.target.value);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-48 overflow-y-auto bg-white">
            {console.log('Rendering countries, count:', filteredCountries.length)}
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => {
                console.log('Rendering country:', country.country_name);
                return (
                  <button
                    key={`${country.country_code}-${country.country_code_alpha3}-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Selected country:', country);
                      onChange(country.country_code);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-teal-50 flex items-center gap-3 text-sm transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium text-gray-900">{country.country_code}</span>
                    <span className="text-gray-600 truncate">{country.country_name}</span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {dataSource.length === 0 ? 'No country data loaded' : 'No countries found'}
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

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
      className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
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
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
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

// const RegisterComponent = ({ onSubmit, onToggleMode, isVisible }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedCode, setSelectedCode] = useState('🇮🇳');
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
//   const { setData } = useContext(MyContext);

//   const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifyLoading, error: verifyError }] = useVerifyMutation();
//   const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] = useOTPresentMutation();

//   // Get the current country details
//   const getCurrentCountry = () => {
//     return countrycodes.find(item => item.code === selectedCode);
//   };

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

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/;
//     const referralIdRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/;

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }

//     const currentCountry = getCurrentCountry();
//     const minPhoneLength = 7;
//     const maxPhoneLength = currentCountry ? currentCountry.phone_length : 15;

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d*$/.test(formData.phone)) {
//       newErrors.phone = 'Phone number can only contain digits';
//     } else if (formData.phone.length < minPhoneLength || formData.phone.length > maxPhoneLength) {
//       newErrors.phone = `Phone number must be ${minPhoneLength}-${maxPhoneLength} digits long`;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email(must contain at least one letter)';
//     }

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
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one special character';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = 'Passwords must match';
//     }

//     if (formData.referralId && !referralIdRegex.test(formData.referralId)) {
//       newErrors.referralId = 'Referral ID can only contain letters and numbers length 13';
//     }

//     if (otpSent) {
//       if (!formData.otp.trim()) {
//         newErrors.otp = 'OTP is required';
//       } else if (!/^\d{4}$/.test(formData.otp)) {
//         newErrors.otp = 'OTP must be 4 digits';
//       }
//     }

//     return newErrors;
//   };

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

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     const currentErrors = validate();
//     setErrors(currentErrors);
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     const formErrorsExceptOtp = Object.keys(validationErrors).filter(key => key !== 'otp').length > 0;

//     if (formErrorsExceptOtp) {
//       setNotification({
//         type: 'error',
//         message: "Please fill all required fields correctly."
//       });
//       return;
//     }

//     setIsOtpSending(true);

//     try {
//       const currentCountry = getCurrentCountry();

//       // Create payload WITHOUT referralId for registration (following second code pattern)
//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword, // Use confirmPwd to match second code
//         countryCode: currentCountry?.country_code || currentCountry?.code || '+91',
//         country: currentCountry?.country_name || currentCountry?.country || 'India',
//         // Don't include referralId in registration payload
//       };

//       const result = await register(payload).unwrap();

//       // Store username following second code pattern
//       if (result?.data?.username) {
//         localStorage.setItem("username", result.data.username);

//       }

//       setOtpSent(true);
//       setTimer(120);
//       setCanResendOtp(false);
//       setNotification({ type: 'success', message: "OTP sent to your email!" });

//     } catch (err) {
//       console.error("handleVerify (Register/OTPresent) Error:", err);
//       if (err?.data?.message === "User verification pending") {
//         try {
//           const otpPayload = {
//             email: formData.email,
//             otpType: "register"
//           };
//           const ress = await OTPresent(otpPayload).unwrap();
//           setOtpSent(true);
//           setTimer(120);
//           setCanResendOtp(false);
//           setNotification({ type: 'success', message: "OTP resent to your email!" });
//         } catch (otpErr) {
//           console.error("OTPresent (Resend OTP) Error:", otpErr);
//           setNotification({ type: 'error', message: getErrorMessage(otpErr) });
//         }
//       } else {
//         setNotification({ type: 'error', message: getErrorMessage(err) });
//       }
//     } finally {
//       setIsOtpSending(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       setNotification({
//         type: 'error',
//         message: "Please correct the highlighted fields."
//       });
//       return;
//     }

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
//       // Include referralId in the verification payload (following second code pattern)
//       const verifyPayload = {
//         email: formData.email,
//         otp: Number(formData.otp),
//         otpType: "register",
//         referenceId: formData.referralId, // Include referralId here for verification
//       };

//       const res = await verify(verifyPayload).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: 'error',
//           message: res.message || 'OTP verification failed. Please try again.'
//         });
//         return;
//       }

//       // Prepare user data following second code pattern
//       const userRegisterData = {
//         ...res,
//         email: formData.email,
//         name: formData.name,
//         username: localStorage.getItem("username"),

//       };

//       // setData(userRegisterData)
//       localStorage.setItem("token", res?.data?.token);
//       localStorage.setItem("userData", JSON.stringify(res));

//       setNotification({
//         type: 'success',
//         message: res?.message || 'Registration completed successfully!'
//       });

//       localStorage.setItem(
//         "userRegisterData",
//         JSON.stringify(userRegisterData)
//       );
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);

//     } catch (err) {
//       console.error("handleSubmit (Verify OTP) Error:", err);
//       setNotification({ type: 'error', message: getErrorMessage(err) });
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

//       <div className="text-center mb-2">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">REGISTER</h1>
//         <p className="text-gray-600">Create a new account to get started</p>
//       </div>

//       <div className="space-y-6">
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
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.name && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.name}</div>
//             )}
//           </div>
//         </div>

//         <div className="relative mb-5">
//           <div className={`flex rounded-lg border transition-all duration-200 overflow-hidden ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
//             }`}>
//             <CountryCodeDropdown
//               value={selectedCode}
//               onChange={setSelectedCode}
//               className="bg-gray-50 py-3 px-3 border-r border-gray-200 hover:bg-gray-100"
//             />
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="tel"
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
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

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
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

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
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
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

//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId"
//             value={formData.referralId}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.referralId && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.referralId}</div>
//             )}
//           </div>
//         </div>

//         <div className="relative mb-5">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Shield className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter 4-digit OTP"
//                 maxLength="4"
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                   }`}
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleVerify}
//               disabled={isRegisterLoading || isOTPresentLoading || (otpSent && !canResendOtp) || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
//               className={`px-4 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${(otpSent && !canResendOtp)
//                 ? 'bg-green-100 text-green-700 cursor-default'
//                 : (isRegisterLoading || isOTPresentLoading)
//                   ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                   : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md'
//                 }`}
//             >
//               {isRegisterLoading || isOTPresentLoading ? 'Sending...' :
//                 otpSent && !canResendOtp ? `Sent (${timer}s)` :
//                   canResendOtp ? 'Send OTP' : 'ReSend OTP'}
//             </button>
//           </div>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.otp && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.otp}</div>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isVerifyLoading || !otpSent || Object.keys(errors).length > 0 || !formData.otp.trim()}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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

// const RegisterComponent = ({ onSubmit, onToggleMode, isVisible, showModal,
//   onShowModal,
//   onCloseModal,
//   onAgreeTerms,
//   isConfirmAgree }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedCode, setSelectedCode] = useState('+91');
//   const [notification, setNotification] = useState(null);
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [canResendOtp, setCanResendOtp] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
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

//   const getCurrentCountry = () => {
//     const country = countrycodes.find(item => item.country_code === selectedCode);
//     return country;
//   };

//   const handleCheckboxChange = (e) => {
//     const isChecked = e.target.checked;

//     if (isChecked) {
//       // User wants to check the box - show modal first
//       onShowModal();
//     } else {
//       // User unchecked the box - reset everything
//       setIsChecked(false);
//     }
//   };

//   const handleTermsLinkClick = (e) => {
//     e.preventDefault();
//     onShowModal();
//   };

//   // Update checkbox state when terms are confirmed
//   useEffect(() => {
//     if (isConfirmAgree) {
//       setIsChecked(true);
//     } else {
//       setIsChecked(false);
//     }
//   }, [isConfirmAgree]);

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

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/;
//     const referralIdRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/;

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }

//     const currentCountry = getCurrentCountry();
//     const exactPhoneLength = currentCountry ? currentCountry.phone_number_length : 10;

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d*$/.test(formData.phone)) {
//       newErrors.phone = 'Phone number can only contain digits';
//     } else if (formData.phone.length !== exactPhoneLength) {
//       newErrors.phone = `Phone number must be exactly ${exactPhoneLength} digits for ${currentCountry?.country_name || 'selected country'}`;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email(must contain at least one letter)';
//     }

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
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one special character';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = 'Passwords must match';
//     }

//     if (formData.referralId && !referralIdRegex.test(formData.referralId)) {
//       newErrors.referralId = 'Referral ID can only contain letters and numbers length 13';
//     }

//     if (otpSent) {
//       if (!formData.otp.trim()) {
//         newErrors.otp = 'OTP is required';
//       } else if (!/^\d{4}$/.test(formData.otp)) {
//         newErrors.otp = 'OTP must be 4 digits';
//       }
//     }

//     return newErrors;
//   };

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

//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors(validate());
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     const currentErrors = validate();
//     setErrors(currentErrors);
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     const formErrorsExceptOtp = Object.keys(validationErrors).filter(key => key !== 'otp').length > 0;

//     if (formErrorsExceptOtp) {
//       setNotification({
//         type: 'error',
//         message: "Please fill all required fields correctly."
//       });
//       return;
//     }

//     setIsOtpSending(true);

//     try {
//       const currentCountry = getCurrentCountry();

//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword,
//         countryCode: currentCountry?.country_code || '+91',
//         country: currentCountry?.country_name || 'India',
//       };

//       const result = await register(payload).unwrap();

//       if (result?.data?.username) {
//         localStorage.setItem("username", result.data.username);
//       }

//       setOtpSent(true);
//       setTimer(120);
//       setCanResendOtp(false);
//       setNotification({ type: 'success', message: "OTP sent to your email!" });

//     } catch (err) {
//       console.error("handleVerify (Register/OTPresent) Error:", err);
//       if (err?.data?.message === "User verification pending") {
//         try {
//           const otpPayload = {
//             email: formData.email,
//             otpType: "register"
//           };
//           const ress = await OTPresent(otpPayload).unwrap();
//           setOtpSent(true);
//           setTimer(120);
//           setCanResendOtp(false);
//           setNotification({ type: 'success', message: "OTP resent to your email!" });
//         } catch (otpErr) {
//           console.error("OTPresent (Resend OTP) Error:", otpErr);
//           setNotification({ type: 'error', message: getErrorMessage(otpErr) });
//         }
//       } else {
//         setNotification({ type: 'error', message: getErrorMessage(err) });
//       }
//     } finally {
//       setIsOtpSending(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     // Check if terms are accepted
//     if (!isChecked || !isConfirmAgree) {
//       setNotification({
//         type: 'error',
//         message: 'Please accept the Terms & Conditions and Privacy Policy to continue.'
//       });
//       return;
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setNotification({
//         type: 'error',
//         message: "Please correct the highlighted fields."
//       });
//       return;
//     }

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
//       const verifyPayload = {
//         email: formData.email,
//         otp: Number(formData.otp),
//         otpType: "register",
//         referenceId: formData.referralId,
//       };

//       const res = await verify(verifyPayload).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: 'error',
//           message: res.message || 'OTP verification failed. Please try again.'
//         });
//         return;
//       }

//       const userRegisterData = {
//         ...res,
//         email: formData.email,
//         name: formData.name,
//         username: localStorage.getItem("username"),
//       };

//       localStorage.setItem("token", res?.data?.token);
//       localStorage.setItem("userData", JSON.stringify(res));

//       setNotification({
//         type: 'success',
//         message: res?.message || 'Registration completed successfully!'
//       });

//       localStorage.setItem(
//         "userRegisterData",
//         JSON.stringify(userRegisterData)
//       );
      
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);

//     } catch (err) {
//       console.error("handleSubmit (Verify OTP) Error:", err);
//       setNotification({ type: 'error', message: getErrorMessage(err) });
//     }
//   };

//   return (
//     <div className={`w-full max-w-sm mx-auto px-4 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       {notification && (
//         <Notification
//           type={notification.type}
//           message={notification.message}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="text-center mb-4">
//         <h1 className="text-2xl font-bold text-gray-800 mb-1">REGISTER</h1>
//         <p className="text-sm text-gray-600">Create a new account to get started</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name Field */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <User className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Full Name"
//             className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {errors.name && (
//             <div className="text-red-500 text-xs mt-1">{errors.name}</div>
//           )}
//         </div>

//         {/* Phone Field */}
//         <div className="relative">
//           <div className={`flex rounded-lg border transition-all duration-200 ${
//             errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
//           }`}>
//             <div className="relative">
//               <CountryCodeDropdown
//                 value={selectedCode}
//                 onChange={setSelectedCode}
//                 className="bg-gray-50 py-2.5 px-2 text-sm border-r border-gray-200 hover:bg-gray-100"
//                 countryCodes={countrycodes}
//               />
//             </div>
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Phone Number"
//                 className="w-full pl-10 pr-3 py-2.5 text-sm border-0 bg-transparent outline-none"
//               />
//             </div>
//           </div>
//           {errors.phone && (
//             <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
//           )}
//         </div>

//         {/* Email Field */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Email"
//             className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {errors.email && (
//             <div className="text-red-500 text-xs mt-1">{errors.email}</div>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Password"
//             className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.password && (
//             <div className="text-red-500 text-xs mt-1">{errors.password}</div>
//           )}
//         </div>

//         {/* Confirm Password Field */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Confirm Password"
//             className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.confirmPassword && (
//             <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>
//           )}
//         </div>

//         {/* Referral ID Field */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId"
//             value={formData.referralId}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//               errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
//             }`}
//           />
//           {errors.referralId && (
//             <div className="text-red-500 text-xs mt-1">{errors.referralId}</div>
//           )}
//         </div>

//         {/* OTP Field */}
//         <div className="relative">
//           <div className="flex gap-2">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Shield className="h-4 w-4 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter 4-digit OTP"
//                 maxLength="4"
//                 className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
//                   errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                 }`}
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleVerify}
//               disabled={isRegisterLoading || isOTPresentLoading || (otpSent && !canResendOtp) || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
//               className={`px-3 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
//                 (otpSent && !canResendOtp)
//                   ? 'bg-green-100 text-green-700 cursor-default'
//                   : (isRegisterLoading || isOTPresentLoading)
//                   ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                   : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105'
//               }`}
//             >
//               {isRegisterLoading || isOTPresentLoading ? 'Sending...' :
//                 otpSent && !canResendOtp ? `Sent (${timer}s)` :
//                   canResendOtp ? 'Resend' : 'Send OTP'}
//             </button>
//           </div>
//           {errors.otp && (
//             <div className="text-red-500 text-xs mt-1">{errors.otp}</div>
//           )}
//         </div>

//         {/* Terms and Conditions */}
//         <div className="flex items-start gap-2">
//           <input
//             id="terms_and_conditions"
//             type="checkbox"
//             checked={isChecked && isConfirmAgree}
//             onChange={handleCheckboxChange}
//             className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
//           />
//           <label htmlFor="terms_and_conditions" className="text-xs text-gray-700">
//             I accept the{" "}
//             <button
//               type="button"
//               onClick={handleTermsLinkClick}
//               className="text-teal-600 hover:underline font-medium"
//             >
//               Terms & Conditions
//             </button>
//             {" "}and{" "}
//             <button
//               type="button"
//               onClick={handleTermsLinkClick}
//               className="text-teal-600 hover:underline font-medium"
//             >
//               Privacy Policy
//             </button>
//           </label>
//         </div>

//         {/* Register Button */}
//         <button
//           type="submit"
//           disabled={
//             isVerifyLoading || 
//             !otpSent || 
//             !formData.otp.trim() || 
//             !isChecked || 
//             !isConfirmAgree ||
//             !formData.name.trim() ||
//             !formData.phone.trim() ||
//             !formData.email.trim() ||
//             !formData.password ||
//             !formData.confirmPassword ||
//             formData.password !== formData.confirmPassword ||
//             (formData.referralId && !/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(formData.referralId))
//           }
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//         >
//           {isVerifyLoading ? 'Verifying OTP...' : 'REGISTER'}
//         </button>
//       </form>

//       <div className="mt-4 text-center">
//         <p className="text-sm text-gray-600">
//           Already have an account?{' '}
//           <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-medium">
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };
const RegisterComponent = ({ onSubmit, onToggleMode, isVisible, showModal,
  onShowModal,
  onCloseModal,
  onAgreeTerms,
  isConfirmAgree }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+91');
  const [notification, setNotification] = useState(null);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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

  const getCurrentCountry = () => {
    const country = countrycodes.find(item => item.country_code === selectedCode);
    return country;
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // User wants to check the box - show modal first
      onShowModal();
    } else {
      // User unchecked the box - reset everything
      setIsChecked(false);
    }
  };

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    onShowModal();
  };

  // Update checkbox state when terms are confirmed
  useEffect(() => {
    if (isConfirmAgree) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isConfirmAgree]);

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

    const currentCountry = getCurrentCountry();
    const exactPhoneLength = currentCountry ? currentCountry.phone_number_length : 10;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d*$/.test(formData.phone)) {
      newErrors.phone = 'Phone number can only contain digits';
    } else if (formData.phone.length !== exactPhoneLength) {
      newErrors.phone = `Phone number must be exactly ${exactPhoneLength} digits for ${currentCountry?.country_name || 'selected country'}`;
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
      } else if (!/^\d{4}$/.test(formData.otp)) {
        newErrors.otp = 'OTP must be 4 digits';
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

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

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
        message: "Please fill all required fields correctly."
      });
      return;
    }

    setIsOtpSending(true);

    try {
      const currentCountry = getCurrentCountry();

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPwd: formData.confirmPassword,
        countryCode: currentCountry?.country_code || '+91',
        country: currentCountry?.country_name || 'India',
      };

      const result = await register(payload).unwrap();

      if (result?.data?.username) {
        localStorage.setItem("username", result.data.username);
      }

      setOtpSent(true);
      setTimer(120);
      setCanResendOtp(false);
      setNotification({ type: 'success', message: "OTP sent to your email!" });

    } catch (err) {
      console.error("handleVerify (Register/OTPresent) Error:", err);
      if (err?.data?.message === "User verification pending") {
        try {
          const otpPayload = {
            email: formData.email,
            otpType: "register"
          };
          const ress = await OTPresent(otpPayload).unwrap();
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

    // Check if terms are accepted
    if (!isChecked || !isConfirmAgree) {
      setNotification({
        type: 'error',
        message: 'Please accept the Terms & Conditions and Privacy Policy to continue.'
      });
      return;
    }

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
        referenceId: formData.referralId,
      };

      const res = await verify(verifyPayload).unwrap();

      if (!res.success) {
        setNotification({
          type: 'error',
          message: res.message || 'OTP verification failed. Please try again.'
        });
        return;
      }

      const userRegisterData = {
        ...res,
        email: formData.email,
        name: formData.name,
        username: localStorage.getItem("username"),
      };

      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("userData", JSON.stringify(res));

      setNotification({
        type: 'success',
        message: res?.message || 'Registration completed successfully!'
      });

      localStorage.setItem(
        "userRegisterData",
        JSON.stringify(userRegisterData)
      );
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("handleSubmit (Verify OTP) Error:", err);
      setNotification({ type: 'error', message: getErrorMessage(err) });
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">REGISTER</h1>
        <p className="text-sm text-gray-600">Create a new account to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs pl-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <div className={`flex rounded-lg border transition-all duration-200 ${
            errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
          }`}>
            <div className="flex-shrink-0">
              <CountryCodeDropdown
                value={selectedCode}
                onChange={setSelectedCode}
                className="bg-gray-50 py-2.5 px-2 text-sm border-r border-gray-200 hover:bg-gray-100 min-w-0"
                countryCodes={countrycodes}
              />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Phone Number"
                className="w-full pl-10 pr-3 py-2.5 text-sm border-0 bg-transparent outline-none"
              />
            </div>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs pl-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Email"
              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs pl-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Password"
              className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs pl-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors z-10"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs pl-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Referral ID Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="referralId"
              value={formData.referralId}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Referral ID (Optional)"
              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.referralId && (
            <p className="text-red-500 text-xs pl-1">{errors.referralId}</p>
          )}
        </div>

        {/* OTP Field */}
        <div className="space-y-1">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter 4-digit OTP"
                maxLength="4"
                className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                  errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            <button
              type="button"
              onClick={handleVerify}
              disabled={isRegisterLoading || isOTPresentLoading || (otpSent && !canResendOtp) || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
              className={`px-3 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                (otpSent && !canResendOtp)
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : (isRegisterLoading || isOTPresentLoading)
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105'
              }`}
            >
              {isRegisterLoading || isOTPresentLoading ? 'Sending...' :
                otpSent && !canResendOtp ? `Sent (${timer}s)` :
                  canResendOtp ? 'Send OTP' : 'Resend'}
            </button>
          </div>
          {errors.otp && (
            <p className="text-red-500 text-xs pl-1">{errors.otp}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 pt-2">
          <input
            id="terms_and_conditions"
            type="checkbox"
            checked={isChecked && isConfirmAgree}
            onChange={handleCheckboxChange}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 flex-shrink-0"
          />
          <label htmlFor="terms_and_conditions" className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            I accept the{" "}
            <button
              type="button"
              onClick={handleTermsLinkClick}
              className="text-teal-600 hover:underline font-medium"
            >
              Terms & Conditions
            </button>
            {" "}and{" "}
            <button
              type="button"
              onClick={handleTermsLinkClick}
              className="text-teal-600 hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={
            isVerifyLoading || 
            !otpSent || 
            !formData.otp.trim() || 
            !isChecked || 
            !isConfirmAgree ||
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword ||
            formData.password !== formData.confirmPassword ||
            (formData.referralId && !/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/.test(formData.referralId))
          }
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
        >
          {isVerifyLoading ? 'Verifying OTP...' : 'REGISTER'}
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-medium">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
// const RegisterComponent = ({ onSubmit, onToggleMode, isVisible, showModal,
//   onShowModal,
//   onCloseModal,
//   onAgreeTerms,
//   isConfirmAgree }) => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedCode, setSelectedCode] = useState('+91'); // Changed to store country code instead of flag
//   const [notification, setNotification] = useState(null);
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   const [timer, setTimer] = useState(0);
//   // const [showModal, setShowModal] = useState(false);
//   // const [isConfirmAgree, setIsConfirmAgree] = useState(false);
//   const [canResendOtp, setCanResendOtp] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
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
//   // const { setData } = useContext(MyContext);

//   const [register, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifyLoading, error: verifyError }] = useVerifyMutation();
//   const [OTPresent, { isLoading: isOTPresentLoading, error: OTPresentError }] = useOTPresentMutation();

//   const getCurrentCountry = () => {
//     const country = countrycodes.find(item => item.country_code === selectedCode);
//     // console.log('getCurrentCountry - selectedCode:', selectedCode);
//     // console.log('getCurrentCountry - found country:', country);
//     return country;
//   };
//   const handleCheckboxChange = (e) => {
//     const isChecked = e.target.checked;

//     if (isChecked) {
//       // User wants to check the box - show modal first
//       onShowModal();
//     } else {
//       // User unchecked the box - reset everything
//       setIsChecked(false);
//     }
//   };
//   const handleTermsLinkClick = (e) => {
//     e.preventDefault();
//     onShowModal();
//   };

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

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^(?=[a-z0-9._%+-]*[a-z])[a-z0-9._%+-]+@(?:(?:[a-zA-Z0-9-]+\.)+(?:com|in|org|net|edu|gov|mil|info|co|io|me|biz)|jaimax\.com|test\.com)$/;
//     const referralIdRegex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{13}$/;

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }

//     // Fixed phone validation to use the correct JSON structure
//     const currentCountry = getCurrentCountry();
//     console.log('Current country for validation:', currentCountry);

//     // Use the phone_number_length from your JSON data
//     const exactPhoneLength = currentCountry ? currentCountry.phone_number_length : 10;

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d*$/.test(formData.phone)) {
//       newErrors.phone = 'Phone number can only contain digits';
//     } else if (formData.phone.length !== exactPhoneLength) {
//       newErrors.phone = `Phone number must be exactly ${exactPhoneLength} digits for ${currentCountry?.country_name || 'selected country'}`;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email(must contain at least one letter)';
//     }

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
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one special character';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = 'Passwords must match';
//     }

//     if (formData.referralId && !referralIdRegex.test(formData.referralId)) {
//       newErrors.referralId = 'Referral ID can only contain letters and numbers length 13';
//     }

//     if (otpSent) {
//       if (!formData.otp.trim()) {
//         newErrors.otp = 'OTP is required';
//       } else if (!/^\d{4}$/.test(formData.otp)) {
//         newErrors.otp = 'OTP must be 4 digits';
//       }
//     }

//     return newErrors;
//   };

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

//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors(validate());
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     const currentErrors = validate();
//     setErrors(currentErrors);
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     const formErrorsExceptOtp = Object.keys(validationErrors).filter(key => key !== 'otp').length > 0;

//     if (formErrorsExceptOtp) {
//       setNotification({
//         type: 'error',
//         message: "Please fill all required fields correctly."
//       });
//       return;
//     }

//     setIsOtpSending(true);

//     try {
//       const currentCountry = getCurrentCountry();

//       // Create payload WITHOUT referralId for registration (following second code pattern)
//       const payload = {
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//         confirmPwd: formData.confirmPassword, // Use confirmPwd to match second code
//         countryCode: currentCountry?.country_code || '+91',
//         country: currentCountry?.country_name || 'India',
//         // Don't include referralId in registration payload
//       };

//       const result = await register(payload).unwrap();

//       // Store username following second code pattern
//       if (result?.data?.username) {
//         localStorage.setItem("username", result.data.username);
//       }

//       setOtpSent(true);
//       setTimer(120);
//       setCanResendOtp(false);
//       setNotification({ type: 'success', message: "OTP sent to your email!" });

//     } catch (err) {
//       console.error("handleVerify (Register/OTPresent) Error:", err);
//       if (err?.data?.message === "User verification pending") {
//         try {
//           const otpPayload = {
//             email: formData.email,
//             otpType: "register"
//           };
//           const ress = await OTPresent(otpPayload).unwrap();
//           setOtpSent(true);
//           setTimer(120);
//           setCanResendOtp(false);
//           setNotification({ type: 'success', message: "OTP resent to your email!" });
//         } catch (otpErr) {
//           console.error("OTPresent (Resend OTP) Error:", otpErr);
//           setNotification({ type: 'error', message: getErrorMessage(otpErr) });
//         }
//       } else {
//         setNotification({ type: 'error', message: getErrorMessage(err) });
//       }
//     } finally {
//       setIsOtpSending(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setNotification(null);

//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       setNotification({
//         type: 'error',
//         message: "Please correct the highlighted fields."
//       });
//       return;
//     }

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
//       // Include referralId in the verification payload (following second code pattern)
//       const verifyPayload = {
//         email: formData.email,
//         otp: Number(formData.otp),
//         otpType: "register",
//         referenceId: formData.referralId, // Include referralId here for verification
//       };

//       const res = await verify(verifyPayload).unwrap();

//       if (!res.success) {
//         setNotification({
//           type: 'error',
//           message: res.message || 'OTP verification failed. Please try again.'
//         });
//         return;
//       }

//       // Prepare user data following second code pattern
//       const userRegisterData = {
//         ...res,
//         email: formData.email,
//         name: formData.name,
//         username: localStorage.getItem("username"),
//       };

//       // setData(userRegisterData)
//       localStorage.setItem("token", res?.data?.token);
//       localStorage.setItem("userData", JSON.stringify(res));

//       setNotification({
//         type: 'success',
//         message: res?.message || 'Registration completed successfully!'
//       });

//       localStorage.setItem(
//         "userRegisterData",
//         JSON.stringify(userRegisterData)
//       );
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);

//     } catch (err) {
//       console.error("handleSubmit (Verify OTP) Error:", err);
//       setNotification({ type: 'error', message: getErrorMessage(err) });
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

//       <div className="text-center mb-2">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">REGISTER</h1>
//         <p className="text-gray-600">Create a new account to get started</p>
//       </div>

//       <div className="space-y-6">
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
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.name && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.name}</div>
//             )}
//           </div>
//         </div>

//         <div className="relative mb-5">
//           <div className={`flex rounded-lg border transition-all duration-200 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
//             }`}>

//             {/* Separate the dropdown from the input container */}
//             <div className="relative">
//               <CountryCodeDropdown
//                 value={selectedCode}
//                 onChange={setSelectedCode}
//                 className="bg-gray-50 py-3 px-3 border-r border-gray-200 hover:bg-gray-100"
//                 countryCodes={countrycodes}
//               />
//             </div>

//             {/* Keep overflow-hidden only on the input part */}
//             <div className="relative flex-1 overflow-hidden">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="tel"
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
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.email && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
//             )}
//           </div>
//         </div>

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
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.password && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
//             )}
//           </div>
//         </div>

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
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
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

//         <div className="relative mb-5">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId"
//             value={formData.referralId}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
//               }`}
//           />
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.referralId && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.referralId}</div>
//             )}
//           </div>
//         </div>

//         <div className="relative mb-2">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Shield className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="otp"
//                 value={formData.otp}
//                 onChange={handleInputChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter 4-digit OTP"
//                 maxLength="4"
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                   }`}
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleVerify}
//               disabled={isRegisterLoading || isOTPresentLoading || (otpSent && !canResendOtp) || Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0}
//               className={`px-4 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${(otpSent && !canResendOtp)
//                 ? 'bg-green-100 text-green-700 cursor-default'
//                 : (isRegisterLoading || isOTPresentLoading)
//                   ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                   : Object.keys(validate()).filter(key => !['otp'].includes(key)).length > 0
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     : 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md'
//                 }`}
//             >
//               {isRegisterLoading || isOTPresentLoading ? 'Sending...' :
//                 otpSent && !canResendOtp ? `Sent (${timer}s)` :
//                   canResendOtp ? 'Send OTP' : 'ReSend OTP'}
//             </button>
//           </div>
//           <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
//             {errors.otp && (
//               <div className="text-red-500 text-sm animate-fadeIn">{errors.otp}</div>
//             )}
//           </div>
//         </div>
//         <div className="mb-2 flex items-start gap-2">
//           <input
//             id="terms_and_conditions"
//             type="checkbox"
//             checked={isChecked && isConfirmAgree} // Only checked if user actually agreed
//             onChange={handleCheckboxChange}
//             className="mt-1 h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
//           />
//           <label htmlFor="terms_and_conditions" className="text-sm text-gray-700">
//             I accept the{" "}
//             <button
//               type="button"
//               onClick={handleTermsLinkClick}
//               className="text-[#BD7809] hover:underline px-1 font-medium"
//             >
//               Terms & Conditions
//             </button>
//             {" "}and{" "}
//             <button
//               type="button"
//               onClick={handleTermsLinkClick}
//               className="text-[#BD7809] hover:underline px-1 font-medium"
//             >
//               Privacy Policy
//             </button>
//           </label>
//         </div>



//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isVerifyLoading || !otpSent || Object.keys(errors).length > 0 || !formData.otp.trim()}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-full font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cluster } = useParams();
//   const [isLogin, setIsLogin] = useState(() => {
//     if (cluster === 'login') return true;
//     if (cluster === 'register') return false;
//     return true;
//   });

//   const [isTransitioning, setIsTransitioning] = useState(false);
//   useEffect(() => {
//     if (cluster === 'login') {
//       setIsLogin(true);
//     } else if (cluster === 'register') {
//       setIsLogin(false);
//     }
//   }, [cluster]);

//   const handleLoginSubmit = (values) => {
//     console.log('Login submitted:', values);
//   };

//   const handleRegisterSubmit = (values) => {
//     console.log('Register submitted:', values);
//   };

//   const toggleMode = () => {
//     setIsTransitioning(true);

//     // Navigate to appropriate cluster route
//     const newCluster = isLogin ? 'register' : 'login';
//     navigate(`/${newCluster}`, { replace: true });

//     setTimeout(() => {
//       setIsLogin(!isLogin);
//       setTimeout(() => {
//         setIsTransitioning(false);
//       }, 50);
//     }, 250);
//   };

//   // Handle direct navigation via tab clicks
//   const handleTabClick = (mode) => {
//     if (isTransitioning) return;

//     const cluster = mode === 'login' ? 'login' : 'register';
//     navigate(`/${cluster}`, { replace: true });

//     setIsTransitioning(true);
//     setTimeout(() => {
//       setIsLogin(mode === 'login');
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
//                 onClick={() => handleTabClick('login')}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
//                   : ''
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => handleTabClick('register')}
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
//             {/* Inline SVG Backgrounds */}
//             <div className="absolute inset-0 z-0 pointer-events-none">
//               {/* Marker/Location SVG */}
//               <svg className="absolute top-8 left-10 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
//               </svg>

//               {/* Document/Code SVG */}
//               <svg className="absolute top-16 left-24 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M6 3h12v2H6v2h7c.55 0 1 .45 1 1s-.45 1-1 1H6v2h7.5c.83 0 1.5.67 1.5 1.5S14.33 14 13.5 14H6v2h5l5 5h-3l-4-4H6v-2H5v-2h1v-2H5V9h1V7H5V5h1V3z" />
//               </svg>

//               {/* Currency Loop SVG */}
//               <svg className="absolute top-12 right-16 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M12 1v2.05c-2.83.49-5 2.94-5 5.95h2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4h-1v2h1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4H7c0 3.01 2.17 5.46 5 5.95V23h2v-2.05c2.83-.49 5-2.94 5-5.95s-2.17-5.46-5-5.95V7.95C17.83 7.46 20 5.01 20 2h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H9c0 3.01 2.17 5.46 5 5.95V1h-2z" />
//               </svg>

//               {/* Printer SVG */}
//               <svg className="absolute top-1/2 left-16 w-24 h-24 opacity-10 -translate-y-1/2" viewBox="0 0 24 24" fill="white">
//                 <path d="M16.2 9.6c.9-.9 1.2-2.4.6-3.6-.6-1.3-2.1-2-3.6-1.9V2h-2v2h-2V2H7v2H5v2h1v10H5v2h2v2h2v-2h2v2h2v-2c2.1 0 4-1.3 4-3.5 0-1.4-.7-2.5-1.8-3.1zM10 7h3c.6 0 1 .4 1 1s-.4 1-1 1h-3V7zm3.5 8H10v-2h3.5c.6 0 1 .4 1 1s-.4 1-1 1z" />
//               </svg>

//               {/* Coins SVG */}
//               <svg className="absolute bottom-24 left-20 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.64 8 2s-3.03 2-8 2-8-1.64-8-2 3.03-2 8-2zm0 14c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V16c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V12c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V10c0 .36-3.03 2-8 2z" />
//               </svg>

//               {/* User SVG */}
//               <svg className="absolute top-2/3 right-24 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
//               </svg>

//               {/* Share SVG */}
//               <svg className="absolute bottom-8 right-16 w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.018 3.018 0 0 0 0-1.39l7.05-4.11a2.99 2.99 0 1 0-.96-1.72L8 9.59a3 3 0 1 0 0 4.83l7.05 4.11c.12.62.45 1.17.95 1.56.5.39 1.14.61 1.8.61a3 3 0 1 0 0-6z" />
//               </svg>

//               {/* Arrow SVG */}
//               <svg className="absolute top-6 right-10 w-16 h-16 opacity-10 rotate-12" viewBox="0 0 24 24" fill="white">
//                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//               </svg>

//               {/* Plant SVG */}
//               <svg className="absolute bottom-10 left-10 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M12 2C10.34 2 9 3.34 9 5c0 .66.26 1.26.68 1.7L12 9l2.32-2.3A2.5 2.5 0 0 0 15 5c0-1.66-1.34-3-3-3zm6 7c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 9c-2.33 0-7 1.17-7 3.5V22h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
//               </svg>

//               {/* Group SVG */}
//               <svg className="absolute top-1/3 right-8 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//                 <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h8v-1c0-.76.32-1.45.84-1.94C11.03 16.35 13.94 16 16 16s4.97.35 6.16.56c.52.49.84 1.18.84 1.94v1h-8v-1.5c0-2.33-4.67-3.5-7-3.5z" />
//               </svg>
//             </div>


//             {/* <div className="text-center text-white px-8">
//               <div className="mb-14 relative">
//                 <div className="relative w-58 h-58 mx-auto mb-0 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
//                   <img src={icon} alt="" width={300} />

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
//             </div> */}
//             <div className="text-center text-white px-8 flex flex-col items-center justify-center h-full">
//               <div className="relative w-56 h-56 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
//                 <img src={icon} alt="Icon" className="w-full h-full object-contain" />
//                 <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
//                 <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
//                 <div className="absolute top-1/2 -right-4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"></div>
//               </div>
//               <div className="relative mt-6">
//                 <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 transform bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                   {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
//                 </h2>
//                 <p className={`text-teal-50 text-lg leading-relaxed transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                   {isLogin
//                     ? 'Trade, Earn, Grow — All from One Jaimax Account.'
//                     : 'The Next-Gen Crypto Platform Built for You. Register Today.'}
//                 </p>
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
//           {/* Inline SVG Backgrounds */}
//           <div className="absolute inset-0 z-0 pointer-events-none">
//             {/* Place SVG */}
//             <svg className="absolute top-12 left-12 w-28 h-28 opacity-10" viewBox="0 0 24 24" fill="white">
//               <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
//             </svg>

//             {/* Coins SVG */}
//             <svg className="absolute bottom-16 left-16 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//               <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.97 0 8 1.64 8 2s-3.03 2-8 2-8-1.64-8-2 3.03-2 8-2zm0 14c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V16c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V12c0 .36-3.03 2-8 2zm0-4c-4.97 0-8-1.64-8-2v-1.09c1.87 1.01 5.19 1.59 8 1.59s6.13-.58 8-1.59V10c0 .36-3.03 2-8 2z" />
//             </svg>

//             {/* User SVG */}
//             <svg className="absolute top-1/2 right-16 w-24 h-24 opacity-10" viewBox="0 0 24 24" fill="white">
//               <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
//             </svg>



//             <svg className="absolute top-8 right-12 w-20 h-20 opacity-10 rotate-12" viewBox="0 0 24 24" fill="white">
//               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//             </svg>

//             <svg className="absolute bottom-12 left-6 w-20 h-20 opacity-10" viewBox="0 0 24 24" fill="white">
//               <path d="M18 2C10.34 2 9 3.34 9 5c0 .66.26 1.26.68 1.7L12 9l2.32-2.3A2.5 2.5 0 0 0 15 5c0-1.66-1.34-3-3-3zm6 7c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 9c-2.33 0-7 1.17-7 3.5V22h14v-1.5c0-2.33-4.67-3.5-7-3.5z" />
//             </svg>

//           </div>

//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
//             <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
//             <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
//           </div>

//           {/* Mobile Navigation */}
//           <div className="relative z-10 p-4">
//             <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
//               <button
//                 onClick={() => handleTabClick('login')}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
//                   : 'hover:bg-white/20'
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => handleTabClick('register')}
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
//               <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
//               <div className="relative w-32 h-32 mx-auto mb-4  rounded-full flex items-center justify-center backdrop-blur-sm  shadow-xl transform transition-all duration-500 hover:scale-110">
//                 <img src={icon} alt="" width={200} />


//                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
//                 <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
//               </div>
//             </div>

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

  // ADD: Terms modal state management at AuthContainer level
  const [showModal, setShowModal] = useState(false);
  const [isConfirmAgree, setIsConfirmAgree] = useState(false);

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

  // ADD: Terms modal handlers at AuthContainer level
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!isConfirmAgree) {
      // If user closes without agreeing, reset the agreement
      setIsConfirmAgree(false);
    }
    setShowModal(false);
  };

  const handleAgreeTerms = (isAgreed) => {
    setIsConfirmAgree(isAgreed);
    setShowModal(false);
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    const newCluster = isLogin ? 'register' : 'login';
    navigate(`/${newCluster}`, { replace: true });

    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

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
        {/* Left Section - Gradient Background */}
        <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 transform transition-all duration-1000 ease-out ${isLogin ? 'left-0 translate-x-0' : 'left-1/2 translate-x-0'}`}>
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

          {/* Icon Section */}
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
                  // PASS: Modal props to RegisterComponent
                  showModal={showModal}
                  onShowModal={handleShowModal}
                  onCloseModal={handleCloseModal}
                  onAgreeTerms={handleAgreeTerms}
                  isConfirmAgree={isConfirmAgree}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Stack Layout */}
      <div className="lg:hidden w-full min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 relative overflow-hidden">
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
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl transform transition-all duration-500 hover:scale-110">
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
                // PASS: Modal props to RegisterComponent
                showModal={showModal}
                onShowModal={handleShowModal}
                onCloseModal={handleCloseModal}
                onAgreeTerms={handleAgreeTerms}
                isConfirmAgree={isConfirmAgree}
              />
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Render at AuthContainer level */}
      {showModal && (
        <TermsConditionsModal
          show={showModal}
          onHide={handleCloseModal}
          onAgree={handleAgreeTerms}
        />
      )}

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

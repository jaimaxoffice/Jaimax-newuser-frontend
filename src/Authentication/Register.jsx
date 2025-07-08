import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Eye, EyeOff, Mail, Users, Lock, ArrowRight, Shield, User, Phone, Key, ChevronDown, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import Logo from "./Logo";
import countryCodes from './countryCodes.json';
import { useRegisterMutation, useVerifyMutation, useOTPresentMutation } from './authApiSlice'; // Update the import path
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    otp: '',
    countryCode: '🇮🇳',
    countryPhoneCode: '+91',
    country: 'India'
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({});

  const navigate = useNavigate()
  // API hooks
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const validateField = useCallback((name, value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|mil|info|co|io|me|biz|live|yahoo|gmail)$/i;
    const phoneRegex = /^\d+$/;
    switch (name) {
      case 'name':
        if (!value.trim()) return { isValid: false, message: 'Full name is required' };
        if (value.length < 3) return { isValid: false, message: 'Name must be at least 3 characters' };
        if (!/^[A-Za-z\s]+$/.test(value)) return { isValid: false, message: 'Name can only contain letters and spaces' };
        return { isValid: true, message: '' };
      case 'email':
        if (!value.trim()) return { isValid: false, message: 'Email is required' };
        if (!emailRegex.test(value.trim())) return { isValid: false, message: 'Please enter a valid email address' };
        return { isValid: true, message: '' };
      case 'phone':
        if (!value.trim()) return { isValid: false, message: 'Phone number is required' };
        if (!phoneRegex.test(value)) return { isValid: false, message: 'Phone number should contain only digits' };
        if (formData.countryPhoneCode === '+91' && value.length !== 10) return { isValid: false, message: 'Phone number must be 10 digits for India' };
        if (formData.countryPhoneCode !== '+91' && (value.length < 4 || value.length > 15)) return { isValid: false, message: 'Phone number must be between 4 to 15 digits' };
        return { isValid: true, message: '' };
      case 'password':
        if (!value) return { isValid: false, message: 'Password is required' };
        if (value.length < 8) return { isValid: false, message: 'Password must be at least 8 characters long' };
        if (!/(?=.*[a-z])/.test(value)) return { isValid: false, message: 'Password must contain at least one lowercase letter' };
        if (!/(?=.*[A-Z])/.test(value)) return { isValid: false, message: 'Password must contain at least one uppercase letter' };
        if (!/(?=.*\d)/.test(value)) return { isValid: false, message: 'Password must contain at least one number' };
        if (!/(?=.*[^A-Za-z0-9])/.test(value)) return { isValid: false, message: 'Password must contain at least one special character' };
        return { isValid: true, message: '' };
      case 'confirmPassword':
        if (!value) return { isValid: false, message: 'Please confirm your password' };
        if (formData.password !== value) return { isValid: false, message: 'Passwords do not match' };
        return { isValid: true, message: '' };
      case 'referralCode':
        if (!value.trim()) return { isValid: true, message: '' };
        if (!/^[A-Z0-9]+$/.test(value)) return { isValid: false, message: 'Referral code must contain only capital letters and numbers' };
        return { isValid: true, message: '' };
      default:
        return { isValid: true, message: '' };
    }
  }, [formData.password, formData.countryPhoneCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    const validation = validateField(name, value);
    setFieldValidation(prev => ({
      ...prev,
      [name]: validation
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountrySelect = (country) => {
    setFormData(prev => ({
      ...prev,
      countryCode: country.flag,
      countryPhoneCode: country.country_code,
      country: country.country_name,
      phone: ''
    }));
    setShowCountryDropdown(false);
    if (formData.phone) {
      const validation = validateField('phone', '');
      setFieldValidation(prev => ({
        ...prev,
        phone: validation
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'referralCode' && field !== 'otp' && field !== 'countryCode' && field !== 'countryPhoneCode' && field !== 'country') {
        const validation = validateField(field, formData[field]);
        if (!validation.isValid) {
          newErrors[field] = validation.message;
        }
      }
    });
    if (otpSent && !formData.otp) {
      newErrors.otp = 'Please enter the OTP';
    }
    if (!agreeTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    // Validate required fields first
    const requiredFields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const hasErrors = requiredFields.some(field => {
      const validation = validateField(field, formData[field]);
      return !validation.isValid;
    });
    
    if (hasErrors) {
      validate();
      return;
    }

    setOtpLoading(true);
    try {
      // Prepare registration data
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.countryPhoneCode + formData.phone,
        password: formData.password,
        referralCode: formData.referralCode.trim() || undefined,
        countryCode: formData.countryPhoneCode,
        country: formData.country
      };

      // Call the register API
      const response = await register(registrationData).unwrap();
      
      // If registration is successful, set OTP sent state
      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent!',
        text: 'OTP sent successfully to your email!',
        timer: 2000,
        showConfirmButton: false,
      });
      
    } catch (error) {
      // console.error('Registration error:', error);
      
      // Handle specific error messages from the API
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.status === 400) {
        errorMessage = 'Invalid registration data. Please check your inputs.';
      } else if (error?.status === 409) {
        errorMessage = 'Email or phone number already exists.';
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setOtpLoading(true);
    try {
      const otpData = {
        email: formData.email.trim(),
        phone: formData.countryPhoneCode + formData.phone,
        otpType: "register", // Match the same value as verification
      };

      // console.log('Resend OTP data being sent:', otpData); // Debug log
      
      await resendOtp(otpData).unwrap();
      
      setTimer(60);
      setCanResend(false);
      
      Swal.fire({
        icon: 'success',
        title: 'OTP Resent!',
        text: 'New OTP sent successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
      
    } catch (error) {
      // console.error('Resend OTP error:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Failed to resend OTP',
        text: 'Please try again later.',
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Additional OTP validation matching your previous code
    if (!formData.otp) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "OTP is required",
      }));
      Swal.fire({
        icon: 'error',
        title: 'OTP Required',
        text: 'Please enter the OTP sent to your email.',
      });
      return;
    }

    // Validate OTP is a number
    if (isNaN(formData.otp)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: "OTP must be a number",
      }));
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP Format',
        text: 'OTP must be a number.',
      });
      return;
    }

    setLoading(true);
    try {
      // Prepare verification data matching your API structure
      const payload = {
        email: formData.email,
        otp: Number(formData.otp), // Convert to number like your previous code
        otpType: "register",
      };

      // console.log('Verification payload being sent:', payload); // Debug log

      // Call the verify API
      const res = await verify(payload).unwrap();
      
      // Handle successful response like your previous code
      const userRegisterData = {
        ...res,
        email: formData.email,
        name: formData.name,
        username: localStorage.getItem("username") || formData.name, // Fallback if no username
      };
      
      // Store user data in localStorage
      if (res?.data) {
        localStorage.setItem("userData", JSON.stringify(res.data));
      }
      
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      localStorage.setItem("userRegisterData", JSON.stringify(userRegisterData));
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: res?.message || 'Welcome to JAIMAX! Your account has been verified.',
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        // Navigate to home page like your previous code
        navigate("/dashboard"); // Uncomment this when you add navigation
        // window.location.href = '/home'; // Alternative navigation
      });
      
    } catch (err) {
      // console.error('Verification error:', err);
      
      let errorMessage = 'Verification failed. Please try again.';
      
      if (err?.data?.message) {
        errorMessage = err.data.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const getFieldIcon = (fieldName) => {
    const validation = fieldValidation[fieldName];
    if (!validation) return null;
    return validation.isValid ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-400" />
    );
  };

  return (
    <div className="min-h-screen bg-[#094e54] flex items-center justify-center p-2">
      <div className={`w-full max-w-8xl grid grid-cols-1 lg:grid-cols-2 gap-4 items-start`}>
        {/* Branding Section */}
        <div className="order-1 lg:order-none flex flex-col items-center justify-center text-center space-y-4 p-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mb-1 drop-shadow-lg">
            JAIMAX
          </h1>
          <div className="flex items-start justify-start gap-2 text-sky-200/90 text-base font-medium">
            <Shield className="w-5 h-5 text-sky-300" />
            <span>"Your Security, Our Priority – Join with Confidence"</span>
          </div>
          <Logo />
        </div>
        
        {/* Registration Form */}
        <div className="order-2 lg:order-none w-full max-w-md mx-auto" style={{ position: "relative", top: "0" }}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 shadow-2xl border border-white/20 hover:shadow-purple-500/20 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-3">
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
                Sign Up
              </h1>
              
              {/* Full Name */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                  <span className="text-red-400">*</span>
                  {getFieldIcon('name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 bg-white/10 border ${errors.name ? 'border-red-400' :
                    fieldValidation.name?.isValid ? 'border-green-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  placeholder="Enter your full name"
                  disabled={otpSent}
                />
                {(errors.name || fieldValidation.name?.message) && (
                  <p className={`text-xs flex items-center gap-1 ${errors.name ? 'text-red-400' : fieldValidation.name?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {errors.name || fieldValidation.name?.message}
                  </p>
                )}
              </div>

              {/* Phone Number with Country Code */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                  <span className="text-red-400">*</span>
                  {getFieldIcon('phone')}
                </label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-2 px-2 py-1 bg-white/10 border border-white/20 rounded-full hover:border-white/40 transition-all duration-200 backdrop-blur-sm min-w-[80px]"
                      disabled={otpSent}
                    >
                      <span className="text-lg">{formData.countryCode}</span>
                      <span className="font-medium text-gray-200">{formData.countryPhoneCode}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {showCountryDropdown && !otpSent && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                        {countryCodes.map((country, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-black/10 transition-colors duration-200 text-left text-gray-800"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="font-medium">{country.country_code}</span>
                            <span className="text-sm">{country.country_name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 bg-white/10 border ${errors.phone ? 'border-red-400' :
                      fieldValidation.phone?.isValid ? 'border-green-400' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                    placeholder="Phone number"
                    disabled={otpSent}
                  />
                </div>
                {(errors.phone || fieldValidation.phone?.message) && (
                  <p className={`text-xs flex items-center gap-1 ${errors.phone ? 'text-red-400' : fieldValidation.phone?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {errors.phone || fieldValidation.phone?.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                  <span className="text-red-400">*</span>
                  {getFieldIcon('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 bg-white/10 border ${errors.email ? 'border-red-400' :
                    fieldValidation.email?.isValid ? 'border-green-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  placeholder="Enter your email"
                  disabled={otpSent}
                />
                {(errors.email || fieldValidation.email?.message) && (
                  <p className={`text-xs flex items-center gap-1 ${errors.email ? 'text-red-400' : fieldValidation.email?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {errors.email || fieldValidation.email?.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                  <span className="text-red-400">*</span>
                  {getFieldIcon('password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 bg-white/10 border ${errors.password ? 'border-red-400' :
                      fieldValidation.password?.isValid ? 'border-green-400' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                    placeholder="Password"
                    disabled={otpSent}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword((s) => !s)}
                    disabled={otpSent}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {(errors.password || fieldValidation.password?.message) && (
                  <p className={`text-xs flex items-center gap-1 ${errors.password ? 'text-red-400' : fieldValidation.password?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {errors.password || fieldValidation.password?.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                  <span className="text-red-400">*</span>
                  {getFieldIcon('confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 bg-white/10 border ${errors.confirmPassword ? 'border-red-400' :
                      fieldValidation.confirmPassword?.isValid ? 'border-green-400' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                    placeholder="Confirm password"
                    disabled={otpSent}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    disabled={otpSent}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {(errors.confirmPassword || fieldValidation.confirmPassword?.message) && (
                  <p className={`text-xs flex items-center gap-1 ${errors.confirmPassword ? 'text-red-400' : fieldValidation.confirmPassword?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {errors.confirmPassword || fieldValidation.confirmPassword?.message}
                  </p>
                )}
              </div>

              {/* Referral Code */}
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Referral Code (Optional)
                  {getFieldIcon('referralCode')}
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className={`w-full px-3 py-1.5 bg-white/10 border ${errors.referralCode ? 'border-red-400' :
                    fieldValidation.referralCode?.isValid ? 'border-green-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  placeholder="Referral code"
                  disabled={otpSent}
                />
                {(errors.referralCode || fieldValidation.referralCode?.message) && (
                  <p className={`text-xs flex items-center gap-1 ${errors.referralCode ? 'text-red-400' : fieldValidation.referralCode?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {errors.referralCode || fieldValidation.referralCode?.message}
                  </p>
                )}
              </div>

              {/* OTP Section */}
              {otpSent && (
                <div className="space-y-0.5">
                  <label className="text-xs font-medium text-gray-200 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    OTP
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 bg-white/10 border ${errors.otp ? 'border-red-400' : 'border-white/20'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                      placeholder="Enter OTP"
                      maxLength={8}
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    <button
                      type="button"
                      className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs flex items-center gap-1 disabled:opacity-50 hover:bg-blue-600 transition-colors"
                      disabled={!canResend || isResending}
                      onClick={handleResendOTP}
                    >
                      <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                      {isResending ? 'Sending...' : 'Resend'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    {errors.otp && (
                      <p className="text-xs text-red-400">{errors.otp}</p>
                    )}
                    <span className="text-xs text-gray-200 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" /> {formatTime(timer)}
                    </span>
                  </div>
                </div>
              )}

              {/* Send OTP Button */}
              {!otpSent && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={otpLoading || isRegistering}
                    onClick={handleSendOTP}
                  >
                    {otpLoading || isRegistering ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  id="terms"
                />
                <label htmlFor="terms" className="text-xs text-gray-200">
                  I agree to the <span className="underline cursor-pointer">terms and conditions</span>
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-400">{errors.terms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-full text-sm hover:from-teal-500 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                disabled={loading || isVerifying || !otpSent}
              >
                {loading || isVerifying ? "Verifying..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
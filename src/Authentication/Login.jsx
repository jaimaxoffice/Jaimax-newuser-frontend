// import React, { useState, useEffect } from 'react';
// import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown } from 'lucide-react';
// import icon from '../assets/Images/jaicoins.svg'
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
// const CountryCodeDropdown = ({ value, onChange, className }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCountries = countrycodes.filter(country => 
//     country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     country.code.includes(searchTerm) ||
//     country.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const selectedCountry = countrycodes.find(c => c.code === value) || countrycodes[1]; // Default to India

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
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});

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
//     }

//     setErrors(newErrors);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     Object.keys(formData).forEach(key => {
//       validateField(key, formData[key]);
//     });

//     const hasErrors = Object.keys(errors).length > 0;
//     if (hasErrors) return;

//     setIsSubmitting(true);
//     onSubmit(formData);
//     setTimeout(() => setIsSubmitting(false), 1000);
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
//         <p className="text-gray-600">Enter your credentials to access your account</p>
//       </div>

//       <div className="space-y-6">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
//         </div>

//         <div className="text-right">
//           <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
//             Forgot Password?
//           </a>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Signing In...' : 'LOGIN'}
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
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [selectedCode, setSelectedCode] = useState('+91');
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
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };

//     switch (name) {
//       case 'name':
//         if (!value.trim()) {
//           newErrors.name = 'Name is required';
//         } else if (value.length < 2) {
//           newErrors.name = 'Name must be at least 2 characters';
//         } else {
//           delete newErrors.name;
//         }
//         break;
//       case 'phone':
//         if (!value.trim()) {
//           newErrors.phone = 'Phone number is required';
//         } else if (!/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
//           newErrors.phone = 'Please enter a valid phone number';
//         } else {
//           delete newErrors.phone;
//         }
//         break;
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
//         } else if (value.length < 8) {
//           newErrors.password = 'Password must be at least 8 characters';
//         } else if (!/[a-z]/.test(value)) {
//           newErrors.password = 'Password must contain at least one lowercase letter';
//         } else if (!/[A-Z]/.test(value)) {
//           newErrors.password = 'Password must contain at least one uppercase letter';
//         } else if (!/\d/.test(value)) {
//           newErrors.password = 'Password must contain at least one number';
//         } else {
//           delete newErrors.password;
//         }
//         break;
//       case 'confirmPassword':
//         if (!value) {
//           newErrors.confirmPassword = 'Please confirm your password';
//         } else if (value !== formData.password) {
//           newErrors.confirmPassword = 'Passwords must match';
//         } else {
//           delete newErrors.confirmPassword;
//         }
//         break;
//       case 'referralId':
//         if (value && !/^[A-Za-z0-9]*$/.test(value)) {
//           newErrors.referralId = 'Referral ID can only contain letters and numbers';
//         } else {
//           delete newErrors.referralId;
//         }
//         break;
//       case 'otp':
//         if (otpSent && !value) {
//           newErrors.otp = 'OTP is required';
//         } else if (value && !/^\d{6}$/.test(value)) {
//           newErrors.otp = 'OTP must be 6 digits';
//         } else {
//           delete newErrors.otp;
//         }
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleSendOTP = async () => {
//     if (!formData.phone || !/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))) {
//       alert('Please enter a valid phone number first');
//       return;
//     }

//     setOtpLoading(true);
//     setTimeout(() => {
//       setOtpSent(true);
//       setOtpLoading(false);
//       alert(`OTP sent to ${selectedCode}${formData.phone}!`);
//     }, 2000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     Object.keys(formData).forEach(key => {
//       validateField(key, formData[key]);
//     });

//     const hasErrors = Object.keys(errors).length > 0;
//     if (hasErrors) return;

//     setIsSubmitting(true);
//     onSubmit({ ...formData, fullPhone: selectedCode + formData.phone });
//     setTimeout(() => setIsSubmitting(false), 1000);
//   };

//   return (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTER</h1>
//         <p className="text-gray-600">Create a new account to get started</p>
//       </div>

//       <div className="space-y-4">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Full Name"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
//         </div>

//         <div className="relative group">
//           <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all duration-200 overflow-hidden">
//             <CountryCodeDropdown
//               value={selectedCode}
//               onChange={setSelectedCode}
//               className="bg-gray-50 py-3 px-3 border-r border-gray-200 focus:outline-none hover:bg-gray-100"
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
//                 placeholder="Phone Number"
//                 className={`w-full pl-10 pr-4 py-3 border-0 focus:outline-none ${errors.phone ? 'bg-red-50' : ''}`}
//               />
//             </div>
//           </div>
//           {errors.phone && <div className="text-red-500 text-sm mt-1 animate-pulse">{errors.phone}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             placeholder="Confirm Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId"
//             value={formData.referralId}
//             onChange={handleInputChange}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.referralId ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.referralId && <div className="text-red-500 text-sm mt-1">{errors.referralId}</div>}
//         </div>

//         <div className="flex gap-3">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Shield className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleInputChange}
//               placeholder="Enter 6-digit OTP"
//               maxLength="6"
//               className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-200 ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleSendOTP}
//             disabled={otpLoading || otpSent || !formData.phone}
//             className={`px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
//               otpSent
//                 ? 'bg-green-100 text-green-700 cursor-default'
//                 : otpLoading
//                 ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                 : formData.phone && /^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))
//                 ? 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {otpLoading ? 'Sending...' : otpSent ? 'Sent ✓' : 'Send OTP'}
//           </button>
//         </div>
//         {errors.otp && <div className="text-red-500 text-sm mt-1">{errors.otp}</div>}

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isSubmitting || (otpSent && !formData.otp)}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Creating Account...' : 'REGISTER'}
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
//         {/* Left Section - Gradient with Enhanced Icon */}
//         <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-br from-[#085358] via-teal-600 to-green-900 transform transition-all duration-1000 ease-out ${isLogin ? 'left-0 translate-x-0' : 'left-1/2 translate-x-0'}`}>
//           {/* Animated Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
//             <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//             <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="absolute top-8 left-8 right-8 z-20">
//             <div className="flex bg-white/20 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/10">
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(true)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-xl text-white font-bold transition-all duration-500 ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
//                   : 'hover:bg-white/20 backdrop-blur-sm'
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(false)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-xl text-white font-bold transition-all duration-500 ${!isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
//                   : 'hover:bg-white/20 backdrop-blur-sm'
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

//                 <div className="relative w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-3">
//                   {/* Inner Icon */}
//                   <div className="w-40 h-40  rounded-full flex items-center justify-center shadow-xl">
//                     <img src={icon} alt="" width={200} />
//                   </div>
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
//             <div className="flex bg-white/20 backdrop-blur-md rounded-2xl p-1 shadow-xl border border-white/10">
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(true)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-3 px-4 rounded-xl text-white font-bold transition-all duration-500 text-sm ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
//                   : 'hover:bg-white/20'
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(false)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-3 px-4 rounded-xl text-white font-bold transition-all duration-500 text-sm ${!isLogin
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
//                   <img src={icon} alt="" width={200} />
//                 </div>
                
//                 {/* Mobile Rotating Ring */}
//                 <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full animate-spin-slow"></div>
                
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
//       `}</style>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
// import icon from '../assets/Images/login.png'
// import { useNavigate } from 'react-router-dom';
// // Replace the mock hooks at the top with:
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

// // Notification Component
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

// const CountryCodeDropdown = ({ value, onChange, className }) => {
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

//   // API Hooks
//   const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();

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
//     }

//     setErrors(newErrors);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Validate all fields
//   Object.keys(formData).forEach(key => {
//     validateField(key, formData[key]);
//   });

//   const hasErrors = Object.keys(errors).length > 0;
//   if (hasErrors) return;

//   try {
//     const payload = {
//       ...formData,
//       role: 1
//     };

//     const response = await loginUser(payload);

//     if (response.data?.success) {
//       setNotification({
//         type: 'success',
//         message: 'Login successful! Redirecting...'
//       });

//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
//       }

//       onSubmit(payload); // Optional

//       // Redirect to dashboard after a short delay (optional)
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 1000); // Wait for 1 second for user to see the message
//     } else {
//       setNotification({
//         type: 'error',
//         message: response.data?.message || 'Login failed. Please try again.'
//       });
//     }
//   } catch (error) {
//     setNotification({
//       type: 'error',
//       message: 'Network error. Please check your connection.'
//     });
//   }
// };


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

//       <div className="space-y-6">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg  focus:border-transparent outline-none transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:border-transparent outline-none transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
//         </div>

//         <div className="text-right">
//           <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
//             Forgot Password?
//           </a>
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isLoginLoading}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [selectedCode, setSelectedCode] = useState('+91');
//   const [notification, setNotification] = useState(null);
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

//   // API Hooks
//   const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();
//   const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyMutation();
//   const [resendOtp, { isLoading: isResendLoading }] = useOTPresentMutation();

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };

//     switch (name) {
//       case 'name':
//         if (!value.trim()) {
//           newErrors.name = 'Name is required';
//         } else if (value.length < 2) {
//           newErrors.name = 'Name must be at least 2 characters';
//         } else {
//           delete newErrors.name;
//         }
//         break;
//       case 'phone':
//         if (!value.trim()) {
//           newErrors.phone = 'Phone number is required';
//         } else if (!/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
//           newErrors.phone = 'Please enter a valid phone number';
//         } else {
//           delete newErrors.phone;
//         }
//         break;
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
//         } else if (value.length < 8) {
//           newErrors.password = 'Password must be at least 8 characters';
//         } else if (!/[a-z]/.test(value)) {
//           newErrors.password = 'Password must contain at least one lowercase letter';
//         } else if (!/[A-Z]/.test(value)) {
//           newErrors.password = 'Password must contain at least one uppercase letter';
//         } else if (!/\d/.test(value)) {
//           newErrors.password = 'Password must contain at least one number';
//         } else {
//           delete newErrors.password;
//         }
//         break;
//       case 'confirmPassword':
//         if (!value) {
//           newErrors.confirmPassword = 'Please confirm your password';
//         } else if (value !== formData.password) {
//           newErrors.confirmPassword = 'Passwords must match';
//         } else {
//           delete newErrors.confirmPassword;
//         }
//         break;
//       case 'referralId':
//         if (value && !/^[A-Za-z0-9]*$/.test(value)) {
//           newErrors.referralId = 'Referral ID can only contain letters and numbers';
//         } else {
//           delete newErrors.referralId;
//         }
//         break;
//       case 'otp':
//         if (otpSent && !value) {
//           newErrors.otp = 'OTP is required';
//         } else if (value && !/^\d{6}$/.test(value)) {
//           newErrors.otp = 'OTP must be 6 digits';
//         } else {
//           delete newErrors.otp;
//         }
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     validateField(name, value);
//   };

//   const handleSendOTP = async () => {
//     if (!formData.phone || !/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))) {
//       setNotification({
//         type: 'error',
//         message: 'Please enter a valid phone number first'
//       });
//       return;
//     }

//     try {
//       const response = await resendOtp({
//         phone: selectedCode + formData.phone
//       });

//       if (response.data?.success) {
//         setOtpSent(true);
//         setNotification({
//           type: 'success',
//           message: `OTP sent to ${selectedCode}${formData.phone}!`
//         });
//       } else {
//         setNotification({
//           type: 'error',
//           message: response.data?.message || 'Failed to send OTP'
//         });
//       }
//     } catch (error) {
//       setNotification({
//         type: 'error',
//         message: 'Failed to send OTP. Please try again.'
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate all fields
//     Object.keys(formData).forEach(key => {
//       validateField(key, formData[key]);
//     });

//     const hasErrors = Object.keys(errors).length > 0;
//     if (hasErrors) return;

//     if (!otpSent) {
//       setNotification({
//         type: 'error',
//         message: 'Please verify your phone number first'
//       });
//       return;
//     }

//     try {
//       // First verify OTP
//       const verifyResponse = await verifyOtp({
//         phone: selectedCode + formData.phone,
//         otp: formData.otp
//       });

//       if (!verifyResponse.data?.success) {
//         setNotification({
//           type: 'error',
//           message: 'Invalid OTP. Please try again.'
//         });
//         return;
//       }

//       // Then register user
//       const registerData = {
//         name: formData.name,
//         email: formData.email,
//         phone: selectedCode + formData.phone,
//         password: formData.password,
//         referralId: formData.referralId || undefined
//       };

//       const registerResponse = await registerUser(registerData);

//       if (registerResponse.data?.success) {
//         setNotification({
//           type: 'success',
//           message: 'Registration successful! Please login with your credentials.'
//         });
        
//         // Switch to login after successful registration
//         setTimeout(() => {
//           onToggleMode();
//         }, 2000);
//       } else {
//         setNotification({
//           type: 'error',
//           message: registerResponse.data?.message || 'Registration failed. Please try again.'
//         });
//       }
//     } catch (error) {
//       setNotification({
//         type: 'error',
//         message: 'Registration failed. Please check your connection.'
//       });
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

//       <div className="space-y-4">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <User className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Full Name"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg  focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.name && <div className="text-red-500 text-xl mt-1">{errors.name}</div>}
//         </div>

//         <div className="relative group">
//           <div className="flex rounded-lg border border-gray-300  focus-within:border-transparent transition-all duration-200 overflow-hidden">
//             <CountryCodeDropdown
//               value={selectedCode}
//               onChange={setSelectedCode}
//               className="bg-gray-50 py-3 px-3 border-r border-gray-200  hover:bg-gray-100"
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
//                 placeholder="Phone Number"
//                 className={`w-full pl-10 pr-4 py-3 border-0  ${errors.phone ? 'bg-red-50' : ''}`}
//               />
//             </div>
//           </div>
//           {errors.phone && <div className="text-red-500 text-sm mt-1 animate-pulse">{errors.phone}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Email"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg  focus:border-transparent   ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg  focus:border-transparent  transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             placeholder="Confirm Password"
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg  focus:border-transparent  transition-all duration-200 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//           >
//             {showConfirmPassword ? (
//               <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             ) : (
//               <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//             )}
//           </button>
//           {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Users className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             name="referralId"
//             value={formData.referralId}
//             onChange={handleInputChange}
//             placeholder="Referral ID (Optional)"
//             className={`w-full pl-10 pr-4 py-3 border rounded-lg  focus:border-transparent  transition-all duration-200 ${errors.referralId ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.referralId && <div className="text-red-500 text-sm mt-1">{errors.referralId}</div>}
//         </div>

//         <div className="flex gap-3">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Shield className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleInputChange}
//               placeholder="Enter 6-digit OTP"
//               maxLength="6"
//               className={`w-full pl-10 pr-4 py-3 border rounded-lg  focus:border-transparent  transition-all duration-200 ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleSendOTP}
//             disabled={isResendLoading || otpSent || !formData.phone}
//             className={`px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
//               otpSent
//                 ? 'bg-green-100 text-green-700 cursor-default'
//                 : isResendLoading
//                 ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                 : formData.phone && /^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))
//                 ? 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isResendLoading ? 'Sending...' : otpSent ? 'Sent ✓' : 'Send OTP'}
//           </button>
//         </div>
//         {errors.otp && <div className="text-red-500 text-sm mt-1">{errors.otp}</div>}

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={isRegisterLoading || isVerifyLoading || (otpSent && !formData.otp)}
//           className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isRegisterLoading || isVerifyLoading ? 'Creating Account...' : 'REGISTER'}
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
//     // Handle successful login (redirect, store user data, etc.)
//   };

//   const handleRegisterSubmit = (values) => {
//     console.log('Register submitted:', values);
//     // Handle successful registration
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
//             <div className="flex   rounded-full p-2 shadow-xl border border-white/10">
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(true)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-full text-white font-bold transition-all duration-500 ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
//                   : ''
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(false)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-4 px-6 rounded-full text-white font-bold transition-all duration-500 ${!isLogin
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
//                 <div className="relative w-58 h-58 mx-auto mb-6  rounded-full flex items-center justify-center   transform transition-all duration-700 hover:scale-110 hover:rotate-3">
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
//                 className={`flex-1 py-3 px-4 rounded-full text-white font-bold transition-all duration-500 text-sm ${isLogin
//                   ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
//                   : 'hover:bg-white/20'
//                   } ${isTransitioning ? 'opacity-50' : ''}`}
//               >
//                 LOGIN
//               </button>
//               <button
//                 onClick={() => !isTransitioning && setIsLogin(false)}
//                 disabled={isTransitioning}
//                 className={`flex-1 py-3 px-4 rounded-full text-white font-bold transition-all duration-500 text-sm ${!isLogin
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
                
//                 {/* Mobile Rotating Ring */}
//                 {/* <div className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full animate-spin-slow"></div> */}
                
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
//       `}</style>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, Users, Shield, ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';
// import icon from '../assets/Images/login.png'
import icon from '../../public/logo.png'
import { useNavigate } from 'react-router-dom';
// Replace the mock hooks at the top with:
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

// Notification Component
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|mil|info|co|io|me|biz|live|yahoo|gmail)$/i;

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 8 characters';

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should contain only digits';
    }

    // Optional: enable this if reCAPTCHA is integrated
    // if (!recaptchaToken) newErrors.recaptcha = 'Please complete reCAPTCHA';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: 1,
        // recaptchaToken,
      }).unwrap();

      toast.success(response?.message || 'Login successful!', { position: 'top-center' });

      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('userData', JSON.stringify(response));

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email.trim());
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberMe');
      }

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      toast.error(error?.data?.message || 'Login failed', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };
=======
  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;
>>>>>>> 42822ca8648f5a66f71d825efd501d2d2967e8e7

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

const CountryCodeDropdown = ({ value, onChange, className }) => {
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

const LoginComponent = ({ onSubmit, onToggleMode, isVisible }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  // API Hooks
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate all fields
  Object.keys(formData).forEach(key => {
    validateField(key, formData[key]);
  });

  const hasErrors = Object.keys(errors).length > 0;
  if (hasErrors) return;

  try {
    const payload = {
      ...formData,
      role: 1
    };

    const response = await loginUser(payload);

    if (response.data?.success) {
      setNotification({
        type: 'success',
        message: 'Login successful! Redirecting...'
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      onSubmit(payload); // Optional

      // Redirect to dashboard after a short delay (optional)
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000); // Wait for 1 second for user to see the message
    } else {
      setNotification({
        type: 'error',
        message: response.data?.message || 'Login failed. Please try again.'
      });
    }
  } catch (error) {
    setNotification({
      type: 'error',
      message: 'Network error. Please check your connection.'
    });
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

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
        <p className="text-gray-600">Enter your credentials to access your account</p>
      </div>

      <div className="space-y-4">
        {/* Email Input - Fixed Layout */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {/* Fixed error container - always reserves space */}
          <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
            {errors.email && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
            )}
          </div>
        </div>

        {/* Password Input - Fixed Layout */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
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
          {/* Fixed error container - always reserves space */}
          <div className="absolute top-full left-0 right-0 min-h-[24px] pt-1">
            {errors.password && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.password}</div>
            )}
          </div>
        </div>

        <div className="text-right mt-4">
          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoginLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isLoginLoading ? 'Signing In...' : 'LOGIN'}
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button onClick={onToggleMode} className="text-teal-600 hover:text-teal-700 font-semibold">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

const RegisterComponent = ({ onSubmit, onToggleMode, isVisible }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedCode, setSelectedCode] = useState('+91');
  const [notification, setNotification] = useState(null);
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

  // API Hooks
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useOTPresentMutation();

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[a-z]/.test(value)) {
          newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/\d/.test(value)) {
          newErrors.password = 'Password must contain at least one number';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords must match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'referralId':
        if (value && !/^[A-Za-z0-9]*$/.test(value)) {
          newErrors.referralId = 'Referral ID can only contain letters and numbers';
        } else {
          delete newErrors.referralId;
        }
        break;
      case 'otp':
        if (otpSent && !value) {
          newErrors.otp = 'OTP is required';
        } else if (value && !/^\d{6}$/.test(value)) {
          newErrors.otp = 'OTP must be 6 digits';
        } else {
          delete newErrors.otp;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSendOTP = async () => {
    if (!formData.phone || !/^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid phone number first'
      });
      return;
    }

    try {
      const response = await resendOtp({
        phone: selectedCode + formData.phone
      });

      if (response.data?.success) {
        setOtpSent(true);
        setNotification({
          type: 'success',
          message: `OTP sent to ${selectedCode}${formData.phone}!`
        });
      } else {
        setNotification({
          type: 'error',
          message: response.data?.message || 'Failed to send OTP'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to send OTP. Please try again.'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) return;

    if (!otpSent) {
      setNotification({
        type: 'error',
        message: 'Please verify your phone number first'
      });
      return;
    }

    try {
      // First verify OTP
      const verifyResponse = await verifyOtp({
        phone: selectedCode + formData.phone,
        otp: formData.otp
      });

      if (!verifyResponse.data?.success) {
        setNotification({
          type: 'error',
          message: 'Invalid OTP. Please try again.'
        });
        return;
      }

      // Then register user
      const registerData = {
        name: formData.name,
        email: formData.email,
        phone: selectedCode + formData.phone,
        password: formData.password,
        referralId: formData.referralId || undefined
      };

      const registerResponse = await registerUser(registerData);

      if (registerResponse.data?.success) {
        setNotification({
          type: 'success',
          message: 'Registration successful! Please login with your credentials.'
        });
        
        // Switch to login after successful registration
        setTimeout(() => {
          onToggleMode();
        }, 2000);
      } else {
        setNotification({
          type: 'error',
          message: registerResponse.data?.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Registration failed. Please check your connection.'
      });
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

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTER</h1>
        <p className="text-gray-600">Create a new account to get started</p>
      </div>

      <div className="space-y-3">
        {/* Name Input - Fixed Layout */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.name && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.name}</div>
            )}
          </div>
        </div>

        {/* Phone Input - Fixed Layout */}
        <div className="relative mb-5">
          <div className={`flex rounded-lg border transition-all duration-200 overflow-hidden ${
            errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500'
          }`}>
            <CountryCodeDropdown
              value={selectedCode}
              onChange={setSelectedCode}
              className="bg-gray-50 py-3 px-3 border-r border-gray-200 hover:bg-gray-100"
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

        {/* Email Input - Fixed Layout */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.email && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.email}</div>
            )}
          </div>
        </div>

        {/* Password Input - Fixed Layout */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
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

        {/* Confirm Password Input - Fixed Layout */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
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

        {/* Referral ID Input - Fixed Layout */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="referralId"
            value={formData.referralId}
            onChange={handleInputChange}
            placeholder="Referral ID (Optional)"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
              errors.referralId ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.referralId && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.referralId}</div>
            )}
          </div>
        </div>

        {/* OTP Input - Fixed Layout */}
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
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200 ${
                  errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={handleSendOTP}
              disabled={isResendLoading || otpSent || !formData.phone}
              className={`px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
                otpSent
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : isResendLoading
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : formData.phone && /^\d{7,15}$/.test(formData.phone.replace(/\s/g, ''))
                  ? 'bg-teal-500 text-white hover:bg-teal-600 transform hover:scale-105 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isResendLoading ? 'Sending...' : otpSent ? 'Sent ✓' : 'Send OTP'}
            </button>
          </div>
          <div className="absolute top-full left-0 right-0 min-h-[20px] pt-1">
            {errors.otp && (
              <div className="text-red-500 text-sm animate-fadeIn">{errors.otp}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isRegisterLoading || isVerifyLoading || (otpSent && !formData.otp)}
          className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {isRegisterLoading || isVerifyLoading ? 'Creating Account...' : 'REGISTER'}
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
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLoginSubmit = (values) => {
    console.log('Login submitted:', values);
    // Handle successful login (redirect, store user data, etc.)
  };

  const handleRegisterSubmit = (values) => {
    console.log('Register submitted:', values);
    // Handle successful registration
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
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
                onClick={() => !isTransitioning && setIsLogin(true)}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-white font-bold transition-all duration-500 ${isLogin
                  ? 'bg-white/90 text-teal-700 shadow-2xl transform scale-105 backdrop-blur-sm'
                  : ''
                  } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => !isTransitioning && setIsLogin(false)}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-white font-bold transition-all duration-500 ${!isLogin
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
            <div className="text-center text-white px-8">
              {/* Highlighted Icon Container */}
              <div className="mb-12 relative">
                <div className="relative w-58 h-58 mx-auto mb-6 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110 hover:rotate-3">
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
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>

          {/* Mobile Navigation */}
          <div className="relative z-10 p-4">
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
              <button
                onClick={() => !isTransitioning && setIsLogin(true)}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-white font-bold transition-all duration-500 text-sm ${isLogin
                  ? 'bg-white/90 text-teal-700 shadow-lg transform scale-105'
                  : 'hover:bg-white/20'
                  } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => !isTransitioning && setIsLogin(false)}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-white font-bold transition-all duration-500 text-sm ${!isLogin
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
              {/* Mobile Glow Effect */}
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-teal-400 to-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Mobile Icon Container */}
              <div className="relative w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-110">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-300 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-4xl font-bold text-white">J</div>
                </div>
                
                {/* Mobile Particles */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>

            {/* Mobile Text */}
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
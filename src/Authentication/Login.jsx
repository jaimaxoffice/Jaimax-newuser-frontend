// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
// import Logo from '../Authentication/Logo'
// import jaimaxicon from '../assets/Images/jaicoins.svg'
// import { Navigate, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const  navigate = useNavigate()
//   const showToast = (message, isSuccess = true) => {
//     Swal.fire({
//       toast: true,
//       position: 'top',
//       icon: isSuccess ? 'success' : 'error',
//       title: message,
//       showConfirmButton: false,
//       showCloseButton: true,
//       timer: 3000,
//       timerProgressBar: true,
//       background: isSuccess ? '#22c55e' : '#ef4444',
//       color: '#fff',
//     });
//   };

//   useEffect(() => {
//     setIsVisible(true);
//     // Simulate loading saved email and rememberMe from localStorage
//     const savedEmail = ''; // In real app: localStorage.getItem('email');
//     const savedRememberMe = true; // In real app: localStorage.getItem('rememberMe') === 'true';
    
//     if (savedEmail) {
//       setFormData(prev => ({ ...prev, email: savedEmail }));
//     }
//     setRememberMe(savedRememberMe);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|mil|info|co|io|me|biz|live|yahoo|gmail)$/i;

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email.trim())) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validate()) return;

//   setLoading(true);

//   try {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     console.log('Login attempted with:', {
//       email: formData.email.trim(),
//       password: formData.password,
//       rememberMe
//     });

//     // Show success toast
//     showToast('Login successful!');
//     navigate("/dashboard")
    
//   } catch (error) {
//     console.error('Login error:', error);
//     // Show error toast
//     showToast('Login failed. Please try again.', false);
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//    <div className="h-screen bg-[#084e53] from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
//   <div
//     className={`w-full max-w-6xl mx-auto flex justify-between items-center gap-8 transform transition-all duration-1000 ${
//       isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//     }`}>

//    <div
//   className="hidden lg:flex flex-col items-center justify-center text-center mt-20 p-8 flex-1"
// style={{ transform: 'translateX(-8rem) translateY(2rem)' }}

// >
//   <div className="space-y-4">
//     <Logo />
//   </div>

//   <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
//     {[1, 2, 3].map((i) => (
//       <div
//         key={i}
//         className="h-2 rounded-full opacity-60 animate-pulse"
//         style={{
//           background: 'linear-gradient(135deg, #094e54, #4ecdc4)',
//           animationDelay: `${i * 0.5}s`,
//         }}
//       ></div>
//     ))}
//   </div>
// </div>
//     <div className="w-full max-w-md flex-shrink-0">
//       <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-purple-500/20 transition-all duration-300">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
//           <p className="text-gray-300">Sign in to your account to continue</p>
//         </div>
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
//               <Mail className="w-4 h-4" />
//               Email Address
//               <span className="text-red-400">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 bg-white/10 border ${
//                   errors.email ? 'border-red-400' : 'border-white/20'
//                 } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
//                 style={{ '--tw-ring-color': '#094e54' }}
//                 onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #094e54')}
//                 onBlur={(e) => (e.target.style.boxShadow = 'none')}
//                 placeholder="Enter your email address"
//               />
//               {errors.email && (
//                 <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
//                   <span className="w-1 h-1 bg-red-400 rounded-full"></span>
//                   {errors.email}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
//               <Lock className="w-4 h-4" />
//               Password
//               <span className="text-red-400">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 pr-12 bg-white/10 border ${
//                   errors.password ? 'border-red-400' : 'border-white/20'
//                 } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
//                 onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #094e54')}
//                 onBlur={(e) => (e.target.style.boxShadow = 'none')}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//               {errors.password && (
//                 <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
//                   <span className="w-1 h-1 bg-red-400 rounded-full"></span>
//                   {errors.password}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-2 cursor-pointer"
//                 style={{ accentColor: '#094e54' }}
//               />
//               <span className="text-sm text-gray-300">Remember me</span>
//             </label>
//             <button
//               type="button"
//               className="text-sm hover:text-white transition-colors cursor-pointer"
//               style={{ color: '#4ecdc4' }}
//               onClick={() => alert('Forgot password functionality would go here')}
//             >
//               Forgot Password?
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full text-white py-3 px-6 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
//             style={{
//               background: loading
//                 ? '#bace27'
//                 : 'linear-gradient(135deg, #bace27,rgb(225, 236, 136))',
//               '--tw-ring-color': '#094e54',
//             }}
//             onMouseEnter={(e) => {
//               if (!loading) e.target.style.background = 'linear-gradient(135deg, #0a5c64, #5dd5cd)';
//             }}
//             onMouseLeave={(e) => {
//               if (!loading) e.target.style.background = 'linear-gradient(135deg, #094e54, #4ecdc4)';
//             }}
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 Signing In...
//               </>
//             ) : (
//               <>
//                 Sign In
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
//               </>
//             )}
//           </button>

//           {/* Register Link */}
//           <div className="text-center pt-4 border-t border-white/10">
//             <p className="text-gray-300">
//               Don't have an account?{' '}
//               <button
//                 type="button"
//                 className="font-semibold transition-colors cursor-pointer"
//                 style={{ color: '#4ecdc4' }}
//                 onClick={() => navigate("/register")}
//                 onMouseEnter={(e) => (e.target.style.color = '#5dd5cd')}
//                 onMouseLeave={(e) => (e.target.style.color = '#4ecdc4')}
//               >
//                 Register Now
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Branding */}
//       <div className="lg:hidden text-center mt-8">
//         <div
//           className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12 cursor-pointer hover:rotate-0 transition-transform duration-300"
//           style={{ background: 'linear-gradient(135deg, #094e54, #0a5c64)' }}
//         >
//           <Shield className="w-8 h-8 text-white" />
//         </div>
//         <h1 className="text-2xl font-bold text-white mb-2">
//           Welcome to{' '}
//           <span
//             className="text-transparent bg-clip-text"
//             style={{ backgroundImage: 'linear-gradient(135deg, #094e54, #4ecdc4)' }}
//           >
//             JAIMAX
//           </span>
//         </h1>
//         <p className="text-gray-300 text-sm">Your gateway to secure financial solutions</p>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useLoginMutation } from './authApiSlice';
import Logo from '../Authentication/Logo';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  useEffect(() => {
    setIsVisible(true);
    const savedEmail = localStorage.getItem('rememberedEmail') || '';
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    if (savedRememberMe) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
    setRememberMe(savedRememberMe);
  }, []);

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

  return (
    <div className="h-screen bg-[#084e53] flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className={`w-full max-w-6xl mx-auto flex justify-between items-center gap-8 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Left Section */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center mt-20 p-8 flex-1 transform -translate-x-32 translate-y-8">
          <Logo />
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 rounded-full opacity-60 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #094e54, #4ecdc4)',
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full max-w-md">
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-300">Sign in to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none`}
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 pr-12 bg-white/10 border ${
                      errors.password ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-[#4ecdc4] hover:text-white"
                  onClick={() => navigate('/forgot-password')}
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-white font-semibold flex justify-center items-center gap-2 transition-all"
                style={{
                  background: loading ? '#6b7280' : 'linear-gradient(135deg, #094e54, #4ecdc4)',
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="text-center pt-4 border-t border-white/10 mt-6">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-semibold text-[#4ecdc4] hover:text-[#5dd5cd]"
                >
                  Register Now
                </button>
              </p>
            </div>
          </div>

          {/* Mobile branding */}
          <div className="lg:hidden text-center mt-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#094e54] to-[#0a5c64] flex items-center justify-center mx-auto mb-4 transform rotate-12 hover:rotate-0 transition">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#094e54] to-[#4ecdc4]">
                JAIMAX
              </span>
            </h1>
            <p className="text-gray-300 text-sm">Your gateway to secure financial solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
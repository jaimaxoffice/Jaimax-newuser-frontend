// // import React, { useState, useEffect, useRef, useContext } from "react";
// // import {
// //   LockKeyhole,
// //   UserRound,
// //   User,
// //   Mail,
// //   Phone,
// //   Home,
// //   MapPin,
// // } from "lucide-react";
// // import { toast, ToastContainer } from "../../../../ReusableComponents/Toasts/Toasts";
// // import {
// //   useChangePwdMutation,
// //   useChangePwdReqMutation,
// //   useVerifyMutation,
// // } from "../../../../Authentication/authApiSlice";
// // import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
// // import { useUpdateAddressMutation } from "./profileApiSlice";
// // import countryCodes from "../../../../Authentication/countryCodes.json";
// // import Cookies from "js-cookie";
// // export default function Profile3DForm() {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [formData, setFormData] = useState({
// //     password: "",
// //     newPassword: "",
// //     confirmPwd: "",
// //     otp: "",
// //   });

// //   const [otpSent, setOtpSent] = useState(false);
// //   const [timer, setTimer] = useState(120);
// //   const [resendOtp, setResendOtp] = useState(false);
// //   const [isOtpSending, setIsOtpSending] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [changePwd, { isLoading }] = useChangePwdMutation();
// //   const [changePwdReq] = useChangePwdReqMutation();
// //   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
// //   const [update, { isLoading: updateLoader }] = useUpdateAddressMutation();
// //   const [loading, setLoading] = useState(false);
// //   const [isToastShown, setIsToastShown] = useState(false);
// //   const [profileImage, setProfileImage] = useState("");
// //   const [otpVerified, setOtpVerified] = useState(false);
// //   const [avatarHover, setAvatarHover] = useState(false);

// //   const { data: userData, error } = useUserDataQuery();
// //   const profileRef = useRef(null);

// //   const [state, setState] = useState({
// //     name: userData?.data?.name || "",
// //     _id: userData?.data?._id || "",
// //     email: userData?.data?.email || "",
// //     phone: userData?.data?.phone || "",
// //     address: userData?.data?.address || "",
// //     city: userData?.data?.city || "",
// //     country: userData?.data?.country || "",
// //     state: userData?.data?.state || "",
// //     profile: userData?.data?.profile || "",
// //     gender: userData?.data?.gender || "human",
// //   });

// //   useEffect(() => {
// //     setState({
// //       name: userData?.data?.name || "",
// //       _id: userData?.data?._id || "",
// //       email: userData?.data?.email || "",
// //       phone: userData?.data?.phone || "",
// //       address: userData?.data?.address || "",
// //       city: userData?.data?.city || "",
// //       country: userData?.data?.country || "",
// //       state: userData?.data?.state || "",
// //       profile: userData?.data?.profile || "",
// //       gender: userData?.data?.gender || "human",
// //     });
// //   }, [userData]);

// //   // Timer for resend OTP
// //   useEffect(() => {
// //     let countdown;
// //     if (otpSent && timer > 0) {
// //       countdown = setInterval(() => {
// //         setTimer((prevTimer) => prevTimer - 1);
// //       }, 1000);
// //     } else if (timer === 0) {
// //       setResendOtp(true);
// //     }
// //     return () => clearInterval(countdown);
// //   }, [otpSent, timer]);

// //   const togglePassword = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   const validateForm = () => {
// //     let formErrors = {};
// //     const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
// //     const nameRegex = /^[a-zA-Z\s'-]+$/;
// //     const addressRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])?[a-zA-Z0-9\s.,'#-]+$/;

// //     // --- Name Validation ---
// //     if (!state.name.trim()) {
// //       formErrors.name = "Name is required.";
// //     } else if (state.name.trim().length < 2) {
// //       formErrors.name = "Name must be at least 2 characters long.";
// //     } else if (state.name.trim().length > 50) {
// //       formErrors.name = "Name cannot exceed 50 characters.";
// //     } else if (!nameRegex.test(state.name.trim())) {
// //       formErrors.name =
// //         "Name can only contain letters, spaces, hyphens, and apostrophes.";
// //     }

// //     // --- Phone Validation ---
// //     if (!state.phone) {
// //       formErrors.phone = "Mobile number is required.";
// //     } else if (
// //       typeof state.phone !== "string" &&
// //       typeof state.phone !== "number"
// //     ) {
// //       formErrors.phone = "Invalid mobile number format.";
// //     } else if (!String(state.phone).trim()) {
// //       formErrors.phone = "Mobile number is required.";
// //     } else if (!phoneRegex.test(String(state.phone))) {
// //       formErrors.phone =
// //         "Invalid mobile number format. Please enter 7-20 digits, optionally with +, spaces, -, or ().";
// //     }

// //     // --- Address Validation ---
// //     if (!state.address.trim()) {
// //       formErrors.address = "Address is required.";
// //     } else if (state.address.trim().length < 5) {
// //       formErrors.address = "Address must be at least 5 characters long.";
// //     } else if (state.address.trim().length > 100) {
// //       formErrors.address = "Address cannot exceed 100 characters.";
// //     } else if (!addressRegex.test(state.address.trim())) {
// //       formErrors.address = "Address contains invalid characters.";
// //     }

// //     // --- City Validation ---
// //     if (!state.city.trim()) {
// //       formErrors.city = "City is required.";
// //     } else if (state.city.trim().length < 2) {
// //       formErrors.city = "City must be at least 2 characters long.";
// //     } else if (state.city.trim().length > 50) {
// //       formErrors.city = "City cannot exceed 50 characters.";
// //     } else if (!/^[a-zA-Z\s-]+$/.test(state.city.trim())) {
// //       formErrors.city = "City can only contain letters, spaces, and hyphens.";
// //     }

// //     // --- State Validation ---
// //     if (!state.state.trim()) {
// //       formErrors.state = "State is required.";
// //     } else if (state.state.trim().length < 2) {
// //       formErrors.state = "State must be at least 2 characters long.";
// //     } else if (state.state.trim().length > 50) {
// //       formErrors.state = "State cannot exceed 50 characters.";
// //     } else if (!/^[a-zA-Z\s-]+$/.test(state.state.trim())) {
// //       formErrors.state = "State can only contain letters, spaces, and hyphens.";
// //     }

// //     // --- Country Validation ---
// //     if (!state.country.trim()) {
// //       formErrors.country = "Country is required.";
// //     }

// //     return formErrors;
// //   };
// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];

// //     if (!file) return;
// //     setLoading(true);

// //     const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
// //     const invalidFile = !acceptedFormats.includes(file.type);

// //     if (invalidFile) {
// //       toast.warning("Only JPG / PNG files are allowed", {
// //         position: "top-center",
// //       });
// //       profileRef.current.value = "";
// //       setLoading(false);
// //     } else {
// //       const imageUrl = URL.createObjectURL(file);
// //       setState((prevState) => ({
// //         ...prevState,
// //         profile: file,
// //       }));
// //       setProfileImage(imageUrl);
// //       setLoading(false);
// //     }
// //   };

// //   const getDefaultAvatar = () => {

// //     return <User className="text-teal-600 w-14 h-14"/>
// //   };

// //   const currentImage = () => {
// //     if (profileImage) {
// //       return profileImage;
// //     } else if (state.profile && typeof state.profile === "string") {
// //       return state.profile;
// //     } else {
// //       return null;
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setState((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleProfileSubmit = async (e) => {
// //     e.preventDefault();
// //     const validationErrors = validateForm();
// //     setErrors(validationErrors);

// //     if (Object.keys(validationErrors).length === 0) {
// //       const hasChanged =
// //         state.name !== userData?.data?.name ||
// //         state.address !== userData?.data?.address ||
// //         state.city !== userData?.data?.city ||
// //         state.state !== userData?.data?.state ||
// //         state.country !== userData?.data?.country ||
// //         state.gender !== userData?.data?.gender ||
// //         state.profile instanceof File;

// //       if (!hasChanged) {
// //         toast.info("No changes detected to update", {
// //           position: "top-center",
// //         });
// //         return;
// //       }

// //       setLoading(true);
// //       try {
// //         const formData = new FormData();
// //         formData.append("name", state.name);
// //         formData.append("_id", state._id);
// //         formData.append("address", state.address);
// //         formData.append("city", state.city);
// //         formData.append("country", state.country);
// //         formData.append("state", state.state);
// //         formData.append("gender", state.gender);

// //         if (state.profile instanceof File) {
// //           formData.append("profile", state.profile);
// //         }

// //         const res = await update(formData);

// //         if (res?.data?.status_code == 200) {
// //           setIsToastShown(true);
// //           if (!isToastShown) {
// //             toast.success(res?.data?.message, {
// //               position: "top-center",
// //             });
// //           } else {
// //             toast.dismiss();
// //             toast.success(res?.data?.message, {
// //               position: "top-center",
// //             });
// //           }
// //         }
// //       } catch (error) {
// //         setIsToastShown(true);
// //         if (!isToastShown) {
// //           toast.error(error?.message, {
// //             position: "top-center",
// //           });
// //         } else {
// //           toast.dismiss();
// //           toast.error(error?.message, {
// //             position: "top-center",
// //           });
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //   };

// //   const validateOldPassword = () => {
// //     let formErrors = {};

// //     if (!formData.password) {
// //       formErrors.password = "Password is required";
// //     } else if (formData.password.length < 6) {
// //       formErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(formErrors);
// //     return Object.keys(formErrors).length === 0;
// //   };

// //   const validateNewPassword = () => {
// //     let formErrors = {};

// //     if (!formData.newPassword) {
// //       formErrors.newPassword = "New Password is required";
// //     } else if (formData.newPassword.length < 6) {
// //       formErrors.newPassword = "Password must be at least 6 characters";
// //     }

// //     if (formData.newPassword !== formData.confirmPwd) {
// //       formErrors.confirmPwd = "Passwords do not match";
// //     }

// //     setErrors(formErrors);
// //     return Object.keys(formErrors).length === 0;
// //   };

// //   const validateOtp = () => {
// //     let formErrors = {};
// //     const numberRegex = /^[0-9]+$/;
// //     if (!formData.otp) {
// //       formErrors.otp = "OTP is required";
// //     } else if (!numberRegex.test(formData.otp)) {
// //       formErrors.otp = "OTP must be a number";
// //     } else if (formData.otp.length < 4) {
// //       formErrors.otp = "OTP must be 4 Numbers";
// //     }
// //     setErrors(formErrors);
// //     return Object.keys(formErrors).length === 0;
// //   };

// //   const handleSendOtp = async () => {
// //     if (validateOldPassword()) {
// //       try {
// //         const payload = {
// //           password: formData.password,
// //         };
// //         await changePwdReq(payload).unwrap();
// //         setIsToastShown(true);
// //         if (!isToastShown) {
// //           toast.success(`OTP sent to your email`, {
// //             position: "top-center",
// //           });
// //         } else {
// //           toast.dismiss();
// //           toast.success(`OTP sent to your email`, {
// //             position: "top-center",
// //           });
// //         }

// //         setOtpSent(true);
// //         if (resendOtp) {
// //           setResendOtp(false);
// //           setTimer(120);
// //         }
// //       } catch (error) {
// //         setIsToastShown(true);
// //         if (!isToastShown) {
// //           toast.error(`${error?.data?.message}`, {
// //             position: "top-center",
// //           });
// //         } else {
// //           toast.dismiss();
// //           toast.error(`${error?.data?.message}`, {
// //             position: "top-center",
// //           });
// //         }
// //       }
// //     }
// //   };

// //   const handleVerifyOtp = async () => {
// //     if (validateOtp()) {
// //       try {
// //         const payload = {
// //           email: userData?.data?.email,
// //           otp: Number(formData.otp),
// //           otpType: "ChangePassword",
// //         };
// //         await verify(payload).unwrap();

// //         setIsToastShown(true);
// //         if (!isToastShown) {
// //           toast.success(`OTP verified successfully`, {
// //             position: "top-center",
// //           });
// //         } else {
// //           toast.dismiss();
// //           toast.success(`OTP verified successfully`, {
// //             position: "top-center",
// //           });
// //         }
// //         setOtpVerified(true);
// //         setResendOtp(true);
// //       } catch (error) {
// //         setIsToastShown(true);
// //         if (!isToastShown) {
// //           toast.error(`${error?.data?.message}`, {
// //             position: "top-center",
// //           });
// //         } else {
// //           toast.dismiss();
// //           toast.error(`${error?.data?.message}`, {
// //             position: "top-center",
// //           });
// //         }
// //       }
// //     }
// //   };

// //   const handleChangePassword = async (e) => {
// //     e.preventDefault();
// //     if (validateNewPassword()) {
// //       try {
// //         const payload = {
// //           newPassword: formData.newPassword,
// //           email: userData?.data?.email,
// //         };
// //         const res = await changePwd(payload).unwrap();
// //         toast.success(`${res?.message}`, {
// //           position: "top-center",
// //         });
// //         // setFormData({
// //         //   password: "",
// //         //   newPassword: "",
// //         //   confirmPwd: "",
// //         //   otp: "",
// //         // });
// //         // setOtpSent(false);
// //         // setOtpVerified(false);

// //       Cookies.remove("token");
// //         setFormData({
// //           password: "",
// //           newPassword: "",
// //           confirmPwd: "",
// //           otp: "",
// //         });
// //         setOtpSent(false);
// //         setOtpVerified(false);
// //         window.location.href = "/login";
// //       } catch (error) {
// //         setIsToastShown(true);
// //         if (!isToastShown) {
// //           toast.error(`${error?.data?.message}`, {
// //             position: "top-center",
// //           });
// //         } else {
// //           toast.dismiss();
// //           toast.error(`${error?.data?.message}`, {
// //             position: "top-center",
// //           });
// //         }
// //       }
// //     }
// //   };

// //   if (userData?.data?.profile) {
// //     localStorage.setItem("profile", userData?.data?.profile);
// //   } else {
// //     localStorage.removeItem("profile");
// //   }

// //   const inputClass = (hasError) =>
// //     `w-full border focus:border-teal-500 focus:ring-2 focus:ring-teal-400 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition bg-white bg-opacity-90 shadow-inner backdrop-blur ${
// //       hasError ? "border-red-500" : "border-gray-300"
// //     }`;

// //   return (
// //     <div className="bg-[#1d8e85]  flex items-center justify-center p-2 sm:p-4   ">
// //       <div className="w-full max-w-screen bg-white bg-opacity-90 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
// //         <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 xl:gap-10 ">
// //           <div className="w-full xl:w-2/3 space-y-4 sm:space-y-6">
// //             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
// //               <div className="relative group flex-shrink-0">
// //                 <div
// //                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-teal-600 to-white p-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/50"
// //                   onClick={() => profileRef.current?.click()}
// //                   onMouseEnter={() => setAvatarHover(true)}
// //                   onMouseLeave={() => setAvatarHover(false)}
// //                 >
// //                   <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
// //                     {currentImage() ? (
// //                       <img
// //                         src={currentImage()}
// //                         alt="Profile"
// //                         className="w-full h-full object-cover rounded-full"
// //                       />
// //                     ) : (
// //                       <span className="text-3xl sm:text-4xl">
// //                         {getDefaultAvatar()}
// //                       </span>
// //                     )}

// //                     {/* Hover Overlay */}
// //                     <div
// //                       className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${
// //                         avatarHover ? "opacity-100" : "opacity-0"
// //                       }`}
// //                     >
// //                       <span className="text-white text-xs font-medium">
// //                         Change
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <input
// //                   type="file"
// //                   ref={profileRef}
// //                   accept=".png,.jpg,.jpeg"
// //                   onChange={handleImageChange}
// //                   className="hidden"
// //                 />
// //               </div>

// //               {/* Header Text */}
// //               <div className="text-center sm:text-left flex-1">
// //                 <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
// //                   Profile Information
// //                 </h2>
// //                 <p className="text-xs sm:text-sm text-gray-500 mt-1">
// //                   Update your details below
// //                 </p>

// //                 <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700">
// //                   <span className="font-semibold text-[#0d7f79]">
// //                     {" "}
// //                     Pro Tip:
// //                   </span>{" "}
// //                   Keep your profile information up-to-date for better
// //                   communication and service experience.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Profile Form */}
// //             <form onSubmit={handleProfileSubmit} className="space-y-4">
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
// //                 {/* Full Name */}
// //                 <div className="space-y-1">
// //                   <label
// //                     htmlFor="name"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Full Name *
// //                   </label>
// //                   <input
// //                     id="name"
// //                     type="text"
// //                     name="name"
// //                     value={state.name}
// //                     onChange={handleChange}
// //                     placeholder="Enter your full name"
// //                     disabled={
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                     }
// //                     className={`${inputClass(errors.name)} ${
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                         ? "opacity-60 cursor-not-allowed"
// //                         : ""
// //                     }`}
// //                   />

// //                   {errors.name && (
// //                     <p className="text-red-500 text-xs mt-1">{errors.name}</p>
// //                   )}
// //                 </div>

// //                 {/* Email */}
// //                 <div className="space-y-1">
// //                   <label
// //                     htmlFor="email"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Email Address *
// //                   </label>
// //                   <input
// //                     id="email"
// //                     type="email"
// //                     name="email"
// //                     value={state.email}
// //                     placeholder="Enter your email address"
// //                     disabled={
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                     }
// //                     className={`${inputClass(errors.email)} ${
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                         ? "opacity-60 cursor-not-allowed"
// //                         : ""
// //                     }`}
// //                   />
// //                   {errors.email && (
// //                     <p className="text-red-500 text-xs mt-1">{errors.email}</p>
// //                   )}
// //                 </div>

// //                 {/* Phone */}
// //                 <div className="space-y-1">
// //                   <label
// //                     htmlFor="phone"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Phone Number *
// //                   </label>
// //                   <input
// //                     id="phone"
// //                     type="text"
// //                     name="phone"
// //                     value={state.phone}
// //                     placeholder="Enter your phone number"
// //                     disabled={
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                     }
// //                     className={`${inputClass(errors.phone)} ${
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                         ? "opacity-60 cursor-not-allowed"
// //                         : ""
// //                     }`}
// //                   />
// //                   {errors.phone && (
// //                     <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
// //                   )}
// //                 </div>

// //                 {/* Address */}
// //                 <div className="space-y-1">
// //                   <label
// //                     htmlFor="address"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Address *
// //                   </label>
// //                   <input
// //                     id="address"
// //                     type="text"
// //                     name="address"
// //                     value={state.address}
// //                     onChange={handleChange}
// //                     placeholder="Enter your address"
// //                     className={inputClass(errors.address)}
// //                   />
// //                   {errors.address && (
// //                     <p className="text-red-500 text-xs mt-1">
// //                       {errors.address}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* City */}
// //                 <div className="space-y-1">
// //                   <label
// //                     htmlFor="city"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     City *
// //                   </label>
// //                   <input
// //                     id="city"
// //                     type="text"
// //                     name="city"
// //                     value={state.city}
// //                     onChange={handleChange}
// //                     placeholder="Enter your city"
// //                     className={inputClass(errors.city)}
// //                   />
// //                   {errors.city && (
// //                     <p className="text-red-500 text-xs mt-1">{errors.city}</p>
// //                   )}
// //                 </div>

// //                 {/* State */}
// //                 <div className="space-y-1">
// //                   <label
// //                     htmlFor="state"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     State *
// //                   </label>
// //                   <input
// //                     id="state"
// //                     type="text"
// //                     name="state"
// //                     value={state.state}
// //                     onChange={handleChange}
// //                     placeholder="Enter your state"
// //                     className={inputClass(errors.state)}
// //                   />
// //                   {errors.state && (
// //                     <p className="text-red-500 text-xs mt-1">{errors.state}</p>
// //                   )}
// //                 </div>

// //                 {/* Country - Full width on mobile, half on larger screens */}
// //                 <div className="space-y-1 sm:col-span-1">
// //                   <label
// //                     htmlFor="country"
// //                     className="block text-sm font-medium text-gray-700"
// //                   >
// //                     Country *
// //                   </label>
// //                   <select
// //                     id="country"
// //                     name="country"
// //                     value={state.country}
// //                     onChange={handleChange}
// //                     disabled={
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                     }
// //                     className={`${inputClass(errors.country)} ${
// //                       userData?.data && Object.keys(userData.data).length > 0
// //                         ? "opacity-60 cursor-not-allowed"
// //                         : ""
// //                     }`}
// //                   >
// //                     <option value="">Select Country</option>
// //                     {countryCodes?.map(({ country_name }) => (
// //                       <option key={country_name} value={country_name}>
// //                         {country_name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                   {errors.country && (
// //                     <p className="text-red-500 text-xs mt-1">
// //                       {errors.country}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 disabled={loading || updateLoader}
// //                 className={`w-full mt-4 sm:mt-6 py-2.5 rounded-full font-semibold transition shadow-md text-sm sm:text-base ${
// //                   loading || updateLoader
// //                     ? "bg-gray-400 text-gray-600 cursor-not-allowed"
// //                     : "bg-teal-600 hover:bg-teal-700 text-white"
// //                 }`}
// //               >
// //                 {loading || updateLoader
// //                   ? userData?.data && Object.keys(userData.data).length > 0
// //                     ? "Updating..."
// //                     : "Creating..."
// //                   : userData?.data && Object.keys(userData.data).length > 0
// //                   ? "Update Profile"
// //                   : "Create Profile"}
// //               </button>
// //             </form>
// //           </div>

// //           {/* Password Section */}
// //           <div className="w-full xl:w-1/3 space-y-4 sm:space-y-6 border-t xl:border-t-0 xl:border-l pt-6 xl:pt-0 xl:pl-6 lg:pl-8">
// //             {/* Security Notice */}
// //             <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 sm:p-4 text-sm text-teal-900 shadow-sm">
// //               <p className="font-semibold mb-1 text-xs sm:text-sm">
// //                 Security Reminder
// //               </p>
// //               <p className="leading-relaxed text-xs sm:text-sm">
// //                 <span className="text-teal-700">
// //                   Enter your current password
// //                 </span>{" "}
// //                 before making any changes to your password. This helps us verify
// //                 that it's really you and keeps your information safe.
// //               </p>
// //             </div>

// //             {/* Password Section Header */}
// //             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
// //               <LockKeyhole className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
// //               Change Password
// //             </h3>

// //             <div className="flex flex-col gap-3 sm:gap-4">
// //               {/* Current Password */}
// //               <div className="space-y-1">
// //                 <label
// //                   htmlFor="currentPassword"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Current Password *
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     id="currentPassword"
// //                     type={showPassword ? "text" : "password"}
// //                     name="password"
// //                     value={formData.password}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, password: e.target.value })
// //                     }
// //                     placeholder="Enter your current password"
// //                     readOnly={otpVerified}
// //                     className={`${inputClass(errors.password)} pr-10 ${
// //                       otpVerified ? "opacity-60" : ""
// //                     }`}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={togglePassword}
// //                     disabled={otpVerified}
// //                     className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
// //                     aria-label={
// //                       showPassword ? "Hide password" : "Show password"
// //                     }
// //                   >
// //                     {showPassword ? "🙈" : "👁️"}
// //                   </button>
// //                 </div>
// //                 {errors.password && (
// //                   <p className="text-red-500 text-xs mt-1">{errors.password}</p>
// //                 )}
// //               </div>

// //               {/* OTP Input */}
// //               <div className="space-y-1">
// //                 <label
// //                   htmlFor="otp"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   OTP *
// //                 </label>
// //                 <div className="flex gap-2 sm:gap-3">
// //                   <input
// //                     id="otp"
// //                     type="text"
// //                     name="otp"
// //                     value={formData.otp}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, otp: e.target.value })
// //                     }
// //                     placeholder="Enter 4-digit OTP"
// //                     disabled={!otpSent}
// //                     className={`${inputClass(errors.otp)} flex-1 ${
// //                       !otpSent ? "opacity-60 cursor-not-allowed" : ""
// //                     }`}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={handleSendOtp}
// //                     disabled={otpSent && !resendOtp}
// //                     className="px-3 sm:px-4 py-2 bg-[#1d8e85] text-white rounded-full font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex-shrink-0"
// //                   >
// //                     {isOtpSending
// //                       ? "Sending..."
// //                       : otpSent && !resendOtp
// //                       ? `${Math.floor(timer / 60)}:${
// //                           timer % 60 < 10 ? `0${timer % 60}` : timer % 60
// //                         }`
// //                       : otpSent && resendOtp
// //                       ? "Resend"
// //                       : "Get OTP"}
// //                   </button>
// //                 </div>
// //                 {errors.otp && (
// //                   <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
// //                 )}
// //               </div>

// //               {/* Verify OTP Button */}
// //               {!otpVerified && otpSent && (
// //                 <button
// //                   type="button"
// //                   onClick={handleVerifyOtp}
// //                   disabled={isVerifying}
// //                   className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-2.5 rounded-xl font-medium transition shadow disabled:opacity-50 text-sm sm:text-base"
// //                 >
// //                   {isVerifying ? "Verifying..." : "Verify OTP"}
// //                 </button>
// //               )}

// //               {/* Password Change Fields */}
// //               {otpVerified && (
// //                 <div className="space-y-3 sm:space-y-4">
// //                   <div className="space-y-1">
// //                     <label
// //                       htmlFor="newPassword"
// //                       className="block text-sm font-medium text-gray-700"
// //                     >
// //                       New Password *
// //                     </label>
// //                     <input
// //                       id="newPassword"
// //                       type="password"
// //                       name="newPassword"
// //                       value={formData.newPassword}
// //                       onChange={(e) =>
// //                         setFormData({
// //                           ...formData,
// //                           newPassword: e.target.value,
// //                         })
// //                       }
// //                       placeholder="Enter new password (min 6 characters)"
// //                       className={inputClass(errors.newPassword)}
// //                     />
// //                     {errors.newPassword && (
// //                       <p className="text-red-500 text-xs mt-1">
// //                         {errors.newPassword}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div className="space-y-1">
// //                     <label
// //                       htmlFor="confirmPassword"
// //                       className="block text-sm font-medium text-gray-700"
// //                     >
// //                       Confirm New Password *
// //                     </label>
// //                     <input
// //                       id="confirmPassword"
// //                       type="password"
// //                       name="confirmPwd"
// //                       value={formData.confirmPwd}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, confirmPwd: e.target.value })
// //                       }
// //                       placeholder="Confirm your new password"
// //                       className={inputClass(errors.confirmPwd)}
// //                     />
// //                     {errors.confirmPwd && (
// //                       <p className="text-red-500 text-xs mt-1">
// //                         {errors.confirmPwd}
// //                       </p>
// //                     )}
// //                   </div>

// //                   <button
// //                     type="button"
// //                     onClick={handleChangePassword}
// //                     disabled={isLoading}
// //                     className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 sm:py-2.5 rounded-xl font-semibold transition shadow disabled:opacity-50 text-sm sm:text-base"
// //                   >
// //                     {isLoading ? "Changing..." : "Change Password"}
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useRef, useMemo } from "react";
// import {
//   LockKeyhole,
//   User,
//   Shield,
//   CreditCard,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Eye,
//   EyeOff,
//   MapPin,
//   Mail,
//   Phone,
//   UserCheck,
//   BadgeCheck,
//   Camera,
//   Save,
// } from "lucide-react";
// import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
// import {
//   useChangePwdMutation,
//   useChangePwdReqMutation,
//   useVerifyMutation,
// } from "../../../../Authentication/authApiSlice";
// import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
// import { useUpdateAddressMutation } from "./profileApiSlice";
// import countryCodes from "../../../../Authentication/countryCodes.json";
// import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";
// export default function Profile3DForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     password: "",
//     newPassword: "",
//     confirmPwd: "",
//     otp: "",
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [timer, setTimer] = useState(120);
//   const [resendOtp, setResendOtp] = useState(false);
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [changePwd, { isLoading }] = useChangePwdMutation();
//   const [changePwdReq] = useChangePwdReqMutation();
//   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
//   const [update, { isLoading: updateLoader }] = useUpdateAddressMutation();
//   const [loading, setLoading] = useState(false);
//   const [profileImage, setProfileImage] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [showAadhaar, setShowAadhaar] = useState(false);
//   const [showPan, setShowPan] = useState(false);
//   const [avatarHover, setAvatarHover] = useState(false);
//   const [aadhaarPlain, setAadhaarPlain] = useState("");
//   const [panPlain, setPanPlain] = useState("");
//   const { data: userData } = useUserDataQuery();
//   const user = userData?.data;
//   const profileRef = useRef(null);

//   // Editable state
//   const [state, setState] = useState({
//     name: "",
//     _id: "",
//     address: "",
//     city: "",
//     country: "",
//     state: "",
//     profile: "",
//   });

//   // Update state when userData changes
//   useEffect(() => {
//     if (user) {
//       setState({
//         name: user.name || "",
//         _id: user._id || "",
//         address: user.address || user.aadhaarKycData?.full_address || "",
//         city: user.city || user.aadhaarKycData?.address?.district || "",
//         country: user.country || user.aadhaarKycData?.address?.country || "",
//         state: user.state || user.aadhaarKycData?.address?.state || "",
//         profile: user.profile || "",
//       });
//     }
//   }, [user]);

//   // Timer for resend OTP
//   useEffect(() => {
//     let countdown;
//     if (otpSent && timer > 0) {
//       countdown = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setResendOtp(true);
//     }
//     return () => clearInterval(countdown);
//   }, [otpSent, timer]);
//  const hexToU8 = (hex) => {
//   if (!hex || typeof hex !== "string" || hex.length % 2 !== 0) return new Uint8Array();
//   const out = new Uint8Array(hex.length / 2);
//   for (let i = 0; i < hex.length; i += 2) out[i / 2] = parseInt(hex.slice(i, i + 2), 16);
//   return out;
// };

// const looksLikeAadhaar = (s) => /^\d{12}$/.test(String(s || "").replace(/\D/g, ""));
// const looksLikePAN = (s) => /^[A-Z]{5}\d{4}[A-Z]$/i.test(String(s || "").trim());

// const normalizePan = (s) => {
//   if (!s) return "";
//   const cleaned = String(s)
//     .replace(/[\u0000-\u001F\u007F]/g, " ")
//     .trim()
//     .toUpperCase();
//   const match = cleaned.match(/[A-Z]{5}\d{4}[A-Z]/);
//   return match ? match[0] : cleaned.replace(/[^A-Z0-9]/g, "");
// };

// const extractPan = (text) => {
//   const raw = String(text ?? "");

//   // Try JSON
//   try {
//     const obj = JSON.parse(raw);
//     const candidate = obj?.pan || obj?.panNumber || obj?.PAN || obj?.PANNumber;
//     if (candidate) return normalizePan(candidate);
//   } catch (_) {}

//   // Find PAN anywhere
//   const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, " ").toUpperCase();
//   const match = cleaned.match(/[A-Z]{5}\d{4}[A-Z]/);
//   return match ? match[0] : normalizePan(cleaned);
// };

// const importAesKeyFromHex = async (hexKey) => {
//   const keyBytes = hexToU8(hexKey);
//   return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"]);
// };

// const decryptKycGCM = async (payload, type) => {
//   const t = String(type || "").toLowerCase();
//   if (!payload) return "";

//   const raw = String(payload).trim();

//   // already masked/plain
//   if (raw.toUpperCase().includes("X")) return raw;
//   if (t === "aadhaar" && looksLikeAadhaar(raw)) return raw.replace(/\D/g, "");
//   if (t === "pan" && looksLikePAN(raw)) return raw.trim().toUpperCase();

//   const parts = raw.split(":");
//   if (parts.length !== 3) return "";

//   const [ivHex, tagHex, cipherHex] = parts;

//   const iv = hexToU8(ivHex);         // 12 bytes
//   const tag = hexToU8(tagHex);       // 16 bytes
//   const cipher = hexToU8(cipherHex); // N bytes

//   try {
//     const keyHex = import.meta.env.VITE_KYC_AES_KEY;
//     const key = await importAesKeyFromHex(keyHex);

//     // WebCrypto expects ciphertext||tag
//     const combined = new Uint8Array(cipher.length + tag.length);
//     combined.set(cipher, 0);
//     combined.set(tag, cipher.length);

//     const decryptedBuf = await crypto.subtle.decrypt(
//       { name: "AES-GCM", iv, tagLength: 128 },
//       key,
//       combined
//     );

//     let decrypted = new TextDecoder().decode(decryptedBuf);

//     if (t === "aadhaar") {
//       decrypted = decrypted.replace(/\D/g, "");
//       return looksLikeAadhaar(decrypted) ? decrypted : "";
//     }

//     if (t === "pan") {
//       const pan = extractPan(decrypted);
//       // Return extracted even if validator fails slightly (prevents empty)
//       return pan || "";
//     }

//     return decrypted || "";
//   } catch (e) {
//     console.error("[KYC] decrypt failed:", e);
//     return "";
//   }
// };

//   // -------------------- masking --------------------
//   const maskAadhaar = (aadhaar, showAadhaar) => {
//     if (!aadhaar) return "";
//     const raw = String(aadhaar).trim();
//     if (raw.toUpperCase().includes("X")) return raw;

//     const clean = raw.replace(/\D/g, "");
//     if (clean.length < 12) return raw;

//     if (showAadhaar) return clean.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
//     return `XXXX-XXXX-${clean.slice(-4)}`;
//   };

//   const maskPan = (pan, showPan) => {
//     if (!pan) return "";
//     const raw = String(pan).trim();
//     if (raw.toUpperCase().includes("X")) return raw.toUpperCase();

//     const clean = normalizePan(raw);
//     if (clean.length < 10) return raw.toUpperCase();

//     if (showPan) return clean.slice(0, 10);
//     return `${clean.slice(0, 2)}XXXXX${clean.slice(-3)}`;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const getProfileImage = () => {
//     if (profileImage) return profileImage;
//     if (state.profile && typeof state.profile === "string")
//       return state.profile;
//     if (user?.aadhaarKycData?.photo)
//       return `data:image/jpeg;base64,${user.aadhaarKycData.photo}`;
//     return null;
//   };

//   const getGenderDisplay = (gender) => {
//     if (!gender) return "";
//     if (gender === "F") return "Female";
//     if (gender === "M") return "Male";
//     return gender;
//   };

//   const togglePassword = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
//     if (!acceptedFormats.includes(file.type)) {
//       toast.warning("Only JPG / PNG files are allowed", {
//         position: "top-center",
//       });
//       profileRef.current.value = "";
//       return;
//     }

//     const imageUrl = URL.createObjectURL(file);
//     setState((prevState) => ({ ...prevState, profile: file }));
//     setProfileImage(imageUrl);
//   };

//   // Validation
//   const validateForm = () => {
//     let formErrors = {};

//     if (!state.address.trim()) {
//       formErrors.address = "Address is required.";
//     } else if (state.address.trim().length < 5) {
//       formErrors.address = "Address must be at least 5 characters.";
//     } else if (state.address.trim().length > 200) {
//       formErrors.address = "Address cannot exceed 200 characters.";
//     }

//     if (!state.city.trim()) {
//       formErrors.city = "City is required.";
//     } else if (state.city.trim().length < 2) {
//       formErrors.city = "City must be at least 2 characters.";
//     } else if (!/^[a-zA-Z\s-]+$/.test(state.city.trim())) {
//       formErrors.city = "City can only contain letters, spaces, and hyphens.";
//     }

//     if (!state.state.trim()) {
//       formErrors.state = "State is required.";
//     } else if (state.state.trim().length < 2) {
//       formErrors.state = "State must be at least 2 characters.";
//     } else if (!/^[a-zA-Z\s-]+$/.test(state.state.trim())) {
//       formErrors.state = "State can only contain letters, spaces, and hyphens.";
//     }

//     if (!state.country.trim()) {
//       formErrors.country = "Country is required.";
//     }

//     return formErrors;
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       const hasChanged =
//         state.address !==
//           (user?.address || user?.aadhaarKycData?.full_address || "") ||
//         state.city !==
//           (user?.city || user?.aadhaarKycData?.address?.district || "") ||
//         state.state !==
//           (user?.state || user?.aadhaarKycData?.address?.state || "") ||
//         state.country !==
//           (user?.country || user?.aadhaarKycData?.address?.country || "") ||
//         state.profile instanceof File;

//       if (!hasChanged) {
//         toast.info("No changes detected to update", { position: "top-center" });
//         return;
//       }

//       setLoading(true);
//       try {
//         const formDataToSend = new FormData();
//         formDataToSend.append("_id", state._id);
//         formDataToSend.append("address", state.address);
//         formDataToSend.append("city", state.city);
//         formDataToSend.append("country", state.country);
//         formDataToSend.append("state", state.state);

//         if (state.profile instanceof File) {
//           formDataToSend.append("profile", state.profile);
//         }

//         const res = await update(formDataToSend);

//         if (res?.data?.status_code === 200) {
//           toast.success(res?.data?.message, { position: "top-center" });
//         }
//       } catch (error) {
//         toast.error(error?.message || "Update failed", {
//           position: "top-center",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Password validation functions
//   const validateOldPassword = () => {
//     let formErrors = {};
//     if (!formData.password) {
//       formErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       formErrors.password = "Password must be at least 6 characters";
//     }
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const validateNewPassword = () => {
//     let formErrors = {};
//     if (!formData.newPassword) {
//       formErrors.newPassword = "New Password is required";
//     } else if (formData.newPassword.length < 6) {
//       formErrors.newPassword = "Password must be at least 6 characters";
//     }
//     if (formData.newPassword !== formData.confirmPwd) {
//       formErrors.confirmPwd = "Passwords do not match";
//     }
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const validateOtp = () => {
//     let formErrors = {};
//     const numberRegex = /^[0-9]+$/;
//     if (!formData.otp) {
//       formErrors.otp = "OTP is required";
//     } else if (!numberRegex.test(formData.otp)) {
//       formErrors.otp = "OTP must be a number";
//     } else if (formData.otp.length < 4) {
//       formErrors.otp = "OTP must be 4 Numbers";
//     }
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   // Handler functions
//   const handleSendOtp = async () => {
//     if (validateOldPassword()) {
//       setIsOtpSending(true);
//       try {
//         await changePwdReq({ password: formData.password }).unwrap();

//         toast.success("OTP sent to your email", { position: "top-center" });
//         setOtpSent(true);
//         if (resendOtp) {
//           setResendOtp(false);
//           setTimer(120);
//         }
//       } catch (error) {
//         toast.error(error?.data?.message, { position: "top-center" });
//       } finally {
//         setIsOtpSending(false);
//       }
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (validateOtp()) {
//       try {
//         await verify({
//           email: user?.email,
//           otp: Number(formData.otp),
//           otpType: "ChangePassword",
//         }).unwrap();
//         toast.success("OTP verified successfully", { position: "top-center" });
//         setOtpVerified(true);
//         setResendOtp(true);
//       } catch (error) {
//         toast.error(error?.data?.message, { position: "top-center" });
//       }
//     }
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     if (validateNewPassword()) {
//       try {
//         const res = await changePwd({
//           newPassword: formData.newPassword,
//           email: user?.email,
//         }).unwrap();
//         toast.success(res?.message, { position: "top-center" });
//         Cookies.remove("token");
//         setFormData({ password: "", newPassword: "", confirmPwd: "", otp: "" });
//         setOtpSent(false);
//         setOtpVerified(false);
//         window.location.href = "/login";
//       } catch (error) {
//         toast.error(error?.data?.message, { position: "top-center" });
//       }
//     }
//   };

//   // Store profile in localStorage
//   if (user?.profile) {
//     localStorage.setItem("profile", user.profile);
//   } else {
//     localStorage.removeItem("profile");
//   }

//   const readOnlyInputClass =
//     "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 bg-gray-100 cursor-not-allowed focus:outline-none";

//   const editableInputClass = (hasError) =>
//     `w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-400 focus:outline-none ${
//       hasError ? "border-red-500" : "border-gray-300"
//     }`;

//   const inputClass = (hasError) =>
//     `w-full border focus:border-teal-500 focus:ring-2 focus:ring-teal-400 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition bg-white shadow-inner ${
//       hasError ? "border-red-500" : "border-gray-300"
//     }`;

//   // Status Badge Component
//   const StatusBadge = ({ isValid, label }) => (
//     <span
//       className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
//         isValid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//       }`}
//     >
//       {isValid ? (
//         <CheckCircle className="w-3 h-3" />
//       ) : (
//         <XCircle className="w-3 h-3" />
//       )}
//       {label || (isValid ? "Verified" : "Not Verified")}
//     </span>
//   );

//   return (
//     <div className="bg-[#1d8e85] min-h-screen">
//       <div className="max-w-8xl mx-auto p-2 sm:p-4">
//         <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
//           {/* Left Section - Scrollable Profile Info (Hidden Scrollbar) */}
//           <div className="w-full xl:w-2/3 xl:h-[calc(100vh-2rem)] xl:overflow-y-auto scrollbar-hide">
//             <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl p-4 sm:p-6">
//               {/* Profile Header with Image Upload */}
//               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
//                 {/* Profile Photo with Upload */}
//                 <div className="relative flex-shrink-0">
//                   <div
//                     className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 p-1 shadow-lg cursor-pointer transition-transform hover:scale-105"
//                     onClick={() => profileRef.current?.click()}
//                     onMouseEnter={() => setAvatarHover(true)}
//                     onMouseLeave={() => setAvatarHover(false)}
//                   >
//                     <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
//                       {getProfileImage() ? (
//                         <img
//                           src={getProfileImage()}
//                           alt="Profile"
//                           className="w-full h-full object-cover rounded-full"
//                         />
//                       ) : (
//                         <User className="text-teal-600 w-12 h-12" />
//                       )}
//                       {/* Hover Overlay */}
//                       <div
//                         className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${
//                           avatarHover ? "opacity-100" : "opacity-0"
//                         }`}
//                       >
//                         <Camera className="w-6 h-6 text-white" />
//                       </div>
//                     </div>
//                   </div>
//                   {user?.isMiniKycVerified && (
//                     <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-md">
//                       <BadgeCheck className="w-5 h-5 text-white" />
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     ref={profileRef}
//                     accept=".png,.jpg,.jpeg"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </div>

//                 {/* Header Info */}
//                 <div className="text-center sm:text-left flex-1">
//                   <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
//                     {user?.name || "User Profile"}
//                     {user?.isMiniKycVerified && (
//                       <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
//                         KYC Verified
//                       </span>
//                     )}
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">
//                     @{user?.username}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-center sm:justify-start">
//                     <Calendar className="w-3 h-3" />
//                     Member since:{" "}
//                     {formatDate(user?.registeredDate || user?.createdAt)}
//                   </p>
//                   <p className="text-xs text-teal-600 mt-2">
//                     Click on profile picture to update
//                   </p>
//                 </div>
//               </div>

//               {/* Profile Update Form */}
//               <form onSubmit={handleProfileSubmit}>
//                 {/* Personal Information - Read Only */}
//                 <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                     <UserCheck className="text-teal-600 w-5 h-5" />
//                     Personal Information
//                     <span className="text-xs text-gray-400 font-normal">
//                       (From KYC - Read Only)
//                     </span>
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {/* Name */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         value={user?.name || ""}
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>

//                     {/* Email */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
//                         <Mail className="w-3 h-3" /> Email Address
//                       </label>
//                       <input
//                         type="email"
//                         value={user?.email || ""}
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
//                         <Phone className="w-3 h-3" /> Phone Number
//                       </label>
//                       <input
//                         type="text"
//                         value={
//                           user?.countryCode
//                             ? `+${user.countryCode} ${user.phone}`
//                             : user?.phone || ""
//                         }
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>

//                     {/* Date of Birth */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Date of Birth
//                       </label>
//                       <input
//                         type="text"
//                         value={user?.aadhaarKycData?.date_of_birth || ""}
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>

//                     {/* Gender */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Gender
//                       </label>
//                       <input
//                         type="text"
//                         value={getGenderDisplay(user?.aadhaarKycData?.gender)}
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>

//                     {/* Care Of */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Care Of
//                       </label>
//                       <input
//                         type="text"
//                         value={user?.aadhaarKycData?.care_of || ""}
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Address Information - Editable */}
//                 <div className="bg-blue-50 rounded-xl p-4 sm:p-5 mb-4 border border-blue-200">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                     <MapPin className="text-teal-600 w-5 h-5" />
//                     Address Information
//                     <span className="text-xs text-blue-600 font-normal">
//                       (Editable)
//                     </span>
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {/* Full Address */}
//                     <div className="space-y-1 sm:col-span-2">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Full Address *
//                       </label>
//                       <textarea
//                         name="address"
//                         value={state.address}
//                         onChange={handleChange}
//                         rows={2}
//                         placeholder="Enter your full address"
//                         className={`${editableInputClass(
//                           errors.address
//                         )} resize-none`}
//                       />
//                       {errors.address && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.address}
//                         </p>
//                       )}
//                     </div>

//                     {/* City */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         City / District *
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={state.city}
//                         onChange={handleChange}
//                         placeholder="Enter your city"
//                         className={editableInputClass(errors.city)}
//                       />
//                       {errors.city && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.city}
//                         </p>
//                       )}
//                     </div>

//                     {/* State */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         State *
//                       </label>
//                       <input
//                         type="text"
//                         name="state"
//                         value={state.state}
//                         onChange={handleChange}
//                         placeholder="Enter your state"
//                         className={editableInputClass(errors.state)}
//                       />
//                       {errors.state && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.state}
//                         </p>
//                       )}
//                     </div>

//                     {/* Country */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Country *
//                       </label>
//                       <select
//                         name="country"
//                         value={state.country}
//                         onChange={handleChange}
//                         className={editableInputClass(errors.country)}
//                       >
//                         <option value="">Select Country</option>
//                         {countryCodes?.map(({ country_name }) => (
//                           <option key={country_name} value={country_name}>
//                             {country_name}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.country && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.country}
//                         </p>
//                       )}
//                     </div>

//                     {/* Pincode - Read Only */}
//                     <div className="space-y-1">
//                       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                         Pincode
//                       </label>
//                       <input
//                         type="text"
//                         value={user?.aadhaarKycData?.address?.pincode || ""}
//                         readOnly
//                         className={readOnlyInputClass}
//                       />
//                     </div>
//                   </div>

//                   {/* Update Button */}
//                   <button
//                     type="submit"
//                     disabled={loading || updateLoader}
//                     className={`w-full mt-4 py-2.5 rounded-xl font-semibold transition shadow-md text-sm sm:text-base flex items-center justify-center gap-2 ${
//                       loading || updateLoader
//                         ? "bg-gray-400 text-gray-600 cursor-not-allowed"
//                         : "bg-teal-600 hover:bg-teal-700 text-white"
//                     }`}
//                   >
//                     <Save className="w-4 h-4" />
//                     {loading || updateLoader ? "Updating..." : "Update Profile"}
//                   </button>
//                 </div>
//               </form>

//               {/* KYC Information - Read Only */}
//               {(user?.aadhaarNumber || user?.panNumber) && (
//                 <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-5 border border-teal-100">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                     <Shield className="text-teal-600 w-5 h-5" />
//                     KYC Verification
//                     {user?.isMiniKycVerified && (
//                       <StatusBadge isValid={true} label="Completed" />
//                     )}
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {/* Aadhaar Number */}
//                     {user?.aadhaarNumber && (
//                       <div className="space-y-1">
//                         <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-between">
//                           <span className="flex items-center gap-1">
//                             <CreditCard className="w-3 h-3 text-orange-500" />
//                             Aadhaar Number
//                           </span>
//                           <StatusBadge
//                             isValid={user?.aadhaarKycData?.status === "VALID"}
//                           />
//                         </label>

//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={maskAadhaar(aadhaarPlain, showAadhaar)}
//                             readOnly
//                             className={readOnlyInputClass}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowAadhaar((v) => !v)}
//                             className="absolute right-3 top-2.5 text-gray-500 hover:text-teal-600 transition"
//                             aria-label={
//                               showAadhaar ? "Hide Aadhaar" : "Show Aadhaar"
//                             }
//                           >
//                             {showAadhaar ? (
//                               <EyeOff className="w-4 h-4" />
//                             ) : (
//                               <Eye className="w-4 h-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* PAN Number */}
//                     {user?.panNumber && (
//                       <div className="space-y-1">
//                         <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-between">
//                           <span className="flex items-center gap-1">
//                             <CreditCard className="w-3 h-3 text-blue-500" />
//                             PAN Number
//                           </span>
//                           <StatusBadge
//                             isValid={
//                               String(user?.panKycData?.status).toLowerCase() ===
//                               "valid"
//                             }
//                           />
//                         </label>

//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={maskPan(panPlain, showPan)}
//                             readOnly
//                             className={readOnlyInputClass}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPan((v) => !v)}
//                             className="absolute right-3 top-2.5 text-gray-500 hover:text-teal-600 transition"
//                             aria-label={showPan ? "Hide PAN" : "Show PAN"}
//                           >
//                             {showPan ? (
//                               <EyeOff className="w-4 h-4" />
//                             ) : (
//                               <Eye className="w-4 h-4" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* PAN Category */}
//                     {user?.panKycData?.category && (
//                       <div className="space-y-1">
//                         <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
//                           PAN Category
//                         </label>
//                         <input
//                           type="text"
//                           value={
//                             user.panKycData.category.charAt(0).toUpperCase() +
//                             user.panKycData.category.slice(1)
//                           }
//                           readOnly
//                           className={readOnlyInputClass}
//                         />
//                       </div>
//                     )}

//                     {/* Aadhaar-PAN Link Status */}
//                     {user?.panKycData?.aadhaar_seeding_status && (
//                       <div className="space-y-1">
//                         <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-between">
//                           Aadhaar-PAN Linked
//                           <StatusBadge
//                             isValid={
//                               String(
//                                 user.panKycData.aadhaar_seeding_status
//                               ).toLowerCase() === "y"
//                             }
//                           />
//                         </label>
//                         <input
//                           type="text"
//                           value={
//                             String(
//                               user.panKycData.aadhaar_seeding_status
//                             ).toLowerCase() === "y"
//                               ? "Yes - Linked"
//                               : "Not Linked"
//                           }
//                           readOnly
//                           className={readOnlyInputClass}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* Verification Checks */}
//                   <div className="mt-4 pt-4 border-t border-teal-200">
//                     <div className="flex flex-wrap gap-3 text-xs">
//                       {user?.panKycData?.name_as_per_pan_match !==
//                         undefined && (
//                         <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
//                           {user.panKycData.name_as_per_pan_match ? (
//                             <CheckCircle className="w-4 h-4 text-green-600" />
//                           ) : (
//                             <XCircle className="w-4 h-4 text-red-600" />
//                           )}
//                           <span className="font-medium">Name Match</span>
//                         </div>
//                       )}
//                       {user?.panKycData?.date_of_birth_match !== undefined && (
//                         <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm">
//                           {user.panKycData.date_of_birth_match ? (
//                             <CheckCircle className="w-4 h-4 text-green-600" />
//                           ) : (
//                             <XCircle className="w-4 h-4 text-red-600" />
//                           )}
//                           <span className="font-medium">DOB Match</span>
//                         </div>
//                       )}
//                       {user?.aadhaarKycData?.reference_id && (
//                         <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm text-gray-500">
//                           <span>Ref: {user.aadhaarKycData.reference_id}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Section - Fixed Password Change */}
//           <div className="w-full xl:w-1/3 xl:sticky xl:top-4 xl:h-fit">
//             <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl p-4 sm:p-6">
//               {/* Security Notice */}
//               <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 text-sm text-amber-900 shadow-sm mb-4">
//                 <p className="font-semibold mb-1 text-xs sm:text-sm flex items-center gap-1">
//                   <Shield className="w-4 h-4" />
//                   Security Reminder
//                 </p>
//                 <p className="leading-relaxed text-xs sm:text-sm">
//                   Enter your current password before making changes. This helps
//                   verify your identity.
//                 </p>
//               </div>

//               {/* Password Section Header */}
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                 <LockKeyhole className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
//                 Change Password
//               </h3>

//               <div className="flex flex-col gap-3 sm:gap-4">
//                 {/* Current Password */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Current Password *
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                       }
//                       placeholder="Enter your current password"
//                       readOnly={otpVerified}
//                       className={`${inputClass(errors.password)} pr-10 ${
//                         otpVerified ? "opacity-60" : ""
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={togglePassword}
//                       disabled={otpVerified}
//                       className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 {/* OTP Input */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     OTP *
//                   </label>
//                   <div className="flex gap-2 sm:gap-3">
//                     <input
//                       type="text"
//                       name="otp"
//                       value={formData.otp}
//                       onChange={(e) =>
//                         setFormData({ ...formData, otp: e.target.value })
//                       }
//                       placeholder="Enter 6-digit OTP"
//                       disabled={!otpSent || otpVerified}
//                       maxLength={6}
//                       className={`${inputClass(errors.otp)} flex-1 ${
//                         !otpSent || otpVerified
//                           ? "opacity-60 cursor-not-allowed"
//                           : ""
//                       }`}
//                     />
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       disabled={
//                         (otpSent && !resendOtp) || otpVerified || isOtpSending
//                       }
//                       className="px-3 sm:px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex-shrink-0"
//                     >
//                       {isOtpSending
//                         ? "Sending..."
//                         : otpSent && !resendOtp
//                         ? `${Math.floor(timer / 60)}:${
//                             timer % 60 < 10 ? `0${timer % 60}` : timer % 60
//                           }`
//                         : otpSent && resendOtp
//                         ? "Resend"
//                         : "Get OTP"}
//                     </button>
//                   </div>
//                   {errors.otp && (
//                     <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
//                   )}
//                 </div>

//                 {/* Verify OTP Button */}
//                 {!otpVerified && otpSent && (
//                   <button
//                     type="button"
//                     onClick={handleVerifyOtp}
//                     disabled={isVerifying}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium transition shadow disabled:opacity-50"
//                   >
//                     {isVerifying ? "Verifying..." : "Verify OTP"}
//                   </button>
//                 )}

//                 {/* New Password Fields */}
//                 {otpVerified && (
//                   <div className="space-y-4 pt-2 border-t border-gray-200">
//                     <div className="space-y-1">
//                       <label className="block text-sm font-medium text-gray-700">
//                         New Password *
//                       </label>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             newPassword: e.target.value,
//                           })
//                         }
//                         placeholder="Enter new password (min 6 characters)"
//                         className={inputClass(errors.newPassword)}
//                       />
//                       {errors.newPassword && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.newPassword}
//                         </p>
//                       )}
//                     </div>

//                     <div className="space-y-1">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Confirm New Password *
//                       </label>
//                       <input
//                         type="password"
//                         name="confirmPwd"
//                         value={formData.confirmPwd}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             confirmPwd: e.target.value,
//                           })
//                         }
//                         placeholder="Confirm your new password"
//                         className={inputClass(errors.confirmPwd)}
//                       />
//                       {errors.confirmPwd && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.confirmPwd}
//                         </p>
//                       )}
//                     </div>

//                     <button
//                       type="button"
//                       onClick={handleChangePassword}
//                       disabled={isLoading}
//                       className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-xl font-semibold transition shadow disabled:opacity-50"
//                     >
//                       {isLoading ? "Changing..." : "Change Password"}
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Account Info */}
//               <div className="mt-6 pt-4 border-t border-gray-200">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3">
//                   Account Details
//                 </h4>
//                 <div className="space-y-2 text-xs text-gray-500">
//                   <div className="flex justify-between">
//                     <span>Username:</span>
//                     <span className="font-medium text-gray-700">
//                       {user?.username}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-start">
//                     <span>Reference ID:</span>
//                     <span className="font-medium text-gray-700 text-right break-all max-w-[60%]">
//                       {user?.referenceId}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Wallet:</span>
//                     <span
//                       className="font-medium text-gray-700 truncate max-w-[150px]"
//                       title={user?.walletadress}
//                     >
//                       {user?.walletadress
//                         ? `${user.walletadress.slice(
//                             0,
//                             6
//                           )}...${user.walletadress.slice(-4)}`
//                         : "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hidden Scrollbar Styles */}
//       <style jsx>{`
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import {
  LockKeyhole,
  User,
  Shield,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  MapPin,
  Mail,
  Phone,
  UserCheck,
  BadgeCheck,
  X,
  Expand,
} from "lucide-react";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import {
  useChangePwdMutation,
  useChangePwdReqMutation,
  useVerifyMutation,
} from "../../../../Authentication/authApiSlice";
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import Cookies from "js-cookie";

// ==================== DECRYPTION UTILITIES (Using Web Crypto API) ====================

const hexToUint8Array = (hex) => {
  if (!hex || typeof hex !== "string" || hex.length % 2 !== 0) {
    return new Uint8Array();
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
};

const importAesKey = async (hexKey) => {
  const keyBytes = hexToUint8Array(hexKey);
  if (keyBytes.length !== 32) {
    throw new Error(
      `Invalid key length: ${keyBytes.length} bytes (expected 32 for AES-256)`
    );
  }
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, [
    "decrypt",
  ]);
};

const decryptAesGcm = async (encryptedData, type) => {
  // console.log(`[Decrypt ${type}] Starting decryption...`);

  if (!encryptedData) {
    // console.log(`[Decrypt ${type}] No data to decrypt`);
    return "";
  }

  // Check if already decrypted/masked
  const dataStr = String(encryptedData).trim();
  if (dataStr.includes("X") || dataStr.includes("x")) {
    // console.log(`[Decrypt ${type}] Already masked:`, dataStr);
    return dataStr;
  }

  // Parse the encrypted format: iv:tag:cipher
  const parts = dataStr.split(":");
  if (parts.length !== 3) {
    console.error(
      `[Decrypt ${type}] Invalid format. Expected iv:tag:cipher, got:`,
      parts.length,
      "parts"
    );
    return "";
  }

  const [ivHex, tagHex, cipherHex] = parts;
  // console.log(
    // `[Decrypt ${type}] IV length: ${ivHex.length}, Tag length: ${tagHex.length}, Cipher length: ${cipherHex.length}`
  // );

  try {
    const keyHex = import.meta.env.VITE_KYC_AES_KEY;
    if (!keyHex) {
      // console.error("[Decrypt] Missing VITE_KYC_AES_KEY environment variable");
      return "";
    }

    // Convert hex strings to Uint8Arrays
    const iv = hexToUint8Array(ivHex);
    const tag = hexToUint8Array(tagHex);
    const ciphertext = hexToUint8Array(cipherHex);

    // console.log(
      // `[Decrypt ${type}] Byte lengths - IV: ${iv.length}, Tag: ${tag.length}, Cipher: ${ciphertext.length}`
    // );

    // Validate lengths
    if (iv.length !== 12) {
      console.error(
        // `[Decrypt ${type}] Invalid IV length: ${iv.length} (expected 12)`
      );
      return "";
    }
    if (tag.length !== 16) {
      console.error(
        // `[Decrypt ${type}] Invalid tag length: ${tag.length} (expected 16)`
      );
      return "";
    }

    // Import the key
    const cryptoKey = await importAesKey(keyHex);

    // For AES-GCM, combine ciphertext and tag
    const combined = new Uint8Array(ciphertext.length + tag.length);
    combined.set(ciphertext, 0);
    combined.set(tag, ciphertext.length);

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
        tagLength: 128,
      },
      cryptoKey,
      combined
    );

    // Convert decrypted bytes to string
    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    // console.log(`[Decrypt ${type}] Decrypted successfully`);

    // Process based on type
    if (type === "aadhaar") {
      // Extract only digits
      const digits = decryptedText.replace(/\D/g, "");
      // console.log(
      //   `[Decrypt ${type}] Extracted digits:`,
      //   digits.substring(0, 4) + "****"
      // );
      if (digits.length === 12) {
        return digits;
      }
      console.error(
        `[Decrypt ${type}] Invalid Aadhaar length: ${digits.length}`
      );
      return "";
    } else if (type === "pan") {
      // Try to extract PAN pattern
      const panMatch = decryptedText
        .replace(/\s+/g, "")
        .match(/[A-Z]{5}[0-9]{4}[A-Z]/i);
      if (panMatch) {
        const pan = panMatch[0].toUpperCase();
        // console.log(
        //   `[Decrypt ${type}] Extracted PAN:`,
        //   pan.substring(0, 2) + "****"
        // );
        return pan;
      }

      // If no pattern match, clean and check
      const cleaned = decryptedText.replace(/[^A-Z0-9]/gi, "").toUpperCase();
      if (cleaned.length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleaned)) {
        // console.log(
        //   `[Decrypt ${type}] Cleaned PAN:`,
        //   cleaned.substring(0, 2) + "****"
        // );
        return cleaned;
      }

      console.error(
        `[Decrypt ${type}] Could not extract valid PAN from:`,
        decryptedText
      );
      return "";
    }

    return decryptedText;
  } catch (error) {
    console.error(`[Decrypt ${type}] Decryption failed:`, error.message);
    return "";
  }
};

// Masking functions
const maskAadhaar = (aadhaar, showFull) => {
  if (!aadhaar || aadhaar === "") return "Decryption Failed";

  const clean = String(aadhaar).replace(/\D/g, "");
  if (clean.length !== 12) return "Invalid Format";

  if (showFull) {
    return `${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}`;
  }
  return `XXXX-XXXX-${clean.slice(-4)}`;
};

const maskPan = (pan, showFull) => {
  if (!pan || pan === "") return "Decryption Failed";

  const clean = String(pan).trim().toUpperCase();
  if (clean.length !== 10) return "Invalid Format";

  if (showFull) {
    return clean;
  }
  return `${clean.slice(0, 2)}XXXXX${clean.slice(-3)}`;
};

// ==================== IMAGE MODAL COMPONENT ====================
const ImageModal = ({ isOpen, onClose, imageSrc, userName }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={imageSrc}
            alt={`${userName}'s profile`}
            className="max-w-full max-h-[80vh] object-contain rounded-xl"
          />
          <p className="mt-4 text-center text-gray-700 font-medium">
            {userName}
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export default function Profile3DForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPwd: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendOtp, setResendOtp] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [changePwd, { isLoading }] = useChangePwdMutation();
  const [changePwdReq] = useChangePwdReqMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [otpVerified, setOtpVerified] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [showPan, setShowPan] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Separate states for decrypted values
  const [aadhaarPlain, setAadhaarPlain] = useState("");
  const [panPlain, setPanPlain] = useState("");
  const [isDecryptingAadhaar, setIsDecryptingAadhaar] = useState(false);
  const [isDecryptingPan, setIsDecryptingPan] = useState(false);

  const { data: userData } = useUserDataQuery();
  const user = userData?.data;

  // Check browser support
  useEffect(() => {
    if (!window.crypto?.subtle) {
      console.error("Web Crypto API not supported in this browser!");
      toast.error(
        "Your browser doesn't support secure decryption. Please use a modern browser.",
        {
          position: "top-center",
        }
      );
    }
  }, []);

  // ==================== DECRYPT AADHAAR ====================
  useEffect(() => {
    const decryptAadhaar = async () => {
      if (!user?.aadhaarNumber || !window.crypto?.subtle) {
        setAadhaarPlain("");
        return;
      }

      // console.log("[Aadhaar] Encrypted value:", user.aadhaarNumber);
      setIsDecryptingAadhaar(true);

      try {
        const decrypted = await decryptAesGcm(user.aadhaarNumber, "aadhaar");
        setAadhaarPlain(decrypted);
      } catch (error) {
        // console.error("[Aazdhaar] Decryption error:", error);
        setAadhaarPlain("");
      } finally {
        setIsDecryptingAadhaar(false);
      }
    };

    decryptAadhaar();
  }, [user?.aadhaarNumber]);

  // ==================== DECRYPT PAN ====================
  useEffect(() => {
    const decryptPan = async () => {
      if (!user?.panNumber || !window.crypto?.subtle) {
        setPanPlain("");
        return;
      }

      // console.log("[PAN] Encrypted value:", user.panNumber);
      setIsDecryptingPan(true);

      try {
        const decrypted = await decryptAesGcm(user.panNumber, "pan");
        setPanPlain(decrypted);
      } catch (error) {
        // console.error("[PAN] Decryption error:", error);
        setPanPlain("");
      } finally {
        setIsDecryptingPan(false);
      }
    };

    decryptPan();
  }, [user?.panNumber]);

  // Timer for resend OTP
  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendOtp(true);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getProfileImage = () => {
    if (user?.profile && typeof user.profile === "string") return user.profile;
    if (user?.aadhaarKycData?.photo)
      return `data:image/jpeg;base64,${user.aadhaarKycData.photo}`;
    return null;
  };

  const getGenderDisplay = (gender) => {
    if (!gender) return "";
    if (gender === "F") return "Female";
    if (gender === "M") return "Male";
    return gender;
  };

  const togglePassword = () => setShowPassword(!showPassword);

  // Password validation functions
  const validateOldPassword = () => {
    let formErrors = {};
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateNewPassword = () => {
    let formErrors = {};
    if (!formData.newPassword) {
      formErrors.newPassword = "New Password is required";
    } else if (formData.newPassword.length < 6) {
      formErrors.newPassword = "Password must be at least 6 characters";
    }
    if (formData.newPassword !== formData.confirmPwd) {
      formErrors.confirmPwd = "Passwords do not match";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateOtp = () => {
    let formErrors = {};
    const numberRegex = /^[0-9]+$/;
    if (!formData.otp) {
      formErrors.otp = "OTP is required";
    } else if (!numberRegex.test(formData.otp)) {
      formErrors.otp = "OTP must be a number";
    } else if (formData.otp.length < 6) {
      formErrors.otp = "OTP must be 6 digits";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (validateOldPassword()) {
      setIsOtpSending(true);
      try {
        await changePwdReq({ password: formData.password }).unwrap();
        toast.success("OTP sent to your email", { position: "top-center" });
        setOtpSent(true);
        if (resendOtp) {
          setResendOtp(false);
          setTimer(120);
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to send OTP", {
          position: "top-center",
        });
      } finally {
        setIsOtpSending(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (validateOtp()) {
      try {
        await verify({
          email: user?.email,
          otp: Number(formData.otp),
          otpType: "ChangePassword",
        }).unwrap();
        toast.success("OTP verified successfully", { position: "top-center" });
        setOtpVerified(true);
        setResendOtp(true);
      } catch (error) {
        toast.error(error?.data?.message || "Invalid OTP", {
          position: "top-center",
        });
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (validateNewPassword()) {
      try {
        const res = await changePwd({
          newPassword: formData.newPassword,
          email: user?.email,
        }).unwrap();
        toast.success(res?.message || "Password changed successfully", {
          position: "top-center",
        });
        Cookies.remove("token");
        setFormData({ password: "", newPassword: "", confirmPwd: "", otp: "" });
        setOtpSent(false);
        setOtpVerified(false);
        window.location.href = "/login/";
      } catch (error) {
        toast.error(error?.data?.message || "Failed to change password", {
          position: "top-center",
        });
      }
    }
  };

  // Store profile in localStorage
  if (user?.profile) {
    localStorage.setItem("profile", user.profile);
  } else {
    localStorage.removeItem("profile");
  }

  const readOnlyInputClass =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 bg-gray-50 cursor-not-allowed focus:outline-none";

  const inputClass = (hasError) =>
    `w-full border focus:border-teal-500 focus:ring-2 focus:ring-teal-400 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition bg-white shadow-inner focus:outline-none ${
      hasError ? "border-red-500" : "border-gray-300"
    }`;

  // Status Badge Component
  const StatusBadge = ({ isValid, label }) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isValid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {isValid ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {label || (isValid ? "Verified" : "Not Verified")}
    </span>
  );

  // Calculate displayed values
  const displayedAadhaar = isDecryptingAadhaar
    ? "Decrypting..."
    : maskAadhaar(aadhaarPlain, showAadhaar);

  const displayedPan = isDecryptingPan
    ? "Decrypting..."
    : maskPan(panPlain, showPan);

  return (
    <>
      <div className="bg-[#1d8e85] min-h-screen">
        <div className="max-w-8xl mx-auto p-2 sm:p-4">
          <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
            {/* Left Section */}
            <div className="w-full xl:w-2/3 xl:h-[calc(100vh-2rem)] xl:overflow-y-auto scrollbar-hide">
              <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl p-4 sm:p-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                  <div className="relative flex-shrink-0 group">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 p-1 shadow-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={() =>
                        getProfileImage() && setShowImageModal(true)
                      }
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                        {getProfileImage() ? (
                          <img
                            src={getProfileImage()}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="text-teal-600 w-12 h-12" />
                        )}
                        {/* Hover Overlay */}
                        {getProfileImage() && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Expand className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    {user?.isMiniKycVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-md">
                        <BadgeCheck className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      {user?.name || "User Profile"}
                      {user?.isMiniKycVerified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          MINI-KYC Verified
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {user?.username}
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <UserCheck className="text-teal-600 w-5 h-5" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ""}
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Phone Number
                      </label>
                      <input
                        type="text"
                        value={
                          user?.countryCode
                            ? `+${user.countryCode} ${user.phone}`
                            : user?.phone || ""
                        }
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        value={user?.aadhaarKycData?.date_of_birth || ""}
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Gender
                      </label>
                      <input
                        type="text"
                        value={getGenderDisplay(user?.aadhaarKycData?.gender)}
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Care Of
                      </label>
                      <input
                        type="text"
                        value={user?.aadhaarKycData?.care_of || ""}
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-blue-50 rounded-xl p-4 sm:p-5 mb-4 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <MapPin className="text-teal-600 w-5 h-5" />
                    Address Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Full Address
                      </label>
                      <textarea
                        value={
                          user?.address ||
                          user?.aadhaarKycData?.full_address ||
                          ""
                        }
                        readOnly
                        rows={2}
                        className={`${readOnlyInputClass} resize-none`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        City / District
                      </label>
                      <input
                        type="text"
                        value={
                          user?.city ||
                          user?.aadhaarKycData?.address?.district ||
                          ""
                        }
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        State
                      </label>
                      <input
                        type="text"
                        value={
                          user?.state ||
                          user?.aadhaarKycData?.address?.state ||
                          ""
                        }
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Country
                      </label>
                      <input
                        type="text"
                        value={
                          user?.country ||
                          user?.aadhaarKycData?.address?.country ||
                          ""
                        }
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={user?.aadhaarKycData?.address?.pincode || ""}
                        readOnly
                        className={readOnlyInputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* KYC Information */}
                {(user?.aadhaarNumber || user?.panNumber) && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-5 border border-teal-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                      <Shield className="text-teal-600 w-5 h-5" />
                      Mini - KYC Verification
                      {user?.isMiniKycVerified && (
                        <StatusBadge isValid={true} label="Completed" />
                      )}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Aadhaar Number */}
                      {user?.aadhaarNumber && (
                        <div className="space-y-1">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <CreditCard className="w-3 h-3 text-orange-500" />
                              Aadhaar Number
                            </span>
                            <StatusBadge
                              isValid={user?.aadhaarKycData?.status === "VALID"}
                            />
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={displayedAadhaar}
                              readOnly
                              className={readOnlyInputClass}
                            />
                            <button
                              type="button"
                              onClick={() => setShowAadhaar((v) => !v)}
                              disabled={isDecryptingAadhaar || !aadhaarPlain}
                              className="absolute right-3 top-2.5 text-gray-500 hover:text-teal-600 transition disabled:opacity-50"
                              title={
                                showAadhaar ? "Hide Aadhaar" : "Show Aadhaar"
                              }
                            >
                              {showAadhaar ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* PAN Number */}
                      {user?.panNumber && (
                        <div className="space-y-1">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <CreditCard className="w-3 h-3 text-blue-500" />
                              PAN Number
                            </span>
                            <StatusBadge
                              isValid={
                                String(
                                  user?.panKycData?.status
                                ).toLowerCase() === "valid"
                              }
                            />
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={displayedPan}
                              readOnly
                              className={readOnlyInputClass}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPan((v) => !v)}
                              disabled={isDecryptingPan || !panPlain}
                              className="absolute right-3 top-2.5 text-gray-500 hover:text-teal-600 transition disabled:opacity-50"
                              title={showPan ? "Hide PAN" : "Show PAN"}
                            >
                              {showPan ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Password Change */}
            <div className="w-full xl:w-1/3 xl:sticky xl:top-4 xl:h-fit">
              <div className="bg-white bg-opacity-95 backdrop-blur rounded-2xl shadow-2xl p-4 sm:p-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 text-sm text-amber-900 shadow-sm mb-4">
                  <p className="font-semibold mb-1 text-xs sm:text-sm flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Security Reminder
                  </p>
                  <p className="leading-relaxed text-xs sm:text-sm">
                    Enter your current password before making changes. This
                    helps verify your identity.
                  </p>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <LockKeyhole className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
                  Change Password
                </h3>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Enter your current password"
                        readOnly={otpVerified}
                        className={`${inputClass(errors.password)} pr-10 ${
                          otpVerified ? "opacity-60" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        disabled={otpVerified}
                        className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      OTP *
                    </label>
                    <div className="flex gap-2 sm:gap-3">
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={(e) =>
                          setFormData({ ...formData, otp: e.target.value })
                        }
                        placeholder="Enter 6-digit OTP"
                        disabled={!otpSent || otpVerified}
                        maxLength={6}
                        className={`${inputClass(errors.otp)} flex-1 ${
                          !otpSent || otpVerified
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={
                          (otpSent && !resendOtp) || otpVerified || isOtpSending
                        }
                        className="px-3 sm:px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex-shrink-0"
                      >
                        {isOtpSending
                          ? "Sending..."
                          : otpSent && !resendOtp
                          ? `${Math.floor(timer / 60)}:${
                              timer % 60 < 10 ? `0${timer % 60}` : timer % 60
                            }`
                          : otpSent && resendOtp
                          ? "Resend"
                          : "Get OTP"}
                      </button>
                    </div>
                    {errors.otp && (
                      <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                    )}
                  </div>

                  {!otpVerified && otpSent && (
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifying}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium transition shadow disabled:opacity-50"
                    >
                      {isVerifying ? "Verifying..." : "Verify OTP"}
                    </button>
                  )}

                  {otpVerified && (
                    <div className="space-y-4 pt-2 border-t border-gray-200">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          New Password *
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Enter new password (min 6 characters)"
                          className={inputClass(errors.newPassword)}
                        />
                        {errors.newPassword && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.newPassword}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Confirm New Password *
                        </label>
                        <input
                          type="password"
                          name="confirmPwd"
                          value={formData.confirmPwd}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirmPwd: e.target.value,
                            })
                          }
                          placeholder="Confirm your new password"
                          className={inputClass(errors.confirmPwd)}
                        />
                        {errors.confirmPwd && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.confirmPwd}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2.5 rounded-xl font-semibold transition shadow disabled:opacity-50"
                      >
                        {isLoading ? "Changing..." : "Change Password"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Account Details
                  </h4>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span className="font-medium text-gray-700">
                        {user?.username}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span>Reference ID:</span>
                      <span className="font-medium text-gray-700 text-right break-all max-w-[60%]">
                        {user?.referenceId}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageSrc={getProfileImage()}
        userName={user?.name}
      />
    </>
  );
}
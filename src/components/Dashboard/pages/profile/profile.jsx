// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { toast, ToastContainer } from "react-toastify";
// import {
//   useChangePwdMutation,
//   useChangePwdReqMutation,
//   useVerifyMutation,
// } from "../../../../Authentication/authApiSlice";
// import { MyContext } from '../../../../Authentication/AuthContext';
// import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
// import { useUpdateAddressMutation } from './profileApiSlice';
// import countryCodes from "../../../../Authentication/countryCodes.json"
// const Profile = () => {
//   const { data } = useContext(MyContext);
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
//   const [isToastShown, setIsToastShown] = useState(false);

//   const [type, setType] = useState("password");
//   const [type2, setType2] = useState("password");
//   // const [icon, setIcon] = useState(hide);
//   // const [icon2, setIcon2] = useState(hide);
//   const [type3, setType3] = useState("password");
//   // const [icon3, setIcon3] = useState(hide);
//   const [profileImage, setProfileImage] = useState("");

//   const [otpVerified, setOtpVerified] = useState(false);
//   const { data: userData, error } = useUserDataQuery();

//   console.log(data)
//   const profileRef = useRef(null);


//   const [state, setState] = useState({
//     name: userData?.data?.name || "",
//     _id: userData?.data?._id || "",
//     email: userData?.data?.email || "",
//     phone: userData?.data?.phone || "",
//     // wallet_address: userData?.data?.wallet_address || "",
//     address: userData?.data?.address || "",
//     city: userData?.data?.city || "",
//     country: userData?.data?.country || "",
//     state: userData?.data?.state || "",
//     profile: userData?.data?.profile || "",
//   });
//   useEffect(() => {
//     setState({
//       name: userData?.data?.name || "",
//       _id: userData?.data?._id || "",
//       email: userData?.data?.email || "",
//       phone: userData?.data?.phone || "",
//       // wallet_address: userData?.data?.wallet_address || "",
//       address: userData?.data?.address || "",
//       city: userData?.data?.city || "",
//       country: userData?.data?.country || "",
//       state: userData?.data?.state || "",
//       profile: userData?.data?.profile || "",
//     });
//   }, [userData]);

//   // Initialize form data with user data

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };


//   const validateForm = () => {
//     let formErrors = {};
//     // const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
//     const phoneRegex = /^[0-9]{6,12}$/;

//     if (!state.name.trim()) {
//       formErrors.name = "Name is required";
//     }

//     // if (!state.email) {
//     //   formErrors.email = "Email is required";
//     // } else if (!emailRegex.test(state.email)) {
//     //   formErrors.email = "Invalid email format";
//     // }

//     if (!state.phone.toString().trim()) {
//       formErrors.phone = "Mobile number is required";
//     } else if (!phoneRegex.test(state.phone)) {
//       formErrors.phone = "Invalid mobile number format";
//     }
//     if (!state.address.trim()) {
//       formErrors.address = "Address is required";
//     }
//     // if (!state.wallet_address) {
//     //   formErrors.wallet_address = "Wallet Address is required";
//     // }
//     if (!state.city.trim()) {
//       formErrors.city = "City is required";
//     }
//     if (!state.country.trim()) {
//       formErrors.country = "Country is required";
//     }
//     if (!state.state.trim()) {
//       formErrors.state = "State is required";
//     }

//     // setErrors(formErrors);
//     // return Object.keys(formErrors).length === 0;
//     return formErrors;
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]; // Get the selected file

//     // Check if file exists (user might cancel file selection)
//     if (!file) return;
//     setLoading(true)
//     const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
//     const invalidFile = !acceptedFormats.includes(file.type);
//     if (invalidFile) {

//       toast.warning("Only JPG / PNG files are allowed", {
//         position: "top-center",
//       });
//       profileRef.current.value = "";
//       setLoading(false);
//     } else {
//       const imageUrl = URL.createObjectURL(file);
//       setState((prevState) => ({
//         ...prevState,
//         profile: file,
//       }));
//       setProfileImage(imageUrl); // Set the blob URL for display
//       setLoading(false);
//     }
//   };



//   const triggerFileInput = () => {
//     if (profileRef.current) {
//       profileRef.current.click();
//     }
//   };

//   const currentImage = () => {
//     if (profileImage) {
//       return profileImage;
//     } else if (state.profile) {
//       return state.profile;
//     } else {
//       return "/images/user_logo.png";
//     }
//   };


//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     setErrors(validationErrors);
//     console.log("redirected sucessfully ")

//     if (Object.keys(validationErrors).length === 0) {
//       // Check if data has actually changed
//       const hasChanged =
//         state.name !== userData?.data?.name ||
//         state.address !== userData?.data?.address ||
//         state.city !== userData?.data?.city ||
//         state.state !== userData?.data?.state ||
//         state.country !== userData?.data?.country ||
//         state.profile instanceof File;

//       // If nothing changed, show info toast and exit
//       if (!hasChanged) {
//         toast.info("No changes detected to update", {
//           position: "top-center",
//         });
//         return;
//       }
//       setLoading(true)
//       try {
//         const formData = new FormData();

//         formData.append("name", state.name);
//         formData.append("_id", state._id);
//         // formData.append("email", state.email);
//         // formData.append("phone", state.phone);
//         // formData.append("wallet_address", state.wallet_address);
//         formData.append("address", state.address);
//         formData.append("city", state.city);
//         formData.append("country", state.country);
//         formData.append("state", state.state);

//         // Append profile picture only if it exists
//         if (state.profile instanceof File) {
//           formData.append("profile", state.profile);
//         }

//         // Send FormData using the update function
//         const res = await update(formData);

//         if (res?.data?.status_code == 200) {
//           setIsToastShown(true);

//           if (!isToastShown) {

//             toast.success(res?.data?.message, {
//               position: "top-center",
//             });

//           } else {
//             toast.dismiss();
//             toast.success(res?.data?.message, {
//               position: "top-center",
//             });
//           }
//         }
//       } catch (error) {
//         setIsToastShown(true);
//         if (!isToastShown) {
//           toast.error(error?.message, {
//             position: "top-center",
//           });
//         } else {
//           toast.dismiss();
//           toast.error(error?.message, {
//             position: "top-center",
//           });
//         }
//       }
//       finally {
//         setLoading(false)
//       }
//     }
//   };
//   // const togglePassword = () => {
//   //   if (type === "password") {
//   //     setIcon(show);
//   //     setType("text");
//   //   } else {
//   //     setIcon(hide);
//   //     setType("password");
//   //   }
//   // };

//   // const togglePassword2 = () => {
//   //   if (type2 === "password") {
//   //     setIcon2(show);
//   //     setType2("text");
//   //   } else {
//   //     setIcon2(hide);
//   //     setType2("password");
//   //   }
//   // };

//   // const togglePassword3 = () => {
//   //   if (type3 === "password") {
//   //     setIcon3(show);
//   //     setType3("text");
//   //   } else {
//   //     setIcon3(hide);
//   //     setType3("password");
//   //   }
//   // };

//   // console.log({ state });
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

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

//   const handleVerify = async () => {
//     if (validateOldPassword()) {
//       try {
//         const payload = {
//           password: formData.password,
//         };
//         await changePwdReq(payload).unwrap();
//         setIsToastShown(true);
//         if (!isToastShown) {
//           toast.success(`OTP sent to your email`, {
//             position: "top-center",
//           });
//         } else {
//           toast.dismiss();
//           toast.success(`OTP sent to your email`, {
//             position: "top-center",
//           });
//         }

//         setOtpSent(true);
//         if (resendOtp) {
//           setResendOtp(false);
//           setTimer(120);
//         }
//       } catch (error) {
//         setIsToastShown(true);
//         if (!isToastShown) {
//           toast.error(`${error?.data?.message}`, {
//             position: "top-center",
//           });
//         } else {
//           toast.dismiss();
//           toast.error(`${error?.data?.message}`, {
//             position: "top-center",
//           });
//         }
//       }
//     }
//   };

//   const verifyOtpAndShowNewPasswordFields = async () => {
//     if (validateOtp()) {
//       try {
//         const payload = {
//           email: userData?.data?.email,
//           otp: Number(formData.otp),
//           otpType: "ChangePassword",
//         };
//         await verify(payload).unwrap();

//         setIsToastShown(true);
//         if (!isToastShown) {
//           toast.success(`OTP verified successfully`, {
//             position: "top-center",
//           });
//         } else {
//           toast.dismiss();
//           toast.success(`OTP verified successfully`, {
//             position: "top-center",
//           });
//         }
//         setOtpVerified(true);
//         setResendOtp(true);
//       } catch (error) {
//         setIsToastShown(true);
//         if (!isToastShown) {
//           toast.error(`${error?.data?.message}`, {
//             position: "top-center",
//           });
//         } else {
//           toast.dismiss();
//           toast.error(`${error?.data?.message}`, {
//             position: "top-center",
//           });
//         }
//       }
//     }
//   };

//   const changePassword = async (e) => {
//     e.preventDefault();
//     if (validateNewPassword()) {
//       try {
//         const payload = {
//           newPassword: formData.newPassword,
//           email: userData?.data?.email,
//         };
//         const res = await changePwd(payload).unwrap();
//         toast.success(`${res?.message}`, {
//           position: "top-center",
//         });
//         setFormData({
//           password: "",
//           newPassword: "",
//           confirmPwd: "",
//           otp: "",
//         });
//         setOtpSent(false);
//         setOtpVerified(false);
//       } catch (error) {
//         setIsToastShown(true);
//         if (!isToastShown) {
//           toast.error(`${error?.data?.message}`, {
//             position: "top-center",
//           });
//         } else {
//           toast.dismiss();
//           toast.error(`${error?.data?.message}`, {
//             position: "top-center",
//           });
//         }
//       }
//     }
//   };

//   if (userData?.data?.profile) {
//     localStorage.setItem("profile", userData?.data?.profile);
//   } else {
//     localStorage.removeItem("profile");
//   }


//   return (
//     <div className="min-h-screen bg-[#1d8e85] text-white p-4 flex flex-col items-center">
//       <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">

//         {/* Profile Details Form */}
//         <form onSubmit={handleUpdate} className="md:w-2/3 w-full">
//           <fieldset className="bg-white/10 rounded-lg p-6 space-y-6 border border-white/20">
//             <legend className="text-2xl font-semibold px-2">Profile Details</legend>

//             <div className="flex justify-center items-center gap-12">
//               <div className="w-32">
//                 <label htmlFor="profilePicture" className="block text-sm font-medium mb-2 text-center">Profile Picture *</label>
//                 <div className="border border-white/20 rounded-full bg-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-[#4ecdc4] transition w-32 h-32 mx-auto">
//                   <input
//                     id="profilePicture"
//                     type="file"
//                     name="profilePicture"
//                     ref={profileRef}
//                     accept=".png,.jpg,.jpeg"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                   <label htmlFor="profilePicture" className="flex flex-col items-center justify-center text-white/60 cursor-pointer select-none">
//                     {formData.profilePicture || userData?.data?.profile ? (
//                       <img
//                         src={currentImage()}
//                         alt="Profile"
//                         className="w-28 h-28 rounded-full object-cover"
//                       />
//                     ) : (
//                       <>
//                         <span className="text-5xl mb-1">👤</span>
//                         <span className="text-xs">Upload</span>
//                       </>
//                     )}
//                   </label>
//                 </div>
//               </div>

//               <div className="hidden sm:block text-center sm:text-left p-6 mt-4 border-l-4 border-[#4ecdc4] bg-white/10 rounded-lg shadow-md backdrop-blur-sm">
//                 <p className="text-sm text-white/70">Please provide accurate and up-to-date profile information.</p>
//                 <p className="text-sm text-white/70 mt-1">This helps us communicate with you effectively and ensures smooth access to our services.</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium mb-1 capitalize">Name *</label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={state.name}
//                   onChange={handleChange}
//                   aria-label="Username"
//                   aria-describedby="basic-addon1"
//                   placeholder="Enter your name"
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                     ${errors.name ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}`}
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-xs text-red-400">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-1 capitalize">Email *</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={state.email}
//                   placeholder="Enter your email"
//                   disabled={userData?.data && Object.keys(userData.data).length > 0}
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 border-white/20 ring-[#4ecdc4] ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-xs text-red-400">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="mobile" className="block text-sm font-medium mb-1 capitalize">Mobile Number *</label>
//                 <input
//                   id="mobile"
//                   name="phone"
//                   type="text"
//                   value={state.phone}
//                   aria-label="Username"
//                   aria-describedby="basic-addon1"
//                   placeholder="Enter your mobile number"
//                   disabled={userData?.data && Object.keys(userData.data).length > 0}
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 border-white/20 ring-[#4ecdc4] ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
//                 />
//                 {errors.phone && (
//                   <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="address" className="block text-sm font-medium mb-1 capitalize">Address *</label>
//                 <input
//                   id="address"
//                   name="address"
//                   type="text"
//                   value={state.address}
//                   onChange={handleChange}
//                   aria-label="Username"
//                   aria-describedby="basic-addon1"
//                   placeholder="Enter your address"
//                   autoComplete="off"
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                     ${errors.address ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}`}
//                 />
//                 {errors.address && (
//                   <p className="mt-1 text-xs text-red-400">{errors.address}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium mb-1 capitalize">City *</label>
//                 <input
//                   id="city"
//                   name="city"
//                   type="text"
//                   value={state.city}
//                   onChange={handleChange}
//                   placeholder="Enter your city"
//                   aria-label="Username"
//                   aria-describedby="basic-addon1"
//                   autoComplete="off"
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                     ${errors.city ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}`}
//                 />
//                 {errors.city && (
//                   <p className="mt-1 text-xs text-red-400">{errors.city}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium mb-1 capitalize">State *</label>
//                 <input
//                   id="state"
//                   name="state"
//                   type="text"
//                   value={state.state}
//                   onChange={handleChange}
//                   placeholder="Enter your state"
//                   aria-label="Username"
//                   aria-describedby="basic-addon1"
//                   autoComplete="off"
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                     ${errors.state ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}`}
//                 />
//                 {errors.state && (
//                   <p className="mt-1 text-xs text-red-400">{errors.state}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="country" className="block text-sm font-medium mb-1 capitalize">Country *</label>
//                 <select
//                   id="country"
//                   name="country"
//                   value={state.country}
//                   onChange={handleChange}
//                   disabled={userData?.data && Object.keys(userData.data).length > 0}
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 border-white/20 ring-[#4ecdc4] ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
//                 >
//                   {countryCodes.map(({ country_name }) => (
//                     <option key={country_name} value={country_name}>
//                       {country_name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.country_name && (
//                   <p className="mt-1 text-xs text-red-400">{errors.country_name}</p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   type="submit"
//                   value={loading || updateLoader ?
//                     (userData?.data && Object.keys(userData.data).length > 0 ? "Updating..." : "Creating...") :
//                     (userData?.data && Object.keys(userData.data).length > 0 ? "Update Profile" : "Create Profile")
//                   }
//                   disabled={loading || updateLoader}
//                   className="mt-5 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] flex justify-center text-white font-semibold px-6 py-3 rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition w-full max-w-xs mx-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           </fieldset>
//         </form>


//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         {/* Change Password Form */}
//         <form className="md:w-1/3 w-full">
//           <fieldset className="bg-white/10 rounded-lg p-6 space-y-6 border border-white/20">
//             <legend className="text-2xl font-semibold px-2">Change Password</legend>
//             <p className="text-sm text-white/70 mb-4">Enter your current password and OTP to change your password securely.</p>

//             <div>
//               <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">Current Password *</label>
//               <div className="relative">
//                 <input
//                   id="currentPassword"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   placeholder="Enter current password"
//                   readOnly={otpVerified}
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 pr-10 focus:outline-none focus:ring-2
//                     ${errors.password ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}
//                     ${otpVerified ? 'opacity-60' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePassword}
//                   disabled={otpVerified}
//                   className="absolute right-3 top-2.5 text-white/60 hover:text-[#4ecdc4] disabled:opacity-50"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? '🙈' : '👁️'}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-xs text-red-400">{errors.password}</p>
//               )}
//             </div>

//             <div className="flex gap-3 items-center">
//               <div className="flex-grow">
//                 <label htmlFor="otp" className="block text-sm font-medium mb-1">OTP *</label>
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   value={formData.otp}
//                   onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
//                   placeholder="Enter OTP"
//                   readOnly={otpVerified}
//                   className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                     ${errors.OTP ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}
//                     ${otpVerified ? 'opacity-60' : ''}`}
//                 />
//                 {errors.OTP && (
//                   <p className="mt-1 text-xs text-red-400">{errors.OTP}</p>
//                 )}
//               </div>
//               {!otpVerified && (
//                 <button
//                   type="button"
//                   onClick={handleVerify}
//                   disabled={otpSent && !resendOtp}
//                   className="h-10 mt-5 px-5 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white rounded-full font-semibold hover:from-[#0a5c64] hover:to-[#5dd5cd] transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isOtpSending
//                     ? "Sending..."
//                     : otpSent && !resendOtp
//                       ? `Resend in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
//                       : otpSent && resendOtp
//                         ? "Resend OTP"
//                         : "Get OTP"}
//                 </button>
//               )}
//             </div>

//             {!otpVerified && (
//               <button
//                 type="button"
//                 onClick={verifyOtpAndShowNewPasswordFields}
//                 disabled={isVerifying}
//                 className="w-full mt-4 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold px-6 py-3 rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isVerifying ? "Verifying..." : "Verify OTP"}
//               </button>
//             )}

//             {otpVerified && (
//               <>
//                 <div className="flex-grow">
//                   <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password *</label>
//                   <input
//                     id="newPassword"
//                     name="newPassword"
//                     type="password"
//                     value={formData.newPassword}
//                     onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                     placeholder="Enter new password"
//                     className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                       ${errors.newPassword ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}`}
//                   />
//                   {errors.newPassword && (
//                     <p className="mt-1 text-xs text-red-400">{errors.newPassword}</p>
//                   )}
//                 </div>

//                 <div className="flex-grow">
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password *</label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPwd"
//                     type="password"
//                     value={formData.confirmPwd}
//                     onChange={(e) => setFormData({ ...formData, confirmPwd: e.target.value })}
//                     placeholder="Confirm new password"
//                     className={`w-full px-3 py-2 rounded border bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2
//                       ${errors.confirmPwd ? 'border-red-500 ring-red-500' : 'border-white/20 ring-[#4ecdc4]'}`}
//                   />
//                   {errors.confirmPwd && (
//                     <p className="mt-1 text-xs text-red-400">{errors.confirmPwd}</p>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={changePassword}
//                   disabled={isLoading}
//                   className="w-full mt-4 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold px-6 py-3 rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? "Changing..." : "Change Password"}
//                 </button>
//               </>
//             )}
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;






import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import {
  useChangePwdMutation,
  useChangePwdReqMutation,
  useVerifyMutation,
} from "../../../../Authentication/authApiSlice";
import { MyContext } from '../../../../Authentication/AuthContext';
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import { useUpdateAddressMutation } from './profileApiSlice';
import countryCodes from "../../../../Authentication/countryCodes.json"

const Profile = () => {
  const { data } = useContext(MyContext);
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
  const [update, { isLoading: updateLoader }] = useUpdateAddressMutation();
  const [loading, setLoading] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  
  const { data: userData, error } = useUserDataQuery();
  const profileRef = useRef(null);

  const [state, setState] = useState({
    name: userData?.data?.name || "",
    _id: userData?.data?._id || "",
    email: userData?.data?.email || "",
    phone: userData?.data?.phone || "",
    address: userData?.data?.address || "",
    city: userData?.data?.city || "",
    country: userData?.data?.country || "",
    state: userData?.data?.state || "",
    profile: userData?.data?.profile || "",
    gender: userData?.data?.gender || "human", // Default to human
  });

  useEffect(() => {
    setState({
      name: userData?.data?.name || "",
      _id: userData?.data?._id || "",
      email: userData?.data?.email || "",
      phone: userData?.data?.phone || "",
      address: userData?.data?.address || "",
      city: userData?.data?.city || "",
      country: userData?.data?.country || "",
      state: userData?.data?.state || "",
      profile: userData?.data?.profile || "",
      gender: userData?.data?.gender || "human",
    });
  }, [userData]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formErrors = {};
    const phoneRegex = /^[0-9]{6,12}$/;

    if (!state.name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!state.phone.toString().trim()) {
      formErrors.phone = "Mobile number is required";
    } else if (!phoneRegex.test(state.phone)) {
      formErrors.phone = "Invalid mobile number format";
    }
    if (!state.address.trim()) {
      formErrors.address = "Address is required";
    }
    if (!state.city.trim()) {
      formErrors.city = "City is required";
    }
    if (!state.country.trim()) {
      formErrors.country = "Country is required";
    }
    if (!state.state.trim()) {
      formErrors.state = "State is required";
    }

    return formErrors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setLoading(true);
    
    const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFile = !acceptedFormats.includes(file.type);
    
    if (invalidFile) {
      toast.warning("Only JPG / PNG files are allowed", {
        position: "top-center",
      });
      profileRef.current.value = "";
      setLoading(false);
    } else {
      const imageUrl = URL.createObjectURL(file);
      setState((prevState) => ({
        ...prevState,
        profile: file,
      }));
      setProfileImage(imageUrl);
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const getDefaultAvatar = () => {
    if (state.gender === "male") {
      return "👨";
    } else if (state.gender === "female") {
      return "👩";
    } else {
      return "🧑";
    }
  };

  const currentImage = () => {
    if (profileImage) {
      return profileImage;
    } else if (state.profile && typeof state.profile === 'string') {
      return state.profile;
    } else {
      return null; // Will show avatar emoji instead
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const hasChanged =
        state.name !== userData?.data?.name ||
        state.address !== userData?.data?.address ||
        state.city !== userData?.data?.city ||
        state.state !== userData?.data?.state ||
        state.country !== userData?.data?.country ||
        state.gender !== userData?.data?.gender ||
        state.profile instanceof File;

      if (!hasChanged) {
        toast.info("No changes detected to update", {
          position: "top-center",
        });
        return;
      }
      
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("_id", state._id);
        formData.append("address", state.address);
        formData.append("city", state.city);
        formData.append("country", state.country);
        formData.append("state", state.state);
        formData.append("gender", state.gender);

        if (state.profile instanceof File) {
          formData.append("profile", state.profile);
        }

        const res = await update(formData);

        if (res?.data?.status_code == 200) {
          setIsToastShown(true);
          if (!isToastShown) {
            toast.success(res?.data?.message, {
              position: "top-center",
            });
          } else {
            toast.dismiss();
            toast.success(res?.data?.message, {
              position: "top-center",
            });
          }
        }
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(error?.message, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error(error?.message, {
            position: "top-center",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    } else if (formData.otp.length < 4) {
      formErrors.otp = "OTP must be 4 Numbers";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleVerify = async () => {
    if (validateOldPassword()) {
      try {
        const payload = {
          password: formData.password,
        };
        await changePwdReq(payload).unwrap();
        setIsToastShown(true);
        if (!isToastShown) {
          toast.success(`OTP sent to your email`, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.success(`OTP sent to your email`, {
            position: "top-center",
          });
        }

        setOtpSent(true);
        if (resendOtp) {
          setResendOtp(false);
          setTimer(120);
        }
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      }
    }
  };

  const verifyOtpAndShowNewPasswordFields = async () => {
    if (validateOtp()) {
      try {
        const payload = {
          email: userData?.data?.email,
          otp: Number(formData.otp),
          otpType: "ChangePassword",
        };
        await verify(payload).unwrap();

        setIsToastShown(true);
        if (!isToastShown) {
          toast.success(`OTP verified successfully`, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.success(`OTP verified successfully`, {
            position: "top-center",
          });
        }
        setOtpVerified(true);
        setResendOtp(true);
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      }
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (validateNewPassword()) {
      try {
        const payload = {
          newPassword: formData.newPassword,
          email: userData?.data?.email,
        };
        const res = await changePwd(payload).unwrap();
        toast.success(`${res?.message}`, {
          position: "top-center",
        });
        setFormData({
          password: "",
          newPassword: "",
          confirmPwd: "",
          otp: "",
        });
        setOtpSent(false);
        setOtpVerified(false);
      } catch (error) {
        setIsToastShown(true);
        if (!isToastShown) {
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error(`${error?.data?.message}`, {
            position: "top-center",
          });
        }
      }
    }
  };

  if (userData?.data?.profile) {
    localStorage.setItem("profile", userData?.data?.profile);
  } else {
    localStorage.removeItem("profile");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d7f79] via-[#0a6962] to-[#085c56] text-white overflow-hidden relative">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d7f79]/20 via-[#0a6962]/40 to-black/80"></div>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div> */}
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Details Form */}
            <div className="xl:col-span-2">
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-white to-[#0d7f79] bg-clip-text text-transparent">
                    Profile Details
                  </h2>

                  {/* Avatar Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8 mb-8">
                    <div className="relative group">
                      <div 
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#0d7f79] to-white p-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0d7f79]/50"
                        onClick={triggerFileInput}
                        onMouseEnter={() => setAvatarHover(true)}
                        onMouseLeave={() => setAvatarHover(false)}
                      >
                        <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
                          {currentImage() ? (
                            <img
                              src={currentImage()}
                              alt="Profile"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-4xl sm:text-5xl">{getDefaultAvatar()}</span>
                          )}
                          
                          {/* Hover Overlay */}
                          <div className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="text-white text-xs sm:text-sm font-medium">Change</span>
                          </div>
                        </div>
                      </div>
                      
                      <input
                        type="file"
                        ref={profileRef}
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>

                    {/* Gender Selection */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <label className="text-sm font-medium text-gray-300">Avatar Style:</label>
                      <div className="flex gap-2">
                        {[
                          { value: 'male', label: '👨 Male', emoji: '👨' },
                          { value: 'female', label: '👩 Female', emoji: '👩' },
                          { value: 'human', label: '🧑 Human', emoji: '🧑' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setState(prev => ({ ...prev, gender: option.value }))}
                            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                              state.gender === option.value
                                ? 'bg-gradient-to-r from-[#0d7f79] to-white text-[#0d7f79] shadow-lg'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {option.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-gradient-to-r from-[#0d7f79]/10 to-white/10 border border-[#0d7f79]/20 rounded-xl p-4 mb-8">
                    <p className="text-sm text-gray-300 text-center">
                      <span className="font-semibold text-[#0d7f79]">💡 Pro Tip:</span> Keep your profile information up-to-date for better communication and service experience.
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={state.email}
                        placeholder="Enter your email"
                        disabled={userData?.data && Object.keys(userData.data).length > 0}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79] ${
                          userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">
                        Mobile Number *
                      </label>
                      <input
                        id="mobile"
                        name="phone"
                        type="text"
                        value={state.phone}
                        placeholder="Enter your mobile number"
                        disabled={userData?.data && Object.keys(userData.data).length > 0}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79] ${
                          userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                        Address *
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={state.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.address ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-400 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={state.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.city ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-300">
                        State *
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={state.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.state ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                        }`}
                      />
                      {errors.state && (
                        <p className="text-red-400 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-300">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={state.country}
                        onChange={handleChange}
                        disabled={userData?.data && Object.keys(userData.data).length > 0}
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white focus:outline-none focus:ring-2 transition-all duration-200 border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79] ${
                          userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select Country</option>
                        {countryCodes?.map(({ country_name }) => (
                          <option 
                            key={country_name} 
                            value={country_name}
                            className="bg-slate-800"
                          >
                            {country_name}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-400 text-xs mt-1">{errors.country}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2 pt-4">
                      <button
                        type="submit"
                        disabled={loading || updateLoader}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0d7f79] to-white text-[#0d7f79] font-semibold rounded-xl hover:from-[#0a6962] hover:to-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-[#0d7f79]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading || updateLoader ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            {userData?.data && Object.keys(userData.data).length > 0 ? "Updating..." : "Creating..."}
                          </span>
                        ) : (
                          userData?.data && Object.keys(userData.data).length > 0 ? "Update Profile" : "Create Profile"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="xl:col-span-1">
              <form className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                  <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white to-[#0d7f79] bg-clip-text text-transparent">
                    Change Password
                  </h2>
                  
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-300 text-center">
                      <span className="font-semibold text-[#0d7f79]">🔒 Security:</span> Enter your current password and verify with OTP to change your password securely.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                        Current Password *
                      </label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter current password"
                          readOnly={otpVerified}
                          className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                          } ${otpVerified ? 'opacity-50' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={togglePassword}
                          disabled={otpVerified}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0d7f79] transition-colors duration-200 disabled:opacity-50"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                        OTP Verification *
                      </label>
                      <div className="flex gap-3">
                        <input
                          id="otp"
                          name="otp"
                          type="text"
                          value={formData.otp}
                          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                          placeholder="Enter OTP"
                          readOnly={otpVerified}
                          className={`flex-1 px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                          } ${otpVerified ? 'opacity-50' : ''}`}
                        />
                        {!otpVerified && (
                          <button
                            type="button"
                            onClick={handleVerify}
                            disabled={otpSent && !resendOtp}
                            className="px-4 py-3 bg-gradient-to-r from-[#0d7f79] to-white text-[#0d7f79] rounded-xl font-medium hover:from-[#0a6962] hover:to-gray-100 transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            {isOtpSending
                              ? "Sending..."
                              : otpSent && !resendOtp
                                ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
                                : otpSent && resendOtp
                                  ? "Resend"
                                  : "Get OTP"}
                          </button>
                        )}
                      </div>
                      {errors.otp && (
                        <p className="text-red-400 text-xs mt-1">{errors.otp}</p>
                      )}
                    </div>

                    {!otpVerified && (
                      <button
                        type="button"
                        onClick={verifyOtpAndShowNewPasswordFields}
                        disabled={isVerifying}
                        className="w-full py-3 bg-gradient-to-r from-[#0d7f79] to-white text-[#0d7f79] font-semibold rounded-xl hover:from-[#0a6962] hover:to-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-[#0d7f79]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isVerifying ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Verifying...
                          </span>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>
                    )}

                    {otpVerified && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="space-y-2">
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                            New Password *
                          </label>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                              errors.newPassword ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                            }`}
                          />
                          {errors.newPassword && (
                            <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                            Confirm Password *
                          </label>
                          <input
                            id="confirmPassword"
                            name="confirmPwd"
                            type="password"
                            value={formData.confirmPwd}
                            onChange={(e) => setFormData({ ...formData, confirmPwd: e.target.value })}
                            placeholder="Confirm new password"
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                              errors.confirmPwd ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-[#0d7f79] focus:border-[#0d7f79]'
                            }`}
                          />
                          {errors.confirmPwd && (
                            <p className="text-red-400 text-xs mt-1">{errors.confirmPwd}</p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={changePassword}
                          disabled={isLoading}
                          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                              </svg>
                              Changing...
                            </span>
                          ) : (
                            "Change Password"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      />
    </div>
  );
};

export default Profile;


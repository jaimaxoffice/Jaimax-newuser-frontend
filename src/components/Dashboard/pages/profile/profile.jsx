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










// import React, { useState, useEffect, useRef, useContext } from "react";
// import { LockKeyhole, UserRound, User, Mail, Phone, Home, MapPin } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   useChangePwdMutation,
//   useChangePwdReqMutation,
//   useVerifyMutation,
// } from "../../../../Authentication/authApiSlice";
// import { MyContext } from '../../../../Authentication/AuthContext';
// import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
// import { useUpdateAddressMutation } from './profileApiSlice';
// import countryCodes from "../../../../Authentication/countryCodes.json";

// export default function Profile3DForm() {
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
//   const [profileImage, setProfileImage] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [avatarHover, setAvatarHover] = useState(false);

//   const { data: userData, error } = useUserDataQuery();
//   const profileRef = useRef(null);

//   const [state, setState] = useState({
//     name: userData?.data?.name || "",
//     _id: userData?.data?._id || "",
//     email: userData?.data?.email || "",
//     phone: userData?.data?.phone || "",
//     address: userData?.data?.address || "",
//     city: userData?.data?.city || "",
//     country: userData?.data?.country || "",
//     state: userData?.data?.state || "",
//     profile: userData?.data?.profile || "",
//     gender: userData?.data?.gender || "human",
//   });

//   useEffect(() => {
//     setState({
//       name: userData?.data?.name || "",
//       _id: userData?.data?._id || "",
//       email: userData?.data?.email || "",
//       phone: userData?.data?.phone || "",
//       address: userData?.data?.address || "",
//       city: userData?.data?.city || "",
//       country: userData?.data?.country || "",
//       state: userData?.data?.state || "",
//       profile: userData?.data?.profile || "",
//       gender: userData?.data?.gender || "human",
//     });
//   }, [userData]);

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

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     const phoneRegex = /^[0-9]{6,12}$/;

//     if (!state.name.trim()) {
//       formErrors.name = "Name is required";
//     }

//     if (!state.phone.toString().trim()) {
//       formErrors.phone = "Mobile number is required";
//     } else if (!phoneRegex.test(state.phone)) {
//       formErrors.phone = "Invalid mobile number format";
//     }
//     if (!state.address.trim()) {
//       formErrors.address = "Address is required";
//     }
//     if (!state.city.trim()) {
//       formErrors.city = "City is required";
//     }
//     if (!state.country.trim()) {
//       formErrors.country = "Country is required";
//     }
//     if (!state.state.trim()) {
//       formErrors.state = "State is required";
//     }

//     return formErrors;
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;
//     setLoading(true);

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
//       setProfileImage(imageUrl);
//       setLoading(false);
//     }
//   };

//   const getDefaultAvatar = () => {
//     if (state.gender === "male") {
//       return "👤";
//     } else if (state.gender === "female") {
//       return "👤";
//     } else {
//       return "👤";
//     }
//   };

//   const currentImage = () => {
//     if (profileImage) {
//       return profileImage;
//     } else if (state.profile && typeof state.profile === 'string') {
//       return state.profile;
//     } else {
//       return null;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       const hasChanged =
//         state.name !== userData?.data?.name ||
//         state.address !== userData?.data?.address ||
//         state.city !== userData?.data?.city ||
//         state.state !== userData?.data?.state ||
//         state.country !== userData?.data?.country ||
//         state.gender !== userData?.data?.gender ||
//         state.profile instanceof File;

//       if (!hasChanged) {
//         toast.info("No changes detected to update", {
//           position: "top-center",
//         });
//         return;
//       }

//       setLoading(true);
//       try {
//         const formData = new FormData();
//         formData.append("name", state.name);
//         formData.append("_id", state._id);
//         formData.append("address", state.address);
//         formData.append("city", state.city);
//         formData.append("country", state.country);
//         formData.append("state", state.state);
//         formData.append("gender", state.gender);

//         if (state.profile instanceof File) {
//           formData.append("profile", state.profile);
//         }

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
//       } finally {
//         setLoading(false);
//       }
//     }
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

//   const handleSendOtp = async () => {
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

//   const handleVerifyOtp = async () => {
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

//   const handleChangePassword = async (e) => {
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

//   const inputClass = (hasError) =>
//     `w-full border focus:border-teal-500 focus:ring-2 focus:ring-teal-400 rounded-xl px-4 py-2 text-sm text-gray-800 placeholder-gray-400 transition bg-white bg-opacity-90 shadow-inner backdrop-blur ${hasError ? 'border-red-500' : 'border-gray-300'
//     }`;

//   return (
//     <div className="bg-[#1d8e85] flex items-center justify-center px-2 py-3 min-h-screen">
//       <div className="w-full max-w-8xl bg-white bg-opacity-90 backdrop-blur rounded-3xl shadow-2xl p-8">
//         <div className="flex flex-col md:flex-row gap-10">
//           {/* Profile Form */}
//           <div className="w-full md:w-2/3 space-y-6">
//             <div className="flex items-center gap-4">
//               {/* Profile Image with Gender Avatar */}
//               <div className="relative group">
//                 <div
//                   className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-600 to-white p-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/50"
//                   onClick={() => profileRef.current?.click()}
//                   onMouseEnter={() => setAvatarHover(true)}
//                   onMouseLeave={() => setAvatarHover(false)}
//                 >
//                   <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
//                     {currentImage() ? (
//                       <img
//                         src={currentImage()}
//                         alt="Profile"
//                         className="w-full h-full object-cover rounded-full"
//                       />
//                     ) : (
//                       <span className="text-4xl">{getDefaultAvatar()}</span>
//                     )}

//                     {/* Hover Overlay */}
//                     <div className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? 'opacity-100' : 'opacity-0'}`}>
//                       <span className="text-white text-xs font-medium">Change</span>
//                     </div>
//                   </div>
//                 </div>

//                 <input
//                   type="file"
//                   ref={profileRef}
//                   accept=".png,.jpg,.jpeg"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                   Profile Information
//                 </h2>
//                 <p className="text-sm text-gray-500">Update your details below</p>


//                 <p className="mt-2 text-sm leading-6 text-gray-700">
//                   <span className="font-semibold text-[#0d7f79]"> Pro Tip:</span>{" "}
//                   Keep your profile information up-to-date for better communication
//                   and service experience.
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleProfileSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">

//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">

//                     Full Name *
//                   </label>
//                   <input
//                     id="name"
//                     type="text"
//                     name="name"
//                     value={state.name}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     className={inputClass(errors.name)}
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email Address *
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={state.email}
//                     placeholder="Enter your email address"
//                     disabled={userData?.data && Object.keys(userData.data).length > 0}
//                     className={`${inputClass(errors.email)} ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                     Phone Number *
//                   </label>
//                   <input
//                     id="phone"
//                     type="text"
//                     name="phone"
//                     value={state.phone}
//                     placeholder="Enter your phone number"
//                     disabled={userData?.data && Object.keys(userData.data).length > 0}
//                     className={`${inputClass(errors.phone)} ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
//                   />
//                   {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                     Address *
//                   </label>
//                   <input
//                     id="address"
//                     type="text"
//                     name="address"
//                     value={state.address}
//                     onChange={handleChange}
//                     placeholder="Enter your address"
//                     className={inputClass(errors.address)}
//                   />
//                   {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                     City *
//                   </label>
//                   <input
//                     id="city"
//                     type="text"
//                     name="city"
//                     value={state.city}
//                     onChange={handleChange}
//                     placeholder="Enter your city"
//                     className={inputClass(errors.city)}
//                   />
//                   {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//                 </div>

//                 <div className="space-y-1">
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                     State *
//                   </label>
//                   <input
//                     id="state"
//                     type="text"
//                     name="state"
//                     value={state.state}
//                     onChange={handleChange}
//                     placeholder="Enter your state"
//                     className={inputClass(errors.state)}
//                   />
//                   {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//                 </div>

//                 <div className="space-y-1 md:col-span-1">
//                   <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                     Country *
//                   </label>
//                   <select
//                     id="country"
//                     name="country"
//                     value={state.country}
//                     onChange={handleChange}
//                     disabled={userData?.data && Object.keys(userData.data).length > 0}
//                     className={`${inputClass(errors.country)} ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
//                   >
//                     <option value="">Select Country</option>
//                     {countryCodes?.map(({ country_name }) => (
//                       <option key={country_name} value={country_name}>
//                         {country_name}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading || updateLoader}
//                 className={`w-full mt-6 py-2 rounded-full font-semibold transition shadow-md ${loading || updateLoader
//                   ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//                   : 'bg-teal-600 hover:bg-teal-700 text-white'
//                   }`}
//               >
//                 {loading || updateLoader ?
//                   (userData?.data && Object.keys(userData.data).length > 0 ? "Updating..." : "Creating...") :
//                   (userData?.data && Object.keys(userData.data).length > 0 ? "Update Profile" : "Create Profile")
//                 }
//               </button>
//             </form>
//           </div>

//           {/* Password Section */}
//           {/* <div className="w-full md:w-1/3 space-y-6 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <LockKeyhole className="text-teal-600" />
//               Change Password
//             </h3>

//             {!otpSent && (
//               <div className="flex flex-col gap-4">
//                 <div className="space-y-1">
//                   <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
//                     Current Password *
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="currentPassword"
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       value={formData.password}
//                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                       placeholder="Enter your current password"
//                       readOnly={otpVerified}
//                       className={`${inputClass(errors.password)} pr-10 ${otpVerified ? 'opacity-60' : ''}`}
//                     />
//                     <button
//                       type="button"
//                       onClick={togglePassword}
//                       disabled={otpVerified}
//                       className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
//                       aria-label={showPassword ? 'Hide password' : 'Show password'}
//                     >
//                       {showPassword ? '🙈' : '👁️'}
//                     </button>
//                   </div>
//                   {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//                 </div>
                
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition shadow"
//                 >
//                   Send OTP
//                 </button>
//               </div>
//             )}

//             {otpSent && !otpVerified && (
//               <div className="flex flex-col gap-4">
//                 <div className="space-y-1">
//                   <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                     OTP Verification *
//                   </label>
//                   <div className="flex gap-3">
//                     <input
//                       id="otp"
//                       type="text"
//                       name="otp"
//                       value={formData.otp}
//                       onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
//                       placeholder="Enter 4-digit OTP"
//                       className={inputClass(errors.otp)}
//                     />
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       disabled={otpSent && !resendOtp}
//                       className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                     >
//                       {isOtpSending
//                         ? "Sending..."
//                         : otpSent && !resendOtp
//                           ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
//                           : otpSent && resendOtp
//                             ? "Resend"
//                             : "Get OTP"}
//                     </button>
//                   </div>
//                   {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
//                 </div>
                
//                 <button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   disabled={isVerifying}
//                   className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium transition shadow disabled:opacity-50"
//                 >
//                   {isVerifying ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </div>
//             )}

//             {otpVerified && (
//               <div className="flex flex-col gap-4">
//                 <div className="space-y-1">
//                   <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                     New Password *
//                   </label>
//                   <input
//                     id="newPassword"
//                     type="password"
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                     placeholder="Enter new password (min 6 characters)"
//                     className={inputClass(errors.newPassword)}
//                   />
//                   {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
//                 </div>
                
//                 <div className="space-y-1">
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm New Password *
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     type="password"
//                     name="confirmPwd"
//                     value={formData.confirmPwd}
//                     onChange={(e) => setFormData({ ...formData, confirmPwd: e.target.value })}
//                     placeholder="Confirm your new password"
//                     className={inputClass(errors.confirmPwd)}
//                   />
//                   {errors.confirmPwd && <p className="text-red-500 text-xs mt-1">{errors.confirmPwd}</p>}
//                 </div>
                
//                 <button
//                   type="button"
//                   onClick={handleChangePassword}
//                   disabled={isLoading}
//                   className="bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-xl font-semibold transition shadow disabled:opacity-50"
//                 >
//                   {isLoading ? "Changing..." : "Change Password"}
//                 </button>
//               </div>
//             )}
//           </div> */}
//           <div className="w-full md:w-1/3 space-y-6 border-t md:border-t-0 md:border-l md:pt-0 md:pl-6">
//             <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-teal-900 shadow-sm">
//               <p className="font-semibold mb-1">Security Reminder</p>
//               <p className="leading-relaxed text-sm">
//                 <span className=" text-teal-700 text-sm">enter your current password</span> before making any changes to your password.
//                 This helps us verify that it's really you and keeps your information safe.
//               </p>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <LockKeyhole className="text-teal-600" />
//               Change Password
//             </h3>

//             <div className="flex flex-col gap-4">
//               {/* Current Password */}
//               <div className="space-y-1">
//                 <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
//                   Current Password *
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="currentPassword"
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     placeholder="Enter your current password"
//                     readOnly={otpVerified}
//                     className={`${inputClass(errors.password)} pr-10 ${otpVerified ? 'opacity-60' : ''}`}
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePassword}
//                     disabled={otpVerified}
//                     className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                     {showPassword ? '🙈' : '👁️'}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//               </div>

//               {/* OTP Input Always Shown */}
//               <div className="space-y-1">
//                 <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                   OTP *
//                 </label>
//                 <div className="flex gap-3">
//                   <input
//                     id="otp"
//                     type="text"
//                     name="otp"
//                     value={formData.otp}
//                     onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
//                     placeholder="Enter 4-digit OTP"
//                     disabled={!otpSent}
//                     className={`${inputClass(errors.otp)} ${!otpSent ? 'opacity-60 cursor-not-allowed' : ''}`}
//                   />
//                   <button
//                     type="button"
//                     onClick={handleSendOtp}
//                     disabled={otpSent && !resendOtp}
//                     className="px-4 py-2 bg-[#1d8e85]  text-white rounded-full font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                   >
//                     {isOtpSending
//                       ? "Sending..."
//                       : otpSent && !resendOtp
//                         ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
//                         : otpSent && resendOtp
//                           ? "Resend"
//                           : "Get OTP"}
//                   </button>
//                 </div>
//                 {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
//               </div>

//               {/* Verify OTP Button */}
//               {!otpVerified && otpSent && (
//                 <button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   disabled={isVerifying}
//                   className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium transition shadow disabled:opacity-50"
//                 >
//                   {isVerifying ? "Verifying..." : "Verify OTP"}
//                 </button>
//               )}

//               {/* Password Change Fields */}
//               {otpVerified && (
//                 <>
//                   <div className="space-y-1">
//                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                       New Password *
//                     </label>
//                     <input
//                       id="newPassword"
//                       type="password"
//                       name="newPassword"
//                       value={formData.newPassword}
//                       onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                       placeholder="Enter new password (min 6 characters)"
//                       className={inputClass(errors.newPassword)}
//                     />
//                     {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
//                   </div>

//                   <div className="space-y-1">
//                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                       Confirm New Password *
//                     </label>
//                     <input
//                       id="confirmPassword"
//                       type="password"
//                       name="confirmPwd"
//                       value={formData.confirmPwd}
//                       onChange={(e) => setFormData({ ...formData, confirmPwd: e.target.value })}
//                       placeholder="Confirm your new password"
//                       className={inputClass(errors.confirmPwd)}
//                     />
//                     {errors.confirmPwd && <p className="text-red-500 text-xs mt-1">{errors.confirmPwd}</p>}
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleChangePassword}
//                     disabled={isLoading}
//                     className="bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-xl font-semibold transition shadow disabled:opacity-50"
//                   >
//                     {isLoading ? "Changing..." : "Change Password"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </div>
//   );
// }



import React, { useState, useEffect, useRef, useContext } from "react";
import { LockKeyhole, UserRound, User, Mail, Phone, Home, MapPin } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useChangePwdMutation,
  useChangePwdReqMutation,
  useVerifyMutation,
} from "../../../../Authentication/authApiSlice";
// import { MyContext } from '../../../../Authentication/AuthContext';
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import { useUpdateAddressMutation } from './profileApiSlice';
import countryCodes from "../../../../Authentication/countryCodes.json";

export default function Profile3DForm() {
  // const { data } = useContext(MyContext);
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
    gender: userData?.data?.gender || "human",
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // const validateForm = () => {
  //   let formErrors = {};
  //   const phoneRegex = /^[0-9]{6,12}$/;

  //   if (!state.name.trim()) {
  //     formErrors.name = "Name is required";
  //   }

  //   if (!state.phone.toString().trim()) {
  //     formErrors.phone = "Mobile number is required";
  //   } else if (!phoneRegex.test(state.phone)) {
  //     formErrors.phone = "Invalid mobile number format";
  //   }
  //   if (!state.address.trim()) {
  //     formErrors.address = "Address is required";
  //   }
  //   if (!state.city.trim()) {
  //     formErrors.city = "City is required";
  //   }
  //   if (!state.country.trim()) {
  //     formErrors.country = "Country is required";
  //   }
  //   if (!state.state.trim()) {
  //     formErrors.state = "State is required";
  //   }

  //   return formErrors;
  // };
const validateForm = () => {
  let formErrors = {};

  // Regex for common phone number patterns (flexible, but consider libphonenumber for global)
  // This regex allows for optional leading +, digits, spaces, hyphens, and parentheses.
  // It's still a simplified approach compared to a dedicated library.
  const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/; // Adjusted min length and added allowed characters

  // Regex for names (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;

  // Regex for addresses (alphanumeric, spaces, common punctuation like #, -, , .)
  const addressRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])?[a-zA-Z0-9\s.,'#-]+$/;

  // --- Name Validation ---
  if (!state.name.trim()) {
    formErrors.name = "Name is required.";
  } else if (state.name.trim().length < 2) {
    formErrors.name = "Name must be at least 2 characters long.";
  } else if (state.name.trim().length > 50) {
    formErrors.name = "Name cannot exceed 50 characters.";
  } else if (!nameRegex.test(state.name.trim())) {
    formErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes.";
  }

  // --- Phone Validation ---
  if (!state.phone) { // Check for null, undefined, or empty string
    formErrors.phone = "Mobile number is required.";
  } else if (typeof state.phone !== 'string' && typeof state.phone !== 'number') {
    formErrors.phone = "Invalid mobile number format."; // Ensure it's a string or number
  } else if (!String(state.phone).trim()) { // Convert to string for trim()
    formErrors.phone = "Mobile number is required.";
  } else if (!phoneRegex.test(String(state.phone))) {
    formErrors.phone = "Invalid mobile number format. Please enter 7-20 digits, optionally with +, spaces, -, or ().";
  }

  // --- Address Validation ---
  if (!state.address.trim()) {
    formErrors.address = "Address is required.";
  } else if (state.address.trim().length < 5) {
    formErrors.address = "Address must be at least 5 characters long.";
  } else if (state.address.trim().length > 100) {
    formErrors.address = "Address cannot exceed 100 characters.";
  } else if (!addressRegex.test(state.address.trim())) {
    formErrors.address = "Address contains invalid characters.";
  }

  // --- City Validation ---
  if (!state.city.trim()) {
    formErrors.city = "City is required.";
  } else if (state.city.trim().length < 2) {
    formErrors.city = "City must be at least 2 characters long.";
  } else if (state.city.trim().length > 50) {
    formErrors.city = "City cannot exceed 50 characters.";
  } else if (!/^[a-zA-Z\s-]+$/.test(state.city.trim())) { // Only letters, spaces, hyphens
    formErrors.city = "City can only contain letters, spaces, and hyphens.";
  }

  // --- State Validation ---
  if (!state.state.trim()) {
    formErrors.state = "State is required.";
  } else if (state.state.trim().length < 2) {
    formErrors.state = "State must be at least 2 characters long.";
  } else if (state.state.trim().length > 50) {
    formErrors.state = "State cannot exceed 50 characters.";
  } else if (!/^[a-zA-Z\s-]+$/.test(state.state.trim())) { // Only letters, spaces, hyphens
    formErrors.state = "State can only contain letters, spaces, and hyphens.";
  }

  // --- Country Validation ---
  if (!state.country.trim()) {
    formErrors.country = "Country is required.";
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

  const getDefaultAvatar = () => {
    if (state.gender === "male") {
      return "👤";
    } else if (state.gender === "female") {
      return "👤";
    } else {
      return "👤";
    }
  };

  const currentImage = () => {
    if (profileImage) {
      return profileImage;
    } else if (state.profile && typeof state.profile === 'string') {
      return state.profile;
    } else {
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
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

  const handleSendOtp = async () => {
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

  const handleVerifyOtp = async () => {
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

  const handleChangePassword = async (e) => {
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

  const inputClass = (hasError) =>
    `w-full border focus:border-teal-500 focus:ring-2 focus:ring-teal-400 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition bg-white bg-opacity-90 shadow-inner backdrop-blur ${hasError ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <div className="bg-[#1d8e85]  flex items-center justify-center p-2 sm:p-4 lg:p-3">
      <div className="w-full max-w-9xl bg-white bg-opacity-90 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
        {/* Mobile-first layout with responsive flex direction */}
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 xl:gap-10 max-h-screen">
          
          {/* Profile Form Section */}
          <div className="w-full xl:w-2/3 space-y-4 sm:space-y-6">
            {/* Header with Profile Image */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Profile Image with Gender Avatar */}
              <div className="relative group flex-shrink-0">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-teal-600 to-white p-1 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-600/50"
                  onClick={() => profileRef.current?.click()}
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
                      <span className="text-3xl sm:text-4xl">{getDefaultAvatar()}</span>
                    )}

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="text-white text-xs font-medium">Change</span>
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

              {/* Header Text */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                  Profile Information
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Update your details below</p>

                <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-gray-700">
                  <span className="font-semibold text-[#0d7f79]"> Pro Tip:</span>{" "}
                  Keep your profile information up-to-date for better communication
                  and service experience.
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={state.email}
                    placeholder="Enter your email address"
                    disabled={userData?.data && Object.keys(userData.data).length > 0}
                    className={`${inputClass(errors.email)} ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={state.phone}
                    placeholder="Enter your phone number"
                    disabled={userData?.data && Object.keys(userData.data).length > 0}
                    className={`${inputClass(errors.phone)} ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={state.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className={inputClass(errors.address)}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={state.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className={inputClass(errors.city)}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State *
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={state.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    className={inputClass(errors.state)}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>

                {/* Country - Full width on mobile, half on larger screens */}
                <div className="space-y-1 sm:col-span-1">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                    disabled={userData?.data && Object.keys(userData.data).length > 0}
                    className={`${inputClass(errors.country)} ${userData?.data && Object.keys(userData.data).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Select Country</option>
                    {countryCodes?.map(({ country_name }) => (
                      <option key={country_name} value={country_name}>
                        {country_name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || updateLoader}
                className={`w-full mt-4 sm:mt-6 py-2.5 rounded-full font-semibold transition shadow-md text-sm sm:text-base ${loading || updateLoader
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
              >
                {loading || updateLoader ?
                  (userData?.data && Object.keys(userData.data).length > 0 ? "Updating..." : "Creating...") :
                  (userData?.data && Object.keys(userData.data).length > 0 ? "Update Profile" : "Create Profile")
                }
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="w-full xl:w-1/3 space-y-4 sm:space-y-6 border-t xl:border-t-0 xl:border-l pt-6 xl:pt-0 xl:pl-6 lg:pl-8">
            {/* Security Notice */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 sm:p-4 text-sm text-teal-900 shadow-sm">
              <p className="font-semibold mb-1 text-xs sm:text-sm">Security Reminder</p>
              <p className="leading-relaxed text-xs sm:text-sm">
                <span className="text-teal-700">Enter your current password</span> before making any changes to your password.
                This helps us verify that it's really you and keeps your information safe.
              </p>
            </div>

            {/* Password Section Header */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
              <LockKeyhole className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
              Change Password
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Current Password */}
              <div className="space-y-1">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your current password"
                    readOnly={otpVerified}
                    className={`${inputClass(errors.password)} pr-10 ${otpVerified ? 'opacity-60' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    disabled={otpVerified}
                    className="absolute right-3 top-2.5 text-gray-600 hover:text-teal-600 disabled:opacity-50"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* OTP Input */}
              <div className="space-y-1">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP *
                </label>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    id="otp"
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    placeholder="Enter 4-digit OTP"
                    disabled={!otpSent}
                    className={`${inputClass(errors.otp)} flex-1 ${!otpSent ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSent && !resendOtp}
                    className="px-3 sm:px-4 py-2 bg-[#1d8e85] text-white rounded-full font-medium transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex-shrink-0"
                  >
                    {isOtpSending
                      ? "Sending..."
                      : otpSent && !resendOtp
                        ? `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`
                        : otpSent && resendOtp
                          ? "Resend"
                          : "Get OTP"}
                  </button>
                </div>
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>

              {/* Verify OTP Button */}
              {!otpVerified && otpSent && (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-2.5 rounded-xl font-medium transition shadow disabled:opacity-50 text-sm sm:text-base"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </button>
              )}

              {/* Password Change Fields */}
              {otpVerified && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password *
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      placeholder="Enter new password (min 6 characters)"
                      className={inputClass(errors.newPassword)}
                    />
                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password *
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPwd"
                      value={formData.confirmPwd}
                      onChange={(e) => setFormData({ ...formData, confirmPwd: e.target.value })}
                      placeholder="Confirm your new password"
                      className={inputClass(errors.confirmPwd)}
                    />
                    {errors.confirmPwd && <p className="text-red-500 text-xs mt-1">{errors.confirmPwd}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 sm:py-2.5 rounded-xl font-semibold transition shadow disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              )}
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
        theme="light"
      />
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   useForgotMutation,
//   useVerifyMutation,
//   useVerifyOtpMutation,
// } from "./authApiSlice";
// import { toast } from "react-toastify";
// import hide from "../../assets/Images/hide.svg";
// import show from "../../assets/Images/show.svg";
// import JaimaxText from "../../assets/Images/Jaimaxtext.svg";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [forgot, { isLoading }] = useForgotMutation();
//   const [verify, { isVerifyLoading }] = useVerifyMutation();
//   const [verifyOtp, { isSomething }] = useVerifyOtpMutation();

//   /**
//    * This function is used to toggle the password visibility
//    */
//   const togglePassword = () => {
//     if (type == "password") {
//       setIcon(show);
//       setType("text");
//     } else {
//       setIcon(hide);
//       setType("password");
//     }
//   };

//   /**
//    * This function is used to toggle the confirm password visibility
//    */
//   const togglePassword2 = () => {
//     if (type2 == "password") {
//       setIcon2(show);
//       setType2("text");
//     } else {
//       setIcon2(hide);
//       setType2("password");
//     }
//   };

//   const [formData, setFormData] = useState({
//     email: "",
//     OTP: "",
//     password: "",
//     confirmPwd: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [otpSent, setOtpSent] = useState(false);
//   const [timer, setTimer] = useState(120); // 3 minutes timer
//   // const [resendOtp, setResendOtp] = useState(false);
//   const [newPass, setNewPass] = useState(false);
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   const [type, setType] = useState("password");
//   const [type2, setType2] = useState("password");
//   const [icon, setIcon] = useState(hide);
//   const [icon2, setIcon2] = useState(hide);

//   /**
//    * This function is used to handle the change in the input field
//    * @param {*} e
//    */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   /**
//    * This function is used to validate the email
//    * @return {*}
//    */
//   const validate = () => {
//     let formErrors = {};
//     const emailRegex = /^(?![-.])[a-zA-Z0-9-]+(?!.*?\.\.)[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+[a-z.0-9]+\.[a-z.]{2,4}$/;
//     // const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

//     //email validation
//     if (!formData.email) {
//       formErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       formErrors.email = "Invalid email format";
//     }

//     setErrors(formErrors);
//     return formErrors;
//   };

//   /**
//    * This function is used to validate the password and confirm password
//    * @return {*}
//    */
//   const validatePassword = () => {
//     let formErrors = {};
//     // Password validation
//     if (!formData.password) {
//       formErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       formErrors.password = "Password must be at least 6 characters";
//     }
//     // Confirm password validation
//     if (!formData.confirmPwd) {
//       formErrors.confirmPwd = "Confirm Password is required";
//     } else if (formData.password !== formData.confirmPwd) {
//       formErrors.confirmPwd = "Passwords do not match";
//     }

    
//     setErrors(formErrors);
//     return formErrors;
//   };

//   /**
//    * This function is used to submit the email for forgot password
//    * @param {*} e
//    * @return {*}
//    */
//   const onSubmitEmail = async (e) => {
//     e.preventDefault();
//     if (Object.keys(validate()).length > 0) {
//       return;
//     }

//     if (validate()) {
//       try {
//         // Payload for sending OTP
//         const response = await forgot({
//           email: formData.email,
//         }).unwrap();
//         toast.success(`${response?.message}`, {
//           position: "top-center",
//         });
//         setOtpSent(true);
//       } catch (error) {
//         toast.error(`${error?.data?.message}`, {
//           position: "top-center",
//         });
//       }
//     }
//   };

//   /**
//    * This function is used to handle the OTP verification
//    * @param {*} e
//    * @return {*}
//    */
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!formData.OTP) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         OTP: "OTP is required",
//       }));
//       toast.error("OTP is required", {
//         position: "top-center",
//       });
//       return;
//     }

//     try {
//       // Payload for verifying OTP
//       const payload = {
//         email: formData.email,
//         otp: Number(formData.OTP),
//         otpType: "forgotPassword",
//       };
//       const res = await verify(payload).unwrap();
//       if (res?.success == 1) {
//         setNewPass(true);
//       }
//       toast.success(`${res?.message}`, {
//         position: "top-center",
//       });
//     } catch (err) {
//       toast.error(`${err?.data?.message}`, {
//         position: "top-center",
//       });
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         OTP: err?.data?.message || "Invalid OTP",
//       }));
//     }
//   };

//   /**
//    * This function is used to submit the new password
//    * @param {*} e
//    */
//   const onSubmitNewPassword = async (e) => {
//     e.preventDefault();
//     const formErrors = validatePassword();
//     setErrors(formErrors);
//     if (Object.keys(formErrors).length === 0) {
//       try {
//         // Payload for setting new password
//         const payload = {
//           email: formData.email,
//           password: formData.password,
//         };
//         const res = await verifyOtp(payload).unwrap();
//         console.log("res ??", res?.message);

//         toast.success(`${res?.message}`, {
//           position: "top-center",
//         });
//         navigate("/login");
//       } catch (error) {
//         toast.error(`${error?.data?.message}`, {
//           position: "top-center",
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="container-fluid login ">
//         <div className="row homeGrid">
//           <div className="col-lg-6 col-md-6 col-sm-6 d-xs-none signIn-bg d-none d-sm-block d-md-blockd-lg-block">
//             <div className="text-center content">
//               <h6 className="text-center text-uppercase">welcome to</h6>
//               <img className="img-fluid pt-2" src={JaimaxText} alt="Logo" />
//               <div className="w-100 d-flex justify-content-center align-items-center">
//                 {/* <p className="pt-1 w-75">
//                   Most famous crypto investing, trading, and literacy platform.
//                   integrated with multiple Payment gateways with Virtual cards.{" "}
//                 </p> */}
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-6 col-md-6 col-sm-6 my-auto">
//             <div className="mx-auto welcome w-75">
//               <div className="px-lg-5 px-md-0 px-sm-0 mx-lg-2 mx-md-0 mx-sm-0">
//                 <div className="px-0 px-lg-4 px-md-4 heading">
//                   <h6 className="text-white mb-3 text-uppercase">
//                     Forgot Password
//                   </h6>
//                 </div>

//                 <form className="px-0 px-lg-4 px-md-4 loginFm">
//                   {!otpSent ? (
//                     <>
//                       <div className="form-label-group mb-2">
//                         <label>Email</label>
//                         <span className="ps-1 MandatorySymbol"> *</span>
//                         <div className="customInputs inputHeight">
//                           <input
//                             autoComplete="off"
//                             type="text"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="form-control"
//                             placeholder="Enter your email"
//                           />
//                           {errors.email && (
//                             <div className="error_cls">{errors.email}</div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="text-end">
//                         <Link to="/login" className="forgotPwd">
//                           Return to Login
//                         </Link>
//                       </div>

//                       <div className="submit_btn text-center">
//                         {isLoading ? (
//                           <button
//                             className="btns loginBtn w-100 mb-2"
//                             type="button"
//                             disabled
//                           >
//                             <span
//                               className="spinner-grow spinner-grow-sm"
//                               aria-hidden="true"
//                             ></span>
//                             <span role="status">Loading...</span>
//                           </button>
//                         ) : (
//                           <button
//                             type="submit"
//                             onClick={onSubmitEmail}
//                             className="btn loginBtn w-100 my-3"
//                           >
//                             <span className="btnText text-uppercase">
//                               Confirm
//                             </span>
//                           </button>
//                         )}
//                       </div>
//                     </>
//                   ) : newPass ? (
//                     <>
//                       <div className="form-label-group mb-2">
//                         <label>New Password</label>
//                         <span className="ps-1 MandatorySymbol"> *</span>
//                         <div className="customInputs inputHeight">
//                           <div className="input-group buttonInput bg-white">
//                             <input
//                               autoComplete="off"
//                               type={type}
//                               className="form-control"
//                               placeholder="Enter new password"
//                               name="password"
//                               value={formData.password}
//                               onChange={handleChange}
//                             />
//                             <span className="input-group-text border-0 bg-white">
//                               <img
//                                 src={icon}
//                                 alt="eye-icon"
//                                 className="img-fluid"
//                                 onClick={togglePassword}
//                                 style={{ cursor: "pointer" }}
//                               />
//                             </span>
//                           </div>
//                           {errors.password && (
//                             <div className="error_cls">{errors.password}</div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="form-label-group mb-2">
//                         <label>Confirm new Password</label>
//                         <span className="ps-1 MandatorySymbol"> *</span>
//                         <div className="customInputs inputHeight">
//                           <div className="input-group buttonInput bg-white">
//                             <input
//                               autoComplete="off"
//                               type={type2}
//                               name="confirmPwd"
//                               id="confirmPwd"
//                               placeholder="Confirm new password"
//                               className={`form-control ${
//                                 errors.confirmPwd ? "is-invalid" : ""
//                               }`}
//                               value={formData.confirmPwd}
//                               onChange={handleChange}
//                             />
//                             <span className="input-group-text border-0 bg-white">
//                               <img
//                                 src={icon2}
//                                 alt="eye-icon"
//                                 className="img-fluid"
//                                 onClick={togglePassword2}
//                                 style={{ cursor: "pointer" }}
//                               />
//                             </span>
//                           </div>
//                           {errors.confirmPwd && (
//                             <div className="error_cls">{errors.confirmPwd}</div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="submit_btn text-center mt-2">
//                         {isLoading ? (
//                           <button
//                             className="btn loginBtn w-100 my-3"
//                             type="button"
//                             disabled
//                           >
//                             <span
//                               className="spinner-grow spinner-grow-sm"
//                               aria-hidden="true"
//                             ></span>
//                             <span role="status" className="btnText">
//                               Loading...
//                             </span>
//                           </button>
//                         ) : (
//                           <button
//                             type="submit"
//                             onClick={onSubmitNewPassword}
//                             className="btn loginBtn w-100 my-3"
//                           >
//                             <span className="btnText text-uppercase">
//                               Set Password
//                             </span>
//                           </button>
//                         )}
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="form-label-group mb-2">
//                         <label htmlFor="otp">Enter OTP</label>
//                         <div className="customInputs inputHeight">
//                           <input
//                             autoComplete="off"
//                             type="text"
//                             name="OTP"
//                             value={formData.OTP}
//                             onChange={handleChange}
//                             className="form-control"
//                             placeholder="Enter OTP"
//                           />
//                           {errors.OTP && (
//                             <div className="error_cls">{errors.OTP}</div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="submit_btn text-center">
//                         {isVerifyLoading ? (
//                           <button
//                             className="btn loginBtn w-100 my-3"
//                             type="button"
//                             disabled
//                           >
//                             <span
//                               className="spinner-grow spinner-grow-sm"
//                               aria-hidden="true"
//                             ></span>
//                             <span role="status" className="btnText">
//                               Loading...
//                             </span>
//                           </button>
//                         ) : (
//                           <button
//                             type="submit"
//                             onClick={handleVerifyOtp}
//                             className="btn loginBtn w-100 my-3"
//                           >
//                             <span className="btnText text-uppercase">
//                               Verify OTP
//                             </span>
//                           </button>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from './Logo'
import {
  useForgotMutation,
  useVerifyMutation,
  useVerifyOtpMutation,
} from "./authApiSlice";

import hide from "../assets/Images/hide.svg";
import show from "../assets/Images/show.svg";
import JaimaxText from "../assets/Images/Jaimaxtext.svg";
const Link = ({ to, children, className }) => (
  <a href={to} className={className} onClick={(e) => { e.preventDefault(); console.log(`Navigate to: ${to}`); }}>
    {children}
  </a>
);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgot, { isLoading }] = useForgotMutation();
  const [verify, { isVerifyLoading }] = useVerifyMutation();
  const [verifyOtp, { isSomething }] = useVerifyOtpMutation();

  /**
   * This function is used to toggle the password visibility
   */
  const togglePassword = () => {
    if (type == "password") {
      setIcon(show);
      setType("text");
    } else {
      setIcon(hide);
      setType("password");
    }
  };

  /**
   * This function is used to toggle the confirm password visibility
   */
  const togglePassword2 = () => {
    if (type2 == "password") {
      setIcon2(show);
      setType2("text");
    } else {
      setIcon2(hide);
      setType2("password");
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    OTP: "",
    password: "",
    confirmPwd: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(120); // 3 minutes timer
  // const [resendOtp, setResendOtp] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const [icon, setIcon] = useState(hide);
  const [icon2, setIcon2] = useState(hide);

  /**
   * This function is used to handle the change in the input field
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * This function is used to validate the email
   * @return {*}
   */
  const validate = () => {
    let formErrors = {};
    const emailRegex = /^(?![-.])[a-zA-Z0-9-]+(?!.*?\.\.)[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+[a-z.0-9]+\.[a-z.]{2,4}$/;
    // const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

    //email validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    setErrors(formErrors);
    return formErrors;
  };

  /**
   * This function is used to validate the password and confirm password
   * @return {*}
   */
  const validatePassword = () => {
    let formErrors = {};
    // Password validation
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    // Confirm password validation
    if (!formData.confirmPwd) {
      formErrors.confirmPwd = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPwd) {
      formErrors.confirmPwd = "Passwords do not match";
    }

    
    setErrors(formErrors);
    return formErrors;
  };

  /**
   * This function is used to submit the email for forgot password
   * @param {*} 
   * @return {*}
   */
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (Object.keys(validate()).length > 0) {
      return;
    }

    if (validate()) {
      try {
        // Payload for sending OTP
        const response = await forgot({
          email: formData.email,
        }).unwrap();
        toast.success(`${response?.message}`, {
          position: "top-center",
        });
        setOtpSent(true);
      } catch (error) {
        toast.error(`${error?.data?.message}`, {
          position: "top-center",
        });
      }
    }
  };

  /**
   * This function is used to handle the OTP verification
   * @param {*} e
   * @return {*}
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.OTP) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        OTP: "OTP is required",
      }));
      toast.error("OTP is required", {
        position: "top-center",
      });
      return;
    }

    try {
      // Payload for verifying OTP
      const payload = {
        email: formData.email,
        otp: Number(formData.OTP),
        otpType: "forgotPassword",
      };
      const res = await verify(payload).unwrap();
      if (res?.success == 1) {
        setNewPass(true);
      }
      toast.success(`${res?.message}`, {
        position: "top-center",
      });
    } catch (err) {
      toast.error(`${err?.data?.message}`, {
        position: "top-center",
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        OTP: err?.data?.message || "Invalid OTP",
      }));
    }
  };

  /**
   * This function is used to submit the new password
   * @param {*} e
   */
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    const formErrors = validatePassword();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        // Payload for setting new password
        const payload = {
          email: formData.email,
          password: formData.password,
        };
        const res = await verifyOtp(payload).unwrap();
        console.log("res ??", res?.message);

        toast.success(`${res?.message}`, {
          position: "top-center",
        });
        navigate("/login");
      } catch (error) {
        toast.error(`${error?.data?.message}`, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900"
                style={{
  backgroundImage: "url('https://t4.ftcdn.net/jpg/02/22/68/39/360_F_222683930_mXWfHnOk9spCYOyEhqXNSWbWhZd4dFKF.jpg')",
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover',
}}>
        <div className="flex min-h-screen">
          {/* Left side - Welcome section */}
          <div className="hidden sm:flex sm:w-1/2  items-center justify-center" 


            >
            <div className="text-center text-white px-8">
              <h6 className="text-sm uppercase tracking-wide mb-2">welcome to</h6>
              {/* <img className="w-auto h-16 mx-auto pt-2" src={JaimaxText} alt="Logo" /> */}
              <Logo/>
              <div className="w-full flex justify-center items-center mt-4">
                {/* <p className="text-sm opacity-90 max-w-md">
                  Most famous crypto investing, trading, and literacy platform.
                  integrated with multiple Payment gateways with Virtual cards.
                </p> */}
              </div>
            </div>
          </div>

          {/* Right side - Form section */}
          <div className="w-full sm:w-1/2 flex  items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h6 className="text-white text-lg uppercase tracking-wide mb-6">
                  Forgot Password
                </h6>
              </div>

              <div className="space-y-6">
                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-white text-sm mb-2">
                        Email
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div>
                        <input
                          autoComplete="off"
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm">
                        Return to Login
                      </Link>
                    </div>

                    <div className="text-center">
                      {isLoading ? (
                        <button
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium opacity-75 cursor-not-allowed flex items-center justify-center"
                          type="button"
                          disabled
                        >
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={onSubmitEmail}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 uppercase tracking-wide"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </>
                ) : newPass ? (
                  <>
                    <div>
                      <label className="block text-white text-sm mb-2">
                        New Password
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div>
                        <div className="relative">
                          <input
                            autoComplete="off"
                            type={type}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                            placeholder="Enter new password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={togglePassword}
                          >
                            <img
                              src={icon}
                              alt="eye-icon"
                              className="h-5 w-5 cursor-pointer"
                            />
                          </button>
                        </div>
                        {errors.password && (
                          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-sm mb-2">
                        Confirm new Password
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div>
                        <div className="relative">
                          <input
                            autoComplete="off"
                            type={type2}
                            name="confirmPwd"
                            id="confirmPwd"
                            placeholder="Confirm new password"
                            className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                              errors.confirmPwd ? "border-red-500" : "border-gray-300"
                            }`}
                            value={formData.confirmPwd}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={togglePassword2}
                          >
                            <img
                              src={icon2}
                              alt="eye-icon"
                              className="h-5 w-5 cursor-pointer"
                            />
                          </button>
                        </div>
                        {errors.confirmPwd && (
                          <div className="text-red-500 text-sm mt-1">{errors.confirmPwd}</div>
                        )}
                      </div>
                    </div>

                    <div className="text-center mt-6">
                      {isLoading ? (
                        <button
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium opacity-75 cursor-not-allowed flex items-center justify-center"
                          type="button"
                          disabled
                        >
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={onSubmitNewPassword}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 uppercase tracking-wide"
                        >
                          Set Password
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="otp" className="block text-white text-sm mb-2">
                        Enter OTP
                      </label>
                      <div>
                        <input
                          autoComplete="off"
                          type="text"
                          name="OTP"
                          value={formData.OTP}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter OTP"
                        />
                        {errors.OTP && (
                          <div className="text-red-500 text-sm mt-1">{errors.OTP}</div>
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      {isVerifyLoading ? (
                        <button
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium opacity-75 cursor-not-allowed flex items-center justify-center"
                          type="button"
                          disabled
                        >
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          onClick={handleVerifyOtp}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 uppercase tracking-wide"
                        >
                          Verify OTP
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
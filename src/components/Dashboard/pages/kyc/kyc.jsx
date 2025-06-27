// // import React, { useState } from 'react';

// // const Kyc = () => {
// //   const [formData, setFormData] = useState({
// //     applicantName: '',
// //     dob: '',
// //     mobile: '',
// //     address: '',
// //     aadharFront: null,
// //     aadharBack: null,
// //     panFile: null,
// //     panNumber: '',
// //     upi: '',
// //     accountNumber: '',
// //     bankName: '',
// //     ifsc: '',
// //   });

// //   const [errors, setErrors] = useState({});

// //   const handleInputChange = (e) => {
// //     const { name, value, files } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: files ? files[0] : value,
// //     });
// //     setErrors({ ...errors, [name]: '' });
// //   };

// //   const validate = () => {
// //     const newErrors = {};

// //     if (!formData.applicantName) newErrors.applicantName = 'Name is required';
// //     if (!formData.dob) newErrors.dob = 'Date of birth is required';

// //     if (!formData.mobile) {
// //       newErrors.mobile = 'Mobile number is required';
// //     } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
// //       newErrors.mobile = 'Enter a valid Indian mobile number';
// //     }

// //     if (!formData.address) newErrors.address = 'Address is required';

// //     if (!formData.aadharFront) newErrors.aadharFront = 'Aadhar front is required';
// //     if (!formData.aadharBack) newErrors.aadharBack = 'Aadhar back is required';

// //     if (!formData.panFile) newErrors.panFile = 'PAN file is required';

// //     if (!formData.panNumber) {
// //       newErrors.panNumber = 'PAN number is required';
// //     } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
// //       newErrors.panNumber = 'Invalid PAN number';
// //     }

// //     if (!formData.upi) {
// //       newErrors.upi = 'UPI ID is required';
// //     } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upi)) {
// //       newErrors.upi = 'Invalid UPI ID format';
// //     }

// //     if (!formData.accountNumber) newErrors.accountNumber = 'Bank account number is required';

// //     if (!formData.bankName) newErrors.bankName = 'Bank name is required';

// //     if (!formData.ifsc) {
// //       newErrors.ifsc = 'IFSC code is required';
// //     } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
// //       newErrors.ifsc = 'Invalid IFSC code format';
// //     }

// //     return newErrors;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const validationErrors = validate();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //       return;
// //     }
// //     console.log('Submitted Data:', formData);
// //     alert("Form submitted successfully!");
// //   };

// //   const inputStyle =
// //     'w-full px-4 py-2.5 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4] text-sm transition';
// //   const sectionStyle = 'space-y-5 p-5 rounded-xl';
// //   const labelStyle = 'block text-sm font-medium text-white mb-1.5';
// //   const errorStyle = 'text-red-400 text-xs mt-1';
// //   const fileInputWrapper = 'flex items-center h-10 rounded-md border border-white/20 overflow-hidden';

// //   return (
// //     <div className="bg-[#1d8e85] text-white px-4 sm:px-6 lg:px-8 py-4 min-h-screen">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full rounded-xl grid grid-cols-1 md:grid-cols-3 gap-7"
// //       >
// //         <div className="col-span-1 md:col-span-3 mb-7">
// //           <h2 className="text-2xl font-semibold mb-1">
// //             KYC Information{' '}
// //             <span className="text-base font-normal text-white/80">
// //               (Fill up information and verify your KYC)
// //             </span>
// //           </h2>
// //           <p className="text-sm mt-1">
// //             KYC status: <span className="text-red-400 font-semibold">n/a</span>
// //           </p>
// //         </div>

// //         {/* Applicant Info */}
// //         <div className={sectionStyle}>
// //           <h3 className="font-semibold text-lg border-b border-white/30 pb-3 mb-4">Applicant Info</h3>

// //           <div>
// //             <label className={labelStyle} htmlFor="applicantName">Name of the Applicant *</label>
// //             <input
// //               id="applicantName"
// //               name="applicantName"
// //               value={formData.applicantName}
// //               onChange={handleInputChange}
// //               placeholder="Enter name"
// //               className={inputStyle}
// //             />
// //             {errors.applicantName && <p className={errorStyle}>{errors.applicantName}</p>}
// //           </div>

// //           <div>
// //             <label className={labelStyle} htmlFor="dob">Date of Birth *</label>
// //             <input
// //               id="dob"
// //               name="dob"
// //               type="date"
// //               value={formData.dob}
// //               onChange={handleInputChange}
// //               className={inputStyle}
// //             />
// //             {errors.dob && <p className={errorStyle}>{errors.dob}</p>}
// //           </div>

// //           <div>
// //             <label className={labelStyle} htmlFor="mobile">Mobile Number (As per Bank) *</label>
// //             <input
// //               id="mobile"
// //               name="mobile"
// //               value={formData.mobile}
// //               onChange={handleInputChange}
// //               placeholder="Enter 10-digit mobile number"
// //               className={inputStyle}
// //             />
// //             {errors.mobile && <p className={errorStyle}>{errors.mobile}</p>}
// //           </div>

// //           <div>
// //             <label className={labelStyle} htmlFor="address">Address *</label>
// //             <input
// //               id="address"
// //               name="address"
// //               value={formData.address}
// //               onChange={handleInputChange}
// //               placeholder="Enter your address"
// //               className={inputStyle}
// //             />
// //             {errors.address && <p className={errorStyle}>{errors.address}</p>}
// //           </div>
// //         </div>

// //         {/* Applicant Proofs */}
// //         <div className={sectionStyle}>
// //           <h3 className="font-semibold text-lg border-b border-white/30 pb-3 mb-4">Applicant Proofs</h3>
// //           {[
// //             ['aadharFront', 'Aadhar Front'],
// //             ['aadharBack', 'Aadhar Back'],
// //             ['panFile', 'PAN File'],
// //           ].map(([field, label]) => (
// //             <div key={field} className="mb-5">
// //               <label className={labelStyle} htmlFor={field}>{label} *</label>
// //               <div className={fileInputWrapper}>
// //                 <label
// //                   htmlFor={field}
// //                   className="bg-white/10 hover:bg-white/20 text-white px-5 h-full flex items-center text-sm font-semibold cursor-pointer min-w-[120px] justify-center"
// //                 >
// //                   Choose file
// //                 </label>
// //                 <input
// //                   type="file"
// //                   id={field}
// //                   name={field}
// //                   onChange={handleInputChange}
// //                   className="hidden"
// //                 />
// //                 <div className="bg-[#063c41] text-sm text-white px-3 h-full flex items-center w-full truncate">
// //                   {formData[field]?.name || 'No file chosen'}
// //                 </div>
// //               </div>
// //               {errors[field] && <p className={errorStyle}>{errors[field]}</p>}
// //             </div>
// //           ))}

// //           <div>
// //             <label className={labelStyle} htmlFor="panNumber">PAN Number *</label>
// //             <input
// //               id="panNumber"
// //               name="panNumber"
// //               value={formData.panNumber.toUpperCase()}
// //               onChange={handleInputChange}
// //               placeholder="ABCDE1234F"
// //               className={inputStyle}
// //             />
// //             {errors.panNumber && <p className={errorStyle}>{errors.panNumber}</p>}
// //           </div>
// //         </div>

// //         {/* Bank Details */}
// //         <div className={sectionStyle}>
// //           <h3 className="font-semibold text-lg border-b border-white/30 pb-3 mb-4">Bank Details</h3>

// //           <div>
// //             <label className={labelStyle} htmlFor="upi">UPI ID *</label>
// //             <input
// //               id="upi"
// //               name="upi"
// //               value={formData.upi}
// //               onChange={handleInputChange}
// //               placeholder="yourname@bank"
// //               className={inputStyle}
// //             />
// //             {errors.upi && <p className={errorStyle}>{errors.upi}</p>}
// //           </div>

// //           <div>
// //             <label className={labelStyle} htmlFor="accountNumber">Bank Account Number *</label>
// //             <input
// //               id="accountNumber"
// //               name="accountNumber"
// //               value={formData.accountNumber}
// //               onChange={handleInputChange}
// //               placeholder="Enter bank account number"
// //               className={inputStyle}
// //             />
// //             {errors.accountNumber && <p className={errorStyle}>{errors.accountNumber}</p>}
// //           </div>

// //           <div>
// //             <label className={labelStyle} htmlFor="bankName">Bank Name *</label>
// //             <input
// //               id="bankName"
// //               name="bankName"
// //               value={formData.bankName}
// //               onChange={handleInputChange}
// //               placeholder="Enter bank name"
// //               className={inputStyle}
// //             />
// //             {errors.bankName && <p className={errorStyle}>{errors.bankName}</p>}
// //           </div>

// //           <div>
// //             <label className={labelStyle} htmlFor="ifsc">Bank IFSC Code *</label>
// //             <input
// //               id="ifsc"
// //               name="ifsc"
// //               value={formData.ifsc.toUpperCase()}
// //               onChange={handleInputChange}
// //               placeholder="SBIN0001234"
// //               className={inputStyle}
// //             />
// //             {errors.ifsc && <p className={errorStyle}>{errors.ifsc}</p>}
// //           </div>

// //           <div className="flex justify-end pt-5">
// //             <button
// //               type="submit"
// //               className="bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold text-sm px-14 py-3 rounded-full transition duration-300 hover:scale-105"
// //             >
// //               Submit
// //             </button>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Kyc;




// // import React, { useContext, useEffect, useRef, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import CryptoJS from "crypto-js";
// // import useUserDataQuery from '../dashBoard/DashboardApliSlice';
// // import  {useKycaddMutation, useGetkycDetailsQuery, useKycaddMutation} from './kycApiSlice'
// // import digiLocker from "../../../../assets/digiLocker.svg";
// // import editIcon from "../../../../assets/edit.svg";
// // import showIcon from "../../../../assets/showIcon.svg";
// // import countryCodes from "../../../../components/countryCodes.json";
// // const getValidationSchema = (isCountryCodeIndia, kycSuccess) => {
// //   return Yup.object({
// //     applicantName: Yup.string()
// //       .min(2, 'Name must be at least 2 characters')
// //       .required('The applicant name field is mandatory.'),
    
// //     dob: isCountryCodeIndia ? Yup.string()
// //       .required('Date of birth is required') : Yup.string(),
    
// //     mobile_number: Yup.string()
// //       .test('mobile-validation', 'The mobile number field is mandatory.', function(value) {
// //         if (!value) return false;
// //         const prefix = `+${this.parent.countryCode || 91} `;
// //         return value.replace(prefix, '').trim().length > 0;
// //       }),
    
// //     address: Yup.string()
// //       .min(5, 'Address must be at least 5 characters')
// //       .required('The address field is mandatory.'),
    
// //     bank_name: Yup.string()
// //       .matches(/^[a-zA-Z\s]*$/, 'Bank name should only contain letters')
// //       .required('The bank name field is mandatory.'),
    
// //     ifsc_code: Yup.string()
// //       .matches(/^[a-zA-Z0-9]*$/, 'Invalid IFSC code format')
// //       .required(`The ${isCountryCodeIndia ? 'ifsc' : 'bank'} code field is mandatory.`),
    
// //     bank_account: Yup.string()
// //       .matches(/^\d+$/, 'Account number should only contain numbers')
// //       .required('The bank account field is mandatory.'),
    
// //     panNumber: isCountryCodeIndia ? Yup.string()
// //       .matches(/^[a-zA-Z0-9]*$/, 'Invalid PAN format')
// //       .length(10, 'PAN must be 10 characters')
// //       .required('PAN number is required') : Yup.string(),
    
// //     upi_id: isCountryCodeIndia ? Yup.string()
// //       .matches(/^[0-9]*$/, 'UPI should only contain numbers') : Yup.string(),

// //     // File validations only if KYC not already submitted
// //     aadhar_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Aadhar doc front field is mandatory.') : Yup.mixed(),
    
// //     aadhar_doc_back: (kycSuccess !== 1 && isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Aadhar doc back field is mandatory.') : Yup.mixed(),
    
// //     pan_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Pan doc front field is mandatory.') : Yup.mixed(),
    
// //     dl_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Driving License doc front field is mandatory.') : Yup.mixed(),
    
// //     dl_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Driving License doc back field is mandatory.') : Yup.mixed(),
    
// //     passport_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Passport doc front field is mandatory.') : Yup.mixed(),
    
// //     passport_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) ? 
// //       Yup.mixed().required('The Passport doc back field is mandatory.') : Yup.mixed(),
// //   });
// // };

// // const KycInformation = () => {
// //   const { data: userData } = useUserDataQuery();
// //   const location = useLocation();

// //   const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

// //   const [submitKyc] = useKycaddMutation();
// //   const [getKycData] = useGetKycDataMutation();
// //   const [loading, setLoading] = useState(false);
// //   const [enableFields, setEnableFields] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
// //   const [isEditClicked, setIsEditClicked] = useState(false);

// //   const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

// //   const docFrontRef = useRef(null);
// //   const doc1FrontRef = useRef(null);
// //   const docBackRef = useRef(null);
// //   const doc1BackRef = useRef(null);

// //   // Initial form values
// //   const getInitialValues = () => ({
// //     aadhar_doc_front: null,
// //     aadhar_doc_back: null,
// //     pan_doc_front: null,
// //     dl_doc_front: null,
// //     dl_doc_back: null,
// //     passport_doc_front: null,
// //     passport_doc_back: null,
// //     bank_name: kycdata?.data?.bank_name || "",
// //     applicantName: kycdata?.data?.name || userData?.data?.name || "",
// //     ifsc_code: kycdata?.data?.ifsc_code || "",
// //     mobile_number: kycdata?.data?.mobile_number 
// //       ? `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}`
// //       : `+${userData?.data?.countryCode || 91} `,
// //     upi_id: kycdata?.data?.upi_id || "",
// //     bank_account: kycdata?.data?.bank_account || "",
// //     address: kycdata?.data?.address || "",
// //     dob: kycdata?.data?.dob || "",
// //     panNumber: kycdata?.data?.panNumber || "",
// //     countryCode: userData?.data?.countryCode || 91
// //   });

// //   const toUpperCase = (text) => text.toUpperCase();

// //   const getCountryName = () => {
// //     const countryCode = `+${userData?.data?.countryCode}`;
// //     const countryName = countryCodes.find(
// //       (country) => country.country_code == countryCode
// //     );
// //     return countryName?.country_name || "NA";
// //   };

// //   const getMaxLength = () => {
// //     return isCountryCodeIndia ? 14 : 19;
// //   };

// //   const checkTextAfterPrefix = (input) => {
// //     let splitString = input.split(`+${userData?.data?.countryCode} `);
// //     return !splitString[1].trim().length > 0;
// //   };

// //   // Custom file input component
// //   const CustomFileInput = ({ field, form, label, accept = ".jpg,.jpeg,.png", disabled, showImageUrl, refProp, ...props }) => {
// //     const handleFileChange = (event) => {
// //       const file = event.currentTarget.files[0];
// //       if (file) {
// //         const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
// //         const invalidFile = !acceptedFormats.includes(file.type);
        
// //         if (invalidFile) {
// //           toast.warning("Only JPG / PNG files are allowed", {
// //             position: "top-center",
// //           });
// //           if (refProp?.current) {
// //             refProp.current.value = "";
// //           }
// //           return;
// //         }
        
// //         form.setFieldValue(field.name, file);
// //       }
// //     };

// //     return (
// //       <div className="mb-3">
// //         <label htmlFor={field.name} className="form-label text-white">
// //           {label} <span className="text-red-400">*</span>
// //           {showImageUrl && (
// //             <span className="ps-1">
// //               <button
// //                 type="button"
// //                 className="bg-transparent border-0"
// //                 onClick={() => {
// //                   const link = document.createElement("a");
// //                   link.href = showImageUrl;
// //                   link.target = "_blank";
// //                   link.rel = "noopener noreferrer";
// //                   link.click();
// //                 }}
// //               >
// //                 <img alt="showIcon" src={showIcon} className="w-4 h-4" />
// //               </button>
// //             </span>
// //           )}
// //         </label>
// //         <input
// //           type="file"
// //           accept={accept}
// //           className="w-full px-4 py-2.5 rounded-md border border-white/20 bg-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
// //           name={field.name}
// //           ref={refProp}
// //           onChange={handleFileChange}
// //           disabled={disabled}
// //           {...props}
// //         />
// //         <ErrorMessage name={field.name} component="p" className="text-red-400 text-xs mt-1" />
// //       </div>
// //     );
// //   };

// //   // Custom input component
// //   const CustomInput = ({ field, form, label, disabled, maxLength, onKeyPress, ...props }) => {
// //     return (
// //       <div className="mb-3">
// //         <label htmlFor={field.name} className="form-label text-white">
// //           {label} <span className="text-red-400">*</span>
// //         </label>
// //         <input
// //           {...field}
// //           {...props}
// //           className="w-full px-4 py-2.5 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4] text-sm transition disabled:opacity-50"
// //           disabled={disabled}
// //           maxLength={maxLength}
// //           onKeyPress={onKeyPress}
// //           autoComplete="off"
// //         />
// //         <ErrorMessage name={field.name} component="p" className="text-red-400 text-xs mt-1" />
// //       </div>
// //     );
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
// //     setLoading(true);
// //     try {
// //       const data = new FormData();

// //       // Handle file uploads based on KYC status and country
// //       if (kycdata?.success !== 1) {
// //         if (isCountryCodeIndia) {
// //           data.append("aadhar_doc_front", values.aadhar_doc_front);
// //           data.append("aadhar_doc_back", values.aadhar_doc_back);
// //           data.append("pan_doc_front", values.pan_doc_front);
// //           data.append("upi_id", values.upi_id);
// //           data.append("panNumber", values.panNumber);
// //           data.append("dob", values.dob);
// //         } else {
// //           data.append("dl_doc_front", values.dl_doc_front);
// //           data.append("dl_doc_back", values.dl_doc_back);
// //           data.append("passport_doc_front", values.passport_doc_front);
// //           data.append("passport_doc_back", values.passport_doc_back);
// //         }
// //       } else {
// //         // Handle updates for existing KYC
// //         if (docFrontRef.current?.value) {
// //           if (isCountryCodeIndia) {
// //             data.append("aadhar_doc_front", values.aadhar_doc_front);
// //           } else {
// //             data.append("dl_doc_front", values.dl_doc_front);
// //           }
// //         }
// //         if (docBackRef.current?.value) {
// //           if (isCountryCodeIndia) {
// //             data.append("aadhar_doc_back", values.aadhar_doc_back);
// //           } else {
// //             data.append("dl_doc_back", values.dl_doc_back);
// //           }
// //         }
// //         if (doc1FrontRef.current?.value) {
// //           if (isCountryCodeIndia) {
// //             data.append("pan_doc_front", values.pan_doc_front);
// //           } else {
// //             data.append("passport_doc_front", values.passport_doc_front);
// //           }
// //         }
// //         if (doc1BackRef?.current?.value) {
// //           if (!isCountryCodeIndia) {
// //             data.append("passport_doc_back", values.passport_doc_back);
// //           }
// //         }
// //         if (isCountryCodeIndia) {
// //           data.append("upi_id", values.upi_id);
// //           data.append("panNumber", values.panNumber);
// //           data.append("dob", values.dob);
// //         }
// //       }

// //       // Add common fields
// //       data.append("name", values.applicantName);
// //       data.append("bank_name", values.bank_name);
// //       data.append("ifsc_code", values.ifsc_code);
      
// //       if (values.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
// //         data.append(
// //           "mobile_number",
// //           values.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
// //         );
// //       }
      
// //       data.append("bank_account", values.bank_account);
// //       data.append("address", values.address);

// //       const response = await submitKyc(data);

// //       if (response?.data?.status_code === 200) {
// //         toast.success(response?.data.message, {
// //           position: "top-center",
// //         });
// //         refetch();
// //       } else {
// //         toast?.error(response?.error?.data?.message, {
// //           position: "top-center",
// //         });
// //       }
// //     } catch (error) {
// //       toast.error(error.message, {
// //         position: "top-center",
// //       });
// //     } finally {
// //       setLoading(false);
// //       setSubmitting(false);
// //     }
// //   };

// //   // Generate code verifier and challenge for DigiLocker
// //   const generateCodeVerifier = async () => {
// //     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
// //     const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
// //     let verifier = "";
// //     for (let i = 0; i < length; i++) {
// //       const randomIndex = Math.floor(Math.random() * characters.length);
// //       verifier += characters[randomIndex];
// //     }
// //     return verifier;
// //   };

// //   const generateCodeChallenge = (verifier) => {
// //     const hash = CryptoJS.SHA256(verifier);
// //     const base64Url = CryptoJS.enc.Base64.stringify(hash)
// //       .replace(/\+/g, "-")
// //       .replace(/\//g, "_")
// //       .replace(/=+$/, "");
// //     return base64Url;
// //   };

// //   const handleButtonClick = async () => {
// //     setLoading(true);
// //     try {
// //       const verifier = await generateCodeVerifier();
// //       const challenge = await generateCodeChallenge(verifier);
      
// //       let origin = window.location.origin;
// //       let redirectURI = "http://localhost:3000/kyc"; // Default for development
// //       let clientId = "your-client-id"; // Replace with actual client ID
      
// //       if (origin && (origin.includes("5173") || origin.includes("5174"))) {
// //         redirectURI = process.env.DL_REDIRECT_URI_DEV;
// //         clientId = process.env.DL_CLIENT_ID_DEV;
// //       } else if (window.location.origin === "https://jaimax.com") {
// //         redirectURI = process.env.DL_REDIRECT_URI_PROD;
// //         clientId = process.env.DL_CLIENT_ID_PROD;
// //       } else {
// //         redirectURI = process.env.DL_REDIRECT_URI_QA;
// //         clientId = process.env.DL_CLIENT_ID_QA;
// //       }

// //       localStorage.setItem("verifier", verifier);
// //       localStorage.removeItem("processed");
      
// //       const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
// //       window.open(apiUrl.toString(), "_self");
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onClickEdit = () => {
// //     setIsEditClicked(true);
// //   };

// //   // Handle DigiLocker response
// //   useEffect(() => {
// //     const queryParams = new URLSearchParams(location.search);
// //     const extractedCode = queryParams.get("code");
    
// //     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
// //     window.history.replaceState(null, "", newUrl);
    
// //     if (extractedCode && !localStorage.getItem("processed")) {
// //       localStorage.setItem("processed", "true");
      
// //       const payload = {
// //         code: extractedCode,
// //         verifier: localStorage.getItem("verifier"),
// //       };

// //       setLoading(true);
// //       const postTokenRequest = async () => {
// //         try {
// //           const response = await getKycData(payload).unwrap();
// //           if (response.data) {
// //             setEnableFields(true);
// //             setDisableFieldsAfterKYC(true);
// //             setIsEditClicked(true);
// //             setShowModal(false);
// //           }
// //         } catch (error) {
// //           console.log(error);
// //         } finally {
// //           setLoading(false);
// //           localStorage.removeItem("code");
// //           localStorage.removeItem("verifier");
// //         }
// //       };

// //       postTokenRequest();
// //     }
// //   }, []);

// //   useEffect(() => {
// //     refetch();
// //   }, []);

// //   useEffect(() => {
// //     if (kycdata?.success == 1) {
// //       setEnableFields(true);
// //       setDisableFieldsAfterKYC(true);
      
// //       if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
// //         setShowModal(true);
// //       } else {
// //         setShowModal(false);
// //       }
// //     } else {
// //       if (isCountryCodeIndia && !(isLoading || loading)) {
// //         setShowModal(true);
// //       }
// //     }
// //   }, [userData, kycdata]);

// //   const isFieldDisabled = (fieldType = 'normal') => {
// //     const baseDisabled = (!enableFields && isCountryCodeIndia) || 
// //                         kycdata?.data?.status === "open" || 
// //                         (kycdata?.data?.status == "approve" && !isEditClicked);
    
// //     if (fieldType === 'pan') {
// //       return baseDisabled || disableFieldsAfterKYC;
// //     }
    
// //     return baseDisabled;
// //   };

// //   if (isLoading || loading) {
// //     return (
// //       <div className="bg-[#1d8e85] min-h-screen flex items-center justify-center">
// //         <div className="text-white text-xl">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-[#1d8e85] text-white px-4 sm:px-6 lg:px-8 py-4 min-h-screen">
// //       <div className="container-fluid">
// //         <div className="bg-[#094e54] rounded-xl p-6">
// //           {/* Header */}
// //           <div className="flex justify-between items-start mb-6">
// //             <div className="flex flex-col">
// //               <div className="flex items-center gap-2 mb-2">
// //                 <h1 className="text-2xl font-semibold text-white">KYC Information</h1>
// //                 <p className="text-white/80 text-sm">
// //                   {kycdata?.data?.status !== "approve" && "(Fill up information and verify your KYC.)"}
// //                 </p>
// //               </div>
              
// //               <div className="flex items-center gap-4">
// //                 {kycdata?.data?.status === "approve" && (
// //                   <button
// //                     type="button"
// //                     className="bg-transparent border-0 p-0"
// //                     onClick={onClickEdit}
// //                   >
// //                     <img alt="edit" src={editIcon} className="w-5 h-5" />
// //                   </button>
// //                 )}
// //                 <p className="text-sm">
// //                   KYC status:{" "}
// //                   <span
// //                     className="text-capitalize font-bold"
// //                     style={{
// //                       color:
// //                         kycdata?.data?.status === "open"
// //                           ? "#ff8a00"
// //                           : kycdata?.data?.status === "approve"
// //                           ? "green"
// //                           : kycdata?.data?.status === "inprogress"
// //                           ? "blue"
// //                           : "red",
// //                     }}
// //                   >
// //                     {kycdata?.data?.status === "open"
// //                       ? "In Open"
// //                       : kycdata?.data?.status === "approve"
// //                       ? "Approved"
// //                       : kycdata?.data?.status === "inprogress"
// //                       ? "In Progress"
// //                       : kycdata?.data?.status === "reject"
// //                       ? "Rejected"
// //                       : "N/A"}
// //                   </span>
// //                 </p>
// //                 {kycdata && kycdata?.data?.status === "reject" && (
// //                   <p className="text-sm">
// //                     Reason:{" "}
// //                     <span className="text-red-400 font-bold">
// //                       {kycdata?.data?.reason}
// //                     </span>
// //                   </p>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-4">
// //               <h6 className="text-white text-sm">
// //                 Country:{" "}
// //                 <span className="font-semibold">
// //                   {!userData?.data?.country || userData?.data?.country === "N/A"
// //                     ? getCountryName()
// //                     : userData?.data?.country}
// //                 </span>
// //               </h6>

// //               {isCountryCodeIndia &&
// //                 ((kycdata?.data?.status !== "open" && kycdata?.data?.status !== "approve") ||
// //                   (kycdata?.data?.status == "approve" && isEditClicked)) && (
// //                   <button
// //                     type="button"
// //                     className="border-0 bg-transparent p-2 hover:bg-white/10 rounded-lg transition"
// //                     onClick={handleButtonClick}
// //                   >
// //                     <img
// //                       src={digiLocker}
// //                       alt="digiLockerIcon"
// //                       className="w-12 h-12"
// //                     />
// //                   </button>
// //                 )}
// //             </div>
// //           </div>

// //           {/* Form */}
// //           <Formik
// //             initialValues={getInitialValues()}
// //             validationSchema={getValidationSchema(isCountryCodeIndia, kycdata?.success)}
// //             onSubmit={handleSubmit}
// //             enableReinitialize={true}
// //           >
// //             {({ values, setFieldValue, isSubmitting }) => (
// //               <Form>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //                   {/* Applicant Info */}
// //                   <div className="space-y-4">
// //                     <h6 className="text-white text-lg font-semibold border-b border-white/30 pb-2">
// //                       Applicant Info
// //                     </h6>

// //                     <Field
// //                       name="applicantName"
// //                       component={CustomInput}
// //                       label="Name of the Applicant"
// //                       disabled={true}
// //                       readOnly={true}
// //                     />

// //                     {isCountryCodeIndia && (
// //                       <Field
// //                         name="dob"
// //                         component={CustomInput}
// //                         label="Date of Birth"
// //                         disabled={true}
// //                         readOnly={true}
// //                       />
// //                     )}

// //                     <Field name="mobile_number">
// //                       {({ field, form }) => (
// //                         <CustomInput
// //                           field={field}
// //                           form={form}
// //                           label="Mobile Number (As per Bank)"
// //                           placeholder="Enter mobile number"
// //                           maxLength={getMaxLength()}
// //                           disabled={isFieldDisabled()}
// //                           onKeyPress={(event) => {
// //                             if (!/[0-9]/.test(event.key)) {
// //                               event.preventDefault();
// //                             }
// //                           }}
// //                           onChange={(e) => {
// //                             const value = e.target.value;
// //                             if (value.startsWith(`+${userData?.data?.countryCode} `)) {
// //                               form.setFieldValue(field.name, value);
// //                             }
// //                           }}
// //                         />
// //                       )}
// //                     </Field>

// //                     <Field
// //                       name="address"
// //                       component={CustomInput}
// //                       label="Address"
// //                       placeholder="Enter your address"
// //                       disabled={isFieldDisabled()}
// //                     />
// //                   </div>

// //                   {/* Applicant Proofs */}
// //                   <div className="space-y-4">
// //                     <h6 className="text-white text-lg font-semibold border-b border-white/30 pb-2">
// //                       Applicant Proofs
// //                     </h6>

// //                     <Field
// //                       name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
// //                       component={CustomFileInput}
// //                       label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
// //                       disabled={isFieldDisabled()}
// //                       showImageUrl={
// //                         kycdata?.success &&
// //                         (isCountryCodeIndia
// //                           ? kycdata.data?.aadhar_doc_front
// //                           : kycdata.data?.dl_doc_front)
// //                       }
// //                       refProp={docFrontRef}
// //                     />

// //                     <Field
// //                       name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
// //                       component={CustomFileInput}
// //                       label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
// //                       disabled={isFieldDisabled()}
// //                       showImageUrl={
// //                         kycdata?.success &&
// //                         (isCountryCodeIndia
// //                           ? kycdata.data?.aadhar_doc_back
// //                           : kycdata.data?.dl_doc_back)
// //                       }
// //                       refProp={docBackRef}
// //                     />

// //                     <Field
// //                       name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
// //                       component={CustomFileInput}
// //                       label={isCountryCodeIndia ? "PAN" : "Passport Front"}
// //                       disabled={isFieldDisabled()}
// //                       showImageUrl={
// //                         kycdata?.success &&
// //                         (isCountryCodeIndia
// //                           ? kycdata.data?.pan_doc_front
// //                           : kycdata.data?.passport_doc_front)
// //                       }
// //                       refProp={doc1FrontRef}
// //                     />

// //                     {!isCountryCodeIndia && (
// //                       <Field
// //                         name="passport_doc_back"
// //                         component={CustomFileInput}
// //                         label="Passport Back"
// //                         disabled={isFieldDisabled()}
// //                         showImageUrl={kycdata?.success && kycdata.data?.passport_doc_back}
// //                         refProp={doc1BackRef}
// //                       />
// //                     )}

// //                     {isCountryCodeIndia && (
// //                       <Field
// //                         name="panNumber"
// //                         component={CustomInput}
// //                         label="PAN Number"
// //                         placeholder="Enter PAN number"
// //                         disabled={isFieldDisabled('pan')}
// //                         onChange={(e) => {
// //                           const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
// //                           setFieldValue('panNumber', value.toUpperCase());
// //                         }}
// //                         maxLength="10"
// //                       />
// //                     )}
// //                   </div>

// //                   {/* Bank Details */}
// //                   <div className="space-y-4">
// //                     <h6 className="text-white text-lg font-semibold border-b border-white/30 pb-2">
// //                       Bank Details
// //                     </h6>

// //                     {isCountryCodeIndia && (
// //                       <Field name="upi_id">
// //                         {({ field, form }) => (
// //                           <CustomInput
// //                             field={field}
// //                             form={form}
// //                             label="UPI Number"
// //                             placeholder="Enter UPI number"
// //                             disabled={isFieldDisabled()}
// //                             onChange={(e) => {
// //                               const value = e.target.value.replace(/[^0-9]/g, '');
// //                               form.setFieldValue(field.name, value);
// //                             }}
// //                           />
// //                         )}
// //                       </Field>
// //                     )}

// //                     <Field name="bank_account">
// //                       {({ field, form }) => (
// //                         <CustomInput
// //                           field={field}
// //                           form={form}
// //                           label="Bank Account Number"
// //                           placeholder="Enter bank account number"
// //                           disabled={isFieldDisabled()}
// //                           onKeyPress={(event) => {
// //                             if (!/[0-9]/.test(event.key)) {
// //                               event.preventDefault();
// //                             }
// //                           }}
// //                         />
// //                       )}
// //                     </Field>

// //                     <Field name="bank_name">
// //                       {({ field, form }) => (
// //                         <CustomInput
// //                           field={field}
// //                           form={form}
// //                           label="Bank Name"
// //                           placeholder="Enter bank name"
// //                           disabled={isFieldDisabled()}
// //                           onChange={(e) => {
// //                             const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
// //                             form.setFieldValue(field.name, value);
// //                           }}
// //                         />
// //                       )}
// //                     </Field>

// //                     <Field name="ifsc_code">
// //                       {({ field, form }) => (
// //                         <CustomInput
// //                           field={field}
// //                           form={form}
// //                           label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
// //                           placeholder="Enter bank code"
// //                           disabled={isFieldDisabled()}
// //                           onChange={(e) => {
// //                             const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
// //                             form.setFieldValue(field.name, value.toUpperCase());
// //                           }}
// //                         />
// //                       )}
// //                     </Field>
// //                   </div>
// //                 </div>

// //                 {/* Submit Button */}
// //                 <div className="flex justify-end mt-8">
// //                   {(kycdata?.success !== 1 || 
// //                     kycdata?.data?.status == "reject" ||
// //                     (kycdata?.data?.status == "approve" && isEditClicked)) && (
// //                     <button
// //                       type="submit"
// //                       disabled={isSubmitting || loading}
// //                       className={`${
// //                         isSubmitting || loading
// //                           ? 'bg-gray-600 cursor-not-allowed'
// //                           : 'bg-gradient-to-r from-[#094e54] to-[#4ecdc4] hover:scale-105'
// //                       } text-white font-semibold text-sm px-14 py-3 rounded-full transition duration-300 min-w-[150px]`}
// //                     >
// //                       {isSubmitting || loading 
// //                         ? 'Processing...' 
// //                         : kycdata?.success !== 1 
// //                           ? 'Submit' 
// //                           : 'Update'
// //                       }
// //                     </button>
// //                   )}
// //                 </div>
// //               </Form>
// //             )}
// //           </Formik>
// //         </div>

// //         {/* Modal Placeholder */}
// //         {showModal && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //             <div className="bg-white rounded-lg p-6 max-w-md mx-4">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-4">DigiLocker Integration</h3>
// //               <p className="text-gray-600 mb-6">
// //                 Would you like to fetch your KYC data from DigiLocker to auto-fill the form?
// //               </p>
// //               <div className="flex gap-4 justify-end">
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowModal(false);
// //                     handleButtonClick();
// //                   }}
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //                 >
// //                   Fetch from DigiLocker
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default KycInformation;




// // import React, { useContext, useEffect, useRef, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import CryptoJS from "crypto-js";
// // import { useUserDataQuery } from '../dashBoard/DashboardApliSlice';
// // import { useKycaddMutation, useGetkycDetailsQuery, useGetKycDataMutation } from './kycApiSlice';
// // import digiLocker from "../../../../assets/digiLocker.svg";
// // import editIcon from "../../../../assets/edit.svg";
// // import showIcon from "../../../../assets/showIcon.svg";
// // import countryCodes from "../../../../Authentication/countryCodes.json";
// // const getValidationSchema = (isCountryCodeIndia, kycSuccess) => {
// //   return Yup.object().shape({
// //     applicantName: Yup.string()
// //       .min(2, 'Name must be at least 2 characters')
// //       .required('The applicant name field is mandatory.'),
    
// //     dob: isCountryCodeIndia 
// //       ? Yup.string().required('Date of birth is required') 
// //       : Yup.string(),
    
// //     mobile_number: Yup.string()
// //       .test('mobile-validation', 'The mobile number field is mandatory.', function(value) {
// //         if (!value) return false;
// //         const countryCode = this.parent.countryCode || 91;
// //         const prefix = `+${countryCode} `;
// //         return value.replace(prefix, '').trim().length > 0;
// //       }),
    
// //     address: Yup.string()
// //       .min(5, 'Address must be at least 5 characters')
// //       .required('The address field is mandatory.'),
    
// //     bank_name: Yup.string()
// //       .matches(/^[a-zA-Z\s]*$/, 'Bank name should only contain letters')
// //       .required('The bank name field is mandatory.'),
    
// //     ifsc_code: Yup.string()
// //       .matches(/^[a-zA-Z0-9]*$/, 'Invalid IFSC code format')
// //       .required(`The ${isCountryCodeIndia ? 'ifsc' : 'bank'} code field is mandatory.`),
    
// //     bank_account: Yup.string()
// //       .matches(/^\d+$/, 'Account number should only contain numbers')
// //       .required('The bank account field is mandatory.'),
    
// //     panNumber: isCountryCodeIndia 
// //       ? Yup.string()
// //           .matches(/^[a-zA-Z0-9]*$/, 'Invalid PAN format')
// //           .length(10, 'PAN must be 10 characters')
// //           .required('PAN number is required') 
// //       : Yup.string(),
    
// //     upi_id: isCountryCodeIndia 
// //       ? Yup.string().matches(/^[0-9]*$/, 'UPI should only contain numbers') 
// //       : Yup.string(),
// //     aadhar_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Aadhar doc front field is mandatory.') 
// //       : Yup.mixed(),
    
// //     aadhar_doc_back: (kycSuccess !== 1 && isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Aadhar doc back field is mandatory.') 
// //       : Yup.mixed(),
    
// //     pan_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Pan doc front field is mandatory.') 
// //       : Yup.mixed(),
    
// //     dl_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Driving License doc front field is mandatory.') 
// //       : Yup.mixed(),
    
// //     dl_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Driving License doc back field is mandatory.') 
// //       : Yup.mixed(),
    
// //     passport_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Passport doc front field is mandatory.') 
// //       : Yup.mixed(),
    
// //     passport_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
// //       ? Yup.mixed().required('The Passport doc back field is mandatory.') 
// //       : Yup.mixed(),
// //   });
// // };

// // const KycInformation = () => {
// //   const { data: userData } = useUserDataQuery();
// //   const location = useLocation();

// //   const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

// //   const [submitKyc] = useKycaddMutation();
// //   const [getKycData] = useGetKycDataMutation();
// //   const [loading, setLoading] = useState(false);
// //   const [enableFields, setEnableFields] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
// //   const [isEditClicked, setIsEditClicked] = useState(false);

// //   const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

// //   const docFrontRef = useRef(null);
// //   const doc1FrontRef = useRef(null);
// //   const docBackRef = useRef(null);
// //   const doc1BackRef = useRef(null);

// //   // Initial form values
// //   const getInitialValues = () => ({
// //     aadhar_doc_front: null,
// //     aadhar_doc_back: null,
// //     pan_doc_front: null,
// //     dl_doc_front: null,
// //     dl_doc_back: null,
// //     passport_doc_front: null,
// //     passport_doc_back: null,
// //     bank_name: kycdata?.data?.bank_name || "",
// //     applicantName: kycdata?.data?.name || userData?.data?.name || "",
// //     ifsc_code: kycdata?.data?.ifsc_code || "",
// //     mobile_number: kycdata?.data?.mobile_number 
// //       ? `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}`
// //       : `+${userData?.data?.countryCode || 91} `,
// //     upi_id: kycdata?.data?.upi_id || "",
// //     bank_account: kycdata?.data?.bank_account || "",
// //     address: kycdata?.data?.address || "",
// //     dob: kycdata?.data?.dob || "",
// //     panNumber: kycdata?.data?.panNumber || "",
// //     countryCode: userData?.data?.countryCode || 91
// //   });

// //   const getCountryName = () => {
// //     const countryCode = `+${userData?.data?.countryCode}`;
// //     const countryName = countryCodes.find(
// //       (country) => country.country_code == countryCode
// //     );
// //     return countryName?.country_name || "NA";
// //   };

// //   const getMaxLength = () => {
// //     return isCountryCodeIndia ? 14 : 19;
// //   };

// //   // Custom file input component
// //   const CustomFileInput = ({ field, form, label, accept = ".jpg,.jpeg,.png", disabled, showImageUrl, refProp, ...props }) => {
// //     const handleFileChange = (event) => {
// //       const file = event.currentTarget.files[0];
// //       if (file) {
// //         const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
// //         const invalidFile = !acceptedFormats.includes(file.type);
        
// //         if (invalidFile) {
// //           toast.warning("Only JPG / PNG files are allowed", {
// //             position: "top-center",
// //           });
// //           if (refProp?.current) {
// //             refProp.current.value = "";
// //           }
// //           return;
// //         }
        
// //         form.setFieldValue(field.name, file);
// //       }
// //     };

// //     return (
// //       <div className="mb-3">
// //         <label htmlFor={field.name} className="form-label text-white">
// //           {label} <span className="text-red-400">*</span>
// //           {showImageUrl && (
// //             <span className="ps-1">
// //               <button
// //                 type="button"
// //                 className="bg-transparent border-0"
// //                 onClick={() => {
// //                   const link = document.createElement("a");
// //                   link.href = showImageUrl;
// //                   link.target = "_blank";
// //                   link.rel = "noopener noreferrer";
// //                   link.click();
// //                 }}
// //               >
// //                 <img alt="showIcon" src={showIcon} className="w-4 h-4" />
// //               </button>
// //             </span>
// //           )}
// //         </label>
// //         <input
// //           type="file"
// //           accept={accept}
// //           className="form-control shadow-none bg-transparent"
// //           name={field.name}
// //           ref={refProp}
// //           onChange={handleFileChange}
// //           disabled={disabled}
// //           {...props}
// //         />
// //         <ErrorMessage name={field.name} component="p" className="error" />
// //       </div>
// //     );
// //   };

// //   // Custom input component
// //   const CustomInput = ({ field, form, label, disabled, maxLength, onKeyPress, ...props }) => {
// //     return (
// //       <div className="mb-3">
// //         <label htmlFor={field.name} className="form-label">
// //           {label} <span className="error">*</span>
// //         </label>
// //         <input
// //           {...field}
// //           {...props}
// //           className="form-control shadow-none bg-transparent"
// //           disabled={disabled}
// //           maxLength={maxLength}
// //           onKeyPress={onKeyPress}
// //           autoComplete="off"
// //         />
// //         <ErrorMessage name={field.name} component="p" className="error" />
// //       </div>
// //     );
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
// //     setLoading(true);
// //     try {
// //       const data = new FormData();

// //       // Handle file uploads based on KYC status and country
// //       if (kycdata?.success !== 1) {
// //         if (isCountryCodeIndia) {
// //           data.append("aadhar_doc_front", values.aadhar_doc_front);
// //           data.append("aadhar_doc_back", values.aadhar_doc_back);
// //           data.append("pan_doc_front", values.pan_doc_front);
// //           data.append("upi_id", values.upi_id);
// //           data.append("panNumber", values.panNumber);
// //           data.append("dob", values.dob);
// //         } else {
// //           data.append("dl_doc_front", values.dl_doc_front);
// //           data.append("dl_doc_back", values.dl_doc_back);
// //           data.append("passport_doc_front", values.passport_doc_front);
// //           data.append("passport_doc_back", values.passport_doc_back);
// //         }
// //       } else {
// //         // Handle updates for existing KYC
// //         if (docFrontRef.current?.value) {
// //           if (isCountryCodeIndia) {
// //             data.append("aadhar_doc_front", values.aadhar_doc_front);
// //           } else {
// //             data.append("dl_doc_front", values.dl_doc_front);
// //           }
// //         }
// //         if (docBackRef.current?.value) {
// //           if (isCountryCodeIndia) {
// //             data.append("aadhar_doc_back", values.aadhar_doc_back);
// //           } else {
// //             data.append("dl_doc_back", values.dl_doc_back);
// //           }
// //         }
// //         if (doc1FrontRef.current?.value) {
// //           if (isCountryCodeIndia) {
// //             data.append("pan_doc_front", values.pan_doc_front);
// //           } else {
// //             data.append("passport_doc_front", values.passport_doc_front);
// //           }
// //         }
// //         if (doc1BackRef?.current?.value) {
// //           if (!isCountryCodeIndia) {
// //             data.append("passport_doc_back", values.passport_doc_back);
// //           }
// //         }
// //         if (isCountryCodeIndia) {
// //           data.append("upi_id", values.upi_id);
// //           data.append("panNumber", values.panNumber);
// //           data.append("dob", values.dob);
// //         }
// //       }

// //       // Add common fields
// //       data.append("name", values.applicantName);
// //       data.append("bank_name", values.bank_name);
// //       data.append("ifsc_code", values.ifsc_code);
      
// //       if (values.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
// //         data.append(
// //           "mobile_number",
// //           values.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
// //         );
// //       }
      
// //       data.append("bank_account", values.bank_account);
// //       data.append("address", values.address);

// //       const response = await submitKyc(data);

// //       if (response?.data?.status_code === 200) {
// //         toast.success(response?.data.message, {
// //           position: "top-center",
// //         });
// //         refetch();
// //       } else {
// //         toast?.error(response?.error?.data?.message, {
// //           position: "top-center",
// //         });
// //       }
// //     } catch (error) {
// //       toast.error(error.message, {
// //         position: "top-center",
// //       });
// //     } finally {
// //       setLoading(false);
// //       setSubmitting(false);
// //     }
// //   };

// //   // Generate code verifier and challenge for DigiLocker
// //   const generateCodeVerifier = async () => {
// //     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
// //     const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
// //     let verifier = "";
// //     for (let i = 0; i < length; i++) {
// //       const randomIndex = Math.floor(Math.random() * characters.length);
// //       verifier += characters[randomIndex];
// //     }
// //     return verifier;
// //   };

// //   const generateCodeChallenge = (verifier) => {
// //     const hash = CryptoJS.SHA256(verifier);
// //     const base64Url = CryptoJS.enc.Base64.stringify(hash)
// //       .replace(/\+/g, "-")
// //       .replace(/\//g, "_")
// //       .replace(/=+$/, "");
// //     return base64Url;
// //   };

// //   const handleButtonClick = async () => {
// //     setLoading(true);
// //     try {
// //       const verifier = await generateCodeVerifier();
// //       const challenge = await generateCodeChallenge(verifier);
      
// //       let origin = window.location.origin;
// //       let redirectURI = "http://localhost:3000/kyc"; // Default for development
// //       let clientId = "your-client-id"; // Replace with actual client ID
      
// //       if (origin && (origin.includes("5173") || origin.includes("5174"))) {
// //         redirectURI = process.env.DL_REDIRECT_URI_DEV;
// //         clientId = process.env.DL_CLIENT_ID_DEV;
// //       } else if (window.location.origin === "https://jaimax.com") {
// //         redirectURI = process.env.DL_REDIRECT_URI_PROD;
// //         clientId = process.env.DL_CLIENT_ID_PROD;
// //       } else {
// //         redirectURI = process.env.DL_REDIRECT_URI_QA;
// //         clientId = process.env.DL_CLIENT_ID_QA;
// //       }

// //       localStorage.setItem("verifier", verifier);
// //       localStorage.removeItem("processed");
      
// //       const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
// //       window.open(apiUrl.toString(), "_self");
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onClickEdit = () => {
// //     setIsEditClicked(true);
// //   };

// //   // Handle DigiLocker response
// //   useEffect(() => {
// //     const queryParams = new URLSearchParams(location.search);
// //     const extractedCode = queryParams.get("code");
    
// //     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
// //     window.history.replaceState(null, "", newUrl);
    
// //     if (extractedCode && !localStorage.getItem("processed")) {
// //       localStorage.setItem("processed", "true");
      
// //       const payload = {
// //         code: extractedCode,
// //         verifier: localStorage.getItem("verifier"),
// //       };

// //       setLoading(true);
// //       const postTokenRequest = async () => {
// //         try {
// //           const response = await getKycData(payload).unwrap();
// //           if (response.data) {
// //             setEnableFields(true);
// //             setDisableFieldsAfterKYC(true);
// //             setIsEditClicked(true);
// //             setShowModal(false);
// //           }
// //         } catch (error) {
// //           console.log(error);
// //         } finally {
// //           setLoading(false);
// //           localStorage.removeItem("code");
// //           localStorage.removeItem("verifier");
// //         }
// //       };

// //       postTokenRequest();
// //     }
// //   }, [getKycData]);

// //   useEffect(() => {
// //     refetch();
// //   }, [refetch]);

// //   useEffect(() => {
// //     if (kycdata?.success == 1) {
// //       setEnableFields(true);
// //       setDisableFieldsAfterKYC(true);
      
// //       if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
// //         setShowModal(true);
// //       } else {
// //         setShowModal(false);
// //       }
// //     } else {
// //       if (isCountryCodeIndia && !(isLoading || loading)) {
// //         setShowModal(true);
// //       }
// //     }
// //   }, [userData, kycdata, isLoading, loading, isCountryCodeIndia]);

// //   const isFieldDisabled = (fieldType = 'normal') => {
// //     const baseDisabled = (!enableFields && isCountryCodeIndia) || 
// //                         kycdata?.data?.status === "open" || 
// //                         (kycdata?.data?.status == "approve" && !isEditClicked);
    
// //     if (fieldType === 'pan') {
// //       return baseDisabled || disableFieldsAfterKYC;
// //     }
    
// //     return baseDisabled;
// //   };

// //   if (isLoading || loading) {
// //     return (
// //       <section className="profile_section py-4 kycSection">
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-12">
// //               <div className="my_total_team_data rounded-3 py-4">
// //                 <div className="d-flex justify-content-center align-items-center">
// //                   <div className="text-white text-xl">Loading...</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     );
// //   }

// //   return (
// //     <section className="profile_section py-4 kycSection">
// //       <div className="container-fluid">
// //         <div className="row">
// //           <div className="col-12">
// //             <div className="my_total_team_data rounded-3 py-4">
              
// //               <div className="d-flex justify-content-between pb-2">
// //                 <div className="d-flex">
// //                   <h1 className="text-white m-0 my-auto pe-2">
// //                     KYC Information
// //                   </h1>
// //                   <p className="error my-auto text-white pe-1 pe-md-0 pe-lg-0">
// //                     {kycdata?.data?.status !== "approve" &&
// //                       "(Fill up information and verify your KYC.)"}
// //                   </p>
// //                 </div>

// //                 <h6 className="text-white my-auto countryDisplay">
// //                   Country :{" "}
// //                   <span className="ps-2">
// //                     {!userData?.data?.country ||
// //                     userData?.data?.country === "N/A"
// //                       ? getCountryName()
// //                       : userData?.data?.country}
// //                   </span>
// //                 </h6>

// //                 {isCountryCodeIndia &&
// //                   ((kycdata?.data?.status !== "open" &&
// //                     kycdata?.data?.status !== "approve") ||
// //                     (kycdata?.data?.status == "approve" &&
// //                       isEditClicked)) && (
// //                     <div>
// //                       <button
// //                         type="button"
// //                         className="border-0 bg-transparent"
// //                         id="renderBtn"
// //                         onClick={handleButtonClick}
// //                       >
// //                         <img
// //                           src={digiLocker}
// //                           alt="digiLockerIcon"
// //                           className="img-fluid"
// //                         />
// //                       </button>
// //                     </div>
// //                   )}
// //               </div>

// //               {/* Form */}
// //               <Formik
// //                 initialValues={getInitialValues()}
// //                 validationSchema={getValidationSchema(isCountryCodeIndia, kycdata?.success)}
// //                 onSubmit={handleSubmit}
// //                 enableReinitialize={true}
// //               >
// //                 {({ values, setFieldValue, isSubmitting }) => (
// //                   <Form className="row justify-content-between">
// //                     <div className="d-flex flex-wrap justify-content-between pb-2">
// //                       <div className="d-flex">
// //                         {kycdata?.data?.status === "approve" && (
// //                           <button
// //                             type="button"
// //                             className="bg-transparent border-0 pe-2 mb-0"
// //                             onClick={onClickEdit}
// //                           >
// //                             <img alt="edit" src={editIcon} />
// //                           </button>
// //                         )}
// //                         <p className="m-0 my-auto">
// //                           KYC status:{" "}
// //                           <span
// //                             className="text-capitalize"
// //                             style={{
// //                               color:
// //                                 kycdata?.data?.status === "open"
// //                                   ? "#ff8a00"
// //                                   : kycdata?.data?.status === "approve"
// //                                   ? "green"
// //                                   : kycdata?.data?.status === "inprogress"
// //                                   ? "blue"
// //                                   : "red",
// //                               fontFamily: "MontserratBold",
// //                             }}
// //                           >
// //                             {kycdata?.data?.status === "open"
// //                               ? "In Open"
// //                               : kycdata?.data?.status === "approve"
// //                               ? "Approved"
// //                               : kycdata?.data?.status === "inprogress"
// //                               ? "In Progress"
// //                               : kycdata?.data?.status === "reject"
// //                               ? "Rejected"
// //                               : "N/A"}
// //                           </span>
// //                         </p>
// //                         {kycdata && kycdata?.data?.status === "reject" && (
// //                           <p className="m-0 my-auto ps-3">
// //                             Reason:{" "}
// //                             <span
// //                               style={{
// //                                 color: "red",
// //                                 fontFamily: "MontserratBold",
// //                               }}
// //                             >
// //                               {kycdata?.data?.reason}
// //                             </span>
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Applicant Info */}
// //                     <div className="col-12 col-md-4">
// //                       <h6 className="m-0 text-white mainTitles pb-2">
// //                         Applicant Info
// //                       </h6>

// //                       <Field
// //                         name="applicantName"
// //                         component={CustomInput}
// //                         label="Name of the Applicant"
// //                         disabled={true}
// //                         readOnly={true}
// //                       />

// //                       {isCountryCodeIndia && (
// //                         <Field
// //                           name="dob"
// //                           component={CustomInput}
// //                           label="Date of Birth"
// //                           disabled={true}
// //                           readOnly={true}
// //                         />
// //                       )}

// //                       <Field name="mobile_number">
// //                         {({ field, form }) => (
// //                           <CustomInput
// //                             field={field}
// //                             form={form}
// //                             label="Mobile Number (As per Bank)"
// //                             placeholder="Enter mobile number"
// //                             maxLength={getMaxLength()}
// //                             disabled={isFieldDisabled()}
// //                             onKeyPress={(event) => {
// //                               if (!/[0-9]/.test(event.key)) {
// //                                 event.preventDefault();
// //                               }
// //                             }}
// //                             onChange={(e) => {
// //                               const value = e.target.value;
// //                               if (value.startsWith(`+${userData?.data?.countryCode} `)) {
// //                                 form.setFieldValue(field.name, value);
// //                               }
// //                             }}
// //                           />
// //                         )}
// //                       </Field>

// //                       <Field
// //                         name="address"
// //                         component={CustomInput}
// //                         label="Address"
// //                         placeholder="Enter your address"
// //                         disabled={isFieldDisabled()}
// //                       />
// //                     </div>

// //                     {/* Applicant Proofs */}
// //                     <div className="col-12 col-md-4">
// //                       <h6 className="m-0 text-white mainTitles pb-2">
// //                         Applicant Proofs
// //                       </h6>

// //                       <Field
// //                         name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
// //                         component={CustomFileInput}
// //                         label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
// //                         disabled={isFieldDisabled()}
// //                         showImageUrl={
// //                           kycdata?.success &&
// //                           (isCountryCodeIndia
// //                             ? kycdata.data?.aadhar_doc_front
// //                             : kycdata.data?.dl_doc_front)
// //                         }
// //                         refProp={docFrontRef}
// //                       />

// //                       <Field
// //                         name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
// //                         component={CustomFileInput}
// //                         label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
// //                         disabled={isFieldDisabled()}
// //                         showImageUrl={
// //                           kycdata?.success &&
// //                           (isCountryCodeIndia
// //                             ? kycdata.data?.aadhar_doc_back
// //                             : kycdata.data?.dl_doc_back)
// //                         }
// //                         refProp={docBackRef}
// //                       />

// //                       <Field
// //                         name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
// //                         component={CustomFileInput}
// //                         label={isCountryCodeIndia ? "PAN" : "Passport Front"}
// //                         disabled={isFieldDisabled()}
// //                         showImageUrl={
// //                           kycdata?.success &&
// //                           (isCountryCodeIndia
// //                             ? kycdata.data?.pan_doc_front
// //                             : kycdata.data?.passport_doc_front)
// //                         }
// //                         refProp={doc1FrontRef}
// //                       />

// //                       {!isCountryCodeIndia && (
// //                         <Field
// //                           name="passport_doc_back"
// //                           component={CustomFileInput}
// //                           label="Passport Back"
// //                           disabled={isFieldDisabled()}
// //                           showImageUrl={kycdata?.success && kycdata.data?.passport_doc_back}
// //                           refProp={doc1BackRef}
// //                         />
// //                       )}

// //                       {isCountryCodeIndia && (
// //                         <Field name="panNumber">
// //                           {({ field, form }) => (
// //                             <CustomInput
// //                               field={field}
// //                               form={form}
// //                               label="PAN Number"
// //                               placeholder="Enter PAN number"
// //                               disabled={isFieldDisabled('pan')}
// //                               onChange={(e) => {
// //                                 const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
// //                                 form.setFieldValue(field.name, value.toUpperCase());
// //                               }}
// //                               maxLength="10"
// //                             />
// //                           )}
// //                         </Field>
// //                       )}
// //                     </div>

// //                     {/* Bank Details */}
// //                     <div className="col-12 col-md-4">
// //                       <h6 className="m-0 text-white mainTitles pb-2">
// //                         Bank Details
// //                       </h6>

// //                       {isCountryCodeIndia && (
// //                         <Field name="upi_id">
// //                           {({ field, form }) => (
// //                             <CustomInput
// //                               field={field}
// //                               form={form}
// //                               label="UPI Number"
// //                               placeholder="Enter UPI number"
// //                               disabled={isFieldDisabled()}
// //                               onChange={(e) => {
// //                                 const value = e.target.value.replace(/[^0-9]/g, '');
// //                                 form.setFieldValue(field.name, value);
// //                               }}
// //                             />
// //                           )}
// //                         </Field>
// //                       )}

// //                       <Field name="bank_account">
// //                         {({ field, form }) => (
// //                           <CustomInput
// //                             field={field}
// //                             form={form}
// //                             label="Bank Account Number"
// //                             placeholder="Enter bank account number"
// //                             disabled={isFieldDisabled()}
// //                             onKeyPress={(event) => {
// //                               if (!/[0-9]/.test(event.key)) {
// //                                 event.preventDefault();
// //                               }
// //                             }}
// //                           />
// //                         )}
// //                       </Field>

// //                       <Field name="bank_name">
// //                         {({ field, form }) => (
// //                           <CustomInput
// //                             field={field}
// //                             form={form}
// //                             label="Bank Name"
// //                             placeholder="Enter bank name"
// //                             disabled={isFieldDisabled()}
// //                             onChange={(e) => {
// //                               const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
// //                               form.setFieldValue(field.name, value);
// //                             }}
// //                           />
// //                         )}
// //                       </Field>

// //                       <Field name="ifsc_code">
// //                         {({ field, form }) => (
// //                           <CustomInput
// //                             field={field}
// //                             form={form}
// //                             label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
// //                             placeholder="Enter bank code"
// //                             disabled={isFieldDisabled()}
// //                             onChange={(e) => {
// //                               const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
// //                               form.setFieldValue(field.name, value.toUpperCase());
// //                             }}
// //                           />
// //                         )}
// //                       </Field>
// //                     </div>

// //                     {/* Submit Button */}
// //                     <div className="row justify-content-end">
// //                       {kycdata?.success !== 1 && (
// //                         <div className="col-12 col-md-4">
// //                           <div className="submit_btn text-end">
// //                             <button
// //                               type="submit"
// //                               disabled={isSubmitting || loading}
// //                               className="border-0 revolutionBtn"
// //                             >
// //                               {isSubmitting || loading ? 'Processing...' : 'Submit'}
// //                             </button>
// //                           </div>
// //                         </div>
// //                       )}
// //                       {(kycdata?.data?.status == "reject" ||
// //                         (kycdata?.data?.status == "approve" && isEditClicked)) && (
// //                         <div className="col-12 col-md-4">
// //                           <div className="submit_btn text-end">
// //                             <button
// //                               type="submit"
// //                               disabled={isSubmitting || loading}
// //                               className="border-0 revolutionBtn w-100"
// //                             >
// //                               {isSubmitting || loading ? 'Processing...' : 'Update'}
// //                             </button>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </Form>
// //                 )}
// //               </Formik>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal */}
// //       {showModal && (
// //         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
// //           <div className="modal-dialog modal-dialog-centered">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">DigiLocker Integration</h5>
// //                 <button
// //                   type="button"
// //                   className="btn-close"
// //                   onClick={() => setShowModal(false)}
// //                 ></button>
// //               </div>
// //               <div className="modal-body">
// //                 <p className="text-gray-600">
// //                   Would you like to fetch your KYC data from DigiLocker to auto-fill the form?
// //                 </p>
// //               </div>
// //               <div className="modal-footer">
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={() => setShowModal(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="btn btn-primary"
// //                   onClick={() => {
// //                     setShowModal(false);
// //                     handleButtonClick();
// //                   }}
// //                 >
// //                   Fetch from DigiLocker
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default KycInformation;




// import React, { useContext, useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import CryptoJS from "crypto-js";
// import { useUserDataQuery } from '../dashBoard/DashboardApliSlice';
// import { useKycaddMutation, useGetkycDetailsQuery, useGetKycDataMutation } from './kycApiSlice';
// import { Eye, Edit3, Upload, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
// import countryCodes from "../../../../Authentication/countryCodes.json";

// const getValidationSchema = (isCountryCodeIndia, kycSuccess) => {
//   return Yup.object().shape({
//     applicantName: Yup.string()
//       .min(2, 'Name must be at least 2 characters')
//       .required('The applicant name field is mandatory.'),
    
//     dob: isCountryCodeIndia 
//       ? Yup.string().required('Date of birth is required') 
//       : Yup.string(),
    
//     mobile_number: Yup.string()
//       .test('mobile-validation', 'The mobile number field is mandatory.', function(value) {
//         if (!value) return false;
//         const countryCode = this.parent.countryCode || 91;
//         const prefix = `+${countryCode} `;
//         return value.replace(prefix, '').trim().length > 0;
//       }),
    
//     address: Yup.string()
//       .min(5, 'Address must be at least 5 characters')
//       .required('The address field is mandatory.'),
    
//     bank_name: Yup.string()
//       .matches(/^[a-zA-Z\s]*$/, 'Bank name should only contain letters')
//       .required('The bank name field is mandatory.'),
    
//     ifsc_code: Yup.string()
//       .matches(/^[a-zA-Z0-9]*$/, 'Invalid IFSC code format')
//       .required(`The ${isCountryCodeIndia ? 'ifsc' : 'bank'} code field is mandatory.`),
    
//     bank_account: Yup.string()
//       .matches(/^\d+$/, 'Account number should only contain numbers')
//       .required('The bank account field is mandatory.'),
    
//     panNumber: isCountryCodeIndia 
//       ? Yup.string()
//           .matches(/^[a-zA-Z0-9]*$/, 'Invalid PAN format')
//           .length(10, 'PAN must be 10 characters')
//           .required('PAN number is required') 
//       : Yup.string(),
    
//     upi_id: isCountryCodeIndia 
//       ? Yup.string().matches(/^[0-9]*$/, 'UPI should only contain numbers') 
//       : Yup.string(),
//     aadhar_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
//       ? Yup.mixed().required('The Aadhar doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     aadhar_doc_back: (kycSuccess !== 1 && isCountryCodeIndia) 
//       ? Yup.mixed().required('The Aadhar doc back field is mandatory.') 
//       : Yup.mixed(),
    
//     pan_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
//       ? Yup.mixed().required('The Pan doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     dl_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Driving License doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     dl_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Driving License doc back field is mandatory.') 
//       : Yup.mixed(),
    
//     passport_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Passport doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     passport_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Passport doc back field is mandatory.') 
//       : Yup.mixed(),
//   });
// };

// const KycInformation = () => {
//   const { data: userData } = useUserDataQuery();
//   const location = useLocation();

//   const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

//   const [submitKyc] = useKycaddMutation();
//   const [getKycData] = useGetKycDataMutation();
//   const [loading, setLoading] = useState(false);
//   const [enableFields, setEnableFields] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
//   const [isEditClicked, setIsEditClicked] = useState(false);

//   const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

//   const docFrontRef = useRef(null);
//   const doc1FrontRef = useRef(null);
//   const docBackRef = useRef(null);
//   const doc1BackRef = useRef(null);

//   // Initial form values
//   const getInitialValues = () => ({
//     aadhar_doc_front: null,
//     aadhar_doc_back: null,
//     pan_doc_front: null,
//     dl_doc_front: null,
//     dl_doc_back: null,
//     passport_doc_front: null,
//     passport_doc_back: null,
//     bank_name: kycdata?.data?.bank_name || "",
//     applicantName: kycdata?.data?.name || userData?.data?.name || "",
//     ifsc_code: kycdata?.data?.ifsc_code || "",
//     mobile_number: kycdata?.data?.mobile_number 
//       ? `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}`
//       : `+${userData?.data?.countryCode || 91} `,
//     upi_id: kycdata?.data?.upi_id || "",
//     bank_account: kycdata?.data?.bank_account || "",
//     address: kycdata?.data?.address || "",
//     dob: kycdata?.data?.dob || "",
//     panNumber: kycdata?.data?.panNumber || "",
//     countryCode: userData?.data?.countryCode || 91
//   });

//   const getCountryName = () => {
//     const countryCode = `+${userData?.data?.countryCode}`;
//     const countryName = countryCodes.find(
//       (country) => country.country_code == countryCode
//     );
//     return countryName?.country_name || "NA";
//   };

//   const getMaxLength = () => {
//     return isCountryCodeIndia ? 14 : 19;
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       approve: 'text-green-500',
//       reject: 'text-red-500',
//       open: 'text-orange-500',
//       inprogress: 'text-blue-500'
//     };
//     return colors[status] || 'text-gray-500';
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       approve: <CheckCircle className="w-4 h-4 text-green-500" />,
//       reject: <XCircle className="w-4 h-4 text-red-500" />,
//       open: <AlertCircle className="w-4 h-4 text-orange-500" />,
//       inprogress: <Clock className="w-4 h-4 text-blue-500" />
//     };
//     return icons[status] || <Clock className="w-4 h-4 text-gray-500" />;
//   };

//   const getStatusText = (status) => {
//     const texts = {
//       approve: 'Approved',
//       reject: 'Rejected',
//       open: 'In Open',
//       inprogress: 'In Progress'
//     };
//     return texts[status] || 'N/A';
//   };

//   // Custom file input component
//   const CustomFileInput = ({ field, form, label, accept = ".jpg,.jpeg,.png", disabled, showImageUrl, refProp, ...props }) => {
//     const handleFileChange = (event) => {
//       const file = event.currentTarget.files[0];
//       if (file) {
//         const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
//         const invalidFile = !acceptedFormats.includes(file.type);
        
//         if (invalidFile) {
//           toast.warning("Only JPG / PNG files are allowed", {
//             position: "top-center",
//           });
//           if (refProp?.current) {
//             refProp.current.value = "";
//           }
//           return;
//         }
        
//         form.setFieldValue(field.name, file);
//       }
//     };

//     return (
//       <div className="mb-4">
//         <label className="block text-white text-xs font-medium mb-1.5">
//           {label} <span className="text-red-400">*</span>
//           {showImageUrl && (
//             <button
//               type="button"
//               className="ml-1 inline-flex items-center text-[#1d8e85] hover:text-[#1d8e85]/80 transition-colors"
//             >
//               {/* <Eye className="w-3 h-3" /> */}
//             </button>
//           )}
//         </label>
//         <div className={`relative border border-dashed rounded-md p-1 transition-all duration-200 ${
//           disabled 
//             ? 'border-gray-600 bg-gray-800 cursor-not-allowed' 
//             : 'border-gray-600 hover:border-[#1d8e85] bg-transparent cursor-pointer'
//         }`}>

//           <input
//             type="file"
//             accept={accept}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             name={field.name}
//             ref={refProp}
//             onChange={handleFileChange}
//             disabled={disabled}
//             {...props}
//           />
//         </div>
//         <ErrorMessage name={field.name} component="p" className="text-red-400 text-xs mt-1" />
//       </div>
//     );
//   };

//   // Custom input component
//   const CustomInput = ({ field, form, label, disabled, maxLength, onKeyPress, ...props }) => {
//     return (
//       <div className="mb-4">
//         <label className="block text-white text-xs font-medium mb-1.5">
//           {label} <span className="text-red-400">*</span>
//         </label>
//         <input
//           {...field}
//           {...props}
//           className={`w-full px-3 py-2 text-sm rounded-md border transition-all duration-200 ${
//             disabled 
//               ? 'bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed' 
//               : 'bg-transparent border-gray-600 text-white focus:border-[#1d8e85] focus:ring-1 focus:ring-[#1d8e85]/20'
//           } focus:outline-none`}
//           disabled={disabled}
//           maxLength={maxLength}
//           onKeyPress={onKeyPress}
//           autoComplete="off"
//         />
//         <ErrorMessage name={field.name} component="p" className="text-red-400 text-xs mt-1" />
//       </div>
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
//     setLoading(true);
//     try {
//       const data = new FormData();

//       // Handle file uploads based on KYC status and country
//       if (kycdata?.success !== 1) {
//         if (isCountryCodeIndia) {
//           data.append("aadhar_doc_front", values.aadhar_doc_front);
//           data.append("aadhar_doc_back", values.aadhar_doc_back);
//           data.append("pan_doc_front", values.pan_doc_front);
//           data.append("upi_id", values.upi_id);
//           data.append("panNumber", values.panNumber);
//           data.append("dob", values.dob);
//         } else {
//           data.append("dl_doc_front", values.dl_doc_front);
//           data.append("dl_doc_back", values.dl_doc_back);
//           data.append("passport_doc_front", values.passport_doc_front);
//           data.append("passport_doc_back", values.passport_doc_back);
//         }
//       } else {
//         // Handle updates for existing KYC
//         if (docFrontRef.current?.value) {
//           if (isCountryCodeIndia) {
//             data.append("aadhar_doc_front", values.aadhar_doc_front);
//           } else {
//             data.append("dl_doc_front", values.dl_doc_front);
//           }
//         }
//         if (docBackRef.current?.value) {
//           if (isCountryCodeIndia) {
//             data.append("aadhar_doc_back", values.aadhar_doc_back);
//           } else {
//             data.append("dl_doc_back", values.dl_doc_back);
//           }
//         }
//         if (doc1FrontRef.current?.value) {
//           if (isCountryCodeIndia) {
//             data.append("pan_doc_front", values.pan_doc_front);
//           } else {
//             data.append("passport_doc_front", values.passport_doc_front);
//           }
//         }
//         if (doc1BackRef?.current?.value) {
//           if (!isCountryCodeIndia) {
//             data.append("passport_doc_back", values.passport_doc_back);
//           }
//         }
//         if (isCountryCodeIndia) {
//           data.append("upi_id", values.upi_id);
//           data.append("panNumber", values.panNumber);
//           data.append("dob", values.dob);
//         }
//       }

//       // Add common fields
//       data.append("name", values.applicantName);
//       data.append("bank_name", values.bank_name);
//       data.append("ifsc_code", values.ifsc_code);
      
//       if (values.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
//         data.append(
//           "mobile_number",
//           values.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
//         );
//       }
      
//       data.append("bank_account", values.bank_account);
//       data.append("address", values.address);

//       const response = await submitKyc(data);

//       if (response?.data?.status_code === 200) {
//         toast.success(response?.data.message, {
//           position: "top-center",
//         });
//         refetch();
//       } else {
//         toast?.error(response?.error?.data?.message, {
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       toast.error(error.message, {
//         position: "top-center",
//       });
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   // Generate code verifier and challenge for DigiLocker
//   const generateCodeVerifier = async () => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
//     const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
//     let verifier = "";
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       verifier += characters[randomIndex];
//     }
//     return verifier;
//   };

//   const generateCodeChallenge = (verifier) => {
//     const hash = CryptoJS.SHA256(verifier);
//     const base64Url = CryptoJS.enc.Base64.stringify(hash)
//       .replace(/\+/g, "-")
//       .replace(/\//g, "_")
//       .replace(/=+$/, "");
//     return base64Url;
//   };

//   const handleButtonClick = async () => {
//     setLoading(true);
//     try {
//       const verifier = await generateCodeVerifier();
//       const challenge = await generateCodeChallenge(verifier);
      
//       let origin = window.location.origin;
//       let redirectURI = "http://localhost:3000/kyc"; // Default for development
//       let clientId = "your-client-id"; // Replace with actual client ID
      
//       if (origin && (origin.includes("5173") || origin.includes("5174"))) {
//         redirectURI = process.env.DL_REDIRECT_URI_DEV;
//         clientId = process.env.DL_CLIENT_ID_DEV;
//       } else if (window.location.origin === "https://jaimax.com") {
//         redirectURI = process.env.DL_REDIRECT_URI_PROD;
//         clientId = process.env.DL_CLIENT_ID_PROD;
//       } else {
//         redirectURI = process.env.DL_REDIRECT_URI_QA;
//         clientId = process.env.DL_CLIENT_ID_QA;
//       }

//       localStorage.setItem("verifier", verifier);
//       localStorage.removeItem("processed");
      
//       const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
//       window.open(apiUrl.toString(), "_self");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onClickEdit = () => {
//     setIsEditClicked(true);
//   };

//   // Handle DigiLocker response
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const extractedCode = queryParams.get("code");
    
//     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
//     window.history.replaceState(null, "", newUrl);
    
//     if (extractedCode && !localStorage.getItem("processed")) {
//       localStorage.setItem("processed", "true");
      
//       const payload = {
//         code: extractedCode,
//         verifier: localStorage.getItem("verifier"),
//       };

//       setLoading(true);
//       const postTokenRequest = async () => {
//         try {
//           const response = await getKycData(payload).unwrap();
//           if (response.data) {
//             setEnableFields(true);
//             setDisableFieldsAfterKYC(true);
//             setIsEditClicked(true);
//             setShowModal(false);
//           }
//         } catch (error) {
//           console.log(error);
//         } finally {
//           setLoading(false);
//           localStorage.removeItem("code");
//           localStorage.removeItem("verifier");
//         }
//       };

//       postTokenRequest();
//     }
//   }, [getKycData]);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     if (kycdata?.success == 1) {
//       setEnableFields(true);
//       setDisableFieldsAfterKYC(true);
      
//       if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
//         setShowModal(true);
//       } else {
//         setShowModal(false);
//       }
//     } else {
//       if (isCountryCodeIndia && !(isLoading || loading)) {
//         setShowModal(true);
//       }
//     }
//   }, [userData, kycdata, isLoading, loading, isCountryCodeIndia]);

//   const isFieldDisabled = (fieldType = 'normal') => {
//     const baseDisabled = (!enableFields && isCountryCodeIndia) || 
//                         kycdata?.data?.status === "open" || 
//                         (kycdata?.data?.status == "approve" && !isEditClicked);
    
//     if (fieldType === 'pan') {
//       return baseDisabled || disableFieldsAfterKYC;
//     }
    
//     return baseDisabled;
//   };

//   if (isLoading || loading) {
//     return (
//       <div className="min-h-screen bg-[#1d8e85] flex items-center justify-center">
//         <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//             <div className="text-center">
//               <h3 className="text-white font-semibold mb-1">Loading...</h3>
//               <p className="text-gray-300 text-sm">Please wait while we load your KYC information</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#1d8e85] py-6">
//       <div className="container mx-auto px-4">
//         <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
//           {/* Header */}
//           <div className="p-5 border-b border-gray-700">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <h1 className="text-xl lg:text-2xl font-bold text-white">
//                   KYC Information
//                 </h1>
//                 {kycdata?.data?.status !== "approve" && (
//                   <p className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded-full">
//                     Fill up information and verify your KYC
//                   </p>
//                 )}
//               </div>
              
//               <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                 <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg">
//                   <span className="text-white text-xs font-medium">
//                     Country: <span className="text-white font-semibold">
//                       {!userData?.data?.country || userData?.data?.country === "N/A"
//                         ? getCountryName()
//                         : userData?.data?.country}
//                     </span>
//                   </span>
//                 </div>
                
//                 {isCountryCodeIndia &&
//                   ((kycdata?.data?.status !== "open" &&
//                     kycdata?.data?.status !== "approve") ||
//                     (kycdata?.data?.status == "approve" &&
//                       isEditClicked)) && (
//                   <button
//                     onClick={handleButtonClick}
//                     className="bg-white hover:bg-white/90 text-[#1d8e85] px-4 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
//                   >
//                     DigiLocker
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Status Section */}
//           <div className="p-5 border-b border-gray-700">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div className="flex items-center gap-3 flex-wrap">
//                 {kycdata?.data?.status === "approve" && (
//                   <button
//                     onClick={onClickEdit}
//                     className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors"
//                   >
//                     <Edit3 className="w-3 h-3" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                 )}
                
//                 <div className="flex items-center gap-2">
//                   {getStatusIcon(kycdata?.data?.status)}
//                   <span className="text-white font-medium text-sm">KYC Status:</span>
//                   <span className={`font-bold text-sm ${getStatusColor(kycdata?.data?.status)}`}>
//                     {getStatusText(kycdata?.data?.status)}
//                   </span>
//                 </div>
                
//                 {kycdata?.data?.status === "reject" && (
//                   <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-2 py-1 rounded-lg">
//                     <span className="text-white text-xs">Reason:</span>
//                     <span className="text-red-400 font-medium text-xs">{kycdata?.data?.reason}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <Formik
//             initialValues={getInitialValues()}
//             validationSchema={getValidationSchema(isCountryCodeIndia, kycdata?.success)}
//             onSubmit={handleSubmit}
//             enableReinitialize={true}
//           >
//             {({ values, setFieldValue, isSubmitting }) => (
//               <Form className="p-5">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
//                   {/* Applicant Info */}
//                   <div className="space-y-4">
//                     <div className="border-l-3 border-white pl-3">
//                       <h2 className="text-lg font-bold text-white mb-4">Applicant Info</h2>
//                     </div>
                    
//                     <Field
//                       name="applicantName"
//                       component={CustomInput}
//                       label="Name of the Applicant"
//                       disabled={true}
//                     />
                    
//                     {isCountryCodeIndia && (
//                       <Field
//                         name="dob"
//                         component={CustomInput}
//                         label="Date of Birth"
//                         disabled={true}
//                         type="date"
//                       />
//                     )}
                    
//                     <Field name="mobile_number">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label="Mobile Number (As per Bank)"
//                           placeholder="Enter mobile number"
//                           maxLength={getMaxLength()}
//                           disabled={isFieldDisabled()}
//                           onKeyPress={(event) => {
//                             if (!/[0-9]/.test(event.key)) {
//                               event.preventDefault();
//                             }
//                           }}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value.startsWith(`+${userData?.data?.countryCode} `)) {
//                               form.setFieldValue(field.name, value);
//                             }
//                           }}
//                         />
//                       )}
//                     </Field>
                    
//                     <Field
//                       name="address"
//                       component={CustomInput}
//                       label="Address"
//                       placeholder="Enter your address"
//                       disabled={isFieldDisabled()}
//                     />
//                   </div>

//                   {/* Applicant Proofs */}
//                   <div className="space-y-4">
//                     <div className="border-l-3 border-white pl-3">
//                       <h2 className="text-lg font-bold text-white mb-4">Applicant Proofs</h2>
//                     </div>
                    
//                     <Field
//                       name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
//                       component={CustomFileInput}
//                       label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
//                       disabled={isFieldDisabled()}
//                       showImageUrl={
//                         kycdata?.success &&
//                         (isCountryCodeIndia
//                           ? kycdata.data?.aadhar_doc_front
//                           : kycdata.data?.dl_doc_front)
//                       }
//                       refProp={docFrontRef}
//                     />
                    
//                     <Field
//                       name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
//                       component={CustomFileInput}
//                       label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
//                       disabled={isFieldDisabled()}
//                       showImageUrl={
//                         kycdata?.success &&
//                         (isCountryCodeIndia
//                           ? kycdata.data?.aadhar_doc_back
//                           : kycdata.data?.dl_doc_back)
//                       }
//                       refProp={docBackRef}
//                     />
                    
//                     <Field
//                       name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
//                       component={CustomFileInput}
//                       label={isCountryCodeIndia ? "PAN" : "Passport Front"}
//                       disabled={isFieldDisabled()}
//                       showImageUrl={
//                         kycdata?.success &&
//                         (isCountryCodeIndia
//                           ? kycdata.data?.pan_doc_front
//                           : kycdata.data?.passport_doc_front)
//                       }
//                       refProp={doc1FrontRef}
//                     />
                    
//                     {!isCountryCodeIndia && (
//                       <Field
//                         name="passport_doc_back"
//                         component={CustomFileInput}
//                         label="Passport Back"
//                         disabled={isFieldDisabled()}
//                         showImageUrl={kycdata?.success && kycdata.data?.passport_doc_back}
//                         refProp={doc1BackRef}
//                       />
//                     )}
                    
//                     {isCountryCodeIndia && (
//                       <Field name="panNumber">
//                         {({ field, form }) => (
//                           <CustomInput
//                             field={field}
//                             form={form}
//                             label="PAN Number"
//                             placeholder="Enter PAN number"
//                             disabled={isFieldDisabled('pan')}
//                             onChange={(e) => {
//                               const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
//                               form.setFieldValue(field.name, value.toUpperCase());
//                             }}
//                             maxLength="10"
//                           />
//                         )}
//                       </Field>
//                     )}
//                   </div>

//                   {/* Bank Details */}
//                   <div className="space-y-4">
//                     <div className="border-l-3 border-white pl-3">
//                       <h2 className="text-lg font-bold text-white mb-4">Bank Details</h2>
//                     </div>
                    
//                     {isCountryCodeIndia && (
//                       <Field name="upi_id">
//                         {({ field, form }) => (
//                           <CustomInput
//                             field={field}
//                             form={form}
//                             label="UPI Number"
//                             placeholder="Enter UPI number"
//                             disabled={isFieldDisabled()}
//                             onChange={(e) => {
//                               const value = e.target.value.replace(/[^0-9]/g, '');
//                               form.setFieldValue(field.name, value);
//                             }}
//                           />
//                         )}
//                       </Field>
//                     )}
                    
//                     <Field name="bank_account">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label="Bank Account Number"
//                           placeholder="Enter bank account number"
//                           disabled={isFieldDisabled()}
//                           onKeyPress={(event) => {
//                             if (!/[0-9]/.test(event.key)) {
//                               event.preventDefault();
//                             }
//                           }}
//                         />
//                       )}
//                     </Field>
                    
//                     <Field name="bank_name">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label="Bank Name"
//                           placeholder="Enter bank name"
//                           disabled={isFieldDisabled()}
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
//                             form.setFieldValue(field.name, value);
//                           }}
//                         />
//                       )}
//                     </Field>
                    
//                     <Field name="ifsc_code">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
//                           placeholder="Enter bank code"
//                           disabled={isFieldDisabled()}
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
//                             form.setFieldValue(field.name, value.toUpperCase());
//                           }}
//                         />
//                       )}
//                     </Field>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="mt-6 flex justify-end">
//                   {kycdata?.success !== 1 && (
//                     <button
//                       type="submit"
//                       disabled={isSubmitting || loading}
//                       className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
//                         (isSubmitting || loading)
//                           ? 'bg-gray-600 cursor-not-allowed text-gray-300'
//                           : 'bg-white hover:bg-white/90 text-[#1d8e85] shadow-lg hover:shadow-xl'
//                       }`}
//                     >
//                       {(isSubmitting || loading) ? (
//                         <div className="flex items-center gap-2">
//                           <div className="w-3 h-3 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
//                           Processing...
//                         </div>
//                       ) : (
//                         'Submit'
//                       )}
//                     </button>
//                   )}
//                   {(kycdata?.data?.status == "reject" ||
//                     (kycdata?.data?.status == "approve" && isEditClicked)) && (
//                     <button
//                       type="submit"
//                       disabled={isSubmitting || loading}
//                       className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
//                         (isSubmitting || loading)
//                           ? 'bg-gray-600 cursor-not-allowed text-gray-300'
//                           : 'bg-white hover:bg-white/90 text-[#1d8e85] shadow-lg hover:shadow-xl'
//                       }`}
//                     >
//                       {(isSubmitting || loading) ? (
//                         <div className="flex items-center gap-2">
//                           <div className="w-3 h-3 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
//                           Processing...
//                         </div>
//                       ) : (
//                         'Update'
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full">
//             <div className="p-5 border-b border-gray-700">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-bold text-white">DigiLocker Integration</h3>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <XCircle className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             <div className="p-5">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-[#1d8e85]/10 rounded-full flex items-center justify-center">
//                   <Upload className="w-5 h-5 text-[#1d8e85]" />
//                 </div>
//                 <div>
//                   <h4 className="text-white font-medium text-sm">Auto-fill KYC Data</h4>
//                   <p className="text-gray-400 text-xs">Fetch verified documents from DigiLocker</p>
//                 </div>
//               </div>
//               <p className="text-gray-300 mb-5 text-sm">
//                 Would you like to fetch your KYC data from DigiLocker to auto-fill the form? This will help you complete the process faster with verified documents.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowModal(false);
//                     handleButtonClick();
//                   }}
//                   className="flex-1 px-3 py-2 bg-[#1d8e85] text-white rounded-lg hover:bg-[#1d8e85]/90 transition-colors font-medium text-sm"
//                 >
//                   Fetch Data
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading Overlay */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
//             <div className="flex flex-col items-center gap-4">
//               <div className="w-12 h-12 border-4 border-[#1d8e85]/30 border-t-[#1d8e85] rounded-full animate-spin"></div>
//               <div className="text-center">
//                 <h3 className="text-white font-semibold mb-1">Processing...</h3>
//                 <p className="text-gray-400 text-sm">Please wait while we process your request</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KycInformation;



// import React, { useContext, useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import CryptoJS from "crypto-js";
// import { useUserDataQuery } from '../dashBoard/DashboardApliSlice';
// import { useKycaddMutation, useGetkycDetailsQuery, useGetKycDataMutation } from './kycApiSlice';
// import digiLocker from "../../../../assets/digiLocker.svg";
// import editIcon from "../../../../assets/edit.svg";
// import showIcon from "../../../../assets/showIcon.svg";
// import countryCodes from "../../../../Authentication/countryCodes.json";

// const getValidationSchema = (isCountryCodeIndia, kycSuccess) => {
//   return Yup.object().shape({
//     applicantName: Yup.string()
//       .min(2, 'Name must be at least 2 characters')
//       .required('The applicant name field is mandatory.'),
    
//     dob: isCountryCodeIndia 
//       ? Yup.string().required('Date of birth is required') 
//       : Yup.string(),
    
//     mobile_number: Yup.string()
//       .test('mobile-validation', 'The mobile number field is mandatory.', function(value) {
//         if (!value) return false;
//         const countryCode = this.parent.countryCode || 91;
//         const prefix = `+${countryCode} `;
//         return value.replace(prefix, '').trim().length > 0;
//       }),
    
//     address: Yup.string()
//       .min(5, 'Address must be at least 5 characters')
//       .required('The address field is mandatory.'),
    
//     bank_name: Yup.string()
//       .matches(/^[a-zA-Z\s]*$/, 'Bank name should only contain letters')
//       .required('The bank name field is mandatory.'),
    
//     ifsc_code: Yup.string()
//       .matches(/^[a-zA-Z0-9]*$/, 'Invalid IFSC code format')
//       .required(`The ${isCountryCodeIndia ? 'ifsc' : 'bank'} code field is mandatory.`),
    
//     bank_account: Yup.string()
//       .matches(/^\d+$/, 'Account number should only contain numbers')
//       .required('The bank account field is mandatory.'),
    
//     panNumber: isCountryCodeIndia 
//       ? Yup.string()
//           .matches(/^[a-zA-Z0-9]*$/, 'Invalid PAN format')
//           .length(10, 'PAN must be 10 characters')
//           .required('PAN number is required') 
//       : Yup.string(),
    
//     upi_id: isCountryCodeIndia 
//       ? Yup.string().matches(/^[0-9]*$/, 'UPI should only contain numbers') 
//       : Yup.string(),
//     aadhar_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
//       ? Yup.mixed().required('The Aadhar doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     aadhar_doc_back: (kycSuccess !== 1 && isCountryCodeIndia) 
//       ? Yup.mixed().required('The Aadhar doc back field is mandatory.') 
//       : Yup.mixed(),
    
//     pan_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
//       ? Yup.mixed().required('The Pan doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     dl_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Driving License doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     dl_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Driving License doc back field is mandatory.') 
//       : Yup.mixed(),
    
//     passport_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Passport doc front field is mandatory.') 
//       : Yup.mixed(),
    
//     passport_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
//       ? Yup.mixed().required('The Passport doc back field is mandatory.') 
//       : Yup.mixed(),
//   });
// };

// const KycInformation = () => {
//   const { data: userData } = useUserDataQuery();
//   const location = useLocation();

//   const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

//   const [submitKyc] = useKycaddMutation();
//   const [getKycData] = useGetKycDataMutation();
//   const [loading, setLoading] = useState(false);
//   const [enableFields, setEnableFields] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
//   const [isEditClicked, setIsEditClicked] = useState(false);

//   const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

//   const docFrontRef = useRef(null);
//   const doc1FrontRef = useRef(null);
//   const docBackRef = useRef(null);
//   const doc1BackRef = useRef(null);

//   // Initial form values
//   const getInitialValues = () => ({
//     aadhar_doc_front: null,
//     aadhar_doc_back: null,
//     pan_doc_front: null,
//     dl_doc_front: null,
//     dl_doc_back: null,
//     passport_doc_front: null,
//     passport_doc_back: null,
//     bank_name: kycdata?.data?.bank_name || "",
//     applicantName: kycdata?.data?.name || userData?.data?.name || "",
//     ifsc_code: kycdata?.data?.ifsc_code || "",
//     mobile_number: kycdata?.data?.mobile_number 
//       ? `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}`
//       : `+${userData?.data?.countryCode || 91} `,
//     upi_id: kycdata?.data?.upi_id || "",
//     bank_account: kycdata?.data?.bank_account || "",
//     address: kycdata?.data?.address || "",
//     dob: kycdata?.data?.dob || "",
//     panNumber: kycdata?.data?.panNumber || "",
//     countryCode: userData?.data?.countryCode || 91
//   });

//   const getCountryName = () => {
//     const countryCode = `+${userData?.data?.countryCode}`;
//     const countryName = countryCodes.find(
//       (country) => country.country_code == countryCode
//     );
//     return countryName?.country_name || "NA";
//   };

//   const getMaxLength = () => {
//     return isCountryCodeIndia ? 14 : 19;
//   };

//   // Custom file input component
//   const CustomFileInput = ({ field, form, label, accept = ".jpg,.jpeg,.png", disabled, showImageUrl, refProp, ...props }) => {
//     const handleFileChange = (event) => {
//       const file = event.currentTarget.files[0];
//       if (file) {
//         const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
//         const invalidFile = !acceptedFormats.includes(file.type);
        
//         if (invalidFile) {
//           toast.warning("Only JPG / PNG files are allowed", {
//             position: "top-center",
//           });
//           if (refProp?.current) {
//             refProp.current.value = "";
//           }
//           return;
//         }
        
//         form.setFieldValue(field.name, file);
//       }
//     };

//     return (
//       <div className="mb-3 md:mb-4">
//         <label htmlFor={field.name} className="form-label text-white block text-sm sm:text-base font-medium mb-2">
//           {label} <span className="text-red-400">*</span>
//           {showImageUrl && (
//             <span className="ps-1 ml-2">
//               <button
//                 type="button"
//                 className="bg-transparent border-0 inline-flex items-center justify-center p-1 rounded hover:bg-white/10 transition-colors"
//                 onClick={() => {
//                   const link = document.createElement("a");
//                   link.href = showImageUrl;
//                   link.target = "_blank";
//                   link.rel = "noopener noreferrer";
//                   link.click();
//                 }}
//               >
//                 <img alt="showIcon" src={showIcon} className="w-3 h-3 sm:w-4 sm:h-4" />
//               </button>
//             </span>
//           )}
//         </label>
//         <input
//           type="file"
//           accept={accept}
//           className="form-control shadow-none bg-transparent w-full px-3 py-2 sm:py-3 border border-white/30 rounded-lg text-white text-sm sm:text-base placeholder-white/60 focus:border-white/60 focus:outline-none transition-colors file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-white/20 file:text-white hover:file:bg-white/30"
//           name={field.name}
//           ref={refProp}
//           onChange={handleFileChange}
//           disabled={disabled}
//           {...props}
//         />
//         <ErrorMessage name={field.name} component="p" className="error text-red-400 text-xs sm:text-sm mt-1" />
//       </div>
//     );
//   };

//   // Custom input component
//   const CustomInput = ({ field, form, label, disabled, maxLength, onKeyPress, ...props }) => {
//     return (
//       <div className="mb-3 md:mb-4">
//         <label htmlFor={field.name} className="form-label block text-white text-sm sm:text-base font-medium mb-2">
//           {label} <span className="error text-red-400">*</span>
//         </label>
//         <input
//           {...field}
//           {...props}
//           className="form-control shadow-none bg-transparent w-full px-3 py-2 sm:py-3 border border-white/30 rounded-lg text-white text-sm sm:text-base placeholder-white/60 focus:border-white/60 focus:outline-none transition-colors"
//           disabled={disabled}
//           maxLength={maxLength}
//           onKeyPress={onKeyPress}
//           autoComplete="off"
//         />
//         <ErrorMessage name={field.name} component="p" className="error text-red-400 text-xs sm:text-sm mt-1" />
//       </div>
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
//     setLoading(true);
//     try {
//       const data = new FormData();

//       // Handle file uploads based on KYC status and country
//       if (kycdata?.success !== 1) {
//         if (isCountryCodeIndia) {
//           data.append("aadhar_doc_front", values.aadhar_doc_front);
//           data.append("aadhar_doc_back", values.aadhar_doc_back);
//           data.append("pan_doc_front", values.pan_doc_front);
//           data.append("upi_id", values.upi_id);
//           data.append("panNumber", values.panNumber);
//           data.append("dob", values.dob);
//         } else {
//           data.append("dl_doc_front", values.dl_doc_front);
//           data.append("dl_doc_back", values.dl_doc_back);
//           data.append("passport_doc_front", values.passport_doc_front);
//           data.append("passport_doc_back", values.passport_doc_back);
//         }
//       } else {
//         // Handle updates for existing KYC
//         if (docFrontRef.current?.value) {
//           if (isCountryCodeIndia) {
//             data.append("aadhar_doc_front", values.aadhar_doc_front);
//           } else {
//             data.append("dl_doc_front", values.dl_doc_front);
//           }
//         }
//         if (docBackRef.current?.value) {
//           if (isCountryCodeIndia) {
//             data.append("aadhar_doc_back", values.aadhar_doc_back);
//           } else {
//             data.append("dl_doc_back", values.dl_doc_back);
//           }
//         }
//         if (doc1FrontRef.current?.value) {
//           if (isCountryCodeIndia) {
//             data.append("pan_doc_front", values.pan_doc_front);
//           } else {
//             data.append("passport_doc_front", values.passport_doc_front);
//           }
//         }
//         if (doc1BackRef?.current?.value) {
//           if (!isCountryCodeIndia) {
//             data.append("passport_doc_back", values.passport_doc_back);
//           }
//         }
//         if (isCountryCodeIndia) {
//           data.append("upi_id", values.upi_id);
//           data.append("panNumber", values.panNumber);
//           data.append("dob", values.dob);
//         }
//       }

//       // Add common fields
//       data.append("name", values.applicantName);
//       data.append("bank_name", values.bank_name);
//       data.append("ifsc_code", values.ifsc_code);
      
//       if (values.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
//         data.append(
//           "mobile_number",
//           values.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
//         );
//       }
      
//       data.append("bank_account", values.bank_account);
//       data.append("address", values.address);

//       const response = await submitKyc(data);

//       if (response?.data?.status_code === 200) {
//         toast.success(response?.data.message, {
//           position: "top-center",
//         });
//         refetch();
//       } else {
//         toast?.error(response?.error?.data?.message, {
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       toast.error(error.message, {
//         position: "top-center",
//       });
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   // Generate code verifier and challenge for DigiLocker
//   const generateCodeVerifier = async () => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
//     const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
//     let verifier = "";
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       verifier += characters[randomIndex];
//     }
//     return verifier;
//   };

//   const generateCodeChallenge = (verifier) => {
//     const hash = CryptoJS.SHA256(verifier);
//     const base64Url = CryptoJS.enc.Base64.stringify(hash)
//       .replace(/\+/g, "-")
//       .replace(/\//g, "_")
//       .replace(/=+$/, "");
//     return base64Url;
//   };

//   const handleButtonClick = async () => {
//     setLoading(true);
//     try {
//       const verifier = await generateCodeVerifier();
//       const challenge = await generateCodeChallenge(verifier);
      
//       let origin = window.location.origin;
//       let redirectURI = "http://localhost:3000/kyc"; // Default for development
//       let clientId = "your-client-id"; // Replace with actual client ID
      
//       if (origin && (origin.includes("5173") || origin.includes("5174"))) {
//         redirectURI = process.env.DL_REDIRECT_URI_DEV;
//         clientId = process.env.DL_CLIENT_ID_DEV;
//       } else if (window.location.origin === "https://jaimax.com") {
//         redirectURI = process.env.DL_REDIRECT_URI_PROD;
//         clientId = process.env.DL_CLIENT_ID_PROD;
//       } else {
//         redirectURI = process.env.DL_REDIRECT_URI_QA;
//         clientId = process.env.DL_CLIENT_ID_QA;
//       }

//       localStorage.setItem("verifier", verifier);
//       localStorage.removeItem("processed");
      
//       const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
//       window.open(apiUrl.toString(), "_self");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onClickEdit = () => {
//     setIsEditClicked(true);
//   };

//   // Handle DigiLocker response
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const extractedCode = queryParams.get("code");
    
//     const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
//     window.history.replaceState(null, "", newUrl);
    
//     if (extractedCode && !localStorage.getItem("processed")) {
//       localStorage.setItem("processed", "true");
      
//       const payload = {
//         code: extractedCode,
//         verifier: localStorage.getItem("verifier"),
//       };

//       setLoading(true);
//       const postTokenRequest = async () => {
//         try {
//           const response = await getKycData(payload).unwrap();
//           if (response.data) {
//             setEnableFields(true);
//             setDisableFieldsAfterKYC(true);
//             setIsEditClicked(true);
//             setShowModal(false);
//           }
//         } catch (error) {
//           console.log(error);
//         } finally {
//           setLoading(false);
//           localStorage.removeItem("code");
//           localStorage.removeItem("verifier");
//         }
//       };

//       postTokenRequest();
//     }
//   }, [getKycData]);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     if (kycdata?.success == 1) {
//       setEnableFields(true);
//       setDisableFieldsAfterKYC(true);
      
//       if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
//         setShowModal(true);
//       } else {
//         setShowModal(false);
//       }
//     } else {
//       if (isCountryCodeIndia && !(isLoading || loading)) {
//         setShowModal(true);
//       }
//     }
//   }, [userData, kycdata, isLoading, loading, isCountryCodeIndia]);

//   const isFieldDisabled = (fieldType = 'normal') => {
//     const baseDisabled = (!enableFields && isCountryCodeIndia) || 
//                         kycdata?.data?.status === "open" || 
//                         (kycdata?.data?.status == "approve" && !isEditClicked);
    
//     if (fieldType === 'pan') {
//       return baseDisabled || disableFieldsAfterKYC;
//     }
    
//     return baseDisabled;
//   };

//   if (isLoading || loading) {
//     return (
//       <section className="py-4 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
//         <div className="max-w-7xl mx-auto w-full">
//           <div className="border border-white/20 rounded-3xl py-12 sm:py-16 lg:py-20 backdrop-blur-sm">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//               <div className="text-white text-lg sm:text-xl font-medium">Loading KYC Information...</div>
//               <div className="text-white/60 text-sm sm:text-base">Please wait while we fetch your details</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
//       <div className="max-w-7xl xl:max-w-8xl mx-auto">
//         <div className="bg-[#1d8e85] border border-[#1d8e85]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-[#1d8e85]/10 backdrop-blur-sm">
          
//           {/* Header Section */}
//           <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start pb-6 sm:pb-8 border-b border-[#1d8e85]/30">
//             <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
//               <div className="flex flex-col space-y-2">
//                 <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold m-0 leading-tight">
//                   KYC Information
//                 </h1>
//                 <p className="text-white/80 text-sm sm:text-base lg:text-lg m-0 max-w-md">
//                   {kycdata?.data?.status !== "approve" &&
//                     "Complete your identity verification to unlock all features"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8">
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
//                 <h6 className="text-white text-sm sm:text-base lg:text-lg font-semibold m-0 flex items-center space-x-2">
//                   <span className="text-white/80">Country:</span>
//                   <span className="font-normal text-white">
//                     {!userData?.data?.country ||
//                     userData?.data?.country === "N/A"
//                       ? getCountryName()
//                       : userData?.data?.country}
//                   </span>
//                 </h6>
//               </div>

//               {isCountryCodeIndia &&
//                 ((kycdata?.data?.status !== "open" &&
//                   kycdata?.data?.status !== "approve") ||
//                   (kycdata?.data?.status == "approve" &&
//                     isEditClicked)) && (
//                   <div className="flex justify-center sm:justify-start">
//                     <button
//                       type="button"
//                       className="border-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 transition-all duration-300 hover:scale-105 border border-white/20"
//                       id="renderBtn"
//                       onClick={handleButtonClick}
//                       disabled={loading}
//                     >
//                       <img
//                         src={digiLocker}
//                         alt="DigiLocker Integration"
//                         className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
//                       />
//                     </button>
//                   </div>
//                 )}
//             </div>
//           </div>

//           {/* Form */}
//           <Formik
//             initialValues={getInitialValues()}
//             validationSchema={getValidationSchema(isCountryCodeIndia, kycdata?.success)}
//             onSubmit={handleSubmit}
//             enableReinitialize={true}
//           >
//             {({ values, setFieldValue, isSubmitting }) => (
//               <Form className="space-y-6 sm:space-y-8 lg:space-y-10">
                
//                 {/* KYC Status Section */}
//                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
//                   <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap sm:justify-between sm:items-center gap-4">
//                     <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
//                       {kycdata?.data?.status === "approve" && (
//                         <button
//                           type="button"
//                           className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-2 rounded-lg transition-all duration-300 hover:scale-105 w-fit"
//                           onClick={onClickEdit}
//                         >
//                           <img alt="Edit KYC" src={editIcon} className="w-5 h-5 sm:w-6 sm:h-6" />
//                         </button>
//                       )}
//                       <div className="flex flex-col space-y-2">
//                         <p className="m-0 text-white text-sm sm:text-base lg:text-lg font-medium flex items-center space-x-2">
//                           <span>KYC Status:</span>
//                           <span
//                             className="capitalize font-bold px-3 py-1 rounded-full text-sm"
//                             style={{
//                               backgroundColor:
//                                 kycdata?.data?.status === "open"
//                                   ? "rgba(255, 138, 0, 0.2)"
//                                   : kycdata?.data?.status === "approve"
//                                   ? "rgba(0, 128, 0, 0.2)"
//                                   : kycdata?.data?.status === "inprogress"
//                                   ? "rgba(0, 0, 255, 0.2)"
//                                   : "rgba(255, 0, 0, 0.2)",
//                               color:
//                                 kycdata?.data?.status === "open"
//                                   ? "#ff8a00"
//                                   : kycdata?.data?.status === "approve"
//                                   ? "green"
//                                   : kycdata?.data?.status === "inprogress"
//                                   ? "blue"
//                                   : "red",
//                               border: `1px solid ${
//                                 kycdata?.data?.status === "open"
//                                   ? "#ff8a00"
//                                   : kycdata?.data?.status === "approve"
//                                   ? "green"
//                                   : kycdata?.data?.status === "inprogress"
//                                   ? "blue"
//                                   : "red"
//                               }`
//                             }}
//                           >
//                             {kycdata?.data?.status === "open"
//                               ? "In Open"
//                               : kycdata?.data?.status === "approve"
//                               ? "Approved"
//                               : kycdata?.data?.status === "inprogress"
//                               ? "In Progress"
//                               : kycdata?.data?.status === "reject"
//                               ? "Rejected"
//                               : "N/A"}
//                           </span>
//                         </p>
//                         {kycdata && kycdata?.data?.status === "reject" && (
//                           <p className="m-0 text-white text-sm sm:text-base lg:text-lg">
//                             <span className="text-white/80">Reason:</span>
//                             <span className="text-red-400 font-semibold ml-2 bg-red-500/10 px-2 py-1 rounded">
//                               {kycdata?.data?.reason}
//                             </span>
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Sections Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  
//                   {/* Applicant Info */}
//                   <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 space-y-4 sm:space-y-6">
//                     <h6 className="text-white text-lg sm:text-xl lg:text-2xl font-bold border-b border-[#1d8e85]/30 pb-3 mb-4 flex items-center space-x-2">
//                       <div className="w-2 h-6 bg-white rounded-full"></div>
//                       <span>Applicant Info</span>
//                     </h6>

//                     <Field
//                       name="applicantName"
//                       component={CustomInput}
//                       label="Name of the Applicant"
//                       disabled={true}
//                       readOnly={true}
//                     />

//                     {isCountryCodeIndia && (
//                       <Field
//                         name="dob"
//                         component={CustomInput}
//                         label="Date of Birth"
//                         disabled={true}
//                         readOnly={true}
//                       />
//                     )}

//                     <Field name="mobile_number">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label="Mobile Number (As per Bank)"
//                           placeholder="Enter mobile number"
//                           maxLength={getMaxLength()}
//                           disabled={isFieldDisabled()}
//                           onKeyPress={(event) => {
//                             if (!/[0-9]/.test(event.key)) {
//                               event.preventDefault();
//                             }
//                           }}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value.startsWith(`+${userData?.data?.countryCode} `)) {
//                               form.setFieldValue(field.name, value);
//                             }
//                           }}
//                         />
//                       )}
//                     </Field>

//                     <Field
//                       name="address"
//                       component={CustomInput}
//                       label="Address"
//                       placeholder="Enter your address"
//                       disabled={isFieldDisabled()}
//                     />
//                   </div>

//                   {/* Applicant Proofs */}
//                   <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 space-y-4 sm:space-y-6">
//                     <h6 className="text-white text-lg sm:text-xl lg:text-2xl font-bold border-b border-[#1d8e85]/30 pb-3 mb-4 flex items-center space-x-2">
//                       <div className="w-2 h-6 bg-white rounded-full"></div>
//                       <span>Applicant Proofs</span>
//                     </h6>

//                     <Field
//                       name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
//                       component={CustomFileInput}
//                       label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
//                       disabled={isFieldDisabled()}
//                       showImageUrl={
//                         kycdata?.success &&
//                         (isCountryCodeIndia
//                           ? kycdata.data?.aadhar_doc_front
//                           : kycdata.data?.dl_doc_front)
//                       }
//                       refProp={docFrontRef}
//                     />

//                     <Field
//                       name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
//                       component={CustomFileInput}
//                       label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
//                       disabled={isFieldDisabled()}
//                       showImageUrl={
//                         kycdata?.success &&
//                         (isCountryCodeIndia
//                           ? kycdata.data?.aadhar_doc_back
//                           : kycdata.data?.dl_doc_back)
//                       }
//                       refProp={docBackRef}
//                     />

//                     <Field
//                       name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
//                       component={CustomFileInput}
//                       label={isCountryCodeIndia ? "PAN" : "Passport Front"}
//                       disabled={isFieldDisabled()}
//                       showImageUrl={
//                         kycdata?.success &&
//                         (isCountryCodeIndia
//                           ? kycdata.data?.pan_doc_front
//                           : kycdata.data?.passport_doc_front)
//                       }
//                       refProp={doc1FrontRef}
//                     />

//                     {!isCountryCodeIndia && (
//                       <Field
//                         name="passport_doc_back"
//                         component={CustomFileInput}
//                         label="Passport Back"
//                         disabled={isFieldDisabled()}
//                         showImageUrl={kycdata?.success && kycdata.data?.passport_doc_back}
//                         refProp={doc1BackRef}
//                       />
//                     )}

//                     {isCountryCodeIndia && (
//                       <Field name="panNumber">
//                         {({ field, form }) => (
//                           <CustomInput
//                             field={field}
//                             form={form}
//                             label="PAN Number"
//                             placeholder="Enter PAN number"
//                             disabled={isFieldDisabled('pan')}
//                             onChange={(e) => {
//                               const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
//                               form.setFieldValue(field.name, value.toUpperCase());
//                             }}
//                             maxLength="10"
//                           />
//                         )}
//                       </Field>
//                     )}
//                   </div>

//                   {/* Bank Details */}
//                   <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 space-y-4 sm:space-y-6">
//                     <h6 className="text-white text-lg sm:text-xl lg:text-2xl font-bold border-b border-[#1d8e85]/30 pb-3 mb-4 flex items-center space-x-2">
//                       <div className="w-2 h-6 bg-white rounded-full"></div>
//                       <span>Bank Details</span>
//                     </h6>

//                     {isCountryCodeIndia && (
//                       <Field name="upi_id">
//                         {({ field, form }) => (
//                           <CustomInput
//                             field={field}
//                             form={form}
//                             label="UPI Number"
//                             placeholder="Enter UPI number"
//                             disabled={isFieldDisabled()}
//                             onChange={(e) => {
//                               const value = e.target.value.replace(/[^0-9]/g, '');
//                               form.setFieldValue(field.name, value);
//                             }}
//                           />
//                         )}
//                       </Field>
//                     )}

//                     <Field name="bank_account">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label="Bank Account Number"
//                           placeholder="Enter bank account number"
//                           disabled={isFieldDisabled()}
//                           onKeyPress={(event) => {
//                             if (!/[0-9]/.test(event.key)) {
//                               event.preventDefault();
//                             }
//                           }}
//                         />
//                       )}
//                     </Field>

//                     <Field name="bank_name">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label="Bank Name"
//                           placeholder="Enter bank name"
//                           disabled={isFieldDisabled()}
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
//                             form.setFieldValue(field.name, value);
//                           }}
//                         />
//                       )}
//                     </Field>

//                     <Field name="ifsc_code">
//                       {({ field, form }) => (
//                         <CustomInput
//                           field={field}
//                           form={form}
//                           label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
//                           placeholder="Enter bank code"
//                           disabled={isFieldDisabled()}
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
//                             form.setFieldValue(field.name, value.toUpperCase());
//                           }}
//                         />
//                       )}
//                     </Field>
//                   </div>
//                 </div>

//                 {/* Submit Button Section */}
//                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
//                   <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4 sm:gap-6">
//                     {kycdata?.success !== 1 && (
//                       <div className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[250px]">
//                         <button
//                           type="submit"
//                           disabled={isSubmitting || loading}
//                           className="w-full bg-gradient-to-r from-[#1d8e85] to-[#16a085] hover:from-[#17766e] hover:to-[#138b7a] disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border-0 shadow-lg shadow-[#1d8e85]/30 text-sm sm:text-base lg:text-lg backdrop-blur-sm"
//                         >
//                           {isSubmitting || loading ? (
//                             <span className="flex items-center justify-center gap-3">
//                               <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               <span>Processing...</span>
//                             </span>
//                           ) : (
//                             'Submit KYC Application'
//                           )}
//                         </button>
//                       </div>
//                     )}
                    
//                     {(kycdata?.data?.status == "reject" ||
//                       (kycdata?.data?.status == "approve" && isEditClicked)) && (
//                       <div className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[250px]">
//                         <button
//                           type="submit"
//                           disabled={isSubmitting || loading}
//                           className="w-full bg-gradient-to-r from-[#0f7b6c] to-[#1d8e85] hover:from-[#0a5d50] hover:to-[#17766e] disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border-0 shadow-lg shadow-[#1d8e85]/30 text-sm sm:text-base lg:text-lg backdrop-blur-sm"
//                         >
//                           {isSubmitting || loading ? (
//                             <span className="flex items-center justify-center gap-3">
//                               <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               <span>Updating...</span>
//                             </span>
//                           ) : (
//                             'Update KYC Information'
//                           )}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>

//       {/* Enhanced Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
//           <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl shadow-[#1d8e85]/30 max-w-sm sm:max-w-md lg:max-w-lg w-full mx-4 transform transition-all scale-95 hover:scale-100 border border-[#1d8e85]/20">
            
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-4 sm:p-6 lg:p-8 border-b border-[#1d8e85]/20 bg-gradient-to-r from-[#1d8e85]/10 to-[#16a085]/10 rounded-t-2xl sm:rounded-t-3xl">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1d8e85] rounded-xl flex items-center justify-center">
//                   <img src={digiLocker} alt="DigiLocker" className="w-6 h-6 sm:w-8 sm:h-8" />
//                 </div>
//                 <div>
//                   <h5 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1d8e85] m-0">DigiLocker Integration</h5>
//                   <p className="text-[#1d8e85]/70 text-xs sm:text-sm m-0">Secure document verification</p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 className="text-[#1d8e85]/60 hover:text-[#1d8e85] transition-colors p-2 hover:bg-[#1d8e85]/10 rounded-lg"
//                 onClick={() => setShowModal(false)}
//               >
//                 <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//               </button>
//             </div>
            
//             {/* Modal Body */}
//             <div className="p-4 sm:p-6 lg:p-8">
//               <div className="text-center space-y-4">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1d8e85]/10 rounded-2xl flex items-center justify-center mx-auto">
//                   <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#1d8e85]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//                   </svg>
//                 </div>
//                 <h6 className="text-gray-800 text-lg sm:text-xl font-bold">Auto-fill KYC Data</h6>
//                 <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                   Connect with DigiLocker to automatically fetch and fill your verified documents and personal information. This will save time and ensure accuracy.
//                 </p>
//                 <div className="bg-[#1d8e85]/5 rounded-xl p-4 border border-[#1d8e85]/20">
//                   <p className="text-[#1d8e85] text-xs sm:text-sm font-medium">
//                     ✓ Secure government verification<br/>
//                     ✓ Auto-fill personal details<br/>
//                     ✓ Faster KYC completion
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Modal Footer */}
//             <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 lg:p-8 border-t border-[#1d8e85]/20 bg-gradient-to-r from-[#1d8e85]/5 to-[#16a085]/5 rounded-b-2xl sm:rounded-b-3xl">
//               <button
//                 type="button"
//                 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 border border-gray-300 text-sm sm:text-base"
//                 onClick={() => setShowModal(false)}
//               >
//                 Fill Manually
//               </button>
//               <button
//                 type="button"
//                 className="flex-1 bg-gradient-to-r from-[#1d8e85] to-[#16a085] hover:from-[#17766e] hover:to-[#138b7a] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#1d8e85]/30 transform hover:scale-105 text-sm sm:text-base"
//                 onClick={() => {
//                   setShowModal(false);
//                   handleButtonClick();
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Connecting...
//                   </span>
//                 ) : (
//                   'Connect DigiLocker'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default KycInformation;





import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CryptoJS from "crypto-js";
import { useUserDataQuery } from '../dashBoard/DashboardApliSlice';
import { useKycaddMutation, useGetkycDetailsQuery, useGetKycDataMutation } from './kycApiSlice';
import digiLocker from "../../../../assets/digiLocker.svg";
import editIcon from "../../../../assets/edit.svg";
import showIcon from "../../../../assets/showIcon.svg";
import countryCodes from "../../../../Authentication/countryCodes.json";

const getValidationSchema = (isCountryCodeIndia, kycSuccess) => {
  return Yup.object().shape({
    applicantName: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('The applicant name field is mandatory.'),
    
    dob: isCountryCodeIndia 
      ? Yup.string().required('Date of birth is required') 
      : Yup.string(),
    
    mobile_number: Yup.string()
      .test('mobile-validation', 'The mobile number field is mandatory.', function(value) {
        if (!value) return false;
        const countryCode = this.parent.countryCode || 91;
        const prefix = `+${countryCode} `;
        return value.replace(prefix, '').trim().length > 0;
      }),
    
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .required('The address field is mandatory.'),
    
    bank_name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Bank name should only contain letters')
      .required('The bank name field is mandatory.'),
    
    ifsc_code: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, 'Invalid IFSC code format')
      .required(`The ${isCountryCodeIndia ? 'ifsc' : 'bank'} code field is mandatory.`),
    
    bank_account: Yup.string()
      .matches(/^\d+$/, 'Account number should only contain numbers')
      .required('The bank account field is mandatory.'),
    
    panNumber: isCountryCodeIndia 
      ? Yup.string()
          .matches(/^[a-zA-Z0-9]*$/, 'Invalid PAN format')
          .length(10, 'PAN must be 10 characters')
          .required('PAN number is required') 
      : Yup.string(),
    
    upi_id: isCountryCodeIndia 
      ? Yup.string().matches(/^[0-9]*$/, 'UPI should only contain numbers') 
      : Yup.string(),
    aadhar_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
      ? Yup.mixed().required('The Aadhar doc front field is mandatory.') 
      : Yup.mixed(),
    
    aadhar_doc_back: (kycSuccess !== 1 && isCountryCodeIndia) 
      ? Yup.mixed().required('The Aadhar doc back field is mandatory.') 
      : Yup.mixed(),
    
    pan_doc_front: (kycSuccess !== 1 && isCountryCodeIndia) 
      ? Yup.mixed().required('The Pan doc front field is mandatory.') 
      : Yup.mixed(),
    
    dl_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Driving License doc front field is mandatory.') 
      : Yup.mixed(),
    
    dl_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Driving License doc back field is mandatory.') 
      : Yup.mixed(),
    
    passport_doc_front: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Passport doc front field is mandatory.') 
      : Yup.mixed(),
    
    passport_doc_back: (kycSuccess !== 1 && !isCountryCodeIndia) 
      ? Yup.mixed().required('The Passport doc back field is mandatory.') 
      : Yup.mixed(),
  });
};

const KycInformation = () => {
  const { data: userData } = useUserDataQuery();
  const location = useLocation();

  const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [loading, setLoading] = useState(false);
  const [enableFields, setEnableFields] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

  const docFrontRef = useRef(null);
  const doc1FrontRef = useRef(null);
  const docBackRef = useRef(null);
  const doc1BackRef = useRef(null);

  // Initial form values
  const getInitialValues = () => ({
    aadhar_doc_front: null,
    aadhar_doc_back: null,
    pan_doc_front: null,
    dl_doc_front: null,
    dl_doc_back: null,
    passport_doc_front: null,
    passport_doc_back: null,
    bank_name: kycdata?.data?.bank_name || "",
    applicantName: kycdata?.data?.name || userData?.data?.name || "",
    ifsc_code: kycdata?.data?.ifsc_code || "",
    mobile_number: kycdata?.data?.mobile_number 
      ? `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}`
      : `+${userData?.data?.countryCode || 91} `,
    upi_id: kycdata?.data?.upi_id || "",
    bank_account: kycdata?.data?.bank_account || "",
    address: kycdata?.data?.address || "",
    dob: kycdata?.data?.dob || "",
    panNumber: kycdata?.data?.panNumber || "",
    countryCode: userData?.data?.countryCode || 91
  });

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find(
      (country) => country.country_code == countryCode
    );
    return countryName?.country_name || "NA";
  };

  const getMaxLength = () => {
    return isCountryCodeIndia ? 14 : 19;
  };

  // Custom file input component
  const CustomFileInput = ({ field, form, label, accept = ".jpg,.jpeg,.png", disabled, showImageUrl, refProp, ...props }) => {
    const handleFileChange = (event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
        const invalidFile = !acceptedFormats.includes(file.type);
        
        if (invalidFile) {
          toast.warning("Only JPG / PNG files are allowed", {
            position: "top-center",
          });
          if (refProp?.current) {
            refProp.current.value = "";
          }
          return;
        }
        
        form.setFieldValue(field.name, file);
      }
    };

    return (
      <div className="mb-4 ">
        <label htmlFor={field.name} className="block text-gray-700 text-sm font-medium mb-2 ">
          {label} <span className="text-red-500">*</span>
          {showImageUrl && (
            <button
              type="button"
              className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
              onClick={() => {
                const link = document.createElement("a");
                link.href = showImageUrl;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.click();
              }}
            >
              <img alt="showIcon" src={showIcon} className="w-4 h-4" />
            </button>
          )}
        </label>
        <input
          type="file"
          accept={accept}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          name={field.name}
          ref={refProp}
          onChange={handleFileChange}
          disabled={disabled}
          {...props}
        />
        <ErrorMessage name={field.name} component="p" className="text-red-500 text-sm mt-1" />
      </div>
    );
  };

  // Custom input component
  const CustomInput = ({ field, form, label, disabled, maxLength, onKeyPress, ...props }) => {
    return (
      <div className="mb-4">
        <label htmlFor={field.name} className="block text-gray-700 text-sm font-medium mb-2">
          {label} <span className="text-red-500">*</span>
        </label>
        <input
          {...field}
          {...props}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
          disabled={disabled}
          maxLength={maxLength}
          onKeyPress={onKeyPress}
          autoComplete="off"
        />
        <ErrorMessage name={field.name} component="p" className="text-red-500 text-sm mt-1" />
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    try {
      const data = new FormData();

      // Handle file uploads based on KYC status and country
      if (kycdata?.success !== 1) {
        if (isCountryCodeIndia) {
          data.append("aadhar_doc_front", values.aadhar_doc_front);
          data.append("aadhar_doc_back", values.aadhar_doc_back);
          data.append("pan_doc_front", values.pan_doc_front);
          data.append("upi_id", values.upi_id);
          data.append("panNumber", values.panNumber);
          data.append("dob", values.dob);
        } else {
          data.append("dl_doc_front", values.dl_doc_front);
          data.append("dl_doc_back", values.dl_doc_back);
          data.append("passport_doc_front", values.passport_doc_front);
          data.append("passport_doc_back", values.passport_doc_back);
        }
      } else {
        // Handle updates for existing KYC
        if (docFrontRef.current?.value) {
          if (isCountryCodeIndia) {
            data.append("aadhar_doc_front", values.aadhar_doc_front);
          } else {
            data.append("dl_doc_front", values.dl_doc_front);
          }
        }
        if (docBackRef.current?.value) {
          if (isCountryCodeIndia) {
            data.append("aadhar_doc_back", values.aadhar_doc_back);
          } else {
            data.append("dl_doc_back", values.dl_doc_back);
          }
        }
        if (doc1FrontRef.current?.value) {
          if (isCountryCodeIndia) {
            data.append("pan_doc_front", values.pan_doc_front);
          } else {
            data.append("passport_doc_front", values.passport_doc_front);
          }
        }
        if (doc1BackRef?.current?.value) {
          if (!isCountryCodeIndia) {
            data.append("passport_doc_back", values.passport_doc_back);
          }
        }
        if (isCountryCodeIndia) {
          data.append("upi_id", values.upi_id);
          data.append("panNumber", values.panNumber);
          data.append("dob", values.dob);
        }
      }

      // Add common fields
      data.append("name", values.applicantName);
      data.append("bank_name", values.bank_name);
      data.append("ifsc_code", values.ifsc_code);
      
      if (values.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
        data.append(
          "mobile_number",
          values.mobile_number.replace(`+${userData?.data?.countryCode} `, "")
        );
      }
      
      data.append("bank_account", values.bank_account);
      data.append("address", values.address);

      const response = await submitKyc(data);

      if (response?.data?.status_code === 200) {
        toast.success(response?.data.message, {
          position: "top-center",
        });
        refetch();
      } else {
        toast?.error(response?.error?.data?.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Generate code verifier and challenge for DigiLocker
  const generateCodeVerifier = async () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
    let verifier = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verifier += characters[randomIndex];
    }
    return verifier;
  };

  const generateCodeChallenge = (verifier) => {
    const hash = CryptoJS.SHA256(verifier);
    const base64Url = CryptoJS.enc.Base64.stringify(hash)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64Url;
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const verifier = await generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      
      let origin = window.location.origin;
      let redirectURI = "http://localhost:3000/kyc"; // Default for development
      let clientId = "your-client-id"; // Replace with actual client ID
      
      if (origin && (origin.includes("5173") || origin.includes("5174"))) {
        redirectURI = process.env.DL_REDIRECT_URI_DEV;
        clientId = process.env.DL_CLIENT_ID_DEV;
      } else if (window.location.origin === "https://jaimax.com") {
        redirectURI = process.env.DL_REDIRECT_URI_PROD;
        clientId = process.env.DL_CLIENT_ID_PROD;
      } else {
        redirectURI = process.env.DL_REDIRECT_URI_QA;
        clientId = process.env.DL_CLIENT_ID_QA;
      }

      localStorage.setItem("verifier", verifier);
      localStorage.removeItem("processed");
      
      const apiUrl = new URL(`https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`);
      
      window.open(apiUrl.toString(), "_self");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickEdit = () => {
    setIsEditClicked(true);
  };

  // Handle DigiLocker response
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState(null, "", newUrl);
    
    if (extractedCode && !localStorage.getItem("processed")) {
      localStorage.setItem("processed", "true");
      
      const payload = {
        code: extractedCode,
        verifier: localStorage.getItem("verifier"),
      };

      setLoading(true);
      const postTokenRequest = async () => {
        try {
          const response = await getKycData(payload).unwrap();
          if (response.data) {
            setEnableFields(true);
            setDisableFieldsAfterKYC(true);
            setIsEditClicked(true);
            setShowModal(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          localStorage.removeItem("code");
          localStorage.removeItem("verifier");
        }
      };

      postTokenRequest();
    }
  }, [getKycData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (kycdata?.success == 1) {
      setEnableFields(true);
      setDisableFieldsAfterKYC(true);
      
      if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    } else {
      if (isCountryCodeIndia && !(isLoading || loading)) {
        setShowModal(true);
      }
    }
  }, [userData, kycdata, isLoading, loading, isCountryCodeIndia]);

  const isFieldDisabled = (fieldType = 'normal') => {
    const baseDisabled = (!enableFields && isCountryCodeIndia) || 
                        kycdata?.data?.status === "open" || 
                        (kycdata?.data?.status == "approve" && !isEditClicked);
    
    if (fieldType === 'pan') {
      return baseDisabled || disableFieldsAfterKYC;
    }
    
    return baseDisabled;
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading KYC Information</h3>
          <p className="text-gray-600">Please wait while we fetch your details</p>
        </div>
      </div>
    );x
  }

  return (
    <div className="bg-[#0d9387] min-h-screen">
      <div className="max-w-7xl mx-auto p-2 sm:p-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          
          {/* Header */}
          <div className="p-2 sm:p-3 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-0">
                  KYC Information
                </h1>
                {kycdata?.data?.status !== "approve" && (
                  <p className="text-gray-600 text-sm sm:text-base">
                    Complete your identity verification to unlock all features
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-teal-50 rounded-lg px-4 py-2 border border-teal-200">
                  <span className="text-sm text-gray-600">Country: </span>
                  <span className="font-medium text-gray-900">
                    {!userData?.data?.country || userData?.data?.country === "N/A"
                      ? getCountryName()
                      : userData?.data?.country}
                  </span>
                </div>

                {isCountryCodeIndia &&
                  ((kycdata?.data?.status !== "open" &&
                    kycdata?.data?.status !== "approve") ||
                    (kycdata?.data?.status == "approve" && isEditClicked)) && (
                    <button
                      type="button"
                      className="bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg p-3 transition-colors"
                      onClick={handleButtonClick}
                      disabled={loading}
                    >
                      <img
                        src={digiLocker}
                        alt="DigiLocker Integration"
                        className="w-8 h-8"
                      />
                    </button>
                  )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-2 sm:p-2">
            <Formik
              initialValues={getInitialValues()}
              validationSchema={getValidationSchema(isCountryCodeIndia, kycdata?.success)}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="space-y-3">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold  text-gray-900 mb-4 pb-2 border-b border-gray-300">
                        Applicant Info
                      </h3>

                      <Field
                        name="applicantName"
                        component={CustomInput}
                        label="Name of the Applicant"
                        disabled={true}
                        readOnly={true}
                      />

                      {isCountryCodeIndia && (
                        <Field
                          name="dob"
                          component={CustomInput}
                          label="Date of Birth"
                          disabled={true}
                          readOnly={true}
                        />
                      )}

                      <Field name="mobile_number">
                        {({ field, form }) => (
                          <CustomInput
                            field={field}
                            form={form}
                            label="Mobile Number (As per Bank)"
                            placeholder="Enter mobile number"
                            maxLength={getMaxLength()}
                            disabled={isFieldDisabled()}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.startsWith(`+${userData?.data?.countryCode} `)) {
                                form.setFieldValue(field.name, value);
                              }
                            }}
                          />
                        )}
                      </Field>

                      <Field
                        name="address"
                        component={CustomInput}
                        label="Address"
                        placeholder="Enter your address"
                        disabled={isFieldDisabled()}
                      />
                    </div>

                    {/* Applicant Proofs */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                        Applicant Proofs
                      </h3>

                      <Field
                        name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
                        component={CustomFileInput}
                        label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Front`}
                        disabled={isFieldDisabled()}
                        showImageUrl={
                          kycdata?.success &&
                          (isCountryCodeIndia
                            ? kycdata.data?.aadhar_doc_front
                            : kycdata.data?.dl_doc_front)
                        }
                        refProp={docFrontRef}
                      />

                      <Field
                        name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
                        component={CustomFileInput}
                        label={`${isCountryCodeIndia ? "Aadhar" : "Driving License"} Back`}
                        disabled={isFieldDisabled()}
                        showImageUrl={
                          kycdata?.success &&
                          (isCountryCodeIndia
                            ? kycdata.data?.aadhar_doc_back
                            : kycdata.data?.dl_doc_back)
                        }
                        refProp={docBackRef}
                      />

                      <Field
                        name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
                        component={CustomFileInput}
                        label={isCountryCodeIndia ? "PAN" : "Passport Front"}
                        disabled={isFieldDisabled()}
                        showImageUrl={
                          kycdata?.success &&
                          (isCountryCodeIndia
                            ? kycdata.data?.pan_doc_front
                            : kycdata.data?.passport_doc_front)
                        }
                        refProp={doc1FrontRef}
                      />

                      {!isCountryCodeIndia && (
                        <Field
                          name="passport_doc_back"
                          component={CustomFileInput}
                          label="Passport Back"
                          disabled={isFieldDisabled()}
                          showImageUrl={kycdata?.success && kycdata.data?.passport_doc_back}
                          refProp={doc1BackRef}
                        />
                      )}

                      {isCountryCodeIndia && (
                        <Field name="panNumber">
                          {({ field, form }) => (
                            <CustomInput
                              field={field}
                              form={form}
                              label="PAN Number"
                              placeholder="Enter PAN number"
                              disabled={isFieldDisabled('pan')}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                                form.setFieldValue(field.name, value.toUpperCase());
                              }}
                              maxLength="10"
                            />
                          )}
                        </Field>
                      )}
                    </div>

                    {/* Bank Details */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                        Bank Details
                      </h3>

                      {isCountryCodeIndia && (
                        <Field name="upi_id">
                          {({ field, form }) => (
                            <CustomInput
                              field={field}
                              form={form}
                              label="UPI Number"
                              placeholder="Enter UPI number"
                              disabled={isFieldDisabled()}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                form.setFieldValue(field.name, value);
                              }}
                            />
                          )}
                        </Field>
                      )}

                      <Field name="bank_account">
                        {({ field, form }) => (
                          <CustomInput
                            field={field}
                            form={form}
                            label="Bank Account Number"
                            placeholder="Enter bank account number"
                            disabled={isFieldDisabled()}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                        )}
                      </Field>

                      <Field name="bank_name">
                        {({ field, form }) => (
                          <CustomInput
                            field={field}
                            form={form}
                            label="Bank Name"
                            placeholder="Enter bank name"
                            disabled={isFieldDisabled()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                              form.setFieldValue(field.name, value);
                            }}
                          />
                        )}
                      </Field>

                      <Field name="ifsc_code">
                        {({ field, form }) => (
                          <CustomInput
                            field={field}
                            form={form}
                            label={`Bank ${isCountryCodeIndia ? "IFSC" : ""} Code`}
                            placeholder="Enter bank code"
                            disabled={isFieldDisabled()}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                              form.setFieldValue(field.name, value.toUpperCase());
                            }}
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    {kycdata?.success !== 1 && (
                      <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors disabled:cursor-not-allowed min-w-[200px]"
                      >
                        {isSubmitting || loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Submit KYC Application'
                        )}
                      </button>
                    )}
                    
                    {(kycdata?.data?.status == "reject" ||
                      (kycdata?.data?.status == "approve" && isEditClicked)) && (
                      <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors disabled:cursor-not-allowed min-w-[200px]"
                      >
                        {isSubmitting || loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </span>
                        ) : (
                          'Update KYC Information'
                        )}
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <img src={digiLocker} alt="DigiLocker" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">DigiLocker Integration</h3>
                  <p className="text-sm text-gray-600">Secure document verification</p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">Auto-fill KYC Data</h4>
                <p className="text-gray-600">
                  Connect with DigiLocker to automatically fetch and fill your verified documents and personal information. This will save time and ensure accuracy.
                </p>
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <div className="text-teal-700 text-sm space-y-1">
                    <div>✓ Secure government verification</div>
                    <div>✓ Auto-fill personal details</div>
                    <div>✓ Faster KYC completion</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => setShowModal(false)}
              >
                Fill Manually
              </button>
              <button
                type="button"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                onClick={() => {
                  setShowModal(false);
                  handleButtonClick();
                }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  'Connect DigiLocker'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycInformation;
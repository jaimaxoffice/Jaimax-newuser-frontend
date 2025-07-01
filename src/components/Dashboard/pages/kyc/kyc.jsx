

// import { useState } from 'react';

// const Kyc = () => {
//   const [formData, setFormData] = useState({
//     applicantName: '',
//     dob: '',
//     mobile: '',
//     address: '',
//     aadharFront: null,
//     aadharBack: null,
//     panFile: null,
//     panNumber: '',
//     upi: '',
//     accountNumber: '',
//     bankName: '',
//     ifsc: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.applicantName) newErrors.applicantName = 'Name is required';
//     if (!formData.dob) newErrors.dob = 'Date of birth is required';

//     if (!formData.mobile) {
//       newErrors.mobile = 'Mobile number is required';
//     } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
//       newErrors.mobile = 'Enter a valid Indian mobile number';
//     }

//     if (!formData.address) newErrors.address = 'Address is required';

//     if (!formData.aadharFront) newErrors.aadharFront = 'Aadhar front is required';
//     if (!formData.aadharBack) newErrors.aadharBack = 'Aadhar back is required';

//     if (!formData.panFile) newErrors.panFile = 'PAN file is required';

//     if (!formData.panNumber) {
//       newErrors.panNumber = 'PAN number is required';
//     } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
//       newErrors.panNumber = 'Invalid PAN number';
//     }

//     if (!formData.upi) {
//       newErrors.upi = 'UPI ID is required';
//     } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upi)) {
//       newErrors.upi = 'Invalid UPI ID format';
//     }

//     if (!formData.accountNumber) newErrors.accountNumber = 'Bank account number is required';

//     if (!formData.bankName) newErrors.bankName = 'Bank name is required';

//     if (!formData.ifsc) {
//       newErrors.ifsc = 'IFSC code is required';
//     } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
//       newErrors.ifsc = 'Invalid IFSC code format';
//     }

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     console.log('Submitted Data:', formData);
//     alert("Form submitted successfully!");
//   };

//   const inputStyle =
//     'w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#4ecdc4] text-sm transition';
//   const sectionStyle = 'space-y-4 sm:space-y-5 p-4 sm:p-5 rounded-xl bg-white/5 backdrop-blur-sm';
//   const labelStyle = 'block text-sm font-medium text-white mb-1.5';
//   const errorStyle = 'text-red-400 text-xs mt-1';
//   const fileInputWrapper = 'flex items-center h-10 sm:h-11 rounded-md border border-white/20 overflow-hidden';

//   return (
//     <div className="bg-[#1d8e85] text-white px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div
//           className="w-full rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7"
//         >
//           {/* Header */}
//           <div className="col-span-1 lg:col-span-3 mb-4 sm:mb-6 lg:mb-7">
//             <h2 className="text-xl sm:text-2xl font-semibold mb-1">
//               KYC Information{' '}
//               <span className="block sm:inline text-sm sm:text-base font-normal text-white/80 mt-1 sm:mt-0">
//                 (Fill up information and verify your KYC)
//               </span>
//             </h2>
//             <p className="text-sm mt-1">
//               KYC status: <span className="text-red-400 font-semibold">n/a</span>
//             </p>
//           </div>

//           {/* Applicant Info */}
//           <div className={sectionStyle}>
//             <h3 className="font-semibold text-base sm:text-lg border-b border-white/30 pb-2 sm:pb-3 mb-3 sm:mb-4">
//               Applicant Info
//             </h3>

//             <div>
//               <label className={labelStyle} htmlFor="applicantName">Name of the Applicant *</label>
//               <input
//                 id="applicantName"
//                 name="applicantName"
//                 value={formData.applicantName}
//                 onChange={handleInputChange}
//                 placeholder="Enter name"
//                 className={inputStyle}
//               />
//               {errors.applicantName && <p className={errorStyle}>{errors.applicantName}</p>}
//             </div>

//             <div>
//               <label className={labelStyle} htmlFor="dob">Date of Birth *</label>
//               <input
//                 id="dob"
//                 name="dob"
//                 type="date"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//                 className={inputStyle}
//               />
//               {errors.dob && <p className={errorStyle}>{errors.dob}</p>}
//             </div>

//             <div>
//               <label className={labelStyle} htmlFor="mobile">Mobile Number (As per Bank) *</label>
//               <input
//                 id="mobile"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleInputChange}
//                 placeholder="Enter 10-digit mobile number"
//                 className={inputStyle}
//               />
//               {errors.mobile && <p className={errorStyle}>{errors.mobile}</p>}
//             </div>

//             <div>
//               <label className={labelStyle} htmlFor="address">Address *</label>
//               <textarea
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 placeholder="Enter your address"
//                 rows="3"
//                 className={inputStyle + ' resize-none'}
//               />
//               {errors.address && <p className={errorStyle}>{errors.address}</p>}
//             </div>
//           </div>

//           {/* Applicant Proofs */}
//           <div className={sectionStyle}>
//             <h3 className="font-semibold text-base sm:text-lg border-b border-white/30 pb-2 sm:pb-3 mb-3 sm:mb-4">
//               Applicant Proofs
//             </h3>
            
//             {[
//               ['aadharFront', 'Aadhar Front'],
//               ['aadharBack', 'Aadhar Back'],
//               ['panFile', 'PAN File'],
//             ].map(([field, label]) => (
//               <div key={field} className="mb-4 sm:mb-5">
//                 <label className={labelStyle} htmlFor={field}>{label} *</label>
//                 <div className={fileInputWrapper}>
//                   <label
//                     htmlFor={field}
//                     className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-5 h-full flex items-center text-xs sm:text-sm font-semibold cursor-pointer min-w-[100px] sm:min-w-[120px] justify-center transition-colors"
//                   >
//                     Choose file
//                   </label>
//                   <input
//                     type="file"
//                     id={field}
//                     name={field}
//                     onChange={handleInputChange}
//                     className="hidden"
//                     accept="image/*,.pdf"
//                   />
//                   <div className="bg-[#063c41] text-xs sm:text-sm text-white px-2 sm:px-3 h-full flex items-center w-full truncate">
//                     {formData[field]?.name || 'No file chosen'}
//                   </div>
//                 </div>
//                 {errors[field] && <p className={errorStyle}>{errors[field]}</p>}
//               </div>
//             ))}

//             <div>
//               <label className={labelStyle} htmlFor="panNumber">PAN Number *</label>
//               <input
//                 id="panNumber"
//                 name="panNumber"
//                 value={formData.panNumber.toUpperCase()}
//                 onChange={handleInputChange}
//                 placeholder="ABCDE1234F"
//                 className={inputStyle}
//                 maxLength="10"
//               />
//               {errors.panNumber && <p className={errorStyle}>{errors.panNumber}</p>}
//             </div>
//           </div>

//           {/* Bank Details */}
//           <div className={sectionStyle}>
//             <h3 className="font-semibold text-base sm:text-lg border-b border-white/30 pb-2 sm:pb-3 mb-3 sm:mb-4">
//               Bank Details
//             </h3>

//             <div>
//               <label className={labelStyle} htmlFor="upi">UPI ID *</label>
//               <input
//                 id="upi"
//                 name="upi"
//                 value={formData.upi}
//                 onChange={handleInputChange}
//                 placeholder="yourname@bank"
//                 className={inputStyle}
//               />
//               {errors.upi && <p className={errorStyle}>{errors.upi}</p>}
//             </div>

//             <div>
//               <label className={labelStyle} htmlFor="accountNumber">Bank Account Number *</label>
//               <input
//                 id="accountNumber"
//                 name="accountNumber"
//                 value={formData.accountNumber}
//                 onChange={handleInputChange}
//                 placeholder="Enter bank account number"
//                 className={inputStyle}
//               />
//               {errors.accountNumber && <p className={errorStyle}>{errors.accountNumber}</p>}
//             </div>

//             <div>
//               <label className={labelStyle} htmlFor="bankName">Bank Name *</label>
//               <input
//                 id="bankName"
//                 name="bankName"
//                 value={formData.bankName}
//                 onChange={handleInputChange}
//                 placeholder="Enter bank name"
//                 className={inputStyle}
//               />
//               {errors.bankName && <p className={errorStyle}>{errors.bankName}</p>}
//             </div>

//             <div>
//               <label className={labelStyle} htmlFor="ifsc">Bank IFSC Code *</label>
//               <input
//                 id="ifsc"
//                 name="ifsc"
//                 value={formData.ifsc.toUpperCase()}
//                 onChange={handleInputChange}
//                 placeholder="SBIN0001234"
//                 className={inputStyle}
//                 maxLength="11"
//               />
//               {errors.ifsc && <p className={errorStyle}>{errors.ifsc}</p>}
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center sm:justify-end pt-4 sm:pt-5">
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 className="w-full sm:w-auto bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold text-sm px-8 sm:px-14 py-3 rounded-full transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
//               >
//                 Submit KYC
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Kyc;

// import React, { useRef, useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// // Define your Yup validation schema
// const validationSchema = Yup.object({
//   applicantName: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Name is required'),
//   dateOfBirth: Yup.date()
//     .nullable()
//     .required('Date of Birth is required')
//     .max(new Date(), 'Date of Birth cannot be in the future'),
//   mobileNumber: Yup.string()
//     .matches(/^\+91[0-9]{10}$/, 'Mobile number must be 10 digits and start with +91')
//     .required('Mobile Number is required'),
//   address: Yup.string()
//     .min(10, 'Address is too short')
//     .required('Address is required'),
//   panNumber: Yup.string()
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format (e.g., ABCDE1234F)')
//     .required('PAN Number is required'),
//   aadharFront: Yup.mixed()
//     .required('Aadhar Front is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
//   aadharBack: Yup.mixed()
//     .required('Aadhar Back is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
//   pan: Yup.mixed()
//     .required('PAN card image is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),

//   upiNumber: Yup.string().matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').notRequired(),
//   bankAccountNumber: Yup.string().matches(/^[0-9]{9,18}$/, 'Invalid Account Number').notRequired(),
//   bankName: Yup.string().min(2, 'Bank name too short').notRequired(),
//   bankIfscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code').notRequired(),
// });

// function KYCForm() {
//   // --- Inner Components ---
//   const InputField = ({ label, name, value, onChange, onBlur, placeholder, type = 'text', required = false, error }) => (
//     <div className="mb-5 relative">
//       <label htmlFor={name} className="block text-teal-800 text-sm font-medium mb-1.5">
//         {label}{required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder={placeholder}
//         required={required}
//         className={`w-full p-3.5 border border-teal-300 rounded-lg bg-teal-50 text-teal-800 placeholder-teal-400
//                    shadow-sm transition-all duration-300 ease-in-out
//                    focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:outline-none
//                    ${error ? 'border-red-500 focus:ring-red-400' : ''}`}
//       />
//       {error && (
//         <p className="mt-1.5 text-xs text-red-500 font-medium">
//           {error}
//         </p>
//       )}
//     </div>
//   );

//   const FileInput = ({ label, name, onFileChange, required = false, error }) => {
//     const fileInputRef = useRef(null);
//     const [fileName, setFileName] = useState('No file chosen');

//     const formik = useFormik({
//       initialValues: {}, // Placeholder, as formik is passed down
//       validationSchema: validationSchema,
//       onSubmit: () => {},
//     });

//     useEffect(() => {
//       // Reset fileName if the field value is null (e.g., after form reset)
//       if (!formik.values[name] && fileName !== 'No file chosen') {
//         setFileName('No file chosen');
//       }
//     }, [formik.values[name], fileName, name]);


//     const handleButtonClick = () => {
//       fileInputRef.current.click();
//     };

//     const handleFileSelect = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setFileName(file.name);
//         onFileChange(file);
//       } else {
//         setFileName('No file chosen');
//         onFileChange(null);
//       }
//     };

//     return (
//       <div className="mb-5">
//         <label htmlFor={name} className="block text-teal-800 text-sm font-medium mb-1.5">
//           {label}{required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={handleButtonClick}
//             className={`px-5 py-2.5 rounded-full shadow-md text-sm font-medium transition-all duration-300 ease-in-out
//                        bg-gradient-to-br from-teal-500 to-teal-600 text-white
//                        hover:from-teal-600 hover:to-teal-700 hover:shadow-lg
//                        active:shadow-inner active:from-teal-700 active:to-teal-800 transform active:translate-y-0.5
//                        ${error ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800' : ''}`}
//           >
//             Choose file
//           </button>
//           <span className={`text-sm truncate max-w-[calc(100%-120px)] font-light ${error ? 'text-red-500' : 'text-teal-700'}`}>
//             {fileName}
//           </span>
//           <input
//             type="file"
//             id={name}
//             name={name}
//             ref={fileInputRef}
//             onChange={handleFileSelect}
//             className="hidden"
//             required={required}
//           />
//         </div>
//         {error && (
//           <p className="mt-1.5 text-xs text-red-500 font-medium">
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   const SectionTitle = ({ children }) => (
//     <h2 className="text-teal-700 text-xl font-semibold mb-6 pb-2
//                    relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-teal-400 after:rounded-full
//                    after:shadow-md">
//       {children}
//     </h2>
//   );
//   // --- End Inner Components ---

//   const formik = useFormik({
//     initialValues: {
//       applicantName: '',
//       dateOfBirth: '',
//       mobileNumber: '',
//       address: '',
//       upiNumber: '',
//       bankAccountNumber: '',
//       bankName: '',
//       bankIfscCode: '',
//       panNumber: '',
//       aadharFront: null,
//       aadharBack: null,
//       pan: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       console.log('Form Data Submitted:', values);
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       alert('Form submitted successfully!');
//       setSubmitting(false);
//       resetForm();
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
//                     bg-[#1d8e85]
//                    ">
//       <div className="bg-white rounded-2xl
//                       shadow-2xl p-6 sm:p-8 md:p-10 max-w-7xl mx-auto w-full
//                       border border-teal-200
//                       transform rotate-x-[2deg] translate-z-10
//                       transition-transform duration-500 ease-out">

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-teal-100">
//           <h1 className="text-2xl sm:text-3xl font-bold text-teal-800 leading-tight mb-2 sm:mb-0">
//             KYC Information
//             <p className="text-base font-normal text-teal-600 mt-1">(Fill up information and verify your KYC.)</p>
//           </h1>
//           <div className="flex items-center text-teal-700 font-semibold text-lg">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             Country: India
//           </div>
//         </div>

//         <div className="mb-8 text-lg font-semibold">
//           <span className="text-teal-700 ">KYC status: </span>
//           <span className="text-orange-500 font-bold animate-pulse">N/A</span>
//         </div>

//         <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
//           {/* Applicant Info */}
//           <div className="col-span-1">
//             <SectionTitle>Applicant Info</SectionTitle>
//             <InputField
//               label="Name of the Applicant"
//               name="applicantName"
//               type="text"
//               value={formik.values.applicantName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Rajyalaxmi"
//               error={formik.touched.applicantName && formik.errors.applicantName}
//               required
//             />
//             <InputField
//               label="Date of Birth"
//               name="dateOfBirth"
//               type="date"
//               value={formik.values.dateOfBirth}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Date of Birth"
//               error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
//               required
//             />
//             <InputField
//               label="Mobile Number (As per Bank)"
//               name="mobileNumber"
//               type="tel"
//               value={formik.values.mobileNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="+91 XXXXXXXXXX"
//               error={formik.touched.mobileNumber && formik.errors.mobileNumber}
//               required
//             />
//             <InputField
//               label="Address"
//               name="address"
//               type="text"
//               value={formik.values.address}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter your address"
//               error={formik.touched.address && formik.errors.address}
//               required
//             />
//           </div>

//           {/* Applicant Proofs */}
//           <div className="col-span-1">
//             <SectionTitle>Applicant Proofs</SectionTitle>
//             <FileInput
//               label="Aadhar Front"
//               name="aadharFront"
//               onFileChange={(file) => {
//                 formik.setFieldValue('aadharFront', file);
//                 formik.setFieldTouched('aadharFront', true, false);
//               }}
//               error={formik.touched.aadharFront && formik.errors.aadharFront}
//               required
//             />
//             <FileInput
//               label="Aadhar Back"
//               name="aadharBack"
//               onFileChange={(file) => {
//                 formik.setFieldValue('aadharBack', file);
//                 formik.setFieldTouched('aadharBack', true, false);
//               }}
//               error={formik.touched.aadharBack && formik.errors.aadharBack}
//               required
//             />
//             <FileInput
//               label="PAN"
//               name="pan"
//               onFileChange={(file) => {
//                 formik.setFieldValue('pan', file);
//                 formik.setFieldTouched('pan', true, false);
//               }}
//               error={formik.touched.pan && formik.errors.pan}
//               required
//             />
//             <InputField
//               label="PAN Number"
//               name="panNumber"
//               type="text"
//               value={formik.values.panNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter PAN number"
//               error={formik.touched.panNumber && formik.errors.panNumber}
//               required
//             />
//           </div>

//           {/* Bank Details */}
//           <div className="col-span-1">
//             <SectionTitle>Bank Details</SectionTitle>
//             <InputField
//               label="UPI Number"
//               name="upiNumber"
//               type="text"
//               value={formik.values.upiNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter UPI number (optional)"
//               error={formik.touched.upiNumber && formik.errors.upiNumber}
//             />
//             <InputField
//               label="Bank Account Number"
//               name="bankAccountNumber"
//               type="text"
//               value={formik.values.bankAccountNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank account number (optional)"
//               error={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
//             />
//             <InputField
//               label="Bank Name"
//               name="bankName"
//               type="text"
//               value={formik.values.bankName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank name (optional)"
//               error={formik.touched.bankName && formik.errors.bankName}
//             />
//             <InputField
//               label="Bank IFSC Code"
//               name="bankIfscCode"
//               type="text"
//               value={formik.values.bankIfscCode}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank IFSC code (optional)"
//               error={formik.touched.bankIfscCode && formik.errors.bankIfscCode}
//             />
//           </div>

//           <div className="col-span-full flex justify-end mt-10">
//             <button
//               type="submit"
//               className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold py-3.5 px-10 rounded-full
//                          shadow-lg hover:shadow-xl
//                          active:shadow-inner active:from-teal-700 active:to-teal-800
//                          transform active:translate-y-0.5
//                          transition-all duration-400 ease-in-out
//                          flex items-center justify-center gap-2
//                          disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting && (
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               )}
//               {formik.isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default KYCForm;




// import React, { useRef, useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

// // Define your Yup validation schema
// const validationSchema = Yup.object({
//   applicantName: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Name is required'),
//   dateOfBirth: Yup.date()
//     .nullable()
//     .required('Date of Birth is required')
//     .max(new Date(), 'Date of Birth cannot be in the future'),
//   mobileNumber: Yup.string()
//     .matches(/^\+91[0-9]{10}$/, 'Mobile number must be 10 digits and start with +91')
//     .required('Mobile Number is required'),
//   address: Yup.string()
//     .min(10, 'Address is too short')
//     .required('Address is required'),
//   panNumber: Yup.string()
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format (e.g., ABCDE1234F)')
//     .required('PAN Number is required'),
//   aadharFront: Yup.mixed()
//     .required('Aadhar Front is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
//   aadharBack: Yup.mixed()
//     .required('Aadhar Back is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
//   pan: Yup.mixed()
//     .required('PAN card image is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),

//   upiNumber: Yup.string().matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').notRequired(),
//   bankAccountNumber: Yup.string().matches(/^[0-9]{9,18}$/, 'Invalid Account Number').notRequired(),
//   bankName: Yup.string().min(2, 'Bank name too short').notRequired(),
//   bankIfscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code').notRequired(),
// });

// function KYCForm() {
//   // --- Inner Components ---
//   const InputField = ({ label, name, value, onChange, onBlur, placeholder, type = 'text', required = false, error }) => (
//     <div className="mb-4 relative"> {/* Decreased mb from 5 to 4 */}
//       <label htmlFor={name} className="block text-black text-sm font-medium mb-1"> {/* Decreased mb from 1.5 to 1 */}
//         {label}{required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder={placeholder}
//         required={required}
//         className={`w-full p-2.5 border border-teal-300 rounded-lg bg-teal-50 text-teal-800 placeholder-gray-400 /* Decreased p from 3.5 to 2.5 */
//                    shadow-sm transition-all duration-300 ease-in-out
//                    focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:outline-none
//                    ${error ? 'border-red-500 focus:ring-red-400' : ''}`}
//       />
//       {error && (
//         <p className="mt-1 text-xs text-red-500 font-medium"> 
//           {error}
//         </p>
//       )}
//     </div>
//   );

//   const FileInput = ({ label, name, onFileChange, required = false, error, formikTouched, formikValue }) => {
//     const fileInputRef = useRef(null);
//     const [fileName, setFileName] = useState('No file chosen');

//     useEffect(() => {
//       // Reset fileName if the field value is null (e.g., after form reset)
//       if (!formikValue && fileName !== 'No file chosen') {
//         setFileName('No file chosen');
//       }
//     }, [formikValue, fileName, name]);


//     const handleButtonClick = () => {
//       fileInputRef.current.click();
//     };

//     const handleFileSelect = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setFileName(file.name);
//         onFileChange(file);
//       } else {
//         setFileName('No file chosen');
//         onFileChange(null);
//       }
//     };

//     return (
//       <div className="mb-4"> {/* Decreased mb from 5 to 4 */}
//         <label htmlFor={name} className="block text-teal-800 text-sm font-medium mb-3"> 
//           {label}{required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <div className="flex items-center gap-2"> {/* Decreased gap from 3 to 2 */}
//           <button
//             type="button"
//             onClick={handleButtonClick}
//             className={`px-4 py-2 rounded-full shadow-md text-sm font-medium transition-all duration-300 ease-in-out /* Decreased px from 5 to 4, py from 2.5 to 2 */
//                        bg-gradient-to-br from-teal-500 to-teal-600 text-white
//                        hover:from-teal-600 hover:to-teal-700 hover:shadow-lg
//                        active:shadow-inner active:from-teal-700 active:to-teal-800 transform active:translate-y-0.5
//                        ${error ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800' : ''}`}
//           >
//             Choose file
//           </button>
//           <span className={`text-sm truncate max-w-[calc(100%-110px)] font-light ${error ? 'text-red-500' : 'text-teal-700'}`}> {/* Adjusted max-w to account for smaller button */}
//             {fileName}
//           </span>
//           <input
//             type="file"
//             id={name}
//             name={name}
//             ref={fileInputRef}
//             onChange={handleFileSelect}
//             className="hidden"
//             required={required}
//           />
//         </div>
//         {error && (
//           <p className="mt-1 text-xs text-red-500 font-medium"> {/* Decreased mt from 1.5 to 1 */}
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   const SectionTitle = ({ children }) => (
//     <h2 className="text-teal-700 text-lg font-semibold mb-4 pb-1.5 /* Decreased text-xl to text-lg, mb from 6 to 4, pb from 2 to 1.5 */
//                    relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-teal-400 after:rounded-full /* Decreased after:h-1 to after:h-0.5 */
//                    after:shadow-md">
//       {children}
//     </h2>
//   );
//   // --- End Inner Components ---

//   const formik = useFormik({
//     initialValues: {
//       applicantName: '',
//       dateOfBirth: '',
//       mobileNumber: '',
//       address: '',
//       upiNumber: '',
//       bankAccountNumber: '',
//       bankName: '',
//       bankIfscCode: '',
//       panNumber: '',
//       aadharFront: null,
//       aadharBack: null,
//       pan: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       try {
//         console.log('Form Data Submitted:', values);
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         toast.success('KYC information submitted successfully!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         resetForm();
//       } catch (error) {
//         console.error('Submission error:', error);
//         toast.error('Failed to submit KYC information. Please try again.', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 
//                     bg-[#1d8e85]
//                     [perspective:1000px]">
//       <ToastContainer /> {/* Add ToastContainer here */}
//       <div className="bg-white rounded-2xl
//                       shadow-2xl p-6 max-w-8xl mx-auto w-full 
//                       border border-teal-200
//                       transform rotate-x-[2deg] translate-z-10
//                       transition-transform duration-500 ease-out">

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 pb-3 border-b border-teal-100"> 
//           <h1 className="text-xl sm:text-2xl font-bold text-teal-800 leading-tight mb-1 sm:mb-0"> 
//             KYC Information
//             <p className="text-sm font-normal text-teal-600 mt-1">(Fill up information and verify your KYC.)</p> {/* Decreased text-base to text-sm */}
//           </h1>
//           <div className="flex items-center text-teal-700 font-semibold text-base"> {/* Decreased text-lg to text-base */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> {/* Decreased h-6 w-6 to h-5 w-5, mr from 2 to 1.5 */}
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             Country: India
//           </div>
//         </div>

//         <div className="mb-2 text-base font-semibold"> {/* Decreased mb from 8 to 6, text-lg to text-base */}
//           <span className="text-teal-700 ">KYC status: </span>
//           <span className="text-orange-500 font-bold animate-pulse">N/A</span>
//         </div>

//         <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"> {/* Decreased gap-x from 8 to 6, gap-y from 6 to 4 */}
//           {/* Applicant Info */}
//           <div className="col-span-1">
//             <SectionTitle>Applicant Info</SectionTitle>
//             <InputField
//               label="Name of the Applicant"
//               name="applicantName"
//               type="text"
//               value={formik.values.applicantName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter you name"
//               error={formik.touched.applicantName && formik.errors.applicantName}
//               required
//             />
//             <InputField
//               label="Date of Birth"
//               name="dateOfBirth"
//               type="date"
//               value={formik.values.dateOfBirth}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Date of Birth"
//               error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
//               required
//             />
//             <InputField
//               label="Mobile Number (As per Bank)"
//               name="mobileNumber"
//               type="tel"
//               value={formik.values.mobileNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="+91 XXXXXXXXXX"
//               error={formik.touched.mobileNumber && formik.errors.mobileNumber}
//               required
//             />
//             <InputField
//               label="Address"
//               name="address"
//               type="text"
//               value={formik.values.address}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter your address"
//               error={formik.touched.address && formik.errors.address}
//               required
//             />
//           </div>

//           {/* Applicant Proofs */}
//           <div className="col-span-1">
//             <SectionTitle>Applicant Proofs</SectionTitle>
//             <FileInput
//               label="Aadhar Front"
//               name="aadharFront"
//               onFileChange={(file) => {
//                 formik.setFieldValue('aadharFront', file);
//                 formik.setFieldTouched('aadharFront', true, false);
//               }}
//               formikTouched={formik.touched.aadharFront} // Pass touched state
//               formikValue={formik.values.aadharFront} // Pass value state
//               error={formik.touched.aadharFront && formik.errors.aadharFront}
//               required
//             />
//             <FileInput
//               label="Aadhar Back"
//               name="aadharBack"
//               onFileChange={(file) => {
//                 formik.setFieldValue('aadharBack', file);
//                 formik.setFieldTouched('aadharBack', true, false);
//               }}
//               formikTouched={formik.touched.aadharBack} // Pass touched state
//               formikValue={formik.values.aadharBack} // Pass value state
//               error={formik.touched.aadharBack && formik.errors.aadharBack}
//               required
//             />
//             <FileInput
//               label="PAN"
//               name="pan"
//               onFileChange={(file) => {
//                 formik.setFieldValue('pan', file);
//                 formik.setFieldTouched('pan', true, false);
//               }}
//               formikTouched={formik.touched.pan} // Pass touched state
//               formikValue={formik.values.pan} // Pass value state
//               error={formik.touched.pan && formik.errors.pan}
//               required
//             />
//             <InputField
//               label="PAN Number"
//               name="panNumber"
//               type="text"
//               value={formik.values.panNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter PAN number"
//               error={formik.touched.panNumber && formik.errors.panNumber}
//               required
//             />
//           </div>

//           {/* Bank Details */}
//           <div className="col-span-1">
//             <SectionTitle>Bank Details</SectionTitle>
//             <InputField
//               label="UPI Number"
//               name="upiNumber"
//               type="text"
//               value={formik.values.upiNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter UPI number (optional)"
//               error={formik.touched.upiNumber && formik.errors.upiNumber}
//             />
//             <InputField
//               label="Bank Account Number"
//               name="bankAccountNumber"
//               type="text"
//               value={formik.values.bankAccountNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank account number (optional)"
//               error={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
//             />
//             <InputField
//               label="Bank Name"
//               name="bankName"
//               type="text"
//               value={formik.values.bankName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank name (optional)"
//               error={formik.touched.bankName && formik.errors.bankName}
//             />
//             <InputField
//               label="Bank IFSC Code"
//               name="bankIfscCode"
//               type="text"
//               value={formik.values.bankIfscCode}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank IFSC code (optional)"
//               error={formik.touched.bankIfscCode && formik.errors.bankIfscCode}
//             />
//           </div>

//           <div className="col-span-full flex justify-end mt-0"> {/* Decreased mt from 10 to 6 */}
//             <button
//               type="submit"
//               className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold py-3 px-8 rounded-full /* Decreased py from 3.5 to 3, px from 10 to 8 */
//                          shadow-lg hover:shadow-xl
//                          active:shadow-inner active:from-teal-700 active:to-teal-800
//                          transform active:translate-y-0.5
//                          transition-all duration-400 ease-in-out
//                          flex items-center justify-center gap-2
//                          disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting && (
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               )}
//               {formik.isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default KYCForm;



// import React, { useRef, useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import digiLocker from "../../../../assets/digilocker.jpg";
// import DigiLockerModal from './DigiLockerModal';
// const validationSchema = Yup.object({
//   applicantName: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Name is required'),
//   dateOfBirth: Yup.date()
//     .nullable()
//     .required('Date of Birth is required')
//     .max(new Date(), 'Date of Birth cannot be in the future'),
//   mobileNumber: Yup.string()
//     .matches(/^\+91[0-9]{10}$/, 'Mobile number must be 10 digits and start with +91')
//     .required('Mobile Number is required'),
//   address: Yup.string()
//     .min(10, 'Address is too short')
//     .required('Address is required'),
//   panNumber: Yup.string()
//     .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format (e.g., ABCDE1234F)')
//     .required('PAN Number is required'),
//   aadharFront: Yup.mixed()
//     .required('Aadhar Front is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
//   aadharBack: Yup.mixed()
//     .required('Aadhar Back is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
//   pan: Yup.mixed()
//     .required('PAN card image is required')
//     .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
//     .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),

//   upiNumber: Yup.string().matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').notRequired(),
//   bankAccountNumber: Yup.string().matches(/^[0-9]{9,18}$/, 'Invalid Account Number').notRequired(),
//   bankName: Yup.string().min(2, 'Bank name too short').notRequired(),
//   bankIfscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code').notRequired(),
// });

// function KYCForm() {
//    const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
//    const handleShow = () => setShowDigiLockerModal(true);
//   const handleHide = () => setShowDigiLockerModal(false);
//   // --- Inner Components ---
//   const InputField = ({ label, name, value, onChange, onBlur, placeholder, type = 'text', required = false, error }) => (
//     <div className="mb-4 relative"> {/* Decreased mb from 5 to 4 */}
//       <label htmlFor={name} className="block text-black text-sm font-medium mb-1"> {/* Decreased mb from 1.5 to 1 */}
//         {label}{required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder={placeholder}
//         required={required}
//         className={`w-full p-2.5 border border-teal-300 rounded-lg bg-teal-50 text-teal-800 placeholder-gray-400 /* Decreased p from 3.5 to 2.5 */
//                    shadow-sm transition-all duration-300 ease-in-out
//                    focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:outline-none
//                    ${error ? 'border-red-500 focus:ring-red-400' : ''}`}
//       />
//       {error && (
//         <p className="mt-1 text-xs text-red-500 font-medium"> 
//           {error}
//         </p>
//       )}
//     </div>
//   );

//   const FileInput = ({ label, name, onFileChange, required = false, error, formikTouched, formikValue }) => {
//     const fileInputRef = useRef(null);
//     const [fileName, setFileName] = useState('No file chosen');

//     useEffect(() => {
//       // Reset fileName if the field value is null (e.g., after form reset)
//       if (!formikValue && fileName !== 'No file chosen') {
//         setFileName('No file chosen');
//       }
//     }, [formikValue, fileName, name]);


//     const handleButtonClick = () => {
//       fileInputRef.current.click();
//     };

//     const handleFileSelect = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setFileName(file.name);
//         onFileChange(file);
//       } else {
//         setFileName('No file chosen');
//         onFileChange(null);
//       }
//     };

//     return (
//       <div className="mb-4"> {/* Decreased mb from 5 to 4 */}
//         <label htmlFor={name} className="block text-teal-800 text-sm font-medium mb-3"> 
//           {label}{required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <div className="flex items-center gap-2"> {/* Decreased gap from 3 to 2 */}
//           <button
//             type="button"
//             onClick={handleButtonClick}
//             className={`px-4 py-2 rounded-full shadow-md text-sm font-medium transition-all duration-300 ease-in-out /* Decreased px from 5 to 4, py from 2.5 to 2 */
//                        bg-gradient-to-br from-teal-500 to-teal-600 text-white
//                        hover:from-teal-600 hover:to-teal-700 hover:shadow-lg
//                        active:shadow-inner active:from-teal-700 active:to-teal-800 transform active:translate-y-0.5
//                        ${error ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800' : ''}`}
//           >
//             Choose file
//           </button>
//           <span className={`text-sm truncate max-w-[calc(100%-110px)] font-light ${error ? 'text-red-500' : 'text-teal-700'}`}> {/* Adjusted max-w to account for smaller button */}
//             {fileName}
//           </span>
//           <input
//             type="file"
//             id={name}
//             name={name}
//             ref={fileInputRef}
//             onChange={handleFileSelect}
//             className="hidden"
//             required={required}
//           />
//         </div>
//         {error && (
//           <p className="mt-1 text-xs text-red-500 font-medium"> {/* Decreased mt from 1.5 to 1 */}
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   const SectionTitle = ({ children }) => (
//     <h2 className="text-teal-700 text-lg font-semibold mb-4 pb-1.5 /* Decreased text-xl to text-lg, mb from 6 to 4, pb from 2 to 1.5 */
//                    relative after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-0.5 after:bg-teal-400 after:rounded-full /* Decreased after:h-1 to after:h-0.5 */
//                    after:shadow-md">
//       {children}
//     </h2>
//   );
//   // --- End Inner Components ---

//   const formik = useFormik({
//     initialValues: {
//       applicantName: '',
//       dateOfBirth: '',
//       mobileNumber: '',
//       address: '',
//       upiNumber: '',
//       bankAccountNumber: '',
//       bankName: '',
//       bankIfscCode: '',
//       panNumber: '',
//       aadharFront: null,
//       aadharBack: null,
//       pan: null,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       try {
//         console.log('Form Data Submitted:', values);
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         toast.success('KYC information submitted successfully!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         resetForm();
//       } catch (error) {
//         console.error('Submission error:', error);
//         toast.error('Failed to submit KYC information. Please try again.', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 
//                     bg-[#1d8e85]
//                     [perspective:1000px]">
//       <ToastContainer /> {/* Add ToastContainer here */}
//       <div className="bg-white rounded-2xl
//                       shadow-2xl p-6 max-w-8xl mx-auto w-full 
//                       border border-teal-200
//                       transform rotate-x-[2deg] translate-z-10
//                       transition-transform duration-500 ease-out">

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 pb-1 border-b border-teal-100"> 
//           <h1 className="text-xl sm:text-2xl font-bold text-teal-800 leading-tight mb-1 sm:mb-0"> 
//             KYC Information
//             <p className="text-sm font-normal text-teal-600 mt-1">(Fill up information and verify your KYC.)</p> {/* Decreased text-base to text-sm */}
//           </h1>
//           <div className="flex items-center text-teal-700 font-semibold text-base"> {/* Decreased text-lg to text-base */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> {/* Decreased h-6 w-6 to h-5 w-5, mr from 2 to 1.5 */}
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             Country: India
//           </div>
//           <img src={digiLocker} alt="" width={80} onClick={handleShow} />
//         </div>

//         <div className="mb-2 text-base font-semibold"> {/* Decreased mb from 8 to 6, text-lg to text-base */}
//           <span className="text-teal-700 ">KYC status: </span>
//           <span className="text-orange-500 font-bold animate-pulse">N/A</span>
//         </div>

//         <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"> {/* Decreased gap-x from 8 to 6, gap-y from 6 to 4 */}
//           {/* Applicant Info */}
//           <div className="col-span-1">
//             <SectionTitle>Applicant Info</SectionTitle>
//             <InputField
//               label="Name of the Applicant"
//               name="applicantName"
//               type="text"
//               value={formik.values.applicantName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter you name"
//               error={formik.touched.applicantName && formik.errors.applicantName}
//               required
//             />
//             <InputField
//               label="Date of Birth"
//               name="dateOfBirth"
//               type="date"
//               value={formik.values.dateOfBirth}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Date of Birth"
//               error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
//               required
//             />
//             <InputField
//               label="Mobile Number (As per Bank)"
//               name="mobileNumber"
//               type="tel"
//               value={formik.values.mobileNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="+91 XXXXXXXXXX"
//               error={formik.touched.mobileNumber && formik.errors.mobileNumber}
//               required
//             />
//             <InputField
//               label="Address"
//               name="address"
//               type="text"
//               value={formik.values.address}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter your address"
//               error={formik.touched.address && formik.errors.address}
//               required
//             />
//           </div>

//           {/* Applicant Proofs */}
//           <div className="col-span-1">
//             <SectionTitle>Applicant Proofs</SectionTitle>
//             <FileInput
//               label="Aadhar Front"
//               name="aadharFront"
//               onFileChange={(file) => {
//                 formik.setFieldValue('aadharFront', file);
//                 formik.setFieldTouched('aadharFront', true, false);
//               }}
//               formikTouched={formik.touched.aadharFront} // Pass touched state
//               formikValue={formik.values.aadharFront} // Pass value state
//               error={formik.touched.aadharFront && formik.errors.aadharFront}
//               required
//             />
//             <FileInput
//               label="Aadhar Back"
//               name="aadharBack"
//               onFileChange={(file) => {
//                 formik.setFieldValue('aadharBack', file);
//                 formik.setFieldTouched('aadharBack', true, false);
//               }}
//               formikTouched={formik.touched.aadharBack} // Pass touched state
//               formikValue={formik.values.aadharBack} // Pass value state
//               error={formik.touched.aadharBack && formik.errors.aadharBack}
//               required
//             />
//             <FileInput
//               label="PAN"
//               name="pan"
//               onFileChange={(file) => {
//                 formik.setFieldValue('pan', file);
//                 formik.setFieldTouched('pan', true, false);
//               }}
//               formikTouched={formik.touched.pan} // Pass touched state
//               formikValue={formik.values.pan} // Pass value state
//               error={formik.touched.pan && formik.errors.pan}
//               required
//             />
//             <InputField
//               label="PAN Number"
//               name="panNumber"
//               type="text"
//               value={formik.values.panNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter PAN number"
//               error={formik.touched.panNumber && formik.errors.panNumber}
//               required
//             />
//           </div>

//           {/* Bank Details */}
//           <div className="col-span-1">
//             <SectionTitle>Bank Details</SectionTitle>
//             <InputField
//               label="UPI Number"
//               name="upiNumber"
//               type="text"
//               value={formik.values.upiNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter UPI number (optional)"
//               error={formik.touched.upiNumber && formik.errors.upiNumber}
//             />
//             <InputField
//               label="Bank Account Number"
//               name="bankAccountNumber"
//               type="text"
//               value={formik.values.bankAccountNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank account number (optional)"
//               error={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
//             />
//             <InputField
//               label="Bank Name"
//               name="bankName"
//               type="text"
//               value={formik.values.bankName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank name (optional)"
//               error={formik.touched.bankName && formik.errors.bankName}
//             />
//             <InputField
//               label="Bank IFSC Code"
//               name="bankIfscCode"
//               type="text"
//               value={formik.values.bankIfscCode}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Enter bank IFSC code (optional)"
//               error={formik.touched.bankIfscCode && formik.errors.bankIfscCode}
//             />
//           </div>

//           <div className="col-span-full flex justify-end mt-0"> {/* Decreased mt from 10 to 6 */}
//             <button
//               type="submit"
//               className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold py-3 px-8 rounded-full /* Decreased py from 3.5 to 3, px from 10 to 8 */
//                          shadow-lg hover:shadow-xl
//                          active:shadow-inner active:from-teal-700 active:to-teal-800
//                          transform active:translate-y-0.5
//                          transition-all duration-400 ease-in-out
//                          flex items-center justify-center gap-2
//                          disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
//               disabled={formik.isSubmitting}
//             >
//               {formik.isSubmitting && (
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               )}
//               {formik.isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//         <DigiLockerModal
//         show={showDigiLockerModal} // Controls whether the modal is visible
//         onHide={handleHide}       // Function to call when the modal needs to be hidden (e.g., by clicking backdrop)
//         onClickDigiLocker={handleShow}
//       />
//       </div>
//     </div>
//   );
// }

// export default KYCForm;




import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import digiLocker from "../../../../assets/digilocker.jpg";
import DigiLockerModal from './DigiLockerModal';

const validationSchema = Yup.object({
  applicantName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  dateOfBirth: Yup.date()
    .nullable()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  mobileNumber: Yup.string()
    .matches(/^\+91[0-9]{10}$/, 'Mobile number must be 10 digits and start with +91')
    .required('Mobile Number is required'),
  address: Yup.string()
    .min(10, 'Address is too short')
    .required('Address is required'),
  panNumber: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format (e.g., ABCDE1234F)')
    .required('PAN Number is required'),
  aadharFront: Yup.mixed()
    .required('Aadhar Front is required')
    .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
  aadharBack: Yup.mixed()
    .required('Aadhar Back is required')
    .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),
  pan: Yup.mixed()
    .required('PAN card image is required')
    .test('fileSize', 'File too large (max 5MB)', (value) => value && value.size <= 5 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)),

  upiNumber: Yup.string().matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').notRequired(),
  bankAccountNumber: Yup.string().matches(/^[0-9]{9,18}$/, 'Invalid Account Number').notRequired(),
  bankName: Yup.string().min(2, 'Bank name too short').notRequired(),
  bankIfscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code').notRequired(),
});

function KYCForm() {
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
  const handleShow = () => setShowDigiLockerModal(true);
  const handleHide = () => setShowDigiLockerModal(false);

  // --- Inner Components ---
  const InputField = ({ label, name, value, onChange, onBlur, placeholder, type = 'text', required = false, error }) => (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`w-full p-3 text-sm border-2 rounded-lg bg-white text-gray-800 placeholder-gray-400
                   shadow-sm transition-all duration-300 ease-in-out
                   focus:ring-2 focus:ring-teal-400 focus:border-teal-400 focus:outline-none
                   ${error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-200 hover:border-teal-300'}`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium flex items-center"> 
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );

  const FileInput = ({ label, name, onFileChange, required = false, error, formikTouched, formikValue }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('No file chosen');

    useEffect(() => {
      if (!formikValue && fileName !== 'No file chosen') {
        setFileName('No file chosen');
      }
    }, [formikValue, fileName, name]);

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        onFileChange(file);
      } else {
        setFileName('No file chosen');
        onFileChange(null);
      }
    };

    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2"> 
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 border-2 rounded-lg border-dashed transition-all duration-300 hover:border-teal-400 hover:bg-teal-50/30 
                        ${error ? 'border-red-300 bg-red-50/30' : 'border-gray-300 bg-gray-50/30'}`}>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-all duration-300 ease-in-out
                       bg-gradient-to-r from-teal-500 to-teal-600 text-white
                       hover:from-teal-600 hover:to-teal-700 hover:shadow-md
                       active:shadow-inner active:from-teal-700 active:to-teal-800 transform active:scale-95
                       ${error ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : ''}
                       whitespace-nowrap flex-shrink-0 flex items-center gap-2`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Choose File
          </button>
          <div className="flex-1 min-w-0">
            <span className={`text-sm truncate block ${error ? 'text-red-600' : 'text-gray-600'} 
                             ${fileName !== 'No file chosen' ? 'font-medium' : 'font-normal'}`}>
              {fileName}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              Supported: JPG, PNG, PDF (Max 5MB)
            </span>
          </div>
          <input
            type="file"
            id={name}
            name={name}
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            required={required}
            accept="image/jpeg,image/png,application/pdf"
          />
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-500 font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  };

  const SectionCard = ({ title, icon, children, className = "" }) => (
    <div className={`bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  // --- End Inner Components ---

  const formik = useFormik({
    initialValues: {
      applicantName: '',
      dateOfBirth: '',
      mobileNumber: '',
      address: '',
      upiNumber: '',
      bankAccountNumber: '',
      bankName: '',
      bankIfscCode: '',
      panNumber: '',
      aadharFront: null,
      aadharBack: null,
      pan: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log('Form Data Submitted:', values);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('KYC information submitted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetForm();
      } catch (error) {
        console.error('Submission error:', error);
        toast.error('Failed to submit KYC information. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#1d8d84] py-6 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                KYC Verification
              </h1>
              <p className="text-gray-600">
                Complete your Know Your Customer verification process
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center text-gray-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Country: India
              </div>
              <img 
                src={digiLocker} 
                alt="DigiLocker" 
                className="w-16 h-auto cursor-pointer hover:opacity-80 transition-opacity rounded-lg shadow-sm" 
                onClick={handleShow} 
              />
            </div>
          </div>

          {/* KYC Status */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-orange-700 font-medium">KYC Status: Pending Verification</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Grid Layout for Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Section 1: Personal Information */}
            <SectionCard title="Personal Information" icon="👤">
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  name="applicantName"
                  type="text"
                  value={formik.values.applicantName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                  error={formik.touched.applicantName && formik.errors.applicantName}
                  required
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  required
                />
                <InputField
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="+91 XXXXXXXXXX"
                  error={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  required
                />
                <InputField
                  label="Complete Address"
                  name="address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your complete address"
                  error={formik.touched.address && formik.errors.address}
                  required
                />
              </div>
            </SectionCard>

            {/* Section 2: Document Upload */}
            <SectionCard title="Document Upload" icon="📄">
              <div className="space-y-4">
                <FileInput
                  label="Aadhar Card (Front)"
                  name="aadharFront"
                  onFileChange={(file) => {
                    formik.setFieldValue('aadharFront', file);
                    formik.setFieldTouched('aadharFront', true, false);
                  }}
                  formikTouched={formik.touched.aadharFront}
                  formikValue={formik.values.aadharFront}
                  error={formik.touched.aadharFront && formik.errors.aadharFront}
                  required
                />
                <FileInput
                  label="Aadhar Card (Back)"
                  name="aadharBack"
                  onFileChange={(file) => {
                    formik.setFieldValue('aadharBack', file);
                    formik.setFieldTouched('aadharBack', true, false);
                  }}
                  formikTouched={formik.touched.aadharBack}
                  formikValue={formik.values.aadharBack}
                  error={formik.touched.aadharBack && formik.errors.aadharBack}
                  required
                />
                <FileInput
                  label="PAN Card"
                  name="pan"
                  onFileChange={(file) => {
                    formik.setFieldValue('pan', file);
                    formik.setFieldTouched('pan', true, false);
                  }}
                  formikTouched={formik.touched.pan}
                  formikValue={formik.values.pan}
                  error={formik.touched.pan && formik.errors.pan}
                  required
                />
                <InputField
                  label="PAN Number"
                  name="panNumber"
                  type="text"
                  value={formik.values.panNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ABCDE1234F"
                  error={formik.touched.panNumber && formik.errors.panNumber}
                  required
                />
              </div>
            </SectionCard>

            {/* Section 3: Banking Details */}
            <SectionCard title="Banking Details" icon="🏦">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Optional but recommended
                </p>
              </div>
              <div className="space-y-4">
                <InputField
                  label="UPI ID"
                  name="upiNumber"
                  type="text"
                  value={formik.values.upiNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="yourname@upi"
                  error={formik.touched.upiNumber && formik.errors.upiNumber}
                />
                <InputField
                  label="Bank Account Number"
                  name="bankAccountNumber"
                  type="text"
                  value={formik.values.bankAccountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter account number"
                  error={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
                />
                <InputField
                  label="Bank Name"
                  name="bankName"
                  type="text"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter bank name"
                  error={formik.touched.bankName && formik.errors.bankName}
                />
                <InputField
                  label="IFSC Code"
                  name="bankIfscCode"
                  type="text"
                  value={formik.values.bankIfscCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ABCD0123456"
                  error={formik.touched.bankIfscCode && formik.errors.bankIfscCode}
                />
              </div>
            </SectionCard>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold text-lg
                         shadow-lg  disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                         flex items-end gap-3"
            >
              {formik.isSubmitting && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {formik.isSubmitting ? 'Submitting KYC...' : 'Submit KYC Verification'}
              {!formik.isSubmitting && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </div>
        </form>

        <DigiLockerModal
          show={showDigiLockerModal}
          onHide={handleHide}
          onClickDigiLocker={handleShow}
        />
      </div>
    </div>
  );
}

export default KYCForm;
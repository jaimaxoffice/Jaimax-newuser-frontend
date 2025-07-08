// import React, { useState } from "react";
// import { useUpdateShareholderProfileMutation } from "./ShareholderUpdatioApiSlice";
// const ShareholderForm = () => {
//   const [formData, setFormData] = useState({
//     profileImage: null
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [updateShareholderProfile] = useUpdateShareholderProfileMutation();
//   const [submitStatus, setSubmitStatus] = useState({
//     success: false,
//     message: ""
//   });

//   // Mock user data since localStorage is not available

//   const user = JSON.parse(localStorage.getItem("userData"));
//   const username = user?.data?.username;
//   // const username = "JAIMAX065PDYZ";
//   const currentNameFromLocalStorage = user?.data?.name
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.profileImage) {
//       newErrors.profileImage = 'Profile image is required';
//     } else {
//       const file = formData.profileImage;
//       const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

//       if (!supportedFormats.includes(file.type)) {
//         newErrors.profileImage = 'Unsupported file format';
//       } else if (file.size > 5 * 1024 * 1024) {
//         newErrors.profileImage = 'File size too large (max 5MB)';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         profileImage: file
//       }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);

//       if (errors.profileImage) {
//         setErrors(prev => ({
//           ...prev,
//           profileImage: ''
//         }));
//       }
//     }
//   };

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const base64Image = await fileToBase64(formData.profileImage);

//       const payload = {
//         username: username,
//         profileImage: base64Image,
//       };


//       // Simulate API call
//       const response = await updateShareholderProfile(payload).unwrap();


//       if (response?.status_code
//         == 200) {
//         setSubmitStatus({
//           success: true,
//           message: response.message || "Profile updated successfully!",
//         });

//         window.location.reload();

//       }


//       setFormData({ profileImage: null });
//       setPreviewImage(null);

//     } catch (error) {

//       setSubmitStatus({
//         success: false,
//         message: error.message || "Shareholder is not eligible to update profile",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const keyframes = `
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(20px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//     @keyframes slideUp {
//       from { opacity: 0; transform: translateY(40px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//     @keyframes pulse {
//       0%, 100% { transform: scale(1); }
//       50% { transform: scale(1.05); }
//     }
//     @keyframes spin {
//       from { transform: rotate(0deg); }
//       to { transform: rotate(360deg); }
//     }
//     @keyframes bounce {
//       0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
//       40%, 43% { transform: translateY(-10px); }
//       70% { transform: translateY(-5px); }
//     }
//   `;

//   return (
//     <>
//       <style>{keyframes}</style>

//       <div
//         className="d-flex align-items-center justify-content-center "
//         style={{
//           background: 'linear-gradient(135deg, #136137 0%, #0a3e28 100%)',
//           animation: 'fadeIn 0.8s ease-out'
//         }}
//       >
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className=" ">
//               <div
//                 className="  shadow-lg overflow-hidden"
//                 style={{

//                   animation: 'slideUp 0.6s ease-out 0.2s both'
//                 }}
//               >
//                 {/* Header Section */}
//                 <div
//                   className="card-header text-center text-white  position-relative"
//                   style={{
//                     background: 'linear-gradient(135deg, #136137, #0d4a2a)',
//                     border: 'none'
//                   }}
//                 >
//                   <div
//                     className="position-absolute top-0 start-0 w-100 h-80"
//                     style={{
//                       background: 'radial-gradient(circle, rgba(197, 216, 46, 0.1) 0%, transparent 70%)',
//                       animation: 'pulse 3s ease-in-out infinite'
//                     }}
//                   ></div>

//                   <p
//                     className="fs-5 mb-4 position-relative"
//                     style={{
//                       opacity: 0.9,
//                       animation: 'fadeIn 0.8s ease-out 0.4s both'
//                     }}
//                   >
//                     Congratulations, my elite shareholder!
//                   </p>

//                   <div
//                     className="mx-auto mb-4 d-flex align-items-center justify-content-center position-relative"
//                     style={{
//                       width: '80px',
//                       height: '80px',
//                       backgroundColor: '#c5d82e',
//                       borderRadius: '50%',
//                       animation: 'bounce 2s infinite'
//                     }}
//                   >
//                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#136137" />
//                     </svg>
//                   </div>

//                   <h3
//                     className="h2 mb-2 position-relative"
//                     style={{
//                       animation: 'fadeIn 0.8s ease-out 0.6s both'
//                     }}
//                   >
//                     Update Your Profile
//                   </h3>
//                   <p
//                     className="mb-0 position-relative"
//                     style={{
//                       opacity: 0.8,
//                       animation: 'fadeIn 0.8s ease-out 0.8s both'
//                     }}
//                   >
//                     Enhance your shareholder identity
//                   </p>
//                 </div>

//                 <div className=" p-4">
//                   {/* Username Display Card */}
//                   <div
//                     className="card mb-4 border-0 shadow-sm"
//                     style={{
//                       backgroundColor: '#f8f9fa',
//                       borderRadius: '15px',
//                       animation: 'slideUp 0.6s ease-out 0.4s both'
//                     }}
//                   >
//                     <div className="card-body p-3">
//                       <div className="d-flex align-items-center">
//                         <div
//                           className="me-3 d-flex align-items-center justify-content-center"
//                           style={{
//                             width: '50px',
//                             height: '50px',
//                             backgroundColor: '#136137',
//                             borderRadius: '12px',
//                             color: 'white'
//                           }}
//                         >
//                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10.21 11.75 10.59 12.13L11.17 12.71L5.17 18.71L6.58 20.12L12.58 14.12L13.16 14.7C13.54 15.08 14.16 15.08 14.54 14.7L20.12 9.12L22.61 11.61L24 10.22L23.44 9.66L21 9Z" fill="currentColor" />
//                           </svg>
//                         </div>
//                         <div>

//                           <div className="fw-bold text-dark">{currentNameFromLocalStorage ?? ""}</div>
//                           <div className="fw-bold text-dark">{username ?? ""}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Upload Section */}
//                   <div
//                     className="mb-4"
//                     style={{
//                       animation: 'slideUp 0.6s ease-out 0.6s both'
//                     }}
//                   >
//                     <input
//                       type="file"
//                       id="profileImage"
//                       accept="image/jpeg, image/jpg, image/png, image/webp"
//                       onChange={handleFileChange}
//                       className="d-none"
//                     />

//                     <label
//                       htmlFor="profileImage"
//                       className="d-block w-100 text-center p-4 border-0 rounded-3 position-relative overflow-hidden"
//                       style={{
//                         backgroundColor: previewImage ? 'transparent' : '#f8f9fa',
//                         border: errors.profileImage ? '2px dashed #dc3545' : '2px dashed #136137',
//                         cursor: 'pointer',
//                         transition: 'all 0.3s ease',
//                         minHeight: '200px'
//                       }}
//                       onMouseEnter={(e) => {
//                         if (!previewImage) {
//                           e.target.style.backgroundColor = '#e9ecef';
//                           e.target.style.transform = 'scale(1.02)';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (!previewImage) {
//                           e.target.style.backgroundColor = '#f8f9fa';
//                           e.target.style.transform = 'scale(1)';
//                         }
//                       }}
//                     >
//                       {previewImage ? (
//                         <div className="position-relative">
//                           <img
//                             src={previewImage}
//                             alt="Profile preview"
//                             className="img-fluid rounded-3"
//                             style={{
//                               maxHeight: '200px',
//                               objectFit: 'cover',
//                               width: '100%'
//                             }}
//                           />
//                           <div
//                             className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-3"
//                             style={{
//                               backgroundColor: 'rgba(19, 97, 55, 0.8)',
//                               opacity: 0,
//                               transition: 'opacity 0.3s ease'
//                             }}
//                             onMouseEnter={(e) => e.target.style.opacity = 1}
//                             onMouseLeave={(e) => e.target.style.opacity = 0}
//                           >
//                             <div className="text-white text-center">
//                               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
//                                 <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
//                               </svg>
//                               <div>Change Photo</div>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div>
//                           <div
//                             className="mx-auto mb-3 d-flex align-items-center justify-content-center"
//                             style={{
//                               width: '80px',
//                               height: '80px',
//                               backgroundColor: '#c5d82e',
//                               borderRadius: '50%',
//                               color: '#136137'
//                             }}
//                           >
//                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="currentColor" />
//                             </svg>
//                           </div>
//                           <h5 className="mb-2" style={{ color: '#136137' }}>Upload Profile Image</h5>
//                           <p className="text-muted mb-0">Click or drag to select your photo</p>
//                         </div>
//                       )}
//                     </label>



//                     {errors.profileImage && (
//                       <div
//                         className="alert alert-danger d-flex align-items-center mt-3 border-0"
//                         style={{
//                           backgroundColor: '#f8d7da',
//                           animation: 'slideUp 0.3s ease-out'
//                         }}
//                       >
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
//                           <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
//                         </svg>
//                         {errors.profileImage}
//                       </div>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className="btn btn-lg w-100 text-black d-flex align-items-center justify-content-center border-0"
//                     style={{
//                       backgroundColor: isSubmitting ? '#c5d82e' : '#c5d82e',
//                       color: 'white',
//                       borderRadius: '12px',
//                       padding: '15px',
//                       fontSize: '16px',
//                       fontWeight: '600',
//                       transition: 'all 0.3s ease',
//                       animation: 'slideUp 0.6s ease-out 0.8s both'
//                     }}
//                     onMouseEnter={(e) => {
//                       if (!isSubmitting) {
//                         e.target.style.backgroundColor = '#c5d82e';
//                         e.target.style.transform = 'translateY(-2px)';
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (!isSubmitting) {
//                         e.target.style.backgroundColor = '#c5d82e';
//                         e.target.style.transform = 'translateY(0)';
//                       }
//                     }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div
//                           className="spinner-border spinner-border-sm me-3"
//                           style={{
//                             width: '20px',
//                             height: '20px',
//                             animation: 'spin 1s linear infinite'
//                           }}
//                         ></div>
//                         <span>Updating Profile...</span>
//                       </>
//                     ) : (
//                       <>
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
//                           <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
//                         </svg>
//                         <span>Update Profile</span>
//                       </>
//                     )}
//                   </button>

//                   {/* Status Alert */}
//                   {submitStatus.message && (
//                     <div
//                       className={`alert d-flex align-items-center mt-4 border-0 ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}
//                       style={{
//                         backgroundColor: submitStatus.success ? '#d1e7dd' : '#f8d7da',
//                         borderRadius: '12px',
//                         animation: 'slideUp 0.3s ease-out'
//                       }}
//                     >
//                       <div className="me-3">
//                         {submitStatus.success ? (
//                           <div
//                             className="d-flex align-items-center justify-content-center"
//                             style={{
//                               width: '30px',
//                               height: '30px',
//                               backgroundColor: '#c5d82e',
//                               borderRadius: '50%',
//                               color: '#136137'
//                             }}
//                           >
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
//                             </svg>
//                           </div>
//                         ) : (
//                           <div
//                             className="d-flex align-items-center justify-content-center"
//                             style={{
//                               width: '30px',
//                               height: '30px',
//                               backgroundColor: '#dc3545',
//                               borderRadius: '50%',
//                               color: 'white'
//                             }}
//                           >
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//                             </svg>
//                           </div>
//                         )}
//                       </div>
//                       <span className="fw-medium">{submitStatus.message}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShareholderForm;


// import React, { useState } from "react";
// import { useUpdateShareholderProfileMutation } from "./ShareholderUpdatioApiSlice"; // Assuming this path is correct

// const ShareholderForm = () => {
//   const [formData, setFormData] = useState({
//     profileImage: null,
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [updateShareholderProfile] = useUpdateShareholderProfileMutation();
//   const [submitStatus, setSubmitStatus] = useState({
//     success: false,
//     message: "",
//   });

//   // Mock user data since localStorage is not available in this environment
//   // In a real application, ensure localStorage is accessible
//   const user = JSON.parse(localStorage.getItem("userData"));
//   const username = user?.data?.username;
//   const currentNameFromLocalStorage = user?.data?.name;

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.profileImage) {
//       newErrors.profileImage = "Profile image is required";
//     } else {
//       const file = formData.profileImage;
//       const supportedFormats = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/webp",
//       ];

//       if (!supportedFormats.includes(file.type)) {
//         newErrors.profileImage = "Unsupported file format";
//       } else if (file.size > 5 * 1024 * 1024) {
//         newErrors.profileImage = "File size too large (max 5MB)";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         profileImage: file,
//       }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);

//       if (errors.profileImage) {
//         setErrors((prev) => ({
//           ...prev,
//           profileImage: "",
//         }));
//       }
//     }
//   };

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const base64Image = await fileToBase64(formData.profileImage);

//       const payload = {
//         username: username,
//         profileImage: base64Image,
//       };

//       // Simulate API call
//       const response = await updateShareholderProfile(payload).unwrap();

//       if (response?.status_code === 200) {
//         setSubmitStatus({
//           success: true,
//           message: response.message || "Profile updated successfully!",
//         });
//         window.location.reload();
//       }

//       setFormData({ profileImage: null });
//       setPreviewImage(null);
//     } catch (error) {
//       setSubmitStatus({
//         success: false,
//         message: error.message || "Shareholder is not eligible to update profile",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4"
//       style={{
//         background: 'linear-gradient(135deg, #136137 0%, #0a3e28 100%)',
//       }}
//     >
//       <div className="container mx-auto">
//         <div className="flex justify-center">
//           <div className="w-full max-w-lg">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               {/* Header Section */}
//               <div
//                 className="relative text-center text-white p-6 md:p-8"
//                 style={{
//                   background: 'linear-gradient(135deg, #136137, #0d4a2a)',
//                 }}
//               >
//                 <div
//                   className="absolute top-0 left-0 w-full h-4/5"
//                   style={{
//                     background: 'radial-gradient(circle, rgba(197, 216, 46, 0.1) 0%, transparent 70%)',
//                   }}
//                 ></div>

//                 <p className="text-lg md:text-xl mb-4 relative opacity-90">
//                   Congratulations, my elite shareholder!
//                 </p>

//                 <div
//                   className="mx-auto mb-4 flex items-center justify-center relative"
//                   style={{
//                     width: '80px',
//                     height: '80px',
//                     backgroundColor: '#c5d82e',
//                     borderRadius: '50%',
//                   }}
//                 >
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#136137" />
//                   </svg>
//                 </div>

//                 <h3 className="text-2xl md:text-3xl font-bold mb-2 relative">
//                   Update Your Profile
//                 </h3>
//                 <p className="mb-0 relative opacity-80">
//                   Enhance your shareholder identity
//                 </p>
//               </div>

//               <div className="p-4 md:p-6">
//                 {/* Username Display Card */}
//                 <div
//                   className="bg-gray-50 rounded-xl shadow-sm mb-4 p-3"
//                 >
//                   <div className="flex items-center">
//                     <div
//                       className="mr-3 flex items-center justify-center"
//                       style={{
//                         width: '50px',
//                         height: '50px',
//                         backgroundColor: '#136137',
//                         borderRadius: '12px',
//                         color: 'white',
//                       }}
//                     >
//                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10.21 11.75 10.59 12.13L11.17 12.71L5.17 18.71L6.58 20.12L12.58 14.12L13.16 14.7C13.54 15.08 14.16 15.08 14.54 14.7L20.12 9.12L22.61 11.61L24 10.22L23.44 9.66L21 9Z" fill="currentColor" />
//                       </svg>
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-800">{currentNameFromLocalStorage ?? ""}</div>
//                       <div className="font-bold text-gray-800">{username ?? ""}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Upload Section */}
//                 <div className="mb-4">
//                   <input
//                     type="file"
//                     id="profileImage"
//                     accept="image/jpeg, image/jpg, image/png, image/webp"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />

//                   <label
//                     htmlFor="profileImage"
//                     className={`block w-full text-center p-4 rounded-xl relative overflow-hidden transition-all duration-300 ease-in-out min-h-[200px]
//                       ${errors.profileImage ? 'border-2 border-dashed border-red-500' : 'border-2 border-dashed border-[#136137]'}
//                       ${previewImage ? 'bg-transparent' : 'bg-gray-50 hover:bg-gray-100 transform hover:scale-102'}
//                     `}
//                   >
//                     {previewImage ? (
//                       <div className="relative">
//                         <img
//                           src={previewImage}
//                           alt="Profile preview"
//                           className="w-full h-auto max-h-[200px] object-cover rounded-xl"
//                         />
//                         <div
//                           className="absolute inset-0 flex items-center justify-center rounded-xl bg-green-900 bg-opacity-80 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
//                         >
//                           <div className="text-white text-center">
//                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
//                               <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
//                             </svg>
//                             <div>Change Photo</div>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <div
//                           className="mx-auto mb-3 flex items-center justify-center"
//                           style={{
//                             width: '80px',
//                             height: '80px',
//                             backgroundColor: '#c5d82e',
//                             borderRadius: '50%',
//                             color: '#136137',
//                           }}
//                         >
//                           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="currentColor" />
//                           </svg>
//                         </div>
//                         <h5 className="text-xl font-semibold mb-2" style={{ color: '#136137' }}>Upload Profile Image</h5>
//                         <p className="text-gray-500 mb-0">Click or drag to select your photo</p>
//                       </div>
//                     )}
//                   </label>

//                   {errors.profileImage && (
//                     <div
//                       className="bg-red-100 text-red-700 p-3 rounded-xl flex items-center mt-3"
//                     >
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
//                         <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" />
//                       </svg>
//                       {errors.profileImage}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className={`w-full text-black flex items-center justify-center rounded-xl py-4 px-6 text-base font-semibold transition-all duration-300 ease-in-out
//                     ${isSubmitting ? 'bg-[#c5d82e] cursor-not-allowed' : 'bg-[#c5d82e] hover:bg-[#c5d82e] hover:shadow-lg transform hover:-translate-y-0.5'}
//                   `}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div
//                         className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
//                       ></div>
//                       <span>Updating Profile...</span>
//                     </>
//                   ) : (
//                     <>
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
//                         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
//                       </svg>
//                       <span>Update Profile</span>
//                     </>
//                   )}
//                 </button>

//                 {/* Status Alert */}
//                 {submitStatus.message && (
//                   <div
//                     className={`flex items-center mt-4 p-4 rounded-xl
//                       ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
//                     `}
//                   >
//                     <div className="mr-3">
//                       {submitStatus.success ? (
//                         <div
//                           className="flex items-center justify-center w-8 h-8 rounded-full"
//                           style={{
//                             backgroundColor: '#c5d82e',
//                             color: '#136137',
//                           }}
//                         >
//                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
//                           </svg>
//                         </div>
//                       ) : (
//                         <div
//                           className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white"
//                         >
//                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//                           </svg>
//                         </div>
//                       )}
//                     </div>
//                     <span className="font-medium">{submitStatus.message}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShareholderForm;



import React, { useState } from "react";
import { Upload, User, Check, AlertTriangle, Camera, CheckCircle, XCircle } from "lucide-react";
import { useUpdateShareholderProfileMutation } from "./ShareholderUpdatioApiSlice";

const ShareholderForm = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [updateShareholderProfile, { isLoading: isSubmitting }] = useUpdateShareholderProfileMutation();
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  // Get user data from localStorage (API data)
  const user = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = user?.data?.username;
  const currentNameFromLocalStorage = user?.data?.name;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile image is required";
    } else {
      const file = formData.profileImage;
      const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!supportedFormats.includes(file.type)) {
        newErrors.profileImage = "Unsupported file format";
      } else if (file.size > 5 * 1024 * 1024) {
        newErrors.profileImage = "File size too large (max 5MB)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      if (errors.profileImage) {
        setErrors((prev) => ({
          ...prev,
          profileImage: "",
        }));
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const base64Image = await fileToBase64(formData.profileImage);

      const payload = {
        username: username,
        profileImage: base64Image,
      };

      // Call the actual API
      const response = await updateShareholderProfile(payload).unwrap();

      if (response?.status_code === 200) {
        setSubmitStatus({
          success: true,
          message: response.message || "Profile updated successfully!",
        });
        
        // Clear form and reload page after successful update
        setFormData({ profileImage: null });
        setPreviewImage(null);
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }

    } catch (error) {
      // console.error("Update error:", error);
      setSubmitStatus({
        success: false,
        message: error?.data?.message || error?.message || "Shareholder is not eligible to update profile",
      });
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>

      <div className="w-full animate-fadeIn">
        <div className="w-full">
          <div className="text-center mb-3 sm:mb-2 lg:mb-4 animate-slideUp">
            <div className="relative">
              <div className="relative inline-flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-teal-600 rounded-full mb-2 sm:mb-1 lg:mb-3 shadow-lg">
                <User className="w-5 h-5 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
            <h1 className="text-lg sm:text-base lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-0 lg:mb-2">
              Update Your Profile
            </h1>
            <p className="text-xs sm:text-xs lg:text-sm text-gray-600 hidden sm:block">
              Enhance your identity
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slideUp">
            {/* Username Display Card */}
            <div className="bg-teal-50 p-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {currentNameFromLocalStorage || "Shareholder"}
                  </div>
                  <div className="text-xs text-gray-600">
                    @{username || "username"}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4">
              <div className="space-y-4">
                {/* File Upload Section */}
                <div>
                  <div className="block text-xs lg:text-sm font-medium text-gray-700 mb-1 sm:mb-1 lg:mb-3">
                    Profile Image
                  </div>
                  
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/jpeg, image/jpg, image/png, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="profileImage"
                    className={`group block w-full cursor-pointer transition-all duration-300 ${
                      errors.profileImage 
                        ? 'border-2 border-dashed border-red-300 bg-red-50 hover:bg-red-100' 
                        : 'border-2 border-dashed border-teal-300 hover:border-teal-400 bg-teal-50 hover:bg-teal-100'
                    } rounded-lg p-3 sm:p-2 lg:p-6 min-h-[100px] sm:min-h-[80px] lg:min-h-[160px] flex items-center justify-center relative overflow-hidden`}
                  >
                    {previewImage ? (
                      <div className="relative w-full">
                        <img
                          src={previewImage}
                          alt="Profile preview"
                          className="w-full h-20 sm:h-16 lg:h-32 object-cover rounded-md lg:rounded-lg"
                        />
                        <div className="absolute inset-0 bg-teal-600 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md lg:rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <Camera className="w-4 h-4 sm:w-3 sm:h-3 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2" />
                            <span className="text-xs lg:text-sm font-medium">Change Photo</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-8 h-8 sm:w-6 sm:h-6 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-1 lg:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <Upload className="w-4 h-4 sm:w-3 sm:h-3 lg:w-6 lg:h-6 text-teal-600" />
                        </div>
                        <h3 className="text-xs sm:text-xs lg:text-sm font-semibold text-teal-700 mb-1 lg:mb-2">
                          Upload Profile Image
                        </h3>
                        <p className="text-xs sm:text-xs lg:text-sm text-gray-600 mb-1 lg:mb-1">
                          Click to select your photo
                        </p>
                        <p className="text-xs sm:text-xs lg:text-xs text-gray-500">
                          JPEG, PNG, WebP up to 5MB
                        </p>
                      </div>
                    )}
                  </label>

                  {errors.profileImage && (
                    <div className="mt-1 sm:mt-1 lg:mt-2 flex items-center gap-1 sm:gap-1 lg:gap-2 p-2 sm:p-1 lg:p-3 bg-red-50 border border-red-200 rounded-md lg:rounded-lg">
                      <AlertTriangle className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-red-500 flex-shrink-0" />
                      <span className="text-xs sm:text-xs lg:text-sm text-red-700">{errors.profileImage}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 sm:gap-1 lg:gap-3 px-3 py-2 sm:py-2 lg:py-4 rounded-full lg:rounded-xl text-xs sm:text-xs lg:text-sm font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-100 text-teal-600 border border-teal-200 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
                  } shadow-sm`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                      <span>Update Profile</span>
                    </>
                  )}
                </button>

                {/* Status Alert */}
                {submitStatus.message && (
                  <div
                    className={`flex items-center gap-2 sm:gap-1 lg:gap-3 p-2 sm:p-2 lg:p-4 rounded-lg lg:rounded-xl border-l-4 ${
                      submitStatus.success
                        ? 'bg-teal-50 border-teal-500 text-teal-800'
                        : 'bg-red-50 border-red-500 text-red-800'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {submitStatus.success ? (
                        <div className="w-4 h-4 sm:w-3 sm:h-3 lg:w-5 lg:h-5 bg-white rounded-full flex items-center justify-center">
                          <CheckCircle className="w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 text-teal-600" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 sm:w-3 sm:h-3 lg:w-5 lg:h-5 bg-red-600 rounded-full flex items-center justify-center">
                          <XCircle className="w-2 h-2 sm:w-2 sm:h-2 lg:w-3 lg:h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs sm:text-xs lg:text-sm font-medium">{submitStatus.message}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareholderForm;
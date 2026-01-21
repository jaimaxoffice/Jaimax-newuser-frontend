// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
// import digiLocker from "../../../../assets/digiLocker.webp";
// import editIcon from "../../../../assets/square-pen.svg";
// import showIcon from "../../../../assets/showIcon.svg";
// import countryCodes from "../../../../Authentication/countryCodes.json";
// import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
// import CryptoJS from "crypto-js";
// import DigiLockerModal from "./DigiLockerModal";
// import BankDetailsModal from "./BankDetailsModal";
// import AadhaarVerificationModal from "./AadhaarVerificationModal";
// import LivePhotoModal from "./LivePhotoModal";
// import {
//   useGetKycDataMutation,
//   useGetkycDetailsQuery,
//   useKycaddMutation,
//   useUpdateBankDetailsMutation,
// } from "./kycApiSlice";
// import Loader from "../../../../ReusableComponents/Loader/loader";

// const KycInformation = () => {
//   const { data: userData } = useUserDataQuery();
//   const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;

//   const [submitKyc] = useKycaddMutation();
//   const [getKycData] = useGetKycDataMutation();
//   const [updateBankDetails] = useUpdateBankDetailsMutation();
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [enableFields, setEnableFields] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [disableFieldsAfterKYC, setDisableFieldsAfterKYC] = useState(false);
//   const location = useLocation();
//   const [focusedInput, setFocusedInput] = useState(null);

//   // Aadhaar Verification States
//   const [showAadhaarModal, setShowAadhaarModal] = useState(false);
//   const [aadhaarVerified, setAadhaarVerified] = useState(false);
//   const [aadhaarVerificationData, setAadhaarVerificationData] = useState(null);
//   const [digilockerName, setDigilockerName] = useState("");
//   const [digilockerDob, setDigilockerDob] = useState("");
//   const [kycStep, setKycStep] = useState("digilocker");
//   const [aadhaarNumber, setAadhaarNumber] = useState("");

//   // Live Photo States
//   const [showLivePhotoModal, setShowLivePhotoModal] = useState(false);
//   const [livePhoto, setLivePhoto] = useState(null);
//   const [livePhotoPreview, setLivePhotoPreview] = useState(null);

//   // State for image previews
//   const [previewImages, setPreviewImages] = useState({
//     doc_front: null,
//     doc_back: null,
//     doc1_front: null,
//     doc1_back: null,
//   });

//   const [formData, setFormData] = useState({
//     aadhar_doc_front: null,
//     aadhar_doc_back: null,
//     pan_doc_front: null,
//     dl_doc_front: null,
//     dl_doc_back: null,
//     passport_doc_front: null,
//     passport_doc_back: null,
//     bank_name: "",
//     applicantName: userData?.data?.name,
//     ifsc_code: "",
//     mobile_number: `+${userData?.data?.countryCode} `,
//     upi_id: "",
//     bank_account: "",
//     address: "",
//     dob: "",
//     panNumber: "",
//   });

//   const [isEditClicked, setIsEditClicked] = useState(false);
//   const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

//   const docFrontRef = useRef(null);
//   const doc1FrontRef = useRef(null);
//   const docBackRef = useRef(null);
//   const doc1BackRef = useRef(null);

//   // Helper Functions
//   const maskData = (data = "", visibleStart = 2, visibleEnd = 2, maskChar = "*") => {
//     const dataStr = String(data || "");
//     if (!dataStr) return "";
//     if (visibleStart === 0 && visibleEnd === 0) {
//       return maskChar.repeat(dataStr.length);
//     }
//     if (dataStr.length <= visibleStart + visibleEnd) {
//       return dataStr;
//     }
//     const maskedSection = maskChar.repeat(
//       Math.max(0, dataStr.length - (visibleStart + visibleEnd))
//     );
//     const endPart = visibleEnd > 0 ? dataStr.slice(-visibleEnd) : "";
//     return dataStr.slice(0, visibleStart) + maskedSection + endPart;
//   };

//   const toUpperCase = (text) => text ? text.toUpperCase() : "";

//   const getCountryName = () => {
//     const countryCode = `+${userData?.data?.countryCode}`;
//     const countryName = countryCodes.find(
//       (country) => country.country_code == countryCode
//     );
//     return countryName?.country_name || "NA";
//   };

//   const getMaxLength = () => isCountryCodeIndia ? 14 : 19;

//   const checkTextAfterPrefix = (input) => {
//     let splitString = input.split(`+${userData?.data?.countryCode} `);
//     return !splitString[1]?.trim().length > 0;
//   };

//   // Live Photo Handler
//   const handleLivePhotoCapture = (photoData) => {
//     setLivePhoto(photoData.file);
//     setLivePhotoPreview(photoData.dataUrl);
//     setShowLivePhotoModal(false);
//     toast.success("Live photo captured successfully!", { position: "top-center" });
//   };

//   const handleLivePhotoComplete = () => {
//     if (!livePhoto) {
//       toast.warning("Please capture your live photo first", { position: "top-center" });
//       return;
//     }
//     setKycStep("documents");
//     setEnableFields(true);
//   };

//   // Aadhaar Verification Handlers
//   const handleAadhaarVerificationSuccess = (data) => {
//     setAadhaarVerified(true);
//     setAadhaarVerificationData(data);
//     setShowAadhaarModal(false);
//     setKycStep("livePhoto");
//     toast.success("Aadhaar verified! Please capture your live photo.", { position: "top-center" });
//     setShowLivePhotoModal(true);
//   };

//   const handleSkipAadhaarVerification = () => {
//     setShowAadhaarModal(false);
//     setKycStep("livePhoto");
//     toast.info("Aadhaar verification skipped. Please capture your live photo.", { position: "top-center" });
//     setShowLivePhotoModal(true);
//   };

//   // Bank Details Handler
//   const handleEditBankDetails = () => setShowBankModal(true);

//   const handleBankDetailsUpdate = async (bankData) => {
//     const data = new FormData();
//     data.append("bank_name", bankData.bank_name);
//     data.append("ifsc_code", bankData.ifsc_code);
//     data.append("bank_account", bankData.bank_account);
//     if (isCountryCodeIndia) {
//       data.append("upi_id", bankData.upi_id || "");
//     }

//     setLoading(true);
//     try {
//       const response = await updateBankDetails(data).unwrap();
//       if (response.status_code === 200) {
//         toast.success(response.message || "Bank details updated successfully", { position: "top-center" });
//         refetch();
//         setFormData((prev) => ({
//           ...prev,
//           bank_name: bankData.bank_name,
//           ifsc_code: bankData.ifsc_code,
//           bank_account: bankData.bank_account,
//           upi_id: bankData.upi_id || prev.upi_id,
//         }));
//         setShowBankModal(false);
//       } else {
//         toast.error(response.message || "Failed to update bank details", { position: "top-center" });
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred", { position: "top-center" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form Change Handlers
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
//     if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) return;
//     if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) return;
//     if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) return;

//     if (files) {
//       const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
//       const invalidFile = !acceptedFormats.includes(files[0].type);
//       const refsMap = {
//         aadhar_doc_front: docFrontRef,
//         dl_doc_front: docFrontRef,
//         aadhar_doc_back: docBackRef,
//         dl_doc_back: docBackRef,
//         pan_doc_front: doc1FrontRef,
//         passport_doc_front: doc1FrontRef,
//         passport_doc_back: doc1BackRef,
//       };

//       if (invalidFile) {
//         toast.warning("Only JPG / PNG files are allowed", { position: "top-center" });
//         if (refsMap[name]) refsMap[name].current.value = "";
//         return;
//       }
//     }

//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleChangeMobileNumber = (e) => {
//     const { name, value } = e.target;
//     if (value.startsWith(`+${userData?.data?.countryCode} `)) {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Submit Handler
//   const handleSubmit = async () => {
//     const newErrors = {};

//     // Validations
//     if (kycdata?.success !== 1) {
//       if (isCountryCodeIndia && !formData.aadhar_doc_front)
//         newErrors.aadhar_doc_front = "The Aadhar doc front field is mandatory.";
//       if (isCountryCodeIndia && !formData.aadhar_doc_back)
//         newErrors.aadhar_doc_back = "The Aadhar doc back field is mandatory.";
//       if (isCountryCodeIndia && !formData.pan_doc_front)
//         newErrors.pan_doc_front = "The Pan doc front field is mandatory.";
//       if (isCountryCodeIndia && !formData.panNumber)
//         newErrors.panNumber = "The PAN number field is mandatory.";
//       if (!isCountryCodeIndia && !formData.dl_doc_front)
//         newErrors.dl_doc_front = "The Driving License doc front field is mandatory.";
//       if (!isCountryCodeIndia && !formData.dl_doc_back)
//         newErrors.dl_doc_back = "The Driving License doc back field is mandatory.";
//       if (!isCountryCodeIndia && !formData.passport_doc_front)
//         newErrors.passport_doc_front = "The Passport doc front field is mandatory.";
//       if (!isCountryCodeIndia && !formData.passport_doc_back)
//         newErrors.passport_doc_back = "The Passport doc back field is mandatory.";
//     }

//     // Live photo validation
//     if (isCountryCodeIndia && !livePhoto && kycdata?.success !== 1) {
//       newErrors.livePhoto = "Live photo is required for KYC verification.";
//     }

//     if (!formData.bank_name) newErrors.bank_name = "The bank name field is mandatory.";
//     if (!formData.ifsc_code)
//       newErrors.ifsc_code = `The ${isCountryCodeIndia ? "ifsc" : "bank"} code field is mandatory.`;
//     if (checkTextAfterPrefix(formData.mobile_number))
//       newErrors.mobile_number = "The mobile number field is mandatory.";
//     if (!formData.bank_account)
//       newErrors.bank_account = "The bank account field is mandatory.";
//     if (!formData.address) newErrors.address = "The address field is mandatory.";

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     const data = new FormData();

//     // Append documents
//     if (kycdata?.success !== 1) {
//       if (isCountryCodeIndia) {
//         data.append("aadhar_doc_front", formData.aadhar_doc_front);
//         data.append("aadhar_doc_back", formData.aadhar_doc_back);
//         data.append("pan_doc_front", formData.pan_doc_front);
//         data.append("upi_id", formData.upi_id);
//         data.append("panNumber", formData.panNumber);
//         data.append("dob", formData.dob);
//       } else {
//         data.append("dl_doc_front", formData.dl_doc_front);
//         data.append("dl_doc_back", formData.dl_doc_back);
//         data.append("passport_doc_front", formData.passport_doc_front);
//         data.append("passport_doc_back", formData.passport_doc_back);
//       }
//     }

//     // Add live photo
//     if (livePhoto) {
//       data.append("live_photo", livePhoto);
//     }

//     // Add Aadhaar verification data
//     if (aadhaarVerificationData) {
//       data.append("aadhaarVerified", "true");
//       data.append("aadhaarTempId", aadhaarVerificationData.tempId || "");
//       data.append("aadhaarNameMatched", aadhaarVerificationData.nameMatched ? "true" : "false");
//       data.append("aadharNumber", aadhaarVerificationData.aadhaarNumber || "");
//     }
//     if (!aadhaarVerificationData && aadhaarNumber) {
//       data.append("aadharNumber", aadhaarNumber.replace(/\s/g, ""));
//     }

//     data.append("name", formData.applicantName);
//     data.append("bank_name", formData.bank_name);
//     data.append("ifsc_code", formData.ifsc_code);
//     if (formData.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
//       data.append("mobile_number", formData.mobile_number.replace(`+${userData?.data?.countryCode} `, ""));
//     }
//     data.append("bank_account", formData.bank_account);
//     data.append("address", formData.address);

//     setLoading(true);
//     try {
//       const response = await submitKyc(data);
//       if (response?.data?.status_code === 200) {
//         toast.success(response?.data.message, { position: "top-center" });
//         refetch();
//         setErrors({});
//       } else {
//         toast?.error(response?.error?.data?.message, { position: "top-center" });
//         setErrors({});
//       }
//     } catch (error) {
//       toast.error(error.message, { position: "top-center" });
//       setErrors({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       aadhar_doc_front: null,
//       aadhar_doc_back: null,
//       pan_doc_front: null,
//       dl_doc_front: null,
//       dl_doc_back: null,
//       passport_doc_front: null,
//       passport_doc_back: null,
//       bank_name: "",
//       applicantName: userData?.data?.name,
//       ifsc_code: "",
//       mobile_number: `+${userData?.data?.countryCode} `,
//       upi_id: "",
//       bank_account: "",
//       address: "",
//       dob: "",
//       panNumber: "",
//     });

//     setPreviewImages({
//       doc_front: null,
//       doc_back: null,
//       doc1_front: null,
//       doc1_back: null,
//     });

//     setLivePhoto(null);
//     setLivePhotoPreview(null);

//     if (docFrontRef?.current) docFrontRef.current.value = null;
//     if (doc1FrontRef?.current) doc1FrontRef.current.value = null;
//     if (docBackRef?.current) docBackRef.current.value = null;
//     if (!isCountryCodeIndia && doc1BackRef?.current) doc1BackRef.current.value = null;
//   };

//   // DigiLocker Handler
//   const handleButtonClick = async () => {
//     setLoading(true);
//     setErrors({});

//     try {
//       const generateCodeVerifier = async () => {
//         const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
//         const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
//         let verifier = "";
//         for (let i = 0; i < length; i++) {
//           const randomIndex = Math.floor(Math.random() * characters.length);
//           verifier += characters[randomIndex];
//         }
//         return verifier;
//       };

//       const generateCodeChallenge = (verifier) => {
//         const hash = CryptoJS.SHA256(verifier);
//         return CryptoJS.enc.Base64.stringify(hash)
//           .replace(/\+/g, "-")
//           .replace(/\//g, "_")
//           .replace(/=+$/, "");
//       };

//       const verifier = await generateCodeVerifier();
//       localStorage.removeItem("processed");
//       const challenge = await generateCodeChallenge(verifier);
//       let origin = window.location.origin;
//       let redirectURI, clientId;

//       if (origin && (origin.includes("5173") || origin.includes("5174"))) {
//         redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_DEV;
//         clientId = import.meta.env.VITE_DL_CLIENT_ID_DEV;
//       } else if (origin === "https://www.jaimax.com") {
//         redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_PROD;
//         clientId = import.meta.env.VITE_DL_CLIENT_ID_PROD;
//       } else {
//         redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_QA;
//         clientId = import.meta.env.VITE_DL_CLIENT_ID_QA;
//       }

//       localStorage.setItem("verifier", verifier);

//       const apiUrl = new URL(
//         `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`
//       );

//       window.open(apiUrl.toString(), "_self");
//     } catch (err) {
//       setErrors(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onClickImage = (imageURL) => {
//     const link = document.createElement("a");
//     link.href = imageURL;
//     link.target = "_blank";
//     link.rel = "noopener noreferrer";
//     link.click();
//   };

//   // Effects
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

//       localStorage.setItem("code", extractedCode);
//       setLoading(true);

//       const postTokenRequest = async () => {
//         try {
//           const response = await getKycData(payload).unwrap();
//           if (response.data) {
//             setDigilockerName(response.data.name);
//             setDigilockerDob(response.data.dob);

//             setFormData((prev) => ({
//               ...prev,
//               applicantName: response.data.name,
//               mobile_number: `+91 ${response.data.mobile}`,
//               address: response.data.address,
//               dob: response.data.dob,
//               panNumber: response.data.panNumber,
//             }));

//             setDisableFieldsAfterKYC(true);
//             setIsEditClicked(true);
//             setShowModal(false);
//             setKycStep("aadhaar");
//             setShowAadhaarModal(true);
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
//   }, []);

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (kycdata?.success == 1) {
//       setEnableFields(true);
//       setDisableFieldsAfterKYC(true);
//       setKycStep("documents");

//       if (kycdata?.data?.livePhoto) {
//         setLivePhotoPreview(kycdata.data.livePhoto);
//       }

//       setFormData({
//         aadhar_doc_front: kycdata?.data?.aadhar_doc_front || null,
//         aadhar_doc_back: kycdata?.data?.aadhar_doc_back || null,
//         pan_doc_front: kycdata?.data?.pan_doc_front || null,
//         dl_doc_front: kycdata?.data?.dl_doc_front || null,
//         dl_doc_back: kycdata?.data?.dl_doc_back || null,
//         passport_doc_front: kycdata?.data?.passport_doc_front || null,
//         passport_doc_back: kycdata?.data?.passport_doc_back || null,
//         bank_name: kycdata?.data?.bank_name || "",
//         ifsc_code: kycdata?.data?.ifsc_code || "",
//         applicantName: kycdata?.data.name || userData?.data?.name,
//         mobile_number: `${`+${userData?.data?.countryCode} `}${kycdata?.data?.mobile_number}` || "",
//         upi_id: kycdata?.data?.upi_id || "",
//         bank_account: kycdata?.data?.bank_account || "",
//         address: kycdata?.data?.address || "",
//         dob: kycdata?.data.dob || "",
//         panNumber: kycdata?.data.panNumber || "",
//       });

//       setPreviewImages({
//         doc_front: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_front || null : kycdata?.data?.dl_doc_front || null,
//         doc_back: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_back || null : kycdata?.data?.dl_doc_back || null,
//         doc1_front: isCountryCodeIndia ? kycdata?.data?.pan_doc_front || null : kycdata?.data?.passport_doc_front || null,
//         doc1_back: !isCountryCodeIndia ? kycdata?.data?.passport_doc_back || null : null,
//       });

//       if (isCountryCodeIndia && kycdata?.data?.status === "reject" && !(isLoading || loading)) {
//         setShowModal(true);
//       } else {
//         setShowModal(false);
//       }
//     } else {
//       if (isCountryCodeIndia && !(isLoading || loading)) {
//         setShowModal(true);
//       }
//       resetForm();
//     }
//   }, [userData, kycdata]);

//   // Input Classes
//   const inputClasses = `w-full bg-transparent border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base text-gray-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200`;

//   const disabledInputClasses = `w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm sm:text-base`;

//   return (
//     <div>
//       <section className="py-4 sm:py-6 bg-gray-50 min-h-screen">
//         <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
//           <div className="w-full">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-500">
//               <div className="p-4 sm:p-6 lg:p-8">
//                 {/* Header Section */}
//                 <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-4 sm:pb-5 border-b border-gray-200 mb-4 sm:mb-6 gap-3">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                     <h1 className="text-xl sm:text-2xl font-bold text-teal-600">
//                       KYC Information
//                     </h1>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       {kycdata?.data?.status !== "approve" && "(Fill up information and verify your KYC.)"}
//                     </p>
//                   </div>

//                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//                     <h6 className="text-teal-600 text-xs sm:text-sm font-medium flex items-center">
//                       <span>Country:</span>
//                       <span className="ml-2 text-gray-700 font-semibold">
//                         {!userData?.data?.country || userData?.data?.country === "N/A"
//                           ? getCountryName()
//                           : userData?.data?.country}
//                       </span>
//                     </h6>

//                     {isCountryCodeIndia &&
//                       kycdata?.data?.status !== "open" &&
//                       kycdata?.data?.status !== "approve" && (
//                         <button
//                           type="button"
//                           className="inline-flex items-center px-3 sm:px-4 py-2 border border-teal-500 text-xs sm:text-sm rounded-full text-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
//                           onClick={handleButtonClick}
//                         >
//                           <img src={digiLocker} alt="DigiLocker" className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
//                           DigiLocker
//                         </button>
//                       )}
//                   </div>
//                 </div>

//                 {/* KYC Steps Progress Indicator */}
//                 {isCountryCodeIndia && kycdata?.data?.status !== "approve" && (
//                   <div className="mb-6 sm:mb-8 overflow-x-auto">
//                     <div className="flex items-center justify-center min-w-max px-4">
//                       {/* Step 1: DigiLocker */}
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold
//                           ${kycStep !== "digilocker" ? "bg-green-500 text-white" : "bg-teal-600 text-white"}`}
//                         >
//                           {kycStep !== "digilocker" ? "✓" : "1"}
//                         </div>
//                         <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium
//                           ${kycStep !== "digilocker" ? "text-green-600" : "text-teal-600"}`}
//                         >
//                           DigiLocker
//                         </span>
//                       </div>

//                       <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 rounded
//                         ${kycStep === "aadhaar" || kycStep === "livePhoto" || kycStep === "documents" || aadhaarVerified
//                           ? "bg-green-500" : "bg-gray-200"}`}
//                       />

//                       {/* Step 2: Aadhaar */}
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold
//                           ${aadhaarVerified || kycStep === "livePhoto" || kycStep === "documents"
//                             ? "bg-green-500 text-white"
//                             : kycStep === "aadhaar" ? "bg-teal-600 text-white"
//                             : "bg-gray-200 text-gray-500"}`}
//                         >
//                           {aadhaarVerified || kycStep === "livePhoto" || kycStep === "documents" ? "✓" : "2"}
//                         </div>
//                         <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium
//                           ${aadhaarVerified || kycStep === "livePhoto" || kycStep === "documents"
//                             ? "text-green-600"
//                             : kycStep === "aadhaar" ? "text-teal-600"
//                             : "text-gray-500"}`}
//                         >
//                           Aadhaar
//                         </span>
//                       </div>

//                       <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 rounded
//                         ${kycStep === "livePhoto" || kycStep === "documents" || livePhoto
//                           ? "bg-green-500" : "bg-gray-200"}`}
//                       />

//                       {/* Step 3: Live Photo */}
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold
//                           ${livePhoto || kycStep === "documents"
//                             ? "bg-green-500 text-white"
//                             : kycStep === "livePhoto" ? "bg-teal-600 text-white"
//                             : "bg-gray-200 text-gray-500"}`}
//                         >
//                           {livePhoto || kycStep === "documents" ? "✓" : "3"}
//                         </div>
//                         <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium
//                           ${livePhoto || kycStep === "documents"
//                             ? "text-green-600"
//                             : kycStep === "livePhoto" ? "text-teal-600"
//                             : "text-gray-500"}`}
//                         >
//                           Photo
//                         </span>
//                       </div>

//                       <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 rounded
//                         ${kycStep === "documents" ? "bg-teal-600" : "bg-gray-200"}`}
//                       />

//                       {/* Step 4: Documents */}
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold
//                           ${kycStep === "documents" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}
//                         >
//                           4
//                         </div>
//                         <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium
//                           ${kycStep === "documents" ? "text-teal-600" : "text-gray-500"}`}
//                         >
//                           Documents
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Aadhaar Verified Banner */}
//                 {aadhaarVerified && (
//                   <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
//                     <div className="flex items-start sm:items-center">
//                       <span className="text-green-500 text-xl sm:text-2xl mr-2 sm:mr-3">✓</span>
//                       <div>
//                         <p className="font-medium text-green-800 text-sm sm:text-base">Aadhaar Verified</p>
//                         <p className="text-green-600 text-xs sm:text-sm">
//                           Name: <strong>{aadhaarVerificationData?.aadhaarName || "N/A"}</strong>
//                           {aadhaarVerificationData?.nameMatched && (
//                             <span className="ml-2 text-[10px] sm:text-xs bg-green-100 px-2 py-0.5 rounded-full">
//                               ✓ Matched
//                             </span>
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Live Photo Section */}
//                 {isCountryCodeIndia && kycStep === "livePhoto" && (
//                   <div className="mb-6 sm:mb-8">
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 max-w-md mx-auto">
//                       <div className="text-center">
//                         {!livePhoto ? (
//                           <>
//                             <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                               <svg className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                               </svg>
//                             </div>
//                             <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
//                               Take a Live Photo
//                             </h3>
//                             <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
//                               We need a live photo of you for identity verification
//                             </p>
//                             <button
//                               type="button"
//                               onClick={() => setShowLivePhotoModal(true)}
//                               className="px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium text-sm sm:text-base"
//                             >
//                               Open Camera
//                             </button>
//                             {errors.livePhoto && (
//                               <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-500">{errors.livePhoto}</p>
//                             )}
//                           </>
//                         ) : (
//                           <>
//                             <div className="relative w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-3 sm:mb-4">
//                               <img
//                                 src={livePhotoPreview}
//                                 alt="Live Photo"
//                                 className="w-full h-full object-cover rounded-full border-4 border-green-500"
//                               />
//                               <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
//                                 <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                               </div>
//                             </div>
//                             <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-2">
//                               Photo Captured!
//                             </h3>
//                             <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
//                               Your live photo has been captured successfully
//                             </p>
//                             <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
//                               <button
//                                 type="button"
//                                 onClick={() => setShowLivePhotoModal(true)}
//                                 className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
//                               >
//                                 Retake Photo
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={handleLivePhotoComplete}
//                                 className="px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm sm:text-base"
//                               >
//                                 Continue to Documents
//                               </button>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Live Photo Preview in Documents Section */}
//                 {livePhoto && kycStep === "documents" && (
//                   <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
//                     <div className="flex flex-col sm:flex-row items-center gap-3">
//                       <img
//                         src={livePhotoPreview}
//                         alt="Live Photo"
//                         className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-green-500"
//                       />
//                       <div className="flex-1 text-center sm:text-left">
//                         <p className="font-medium text-green-800 text-sm sm:text-base">Live Photo Captured</p>
//                         <p className="text-green-600 text-xs sm:text-sm">
//                           Your photo has been captured for verification
//                         </p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setShowLivePhotoModal(true)}
//                         className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
//                       >
//                         Retake
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Status Bar */}
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-5 py-3 sm:py-4 bg-gray-50 rounded-lg">
//                   {kycdata?.data?.status === "approve" && (
//                     <button
//                       type="button"
//                       className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white text-xs sm:text-sm rounded-lg hover:bg-teal-700 transition-colors"
//                       onClick={handleEditBankDetails}
//                     >
//                       <img alt="Edit" src={editIcon} className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 filter brightness-0 invert" />
//                       Edit Bank Details
//                     </button>
//                   )}
//                   <p className="text-xs sm:text-sm flex items-center flex-wrap gap-1">
//                     <span className="font-medium">KYC status:</span>
//                     <span
//                       className="capitalize font-semibold px-2 py-0.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs"
//                       style={{
//                         backgroundColor:
//                           kycdata?.data?.status === "open" ? "#ff8a00"
//                             : kycdata?.data?.status === "approve" ? "#00A693"
//                             : kycdata?.data?.status === "inprogress" ? "#0077B6"
//                             : "#dc3545",
//                       }}
//                     >
//                       {kycdata?.data?.status === "open" ? "In Open"
//                         : kycdata?.data?.status === "approve" ? "Approved"
//                         : kycdata?.data?.status === "inprogress" ? "In Progress"
//                         : kycdata?.data?.status === "reject" ? "Rejected"
//                         : "N/A"}
//                     </span>
//                   </p>
//                   {kycdata?.data?.status === "reject" && (
//                     <p className="text-xs sm:text-sm flex items-center">
//                       <span className="font-medium mr-1">Reason:</span>
//                       <span className="text-red-500 font-semibold">{kycdata?.data?.reason}</span>
//                     </p>
//                   )}
//                 </div>

//                 {/* Aadhaar Verification Step */}
//                 {isCountryCodeIndia && kycStep === "aadhaar" && !aadhaarVerified && kycdata?.data?.status !== "approve" && (
//                   <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
//                     <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                       <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
//                       Aadhaar Verification Required
//                     </h3>
//                     <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 px-4">
//                       Please verify your Aadhaar to proceed with document upload
//                     </p>
//                     <button
//                       type="button"
//                       onClick={() => setShowAadhaarModal(true)}
//                       className="px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium text-sm sm:text-base"
//                     >
//                       Verify Aadhaar Now
//                     </button>
//                   </div>
//                 )}

//                 {/* Form Sections */}
//                 {(kycStep === "documents" || !isCountryCodeIndia || kycdata?.data?.status === "approve") && (
//                   <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                     {/* Applicant Information */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5">
//                       <div className="bg-teal-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg mb-4 sm:mb-5 -mt-6 sm:-mt-8 shadow-md">
//                         <h6 className="text-xs sm:text-sm font-bold m-0">Applicant Information</h6>
//                       </div>

//                       <div className="space-y-4 sm:space-y-5">
//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                             Name of the Applicant <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             className={disabledInputClasses}
//                             name="applicantName"
//                             value={formData.applicantName}
//                             disabled
//                             readOnly
//                           />
//                         </div>

//                         {isCountryCodeIndia && (
//                           <div>
//                             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                               Date of Birth <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               className={disabledInputClasses}
//                               value={maskData(formData.dob, 0, 0, "X")}
//                               disabled
//                               readOnly
//                             />
//                           </div>
//                         )}

//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                             Mobile Number (As per Bank) <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             className={inputClasses}
//                             name="mobile_number"
//                             placeholder="Enter mobile number"
//                             value={focusedInput === "mobile_number" ? formData.mobile_number : maskData(formData.mobile_number, 5, 2)}
//                             maxLength={getMaxLength()}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                             onChange={handleChangeMobileNumber}
//                             onFocus={(e) => setFocusedInput(e.target.name)}
//                             onBlur={() => setFocusedInput(null)}
//                             onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) event.preventDefault(); }}
//                             autoComplete="off"
//                           />
//                           {errors.mobile_number && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.mobile_number}</p>}
//                         </div>

//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                             Address <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             className={inputClasses}
//                             name="address"
//                             placeholder="Enter your address"
//                             value={focusedInput === "address" ? formData.address : maskData(formData.address)}
//                             onChange={handleChange}
//                             onFocus={(e) => setFocusedInput(e.target.name)}
//                             onBlur={() => setFocusedInput(null)}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                             autoComplete="off"
//                           />
//                           {errors.address && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.address}</p>}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Document Proofs */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5">
//                       <div className="bg-teal-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg mb-4 sm:mb-5 -mt-6 sm:-mt-8 shadow-md">
//                         <h6 className="text-xs sm:text-sm font-bold m-0">Document Proofs</h6>
//                       </div>

//                       <div className="space-y-4 sm:space-y-5">
//                         {/* Document Front */}
//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 flex items-center flex-wrap gap-1">
//                             <span>{isCountryCodeIndia ? "Aadhar" : "Driving License"} Front</span>
//                             <span className="text-red-500">*</span>
//                             {kycdata?.success && (
//                               <button
//                                 type="button"
//                                 className="ml-1 sm:ml-2 inline-flex items-center px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50"
//                                 onClick={() => onClickImage(isCountryCodeIndia ? kycdata.data?.aadhar_doc_front : kycdata.data?.dl_doc_front)}
//                               >
//                                 <img alt="View" src={showIcon} className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> View
//                               </button>
//                             )}
//                           </label>

//                           <label
//                             className={`w-full flex flex-col items-center px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-lg border-2 border-dashed ${previewImages?.doc_front ? "border-teal-500" : "border-gray-300"} cursor-pointer hover:bg-gray-50 transition-all ${((!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)) ? "opacity-70 pointer-events-none" : ""}`}
//                             htmlFor={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
//                           >
//                             {!previewImages?.doc_front ? (
//                               <>
//                                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                                 </svg>
//                                 <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Click to upload</span>
//                                 <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">JPG, PNG or JPEG</span>
//                               </>
//                             ) : (
//                               <div className="relative w-full">
//                                 <img src={previewImages.doc_front} alt="Document preview" className="h-24 sm:h-32 mx-auto object-contain rounded" />
//                                 <span className="block mt-1 sm:mt-2 text-[10px] sm:text-xs text-center text-teal-600">Document uploaded</span>
//                               </div>
//                             )}
//                           </label>
//                           <input
//                             type="file"
//                             accept=".jpg,.jpeg,.png"
//                             className="hidden"
//                             id={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
//                             name={isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front"}
//                             ref={docFrontRef}
//                             onChange={(e) => {
//                               handleChange(e);
//                               if (e.target.files && e.target.files[0]) {
//                                 const reader = new FileReader();
//                                 reader.onload = (event) => setPreviewImages((prev) => ({ ...prev, doc_front: event.target.result }));
//                                 reader.readAsDataURL(e.target.files[0]);
//                               }
//                             }}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                           />
//                           {(isCountryCodeIndia ? errors?.aadhar_doc_front : errors?.dl_doc_front) && (
//                             <p className="mt-1 text-xs sm:text-sm text-red-500">
//                               {isCountryCodeIndia ? errors.aadhar_doc_front : errors.dl_doc_front}
//                             </p>
//                           )}
//                         </div>

//                         {/* Document Back */}
//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 flex items-center flex-wrap gap-1">
//                             <span>{isCountryCodeIndia ? "Aadhar" : "Driving License"} Back</span>
//                             <span className="text-red-500">*</span>
//                             {kycdata?.success && (
//                               <button
//                                 type="button"
//                                 className="ml-1 sm:ml-2 inline-flex items-center px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50"
//                                 onClick={() => onClickImage(isCountryCodeIndia ? kycdata.data?.aadhar_doc_back : kycdata.data?.dl_doc_back)}
//                               >
//                                 <img alt="View" src={showIcon} className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> View
//                               </button>
//                             )}
//                           </label>

//                           <label
//                             className={`w-full flex flex-col items-center px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-lg border-2 border-dashed ${previewImages?.doc_back ? "border-teal-500" : "border-gray-300"} cursor-pointer hover:bg-gray-50 transition-all ${((!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)) ? "opacity-70 pointer-events-none" : ""}`}
//                             htmlFor={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
//                           >
//                             {!previewImages?.doc_back ? (
//                               <>
//                                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                                 </svg>
//                                 <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Click to upload</span>
//                                 <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">JPG, PNG or JPEG</span>
//                               </>
//                             ) : (
//                               <div className="relative w-full">
//                                 <img src={previewImages.doc_back} alt="Document preview" className="h-24 sm:h-32 mx-auto object-contain rounded" />
//                                 <span className="block mt-1 sm:mt-2 text-[10px] sm:text-xs text-center text-teal-600">Document uploaded</span>
//                               </div>
//                             )}
//                           </label>
//                           <input
//                             type="file"
//                             accept=".jpg,.jpeg,.png"
//                             className="hidden"
//                             id={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
//                             name={isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back"}
//                             ref={docBackRef}
//                             onChange={(e) => {
//                               handleChange(e);
//                               if (e.target.files && e.target.files[0]) {
//                                 const reader = new FileReader();
//                                 reader.onload = (event) => setPreviewImages((prev) => ({ ...prev, doc_back: event.target.result }));
//                                 reader.readAsDataURL(e.target.files[0]);
//                               }
//                             }}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                           />
//                           {(isCountryCodeIndia ? errors?.aadhar_doc_back : errors?.dl_doc_back) && (
//                             <p className="mt-1 text-xs sm:text-sm text-red-500">
//                               {isCountryCodeIndia ? errors.aadhar_doc_back : errors.dl_doc_back}
//                             </p>
//                           )}
//                         </div>

//                         {/* PAN / Passport Front */}
//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 flex items-center flex-wrap gap-1">
//                             <span>{isCountryCodeIndia ? "PAN" : "Passport Front"}</span>
//                             <span className="text-red-500">*</span>
//                             {kycdata?.success && (
//                               <button
//                                 type="button"
//                                 className="ml-1 sm:ml-2 inline-flex items-center px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md border border-teal-500 text-teal-600 hover:bg-teal-50"
//                                 onClick={() => onClickImage(isCountryCodeIndia ? kycdata.data?.pan_doc_front : kycdata.data?.passport_doc_front)}
//                               >
//                                 <img alt="View" src={showIcon} className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> View
//                               </button>
//                             )}
//                           </label>

//                           <label
//                             className={`w-full flex flex-col items-center px-3 sm:px-4 py-3 sm:py-4 bg-white rounded-lg border-2 border-dashed ${previewImages?.doc1_front ? "border-teal-500" : "border-gray-300"} cursor-pointer hover:bg-gray-50 transition-all ${((!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)) ? "opacity-70 pointer-events-none" : ""}`}
//                             htmlFor={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
//                           >
//                             {!previewImages?.doc1_front ? (
//                               <>
//                                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//                                 </svg>
//                                 <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">Click to upload</span>
//                                 <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">JPG, PNG or JPEG</span>
//                               </>
//                             ) : (
//                               <div className="relative w-full">
//                                 <img src={previewImages.doc1_front} alt="Document preview" className="h-24 sm:h-32 mx-auto object-contain rounded" />
//                                 <span className="block mt-1 sm:mt-2 text-[10px] sm:text-xs text-center text-teal-600">Document uploaded</span>
//                               </div>
//                             )}
//                           </label>
//                           <input
//                             type="file"
//                             accept=".jpg,.jpeg,.png"
//                             className="hidden"
//                             id={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
//                             name={isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front"}
//                             ref={doc1FrontRef}
//                             onChange={(e) => {
//                               handleChange(e);
//                               if (e.target.files && e.target.files[0]) {
//                                 const reader = new FileReader();
//                                 reader.onload = (event) => setPreviewImages((prev) => ({ ...prev, doc1_front: event.target.result }));
//                                 reader.readAsDataURL(e.target.files[0]);
//                               }
//                             }}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                           />
//                           {(isCountryCodeIndia ? errors.pan_doc_front : errors.passport_doc_front) && (
//                             <p className="mt-1 text-xs sm:text-sm text-red-500">
//                               {isCountryCodeIndia ? errors.pan_doc_front : errors.passport_doc_front}
//                             </p>
//                           )}
//                         </div>

//                         {/* PAN Number (India only) */}
//                         {isCountryCodeIndia && (
//                           <div>
//                             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                               PAN Number <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               className={inputClasses}
//                               name="panNumber"
//                               placeholder="Enter PAN number"
//                               value={focusedInput === "panNumber" ? formData.panNumber : maskData(formData.panNumber)}
//                               onChange={handleChange}
//                               onFocus={(e) => setFocusedInput(e.target.name)}
//                               onBlur={() => setFocusedInput(null)}
//                               disabled={(!enableFields && isCountryCodeIndia) || disableFieldsAfterKYC || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                               maxLength={10}
//                             />
//                             {errors.panNumber && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.panNumber}</p>}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Bank Details */}
//                     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5">
//                       <div className="bg-teal-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg mb-4 sm:mb-5 -mt-6 sm:-mt-8 shadow-md">
//                         <h6 className="text-xs sm:text-sm font-bold m-0">Bank Details</h6>
//                       </div>

//                       <div className="space-y-4 sm:space-y-5">
//                         {isCountryCodeIndia && (
//                           <div>
//                             <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                               UPI Number
//                             </label>
//                             <input
//                               type="text"
//                               className={inputClasses}
//                               name="upi_id"
//                               placeholder="Enter UPI ID"
//                               value={focusedInput === "upi_id" ? formData.upi_id : maskData(formData.upi_id, 3, 4)}
//                               onChange={handleChange}
//                               onFocus={(e) => setFocusedInput(e.target.name)}
//                               onBlur={() => setFocusedInput(null)}
//                               disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                               autoComplete="off"
//                             />
//                           </div>
//                         )}

//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                             Bank Account Number <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             className={inputClasses}
//                             name="bank_account"
//                             placeholder="Enter bank account number"
//                             value={focusedInput === "bank_account" ? formData.bank_account : maskData(formData.bank_account)}
//                             onChange={handleChange}
//                             onFocus={(e) => setFocusedInput(e.target.name)}
//                             onBlur={() => setFocusedInput(null)}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                             onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) event.preventDefault(); }}
//                             autoComplete="off"
//                           />
//                           {errors.bank_account && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.bank_account}</p>}
//                         </div>

//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                             Bank Name <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             className={inputClasses}
//                             name="bank_name"
//                             placeholder="Enter bank name"
//                             value={formData.bank_name}
//                             onChange={handleChange}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                             autoComplete="off"
//                           />
//                           {errors.bank_name && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.bank_name}</p>}
//                         </div>

//                         <div>
//                           <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
//                             Bank {isCountryCodeIndia && "IFSC"} Code <span className="text-red-500">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             className={inputClasses}
//                             name="ifsc_code"
//                             placeholder="Enter bank code"
//                             value={toUpperCase(focusedInput === "ifsc_code" ? formData.ifsc_code : maskData(formData.ifsc_code))}
//                             onChange={handleChange}
//                             onFocus={(e) => setFocusedInput(e.target.name)}
//                             onBlur={() => setFocusedInput(null)}
//                             disabled={(!enableFields && isCountryCodeIndia) || kycdata?.data?.status === "open" || (kycdata?.data?.status === "approve" && !isEditClicked)}
//                             autoComplete="off"
//                             maxLength={11}
//                           />
//                           {errors.ifsc_code && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.ifsc_code}</p>}
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 )}

//                 {/* Submit Button */}
//                 {(kycStep === "documents" || !isCountryCodeIndia) && (
//                   <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
//                     {kycdata?.success !== 1 && (
//                       <button
//                         type="button"
//                         className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
//                         onClick={handleSubmit}
//                       >
//                         Submit KYC Information
//                       </button>
//                     )}
//                     {(kycdata?.data?.status === "reject" || (kycdata?.data?.status === "approve" && isEditClicked)) && (
//                       <button
//                         type="button"
//                         className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-teal-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200"
//                         onClick={handleSubmit}
//                       >
//                         Update KYC Information
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modals */}
//         {showModal && (
//           <DigiLockerModal
//             show={showModal}
//             onHide={() => setShowModal(false)}
//             onClickDigiLocker={handleButtonClick}
//           />
//         )}

//         <LivePhotoModal
//           show={showLivePhotoModal}
//           onClose={() => setShowLivePhotoModal(false)}
//           onPhotoCapture={handleLivePhotoCapture}
//           userName={formData.applicantName}
//           loading={loading}
//         />

//         <BankDetailsModal
//           show={showBankModal}
//           onClose={() => setShowBankModal(false)}
//           bankDetails={{
//             bank_name: formData.bank_name,
//             ifsc_code: formData.ifsc_code,
//             bank_account: formData.bank_account,
//             upi_id: formData.upi_id,
//           }}
//           onSubmit={handleBankDetailsUpdate}
//           isCountryCodeIndia={isCountryCodeIndia}
//           loading={loading}
//         />

//         <AadhaarVerificationModal
//           show={showAadhaarModal}
//           onClose={() => setShowAadhaarModal(false)}
//           digilockerName={digilockerName}
//           digilockerDob={digilockerDob}
//           onVerificationSuccess={handleAadhaarVerificationSuccess}
//           onSkip={handleSkipAadhaarVerification}
//         />

//         {(isLoading || loading) && <Loader />}
//       </section>
//     </div>
//   );
// };

// export default KycInformation;



import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import digiLocker from "../../../../assets/digiLocker.webp";
import editIcon from "../../../../assets/square-pen.svg";
import showIcon from "../../../../assets/showIcon.svg";
import countryCodes from "../../../../Authentication/countryCodes.json";
import { useUserDataQuery } from "../dashBoard/DashboardApliSlice";
import CryptoJS from "crypto-js";
import BankDetailsModal from "./BankDetailsModal";
import AadhaarVerificationModal from "./AadhaarVerificationModal";
import LivePhotoModal from "./LivePhotoModal";
import {
  useGetKycDataMutation,
  useGetkycDetailsQuery,
  useKycaddMutation,
  useUpdateBankDetailsMutation,
} from "./kycApiSlice";
import Loader from "../../../../ReusableComponents/Loader/loader";

// Professional Icon Components
const Icons = {
  Check: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Lock: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  Shield: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Document: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Building: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  Camera: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  ),
  Upload: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  EyeOff: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ),
  ChevronRight: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
  ChevronLeft: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Info: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  Warning: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  Pencil: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  ExternalLink: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
};

const KycInformation = () => {
  const { data: userData } = useUserDataQuery();
  const isCountryCodeIndia = userData && userData?.data?.countryCode === 91;
  const [showData, setShowData] = useState(false);
  const [submitKyc] = useKycaddMutation();
  const [getKycData] = useGetKycDataMutation();
  const [updateBankDetails] = useUpdateBankDetailsMutation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [focusedInput, setFocusedInput] = useState(null);

  // Step Management
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  // DigiLocker States
  const [digilockerData, setDigilockerData] = useState(null);
  const [digilockerName, setDigilockerName] = useState("");
  const [digilockerDob, setDigilockerDob] = useState("");

  // Aadhaar Verification States
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [aadhaarVerificationData, setAadhaarVerificationData] = useState(null);

  // Live Photo States
  const [showLivePhotoModal, setShowLivePhotoModal] = useState(false);
  const [livePhoto, setLivePhoto] = useState(null);
  const [livePhotoPreview, setLivePhotoPreview] = useState(null);

  // Bank Modal
  const [showBankModal, setShowBankModal] = useState(false);

  // Image previews
  const [previewImages, setPreviewImages] = useState({
    doc_front: null,
    doc_back: null,
    doc1_front: null,
    doc1_back: null,
  });

  const [formData, setFormData] = useState({
    aadhar_doc_front: null,
    aadhar_doc_back: null,
    pan_doc_front: null,
    dl_doc_front: null,
    dl_doc_back: null,
    passport_doc_front: null,
    passport_doc_back: null,
    bank_name: "",
    applicantName: userData?.data?.name || "",
    ifsc_code: "",
    mobile_number: `+${userData?.data?.countryCode || "91"} `,
    upi_id: "",
    bank_account: "",
    address: "",
    dob: "",
    panNumber: "",
  });

  const { data: kycdata, isLoading, refetch } = useGetkycDetailsQuery();

  const docFrontRef = useRef(null);
  const doc1FrontRef = useRef(null);
  const docBackRef = useRef(null);
  const doc1BackRef = useRef(null);

  // Step Configuration
  const steps = [
    { id: 1, title: "DigiLocker", shortTitle: "DigiLocker", icon: Icons.Lock },
    { id: 2, title: "Aadhaar Verification", shortTitle: "Aadhaar", icon: Icons.Shield },
    { id: 3, title: "Documents & Profile", shortTitle: "Documents", icon: Icons.Document },
    { id: 4, title: "Bank Details", shortTitle: "Bank", icon: Icons.Building },
  ];

  // Helper Functions
  const maskData = (data = "", visibleStart = 2, visibleEnd = 2, maskChar = "•") => {
    const dataStr = String(data || "");
    if (!dataStr) return "";
    if (visibleStart === 0 && visibleEnd === 0) return maskChar.repeat(dataStr.length);
    if (dataStr.length <= visibleStart + visibleEnd) return dataStr;
    const maskedSection = maskChar.repeat(Math.max(0, dataStr.length - (visibleStart + visibleEnd)));
    const endPart = visibleEnd > 0 ? dataStr.slice(-visibleEnd) : "";
    return dataStr.slice(0, visibleStart) + maskedSection + endPart;
  };

  const toUpperCase = (text) => (text ? text.toUpperCase() : "");

  const getCountryName = () => {
    const countryCode = `+${userData?.data?.countryCode}`;
    const countryName = countryCodes.find((country) => country.country_code == countryCode);
    return countryName?.country_name || "NA";
  };

  const getMaxLength = () => (isCountryCodeIndia ? 14 : 19);

  const checkTextAfterPrefix = (input) => {
    let splitString = input.split(`+${userData?.data?.countryCode} `);
    return !splitString[1]?.trim().length > 0;
  };

  // Navigation Functions
  const goToStep = (step) => {
    if (step < currentStep || completedSteps[`step${step - 1}`] || step === 1) {
      setCurrentStep(step);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCompletedSteps((prev) => ({ ...prev, [`step${currentStep}`]: true }));
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Step 1: DigiLocker Handler
  const handleDigiLockerClick = async () => {
    setLoading(true);
    setErrors({});

    try {
      const generateCodeVerifier = async () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
        let verifier = "";
        for (let i = 0; i < length; i++) {
          verifier += characters[Math.floor(Math.random() * characters.length)];
        }
        return verifier;
      };

      const generateCodeChallenge = (verifier) => {
        const hash = CryptoJS.SHA256(verifier);
        return CryptoJS.enc.Base64.stringify(hash).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      };

      const verifier = await generateCodeVerifier();
      localStorage.removeItem("processed");
      const challenge = await generateCodeChallenge(verifier);
      let origin = window.location.origin;
      let redirectURI, clientId;

      if (origin && (origin.includes("5173") || origin.includes("5174"))) {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_DEV;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_DEV;
      } else if (origin === "https://www.jaimax.com") {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_PROD;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_PROD;
      } else {
        redirectURI = import.meta.env.VITE_DL_REDIRECT_URI_QA;
        clientId = import.meta.env.VITE_DL_CLIENT_ID_QA;
      }

      localStorage.setItem("verifier", verifier);
      const apiUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&state=oidc_flow&redirect_uri=${redirectURI}&code_challenge=${challenge}&code_challenge_method=S256&dl_flow=signin&acr=pan+aadhaar+mobile&amr=pan+all+aadhaar&scope=files.issueddocs+files.uploadeddocs&pla=Y`;
      window.open(apiUrl, "_self");
    } catch (err) {
      toast.error("Failed to connect to DigiLocker", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Aadhaar Handlers
  const handleAadhaarVerificationSuccess = (data) => {
    setAadhaarVerified(true);
    setAadhaarVerificationData(data);
    setShowAadhaarModal(false);
    setCompletedSteps((prev) => ({ ...prev, step2: true }));
    toast.success("Aadhaar verified successfully!", { position: "top-center" });
    setCurrentStep(3);
  };

  const handleSkipAadhaarVerification = () => {
    setShowAadhaarModal(false);
    setCompletedSteps((prev) => ({ ...prev, step2: true }));
    toast.info("Aadhaar verification skipped.", { position: "top-center" });
    setCurrentStep(3);
  };

  // Step 3: Live Photo Handler
  const handleLivePhotoCapture = (photoData) => {
    setLivePhoto(photoData.file);
    setLivePhotoPreview(photoData.dataUrl);
    setShowLivePhotoModal(false);
    toast.success("Photo captured successfully!", { position: "top-center" });
  };

  // Form Handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "ifsc_code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "panNumber" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === "upi_id" && !/^[a-zA-Z0-9@._-]*$/.test(value)) return;
    if (name === "bank_name" && !/^[a-zA-Z\s]*$/.test(value)) return;

    if (files) {
      const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
      if (!acceptedFormats.includes(files[0].type)) {
        toast.warning("Only JPG / PNG files are allowed", { position: "top-center" });
        return;
      }
    }

    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleChangeMobileNumber = (e) => {
    const { name, value } = e.target;
    if (value.startsWith(`+${userData?.data?.countryCode} `)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validations
  const validateStep3 = () => {
    const newErrors = {};
    if (isCountryCodeIndia) {
      if (!formData.aadhar_doc_front && !kycdata?.data?.aadhar_doc_front)
        newErrors.aadhar_doc_front = "Aadhaar front is required";
      if (!formData.aadhar_doc_back && !kycdata?.data?.aadhar_doc_back)
        newErrors.aadhar_doc_back = "Aadhaar back is required";
      if (!formData.pan_doc_front && !kycdata?.data?.pan_doc_front)
        newErrors.pan_doc_front = "PAN card is required";
      if (!formData.panNumber && !kycdata?.data?.panNumber)
        newErrors.panNumber = "PAN number is required";
      if (!livePhoto && !kycdata?.data?.livePhoto)
        newErrors.livePhoto = "Live photo is required";
    } else {
      if (!formData.dl_doc_front) newErrors.dl_doc_front = "DL front is required";
      if (!formData.dl_doc_back) newErrors.dl_doc_back = "DL back is required";
      if (!formData.passport_doc_front) newErrors.passport_doc_front = "Passport front is required";
      if (!formData.passport_doc_back) newErrors.passport_doc_back = "Passport back is required";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (checkTextAfterPrefix(formData.mobile_number)) newErrors.mobile_number = "Mobile number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.bank_name) newErrors.bank_name = "Bank name is required";
    if (!formData.ifsc_code) newErrors.ifsc_code = "Bank code is required";
    if (!formData.bank_account) newErrors.bank_account = "Account number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep3Continue = () => {
    if (validateStep3()) {
      setCompletedSteps((prev) => ({ ...prev, step3: true }));
      setCurrentStep(4);
    }
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!validateStep4()) return;

    const data = new FormData();

    if (isCountryCodeIndia) {
      if (formData.aadhar_doc_front) data.append("aadhar_doc_front", formData.aadhar_doc_front);
      if (formData.aadhar_doc_back) data.append("aadhar_doc_back", formData.aadhar_doc_back);
      if (formData.pan_doc_front) data.append("pan_doc_front", formData.pan_doc_front);
      data.append("upi_id", formData.upi_id);
      data.append("panNumber", formData.panNumber);
      data.append("dob", formData.dob);
    } else {
      if (formData.dl_doc_front) data.append("dl_doc_front", formData.dl_doc_front);
      if (formData.dl_doc_back) data.append("dl_doc_back", formData.dl_doc_back);
      if (formData.passport_doc_front) data.append("passport_doc_front", formData.passport_doc_front);
      if (formData.passport_doc_back) data.append("passport_doc_back", formData.passport_doc_back);
    }

    if (livePhoto) data.append("live_photo", livePhoto);

    if (aadhaarVerificationData) {
      data.append("aadhaarVerified", "true");
      data.append("aadhaarTempId", aadhaarVerificationData.tempId || "");
      data.append("aadhaarNameMatched", aadhaarVerificationData.nameMatched ? "true" : "false");
      data.append("aadharNumber", aadhaarVerificationData.aadhaarNumber || "");
    }

    data.append("name", formData.applicantName);
    data.append("bank_name", formData.bank_name);
    data.append("ifsc_code", formData.ifsc_code);
    if (formData.mobile_number.startsWith(`+${userData?.data?.countryCode} `)) {
      data.append("mobile_number", formData.mobile_number.replace(`+${userData?.data?.countryCode} `, ""));
    }
    data.append("bank_account", formData.bank_account);
    data.append("address", formData.address);

    setLoading(true);
    try {
      const response = await submitKyc(data);
      if (response?.data?.status_code === 200) {
        toast.success(response?.data.message, { position: "top-center" });
        setCompletedSteps((prev) => ({ ...prev, step4: true }));
        refetch();
      } else {
        toast.error(response?.error?.data?.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleBankDetailsUpdate = async (bankData) => {
    const data = new FormData();
    data.append("bank_name", bankData.bank_name);
    data.append("ifsc_code", bankData.ifsc_code);
    data.append("bank_account", bankData.bank_account);
    if (isCountryCodeIndia) {
      data.append("upi_id", bankData.upi_id || "");
    }

    setLoading(true);
    try {
      const response = await updateBankDetails(data).unwrap();
      if (response.status_code === 200) {
        toast.success(response.message || "Bank details updated", { position: "top-center" });
        refetch();
        setShowBankModal(false);
      } else {
        toast.error(response.message || "Failed to update", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const onClickImage = (imageURL) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  // Effects
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedCode = queryParams.get("code");
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState(null, "", newUrl);

    if (extractedCode && !localStorage.getItem("processed")) {
      localStorage.setItem("processed", "true");
      const payload = { code: extractedCode, verifier: localStorage.getItem("verifier") };
      setLoading(true);

      const postTokenRequest = async () => {
        try {
          const response = await getKycData(payload).unwrap();
          if (response.data) {
            setDigilockerData(response.data);
            setDigilockerName(response.data.name);
            setDigilockerDob(response.data.dob);

            setFormData((prev) => ({
              ...prev,
              applicantName: response.data.name,
              mobile_number: `+91 ${response.data.mobile}`,
              address: response.data.address,
              dob: response.data.dob,
              panNumber: response.data.panNumber,
            }));

            setCompletedSteps((prev) => ({ ...prev, step1: true }));
            setCurrentStep(2);
            toast.success("DigiLocker connected successfully!", { position: "top-center" });
          }
        } catch (error) {
          toast.error("DigiLocker verification failed", { position: "top-center" });
        } finally {
          setLoading(false);
          localStorage.removeItem("code");
          localStorage.removeItem("verifier");
        }
      };
      postTokenRequest();
    }
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (kycdata?.success == 1) {
      setCompletedSteps({ step1: true, step2: true, step3: true, step4: true });
      if (kycdata?.data?.livePhoto) setLivePhotoPreview(kycdata.data.livePhoto);

      setFormData({
        aadhar_doc_front: kycdata?.data?.aadhar_doc_front || null,
        aadhar_doc_back: kycdata?.data?.aadhar_doc_back || null,
        pan_doc_front: kycdata?.data?.pan_doc_front || null,
        dl_doc_front: kycdata?.data?.dl_doc_front || null,
        dl_doc_back: kycdata?.data?.dl_doc_back || null,
        passport_doc_front: kycdata?.data?.passport_doc_front || null,
        passport_doc_back: kycdata?.data?.passport_doc_back || null,
        bank_name: kycdata?.data?.bank_name || "",
        ifsc_code: kycdata?.data?.ifsc_code || "",
        applicantName: kycdata?.data.name || userData?.data?.name,
        mobile_number: `+${userData?.data?.countryCode} ${kycdata?.data?.mobile_number}` || "",
        upi_id: kycdata?.data?.upi_id || "",
        bank_account: kycdata?.data?.bank_account || "",
        address: kycdata?.data?.address || "",
        dob: kycdata?.data.dob || "",
        panNumber: kycdata?.data.panNumber || "",
      });

      setPreviewImages({
        doc_front: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_front : kycdata?.data?.dl_doc_front,
        doc_back: isCountryCodeIndia ? kycdata?.data?.aadhar_doc_back : kycdata?.data?.dl_doc_back,
        doc1_front: isCountryCodeIndia ? kycdata?.data?.pan_doc_front : kycdata?.data?.passport_doc_front,
        doc1_back: !isCountryCodeIndia ? kycdata?.data?.passport_doc_back : null,
      });
    }
  }, [userData, kycdata]);

  // ==================== COMPONENT STYLES ====================
  const styles = {
    input: `w-full h-11 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 
            placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            transition-all duration-200 disabled:bg-slate-50 disabled:text-slate-500`,
    label: `block text-sm font-medium text-slate-700 mb-1.5`,
    error: `text-xs text-red-500 mt-1`,
    card: `bg-white rounded-xl border border-slate-200 shadow-sm`,
    cardHeader: `px-5 py-4 border-b border-slate-100`,
    cardBody: `p-5`,
    button: {
      primary: `inline-flex items-center justify-center h-11 px-6 bg-blue-600 text-white text-sm font-medium 
                rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
      secondary: `inline-flex items-center justify-center h-11 px-6 bg-white text-slate-700 text-sm font-medium 
                  border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 
                  focus:ring-slate-200 transition-all duration-200`,
      outline: `inline-flex items-center justify-center h-10 px-4 bg-transparent text-blue-600 text-sm font-medium 
                border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200`,
    },
  };

  // ==================== STEP INDICATOR ====================
  const StepIndicator = () => (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-9xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = completedSteps[`step${step.id}`];
            const isCurrent = currentStep === step.id;
            const isClickable = step.id <= currentStep || completedSteps[`step${step.id - 1}`] || step.id === 1;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => isClickable && goToStep(step.id)}
                  disabled={!isClickable}
                  className={`flex items-center gap-3 transition-all ${
                    isClickable ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${isCompleted 
                        ? "bg-green-500 border-green-500 text-white" 
                        : isCurrent 
                          ? "bg-blue-600 border-blue-600 text-white" 
                          : "bg-white border-slate-200 text-slate-400"
                      }`}
                  >
                    {isCompleted ? (
                      <Icons.Check className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className={`text-xs ${isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-slate-400"}`}>
                      Step {step.id}
                    </p>
                    <p className={`text-sm font-medium ${
                      isCompleted ? "text-green-700" : isCurrent ? "text-slate-900" : "text-slate-400"
                    }`}>
                      {step.shortTitle}
                    </p>
                  </div>
                </button>

                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-green-500" : "bg-slate-200"
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ==================== STEP 1: DIGILOCKER ====================
  const renderStep1 = () => (
    <div className="max-w-9xl mx-auto">
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <img src={digiLocker} alt="DigiLocker" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Connect with DigiLocker</h2>
              <p className="text-sm text-slate-500">Fetch your documents securely from DigiLocker</p>
            </div>
          </div>
        </div>

        <div className={styles.cardBody}>
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Icons.Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Before you proceed, ensure you have:</p>
                <ul className="space-y-1 text-blue-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-600" />
                    Access to your Aadhaar-linked mobile number
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-600" />
                    Your PAN card details ready
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-600" />
                    Active DigiLocker account
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={handleDigiLockerClick}
            disabled={loading}
            className={`w-full ${styles.button.primary}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <img src={digiLocker} alt="" className="w-5 h-5 mr-2" />
                Connect DigiLocker
                <Icons.ExternalLink className="w-4 h-4 ml-2" />
              </>
            )}
          </button>

          {/* Success State */}
          {completedSteps.step1 && digilockerData && (
            <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Icons.Check className="w-4 h-4 text-white" />
                </div>
                <p className="font-medium text-green-800">Successfully Connected</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Full Name</p>
                  <p className="text-sm font-medium text-slate-900">{digilockerName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Date of Birth</p>
                  <p className="text-sm font-medium text-slate-900">{maskData(digilockerDob, 0, 0, "•")}</p>
                </div>
              </div>

              <button onClick={goToNextStep} className={`w-full mt-4 ${styles.button.primary}`}>
                Continue to Aadhaar Verification
                <Icons.ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ==================== STEP 2: AADHAAR ====================
  const renderStep2 = () => (
    <div className="max-w-9xl mx-auto">
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icons.Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Aadhaar Verification</h2>
              <p className="text-sm text-slate-500">Verify your identity using Aadhaar OTP</p>
            </div>
          </div>
        </div>

        <div className={styles.cardBody}>
          {!aadhaarVerified ? (
            <>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <Icons.Warning className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    You will receive an OTP on your Aadhaar-linked mobile number for verification.
                  </p>
                </div>
              </div>

              <button onClick={() => setShowAadhaarModal(true)} className={`w-full ${styles.button.primary}`}>
                Verify with Aadhaar OTP
              </button>

              <div className="mt-4 flex items-center gap-2">
                <button onClick={goToPreviousStep} className={`flex-1 ${styles.button.secondary}`}>
                  <Icons.ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Icons.Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Aadhaar Verified</p>
                  <p className="text-sm text-green-600">{aadhaarVerificationData?.aadhaarName}</p>
                </div>
              </div>

              <button onClick={goToNextStep} className={`w-full mt-4 ${styles.button.primary}`}>
                Continue to Documents
                <Icons.ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ==================== STEP 3: DOCUMENTS ====================
  const renderStep3 = () => (
    <div className="max-w-9xl mx-auto">
      {/* Verification Badge */}
      {aadhaarVerified && (
        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <Icons.Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">Aadhaar Verified</p>
            <p className="text-xs text-green-600">{aadhaarVerificationData?.aadhaarName}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className={styles.card}>
          <div className={`${styles.cardHeader} bg-slate-50`}>
            <div className="flex items-center gap-2">
              <Icons.User className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Profile Information</h3>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className="space-y-4">
              {/* Live Photo */}
              <div>
                <label className={styles.label}>
                  Live Photo <span className="text-red-500">*</span>
                </label>
                <div className="bg-slate-50 rounded-lg p-4 border border-dashed border-slate-200">
                  {!livePhoto && !livePhotoPreview ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                        <Icons.Camera className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600 mb-3">Take a live photo for verification</p>
                      <button
                        onClick={() => setShowLivePhotoModal(true)}
                        className={styles.button.outline}
                      >
                        <Icons.Camera className="w-4 h-4 mr-2" />
                        Capture Photo
                      </button>
                      {errors.livePhoto && <p className={styles.error}>{errors.livePhoto}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <img
                        src={livePhotoPreview}
                        alt="Live Photo"
                        className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-700">Photo Captured</p>
                        <button
                          onClick={() => setShowLivePhotoModal(true)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Retake Photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.applicantName}
                  disabled
                />
              </div>

              {/* DOB */}
              {isCountryCodeIndia && (
                <div>
                  <label className={styles.label}>Date of Birth</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={maskData(formData.dob, 0, 0, "•")}
                    disabled
                  />
                </div>
              )}

              {/* Mobile */}
              <div>
                <label className={styles.label}>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  name="mobile_number"
                  value={focusedInput === "mobile_number" ? formData.mobile_number : maskData(formData.mobile_number, 5, 2)}
                  maxLength={getMaxLength()}
                  onChange={handleChangeMobileNumber}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                />
                {errors.mobile_number && <p className={styles.error}>{errors.mobile_number}</p>}
              </div>

              {/* Address */}
              <div>
                <label className={styles.label}>
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`${styles.input} min-h-[80px] py-3`}
                  name="address"
                  value={focusedInput === "address" ? formData.address : maskData(formData.address)}
                  onChange={handleChange}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                />
                {errors.address && <p className={styles.error}>{errors.address}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className={styles.card}>
          <div className={`${styles.cardHeader} bg-slate-50`}>
            <div className="flex items-center gap-2">
              <Icons.Document className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Document Uploads</h3>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className="space-y-4">
              {/* Document Upload Component */}
              {[
                {
                  id: isCountryCodeIndia ? "aadhar_doc_front" : "dl_doc_front",
                  label: isCountryCodeIndia ? "Aadhaar Card (Front)" : "Driving License (Front)",
                  preview: previewImages.doc_front,
                  ref: docFrontRef,
                  error: errors.aadhar_doc_front || errors.dl_doc_front,
                  previewKey: "doc_front",
                },
                {
                  id: isCountryCodeIndia ? "aadhar_doc_back" : "dl_doc_back",
                  label: isCountryCodeIndia ? "Aadhaar Card (Back)" : "Driving License (Back)",
                  preview: previewImages.doc_back,
                  ref: docBackRef,
                  error: errors.aadhar_doc_back || errors.dl_doc_back,
                  previewKey: "doc_back",
                },
                {
                  id: isCountryCodeIndia ? "pan_doc_front" : "passport_doc_front",
                  label: isCountryCodeIndia ? "PAN Card" : "Passport",
                  preview: previewImages.doc1_front,
                  ref: doc1FrontRef,
                  error: errors.pan_doc_front || errors.passport_doc_front,
                  previewKey: "doc1_front",
                },
              ].map((doc) => (
                <div key={doc.id}>
                  <label className={styles.label}>
                    {doc.label} <span className="text-red-500">*</span>
                  </label>
                  <label
                    htmlFor={doc.id}
                    className={`flex items-center gap-4 p-4 bg-slate-50 rounded-lg border-2 border-dashed cursor-pointer
                      hover:bg-slate-100 transition-colors ${doc.preview ? "border-green-300 bg-green-50" : "border-slate-200"}`}
                  >
                    {doc.preview ? (
                      <>
                        <img src={doc.preview} alt="" className="w-16 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-700">Document uploaded</p>
                          <p className="text-xs text-slate-500">Click to replace</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Icons.Upload className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-700">Click to upload</p>
                          <p className="text-xs text-slate-500">JPG, PNG (max 5MB)</p>
                        </div>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id={doc.id}
                    name={doc.id}
                    ref={doc.ref}
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.files?.[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) =>
                          setPreviewImages((prev) => ({ ...prev, [doc.previewKey]: event.target.result }));
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  {doc.error && <p className={styles.error}>{doc.error}</p>}
                </div>
              ))}

              {/* PAN Number */}
              {isCountryCodeIndia && (
                <div>
                  <label className={styles.label}>
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    name="panNumber"
                    placeholder="ABCDE1234F"
                    value={focusedInput === "panNumber" ? formData.panNumber : maskData(formData.panNumber)}
                    onChange={handleChange}
                    onFocus={(e) => setFocusedInput(e.target.name)}
                    onBlur={() => setFocusedInput(null)}
                    maxLength={10}
                  />
                  {errors.panNumber && <p className={styles.error}>{errors.panNumber}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button onClick={goToPreviousStep} className={styles.button.secondary}>
          <Icons.ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <button onClick={handleStep3Continue} className="bg-tea">
          Continue to Bank Details
          <Icons.ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );

  // ==================== STEP 4: BANK DETAILS ====================
  const renderStep4 = () => (
    <div className="max-w-lg mx-auto">
      <div className={styles.card}>
        <div className={`${styles.cardHeader} bg-slate-50`}>
          <div className="flex items-center gap-2">
            <Icons.Building className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold text-slate-900">Bank Account Details</h3>
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className="space-y-4">
            {isCountryCodeIndia && (
              <div>
                <label className={styles.label}>UPI ID (Optional)</label>
                <input
                  type="text"
                  className={styles.input}
                  name="upi_id"
                  placeholder="example@upi"
                  value={focusedInput === "upi_id" ? formData.upi_id : maskData(formData.upi_id, 3, 4)}
                  onChange={handleChange}
                  onFocus={(e) => setFocusedInput(e.target.name)}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            )}

            <div>
              <label className={styles.label}>
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                name="bank_account"
                placeholder="Enter account number"
                value={focusedInput === "bank_account" ? formData.bank_account : maskData(formData.bank_account)}
                onChange={handleChange}
                onFocus={(e) => setFocusedInput(e.target.name)}
                onBlur={() => setFocusedInput(null)}
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              />
              {errors.bank_account && <p className={styles.error}>{errors.bank_account}</p>}
            </div>

            <div>
              <label className={styles.label}>
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                name="bank_name"
                placeholder="Enter bank name"
                value={formData.bank_name}
                onChange={handleChange}
              />
              {errors.bank_name && <p className={styles.error}>{errors.bank_name}</p>}
            </div>

            <div>
              <label className={styles.label}>
                {isCountryCodeIndia ? "IFSC Code" : "Bank Code"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={styles.input}
                name="ifsc_code"
                placeholder={isCountryCodeIndia ? "ABCD0123456" : "Enter bank code"}
                value={toUpperCase(focusedInput === "ifsc_code" ? formData.ifsc_code : maskData(formData.ifsc_code))}
                onChange={handleChange}
                onFocus={(e) => setFocusedInput(e.target.name)}
                onBlur={() => setFocusedInput(null)}
                maxLength={11}
              />
              {errors.ifsc_code && <p className={styles.error}>{errors.ifsc_code}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button onClick={goToPreviousStep} className={styles.button.secondary}>
          <Icons.ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <button onClick={handleSubmit} disabled={loading} className={styles.button.primary}>
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit KYC
              <Icons.Check className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  // ==================== KYC COMPLETED VIEW ====================
  const renderKycCompleted = () => {
    const status = kycdata?.data?.status;
    const statusConfig = {
      approve: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "bg-green-500",
        title: "KYC Approved",
        subtitle: "Your identity has been verified successfully",
        textColor: "text-green-800",
      },
      reject: {
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "bg-red-500",
        title: "KYC Rejected",
        subtitle: kycdata?.data?.reason || "Please resubmit your documents",
        textColor: "text-red-800",
      },
      default: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "bg-amber-500",
        title: "Under Review",
        subtitle: "Your KYC application is being processed",
        textColor: "text-amber-800",
      },
    };
    const config = statusConfig[status] || statusConfig.default;

    return (
      <div className="max-w-2xl mx-auto">
        {/* Status Banner */}
        <div className={`${config.bg} ${config.border} border rounded-xl p-5 mb-6`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 ${config.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
              {status === "approve" ? (
                <Icons.Check className="w-6 h-6 text-white" />
              ) : status === "reject" ? (
                <Icons.Warning className="w-6 h-6 text-white" />
              ) : (
                <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${config.textColor}`}>{config.title}</h3>
              <p className={`text-sm ${config.textColor} opacity-80`}>{config.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className={styles.card}>
          <div className={`${styles.cardHeader} flex items-center justify-between`}>
            <h3 className="font-semibold text-slate-900">KYC Details</h3>
            <button
              onClick={() => setShowData(!showData)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              {showData ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
              {showData ? "Hide" : "Show"}
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { label: "Full Name", value: formData.applicantName },
              { label: "Mobile Number", value: formData.mobile_number, masked: maskData(formData.mobile_number, 5, 2) },
              { label: "Bank Name", value: formData.bank_name },
              { label: "Account Number", value: formData.bank_account, masked: maskData(formData.bank_account), mono: true },
              { label: isCountryCodeIndia ? "IFSC Code" : "Bank Code", value: formData.ifsc_code, masked: maskData(formData.ifsc_code), mono: true },
              ...(isCountryCodeIndia && formData.upi_id
                ? [{ label: "UPI ID", value: formData.upi_id, masked: maskData(formData.upi_id, 3, 4) }]
                : []),
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className={`text-sm font-medium text-slate-900 ${item.mono ? "font-mono" : ""}`}>
                  {showData ? item.value : item.masked || item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className={`${styles.card} mt-6`}>
          <div className={styles.cardHeader}>
            <h3 className="font-semibold text-slate-900">Uploaded Documents</h3>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {livePhotoPreview && (
              <div className="text-center">
                <img
                  src={livePhotoPreview}
                  alt="Photo"
                  className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-slate-200"
                />
                <p className="text-xs text-slate-500 mt-2">Live Photo</p>
              </div>
            )}
            {[
              { img: previewImages.doc_front, label: isCountryCodeIndia ? "Aadhaar Front" : "DL Front" },
              { img: previewImages.doc_back, label: isCountryCodeIndia ? "Aadhaar Back" : "DL Back" },
              { img: previewImages.doc1_front, label: isCountryCodeIndia ? "PAN Card" : "Passport" },
            ]
              .filter((doc) => doc.img)
              .map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => onClickImage(doc.img)}
                  className="text-center group"
                >
                  <div className="w-16 h-12 mx-auto rounded-lg overflow-hidden border border-slate-200 group-hover:border-blue-400 transition-colors">
                    <img src={doc.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 group-hover:text-blue-600">{doc.label}</p>
                </button>
              ))}
          </div>
        </div>

        {/* Edit Bank Button */}
        {status === "approve" && (
          <button
            onClick={() => setShowBankModal(true)}
            className={`w-full mt-6 ${styles.button.secondary}`}
          >
            <Icons.Pencil className="w-4 h-4 mr-2" />
            Edit Bank Details
          </button>
        )}
      </div>
    );
  };

  // ==================== MAIN RENDER ====================
  const renderCurrentStep = () => {
    if (kycdata?.success === 1) return renderKycCompleted();
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">KYC Verification</h1>
              <p className="text-sm text-slate-500">
                {kycdata?.success === 1
                  ? "Your KYC verification details"
                  : "Complete the verification process to continue"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Country</p>
              <p className="text-sm font-medium text-slate-900">
                {!userData?.data?.country || userData?.data?.country === "N/A"
                  ? getCountryName()
                  : userData?.data?.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      {kycdata?.success !== 1 && isCountryCodeIndia && <StepIndicator />}

      {/* Content */}
      <div className="py-8 px-4">
        {renderCurrentStep()}
      </div>

      {/* Modals */}
      <LivePhotoModal
        show={showLivePhotoModal}
        onClose={() => setShowLivePhotoModal(false)}
        onPhotoCapture={handleLivePhotoCapture}
        userName={formData.applicantName}
        loading={loading}
      />

      <BankDetailsModal
        show={showBankModal}
        onClose={() => setShowBankModal(false)}
        bankDetails={{
          bank_name: formData.bank_name,
          ifsc_code: formData.ifsc_code,
          bank_account: formData.bank_account,
          upi_id: formData.upi_id,
        }}
        onSubmit={handleBankDetailsUpdate}
        isCountryCodeIndia={isCountryCodeIndia}
        loading={loading}
      />

      <AadhaarVerificationModal
        show={showAadhaarModal}
        onClose={() => setShowAadhaarModal(false)}
        digilockerName={digilockerName}
        digilockerDob={digilockerDob}
        onVerificationSuccess={handleAadhaarVerificationSuccess}
        onSkip={handleSkipAadhaarVerification}
      />

      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default KycInformation;
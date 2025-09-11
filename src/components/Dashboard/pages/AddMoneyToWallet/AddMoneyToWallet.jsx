// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Cookies from 'js-cookie'
// import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
// import {
//   useAddTransactionMutation,
//   useCreatePaypalWalletOrderMutation,
//   useTransferAvailableBalanceMutation,
// } from "../wallet/walletApiSlice";
// import Tesseract from "tesseract.js";
// // import scan from "../../assets/Images/SignUp/scan.png";
// import scan from "../../../../assets/Images/SignUp/newQr.jpg";
// import bhumi from "../../../../assets/Images/SignUp/bhumi.png";
// // import scanners from "../../assets/Images/SignUp/scanners.svg";
// import socialMedia from "../../../../assets/Images/SignUp/socialmedia.svg";
// import CopyToClipboardButton from "../../../../pages/home/CopyToClipboard";
// // import loaderImage from "../../assets/Images/loader.svg";
// import Loader from "../../../Loader/loader";
// import CryptoJS from "crypto-js";
// import { useGetActivePaymentGatewayQuery } from "../TodayEarnings/userEarningApiSlice";
// /**
//  * This component is used to add funds to wallet by different payment methods UPI, Paypal & Transfer Available Balance
//  * @return {*}
//  */
// const AddMoneyToWallet = () => {
//   const defaultFormData = {
//     upiId: "jaimaxcoin2024@upi",
//     bankAccountHolderName: "JAISVIK SOFTWARE SOLUTIONS PVT LTD-HYD",
//     bankAccountNumber: "50200109463200",
//     bankIfscCode: "HDFC0002083",
//     bankName: "HDFC",
//     transactionId: "",
//     screenshot: null,
//     amount: "",
//   };
//   const fileInputRef = useRef(null);

//   const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
//   const [upiIdMatch, setUpiIdMatch] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(defaultFormData);
//   const [errors, setErrors] = useState({});
//   const [paypalError, setPaypalError] = useState("");
//   const [othersError, setOthersError] = useState("");
//   const [addTransaction] = useAddTransactionMutation();
//   const [createPaypalWalletOrder] = useCreatePaypalWalletOrderMutation();
//   const [transferAvailableBalance] = useTransferAvailableBalanceMutation();
//   const { data: userData, refetch } = useUserDataQuery();
//   const [isToastShown, setIsToastShown] = useState(false);
//   const { data: activePaymentGateway } = useGetActivePaymentGatewayQuery();

//   const isPaymentGatewayActive =
//     activePaymentGateway?.data?.length > 0 &&
//     activePaymentGateway.data[0].isActive;
//   const countryCode = userData?.data?.countryCode;
//   const transactionPercentageValue = 3;

//   const [amount, setAmount] = useState();
//   const [transferAmount, setTransferAmount] = useState();
//   const [selectedMethod, setSelectedMethod] = useState("currency");
//   const [isProceed, setIsProceed] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/images/QR_Code.png";
//     link.download = "QR_Code.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const copyToClipboard = () => {
//     // Format the object into a readable string
//     const textToCopy = `
//       Bank Account Holder Name: ${defaultFormData.bankAccountHolderName}
//       Bank Account Number: ${defaultFormData.bankAccountNumber}
//       Bank IFSC Code: ${defaultFormData.bankIfscCode}
//       Bank Name: ${defaultFormData.bankName}
//     `;

//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard
//         .writeText(textToCopy)
//         .then(() => {
//           toast.success("Text copied to clipboard!");
//         })
//         .catch((err) => {
//           toast.error("Failed to copy: ", err);
//         });
//     } else {
//       // Fallback for unsupported environments
//       try {
//         const textArea = document.createElement("textarea");
//         textArea.value = textToCopy;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand("copy");
//         document.body.removeChild(textArea);
//         toast.success("Text copied to clipboard!");
//       } catch (err) {
//         toast.error("Fallback: Failed to copy text", err);
//       }
//     }
//   };

//   const copyUPI = () => {
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard
//         .writeText(formData.upiId)
//         .then(() => {
//           toast.success("Text copied to clipboard!");
//         })
//         .catch((err) => {
//           toast.error("Failed to copy: ", err);
//         });
//     } else {
//       // Fallback for unsupported environments
//       try {
//         const textArea = document.createElement("textarea");
//         textArea.value = formData.upiId;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand("copy");
//         document.body.removeChild(textArea);
//         toast.success("Text copied to clipboard!");
//       } catch (err) {
//         toast.error("Fallback: Failed to copy text", err);
//       }
//     }
//   };

//   const validateField = (name, value) => {
//     let error = "";
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

//     switch (name) {
//       case "transactionId":
//         if (!value.trim()) {
//           error = "Transaction ID is required";
//         }
//         break;
//       case "amount":
//         if (!value || isNaN(value) || parseFloat(value) <= 0) {
//           error = "Please enter a valid amount greater than zero";
//         }
//         break;
//       case "screenshot":
//         if (!value) {
//           error = "Screenshot is required";
//         } else if (value && !allowedTypes.includes(value.type)) {
//           error = "Only JPG / PNG files are allowed";
//         }
//         break;
//       default:
//         break;
//     }

//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     return error === ""; // Returns true if no error
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     extractDetailsFromImage(file);
//     const isError = validateField("screenshot", file);
//     if (!isError) {
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       setFormData((prev) => ({ ...prev, transactionId: "" }));
//       setUpiIdMatch(true);
//     } else {
//       setFormData((prev) => ({ ...prev, screenshot: file }));
//     }
//   };

//     const extractDetailsFromImage = (file) => {
//     if (!file) return;

//     setIsLoading(true);
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.result) {
//         Tesseract.recognize(reader.result, "eng")
//           .then(({ data: { text } }) => {
//             console.log("=== OCR EXTRACTION START ===");
//             console.log("Raw OCR text:", text);

//             // Clean up the extracted text
//             let cleanedText = text.replace(/¥/g, "₹");
//             console.log("Cleaned text:", cleanedText);

//             // Check recipient validation
//             const paidToJaisvik = /JAISVIK.*SOFTWARE/i.test(cleanedText);
//             const paidToJaimax = /jaimaxcoin2024@upi/i.test(cleanedText);
//             const paidToJaimaxPartial = /jaimax/i.test(cleanedText);
//             const paidToJaisvikUpi = /vyapar.174327728615@hdfcbank/i.test(
//               cleanedText
//             );
//             const paidToCorrectRecipient =
//               paidToJaisvik ||
//               paidToJaimax ||
//               paidToJaimaxPartial ||
//               paidToJaisvikUpi;

//             console.log("=== RECIPIENT VALIDATION ===");
//             console.log("JAISVIK SOFTWARE found:", paidToJaisvik);
//             console.log("jaimaxcoin2024@upi found:", paidToJaimax);
//             console.log("Jaimax (partial) found:", paidToJaimaxPartial);
//             console.log(
//               "Payment to correct recipient:",
//               paidToCorrectRecipient
//             );

//             // Extract transaction ID
//             let transactionID = null;
//             let extractionMethod = "";

//             console.log("=== TRANSACTION ID EXTRACTION ===");

//             // Method 1: Standard Transaction ID
//             console.log("Trying Method 1 - Standard Transaction ID...");
//             const transactionPatterns = [
//               /Transaction\s*ID[:\s]+([0-9A-Za-z]{8,})/i, // Transaction ID: 080254518184 (with colon/space)
//               /Transaction\s*ID\s*\r?\n\s*([0-9A-Za-z]{8,})/i,
//               /Transaction ID[:\s]*(\w+)/i, // Transaction ID \n 080254518184 (next line)
//             ];

//             for (const pattern of transactionPatterns) {
//               const match = cleanedText.match(pattern);
//               if (match && !/date|time|am|pm/i.test(match[1])) {
//                 // Exclude date/time words
//                 transactionID = match[1];
//                 extractionMethod = "Standard Transaction ID";
//                 console.log(
//                   "✅ Method 1 - Found Transaction ID:",
//                   transactionID
//                 );
//                 break;
//               }
//             }

//             // Method 1b: Line-by-line search for Transaction ID format
//             if (!transactionID) {
//               console.log("Trying Method 1b - Transaction ID line-by-line...");
//               const lines = cleanedText.split(/\r?\n/);

//               for (let i = 0; i < lines.length; i++) {
//                 const line = lines[i].trim();

//                 // Look for "Transaction ID" and check next line
//                 if (
//                   line.toLowerCase().includes("transaction id") &&
//                   i + 1 < lines.length
//                 ) {
//                   const nextLine = lines[i + 1].trim();
//                   console.log(`Found Transaction ID line at ${i}: "${line}"`);
//                   console.log(`Next line ${i + 1}: "${nextLine}"`);

//                   // Extract first number from next line (like 080254518184 @ 6th Jun)
//                   const numberMatch = nextLine.match(/^([0-9]{8,})/);
//                   if (numberMatch) {
//                     transactionID = numberMatch[1];
//                     extractionMethod = "Transaction ID next line";
//                     console.log(
//                       "✅ Method 1b - Found Transaction ID from next line:",
//                       transactionID
//                     );
//                     break;
//                   }
//                 }
//               }
//             }

//             // Method 2: Tr. ID (ICICI format)
//             if (!transactionID) {
//               const trIdMatch = cleanedText.match(
//                 /Tr\.?\s*ID\s*:?\s*([A-Za-z0-9]+)/i
//               );
//               if (trIdMatch) {
//                 transactionID = trIdMatch[1];
//                 extractionMethod = "Tr. ID (ICICI)";
//                 console.log("✅ Method 2 - Found Tr. ID:", transactionID);
//               }
//             }

//             // Method 3: UTR/RRN/Reference patterns
//             if (!transactionID) {
//               console.log("Trying Method 3 - UTR/RRN/Reference patterns...");

//               const utrPatterns = [
//                 /UTR\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i, // UTR No: AXOlR40001291624|GJW976DJ0368
//                 /UTR\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i, // UTR Number: AXOlR40001291624|GJW976DJ0368
//                 /UTR\s*:?\s*([A-Za-z0-9|:\-_\.]{20,})/i, // UTR: AXOlR40001291624|GJW976DJ0368
//                 /RRN\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // RRN: 123456789012
//                 /Reference\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // Reference No: 515123556929
//                 /Reference\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // Reference Number: 515123556929
//                 /Ref\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // Ref No: 515123556929
//                 /Payment\s*ID\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Payment ID: ABC123456
//                 /Payment\s*Reference\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Payment Reference: ABC123456
//                 /Order\s*ID\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Order ID: ORD123456
//                 /TXN\s*ID\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // TXN ID: ABC123456
//                 /TXN\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // TXN: ABC123456
//                 /Acknowledgment\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Acknowledgment: ACK123456
//                 /ACK\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // ACK: 987654321
//               ];

//               for (const pattern of utrPatterns) {
//                 const match = cleanedText.match(pattern);
//                 if (match) {
//                   transactionID = match[1];
//                   extractionMethod = "UTR/RRN/Reference pattern";
//                   console.log("✅ Method 3 - Found with pattern:", pattern);
//                   console.log("✅ Method 3 - Extracted:", transactionID);
//                   break;
//                 }
//               }
//             }

//             // Method 4: Line-by-line search for Kotak format
//             if (!transactionID) {
//               const lines = cleanedText.split(/\r?\n/);
//               console.log("Trying Method 4 - Line-by-line search...");

//               for (let i = 0; i < lines.length; i++) {
//                 const line = lines[i].trim();
//                 console.log(`Line ${i}: "${line}"`);

//                 // Look for Reference No. (UTR No./RRN) pattern
//                 if (
//                   line.toLowerCase().includes("reference") &&
//                   line.toLowerCase().includes("utr") &&
//                   i + 1 < lines.length
//                 ) {
//                   const nextLine = lines[i + 1].trim();
//                   console.log(`Found reference line at ${i}: "${line}"`);
//                   console.log(`Next line ${i + 1}: "${nextLine}"`);

//                   // Check if next line is a number
//                   const numberMatch = nextLine.match(/^([0-9]{10,})$/);
//                   if (numberMatch) {
//                     transactionID = numberMatch[1];
//                     extractionMethod = "Kotak Reference No. next line";
//                     console.log(
//                       "✅ Method 4 - Found from next line:",
//                       transactionID
//                     );
//                     break;
//                   }
//                 }

//                 // Look for UTR No. and get next line
//                 if (
//                   line.toLowerCase().includes("utr no") &&
//                   i + 1 < lines.length
//                 ) {
//                   const nextLine = lines[i + 1].trim();
//                   const numberMatch = nextLine.match(
//                     /^([A-Za-z0-9|:\-_\.]{10,})$/
//                   );
//                   if (numberMatch) {
//                     transactionID = numberMatch[1];
//                     extractionMethod = "UTR No. next line";
//                     console.log(
//                       "✅ Method 4 - Found UTR from next line:",
//                       transactionID
//                     );
//                     break;
//                   }
//                 }

//                 // Look for any label followed by ID on next line
//                 if (
//                   (line.toLowerCase().includes("transaction") ||
//                     line.toLowerCase().includes("reference") ||
//                     line.toLowerCase().includes("utr") ||
//                     line.toLowerCase().includes("rrn")) &&
//                   i + 1 < lines.length
//                 ) {
//                   const nextLine = lines[i + 1].trim();
//                   const idMatch = nextLine.match(/^([A-Za-z0-9|:\-_\.]{8,})$/);
//                   if (idMatch) {
//                     transactionID = idMatch[1];
//                     extractionMethod = "Generic label next line";
//                     console.log(
//                       "✅ Method 4 - Found generic ID from next line:",
//                       transactionID
//                     );
//                     break;
//                   }
//                 }
//               }
//             }

//             // Method 5: Any long number fallback
//             if (!transactionID) {
//               const numberMatch = cleanedText.match(/\b([0-9]{12,})\b/);
//               if (numberMatch) {
//                 transactionID = numberMatch[1];
//                 extractionMethod = "Fallback long number";
//                 console.log(
//                   "✅ Method 5 - Found fallback number:",
//                   transactionID
//                 );
//               }
//             }

//             console.log("=== EXTRACTION RESULT ===");
//             console.log("Final transaction ID:", transactionID);
//             console.log("Extraction method:", extractionMethod);

//             // Validation
//             if (!paidToCorrectRecipient) {
//               console.log("❌ Recipient validation failed");
//               setIsLoading(false);
//               setFormData((prev) => ({
//                 ...prev,
//                 transactionId: "",
//                 screenshot: null,
//               }));
//               setIsTransactionIdRead(false);
//               if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//               }
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 screenshot:
//                   "Please upload a screenshot of payment made to jaimaxcoin2024@upi or JAISVIK SOFTWARE",
//               }));
//               toast.error(
//                 "Please upload a screenshot of payment made to jaimaxcoin2024@upi or JAISVIK SOFTWARE"
//               );
//               return;
//             }

//             if (!transactionID) {
//               console.log("❌ Transaction ID not found");
//               setIsLoading(false);
//               setFormData((prev) => ({
//                 ...prev,
//                 transactionId: "",
//                 screenshot: null,
//               }));
//               setIsTransactionIdRead(false);
//               if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//               }
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 screenshot:
//                   "Transaction ID not found in the screenshot. Please upload a clear payment screenshot.",
//               }));
//               toast.error(
//                 "Transaction ID not found in the screenshot. Please upload a clear payment screenshot."
//               );
//               return;
//             }

//             // Success!
//             console.log(
//               "✅ All validations passed! Setting transaction ID:",
//               transactionID
//             );
//             setFormData((prev) => ({
//               ...prev,
//               transactionId: transactionID,
//             }));
//             setIsLoading(false);
//             setIsTransactionIdRead(false);
//             setErrors((prevErrors) => ({
//               ...prevErrors,
//               screenshot: "",
//             }));
//             toast.success(
//               `Transaction ID extracted successfully using ${extractionMethod}!`
//             );
//             console.log("=== OCR EXTRACTION END ===");
//           })
//           .catch((error) => {
//             console.error("Error during OCR:", error);
//             setIsLoading(false);
//             setFormData((prev) => ({
//               ...prev,
//               transactionId: "",
//               screenshot: null,
//             }));
//             setIsTransactionIdRead(false);
//             if (fileInputRef.current) {
//               fileInputRef.current.value = "";
//             }
//             setErrors((prevErrors) => ({
//               ...prevErrors,
//               screenshot:
//                 "Failed to read screenshot. Please upload a clear image.",
//             }));
//             toast.error(
//               "Failed to read screenshot. Please upload a clear image."
//             );
//           });
//       }
//     };

//     reader.readAsDataURL(file);
//   };

//   // const extractDetailsFromImage = (file) => {
//   //   if (!file) return;

//   //   setIsLoading(true);
//   //   const reader = new FileReader();
//   //   let toastShown = false; // Flag to ensure the toast shows only once

//   //   reader.onload = () => {
//   //     if (reader.result) {
//   //       Tesseract.recognize(reader.result, "eng")
//   //         .then(({ data: { text } }) => {
//   //           // console.log(text, "extracted");

//   //           // Hard coded values to be expected from the screenshot to be valid
//   //           const expectedUpiId = "jaimaxcoin2024@upi";
//   //           const sentToLabel = "Sentto :";
//   //           let upiId = null;

//   //           // Clean up the extracted text by replacing ¥ with ₹
//   //           let cleanedText = text.replace(/¥/g, "₹");

//   //           // Regex to extract Transaction ID details
//   //           const extractedTransactionID = cleanedText.match(
//   //             /Transaction ID[:\s]*(\w+)/i
//   //           );

//   //           const upiRefNoMatch = cleanedText.match(
//   //             /UPI Ref(?:\.|erence)? No[:\s]*([\d\s]+)(?=\D|$)/i
//   //           );

//   //           // console.log(upiRefNoMatch, "upiRefNoMatch");

//   //           // Extract and clean up the UPI reference number
//   //           const upiRefNo = upiRefNoMatch
//   //             ? upiRefNoMatch[1].replace(/\s+/g, "")
//   //             : null;

//   //           const transactionID = extractedTransactionID
//   //             ? extractedTransactionID[1]
//   //             : upiRefNo
//   //               ? upiRefNo
//   //               : null;

//   //           if (!transactionID) {
//   //             setIsLoading(false);
//   //             setFormData((prev) => ({
//   //               ...prev,
//   //               transactionId: "",
//   //             }));
//   //             setIsTransactionIdRead(true);
//   //           } else {
//   //             setFormData((prev) => ({
//   //               ...prev,
//   //               transactionId: transactionID,
//   //             }));
//   //             setIsLoading(false);
//   //             setIsTransactionIdRead(false);
//   //           }
//   //         })
//   //         .catch((error) => {
//   //           // console.error("Error during OCR:", error);
//   //           setIsLoading(false);
//   //         });
//   //     }
//   //   };

//   //   reader.readAsDataURL(file);
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Additional validation for specific fields
//     if (name === "amount" && !/^[0-9]*$/.test(value)) {
//       return;
//     }
//     if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) {
//       return;
//     }
//     // Convert transactionId to uppercase before setting
//     if (name === "transactionId") {
//       const upperCaseValue = toUpperCase(value);
//       setFormData((prevData) => ({ ...prevData, [name]: upperCaseValue }));
//     } else {
//       // For other fields, just set the value normally
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     }

//     validateField(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate all fields before submission
//     const isTransactionIdValid = validateField(
//       "transactionId",
//       formData.transactionId
//     );
//     const isScreenshotValid = validateField("screenshot", formData.screenshot);
//     const isAmountValid = validateField("amount", formData.amount);

//     if (!(isTransactionIdValid && isScreenshotValid && isAmountValid)) {
//       setIsToastShown(true);
//       if (!isToastShown) {
//         toast.error("Please fill in all required fields.");
//       } else {
//         toast.dismiss();
//         toast.error("Please fill in all required fields.");
//       }
//       return;
//     }
//     const formDataToSend = new FormData();
//     formDataToSend.append("transactionId", formData.transactionId);
//     formDataToSend.append("transactionAmount", formData.amount);
//     formDataToSend.append("screenshot", formData.screenshot);

//     setLoading(true);
//     try {
//       const res = await addTransaction(formDataToSend).unwrap();
//       if (res?.status_code === 200) {
//         toast.success(res?.message || "Form submitted successfully!");
//         setFormData(defaultFormData);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = "";
//         }
//         navigate("/wallet");
//       }
//     } catch (error) {
//       // console.log("Error submitting form:", error);
//       setIsToastShown(true);
//       if (!isToastShown) {
//         toast.error(error.data.message || "Form submission failed.");
//       } else {
//         toast.dismiss();
//         toast.error(error.data.message || "Form submission failed.");
//       }
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const toUpperCase = (text) => {
//     return text.toUpperCase();
//   };

//   /**
//    * This method is used to change the amount
//    * @param {*} e
//    */
//   const handleAmountChange = (e) => {
//     let inputValue = e.target.value;
//     inputValue = inputValue.replace(/[^0-9 ]/g, "");
//     setAmount(inputValue);
//     if (inputValue) {
//       setPaypalError("");
//       setIsProceed(false);
//     }
//   };

//   /**
//    * This method is used to validate the amounts
//    * @param {*} paymentMethod
//    * @return {*}
//    */
//   const validate = (paymentMethod) => {
//     let isError;

//     if (paymentMethod === "currency") {
//       if (!amount) {
//         setPaypalError("Please Enter Amount");
//         isError = true;
//       } else if (+amount <= 0) {
//         isError = true;
//         setPaypalError("Please Enter Valid Amount");
//       } else {
//         isError = false;
//         setPaypalError("");
//       }
//     } else {
//       if (!transferAmount) {
//         setOthersError("Please Enter Transfer Amount");
//         isError = true;
//       } else if (+transferAmount <= 0) {
//         isError = true;
//         setOthersError("Please Enter Valid Amount");
//       } else if (+transferAmount > +userData?.data?.Inr) {
//         isError = true;
//         setOthersError("Insufficient Balance");
//       } else {
//         isError = false;
//         setOthersError("");
//       }
//     }
//     return isError;
//   };

//   /**
//    * This method is used to proceed the paypal wallet order by passing amount
//    */
//   const proceedPaypalAddMoney = async () => {
//     if (validate("currency")) {
//       return;
//     }
//     setIsProceed(true);
//   };

//   /**
//    * This method is used to create the paypal wallet order by passing amount
//    */
//   const addMoneyThroughPaypal = async () => {
//     setLoading(true);

//     /* Prepare the request payload */
//     const payload = {
//       amount: amount,
//     };

//     try {
//       const res = await createPaypalWalletOrder(payload).unwrap();
//       window.location.href = res?.data?.forwardLink;
//     } catch (error) {
//       // console.error("Error while creating PayPal wallet order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * This method is used to change the payment mode radio input
//    * @param {*} checkedValue
//    */
//   const onChangePaymentMode = (checkedValue) => {
//     setSelectedMethod(checkedValue);
//     setOthersError("");
//     setPaypalError("");
//     setIsProceed(false);
//     setTransferAmount();
//   };

//   /**
//    * This method is used to change the amount to transfer
//    * @param {*} e
//    */
//   const handleTransferAmountChange = (e) => {
//     let inputValue = e.target.value;
//     inputValue = inputValue.replace(/[^0-9 ]/g, "");
//     setTransferAmount(inputValue);
//     if (inputValue) {
//       setOthersError("");
//     }
//   };

//   /**
//    * This method is used to create the paypal wallet order by passing amount
//    */
//   const onSubmitTransferMoney = async () => {
//     if (validate("others")) {
//       return;
//     }
//     /* Prepare the request payload */
//     const payload = {
//       transferAmount: +transferAmount,
//     };

//     setLoading(true);
//     try {
//       const response = await transferAvailableBalance(payload).unwrap();
//       toast.success(response?.message);
//       navigate("/wallet");
//     } catch (error) {
//       toast.error(error?.data?.message || "Error while transferring funds");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * This method is used to calculate the transaction fee based on the percentage
//    * @return {*}
//    */
//   const calculateTransactionFee = () => {
//     const transactionFee = (+amount * transactionPercentageValue) / 100;
//     return transactionFee || 0;
//   };

//   useEffect(() => {
//     refetch();
//   }, []);
//   const onClickAddMoney = () => {
//     try {
//       // Step 1: Get and parse user data from localStorage
//       const userDataRaw = Cookies.get("userData");
//       if (!userDataRaw) {
//         // console.error("User not found in localStorage");
//         alert("User not logged in. Please login and try again.");
//         return;
//       }

//       const userData = JSON.parse(userDataRaw);
//       const userId = userData?.data?._id;
//       const name = userData?.data?.name;

//       if (!userId || !name) {
//         // console.error("User data is incomplete");
//         alert("User details are missing. Please contact support.");
//         return;
//       }

//       // Step 2: Encrypt user data
//       const secretKey = "6LfJPggqAAAAAKjkkCmWhGcHgvudxBl4519iceGa";
//       const encryptedUserId = CryptoJS.AES.encrypt(
//         userId,
//         secretKey
//       ).toString();
//       const encryptedUserName = CryptoJS.AES.encrypt(
//         name,
//         secretKey
//       ).toString();

//       const encryptedFrom = CryptoJS.AES.encrypt(
//         "website",
//         secretKey
//       ).toString();

//       // Step 3: Sign the payload
//       const payload = `${encryptedUserId}|${encryptedUserName}`;
//       const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

//       // Step 4: Construct the redirect URL
//       const redirectUrl = `https://www.jaisviksolutions.com/paynow?userId=${encodeURIComponent(
//         encryptedUserId
//       )}&name=${encodeURIComponent(
//         encryptedUserName
//       )}&from=${encodeURIComponent(encryptedFrom)}&signature=${signature}`;

//       // Step 5: Open the payment page in a new tab
//       const paymentWindow = window.open(redirectUrl, "_blank");

//       // Step 6: Check if popup was blocked
//       if (
//         !paymentWindow ||
//         paymentWindow.closed ||
//         typeof paymentWindow.closed === "undefined"
//       ) {
//         alert(
//           "Popup blocked! Please allow popups for this site to proceed with payment."
//         );
//       } else {
//         paymentWindow.focus(); // optional: bring the tab into focus
//       }
//     } catch (error) {
//       // console.error("Error in onClickAddMoney:", error);
//       alert("Something went wrong. Please try again or contact support.");
//     }
//   };

//   return (
//     <div className=" min-h-screen ">
//       {/* Payment Method Selection */}
//       <div className="flex pt-6 gap-6">
//         <div className="flex items-center">
//           <input
//             className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer ml-4"
//             type="radio"
//             name="currency"
//             id="currency"
//             checked={selectedMethod === "currency"}
//             onChange={() => onChangePaymentMode("currency")}
//           />
//           <label
//             className="ml-2 text-lg font-medium text-slate-700 cursor-pointer"
//             htmlFor="currency"
//           >
//             {countryCode === 91 ? "UPI" : "Paypal"}
//           </label>
//         </div>
//         <div className="flex items-center">
//           <input
//             className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer"
//             type="radio"
//             name="others"
//             id="others"
//             checked={selectedMethod === "others"}
//             onChange={() => onChangePaymentMode("others")}
//           />
//           <label
//             className="ml-2 text-lg font-medium text-slate-700 cursor-pointer"
//             htmlFor="others"
//           >
//             Others
//           </label>
//         </div>
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
//           {selectedMethod === "currency" && countryCode === 91 ? (
//             <>
//               {/* UPI Payment Form */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl shadow-lg p-6">
//                   {/* UPI ID Section */}
//                   <div className="mb-6">
//                     <label className="block text-teal-700 font-semibold mb-2">
//                       UPI ID
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         value={formData.upiId}
//                         name="upiId"
//                         onChange={handleChange}
//                         disabled
//                         readOnly={true}
//                       />
//                       <CopyToClipboardButton
//                         textToCopy={defaultFormData.upiId}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
//                       />
//                     </div>
//                   </div>

//                   {/* Transaction Details */}
//                   <div className="bg-slate-50 rounded-lg p-4">
//                     <h3 className="text-teal-700 font-semibold mb-4">Transaction Details</h3>

//                     {/* Transaction ID */}
//                     <div className="mb-4">
//                       <label className="block text-slate-600 font-medium mb-2">
//                         Transaction ID
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         placeholder={
//                           !isTransactionIdRead
//                             ? "Autofill"
//                             : "Enter transaction ID"
//                         }
//                         value={formData.transactionId}
//                         name="transactionId"
//                         onChange={handleChange}
//                         autoComplete="off"
//                         disabled={!isTransactionIdRead}
//                       />
//                       {errors.transactionId && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.transactionId}
//                         </p>
//                       )}
//                     </div>

//                     {/* Screenshot Upload */}
//                     <div className="mb-4">
//                       <label className="block text-slate-600 font-medium mb-2">
//                         Screenshot
//                       </label>
//                       <input
//                         type="file"
//                         accept=".jpg,.jpeg,.png,.jfif"
//                         className="w-full px-4 py-3  border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-1000 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-100"
//                         onChange={handleImageChange}
//                         ref={fileInputRef}
//                       />
//                       {errors.screenshot && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.screenshot}
//                         </p>
//                       )}
//                     </div>

//                     {/* Amount */}
//                     <div className="mb-6">
//                       <label className="block text-slate-600 font-medium mb-2">
//                         Amount
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         placeholder="Please enter amount"
//                         value={formData.amount}
//                         name="amount"
//                         onChange={handleChange}
//                         autoComplete="off"
//                       />
//                       {errors.amount && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.amount}
//                         </p>
//                       )}
//                     </div>

//                     <button
//                       type="submit"
//                       onClick={handleSubmit}
//                       className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* QR Code Section */}
//               <div className="lg:col-span-1">
//                 <div className="text-center mb-4">
//                   <button
//                     className="text-white  font-semibold underline"
//                     onClick={handleDownload}
//                   >
//                     Download QR Code for Future Payments
//                   </button>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//                   <p className="text-slate-700 font-semibold mb-4">
//                     Jaisvik Software Solutions Pvt Ltd.
//                   </p>
//                   <img
//                     src={scan}
//                     className="mx-auto mb-4 h-48 object-contain"
//                     alt="QR Code"
//                     loading="lazy"
//                   />
//                   <p className="text-slate-600 mb-4">
//                     UPI ID: <span className="text-teal-600 font-semibold">Jaimaxcoin2024@upi</span>
//                   </p>
//                   <img src={bhumi} className="mx-auto mb-4 h-8" alt="Bhumi" />
//                   <div className="mt-4">
//                     <img src={socialMedia} className="mx-auto h-6" alt="Social Media" loading="lazy" />
//                   </div>
//                 </div>

//                 {/* Card Payment Section */}
//                 {isPaymentGatewayActive && (
//                   <div className="bg-white rounded-xl shadow-lg p-6 text-center mt-6">
//                     <h3 className="text-slate-700 font-bold text-lg mb-4">
//                       Pay through the cards
//                     </h3>
//                     <img
//                       src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Credit_or_Debit_Card_Flat_Icon_Vector.svg/2048px-Credit_or_Debit_Card_Flat_Icon_Vector.svg.png"
//                       className="mx-auto mb-4 w-32 h-20 object-contain"
//                       alt="Card Payment"
//                     />
//                     <p className="text-slate-600 text-sm mb-4">
//                       For payments above <strong className="text-slate-700">₹25,000,</strong> ensure your card
//                       has sufficient limit and is enabled for high-value online transactions.
//                     </p>
//                     <button
//                       onClick={onClickAddMoney}
//                       className="w-3/5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
//                     >
//                       Pay Now
//                     </button>
//                   </div>
//                 )}

//               </div>

//               {/* Bank Details Section */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl shadow-lg p-6">
//                   <h3 className="text-slate-700 font-bold text-xl mb-6">
//                     Bank Details
//                   </h3>

//                   {/* Bank Holder Name */}
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex-1">
//                       <p className="text-slate-600 font-semibold mb-1">
//                         Bank Holder Name:
//                       </p>
//                       <p className="text-slate-700 text-sm break-words">
//                         {formData.bankAccountHolderName}
//                       </p>
//                     </div>
//                     <CopyToClipboardButton
//                       textToCopy={defaultFormData.bankAccountHolderName}
//                       className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
//                     />
//                   </div>

//                   {/* Account Number */}
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex-1">
//                       <p className="text-slate-600 font-semibold mb-1">
//                         Bank Account No:
//                       </p>
//                       <p className="text-slate-700">
//                         {formData.bankAccountNumber}
//                       </p>
//                     </div>
//                     <CopyToClipboardButton
//                       textToCopy={defaultFormData.bankAccountNumber}
//                       className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
//                     />
//                   </div>

//                   {/* IFSC Code */}
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="flex-1">
//                       <p className="text-slate-600 font-semibold mb-1">
//                         IFSC Code:
//                       </p>
//                       <p className="text-slate-700">
//                         {formData.bankIfscCode}
//                       </p>
//                     </div>
//                     <CopyToClipboardButton
//                       textToCopy={defaultFormData.bankIfscCode}
//                       className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
//                     />
//                   </div>

//                   {/* Bank Name */}
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <p className="text-slate-600 font-semibold mb-1">
//                         Bank Name:
//                       </p>
//                       <p className="text-slate-700">
//                         {formData.bankName}
//                       </p>
//                     </div>
//                     <CopyToClipboardButton
//                       textToCopy={defaultFormData.bankName}
//                       className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : selectedMethod === "currency" && countryCode !== 91 ? (
//             /* PayPal Payment Section */
//             <div className="lg:col-span-3">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-slate-700 mb-6">Add Funds</h2>

//                 <div className="max-w-md">
//                   <div className="mb-4">
//                     <label className="block text-slate-600 font-medium mb-2">
//                       Enter Amount <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       placeholder="Enter Amount"
//                       name="amount"
//                       value={amount}
//                       onChange={handleAmountChange}
//                       autoComplete="off"
//                     />
//                     {paypalError && (
//                       <p className="text-red-500 text-sm mt-1">* {paypalError}</p>
//                     )}
//                   </div>

//                   {isProceed && (
//                     <div className="bg-slate-50 rounded-lg p-4 mb-4">
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between">
//                           <span className="text-slate-600">Transaction Amount:</span>
//                           <span className="font-semibold text-slate-700">${amount}.00</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-slate-600">Transaction Fee:</span>
//                           <span className="font-semibold text-slate-700">${calculateTransactionFee()}</span>
//                         </div>
//                         <div className="text-xs text-slate-500 mb-2">
//                           Note: A transaction fee of <strong>{transactionPercentageValue}%</strong> applies to each transaction.
//                         </div>
//                         <div className="flex justify-between border-t pt-2">
//                           <span className="text-slate-600 font-medium">Total Amount:</span>
//                           <span className="font-bold text-slate-700">${calculateTransactionFee() + +amount}</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex gap-4">
//                     {isProceed ? (
//                       <button
//                         type="button"
//                         onClick={addMoneyThroughPaypal}
//                         className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
//                       >
//                         Add Funds
//                       </button>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={proceedPaypalAddMoney}
//                         className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
//                       >
//                         Proceed
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             /* Transfer Available Balance Section */
//             <div className="lg:col-span-3">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="mb-6">
//                   <h2 className="text-2xl font-bold text-slate-700">
//                     Available Balance: {countryCode === 91 ? "₹" : "$"}
//                     {(+userData?.data?.Inr)?.toFixed(2)}
//                   </h2>
//                   <p className="text-slate-500 text-sm">(Referral + Super Bonus)</p>
//                 </div>

//                 <div className="max-w-md">
//                   <div className="mb-4">
//                     <label className="block text-slate-600 font-medium mb-2">
//                       Enter Amount To Transfer <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       placeholder="Enter Transfer Amount"
//                       name="transferAmount"
//                       value={transferAmount}
//                       onChange={handleTransferAmountChange}
//                       autoComplete="off"
//                     />
//                     {othersError && (
//                       <p className="text-red-500 text-sm mt-1">* {othersError}</p>
//                     )}
//                   </div>

//                   <button
//                     type="button"
//                     onClick={onSubmitTransferMoney}
//                     className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
//                   >
//                     Transfer
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {(isLoading || loading) && <Loader />}
//     </div>
//   );
// };

// export default AddMoneyToWallet;

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import {
  useAddTransactionMutation,
  useCreatePaypalWalletOrderMutation,
  useTransferAvailableBalanceMutation,
} from "../wallet/walletApiSlice";
import Tesseract from "tesseract.js";
// import scan from "../../assets/Images/SignUp/scan.png";
import scan from "../../../../assets/Images/SignUp/newQr.jpg";
import bhumi from "../../../../assets/Images/SignUp/bhumi.png";
// import scanners from "../../assets/Images/SignUp/scanners.svg";
import socialMedia from "../../../../assets/Images/SignUp/socialmedia.svg";
import CopyToClipboardButton from "../../../../pages/home/CopyToClipboard";
// import loaderImage from "../../assets/Images/loader.svg";
import Loader from "../../../Loader/loader";
import CryptoJS from "crypto-js";
import { useGetActivePaymentGatewayQuery } from "../TodayEarnings/userEarningApiSlice";
/**
 * This component is used to add funds to wallet by different payment methods UPI, Paypal & Transfer Available Balance
 * @return {*}
 */
const AddMoneyToWallet = () => {
  const defaultFormData = {
    upiId: "jaimaxcoin2024@upi",
    secondUpiId: "Vyapar.174327728615@hdfcbank",
    bankAccountHolderName: "JAISVIK SOFTWARE SOLUTIONS PVT LTD-HYD",
    bankAccountNumber: "50200109463200",
    bankIfscCode: "HDFC0002083",
    bankName: "HDFC",
    transactionId: "",
    screenshot: null,
    amount: "",
  };

  const [selectedUpiId, setSelectedUpiId] = useState("primary"); // To track which UPI ID is selected
  const fileInputRef = useRef(null);

  const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
  const [upiIdMatch, setUpiIdMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [paypalError, setPaypalError] = useState("");
  const [othersError, setOthersError] = useState("");
  const [addTransaction] = useAddTransactionMutation();
  const [createPaypalWalletOrder] = useCreatePaypalWalletOrderMutation();
  const [transferAvailableBalance] = useTransferAvailableBalanceMutation();
  const { data: userData, refetch } = useUserDataQuery();
  const [isToastShown, setIsToastShown] = useState(false);
  const { data: activePaymentGateway } = useGetActivePaymentGatewayQuery();

  const isPaymentGatewayActive =
    activePaymentGateway?.data?.length > 0 &&
    activePaymentGateway.data[0].isActive;
  const countryCode = userData?.data?.countryCode;
  const transactionPercentageValue = 3;

  const [amount, setAmount] = useState();
  const [transferAmount, setTransferAmount] = useState();
  const [selectedMethod, setSelectedMethod] = useState("currency");
  const [isProceed, setIsProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to toggle between UPI IDs
  const toggleUpiId = (id) => {
    setSelectedUpiId(id);
  };

  // Get current UPI ID based on selection
  const getCurrentUpiId = () => {
    return selectedUpiId === "primary"
      ? defaultFormData.upiId
      : defaultFormData.secondUpiId;
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/QR_Code.png";
    link.download = "QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    // Format the object into a readable string
    const textToCopy = `
      Bank Account Holder Name: ${defaultFormData.bankAccountHolderName}
      Bank Account Number: ${defaultFormData.bankAccountNumber}
      Bank IFSC Code: ${defaultFormData.bankIfscCode}
      Bank Name: ${defaultFormData.bankName}
    `;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy: ", err);
        });
    } else {
      // Fallback for unsupported environments
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Text copied to clipboard!");
      } catch (err) {
        toast.error("Fallback: Failed to copy text", err);
      }
    }
  };

  const copyUPI = () => {
    const upiToCopy = getCurrentUpiId();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(upiToCopy)
        .then(() => {
          toast.success("UPI ID copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy: ", err);
        });
    } else {
      // Fallback for unsupported environments
      try {
        const textArea = document.createElement("textarea");
        textArea.value = upiToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("UPI ID copied to clipboard!");
      } catch (err) {
        toast.error("Fallback: Failed to copy text", err);
      }
    }
  };

  const validateField = (name, value) => {
    let error = "";
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    switch (name) {
      case "transactionId":
        if (!value.trim()) {
          error = "Transaction ID is required";
        }
        break;
      case "amount":
        if (!value || isNaN(value) || parseFloat(value) <= 0) {
          error = "Please enter a valid amount greater than zero";
        }
        break;
      case "screenshot":
        if (!value) {
          error = "Screenshot is required";
        } else if (value && !allowedTypes.includes(value.type)) {
          error = "Only JPG / PNG files are allowed";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === ""; // Returns true if no error
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    extractDetailsFromImage(file);
    const isError = validateField("screenshot", file);
    if (!isError) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFormData((prev) => ({ ...prev, transactionId: "" }));
      setUpiIdMatch(true);
    } else {
      setFormData((prev) => ({ ...prev, screenshot: file }));
    }
  };

  const extractDetailsFromImage = (file) => {
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        Tesseract.recognize(reader.result, "eng")
          .then(({ data: { text } }) => {
            console.log("=== OCR EXTRACTION START ===");
            console.log("Raw OCR text:", text);

            // Clean up the extracted text
            let cleanedText = text.replace(/¥/g, "₹");
            console.log("Cleaned text:", cleanedText);

            // Check recipient validation
            const paidToJaisvik = /JAISVIK.*SOFTWARE/i.test(cleanedText);
            const paidToJaimax = /jaimaxcoin2024@upi/i.test(cleanedText);
            const paidToJaimaxPartial = /jaimax/i.test(cleanedText);
            const paidToJaisvikUpi = /vyapar.174327728615@hdfcbank/i.test(
              cleanedText
            );
            const paidToCorrectRecipient =
              paidToJaisvik ||
              paidToJaimax ||
              paidToJaimaxPartial ||
              paidToJaisvikUpi;

            console.log("=== RECIPIENT VALIDATION ===");
            console.log("JAISVIK SOFTWARE found:", paidToJaisvik);
            console.log("jaimaxcoin2024@upi found:", paidToJaimax);
            console.log("Jaimax (partial) found:", paidToJaimaxPartial);
            console.log(
              "vyapar.174327728615@hdfcbank found:",
              paidToJaisvikUpi
            );
            console.log(
              "Payment to correct recipient:",
              paidToCorrectRecipient
            );

            // Extract transaction ID
            let transactionID = null;
            let extractionMethod = "";

            console.log("=== TRANSACTION ID EXTRACTION ===");

            // Method 1: Standard Transaction ID
            console.log("Trying Method 1 - Standard Transaction ID...");
            const transactionPatterns = [
              /Transaction\s*ID[:\s]+([0-9A-Za-z]{8,})/i, // Transaction ID: 080254518184 (with colon/space)
              /Transaction\s*ID\s*\r?\n\s*([0-9A-Za-z]{8,})/i,
              /Transaction ID[:\s]*(\w+)/i, // Transaction ID \n 080254518184 (next line)
            ];

            for (const pattern of transactionPatterns) {
              const match = cleanedText.match(pattern);
              if (match && !/date|time|am|pm/i.test(match[1])) {
                // Exclude date/time words
                transactionID = match[1];
                extractionMethod = "Standard Transaction ID";
                console.log(
                  "✅ Method 1 - Found Transaction ID:",
                  transactionID
                );
                break;
              }
            }

            // Method 1b: Line-by-line search for Transaction ID format
            if (!transactionID) {
              console.log("Trying Method 1b - Transaction ID line-by-line...");
              const lines = cleanedText.split(/\r?\n/);

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // Look for "Transaction ID" and check next line
                if (
                  line.toLowerCase().includes("transaction id") &&
                  i + 1 < lines.length
                ) {
                  const nextLine = lines[i + 1].trim();
                  console.log(`Found Transaction ID line at ${i}: "${line}"`);
                  console.log(`Next line ${i + 1}: "${nextLine}"`);

                  // Extract first number from next line (like 080254518184 @ 6th Jun)
                  const numberMatch = nextLine.match(/^([0-9]{8,})/);
                  if (numberMatch) {
                    transactionID = numberMatch[1];
                    extractionMethod = "Transaction ID next line";
                    console.log(
                      "✅ Method 1b - Found Transaction ID from next line:",
                      transactionID
                    );
                    break;
                  }
                }
              }
            }

            // Method 2: Tr. ID (ICICI format)
            if (!transactionID) {
              const trIdMatch = cleanedText.match(
                /Tr\.?\s*ID\s*:?\s*([A-Za-z0-9]+)/i
              );
              if (trIdMatch) {
                transactionID = trIdMatch[1];
                extractionMethod = "Tr. ID (ICICI)";
                console.log("✅ Method 2 - Found Tr. ID:", transactionID);
              }
            }

            // Method 3: UTR/RRN/Reference patterns
            if (!transactionID) {
              console.log("Trying Method 3 - UTR/RRN/Reference patterns...");

              const utrPatterns = [
                /UTR\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i, // UTR No: AXOlR40001291624|GJW976DJ0368
                /UTR\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{15,})/i, // UTR Number: AXOlR40001291624|GJW976DJ0368
                /UTR\s*:?\s*([A-Za-z0-9|:\-_\.]{20,})/i, // UTR: AXOlR40001291624|GJW976DJ0368
                /RRN\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // RRN: 123456789012
                /Reference\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // Reference No: 515123556929
                /Reference\s*Number\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // Reference Number: 515123556929
                /Ref\s*No\.?\s*:?\s*([A-Za-z0-9|:\-_\.]{10,})/i, // Ref No: 515123556929
                /Payment\s*ID\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Payment ID: ABC123456
                /Payment\s*Reference\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Payment Reference: ABC123456
                /Order\s*ID\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Order ID: ORD123456
                /TXN\s*ID\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // TXN ID: ABC123456
                /TXN\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // TXN: ABC123456
                /Acknowledgment\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // Acknowledgment: ACK123456
                /ACK\s*:?\s*([A-Za-z0-9|:\-_\.]{8,})/i, // ACK: 987654321
              ];

              for (const pattern of utrPatterns) {
                const match = cleanedText.match(pattern);
                if (match) {
                  transactionID = match[1];
                  extractionMethod = "UTR/RRN/Reference pattern";
                  console.log("✅ Method 3 - Found with pattern:", pattern);
                  console.log("✅ Method 3 - Extracted:", transactionID);
                  break;
                }
              }
            }

            // Method 4: Line-by-line search for Kotak format
            if (!transactionID) {
              const lines = cleanedText.split(/\r?\n/);
              console.log("Trying Method 4 - Line-by-line search...");

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                console.log(`Line ${i}: "${line}"`);

                // Look for Reference No. (UTR No./RRN) pattern
                if (
                  line.toLowerCase().includes("reference") &&
                  line.toLowerCase().includes("utr") &&
                  i + 1 < lines.length
                ) {
                  const nextLine = lines[i + 1].trim();
                  console.log(`Found reference line at ${i}: "${line}"`);
                  console.log(`Next line ${i + 1}: "${nextLine}"`);

                  // Check if next line is a number
                  const numberMatch = nextLine.match(/^([0-9]{10,})$/);
                  if (numberMatch) {
                    transactionID = numberMatch[1];
                    extractionMethod = "Kotak Reference No. next line";
                    console.log(
                      "✅ Method 4 - Found from next line:",
                      transactionID
                    );
                    break;
                  }
                }

                // Look for UTR No. and get next line
                if (
                  line.toLowerCase().includes("utr no") &&
                  i + 1 < lines.length
                ) {
                  const nextLine = lines[i + 1].trim();
                  const numberMatch = nextLine.match(
                    /^([A-Za-z0-9|:\-_\.]{10,})$/
                  );
                  if (numberMatch) {
                    transactionID = numberMatch[1];
                    extractionMethod = "UTR No. next line";
                    console.log(
                      "✅ Method 4 - Found UTR from next line:",
                      transactionID
                    );
                    break;
                  }
                }

                // Look for any label followed by ID on next line
                if (
                  (line.toLowerCase().includes("transaction") ||
                    line.toLowerCase().includes("reference") ||
                    line.toLowerCase().includes("utr") ||
                    line.toLowerCase().includes("rrn")) &&
                  i + 1 < lines.length
                ) {
                  const nextLine = lines[i + 1].trim();
                  const idMatch = nextLine.match(/^([A-Za-z0-9|:\-_\.]{8,})$/);
                  if (idMatch) {
                    transactionID = idMatch[1];
                    extractionMethod = "Generic label next line";
                    console.log(
                      "✅ Method 4 - Found generic ID from next line:",
                      transactionID
                    );
                    break;
                  }
                }
              }
            }

            // Method 5: Any long number fallback
            if (!transactionID) {
              const numberMatch = cleanedText.match(/\b([0-9]{12,})\b/);
              if (numberMatch) {
                transactionID = numberMatch[1];
                extractionMethod = "Fallback long number";
                console.log(
                  "✅ Method 5 - Found fallback number:",
                  transactionID
                );
              }
            }

            console.log("=== EXTRACTION RESULT ===");
            console.log("Final transaction ID:", transactionID);
            console.log("Extraction method:", extractionMethod);

            // Validation
            if (!paidToCorrectRecipient) {
              console.log("❌ Recipient validation failed");
              setIsLoading(false);
              setFormData((prev) => ({
                ...prev,
                transactionId: "",
                screenshot: null,
              }));
              setIsTransactionIdRead(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
              setErrors((prevErrors) => ({
                ...prevErrors,
                screenshot:
                  "Please upload a screenshot of payment made to jaimaxcoin2024@upi, vyapar.174327728615@hdfcbank, or JAISVIK SOFTWARE",
              }));
              toast.error(
                "Please upload a screenshot of payment made to jaimaxcoin2024@upi, vyapar.174327728615@hdfcbank, or JAISVIK SOFTWARE"
              );
              return;
            }

            if (!transactionID) {
              console.log("❌ Transaction ID not found");
              setIsLoading(false);
              setFormData((prev) => ({
                ...prev,
                transactionId: "",
                screenshot: null,
              }));
              setIsTransactionIdRead(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
              setErrors((prevErrors) => ({
                ...prevErrors,
                screenshot:
                  "Transaction ID not found in the screenshot. Please upload a clear payment screenshot.",
              }));
              toast.error(
                "Transaction ID not found in the screenshot. Please upload a clear payment screenshot."
              );
              return;
            }

            // Success!
            console.log(
              "✅ All validations passed! Setting transaction ID:",
              transactionID
            );
            setFormData((prev) => ({
              ...prev,
              transactionId: transactionID,
            }));
            setIsLoading(false);
            setIsTransactionIdRead(false);
            setErrors((prevErrors) => ({
              ...prevErrors,
              screenshot: "",
            }));
            toast.success(
              `Transaction ID extracted successfully using ${extractionMethod}!`
            );
            console.log("=== OCR EXTRACTION END ===");
          })
          .catch((error) => {
            console.error("Error during OCR:", error);
            setIsLoading(false);
            setFormData((prev) => ({
              ...prev,
              transactionId: "",
              screenshot: null,
            }));
            setIsTransactionIdRead(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            setErrors((prevErrors) => ({
              ...prevErrors,
              screenshot:
                "Failed to read screenshot. Please upload a clear image.",
            }));
            toast.error(
              "Failed to read screenshot. Please upload a clear image."
            );
          });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Additional validation for specific fields
    if (name === "amount" && !/^[0-9]*$/.test(value)) {
      return;
    }
    if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) {
      return;
    }
    // Convert transactionId to uppercase before setting
    if (name === "transactionId") {
      const upperCaseValue = toUpperCase(value);
      setFormData((prevData) => ({ ...prevData, [name]: upperCaseValue }));
    } else {
      // For other fields, just set the value normally
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isTransactionIdValid = validateField(
      "transactionId",
      formData.transactionId
    );
    const isScreenshotValid = validateField("screenshot", formData.screenshot);
    const isAmountValid = validateField("amount", formData.amount);

    if (!(isTransactionIdValid && isScreenshotValid && isAmountValid)) {
      setIsToastShown(true);
      if (!isToastShown) {
        toast.error("Please fill in all required fields.");
      } else {
        toast.dismiss();
        toast.error("Please fill in all required fields.");
      }
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("transactionId", formData.transactionId);
    formDataToSend.append("transactionAmount", formData.amount);
    formDataToSend.append("screenshot", formData.screenshot);

    setLoading(true);
    try {
      const res = await addTransaction(formDataToSend).unwrap();
      if (res?.status_code === 200) {
        toast.success(res?.message || "Form submitted successfully!");
        setFormData(defaultFormData);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        navigate("/wallet");
      }
    } catch (error) {
      // console.log("Error submitting form:", error);
      setIsToastShown(true);
      if (!isToastShown) {
        toast.error(error.data.message || "Form submission failed.");
      } else {
        toast.dismiss();
        toast.error(error.data.message || "Form submission failed.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toUpperCase = (text) => {
    return text.toUpperCase();
  };

  /**
   * This method is used to change the amount
   * @param {*} e
   */
  const handleAmountChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9 ]/g, "");
    setAmount(inputValue);
    if (inputValue) {
      setPaypalError("");
      setIsProceed(false);
    }
  };

  /**
   * This method is used to validate the amounts
   * @param {*} paymentMethod
   * @return {*}
   */
  const validate = (paymentMethod) => {
    let isError;

    if (paymentMethod === "currency") {
      if (!amount) {
        setPaypalError("Please Enter Amount");
        isError = true;
      } else if (+amount <= 0) {
        isError = true;
        setPaypalError("Please Enter Valid Amount");
      } else {
        isError = false;
        setPaypalError("");
      }
    } else {
      if (!transferAmount) {
        setOthersError("Please Enter Transfer Amount");
        isError = true;
      } else if (+transferAmount <= 0) {
        isError = true;
        setOthersError("Please Enter Valid Amount");
      } else if (+transferAmount > +userData?.data?.Inr) {
        isError = true;
        setOthersError("Insufficient Balance");
      } else {
        isError = false;
        setOthersError("");
      }
    }
    return isError;
  };

  /**
   * This method is used to proceed the paypal wallet order by passing amount
   */
  const proceedPaypalAddMoney = async () => {
    if (validate("currency")) {
      return;
    }
    setIsProceed(true);
  };

  /**
   * This method is used to create the paypal wallet order by passing amount
   */
  const addMoneyThroughPaypal = async () => {
    setLoading(true);

    /* Prepare the request payload */
    const payload = {
      amount: amount,
    };

    try {
      const res = await createPaypalWalletOrder(payload).unwrap();
      window.location.href = res?.data?.forwardLink;
    } catch (error) {
      // console.error("Error while creating PayPal wallet order:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * This method is used to change the payment mode radio input
   * @param {*} checkedValue
   */
  const onChangePaymentMode = (checkedValue) => {
    setSelectedMethod(checkedValue);
    setOthersError("");
    setPaypalError("");
    setIsProceed(false);
    setTransferAmount();
  };

  /**
   * This method is used to change the amount to transfer
   * @param {*} e
   */
  const handleTransferAmountChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9 ]/g, "");
    setTransferAmount(inputValue);
    if (inputValue) {
      setOthersError("");
    }
  };

  /**
   * This method is used to create the paypal wallet order by passing amount
   */
  const onSubmitTransferMoney = async () => {
    if (validate("others")) {
      return;
    }
    /* Prepare the request payload */
    const payload = {
      transferAmount: +transferAmount,
    };

    setLoading(true);
    try {
      const response = await transferAvailableBalance(payload).unwrap();
      toast.success(response?.message);
      navigate("/wallet");
    } catch (error) {
      toast.error(error?.data?.message || "Error while transferring funds");
    } finally {
      setLoading(false);
    }
  };

  /**
   * This method is used to calculate the transaction fee based on the percentage
   * @return {*}
   */
  const calculateTransactionFee = () => {
    const transactionFee = (+amount * transactionPercentageValue) / 100;
    return transactionFee || 0;
  };

  useEffect(() => {
    refetch();
  }, []);
  const onClickAddMoney = () => {
    try {
      // Step 1: Get and parse user data from localStorage
      const userDataRaw = Cookies.get("userData");
      if (!userDataRaw) {
        // console.error("User not found in localStorage");
        alert("User not logged in. Please login and try again.");
        return;
      }

      const userData = JSON.parse(userDataRaw);
      const userId = userData?.data?._id;
      const name = userData?.data?.name;

      if (!userId || !name) {
        // console.error("User data is incomplete");
        alert("User details are missing. Please contact support.");
        return;
      }

      // Step 2: Encrypt user data
      const secretKey = "6LfJPggqAAAAAKjkkCmWhGcHgvudxBl4519iceGa";
      const encryptedUserId = CryptoJS.AES.encrypt(
        userId,
        secretKey
      ).toString();
      const encryptedUserName = CryptoJS.AES.encrypt(
        name,
        secretKey
      ).toString();

      const encryptedFrom = CryptoJS.AES.encrypt(
        "website",
        secretKey
      ).toString();

      // Step 3: Sign the payload
      const payload = `${encryptedUserId}|${encryptedUserName}`;
      const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

      // Step 4: Construct the redirect URL
      const redirectUrl = `https://www.jaisviksolutions.com/paynow?userId=${encodeURIComponent(
        encryptedUserId
      )}&name=${encodeURIComponent(
        encryptedUserName
      )}&from=${encodeURIComponent(encryptedFrom)}&signature=${signature}`;

      // Step 5: Open the payment page in a new tab
      const paymentWindow = window.open(redirectUrl, "_blank");

      // Step 6: Check if popup was blocked
      if (
        !paymentWindow ||
        paymentWindow.closed ||
        typeof paymentWindow.closed === "undefined"
      ) {
        alert(
          "Popup blocked! Please allow popups for this site to proceed with payment."
        );
      } else {
        paymentWindow.focus(); // optional: bring the tab into focus
      }
    } catch (error) {
      // console.error("Error in onClickAddMoney:", error);
      alert("Something went wrong. Please try again or contact support.");
    }
  };

  return (
    <div className=" min-h-screen ">
      {/* Payment Method Selection */}
      <div className="flex pt-6 gap-6">
        <div className="flex items-center">
          <input
            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer ml-4"
            type="radio"
            name="currency"
            id="currency"
            checked={selectedMethod === "currency"}
            onChange={() => onChangePaymentMode("currency")}
          />
          <label
            className="ml-2 text-lg font-medium text-slate-700 cursor-pointer"
            htmlFor="currency"
          >
            {countryCode === 91 ? "UPI" : "Paypal"}
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer"
            type="radio"
            name="others"
            id="others"
            checked={selectedMethod === "others"}
            onChange={() => onChangePaymentMode("others")}
          />
          <label
            className="ml-2 text-lg font-medium text-slate-700 cursor-pointer"
            htmlFor="others"
          >
            Others
          </label>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
          {selectedMethod === "currency" && countryCode === 91 ? (
            <>
              {/* UPI Payment Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  {/* UPI ID Section */}
                  <div className="mb-6">
                    <label className="block text-teal-700 font-semibold mb-3">
                      UPI IDs
                    </label>

                    {/* Primary UPI ID */}
                    <div className="mb-3">
                      <p className="text-sm text-slate-600 font-medium mb-1">
                        Primary UPI ID:
                      </p>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          value={defaultFormData.upiId}
                          disabled
                          readOnly={true}
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              defaultFormData.upiId
                            );
                            toast.success(
                              "Primary UPI ID copied to clipboard!"
                            );
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* Secondary UPI ID */}
                    <div>
                      <p className="text-sm text-slate-600 font-medium mb-1">
                        Secondary UPI ID:
                      </p>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                          value={defaultFormData.secondUpiId}
                          disabled
                          readOnly={true}
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              defaultFormData.secondUpiId
                            );
                            toast.success(
                              "Secondary UPI ID copied to clipboard!"
                            );
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="text-teal-700 font-semibold mb-4">
                      Transaction Details
                    </h3>

                    {/* Transaction ID */}
                    <div className="mb-4">
                      <label className="block text-slate-600 font-medium mb-2">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder={
                          !isTransactionIdRead
                            ? "Autofill"
                            : "Enter transaction ID"
                        }
                        value={formData.transactionId}
                        name="transactionId"
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={!isTransactionIdRead}
                      />
                      {errors.transactionId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.transactionId}
                        </p>
                      )}
                    </div>

                    {/* Screenshot Upload */}
                    <div className="mb-4">
                      <label className="block text-slate-600 font-medium mb-2">
                        Screenshot
                      </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.jfif"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-1000 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-100"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                      {errors.screenshot && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.screenshot}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="mb-6">
                      <label className="block text-slate-600 font-medium mb-2">
                        Amount
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Please enter amount"
                        value={formData.amount}
                        name="amount"
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="lg:col-span-1">
                <div className="text-center mb-4">
                  <button
                    className="text-white font-semibold underline"
                    onClick={handleDownload}
                  >
                    Download QR Code for Future Payments
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <p className="text-slate-700 font-semibold mb-4">
                    Jaisvik Software Solutions Pvt Ltd.
                  </p>
                  <img
                    src={scan}
                    className="mx-auto mb-4 h-48 object-contain"
                    alt="QR Code"
                    loading="lazy"
                  />
                  <p className="text-slate-600 mb-2">
                    Primary UPI ID:{" "}
                    <span className="text-teal-600 font-semibold">
                      {defaultFormData.upiId}
                    </span>
                  </p>
                  <p className="text-slate-600 mb-4">
                    Secondary UPI ID:{" "}
                    <span className="text-teal-600 font-semibold">
                      {defaultFormData.secondUpiId}
                    </span>
                  </p>
                  <img src={bhumi} className="mx-auto mb-4 h-8" alt="Bhumi" />
                  <div className="mt-4">
                    <img
                      src={socialMedia}
                      className="mx-auto h-6"
                      alt="Social Media"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Card Payment Section */}
                {isPaymentGatewayActive && (
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center mt-6">
                    <h3 className="text-slate-700 font-bold text-lg mb-4">
                      Pay through the cards
                    </h3>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Credit_or_Debit_Card_Flat_Icon_Vector.svg/2048px-Credit_or_Debit_Card_Flat_Icon_Vector.svg.png"
                      className="mx-auto mb-4 w-32 h-20 object-contain"
                      alt="Card Payment"
                    />
                    <p className="text-slate-600 text-sm mb-4">
                      For payments above{" "}
                      <strong className="text-slate-700">₹25,000,</strong>{" "}
                      ensure your card has sufficient limit and is enabled for
                      high-value online transactions.
                    </p>
                    <button
                      onClick={onClickAddMoney}
                      className="w-3/5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>

              {/* Bank Details Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-slate-700 font-bold text-xl mb-6">
                    Bank Details
                  </h3>

                  {/* Bank Holder Name */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        Bank Holder Name:
                      </p>
                      <p className="text-slate-700 text-sm break-words">
                        {formData.bankAccountHolderName}
                      </p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankAccountHolderName}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>

                  {/* Account Number */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        Bank Account No:
                      </p>
                      <p className="text-slate-700">
                        {formData.bankAccountNumber}
                      </p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankAccountNumber}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>

                  {/* IFSC Code */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        IFSC Code:
                      </p>
                      <p className="text-slate-700">{formData.bankIfscCode}</p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankIfscCode}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>

                  {/* Bank Name */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-slate-600 font-semibold mb-1">
                        Bank Name:
                      </p>
                      <p className="text-slate-700">{formData.bankName}</p>
                    </div>
                    <CopyToClipboardButton
                      textToCopy={defaultFormData.bankName}
                      className="ml-4 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : selectedMethod === "currency" && countryCode !== 91 ? (
            /* PayPal Payment Section */
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-700 mb-6">
                  Add Funds
                </h2>

                <div className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-slate-600 font-medium mb-2">
                      Enter Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter Amount"
                      name="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      autoComplete="off"
                    />
                    {paypalError && (
                      <p className="text-red-500 text-sm mt-1">
                        * {paypalError}
                      </p>
                    )}
                  </div>

                  {isProceed && (
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            Transaction Amount:
                          </span>
                          <span className="font-semibold text-slate-700">
                            ${amount}.00
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            Transaction Fee:
                          </span>
                          <span className="font-semibold text-slate-700">
                            ${calculateTransactionFee()}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mb-2">
                          Note: A transaction fee of{" "}
                          <strong>{transactionPercentageValue}%</strong> applies
                          to each transaction.
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-slate-600 font-medium">
                            Total Amount:
                          </span>
                          <span className="font-bold text-slate-700">
                            ${calculateTransactionFee() + +amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {isProceed ? (
                      <button
                        type="button"
                        onClick={addMoneyThroughPaypal}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                      >
                        Add Funds
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={proceedPaypalAddMoney}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Transfer Available Balance Section */
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-700">
                    Available Balance: {countryCode === 91 ? "₹" : "$"}
                    {(+userData?.data?.Inr)?.toFixed(2)}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    (Referral + Super Bonus)
                  </p>
                </div>

                <div className="max-w-md">
                  <div className="mb-4">
                    <label className="block text-slate-600 font-medium mb-2">
                      Enter Amount To Transfer{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter Transfer Amount"
                      name="transferAmount"
                      value={transferAmount}
                      onChange={handleTransferAmountChange}
                      autoComplete="off"
                    />
                    {othersError && (
                      <p className="text-red-500 text-sm mt-1">
                        * {othersError}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={onSubmitTransferMoney}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default AddMoneyToWallet;

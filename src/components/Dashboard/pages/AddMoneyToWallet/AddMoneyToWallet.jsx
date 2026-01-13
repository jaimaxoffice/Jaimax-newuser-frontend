import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Tesseract from "tesseract.js";
import CryptoJS from "crypto-js";
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import {
  useAddTransactionMutation,
  useCreatePaypalWalletOrderMutation,
  useTransferAvailableBalanceMutation,
} from "../wallet/walletApiSlice";
import { useGetActivePaymentGatewayQuery } from "./AddMoneyApiSlice";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import CopyToClipboardButton from "../../../../ReusableComponents/CopyToClipboard";
import Loader from "../../../../ReusableComponents/Loader/loader";
import scan from "../../../../assets/Images/SignUp/newQr.jpg";

const AddMoneyToWallet = () => {
  // Default form data
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

  // Refs
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // API hooks
  const { data: userData, refetch } = useUserDataQuery();
  const [addTransaction] = useAddTransactionMutation();
  const [createPaypalWalletOrder] = useCreatePaypalWalletOrderMutation();
  const [transferAvailableBalance] = useTransferAvailableBalanceMutation();
  const { data: activePaymentGateway } = useGetActivePaymentGatewayQuery();

  // Constants
  const isPaymentGatewayActive =
    activePaymentGateway?.data?.length > 0 &&
    activePaymentGateway.data[0].isActive;
  const countryCode = userData?.data?.countryCode;
  const isIndian = countryCode === 91;
  const currencySymbol = isIndian ? "₹" : "$";
  const transactionPercentageValue = 3;

  // State variables
  const [formData, setFormData] = useState(defaultFormData);
  const [amount, setAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(isIndian ? "upi" : "paypal");
  const [errors, setErrors] = useState({});
  const [paypalError, setPaypalError] = useState("");
  const [othersError, setOthersError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionIdRead, setIsTransactionIdRead] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedSecondUpi, setCopiedSecondUpi] = useState(false);
  const [isProceed, setIsProceed] = useState(false);

  // Set default payment method based on country
  useEffect(() => {
    if (countryCode) {
      setSelectedMethod(isIndian ? "upi" : "paypal");
    }
  }, [countryCode, isIndian]);

  useEffect(() => {
    refetch();
  }, []);

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(defaultFormData.upiId);
    toast.success("UPI ID copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download QR
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/QR_Code.png";
    link.download = "QR_Code_Jaimaxcoin.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded!");
  };

  // Calculate PayPal transaction fee
  const calculateTransactionFee = () => {
    return (+amount * transactionPercentageValue) / 100 || 0;
  };

  // Validation
  const validateField = (name, value) => {
    let error = "";
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/jfif"];

    switch (name) {
      case "transactionId":
        if (!value.trim()) error = "Transaction ID is required";
        break;
      case "amount":
        if (!value || isNaN(value) || parseFloat(value) <= 0)
          error = "Enter valid amount";
        break;
      case "screenshot":
        if (!value) error = "Screenshot is required";
        else if (!allowedTypes.includes(value.type))
          error = "Only JPG/PNG/JFIF allowed";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validate = (method) => {
    if (method === "paypal") {
      if (!amount) {
        setPaypalError("Please enter amount");
        return true;
      }
      if (+amount <= 0) {
        setPaypalError("Enter valid amount");
        return true;
      }
      setPaypalError("");
      return false;
    }
    if (method === "others") {
      if (!transferAmount) {
        setOthersError("Please enter amount");
        return true;
      }
      if (+transferAmount <= 0) {
        setOthersError("Enter valid amount");
        return true;
      }
      if (+transferAmount > +userData?.data?.Inr) {
        setOthersError("Insufficient balance");
        return true;
      }
      setOthersError("");
      return false;
    }
    return false;
  };

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" && !/^[0-9]*$/.test(value)) return;
    if (name === "transactionId" && !/^[A-Za-z0-9]*$/.test(value)) return;

    const newValue = name === "transactionId" ? value.toUpperCase() : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
    if (value) {
      setPaypalError("");
      setIsProceed(false);
    }
  };

  const handleTransferAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setTransferAmount(value);
    if (value) setOthersError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    extractDetailsFromImage(file);
    const isValid = validateField("screenshot", file);

    if (!isValid) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFormData((prev) => ({ ...prev, transactionId: "" }));
    } else {
      setFormData((prev) => ({ ...prev, screenshot: file }));
    }
  };

  const onChangePaymentMode = (value) => {
    setSelectedMethod(value);
    setOthersError("");
    setPaypalError("");
    setErrors({});
    setTransferAmount("");
    setAmount("");
    setIsProceed(false);
  };

  // OCR Processing
  const extractDetailsFromImage = (file) => {
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        Tesseract.recognize(reader.result, "eng")
          .then(({ data: { text } }) => {
            // console.log("=== OCR EXTRACTION START ===");
            // console.log("Raw OCR text:", text);

            // Clean up text
            let cleanedText = text.replace(/¥/g, "₹");
            // console.log("Cleaned text:", cleanedText);

            // ===== Recipient Validation =====
            const paidToJaisvik = /JAISVIK.*SOFTWARE/i.test(cleanedText);
            const paidToJaimax = /jaimaxcoin2024@upi/i.test(cleanedText);
            const paidToJaimaxPartial = /jaimax/i.test(cleanedText);
            const paidToJaisvikUpi = /vyapar\.174327728615@hdfcbank/i.test(cleanedText);

            const paidToCorrectRecipient =
              paidToJaisvik || paidToJaimax || paidToJaimaxPartial || paidToJaisvikUpi;

            // console.log("Correct Recipient:", paidToCorrectRecipient);

            // ===== Transaction ID Extraction =====
            let transactionID = null;
            let utrRef = null;
            let extractionMethod = "";

            // console.log("=== TRANSACTION ID EXTRACTION ===");

            const transactionPatterns = [
              /Transaction\s*ID[:\s]+([0-9A-Za-z]{8,})/i,
              /Transaction\s*ID\s*\r?\n\s*([0-9A-Za-z]{8,})/i,
              /Transaction ID[:\s]*(\w+)/i,
              /\bTxn\s*ID[:\s-]*([A-Z0-9]{8,30})\b/i,
            ];
            for (const pattern of transactionPatterns) {
              const match = cleanedText.match(pattern);
              if (match) {
                transactionID = match[1];
                extractionMethod = "Transaction ID pattern";
                // console.log("✅ Found Transaction ID:", transactionID);
                break;
              }
            }

            // ===== UTR / Reference Number Extraction =====
            // console.log("=== UTR / REFERENCE EXTRACTION ===");
            const utrPatterns = [
              /\bUTR\s*No\.?\s*:?\s*([A-Z0-9]{10,25})\b/i,
              /\bUTR\s*Number\s*:?\s*([A-Z0-9]{10,25})\b/i,
              /\bReference\s*No\.?\s*:?\s*([A-Z0-9]{10,25})\b/i,
              /\bRef\s*No\.?\s*:?\s*([A-Z0-9]{10,25})\b/i,
              /\bRRN\s*:?\s*([A-Z0-9]{10,25})\b/i,
            ];

            for (const pattern of utrPatterns) {
              const match = cleanedText.match(pattern);
              if (match) {
                utrRef = match[1];
                // console.log("✅ Found UTR Reference:", utrRef);
                break;
              }
            }

            // ===== Fallbacks =====
            if (!transactionID && utrRef) {
              transactionID = utrRef;
              extractionMethod = "Used UTR as Transaction ID";
            }

            if (!utrRef) {
              const longNumber = cleanedText.match(/\b[0-9]{12,}\b/);
              if (longNumber) {
                utrRef = longNumber[0];
                // console.log("✅ Fallback UTR:", utrRef);
              }
            }

            // ===== Validation =====
            if (!paidToCorrectRecipient) {
              // console.log("❌ Invalid recipient");
              setIsLoading(false);
              setFormData((prev) => ({
                ...prev,
                transactionId: "",
                utrRef: "",
                screenshot: null,
              }));
              setIsTransactionIdRead(false);
              if (fileInputRef.current) fileInputRef.current.value = "";
              setErrors((prev) => ({
                ...prev,
                screenshot:
                  "Please upload a screenshot of payment made to jaimaxcoin2024@upi, vyapar.174327728615@hdfcbank, or JAISVIK SOFTWARE",
              }));
              toast.error("Invalid recipient in payment screenshot.");
              return;
            }

            if (!transactionID && !utrRef) {
              // console.log("❌ No IDs found");
              setIsLoading(false);
              setFormData((prev) => ({
                ...prev,
                transactionId: "",
                utrRef: "",
                screenshot: null,
              }));
              setIsTransactionIdRead(false);
              if (fileInputRef.current) fileInputRef.current.value = "";
              setErrors((prev) => ({
                ...prev,
                screenshot:
                  "No valid Transaction ID or UTR found. Please upload a clearer image.",
              }));
              toast.error("No valid Transaction ID or UTR found.");
              return;
            }

       

            setFormData((prev) => ({
              ...prev,
              transactionId: transactionID || "",
              utrRef: utrRef || "",
            }));

            setIsLoading(false);
            setIsTransactionIdRead(false);
            setErrors((prev) => ({ ...prev, screenshot: "" }));

            toast.success(
              ` ${transactionID ? "Transaction ID found." : ""
              } ${utrRef ? "UTR found." : ""}`
            );
            // console.log("=== OCR EXTRACTION END ===");
          })
          .catch((error) => {
            console.error("Error during OCR:", error);
            setIsLoading(false);
            setFormData((prev) => ({
              ...prev,
              transactionId: "",
              utrRef: "",
              screenshot: null,
            }));
            setIsTransactionIdRead(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setErrors((prev) => ({
              ...prev,
              screenshot: "Failed to read screenshot. Please upload a clear image.",
            }));
            toast.error("Failed to read screenshot. Please upload a clear image.");
          });
      }
    };

    reader.readAsDataURL(file);
  };

  

  // Submit handlers
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const isValid =
  //     validateField("transactionId", formData.transactionId) &&
  //     validateField("screenshot", formData.screenshot) &&
  //     validateField("amount", formData.amount);

  //   if (!isValid) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("transactionId", formData.transactionId);
  //   formDataToSend.append("transactionAmount", formData.amount);
  //   formDataToSend.append("screenshot", formData.screenshot);

  //   setLoading(true);
  //   try {
  //     const res = await addTransaction(formDataToSend).unwrap();
  //     if (res?.status_code === 200) {
  //       toast.success(res?.message || "Payment submitted!");
  //       setFormData(defaultFormData);
  //       if (fileInputRef.current) fileInputRef.current.value = "";
  //       navigate("/wallet");
  //     }
  //   } catch (error) {
  //     toast.error(error?.data?.message || "Submission failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const isTransactionIdValid = validateField("transactionId", formData.transactionId);
    const isScreenshotValid = validateField("screenshot", formData.screenshot);
    const isAmountValid = validateField("amount", formData.amount);

    if (!(isTransactionIdValid && isScreenshotValid && isAmountValid)) {
      setIsToastShown(true);
      toast.dismiss();
      toast.error("Please fill in all required fields.");
      return;
    }

    // Prepare data
    const formDataToSend = new FormData();
    formDataToSend.append("transactionId", formData.transactionId); // 🧾 extracted or user-entered transaction id
    formDataToSend.append("transactionUtrRef", formData.utrRef || ""); // 🧾 UTR reference number (separate field)
    formDataToSend.append("transactionAmount", formData.amount);
    formDataToSend.append("screenshot", formData.screenshot);



    setLoading(true);

    try {
      const res = await addTransaction(formDataToSend).unwrap();
      if (res?.status_code === 200) {
        toast.success(res?.message || "Form submitted successfully!");
        setFormData(defaultFormData);
        if (fileInputRef.current) fileInputRef.current.value = "";
        navigate("/wallet");
      } else {
        toast.error(res?.message || "Submission failed.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.message || "Form submission failed.");
    } finally {
      setLoading(false);
    }
  };
  // PayPal handlers
  const proceedPaypalAddMoney = () => {
    if (validate("paypal")) return;
    setIsProceed(true);
  };

  const addMoneyThroughPaypal = async () => {
    setLoading(true);
    try {
      const res = await createPaypalWalletOrder({ amount }).unwrap();
      window.location.href = res?.data?.forwardLink;
    } catch (error) {
      toast.error("Failed to create PayPal order");
    } finally {
      setLoading(false);
    }
  };

  // Transfer money handler
  const onSubmitTransferMoney = async () => {
    if (validate("others")) return;

    setLoading(true);
    try {
      const response = await transferAvailableBalance({
        transferAmount: +transferAmount,
      }).unwrap();
      toast.success(response?.message || "Transfer successful!");
      navigate("/wallet");
    } catch (error) {
      toast.error(error?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  // Card payment handler
  // const onClickAddMoney = () => {
  //   try {
  //     const numericAmount = Number(amount);
  //     if (
  //       !amount ||
  //       isNaN(numericAmount) ||
  //       numericAmount < 15000 ||
  //       numericAmount > 100000
  //     ) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         amount: "Amount: ₹15,000 - ₹1,00,000",
  //       }));
  //       toast.error("Amount must be between ₹15,000 and ₹1,00,000");
  //       return;
  //     }

  //     setErrors((prev) => ({ ...prev, amount: "" }));

  //     const userDataRaw = Cookies.get("userData");
  //     if (!userDataRaw) {
  //       toast.error("Please login and try again");
  //       return;
  //     }

  //     const userData = JSON.parse(userDataRaw);
  //     const userId = userData?.data?._id || userData?._id;
  //     const name = userData?.data?.name || userData?.name;

  //     if (!userId || !name) {
  //       toast.error("User details missing");
  //       return;
  //     }

  //     const secretKey = "6LfJPggqAAAAAKjkkCmWhGcHgvudxBl4519iceGa";
  //     const encryptedUserId = CryptoJS.AES.encrypt(userId, secretKey).toString();
  //     const encryptedUserName = CryptoJS.AES.encrypt(name, secretKey).toString();
  //     const encryptedFrom = CryptoJS.AES.encrypt("website", secretKey).toString();
  //     const encryptedAmount = CryptoJS.AES.encrypt(amount, secretKey).toString();

  //     const payload = `${encryptedUserId}|${encryptedUserName}|${encryptedAmount}`;
  //     const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

  //     const redirectUrl = `https://www.jaisviksolutions.com/paynow?userId=${encodeURIComponent(
  //       encryptedUserId
  //     )}&name=${encodeURIComponent(encryptedUserName)}&from=${encodeURIComponent(
  //       encryptedFrom
  //     )}&amount=${encodeURIComponent(encryptedAmount)}&signature=${signature}`;

  //     const paymentWindow = window.open(redirectUrl, "_blank");

  //     if (!paymentWindow) {
  //       toast.error("Please allow popups for this site");
  //     } else {
  //       paymentWindow.focus();
  //       toast.success("Redirecting to payment...");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };
  const onClickAddMoney = () => {
    try {
      const userDataRaw = Cookies.get("userData");
      if (!userDataRaw) {
        // console.error("User not found in localStorage");
        toast.error("User not logged in. Please login and try again.");
        return;
      }

      const userData = JSON.parse(userDataRaw);
      // console.log(userData, "userData");
      const userId = userData?._id;
      const name = userData?.name;

      if (!userId || !name) {
        // console.error("User data is incomplete");
        toast.error("User details are missing. Please contact support.");
        return;
      }
      const numericAmount = Number(amount);

      if (!amount || isNaN(numericAmount) || numericAmount < 15000 || numericAmount > 100000) {
        setErrors((prev) => ({
          ...prev,
          amount: "Amount must be between 15,000 and 1,00,000",
        }));
        return;
      }

      // Clear error if valid
      setErrors((prev) => ({ ...prev, amount: "" }));

      // Step 2: Encrypt user data
      // const secretKey = "6LfJPggqAAAAAKjkkCmWhGcHgvudxBl4519iceGa";
      const secretKey=VITE_PAYMENT_GATEWAY;
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

      const encryptedAmount = CryptoJS.AES.encrypt(amount, secretKey).toString();

      // Step 3: Sign the payload
      const payload = `${encryptedUserId}|${encryptedUserName}|${encryptedAmount}`;
      const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

      // Step 4: Construct the redirect URL
      // const redirectUrl = `https://www.jaisviksolutions.com/paynow?userId=${encodeURIComponent(
      const redirectUrl = `http://localhost:5174/paynow?userId=${encodeURIComponent(
        encryptedUserId
      )}&name=${encodeURIComponent(
        encryptedUserName
      )}&from=${encodeURIComponent(encryptedFrom)}&amount=${encodeURIComponent(encryptedAmount)}&signature=${signature}`;

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
  // Payment method options - Dynamic based on country
  const getPaymentMethods = () => {
    if (isIndian) {
      return [
        {
          id: "upi",
          label: "UPI Transfer",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          ),
          fullWidth: true,
        },
        {
          id: "bank",
          label: "Bank Transfer",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
        },
        ...(isPaymentGatewayActive
          ? [
              {
                id: "card",
                label: "Card Payment",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
              },
            ]
          : []),
      ];
    } else {
      // International users - PayPal
      return [
        {
          id: "paypal",
          label: "PayPal",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 fill-current">
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.023-.032.156a.804.804 0 0 1-.794.68h-2.52a.483.483 0 0 1-.477-.558l.955-6.055-.03.2a.801.801 0 0 1 .79-.929h1.665c3.647 0 6.5-1.482 7.33-5.768.037-.188.068-.371.095-.55.448-2.857-.013-4.8-1.534-6.5l-.002-.003a.806.806 0 0 1 .118.058z" />
              <path d="M9.414 2.505c.036-.2.27-.381.535-.381h6.8c.748 0 1.453.041 2.103.128.182.028.364.062.545.101.728.162 1.401.417 2 .776 1.189 1.099 1.492 2.75 1.1 4.8-.213 1.097-.581 2.066-1.128 2.9a5.847 5.847 0 0 1-1.547 1.628c-.16.11-.33.21-.504.302-.1.05-.2.1-.3.147-.145.071-.294.137-.445.197-.13.054-.264.103-.4.15-.465.16-.96.28-1.482.364-.5.08-1.031.133-1.583.16-.154.008-.309.012-.463.014h-5.45a.963.963 0 0 0-.952.8l-1.278 8.124a.567.567 0 0 1-.562.475H2.14a.477.477 0 0 1-.472-.55l3.006-19.066a.797.797 0 0 1 .784-.68h3.956v.011z" />
            </svg>
          ),
          fullWidth: true,
        },
      ];
    }
  };

  const paymentMethods = getPaymentMethods();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dffcf5] to-[#ebfffc] py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
      <div className="container max-w-8xl mx-auto">
        {/* Payment Method Selection */}
        <div className={`grid ${isIndian ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 max-w-md mx-auto'} gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6`}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onChangePaymentMode(method.id)}
              className={`${method.fullWidth && isIndian ? "col-span-2 sm:col-span-1" : "col-span-1"} 
                relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                selectedMethod === method.id
                  ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg scale-[1.02]"
                  : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-200"
              }`}
            >
              <div className="p-3 sm:p-4 flex flex-col items-center text-center space-y-1.5">
                <div
                  className={`p-2 sm:p-2.5 rounded-full transition-all ${
                    selectedMethod === method.id ? "bg-white/20" : "bg-teal-50"
                  }`}
                >
                  <span className={selectedMethod === method.id ? "text-white" : "text-teal-600"}>
                    {method.icon}
                  </span>
                </div>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    selectedMethod === method.id ? "text-white" : "text-gray-700"
                  }`}
                >
                  {method.label}
                </span>
              </div>
              <div
                className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 transition-opacity ${
                  selectedMethod === method.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* UPI Payment - Indian Users */}
        {selectedMethod === "upi" && isIndian && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
              <h2 className="text-sm sm:text-base font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                UPI Payment
              </h2>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Left Column - UPI Details & QR */}
                <div className="space-y-3 sm:space-y-4">
                  {/* UPI IDs */}
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-3 sm:p-4 border border-teal-100">
                    <h3 className="text-teal-700 font-medium mb-3 flex items-center text-xs sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      UPI Payment Details
                    </h3>

                    <div className="space-y-2.5">
                      {/* Primary UPI */}
                      <div>
                        <p className="text-xs text-teal-600 mb-1 font-medium">Primary UPI ID</p>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-3 py-2 pr-10 bg-white/80 border border-teal-100 rounded-lg text-teal-700 font-medium text-xs sm:text-sm"
                            value={defaultFormData.upiId}
                            readOnly
                          />
                          <button
                            onClick={handleCopy}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-500 text-white p-1.5 rounded-md transition-all"
                          >
                            {copied ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Secondary UPI */}
                      <div>
                        <p className="text-xs text-teal-600 mb-1 font-medium">Secondary UPI ID</p>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full px-3 py-2 pr-10 bg-white/80 border border-teal-100 rounded-lg text-teal-700 font-medium text-xs sm:text-sm"
                            value={defaultFormData.secondUpiId}
                            readOnly
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(defaultFormData.secondUpiId);
                              toast.success("UPI ID copied!");
                              setCopiedSecondUpi(true);
                              setTimeout(() => setCopiedSecondUpi(false), 2000);
                            }}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-500 text-white p-1.5 rounded-md transition-all"
                          >
                            {copiedSecondUpi ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 flex flex-col items-center">
                    <div className="relative mb-3 bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-lg">
                      <div className="border-2 border-teal-100 rounded-lg bg-white">
                        <img src={scan} className="h-32 w-32 sm:h-40 sm:w-40 object-contain" alt="QR Code" />
                      </div>
                    </div>
                    <p className="text-center text-gray-700 font-medium mb-2 text-xs sm:text-sm">
                      Jaisvik Software Solutions Pvt Ltd.
                    </p>
                    <button
                      onClick={handleDownload}
                      className="flex items-center text-teal-600 font-medium px-3 py-1.5 rounded-lg hover:bg-teal-50 text-xs transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download QR
                    </button>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                    <h3 className="text-gray-800 font-medium mb-3 flex items-center text-xs sm:text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Transaction Details
                    </h3>

                    <div className="space-y-3">
                      {/* Transaction ID */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Transaction ID</label>
                        <input
                          type="text"
                          className={`w-full px-3 py-2 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm ${
                            errors.transactionId ? "border-red-400" : "border-gray-200"
                          }`}
                          placeholder={!isTransactionIdRead ? "Autofill from screenshot" : "Enter transaction ID"}
                          value={formData.transactionId}
                          name="transactionId"
                          onChange={handleChange}
                          disabled={!isTransactionIdRead}
                        />
                        {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}
                      </div>

                      {/* Amount */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Amount (₹)</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 text-sm">₹</span>
                          </div>
                          <input
                            type="text"
                            className={`w-full pl-7 pr-3 py-2 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-xs sm:text-sm ${
                              errors.amount ? "border-red-400" : "border-gray-200"
                            }`}
                            placeholder="Enter amount"
                            value={formData.amount}
                            name="amount"
                            onChange={handleChange}
                          />
                        </div>
                        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                      </div>

                      {/* Screenshot */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Payment Screenshot</label>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.jfif"
                          className={`w-full px-3 py-1.5 bg-gray-50 border rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-teal-500 file:text-white file:cursor-pointer text-xs ${
                            errors.screenshot ? "border-red-400" : "border-gray-200"
                          }`}
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                        {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-xs sm:text-sm disabled:opacity-50"
                      >
                        {loading ? "Submitting..." : "Verify & Submit Payment"}
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-3 border border-blue-100">
                    <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Instructions
                    </h3>
                    <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
                      <li>Scan QR code with your UPI app</li>
                      <li>Complete the payment</li>
                      <li>Take a screenshot of confirmation</li>
                      <li>Fill in the transaction details above</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer - Indian Users */}
        {selectedMethod === "bank" && isIndian && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
              <h2 className="text-sm sm:text-base font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Bank Transfer
              </h2>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-3 sm:p-4 mb-4 border border-blue-100">
                  <h3 className="text-teal-700 font-medium mb-3 flex items-center text-xs sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Bank Account Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Account Holder", value: formData.bankAccountHolderName, copyValue: defaultFormData.bankAccountHolderName },
                      { label: "Account Number", value: formData.bankAccountNumber, copyValue: defaultFormData.bankAccountNumber },
                      { label: "IFSC Code", value: formData.bankIfscCode, copyValue: defaultFormData.bankIfscCode },
                      { label: "Bank Name", value: formData.bankName, copyValue: defaultFormData.bankName },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/60 hover:bg-white p-2.5 rounded-lg transition-all">
                        <p className="text-xs text-teal-700 font-medium mb-1">{item.label}</p>
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-gray-800 font-medium text-xs sm:text-sm break-all">{item.value}</p>
                          <CopyToClipboardButton
                            textToCopy={item.copyValue}
                            className="text-teal-600 hover:text-teal-700 bg-white p-1.5 rounded-lg shadow-sm shrink-0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Warning */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border-l-4 border-yellow-400">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div className="ml-2">
                        <h3 className="text-xs font-medium text-yellow-800">Important Note</h3>
                        <p className="mt-1 text-xs text-yellow-700">
                          Include your registered email/phone in remarks for faster processing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 border border-blue-100">
                    <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Transfer Instructions
                    </h3>
                    <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
                      <li>Log in to your bank's app/website</li>
                      <li>Add as new beneficiary</li>
                      <li>Enter the account details above</li>
                      <li>Complete transfer & note reference</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Payment - Indian Users */}
        {selectedMethod === "card" && isIndian && isPaymentGatewayActive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Payment Form */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                <h2 className="text-sm sm:text-base font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Card Payment
                </h2>
              </div>

              <div className="p-3 sm:p-4">
                {/* Security Info */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 mb-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-medium text-xs">Secure Payment Processing</h3>
                      <p className="text-xs text-gray-600">256-bit SSL encryption</p>
                    </div>
                  </div>

                  <div className="space-y-1 ml-2">
                    {["Major debit & credit cards accepted", "Instant account credit after payment"].map((text, idx) => (
                      <div key={idx} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-gray-600">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Logos */}
                <div className="flex justify-center gap-2 mb-4">
                  {["Visa", "Mastercard", "RuPay"].map((card) => (
                    <div key={card} className="bg-white rounded-md p-1.5 shadow-sm border border-gray-100">
                      <div className="w-8 h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded flex items-center justify-center">
                        <span className="text-[8px] text-gray-500 font-medium">{card}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Amount Input */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Amount (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium">₹</span>
                    </div>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value.replace(/[^0-9.]/g, ""));
                        setErrors((prev) => ({ ...prev, amount: "" }));
                      }}
                      className={`w-full pl-7 pr-3 py-2.5 bg-gray-50 border rounded-lg transition-all focus:ring-2 focus:ring-teal-500 text-sm ${
                        errors.amount ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="Min ₹15,000"
                    />
                  </div>
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                </div>

                <button
                  onClick={onClickAddMoney}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Proceed to Secure Payment
                </button>
              </div>
            </div>

            {/* Card Info Display */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-50 border-b">
                <h3 className="font-medium text-gray-800 flex items-center text-xs sm:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Card Information
                </h3>
              </div>

              <div className="p-3 sm:p-4">
                {/* Credit Card UI */}
                <div className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl p-4 shadow-lg mb-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mt-6 -mr-6" />

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md" />
                      <div className="h-5 w-5 rounded-full bg-white/80" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>

                  <div className="mb-4">
                    <p className="text-teal-200 text-xs mb-1">Card Number</p>
                    <p className="text-white text-base tracking-widest font-medium">•••• •••• •••• ••••</p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-teal-200 text-xs mb-1">Card Holder</p>
                      <p className="text-white font-medium text-sm">JAIMAX COIN</p>
                    </div>
                    <div>
                      <p className="text-teal-200 text-xs mb-1">Expires</p>
                      <p className="text-white font-medium text-sm">05/28</p>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Security Features
                    </h4>
                    <ul className="space-y-1">
                      {["3D Secure authentication", "PCI-DSS compliant processing"].map((text, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-600 mr-1.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs text-gray-700">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Warning */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border-l-4 border-yellow-400">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div className="ml-2">
                        <h3 className="text-xs font-medium text-yellow-800">Important Note</h3>
                        <p className="mt-1 text-xs text-yellow-700">For high amounts, ensure your card has sufficient limit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PayPal Payment - International Users */}
        {selectedMethod === "paypal" && !isIndian && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.023-.032.156a.804.804 0 0 1-.794.68h-2.52a.483.483 0 0 1-.477-.558l.955-6.055-.03.2a.801.801 0 0 1 .79-.929h1.665c3.647 0 6.5-1.482 7.33-5.768.037-.188.068-.371.095-.55.448-2.857-.013-4.8-1.534-6.5l-.002-.003a.806.806 0 0 1 .118.058z" />
                    <path d="M9.414 2.505c.036-.2.27-.381.535-.381h6.8c.748 0 1.453.041 2.103.128.182.028.364.062.545.101.728.162 1.401.417 2 .776 1.189 1.099 1.492 2.75 1.1 4.8-.213 1.097-.581 2.066-1.128 2.9a5.847 5.847 0 0 1-1.547 1.628c-.16.11-.33.21-.504.302-.1.05-.2.1-.3.147-.145.071-.294.137-.445.197-.13.054-.264.103-.4.15-.465.16-.96.28-1.482.364-.5.08-1.031.133-1.583.16-.154.008-.309.012-.463.014h-5.45a.963.963 0 0 0-.952.8l-1.278 8.124a.567.567 0 0 1-.562.475H2.14a.477.477 0 0 1-.472-.55l3.006-19.066a.797.797 0 0 1 .784-.68h3.956v.011z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">PayPal Payment</h2>
                  <p className="text-blue-100 text-xs sm:text-sm">Secure international payment</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Security Badge */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4 border border-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm text-green-700 font-medium">256-bit SSL Encrypted Payment</span>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
                <div className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-blue-800 font-medium text-sm">Secure International Payment</p>
                    <p className="text-blue-600 text-xs mt-1">
                      Pay securely using your PayPal account or credit/debit card through PayPal's secure gateway.
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-700 font-medium mb-2">
                  Enter Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                  <input
                    type="text"
                    className={`w-full pl-8 pr-4 py-3 text-lg font-semibold border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      paypalError ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                {paypalError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {paypalError}
                  </p>
                )}
              </div>

              {/* Transaction Summary */}
              {isProceed && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                  <h3 className="text-gray-800 font-semibold mb-3 flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Transaction Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 text-sm">Amount:</span>
                      <span className="font-bold text-gray-800">${amount}.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 text-sm">Processing Fee ({transactionPercentageValue}%):</span>
                      <span className="font-bold text-gray-800">${calculateTransactionFee().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-semibold text-gray-800">Total Amount:</span>
                      <span className="font-bold text-blue-600 text-xl">${(calculateTransactionFee() + +amount).toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-3">
                    Note: A processing fee of {transactionPercentageValue}% applies to cover payment gateway charges.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {isProceed ? (
                  <button
                    onClick={addMoneyThroughPaypal}
                    disabled={loading}
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current">
                          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.023-.032.156a.804.804 0 0 1-.794.68h-2.52a.483.483 0 0 1-.477-.558l.955-6.055-.03.2a.801.801 0 0 1 .79-.929h1.665c3.647 0 6.5-1.482 7.33-5.768.037-.188.068-.371.095-.55.448-2.857-.013-4.8-1.534-6.5l-.002-.003a.806.806 0 0 1 .118.058z" />
                        </svg>
                        Pay with PayPal
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={proceedPaypalAddMoney}
                    disabled={!amount || loading}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    Calculate Total
                  </button>
                )}
              </div>

              {/* Footer Note */}
              <div className="mt-4 bg-gray-100 p-3 rounded-lg flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-gray-600">
                  You'll be redirected to PayPal's secure checkout page. No PayPal account is required - you can pay with your credit or debit card.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loader */}
      {(isLoading || loading) && <Loader />}
    </div>
  );
};  

export default AddMoneyToWallet;



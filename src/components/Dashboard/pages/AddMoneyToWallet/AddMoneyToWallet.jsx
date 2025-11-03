import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import {toast} from "../../../../ReusableComponents/Toasts/Toasts";
import { useUserDataQuery } from "../../../Dashboard/pages/dashBoard/DashboardApliSlice";
import {
  useAddTransactionMutation,
  useCreatePaypalWalletOrderMutation,
  useTransferAvailableBalanceMutation,
} from "../wallet/walletApiSlice";
import Tesseract from "tesseract.js";
import scan from "../../../../assets/Images/SignUp/newQr.jpg";
import bhumi from "../../../../assets/Images/SignUp/bhumi.png";
import socialMedia from "../../../../assets/Images/SignUp/scanners.svg";
import CopyToClipboardButton from "../../../../ReusableComponents/CopyToClipboard";
import Loader from "../../../../ReusableComponents/Loader/loader";
import CryptoJS from "crypto-js";
import { useGetActivePaymentGatewayQuery } from "./AddMoneyApiSlice";
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

  const [selectedOption, setSelectedOption] = useState("upi"); // "upi" | "cards" | "bank"
  const [selectedUpiId, setSelectedUpiId] = useState("primary");
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
  // At the top of your component function
  const [Method, setMethod] = useState("upi");
  const isPaymentGatewayActive =
    activePaymentGateway?.data?.length > 0 &&
    activePaymentGateway.data[0].isActive;
  const countryCode = userData?.data?.countryCode;
  const transactionPercentageValue = 3;
  const [copied, setCopied] = useState(false);
  const [copiedSecondUpi, setCopiedSecondUpi] = useState(false);
  const [amount, setAmount] = useState();
  const [transferAmount, setTransferAmount] = useState();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [isProceed, setIsProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(defaultFormData.upiId);
    toast.success("UPI ID copied!");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 0);
  };
  // Function to toggle between UPI IDs
  const toggleUpiId = (id) => {
    setSelectedUpiId(id);
  };
  const onChangeMode = (method) => {
    setMethod(method);
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
            

            // Clean up the extracted text
            let cleanedText = text.replace(/¥/g, "₹");
           

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

           

            // Extract transaction ID
            let transactionID = null;
            let extractionMethod = "";

           
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
               
                break;
              }
            }

            // Method 1b: Line-by-line search for Transaction ID format
            if (!transactionID) {
            
              const lines = cleanedText.split(/\r?\n/);

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                // Look for "Transaction ID" and check next line
                if (
                  line.toLowerCase().includes("transaction id") &&
                  i + 1 < lines.length
                ) {
                  const nextLine = lines[i + 1].trim();
                  

                  // Extract first number from next line (like 080254518184 @ 6th Jun)
                  const numberMatch = nextLine.match(/^([0-9]{8,})/);
                  if (numberMatch) {
                    transactionID = numberMatch[1];
                    extractionMethod = "Transaction ID next line";
                    
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
               
              }
            }

            // Method 3: UTR/RRN/Reference patterns
            if (!transactionID) {
              // console.log("Trying Method 3 - UTR/RRN/Reference patterns...");

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
                 
                  break;
                }
              }
            }

            // Method 4: Line-by-line search for Kotak format
            if (!transactionID) {
              const lines = cleanedText.split(/\r?\n/);
              

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                // console.log(`Line ${i}: "${line}"`);

                // Look for Reference No. (UTR No./RRN) pattern
                if (
                  line.toLowerCase().includes("reference") &&
                  line.toLowerCase().includes("utr") &&
                  i + 1 < lines.length
                ) {
                  const nextLine = lines[i + 1].trim();
                  // console.log(`Found reference line at ${i}: "${line}"`);
                  // console.log(`Next line ${i + 1}: "${nextLine}"`);

                  // Check if next line is a number
                  const numberMatch = nextLine.match(/^([0-9]{10,})$/);
                  if (numberMatch) {
                    transactionID = numberMatch[1];
                    extractionMethod = "Kotak Reference No. next line";
                    
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
                
              }
            }

            // console.log("=== EXTRACTION RESULT ===");
            // console.log("Final transaction ID:", transactionID);
            // console.log("Extraction method:", extractionMethod);

            // Validation
            if (!paidToCorrectRecipient) {
              // console.log("❌ Recipient validation failed");
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
              // console.log("❌ Transaction ID not found");
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
            // console.log("=== OCR EXTRACTION END ===");
          })
          .catch((error) => {
            // console.error("Error during OCR:", error);
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

  // const onClickAddMoney = () => {
  //   try {
  //     // Step 1: Get and parse user data from localStorage
  //     const userDataRaw = Cookies.get("userData");
  //     // console.log(userDataRaw, "userDataRaw");
  //     if (!userDataRaw) {
  //       // console.error("User not found in localStorage");
  //       alert("User not logged in. Please login and try again.");
  //       return;
  //     }

  //     const userData = JSON.parse(userDataRaw);
  //     // console.log(userData, "userData");
  //     const userId = userData?._id;
  //     const name = userData?.name;

  //     if (!userId || !name) {
  //       // console.error("User data is incomplete");
  //       alert("User details are missing. Please contact support.");
  //       return;
  //     }

  //     // Step 2: Encrypt user data
  //     const secretKey = "6LfJPggqAAAAAKjkkCmWhGcHgvudxBl4519iceGa";
  //     const encryptedUserId = CryptoJS.AES.encrypt(
  //       userId,
  //       secretKey
  //     ).toString();
  //     const encryptedUserName = CryptoJS.AES.encrypt(
  //       name,
  //       secretKey
  //     ).toString();

  //     const encryptedFrom = CryptoJS.AES.encrypt(
  //       "website",
  //       secretKey
  //     ).toString();

  //     // Step 3: Sign the payload
  //     const payload = `${encryptedUserId}|${encryptedUserName}`;
  //     const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

  //     // Step 4: Construct the redirect URL
  //     const redirectUrl = `https://www.jaisviksolutions.com/paynow?userId=${encodeURIComponent(
  //       encryptedUserId
  //     )}&name=${encodeURIComponent(
  //       encryptedUserName
  //     )}&from=${encodeURIComponent(encryptedFrom)}&signature=${signature}`;

  //     // Step 5: Open the payment page in a new tab
  //     const paymentWindow = window.open(redirectUrl, "_blank");

  //     // Step 6: Check if popup was blocked
  //     if (
  //       !paymentWindow ||
  //       paymentWindow.closed ||
  //       typeof paymentWindow.closed === "undefined"
  //     ) {
  //       alert(
  //         "Popup blocked! Please allow popups for this site to proceed with payment."
  //       );
  //     } else {
  //       paymentWindow.focus(); // optional: bring the tab into focus
  //     }
  //   } catch (error) {
  //     // console.error("Error in onClickAddMoney:", error);
  //     alert("Something went wrong. Please try again or contact support.");
  //   }
  // };


   const onClickAddMoney = () => {
    try {
      // Step 1: Get and parse user data from localStorage
      const userDataRaw = Cookies.get("userData");
      // console.log(userDataRaw, "userDataRaw");
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

      const encryptedAmount = CryptoJS.AES.encrypt(amount, secretKey).toString();

      // Step 3: Sign the payload
      const payload = `${encryptedUserId}|${encryptedUserName}|${encryptedAmount}`;
      const signature = CryptoJS.HmacSHA256(payload, secretKey).toString();

      // Step 4: Construct the redirect URL
      const redirectUrl = `https://www.jaisviksolutions.com/paynow?userId=${encodeURIComponent(
      // const redirectUrl = `http://localhost:5174/paynow?userId=${encodeURIComponent(
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
  
  return (


    <div className="min-h-screen bg-gradient-to-b from-[#dffcf5] to-[#ebfffc] py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
  <div className="container max-w-7xl mx-auto">
    {/* Payment Method Selection - Responsive Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 animate__animated animate__fadeInUp">
      {/* UPI Option - Takes 2 columns on mobile, 1 on larger screens */}
      <div
        onClick={() => onChangePaymentMode("upi")}
        className={`col-span-2 sm:col-span-1 relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 group ${
          selectedMethod === "upi"
            ? "bg-gradient-to-r from-teal-600 to-teal-500  text-white shadow-md scale-100 transform"
            : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
        }`}
      >
        <div className="p-3 sm:p-4 md:p-5 flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <div
            className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 transform ${
              selectedMethod === "upi" ? "bg-white/20" : "bg-teal-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                selectedMethod === "upi" ? "text-white" : "text-teal-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </div>
          <span
            className={`text-sm sm:text-base md:text-lg rounded-xl font-medium ${
              selectedMethod === "upi" ? "text-white" : "text-gray-700"
            }`}
          >
            UPI Transfer
          </span>
        </div>
        <div
          className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
            selectedMethod === "upi" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        ></div>
      </div>

      {/* Bank Transfer - Takes 1 column */}
      <div
        onClick={() => onChangePaymentMode("bank")}
        className={`col-span-1 relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 group ${
          selectedMethod === "bank"
            ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
            : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
        }`}
      >
        <div className="p-3 sm:p-4 md:p-5 flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <div
            className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 transform ${
              selectedMethod === "bank" ? "bg-white/20" : "bg-teal-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                selectedMethod === "bank" ? "text-white" : "text-teal-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span
            className={`text-sm sm:text-base md:text-lg font-medium ${
              selectedMethod === "bank" ? "text-white" : "text-gray-700"
            }`}
          >
            Bank Transfer
          </span>
        </div>
        <div
          className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
            selectedMethod === "bank" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        ></div>
      </div>

      {/* Card Payment - Takes 1 column */}
      <div
        onClick={() => onChangePaymentMode("card")}
        className={`col-span-1 relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 group ${
          selectedMethod === "card"
            ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
            : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
        }`}
      >
        <div className="p-3 sm:p-4 md:p-5 flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <div
            className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 transform ${
              selectedMethod === "card" ? "bg-white/20" : "bg-teal-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                selectedMethod === "card" ? "text-white" : "text-teal-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <span
            className={`text-sm sm:text-base md:text-lg font-medium ${
              selectedMethod === "card" ? "text-white" : "text-gray-700"
            }`}
          >
            Card Payment
          </span>
        </div>
        <div
          className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
            selectedMethod === "card" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        ></div>
      </div>

      {/* Wallet Balance - COMMENTED OUT */}
      {/* <div
        onClick={() => onChangePaymentMode("others")}
        className={`col-span-1 relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 group ${
          selectedMethod === "others"
            ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
            : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
        }`}
      >
        <div className="p-3 sm:p-4 md:p-5 flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
          <div
            className={`p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 transform ${
              selectedMethod === "others" ? "bg-white/20" : "bg-teal-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                selectedMethod === "others" ? "text-white" : "text-teal-600"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span
            className={`text-sm sm:text-base md:text-lg font-medium ${
              selectedMethod === "others" ? "text-white" : "text-gray-700"
            }`}
          >
            Other Balance
          </span>
        </div>
        <div
          className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
            selectedMethod === "others" ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        ></div>
      </div> */}
    </div>

    {/* Payment Content */}
    <div className="animate__animated animate__fadeIn">
      {/* UPI Payment Method */}
      {selectedMethod === "upi" && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
          <div className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              UPI Payment
            </h2>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              {/* Left column */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-teal-100">
                  <h3 className="text-teal-700 font-medium mb-2 sm:mb-3 flex items-center text-xs sm:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    UPI Payment Details
                  </h3>

                  <div className="space-y-2 sm:space-y-2.5">
                    <div>
                      <p className="text-xs text-teal-600 mb-1 font-medium">
                        Primary UPI ID
                      </p>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-2 sm:px-2.5 py-1.5 sm:py-2 pr-8 sm:pr-10 bg-white/80 border border-teal-100 rounded-md sm:rounded-lg text-teal-700 font-medium text-xs"
                          value={defaultFormData.upiId}
                          readOnly
                        />
                        <button
                          onClick={handleCopy}
                          className="absolute right-1 sm:right-1.5 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-1 rounded-md transition-all duration-200 hover:bg-teal-500"
                        >
                          {copied ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-teal-600 mb-1 font-medium">
                        Secondary UPI ID
                      </p>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full px-2 sm:px-2.5 py-1.5 sm:py-2 pr-8 sm:pr-10 bg-white/80 border border-teal-100 rounded-md sm:rounded-lg text-teal-700 font-medium text-xs"
                          value={defaultFormData.secondUpiId}
                          readOnly
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              defaultFormData.secondUpiId
                            );
                            toast.success("UPI ID copied!");
                            setCopiedSecondUpi(true);
                            setTimeout(() => {
                              setCopiedSecondUpi(false);
                            }, 2000);
                          }}
                          className="absolute right-1 sm:right-1.5 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-1 rounded-md transition-all duration-200 hover:bg-teal-500"
                        >
                          {copiedSecondUpi ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 flex flex-col items-center">
                  <div className="relative mb-2 sm:mb-3 bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-lg">
                    <div className="border-2 border-teal-100 rounded-lg bg-white">
                      <img
                        src={scan}
                        className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain"
                        alt="QR Code"
                      />
                    </div>
                  </div>

                  <p className="text-center text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                    Jaisvik Software Solutions Pvt Ltd.
                  </p>
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center text-teal-600 font-medium transition-all px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-teal-50 text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download QR
                  </button>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Transaction Details Form */}
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                  <h3 className="text-gray-800 font-medium mb-2 sm:mb-3 flex items-center text-xs sm:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Transaction Details
                  </h3>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-2 sm:px-2.5 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg transition-all focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                        placeholder={
                          !isTransactionIdRead
                            ? "Autofill"
                            : "Enter transaction ID"
                        }
                        value={formData.transactionId}
                        name="transactionId"
                        onChange={handleChange}
                        disabled={!isTransactionIdRead}
                      />
                      {errors.transactionId && (
                        <p className="text-red-500 text-xs mt-1 animate-pulse">
                          {errors.transactionId}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">
                        Amount (₹)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2.5">
                          <span className="text-gray-500 text-xs">₹</span>
                        </div>
                        <input
                          type="text"
                          className="w-full pl-5 sm:pl-6 px-2 sm:px-2.5 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg transition-all focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
                          placeholder="Enter amount"
                          value={formData.amount}
                          name="amount"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-red-500 text-xs mt-1 animate-pulse">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">
                        Payment Screenshot
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.jfif"
                          className="w-full px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gray-50 border border-gray-200 rounded-md sm:rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-teal-500 file:text-white text-xs"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                        {errors.screenshot && (
                          <p className="text-red-500 text-xs mt-1 animate-pulse">
                            {errors.screenshot}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2 sm:py-2.5 px-4 rounded-md sm:rounded-lg shadow-sm transition-all duration-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      Verify & Submit Payment
                    </button>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-sm border border-blue-100">
                  <h3 className="text-blue-700 font-medium mb-1.5 sm:mb-2 flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Payment Instructions
                  </h3>
                  <ol className="space-y-1 text-xs text-gray-600 pl-4 sm:pl-5 list-decimal">
                    <li className="transition-all duration-200 hover:translate-x-1">
                      Scan the QR code with your UPI app
                    </li>
                    <li className="transition-all duration-200 hover:translate-x-1">
                      Enter the amount and complete the payment
                    </li>
                    <li className="transition-all duration-200 hover:translate-x-1">
                      Take a screenshot of the payment confirmation
                    </li>
                    <li className="transition-all duration-200 hover:translate-x-1">
                      Fill in the transaction details in the form
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer Method */}
      {selectedMethod === "bank" && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
          <div className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Bank Transfer
            </h2>
          </div>

          <div className="p-3 sm:p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm border border-blue-100">
                <h3 className="text-teal-700 font-medium mb-2 sm:mb-3 flex items-center text-xs sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Bank Account Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
                    <p className="text-xs text-teal-700 font-medium mb-1">
                      Account Holder
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-gray-800 font-medium text-xs sm:text-sm break-all">
                        {formData.bankAccountHolderName}
                      </p>
                      <CopyToClipboardButton
                        textToCopy={defaultFormData.bankAccountHolderName}
                        className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </CopyToClipboardButton>
                    </div>
                  </div>

                  <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
                    <p className="text-xs text-teal-700 font-medium mb-1">
                      Account Number
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-gray-800 font-medium text-xs sm:text-sm">
                        {formData.bankAccountNumber}
                      </p>
                      <CopyToClipboardButton
                        textToCopy={defaultFormData.bankAccountNumber}
                        className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </CopyToClipboardButton>
                    </div>
                  </div>

                  <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
                    <p className="text-xs text-teal-700 font-medium mb-1">
                      IFSC Code
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-gray-800 font-medium text-xs sm:text-sm">
                        {formData.bankIfscCode}
                      </p>
                      <CopyToClipboardButton
                        textToCopy={defaultFormData.bankIfscCode}
                        className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </CopyToClipboardButton>
                    </div>
                  </div>

                  <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
                    <p className="text-xs text-teal-700 font-medium mb-1">
                      Bank Name
                    </p>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-gray-800 font-medium text-xs sm:text-sm">
                        {formData.bankName}
                      </p>
                      <CopyToClipboardButton
                        textToCopy={defaultFormData.bankName}
                        className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </CopyToClipboardButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-2.5 sm:p-3 border-l-4 border-yellow-400">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <h3 className="text-xs font-medium text-yellow-800">
                        Important Note
                      </h3>
                      <p className="mt-1 text-xs text-yellow-700">
                        Please include your registered email/phone in the
                        transaction remarks for faster processing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-2.5 sm:p-3 shadow-sm border border-blue-100">
                  <h3 className="text-blue-700 font-medium mb-1.5 sm:mb-2 flex items-center text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Transfer Instructions
                  </h3>
                  <ol className="space-y-1 text-xs text-gray-600 pl-4 sm:pl-5 list-decimal">
                    <li>Log in to your bank's website or mobile app</li>
                    <li>Choose "Add Beneficiary" or "New Payee" option</li>
                    <li>Enter the account details shown above</li>
                    <li>Complete the transfer and note the reference number</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* Card Payment Method - More compact */}
          {selectedMethod === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Card Payment Info */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
                  <h2 className="text-base sm:text-lg font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Card Payment
                  </h2>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 mb-3 shadow-sm border border-blue-100">
                    <div className="flex items-center mb-2 gap-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-800 font-medium text-xs">Secure Payment Processing</h3>
                        <p className="text-xs text-gray-600">Protected with industry-standard encryption</p>
                      </div>
                    </div>

                    <div className="space-y-1 ml-1.5">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-gray-600">Major debit & credit cards accepted</p>
                      </div>

                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-600 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs text-gray-600">Instant account credit after payment</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                    <div className="bg-white rounded-md p-1 shadow-sm border border-gray-100">
                      <svg className="h-4 w-6" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" fill="white" />
                        <path d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" fill="#FFB600" />
                        <path d="M24 37.125C31.2487 37.125 37.125 31.2487 37.125 24C37.125 16.7513 31.2487 10.875 24 10.875C16.7513 10.875 10.875 16.7513 10.875 24C10.875 31.2487 16.7513 37.125 24 37.125Z" fill="#F7981D" />
                        <path d="M24 37.125C31.2487 37.125 37.125 31.2487 37.125 24C37.125 16.7513 31.2487 10.875 24 10.875C16.7513 10.875 10.875 16.7513 10.875 24C10.875 31.2487 16.7513 37.125 24 37.125Z" fill="#FF8500" />
                        <path d="M19.6875 24C19.6875 31.2487 24 37.125 24 37.125C16.7513 37.125 10.875 31.2487 10.875 24C10.875 16.7513 16.7513 10.875 24 10.875C24 10.875 19.6875 16.7513 19.6875 24Z" fill="#FF5050" />
                        <path d="M24 10.875C24 10.875 28.3125 16.7513 28.3125 24C28.3125 31.2487 24 37.125 24 37.125C31.2487 37.125 37.125 31.2487 37.125 24C37.125 16.7513 31.2487 10.875 24 10.875Z" fill="#E79800" />
                      </svg>
                    </div>
                    {/* Other card logos (simplified) */}
                    <div className="bg-white rounded-md p-1 shadow-sm border border-gray-100">
                      <svg className="h-4 w-6" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" fill="white" />
                        <path d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z" fill="#0A2540" />
                      </svg>
                    </div>
                    <div className="bg-white rounded-md p-1 shadow-sm border border-gray-100">
                      <svg className="h-4 w-6" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" fill="white" />
                        <path d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z" fill="#1434CB" />
                      </svg>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs text-gray-600 mb-1 font-medium">
                      Amount (₹)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                        <span className="text-gray-500 font-medium">₹</span>
                      </div>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value.replace(/[^0-9.]/g, ""));
                          setErrors((prev) => ({ ...prev, amount: "" })); // clear while typing
                        }}
                        className={`w-full pl-6 px-3 py-2 bg-gray-50 border ${errors.amount ? "border-red-500" : "border-gray-200"
                          } rounded-lg transition-all focus:ring-1 focus:ring-teal-500 text-sm`}
                        placeholder="Enter amount"
                      />
                    </div>

                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.amount}</p>
                    )}
                  </div>


                  <button
                    onClick={onClickAddMoney}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all text-xs"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Proceed to Secure Payment
                    </div>
                  </button>
                </div>
              </div>

              {/* Card Information - More compact */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-100">
                  <h3 className="font-medium text-gray-800 flex items-center text-xs sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Card Information
                  </h3>
                </div>

                <div className="p-3 sm:p-4">
                  {/* Sample Credit Card UI - More compact */}
                  <div className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl p-3 shadow-lg mb-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mt-5 -mr-5"></div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mr-2 flex justify-center items-center overflow-hidden">
                          <div className="w-6 h-4 bg-yellow-200 rounded-md transform rotate-45 translate-y-3"></div>
                        </div>
                        <div className="h-4 w-4 rounded-full bg-white opacity-80"></div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>

                    <div className="mb-2">
                      <p className="text-teal-200 text-xs mb-0.5">Card Number</p>
                      <div className="flex justify-between">
                        <p className="text-white text-sm tracking-wider font-medium">•••• •••• •••• ••••</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-teal-200 text-xs mb-0.5">Card Holder</p>
                        <p className="text-white font-medium text-xs">JAIMAX COIN</p>
                      </div>
                      <div>
                        <p className="text-teal-200 text-xs mb-0.5">Expires</p>
                        <p className="text-white font-medium text-xs">05/72</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-2.5 shadow-sm border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Security Features
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-600 mr-1.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs text-gray-700">3D Secure authentication</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-teal-600 mr-1.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs text-gray-700">PCI-DSS compliant processing</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-2.5 border-l-3 border-yellow-400">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div className="ml-2">
                          <h3 className="text-xs font-medium text-yellow-800">Important Note</h3>
                          <p className="mt-1 text-xs text-yellow-700">For payments more amount, ensure your card has sufficient limit.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      {/* Wallet Balance Transfer Method - COMMENTED OUT */}
      {/* {selectedMethod === "others" && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto">
          <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 rounded-full p-2 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-teal-100">Available Balance</p>
                <div className="text-base sm:text-lg font-bold">
                  {countryCode === 91 ? "₹" : "$"}
                  {(+userData?.data?.Inr)?.toFixed(2)}
                </div>
                <p className="text-teal-100 text-xs">Referral + Super Bonus</p>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 sm:mb-1.5 text-xs sm:text-sm">
                  Enter Amount to Transfer <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-2.5">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">
                      {countryCode === 91 ? "₹" : "$"}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-6 sm:pl-7 pr-3 py-2 sm:py-2.5 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-md sm:rounded-lg text-gray-800 font-medium text-xs sm:text-sm transition-all focus:ring-1 focus:ring-teal-500 shadow-sm"
                    placeholder="0.00"
                    name="transferAmount"
                    value={transferAmount}
                    onChange={handleTransferAmountChange}
                  />
                </div>
                {othersError && (
                  <p className="text-red-500 text-xs mt-1 animate-pulse">
                    * {othersError}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-2.5 sm:p-3 shadow-sm border border-blue-100">
                <h3 className="font-medium text-teal-800 mb-1.5 sm:mb-2 flex items-center text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Transfer Benefits
                </h3>
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="flex items-start bg-white/60 p-1.5 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-600 mr-1 sm:mr-1.5 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-xs text-gray-700">
                      Note: Here you can withdraw from available balance to wallet
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onSubmitTransferMoney}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2 sm:py-2.5 rounded-md sm:rounded-lg shadow-sm transition-all text-xs"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Transfer Funds Now
                </div>
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  </div>

  {(isLoading || loading) && <Loader />}
</div>
    // <div className="min-h-screen bg-gradient-to-b from-[#dffcf5] to-[#ebfffc] py-8 px-3">
    //   <ToastContainer
    //     position="top-right"
    //     autoClose={3000}
    //     hideProgressBar={false}
    //     newestOnTop
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="colored"
    //   />
    //   <div className="container max-w-9xl mx-auto">
    //     {/* Payment Method Selection */}
    //     <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 animate__animated animate__fadeInUp">
    //       {/* UPI Option */}
    //       <div
    //         onClick={() => onChangePaymentMode("upi")}
    //         className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
    //           selectedMethod === "upi"
    //             ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
    //             : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
    //         }`}
    //       >
    //         <div className="p-2.5 sm:p-4 flex flex-col items-center text-center space-y-1.5">
    //           <div
    //             className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 transform ${
    //               selectedMethod === "upi" ? "bg-white/20" : "bg-teal-50"
    //             }`}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className={`h-5 w-5 sm:h-6 sm:w-6 ${
    //                 selectedMethod === "upi" ? "text-white" : "text-teal-600"
    //               }`}
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
    //               />
    //             </svg>
    //           </div>
    //           <span
    //             className={`text-xs sm:text-sm font-medium ${
    //               selectedMethod === "upi" ? "text-white" : "text-gray-700"
    //             }`}
    //           >
    //             UPI Transfer
    //           </span>
    //         </div>
    //         <div
    //           className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
    //             selectedMethod === "upi" ? "opacity-100" : "opacity-0"
    //           } transition-opacity duration-300`}
    //         ></div>
    //       </div>

    //       {/* Bank Transfer */}
    //       <div
    //         onClick={() => onChangePaymentMode("bank")}
    //         className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
    //           selectedMethod === "bank"
    //             ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
    //             : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
    //         }`}
    //       >
    //         <div className="p-2.5 sm:p-4 flex flex-col items-center text-center space-y-1.5">
    //           <div
    //             className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 transform ${
    //               selectedMethod === "bank" ? "bg-white/20" : "bg-teal-50"
    //             }`}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className={`h-5 w-5 sm:h-6 sm:w-6 ${
    //                 selectedMethod === "bank" ? "text-white" : "text-teal-600"
    //               }`}
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    //               />
    //             </svg>
    //           </div>
    //           <span
    //             className={`text-xs sm:text-sm font-medium ${
    //               selectedMethod === "bank" ? "text-white" : "text-gray-700"
    //             }`}
    //           >
    //             Bank Transfer
    //           </span>
    //         </div>
    //         <div
    //           className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
    //             selectedMethod === "bank" ? "opacity-100" : "opacity-0"
    //           } transition-opacity duration-300`}
    //         ></div>
    //       </div>

    //       {/* Card Payment */}
    //       <div
    //         onClick={() => onChangePaymentMode("card")}
    //         className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
    //           selectedMethod === "card"
    //             ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
    //             : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
    //         }`}
    //       >
    //         <div className="p-2.5 sm:p-4 flex flex-col items-center text-center space-y-1.5">
    //           <div
    //             className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 transform ${
    //               selectedMethod === "card" ? "bg-white/20" : "bg-teal-50"
    //             }`}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className={`h-5 w-5 sm:h-6 sm:w-6 ${
    //                 selectedMethod === "card" ? "text-white" : "text-teal-600"
    //               }`}
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    //               />
    //             </svg>
    //           </div>
    //           <span
    //             className={`text-xs sm:text-sm font-medium ${
    //               selectedMethod === "card" ? "text-white" : "text-gray-700"
    //             }`}
    //           >
    //             Card Payment
    //           </span>
    //         </div>
    //         <div
    //           className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
    //             selectedMethod === "card" ? "opacity-100" : "opacity-0"
    //           } transition-opacity duration-300`}
    //         ></div>
    //       </div>

    //       {/* Wallet Balance */}
    //       <div
    //         onClick={() => onChangePaymentMode("others")}
    //         className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
    //           selectedMethod === "others"
    //             ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md scale-105 transform"
    //             : "bg-white hover:shadow-lg border border-gray-100 hover:border-teal-100"
    //         }`}
    //       >
    //         <div className="p-2.5 sm:p-4 flex flex-col items-center text-center space-y-1.5">
    //           <div
    //             className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 transform ${
    //               selectedMethod === "others" ? "bg-white/20" : "bg-teal-50"
    //             }`}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className={`h-5 w-5 sm:h-6 sm:w-6 ${
    //                 selectedMethod === "others" ? "text-white" : "text-teal-600"
    //               }`}
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    //               />
    //             </svg>
    //           </div>
    //           <span
    //             className={`text-xs sm:text-sm font-medium ${
    //               selectedMethod === "others" ? "text-white" : "text-gray-700"
    //             }`}
    //           >
    //             Other Balance
    //           </span>
    //         </div>
    //         <div
    //           className={`h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300 ${
    //             selectedMethod === "others" ? "opacity-100" : "opacity-0"
    //           } transition-opacity duration-300`}
    //         ></div>
    //       </div>
    //     </div>

    //     {/* Payment Content - Fixed with proper conditionals */}
    //     <div className="animate__animated animate__fadeIn">
    //       {/* UPI Payment Method */}
    //       {selectedMethod === "upi" && (
    //         <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
    //           <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
    //             <h2 className="text-base sm:text-lg font-semibold flex items-center">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-5 w-5 mr-2"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
    //                 />
    //               </svg>
    //               UPI Payment
    //             </h2>
    //           </div>

    //           <div className="p-3 sm:p-5">
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
    //               {/* Left column */}
    //               <div className="space-y-4">
    //                 <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-3 sm:p-4 shadow-sm border border-teal-100">
    //                   <h3 className="text-teal-700 font-medium mb-3 flex items-center text-sm">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-4 w-4 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                       />
    //                     </svg>
    //                     UPI Payment Details
    //                   </h3>

    //                   <div className="space-y-2.5">
    //                     <div>
    //                       <p className="text-xs text-teal-600 mb-1 font-medium">
    //                         Primary UPI ID
    //                       </p>
    //                       <div className="relative">
    //                         <input
    //                           type="text"
    //                           className="w-full px-2.5 py-2 pr-10 bg-white/80 border border-teal-100 rounded-lg text-teal-700 font-medium text-xs"
    //                           value={defaultFormData.upiId}
    //                           readOnly
    //                         />
    //                         <button
    //                           onClick={handleCopy}
    //                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-1 rounded-md transition-all duration-200 hover:bg-teal-500"
    //                         >
    //                           {copied ? (
    //                             <svg
    //                               xmlns="http://www.w3.org/2000/svg"
    //                               className="h-3.5 w-3.5"
    //                               fill="none"
    //                               viewBox="0 0 24 24"
    //                               stroke="currentColor"
    //                             >
    //                               <path
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth={2}
    //                                 d="M5 13l4 4L19 7"
    //                               />
    //                             </svg>
    //                           ) : (
    //                             <svg
    //                               xmlns="http://www.w3.org/2000/svg"
    //                               className="h-3.5 w-3.5"
    //                               fill="none"
    //                               viewBox="0 0 24 24"
    //                               stroke="currentColor"
    //                             >
    //                               <path
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth={2}
    //                                 d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    //                               />
    //                             </svg>
    //                           )}
    //                         </button>
    //                       </div>
    //                     </div>

    //                     <div>
    //                       <p className="text-xs text-teal-600 mb-1 font-medium">
    //                         Secondary UPI ID
    //                       </p>
    //                       <div className="relative">
    //                         <input
    //                           type="text"
    //                           className="w-full px-2.5 py-2 pr-10 bg-white/80 border border-teal-100 rounded-lg text-teal-700 font-medium text-xs"
    //                           value={defaultFormData.secondUpiId}
    //                           readOnly
    //                         />
    //                         <button
    //                           onClick={() => {
    //                             navigator.clipboard.writeText(
    //                               defaultFormData.secondUpiId
    //                             );
    //                             toast.success("UPI ID copied!");
    //                             setCopiedSecondUpi(true);

    //                             // Reset after 2 seconds
    //                             setTimeout(() => {
    //                               setCopiedSecondUpi(false);
    //                             }, 2000);
    //                           }}
    //                           className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-teal-600 text-white p-1 rounded-md transition-all duration-200 hover:bg-teal-500"
    //                         >
    //                           {copiedSecondUpi ? (
    //                             <svg
    //                               xmlns="http://www.w3.org/2000/svg"
    //                               className="h-3.5 w-3.5"
    //                               fill="none"
    //                               viewBox="0 0 24 24"
    //                               stroke="currentColor"
    //                             >
    //                               <path
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth={2}
    //                                 d="M5 13l4 4L19 7"
    //                               />
    //                             </svg>
    //                           ) : (
    //                             <svg
    //                               xmlns="http://www.w3.org/2000/svg"
    //                               className="h-3.5 w-3.5"
    //                               fill="none"
    //                               viewBox="0 0 24 24"
    //                               stroke="currentColor"
    //                             >
    //                               <path
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth={2}
    //                                 d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    //                               />
    //                             </svg>
    //                           )}
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 {/* QR Code - Compact version */}
    //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 flex flex-col items-center">
    //                   <div className="relative mb-3 bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-lg">
    //                     <div className="border-2 border-teal-100 rounded-lg bg-white">
    //                       <img
    //                         src={scan}
    //                         className="h-32 w-32 sm:h-40 sm:w-40 object-contain"
    //                         alt="QR Code"
    //                       />
    //                     </div>
                       
    //                   </div>

    //                   <p className="text-center text-gray-700 font-medium mb-2 text-xs sm:text-sm">
    //                     Jaisvik Software Solutions Pvt Ltd.
    //                   </p>
    //                   <button
    //                     onClick={handleDownload}
    //                     className="flex items-center justify-center text-teal-600 font-medium transition-all px-3 py-1.5 rounded-lg hover:bg-teal-50 text-xs"
    //                   >
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-3.5 w-3.5 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    //                       />
    //                     </svg>
    //                     Download QR Code
    //                   </button>
    //                 </div>
    //               </div>

    //               {/* Right column */}
    //               <div className="space-y-4">
    //                 {/* Transaction Details Form - More compact */}
    //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
    //                   <h3 className="text-gray-800 font-medium mb-3 flex items-center text-sm">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-4 w-4 mr-1.5 text-teal-600"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    //                       />
    //                     </svg>
    //                     Transaction Details
    //                   </h3>

    //                   <div className="space-y-3">
    //                     <div>
    //                       <label className="block text-xs text-gray-600 mb-1 font-medium">
    //                         Transaction ID
    //                       </label>
    //                       <input
    //                         type="text"
    //                         className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg transition-all focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
    //                         placeholder={
    //                           !isTransactionIdRead
    //                             ? "Autofill"
    //                             : "Enter transaction ID"
    //                         }
    //                         value={formData.transactionId}
    //                         name="transactionId"
    //                         onChange={handleChange}
    //                         disabled={!isTransactionIdRead}
    //                       />
    //                       {errors.transactionId && (
    //                         <p className="text-red-500 text-xs mt-1 animate-pulse">
    //                           {errors.transactionId}
    //                         </p>
    //                       )}
    //                     </div>

    //                     <div>
    //                       <label className="block text-xs text-gray-600 mb-1 font-medium">
    //                         Amount (₹)
    //                       </label>
    //                       <div className="relative">
    //                         <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
    //                           <span className="text-gray-500 text-xs">₹</span>
    //                         </div>
    //                         <input
    //                           type="text"
    //                           className="w-full pl-6 px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg transition-all focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-xs"
    //                           placeholder="Enter amount"
    //                           value={formData.amount}
    //                           name="amount"
    //                           onChange={handleChange}
    //                         />
    //                       </div>
    //                       {errors.amount && (
    //                         <p className="text-red-500 text-xs mt-1 animate-pulse">
    //                           {errors.amount}
    //                         </p>
    //                       )}
    //                     </div>

    //                     <div>
    //                       <label className="block text-xs text-gray-600 mb-1 font-medium">
    //                         Payment Screenshot
    //                       </label>
    //                       <div className="relative">
    //                         <input
    //                           type="file"
    //                           accept=".jpg,.jpeg,.png,.jfif"
    //                           className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-teal-500 file:text-white text-xs"
    //                           onChange={handleImageChange}
    //                           ref={fileInputRef}
    //                         />
    //                         {errors.screenshot && (
    //                           <p className="text-red-500 text-xs mt-1 animate-pulse">
    //                             {errors.screenshot}
    //                           </p>
    //                         )}
    //                       </div>
    //                     </div>

    //                     <button
    //                       type="submit"
    //                       onClick={handleSubmit}
    //                       className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
    //                     >
    //                       Verify & Submit Payment
    //                     </button>
    //                   </div>
    //                 </div>

    //                 {/* Payment Instructions - More compact */}
    //                 <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-3 shadow-sm border border-blue-100">
    //                   <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs sm:text-sm">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-4 w-4 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                       />
    //                     </svg>
    //                     Payment Instructions
    //                   </h3>
    //                   <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
    //                     <li className="transition-all duration-200 hover:translate-x-1">
    //                       Scan the QR code with your UPI app
    //                     </li>
    //                     <li className="transition-all duration-200 hover:translate-x-1">
    //                       Enter the amount and complete the payment
    //                     </li>
    //                     <li className="transition-all duration-200 hover:translate-x-1">
    //                       Take a screenshot of the payment confirmation
    //                     </li>
    //                     <li className="transition-all duration-200 hover:translate-x-1">
    //                       Fill in the transaction details in the form
    //                     </li>
    //                   </ol>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Bank Transfer Method - Removed transaction form */}
    //       {selectedMethod === "bank" && (
    //         <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
    //           <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
    //             <h2 className="text-base sm:text-lg font-semibold flex items-center">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-5 w-5 mr-2"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    //                 />
    //               </svg>
    //               Bank Transfer
    //             </h2>
    //           </div>

    //           {/* Bank Account Details - More compact layout */}
    //           <div className="p-3 sm:p-5">
    //             <div className="max-w-3xl mx-auto">
    //               <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 mb-4 shadow-sm border border-blue-100">
    //                 <h3 className="text-teal-700 font-medium mb-3 flex items-center text-sm">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-4 w-4 mr-1.5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    //                     />
    //                   </svg>
    //                   Bank Account Details
    //                 </h3>

    //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    //                   <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
    //                     <p className="text-xs text-teal-700 font-medium">
    //                       Account Holder
    //                     </p>
    //                     <div className="flex justify-between items-center">
    //                       <p className="text-gray-800 font-medium text-sm">
    //                         {formData.bankAccountHolderName}
    //                       </p>
    //                       <CopyToClipboardButton
    //                         textToCopy={defaultFormData.bankAccountHolderName}
    //                         className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           className="h-3.5 w-3.5"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           stroke="currentColor"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth={2}
    //                             d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    //                           />
    //                         </svg>
    //                       </CopyToClipboardButton>
    //                     </div>
    //                   </div>

    //                   <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
    //                     <p className="text-xs text-teal-700 font-medium">
    //                       Account Number
    //                     </p>
    //                     <div className="flex justify-between items-center">
    //                       <p className="text-gray-800 font-medium text-sm">
    //                         {formData.bankAccountNumber}
    //                       </p>
    //                       <CopyToClipboardButton
    //                         textToCopy={defaultFormData.bankAccountNumber}
    //                         className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           className="h-3.5 w-3.5"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           stroke="currentColor"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth={2}
    //                             d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    //                           />
    //                         </svg>
    //                       </CopyToClipboardButton>
    //                     </div>
    //                   </div>

    //                   <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
    //                     <p className="text-xs text-teal-700 font-medium">
    //                       IFSC Code
    //                     </p>
    //                     <div className="flex justify-between items-center">
    //                       <p className="text-gray-800 font-medium text-sm">
    //                         {formData.bankIfscCode}
    //                       </p>
    //                       <CopyToClipboardButton
    //                         textToCopy={defaultFormData.bankIfscCode}
    //                         className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           className="h-3.5 w-3.5"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           stroke="currentColor"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth={2}
    //                             d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    //                           />
    //                         </svg>
    //                       </CopyToClipboardButton>
    //                     </div>
    //                   </div>

    //                   <div className="transition-all duration-300 hover:bg-white/60 p-2 rounded-lg">
    //                     <p className="text-xs text-teal-700 font-medium">
    //                       Bank Name
    //                     </p>
    //                     <div className="flex justify-between items-center">
    //                       <p className="text-gray-800 font-medium text-sm">
    //                         {formData.bankName}
    //                       </p>
    //                       <CopyToClipboardButton
    //                         textToCopy={defaultFormData.bankName}
    //                         className="text-teal-600 hover:text-teal-700 bg-white p-1 rounded-lg shadow-sm"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           className="h-3.5 w-3.5"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           stroke="currentColor"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             strokeWidth={2}
    //                             d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    //                           />
    //                         </svg>
    //                       </CopyToClipboardButton>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    //                 <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3 border-l-4 border-yellow-400">
    //                   <div className="flex items-start">
    //                     <div className="flex-shrink-0 mt-0.5">
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         className="h-4 w-4 text-yellow-600"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth={2}
    //                           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    //                         />
    //                       </svg>
    //                     </div>
    //                     <div className="ml-2">
    //                       <h3 className="text-xs font-medium text-yellow-800">
    //                         Important Note
    //                       </h3>
    //                       <p className="mt-1 text-xs text-yellow-700">
    //                         Please include your registered email/phone in the
    //                         transaction remarks for faster processing.
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 shadow-sm border border-blue-100">
    //                   <h3 className="text-blue-700 font-medium mb-2 flex items-center text-xs">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-4 w-4 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                       />
    //                     </svg>
    //                     Transfer Instructions
    //                   </h3>
    //                   <ol className="space-y-1 text-xs text-gray-600 pl-5 list-decimal">
    //                     <li>Log in to your bank's website or mobile app</li>
    //                     <li>Choose "Add Beneficiary" or "New Payee" option</li>
    //                     <li>Enter the account details shown above</li>
    //                     <li>
    //                       Complete the transfer and note the reference number
    //                     </li>
    //                   </ol>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Card Payment Method - More compact */}
    //       {selectedMethod === "card" && (
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
    //           {/* Card Payment Info */}
    //           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    //             <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
    //               <h2 className="text-base sm:text-lg font-semibold flex items-center">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="h-5 w-5 mr-2"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    //                   />
    //                 </svg>
    //                 Card Payment
    //               </h2>
    //             </div>

    //             <div className="p-3 sm:p-4">
    //               <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 mb-3 shadow-sm border border-blue-100">
    //                 <div className="flex items-center mb-2 gap-2">
    //                   <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-4 w-4 text-teal-600"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    //                       />
    //                     </svg>
    //                   </div>
    //                   <div>
    //                     <h3 className="text-gray-800 font-medium text-xs">
    //                       Secure Payment Processing
    //                     </h3>
    //                     <p className="text-xs text-gray-600">
    //                       Protected with industry-standard encryption
    //                     </p>
    //                   </div>
    //                 </div>

    //                 <div className="space-y-1 ml-1.5">
    //                   <div className="flex items-center">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-3.5 w-3.5 text-teal-600 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M5 13l4 4L19 7"
    //                       />
    //                     </svg>
    //                     <p className="text-xs text-gray-600">
    //                       Major debit & credit cards accepted
    //                     </p>
    //                   </div>

    //                   <div className="flex items-center">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-3.5 w-3.5 text-teal-600 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M5 13l4 4L19 7"
    //                       />
    //                     </svg>
    //                     <p className="text-xs text-gray-600">
    //                       Instant account credit after payment
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="flex flex-wrap justify-center gap-1.5 mb-3">
    //                 <div className="bg-white rounded-md p-1 shadow-sm border border-gray-100">
    //                   <svg className="h-4 w-6" viewBox="0 0 48 48" fill="none">
    //                     <rect width="48" height="48" fill="white" />
    //                     <path
    //                       d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
    //                       fill="#FFB600"
    //                     />
    //                     <path
    //                       d="M24 37.125C31.2487 37.125 37.125 31.2487 37.125 24C37.125 16.7513 31.2487 10.875 24 10.875C16.7513 10.875 10.875 16.7513 10.875 24C10.875 31.2487 16.7513 37.125 24 37.125Z"
    //                       fill="#F7981D"
    //                     />
    //                     <path
    //                       d="M24 37.125C31.2487 37.125 37.125 31.2487 37.125 24C37.125 16.7513 31.2487 10.875 24 10.875C16.7513 10.875 10.875 16.7513 10.875 24C10.875 31.2487 16.7513 37.125 24 37.125Z"
    //                       fill="#FF8500"
    //                     />
    //                     <path
    //                       d="M19.6875 24C19.6875 31.2487 24 37.125 24 37.125C16.7513 37.125 10.875 31.2487 10.875 24C10.875 16.7513 16.7513 10.875 24 10.875C24 10.875 19.6875 16.7513 19.6875 24Z"
    //                       fill="#FF5050"
    //                     />
    //                     <path
    //                       d="M24 10.875C24 10.875 28.3125 16.7513 28.3125 24C28.3125 31.2487 24 37.125 24 37.125C31.2487 37.125 37.125 31.2487 37.125 24C37.125 16.7513 31.2487 10.875 24 10.875Z"
    //                       fill="#E79800"
    //                     />
    //                   </svg>
    //                 </div>
    //                 {/* Other card logos (simplified) */}
    //                 <div className="bg-white rounded-md p-1 shadow-sm border border-gray-100">
    //                   <svg className="h-4 w-6" viewBox="0 0 48 48" fill="none">
    //                     <rect width="48" height="48" fill="white" />
    //                     <path
    //                       d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z"
    //                       fill="#0A2540"
    //                     />
    //                   </svg>
    //                 </div>
    //                 <div className="bg-white rounded-md p-1 shadow-sm border border-gray-100">
    //                   <svg className="h-4 w-6" viewBox="0 0 48 48" fill="none">
    //                     <rect width="48" height="48" fill="white" />
    //                     <path
    //                       d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z"
    //                       fill="#1434CB"
    //                     />
    //                   </svg>
    //                 </div>
    //               </div>

    //               <div className="mb-3">
    //                 <label className="block text-xs text-gray-600 mb-1 font-medium">
    //                   Amount (₹)
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
    //                     <span className="text-gray-500 font-medium">₹</span>
    //                   </div>
    //                   <input
    //                     type="text"
    //                     className="w-full pl-6 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg transition-all focus:ring-1 focus:ring-teal-500 text-sm"
    //                     placeholder="Enter amount"
    //                   />
    //                 </div>
    //               </div>

    //               <button
    //                 onClick={onClickAddMoney}
    //                 className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all text-xs"
    //               >
    //                 <div className="flex items-center justify-center">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-4 w-4 mr-1.5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    //                     />
    //                   </svg>
    //                   Proceed to Secure Payment
    //                 </div>
    //               </button>
    //             </div>
    //           </div>

    //           {/* Card Information - More compact */}
    //           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    //             <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-100">
    //               <h3 className="font-medium text-gray-800 flex items-center text-xs sm:text-sm">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="h-4 w-4 mr-1.5 text-teal-600"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    //                   />
    //                 </svg>
    //                 Card Information
    //               </h3>
    //             </div>

    //             <div className="p-3 sm:p-4">
    //               {/* Sample Credit Card UI - More compact */}
    //               <div className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl p-3 shadow-lg mb-3 relative overflow-hidden">
    //                 <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mt-5 -mr-5"></div>

    //                 <div className="flex justify-between items-center mb-4">
    //                   <div className="flex items-center">
    //                     <div className="w-8 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mr-2 flex justify-center items-center overflow-hidden">
    //                       <div className="w-6 h-4 bg-yellow-200 rounded-md transform rotate-45 translate-y-3"></div>
    //                     </div>
    //                     <div className="h-4 w-4 rounded-full bg-white opacity-80"></div>
    //                   </div>
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-5 w-5 text-white opacity-90"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
    //                     />
    //                   </svg>
    //                 </div>

    //                 <div className="mb-2">
    //                   <p className="text-teal-200 text-xs mb-0.5">
    //                     Card Number
    //                   </p>
    //                   <div className="flex justify-between">
    //                     <p className="text-white text-sm tracking-wider font-medium">
    //                       •••• •••• •••• ••••
    //                     </p>
    //                   </div>
    //                 </div>

    //                 <div className="flex justify-between items-end">
    //                   <div>
    //                     <p className="text-teal-200 text-xs mb-0.5">
    //                       Card Holder
    //                     </p>
    //                     <p className="text-white font-medium text-xs">
    //                       JAIMAX COIN
    //                     </p>
    //                   </div>
    //                   <div>
    //                     <p className="text-teal-200 text-xs mb-0.5">Expires</p>
    //                     <p className="text-white font-medium text-xs">05/72</p>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="space-y-3">
    //                 <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-2.5 shadow-sm border border-blue-100">
    //                   <h4 className="font-medium text-blue-800 mb-2 flex items-center text-xs">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-4 w-4 mr-1.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    //                       />
    //                     </svg>
    //                     Security Features
    //                   </h4>
    //                   <ul className="space-y-1">
    //                     <li className="flex items-start">
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         className="h-3.5 w-3.5 text-teal-600 mr-1.5 mt-0.5"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth={2}
    //                           d="M5 13l4 4L19 7"
    //                         />
    //                       </svg>
    //                       <span className="text-xs text-gray-700">
    //                         3D Secure authentication
    //                       </span>
    //                     </li>
    //                     <li className="flex items-start">
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         className="h-3.5 w-3.5 text-teal-600 mr-1.5 mt-0.5"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth={2}
    //                           d="M5 13l4 4L19 7"
    //                         />
    //                       </svg>
    //                       <span className="text-xs text-gray-700">
    //                         PCI-DSS compliant processing
    //                       </span>
    //                     </li>
    //                   </ul>
    //                 </div>

    //                 <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-2.5 border-l-3 border-yellow-400">
    //                   <div className="flex">
    //                     <div className="flex-shrink-0">
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         className="h-4 w-4 text-yellow-600"
    //                         fill="none"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth={2}
    //                           d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    //                         />
    //                       </svg>
    //                     </div>
    //                     <div className="ml-2">
    //                       <h3 className="text-xs font-medium text-yellow-800">
    //                         Important Note
    //                       </h3>
    //                       <p className="mt-1 text-xs text-yellow-700">
    //                         For payments above <strong>₹25,000</strong>, ensure
    //                         your card has sufficient limit.
    //                       </p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //       {/* Wallet Balance Transfer Method - More compact */}
    //       {selectedMethod === "others" && (
    //         <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto">
    //           <div className="p-3 sm:p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
    //             <div className="flex items-center gap-2">
    //               <div className="bg-white/20 rounded-full p-2 shadow-inner">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="h-5 w-5 text-white"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    //                   />
    //                 </svg>
    //               </div>
    //               <div>
    //                 <p className="text-xs text-teal-100">Available Balance</p>
    //                 <div className="text-lg font-bold">
    //                   {countryCode === 91 ? "₹" : "$"}
    //                   {(+userData?.data?.Inr)?.toFixed(2)}
    //                 </div>
    //                 <p className="text-teal-100 text-xs">
    //                   Referral + Super Bonus
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="p-3 sm:p-4">
    //             <div className="space-y-4">
    //               <div>
    //                 <label className="block text-gray-700 font-medium mb-1.5 text-sm">
    //                   Enter Amount to Transfer{" "}
    //                   <span className="text-red-500">*</span>
    //                 </label>
    //                 <div className="relative">
    //                   <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
    //                     <span className="text-gray-600 font-medium text-base">
    //                       {countryCode === 91 ? "₹" : "$"}
    //                     </span>
    //                   </div>
    //                   <input
    //                     type="text"
    //                     className="w-full pl-7 pr-3 py-2.5 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg text-gray-800 font-medium text-sm transition-all focus:ring-1 focus:ring-teal-500 shadow-sm"
    //                     placeholder="0.00"
    //                     name="transferAmount"
    //                     value={transferAmount}
    //                     onChange={handleTransferAmountChange}
    //                   />
    //                 </div>
    //                 {othersError && (
    //                   <p className="text-red-500 text-xs mt-1 animate-pulse">
    //                     * {othersError}
    //                   </p>
    //                 )}
    //               </div>

    //               <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 shadow-sm border border-blue-100">
    //                 <h3 className="font-medium text-teal-800 mb-2 flex items-center text-xs">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-4 w-4 mr-1.5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                     />
    //                   </svg>
    //                   Transfer Benefits
    //                 </h3>
    //                 <div className="space-y-1.5">
    //                   <div className="flex items-start bg-white/60 p-1.5 rounded-lg">
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       className="h-3.5 w-3.5 text-teal-600 mr-1.5 mt-0.5"
    //                       fill="none"
    //                       viewBox="0 0 24 24"
    //                       stroke="currentColor"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M5 13l4 4L19 7"
    //                       />
    //                     </svg>
    //                     <p className="text-xs text-gray-700">
    //                       Note: Here you can withdraw from available balance to
    //                       wallet
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>

    //               <button
    //                 type="button"
    //                 onClick={onSubmitTransferMoney}
    //                 className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all text-xs"
    //               >
    //                 <div className="flex items-center justify-center">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="h-4 w-4 mr-1.5"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    //                     />
    //                   </svg>
    //                   Transfer Funds Now
    //                 </div>
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {(isLoading || loading) && <Loader />}
    // </div>
  );
};

export default AddMoneyToWallet;

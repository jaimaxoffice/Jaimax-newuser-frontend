import ReactMarkdown from "react-markdown";

function ChatMessage({ message }) {
  return <ReactMarkdown>{message}</ReactMarkdown>;
}
import { useState, useEffect, useRef } from "react";

import {
  Trash2,
  XCircle,
  Mic,
  Paperclip,
  Smile,
  Send,
  MapPin,
  Loader2,
  MicOff,
} from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/jcoin.png";
// Language translations
const translations = {
  english: {
    // Header and Navigation
    supportTitle: " Jaimax Support",
    reset: " Reset",
    home: "🏠 Home",
    support: "💬 Support",
    helpAvailable: "24/7 Help Available",
    needMoreHelp: "Need more help? Visit our support page",
    contactSupport: "Contact Support",
    poweredBy: "Powered by Jaimax AI Assistant",

    // Chat Options
    chatOptions: {
      initial: {
        message: "Please choose an option, to begin with.",
        options: [
          "INR Deposits/ Withdrawals",
          "KYC/Bank Account",
          "Sign up and Login",
          "SuperBonus/ Referrals",
          "Crypto Deposits/Withdrawals",
          "Update Profile",
        ],
      },
      "Sign up and Login": {
        message: "Please choose one:",
        options: ["How to Sign Up?", "How to Login?", "what is your Issue?"],
      },
      "How to Sign Up?": {
        message: `
  To sign up:
  1. Visit our official site [www.jaimax.com](https://www.jaimax.com)
  2. Click on 'Register'
  3. Enter your details
  4. Verify via OTP
  5. You will be Registered in Jaimax!
  `,
        options: [],
      },
      "How to Login?": {
        message:
          "To login:\n1. Visit our official site [www.jaimax.com](https://www.jaimax.com) \n2. Click on 'Login'\n3. Enter your credentials\n4. Access your dashboard.",
        options: [],
      },
      "what is your Issue?": {
        message: "Select your issue:",
        options: ["OTP not received", "Password reset", "Account blocked"],
      },
      "OTP not received": {
        message:
          "If you did not receive the OTP:\n- Check your spam folder\n- Wait a minute and try again\n- Still not received? Contact support.",
        options: [],
      },
      "Password reset": {
        message:
          "To reset password:\n1.  Visit our official site [www.jaimax.com](https://www.jaimax.com) \n Click on 'Forgot Password' in login Page\n2. Enter your registered email\n3. Enter the Otp and Verify There \n4. Then Enter New Password \n5. Confirm the Password\n6. Submit it \n7. Your Password will Successfully Changed.",
        options: [],
      },
      "Account blocked": {
        message:
          "If your account is blocked due to failed attempts, please contact support to unlock it securely. [www.jaimax.com/support](https://www.jaimax.com/support)\n\nAfter visiting the support page, click **Create New**, enter your query, select the problem under priority, and submit. Our support team will reach out to you shortly.",
        options: [],
      },
      "INR Deposits/ Withdrawals": {
        message: "Please choose one:",
        options: ["INR Deposit", "INR Withdrawal", "Transaction Issues"],
      },
      "INR Deposit": {
        message: "Select deposit method:",
        options: [
          "UPI Deposit",
          "Bank Transfer",
          "Net Banking",
          "Deposit Limits",
        ],
      },
      "UPI Deposit": {
        message:
          "To deposit via UPI:\n" +
          "1. Go to the **Add Money** section\n" +
          "2. Scan the QR code shown on the screen and complete the transaction\n" +
          "3. Upload the transaction image, enter the transaction ID and amount\n" +
          "4. Submit the form\n" +
          "5. Our team will verify your payment and contact you if needed\n\n" +
          "**Reminder:** Do not upload fake or incorrect transaction details. Our team verifies all deposits, and accounts found submitting fake transactions will be blocked.",
        options: [],
      },

      "Bank Transfer": {
        message:
          "To deposit via Bank Transfer:\n" +
          "1. Go to the Add Money section\n" +
          "2. Transfer money to the bank details available on the screen\n" +
          "3. Upload the transaction screenshot, enter the transaction ID and amount\n" +
          "4. Submit the form\n" +
          "5. Our team will verify your payment and contact you if needed\n\n" +
          "**Reminder:** Do not upload fake or incorrect transaction details. Our team verifies all deposits, and accounts found submitting fake transactions will be blocked.",
        options: [],
      },

      "Net Banking": {
        message:
          "To deposit via Net Banking:\n" +
          "1. Go to the **Add Money** section\n" +
          "2. Complete the transaction to the bank details using Net Banking\n" +
          "3. Upload the payment screenshot and enter the transaction ID and amount\n" +
          "4. Submit the form\n" +
          "5. Our team will verify your payment and add funds to your wallet",
        options: [],
      },

      // "Deposit Limits": {
      //   message:
      //     "INR Deposit Limits:\n• Minimum: ₹100 per transaction\n• Maximum: ₹1,00,000 per transaction\n• Daily limit: ₹5,00,000\n• Monthly limit: ₹50,00,000\n\n*Limits may vary based on KYC verification level",
      //   options: [],
      // },
      "INR Withdrawal": {
        message: "Select withdrawal option:",
        options: ["How to Withdraw", "Withdrawal Limits", "Withdrawal Issues"],
      },
      "How to Withdraw": {
        message:
          "To withdraw INR:\n1. Go to 'Withdraw' section [www.jaimax.com/withdrawal](https://www.jaimax.com)\n2. Enter amount (min ₹500)\n3. Select your registered bank account\n4. Confirm withdrawal\n5. Processing time: 1-2   bussiness hours",
        options: [],
      },
      "Withdrawal Limits": {
        message:
          "INR Withdrawal Limits:\n• Minimum: ₹500 per transaction\n• Maximum: ₹50,000 per transaction\n• Daily limit: ₹2,00,000\n• Monthly limit: ₹25,00,000\n\n*Limits may vary based on KYC verification level",
        options: [],
      },
      "Withdrawal Issues": {
        message: "Select your withdrawal issue:",
        options: [
          "Withdrawal Pending",
          "Withdrawal Failed",
          "Wrong Bank Account",
        ],
      },
      "Withdrawal Pending": {
        message:
          "If your withdrawal is pending:\n- Normal processing time: 1-2  bussiness hours\n- Check bank details are correct\n- Contact support if pending for more than 3 days\n- Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Withdrawal Failed": {
        message:
          "If withdrawal failed:\n1. Check if bank account details are correct\n2. Ensure sufficient balance\n3. Amount will be refunded to your wallet\n4. Contact support for assistance\n5. Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Wrong Bank Account": {
        message:
          "If you selected wrong bank account:\n1. Contact support immediately\n2. Provide transaction ID\n3. We'll help cancel/redirect if possible\n4. Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Transaction Issues": {
        message: "Select your transaction issue:",
        options: [
          "Payment Failed",
          "Amount Deducted but not Credited",
          "Transaction History",
        ],
      },
      "Payment Failed": {
        message:
          "If payment failed:\n1. Check if amount was deducted from bank\n2. If deducted, wait 24-48 hours for auto-reversal\n3. If not reversed, contact support with transaction details\n4. Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Amount Deducted but not Credited": {
        message:
          "If amount deducted but not credited:\n1. Wait for 2-5 minutes (UPI) or 2-4 hours (Bank Transfer)\n2. Check your transaction history\n3. If still not credited after expected time, contact support\n4. Keep transaction receipt/screenshot ready\n5. Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Transaction History": {
        message:
          "To check transaction history:\n1. Login to your account\n2. Go to 'Transaction History' or 'My Account'\n3. Select date range\n4. Filter by transaction type (Deposit/Withdrawal)\n5. Download statement if needed",
        options: [],
      },
      "KYC/Bank Account": {
        message: "Please choose one:",
        options: [
          "KYC Verification",
          "Bank Account Management",
          "Document Issues",
        ],
      },
      "KYC Verification": {
        message: "Select KYC option:",
        options: [
          "How to Complete KYC",
          "KYC Status",
          "KYC Documents Required",
        ],
      },

      "How to Complete KYC": {
        message:
          "To complete KYC verification:\n" +
          "1. Login to your account\n" +
          "2. [www.jaimax.com/login](https://www.jaimax.com)\n" +
          "3. Go to the 'KYC' section\n" +
          "4. First, log in with **DigiLocker**\n" +
          "5. Upload the required documents\n" +
          "6. Once documents are uploaded, you **cannot edit them** until your KYC status is either **approved** or **rejected**\n" +
          "7. If Aadhaar and PAN numbers match, your KYC will be **automatically approved**\n" +
          "8. If they don’t match, it will be **manually approved** by our team\n" +
          "9. Fill in the personal details form\n" +
          "10. Submit for verification\n" +
          "11. Wait for approval ",
        options: [],
      },

      "KYC Status": {
        message:
          "To check KYC status:\n1. Login to your account\n2. Go to  'KYC' section\n3. View verification status\n\nStatus meanings:\n• Pending: Under review\n• Approved: Verified\n• Rejected: Resubmit documents",
        options: [],
      },
      "KYC Documents Required": {
        message:
          "Required KYC documents:\n1. 1.Identity Proof: Aadhaar/PAN/Passport/Driving License\n2. 2.Address Proof: Aadhaar cardt\n3. 3Bank Account Proof: enetr ur bank details\n4. 4.complete digilocker login  \n5.  5.upload your Selfie  \n\n*All documents should be clear and valid",
        options: [],
      },
      "Bank Account Management": {
        message: "Select bank account option:",
        options: ["Add Bank Account", "Update Bank Details"],
      },
      "Add Bank Account": {
        message:
          "To add bank account:\n1. Go to 'kyc' section\n2 Enter bank details (Account number, IFSC, Name)\n3.  Submit for verification\n3. Account will be verified",
        options: [],
      },
      "Update Bank Details": {
        message:
          "To update bank details:\n1. Go to 'kyc' section\n2. Provide new bank details\n3. click on update button",
        options: [],
      },
      // "Remove Bank Account": {
      //   message:
      //     "To remove bank account:\n1. Go to 'kyc' section\n2. Select account to remove\n3. Click 'Remove Account'\n4. Confirm action\n\n*Note: You need at least one verified account for withdrawals",
      //   options: [],
      // },
      "Document Issues": {
        message: "Select document issue:",
        options: [
          "Document Rejected",
          "Upload Issues",
          "Document Verification Pending",
        ],
      },
      "Document Rejected": {
        message:
          "If documents were rejected:\n1. Check rejection reason in notifications\n2. Ensure documents are clear and valid\n3. Upload new documents addressing the issue\n4. Common issues: Blurry image, expired documents, name mismatch\n5. Contact support if unclear about rejection  Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Upload Issues": {
        message:
          "If having upload issues:\n1. Check file format (JPG, PNG, PDF)\n2. File size should be under 5MB\n3. Ensure image is clear and readable\n4. Try different browser/device\n5. Contact support if problem persists  Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Document Verification Pending": {
        message:
          "If document verification is pending:\n• Normal processing time: 1 business days\n• Check for any notification/email\n• Ensure all required documents are uploaded\n• Contact support if pending for more than 1 days\n• Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "SuperBonus/ Referrals": {
        message: "Please choose one:",
        options: ["Referral Program", "Bonus Information", "Claim Issues"],
      },
      "Referral Program": {
        message: "Select referral option:",
        options: ["How to Refer", "Referral Rewards", "Track Referrals"],
      },
      "How to Refer": {
        message:
          "To refer friends:\n1. Go to 'Referral' section\n2. Copy your unique referral code/link\n3. Share with friends\n4. Friend signs up using your code\n5. Both get rewards when friend makes first deposit\n6. Track earnings in referral dashboard",
        options: [],
      },
      "Referral Rewards": {
        message:
          "Referral rewards:\n• You get: 10% of friend's first deposit as bonus\n• Friend gets: Welcome bonus on first deposit\n• Maximum referral bonus: ₹1000 per referral\n• Bonus credited instantly after friend's deposit\n• Minimum deposit for referral: ₹500",
        options: [],
      },
      "Track Referrals": {
        message:
          "To track referrals:\n1. Go to 'Referral' section\n2. View 'My Referrals' tab\n3. See referred users list\n4. Check earnings from each referral\n5. View total referral income\n6. Download referral statement",
        options: [],
      },
      "Bonus Information": {
        message: "Select bonus type:",
        options: ["Welcome Bonus", "Deposit Bonus", "Loyalty Bonus"],
      },
      "Welcome Bonus": {
        message:
          "Welcome Bonus details:\n• New users get 100% bonus on first deposit\n• Minimum deposit: ₹500\n• Maximum bonus: ₹5000\n• Wagering requirement: 5x\n• Valid for 30 days from registration",
        options: [],
      },
      "Deposit Bonus": {
        message:
          "Deposit Bonus details:\n• 50% bonus on deposits above ₹1000\n• Available on weekends\n• Maximum bonus: ₹2000 per deposit\n• Wagering requirement: 3x\n• Auto-credited on eligible deposits",
        options: [],
      },
      "Loyalty Bonus": {
        message:
          "Loyalty Bonus details:\n• Weekly loyalty bonus based on activity\n• Minimum 5 transactions required\n• Bonus percentage: 1-5% of weekly volume\n• Credited every Monday\n• No wagering requirement",
        options: [],
      },
      "Claim Issues": {
        message: "Select claim issue:",
        options: ["Bonus Not Credited", "Wagering Issues", "Bonus Expired"],
      },
      "Bonus Not Credited": {
        message:
          "If bonus not credited:\n1. Check if you meet eligibility criteria\n2. Verify deposit amount meets minimum\n3. Check bonus terms and conditions\n4. Wait for processing (up to 30 minutes)\n5. Contact support with deposit details if still not credited",
        options: [],
      },
      "Wagering Issues": {
        message:
          "About wagering requirements:\n• Must play bonus amount specified times\n• Only eligible games count towards wagering\n• Check 'Bonus' section for progress\n• Withdrawal restricted until wagering complete\n• Contact support for wagering queries",
        options: [],
      },
      "Bonus Expired": {
        message:
          "If bonus expired:\n• Check bonus validity period in terms\n• Expired bonuses cannot be restored\n• Future bonuses: Use within validity period\n• Set reminders for bonus expiry\n• Contact support for clarification on terms",
        options: [],
      },
      "Crypto Deposits/Withdrawals": {
        message: "Please choose one:",
        options: [
          "Crypto Deposit",
          "Crypto Withdrawal",
          "Supported Cryptocurrencies",
        ],
      },
      "Crypto Deposit": {
        message: "Select crypto deposit option:",
        options: [
          "How to Deposit Crypto",
          "Deposit Address",
          "Confirmation Time",
        ],
      },
      "How to Deposit Crypto": {
        message:
          "To deposit cryptocurrency:\n1. Go to 'Add Money' section\n2. Select 'Cryptocurrency'\n3. Choose your crypto (BTC/ETH/USDT)\n4. Copy deposit address\n5. Send crypto to the address\n6. Wait for network confirmations\n7. Funds credited after confirmations",
        options: [],
      },
      "Deposit Address": {
        message:
          "About deposit addresses:\n• Each crypto has unique deposit address\n• Always copy address correctly\n• Don't send wrong crypto to address\n• Address may change for security\n• Always use latest address from platform\n• Double-check before sending",
        options: [],
      },
      "Confirmation Time": {
        message:
          "Network confirmation times:\n• Bitcoin (BTC): 2-3 confirmations (20-30 min)\n• Ethereum (ETH): 12 confirmations (3-5 min)\n• USDT (TRC20): 1 confirmation (1-3 min)\n• USDT (ERC20): 12 confirmations (3-5 min)\n\n*Times may vary based on network congestion",
        options: [],
      },
      "Crypto Withdrawal": {
        message: "Select crypto withdrawal option:",
        options: [
          "How to Withdraw Crypto",
          "Withdrawal Fees",
          "Processing Time",
        ],
      },
      "How to Withdraw Crypto": {
        message:
          "To withdraw cryptocurrency:\n1. Go to 'Withdraw' section\n2. Select 'Cryptocurrency'\n3. Choose crypto and network\n4. Enter recipient address\n5. Enter amount\n6. Verify details and confirm\n7. Complete 2FA verification",
        options: [],
      },
      "Withdrawal Fees": {
        message:
          "Crypto withdrawal fees:\n• Bitcoin (BTC): 0.0005 BTC\n• Ethereum (ETH): 0.01 ETH\n• USDT (TRC20): 1 USDT\n• USDT (ERC20): 5 USDT\n\n*Fees may change based on network conditions\n*Check current fees before withdrawal",
        options: [],
      },
      "Processing Time": {
        message:
          "Crypto withdrawal processing:\n• Internal processing: 10-30 minutes\n• Network confirmation: Varies by crypto\n• Total time: 30 minutes to 2 hours\n• Check transaction on blockchain explorer\n• Contact support if delayed beyond expected time",
        options: [],
      },
      "Supported Cryptocurrencies": {
        message:
          "Supported cryptocurrencies:\n• Bitcoin (BTC)\n• Ethereum (ETH)\n• Tether USDT (TRC20)\n• Tether USDT (ERC20)\n• More coins being added regularly\n\n*Always select correct network when depositing/withdrawing",
        options: [],
      },
      "Update Profile": {
        message: "Please choose one:",
        options: [
          "Personal Information",
          "Contact Details",
          "Security Settings",
        ],
      },
      "Personal Information": {
        message: "Select what to update:",
        options: ["Name Change", "Date of Birth", "Address Update"],
      },
      "Name Change": {
        message:
          "To change name:\n1. Contact support (cannot be changed directly)\n2. Provide legal documents for name change\n3. Submit name change request\n4. Verification required\n5. Visit [www.jaimax.com/support](https://www.jaimax.com/support)\n\n*Name must match KYC documents",
        options: [],
      },
      "Date of Birth": {
        message:
          "To update date of birth:\n1. Contact support (cannot be changed directly)\n2. Provide valid ID proof with correct DOB\n3. Explain reason for change\n4. Verification required\n5. Visit [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },
      "Address Update": {
        message:
          "To update address:\n1. Go to 'Profile' section\n2. Click 'Edit Address'\n3. Enter new address details\n4. Upload address proof document\n5. Submit for verification\n6. Update processed in 1-2 business days",
        options: [],
      },
      "Contact Details": {
        message: "Select contact detail to update:",
        options: ["Email Update", "Phone Number", "Communication Preferences"],
      },
      "Email Update": {
        message:
          "To update email:\n1. Go to 'Profile' section\n2. Click 'Change Email'\n3. Enter new email address\n4. Verify current password\n5. Confirm via OTP to old email\n6. Verify new email with OTP\n7. Email updated successfully",
        options: [],
      },
      "Phone Number": {
        message:
          "To update phone number:\n1. Go to 'Profile' section\n2. Click 'Change Phone'\n3. Enter new phone number\n4. Verify current password\n5. Confirm via OTP to old number\n6. Verify new number with OTP\n7. Phone updated successfully",
        options: [],
      },
      "Communication Preferences": {
        message:
          "To update communication preferences:\n1. Go to 'Settings' section\n2. Select 'Notifications'\n3. Choose email/SMS preferences\n4. Select notification types\n5. Save preferences\n\nOptions: Promotions, Transactions, Security alerts, Updates",
        options: [],
      },
      "Security Settings": {
        message: "Select security option:",
        options: [
          "Two-Factor Authentication",
          "Password Change",
          "Login Alerts",
        ],
      },
      "Two-Factor Authentication": {
        message:
          "To enable 2FA:\n1. Go to 'Security' section\n2. Click 'Enable 2FA'\n3. Download authenticator app\n4. Scan QR code with app\n5. Enter verification code\n6. Save backup codes safely\n7. 2FA enabled successfully",
        options: [],
      },
      "Password Change": {
        message:
          "To change password:\n1. Go to 'Security' section\n2. Click 'Change Password'\n3. Enter current password\n4. Enter new password\n5. Confirm new password\n6. Complete 2FA if enabled\n7. Password changed successfully",
        options: [],
      },
      "Login Alerts": {
        message:
          "To manage login alerts:\n1. Go to 'Security' section\n2. Select 'Login Alerts'\n3. Enable/disable email notifications\n4. Enable/disable SMS notifications\n5. Set alert preferences\n6. Save settings\n\n*Recommended to keep enabled for security",
        options: [],
      },
    },
  },

  hindi: {
    supportTitle: " जैमैक्स सहायता",
    website: " वेबसाइट",
    reset: "🔄 रीसेट",
    home: "🏠 होम",
    support: "💬 सहायता",
    helpAvailable: "24/7 सहायता उपलब्ध",
    needMoreHelp: "अधिक सहायता चाहिए? हमारे सहायता पृष्ठ पर जाएं",
    contactSupport: "सहायता संपर्क करें",
    poweredBy: "जैमैक्स एआई असिस्टेंट द्वारा संचालित",

    chatOptions: {
      initial: {
        message: "कृपया शुरू करने के लिए एक विकल्प चुनें।",
        options: [
          "INR जमा/निकासी",
          "KYC/बैंक खाता",
          "साइन अप और लॉगिन",
          "सुपरबोनस/रेफरल",
          "क्रिप्टो जमा/निकासी",
          "प्रोफाइल अपडेट करें",
        ],
      },

      "साइन अप और लॉगिन": {
        message: "कृपया एक चुनें:",
        options: [
          "साइन अप कैसे करें?",
          "लॉगिन कैसे करें?",
          "आपकी समस्या क्या है?",
        ],
      },

      "साइन अप कैसे करें?": {
        message: `
साइन अप करने के लिए:
1. हमारी आधिकारिक साइट [www.jaimax.com](https://www.jaimax.com) पर जाएं
2. 'रजिस्टर' पर क्लिक करें
3. अपनी जानकारी दर्ज करें
4. OTP के माध्यम से सत्यापित करें
5. आप जैमैक्स में पंजीकृत हो जाएंगे!
`,
        options: [],
      },

      "लॉगिन कैसे करें?": {
        message:
          "लॉगिन करने के लिए:\n1. हमारी आधिकारिक साइट [www.jaimax.com](https://www.jaimax.com) पर जाएं\n2. 'लॉगिन' पर क्लिक करें\n3. अपनी लॉगिन जानकारी दर्ज करें\n4. अपने डैशबोर्ड तक पहुंचें।",
        options: [],
      },

      "आपकी समस्या क्या है?": {
        message: "अपनी समस्या चुनें:",
        options: ["OTP नहीं मिला", "पासवर्ड रीसेट", "खाता ब्लॉक"],
      },

      "OTP नहीं मिला": {
        message:
          "यदि आपको OTP नहीं मिला:\n- अपने स्पैम फोल्डर की जांच करें\n- एक मिनट प्रतीक्षा करें और फिर कोशिश करें\n- फिर भी नहीं मिला? सहायता से संपर्क करें।",
        options: [],
      },

      "पासवर्ड रीसेट": {
        message:
          "पासवर्ड रीसेट करने के लिए:\n1. हमारी आधिकारिक साइट [www.jaimax.com](https://www.jaimax.com) पर जाएं\n2. लॉगिन पेज में 'पासवर्ड भूल गए' पर क्लिक करें\n3. अपना पंजीकृत ईमेल दर्ज करें\n4. OTP दर्ज करें और सत्यापित करें\n5. फिर नया पासवर्ड दर्ज करें\n6. पासवर्ड की पुष्टि करें\n7. इसे सबमिट करें\n8. आपका पासवर्ड सफलतापूर्वक बदल जाएगा।",
        options: [],
      },

      "खाता ब्लॉक": {
        message:
          "यदि आपका खाता असफल प्रयासों के कारण ब्लॉक हो गया है, तो कृपया इसे सुरक्षित रूप से अनलॉक करने के लिए सहायता से संपर्क करें। [www.jaimax.com/support](https://www.jaimax.com/support)\n\nसहायता पृष्ठ पर जाने के बाद, **नया टिकट बनाएं** पर क्लिक करें, अपना प्रश्न दर्ज करें, प्राथमिकता के तहत समस्या का चयन करें और सबमिट करें। हमारी सहायता टीम जल्द ही आपसे संपर्क करेगी।",
        options: [],
      },

      "INR जमा/निकासी": {
        message: "कृपया एक चुनें:",
        options: ["INR जमा", "INR निकासी", "लेनदेन समस्याएं"],
      },

      "INR जमा": {
        message: "जमा विधि चुनें:",
        options: ["UPI जमा", "बैंक ट्रांसफर", "नेट बैंकिंग", "जमा सीमा"],
      },

      "UPI जमा": {
        message:
          "UPI के माध्यम से जमा करने के लिए:\n" +
          "1. **पैसे जोड़ें** अनुभाग में जाएं\n" +
          "2. स्क्रीन पर दिखाए गए QR कोड को स्कैन करें और लेनदेन पूरा करें\n" +
          "3. लेनदेन की तस्वीर अपलोड करें, लेनदेन ID और राशि दर्ज करें\n" +
          "4. फॉर्म सबमिट करें\n" +
          "5. हमारी टीम आपके भुगतान की पुष्टि करेगी और आवश्यकता होने पर आपसे संपर्क करेगी\n\n" +
          "**अनुस्मारक:** नकली या गलत लेनदेन विवरण अपलोड न करें। हमारी टीम सभी जमा राशि की जांच करती है, और नकली लेनदेन जमा करने वाले खाते ब्लॉक कर दिए जाएंगे।",
        options: [],
      },

      "बैंक ट्रांसफर": {
        message:
          "बैंक ट्रांसफर के माध्यम से जमा करने के लिए:\n" +
          "1. पैसे जोड़ें अनुभाग में जाएं\n" +
          "2. स्क्रीन पर उपलब्ध बैंक विवरणों में पैसे ट्रांसफर करें\n" +
          "3. लेनदेन का स्क्रीनशॉट अपलोड करें, लेनदेन ID और राशि दर्ज करें\n" +
          "4. फॉर्म सबमिट करें\n" +
          "5. हमारी टीम आपके भुगतान की पुष्टि करेगी और आवश्यकता होने पर आपसे संपर्क करेगी\n\n" +
          "**अनुस्मारक:** नकली या गलत लेनदेन विवरण अपलोड न करें। हमारी टीम सभी जमा राशि की जांच करती है, और नकली लेनदेन जमा करने वाले खाते ब्लॉक कर दिए जाएंगे।",
        options: [],
      },

      "नेट बैंकिंग": {
        message:
          "नेट बैंकिंग के माध्यम से जमा करने के लिए:\n" +
          "1. **पैसे जोड़ें** अनुभाग में जाएं\n" +
          "2. नेट बैंकिंग का उपयोग करके बैंक विवरणों में लेनदेन पूरा करें\n" +
          "3. भुगतान का स्क्रीनशॉट अपलोड करें और लेनदेन ID और राशि दर्ज करें\n" +
          "4. फॉर्म सबमिट करें\n" +
          "5. हमारी टीम आपके भुगतान की पुष्टि करेगी और आपके वॉलेट में फंड जोड़ देगी",
        options: [],
      },

      "INR निकासी": {
        message: "निकासी विकल्प चुनें:",
        options: ["निकासी कैसे करें", "निकासी सीमा", "निकासी समस्याएं"],
      },

      "निकासी कैसे करें": {
        message:
          "INR निकालने के लिए:\n1. 'निकासी' अनुभाग में जाएं [www.jaimax.com/withdrawal](https://www.jaimax.com)\n2. राशि दर्ज करें (न्यूनतम ₹500)\n3. अपना पंजीकृत बैंक खाता चुनें\n4. निकासी की पुष्टि करें\n5. प्रसंस्करण समय: 1-2 व्यापारिक घंटे",
        options: [],
      },

      "निकासी सीमा": {
        message:
          "INR निकासी सीमा:\n• न्यूनतम: ₹500 प्रति लेनदेन\n• अधिकतम: ₹50,000 प्रति लेनदेन\n• दैनिक सीमा: ₹2,00,000\n• मासिक सीमा: ₹25,00,000\n\n*सीमा KYC सत्यापन स्तर के आधार पर भिन्न हो सकती है",
        options: [],
      },

      "निकासी समस्याएं": {
        message: "अपनी निकासी समस्या चुनें:",
        options: ["निकासी लंबित", "निकासी असफल", "गलत बैंक खाता"],
      },

      "निकासी लंबित": {
        message:
          "यदि आपकी निकासी लंबित है:\n- सामान्य प्रसंस्करण समय: 1-2 व्यापारिक घंटे\n- जांचें कि बैंक विवरण सही हैं\n- यदि 3 दिन से अधिक लंबित है तो सहायता से संपर्क करें\n- [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "निकासी असफल": {
        message:
          "यदि निकासी असफल हुई:\n1. जांचें कि बैंक खाता विवरण सही हैं\n2. पर्याप्त बैलेंस सुनिश्चित करें\n3. राशि आपके वॉलेट में वापस कर दी जाएगी\n4. सहायता के लिए संपर्क करें\n5. [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "गलत बैंक खाता": {
        message:
          "यदि आपने गलत बैंक खाता चुना:\n1. तुरंत सहायता से संपर्क करें\n2. लेनदेन ID प्रदान करें\n3. हम संभव होने पर रद्द/रीडायरेक्ट करने में मदद करेंगे\n4. [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "लेनदेन समस्याएं": {
        message: "अपनी लेनदेन समस्या चुनें:",
        options: [
          "भुगतान असफल",
          "राशि कट गई लेकिन जमा नहीं हुई",
          "लेनदेन इतिहास",
        ],
      },

      "भुगतान असफल": {
        message:
          "यदि भुगतान असफल हुआ:\n1. जांचें कि बैंक से राशि कटी है या नहीं\n2. यदि कटी है, तो ऑटो-रिवर्सल के लिए 24-48 घंटे प्रतीक्षा करें\n3. यदि वापस नहीं हुई, तो लेनदेन विवरण के साथ सहायता से संपर्क करें\n4. [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "राशि कट गई लेकिन जमा नहीं हुई": {
        message:
          "यदि राशि कट गई लेकिन जमा नहीं हुई:\n1. 2-5 मिनट (UPI) या 2-4 घंटे (बैंक ट्रांसफर) प्रतीक्षा करें\n2. अपने लेनदेन इतिहास की जांच करें\n3. अपेक्षित समय के बाद भी जमा नहीं हुई तो सहायता से संपर्क करें\n4. लेनदेन रसीद/स्क्रीनशॉट तैयार रखें\n5. [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "लेनदेन इतिहास": {
        message:
          "लेनदेन इतिहास जांचने के लिए:\n1. अपने खाते में लॉगिन करें\n2. 'लेनदेन इतिहास' या 'मेरा खाता' में जाएं\n3. दिनांक सीमा चुनें\n4. लेनदेन प्रकार के अनुसार फिल्टर करें (जमा/निकासी)\n5. आवश्यक होने पर स्टेटमेंट डाउनलोड करें",
        options: [],
      },

      "KYC/बैंक खाता": {
        message: "कृपया एक चुनें:",
        options: ["KYC सत्यापन", "बैंक खाता प्रबंधन", "दस्तावेज़ समस्याएं"],
      },

      "KYC सत्यापन": {
        message: "KYC विकल्प चुनें:",
        options: ["KYC कैसे पूरा करें", "KYC स्थिति", "KYC दस्तावेज़ आवश्यक"],
      },

      "KYC कैसे पूरा करें": {
        message:
          "KYC सत्यापन पूरा करने के लिए:\n" +
          "1. अपने खाते में लॉगिन करें\n" +
          "2. [www.jaimax.com/login](https://www.jaimax.com)\n" +
          "3. 'KYC' अनुभाग में जाएं\n" +
          "4. पहले, **DigiLocker** के साथ लॉगिन करें\n" +
          "5. आवश्यक दस्तावेज़ अपलोड करें\n" +
          "6. एक बार दस्तावेज़ अपलोड होने के बाद, आप उन्हें तब तक **संपादित नहीं कर सकते** जब तक आपकी KYC स्थिति **अनुमोदित** या **अस्वीकृत** नहीं हो जाती\n" +
          "7. यदि आधार और PAN नंबर मेल खाते हैं, तो आपकी KYC **स्वचालित रूप से अनुमोदित** हो जाएगी\n" +
          "8. यदि वे मेल नहीं खाते, तो इसे हमारी टीम द्वारा **मैन्युअल रूप से अनुमोदित** किया जाएगा\n" +
          "9. व्यक्तिगत विवरण फॉर्म भरें\n" +
          "10. सत्यापन के लिए सबमिट करें\n" +
          "11. अनुमोदन की प्रतीक्षा करें",
        options: [],
      },

      "KYC स्थिति": {
        message:
          "KYC स्थिति जांचने के लिए:\n1. अपने खाते में लॉगिन करें\n2. 'KYC' अनुभाग में जाएं\n3. सत्यापन स्थिति देखें\n\nस्थिति के अर्थ:\n• लंबित: समीक्षाधीन\n• अनुमोदित: सत्यापित\n• अस्वीकृत: दस्तावेज़ फिर से जमा करें",
        options: [],
      },

      "KYC दस्तावेज़ आवश्यक": {
        message:
          "आवश्यक KYC दस्तावेज़:\n1. पहचान प्रमाण: आधार/PAN/पासपोर्ट/ड्राइविंग लाइसेंस\n2. पता प्रमाण: आधार कार्ड\n3. बैंक खाता प्रमाण: अपने बैंक विवरण दर्ज करें\n4. DigiLocker लॉगिन पूरा करें\n5. अपनी सेल्फी अपलोड करें\n\n*सभी दस्तावेज़ स्पष्ट और वैध होने चाहिए",
        options: [],
      },

      "बैंक खाता प्रबंधन": {
        message: "बैंक खाता विकल्प चुनें:",
        options: ["बैंक खाता जोड़ें", "बैंक विवरण अपडेट करें"],
      },

      "बैंक खाता जोड़ें": {
        message:
          "बैंक खाता जोड़ने के लिए:\n1. 'KYC' अनुभाग में जाएं\n2. बैंक विवरण दर्ज करें (खाता संख्या, IFSC, नाम)\n3. सत्यापन के लिए सबमिट करें\n4. खाता सत्यापित हो जाएगा",
        options: [],
      },

      "बैंक विवरण अपडेट करें": {
        message:
          "बैंक विवरण अपडेट करने के लिए:\n1. 'KYC' अनुभाग में जाएं\n2. नए बैंक विवरण प्रदान करें\n3. अपडेट बटन पर क्लिक करें",
        options: [],
      },

      "दस्तावेज़ समस्याएं": {
        message: "दस्तावेज़ समस्या चुनें:",
        options: [
          "दस्तावेज़ अस्वीकृत",
          "अपलोड समस्याएं",
          "दस्तावेज़ सत्यापन लंबित",
        ],
      },

      "दस्तावेज़ अस्वीकृत": {
        message:
          "यदि दस्तावेज़ अस्वीकृत हुए:\n1. नोटिफिकेशन में अस्वीकृति का कारण जांचें\n2. सुनिश्चित करें कि दस्तावेज़ स्पष्ट और वैध हैं\n3. समस्या को संबोधित करते हुए नए दस्तावेज़ अपलोड करें\n4. सामान्य समस्याएं: धुंधली तस्वीर, समाप्त हुए दस्तावेज़, नाम में बेमेल\n5. अस्वीकृति के बारे में अस्पष्टता होने पर सहायता से संपर्क करें [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },

      "अपलोड समस्याएं": {
        message:
          "यदि अपलोड समस्याएं हैं:\n1. फाइल फॉर्मेट जांचें (JPG, PNG, PDF)\n2. फाइल साइज़ 5MB से कम होना चाहिए\n3. सुनिश्चित करें कि तस्वीर स्पष्ट और पढ़ने योग्य है\n4. अलग ब्राउज़र/डिवाइस आज़माएं\n5. समस्या बनी रहने पर सहायता से संपर्क करें [www.jaimax.com/support](https://www.jaimax.com/support)",
        options: [],
      },

      "दस्तावेज़ सत्यापन लंबित": {
        message:
          "यदि दस्तावेज़ सत्यापन लंबित है:\n• सामान्य प्रसंस्करण समय: 1 व्यापारिक दिन\n• किसी नोटिफिकेशन/ईमेल की जांच करें\n• सुनिश्चित करें कि सभी आवश्यक दस्तावेज़ अपलोड हैं\n• 1 दिन से अधिक लंबित होने पर सहायता से संपर्क करें\n• [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "सुपरबोनस/रेफरल": {
        message: "कृपया एक चुनें:",
        options: ["रेफरल प्रोग्राम", "बोनस जानकारी", "क्लेम समस्याएं"],
      },

      "रेफरल प्रोग्राम": {
        message: "रेफरल विकल्प चुनें:",
        options: ["रेफर कैसे करें", "रेफरल रिवार्ड", "रेफरल ट्रैक करें"],
      },

      "रेफर कैसे करें": {
        message:
          "दोस्तों को रेफर करने के लिए:\n1. 'रेफरल' अनुभाग में जाएं\n2. अपना अनूठा रेफरल कोड/लिंक कॉपी करें\n3. दोस्तों के साथ साझा करें\n4. दोस्त आपके कोड का उपयोग करके साइन अप करे\n5. दोस्त के पहली जमा पर दोनों को रिवार्ड मिलते हैं\n6. रेफरल डैशबोर्ड में कमाई ट्रैक करें",
        options: [],
      },

      "रेफरल रिवार्ड": {
        message:
          "रेफरल रिवार्ड:\n• आपको मिलता है: दोस्त की पहली जमा का 10% बोनस के रूप में\n• दोस्त को मिलता है: पहली जमा पर वेलकम बोनस\n• अधिकतम रेफरल बोनस: ₹1000 प्रति रेफरल\n• दोस्त की जमा के बाद बोनस तुरंत जमा\n• रेफरल के लिए न्यूनतम जमा: ₹500",
        options: [],
      },

      "रेफरल ट्रैक करें": {
        message:
          "रेफरल ट्रैक करने के लिए:\n1. 'रेफरल' अनुभाग में जाएं\n2. 'मेरे रेफरल' टैब देखें\n3. रेफर किए गए यूज़र्स की सूची देखें\n4. प्रत्येक रेफरल से कमाई जांचें\n5. कुल रेफरल आय देखें\n6. रेफरल स्टेटमेंट डाउनलोड करें",
        options: [],
      },

      "बोनस जानकारी": {
        message: "बोनस प्रकार चुनें:",
        options: ["वेलकम बोनस", "जमा बोनस", "लॉयल्टी बोनस"],
      },

      "वेलकम बोनस": {
        message:
          "वेलकम बोनस विवरण:\n• नए यूज़र्स को पहली जमा पर 100% बोनस मिलता है\n• न्यूनतम जमा: ₹500\n• अधिकतम बोनस: ₹5000\n• वेजरिंग आवश्यकता: 5x\n• रजिस्ट्रेशन से 30 दिन तक वैध",
        options: [],
      },

      "जमा बोनस": {
        message:
          "जमा बोनस विवरण:\n• ₹1000 से अधिक जमा पर 50% बोनस\n• सप्ताहांत में उपलब्ध\n• अधिकतम बोनस: ₹2000 प्रति जमा\n• वेजरिंग आवश्यकता: 3x\n• पात्र जमा पर ऑटो-क्रेडिट",
        options: [],
      },

      "लॉयल्टी बोनस": {
        message:
          "लॉयल्टी बोनस विवरण:\n• गतिविधि के आधार पर साप्ताहिक लॉयल्टी बोनस\n• न्यूनतम 5 लेनदेन आवश्यक\n• बोनस प्रतिशत: साप्ताहिक वॉल्यूम का 1-5%\n• हर सोमवार को जमा\n• कोई वेजरिंग आवश्यकता नहीं",
        options: [],
      },

      "क्लेम समस्याएं": {
        message: "क्लेम समस्या चुनें:",
        options: ["बोनस जमा नहीं हुआ", "वेजरिंग समस्याएं", "बोनस समाप्त"],
      },

      "बोनस जमा नहीं हुआ": {
        message:
          "यदि बोनस जमा नहीं हुआ:\n1. जांचें कि आप पात्रता मापदंड पूरे करते हैं\n2. सत्यापित करें कि जमा राशि न्यूनतम आवश्यकता पूरी करती है\n3. बोनस नियम और शर्तें जांचें\n4. प्रसंस्करण के लिए प्रतीक्षा करें (30 मिनट तक)\n5. फिर भी जमा नहीं हुआ तो जमा विवरण के साथ सहायता से संपर्क करें",
        options: [],
      },

      "वेजरिंग समस्याएं": {
        message:
          "वेजरिंग आवश्यकताओं के बारे में:\n• निर्दिष्ट बार बोनस राशि खेलनी होगी\n• केवल पात्र गेम वेजरिंग में गिने जाते हैं\n• प्रगति के लिए 'बोनस' अनुभाग जांचें\n• वेजरिंग पूरी होने तक निकासी प्रतिबंधित\n• वेजरिंग प्रश्नों के लिए सहायता से संपर्क करें",
        options: [],
      },

      "बोनस समाप्त": {
        message:
          "यदि बोनस समाप्त हो गया:\n• नियमों में बोनस की वैधता अवधि जांचें\n• समाप्त हुए बोनस बहाल नहीं किए जा सकते\n• भविष्य के बोनस: वैधता अवधि के भीतर उपयोग करें\n• बोनस समाप्ति के लिए रिमाइंडर सेट करें\n• नियमों की स्पष्टता के लिए सहायता से संपर्क करें",
        options: [],
      },

      "क्रिप्टो जमा/निकासी": {
        message: "कृपया एक चुनें:",
        options: ["क्रिप्टो जमा", "क्रिप्टो निकासी", "समर्थित क्रिप्टोकरेंसी"],
      },

      "क्रिप्टो जमा": {
        message: "क्रिप्टो जमा विकल्प चुनें:",
        options: ["क्रिप्टो जमा कैसे करें", "जमा पता", "पुष्टि समय"],
      },

      "क्रिप्टो जमा कैसे करें": {
        message:
          "क्रिप्टोकरेंसी जमा करने के लिए:\n1. 'पैसे जोड़ें' अनुभाग में जाएं\n2. 'क्रिप्टोकरेंसी' चुनें\n3. अपनी क्रिप्टो चुनें (BTC/ETH/USDT)\n4. जमा पता कॉपी करें\n5. पते पर क्रिप्टो भेजें\n6. नेटवर्क पुष्टि की प्रतीक्षा करें\n7. पुष्टि के बाद फंड जमा हो जाएगा",
        options: [],
      },

      "जमा पता": {
        message:
          "जमा पतों के बारे में:\n• प्रत्येक क्रिप्टो का अनूठा जमा पता होता है\n• हमेशा पता सही तरीके से कॉपी करें\n• गलत क्रिप्टो पते पर न भेजें\n• सुरक्षा के लिए पता बदल सकता है\n• हमेशा प्लेटफॉर्म से नवीनतम पता उपयोग करें\n• भेजने से पहले दोबारा जांच लें",
        options: [],
      },

      "पुष्टि समय": {
        message:
          "नेटवर्क पुष्टि समय:\n• बिटकॉइन (BTC): 2-3 पुष्टि (20-30 मिनट)\n• एथेरियम (ETH): 12 पुष्टि (3-5 मिनट)\n• USDT (TRC20): 1 पुष्टि (1-3 मिनट)\n• USDT (ERC20): 12 पुष्टि (3-5 मिनट)\n\n*समय नेटवर्क कंजेशन के आधार पर भिन्न हो सकता है",
        options: [],
      },

      "क्रिप्टो निकासी": {
        message: "क्रिप्टो निकासी विकल्प चुनें:",
        options: ["क्रिप्टो निकासी कैसे करें", "निकासी फीस", "प्रसंस्करण समय"],
      },

      "क्रिप्टो निकासी कैसे करें": {
        message:
          "क्रिप्टोकरेंसी निकालने के लिए:\n1. 'निकासी' अनुभाग में जाएं\n2. 'क्रिप्टोकरेंसी' चुनें\n3. क्रिप्टो और नेटवर्क चुनें\n4. प्राप्तकर्ता पता दर्ज करें\n5. राशि दर्ज करें\n6. विवरण सत्यापित करें और पुष्टि करें\n7. 2FA सत्यापन पूरा करें",
        options: [],
      },

      "निकासी फीस": {
        message:
          "क्रिप्टो निकासी फीस:\n• बिटकॉइन (BTC): 0.0005 BTC\n• एथेरियम (ETH): 0.01 ETH\n• USDT (TRC20): 1 USDT\n• USDT (ERC20): 5 USDT\n\n*नेटवर्क स्थितियों के आधार पर फीस बदल सकती है\n*निकासी से पहले वर्तमान फीस जांचें",
        options: [],
      },

      "प्रसंस्करण समय": {
        message:
          "क्रिप्टो निकासी प्रसंस्करण:\n• आंतरिक प्रसंस्करण: 10-30 मिनट\n• नेटवर्क पुष्टि: क्रिप्टो के अनुसार भिन्न\n• कुल समय: 30 मिनट से 2 घंटे\n• ब्लॉकचेन एक्सप्लोरर पर लेनदेन जांचें\n• अपेक्षित समय से अधिक देर होने पर सहायता से संपर्क करें",
        options: [],
      },

      "समर्थित क्रिप्टोकरेंसी": {
        message:
          "समर्थित क्रिप्टोकरेंसी:\n• बिटकॉइन (BTC)\n• एथेरियम (ETH)\n• टीथर USDT (TRC20)\n• टीथर USDT (ERC20)\n• नियमित रूप से अधिक कॉइन जोड़े जा रहे हैं\n\n*जमा/निकासी करते समय हमेशा सही नेटवर्क चुनें",
        options: [],
      },

      "प्रोफाइल अपडेट करें": {
        message: "कृपया एक चुनें:",
        options: ["व्यक्तिगत जानकारी", "संपर्क विवरण", "सुरक्षा सेटिंग्स"],
      },

      "व्यक्तिगत जानकारी": {
        message: "अपडेट करने के लिए चुनें:",
        options: ["नाम बदलें", "जन्म तिथि", "पता अपडेट"],
      },

      "नाम बदलें": {
        message:
          "नाम बदलने के लिए:\n1. सहायता से संपर्क करें (सीधे नहीं बदला जा सकता)\n2. नाम बदलने के लिए कानूनी दस्तावेज़ प्रदान करें\n3. नाम बदलने का अनुरोध सबमिट करें\n4. सत्यापन आवश्यक\n5. [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं\n\n*नाम KYC दस्तावेज़ों से मेल खाना चाहिए",
        options: [],
      },

      "जन्म तिथि": {
        message:
          "जन्म तिथि अपडेट करने के लिए:\n1. सहायता से संपर्क करें (सीधे नहीं बदली जा सकती)\n2. सही जन्म तिथि के साथ वैध ID प्रमाण प्रदान करें\n3. बदलाव का कारण समझाएं\n4. सत्यापन आवश्यक\n5. [www.jaimax.com/support](https://www.jaimax.com/support) पर जाएं",
        options: [],
      },

      "पता अपडेट": {
        message:
          "पता अपडेट करने के लिए:\n1. 'प्रोफाइल' अनुभाग में जाएं\n2. 'पता संपादित करें' पर क्लिक करें\n3. नए पते का विवरण दर्ज करें\n4. पता प्रमाण दस्तावेज़ अपलोड करें\n5. सत्यापन के लिए सबमिट करें\n6. 1-2 व्यापारिक दिनों में अपडेट प्रसंस्करण",
        options: [],
      },

      "संपर्क विवरण": {
        message: "अपडेट करने के लिए संपर्क विवरण चुनें:",
        options: ["ईमेल अपडेट", "फ़ोन नंबर", "संचार प्राथमिकताएं"],
      },

      "ईमेल अपडेट": {
        message:
          "ईमेल अपडेट करने के लिए:\n1. 'प्रोफाइल' अनुभाग में जाएं\n2. 'ईमेल बदलें' पर क्लिक करें\n3. नया ईमेल पता दर्ज करें\n4. वर्तमान पासवर्ड सत्यापित करें\n5. पुराने ईमेल पर OTP से पुष्टि करें\n6. नए ईमेल को OTP से सत्यापित करें\n7. ईमेल सफलतापूर्वक अपडेट हो गया",
        options: [],
      },

      "फ़ोन नंबर": {
        message:
          "फ़ोन नंबर अपडेट करने के लिए:\n1. 'प्रोफाइल' अनुभाग में जाएं\n2. 'फ़ोन बदलें' पर क्लिक करें\n3. नया फ़ोन नंबर दर्ज करें\n4. वर्तमान पासवर्ड सत्यापित करें\n5. पुराने नंबर पर OTP से पुष्टि करें\n6. नए नंबर को OTP से सत्यापित करें\n7. फ़ोन सफलतापूर्वक अपडेट हो गया",
        options: [],
      },

      "संचार प्राथमिकताएं": {
        message:
          "संचार प्राथमिकताएं अपडेट करने के लिए:\n1. 'सेटिंग्स' अनुभाग में जाएं\n2. 'नोटिफिकेशन' चुनें\n3. ईमेल/SMS प्राथमिकताएं चुनें\n4. नोटिफिकेशन प्रकार चुनें\n5. प्राथमिकताएं सेव करें\n\nविकल्प: प्रमोशन, लेनदेन, सुरक्षा अलर्ट, अपडेट",
        options: [],
      },

      "सुरक्षा सेटिंग्स": {
        message: "सुरक्षा विकल्प चुनें:",
        options: ["टू-फैक्टर ऑथेंटिकेशन", "पासवर्ड बदलें", "लॉगिन अलर्ट"],
      },

      "टू-फैक्टर ऑथेंटिकेशन": {
        message:
          "2FA सक्षम करने के लिए:\n1. 'सुरक्षा' अनुभाग में जाएं\n2. '2FA सक्षम करें' पर क्लिक करें\n3. ऑथेंटिकेटर ऐप डाउनलोड करें\n4. ऐप से QR कोड स्कैन करें\n5. सत्यापन कोड दर्ज करें\n6. बैकअप कोड सुरक्षित रूप से सेव करें\n7. 2FA सफलतापूर्वक सक्षम हो गया",
        options: [],
      },

      "पासवर्ड बदलें": {
        message:
          "पासवर्ड बदलने के लिए:\n1. 'सुरक्षा' अनुभाग में जाएं\n2. 'पासवर्ड बदलें' पर क्लिक करें\n3. वर्तमान पासवर्ड दर्ज करें\n4. नया पासवर्ड दर्ज करें\n5. नए पासवर्ड की पुष्टि करें\n6. यदि सक्षम है तो 2FA पूरा करें\n7. पासवर्ड सफलतापूर्वक बदल गया",
        options: [],
      },

      "लॉगिन अलर्ट": {
        message:
          "लॉगिन अलर्ट प्रबंधित करने के लिए:\n1. 'सुरक्षा' अनुभाग में जाएं\n2. 'लॉगिन अलर्ट' चुनें\n3. ईमेल नोटिफिकेशन सक्षम/अक्षम करें\n4. SMS नोटिफिकेशन सक्षम/अक्षम करें\n5. अलर्ट प्राथमिकताएं सेट करें\n6. सेटिंग्स सेव करें\n\n*सुरक्षा के लिए सक्षम रखने की सिफारिश",
        options: [],
      },
    },
  },


  telugu: {
  // Header and Navigation
  supportTitle: " జైమాక్స్ సపోర్ట్",
  reset: " రీసెట్",
  home: "🏠 హోమ్",
  support: "💬 సపోర్ట్",
  helpAvailable: "24/7 సహాయం అందుబాటులో",
  needMoreHelp: "మరింత సహాయం అవసరమా? మా సపోర్ట్ పేజీని సందర్శించండి",
  contactSupport: "సపోర్ట్‌ను సంప్రదించండి",
  poweredBy: "జైమాక్స్ AI అసిస్టెంట్ ద్వారా శక్తిని పొందింది",

  // Chat Options
  chatOptions: {
    initial: {
      message: "ప్రారంభించడానికి దయచేసి ఒక ఎంపికను ఎంచుకోండి.",
      options: [
        "INR డిపాజిట్లు/ విత్‌డ్రాల్స్",
        "KYC/బ్యాంక్ ఖాతా",
        "సైన్ అప్ మరియు లాగిన్",
        "సూపర్‌బోనస్/ రెఫరల్స్",
        "క్రిప్టో డిపాజిట్లు/విత్‌డ్రాల్స్",
        "ప్రొఫైల్ అప్‌డేట్ చేయండి",
      ],
    },
    "సైన్ అప్ మరియు లాగిన్": {
      message: "దయచేసి ఒకటి ఎంచుకోండి:",
      options: ["సైన్ అప్ ఎలా చేయాలి?", "లాగిన్ ఎలా చేయాలి?", "మీ సమస్య ఏమిటి?"],
    },
    "సైన్ అప్ ఎలా చేయాలి?": {
      message: `
సైన్ అప్ చేయడానికి:
1. మా అధికారిక సైట్ [www.jaimax.com](https://www.jaimax.com) ను సందర్శించండి
2. 'రిజిస్టర్' పై క్లిక్ చేయండి
3. మీ వివరాలను నమోదు చేయండి
4. OTP ద్వారా ధృవీకరించండి
5. మీరు జైమాక్స్‌లో నమోదు అవుతారు!
`,
      options: [],
    },
    "లాగిన్ ఎలా చేయాలి?": {
      message:
        "లాగిన్ చేయడానికి:\n1. మా అధికారిక సైట్ [www.jaimax.com](https://www.jaimax.com) ను సందర్శించండి\n2. 'లాగిన్' పై క్లిక్ చేయండి\n3. మీ క్రెడెన్షియల్స్ నమోదు చేయండి\n4. మీ డ్యాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి.",
      options: [],
    },
    "మీ సమస్య ఏమిటి?": {
      message: "మీ సమస్యను ఎంచుకోండి:",
      options: ["OTP రాలేదు", "పాస్‌వర్డ్ రీసెట్", "ఖాతా బ్లాక్ చేయబడింది"],
    },
    "OTP రాలేదు": {
      message:
        "మీకు OTP రాకపోతే:\n- మీ స్పామ్ ఫోల్డర్‌ను తనిఖీ చేయండి\n- ఒక నిమిషం వేచి ఉండి మళ్లీ ప్రయత్నించండి\n- ఇంకా రాలేదా? సపోర్ట్‌ను సంప్రదించండి.",
      options: [],
    },
    "పాస్‌వర్డ్ రీసెట్": {
      message:
        "పాస్‌వర్డ్ రీసెట్ చేయడానికి:\n1. మా అధికారిక సైట్ [www.jaimax.com](https://www.jaimax.com) ను సందర్శించండి\n2. లాగిన్ పేజీలో 'పాస్‌వర్డ్ మర్చిపోయాను' పై క్లిక్ చేయండి\n3. మీ రిజిస్టర్డ్ ఇమెయిల్ నమోదు చేయండి\n4. OTP నమోదు చేసి అక్కడ ధృవీకరించండి\n5. అప్పుడు కొత్త పాస్‌వర్డ్ నమోదు చేయండి\n6. పాస్‌వర్డ్‌ను నిర్ధారించండి\n7. దాన్ని సబ్మిట్ చేయండి\n8. మీ పాస్‌వర్డ్ విజయవంతంగా మార్చబడుతుంది.",
      options: [],
    },
    "ఖాతా బ్లాక్ చేయబడింది": {
      message:
        "విఫల ప్రయత్నాల కారణంగా మీ ఖాతా బ్లాక్ అయితే, దాన్ని సురక్షితంగా అన్‌లాక్ చేయడానికి దయచేసి సపోర్ట్‌ను సంప్రదించండి. [www.jaimax.com/support](https://www.jaimax.com/support)\n\nసపోర్ట్ పేజీని సందర్శించిన తర్వాత, **కొత్తది సృష్టించు** పై క్లిక్ చేయండి, మీ ప్రశ్నను నమోదు చేయండి, ప్రాధాన్యత కింద సమస్యను ఎంచుకోండి మరియు సబ్మిట్ చేయండి. మా సపోర్ట్ టీమ్ త్వరలో మీను సంప్రదిస్తుంది.",
      options: [],
    },
    "INR డిపాజిట్లు/ విత్‌డ్రాల్స్": {
      message: "దయచేసి ఒకటి ఎంచుకోండి:",
      options: ["INR డిపాజిట్", "INR విత్‌డ్రాల్", "లావాదేవీ సమస్యలు"],
    },
    "INR డిపాజిట్": {
      message: "డిపాజిట్ పద్ధతిని ఎంచుకోండి:",
      options: [
        "UPI డిపాజిట్",
        "బ్యాంక్ ట్రాన్స్‌ఫర్",
        "నెట్ బ్యాంకింగ్",
        "డిపాజిట్ పరిమితులు",
      ],
    },
    "UPI డిపాజిట్": {
      message:
        "UPI ద్వారా డిపాజిట్ చేయడానికి:\n" +
        "1. **డబ్బు జోడించు** విభాగానికి వెళ్లండి\n" +
        "2. స్క్రీన్‌పై చూపిన QR కోడ్‌ను స్కాన్ చేసి లావాదేవీని పూర్తి చేయండి\n" +
        "3. లావాదేవీ ఇమేజ్‌ను అప్‌లోడ్ చేయండి, లావాదేవీ ID మరియు మొత్తాన్ని నమోదు చేయండి\n" +
        "4. ఫారమ్‌ను సబ్మిట్ చేయండి\n" +
        "5. మా టీమ్ మీ చెల్లింపును ధృవీకరించుకుని అవసరమైతే మిమ్మల్ని సంప్రదిస్తుంది\n\n" +
        "**గుర్తుంచుకోండి:** నకిలీ లేదా తప్పుడు లావాదేవీ వివరాలను అప్‌లోడ్ చేయవద్దు. మా టీమ్ అన్ని డిపాజిట్లను ధృవీకరిస్తుంది, మరియు నకిలీ లావాదేవీలను సమర్పించిన ఖాతాలు బ్లాక్ చేయబడతాయి.",
      options: [],
    },

    "బ్యాంక్ ట్రాన్స్‌ఫర్": {
      message:
        "బ్యాంక్ ట్రాన్స్‌ఫర్ ద్వారా డిపాజిట్ చేయడానికి:\n" +
        "1. డబ్బు జోడించు విభాగానికి వెళ్లండి\n" +
        "2. స్క్రీన్‌పై అందుబాటులో ఉన్న బ్యాంక్ వివరాలకు డబ్బును బదిలీ చేయండి\n" +
        "3. లావాదేవీ స్క్రీన్‌షాట్‌ను అప్‌లోడ్ చేయండి, లావాదేవీ ID మరియు మొత్తాన్ని నమోదు చేయండి\n" +
        "4. ఫారమ్‌ను సబ్మిట్ చేయండి\n" +
        "5. మా టీమ్ మీ చెల్లింపును ధృవీకరించుకుని అవసరమైతే మిమ్మల్ని సంప్రదిస్తుంది\n\n" +
        "**గుర్తుంచుకోండి:** నకిలీ లేదా తప్పుడు లావాదేవీ వివరాలను అప్‌లోడ్ చేయవద్దు. మా టీమ్ అన్ని డిపాజిట్లను ధృవీకరిస్తుంది, మరియు నకిలీ లావాదేవీలను సమర్పించిన ఖాతాలు బ్లాక్ చేయబడతాయి.",
      options: [],
    },

    "నెట్ బ్యాంకింగ్": {
      message:
        "నెట్ బ్యాంకింగ్ ద్వారా డిపాజిట్ చేయడానికి:\n" +
        "1. **డబ్బు జోడించు** విభాగానికి వెళ్లండి\n" +
        "2. నెట్ బ్యాంకింగ్ ఉపయోగించి బ్యాంక్ వివరాలకు లావాదేవీని పూర్తి చేయండి\n" +
        "3. చెల్లింపు స్క్రీన్‌షాట్‌ను అప్‌లోడ్ చేయండి మరియు లావాదేవీ ID మరియు మొత్తాన్ని నమోదు చేయండి\n" +
        "4. ఫారమ్‌ను సబ్మిట్ చేయండి\n" +
        "5. మా టీమ్ మీ చెల్లింపును ధృవీకరించుకుని మీ వాలెట్‌కు నిధులను జోడిస్తుంది",
      options: [],
    },

    "INR విత్‌డ్రాల్": {
      message: "విత్‌డ్రాల్ ఎంపికను ఎంచుకోండి:",
      options: ["విత్‌డ్రా ఎలా చేయాలి", "విత్‌డ్రాల్ పరిమితులు", "విత్‌డ్రాల్ సమస్యలు"],
    },
    "విత్‌డ్రా ఎలా చేయాలి": {
      message:
        "INR విత్‌డ్రా చేయడానికి:\n1. 'విత్‌డ్రా' విభాగానికి వెళ్లండి [www.jaimax.com/withdrawal](https://www.jaimax.com)\n2. మొత్తాన్ని నమోదు చేయండి (కనిష్టం ₹500)\n3. మీ రిజిస్టర్డ్ బ్యాంక్ ఖాతాను ఎంచుకోండి\n4. విత్‌డ్రాల్‌ను నిర్ధారించండి\n5. ప్రాసెసింగ్ సమయం: 1-2 వ్యాపార గంటలు",
      options: [],
    },
    "విత్‌డ్రాల్ పరిమితులు": {
      message:
        "INR విత్‌డ్రాల్ పరిమితులు:\n• కనిష్టం: లావాదేవీకి ₹500\n• గరిష్టం: లావాదేవీకి ₹50,000\n• రోజువారీ పరిమితి: ₹2,00,000\n• నెలవారీ పరిమితి: ₹25,00,000\n\n*KYC ధృవీకరణ స్థాయిని బట్టి పరిమితులు మారవచ్చు",
      options: [],
    },
    "విత్‌డ్రాల్ సమస్యలు": {
      message: "మీ విత్‌డ్రాల్ సమస్యను ఎంచుకోండి:",
      options: [
        "విత్‌డ్రాల్ పెండింగ్‌లో ఉంది",
        "విత్‌డ్రాల్ విఫలమైంది",
        "తప్పుడు బ్యాంక్ ఖాతా",
      ],
    },
    "విత్‌డ్రాల్ పెండింగ్‌లో ఉంది": {
      message:
        "మీ విత్‌డ్రాల్ పెండింగ్‌లో ఉంటే:\n- సాధారణ ప్రాసెసింగ్ సమయం: 1-2 వ్యాపార గంటలు\n- బ్యాంక్ వివరాలు సరిగా ఉన్నాయో తనిఖీ చేయండి\n- 3 రోజులకు మించి పెండింగ్‌లో ఉంటే సపోర్ట్‌ను సంప్రదించండి\n- [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "విత్‌డ్రాల్ విఫలమైంది": {
      message:
        "విత్‌డ్రాల్ విఫలమైతే:\n1. బ్యాంక్ ఖాతా వివరాలు సరిగా ఉన్నాయో తనిఖీ చేయండి\n2. తగినంత బ్యాలెన్స్ ఉందని నిర్ధారించుకోండి\n3. మొత్తం మీ వాలెట్‌కు తిరిగి వస్తుంది\n4. సహాయం కోసం సపోర్ట్‌ను సంప్రదించండి\n5. [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "తప్పుడు బ్యాంక్ ఖాతా": {
      message:
        "మీరు తప్పుడు బ్యాంక్ ఖాతాను ఎంచుకున్టే:\n1. వెంటనే సపోర్ట్‌ను సంప్రదించండి\n2. లావాదేవీ ID అందించండి\n3. సాధ్యమైతే మేము రద్దు/దారి మార్చడంలో సహాయం చేస్తాము\n4. [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "లావాదేవీ సమస్యలు": {
      message: "మీ లావాదేవీ సమస్యను ఎంచుకోండి:",
      options: [
        "చెల్లింపు విఫలమైంది",
        "మొత్తం కోత అయింది కానీ క్రెడిట్ కాలేదు",
        "లావాదేవీ చరిత్ర",
      ],
    },
    "చెల్లింపు విఫలమైంది": {
      message:
        "చెల్లింపు విఫలమైతే:\n1. బ్యాంకు నుండి మొత్తం కోత అయిందో తనిఖీ చేయండి\n2. కోత అయితే, ఆటో-రివర్సల్ కోసం 24-48 గంటలు వేచి ఉండండి\n3. రివర్స్ కాకపోతే, లావాదేవీ వివరాలతో సపోర్ట్‌ను సంప్రదించండి\n4. [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "మొత్తం కోత అయింది కానీ క్రెడిట్ కాలేదు": {
      message:
        "మొత్తం కోత అయి క్రెడిట్ కాకపోతే:\n1. 2-5 నిమిషాలు (UPI) లేదా 2-4 గంటలు (బ్యాంక్ ట్రాన్స్‌ఫర్) వేచి ఉండండి\n2. మీ లావాదేవీ చరిత్రను తనిఖీ చేయండి\n3. ఆశించిన సమయం తర్వాత కూడా క్రెడిట్ కాకపోతే సపోర్ట్‌ను సంప్రదించండి\n4. లావాదేవీ రసీదు/స్క్రీన్‌షాట్‌ను సిద్ధంగా ఉంచుకోండి\n5. [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "లావాదేవీ చరిత్ర": {
      message:
        "లావాదేవీ చరిత్రను తనిఖీ చేయడానికి:\n1. మీ ఖాతాలోకి లాగిన్ చేయండి\n2. 'లావాదేవీ చరిత్ర' లేదా 'నా ఖాతా'కు వెళ్లండి\n3. తేదీ శ్రేణిని ఎంచుకోండి\n4. లావాదేవీ రకం (డిపాజిట్/విత్‌డ్రాల్) ద్వారా ఫిల్టర్ చేయండి\n5. అవసరమైతే స్టేట్‌మెంట్ డౌన్‌లోడ్ చేయండి",
      options: [],
    },
    "KYC/బ్యాంక్ ఖాతా": {
      message: "దయచేసి ఒకటి ఎంచుకోండి:",
      options: [
        "KYC ధృవీకరణ",
        "బ్యాంక్ ఖాతా నిర్వహణ",
        "డాక్యుమెంట్ సమస్యలు",
      ],
    },
    "KYC ధృవీకరణ": {
      message: "KYC ఎంపికను ఎంచుకోండి:",
      options: [
        "KYC ఎలా పూర్తి చేయాలి",
        "KYC స్థితి",
        "KYC డాక్యుమెంట్లు అవసరం",
      ],
    },

    "KYC ఎలా పూర్తి చేయాలి": {
      message:
        "KYC ధృవీకరణ పూర్తి చేయడానికి:\n" +
        "1. మీ ఖాతాలోకి లాగిన్ చేయండి\n" +
        "2. [www.jaimax.com/login](https://www.jaimax.com)\n" +
        "3. 'KYC' విభాగానికి వెళ్లండి\n" +
        "4. మొదట, **డిజిలాకర్**‌తో లాగిన్ చేయండి\n" +
        "5. అవసరమైన డాక్యుమెంట్లను అప్‌లోడ్ చేయండి\n" +
        "6. డాక్యుమెంట్లు అప్‌లోడ్ అయిన తర్వాత, మీ KYC స్థితి **ఆమోదించబడిన** లేదా **తిరస్కరించబడిన** వరకు వాటిని **ఎడిట్ చేయలేరు**\n" +
        "7. ఆధార్ మరియు PAN నంబర్లు సరిపోతుంటే, మీ KYC **ఆటోమేటిక్‌గా ఆమోదించబడుతుంది**\n" +
        "8. అవి సరిపోకపోతే, మా టీమ్ **మాన్యువల్‌గా ఆమోదిస్తుంది**\n" +
        "9. వ్యక్తిగత వివరాల ఫారమ్‌ను పూరించండి\n" +
        "10. ధృవీకరణ కోసం సబ్మిట్ చేయండి\n" +
        "11. ఆమోదం కోసం వేచి ఉండండి",
      options: [],
    },

    "KYC స్థితి": {
      message:
        "KYC స్థితిని తనిఖీ చేయడానికి:\n1. మీ ఖాతాలోకి లాగిన్ చేయండి\n2. 'KYC' విభాగానికి వెళ్లండి\n3. ధృవీకరణ స్థితిని చూడండి\n\nస్థితి అర్థాలు:\n• పెండింగ్: సమీక్షలో\n• ఆమోదించబడింది: ధృవీకరించబడింది\n• తిరస్కరించబడింది: డాక్యుమెంట్లను మళ్లీ సబ్మిట్ చేయండి",
      options: [],
    },
    "KYC డాక్యుమెంట్లు అవసరం": {
      message:
        "అవసరమైన KYC డాక్యుమెంట్లు:\n1. గుర్తింపు ప్రమాణం: ఆధార్/PAN/పాస్‌పోర్ట్/డ్రైవింగ్ లైసెన్స్\n2. చిరునామా ప్రమాణం: ఆధార్ కార్డు\n3. బ్యాంక్ ఖాతా ప్రమాణం: మీ బ్యాంక్ వివరాలను నమోదు చేయండి\n4. డిజిలాకర్ లాగిన్‌ను పూర్తి చేయండి\n5. మీ సెల్ఫీని అప్‌లోడ్ చేయండి\n\n*అన్ని డాక్యుమెంట్లు స్పష్టంగా మరియు చెల్లుబాటులో ఉండాలి",
      options: [],
    },
    "బ్యాంక్ ఖాతా నిర్వహణ": {
      message: "బ్యాంక్ ఖాతా ఎంపికను ఎంచుకోండి:",
      options: ["బ్యాంక్ ఖాతా జోడించండి", "బ్యాంక్ వివరాలను అప్‌డేట్ చేయండి"],
    },
    "బ్యాంక్ ఖాతా జోడించండి": {
      message:
        "బ్యాంక్ ఖాతా జోడించడానికి:\n1. 'kyc' విభాగానికి వెళ్లండి\n2. బ్యాంక్ వివరాలను నమోదు చేయండి (ఖాతా నంబర్, IFSC, పేరు)\n3. ధృవీకరణ కోసం సబ్మిట్ చేయండి\n4. ఖాతా ధృవీకరించబడుతుంది",
      options: [],
    },
    "బ్యాంక్ వివరాలను అప్‌డేట్ చేయండి": {
      message:
        "బ్యాంక్ వివరాలను అప్‌డేట్ చేయడానికి:\n1. 'kyc' విభాగానికి వెళ్లండి\n2. కొత్త బ్యాంక్ వివరాలను అందించండి\n3. అప్‌డేట్ బటన్‌పై క్లిక్ చేయండి",
      options: [],
    },
    "డాక్యుమెంట్ సమస్యలు": {
      message: "డాక్యుమెంట్ సమస్యను ఎంచుకోండి:",
      options: [
        "డాక్యుమెంట్ తిరస్కరించబడింది",
        "అప్‌లోడ్ సమస్యలు",
        "డాక్యుమెంట్ ధృవీకరణ పెండింగ్‌లో ఉంది",
      ],
    },
    "డాక్యుమెంట్ తిరస్కరించబడింది": {
      message:
        "డాక్యుమెంట్లు తిరస్కరించబడితే:\n1. నోటిఫికేషన్లలో తిరస్కరణ కారణాన్ని తనిఖీ చేయండి\n2. డాక్యుమెంట్లు స్పష్టంగా మరియు చెల్లుబాటులో ఉన్నాయని నిర్ధారించుకోండి\n3. సమస్యను పరిష్కరించి కొత్త డాక్యుమెంట్లను అప్‌లోడ్ చేయండి\n4. సాధారణ సమస్యలు: అస్పష్టమైన చిత్రం, గడువు ముగిసిన డాక్యుమెంట్లు, పేరు సరిపోకపోవడం\n5. తిరస్కరణ గురించి అస్పష్టత ఉంటే సపోర్ట్‌ను సంప్రదించండి [www.jaimax.com/support](https://www.jaimax.com/support)",
      options: [],
    },
    "అప్‌లోడ్ సమస్యలు": {
      message:
        "అప్‌లోడ్ సమస్యలు ఉంటే:\n1. ఫైల్ ఫార్మాట్‌ను తనిఖీ చేయండి (JPG, PNG, PDF)\n2. ఫైల్ పరిమాణం 5MB కంటే తక్కువ ఉండాలి\n3. చిత్రం స్పష్టంగా మరియు చదవగలిగేలా ఉందని నిర్ధారించుకోండి\n4. వేరే బ్రౌజర్/పరికరంతో ప్రయత్నించండి\n5. సమస్య కొనసాగితే సపోర్ట్‌ను సంప్రదించండి [www.jaimax.com/support](https://www.jaimax.com/support)",
      options: [],
    },
    "డాక్యుమెంట్ ధృవీకరణ పెండింగ్‌లో ఉంది": {
      message:
        "డాక్యుమెంట్ ధృవీకరణ పెండింగ్‌లో ఉంటే:\n• సాధారణ ప్రాసెసింగ్ సమయం: 1 వ్యాపార దినం\n• ఏదైనా నోటిఫికేషన్/ఇమెయిల్ కోసం తనిఖీ చేయండి\n• అవసరమైన అన్ని డాక్యుమెంట్లు అప్‌లోడ్ అయిన్నాయని నిర్ధారించుకోండి\n• 1 రోజులకు మించి పెండింగ్‌లో ఉంటే సపోర్ట్‌ను సంప్రదించండి\n• [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "సూపర్‌బోనస్/ రెఫరల్స్": {
      message: "దయచేసి ఒకటి ఎంచుకోండి:",
      options: ["రెఫరల్ ప్రోగ్రాం", "బోనస్ సమాచారం", "క్లెయిమ్ సమస్యలు"],
    },
    "రెఫరల్ ప్రోగ్రాం": {
      message: "రెఫరల్ ఎంపికను ఎంచుకోండి:",
      options: ["రెఫర్ ఎలా చేయాలి", "రెఫరల్ రివార్డ్స్", "రెఫరల్స్ ట్రాక్ చేయండి"],
    },
    "రెఫర్ ఎలా చేయాలి": {
      message:
        "స్నేహితులను రెఫర్ చేయడానికి:\n1. 'రెఫరల్' విభాగానికి వెళ్లండి\n2. మీ ప్రత్యేక రెఫరల్ కోడ్/లింక్‌ను కాపీ చేయండి\n3. స్నేహితులతో షేర్ చేయండి\n4. స్నేహితుడు మీ కోడ్ ఉపయోగించి సైన్ అప్ చేస్తాడు\n5. స్నేహితుడు మొదటి డిపాజిట్ చేసినప్పుడు ఇద్దరూ రివార్డ్స్ పొందుతారు\n6. రెఫరల్ డ్యాష్‌బోర్డ్‌లో ఆదాయాలను ట్రాక్ చేయండి",
      options: [],
    },
    "రెఫరల్ రివార్డ్స్": {
      message:
        "రెఫరల్ రివార్డ్స్:\n• మీకు లభిస్తుంది: స్నేహితుడి మొదటి డిపాజిట్‌లో 10% బోనస్‌గా\n• స్నేహితుడికి లభిస్తుంది: మొదటి డిపాజిట్‌పై స్వాగత బోనస్\n• గరిష్ట రెఫరల్ బోనస్: రెఫరల్‌కు ₹1000\n• స్నేహితుడి డిపాజిట్ తర్వాత బోనస్ వెంటనే క్రెడిట్ అవుతుంది\n• రెఫరల్ కోసం కనిష్ట డిపాజిట్: ₹500",
      options: [],
    },
    "రెఫరల్స్ ట్రాక్ చేయండి": {
      message:
        "రెఫరల్స్ ట్రాక్ చేయడానికి:\n1. 'రెఫరల్' విభాగానికి వెళ్లండి\n2. 'నా రెఫరల్స్' ట్యాబ్‌ను చూడండి\n3. రెఫర్ చేసిన వినియోగదారుల జాబితాను చూడండి\n4. ప్రతి రెఫరల్ నుండి ఆదాయాలను తనిఖీ చేయండి\n5. మొత్తం రెఫరల్ ఆదాయాన్ని చూడండి\n6. రెఫరల్ స్టేట్‌మెంట్‌ను డౌన్‌లోడ్ చేయండి",
      options: [],
    },
    "బోనస్ సమాచారం": {
      message: "బోనస్ రకాన్ని ఎంచుకోండి:",
      options: ["స్వాగత బోనస్", "డిపాజిట్ బోనస్", "లాయల్టీ బోనస్"],
    },
    "స్వాగత బోనస్": {
      message:
        "స్వాగత బోనస్ వివరాలు:\n• కొత్త వినియోగదారులకు మొదటి డిపాజిట్‌పై 100% బోనస్\n• కనిష్ట డిపాజిట్: ₹500\n• గరిష్ట బోనస్: ₹5000\n• వేజరింగ్ అవసరం: 5x\n• రిజిస్ట్రేషన్ నుండి 30 రోజుల వరకు చెల్లుబాటు",
      options: [],
    },
    "డిపాజిట్ బోనస్": {
      message:
        "డిపాజిట్ బోనస్ వివరాలు:\n• ₹1000 పైగా డిపాజిట్లపై 50% బోనస్\n• వారాంతాల్లో అందుబాటు\n• గరిష్ట బోనస్: డిపాజిట్‌కు ₹2000\n• వేజరింగ్ అవసరం: 3x\n• అర్హత ఉన్న డిపాజిట్లపై ఆటో-క్రెడిట్",
      options: [],
    },
    "లాయల్టీ బోనస్": {
      message:
        "లాయల్టీ బోనస్ వివరాలు:\n• కార్యకలాపాలను బట్టి వారపు లాయల్టీ బోనస్\n• కనీసం 5 లావాదేవీలు అవసరం\n• బోనస్ శాతం: వారపు వాల్యూమ్‌లో 1-5%\n• ప్రతి సోమవారం క్రెడిట్ అవుతుంది\n• వేజరింగ్ అవసరం లేదు",
      options: [],
    },
    "క్లెయిమ్ సమస్యలు": {
      message: "క్లెయిమ్ సమస్యను ఎంచుకోండి:",
      options: ["బోనస్ క్రెడిట్ కాలేదు", "వేజరింగ్ సమస్యలు", "బోనస్ గడువు ముగిసింది"],
    },
    "బోనస్ క్రెడిట్ కాలేదు": {
      message:
        "బోనస్ క్రెడిట్ కాకపోతే:\n1. మీరు అర్హత ప్రమాణాలను చేరుకున్నారో తనిఖీ చేయండి\n2. డిపాజిట్ మొత్తం కనిష్టాన్ని చేరుకున్నాడో ధృవీకరించండి\n3. బోనస్ నిబంధనలు మరియు షరతులను తనిఖీ చేయండి\n4. ప్రాసెసింగ్ కోసం వేచి ఉండండి (30 నిమిషాల వరకు)\n5. ఇంకా క్రెడిట్ కాకపోతే డిపాజిట్ వివరాలతో సపోర్ట్‌ను సంప్రదించండి",
      options: [],
    },
    "వేజరింగ్ సమస్యలు": {
      message:
        "వేజరింగ్ అవసరాల గురించి:\n• బోనస్ మొత్తాన్ని నిర్దిష్ట సార్లు ఆడాలి\n• అర్హత ఉన్న గేమ్స్ మాత్రమే వేజరింగ్ కౌంట్‌లో చేరుతాయి\n• పురోగతి కోసం 'బోనస్' విభాగాన్ని తనిఖీ చేయండి\n• వేజరింగ్ పూర్తయ్యే వరకు విత్‌డ్రాల్ పరిమితం\n• వేజరింగ్ ప్రశ్నలకు సపోర్ట్‌ను సంప్రదించండి",
      options: [],
    },
    "బోనస్ గడువు ముగిసింది": {
      message:
        "బోనస్ గడువు ముగిసినట్లయితే:\n• నిబంధనల్లో బోనస్ చెల్లుబాటు వ్యవధిని తనిఖీ చేయండి\n• గడువు ముగిసిన బోనస్‌లను పునరుద్ధరించలేము\n• భవిష్యత్తు బోనస్‌లు: చెల్లుబాటు వ్యవధిలోనే ఉపయోగించండి\n• బోనస్ గడువు కోసం రిమైండర్లు సెట్ చేయండి\n• నిబంధనలపై వివరణ కోసం సపోర్ట్‌ను సంప్రదించండి",
      options: [],
    },
    "క్రిప్టో డిపాజిట్లు/విత్‌డ్రాల్స్": {
      message: "దయచేసి ఒకటి ఎంచుకోండి:",
      options: [
        "క్రిప్టో డిపాజిట్",
        "క్రిప్టో విత్‌డ్రాల్",
        "మద్దతు ఉన్న క్రిప్టోకరెన్సీలు",
      ],
    },
    "క్రిప్టో డిపాజిట్": {
      message: "క్రిప్టో డిపాజిట్ ఎంపికను ఎంచుకోండి:",
      options: [
        "క్రిప్టో ఎలా డిపాజిట్ చేయాలి",
        "డిపాజిట్ చిరునామా",
        "ధృవీకరణ సమయం",
      ],
    },
    "క్రిప్టో ఎలా డిపాజిట్ చేయాలి": {
      message:
        "క్రిప్టోకరెన్సీ డిపాజిట్ చేయడానికి:\n1. 'డబ్బు జోడించు' విభాగానికి వెళ్లండి\n2. 'క్రిప్టోకరెన్సీ'ని ఎంచుకోండి\n3. మీ క్రిప్టోను ఎంచుకోండి (BTC/ETH/USDT)\n4. డిపాజిట్ చిరునామాను కాపీ చేయండి\n5. చిరునామాకు క్రిప్టోను పంపండి\n6. నెట్‌వర్క్ ధృవీకరణల కోసం వేచి ఉండండి\n7. ధృవీకరణల తర్వాత నిధులు క్రెడిట్ అవుతాయి",
      options: [],
    },
    "డిపాజిట్ చిరునామా": {
      message:
        "డిపాజిట్ చిరునామాల గురించి:\n• ప్రతి క్రిప్టోకు ప్రత్యేక డిపాజిట్ చిరునామా ఉంటుంది\n• చిరునామాను ఎల్లప్పుడూ సరిగా కాపీ చేయండి\n• చిరునామాకు తప్పుడు క్రిప్టోను పంపవద్దు\n• భద్రత కోసం చిరునామా మారవచ్చు\n• ఎల్లప్పుడూ ప్లాట్‌ఫారమ్ నుండి తాజా చిరునామాను ఉపయోగించండి\n• పంపడానికి ముందు రెండుసార్లు తనిఖీ చేయండి",
      options: [],
    },
    "ధృవీకరణ సమయం": {
      message:
        "నెట్‌వర్క్ ధృవీకరణ సమయాలు:\n• బిట్‌కాయిన్ (BTC): 2-3 ధృవీకరణలు (20-30 నిమిషాలు)\n• ఇథెరియం (ETH): 12 ధృవీకరణలు (3-5 నిమిషాలు)\n• USDT (TRC20): 1 ధృవీకరణ (1-3 నిమిషాలు)\n• USDT (ERC20): 12 ధృవీకరణలు (3-5 నిమిషాలు)\n\n*నెట్‌వర్క్ రద్దీని బట్టి సమయాలు మారవచ్చు",
      options: [],
    },
    "క్రిప్టో విత్‌డ్రాల్": {
      message: "క్రిప్టో విత్‌డ్రాల్ ఎంపికను ఎంచుకోండి:",
      options: [
        "క్రిప్టో ఎలా విత్‌డ్రా చేయాలి",
        "విత్‌డ్రాల్ ఫీజులు",
        "ప్రాసెసింగ్ సమయం",
      ],
    },
    "క్రిప్టో ఎలా విత్‌డ్రా చేయాలి": {
      message:
        "క్రిప్టోకరెన్సీ విత్‌డ్రా చేయడానికి:\n1. 'విత్‌డ్రా' విభాగానికి వెళ్లండి\n2. 'క్రిప్టోకరెన్సీ'ని ఎంచుకోండి\n3. క్రిప్టో మరియు నెట్‌వర్క్‌ను ఎంచుకోండి\n4. గ్రహీత చిరునామాను నమోదు చేయండి\n5. మొత్తాన్ని నమోదు చేయండి\n6. వివరాలను ధృవీకరించి నిర్ధారించండి\n7. 2FA ధృవీకరణను పూర్తి చేయండి",
      options: [],
    },
    "విత్‌డ్రాల్ ఫీజులు": {
      message:
        "క్రిప్టో విత్‌డ్రాల్ ఫీజులు:\n• బిట్‌కాయిన్ (BTC): 0.0005 BTC\n• ఇథెరియం (ETH): 0.01 ETH\n• USDT (TRC20): 1 USDT\n• USDT (ERC20): 5 USDT\n\n*నెట్‌వర్క్ పరిస్థితులను బట్టి ఫీజులు మారవచ్చు\n*విత్‌డ్రాల్‌కు ముందు ప్రస్తుత ఫీజులను తనిఖీ చేయండి",
      options: [],
    },
    "ప్రాసెసింగ్ సమయం": {
      message:
        "క్రిప్టో విత్‌డ్రాల్ ప్రాసెసింగ్:\n• అంతర్గత ప్రాసెసింగ్: 10-30 నిమిషాలు\n• నెట్‌వర్క్ ధృవీకరణ: క్రిప్టో మేరకు మారుతుంది\n• మొత్తం సమయం: 30 నిమిషాలు నుండి 2 గంటలు\n• బ్లాక్‌చెయిన్ ఎక్స్‌ప్లోరర్‌లో లావాదేవీని తనిఖీ చేయండి\n• ఆశించిన సమయానికి మించి ఆలస్యమైతే సపోర్ట్‌ను సంప్రదించండి",
      options: [],
    },
    "మద్దతు ఉన్న క్రిప్టోకరెన్సీలు": {
      message:
        "మద్దతు ఉన్న క్రిప్టోకరెన్సీలు:\n• బిట్‌కాయిన్ (BTC)\n• ఇథెరియం (ETH)\n• టెథర్ USDT (TRC20)\n• టెథర్ USDT (ERC20)\n• మరిన్ని కాయిన్లు క్రమం తప్పకుండా జోడించబడుతున్నాయి\n\n*డిపాజిట్/విత్‌డ్రా చేసేటప్పుడు ఎల్లప్పుడూ సరైన నెట్‌వర్క్‌ను ఎంచుకోండి",
      options: [],
    },
    "ప్రొఫైల్ అప్‌డేట్ చేయండి": {
      message: "దయచేసి ఒకటి ఎంచుకోండి:",
      options: [
        "వ్యక్తిగత సమాచారం",
        "సంప్రదింపు వివరాలు",
        "భద్రతా సెట్టింగ్‌లు",
      ],
    },
    "వ్యక్తిగత సమాచారం": {
      message: "అప్‌డేట్ చేయవలసిన దాన్ని ఎంచుకోండి:",
      options: ["పేరు మార్చడం", "పుట్టిన తేదీ", "చిరునామా అప్‌డేట్"],
    },
    "పేరు మార్చడం": {
      message:
        "పేరు మార్చడానికి:\n1. సపోర్ట్‌ను సంప్రదించండి (నేరుగా మార్చలేరు)\n2. పేరు మార్పు కోసం చట్టబద్ధమైన డాక్యుమెంట్లను అందించండి\n3. పేరు మార్పు అభ్యర్థనను సమర్పించండి\n4. ధృవీకరణ అవసరం\n5. [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి\n\n*పేరు KYC డాక్యుమెంట్లతో సరిపోవాలి",
      options: [],
    },
    "పుట్టిన తేదీ": {
      message:
        "పుట్టిన తేదీ అప్‌డేట్ చేయడానికి:\n1. సపోర్ట్‌ను సంప్రదించండి (నేరుగా మార్చలేరు)\n2. సరైన జన్మ తేదీతో చెల్లుబాటు అయ్యే ID ప్రూఫ్ అందించండి\n3. మార్పు కారణాన్ని వివరించండి\n4. ధృవీకరణ అవసరం\n5. [www.jaimax.com/support](https://www.jaimax.com/support) ను సందర్శించండి",
      options: [],
    },
    "చిరునామా అప్‌డేట్": {
      message:
        "చిరునామా అప్‌డేట్ చేయడానికి:\n1. 'ప్రొఫైల్' విభాగానికి వెళ్లండి\n2. 'చిరునామా ఎడిట్ చేయండి' పై క్లిక్ చేయండి\n3. కొత్త చిరునామా వివరాలను నమోదు చేయండి\n4. చిరునామా ప్రూఫ్ డాక్యుమెంట్‌ను అప్‌లోడ్ చేయండి\n5. ధృవీకరణ కోసం సమర్పించండి\n6. 1-2 వ్యాపార దినాల్లో అప్‌డేట్ ప్రాసెస్ అవుతుంది",
      options: [],
    },
    "సంప్రదింపు వివరాలు": {
      message: "అప్‌డేట్ చేయవలసిన సంప్రదింపు వివరాన్ని ఎంచుకోండి:",
      options: ["ఇమెయిల్ అప్‌డేట్", "ఫోన్ నంబర్", "కమ్యూనికేషన్ ప్రాధాన్యతలు"],
    },
    "ఇమెయిల్ అప్‌డేట్": {
      message:
        "ఇమెయిల్ అప్‌డేట్ చేయడానికి:\n1. 'ప్రొఫైల్' విభాగానికి వెళ్లండి\n2. 'ఇమెయిల్ మార్చు' పై క్లిక్ చేయండి\n3. కొత్త ఇమెయిల్ చిరునామాను నమోదు చేయండి\n4. ప్రస్తుత పాస్‌వర్డ్‌ను ధృవీకరించండి\n5. పాత ఇమెయిల్‌కు OTP ద్వారా నిర్ధారించండి\n6. కొత్త ఇమెయిల్‌ను OTP తో ధృవీకరించండి\n7. ఇమెయిల్ విజయవంతంగా అప్‌డేట్ అయింది",
      options: [],
    },
    "ఫోన్ నంబర్": {
      message:
        "ఫోన్ నంబర్ అప్‌డేట్ చేయడానికి:\n1. 'ప్రొఫైల్' విభాగానికి వెళ్లండి\n2. 'ఫోన్ మార్చు' పై క్లిక్ చేయండి\n3. కొత్త ఫోన్ నంబర్‌ను నమోదు చేయండి\n4. ప్రస్తుత పాస్‌వర్డ్‌ను ధృవీకరించండి\n5. పాత నంబర్‌కు OTP ద్వారా నిర్ధారించండి\n6. కొత్త నంబర్‌ను OTP తో ధృవీకరించండి\n7. ఫోన్ విజయవంతంగా అప్‌డేట్ అయింది",
      options: [],
    },
    "కమ్యూనికేషన్ ప్రాధాన్యతలు": {
      message:
        "కమ్యూనికేషన్ ప్రాధాన్యతలను అప్‌డేట్ చేయడానికి:\n1. 'సెట్టింగ్‌లు' విభాగానికి వెళ్లండి\n2. 'నోటిఫికేషన్‌లు'ని ఎంచుకోండి\n3. ఇమెయిల్/SMS ప్రాధాన్యతలను ఎంచుకోండి\n4. నోటిఫికేషన్ రకాలను ఎంచుకోండి\n5. ప్రాధాన్యతలను సేవ్ చేయండి\n\nఎంపికలు: ప్రమోషన్‌లు, లావాదేవీలు, భద్రతా హెచ్చరికలు, అప్‌డేట్‌లు",
      options: [],
    },
    "భద్రతా సెట్టింగ్‌లు": {
      message: "భద్రతా ఎంపికను ఎంచుకోండి:",
      options: [
        "టూ-ఫాక్టర్ ఆథెంటికేషన్",
        "పాస్‌వర్డ్ మార్చు",
        "లాగిన్ అలర్ట్‌లు",
      ],
    },
    "టూ-ఫాక్టర్ ఆథెంటికేషన్": {
      message:
        "2FA ఎనేబుల్ చేయడానికి:\n1. 'భద్రత' విభాగానికి వెళ్లండి\n2. '2FA ఎనేబుల్ చేయు' పై క్లిక్ చేయండి\n3. ఆథెంటికేటర్ యాప్‌ను డౌన్‌లోడ్ చేయండి\n4. యాప్‌తో QR కోడ్‌ను స్కాన్ చేయండి\n5. వెరిఫికేషన్ కోడ్‌ను నమోదు చేయండి\n6. బ్యాకప్ కోడ్‌లను సురక్షితంగా సేవ్ చేయండి\n7. 2FA విజయవంతంగా ఎనేబుల్ అయింది",
      options: [],
    },
    "పాస్‌వర్డ్ మార్చు": {
      message:
        "పాస్‌వర్డ్ మార్చడానికి:\n1. 'భద్రత' విభాగానికి వెళ్లండి\n2. 'పాస్‌వర్డ్ మార్చు' పై క్లిక్ చేయండి\n3. ప్రస్తుత పాస్‌వర్డ్‌ను నమోదు చేయండి\n4. కొత్త పాస్‌వర్డ్‌ను నమోదు చేయండి\n5. కొత్త పాస్‌వర్డ్‌ను నిర్ధారించండి\n6. ఎనేబుల్ చేయబడితే 2FA పూర్తి చేయండి\n7. పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది",
      options: [],
    },
    "లాగిన్ అలర్ట్‌లు": {
      message:
        "లాగిన్ అలర్ట్‌లను నిర్వహించడానికి:\n1. 'భద్రత' విభాగానికి వెళ్లండి\n2. 'లాగిన్ అలర్ట్‌లు'ని ఎంచుకోండి\n3. ఇమెయిల్ నోటిఫికేషన్‌లను ఎనేబుల్/డిసేబుల్ చేయండి\n4. SMS నోటిఫికేషన్‌లను ఎనేబుల్/డిసేబుల్ చేయండి\n5. అలర్ట్ ప్రాధాన్యతలను సెట్ చేయండి\n6. సెట్టింగ్‌లను సేవ్ చేయండి\n\n*భద్రత కోసం ఎనేబుల్ చేయడం మంచిది",
      options: [],
    },
  },
},
  // telugu: {
  //   // Header and Navigation
  //   supportTitle: " జైమాక్స్ సపోర్ట్",
  //   website: "🌐 వెబ్‌సైట్",
  //   reset: "🔄 రీసెట్",
  //   home: "🏠 హోమ్",
  //   support: "💬 సపోర్ట్",
  //   helpAvailable: "24/7 సహాయం అందుబాటులో",
  //   needMoreHelp: "మరింత సహాయం అవసరమా? మా సపోర్ట్ పేజీని సందర్శించండి",
  //   contactSupport: "సపోర్ట్‌ను సంప్రదించండి",
  //   poweredBy: "జైమాక్స్ AI అసిస్టెంట్ ద్వారా శక్తిని పొందింది",

  //   chatOptions: {
  //     initial: {
  //       message: "ప్రారంభించడానికి దయచేసి ఒక ఎంపికను ఎంచుకోండి.",
  //       options: [
  //         "INR డిపాజిట్లు/విత్‌డ్రాల్స్",
  //         "KYC/బ్యాంక్ ఖాతా",
  //         "సైన్ అప్ మరియు లాగిన్",
  //         "కూపన్లు/రెఫరల్స్",
  //         "క్రిప్టో డిపాజిట్లు/విత్‌డ్రాల్స్",
  //         "ప్రొఫైల్ అప్‌డేట్ చేయండి",
  //       ],
  //     },
  //     "సైన్ అప్ మరియు లాగిన్": {
  //       message: "దయచేసి ఒకటి ఎంచుకోండి:",
  //       options: [
  //         "సైన్ అప్ ఎలా చేయాలి?",
  //         "లాగిన్ ఎలా చేయాలి?",
  //         "మీ సమస్య ఏమిటి?",
  //       ],
  //     },
  //     "సైన్ అప్ ఎలా చేయాలి?": {
  //       message:
  //         "సైన్ అప్ చేయడానికి:\n1. మా అధికారిక సైట్ www.jaimax.com ను సందర్శించండి\n2. 'రిజిస్టర్' పై క్లిక్ చేయండి\n3. మీ వివరాలను నమోదు చేయండి\n4. OTP ద్వారా ధృవీకరించండి\n5. మీరు జైమాక్స్‌లో నమోదు అవుతారు!",
  //       options: [],
  //     },
  //     "లాగిన్ ఎలా చేయాలి?": {
  //       message:
  //         "లాగిన్ చేయడానికి:\n1. మా అధికారిక సైట్ www.jaimax.com ను సందర్శించండి\n2. 'లాగిన్' పై క్లిక్ చేయండి\n3. మీ క్రెడెన్షియల్స్ నమోదు చేయండి\n4. మీ డ్యాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి.",
  //       options: [],
  //     },
  //     "మీ సమస్య ఏమిటి?": {
  //       message: "మీ సమస్యను ఎంచుకోండి:",
  //       options: ["OTP రాలేదు", "పాస్‌వర్డ్ రీసెట్", "ఖాతా లాక్ చేయబడింది"],
  //     },
  //     "OTP రాలేదు": {
  //       message:
  //         "మీకు OTP రాకపోతే:\n- మీ స్పామ్ ఫోల్డర్‌ను తనిఖీ చేయండి\n- ఒక నిమిషం వేచి ఉండి మళ్లీ ప్రయత్నించండి\n- ఇంకా రాలేదా? సపోర్ట్‌ను సంప్రదించండి.",
  //       options: [],
  //     },
  //     "పాస్‌వర్డ్ రీసెట్": {
  //       message:
  //         "పాస్‌వర్డ్ రీసెట్ చేయడానికి:\n1. లాగిన్ పేజీలో 'పాస్‌వర్డ్ మర్చిపోయాను' పై క్లిక్ చేయండి\n2. మీ రిజిస్టర్డ్ ఇమెయిల్ నమోదు చేయండి\n3. OTP నమోదు చేసి ధృవీకరించండి\n4. అప్పుడు కొత్త పాస్‌వర్డ్ నమోదు చేయండి\n5. పాస్‌వర్డ్‌ను నిర్ధారించండి\n6. దాన్ని సబ్మిట్ చేయండి\n7. మీ పాస్‌వర్డ్ విజయవంతంగా మార్చబడుతుంది.",
  //       options: [],
  //     },
  //     "ఖాతా లాక్ చేయబడింది": {
  //       message:
  //         "విఫల ప్రయత్నాల కారణంగా మీ ఖాతా లాక్ అయితే, దాన్ని సురక్షితంగా అన్‌లాక్ చేయడానికి దయచేసి సపోర్ట్‌ను సంప్రదించండి.",
  //       options: [],
  //     },
  //     "INR డిపాజిట్లు/విత్‌డ్రాల్స్": {
  //       message: "దయచేసి ఒకటి ఎంచుకోండి:",
  //       options: ["INR డిపాజిట్", "INR విత్‌డ్రాల్", "లావాదేవీ సమస్యలు"],
  //     },
  //     "INR డిపాజిట్": {
  //       message: "డిపాజిట్ పద్ధతిని ఎంచుకోండి:",
  //       options: [
  //         "UPI డిపాజిట్",
  //         "బ్యాంక్ ట్రాన్స్‌ఫర్",
  //         "నెట్ బ్యాంకింగ్",
  //         "డిపాజిట్ పరిమితులు",
  //       ],
  //     },
  //     "UPI డిపాజిట్": {
  //       message:
  //         "UPI ద్వారా డిపాజిట్ చేయడానికి:\n1. 'డబ్బు జోడించండి' విభాగానికి వెళ్లండి\n2. UPI ఎంపికను ఎంచుకోండి\n3. మొత్తాన్ని నమోదు చేయండి (కనిష్టం ₹100)\n4. QR స్కాన్ చేయండి లేదా UPI ID నమోదు చేయండి\n5. చెల్లింపును పూర్తి చేయండి\n6. 2-5 నిమిషాలలో నిధులు కనిపిస్తాయి",
  //       options: [],
  //     },
  //   },
  // },
};

// export default function HumanAssistant({ onclose }) {
//   const [currentLanguage, setCurrentLanguage] = useState("english");
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatContainerRef = useRef(null);
//   const toggleRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userName, setUsername] = useState("");
//   const menuRef = useRef(null);

//   const toggleMenu = () => setMenuOpen((prev) => !prev);
//   // const handleCloseConversation = () => {
//   //   setMenuOpen(false);
//   //   onClose();
//   // };

//   // const handleDeleteConversation = () => {
//   //   setMenuOpen(false);
//   //   handleClearChat();
//   // };

//   // Initialize chat with selected language
//   useEffect(() => {
//     const initialMessage = {
//       type: "bot",
//       text: translations[currentLanguage].chatOptions.initial.message,
//       options: translations[currentLanguage].chatOptions.initial.options,
//     };
//     setChatHistory([initialMessage]);
//   }, [currentLanguage]);

//   // Auto-scroll to bottom when new messages are added
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   const handleLanguageChange = (language) => {
//     setCurrentLanguage(language);
//   };

//   const handleOptionClick = (option) => {
//     const userMessage = { type: "user", text: option };
//     const currentChatOptions = translations[currentLanguage].chatOptions;

//     const nextBot = currentChatOptions[option]
//       ? {
//           type: "bot",
//           text: currentChatOptions[option].message,
//           options: currentChatOptions[option].options,
//         }
//       : {
//           type: "bot",
//           text:
//             currentLanguage === "english"
//               ? "Thank you for your input. Our support team will reach out if needed."
//               : currentLanguage === "hindi"
//               ? "आपके इनपुट के लिए धन्यवाद। हमारी सहायता टीम आवश्यकता पड़ने पर संपर्क करेगी।"
//               : "మీ ఇన్‌పుట్‌కు ధన్యవాదాలు. అవసరమైతే మా సపోర్ట్ టీమ్ సంప్రదిస్తుంది.",
//           options: [],
//         };

//     setChatHistory((prev) => [...prev, userMessage, nextBot]);
//   };

//   const handleReset = () => {
//     const initialMessage = {
//       type: "bot",
//       text: translations[currentLanguage].chatOptions.initial.message,
//       options: translations[currentLanguage].chatOptions.initial.options,
//     };
//     setChatHistory([initialMessage]);
//   };

//   const handleWrapperClick = (e) => {
//     // Prevent closing if clicking on the menu toggle button
//     if (toggleRef.current && toggleRef.current.contains(e.target)) return;

//     // Prevent closing if clicking inside the open menu
//     if (menuRef.current && menuRef.current.contains(e.target)) return;

//     // Close the menu on any other click
//     if (menuOpen) {
//       setMenuOpen(false);
//     }
//   };
//   const handleNavigateToSupport = () => {
//     window.open("https://www.jaimax.com/support", "_blank");
//   };

//   const t = translations[currentLanguage];

//   return (
//     <div
//       onClick={handleWrapperClick}
//       className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border"
//     >
//       {/* Header */}
//       <div className="bg-[#085056] text-white p-4 font-semibold text-lg flex justify-between items-center">
//         <div className="flex  justify-between items-center gap-5 ">
//           <div
//             style={{ fontSize: "16px" }}
//             className={` rounded-full flex items-center justify-center`}
//           >
//             <img
//               src={logo}
//               alt="Logo"
//               width="40px"
//               className="object-contain max-w-full h-auto"
//             />
//           </div>
//           <span clas>{t.supportTitle}</span>
//         </div>

//         <div className="relative">
//           <button
//             onClick={toggleMenu}
//             className="text-white text-3xl px-3 py-2 rounded-full  transition-all duration-200"
//           >
//             ⋮
//           </button>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: -10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: -10 }}
//               transition={{ duration: 0.2 }}
//               className="absolute right-0 top-8 w-40 shadow-2xl border border-white/20 rounded-2xl   z-50 backdrop-blur-md"
//               style={{
//                 backgroundColor: "#085056",
//               }}
//             >
//               <div className="relative z-10">
//                 <button
//                   onClick={() => handleLanguageChange("telugu")}
//                   className="group flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200" />
//                   <span className="font-medium">Telugu </span>
//                 </button>
//                 <button
//                   onClick={() => handleLanguageChange("hindi")}
//                   className="group flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200" />
//                   <span className="font-medium">Hindi</span>
//                 </button>
//                 <button
//                   onClick={() => handleLanguageChange("english")}
//                   className="group flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200" />
//                   <span className="font-medium">English</span>
//                 </button>

//                 <button
//                   onClick={onclose}
//                   className="group flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200" />
//                   <span className="font-medium">Close</span>
//                 </button>

//                 <button
//                   onClick={handleReset}
//                   className="group flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-300 group-hover:text-red-200 group-hover:scale-110 transition-all duration-200" />
//                   <span className="font-medium">Reset</span>
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       {/* <div className="bg-[#0c6168] text-white px-4 py-2 flex justify-between items-center text-sm border-b border-[#085056]">
//         <div className="flex space-x-4">
//           <button
//             onClick={handleNavigateToWebsite}
//             className="hover:text-gray-200 transition-colors flex items-center space-x-1"
//           >
//             <span>{t.home}</span>
//           </button>
//           <button
//             onClick={handleNavigateToSupport}
//             className="hover:text-gray-200 transition-colors flex items-center space-x-1"
//           >
//             <span>{t.support}</span>
//           </button>
//         </div>
//       </div> */}

//       {/* Chat Container */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         {chatHistory.map((entry, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               entry.type === "bot" ? "justify-start" : "justify-end"
//             } animate-fadeIn`}
//           >
//             <div
//               className={`px-4 py-2 rounded-lg whitespace-pre-wrap max-w-[90%] ${
//                 entry.type === "bot"
//                   ? "bg-white-100 text-gray-800 "
//                   : "bg-[#085056] text-white shadow-md"
//               }`}
//             >
//               <div>
//                 {/* <ReactMarkdown>{entry.text}</ReactMarkdown> */}

//                 <ReactMarkdown
//                   components={{
//                     a: ({ node, ...props }) => (
//                       <a
//                         {...props}
//                         className="text-blue-500 underline hover:text-blue-700"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       />
//                     ),
//                   }}
//                 >
//                   {entry.text}
//                 </ReactMarkdown>
//               </div>
//               {entry.options?.length > 0 && (
//                 <div className="flex flex-col space-y-2 mt-3">
//                   {entry.options.map((opt, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handleOptionClick(opt)}
//                       className="bg-white hover:bg-gray-50 border border-gray-500 text-sm py-2 px-4 rounded-md text-center font-medium cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#085056] text-gray-700 hover:text-[#085056]"
//                     >
//                       <ReactMarkdown>{opt}</ReactMarkdown>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t bg-gray-50">
//         <div className="flex justify-between items-center">
//           <div className="text-xs text-gray-600">{t.needMoreHelp}</div>
//           <button
//             onClick={handleNavigateToSupport}
//             className="bg-[#085056] hover:bg-[#0a5d63] text-white px-3 py-1 rounded text-xs transition-colors"
//           >
//             {t.contactSupport}
//           </button>
//         </div>
//         <div className="text-xs text-gray-500 text-center mt-2">
//           {t.poweredBy}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function HumanAssistant({ onclose }) {
//   const [currentLanguage, setCurrentLanguage] = useState("english");
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatContainerRef = useRef(null);
//   const toggleRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userName, setUsername] = useState("");
//   const menuRef = useRef(null);

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   // Initialize chat with selected language
//   useEffect(() => {
//     const initialMessage = {
//       type: "bot",
//       text: translations[currentLanguage].chatOptions.initial.message,
//       options: translations[currentLanguage].chatOptions.initial.options,
//     };
//     setChatHistory([initialMessage]);
//   }, [currentLanguage]);

//   // Auto-scroll
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   const handleLanguageChange = (language) => setCurrentLanguage(language);

//   const handleOptionClick = (option) => {
//     const userMessage = { type: "user", text: option };
//     const currentChatOptions = translations[currentLanguage].chatOptions;

//     const nextBot = currentChatOptions[option]
//       ? {
//           type: "bot",
//           text: currentChatOptions[option].message,
//           options: currentChatOptions[option].options,
//         }
//       : {
//           type: "bot",
//           text:
//             currentLanguage === "english"
//               ? "Thank you for your input. Our support team will reach out if needed."
//               : currentLanguage === "hindi"
//               ? "आपके इनपुट के लिए धन्यवाद। हमारी सहायता टीम आवश्यकता पड़ने पर संपर्क करेगी।"
//               : "మీ ఇన్‌పుట్‌కు ధన్యవాదాలు. అవసరమైతే మా సపోర్ట్ టీమ్ సంప్రదిస్తుంది.",
//           options: [],
//         };

//     setChatHistory((prev) => [...prev, userMessage, nextBot]);
//   };

//   const handleReset = () => {
//     const initialMessage = {
//       type: "bot",
//       text: translations[currentLanguage].chatOptions.initial.message,
//       options: translations[currentLanguage].chatOptions.initial.options,
//     };
//     setChatHistory([initialMessage]);
//   };

//   const handleWrapperClick = (e) => {
//     if (toggleRef.current && toggleRef.current.contains(e.target)) return;
//     if (menuRef.current && menuRef.current.contains(e.target)) return;
//     if (menuOpen) setMenuOpen(false);
//   };

//   const handleNavigateToSupport = () => {
//     window.open("https://www.jaimax.com/support", "_blank");
//   };

//   const t = translations[currentLanguage];

//   return (
//     <div
//       onClick={handleWrapperClick}
//       className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200"
//     >
//       {/* Header */}
//       <div className="bg-[#085056] text-white p-4 font-semibold text-lg flex justify-between items-center shadow-md">
//         <div className="flex gap-3 items-center">
//           <img
//             src={logo}
//             alt="Logo"
//             width="40"
//             className="object-contain rounded-full border border-white/30"
//           />
//           <span>{t.supportTitle}</span>
//         </div>
//         <div className="relative" ref={toggleRef}>
//           <button
//             onClick={toggleMenu}
//             className="text-white text-2xl px-2 py-1 rounded-full hover:bg-white/10 transition"
//           >
//             ⋮
//           </button>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: -10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: -10 }}
//               transition={{ duration: 0.2 }}
//               ref={menuRef}
//               className="absolute right-0 top-10 w-44 bg-[#085056] rounded-xl shadow-xl overflow-hidden"
//             >
//               <button
//                 onClick={() => handleLanguageChange("telugu")}
//                 className="px-4 py-3 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
//               >
//                 Telugu
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("hindi")}
//                 className="px-4 py-3 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
//               >
//                 Hindi
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("english")}
//                 className="px-4 py-3 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
//               >
//                 English
//               </button>
//               <button
//                 onClick={onclose}
//                 className="px-4 py-3 w-full text-sm text-left text-white hover:bg-red-500/20"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleReset}
//                 className="px-4 py-3 w-full text-sm text-left text-white hover:bg-yellow-500/20"
//               >
//                 Reset
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Chat */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
//       >
//         {chatHistory.map((entry, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               entry.type === "bot" ? "justify-start" : "justify-end"
//             } animate-fadeIn`}
//           >
//             <div
//               className={`px-4 py-2 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${
//                 entry.type === "bot"
//                   ? "bg-white text-gray-800 rounded-bl-none"
//                   : "bg-[#085056] text-white rounded-br-none"
//               }`}
//             >
//               <ReactMarkdown
//                 components={{
//                   a: ({ node, ...props }) => (
//                     <a
//                       {...props}
//                       className="text-blue-500 underline hover:text-blue-700"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     />
//                   ),
//                 }}
//               >
//                 {entry.text}
//               </ReactMarkdown>
//               {entry.options?.length > 0 && (
//                 <div className="flex flex-col space-y-2 mt-3">
//                   {entry.options.map((opt, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handleOptionClick(opt)}
//                       className="bg-white border border-gray-300 hover:border-[#085056] text-sm py-2 px-3 rounded-lg shadow-sm hover:shadow-md transition"
//                     >
//                       <ReactMarkdown>{opt}</ReactMarkdown>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t bg-white shadow-sm">
//         <div className="flex justify-between items-center">
//           <span className="text-xs text-gray-600">{t.needMoreHelp}</span>
//           <button
//             onClick={handleNavigateToSupport}
//             className="bg-[#085056] hover:bg-[#0a6e74] text-white px-3 py-1 rounded-lg text-xs transition"
//           >
//             {t.contactSupport}
//           </button>
//         </div>
//         <p className="text-center text-xs text-gray-400 mt-2">{t.poweredBy}</p>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function HumanAssistant({ onclose }) {
//   const [currentLanguage, setCurrentLanguage] = useState("english");
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatContainerRef = useRef(null);
//   const toggleRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userName, setUsername] = useState("");
//   const menuRef = useRef(null);

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   // Initialize chat with selected language
//   useEffect(() => {
//     const initialMessage = {
//       type: "bot",
//       text: translations[currentLanguage].chatOptions.initial.message,
//       options: translations[currentLanguage].chatOptions.initial.options,
//     };
//     setChatHistory([initialMessage]);
//   }, [currentLanguage]);

//   // Auto-scroll
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   const handleLanguageChange = (language) => setCurrentLanguage(language);

//   const handleOptionClick = (option) => {
//     const userMessage = { type: "user", text: option };
//     const currentChatOptions = translations[currentLanguage].chatOptions;

//     const nextBot = currentChatOptions[option]
//       ? {
//           type: "bot",
//           text: currentChatOptions[option].message,
//           options: currentChatOptions[option].options,
//         }
//       : {
//           type: "bot",
//           text:
//             currentLanguage === "english"
//               ? "Thank you for your input. Our support team will reach out if needed."
//               : currentLanguage === "hindi"
//               ? "आपके इनपुट के लिए धन्यवाद। हमारी सहायता टीम आवश्यकता पड़ने पर संपर्क करेगी।"
//               : "మీ ఇన్‌పుట్‌కు ధన్యవాదాలు. అవసరమైతే మా సపోర్ట్ టీమ్ సంప్రదిస్తుంది.",
//           options: [],
//         };

//     setChatHistory((prev) => [...prev, userMessage, nextBot]);
//   };

//   const handleReset = () => {
//     const initialMessage = {
//       type: "bot",
//       text: translations[currentLanguage].chatOptions.initial.message,
//       options: translations[currentLanguage].chatOptions.initial.options,
//     };
//     setChatHistory([initialMessage]);
//   };

//   const handleWrapperClick = (e) => {
//     if (toggleRef.current && toggleRef.current.contains(e.target)) return;
//     if (menuRef.current && menuRef.current.contains(e.target)) return;
//     if (menuOpen) setMenuOpen(false);
//   };

//   const handleNavigateToSupport = () => {
//     window.open("https://www.jaimax.com/support", "_blank");
//   };

//   const t = translations[currentLanguage];

//   return (
//    <div
//   onClick={handleWrapperClick}
//   className="
//     fixed bottom-4 right-4
//     w-[90%] sm:w-[380px]    /* full width on small screens, fixed on >=640px */
//     h-[75vh] sm:h-[550px]  /* flexible height on small screens */
//     bg-white rounded-xl sm:rounded-2xl
//     shadow-xl border border-gray-200
//     flex flex-col overflow-hidden
//     z-[9999] p-2 sm:p-0
//   "
// >
//       {/* Header */}
//       <div className="bg-[#085056] text-white p-4 font-semibold text-base flex justify-between items-center shadow-md">
//         <div className="flex gap-2.5 items-center">
//           <img
//             src={logo}
//             alt="Logo"
//             width="36"
//             className="object-contain rounded-full border border-white/30"
//           />
//           <span>{t.supportTitle}</span>
//         </div>
//         <div className="relative" ref={toggleRef}>
//           <button
//             onClick={toggleMenu}
//             className="text-white text-xl px-2 py-1 rounded-full hover:bg-white/10 transition"
//           >
//             ⋮
//           </button>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: -10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: -10 }}
//               transition={{ duration: 0.2 }}
//               ref={menuRef}
//               className="absolute right-0 top-10 w-44 bg-[#085056] rounded-xl shadow-xl overflow-hidden"
//             >
//               <button
//                 onClick={() => handleLanguageChange("telugu")}
//                 className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
//               >
//                 Telugu
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("hindi")}
//                 className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
//               >
//                 Hindi
//               </button>
//               <button
//                 onClick={() => handleLanguageChange("english")}
//                 className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
//               >
//                 English
//               </button>
//               <button
//                 onClick={onclose}
//                 className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-red-500/20"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleReset}
//                 className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-yellow-500/20"
//               >
//                 Reset
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Chat */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
//       >
//         {chatHistory.map((entry, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               entry.type === "bot" ? "justify-start" : "justify-end"
//             } animate-fadeIn`}
//           >
//             <div
//               className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${
//                 entry.type === "bot"
//                   ? "bg-white text-gray-800 rounded-bl-none"
//                   : "bg-[#085056] text-white rounded-br-none"
//               }`}
//             >
//               <ReactMarkdown
//                 components={{
//                   a: ({ node, ...props }) => (
//                     <a
//                       {...props}
//                       className="text-blue-500 underline hover:text-blue-700"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     />
//                   ),
//                 }}
//               >
//                 {entry.text}
//               </ReactMarkdown>
//               {entry.options?.length > 0 && (
//                 <div className="flex flex-col space-y-2 mt-2.5">
//                   {entry.options.map((opt, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handleOptionClick(opt)}
//                       className="bg-white border border-gray-300 hover:border-[#085056] text-sm py-2 px-3 rounded-lg shadow-sm hover:shadow-md transition"
//                     >
//                       <ReactMarkdown>{opt}</ReactMarkdown>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t bg-white shadow-sm">
//         <div className="flex justify-between items-center">
//           <span className="text-xs text-gray-600">{t.needMoreHelp}</span>
//           <button
//             onClick={handleNavigateToSupport}
//             className="bg-[#085056] hover:bg-[#0a6e74] text-white px-3.5 py-1.5 rounded-lg text-xs transition"
//           >
//             {t.contactSupport}
//           </button>
//         </div>
//         <p className="text-center text-xs text-gray-400 mt-2.5">{t.poweredBy}</p>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

export default function HumanAssistant({ onclose }) {
  const [currentLanguage, setCurrentLanguage] = useState("english");
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);
  const toggleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const initialMessage = {
      type: "bot",
      text: translations[currentLanguage].chatOptions.initial.message,
      options: translations[currentLanguage].chatOptions.initial.options,
    };
    setChatHistory([initialMessage]);
  }, [currentLanguage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleLanguageChange = (language) => setCurrentLanguage(language);

  const handleOptionClick = (option) => {
    const userMessage = { type: "user", text: option };
    const currentChatOptions = translations[currentLanguage].chatOptions;

    const nextBot = currentChatOptions[option]
      ? {
          type: "bot",
          text: currentChatOptions[option].message,
          options: currentChatOptions[option].options,
        }
      : {
          type: "bot",
          text:
            currentLanguage === "english"
              ? "Thank you for your input. Our support team will reach out if needed."
              : currentLanguage === "hindi"
              ? "आपके इनपुट के लिए धन्यवाद। हमारी सहायता टीम आवश्यकता पड़ने पर संपर्क करेगी।"
              : "మీ ఇన్‌పుట్‌కు ధన్యవాదాలు. అవసరమైతే మా సపోర్ట్ టీమ్ సంప్రదిస్తుంది.",
          options: [],
        };

    setChatHistory((prev) => [...prev, userMessage, nextBot]);
  };

  const handleReset = () => {
    const initialMessage = {
      type: "bot",
      text: translations[currentLanguage].chatOptions.initial.message,
      options: translations[currentLanguage].chatOptions.initial.options,
    };
    setChatHistory([initialMessage]);
  };

  const handleWrapperClick = (e) => {
    if (toggleRef.current && toggleRef.current.contains(e.target)) return;
    if (menuRef.current && menuRef.current.contains(e.target)) return;
    if (menuOpen) setMenuOpen(false);
  };

  const handleNavigateToSupport = () => {
    window.open("https://www.jaimax.com/support", "_blank");
  };

  const t = translations[currentLanguage];

  return (
    <div
      onClick={handleWrapperClick}
      className="
        fixed bottom-0 right-0 sm:bottom-6 sm:right-6
        w-full sm:w-[380px]
        h-screen sm:h-[550px]
        bg-white rounded-none sm:rounded-2xl
        shadow-2xl flex flex-col overflow-hidden
        z-[9999] border border-gray-200
      "
    >
      {/* Header */}
      <div className="bg-[#085056] text-white p-4 font-semibold text-base flex justify-between items-center shadow-md">
        <div className="flex gap-2.5 items-center">
          <img
            src={logo}
            alt="Logo"
            width="36"
            className="object-contain rounded-full border border-white/30"
          />
          <span>{t.supportTitle}</span>
        </div>
        <div className="relative" ref={toggleRef}>
          <button
            onClick={toggleMenu}
            className="text-white text-xl px-2 py-1 rounded-full hover:bg-white/10 transition"
          >
            ⋮
          </button>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              ref={menuRef}
              className="absolute right-0 top-10 w-44 bg-[#085056] rounded-xl shadow-xl overflow-hidden z-[9999]"
            >
              <button
                onClick={() => handleLanguageChange("telugu")}
                className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
              >
                Telugu
              </button>
              <button
                onClick={() => handleLanguageChange("hindi")}
                className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
              >
                Hindi
              </button>
              <button
                onClick={() => handleLanguageChange("english")}
                className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-[#0a6e74] transition"
              >
                English
              </button>
              <button
                onClick={onclose}
                className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-red-500/20"
              >
                Close
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2.5 w-full text-sm text-left text-white hover:bg-yellow-500/20"
              >
                Reset
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chat */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
      >
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`flex ${
              entry.type === "bot" ? "justify-start" : "justify-end"
            } animate-fadeIn`}
          >
            <div
              className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${
                entry.type === "bot"
                  ? "bg-white text-gray-800 rounded-bl-none"
                  : "bg-[#085056] text-white rounded-br-none"
              }`}
            >
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-500 underline hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {entry.text}
              </ReactMarkdown>
              {entry.options?.length > 0 && (
                <div className="flex flex-col space-y-2 mt-2.5">
                  {entry.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-white border border-gray-300 hover:border-[#085056] text-sm py-2 px-3 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                      <ReactMarkdown>{opt}</ReactMarkdown>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">{t.needMoreHelp}</span>
          <button
            onClick={handleNavigateToSupport}
            className="bg-[#085056] hover:bg-[#0a6e74] text-white px-3.5 py-1.5 rounded-lg text-xs transition"
          >
            {t.contactSupport}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2.5">
          {t.poweredBy}
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

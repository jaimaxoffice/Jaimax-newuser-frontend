// import axios from "axios";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { useState } from "react";
// import * as Yup from "yup";

// // import Seo from "../global/Seo";
// // Validation Schema using Yup
// const ContactSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Name is too short")
//     .max(50, "Name is too long")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   phone: Yup.string()
//     .transform((value) => value?.replace(/\s+/g, "") || "")
//     .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//     .required("Phone number is required"),
//   message: Yup.string()
//     .min(10, "Message is too short")
//     .required("Message is required"),
// });

// const ContactComponent = () => {
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); // 'success' or 'error'

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     setSubmitMessage("");
//     setMessageType("");

//     try {
//       // DON'T convert phone to number - keep as string for backend validation
//       const submitData = {
//         ...values,
//         // Keep phone as string and clean the data
//         phone: values.phone.toString().trim(),
//         name: values.name.trim(),
//         email: values.email.trim(),
//         message: values.message.trim(),
//       };

//       const response = await axios.post(
//         "",
//         submitData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         },
//       );

//       // Handle successful response
//       console.log("Success response:", response);

//       if (response.status === 200) {
//         setSubmitMessage(
//           response.data.message ||
//             "Thank you! Your message has been sent successfully. We'll get back to you soon.",
//         );
//         setMessageType("success");
//         resetForm();

//         // Optional: Auto close modal/form after success
//         setTimeout(() => {
//           // handleClose(); // Uncomment if you have a close function
//         }, 3000);
//       }
//     } catch (error) {
//       console.error("Submission error:", error);

//       // Handle different error scenarios with Axios
//       if (error.response) {
//         // Server responded with error status (4xx, 5xx)
//         const status = error.response.status;
//         const errorData = error.response.data;
//         const errorMessage = errorData?.error || errorData?.message;

//         console.log("Error response:", error.response);

//         switch (status) {
//           case 400:
//             setSubmitMessage(
//               errorMessage || "Please check your information and try again.",
//             );
//             break;
//           case 404:
//             setSubmitMessage("Service not found. Please try again later.");
//             break;
//           case 429:
//             setSubmitMessage(
//               "Too many requests. Please wait a moment and try again.",
//             );
//             break;
//           case 500:
//             setSubmitMessage(
//               errorMessage || "Server error. Please try again later.",
//             );
//             break;
//           case 502:
//           case 503:
//           case 504:
//             setSubmitMessage(
//               "Service temporarily unavailable. Please try again in a few minutes.",
//             );
//             break;
//           default:
//             setSubmitMessage(
//               errorMessage || "Something went wrong. Please try again later.",
//             );
//         }
//       } else if (error.request) {
//         // Request was made but no response received (network error)
//         console.log("Network error:", error.request);

//         if (error.code === "ECONNABORTED") {
//           setSubmitMessage(
//             "Request timeout. Please check your connection and try again.",
//           );
//         } else if (error.message.includes("Network Error")) {
//           setSubmitMessage(
//             "Network error. Please check your internet connection and try again.",
//           );
//         } else {
//           setSubmitMessage(
//             "Unable to connect to server. Please check your internet connection and try again.",
//           );
//         }
//       } else {
//         // Something else happened
//         console.log("Other error:", error.message);
//         setSubmitMessage("An unexpected error occurred. Please try again.");
//       }

//       setMessageType("error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* <Seo
//         title="Best Interior Architects in Hyderabad | J&B Fine Desings"
//         description="Reach out to J&B Fine Designs today for a free interior design consultation in Hyderabad. Let’s bring your dream space to life."
//         keywords="Interior Designer Near Me Hyderabad"
//         canonical="https://www.jbfinedesigns.com/top-interior-architects-hyderabad"
//       /> */}

//       <div className="bg-white text-gray-800">
//         {/* Contact Us Header */}
//         <div className="w-full bg-gradient-to-br from-gray-900 via-emerald-900 to-slate-800 py-16 relative">
//           <div className="absolute top-0 left-0 w-1/3 h-full opacity-20">
//             <div className="w-full h-full bg-emerald-300 rounded-full blur-3xl"></div>
//           </div>
//           <div className="container mx-auto px-4 ">
//             <h1 className="text-4xl font-bold text-center text-white">
//               CONTACT US
//             </h1>
//           </div>
//         </div>

//         {/* Main Contact Section */}
//         <div className="container mx-auto px-4 py-12 relative">
//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Left Column - Get In Touch */}
//             <div className="w-full md:w-1/2">
//               <h2 className="text-3xl font-bold mb-4 text-emerald-700">
//                 Get In Touch
//               </h2>
//               <p className="text-gray-600 mb-8">
//                 We're here to help and answer any questions you might have. We
//                 look forward to hearing from you.
//               </p>

//               {/* Location Cards */}
//               <div className="space-y-6">
//                 {/* Jimbaran Location */}
//                 <div className="flex items-center gap-4">
//                   <div className="bg-emerald-100 rounded-full p-4">
//                     <div className="w-10 h-10 flex items-center justify-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-8 w-8 text-emerald-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-emerald-600">
//                       Jaimax
//                     </h3>
//                     <p className="text-gray-600">
//                       4th Floor, Vaishnavi's Cynosure, Survey No :18, India building, Gachibowli, Hyderabad, Telangana 500032
//                     </p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 text-emerald-600"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       <p className="text-sm text-gray-500">
//                         Mon - Fri: 9:00 AM - 6:00 PM | Sat & Sun: Closed
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Contact Form with Formik */}
//             <div className="w-full md:w-1/2">
//               <div className="bg-white shadow-lg rounded-lg p-8 border border-emerald-100 relative z-10">
//                 <h3 className="text-xl font-semibold mb-6 text-emerald-700">
//                   Your Details
//                 </h3>

//                 {/* Status Message */}
//                 {submitMessage && (
//                   <div
//                     className={`mb-4 p-4 rounded-lg ${
//                       messageType === "success"
//                         ? "bg-green-100 border border-green-400 text-green-700"
//                         : "bg-red-100 border border-red-400 text-red-700"
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       {messageType === "success" ? (
//                         <svg
//                           className="w-5 h-5 mr-2"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           className="w-5 h-5 mr-2"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                       <span className="text-sm font-medium">
//                         {submitMessage}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Formik Form */}
//                 <Formik
//                   initialValues={{
//                     name: "",
//                     email: "",
//                     phone: "",
//                     message: "",
//                   }}
//                   validationSchema={ContactSchema}
//                   onSubmit={handleSubmit}
//                 >
//                   {({
//                     isSubmitting,
//                     errors,
//                     touched,
//                     handleChange,
//                     setFieldValue,
//                   }) => (
//                     <Form>
//                       {/* Name and Email row */}
//                       <div className="flex flex-col md:flex-row gap-4 mb-4">
//                         <div className="w-full md:w-1/2">
//                           <label className="block text-sm mb-1 text-gray-700">
//                             Name <span className="text-emerald-600">*</span>
//                           </label>
//                           <Field
//                             type="text"
//                             name="name"
//                             placeholder="Your Name"
//                             className={`w-full bg-emerald-50 border ${
//                               errors.name && touched.name
//                                 ? "border-red-500"
//                                 : "border-emerald-200"
//                             } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                           />
//                           <ErrorMessage
//                             name="name"
//                             component="div"
//                             className="text-red-500 text-xs mt-1"
//                           />
//                         </div>
//                         <div className="w-full md:w-1/2">
//                           <label className="block text-sm mb-1 text-gray-700">
//                             Email Address{" "}
//                             <span className="text-emerald-600">*</span>
//                           </label>
//                           <Field
//                             type="email"
//                             name="email"
//                             placeholder="Your Email"
//                             className={`w-full bg-emerald-50 border ${
//                               errors.email && touched.email
//                                 ? "border-red-500"
//                                 : "border-emerald-200"
//                             } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                           />
//                           <ErrorMessage
//                             name="email"
//                             component="div"
//                             className="text-red-500 text-xs mt-1"
//                           />
//                         </div>
//                       </div>

//                       {/* phone */}
//                       <div className="mb-4">
//                         <label className="block text-sm mb-1 text-gray-700">
//                           Phone <span className="text-emerald-600">*</span>
//                         </label>
//                         <Field
//                           type="text"
//                           name="phone"
//                           placeholder="Phone number"
//                           onChange={(e) => {
//                             // Remove spaces automatically as user types
//                             const value = e.target.value.replace(/\s+/g, "");
//                             setFieldValue("phone", value);
//                           }}
//                           className={`w-full bg-emerald-50 border ${
//                             errors.phone && touched.phone
//                               ? "border-red-500"
//                               : "border-emerald-200"
//                           } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                         />
//                         <ErrorMessage
//                           name="phone"
//                           component="div"
//                           className="text-red-500 text-xs mt-1"
//                         />
//                       </div>

//                       {/* Message */}
//                       <div className="mb-6">
//                         <label className="block text-sm mb-1 text-gray-700">
//                           Message <span className="text-emerald-600">*</span>
//                         </label>
//                         <Field
//                           as="textarea"
//                           name="message"
//                           placeholder="Your Message"
//                           rows="4"
//                           className={`w-full bg-emerald-50 border ${
//                             errors.message && touched.message
//                               ? "border-red-500"
//                               : "border-emerald-200"
//                           } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                         />
//                         <ErrorMessage
//                           name="message"
//                           component="div"
//                           className="text-red-500 text-xs mt-1"
//                         />
//                       </div>

//                       {/* Submit Button */}
//                       <div className="text-center">
//                         <button
//                           type="submit"
//                           disabled={isSubmitting}
//                           className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors duration-300 flex items-center justify-center mx-auto"
//                         >
//                           {isSubmitting ? (
//                             <span className="flex items-center">
//                               <svg
//                                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <circle
//                                   className="opacity-25"
//                                   cx="12"
//                                   cy="12"
//                                   r="10"
//                                   stroke="currentColor"
//                                   strokeWidth="4"
//                                 ></circle>
//                                 <path
//                                   className="opacity-75"
//                                   fill="currentColor"
//                                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                 ></path>
//                               </svg>
//                               Submitting...
//                             </span>
//                           ) : (
//                             "Submit"
//                           )}
//                         </button>
//                       </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-full h-96 bg-gray-100 relative mt-[-0px] md:mt-[-100px] ">
//          <iframe
//   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4816658237605!2d78.36422667462804!3d17.43664550138531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e668e1daef%3A0x4bfeabd499a8d3d0!2sJaimax!5e0!3m2!1sen!2sin!4v1773836184607!5m2!1sen!2sin"
//   className="absolute inset-0 w-full h-full z-0"
//   style={{ border: 0 }}
//   allowFullScreen
//   loading="lazy"
//   referrerPolicy="no-referrer-when-downgrade"
// />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactComponent;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, Phone, X } from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSubmitEnquiryMutation } from "../../pages/home/HomePageApiSlice";

// Validation Schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(8, "Phone must be at least 8 digits")
    .max(15, "Phone must be at most 15 digits")
    .matches(
      /^[0-9()+-\s]*$/,
      "Phone must contain only numbers or symbols (+ -)",
    )
    .required("Phone is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactComponent = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // RTK Query mutation
  const [submitEnquiry, { isError, error }] = useSubmitEnquiryMutation();

  // ── Modal animation variants ───────────────────────────────────────────────
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
  };

  const confettiVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: [0, 1, 1, 0],
      y: [0, -30, 100],
      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
      rotate: [0, 360],
      transition: { duration: 2, delay: 0.3 + i * 0.1, ease: "easeOut" },
    }),
  };

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitMessage("");

    try {
      await submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.toString().trim(),
        message: values.message.trim(),
      }).unwrap();

      resetForm();
      setShowThankYou(true);
    } catch (err) {
      setSubmitMessage(
        err?.data?.message || "Failed to send message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Thank You Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setShowThankYou(false)}
          >
            <motion.div
              className="relative w-full max-w-sm bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-xl p-5 shadow-2xl border border-white/20"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <motion.div
                  className="mx-auto w-14 h-14 bg-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-400/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle className="w-7 h-7 text-white" />
                </motion.div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={confettiVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute top-1/2 left-1/2"
                      style={{
                        width: i % 3 === 0 ? "12px" : "8px",
                        height: i % 3 === 0 ? "12px" : "8px",
                        borderRadius: i % 2 === 0 ? "50%" : "2px",
                        backgroundColor: [
                          "#34d399", "#22d3ee", "#fbbf24", "#f472b6",
                          "#a78bfa", "#34d399", "#fb7185", "#60a5fa",
                          "#34d399", "#22d3ee",
                        ][i],
                      }}
                    />
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">Thank You!</h3>
                <p className="text-emerald-300 text-sm font-semibold mb-3">
                  We're glad to hear from you!
                </p>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Your message has been sent successfully. We'll get back to you
                  within{" "}
                  <span className="text-emerald-300 font-semibold">24-48 hours</span>.
                </p>

                <motion.button
                  onClick={() => setShowThankYou(false)}
                  className="bg-emerald-400 text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-300 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Contact Section ─────────────────────────────────────────────── */}
      <div className="bg-white text-gray-800">
        {/* Header */}
        <div className="w-full bg-gradient-to-br from-gray-900 via-emerald-900 to-slate-800 py-16 relative">
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-20">
            <div className="w-full h-full bg-emerald-300 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-white">
              CONTACT US
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left — Get In Touch */}
            <div className="w-full md:w-1/2 overflow-y-scroll xl:overflow-hidden sm:h-96 p-4 xl:p-0">
              <h2 className="text-3xl font-bold mb-4 text-emerald-700">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-8">
                We're here to help and answer any questions you might have. We
                look forward to hearing from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 rounded-full p-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-emerald-600"
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
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-600">
                      Jaimax
                    </h3>
                    <p className="text-gray-600">
                      4th Floor, Vaishnavi's Cynosure, Survey No :18, India
                      building, Gachibowli, Hyderabad, Telangana 500032
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500">
                        Mon - Fri: 9:00 AM - 6:00 PM | Sat & Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start text-white space-x-5 my-5">
                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex justify-center items-center">
                      <Phone className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <a
                        href="tel:+919121799947"
                        title="contact us for the support"
                        className="text-gray-600 transition-colors duration-200 cursor-pointer"
                      >
                        +91 9121799947
                      </a>
                      <a
                        href="tel:+919121758880"
                        title="contact us for the support"
                        className="text-gray-600 transition-colors duration-200 cursor-pointer"
                      >
                        +91 9121758880
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center text-white space-x-5">
                    <div className="bg-emerald-100 w-12 h-12 rounded-full flex justify-center items-center">
                      <Mail className="h-6 w-6 text-emerald-600" />
                    </div>
                    <a
                      href="mailto:office@jaimax.com"
                      title="contact us for the support"
                      className="text-gray-600 transition-colors duration-200 cursor-pointer"
                    >
                      office@jaimax.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="w-full md:w-1/2">
              <div className="bg-white shadow-lg rounded-lg p-8 border border-emerald-100 relative z-10">
                <h3 className="text-xl font-semibold mb-6 text-emerald-700">
                  Your Details
                </h3>

                {/* Error banner */}
                {(submitMessage || isError) && (
                  <div className="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        {submitMessage ||
                          error?.data?.message ||
                          "Failed to send message. Please try again."}
                      </span>
                    </div>
                  </div>
                )}

                <Formik
                  initialValues={{ name: "", email: "", phone: "", message: "" }}
                  validationSchema={ContactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched, setFieldValue, isValid, dirty }) => (
                    <Form>
                      {/* Name + Email */}
                      <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="w-full md:w-1/2">
                          <label className="block text-sm mb-1 text-gray-700">
                            Name <span className="text-emerald-600">*</span>
                          </label>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className={`w-full bg-emerald-50 border ${
                              errors.name && touched.name
                                ? "border-red-500"
                                : "border-emerald-200"
                            } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div className="w-full md:w-1/2">
                          <label className="block text-sm mb-1 text-gray-700">
                            Email Address{" "}
                            <span className="text-emerald-600">*</span>
                          </label>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className={`w-full bg-emerald-50 border ${
                              errors.email && touched.email
                                ? "border-red-500"
                                : "border-emerald-200"
                            } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="mb-4">
                        <label className="block text-sm mb-1 text-gray-700">
                          Phone <span className="text-emerald-600">*</span>
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          placeholder="Phone number"
                          onChange={(e) => {
                            const value = e.target.value.replace(
                              /[^0-9()+\-\s]/g,
                              "",
                            );
                            setFieldValue("phone", value);
                          }}
                          className={`w-full bg-emerald-50 border ${
                            errors.phone && touched.phone
                              ? "border-red-500"
                              : "border-emerald-200"
                          } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label className="block text-sm mb-1 text-gray-700">
                          Message <span className="text-emerald-600">*</span>
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Your Message"
                          rows="4"
                          className={`w-full bg-emerald-50 border ${
                            errors.message && touched.message
                              ? "border-red-500"
                              : "border-emerald-200"
                          } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Submit */}
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isValid || !dirty}
                          className={`py-2 px-6 rounded-full text-sm font-medium transition-colors duration-300 flex items-center justify-center mx-auto ${
                            isSubmitting || !isValid || !dirty
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white"
                          }`}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Submitting...
                            </span>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-96 bg-gray-100 relative mt-[-0px] md:mt-[-100px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4816658237605!2d78.36422667462804!3d17.43664550138531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e668e1daef%3A0x4bfeabd499a8d3d0!2sJaimax!5e0!3m2!1sen!2sin!4v1773836184607!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full z-0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default ContactComponent;
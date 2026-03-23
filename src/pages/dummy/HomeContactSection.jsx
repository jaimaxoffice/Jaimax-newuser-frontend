// import { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle, X } from "lucide-react";
// import { useSubmitEnquiryMutation } from "../home/HomePageApiSlice";

// // Validation schema
// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, "Name must be at least 2 characters")
//     .max(50, "Name is too long")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   phone: Yup.string()
//     .min(8, "Phone must be at least 8 digits")
//     .max(15, "Phone must be at most 15 digits")
//     .matches(
//       /^[0-9()+-\s]*$/,
//       "Phone must contain only numbers or symbols (+ -)"
//     )
//     .required("Phone is required"),
//   message: Yup.string()
//     .min(10, "Message must be at least 10 characters")
//     .required("Message is required"),
// });

// const HomeContactSection = () => {
//   const [showThankYou, setShowThankYou] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const [submitEnquiry, { isLoading, isError, error }] =
//     useSubmitEnquiryMutation();

//   const formik = useFormik({
//     initialValues: { name: "", email: "", phone: "", message: "" },
//     validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       setSubmitError("");
//       try {
//         await submitEnquiry({
//           name: values.name.trim(),
//           email: values.email.trim(),
//           phone: values.phone.toString().trim(),
//           message: values.message.trim(),
//         }).unwrap();
//         resetForm();
//         setShowThankYou(true);
//       } catch (err) {
//         setSubmitError(
//           err?.data?.message || "Failed to send message. Please try again."
//         );
//       }
//     },
//   });

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 },
//     exit: { opacity: 0 },
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: {
//       opacity: 1, scale: 1, y: 0,
//       transition: { type: "spring", stiffness: 300, damping: 25 },
//     },
//     exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
//   };

//   const confettiVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: (i) => ({
//       opacity: [0, 1, 1, 0],
//       y: [0, -30, 100],
//       x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
//       rotate: [0, 360],
//       transition: { duration: 2, delay: 0.3 + i * 0.1, ease: "easeOut" },
//     }),
//   };

//   return (
//     <>
//       {/* ── Thank You Modal (doc5 teal/lime colors) ─────────────────────────── */}
//       <AnimatePresence>
//         {showThankYou && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             variants={overlayVariants}
//             initial="hidden" animate="visible" exit="exit"
//             onClick={() => setShowThankYou(false)}
//           >
//             <motion.div
//               className="relative w-full max-w-sm bg-gradient-to-br from-[#085056] to-[#0a6b73] rounded-xl p-5 shadow-2xl border border-white/20"
//               variants={modalVariants}
//               initial="hidden" animate="visible" exit="exit"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setShowThankYou(false)}
//                 className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
//                 aria-label="Close"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="text-center">
//                 <motion.div
//                   className="mx-auto w-14 h-14 bg-gradient-to-br from-[#c4d72d] to-[#a8bc1f] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#c4d72d]/30"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
//                 >
//                   <CheckCircle className="w-7 h-7 text-[#085056]" />
//                 </motion.div>

//                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                   {[...Array(10)].map((_, i) => (
//                     <motion.div
//                       key={i} custom={i}
//                       variants={confettiVariants}
//                       initial="hidden" animate="visible"
//                       className="absolute top-1/2 left-1/2"
//                       style={{
//                         width: i % 3 === 0 ? "12px" : "8px",
//                         height: i % 3 === 0 ? "12px" : "8px",
//                         borderRadius: i % 2 === 0 ? "50%" : "2px",
//                         backgroundColor: ["#c4d72d","#22d3ee","#fbbf24","#f472b6","#a78bfa","#34d399","#fb7185","#60a5fa","#c4d72d","#22d3ee"][i],
//                       }}
//                     />
//                   ))}
//                 </div>

//                 <h3 className="text-xl font-bold text-white mb-1">Thank You!</h3>
//                 <p className="text-[#c4d72d] text-sm font-semibold mb-3">
//                   We're glad to hear from you!
//                 </p>
//                 <p className="text-white/80 text-sm mb-4 leading-relaxed">
//                   Your message has been sent successfully. We'll get back to you
//                   within <span className="text-[#c4d72d] font-semibold">24-48 hours</span>.
//                 </p>
//                 <motion.button
//                   onClick={() => setShowThankYou(false)}
//                   className="bg-[#c4d72d] text-[#085056] font-bold py-2 px-6 rounded-full hover:bg-[#d4e737] transition-colors text-sm"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Got it!
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── Main Section ─────────────────────────────────────────────────────── */}
//       <section className="bg-[#085056] py-8 sm:py-12 lg:py-16 px-4">
//         <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

//           {/* ── Left column (doc5, unchanged) ── */}
//           <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 pr-20 lg:pr-16">
//             <h2 className="text-white font-extrabold leading-tight text-2xl sm:text-5xl md:text-2xl lg:text-5xl xl:text-7xl">
//               <span className="block">Let's get</span>
//               <span className="block">in touch</span>
//             </h2>

//             <p className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl lg:text-2xl text-[#c4d72d] font-semibold">
//               We are glad to hear from you!
//             </p>

//             <div className="mt-8 sm:mt-10 lg:mt-12 space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-white/90">
//               <div>
//                 <p className="font-semibold text-white">Phone</p>
//                 <p>(+91) 9121758880</p>
//                 <p>(+91) 9121799947</p>
//               </div>
//               <div>
//                 <p className="font-semibold text-white">Email</p>
//                 <p>office@jaimax.com</p>
//               </div>
//               <div>
//                 <p className="font-semibold text-white">Office</p>
//                 <p>Hyderabad Gachibowli</p>
//               </div>
//             </div>
//           </div>

//           {/* ── Right column — white/green form card (doc6) ── */}
//           <div className="flex flex-col justify-center mt-20">
//             <div className="bg-white shadow-lg rounded-lg p-8 border border-emerald-100">
//               <h3 className="text-xl font-semibold mb-6 text-emerald-700">
//                 Your Details
//               </h3>

//               {/* Error banner */}
//               {(submitError || isError) && (
//                 <div className="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
//                   <div className="flex items-center">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm font-medium">
//                       {submitError || error?.data?.message || "Failed to send message. Please try again."}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={formik.handleSubmit} className="space-y-4">

//                 {/* Name + Email */}
//                 <div className="flex flex-col md:flex-row gap-4">
//                   <div className="w-full md:w-1/2">
//                     <label className="block text-sm mb-1 text-gray-700">
//                       Name <span className="text-emerald-600">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Your Name"
//                       value={formik.values.name}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className={`w-full bg-emerald-50 border ${
//                         formik.errors.name && formik.touched.name
//                           ? "border-red-500"
//                           : "border-emerald-200"
//                       } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                     />
//                     {formik.errors.name && formik.touched.name && (
//                       <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
//                     )}
//                   </div>
//                   <div className="w-full md:w-1/2">
//                     <label className="block text-sm mb-1 text-gray-700">
//                       Email Address <span className="text-emerald-600">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Your Email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       className={`w-full bg-emerald-50 border ${
//                         formik.errors.email && formik.touched.email
//                           ? "border-red-500"
//                           : "border-emerald-200"
//                       } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                     />
//                     {formik.errors.email && formik.touched.email && (
//                       <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm mb-1 text-gray-700">
//                     Phone <span className="text-emerald-600">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Phone number"
//                     value={formik.values.phone}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/[^0-9()+\-\s]/g, "");
//                       formik.setFieldValue("phone", value);
//                     }}
//                     onBlur={formik.handleBlur}
//                     className={`w-full bg-emerald-50 border ${
//                       formik.errors.phone && formik.touched.phone
//                         ? "border-red-500"
//                         : "border-emerald-200"
//                     } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                   />
//                   {formik.errors.phone && formik.touched.phone && (
//                     <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-sm mb-1 text-gray-700">
//                     Message <span className="text-emerald-600">*</span>
//                   </label>
//                   <textarea
//                     name="message"
//                     rows="4"
//                     placeholder="Tell us about your interest"
//                     value={formik.values.message}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full resize-none bg-emerald-50 border ${
//                       formik.errors.message && formik.touched.message
//                         ? "border-red-500"
//                         : "border-emerald-200"
//                     } rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
//                   />
//                   {formik.errors.message && formik.touched.message && (
//                     <div className="text-red-500 text-xs mt-1">{formik.errors.message}</div>
//                   )}
//                 </div>

//                 {/* Submit */}
//                 <div className="pt-2 text-center">
//                   <button
//                     type="submit"
//                     disabled={isLoading || !formik.isValid || !formik.dirty}
//                     className={`py-2 px-6 rounded-full text-sm font-medium transition-colors duration-300 flex items-center justify-center mx-auto ${
//                       isLoading || !formik.isValid || !formik.dirty
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-emerald-600 hover:bg-emerald-700 text-white"
//                     }`}
//                   >
//                     {isLoading ? (
//                       <span className="flex items-center gap-2">
//                         <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Sending...
//                       </span>
//                     ) : (
//                       "Send to us"
//                     )}
//                   </button>
//                 </div>

//               </form>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default HomeContactSection;

import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Mail, Phone, X } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { useSubmitEnquiryMutation } from "../home/HomePageApiSlice";

// Validation schema
const validationSchema = Yup.object({
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

const HomeContactSection = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [submitEnquiry, { isLoading, isError, error }] =
    useSubmitEnquiryMutation();

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitError("");
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
        setSubmitError(
          err?.data?.message || "Failed to send message. Please try again.",
        );
      }
    },
  });

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

  return (
    <>
      {/* ── Thank You Modal ─────────────────────────────────────────────────── */}
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
              className="relative w-full max-w-sm rounded-xl p-5 shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-dark), var(--color-brand-primary))",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "var(--shadow-card)",
              }}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-3 right-3 transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                }
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <motion.div
                  className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand-accent), var(--color-brand-light))",
                    boxShadow: "0 8px 24px rgba(127,199,66,0.35)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle
                    className="w-7 h-7"
                    style={{ color: "var(--color-brand-dark)" }}
                  />
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
                          "#7fc742",
                          "#4a9858",
                          "#b8e07c",
                          "#2d7a3a",
                          "#7fc742",
                          "#b8e07c",
                          "#4a9858",
                          "#2d7a3a",
                          "#7fc742",
                          "#b8e07c",
                        ][i],
                      }}
                    />
                  ))}
                </div>

                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    color: "var(--color-text-on-dark)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Thank You!
                </h3>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--color-brand-accent)" }}
                >
                  We're glad to hear from you!
                </p>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  Your message has been sent successfully. We'll get back to you
                  within{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-brand-accent)" }}
                  >
                    24-48 hours
                  </span>
                  .
                </p>
                <motion.button
                  onClick={() => setShowThankYou(false)}
                  className="font-bold py-2 px-6 rounded-full text-sm"
                  style={{
                    background: "var(--color-brand-accent)",
                    color: "var(--color-brand-dark)",
                    fontFamily: "var(--font-body)",
                  }}
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

      {/* ── Main Section ─────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg-page)] py-8 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left column ── */}
          <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 pr-20 lg:pr-16">
            <p
              className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl lg:text-2xl font-semibold"
              style={{
                color: "var(--color-brand-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              We are glad to hear from you!
            </p>

            <div
              className="mt-8 sm:mt-10 lg:mt-12 space-y-5 sm:space-y-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="rounded-full p-3 flex-shrink-0"
                  style={{ background: "var(--color-bg-overlay)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    style={{ color: "var(--color-brand-primary)" }}
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
                <div>
                  <p
                    className="font-semibold text-base"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Office
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    4th Floor, Vaishnavi's Cynosure, Survey No: 18,
                    <br />
                    India Building, Gachibowli, Hyderabad, Telangana 500032
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      style={{ color: "var(--color-brand-mid)" }}
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
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Mon - Fri: 9:00 AM - 6:00 PM | Sat &amp; Sun: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="rounded-full p-3 flex-shrink-0"
                  style={{ background: "var(--color-bg-overlay)" }}
                >
                  <Phone
                    className="h-6 w-6"
                    style={{ color: "var(--color-brand-primary)" }}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <p
                    className="font-semibold text-base"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Phone
                  </p>
                  <a
                    href="tel:+919121799947"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-brand-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-secondary)")
                    }
                  >
                    (+91) 9121799947
                  </a>
                  <a
                    href="tel:+919121758880"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-brand-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-secondary)")
                    }
                  >
                    (+91) 9121758880
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className="rounded-full p-3 flex-shrink-0"
                  style={{ background: "var(--color-bg-overlay)" }}
                >
                  <Mail
                    className="h-6 w-6"
                    style={{ color: "var(--color-brand-primary)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-semibold text-base"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:office@jaimax.com"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-brand-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-secondary)")
                    }
                  >
                    office@jaimax.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column — form card ── */}
          <div className="flex flex-col justify-center mt-20">
            <div
              className="rounded-lg p-8"
              style={{
                background: "var(--color-bg-surface)",
                boxShadow: "var(--shadow-card)",
                border: "1px solid var(--color-border-accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              <h3
                className="text-xl font-semibold mb-6"
                style={{
                  color: "var(--color-text-accent)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Your Details
              </h3>

              {/* Error banner */}
              {(submitError || isError) && (
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
                      {submitError ||
                        error?.data?.message ||
                        "Failed to send message. Please try again."}
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Name + Email */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm mb-1"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Name{" "}
                      <span style={{ color: "var(--color-brand-primary)" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                      style={{
                        background: "var(--color-bg-overlay)",
                        border: `1px solid ${formik.errors.name && formik.touched.name ? "#ef4444" : "var(--color-border-accent)"}`,
                        color: "var(--color-text-primary)",
                      }}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm mb-1"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Email Address{" "}
                      <span style={{ color: "var(--color-brand-primary)" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                      style={{
                        background: "var(--color-bg-overlay)",
                        border: `1px solid ${formik.errors.email && formik.touched.email ? "#ef4444" : "var(--color-border-accent)"}`,
                        color: "var(--color-text-primary)",
                      }}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-sm mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Phone{" "}
                    <span style={{ color: "var(--color-brand-primary)" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formik.values.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(
                        /[^0-9()+\-\s]/g,
                        "",
                      );
                      formik.setFieldValue("phone", value);
                    }}
                    onBlur={formik.handleBlur}
                    className="w-full rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                    style={{
                      background: "var(--color-bg-overlay)",
                      border: `1px solid ${formik.errors.phone && formik.touched.phone ? "#ef4444" : "var(--color-border-accent)"}`,
                      color: "var(--color-text-primary)",
                    }}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-sm mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Message{" "}
                    <span style={{ color: "var(--color-brand-primary)" }}>
                      *
                    </span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your interest"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full resize-none rounded p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]"
                    style={{
                      background: "var(--color-bg-overlay)",
                      border: `1px solid ${formik.errors.message && formik.touched.message ? "#ef4444" : "var(--color-border-accent)"}`,
                      color: "var(--color-text-primary)",
                    }}
                  />
                  {formik.errors.message && formik.touched.message && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.message}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isLoading || !formik.isValid || !formik.dirty}
                    className="py-2 px-6 rounded-full text-sm font-medium flex items-center justify-center mx-auto transition-all duration-200"
                    style={{
                      background:
                        isLoading || !formik.isValid || !formik.dirty
                          ? "#d1d5db"
                          : "var(--color-brand-primary)",
                      color:
                        isLoading || !formik.isValid || !formik.dirty
                          ? "#9ca3af"
                          : "var(--color-text-on-dark)",
                      cursor:
                        isLoading || !formik.isValid || !formik.dirty
                          ? "not-allowed"
                          : "pointer",
                      boxShadow:
                        isLoading || !formik.isValid || !formik.dirty
                          ? "none"
                          : "var(--shadow-btn)",
                      fontFamily: "var(--font-body)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading && formik.isValid && formik.dirty)
                        e.currentTarget.style.background =
                          "var(--color-brand-mid)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading && formik.isValid && formik.dirty)
                        e.currentTarget.style.background =
                          "var(--color-brand-primary)";
                    }}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
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
                        Sending...
                      </span>
                    ) : (
                      "Send to us"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeContactSection;

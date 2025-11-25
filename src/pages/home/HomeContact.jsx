

// import React from "react";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// // Import your RTK Query hook
// import { useSubmitEnquiryMutation } from './HomePageApiSlice';

// // Validation schema
// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, 'Name must be at least 2 characters')
//     .required('Name is required'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   phone: Yup.string()
//     .min(8, 'Phone must be at least 8 digits')
//     .max(15, 'Phone must be at most 15 digits')
//     .matches(/^[0-9()+-\s]*$/, 'Phone must contain only numbers or symbols (+ -)')
//     .required('Phone is required'),

//   message: Yup.string()
//     .min(10, 'Message must be at least 10 characters')
//     .required('Message is required'),
// });

// const ContactSection = () => {
//   // RTK Query mutation hook
//   const [submitEnquiry, { isLoading, isSuccess, isError, error }] = useSubmitEnquiryMutation();

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       phone: '',
//       message: ''
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         // Call the RTK Query mutation
//         await submitEnquiry(values).unwrap();

//         // Reset form on success
//         resetForm();

//         // Optional: Show success message
//         // alert('Message sent successfully!');
//       } catch (err) {
//         // Error handling is done through RTK Query state
//         // console.error('Failed to submit enquiry:', err);
//       }
//     }
//   });

//   return (
//     <section className="bg-[#085056] py-8 sm:py-12 lg:py-16 px-4">
//       {/* Two-column layout, splits at md */}
//       <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//         {/* ─────────────────── Left column ─────────────────── */}
//         <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 pr-20 lg:pr-16">
//           <h2 className="text-white font-extrabold leading-tight text-2xl sm:text-5xl md:text-2xl lg:text-5xl xl:text-7xl">
//             <span className="block">Let's get</span>
//             <span className="block">in touch</span>
//           </h2>

//           <p className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl lg:text-2xl text-[#c4d72d] font-semibold">
//             We are glad to hear from you!
//           </p>

//           <div className="mt-8 sm:mt-10 lg:mt-12 space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-white/90">
//             <div>
//               <p className="font-semibold text-white">Phone</p>
//               <p>(+91) 9121758880</p>
//               <p>(+91) 9121799947</p>
//             </div>

//             <div>
//               <p className="font-semibold text-white">Email</p>
//               <p>office@jaimax.com</p>
//             </div>

//             <div>
//               <p className="font-semibold text-white">Office</p>
//               <p>
//                 Hyderabad Gachibowli,
//                 <br className="hidden sm:block" />
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ─────────────────── Right column - Form ─────────────────── */}
//         <div className="flex flex-col justify-center mt-20">
//           <div className="bg-[#06454c] rounded-md px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
//             <h3 className="text-[#c4d72d] text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
//               Contact
//             </h3>

//             <div onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
//               {/* Error Message Display */}
//               {isError && (
//                 <div className="mb-4 p-3 bg-red-500/20 border border-red-400 rounded text-red-400 text-sm">
//                   {error?.data?.message || 'Failed to send message. Please try again.'}
//                 </div>
//               )}

//               {/* Success Message Display */}
//               {isSuccess && (
//                 <div className="mb-4 p-3 bg-green-500/20 border border-green-400 rounded text-green-400 text-sm">
//                   Message sent successfully! We'll get back to you soon.
//                 </div>
//               )}

//               {/* Name + Email */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${formik.errors.name && formik.touched.name
//                       ? 'border-red-400 focus:border-red-400'
//                       : 'border-white/40 focus:border-[#fff799]'
//                       }`}
//                   />
//                   {formik.errors.name && formik.touched.name && (
//                     <div className="absolute -bottom-5 left-0 text-xs text-red-400">
//                       {formik.errors.name}
//                     </div>
//                   )}
//                 </div>

//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${formik.errors.email && formik.touched.email
//                       ? 'border-red-400 focus:border-red-400'
//                       : 'border-white/40 focus:border-[#fff799]'
//                       }`}
//                   />
//                   {formik.errors.email && formik.touched.email && (
//                     <div className="absolute -bottom-5 left-0 text-xs text-red-400">
//                       {formik.errors.email}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="relative">
//                 <input
//                   type="phone"
//                   name="phone"
//                   placeholder="phone"
//                   value={formik.values.phone}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${formik.errors.email && formik.touched.email
//                     ? 'border-red-400 focus:border-red-400'
//                     : 'border-white/40 focus:border-[#fff799]'
//                     }`}
//                 />
//                 {formik.errors.phone && formik.touched.phone && (
//                   <div className="absolute -bottom-5 left-0 text-xs text-red-400">
//                     {formik.errors.phone}
//                   </div>
//                 )}
//               </div>

//               {/* Message */}
//               <div className="relative mt-8">
//                 <textarea
//                   name="message"
//                   rows="3"
//                   placeholder="Tell us about your interest"
//                   value={formik.values.message}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={`w-full resize-none bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${formik.errors.message && formik.touched.message
//                     ? 'border-red-400 focus:border-red-400'
//                     : 'border-white/40 focus:border-[#fff799]'
//                     }`}
//                 />
//                 {formik.errors.message && formik.touched.message && (
//                   <div className="absolute -bottom-5 left-0 text-xs text-red-400">
//                     {formik.errors.message}
//                   </div>
//                 )}
//               </div>

//               {/* CTA */}
//               <div className="pt-4">
//                 <button
//                   type="button"
//                   onClick={formik.handleSubmit}
//                   disabled={isLoading || !formik.isValid}
//                   className={`w-full rounded-full sm:w-auto px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors ${isLoading || !formik.isValid
//                     ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//                     : 'bg-[#b9cd27] text-[#095259] hover:bg-[#fce66d]'
//                     }`}
//                 >
//                   {isLoading ? 'Sending...' : 'Send to us'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;


import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, PartyPopper, Sparkles } from "lucide-react";
// Import your RTK Query hook
import { useSubmitEnquiryMutation } from "./HomePageApiSlice";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .min(8, "Phone must be at least 8 digits")
    .max(15, "Phone must be at most 15 digits")
    .matches(
      /^[0-9()+-\s]*$/,
      "Phone must contain only numbers or symbols (+ -)"
    )
    .required("Phone is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactSection = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  
  // RTK Query mutation hook
  const [submitEnquiry, { isLoading, isError, error }] =
    useSubmitEnquiryMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Call the RTK Query mutation
        await submitEnquiry(values).unwrap();

        // Reset form on success
        resetForm();

        // Show thank you modal
        setShowThankYou(true);
      } catch (err) {
        // Error handling is done through RTK Query state
      }
    },
  });

  // Thank You Modal Variants
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
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.3 },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const confettiVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: [0, 1, 1, 0],
      y: [0, -30, 100],
      x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
      rotate: [0, 360],
      transition: {
        duration: 2,
        delay: 0.3 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {/* Thank You Modal */}
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
        className="relative w-full max-w-sm bg-gradient-to-br from-[#085056] to-[#0a6b73] rounded-xl p-5 shadow-2xl border border-white/20"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setShowThankYou(false)}
          className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Checkmark icon */}
          <motion.div
            className="mx-auto w-14 h-14 bg-gradient-to-br from-[#c4d72d] to-[#a8bc1f] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#c4d72d]/30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <CheckCircle className="w-7 h-7 text-[#085056]" />
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
                    "#c4d72d",
                    "#22d3ee",
                    "#fbbf24",
                    "#f472b6",
                    "#a78bfa",
                    "#34d399",
                    "#fb7185",
                    "#60a5fa",
                    "#c4d72d",
                    "#22d3ee",
                  ][i],
                }}
              />
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-1">Thank You!</h3>

          {/* Subtitle */}
          <p className="text-[#c4d72d] text-sm font-semibold mb-3">
            We're glad to hear from you!
          </p>

          {/* Message */}
          <p className="text-white/80 text-sm mb-4 leading-relaxed">
            Your message has been sent successfully. We'll get back to you
            within <span className="text-[#c4d72d] font-semibold">24-48 hours</span>.
          </p>

          {/* Close button */}
          <motion.button
            onClick={() => setShowThankYou(false)}
            className="bg-[#c4d72d] text-[#085056] font-bold py-2 px-6 rounded-full hover:bg-[#d4e737] transition-colors text-sm"
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

      {/* Main Contact Section */}
      <section className="bg-[#085056] py-8 sm:py-12 lg:py-16 px-4">
        {/* Two-column layout, splits at md */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ─────────────────── Left column ─────────────────── */}
          <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-12 pr-20 lg:pr-16">
            <h2 className="text-white font-extrabold leading-tight text-2xl sm:text-5xl md:text-2xl lg:text-5xl xl:text-7xl">
              <span className="block">Let's get</span>
              <span className="block">in touch</span>
            </h2>

            <p className="mt-6 sm:mt-8 lg:mt-10 text-lg sm:text-xl lg:text-2xl text-[#c4d72d] font-semibold">
              We are glad to hear from you!
            </p>

            <div className="mt-8 sm:mt-10 lg:mt-12 space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-white/90">
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p>(+91) 9121758880</p>
                <p>(+91) 9121799947</p>
              </div>

              <div>
                <p className="font-semibold text-white">Email</p>
                <p>office@jaimax.com</p>
              </div>

              <div>
                <p className="font-semibold text-white">Office</p>
                <p>
                  Hyderabad Gachibowli,
                  <br className="hidden sm:block" />
                </p>
              </div>
            </div>
          </div>

          {/* ─────────────────── Right column - Form ─────────────────── */}
          <div className="flex flex-col justify-center mt-20">
            <div className="bg-[#06454c] rounded-md px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
              <h3 className="text-[#c4d72d] text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
                Contact
              </h3>

              {/* Changed from div to form for proper form handling */}
              <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Error Message Display */}
                {isError && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-400 rounded text-red-400 text-sm">
                    {error?.data?.message ||
                      "Failed to send message. Please try again."}
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                        formik.errors.name && formik.touched.name
                          ? "border-red-400 focus:border-red-400"
                          : "border-white/40 focus:border-[#fff799]"
                      }`}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                        formik.errors.email && formik.touched.email
                          ? "border-red-400 focus:border-red-400"
                          : "border-white/40 focus:border-[#fff799]"
                      }`}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                      formik.errors.phone && formik.touched.phone
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/40 focus:border-[#fff799]"
                    }`}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="relative mt-8">
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us about your interest"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full resize-none bg-transparent border-b py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none transition-colors ${
                      formik.errors.message && formik.touched.message
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/40 focus:border-[#fff799]"
                    }`}
                  />
                  {formik.errors.message && formik.touched.message && (
                    <div className="absolute -bottom-5 left-0 text-xs text-red-400">
                      {formik.errors.message}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || !formik.isValid || !formik.dirty}
                    className={`w-full rounded-full sm:w-auto px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 ${
                      isLoading || !formik.isValid || !formik.dirty
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-[#b9cd27] text-[#095259] hover:bg-[#fce66d] hover:shadow-lg hover:shadow-[#b9cd27]/30"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
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

export default ContactSection;
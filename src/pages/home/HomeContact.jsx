// import React, { useState } from "react";

// export default function HomeContact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [focusedField, setFocusedField] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 py-8">
//       <div className="relative z-10 flex flex-col md:flex-row w-full max-w-9xl h-auto md:h-[90vh] gap-8 md:gap-0">
//         {/* Left Half: Video */}
//         <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center">
//           <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl">
//             <video
//               className="w-full h-full object-cover rounded-2xl"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source
//                 src="https://cdn.dribbble.com/userupload/4026774/file/original-d7d1fab1bfcb5eb34fd2f82790ac0749.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>

//         {/* Right Half: Black Background with White Glass Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-6 rounded-2xl">
//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 text-white"
//           >
//             {/* Title */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-semibold mb-1">Get In Touch</h2>
//               <p className="text-white/70 text-xs">Let’s create something amazing</p>
//             </div>.0


//             {/* Form Fields */}
//             <div className="space-y-4">
//               {['name','phone', 'email', 'message'].map((field) => (
//                 <div className="relative" key={field}>
//                   <label
//                     htmlFor={field}
//                     className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
//                       focusedField === field || formData[field]
//                         ? '-top-2 text-xs text-white'
//                         : 'top-2 text-white/70'
//                     }`}
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   {field !== 'message' ? (
//                     <input
//                       type={field === 'email' ? 'email' : 'text'}
//                       id={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField(field)}
//                       onBlur={() => setFocusedField('')}
//                       placeholder={`Your ${field}`}
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300"
//                     />
//                   ) : (
//                     <textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField('message')}
//                       onBlur={() => setFocusedField('')}
//                       rows="3"
//                       placeholder="Your Message"
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 resize-none"
//                     ></textarea>
//                   )}
//                 </div>
//               ))}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-2.5 px-4 text-sm bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium transition duration-300 hover:from-purple-700 hover:to-cyan-700 focus:outline-none transform hover:scale-105"
//               >
//                 Send Message
//               </button>
//             </div>


//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useSubmitEnquiryMutation } from "../home/HomePageApiSlice"; // ✅ adjust this path

// export default function HomeContact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     message: ''
//   });

//   const [focusedField, setFocusedField] = useState('');
//   const [submitEnquiry, { isLoading }] = useSubmitEnquiryMutation();

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await submitEnquiry(formData).unwrap();
//       Swal.fire('Success!', 'Your message has been sent.', 'success');
//       setFormData({ name: '', phone: '', email: '', message: '' });
//     } catch (err) {
//       Swal.fire('Error', err?.data?.message || 'Something went wrong!', 'error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 py-8">
//       <div className="relative z-10 flex flex-col md:flex-row w-full max-w-9xl h-auto md:h-[90vh] gap-8 md:gap-0">

//         {/* Left Half: Video */}
//         <div className="w-full md:w-1/2 h-64 md:h-full flex items-center justify-center">
//           <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl">
//             <video
//               className="w-full h-full object-cover rounded-2xl"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source
//                 src="https://cdn.dribbble.com/userupload/4026774/file/original-d7d1fab1bfcb5eb34fd2f82790ac0749.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>

//         {/* Right Half: Contact Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-6 rounded-2xl">
//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 text-white"
//           >
//             {/* Title */}
//             <div className="text-center mb-6">
//               <h2 className="text-2xl font-semibold mb-1">Get In Touch</h2>
//               <p className="text-white/70 text-xs">Let’s create something amazing</p>
//             </div>

//             {/* Form Fields */}
//             <div className="space-y-4">
//               {['name', 'phone', 'email', 'message'].map((field) => (
//                 <div className="relative" key={field}>
//                   <label
//                     htmlFor={field}
//                     className={`absolute left-3 transition-all duration-300 pointer-events-none text-sm ${
//                       focusedField === field || formData[field]
//                         ? '-top-2 text-xs text-white'
//                         : 'top-2 text-white/70'
//                     }`}
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   {field !== 'message' ? (
//                     <input
//                       type={field === 'email' ? 'email' : 'text'}
//                       id={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField(field)}
//                       onBlur={() => setFocusedField('')}
//                       placeholder={`Your ${field}`}
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300"
//                     />
//                   ) : (
//                     <textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField('message')}
//                       onBlur={() => setFocusedField('')}
//                       rows="3"
//                       placeholder="Your Message"
//                       className="w-full py-2 px-3 text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 resize-none"
//                     ></textarea>
//                   )}
//                 </div>
//               ))}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-2.5 px-4 text-sm bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium transition duration-300 hover:from-purple-700 hover:to-cyan-700 focus:outline-none transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Sending...' : 'Send Message'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useSubmitEnquiryMutation } from "../home/HomePageApiSlice"; // ✅ adjust this path

// export default function HomeContact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     message: ''
//   });

//   const [focusedField, setFocusedField] = useState('');
//   const [submitEnquiry, { isLoading }] = useSubmitEnquiryMutation();

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await submitEnquiry(formData).unwrap();
//       Swal.fire('Success!', 'Your message has been sent.', 'success');
//       setFormData({ name: '', phone: '', email: '', message: '' });
//     } catch (err) {
//       Swal.fire('Error', err?.data?.message || 'Something went wrong!', 'error');
//     }
//   };

//   return (
//     <div className="min-h-screen  relative overflow-hidden">
//       <div className="flex flex-col xl:flex-row min-h-screen">

//         {/* Left Half: Video */}
//         <div className="w-full xl:w-1/2 h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6 xl:p-8">
//           {/* <div className="relative w-full h-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl rounded-2xl">
//             <video
//               className="w-full h-full object-cover rounded-2xl"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source
//                 src="https://cdn.dribbble.com/userupload/4026774/file/original-d7d1fab1bfcb5eb34fd2f82790ac0749.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div> */}
//         </div>

//         {/* Right Half: Contact Form */}
//         <div className="w-full xl:w-1/2 min-h-[55vh] sm:min-h-[50vh] md:min-h-[45vh] lg:min-h-[40vh] xl:min-h-screen flex items-center justify-center  p-4 lg:p-6 xl:p-8">
//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30 text-white"
//           >
//             {/* Title */}
//             <div className="text-center mb-4 sm:mb-6">
//               <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-3xl font-semibold mb-1 sm:mb-2">Get In Touch</h2>
//               <p className="text-white/70 text-xs sm:text-sm">Let's create something amazing</p>
//             </div>

//             {/* Form Fields */}
//             <div className="space-y-3 sm:space-y-4 lg:space-y-5">
//               {['name', 'phone', 'email', 'message'].map((field) => (
//                 <div className="relative" key={field}>
//                   <label
//                     htmlFor={field}
//                     className={`absolute left-3 transition-all duration-300 pointer-events-none text-xs sm:text-sm ${
//                       focusedField === field || formData[field]
//                         ? '-top-2 text-xs text-white bg-black px-1 rounded'
//                         : 'top-2.5 sm:top-3 text-white/70'
//                     }`}
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   {field !== 'message' ? (
//                     <input
//                       type={field === 'email' ? 'email' : 'text'}
//                       id={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField(field)}
//                       onBlur={() => setFocusedField('')}
//                       placeholder={`Your ${field}`}
//                       className="w-full py-2.5 sm:py-3 px-3 text-xs sm:text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300"
//                     />
//                   ) : (
//                     <textarea
//                       id="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       onFocus={() => setFocusedField('message')}
//                       onBlur={() => setFocusedField('')}
//                       rows="3"
//                       placeholder="Your Message"
//                       className="w-full py-2.5 sm:py-3 px-3 text-xs sm:text-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all duration-300 resize-none"
//                     ></textarea>
//                   )}
//                 </div>
//               ))}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-2.5 sm:py-3 px-4 text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-medium transition duration-300 hover:from-purple-700 hover:to-cyan-700 focus:outline-none transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               >
//                 {isLoading ? 'Sending...' : 'Send Message'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";

// const ContactSection = () => {
//   return (
//     <section
//       id="contact"
//       className="relative  text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-12 xl:px-20"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10"
//       >
//         {/* Left Text Section */}
//         <div className="flex-1 space-y-6">
//           <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
//             Contact <span className="text-teal-300">Us</span>
//           </h2>
//           <p className="text-base sm:text-lg text-gray-200 max-w-md">
//             We’re here to help. Whether you have a question, feedback, or partnership inquiry — we’d love to hear from you.
//           </p>

//           <div className="space-y-4 text-sm sm:text-base text-gray-100">
//             <div className="flex items-center gap-3">
//               <MapPin className="text-teal-300" />
//                4th Floor, Vaishnavi's Cynosure, Gachibowli, Hyderabad, Telangana 500081
//             </div>
//             <div className="flex items-center gap-3">
//               <Phone className="text-teal-300" />
//               +91 6303008654
//             </div>
//             <div className="flex items-center gap-3">
//               <Mail className="text-teal-300" />
//               info@jaimax.com
//             </div>
//           </div>
//         </div>

//         {/* Right Form Section */}
//         <div className="flex-1">
//           <div className="backdrop-blur-lg bg-white/10 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
//             <form className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-white mb-1">Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 rounded-lg border border-teal-400 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   placeholder="Your Name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-white mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-3 rounded-lg border border-teal-400 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-white mb-1">Message</label>
//                 <textarea
//                   rows="4"
//                   className="w-full px-4 py-3 rounded-lg border border-teal-400 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   placeholder="Write your message..."
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full shadow-md transition-all"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default ContactSection;





// import React from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";

// const ContactSection = () => {
//   return (
//     <section
//       id="contact"
//       className="relative text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-12 xl:px-20"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10"
//       >
//         {/* Left Info Section */}
//         <div className="flex-1 space-y-6">
//           <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
//             Contact <span className="text-teal-300">Us</span>
//           </h2>
//           <p className="text-base sm:text-lg text-gray-200 max-w-md">
//             Have a question or just want to say hello? We'd love to hear from you.
//           </p>

//           <div className="space-y-4 text-sm sm:text-base text-gray-100">
//             <div className="flex items-center gap-3">
//               <MapPin className="text-teal-300" />
//               4th Floor, Vaishnavi's Cynosure, Gachibowli, Hyderabad
//             </div>
//             <div className="flex items-center gap-3">
//               <Phone className="text-teal-300" />
//               +91 6303008654
//             </div>
//             <div className="flex items-center gap-3">
//               <Mail className="text-teal-300" />
//               info@jaimax.com
//             </div>
//           </div>
//         </div>

//         {/* Right Contact Form */}
//         <div className="flex-1">
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
//             <form className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-white mb-1">Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 rounded-md border border-teal-400 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   placeholder="Your Name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-white mb-1">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-2 rounded-md border border-teal-400 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-white mb-1">Message</label>
//                 <textarea
//                   rows="3"
//                   className="w-full px-4 py-2 rounded-md border border-teal-400 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   placeholder="Write your message..."
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-all"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default ContactSection;


// import React from "react";

// const ContactSection = () => {
//   return (
//     <div className="bg-[#085259] py-16 px-4">
//       {/* Outer wrapper to center the card and control max width */}
//       <div className="mx-auto max-w-7xl bg-white grid grid-cols-1 md:grid-cols-2">
//         {/* ───────────────────────── Left column ───────────────────────── */}
//         <div className="p-10 sm:p-12 lg:p-16">
//           {/* Big headline */}
//           <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
//             <span className="block">Let’s get</span>
//             <span className="block">in touch</span>
//           </h2>

//           {/* Sub-headline */}
//           <p className="mt-8 text-lg sm:text-xl font-semibold">
//             Don’t be afraid to say hello with us!
//           </p>

//           {/* Contact details */}
//           <div className="mt-10 space-y-6 text-base sm:text-lg">
//             {/* Phone */}
//             <div>
//               <p className="font-semibold">Phone</p>
//               <p className="text-gray-600">(+2) 578-365-379</p>
//             </div>

//             {/* Email */}
//             <div>
//               <p className="font-semibold">Email</p>
//               <p className="text-gray-600">hello@slabs.com</p>
//             </div>

//             {/* Office */}
//             <div>
//               <p className="font-semibold">Office</p>
//               <p className="text-gray-600">
//                 230 Norman Street New York,
//                 <br className="hidden sm:block" />
//                 QC (USA) H8R 1A1
//               </p>
//               <a
//                 href="https://maps.google.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-1 text-black font-medium underline underline-offset-4 hover:opacity-80 transition duration-150"
//               >
//                 See on Google Map
//                 {/* ↗ icon */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="h-4 w-4"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M15 5a1 1 0 00-2 0v6H7a1 1 0 000 2h8a1 1 0 001-1V5z"
//                     clipRule="evenodd"
//                   />
//                   <path d="M5 15a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1h-1.586a1 1 0 00-.707.293l-9.414 9.414A1 1 0 004 14.414V15z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ───────────────────────── Right column ───────────────────────── */}
//         <div className="relative flex flex-col justify-center bg-white">
//           {/* Top explanatory note + arrow */}
//           <div className="px-10 sm:px-12 lg:px-16 py-8 sm:py-10">
//             <div className="flex items-center gap-4">
//               {/* Arrow line */}
//               <span className="flex-shrink-0 h-px w-20 bg-black" />
//               {/* Arrowhead (simple) */}
//               <svg
//                 className="flex-shrink-0 h-4 w-4 text-black"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.146 3.646a.5.5 0 01.708 0l3.5 3.5a.5.5 0 010 .708l-3.5 3.5a.5.5 0 11-.708-.708L12.793 8 10.146 5.354a.5.5 0 010-.708z"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   d="M1 8a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12A.5.5 0 011 8z"
//                 />
//               </svg>

//               {/* Caption */}
//               <p className="text-sm sm:text-base text-gray-700">
//                 Great! We’re excited to hear from you and let’s start something
//                 special together. Call us for any inquiry.
//               </p>
//             </div>
//           </div>

//           {/* Contact form card */}
//           <div className="grow bg-gradient-to-b from-black to-neutral-900 px-10 sm:px-12 lg:px-16 py-12">
//             <h3 className="text-white text-2xl font-semibold mb-8">Contact</h3>

//             {/* Form (purely visual – no submission handler) */}
//             <form className="space-y-8">
//               {/* Name + Email */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
//                 />
//               </div>

//               {/* Phone + Subject */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Subject"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
//                 />
//               </div>

//               {/* Message */}
//               <textarea
//                 rows="3"
//                 placeholder="Tell us about your interested in"
//                 className="w-full resize-none bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
//               />

//               {/* Submit button */}
//               <button
//                 type="button"
//                 className="w-full sm:w-auto px-10 py-3 bg-[#f2ff00] text-black font-semibold text-center hover:opacity-90 transition-colors duration-150"
//               >
//                 Send to us
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactSection;


//   import React from "react";

// const ContactSection = () => {
//   return (
//     <div className="bg-[#095259] py-16 px-4">
//       {/* Card wrapper */}
//       <div className="mx-auto max-w-7xl bg-white grid grid-cols-1 md:grid-cols-2">
//         {/* ───────────────────── Left column ───────────────────── */}
//         <div className="p-10 sm:p-12 lg:p-16">
//           <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
//             <span className="block">Let’s get</span>
//             <span className="block">in touch</span>
//           </h2>

//           <p className="mt-8 text-lg sm:text-xl font-semibold">
//             Don’t be afraid to say hello with us!
//           </p>

//           <div className="mt-10 space-y-6 text-base sm:text-lg">
//             <div>
//               <p className="font-semibold">Phone</p>
//               <p className="text-gray-700">(+2) 578-365-379</p>
//             </div>

//             <div>
//               <p className="font-semibold">Email</p>
//               <p className="text-gray-700">hello@slabs.com</p>
//             </div>

//             <div>
//               <p className="font-semibold">Office</p>
//               <p className="text-gray-700">
//                 230 Norman Street New York,
//                 <br className="hidden sm:block" />
//                 QC (USA) H8R 1A1
//               </p>
//               <a
//                 href="https://maps.google.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-1 text-black font-medium underline underline-offset-4 hover:text-[#095259] transition"
//               >
//                 See on Google Map
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="h-4 w-4"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M15 5a1 1 0 00-2 0v6H7a1 1 0 000 2h8a1 1 0 001-1V5z"
//                     clipRule="evenodd"
//                   />
//                   <path d="M5 15a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1h-1.586a1 1 0 00-.707.293l-9.414 9.414A1 1 0 004 14.414V15z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ───────────────────── Right column ───────────────────── */}
//         <div className="relative flex flex-col justify-center bg-white">
//           {/* Arrow note */}
//           <div className="px-10 sm:px-12 lg:px-16 py-8 sm:py-10">
//             <div className="flex items-center gap-4">
//               <span className="h-px w-20 bg-black" />
//               <svg
//                 className="h-4 w-4 text-black"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 16 16"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.146 3.646a.5.5 0 01.708 0l3.5 3.5a.5.5 0 010 .708l-3.5 3.5a.5.5 0 11-.708-.708L12.793 8 10.146 5.354a.5.5 0 010-.708z"
//                 />
//                 <path
//                   fillRule="evenodd"
//                   d="M1 8a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12A.5.5 0 011 8z"
//                 />
//               </svg>
//               <p className="text-sm sm:text-base text-gray-700">
//                 Great! We’re excited to hear from you and let’s start something
//                 special together. Call us for any inquiry.
//               </p>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="grow bg-gradient-to-b from-black to-neutral-900 px-10 sm:px-12 lg:px-16 py-12">
//             <h3 className="text-white text-2xl font-semibold mb-8">Contact</h3>

//             <form className="space-y-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-[#fff799]"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-[#fff799]"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-[#fff799]"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Subject"
//                   className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-[#fff799]"
//                 />
//               </div>

//               <textarea
//                 rows="3"
//                 placeholder="Tell us about your interested in"
//                 className="w-full resize-none bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-400 focus:outline-none focus:border-[#fff799]"
//               />

//               {/* Light-yellow CTA */}
//               <button
//                 type="button"
//                 className="w-full sm:w-auto px-10 py-3 bg-[#fff799] text-black font-semibold hover:bg-[#ffe76f] transition-colors"
//               >
//                 Send to us
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactSection;


// import React from "react";

// const ContactSection = () => {
//   return (
//     <section className="bg-[#085056] py-16 px-4">
//       {/* Two-column layout, splits at md */}
//       <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0">
//         {/* ─────────────────── Left column ─────────────────── */}
//         <div className="flex flex-col justify-center px-2 sm:px-12 lg:px-3">
//           <h2 className="text-white font-extrabold leading-tight text-5xl sm:text-6xl lg:text-7xl">
//             <span className="block">Let’s get</span>
//             <span className="block">in touch</span>
//           </h2>

//           <p className="mt-8 text-lg sm:text-xl text-[#fff799] font-semibold">
//             Don’t be afraid to say hello with us!
//           </p>

//           <div className="mt-10 space-y-6 text-base sm:text-lg text-white/90">
//             <div>
//               <p className="font-semibold text-white">Phone</p>
//               <p>(+2) 578-365-379</p>
//             </div>

//             <div>
//               <p className="font-semibold text-white">Email</p>
//               <p>hello@slabs.com</p>
//             </div>

//             <div>
//               <p className="font-semibold text-white">Office</p>
//               <p>
//                 230 Norman Street New York,
//                 <br className="hidden sm:block" />
//                 QC (USA) H8R 1A1
//               </p>
//               <a
//                 href="https://maps.google.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-1 mt-2 text-[#fff799] underline underline-offset-4 hover:opacity-80 transition"
//               >
//                 See on Google Map
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="h-4 w-4"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M15 5a1 1 0 00-2 0v6H7a1 1 0 000 2h8a1 1 0 001-1V5z"
//                     clipRule="evenodd"
//                   />
//                   <path d="M5 15a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1h-1.586a1 1 0 00-.707.293l-9.414 9.414A1 1 0 004 14.414V15z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ─────────────────── Right column ─────────────────── */}
//         <div className="flex flex-col justify-center">
//           {/* Arrow note */}
//           <div className="flex items-start gap-4 px-6 sm:px-12 lg:px-16 mb-8">
//             {/* Unified arrow (line + head) */}
//             <svg
//               className="flex-shrink-0 w-28 sm:w-32 md:w-40 lg:w-52 h-5 mt-1 text-[#fff799]"
//               viewBox="0 0 120 20"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {/* Horizontal line */}
//               <line
//                 x1="0"
//                 y1="10"
//                 x2="110"
//                 y2="10"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               />
//               {/* Arrowhead */}
//               <polyline
//                 points="110,4 120,10 110,16"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 fill="none"
//               />
//             </svg>

//             {/* Description */}
//             <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md">
//               Great! We’re excited to hear from you – let’s start something
//               special together. Call us for any inquiry.
//             </p>
//           </div>


//           {/* Form container on darker teal */}
//           <div className="bg-[#06454c] rounded-md px-6 sm:px-12 lg:px-16 py-12">
//             <h3 className="text-[#fff799] text-2xl font-semibold mb-8">
//               Contact
//             </h3>

//             <form className="space-y-8">
//               {/* Name + Email */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full bg-transparent border-b border-white/40 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#fff799]"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full bg-transparent border-b border-white/40 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#fff799]"
//                 />
//               </div>

//               {/* Phone + Subject */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   className="w-full bg-transparent border-b border-white/40 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#fff799]"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Subject"
//                   className="w-full bg-transparent border-b border-white/40 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#fff799]"
//                 />
//               </div>

//               {/* Message */}
//               <textarea
//                 rows="3"
//                 placeholder="Tell us about your interest"
//                 className="w-full resize-none bg-transparent border-b border-white/40 py-2 text-white placeholder-white/60 focus:outline-none focus:border-[#fff799]"
//               />

//               {/* CTA */}
//               <button
//                 type="button"
//                 className="w-full sm:w-auto px-10 py-3 bg-[#fff799] text-[#095259] font-semibold rounded hover:bg-[#fce66d] transition-colors"
//               >
//                 Send to us
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;

import React from "react";

const ContactSection = () => {
  return (
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
              <p>(+91) 6303008654</p>
            </div>

            <div>
              <p className="font-semibold text-white">Email</p>
              <p>info@jaimax.com</p>
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
        <div className="flex flex-col justify-center mt-20">
          <div className="bg-[#06454c] rounded-md px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
            <h3 className="text-[#c4d72d] text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
              Contact
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-white/40 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#fff799] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-white/40 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#fff799] transition-colors"
                />
              </div>

              {/* Message */}
              <textarea
                rows="2"
                placeholder="Tell us about your interest"
                className="w-full resize-none bg-transparent border-b border-white/40 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 focus:outline-none focus:border-[#fff799] transition-colors"
              />

              {/* CTA */}
              <button
                type="button"
                className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 bg-[#b9cd27] text-[#095259] text-sm sm:text-base font-semibold rounded hover:bg-[#fce66d] transition-colors"
              >
                Send to us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
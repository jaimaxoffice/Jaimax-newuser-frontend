import React,{useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Globe,
  Briefcase,
  MapPin,
  Phone,
  Send,
  Clock,
  Mail,
  X,
  CheckCircle ,
  PartyPopper 
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

import { useSubmitEnquiryMutation } from "../../pages/home/HomePageApiSlice";

const OurMissionSectionContent = () => {
  // Animation variants for the section title and description
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for the individual cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 font-inter bg-[#085056]">
      <div className="max-w-7xl mx-auto bg-[#085056]">
        {/* Title and Description */}
        <motion.div
          className="text-center lg:text-left mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <p className="text-lime-400 text-sm uppercase tracking-wider font-semibold mb-2">
            OUR MISSION
          </p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Unlock Your Financial Future with Jaimax Coin
          </h2>
          <p className="text-white max-w-7xl lg:mx-0 mx-auto text-base sm:text-lg">
            Welcome to Jaimax Coin – an all-in-one platform designed to help you
            achieve your financial goals through tailored investment plans,
            team-building opportunities, and innovative referral systems.
            Whether you're an experienced investor or new to digital assets,
            Jaimax Coin blends investment tools, strategies, and network growth
            potential to empower your financial future.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2, // Stagger animation for children
              },
            },
          }}
        >
          {/* Card 1: Tailored Investment Plans */}
          <motion.div
            className="bg-teal-900 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ translateY: -10 }} // Simple hover animation
          >
            <div className="mb-4 p-3 bg-lime-500/20 rounded-full">
              <MessageSquare className="w-12 h-12 text-lime-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Tailored Investment Plans
            </h3>
            <p className="text-white mb-6 text-sm sm:text-base">
              Discover diverse investment plans designed to maximize your
              returns, from small-scale investments to major growth
              opportunities, progressing through ICO slabs.
            </p>
            <a
              href="/login"
              className="text-lime-400 hover:text-lime-300 font-medium flex items-center group"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </motion.div>

          {/* Card 2: Powerful Referral System */}
          <motion.div
            className="bg-teal-900 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ translateY: -10 }}
          >
            <div className="mb-4 p-3 bg-lime-500/20 rounded-full">
              <Globe className="w-12 h-12 text-lime-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Powerful Referral System
            </h3>
            <p className="text-white mb-6 text-sm sm:text-base">
              Generate unique referral codes, build your team, and earn bonuses
              based on their activity and purchases, with easy tracking of your
              network.
            </p>
            <a
              href="/login"
              className="text-lime-400 hover:text-lime-300 font-medium flex items-center group"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </motion.div>

          {/* Card 3: Secure & Transparent Transactions */}
          <motion.div
            className="bg-teal-900 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ translateY: -10 }}
          >
            <div className="mb-4 p-3 bg-lime-500/20 rounded-full">
              <Briefcase className="w-12 h-12 text-lime-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Secure & Transparent Transactions
            </h3>
            <p className="text-white mb-6 text-sm sm:text-base">
              Benefit from seamless purchases of Jaimax Coins via an integrated
              payment gateway, with detailed transaction history and secure
              withdrawal options.
            </p>
            <a
              href="/login"
              className="text-lime-400 hover:text-lime-300 font-medium flex items-center group"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const LocationsSectionContent = () => {
  const countryFlags = [
    "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/330px-Flag_of_Australia_%28converted%29.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/330px-Flag_of_Europe.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png",
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const flagVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" },
    },
  };
  const iframeVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 0 30px rgba(255,255,255,0.2)",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

  return (
  <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 font-inter bg-[#085056]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6">
        {/* Left Side — Text */}
        <motion.div
          className="lg:w-[40%] w-full text-center lg:text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-lime-400 text-sm uppercase tracking-wider font-semibold mb-2">
            Our Locations
          </p>
          <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 pt-5">
            Powering Global Decentralization
          </h3>
          <p className="text-white text-base sm:text-lg mb-8 pt-4 max-w-[90%] lg:max-w-[80%] mx-auto lg:mx-0">
            Jaimax’s head office serves as the central hub for global operations —
            connecting users, developers, and investors from every corner of the
            world. Our platform bridges innovation and opportunity, enabling
            seamless participation in the decentralized economy.
          </p>
        </motion.div>

        {/* Right Side — Map */}
        <motion.div
          className="lg:w-[60%] w-full h-[250px] sm:h-[400px] lg:h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md relative group"
          variants={iframeVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
        >
          {/* Shimmer overlay effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 4,
              ease: "linear",
            }}
          ></motion.div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4817726161396!2d78.36422667493588!3d17.43664038345895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e668e1daef%3A0x4bfeabd499a8d3d0!2sJaimax!5e0!3m2!1sen!2sin!4v1762930625861!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jaimax Location"
          ></iframe>
        </motion.div>
      </div>
    </motion.section>
  );
};


const ContactInformationSectionContent = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitEnquiry, { isLoading }] = useSubmitEnquiryMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, "Phone number is not valid")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await submitEnquiry(values).unwrap();
        resetForm();
        setShowThankYou(true); // Show thank you banner
      } catch (err) {
        alert("There was an error sending your message. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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
              className="relative w-full max-w-md bg-gradient-to-br from-[#085056] via-[#0a6b73] to-[#085056] rounded-2xl p-8 shadow-2xl border border-white/20 overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />
              </div>

              {/* Confetti particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={confettiVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute top-1/2 left-1/2"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: i % 2 === 0 ? "50%" : "2px",
                      backgroundColor: [
                        "#84cc16",
                        "#22d3ee",
                        "#fbbf24",
                        "#f472b6",
                        "#a78bfa",
                        "#34d399",
                        "#fb7185",
                        "#60a5fa",
                      ][i],
                    }}
                  />
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Checkmark icon */}
                <motion.div
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-lime-500/30"
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Thank You!
                </motion.h3>

                {/* Message */}
                <motion.p
                  className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Your message has been sent successfully. Our team will get
                  back to you within 24-48 hours.
                </motion.p>

                {/* Divider */}
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-lime-400 to-teal-400 mx-auto rounded-full mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />

                {/* Contact info reminder */}
                <motion.p
                  className="text-white/60 text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  For urgent queries, call us at{" "}
                  <a
                    href="tel:+919121799947"
                    className="text-lime-400 hover:underline"
                  >
                    +91 9121799947
                  </a>
                </motion.p>

                {/* Close button */}
                <motion.button
                  onClick={() => setShowThankYou(false)}
                  className="bg-gradient-to-r from-lime-500 to-lime-600 text-white font-semibold py-3 px-8 rounded-full hover:from-lime-600 hover:to-lime-700 transition-all duration-300 shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
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

      {/* Main Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 font-inter bg-[#085056]">
        <div className="max-w-7xl mx-auto">
          {/* Title and Description */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <p className="text-lime-400 text-sm uppercase tracking-wider font-semibold mb-2">
              GET IN TOUCH
            </p>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Contact information
            </h1>
            <p className="text-white max-w-3xl mx-auto text-base sm:text-lg">
              Our team is ready to assist you with your Jaimax Coin inquiries
              and support. Reach out to us for any questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Head office and Contact Details */}
            <motion.div
              className="relative rounded-xl p-8 shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <div
                className="absolute inset-0 z-[-1] opacity-20"
                style={{
                  background:
                    "linear-gradient(to top right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                }}
              ></div>

              <h3 className="text-white text-xl font-semibold mb-6">
                Head office
              </h3>
              <div className="space-y-8">
                <motion.div
                  className="flex items-start text-white"
                  variants={itemVariants}
                >
                  <MapPin className="h-6 w-6 text-lime-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Survey No :18, India building, 4th Floor, Vaishnavi's
                    Cynosure, Extension, Gachibowli, Hyderabad, Telangana
                    500081.
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-start text-white space-x-3"
                  variants={itemVariants}
                >
                  <Phone className="h-6 w-6 text-lime-400 mt-1" />
                  <div className="flex flex-col space-y-1">
                    <a
                      href="tel:+919121799947"
                      title="contact us for the support"
                      className="hover:text-lime-400 transition-colors duration-200 cursor-pointer"
                    >
                      +91 9121799947
                    </a>
                    <a
                      href="tel:+919121758880"
                      title="contact us for the support"
                      className="hover:text-lime-400 transition-colors duration-200 cursor-pointer"
                    >
                      +91 9121758880
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center text-white"
                  variants={itemVariants}
                >
                  <Mail className="h-6 w-6 text-lime-400 mr-3" />
                  <a
                    href="mailto:office@jaimax.com"
                    title="contact us for the support"
                    className="hover:text-lime-400 transition-colors duration-200 cursor-pointer"
                  >
                    office@jaimax.com
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-start text-white"
                  variants={itemVariants}
                >
                  <Clock className="h-6 w-6 text-lime-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p>Sat - Sun: Closed</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Send us a message form */}
            <motion.div
              className="relative rounded-xl p-8 shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={formVariants}
            >
              <div
                className="absolute inset-0 z-[-1] opacity-20"
                style={{
                  background:
                    "linear-gradient(to bottom left, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                }}
              ></div>

              <h3 className="text-white text-xl font-semibold mb-6">
                Send us a message
              </h3>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl border border-white/10"
                    placeholder="Enter your name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-400 text-sm mt-1">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl border border-white/10"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-400 text-sm mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phone"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl border border-white/10"
                    placeholder="Enter your phone number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-400 text-sm mt-1">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl border border-white/10"
                    placeholder="Type your message here..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  ></textarea>
                  {formik.touched.message && formik.errors.message ? (
                    <div className="text-red-400 text-sm mt-1">
                      {formik.errors.message}
                    </div>
                  ) : null}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading || formik.isSubmitting}
                  className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-full hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#09545a] disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading || formik.isSubmitting
                    ? "Sending..."
                    : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};


const CombinedSections = () => {
const contactschema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Define the ContactPage
    {
      "@type": "ContactPage",
      "@id": "https://www.jaimax.com/contact#contactpage",
      "url": "https://www.jaimax.com/contact",
      "name": "Contact Jaimax | Support & Enquiries",
      "description": "Get in touch with the Jaimax team for product support, business enquiries, or partnership opportunities. Our 24/7 help center is here to assist you.",
      "inLanguage": "en",
      "publisher": { "@id": "https://www.jaimax.com/#organization" },
      "isPartOf": { "@id": "https://www.jaimax.com/#website" },
      // Important: Reference the Organization entity as the main subject of the contact
      "mainEntityOfPage": { "@id": "https://www.jaimax.com/#organization" }
    },

    // 2. Define the Organization (Jaimax) and its contact point
    // This section is crucial for showing rich contact information in search results
    {
      "@type": "Organization",
      "@id": "https://www.jaimax.com/#organization", // Matches the reference above
      "name": "Jaimax",
      "url": "https://www.jaimax.com/",
      "logo": "https://www.jaimax.com/logo.png", // Replace with your actual logo URL
      "sameAs": [
        "https://twitter.com/jaimax_crypto", // Replace with actual social links
        "https://linkedin.com/company/jaimax_crypto"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-98765-43210", // Replace with your primary support phone number
          "contactType": "customer service",
          "email": "support@jaimax.com", // Replace with your support email
          "areaServed": ["IN", "Global"], // Specify India and Global service areas
          "availableLanguage": ["en", "hi"], // English and Hindi
          "hoursAvailable": "24/7" // Specify availability
        },
        {
          "@type": "ContactPoint",
          "email": "office@jaimax.com", // Replace with your business/partnership email
          "contactType": "business enquiries",
          "availableLanguage": "en"
        }
      ]
    },

    // 3. Define the WebSite (for completeness, assumed to be defined elsewhere, but good practice)
    {
      "@type": "WebSite",
      "@id": "https://www.jaimax.com/#website",
      "url": "https://www.jaimax.com/",
      "name": "Jaimax - Building the Future of Digital Finance",
      "publisher": { "@id": "https://www.jaimax.com/#organization" }
    }
  ]
};
  return (
    <>

<Helmet>
  <title>Contact Jaimax | 24/7 Support & Help Center</title>
  <meta
    name="description"
    content="Contact the Jaimax support team any time via phone, email or chat. Our 24/7 help center is here to assist you with wallet access, deposits, withdrawals and account-related queries."
  />
  <link rel="canonical" href="https://www.jaimax.com/contact" />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactschema) }}>
    </script>
</Helmet>

      <ContactInformationSectionContent />
      <OurMissionSectionContent />
      <LocationsSectionContent />
    </>
  );
};

export default CombinedSections;

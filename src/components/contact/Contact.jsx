


import React from 'react';
import { MessageSquare, Globe, Briefcase, MapPin, Phone, Send, Clock, Mail } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useSubmitEnquiryMutation } from '../../pages/home/HomePageApiSlice';

const OurMissionSectionContent = () => {
  // Animation variants for the section title and description
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animation variants for the individual cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Title and Description */}
        <motion.div
          className="text-center lg:text-left mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <p className="text-lime-400 text-sm uppercase tracking-wider font-semibold mb-2">OUR MISSION</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Unlock Your Financial Future with Jaimax Coin
          </h2>
          <p className="text-white max-w-7xl lg:mx-0 mx-auto text-base sm:text-lg">
            Welcome to Jaimax Coin – an all-in-one platform designed to help you achieve your financial goals through tailored investment plans, team-building opportunities, and innovative referral systems. Whether you're an experienced investor or new to digital assets, Jaimax Coin blends investment tools, strategies, and network growth potential to empower your financial future.
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
            <h3 className="text-white text-xl font-semibold mb-3">Tailored Investment Plans</h3>
            <p className="text-white mb-6 text-sm sm:text-base">
              Discover diverse investment plans designed to maximize your returns, from small-scale investments to major growth opportunities, progressing through ICO slabs.
            </p>
            <a href="/investment-plans" className="text-lime-400 hover:text-lime-300 font-medium flex items-center group">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
            <h3 className="text-white text-xl font-semibold mb-3">Powerful Referral System</h3>
            <p className="text-white mb-6 text-sm sm:text-base">
              Generate unique referral codes, build your team, and earn bonuses based on their activity and purchases, with easy tracking of your network.
            </p>
            <a href="/login" className="text-lime-400 hover:text-lime-300 font-medium flex items-center group">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
            <h3 className="text-white text-xl font-semibold mb-3">Secure & Transparent Transactions</h3>
            <p className="text-white mb-6 text-sm sm:text-base">
              Benefit from seamless purchases of Jaimax Coins via an integrated payment gateway, with detailed transaction history and secure withdrawal options.
            </p>
            <a href="/security" className="text-lime-400 hover:text-lime-300 font-medium flex items-center group">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const flagVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center font-inter">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <p className="text-lime-400 text-sm uppercase tracking-wider font-semibold mb-2">LOCATIONS</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Connecting Investors Globally
          </h2>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg mb-12">
            While our central operations are based in Hyderabad, India, Jaimax Coin's platform enables users and investors from around the world to participate in the decentralized economy.
          </p>
        </motion.div>

        {/* Flag Icons Grid */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {countryFlags.map((flagUrl, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-900 rounded-full flex items-center justify-center p-2 shadow-2xl"
              variants={flagVariants}
              whileHover={{ rotate: 15, scale: 1.1 }} // Hover animation for flags
            >
              <img src={flagUrl} alt={`Country Flag ${index + 1}`} className="rounded-full w-full h-full object-cover"  loading='lazy'/>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ContactInformationSectionContent = () => {
  const [submitEnquiry, { isLoading, isSuccess, isError, error }] = useSubmitEnquiryMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, 'Phone number is not valid')
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await submitEnquiry(values).unwrap();
        resetForm();
        alert('Your message has been sent successfully!');
      } catch (err) {
        // console.error('Error submitting enquiry:', err);
        alert('There was an error sending your message. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Title and Description */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <p className="text-lime-400 text-sm uppercase tracking-wider font-semibold mb-2">GET IN TOUCH</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Contact information
          </h2>
          <p className="text-white max-w-3xl mx-auto text-base sm:text-lg">
            Our team is ready to assist you with your Jaimax Coin inquiries and support. Reach out to us for any questions.
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
            <div className="absolute inset-0 z-[-1] opacity-20" style={{ background: 'linear-gradient(to top right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}></div>

            <h3 className="text-white text-xl font-semibold mb-6">Head office</h3>
            <div className="space-y-8">
              <motion.div className="flex items-start text-white" variants={itemVariants}>
                <MapPin className="h-6 w-6 text-lime-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Survey No :18, India building, 4th Floor, Vaishnavi's Cynosure, Extension, Gachibowli, Hyderabad, Telangana 500081.</span>
              </motion.div>
              <motion.div className="flex items-center text-white" variants={itemVariants}>
                <Phone className="h-6 w-6 text-lime-400 mr-3" />
                <a 
                  href="tel:+916303008654" 
                  className="hover:text-lime-400 transition-colors duration-200 cursor-pointer"
                >
                  +91 6303008654
                </a>
              </motion.div>
              <motion.div className="flex items-center text-white" variants={itemVariants}>
                <Mail className="h-6 w-6 text-lime-400 mr-3" />
                <a 
                  href="mailto:office@jaimax.com" 
                  className="hover:text-lime-400 transition-colors duration-200 cursor-pointer"
                >
                  office@jaimax.com
                </a>
              </motion.div>
              <motion.div className="flex items-start text-white" variants={itemVariants}>
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
            <div className="absolute inset-0 z-[-1] opacity-20" style={{ background: 'linear-gradient(to bottom left, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}></div>

            <h3 className="text-white text-xl font-semibold mb-6">Send us a message</h3>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
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
                  <div className="text-red-400 text-sm mt-1">{formik.errors.name}</div>
                ) : null}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
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
                  <div className="text-red-400 text-sm mt-1">{formik.errors.email}</div>
                ) : null}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
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
                  <div className="text-red-400 text-sm mt-1">{formik.errors.phone}</div>
                ) : null}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
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
                  <div className="text-red-400 text-sm mt-1">{formik.errors.message}</div>
                ) : null}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading || formik.isSubmitting}
                className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-full hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#09545a] disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading || formik.isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CombinedSections = () => {
  return (
    <>
    
      <ContactInformationSectionContent />
      <OurMissionSectionContent />
      <LocationsSectionContent />
    </>
  );
};

export default CombinedSections;
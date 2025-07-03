import { motion } from "framer-motion";
import React from "react";
// import MetaTags from "../../utils/MetaTags";
import jaiMaxBkp from "../assets/Images/jmaxbackgroundlogo.svg";

const ApiTrading = () => {
  const pageTitle = "margin | margin trading";
  const pageDescription = "Meta description : margin trading";

  return (
    <div>
      {/* <MetaTags title={pageTitle} description={pageDescription} /> */}
      
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-3">
        <div className="text-center py-3 sm:py-12 lg:py-16">
          <motion.img 
            src={jaiMaxBkp} 
            className="w-auto h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mx-auto mb-6 sm:mb-8"
            alt="Jai Max Background Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 m-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Coming Soon
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-white mt-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We're working hard to bring you an amazing trading experience.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default ApiTrading;
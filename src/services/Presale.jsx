import { motion } from "framer-motion";
import React from "react";
// import MetaTags from "../../utils/MetaTags";
import jaiMaxBkp from "../assets/Images/presale.svg";
import IcoTimeline from "../assets/Images/icotimeline.svg";

const PreSale = () => {
  const pageTitle = "margin | margin trading";
  const pageDescription = "Meta description : margin trading";

  return (
    <div>
      {/* <MetaTags title={pageTitle} description={pageDescription} /> */}

      <div className="preSale container mx-auto px-4 py-10">
        <h3 className="text-white text-2xl md:text-3xl font-semibold mb-8 text-center md:text-left">
          ICO Timeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={IcoTimeline}
              alt="ICO Timeline"
              className="w-full max-w-md p-4"
            />
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src={jaiMaxBkp}
              alt="Pre Sale"
              className="w-full max-w-md p-4 mt-6 md:mt-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSale;

// import React, { useEffect } from "react";
// const Disclaimer = () => {

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])


//   return (
//     <div className="disclaimer">
//       <section className="about_page py-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <h3  className="text-white mb-4">Disclaimer </h3>
//               <p className="para">
//                 {" "}
//                 Trading in cryptocurrencies involves significant market,
//                 technical, and legal risks. Prices can fluctuate based on local
//                 demand and supply.{" "}
//               </p>
//               <p className="para">
//                 Crypto products and NFTs are unregulated and can be highly
//                 risky, with no regulatory recourse for any losses from such
//                 transactions. The information and materials provided here are
//                 subject to change without prior notice, including prices, which
//                 may vary based on market conditions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
// export default Disclaimer;




import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" bg-white">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2 tracking-tight">
              Disclaimer
            </h1>
            <p className="text-teal-500 text-base md:text-lg">
              Please read this important notice before using our platform.
            </p>
            <div className="w-16 h-1 bg-teal-300 mx-auto mt-4 rounded-full" />
          </header>

          {/* Main Content */}
          <section className="bg-white border border-teal-100 rounded-2xl shadow-sm p-6 md:p-10 space-y-8">
            {/* Trading Risks */}
            <div>
              <h2 className="text-lg font-semibold text-teal-700 mb-2">
                Trading Risks
              </h2>
              <p className="text-teal-900 text-base leading-relaxed">
                Trading in cryptocurrencies involves significant market, technical, and legal risks. Prices can fluctuate dramatically based on local demand and supply conditions, potentially resulting in substantial financial losses.
              </p>
            </div>

            {/* Regulatory Notice */}
            <div>
              <h2 className="text-lg font-semibold text-teal-700 mb-2">
                Regulatory Notice
              </h2>
              <p className="text-teal-900 text-base leading-relaxed">
                Crypto products and NFTs are unregulated and can be highly risky investments. There is no regulatory recourse available for any losses incurred from such transactions. You should only invest what you can afford to lose entirely.
              </p>
            </div>

            {/* Information Accuracy */}
            <div>
              <h2 className="text-lg font-semibold text-teal-700 mb-2">
                Information Accuracy
              </h2>
              <p className="text-teal-900 text-base leading-relaxed">
                The information and materials provided here are subject to change without prior notice. Prices and market data may vary significantly based on current market conditions and should not be considered as financial advice.
              </p>
            </div>

            {/* Call to Action */}
            <div className="pt-6 border-t border-teal-100 text-center">
              <p className="text-teal-700 text-base mb-6">
                Please ensure you fully understand the risks before proceeding with any cryptocurrency transactions.
              </p>
              <button
                onClick={() => navigate("/blog")}
                className="px-8 py-3 bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-sm"
              >
                Acknowledge &amp; Continue
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center mt-10">
            <p className="text-teal-400 text-xs">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
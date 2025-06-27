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
import { AlertTriangle, Shield, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {

  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen ">


      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Important Disclaimer
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className=" rounded-3xl   p-8 md:p-12">
            <div className="space-y-8">
              {/* Risk Warning Section */}
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/30">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-red-400 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    Trading Risks
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    Trading in cryptocurrencies involves significant market, technical, and legal risks. 
                    Prices can fluctuate dramatically based on local demand and supply conditions, 
                    potentially resulting in substantial financial losses.
                  </p>
                </div>
              </div>

              {/* Regulatory Warning Section */}
              <div className="flex items-start space-x-4 p-6  rounded-2xl border border-yellow-500/30">
                <div className="flex-shrink-0">
                  <Info className="w-8 h-8 text-yellow-400 mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Regulatory Notice
                  </h3>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    Crypto products and NFTs are unregulated and can be highly risky investments. 
                    There is no regulatory recourse available for any losses incurred from such transactions. 
                    You should only invest what you can afford to lose entirely.
                  </p>
                </div>
              </div>

              {/* Information Accuracy Section */}
              <div className="p-6  rounded-2xl border border-blue-500/30">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Information Accuracy
                </h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  The information and materials provided here are subject to change without prior notice. 
                  Prices and market data may vary significantly based on current market conditions and 
                  should not be considered as financial advice.
                </p>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-8 border-t border-white/20">
                <p className="text-gray-300 text-lg mb-6">
                  Please ensure you fully understand the risks before proceeding with any cryptocurrency transactions.
                </p>
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Shield className="w-5 h-5" />
                  <button
                  onClick={() => navigate("/blog")}
                  ><span>Acknowledge & Continue</span></button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
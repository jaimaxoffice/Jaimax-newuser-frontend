// import React, { useEffect } from "react";
// import { X, ArrowRight, Coins } from "lucide-react";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// const CreateStakeModal = ({
//   show,
//   onClose,
//   stakeSchema,
//   handleStakeSubmit,
//   getQuote,
//   quoteData,
//   quoteLoading,
//   quoteError,
//   isLoading,
// }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fadeIn">
//       <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl w-full max-w-lg rounded-3xl overflow-hidden">

//         {/* Glow */}
//         <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 to-transparent pointer-events-none" />

//         {/* Header */}
//         <div className="relative flex justify-between items-center px-6 py-5 border-b border-teal-100">
//           <div>
//             <h3 className="text-xl font-bold text-gray-800">
//               Create Staking Order
//             </h3>
//             <p className="text-sm text-gray-500">
//               Buy JMX directly from a seller
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="w-10 h-10 rounded-full bg-white shadow hover:bg-red-50 flex items-center justify-center transition"
//           >
//             <X size={20} className="text-gray-600" />
//           </button>
//         </div>

//         <Formik
//           initialValues={{
//             sellerUsername: "",
//             buyInr: "",
//           }}
//           validationSchema={stakeSchema}
//           onSubmit={handleStakeSubmit}
//         >
//           {({ values, isSubmitting }) => {
//             useEffect(() => {
//               if (values.sellerUsername && values.buyInr) {
//                 const timeout = setTimeout(() => {
//                   getQuote({
//                     sellerUsername: values.sellerUsername,
//                     buyInr: Number(values.buyInr),
//                   });
//                 }, 500);

//                 return () => clearTimeout(timeout);
//               }
//             }, [values.sellerUsername, values.buyInr]);

//             return (
//               <Form className="relative p-6 space-y-5">

//                 {/* Inputs */}
//                 <div>
//                   <label className="block mb-2 font-medium text-gray-700">
//                     Seller Username
//                   </label>
//                   <Field
//                     name="sellerUsername"
//                     type="text"
//                     placeholder="Enter seller username"
//                     className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
//                   />
//                   <ErrorMessage
//                     name="sellerUsername"
//                     component="p"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium text-gray-700">
//                     Amount (INR)
//                   </label>
//                   <Field
//                     name="buyInr"
//                     type="number"
//                     placeholder="Enter amount"
//                     className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
//                   />
//                   <ErrorMessage
//                     name="buyInr"
//                     component="p"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 {/* Quote Preview */}
//                 {values.sellerUsername && values.buyInr && (
//                   <div className="bg-white/70 backdrop-blur-lg border border-teal-100 rounded-2xl p-5 shadow-inner">

//                     {quoteLoading ? (
//                       <div className="flex justify-center py-6">
//                         <Coins className="animate-spin text-teal-600" />
//                       </div>
//                     ) : quoteError ? (
//   <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//     <p className="text-red-600 font-semibold">
//       Quote Unavailable
//     </p>
//     <p className="text-sm text-red-500 mt-1">
//       {quoteError?.data?.message || "Unable to fetch quote"}
//     </p>
//   </div>
// ) : quoteData ? (
//                       <>
//                         {/* Coin animation */}
//                         <div className="relative flex justify-between items-center mb-6">
//                           <div className="text-center">
//                             <p className="text-xs text-gray-500">Seller</p>
//                             <p className="font-semibold text-red-500">
//                               {quoteData?.data?.parties?.seller?.username}
//                             </p>
//                           </div>

//                           <div className="relative w-28 h-10 flex items-center">
//                             <div className="absolute inset-0 border-t border-dashed border-teal-300 top-1/2" />
//                             <Coins
//                               className="absolute text-yellow-500 animate-coinMove"
//                               size={22}
//                             />
//                           </div>

//                           <div className="text-center">
//                             <p className="text-xs text-gray-500">Buyer</p>
//                             <p className="font-semibold text-green-500">
//                               {quoteData?.data?.parties?.buyer?.username}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="space-y-3 text-sm">
//                           <PreviewRow
//                             label="Payment"
//                             value={quoteData?.data?.summary?.youWillPay}
//                           />
//                           <PreviewRow
//                             label="Token Receive"
//                             value={quoteData?.data?.summary?.youWillReceive}
//                           />
//                           <PreviewRow
//                             label="Coin Price"
//                             value={quoteData?.data?.summary?.pricePerCoin}
//                           />
//                           <PreviewRow
//                             label="Wallet Balance After"
//                             value={quoteData?.data?.summary?.walletBalanceAfter}
//                           />
//                         </div>
//                       </>
//                     ) : null}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isLoading || isSubmitting}
//                   className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
//                 >
//                   {isLoading ? "Submitting..." : "Submit Order"}
//                 </button>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// const PreviewRow = ({ label, value }) => (
//   <div className="flex justify-between">
//     <span className="text-gray-600">{label}</span>
//     <span className="font-semibold text-teal-700">{value}</span>
//   </div>
// );

// export default CreateStakeModal;

import React, { useEffect } from "react";
import { X, Coins, ArrowLeftRight } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";

/* ─────────────────────────────────────────────────────────────────
   PASTE THIS INTO YOUR index.css
   ─────────────────────────────────────────────────────────────────

@keyframes arcCoin {
  0% {
    left: 0%;
    top: 50%;
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
  12% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  50% {
    top: 0%;
    opacity: 1;
    transform: translateY(-80%) scale(1.15);
  }
  88% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  100% {
    left: calc(100% - 20px);
    top: 50%;
    opacity: 0;
    transform: translateY(-50%) scale(0.5);
  }
}

.coin-arc {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 0%;
  animation: arcCoin 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.coin-arc-2 {
  animation-delay: 0.6s;
}
.coin-arc-3 {
  animation-delay: 1.2s;
}

   ───────────────────────────────────────────────────────────────── */

/* ── Arc Transfer animation component ── */
const ArcTransfer = () => (
  <div className="relative w-10 h-20 sm:flex-1 sm:h-10 mx-2 flex items-center justify-center">
    {/* desktop line */}
    <div className="hidden sm:block absolute w-full mt-2.5 h-px bg-teal-200 top-1/2" />

    {/* mobile vertical line */}
    <div className="sm:hidden absolute h-full w-px bg-teal-200 left-1/2" />

    <div className="coin-arc">
      <Coins size={20} className="text-yellow-500 drop-shadow-sm" />
    </div>

    <div className="coin-arc coin-arc-2">
      <Coins size={20} className="text-yellow-400 drop-shadow-sm" />
    </div>

    <div className="coin-arc coin-arc-3">
      <Coins size={20} className="text-yellow-300 drop-shadow-sm" />
    </div>
  </div>
);

/* ── Main Modal ── */
const CreateStakeModal = ({
  show,
  onClose,
  stakeSchema,
  handleStakeSubmit,
  getQuote,
  quoteData,
  quoteLoading,
  quoteError,
  isLoading,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div
        className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl h-[80%] overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* ── Teal-700 header with curved clip-path bottom ── */}
        <div
          className="relative bg-gradient-to-br from-teal-700 to-teal-600 px-6 pt-10 pb-20 overflow-hidden"
          style={{ clipPath: "ellipse(110% 100% at 50% 0%)" }}
        >
          <div className="absolute w-44 h-44 rounded-full bg-white/10 -bottom-16 -left-12 pointer-events-none" />
          <div className="absolute w-28 h-28 rounded-full bg-white/10 -top-10 -right-8 pointer-events-none" />
          <div className="absolute w-16 h-16 rounded-full bg-teal-500/30 bottom-8 right-12 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight flex gap-2 items-center">
              <span><ArrowLeftRight /></span>
              <span>P2P Purchase</span>
              
            </h3>
            <p className="text-teal-100 text-xs sm:text-sm mt-1.5 text-start">
              Buy JMC directly from a seller
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* ── Form body ── */}
        <Formik
          initialValues={{ sellerUsername: "", buyInr: "" }}
          validationSchema={stakeSchema}
          onSubmit={handleStakeSubmit}
        >
          {({ values, isSubmitting }) => {
            useEffect(() => {
              if (values.sellerUsername && values.buyInr) {
                const timeout = setTimeout(() => {
                  getQuote({
                    sellerUsername: values.sellerUsername,
                    buyInr: Number(values.buyInr),
                  });
                }, 500);
                return () => clearTimeout(timeout);
              }
            }, [values.sellerUsername, values.buyInr]);

            return (
              <Form className="px-6 pb-6 mt-5 space-y-5">
                {/* Seller Username */}
                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                    Seller Username
                  </label>
                  <Field
                    name="sellerUsername"
                    type="text"
                    placeholder="Enter seller username"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 transition"
                  />
                  <ErrorMessage
                    name="sellerUsername"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Amount INR */}
                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                    Amount (INR)
                  </label>
                  <Field
                    name="buyInr"
                    type="number"
                    placeholder="Enter amount"
                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 transition"
                  />
                  <ErrorMessage
                    name="buyInr"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Quote Preview */}
                {values.sellerUsername && values.buyInr && (
                  <div className="">
                    {quoteLoading ? (
                      <div className="bg-teal-50 p-3 sm:p-5 rounded-xl">
                      <div className="flex justify-center py-6">
                        <Coins
                          className="animate-spin text-teal-700"
                          size={24}
                        />
                      </div>
                      </div>
                    ) : quoteError ? (
                      <div className="bg-red-50 rounded-xl p-4">
                        <p className="text-red-600 font-semibold text-sm">
                          Preview Unavailable
                        </p>
                        <p className="text-red-400 text-xs mt-1">
                          {quoteError?.data?.message || "Unable to fetch quote"}
                        </p>
                      </div>
                    ) : quoteData ? (
                      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3 sm:p-5">
                        {/* Seller → arc coins → Buyer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-5 sm:gap-0">
                          <div className="text-center shrink-0">
                            <p className="text-[10px] sm:text-xs text-gray-400 sm:mb-1.5">
                              Seller
                            </p>
                            <span className="text-[10px] sm:text-xs font-semibold bg-red-100 text-red-600 px-3 py-1 rounded-full">
                              {quoteData?.data?.parties?.seller?.username}
                            </span>
                          </div>

                          {/* Arc animation sits between the two labels */}
                          <ArcTransfer />

                          <div className="text-center shrink-0">
                            <p className="text-[10px] sm:text-xs text-gray-400 sm:mb-1.5">
                              Buyer
                            </p>
                            <span className="text-[10px] sm:text-xs font-semibold bg-green-100 text-green-400 px-3 py-1 rounded-full">
                              {quoteData?.data?.parties?.buyer?.username}
                            </span>
                          </div>
                        </div>

                        {/* Preview rows */}
                        <div className="space-y-2.5">
                          <PreviewRow
                            label="Payment"
                            value={quoteData?.data?.summary?.youWillPay}
                          />
                          <PreviewRow
                            label="Token Receive"
                            value={quoteData?.data?.summary?.youWillReceive}
                          />
                          <PreviewRow
                            label="Coin Price"
                            value={quoteData?.data?.summary?.pricePerCoin}
                          />
                          <PreviewRow
                            label="Wallet Balance After"
                            value={quoteData?.data?.summary?.walletBalanceAfter}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full bg-teal-700 hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed
                             text-white py-3.5 rounded-full font-semibold text-sm 
                              transition-all duration-200"
                >
                  {isLoading || isSubmitting ? "Submitting..." : "Submit Order"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const PreviewRow = ({ label, value }) => (
  <div className="flex justify-between items-center pb-1 last:border-0 last:pb-0">
    <span className="text-xs sm:text-sm text-gray-500">{label}</span>
    <span className="text-xs sm:text-sm font-semibold text-teal-700">
      {value}
    </span>
  </div>
);

export default CreateStakeModal;

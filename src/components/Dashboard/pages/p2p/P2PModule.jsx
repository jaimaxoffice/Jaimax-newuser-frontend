// import React, { useState } from "react";
// import {
//   Coins,
//   Pickaxe,
//   ShieldCheck,
//   Calendar,
//   TrendingUp,
// } from "lucide-react";
// import { useBuyP2PMutation } from "./p2pApiSlice";
// import { toast } from "../../../../ReusableComponents/Toasts/Toasts";

// const P2PModule = () => {
//   const [activeTab, setActiveTab] = useState("mining");

//   const [buyP2P, { isLoading }] = useBuyP2PMutation();

// const [formData, setFormData] = useState({
//   sellerUsername: "",
//   buyInr: "",
// });

//   const stakingOrders = [
//     {
//       id: "STK-1024",
//       date: "04 May 2026",
//       coins: "25,000 JMX",
//       value: "₹2,00,000",
//       status: "Active",
//     },
//     {
//       id: "STK-1025",
//       date: "29 Apr 2026",
//       coins: "30,000 JMX",
//       value: "₹2,40,000",
//       status: "Completed",
//     },
//   ];

//   const handleStakeSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.sellerUsername || !formData.buyInr) {
//     toast.error("All fields are required");
//     return;
//   }

//   try {
//     const res = await buyP2P({
//       sellerUsername: formData.sellerUsername,
//       buyInr: Number(formData.buyInr),
//     }).unwrap();

//     toast.success(res?.message || "Stake request submitted");

//     setFormData({
//       sellerUsername: "",
//       buyInr: "",
//     });
//   } catch (err) {
//     toast.error(err?.data?.message || "Something went wrong");
//   }
// };

//   const StatCard = ({ icon: Icon, title, value }) => (
//     <div className="bg-white rounded-2xl shadow-md border border-teal-100 p-5 hover:shadow-lg transition-all">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <h3 className="text-xl font-bold text-gray-800 mt-1">{value}</h3>
//         </div>
//         <div className="bg-teal-100 p-3 rounded-xl">
//           <Icon className="text-teal-600" size={22} />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-4 ">
//       <div className=" mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">
//             P2P Dashboard
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Mining & staking overview
//           </p>
//         </div>

//         {/* Toggle */}
// <div className="bg-white rounded-xl p-2 shadow-md mb-8 w-full">
//   <div className="grid grid-cols-2 gap-1 w-full">
//     {["mining", "staking"].map((tab) => (
//       <button
//         key={tab}
//         onClick={() => setActiveTab(tab)}
//         className={`w-full py-2 rounded-md font-semibold text-base transition-all capitalize ${
//           activeTab === tab
//             ? "bg-teal-600 text-white shadow-md"
//             : "bg-gray-100 text-gray-600 hover:bg-teal-50"
//         }`}
//       >
//         {tab}
//       </button>
//     ))}
//   </div>
// </div>

//         {/* Mining */}
//         {activeTab === "mining" && (
//           <div className="space-y-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
//               <StatCard
//                 icon={Coins}
//                 title="Total Coins"
//                 value="125,000 JMX"
//               />
//               <StatCard
//                 icon={ShieldCheck}
//                 title="Eligibility"
//                 value="50K / Above 25K"
//               />
//               <StatCard
//                 icon={Pickaxe}
//                 title="Mining Reward"
//                 value="2,500 JMX"
//               />
//               <StatCard
//                 icon={TrendingUp}
//                 title="Current Value"
//                 value="₹8,75,000"
//               />
//             </div>

//             <div className="bg-white rounded-2xl shadow-md p-6">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">
//                 Mining Progress
//               </h3>

//               <div className="w-full bg-gray-200 rounded-full h-4">
//                 <div
//                   className="bg-teal-600 h-4 rounded-full"
//                   style={{ width: "72%" }}
//                 ></div>
//               </div>

//               <p className="mt-3 text-gray-600">
//                 72% completed toward next reward milestone
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Staking */}
//        {activeTab === "staking" && (
//   <div className="space-y-8">

//     {/* Buy Form */}
//     <div className="bg-white rounded-2xl shadow-md border border-teal-100 p-6">
//       <h3 className="text-lg font-bold text-gray-800 mb-5">
//         Create Staking Order
//       </h3>

//       <form
//         onSubmit={handleStakeSubmit}
//         className="grid grid-cols-1 md:grid-cols-3 gap-4"
//       >
//         <input
//           type="text"
//           placeholder="Seller Username"
//           value={formData.sellerUsername}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               sellerUsername: e.target.value,
//             })
//           }
//           className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
//         />

//         <input
//           type="number"
//           placeholder="Amount (INR)"
//           value={formData.buyInr}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               buyInr: e.target.value,
//             })
//           }
//           className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
//         />

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 font-semibold transition-all disabled:bg-teal-300"
//         >
//           {isLoading ? "Submitting..." : "Stake Now"}
//         </button>
//       </form>
//     </div>

//     {/* Orders */}
//     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//       {stakingOrders.map((order) => (
//         <div
//           key={order.id}
//           className="bg-white rounded-2xl shadow-md border border-teal-100 p-6"
//         >
//           <div className="flex justify-between items-start mb-5">
//             <div>
//               <h3 className="text-lg font-bold text-gray-800">
//                 {order.id}
//               </h3>
//               <p className="text-gray-500 flex items-center gap-2 mt-1">
//                 <Calendar size={15} />
//                 {order.date}
//               </p>
//             </div>

//             <span
//               className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 order.status === "Active"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-blue-100 text-blue-700"
//               }`}
//             >
//               {order.status}
//             </span>
//           </div>

//           <div className="space-y-3">
//             <div className="flex justify-between">
//               <span className="text-gray-500">Coins</span>
//               <span className="font-semibold text-gray-800">
//                 {order.coins}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-500">Current Value</span>
//               <span className="font-semibold text-teal-600">
//                 {order.value}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//       </div>
//     </div>
//   );
// };

// export default P2PModule;

import React, { useState } from "react";
import {
  Coins,
  Pickaxe,
  ShieldCheck,
  Calendar,
  TrendingUp,
  X,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useBuyP2PMutation, useGetMyP2PHistoryQuery, useLazyGetP2PQuoteQuery } from "./p2pApiSlice";
import { toast } from "../../../../ReusableComponents/Toasts/Toasts";
import CreateStakeModal from "./CreateStakeModal";
import StakingHistory from "./StakingHistory";

export const stakeSchema = Yup.object({
  sellerUsername: Yup.string().required("Seller username is required"),
  buyInr: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});

const P2PModule = () => {
  const [activeTab, setActiveTab] = useState("staking");
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [page, setPage] = useState(1);

  const [buyP2P, { isLoading }] = useBuyP2PMutation();

  const [getQuote, { data: quoteData, isFetching: quoteLoading, error: quoteError }] =
    useLazyGetP2PQuoteQuery();

  const {data: getHistory, isLoading: loading} = useGetMyP2PHistoryQuery({page,
  limit: 10});

  // console.log(getHistory)

  const handleStakeSubmit = async (values, { resetForm }) => {
    try {
      const res = await buyP2P({
        sellerUsername: values.sellerUsername,
        buyInr: Number(values.buyInr),
      }).unwrap();

      toast.success(res?.message || "Stake request submitted");

      resetForm();
      setShowStakeModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-white rounded-2xl shadow-md border border-teal-100 p-5 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="bg-teal-100 p-3 rounded-xl">
          <Icon className="text-teal-600" size={22} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-teal-50 to-teal-100 p-4 sm:p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-800 mb-2">P2P Dashboard</h1>
          {/* <p className="text-gray-600 mt-1">Start Your Journey with P2P</p> */}
        </div>

        {/* Toggle */}
        <div className="bg-white rounded-xl p-2 shadow-md mb-8 w-full">
          <div className="grid grid-cols-2 gap-1 w-full">
            {["staking", "mining"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-2 rounded-md font-semibold text-sm sm:text-base transition-all capitalize ${
                  activeTab === tab
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-teal-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mining */}
{activeTab === "mining" && (
  <div className="flex items-center justify-center min-h-[420px] ">
    <div className="w-full bg-white rounded-3xl border border-teal-100 shadow-sm p-6 sm:p-12 text-center">
      
      {/* Icon */}
      <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-teal-50 flex items-center justify-center mb-6">
        <Pickaxe className="text-teal-600" size={32} />
      </div>

      {/* Badge */}
      <span className="inline-flex px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-100 mb-5">
        Coming Soon
      </span>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-900">
        Jaimax Mining P2P
      </h2>
      {/* Footer Note */}
      <p className="mt-8 text-xs sm:text-sm text-slate-400">
        This feature will be available in an upcoming platform update. Insights are currently under development.
      </p>
    </div>
  </div>
)}

        {/* Staking */}
        {activeTab === "staking" && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button
                onClick={() => setShowStakeModal(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm sm:text-base rounded-full font-semibold flex items-center gap-2 transition-all"
              >
                <Plus size={18} />
                Purchase
              </button>
            </div>

            <StakingHistory history={getHistory} onPageChange={(page) => {setPage(page)}} isLoading={isLoading || loading}/>
          </div>
        )}

        <CreateStakeModal
  show={showStakeModal}
  onClose={() => setShowStakeModal(false)}
  stakeSchema={stakeSchema}
  handleStakeSubmit={handleStakeSubmit}
  getQuote={getQuote}
  quoteData={quoteData}
  quoteError={quoteError}
  quoteLoading={quoteLoading}
  isLoading={isLoading}
/>
      </div>
    </div>
  );
};

export default P2PModule;

// import React from 'react'

// const Shareholders = () => {
//   return (
//     <div>shareholders.....</div>
//   )
// }

// export default Shareholders



// import React, { useState } from 'react';
// import { Calendar, Filter, MoreHorizontal, Eye, RefreshCw, Search } from 'lucide-react';

// export default function  Shareholders(){ 
//   const [hoveredRow, setHoveredRow] = useState(null);

//   const orders = [
//     {
//       id: '#2532',
//       customer: 'Brooklyn Fox',
//       avatar: '🦊',
//       address: '102 Archer Street, RUTLAND, VT 05701',
//       date: '31 Jul 2020',
//       price: '$64.00',
//       status: 'Pending',
//       statusColor: 'text-orange-600 bg-orange-100'
//     },
//     {
//       id: '#2533',
//       customer: 'John McCormick',
//       avatar: '👨',
//       address: '1245 Wiseman Street, CAMAS, WA 98607',
//       date: '01 Aug 2020',
//       price: '$25.00',
//       status: 'Shipped',
//       statusColor: 'text-blue-600 bg-blue-100'
//     },
//     {
//       id: '#2534',
//       customer: 'Sandra Pugh',
//       avatar: '👩',
//       address: '1640 Thorn Street, SALT CITY, GA 30904',
//       date: '02 Aug 2020',
//       price: '$74.00',
//       status: 'Completed',
//       statusColor: 'text-gray-600 bg-gray-100'
//     },
//     {
//       id: '#2535',
//       customer: 'Varnie Hunt',
//       avatar: '🧑',
//       address: '1836 Oak Drive, DURON, OK 73604',
//       date: '03 Aug 2020',
//       price: '$82.00',
//       status: 'Pending',
//       statusColor: 'text-orange-600 bg-orange-100'
//     },
//     {
//       id: '#2536',
//       customer: 'Mark Clark',
//       avatar: '👨‍💼',
//       address: '139 Augusta Park, NATOMA, KS 67651',
//       date: '03 Aug 2020',
//       price: '$19.00',
//       status: 'Shipped',
//       statusColor: 'text-green-600 bg-green-100'
//     },
//     {
//       id: '#2537',
//       customer: 'Randolph Fowler',
//       avatar: '👔',
//       address: '4685 Park Boulevard, BIXCA, CA 94606',
//       date: '03 Aug 2020',
//       price: '$87.00',
//       status: 'Pending',
//       statusColor: 'text-orange-600 bg-orange-100'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-[#1d8e85] p-6">
//       <div className="max-w-9xl mx-auto">
//         {/* Header */}
//     <div className='flex flex-col'>

// <div className="flex items-center bg-white rounded-2xl shadow-md p-4 w-full max-w-md space-x-4">
//       {/* Doctor Image */}
//       <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
//         <img
//           src="https://randomuser.me/api/portraits/women/65.jpg"
//           alt="Dr. Linda Iora"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Doctor Details */}
//       <div className="flex flex-col justify-between flex-grow">
//         <div>
//           <h3 className="text-gray-800 font-semibold text-lg">Dr. Linda Iora</h3>
//           <p className="text-gray-500 text-sm">Monday, August 19</p>
//           <p className="text-purple-600 font-bold mt-1">$ 123.00</p>
//         </div>

//         {/* Button */}
//         <button className="mt-3 bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
//           Book An Appointment
//         </button>
//       </div>
//     </div>
//         {/* Filters */}
//     <div className="bg-green-700 text-white rounded-xl p-4 w-full max-w-md space-y-4 shadow-md">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">✅ Eligibility Status</h2>
//         <span className="text-sm bg-green-800 px-2 py-1 rounded-full">22%</span>
//       </div>

//       <div className="bg-green-800 rounded-lg p-4">
//         <div className="flex justify-between items-center">
//           <p className="font-medium">Status</p>
//           <span className="w-2 h-2 rounded-full bg-red-500"></span>
//         </div>
//         <div className="mt-2 bg-gray-900 rounded-full text-center py-1 font-bold">
//           Not Eligible
//         </div>
//       </div>

//       <div>
//         <p className="font-medium mb-1">Progress</p>
//         <div className="bg-green-900 rounded-full h-3 relative overflow-hidden">
//           <div className="bg-gradient-to-r from-yellow-300 to-green-400 h-full w-[22%]" />
//         </div>
//         <div className="flex justify-between text-xs mt-1 text-white/80">
//           <span>22% complete</span>
//           <span className="bg-green-900 px-2 py-0.5 rounded-full text-white">22/100</span>
//         </div>
//       </div>
//     </div>

//      <div className="bg-green-700 text-white rounded-xl p-4 w-full max-w-md shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">👥 Referrals Summary</h2>
//         <span className="text-sm bg-green-800 px-2 py-1 rounded-full">
//           👤 Total: 381
//         </span>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-green-800 rounded-lg p-4">
//           <p className="text-sm mb-1">Direct Referrals</p>
//           <p className="text-2xl font-bold">33</p>
//         </div>

//         <div className="bg-green-800 rounded-lg p-4">
//           <p className="text-sm mb-1">Chain Referrals</p>
//           <p className="text-2xl font-bold">348</p>
//         </div>

//         <div className="bg-green-800 rounded-lg p-4">
//           <p className="text-sm mb-1">Qualified Members</p>
//           <p className="text-2xl font-bold">3</p>
//         </div>

//         <div className="bg-green-800 rounded-lg p-4">
//           <p className="text-sm mb-1">Eligibility</p>
//           <p className="text-2xl font-bold">22%</p>
//         </div>
//       </div>
//     </div>


//     </div>
//         {/* Table */}
//         <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-white/60 backdrop-blur-sm border-b border-white/20">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     <input type="checkbox" className="rounded border-gray-300" />
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Address</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     <div className="flex items-center">
//                       Date <Filter size={14} className="ml-1 cursor-pointer hover:text-gray-900" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                     <div className="flex items-center">
//                       Price <Filter size={14} className="ml-1 cursor-pointer hover:text-gray-900" />
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/20">
//                 {orders.map((order, index) => (
//                   <tr 
//                     key={order.id}
//                     className={`transition-all duration-300 cursor-pointer ${
//                       hoveredRow === index 
//                         ? 'bg-white transform scale-[1.02] shadow-xl border-l-4 border-[#1d8e85]' 
//                         : 'hover:bg-white/60'
//                     }`}
//                     onMouseEnter={() => setHoveredRow(index)}
//                     onMouseLeave={() => setHoveredRow(null)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input type="checkbox" className="rounded border-gray-300" />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-content text-sm mr-4 transition-all ${
//                           hoveredRow === index 
//                             ? 'bg-[#1d8e85] text-white' 
//                             : 'bg-white/60 backdrop-blur-sm border border-white/20'
//                         }`}>
//                           {order.avatar}
//                         </div>
//                         <div>
//                           <div className={`text-sm font-semibold transition-colors ${
//                             hoveredRow === index ? 'text-black' : 'text-gray-700'
//                           }`}>
//                             {order.customer}
//                           </div>
//                           <div className={`text-xs transition-colors ${
//                             hoveredRow === index ? 'text-black' : 'text-gray-500'
//                           }`}>
//                             {order.id}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors ${
//                       hoveredRow === index ? 'text-black' : 'text-gray-600'
//                     }`}>
//                       {order.address}
//                     </td>
//                     <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors ${
//                       hoveredRow === index ? 'text-black' : 'text-gray-600'
//                     }`}>
//                       {order.date}
//                     </td>
//                     <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold transition-colors ${
//                       hoveredRow === index ? 'text-black' : 'text-gray-700'
//                     }`}>
//                       {order.price}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full transition-all ${
//                         hoveredRow === index 
//                           ? 'bg-[#1d8e85] text-white' 
//                           : order.statusColor
//                       }`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex items-center space-x-3">
//                         <Eye size={16} className={`cursor-pointer transition-colors ${
//                           hoveredRow === index ? 'text-black hover:text-[#1d8e85]' : 'text-gray-400 hover:text-gray-600'
//                         }`} />
//                         <MoreHorizontal size={16} className={`cursor-pointer transition-colors ${
//                           hoveredRow === index ? 'text-black hover:text-[#1d8e85]' : 'text-gray-400 hover:text-gray-600'
//                         }`} />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="bg-white/60 backdrop-blur-sm px-6 py-4 border-t border-white/20 flex items-center justify-between">
//             <div className="text-sm text-gray-600">
//               Showing 04-10 of 28
//             </div>

//             <div className="flex items-center space-x-2">
//               <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-all">‹</button>
//               <button className="px-3 py-2 text-sm bg-gray-700 text-white rounded-lg font-semibold">1</button>
//               <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-all">2</button>
//               <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-all">3</button>
//               <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-all">4</button>
//               <span className="px-2 text-gray-500">...</span>
//               <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-all">›</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Filter, MoreHorizontal, Eye } from 'lucide-react';
import { motion } from "framer-motion";

export default function Shareholders() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const orders = [
    {
      id: '#2532',
      customer: 'Brooklyn Fox',
 
      address: '102 Archer Street, RUTLAND, VT 05701',
      date: '31 Jul 2020',
      price: '$64.00',
      status: 'Pending',
      statusColor: 'text-orange-600 bg-orange-100'
    },
    {
      id: '#2533',
      customer: 'John McCormick',
   
      address: '1245 Wiseman Street, CAMAS, WA 98607',
      date: '01 Aug 2020',
      price: '$25.00',
      status: 'Shipped',
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: '#2534',
      customer: 'Sandra Pugh',
     
      address: '1640 Thorn Street, SALT CITY, GA 30904',
      date: '02 Aug 2020',
      price: '$74.00',
      status: 'Completed',
      statusColor: 'text-gray-600 bg-gray-100'
    },
    {
      id: '#2535',
      customer: 'Varnie Hunt',

      address: '1836 Oak Drive, DURON, OK 73604',
      date: '03 Aug 2020',
      price: '$82.00',
      status: 'Pending',
      statusColor: 'text-orange-600 bg-orange-100'
    },
    {
      id: '#2536',
      customer: 'Mark Clark',
  
      address: '139 Augusta Park, NATOMA, KS 67651',
      date: '03 Aug 2020',
      price: '$19.00',
      status: 'Shipped',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: '#2537',
      customer: 'Randolph Fowler',
  
      address: '4685 Park Boulevard, BIXCA, CA 94606',
      date: '03 Aug 2020',
      price: '$87.00',
      status: 'Pending',
      statusColor: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d8e85] to-teal-600 p-4 sm:p-6">
      <div className="max-w-9xl  space-y-6">
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Doctor Card */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative flex items-center bg-white rounded-2xl shadow-xl p-6 h-full border border-white/20 backdrop-blur-sm overflow-hidden"
            >
              {/* Slanted background shape */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-[-40%] w-[120%] h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 skew-x-[-15deg] rounded-3xl opacity-20"
                style={{ transformOrigin: "top left" }}
              />

              {/* Profile Image */}
              <div className="relative z-10 w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Dr. Linda Iora"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center flex-grow min-w-0 ml-6">
                <h3 className="text-gray-900 font-bold text-xl truncate">
                  Dr. Linda Iora
                </h3>
                <p className="text-gray-500 text-xs mb-2 truncate">Monday, August 19</p>
                <p className="text-purple-600 font-extrabold text-xl mb-4">$123.00</p>
                <button className="w-max bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-full text-xs font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </div>

          {/* Eligibility Status Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl h-full border border-white/20 backdrop-blur-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-blue-400 rounded-full opacity-10 blur-2xl transform translate-x-6 -translate-y-6"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 flex items-center">
                    <span className="mr-2">✅</span>
                    Eligibility Status
                  </h2>
                  <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">
                    22%
                  </span>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-2 sm:p-3 mb-3 border border-blue-100">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-gray-800 text-xs">Current Status</p>
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                  </div>
                  <div className="bg-white rounded-lg text-center py-1 font-bold text-red-600 text-xs border border-red-100">
                    Not Eligible
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-1 text-gray-900 text-xs">Progress</p>
                  <div className="bg-gray-200 rounded-full h-2 relative overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-green-500 h-full w-[22%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-1 text-gray-600">
                    <span>22% complete</span>
                    <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-800 font-bold text-xs">22/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Referrals Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl h-full border border-white/20 backdrop-blur-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden">

              {/* Background decoration */}
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 bg-pink-400 rounded-full opacity-10 blur-2xl transform -translate-x-6 translate-y-6"></div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 space-y-1 sm:space-y-0">
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 flex items-center">
                    <span className="mr-2">👥</span>
                    Referrals Summary
                  </h2>
                  <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold">
                    Total: 381
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    ["Direct Referrals", "33"],
                    ["Chain Referrals", "348"],
                    ["Qualified Members", "3"],
                    ["Eligibility Rate", "22%"],
                  ].map(([label, value], idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-2 sm:p-3 border border-cyan-100 hover:shadow-md transition-shadow"
                    >
                      <p className="text-xs sm:text-sm text-gray-700 mb-1">{label}</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl overflow-hidden">

          {/* Mobile Card View (visible on small screens) */}
          <div className="block lg:hidden">
            <div className="p-4 border-b border-gray-200 bg-white/80">
              <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    {/* <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                      {order.avatar}
                    </div> */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.id}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 truncate">{order.address}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">{order.date}</p>
                        <p className="font-bold text-gray-900">{order.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table View (hidden on small screens) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <tr>

                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">S/NO</th>
                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">Name</th>
                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">
                    <div className="flex items-center gap-2">UserName<Filter size={14} className="text-gray-500" /></div>
                  </th>
                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">
                    <div className="flex items-center gap-2">	Direct Refs <Filter size={14} className="text-gray-500" /></div>
                  </th>
                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">Chain Refs</th>
                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">Progress</th>
                  <th className="px-6 py-4 uppercase tracking-wide text-gray-700 font-bold">	Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <tr key={order.id}
                    className={`transition-all duration-300 ${hoveredRow === index
                      ? 'bg-white scale-[1.01] shadow-lg border-l-4 border-teal-500 transform'
                      : 'hover:bg-white/80'
                      }`}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                  
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${hoveredRow === index ? 'bg-teal-500 text-white' : 'bg-gray-100'
                          }`}>
                          {order.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{order.customer}</div>
                          <div className="text-xs text-gray-500">{order.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{order.address}</td>
                    <td className="px-6 py-4 text-gray-700">{order.date}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{order.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${hoveredRow === index ? 'bg-teal-500 text-white' : order.statusColor
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Eye size={16} className="text-gray-500 hover:text-teal-500 cursor-pointer transition-colors" />
                        <MoreHorizontal size={16} className="text-gray-500 hover:text-teal-500 cursor-pointer transition-colors" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-600">Showing 1-6 of 28 results</div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="px-2 sm:px-3 py-1 text-gray-700 hover:bg-white rounded transition-colors">‹</button>
              {[1, 2, 3, 4].map(n => (
                <button key={n} className={`px-2 sm:px-3 py-1 rounded text-sm transition-colors ${n === 1 ? 'bg-teal-500 text-white' : 'hover:bg-white text-gray-700'
                  }`}>
                  {n}
                </button>
              ))}
              <span className="text-gray-500 px-1">...</span>
              <button className="px-2 sm:px-3 py-1 text-gray-700 hover:bg-white rounded transition-colors">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
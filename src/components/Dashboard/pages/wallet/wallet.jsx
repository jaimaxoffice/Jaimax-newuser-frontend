
// import React, { useEffect, useRef, useState } from 'react';
// import { FaShareAlt } from "react-icons/fa";
// import assets from "../../../../assets/assets"
// import { TextField, InputAdornment } from "@mui/material";
// import TransactionDetails from './transactionDetails/transactionDetails';
// import { useNavigate } from 'react-router-dom';



// const transactionData = []


// const Wallet = () => {

//   const navigate = useNavigate()
 
//   const shapeBaseStyles = {
//     position: 'absolute',
//     backgroundColor: '#111111',
//     opacity: 0.3,
//     pointerEvents: 'none',
//     transition: 'opacity 0.3s ease, transform 3s ease-in-out',
//     zIndex: 0,
//     animationIterationCount: 'infinite',
//     animationDirection: 'alternate',
//     willChange: 'transform',
//   };

//   const shapeStyles = {
//     circle: {
//       width: '6rem',
//       height: '6rem',
//       borderRadius: '50%',
//       animationName: 'floatUpDown',
//       animationDuration: '6s',
//     },
//     diamond: {
//       width: '5rem',
//       height: '5rem',
//       transform: 'rotate(45deg)',
//       animationName: 'floatLeftRight',
//       animationDuration: '5.5s',
//     },
//   };

//   const shapePositions = [
//     { top: '-1.5rem', right: '-1.5rem' },
//     { bottom: '-1.5rem', left: '-1.5rem' },
//   ];

//   return (
//     <>
//       <style>
//         {`
//             @keyframes floatUpDown {
//               0% { transform: translateY(0); }
//               100% { transform: translateY(10px); }
//             }
//             @keyframes floatLeftRight {
//               0% { transform: translateX(0); }
//               100% { transform: translateX(10px); }
//             }
//           `}
//       </style>

//       <div className='w-full bg-[#1d8e85] min-h-screen '>
//         <div className="px-4 py-6 space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* Wallet Box (Spans 2 Columns) */}
//             <div className="relative group p-6 rounded-xl shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] col-span-1 lg:col-span-2 flex flex-col justify-between">

//               {/* Floating shapes */}

//               {/* Floating shapes */}
//               {['circle', 'diamond'].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{ ...shapeBaseStyles, ...shapeStyles[shape], ...shapePositions[i] }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}

//               {/* Wallet Content */}
//               {/* Wallet Content */}
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#084e54] z-10 gap-4">
//                 {/* Wallet Info */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-[#e0f7f6] rounded-full flex items-center justify-center border-2 border-[#4ecdc4] shadow-md">
//                     <img
//                       src={assets.walletBal}
//                       alt="Wallet Icon"
//                       className="w-10 h-10 object-contain"
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm">Wallet Balance</p>
//                     <p className="text-2xl font-bold">₹0.00</p>
//                   </div>
//                 </div>

//                 {/* Add Money Button Section */}
//                 {/* Add Funds Button Section */}
//                 <div className="w-full  text-center sm:text-right">
//                   <h1 className="font-bold text-sm sm:text-base mb-2 sm:mb-2">Add Money to Wallet</h1>
//                   <button
//                     className="w-full bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white 
//     font-semibold px-5 py-2 sm:px-2 sm:py-3 text-sm sm:text-base 
//     rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition duration-300"

//     onClick={() => navigate("/add_funds")}
//                   >
//                     ADD FUNDS
//                   </button>
//                 </div>

//               </div>

//             </div>

//             {/* Referral Code Box (Single Column) */}
//             <div className="relative group bg-white p-6 rounded-xl shadow-lg text-[#084e54] overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
//               {/* Floating shapes */}
//               {['circle', 'diamond'].map((shape, i) => (
//                 <div
//                   key={i}
//                   style={{ ...shapeBaseStyles, ...shapeStyles[shape], ...shapePositions[i] }}
//                   className="group-hover:opacity-100 opacity-30"
//                 />
//               ))}
                 

//                             <TextField
//                 fullWidth
//                 label="Referral Code"
//                 value="JMXA4557jXXN"
//                 InputProps={{
//                   readOnly: true,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <FaShareAlt style={{ cursor: 'pointer', color: '#084e54' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   input: { color: '#084e54' },
//                   label: { color: '#084e54' },
//                   '& .MuiOutlinedInput-root': {
//                     '& fieldset': { borderColor: '#4caf50' },
//                     '&:hover fieldset': { borderColor: '#81c784' },
//                     '&.Mui-focused fieldset': { borderColor: '#66bb6a' },
//                   },
//                 }}
//               />

//             </div>

//           </div>
//         </div>

//         <div className="flex flex-col h-screen">
//           {/* Other sidebar or wallet boxes here */}
//           <TransactionDetails list={transactionData} />
//         </div>

//       </div>
//     {/* {(isLoading || loading) && <Loader />} */}
//     </>
//   );
// };

// export default Wallet; 


import React, { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";
import assets from "../../../../assets/assets";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const Wallet = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Replace with actual data
  const transactionData = [];

  const filteredList = transactionData.filter(
    (item) =>
      item.transactionId?.toLowerCase().includes(query.toLowerCase()) ||
      item.updatedBy?.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  ); 

  useEffect(() => setCurrentPage(1), [query]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const shapeBaseStyles = {
    position: "absolute",
    backgroundColor: "#111111",
    opacity: 0.3,
    pointerEvents: "none",
    transition: "opacity 0.3s ease, transform 3s ease-in-out",
    zIndex: 0,
    animationIterationCount: "infinite",
    animationDirection: "alternate",
    willChange: "transform",
  };

  const shapeStyles = {
    circle: {
      width: "6rem",
      height: "6rem",
      borderRadius: "50%",
      animationName: "floatUpDown",
      animationDuration: "6s",
    },
    diamond: {
      width: "5rem",
      height: "5rem",
      transform: "rotate(45deg)",
      animationName: "floatLeftRight",
      animationDuration: "5.5s",
    },
  };

  const shapePositions = [
    { top: "-1.5rem", right: "-1.5rem" },
    { bottom: "-1.5rem", left: "-1.5rem" },
  ];

  return (
    <>
      <style>
        {`
          @keyframes floatUpDown {
            0% { transform: translateY(0); }
            100% { transform: translateY(10px); }
          }
          @keyframes floatLeftRight {
            0% { transform: translateX(0); }
            100% { transform: translateX(10px); }
          }
        `}
      </style>

      <div className="w-full bg-[#1d8e85] min-h-screen">
        <div className="px-4 py-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet Info */}
            <div className="relative group p-6 rounded-xl shadow-lg bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] col-span-1 lg:col-span-2 flex flex-col justify-between">
              {["circle", "diamond"].map((shape, i) => (
                <div
                  key={i}
                  style={{
                    ...shapeBaseStyles,
                    ...shapeStyles[shape],
                    ...shapePositions[i],
                  }}
                  className="group-hover:opacity-100 opacity-30"
                />
              ))}

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[#084e54] z-10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#e0f7f6] rounded-full flex items-center justify-center border-2 border-[#4ecdc4] shadow-md">
                    <img
                      src={assets.walletBal}
                      alt="Wallet Icon"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm">Wallet Balance</p>
                    <p className="text-2xl font-bold">₹0.00</p>
                  </div>
                </div>

                <div className="w-full text-center sm:text-right">
                  <h1 className="font-bold text-sm sm:text-base mb-2 sm:mb-2">
                    Add Money to Wallet
                  </h1>
                  <button
                    className=" px-5 bg-gradient-to-r from-[#094e54] to-[#4ecdc4] text-white font-semibold py-2 sm:px-2 sm:py-3 text-sm sm:text-base rounded-full hover:from-[#0a5c64] hover:to-[#5dd5cd] transition duration-300"
                    onClick={() => navigate("/add_funds")}
                  >
                    ADD FUNDS
                  </button>
                </div>
              </div>
            </div>

            {/* Referral Box */}
            <div className="relative group bg-white p-6 rounded-xl shadow-lg text-[#084e54] overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
              {["circle", "diamond"].map((shape, i) => (
                <div
                  key={i}
                  style={{
                    ...shapeBaseStyles,
                    ...shapeStyles[shape],
                    ...shapePositions[i],
                  }}
                  className="group-hover:opacity-100 opacity-30"
                />
              ))}
              <TextField
                fullWidth
                label="Referral Code"
                value="JMXA4557jXXN"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <FaShareAlt
                        style={{ cursor: "pointer", color: "#084e54" }}
                      />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
                sx={{
                  input: { color: "#084e54" },
                  label: { color: "#084e54" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#4caf50" },
                    "&:hover fieldset": { borderColor: "#81c784" },
                    "&.Mui-focused fieldset": { borderColor: "#66bb6a" },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Transaction Section */}
        <div className="px-4 pb-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
            <h2 className="text-lg text-white font-semibold">Team Transactions</h2>
            <div className="flex items-center rounded-xl border border-white px-3 py-1.5 w-full max-w-sm sm:max-w-xs md:max-w-[200px] lg:max-w-[288px]">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-white placeholder-white focus:outline-none flex-grow"
                style={{ fontSize: "0.85rem", padding: "4px 8px" }}
              />
              <Search className="text-white" size={16} />
            </div>
          </div>

          {paginatedList.length > 0 ? (
            <>
              <div className="grid gap-4">
                {paginatedList.map((item, idx) => (
                  <div
                    key={startIndex + idx}
                    className="bg-white rounded-md shadow p-4 text-sm text-[#333] flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-4"
                  >
                    {[
                      ["No", item.sno],
                      ["Txn ID", item.transactionId],
                      ["Amount", item.amount],
                      ["Type", item.type],
                      ["Payment Method", item.paymentMethod],
                      ["Currency", item.currency],
                      ["Txn Date", item.transactionDate],
                      ["Status", item.status],
                      ["Reason", item.reason],
                      ["Updated By", item.updatedBy],
                      ["Updated On", item.updatedOn],
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <span className="font-semibold text-[#084e54]">
                          {label}:{" "}
                        </span>
                        {value || "-"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-[#a5d6a7] text-white cursor-not-allowed"
                      : "bg-[#20934a] text-white hover:bg-[#1c7f3e]"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                >
                  Previous
                </button>

                <span
                  style={{ fontSize: "0.85rem" }}
                  className="text-white font-medium"
                >
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? "bg-[#a5d6a7] text-white cursor-not-allowed"
                      : "bg-[#20934a] text-white hover:bg-[#1c7f3e]"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-white py-6 text-center text-base">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;

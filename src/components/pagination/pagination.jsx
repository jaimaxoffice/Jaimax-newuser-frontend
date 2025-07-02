// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

//   const handleClick = (page) => {
//     if (page === currentPage) return;
//     onPageChange(page);
//   };

//   const baseBtn =
//     "px-3 py-1.5 rounded border text-sm transition-colors duration-150";
//   const activeBtn = "bg-green-600 border-green-600 text-white font-semibold";
//   const normalBtn =
//     "bg-transparent border-white/30 text-white hover:bg-white/10";
//   const disabledBtn = "opacity-50 cursor-not-allowed";

//   const renderPageNumbers = () => {
//     if (totalPages <= 5) {
//       return pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => handleClick(page)}
//           className={`${baseBtn} ${
//             currentPage === page ? activeBtn : normalBtn
//           }`}
//         >
//           {page}
//         </button>
//       ));
//     }

//     const startPage = Math.max(1, currentPage - 2);
//     const endPage = Math.min(totalPages, startPage + 4);
//     const nums = [];

//     if (startPage > 1) {
//       nums.push(
//         <button
//           key={1}
//           onClick={() => handleClick(1)}
//           className={`${baseBtn} ${normalBtn}`}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         nums.push(
//           <span key="el-l" className="px-2 text-white select-none">
//             ...
//           </span>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       nums.push(
//         <button
//           key={i}
//           onClick={() => handleClick(i)}
//           className={`${baseBtn} ${
//             currentPage === i ? activeBtn : normalBtn
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         nums.push(
//           <span key="el-r" className="px-2 text-white select-none">
//             ...
//           </span>
//         );
//       }
//       nums.push(
//         <button
//           key={totalPages}
//           onClick={() => handleClick(totalPages)}
//           className={`${baseBtn} ${normalBtn}`}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return nums;
//   };

//   return (
//     <div className="flex justify-center items-center gap-2 flex-wrap pt-6">
//       {/* Prev */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1 || totalPages === 0}
//         className={`${baseBtn} ${normalBtn} disabled:${disabledBtn}`}
//       >
//         Prev
//       </button>

//       {/* Dynamic Page Numbers */}
//       {renderPageNumbers()}

//       {/* Next */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages || totalPages === 0}
//         className={`${baseBtn} ${normalBtn} disabled:${disabledBtn}`}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;



// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

//   const handleClick = (page) => {
//     if (page === currentPage) return;
//     onPageChange(page);
//   };

//   const baseBtn = `
//     relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 
//     transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 
//     focus:ring-teal-200 shadow-lg backdrop-blur-sm
//   `;
  
//   const activeBtn = `
//     bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-xl 
//     shadow-teal-500/30 ring-2 ring-teal-400/50 hover:shadow-2xl 
//     hover:shadow-teal-500/40 hover:from-teal-600 hover:to-teal-700
//     before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
//     before:from-white/20 before:to-transparent before:opacity-0 
//     hover:before:opacity-100 before:transition-opacity before:duration-300
//   `;
  
//   const normalBtn = `
//     bg-white/90 text-teal-700 border-2 border-teal-200/50 
//     hover:bg-teal-50 hover:border-teal-300 hover:text-teal-800
//     hover:shadow-xl hover:shadow-teal-100/50
//   `;
  
//   const disabledBtn = `
//     opacity-40 cursor-not-allowed transform-none hover:scale-100 
//     hover:shadow-lg bg-gray-100 text-gray-400 border-gray-200
//   `;

//   const navBtn = `
//     ${baseBtn} ${normalBtn} px-6 font-semibold text-base
//     hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100
//   `;

//   const renderPageNumbers = () => {
//     if (totalPages <= 5) {
//       return pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => handleClick(page)}
//           className={`${baseBtn} ${
//             currentPage === page ? activeBtn : normalBtn
//           }`}
//         >
//           {page}
//         </button>
//       ));
//     }

//     const startPage = Math.max(1, currentPage - 2);
//     const endPage = Math.min(totalPages, startPage + 4);
//     const nums = [];

//     if (startPage > 1) {
//       nums.push(
//         <button
//           key={1}
//           onClick={() => handleClick(1)}
//           className={`${baseBtn} ${normalBtn}`}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         nums.push(
//           <span 
//             key="el-l" 
//             className="px-3 py-2 text-teal-400 select-none font-bold text-lg animate-pulse"
//           >
//             ⋯
//           </span>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       nums.push(
//         <button
//           key={i}
//           onClick={() => handleClick(i)}
//           className={`${baseBtn} ${
//             currentPage === i ? activeBtn : normalBtn
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         nums.push(
//           <span 
//             key="el-r" 
//             className="px-3 py-2 text-teal-400 select-none font-bold text-lg animate-pulse"
//           >
//             ⋯
//           </span>
//         );
//       }
//       nums.push(
//         <button
//           key={totalPages}
//           onClick={() => handleClick(totalPages)}
//           className={`${baseBtn} ${normalBtn}`}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return nums;
//   };

//   return (
//     <div className="flex justify-center items-center gap-3 flex-wrap pt-8 pb-4">
//       <div className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-teal-100/50">
//         {/* Previous Button */}
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1 || totalPages === 0}
//           className={`${navBtn} ${
//             currentPage === 1 || totalPages === 0 ? disabledBtn : ''
//           } flex items-center gap-2`}
//         >
//           <svg 
//             className="w-4 h-4" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M15 19l-7-7 7-7" 
//             />
//           </svg>
//           Prev
//         </button>

//         {/* Page Numbers Container */}
//         <div className="flex items-center gap-1 px-2">
//           {renderPageNumbers()}
//         </div>

//         {/* Next Button */}
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || totalPages === 0}
//           className={`${navBtn} ${
//             currentPage === totalPages || totalPages === 0 ? disabledBtn : ''
//           } flex items-center gap-2`}
//         >
//           Next
//           <svg 
//             className="w-4 h-4" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M9 5l7 7-7 7" 
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;



import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handleClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const baseBtn = `
    px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 
    hover:scale-105 focus:outline-none shadow-sm
  `;
  
  const activeBtn = `
    bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md 
    hover:from-teal-600 hover:to-teal-700
  `;
  
  const normalBtn = `
    bg-white text-teal-700 border border-teal-200 
    hover:bg-teal-50 hover:border-teal-300
  `;
  
  const disabledBtn = `
    opacity-40 cursor-not-allowed hover:scale-100 
    bg-gray-100 text-gray-400 border-gray-200
  `;

  const navBtn = `
    ${baseBtn} ${normalBtn} px-3 font-medium text-xs
  `;

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`${baseBtn} ${
            currentPage === page ? activeBtn : normalBtn
          }`}
        >
          {page}
        </button>
      ));
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    const nums = [];

    if (startPage > 1) {
      nums.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={`${baseBtn} ${normalBtn}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        nums.push(
          <span 
            key="el-l" 
            className="px-3 py-2 text-teal-400 select-none font-bold text-lg animate-pulse"
          >
            ⋯
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      nums.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`${baseBtn} ${
            currentPage === i ? activeBtn : normalBtn
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        nums.push(
          <span 
            key="el-r" 
            className="px-3 py-2 text-teal-400 select-none font-bold text-lg animate-pulse"
          >
            ⋯
          </span>
        );
      }
      nums.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={`${baseBtn} ${normalBtn}`}
        >
          {totalPages}
        </button>
      );
    }

    return nums;
  };

  return (
    <div className="flex justify-center items-center gap-3 flex-wrap pt-2 pb-4">
      <div className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-teal-100/50">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className={`${navBtn} ${
            currentPage === 1 || totalPages === 0 ? disabledBtn : ''
          } flex items-center gap-2`}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Prev
        </button>

        {/* Page Numbers Container */}
        <div className="flex items-center gap-1 px-2">
          {renderPageNumbers()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`${navBtn} ${
            currentPage === totalPages || totalPages === 0 ? disabledBtn : ''
          } flex items-center gap-2`}
        >
          Next
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
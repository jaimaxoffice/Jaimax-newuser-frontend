import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Pagination from "../../../../pagination/pagination";

const ITEMS_PER_PAGE = 10;

const TransactionDetails = ({ list }) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredList = list.filter(
    (item) =>
      item.transactionId.toLowerCase().includes(query.toLowerCase()) ||
      item.updatedBy.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className="w-full bg-[#1d8e85] text-sm text-white p-4 rounded-md">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold">Team Transactions</h2>
        <div className="flex items-center border border-white/30 rounded-md px-3 py-1 w-full sm:w-72">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-white text-sm placeholder-white/70 focus:outline-none flex-grow"
          />
          <Search size={16} className="text-white" />
        </div>
      </div>

      {/* Table Layout for md and up */}
      <div className="hidden md:grid grid-cols-9 font-semibold text-white/80 border-b border-white/20 pb-2 mb-2">
        <div>S.No</div>
        <div>Transaction ID</div>
        <div>Currency</div>
        <div>Withdrawal</div>
        <div>Admin Charges</div>
        <div>Date</div>
        <div>Status</div>
        <div>Reason</div>
        <div>Note</div>
      </div>

      {/* Data */}
      {paginatedList.length > 0 ? (
        <>
          <div className="space-y-3">
            {paginatedList.map((item, idx) => (
              <div
                key={startIndex + idx}
                className="border border-white/20 bg-white text-black backdrop-blur-sm rounded-md p-3 "
              >
                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-9 gap-2">
                  <div>{item.sno}</div>
                  <div>{item.transactionId}</div>
                  <div>{item.amount}</div>
                  <div>{item.type}</div>
                  <div>{item.paymentMethod}</div>
                  <div>{item.currency}</div>
                  <div>{item.transactionDate}</div>
                  <div>{item.status}</div>
                  <div>{item.reason}</div>
                </div>

                {/* Mobile Card */}
                <div className="md:hidden space-y-1">
                  <div><span className="font-bold">S.No:</span> {item.sno}</div>
                  <div><span className="font-bold">Transaction ID:</span> {item.transactionId}</div>
                  <div><span className="font-bold">Currency:</span> {item.amount}</div>
                  <div><span className="font-bold">Withdrawal:</span> {item.type}</div>
                  <div><span className="font-bold">Admin Charges:</span> {item.paymentMethod}</div>
                  <div><span className="font-bold">Date:</span> {item.currency}</div>
                  <div><span className="font-bold">Status:</span> {item.transactionDate}</div>
                  <div><span className="font-bold">Reason:</span> {item.status}</div>
                  <div><span className="font-bold">Note:</span> {item.reason}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div className="text-center text-white/70 py-6">No data found</div>
      )}
    </div>
  );
};

export default TransactionDetails;

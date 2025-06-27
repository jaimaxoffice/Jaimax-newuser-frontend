import React, { useState, useEffect } from "react";
import { Search, X, ChevronDown, Paperclip, Upload } from "lucide-react";
import { useCategoryGetQuery, useCreateTicketMutation, useSupportDataQuery } from "./supportApi";
import { toast } from "react-toastify";
import SupportModal from "./supportModal/supportModal"
import Loader from "../../../Loader/loader"

const Support = () => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => setDeleteModal(true);
  
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  const queryParams = `limit=${state?.perPage || ""}&page=${
    state?.currentPage || ""
  }&searchParam=${state?.search || ""}`;

  const {
    data: supportData,
    error,
    isLoading,
  } = useSupportDataQuery(queryParams);
  
  const TableData = supportData?.data?.response || [];
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setState((prev) => ({ ...prev, currentPage: page }));
  };

  const handlePrevPage = () => {
    if (state.currentPage > 1) handlePageChange(state.currentPage - 1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(supportData?.data?.totalCount / state.perPage);
    if (state.currentPage < totalPages) handlePageChange(state.currentPage + 1);
  };

  useEffect(() => {
    setLoading(false);
  }, [supportData?.data?.response]);

  const transformedData = TableData.map((data, index) => ({
    id: data._id,
    ticketId: state.currentPage * state.perPage - (state.perPage - 1) + index,
    subject: data.title,
    type: data?.category_id?.category_name || "N/A",
    status: data.status === "open" ? "Open" : data.status === "inprogress" ? "In Progress" : "Closed",
    priority: "Medium",
    assignedTo: "Admin",
    createdOn: data.created_at.split("T")[0],
    updatedOn: data.created_at.split("T")[0],
    originalData: data
  }));

  const totalPages = supportData 
    ? Math.ceil(supportData?.data?.totalCount / state.perPage)
    : 1;

  const getStatusStyles = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "close":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    }
  };

  return (
    <div className="p-4 md:p-6  bg-[#1d8e85] w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col  md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Support Tickets</h2>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <button 
            onClick={handleShow}
            className="bg-[#c5d82e] hover:from-blue-600 hover:to-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Create New
          </button>
          
          <div className="relative flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 min-w-[250px] backdrop-blur-sm">
            <input
              type="text"
              placeholder="Search Ticket ID or Status"
              value={state.search}
              onChange={(e) => setState({ ...state, search: e.target.value })}
              className="bg-transparent text-white placeholder-white/70 focus:outline-none flex-grow text-sm"
            />
            <Search className="text-white/70 ml-2" size={18} />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading || loading ? (
        <div className="text-center py-16 text-gray-400 text-lg">Loading...</div>
      ) : transformedData.length > 0 ? (
        <>
          {/* Cards Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {transformedData.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-blue-500/30 relative overflow-hidden group">
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">#{item.ticketId}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{item.subject}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide whitespace-nowrap ${getStatusStyles(item.originalData.status)}`}>
                    {item.status}
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="space-y-3 mb-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Type</span>
                      <span className="text-white text-sm font-medium">{item.type}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Priority</span>
                      <span className="text-white text-sm font-medium">{item.priority}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Assigned To</span>
                      <span className="text-white text-sm font-medium">{item.assignedTo}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Created</span>
                      <span className="text-white text-sm font-medium">{item.createdOn}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Updated</span>
                      <span className="text-white text-sm font-medium">{item.updatedOn}</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Actions */}
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <a
                    href={`/support/support-chat/${item.id}`}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
                  >
                    <span>👁️</span>
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Show:</span>
              <select
                className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                value={state?.perPage}
                onChange={(e) => {
                  const newPerPage = e.target.value;
                  setState({
                    ...state,
                    perPage: newPerPage,
                    currentPage: 1,
                  });
                }}
              >
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
              <span className="text-gray-400 text-sm">entries</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrevPage} 
                disabled={state.currentPage === 1} 
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
              >
                Previous
              </button>
              
              <span className="text-gray-300 text-sm font-medium px-3">
                Page {state.currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={handleNextPage} 
                disabled={state.currentPage === totalPages} 
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-gray-400 text-lg">No support tickets found</div>
      )}

      <SupportModal {...{ show, setShow, deleteModal, setDeleteModal }} />
      {(isLoading || loading) && <Loader />}
    </div>
  );
};

export default Support;
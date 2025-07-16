import React, { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown, Paperclip, Upload, Filter, Eye, Send, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Select, MenuItem } from "@mui/material";

// Import your actual RTK Query hooks
import {
  useSupportDataQuery,
  useCategoryGetQuery,
  useCreateTicketMutation,
  useChatGetQuery,
  useCreateCommentMutation,
} from "./supportApiSlice";

// Loader Component
const Loader = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
  </div>
);

// Create Ticket Modal Component
const CreateTicketModal = ({ show, setShow }) => {
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    cat: '',
    content: '',
    priority: '',
    image: '',
  });
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const { data: catgetData, isLoading: categoriesLoading, error: categoriesError } = useCategoryGetQuery();
  console.log('hello', catgetData)
  const priorities = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const categories = catgetData?.data?.response || [];
  console.log('Categories:', categories);
  // Debug log to check categories data
  console.log('Categories data:', catgetData);
  console.log('Categories loading:', categoriesLoading);
  console.log('Categories error:', categoriesError);

  const validate = () => {
    const errs = {};
    if (!formData.title) errs.title = 'Title is required';
    if (!formData.cat) errs.cat = 'Category is required';
    if (!formData.content) errs.content = 'Content is required';
    if (!formData.priority) errs.priority = 'Priority is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleTicket = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const submitFormData = new FormData();
      submitFormData.Pageend('title', formData.title);
      submitFormData.Pageend('category_id', formData.cat);
      submitFormData.Pageend('content', formData.content);
      submitFormData.Pageend('priority', formData.priority.toLowerCase());
      submitFormData.Pageend('image', formData.image);

      const { data } = await createTicket(submitFormData);
      if (data?.success === 1) {
        toast.success(data.message, { position: 'top-center' });
        handleClose();
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred", { position: 'top-center' });
    }
  };

  const handleClose = () => {
    setFormData({ title: '', cat: '', content: '', priority: '', image: '' });
    setAttachedFiles([]);
    setErrors({});
    setShowPriorityDropdown(false);
    setShow(false);
  };

  const onChangeFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const accepted = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!accepted.includes(file.type)) {
      toast.warning('Only JPG / PNG files are allowed', { position: 'top-center' });
      imageRef.current && (imageRef.current.value = '');
      return;
    }
    setFormData({ ...formData, image: file });
    setAttachedFiles([file]);
  };

  const removeFile = () => {
    setAttachedFiles([]);
    setFormData({ ...formData, image: '' });
    imageRef.current && (imageRef.current.value = '');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-white rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-800">Create Ticket</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-teal-600 transition-colors duration-200">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleTicket} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.title}
              onChange={(e) => {
                const allowedRegex = /^[a-zA-Z0-9\s.?!@]*$/;
                const value = e.target.value;

                if (allowedRegex.test(value)) {
                  setFormData({ ...formData, title: value });
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Enter ticket title"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>


          {/* Priority & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div className="relative">
              <label className="block mb-2 font-medium text-gray-700">
                Priority <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowPriorityDropdown(!showPriorityDropdown);
                }}
                className="w-full flex justify-between items-center rounded-lg border border-gray-300 px-3 py-2 bg-white text-left focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
              >
                <span className={formData.priority ? 'text-gray-800' : 'text-gray-500'}>
                  {formData.priority
                    ? priorities.find((p) => p.value === formData.priority)?.label
                    : 'Set priority'}
                </span>
                <ChevronDown size={16} className="text-gray-600" />
              </button>
              {showPriorityDropdown && (
                <div className="absolute left-0 right-0 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg z-10">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, priority: p.value });
                        setShowPriorityDropdown(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-teal-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
              {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority}</p>}
            </div>


            {/* Category */}
            <div className="relative">
              <label className="block mb-2 font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.cat}
                onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                displayEmpty
                className="w-full"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.5rem',
                    '& fieldset': {
                      borderColor: '#d1d5db',
                    },
                    '&:hover fieldset': {
                      borderColor: '#14b8a6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14b8a6',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiSelect-select': {
                    padding: '8px 12px',
                    fontSize: '0.875rem',
                  }
                }}
                MenuProps={{
                  disableScrollLock: true,
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      '& .MuiMenuItem-root': {
                        fontSize: '0.875rem',
                        '&:hover': {
                          backgroundColor: '#f0fdfa',
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <span className="text-gray-500">
                    {categoriesLoading ? 'Loading categories...' : 'Choose category'}
                  </span>
                </MenuItem>
                {catgetData?.data?.response?.map((data) => (
                  <MenuItem
                    className="customMenuItem"
                    key={data?._id}
                    value={data?._id}
                  >
                    {data?.category_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.cat && <p className="text-sm text-red-500 mt-1">{errors.cat}</p>}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => {
                const allowedRegex = /^[a-zA-Z0-9\s.!@]*$/;
                const value = e.target.value;

                // Only update state if value matches allowed characters
                if (allowedRegex.test(value)) {
                  setFormData({ ...formData, content: value });
                }
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
              placeholder="Describe your issue in detail"
            />
            {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
          </div>


          {/* Attachment */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Attachment</label>
            <div className="flex items-center gap-3">
              <input
                ref={imageRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={onChangeFile}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
              >
                <Paperclip size={16} /> Choose File
              </label>
              <span className="text-sm text-gray-500 truncate">
                {attachedFiles.length ? attachedFiles[0].name : 'No file chosen'}
              </span>
            </div>
            {attachedFiles.length > 0 && (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 border">
                <span className="truncate text-sm text-gray-700">
                  <Upload size={14} className="inline-block mr-2" />
                  {attachedFiles[0].name} ({(attachedFiles[0].size / 1024).toFixed(1)} KB)
                </span>
                <button onClick={removeFile} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-teal-600 py-3 text-white hover:bg-teal-700 disabled:bg-teal-300 transition-colors duration-200 font-semibold"
          >
            {isLoading ? 'Submitting…' : 'Submit Ticket'}
          </button>
        </form>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={handleClose} />
    </div>
  );
};

// Support List Component
const SupportList = () => {
  const [show, setShow] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [state, setState] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  });

  const queryParams = `limit=${state?.perPage || ""}&page=${state?.currentPage || ""}&searchParam=${state?.search || ""}`;
  const { data: supportData, isLoading, error } = useSupportDataQuery(queryParams);
  const TableData = supportData?.data?.response || [];
  const [loading, setLoading] = useState(false);
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

  const totalPages = supportData ? Math.ceil(supportData?.data?.totalCount / state.perPage) : 1;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-green-700 bg-green-100 border-green-200";
      case "closed":
        return "text-red-700 bg-red-100 border-red-200";
      case "in progress":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col space-y-6">
            {/* Title Section */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                Support Tickets
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and track your support requests
              </p>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row   gap-4">
              {/* Create Ticket Button */}
              <button
                onClick={() => setShow(true)}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-center"
              >
                + Create New Ticket
              </button>

              {/* Search and Filter Container */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Input */}
                <div className="relative flex items-center bg-white border border-gray-300 rounded-full px-4 py-3 flex-1 shadow-sm">
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={state.search}
                    onChange={(e) => setState({ ...state, search: e.target.value, currentPage: 1 })}
                    className="bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none flex-grow"
                  />
                  <Search className="text-gray-500 ml-3" size={20} />
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="sm:hidden bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>

                {/* Items Per Page - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-gray-600 whitespace-nowrap">Show:</span>
                  <div className="relative">
                    <select
                      className="Pageearance-none bg-white border border-gray-300 text-gray-700 rounded-lg pl-3 pr-8 py-3 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer shadow-sm"
                      value={state?.perPage}
                      onChange={(e) => {
                        const newPerPage = Number(e.target.value);
                        setState({
                          ...state,
                          perPage: newPerPage,
                          currentPage: 1,
                        });
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
              <div className="sm:hidden bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-800 font-medium">Filters</span>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600">Items per page:</span>
                  <div className="relative flex-1">
                    <select
                      className="Pageearance-none bg-white border border-gray-300 text-gray-700 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-teal-500 transition-colors cursor-pointer w-full"
                      value={state?.perPage}
                      onChange={(e) => {
                        const newPerPage = Number(e.target.value);
                        setState({
                          ...state,
                          perPage: newPerPage,
                          currentPage: 1,
                        });
                        setShowMobileFilters(false);
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {(isLoading || loading) ? (
          <div className="flex flex-col items-center justify-center py-20 text-teal-600">
            <Loader />
            <p className="mt-4 text-lg">Loading tickets...</p>
          </div>
        ) : transformedData.length > 0 ? (
          <>
            {/* Mobile Cards */}
            <div className="block xl:hidden space-y-4 mb-8">
              {transformedData.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Ticket #{item.ticketId}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {item.subject}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2  gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-teal-600 font-medium block mb-1">Type</span>
                      <span className="text-gray-700">{item.type}</span>
                    </div>
                    <div>
                      <span className="text-teal-600 font-medium block mb-1">Priority</span>
                      <span className="text-gray-700">{item.priority}</span>
                    </div>
                    <div>
                      <span className="text-teal-600 font-medium block mb-1">Assigned To</span>
                      <span className="text-gray-700">{item.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-teal-600 font-medium block mb-1">Created</span>
                      <span className="text-gray-700">{item.createdOn}</span>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      onClick={() => window.location.href = `/support/support-chat/${item.id}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden xl:block overflow-x-auto rounded-xl shadow-xl mb-8 bg-white">
              <table className="w-full text-left">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transformedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-gray-800 font-medium">{item.ticketId}</td>
                      <td className="px-6 py-4 text-gray-600">{item.type}</td>
                      <td className="px-6 py-4 text-gray-800 max-w-xs truncate">{item.subject}</td>
                      <td className="px-6 py-4 text-gray-600">{item.createdOn}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`/support/support-chat/${item.id}`}
                          className="text-teal-600 hover:text-teal-800 transition-colors duration-200 flex items-center gap-1"
                        >
                          <Eye size={16} />
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              {/* Results Info */}
              <div className="text-center sm:text-left order-2 sm:order-1">
                <span className="text-gray-600">
                  Showing {((state.currentPage - 1) * state.perPage) + 1} to {Math.min(state.currentPage * state.perPage, supportData?.data?.totalCount || 0)} of {supportData?.data?.totalCount || 0} results
                </span>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  onClick={handlePrevPage}
                  disabled={state.currentPage === 1}
                  className="bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-all duration-300 shadow-sm"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                {/* Page indicators */}
                <div className="flex items-center gap-1">
                  {totalPages <= 5 ? (
                    Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${state.currentPage === page
                          ? "bg-teal-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                          }`}
                      >
                        {page}
                      </button>
                    ))
                  ) : (
                    <>
                      {state.currentPage > 2 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className="w-10 h-10 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition-all"
                          >
                            1
                          </button>
                          {state.currentPage > 3 && (
                            <span className="text-gray-500 px-1">...</span>
                          )}
                        </>
                      )}

                      {[state.currentPage - 1, state.currentPage, state.currentPage + 1]
                        .filter(page => page >= 1 && page <= totalPages)
                        .map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${state.currentPage === page
                              ? "bg-teal-600 text-white shadow-lg"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                              }`}
                          >
                            {page}
                          </button>
                        ))
                      }

                      {state.currentPage < totalPages - 1 && (
                        <>
                          {state.currentPage < totalPages - 2 && (
                            <span className="text-gray-500 px-1">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="w-10 h-10 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition-all"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={state.currentPage === totalPages}
                  className="bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 px-4 py-2 rounded-lg border border-gray-300 transition-all duration-300 shadow-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tickets found</h3>
            <p className="text-gray-600 mb-6">
              {state.search ? "No tickets match your search criteria" : "Create your first support ticket to get started"}
            </p>
            <button
              onClick={() => setShow(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Create New Ticket
            </button>
          </div>
        )}

        {/* Support Modal */}
        <CreateTicketModal show={show} setShow={setShow} />
      </div>
    </div>
  );
};

// Support Chat Component
const SupportChat = ({ ticketId = "1" }) => {
  const { data: chartData, isLoading, error } = useChatGetQuery(ticketId);
  const [createComment, { isLoading: commentLoading }] = useCreateCommentMutation();
  const [state, setState] = useState({
    comment: "",
    image: null,
  });
  const [displayImage, setDisplayImage] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState("");

  const sendComment = async () => {
    if (state?.comment == "") {
      return toast.error("Please enter a message", { position: 'top-center' });
    }
    const formData = new FormData();
    formData.Pageend("comment", state.comment);
    if (state?.image) {
      formData.Pageend("image", state.image);
    }
    formData.Pageend("ticket_id", ticketId);

    try {
      const response = await createComment(formData);
      if (response?.data?.status_code == 200) {
        setState({
          comment: "",
          image: null,
        });
        setDisplayImage("");
        toast.success("Comment sent successfully", { position: 'top-center' });
      } else {
        toast.error(response?.error?.data?.message || "Failed to send comment", { position: 'top-center' });
      }
    } catch (error) {
      toast.error("Error sending comment", { position: 'top-center' });
    }
  };

  const handleUpload = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      let files = Array.from(input.files);

      if (files) {
        const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
        const invalidFile = !acceptedFormats.includes(files[0].type);
        if (invalidFile) {
          toast.warning("Only JPG / PNG files are allowed", { position: 'top-center' });
          return;
        }
      }

      const showImage = URL.createObjectURL(files[0]);
      setDisplayImage(showImage);
      setState({ ...state, image: files[0] });
    };

    input.click();
  };

  const clearImage = () => {
    setDisplayImage("");
    setState({ ...state, image: null });
  };

  const formatDateWithAmPm = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const amAndPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
  };

  const openImageViewer = (imageUrl) => {
    setClickedImage(imageUrl);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
    setClickedImage("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Ticket Detail View</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ticket Details */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ticket Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <p className="text-gray-800">
                    {chartData?.data?.ticket?.author_name
                      ? chartData.data.ticket.author_name
                        .charAt(0)
                        .toUpperCase() +
                      chartData.data.ticket.author_name
                        .slice(1)
                        .toLowerCase()
                      : ""}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-800">{chartData?.data?.ticket.author_email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                  <p className="text-gray-800">{chartData?.data?.ticket.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
                  <p className={`text-capitalize ${chartData?.data?.ticket.priority === "low"
                    ? "text-blue-600"
                    : chartData?.data?.ticket.priority === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                    }`}>
                    {chartData?.data?.ticket.priority}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                <p className="text-gray-800">{chartData?.data?.ticket.content}</p>
              </div>

              {chartData?.data?.ticket.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Attachments</label>
                  <img
                    className="rounded-lg cursor-pointer max-h-64 object-cover border"
                    src={chartData?.data?.ticket.image}
                    onClick={() => openImageViewer(chartData?.data?.ticket.image)}
                    alt="Ticket attachment"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Chat Support */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="bg-teal-600 text-white p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                💬 Chat Support
              </h3>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chartData?.data?.comments?.map((item, i) => {
                const isAdmin = item?.commented_by?.role == "0";
                return (
                  <div
                    key={`${item?._id}-${i}`}
                    className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${isAdmin ? "order-2" : "order-1"}`}>
                      <div className={`flex items-center gap-2 mb-1 ${isAdmin ? "justify-end" : "justify-start"}`}>
                        <img
                          src={
                            item.commented_by.profile ||
                            "https://via.placeholder.com/30x30?text=U"
                          }
                          className="w-6 h-6 rounded-full"
                          alt="Profile"
                        />
                        <span className="text-sm font-medium text-gray-600">
                          {item?.commented_by?.name}
                        </span>
                      </div>

                      <div
                        className={`rounded-lg p-3 ${isAdmin
                          ? "bg-teal-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                      >
                        <p className="text-sm">{item.comment}</p>
                        {item?.image && (
                          <img
                            className="mt-2 rounded cursor-pointer max-w-full h-20 object-cover"
                            src={item?.image}
                            onClick={() => openImageViewer(item.image)}
                            alt="Chat attachment"
                          />
                        )}
                      </div>

                      <p className={`text-xs text-gray-500 mt-1 ${isAdmin ? "text-right" : "text-left"}`}>
                        {formatDateWithAmPm(item?.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div className="border-t p-4">
              {displayImage && (
                <div className="mb-3 relative inline-block">
                  <img
                    src={displayImage}
                    alt="Preview"
                    className="h-16 w-20 object-cover rounded border"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Type your message"
                  value={state?.comment}
                  onChange={(e) =>
                    setState({ ...state, comment: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendComment();
                    }
                  }}
                />

                <button
                  onClick={handleUpload}
                  className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <Paperclip size={20} />
                </button>

                <button
                  onClick={sendComment}
                  disabled={commentLoading}
                  className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Viewer Modal */}
        {isViewerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={closeImageViewer}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={clickedImage}
                alt="Full size"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            <div className="absolute inset-0" onClick={closeImageViewer} />
          </div>
        )}
      </div>
    </div>
  );
};

// Main Page Component
const Page = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'chat'
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleViewTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    setCurrentView('chat');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTicketId(null);
  };

  return (
    <div className="font-sans">
      {currentView === 'list' ? (
        <SupportList onViewTicket={handleViewTicket} />
      ) : (
        <div>
          <div className="bg-white border-b p-4">
            <button
              onClick={handleBackToList}
              className="text-teal-600 hover:text-teal-800 flex items-center gap-2 transition-colors"
            >
              ← Back to Tickets
            </button>
          </div>
          <SupportChat ticketId={selectedTicketId} />
        </div>
      )}
    </div>
  );
};

export default Page;
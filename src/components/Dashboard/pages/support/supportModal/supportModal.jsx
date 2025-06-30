// // 📝  CreateTicketModal.jsx  – ‘Open Ticket’ option removed
// import React, { useState, useRef, useEffect } from 'react';
// import { X, ChevronDown, Paperclip, Upload } from 'lucide-react';

// export default function CreateTicketModal({
//   show = true,
//   setShow,
//   deleteModal,
//   setDeleteModal,
//   useCreateTicketMutation,
//   useCategoryGetQuery,
//   toast,
// }) {
//   const imageRef = useRef(null);

//   /* ─────────── state & hooks (unchanged) ─────────── */
//   const [formData, setFormData] = useState({
//     title: '',
//     cat: '',
//     content: '',
//     priority: '',
//     image: '',
//   });
//   const [attachedFiles, setAttachedFiles] = useState([]);
//   const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [createTicket, { isLoading, isSuccess, isError, error }] =
//     useCreateTicketMutation
//       ? useCreateTicketMutation(formData)
//       : [() => {}, { isLoading: false }];

//   const { data: catgetData } = useCategoryGetQuery
//     ? useCategoryGetQuery()
//     : { data: null };

//   /* ─────────── helpers / validation (unchanged) ─────────── */
//   const priorities = [
//     { value: 'high', label: 'High' },
//     { value: 'medium', label: 'Medium' },
//     { value: 'low', label: 'Low' },
//   ];
//   const categories =
//     catgetData?.data?.response || [
//       { _id: 'payment', category_name: 'Payment' },
//       { _id: 'add_order', category_name: 'Add order' },
//       { _id: 'ico', category_name: 'ICO' },
//       { _id: 'withdraw', category_name: 'Withdraw' },
//       { _id: 'login', category_name: 'Login' },
//     ];

//   const validate = () => {
//     const errs = {};
//     if (!formData.title) errs.title = 'Title is required';
//     if (!formData.cat) errs.cat = 'Category is required';
//     if (!formData.content) errs.content = 'Content is required';
//     if (!formData.priority) errs.priority = 'Priority is required';
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleTicket = async (e) => {
//     e.preventDefault();
//     console.log("hello this is support")
//     if (!validate()) return;
//     try {
//       const submitFormData = new FormData();
//       submitFormData.append('title', formData.title);
//       submitFormData.append('category_id', formData.cat);
//       submitFormData.append('content', formData.content);
//       submitFormData.append('priority', formData.priority.toLowerCase());
//       submitFormData.append('image', formData.image);
//       const { data } = await createTicket(submitFormData);
//       if (data?.success === 1 && toast) toast.success(data.message, { position: 'top-center' });
//        setFormData({
//             title: "",
//             cat: "",
//             content: "",
//             priority: "",
//             image: "",
//           });
//        handleClose();
//     } catch (err) {
//       toast && toast.error(err?.data?.message, { position: 'top-center' });
//     }
//   };

//   const handleClose= () => {
//     setFormData({ title: '', cat: '', content: '', priority: '', image: '' });
//     setAttachedFiles([]);
//     setErrors({});
//     setShowPriorityDropdown(false);
//     setShowCategoryDropdown(false);
//     setShow && setShow(false);
//   };

//   const onChangeFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const accepted = ['image/png', 'image/jpeg', 'image/jpg'];
//     if (!accepted.includes(file.type)) {
//       toast && toast.warning('Only JPG / PNG files are allowed', { position: 'top-center' });
//       imageRef.current && (imageRef.current.value = '');
//       return;
//     }
//     setFormData({ ...formData, image: file });
//     setAttachedFiles([file]);
//   };

//   const removeFile = () => {
//     setAttachedFiles([]);
//     setFormData({ ...formData, image: '' });
//     imageRef.current && (imageRef.current.value = '');
//   };

//   useEffect(() => {
//     if (isError && toast) toast.error(error?.data?.message, { position: 'top-center' });
//   }, [isError, error, toast]);

//   /* ------ 🔥 CHANGE: render nothing when `show` is false ------ */
//   if (!show) return null;

//   /* ─────────── modal markup (trimmed only where needed) ─────────── */
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="bg-white max-w-sm w-full max-h-[90vh] overflow-y-auto rounded-md shadow">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b px-4 py-3">
//           <h2 className="text-lg font-semibold">Create Ticket</h2>
//           <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleTicket} className="p-4 space-y-4 text-sm">
//           {/* Title */}
//           <div>
//             <label className="block mb-1 font-medium">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="w-full rounded border px-3 py-1.5"
//             />
//             {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
//           </div>

//           {/* Priority & Category */}
//           <div className="grid grid-cols-2 gap-3">
//             {/* Priority */}
//             <div className="relative">
//               <label className="block mb-1 font-medium">
//                 Priority <span className="text-red-500">*</span>
//               </label>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowPriorityDropdown(!showPriorityDropdown);
//                   setShowCategoryDropdown(false);
//                 }}
//                 className="w-full flex justify-between items-center rounded border px-3 py-1.5 bg-white"
//               >
//                 <span className={formData.priority ? '' : 'text-gray-500'}>
//                   {formData.priority
//                     ? priorities.find((p) => p.value === formData.priority)?.label
//                     : 'Set priority'}
//                 </span>
//                 <ChevronDown size={14} />
//               </button>
//               {showPriorityDropdown && (
//                 <div className="absolute left-0 right-0 mt-1 rounded border bg-white shadow z-10">
//                   {priorities.map((p) => (
//                     <button
//                       key={p.value}
//                       type="button"
//                       onClick={() => {
//                         setFormData({ ...formData, priority: p.value });
//                         setShowPriorityDropdown(false);
//                       }}
//                       className="block w-full text-left px-3 py-1.5 hover:bg-gray-100"
//                     >
//                       {p.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//               {errors.priority && <p className="text-xs text-red-500">{errors.priority}</p>}
//             </div>

//             {/* Category */}
//             <div className="relative">
//               <label className="block mb-1 font-medium">
//                 Category <span className="text-red-500">*</span>
//               </label>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowCategoryDropdown(!showCategoryDropdown);
//                   setShowPriorityDropdown(false);
//                 }}
//                 className="w-full flex justify-between items-center rounded border px-3 py-1.5 bg-white"
//               >
//                 <span className={formData.cat ? '' : 'text-gray-500'}>
//                   {formData.cat
//                     ? categories.find((c) => c._id === formData.cat)?.category_name
//                     : 'Choose category'}
//                 </span>
//                 <ChevronDown size={14} />
//               </button>
//               {showCategoryDropdown && (
//                 <div className="absolute left-0 right-0 mt-1 rounded border bg-white shadow z-10">
//                   {categories.map((c) => (
//                     <button
//                       key={c._id}
//                       type="button"
//                       onClick={() => {
//                         setFormData({ ...formData, cat: c._id });
//                         setShowCategoryDropdown(false);
//                       }}
//                       className="block w-full text-left px-3 py-1.5 hover:bg-gray-100"
//                     >
//                       {c.category_name}
//                     </button>
//                   ))}
//                 </div>
//               )}
//               {errors.cat && <p className="text-xs text-red-500">{errors.cat}</p>}
//             </div>
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block mb-1 font-medium">
//               Content <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               rows={3}
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               className="w-full rounded border px-3 py-1.5 resize-none"
//             />
//             {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
//           </div>

//           {/* Attachment */}
//           <div>
//             <label className="block mb-1 font-medium">Attachment</label>
//             <div className="flex items-center gap-2">
//               <input
//                 ref={imageRef}
//                 type="file"
//                 accept=".jpg,.jpeg,.png"
//                 onChange={onChangeFile}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="flex cursor-pointer items-center gap-1 rounded border px-3 py-1.5 text-sm"
//               >
//                 <Paperclip size={14} /> Choose File
//               </label>
//               <span className="text-xs text-gray-500">
//                 {attachedFiles.length ? attachedFiles[0].name : 'No file'}
//               </span>
//             </div>
//             {attachedFiles.length > 0 && (
//               <div className="mt-1 flex items-center justify-between rounded bg-gray-50 px-2 py-1">
//                 <span className="truncate text-xs">
//                   <Upload size={12} className="inline-block mr-1" />
//                   {attachedFiles[0].name} ({(attachedFiles[0].size / 1024).toFixed(1)} KB)
//                 </span>
//                 <button onClick={removeFile} className="text-red-500 hover:text-red-700">
//                   <X size={12} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             // disabled={isLoading}
//             //  onClick={handleTicket}
//             className="w-full rounded bg-green-500 py-2 text-white hover:bg-green-600 disabled:bg-green-300"
//           >
//             {isLoading ? 'Loading…' : 'Submit'}
//           </button>
//         </form>
//       </div>

//       {/* click-outside */}
//       <div className="absolute inset-0 -z-10" onClick={handleClose} />
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Paperclip, Upload } from 'lucide-react';

export default function CreateTicketModal({
  show = true,
  setShow,
  deleteModal,
  setDeleteModal,
  useCreateTicketMutation,
  useCategoryGetQuery,
  toast,
}) {
  const imageRef = useRef(null);

  /* ─────────── state & hooks (unchanged) ─────────── */
  const [formData, setFormData] = useState({
    title: '',
    cat: '',
    content: '',
    priority: '',
    image: '',
  });
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  // Mocking the hooks if they are not provided, for standalone testing
  const [createTicket, { isLoading, isSuccess, isError, error }] =
    useCreateTicketMutation
      ? useCreateTicketMutation(formData)
      : [() => new Promise(resolve => setTimeout(() => resolve({ data: { success: 1, message: 'Ticket created successfully (mock)' } }), 1000)), { isLoading: false }];

  const { data: catgetData } = useCategoryGetQuery
    ? useCategoryGetQuery()
    : { data: { response: [
        { _id: 'payment', category_name: 'Payment' },
        { _id: 'add_order', category_name: 'Add order' },
        { _id: 'ico', category_name: 'ICO' },
        { _id: 'withdraw', category_name: 'Withdraw' },
        { _id: 'login', category_name: 'Login' },
      ] } };

  /* ─────────── helpers / validation (unchanged) ─────────── */
  const priorities = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  const categories =
    catgetData?.response || [
      { _id: 'payment', category_name: 'Payment' },
      { _id: 'add_order', category_name: 'Add order' },
      { _id: 'ico', category_name: 'ICO' },
      { _id: 'withdraw', category_name: 'Withdraw' },
      { _id: 'login', category_name: 'Login' },
    ];

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
    console.log("hello this is support");
    if (!validate()) return;
    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('category_id', formData.cat);
      submitFormData.append('content', formData.content);
      submitFormData.append('priority', formData.priority.toLowerCase());
      submitFormData.append('image', formData.image);
      const { data } = await createTicket(submitFormData);
      if (data?.success === 1 && toast) toast.success(data.message, { position: 'top-center' });
        setFormData({
            title: "",
            cat: "",
            content: "",
            priority: "",
            image: "",
          });
        handleClose();
    } catch (err) {
      toast && toast.error(err?.data?.message || "An error occurred", { position: 'top-center' });
    }
  };

  const handleClose= () => {
    setFormData({ title: '', cat: '', content: '', priority: '', image: '' });
    setAttachedFiles([]);
    setErrors({});
    setShowPriorityDropdown(false);
    setShowCategoryDropdown(false);
    setShow && setShow(false);
  };

  const onChangeFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const accepted = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!accepted.includes(file.type)) {
      toast && toast.warning('Only JPG / PNG files are allowed', { position: 'top-center' });
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

  useEffect(() => {
    if (isError && toast) toast.error(error?.data?.message || "Failed to create ticket", { position: 'top-center' });
    if (isSuccess && toast) toast.success("Ticket created successfully!", { position: 'top-center' });
  }, [isError, error, toast, isSuccess]);

  /* ------ 🔥 CHANGE: render nothing when `show` is false ------ */
  if (!show) return null;

  /* ─────────── modal markup (trimmed only where needed) ─────────── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-inter">
      <div className="bg-white w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-lg"> {/* Adjusted max-width for responsiveness */}
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-4 py-3 bg-white rounded-t-xl sm:px-6"> {/* Added sm:px-6 for larger screens */}
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Create Ticket</h2> {/* Adjusted font size for responsiveness */}
          <button onClick={handleClose} className="text-gray-500 hover:text-teal-600 transition-colors duration-200">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleTicket} className="p-4 space-y-4 text-sm sm:p-6 sm:text-base"> {/* Adjusted padding and font size for responsiveness */}
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-[#1d8d84] rounded-md border border-teal-300 px-3 py-1.5 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Priority & Category */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"> {/* Changed to 1 column on small screens, 2 on sm and up */}
            {/* Priority */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Priority <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowPriorityDropdown(!showPriorityDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full flex justify-between items-center rounded-md border border-teal-300 px-3 py-1.5 bg-white text-left focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
              >
                <span className={formData.priority ? 'text-gray-800' : 'text-gray-500'}>
                  {formData.priority
                    ? priorities.find((p) => p.value === formData.priority)?.label
                    : 'Set priority'}
                </span>
                <ChevronDown size={14} className="text-gray-600" />
              </button>
              {showPriorityDropdown && (
                <div className="absolute left-0 right-0 mt-1 rounded-md border border-gray-200 bg-white shadow-lg z-10 max-h-48 overflow-y-auto"> {/* Added max-height and overflow for scrollability */}
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, priority: p.value });
                        setShowPriorityDropdown(false);
                      }}
                      className="block w-full text-[#1d8d84] text-left px-3 py-1.5 hover:bg-teal-50 transition-colors duration-150 rounded-md"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
              {errors.priority && <p className="text-xs text-red-500">{errors.priority}</p>}
            </div>

            {/* Category */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowPriorityDropdown(false);
                }}
                className="w-full flex justify-between items-center rounded-md border border-teal-300 px-3 py-1.5 bg-white text-left focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
              >
                <span className={formData.cat ? 'text-teal-800' : 'text-teal-500'}>
                  {formData.cat
                    ? categories.find((c) => c._id === formData.cat)?.category_name
                    : 'Choose category'}
                </span>
                <ChevronDown size={14} className="text-teal-600" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute left-0 right-0 mt-1 rounded-md border border-gray-200 bg-white shadow-lg z-10 max-h-48 overflow-y-auto"> {/* Added max-height and overflow for scrollability */}
                  {categories.map((c) => (
                    <button
                      key={c._id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, cat: c._id });
                        setShowCategoryDropdown(false);
                      }}
                      className="block w-full text-[#1d8d84] text-left px-3 py-1.5 hover:bg-teal-50 transition-colors duration-150 rounded-md"
                    >
                      {c.category_name}
                    </button>
                  ))}
                </div>
              )}
              {errors.cat && <p className="text-xs text-red-500">{errors.cat}</p>}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full text-[#1d8d84] rounded-md border border-teal-300 px-3 py-1.5 resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
          </div>

          {/* Attachment */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Attachment</label>
            <div className="flex items-center gap-2">
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
                className="flex cursor-pointer items-center gap-1 rounded-md border border-teal-300 px-3 py-1.5 text-sm text-teal-700 hover:bg-teal-50 transition-colors duration-200"
              >
                <Paperclip size={14} /> Choose File
              </label>
              <span className="text-xs text-gray-500 truncate max-w-[calc(100%-120px)] sm:max-w-none"> {/* Added truncate and max-width for small screens */}
                {attachedFiles.length ? attachedFiles[0].name : 'No file chosen'}
              </span>
            </div>
            {attachedFiles.length > 0 && (
              <div className="mt-1 flex items-center justify-between rounded-md bg-teal-50 px-2 py-1 border border-teal-200">
                <span className="truncate text-xs text-teal-800">
                  <Upload size={12} className="inline-block mr-1" />
                  {attachedFiles[0].name} ({(attachedFiles[0].size / 1024).toFixed(1)} KB)
                </span>
                <button onClick={removeFile} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-teal-600 py-2 text-white hover:bg-teal-700 disabled:bg-teal-300 transition-colors duration-200 font-semibold"
          >
            {isLoading ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>

      {/* click-outside */}
      <div className="absolute inset-0 -z-10" onClick={handleClose} />
    </div>
  );
}

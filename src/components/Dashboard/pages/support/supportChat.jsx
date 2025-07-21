// import React, { useCallback, useEffect, useState } from "react";

// // import DashboardLayout from "../Layout/DashboardLayout";
// import { Link, useParams } from "react-router-dom";

// import { toast } from "react-toastify";
// import { useCreateCommentMutation ,useChatGetQuery} from "./supportApiSlice";

// const SupportChart = () => {
//   let imageUrl = import.meta.env.VITE_IMAGE_URL;
//   // console.log({imageUrl})
//   const { id } = useParams();
//   const { data, isLoading, error } = useChatGetQuery(id);
//   const [createComment] = useCreateCommentMutation();

//   const [state, setState] = useState({
//     comment: "",
//     image: null,
//   });
//   const [currentImage, setCurrentImage] = useState([]);
//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const [clickedImage, setClickedImage] = useState("");
//   const [clickImage, setClickImage] = useState("");
//   const [cors, setCors] = useState("anonymous");
//   const [displayImage, setDisplayImage] = useState("");

//   const openImageViewer = useCallback((i) => {
//     console.log(i);

//     // console.log({ i });
//     setClickedImage(i);
//     // setClickImage([i]);
//     // setCurrentImage(0);
//     setIsViewerOpen(true);
//   }, []);
//   const chartData = data;
//   // console.log("clicked image", {clickedImage})

//   // console.log({clickedImage, currentImage, clickImage})
//   //======================================create comment===============================
//   const sendComment = async () => {
//     if (state?.comment == "") {
//       return toast?.error("Please enter a message", {
//         position: "top-center",
//       });
//     }
//     const formData = new FormData();
//     formData.append("comment", state.comment);
//     if (state?.image) {
//       formData.append("image", state.image);
//     }
//     formData.append("ticket_id", id);

//     try {
//       const response = await createComment(formData);
//       // console.log({response})
//       if (response?.data?.status_code == 200) {
//         setState({
//           comment: "",
//           image: null,
//         });
//         setDisplayImage("");
//       } else {
//         toast.error(response?.error?.data?.message, {
//           position: "top-center",
//         });
//         setState({
//           comment: "",
//           image: null,
//         });
//         setDisplayImage("");
//       }
//     } catch (error) {
//       if (error.response.status >= 400 && error.response.status <= 500) {
//         toast.error(error.response.data.message, {
//           position: "top-center",
//         });
//       }
//     }
//   };

//   //=======================================upload file======================================
//   const handleUpload = () => {
//     let input = document.createElement("input");
//     input.type = "file";
//     input.onchange = (_) => {
//       let files = Array.from(input.files);

//       if (files) {
//         const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
//         const invalidFile = !acceptedFormats.includes(files[0].type);
//         if (invalidFile) {
//           toast.warning("Only JPG / PNG files are allowed", {
//             position: "top-center",
//           });
//           return;
//         }
//       }

//       const showImage = URL.createObjectURL(files[0]);
//       setDisplayImage(showImage);
//       setState({ ...state, image: files[0] });
//     };

//     input.click();
//   };

//   const clearImage = () => {
//     setDisplayImage("");
//   };

//   const scrollToBottom = () => {
//     const chatBox = document.getElementById("chat_scroll");
//     if (chatBox) {
//       chatBox.scrollTop = chatBox.scrollHeight;
//     }
//   };
//   useEffect(() => {
//     scrollToBottom();
//   }, [chartData]);

//   const formatDateWithAmPm = (isoString) => {
//     const date = new Date(isoString);
//     const day = String(date.getUTCDate()).padStart(2, "0");
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//     const year = date.getUTCFullYear();
//     let hours = date.getUTCHours();
//     const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//     const amAndPm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12 || 12;
//     return `${day}-${month}-${year} ${hours}:${minutes} ${amAndPm}`;
//   };

//   return (
//     <div>
//       {/* <DashboardLayout> */}
//         <section className="profile_section supportChart">
//           <div className="container-fluid">
//             <div className="row">
//               <h6 className="py-3 pt-4 text-white mainTitle">
//                 Ticket detail view
//               </h6>
//               {/* <Link
//                 to="/support"
//                 style={{
//                   textDecoration: "none",
//                   fontSize: "18px",
//                   color: "#BD7809",
//                 }}
//                 className=" back_arrow"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   style={{ fill: "#BD7809" }}
//                 >
//                   <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
//                 </svg>{" "}
                
//               </Link> */}
//               <div className="col-12 col-md-6 user_ticket">
//                 <div className="chatTicketDetails p-3 rounded-3">
//                   <h3 className="text-white mb-3">Ticket Details</h3>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <label>Name</label>
//                       <p>
//                         {" "}
//                         {chartData?.data?.ticket?.author_name
//                           ? chartData.data.ticket.author_name
//                               .charAt(0)
//                               .toUpperCase() +
//                             chartData.data.ticket.author_name
//                               .slice(1)
//                               .toLowerCase()
//                           : ""}
//                       </p>
//                     </div>
//                     <div className="col-md-6">
//                       <label>Email</label>
//                       <p>{chartData?.data?.ticket.author_email}</p>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <label>Title</label>
//                       <p> {chartData?.data?.ticket.title}</p>
//                     </div>
//                     <div className="col-md-6">
//                       <label>Priority</label>
//                       <p
//                         className={`text-capitalize ${
//                           chartData?.data?.ticket.priority === "low"
//                             ? "text-info"
//                             : chartData?.data?.ticket.priority === "medium"
//                             ? "text-warning"
//                             : "text-danger"
//                         }`}
//                       >
//                         {chartData?.data?.ticket.priority}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <label>Content</label>
//                     <p className="contentDesc">
//                       {" "}
//                       {chartData?.data?.ticket.content}
//                     </p>
//                   </div>

//                   {chartData?.data?.ticket.image && (
//                     <div className="row justify-content-center">
//                       <label className="text-center py-3">Attachments</label>
//                       <img
//                         className="img-fluid rounded-3 p-3 pointer"
//                         src={chartData?.data?.ticket.image}
//                         data-bs-toggle="modal"
//                         data-bs-target="#selectModal"
//                         onClick={() => {
//                           openImageViewer(chartData?.data?.ticket.image);
//                         }}
//                         alt="user_Ticket_Image"
//                         style={{ maxHeight: "300px", maxWidth: "300px" }}
//                       />
//                     </div>
//                   )}

//                   <div>
//                     {/* <h6 className="mb-3 fw-bold">
//                     Name:{" "}
//                     {chartData?.data?.ticket?.author_name
//                       ? chartData.data.ticket.author_name
//                           .charAt(0)
//                           .toUpperCase() +
//                         chartData.data.ticket.author_name.slice(1).toLowerCase()
//                       : ""}
//                   </h6> */}
//                     {/* <h6 className="mb-3 fw-bold">
//                     Email: {chartData?.data?.ticket.author_email}
//                   </h6> */}
//                     {/* <h6 className="mb-3 text-capitalize fw-bold">
//                     Title: {chartData?.data?.ticket.title}
//                   </h6> */}
//                     {/* <h6 className="mb-3 text-capitalize fw-bold">
//                     Content: {chartData?.data?.ticket.content}
//                   </h6> */}
//                     {/* <h6 className="mb-3 text-capitalize fw-bold">
//                     Priority: {chartData?.data?.ticket.priority}
//                   </h6> */}
//                     {/* <div className="d-flex gap-3">
//                     <h6 className="my-auto fw-bold">Image: </h6>
//                     <img
//                       className="img-fluid"
//                       src={chartData?.data?.ticket.image}
//                       data-bs-toggle="modal"
//                       data-bs-target="#selectModal"
//                       onClick={() => {
//                         openImageViewer(chartData?.data?.ticket.image);
//                       }}
//                       alt="user_Ticket_Image"
//                       style={{ maxHeight: "300px", maxWidth: "300px" }}
//                     />
//                   </div> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-12 col-md-6 mt-2 mt-md-0">
//                 <div className="customChatBox rounded-3">
//                   <div className="support_chart_main_box rounded-top-3 pb-1">
//                     <h3 className="text-white px-3 py-3 rounded-top-3">
//                       {" "}
//                       <img src="/images/chartlogo.svg" className="pe-1" /> Chat
//                       Support
//                     </h3>
//                     {/* <div className="chart_heading mb-4 d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between"></div> */}
//                     <div className="chart_data chat_card px-3 pt-2">
//                       <ul
//                         className="list-unstyled admin_chart_main_data pe-1"
//                         id="chat_scroll"
//                       >
//                         {chartData?.data?.comments?.map((item, i) => {
//                           // console.log("item,,,,,,,,,,,", item);
//                           return item?.commented_by?.role == "0" ? (
//                             <li
//                               className="d-flex justify-content-end mb-4"
//                               key={`${item?._id}-${i}`}
//                             >
//                               <div className="admin_data">
//                                 <div className="d-flex align-items-center justify-content-end me-1">
//                                   {" "}
//                                   <img
//                                     src={
//                                       item.commented_by.profile ||
//                                       "/images/chart-user.png"
//                                     }
//                                     style={{
//                                       height: "30px",
//                                       width: "30px",
//                                       borderRadius: "50%",
//                                     }}
//                                     alt="chart"
//                                     className="img-fluid"
//                                   />
//                                   <h6 className="mb-0 ms-1">
//                                     {" "}
//                                     {item?.commented_by?.name}{" "}
//                                   </h6>
//                                 </div>
//                                 <div className="charts admin_chart justify-content-end p-1 pt-2 pb-1 ps-3">
//                                   <p className="mb-0">{item.comment}</p>
//                                   {item?.image ? (
//                                     <div className="mb-0 text-end chart_imgs mt-2">
//                                       <img
//                                         // crossOrigin="anonymous"
//                                         alt="chart-images"
//                                         className="chart_img img-fluid"
//                                         key={i}
//                                         style={{ cursor: "pointer" }}
//                                         onClick={() => {
//                                           openImageViewer(item.image);
//                                         }}
//                                         height={100}
//                                         width={100}
//                                         data-bs-toggle="modal"
//                                         data-bs-target="#selectModal"
//                                         src={`${item?.image}`}
//                                       />
//                                     </div>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                                 <p
//                                   className="ms-1 text-white text-end"
//                                   style={{ fontSize: "10px" }}
//                                 >
//                                   {formatDateWithAmPm(item?.created_at)}
//                                 </p>
//                               </div>
//                             </li>
//                           ) : (
//                             <li
//                               className="mb-1 d-flex align-items-end"
//                               key={`${item?._id}-${i}`}
//                             >
//                               <div className="user_chart mb-1 align-items-center gap-3">
//                                 <div className="d-flex align-items-center">
//                                   {" "}
//                                   <img
//                                     src={
//                                       item.commented_by.profile ||
//                                       "/images/chart-user.png"
//                                     }
//                                     style={{
//                                       height: "30px",
//                                       width: "30px",
//                                       borderRadius: "50%",
//                                     }}
//                                     alt="chart"
//                                     className="img-fluid"
//                                   />
//                                   <h6 className="mb-0 ms-1">
//                                     {" "}
//                                     {item?.commented_by?.name}{" "}
//                                   </h6>
//                                 </div>
//                                 <div className="charts p-2">
//                                   <p className="mb-0">{item?.comment}</p>
//                                   {item?.image ? (
//                                     <div className="mb-0  chart_imgs mt-2 ">
//                                       <img
//                                         className="img-fluid pointer"
//                                         alt="chart-images"
//                                         src={`${item?.image}`}
//                                         data-bs-toggle="modal"
//                                         height={100}
//                                         width={100}
//                                         data-bs-target="#selectModal"
//                                         onClick={() => {
//                                           openImageViewer(item.image);
//                                         }}
//                                       />
//                                     </div>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </div>
//                                 <p
//                                   className="ms-2 text-white"
//                                   style={{ fontSize: "10px" }}
//                                 >
//                                   {formatDateWithAmPm(item?.created_at)}
//                                 </p>
//                               </div>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="chart_send_box rounded-bottom-3 d-flex align-items-center gap-2 gap-sm-3 pe-3">
//                     <input
//                       type="text"
//                       className="form-control shadow-none"
//                       id="exampleInputEmail1"
//                       aria-describedby="emailHelp"
//                       placeholder="Type your message"
//                       autoComplete="off"
//                       value={state?.comment}
//                       onChange={(e) =>
//                         setState({ ...state, comment: e.target.value })
//                       }
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           sendComment();
//                         }
//                       }}
//                     />
//                     <div className="send_icons d-flex align-items-center gap-3">
//                       <Link to="#">
//                         {" "}
//                         <div>
//                           {displayImage ? (
//                             <div className="d-flex gap-1 position-relative">
//                               <img
//                                 src={displayImage}
//                                 alt="file"
//                                 className="img-fluid my-auto "
//                                 style={{
//                                   height: "27px",
//                                   width: "50px",
//                                   cursor: "pointer",
//                                 }}
//                               />
//                               <div
//                                 className="text-white bg-white position-absolute d-flex justify-content-center align-items-center"
//                                 style={{
//                                   borderRadius: "50%",
//                                   height: "20px",
//                                   width: "20px",
//                                   top: "-10px",
//                                   left: "30px",
//                                 }}
//                               >
//                                 <small
//                                   className="m-0"
//                                   style={{
//                                     fontSize: "10px",
//                                     fontFamily: "Inter",
//                                     color: "#eb660f",
//                                     fontWeight: "bold",
//                                   }}
//                                   onClick={() => clearImage()}
//                                 >
//                                   X
//                                 </small>
//                               </div>

//                               {/*  */}
//                             </div>
//                           ) : (
//                             <img
//                               src="/images/file.png"
//                               alt="file"
//                               className="img-fluid"
//                               style={{ height: "27px", cursor: "pointer" }}
//                               onClick={() => handleUpload()}
//                             />
//                           )}
//                         </div>
//                       </Link>

//                       <Link to="#">
//                         <img
//                           src="/images/send.png"
//                           alt="send"
//                           className="img-fluid"
//                           style={{ height: "20px" }}
//                           onClick={() => sendComment()}
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       {/* </DashboardLayout> */}
//       <div
//         className="modal costem_modal  fade"
//         id="selectModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content suspend_content rounded-3 pb-3 pt-0">
//             <div className="modal-header border-0 justify-content-end ">
//               <img
//                 id="closeCross"
//                 src="/images/cross.png"
//                 alt="cross"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 style={{ height: "34px" }}
//                 className="pointer"
//               />
//             </div>
//             <div className="modal-body suspend_content_data p-0">
//               {isViewerOpen && (
//                 <div className="modal_img overflow-hidden d-flex justify-content-center">
//                   {" "}
//                   {/* <img
//                     src={clickedImage[currentImage] || clickImage[currentImage]}
//                     crossOrigin="anonymous"
//                     className="modal_imgs"
//                   /> */}
//                   <img
//                     src={clickedImage || clickedImage["image"]}
//                     alt="image"
//                     style={{
//                       minHeight: "300px",
//                       maxHeight: "600px",
//                       minWidth: "250px",
//                       maxWidth: "600px",
//                     }}
//                     className="img-fluid"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportChart;




import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateCommentMutation, useChatGetQuery } from "./supportApiSlice";
import { 
  Send, 
  Paperclip, 
  X, 
  ArrowLeft, 
  User, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  MessageSquare
} from "lucide-react";

const SupportChart = () => {
  let imageUrl = import.meta.env.VITE_IMAGE_URL;
  const { id } = useParams();
  const { data, isLoading, error } = useChatGetQuery(id);
  const [createComment] = useCreateCommentMutation();

  const [state, setState] = useState({
    comment: "",
    image: null,
  });
  const [displayImage, setDisplayImage] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const chatBox = document.getElementById("chat_scroll");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  // Simulate typing indicator
  useEffect(() => {
    if (state.comment.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [state.comment]);

  const openImageViewer = useCallback((image) => {
    setClickedImage(image);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
    setClickedImage("");
  };

  const sendComment = async () => {
    if (state?.comment == "") {
      return toast?.error("Please enter a message", {
        position: "top-center",
      });
    }
    const formData = new FormData();
    formData.append("comment", state.comment);
    if (state?.image) {
      formData.append("image", state.image);
    }
    formData.append("ticket_id", id);

    try {
      const response = await createComment(formData);
      if (response?.data?.status_code == 200) {
        setState({
          comment: "",
          image: null,
        });
        setDisplayImage("");
      } else {
        toast.error(response?.error?.data?.message, {
          position: "top-center",
        });
        setState({
          comment: "",
          image: null,
        });
        setDisplayImage("");
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message, {
          position: "top-center",
        });
      }
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
          toast.warning("Only JPG / PNG files are allowed", {
            position: "top-center",
          });
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
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low": return "text-blue-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "low": return <CheckCircle2 className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "high": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#085358] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#085358]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/support" className="text-white hover:text-white/80 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-semibold">Support Ticket #{id}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${onlineStatus ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-sm">{onlineStatus ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ticket Details */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-white/70" />
              <h2 className="text-lg font-semibold">Ticket Details</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
                  <p className="text-white capitalize">
                    {data?.data?.ticket?.author_name
                      ? data.data.ticket.author_name
                          .charAt(0)
                          .toUpperCase() +
                        data.data.ticket.author_name
                          .slice(1)
                          .toLowerCase()
                      : ""}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                  <p className="text-white">{data?.data?.ticket?.author_email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Title</label>
                  <p className="text-white">{data?.data?.ticket?.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Priority</label>
                  <div className={`flex items-center space-x-2 ${getPriorityColor(data?.data?.ticket?.priority)}`}>
                    {getPriorityIcon(data?.data?.ticket?.priority)}
                    <span className="capitalize">{data?.data?.ticket?.priority}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
                <p className="text-white text-sm leading-relaxed bg-white/5 rounded-lg p-3">
                  {data?.data?.ticket?.content}
                </p>
              </div>
              
              {data?.data?.ticket?.image && (
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Attachment</label>
                  <img
                    className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity max-w-xs"
                    src={data?.data?.ticket?.image}
                    onClick={() => openImageViewer(data?.data?.ticket?.image)}
                    alt="Ticket attachment"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-white/70" />
                <h3 className="font-semibold">Live Support</h3>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Active</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat_scroll">
              {data?.data?.comments?.map((item, i) => {
                const isAdmin = item?.commented_by?.role === "0";
                return (
                  <div
                    key={`${item?._id}-${i}`}
                    className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${isAdmin ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-center space-x-2 mb-1 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                        <img
                          src={item.commented_by.profile || "/images/chart-user.png"}
                          alt="Avatar"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-white/70">{item?.commented_by?.name}</span>
                      </div>
                      
                      <div className={`rounded-2xl p-3 ${
                        isAdmin 
                          ? 'bg-white text-[#085358] rounded-br-sm' 
                          : 'bg-white/10 text-white rounded-bl-sm'
                      }`}>
                        <p className="text-sm">{item.comment}</p>
                        
                        {item?.image && (
                          <img
                            className="mt-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity max-w-full"
                            src={item.image}
                            onClick={() => openImageViewer(item.image)}
                            alt="Message attachment"
                          />
                        )}
                      </div>
                      
                      <div className={`text-xs text-white/50 mt-1 ${isAdmin ? 'text-right' : 'text-left'}`}>
                        {formatDateWithAmPm(item?.created_at)}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              {displayImage && (
                <div className="mb-3 relative inline-block">
                  <img
                    src={displayImage}
                    alt="Upload preview"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleUpload}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={state?.comment}
                    onChange={(e) => setState({ ...state, comment: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendComment();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30"
                    autoComplete="off"
                  />
                </div>
                
                <button
                  onClick={sendComment}
                  disabled={!state?.comment.trim()}
                  className="p-2 bg-white text-[#085358] rounded-full hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isViewerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={clickedImage}
              alt="Full size view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChart;



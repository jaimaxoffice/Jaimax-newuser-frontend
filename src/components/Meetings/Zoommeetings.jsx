// import React, { useState, useEffect, useMemo } from "react";
// import { Play, Calendar, Clock, Users, Filter, Search } from "lucide-react";
// import { useGetAllZoomMeetingsQuery } from "./MeetingsApiSlice";

// // Mock user layout component
// const UserLayout = ({ children }) => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="bg-white shadow-sm border-b px-6 py-4">
//       <h1 className="text-2xl font-bold text-gray-900">Learning Portal</h1>
//     </div>
//     <div className="p-6">
//       {children}
//     </div>
//   </div>
// );

// function UserMeetingsShowcase() {
//   const [selectedType, setSelectedType] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [selectedDot, setSelectedDot] = useState(null);
  
//   // Create query params for external pagination
//   const queryParams = useMemo(() => {
//     const params = new URLSearchParams();
//     params.append("page", currentPage.toString());
//     params.append("limit", itemsPerPage.toString());
    
//     // Add filters to query params for server-side filtering
//     if (selectedType !== "all") {
//       params.append("type", selectedType);
//     }
    
//     if (searchTerm) {
//       params.append("search", searchTerm);
//     }
    
//     return params.toString();
//   }, [currentPage, itemsPerPage, selectedType, searchTerm]);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedType, searchTerm]);

//   const {
//     data: meetingsData,
//     isLoading,
//     error,
//     refetch,
//   } = useGetAllZoomMeetingsQuery(queryParams);

//   const meetings = meetingsData?.data?.videos || [];
//   const pagination = meetingsData?.data?.pagination || {};
  
//   // Use total pages from server response
//   const totalPages = pagination.totalPages || 1;
//   const totalItems = pagination.totalItems || 0;

//   // Get meeting icon and color based on type
//   const getMeetingTypeInfo = (type) => {
//     switch (type) {
//       case "zoom meet":
//         return { color: "#0d9488", bgColor: "rgba(13, 148, 136, 0.1)" };
//       case "youtube":
//         return { color: "#14b8a6", bgColor: "rgba(20, 184, 166, 0.1)" };
//       case "google meet":
//         return { color: "#0f766e", bgColor: "rgba(15, 118, 110, 0.1)"};
//       default:
//         return { color: "#134e4a", bgColor: "rgba(19, 78, 74, 0.1)"};
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric"
//     });
//   };

//   // Handle join meeting
//   const handleJoinMeeting = (meeting) => {
//     window.open(meeting.url, "_blank", "noopener,noreferrer");
//   };

//   // Handle search input with debounce
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <UserLayout>
//       <div className="max-w-screen mx-auto">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 mb-2">
//           Learning Sessions
//           </h1>
//           <p className="text-teal-700 text-base sm:text-lg">
//             Join live sessions, watch recordings, and enhance your skills
//           </p>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-md border border-teal-100 p-4 sm:p-6 mb-6 sm:mb-8">
//           <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
//             {/* Search */}
//             <div className="relative flex-1 max-w-full sm:max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search meetings..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
//               />
//             </div>

//             {/* Type Filter */}
//             <div className="flex items-center gap-3">
//               <Filter className="text-teal-600 w-5 h-5" />
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-teal-900 min-w-0 flex-1 sm:flex-none"
//               >
//                 <option value="all">All Types</option>
//                 <option value="zoom meet">Zoom Meetings</option>
//                 <option value="youtube">YouTube Videos</option>
//                 <option value="google meet">Google Meet</option>
//               </select>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-teal-100 gap-3">
//             <span className="text-teal-700 text-sm sm:text-base">
//               {isLoading ? (
//                 "Loading sessions..."
//               ) : error ? (
//                 "Error loading sessions"
//               ) : (
//                 `Showing ${meetings.length}  sessions`
//               )}
//             </span>
//             {/* <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-teal-600">
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 rounded-full bg-teal-600"></div>
//                 <span>Zoom</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 rounded-full bg-teal-500"></div>
//                 <span>YouTube</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 rounded-full bg-teal-700"></div>
//                 <span>Google Meet</span>
//               </div>
//             </div> */}

//            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
//   {/* Zoom */}
//   <button
//     onClick={() => setSelectedDot(selectedDot === "zoom" ? null : "zoom")}
//     className="flex items-center gap-2"
//   >
//     <span
//       className={`w-4 h-4 rounded-full border-2 border-teal-600 transition 
//         ${selectedDot === "zoom" ? "bg-teal-600" : "bg-transparent"}`}
//     ></span>
//     <span className="text-teal-700 text-sm">Zoom</span>
//   </button>

//   {/* YouTube */}
//   <button
//     onClick={() => setSelectedDot(selectedDot === "youtube" ? null : "youtube")}
//     className="flex items-center gap-2"
//   >
//     <span
//       className={`w-4 h-4 rounded-full border-2 border-teal-500 transition 
//         ${selectedDot === "youtube" ? "bg-teal-500" : "bg-transparent"}`}
//     ></span>
//     <span className="text-teal-700 text-sm">YouTube</span>
//   </button>

//   {/* Google Meet */}
//   <button
//     onClick={() => setSelectedDot(selectedDot === "meet" ? null : "meet")}
//     className="flex items-center gap-2"
//   >
//     <span
//       className={`w-4 h-4 rounded-full border-2 border-teal-700 transition 
//         ${selectedDot === "meet" ? "bg-teal-700" : "bg-transparent"}`}
//     ></span>
//     <span className="text-teal-700 text-sm">Google Meet</span>
//   </button>
// </div>


//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 sm:mb-8">
//             <div className="flex items-center gap-2 text-red-800">
//               <Calendar className="w-5 h-5" />
//               <span className="font-medium">Error loading sessions</span>
//             </div>
//             <p className="text-red-600 mt-1 text-sm sm:text-base">
//               {error?.data?.message || "Unable to fetch meetings. Please try again later."}
//             </p>
//             <button
//               onClick={refetch}
//               className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Meetings Grid */}
//         {isLoading ? (
//           <div className="text-center py-12">
//             <div className="inline-flex items-center px-4 sm:px-6 py-3 bg-teal-50 rounded-lg">
//               <div className="animate-spin w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full mr-3"></div>
//               <span className="text-teal-600 font-medium text-sm sm:text-base">Loading sessions...</span>
//             </div>
//           </div>
//         ) : meetings.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//             {meetings.map((meeting) => {
//               const typeInfo = getMeetingTypeInfo(meeting.type);
//               return (
//                 <div
//                   key={meeting._id}
//                   className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-200"
//                 >
//                   {/* Header */}
//                   <div
//                     className="h-2"
//                     style={{ backgroundColor: typeInfo.color }}
//                   ></div>
                  
//                   <div className="p-4 sm:p-6">
//                     {/* Type Badge */}
//                     <div className="flex items-center justify-between mb-4">
//                       <span
//                         className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
//                         style={{
//                           backgroundColor: typeInfo.bgColor,
//                           color: typeInfo.color
//                         }}
//                       >
//                         <span className="hidden sm:inline">
//                           {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
//                         </span>
//                         <span className="sm:hidden">
//                           {meeting.type === 'zoom meet' ? 'Zoom' : 
//                            meeting.type === 'youtube' ? 'YouTube' :
//                            meeting.type === 'google meet' ? 'Meet' : meeting.type}
//                         </span>
//                       </span>
//                       <span className="text-teal-500 text-xs sm:text-sm">
//                         {formatDate(meeting.createdAt)}
//                       </span>
//                     </div>

//                     {/* Content */}
//                     <h3 className="text-lg sm:text-xl font-bold text-teal-900 mb-2 line-clamp-2">
//                       {meeting.title}
//                     </h3>
//                     <p className="text-teal-700 mb-4 line-clamp-2 text-sm sm:text-base">
//                       {meeting.subTitle}
//                     </p>

//                     {/* Meta Info */}
//                     <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-teal-600 mb-6">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{formatDate(meeting.createdAt)}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-4 h-4" />
//                         <span>ID: {meeting.videoId}</span>
//                       </div>
//                     </div>

//                     {/* Action Button */}
//                     <button
//                       onClick={() => handleJoinMeeting(meeting)}
//                       className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 font-medium text-white rounded-full transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
//                       style={{ backgroundColor: typeInfo.color }}
//                     >
//                       <Play className="w-4 h-4 sm:w-5 sm:h-5" />
//                       <span className="hidden sm:inline">
//                         {meeting.type === 'youtube' ? 'Watch Video' : 'Join Session'}
//                       </span>
//                       <span className="sm:hidden">
//                         {meeting.type === 'youtube' ? 'Watch' : 'Join'}
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 sm:w-24 sm:h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-teal-400" />
//             </div>
//             <h3 className="text-lg sm:text-xl font-bold text-teal-900 mb-2">No sessions found</h3>
//             <p className="text-teal-700 text-sm sm:text-base max-w-md mx-auto">
//               {searchTerm || selectedType !== "all"
//                 ? "Try adjusting your filters or search terms"
//                 : "Check back later for new learning sessions"}
//             </p>
//           </div>
//         )}

//         {/* External Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 sm:px-4 py-2 text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex-shrink-0"
//             >
//               <span className="hidden sm:inline">Previous</span>
//               <span className="sm:hidden">Prev</span>
//             </button>
            
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               // Show current page and 2 pages on each side when possible
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
              
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base flex-shrink-0 ${
//                     currentPage === pageNum
//                       ? 'bg-teal-600 text-white'
//                       : 'text-teal-700 bg-white border border-teal-200 hover:bg-teal-50'
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
            
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-3 sm:px-4 py-2 text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex-shrink-0"
//             >
//               <span className="hidden sm:inline">Next</span>
//               <span className="sm:hidden">Next</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </UserLayout>
//   );
// }

// export default UserMeetingsShowcase;

import React, { useState, useEffect, useMemo } from "react";
import { Play, Calendar, Clock, Users, Filter, Search } from "lucide-react";
import { useGetAllZoomMeetingsQuery } from "./MeetingsApiSlice";

const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900">Learning Portal</h1>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

function UserMeetingsShowcase() {
  const [selectedType, setSelectedType] = useState("all"); // dropdown
  const [selectedDot, setSelectedDot] = useState("all"); // frontend-only
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Build API query (backend filters)
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("limit", itemsPerPage.toString());
    if (selectedType !== "all") params.append("type", selectedType);
    if (debouncedSearch) params.append("search", debouncedSearch);
    return params.toString();
  }, [currentPage, itemsPerPage, selectedType, debouncedSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, debouncedSearch]);

  const { data: meetingsData, isLoading, error, refetch } =
    useGetAllZoomMeetingsQuery(queryParams);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);

  const meetings = meetingsData?.data?.videos || [];
  const pagination = meetingsData?.data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  // 🎨 Color settings per type
  const getMeetingTypeInfo = (type) => {
    switch (type) {
      case "zoom meet":
        return { color: "#0d9488", bgColor: "rgba(13,148,136,0.1)", label: "Join on Zoom" };
      case "youtube":
        return { color: "#dc2626", bgColor: "rgba(220,38,38,0.1)", label: "Watch on YouTube" };
      case "google meet":
        return { color: "#2563eb", bgColor: "rgba(37,99,235,0.1)", label: "Join on Google Meet" };
      case "social media":
        return { color: "#10b981", bgColor: "rgba(16,185,129,0.1)", label: "View on Social Media" };
      default:
        return { color: "#134e4a", bgColor: "rgba(19,78,74,0.1)", label: "View Session" };
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleJoinMeeting = (meeting) =>
    window.open(meeting.url, "_blank", "noopener,noreferrer");

  const extractYouTubeId = (url) => {
    try {
      const match =
        url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,})/
        ) || [];
      return match[1] || "";
    } catch {
      return "";
    }
  };

  // 🧠 Filter for dots (frontend-only)
  const filteredMeetings = useMemo(() => {
    if (!selectedDot || selectedDot === "all") return meetings;
    switch (selectedDot) {
      case "zoom":
        return meetings.filter((m) => m.type === "zoom meet");
      case "youtube":
        return meetings.filter((m) => m.type === "youtube");
      case "meet":
        return meetings.filter((m) => m.type === "google meet");
      default:
        return meetings;
    }
  }, [selectedDot, meetings]);

  return (
    <UserLayout>
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 mb-2">
            Learning Sessions
          </h1>
          <p className="text-teal-700 text-base sm:text-lg">
            Join live sessions, watch recordings, and enhance your skills
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-teal-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>

            {/* Dropdown */}
            <div className="flex items-center gap-3">
              {/* <Filter className="text-teal-600 w-5 h-5" /> */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-teal-900"
              >
                <option value="all">All Types</option>
                <option value="zoom meet">Zoom Meetings</option>
                <option value="youtube">YouTube Videos</option>
                <option value="google meet">Google Meet</option>
                <option value="social media">Social Media</option>
              </select>
            </div>
          </div>

          {/* Dots (frontend-only filter) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 border-t border-teal-100 pt-4">
            {[
              { key: "all", label: "All" },
              { key: "zoom", label: "Zoom" },
              { key: "youtube", label: "YouTube" },
              { key: "meet", label: "Google Meet" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() =>
                  setSelectedDot(selectedDot === f.key ? "all" : f.key)
                }
                className="flex items-center gap-2"
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 border-teal-600 transition 
                    ${selectedDot === f.key ? "bg-teal-600" : "bg-transparent"}`}
                ></span>
                <span className="text-teal-700 text-sm">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            Error loading videos.
            <button
              onClick={refetch}
              className="ml-3 px-3 py-1 bg-red-600 text-white rounded-md text-sm"
            >
              Retry
            </button>
          </div>
        ) : isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-3 bg-teal-50 rounded-lg">
              <div className="animate-spin w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full mr-3"></div>
              <span className="text-teal-600 font-medium">Loading videos...</span>
            </div>
          </div>
        ) : filteredMeetings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => {
              const typeInfo = getMeetingTypeInfo(meeting.type);
              const youTubeId =
                meeting.type === "youtube"
                  ? meeting.videoId || extractYouTubeId(meeting.url)
                  : null;

              const thumb =
                meeting.type === "youtube" && youTubeId
                  ? `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`
                  : meeting.type === "zoom meet"
                  ? "/assets/zoom-thumb.jpg"
                  : meeting.type === "google meet"
                  ? "/assets/googlemeet-thumb.jpg"
                  : meeting.type === "social media"
                  ? "/assets/social-thumb.jpg"
                  : "/assets/default-video-thumbnail.jpg";

              return (
                <div
                  key={meeting._id}
                  className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: typeInfo.color }}
                  ></div>

                  {/* Thumbnail */}
                  <button
                    onClick={() => handleJoinMeeting(meeting)}
                    className="relative w-full aspect-video overflow-hidden group"
                  >
                    <img
                      src={thumb}
                      alt={meeting.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition">
                      <div className="bg-white p-3 rounded-full shadow-lg">
                        <Play className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {typeInfo.label}
                    </div>
                  </button>

                  {/* Info */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: typeInfo.bgColor,
                          color: typeInfo.color,
                        }}
                      >
                        {meeting.type}
                      </span>
                      <span className="text-teal-500 text-xs">
                        {formatDate(meeting.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-teal-900 mb-2 line-clamp-2">
                      {meeting.title}
                    </h3>
                    <p className="text-teal-700 mb-4 line-clamp-2 text-sm">
                      {meeting.subTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-lg font-bold text-teal-900 mb-2">
              No videos found
            </h3>
            <p className="text-teal-700 text-sm max-w-md mx-auto">
              Try changing filters or check again later.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-teal-600 text-white"
                    : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
}

export default UserMeetingsShowcase;

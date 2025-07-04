// import React, { useState, useEffect } from "react";
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
//   const [filteredMeetings, setFilteredMeetings] = useState([]);
//   const [selectedType, setSelectedType] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(20);
//   const meetingsPerPage = 6;

//   // Build query parameters
//   const queryParams = new URLSearchParams();
//   queryParams.append('page', currentPage.toString());
//   queryParams.append('limit', limit.toString());

//   // API call using your endpoint
//   const {
//     data: meetingsData,
//     isLoading,
//     error,
//     refetch
//   } = useGetAllZoomMeetingsQuery(queryParams.toString());

//   const meetings = meetingsData?.data?.videos || [];
//   const pagination = meetingsData?.data?.pagination || {};

//   // Filter meetings based on type and search term
//   useEffect(() => {
//     let filtered = meetings;

//     // Filter by type
//     if (selectedType !== "all") {
//       filtered = filtered.filter(meeting => meeting.type === selectedType);
//     }

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(meeting =>
//         meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         meeting.subTitle.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredMeetings(filtered);
//   }, [meetings, selectedType, searchTerm]);

//   // Pagination for filtered results
//   const indexOfLastMeeting = currentPage * meetingsPerPage;
//   const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
//   const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
//   const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage);

//   // Get meeting icon and color based on type
//   const getMeetingTypeInfo = (type) => {
//     switch (type) {
//       case "zoom meet":
//         return { color: "#2D8CFF", bgColor: "rgba(45, 140, 255, 0.1)", icon: "📹" };
//       case "youtube":
//         return { color: "#FF0000", bgColor: "rgba(255, 0, 0, 0.1)", icon: "🎥" };
//       case "google meet":
//         return { color: "#34A853", bgColor: "rgba(52, 168, 83, 0.1)", icon: "🎯" };
//       default:
//         return { color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)", icon: "📱" };
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

//   return (
//     <UserLayout>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             📚 Learning Sessions
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Join live sessions, watch recordings, and enhance your skills
//           </p>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search meetings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               />
//             </div>

//             {/* Type Filter */}
//             <div className="flex items-center gap-3">
//               <Filter className="text-gray-500 w-5 h-5" />
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//               >
//                 <option value="all">All Types</option>
//                 <option value="zoom meet">Zoom Meetings</option>
//                 <option value="youtube">YouTube Videos</option>
//                 <option value="google meet">Google Meet</option>
//               </select>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//             <span className="text-gray-600">
//               {isLoading ? (
//                 "Loading sessions..."
//               ) : error ? (
//                 "Error loading sessions"
//               ) : (
//                 `Showing ${currentMeetings.length} of ${filteredMeetings.length} sessions`
//               )}
//             </span>
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                 <span>Zoom ({meetings.filter(m => m.type === 'zoom meet').length})</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                 <span>YouTube ({meetings.filter(m => m.type === 'youtube').length})</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                 <span>Google Meet ({meetings.filter(m => m.type === 'google meet').length})</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
//             <div className="flex items-center gap-2 text-red-800">
//               <Calendar className="w-5 h-5" />
//               <span className="font-medium">Error loading sessions</span>
//             </div>
//             <p className="text-red-600 mt-1">
//               {error?.data?.message || "Unable to fetch meetings. Please try again later."}
//             </p>
//             <button
//               onClick={() => refetch()}
//               className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Meetings Grid */}
//         {isLoading ? (
//           <div className="text-center py-12">
//             <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-lg">
//               <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-3"></div>
//               <span className="text-blue-600 font-medium">Loading sessions...</span>
//             </div>
//           </div>
//         ) : currentMeetings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {currentMeetings.map((meeting) => {
//               const typeInfo = getMeetingTypeInfo(meeting.type);
//               return (
//                 <div
//                   key={meeting._id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                 >
//                   {/* Header */}
//                   <div
//                     className="h-2"
//                     style={{ backgroundColor: typeInfo.color }}
//                   ></div>
                  
//                   <div className="p-6">
//                     {/* Type Badge */}
//                     <div className="flex items-center justify-between mb-4">
//                       <span
//                         className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
//                         style={{
//                           backgroundColor: typeInfo.bgColor,
//                           color: typeInfo.color
//                         }}
//                       >
//                         <span className="mr-1">{typeInfo.icon}</span>
//                         {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
//                       </span>
//                       <span className="text-gray-500 text-sm">
//                         {formatDate(meeting.createdAt)}
//                       </span>
//                     </div>

//                     {/* Content */}
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
//                       {meeting.title}
//                     </h3>
//                     <p className="text-gray-600 mb-4 line-clamp-2">
//                       {meeting.subTitle}
//                     </p>

//                     {/* Meta Info */}
//                     <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
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
//                       className="w-full flex items-center justify-center gap-2 px-6 py-3 font-medium text-white rounded-lg transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
//                       style={{ backgroundColor: typeInfo.color }}
//                     >
//                       <Play className="w-5 h-5" />
//                       {meeting.type === 'youtube' ? 'Watch Video' : 'Join Session'}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Calendar className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions found</h3>
//             <p className="text-gray-600">
//               {searchTerm || selectedType !== "all"
//                 ? "Try adjusting your filters or search terms"
//                 : "Check back later for new learning sessions"}
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Previous
//             </button>
            
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   currentPage === page
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
            
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </UserLayout>
//   );
// }

// export default UserMeetingsShowcase;


import React, { useState, useEffect } from "react";
import { Play, Calendar, Clock, Users, Filter, Search } from "lucide-react";
import { useGetAllZoomMeetingsQuery } from "./MeetingsApiSlice";

// Mock user layout component
const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900">Learning Portal</h1>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

function UserMeetingsShowcase() {
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const meetingsPerPage = 6;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('page', currentPage.toString());
  queryParams.append('limit', limit.toString());

  // API call using your endpoint
  const {
    data: meetingsData,
    isLoading,
    error,
    refetch
  } = useGetAllZoomMeetingsQuery(queryParams.toString());

  const meetings = meetingsData?.data?.videos || [];
  const pagination = meetingsData?.data?.pagination || {};

  // Filter meetings based on type and search term
  useEffect(() => {
    let filtered = meetings;

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(meeting => meeting.type === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(meeting =>
        meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.subTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMeetings(filtered);
  }, [meetings, selectedType, searchTerm]);


  // Pagination for filtered results
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage);

  // Get meeting icon and color based on type
  const getMeetingTypeInfo = (type) => {
    switch (type) {
      case "zoom meet":
        return { color: "#0d9488", bgColor: "rgba(13, 148, 136, 0.1)" };
      case "youtube":
        return { color: "#14b8a6", bgColor: "rgba(20, 184, 166, 0.1)" };
      case "google meet":
        return { color: "#0f766e", bgColor: "rgba(15, 118, 110, 0.1)"};
      default:
        return { color: "#134e4a", bgColor: "rgba(19, 78, 74, 0.1)"};
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Handle join meeting
  const handleJoinMeeting = (meeting) => {
    window.open(meeting.url, "_blank", "noopener,noreferrer");
  };

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 mb-2">
          Learning Sessions
          </h1>
          <p className="text-teal-700 text-base sm:text-lg">
            Join live sessions, watch recordings, and enhance your skills
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md border border-teal-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-3">
              <Filter className="text-teal-600 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-teal-900 min-w-0 flex-1 sm:flex-none"
              >
                <option value="all">All Types</option>
                <option value="zoom meet">Zoom Meetings</option>
                <option value="youtube">YouTube Videos</option>
                <option value="google meet">Google Meet</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-teal-100 gap-3">
            <span className="text-teal-700 text-sm sm:text-base">
              {isLoading ? (
                "Loading sessions..."
              ) : error ? (
                "Error loading sessions"
              ) : (
                `Showing ${currentMeetings.length} of ${filteredMeetings.length} sessions`
              )}
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-teal-600">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                <span>Zoom ({meetings.filter(m => m.type === 'zoom meet').length})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <span>YouTube ({meetings.filter(m => m.type === 'youtube').length})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-teal-700"></div>
                <span>Google Meet ({meetings.filter(m => m.type === 'google meet').length})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-red-800">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Error loading sessions</span>
            </div>
            <p className="text-red-600 mt-1 text-sm sm:text-base">
              {error?.data?.message || "Unable to fetch meetings. Please try again later."}
            </p>
            <button
              onClick={() => setError(null)}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        )}

        {/* Meetings Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 sm:px-6 py-3 bg-teal-50 rounded-lg">
              <div className="animate-spin w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full mr-3"></div>
              <span className="text-teal-600 font-medium text-sm sm:text-base">Loading sessions...</span>
            </div>
          </div>
        ) : currentMeetings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {currentMeetings.map((meeting) => {
              const typeInfo = getMeetingTypeInfo(meeting.type);
              return (
                <div
                  key={meeting._id}
                  className="bg-white rounded-xl shadow-md border border-teal-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-200"
                >
                  {/* Header */}
                  <div
                    className="h-2"
                    style={{ backgroundColor: typeInfo.color }}
                  ></div>
                  
                  <div className="p-4 sm:p-6">
                    {/* Type Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                        style={{
                          backgroundColor: typeInfo.bgColor,
                          color: typeInfo.color
                        }}
                      >
                        <span className="mr-1">{typeInfo.icon}</span>
                        <span className="hidden sm:inline">
                          {meeting.type.charAt(0).toUpperCase() + meeting.type.slice(1)}
                        </span>
                        <span className="sm:hidden">
                          {meeting.type === 'zoom meet' ? 'Zoom' : 
                           meeting.type === 'youtube' ? 'YouTube' :
                           meeting.type === 'google meet' ? 'Meet' : meeting.type}
                        </span>
                      </span>
                      <span className="text-teal-500 text-xs sm:text-sm">
                        {formatDate(meeting.createdAt)}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-teal-900 mb-2 line-clamp-2">
                      {meeting.title}
                    </h3>
                    <p className="text-teal-700 mb-4 line-clamp-2 text-sm sm:text-base">
                      {meeting.subTitle}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-teal-600 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(meeting.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>ID: {meeting.videoId}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleJoinMeeting(meeting)}
                      className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 font-medium text-white rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                      style={{ backgroundColor: typeInfo.color }}
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">
                        {meeting.type === 'youtube' ? 'Watch Video' : 'Join Session'}
                      </span>
                      <span className="sm:hidden">
                        {meeting.type === 'youtube' ? 'Watch' : 'Join'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-teal-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-teal-900 mb-2">No sessions found</h3>
            <p className="text-teal-700 text-sm sm:text-base max-w-md mx-auto">
              {searchTerm || selectedType !== "all"
                ? "Try adjusting your filters or search terms"
                : "Check back later for new learning sessions"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base flex-shrink-0 ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'text-teal-700 bg-white border border-teal-200 hover:bg-teal-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 text-teal-700 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
}

export default UserMeetingsShowcase;
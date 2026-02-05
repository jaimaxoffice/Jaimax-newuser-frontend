import React, { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { useGetAllZoomMeetingsQuery } from "./MeetingsApiSlice";
import Loader from "../../../../ReusableComponents/Loader/loader";
import Pagination from "../../../../ReusableComponents/Pagination/Pagination";

const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="p-6">{children}</div>
  </div>
);

// Empty State Component
const EmptyState = ({ selectedType, onReset }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
      <Calendar className="w-10 h-10 text-teal-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">No meetings found</h3>
    <p className="text-gray-500 text-center max-w-md mb-6">
      {selectedType === "all"
        ? "There are no meetings available at the moment. Please check back later."
        : `No ${selectedType === "zoom meet" ? "Zoom meetings" : selectedType === "youtube" ? "YouTube videos" : "social media posts"} found. Try selecting a different filter.`}
    </p>
    {selectedType !== "all" && (
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Show All Meetings
      </button>
    )}
  </div>
);

// Error State Component
const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="w-10 h-10 text-red-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">
      Failed to load meetings
    </h3>
    <p className="text-gray-500 text-center max-w-md mb-6">
      We encountered an error while fetching the meetings. Please check your
      connection and try again.
    </p>
    <button
      onClick={onRetry}
      className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
    >
      <RefreshCw className="w-4 h-4" />
      Try Again
    </button>
  </div>
);

// Single Meeting Card Component - Old Design
const MeetingCard = ({ meeting, onJoin, extractYouTubeId }) => {
  const renderContent = () => {
    switch (meeting.type) {
      case "zoom meet":
        return (
          <div className="p-5 text-center">
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              🚀 JAIMAX PRE-SALE ZOOM MEETING
            </h2>
            <div className="flex justify-center items-center text-gray-700 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              Every day at 8:00 PM IST
            </div>
            <div className="flex justify-center items-center mb-4 text-gray-800">
              <span className="mr-2">👨‍🏫</span> Mr. Santhosh Sir
            </div>
            <button
              onClick={() => onJoin(meeting)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              JOIN MEETING
            </button>
            <p className="text-gray-600 text-sm mt-4">
              Join on time and stay updated with the latest from JAIMAX.
            </p>
          </div>
        );

      case "youtube":
        return (
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(meeting.url)}?rel=0&modestbranding=1&showinfo=0`}
            title={meeting.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-60"
          />
        );

      default:
        return (
          <div className="p-4 text-center">
            <p className="text-gray-800 mb-3 font-semibold">{meeting.title}</p>
            <a
              href={meeting.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              View on Social Media
            </a>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {renderContent()}
    </div>
  );
};

function UserMeetingsShowcase() {
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("limit", itemsPerPage.toString());
    if (selectedType !== "all") params.append("type", selectedType);
    return params.toString();
  }, [currentPage, itemsPerPage, selectedType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const {
    data: meetingsData,
    isLoading,
    error,
    refetch,
  } = useGetAllZoomMeetingsQuery(queryParams);

  const meetings = meetingsData?.data?.videos || [];
  const pagination = meetingsData?.data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  const handleJoinMeeting = (meeting) =>
    window.open(meeting.url, "_blank", "noopener,noreferrer");

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilter = () => {
    setSelectedType("all");
    setCurrentPage(1);
  };

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

  if (isLoading) {
    return (
      <UserLayout>
        <Loader />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="mb-1 text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#000] tracking-wide">
              JAIMAX HUB
            </h1>
          </div>

          {/* Dropdown */}
          <div className="flex justify-end mb-2">
            <div className="relative inline-block">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 border border-[#00e0b3]/30 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#00e0b3] focus:outline-none"
                style={{ colorScheme: "light" }}
              >
                <option value="all">All Types</option>
                <option value="zoom meet">Zoom Meetings</option>
                <option value="youtube">YouTube Videos</option>
                <option value="social media">Social Media</option>
              </select>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-[#00bfa6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {error ? (
          <ErrorState onRetry={refetch} />
        ) : meetings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {meetings.map((meeting) => (
                <MeetingCard
                  key={meeting._id}
                  meeting={meeting}
                  onJoin={handleJoinMeeting}
                  extractYouTubeId={extractYouTubeId}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyState selectedType={selectedType} onReset={handleResetFilter} />
        )}
      </div>
    </UserLayout>
  );
}

export default UserMeetingsShowcase;
import React, { useState, useEffect, useMemo } from "react";
import { Calendar, Clock } from "lucide-react";
import { useGetAllZoomMeetingsQuery } from "./MeetingsApiSlice";
import Loader from "../../../../ReusableComponents/Loader/loader";
const UserLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {" "}
    <div className="p-6">{children}</div>{" "}
  </div>
);

function UserMeetingsShowcase() {
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Backend query
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
  } = useGetAllZoomMeetingsQuery(queryParams);

  const meetings = meetingsData?.data?.videos || [];
  const pagination = meetingsData?.data?.pagination || {};
  const totalPages = pagination.totalPages || 1;

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

  if(isLoading){
    return <Loader/>
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

    {/* Custom dropdown arrow */}
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


      {/* Results */}
      {error ? (
        <div className="text-center text-red-500">Error loading meetings.</div>
      ) : isLoading ? (
        <div className="text-center text-white">Loading...</div>
      ) : meetings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {meeting.type === "zoom meet" ? (
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
                    onClick={() => handleJoinMeeting(meeting)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
                  >
                    JOIN MEETING
                  </button>

                  <p className="text-gray-600 text-sm mt-4">
                    Join on time and stay updated with the latest from JAIMAX.
                  </p>
                </div>
              ) : meeting.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(
                    meeting.url
                  )}?rel=0&modestbranding=1&showinfo=0`}
                  title={meeting.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-60"
                ></iframe>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-800 mb-3 font-semibold">
                    {meeting.title}
                  </p>
                  <a
                    href={meeting.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View on Social Media
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-white">
          <Calendar className="w-8 h-8 mx-auto mb-3 text-[#00e0b3]" />
          <h3 className="text-lg font-bold mb-2">No meetings found</h3>
          <p className="text-sm text-gray-300">
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

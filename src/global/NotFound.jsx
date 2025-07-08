import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-full shadow"
      >
        <ArrowLeft size={18} />
        Go Home
      </button>
    </div>
  );
};

export default NotFound;

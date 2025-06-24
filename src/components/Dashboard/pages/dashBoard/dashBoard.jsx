

import React from "react";
import ActionButtons from "./actionComponent/actionCompent";
import TopCards from "./cards/cards";
import TeamCollaboration from "./teamWorkPanel/teamWorkPanel";
import SlabTabs from "./timeTracker/timeTracker";

const Dashboard = () => {
  return (
   <div className="min-h-screen p-2  bg-[#1d8e85]   rounded-xl text-sm sm:text-base md:text-lg overflow-x-hidden">
      <div className="mb-6">
        <ActionButtons />
      </div>

      {/* SlabTabs and TopCards side-by-side */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* SlabTabs half width */}
        <div className="lg:w-1/3">
          <SlabTabs />
        </div>

        {/* TopCards half width */}
        <div className="w-full">
          <TopCards />
        </div>
      </div>

      {/* Team Collaboration full width below */}
      <div>
        <TeamCollaboration />
      </div>
    </div>
  );
};

export default Dashboard;

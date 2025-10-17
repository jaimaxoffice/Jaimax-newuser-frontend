import React from 'react';
import { useGetAnnounceQuery } from './AnnouncementsApiSlice';

function AnnouncementComponent() {
  // Call the hook to fetch announcements
  const { 
    data: announceData, 
    isLoading, 
    isError, 
    refetch 
  } = useGetAnnounceQuery();

  useEffect(() => {
    // You can access the announcement data here
    if (announceData) {
      console.log('Announcement data:', announceData);
    }
  }, [announceData]);

  return (
    <div>
      {isLoading ? (
        <p>Loading announcements...</p>
      ) : isError ? (
        <p>Error loading announcements</p>
      ) : (
        // Display your announcements here
        <div className="announcements">
          {announceData?.images?.map((image, index) => (
            <img key={index} src={image.url} alt={`Announcement ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
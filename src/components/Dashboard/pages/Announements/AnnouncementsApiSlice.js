import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const announcementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnounce: builder.query({
      query: () => ({
        url: "/announcements/get",
        method: "GET",
      }),
    }),
  }),
});

// ✅ Correct export
export const { useGetAnnounceQuery } = announcementApiSlice;
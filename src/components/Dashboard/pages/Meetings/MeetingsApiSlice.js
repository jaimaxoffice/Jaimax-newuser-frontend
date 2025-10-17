import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const zoomMeetingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllZoomMeetings: builder.query({
      query: (queryParams) => ({
        url: `/zoom-meetings/all-zoom-videos?${queryParams}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllZoomMeetingsQuery } = zoomMeetingApiSlice;
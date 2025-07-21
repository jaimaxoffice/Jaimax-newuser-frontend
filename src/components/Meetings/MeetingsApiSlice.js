import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const zoomMeetingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllZoomMeetings: builder.query({
      query: (queryParams) => ({
        url: `/admin/zoom-meet/all?${queryParams}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllZoomMeetingsQuery } = zoomMeetingApiSlice;
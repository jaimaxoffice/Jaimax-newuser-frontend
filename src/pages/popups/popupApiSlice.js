import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const popupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivePopup: builder.query({
      query: () => ({
        url: `/popups/active`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetActivePopupQuery,
  useLazyGetActivePopupQuery
} = popupApiSlice;
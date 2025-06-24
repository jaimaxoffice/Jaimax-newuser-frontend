import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const homePageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReferEarnPercentage: builder.query({
      query: () => ({
        url: "/refer-earn",
        method: "GET",
      }),
    }),
    submitEnquiry: builder.mutation({
      query: (data) => ({
        url: "/support/enquiry",
        method: "POST",
        body: { ...data },
        
      }),
    }),
  }),
});

export const { useGetReferEarnPercentageQuery, useSubmitEnquiryMutation } =
  homePageApiSlice;

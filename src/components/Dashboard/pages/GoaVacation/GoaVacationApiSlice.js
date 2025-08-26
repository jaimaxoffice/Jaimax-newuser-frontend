import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const ReferalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userDetailsQueryData: builder.query({
      query: (userId) => ({
        url: "/user/goa-marketingplan-eligibilty",
        method: "POST",
        body: { userId },
      }),
    }),
  }),
});

// ✅ now your hook will be generated as:
export const { 
  
  useUserDetailsQueryDataQuery } = ReferalApiSlice;

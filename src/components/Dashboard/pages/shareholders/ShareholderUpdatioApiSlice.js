import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
export const updateShareholderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateShareholderProfile: builder.mutation({
      query: (data) => ({
        url: "/share-holders/update-shareholder-profile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateShareholderProfileMutation } = updateShareholderApiSlice;

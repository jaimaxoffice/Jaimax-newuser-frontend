import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
export const shareholderAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    shareAuth: builder.query({
      query: () => {
        return {
          url: `/admin/share-holders/all-authorized-shareholders`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useShareAuthQuery } = shareholderAuthApiSlice;


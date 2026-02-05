import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const legalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getLegal: builder.query({
      query: (queryParams) => {
        return {
          url: `/legal/get_legal`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {  useGetLegalQuery } = legalApiSlice;

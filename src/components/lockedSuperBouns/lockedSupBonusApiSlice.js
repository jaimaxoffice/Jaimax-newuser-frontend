import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const lockedsuperbonusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLockedSuperbonus: builder.query({
      query: () => ({
        url: `/User/get-locked-superboonus-info`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllLockedSuperbonusQuery } = lockedsuperbonusApiSlice;
import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const lockedsuperbonusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLockedSuperbonus: builder.query({
      query: () => ({
        url: `/User/get-locked-superboonus-info`,
        method: "GET",
      }),
    }),
    getDisburseBonus: builder.query({
      query: () => ({
        url: `/User/disburse-locked-superboonus`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllLockedSuperbonusQuery,useGetDisburseBonusQuery  } = lockedsuperbonusApiSlice;
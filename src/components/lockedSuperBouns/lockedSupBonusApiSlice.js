import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const lockedsuperbonusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLockedSuperbonus: builder.query({
      query: () => ({
        url: `/User/get-locked-superboonus-info`,
        method: "GET",
      }),
    }),
    disburseBonus: builder.mutation({  // <-- change to mutation
      query: () => ({
        url: `/User/disburse-locked-superboonus`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetAllLockedSuperbonusQuery, 
  useDisburseBonusMutation  // <-- updated hook
} = lockedsuperbonusApiSlice;

import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const weeklyBonusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeekInfo: builder.query({
      query: () => ({
        url: `/weekly-bonus/number`,
        method: "GET",
      }),
    }),
    getUserWeeklyBonusJourney: builder.query({
      query: () => ({
        url: `/weekly-bonus/info`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useGetWeekInfoQuery, 
  useGetUserWeeklyBonusJourneyQuery 
} = weeklyBonusApiSlice;
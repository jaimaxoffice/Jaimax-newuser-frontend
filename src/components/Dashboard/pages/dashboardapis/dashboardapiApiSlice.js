// dashboardApiSlice.js
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboardApiDetails: builder.query({
      query: () => ({
        url: "/dashboard/get-dashboard-details", // keep as your backend
        method: "GET",
      }),
    }),
  }),
});

export const { useDashboardApiDetailsQuery } = dashboardApiSlice;

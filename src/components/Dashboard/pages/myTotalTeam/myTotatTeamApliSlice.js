// user/userReport
// user/userReport

import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const myTeamApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
          userDetails: builder.query({
            query: (queryParams) => ({
              url: `/Auth/userReport?${queryParams}`,
              method: 'GET', 
            }),
          })
        
    })
})

export const { useUserDetailsQuery } = myTeamApiSlice;


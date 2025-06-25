

import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 

export const buyHistoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
          buyDetails: builder.query({
            query: (queryParams) => ({
              url: `/order/buyHistory?${queryParams}`,
              method: 'GET', 
            }),
          })
        
    })
})

export const { useBuyDetailsQuery } = buyHistoryApiSlice; 

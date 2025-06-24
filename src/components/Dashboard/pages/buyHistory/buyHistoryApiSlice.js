

<<<<<<< HEAD
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
=======
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 
>>>>>>> 42822ca8648f5a66f71d825efd501d2d2967e8e7

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


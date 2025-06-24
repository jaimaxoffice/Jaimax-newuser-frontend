<<<<<<< HEAD
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi"; 
=======
import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";
>>>>>>> 42822ca8648f5a66f71d825efd501d2d2967e8e7


const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // changePwd:builder.mutation({
        //     query:(credentials) => ({
        //         url:"/Auth/register",
        //         method:"POST",
        //         body: {...credentials}
        //     }),
        // })
        updateAddress:builder.mutation({
            query:(credentials) => ({
                url:"/user/userUpdate",
                method:"PUT",
                body:credentials
            }),
            invalidatesTags:["updateDetails"]
        })
        
    })
})
export const {useUpdateAddressMutation} = profileApiSlice;
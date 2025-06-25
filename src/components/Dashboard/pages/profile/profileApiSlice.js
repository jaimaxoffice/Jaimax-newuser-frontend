import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";


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
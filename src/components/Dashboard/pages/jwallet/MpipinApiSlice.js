import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const walletPinApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Request OTP for creating PIN
    requestCreatePinOtp: builder.mutation({
      query: (data) => ({
        url: `/mpin/request-create-pin-otp`,
        method: "POST",
        body: data,
      }),
    }),

    // 2. Create PIN (verify OTP)
    createPin: builder.mutation({
      query: (data) => ({
        url: `/Mpin/create-pin`,
        method: "POST",
        body: data,
      }),
    }),

    // 3. Request OTP for forgot PIN
    requestForgetPinOtp: builder.mutation({
      query: () => ({
        url: `/Mpin/request-forget-pin-otp`,
        method: "POST",
        body: {},
      }),
    }),

    // 5. Verify PIN
    verifyPin: builder.mutation({
      query: (data) => ({
        url: `/Mpin/verify-pin`,
        method: "POST",
        body: data,
      }),
    }),

    // 6. Modify PIN
    modifyPin: builder.mutation({
      query: (data) => ({
        url: `/Mpin/modify-pin`,
        method: "PUT",
        body: data,
      }),
    }),

    // 7. Forget PIN (reset with OTP + security answers)
    forgetPin: builder.mutation({
      query: (data) => ({
        url: `/Mpin/forget-pin`,
        method: "POST",
        body: data,
      }),
    }),

    // 8. Get security questions
    getSecurityQuestions: builder.query({
      query: () => ({
        url: `/Mpin/security-questions`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRequestCreatePinOtpMutation,
  useCreatePinMutation,
  useRequestForgetPinOtpMutation,
  useVerifyPinMutation,
  useModifyPinMutation,
  useForgetPinMutation,
  useGetSecurityQuestionsQuery,
} = walletPinApiSlice;
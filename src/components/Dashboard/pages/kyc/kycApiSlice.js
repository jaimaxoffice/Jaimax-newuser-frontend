import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const kycApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    kycadd: builder.mutation({
      query: (data) => {
        return {
          url: "/kyc/submitKyc",
          method: "POST",
          body: data,
        };
      },
    }),
    kycreward: builder.query({
      query: () => {
        return {
          url: "/kyc/kyc-reward-claim",
          method: "GET",
        };
      },
    }),
    getkycDetails: builder.query({
      query: (id) => {
        return {
          url: `kyc/KycStatus`,
          method: "GET",
        };
      },
    }),
    getKycData: builder.mutation({
      query: (data) => ({
        url: `digilocker/getKycData`,
        method: "POST",
        body: { ...data },
      }),
    }),
    updateBankDetails: builder.mutation({
      query: (data) => ({
        url: "user/update-bank-details",
        method: "PATCH",
        body: data,
      }),
    }),
    sendAadhaarOtp: builder.mutation({
      query: (data) => ({
        url: "/kyc/get-aadhar-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyAadhaarOtp: builder.mutation({
      query: (data) => ({
        url: "/kyc/verify-aadhar-otp",
        method: "POST",
        body: data,
      }),
    }),
    saveKycDraft: builder.mutation({
      query: (data) => ({
        url: "/kyc/draft",
        method: "POST",
        body: data,
      }),
    }),
    getKycDraft: builder.query({
      query: () => ({
        url: "/kyc/draft",
        method: "GET",
      }),
    }),

    deleteKycDraft: builder.mutation({
      query: () => ({
        url: "/kyc/draft",
        method: "DELETE",
      }),
    }),

    extendKycDraftExpiry: builder.mutation({
      query: () => ({
        url: "/kyc/draft/extend",
        method: "PUT",
      }),
    }),

  }),
});

export const {
  useKycaddMutation,
  useKycrewardQuery,
  useLazyKycrewardQuery,
  useGetkycDetailsQuery,
  useGetKycDataMutation,
  useUpdateBankDetailsMutation,
  useSendAadhaarOtpMutation,
  useVerifyAadhaarOtpMutation,
  useSaveKycDraftMutation,
  useGetKycDraftQuery,
  useDeleteKycDraftMutation,
  useExtendKycDraftExpiryMutation,
} = kycApiSlice;

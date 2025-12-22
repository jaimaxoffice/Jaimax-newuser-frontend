import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";

export const secureRevealApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Check 2FA status
    check2FAStatus: builder.query({
      query: () => ({
        url: `/reveal/2fa-status`,
        method: "GET",
      }),
      providesTags: ["TwoFA"],
    }),

    // 2. Start 2FA setup (get QR code)
    start2FASetup: builder.mutation({
      query: () => ({
        url: `/reveal/start-2fa`,
        method: "POST",
      }),
    }),

    // 3. Verify 2FA code
    verify2FA: builder.mutation({
      query: (otp) => ({
        url: `/reveal/verify-2fa`,
        method: "POST",
        body: { otp },
      }),
      invalidatesTags: ["TwoFA"],
    }),

    // 4. Reveal sensitive data (seed phrase or private key)
    revealSensitiveData: builder.mutation({
      query: (payload) => ({
        url: `/reveal/reveal`,
        method: "POST",
        body: payload,
      }),
    }),
    disable2FA: builder.mutation({
      query: (otp) => ({
        url: "/reveal/disable-2fa",
        method: "POST",
        body: { otp },
      }),
      invalidatesTags: ["TwoFA"],
    }),
  }),
});

export const {
  useCheck2FAStatusQuery,
  useStart2FASetupMutation,
  useVerify2FAMutation,
  useRevealSensitiveDataMutation,
  useDisable2FAMutation,
} = secureRevealApiSlice;

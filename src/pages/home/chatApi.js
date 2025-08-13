// import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

// export const chatApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     sendMessage: builder.mutation({
//       query: (query) => ({
//         url: '/admin/aiDocument/ask',
//         method: 'POST',
//         body: { query },
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }),
//       transformResponse: (response) => ({
//         answer: response.answer || "🤖 Sorry, I couldn't find an answer.",
//         timestamp: new Date().toISOString(),
//       }),
//       transformErrorResponse: (response) => ({
//         error: "⚠️ We're facing a technical issue. Please try again shortly.",
//         status: response.status,
//       }),
//       invalidatesTags: ['Chat'],  // Optional if you want cache invalidation
//     }),

//     insertQuery: builder.mutation({
//       query: (queryData) => ({
//         url: 'admin/aiDocument/insert-query',
//         method: 'POST',
//         body: { query: queryData },
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODhlNDZlMGMyYTBkNjFiNmExM2FmOSIsImV4cCI6MTc1NDg5NzQzMCwiaWF0IjoxNzU0ODk2ODMwfQ.fn841gxguuqB-JFg_kJ5kb1rpur29j_SqCBlYfFCZFE`,
//         },
//       }),
//       transformResponse: (response) => response,
//       transformErrorResponse: (response) => ({
//         error: "Failed to log query",
//         status: response.status,
//       }),
//     }),
//   }),
//   overrideExisting: false, // or true if you want to override existing endpoints
// });

// export const { 
//   useSendMessageMutation, 
//   useInsertQueryMutation 
// } = chatApiSlice;

// // chatApi.js
// import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

// export const chatApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     sendMessage: builder.mutation({
//       query: (query) => ({
//         url: "/ask",
//         method: "POST",
//         body: { query },
//       }),
//     }),

//     logQuery: builder.mutation({
//       query: (query) => ({
//         url: "/admin/aiDocument/insert-query",
//         method: "POST",
//         body: { query },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }),
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useSendMessageMutation,
//   useLogQueryMutation
// } = chatApi;


// store/api/chatApi.js
import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";
export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Send message to AI and get response
    sendChatMessage: builder.mutation({
      query: ({ query, conversationId }) => ({
        url: '/ai/ask',
        method: 'POST',
        body: { 
          query,
          conversationId // Optional: for maintaining conversation context
        },
      }),
      invalidatesTags: ['Chat'],
      // Transform response to handle streaming or typing effect
      transformResponse: (response) => ({
        answer: response.answer || "🤖 Sorry, I couldn't find an answer.",
        conversationId: response.conversationId,
        timestamp: new Date().toISOString(),
      }),
      // Handle errors gracefully
      transformErrorResponse: (response) => ({
        error: response.data?.message || "⚠️ We're facing a technical issue. Please try again shortly.",
        status: response.status,
      }),
    }),

    // Insert user query for analytics/logging
    insertUserQuery: builder.mutation({
      query: ({ query, conversationId, metadata }) => ({
        url: '/ai/insert-query',
        method: 'POST',
        body: { 
          query,
          conversationId,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ...metadata
          }
        },
      }),
      invalidatesTags: ['Query'],
    }),

    // Get chat history (if your backend supports it)
    getChatHistory: builder.query({
      query: ({ conversationId, limit = 50 }) => ({
        url: `/ai/chat-history`,
        params: { conversationId, limit },
      }),
      providesTags: ['Chat'],
      transformResponse: (response) => response.messages || [],
    }),

    // Delete chat conversation
    deleteChatConversation: builder.mutation({
      query: ({ conversationId }) => ({
        url: `/ai/conversation/${conversationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chat', 'Query'],
    }),

    // Get AI status/health check
    getAiStatus: builder.query({
      query: () => '/ai/status',
      providesTags: ['Chat'],
      // Refetch every 30 seconds to check AI availability
      pollingInterval: 30000,
    }),
  }),
});

export const {
  useSendChatMessageMutation,
  useInsertUserQueryMutation,
  useGetChatHistoryQuery,
  useDeleteChatConversationMutation,
  useGetAiStatusQuery,
} = chatApi;
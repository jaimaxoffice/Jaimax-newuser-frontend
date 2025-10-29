// // store/api/chatApi.js
// import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

// export const chatApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Send "message" to AI and get response (Python API on port 8000)
//     sendChatMessage: builder.mutation({
//       query: ({ query, conversationId }) => ({
//         url: "/ai/ask", // relative path
//         method: "POST",
//         body: {
//           query,
//           conversationId, // Optional: for maintaining conversation context
//         },
//         python: true, // Forces base URL to Python API (port 8000)
//       }),
//       invalidatesTags: ["Chat"],
//       transformResponse: (response) => ({
//         answer: response.answer || "🤖 Sorry, I couldn't find an answer.",
//         conversationId: response.conversationId,
//         timestamp: new Date().toISOString(),
//       }),
//       transformErrorResponse: (response) => ({
//         error:
//           response.data?.message ||
//           "⚠️ We're facing a technical issue. Please try again shortly.",
//         status: response.status,
//       }),
//     }),



//       getChatSupportData : builder.mutation({
//       query: ({ query }) => ({
//         url: "/icoRound/chatSupportdata", // relative path
//         method: "POST",
//         body: {
//           query,
//         },
  
//       }),
//         invalidatesTags: ["ChatSupport"],
//       // transformResponse: (response) => response || []
    
//     }),


//     // Insert user query for analytics/logging (Node API on port 3000)
//     insertUserQuery: builder.mutation({
//       query: ({ query, conversationId, metadata }) => ({
//         url: "/ai/insert-query",
//         method: "POST",
//         body: {
//           query,
//           conversationId,
//           metadata: {
//             timestamp: new Date().toISOString(),
//             userAgent: navigator.userAgent,
//             ...metadata,
//           },
//         },
//       }),
//       invalidatesTags: ["Query"],
//     }),

//     // Get chat history (Node API)
//     getChatHistory: builder.query({
//       query: ({ conversationId, limit = 50 }) => ({
//         url: `/ai/chat-history`,
//         params: { conversationId, limit },
//       }),
//       providesTags: ["Chat"],
//       transformResponse: (response) => response.messages || [],
//     }),

//     // Delete chat conversation (Node API)
//     deleteChatConversation: builder.mutation({
//       query: ({ conversationId }) => ({
//         url: `/ai/conversation/${conversationId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Chat", "Query"],
//     }),

//     // Get AI status/health check (Python API on port 8000)
//     getAiStatus: builder.query({
//       query: () => ({
//         url: "/ai/status",
//         python: true, // Calls Python base URL
//       }),
//       providesTags: ["Chat"],
//       pollingInterval: 30000,
//     }),
//   }),
// });

// export const {
//   useSendChatMessageMutation,
//   useGetChatSupportDataMutation ,
//   useInsertUserQueryMutation,
//   useGetChatHistoryQuery,
//   useDeleteChatConversationMutation,
//   useGetAiStatusQuery,

// } = chatApi;



// store/api/chatApi.js
import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Send "message" to AI and get response (Python API on port 8000)
    sendChatMessage: builder.mutation({
      query: ({ query, conversationId }) => ({
        url: "/ai/ask",
        method: "POST",
        body: {
          query,
          conversationId,
        },
        python: true, // Forces base URL to Python API (port 8000)
      }),
      invalidatesTags: ["Chat"],
      transformResponse: (response) => ({
        answer: response.answer || "🤖 Sorry, I couldn't find an answer.",
        conversationId: response.conversationId,
        timestamp: new Date().toISOString(),
      }),
      transformErrorResponse: (response) => ({
        error:
          response.data?.message ||
          "⚠️ We're facing a technical issue. Please try again shortly.",
        status: response.status,
      }),
    }),

    // Get chat support data based on language selection
    getChatSupportData: builder.mutation({
      query: ({ query, isAuthenticated }) => ({
        url: "/icoRound/chatSupportdata",
        method: "POST",
        body: {
          query,
          isAuthenticated,
        },
      }),
      invalidatesTags: ["ChatSupport"],
      transformResponse: (response) => {
        // Return the full response structure
        return response || {
          data: {
            categoryName: "",
            supportTitle: "",
            reset: "Reset",
            home: "Home",
            support: "Support",
            helpAvailable: "Help Available",
            needMoreHelp: "Need More Help?",
            contactSupport: "Contact Support",
            poweredBy: "Powered by JAIMAX AI",
            chatOptions: {
              initial: {
                message: "Welcome! How can we assist you?",
                options: [],
              },
            },
          },
        };
      },
      transformErrorResponse: (response) => ({
        error:
          response.data?.message ||
          "Failed to load chat support data. Please try again.",
        status: response.status,
      }),
    }),

    // Insert user query for analytics/logging (Node API on port 3000)
    insertUserQuery: builder.mutation({
      query: ({ query, conversationId, metadata }) => ({
        url: "/ai/insert-query",
        method: "POST",
        body: {
          query,
          conversationId,
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ...metadata,
          },
        },
      }),
      invalidatesTags: ["Query"],
    }),

    // Get chat history (Node API)
    getChatHistory: builder.query({
      query: ({ conversationId, limit = 50 }) => ({
        url: `/ai/chat-history`,
        params: { conversationId, limit },
      }),
      providesTags: ["Chat"],
      transformResponse: (response) => response.messages || [],
    }),

    // Delete chat conversation (Node API)
    deleteChatConversation: builder.mutation({
      query: ({ conversationId }) => ({
        url: `/ai/conversation/${conversationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat", "Query"],
    }),

    // Get AI status/health check (Python API on port 8000)
    getAiStatus: builder.query({
      query: () => ({
        url: "/ai/status",
        python: true,
      }),
      providesTags: ["Chat"],
      pollingInterval: 30000, // Poll every 30 seconds
    }),

    // Submit user location and query
    submitUserLocation: builder.mutation({
      query: (payload) => ({
        url: "/icoRound/getUserLocation",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Location"],
      transformResponse: (response) => ({
        success: response.ok || false,
        address: response.address || "",
        message: response.message || "Location submitted successfully",
      }),
      transformErrorResponse: (response) => ({
        error: response.data?.error || "Failed to submit location",
        status: response.status,
      }),
    }),
  }),
});

export const {
  useSendChatMessageMutation,
  useGetChatSupportDataMutation,
  useInsertUserQueryMutation,
  useGetChatHistoryQuery,
  useDeleteChatConversationMutation,
  useGetAiStatusQuery,
  useSubmitUserLocationMutation,
} = chatApi;


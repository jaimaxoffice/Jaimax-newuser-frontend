import { apiSlice }    from "../../../../ApiSliceComponent/jaiMaxApi"

export const supportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    SupportData: builder.query({
      query: (queryParams) => ({
        url: `/support/get_tickets_list?${queryParams}`,
        method: "GET",
      }),
      providesTags:["getTicket"]
    }),
    CategoryGet: builder.query({
      query: (queryParams) => ({
        url: `/support/category_get`,
        method: "GET",
      }),
    }),
    createTicket: builder.mutation({
      query: (credentials) => ({
        url: "/support/create_ticket",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags:["getTicket"]
    }),
    ChatGet:builder.query({
      query:(queryParams)=>({
        url:`/support/comment_get/${queryParams}`,
        method:"GET"
      })
      ,providesTags:["getComment"]
    }),
    createComment: builder.mutation({
      query: (credentials) => ({
        url: "/support/comment_create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags:["getComment"]
    }),
    

  }),
});

export const {
  useSupportDataQuery,
  useCategoryGetQuery,
  useCreateTicketMutation,
  useChatGetQuery,
  useCreateCommentMutation,
} = supportApiSlice;

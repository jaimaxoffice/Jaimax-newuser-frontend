import { apiSlice } from "../../../../ApiSliceComponent/jaiMaxApi";


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/user/totalUsers",
                method: "GET",
            }),
            transformResponse: (response) => {
                return response;
            },

            providesTags: ["AllUsers"],
            keepUnusedDataFor: 300, // Cache for 5 minutes
        }),


        // getUsers: builder.query({
        //     query: ({ page = 1, limit = 10, chatId } = {}) => {
        //         const params = new URLSearchParams({
        //             page: page.toString(),
        //             limit: limit.toString(),
        //         });

        //         if (chatId) {
        //             params.append('chatId', chatId);
        //         }

        //         return {
        //             url: `/user/getAllUsers?${params.toString()}`,
        //             method: "GET",
        //         };
        //     },
        //     transformResponse: (response) => {

        //         const data = response?.data || {};

        //         return {
        //             users: data.users || [],
        //             pagination: {
        //                 currentPage: data.pagination?.currentPage || 1,
        //                 totalPages: data.pagination?.totalPages || 1,
        //                 totalUsers: data.pagination?.totalUsers || 0,
        //                 usersPerPage: data.pagination?.usersPerPage || 10,
        //                 hasMore: data.pagination?.hasMore || false,
        //                 nextPage: data.pagination?.nextPage || null,
        //                 prevPage: data.pagination?.prevPage || null,
        //                 maxUsersLimit: data.pagination?.maxUsersLimit || null
        //             }
        //         };
        //     },
        //     providesTags: (result, error, { page }) => [
        //         { type: "Users", id: `PAGE_${page}` },
        //         "Users"
        //     ],
        //     serializeQueryArgs: ({ queryArgs }) => {
        //         const { page = 1, chatId = 'default' } = queryArgs || {};
        //         return `users-${chatId}-page-${page}`;
        //     },
        //     keepUnusedDataFor: 60,
        // }),

        // getUsersLazy: builder.query({
        //     query: ({ page = 1, limit = 10, chatId } = {}) => {
        //         const params = new URLSearchParams({
        //             page: page.toString(),
        //             limit: limit.toString(),
        //         });

        //         if (chatId) {
        //             params.append('chatId', chatId);
        //         }

        //         return {
        //             url: `/user/getAllUsers?${params.toString()}`,
        //             method: "GET",
        //         };
        //     },
        //     transformResponse: (response) => {

        //         const data = response?.data || {};

        //         return {
        //             users: data.users || [],
        //             pagination: {
        //                 currentPage: data.pagination?.currentPage || 1,
        //                 totalPages: data.pagination?.totalPages || 1,
        //                 totalUsers: data.pagination?.totalUsers || 0,
        //                 usersPerPage: data.pagination?.usersPerPage || 10,
        //                 hasMore: data.pagination?.hasMore || false,
        //                 nextPage: data.pagination?.nextPage || null,
        //                 prevPage: data.pagination?.prevPage || null,
        //                 maxUsersLimit: data.pagination?.maxUsersLimit || null
        //             }
        //         };
        //     },
        //     keepUnusedDataFor: 0,
        // }),

       getChatFiles: builder.query({
            query: ({ chatId, userId }) => {
                console.log(chatId, userId, "chatId, userId");
                return {
                    url: `/chat/files?chatId=${chatId}`,
                    method: "POST",
                    body: { userId },
                };
            },
            transformResponse: (response) => {
                return response?.data || [];
            },
            providesTags: (result, error, { chatId }) => [
                { type: "ChatFiles", id: chatId }
            ],
        }),

        getChatHistory: builder.query({
            query: ({ chatId }) => ({
                url: `/chat/history?chatId=${chatId}`,
                method: "GET",
            }),
            transformResponse: (response) => {
                return response?.data || [];
            },
            providesTags: (result, error, { chatId }) => [
                { type: "ChatHistory", id: chatId }
            ],
        }),

        getGroups: builder.query({
            query: () => ({
                url: '/chat/getgroups',
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response?.data || [];
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((group) => ({ type: 'Groups', id: group.groupId })),
                        { type: 'Groups', id: 'LIST' }
                    ]
                    : [{ type: 'Groups', id: 'LIST' }],
        }),

        uploadFile: builder.mutation({
            query: (formData) => ({
                url: "/chat/fileupload",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response) => {
                return response?.data;
            },
            invalidatesTags: (result, error, formData) => {
                const chatId = formData.get('chatId');
                return [
                    { type: "ChatFiles", id: chatId },
                    { type: "Messages", id: chatId },
                ];
            },
        }),

        uploadAudio: builder.mutation({
            query: ({ audioBlob, chatId, senderId, senderName }) => {
                const formData = new FormData();
                const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, {
                    type: "audio/webm",
                });
                formData.append("file", audioFile);
                formData.append("chatId", chatId);
                formData.append("senderId", senderId);
                formData.append("senderName", senderName);

                return {
                    url: `/chat/fileupload`,
                    method: "POST",
                    body: formData,
                };
            },
            transformResponse: (response) => {
                return response?.data;
            },
            invalidatesTags: (result, error, { chatId }) => [
                { type: "ChatFiles", id: chatId },
                { type: "Messages", id: chatId },
            ],
        }),

        sendPublicKey: builder.mutation({
            query: ({ currentUser, publicKey, groupId }) => ({
                url: "/encrypt/savePublicKey",
                method: "POST",
                body: { currentUser, publicKey, groupId },
            }),
            transformResponse: (response) => {
                return response?.data;
            },
        }),

        getEncryptedGroupKey: builder.mutation({
            query: ({ username, groupId }) => ({
                url: "/encrypt/getEncryptedGroupKey",
                method: 'POST',
                body: { username, groupId },
            }),
            transformResponse: (response) => {
                return response.encryptedGroupKey;
            },
        }),

        reportMessage: builder.mutation({
            query: (reportData) => ({
                url: '/api/messages/report',
                method: 'POST',
                body: reportData,
            }),
            transformResponse: (response) => {
                return response?.data;
            },
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    // useLazyGetUsersQuery,
    useGetChatFilesQuery,
    useGetChatHistoryQuery,
    useGetGroupsQuery,
    useUploadFileMutation,
    useUploadAudioMutation,
    useSendPublicKeyMutation,
    useGetEncryptedGroupKeyMutation,
    useReportMessageMutation
} = chatApiSlice;




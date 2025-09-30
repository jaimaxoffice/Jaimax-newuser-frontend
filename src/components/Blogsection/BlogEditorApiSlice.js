import { apiSlice } from "../../ApiSliceComponent/jaiMaxApi";

export const publicBlogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated list of published posts
    getPublishedPosts: builder.query({
      query: (params) => ({
        url: "/blog/public/posts",
        method: "GET",
        params,
      }),
      providesTags: ["PublishedPosts"],
    }),

    // Get a single post by slug
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `/blog/public/posts/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) =>
        result ? [{ type: 'Post', id: slug }] : ['Post'],
    }),

    // Get featured posts for homepage
    getFeaturedPosts: builder.query({
      query: (limit = 5) => ({
        url: "/blog/public/posts/featured",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["FeaturedPosts"],
    }),

    // Get recent posts
    getRecentPosts: builder.query({
      query: (limit = 5) => ({
        url: "/blog/public/posts/recent",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["RecentPosts"],
    }),

    // Get all categories with post counts
    getCategories: builder.query({
      query: () => ({
        url: "/blog/public/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    // Get all tags with post counts
    getTags: builder.query({
      query: () => ({
        url: "/blog/public/tags",
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),

    // Get posts by category
    getPostsByCategory: builder.query({
      query: ({ category, page = 1, limit = 10 }) => ({
        url: "/blog/public/posts",
        method: "GET",
        params: { category, page, limit },
      }),
      providesTags: (result, error, { category }) =>
        result ? [{ type: 'CategoryPosts', id: category }] : ['CategoryPosts'],
    }),

    // Get posts by tag
    getPostsByTag: builder.query({
      query: ({ tag, page = 1, limit = 10 }) => ({
        url: "/blog/public/posts",
        method: "GET",
        params: { tag, page, limit },
      }),
      providesTags: (result, error, { tag }) =>
        result ? [{ type: 'TagPosts', id: tag }] : ['TagPosts'],
    }),

    // Search posts
    searchPosts: builder.query({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: "/blog/public/posts",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["SearchResults"],
    }),
    // Add this to your existing endpoints in publicBlogApiSlice
    getPostAnalytics: builder.query({
      query: (id) => ({
        url: `/blog/analytics/post/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) =>
        result ? [{ type: 'PostAnalytics', id }] : ['PostAnalytics'],

      // Optional: transform response if needed
      transformResponse: (response) => {
        // Ensure all percentage values exist to prevent errors in the UI
        if (response.data && response.data.metrics) {
          const metrics = response.data.metrics;

          // Ensure readCompletion percentages exist
          if (!metrics.readCompletion) {
            metrics.readCompletion = {
              _25percent: 0,
              _50percent: 0,
              _75percent: 0,
              _100percent: 0
            };
          }

          // Ensure deviceBreakdown percentages exist
          if (!metrics.deviceBreakdown) {
            metrics.deviceBreakdown = {
              mobile: 0,
              desktop: 0,
              tablet: 0
            };
          }

          // Ensure growth value exists
          if (metrics.viewsGrowth === undefined) {
            metrics.viewsGrowth = 0;
          }

          // Ensure other metrics exist
          metrics.likes = metrics.likes || 0;
          metrics.shares = metrics.shares || 0;
          metrics.views = metrics.views || 0;
          metrics.uniqueViews = metrics.uniqueViews || 0;
          metrics.comments = metrics.comments || 0;
          metrics.averageReadDuration = metrics.averageReadDuration || 0;
          metrics.engagementRate = metrics.engagementRate || 0;
          metrics.bounceRate = metrics.bounceRate || 0;
        }

        // Ensure recommendations array exists
        if (response.data && !response.data.recommendations) {
          response.data.recommendations = [];
        }

        // Ensure topReferrers array exists
        if (response.data && !response.data.topReferrers) {
          response.data.topReferrers = [];
        }

        return response;
      }
    }),
    updatePostAnalytics: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/analytics/posts/${id}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'PostAnalytics', id }]
    }),

    getBlogHistory: builder.query({
      query: () => ({
        url: "/blog/public/posts/history",
        method: "GET",
      }),
      transformResponse: (response) => {
        const blogsByYear = {};

        // Group blogs by year and month
        if (response.data && response.data.posts) {
          response.data.posts.forEach(post => {
            const date = new Date(post.publishedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (!blogsByYear[year]) {
              blogsByYear[year] = {};
            }

            if (!blogsByYear[year][month]) {
              blogsByYear[year][month] = [];
            }

            blogsByYear[year][month].push(post);
          });
        }

        return {
          ...response,
          data: {
            ...response.data,
            blogsByYear
          }
        };
      },
      providesTags: ["BlogHistory"],
    }),
  }),
});

export const {
  useGetPublishedPostsQuery,
  useGetPostBySlugQuery,
  useGetFeaturedPostsQuery,
  useGetRecentPostsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUpdatePostAnalyticsMutation,
  useGetPostsByCategoryQuery,
  useGetPostsByTagQuery,
  useSearchPostsQuery,
  useGetBlogHistoryQuery,
  useGetPostAnalyticsQuery,
} = publicBlogApiSlice;
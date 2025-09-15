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
  useGetPostsByCategoryQuery,
  useGetPostsByTagQuery,
  useSearchPostsQuery,
  useGetBlogHistoryQuery 
} = publicBlogApiSlice;
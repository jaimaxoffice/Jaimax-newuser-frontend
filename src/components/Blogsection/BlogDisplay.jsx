import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { 
  ChevronLeft, TrendingUp, Share2, Flame, Eye, ArrowRight, Calendar, 
  Search, Star, Filter, X, Copy, Check, Menu, Facebook, Twitter, 
  MessageCircle, Instagram, Tag
} from "lucide-react";
import { 
  useGetPublishedPostsQuery,
  useGetPostBySlugQuery,
  useGetFeaturedPostsQuery,
  useGetRecentPostsQuery,
  useGetCategoriesQuery,
  useGetTagsQuery
} from './BlogEditorApiSlice';

const BlogFrontend = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const isDetailView = !!slug;

  // States for blog listing
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeShareDropdown, setActiveShareDropdown] = useState(null);
  const [copiedPostId, setCopiedPostId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const shareRef = useRef(null);
  const searchInputRef = useRef(null);

  // Get query parameters for filtering
  const queryParams = {};
  if (activeCategory && activeCategory !== "All") {
    queryParams.category = activeCategory;
  }
  if (searchQuery) {
    queryParams.search = searchQuery;
  }

  // RTK Query hooks
  const { data: postsData, isLoading: postsLoading, error: postsError } = 
    useGetPublishedPostsQuery(queryParams);
  const { data: featuredData, isLoading: featuredLoading } = 
    useGetFeaturedPostsQuery(3);
  const { data: recentData, isLoading: recentLoading } = 
    useGetRecentPostsQuery(5);
  const { data: categoriesData, isLoading: categoriesLoading } = 
    useGetCategoriesQuery();
  const { data: tagsData } = useGetTagsQuery();
  const { data: postData, isLoading: postLoading, error: postError } = 
    useGetPostBySlugQuery(slug, { skip: !isDetailView });

  // Extract data from API responses
  const allPosts = postsData?.data?.posts || [];
  const filteredPosts = allPosts;
  const allCategories = ["All", ...(categoriesData?.data?.categories?.map(c => c.name) || [])];
  const currentPost = postData?.data?.post;
  const relatedPosts = postData?.data?.relatedPosts || [];
  const recentPosts = recentData?.data?.posts || [];

  // Helper function to slugify text
  const slugify = (str) =>
    str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      // Filter posts client-side for immediate feedback
      const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(value.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(value.toLowerCase()) ||
        post.categories?.some(cat => cat.toLowerCase().includes(value.toLowerCase()))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareDropdownOpen(false);
        setActiveShareDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle card click - navigate to detail
  const handleCardClick = (post) => {
    navigate(`/blog/${slugify(post.title)}`);
  };

  // Handle search result click
  const handleSearchResultClick = (post) => {
    navigate(`/blog/${slugify(post.title)}`);
    setSidebarOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle recent post click
  const handleRecentPostClick = (post) => {
    navigate(`/blog/${slugify(post.title)}`);
    setSidebarOpen(false);
  };

  // Share functionality
  const toggleShareDropdown = (postId) => {
    setActiveShareDropdown(activeShareDropdown === postId ? null : postId);
  };

  // Copy to clipboard
  const copyToClipboard = async (text, postId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2000);
      setActiveShareDropdown(null);
      setShareDropdownOpen(false);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Copy failed. Please copy the link manually: ' + text);
    }
  };

  // Share to social media
  const shareToSocial = (platform, post) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/blog/${slugify(post.title)}`;
    const text = post.title;
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: url // We'll copy the URL for Instagram
    };

    if (platform === 'instagram') {
      copyToClipboard(url, post.id);
      alert('Link copied! Please paste it in your Instagram story or bio.');
    } else {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
    
    setActiveShareDropdown(null);
    setShareDropdownOpen(false);
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Share options for detail view
  const shareOptions = currentPost ? [
    {
      name: 'Copy Link',
      icon: Copy,
      action: () => {
        const url = `${window.location.origin}/blog/${slug}`;
        copyToClipboard(url, currentPost.id);
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => shareToSocial('facebook', currentPost)
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => shareToSocial('twitter', currentPost)
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => shareToSocial('whatsapp', currentPost)
    },
    {
      name: 'Instagram',
      icon: Instagram,
      action: () => shareToSocial('instagram', currentPost)
    }
  ] : [];

  // Helper function to render content sections
  const renderContent = (contentSections) => {
    if (!contentSections || !Array.isArray(contentSections)) {
      return <p className="text-gray-300">No content available</p>;
    }
    
    return contentSections.map((section, index) => {
      switch (section.type) {
        case "paragraph":
          return (
            <p
              key={index}
              className="mb-4 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            ></p>
          );
        case "heading":
          return (
            <h2
              key={index}
              className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-3"
              dangerouslySetInnerHTML={{ __html: section.content }}
            ></h2>
          );
        case "unordered_list":
          return (
            <ul key={index} className="list-disc list-inside ml-3 sm:ml-5 mb-4 space-y-2">
              {section.content.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: item }}
                ></li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  // Loading state
  const isLoading = isDetailView 
    ? postLoading || recentLoading 
    : postsLoading || categoriesLoading || featuredLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  // Error state
  const error = isDetailView ? postError : postsError;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl text-red-400 mb-4">Error loading content</h2>
          <p className="text-gray-300">{error.message || "Please try again later"}</p>
          <button 
            onClick={() => navigate('/blog')}
            className="mt-6 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg"
          >
            Go to Blog Home
          </button>
        </div>
      </div>
    );
  }

  // Sidebar component for detail view
  const Sidebar = () => (
    <aside className="space-y-4 sm:space-y-6">
      {/* Search Box */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search all blogs..."
              className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm pr-8"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Recent Posts / Search Results */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-cyan-100 text-sm">
              {searchQuery ? `Search Results (${searchResults.length})` : 'Recent Posts'}
            </h3>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
            {searchQuery ? (
              // Show search results
              searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3" 
                  >
                    {result.coverImage && (
                      <img
                        src={result.coverImage}
                        alt={result.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" 
                      />
                    )}
                    <div className="flex flex-col flex-grow text-white text-xs">
                      <span className="line-clamp-2 text-left">{result.title}</span>
                      <span className="text-cyan-300/50 text-xs mt-1 line-clamp-1">{result.excerpt}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-cyan-300/60 text-sm text-center">No results found for "{searchQuery}"</p>
                </div>
              )
            ) : (
              // Show recent posts
              recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handleRecentPostClick(post)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3" 
                  >
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" 
                      />
                    )}
                    <div className="flex flex-col flex-grow text-white text-xs">
                      <span className="line-clamp-2 text-left">{post.title}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-cyan-300/60 text-sm">No recent posts available.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
        <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4 sm:p-5">
          <h3 className="font-semibold text-cyan-100 text-sm mb-4">
            Get in Touch
          </h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                className="w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </aside>
  );

  // BLOG DETAIL VIEW
  if (isDetailView && currentPost) {
    return (
      <div className="min-h-screen px-4 sm:px-6 py-4 sm:py-8">
        <div className="w-full mx-0">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              {sidebarOpen ? 'Close Menu' : 'Menu'}
            </button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            >
              <div 
                className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Sidebar />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <main className="lg:col-span-3">
              <article className="relative rounded-2xl p-4 sm:p-6 shadow-lg">
                {/* Back button */}
                <button
                  onClick={() => navigate('/blog')}
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Blog</span>
                </button>

                {/* Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {currentPost.title}
                </h1>

                {/* Image */}
                <div className="rounded-xl overflow-hidden mb-6">
                  <img
                    src={currentPost.coverImage}
                    alt={currentPost.title} 
                    className="w-full h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] object-fit mx-auto rounded-lg shadow-lg"
                  />
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white mb-6 border-b border-cyan-700/30 pb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{formatDate(currentPost.publishedAt)}</span>
                  </div>
                  
                  {currentPost.categories && currentPost.categories.map((category, idx) => (
                    <span 
                      key={idx}
                      className="inline-block px-2 sm:px-3 py-1 bg-cyan-800/50 rounded-full text-xs font-medium text-white"
                    >
                      {category}
                    </span>
                  ))}
                  
                  {/* Share Button with Dropdown */}
                  <div className="ml-auto relative" ref={shareRef}>
                    <button
                      onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                      className="rounded-full hover:bg-white/10 p-2 text-white transition-colors duration-200"
                      title="Share Post"
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    
                    {/* Share Dropdown */}
                    {shareDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 z-20 bg-gradient-to-br from-cyan-950/95 to-teal-950/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 min-w-48 shadow-xl">
                        {shareOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={option.action}
                            className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                          >
                            <option.icon className="w-4 h-4 text-cyan-400" />
                            <span className="text-white text-sm">{option.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Full Content */}
                <div className="prose prose-invert max-w-none text-white leading-relaxed">
                  {currentPost.content?.sections ? 
                    renderContent(currentPost.content.sections) : 
                    <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                  }
                </div>

                {/* Tags */}
                {currentPost.tags && currentPost.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-cyan-700/30">
                    <div className="flex flex-wrap gap-2">
                      {currentPost.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-800/30 rounded-full text-xs font-medium text-white"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold text-white mb-6">Related Articles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {relatedPosts.map(post => (
                        <div 
                          key={post.id}
                          className="group cursor-pointer"
                          onClick={() => handleCardClick(post)}
                        >
                          <div className="relative overflow-hidden rounded-xl mb-3">
                            {post.coverImage && (
                              <img 
                                src={post.coverImage} 
                                alt={post.title}
                                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </div>
                          <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">{post.title}</h4>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(post.publishedAt)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </main>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BLOG LISTING VIEW
  return (
    <div
      className="min-h-screen px-3 sm:px-6 py-4 sm:py-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
      }}
    >
      <div className="w-full mx-auto max-w-9xl">
        {/* Mobile Header */}
        <div className="block lg:hidden mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
                Our Blog
              </h1>
              <p className="text-white text-sm">
                Latest insights and updates from our team
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-teal-300/80 text-sm">
                {filteredPosts.length} articles
              </p>
              <p className="text-teal-400/60 text-xs">Updated daily</p>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="relative group mb-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search insights..."
                  className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm pr-8"
                />
                <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 rounded-xl border border-cyan-400/40 text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            Categories
            {activeCategory !== "All" && (
              <span className="bg-cyan-400/30 px-2 py-1 rounded-full text-xs">
                {activeCategory}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-cyan-950/95 to-teal-950/90 backdrop-blur-xl rounded-t-3xl border-t border-cyan-400/30 p-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-cyan-100 text-lg">Categories</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowMobileFilters(false);
                    }}
                    className={`text-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40"
                        : "text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10 border border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search insights..."
                    className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm pr-8"
                  />
                  <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
                </div>
                <div className="space-y-1">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat
                          ? "bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40"
                          : "text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
                    Our Blog
                  </h1>
                  <p className="text-white text-sm">
                    Latest insights and updates from our team
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <p className="text-teal-300/80 text-sm">
                    {filteredPosts.length} articles
                  </p>
                  <p className="text-teal-400/60 text-xs">Updated daily</p>
                </div>
              </div>
            </div>

            {/* Featured Posts Section */}
            {!searchQuery && activeCategory === "All" && featuredData?.data?.posts?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-white mb-4">Featured Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredData.data.posts.slice(0, 2).map(post => (
                    <div 
                      key={post.id}
                      className="group cursor-pointer rounded-xl overflow-hidden relative"
                      onClick={() => handleCardClick(post)}
                    >
                      {post.coverImage && (
                        <div className="relative h-60">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 rounded-full text-xs font-medium text-white border border-cyan-400/50">
                                <Star className="w-3 h-3" />
                                <span>Featured</span>
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-1">
                              {post.title}
                            </h3>
                            <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-teal-400/80">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishedAt)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {filteredPosts.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group relative h-full w-full"
                  >
                    {/* Glow Effect */}
                    <div
                      className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
                      }}
                    />
                    
                    {/* Card */}
                    <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
                      {/* Image */}
                      <div
                        className="relative aspect-video overflow-hidden cursor-pointer"
                        onClick={() => handleCardClick(post)}
                      >
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1 sm:gap-2">
                          {post.trending && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 rounded-full text-xs font-medium text-white border border-teal-400/50">
                              <TrendingUp className="w-3 h-3" />
                              <span className="hidden sm:inline">Trending</span>
                            </span>
                          )}
                          {post.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 rounded-full text-xs font-medium text-white border border-cyan-400/50">
                              <Star className="w-3 h-3" />
                              <span className="hidden sm:inline">Featured</span>
                            </span>
                          )}
                          {post.hot && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 rounded-full text-xs font-medium text-white border border-teal-400/50">
                              <Flame className="w-3 h-3" />
                              <span className="hidden sm:inline">Hot</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <div className="flex items-center mb-3 justify-end">
                          <div className="flex items-center gap-1 text-xs text-teal-400/80">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>

                        <h3
                          className="font-bold text-base sm:text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 cursor-pointer leading-tight"
                          onClick={() => handleCardClick(post)}
                        >
                          {post.title}
                        </h3>

                        <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
                          <button
                            onClick={() => handleCardClick(post)}
                            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          
                          {/* Share Dropdown */}
                          <div className="relative" ref={shareRef}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleShareDropdown(post.id);
                              }}
                              className="rounded-lg hover:bg-white/20 p-2 text-white transition-colors duration-300"
                            >
                              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            
                            {/* Dropdown Menu */}
                            {activeShareDropdown === post.id && (
                              <div className="absolute bottom-full right-0 mb-2 w-48 bg-gradient-to-br from-slate-900/95 to-gray-900/95 backdrop-blur-xl rounded-xl border border-cyan-400/30 shadow-2xl z-50">
                                <div className="p-2">
                                  {/* Copy Link */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const url = `${window.location.origin}/blog/${slugify(post.title)}`;
                                      copyToClipboard(url, post.id);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                                  >
                                    {copiedPostId === post.id ? (
                                      <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                    <span>{copiedPostId === post.id ? 'Copied!' : 'Copy Link'}</span>
                                  </button>
                                  
                                  {/* WhatsApp */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      shareToSocial('whatsapp', post);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                                  >
                                    <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">💬</span>
                                    </div>
                                    <span>WhatsApp</span>
                                  </button>
                                  
                                  {/* Facebook */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      shareToSocial('facebook', post);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                                  >
                                    <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                                      <span className="text-white text-xs font-bold">f</span>
                                    </div>
                                    <span>Facebook</span>
                                  </button>
                                  
                                  {/* Twitter */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      shareToSocial('twitter', post);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                                  >
                                    <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center border border-gray-600">
                                      <span className="text-white text-xs font-bold">𝕏</span>
                                    </div>
                                    <span>Twitter</span>
                                  </button>
                                  
                                  {/* Instagram */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      shareToSocial('instagram', post);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-colors duration-200"
                                  >
                                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm flex items-center justify-center">
                                      <span className="text-white text-xs">📷</span>
                                    </div>
                                    <span>Instagram</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl text-cyan-400 mb-2">No articles found</h3>
                <p className="text-cyan-300/60">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}

            {/* Pagination */}
            {postsData?.data?.pagination && postsData.data.pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  {Array.from({ length: postsData.data.pagination.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => navigate(`/blog?page=${page}${activeCategory !== 'All' ? `&category=${activeCategory}` : ''}`)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        postsData.data.pagination.currentPage === page
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogFrontend;
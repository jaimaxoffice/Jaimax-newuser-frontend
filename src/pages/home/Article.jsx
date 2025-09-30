import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, TrendingUp, Calendar, Eye, Share2, Menu, X, Copy, Facebook, MessageCircle, Instagram, Twitter } from "lucide-react";
import { blogsData } from "./blog";

const slugify = (str) =>
  str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const shareRef = useRef(null);
  const searchInputRef = useRef(null);
  const maxRecentPostsHeight = 400; // Maximum height for recent posts container

  useEffect(() => {
    // Find the post based on the slug
    const foundPost = blogsData.find((b) => slugify(b.headline) === slug);
    if (foundPost) {
      setPost(foundPost);
      // Filter out the current post from recent posts
      const otherPosts = blogsData.filter((b) => b.id !== foundPost.id);

      // Get the most recent posts
      setRecentPosts(otherPosts.sort((a, b) => {
        const dateA = new Date(a.date.includes(" ") ? a.date.replace(/(\d{2}) (\w+) (\d{2})/g, "20$3-$2-$1") : a.date);
        const dateB = new Date(b.date.includes(" ") ? b.date.replace(/(\d{2}) (\w+) (\d{2})/g, "20$3-$2-$1") : b.date);
        return dateB - dateA;
      }));
    } else {
      navigate("/blog");
    }
  }, [slug, navigate]);

  // Search functionality
  useEffect(() => {
    // This effect is now handled in handleSearchInputChange for better performance
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRecentPostClick = (recentPost) => {
    navigate(`/blog/${slugify(recentPost.headline)}`);
    setSidebarOpen(false);
  };

  const handleSearchResultClick = (searchPost) => {
    navigate(`/blog/${slugify(searchPost.headline)}`);
    setSidebarOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const filtered = blogsData.filter(blog =>
        blog.headline.toLowerCase().includes(value.toLowerCase()) ||
        blog.description.toLowerCase().includes(value.toLowerCase()) ||
        (blog.category && blog.category.toLowerCase().includes(value.toLowerCase()))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      action: () => {
        const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
        navigator.clipboard.writeText(url).then(() => {
          alert("Link copied to clipboard!");
          setShareDropdownOpen(false);
        });
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        setShareDropdownOpen(false);
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
        const text = post.headline;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        setShareDropdownOpen(false);
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      action: () => {
        const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
        const text = `Check out this blog post: ${post.headline}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        setShareDropdownOpen(false);
      }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      action: () => {
        // Instagram doesn't have direct sharing URL, so copy link instead
        const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
        navigator.clipboard.writeText(url).then(() => {
          alert("Link copied! You can paste it in your Instagram story or bio.");
          setShareDropdownOpen(false);
        });
      }
    }
  ];

  // Helper function to render content sections
  const renderContent = (contentSections) => {
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  // Determine the display date for the current post
  const displayDate = post.date.includes(" ") ?
                      new Date(post.date.replace(/(\d{2}) (\w+) (\d{2})/g, "20$3-$2-$1")).toLocaleDateString() :
                      new Date(post.date).toLocaleDateString();

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
                    {result.image && (
                      <img
                        src={result.image}
                        alt={result.headline}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex flex-col flex-grow text-white text-xs">
                      <span className="line-clamp-2 text-left">{result.headline}</span>
                      <span className="text-cyan-300/50 text-xs mt-1 line-clamp-1">{result.description}</span>
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
                recentPosts.map((rp) => (
                  <button
                    key={rp.id}
                    onClick={() => handleRecentPostClick(rp)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3"
                  >
                    {rp.image && (
                      <img
                        src={rp.image}
                        alt={rp.headline}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex flex-col flex-grow text-white text-xs">
                      <span className="line-clamp-2 text-left">{rp.headline}</span>
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
              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {post.headline}
              </h1>

              {/* Image */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={post.image}
                  alt={post.imageAlt || post.headline}
                  className="w-full h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] object-fit mx-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white mb-6 border-b border-cyan-700/30 pb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{displayDate}</span>
                </div>

                {post.category && (
                  <span className="inline-block px-2 sm:px-3 py-1 bg-cyan-800/50 rounded-full text-xs font-medium text-white">
                    {post.category}
                  </span>
                )}

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

              {/* Full Information/Content */}
              <div className="prose prose-invert max-w-none text-white leading-relaxed">
                {post.content && post.content.sections && renderContent(post.content.sections)}
              </div>
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
};

export default BlogPostDetail;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Search,
//   TrendingUp,
//   Calendar,
//   Eye,
//   Share2,
//   Menu,
//   X,
//   Copy,
//   Facebook,
//   MessageCircle,
//   Instagram,
//   Twitter,
//   Star,
//   ArrowRight
// } from "lucide-react";
// import { useGetPostBySlugQuery, useGetRecentPostsQuery, useSearchPostsQuery } from "../../components/Blogsection/BlogEditorApiSlice";

// const slugify = (str) =>
//   str ? str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") : "";

// const BlogPostDetail = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   // Use RTK Query hooks
//   const {
//     data: postData,
//     isLoading: isPostLoading,
//     error: postError
//   } = useGetPostBySlugQuery(slug, {
//     skip: !slug
//   });

//   const {
//     data: recentPostsData,
//     isLoading: isRecentPostsLoading
//   } = useGetRecentPostsQuery(5, {
//     skip: !slug
//   });
// // console.log(postData.data.post.content,"post data")
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [formErrors, setFormErrors] = useState({});

//   // Use search API instead of local filtering
//   const {
//     data: searchResults,
//     isLoading: isSearchLoading
//   } = useSearchPostsQuery({
//     search: searchQuery,
//     limit: 5
//   }, { skip: searchQuery.length < 3 });

//   const shareRef = useRef(null);
//   const searchInputRef = useRef(null);

//   // Redirect to blog list if post not found
//   useEffect(() => {
//     if (!isPostLoading && postError) {
//       navigate("/blog");
//     }
//   }, [isPostLoading, postError, navigate]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (shareRef.current && !shareRef.current.contains(event.target)) {
//         setShareDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleRecentPostClick = (recentPost) => {
//     navigate(`/blog/${recentPost.slug || slugify(recentPost.title)}`);
//     setSidebarOpen(false);
//   };

//   const handleSearchResultClick = (searchPost) => {
//     navigate(`/blog/${searchPost.slug || slugify(searchPost.title)}`);
//     setSidebarOpen(false);
//     setSearchQuery("");
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Form handling
//   const handleFormChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));

//     // Clear error when user types
//     if (formErrors[id]) {
//       setFormErrors(prev => ({ ...prev, [id]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!formData.message.trim()) errors.message = "Message is required";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Here you would add API call to submit the form
//       alert("Thank you for your message! We'll get back to you soon.");
//       setFormData({ name: '', email: '', message: '' });
//     }
//   };

//   // Format post date
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     let date;

//     // Handle different date formats
//     if (typeof dateString === 'object' && dateString.$date) {
//       date = new Date(dateString.$date);
//     } else {
//       date = new Date(dateString);
//     }

//     return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
//   };

//   // Helper function to parse and render content
//   const renderContent = (post) => {
//     if (!post) return null;

//     // Check if post has content property and it's a string (HTML)
//     if (post.content) {
//       if (typeof post.content === 'string') {
//         return <div dangerouslySetInnerHTML={{ __html: post.content }}></div>;
//       } else if (post.content.sections) {
//         // If post has structured content with sections
//         return post.content.sections.map((section, index) => {
//           switch (section.type) {
//             case "paragraph":
//               return (
//                 <p
//                   key={index}
//                   className="mb-4 text-sm sm:text-base leading-relaxed"
//                   dangerouslySetInnerHTML={{ __html: section.content }}
//                 ></p>
//               );
//             case "heading":
//               return (
//                 <h2
//                   key={index}
//                   className="text-xl sm:text-2xl font-semibold text-white mt-6 mb-3"
//                   dangerouslySetInnerHTML={{ __html: section.content }}
//                 ></h2>
//               );
//             case "unordered_list":
//               return (
//                 <ul key={index} className="list-disc list-inside ml-3 sm:ml-5 mb-4 space-y-2">
//                   {section.content.map((item, itemIndex) => (
//                     <li
//                       key={itemIndex}
//                       className="text-sm sm:text-base"
//                       dangerouslySetInnerHTML={{ __html: item }}
//                     ></li>
//                   ))}
//                 </ul>
//               );
//             default:
//               return null;
//           }
//         });
//       }
//     }

//     // If no content is available, show excerpt/description
//     return <p className="mb-4">{post.content || post.content || "No content available."}</p>;
//   };

//   // Loading state
//   if (isPostLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white px-4"
//            style={{
//              background: "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)"
//            }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
//           <p className="text-lg">Loading post...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (postError || !postData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white px-4"
//            style={{
//              background: "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)"
//            }}>
//         <div className="text-center bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-red-400/30 p-8 max-w-md">
//           <div className="text-red-400 mb-4">
//             <X className="w-16 h-16 mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
//           <p className="text-gray-300 mb-6">
//             The blog post you're looking for couldn't be found or may have been removed.
//           </p>
//           <button
//             onClick={() => navigate('/blog')}
//             className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-colors"
//           >
//             Return to Blog
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Get post data
//   const post = postData.data.post;
//   console.log(post,"level2")
//   const postTitle = post.title || "";
//   const postDate = formatDate(post.publishedAt || post.createdAt?.$date || post.date);
//   const postImage = post.coverImage || post.meta?.ogImage || post.image;
//   const postViews = post.views || post.analytics?.views || 0;
//   const postCategory = post.categories?.[0] || post.category || "";
//   const postTags = post.tags || [];

//   // Create share options with the actual post data
//   const shareOptions = [
//     {
//       name: 'Copy Link',
//       icon: Copy,
//       action: () => {
//         const url = `${window.location.origin}/blog/${post.slug || slugify(post.title)}`;
//         navigator.clipboard.writeText(url).then(() => {
//           alert("Link copied to clipboard!");
//           setShareDropdownOpen(false);
//         });
//       }
//     },
//     {
//       name: 'Facebook',
//       icon: Facebook,
//       action: () => {
//         const url = `${window.location.origin}/blog/${post.slug || slugify(post.title)}`;
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
//         setShareDropdownOpen(false);
//       }
//     },
//     {
//       name: 'Twitter',
//       icon: Twitter,
//       action: () => {
//         const url = `${window.location.origin}/blog/${post.slug || slugify(post.title)}`;
//         const text = post.title;
//         window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
//         setShareDropdownOpen(false);
//       }
//     },
//     {
//       name: 'WhatsApp',
//       icon: MessageCircle,
//       action: () => {
//         const url = `${window.location.origin}/blog/${post.slug || slugify(post.title)}`;
//         const text = `Check out this blog post: ${post.title}`;
//         window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
//         setShareDropdownOpen(false);
//       }
//     },
//     {
//       name: 'Instagram',
//       icon: Instagram,
//       action: () => {
//         // Instagram doesn't have direct sharing URL, so copy link instead
//         const url = `${window.location.origin}/blog/${post.slug || slugify(post.title)}`;
//         navigator.clipboard.writeText(url).then(() => {
//           alert("Link copied! You can paste it in your Instagram story or bio.");
//           setShareDropdownOpen(false);
//         });
//       }
//     }
//   ];

//   const Sidebar = () => (
//     <aside className="space-y-4 sm:space-y-6">
//       {/* Search Box */}
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//         <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//           <div className="relative">
//             <input
//               ref={searchInputRef}
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//               placeholder="Search all blogs..."
//               className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm pr-8"
//             />
//             <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
//           </div>
//         </div>
//       </div>

//       {/* Recent Posts / Search Results */}
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//         <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4 sm:p-5">
//           <div className="flex items-center gap-2 mb-4">
//             <TrendingUp className="w-4 h-4 text-cyan-400" />
//             <h3 className="font-semibold text-cyan-100 text-sm">
//               {searchQuery.length >= 3 ? `Search Results` : 'Recent Posts'}
//             </h3>
//           </div>

//           <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
//             {searchQuery.length >= 3 ? (
//               // Show search results
//               isSearchLoading ? (
//                 <div className="flex flex-col space-y-3">
//                   {[...Array(3)].map((_, i) => (
//                     <div key={i} className="animate-pulse flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full bg-cyan-800/30"></div>
//                       <div className="flex-1">
//                         <div className="h-4 bg-cyan-800/30 rounded w-3/4 mb-2"></div>
//                         <div className="h-3 bg-cyan-800/20 rounded w-1/2"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : searchResults?.data?.posts?.length > 0 ? (
//                 searchResults.data.posts.map((result) => {
//                   const resultTitle = result.title || "";
//                   const resultDescription = result.excerpt || result.description || "";
//                   const resultImage = result.coverImage || result.meta?.ogImage || result.image;
//                   const resultId = result._id?.$oid || result.id || result.slug;

//                   return (
//                     <button
//                       key={resultId}
//                       onClick={() => handleSearchResultClick(result)}
//                       className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3"
//                     >
//                       {resultImage ? (
//                         <img
//                           src={resultImage}
//                           alt={resultTitle}
//                           className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-800/30 flex-shrink-0 flex items-center justify-center">
//                           <Star className="w-5 h-5 text-cyan-400/50" />
//                         </div>
//                       )}
//                       <div className="flex flex-col flex-grow text-white text-xs">
//                         <span className="line-clamp-2 text-left">{resultTitle}</span>
//                         <span className="text-cyan-300/50 text-xs mt-1 line-clamp-1">{resultDescription}</span>
//                       </div>
//                     </button>
//                   );
//                 })
//               ) : (
//                 <div className="flex items-center justify-center h-32">
//                   <p className="text-cyan-300/60 text-sm text-center">No results found for "{searchQuery}"</p>
//                 </div>
//               )
//             ) : (
//               // Show recent posts
//               isRecentPostsLoading ? (
//                 <div className="flex flex-col space-y-3">
//                   {[...Array(3)].map((_, i) => (
//                     <div key={i} className="animate-pulse flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full bg-cyan-800/30"></div>
//                       <div className="flex-1">
//                         <div className="h-4 bg-cyan-800/30 rounded w-3/4"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : recentPostsData?.length > 0 ? (
//                 recentPostsData.map((rp) => {
//                   const rpTitle = rp.title || "";
//                   const rpImage = rp.coverImage || rp.meta?.ogImage || rp.image;
//                   const rpId = rp._id?.$oid || rp.id || rp.slug;

//                   return (
//                     <button
//                       key={rpId}
//                       onClick={() => handleRecentPostClick(rp)}
//                       className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3"
//                     >
//                       {rpImage ? (
//                         <img
//                           src={rpImage}
//                           alt={rpTitle}
//                           className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-800/30 flex-shrink-0 flex items-center justify-center">
//                           <Star className="w-5 h-5 text-cyan-400/50" />
//                         </div>
//                       )}
//                       <div className="flex flex-col flex-grow text-white text-xs">
//                         <span className="line-clamp-2 text-left">{rpTitle}</span>
//                       </div>
//                     </button>
//                   );
//                 })
//               ) : (
//                 <div className="flex items-center justify-center h-32">
//                   <p className="text-cyan-300/60 text-sm">No recent posts available.</p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Contact Form */}
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//         <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4 sm:p-5">
//           <h3 className="font-semibold text-cyan-100 text-sm mb-4">
//             Get in Touch
//           </h3>
//           <form className="space-y-4" onSubmit={handleFormSubmit}>
//             <div>
//               <label htmlFor="name" className="sr-only">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 placeholder="Your Name"
//                 className={`w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm ${formErrors.name ? 'border border-red-500' : ''}`}
//               />
//               {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
//             </div>
//             <div>
//               <label htmlFor="email" className="sr-only">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleFormChange}
//                 placeholder="Your Email"
//                 className={`w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm ${formErrors.email ? 'border border-red-500' : ''}`}
//               />
//               {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
//             </div>
//             <div>
//               <label htmlFor="message" className="sr-only">Message</label>
//               <textarea
//                 id="message"
//                 rows="4"
//                 value={formData.message}
//                 onChange={handleFormChange}
//                 placeholder="Your Message"
//                 className={`w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm resize-none ${formErrors.message ? 'border border-red-500' : ''}`}
//               ></textarea>
//               {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </aside>
//   );

//   return (
//     <div className="min-h-screen px-4 sm:px-6 py-4 sm:py-8"
//          style={{
//            background: "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)"
//          }}>
//       <div className="w-full mx-auto max-w-screen">
//         {/* Mobile Sidebar Toggle */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
//           >
//             {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
//             {sidebarOpen ? 'Close Menu' : 'Menu'}
//           </button>
//         </div>

//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div
//             className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <div
//               className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto p-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-semibold text-white">Menu</h2>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//               <Sidebar />
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
//           <main className="lg:col-span-3">
//             <article className="relative rounded-2xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl border border-cyan-400/20">
//               {/* Back button */}
//               <button
//                 onClick={() => navigate('/blog')}
//                 className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mb-4 transition-colors"
//               >
//                 <ArrowRight className="w-4 h-4 transform rotate-180" />
//                 Back to all posts
//               </button>

//               {/* Headline */}
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
//                 {postTitle}
//               </h1>

//               {/* Image */}
//               {postImage && (
//                 <div className="rounded-xl overflow-hidden mb-6">
//                   <img
//                     src={postImage}
//                     alt={postTitle}
//                     className="w-full h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] object-cover mx-auto rounded-lg shadow-lg"
//                     loading="lazy"
//                   />
//                 </div>
//               )}

//               {/* Meta Info */}
//               <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white mb-6 border-b border-cyan-700/30 pb-4">
//                 {postDate && (
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>{postDate}</span>
//                   </div>
//                 )}

//                 {postCategory && (
//                   <span className="inline-block px-2 sm:px-3 py-1 bg-cyan-800/50 rounded-full text-xs font-medium text-white">
//                     {postCategory}
//                   </span>
//                 )}

//                 {postViews > 0 && (
//                   <div className="flex items-center gap-1">
//                     <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>{postViews} views</span>
//                   </div>
//                 )}

//                 {/* Share Button with Dropdown */}
//                 <div className="ml-auto relative" ref={shareRef}>
//                   <button
//                     onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
//                     className="rounded-full hover:bg-white/10 p-2 text-white transition-colors duration-200"
//                     title="Share Post"
//                   >
//                     <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>

//                   {/* Share Dropdown */}
//                   {shareDropdownOpen && (
//                     <div className="absolute right-0 top-full mt-2 z-20 bg-gradient-to-br from-cyan-950/95 to-teal-950/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 min-w-48 shadow-xl">
//                       {shareOptions.map((option, index) => (
//                         <button
//                           key={index}
//                           onClick={option.action}
//                           className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
//                         >
//                           <option.icon className="w-4 h-4 text-cyan-400" />
//                           <span className="text-white text-sm">{option.name}</span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Full Information/Content */}
//               <div className="prose prose-invert max-w-none text-white leading-relaxed">
//                 {renderContent(post)}
//               </div>

//               {/* Related tags if available */}
//               {postTags && postTags.length > 0 && (
//                 <div className="mt-8 pt-4 border-t border-cyan-700/30">
//                   <h3 className="text-sm font-medium text-white mb-3">Related Topics</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {postTags.map((tag, index) => (
//                       <span key={index} className="px-3 py-1 text-xs bg-cyan-800/30 text-cyan-300 rounded-full">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </article>
//           </main>

//           {/* Desktop Sidebar */}
//           <div className="hidden lg:block lg:col-span-1">
//             <div className="sticky top-4">
//               <Sidebar />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostDetail;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import DOMPurify from "dompurify"; // Add this import for sanitization
// import {
//   Search,
//   TrendingUp,
//   Calendar,
//   Eye,
//   Share2,
//   Menu,
//   X,
//   Copy,
//   Facebook,
//   MessageCircle,
//   Instagram,
//   Twitter,
//   Star,
//   ArrowRight,
// } from "lucide-react";
// import {
//   useGetPostBySlugQuery,
//   useGetRecentPostsQuery,
//   useSearchPostsQuery,
// } from "../../components/Blogsection/BlogEditorApiSlice";

// const slugify = (str) =>
//   str
//     ? str
//         .toLowerCase()
//         .replace(/ /g, "-")
//         .replace(/[^\w-]/g, "")
//     : "";

// const BlogPostDetail = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   // Use RTK Query hooks
//   const {
//     data: postData,
//     isLoading: isPostLoading,
//     error: postError,
//   } = useGetPostBySlugQuery(slug, {
//     skip: !slug,
//   });

//   const { data: recentPostsData, isLoading: isRecentPostsLoading } =
//     useGetRecentPostsQuery(5, {
//       skip: !slug,
//     });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [formErrors, setFormErrors] = useState({});

//   // Use search API instead of local filtering
//   const { data: searchResults, isLoading: isSearchLoading } =
//     useSearchPostsQuery(
//       {
//         search: searchQuery,
//         limit: 5,
//       },
//       { skip: searchQuery.length < 3 }
//     );

//   const shareRef = useRef(null);
//   const searchInputRef = useRef(null);

//   // Redirect to blog list if post not found
//   useEffect(() => {
//     if (!isPostLoading && postError) {
//       navigate("/blog");
//     }
//   }, [isPostLoading, postError, navigate]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (shareRef.current && !shareRef.current.contains(event.target)) {
//         setShareDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleRecentPostClick = (recentPost) => {
//     navigate(`/blog/${recentPost.slug || slugify(recentPost.title)}`);
//     setSidebarOpen(false);
//   };

//   const handleSearchResultClick = (searchPost) => {
//     navigate(`/blog/${searchPost.slug || slugify(searchPost.title)}`);
//     setSidebarOpen(false);
//     setSearchQuery("");
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Form handling
//   const handleFormChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));

//     // Clear error when user types
//     if (formErrors[id]) {
//       setFormErrors((prev) => ({ ...prev, [id]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!formData.message.trim()) errors.message = "Message is required";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // Here you would add API call to submit the form
//       alert("Thank you for your message! We'll get back to you soon.");
//       setFormData({ name: "", email: "", message: "" });
//     }
//   };

//   // Format post date
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     let date;

//     // Handle different date formats
//     if (typeof dateString === "object" && dateString.$date) {
//       date = new Date(dateString.$date);
//     } else {
//       date = new Date(dateString);
//     }

//     return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
//   };

//   // Helper function to sanitize and render content
//   // Import Poppins font in your component or in your global CSS
//   useEffect(() => {
//     // Add Poppins font if not already in your project
//     const fontLink = document.createElement("link");
//     fontLink.href =
//       "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
//     fontLink.rel = "stylesheet";
//     document.head.appendChild(fontLink);

//     const styleElement = document.createElement("style");
//     styleElement.textContent = `
//     .blog-content {
//       font-family: 'Poppins', sans-serif;
//       color: rgba(255, 255, 255, 0.9);
//       line-height: 1.8;
//       font-weight: 300;
//     }
    
//     .blog-content h1, .blog-content h2, .blog-content h3, 
//     .blog-content h4, .blog-content h5, .blog-content h6 {
//       font-family: 'Poppins', sans-serif;
//       font-weight: 600;
//       line-height: 1.3;
//       margin-top: 2rem;
//       margin-bottom: 1rem;
//       color: white;
//     }
    
//     .blog-content h1 { font-size: 2.25rem; }
//     .blog-content h2 { font-size: 1.75rem; color: #22d3ee; }
//     .blog-content h3 { font-size: 1.5rem; color: #22d3ee; }
//     .blog-content h4 { font-size: 1.25rem; }
    
//     .blog-content p {
//       margin-bottom: 1.5rem;
//       font-size: 1rem;
//       letter-spacing: 0.015em;
//     }
    
//     .blog-content ul, .blog-content ol {
//       margin-left: 1.75rem;
//       margin-bottom: 1.5rem;
//     }
    
//     .blog-content li {
//       margin-bottom: 0.75rem;
//       position: relative;
//     }
    
//     .blog-content ul li::before {
//       content: '•';
//       color: #22d3ee;
//       position: absolute;
//       left: -1.25rem;
//     }
    
//     .blog-content a {
//       color: #22d3ee;
//       text-decoration: none;
//       border-bottom: 1px dotted #22d3ee;
//       transition: all 0.2s ease;
//     }
    
//     .blog-content a:hover {
//       border-bottom: 1px solid #22d3ee;
//     }
    
//     .blog-content strong, .blog-content b {
//       font-weight: 600;
//       color: white;
//     }
    
//     .blog-content em, .blog-content i {
//       font-style: italic;
//     }
    
//     .blog-content table {
//       width: 100%;
//       border-collapse: collapse;
//       margin-bottom: 2rem;
//       border-radius: 0.5rem;
//       overflow: hidden;
//     }
    
//     .blog-content table td, .blog-content table th {
//       border: 1px solid rgba(55, 65, 81, 0.5);
//       padding: 0.75rem 1rem;
//       font-size: 0.95rem;
//     }
    
//     .blog-content table th {
//       background-color: rgba(15, 23, 42, 0.8);
//       font-weight: 500;
//       text-align: left;
//       color: white;
//     }
    
//     .blog-content table tr:nth-child(even) {
//       background-color: rgba(15, 23, 42, 0.4);
//     }
    
//     .blog-content table tr:hover {
//       background-color: rgba(34, 211, 238, 0.1);
//     }
    
//     .blog-content blockquote {
//       border-left: 4px solid #22d3ee;
//       padding-left: 1.5rem;
//       margin-left: 0;
//       margin-right: 0;
//       margin-bottom: 1.5rem;
//       font-style: italic;
//       color: rgba(255, 255, 255, 0.8);
//     }
    
//     .blog-content hr {
//       border: 0;
//       height: 1px;
//       background: rgba(255, 255, 255, 0.2);
//       margin: 2rem 0;
//     }
    
//     .blog-content img {
//       max-width: 100%;
//       border-radius: 0.5rem;
//       margin: 1.5rem 0;
//     }
//   `;
//     document.head.appendChild(styleElement);

//     return () => {
//       document.head.removeChild(styleElement);
//       document.head.removeChild(fontLink);
//     };
//   }, []);
//   const renderContent = (post) => {
//     // Add custom styles with Poppins font

//     if (!post) return null;

//     // Check if post has content property
//     if (post.content) {
//       // If content is a string (HTML), sanitize and render it
//       if (typeof post.content === "string") {
//         const sanitizedContent = DOMPurify.sanitize(post.content, {
//           ADD_TAGS: [
//             "table",
//             "thead",
//             "tbody",
//             "tr",
//             "td",
//             "th",
//             "h1",
//             "h2",
//             "h3",
//           ],
//           ALLOW_TAGS: [
//             "table",
//             "thead",
//             "tbody",
//             "tr",
//             "td",
//             "th",
//             "h1",
//             "h2",
//             "h3",
//             "p",
//             "a",
//             "ul",
//             "ol",
//             "li",
//             "br",
//             "strong",
//             "em",
//             "span",
//             "img",
//             "blockquote",
//             "hr",
//             "div",
//           ],
//         });

//         return (
//           <div
//             className="blog-content prose prose-invert max-w-none"
//             dangerouslySetInnerHTML={{ __html: sanitizedContent }}
//           />
//         );
//       }
//     }

//     // If no content is available, show excerpt/description
//     return (
//       <p className="mb-4 font-poppins">
//         {post.excerpt || post.description || "No content available."}
//       </p>
//     );
//   };

//   // Loading state
//   if (isPostLoading) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center text-white px-4"
//         style={{
//           background:
//             "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
//         }}
//       >
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
//           <p className="text-lg">Loading post...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (postError || !postData) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center text-white px-4"
//         style={{
//           background:
//             "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
//         }}
//       >
//         <div className="text-center bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-red-400/30 p-8 max-w-md">
//           <div className="text-red-400 mb-4">
//             <X className="w-16 h-16 mx-auto" />
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
//           <p className="text-gray-300 mb-6">
//             The blog post you're looking for couldn't be found or may have been
//             removed.
//           </p>
//           <button
//             onClick={() => navigate("/blog")}
//             className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-colors"
//           >
//             Return to Blog
//           </button>
//         </div>
//       </div>
//     );
//   }
//   // Get post data
//   const post = postData.data.post;
//   const postTitle = post.title || "";
//   const postDate = formatDate(
//     post.publishedAt || post.createdAt?.$date || post.date
//   );
//   console.log(post.coverImage,"hello")
//   const postImage = post.coverImage;

//   const postViews = post.views || post.analytics?.views || 0;
//   const postCategory = post.categories?.[0] || post.category || "";
//   const postTags = post.tags || [];

//   // Create share options with the actual post data
//   const shareOptions = [
//     {
//       name: "Copy Link",
//       icon: Copy,
//       action: () => {
//         const url = `${window.location.origin}/blog/${
//           post.slug || slugify(post.title)
//         }`;
//         navigator.clipboard.writeText(url).then(() => {
//           alert("Link copied to clipboard!");
//           setShareDropdownOpen(false);
//         });
//       },
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       action: () => {
//         const url = `${window.location.origin}/blog/${
//           post.slug || slugify(post.title)
//         }`;
//         window.open(
//           `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//             url
//           )}`,
//           "_blank"
//         );
//         setShareDropdownOpen(false);
//       },
//     },
//     {
//       name: "Twitter",
//       icon: Twitter,
//       action: () => {
//         const url = `${window.location.origin}/blog/${
//           post.slug || slugify(post.title)
//         }`;
//         const text = post.title;
//         window.open(
//           `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//             text
//           )}&url=${encodeURIComponent(url)}`,
//           "_blank"
//         );
//         setShareDropdownOpen(false);
//       },
//     },
//     {
//       name: "WhatsApp",
//       icon: MessageCircle,
//       action: () => {
//         const url = `${window.location.origin}/blog/${
//           post.slug || slugify(post.title)
//         }`;
//         const text = `Check out this blog post: ${post.title}`;
//         window.open(
//           `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
//           "_blank"
//         );
//         setShareDropdownOpen(false);
//       },
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       action: () => {
//         // Instagram doesn't have direct sharing URL, so copy link instead
//         const url = `${window.location.origin}/blog/${
//           post.slug || slugify(post.title)
//         }`;
//         navigator.clipboard.writeText(url).then(() => {
//           alert(
//             "Link copied! You can paste it in your Instagram story or bio."
//           );
//           setShareDropdownOpen(false);
//         });
//       },
//     },
//   ];

//   const Sidebar = () => (
//     <aside className="space-y-4 sm:space-y-6">
//       {/* Search Box */}
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//         <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//           <div className="relative">
//             <input
//               ref={searchInputRef}
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//               placeholder="Search all blogs..."
//               className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm pr-8"
//             />
//             <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
//           </div>
//         </div>
//       </div>

//       {/* Recent Posts / Search Results */}
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//         <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4 sm:p-5">
//           <div className="flex items-center gap-2 mb-4">
//             <TrendingUp className="w-4 h-4 text-cyan-400" />
//             <h3 className="font-semibold text-cyan-100 text-sm">
//               {searchQuery.length >= 3 ? `Search Results` : "Recent Posts"}
//             </h3>
//           </div>

//           <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent">
//             {searchQuery.length >= 3 ? (
//               // Show search results
//               isSearchLoading ? (
//                 <div className="flex flex-col space-y-3">
//                   {[...Array(3)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="animate-pulse flex items-center gap-3"
//                     >
//                       <div className="w-12 h-12 rounded-full bg-cyan-800/30"></div>
//                       <div className="flex-1">
//                         <div className="h-4 bg-cyan-800/30 rounded w-3/4 mb-2"></div>
//                         <div className="h-3 bg-cyan-800/20 rounded w-1/2"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : searchResults?.data?.posts?.length > 0 ? (
//                 searchResults.data.posts.map((result) => {
//                   const resultTitle = result.title || "";
//                   const resultDescription =
//                     result.excerpt || result.description || "";
//                   const resultImage =
//                     result.coverImage || result.meta?.ogImage || result.image;
//                   const resultId = result._id?.$oid || result.id || result.slug;

//                   return (
//                     <button
//                       key={resultId}
//                       onClick={() => handleSearchResultClick(result)}
//                       className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3"
//                     >
//                       {resultImage ? (
//                         <img
//                           src={resultImage}
//                           alt={resultTitle}
//                           className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-800/30 flex-shrink-0 flex items-center justify-center">
//                           <Star className="w-5 h-5 text-cyan-400/50" />
//                         </div>
//                       )}
//                       <div className="flex flex-col flex-grow text-white text-xs">
//                         <span className="line-clamp-2 text-left">
//                           {resultTitle}
//                         </span>
//                         <span className="text-cyan-300/50 text-xs mt-1 line-clamp-1">
//                           {resultDescription}
//                         </span>
//                       </div>
//                     </button>
//                   );
//                 })
//               ) : (
//                 <div className="flex items-center justify-center h-32">
//                   <p className="text-cyan-300/60 text-sm text-center">
//                     No results found for "{searchQuery}"
//                   </p>
//                 </div>
//               )
//             ) : // Show recent posts
//             isRecentPostsLoading ? (
//               <div className="flex flex-col space-y-3">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="animate-pulse flex items-center gap-3"
//                   >
//                     <div className="w-12 h-12 rounded-full bg-cyan-800/30"></div>
//                     <div className="flex-1">
//                       <div className="h-4 bg-cyan-800/30 rounded w-3/4"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : recentPostsData?.length > 0 ? (
//               recentPostsData.map((rp) => {
//                 const rpTitle = rp.title || "";
//                 const rpImage = rp.coverImage || rp.meta?.ogImage || rp.image;
//                 const rpId = rp._id?.$oid || rp.id || rp.slug;

//                 return (
//                   <button
//                     key={rpId}
//                     onClick={() => handleRecentPostClick(rp)}
//                     className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3"
//                   >
//                     {rpImage ? (
//                       <img
//                         src={rpImage}
//                         alt={rpTitle}
//                         className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-800/30 flex-shrink-0 flex items-center justify-center">
//                         <Star className="w-5 h-5 text-cyan-400/50" />
//                       </div>
//                     )}
//                     <div className="flex flex-col flex-grow text-white text-xs">
//                       <span className="line-clamp-2 text-left">{rpTitle}</span>
//                     </div>
//                   </button>
//                 );
//               })
//             ) : (
//               <div className="flex items-center justify-center h-32">
//                 <p className="text-cyan-300/60 text-sm">
//                   No recent posts available.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Contact Form */}
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//         <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4 sm:p-5">
//           <h3 className="font-semibold text-cyan-100 text-sm mb-4">
//             Get in Touch
//           </h3>
//           <form className="space-y-4" onSubmit={handleFormSubmit}>
//             <div>
//               <label htmlFor="name" className="sr-only">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 placeholder="Your Name"
//                 className={`w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm ${
//                   formErrors.name ? "border border-red-500" : ""
//                 }`}
//               />
//               {formErrors.name && (
//                 <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleFormChange}
//                 placeholder="Your Email"
//                 className={`w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm ${
//                   formErrors.email ? "border border-red-500" : ""
//                 }`}
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
//               )}
//             </div>
//             <div>
//               <label htmlFor="message" className="sr-only">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 rows="4"
//                 value={formData.message}
//                 onChange={handleFormChange}
//                 placeholder="Your Message"
//                 className={`w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm resize-none ${
//                   formErrors.message ? "border border-red-500" : ""
//                 }`}
//               ></textarea>
//               {formErrors.message && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {formErrors.message}
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </aside>
//   );

//   return (
//     <div
//       className="min-h-screen px-4 sm:px-6 py-4 sm:py-8"
//       style={{
//         background:
//           "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
//       }}
//     >
//       <div className="w-full mx-auto max-w-screen">
//         {/* Mobile Sidebar Toggle */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
//           >
//             {sidebarOpen ? (
//               <X className="w-4 h-4" />
//             ) : (
//               <Menu className="w-4 h-4" />
//             )}
//             {sidebarOpen ? "Close Menu" : "Menu"}
//           </button>
//         </div>

//         {/* Mobile Sidebar Overlay */}
//         {sidebarOpen && (
//           <div
//             className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <div
//               className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto p-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-semibold text-white">Menu</h2>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//               <Sidebar />
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
//           <main className="lg:col-span-3">
//             <article className="relative rounded-2xl p-4 sm:p-6 shadow-lg bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl border border-cyan-400/20">
//               {/* Back button */}
//               <button
//                 onClick={() => navigate("/blog")}
//                 className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mb-4 transition-colors"
//               >
//                 <ArrowRight className="w-4 h-4 transform rotate-180" />
//                 Back to all posts
//               </button>

//               {/* Headline */}
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
//                 {postTitle}
//               </h1>
//               <img
//                 src={postImage}
//                 alt={postTitle}
//                 className="w-full h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] object-cover mx-auto rounded-lg shadow-lg"
//                 loading="lazy"
//               />
//               {/* Image */}

//               {/* Meta Info */}
//               <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white mb-6 border-b border-cyan-700/30 pb-4">
//                 {postDate && (
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>{postDate}</span>
//                   </div>
//                 )}

//                 {postCategory && (
//                   <span className="inline-block px-2 sm:px-3 py-1 bg-cyan-800/50 rounded-full text-xs font-medium text-white">
//                     {postCategory}
//                   </span>
//                 )}

//                 {postViews > 0 && (
//                   <div className="flex items-center gap-1">
//                     <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>{postViews} views</span>
//                   </div>
//                 )}

//                 {/* Share Button with Dropdown */}
//                 <div className="ml-auto relative" ref={shareRef}>
//                   <button
//                     onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
//                     className="rounded-full hover:bg-white/10 p-2 text-white transition-colors duration-200"
//                     title="Share Post"
//                   >
//                     <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>

//                   {/* Share Dropdown */}
//                   {shareDropdownOpen && (
//                     <div className="absolute right-0 top-full mt-2 z-20 bg-gradient-to-br from-cyan-950/95 to-teal-950/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 min-w-48 shadow-xl">
//                       {shareOptions.map((option, index) => (
//                         <button
//                           key={index}
//                           onClick={option.action}
//                           className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
//                         >
//                           <option.icon className="w-4 h-4 text-cyan-400" />
//                           <span className="text-white text-sm">
//                             {option.name}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Full Information/Content */}
//               <div className="prose prose-invert max-w-none text-white leading-relaxed">
//                 {renderContent(post)}
//               </div>

//               {/* Related tags if available */}
//               {postTags && postTags.length > 0 && (
//                 <div className="mt-8 pt-4 border-t border-cyan-700/30">
//                   <h3 className="text-sm font-medium text-white mb-3">
//                     Related Topics
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {postTags.map((tag, index) => (
//                       <span
//                         key={index}
//                         className="px-3 py-1 text-xs bg-cyan-800/30 text-cyan-300 rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </article>
//           </main>

//           {/* Desktop Sidebar */}
//           <div className="hidden lg:block lg:col-span-1">
//             <div className="sticky top-4">
//               <Sidebar />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostDetail;

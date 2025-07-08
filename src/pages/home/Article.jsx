// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Search, TrendingUp, Calendar, Eye, Share2 } from "lucide-react"; // Assuming you use lucide-react for icons
// import { blogsData } from "./blog"; // Assuming your blog data is in this file

// // Helper to slugify headlines, should be consistent with BlogLayout
// const slugify = (str) =>
//   str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

// const BlogPostDetail = () => {
//   const { slug } = useParams(); // Get the slug from the URL
//   const navigate = useNavigate();

//   const [post, setPost] = useState(null);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // For the search box in the sidebar

//   useEffect(() => {
//     // Find the post based on the slug
//     const foundPost = blogsData.find((b) => slugify(b.headline) === slug);
//     if (foundPost) {
//       setPost(foundPost);
//       // Filter out the current post from recent posts
//       const otherPosts = blogsData.filter((b) => b.id !== foundPost.id);

//       // Get the 3 most recent posts (you might want to sort by date here)
//       setRecentPosts(otherPosts.sort((a, b) => {
//         // Handle potentially different date formats if '09 June 25' is mixed with YYYY-MM-DD
//         const dateA = new Date(a.date.includes(" ") ? a.date.replace(/(\d{2}) (\w+) (\d{2})/g, "20$3-$2-$1") : a.date);
//         const dateB = new Date(b.date.includes(" ") ? b.date.replace(/(\d{2}) (\w+) (\d{2})/g, "20$3-$2-$1") : b.date);
//         return dateB - dateA;
//       }));
//     } else {
//       // If post not found, navigate to a 404 page or back to the blog list
//       navigate("/blog");
//     }
//   }, [slug, navigate]);

//   const handleRecentPostClick = (recentPost) => {
//     navigate(`/blog/${slugify(recentPost.headline)}`);
//   };

//   const handleShare = () => {
//     if (!post) return;
//     const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
//     if (navigator.share) {
//       navigator
//         .share({ title: post.headline, text: post.description, url })
//         .catch(() => {
//           // Fallback for when share fails or is cancelled
//           navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
//         });
//     } else {
//       navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
//     }
//   };

//   // Helper function to render content sections
//   const renderContent = (contentSections) => {
//     return contentSections.map((section, index) => {
//       switch (section.type) {
//         case "paragraph":
//           return (
//             <p
//               key={index}
//               className="mb-4"
//               dangerouslySetInnerHTML={{ __html: section.content }}
//             ></p>
//           );
//         case "heading":
//           return (
//             <h2
//               key={index}
//               className="text-2xl font-semibold text-white mt-6 mb-3"
//               dangerouslySetInnerHTML={{ __html: section.content }}
//             ></h2>
//           );
//         case "unordered_list":
//           return (
//             <ul key={index} className="list-disc list-inside ml-5 mb-4 space-y-2">
//               {section.content.map((item, itemIndex) => (
//                 <li
//                   key={itemIndex}
//                   dangerouslySetInnerHTML={{ __html: item }}
//                 ></li>
//               ))}
//             </ul>
//           );
//         default:
//           return null;
//       }
//     });
//   };

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white"
// >
//         Loading post...
//       </div>
//     );
//   }

//   // Determine the display date for the current post
//   const displayDate = post.date.includes(" ") ?
//                       new Date(post.date.replace(/(\d{2}) (\w+) (\d{2})/g, "20$3-$2-$1")).toLocaleDateString() :
//                       new Date(post.date).toLocaleDateString();

//   return (
//     <div
//       className="min-h-screen px-6 py-8"
//     >
//       <div className="w-full mx-0">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           <main className="lg:col-span-3">
//             <article className="relative  rounded-2xl  p-6 shadow-lg">
//               {/* Headline (moved to top as typically seen in blogs) */}
//               <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                 {post.headline}
//               </h1>

//               {/* Image */}
//               <div className="rounded-xl overflow-hidden mb-6">
//                 <img
//                   src={post.image}
//                   alt={post.imageAlt || post.headline} 
//                   className="w-[1000px] h-[500px] object-cover mx-auto rounded-lg shadow-lg"
//                 />
//               </div>

//               {/* Meta Info */}
//               <div className="flex items-center gap-4 text-sm text-white mb-6 border-b border-cyan-700/30 pb-4">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   <span>{displayDate}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Eye className="w-4 h-4" />
//                   <span>{post.views || "1.2k"} Views</span>
//                 </div>
//                 {post.category && ( // Only display category if it exists
//                   <span className="inline-block px-3 py-1 bg-cyan-800/50 rounded-full text-xs font-medium text-white">
//                     {post.category}
//                   </span>
//                 )}
//                 <button
//                   onClick={handleShare}
//                   className="ml-auto rounded-full hover:bg-white/10 p-2 text-white transition-colors duration-200"
//                   title="Share Post"
//                 >
//                   <Share2 className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Full Information/Content */}
//               <div className="prose prose-invert max-w-none text-white leading-relaxed">
//                 {/* Render the sections from post.content.sections */}
//                 {post.content && post.content.sections && renderContent(post.content.sections)}

//                 {/* You can also render the main description if it's meant to be part of the content flow */}
//                 {/* <p dangerouslySetInnerHTML={{ __html: post.description }}></p> */}
//               </div>
//             </article>
//           </main>

//           <aside className="lg:col-span-1 space-y-6">
//             {/* Search Box */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search all blogs..."
//                     className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
//                   />
//                   <Search className="absolute right-0 top-0 text-white w-4 h-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Recent Posts - MODIFIED HERE */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <TrendingUp className="w-4 h-4 text-cyan-400" />
//                   <h3 className="font-semibold text-cyan-100 text-sm">
//                     Recent Posts
//                   </h3>
//                 </div>
//                 <div className="space-y-3">
//                   {recentPosts.length > 0 ? (
//                     recentPosts.map((rp) => (
//                       <button
//                         key={rp.id}
//                         onClick={() => handleRecentPostClick(rp)}
//                         className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-500/10 flex items-center gap-3" 
//                       >
//                         {/* Added image here */}
//                         {rp.image && (
//                           <img
//                             src={rp.image}
//                             alt={rp.headline}
//                             className="w-12 h-12 rounded-full object-cover flex-shrink-0" 
//                           />
//                         )}
//                         <div className="flex flex-col flex-grow text-white text-xs"> {/* Added flex-grow to ensure text takes available space */}
//                           <span >{rp.headline}</span>
                          
//                         </div>
//                       </button>
//                     ))
//                   ) : (
//                     <p className="text-cyan-300/60 text-sm">No recent posts available.</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <h3 className="font-semibold text-cyan-100 text-sm mb-4">
//                   Get in Touch
//                 </h3>
//                 <form className="space-y-4">
//                   <div>
//                     <label htmlFor="name" className="sr-only">Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       placeholder="Your Name"
//                       className="w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="sr-only">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       placeholder="Your Email"
//                       className="w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="message" className="sr-only">Message</label>
//                     <textarea
//                       id="message"
//                       rows="4"
//                       placeholder="Your Message"
//                       className="w-full px-3 py-2 bg-white/10 rounded-md text-cyan-100 placeholder-cyan-300/60 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm resize-none"
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-2 rounded-md font-semibold hover:from-cyan-600 hover:to-teal-600 transition-colors duration-300"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostDetail;




import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, TrendingUp, Calendar, Eye, Share2, Menu, X, Copy, Facebook, MessageCircle, Instagram, Twitter } from "lucide-react";
import { blogsData } from "./blog";

// Helper to slugify headlines, should be consistent with BlogLayout
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
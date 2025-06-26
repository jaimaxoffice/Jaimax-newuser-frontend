// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import { Helmet } from "react-helmet-async";

// // Replace this with your actual blogs data import or source
// import { blogsData } from "./Blog";
// // Normalize headline for URL matching and links
// const normalizeHeadline = (str) =>
//   str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

// const ArticleView = () => {
//   const { headline } = useParams();
//   const navigate = useNavigate();

//   const normalizedHeadlineFromURL = normalizeHeadline(headline || "");

//   // Find blog matching URL slug
//   const selectedPost = blogsData.find(
//     (blog) => normalizeHeadline(blog.headline) === normalizedHeadlineFromURL
//   );

//   // If blog not found show message
//   if (!selectedPost) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0b1f24] text-cyan-400">
//         <p>Blog not found!</p>
//       </div>
//     );
//   }

//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter recent blogs by search term, exclude current blog
//   const filteredBlogs = blogsData
//     .filter((blog) => normalizeHeadline(blog.headline) !== normalizedHeadlineFromURL)
//     .filter((blog) =>
//       blog.headline.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//   // Sticky sidebar position effect
//   useEffect(() => {
//     const sidebarElement = document.querySelector(".sidebar");
//     const handleResize = () => {
//       if (!sidebarElement) return;
//       if (window.innerWidth < 992) {
//         sidebarElement.style.position = "relative";
//         sidebarElement.style.top = "0";
//         sidebarElement.style.marginTop = "2rem";
//       } else {
//         sidebarElement.style.position = "sticky";
//         sidebarElement.style.top = "1rem";
//         sidebarElement.style.marginTop = "0";
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Request form submit handler (dummy)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Request submitted!");
//   };

//   // Render blog content sections
//   const renderContent = (sections) =>
//     sections.map((section, i) => {
//       switch (section.type) {
//         case "paragraph":
//           return (
//             <p key={i} className="mb-4 text-justify text-cyan-100" dangerouslySetInnerHTML={{ __html: section.content }} />
//           );
//         case "heading":
//           return (
//             <h2
//               key={i}
//               className="mt-6 mb-3 border-b border-cyan-600 text-cyan-300 text-xl font-semibold"
//             >
//               {section.content}
//             </h2>
//           );
//         case "unordered_list":
//           return (
//             <ul
//               key={i}
//               className="list-disc list-inside mb-6 text-cyan-200"
//             >
//               {section.content.map((item, idx) => (
//                 <li key={idx} className="mb-1" dangerouslySetInnerHTML={{ __html: item }} />
//               ))}
//             </ul>
//           );
//         default:
//           return null;
//       }
//     });

//   return (
//     <div className="min-h-screen bg-[#0b1f24] px-6 py-8 text-white w-full">
//       <Helmet>
//         <title>{selectedPost.headline}</title>
//         <meta name="description" content={selectedPost.description?.slice(0, 150)} />
//       </Helmet>

//       <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
//         {/* Article Section */}
//         <article className="lg:w-2/3 w-full">
//           <h1 className="text-4xl font-bold text-cyan-200 mb-6">
//             {selectedPost.content.title || selectedPost.headline}
//           </h1>

//           <div className="mb-6 relative">
//             <img
//               src={selectedPost.image}
//               alt={selectedPost.headline}
//               className="w-full rounded shadow-lg max-h-[350px] object-cover"
//             />
//           </div>

//           <div
//             className="mb-6 text-cyan-100"
//             dangerouslySetInnerHTML={{ __html: selectedPost.description }}
//           />

//           <div>{renderContent(selectedPost.content.sections)}</div>
//         </article>

//         {/* Sidebar */}
//         <aside
//           className="sidebar lg:w-1/3 w-full bg-[#10252c] p-6 rounded-xl border border-cyan-600/30"
//           style={{ backdropFilter: "blur(5px)" }}
//         >
//           {/* Search recent blogs */}
//           <input
//             type="text"
//             placeholder="Search blogs..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 rounded mb-6 bg-[#0e1f24] border border-cyan-600 text-cyan-200"
//           />

//           {/* Recent Blogs */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-cyan-300">Recent Blogs</h2>
//             <ul className="space-y-3 max-h-[280px] overflow-y-auto">
//               {filteredBlogs.map((blog, i) => (
//                 <li key={i} className="flex items-center gap-3 cursor-pointer hover:text-cyan-400 transition">
//                   <img
//                     src={blog.image}
//                     alt={blog.headline}
//                     className="w-10 h-10 object-cover rounded-full flex-shrink-0"
//                   />
//                   <a
//                     href={`/blog/${normalizeHeadline(blog.headline)}`}
//                     className="text-cyan-200 text-sm line-clamp-2"
//                   >
//                     {blog.headline}
//                   </a>
//                 </li>
//               ))}
//               {filteredBlogs.length === 0 && (
//                 <li className="text-cyan-400 text-sm italic">No blogs found.</li>
//               )}
//             </ul>
//           </div>

//           {/* Request Form */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4 text-cyan-300">Raise a Request</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-cyan-100">
//               <label className="flex flex-col">
//                 Name
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white"
//                 />
//               </label>
//               <label className="flex flex-col">
//                 Phone Number
//                 <input
//                   type="tel"
//                   required
//                   className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white"
//                 />
//               </label>
//               <label className="flex flex-col">
//                 Description
//                 <textarea
//                   rows={4}
//                   required
//                   className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white resize-none"
//                 />
//               </label>
//               <button
//                 type="submit"
//                 className="bg-cyan-600 hover:bg-cyan-700 transition rounded py-2 font-semibold mt-2"
//               >
//                 Submit Request
//               </button>
//             </form>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default ArticleView;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import { Helmet } from "react-helmet-async";  // Removed as requested

// // Replace this with your actual blogs data import or source
// import { blogsData } from "./Blog";

// // Normalize headline for URL matching and links
// const normalizeHeadline = (str) =>
//   str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

// const ArticleView = () => {
//   const { headline } = useParams();
//   const navigate = useNavigate();
//     const [searchTerm, setSearchTerm] = useState("");

//   const normalizedHeadlineFromURL = normalizeHeadline(headline || "");

//     useEffect(() => {
//     const sidebarElement = document.querySelector(".sidebar");
//     const handleResize = () => {
//       if (!sidebarElement) return;
//       if (window.innerWidth < 992) {
//         sidebarElement.style.position = "relative";
//         sidebarElement.style.top = "0";
//         sidebarElement.style.marginTop = "2rem";
//       } else {
//         sidebarElement.style.position = "sticky";
//         sidebarElement.style.top = "1rem";
//         sidebarElement.style.marginTop = "0";
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);


  
//   // Find blog matching URL slug
//   const selectedPost = blogsData.find(
//     (blog) => normalizeHeadline(blog.headline) === normalizedHeadlineFromURL
//   );

//   if (!selectedPost) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0b1f24] text-cyan-400">
//         <p>Blog not found!</p>
//       </div>
//     );
//   }



//   // Filter recent blogs by search term, exclude current blog
//   const filteredBlogs = blogsData
//     .filter((blog) => normalizeHeadline(blog.headline) !== normalizedHeadlineFromURL)
//     .filter((blog) =>
//       blog.headline.toLowerCase().includes(searchTerm.toLowerCase())
//     );



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Request submitted!");
//   };

//   const renderContent = (sections) =>
//     sections.map((section, i) => {
//       switch (section.type) {
//         case "paragraph":
//           return (
//             <p
//               key={i}
//               className="mb-4 text-justify text-cyan-100"
//               dangerouslySetInnerHTML={{ __html: section.content }}
//             />
//           );
//         case "heading":
//           return (
//             <h2
//               key={i}
//               className="mt-6 mb-3 border-b border-cyan-600 text-cyan-300 text-xl font-semibold"
//             >
//               {section.content}
//             </h2>
//           );
//         case "unordered_list":
//           return (
//             <ul key={i} className="list-disc list-inside mb-6 text-cyan-200">
//               {section.content.map((item, idx) => (
//                 <li
//                   key={idx}
//                   className="mb-1"
//                   dangerouslySetInnerHTML={{ __html: item }}
//                 />
//               ))}
//             </ul>
//           );
//         default:
//           return null;
//       }
//     });

//   return (
//     <div className="min-h-screen bg-[#0b1f24] px-6 py-8 text-white w-full">
//       <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
//         {/* Article Section */}
//         <article className="lg:w-2/3 w-full">
//           <h1 className="text-4xl font-bold text-cyan-200 mb-6">
//             {selectedPost.content.title || selectedPost.headline}
//           </h1>

//           <div className="mb-6 relative">
//             <img
//               src={selectedPost.image}
//               alt={selectedPost.headline}
//               className="w-full rounded shadow-lg max-h-[350px] object-cover"
//             />
//           </div>

//           <div
//             className="mb-6 text-cyan-100"
//             dangerouslySetInnerHTML={{ __html: selectedPost.description }}
//           />

//           <div>{renderContent(selectedPost.content.sections)}</div>
//         </article>

//         {/* Sidebar */}
//         <aside
//           className="sidebar lg:w-1/3 w-full bg-[#10252c] p-6 rounded-xl border border-cyan-600/30"
//           style={{ backdropFilter: "blur(5px)" }}
//         >
//           {/* Search recent blogs */}
//           <input
//             type="text"
//             placeholder="Search blogs..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 rounded mb-6 bg-[#0e1f24] border border-cyan-600 text-cyan-200"
//           />

//           {/* Recent Blogs */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-cyan-300">Recent Blogs</h2>
//             <ul className="space-y-3 max-h-[280px] overflow-y-auto">
//               {filteredBlogs.map((blog, i) => (
//                 <li
//                   key={i}
//                   className="flex items-center gap-3 cursor-pointer hover:text-cyan-400 transition"
//                 >
//                   <img
//                     src={blog.image}
//                     alt={blog.headline}
//                     className="w-10 h-10 object-cover rounded-full flex-shrink-0"
//                   />
//                   <a
//                     href={`/blog/${normalizeHeadline(blog.headline)}`}
//                     className="text-cyan-200 text-sm line-clamp-2"
//                   >
//                     {blog.headline}
//                   </a>
//                 </li>
//               ))}
//               {filteredBlogs.length === 0 && (
//                 <li className="text-cyan-400 text-sm italic">No blogs found.</li>
//               )}
//             </ul>
//           </div>

//           {/* Request Form */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4 text-cyan-300">Raise a Request</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-cyan-100">
//               <label className="flex flex-col">
//                 Name
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white"
//                 />
//               </label>
//               <label className="flex flex-col">
//                 Phone Number
//                 <input
//                   type="tel"
//                   required
//                   className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white"
//                 />
//               </label>
//               <label className="flex flex-col">
//                 Description
//                 <textarea
//                   rows={4}
//                   required
//                   className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white resize-none"
//                 />
//               </label>
//               <button
//                 type="submit"
//                 className="bg-cyan-600 hover:bg-cyan-700 transition rounded py-2 font-semibold mt-2"
//               >
//                 Submit Request
//               </button>
//             </form>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default ArticleView;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogsData } from './BlogPage';
import BlogContact from './BlogContact';
import { Helmet } from 'react-helmet-async';


// Global counter to track links
let linkCount = 0;

const normalizeHeadline = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]/g, '');
};




const BlogDetail = () => {
  const { headline } = useParams();
  const navigate = useNavigate();
  const normalizedHeadlineFromURL = normalizeHeadline(headline);
  const [searchTerm, setSearchTerm] = useState('');
  if (!Array.isArray(blogsData)) {
    return <p>Error: blogsData is not an array!</p>;
  }

  const blog = blogsData.find(
    (blog) => normalizeHeadline(blog.headline) === normalizedHeadlineFromURL
  );

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  // Preprocess blog content
  const processedBlog = {
    ...blog,
    about: (blog.description),
    content: {
      ...blog.content,
      sections: blog.content.sections.map(section =>
        section.type === 'paragraph'
          ? { ...section, content: (section.content) }
          : section
      ),
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const sidebarElement = document.querySelector('.blog-sidebar');
      if (sidebarElement) {
        if (window.innerWidth < 992) {
          sidebarElement.style.position = 'relative';
          sidebarElement.style.top = '0';
          sidebarElement.style.marginTop = '2rem';
        } else {
          sidebarElement.style.position = 'sticky';
          sidebarElement.style.top = '1rem';
          sidebarElement.style.marginTop = '0';
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .blog-custom-font, .blog-custom-font * {
        font-family: Arial, 'Segoe UI', 'Roboto', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const imagePath = blog.image.startsWith('./') ? '/' + blog.image.substring(2) : blog.image;

  const filteredBlogs = blogsData.filter((blog) =>
    blog.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4 py-md-5 blog-custom-font" style={{ fontFamily: "'Poppins', 'Segoe UI', 'Roboto', sans-serif" }}>
      <Helmet>
        <title>{blog.headline}</title>
        <meta name="description" content={blog.description.substring(0, 150)} />
      </Helmet>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="blog-detail text-light">
            <h1 className="mb-3" style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              lineHeight: '1.3',
              fontWeight: '700'
            }}>
              {processedBlog.headline}
            </h1>
            
            <img
              src={imagePath}
              alt={imagePath}
              className="img-fluid mb-4 rounded"
              style={{
                width: '100%',
                maxHeight: '60vh',
                objectFit: 'cover'
              }}
            />

            <p
              dangerouslySetInnerHTML={{ __html: processedBlog.description }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}
            />

            <div>
              <h2 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                marginTop: '1.5rem',
                marginBottom: '1rem',
                // fontWeight: '600',
                color: '#f8f9fa',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '0.5rem'
              }}>
                {processedBlog.content.title}
              </h2>

              {processedBlog.content.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  {section.type === 'paragraph' && (
                    <p
                      dangerouslySetInnerHTML={{ __html: section.content }}
                      style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                        lineHeight: '1.7',
                        marginBottom: '1rem',
                        color: '#d1d3d4'
                      }}
                    />
                  )}

                  {section.type === 'heading' && (
                    <h2 style={{
                      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                      // fontWeight: '500',
                      marginTop: '1.5rem',
                      marginBottom: '1rem',
                      lineHeight: '1.4',
                      color: '#f8f9fa',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      paddingBottom: '0.5rem'
                    }}>
                      {section.content}
                    </h2>
                  )}

                  {/* {section.type === 'subheading' && (
                    <h3 style={{
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      fontWeight: '600',
                      marginTop: '1.25rem',
                      marginBottom: '0.75rem',
                      lineHeight: '1.4',
                      color: '#e9ecef'
                    }}>
                      {section.content}
                    </h3>
                  )} */}
                  {section.type === 'subheading' && (
                    <h3
                      dangerouslySetInnerHTML={{ __html: section.content }}
                      style={{
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        marginTop: '1.25rem',
                        marginBottom: '0.75rem',
                        lineHeight: '1.4',
                        color: '#e9ecef'
                      }}
                    />
                  )}

                  {/* {section.type === 'unordered_list' && (
                    <ul 
                    dangerouslySetInnerHTML={{ __html: section.content }}
                    style={{
                      paddingLeft: '1.5rem',
                      marginBottom: '1.5rem',
                      color: '#d1d3d4'
                    }}>
                      {section.content.map((item, idx) => (
                        <li key={idx} style={{
                          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                          marginBottom: '0.5rem',
                          lineHeight: '1.6'
                        }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )} */}
                  {section.type === 'unordered_list' && Array.isArray(section.content) && (
                    <ul
                      style={{
                        paddingLeft: '1.5rem',
                        marginBottom: '1.5rem',
                        color: '#d1d3d4'
                      }}
                    >
                      {section.content.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            marginBottom: '0.5rem',
                            lineHeight: '1.6'
                          }}
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      ))}
                    </ul>
                  )}


                  {section.type === 'table' && (
                    <div className="table-responsive my-4">
                      <table className="table table-bordered table-dark" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>
                        <thead>
                          <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <th style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Feature</th>
                            <th style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Jaimax</th>
                            <th style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Generic Altcoin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.content.map((row, idx) => (
                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                              <td style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)' }}>{row.Feature}</td>
                              <td style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)' }}>{row.Jaimax}</td>
                              <td style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)' }}>{row['Generic Altcoin']}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="blog-sidebar text-light p-3 p-md-4 rounded" style={{
            backgroundColor: 'rgba(33, 37, 41, 0.7)',
            backdropFilter: 'blur(5px)',
            borderRadius: '1rem',
            position: 'sticky',
            top: '1rem'
          }}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control bg-dark text-light p-2"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '0.5rem' }}
              />
            </div>

            <div className="mb-4">
              <h3 style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Recent Posts
              </h3>
              <ul className="list-unstyled">
                {filteredBlogs.map((blog, index) => (
                  <li key={index} className="d-flex align-items-center mb-3">
                    <img
                      src={blog.image}
                      alt={blog.headline}
                      className="rounded-circle me-2"
                      style={{
                        width: 'clamp(2.5rem, 8vw, 3.125rem)',
                        height: 'clamp(2.5rem, 8vw, 3.125rem)',
                        objectFit: 'cover'
                      }}
                    />
                    <a
                      href={`/blog/${normalizeHeadline(blog.headline)}`}
                      className="text-light text-decoration-none"
                      style={{
                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        transition: 'color 0.3s ease',
                        color: '#f8f9fa'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#00a1ff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#f8f9fa'}
                    >
                      {blog.headline}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <BlogContact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
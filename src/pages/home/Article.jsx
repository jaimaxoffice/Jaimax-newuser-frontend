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


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";  // Removed as requested

// Replace this with your actual blogs data import or source
import { blogsData } from "./Blog";

// Normalize headline for URL matching and links
const normalizeHeadline = (str) =>
  str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

const ArticleView = () => {
  const { headline } = useParams();
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

  const normalizedHeadlineFromURL = normalizeHeadline(headline || "");

    useEffect(() => {
    const sidebarElement = document.querySelector(".sidebar");
    const handleResize = () => {
      if (!sidebarElement) return;
      if (window.innerWidth < 992) {
        sidebarElement.style.position = "relative";
        sidebarElement.style.top = "0";
        sidebarElement.style.marginTop = "2rem";
      } else {
        sidebarElement.style.position = "sticky";
        sidebarElement.style.top = "1rem";
        sidebarElement.style.marginTop = "0";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  
  // Find blog matching URL slug
  const selectedPost = blogsData.find(
    (blog) => normalizeHeadline(blog.headline) === normalizedHeadlineFromURL
  );

  if (!selectedPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1f24] text-cyan-400">
        <p>Blog not found!</p>
      </div>
    );
  }



  // Filter recent blogs by search term, exclude current blog
  const filteredBlogs = blogsData
    .filter((blog) => normalizeHeadline(blog.headline) !== normalizedHeadlineFromURL)
    .filter((blog) =>
      blog.headline.toLowerCase().includes(searchTerm.toLowerCase())
    );



  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request submitted!");
  };

  const renderContent = (sections) =>
    sections.map((section, i) => {
      switch (section.type) {
        case "paragraph":
          return (
            <p
              key={i}
              className="mb-4 text-justify text-cyan-100"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          );
        case "heading":
          return (
            <h2
              key={i}
              className="mt-6 mb-3 border-b border-cyan-600 text-cyan-300 text-xl font-semibold"
            >
              {section.content}
            </h2>
          );
        case "unordered_list":
          return (
            <ul key={i} className="list-disc list-inside mb-6 text-cyan-200">
              {section.content.map((item, idx) => (
                <li
                  key={idx}
                  className="mb-1"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          );
        default:
          return null;
      }
    });

  return (
    <div className="min-h-screen bg-[#0b1f24] px-6 py-8 text-white w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10">
        {/* Article Section */}
        <article className="lg:w-2/3 w-full">
          <h1 className="text-4xl font-bold text-cyan-200 mb-6">
            {selectedPost.content.title || selectedPost.headline}
          </h1>

          <div className="mb-6 relative">
            <img
              src={selectedPost.image}
              alt={selectedPost.headline}
              className="w-full rounded shadow-lg max-h-[350px] object-cover"
            />
          </div>

          <div
            className="mb-6 text-cyan-100"
            dangerouslySetInnerHTML={{ __html: selectedPost.description }}
          />

          <div>{renderContent(selectedPost.content.sections)}</div>
        </article>

        {/* Sidebar */}
        <aside
          className="sidebar lg:w-1/3 w-full bg-[#10252c] p-6 rounded-xl border border-cyan-600/30"
          style={{ backdropFilter: "blur(5px)" }}
        >
          {/* Search recent blogs */}
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded mb-6 bg-[#0e1f24] border border-cyan-600 text-cyan-200"
          />

          {/* Recent Blogs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-cyan-300">Recent Blogs</h2>
            <ul className="space-y-3 max-h-[280px] overflow-y-auto">
              {filteredBlogs.map((blog, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 cursor-pointer hover:text-cyan-400 transition"
                >
                  <img
                    src={blog.image}
                    alt={blog.headline}
                    className="w-10 h-10 object-cover rounded-full flex-shrink-0"
                  />
                  <a
                    href={`/blog/${normalizeHeadline(blog.headline)}`}
                    className="text-cyan-200 text-sm line-clamp-2"
                  >
                    {blog.headline}
                  </a>
                </li>
              ))}
              {filteredBlogs.length === 0 && (
                <li className="text-cyan-400 text-sm italic">No blogs found.</li>
              )}
            </ul>
          </div>

          {/* Request Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-cyan-300">Raise a Request</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-cyan-100">
              <label className="flex flex-col">
                Name
                <input
                  type="text"
                  required
                  className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white"
                />
              </label>
              <label className="flex flex-col">
                Phone Number
                <input
                  type="tel"
                  required
                  className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white"
                />
              </label>
              <label className="flex flex-col">
                Description
                <textarea
                  rows={4}
                  required
                  className="mt-1 p-2 rounded bg-[#0e1f24] border border-cyan-600 text-white resize-none"
                />
              </label>
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 transition rounded py-2 font-semibold mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleView

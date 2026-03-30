// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import DOMPurify from "dompurify";
// import {
//   Search, TrendingUp, Calendar, Eye, Share2,
//   Menu, X, Copy, Facebook, MessageCircle,
//   Instagram, Twitter, Star, ArrowRight,
// } from "lucide-react";
// import {
//   useGetPostBySlugQuery,
//   useGetRecentPostsQuery,
//   useSearchPostsQuery,
// } from "../../../components/Blogsection/BlogEditorApiSlice";

// import Blog1 from "../../../assets/Blog1poster.webp";
// import Blog2 from "../../../assets/Blog2poster.webp";
// import Blog3 from "../../../assets/Blog3poster.webp";
// import Blog4 from "../../../assets/Blog4poster.webp";
// import Blog5 from "../../../assets/Blog5poster.webp";

// // ─── Static blog data ─────────────────────────────────────────────────────────
// export const staticBlogsData = [
//   {
//     id: 5, image: Blog5, headline: "Why Jaimax Is the Smart Move Right Now",
//     description: `In today's rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">crypto token</a> emerging globally, Jaimax stands out as a promising digital asset with unique potential for growth.`,
//     date: "09 june 25", category: "Investment", trending: true,
//     content: {
//       title: "Jaimax: The Best Crypto token Emerging from India",
//       sections: [
//         { type: "paragraph", content: `India is rapidly becoming a hotspot for cryptocurrency adoption. As the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">best crypto token in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment.` },
//         { type: "heading", content: "Unmatched Growth Potential at a Low Price Point" },
//         { type: "paragraph", content: "Jaimax's current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption." },
//         { type: "heading", content: "Strong Use Cases Driving Real-World Utility" },
//         { type: "paragraph", content: "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:" },
//         { type: "unordered_list", content: ["<b>Decentralized applications (dApps)</b>", "<b>Non-fungible tokens (NFTs)</b>", "<b>Digital payments in e-commerce</b>", "<b>Community rewards and incentives</b>"] },
//         { type: "heading", content: "Robust and Secure Blockchain Infrastructure" },
//         { type: "paragraph", content: "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project's architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally." },
//         { type: "heading", content: "Experienced Leadership and Active Community Engagement" },
//         { type: "paragraph", content: "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community." },
//         { type: "heading", content: "Clear Roadmap for Future Development" },
//         { type: "unordered_list", content: ["Launching Jaimax Foundation Chain with enhanced scalability", "Expanding NFT and DeFi services", "Introducing mobile wallets and user-friendly interfaces", "Partnering with key industry players for exchange listings and integrations"] },
//         { type: "heading", content: "In Summary" },
//         { type: "paragraph", content: "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity." },
//       ],
//     },
//   },
//   {
//     id: 4, image: Blog4, headline: "Jaimax: The Future of Cryptocurrency from India to the World",
//     description: "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark.",
//     date: "09 june 25", category: "Blockchain", hot: true,
//     content: {
//       title: "The Rise of a Revolutionary Crypto Brand",
//       sections: [
//         { type: "paragraph", content: `In a world driven by digital transformation, <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">Jaimax</a> is emerging as a pioneering cryptocurrency born in India.` },
//         { type: "heading", content: "A Vision Beyond Borders: Jaimax's Global Mission" },
//         { type: "paragraph", content: "At its core, <b>Jaimax envisions a decentralized future</b> where financial opportunities are not limited by geography, background, or financial history." },
//         { type: "heading", content: "Blockchain Backbone: The Technology Powering Jaimax" },
//         { type: "unordered_list", content: ["<b>High TPS:</b> Jaimax supports lightning-fast processing.", "<b>Energy-Efficient Consensus Mechanism:</b> Reduces carbon footprints.", "<b>Smart Contract Integration:</b> Build dApps, DeFi protocols, and NFT platforms."] },
//         { type: "heading", content: "Strategic Phased Roadmap: Building With Purpose" },
//         { type: "unordered_list", content: ["<b>Phase 1:</b> Community Building and Coin Launch", "<b>Phase 2:</b> Market Expansion & Platform Integration", "<b>Phase 3:</b> Smart Contract and Developer Toolkit Release", "<b>Phase 4:</b> Global Outreach & Utility Enhancement", "<b>Phase 5:</b> Institutional Partnerships and Governance DAO"] },
//         { type: "heading", content: "Conclusion: Jaimax is the Future" },
//         { type: "paragraph", content: "Jaimax is more than just a crypto token — it's a revolution from India, built for the world." },
//       ],
//     },
//   },
//   {
//     id: 1, image: Blog1, headline: "The Power of Early Investment: Why Now is the Time for Jaimax",
//     description: "In the dynamic world of cryptocurrency, success often belongs to those who act early. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India.",
//     date: "05 may 25", category: "Market Trends", trending: true, featured: true,
//     content: {
//       title: "Timing Defines Opportunity in Cryptocurrency",
//       sections: [
//         { type: "paragraph", content: `In the dynamic world of <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">cryptocurrency</a>, success often belongs to those who act early.` },
//         { type: "heading", content: "Why Jaimax is Gaining Attention" },
//         { type: "paragraph", content: "What separates Jaimax from the sea of altcoins? It's the combination of technology, local market alignment, transparent development, and long-term vision." },
//         { type: "heading", content: "Why ₹0.50 is a Golden Entry Point" },
//         { type: "unordered_list", content: ["Lowest possible risk with highest potential reward", "Ideal for long-term holding and short-term trading", "Entry before upcoming upgrades and visibility boosts"] },
//         { type: "heading", content: "Jaimax vs. Other Crypto Coins: A Comparison" },
//         { type: "table", content: [{ Feature: "Price Accessibility", Jaimax: "₹0.50 (entry stage)", "Generic Altcoin": "Often above ₹10+" }, { Feature: "Localized Growth Focus", Jaimax: "India-first strategy", "Generic Altcoin": "Global but unfocused" }, { Feature: "Technology", Jaimax: "Scalable, fast, secure", "Generic Altcoin": "Average blockchain models" }, { Feature: "Roadmap Transparency", Jaimax: "Clear, public, progressive", "Generic Altcoin": "Often unclear or delayed" }] },
//         { type: "heading", content: "Conclusion: The Smart Move Is to Act Early" },
//         { type: "paragraph", content: `Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">best crypto coins in India</a> today.` },
//       ],
//     },
//   },
//   {
//     id: 2, image: Blog2, headline: "How Jaimax Works: A Deep Dive into Our Coin and Technology",
//     description: "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance and accessibility, Jaimax is rapidly gaining momentum.",
//     date: "12 may 25", category: "Technology",
//     content: {
//       title: "Jaimax: The Best Crypto Coin in India",
//       sections: [
//         { type: "paragraph", content: `Jaimax is rapidly gaining momentum as the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">best crypto coin in India</a>.` },
//         { type: "heading", content: "The Technology Backbone of Jaimax" },
//         { type: "subheading", content: "High-Speed Scalable Blockchain" },
//         { type: "unordered_list", content: ["Block Generation Time: 2 seconds", "Transaction Speed: Over 5,000 TPS", "Network Uptime: 99.99%", "Gas Fees: Extremely low and consistent"] },
//         { type: "heading", content: "Coin Supply and Investment Structure" },
//         { type: "unordered_list", content: ["Total Supply: 1 Billion Jaimax coins", "Launch Price: ₹0.10", "Current Price: ₹0.50", "Public Trading Launch: Begins after Phase 2"] },
//         { type: "heading", content: "Conclusion: Secure Your Place in the Future with Jaimax" },
//         { type: "paragraph", content: "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today." },
//       ],
//     },
//   },
//   {
//     id: 3, image: Blog3, headline: "Understanding Cryptocurrency: A Simple Guide for New Users",
//     description: "Cryptocurrency has dramatically transformed the financial landscape. This guide will break down cryptocurrency in simple terms and introduce you to the exciting opportunities it presents.",
//     date: "13 may 25", category: "Crypto News",
//     content: {
//       title: "What is Cryptocurrency?",
//       sections: [
//         { type: "paragraph", content: "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network." },
//         { type: "heading", content: "How Does Cryptocurrency Work?" },
//         { type: "paragraph", content: "Cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring both the transaction and the identity of the sender are protected." },
//         { type: "heading", content: "Types of Cryptocurrency" },
//         { type: "subheading", content: "Bitcoin (BTC)" },
//         { type: "paragraph", content: "Bitcoin is the original cryptocurrency, introduced in 2009. It remains the largest by market capitalization and is often regarded as 'digital gold.'" },
//         { type: "subheading", content: "Ethereum (ETH)" },
//         { type: "paragraph", content: "Ethereum enables developers to create smart contracts and decentralized applications (dApps)." },
//         { type: "heading", content: "Jaimax: A Top Cryptocurrency to Invest in India" },
//         { type: "paragraph", content: `For those looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0369a1">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity with its unique approach and growing community.` },
//         { type: "heading", content: "Conclusion" },
//         { type: "paragraph", content: "Cryptocurrency is revolutionizing finance. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising." },
//       ],
//     },
//   },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const slugify = (str) =>
//   str ? str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") : "";

// function getDailyGrowingViews(postId, base = 1000) {
//   const id = String(postId ?? "default");
//   const startDate = new Date("2025-01-01");
//   const today = new Date();
//   const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
//   let seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
//   let views = base;
//   for (let i = 0; i < daysPassed; i++) {
//     seed = (seed * 9301 + 49297) % 233280;
//     views += 20 + (seed % 80);
//   }
//   return views;
// }

// function formatViewsK(v) {
//   const n = Number(v) || 0;
//   return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
// }

// const formatDate = (dateString) => {
//   if (!dateString) return "";
//   if (String(dateString).match(/^\d{1,2}\s+\w+\s+\d{2}$/)) return dateString;
//   let date;
//   if (typeof dateString === "object" && dateString.$date) date = new Date(dateString.$date);
//   else date = new Date(dateString);
//   return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
// };

// const convertSectionsToHTML = (sections) => {
//   let html = "";
//   sections.forEach((section) => {
//     switch (section.type) {
//       case "heading":
//         html += `<h3 class="post-h3">${section.content}</h3>`;
//         break;
//       case "subheading":
//         html += `<h4 class="post-h4">${section.content}</h4>`;
//         break;
//       case "paragraph":
//         html += `<p class="post-p">${section.content}</p>`;
//         break;
//       case "unordered_list":
//         html += '<ul class="post-ul">';
//         section.content.forEach((item) => { html += `<li class="post-li">${item}</li>`; });
//         html += "</ul>";
//         break;
//       case "table":
//         if (Array.isArray(section.content) && section.content.length) {
//           const headers = Object.keys(section.content[0]);
//           html += '<div class="post-table-wrap"><table class="post-table"><thead><tr>';
//           headers.forEach(h => { html += `<th class="post-th">${h}</th>`; });
//           html += "</tr></thead><tbody>";
//           section.content.forEach(row => {
//             html += "<tr>";
//             headers.forEach(h => { html += `<td class="post-td">${row[h]}</td>`; });
//             html += "</tr>";
//           });
//           html += "</tbody></table></div>";
//         }
//         break;
//       default:
//         html += `<p class="post-p">${section.content}</p>`;
//     }
//   });
//   return html;
// };

// // ═════════════════════════════════════════════════════════════════════════════
// const BlogPostDetail = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const shareRef = useRef(null);

//   const staticPost = staticBlogsData.find(
//     (b) => b.slug === slug || slugify(b.headline) === slug
//   );

//   const { data: postData, isLoading: isPostLoading, error: postError } =
//     useGetPostBySlugQuery(slug, { skip: !slug || !!staticPost });

//   const { data: recentPostsData, isLoading: isRecentPostsLoading } =
//     useGetRecentPostsQuery(5, { skip: !slug });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [shareOpen, setShareOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [formErrors, setFormErrors] = useState({});
//   const [formSent, setFormSent] = useState(false);

//   const { data: searchResults, isLoading: isSearchLoading } = useSearchPostsQuery(
//     { search: searchQuery, limit: 5 },
//     { skip: searchQuery.length < 3 }
//   );

//   useEffect(() => {
//     if (!staticPost && !isPostLoading && postError) navigate("/blog");
//   }, [staticPost, isPostLoading, postError, navigate]);

//   useEffect(() => {
//     const handler = (e) => { if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const post = staticPost || postData?.data?.post;
//   const isLoading = !staticPost && isPostLoading;

//   const combinedRecent = [
//     ...staticBlogsData.filter((p) => slugify(p.headline) !== slug).slice(0, 3),
//     ...(recentPostsData?.data?.posts || recentPostsData || []),
//   ].slice(0, 6);

//   const postTitle = post?.title || post?.headline || "";
//   const postDate = formatDate(post?.publishedAt || post?.createdAt?.$date || post?.date);
//   const postImage = post?.coverImage || post?.image;
//   const postCategory = post?.categories?.[0] || post?.category || "";
//   const postTags = post?.tags || [];
//   const postId = post?.id ?? post?._id ?? "default";
//   const postViews = post?.views || post?.analytics?.views || getDailyGrowingViews(postId);

//   const shareOptions = [
//     { name: "Copy Link", icon: Copy, action: () => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); setShareOpen(false); } },
//     { name: "Facebook", icon: Facebook, action: () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank"); setShareOpen(false); } },
//     { name: "Twitter", icon: Twitter, action: () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(window.location.href)}`, "_blank"); setShareOpen(false); } },
//     { name: "WhatsApp", icon: MessageCircle, action: () => { window.open(`https://wa.me/?text=${encodeURIComponent(postTitle + " " + window.location.href)}`, "_blank"); setShareOpen(false); } },
//     { name: "Instagram", icon: Instagram, action: () => { navigator.clipboard.writeText(window.location.href); alert("Link copied for Instagram!"); setShareOpen(false); } },
//   ];

//   const handleFormChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((p) => ({ ...p, [id]: value }));
//     if (formErrors[id]) setFormErrors((p) => ({ ...p, [id]: "" }));
//   };
//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.email.trim()) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
//     if (!formData.message.trim()) errors.message = "Message is required";
//     setFormErrors(errors);
//     return !Object.keys(errors).length;
//   };
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) { setFormSent(true); setFormData({ name: "", email: "", message: "" }); }
//   };

//   const renderContent = (post) => {
//     if (!post) return null;
//     if (post.content?.sections) {
//       return (
//         <>
//           {post.content.title && (
//             <p className="font-body text-base italic text-gray-400 mb-8 leading-relaxed border-l-2 border-gray-200 pl-4">
//               {post.content.title}
//             </p>
//           )}
//           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertSectionsToHTML(post.content.sections), { ADD_ATTR: ["class", "style", "href", "target", "rel"] }) }} />
//         </>
//       );
//     }
//     if (post.content && typeof post.content === "string") {
//       return <div className="font-body text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />;
//     }
//     return <p className="font-body text-gray-600">{post.excerpt || post.description}</p>;
//   };

//   // ── Loading ──────────────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Barlow:wght@400;500;600;700&display=swap');.font-body{font-family:'Barlow',sans-serif}`}</style>
//         <div className="text-center">
//           <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
//           <p className="font-body text-xs uppercase tracking-widest text-gray-400">Loading article...</p>
//         </div>
//       </div>
//     );
//   }

//   // ── Not found ────────────────────────────────────────────────────────────
//   if (!post) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center px-4" style={{ fontFamily: "'Lora',Georgia,serif" }}>
//         <div className="text-center max-w-md">
//           <X size={48} className="mx-auto mb-4 text-gray-300" />
//           <h2 className="text-2xl font-bold text-black mb-3">Post Not Found</h2>
//           <p className="font-body text-sm text-gray-400 mb-6">The blog post you're looking for couldn't be found or may have been removed.</p>
//           <button onClick={() => navigate("/blog")} className="font-body text-xs font-bold uppercase tracking-widest border-2 border-black text-black px-8 py-3 hover:bg-black hover:text-white transition-all duration-300">
//             Return to Blog
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Sidebar component ────────────────────────────────────────────────────
//   const Sidebar = () => (
//     <aside className="space-y-8">

//       {/* Search */}
//       <div>
//         <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3 flex items-center gap-2">
//           <span className="w-3 h-px bg-gray-300 inline-block" />Search
//         </p>
//         <div className="relative border border-gray-200 focus-within:border-black transition-colors">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search articles..."
//             className="font-body w-full text-xs px-3 py-2.5 pr-9 focus:outline-none text-gray-700 placeholder-gray-300 bg-white"
//           />
//           <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
//         </div>
//       </div>

//       {/* Recent / Search results */}
//       <div>
//         <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 flex items-center gap-2">
//           <span className="w-3 h-px bg-gray-300 inline-block" />
//           {searchQuery.length >= 3 ? "Search Results" : "Recent Posts"}
//         </p>

//         <div className="flex flex-col gap-4">
//           {searchQuery.length >= 3 ? (
//             isSearchLoading ? (
//               <p className="font-body text-xs text-gray-300">Searching...</p>
//             ) : (
//               [
//                 ...staticBlogsData.filter(b =>
//                   b.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                   (b.description || "").toLowerCase().includes(searchQuery.toLowerCase())
//                 ),
//                 ...(searchResults?.data?.posts || []),
//               ].map((r) => (
//                 <button key={r._id || r.id} onClick={() => { navigate(`/blog/${r.slug || slugify(r.title || r.headline)}`); setSidebarOpen(false); }}
//                   className="text-left group flex gap-3 items-start">
//                   <div className="w-16 h-12 shrink-0 overflow-hidden bg-gray-100">
//                     <img src={r.coverImage || r.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                   </div>
//                   <div>
//                     <p className="font-body text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">{r.category}</p>
//                     <p className="text-xs font-bold text-black group-hover:text-gray-500 transition-colors leading-snug line-clamp-2">{r.title || r.headline}</p>
//                   </div>
//                 </button>
//               ))
//             )
//           ) : (
//             combinedRecent.map((rp) => (
//               <button key={rp._id || rp.id} onClick={() => { navigate(`/blog/${rp.slug || slugify(rp.title || rp.headline)}`); setSidebarOpen(false); }}
//                 className="text-left group flex gap-3 items-start">
//                 <div className="w-16 h-12 shrink-0 overflow-hidden bg-gray-100">
//                   {(rp.coverImage || rp.image) ? (
//                     <img src={rp.coverImage || rp.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                   ) : (
//                     <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                       <Star size={14} className="text-gray-300" />
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-body text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">{rp.category}</p>
//                   <p className="text-xs font-bold text-black group-hover:text-gray-500 transition-colors leading-snug line-clamp-2">{rp.title || rp.headline}</p>
//                 </div>
//               </button>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gray-100" />

//       {/* Contact form */}
//       <div>
//         <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 flex items-center gap-2">
//           <span className="w-3 h-px bg-gray-300 inline-block" />Get in Touch
//         </p>
//         {formSent ? (
//           <div className="border border-gray-100 p-4 text-center">
//             <p className="font-body text-xs text-gray-500">Thank you! We'll get back to you soon.</p>
//           </div>
//         ) : (
//           <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
//             {[
//               { id: "name", placeholder: "Your Name", type: "text" },
//               { id: "email", placeholder: "Your Email", type: "email" },
//             ].map(({ id, placeholder, type }) => (
//               <div key={id}>
//                 <input id={id} type={type} value={formData[id]} onChange={handleFormChange} placeholder={placeholder}
//                   className={`font-body w-full text-xs px-3 py-2.5 border focus:outline-none focus:border-black transition-colors text-gray-700 placeholder-gray-300 ${formErrors[id] ? "border-red-300" : "border-gray-200"}`} />
//                 {formErrors[id] && <p className="font-body text-[10px] text-red-400 mt-1">{formErrors[id]}</p>}
//               </div>
//             ))}
//             <div>
//               <textarea id="message" rows={4} value={formData.message} onChange={handleFormChange} placeholder="Your Message"
//                 className={`font-body w-full text-xs px-3 py-2.5 border focus:outline-none focus:border-black transition-colors text-gray-700 placeholder-gray-300 resize-none ${formErrors.message ? "border-red-300" : "border-gray-200"}`} />
//               {formErrors.message && <p className="font-body text-[10px] text-red-400 mt-1">{formErrors.message}</p>}
//             </div>
//             <button type="submit" className="font-body text-xs font-bold uppercase tracking-widest border-2 border-black text-black px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300 self-start">
//               Send Message
//             </button>
//           </form>
//         )}
//       </div>
//     </aside>
//   );

//   // ── Main render ──────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'Lora',Georgia,serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Barlow:wght@400;500;600;700&display=swap');
//         .font-body{font-family:'Barlow',sans-serif}
//         /* Article body typography */
//         .post-h3{font-family:'Lora',Georgia,serif;font-size:1.3rem;font-weight:700;color:#111;margin:2rem 0 0.75rem;line-height:1.3}
//         .post-h4{font-family:'Barlow',sans-serif;font-size:1rem;font-weight:700;color:#333;margin:1.5rem 0 0.5rem;text-transform:uppercase;letter-spacing:.05em}
//         .post-p{font-family:'Barlow',sans-serif;font-size:.95rem;color:#444;line-height:1.85;margin-bottom:1.25rem}
//         .post-ul{margin:0 0 1.25rem 1.25rem;list-style:none}
//         .post-li{font-family:'Barlow',sans-serif;font-size:.9rem;color:#444;line-height:1.75;margin-bottom:.5rem;padding-left:1rem;position:relative}
//         .post-li::before{content:'—';position:absolute;left:0;color:#9ca3af}
//         .post-table-wrap{overflow-x:auto;margin:1.5rem 0}
//         .post-table{width:100%;border-collapse:collapse;font-family:'Barlow',sans-serif;font-size:.8rem}
//         .post-th{border:1px solid #e5e7eb;padding:8px 12px;background:#f9fafb;font-weight:700;text-align:left;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:#374151}
//         .post-td{border:1px solid #e5e7eb;padding:8px 12px;color:#555}
//         .post-p a{color:#0369a1;text-decoration:underline;text-decoration-color:#bae6fd;text-underline-offset:2px}
//         .post-p a:hover{color:#075985}
//         .img-zoom-cover{transition:transform .6s ease}
//         .img-zoom-cover:hover{transform:scale(1.02)}
//       `}</style>

//       {/* ── NAV ── */}
//       <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between py-3 border-b border-gray-50">
//             <button onClick={() => navigate("/blog")}
//               className="font-body inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">
//               <ArrowRight size={12} className="rotate-180" /> All Articles
//             </button>

//             <div className="text-center absolute left-1/2 -translate-x-1/2">
//               <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-none">
//                 JAIMAX<span className="font-normal italic text-gray-400">blog</span>
//               </h1>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* Mobile sidebar toggle */}
//               <button className="lg:hidden font-body text-xs text-gray-400 hover:text-black p-1" onClick={() => setSidebarOpen(o => !o)}>
//                 {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
//               </button>
//             </div>
//           </div>

//           {/* Breadcrumb */}
//           <div className="font-body flex items-center gap-2 py-2.5 text-[10px] text-gray-400 uppercase tracking-wider overflow-x-auto">
//             <button onClick={() => navigate("/blog")} className="hover:text-black transition-colors whitespace-nowrap">Blog</button>
//             <span className="text-gray-200">/</span>
//             {postCategory && <><span className="whitespace-nowrap">{postCategory}</span><span className="text-gray-200">/</span></>}
//             <span className="text-black font-semibold line-clamp-1 truncate max-w-xs">{postTitle}</span>
//           </div>
//         </div>
//       </header>

//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
//           <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white overflow-y-auto p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
//             <div className="flex justify-between items-center mb-6">
//               <span className="font-body text-[10px] font-bold uppercase tracking-widest text-gray-400">Menu</span>
//               <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-black"><X size={16} /></button>
//             </div>
//             <Sidebar />
//           </div>
//         </div>
//       )}

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">

//           {/* ── Article ── */}
//           <article className="lg:col-span-3">

//             {/* Category + Meta */}
//             <div className="font-body flex flex-wrap items-center gap-3 mb-5 text-[10px] uppercase tracking-widest">
//               {postCategory && <span className="font-bold text-black border-b border-black pb-0.5">{postCategory}</span>}
//               {postCategory && <span className="text-gray-200">·</span>}
//               {postDate && <span className="flex items-center gap-1 text-gray-400"><Calendar size={10} />{postDate}</span>}
//               <span className="text-gray-200">·</span>
//               <span className="flex items-center gap-1 text-gray-400"><Eye size={10} />{formatViewsK(postViews)} views</span>

//               {/* Share button */}
//               <div className="ml-auto relative" ref={shareRef}>
//                 <button onClick={() => setShareOpen(o => !o)}
//                   className="font-body inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors border border-gray-200 hover:border-black px-3 py-1.5">
//                   <Share2 size={10} /> Share
//                 </button>
//                 {shareOpen && (
//                   <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 shadow-xl min-w-44 py-1">
//                     {shareOptions.map((opt) => (
//                       <button key={opt.name} onClick={opt.action}
//                         className="font-body w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-xs text-gray-600 hover:text-black">
//                         <opt.icon size={12} className="text-gray-400" />{opt.name}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Headline */}
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black mb-6">
//               {postTitle}
//             </h1>

//             {/* Cover image */}
//             {postImage && (
//               <div className="overflow-hidden mb-8 aspect-video bg-gray-100">
//                 <img src={postImage} alt={postTitle} loading="lazy"
//                   className="img-zoom-cover w-full h-full object-cover" />
//               </div>
//             )}

//             {/* Body */}
//             <div className="max-w-none">
//               {renderContent(post)}
//             </div>

//             {/* Tags */}
//             {postTags.length > 0 && (
//               <div className="mt-10 pt-6 border-t border-gray-100">
//                 <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Tags</p>
//                 <div className="flex flex-wrap gap-2">
//                   {postTags.map((tag, i) => (
//                     <span key={i} className="font-body text-[10px] font-semibold uppercase tracking-wider border border-gray-200 text-gray-400 px-3 py-1 hover:border-black hover:text-black transition-colors cursor-pointer">
//                       {typeof tag === "string" ? tag : tag.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Share row */}
//             <div className="mt-8 pt-6 border-t border-gray-100">
//               <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Share this article</p>
//               <div className="flex flex-wrap gap-2">
//                 {shareOptions.map((opt) => (
//                   <button key={opt.name} onClick={opt.action}
//                     className="font-body inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border border-gray-200 text-gray-400 hover:border-black hover:text-black px-3 py-2 transition-all">
//                     <opt.icon size={10} />{opt.name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Next / Prev navigation */}
//             <div className="mt-10 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {staticBlogsData.filter((p) => slugify(p.headline) !== slug).slice(0, 2).map((p, i) => (
//                 <button key={p.id} onClick={() => navigate(`/blog/${slugify(p.headline)}`)}
//                   className={`group text-left border border-gray-100 hover:border-black transition-colors p-4 flex flex-col gap-2 ${i === 1 ? "sm:items-end sm:text-right" : ""}`}>
//                   <p className="font-body text-[9px] font-bold uppercase tracking-widest text-gray-300">
//                     {i === 0 ? "← Previous" : "Next →"}
//                   </p>
//                   <p className="text-sm font-bold text-black group-hover:text-gray-500 transition-colors line-clamp-2 leading-snug">{p.headline}</p>
//                   <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider">{p.category}</p>
//                 </button>
//               ))}
//             </div>
//           </article>

//           {/* ── Desktop Sidebar ── */}
//           <div className="hidden lg:block lg:col-span-1">
//             <div className="sticky top-20">
//               <Sidebar />
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-gray-100 py-8 px-4 mt-8">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="font-body text-xs text-gray-300 uppercase tracking-widest">© 2025 Jaimax · All rights reserved</p>
//           <div className="font-body flex gap-6 text-[10px] uppercase tracking-widest text-gray-300">
//             <a href="#" className="hover:text-black transition-colors">Privacy</a>
//             <a href="#" className="hover:text-black transition-colors">Terms</a>
//             <a href="#" className="hover:text-black transition-colors">Contact</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default BlogPostDetail;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  Search, Calendar, Eye, Share2,
  Menu, X, Copy, Facebook, MessageCircle,
  Instagram, Twitter, Star, ArrowRight, ChevronLeft,
} from "lucide-react";
import {
  useGetPostBySlugQuery,
  useGetRecentPostsQuery,
  useSearchPostsQuery,
} from "../../../components/Blogsection/BlogEditorApiSlice";

import Blog1 from "../../../assets/Blog1poster.webp";
import Blog2 from "../../../assets/Blog2poster.webp";
import Blog3 from "../../../assets/Blog3poster.webp";
import Blog4 from "../../../assets/Blog4poster.webp";
import Blog5 from "../../../assets/Blog5poster.webp";

// ─── Static blog data ─────────────────────────────────────────────────────────
export const staticBlogsData = [
  {
    id: 5, image: Blog5, headline: "Why Jaimax Is the Smart Move Right Now",
    description: `In today's rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">crypto token</a> emerging globally, Jaimax stands out as a promising digital asset with unique potential for growth.`,
    date: "09 june 25", category: "Investment", trending: true,
    content: {
      title: "Jaimax: The Best Crypto token Emerging from India",
      sections: [
        { type: "paragraph", content: `India is rapidly becoming a hotspot for cryptocurrency adoption. As the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">best crypto token in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment.` },
        { type: "heading", content: "Unmatched Growth Potential at a Low Price Point" },
        { type: "paragraph", content: "Jaimax's current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption." },
        { type: "heading", content: "Strong Use Cases Driving Real-World Utility" },
        { type: "paragraph", content: "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:" },
        { type: "unordered_list", content: ["<b>Decentralized applications (dApps)</b>", "<b>Non-fungible tokens (NFTs)</b>", "<b>Digital payments in e-commerce</b>", "<b>Community rewards and incentives</b>"] },
        { type: "heading", content: "Robust and Secure Blockchain Infrastructure" },
        { type: "paragraph", content: "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project's architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally." },
        { type: "heading", content: "Experienced Leadership and Active Community Engagement" },
        { type: "paragraph", content: "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community." },
        { type: "heading", content: "Clear Roadmap for Future Development" },
        { type: "unordered_list", content: ["Launching Jaimax Foundation Chain with enhanced scalability", "Expanding NFT and DeFi services", "Introducing mobile wallets and user-friendly interfaces", "Partnering with key industry players for exchange listings and integrations"] },
        { type: "heading", content: "In Summary" },
        { type: "paragraph", content: "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity." },
      ],
    },
  },
  {
    id: 4, image: Blog4, headline: "Jaimax: The Future of Cryptocurrency from India to the World",
    description: "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark.",
    date: "09 june 25", category: "Blockchain", hot: true,
    content: {
      title: "The Rise of a Revolutionary Crypto Brand",
      sections: [
        { type: "paragraph", content: `In a world driven by digital transformation, <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">Jaimax</a> is emerging as a pioneering cryptocurrency born in India.` },
        { type: "heading", content: "A Vision Beyond Borders: Jaimax's Global Mission" },
        { type: "paragraph", content: "At its core, <b>Jaimax envisions a decentralized future</b> where financial opportunities are not limited by geography, background, or financial history." },
        { type: "heading", content: "Blockchain Backbone: The Technology Powering Jaimax" },
        { type: "unordered_list", content: ["<b>High TPS:</b> Jaimax supports lightning-fast processing.", "<b>Energy-Efficient Consensus Mechanism:</b> Reduces carbon footprints.", "<b>Smart Contract Integration:</b> Build dApps, DeFi protocols, and NFT platforms."] },
        { type: "heading", content: "Strategic Phased Roadmap: Building With Purpose" },
        { type: "unordered_list", content: ["<b>Phase 1:</b> Community Building and Coin Launch", "<b>Phase 2:</b> Market Expansion & Platform Integration", "<b>Phase 3:</b> Smart Contract and Developer Toolkit Release", "<b>Phase 4:</b> Global Outreach & Utility Enhancement", "<b>Phase 5:</b> Institutional Partnerships and Governance DAO"] },
        { type: "heading", content: "Conclusion: Jaimax is the Future" },
        { type: "paragraph", content: "Jaimax is more than just a crypto token — it's a revolution from India, built for the world." },
      ],
    },
  },
  {
    id: 1, image: Blog1, headline: "The Power of Early Investment: Why Now is the Time for Jaimax",
    description: "In the dynamic world of cryptocurrency, success often belongs to those who act early. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India.",
    date: "05 may 25", category: "Market Trends", trending: true, featured: true,
    content: {
      title: "Timing Defines Opportunity in Cryptocurrency",
      sections: [
        { type: "paragraph", content: `In the dynamic world of <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">cryptocurrency</a>, success often belongs to those who act early.` },
        { type: "heading", content: "Why Jaimax is Gaining Attention" },
        { type: "paragraph", content: "What separates Jaimax from the sea of altcoins? It's the combination of technology, local market alignment, transparent development, and long-term vision." },
        { type: "heading", content: "Why ₹0.50 is a Golden Entry Point" },
        { type: "unordered_list", content: ["Lowest possible risk with highest potential reward", "Ideal for long-term holding and short-term trading", "Entry before upcoming upgrades and visibility boosts"] },
        { type: "heading", content: "Jaimax vs. Other Crypto Coins: A Comparison" },
        { type: "table", content: [{ Feature: "Price Accessibility", Jaimax: "₹0.50 (entry stage)", "Generic Altcoin": "Often above ₹10+" }, { Feature: "Localized Growth Focus", Jaimax: "India-first strategy", "Generic Altcoin": "Global but unfocused" }, { Feature: "Technology", Jaimax: "Scalable, fast, secure", "Generic Altcoin": "Average blockchain models" }, { Feature: "Roadmap Transparency", Jaimax: "Clear, public, progressive", "Generic Altcoin": "Often unclear or delayed" }] },
        { type: "heading", content: "Conclusion: The Smart Move Is to Act Early" },
        { type: "paragraph", content: `Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">best crypto coins in India</a> today.` },
      ],
    },
  },
  {
    id: 2, image: Blog2, headline: "How Jaimax Works: A Deep Dive into Our Coin and Technology",
    description: "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance and accessibility, Jaimax is rapidly gaining momentum.",
    date: "12 may 25", category: "Technology",
    content: {
      title: "Jaimax: The Best Crypto Coin in India",
      sections: [
        { type: "paragraph", content: `Jaimax is rapidly gaining momentum as the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">best crypto coin in India</a>.` },
        { type: "heading", content: "The Technology Backbone of Jaimax" },
        { type: "subheading", content: "High-Speed Scalable Blockchain" },
        { type: "unordered_list", content: ["Block Generation Time: 2 seconds", "Transaction Speed: Over 5,000 TPS", "Network Uptime: 99.99%", "Gas Fees: Extremely low and consistent"] },
        { type: "heading", content: "Coin Supply and Investment Structure" },
        { type: "unordered_list", content: ["Total Supply: 1 Billion Jaimax coins", "Launch Price: ₹0.10", "Current Price: ₹0.50", "Public Trading Launch: Begins after Phase 2"] },
        { type: "heading", content: "Conclusion: Secure Your Place in the Future with Jaimax" },
        { type: "paragraph", content: "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today." },
      ],
    },
  },
  {
    id: 3, image: Blog3, headline: "Understanding Cryptocurrency: A Simple Guide for New Users",
    description: "Cryptocurrency has dramatically transformed the financial landscape. This guide will break down cryptocurrency in simple terms and introduce you to the exciting opportunities it presents.",
    date: "13 may 25", category: "Crypto News",
    content: {
      title: "What is Cryptocurrency?",
      sections: [
        { type: "paragraph", content: "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network." },
        { type: "heading", content: "How Does Cryptocurrency Work?" },
        { type: "paragraph", content: "Cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring both the transaction and the identity of the sender are protected." },
        { type: "heading", content: "Types of Cryptocurrency" },
        { type: "subheading", content: "Bitcoin (BTC)" },
        { type: "paragraph", content: "Bitcoin is the original cryptocurrency, introduced in 2009. It remains the largest by market capitalization and is often regarded as 'digital gold.'" },
        { type: "subheading", content: "Ethereum (ETH)" },
        { type: "paragraph", content: "Ethereum enables developers to create smart contracts and decentralized applications (dApps)." },
        { type: "heading", content: "Jaimax: A Top Cryptocurrency to Invest in India" },
        { type: "paragraph", content: `For those looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity with its unique approach and growing community.` },
        { type: "heading", content: "Conclusion" },
        { type: "paragraph", content: "Cryptocurrency is revolutionizing finance. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising." },
      ],
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const slugify = (str) =>
  str ? str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "") : "";

function getDailyGrowingViews(postId, base = 1000) {
  const id = String(postId ?? "default");
  const startDate = new Date("2025-01-01");
  const today = new Date();
  const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  let seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  let views = base;
  for (let i = 0; i < daysPassed; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    views += 20 + (seed % 80);
  }
  return views;
}

function formatViewsK(v) {
  const n = Number(v) || 0;
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

const formatDate = (dateString) => {
  if (!dateString) return "";
  if (String(dateString).match(/^\d{1,2}\s+\w+\s+\d{2}$/)) return dateString;
  let date;
  if (typeof dateString === "object" && dateString.$date) date = new Date(dateString.$date);
  else date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const convertSectionsToHTML = (sections) => {
  let html = "";
  sections.forEach((section) => {
    switch (section.type) {
      case "heading":
        html += `<h3 class="post-h3">${section.content}</h3>`;
        break;
      case "subheading":
        html += `<h4 class="post-h4">${section.content}</h4>`;
        break;
      case "paragraph":
        html += `<p class="post-p">${section.content}</p>`;
        break;
      case "unordered_list":
        html += '<ul class="post-ul">';
        section.content.forEach((item) => { html += `<li class="post-li">${item}</li>`; });
        html += "</ul>";
        break;
      case "table":
        if (Array.isArray(section.content) && section.content.length) {
          const headers = Object.keys(section.content[0]);
          html += '<div class="post-table-wrap"><table class="post-table"><thead><tr>';
          headers.forEach(h => { html += `<th class="post-th">${h}</th>`; });
          html += "</tr></thead><tbody>";
          section.content.forEach(row => {
            html += "<tr>";
            headers.forEach(h => { html += `<td class="post-td">${row[h]}</td>`; });
            html += "</tr>";
          });
          html += "</tbody></table></div>";
        }
        break;
      default:
        html += `<p class="post-p">${section.content}</p>`;
    }
  });
  return html;
};

// ═════════════════════════════════════════════════════════════════════════════
const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const shareRef = useRef(null);

  const staticPost = staticBlogsData.find(
    (b) => b.slug === slug || slugify(b.headline) === slug
  );

  const { data: postData, isLoading: isPostLoading, error: postError } =
    useGetPostBySlugQuery(slug, { skip: !slug || !!staticPost });

  const { data: recentPostsData, isLoading: isRecentPostsLoading } =
    useGetRecentPostsQuery(5, { skip: !slug });

  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [formSent, setFormSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: searchResults, isLoading: isSearchLoading } = useSearchPostsQuery(
    { search: searchQuery, limit: 5 },
    { skip: searchQuery.length < 3 }
  );

  useEffect(() => {
    if (!staticPost && !isPostLoading && postError) navigate("/blog");
  }, [staticPost, isPostLoading, postError, navigate]);

  useEffect(() => {
    const handler = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCopy = () => {
  navigator.clipboard.writeText(window.location.href);

  setCopied(true);
  setShareOpen(false); // close dropdown

  setTimeout(() => {
    setCopied(false);
  }, 1500);
};

  const post = staticPost || postData?.data?.post;
  const isLoading = !staticPost && isPostLoading;

  const combinedRecent = [
    ...staticBlogsData.filter((p) => slugify(p.headline) !== slug).slice(0, 3),
    ...(recentPostsData?.data?.posts || recentPostsData || []),
  ].slice(0, 6);

  const postTitle = post?.title || post?.headline || "";
  const postDate = formatDate(post?.publishedAt || post?.createdAt?.$date || post?.date);
  const postImage = post?.coverImage || post?.image;
  const postCategory = post?.categories?.[0] || post?.category || "";
  const postTags = post?.tags || [];
  const postId = post?.id ?? post?._id ?? "default";
  const postViews = post?.views || post?.analytics?.views || getDailyGrowingViews(postId);

  const shareOptions = [
    // {
    //   name: "Copy Link", icon: Copy, action: () => {
    //     navigator.clipboard.writeText(window.location.href);
    //     alert("Link copied!");
    //     setShareOpen(false);
    //   }
    // },
    {
      name: "Copy Link", icon: Copy, action:handleCopy,
      
    },
    {
      name: "Facebook", icon: Facebook, action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
        setShareOpen(false);
      }
    },
    {
      name: "Twitter", icon: Twitter, action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
        setShareOpen(false);
      }
    },
    {
      name: "WhatsApp", icon: MessageCircle, action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(postTitle + " " + window.location.href)}`, "_blank");
        setShareOpen(false);
      }
    },
    {
      name: "Instagram", icon: Instagram, action: handleCopy,
    },
  ];

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
    if (formErrors[id]) setFormErrors((p) => ({ ...p, [id]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSent(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const renderContent = (post) => {
    if (!post) return null;
    if (post.content?.sections) {
      return (
        <>
          {post.content.title && (
            <p className="text-sm italic text-[#6b7280] mb-8 leading-relaxed border-l-2 border-[#7fc742] pl-4">
              {post.content.title}
            </p>
          )}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                convertSectionsToHTML(post.content.sections),
                { ADD_ATTR: ["class", "style", "href", "target", "rel"] }
              )
            }}
          />
        </>
      );
    }
    if (post.content && typeof post.content === "string") {
      return (
        <div
          className="text-[#6b7280] leading-relaxed text-[0.95rem]"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      );
    }
    return <p className="text-[#6b7280] text-[0.95rem] leading-relaxed">{post.excerpt || post.description}</p>;
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e8f5e0] flex items-center justify-center" style={{ fontFamily: "'Sora', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#2d7a3a] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-[#6b7280]">Loading article...</p>
        </div>
      </div>
    );
  }

  // ── Not found ────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div
        className="min-h-screen bg-[#e8f5e0] flex items-center justify-center px-4"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
            <X size={28} className="text-[#9ca3af]" />
          </div>
          <h2 className="text-2xl font-bold text-[#111827] mb-3">Post Not Found</h2>
          <p className="text-sm text-[#6b7280] mb-8">The blog post you're looking for couldn't be found or may have been removed.</p>
          <button
            onClick={() => navigate("/blog")}
            className="text-sm font-semibold bg-[#2d7a3a] text-white px-8 py-3 hover:bg-[#1a3d22] transition-colors"
            style={{ borderRadius: "6px" }}
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  // ── Sidebar component ────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside className="space-y-8">

      {/* Search */}
      <div>
        <p className="text-xs font-bold text-[#2d7a3a] mb-3 flex items-center gap-2">
          <span className="w-4 h-0.5 bg-[#7fc742] inline-block rounded-full" />
          Search
        </p>
        <div
          className="relative border border-[rgba(45,122,58,0.30)] focus-within:border-[#2d7a3a] transition-colors bg-white"
          style={{ borderRadius: "6px" }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full text-xs px-3 py-2.5 pr-9 focus:outline-none text-[#111827] placeholder-[#9ca3af] bg-transparent"
          />
          <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
        </div>
      </div>

      {/* Recent / Search results */}
      <div>
        <p className="text-xs font-bold text-[#2d7a3a] mb-4 flex items-center gap-2">
          <span className="w-4 h-0.5 bg-[#7fc742] inline-block rounded-full" />
          {searchQuery.length >= 3 ? "Search Results" : "Recent Posts"}
        </p>

        <div className="flex flex-col gap-4">
          {searchQuery.length >= 3 ? (
            isSearchLoading ? (
              <p className="text-xs text-[#9ca3af]">Searching...</p>
            ) : (
              [
                ...staticBlogsData.filter(b =>
                  b.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (b.description || "").toLowerCase().includes(searchQuery.toLowerCase())
                ),
                ...(searchResults?.data?.posts || []),
              ].map((r) => (
                <button
                  key={r._id || r.id}
                  onClick={() => { navigate(`/blog/${r.slug || slugify(r.title || r.headline)}`); setSidebarOpen(false); }}
                  className="text-left group flex gap-3 items-start"
                >
                  <div className="w-16 h-12 shrink-0 overflow-hidden bg-[#e8f5e0]" style={{ borderRadius: "6px" }}>
                    <img
                      src={r.coverImage || r.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span
                      className="inline-block text-[10px] font-semibold text-[#2d7a3a] bg-[rgba(45,122,58,0.10)] px-2 py-0.5 mb-1"
                      style={{ borderRadius: "6px" }}
                    >
                      {r.category}
                    </span>
                    <p className="text-xs font-semibold text-[#111827] group-hover:text-[#2d7a3a] transition-colors leading-snug line-clamp-2">
                      {r.title || r.headline}
                    </p>
                  </div>
                </button>
              ))
            )
          ) : (
            combinedRecent.map((rp) => (
              <button
                key={rp._id || rp.id}
                onClick={() => { navigate(`/blog/${rp.slug || slugify(rp.title || rp.headline)}`); setSidebarOpen(false); }}
                className="text-left group flex gap-3 items-start"
              >
                <div className="w-16 h-12 shrink-0 overflow-hidden bg-[#e8f5e0]" style={{ borderRadius: "6px" }}>
                  {(rp.coverImage || rp.image) ? (
                    <img
                      src={rp.coverImage || rp.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8f5e0] flex items-center justify-center">
                      <Star size={14} className="text-[#b8e07c]" />
                    </div>
                  )}
                </div>
                <div>
                  <span
                    className="inline-block text-[10px] font-semibold text-[#2d7a3a] bg-[rgba(45,122,58,0.10)] px-2 py-0.5 mb-1"
                    style={{ borderRadius: "6px" }}
                  >
                    {rp.category}
                  </span>
                  <p className="text-xs font-semibold text-[#111827] group-hover:text-[#2d7a3a] transition-colors leading-snug line-clamp-2">
                    {rp.title || rp.headline}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(45,122,58,0.15)]" />

      {/* Contact form */}
      <div>
        <p className="text-xs font-bold text-[#2d7a3a] mb-4 flex items-center gap-2">
          <span className="w-4 h-0.5 bg-[#7fc742] inline-block rounded-full" />
          Get in Touch
        </p>
        {formSent ? (
          <div
            className="border border-[rgba(45,122,58,0.30)] bg-[rgba(45,122,58,0.05)] p-4 text-center"
            style={{ borderRadius: "6px" }}
          >
            <p className="text-xs text-[#2d7a3a] font-semibold">Thank you! We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            {[
              { id: "name", placeholder: "Your Name", type: "text" },
              { id: "email", placeholder: "Your Email", type: "email" },
            ].map(({ id, placeholder, type }) => (
              <div key={id}>
                <input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleFormChange}
                  placeholder={placeholder}
                  style={{ borderRadius: "6px" }}
                  className={`w-full text-xs px-3 py-2.5 border focus:outline-none focus:border-[#2d7a3a] transition-colors text-[#111827] placeholder-[#9ca3af] bg-white ${formErrors[id] ? "border-red-300" : "border-[rgba(45,122,58,0.30)]"}`}
                />
                {formErrors[id] && <p className="text-[10px] text-red-500 mt-1">{formErrors[id]}</p>}
              </div>
            ))}
            <div>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Your Message"
                style={{ borderRadius: "6px" }}
                className={`w-full text-xs px-3 py-2.5 border focus:outline-none focus:border-[#2d7a3a] transition-colors text-[#111827] placeholder-[#9ca3af] resize-none bg-white ${formErrors.message ? "border-red-300" : "border-[rgba(45,122,58,0.30)]"}`}
              />
              {formErrors.message && <p className="text-[10px] text-red-500 mt-1">{formErrors.message}</p>}
            </div>
            <button
              type="submit"
              style={{ borderRadius: "6px" }}
              className="text-xs font-bold bg-[#2d7a3a] text-white px-5 py-2.5 hover:bg-[#1a3d22] transition-colors self-start"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </aside>
  );

  // ── Main render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#e8f5e0] text-[#111827]" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Article body typography via scoped style */}
      <style>{`
        .article-body .post-h3 {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a3d22;
          margin: 2rem 0 0.75rem;
          line-height: 1.35;
        }
        .article-body .post-h4 {
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #2d7a3a;
          margin: 1.5rem 0 0.5rem;
          text-transform: uppercase;
        }
        .article-body .post-p {
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          color: #374151;
          line-height: 1.85;
          margin-bottom: 1.25rem;
        }
        .article-body .post-ul {
          margin: 0 0 1.25rem 0;
          list-style: none;
          padding: 0;
        }
        .article-body .post-li {
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          color: #374151;
          line-height: 1.75;
          margin-bottom: 0.5rem;
          padding: 0.5rem 0.75rem 0.5rem 1rem;
          border-left: 3px solid #7fc742;
          background: rgba(45,122,58,0.04);
          border-radius: 0 6px 6px 0;
        }
        .article-body .post-table-wrap {
          overflow-x: auto;
          margin: 1.5rem 0;
          border-radius: 6px;
          border: 1px solid rgba(45,122,58,0.20);
        }
        .article-body .post-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Sora', sans-serif;
          font-size: 0.8rem;
        }
        .article-body .post-th {
          padding: 10px 14px;
          background: #1a3d22;
          font-weight: 700;
          text-align: left;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #ffffff;
          border-bottom: 2px solid #7fc742;
        }
        .article-body .post-td {
          padding: 10px 14px;
          color: #374151;
          border-bottom: 1px solid rgba(45,122,58,0.12);
          background: #fff;
        }
        .article-body .post-tr:last-child .post-td {
          border-bottom: none;
        }
        .article-body .post-p a {
          color: #2d7a3a;
          text-decoration: underline;
          text-decoration-color: #b8e07c;
          text-underline-offset: 2px;
        }
        .article-body .post-p a:hover {
          color: #1a3d22;
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="border-b border-[rgba(45,122,58,0.20)] sticky top-0 bg-[#e8f5e0]/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center py-3">

            {/* Logo */}
             <div className="text-center pt-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none" style={{ color: "var(--color-brand-dark)" }}>
                JAI<span style={{ color: "var(--color-brand-accent)" }}>MAX</span>
                <span className="font-normal text-base ml-1" style={{ color: "var(--color-text-secondary)" }}>blog</span>
              </h1>
             
            </div>

          </div>

{/* Back link */}
            <button
              onClick={() => navigate("/blogGrid")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d7a3a] hover:text-[#1a3d22] transition-colors"
            >
              <ChevronLeft size={14} />
              All Articles
            </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 py-2 text-[10px] text-[#6b7280] overflow-x-auto">
            <button onClick={() => navigate("/blogGrid")} className="hover:text-[#2d7a3a] hover:underline transition-colors whitespace-nowrap font-medium">
              Blog
            </button>
            <span className="text-[#b8e07c]">/</span>
            {postCategory && (
              <>
                <span className="whitespace-nowrap font-medium">{postCategory}</span>
                <span className="text-[#b8e07c]">/</span>
              </>
            )}
            <span className="text-[#111827] font-semibold line-clamp-1 truncate max-w-xs">{postTitle}</span>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#0f2414]/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-[#e8f5e0] overflow-y-auto p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-[#2d7a3a]">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-[#6b7280] hover:text-[#111827]">
                <X size={16} />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* ── Article ── */}
          <article className="lg:col-span-3">

            {/* Category + Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5 text-[11px]">
              {postCategory && (
                <span
                  className="font-bold text-white bg-[#2d7a3a] px-3 py-1"
                  style={{ borderRadius: "6px" }}
                >
                  {postCategory}
                </span>
              )}
              {postDate && (
                <span className="flex items-center gap-1 text-[#6b7280] font-medium">
                  <Calendar size={11} className="text-[#4a9858]" />
                  {postDate}
                </span>
              )}
              <span className="flex items-center gap-1 text-[#6b7280] font-medium">
                <Eye size={11} className="text-[#4a9858]" />
                {formatViewsK(postViews)} views
              </span>

              {/* Share button */}
              <div className="ml-auto relative" ref={shareRef}>
                <button
                  onClick={() => setShareOpen(o => !o)}
                  style={{ borderRadius: "6px" }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d7a3a] border border-[rgba(45,122,58,0.40)] hover:bg-[#2d7a3a] hover:text-white hover:border-[#2d7a3a] transition-all px-3 py-1.5"
                >
                  <Share2 size={11} /> Share
                </button>
                {shareOpen && (
                  <div
                    className="absolute right-0 top-full mt-1 z-20 bg-white border border-[rgba(45,122,58,0.20)] shadow-xl min-w-44 py-1"
                    style={{ borderRadius: "6px" }}
                  >
                    {shareOptions.map((opt) => (
                      <button
                        key={opt.name}
                        onClick={opt.action}
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-[#e8f5e0] transition-colors text-xs text-[#374151] hover:text-[#1a3d22] font-medium"
                      >
                        <opt.icon size={12} className="text-[#4a9858]" />
                        {opt.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl leading-tight text-[#1a3d22] mb-6">
              {postTitle}
            </h1>

            {/* Cover image */}
            {postImage && (
              <div
                className="overflow-hidden mb-8 aspect-video bg-[#b8e07c]"
                style={{ borderRadius: "6px" }}
              >
                <img
                  src={postImage}
                  alt={postTitle}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            )}

            {/* Body */}
            <div className="max-w-none">
              {renderContent(post)}
            </div>

            {/* Tags */}
            {postTags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[rgba(45,122,58,0.15)]">
                <p className="text-xs font-bold text-[#2d7a3a] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {postTags.map((tag, i) => (
                    <span
                      key={i}
                      style={{ borderRadius: "6px" }}
                      className="text-[11px] font-semibold border border-[rgba(45,122,58,0.30)] text-[#2d7a3a] px-3 py-1 hover:bg-[#2d7a3a] hover:text-white hover:border-[#2d7a3a] transition-all cursor-pointer"
                    >
                      {typeof tag === "string" ? tag : tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share row */}
            <div className="mt-8 pt-6 border-t border-[rgba(45,122,58,0.15)]">
              <p className="text-xs font-bold text-[#2d7a3a] mb-3">Share this article</p>
              <div className="flex flex-wrap gap-2">
                {shareOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={opt.action}
                    style={{ borderRadius: "6px" }}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold border border-[rgba(45,122,58,0.30)] text-[#2d7a3a] hover:bg-[#2d7a3a] hover:text-white hover:border-[#2d7a3a] px-3 py-2 transition-all"
                  >
                    <opt.icon size={11} />
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="mt-10 pt-6 border-t border-[rgba(45,122,58,0.15)] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staticBlogsData.filter((p) => slugify(p.headline) !== slug).slice(0, 2).map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/blogGrid/${slugify(p.headline)}`)}
                  style={{ borderRadius: "6px" }}
                  className={`group text-left border border-[rgba(45,122,58,0.20)] bg-white hover:border-[#2d7a3a] hover:bg-[rgba(45,122,58,0.04)] transition-all p-4 flex flex-col gap-2 ${i === 1 ? "sm:items-end sm:text-right" : ""}`}
                >
                  <p className="text-[10px] font-bold text-[#9ca3af]">
                    {i === 0 ? "← Previous" : "Next →"}
                  </p>
                  <p className="text-sm font-bold text-[#1a3d22] group-hover:text-[#2d7a3a] transition-colors line-clamp-2 leading-snug">
                    {p.headline}
                  </p>
                  <span
                    className="text-[10px] font-semibold text-[#2d7a3a] bg-[rgba(45,122,58,0.10)] px-2 py-0.5 self-start"
                    style={{ borderRadius: "6px" }}
                  >
                    {p.category}
                  </span>
                </button>
              ))}
            </div>
          </article>

          {/* ── Desktop Sidebar ── */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>

        </div>
      </main>

    {copied && (
  <div
    className="
      fixed bottom-6 right-6 z-50
      flex items-center gap-2
      px-4 py-2
      text-xs font-semibold
      text-white
      bg-[var(--color-brand-primary)]
      rounded-lg shadow-lg
      animate-fadeIn
    "
  >
    ✓ Link Copied
  </div>
)}
    </div>
  );
};

export default BlogPostDetail;
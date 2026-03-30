

// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DOMPurify from "dompurify";
// import {
//   Search,
//   TrendingUp,
//   Star,
//   Flame,
//   Eye,
//   Calendar,
//   ArrowRight,
//   Share2,
// } from "lucide-react";
// import Seo from "../../../SeoContent/Seo";
// import {
//   useGetPublishedPostsQuery,
//   useGetRecentPostsQuery,
//   useGetCategoriesQuery,
// } from "../../../components/Blogsection/BlogEditorApiSlice";

// import Blog1 from "../../../assets/Blog1poster.webp";
// import Blog2 from "../../../assets/Blog2poster.webp";
// import Blog3 from "../../../assets/Blog3poster.webp";
// import Blog4 from "../../../assets/Blog4poster.webp";
// import Blog5 from "../../../assets/Blog5poster.webp";

// // ─── Static blog data (unchanged) ────────────────────────────────────────────
// const blogsData = [
//   {
//     id: 5,
//     image: Blog5,
//     headline: "Why Jaimax Is the Smart Move Right Now",
//     description: `In today's rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many crypto tokens emerging globally, Jaimax stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem.`,
//     date: "09 june 25",
//     category: "Investment",
//     trending: true,
//     content: {
//       title: "Jaimax: The Best Crypto token Emerging from India",
//       sections: [
//         {
//           type: "paragraph",
//           content: `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto token in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment.`,
//         },
//         {
//           type: "heading",
//           content: "Unmatched Growth Potential at a Low Price Point",
//         },
//         {
//           type: "paragraph",
//           content:
//             "Jaimax's current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum.",
//         },
//         {
//           type: "heading",
//           content: "Strong Use Cases Driving Real-World Utility",
//         },
//         {
//           type: "paragraph",
//           content:
//             "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:",
//         },
//         {
//           type: "unordered_list",
//           content: [
//             "<b>Decentralized applications (dApps)</b>",
//             "<b>Non-fungible tokens (NFTs)</b>",
//             "<b>Digital payments in e-commerce</b>",
//             "<b>Community rewards and incentives</b>",
//           ],
//         },
//         {
//           type: "heading",
//           content: "Robust and Secure Blockchain Infrastructure",
//         },
//         {
//           type: "paragraph",
//           content:
//             "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project's architecture emphasizes scalability and security.",
//         },
//         { type: "heading", content: "In Summary" },
//         {
//           type: "paragraph",
//           content:
//             "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity.",
//         },
//       ],
//     },
//   },
//   {
//     id: 4,
//     image: Blog4,
//     headline: "Jaimax: The Future of Cryptocurrency from India to the World",
//     description:
//       "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark. Positioned at the intersection of blockchain technology, financial empowerment, and digital freedom.",
//     date: "09 june 25",
//     category: "Blockchain",
//     hot: true,
//     content: {
//       title: "The Rise of a Revolutionary Crypto Brand",
//       sections: [
//         {
//           type: "paragraph",
//           content: `In a world driven by digital transformation and decentralized innovation, <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">Jaimax</a> is emerging as a pioneering cryptocurrency born in India.`,
//         },
//         {
//           type: "heading",
//           content: "A Vision Beyond Borders: Jaimax's Global Mission",
//         },
//         {
//           type: "paragraph",
//           content:
//             "At its core, Jaimax envisions a decentralized future where financial opportunities are not limited by geography, background, or financial history.",
//         },
//         {
//           type: "heading",
//           content: "Blockchain Backbone: The Technology Powering Jaimax",
//         },
//         {
//           type: "unordered_list",
//           content: [
//             "<b>High TPS:</b> Jaimax supports lightning-fast processing.",
//             "<b>Energy-Efficient Consensus Mechanism:</b> Reduces carbon footprints.",
//             "<b>Smart Contract Integration:</b> Build dApps, DeFi protocols, and NFT platforms.",
//           ],
//         },
//         { type: "heading", content: "Conclusion: Jaimax is the Future" },
//         {
//           type: "paragraph",
//           content:
//             "Jaimax is more than just a crypto token — it's a revolution from India, built for the world.",
//         },
//       ],
//     },
//   },
//   {
//     id: 1,
//     image: Blog1,
//     headline: "The Power of Early Investment: Why Now is the Time for Jaimax",
//     description:
//       "In the dynamic world of cryptocurrency, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India.",
//     date: "05 may 25",
//     category: "Market Trends",
//     trending: true,
//     featured: true,
//     content: {
//       title: "Timing Defines Opportunity in Cryptocurrency",
//       sections: [
//         {
//           type: "paragraph",
//           content: `In the dynamic world of <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">cryptocurrency</a>, success often belongs to those who act early.`,
//         },
//         { type: "heading", content: "Why Jaimax is Gaining Attention" },
//         {
//           type: "paragraph",
//           content:
//             "What separates Jaimax from the sea of altcoins? It's the combination of technology, local market alignment, transparent development, and long-term vision.",
//         },
//         { type: "heading", content: "Why ₹0.50 is a Golden Entry Point" },
//         {
//           type: "unordered_list",
//           content: [
//             "Lowest possible risk with highest potential reward",
//             "Ideal for long-term holding and short-term trading",
//             "Entry before upcoming upgrades and visibility boosts",
//           ],
//         },
//         {
//           type: "heading",
//           content: "Conclusion: The Smart Move Is to Act Early",
//         },
//         {
//           type: "paragraph",
//           content: `Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto coins in India</a> today.`,
//         },
//       ],
//     },
//   },
//   {
//     id: 2,
//     image: Blog2,
//     headline: "How Jaimax Works: A Deep Dive into Our Coin and Technology",
//     description:
//       "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the best crypto coin in India.",
//     date: "12 may 25",
//     category: "Technology",
//     content: {
//       title: "Jaimax: The Best Crypto Coin in India",
//       sections: [
//         {
//           type: "paragraph",
//           content: `Jaimax is revolutionizing the way India experiences cryptocurrency. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto to invest in India</a>.`,
//         },
//         { type: "heading", content: "The Technology Backbone of Jaimax" },
//         {
//           type: "unordered_list",
//           content: [
//             "Block Generation Time: 2 seconds",
//             "Transaction Speed: Over 5,000 TPS",
//             "Network Uptime: 99.99%",
//             "Gas Fees: Extremely low and consistent",
//           ],
//         },
//         { type: "heading", content: "Coin Supply and Investment Structure" },
//         {
//           type: "unordered_list",
//           content: [
//             "Total Supply: 1 Billion Jaimax coins",
//             "Launch Price: ₹0.10",
//             "Current Price: ₹0.50",
//             "Public Trading Launch: After Phase 2",
//           ],
//         },
//         {
//           type: "heading",
//           content: "Conclusion: Secure Your Place in the Future with Jaimax",
//         },
//         {
//           type: "paragraph",
//           content:
//             "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today.",
//         },
//       ],
//     },
//   },
//   {
//     id: 3,
//     image: Blog3,
//     headline: "Understanding Cryptocurrency: A Simple Guide for New Users",
//     description:
//       "Cryptocurrency has dramatically transformed the financial landscape, offering an innovative and decentralized method of transactions that challenges traditional financial systems. This guide will break down cryptocurrency in simple terms.",
//     date: "13 may 25",
//     category: "Crypto News",
//     content: {
//       title: "What is Cryptocurrency?",
//       sections: [
//         {
//           type: "paragraph",
//           content:
//             "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network.",
//         },
//         { type: "heading", content: "How Does Cryptocurrency Work?" },
//         {
//           type: "paragraph",
//           content:
//             "Cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring that both the transaction and the identity of the sender are protected.",
//         },
//         { type: "heading", content: "Types of Cryptocurrency" },
//         { type: "subheading", content: "Bitcoin (BTC)" },
//         {
//           type: "paragraph",
//           content:
//             "Bitcoin is the original cryptocurrency, introduced in 2009. It remains the largest by market capitalization.",
//         },
//         { type: "subheading", content: "Ethereum (ETH)" },
//         {
//           type: "paragraph",
//           content:
//             "Ethereum enables developers to create smart contracts and decentralized applications (dApps).",
//         },
//         {
//           type: "heading",
//           content: "Jaimax: A Top Cryptocurrency to Invest in India",
//         },
//         {
//           type: "paragraph",
//           content: `For those looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity with its unique approach and growing community.`,
//         },
//         { type: "heading", content: "Conclusion" },
//         {
//           type: "paragraph",
//           content:
//             "Cryptocurrency is revolutionizing finance. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising.",
//         },
//       ],
//     },
//   },
// ];

// // ─── Helpers (unchanged) ─────────────────────────────────────────────────────
// function getManualDailyViews({ baseViews = 2000, startDate, id }) {
//   const base = Number(baseViews) || 2000;
//   const start = new Date(startDate || "2025-01-01");
//   const today = new Date();
//   const daysPassed = Math.max(
//     0,
//     Math.floor((today - start) / (1000 * 60 * 60 * 24)),
//   );
//   const seedStr = String(id ?? "default");
//   let seed = seedStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
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

// function slugify(str) {
//   return str
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^\w-]/g, "");
// }

// const convertSectionsToHTML = (sections) => {
//   let html = "";
//   sections.forEach((section) => {
//     switch (section.type) {
//       case "heading":
//         html += `<h3 style="font-size:1.15rem;font-weight:700;margin:1.75rem 0 0.75rem;color:#1a3d22;font-family:'Sora',sans-serif;border-left:3px solid #7fc742;padding-left:12px">${section.content}</h3>`;
//         break;
//       case "subheading":
//         html += `<h4 style="font-size:1rem;font-weight:600;margin:1.25rem 0 0.5rem;color:#2d7a3a;font-family:'Sora',sans-serif">${section.content}</h4>`;
//         break;
//       case "paragraph":
//         html += `<p style="margin-bottom:1.1rem;color:#374151;line-height:1.85;font-family:'Sora',sans-serif;font-size:0.95rem">${section.content}</p>`;
//         break;
//       case "unordered_list":
//         html +=
//           '<ul style="margin-bottom:1.1rem;padding-left:1.5rem;list-style:none">';
//         section.content.forEach((item) => {
//           html += `<li style="margin-bottom:0.5rem;color:#374151;line-height:1.75;font-family:'Sora',sans-serif;font-size:0.9rem;padding-left:1rem;position:relative"><span style="position:absolute;left:-4px;color:#7fc742;font-weight:700">›</span>${item}</li>`;
//         });
//         html += "</ul>";
//         break;
//       case "table":
//         html +=
//           '<div style="overflow-x:auto;margin-bottom:1rem"><table style="width:100%;border-collapse:collapse;font-family:Sora,sans-serif;font-size:0.85rem">';
//         if (Array.isArray(section.content) && section.content.length) {
//           const headers = Object.keys(section.content[0]);
//           html += "<thead><tr>";
//           headers.forEach((h) => {
//             html += `<th style="border:1px solid rgba(45,122,58,0.2);padding:8px 12px;background:rgba(45,122,58,0.08);font-weight:600;text-align:left;color:#1a3d22">${h}</th>`;
//           });
//           html += "</tr></thead><tbody>";
//           section.content.forEach((row) => {
//             html += "<tr>";
//             headers.forEach((h) => {
//               html += `<td style="border:1px solid rgba(45,122,58,0.15);padding:8px 12px;color:#374151">${row[h]}</td>`;
//             });
//             html += "</tr>";
//           });
//           html += "</tbody></table></div>";
//         }
//         break;
//       default:
//         html += `<p style="margin-bottom:1rem;color:#374151;line-height:1.85;font-family:'Sora',sans-serif">${section.content}</p>`;
//     }
//   });
//   return html;
// };

// // ─── Scroll reveal (unchanged logic) ─────────────────────────────────────────
// function useReveal() {
//   const ref = useRef(null);
//   const [v, setV] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) {
//           setV(true);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.08 },
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, v];
// }
// function Reveal({ children, delay = 0, className = "" }) {
//   const [ref, v] = useReveal();
//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// }

// const CATS = [
//   "All",
//   "Investment",
//   "Blockchain",
//   "Market Trends",
//   "Technology",
//   "Crypto News",
//   "DeFi",
//   "NFTs",
//   "Wallets",
// ];

// // ═════════════════════════════════════════════════════════════════════════════
// export default function BlogGridPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { data: dynamicPosts, isLoading: postsLoading } =
//     useGetPublishedPostsQuery();
//   const { data: recentData } = useGetRecentPostsQuery(5);
//   const { data: categoriesData } = useGetCategoriesQuery();

//   const allPosts = [
//     ...(dynamicPosts?.data?.posts?.map((post) => {
//       const id = post._id;
//       const manualBaseViews =
//         Number(post.views) >= 1000 ? Number(post.views) : 2000;
//       return {
//         id,
//         headline: post.title,
//         description: post.excerpt,
//         image:
//           post.coverImage || "https://via.placeholder.com/600x400?text=Post",
//         date: post.publishedAt,
//         category: post.category?.name || "Uncategorized",
//         views: getManualDailyViews({
//           baseViews: manualBaseViews,
//           startDate: post.publishedAt || "2025-01-01",
//           id,
//         }),
//         content: post.content,
//         author: post.author,
//       };
//     }) || []),
//     ...blogsData,
//   ];

//   const handleCardClick = (post) => {
//     setSelectedPost(post);
//     navigate(`/blogGrid/${slugify(post.headline)}`);
//   };

//   const handleBackClick = () => {
//     setSelectedPost(null);
//     navigate("/blogGrid/");
//   };

//   const sharePost = (platform) => {
//     const url = window.location.href;
//     const title = selectedPost?.headline || "";
//     if (platform === "twitter")
//       window.open(
//         `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
//         "_blank",
//       );
//     else if (platform === "facebook")
//       window.open(
//         `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//         "_blank",
//       );
//     else if (platform === "linkedin")
//       window.open(
//         `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//         "_blank",
//       );
//     else {
//       navigator.clipboard.writeText(url);
//       alert("Link copied!");
//     }
//   };

//   const dynamicCats = [
//     "All",
//     ...new Set(allPosts.map((b) => b.category)),
//   ].filter((v, i, s) => s.indexOf(v) === i);
//   const categories = [...new Set([...CATS, ...dynamicCats])].filter(
//     (v, i, s) => s.indexOf(v) === i,
//   );

//   const filteredPosts = allPosts.filter((post) => {
//     const q = searchQuery.toLowerCase();
//     const matchQ =
//       post.headline.toLowerCase().includes(q) ||
//       (post.description || "").toLowerCase().includes(q);
//     const matchC = activeCategory === "All" || post.category === activeCategory;
//     return matchQ && matchC;
//   });

//   useEffect(() => {
//     const slug = location.pathname.split("/blog/")[1];
//     if (slug) {
//       const post = allPosts.find((p) => slugify(p.headline) === slug);
//       if (post) setSelectedPost(post);
//     }
//   }, [location, allPosts]);

//   const hero = filteredPosts.find((p) => p.featured) || filteredPosts[0];
//   const stories = filteredPosts.filter((p) => p.id !== hero?.id).slice(0, 6);
//   const picks = filteredPosts.filter((p) => p.trending || p.hot).slice(0, 4);

//   // ── POST DETAIL VIEW ──────────────────────────────────────────────────────
//   if (selectedPost) {
//     return (
//       <div
//         className="min-h-screen"
//         style={{
//           background: "var(--color-bg-page)",
//           fontFamily: "'Sora', sans-serif",
//         }}
//       >
//         <Seo page="blog" />
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');`}</style>

//         {/* Detail nav */}
//         <header
//           className="sticky top-0 z-30 backdrop-blur-sm border-b"
//           style={{
//             background: "rgba(232,245,224,0.95)",
//             borderColor: "var(--color-border-accent)",
//           }}
//         >
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//             <button
//               onClick={handleBackClick}
//               className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors"
//               style={{ color: "var(--color-brand-primary)" }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.color = "var(--color-brand-dark)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.color = "var(--color-brand-primary)")
//               }
//             >
//               <ArrowRight size={13} className="rotate-180" /> Back to Blog
//             </button>

//             {/* Logo */}
//             <span
//               className="text-xl font-black tracking-tight"
//               style={{ color: "var(--color-brand-dark)" }}
//             >
//               JAI<span style={{ color: "var(--color-brand-accent)" }}>MAX</span>
//               <span
//                 className="font-normal text-sm ml-1"
//                 style={{ color: "var(--color-text-secondary)" }}
//               >
//                 blog
//               </span>
//             </span>

//             <div className="w-24" />
//           </div>
//         </header>

//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
//             {/* Main content */}
//             <div className="lg:col-span-3">
//               {/* Category badge + meta */}
//               <div className="flex flex-wrap items-center gap-3 mb-5 text-xs uppercase tracking-widest">
//                 <span
//                   className="px-3 py-1 rounded-full font-bold text-[10px]"
//                   style={{
//                     background: "var(--color-bg-overlay)",
//                     color: "var(--color-brand-primary)",
//                     border: "1px solid var(--color-border-accent)",
//                   }}
//                 >
//                   {selectedPost.category}
//                 </span>
//                 <span
//                   className="flex items-center gap-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   <Calendar size={11} />
//                   {selectedPost.date}
//                 </span>
//                 <span
//                   className="flex items-center gap-1"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   <Eye size={11} />
//                   {formatViewsK(selectedPost.views ?? 2000)} views
//                 </span>
//               </div>

//               {/* Headline */}
//               <h1
//                 className="text-3xl sm:text-4xl md:text-[2.6rem] font-black leading-tight mb-4"
//                 style={{ color: "var(--color-brand-dark)" }}
//               >
//                 {selectedPost.headline}
//               </h1>
//               {selectedPost.content?.title && (
//                 <p
//                   className="text-base mb-6 leading-relaxed font-medium"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   {selectedPost.content.title}
//                 </p>
//               )}

//               {/* Cover image */}
//               {selectedPost.image && (
//                 <div className="rounded-xl overflow-hidden mb-8 aspect-video shadow-lg">
//                   <img
//                     src={selectedPost.image}
//                     alt={selectedPost.headline}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}

//               {/* Body */}
//               <div className="prose max-w-none">
//                 {selectedPost.content?.sections ? (
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(
//                         convertSectionsToHTML(selectedPost.content.sections),
//                       ),
//                     }}
//                   />
//                 ) : (
//                   <div
//                     className="leading-relaxed text-sm"
//                     style={{ color: "var(--color-text-secondary)" }}
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(
//                         selectedPost.content || selectedPost.description,
//                       ),
//                     }}
//                   />
//                 )}
//               </div>

//               {/* Share */}
//               <div
//                 className="mt-10 pt-6"
//                 style={{ borderTop: "1px solid var(--color-border-accent)" }}
//               >
//                 <p
//                   className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   Share this article
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {["twitter", "facebook", "linkedin", "copy"].map((p) => (
//                     <button
//                       key={p}
//                       onClick={() => sharePost(p)}
//                       className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 capitalize"
//                       style={{
//                         border: "1px solid var(--color-border-accent)",
//                         color: "var(--color-brand-primary)",
//                         background: "transparent",
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background =
//                           "var(--color-brand-primary)";
//                         e.currentTarget.style.color = "#fff";
//                         e.currentTarget.style.borderColor =
//                           "var(--color-brand-primary)";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "transparent";
//                         e.currentTarget.style.color =
//                           "var(--color-brand-primary)";
//                         e.currentTarget.style.borderColor =
//                           "var(--color-border-accent)";
//                       }}
//                     >
//                       {p === "copy" ? "Copy Link" : p}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="lg:col-span-1">
//               <div className="sticky top-20">
//                 <div className="flex items-center gap-2 mb-5">
//                   <div
//                     className="w-1 h-4 rounded-full"
//                     style={{ background: "var(--color-brand-accent)" }}
//                   />
//                   <p
//                     className="text-[10px] font-bold uppercase tracking-[0.25em]"
//                     style={{ color: "var(--color-text-secondary)" }}
//                   >
//                     Recent Posts
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-5">
//                   {allPosts.slice(0, 6).map((post) => (
//                     <div
//                       key={post.id}
//                       onClick={() => handleCardClick(post)}
//                       className="cursor-pointer group pb-4 last:pb-0"
//                       style={{
//                         borderBottom: "1px solid var(--color-border-accent)",
//                       }}
//                     >
//                       <div className="img-zoom overflow-hidden rounded-lg mb-2 aspect-video bg-gray-100">
//                         <img
//                           src={post.image}
//                           alt={post.headline}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <p
//                         className="text-[9px] uppercase tracking-wider font-bold mb-1"
//                         style={{ color: "var(--color-brand-accent)" }}
//                       >
//                         {post.category}
//                       </p>
//                       <h4
//                         className="text-xs font-bold leading-snug line-clamp-2 transition-colors"
//                         style={{ color: "var(--color-brand-dark)" }}
//                         onMouseEnter={(e) =>
//                           (e.currentTarget.style.color =
//                             "var(--color-brand-primary)")
//                         }
//                         onMouseLeave={(e) =>
//                           (e.currentTarget.style.color =
//                             "var(--color-brand-dark)")
//                         }
//                       >
//                         {post.headline}
//                       </h4>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── BLOG LIST VIEW ────────────────────────────────────────────────────────
//   return (
//     <div
//       className="min-h-screen text-black"
//       style={{
//         background: "var(--color-bg-page)",
//         fontFamily: "'Sora', sans-serif",
//       }}
//     >
//       <Seo page="blog" />
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
//         .img-zoom { overflow: hidden; }
//         .img-zoom img { transition: transform .6s ease; }
//         .img-zoom:hover img { transform: scale(1.06); }
//         .cat-scroll::-webkit-scrollbar { display: none; }
//         .link-underline { position: relative; }
//         .link-underline::after { content:''; position:absolute; left:0; bottom:-1px; width:0; height:2px; background:var(--color-brand-accent); transition:width .3s ease; border-radius:2px; }
//         .link-underline:hover::after { width:100%; }
//         .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
//         .card-hover:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
//       `}</style>

//       {/* ── NAV ── */}
//       <header
//         className="sticky top-0 z-30 backdrop-blur-sm"
//         style={{
//           background: "rgba(232,245,224,0.96)",
//           borderBottom: "1px solid var(--color-border-accent)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           {/* <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--color-border-accent)" }}>

//             <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest font-semibold" style={{ color: "var(--color-text-secondary)" }}>
//               {["Home", "News", "Post Format", "Featured", "Purchase"].map(l => (
//                 <a key={l} href="#"
//                   className="transition-colors"
//                   style={{ color: "var(--color-text-secondary)" }}
//                   onMouseEnter={e => e.currentTarget.style.color = "var(--color-brand-primary)"}
//                   onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
//                 >{l}</a>
//               ))}
//             </div>
//             <button
//               className="md:hidden text-xs font-semibold"
//               style={{ color: "var(--color-brand-primary)" }}
//               onClick={() => setMobileMenu(o => !o)}
//             >
//               ☰ Menu
//             </button>
//             <div className="text-center absolute left-1/2 -translate-x-1/2">
//               <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none" style={{ color: "var(--color-brand-dark)" }}>
//                 JAI<span style={{ color: "var(--color-brand-accent)" }}>MAX</span>
//                 <span className="font-normal text-base ml-1" style={{ color: "var(--color-text-secondary)" }}>blog</span>
//               </h1>
//               <p className="text-[9px] uppercase tracking-[0.22em] mt-0.5 font-medium" style={{ color: "var(--color-brand-mid)" }}>
//                 Blockchain · Finance · Crypto
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="hidden md:flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--color-brand-mid)" }}>
//                 <a href="#" className="transition-colors hover:text-[var(--color-brand-primary)]">f</a>
//                 <a href="#" className="transition-colors hover:text-[var(--color-brand-primary)]">𝕏</a>
//                 <a href="#" className="transition-colors hover:text-[var(--color-brand-primary)]">in</a>
//               </div>
//               <div className="relative">
//                 <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-brand-mid)" }} />
//                 <input
//                   value={searchQuery}
//                   onChange={e => setSearchQuery(e.target.value)}
//                   placeholder="Search..."
//                   className="text-xs pl-8 pr-3 py-2 rounded-full focus:outline-none transition-all w-28 sm:w-40 font-medium"
//                   style={{
//                     border: "1.5px solid var(--color-border-accent)",
//                     background: "var(--color-bg-surface)",
//                     color: "var(--color-text-primary)",
//                   }}
//                   onFocus={e => e.target.style.borderColor = "var(--color-brand-primary)"}
//                   onBlur={e => e.target.style.borderColor = "var(--color-border-accent)"}
//                 />
//               </div>
//             </div>
//           </div> */}
//           <div className=" text-center mb-5">
//             <h2 className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3 pt-4 sideHeading">
//               Our{" "}
//               <span style={{ color: "var(--color-brand-primary)" }}>Blogs</span>
//             </h2>
//           </div>

//           <div className="cat-scroll flex items-center overflow-x-auto">
//             {categories.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setActiveCategory(c)}
//                 className="text-[10px] uppercase font-bold px-4 py-3 border-b-2 whitespace-nowrap transition-all shrink-0"
//                 style={{
//                   borderBottomColor:
//                     activeCategory === c
//                       ? "var(--color-brand-accent)"
//                       : "transparent",
//                   color:
//                     activeCategory === c
//                       ? "var(--color-brand-dark)"
//                       : "var(--color-text-secondary)",
//                 }}
//                 onMouseEnter={(e) => {
//                   if (activeCategory !== c)
//                     e.currentTarget.style.color = "var(--color-brand-primary)";
//                 }}
//                 onMouseLeave={(e) => {
//                   if (activeCategory !== c)
//                     e.currentTarget.style.color = "var(--color-text-secondary)";
//                 }}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* Mobile menu */}
//       {mobileMenu && (
//         <div
//           className="px-4 py-4 flex flex-col gap-2"
//           style={{
//             background: "var(--color-bg-surface)",
//             borderBottom: "1px solid var(--color-border-accent)",
//           }}
//         >
//           {["Home", "News", "Post Format", "Featured", "Purchase"].map((l) => (
//             <a
//               key={l}
//               href="#"
//               className="py-2 text-sm font-semibold transition-colors"
//               style={{
//                 borderBottom: "1px solid var(--color-border-accent)",
//                 color: "var(--color-text-secondary)",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.color = "var(--color-brand-primary)")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.color = "var(--color-text-secondary)")
//               }
//             >
//               {l}
//             </a>
//           ))}
//         </div>
//       )}

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//         {/* ════ HERO FEATURED POST ════ */}
//         {hero && (
//           <Reveal>
//             <div
//               onClick={() => handleCardClick(hero)}
//               className="grid grid-cols-1 md:grid-cols-2 mb-14 overflow-hidden rounded-[6xl] cursor-pointer card-hover"
//               style={{
//                 border: "1.5px solid var(--color-border-accent)",
//                 boxShadow: "0 4px 24px rgba(45,122,58,0.08)",
//               }}
//             >
//               {/* Image */}
//               <div className="img-zoom overflow-hidden aspect-[4/3] md:aspect-auto md:h-96 bg-gray-100">
//                 <img
//                   src={hero.image}
//                   alt={hero.headline}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Text panel */}
//               <div
//                 className="flex flex-col justify-center p-8 sm:p-10 md:p-12"
//                 style={{
//                   background: "var(--color-bg-surface)",
//                   borderLeft: "1.5px solid var(--color-border-accent)",
//                 }}
//               >
//                 {/* Meta badges */}
//                 <div className="flex flex-wrap items-center gap-2 mb-5">
//                   <span
//                     className="text-[9px] uppercase font-bold px-2.5 py-1 rounded-full"
//                     style={{
//                       background: "var(--color-bg-overlay)",
//                       color: "var(--color-brand-primary)",
//                       border: "1px solid var(--color-border-accent)",
//                     }}
//                   >
//                     {hero.date}
//                   </span>
//                   <span
//                     className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
//                     style={{
//                       background: "var(--color-brand-accent)",
//                       color: "#fff",
//                     }}
//                   >
//                     {hero.category}
//                   </span>
//                   {hero.trending && (
//                     <span
//                       className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
//                       style={{
//                         background: "var(--color-brand-primary)",
//                         color: "#fff",
//                       }}
//                     >
//                       <TrendingUp size={8} /> Trending
//                     </span>
//                   )}
//                   {hero.featured && (
//                     <span
//                       className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
//                       style={{
//                         border: "1.5px solid var(--color-brand-accent)",
//                         color: "var(--color-brand-primary)",
//                       }}
//                     >
//                       <Star size={8} /> Featured
//                     </span>
//                   )}
//                 </div>

//                 <h2
//                   className="text-2xl sm:text-3xl md:text-[1.9rem] font-black leading-tight mb-4 link-underline"
//                   style={{ color: "var(--color-brand-dark)" }}
//                 >
//                   {hero.headline}
//                 </h2>

//                 <p
//                   className="text-sm  mb-6 "
//                   style={{ color: "var(--color-text-secondary)" }}
//                   dangerouslySetInnerHTML={{
//                     __html: DOMPurify.sanitize(
//                       hero.description?.substring(0, 200) + "...",
//                     ),
//                   }}
//                 />

//                 <div className="flex items-center justify-between">
//                   <span
//                     className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
//                     style={{
//                       color: "var(--color-brand-primary)",
//                       borderBottom: "2px solid var(--color-brand-accent)",
//                       paddingBottom: "2px",
//                     }}
//                   >
//                     Read Article <ArrowRight size={12} />
//                   </span>
//                   <span
//                     className="flex items-center gap-1 text-xs font-medium"
//                     style={{ color: "var(--color-text-muted)" }}
//                   >
//                     <Eye size={11} />
//                     {formatViewsK(hero.views ?? 2000)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         )}

//         {/* ════ SECTION LABEL ════ */}
//         <Reveal>
//           <div className="flex items-center gap-4 mb-3">
//             <div
//               className="w-1 h-5 rounded-full"
//               style={{ background: "var(--color-brand-accent)" }}
//             />
//             <p
//               className="text-[10px] font-bold uppercase tracking-[0.1em]"
//               style={{ color: "var(--color-text-secondary)" }}
//             >
//               Browse and Read the Latest Staff
//             </p>
//             <div
//               className="flex-1 h-px"
//               style={{ background: "var(--color-border-accent)" }}
//             />
//           </div>
//           <h3
//             className="text-2xl sm:text-3xl mb-9 font-[var(--font-body)]"
//             style={{ color: "var(--color-brand-dark)" }}
//           >
//             Latest Stories
//           </h3>
//         </Reveal>

//         {/* ════ STORIES GRID ════ */}
//         {postsLoading && filteredPosts.length === 0 ? (
//           <div className="text-center py-16">
//             <div
//               className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
//               style={{
//                 borderColor: "var(--color-brand-primary)",
//                 borderTopColor: "transparent",
//               }}
//             />
//             <p
//               className="text-xs uppercase tracking-widest font-semibold"
//               style={{ color: "var(--color-text-secondary)" }}
//             >
//               Loading articles...
//             </p>
//           </div>
//         ) : filteredPosts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
//             {stories.map((post, i) => (
//               <Reveal key={post.id} delay={i * 60}>
//                 <article
//                   className="cursor-pointer group rounded-[6xl] overflow-hidden card-hover"
//                   onClick={() => handleCardClick(post)}
//                   style={{
//                     background: "var(--color-bg-surface)",
//                     border: "1.5px solid var(--color-border-accent)",
//                     fontFamily:"var(--font-body)"
//                   }}
//                 >
//                   {/* Image */}
//                   <div className="img-zoom aspect-[16/9] overflow-hidden bg-gray-100">
//                     <img
//                       src={post.image}
//                       alt={post.headline}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="p-5">
//                     {/* Badges */}
//                     <div className="flex items-center gap-1.5 mb-3 flex-wrap">
//                       {post.trending && (
//                         <span
//                           className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-0.5"
//                           style={{
//                             background: "var(--color-brand-primary)",
//                             color: "#fff",
//                           }}
//                         >
//                           <TrendingUp size={8} />
//                           Trending
//                         </span>
//                       )}
//                       {post.hot && (
//                         <span
//                           className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-0.5"
//                           style={{
//                             background: "var(--color-brand-mid)",
//                             color: "#fff",
//                           }}
//                         >
//                           <Flame size={8} />
//                           Hot
//                         </span>
//                       )}
//                       {post.featured && (
//                         <span
//                           className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-0.5"
//                           style={{
//                             border: "1.5px solid var(--color-brand-accent)",
//                             color: "var(--color-brand-primary)",
//                           }}
//                         >
//                           <Star size={8} />
//                           Pick
//                         </span>
//                       )}
//                       <span
//                         className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full"
//                         style={{
//                           background: "var(--color-bg-overlay)",
//                           color: "var(--color-brand-accent)",
//                         }}
//                       >
//                         {post.category}
//                       </span>
//                     </div>

//                     {/* Headline */}
//                     <h4
//                       className="text-base font-bold leading-snug mb-2 link-underline transition-colors"
//                       style={{ color: "var(--color-brand-dark)", fontFamily:"var(--font-body)" }}
//                     >
//                       {post.headline}
//                     </h4>

//                     {/* Excerpt */}
//                     <div
//                       className="text-xs leading-relaxed line-clamp-2 mb-4"
//                       style={{ color: "var(--color-text-secondary)" }}
//                       dangerouslySetInnerHTML={{
//                         __html: DOMPurify.sanitize(
//                           (post.description || "").substring(0, 130) + "...",
//                         ),
//                       }}
//                     />

//                     {/* Footer */}
//                     <div
//                       className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider pt-3"
//                       style={{
//                         borderTop: "1px solid var(--color-border-accent)",
//                         color: "var(--color-text-muted)",
//                       }}
//                     >
//                       <span className="flex items-center gap-1">
//                         <Calendar size={9} />
//                         {post.date}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Eye size={9} />
//                         {formatViewsK(post.views ?? 2000)}
//                       </span>
//                       <button
//                         className="flex items-center gap-1 transition-colors"
//                         style={{ color: "var(--color-text-muted)" }}
//                         onMouseEnter={(e) =>
//                           (e.currentTarget.style.color =
//                             "var(--color-brand-primary)")
//                         }
//                         onMouseLeave={(e) =>
//                           (e.currentTarget.style.color =
//                             "var(--color-text-muted)")
//                         }
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigator.clipboard.writeText(
//                             window.location.origin +
//                               `/blog/${slugify(post.headline)}`,
//                           );
//                           alert("Link copied!");
//                         }}
//                       >
//                         <Share2 size={9} />
//                         Share
//                       </button>
//                     </div>
//                   </div>
//                 </article>
//               </Reveal>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <p
//               className="text-xs uppercase tracking-widest font-semibold"
//               style={{ color: "var(--color-text-secondary)" }}
//             >
//               No articles found. Try adjusting your search.
//             </p>
//           </div>
//         )}

//         {/* ════ STAFF'S PICKS ════ */}
//         {picks.length > 0 && (
//           <>
//             <Reveal>
//               <div className="flex items-center gap-4 mb-3">
//                 <div
//                   className="w-1 h-5 rounded-full"
//                   style={{ background: "var(--color-brand-accent)" }}
//                 />
//                 <p
//                   className="text-[10px] font-bold uppercase tracking-[0.1em]"
//                   style={{ color: "var(--color-text-secondary)" }}
//                 >
//                   Editor's Choice
//                 </p>
//                 <div
//                   className="flex-1 h-px"
//                   style={{ background: "var(--color-border-accent)" }}
//                 />
//               </div>
//               <h3
//             className="text-2xl sm:text-3xl mb-9 font-[var(--font-body)]"
//             style={{ color: "var(--color-brand-dark)" }}
//           >
//                 Staff's Picks
//               </h3>
//             </Reveal>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
//               {picks.map((post, i) => (
//                 <Reveal key={post.id} delay={i * 70}>
//                   <article
//                     className="cursor-pointer group rounded-[6xl] overflow-hidden card-hover"
//                     onClick={() => handleCardClick(post)}
//                     style={{
//                       background: "var(--color-bg-surface)",
//                       border: "1.5px solid var(--color-border-accent)",
//                     }}
//                   >
//                     <div className="img-zoom aspect-[3/2] overflow-hidden bg-gray-100">
//                       <img
//                         src={post.image}
//                         alt={post.headline}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center gap-1.5 mb-2">
//                         {post.hot && (
//                           <span
//                             className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
//                             style={{
//                               background: "var(--color-brand-mid)",
//                               color: "#fff",
//                             }}
//                           >
//                             Hot
//                           </span>
//                         )}
//                         {post.trending && (
//                           <span
//                             className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
//                             style={{
//                               background: "var(--color-brand-primary)",
//                               color: "#fff",
//                             }}
//                           >
//                             Trending
//                           </span>
//                         )}
//                         <span
//                           className="text-[9px] uppercase font-bold"
//                           style={{ color: "var(--color-brand-accent)" }}
//                         >
//                           {post.category}
//                         </span>
//                       </div>
//                       <h4
//                         className="text-sm font-bold leading-snug line-clamp-2 mb-2 link-underline transition-colors"
//                         style={{ color: "var(--color-brand-dark)" }}
//                       >
//                         {post.headline}
//                       </h4>
//                       <p
//                         className="text-[10px] flex items-center gap-1 uppercase tracking-wider font-medium"
//                         style={{ color: "var(--color-text-muted)" }}
//                       >
//                         <Calendar size={9} />
//                         {post.date}
//                       </p>
//                     </div>
//                   </article>
//                 </Reveal>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ════ LOAD MORE ════ */}
//         <Reveal>
//           <div
//             className="text-center py-8"
//             style={{ borderTop: "1px solid var(--color-border-accent)" }}
//           >
//             <button
//               className="text-xs font-bold uppercase tracking-[0.25em] px-10 py-3.5 rounded-full transition-all duration-300"
//               style={{
//                 border: "2px solid var(--color-brand-primary)",
//                 color: "var(--color-brand-primary)",
//                 background: "transparent",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "var(--color-brand-primary)";
//                 e.currentTarget.style.color = "#fff";
//                 e.currentTarget.style.boxShadow = "var(--shadow-btn)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "transparent";
//                 e.currentTarget.style.color = "var(--color-brand-primary)";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >
//               Load More Articles
//             </button>
//           </div>
//         </Reveal>
//       </main>

   
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  Search, TrendingUp, Star, Flame,
  Eye, Calendar, ArrowRight, Share2,
} from "lucide-react";
import Seo from "../../../SeoContent/Seo";
import {
  useGetPublishedPostsQuery,
  useGetPostBySlugQuery,
  useGetRecentPostsQuery,
  useGetCategoriesQuery,
} from "../../../components/Blogsection/BlogEditorApiSlice";

import Blog1 from "../../../assets/Blog1poster.webp";
import Blog2 from "../../../assets/Blog2poster.webp";
import Blog3 from "../../../assets/Blog3poster.webp";
import Blog4 from "../../../assets/Blog4poster.webp";
import Blog5 from "../../../assets/Blog5poster.webp";

// ─── SEO Schema (from BlogLayout) ────────────────────────────────────────────
const blogschema = {
  "@context": "https://schema.org",
  "@type": ["Blog", "CollectionPage"],
  "@id": "https://www.jaimax.com/blog#blog",
  "url": "https://www.jaimax.com/blog",
  "name": "Jaimax Blog | Crypto, Blockchain & Digital Finance Insights",
  "description": "Read educational articles from Jaimax on cryptocurrency, blockchain, digital finance, security and smart crypto usage for Indian and global users.",
  "inLanguage": "en",
  "publisher": { "@id": "https://www.jaimax.com/#organization" },
  "isPartOf": { "@id": "https://www.jaimax.com/#website" },
};

// ─── Static blog data — full content from BlogLayout ─────────────────────────
const blogsData = [
  {
    id: 5,
    image: Blog5,
    headline: "Why Jaimax Is the Smart Move Right Now",
    description: `In today's rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">crypto token</a> emerging globally, <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">jaimax</a> stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem. This article explores why choosing Jaimax now is a smart move for anyone looking to be part of the future of blockchain and digital finance.`,
    date: "09 june 25",
    category: "Investment",
    trending: true,
    content: {
      title: "Jaimax: The Best Crypto token Emerging from India",
      sections: [
        { type: "paragraph", content: `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto token in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment. With a low market price, it provides an attractive entry point for early adopters.` },
        { type: "heading", content: "Unmatched Growth Potential at a Low Price Point" },
        { type: "paragraph", content: "Jaimax's current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption. This makes Jaimax one of the most promising crypto investment opportunities today." },
        { type: "heading", content: "Strong Use Cases Driving Real-World Utility" },
        { type: "paragraph", content: "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:" },
        { type: "unordered_list", content: ["<b>Decentralized applications (dApps)</b>", "<b>Non-fungible tokens (NFTs)</b>", "<b>Digital payments in e-commerce</b>", "<b>Community rewards and incentives</b>"] },
        { type: "paragraph", content: "This focus on blockchain technology integration ensures Jaimax is positioned for sustainable growth, not just speculative hype. Its utility in real-world scenarios strengthens its value proposition as a functional crypto token." },
        { type: "heading", content: "Robust and Secure Blockchain Infrastructure" },
        { type: "paragraph", content: "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project's architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally. Investors can trust that their assets are protected by advanced cryptographic protocols and a transparent, decentralized ledger system." },
        { type: "heading", content: "Experienced Leadership and Active Community Engagement" },
        { type: "paragraph", content: "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community, providing regular updates and educational content that boosts crypto awareness and fosters trust." },
        { type: "paragraph", content: "Community involvement is crucial in the crypto space, and Jaimax's active social media presence on platforms like Telegram, Twitter, and YouTube demonstrates its commitment to transparency and growth." },
        { type: "heading", content: "Clear Roadmap for Future Development" },
        { type: "paragraph", content: "Jaimax's strategic roadmap includes multiple phases that enhance its ecosystem:" },
        { type: "unordered_list", content: ["Launching Jaimax Foundation Chain with enhanced scalability", "Expanding NFT and DeFi services", "Introducing mobile wallets and user-friendly interfaces", "Partnering with key industry players for exchange listings and integrations"] },
        { type: "paragraph", content: "These planned developments signal a sustainable, well-managed growth trajectory, making Jaimax a strong contender among emerging altcoins." },
        { type: "heading", content: "Community-Driven Rewards and Referral Programs" },
        { type: "paragraph", content: "Jaimax incorporates a referral-based foundation system, allowing early participants to earn rewards through network growth. This incentivizes organic community building and encourages wider adoption, enhancing the coin's value and liquidity. Such programs add to the overall appeal of Jaimax as a smart crypto investment." },
        { type: "heading", content: "Why Timing Matters: Capitalizing on Early Adoption" },
        { type: "paragraph", content: "Cryptocurrency success stories show that early adoption is key to maximizing returns. By entering the Jaimax ecosystem now, investors gain access before the coin's price rises following increased demand and wider recognition. This early mover advantage is vital in a market characterized by rapid shifts and high volatility." },
        { type: "heading", content: "Jaimax and the Future of Indian Cryptocurrency" },
        { type: "paragraph", content: "As India navigates its crypto regulatory environment, projects like Jaimax represent the future of decentralized finance in the country. It embodies the spirit of innovation, financial inclusion, and technology-driven growth that India needs to compete globally." },
        { type: "paragraph", content: "By embracing Jaimax today, investors and users alike become part of a pioneering movement set to influence the trajectory of blockchain adoption in India and worldwide." },
        { type: "heading", content: "In Summary" },
        { type: "paragraph", content: "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity. Its affordable price, robust ecosystem, and forward-looking roadmap make it the smart choice for anyone seeking meaningful engagement with the future of crypto." },
      ],
    },
  },
  {
    id: 4,
    image: Blog4,
    headline: "Jaimax: The Future of Cryptocurrency from India to the World",
    description: "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark. Positioned at the intersection of blockchain technology, financial empowerment, and digital freedom, Jaimax isn't just another altcoin — it's a vision, a movement, and a mission to redefine how the world interacts with finance.",
    date: "09 june 25",
    category: "Blockchain",
    hot: true,
    content: {
      title: "The Rise of a Revolutionary Crypto Brand",
      sections: [
        { type: "paragraph", content: `In a world driven by digital transformation and decentralized innovation, <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">Jaimax</a> is emerging as a pioneering <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">cryptocurrency</a> born in India, aiming to make a global mark. Positioned at the intersection of <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">blockchain technology</a>, financial empowerment, and digital freedom, Jaimax isn't just another altcoin — it's a vision, a movement, and a mission to redefine how the world interacts with finance. Discover why it's <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">India's best crypto coin</a>.` },
        { type: "paragraph", content: `Backed by a powerful infrastructure, a strong team of dedicated innovators, and a roadmap grounded in sustainable growth, Jaimax is rapidly gaining traction as <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">India's best crypto coin</a>. From grassroots education to international expansion, Jaimax is building a future where every digital transaction is secure, accessible, and rewarding.` },
        { type: "heading", content: "A Vision Beyond Borders: Jaimax's Global Mission" },
        { type: "paragraph", content: "At its core, <b>Jaimax envisions a decentralized future</b> where financial opportunities are not limited by geography, background, or financial history. As India rises as a global tech powerhouse, Jaimax leverages the country's digital momentum to present a <b>crypto platform with international utility and local relevance</b>." },
        { type: "paragraph", content: "Our mission is clear — <b>to empower individuals</b> through blockchain, enhance security through smart technology, and <b>bridge traditional finance with the digital economy</b>. Whether you're a first-time investor or a seasoned crypto trader, Jaimax offers a gateway into a more inclusive and transparent ecosystem." },
        { type: "heading", content: "Blockchain Backbone: The Technology Powering Jaimax" },
        { type: "paragraph", content: "Jaimax is built on <b>advanced blockchain infrastructure</b> ensuring <b>speed, scalability, and security</b>. Designed to handle high-volume transactions while minimizing costs, our chain architecture competes with global standards like Ethereum and Solana:" },
        { type: "unordered_list", content: ["<b>High TPS (Transactions Per Second):</b> Jaimax supports lightning-fast processing, suitable for real-time applications.", "<b>Energy-Efficient Consensus Mechanism:</b> Our system reduces carbon footprints, embracing sustainability without sacrificing performance.", "<b>Smart Contract Integration:</b> Developers can build dApps, DeFi protocols, and even NFT platforms using Jaimax, enabling an expansive utility landscape."] },
        { type: "paragraph", content: "This <b>robust blockchain foundation</b> makes Jaimax not only a digital currency but also a <b>complete ecosystem.</b>" },
        { type: "heading", content: "Unmatched Utility: More Than Just a Coin" },
        { type: "paragraph", content: "Unlike many crypto projects that fade after launch, Jaimax is deeply committed to <b>real-world use cases</b>. Here's how Jaimax is adding value:" },
        { type: "subheading", content: "1. Digital Payments" },
        { type: "paragraph", content: "Jaimax enables fast, borderless, and low-fee transactions for merchants and consumers. With ongoing partnerships, we are integrating with payment gateways and e-commerce platforms to bring crypto to daily life." },
        { type: "subheading", content: "2. Investment Asset" },
        { type: "paragraph", content: "As a rising altcoin, Jaimax offers early investors an opportunity to enter at a low price point and benefit from long-term appreciation. Its tokenomics ensures stability, liquidity, and rewarding holding mechanisms." },
        { type: "subheading", content: "3. Ecosystem Growth" },
        { type: "paragraph", content: "Jaimax fosters the creation of decentralized apps (dApps), NFTs, and DeFi projects under its umbrella, giving it beyond-token value. It's not just a coin — it's the fuel of an evolving digital economy." },
        { type: "heading", content: "Strategic Phased Roadmap: Building With Purpose" },
        { type: "paragraph", content: "Jaimax follows a 5-phase development plan, ensuring measured, stable, and scalable growth:" },
        { type: "unordered_list", content: ["<b>Phase 1:</b> Community Building and Coin Launch — focused on raising awareness, building trust, and circulating the token among early adopters.", "<b>Phase 2:</b> Market Expansion & Platform Integration — Launch on exchanges, payment partnerships, and merchant onboarding begins.", "<b>Phase 3:</b> Smart Contract and Developer Toolkit Release — Developers can deploy smart contracts and dApps on the Jaimax chain.", "<b>Phase 4:</b> Global Outreach & Utility Enhancement — Entry into international exchanges and cross-border projects.", "<b>Phase 5:</b> Institutional Partnerships and Governance DAO — A decentralized governance model with stakeholder voting rights and institutional backing."] },
        { type: "paragraph", content: "This structured path ensures sustainable adoption, not just speculative hype." },
        { type: "heading", content: "Community-Driven Approach: Power to the People" },
        { type: "paragraph", content: "At the heart of Jaimax is its vibrant community. From everyday users to blockchain enthusiasts, the ecosystem thrives on user participation, feedback, and decentralized contributions. Our vision includes:" },
        { type: "unordered_list", content: ["<b>Community Voting Rights</b> for major updates and use-case adoption.", "<b>Transparency Reports</b> released quarterly, maintaining trust and accountability.", "<b>Educational Initiatives</b> including seminars, webinars, and local crypto literacy drives."] },
        { type: "paragraph", content: "We believe true decentralization starts with an informed community — and we are here to build that together." },
        { type: "heading", content: "India's Moment in the Crypto World" },
        { type: "paragraph", content: "India has long been seen as a technology superpower, and Jaimax capitalizes on that momentum. The country's deep penetration of smartphones, digital wallets, and growing youth interest in crypto gives Jaimax a unique edge." },
        { type: "unordered_list", content: ["<b>Localized Branding:</b> We speak the language of the people — through campaigns in English, Hindi, Telugu, Tamil, and more.", "<b>Regulatory Alignment:</b> Jaimax aims to align with India's upcoming crypto regulations to remain legally strong and secure for the future.", "<b>Exporting Innovation:</b> From India to the world — Jaimax is India's answer to global crypto leadership."] },
        { type: "heading", content: "Security and Transparency at the Core" },
        { type: "paragraph", content: "With regular audits, bug bounty programs, and a fully transparent transaction ledger, Jaimax puts security first. Our open-source codebase invites developers to explore, contribute, and innovate — ensuring continuous improvement and community accountability." },
        { type: "paragraph", content: "Additionally, our KYC/AML compliance modules are being developed for exchanges and partners, preparing us for a regulation-ready future." },
        { type: "heading", content: "Conclusion: Jaimax is the Future" },
        { type: "paragraph", content: "Jaimax is more than just a crypto token — it's a revolution from India, built for the world. As blockchain adoption accelerates, Jaimax stands out with its mission-driven approach, user-first design, and global ambitions." },
        { type: "paragraph", content: "The next era of finance will be decentralized, inclusive, and digital. With Jaimax leading the charge, the future of cryptocurrency is not just arriving — it's being built right now." },
      ],
    },
  },
  {
    id: 1,
    image: Blog1,
    headline: "The Power of Early Investment: Why Now is the Time for Jaimax",
    description: "In the dynamic world of cryptocurrency, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India, offering a rare chance to invest at a foundational level.",
    date: "05 may 25",
    category: "Market Trends",
    trending: true,
    featured: true,
    content: {
      title: "Timing Defines Opportunity in Cryptocurrency",
      sections: [
        { type: "subheading", content: "Introduction: Timing Defines Opportunity in Cryptocurrency" },
        { type: "paragraph", content: `In the dynamic world of <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">cryptocurrency</a>, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto coin in India</a>, offering a rare chance to invest at a foundational level.` },
        { type: "paragraph", content: `This article explores why early investment in Jaimax offers a powerful opportunity, and why it is already being considered by experts and early adopters as one of the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto coins to invest</a> in this year.` },
        { type: "subheading", content: "The Power of Early Adoption in Crypto Markets" },
        { type: "paragraph", content: "Early adoption has consistently led to exponential growth in the cryptocurrency space. From Bitcoin's rise from pennies to thousands of dollars, to Ethereum's surge from a few dollars to four-digit values — history shows that entering early creates long-term winners." },
        { type: "paragraph", content: "Jaimax, in its current early-phase pricing, presents similar characteristics:" },
        { type: "unordered_list", content: ["Low entry point (₹0.50) for high-volume accumulation.", "Early access before major exchange listings and market hype.", "Direct exposure to a digital asset with real utility and local relevance."] },
        { type: "paragraph", content: "Jaimax's early investors are not just buying coins; they are securing a strategic position in the future of Indian crypto markets." },
        { type: "heading", content: "Why Jaimax is Gaining Attention" },
        { type: "paragraph", content: "What separates Jaimax from the sea of altcoins in circulation? It's the combination of technology, local market alignment, transparent development, and long-term vision. Here's why Jaimax is poised to dominate:" },
        { type: "subheading", content: "1. Tailored for India's Digital Finance Evolution" },
        { type: "paragraph", content: "India's population is embracing digital technology rapidly, and cryptocurrency adoption is accelerating. Jaimax is built with the Indian market in mind — from accessibility to pricing, making it a strong contender for the best crypto coin in India." },
        { type: "paragraph", content: "Its affordability and scalability align perfectly with India's demographic — tech-savvy youth, growing retail investors, and emerging entrepreneurs." },
        { type: "subheading", content: "2. Transparent and Reliable Tokenomics" },
        { type: "paragraph", content: "Unlike countless speculative crypto projects, Jaimax has clear tokenomics designed for growth, security, and longevity. Limited total supply, gradual release schedules, and secure architecture provide strong investor confidence." },
        { type: "paragraph", content: `The coin's scarcity and responsible allocation create sustainable demand pressure — essential traits for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto to invest</a>.` },
        { type: "subheading", content: "3. Cutting-Edge Technology" },
        { type: "paragraph", content: "Behind every reliable crypto coin lies robust technology. Jaimax utilizes high-speed blockchain protocols to ensure:" },
        { type: "unordered_list", content: ["Instant transactions", "Low fees", "High scalability", "Strong security standards"] },
        { type: "paragraph", content: "This makes Jaimax future-ready, ensuring its usability across digital applications, mobile wallets, and potential future integrations with e-commerce or fintech platforms." },
        { type: "subheading", content: "4. Developer-Backed Roadmap" },
        { type: "paragraph", content: "A strong coin needs a strong plan. Jaimax has a clear, step-by-step development roadmap involving:" },
        { type: "unordered_list", content: ["Exchange listings", "Wallet partnerships", "DeFi integration", "Community tools and apps"] },
        { type: "heading", content: "Why ₹0.50 is a Golden Entry Point" },
        { type: "paragraph", content: "Price is a powerful psychological and strategic factor. With Jaimax currently valued at just ₹0.50, this is a rare moment to accumulate high-volume holdings without high capital investment." },
        { type: "unordered_list", content: ["Lowest possible risk with highest potential reward", "Ideal for long-term holding and short-term trading", "Entry before upcoming upgrades and visibility boosts"] },
        { type: "paragraph", content: "As the crypto market evolves, undervalued assets like Jaimax typically outperform once broader awareness kicks in. That's why smart investors act before the crowd." },
        { type: "heading", content: "Jaimax: Designed for Scalable Growth" },
        { type: "paragraph", content: "Every successful cryptocurrency must scale effectively. Jaimax's infrastructure is already built for future expansion." },
        { type: "unordered_list", content: ["Scalable transactions per second (TPS) to handle high volume", "Smart contract integration for advanced DeFi functions", "Audit-ready architecture to attract institutional and retail confidence"] },
        { type: "paragraph", content: "This technical maturity gives Jaimax the foundation to become not just a speculative token but a real utility-driven crypto coin." },
        { type: "heading", content: "Indian Crypto Trends: Why Jaimax is the Perfect Fit" },
        { type: "paragraph", content: "India is set to become one of the world's top cryptocurrency markets. With a population of 1.4 billion and increasing access to internet and mobile banking, the need for affordable, fast, and secure crypto coins is exploding." },
        { type: "unordered_list", content: ["Local relevance gives it an edge in adoption over foreign tokens.", "Educational initiatives will drive wider understanding and trust.", "Mobile-ready platforms ensure rural and urban access alike."] },
        { type: "heading", content: "A Secure, Transparent Ecosystem" },
        { type: "paragraph", content: "Security is non-negotiable. Jaimax employs multi-layered security protocols." },
        { type: "unordered_list", content: ["Advanced cryptography", "Blockchain immutability", "Decentralized ledger architecture"] },
        { type: "heading", content: "Jaimax vs. Other Crypto Coins: A Comparison" },
        { type: "table", content: [{ Feature: "Price Accessibility", Jaimax: "₹0.50 (entry stage)", "Generic Altcoin": "Often above ₹10+" }, { Feature: "Localized Growth Focus", Jaimax: "India-first expansion strategy", "Generic Altcoin": "Global but unfocused" }, { Feature: "Technology", Jaimax: "Scalable, fast, secure", "Generic Altcoin": "Average blockchain models" }, { Feature: "Roadmap Transparency", Jaimax: "Clear, public, and progressive", "Generic Altcoin": "Often unclear or delayed" }, { Feature: "Community & Utility Vision", Jaimax: "Strong user engagement plans", "Generic Altcoin": "Weak or speculative only" }] },
        { type: "heading", content: "The Risk of Waiting: Missed Opportunities" },
        { type: "paragraph", content: "The biggest regret in cryptocurrency history? Not buying early." },
        { type: "unordered_list", content: ["Higher entry costs later", "Reduced ROI", "Missed participation in early decision-making or feature access"] },
        { type: "paragraph", content: "The current stage of Jaimax offers the lowest barrier to entry, while offering maximum growth potential. This is a time-sensitive opportunity that seasoned investors understand." },
        { type: "heading", content: "Conclusion: The Smart Move Is to Act Early" },
        { type: "paragraph", content: `The cryptocurrency world doesn't wait. Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the best crypto coins in India today. For those looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto to invest in 2025</a>, this is the moment to step in, while the door is still open.` },
        { type: "paragraph", content: "Jaimax isn't just a coin — it's a movement toward inclusive, secure, and smart financial systems. Early action leads to long-term advantage. Don't let this window of opportunity pass." },
      ],
    },
  },
  {
    id: 2,
    image: Blog2,
    headline: "How Jaimax Works: A Deep Dive into Our Coin and Technology",
    description: "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the best crypto coin in India. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the best crypto to invest in India.",
    date: "12 may 25",
    category: "Technology",
    content: {
      title: "Jaimax: The Best Crypto Coin in India",
      sections: [
        { type: "paragraph", content: `Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto coin in India</a>. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto to invest in India</a>. With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation.` },
        { type: "paragraph", content: "With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation." },
        { type: "heading", content: "The Technology Backbone of Jaimax" },
        { type: "subheading", content: "High-Speed Scalable Blockchain" },
        { type: "paragraph", content: "Jaimax is powered by an advanced Proof of Stake (PoS) consensus mechanism. Unlike outdated systems that rely on power-hungry mining, this next-gen blockchain delivers lightning-fast, eco-friendly transactions." },
        { type: "unordered_list", content: ["Block Generation Time: 2 seconds", "Transaction Speed: Over 5,000 transactions per second (TPS).", "Network Uptime: 99.99%", "Gas Fees: Extremely low and consistent"] },
        { type: "paragraph", content: `This architecture ensures Jaimax is not just a <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">crypto coin</a> for trading, but a practical, scalable platform for mainstream use in India and beyond.` },
        { type: "subheading", content: "Smart Contract Support and Interoperability" },
        { type: "paragraph", content: "The Jaimax blockchain is fully smart contract enabled, making it compatible with developers building next-generation decentralized applications (dApps) and tokenized services." },
        { type: "unordered_list", content: ["Supports Solidity & Web3 Tools", "Cross-chain compatibility with Ethereum and BNB Smart Chain", "Secure and audited smart contracts"] },
        { type: "paragraph", content: `This infrastructure allows real-world use cases — from DeFi platforms to NFT marketplaces — to thrive within the Jaimax ecosystem, reinforcing its position as a <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">top crypto coin in India</a>'s growing digital economy.` },
        { type: "heading", content: "Coin Supply and Investment Structure" },
        { type: "paragraph", content: "Jaimax follows a meticulously planned coin distribution model aimed at driving long-term value." },
        { type: "unordered_list", content: ["Total Supply: 1 Billion Jaimax coins", "Launch Price: ₹0.10", "Current Price: ₹0.50", "Public Trading Launch: Begins after Phase 2 completion"] },
        { type: "paragraph", content: "This limited supply model ensures scarcity, while phase-based growth encourages early participation and maximizes investor returns. It's a strategy that makes Jaimax one of the best crypto coins to invest in India today." },
        { type: "heading", content: "Strategic Phased Growth of Jaimax" },
        { type: "subheading", content: "Phase 1: Launch and Awareness" },
        { type: "unordered_list", content: ["Objective: Build user base, generate initial momentum", "Coin Price: ₹0.10", "Outcome: Early adopters benefit from foundational pricing"] },
        { type: "subheading", content: "Phase 2: Market Expansion and Branding" },
        { type: "unordered_list", content: ["Objective: Solidify brand, expand user outreach", "Coin Price: ₹0.50", "Outcome: Strong community, increased value"] },
        { type: "subheading", content: "Post-Phase 2: Trading and Ecosystem Integration" },
        { type: "unordered_list", content: ["Objective: Enable public trading on top crypto exchanges", "Focus: Liquidity, partnerships, and platform adoption", "Utility: Used for transactions, smart contract fees, and ecosystem access"] },
        { type: "heading", content: "Security, Transparency, and Trust" },
        { type: "unordered_list", content: ["Smart Contract Audits: Verified by third-party blockchain security firms", "Open Source Protocols: Code available for public verification", "User Verification: KYC/AML processes in place", "Data Privacy: Protected through end-to-end encryption"] },
        { type: "paragraph", content: "These protocols help position Jaimax as a safe and reliable cryptocurrency, making it attractive to both first-time users and experienced crypto investors in India." },
        { type: "heading", content: "Utility and Real-World Integration" },
        { type: "paragraph", content: "Jaimax isn't just a token with speculative value — it's designed for real-world application." },
        { type: "unordered_list", content: ["Use as Gas Token: All transactions and smart contracts require Jaimax", "Ecosystem Growth: Future integration with gaming, e-commerce, and decentralized finance platforms", "Scalable Infrastructure: Ideal for building apps, platforms, and services"] },
        { type: "paragraph", content: "This practical approach makes Jaimax a true utility crypto coin, offering more than just holding value — it offers use, purpose, and future integration." },
        { type: "heading", content: "Why Jaimax is the Best Crypto to Invest in India" },
        { type: "subheading", content: "India-Focused Innovation" },
        { type: "paragraph", content: "Jaimax has been created to empower Indian users and businesses. It offers a simplified entry point into the blockchain world with features tailored for the Indian market." },
        { type: "unordered_list", content: ["Low-cost entry for new investors", "Localized support and user resources", "Designed with Indian compliance in mind"] },
        { type: "paragraph", content: "Whether you're an individual looking to diversify your investments or a business seeking blockchain adoption, Jaimax delivers unmatched advantages." },
        { type: "subheading", content: "Affordable Today, Valuable Tomorrow" },
        { type: "paragraph", content: "At ₹0.50 per coin during its second phase, Jaimax represents an incredible opportunity for investors. With public trading and global listings planned, early participation can lead to significant long-term benefits." },
        { type: "unordered_list", content: ["Early growth potential", "Backed by strong branding and awareness campaigns", "Designed for sustainable upward movement"] },
        { type: "paragraph", content: "In a market filled with high-risk speculative coins, Jaimax stands out as a value-driven, strategic crypto investment." },
        { type: "heading", content: "Conclusion: Secure Your Place in the Future with Jaimax" },
        { type: "paragraph", content: "Jaimax is not just another coin in the digital space — it's a mission, a movement, and a meticulously designed ecosystem. With powerful technology, user-centric design, and a strong vision for the future, Jaimax is becoming the best crypto coin in India and a beacon of trust in the blockchain world." },
        { type: "paragraph", content: "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today." },
      ],
    },
  },
  {
    id: 3,
    image: Blog3,
    headline: "Understanding Cryptocurrency: A Simple Guide for New Users",
    description: `Cryptocurrency has dramatically transformed the financial landscape, offering an innovative and decentralized method of transactions that challenges traditional financial systems. If you're new to the world of cryptocurrency, it may seem complex, but with the right knowledge and resources, anyone can understand and participate. This guide will break down cryptocurrency in simple terms and introduce you to the exciting opportunities it presents, including how Jaimax, a rising <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">crypto coin</a> in India, is making waves in the market.`,
    date: "13 may 25",
    category: "Crypto News",
    content: {
      title: "What is Cryptocurrency?",
      sections: [
        { type: "paragraph", content: "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network, meaning they are not governed by any central authority such as a government or financial institution. This decentralization enhances security, transparency, and control for users." },
        { type: "paragraph", content: "The most well-known cryptocurrency, Bitcoin, was the first to revolutionize digital finance, but today there are thousands of different cryptocurrencies, each serving unique purposes. The underlying technology behind cryptocurrency, blockchain, allows for secure, transparent, and irreversible transactions." },
        { type: "heading", content: "How Does Cryptocurrency Work?" },
        { type: "paragraph", content: "Additionally, cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring that both the transaction and the identity of the sender are protected." },
        { type: "heading", content: "Types of Cryptocurrency" },
        { type: "paragraph", content: "There are various types of cryptocurrencies, each with specific uses. Below are some of the most well-known:" },
        { type: "subheading", content: "Bitcoin (BTC)" },
        { type: "paragraph", content: "Bitcoin is the original cryptocurrency, introduced in 2009 by the pseudonymous Satoshi Nakamoto. It remains the largest cryptocurrency by market capitalization and is often regarded as a store of value or 'digital gold.'" },
        { type: "subheading", content: "Ethereum (ETH)" },
        { type: "paragraph", content: "Ethereum is a decentralized platform that enables developers to create smart contracts and decentralized applications (dApps). Ethereum is more than just a cryptocurrency; it also acts as a platform for building applications beyond simple digital currency transactions." },
        { type: "subheading", content: "Ripple (XRP)" },
        { type: "unordered_list", content: ["Smart Contract Audits: Verified by third-party blockchain security firms", "Open Source Protocols: Code available for public verification", "User Verification: KYC/AML processes in place", "Data Privacy: Protected through end-to-end encryption"] },
        { type: "paragraph", content: "Ripple is both a payment protocol and a cryptocurrency, designed to enable fast and inexpensive cross-border transactions. Ripple offers scalability and efficiency, making it a preferred choice for financial institutions looking to transfer funds globally." },
        { type: "subheading", content: "Litecoin (LTC)" },
        { type: "paragraph", content: "Litecoin is often referred to as the silver to Bitcoin's gold. With a faster transaction time and lower fees, Litecoin is designed for use as an everyday payment method, making it a practical alternative for regular transactions." },
        { type: "subheading", content: "Jaimax Cryptocurrency" },
        { type: "paragraph", content: `Jaimax is an emerging crypto coin in India, offering a secure, decentralized solution for users seeking investment opportunities in the cryptocurrency market. With its focus on accessibility and community engagement, Jaimax is quickly becoming a <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">top cryptocurrency to invest in India</a>, particularly for those interested in early-stage investments in the cryptocurrency space.` },
        { type: "heading", content: "How to Buy Cryptocurrency" },
        { type: "paragraph", content: "Acquiring cryptocurrency is straightforward and can be done in several ways. Here are the common methods:" },
        { type: "subheading", content: "Cryptocurrency Exchanges" },
        { type: "paragraph", content: "The most common method to buy cryptocurrency is through exchanges. Popular platforms like Coinbase, Binance, and Kraken allow users to create accounts, deposit fiat currency, and purchase a variety of cryptocurrencies. These exchanges also offer wallet services to securely store digital assets." },
        { type: "subheading", content: "Peer-to-Peer (P2P) Platforms" },
        { type: "paragraph", content: "P2P platforms allow users to buy cryptocurrencies directly from other individuals. Transactions can be done using various payment methods such as bank transfers or PayPal, offering flexibility and ease." },
        { type: "subheading", content: "Bitcoin ATMs" },
        { type: "paragraph", content: "In some locations, Bitcoin ATMs allow users to purchase cryptocurrency in exchange for cash. While less common than traditional ATMs, these machines offer an alternative way to acquire digital currency." },
        { type: "heading", content: "Storing Cryptocurrency: Wallets" },
        { type: "paragraph", content: "Once you've acquired cryptocurrency, it's essential to store it securely. There are two main types of wallets:" },
        { type: "subheading", content: "Hot Wallets" },
        { type: "paragraph", content: "Hot wallets are online wallets connected to the internet. These are convenient for quick transactions but are more susceptible to hacking. Popular hot wallets include Exodus and Trust Wallet." },
        { type: "subheading", content: "Cold Wallets" },
        { type: "paragraph", content: "Cold wallets are offline wallets that provide a higher level of security. Hardware wallets like Ledger and Trezor store your private keys offline, making them less vulnerable to attacks. Cold wallets are best for long-term storage of cryptocurrency." },
        { type: "heading", content: "Cryptocurrency Mining" },
        { type: "paragraph", content: "Mining is the process by which new cryptocurrencies are created and added to the blockchain. Miners use computational power to solve complex mathematical problems, validating transactions and receiving new coins as a reward. Mining used to be more accessible, but today it requires significant computing power, especially for popular cryptocurrencies like Bitcoin." },
        { type: "heading", content: "Benefits of Cryptocurrency" },
        { type: "paragraph", content: "Cryptocurrency offers several advantages over traditional financial systems:" },
        { type: "subheading", content: "Decentralization" },
        { type: "paragraph", content: "Cryptocurrency operates on a peer-to-peer network, without a central authority. This gives users greater control over their transactions and assets, reducing reliance on banks or government entities." },
        { type: "subheading", content: "Security" },
        { type: "paragraph", content: "Cryptocurrency transactions are secure and irreversible, thanks to blockchain technology and cryptographic algorithms. The decentralized nature of the network also reduces the risks of fraud and identity theft." },
        { type: "subheading", content: "Low Transaction Fees" },
        { type: "paragraph", content: "Cryptocurrency transactions often involve lower fees compared to traditional banking systems. For international transfers, cryptocurrencies like Jaimax can be more cost-effective than conventional money transfer services." },
        { type: "subheading", content: "Privacy and Anonymity" },
        { type: "paragraph", content: "Some cryptocurrencies, like Monero and Zcash, offer enhanced privacy features, allowing users to make anonymous transactions. This feature is especially attractive for those who value privacy in their financial dealings." },
        { type: "heading", content: "Risks of Cryptocurrency" },
        { type: "paragraph", content: "Despite its advantages, cryptocurrency comes with risks:" },
        { type: "subheading", content: "Volatility" },
        { type: "paragraph", content: "Cryptocurrencies are known for their price volatility, with values fluctuating significantly. While this can lead to high returns, it also poses risks for investors, particularly those new to the market." },
        { type: "subheading", content: "Regulatory Uncertainty" },
        { type: "paragraph", content: "Cryptocurrency regulations are still developing in many countries. The regulatory landscape can be uncertain, and changes in laws could affect the market and the legality of using or trading digital currencies." },
        { type: "subheading", content: "Security Threats" },
        { type: "paragraph", content: "While blockchain itself is secure, cryptocurrency exchanges and wallets can be vulnerable to hacking. There have been incidents of high-profile exchanges being compromised, resulting in the loss of millions of dollars." },
        { type: "heading", content: "Jaimax: A Top Cryptocurrency to Invest in India" },
        { type: "paragraph", content: `For those looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#2d7a3a;font-weight:600">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity. As a rising cryptocurrency in India, Jaimax is gaining attention for its unique approach and growing community. With a focus on user empowerment, Jaimax is poised to become a significant player in the Indian cryptocurrency market. Whether you're new to crypto or an experienced investor, Jaimax is one of the best cryptocurrencies to invest in India due to its promising potential and increasing adoption.` },
        { type: "heading", content: "Conclusion" },
        { type: "paragraph", content: "Cryptocurrency is revolutionizing the way we think about finance. From Bitcoin to Jaimax, there are many exciting options to explore. Whether you're looking to make investments or simply engage with the digital economy, understanding how cryptocurrencies work and their potential can open up a world of opportunities. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising." },
      ],
    },
  },
];

// ─── Helpers (unchanged) ─────────────────────────────────────────────────────
function getManualDailyViews({ baseViews = 2000, startDate, id }) {
  const base = Number(baseViews) || 2000;
  const start = new Date(startDate || "2025-01-01");
  const today = new Date();
  const daysPassed = Math.max(0, Math.floor((today - start) / (1000 * 60 * 60 * 24)));
  const seedStr = String(id ?? "default");
  let seed = seedStr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
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

function slugify(str) {
  return str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
}

const convertSectionsToHTML = (sections) => {
  let html = "";
  sections.forEach((section) => {
    switch (section.type) {
      case "heading":
        html += `<h3 style="font-size:1.15rem;font-weight:700;margin:1.75rem 0 0.75rem;color:#1a3d22;font-family:'Sora',sans-serif;border-left:3px solid #7fc742;padding-left:12px">${section.content}</h3>`;
        break;
      case "subheading":
        html += `<h4 style="font-size:1rem;font-weight:600;margin:1.25rem 0 0.5rem;color:#2d7a3a;font-family:'Sora',sans-serif">${section.content}</h4>`;
        break;
      case "paragraph":
        html += `<p style="margin-bottom:1.1rem;color:#374151;line-height:1.85;font-family:'Sora',sans-serif;font-size:0.95rem">${section.content}</p>`;
        break;
      case "unordered_list":
        html += '<ul style="margin-bottom:1.1rem;padding-left:1.5rem;list-style:none">';
        section.content.forEach((item) => {
          html += `<li style="margin-bottom:0.5rem;color:#374151;line-height:1.75;font-family:'Sora',sans-serif;font-size:0.9rem;padding-left:1rem;position:relative"><span style="position:absolute;left:-4px;color:#7fc742;font-weight:700">›</span>${item}</li>`;
        });
        html += "</ul>";
        break;
      case "table":
        html += '<div style="overflow-x:auto;margin-bottom:1rem"><table style="width:100%;border-collapse:collapse;font-family:Sora,sans-serif;font-size:0.85rem">';
        if (Array.isArray(section.content) && section.content.length) {
          const headers = Object.keys(section.content[0]);
          html += "<thead><tr>";
          headers.forEach(h => { html += `<th style="border:1px solid rgba(45,122,58,0.2);padding:8px 12px;background:rgba(45,122,58,0.08);font-weight:600;text-align:left;color:#1a3d22">${h}</th>`; });
          html += "</tr></thead><tbody>";
          section.content.forEach(row => {
            html += "<tr>";
            headers.forEach(h => { html += `<td style="border:1px solid rgba(45,122,58,0.15);padding:8px 12px;color:#374151">${row[h]}</td>`; });
            html += "</tr>";
          });
          html += "</tbody></table></div>";
        }
        break;
      default:
        html += `<p style="margin-bottom:1rem;color:#374151;line-height:1.85;font-family:'Sora',sans-serif">${section.content}</p>`;
    }
  });
  return html;
};

// ─── Scroll reveal (unchanged logic) ─────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref}
      className={`transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const CATS = ["All", "Investment", "Blockchain", "Market Trends", "Technology", "Crypto News", "DeFi", "NFTs", "Wallets"];

// ═════════════════════════════════════════════════════════════════════════════
export default function BlogGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: dynamicPosts, isLoading: postsLoading } = useGetPublishedPostsQuery();
  const { data: recentData } = useGetRecentPostsQuery(5);
  const { data: categoriesData } = useGetCategoriesQuery();

  const allPosts = [
    ...(dynamicPosts?.data?.posts?.map((post) => {
      const id = post._id;
      const manualBaseViews = Number(post.views) >= 1000 ? Number(post.views) : 2000;
      return {
        id,
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage || "https://via.placeholder.com/600x400?text=Post",
        date: post.publishedAt,
        category: post.category?.name || "Uncategorized",
        views: getManualDailyViews({ baseViews: manualBaseViews, startDate: post.publishedAt || "2025-01-01", id }),
        content: post.content,
        author: post.author,
      };
    }) || []),
    ...blogsData,
  ];

  const handleCardClick = (post) => {
    setSelectedPost(post);
    navigate(`/blogGrid/${slugify(post.headline)}`);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    navigate("/blogGrid/");
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const title = selectedPost?.headline || "";
    if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
    else if (platform === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    else if (platform === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    else { navigator.clipboard.writeText(url); alert("Link copied!"); }
  };

  const dynamicCats = ["All", ...new Set(allPosts.map(b => b.category))].filter((v, i, s) => s.indexOf(v) === i);
  const categories = [...new Set([...CATS, ...dynamicCats])].filter((v, i, s) => s.indexOf(v) === i);

  const filteredPosts = allPosts.filter((post) => {
    const q = searchQuery.toLowerCase();
    const matchQ = post.headline.toLowerCase().includes(q) || (post.description || "").toLowerCase().includes(q);
    const matchC = activeCategory === "All" || post.category === activeCategory;
    return matchQ && matchC;
  });

  useEffect(() => {
    const slug = location.pathname.split("/blog/")[1];
    if (slug) {
      const post = allPosts.find((p) => slugify(p.headline) === slug);
      if (post) setSelectedPost(post);
    }
  }, [location, allPosts]);

  const hero = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const stories = filteredPosts.filter(p => p.id !== hero?.id).slice(0, 6);
  const picks = filteredPosts.filter(p => p.trending || p.hot).slice(0, 4);

  // ── POST DETAIL VIEW ──────────────────────────────────────────────────────
  if (selectedPost) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg-page)", fontFamily: "'Sora', sans-serif" }}>
        <Seo page="blog" />
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');`}</style>

        {/* Detail nav */}
        <header className="sticky top-0 z-30 backdrop-blur-sm border-b" style={{ background: "rgba(232,245,224,0.95)", borderColor: "var(--color-border-accent)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors"
              style={{ color: "var(--color-brand-primary)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-brand-dark)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--color-brand-primary)"}
            >
              <ArrowRight size={13} className="rotate-180" /> Back to Blog
            </button>

            {/* Logo */}
            <span className="text-xl font-black tracking-tight" style={{ color: "var(--color-brand-dark)" }}>
              JAI<span style={{ color: "var(--color-brand-accent)" }}>MAX</span>
              <span className="font-normal text-sm ml-1" style={{ color: "var(--color-text-secondary)" }}>blog</span>
            </span>

            <div className="w-24" />
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Category badge + meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5 text-xs uppercase tracking-widest">
                <span className="px-3 py-1 rounded-full font-bold text-[10px]"
                  style={{ background: "var(--color-bg-overlay)", color: "var(--color-brand-primary)", border: "1px solid var(--color-border-accent)" }}>
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1" style={{ color: "var(--color-text-secondary)" }}>
                  <Calendar size={11} />{selectedPost.date}
                </span>
                <span className="flex items-center gap-1" style={{ color: "var(--color-text-secondary)" }}>
                  <Eye size={11} />{formatViewsK(selectedPost.views ?? 2000)} views
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] font-black leading-tight mb-4"
                style={{ color: "var(--color-brand-dark)" }}>
                {selectedPost.headline}
              </h1>
              {selectedPost.content?.title && (
                <p className="text-base mb-6 leading-relaxed font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  {selectedPost.content.title}
                </p>
              )}

              {/* Cover image */}
              {selectedPost.image && (
                <div className="rounded-xl overflow-hidden mb-8 aspect-video shadow-lg">
                  <img src={selectedPost.image} alt={selectedPost.headline} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Body */}
              <div className="prose max-w-none">
                {selectedPost.content?.sections ? (
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertSectionsToHTML(selectedPost.content.sections)) }} />
                ) : (
                  <div className="leading-relaxed text-sm" style={{ color: "var(--color-text-secondary)" }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content || selectedPost.description) }} />
                )}
              </div>

              {/* Share */}
              <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--color-border-accent)" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--color-text-secondary)" }}>
                  Share this article
                </p>
                <div className="flex flex-wrap gap-2">
                  {["twitter", "facebook", "linkedin", "copy"].map(p => (
                    <button key={p} onClick={() => sharePost(p)}
                      className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 capitalize"
                      style={{
                        border: "1px solid var(--color-border-accent)",
                        color: "var(--color-brand-primary)",
                        background: "transparent",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "var(--color-brand-primary)";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "var(--color-brand-primary)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--color-brand-primary)";
                        e.currentTarget.style.borderColor = "var(--color-border-accent)";
                      }}
                    >
                      {p === "copy" ? "Copy Link" : p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-4 rounded-full" style={{ background: "var(--color-brand-accent)" }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: "var(--color-text-secondary)" }}>
                    Recent Posts
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  {allPosts.slice(0, 6).map(post => (
                    <div key={post.id} onClick={() => handleCardClick(post)}
                      className="cursor-pointer group pb-4 last:pb-0"
                      style={{ borderBottom: "1px solid var(--color-border-accent)" }}>
                      <div className="img-zoom overflow-hidden rounded-lg mb-2 aspect-video bg-gray-100">
                        <img src={post.image} alt={post.headline} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[9px] uppercase tracking-wider font-bold mb-1" style={{ color: "var(--color-brand-accent)" }}>
                        {post.category}
                      </p>
                      <h4 className="text-xs font-bold leading-snug line-clamp-2 transition-colors"
                        style={{ color: "var(--color-brand-dark)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--color-brand-primary)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--color-brand-dark)"}
                      >
                        {post.headline}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // ── BLOG LIST VIEW ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-black" style={{ background: "var(--color-bg-page)", fontFamily: "'Sora', sans-serif" }}>
      <Seo page="blog" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform .6s ease; }
        .img-zoom:hover img { transform: scale(1.06); }
        .cat-scroll::-webkit-scrollbar { display: none; }
        .link-underline { position: relative; }
        .link-underline::after { content:''; position:absolute; left:0; bottom:-1px; width:0; height:2px; background:var(--color-brand-accent); transition:width .3s ease; border-radius:2px; }
        .link-underline:hover::after { width:100%; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
      `}</style>
         <div className="max-w-7xl mx-auto" style={{ borderBottom: "1px solid var(--color-border-accent)" }}>
         {/* Logo center */}
            <div className="text-center pt-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none" style={{ color: "var(--color-brand-dark)" }}>
                JAI<span style={{ color: "var(--color-brand-accent)" }}>MAX</span>
                <span className="font-normal text-base ml-1" style={{ color: "var(--color-text-secondary)" }}>blog</span>
              </h1>
              <p className="text-[9px] uppercase tracking-[0.22em] mt-0.5 font-medium" style={{ color: "var(--color-brand-mid)" }}>
                Blockchain · Finance · Crypto
              </p>
            </div>

       {/* Category tabs */}
          <div className="cat-scroll flex items-center overflow-x-auto mt-5 ">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className="text-[10px] uppercase tracking-widest font-bold px-4 py-3 border-b-2 whitespace-nowrap transition-all shrink-0"
                style={{
                  borderBottomColor: activeCategory === c ? "var(--color-brand-accent)" : "transparent",
                  color: activeCategory === c ? "var(--color-brand-dark)" : "var(--color-text-secondary)",
                }}
                onMouseEnter={e => { if (activeCategory !== c) e.currentTarget.style.color = "var(--color-brand-primary)"; }}
                onMouseLeave={e => { if (activeCategory !== c) e.currentTarget.style.color = "var(--color-text-secondary)"; }}
              >
                {c}
              </button>
            ))}
          </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="px-4 py-4 flex flex-col gap-2" style={{ background: "var(--color-bg-surface)", borderBottom: "1px solid var(--color-border-accent)" }}>
          {["Home", "News", "Post Format", "Featured", "Purchase"].map(l => (
            <a key={l} href="#" className="py-2 text-sm font-semibold transition-colors" style={{ borderBottom: "1px solid var(--color-border-accent)", color: "var(--color-text-secondary)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--color-brand-primary)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
            >{l}</a>
          ))}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ════ HERO FEATURED POST ════ */}
        {hero && (
          <Reveal>
            <div
              onClick={() => handleCardClick(hero)}
              className="grid grid-cols-1 md:grid-cols-2 mb-14 overflow-hidden rounded-[6px] cursor-pointer card-hover"
              style={{ border: "1.5px solid var(--color-border-accent)", boxShadow: "0 4px 24px rgba(45,122,58,0.08)" }}
            >
              {/* Image */}
              <div className="img-zoom overflow-hidden aspect-[4/3] md:aspect-auto md:h-96 bg-gray-100">
                <img src={hero.image} alt={hero.headline} className="w-full h-full object-cover" />
              </div>

              {/* Text panel */}
              <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12"
                style={{ background: "var(--color-bg-surface)", borderLeft: "1.5px solid var(--color-border-accent)" }}>

                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[9px] uppercase  font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "var(--color-bg-overlay)", color: "var(--color-brand-primary)", border: "1px solid var(--color-border-accent)" }}>
                    {hero.date}
                  </span>
                  <span className="text-[9px] uppercase font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "var(--color-brand-accent)", color: "#fff" }}>
                    {hero.category}
                  </span>
                  {hero.trending && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-1 rounded-full"
                      style={{ background: "var(--color-brand-primary)", color: "#fff" }}>
                      <TrendingUp size={8} /> Trending
                    </span>
                  )}
                  {hero.featured && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-1 rounded-full"
                      style={{ border: "1.5px solid var(--color-brand-accent)", color: "var(--color-brand-primary)" }}>
                      <Star size={8} /> Featured
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-[1.9rem] font-semibold leading-tight mb-4 link-underline"
                  style={{ color: "var(--color-brand-dark)" }}>
                  {hero.headline}
                </h2>

                <p className="text-sm leading-relaxed mb-6 line-clamp-3"
                  style={{ color: "var(--color-text-secondary)" }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hero.description?.substring(0, 200) + "...") }} />

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--color-brand-primary)", borderBottom: "2px solid var(--color-brand-accent)", paddingBottom: "2px" }}>
                    Read Article <ArrowRight size={12} />
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                    <Eye size={11} />{formatViewsK(hero.views ?? 2000)}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ════ SECTION LABEL ════ */}
        <Reveal>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-brand-accent)" }} />
            <p className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--color-text-secondary)" }}>
              Browse and Read the Latest Staff
            </p>
            <div className="flex-1 h-px" style={{ background: "var(--color-border-accent)" }} />
          </div>
          <h3 className="text-2xl sm:text-3xl  mb-9" style={{ color: "var(--color-brand-dark)" }}>
            Latest Stories
          </h3>
        </Reveal>

        {/* ════ STORIES GRID ════ */}
        {postsLoading && filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
              style={{ borderColor: "var(--color-brand-primary)", borderTopColor: "transparent" }} />
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--color-text-secondary)" }}>
              Loading articles...
            </p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {stories.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <article
                  className="cursor-pointer group rounded-[6px] overflow-hidden card-hover"
                  onClick={() => handleCardClick(post)}
                  style={{ background: "var(--color-bg-surface)", border: "1.5px solid var(--color-border-accent)" }}
                >
                  {/* Image */}
                  <div className="img-zoom aspect-[16/9] overflow-hidden bg-gray-100">
                    <img src={post.image} alt={post.headline} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5">
                    {/* Badges */}
                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {post.trending && (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-0.5"
                          style={{ background: "var(--color-brand-primary)", color: "#fff" }}>
                          <TrendingUp size={8} />Trending
                        </span>
                      )}
                      {post.hot && (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-0.5"
                          style={{ background: "var(--color-brand-mid)", color: "#fff" }}>
                          <Flame size={8} />Hot
                        </span>
                      )}
                      {post.featured && (
                        <span className="text-[9px] font-bold uppercase  px-2 py-0.5 rounded-full inline-flex items-center gap-0.5"
                          style={{ border: "1.5px solid var(--color-brand-accent)", color: "var(--color-brand-primary)" }}>
                          <Star size={8} />Pick
                        </span>
                      )}
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--color-bg-overlay)", color: "var(--color-brand-accent)" }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Headline */}
                    <h4 className="text-base font-bold leading-snug mb-2 link-underline transition-colors"
                      style={{ color: "var(--color-brand-dark)" }}>
                      {post.headline}
                    </h4>

                    {/* Excerpt */}
                    <div className="text-xs leading-relaxed line-clamp-2 mb-4"
                      style={{ color: "var(--color-text-secondary)" }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((post.description || "").substring(0, 130) + "...") }} />

                    {/* Footer */}
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider pt-3"
                      style={{ borderTop: "1px solid var(--color-border-accent)", color: "var(--color-text-muted)" }}>
                      <span className="flex items-center gap-1"><Calendar size={9} />{post.date}</span>
                      <span className="flex items-center gap-1"><Eye size={9} />{formatViewsK(post.views ?? 2000)}</span>
                      <button
                        className="flex items-center gap-1 transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--color-brand-primary)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-muted)"}
                        onClick={e => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(window.location.origin + `/blog/${slugify(post.headline)}`);
                          alert("Link copied!");
                        }}
                      >
                        <Share2 size={9} />Share
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--color-text-secondary)" }}>
              No articles found. Try adjusting your search.
            </p>
          </div>
        )}

        {/* ════ STAFF'S PICKS ════ */}
        {picks.length > 0 && (
          <>
            <Reveal>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: "var(--color-brand-accent)" }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--color-text-secondary)" }}>
                  Editor's Choice
                </p>
                <div className="flex-1 h-px" style={{ background: "var(--color-border-accent)" }} />
              </div>
              <h3 className="text-2xl sm:text-3xl mb-9" style={{ color: "var(--color-brand-dark)" }}>
                Staff's Picks
              </h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {picks.map((post, i) => (
                <Reveal key={post.id} delay={i * 70}>
                  <article
                    className="cursor-pointer group rounded-[6px] overflow-hidden card-hover"
                    onClick={() => handleCardClick(post)}
                    style={{ background: "var(--color-bg-surface)", border: "1.5px solid var(--color-border-accent)" }}
                  >
                    <div className="img-zoom aspect-[3/2] overflow-hidden bg-gray-100">
                      <img src={post.image} alt={post.headline} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        {post.hot && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                            style={{ background: "var(--color-brand-mid)", color: "#fff" }}>Hot</span>
                        )}
                        {post.trending && (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                            style={{ background: "var(--color-brand-primary)", color: "#fff" }}>Trending</span>
                        )}
                        <span className="text-[9px] uppercase font-bold"
                          style={{ color: "var(--color-brand-accent)" }}>{post.category}</span>
                      </div>
                      <h4 className="text-sm font-bold leading-snug line-clamp-2 mb-2 link-underline transition-colors"
                        style={{ color: "var(--color-brand-dark)" }}>
                        {post.headline}
                      </h4>
                      <p className="text-[10px] flex items-center gap-1 uppercase tracking-wider font-medium"
                        style={{ color: "var(--color-text-muted)" }}>
                        <Calendar size={9} />{post.date}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ════ LOAD MORE ════ */}
        <Reveal>
          <div className="text-center py-8" style={{ borderTop: "1px solid var(--color-border-accent)" }}>
            <button
              className="text-xs font-bold uppercase tracking-[0.25em] px-10 py-3.5 rounded-full transition-all duration-300"
              style={{
                border: "2px solid var(--color-brand-primary)",
                color: "var(--color-brand-primary)",
                background: "transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--color-brand-primary)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow = "var(--shadow-btn)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--color-brand-primary)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Load More Articles
            </button>
          </div>
        </Reveal>
      </main>

     
    </div>
  );
}
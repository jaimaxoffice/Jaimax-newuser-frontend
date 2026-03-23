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
  useGetRecentPostsQuery,
  useGetCategoriesQuery,
} from "../../../components/Blogsection/BlogEditorApiSlice";

import Blog1 from "../../../assets/Blog1poster.webp";
import Blog2 from "../../../assets/Blog2poster.webp";
import Blog3 from "../../../assets/Blog3poster.webp";
import Blog4 from "../../../assets/Blog4poster.webp";
import Blog5 from "../../../assets/Blog5poster.webp";

// ─── Static blog data (your real data) ───────────────────────────────────────
const blogsData = [
  {
    id: 5,
    image: Blog5,
    headline: "Why Jaimax Is the Smart Move Right Now",
    description: `In today's rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many crypto tokens emerging globally, Jaimax stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem.`,
    date: "09 june 25",
    category: "Investment",
    trending: true,
    content: {
      title: "Jaimax: The Best Crypto token Emerging from India",
      sections: [
        { type: "paragraph", content: `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9">best crypto token in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment.` },
        { type: "heading", content: "Unmatched Growth Potential at a Low Price Point" },
        { type: "paragraph", content: "Jaimax's current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum." },
        { type: "heading", content: "Strong Use Cases Driving Real-World Utility" },
        { type: "paragraph", content: "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:" },
        { type: "unordered_list", content: ["<b>Decentralized applications (dApps)</b>", "<b>Non-fungible tokens (NFTs)</b>", "<b>Digital payments in e-commerce</b>", "<b>Community rewards and incentives</b>"] },
        { type: "heading", content: "Robust and Secure Blockchain Infrastructure" },
        { type: "paragraph", content: "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project's architecture emphasizes scalability and security." },
        { type: "heading", content: "In Summary" },
        { type: "paragraph", content: "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity." },
      ],
    },
  },
  {
    id: 4,
    image: Blog4,
    headline: "Jaimax: The Future of Cryptocurrency from India to the World",
    description: "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark. Positioned at the intersection of blockchain technology, financial empowerment, and digital freedom.",
    date: "09 june 25",
    category: "Blockchain",
    hot: true,
    content: {
      title: "The Rise of a Revolutionary Crypto Brand",
      sections: [
        { type: "paragraph", content: `In a world driven by digital transformation and decentralized innovation, <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9">Jaimax</a> is emerging as a pioneering cryptocurrency born in India.` },
        { type: "heading", content: "A Vision Beyond Borders: Jaimax's Global Mission" },
        { type: "paragraph", content: "At its core, Jaimax envisions a decentralized future where financial opportunities are not limited by geography, background, or financial history." },
        { type: "heading", content: "Blockchain Backbone: The Technology Powering Jaimax" },
        { type: "unordered_list", content: ["<b>High TPS:</b> Jaimax supports lightning-fast processing.", "<b>Energy-Efficient Consensus Mechanism:</b> Reduces carbon footprints.", "<b>Smart Contract Integration:</b> Build dApps, DeFi protocols, and NFT platforms."] },
        { type: "heading", content: "Conclusion: Jaimax is the Future" },
        { type: "paragraph", content: "Jaimax is more than just a crypto token — it's a revolution from India, built for the world." },
      ],
    },
  },
  {
    id: 1,
    image: Blog1,
    headline: "The Power of Early Investment: Why Now is the Time for Jaimax",
    description: "In the dynamic world of cryptocurrency, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India.",
    date: "05 may 25",
    category: "Market Trends",
    trending: true,
    featured: true,
    content: {
      title: "Timing Defines Opportunity in Cryptocurrency",
      sections: [
        { type: "paragraph", content: `In the dynamic world of <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9">cryptocurrency</a>, success often belongs to those who act early.` },
        { type: "heading", content: "Why Jaimax is Gaining Attention" },
        { type: "paragraph", content: "What separates Jaimax from the sea of altcoins? It's the combination of technology, local market alignment, transparent development, and long-term vision." },
        { type: "heading", content: "Why ₹0.50 is a Golden Entry Point" },
        { type: "unordered_list", content: ["Lowest possible risk with highest potential reward", "Ideal for long-term holding and short-term trading", "Entry before upcoming upgrades and visibility boosts"] },
        { type: "heading", content: "Conclusion: The Smart Move Is to Act Early" },
        { type: "paragraph", content: `Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9">best crypto coins in India</a> today.` },
      ],
    },
  },
  {
    id: 2,
    image: Blog2,
    headline: "How Jaimax Works: A Deep Dive into Our Coin and Technology",
    description: "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the best crypto coin in India.",
    date: "12 may 25",
    category: "Technology",
    content: {
      title: "Jaimax: The Best Crypto Coin in India",
      sections: [
        { type: "paragraph", content: `Jaimax is revolutionizing the way India experiences cryptocurrency. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9">best crypto to invest in India</a>.` },
        { type: "heading", content: "The Technology Backbone of Jaimax" },
        { type: "unordered_list", content: ["Block Generation Time: 2 seconds", "Transaction Speed: Over 5,000 TPS", "Network Uptime: 99.99%", "Gas Fees: Extremely low and consistent"] },
        { type: "heading", content: "Coin Supply and Investment Structure" },
        { type: "unordered_list", content: ["Total Supply: 1 Billion Jaimax coins", "Launch Price: ₹0.10", "Current Price: ₹0.50", "Public Trading Launch: After Phase 2"] },
        { type: "heading", content: "Conclusion: Secure Your Place in the Future with Jaimax" },
        { type: "paragraph", content: "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today." },
      ],
    },
  },
  {
    id: 3,
    image: Blog3,
    headline: "Understanding Cryptocurrency: A Simple Guide for New Users",
    description: "Cryptocurrency has dramatically transformed the financial landscape, offering an innovative and decentralized method of transactions that challenges traditional financial systems. This guide will break down cryptocurrency in simple terms.",
    date: "13 may 25",
    category: "Crypto News",
    content: {
      title: "What is Cryptocurrency?",
      sections: [
        { type: "paragraph", content: "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network." },
        { type: "heading", content: "How Does Cryptocurrency Work?" },
        { type: "paragraph", content: "Cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring that both the transaction and the identity of the sender are protected." },
        { type: "heading", content: "Types of Cryptocurrency" },
        { type: "subheading", content: "Bitcoin (BTC)" },
        { type: "paragraph", content: "Bitcoin is the original cryptocurrency, introduced in 2009. It remains the largest by market capitalization." },
        { type: "subheading", content: "Ethereum (ETH)" },
        { type: "paragraph", content: "Ethereum enables developers to create smart contracts and decentralized applications (dApps)." },
        { type: "heading", content: "Jaimax: A Top Cryptocurrency to Invest in India" },
        { type: "paragraph", content: `For those looking for the <a href="https://www.jaimax.com/" target="_blank" rel="noopener noreferrer" style="color:#0ea5e9">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity with its unique approach and growing community.` },
        { type: "heading", content: "Conclusion" },
        { type: "paragraph", content: "Cryptocurrency is revolutionizing finance. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising." },
      ],
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
        html += `<h3 style="font-size:1.2rem;font-weight:700;margin:1.5rem 0 0.75rem;color:#111;font-family:'Lora',Georgia,serif">${section.content}</h3>`;
        break;
      case "subheading":
        html += `<h4 style="font-size:1rem;font-weight:600;margin:1.25rem 0 0.5rem;color:#333;font-family:'Lora',Georgia,serif">${section.content}</h4>`;
        break;
      case "paragraph":
        html += `<p style="margin-bottom:1rem;color:#444;line-height:1.8;font-family:'Barlow',sans-serif;font-size:0.95rem">${section.content}</p>`;
        break;
      case "unordered_list":
        html += '<ul style="margin-bottom:1rem;padding-left:1.5rem">';
        section.content.forEach((item) => {
          html += `<li style="margin-bottom:0.4rem;color:#444;line-height:1.7;font-family:'Barlow',sans-serif;font-size:0.9rem">${item}</li>`;
        });
        html += "</ul>";
        break;
      case "table":
        html += '<div style="overflow-x:auto;margin-bottom:1rem"><table style="width:100%;border-collapse:collapse;font-family:Barlow,sans-serif;font-size:0.85rem">';
        if (Array.isArray(section.content) && section.content.length) {
          const headers = Object.keys(section.content[0]);
          html += "<thead><tr>";
          headers.forEach(h => { html += `<th style="border:1px solid #e5e7eb;padding:8px 12px;background:#f9fafb;font-weight:600;text-align:left">${h}</th>`; });
          html += "</tr></thead><tbody>";
          section.content.forEach(row => {
            html += "<tr>";
            headers.forEach(h => { html += `<td style="border:1px solid #e5e7eb;padding:8px 12px">${row[h]}</td>`; });
            html += "</tr>";
          });
          html += "</tbody></table></div>";
        }
        break;
      default:
        html += `<p style="margin-bottom:1rem;color:#444;line-height:1.8;font-family:'Barlow',sans-serif">${section.content}</p>`;
    }
  });
  return html;
};

// ─── Scroll reveal ────────────────────────────────────────────────────────────
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
    <div ref={ref} className={`transition-all duration-700 ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}
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
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Lora',Georgia,serif" }}>
        <Seo page="blog" />
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Barlow:wght@400;500;600;700&display=swap');.font-body{font-family:'Barlow',sans-serif}`}</style>

        {/* Detail nav */}
        <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <button onClick={handleBackClick} className="font-body inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">
              <ArrowRight size={13} className="rotate-180" /> Back to Blog
            </button>
            <span className="text-xl font-bold tracking-tight">JAIMAX<span className="font-normal italic text-gray-400">blog</span></span>
            <div className="w-24" />
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Meta */}
              <div className="font-body flex flex-wrap items-center gap-3 mb-5 text-xs text-gray-400 uppercase tracking-widest">
                <span className="text-black font-semibold">{selectedPost.category}</span>
                <span className="text-gray-200">·</span>
                <span className="flex items-center gap-1"><Calendar size={11} />{selectedPost.date}</span>
                <span className="text-gray-200">·</span>
                <span className="flex items-center gap-1"><Eye size={11} />{formatViewsK(selectedPost.views ?? 2000)} views</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black mb-4">{selectedPost.headline}</h1>
              {selectedPost.content?.title && (
                <h2 className="font-body text-lg text-gray-500 mb-6 leading-relaxed italic">{selectedPost.content.title}</h2>
              )}

              {/* Cover image */}
              {selectedPost.image && (
                <div className="rounded-sm overflow-hidden mb-8 aspect-video">
                  <img src={selectedPost.image} alt={selectedPost.headline} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Body */}
              <div className="prose max-w-none">
                {selectedPost.content?.sections ? (
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(convertSectionsToHTML(selectedPost.content.sections)) }} />
                ) : (
                  <div className="font-body text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content || selectedPost.description) }} />
                )}
              </div>

              {/* Share */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="font-body text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Share this article</p>
                <div className="flex flex-wrap gap-2">
                  {["twitter","facebook","linkedin","copy"].map(p => (
                    <button key={p} onClick={() => sharePost(p)}
                      className="font-body text-xs font-semibold border border-gray-200 hover:border-black hover:text-black text-gray-400 px-4 py-2 transition-all capitalize">
                      {p === "copy" ? "Copy Link" : p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-3 h-px bg-gray-300 inline-block" />Recent Posts
                </p>
                <div className="flex flex-col gap-5">
                  {allPosts.slice(0, 6).map(post => (
                    <div key={post.id} onClick={() => handleCardClick(post)}
                      className="cursor-pointer group border-b border-gray-50 pb-4 last:border-0">
                      <div className="overflow-hidden rounded-sm mb-2 aspect-video bg-gray-100">
                        <img src={post.image} alt={post.headline} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <p className="font-body text-[10px] uppercase tracking-wider text-gray-400 mb-1">{post.category}</p>
                      <h4 className="text-sm font-bold text-black group-hover:text-gray-500 transition-colors line-clamp-2 leading-snug">{post.headline}</h4>
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
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'Lora',Georgia,serif" }}>
      <Seo page="blog" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Barlow:wght@400;500;600;700&display=swap');
        .font-body{font-family:'Barlow',sans-serif}
        .img-zoom img{transition:transform .6s ease}
        .img-zoom:hover img{transform:scale(1.05)}
        .link-line{position:relative}
        .link-line::after{content:'';position:absolute;left:0;bottom:-1px;width:0;height:1px;background:#000;transition:width .3s ease}
        .link-line:hover::after{width:100%}
        .cat-scroll::-webkit-scrollbar{display:none}
      `}</style>

      {/* ── NAV ── */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            {/* Left links */}
            <div className="hidden md:flex items-center gap-6 font-body text-[10px] uppercase tracking-widest text-gray-400">
              {["Home","News","Post Format","Featured","Purchase"].map(l => (
                <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
              ))}
            </div>
            <button className="md:hidden font-body text-xs text-gray-400 hover:text-black" onClick={() => setMobileMenu(o => !o)}>☰ Menu</button>

            {/* Logo center */}
            <div className="text-center absolute left-1/2 -translate-x-1/2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-none">
                JAIMAX<span className="font-normal italic text-gray-400">blog</span>
              </h1>
              <p className="font-body text-[9px] uppercase tracking-[0.22em] text-gray-300 mt-0.5">Blockchain · Finance · Crypto</p>
            </div>

            {/* Right: social + search */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 font-body text-[10px] uppercase tracking-widest text-gray-300">
                <a href="#" className="hover:text-black transition-colors">f</a>
                <a href="#" className="hover:text-black transition-colors">𝕏</a>
                <a href="#" className="hover:text-black transition-colors">in</a>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="font-body text-xs pl-8 pr-3 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:border-black transition-colors w-28 sm:w-40"
                />
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="cat-scroll flex items-center overflow-x-auto">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`font-body text-[10px] uppercase tracking-widest font-semibold px-4 py-3 border-b-2 whitespace-nowrap transition-all shrink-0 ${activeCategory === c ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="bg-white border-b border-gray-100 px-4 py-4 flex flex-col gap-2 font-body">
          {["Home","News","Post Format","Featured","Purchase"].map(l => (
            <a key={l} href="#" className="py-1.5 border-b border-gray-50 text-sm text-gray-500 hover:text-black">{l}</a>
          ))}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ════ HERO FEATURED POST ════ */}
        {hero && (
          <Reveal>
            <div
              onClick={() => handleCardClick(hero)}
              className="grid grid-cols-1 md:grid-cols-2 mb-14 border border-gray-100 overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <div className="img-zoom overflow-hidden aspect-[4/3] md:aspect-auto md:h-96 bg-gray-100">
                <img src={hero.image} alt={hero.headline} className="w-full h-full object-cover" />
              </div>

              {/* Text */}
              <div className="bg-white flex flex-col justify-center p-8 sm:p-10 md:p-12 border-t md:border-t-0 md:border-l border-gray-100">
                <div className="font-body flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">{hero.date}</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">{hero.category}</span>
                  {hero.trending && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5">
                      <TrendingUp size={8} /> Trending
                    </span>
                  )}
                  {hero.featured && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider border border-black text-black px-2 py-0.5">
                      <Star size={8} /> Featured
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-black mb-4 group-hover:text-gray-600 transition-colors">
                  {hero.headline}
                </h2>

                <p className="font-body text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hero.description?.substring(0, 200) + "...") }} />

                <div className="flex items-center justify-between">
                  <span className="font-body inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5">
                    Read Article <ArrowRight size={12} />
                  </span>
                  <span className="font-body flex items-center gap-1 text-xs text-gray-300">
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
            <div className="w-1 h-5 bg-black" />
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Browse and Read the Latest Staff</p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-9">Latest Stories</h3>
        </Reveal>

        {/* ════ STORIES GRID ════ */}
        {postsLoading && filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body text-xs uppercase tracking-widest text-gray-400">Loading articles...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stories.map((post, i) => (
              <Reveal key={post.id} delay={i * 60}>
                <article className="cursor-pointer group" onClick={() => handleCardClick(post)}>
                  {/* Image */}
                  <div className="img-zoom aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                    <img src={post.image} alt={post.headline} className="w-full h-full object-cover" />
                  </div>

                  {/* Badges + category */}
                  <div className="font-body flex items-center gap-1.5 mb-2 flex-wrap">
                    {post.trending && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-black text-white px-1.5 py-0.5 inline-flex items-center gap-0.5">
                        <TrendingUp size={8} />Trending
                      </span>
                    )}
                    {post.hot && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-gray-700 text-white px-1.5 py-0.5 inline-flex items-center gap-0.5">
                        <Flame size={8} />Hot
                      </span>
                    )}
                    {post.featured && (
                      <span className="text-[9px] font-bold uppercase tracking-wider border border-black text-black px-1.5 py-0.5 inline-flex items-center gap-0.5">
                        <Star size={8} />Pick
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{post.category}</span>
                  </div>

                  {/* Headline */}
                  <h4 className="text-base sm:text-lg font-bold text-black leading-snug mb-2 group-hover:text-gray-500 transition-colors link-line">
                    {post.headline}
                  </h4>

                  {/* Excerpt */}
                  <div className="font-body text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((post.description || "").substring(0, 130) + "...") }} />

                  {/* Footer */}
                  <div className="font-body flex items-center justify-between text-[10px] text-gray-300 uppercase tracking-wider pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1"><Calendar size={9} />{post.date}</span>
                    <span className="flex items-center gap-1"><Eye size={9} />{formatViewsK(post.views ?? 2000)}</span>
                    <button
                      className="flex items-center gap-1 hover:text-black transition-colors"
                      onClick={e => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(window.location.origin + `/blog/${slugify(post.headline)}`);
                        alert("Link copied!");
                      }}
                    >
                      <Share2 size={9} />Share
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-body text-xs uppercase tracking-widest text-gray-400">No articles found. Try adjusting your search.</p>
          </div>
        )}

        {/* ════ STAFF'S PICKS ════ */}
        {picks.length > 0 && (
          <>
            <Reveal>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-1 h-5 bg-black" />
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Editor's Choice</p>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-9">Staff's Picks</h3>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {picks.map((post, i) => (
                <Reveal key={post.id} delay={i * 70}>
                  <article className="cursor-pointer group" onClick={() => handleCardClick(post)}>
                    <div className="img-zoom aspect-[3/2] overflow-hidden bg-gray-100 mb-3">
                      <img src={post.image} alt={post.headline} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-body flex items-center gap-1.5 mb-1.5">
                      {post.hot && <span className="text-[9px] font-bold uppercase tracking-wider bg-gray-700 text-white px-1.5 py-0.5">Hot</span>}
                      {post.trending && <span className="text-[9px] font-bold uppercase tracking-wider bg-black text-white px-1.5 py-0.5">Trending</span>}
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{post.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-black leading-snug group-hover:text-gray-500 transition-colors link-line line-clamp-2">{post.headline}</h4>
                    <p className="font-body text-[10px] text-gray-300 mt-2 flex items-center gap-1 uppercase tracking-wider">
                      <Calendar size={9} />{post.date}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ════ LOAD MORE ════ */}
        <Reveal>
          <div className="text-center py-8 border-t border-gray-100">
            <button className="font-body text-xs font-bold uppercase tracking-[0.25em] border-2 border-black text-black px-10 py-3.5 hover:bg-black hover:text-white transition-all duration-300">
              Load More Articles
            </button>
          </div>
        </Reveal>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-300 uppercase tracking-widest">© 2025 Jaimax · All rights reserved</p>
          <div className="font-body flex gap-6 text-[10px] uppercase tracking-widest text-gray-300">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
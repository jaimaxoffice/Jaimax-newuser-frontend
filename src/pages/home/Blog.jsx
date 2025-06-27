// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import { motion } from 'framer-motion';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 px-6 py-12 bg-gradient-to-br from-yellow-50 via-white to-violet-100 min-h-screen">
//       {/* Sidebar */}
//       <motion.aside 
//         className="lg:w-1/4 w-full space-y-10"
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search crypto blog..."
//             className="w-full p-2 border rounded pl-10"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-3">Categories</h2>
//           <ul className="space-y-2 text-gray-700">
//             {categories.map((cat) => (
//               <li
//                 key={cat}
//                 className={`hover:underline cursor-pointer ${activeCategory === cat ? 'font-bold text-blue-600' : ''}`}
//                 onClick={() => setActiveCategory(cat)}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-3">Top Posts</h2>
//           <ul className="space-y-3 text-gray-800">
//             {topPosts.map((post, i) => (
//               <li key={i} className="flex items-start gap-3">
//                 <span className="text-xl font-bold text-gray-500">{i + 1}</span>
//                 <p className="text-sm hover:underline cursor-pointer">{post}</p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-3">Jaimax Socials</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {[...Array(9)].map((_, idx) => (
//               <img
//                 key={idx}
//                 src={defaultImage}
//                 alt={`jaimax-${idx}`}
//                 className="rounded"
//               />
//             ))}
//           </div>
//         </div>
//       </motion.aside>

//       {/* Posts Grid */}
//       <motion.main
//         className="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         {filteredPosts.map((post, idx) => (
//           <motion.div
//             key={idx}
//             className="bg-white rounded overflow-hidden shadow hover:shadow-xl transition duration-300"
//             whileHover={{ scale: 1.03 }}
//           >
//             <img src={post.image} alt="post" className="w-full h-48 object-cover" />
//             <div className="p-4 space-y-1">
//               <p className="text-sm text-gray-400">{post.category} / {post.date}</p>
//               <h3 className="font-semibold text-lg hover:underline cursor-pointer">{post.title}</h3>
//               <p className="text-gray-600 text-sm">{post.excerpt}</p>
//             </div>
//           </motion.div>
//         ))}
//       </motion.main>
//     </div>
//   );
// };

// export default BlogLayout;
// import React, { useState } from 'react';
// import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Flame, Zap, Eye, Clock } from 'lucide-react';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support and institutional backing driving unprecedented growth.',
//     trending: true,
//     views: '12.5K',
//     readTime: '3'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted and secure wallet solutions specifically designed for Jaimax cryptocurrency storage.',
//     featured: true,
//     views: '8.2K',
//     readTime: '5'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Comprehensive analysis shows Jaimax leading the altcoin rally with superior performance metrics.',
//     views: '15.7K',
//     readTime: '4'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Revolutionary DeFi integration strategies that maximize yield potential through Jaimax ecosystem.',
//     views: '9.4K',
//     readTime: '6'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'How Jaimax is transforming the NFT landscape with faster, cheaper, and more efficient transactions.',
//     hot: true,
//     views: '11.1K',
//     readTime: '4'
//   },
//   {
//     image: defaultImage,
//     category: 'Blockchain',
//     date: 'May 25, 2025',
//     title: 'Jaimax blockchain architecture deep dive analysis',
//     excerpt: 'Technical breakdown of Jaimax innovative blockchain infrastructure and scalability solutions.',
//     views: '7.8K',
//     readTime: '8'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [hoveredPost, setHoveredPost] = useState(null);

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div 
//       className="min-h-screen  px-6 py-8"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       <div className="w-full mx-0">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* Sidebar - Cohesive Teal/Cyan Theme */}
//           <aside className="lg:col-span-1 space-y-6">

//             {/* Search Bar */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search insights..."
//                     className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
//                   />
//                   <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <TrendingUp className="w-4 h-4 text-cyan-400" />
//                   <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
//                 </div>
//                 <div className="space-y-1">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setActiveCategory(cat)}
//                       className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
//                         activeCategory === cat
//                           ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40'
//                           : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10'
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Top Posts */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-teal-950/80 to-cyan-950/70 backdrop-blur-xl rounded-2xl border border-teal-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Flame className="w-4 h-4 text-teal-400" />
//                   <h3 className="font-semibold text-teal-100 text-sm">Trending</h3>
//                 </div>
//                 <div className="space-y-3">
//                   {topPosts.slice(0, 4).map((post, i) => (
//                     <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
//                       <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-teal-400/40">
//                         <span className="text-xs font-bold text-teal-200">{i + 1}</span>
//                       </div>
//                       <p className="text-xs text-teal-200/80 group-hover/item:text-teal-100 transition-colors line-clamp-2 leading-relaxed">
//                         {post}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Community */}
//             {/* <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Users className="w-4 h-4 text-cyan-400" />
//                   <h3 className="font-semibold text-cyan-100 text-sm">Community</h3>
//                 </div>
//                 <div className="grid grid-cols-3 gap-2">
//                   {[...Array(6)].map((_, idx) => (
//                     <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-cyan-400/25 hover:border-cyan-300/50 transition-all duration-300 group/img">
//                       <img
//                         src={defaultImage}
//                         alt={`community ${idx + 1}`}
//                         className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div> */}
//           </aside>

//           {/* Main Content - Matching Teal/Cyan Theme */}
//           <main className="lg:col-span-3">

//             {/* Header */}
//            <div className="mb-8">
//   <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//     <div>
//       <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
//         Crypto Insights
//       </h1>
//       <p className="text-cyan-200/70 text-sm">Latest news and analysis from the blockchain world</p>
//     </div>
//     <div className="text-left lg:text-right">
//       <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
//       <p className="text-teal-400/60 text-xs">Updated daily</p>
//     </div>
//   </div>
// </div>


//             {/* Posts Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2   xl:grid-cols-3 gap-8 w-full">
//               {filteredPosts.map((post, idx) => (
//                 <article
//                   key={idx}
//                   className="group relative h-full w-full "
//                   onMouseEnter={() => setHoveredPost(idx)}
//                   onMouseLeave={() => setHoveredPost(null)}
//                 >
//                   {/* Glow Effect */}
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

//                   {/* Card */}
//                   <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">

//                     {/* Image */}
//                     <div className="relative aspect-video overflow-hidden">
//                       <img 
//                         src={post.image} 
//                         alt={post.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//                       {/* Badges - All using Teal/Cyan variations */}
//                       <div className="absolute top-3 left-3 flex gap-2">
//                         {post.trending && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <TrendingUp className="w-3 h-3" />
//                             Trending
//                           </span>
//                         )}
//                         {post.featured && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
//                             <Star className="w-3 h-3" />
//                             Featured
//                           </span>
//                         )}
//                         {post.hot && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <Flame className="w-3 h-3" />
//                             Hot
//                           </span>
//                         )}
//                       </div>

//                       {/* Views */}
//                       <div className="absolute top-3 right-3">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
//                           <Eye className="w-3 h-3" />
//                           {post.views}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-5 flex flex-col flex-grow">

//                       {/* Meta */}
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
//                           {post.category}
//                         </span>
//                         <div className="flex items-center gap-1 text-xs text-teal-400/80">
//                           <Calendar className="w-3 h-3" />
//                           {post.date}
//                         </div>
//                       </div>

//                       {/* Title */}
//                       <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow">
//                         {post.title}
//                       </h3>

//                       {/* Excerpt */}
//                       <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
//                         {post.excerpt}
//                       </p>

//                       {/* Footer */}
//                       <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
//                         <button className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1">
//                           Read More 
//                           <ArrowRight className="w-4 h-4" />
//                         </button>

//                         <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
//                           <Clock className="w-3 h-3" />
//                           {post.readTime} min read
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>

//             {/* Load More */}
//             <div className="mt-12 text-center">
//               <button className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
//                 <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
//                   Load More Articles
//                 </div>
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogLayout;

// import React, { useState } from 'react';
// import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Flame, Zap } from 'lucide-react';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.',
//     trending: true,
//     views: '12.5K'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.',
//     featured: true,
//     views: '8.2K'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.',
//     views: '15.7K'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.',
//     views: '9.4K'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.',
//     hot: true,
//     views: '11.1K'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [hoveredPost, setHoveredPost] = useState(null);

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div 
//       className="flex flex-col lg:flex-row gap-8 px-6 py-12 min-h-screen"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       {/* Sidebar */}
//       <aside className="lg:w-1/4 w-full space-y-8 transform transition-all duration-700 hover:scale-[1.02]">
//         {/* Search Bar */}
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-slate-900/60 to-gray-900/40 backdrop-blur-xl rounded-xl border border-violet-400/30 overflow-hidden">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search crypto insights..."
//               aria-label="Search crypto blog"
//               className="w-full p-4 pl-12 bg-transparent text-white placeholder-violet-200/70 focus:outline-none transition-all duration-300"
//             />
//             <Search className="absolute left-4 top-4 text-violet-400 w-5 h-5 group-focus-within:text-violet-300 transition-colors" />
//             <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </div>
//         </div>

//         {/* Categories */}
//         <nav aria-label="Categories" className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-emerald-900/40 to-teal-900/30 backdrop-blur-xl rounded-xl border border-emerald-400/30 p-6 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-5 h-5 text-emerald-400" />
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
//                 Categories
//               </h2>
//             </div>
//             <ul className="space-y-2">
//               {categories.map((cat) => (
//                 <li
//                   key={cat}
//                   tabIndex={0}
//                   className={`relative overflow-hidden rounded-lg px-4 py-3 cursor-pointer transition-all duration-300 group/item ${
//                     activeCategory === cat 
//                       ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-200 font-semibold shadow-lg border border-emerald-400/40' 
//                       : 'text-gray-300 hover:text-emerald-200 hover:bg-emerald-500/10'
//                   }`}
//                   onClick={() => setActiveCategory(cat)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') setActiveCategory(cat);
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
//                   <span className="relative z-10">{cat}</span>
//                   {activeCategory === cat && (
//                     <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                       <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>

//         {/* Top Posts */}
//         <nav aria-label="Top Posts" className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-amber-900/40 to-orange-900/30 backdrop-blur-xl rounded-xl border border-amber-400/30 p-6 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
//             <div className="flex items-center gap-2 mb-4">
//               <Flame className="w-5 h-5 text-amber-400" />
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
//                 Trending Now
//               </h2>
//             </div>
//             <ul className="space-y-3">
//               {topPosts.map((post, i) => (
//                 <li
//                   key={i}
//                   tabIndex={0}
//                   className="group/post flex items-start gap-3 hover:bg-amber-500/10 rounded-lg p-3 cursor-pointer transition-all duration-300"
//                   onClick={() => {}}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {};
//                   }}
//                 >
//                   <div className="relative">
//                     <span className="text-lg font-bold text-amber-300 bg-gradient-to-br from-amber-500/30 to-orange-500/30 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg border border-amber-400/40">
//                       {i + 1}
//                     </span>
//                     {i < 3 && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-200 group-hover/post:text-amber-200 transition-colors line-clamp-2 flex-1">
//                     {post}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>

//         {/* Jaimax Socials */}
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/30 backdrop-blur-xl rounded-xl border border-blue-400/30 p-6 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
//             <div className="flex items-center gap-2 mb-4">
//               <Users className="w-5 h-5 text-blue-400" />
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
//                 Community Hub
//               </h2>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {[...Array(9)].map((_, idx) => (
//                 <div key={idx} className="relative group/img overflow-hidden rounded-lg">
//                   <img
//                     src={defaultImage}
//                     alt={`jaimax social ${idx + 1}`}
//                     className="w-full aspect-square object-cover border border-blue-300/30 group-hover/img:border-blue-400/60 transition-all duration-300 group-hover/img:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Posts Grid */}
//       <main className="lg:w-3/4 w-full">
//         <div className="mb-6 flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
//             Latest Insights
//           </h1>
//           <div className="flex items-center gap-2 text-gray-400">
//             <span className="text-sm">{filteredPosts.length} articles</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredPosts.map((post, idx) => (
//             <article
//               key={idx}
//               className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
//               onMouseEnter={() => setHoveredPost(idx)}
//               onMouseLeave={() => setHoveredPost(null)}
//             >
//               {/* Background Glow */}
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

//               {/* Card Content */}
//               <div className="relative bg-gradient-to-br from-slate-900/70 to-gray-900/50 backdrop-blur-xl border border-slate-400/20 group-hover:border-purple-400/40 rounded-2xl overflow-hidden transition-all duration-500">
//                 {/* Image Section */}
//                 <div className="relative overflow-hidden">
//                   <img 
//                     src={post.image} 
//                     alt={`Post: ${post.title}`} 
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" 
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//                   {/* Badges */}
//                   <div className="absolute top-3 left-3 flex gap-2">
//                     {post.trending && (
//                       <span className="flex items-center gap-1 text-xs font-medium text-red-200 bg-gradient-to-r from-red-500/80 to-pink-500/80 backdrop-blur-sm px-2 py-1 rounded-full border border-red-400/40">
//                         <TrendingUp className="w-3 h-3" />
//                         Trending
//                       </span>
//                     )}
//                     {post.featured && (
//                       <span className="flex items-center gap-1 text-xs font-medium text-yellow-200 bg-gradient-to-r from-yellow-500/80 to-amber-500/80 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-400/40">
//                         <Star className="w-3 h-3" />
//                         Featured
//                       </span>
//                     )}
//                     {post.hot && (
//                       <span className="flex items-center gap-1 text-xs font-medium text-orange-200 bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm px-2 py-1 rounded-full border border-orange-400/40">
//                         <Flame className="w-3 h-3" />
//                         Hot
//                       </span>
//                     )}
//                   </div>

//                   {/* Views */}
//                   <div className="absolute top-3 right-3">
//                     <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
//                       {post.views} views
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs font-medium text-purple-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-400/30">
//                       {post.category}
//                     </span>
//                     <div className="flex items-center gap-1 text-xs text-gray-400">
//                       <Calendar className="w-3 h-3" />
//                       {post.date}
//                     </div>
//                   </div>

//                   <h3 className="font-bold text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 line-clamp-2">
//                     {post.title}
//                   </h3>

//                   <p className="text-sm text-gray-300 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
//                     {post.excerpt}
//                   </p>

//                   <div className="flex items-center justify-between pt-2">
//                     <button className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 group-hover:translate-x-1">
//                       Read More 
//                       <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                     </button>

//                     <div className="flex items-center gap-1">
//                       <Zap className="w-4 h-4 text-yellow-400" />
//                       <span className="text-xs text-gray-400">2 min read</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hover Effect Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* Load More */}
//         {filteredPosts.length > 0 && (
//           <div className="mt-12 text-center">
//             <button className="relative group px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-xl border border-purple-400/30 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//               <span className="relative z-10">Load More Articles</span>
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BlogLayout;
// import React, { useState } from 'react';
// import { Search } from 'lucide-react';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div 
//       className="flex flex-col lg:flex-row gap-8 px-6 py-12 min-h-screen"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       {/* Sidebar */}
//       <aside className="lg:w-1/4 w-full space-y-8 transform transition-all duration-700 hover:scale-105">
//         <div className="relative group">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search crypto blog..."
//             aria-label="Search crypto blog"
//             className="w-full p-3 rounded-lg pl-12 bg-white/15 backdrop-blur-sm border border-amber-300/40 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 shadow-lg"
//           />
//           <Search className="absolute left-4 top-3.5 text-amber-400 w-5 h-5 group-focus-within:text-amber-300 transition-colors" />
//         </div>

//         <nav aria-label="Categories" className="bg-gradient-to-br from-teal-500/25 to-cyan-600/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/40 shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">Categories</h2>
//           <ul className="space-y-3">
//             {categories.map((cat) => (
//               <li
//                 key={cat}
//                 tabIndex={0}
//                 className={`hover:bg-teal-500/20 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 ${
//                   activeCategory === cat 
//                     ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-200 font-semibold border-l-4 border-cyan-400 shadow-md' 
//                     : 'text-gray-200 hover:text-cyan-200'
//                 }`}
//                 onClick={() => setActiveCategory(cat)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') setActiveCategory(cat);
//                 }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <nav aria-label="Top Posts" className="bg-gradient-to-br from-slate-600/30 to-teal-700/25 backdrop-blur-sm rounded-xl p-6 border border-slate-400/40 shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-cyan-300">Top Posts</h2>
//           <ul className="space-y-4">
//             {topPosts.map((post, i) => (
//               <li
//                 key={i}
//                 tabIndex={0}
//                 className="flex items-start gap-3 hover:bg-slate-500/20 rounded-lg p-2 cursor-pointer transition-all duration-300 group"
//                 onClick={() => {}}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {};
//                 }}
//               >
//                 <span className="text-lg font-bold text-slate-300 bg-slate-500/25 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md">
//                   {i + 1}
//                 </span>
//                 <p className="text-sm text-gray-200 group-hover:text-slate-200 transition-colors">{post}</p>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="bg-gradient-to-br from-teal-600/25 to-emerald-700/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/40 shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Jaimax Socials</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {[...Array(9)].map((_, idx) => (
//               <img
//                 key={idx}
//                 src={defaultImage}
//                 alt={`jaimax social ${idx + 1}`}
//                 className="rounded-lg border border-emerald-300/40 hover:border-green-400/60 transition-all duration-300 hover:scale-105 shadow-sm"
//               />
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Posts Grid */}
//       <main className="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {filteredPosts.map((post, idx) => (
//           <article
//             key={idx}
//             className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-700/40 to-gray-800/30 backdrop-blur-sm border border-slate-400/30 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/15 shadow-lg"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 to-blue-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//             <img 
//               src={post.image} 
//               alt={`Post: ${post.title}`} 
//               className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
//             />

//             <div className="p-6 space-y-3 relative z-10">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-medium text-cyan-200 bg-cyan-500/25 px-3 py-1 rounded-full shadow-sm">
//                   {post.category}
//                 </span>
//                 <span className="text-xs text-gray-300">{post.date}</span>
//               </div>

//               <h3 className="font-bold text-lg text-white group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
//                 {post.title}
//               </h3>

//               <p className="text-sm text-gray-200 line-clamp-3">
//                 {post.excerpt}
//               </p>

//               <div className="pt-2">
//                 <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 group-hover:underline">
//                   Read More →
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default BlogLayout;


// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Tilt from 'react-parallax-tilt';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div
//       className="flex flex-col lg:flex-row gap-8 px-6 py-12 min-h-screen text-gray-900"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95), rgba(6,100,105,0.9))' }}
//     >
//       {/* Sidebar */}
//       <motion.aside
//         className="lg:w-1/4 w-full space-y-10 text-yellow-300"
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search crypto blog..."
//             aria-label="Search crypto blog"
//             className="w-full p-2 rounded pl-10 text-gray-900"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-600 w-5 h-5" />
//         </div>

//         <nav aria-label="Categories">
//           <h2 className="text-xl font-semibold mb-3">Categories</h2>
//           <ul className="space-y-2">
//             {categories.map((cat) => (
//               <li
//                 key={cat}
//                 tabIndex={0}
//                 className={`hover:underline cursor-pointer ${
//                   activeCategory === cat ? 'font-bold text-yellow-400' : 'text-yellow-100'
//                 }`}
//                 onClick={() => setActiveCategory(cat)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') setActiveCategory(cat);
//                 }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <nav aria-label="Top Posts">
//           <h2 className="text-xl font-semibold mb-3">Top Posts</h2>
//           <ul className="space-y-3">
//             {topPosts.map((post, i) => (
//               <li
//                 key={i}
//                 tabIndex={0}
//                 className="flex items-start gap-3 hover:underline cursor-pointer text-yellow-200"
//                 onClick={() => {}}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {};
//                 }}
//               >
//                 <span className="text-xl font-bold text-yellow-400">{i + 1}</span>
//                 <p className="text-sm">{post}</p>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div>
//           <h2 className="text-xl font-semibold mb-3">Jaimax Socials</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {[...Array(9)].map((_, idx) => (
//               <img
//                 key={idx}
//                 src={defaultImage}
//                 alt={`jaimax social ${idx + 1}`}
//                 className="rounded"
//               />
//             ))}
//           </div>
//         </div>
//       </motion.aside>

//       {/* Posts Grid */}
//       <motion.main
//         className="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         {filteredPosts.map((post, idx) => (
//           <Tilt glareEnable={true} glareMaxOpacity={0.4} scale={1.05} transitionSpeed={400} key={idx} className="rounded-xl">
//             <motion.div
//               className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/40 transition duration-300 border border-yellow-400"
//               style={{ backgroundColor: '#caf0f8' }}
//               whileHover={{ scale: 1.03 }}
//             >
//               <div
//                 className="absolute inset-0 pointer-events-none rounded-xl"
//                 style={{ backgroundColor: 'rgba(167, 201, 87, 0.15)' }}
//               ></div>

//               <img src={post.image} alt={`Post: ${post.title}`} className="w-full h-48 object-cover relative z-10" />
//               <div className="p-4 space-y-1 relative z-10">
//                 <p className="text-sm font-medium text-blue-900">{post.category} / {post.date}</p>
//                 <h3 className="font-semibold text-lg text-blue-900 hover:underline cursor-pointer">{post.title}</h3>
//                 <p className="text-sm text-gray-900">{post.excerpt}</p>
//               </div>
//             </motion.div>
//           </Tilt>
//         ))}
//       </motion.main>
//     </div>
//   );
// };

// export default BlogLayout;


import React, { useState } from 'react';
// import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Flame, Zap, Eye, Clock, X } from 'lucide-react';

const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

const topPosts = [
  'What Makes Jaimax Coins the Future of Crypto?',
  'Top 5 Wallets to Store Your Jaimax Safely',
  'Jaimax Tokenomics Explained in Simple Terms',
  'How to Stake and Earn Jaimax Coins Easily',
  'Latest Updates on Jaimax Coin Partnerships'
];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';
//  const blogsData = [
//             {
//         "id": 5,
//         "image": Blog5,
//         "headline": "Why Jaimax Is the Smart Move Right Now",
//         "description": `In today’s rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coins</a> emerging globally,<a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">jaimax</a> stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem. This article explores why choosing Jaimax now is a smart move for anyone looking to be part of the future of blockchain and digital finance.`,
//         "date": "09 june 25",
//         "content": {
//             "title": "Jaimax: The Best Crypto Coin Emerging from India",
//             "sections": [
//                 {
//                     "type": "paragraph",
//                     "content": `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment. With a low market price, it provides an attractive entry point for early adopters.`
//                 },


//                 {
//                     "type": "heading",
//                     "content": "Unmatched Growth Potential at a Low Price Point"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax’s current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption. This makes Jaimax one of the most promising crypto investment opportunities today."
//                 },

//                 {
//                     "type": "heading",
//                     "content": "Strong Use Cases Driving Real-World Utility"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "<b>Decentralized applications (dApps)</b>",
//                         "<b>Non-fungible tokens (NFTs)</b> ",
//                         "<b>Digital payments in e-commerce</b>",
//                         "<b>Community rewards and incentives</b>",
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "This focus on blockchain technology integration ensures Jaimax is positioned for sustainable growth, not just speculative hype. Its utility in real-world scenarios strengthens its value proposition as a functional crypto coin."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Robust and Secure Blockchain Infrastructure"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project’s architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally. Investors can trust that their assets are protected by advanced cryptographic protocols and a transparent, decentralized ledger system."
//                 },

//                {
//                     "type": "heading",
//                     "content": "Experienced Leadership and Active Community Engagement"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community, providing regular updates and educational content that boosts crypto awareness and fosters trust."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Community involvement is crucial in the crypto space, and Jaimax’s active social media presence on platforms like Telegram, Twitter, and YouTube demonstrates its commitment to transparency and growth."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Clear Roadmap for Future Development",
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax’s strategic roadmap includes multiple phases that enhance its ecosystem:",
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Launching Jaimax Foundation Chain with enhanced scalability",
//                         "Expanding NFT and DeFi services",
//                         "Introducing mobile wallets and user-friendly interfaces",
//                         "Partnering with key industry players for exchange listings and integrations",
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "These planned developments signal a sustainable, well-managed growth trajectory, making Jaimax a strong contender among emerging altcoins."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Community-Driven Rewards and Referral Programs"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax incorporates a referral-based foundation system, allowing early participants to earn rewards through network growth. This incentivizes organic community building and encourages wider adoption, enhancing the coin’s value and liquidity. Such programs add to the overall appeal of Jaimax as a smart crypto investment."
//                 },

//                 {
//                     "type": "heading",
//                     "content": "Why Timing Matters: Capitalizing on Early Adoption"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency success stories show that early adoption is key to maximizing returns. By entering the Jaimax ecosystem now, investors gain access before the coin’s price rises following increased demand and wider recognition. This early mover advantage is vital in a market characterized by rapid shifts and high volatility."
//                 },

//                 {
//                     "type": "heading",
//                     "content": "Jaimax and the Future of Indian Cryptocurrency"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "As India navigates its crypto regulatory environment, projects like Jaimax represent the future of decentralized finance in the country. It embodies the spirit of innovation, financial inclusion, and technology-driven growth that India needs to compete globally."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "By embracing Jaimax today, investors and users alike become part of a pioneering movement set to influence the trajectory of blockchain adoption in India and worldwide."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "In Summary"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity. Its affordable price, robust ecosystem, and forward-looking roadmap make it the smart choice for anyone seeking meaningful engagement with the future of crypto."
//                 },

//             ]
//         }
//     },
//         {
//         "id": 4,
//         "image": Blog4,
//         "headline": "Jaimax: The Future of Cryptocurrency from India to the World",
//         "description": "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark. Positioned at the intersection of blockchain technology, financial empowerment, and digital freedom, Jaimax isn't just another altcoin — it’s a vision, a movement, and a mission to redefine how the world interacts with finance.",
//         "date": "09 june 25",
//         "content": {
//             "title": "The Rise of a Revolutionary Crypto Brand",
//             "sections": [
//                 {
//                     "type": "paragraph",
//                     "content": `In a world driven by digital transformation and decentralized innovation, 
//                     <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">Jaimax</a> is emerging as a pioneering 
//                     <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">cryptocurrency</a> born in India, aiming to make a global mark. 
//                     Positioned at the intersection of 
//                     <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">blockchain technology</a>, financial empowerment, and digital freedom, 
//                     Jaimax isn't just another altcoin — it’s a vision, a movement, and a mission to redefine how the world interacts with finance. 
//                     Discover why it's <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">India’s best crypto coin</a>.`
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": `Backed by a powerful infrastructure, a strong team of dedicated innovators, and a roadmap grounded in sustainable growth, Jaimax is rapidly gaining traction as <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">India’s best crypto coin</a>. From grassroots education to international expansion, Jaimax is building a future where every digital transaction is secure, accessible, and rewarding.`
//                 },
//                 {
//                     "type": "heading",
//                     "content": "A Vision Beyond Borders: Jaimax's Global Mission"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "At its core, <b>Jaimax envisions a decentralized future</b> where financial opportunities are not limited by geography, background, or financial history. As India rises as a global tech powerhouse, Jaimax leverages the country's digital momentum to present a <b>crypto platform with international utility and local relevance</b>."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Our mission is clear — <b>to empower individuals</b> through blockchain, enhance security through smart technology, and <b>bridge traditional finance with the digital economy</b>. Whether you're a first-time investor or a seasoned crypto trader, Jaimax offers a gateway into a more inclusive and transparent ecosystem.",
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Blockchain Backbone: The Technology Powering Jaimax"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax is built on <b>advanced blockchain infrastructure</b> ensuring <b>speed, scalability, and security</b>. Designed to handle high-volume transactions while minimizing costs, our chain architecture competes with global standards like Ethereum and Solana:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "<b>High TPS (Transactions Per Second):</b> Jaimax supports lightning-fast processing, suitable for real-time applications.",
//                         "<b>Energy-Efficient Consensus Mechanism:</b> Our system reduces carbon footprints, embracing sustainability without sacrificing performance.",
//                         "<b>Smart Contract Integration:</b> Developers can build dApps, DeFi protocols, and even NFT platforms using Jaimax, enabling an expansive utility landscape.",
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "This <b>robust blockchain foundation</b> makes Jaimax not only a digital currency but also a <b>complete ecosystem.</b>"
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Unmatched Utility: More Than Just a Coin"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Unlike many crypto projects that fade after launch, Jaimax is deeply committed to <b>real-world use cases</b>. Here’s how Jaimax is adding value:"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "1. Digital Payments"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax enables fast, borderless, and low-fee transactions for merchants and consumers. With ongoing partnerships, we are integrating with payment gateways and e-commerce platforms to bring crypto to daily life."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "2. Investment Asset"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "As a rising altcoin, Jaimax offers early investors an opportunity to enter at a low price point and benefit from long-term appreciation. Its tokenomics ensures stability, liquidity, and rewarding holding mechanisms."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "3. Ecosystem Growth"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax fosters the creation of decentralized apps (dApps), NFTs, and DeFi projects under its umbrella, giving it beyond-token value. It’s not just a coin — it’s the fuel of an evolving digital economy."
//                 },{
//                     "type": "heading",
//                     "content": "Strategic Phased Roadmap: Building With Purpose"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax follows a 5-phase development plan, ensuring measured, stable, and scalable growth:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "<b>Phase 1:</b> Community Building and Coin Launchocused on raising awareness, building trust, and circulating the token among early adopters.",
//                         "<b>Phase 2:</b> Market Expansion & Platform IntegrationLaunch on exchanges, payment partnerships, and merchant onboarding begins.",
//                         "<b>Phase 3:</b> Smart Contract and Developer Toolkit Release Developers can deploy smart contracts and dApps on the Jaimax chain.",
//                         "<b>Phase 4:</b> Global Outreach & Utility Enhancement Entry into international exchanges and cross-border projects.",
//                         "<b>Phase 5:</b> Institutional Partnerships and Governance DAO A decentralized governance model with stakeholder voting rights and institutional backing.",
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "This structured path ensures sustainable adoption, not just speculative hype."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Community-Driven Approach: Power to the People"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "At the heart of Jaimax is its vibrant community. From everyday users to blockchain enthusiasts, the ecosystem thrives on user participation, feedback, and decentralized contributions. Our vision includes:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "<b>Community Voting Rights</b> for major updates and use-case adoption.",
//                         "<b>Transparency Reports</b> released quarterly, maintaining trust and accountability.",
//                         "<b>Educational Initiatives</b> including seminars, webinars, and local crypto literacy drives.",

//                     ]
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "We believe true decentralization starts with an informed community — and we are here to build that together."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "India's Moment in the Crypto World"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "India has long been seen as a technology superpower, and Jaimax capitalizes on that momentum. The country’s deep penetration of smartphones, digital wallets, and growing youth interest in crypto gives Jaimax a unique edge."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "<b>Localized Branding:</b> We speak the language of the people — through campaigns in English, Hindi, Telugu, Tamil, and more.",
//                         "<b>Regulatory Alignment:</b> Jaimax aims to align with India’s upcoming crypto regulations to remain legally strong and secure for the future.",
//                         "<b>Exporting Innovation:</b> From India to the world — Jaimax is India's answer to global crypto leadership.",

//                     ]
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Security and Transparency at the Core"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "With regular audits, bug bounty programs, and a fully transparent transaction ledger, Jaimax puts security first. Our open-source codebase invites developers to explore, contribute, and innovate — ensuring continuous improvement and community accountability."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Additionally, our KYC/AML compliance modules are being developed for exchanges and partners, preparing us for a regulation-ready future."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Conclusion: Jaimax is the Future"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax is more than just a crypto token — it's a revolution from India, built for the world. As blockchain adoption accelerates, Jaimax stands out with its mission-driven approach, user-first design, and global ambitions."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "The next era of finance will be decentralized, inclusive, and digital. With Jaimax leading the charge, the future of cryptocurrency is not just arriving — it’s being built right now."
//                 },
//             ]
//         }
//     },
//     {
//         "id": 1,
//         "image": Blog1,
//         "headline": "The Power of Early Investment: Why Now is the Time for Jaimax",
//         "description": "In the dynamic world of cryptocurrency, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India, offering a rare chance to invest at a foundational level.",
//         "date": "05 may 25",
//         "content": {
//             "title": "Timing Defines Opportunity in Cryptocurrency",
//             "sections": [
//                 {
//                     "type": "subheading",
//                     "content": "Introduction: Timing Defines Opportunity in Cryptocurrency"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `In the dynamic world of <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">cryptocurrency</a>, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in India</a>, offering a rare chance to invest at a foundational level.`
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `This article explores why early investment in Jaimax offers a powerful opportunity, and why it is already being considered by experts and early adopters as one of the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coins  to invest</a> in this year.`
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "The Power of Early Adoption in Crypto Markets"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Early adoption has consistently led to exponential growth in the cryptocurrency space. From Bitcoin’s rise from pennies to thousands of dollars, to Ethereum's surge from a few dollars to four-digit values — history shows that entering early creates long-term winners."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax, in its current early-phase pricing, presents similar characteristics:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Low entry point (₹0.50) for high-volume accumulation.",
//                         "Early access before major exchange listings and market hype.",
//                         "Direct exposure to a digital asset with real utility and local relevance."
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax’s early investors are not just buying coins; they are securing a strategic position in the future of Indian crypto markets."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Why Jaimax is Gaining Attention"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "What separates Jaimax from the sea of altcoins in circulation? It’s the combination of technology, local market alignment, transparent development, and long-term vision. Here's why Jaimax is poised to dominate:"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "1. Tailored for India’s Digital Finance Evolution"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "India’s population is embracing digital technology rapidly, and cryptocurrency adoption is accelerating. Jaimax is built with the Indian market in mind — from accessibility to pricing, making it a strong contender for the best crypto coin in India."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Its affordability and scalability align perfectly with India’s demographic — tech-savvy youth, growing retail investors, and emerging entrepreneurs"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "2. Transparent and Reliable Tokenomics"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Unlike countless speculative crypto projects, Jaimax has clear tokenomics designed for growth, security, and longevity. Limited total supply, gradual release schedules, and secure architecture provide strong investor confidence."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `The coin’s scarcity and responsible allocation create sustainable demand pressure — essential traits for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest</a>`
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "3. Cutting-Edge Technology"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Behind every reliable crypto coin lies robust technology. Jaimax utilizes high-speed blockchain protocols to ensure:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Instant transactions",
//                         "Low fees",
//                         "High scalability",
//                         "Strong security standards"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "This makes Jaimax future-ready, ensuring its usability across digital applications, mobile wallets, and potential future integrations with e-commerce or fintech platforms."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "4. Developer-Backed Roadmap"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "A strong coin needs a strong plan. Jaimax has a clear, step-by-step development roadmap involving:"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Exchange listings",
//                         "Wallet partnerships",
//                         "DeFi integration",
//                         "Community tools and apps"
//                     ]
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Why ₹0.50 is a Golden Entry Point"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Price is a powerful psychological and strategic factor. With Jaimax currently valued at just ₹0.50, this is a rare moment to accumulate high-volume holdings without high capital investment."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Lowest possible risk with highest potential reward",
//                         "Ideal for long-term holding and short-term trading",
//                         "Entry before upcoming upgrades and visibility boosts"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "As the crypto market evolves, undervalued assets like Jaimax typically outperform once broader awareness kicks in. That’s why smart investors act before the crowd."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Jaimax: Designed for Scalable Growth"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Every successful cryptocurrency must scale effectively. Jaimax’s infrastructure is already built for future expansion."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Scalable transactions per second (TPS) to handle high volume",
//                         "Smart contract integration for advanced DeFi functions",
//                         "Audit-ready architecture to attract institutional and retail confidence"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "This technical maturity gives Jaimax the foundation to become not just a speculative token but a real utility-driven crypto coin"
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Indian Crypto Trends: Why Jaimax is the Perfect Fit"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "India is set to become one of the world’s top cryptocurrency markets. With a population of 1.4 billion and increasing access to internet and mobile banking, the need for affordable, fast, and secure crypto coins is exploding."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Local relevance gives it an edge in adoption over foreign tokens.",
//                         "Educational initiatives will drive wider understanding and trust.",
//                         "Mobile-ready platforms ensure rural and urban access alike."
//                     ]
//                 },
//                 {
//                     "type": "heading",
//                     "content": "A Secure, Transparent Ecosystem"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Security is non-negotiable. Jaimax employs multi-layered security protocols."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Advanced cryptography",
//                         "Blockchain immutability",
//                         "Decentralized ledger architecture"
//                     ]
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Jaimax vs. Other Crypto Coins: A Comparison"
//                 },
//                 {
//                     "type": "table",
//                     "content": [
//                         {
//                             "Feature": "Price Accessibility",
//                             "Jaimax": "₹0.50 (entry stage)",
//                             "Generic Altcoin": "Often above ₹10+"
//                         },
//                         {
//                             "Feature": "Localized Growth Focus",
//                             "Jaimax": "India-first expansion strategy",
//                             "Generic Altcoin": "Global but unfocused"
//                         },
//                         {
//                             "Feature": "Technology",
//                             "Jaimax": "Scalable, fast, secure",
//                             "Generic Altcoin": "Average blockchain models"
//                         },
//                         {
//                             "Feature": "Roadmap Transparency",
//                             "Jaimax": "Clear, public, and progressive",
//                             "Generic Altcoin": "Often unclear or delayed"
//                         },
//                         {
//                             "Feature": "Community & Utility Vision",
//                             "Jaimax": "Strong user engagement plans",
//                             "Generic Altcoin": "Weak or speculative only"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "heading",
//                     "content": "The Risk of Waiting: Missed Opportunities"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "The biggest regret in cryptocurrency history? Not buying early."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Higher entry costs later",
//                         "Reduced ROI",
//                         "Missed participation in early decision-making or feature access"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "The current stage of Jaimax offers the lowest barrier to entry, while offering maximum growth potential. This is a time-sensitive opportunity that seasoned investors understand"
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Conclusion: The Smart Move Is to Act Early"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `The cryptocurrency world doesn’t wait. Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the best crypto coins in India today. For those looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in 2025</a>, this is the moment to step in, while the door is still open.`
//                 }, {
//                     "type": "paragraph",
//                     "content": "Jaimax isn’t just a coin — it’s a movement toward inclusive, secure, and smart financial systems. Early action leads to long-term advantage. Don’t let this window of opportunity pass."
//                 }
//             ]
//         }
//     },

//     {
//         "id": 2,
//         "image": Blog2,
//         "headline": "How Jaimax Works: A Deep Dive into Our Coin and Technology",
//         "description": "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the best crypto coin in India. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the best crypto to invest in India.",
//         "date": "12 may 25",
//         "content": {
//             "title": "Jaimax: The Best Crypto Coin in India",
//             "sections": [
//                 {
//                     "type": "paragraph",
//                     "content": `Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in india</a>. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in India</a>.With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation.`
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation"
//                 },
//                 {
//                     "type": "heading",
//                     "content": "The Technology Backbone of Jaimax"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "High-Speed Scalable Blockchain"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax is powered by an advanced Proof of Stake (PoS) consensus mechanism. Unlike outdated systems that rely on power-hungry mining, this next-gen blockchain delivers lightning-fast, eco-friendly transactions."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Block Generation Time: 2 seconds",
//                         "Transaction Speed: Over 5,000 transactions per second (TPS).",
//                         "Network Uptime: 99.99%",
//                         "Gas Fees: Extremely low and consistent"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `This architecture ensures Jaimax is not just a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coin</a> for trading, but a practical, scalable platform for mainstream use in India and beyond.`
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Smart Contract Support and Interoperability"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "The Jaimax blockchain is fully smart contract enabled, making it compatible with developers building next-generation decentralized applications (dApps) and tokenized services."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Supports Solidity & Web3 Tools",
//                         "Cross-chain compatibility with Ethereum and BNB Smart Chain",
//                         "Secure and audited smart contracts",
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `This infrastructure allows real-world use cases — from DeFi platforms to NFT marketplaces — to thrive within the Jaimax ecosystem, reinforcing its position as a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">top crypto coin in India</a>’s growing digital economy.`
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Coin Supply and Investment Structure"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax follows a meticulously planned coin distribution model aimed at driving long-term value."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Total Supply: 1 Billion Jaimax coins",
//                         "Launch Price: ₹0.10",
//                         "Current Price: ₹0.50",
//                         "Public Trading Launch: Begins after Phase 2 completion",
//                     ]
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "This limited supply model ensures scarcity, while phase-based growth encourages early participation and maximizes investor returns. It’s a strategy that makes Jaimax one of the best crypto coins to invest in India today."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Strategic Phased Growth of Jaimax"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Phase 1: Launch and Awareness"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Objective: Build user base, generate initial momentum",
//                         "Coin Price: ₹0.10",
//                         "Outcome: Early adopters benefit from foundational pricing",
//                     ]
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Phase 2: Market Expansion and Branding"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Objective: Solidify brand, expand user outreach",
//                         "Coin Price: ₹0.50",
//                         "Outcome: Strong community, increased value",
//                     ]
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Post-Phase 2: Trading and Ecosystem Integration"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Objective: Enable public trading on top crypto exchanges",
//                         "Focus: Liquidity, partnerships, and platform adoption",
//                         "Utility: Used for transactions, smart contract fees, and ecosystem access",
//                     ]
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Security, Transparency, and Trust"
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Smart Contract Audits: Verified by third-party blockchain security firms",
//                         "Open Source Protocols: Code available for public verification",
//                         "User Verification: KYC/AML processes in place",
//                         "Data Privacy: Protected through end-to-end encryption"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "These protocols help position Jaimax as a safe and reliable cryptocurrency, making it attractive to both first-time users and experienced crypto investors in India."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Utility and Real-World Integration"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax isn't just a token with speculative value — it's designed for real-world application."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Use as Gas Token: All transactions and smart contracts require Jaimax",
//                         "Ecosystem Growth: Future integration with gaming, e-commerce, and decentralized finance platforms",
//                         "Scalable Infrastructure: Ideal for building apps, platforms, and services"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "This practical approach makes Jaimax a true utility crypto coin, offering more than just holding value — it offers use, purpose, and future integration."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Why Jaimax is the Best Crypto to Invest in India"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "India-Focused Innovation"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Jaimax has been created to empower Indian users and businesses. It offers a simplified entry point into the blockchain world with features tailored for the Indian market."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Low-cost entry for new investors",
//                         "Localized support and user resources",
//                         "Designed with Indian compliance in mind"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Whether you're an individual looking to diversify your investments or a business seeking blockchain adoption, Jaimax delivers unmatched advantages."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Affordable Today, Valuable Tomorrow"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "At ₹0.50 per coin during its second phase, Jaimax represents an incredible opportunity for investors. With public trading and global listings planned, early participation can lead to significant long-term benefits."
//                 },
//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Early growth potential",
//                         "Backed by strong branding and awareness campaigns",
//                         "Designed for sustainable upward movement"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "In a market filled with high-risk speculative coins, Jaimax stands out as a value-driven, strategic crypto investment."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Conclusion: Secure Your Place in the Future with Jaimax"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "TJaimax is not just another coin in the digital space — it’s a mission, a movement, and a meticulously designed ecosystem. With powerful technology, user-centric design, and a strong vision for the future, Jaimax is becoming the best crypto coin in India and a beacon of trust in the blockchain world."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today."
//                 }
//             ]
//         }
//     },
//     {
//         "id": 3,
//         "image": Blog3,
//         "headline": "Understanding Cryptocurrency: A Simple Guide for New Users",
//         "description": `Cryptocurrency has dramatically transformed the financial landscape, offering an innovative and decentralized method of transactions that challenges traditional financial systems. If you’re new to the world of cryptocurrency, it may seem complex, but with the right knowledge and resources, anyone can understand and participate. This guide will break down cryptocurrency in simple terms and introduce you to the exciting opportunities it presents, including how Jaimax, a rising <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coin</a> in India, is making waves in the market.`,
//         "date": "13 may 25",
//         "content": {
//             "title": "What is Cryptocurrency?",
//             "sections": [
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network, meaning they are not governed by any central authority such as a government or financial institution. This decentralization enhances security, transparency, and control for users."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "The most well-known cryptocurrency, Bitcoin, was the first to revolutionize digital finance, but today there are thousands of different cryptocurrencies, each serving unique purposes. The underlying technology behind cryptocurrency, blockchain, allows for secure, transparent, and irreversible transactions"
//                 },
//                 {
//                     "type": "heading",
//                     "content": "How Does Cryptocurrency Work?"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Additionally, cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring that both the transaction and the identity of the sender are protected."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Types of Cryptocurrency"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "There are various types of cryptocurrencies, each with specific uses. Below are some of the most well-known:"
//                 },

//                 {
//                     "type": "subheading",
//                     "content": "Bitcoin (BTC)"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Bitcoin is the original cryptocurrency, introduced in 2009 by the pseudonymous Satoshi Nakamoto. It remains the largest cryptocurrency by market capitalization and is often regarded as a store of value or 'digital gold.'"
//                 },

//                 {
//                     "type": "subheading",
//                     "content": "Ethereum (ETH)"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Ethereum is a decentralized platform that enables developers to create smart contracts and decentralized applications (dApps). Ethereum is more than just a cryptocurrency; it also acts as a platform for building applications beyond simple digital currency transactions."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Ripple (XRP)"
//                 },

//                 {
//                     "type": "unordered_list",
//                     "content": [
//                         "Smart Contract Audits: Verified by third-party blockchain security firms",
//                         "Open Source Protocols: Code available for public verification",
//                         "User Verification: KYC/AML processes in place",
//                         "Data Privacy: Protected through end-to-end encryption"
//                     ]
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Ripple is both a payment protocol and a cryptocurrency, designed to enable fast and inexpensive cross-border transactions. Ripple offers scalability and efficiency, making it a preferred choice for financial institutions looking to transfer funds globally."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Litecoin (LTC)"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Litecoin is often referred to as the silver to Bitcoin’s gold. With a faster transaction time and lower fees, Litecoin is designed for use as an everyday payment method, making it a practical alternative for regular transactions."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Jaimax Cryptocurrency"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `Jaimax is an emerging crypto coin in India, offering a secure, decentralized solution for users seeking investment opportunities in the cryptocurrency market. With its focus on accessibility and community engagement, Jaimax is quickly becoming a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">top cryptocurrency to invest in India</a>, particularly for those interested in early-stage investments in the cryptocurrency space.`
//                 },

//                 {
//                     "type": "heading",
//                     "content": "How to Buy Cryptocurrency"
//                 },

//                 {
//                     "type": "paragraph",
//                     "content": "Acquiring cryptocurrency is straightforward and can be done in several ways. Here are the common methods:"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Cryptocurrency Exchanges"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "The most common method to buy cryptocurrency is through exchanges. Popular platforms like Coinbase, Binance, and Kraken allow users to create accounts, deposit fiat currency, and purchase a variety of cryptocurrencies. These exchanges also offer wallet services to securely store digital assets."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Peer-to-Peer (P2P) Platforms"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "P2P platforms allow users to buy cryptocurrencies directly from other individuals. Transactions can be done using various payment methods such as bank transfers or PayPal, offering flexibility and ease."
//                 },

//                 {
//                     "type": "subheading",
//                     "content": "Bitcoin ATMs."
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "In some locations, Bitcoin ATMs allow users to purchase cryptocurrency in exchange for cash. While less common than traditional ATMs, these machines offer an alternative way to acquire digital currency."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Storing Cryptocurrency: Wallets"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Once you’ve acquired cryptocurrency, it’s essential to store it securely. There are two main types of wallets:"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Hot Wallets"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Hot wallets are online wallets connected to the internet. These are convenient for quick transactions but are more susceptible to hacking. Popular hot wallets include Exodus and Trust Wallet."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Cold Wallets"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cold wallets are offline wallets that provide a higher level of security. Hardware wallets like Ledger and Trezor store your private keys offline, making them less vulnerable to attacks. Cold wallets are best for long-term storage of cryptocurrency."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Cryptocurrency Mining"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Mining is the process by which new cryptocurrencies are created and added to the blockchain. Miners use computational power to solve complex mathematical problems, validating transactions and receiving new coins as a reward. Mining used to be more accessible, but today it requires significant computing power, especially for popular cryptocurrencies like Bitcoin"
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Benefits of Cryptocurrency"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency offers several advantages over traditional financial systems:"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Decentralization"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency operates on a peer-to-peer network, without a central authority. This gives users greater control over their transactions and assets, reducing reliance on banks or government entities."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Security"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency transactions are secure and irreversible, thanks to blockchain technology and cryptographic algorithms. The decentralized nature of the network also reduces the risks of fraud and identity theft."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Low Transaction Fees"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency transactions often involve lower fees compared to traditional banking systems. For international transfers, cryptocurrencies like Jaimax can be more cost-effective than conventional money transfer services."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Privacy and Anonymity"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Some cryptocurrencies, like Monero and Zcash, offer enhanced privacy features, allowing users to make anonymous transactions. This feature is especially attractive for those who value privacy in their financial dealings."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Risks of Cryptocurrency"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Despite its advantages, cryptocurrency comes with risks:"
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Volatility"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrencies are known for their price volatility, with values fluctuating significantly. While this can lead to high returns, it also poses risks for investors, particularly those new to the market."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Regulatory Uncertainty"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency regulations are still developing in many countries. The regulatory landscape can be uncertain, and changes in laws could affect the market and the legality of using or trading digital currencies."
//                 },
//                 {
//                     "type": "subheading",
//                     "content": "Security Threats"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "While blockchain itself is secure, cryptocurrency exchanges and wallets can be vulnerable to hacking. There have been incidents of high-profile exchanges being compromised, resulting in the loss of millions of dollars."
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Jaimax: A Top Cryptocurrency to Invest in India"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": `For those looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity. As a rising cryptocurrency in India, Jaimax is gaining attention for its unique approach and growing community. With a focus on user empowerment, Jaimax is poised to become a significant player in the Indian cryptocurrency market. Whether you’re new to crypto or an experienced investor, Jaimax is one of the best cryptocurrencies to invest in India due to its promising potential and increasing adoption.`
//                 },
//                 {
//                     "type": "heading",
//                     "content": "Conclusion"
//                 },
//                 {
//                     "type": "paragraph",
//                     "content": "Cryptocurrency is revolutionizing the way we think about finance. From Bitcoin to Jaimax, there are many exciting options to explore. Whether you're looking to make investments or simply engage with the digital economy, understanding how cryptocurrencies work and their potential can open up a world of opportunities. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising."
//                 },
//             ]
//         }
//     },


// ];
// Create additional posts to fill the grid
// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 9, 2025',
//     title: 'Why Jaimax Is the Smart Move Right Now',
//     excerpt: 'In today\'s rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many crypto coins emerging globally, jaimax stands out as a promising digital asset with unique potential for growth.',
//     trending: true,
//     views: '12.5K',
//     readTime: '5',
//     fullContent: blogsData[0]
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted and secure wallet solutions specifically designed for Jaimax cryptocurrency storage.',
//     featured: true,
//     views: '8.2K',
//     readTime: '5'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Comprehensive analysis shows Jaimax leading the altcoin rally with superior performance metrics.',
//     views: '15.7K',
//     readTime: '4'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Revolutionary DeFi integration strategies that maximize yield potential through Jaimax ecosystem.',
//     views: '9.4K',
//     readTime: '6'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'How Jaimax is transforming the NFT landscape with faster, cheaper, and more efficient transactions.',
//     hot: true,
//     views: '11.1K',
//     readTime: '4'
//   },
//   {
//     image: defaultImage,
//     category: 'Blockchain',
//     date: 'May 25, 2025',
//     title: 'Jaimax blockchain architecture deep dive analysis',
//     excerpt: 'Technical breakdown of Jaimax innovative blockchain infrastructure and scalability solutions.',
//     views: '7.8K',
//     readTime: '8'
//   }
// ];


// import Blog1 from '../../../public/images/Blog2poster.jpg'
// import Blog2 from '../../../public/images/Blog2poster.jpg'
// import Blog3 from '../../../public/images/Blog3poster.jpg'
// import Blog4 from '../../../public/images/Blog4poster.jpg'
// import Blog5 from '../../../public/images/Blog5poster.jpg'

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [hoveredPost, setHoveredPost] = useState(null);
//   const [selectedPost, setSelectedPost] = useState(null);

//   const filteredPosts =  blogsData.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const renderContent = (sections) => {
//     return sections.map((section, index) => {
//       switch (section.type) {
//         case 'heading':
//           return (
//             <h2 key={index} className="text-xl font-bold text-cyan-100 mb-4 mt-6">
//               {section.content}
//             </h2>
//           );
//         case 'paragraph':
//           return (
//             <p key={index} className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }}>
//             </p>
//           );
//         case 'unordered_list':
//           return (
//             <ul key={index} className="list-disc list-inside mb-4 text-gray-300 space-y-2">
//               {section.content.map((item, itemIndex) => (
//                 <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
//               ))}
//             </ul>
//           );
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div 
//       className="min-h-screen px-6 py-8"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       <div className="w-full mx-0">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* Sidebar - Cohesive Teal/Cyan Theme */}
//           <aside className="lg:col-span-1 space-y-6">

//             {/* Search Bar */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search insights..."
//                     className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
//                   />
//                   <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <TrendingUp className="w-4 h-4 text-cyan-400" />
//                   <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
//                 </div>
//                 <div className="space-y-1">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setActiveCategory(cat)}
//                       className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
//                         activeCategory === cat
//                           ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40'
//                           : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10'
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Top Posts */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-teal-950/80 to-cyan-950/70 backdrop-blur-xl rounded-2xl border border-teal-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Flame className="w-4 h-4 text-teal-400" />
//                   <h3 className="font-semibold text-teal-100 text-sm">Trending</h3>
//                 </div>
//                 <div className="space-y-3">
//                   {topPosts.slice(0, 4).map((post, i) => (
//                     <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
//                       <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-teal-400/40">
//                         <span className="text-xs font-bold text-teal-200">{i + 1}</span>
//                       </div>
//                       <p className="text-xs text-teal-200/80 group-hover/item:text-teal-100 transition-colors line-clamp-2 leading-relaxed">
//                         {post}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content - Matching Teal/Cyan Theme */}
//           <main className="lg:col-span-3">

//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
//                     Crypto Insights
//                   </h1>
//                   <p className="text-cyan-200/70 text-sm">Latest news and analysis from the blockchain world</p>
//                 </div>
//                 <div className="text-left lg:text-right">
//                   <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
//                   <p className="text-teal-400/60 text-xs">Updated daily</p>
//                 </div>
//               </div>
//             </div>

//             {/* Posts Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
//               {filteredPosts.map((post, idx) => (
//                 <article
//                   key={idx}
//                   className="group relative h-full w-full"
//                   onMouseEnter={() => setHoveredPost(idx)}
//                   onMouseLeave={() => setHoveredPost(null)}
//                 >
//                   {/* Glow Effect */}
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

//                   {/* Card */}
//                   <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">

//                     {/* Image */}
//                     <div className="relative aspect-video overflow-hidden">
//                       <img 
//                         src={post.image} 
//                         alt={post.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//                       {/* Badges - All using Teal/Cyan variations */}
//                       <div className="absolute top-3 left-3 flex gap-2">
//                         {post.trending && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <TrendingUp className="w-3 h-3" />
//                             Trending
//                           </span>
//                         )}
//                         {post.featured && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
//                             <Star className="w-3 h-3" />
//                             Featured
//                           </span>
//                         )}
//                         {post.hot && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <Flame className="w-3 h-3" />
//                             Hot
//                           </span>
//                         )}
//                       </div>

//                       {/* Views */}
//                       <div className="absolute top-3 right-3">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
//                           <Eye className="w-3 h-3" />
//                           {post.views}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-5 flex flex-col flex-grow">

//                       {/* Meta */}
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
//                           {post.category}
//                         </span>
//                         <div className="flex items-center gap-1 text-xs text-teal-400/80">
//                           <Calendar className="w-3 h-3" />
//                           {post.date}
//                         </div>
//                       </div>

//                       {/* Title */}
//                       <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow">
//                         {post.title}
//                       </h3>

//                       {/* Excerpt */}
//                       <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
//                         {post.excerpt}
//                       </p>

//                       {/* Footer */}
//                       <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
//                         <button 
//                           onClick={() => post.fullContent && setSelectedPost(post)}
//                           className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1"
//                         >
//                           Read More 
//                           <ArrowRight className="w-4 h-4" />
//                         </button>

//                         <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
//                           <Clock className="w-3 h-3" />
//                           {post.readTime} min read
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>

//             {/* Load More */}
//             <div className="mt-12 text-center">
//               <button className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
//                 <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
//                   Load More Articles
//                 </div>
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Modal for Full Article */}
//       {selectedPost && selectedPost.fullContent && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 max-w-4xl max-h-[90vh] overflow-hidden">

//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-cyan-700/30">
//               <div>
//                 <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-200">
//                   {selectedPost.fullContent.content.title}
//                 </h2>
//                 <p className="text-cyan-300/70 text-sm mt-1">{selectedPost.date}</p>
//               </div>
//               <button
//                 onClick={() => setSelectedPost(null)}
//                 className="text-cyan-400 hover:text-cyan-300 transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
//               <div className="prose prose-invert max-w-none">
//                 {renderContent(selectedPost.fullContent.content.sections)}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogLayout;


// import React, { useState } from 'react';
// import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Flame, Zap, Eye, Clock, X } from 'lucide-react';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const blogsData = [
//   {
//     "id": 1,
//     "image": defaultImage,
//     "headline": "Why Jaimax Is the Smart Move Right Now",
//     "description": `In today's rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many crypto coins emerging globally, jaimax stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem. This article explores why choosing Jaimax now is a smart move for anyone looking to be part of the future of blockchain and digital finance.`,
//     "date": "09 june 25",
//     "category": "Crypto News",
//     "trending": true,
//     "views": "12.5K",
//     "readTime": "5",
//     "content": {
//       "title": "Jaimax: The Best Crypto Coin Emerging from India",
//       "sections": [
//         {
//           "type": "paragraph",
//           "content": `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the best crypto coin in India, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment. With a low market price, it provides an attractive entry point for early adopters.`
//         },
//         {
//           "type": "heading",
//           "content": "Unmatched Growth Potential at a Low Price Point"
//         },
//         {
//           "type": "paragraph",
//           "content": "Jaimax's current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption. This makes Jaimax one of the most promising crypto investment opportunities today."
//         },
//         {
//           "type": "heading",
//           "content": "Strong Use Cases Driving Real-World Utility"
//         },
//         {
//           "type": "paragraph",
//           "content": "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:"
//         },
//         {
//           "type": "unordered_list",
//           "content": [
//             "Decentralized applications (dApps)",
//             "Non-fungible tokens (NFTs)",
//             "Digital payments in e-commerce",
//             "Community rewards and incentives"
//           ]
//         },
//         {
//           "type": "paragraph",
//           "content": "This focus on blockchain technology integration ensures Jaimax is positioned for sustainable growth, not just speculative hype. Its utility in real-world scenarios strengthens its value proposition as a functional crypto coin."
//         },
//         {
//           "type": "heading",
//           "content": "Robust and Secure Blockchain Infrastructure"
//         },
//         {
//           "type": "paragraph",
//           "content": "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project's architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally. Investors can trust that their assets are protected by advanced cryptographic protocols and a transparent, decentralized ledger system."
//         },
//         {
//           "type": "heading",
//           "content": "Experienced Leadership and Active Community Engagement"
//         },
//         {
//           "type": "paragraph",
//           "content": "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community, providing regular updates and educational content that boosts crypto awareness and fosters trust."
//         },
//         {
//           "type": "paragraph",
//           "content": "Community involvement is crucial in the crypto space, and Jaimax's active social media presence on platforms like Telegram, Twitter, and YouTube demonstrates its commitment to transparency and growth."
//         },
//         {
//           "type": "heading",
//           "content": "Clear Roadmap for Future Development"
//         },
//         {
//           "type": "paragraph",
//           "content": "Jaimax's strategic roadmap includes multiple phases that enhance its ecosystem:"
//         },
//         {
//           "type": "unordered_list",
//           "content": [
//             "Launching Jaimax Foundation Chain with enhanced scalability",
//             "Expanding NFT and DeFi services",
//             "Introducing mobile wallets and user-friendly interfaces",
//             "Partnering with key industry players for exchange listings and integrations"
//           ]
//         },
//         {
//           "type": "paragraph",
//           "content": "These planned developments signal a sustainable, well-managed growth trajectory, making Jaimax a strong contender among emerging altcoins."
//         },
//         {
//           "type": "heading",
//           "content": "Community-Driven Rewards and Referral Programs"
//         },
//         {
//           "type": "paragraph",
//           "content": "Jaimax incorporates a referral-based foundation system, allowing early participants to earn rewards through network growth. This incentivizes organic community building and encourages wider adoption, enhancing the coin's value and liquidity. Such programs add to the overall appeal of Jaimax as a smart crypto investment."
//         },
//         {
//           "type": "heading",
//           "content": "Why Timing Matters: Capitalizing on Early Adoption"
//         },
//         {
//           "type": "paragraph",
//           "content": "Cryptocurrency success stories show that early adoption is key to maximizing returns. By entering the Jaimax ecosystem now, investors gain access before the coin's price rises following increased demand and wider recognition. This early mover advantage is vital in a market characterized by rapid shifts and high volatility."
//         },
//         {
//           "type": "heading",
//           "content": "Jaimax and the Future of Indian Cryptocurrency"
//         },
//         {
//           "type": "paragraph",
//           "content": "As India navigates its crypto regulatory environment, projects like Jaimax represent the future of decentralized finance in the country. It embodies the spirit of innovation, financial inclusion, and technology-driven growth that India needs to compete globally."
//         },
//         {
//           "type": "paragraph",
//           "content": "By embracing Jaimax today, investors and users alike become part of a pioneering movement set to influence the trajectory of blockchain adoption in India and worldwide."
//         },
//         {
//           "type": "heading",
//           "content": "In Summary"
//         },
//         {
//           "type": "paragraph",
//           "content": "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity. Its affordable price, robust ecosystem, and forward-looking roadmap make it the smart choice for anyone seeking meaningful engagement with the future of crypto."
//         }
//       ]
//     }
//   },
//   {
//     "id": 2,
//     "image": defaultImage,
//     "headline": "Top secure wallets to store your Jaimax Coins",
//     "description": "Explore the most trusted and secure wallet solutions specifically designed for Jaimax cryptocurrency storage and management.",
//     "date": "June 4, 2025",
//     "category": "Wallets",
//     "featured": true,
//     "views": "8.2K",
//     "readTime": "5"
//   },
//   {
//     "id": 3,
//     "image": defaultImage,
//     "headline": "Jaimax outpaces other altcoins in 2025 market surge",
//     "description": "Comprehensive analysis shows Jaimax leading the altcoin rally with superior performance metrics and strong community backing.",
//     "date": "June 2, 2025",
//     "category": "Market Trends",
//     "views": "15.7K",
//     "readTime": "4"
//   },
//   {
//     "id": 4,
//     "image": defaultImage,
//     "headline": "Integrating Jaimax with DeFi projects for better yield",
//     "description": "Revolutionary DeFi integration strategies that maximize yield potential through Jaimax ecosystem partnerships and innovations.",
//     "date": "June 1, 2025",
//     "category": "DeFi",
//     "views": "9.4K",
//     "readTime": "6"
//   },
//   {
//     "id": 5,
//     "image": defaultImage,
//     "headline": "NFT creators embrace Jaimax for seamless transactions",
//     "description": "How Jaimax is transforming the NFT landscape with faster, cheaper, and more efficient transactions for digital creators.",
//     "date": "May 28, 2025",
//     "category": "NFTs",
//     "hot": true,
//     "views": "11.1K",
//     "readTime": "4"
//   },
//   {
//     "id": 6,
//     "image": defaultImage,
//     "headline": "Jaimax blockchain architecture deep dive analysis",
//     "description": "Technical breakdown of Jaimax innovative blockchain infrastructure and scalability solutions for enterprise adoption.",
//     "date": "May 25, 2025",
//     "category": "Blockchain",
//     "views": "7.8K",
//     "readTime": "8"
//   }
// ];
// import Blog1 from '../../../public/images/Blog1poster.jpg'
// import Blog2 from '../../../public/images/Blog2poster.jpg'
// import Blog3 from '../../../public/images/Blog3poster.jpg'
// import Blog4 from '../../../public/images/Blog4poster.jpg'
// import Blog5 from '../../../public/images/Blog5poster.jpg'
// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [hoveredPost, setHoveredPost] = useState(null);
//   const [selectedPost, setSelectedPost] = useState(null);

//   const filteredPosts = blogsData.filter(post => {
//     const matchesSearch = post.headline.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const renderContent = (sections) => {
//     return sections.map((section, index) => {
//       switch (section.type) {
//         case 'heading':
//           return (
//             <h2 key={index} className="text-xl font-bold text-cyan-100 mb-4 mt-6">
//               {section.content}
//             </h2>
//           );
//         case 'paragraph':
//           return (
//             <p key={index} className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }}>
//             </p>
//           );
//         case 'unordered_list':
//           return (
//             <ul key={index} className="list-disc list-inside mb-4 text-gray-300 space-y-2">
//               {section.content.map((item, itemIndex) => (
//                 <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
//               ))}
//             </ul>
//           );
//         default:
//           return null;
//       }
//     });
//   };

//   return (
//     <div 
//       className="min-h-screen px-6 py-8"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       <div className="w-full mx-0">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* Sidebar - Cohesive Teal/Cyan Theme */}
//           <aside className="lg:col-span-1 space-y-6">

//             {/* Search Bar */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search insights..."
//                     className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
//                   />
//                   <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <TrendingUp className="w-4 h-4 text-cyan-400" />
//                   <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
//                 </div>
//                 <div className="space-y-1">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setActiveCategory(cat)}
//                       className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
//                         activeCategory === cat
//                           ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40'
//                           : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10'
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Top Posts */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-teal-950/80 to-cyan-950/70 backdrop-blur-xl rounded-2xl border border-teal-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Flame className="w-4 h-4 text-teal-400" />
//                   <h3 className="font-semibold text-teal-100 text-sm">Trending</h3>
//                 </div>
//                 <div className="space-y-3">
//                   {topPosts.slice(0, 4).map((post, i) => (
//                     <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
//                       <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-teal-400/40">
//                         <span className="text-xs font-bold text-teal-200">{i + 1}</span>
//                       </div>
//                       <p className="text-xs text-teal-200/80 group-hover/item:text-teal-100 transition-colors line-clamp-2 leading-relaxed">
//                         {post}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content - Matching Teal/Cyan Theme */}
//           <main className="lg:col-span-3">

//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
//                     Crypto Insights
//                   </h1>
//                   <p className="text-cyan-200/70 text-sm">Latest news and analysis from the blockchain world</p>
//                 </div>
//                 <div className="text-left lg:text-right">
//                   <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
//                   <p className="text-teal-400/60 text-xs">Updated daily</p>
//                 </div>
//               </div>
//             </div>

//             {/* Posts Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
//               {filteredPosts.map((post, idx) => (
//                 <article
//                   key={idx}
//                   className="group relative h-full w-full"
//                   onMouseEnter={() => setHoveredPost(idx)}
//                   onMouseLeave={() => setHoveredPost(null)}
//                 >
//                   {/* bg-gradient-to-r from-cyan-400 to-teal-400 */}
//                   {/* Glow Effect */}
//                   <div className="absolute -inset-0.5  rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
//                    style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//                   ></div>

//                   {/* Card */}
//                   <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">

//                     {/* Image */}
//                     <div className="relative aspect-video overflow-hidden">
//                       <img 
//                         src={post.image} 
//                         alt={post.headline}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//                       {/* Badges - All using Teal/Cyan variations */}
//                       <div className="absolute top-3 left-3 flex gap-2">
//                         {post.trending && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <TrendingUp className="w-3 h-3" />
//                             Trending
//                           </span>
//                         )}
//                         {post.featured && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
//                             <Star className="w-3 h-3" />
//                             Featured
//                           </span>
//                         )}
//                         {post.hot && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <Flame className="w-3 h-3" />
//                             Hot
//                           </span>
//                         )}
//                       </div>

//                       {/* Views */}
//                       <div className="absolute top-3 right-3">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
//                           <Eye className="w-3 h-3" />
//                           {post.views}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-5 flex flex-col flex-grow">

//                       {/* Meta */}
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
//                           {post.category}
//                         </span>
//                         <div className="flex items-center gap-1 text-xs text-teal-400/80">
//                           <Calendar className="w-3 h-3" />
//                           {post.date}
//                         </div>
//                       </div>

//                       {/* Title */}
//                       <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow">
//                         {post.headline}
//                       </h3>

//                       {/* Excerpt */}
//                       <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
//                         {post.description}
//                       </p>

//                       {/* Footer */}
//                       <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
//                         <button 
//                           onClick={() => post.content && setSelectedPost(post)}
//                           className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1"
//                         >
//                           Read More 
//                           <ArrowRight className="w-4 h-4" />
//                         </button>

//                         <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
//                           <Clock className="w-3 h-3" />
//                           {post.readTime} min read
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>

//             {/* Load More */}
//             <div className="mt-12 text-center">
//               <button className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
//                 <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
//                   Load More Articles
//                 </div>
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>

//       {/* Modal for Full Article */}
//       {selectedPost && selectedPost.content && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 max-w-4xl max-h-[90vh] overflow-hidden">

//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-cyan-700/30">
//               <div>
//                 <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-200">
//                   {selectedPost.content.title}
//                 </h2>
//                 <p className="text-cyan-300/70 text-sm mt-1">{selectedPost.date}</p>
//               </div>
//               <button
//                 onClick={() => setSelectedPost(null)}
//                 className="text-cyan-400 hover:text-cyan-300 transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
//               <div className="prose prose-invert max-w-none">
//                 {renderContent(selectedPost.content.sections)}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogLayout;

// import React, { useState } from 'react';

export const blogsData = [
  {
    "id": 5,
    "image": Blog5,
    "headline": "Why Jaimax Is the Smart Move Right Now",
    "description": `In today’s rapidly evolving cryptocurrency market, making the right investment decisions requires insight, timing, and trust. Among the many <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coins</a> emerging globally,<a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">jaimax</a> stands out as a promising digital asset with unique potential for growth, especially within the Indian crypto ecosystem. This article explores why choosing Jaimax now is a smart move for anyone looking to be part of the future of blockchain and digital finance.`,
    "date": "09 june 25",
    "content": {
      "title": "Jaimax: The Best Crypto Coin Emerging from India",
      "sections": [
        {
          "type": "paragraph",
          "content": `India is rapidly becoming a hotspot for cryptocurrency adoption, supported by a growing population of tech-savvy users and increasing blockchain awareness. As the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in India</a>, Jaimax offers a rare opportunity to join a community focused on decentralized finance (DeFi), crypto innovation, and financial empowerment. With a low market price, it provides an attractive entry point for early adopters.`
        },


        {
          "type": "heading",
          "content": "Unmatched Growth Potential at a Low Price Point"
        },

        {
          "type": "paragraph",
          "content": "Jaimax’s current token price remains highly accessible, allowing investors to get in early before the coin reaches widespread adoption. Early entry into emerging cryptocurrencies like Jaimax can lead to significant gains as the project gains momentum and achieves milestones such as listings on major exchanges and active user adoption. This makes Jaimax one of the most promising crypto investment opportunities today."
        },

        {
          "type": "heading",
          "content": "Strong Use Cases Driving Real-World Utility"
        },
        {
          "type": "paragraph",
          "content": "Unlike many cryptocurrencies that lack clear applications, Jaimax is building an ecosystem that supports:"
        },
        {
          "type": "unordered_list",
          "content": [
            "<b>Decentralized applications (dApps)</b>",
            "<b>Non-fungible tokens (NFTs)</b> ",
            "<b>Digital payments in e-commerce</b>",
            "<b>Community rewards and incentives</b>",
          ]
        },
        {
          "type": "paragraph",
          "content": "This focus on blockchain technology integration ensures Jaimax is positioned for sustainable growth, not just speculative hype. Its utility in real-world scenarios strengthens its value proposition as a functional crypto coin."
        },
        {
          "type": "heading",
          "content": "Robust and Secure Blockchain Infrastructure"
        },

        {
          "type": "paragraph",
          "content": "Jaimax operates on a secure blockchain network designed to facilitate fast, low-cost transactions. The project’s architecture emphasizes scalability and security, making it competitive with other top cryptocurrencies globally. Investors can trust that their assets are protected by advanced cryptographic protocols and a transparent, decentralized ledger system."
        },

        {
          "type": "heading",
          "content": "Experienced Leadership and Active Community Engagement"
        },

        {
          "type": "paragraph",
          "content": "The Jaimax project is driven by a dedicated team of experts with backgrounds in blockchain development, marketing, and community management. Leaders like Santhosh, Mithuna, and Raja Lakshmi actively engage with their growing community, providing regular updates and educational content that boosts crypto awareness and fosters trust."
        },
        {
          "type": "paragraph",
          "content": "Community involvement is crucial in the crypto space, and Jaimax’s active social media presence on platforms like Telegram, Twitter, and YouTube demonstrates its commitment to transparency and growth."
        },
        {
          "type": "heading",
          "content": "Clear Roadmap for Future Development",
        },
        {
          "type": "paragraph",
          "content": "Jaimax’s strategic roadmap includes multiple phases that enhance its ecosystem:",
        },
        {
          "type": "unordered_list",
          "content": [
            "Launching Jaimax Foundation Chain with enhanced scalability",
            "Expanding NFT and DeFi services",
            "Introducing mobile wallets and user-friendly interfaces",
            "Partnering with key industry players for exchange listings and integrations",
          ]
        },
        {
          "type": "paragraph",
          "content": "These planned developments signal a sustainable, well-managed growth trajectory, making Jaimax a strong contender among emerging altcoins."
        },
        {
          "type": "heading",
          "content": "Community-Driven Rewards and Referral Programs"
        },
        {
          "type": "paragraph",
          "content": "Jaimax incorporates a referral-based foundation system, allowing early participants to earn rewards through network growth. This incentivizes organic community building and encourages wider adoption, enhancing the coin’s value and liquidity. Such programs add to the overall appeal of Jaimax as a smart crypto investment."
        },

        {
          "type": "heading",
          "content": "Why Timing Matters: Capitalizing on Early Adoption"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency success stories show that early adoption is key to maximizing returns. By entering the Jaimax ecosystem now, investors gain access before the coin’s price rises following increased demand and wider recognition. This early mover advantage is vital in a market characterized by rapid shifts and high volatility."
        },

        {
          "type": "heading",
          "content": "Jaimax and the Future of Indian Cryptocurrency"
        },
        {
          "type": "paragraph",
          "content": "As India navigates its crypto regulatory environment, projects like Jaimax represent the future of decentralized finance in the country. It embodies the spirit of innovation, financial inclusion, and technology-driven growth that India needs to compete globally."
        },
        {
          "type": "paragraph",
          "content": "By embracing Jaimax today, investors and users alike become part of a pioneering movement set to influence the trajectory of blockchain adoption in India and worldwide."
        },
        {
          "type": "heading",
          "content": "In Summary"
        },
        {
          "type": "paragraph",
          "content": "Jaimax is positioned as one of the most promising cryptocurrency projects in the Indian market, offering a unique blend of technology, community, and opportunity. Its affordable price, robust ecosystem, and forward-looking roadmap make it the smart choice for anyone seeking meaningful engagement with the future of crypto."
        },

      ]
    }
  },
  {
    "id": 4,
    "image": Blog4,
    "headline": "Jaimax: The Future of Cryptocurrency from India to the World",
    "description": "In a world driven by digital transformation and decentralized innovation, Jaimax is emerging as a pioneering cryptocurrency born in India, aiming to make a global mark. Positioned at the intersection of blockchain technology, financial empowerment, and digital freedom, Jaimax isn't just another altcoin — it’s a vision, a movement, and a mission to redefine how the world interacts with finance.",
    "date": "09 june 25",
    "content": {
      "title": "The Rise of a Revolutionary Crypto Brand",
      "sections": [
        {
          "type": "paragraph",
          "content": `In a world driven by digital transformation and decentralized innovation, 
                    <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">Jaimax</a> is emerging as a pioneering 
                    <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">cryptocurrency</a> born in India, aiming to make a global mark. 
                    Positioned at the intersection of 
                    <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">blockchain technology</a>, financial empowerment, and digital freedom, 
                    Jaimax isn't just another altcoin — it’s a vision, a movement, and a mission to redefine how the world interacts with finance. 
                    Discover why it's <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">India’s best crypto coin</a>.`
        },

        {
          "type": "paragraph",
          "content": `Backed by a powerful infrastructure, a strong team of dedicated innovators, and a roadmap grounded in sustainable growth, Jaimax is rapidly gaining traction as <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">India’s best crypto coin</a>. From grassroots education to international expansion, Jaimax is building a future where every digital transaction is secure, accessible, and rewarding.`
        },
        {
          "type": "heading",
          "content": "A Vision Beyond Borders: Jaimax's Global Mission"
        },

        {
          "type": "paragraph",
          "content": "At its core, <b>Jaimax envisions a decentralized future</b> where financial opportunities are not limited by geography, background, or financial history. As India rises as a global tech powerhouse, Jaimax leverages the country's digital momentum to present a <b>crypto platform with international utility and local relevance</b>."
        },
        {
          "type": "paragraph",
          "content": "Our mission is clear — <b>to empower individuals</b> through blockchain, enhance security through smart technology, and <b>bridge traditional finance with the digital economy</b>. Whether you're a first-time investor or a seasoned crypto trader, Jaimax offers a gateway into a more inclusive and transparent ecosystem.",
        },
        {
          "type": "heading",
          "content": "Blockchain Backbone: The Technology Powering Jaimax"
        },
        {
          "type": "paragraph",
          "content": "Jaimax is built on <b>advanced blockchain infrastructure</b> ensuring <b>speed, scalability, and security</b>. Designed to handle high-volume transactions while minimizing costs, our chain architecture competes with global standards like Ethereum and Solana:"
        },
        {
          "type": "unordered_list",
          "content": [
            "<b>High TPS (Transactions Per Second):</b> Jaimax supports lightning-fast processing, suitable for real-time applications.",
            "<b>Energy-Efficient Consensus Mechanism:</b> Our system reduces carbon footprints, embracing sustainability without sacrificing performance.",
            "<b>Smart Contract Integration:</b> Developers can build dApps, DeFi protocols, and even NFT platforms using Jaimax, enabling an expansive utility landscape.",
          ]
        },
        {
          "type": "paragraph",
          "content": "This <b>robust blockchain foundation</b> makes Jaimax not only a digital currency but also a <b>complete ecosystem.</b>"
        },
        {
          "type": "heading",
          "content": "Unmatched Utility: More Than Just a Coin"
        },

        {
          "type": "paragraph",
          "content": "Unlike many crypto projects that fade after launch, Jaimax is deeply committed to <b>real-world use cases</b>. Here’s how Jaimax is adding value:"
        },
        {
          "type": "subheading",
          "content": "1. Digital Payments"
        },
        {
          "type": "paragraph",
          "content": "Jaimax enables fast, borderless, and low-fee transactions for merchants and consumers. With ongoing partnerships, we are integrating with payment gateways and e-commerce platforms to bring crypto to daily life."
        },
        {
          "type": "subheading",
          "content": "2. Investment Asset"
        },

        {
          "type": "paragraph",
          "content": "As a rising altcoin, Jaimax offers early investors an opportunity to enter at a low price point and benefit from long-term appreciation. Its tokenomics ensures stability, liquidity, and rewarding holding mechanisms."
        },
        {
          "type": "subheading",
          "content": "3. Ecosystem Growth"
        },
        {
          "type": "paragraph",
          "content": "Jaimax fosters the creation of decentralized apps (dApps), NFTs, and DeFi projects under its umbrella, giving it beyond-token value. It’s not just a coin — it’s the fuel of an evolving digital economy."
        }, {
          "type": "heading",
          "content": "Strategic Phased Roadmap: Building With Purpose"
        },

        {
          "type": "paragraph",
          "content": "Jaimax follows a 5-phase development plan, ensuring measured, stable, and scalable growth:"
        },
        {
          "type": "unordered_list",
          "content": [
            "<b>Phase 1:</b> Community Building and Coin Launchocused on raising awareness, building trust, and circulating the token among early adopters.",
            "<b>Phase 2:</b> Market Expansion & Platform IntegrationLaunch on exchanges, payment partnerships, and merchant onboarding begins.",
            "<b>Phase 3:</b> Smart Contract and Developer Toolkit Release Developers can deploy smart contracts and dApps on the Jaimax chain.",
            "<b>Phase 4:</b> Global Outreach & Utility Enhancement Entry into international exchanges and cross-border projects.",
            "<b>Phase 5:</b> Institutional Partnerships and Governance DAO A decentralized governance model with stakeholder voting rights and institutional backing.",
          ]
        },
        {
          "type": "paragraph",
          "content": "This structured path ensures sustainable adoption, not just speculative hype."
        },
        {
          "type": "heading",
          "content": "Community-Driven Approach: Power to the People"
        },
        {
          "type": "paragraph",
          "content": "At the heart of Jaimax is its vibrant community. From everyday users to blockchain enthusiasts, the ecosystem thrives on user participation, feedback, and decentralized contributions. Our vision includes:"
        },
        {
          "type": "unordered_list",
          "content": [
            "<b>Community Voting Rights</b> for major updates and use-case adoption.",
            "<b>Transparency Reports</b> released quarterly, maintaining trust and accountability.",
            "<b>Educational Initiatives</b> including seminars, webinars, and local crypto literacy drives.",

          ]
        },

        {
          "type": "paragraph",
          "content": "We believe true decentralization starts with an informed community — and we are here to build that together."
        },
        {
          "type": "heading",
          "content": "India's Moment in the Crypto World"
        },
        {
          "type": "paragraph",
          "content": "India has long been seen as a technology superpower, and Jaimax capitalizes on that momentum. The country’s deep penetration of smartphones, digital wallets, and growing youth interest in crypto gives Jaimax a unique edge."
        },
        {
          "type": "unordered_list",
          "content": [
            "<b>Localized Branding:</b> We speak the language of the people — through campaigns in English, Hindi, Telugu, Tamil, and more.",
            "<b>Regulatory Alignment:</b> Jaimax aims to align with India’s upcoming crypto regulations to remain legally strong and secure for the future.",
            "<b>Exporting Innovation:</b> From India to the world — Jaimax is India's answer to global crypto leadership.",

          ]
        },
        {
          "type": "heading",
          "content": "Security and Transparency at the Core"
        },
        {
          "type": "paragraph",
          "content": "With regular audits, bug bounty programs, and a fully transparent transaction ledger, Jaimax puts security first. Our open-source codebase invites developers to explore, contribute, and innovate — ensuring continuous improvement and community accountability."
        },
        {
          "type": "paragraph",
          "content": "Additionally, our KYC/AML compliance modules are being developed for exchanges and partners, preparing us for a regulation-ready future."
        },
        {
          "type": "heading",
          "content": "Conclusion: Jaimax is the Future"
        },
        {
          "type": "paragraph",
          "content": "Jaimax is more than just a crypto token — it's a revolution from India, built for the world. As blockchain adoption accelerates, Jaimax stands out with its mission-driven approach, user-first design, and global ambitions."
        },
        {
          "type": "paragraph",
          "content": "The next era of finance will be decentralized, inclusive, and digital. With Jaimax leading the charge, the future of cryptocurrency is not just arriving — it’s being built right now."
        },
      ]
    }
  },
  {
    "id": 1,
    "image": Blog1,
    "headline": "The Power of Early Investment: Why Now is the Time for Jaimax",
    "description": "In the dynamic world of cryptocurrency, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the best crypto coin in India, offering a rare chance to invest at a foundational level.",
    "date": "05 may 25",
    "content": {
      "title": "Timing Defines Opportunity in Cryptocurrency",
      "sections": [
        {
          "type": "subheading",
          "content": "Introduction: Timing Defines Opportunity in Cryptocurrency"
        },
        {
          "type": "paragraph",
          "content": `In the dynamic world of <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">cryptocurrency</a>, success often belongs to those who act early. The current digital era rewards investors who can recognize potential before the world catches on. Jaimax, a rising star in the Indian crypto ecosystem, is positioned to become the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in India</a>, offering a rare chance to invest at a foundational level.`
        },
        {
          "type": "paragraph",
          "content": `This article explores why early investment in Jaimax offers a powerful opportunity, and why it is already being considered by experts and early adopters as one of the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coins  to invest</a> in this year.`
        },
        {
          "type": "subheading",
          "content": "The Power of Early Adoption in Crypto Markets"
        },
        {
          "type": "paragraph",
          "content": "Early adoption has consistently led to exponential growth in the cryptocurrency space. From Bitcoin’s rise from pennies to thousands of dollars, to Ethereum's surge from a few dollars to four-digit values — history shows that entering early creates long-term winners."
        },
        {
          "type": "paragraph",
          "content": "Jaimax, in its current early-phase pricing, presents similar characteristics:"
        },
        {
          "type": "unordered_list",
          "content": [
            "Low entry point (₹0.50) for high-volume accumulation.",
            "Early access before major exchange listings and market hype.",
            "Direct exposure to a digital asset with real utility and local relevance."
          ]
        },
        {
          "type": "paragraph",
          "content": "Jaimax’s early investors are not just buying coins; they are securing a strategic position in the future of Indian crypto markets."
        },
        {
          "type": "heading",
          "content": "Why Jaimax is Gaining Attention"
        },
        {
          "type": "paragraph",
          "content": "What separates Jaimax from the sea of altcoins in circulation? It’s the combination of technology, local market alignment, transparent development, and long-term vision. Here's why Jaimax is poised to dominate:"
        },
        {
          "type": "subheading",
          "content": "1. Tailored for India’s Digital Finance Evolution"
        },
        {
          "type": "paragraph",
          "content": "India’s population is embracing digital technology rapidly, and cryptocurrency adoption is accelerating. Jaimax is built with the Indian market in mind — from accessibility to pricing, making it a strong contender for the best crypto coin in India."
        },
        {
          "type": "paragraph",
          "content": "Its affordability and scalability align perfectly with India’s demographic — tech-savvy youth, growing retail investors, and emerging entrepreneurs"
        },
        {
          "type": "subheading",
          "content": "2. Transparent and Reliable Tokenomics"
        },
        {
          "type": "paragraph",
          "content": "Unlike countless speculative crypto projects, Jaimax has clear tokenomics designed for growth, security, and longevity. Limited total supply, gradual release schedules, and secure architecture provide strong investor confidence."
        },
        {
          "type": "paragraph",
          "content": `The coin’s scarcity and responsible allocation create sustainable demand pressure — essential traits for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest</a>`
        },
        {
          "type": "subheading",
          "content": "3. Cutting-Edge Technology"
        },
        {
          "type": "paragraph",
          "content": "Behind every reliable crypto coin lies robust technology. Jaimax utilizes high-speed blockchain protocols to ensure:"
        },
        {
          "type": "unordered_list",
          "content": [
            "Instant transactions",
            "Low fees",
            "High scalability",
            "Strong security standards"
          ]
        },
        {
          "type": "paragraph",
          "content": "This makes Jaimax future-ready, ensuring its usability across digital applications, mobile wallets, and potential future integrations with e-commerce or fintech platforms."
        },
        {
          "type": "subheading",
          "content": "4. Developer-Backed Roadmap"
        },
        {
          "type": "paragraph",
          "content": "A strong coin needs a strong plan. Jaimax has a clear, step-by-step development roadmap involving:"
        },
        {
          "type": "unordered_list",
          "content": [
            "Exchange listings",
            "Wallet partnerships",
            "DeFi integration",
            "Community tools and apps"
          ]
        },
        {
          "type": "heading",
          "content": "Why ₹0.50 is a Golden Entry Point"
        },
        {
          "type": "paragraph",
          "content": "Price is a powerful psychological and strategic factor. With Jaimax currently valued at just ₹0.50, this is a rare moment to accumulate high-volume holdings without high capital investment."
        },
        {
          "type": "unordered_list",
          "content": [
            "Lowest possible risk with highest potential reward",
            "Ideal for long-term holding and short-term trading",
            "Entry before upcoming upgrades and visibility boosts"
          ]
        },
        {
          "type": "paragraph",
          "content": "As the crypto market evolves, undervalued assets like Jaimax typically outperform once broader awareness kicks in. That’s why smart investors act before the crowd."
        },
        {
          "type": "heading",
          "content": "Jaimax: Designed for Scalable Growth"
        },
        {
          "type": "paragraph",
          "content": "Every successful cryptocurrency must scale effectively. Jaimax’s infrastructure is already built for future expansion."
        },
        {
          "type": "unordered_list",
          "content": [
            "Scalable transactions per second (TPS) to handle high volume",
            "Smart contract integration for advanced DeFi functions",
            "Audit-ready architecture to attract institutional and retail confidence"
          ]
        },
        {
          "type": "paragraph",
          "content": "This technical maturity gives Jaimax the foundation to become not just a speculative token but a real utility-driven crypto coin"
        },
        {
          "type": "heading",
          "content": "Indian Crypto Trends: Why Jaimax is the Perfect Fit"
        },
        {
          "type": "paragraph",
          "content": "India is set to become one of the world’s top cryptocurrency markets. With a population of 1.4 billion and increasing access to internet and mobile banking, the need for affordable, fast, and secure crypto coins is exploding."
        },
        {
          "type": "unordered_list",
          "content": [
            "Local relevance gives it an edge in adoption over foreign tokens.",
            "Educational initiatives will drive wider understanding and trust.",
            "Mobile-ready platforms ensure rural and urban access alike."
          ]
        },
        {
          "type": "heading",
          "content": "A Secure, Transparent Ecosystem"
        },
        {
          "type": "paragraph",
          "content": "Security is non-negotiable. Jaimax employs multi-layered security protocols."
        },
        {
          "type": "unordered_list",
          "content": [
            "Advanced cryptography",
            "Blockchain immutability",
            "Decentralized ledger architecture"
          ]
        },
        {
          "type": "heading",
          "content": "Jaimax vs. Other Crypto Coins: A Comparison"
        },
        {
          "type": "table",
          "content": [
            {
              "Feature": "Price Accessibility",
              "Jaimax": "₹0.50 (entry stage)",
              "Generic Altcoin": "Often above ₹10+"
            },
            {
              "Feature": "Localized Growth Focus",
              "Jaimax": "India-first expansion strategy",
              "Generic Altcoin": "Global but unfocused"
            },
            {
              "Feature": "Technology",
              "Jaimax": "Scalable, fast, secure",
              "Generic Altcoin": "Average blockchain models"
            },
            {
              "Feature": "Roadmap Transparency",
              "Jaimax": "Clear, public, and progressive",
              "Generic Altcoin": "Often unclear or delayed"
            },
            {
              "Feature": "Community & Utility Vision",
              "Jaimax": "Strong user engagement plans",
              "Generic Altcoin": "Weak or speculative only"
            }
          ]
        },
        {
          "type": "heading",
          "content": "The Risk of Waiting: Missed Opportunities"
        },
        {
          "type": "paragraph",
          "content": "The biggest regret in cryptocurrency history? Not buying early."
        },
        {
          "type": "unordered_list",
          "content": [
            "Higher entry costs later",
            "Reduced ROI",
            "Missed participation in early decision-making or feature access"
          ]
        },
        {
          "type": "paragraph",
          "content": "The current stage of Jaimax offers the lowest barrier to entry, while offering maximum growth potential. This is a time-sensitive opportunity that seasoned investors understand"
        },
        {
          "type": "heading",
          "content": "Conclusion: The Smart Move Is to Act Early"
        },
        {
          "type": "paragraph",
          "content": `The cryptocurrency world doesn’t wait. Jaimax, with its strategic entry price, local relevance, and long-term vision, is clearly one of the best crypto coins in India today. For those looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in 2025</a>, this is the moment to step in, while the door is still open.`
        }, {
          "type": "paragraph",
          "content": "Jaimax isn’t just a coin — it’s a movement toward inclusive, secure, and smart financial systems. Early action leads to long-term advantage. Don’t let this window of opportunity pass."
        }
      ]
    }
  },

  {
    "id": 2,
    "image": Blog2,
    "headline": "How Jaimax Works: A Deep Dive into Our Coin and Technology",
    "description": "Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the best crypto coin in India. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the best crypto to invest in India.",
    "date": "12 may 25",
    "content": {
      "title": "Jaimax: The Best Crypto Coin in India",
      "sections": [
        {
          "type": "paragraph",
          "content": `Jaimax is revolutionizing the way India experiences cryptocurrency. As a forward-thinking digital currency designed for high performance, accessibility, and future scalability, Jaimax is rapidly gaining momentum as the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto coin in india</a>. Built with precision and launched for growth, it provides a secure, powerful platform for users looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in India</a>.With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation.`
        },
        {
          "type": "paragraph",
          "content": "With an emphasis on cutting-edge technology, simplicity, and trust, Jaimax offers an opportunity for Indian investors to be part of a new financial ecosystem powered by blockchain innovation"
        },
        {
          "type": "heading",
          "content": "The Technology Backbone of Jaimax"
        },
        {
          "type": "subheading",
          "content": "High-Speed Scalable Blockchain"
        },

        {
          "type": "paragraph",
          "content": "Jaimax is powered by an advanced Proof of Stake (PoS) consensus mechanism. Unlike outdated systems that rely on power-hungry mining, this next-gen blockchain delivers lightning-fast, eco-friendly transactions."
        },
        {
          "type": "unordered_list",
          "content": [
            "Block Generation Time: 2 seconds",
            "Transaction Speed: Over 5,000 transactions per second (TPS).",
            "Network Uptime: 99.99%",
            "Gas Fees: Extremely low and consistent"
          ]
        },
        {
          "type": "paragraph",
          "content": `This architecture ensures Jaimax is not just a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coin</a> for trading, but a practical, scalable platform for mainstream use in India and beyond.`
        },
        {
          "type": "subheading",
          "content": "Smart Contract Support and Interoperability"
        },
        {
          "type": "paragraph",
          "content": "The Jaimax blockchain is fully smart contract enabled, making it compatible with developers building next-generation decentralized applications (dApps) and tokenized services."
        },
        {
          "type": "unordered_list",
          "content": [
            "Supports Solidity & Web3 Tools",
            "Cross-chain compatibility with Ethereum and BNB Smart Chain",
            "Secure and audited smart contracts",
          ]
        },
        {
          "type": "paragraph",
          "content": `This infrastructure allows real-world use cases — from DeFi platforms to NFT marketplaces — to thrive within the Jaimax ecosystem, reinforcing its position as a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">top crypto coin in India</a>’s growing digital economy.`
        },
        {
          "type": "heading",
          "content": "Coin Supply and Investment Structure"
        },
        {
          "type": "paragraph",
          "content": "Jaimax follows a meticulously planned coin distribution model aimed at driving long-term value."
        },
        {
          "type": "unordered_list",
          "content": [
            "Total Supply: 1 Billion Jaimax coins",
            "Launch Price: ₹0.10",
            "Current Price: ₹0.50",
            "Public Trading Launch: Begins after Phase 2 completion",
          ]
        },

        {
          "type": "paragraph",
          "content": "This limited supply model ensures scarcity, while phase-based growth encourages early participation and maximizes investor returns. It’s a strategy that makes Jaimax one of the best crypto coins to invest in India today."
        },
        {
          "type": "heading",
          "content": "Strategic Phased Growth of Jaimax"
        },
        {
          "type": "subheading",
          "content": "Phase 1: Launch and Awareness"
        },
        {
          "type": "unordered_list",
          "content": [
            "Objective: Build user base, generate initial momentum",
            "Coin Price: ₹0.10",
            "Outcome: Early adopters benefit from foundational pricing",
          ]
        },
        {
          "type": "subheading",
          "content": "Phase 2: Market Expansion and Branding"
        },
        {
          "type": "unordered_list",
          "content": [
            "Objective: Solidify brand, expand user outreach",
            "Coin Price: ₹0.50",
            "Outcome: Strong community, increased value",
          ]
        },
        {
          "type": "subheading",
          "content": "Post-Phase 2: Trading and Ecosystem Integration"
        },
        {
          "type": "unordered_list",
          "content": [
            "Objective: Enable public trading on top crypto exchanges",
            "Focus: Liquidity, partnerships, and platform adoption",
            "Utility: Used for transactions, smart contract fees, and ecosystem access",
          ]
        },
        {
          "type": "heading",
          "content": "Security, Transparency, and Trust"
        },
        {
          "type": "unordered_list",
          "content": [
            "Smart Contract Audits: Verified by third-party blockchain security firms",
            "Open Source Protocols: Code available for public verification",
            "User Verification: KYC/AML processes in place",
            "Data Privacy: Protected through end-to-end encryption"
          ]
        },
        {
          "type": "paragraph",
          "content": "These protocols help position Jaimax as a safe and reliable cryptocurrency, making it attractive to both first-time users and experienced crypto investors in India."
        },
        {
          "type": "heading",
          "content": "Utility and Real-World Integration"
        },
        {
          "type": "paragraph",
          "content": "Jaimax isn't just a token with speculative value — it's designed for real-world application."
        },
        {
          "type": "unordered_list",
          "content": [
            "Use as Gas Token: All transactions and smart contracts require Jaimax",
            "Ecosystem Growth: Future integration with gaming, e-commerce, and decentralized finance platforms",
            "Scalable Infrastructure: Ideal for building apps, platforms, and services"
          ]
        },
        {
          "type": "paragraph",
          "content": "This practical approach makes Jaimax a true utility crypto coin, offering more than just holding value — it offers use, purpose, and future integration."
        },
        {
          "type": "heading",
          "content": "Why Jaimax is the Best Crypto to Invest in India"
        },
        {
          "type": "subheading",
          "content": "India-Focused Innovation"
        },
        {
          "type": "paragraph",
          "content": "Jaimax has been created to empower Indian users and businesses. It offers a simplified entry point into the blockchain world with features tailored for the Indian market."
        },
        {
          "type": "unordered_list",
          "content": [
            "Low-cost entry for new investors",
            "Localized support and user resources",
            "Designed with Indian compliance in mind"
          ]
        },
        {
          "type": "paragraph",
          "content": "Whether you're an individual looking to diversify your investments or a business seeking blockchain adoption, Jaimax delivers unmatched advantages."
        },
        {
          "type": "subheading",
          "content": "Affordable Today, Valuable Tomorrow"
        },
        {
          "type": "paragraph",
          "content": "At ₹0.50 per coin during its second phase, Jaimax represents an incredible opportunity for investors. With public trading and global listings planned, early participation can lead to significant long-term benefits."
        },
        {
          "type": "unordered_list",
          "content": [
            "Early growth potential",
            "Backed by strong branding and awareness campaigns",
            "Designed for sustainable upward movement"
          ]
        },
        {
          "type": "paragraph",
          "content": "In a market filled with high-risk speculative coins, Jaimax stands out as a value-driven, strategic crypto investment."
        },
        {
          "type": "heading",
          "content": "Conclusion: Secure Your Place in the Future with Jaimax"
        },
        {
          "type": "paragraph",
          "content": "TJaimax is not just another coin in the digital space — it’s a mission, a movement, and a meticulously designed ecosystem. With powerful technology, user-centric design, and a strong vision for the future, Jaimax is becoming the best crypto coin in India and a beacon of trust in the blockchain world."
        },
        {
          "type": "paragraph",
          "content": "If you're looking for a crypto coin that combines security, real utility, and long-term potential, Jaimax is the best crypto to invest in India today."
        }
      ]
    }
  },
  {
    "id": 3,
    "image": Blog3,
    "headline": "Understanding Cryptocurrency: A Simple Guide for New Users",
    "description": `Cryptocurrency has dramatically transformed the financial landscape, offering an innovative and decentralized method of transactions that challenges traditional financial systems. If you’re new to the world of cryptocurrency, it may seem complex, but with the right knowledge and resources, anyone can understand and participate. This guide will break down cryptocurrency in simple terms and introduce you to the exciting opportunities it presents, including how Jaimax, a rising <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">crypto coin</a> in India, is making waves in the market.`,
    "date": "13 may 25",
    "content": {
      "title": "What is Cryptocurrency?",
      "sections": [
        {
          "type": "paragraph",
          "content": "Cryptocurrency is a form of digital or virtual currency that uses cryptography for secure transactions. Unlike traditional currencies, cryptocurrencies operate on a decentralized network, meaning they are not governed by any central authority such as a government or financial institution. This decentralization enhances security, transparency, and control for users."
        },
        {
          "type": "paragraph",
          "content": "The most well-known cryptocurrency, Bitcoin, was the first to revolutionize digital finance, but today there are thousands of different cryptocurrencies, each serving unique purposes. The underlying technology behind cryptocurrency, blockchain, allows for secure, transparent, and irreversible transactions"
        },
        {
          "type": "heading",
          "content": "How Does Cryptocurrency Work?"
        },

        {
          "type": "paragraph",
          "content": "Additionally, cryptocurrency transactions rely on cryptographic algorithms to secure the transfer of funds, ensuring that both the transaction and the identity of the sender are protected."
        },
        {
          "type": "heading",
          "content": "Types of Cryptocurrency"
        },
        {
          "type": "paragraph",
          "content": "There are various types of cryptocurrencies, each with specific uses. Below are some of the most well-known:"
        },

        {
          "type": "subheading",
          "content": "Bitcoin (BTC)"
        },
        {
          "type": "paragraph",
          "content": "Bitcoin is the original cryptocurrency, introduced in 2009 by the pseudonymous Satoshi Nakamoto. It remains the largest cryptocurrency by market capitalization and is often regarded as a store of value or 'digital gold.'"
        },

        {
          "type": "subheading",
          "content": "Ethereum (ETH)"
        },
        {
          "type": "paragraph",
          "content": "Ethereum is a decentralized platform that enables developers to create smart contracts and decentralized applications (dApps). Ethereum is more than just a cryptocurrency; it also acts as a platform for building applications beyond simple digital currency transactions."
        },
        {
          "type": "subheading",
          "content": "Ripple (XRP)"
        },

        {
          "type": "unordered_list",
          "content": [
            "Smart Contract Audits: Verified by third-party blockchain security firms",
            "Open Source Protocols: Code available for public verification",
            "User Verification: KYC/AML processes in place",
            "Data Privacy: Protected through end-to-end encryption"
          ]
        },
        {
          "type": "paragraph",
          "content": "Ripple is both a payment protocol and a cryptocurrency, designed to enable fast and inexpensive cross-border transactions. Ripple offers scalability and efficiency, making it a preferred choice for financial institutions looking to transfer funds globally."
        },
        {
          "type": "subheading",
          "content": "Litecoin (LTC)"
        },

        {
          "type": "paragraph",
          "content": "Litecoin is often referred to as the silver to Bitcoin’s gold. With a faster transaction time and lower fees, Litecoin is designed for use as an everyday payment method, making it a practical alternative for regular transactions."
        },
        {
          "type": "subheading",
          "content": "Jaimax Cryptocurrency"
        },
        {
          "type": "paragraph",
          "content": `Jaimax is an emerging crypto coin in India, offering a secure, decentralized solution for users seeking investment opportunities in the cryptocurrency market. With its focus on accessibility and community engagement, Jaimax is quickly becoming a <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">top cryptocurrency to invest in India</a>, particularly for those interested in early-stage investments in the cryptocurrency space.`
        },

        {
          "type": "heading",
          "content": "How to Buy Cryptocurrency"
        },

        {
          "type": "paragraph",
          "content": "Acquiring cryptocurrency is straightforward and can be done in several ways. Here are the common methods:"
        },
        {
          "type": "subheading",
          "content": "Cryptocurrency Exchanges"
        },
        {
          "type": "paragraph",
          "content": "The most common method to buy cryptocurrency is through exchanges. Popular platforms like Coinbase, Binance, and Kraken allow users to create accounts, deposit fiat currency, and purchase a variety of cryptocurrencies. These exchanges also offer wallet services to securely store digital assets."
        },
        {
          "type": "subheading",
          "content": "Peer-to-Peer (P2P) Platforms"
        },
        {
          "type": "paragraph",
          "content": "P2P platforms allow users to buy cryptocurrencies directly from other individuals. Transactions can be done using various payment methods such as bank transfers or PayPal, offering flexibility and ease."
        },

        {
          "type": "subheading",
          "content": "Bitcoin ATMs."
        },
        {
          "type": "paragraph",
          "content": "In some locations, Bitcoin ATMs allow users to purchase cryptocurrency in exchange for cash. While less common than traditional ATMs, these machines offer an alternative way to acquire digital currency."
        },
        {
          "type": "heading",
          "content": "Storing Cryptocurrency: Wallets"
        },
        {
          "type": "paragraph",
          "content": "Once you’ve acquired cryptocurrency, it’s essential to store it securely. There are two main types of wallets:"
        },
        {
          "type": "subheading",
          "content": "Hot Wallets"
        },
        {
          "type": "paragraph",
          "content": "Hot wallets are online wallets connected to the internet. These are convenient for quick transactions but are more susceptible to hacking. Popular hot wallets include Exodus and Trust Wallet."
        },
        {
          "type": "subheading",
          "content": "Cold Wallets"
        },
        {
          "type": "paragraph",
          "content": "Cold wallets are offline wallets that provide a higher level of security. Hardware wallets like Ledger and Trezor store your private keys offline, making them less vulnerable to attacks. Cold wallets are best for long-term storage of cryptocurrency."
        },
        {
          "type": "heading",
          "content": "Cryptocurrency Mining"
        },
        {
          "type": "paragraph",
          "content": "Mining is the process by which new cryptocurrencies are created and added to the blockchain. Miners use computational power to solve complex mathematical problems, validating transactions and receiving new coins as a reward. Mining used to be more accessible, but today it requires significant computing power, especially for popular cryptocurrencies like Bitcoin"
        },
        {
          "type": "heading",
          "content": "Benefits of Cryptocurrency"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency offers several advantages over traditional financial systems:"
        },
        {
          "type": "subheading",
          "content": "Decentralization"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency operates on a peer-to-peer network, without a central authority. This gives users greater control over their transactions and assets, reducing reliance on banks or government entities."
        },
        {
          "type": "subheading",
          "content": "Security"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency transactions are secure and irreversible, thanks to blockchain technology and cryptographic algorithms. The decentralized nature of the network also reduces the risks of fraud and identity theft."
        },
        {
          "type": "subheading",
          "content": "Low Transaction Fees"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency transactions often involve lower fees compared to traditional banking systems. For international transfers, cryptocurrencies like Jaimax can be more cost-effective than conventional money transfer services."
        },
        {
          "type": "subheading",
          "content": "Privacy and Anonymity"
        },
        {
          "type": "paragraph",
          "content": "Some cryptocurrencies, like Monero and Zcash, offer enhanced privacy features, allowing users to make anonymous transactions. This feature is especially attractive for those who value privacy in their financial dealings."
        },
        {
          "type": "heading",
          "content": "Risks of Cryptocurrency"
        },
        {
          "type": "paragraph",
          "content": "Despite its advantages, cryptocurrency comes with risks:"
        },
        {
          "type": "subheading",
          "content": "Volatility"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrencies are known for their price volatility, with values fluctuating significantly. While this can lead to high returns, it also poses risks for investors, particularly those new to the market."
        },
        {
          "type": "subheading",
          "content": "Regulatory Uncertainty"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency regulations are still developing in many countries. The regulatory landscape can be uncertain, and changes in laws could affect the market and the legality of using or trading digital currencies."
        },
        {
          "type": "subheading",
          "content": "Security Threats"
        },
        {
          "type": "paragraph",
          "content": "While blockchain itself is secure, cryptocurrency exchanges and wallets can be vulnerable to hacking. There have been incidents of high-profile exchanges being compromised, resulting in the loss of millions of dollars."
        },
        {
          "type": "heading",
          "content": "Jaimax: A Top Cryptocurrency to Invest in India"
        },
        {
          "type": "paragraph",
          "content": `For those looking for the <a href="https://jaimax.com/" target="_blank" rel="noopener noreferrer" style="color: #4dabf7;">best crypto to invest in India</a>, Jaimax offers an intriguing opportunity. As a rising cryptocurrency in India, Jaimax is gaining attention for its unique approach and growing community. With a focus on user empowerment, Jaimax is poised to become a significant player in the Indian cryptocurrency market. Whether you’re new to crypto or an experienced investor, Jaimax is one of the best cryptocurrencies to invest in India due to its promising potential and increasing adoption.`
        },
        {
          "type": "heading",
          "content": "Conclusion"
        },
        {
          "type": "paragraph",
          "content": "Cryptocurrency is revolutionizing the way we think about finance. From Bitcoin to Jaimax, there are many exciting options to explore. Whether you're looking to make investments or simply engage with the digital economy, understanding how cryptocurrencies work and their potential can open up a world of opportunities. With Jaimax emerging as a prominent option for investors in India, the future of digital currencies looks promising."
        },
      ]
    }
  },


];


// import { Search, TrendingUp, Flame, Eye, Calendar, Clock, ArrowRight, Star, ArrowLeft } from 'lucide-react';

// // Import your blog images
// import Blog1 from '../../../public/images/Blog1poster.jpg'
// import Blog2 from '../../../public/images/Blog2poster.jpg'
// import Blog3 from '../../../public/images/Blog3poster.jpg'
// import Blog4 from '../../../public/images/Blog4poster.jpg'
// import Blog5 from '../../../public/images/Blog5poster.jpg'
// import ArticleView from './Article';
// import ReferralModal from '../../components/Dashboard/modals/referalModal';
// import { FaShareAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [currentView, setCurrentView] = useState('list'); // 'list' or 'article'
//   const [hoveredPost, setHoveredPost] = useState(null);
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [selectedReferralPost, setSelectedReferralPost] = useState(null);

//   const userDataTopasID = localStorage.getItem("userData");
// const navigate = useNavigate();

// // helper slugify function if you don't have one yet
// const slugify = (str) =>
//   str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");



//   const handleOpenReferralModal = (post) => {
//     setSelectedReferralPost(post);
//     setShowReferralModal(true);
//   };

//   const handleCloseReferralModal = () => {
//     setShowReferralModal(false);
//     setSelectedReferralPost(null);
//   };
//   // Sample data - replace with your actual blogsData, categories, and topPosts
//   const categories = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'NFTs', 'Trading'];
//   const topPosts = [
//     'Bitcoin hits new all-time high amid institutional adoption',
//     'Ethereum 2.0 staking rewards reach $1B milestone',
//     'DeFi protocols face regulatory scrutiny in 2024',
//     'NFT market shows signs of recovery after winter'
//   ];


//   const filteredPosts = blogsData.filter(post => {
//     const matchesSearch = post.headline.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleReadMore = (post) => {
//     if (post.content) {
//       setSelectedPost(post);
//       setCurrentView('article');
//     }
//   };

//   // const handleBackToList = () => {
//   //   setCurrentView('list');
//   //   setSelectedPost(null);
//   // };

//   const renderContent = (sections) => {
//     return sections.map((section, index) => {
//       switch (section.type) {
//         case 'heading':
//           return (
//             <h2 key={index} className="text-xl font-bold text-cyan-100 mb-4 mt-6">
//               {section.content}
//             </h2>
//           );
//         case 'paragraph':
//           return (
//             <p key={index} className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }}>
//             </p>
//           );
//         case 'unordered_list':
//           return (
//             <ul key={index} className="list-disc list-inside mb-4 text-gray-300 space-y-2">
//               {section.content.map((item, itemIndex) => (
//                 <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
//               ))}
//             </ul>
//           );
//         default:
//           return null;
//       }
//     });
//   };


//   // const ArticleView = () => (
//   //   <div 
//   //     className="min-h-screen px-6 py-8"
//   //     style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//   //   >
//   //     <div className="max-w-8xl mx-auto">
//   //       {/* Back Button */}
//   //       <button
//   //         onClick={handleBackToList}
//   //         className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 mb-6 group"
//   //       >
//   //         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//   //         Back to Articles
//   //       </button>

//   //       {/* Article Header */}
//   //       <div className="relative group mb-8">
//   //         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20"></div>
//   //         <div className="relative bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/30 overflow-hidden">

//   //           {/* Featured Image */}
//   //           <div className="relative aspect-video overflow-hidden">
//   //             <img 
//   //               src={selectedPost.image} 
//   //               alt={selectedPost.headline}
//   //               className="w-full h-full object-cover" 
//   //             />
//   //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//   //             {/* Badges */}
//   //             <div className="absolute top-4 left-4 flex gap-2">
//   //               {selectedPost.trending && (
//   //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-teal-400/50">
//   //                   <TrendingUp className="w-4 h-4" />
//   //                   Trending
//   //                 </span>
//   //               )}
//   //               {selectedPost.featured && (
//   //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-cyan-400/50">
//   //                   <Star className="w-4 h-4" />
//   //                   Featured
//   //                 </span>
//   //               )}
//   //               {selectedPost.hot && (
//   //                 <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-teal-400/50">
//   //                   <Flame className="w-4 h-4" />
//   //                   Hot
//   //                 </span>
//   //               )}
//   //             </div>

//   //             {/* Views */}
//   //             <div className="absolute top-4 right-4">
//   //               <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm text-cyan-200">
//   //                 <Eye className="w-4 h-4" />
//   //                 {selectedPost.views}
//   //               </span>
//   //             </div>
//   //           </div>

//   //           {/* Article Meta */}
//   //           <div className="p-6">
//   //             <div className="flex items-center justify-between mb-4">
//   //               <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-sm font-medium text-cyan-300 border border-cyan-400/25">
//   //                 {selectedPost.category}
//   //               </span>
//   //               <div className="flex items-center gap-4 text-sm text-teal-400/80">
//   //                 <div className="flex items-center gap-1">
//   //                   <Calendar className="w-4 h-4" />
//   //                   {selectedPost.date}
//   //                 </div>
//   //                 <div className="flex items-center gap-1">
//   //                   <Clock className="w-4 h-4" />
//   //                   {selectedPost.readTime} min read
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-4">
//   //               {selectedPost.content.title}
//   //             </h1>
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* Article Content */}
//   //       <div className="relative group">
//   //         <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-10"></div>
//   //         <div className="relative bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 p-8">
//   //           <div className="prose prose-invert max-w-none">
//   //             {renderContent(selectedPost.content.sections)}
//   //           </div>
//   //         </div>
//   //       </div>

//   //       {/* Article Footer */}
//   //       <div className="mt-8 text-center">
//   //         <button
//   //           onClick={handleBackToList}
//   //           className="relative group"
//   //         >
//   //           <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
//   //           <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
//   //             Read More Articles
//   //           </div>
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   //   const ArticleView = () => (
//   //   <div className="min-h-screen bg-[#0b1f24] text-white w-full">
//   //     <div className="w-full">

//   //       {/* Back Button */}
//   //       <button
//   //         onClick={handleBackToList}
//   //         className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 mb-6 px-4 pt-6"
//   //       >
//   //         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//   //         Back to Articles
//   //       </button>

//   //       {/* Article Header */}
//   //       <div className="mb-8 px-4">
//   //         <div className="mb-4 text-sm text-cyan-200 flex flex-wrap gap-4">
//   //           <span><strong>Category:</strong> {selectedPost.category}</span>
//   //           <span className="flex items-center gap-1">
//   //             <Calendar className="w-4 h-4" />
//   //             {selectedPost.date}
//   //           </span>
//   //           <span className="flex items-center gap-1">
//   //             <Clock className="w-4 h-4" />
//   //             {selectedPost.readTime} min read
//   //           </span>
//   //           <span className="flex items-center gap-1">
//   //             <Eye className="w-4 h-4" />
//   //             {selectedPost.views}
//   //           </span>
//   //         </div>

//   //         <h1 className="text-3xl lg:text-4xl font-bold text-cyan-100 mb-4">
//   //           {selectedPost.content.title}
//   //         </h1>
//   //       </div>

//   //       {/* Article Content */}
//   //       <div className="px-4">
//   //         <div className="prose prose-invert max-w-none text-justify">
//   //           <img
//   //             src={selectedPost.image}
//   //             alt={selectedPost.headline}
//   //             className="float-right ml-6 mb-4 w-full max-w-sm rounded"
//   //           />
//   //           {renderContent(selectedPost.content.sections)}
//   //         </div>
//   //       </div>

//   //       {/* Article Footer */}
//   //       <div className="mt-10 px-4 pb-10">
//   //         <button
//   //           onClick={handleBackToList}
//   //           className="text-cyan-400 hover:underline"
//   //         >
//   //           ← Read More Articles
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   // const ArticleView = () => {
//   //   const [view, setView] = useState("article");

//   //   // Dummy article data
//   //   const selectedPost = {
//   //     image: "https://via.placeholder.com/500x300",
//   //     headline: "Why Blockchain Matters",
//   //     category: "Crypto",
//   //     date: "June 25, 2025",
//   //     readTime: 5,
//   //     views: 1240,
//   //     content: {
//   //       title: "Understanding Blockchain in 2025",
//   //       sections: [
//   //         {
//   //           content: `<p>Blockchain is a decentralized digital ledger that records transactions across many computers.</p>
//   //                     <p>Its use in cryptocurrencies like Bitcoin has revolutionized finance. <a href="#">Learn more</a>.</p>`,
//   //         },
//   //         {
//   //           content: `<h2>Key Benefits</h2><ul><li>Transparency</li><li>Security</li><li>Decentralization</li></ul>`,
//   //         },
//   //       ],
//   //     },
//   //   };

//   //   const recentBlogsData = [
//   //     { title: "Understanding Blockchain Scaling" },
//   //     { title: "How Crypto Wallets Work" },
//   //     { title: "Top 5 Web3 Tools in 2025" },
//   //     { title: "What is Layer 2?" },
//   //     { title: "Crypto Security Best Practices" },
//   //   ];

//   //   const renderContent = (sections) =>
//   //     sections.map((sec, i) => (
//   //       <div key={i} dangerouslySetInnerHTML={{ __html: sec.content }} />
//   //     ));

//   //   const handleBackToList = () => {
//   //     alert("Back to articles clicked.");
//   //   };

//   //   return (
//   //     <div className="min-h-screen bg-[#0b1f24] text-white w-full">
//   //       <div className="w-full px-4 pt-6">

//   //         {/* Toggle Buttons */}
//   //         <div className="flex items-center justify-between mb-6">
//   //           <button
//   //             onClick={handleBackToList}
//   //             className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300"
//   //           >
//   //             <ArrowLeft className="w-4 h-4" />
//   //             Back to Articles
//   //           </button>

//   //           <div className="flex gap-4">
//   //             <button
//   //               onClick={() => setView("article")}
//   //               className={`text-sm px-3 py-1 rounded ${
//   //                 view === "article"
//   //                   ? "bg-cyan-600 text-white"
//   //                   : "text-cyan-400 hover:text-cyan-300"
//   //               }`}
//   //             >
//   //               Article
//   //             </button>
//   //             <button
//   //               onClick={() => setView("recent")}
//   //               className={`text-sm px-3 py-1 rounded ${
//   //                 view === "recent"
//   //                   ? "bg-cyan-600 text-white"
//   //                   : "text-cyan-400 hover:text-cyan-300"
//   //               }`}
//   //             >
//   //               Recent Blogs
//   //             </button>
//   //           </div>
//   //         </div>

//   //         {view === "article" ? (
//   //           <div className="flex flex-col lg:flex-row gap-8">
//   //             {/* Left Side - Article */}
//   //             <div className="lg:w-2/3 w-full">
//   //               <div className="mb-4 text-sm text-cyan-200 flex flex-wrap gap-4">
//   //                 <span><strong>Category:</strong> {selectedPost.category}</span>
//   //                 <span className="flex items-center gap-1">
//   //                   <Calendar className="w-4 h-4" />
//   //                   {selectedPost.date}
//   //                 </span>
//   //                 <span className="flex items-center gap-1">
//   //                   <Clock className="w-4 h-4" />
//   //                   {selectedPost.readTime} min read
//   //                 </span>
//   //                 <span className="flex items-center gap-1">
//   //                   <Eye className="w-4 h-4" />
//   //                   {selectedPost.views}
//   //                 </span>
//   //               </div>

//   //               <h1 className="text-3xl lg:text-4xl font-bold text-cyan-100 mb-4">
//   //                 {selectedPost.content.title}
//   //               </h1>

//   //               <div className="prose prose-invert max-w-none text-justify">
//   //                 <img
//   //                   src={selectedPost.image}
//   //                   alt={selectedPost.headline}
//   //                   className="float-right ml-6 mb-4 w-full max-w-sm rounded"
//   //                 />
//   //                 {renderContent(selectedPost.content.sections)}
//   //               </div>

//   //               <div className="mt-10 pb-10">
//   //                 <button
//   //                   onClick={handleBackToList}
//   //                   className="text-cyan-400 hover:underline"
//   //                 >
//   //                   ← Read More Articles
//   //                 </button>
//   //               </div>
//   //             </div>

//   //             {/* Right Side - Sidebar */}
//   //             <div className="lg:w-1/3 w-full flex flex-col gap-8">
//   //               {/* Recent Blogs */}
//   //               <div className="bg-[#10252c] p-5 rounded-xl border border-cyan-500/10">
//   //                 <h2 className="text-lg font-semibold text-cyan-300 mb-3">Recent Blogs</h2>
//   //                 <ul className="space-y-2 list-disc list-inside text-sm text-cyan-100">
//   //                   {recentBlogsData.map((blog, i) => (
//   //                     <li key={i}>{blog.title}</li>
//   //                   ))}
//   //                 </ul>
//   //               </div>

//   //               {/* Request Form */}
//   //               <div className="bg-[#10252c] p-5 rounded-xl border border-cyan-500/10">
//   //                 <h2 className="text-lg font-semibold text-cyan-300 mb-3">Raise a Request</h2>
//   //                 <form className="flex flex-col gap-4 text-sm text-cyan-100">
//   //                   <div>
//   //                     <label className="block mb-1">Name</label>
//   //                     <input
//   //                       type="text"
//   //                       className="w-full px-3 py-2 rounded bg-[#0e1f24] text-white border border-cyan-500/20"
//   //                     />
//   //                   </div>
//   //                   <div>
//   //                     <label className="block mb-1">Phone Number</label>
//   //                     <input
//   //                       type="tel"
//   //                       className="w-full px-3 py-2 rounded bg-[#0e1f24] text-white border border-cyan-500/20"
//   //                     />
//   //                   </div>
//   //                   <div>
//   //                     <label className="block mb-1">Description</label>
//   //                     <textarea
//   //                       rows="4"
//   //                       className="w-full px-3 py-2 rounded bg-[#0e1f24] text-white border border-cyan-500/20"
//   //                     ></textarea>
//   //                   </div>
//   //                   <button
//   //                     type="submit"
//   //                     className="mt-2 px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 transition text-white font-medium"
//   //                   >
//   //                     Submit Request
//   //                   </button>
//   //                 </form>
//   //               </div>
//   //             </div>
//   //           </div>
//   //         ) : (
//   //           // Recent View
//   //           <div className="bg-[#10252c] p-6 rounded-xl border border-cyan-500/10 max-w-3xl mx-auto">
//   //             <h2 className="text-xl font-semibold text-cyan-300 mb-4">Recent Blog History</h2>
//   //             <ul className="space-y-3 list-disc list-inside text-cyan-100">
//   //               {recentBlogsData.map((blog, i) => (
//   //                 <li key={i} className="text-base">{blog.title}</li>
//   //               ))}
//   //             </ul>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   );
//   // };


//   // Blog List View Component
//   const BlogListView = () => (
//     <div
//       className="min-h-screen px-6 py-8"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       <div className="w-full mx-0">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* Sidebar - Cohesive Teal/Cyan Theme */}
//           <aside className="lg:col-span-1 space-y-6">

//             {/* Search Bar */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search insights..."
//                     className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
//                   />
//                   <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <TrendingUp className="w-4 h-4 text-cyan-400" />
//                   <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
//                 </div>
//                 <div className="space-y-1">
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setActiveCategory(cat)}
//                       className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat
//                         ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40'
//                         : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10'
//                         }`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Top Posts */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-teal-950/80 to-cyan-950/70 backdrop-blur-xl rounded-2xl border border-teal-400/30 p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Flame className="w-4 h-4 text-teal-400" />
//                   <h3 className="font-semibold text-teal-100 text-sm">Trending</h3>
//                 </div>
//                 <div className="space-y-3">
//                   {topPosts.slice(0, 4).map((post, i) => (
//                     <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
//                       <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-teal-400/40">
//                         <span className="text-xs font-bold text-teal-200">{i + 1}</span>
//                       </div>
//                       <p className="text-xs text-teal-200/80 group-hover/item:text-teal-100 transition-colors line-clamp-2 leading-relaxed">
//                         {post}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Main Content - Matching Teal/Cyan Theme */}
//           <main className="lg:col-span-3">

//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
//                     Crypto Insights
//                   </h1>
//                   <p className="text-cyan-200/70 text-sm">Latest news and analysis from the blockchain world</p>
//                 </div>
//                 <div className="text-left lg:text-right">
//                   <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
//                   <p className="text-teal-400/60 text-xs">Updated daily</p>
//                 </div>
//               </div>
//             </div>

//             {/* Posts Grid */}
//             {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
//               {filteredPosts.map((post, idx) => (
//                 <article
//                   key={idx}
//                   className="group relative h-full w-full"
//                   onMouseEnter={() => setHoveredPost(idx)}
//                   onMouseLeave={() => setHoveredPost(null)}
//                 >
               
//                   <div
//                     className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
//                     style={{ background: "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)" }}
//                   ></div>

             
//                   <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
                  
//                     <div className="relative aspect-video overflow-hidden">
//                       <img
//                         src={post.image}
//                         alt={post.headline}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    
//                       <div className="absolute top-3 left-3 flex gap-2">
//                         {post.trending && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <TrendingUp className="w-3 h-3" />
//                             Trending
//                           </span>
//                         )}
//                         {post.featured && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
//                             <Star className="w-3 h-3" />
//                             Featured
//                           </span>
//                         )}
//                         {post.hot && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                             <Flame className="w-3 h-3" />
//                             Hot
//                           </span>
//                         )}
//                       </div>

//                       <div className="absolute top-3 right-3">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
//                           <Eye className="w-3 h-3" />
//                           {post.views}
//                         </span>
//                       </div>
//                     </div>

               
//                     <div className="p-5 flex flex-col flex-grow">
                  
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
//                           {post.category}
//                         </span>
//                         <div className="flex items-center gap-1 text-xs text-teal-400/80">
//                           <Calendar className="w-3 h-3" />
//                           {post.date}
//                         </div>
//                       </div>

                 
//                       <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow">
//                         {post.headline}
//                       </h3>

                    
//                       <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
//                         {post.description}
//                       </p>

                    
//                       <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
//                         <button
//                           onClick={() => handleReadMore(post)}
//                           className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1"
//                         >
//                           Read More
//                           <ArrowRight className="w-4 h-4" />
//                         </button>

//                         <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
//                           <Clock className="w-3 h-3" />
//                           {post.readTime} min read
//                         </div>

//                         <button
//                           onClick={() => handleOpenReferralModal(post)}
//                           title="Share Referral Code"
//                           type="button"
//                           className="rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
//                           style={{ color: "white", display: "flex", alignItems: "center" }}
//                         >
//                           <FaShareAlt size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>   */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
//     {filteredPosts.map((post, idx) => (
//       <article
//         key={idx}
//         className="group relative h-full w-full"
//         onMouseEnter={() => setHoveredPost(idx)}
//         onMouseLeave={() => setHoveredPost(null)}
//       >
//         {/* Glow Effect */}
//         <div
//           className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
//           }}
//         ></div>

//         {/* Card */}
//         <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
//           {/* Image */}
//           <div
//             className="relative aspect-video overflow-hidden cursor-pointer"
//             onClick={() => navigate(`/blog/${slugify(post.headline)}`)} // <-- Added click navigation here
//           >
//             <img
//               src={post.image}
//               alt={post.headline}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//             {/* Badges */}
//             <div className="absolute top-3 left-3 flex gap-2">
//               {post.trending && (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                   <TrendingUp className="w-3 h-3" />
//                   Trending
//                 </span>
//               )}
//               {post.featured && (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
//                   <Star className="w-3 h-3" />
//                   Featured
//                 </span>
//               )}
//               {post.hot && (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                   <Flame className="w-3 h-3" />
//                   Hot
//                 </span>
//               )}
//             </div>

//             {/* Views */}
//             <div className="absolute top-3 right-3">
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
//                 <Eye className="w-3 h-3" />
//                 {post.views}
//               </span>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-5 flex flex-col flex-grow">
//             {/* Meta */}
//             <div className="flex items-center justify-between mb-3">
//               <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
//                 {post.category}
//               </span>
//               <div className="flex items-center gap-1 text-xs text-teal-400/80">
//                 <Calendar className="w-3 h-3" />
//                 {post.date}
//               </div>
//             </div>

//             {/* Title */}
//             <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow">
//               {post.headline}
//             </h3>

//             {/* Excerpt */}
//             <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
//               {post.description}
//             </p>

//             {/* Footer */}
//             <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
//               <button
//                 onClick={() => handleReadMore(post)}
//                 className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1"
//               >
//                 Read More
//                 <ArrowRight className="w-4 h-4" />
//               </button>

//               <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
//                 <Clock className="w-3 h-3" />
//                 {post.readTime} min read
//               </div>

//               <button
//                 onClick={() => handleOpenReferralModal(post)}
//                 title="Share Referral Code"
//                 type="button"
//                 className="rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
//                 style={{ color: "white", display: "flex", alignItems: "center" }}
//               >
//                 <FaShareAlt size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </article>
//     ))}
//   </div>

//             {/* Referral Modal outside the grid */}
//             {showReferralModal && selectedReferralPost && (
//               <ReferralModal
//                 show={showReferralModal}
//                 onHide={handleCloseReferralModal}
//                 post={selectedReferralPost} // pass the post to modal if needed
//               />
//             )}

//             {/* Load More */}
//             <div className="mt-12 text-center">
//               <button className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
//                 <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
//                   Load More Articles
//                 </div>
//               </button>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );

//   // Main render - conditionally show list or article view
//   return currentView === 'article' && selectedPost ? <ArticleView /> : <BlogListView />;
// };

// export default BlogLayout;

// BlogLayout.jsx - Main Blog Component

import { useNavigate } from 'react-router-dom';
// Import your blog images
import Blog1 from '../../../public/images/Blog1poster.jpg'
import Blog2 from '../../../public/images/Blog2poster.jpg'
import Blog3 from '../../../public/images/Blog3poster.jpg'
import Blog4 from '../../../public/images/Blog4poster.jpg'
import Blog5 from '../../../public/images/Blog5poster.jpg'
import { 
  Search, 
  TrendingUp, 
  Flame, 
  Star, 
  Eye, 
  Calendar, 
  Clock, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { FaShareAlt } from 'react-icons/fa';
import ReferralModal from '../../components/Dashboard/modals/referalModal';

// Sample blog data - replace with your actual data
// const blogsData = [
//   {
//     id: 1,
//     headline: "Bitcoin Hits New All-Time High Amid Institutional Adoption",
//     description: "Bitcoin reached unprecedented levels as major institutions continue to embrace cryptocurrency, marking a pivotal moment in digital asset adoption.",
//     category: "Bitcoin",
//     date: "June 25, 2025",
//     readTime: 5,
//     views: "12.4K",
//     image: "/images/Blog1poster.jpg",
//     trending: true,
//     featured: true,
//     content: {
//       title: "Bitcoin Hits New All-Time High Amid Institutional Adoption",
//       sections: [
//         {
//           type: "paragraph",
//           content: "Bitcoin has reached an unprecedented milestone, surpassing all previous records as institutional adoption continues to accelerate across the globe. This historic moment represents a significant shift in how traditional finance views cryptocurrency."
//         },
//         {
//           type: "heading",
//           content: "Institutional Investment Surge"
//         },
//         {
//           type: "paragraph",
//           content: "Major corporations and financial institutions have been steadily increasing their Bitcoin holdings, with companies like Tesla, MicroStrategy, and Square leading the charge. This institutional backing has provided unprecedented legitimacy to the cryptocurrency market."
//         },
//         {
//           type: "unordered_list",
//           content: [
//             "Corporate treasury adoption by major companies",
//             "Bitcoin ETF approvals driving institutional access",
//             "Central bank interest in digital assets",
//             "Regulatory clarity improving market confidence"
//           ]
//         },
//         {
//           type: "heading",
//           content: "Market Impact and Future Outlook"
//         },
//         {
//           type: "paragraph",
//           content: "The sustained institutional interest has created a more stable foundation for Bitcoin's price growth. Analysts predict continued upward momentum as more institutions announce their digital asset strategies."
//         }
//       ]
//     }
//   },
//   {
//     id: 2,
//     headline: "Ethereum 2.0 Staking Rewards Reach $1B Milestone",
//     description: "The Ethereum network's proof-of-stake mechanism has generated over $1 billion in staking rewards, demonstrating the success of the network's transition.",
//     category: "Ethereum",
//     date: "June 24, 2025",
//     readTime: 4,
//     views: "8.7K",
//     image: "/images/Blog2poster.jpg",
//     hot: true,
//     content: {
//       title: "Ethereum 2.0 Staking Rewards Reach $1B Milestone",
//       sections: [
//         {
//           type: "paragraph",
//           content: "Ethereum's transition to proof-of-stake has proven to be one of the most successful upgrades in blockchain history, with staking rewards now exceeding $1 billion since the merge."
//         },
//         {
//           type: "heading",
//           content: "Proof-of-Stake Success"
//         },
//         {
//           type: "paragraph",
//           content: "The Ethereum network's shift from energy-intensive mining to efficient staking has not only reduced its environmental impact by over 99% but also created new opportunities for network participants to earn rewards."
//         },
//         {
//           type: "unordered_list",
//           content: [
//             "Over 32 million ETH currently staked",
//             "Annual staking yields averaging 4-6%",
//             "Reduced energy consumption by 99.9%",
//             "Improved network security and decentralization"
//           ]
//         }
//       ]
//     }
//   },
//   {
//     id: 3,
//     headline: "DeFi Protocols Face Regulatory Scrutiny in 2024",
//     description: "Decentralized finance protocols are navigating an increasingly complex regulatory landscape as governments worldwide develop new frameworks.",
//     category: "DeFi",
//     date: "June 23, 2025",
//     readTime: 6,
//     views: "6.2K",
//     image: "/images/Blog3poster.jpg",
//     content: {
//       title: "DeFi Protocols Face Regulatory Scrutiny in 2024",
//       sections: [
//         {
//           type: "paragraph",
//           content: "The decentralized finance sector is experiencing increased regulatory attention as traditional financial authorities work to establish comprehensive frameworks for governing DeFi protocols."
//         },
//         {
//           type: "heading",
//           content: "Global Regulatory Landscape"
//         },
//         {
//           type: "paragraph",
//           content: "Different jurisdictions are taking varied approaches to DeFi regulation, creating a complex patchwork of rules that protocols must navigate to ensure compliance while maintaining their decentralized nature."
//         }
//       ]
//     }
//   }
// ];

// Helper function to create URL-friendly slugs
const slugify = (str) =>
  str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

const BlogLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [selectedReferralPost, setSelectedReferralPost] = useState(null);
  
  const navigate = useNavigate();

  const categories = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'NFTs', 'Trading'];
  const topPosts = [
    'Bitcoin hits new all-time high amid institutional adoption',
    'Ethereum 2.0 staking rewards reach $1B milestone',
    'DeFi protocols face regulatory scrutiny in 2024',
    'NFT market shows signs of recovery after winter'
  ];

  const handleOpenReferralModal = (post) => {
    setSelectedReferralPost(post);
    setShowReferralModal(true);
  };

  const handleCloseReferralModal = () => {
    setShowReferralModal(false);
    setSelectedReferralPost(null);
  };

  const filteredPosts = blogsData.filter(post => {
    const matchesSearch = post.headline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (post) => {
    // Navigate to individual article page
    navigate(`/blog/${slugify(post.headline)}`);
  };

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
    >
      <div className="w-full mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search insights..."
                    className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
                  />
                  <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat
                          ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40'
                          : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Posts */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-teal-950/80 to-cyan-950/70 backdrop-blur-xl rounded-2xl border border-teal-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4 text-teal-400" />
                  <h3 className="font-semibold text-teal-100 text-sm">Trending</h3>
                </div>
                <div className="space-y-3">
                  {topPosts.slice(0, 4).map((post, i) => (
                    <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-teal-400/40">
                        <span className="text-xs font-bold text-teal-200">{i + 1}</span>
                      </div>
                      <p className="text-xs text-teal-200/80 group-hover/item:text-teal-100 transition-colors line-clamp-2 leading-relaxed">
                        {post}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
                    Crypto Insights
                  </h1>
                  <p className="text-cyan-200/70 text-sm">Latest news and analysis from the blockchain world</p>
                </div>
                <div className="text-left lg:text-right">
                  <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
                  <p className="text-teal-400/60 text-xs">Updated daily</p>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
              {filteredPosts.map((post, idx) => (
                <article
                  key={post.id}
                  className="group relative h-full w-full"
                  onMouseEnter={() => setHoveredPost(idx)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Glow Effect */}
                  <div
                    className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
                    style={{
                      background: "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
                    }}
                  ></div>

                  {/* Card */}
                  <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
                    {/* Image */}
                    <div
                      className="relative aspect-video overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/blog/${slugify(post.headline)}`)}
                    >
                      <img
                        src={post.image}
                        alt={post.headline}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {post.trending && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                        {post.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                        {post.hot && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
                            <Flame className="w-3 h-3" />
                            Hot
                          </span>
                        )}
                      </div>

                      {/* Views */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Meta */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-teal-400/80">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow cursor-pointer"
                        onClick={() => navigate(`/blog/${slugify(post.headline)}`)}
                      >
                        {post.headline}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
                        <button
                          onClick={() => handleReadMore(post)}
                          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min read
                        </div>

                        <button
                          onClick={() => handleOpenReferralModal(post)}
                          title="Share Referral Code"
                          type="button"
                          className="rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white p-2"
                          style={{ color: "white", display: "flex", alignItems: "center" }}
                        >
                          <FaShareAlt size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Referral Modal */}
            {showReferralModal && selectedReferralPost && (
              <ReferralModal
                show={showReferralModal}
                onHide={handleCloseReferralModal}
                post={selectedReferralPost}
              />
            )}

            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
                  Load More Articles
                </div>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
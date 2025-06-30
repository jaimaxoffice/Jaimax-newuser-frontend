

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



import Blog1 from '../../../public/images/Blog1poster.jpg'
import Blog2 from '../../../public/images/Blog2poster.jpg'
import Blog3 from '../../../public/images/Blog3poster.jpg'
import Blog4 from '../../../public/images/Blog4poster.jpg'
import Blog5 from '../../../public/images/Blog5poster.jpg'
// import { 

import { ChevronLeft, TrendingUp, Share2, Flame,Eye ,ArrowRight , ChevronRight, Calendar, User, Clock, Search, Phone, Mail, MapPin } from 'lucide-react';

// Sample blog data

import { useEffect , } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from 'react';

// Utility function to normalize headlines for URLs
const normalizeHeadline = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]/g, '');
};

// Contact Component
const BlogContact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    mobile: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const onChangeContact = (e) => {
    let { name, value } = e.target;
    if (name === 'mobile') {
      value = value.replace(/[^0-9 ]/g, '');
    }
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const formErrors = {};
    if (!contactForm.name.trim()) formErrors.name = 'Name is required';
    if (!contactForm.mobile.trim()) formErrors.mobile = 'Phone Number is required';
    if (!contactForm.message.trim()) formErrors.message = 'Description is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmitContact = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', mobile: '', message: '' });
    setErrors({});
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Phone className="w-5 h-5 mr-2" />
        Contact Us
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={contactForm.name}
            onChange={onChangeContact}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="mobile"
            value={contactForm.mobile}
            onChange={onChangeContact}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
          {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>}
        </div>
        
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            name="message"
            value={contactForm.message}
            onChange={onChangeContact}
            rows="3"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message"
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>
        
        <button
          onClick={onSubmitContact}
          className="w-full bg-[#b9cd26] text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog, onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(blog)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.headline}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
          {blog.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
          {blog.headline}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-3">
          {blog.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(blog.date).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {blog.readTime}
          </div>
        </div>
      </div>
    </div>
  );
};




export const BlogDetail = ({ blog, onBack, onNavigate, currentIndex, totalBlogs }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  if (!blog || !blog.content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-100 bg-[#085056]">
        Loading article...
      </div>
    );
  }

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const filtered = viewed.filter((item) => item.id !== blog.id);
    const updated = [{ id: blog.id, headline: blog.headline, date: new Date().toISOString() }, ...filtered].slice(0, 5);
    setRecentlyViewed(updated);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  }, [blog]);

  const handlePrevious = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalBlogs - 1) onNavigate(currentIndex + 1);
  };

  return (
    <>
      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="w-full min-h-screen bg-[#085056] text-white font-serif">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 py-6">

          {/* ───── Sidebar ───── */}
     
          {/* ───── Scrollable Article ───── */}
          <main className="lg:col-span-8 max-h-[calc(100vh-3rem)] overflow-y-auto pr-2 scrollbar-hide">
            <div className="space-y-6 pb-20">

              {/* Navigation Header */}
              <div className="flex items-center justify-between">
                <button onClick={onBack} className="text-cyan-300 hover:text-white">
                  <ChevronLeft className="inline-block w-4 h-4 mr-1" />
                  Back to Articles
                </button>
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="text-cyan-300 disabled:opacity-40 hover:text-white"
                  >
                    <ChevronLeft className="inline-block w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <span className="text-teal-200">{currentIndex + 1} of {totalBlogs}</span>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === totalBlogs - 1}
                    className="text-cyan-300 disabled:opacity-40 hover:text-white"
                  >
                    Next
                    <ChevronRight className="inline-block w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{blog.headline}</h1>
                <p className="text-sm text-teal-200 mb-4">
                  {blog.author} · {new Date(blog.date).toLocaleDateString()} · {blog.readTime}
                </p>

                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.headline}
                    className="w-full object-cover rounded-lg shadow mb-6"
                  />
                )}

                <p className="text-lg leading-relaxed mb-8 text-teal-100">{blog.description}</p>

                <div className="space-y-6">
                  {blog.content.sections.map((section, index) => {
                    const contentText =
                      typeof section.content === "string"
                        ? section.content.replace(/<[^>]*>/g, "")
                        : "";
                    switch (section.type) {
                      case "heading":
                        return (
                          <h2
                            key={index}
                            id={`section-${index}`}
                            className="text-2xl font-semibold border-b border-cyan-400/30 pb-2 text-white"
                          >
                            {contentText}
                          </h2>
                        );
                      case "subheading":
                        return <h3 key={index} className="text-xl font-medium text-teal-200">{contentText}</h3>;
                      case "paragraph":
                        return <p key={index} className="text-base text-teal-100 leading-relaxed">{contentText}</p>;
                      case "unordered_list":
                        return (
                          <ul key={index} className="list-disc list-inside text-base text-teal-100 space-y-1">
                            {section.content.map((item, idx) => (
                              <li key={idx}>{item.replace(/<[^>]*>/g, "")}</li>
                            ))}
                          </ul>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>

                {/* Prev/Next */}
                <div className="flex justify-between pt-10 border-t border-cyan-400/30 mt-10">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="text-cyan-300 hover:text-white disabled:opacity-40"
                  >
                    <ChevronLeft className="inline-block w-4 h-4 mr-1" />
                    Previous Article
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === totalBlogs - 1}
                    className="text-cyan-300 hover:text-white disabled:opacity-40"
                  >
                    Next Article
                    <ChevronRight className="inline-block w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </main>
               <aside className="lg:col-span-4 space-y-6 sticky top-6 self-start h-fit">
            {recentlyViewed.length > 0 && (
              <div className="bg-[#0b6068] rounded-xl p-5 border border-cyan-400/30">
                <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
                <ul className="list-disc list-inside text-teal-100 text-sm space-y-2">
                  {recentlyViewed.map((item, index) => (
                    <div key={index}>
                      <div className="font-medium">{item.headline}</div>
                      <div className="text-xs text-cyan-200">{new Date(item.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </ul>
              </div>
            )}

            <div >
              <BlogContact />
            </div>
          </aside>

        </div>
      </div>
    </>
  );
};

// const BlogLayout = () => {
//   const [currentView, setCurrentView] = useState('list');
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [hoveredPost, setHoveredPost] = useState(null);
//   const [showReferralModal, setShowReferralModal] = useState(false);
//   const [selectedReferralPost, setSelectedReferralPost] = useState(null);

//   const dataCategories = ['All', ...new Set(blogsData.map(blog => blog.category))];

//   const filteredPosts = blogsData.filter(post => {
//     const matchesSearch =
//       post.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const handleBlogClick = blog => {
//     const index = blogsData.findIndex(b => b.id === blog.id);
//     setSelectedBlog(blog);
//     setSelectedIndex(index);
//     setCurrentView('detail');
//   };

//   const handleBackToList = () => {
//     setCurrentView('list');
//     setSelectedBlog(null);
//   };

//   const handleNavigate = index => {
//     setSelectedBlog(blogsData[index]);
//     setSelectedIndex(index);
//   };

//   const handleOpenReferralModal = post => {
//     setSelectedReferralPost(post);
//     setShowReferralModal(true);
//   };

//   const handleCloseReferralModal = () => {
//     setShowReferralModal(false);
//     setSelectedReferralPost(null);
//   };

//   const handleReadMore = post => {
//     handleBlogClick(post);
//   };

//   // Utility function to create URL-friendly slugs
//   const slugify = str => {
//     return str
//       .toLowerCase()
//       .replace(/ /g, '-')
//       .replace(/[^\w-]/g, '');
//   };

//   // Real-time share function
//   const handleShare = post => {
//     const url = `https://yourdomain.com/blog/${slugify(post.headline)}`; // Replace with your real domain

//     if (navigator.share) {
//       navigator
//         .share({
//           title: post.headline,
//           text: post.description,
//           url,
//         })
//         .then(() => console.log('Shared successfully'))
//         .catch(error => console.error('Error sharing:', error));
//     } else {
//       navigator.clipboard
//         .writeText(url)
//         .then(() => alert('Link copied to clipboard!'))
//         .catch(() => alert('Failed to copy link.'));
//     }
//   };

//   if (currentView === 'detail' && selectedBlog) {
//     return (
//       <BlogDetail
//         blog={selectedBlog}
//         onBack={handleBackToList}
//         onNavigate={handleNavigate}
//         currentIndex={selectedIndex}
//         totalBlogs={blogsData.length}
//       />
//     );
//   }

//   return (
//     <div
//       className="min-h-screen px-6 py-8"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       <div className="w-full mx-0">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <aside className="lg:col-span-1 space-y-6">
//             {/* Search Bar */}
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
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
//                   {dataCategories.map(cat => (
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

//             {/* Contact Form - Show only on sm and larger */}
//             <div className="hidden sm:block">
//               <BlogContact />
//             </div>
//           </aside>

//           {/* Main Content */}
//           <main className="lg:col-span-3">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
//                     Our Blog
//                   </h1>
//                   <p className="text-cyan-200/70 text-sm">Latest insights and tutorials from the development world</p>
//                 </div>
//                 <div className="text-left lg:text-right">
//                   <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
//                   <p className="text-teal-400/60 text-xs">Updated daily</p>
//                 </div>
//               </div>
//             </div>

//             {/* Posts Grid */}
//             {filteredPosts.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
//                 {filteredPosts.map((post, idx) => (
//                   <article
//                     key={post.id}
//                     className="group relative h-full w-full"
//                     onMouseEnter={() => setHoveredPost(idx)}
//                     onMouseLeave={() => setHoveredPost(null)}
//                   >
//                     {/* Glow Effect */}
//                     <div
//                       className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
//                       style={{
//                         background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)',
//                       }}
//                     ></div>

//                     {/* Card */}
//                     <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
//                       {/* Image */}
//                       <div
//                         className="relative aspect-video overflow-hidden cursor-pointer"
//                         onClick={() => handleBlogClick(post)}
//                       >
//                         <img
//                           src={post.image}
//                           alt={post.headline}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

//                         {/* Badges */}
//                         <div className="absolute top-3 left-3 flex gap-2">
//                           {post.trending && (
//                             <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                               <TrendingUp className="w-3 h-3" />
//                               Trending
//                             </span>
//                           )}
//                           {post.featured && (
//                             <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
//                               <Star className="w-3 h-3" />
//                               Featured
//                             </span>
//                           )}
//                           {post.hot && (
//                             <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
//                               <Flame className="w-3 h-3" />
//                               Hot
//                             </span>
//                           )}
//                         </div>

//                         {/* Views */}
//                         <div className="absolute top-3 right-3">
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
//                             <Eye className="w-3 h-3" />
//                             {post.views || '1.2k'}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="p-5 flex flex-col flex-grow">
//                         {/* Meta */}
//                         <div className="flex items-center mb-3 justify-end">
//                           <div className="flex items-center gap-1 text-xs text-teal-400/80">
//                             <Calendar className="w-3 h-3" />
//                             {new Date(post.date).toLocaleDateString()}
//                           </div>
//                         </div>

//                         {/* Title */}
//                         <h3
//                           className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow cursor-pointer"
//                           onClick={() => handleBlogClick(post)}
//                         >
//                           {post.headline}
//                         </h3>

//                         {/* Excerpt */}
//                         <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
//                           {post.description}
//                         </p>

//                         {/* Footer */}
//                         <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
//                           <button
//                             onClick={() => handleReadMore(post)}
//                             className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1"
//                           >
//                             Read More
//                             <ArrowRight className="w-4 h-4" />
//                           </button>

//                           <button
//                             onClick={() => handleShare(post)}
//                             title="Share Article"
//                             type="button"
//                             className="rounded hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white p-2 text-white"
//                           >
//                             <Share2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <h3 className="text-xl text-cyan-400 mb-2">No articles found</h3>
//                 <p className="text-cyan-300/60">Try adjusting your search terms or filters</p>
//               </div>
//             )}

//             {/* Contact Form - Show only on mobile */}
//             <div className="block sm:hidden mt-10">
//               <BlogContact />
//             </div>

//             {/* Referral Modal */}
//             {showReferralModal && selectedReferralPost && (
//               <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                 <div className="bg-gradient-to-br from-cyan-950/90 to-teal-950/80 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-6 max-w-md w-full">
//                   <h3 className="text-xl font-bold text-cyan-100 mb-4">Share Article</h3>
//                   <p className="text-cyan-200/80 mb-4">Share this article with others:</p>
//                   <p className="text-sm text-teal-300 bg-teal-950/50 p-3 rounded-lg mb-4 break-all">
//                     {selectedReferralPost.headline}
//                   </p>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => {
//                         navigator.clipboard.writeText(selectedReferralPost.headline);
//                         alert('Link copied to clipboard!');
//                       }}
//                       className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white py-2 px-4 rounded-lg transition-all duration-300"
//                     >
//                       Copy Link
//                     </button>
//                     <button
//                       onClick={handleCloseReferralModal}
//                       className="px-4 py-2 border border-cyan-400/30 text-cyan-300 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogLayout;





export const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Convert slug back to blog post
  const slugify = (str) =>
    str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

  const index = blogsData.findIndex((b) => slugify(b.headline) === slug);
  const blog = blogsData[index];

  const handleNavigate = (newIndex) => {
    const newSlug = slugify(blogsData[newIndex].headline);
    navigate(`/blog/${newSlug}`);
  };

  if (!blog) {
    return <div className="text-center py-10 text-red-600">Blog not found</div>;
  }

  return (
    <BlogDetail
      blog={blog}
      currentIndex={index}
      totalBlogs={blogsData.length}
      onBack={() => navigate("/blog")}
      onNavigate={handleNavigate}
    />
  );
};

const BlogLayout = () => {
  /* ───────────── local state ───────────── */
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  /* ───────────── router ───────────── */
  const navigate = useNavigate();

  /* ───────────── helpers ───────────── */
  const slugify = (str) =>
    str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");

  const handleCardClick = (post) => {
    navigate(`/blog/${slugify(post.headline)}`);
  };

  const handleShare = (post) => {
    const url = `${window.location.origin}/blog/${slugify(post.headline)}`;
    if (navigator.share) {
      navigator
        .share({ title: post.headline, text: post.description, url })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
    }
  };

  /* ───────────── derived data ───────────── */
  const categories = ["All", 'Blockchain', 'Market Trends', 'DeFi', 'NFTs',"Cryto News",  ...new Set(blogsData.map((b) => b.category))];

  const filteredPosts = blogsData.filter((post) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.headline.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q);
    const matchesCat = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  /* ───────────── render ───────────── */
  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
      }}
    >
      <div className="w-full mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ───────── sidebar ───────── */}
          <aside className="lg:col-span-1 space-y-6">
            {/* search */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
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

            {/* categories */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
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

            {/* contact (desktop) */}
            <div className="hidden sm:block">
              <BlogContact />
            </div>
          </aside>

          {/* ───────── main content ───────── */}
          <main className="lg:col-span-3">
            {/* header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
                    Our Blog
                  </h1>
                  <p className="text-cyan-200/70 text-sm">
                    Latest insights and tutorials from the development world
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

            {/* posts grid */}
            {filteredPosts.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group relative h-full w-full"
                  >
                    {/* glow */}
                    <div
                      className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)",
                      }}
                    />
                    {/* card */}
                    <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
                      {/* image */}
                      <div
                        className="relative aspect-video overflow-hidden cursor-pointer"
                        onClick={() => handleCardClick(post)}
                      >
                        <img
                          src={post.image}
                          alt={post.headline}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {post.trending && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 rounded-full text-xs font-medium text-white border border-teal-400/50">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          )}
                          {post.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 rounded-full text-xs font-medium text-white border border-cyan-400/50">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                          {post.hot && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 rounded-full text-xs font-medium text-white border border-teal-400/50">
                              <Flame className="w-3 h-3" />
                              Hot
                            </span>
                          )}
                        </div>

                        {/* views */}
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full text-xs text-cyan-200">
                            <Eye className="w-3 h-3" />
                            {post.views || "1.2k"}
                          </span>
                        </div>
                      </div>

                      {/* text */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center mb-3 justify-end">
                          <div className="flex items-center gap-1 text-xs text-teal-400/80">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>

                        <h3
                          className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 cursor-pointer"
                          onClick={() => handleCardClick(post)}
                        >
                          {post.headline}
                        </h3>

                        <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
                          <button
                            onClick={() => handleCardClick(post)}
                            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleShare(post)}
                            className="rounded hover:bg-white/20 p-2 text-white"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
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

            {/* contact (mobile) */}
            <div className="block sm:hidden mt-10">
              <BlogContact />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;

